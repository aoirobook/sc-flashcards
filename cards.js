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
    id: "cvss", cat: "脆弱性・脅威", abbr: "CVSS",
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
    id: "cve", cat: "脆弱性・脅威", abbr: "CVE",
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
    id: "ztna", cat: "ゼロトラスト・クラウド", abbr: "ZTNA",
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
  },

  // ===== メール認証(追加) =====
  {
    id: "arc", cat: "メール認証", abbr: "ARC",
    full: "Authenticated Received Chain",
    words: [
      { en: "Authenticated", ja: "認証された" },
      { en: "Received", ja: "受信した" },
      { en: "Chain", ja: "連鎖・鎖" }
    ],
    literal: "認証結果を受け継ぐ連鎖",
    func: "メーリングリストや転送でSPF/DKIMが壊れても、中継サーバが「自分が受けた時点では認証OKだった」と署名して引き継ぐ仕組み。DMARC失敗の誤判定を救済する。",
    exam: [
      "転送・MLでDMARCが壊れる問題への対策=ARC",
      "認証結果を中継ごとに署名して連鎖させる点"
    ]
  },
  {
    id: "bimi", cat: "メール認証", abbr: "BIMI",
    full: "Brand Indicators for Message Identification",
    words: [
      { en: "Brand", ja: "ブランド" },
      { en: "Indicators", ja: "標識・目印" },
      { en: "for", ja: "〜のための" },
      { en: "Message", ja: "メッセージ" },
      { en: "Identification", ja: "識別" }
    ],
    literal: "メッセージ識別のためのブランド標識",
    func: "DMARCに合格したドメインのメールに、企業ロゴをメール一覧に表示できる仕組み。なりすまし対策の動機付けと、正規メールの視認性向上。",
    exam: [
      "DMARC合格が前提でロゴ表示=BIMI",
      "メール認証を導入する利点(ブランド保護)の文脈"
    ]
  },

  // ===== 認証・ID連携(追加) =====
  {
    id: "totp", cat: "認証・ID連携", abbr: "TOTP",
    full: "Time-based One-Time Password",
    words: [
      { en: "Time-based", ja: "時刻に基づく" },
      { en: "One-Time", ja: "一回限りの" },
      { en: "Password", ja: "パスワード" }
    ],
    literal: "時刻に基づく一回限りのパスワード",
    func: "共有した秘密鍵と現在時刻から30秒ごとに変わる6桁等のコードを生成。認証アプリ(Google Authenticator等)で多要素認証の「所持」要素に使う。",
    exam: [
      "認証アプリの30秒コード=TOTP(カウンタ式はHOTP)",
      "時刻同期がずれると失敗する点、MFAの所持要素"
    ]
  },
  {
    id: "eap", cat: "認証・ID連携", abbr: "EAP",
    full: "Extensible Authentication Protocol",
    words: [
      { en: "Extensible", ja: "拡張可能な" },
      { en: "Authentication", ja: "認証" },
      { en: "Protocol", ja: "プロトコル(手順)" }
    ],
    literal: "拡張可能な認証プロトコル",
    func: "認証方式を差し替えられる枠組み。IEEE802.1Xの中で使われ、EAP-TLS(証明書)やPEAPなど多様な方式を選べる。",
    exam: [
      "802.1Xの認証方式の入れ物=EAP",
      "EAP-TLSは証明書で相互認証、という具体方式"
    ]
  },
  {
    id: "jwt", cat: "認証・ID連携", abbr: "JWT",
    full: "JSON Web Token",
    words: [
      { en: "JSON", ja: "ジェイソン(データ記法)" },
      { en: "Web", ja: "ウェブ" },
      { en: "Token", ja: "token=証票・引換券" }
    ],
    literal: "JSON形式のWeb証票",
    func: "ヘッダ・ペイロード・署名の3部からなる、改ざん検知可能なトークン。OIDCのIDトークンやAPI認可で利用。署名で正当性を検証するが、中身は暗号化ではない点に注意。",
    exam: [
      "OIDCのIDトークン実体=JWT",
      "署名で完全性は守るが平文(Base64URL)なので秘密情報は入れない"
    ]
  },
  {
    id: "iam", cat: "認証・ID連携", abbr: "IAM",
    full: "Identity and Access Management",
    words: [
      { en: "Identity", ja: "アイデンティティ(身元)" },
      { en: "and", ja: "〜と" },
      { en: "Access", ja: "アクセス" },
      { en: "Management", ja: "管理" }
    ],
    literal: "アイデンティティとアクセスの管理",
    func: "誰が(ID)何にアクセスできるか(権限)を一元管理する仕組み・基盤。最小権限・職務分掌・棚卸しを実現。クラウドでは中核機能。",
    exam: [
      "ID管理とアクセス制御を束ねる=IAM",
      "最小権限の原則、特権ID管理(PAM)との関係"
    ]
  },
  {
    id: "rbac", cat: "認証・ID連携", abbr: "RBAC",
    full: "Role-Based Access Control",
    words: [
      { en: "Role-Based", ja: "役割に基づく" },
      { en: "Access", ja: "アクセス" },
      { en: "Control", ja: "制御" }
    ],
    literal: "役割に基づくアクセス制御",
    func: "個人ではなく「役割(ロール)」に権限を割り当て、利用者にロールを付与する方式。人事異動などの権限管理が容易になる。",
    exam: [
      "役割単位で権限付与=RBAC(属性単位はABAC)",
      "最小権限・職務分掌の実装手段"
    ]
  },
  {
    id: "pam", cat: "認証・ID連携", abbr: "PAM",
    full: "Privileged Access Management",
    words: [
      { en: "Privileged", ja: "特権の" },
      { en: "Access", ja: "アクセス" },
      { en: "Management", ja: "管理" }
    ],
    literal: "特権アクセスの管理",
    func: "管理者(root/Administrator)等の強い権限の払い出し・記録・監視を統制する仕組み。特権の悪用や乗っ取りの被害を抑える。",
    exam: [
      "特権ID(管理者権限)の貸出・操作記録の統制=PAM",
      "ワンタイム払い出し、セッション録画、最小権限"
    ]
  },

  // ===== PKI・証明書(追加) =====
  {
    id: "hsm", cat: "PKI・証明書", abbr: "HSM",
    full: "Hardware Security Module",
    words: [
      { en: "Hardware", ja: "ハードウェア(機器)" },
      { en: "Security", ja: "セキュリティ" },
      { en: "Module", ja: "モジュール(部品)" }
    ],
    literal: "ハードウェアのセキュリティ部品",
    func: "鍵の生成・保管・暗号演算を専用耐タンパ機器内で行い、秘密鍵を外に出さない。CAの署名鍵保護などで使う。",
    exam: [
      "秘密鍵を機器外に出さず保護=HSM(耐タンパ性)",
      "CAの鍵管理、鍵の安全な保管先として登場"
    ]
  },
  {
    id: "kms", cat: "PKI・証明書", abbr: "KMS",
    full: "Key Management Service",
    words: [
      { en: "Key", ja: "鍵" },
      { en: "Management", ja: "管理" },
      { en: "Service", ja: "サービス" }
    ],
    literal: "鍵の管理サービス",
    func: "暗号鍵の生成・保管・ローテーション・破棄をライフサイクルで一元管理するサービス(特にクラウド)。アクセス権と監査ログで統制。",
    exam: [
      "鍵のライフサイクル管理=KMS",
      "鍵のローテーション・分離、HSM連携"
    ]
  },
  {
    id: "ct", cat: "PKI・証明書", abbr: "CT",
    full: "Certificate Transparency",
    words: [
      { en: "Certificate", ja: "証明書" },
      { en: "Transparency", ja: "透明性" }
    ],
    literal: "証明書の透明性",
    func: "発行された全証明書を公開ログに記録し、誰でも監査できるようにする仕組み。不正発行(誤発行・なりすまし証明書)を早期に発見できる。",
    exam: [
      "不正・誤発行の証明書を検知=CT(公開ログ)",
      "CAの不正発行対策、ログ監査の文脈"
    ]
  },

  // ===== 暗号(追加) =====
  {
    id: "dh", cat: "暗号", abbr: "DH",
    full: "Diffie-Hellman",
    words: [
      { en: "Diffie", ja: "ディフィー(考案者名)" },
      { en: "Hellman", ja: "ヘルマン(考案者名)" }
    ],
    literal: "考案者2名の名前(鍵交換法)",
    func: "盗聴者がいる通信路でも、共有秘密鍵を安全に作り出せる鍵交換方式。鍵そのものは送らず、各自の計算結果だけ交換する。一時鍵にするとPFSを実現。",
    exam: [
      "鍵を送らずに共有鍵を生成=DH鍵交換",
      "DHE/ECDHE(一時鍵)でPFS、安全性は離散対数問題"
    ]
  },
  {
    id: "sha", cat: "暗号", abbr: "SHA",
    full: "Secure Hash Algorithm",
    words: [
      { en: "Secure", ja: "安全な" },
      { en: "Hash", ja: "ハッシュ(切り刻む)" },
      { en: "Algorithm", ja: "アルゴリズム(計算手順)" }
    ],
    literal: "安全なハッシュ計算手順",
    func: "任意長データから固定長の要約値(ハッシュ)を作る関数。改ざん検知や署名に使う。SHA-1は危殆化し、現在はSHA-256等(SHA-2)が主流。",
    exam: [
      "完全性検証・署名で使うハッシュ=SHA-2",
      "SHA-1/MD5は衝突が見つかり非推奨、という出題"
    ]
  },
  {
    id: "des", cat: "暗号", abbr: "DES",
    full: "Data Encryption Standard",
    words: [
      { en: "Data", ja: "データ" },
      { en: "Encryption", ja: "暗号化" },
      { en: "Standard", ja: "標準・規格" }
    ],
    literal: "データ暗号化標準",
    func: "かつての共通鍵ブロック暗号(鍵56bit)。鍵長が短く総当たりで破られるため危殆化。3DESを経てAESへ移行した、という歴史で問われる。",
    exam: [
      "鍵長が短く危殆化した旧共通鍵暗号=DES",
      "DES→3DES→AESの世代交代、共通鍵に分類"
    ]
  },
  {
    id: "gcm", cat: "暗号", abbr: "GCM",
    full: "Galois/Counter Mode",
    words: [
      { en: "Galois", ja: "ガロア(数学者名)" },
      { en: "Counter", ja: "計数・カウンタ" },
      { en: "Mode", ja: "モード(方式)" }
    ],
    literal: "ガロア体＋カウンタの方式",
    func: "ブロック暗号の利用モードの一つで、暗号化と同時に認証タグを生成する認証付き暗号(AEAD)。AES-GCMとしてTLSで多用され、秘匿性と完全性を同時に得る。",
    exam: [
      "暗号化と完全性を同時に=認証付き暗号(AES-GCM)",
      "利用モード(ECB/CBC/CTR/GCM)の比較、ECBが弱い理由"
    ]
  },
  {
    id: "csprng", cat: "暗号", abbr: "CSPRNG",
    full: "Cryptographically Secure Pseudo-Random Number Generator",
    words: [
      { en: "Cryptographically", ja: "暗号学的に" },
      { en: "Secure", ja: "安全な" },
      { en: "Pseudo-Random", ja: "擬似乱数の" },
      { en: "Number", ja: "数" },
      { en: "Generator", ja: "生成器" }
    ],
    literal: "暗号学的に安全な擬似乱数生成器",
    func: "次の値を予測できない、暗号用途に耐える乱数生成器。鍵・IV・トークン生成に必須。予測可能な乱数は鍵推測やセッション固定の原因になる。",
    exam: [
      "鍵・トークン生成には予測不能な乱数=CSPRNGが必要",
      "弱い乱数(時刻シード等)が招く脆弱性"
    ]
  },

  // ===== ネットワーク(追加) =====
  {
    id: "nac", cat: "ネットワーク", abbr: "NAC",
    full: "Network Access Control",
    words: [
      { en: "Network", ja: "ネットワーク" },
      { en: "Access", ja: "アクセス" },
      { en: "Control", ja: "制御" }
    ],
    literal: "ネットワークへのアクセス制御",
    func: "接続しようとする端末の認証・健全性(パッチ状況等)を検査し、満たさない端末を遮断・検疫ネットワークへ隔離する仕組み。802.1Xと組み合わせる。",
    exam: [
      "未許可・非準拠端末のLAN接続を防ぐ=NAC",
      "802.1X認証、検疫ネットワーク(隔離)の文脈"
    ]
  },
  {
    id: "acl", cat: "ネットワーク", abbr: "ACL",
    full: "Access Control List",
    words: [
      { en: "Access", ja: "アクセス" },
      { en: "Control", ja: "制御" },
      { en: "List", ja: "一覧" }
    ],
    literal: "アクセス制御の一覧",
    func: "誰(どのIP/ユーザ)が何に対してどの操作を許可/拒否されるかを列挙した規則の集合。ルータ/FWのパケットフィルタやファイル権限で使う。",
    exam: [
      "許可/拒否ルールの列挙=ACL",
      "パケットフィルタリング、最小権限の実装"
    ]
  },
  {
    id: "arp", cat: "ネットワーク", abbr: "ARP",
    full: "Address Resolution Protocol",
    words: [
      { en: "Address", ja: "アドレス" },
      { en: "Resolution", ja: "解決・解像" },
      { en: "Protocol", ja: "プロトコル(手順)" }
    ],
    literal: "アドレス解決のプロトコル",
    func: "IPアドレスから対応するMACアドレスを問い合わせる仕組み。偽の応答を返すARPスプーフィングで中間者攻撃の起点に悪用される。",
    exam: [
      "IP→MACの対応付け=ARP",
      "ARPスプーフィング(キャッシュ汚染)→中間者攻撃"
    ]
  },
  {
    id: "ntp", cat: "ネットワーク", abbr: "NTP",
    full: "Network Time Protocol",
    words: [
      { en: "Network", ja: "ネットワーク" },
      { en: "Time", ja: "時刻" },
      { en: "Protocol", ja: "プロトコル(手順)" }
    ],
    literal: "ネットワーク時刻のプロトコル",
    func: "機器の時刻を同期させるプロトコル。ログの時刻整合(フォレンジック)や証明書検証に重要。増幅型DDoSの踏み台にも悪用される。",
    exam: [
      "ログの時刻を揃える重要性=NTPによる時刻同期",
      "NTPリフレクション(増幅)攻撃の踏み台"
    ]
  },

  // ===== Webセキュリティ(追加) =====
  {
    id: "sop", cat: "Webセキュリティ", abbr: "SOP",
    full: "Same-Origin Policy",
    words: [
      { en: "Same", ja: "同一の" },
      { en: "Origin", ja: "オリジン(出自)" },
      { en: "Policy", ja: "方針" }
    ],
    literal: "同一オリジンの方針",
    func: "スクリプトは「同じオリジン(スキーム+ホスト+ポート)」の資源にしかアクセスできない、というブラウザの基本制約。越境はCORSで明示許可する。",
    exam: [
      "ブラウザの基本防御=同一オリジンポリシー",
      "緩和の正規手段=CORS、攻撃=XSS/CSRFとの関係"
    ]
  },
  {
    id: "sri", cat: "Webセキュリティ", abbr: "SRI",
    full: "Subresource Integrity",
    words: [
      { en: "Sub", ja: "下位の・補助の" },
      { en: "resource", ja: "資源" },
      { en: "Integrity", ja: "完全性" }
    ],
    literal: "副資源(外部読込)の完全性",
    func: "CDN等から読み込む外部JS/CSSにハッシュ値を指定し、改ざんされていれば実行しない仕組み。供給元改ざん(サプライチェーン)対策。",
    exam: [
      "CDNのファイル改ざん検知=SRI(integrity属性)",
      "サプライチェーン/外部スクリプトのリスク低減"
    ]
  },
  {
    id: "xxe", cat: "Webセキュリティ", abbr: "XXE",
    full: "XML External Entity",
    words: [
      { en: "XML", ja: "エックスエムエル(データ記述言語)" },
      { en: "External", ja: "外部の" },
      { en: "Entity", ja: "実体(エンティティ)" }
    ],
    literal: "XMLの外部実体(参照)",
    func: "XMLの外部実体参照を悪用し、サーバ内ファイル読み出しやSSRFを引き起こす攻撃。対策は外部実体参照の無効化。",
    exam: [
      "XMLパーサの外部実体を悪用=XXE",
      "対策=外部実体・DTDの無効化、SSRFとの関連"
    ]
  },
  {
    id: "owasp", cat: "Webセキュリティ", abbr: "OWASP",
    full: "Open Worldwide Application Security Project",
    words: [
      { en: "Open", ja: "開かれた" },
      { en: "Worldwide", ja: "世界規模の" },
      { en: "Application", ja: "アプリケーション" },
      { en: "Security", ja: "セキュリティ" },
      { en: "Project", ja: "プロジェクト" }
    ],
    literal: "世界規模のアプリセキュリティの公開プロジェクト",
    func: "Webアプリの安全性向上を目指す非営利コミュニティ。代表的な脆弱性をまとめた『OWASP Top 10』や検証ガイドが有名。",
    exam: [
      "Web脆弱性の代表リスト=OWASP Top 10の出典",
      "アクセス制御不備・インジェクション等の分類"
    ]
  },
  {
    id: "sqli", cat: "Webセキュリティ", abbr: "SQLi",
    full: "SQL Injection",
    words: [
      { en: "SQL", ja: "エスキューエル(DB問い合わせ言語)" },
      { en: "Injection", ja: "注入" }
    ],
    literal: "SQLの注入",
    func: "入力値に不正なSQL断片を混ぜ、DBに意図しない問い合わせを実行させる攻撃。情報漏えい・改ざん・認証回避を招く。対策はプレースホルダ(バインド機構)。",
    exam: [
      "対策の本命=プレースホルダ(バインド変数)、入力値検証",
      "WAFは補助。エラーメッセージ抑制、最小権限のDBユーザ"
    ]
  },

  // ===== 攻撃手法(追加) =====
  {
    id: "c2", cat: "攻撃手法", abbr: "C2",
    full: "Command and Control",
    words: [
      { en: "Command", ja: "指令・命令" },
      { en: "and", ja: "〜と" },
      { en: "Control", ja: "制御" }
    ],
    literal: "指令と制御(サーバ)",
    func: "侵入後のマルウェアが外部の攻撃者サーバと通信し、追加命令の受領や窃取データの送信を行う仕組み。正規通信に偽装することが多い。",
    exam: [
      "感染端末が外部の攻撃者と通信=C2(C&C)",
      "出口対策・通信監視で検知、キルチェーンの一段階"
    ]
  },
  {
    id: "rat", cat: "攻撃手法", abbr: "RAT",
    full: "Remote Access Trojan",
    words: [
      { en: "Remote", ja: "遠隔の" },
      { en: "Access", ja: "アクセス" },
      { en: "Trojan", ja: "トロイの木馬" }
    ],
    literal: "遠隔操作型のトロイの木馬",
    func: "感染端末を攻撃者が遠隔操作できるようにするマルウェア。画面・キー操作の窃取や追加マルウェア投入に使われ、標的型攻撃で多用。",
    exam: [
      "端末を遠隔操作する不正プログラム=RAT",
      "C2と連携、標的型攻撃の常套手段"
    ]
  },
  {
    id: "bec", cat: "攻撃手法", abbr: "BEC",
    full: "Business Email Compromise",
    words: [
      { en: "Business", ja: "ビジネス・業務" },
      { en: "Email", ja: "電子メール" },
      { en: "Compromise", ja: "侵害・悪用" }
    ],
    literal: "ビジネスメールの侵害(悪用)",
    func: "経営者や取引先になりすました偽メールで、送金や機密提供を仕向ける詐欺。技術より人をだます手口で、被害額が大きい。",
    exam: [
      "経営者/取引先になりすます送金詐欺=BEC",
      "対策=承認フロー・別経路確認、メール認証(SPF/DKIM/DMARC)"
    ]
  },
  {
    id: "rce", cat: "攻撃手法", abbr: "RCE",
    full: "Remote Code Execution",
    words: [
      { en: "Remote", ja: "遠隔の" },
      { en: "Code", ja: "コード(プログラム)" },
      { en: "Execution", ja: "実行" }
    ],
    literal: "遠隔からのコード実行",
    func: "ネットワーク越しに任意のコードを標的上で実行させる、最も深刻度の高い脆弱性の一つ。完全な乗っ取りにつながる。",
    exam: [
      "任意コード実行=最も危険(CVSS高)な脆弱性",
      "入力検証不備・デシリアライズ・既知CVEからの侵入"
    ]
  },

  // ===== 運用・組織(追加) =====
  {
    id: "xdr", cat: "運用・組織", abbr: "XDR",
    full: "Extended Detection and Response",
    words: [
      { en: "Extended", ja: "拡張された" },
      { en: "Detection", ja: "検知" },
      { en: "and", ja: "〜と" },
      { en: "Response", ja: "対応" }
    ],
    literal: "拡張された検知と対応",
    func: "端末(EDR)に加え、ネットワーク・メール・クラウド等のログを横断統合して検知・対応する。EDRより広い視野で攻撃を捉える。",
    exam: [
      "EDRを複数領域に拡張=XDR",
      "EDR/SIEM/SOARとの守備範囲の違い"
    ]
  },
  {
    id: "mdr", cat: "運用・組織", abbr: "MDR",
    full: "Managed Detection and Response",
    words: [
      { en: "Managed", ja: "管理された・委託された" },
      { en: "Detection", ja: "検知" },
      { en: "and", ja: "〜と" },
      { en: "Response", ja: "対応" }
    ],
    literal: "(外部に)委託する検知と対応",
    func: "EDR/XDR等の監視・分析・初動対応を専門事業者に委託するサービス。自社にSOC人材が不足する組織が利用する。",
    exam: [
      "検知・対応を外部委託=MDR(MSSの一種)",
      "自社運用との比較、人材不足の補完"
    ]
  },
  {
    id: "bcp", cat: "運用・組織", abbr: "BCP",
    full: "Business Continuity Plan",
    words: [
      { en: "Business", ja: "事業" },
      { en: "Continuity", ja: "継続" },
      { en: "Plan", ja: "計画" }
    ],
    literal: "事業継続の計画",
    func: "災害やサイバー攻撃などの非常時にも重要業務を継続/早期復旧するための計画。RTO/RPOを定め、代替手段や復旧手順を準備する。",
    exam: [
      "非常時の事業継続/復旧の計画=BCP",
      "RTO(復旧時間目標)/RPO(復旧時点目標)とセットで問われる"
    ]
  },
  {
    id: "rto", cat: "運用・組織", abbr: "RTO",
    full: "Recovery Time Objective",
    words: [
      { en: "Recovery", ja: "復旧" },
      { en: "Time", ja: "時間" },
      { en: "Objective", ja: "目標" }
    ],
    literal: "復旧の時間目標",
    func: "障害発生から「いつまでに」業務を復旧させるかの目標時間。短いほど高コスト。BCP/災害対策の指標。",
    exam: [
      "“いつまでに”復旧=RTO(時間軸)",
      "“どの時点まで”戻す=RPO との対比で頻出"
    ]
  },
  {
    id: "rpo", cat: "運用・組織", abbr: "RPO",
    full: "Recovery Point Objective",
    words: [
      { en: "Recovery", ja: "復旧" },
      { en: "Point", ja: "時点" },
      { en: "Objective", ja: "目標" }
    ],
    literal: "復旧の時点目標",
    func: "障害時に「どの時点のデータまで」戻せるかの目標＝許容できるデータ損失量。バックアップ頻度を決める基準。",
    exam: [
      "許容できるデータ損失=RPO(バックアップ間隔)",
      "RTO(時間)との違いを必ず区別"
    ]
  },

  // ===== 脆弱性・脅威インテリジェンス(追加) =====
  {
    id: "cwe", cat: "脆弱性・脅威", abbr: "CWE",
    full: "Common Weakness Enumeration",
    words: [
      { en: "Common", ja: "共通の" },
      { en: "Weakness", ja: "弱点" },
      { en: "Enumeration", ja: "列挙・一覧化" }
    ],
    literal: "共通の弱点の列挙",
    func: "脆弱性の“種類”(バッファオーバフロー、XSS等)を分類・体系化した辞書。個々の事例に番号を振るCVEとは層が違う。",
    exam: [
      "脆弱性の“種類”の分類=CWE(個別事例=CVE)",
      "CVE/CWE/CVSSの役割分担を問う"
    ]
  },
  {
    id: "sbom", cat: "脆弱性・脅威", abbr: "SBOM",
    full: "Software Bill of Materials",
    words: [
      { en: "Software", ja: "ソフトウェア" },
      { en: "Bill of Materials", ja: "部品表(BOM)" }
    ],
    literal: "ソフトウェアの部品表",
    func: "製品が含むOSSやライブラリ・バージョンを一覧化したもの。脆弱性(例:Log4j)発覚時に影響範囲を即座に特定でき、サプライチェーン対策の要。",
    exam: [
      "脆弱性発覚時の影響範囲特定=SBOM",
      "サプライチェーンリスク、OSS管理の文脈"
    ]
  },
  {
    id: "ioc", cat: "脆弱性・脅威", abbr: "IoC",
    full: "Indicator of Compromise",
    words: [
      { en: "Indicator", ja: "指標・痕跡" },
      { en: "of", ja: "〜の" },
      { en: "Compromise", ja: "侵害" }
    ],
    literal: "侵害の痕跡(指標)",
    func: "侵害を示す具体的な痕跡(不正なIP/ドメイン/ハッシュ値/レジストリ変更等)。検知ルールや調査の手がかりとして共有される。",
    exam: [
      "侵害の痕跡=IoC(IPやハッシュ等)",
      "脅威情報共有(CTI)で配布、検知への適用"
    ]
  },
  {
    id: "cti", cat: "脆弱性・脅威", abbr: "CTI",
    full: "Cyber Threat Intelligence",
    words: [
      { en: "Cyber", ja: "サイバー" },
      { en: "Threat", ja: "脅威" },
      { en: "Intelligence", ja: "情報・諜報" }
    ],
    literal: "サイバー脅威の情報(諜報)",
    func: "攻撃者の手口(TTPs)やIoCを収集・分析・共有して防御に活かす脅威情報。STIX/TAXII等の形式で流通する。",
    exam: [
      "攻撃者の手口・痕跡を共有=CTI(脅威インテリジェンス)",
      "IoC/TTPs、共有形式(STIX/TAXII)"
    ]
  },
  {
    id: "osint", cat: "脆弱性・脅威", abbr: "OSINT",
    full: "Open Source Intelligence",
    words: [
      { en: "Open Source", ja: "公開された情報源" },
      { en: "Intelligence", ja: "情報・諜報" }
    ],
    literal: "公開情報からの諜報",
    func: "公開情報(Web・SNS・DNS・whois等)から標的の情報を収集する活動。攻撃者の偵察段階で使われ、防御側も自社の露出把握に用いる。",
    exam: [
      "公開情報からの偵察=OSINT(キルチェーンの偵察段階)",
      "攻撃の入口情報収集、攻撃面(アタックサーフェス)管理"
    ]
  },
  {
    id: "kev", cat: "脆弱性・脅威", abbr: "KEV",
    full: "Known Exploited Vulnerabilities",
    words: [
      { en: "Known", ja: "既知の" },
      { en: "Exploited", ja: "悪用された" },
      { en: "Vulnerabilities", ja: "脆弱性(複数)" }
    ],
    literal: "既知の“悪用された”脆弱性",
    func: "実際に攻撃で悪用が確認された脆弱性のカタログ(米CISAが公開)。点数(CVSS)だけでなく“現に攻撃されている”ものを優先対処する判断材料。",
    exam: [
      "実際に悪用中の脆弱性を優先=KEV",
      "CVSSスコアだけで優先度を決めない、という文脈"
    ]
  },

  // ===== ゼロトラスト・クラウド(追加) =====
  {
    id: "casb", cat: "ゼロトラスト・クラウド", abbr: "CASB",
    full: "Cloud Access Security Broker",
    words: [
      { en: "Cloud", ja: "クラウド" },
      { en: "Access", ja: "アクセス" },
      { en: "Security", ja: "セキュリティ" },
      { en: "Broker", ja: "仲介者" }
    ],
    literal: "クラウドアクセスの安全な仲介者",
    func: "利用者とクラウドサービスの間に入り、利用状況の可視化・アクセス制御・データ保護・シャドーIT検出を行う。",
    exam: [
      "クラウド利用の可視化・統制=CASB",
      "シャドーIT対策、SASEの構成要素"
    ]
  },
  {
    id: "swg", cat: "ゼロトラスト・クラウド", abbr: "SWG",
    full: "Secure Web Gateway",
    words: [
      { en: "Secure", ja: "安全な" },
      { en: "Web", ja: "ウェブ" },
      { en: "Gateway", ja: "出入口(ゲートウェイ)" }
    ],
    literal: "安全なWebの出入口",
    func: "利用者のWebアクセスを中継し、URLフィルタリング・マルウェア検査・通信制御を行う。社外でも一貫したポリシーを適用できる(クラウド型)。",
    exam: [
      "Webアクセスを中継し検査・制御=SWG",
      "プロキシ型、SASEの構成要素"
    ]
  },
  {
    id: "dlp", cat: "ゼロトラスト・クラウド", abbr: "DLP",
    full: "Data Loss Prevention",
    words: [
      { en: "Data", ja: "データ" },
      { en: "Loss", ja: "損失・漏えい" },
      { en: "Prevention", ja: "防止" }
    ],
    literal: "データ漏えいの防止",
    func: "機密データの内容を識別し、外部へのメール送信・USBコピー・アップロード等を監視・ブロックして情報漏えいを防ぐ仕組み。",
    exam: [
      "機密データの外部持ち出しを検知・遮断=DLP",
      "内部不正・誤送信対策、パターン/フィンガープリント検出"
    ]
  },
  {
    id: "sdp", cat: "ゼロトラスト・クラウド", abbr: "SDP",
    full: "Software Defined Perimeter",
    words: [
      { en: "Software", ja: "ソフトウェア" },
      { en: "Defined", ja: "定義された" },
      { en: "Perimeter", ja: "境界・外周" }
    ],
    literal: "ソフトウェアで定義する境界",
    func: "認証されるまでサービスの存在自体を隠し(ステルス化)、認可された通信だけを動的に許可する考え方。ZTNAの実装基盤。",
    exam: [
      "認証前は見えない/動的に最小許可=SDP",
      "ZTNAの実装、VPNの境界防御との違い"
    ]
  },
  {
    id: "sase", cat: "ゼロトラスト・クラウド", abbr: "SASE",
    full: "Secure Access Service Edge",
    words: [
      { en: "Secure", ja: "安全な" },
      { en: "Access", ja: "アクセス" },
      { en: "Service", ja: "サービス" },
      { en: "Edge", ja: "縁(エッジ)" }
    ],
    literal: "安全なアクセスのサービス縁(クラウド境界)",
    func: "ネットワーク機能(SD-WAN)とセキュリティ機能(SWG/CASB/ZTNA/FWaaS)をクラウド上で統合提供する構想。場所を問わず一貫した制御を実現。",
    exam: [
      "NWとセキュリティをクラウドで統合=SASE",
      "構成要素(SWG/CASB/ZTNA)、ゼロトラストとの関係"
    ]
  },

  // ===== 法務・標準・組織 =====
  {
    id: "isms", cat: "法務・標準", abbr: "ISMS",
    full: "Information Security Management System",
    words: [
      { en: "Information", ja: "情報" },
      { en: "Security", ja: "セキュリティ" },
      { en: "Management", ja: "管理" },
      { en: "System", ja: "システム・仕組み" }
    ],
    literal: "情報セキュリティの管理の仕組み",
    func: "情報資産のリスクを継続的に管理する組織的な枠組み。PDCAで運用し、国際規格ISO/IEC 27001で認証される。",
    exam: [
      "情報セキュリティの管理体制=ISMS(ISO/IEC 27001)",
      "PDCA、リスクアセスメント、機密性/完全性/可用性"
    ]
  },
  {
    id: "gdpr", cat: "法務・標準", abbr: "GDPR",
    full: "General Data Protection Regulation",
    words: [
      { en: "General", ja: "一般の" },
      { en: "Data", ja: "データ" },
      { en: "Protection", ja: "保護" },
      { en: "Regulation", ja: "規則・規制" }
    ],
    literal: "一般データ保護規則",
    func: "EUの個人データ保護に関する規則。EU域外への移転制限や高額な制裁金が特徴。日本企業もEU住民のデータを扱えば対象になる。",
    exam: [
      "EUの個人データ保護=GDPR(域外適用・高額制裁)",
      "個人情報保護法との対比、越境データ移転"
    ]
  },
  {
    id: "pcidss", cat: "法務・標準", abbr: "PCI DSS",
    full: "Payment Card Industry Data Security Standard",
    words: [
      { en: "Payment", ja: "支払い" },
      { en: "Card", ja: "カード" },
      { en: "Industry", ja: "業界" },
      { en: "Data", ja: "データ" },
      { en: "Security", ja: "セキュリティ" },
      { en: "Standard", ja: "基準" }
    ],
    literal: "クレジットカード業界のデータセキュリティ基準",
    func: "クレジットカード情報を扱う事業者が守るべきセキュリティ基準。カード番号の保護・暗号化・アクセス制限などを要求する。",
    exam: [
      "カード情報保護の業界基準=PCI DSS",
      "カード番号の非保持化・暗号化・アクセス制御"
    ]
  },
  {
    id: "cc", cat: "法務・標準", abbr: "CC",
    full: "Common Criteria",
    words: [
      { en: "Common", ja: "共通の" },
      { en: "Criteria", ja: "評価基準" }
    ],
    literal: "共通の(セキュリティ)評価基準",
    func: "IT製品のセキュリティを第三者が評価・認証する国際規格(ISO/IEC 15408)。保証レベルEALで信頼度を示す。",
    exam: [
      "IT製品のセキュリティ評価の国際基準=CC(ISO/IEC 15408)",
      "EAL(評価保証レベル)、PP(プロテクションプロファイル)"
    ]
  },
  {
    id: "jpcert", cat: "法務・標準", abbr: "JPCERT/CC",
    full: "Japan Computer Emergency Response Team / Coordination Center",
    words: [
      { en: "Japan", ja: "日本" },
      { en: "Computer", ja: "コンピュータ" },
      { en: "Emergency", ja: "緊急" },
      { en: "Response", ja: "対応" },
      { en: "Team", ja: "チーム" },
      { en: "Coordination Center", ja: "調整センター" }
    ],
    literal: "日本のコンピュータ緊急対応・調整センター",
    func: "国内のインシデント報告受付・分析・注意喚起・国際連携を担う調整機関。脆弱性情報はIPAと連携し、JVNで公表する。",
    exam: [
      "国内インシデント対応の調整役=JPCERT/CC",
      "IPA・JVNとの脆弱性情報ハンドリングの流れ"
    ]
  },
  {
    id: "cryptrec", cat: "法務・標準", abbr: "CRYPTREC",
    full: "Cryptography Research and Evaluation Committees",
    words: [
      { en: "Cryptography", ja: "暗号" },
      { en: "Research", ja: "研究" },
      { en: "and", ja: "〜と" },
      { en: "Evaluation", ja: "評価" },
      { en: "Committees", ja: "委員会" }
    ],
    literal: "暗号の研究・評価委員会",
    func: "日本で安全性を評価し、政府機関等での利用を推奨する暗号を選定する活動。『電子政府推奨暗号リスト』を策定する。",
    exam: [
      "国が推奨する暗号を選定=CRYPTREC(電子政府推奨暗号リスト)",
      "危殆化した暗号(SHA-1等)の利用是非の判断根拠"
    ]
  },
  {
    id: "nisc", cat: "法務・標準", abbr: "NISC",
    full: "National center of Incident readiness and Strategy for Cybersecurity",
    words: [
      { en: "National center", ja: "国家中枢機関" },
      { en: "Incident readiness", ja: "インシデント即応" },
      { en: "Strategy", ja: "戦略" },
      { en: "Cybersecurity", ja: "サイバーセキュリティ" }
    ],
    literal: "サイバーセキュリティの即応・戦略の国家中枢",
    func: "日本政府のサイバーセキュリティ政策の司令塔。国家戦略の策定や政府機関の対策統括を担う。",
    exam: [
      "日本のサイバーセキュリティ政策の司令塔=NISC",
      "サイバーセキュリティ基本法、政府の体制を問う文脈"
    ]
  },

  // ===== 制御系・IoT =====
  {
    id: "ics", cat: "制御系・IoT", abbr: "ICS",
    full: "Industrial Control System",
    words: [
      { en: "Industrial", ja: "産業の" },
      { en: "Control", ja: "制御" },
      { en: "System", ja: "システム" }
    ],
    literal: "産業用制御システム",
    func: "工場やプラント等の設備を制御するシステムの総称。可用性最優先・長寿命でパッチ適用が難しく、ITとは異なるセキュリティ配慮が要る。",
    exam: [
      "可用性最優先・パッチ困難=ICS/OTのセキュリティ特性",
      "IT(機密性重視)との優先順位の違い、閉域前提の崩れ"
    ]
  },
  {
    id: "scada", cat: "制御系・IoT", abbr: "SCADA",
    full: "Supervisory Control And Data Acquisition",
    words: [
      { en: "Supervisory", ja: "監視の" },
      { en: "Control", ja: "制御" },
      { en: "And", ja: "〜と" },
      { en: "Data", ja: "データ" },
      { en: "Acquisition", ja: "収集・取得" }
    ],
    literal: "監視制御とデータ収集",
    func: "広域に分散した設備を遠隔で監視・制御するシステム。ICSの一種で、重要インフラを支えるため攻撃の標的になりやすい。",
    exam: [
      "遠隔監視制御=SCADA(ICSの一種)",
      "重要インフラ防護、IT/OT融合のリスク"
    ]
  },
  {
    id: "ot", cat: "制御系・IoT", abbr: "OT",
    full: "Operational Technology",
    words: [
      { en: "Operational", ja: "運用・運転の" },
      { en: "Technology", ja: "技術" }
    ],
    literal: "運転(制御)の技術",
    func: "物理設備を動かす制御技術の総称(対義はIT)。近年ITと接続が進み、従来は閉域で守られていたOTがサイバー攻撃にさらされるように。",
    exam: [
      "ITとOTの違い・融合のリスク",
      "OTは可用性・安全性優先、停止できない前提"
    ]
  },
  {
    id: "iot", cat: "制御系・IoT", abbr: "IoT",
    full: "Internet of Things",
    words: [
      { en: "Internet", ja: "インターネット" },
      { en: "of", ja: "〜の" },
      { en: "Things", ja: "モノ(物)" }
    ],
    literal: "モノのインターネット",
    func: "多様な機器をネットに接続する概念。初期パスワード放置や更新不全の機器が多く、乗っ取られてボットネット(DDoS)に悪用される。",
    exam: [
      "弱い初期設定/更新不能機器=IoTのリスク",
      "Mirai等のボットネット化、出荷時パスワード変更"
    ]
  },

  // ===== 無線(追加) =====
  {
    id: "wpa2", cat: "無線", abbr: "WPA2",
    full: "Wi-Fi Protected Access 2",
    words: [
      { en: "Wi-Fi", ja: "ワイファイ(無線LAN)" },
      { en: "Protected", ja: "保護された" },
      { en: "Access", ja: "アクセス" },
      { en: "2", ja: "第2世代" }
    ],
    literal: "保護された無線アクセス(第2世代)",
    func: "AES(CCMP)を採用した無線LANセキュリティ規格。長く主流だったが、KRACK攻撃などの弱点が見つかりWPA3へ移行が進む。",
    exam: [
      "AES/CCMPを使う世代=WPA2(WEP/TKIPより安全)",
      "WPA3との違い、PSK(事前共有鍵)の運用リスク"
    ]
  },
  {
    id: "wep", cat: "無線", abbr: "WEP",
    full: "Wired Equivalent Privacy",
    words: [
      { en: "Wired", ja: "有線の" },
      { en: "Equivalent", ja: "同等の" },
      { en: "Privacy", ja: "プライバシー・秘匿" }
    ],
    literal: "有線と同等の秘匿(を狙った旧方式)",
    func: "初期の無線LAN暗号方式。RC4とIV(初期化ベクトル)の設計欠陥で短時間に鍵を解読でき、現在は使用禁止レベル。",
    exam: [
      "脆弱で使ってはいけない旧無線暗号=WEP",
      "IVの使い回し・RC4の欠陥が解読の原因"
    ]
  }
];

if (typeof module !== "undefined") { module.exports = CARDS; }
