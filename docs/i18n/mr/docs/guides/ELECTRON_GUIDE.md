# Electron Desktop Guide (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **सत्याचा स्रोत:** `electron/` कार्यक्षेत्र** शेवटचे अपडेट:** 2026-06-28 — v3.8.40

OmniRoute एक क्रॉस-प्लॅटफॉर्म डेस्कटॉप ॲप (Windows / macOS / Linux) वर तयार केले आहे**Electron 41** +** इलेक्ट्रॉन-बिल्डर 26.10** . डेस्कटॉप ॲप Next.js स्टँडअलोन सर्व्हरला चाइल्ड प्रोसेस म्हणून निर्माण करतो, त्यावर `BrowserWindow` पॉइंट करतो आणि सिस्टम ट्रे, ऑटो-अपडेटर, IPC ब्रिज आणि शून्य-कॉन्फिग गुप्त बूटस्ट्रॅप जोडतो.

## आर्किटेक्चर

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

## आवृत्त्या

`electron/package.json` कडून पुष्टी केली:

| पॅकेज              | आवृत्ती                                                                 |
| ------------------ | ----------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                               |
| `electron-builder` | `^26.15.3`                                                              |
| `electron-updater` | `^6.8.9`                                                                |
| `better-sqlite3`   | रूट `^13.0.2` (नोड-एपीआय पूर्वनिर्मित — नाही Electron पुनर्बांधणी करते) |
| ॲप आवृत्ती         | `3.8.0`                                                                 |
| ॲप आयडी            | `online.omniroute.desktop`                                              |
| उत्पादनाचे नाव     | `OmniRoute`                                                             |

## स्क्रिप्ट्स (रूट `package.json`)

| स्क्रिप्ट                         | उद्देश                                                                    |
| --------------------------------- | ------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` + `localhost:20128` + Electron लाँच होण्याची वाट पाहत आहे   |
| `npm run electron:build`          | Next.js बनवते नंतर वर्तमान OS साठी `electron-builder` चालवते              |
| `npm run electron:build:win`      | Windows NSIS इंस्टॉलर + पोर्टेबल (x64) बनवते                              |
| `npm run electron:build:mac`      | macOS DMG बनवते (Intel + Apple सिलिकॉन)                                   |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) बनवतो                                  |
| `npm run electron:smoke:packaged` | पॅकेज्ड बायनरी लाँच करते आणि HTTP 200 साठी `/login` तपासते, नंतर बंद होते |

`electron/` कार्यक्षेत्र देखील उघड करते:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` चालवतो
- `npm run build:mac-x64` / `build:mac-arm64` — सिंगल-आर्क macOS बिल्ड
- स्थानिक चाचणीसाठी`npm run pack` — निर्देशिका-केवळ बिल्ड (इन्स्टॉलर नाही)

## पर्यायी रनटाइम पॅक

डेस्कटॉप बिल्ड त्यांच्या इन्स्टॉलर्सच्या बाजूने पर्यायी रनटाइम संग्रह प्रकाशित करू शकतात. स्थापित सर्व्हर पेलोडमध्ये `optional-packs.index.json` ( Windows Linux `resources/app` अंतर्गत) समाविष्ट आहे. `browser-runtime` एंट्रीसाठी, `packs[].tarball` वाचा आणि डाउनलोड करा** त्याच रिलीझमधील अचूक फाइलनाव** . संग्रहण नावांमध्ये SHA-256 डायजेस्ट समाविष्ट आहे; भिन्न बिल्डसाठी भिन्न संग्रहणांची आवश्यकता असू शकते. डाउनलोड केलेल्या फाइलचे नाव न बदलता ठेवा.

स्थापित ॲपची अनुक्रमणिका आणि निवडलेले संग्रहण एका निर्देशिकेत कॉपी करा, नंतर त्याच प्रकाशनातून CLI वापरा:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` प्रतिष्ठापन आणि पडताळणी स्थिती प्रदर्शित करते, संग्रहण फाइलनाव नाही. एकत्रित अनुक्रमणिका संग्रहण निवडते. इन्स्टॉलेशन काढण्याआधी त्याचे संग्रहण चेकसम आणि स्थापित पॅक बदलण्यापूर्वी त्याचे पॅकेज चेकसम सत्यापित करते. हे स्थानिक फाइल्स वाचते; ते गहाळ संग्रह डाउनलोड करत नाही. स्थापनेनंतर अनुप्रयोग रीस्टार्ट करा. रिलीझमध्ये कोणतीही जुळणारी मालमत्ता नसल्यास, त्या रिलीझच्या मालमत्तेद्वारे पर्यायी पॅक उपलब्ध नसतो.

## निर्देशिका मांडणी

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

`main.js` आणि `preload.js` दोन्ही आहेत**CommonJS `.js` फाइल्स** , TypeScript नाही . प्रस्तुतकर्ता-साइड टायपिंग `electron/types.d.ts` मध्ये राहतात.

## IPC ब्रिज (`preload.js`)

प्रीलोड `contextIsolation: true` आणि `nodeIntegration: false` सह `contextBridge` वापरून `window.electronAPI` वर श्वेतसूचीबद्ध API उघड करते.

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

उघड पद्धती:

| प्रस्तुतकर्ता कॉल                                                 | प्रकार                    |
| ----------------------------------------------------------------- | ------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | आवाहन                     |
| `openExternal(url)`                                               | आवाहन                     |
| `getDataDir()`                                                    | आवाहन                     |
| `restartServer()`                                                 | आवाहन                     |
| `getAppVersion()`                                                 | आवाहन                     |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | आवाहन                     |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | पाठवा                     |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | प्राप्त (रिटर्न डिस्पोजर) |

प्राप्त मदतनीस परत अ** डिस्पोजर फंक्शन** `removeAllListeners` — वर विसंबून राहण्याऐवजी हे React घटक पुन्हा माऊंट केल्यावर श्रोते जमा होण्यास प्रतिबंध करते.

## सर्व्हर लाइफसायकल

`main.js` Next.js स्टँडअलोन बंडल थेट Electron नोड रनटाइमसह तयार करतो जेणेकरुन नेटिव्ह-मॉड्यूल ABI सिस्टीम नोडशी जुळत नाही:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

ठळक मुद्दे:

- `waitForServer()` विंडो दाखवण्यापूर्वी URL 30 s पर्यंत पोल करते (कोल्ड स्टार्टवर रिक्त स्क्रीन नाही).
- `stdio: "pipe"` ने stdout/stderr कॅप्चर केले; तयार वाक्ये (`Ready` / `listening`) `server-status: running` वर IPC उत्सर्जित करतात.
- `before-quit` ग्रेसफुल SIGTERM (WAL चेकपॉईंट) साठी 5 s पर्यंत वाट पाहते आणि नंतर SIGKILL पाठवते.
- ट्रेमधील पोर्ट स्विचर (`20128`, `3000`, `8080`) थांबतो आणि सर्व्हर रीस्टार्ट करतो, नंतर BrowserWindow रीलोड करतो.

## झिरो कॉन्फिगरेशन सीक्रेट बूटस्ट्रॅप

पहिल्या लाँचवर, मुख्य प्रक्रिया स्वयं-व्युत्पन्न करते आणि गहाळ रहस्ये कायम ठेवते:

| गुप्त                    | स्त्रोत                                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                 |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (एन्क्रिप्टेड क्रेडिट्स आधीपासूनच अस्तित्वात असल्यास नकार देतो) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                 |

`<DATA_DIR>/server.env` ला कायम राहिले. `DATA_DIR` निराकरण करते:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` किंवा `~/.omniroute`
- macOS: `~/.omniroute`

## पर्यावरण फाइल शोध

सर्व्हर तयार करण्यापूर्वी, मुख्य प्रक्रिया (`getPreferredEnvFilePath()` in `electron/main.js`) निवडते** एक** `.env` फाइल: यापैकी पहिली अस्तित्वात आहे.

1. `$DATA_DIR/.env`, जेव्हा `DATA_DIR` वातावरणात सेट केले जाते तेव्हा ॲप लाँच केले गेले होते.
2. `<resolved DATA_DIR>/.env`, वरील प्रमाणेच डीफॉल्ट वापरणे: Windows वर `%APPDATA%\omniroute\.env`, `$XDG_CONFIG_HOME/omniroute/.env` किंवा `~/.omniroute/.env` वर Linux आणि macOS.
3. प्रक्रिया कार्यरत निर्देशिकेत `.env`.

मुख्य प्रक्रिया फक्त ती फाईल वाचते; नंतरचे उमेदवार विलीन केले जात नाहीत. सर्व्हर वातावरण नंतर या प्राधान्याने तयार केले जाते (सर्वोच्च प्रथम):

1. Electron प्रक्रिया वातावरण (ॲप लाँच केलेल्या कोणत्याही गोष्टीपासून वारशाने प्राप्त व्हेरिएबल्स).
2. निवडलेली `.env` फाइल.
3. `<DATA_DIR>/server.env` (वरील बूटस्ट्रॅप रहस्ये).

ॲप सुरू झाल्यावर प्रक्रिया वातावरण कॅप्चर केले जाते, त्यामुळे ॲप चालू असताना सेट केलेले सिस्टम किंवा वापरकर्ता पर्यावरण व्हेरिएबल (त्याची विंडो बंद केल्यानंतर ते ट्रेमध्ये बसलेले असताना) ॲप पूर्णपणे बंद होईपर्यंत आणि पुन्हा लाँच होईपर्यंत सर्व्हरपर्यंत पोहोचत नाही. रनटाइम नॉबसाठी जसे की `CONTEXT_LENGTH_<PROVIDER>` (पहा [पर्यावरण व्हेरिएबल्स: प्रति-प्रदात्याची संदर्भ लांबी](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), `.env` फाइलला प्राधान्य द्या, नंतर पूर्णपणे सोडा (ट्रे,** सोडा** ) आणि पुन्हा लाँच करा.

## खिडकी आणि ट्रे

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, `{ x: 16, y: 16 }` येथे ट्रॅफिक-लाइट.
- Windows/Linux: मूळ शीर्षक पट्टी.
- बंद करा बटण ट्रेला कमी करते; ट्रे मेनूमध्ये आहे** OmniRoute उघडा** ,** डॅशबोर्ड उघडा** (बाह्य ब्राउझर),** सर्व्हर पोर्ट** उपमेनू** अद्यतनांसाठी तपासा** ,** सोडा** .

## सामग्री सुरक्षा धोरण

`session.defaultSession.webRequest.onHeadersReceived` द्वारे सेट करा. उल्लेखनीय निर्देश:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- देव मोड फक्त `script-src` मध्ये `'unsafe-eval'` जोडतो

## स्वयं-अद्यतन

GitHub प्रदाता (`diegosouzapw/OmniRoute`) सह `electron-updater` वापरते.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- `update-status` IPC: `checking`, `available`, `not-available`, `downloading` ( `percent` सह), `downloaded`, `error` द्वारे प्रस्तुतकर्त्याकडे इव्हेंट अग्रेषित केले जातात
- `installUpdate()` सर्व्हरला मारतो आणि नंतर `autoUpdater.quitAndInstall()` कॉल करतो
- देव मोडमध्ये वगळले (`!app.isPackaged`)

## पाइपलाइन तयार करा

1. `.next/standalone` मध्ये`npm run build` → Next.js स्टँडअलोन .
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone` मध्ये पुन्हा टप्प्याटप्प्याने येतो आणि `server.js` + `required-server-files.json` मध्ये निरपेक्ष मार्ग पुन्हा लिहितो त्यामुळे बंडल पुनर्स्थित करता येतो.
3. `electron-builder` पॅकेजेस `main.js`, `preload.js`, `node_modules`, आणि `extraResources: { ../.next/electron-standalone → app }`.

### लक्ष्य तयार करा

| OS      | लक्ष्य                                    |
| ------- | ----------------------------------------- |
| Windows | NSIS इंस्टॉलर + पोर्टेबल (x64)            |
| macOS   | DMG (Intel + arm64, ड्रॅग-टू-ऍप्लिकेशन्स) |
| Linux   | AppImage + DEB (x64 + arm64)              |

NSIS सेटिंग्ज: `oneClick: false`, वापरकर्त्यास इंस्टॉल निर्देशिका निवडू देते, डेस्कटॉप आणि स्टार्ट-मेनू शॉर्टकट तयार करते.

## धूर चाचणी पॅकेज केलेले बिल्ड

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- वर्तमान प्लॅटफॉर्मसाठी `electron/dist-electron/` मध्ये पॅकेज केलेले बायनरी स्वयं-शोधते.
- पृथक `HOME`/`APPDATA`/`XDG_*` डिरेक्टरीसह लाँच करते जेणेकरून ते विकसक डेटाला स्पर्श करत नाही.
- 45 सेकंदांच्या आत HTTP 200 साठी मतदान `http://127.0.0.1:20128/login`.
- घातक पॅटर्नसाठी stderr/stdout पाहते (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, इ.).
- तयारीनंतर स्थिर रनटाइमची 2 सेकंद प्रतीक्षा करते, नंतर SIGTERM जारी करते आणि पोर्ट मोकळे होण्याची प्रतीक्षा करते.
- CI मध्ये, `--no-sandbox --disable-gpu` (आणि `--disable-dev-shm-usage` वर Linux) आपोआप पास होतो.

Env ओव्हरराइड्स: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## कोड साइनिंग

`electron/package.json` करतो** नाही** वायर साइनिंग क्रेडेन्शियल्स थेट. त्यांना env vars द्वारे `electron-builder` वर पास करा:

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

स्वाक्षरी करत असल्यास AppImage स्वाक्षरी पर्यायी — सेट `LINUX_GPG_KEY` आहे.

## वितरण

कलाकृती `electron/dist-electron/` मध्ये उतरल्या:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

रिलीझ GitHub Releases (`diegosouzapw/OmniRoute`) वर प्रकाशित केले जातात, जिथे `electron-updater` नवीन आवृत्त्या तपासते.

## समस्यानिवारण

| लक्षण                                                           | निराकरण करा                                                                                                                                            |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` नंतर Electron प्रमुख दणका | better-sqlite3 v13 जहाजे नोड-एपीआय रूटवर — री-रन `npm install` प्रीबिल्ड करते आणि `prepare:bundle` (ते वर्तमान प्लॅटफॉर्मसाठी प्रीबिल्ड सत्यापित करते) |
| नेटिव्ह मॉड्यूलसाठी`ERR_DLOPEN_FAILED`                          | वर्तमान प्लॅटफॉर्मसाठी नोड-एपीआय प्रीबिल्ड गहाळ असताना `prepare:bundle` — पुन्हा चालवा ते जलद अयशस्वी होते                                             |
| Linux वर विंडो रिकामी दिसते                                     | Next.js सर्व्हर प्रत्यक्षात PORT ला बांधील असल्याची पुष्टी करा ( `[Server]` लॉग तपासा)                                                                 |
| macOS नोटरायझेशन स्टॉल्स                                        | केवळ `.env` मध्येच नव्हे तर `APPLE_*` var निर्यात केले जातात याची खात्री करा                                                                           |
| Windows SmartScreen चेतावणी                                     | EV प्रमाणपत्रासह साइन इन करा किंवा वापरकर्ते → वर उजवे-क्लिक करा "तरीही चालवा"                                                                         |
| पोर्ट-इन-वापरासह धुराची चाचणी अयशस्वी होते                      | `electron:smoke:packaged` चालवण्यापूर्वी 20128 वर कोणतेही स्थानिक डेव्हल सर्व्हर थांबवा                                                                |

## हे देखील पहा

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- स्रोत: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- मदतनीस: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
