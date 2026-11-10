# Electron Desktop Guide (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **सत्यको स्रोत:** `electron/` कार्यक्षेत्र** पछिल्लो अपडेट:** 2026-06-28 — v3.8.40

OmniRoute ले क्रस-प्लेटफर्म डेस्कटप एप (Windows / macOS / Linux) मा निर्मित**Electron 41** +** इलेक्ट्रोन-बिल्डर 26.10** । डेस्कटप एपले Next.js स्ट्यान्डअलोन सर्भरलाई चाइल्ड प्रक्रियाको रूपमा फैलाउँछ, यसमा `BrowserWindow` पोइन्ट गर्छ, र प्रणाली ट्रे, अटो-अपडेटर, IPC ब्रिज, र शून्य-कन्फिग गोप्य बुटस्ट्र्याप थप्छ।

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

## संस्करणहरू

`electron/package.json` बाट पुष्टि:

| प्याकेज            | संस्करण                                                            |
| ------------------ | ------------------------------------------------------------------ |
| `electron`         | `^43.4.1`                                                          |
| `electron-builder` | `^26.15.3`                                                         |
| `electron-updater` | `^6.8.9`                                                           |
| `better-sqlite3`   | रूट `^13.0.2` (नोड-एपीआई पूर्व निर्माण — नो Electron पुनर्निर्माण) |
| एप संस्करण         | `3.8.0`                                                            |
| एप आईडी            | `online.omniroute.desktop`                                         |
| उत्पादन नाम        | `OmniRoute`                                                        |

## लिपिहरू (रूट `package.json`)

| लिपि                              | उद्देश्य                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` + सुरु हुन्छ `localhost:20128` + Electron सुरु हुन्छ                          |
| `npm run electron:build`          | Next.js बनाउँछ त्यसपछि हालको OS को लागि `electron-builder` चलाउँछ                           |
| `npm run electron:build:win`      | Windows NSIS स्थापनाकर्ता + पोर्टेबल (x64) बनाउँछ                                           |
| `npm run electron:build:mac`      | macOS DMG बनाउँछ (Intel + Apple Silicon)                                                    |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) बनाउँछ                                                   |
| `npm run electron:smoke:packaged` | प्याकेज गरिएको बाइनरी लन्च गर्दछ र HTTP 200 को लागि `/login` प्रोब गर्छ, त्यसपछि बन्द हुन्छ |

`electron/` कार्यस्थानले पनि उजागर गर्दछ:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` चलाउँछ
- `npm run build:mac-x64` / `build:mac-arm64` — एकल-arch macOS निर्माणहरू
- स्थानीय परीक्षणको लागि`npm run pack` — निर्देशिका-मात्र निर्माण (कुनै स्थापनाकर्ता छैन)

## वैकल्पिक रनटाइम प्याकहरू

डेस्कटप निर्माणहरूले तिनीहरूका स्थापनाकर्ताहरूसँग वैकल्पिक रनटाइम अभिलेखहरू प्रकाशित गर्न सक्छन्। स्थापित सर्भर पेलोडमा `optional-packs.index.json` ( Windows र Linux मा `resources/app` अन्तर्गत) समावेश छ। `browser-runtime` प्रविष्टिको लागि, `packs[].tarball` पढ्नुहोस् र डाउनलोड गर्नुहोस्** उही रिलीजबाट त्यो सही फाइल नाम** । अभिलेख नामहरूमा SHA-256 डाइजेस्ट समावेश छ; विभिन्न निर्माणहरूलाई विभिन्न अभिलेखहरू आवश्यक पर्दछ। डाउनलोड गरिएको फाइल नाम अपरिवर्तित राख्नुहोस्।

स्थापित एपको अनुक्रमणिका र चयन गरिएको अभिलेखलाई एउटा डाइरेक्टरीमा प्रतिलिपि गर्नुहोस्, त्यसपछि उही रिलीजबाट CLI प्रयोग गर्नुहोस्:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` स्थापना र प्रमाणिकरण अवस्था देखाउँछ, अभिलेख फाइलनाम होइन। बन्डल गरिएको अनुक्रमणिकाले अभिलेख चयन गर्छ। स्थापनाले निकासी अघि यसको संग्रह चेकसम र स्थापित प्याक प्रतिस्थापन गर्नु अघि यसको प्याकेज चेकसमहरू प्रमाणित गर्दछ। यसले स्थानीय फाइलहरू पढ्छ; यसले हराएको अभिलेखहरू डाउनलोड गर्दैन। स्थापना पछि अनुप्रयोग पुन: सुरु गर्नुहोस्। यदि रिलीजमा कुनै मिल्दो सम्पत्ति छैन भने, वैकल्पिक प्याक त्यो रिलीजको सम्पत्तिहरू मार्फत उपलब्ध हुँदैन।

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

`main.js` र `preload.js` दुबै हुन्**CommonJS `.js` फाइलहरू** , TypeScript होइन . रेन्डरर-साइड टाइपिङहरू `electron/types.d.ts` मा रहन्छन्।

## IPC पुल (`preload.js`)

प्रिलोडले `contextIsolation: true` र `nodeIntegration: false` सँग `contextBridge` प्रयोग गरेर `window.electronAPI` मा श्वेतसूचीमा राखिएको API उजागर गर्दछ।

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

खुलासा विधिहरू:

| रेन्डरर कल                                                        | टाइप गर्नुहोस्            |
| ----------------------------------------------------------------- | ------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | आह्वान                    |
| `openExternal(url)`                                               | आह्वान                    |
| `getDataDir()`                                                    | आह्वान                    |
| `restartServer()`                                                 | आह्वान                    |
| `getAppVersion()`                                                 | आह्वान                    |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | आह्वान                    |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | पठाउनुहोस्                |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | प्राप्त (रिटर्न डिस्पोजर) |

प्राप्त सहयोगीहरू फिर्ता ए** डिस्पोजर प्रकार्य** `removeAllListeners` — मा भर पर्नुको सट्टा यसले React कम्पोनेन्टहरू पुन: माउन्ट गर्दा श्रोता सङ्कलनलाई रोक्छ।

## सर्भर जीवनचक्र

`main.js` Next.js स्ट्यान्डअलोन बन्डललाई सीधा Electron नोड रनटाइमसँग स्प्यान गर्दछ नेटिभ-मोड्युल ABI प्रणाली नोडसँग बेमेल हुनबाट जोगिन:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

हाइलाइटहरू:

- `waitForServer()` सञ्झ्याल देखाउनु अघि 30 s सम्म URL पोल गर्छ (कोल्ड स्टार्टमा कुनै खाली स्क्रिन छैन)।
- `stdio: "pipe"` ले stdout/stderr कब्जा गर्छ; तयार वाक्यांशहरू (`Ready` / `listening`) `server-status: running` ओभर IPC उत्सर्जन गर्नुहोस्।
- `before-quit` ग्रेसफुल SIGTERM (WAL checkpoint) को लागि 5 s सम्म पर्खन्छ त्यसपछि SIGKILL पठाउँछ।
- ट्रेमा पोर्ट स्विचर (`20128`, `3000`, `8080`) रोक्छ र सर्भर पुन: सुरु गर्छ, त्यसपछि BrowserWindow पुन: लोड गर्दछ।

## शून्य कन्फिगरेसन गोप्य बुटस्ट्र्याप

पहिलो प्रक्षेपणमा, मुख्य प्रक्रियाले स्वत: उत्पन्न गर्दछ र छुटेका रहस्यहरू जारी राख्छ:

| गोप्य                    | स्रोत                                                                                                    |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                 |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (इन्क्रिप्टेड क्रेडिटहरू पहिले नै अवस्थित छ भने अस्वीकार गर्दछ) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                 |

`<DATA_DIR>/server.env` मा लागि रह्यो। `DATA_DIR` ले समाधान गर्छ:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` वा `~/.omniroute`
- macOS: `~/.omniroute`

## वातावरण फाइल लुकअप

सर्भर स्प्यान गर्नु अघि, मुख्य प्रक्रिया (`getPreferredEnvFilePath()` in `electron/main.js`) छनोट हुन्छ** एउटा** `.env` फाइल: यी मध्ये पहिलो अवस्थित छ।

1. `$DATA_DIR/.env`, जब `DATA_DIR` वातावरणमा सेट गरिएको छ अनुप्रयोगको साथ सुरू गरिएको थियो।
2. `<resolved DATA_DIR>/.env`, माथिको जस्तै पूर्वनिर्धारितहरू प्रयोग गर्दै: `%APPDATA%\omniroute\.env` मा Windows, `$XDG_CONFIG_HOME/omniroute/.env` वा `~/.omniroute/.env` मा Linux र macOS।
3. प्रक्रिया कार्य निर्देशिका मा`.env` ।

मुख्य प्रक्रियाले त्यो फाइल मात्र पढ्छ; पछि उम्मेद्वारहरू मर्ज गरिएको छैन। सर्भर वातावरण त्यसपछि यो प्राथमिकता (उच्चतम पहिलो) संग बनाइन्छ।

1. Electron प्रक्रिया वातावरण (एप लन्च गरेको जुनसुकैबाट प्राप्त भ्यारीएबलहरू)।
2. चयन गरिएको `.env` फाइल।
3. `<DATA_DIR>/server.env` (माथिको बुटस्ट्र्याप रहस्य)।

एप सुरु हुँदा प्रक्रियाको वातावरण क्याप्चर हुन्छ, त्यसैले एप चलिरहेको बेला प्रणाली वा प्रयोगकर्ता वातावरण चर सेट हुन्छ (यसको विन्डो बन्द भएपछि ट्रेमा बसेको बेला सहित) एप पूर्ण रूपमा बन्द र पुन: सुरु नभएसम्म सर्भरमा पुग्दैन। रनटाइम knobs को लागि जस्तै `CONTEXT_LENGTH_<PROVIDER>` ( [पर्यावरण चर हेर्नुहोस्: प्रति-प्रदायक सन्दर्भ लम्बाइ](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), `.env` फाइललाई प्राथमिकता दिनुहोस्, त्यसपछि पूर्ण रूपमा छोड्नुहोस् (ट्रे,** छोड्नुहोस्** ) र पुन: सुरु गर्नुहोस्।

## विन्डो र ट्रे

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`
- macOS: `titleBarStyle: "hiddenInset"`, `{ x: 16, y: 16 }` मा ट्राफिक-लाइट।
- Windows/Linux: मूल शीर्षक पट्टी।
- बन्द बटन ट्रे मा न्यूनतम; ट्रे मेनु छ** OmniRoute खोल्नुहोस्** ,** ड्यासबोर्ड खोल्नुहोस्** (बाह्य ब्राउजर),** सर्भर पोर्ट** उपमेनु,** अपडेटहरूको लागि जाँच गर्नुहोस्** ,** छोड्नुहोस्** ।

## सामग्री सुरक्षा नीति

`session.defaultSession.webRequest.onHeadersReceived` मार्फत सेट गर्नुहोस्। उल्लेखनीय निर्देशनहरू:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- देव मोडले `'unsafe-eval'` लाई `script-src` मा मात्र थप्छ

## स्वत: अद्यावधिक

GitHub प्रदायक (`diegosouzapw/OmniRoute`) सँग `electron-updater` प्रयोग गर्दछ।

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- घटनाहरू `update-status` IPC मार्फत रेन्डररलाई फर्वार्ड गरियो: `checking`, `available`, `not-available`, `downloading` ( `percent` सँग), `downloaded`, `error`
- `installUpdate()` सर्भरलाई मार्छ त्यसपछि `autoUpdater.quitAndInstall()` कल गर्छ
- देव मोडमा छोडियो (`!app.isPackaged`)

## पाइपलाइन निर्माण गर्नुहोस्

1. `npm run build` → Next.js स्ट्यान्डअलोन `.next/standalone` मा।
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone` मा पुन: चरणहरू बनाउँछ र `server.js` + `required-server-files.json` भित्र निरपेक्ष मार्गहरू पुन: लेख्छ त्यसैले बन्डल पुन: स्थानान्तरणयोग्य छ।
3. `electron-builder` प्याकेजहरू `main.js`, `preload.js`, `node_modules`, र `extraResources: { ../.next/electron-standalone → app }`।

### लक्ष्यहरू निर्माण गर्नुहोस्

| OS      | लक्ष्यहरू                                    |
| ------- | -------------------------------------------- |
| Windows | NSIS स्थापनाकर्ता + पोर्टेबल (x64)           |
| macOS   | DMG (Intel + arm64, ड्र्याग-टू-एप्लिकेशनहरू) |
| Linux   | AppImage + DEB (x64 + arm64)                 |

NSIS सेटिङहरू: `oneClick: false`, प्रयोगकर्तालाई स्थापना निर्देशिका छनोट गर्न दिन्छ, डेस्कटप र स्टार्ट-मेनू सर्टकटहरू सिर्जना गर्दछ।

## धुवाँ परीक्षण प्याकेज गरिएको निर्माण

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- हालको प्लेटफर्मको लागि `electron/dist-electron/` मा प्याकेज गरिएको बाइनरी स्वतः पत्ता लगाउँदछ।
- पृथक `HOME`/`APPDATA`/`XDG_*` डाइरेक्टरीहरूसँग सुरु हुन्छ त्यसैले यसले विकासकर्ता डेटालाई छुँदैन।
- 45 सेकेन्ड भित्र HTTP 200 को लागि मतदान `http://127.0.0.1:20128/login` ।
- घातक ढाँचाहरू (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, आदि) को लागि stderr/stdout हेर्छ।
- तयारी पछि स्थिर रनटाइमको २ सेकेन्ड पर्खन्छ, त्यसपछि SIGTERM जारी गर्छ र पोर्ट खाली हुनको लागि पर्खन्छ।
- CI मा, स्वचालित रूपमा `--no-sandbox --disable-gpu` (र Linux मा `--disable-dev-shm-usage` ) पास हुन्छ।

Env ओभरराइडहरू: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`।

## कोड हस्ताक्षर

`electron/package.json` गर्छ** होइन** तार हस्ताक्षर प्रमाणहरू सीधा। तिनीहरूलाई env vars मार्फत `electron-builder` मा पास गर्नुहोस्:

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

AppImage हस्ताक्षर वैकल्पिक — सेट `LINUX_GPG_KEY` यदि साइन इन गर्नुहोस्।

## वितरण

कलाकृतिहरू `electron/dist-electron/` मा भूमि:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

विज्ञप्तिहरू GitHub रिलीजहरू (`diegosouzapw/OmniRoute`) मा प्रकाशित हुन्छन्, जहाँ पनि `electron-updater` नयाँ संस्करणहरूको लागि जाँच गर्दछ।

## समस्या निवारण

| लक्षण                                                           | ठीक गर्नुहोस्                                                                                                                                                         |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` पछि Electron प्रमुख टक्कर | better-sqlite3 v13 ships Node-API ले मूल र `prepare:bundle` मा — पुन: रन `npm install` पूर्व-निर्माण गर्दछ (यसले हालको प्लेटफर्मको लागि पूर्व निर्माण प्रमाणित गर्दछ) |
| नेटिभ मोड्युलको लागि`ERR_DLOPEN_FAILED`                         | `prepare:bundle` — पुन: चलाउनुहोस् यो छिटो असफल हुन्छ जब हालको प्लेटफर्मको लागि नोड-एपीआई प्रिबिल्ड हराइरहेको छ।                                                      |
| Linux मा सञ्झ्याल खाली देखिन्छ                                  | Next.js सर्भर वास्तवमा PORT मा बाँधिएको पुष्टि गर्नुहोस् ( `[Server]` लगहरू जाँच गर्नुहोस्)                                                                           |
| macOS notarization स्टलहरू                                      | `APPLE_*` vars `.env` मा मात्र होइन, निर्यात गरिएको सुनिश्चित गर्नुहोस्                                                                                               |
| Windows SmartScreen चेतावनी                                     | EV cert को साथ साइन इन गर्नुहोस्, वा प्रयोगकर्ताहरूले → मा दायाँ क्लिक गर्नुहोस् "जस्तै पनि चलाउनुहोस्"                                                               |
| धुवाँ परीक्षण पोर्ट-इन-प्रयोगको साथ असफल हुन्छ                  | `electron:smoke:packaged` चलाउनु अघि 20128 मा कुनै पनि स्थानीय dev सर्भर रोक्नुहोस्                                                                                   |

## यो पनि हेर्नुहोस्

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- स्रोत: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- सहयोगीहरू: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
