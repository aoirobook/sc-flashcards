// 情報処理安全確保支援士(SC) 単語帳 - コアカードデータ
// フォーマット: 略称 → 英語フル → 単語ごとの直訳 → 直訳の合成 → 機能 → 試験での問われ方
// 追加するときはこの配列に1オブジェクト足すだけ。id は重複しないように。

const CARDS = [
  // ===== メール認証 =====
  {
    id: "spf", cat: "メール認証", abbr: "SPF",
    full: "Sender Policy Framework",
    words: [
      { en: "Sender", ja: "送信者" },
      { en: "Policy", ja: "方針・規定" },
      { en: "Framework", ja: "枠組み" }
    ],
    literal: "送信者の方針の枠組み",
    func: "送信元ドメインが「このIPからメールを送る」とDNSのTXTレコードに宣言。受信側はエンベロープFrom(MAIL FROM)のドメインを引いて送信元IPを照合し、なりすましを検知する。",
    exam: [
      "SPF/DKIM/DMARCの役割の違いを選ばせる",
      "「エンベロープFrom(MAIL FROM)を検証する」のはどれ → SPF",
      "DNSのTXTレコードに記述する/転送で失敗しやすい点"
    ]
  },
  {
    id: "dkim", cat: "メール認証", abbr: "DKIM",
    full: "DomainKeys Identified Mail",
    words: [
      { en: "DomainKeys", ja: "ドメインの鍵" },
      { en: "Identified", ja: "識別された・身元確認された" },
      { en: "Mail", ja: "メール" }
    ],
    literal: "ドメインの鍵で身元確認されたメール",
    func: "送信側が秘密鍵でメールヘッダ/本文に電子署名を付与。受信側はDNSに公開した公開鍵で署名を検証し、改ざんとなりすましを検知する。",
    exam: [
      "「ディジタル署名でメールの完全性と送信ドメインを検証」=DKIM",
      "公開鍵をDNS(TXT)で配布する点",
      "SPFは経路(IP)、DKIMは署名、という対比"
    ]
  },
  {
    id: "dmarc", cat: "メール認証", abbr: "DMARC",
    full: "Domain-based Message Authentication, Reporting and Conformance",
    words: [
      { en: "Domain-based", ja: "ドメインに基づく" },
      { en: "Message", ja: "メッセージ" },
      { en: "Authentication", ja: "認証" },
      { en: "Reporting", ja: "報告" },
      { en: "Conformance", ja: "適合・準拠" }
    ],
    literal: "ドメインに基づくメッセージ認証・報告・適合(の仕組み)",
    func: "SPF/DKIMの結果と、ヘッダFromのドメイン一致(アライメント)を評価。失敗時の扱い(none/quarantine/reject)をポリシーで指定し、結果をレポートで受け取れる。",
    exam: [
      "SPF/DKIMを束ねてポリシー(reject等)を適用するのはどれ → DMARC",
      "ヘッダFromのアライメントを検証する点",
      "p=reject / レポート(rua)の意味"
    ]
  },
  {
    id: "smime", cat: "メール認証", abbr: "S/MIME",
    full: "Secure / Multipurpose Internet Mail Extensions",
    words: [
      { en: "Secure", ja: "安全な" },
      { en: "Multipurpose", ja: "多目的の" },
      { en: "Internet", ja: "インターネット" },
      { en: "Mail", ja: "メール" },
      { en: "Extensions", ja: "拡張" }
    ],
    literal: "安全な多目的インターネットメール拡張",
    func: "公開鍵証明書(X.509)を用いてメール本文を暗号化・電子署名する方式。エンドツーエンドで秘匿性と完全性・送信者認証を実現。",
    exam: [
      "メール本文そのものを暗号化/署名 → S/MIME(PGPと並ぶ)",
      "PKI(証明書)を使う点。SPF/DKIMはドメイン認証で別物"
    ]
  },

  // ===== 認証・認可・ID連携 =====
  {
    id: "saml", cat: "認証・ID連携", abbr: "SAML",
    full: "Security Assertion Markup Language",
    words: [
      { en: "Security", ja: "セキュリティ" },
      { en: "Assertion", ja: "表明・断定" },
      { en: "Markup", ja: "マークアップ(印付け)" },
      { en: "Language", ja: "言語" }
    ],
    literal: "セキュリティの表明を記すマークアップ言語",
    func: "IdP(認証する側)が「この人は認証済み」というアサーションをXMLで発行し、SP(サービス側)が受け取ってログインを許可。企業のSSOで定番。",
    exam: [
      "XMLベースのアサーションでSSOを実現 → SAML",
      "IdPとSPの役割。OIDCはJSON/トークン、SAMLはXMLという対比"
    ]
  },
  {
    id: "oauth", cat: "認証・ID連携", abbr: "OAuth",
    full: "Open Authorization",
    words: [
      { en: "Open", ja: "開かれた・公開の" },
      { en: "Authorization", ja: "認可(権限付与)" }
    ],
    literal: "開かれた認可",
    func: "パスワードを渡さずに、第三者アプリへ限定的なアクセス権(アクセストークン)を委譲する仕組み。あくまで「認可」であって「認証」ではない。",
    exam: [
      "認可(Authorization)であって認証ではない、という区別",
      "アクセストークンの委譲。認証も欲しいならOIDCを上に乗せる"
    ]
  },
  {
    id: "oidc", cat: "認証・ID連携", abbr: "OIDC",
    full: "OpenID Connect",
    words: [
      { en: "OpenID", ja: "開かれたID(公開の識別子)" },
      { en: "Connect", ja: "接続する" }
    ],
    literal: "オープンなIDをつなぐ(仕組み)",
    func: "OAuth 2.0の上に「認証」を追加した層。ユーザの本人確認結果をIDトークン(JWT)で受け取れる。「ソーシャルログイン」の基盤。",
    exam: [
      "OAuth=認可、OIDC=その上に認証を追加、という関係",
      "IDトークン(JWT)で本人確認情報を受け渡す"
    ]
  },
  {
    id: "mfa", cat: "認証・ID連携", abbr: "MFA",
    full: "Multi-Factor Authentication",
    words: [
      { en: "Multi", ja: "複数の" },
      { en: "Factor", ja: "要素" },
      { en: "Authentication", ja: "認証" }
    ],
    literal: "複数要素の認証",
    func: "「知識(パスワード)」「所持(トークン/スマホ)」「生体」のうち異なる2種以上を組み合わせる認証。1要素を破られても突破されにくい。",
    exam: [
      "3要素(知識・所持・生体)の分類問題",
      "パスワード+SMSは2要素か(SMS=所持)。同種2つは多要素にならない"
    ]
  },
  {
    id: "fido", cat: "認証・ID連携", abbr: "FIDO",
    full: "Fast IDentity Online",
    words: [
      { en: "Fast", ja: "速い" },
      { en: "IDentity", ja: "アイデンティティ(身元)" },
      { en: "Online", ja: "オンライン" }
    ],
    literal: "速いオンライン本人確認",
    func: "公開鍵暗号でパスワードレス認証を実現する標準。秘密鍵は端末内に留まりサーバへ送らないため、フィッシングや漏えいに強い(パスキーの基盤)。",
    exam: [
      "パスワードレス/フィッシング耐性の根拠=秘密鍵が端末外に出ない",
      "公開鍵暗号を使う点。パスキーとの関係"
    ]
  },
  {
    id: "sso", cat: "認証・ID連携", abbr: "SSO",
    full: "Single Sign-On",
    words: [
      { en: "Single", ja: "単一の・1回の" },
      { en: "Sign-On", ja: "サインオン(ログイン)" }
    ],
    literal: "1回のログイン(で複数サービス)",
    func: "一度の認証で複数サービスを使えるようにする仕組み。SAMLやOIDCで実現。利便性が上がる一方、奪われると影響範囲が広い。",
    exam: [
      "利便性と引き換えに「認証情報が漏れた時の影響が大きい」リスク",
      "実装技術としてSAML/OIDCが挙がる"
    ]
  },
  {
    id: "radius", cat: "認証・ID連携", abbr: "RADIUS",
    full: "Remote Authentication Dial-In User Service",
    words: [
      { en: "Remote", ja: "遠隔の" },
      { en: "Authentication", ja: "認証" },
      { en: "Dial-In", ja: "ダイヤルイン(接続)" },
      { en: "User", ja: "利用者" },
      { en: "Service", ja: "サービス" }
    ],
    literal: "遠隔接続する利用者の認証サービス",
    func: "ネットワーク機器(無線AP・VPN等)が、認証を一元化したRADIUSサーバに問い合わせて認証・認可・課金(AAA)を行う。IEEE802.1Xの認証サーバとして使われる。",
    exam: [
      "802.1X認証の「認証サーバ」=RADIUS",
      "AAA(認証・認可・アカウンティング)を担う"
    ]
  },

  // ===== PKI・証明書 =====
  {
    id: "pki", cat: "PKI・証明書", abbr: "PKI",
    full: "Public Key Infrastructure",
    words: [
      { en: "Public", ja: "公開の" },
      { en: "Key", ja: "鍵" },
      { en: "Infrastructure", ja: "基盤" }
    ],
    literal: "公開鍵の基盤",
    func: "公開鍵と所有者をCAの電子署名で結びつけ、証明書として信頼を担保する仕組み全体。発行・失効・検証の運用基盤。",
    exam: [
      "CA/RA/CRL/OCSPなど構成要素の関係を問う",
      "「公開鍵が本当に本人のものか」を保証する基盤"
    ]
  },
  {
    id: "ca", cat: "PKI・証明書", abbr: "CA",
    full: "Certificate Authority",
    words: [
      { en: "Certificate", ja: "証明書" },
      { en: "Authority", ja: "認証局・権威機関" }
    ],
    literal: "証明書の認証局",
    func: "申請者の公開鍵に対し、本人性を確認したうえで電子署名して証明書を発行する第三者機関。ルートCAを頂点に階層(信頼チェーン)を構成。",
    exam: [
      "証明書に署名して発行する主体=CA",
      "ルート/中間CAの信頼チェーン、自己署名証明書の扱い"
    ]
  },
  {
    id: "csr", cat: "PKI・証明書", abbr: "CSR",
    full: "Certificate Signing Request",
    words: [
      { en: "Certificate", ja: "証明書" },
      { en: "Signing", ja: "署名(する)" },
      { en: "Request", ja: "要求" }
    ],
    literal: "証明書への署名の要求",
    func: "証明書を発行してほしい側が、公開鍵と申請者情報をまとめてCAへ送る要求データ。秘密鍵は手元に残したまま公開鍵だけを提出する。",
    exam: [
      "CAに送るのは公開鍵(CSR)、秘密鍵は送らない",
      "サーバ証明書取得の手順(鍵生成→CSR作成→CAが署名)"
    ]
  },
  {
    id: "crl", cat: "PKI・証明書", abbr: "CRL",
    full: "Certificate Revocation List",
    words: [
      { en: "Certificate", ja: "証明書" },
      { en: "Revocation", ja: "失効・取消" },
      { en: "List", ja: "一覧" }
    ],
    literal: "証明書の失効一覧",
    func: "有効期限前に失効させた証明書のシリアル番号一覧をCAが発行。検証側はこれを取得して証明書が失効していないか確認する。",
    exam: [
      "失効確認の方式。リスト一括取得=CRL、都度問い合わせ=OCSP の対比",
      "CRLは肥大化・反映遅延の課題"
    ]
  },
  {
    id: "ocsp", cat: "PKI・証明書", abbr: "OCSP",
    full: "Online Certificate Status Protocol",
    words: [
      { en: "Online", ja: "オンラインの" },
      { en: "Certificate", ja: "証明書" },
      { en: "Status", ja: "状態" },
      { en: "Protocol", ja: "プロトコル(手順)" }
    ],
    literal: "オンラインで証明書の状態を問うプロトコル",
    func: "証明書1枚の失効状態をレスポンダにリアルタイム問い合わせする方式。CRLより即時性が高い。OCSPステープリングでサーバが応答を代理提示できる。",
    exam: [
      "リアルタイムに失効を確認 → OCSP(CRLと対比)",
      "OCSPステープリングの利点(検証側の問い合わせ削減・プライバシー)"
    ]
  },

  // ===== 暗号・プロトコル =====
  {
    id: "aes", cat: "暗号", abbr: "AES",
    full: "Advanced Encryption Standard",
    words: [
      { en: "Advanced", ja: "先進の" },
      { en: "Encryption", ja: "暗号化" },
      { en: "Standard", ja: "標準・規格" }
    ],
    literal: "先進的な暗号化標準",
    func: "現在主流の共通鍵(対称鍵)ブロック暗号。鍵長128/192/256bit。高速で、TLSやファイル暗号など広範に利用。DESの後継。",
    exam: [
      "共通鍵暗号の代表=AES、公開鍵=RSAという分類",
      "DES/3DESの後継、ブロック暗号、鍵長の選択肢"
    ]
  },
  {
    id: "rsa", cat: "暗号", abbr: "RSA",
    full: "Rivest–Shamir–Adleman",
    words: [
      { en: "Rivest", ja: "リベスト(考案者名)" },
      { en: "Shamir", ja: "シャミア(考案者名)" },
      { en: "Adleman", ja: "エーデルマン(考案者名)" }
    ],
    literal: "考案者3名の頭文字",
    func: "大きな合成数の素因数分解の困難性に基づく公開鍵暗号。暗号化と電子署名の両方に使える。鍵交換や署名で広く利用。",
    exam: [
      "公開鍵暗号の代表。安全性の根拠=素因数分解の困難性",
      "暗号化(公開鍵で暗号→秘密鍵で復号)と署名(秘密鍵で署名→公開鍵で検証)の向きの違い"
    ]
  },
  {
    id: "ecc", cat: "暗号", abbr: "ECC",
    full: "Elliptic Curve Cryptography",
    words: [
      { en: "Elliptic", ja: "楕円の" },
      { en: "Curve", ja: "曲線" },
      { en: "Cryptography", ja: "暗号(技術)" }
    ],
    literal: "楕円曲線の暗号",
    func: "楕円曲線上の離散対数問題の困難性に基づく公開鍵暗号。RSAより短い鍵で同等の強度を得られ、モバイル等で有利。",
    exam: [
      "RSAより短鍵で同強度 → ECC(処理が軽い)",
      "公開鍵暗号の一種、鍵長と安全性の関係"
    ]
  },
  {
    id: "hmac", cat: "暗号", abbr: "HMAC",
    full: "Hash-based Message Authentication Code",
    words: [
      { en: "Hash-based", ja: "ハッシュに基づく" },
      { en: "Message", ja: "メッセージ" },
      { en: "Authentication", ja: "認証" },
      { en: "Code", ja: "符号・コード" }
    ],
    literal: "ハッシュに基づくメッセージ認証符号",
    func: "共有鍵とハッシュ関数からMAC(認証符号)を生成し、メッセージの完全性と送信者認証を同時に保証する。単純なハッシュと違い鍵が必要。",
    exam: [
      "完全性+認証を共有鍵で保証=MAC/HMAC",
      "ディジタル署名(公開鍵)との違い:HMACは否認防止までは持たない"
    ]
  },
  {
    id: "tls", cat: "暗号", abbr: "TLS",
    full: "Transport Layer Security",
    words: [
      { en: "Transport", ja: "輸送・転送" },
      { en: "Layer", ja: "層" },
      { en: "Security", ja: "セキュリティ" }
    ],
    literal: "トランスポート層のセキュリティ",
    func: "通信路を暗号化し、サーバ(必要なら相手も)を証明書で認証、完全性も保証するプロトコル。HTTPSの土台。SSLの後継。",
    exam: [
      "ハンドシェイクで鍵交換→共通鍵で暗号化、という流れ",
      "サーバ証明書による認証、SSLの後継、PFS対応"
    ]
  },
  {
    id: "pfs", cat: "暗号", abbr: "PFS",
    full: "Perfect Forward Secrecy",
    words: [
      { en: "Perfect", ja: "完全な" },
      { en: "Forward", ja: "前方・将来の" },
      { en: "Secrecy", ja: "秘匿性" }
    ],
    literal: "完全な前方秘匿性",
    func: "セッションごとに使い捨ての鍵(DHE/ECDHE)を生成。後で長期秘密鍵が漏れても、過去の通信は復号できない性質。",
    exam: [
      "「将来鍵が漏れても過去の通信が守られる」=前方秘匿性",
      "実現手段=一時鍵を使うDHE/ECDHE鍵交換"
    ]
  },
  {
    id: "ipsec", cat: "ネットワーク", abbr: "IPsec",
    full: "Internet Protocol Security",
    words: [
      { en: "Internet", ja: "インターネット" },
      { en: "Protocol", ja: "プロトコル(手順)" },
      { en: "Security", ja: "セキュリティ" }
    ],
    literal: "インターネットプロトコルのセキュリティ",
    func: "IP(ネットワーク層)で暗号化・認証を行う方式。AH(完全性/認証)とESP(暗号化)、トンネル/トランスポートモードがあり、VPNの基盤になる。",
    exam: [
      "AH=認証/完全性、ESP=暗号化、の役割分担",
      "トンネルモード(IPヘッダごと保護)=拠点間VPN、IKEで鍵交換"
    ]
  },

  // ===== ネットワーク防御 =====
  {
    id: "vpn", cat: "ネットワーク", abbr: "VPN",
    full: "Virtual Private Network",
    words: [
      { en: "Virtual", ja: "仮想の" },
      { en: "Private", ja: "私的な・専用の" },
      { en: "Network", ja: "ネットワーク" }
    ],
    literal: "仮想的な専用ネットワーク",
    func: "公衆網上に暗号化トンネルを張り、専用線のように安全に通信する技術。IPsec VPNやTLS(SSL) VPNがある。",
    exam: [
      "IPsec-VPNとSSL-VPNの違い(層・用途)",
      "リモートアクセスでの盗聴対策。ゼロトラストではZTNAへ"
    ]
  },
  {
    id: "waf", cat: "ネットワーク", abbr: "WAF",
    full: "Web Application Firewall",
    words: [
      { en: "Web", ja: "ウェブ" },
      { en: "Application", ja: "アプリケーション" },
      { en: "Firewall", ja: "防火壁" }
    ],
    literal: "ウェブアプリケーションの防火壁",
    func: "HTTP/HTTPSの中身を検査し、SQLインジェクションやXSSなどアプリ層の攻撃を遮断する。通常のFW(L3/L4)では防げない攻撃が対象。",
    exam: [
      "SQLi/XSSなどアプリ層攻撃の対策=WAF",
      "パケットフィルタ型FWとの守備範囲の違い、ブラックリスト/ホワイトリスト"
    ]
  },
  {
    id: "ids", cat: "ネットワーク", abbr: "IDS",
    full: "Intrusion Detection System",
    words: [
      { en: "Intrusion", ja: "侵入" },
      { en: "Detection", ja: "検知" },
      { en: "System", ja: "システム" }
    ],
    literal: "侵入検知システム",
    func: "通信やホストを監視し、不正侵入の兆候を検知して管理者に通知する。検知のみで遮断はしない。NIDS/HIDSがある。",
    exam: [
      "IDS=検知して通知、IPS=検知して遮断、の違い",
      "シグネチャ型とアノマリ型、誤検知(フォールスポジティブ)"
    ]
  },
  {
    id: "ips", cat: "ネットワーク", abbr: "IPS",
    full: "Intrusion Prevention System",
    words: [
      { en: "Intrusion", ja: "侵入" },
      { en: "Prevention", ja: "防止" },
      { en: "System", ja: "システム" }
    ],
    literal: "侵入防止システム",
    func: "IDSの機能に加え、検知した不正通信をその場で遮断する。通信経路上(インライン)に置かれる。",
    exam: [
      "検知後に「自動で遮断」する=IPS(IDSとの対比)",
      "インライン配置ゆえの遅延・誤検知時の影響"
    ]
  },
  {
    id: "dmz", cat: "ネットワーク", abbr: "DMZ",
    full: "DeMilitarized Zone",
    words: [
      { en: "DeMilitarized", ja: "非武装化された" },
      { en: "Zone", ja: "区域" }
    ],
    literal: "非武装地帯",
    func: "外部公開サーバ(Web/メール/DNS)を置く、内部LANと外部の中間の隔離区域。万一侵害されても内部に直接波及しにくくする。",
    exam: [
      "公開サーバを置く緩衝地帯=DMZ",
      "内部からDMZ・DMZから外、の通信制御設計問題"
    ]
  },
  {
    id: "dnssec", cat: "ネットワーク", abbr: "DNSSEC",
    full: "DNS Security Extensions",
    words: [
      { en: "DNS", ja: "ドメインネームシステム" },
      { en: "Security", ja: "セキュリティ" },
      { en: "Extensions", ja: "拡張" }
    ],
    literal: "DNSのセキュリティ拡張",
    func: "DNS応答に電子署名を付け、応答の正当性(改ざんされていないこと)を検証可能にする。DNSキャッシュポイズニング対策。",
    exam: [
      "DNSキャッシュポイズニング対策=DNSSEC",
      "署名で「完全性・出自」を保証(秘匿性は守らない点に注意)"
    ]
  },
  {
    id: "hsts", cat: "Webセキュリティ", abbr: "HSTS",
    full: "HTTP Strict Transport Security",
    words: [
      { en: "HTTP", ja: "エイチティーティーピー(Web通信)" },
      { en: "Strict", ja: "厳格な" },
      { en: "Transport", ja: "転送" },
      { en: "Security", ja: "セキュリティ" }
    ],
    literal: "HTTPの厳格な転送セキュリティ",
    func: "サーバが応答ヘッダで「以後このサイトは必ずHTTPSで」と指示。ブラウザはHTTPアクセスを自動でHTTPS化し、中間者による降格(SSLストリップ)を防ぐ。",
    exam: [
      "HTTPへの降格攻撃(SSLストリップ)対策=HSTS",
      "レスポンスヘッダで指定、初回アクセスの隙(プリロード)"
    ]
  },
  {
    id: "csp", cat: "Webセキュリティ", abbr: "CSP",
    full: "Content Security Policy",
    words: [
      { en: "Content", ja: "コンテンツ(内容)" },
      { en: "Security", ja: "セキュリティ" },
      { en: "Policy", ja: "方針" }
    ],
    literal: "コンテンツのセキュリティ方針",
    func: "読み込み可能なスクリプト/画像等の供給元をホワイトリストで制限するヘッダ。インラインスクリプトを禁止してXSSの影響を緩和する。",
    exam: [
      "XSS緩和策としてのCSP(許可した供給元以外を実行させない)",
      "レスポンスヘッダ、script-src等のディレクティブ"
    ]
  },
  {
    id: "cors", cat: "Webセキュリティ", abbr: "CORS",
    full: "Cross-Origin Resource Sharing",
    words: [
      { en: "Cross-Origin", ja: "異なるオリジン間の" },
      { en: "Resource", ja: "資源" },
      { en: "Sharing", ja: "共有" }
    ],
    literal: "異なるオリジン間での資源共有",
    func: "同一オリジンポリシーの例外を、サーバが許可ヘッダ(Access-Control-Allow-Origin)で明示的に与える仕組み。安全に越境アクセスを許可する。",
    exam: [
      "同一オリジンポリシーを緩める正規の仕組み=CORS",
      "設定ミス(*許可など)が情報漏えいにつながる"
    ]
  },

  // ===== 攻撃手法 =====
  {
    id: "xss", cat: "攻撃手法", abbr: "XSS",
    full: "Cross-Site Scripting",
    words: [
      { en: "Cross-Site", ja: "サイトをまたぐ" },
      { en: "Scripting", ja: "スクリプトを書く(実行)" }
    ],
    literal: "サイトをまたぐスクリプト実行",
    func: "Webページに不正なスクリプトを埋め込み、閲覧者のブラウザで実行させる攻撃。Cookie窃取やなりすましに悪用。対策はエスケープ処理。",
    exam: [
      "反射型/格納型/DOM型の分類",
      "対策=出力時のエスケープ(サニタイジング)、CSP。CSRFとの混同に注意"
    ]
  },
  {
    id: "csrf", cat: "攻撃手法", abbr: "CSRF",
    full: "Cross-Site Request Forgery",
    words: [
      { en: "Cross-Site", ja: "サイトをまたぐ" },
      { en: "Request", ja: "要求" },
      { en: "Forgery", ja: "偽造" }
    ],
    literal: "サイトをまたぐ要求の偽造",
    func: "ログイン済みの利用者に、本人の意図しないリクエストを別サイト経由で送らせる攻撃。対策はトークン(CSRFトークン)やSameSite Cookie。",
    exam: [
      "「ログイン状態を悪用し意図しない操作を実行」=CSRF",
      "対策=ワンタイムのCSRFトークン、SameSite。XSSとの違い"
    ]
  },
  {
    id: "ssrf", cat: "攻撃手法", abbr: "SSRF",
    full: "Server-Side Request Forgery",
    words: [
      { en: "Server-Side", ja: "サーバ側の" },
      { en: "Request", ja: "要求" },
      { en: "Forgery", ja: "偽造" }
    ],
    literal: "サーバ側からの要求の偽造",
    func: "公開サーバを踏み台にし、内部ネットワークやクラウドのメタデータ等、本来到達できない先へサーバにリクエストを送らせる攻撃。",
    exam: [
      "外部から直接届かない内部資源を、サーバ経由で攻撃 → SSRF",
      "クラウドのインスタンスメタデータ窃取の文脈で頻出"
    ]
  },
  {
    id: "ddos", cat: "攻撃手法", abbr: "DDoS",
    full: "Distributed Denial of Service",
    words: [
      { en: "Distributed", ja: "分散した" },
      { en: "Denial", ja: "拒否" },
      { en: "of Service", ja: "サービスの" }
    ],
    literal: "分散型のサービス拒否",
    func: "多数の端末(ボットネット等)から一斉に大量の要求を送り、対象のサービスを停止に追い込む攻撃。反射・増幅(リフレクション)型もある。",
    exam: [
      "DoSとの違い=分散(多数の発信元)",
      "リフレクション/アンプ攻撃(DNS/NTP)、対策はCDN/レート制限"
    ]
  },
  {
    id: "mitm", cat: "攻撃手法", abbr: "MITM",
    full: "Man-In-The-Middle",
    words: [
      { en: "Man", ja: "人・者" },
      { en: "In-The-Middle", ja: "中間にいる" }
    ],
    literal: "中間者(攻撃)",
    func: "通信の途中に割り込み、盗聴・改ざん・なりすましを行う攻撃。対策はサーバ認証付きの暗号化(TLS/証明書検証)。",
    exam: [
      "中間者攻撃の対策=TLSと証明書検証、HSTS",
      "ARPスプーフィングや偽AP、SSLストリップとの関連"
    ]
  },
  {
    id: "apt", cat: "攻撃手法", abbr: "APT",
    full: "Advanced Persistent Threat",
    words: [
      { en: "Advanced", ja: "高度な" },
      { en: "Persistent", ja: "持続的な・執拗な" },
      { en: "Threat", ja: "脅威" }
    ],
    literal: "高度で持続的な脅威",
    func: "特定の組織を標的に、長期間にわたり潜伏しながら侵入・情報窃取を続ける高度な攻撃(者)。標的型攻撃の典型。",
    exam: [
      "標的型・長期潜伏の攻撃=APT",
      "サイバーキルチェーンの各段階(偵察〜目的遂行)と対応づけ"
    ]
  },

  // ===== 運用・組織・管理 =====
  {
    id: "siem", cat: "運用・組織", abbr: "SIEM",
    full: "Security Information and Event Management",
    words: [
      { en: "Security", ja: "セキュリティ" },
      { en: "Information", ja: "情報" },
      { en: "Event", ja: "イベント(事象)" },
      { en: "Management", ja: "管理" }
    ],
    literal: "セキュリティ情報とイベントの管理",
    func: "各種機器のログを集約・相関分析し、攻撃の兆候をリアルタイムに検知・可視化する基盤。SOCの分析を支える。",
    exam: [
      "ログを横断的に相関分析して異常検知=SIEM",
      "SOC/CSIRT/SOARとの役割の違い"
    ]
  },
  {
    id: "soc", cat: "運用・組織", abbr: "SOC",
    full: "Security Operation Center",
    words: [
      { en: "Security", ja: "セキュリティ" },
      { en: "Operation", ja: "運用・運営" },
      { en: "Center", ja: "拠点・中枢" }
    ],
    literal: "セキュリティ運用の拠点",
    func: "24時間体制で監視・検知・分析を行う組織/拠点。SIEM等を使って脅威を見つけ、CSIRTへつなぐ。「監視」が主務。",
    exam: [
      "SOC=監視・検知、CSIRT=インシデント対応、の役割分担",
      "アウトソース(MSS)の利用文脈"
    ]
  },
  {
    id: "csirt", cat: "運用・組織", abbr: "CSIRT",
    full: "Computer Security Incident Response Team",
    words: [
      { en: "Computer", ja: "コンピュータ" },
      { en: "Security", ja: "セキュリティ" },
      { en: "Incident", ja: "インシデント(出来事・事故)" },
      { en: "Response", ja: "対応" },
      { en: "Team", ja: "チーム" }
    ],
    literal: "コンピュータセキュリティ事故対応チーム",
    func: "インシデント発生時に、検知・封じ込め・復旧・再発防止を主導する組織。社内外との連携窓口(PoC)も担う。",
    exam: [
      "インシデント対応を担う組織=CSIRT(SOCとの違い)",
      "対応フェーズ(検知→封じ込め→根絶→復旧→教訓)"
    ]
  },
  {
    id: "soar", cat: "運用・組織", abbr: "SOAR",
    full: "Security Orchestration, Automation and Response",
    words: [
      { en: "Security", ja: "セキュリティ" },
      { en: "Orchestration", ja: "連携・統合制御" },
      { en: "Automation", ja: "自動化" },
      { en: "Response", ja: "対応" }
    ],
    literal: "セキュリティの連携・自動化・対応",
    func: "複数ツールを連携させ、インシデント対応の定型作業をプレイブックで自動化する基盤。SOCの運用負荷を下げる。",
    exam: [
      "対応の「自動化・オーケストレーション」=SOAR",
      "SIEM(検知)との組み合わせ、プレイブック"
    ]
  },
  {
    id: "edr", cat: "運用・組織", abbr: "EDR",
    full: "Endpoint Detection and Response",
    words: [
      { en: "Endpoint", ja: "エンドポイント(端末)" },
      { en: "Detection", ja: "検知" },
      { en: "Response", ja: "対応" }
    ],
    literal: "端末の検知と対応",
    func: "PC等の端末の挙動を常時監視・記録し、侵入後の不審な動きを検知して隔離・調査(フォレンジック)を支援する。「侵入される前提」の対策。",
    exam: [
      "従来のアンチウイルス(入口対策)に対し、侵入後の検知・対応=EDR",
      "EPP(防御)との違い、ログによる事後追跡"
    ]
  },
  {
    id: "cvss", cat: "脆弱性管理", abbr: "CVSS",
    full: "Common Vulnerability Scoring System",
    words: [
      { en: "Common", ja: "共通の" },
      { en: "Vulnerability", ja: "脆弱性" },
      { en: "Scoring", ja: "採点・評価" },
      { en: "System", ja: "システム・方式" }
    ],
    literal: "共通脆弱性評価システム",
    func: "脆弱性の深刻度を0.0〜10.0で共通指標として点数化する方式。基本値/現状値/環境値の3軸で評価する。",
    exam: [
      "脆弱性の「深刻度を数値化」=CVSS",
      "基本評価基準/現状/環境の3グループ、攻撃容易性・影響度の観点"
    ]
  },
  {
    id: "cve", cat: "脆弱性管理", abbr: "CVE",
    full: "Common Vulnerabilities and Exposures",
    words: [
      { en: "Common", ja: "共通の" },
      { en: "Vulnerabilities", ja: "脆弱性(複数)" },
      { en: "Exposures", ja: "露出・弱点" }
    ],
    literal: "共通脆弱性識別子",
    func: "個々の脆弱性に世界共通の識別番号(CVE-西暦-連番)を付与する仕組み。製品横断で同じ脆弱性を一意に参照できる。",
    exam: [
      "脆弱性に一意の「番号」を振る=CVE(深刻度の点数=CVSSと区別)",
      "CWE(脆弱性の種類)との違い"
    ]
  },
  {
    id: "ztna", cat: "アーキテクチャ", abbr: "ZTNA",
    full: "Zero Trust Network Access",
    words: [
      { en: "Zero", ja: "ゼロ・無" },
      { en: "Trust", ja: "信頼" },
      { en: "Network", ja: "ネットワーク" },
      { en: "Access", ja: "アクセス" }
    ],
    literal: "信頼ゼロのネットワークアクセス",
    func: "「社内だから安全」を前提にせず、アクセスのたびに利用者・端末を検証して必要最小限だけ許可する考え方。VPN型の境界防御に代わる。",
    exam: [
      "境界防御の限界に対する「ゼロトラスト」の原則=都度検証・最小権限",
      "VPNとの対比、IDベースのアクセス制御"
    ]
  },
  {
    id: "wpa3", cat: "無線", abbr: "WPA3",
    full: "Wi-Fi Protected Access 3",
    words: [
      { en: "Wi-Fi", ja: "ワイファイ(無線LAN)" },
      { en: "Protected", ja: "保護された" },
      { en: "Access", ja: "アクセス" },
      { en: "3", ja: "第3世代" }
    ],
    literal: "保護された無線アクセス(第3世代)",
    func: "無線LANのセキュリティ規格の最新世代。SAE(同時認証)でオフライン辞書攻撃に強くし、PFSも提供。WEP/WPA2の弱点を改善。",
    exam: [
      "無線LAN規格の世代と暗号方式(WEP→WPA2(AES/CCMP)→WPA3(SAE))",
      "WEPが脆弱な理由、WPA3の改善点(SAE)"
    ]
  }
];

if (typeof module !== "undefined") { module.exports = CARDS; }
