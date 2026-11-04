# Electron Desktop Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **真実の情報源:** `electron/`ワークスペース**最終更新日:** 2026-06-28 — v3.8.40

OmniRoute 、上に構築されたクロスプラットフォーム デスクトップ アプリ (Windows / macOS / Linux) を出荷します。**Electron 41** +**電子ビルダー 26.10** 。デスクトップ アプリは、 Next.jsスタンドアロン サーバーを子プロセスとして生成し、それに`BrowserWindow`を指定し、システム トレイ、自動アップデータ、 IPCブリッジ、およびゼロ構成のシークレット ブートストラップを追加します。

## 建築

```
┌──────────────────────────────────────────────┐
│ Electron main process (electron/main.js)     │
│ ├─ Single-instance lock                       │
│ ├─ Child process: Next.js standalone server  │
│ │   (spawned with Electron's Node runtime)   │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ System tray + context menu                │
│ ├─ Auto-update via electron-updater          │
│ ├─ Content Security Policy (session headers) │
│ └─ Secret bootstrap (JWT / API_KEY_SECRET)   │
└──────────────────────────────────────────────┘
            ↕ IPC bridge (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderer (Next.js dashboard)                  │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## バージョン

`electron/package.json`から確認:

| パッケージ         | バージョン                                                                   |
| ------------------ | ---------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                    |
| `electron-builder` | `^26.15.3`                                                                   |
| `electron-updater` | `^6.8.9`                                                                     |
| `better-sqlite3`   | root `^13.0.2` (ノード API は—事前ビルドしますが、 Electron再構築されません) |
| アプリのバージョン | `3.8.0`                                                                      |
| アプリID           | `online.omniroute.desktop`                                                   |
| 製品名             | `OmniRoute`                                                                  |

## スクリプト (ルート`package.json`)

| スクリプト                        | 目的                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------ |
| `npm run electron:dev`            | Starts `npm run dev` + waits for `localhost:20128` + launches Electron                     |
| `npm run electron:build`          | Next.jsをビルドしてから、現在のOSに対して`electron-builder`を実行します。                  |
| `npm run electron:build:win`      | Windows NSISインストーラー+ポータブル (x64) をビルドします。                               |
| `npm run electron:build:mac`      | macOS DMG (インテル+ Apple Silicon) をビルドします                                         |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) をビルドします                                          |
| `npm run electron:smoke:packaged` | パッケージ化されたバイナリを起動し、 `/login`でHTTP 200 を調べてからシャットダウンします。 |

`electron/`ワークスペースでは、以下も公開されます。

- `npm run prepare:bundle` —は`scripts/build/prepare-electron-standalone.mjs`を実行します
- `npm run build:mac-x64` / `build:mac-arm64` —シングルアーチmacOSビルド
- `npm run pack` —ローカル テスト用のディレクトリのみのビルド (インストーラーなし)

## オプションのランタイム パック

デスクトップ ビルドでは、インストーラーと一緒にオプションのランタイム アーカイブを公開できます。インストールされたサーバー ペイロードには`optional-packs.index.json` ( WindowsおよびLinuxの`resources/app`の下) が含まれています。 `browser-runtime`エントリについては、 `packs[].tarball`読んでダウンロードします。**同じリリースのその正確なファイル名**。アーカイブ名にはSHA-256ダイジェストが含まれます。異なるビルドには異なるアーカイブが必要になる場合があります。ダウンロードしたファイル名は変更しないでください。

インストールされたアプリのインデックスと選択したアーカイブを 1 つのディレクトリにコピーし、同じリリースのCLI使用します。

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list`アーカイブ ファイル名ではなく、インストールと検証の状態を表示します。バンドルされたインデックスによってアーカイブが選択されます。インストールでは、抽出前にアーカイブ チェックサムを検証し、インストールされたパックを置き換える前にパッケージ チェックサムを検証します。ローカルファイルを読み取ります。不足しているアーカイブはダウンロードされません。インストール後にアプリケーションを再起動します。リリースに一致するアセットがない場合、そのリリースのアセットからオプション パックを利用することはできません。

## ディレクトリのレイアウト

```
electron/
├── package.json              # Electron deps + electron-builder config
├── main.js                   # Main process (24 KB — see annotations below)
├── preload.js                # contextBridge IPC bridge
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI types
├── README.md                 # In-workspace notes
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder output (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Stages .next/electron-standalone bundle
└── dev/
    └── smoke-electron-packaged.mjs       # Post-build smoke test
```

`main.js`と`preload.js`はどちらも**CommonJS `.js`ファイル**、 TypeScriptはありません。レンダラ側の型指定は`electron/types.d.ts`にあります。

## IPCブリッジ (`preload.js`)

プリロードは、 `contextBridge`と`contextIsolation: true`および`nodeIntegration: false`を使用して、 `window.electronAPI`上のホワイトリストに登録されたAPIを公開します。

```javascript
const VALID_CHANNELS = {
  invoke: [
    "get-app-info",
    "open-external",
    "get-data-dir",
    "restart-server",
    "check-for-updates",
    "download-update",
    "install-update",
    "get-app-version",
  ],
  send: ["window-minimize", "window-maximize", "window-close"],
  receive: ["server-status", "port-changed", "update-status"],
};
```

公開されたメソッド:

| レンダラ呼び出し                                                  | タイプ                         |
| ----------------------------------------------------------------- | ------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | 呼び出す                       |
| `openExternal(url)`                                               | 呼び出す                       |
| `getDataDir()`                                                    | 呼び出す                       |
| `restartServer()`                                                 | 呼び出す                       |
| `getAppVersion()`                                                 | 呼び出す                       |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | 呼び出す                       |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | 送信                           |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | 受け取る（ディスポーザを返す） |

受信ヘルパーは、**ディスポーザー機能**`removeAllListeners` —に依存するのではなく、 Reactコンポーネントが再マウントされるときのリスナーの蓄積を防ぎます。

## サーバーのライフサイクル

`main.js`ネイティブ モジュールのABIとシステム ノードの不一致を避けるために、 Electronノード ランタイムを使用してNext.jsスタンドアロン バンドルを直接生成します。

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

ハイライト:

- `waitForServer()`ウィンドウを表示する前に最大 30 秒間URLをポーリングします (コールド スタートでは空白の画面は表示されません)。
- `stdio: "pipe"` stdout/stderrをキャプチャします。準備完了フレーズ (`Ready` / `listening`) は、 IPCを介して`server-status: running`発行します。
- `before-quit`正常なSIGTERM (WALチェックポイント) を最大 5 秒待機してから、 SIGKILLを送信します。
- トレイのポート スイッチャー (`20128`、 `3000`、 `8080`) はサーバーを停止して再起動し、その後BrowserWindowをリロードします。

## ゼロ構成のシークレットブートストラップ

最初の起動時に、メイン プロセスが不足しているシークレットを自動生成して保持します。

| 秘密                     | ソース                                                                                    |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                  |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (暗号化された認証情報がすでに存在する場合は拒否) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                  |

`<DATA_DIR>/server.env`に固執しました。 `DATA_DIR`次のように解決されます。

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute`または`~/.omniroute`
- macOS: `~/.omniroute`

## 環境ファイルの検索

サーバーを生成する前に、メインプロセス (`getPreferredEnvFilePath()`の`electron/main.js`) は**1つ**`.env`ファイル: 最初に存在するファイル。

1. `$DATA_DIR/.env`、アプリが起動された環境で`DATA_DIR`が設定されている場合。
2. `<resolved DATA_DIR>/.env`。上記と同じデフォルトを使用します。 Windowsでは`%APPDATA%\omniroute\.env` 、 `$XDG_CONFIG_HOME/omniroute/.env`およびLinuxでは`~/.omniroute/.env`またはmacOS。
3. プロセス作業ディレクトリ内の`.env` 。

メインプロセスはそのファイルのみを読み取ります。後の候補はマージされません。その後、サーバー環境は次の優先順位 (最も高いものから順) で構築されます。

1. Electronプロセス環境 (アプリを起動したものから継承された変数)。
2. 選択した`.env`ファイル。
3. `<DATA_DIR>/server.env` (上記のブートストラップ シークレット)。

プロセス環境はアプリの起動時にキャプチャされるため、アプリの実行中 (ウィンドウを閉じた後にトレイにある間を含む) に設定されたシステム環境変数またはユーザー環境変数は、アプリが完全に終了して再起動されるまでサーバーに到達しません。 `CONTEXT_LENGTH_<PROVIDER>`などのランタイム ノブの場合 ( [「環境変数: プロバイダーごとのコンテキストの長さ](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)」を参照)、 `.env`ファイルを優先し、完全に終了します (トレイ、**やめる**)して再起動します。

## ウィンドウ＆トレイ

- `BrowserWindow`: 1400 × 900 (最小 1024 × 700)、 `backgroundColor: "#0a0a0a"`。
- macOS: `titleBarStyle: "hiddenInset"`、 `{ x: 16, y: 16 }`の信号機。
- Windows/Linux: ネイティブのタイトルバー。
- 閉じるボタンはトレイに最小化します。トレイメニューには**OmniRouteを開く**、**ダッシュボードを開く**(外部ブラウザ)、**サーバーポート**サブメニュー、**アップデートをチェックする**、**やめる**。

## コンテンツセキュリティポリシー

`session.defaultSession.webRequest.onHeadersReceived`経由で設定します。注目すべきディレクティブ:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- 開発モードでは`'unsafe-eval'` `script-src`にのみ追加されます

## 自動更新

`electron-updater` GitHubプロバイダー (`diegosouzapw/OmniRoute`) とともに使用します。

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- `update-status` IPC経由でレンダラーに転送されるイベント: `checking`、 `available`、 `not-available`、 `downloading` ( `percent`を使用)、 `downloaded`、 `error`
- `installUpdate()`サーバーを強制終了してから`autoUpdater.quitAndInstall()`を呼び出します
- 開発モード (`!app.isPackaged`) ではスキップされます

## パイプラインの構築

1. `npm run build` → Next.js `.next/standalone`内のスタンドアロン。
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone`に再ステージングされ、バンドルが再配置可能になるように`server.js` + `required-server-files.json`内の絶対パスを書き換えます。
3. `electron-builder`パッケージ`main.js`、 `preload.js`、 `node_modules`、および`extraResources: { ../.next/electron-standalone → app }`。

### ビルドターゲット

| OS      | ターゲット                                          |
| ------- | --------------------------------------------------- |
| Windows | NSISインストーラー+ポータブル (x64)                 |
| macOS   | DMG (インテル+ arm64、アプリケーションへのドラッグ) |
| Linux   | AppImage + DEB (x64 + arm64)                        |

NSIS設定: `oneClick: false`、ユーザーがインストール ディレクトリを選択し、デスクトップとスタート メニューのショートカットを作成できるようにします。

## 煙テストのパッケージ化されたビルド

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- 現在のプラットフォーム用の`electron/dist-electron/`にパッケージ化されたバイナリを自動検出します。
- 分離された`HOME`/`APPDATA`/`XDG_*`ディレクトリで起動するため、開発者のデータには影響しません。
- 45 秒以内に`http://127.0.0.1:20128/login`でHTTP 200 をポーリングします。
- stderr/stdoutで致命的なパターン (`Cannot find module`、 `MODULE_NOT_FOUND`、 `ERR_DLOPEN_FAILED`、 `Failed to start server`など) を監視します。
- 準備が整った後、安定したランタイムを 2 秒待機してから、 SIGTERMを発行してポートが解放されるのを待ちます。
- CIでは、 `--no-sandbox --disable-gpu` (およびLinux上の`--disable-dev-shm-usage` ) を自動的に渡します。

環境オーバーライド: `ELECTRON_SMOKE_APP_EXECUTABLE`、 `ELECTRON_SMOKE_URL`、 `ELECTRON_SMOKE_TIMEOUT_MS`、 `ELECTRON_SMOKE_SETTLE_MS`、 `ELECTRON_SMOKE_DATA_DIR`、 `ELECTRON_SMOKE_KEEP_DATA`、 `ELECTRON_SMOKE_STREAM_LOGS`。

## コードサイニング

`electron/package.json`行います**ない**署名資格情報を直接送信します。これらを env vars 経由で`electron-builder`に渡します。

### macOS

```bash
export APPLE_ID=<email>
export APPLE_APP_SPECIFIC_PASSWORD=<password>
export APPLE_TEAM_ID=<id>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<cert-password>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<cert-password>
npm run electron:build:win
```

### Linux

AppImage署名はオプションです。署名する場合は—設定し、 `LINUX_GPG_KEY`を設定します。

## 分布

アーティファクトが`electron/dist-electron/`に着陸します:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

リリースはGitHubリリース (`diegosouzapw/OmniRoute`) に公開され、 `electron-updater`新しいバージョンをチェックする場所でもあります。

## トラブルシューティング

| 症状                                                            | 修理                                                                                                                                                                          |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electronメジャーバンプ後の`Cannot find module 'better-sqlite3'` | better-sqlite3 v13 には Node-API プレビルドが同梱されています。 —ルートおよび`prepare:bundle`で`npm install`を再実行します (現在のプラットフォームのプレビルドを検証します)。 |
| ネイティブモジュールの`ERR_DLOPEN_FAILED`                       | `prepare:bundle` —を再実行すると、現在のプラットフォーム用の Node-API プリビルドが見つからない場合、すぐに失敗します。                                                        |
| Linuxでウィンドウが空白で表示される                             | Next.jsサーバーが実際にPORTにバインドされていることを確認します ( `[Server]`ログを確認します)。                                                                               |
| macOS公証が停滞                                                 | `.env`だけでなく、 `APPLE_*`変数もエクスポートされるようにする                                                                                                                |
| Windows SmartScreen警告                                         | EV cert で署名するか、ユーザーが→右クリックして「とにかく実行」                                                                                                               |
| 使用中のポートでスモーク テストが失敗する                       | `electron:smoke:packaged`を実行する前に、20128 上のローカル開発サーバーを停止します。                                                                                         |

## 関連項目

- [SETUP_GUIDE](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST](../ops/RELEASE_CHECKLIST.md)
- ソース: `electron/main.js`、 `electron/preload.js`、 `electron/package.json`
- ヘルパー: `scripts/build/prepare-electron-standalone.mjs`、 `scripts/dev/smoke-electron-packaged.mjs`
