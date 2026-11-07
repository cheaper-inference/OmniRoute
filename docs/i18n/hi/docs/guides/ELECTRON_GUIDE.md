# Electron Desktop Guide (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **सत्य का स्रोत:** `electron/` कार्यक्षेत्र** आखरी अपडेट:** 2026-06-28 — v3.8.40

OmniRoute एक क्रॉस-प्लेटफ़ॉर्म डेस्कटॉप ऐप (Windows / macOS / Linux) शिप करता है**Electron 41** +** इलेक्ट्रॉन-बिल्डर 26.10** . डेस्कटॉप ऐप Next.js स्टैंडअलोन सर्वर को चाइल्ड प्रोसेस के रूप में उत्पन्न करता है, उस पर एक `BrowserWindow` इंगित करता है, और एक सिस्टम ट्रे, ऑटो-अपडेटर, IPC ब्रिज और शून्य-कॉन्फिग गुप्त बूटस्ट्रैप जोड़ता है।

## वास्तुकला

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

## संस्करणों

`electron/package.json` से पुष्टि की गई:

| पैकेट              | संस्करण                                                                         |
| ------------------ | ------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                       |
| `electron-builder` | `^26.15.3`                                                                      |
| `electron-updater` | `^6.8.9`                                                                        |
| `better-sqlite3`   | रूट `^13.0.2` (नोड-एपीआई — को प्रीबिल्ड करता है, Electron दोबारा नहीं बनाता है) |
| एप्लिकेशन वेरीज़न  | `3.8.0`                                                                         |
| ऐप आईडी            | `online.omniroute.desktop`                                                      |
| प्रोडक्ट का नाम    | `OmniRoute`                                                                     |

## स्क्रिप्ट्स (रूट `package.json`)

| लिखी हुई कहानी                    | उद्देश्य                                                                                     |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` प्रारंभ होता है + `localhost:20128` का इंतजार करता है + Electron लॉन्च करता है |
| `npm run electron:build`          | Next.js बनाता है फिर वर्तमान OS के लिए `electron-builder` चलाता है                           |
| `npm run electron:build:win`      | Windows NSIS इंस्टालर + पोर्टेबल बनाता है (x64)                                              |
| `npm run electron:build:mac`      | macOS DMG बनाता है (इंटेल + एप्पल सिलिकॉन)                                                   |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + Arm64) बनाता है                                                  |
| `npm run electron:smoke:packaged` | पैकेज्ड बाइनरी लॉन्च करता है और HTTP 200 के लिए `/login` जांच करता है, फिर बंद हो जाता है    |

`electron/` कार्यक्षेत्र यह भी उजागर करता है:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` चलाता है
- `npm run build:mac-x64` / `build:mac-arm64` — सिंगल-आर्क macOS बनाता है
- `npm run pack` — निर्देशिका-केवल स्थानीय परीक्षण के लिए निर्मित (कोई इंस्टॉलर नहीं)

## वैकल्पिक रनटाइम पैक

डेस्कटॉप बिल्ड अपने इंस्टॉलरों के साथ वैकल्पिक रनटाइम अभिलेखागार प्रकाशित कर सकते हैं। स्थापित सर्वर पेलोड में `optional-packs.index.json` ( Windows और Linux पर `resources/app` के अंतर्गत) शामिल है। `browser-runtime` प्रविष्टि के लिए, `packs[].tarball` पढ़ें और डाउनलोड करें** उसी रिलीज़ से वह सटीक फ़ाइल नाम** . पुरालेख नामों में एक SHA-256 डाइजेस्ट शामिल है; अलग-अलग बिल्ड के लिए अलग-अलग अभिलेखों की आवश्यकता हो सकती है। डाउनलोड किए गए फ़ाइल नाम को अपरिवर्तित रखें।

इंस्टॉल किए गए ऐप के इंडेक्स और चयनित संग्रह को एक निर्देशिका में कॉपी करें, फिर उसी रिलीज़ से CLI उपयोग करें:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` संस्थापन और सत्यापन स्थिति प्रदर्शित करता है, संग्रह फ़ाइल नाम नहीं। बंडल इंडेक्स संग्रह का चयन करता है। इंस्टालेशन निष्कर्षण से पहले अपने संग्रह चेकसम को सत्यापित करता है और स्थापित पैक को बदलने से पहले अपने पैकेज चेकसम को सत्यापित करता है। यह स्थानीय फ़ाइलें पढ़ता है; यह गुम हुए अभिलेखों को डाउनलोड नहीं करता है. इंस्टालेशन के बाद एप्लिकेशन को पुनः प्रारंभ करें. यदि रिलीज़ में कोई मेल खाती संपत्ति नहीं है, तो वैकल्पिक पैक उस रिलीज़ की संपत्तियों के माध्यम से उपलब्ध नहीं है।

## निर्देशिका लेआउट

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

`main.js` और `preload.js` दोनों हैं**CommonJS `.js` फ़ाइलें** , नहीं TypeScript. रेंडरर-साइड टाइपिंग `electron/types.d.ts` में रहती है।

## IPC ब्रिज (`preload.js`)

प्रीलोड `contextIsolation: true` और `nodeIntegration: false` के साथ `contextBridge` का उपयोग करके `window.electronAPI` पर एक श्वेतसूचीबद्ध API उजागर करता है।

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

उजागर तरीके:

| रेंडरर कॉल                                                        | प्रकार                            |
| ----------------------------------------------------------------- | --------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | आह्वान                            |
| `openExternal(url)`                                               | आह्वान                            |
| `getDataDir()`                                                    | आह्वान                            |
| `restartServer()`                                                 | आह्वान                            |
| `getAppVersion()`                                                 | आह्वान                            |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | आह्वान                            |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | भेजना                             |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | प्राप्त करें (रिटर्न निपटानकर्ता) |

प्राप्त सहायक वापस आ जाते हैं** डिस्पोजर फ़ंक्शन** `removeAllListeners` — पर निर्भर रहने के बजाय यह React घटकों के पुनः माउंट होने पर श्रोता संचय को रोकता है।

## सर्वर जीवनचक्र

सिस्टम नोड के साथ देशी-मॉड्यूल ABI बेमेल से बचने के लिए `main.js` सीधे Electron नोड रनटाइम के साथ Next.js स्टैंडअलोन बंडल को उत्पन्न करता है:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

मुख्य विशेषताएं:

- `waitForServer()` विंडो दिखाने से पहले 30 सेकंड तक URL को पोल करता है (कोल्ड स्टार्ट पर कोई खाली स्क्रीन नहीं)।
- `stdio: "pipe"` stdout/stderr को पकड़ लेता है; तैयार वाक्यांश (`Ready` / `listening`) IPC पर `server-status: running` उत्सर्जित करते हैं।
- `before-quit` सुंदर SIGTERM (WAL चेकपॉइंट) के लिए 5 s तक प्रतीक्षा करता है और फिर SIGKILL भेजता है।
- ट्रे में पोर्ट स्विचर (`20128`, `3000`, `8080`) सर्वर को रोकता है और पुनरारंभ करता है, फिर BrowserWindow को पुनः लोड करता है।

## शून्य-कॉन्फिग गुप्त बूटस्ट्रैप

पहले लॉन्च पर, मुख्य प्रक्रिया स्वचालित रूप से उत्पन्न होती है और गायब रहस्य बनी रहती है:

| गुप्त                    | स्रोत                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                               |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (यदि एन्क्रिप्टेड क्रेडिट पहले से मौजूद है तो मना कर देता है) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                               |

`<DATA_DIR>/server.env` पर कायम रहा। `DATA_DIR` इसका समाधान करता है:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` या `~/.omniroute`
- macOS: `~/.omniroute`

## पर्यावरण फ़ाइल लुकअप

सर्वर को उत्पन्न करने से पहले, मुख्य प्रक्रिया (`getPreferredEnvFilePath()` in `electron/main.js`) चुनती है** एक** `.env` फ़ाइल: इनमें से पहली जो मौजूद है।

1. `$DATA_DIR/.env`, जब `DATA_DIR` को उस वातावरण में सेट किया जाता है जिसके साथ ऐप लॉन्च किया गया था।
2. `<resolved DATA_DIR>/.env`, ऊपर दिए गए समान डिफ़ॉल्ट का उपयोग करते हुए: `%APPDATA%\omniroute\.env` Windows पर, `$XDG_CONFIG_HOME/omniroute/.env` या `~/.omniroute/.env` Linux और macOS पर।
3. प्रक्रिया कार्यशील निर्देशिका में`.env` ।

मुख्य प्रक्रिया केवल उस फ़ाइल को पढ़ती है; बाद के उम्मीदवारों को इसमें विलय नहीं किया जाता है। सर्वर वातावरण तब इस प्राथमिकता के साथ बनाया जाता है (सबसे पहले उच्चतम):

1. Electron प्रक्रिया वातावरण (जो भी ऐप लॉन्च किया गया है उससे प्राप्त चर)।
2. चयनित `.env` फ़ाइल.
3. `<DATA_DIR>/server.env` (उपरोक्त बूटस्ट्रैप रहस्य)।

ऐप शुरू होने पर प्रक्रिया वातावरण कैप्चर किया जाता है, इसलिए ऐप चलने के दौरान सिस्टम या उपयोगकर्ता पर्यावरण वैरिएबल सेट (इसकी विंडो बंद होने के बाद ट्रे में बैठने सहित) सर्वर तक नहीं पहुंचता है जब तक कि ऐप पूरी तरह से बंद न हो जाए और फिर से लॉन्च न हो जाए। `CONTEXT_LENGTH_<PROVIDER>` जैसे रनटाइम नॉब्स के लिए ( [पर्यावरण चर देखें: प्रति-प्रदाता संदर्भ लंबाई](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), `.env` फ़ाइल को प्राथमिकता दें, फिर पूरी तरह से छोड़ दें (ट्रे,** छोड़ना** ) और पुनः लॉन्च करें।

## खिड़की और ट्रे

- `BrowserWindow`: 1400 × 900 (न्यूनतम 1024 × 700), `backgroundColor: "#0a0a0a"`
- macOS: `titleBarStyle: "hiddenInset"`, `{ x: 16, y: 16 }` पर ट्रैफिक-लाइट।
- Windows/Linux: मूल शीर्षक पट्टी।
- बंद करें बटन ट्रे को छोटा कर देता है; ट्रे मेनू है** OmniRoute खोलें** ,** डैशबोर्ड खोलें** (बाहरी ब्राउज़र),** सर्वर पोर्ट** सबमेनू,** अद्यतन के लिए जाँच** ,** छोड़ना** .

## सामग्री सुरक्षा नीति

`session.defaultSession.webRequest.onHeadersReceived` के माध्यम से सेट करें। उल्लेखनीय निर्देश:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- डेव मोड केवल `'unsafe-eval'` को `script-src` में जोड़ता है

## ऑटो अपडेट

GitHub प्रदाता (`diegosouzapw/OmniRoute`) के साथ `electron-updater` उपयोग करता है।

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- `update-status` IPC के माध्यम से रेंडरर को भेजे गए इवेंट: `checking`, `available`, `not-available`, `downloading` ( `percent` के साथ), `downloaded`, `error`
- `installUpdate()` सर्वर को बंद कर देता है और फिर `autoUpdater.quitAndInstall()` कॉल करता है
- डेव मोड में छोड़ा गया (`!app.isPackaged`)

## पाइपलाइन बनाएं

1. `npm run build` → Next.js `.next/standalone` में स्टैंडअलोन।
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone` में पुनः चरणबद्ध होता है और `server.js` + `required-server-files.json` के अंदर निरपेक्ष पथों को फिर से लिखता है ताकि बंडल स्थानांतरित हो सके।
3. `electron-builder` पैकेज `main.js`, `preload.js`, `node_modules`, और `extraResources: { ../.next/electron-standalone → app }`।

### लक्ष्य बनाएं

| OS      | लक्ष्यों को                             |
| ------- | --------------------------------------- |
| Windows | NSIS इंस्टॉलर + पोर्टेबल (x64)          |
| macOS   | DMG (इंटेल + Arm64, ड्रैग-टू-एप्लिकेशन) |
| Linux   | AppImage + DEB (x64 + आर्म64)           |

NSIS सेटिंग्स: `oneClick: false`, उपयोगकर्ता को इंस्टॉल निर्देशिका चुनने देता है, डेस्कटॉप और स्टार्ट-मेनू शॉर्टकट बनाता है।

## धुआं परीक्षण पैकेज्ड बिल्ड

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- वर्तमान प्लेटफ़ॉर्म के लिए `electron/dist-electron/` में पैकेज्ड बाइनरी को स्वतः खोजता है।
- पृथक `HOME`/`APPDATA`/`XDG_*` निर्देशिकाओं के साथ लॉन्च होता है ताकि यह डेवलपर डेटा को न छुए।
- 45 सेकंड के भीतर HTTP 200 के लिए `http://127.0.0.1:20128/login` मतदान।
- घातक पैटर्न (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, आदि) के लिए stderr/stdout देखता है।
- तैयार होने के बाद 2 सेकंड के स्थिर रनटाइम की प्रतीक्षा करता है, फिर SIGTERM जारी करता है और पोर्ट के मुक्त होने की प्रतीक्षा करता है।
- CI में, स्वचालित रूप से `--no-sandbox --disable-gpu` (और Linux पर `--disable-dev-shm-usage` ) पास हो जाता है।

Env ओवरराइड करता है: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`।

## कोड पर हस्ताक्षर

`electron/package.json` करता है** नहीं** सीधे तार पर हस्ताक्षर करने वाले क्रेडेंशियल। उन्हें env vars से `electron-builder` तक पास करें:

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

AppImage पर हस्ताक्षर करना वैकल्पिक है, यदि हस्ताक्षर कर रहे हैं तो — सेट `LINUX_GPG_KEY` ।

## वितरण

कलाकृतियाँ `electron/dist-electron/` में उतरीं:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

रिलीज़ को GitHub रिलीज़ (`diegosouzapw/OmniRoute`) में प्रकाशित किया जाता है, जहाँ `electron-updater` नए संस्करणों की जाँच भी करता है।

## समस्या निवारण

| लक्षण                                                              | हल करना                                                                                                                                                                            |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron प्रमुख टक्कर के बाद `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 जहाज नोड-एपीआई — को प्रीबिल्ड करता है और `npm install` रूट और `prepare:bundle` पर फिर से चलाता है (यह वर्तमान प्लेटफ़ॉर्म के लिए प्रीबिल्ड को सत्यापित करता है) |
| देशी मॉड्यूल के लिए `ERR_DLOPEN_FAILED`                            | जब मौजूदा प्लेटफॉर्म के लिए नोड-एपीआई प्रीबिल्ड गायब हो तो `prepare:bundle` — को दोबारा चलाएं, यह तेजी से विफल हो जाता है                                                          |
| Linux पर विंडो खाली दिखाई देती है                                  | पुष्टि करें कि Next.js सर्वर वास्तव में PORT से जुड़ा है ( `[Server]` लॉग की जाँच करें)                                                                                            |
| macOS नोटरीकरण स्टॉल                                               | सुनिश्चित करें कि `APPLE_*` संस्करण निर्यात किए जाएं, न कि केवल `.env` में                                                                                                         |
| Windows SmartScreen चेतावनी                                        | EV प्रमाणपत्र के साथ साइन इन करें, या उपयोगकर्ता → पर राइट-क्लिक करें "फिर भी चलाएँ"                                                                                               |
| पोर्ट-इन-यूज़ के साथ धुआँ परीक्षण विफल हो जाता है                  | `electron:smoke:packaged` चलाने से पहले 20128 पर किसी भी स्थानीय डेव सर्वर को रोकें                                                                                                |

## यह भी देखें

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- स्रोत: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- सहायक: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
