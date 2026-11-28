# Progressive Web App (PWA) Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

OmniRouteダッシュボードをプログレッシブ Web アプリとしてインストールし、ホーム画面またはデスクトップからスタンドアロン ウィンドウで開きます。インストールされたアプリは、ナビゲーション、ダッシュボード データ、およびAPIリクエストのためにOmniRouteサーバーへの接続を引き続き必要とします。キャッシュされた静的アセットは、オフライン ゲートウェイやオフライン ダッシュボードを提供しません。

## PWAとは何ですか?

プログレッシブ Web アプリは、アプリ アイコンと別のウィンドウを備えた Web ダッシュボードを使用します。インストールしたら、 OmniRoute:

- ホーム画面またはデスクトップから起動します
- ブラウザの通常のアドレス バーやタブを使用せずに、スタンドアロン モードで開きます。
- 選択した静的アセットをキャッシュします
- 縦向きと横向きをサポート

## インストール

別のデバイス上のサーバーにはHTTPSアドレスを使用します。サーバーが同じデバイス上で実行されている場合、 `http://localhost:20128`ブラウザのインストール要件も満たします。プレーンな`http://YOUR_IP:20128`アドレスはこれらの要件を満たしません。インストール メニューとプロンプトはブラウザとオペレーティング システムによって異なります。 [MDNのPWAインストール要件を](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required)参照してください。

### アンドロイド（クローム）

1. 同じ電話機上のOmniRoute HTTPSアドレス、またはサーバーの`http://localhost:20128`を開きます。
2. を開きます。**⋮**メニューを選択してください**アプリをインストールする**または**ホーム画面に追加**、提供された場合。
3. プロンプトを確認します。
4. ホーム画面からOmniRouteを開きます。

### iOS (サファリ)

1. Safari でOmniRoute HTTPSアドレスを開きます。
2. タップ**共有**→**ホーム画面に追加**。
3. 名前を確認してタップ**追加**。
4. ホーム画面からOmniRouteを開きます。

### デスクトップ（Chrome / Edge）

1. OmniRouteダッシュボードを開きます。
2. ブラウザのインストール アイコンを使用するか、**アプリをインストールする**提供されている場合は、メニューエントリ。
3. プロンプトを確認して、 OmniRoute独自のウィンドウで開きます。

## 特徴

### スタンドアロンウィンドウ

マニフェストは`display: "standalone"`と`start_url: "/dashboard"`を設定します。インストールされたアプリは、アプリ ウィンドウでダッシュボードを開きます。ブラウザとオペレーティング システムのコントロールは引き続き表示されます。マニフェストは全画面モードを要求しません。

### キャッシュされたアセットとネットワーク要件

[Service Worker は](../../public/sw.js)、選択された同一オリジンのリソースをキャッシュします。

| リクエストまたはアセット                     | 戦略                   | 行動                                                                                                                       |
| -------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| インストール時のリソース                     | 事前キャッシュ         | `/`、 `/manifest.webmanifest`、 `/icon-512.png`および`/apple-touch-icon.png`はワーカーのインストール中にキャッシュされます |
| Next.js静的アセット (`/_next/`)              | ネットワークファースト | 応答が成功するとキャッシュが更新されます。ネットワークエラーは既存のキャッシュされた応答にフォールバックします             |
| その他の静的CSS、 JS、イメージおよびフォント | キャッシュファースト   | キャッシュされた既存の応答は再利用されます。成功したネットワーク応答は失敗時にキャッシュされます                           |
| ページナビゲーション                         | バイパス               | ブラウザはページを直接取得します。オフライン フォールバックは提供されません                                                |
| API、ダッシュボードおよび認証ルート          | バイパス               | ワーカーはこれらのリクエストをインターセプトしたりキャッシュしたりしません                                                 |
| その他の非静的リクエスト                     | ネットワーク           | キャッシュの検索やストレージはありません                                                                                   |

除外されるルートは`/api`、 `/a2a`、 `/dashboard`、 `/v1`、 `/v1beta`、 `/models`、 `/chat`、 `/codex`、 `/responses`、 `/callback`および`/login`で、パス境界では大文字と小文字が区別されずに照合されます。クロスオリジンおよび非 GET リクエストもワーカーをバイパスします。

### 接続ページ

`/offline`ページには、接続メッセージ、 online/offlineインジケーター、**接続を再試行する**ボタンとステータス ページへのリンク。それは**事前にキャッシュされていない**そしてサービスワーカーはそうします**ない**失敗したナビゲーションをそれにリダイレクトします。これが存在しても、サーバーなしでは新しいページにアクセスできなくなります。

### アプリのアイコン

マニフェストは次のPNGアイコンをアドバタイズします。

| ファイル               | サイズ  | 使用                                 |
| ---------------------- | ------- | ------------------------------------ |
| `icon-192.png`         | 192×192 | 一般的なアプリのアイコン             |
| `icon-512.png`         | 512×512 | 一般的なマスク可能なアプリのアイコン |
| `apple-touch-icon.png` | 180×180 | Apple ホーム画面アイコン             |

ブラウザは、インストール ターゲットに適切なアイコンを選択します。

### 自動登録

ブラウザーが Service Worker をサポートしている場合、`PwaRegister` Worker を運用環境に登録します。開発モードでは、ワーカーの登録が解除され、キャッシュがクリアされ、古いアセットがホット リロードを妨げることがなくなります。インストールのプロンプトは依然としてブラウザーの決定に依存します。

## 技術アーキテクチャ

### ウェブアプリマニフェスト

Next.js [`src/app/manifest.ts`](../../src/app/manifest.ts)から`/manifest.webmanifest`を生成します。その主な設定は次のとおりです。

| 設定             | 価値                                            |
| ---------------- | ----------------------------------------------- |
| `short_name`     | `OmniRoute`                                     |
| `start_url`      | `/dashboard`                                    |
| `scope`          | `/`                                             |
| `display`        | `standalone`                                    |
| `orientation`    | `any`                                           |
| 背景とテーマの色 | `PWA_THEME_COLORS`のデフォルトのライト パレット |

マニフェストの名前と説明は、そのソース ファイル内の静的な値です。インストールされたマニフェストは、アクセスするたびにインスタンス名の設定やアクティブなパレットに従いません。

### サービスワーカー

[`public/sw.js`](../../public/sw.js)はサービスワーカー フレームワークの依存関係がありません。

- **インストール：**上記の 4 つのリソースを事前にキャッシュし、新しいワーカーをアクティブ化します。
- **活性化：**古いキャッシュ世代を削除し、クライアントを要求します。
- **フェッチ：**上記の静的資産戦略とルート除外を適用します。
- **バージョン管理:**ソースキャッシュ名は`omniroute-pwa-v3`です。本番ビルドではキャッシュ ID がスタンプされます。
- **通知:**受信した`push`イベントを処理し、通知がクリックされたときにウィンドウにフォーカスするか、ウィンドウを開きます。

プッシュ イベント ハンドラーだけでは、アクティブなプッシュ サブスクリプションや構成されたサーバー配信は確立されません。 PWAがインストールされているという理由だけで通知が有効になっていると想定しないでください。

### レイアウトのメタデータと登録

[`src/app/layout.tsx`](../../src/app/layout.tsx) 、マニフェスト リンク、Apple スタンドアロン メタデータ、テーマ カラー、および`viewport-fit: cover`を提供します。ページ タイトルと Apple Web アプリのタイトルにはインスタンス名が使用されます。ライブブラウザのテーマカラーはパレットに従います。インストールマニフェストではデフォルトのライトカラーが使用されます。

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx)クライアント上で実行され、 `/sw.js`そのURL内のビルドIDに登録します。キャッシュ世代の不一致を検出し、ワーカーをリセットして 1 回リロードして、古いインストールから回復できます。登録に失敗してもダッシュボードはブロックされません。

## Termux で使用する (Android)

1. Termux: `npx -y omniroute@latest`でOmniRoute開始します。
2. 同じスマートフォンで Chrome を開きます: `http://localhost:20128`。
3. ブラウザのインストール メニューからPWAインストールします。
4. ダッシュボードの使用中は、Termux サーバーを実行し続けます。

電話機はゲートウェイとそのダッシュボードの両方をホストします。リモートAIプロバイダーへのリクエストには、引き続きネットワーク アクセスが必要です。セットアップと Android プロセスの存続期間に関する考慮事項については、 [Termux ガイドを](TERMUX_GUIDE.md)参照してください。

## 他のデバイスからの使用

電話、タブレット、またはデスクトップでサーバーのHTTPSアドレスを開き、そのブラウザのインストール フローに従います。サーバーは各デバイスからアクセス可能な状態を維持する必要があります。リモート アクセス オプションについては、[トンネル ガイド](../ops/TUNNELS_GUIDE.md)を参照してください。

## カスタマイズ

### インスタンス名

の**インスタンス名**この設定により、ページ タイトルや Apple Web アプリ タイトルなどのダッシュボード メタデータが変更されます。生成されたマニフェストでは静的な名前が使用されるため、この設定では、既にインストールされているアプリの名前が変更されることが保証されません。

### カスタムファビコン

カスタム ファビコンはブラウザのファビコンを変更します。インストール マニフェストは依然として上記のPNGファイルをアドバタイズします。ファビコンを変更しても、ホーム画面のアイコンは置き換えられません。

## 制限事項

- **サーバー接続が必要です:**ページ ナビゲーション、ダッシュボードの状態、およびAPIリクエストにはオフライン フォールバックがありません。
- **バックグラウンド同期なし:**オフライン アクションは再生のためにキューに入れられません。
- **ブラウザの違い:**インストール メニュー、ウィンドウのプレゼンテーション、通知のサポートはプラットフォームによって異なります。
- **API応答キャッシュがありません:**ワーカーはAPI、ダッシュボード、および認証ルートを除外します。
- **静的インストール アイコン:**これらのアイコンを更新するには、アドバタイズされたアセットを変更する必要があります。ブラウザはインストールされたメタデータを保持する場合があります。

## ファイルリファレンス

| ファイル                                                                               | 目的                                              |
| -------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | 生成されたWebアプリマニフェスト                   |
| [public/sw.js](../../public/sw.js)                                                     | キャッシュ、除外、通知イベント ハンドラー         |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | 本番登録と古いキャッシュのリカバリ                |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | 自動オフライン フォールバックではなく、接続ページ |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | ページのメタデータとビューポートの設定            |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | 共有テーマカラー値                                |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512 アプリのアイコン                        |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 アップルアイコン                        |
