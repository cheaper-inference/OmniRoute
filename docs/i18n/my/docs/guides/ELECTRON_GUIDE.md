# Electron Desktop Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **အမှန်တရားအရင်းအမြစ်-** `electron/` အလုပ်ခွင်** နောက်ဆုံးအပ်ဒိတ်လုပ်ထားသည်-** 2026-06-28 — v3.8.40

OmniRoute တည်ဆောက်ထားသော cross-platform desktop app (Windows / macOS / Linux) ကို ပေးပို့သည်**Electron ၄၁** +** အီလက်ထရွန်တည်ဆောက်သူ ၂၆.၁၀** . ဒက်စ်တော့အက်ပ်သည် Next.js သီးသန့်ဆာဗာကို ကလေးလုပ်ငန်းစဉ်အဖြစ် ပေါက်ဖွားစေပြီး `BrowserWindow` ကို ညွှန်ပြကာ စနစ်ဗန်း၊ အလိုအလျောက် အပ်ဒိတ်လုပ်သူ၊ IPC တံတားနှင့် သုည config လျှို့ဝှက် bootstrap တို့ကို ပေါင်းထည့်သည်။

## ဗိသုကာပညာ

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

## ဗားရှင်းများ

`electron/package.json` မှအတည်ပြုခဲ့သည်

| အထုပ်              | ဗားရှင်း                                                  |
| ------------------ | --------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                 |
| `electron-builder` | `^26.15.3`                                                |
| `electron-updater` | `^6.8.9`                                                  |
| `better-sqlite3`   | root `^13.0.2` (Node-API prebuilds — no Electron rebuild) |
| အက်ပ်ဗားရှင်း      | `3.8.0`                                                   |
| အက်ပ်အိုင်ဒီ       | `online.omniroute.desktop`                                |
| ထုတ်ကုန်အမည်       | `OmniRoute`                                               |

## Script များ (root `package.json`)

| ဇာတ်ညွှန်း                        | ရည်ရွယ်ချက်                                                                            |
| --------------------------------- | -------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` + စတင်သည် `localhost:20128` + လွှတ်တင်ခြင်း Electron ကိုစောင့်ဆိုင်းသည်။ |
| `npm run electron:build`          | Next.js တည်ဆောက်ပြီးနောက် လက်ရှိ OS အတွက် `electron-builder` လုပ်ဆောင်သည်။             |
| `npm run electron:build:win`      | Windows NSIS installer + ခရီးဆောင် (x64) ကို တည်ဆောက်သည်                               |
| `npm run electron:build:mac`      | macOS DMG (Intel + Apple Silicon) တည်ဆောက်သည်                                          |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) တည်ဆောက်သည်                                         |
| `npm run electron:smoke:packaged` | ထုပ်ပိုးထားသော binary နှင့် HTTP 200 အတွက် `/login` စတင်ပြီးနောက် ပိတ်လိုက်ပါ။         |

`electron/` အလုပ်ခွင်တွင်လည်း ဖော်ထုတ်ထားသည်-

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` လုပ်ဆောင်သည်။
- `npm run build:mac-x64` / `build:mac-arm64` — single-arch macOS တည်ဆောက်သည်။
- `npm run pack` — directory-only build for local test (ထည့်သွင်းသူမရှိပါ)

## ရွေးချယ်နိုင်သော runtime packs

ဒက်စ်တော့တည်ဆောက်မှုများသည် ၎င်းတို့၏ထည့်သွင်းသူများနှင့်အတူ ရွေးချယ်နိုင်သော runtime မှတ်တမ်းများကို ထုတ်ဝေနိုင်သည်။ ထည့်သွင်းထားသော ဆာဗာ ပေးဆောင်မှုတွင် `optional-packs.index.json` ( `resources/app` အောက်တွင် Windows နှင့် Linux) ပါရှိသည်။ `browser-runtime` entry အတွက် `packs[].tarball` ဖတ်ပြီး ဒေါင်းလုဒ်လုပ်ပါ။** တူညီသောထုတ်ဝေမှုမှ ဖိုင်အမည်အတိအကျ** . မှတ်တမ်းဟောင်းအမည်များတွင် SHA-256 digest ပါဝင်သည်။ မတူညီသော တည်ဆောက်မှုများသည် မတူညီသော မော်ကွန်းတိုက်များ လိုအပ်နိုင်သည်။ ဒေါင်းလုဒ်လုပ်ထားသော ဖိုင်အမည်ကို မပြောင်းလဲထားပါ။

ထည့်သွင်းထားသော အက်ပ်၏ အညွှန်းနှင့် ရွေးချယ်ထားသော မှတ်တမ်းကို လမ်းညွှန်တစ်ခုထဲသို့ ကူးယူပြီး တူညီသောထုတ်ဝေမှုမှ CLI အသုံးပြုပါ-

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` မှတ်တမ်းဖိုင်အမည်မဟုတ်ဘဲ ထည့်သွင်းခြင်းနှင့် အတည်ပြုခြင်းအခြေအနေကို ပြသသည်။ စုစည်းထားသော အညွှန်းသည် မှတ်တမ်းဟောင်းကို ရွေးချယ်သည်။ ထည့်သွင်းခြင်း သည် ထုတ်ယူခြင်းမပြုမီ ၎င်း၏ မော်ကွန်းစစ်ဆေးချက်ဆမ်းများနှင့် တပ်ဆင်ထားသည့် ပက်ကေ့ခ်ျကို အစားထိုးခြင်းမပြုမီ ၎င်း၏ ပက်ကေ့ခ်ျစစ်ဆေးမှုများကို စစ်ဆေးသည်။ ၎င်းသည် ဒေသတွင်းဖိုင်များကိုဖတ်သည်။ ပျောက်ဆုံးနေသော မှတ်တမ်းများကို ဒေါင်းလုဒ်မလုပ်ပါ။ တပ်ဆင်ပြီးနောက် အပလီကေးရှင်းကို ပြန်လည်စတင်ပါ။ ထုတ်ဝေမှုတွင် ကိုက်ညီသည့် ပိုင်ဆိုင်မှုမရှိပါက၊ ထိုထုတ်ဝေမှု၏ ပိုင်ဆိုင်မှုများမှတစ်ဆင့် ရွေးချယ်နိုင်သော အတွဲကို မရနိုင်ပါ။

## လမ်းညွှန်လက်ကွက်

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

`main.js` နှင့် `preload.js` နှစ်မျိုးလုံး**CommonJS `.js` ဖိုင်များ** TypeScript မဟုတ်ပါ။ တင်ဆက်သူဘက်မှ စာရိုက်များသည် `electron/types.d.ts` တွင် နေထိုင်သည်။

## IPC တံတား (`preload.js`)

အကြိုတင်ခြင်းသည် `contextIsolation: true` နှင့် `nodeIntegration: false` ဖြင့် `contextBridge` အသုံးပြု၍ `window.electronAPI` တွင် အဖြူရောင်စာရင်းသွင်းထားသော API ဖော်ထုတ်သည်။

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

ဖော်ထုတ်ထားသော နည်းလမ်းများ-

| သရုပ်ဖေါ်ခေါ်ဆိုခြင်း။                                            | ရိုက်ပါ။                           |
| ----------------------------------------------------------------- | ---------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | ဖိတ်ခေါ်ပါ။                        |
| `openExternal(url)`                                               | ဖိတ်ခေါ်ပါ။                        |
| `getDataDir()`                                                    | ဖိတ်ခေါ်ပါ။                        |
| `restartServer()`                                                 | ဖိတ်ခေါ်ပါ။                        |
| `getAppVersion()`                                                 | ဖိတ်ခေါ်ပါ။                        |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | ဖိတ်ခေါ်ပါ။                        |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | ပို့ပါ။                            |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | လက်ခံ (စွန့်ပစ်ပစ္စည်း ပြန်ပေးသည်) |

လက်ခံရရှိသူများသည် A ပြန်လာကြသည်။** disposer function** `removeAllListeners` — ကို အားကိုးမည့်အစား ၎င်းသည် React အစိတ်အပိုင်းများ ပြန်တက်လာသောအခါ နားထောင်သူစုဆောင်းမှုကို တားဆီးသည်။

## Server Lifecycle

`main.js` သည် Next.js standalone အစုအစည်းကို Electron Node runtime ဖြင့် တိုက်ရိုက် မွေးဖွားပေးသည်- စနစ် Node နှင့် ဇာတိ-မော်ဂျူး ABI မကိုက်ညီမှုမှ ရှောင်ရှားရန်။

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

ပေါ်လွင်ချက်များ-

- `waitForServer()` ပြတင်းပေါက်ကိုမပြမီ URL ကို 30 အထိ စစ်တမ်းကောက်ယူသည် (အအေးစတင်ချိန်တွင် မျက်နှာပြင်အလွတ်မရှိပါ)။
- `stdio: "pipe"` ဖမ်းယူသည် stdout/stderr; အဆင်သင့်စကားစုများ (`Ready` / `listening`) `server-status: running` IPC မှ ထုတ်လွှတ်သည်။
- `before-quit` လှပသော SIGTERM (WAL စစ်ဆေးရေးဂိတ်) အတွက် 5 s အထိ စောင့်ပြီး SIGKILL ပို့ပေးသည်။
- ဗန်းအတွင်းရှိ ပို့တ်ပြောင်းကိရိယာ (`20128`၊ `3000`၊ `8080`) ရပ်တန့်ပြီး ဆာဗာကို ပြန်လည်စတင်ပြီးနောက် BrowserWindow ကို ပြန်လည်စတင်သည်။

## Zero-config လျှို့ဝှက် Bootstrap

ပထမအကြိမ် စတင်ခြင်းတွင်၊ အဓိက လုပ်ငန်းစဉ်သည် အလိုအလျောက် ထုတ်ပေးပြီး ပျောက်ဆုံးနေသော လျှို့ဝှက်ချက်များကို ဆက်လက်လုပ်ဆောင်သည်-

| လျှို့ဝှက်ချက်           | အရင်းအမြစ်                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                      |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (ကုဒ်ဝှက်ထားသော ခရက်ဒစ်များ ရှိနှင့်ပါက ငြင်းဆိုသည်) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                      |

`<DATA_DIR>/server.env` တွင်ဆက်လက်တည်ရှိခဲ့သည်။ `DATA_DIR` မှ ဖြေရှင်းသည်

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` သို့မဟုတ် `~/.omniroute`
- macOS: `~/.omniroute`

## ပတ်ဝန်းကျင်ဖိုင်ကို ရှာဖွေခြင်း။

ဆာဗာကို မဖြန့်မီ၊ ပင်မလုပ်ငန်းစဉ် (`getPreferredEnvFilePath()` in `electron/main.js`) ကို ရွေးသည်။** တစ်ခု** `.env` ဖိုင်- ဤအရာများထဲမှ ပထမဆုံးဖြစ်သည်။

1. `$DATA_DIR/.env`၊ `DATA_DIR` ကို ပတ်ဝန်းကျင်တွင် သတ်မှတ်သောအခါ၊ အက်ပ်ကို စတင်ခဲ့သည်။
2. `<resolved DATA_DIR>/.env`၊ အထက်ဖော်ပြပါကဲ့သို့တူညီသောမူလများကိုအသုံးပြုသည်- `%APPDATA%\omniroute\.env` တွင် Windows၊ `$XDG_CONFIG_HOME/omniroute/.env` သို့မဟုတ် `~/.omniroute/.env` နှင့် Linux နှင့် macOS ပေါ်တွင်။
3. `.env` လုပ်ငန်းစဉ်တွင် အလုပ်လုပ်သောလမ်းညွှန်။

ပင်မလုပ်ငန်းစဉ်သည် ထိုဖိုင်ကိုသာ ဖတ်သည်။ နောက်ပိုင်းတွင် ကိုယ်စားလှယ်လောင်းများကို ပေါင်းစည်းခြင်းမပြုပါ။ ထို့နောက် ဆာဗာပတ်ဝန်းကျင်ကို ဤဦးစားပေး (အမြင့်ဆုံးပထမ) ဖြင့် တည်ဆောက်ပါသည်။

1. Electron လုပ်ငန်းစဉ်ပတ်ဝန်းကျင် (အက်ပ်ကိုဖွင့်ထားသမျှမှ အမွေဆက်ခံသည့်ကိန်းရှင်များ)။
2. ရွေးချယ်ထားသော `.env` ဖိုင်။
3. `<DATA_DIR>/server.env` (အထက် bootstrap လျှို့ဝှက်ချက်များ)။

အက်ပ်စတင်သောအခါတွင် လုပ်ငန်းစဉ်ပတ်ဝန်းကျင်ကို ဖမ်းယူထားသောကြောင့် အက်ပ်လည်ပတ်နေချိန်တွင် စနစ် သို့မဟုတ် အသုံးပြုသူပတ်ဝန်းကျင် ပြောင်းလဲနိုင်သောသတ်မှတ်မှုတစ်ခု (၎င်း၏ဝင်းဒိုးပိတ်ပြီးနောက် ဗန်းထဲတွင် ထိုင်နေချိန်အပါအဝင်) အက်ပ်အား အပြီးအပိုင်ပိတ်ပြီး ပြန်လည်စတင်သည့်အချိန်အထိ ဆာဗာသို့ မရောက်ပါ။ `CONTEXT_LENGTH_<PROVIDER>` ကဲ့သို့သော runtime knob များအတွက် ( [Environment Variables များကိုကြည့်ပါ- ဝန်ဆောင်မှုပေးသူတစ်ခုချင်း၏ context length ကို](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ကြည့်ပါ) ၊ `.env` ဖိုင်ကို နှစ်သက်သည်၊ ထို့နောက် အပြည့်အ၀ထွက်ပါ (ဗန်း၊** ထွက်လိုက်ပါ။** ) နှင့် ပြန်လည်စတင်ပါ။

## ပြတင်းပေါက်နှင့် ဗန်း

- `BrowserWindow`: 1400 × 900 (အနည်းဆုံး 1024 × 700), `backgroundColor: "#0a0a0a"`
- macOS: `titleBarStyle: "hiddenInset"`, traffic-light at `{ x: 16, y: 16 }`.
- Windows/Linux: မူရင်း ခေါင်းစဉ်ဘား။
- ပိတ်ခလုတ်သည် ဗန်းထဲသို့ နိမ့်သွားသည် ။ ဗန်းမီနူး ပါရှိပါသည်။** OmniRoute ဖွင့်ပါ။** ၊** Dashboard ကိုဖွင့်ပါ။** (ပြင်ပဘရောက်ဆာ)၊** ဆာဗာ ဆိပ်ကမ်း** မီနူး၊** အပ်ဒိတ်များအတွက် စစ်ဆေးပါ။** ၊** ထွက်လိုက်ပါ။** .

## အကြောင်းအရာ လုံခြုံရေးမူဝါဒ

`session.defaultSession.webRequest.onHeadersReceived` မှတဆင့်သတ်မှတ်ပါ။ ထင်ရှားသော ညွှန်ကြားချက်များ-

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev မုဒ်သည် `'unsafe-eval'` ကို `script-src` တွင်သာ ပေါင်းထည့်သည်။

## အလိုအလျောက်မွမ်းမံခြင်း။

`electron-updater` GitHub ပံ့ပိုးပေးသူ (`diegosouzapw/OmniRoute`) ဖြင့် အသုံးပြုသည်။

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- `update-status` IPC မှတဆင့် တင်ဆက်သူသို့ ထပ်ဆင့်ပို့သော အစီအစဉ်များ : `checking`, `available`, `not-available`, `downloading` (with `percent`), `downloaded`, `error`
- `installUpdate()` server ကိုသတ်ပြီးနောက် `autoUpdater.quitAndInstall()` ကိုခေါ်သည်။
- dev မုဒ် (`!app.isPackaged`) တွင် ကျော်သွားသည်

## ပိုက်လိုင်းတည်ဆောက်ပါ။

1. `npm run build` → Next.js standalone `.next/standalone`။
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone` သို့ ပြန်လည်အဆင့်ပြီး `server.js` + `required-server-files.json` အတွင်းရှိ absolute paths များကို ပြန်လည်ရေးသားပေးသောကြောင့် အစုအဝေးကို နေရာရွှေ့ပြောင်းနိုင်ပါသည်။
3. `electron-builder` အထုပ်များကို `main.js`၊ `preload.js`၊ `node_modules` နှင့် `extraResources: { ../.next/electron-standalone → app }`။

### ရည်မှန်းချက်များတည်ဆောက်ပါ။

| OS      | ပစ်မှတ်များ                               |
| ------- | ----------------------------------------- |
| Windows | NSIS installer + ခရီးဆောင် (x64)          |
| macOS   | DMG (Intel + arm64၊ drag-to-Applications) |
| Linux   | AppImage + DEB (x64 + arm64)              |

NSIS ဆက်တင်များ- `oneClick: false`၊ အသုံးပြုသူအား ထည့်သွင်းသည့်လမ်းညွှန်ကို ရွေးချယ်ခွင့်ပေးပြီး၊ Desktop နှင့် Start-Menu ဖြတ်လမ်းများကို ဖန်တီးပေးသည်။

## Smoke Testing Packaged Build

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- လက်ရှိပလက်ဖောင်းအတွက် `electron/dist-electron/` တွင် ထုပ်ပိုးထားသော binary ကို အလိုအလျောက်ရှာဖွေသည်။
- သီးခြား `HOME`/`APPDATA`/`XDG_*` လမ်းညွှန်များဖြင့် ဖွင့်ထားသောကြောင့် ၎င်းသည် developer ဒေတာကို မထိမိပါ။
- ၄၅ စက္ကန့်အတွင်း HTTP 200 အတွက် `http://127.0.0.1:20128/login` စစ်တမ်းများ။
- ဆိုးဝါးသောပုံစံများ (`Cannot find module`၊ `MODULE_NOT_FOUND`၊ `ERR_DLOPEN_FAILED`၊ `Failed to start server` စသည်ဖြင့်) အတွက် stderr/stdout ကြည့်သည်။
- အဆင်သင့်ဖြစ်ပြီးနောက် တည်ငြိမ်သော runtime 2 s ကိုစောင့်ပါ၊ ထို့နောက် SIGTERM ကိုထုတ်ပေးပြီး port လွတ်သွားသည်အထိစောင့်ပါ။
- CI တွင် `--no-sandbox --disable-gpu` (နှင့် `--disable-dev-shm-usage` တွင် Linux) အလိုအလျောက်ဖြတ်သန်းသည်။

Env အပေါ်ထပ်- `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## ကုဒ်လက်မှတ်ထိုးခြင်း။

`electron/package.json` လုပ်တယ်။** မဟုတ်ဘူး** ကြေးနန်းအထောက်အထားများကို တိုက်ရိုက်လက်မှတ်ထိုးခြင်း။ သူတို့ကို env vars မှတဆင့် `electron-builder` သို့ပို့ပါ။

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

AppImage လက်မှတ်ထိုးခြင်းသည် လက်မှတ်ထိုးလျှင် စိတ်ကြိုက် — သတ်မှတ် `LINUX_GPG_KEY` ဖြစ်သည်။

## ဖြန့်ဝေခြင်း။

`electron/dist-electron/` တွင် ရှေးဟောင်းပစ္စည်းများ

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

ဖြန့်ချိမှုများကို GitHub Releases (`diegosouzapw/OmniRoute`) တွင် ထုတ်ဝေထားပြီး `electron-updater` ဗားရှင်းအသစ်များကို စစ်ဆေးသည့်နေရာဖြစ်သည်။

## ပြသာနာရှာဖွေရှင်းပေးခြင်း

| ရောဂါလက္ခဏာ                                                                       | ပြင်ပါ။                                                                                                                                                                |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` ပြီးနောက် Electron သည် အဓိက အဖုအထစ်ဖြစ်သည်။ | better-sqlite3 v13 သည် Node-API prebuilds — root တွင် `npm install` ပြန်လည်လည်ပတ်ပြီး `prepare:bundle` (၎င်းသည် လက်ရှိပလပ်ဖောင်းအတွက် ကြိုတင်တည်ဆောက်မှုကို စစ်ဆေးသည်) |
| ဇာတိ module အတွက်`ERR_DLOPEN_FAILED`                                              | Re-run `prepare:bundle` — it fails fast when the Node-API prebuild for the current platform is missing                                                                 |
| Linux တွင် Window သည် ဗလာဖြစ်နေသည်။                                               | Next.js ဆာဗာသည် PORT သို့ အမှန်တကယ်ချည်နှောင်ထားကြောင်း အတည်ပြုပါ ( `[Server]` မှတ်တမ်းများကို စစ်ဆေးပါ)                                                               |
| macOS notarization ဆိုင်များ                                                      | `.env` တွင်တင်မဟုတ်ဘဲ `APPLE_*` vars များကို တင်ပို့ကြောင်း သေချာပါစေ။                                                                                                 |
| Windows SmartScreen သတိပေးချက်                                                    | EV cert ဖြင့် လက်မှတ်ထိုးပါ သို့မဟုတ် အသုံးပြုသူများသည် → "ဘာပဲဖြစ်ဖြစ် Run" ကို ညာကလစ်နှိပ်ပါ။                                                                        |
| ဆိပ်ကမ်း-အသုံးပြုမှုဖြင့် မီးခိုးစမ်းသပ်မှု မအောင်မြင်ပါ။                         | `electron:smoke:packaged` မလည်ပတ်မီ 20128 တွင် မည်သည့် local dev server ကိုမဆို ရပ်ပါ။                                                                                 |

## ဒါကိုလည်းကြည့်ပါ။

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- အရင်းအမြစ်- `electron/main.js`, `electron/preload.js`, `electron/package.json`
- ကူညီသူများ- `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
