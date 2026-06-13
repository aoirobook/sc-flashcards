/* SC単語帳 - アプリ本体
 * - 進捗/設定は localStorage に保存（オフライン動作）
 * - 復習スケジュールは Leitner方式（box 1..5 → 間隔 0,1,3,7,16日）
 * - 英語フルは Web Speech API で読み上げ
 */

(() => {
  "use strict";

  const STORE_KEY = "sc-tango-progress-v1";
  const SET_KEY = "sc-tango-settings-v1";
  const INTERVALS = [0, 1, 3, 7, 16]; // box1..5 の「次回までの日数」
  const NEW_PER_DAY = 8;              // 1日に投入する新規カード数の目安

  // ---- 状態 ----
  let progress = load(STORE_KEY, {});      // id -> {box, due(yyyy-mm-dd), seen}
  let settings = load(SET_KEY, { autoSpeak: true });
  let queue = [];        // 学習中のカード配列
  let idx = 0;           // queue内の位置
  let mode = "review";   // "review" | "browse"

  // ---- ユーティリティ ----
  function load(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }
  function save(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  function saveProgress() { save(STORE_KEY, progress); }
  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function addDays(n) {
    const d = new Date(); d.setDate(d.getDate() + n);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function $(id) { return document.getElementById(id); }

  // ---- 学習対象の算出 ----
  function isDue(c) {
    const p = progress[c.id];
    if (!p) return false;               // 未学習は「新規」枠で扱う
    return p.due <= todayStr();
  }
  function isNew(c) { return !progress[c.id]; }

  function dueCards() { return CARDS.filter(isDue); }
  function newCards() { return CARDS.filter(isNew); }

  // 今日の学習キュー：期限到来カード全部 + 新規を上限まで
  function buildTodayQueue() {
    const due = dueCards();
    const fresh = newCards().slice(0, NEW_PER_DAY);
    return shuffle([...due, ...fresh]);
  }

  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ---- 採点（Leitner） ----
  function grade(card, g) {
    let p = progress[card.id] || { box: 1, seen: 0 };
    p.seen = (p.seen || 0) + 1;
    if (g === "again") {
      p.box = 1;
      p.due = todayStr();          // 同日中に再出題
      p._again = true;
    } else if (g === "hard") {
      p.box = Math.max(1, (p.box || 1)); // 維持
      p.due = addDays(1);
      p._again = false;
    } else { // good
      p.box = Math.min(INTERVALS.length, (p.box || 1) + 1);
      p.due = addDays(INTERVALS[p.box - 1] || 1);
      p._again = false;
    }
    progress[card.id] = p;
    saveProgress();
  }

  // ---- 読み上げ（TTS） ----
  let voices = [];
  function loadVoices() { voices = window.speechSynthesis ? speechSynthesis.getVoices() : []; }
  if (window.speechSynthesis) {
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }
  function speak(text) {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.92;
    const en = voices.find(v => /en[-_]US/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang));
    if (en) u.voice = en;
    speechSynthesis.speak(u);
  }

  // ---- 画面遷移 ----
  function show(screen) {
    ["home", "study", "done"].forEach(s => $(s).classList.toggle("hidden", s !== screen));
  }

  // ---- ホーム描画 ----
  function renderHome() {
    const due = dueCards().length;
    const fresh = Math.min(newCards().length, NEW_PER_DAY);
    const total = due + fresh;
    $("due-count").textContent = total;
    $("today-sub").textContent = total === 0
      ? "今日のノルマは完了！"
      : `復習 ${due} 枚 ＋ 新規 ${fresh} 枚`;

    const learned = CARDS.filter(c => progress[c.id] && progress[c.id].box >= 4).length;
    $("stats").textContent = `習得 ${learned} / ${CARDS.length}`;

    $("toggle-autospeak").textContent = `🔊 自動読上: ${settings.autoSpeak ? "ON" : "OFF"}`;

    renderCategories();
  }

  function renderCategories() {
    const cats = {};
    CARDS.forEach(c => {
      if (!cats[c.cat]) cats[c.cat] = { total: 0, learned: 0 };
      cats[c.cat].total++;
      if (progress[c.id] && progress[c.id].box >= 4) cats[c.cat].learned++;
    });
    const list = $("cat-list");
    list.innerHTML = "";
    Object.keys(cats).forEach(name => {
      const { total, learned } = cats[name];
      const pct = Math.round((learned / total) * 100);
      const el = document.createElement("div");
      el.className = "cat-item";
      el.innerHTML = `
        <div class="cat-left">
          <div class="cat-name">${name}</div>
          <div class="cat-bar"><div style="width:${pct}%"></div></div>
        </div>
        <div class="cat-meta">${learned}/${total}</div>`;
      el.addEventListener("click", () => startBrowse(CARDS.filter(c => c.cat === name)));
      list.appendChild(el);
    });
  }

  // ---- 学習開始 ----
  function startReview() {
    queue = buildTodayQueue();
    if (queue.length === 0) { renderHome(); return; }
    mode = "review";
    idx = 0;
    show("study");
    renderCard();
  }
  function startBrowse(cards) {
    queue = cards.slice();
    if (queue.length === 0) return;
    mode = "browse";
    idx = 0;
    show("study");
    renderCard();
  }

  // ---- カード描画 ----
  function renderCard() {
    const c = queue[idx];
    // 表示を表に戻す
    $("front").classList.remove("hidden");
    $("back").classList.add("hidden");
    $("ctrl-front").classList.remove("hidden");
    $("ctrl-grade").classList.add("hidden");
    $("ctrl-next").classList.add("hidden");

    $("front-cat").textContent = c.cat;
    $("front-abbr").textContent = c.abbr;
    $("back-abbr").textContent = c.abbr;
    $("back-full").textContent = c.full;
    $("back-literal").textContent = c.literal;
    $("back-func").textContent = c.func;

    $("back-words").innerHTML = c.words
      .map(w => `<li><span class="w-en">${w.en}</span><span class="w-ja">${w.ja}</span></li>`).join("");
    $("back-exam").innerHTML = c.exam.map(e => `<li>${e}</li>`).join("");

    const pct = Math.round((idx / queue.length) * 100);
    $("progress-fill").style.width = pct + "%";
    $("study-pos").textContent = `${idx + 1}/${queue.length}`;

    $("back-scroll-reset")?.scrollTo?.(0, 0);
    const sc = document.querySelector(".back-scroll"); if (sc) sc.scrollTop = 0;
  }

  function reveal() {
    const c = queue[idx];
    $("front").classList.add("hidden");
    $("back").classList.remove("hidden");
    $("ctrl-front").classList.add("hidden");
    if (mode === "review") $("ctrl-grade").classList.remove("hidden");
    else $("ctrl-next").classList.remove("hidden");
    if (settings.autoSpeak) speak(c.full);
  }

  function advance() {
    idx++;
    if (idx >= queue.length) finish();
    else renderCard();
  }

  function onGrade(g) {
    const c = queue[idx];
    grade(c, g);
    // 「もう一度」は同セッションの最後に再投入
    if (g === "again") queue.push(c);
    advance();
  }

  function finish() {
    if (mode === "review") {
      const remaining = dueCards().length;
      $("done-sub").textContent = remaining > 0
        ? `まだ ${remaining} 枚の復習が残っています。`
        : "今日の復習はすべて完了しました。明日また！";
    } else {
      $("done-sub").textContent = "このカテゴリを一周しました。";
    }
    show("done");
    renderHome();
  }

  // ---- イベント結線 ----
  function bind() {
    $("start-review").addEventListener("click", startReview);
    $("start-all").addEventListener("click", () => startBrowse(shuffle(CARDS)));
    $("reveal").addEventListener("click", reveal);
    $("flashcard").addEventListener("click", (e) => {
      // 表のどこをタップしても答えを表示（裏のボタン類は除く）
      if (!$("front").classList.contains("hidden")) reveal();
    });
    $("speak-full").addEventListener("click", (e) => { e.stopPropagation(); speak(queue[idx].full); });

    document.querySelectorAll("#ctrl-grade .btn").forEach(b =>
      b.addEventListener("click", () => onGrade(b.dataset.grade)));
    $("next-card").addEventListener("click", advance);
    $("prev-card").addEventListener("click", () => { if (idx > 0) { idx--; renderCard(); } });

    $("back-home").addEventListener("click", () => { show("home"); renderHome(); });
    $("done-home").addEventListener("click", () => { show("home"); renderHome(); });

    $("toggle-autospeak").addEventListener("click", () => {
      settings.autoSpeak = !settings.autoSpeak;
      save(SET_KEY, settings);
      $("toggle-autospeak").textContent = `🔊 自動読上: ${settings.autoSpeak ? "ON" : "OFF"}`;
    });

    $("reset-progress").addEventListener("click", () => {
      if (confirm("学習進捗をすべて消去します。よろしいですか？")) {
        progress = {}; saveProgress(); renderHome();
      }
    });

    // キーボード（PC確認用）: Space=めくる/次, 1/2/3=採点
    document.addEventListener("keydown", (e) => {
      if ($("study").classList.contains("hidden")) return;
      const frontVisible = !$("front").classList.contains("hidden");
      if (e.code === "Space") {
        e.preventDefault();
        if (frontVisible) reveal();
        else if (mode === "browse") advance();
      } else if (!frontVisible && mode === "review") {
        if (e.key === "1") onGrade("again");
        if (e.key === "2") onGrade("hard");
        if (e.key === "3") onGrade("good");
      }
    });
  }

  // ---- 起動 ----
  bind();
  renderHome();
  show("home");

  // Service Worker（オフライン）
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
