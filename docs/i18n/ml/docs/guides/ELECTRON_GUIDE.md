# Electron Desktop Guide (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **സത്യത്തിൻ്റെ ഉറവിടം:** `electron/` ജോലിസ്ഥലം** അവസാനം അപ്ഡേറ്റ് ചെയ്തത്:** 2026-06-28 — v3.8.40

OmniRoute ഒരു ക്രോസ്-പ്ലാറ്റ്ഫോം ഡെസ്ക്ടോപ്പ് ആപ്പ് (Windows / macOS / Linux) നിർമ്മിച്ചിരിക്കുന്നത്**Electron 41** +** ഇലക്ട്രോൺ ബിൽഡർ 26.10** . ഡെസ്ക്ടോപ്പ് ആപ്പ് Next.js സ്റ്റാൻഡ്എലോൺ സെർവറിനെ ഒരു ചൈൽഡ് പ്രോസസ് ആയി രൂപപ്പെടുത്തുകയും അതിലേക്ക് ഒരു `BrowserWindow` പോയിൻ്റ് ചെയ്യുകയും സിസ്റ്റം ട്രേ, ഓട്ടോ-അപ്ഡേറ്റർ, IPC ബ്രിഡ്ജ്, സീറോ-കോൺഫിഗ് സീക്രട്ട് ബൂട്ട്സ്ട്രാപ്പ് എന്നിവ ചേർക്കുകയും ചെയ്യുന്നു.

## വാസ്തുവിദ്യ

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

## പതിപ്പുകൾ

`electron/package.json` യിൽ നിന്ന് സ്ഥിരീകരിച്ചു:

| പാക്കേജ്              | പതിപ്പ്                                                      |
| --------------------- | ------------------------------------------------------------ |
| `electron`            | `^43.4.1`                                                    |
| `electron-builder`    | `^26.15.3`                                                   |
| `electron-updater`    | `^6.8.9`                                                     |
| `better-sqlite3`      | റൂട്ട് `^13.0.2` (നോഡ്-എപിഐ പ്രീബിൽഡ് — നോ Electron റീബിൽഡ്) |
| ആപ്പ് പതിപ്പ്         | `3.8.0`                                                      |
| ആപ്പ് ഐഡി             | `online.omniroute.desktop`                                   |
| ഉൽപ്പന്നത്തിൻ്റെ പേര് | `OmniRoute`                                                  |

## സ്ക്രിപ്റ്റുകൾ (റൂട്ട് `package.json`)

| സ്ക്രിപ്റ്റ്                      | ഉദ്ദേശ്യം                                                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` + ആരംഭിക്കുന്നു `localhost:20128` + കാത്തിരിക്കുന്നു Electron സമാരംഭിക്കുന്നു                            |
| `npm run electron:build`          | Next.js നിർമ്മിക്കുന്നു, തുടർന്ന് നിലവിലെ OS നായി `electron-builder` പ്രവർത്തിപ്പിക്കുന്നു                             |
| `npm run electron:build:win`      | Windows NSIS ഇൻസ്റ്റാളർ + പോർട്ടബിൾ നിർമ്മിക്കുന്നു (x64)                                                              |
| `npm run electron:build:mac`      | macOS DMG (ഇൻ്റൽ + ആപ്പിൾ സിലിക്കൺ) നിർമ്മിക്കുന്നു                                                                    |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) നിർമ്മിക്കുന്നു                                                                     |
| `npm run electron:smoke:packaged` | പാക്കേജുചെയ്ത ബൈനറി സമാരംഭിക്കുകയും HTTP 200-നായി `/login` പ്രോബ് ചെയ്യുകയും ചെയ്യുന്നു, തുടർന്ന് ഷട്ട് ഡൗൺ ചെയ്യുന്നു |

`electron/` വർക്ക്സ്പെയ്സും തുറന്നുകാട്ടുന്നു:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` പ്രവർത്തിപ്പിക്കുന്നു
- `npm run build:mac-x64` / `build:mac-arm64` — സിംഗിൾ-ആർച്ച് macOS ബിൽഡുകൾ
- `npm run pack` — ഡയറക്ടറി-പ്രാദേശിക പരിശോധനയ്ക്കായി മാത്രം നിർമ്മിക്കുക (ഇൻസ്റ്റാളർ ഇല്ല)

## ഓപ്ഷണൽ റൺടൈം പായ്ക്കുകൾ

ഡെസ്ക്ടോപ്പ് ബിൽഡുകൾക്ക് അവരുടെ ഇൻസ്റ്റാളറുകൾക്കൊപ്പം ഓപ്ഷണൽ റൺടൈം ആർക്കൈവുകൾ പ്രസിദ്ധീകരിക്കാൻ കഴിയും. ഇൻസ്റ്റാൾ ചെയ്ത സെർവർ പേലോഡിൽ `optional-packs.index.json` അടങ്ങിയിരിക്കുന്നു ( Windows, Linux എന്നിവയിൽ `resources/app` ന് കീഴിൽ). `browser-runtime` എൻട്രിക്കായി, `packs[].tarball` വായിച്ച് ഡൗൺലോഡ് ചെയ്യുക** അതേ റിലീസിൽ നിന്നുള്ള കൃത്യമായ ഫയൽ നാമം** . ആർക്കൈവ് പേരുകളിൽ ഒരു SHA-256 ഡൈജസ്റ്റ് ഉൾപ്പെടുന്നു; വ്യത്യസ്ത ബിൽഡുകൾക്ക് വ്യത്യസ്ത ആർക്കൈവുകൾ ആവശ്യമായി വന്നേക്കാം. ഡൗൺലോഡ് ചെയ്ത ഫയലിൻ്റെ പേര് മാറ്റാതെ സൂക്ഷിക്കുക.

ഇൻസ്റ്റാൾ ചെയ്ത ആപ്പിൻ്റെ സൂചികയും തിരഞ്ഞെടുത്ത ആർക്കൈവും ഒരു ഡയറക്ടറിയിലേക്ക് പകർത്തുക, തുടർന്ന് അതേ റിലീസിൽ നിന്ന് CLI ഉപയോഗിക്കുക:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` ഇൻസ്റ്റാളേഷനും സ്ഥിരീകരണ നിലയും പ്രദർശിപ്പിക്കുന്നു, ആർക്കൈവ് ഫയൽ നാമമല്ല. ബണ്ടിൽ ചെയ്ത സൂചിക ആർക്കൈവ് തിരഞ്ഞെടുക്കുന്നു. എക്സ്ട്രാക്ഷൻ ചെയ്യുന്നതിന് മുമ്പായി ഇൻസ്റ്റലേഷൻ അതിൻ്റെ ആർക്കൈവ് ചെക്ക്സം പരിശോധിക്കുന്നു, ഇൻസ്റ്റോൾ ചെയ്ത ഒരു പായ്ക്ക് മാറ്റിസ്ഥാപിക്കുന്നതിന് മുമ്പ് അതിൻ്റെ പാക്കേജ് ചെക്ക്സം പരിശോധിക്കുന്നു. ഇത് പ്രാദേശിക ഫയലുകൾ വായിക്കുന്നു; ഇത് നഷ്ടപ്പെട്ട ആർക്കൈവുകൾ ഡൗൺലോഡ് ചെയ്യുന്നില്ല. ഇൻസ്റ്റാളേഷന് ശേഷം ആപ്ലിക്കേഷൻ പുനരാരംഭിക്കുക. റിലീസിന് പൊരുത്തപ്പെടുന്ന അസറ്റ് ഇല്ലെങ്കിൽ, ആ റിലീസിൻ്റെ അസറ്റുകൾ വഴി ഓപ്ഷണൽ പായ്ക്ക് ലഭ്യമല്ല.

## ഡയറക്ടറി ലേഔട്ട്

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

`main.js`, `preload.js` എന്നിവ രണ്ടും**CommonJS `.js` ഫയലുകൾ** , TypeScript അല്ല. റെൻഡറർ-സൈഡ് ടൈപ്പിംഗുകൾ `electron/types.d.ts` ൽ താമസിക്കുന്നു.

## IPC പാലം (`preload.js`)

`contextIsolation: true`, `nodeIntegration: false` എന്നിവയ്ക്കൊപ്പം `contextBridge` ഉപയോഗിച്ച് `window.electronAPI` ൽ ഒരു വൈറ്റ്ലിസ്റ്റ് ചെയ്ത API പ്രിലോഡ് തുറന്നുകാട്ടുന്നു.

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

തുറന്ന രീതികൾ:

| റെൻഡറർ കോൾ                                                        | ടൈപ്പ് ചെയ്യുക                    |
| ----------------------------------------------------------------- | --------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | അഭ്യർത്ഥിക്കുക                    |
| `openExternal(url)`                                               | അഭ്യർത്ഥിക്കുക                    |
| `getDataDir()`                                                    | അഭ്യർത്ഥിക്കുക                    |
| `restartServer()`                                                 | അഭ്യർത്ഥിക്കുക                    |
| `getAppVersion()`                                                 | അഭ്യർത്ഥിക്കുക                    |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | അഭ്യർത്ഥിക്കുക                    |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | അയയ്ക്കുക                         |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | സ്വീകരിക്കുക (റിട്ടേൺസ് ഡിസ്പോസർ) |

സ്വീകരിക്കുന്ന സഹായികൾ തിരികെ എ** ഡിസ്പോസർ പ്രവർത്തനം** `removeAllListeners` — യെ ആശ്രയിക്കുന്നതിനുപകരം ഇത് React ഘടകങ്ങൾ റീമൗണ്ട് ചെയ്യുമ്പോൾ ശ്രോതാക്കളുടെ ശേഖരണത്തെ തടയുന്നു.

## സെർവർ ജീവിതചക്രം

സിസ്റ്റം നോഡുമായുള്ള നേറ്റീവ്-മൊഡ്യൂൾ ABI പൊരുത്തക്കേട് ഒഴിവാക്കാൻ `main.js` നേരിട്ട് Electron നോഡ് റൺടൈം ഉപയോഗിച്ച് Next.js സ്റ്റാൻഡ്എലോൺ ബണ്ടിൽ ഉണ്ടാക്കുന്നു:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

ഹൈലൈറ്റുകൾ:

- `waitForServer()` ജാലകം കാണിക്കുന്നതിന് മുമ്പ് 30 സെക്കൻഡ് വരെ URL വോട്ടെടുപ്പ് നടത്തുന്നു (തണുത്ത ആരംഭത്തിൽ ശൂന്യമായ സ്ക്രീൻ ഇല്ല).
- `stdio: "pipe"` stdout/stderr പിടിച്ചെടുക്കുന്നു; തയ്യാറായ ശൈലികൾ (`Ready` / `listening`) IPC ൽ `server-status: running` പുറപ്പെടുവിക്കുന്നു.
- ഭംഗിയുള്ള SIGTERM (WAL ചെക്ക്പോയിൻ്റ്)ക്കായി`before-quit` 5 സെക്കൻഡ് വരെ കാത്തിരിക്കുന്നു, തുടർന്ന് SIGKILL അയയ്ക്കുന്നു.
- ട്രേയിലെ പോർട്ട് സ്വിച്ചർ (`20128`, `3000`, `8080`) നിർത്തി സെർവർ പുനരാരംഭിക്കുന്നു, തുടർന്ന് BrowserWindow വീണ്ടും ലോഡുചെയ്യുന്നു.

## സീറോ കോൺഫിഗർ സീക്രട്ട് ബൂട്ട്സ്ട്രാപ്പ്

ആദ്യ വിക്ഷേപണത്തിൽ, പ്രധാന പ്രക്രിയ സ്വയമേവ സൃഷ്ടിക്കുകയും നഷ്ടമായ രഹസ്യങ്ങൾ നിലനിൽക്കുകയും ചെയ്യുന്നു:

| രഹസ്യം                   | ഉറവിടം                                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                         |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (എൻക്രിപ്റ്റ് ചെയ്ത ക്രെഡിറ്റുകൾ ഇതിനകം നിലവിലുണ്ടെങ്കിൽ നിരസിക്കുന്നു) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                         |

`<DATA_DIR>/server.env` വരെ തുടർന്നു. `DATA_DIR` പരിഹരിക്കുന്നു:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` അല്ലെങ്കിൽ `~/.omniroute`
- macOS: `~/.omniroute`

## പരിസ്ഥിതി ഫയൽ തിരയൽ

സെർവർ സ്പോൺ ചെയ്യുന്നതിന് മുമ്പ്, പ്രധാന പ്രക്രിയ (`getPreferredEnvFilePath()` in `electron/main.js`) തിരഞ്ഞെടുക്കുന്നു** ഒന്ന്** `.env` ഫയൽ: നിലവിലുള്ളതിൽ ആദ്യത്തേത്.

1. `$DATA_DIR/.env`, പരിസ്ഥിതിയിൽ `DATA_DIR` സജ്ജീകരിക്കുമ്പോൾ ആപ്പ് സമാരംഭിച്ചു.
2. `<resolved DATA_DIR>/.env`, മുകളിൽ പറഞ്ഞ അതേ ഡിഫോൾട്ടുകൾ ഉപയോഗിക്കുന്നു: `%APPDATA%\omniroute\.env` ൽ Windows, `$XDG_CONFIG_HOME/omniroute/.env` അല്ലെങ്കിൽ `~/.omniroute/.env` ലെ Linux, macOS.
3. പ്രോസസ്സ് വർക്കിംഗ് ഡയറക്ടറിയിൽ `.env`.

പ്രധാന പ്രക്രിയ ആ ഫയൽ മാത്രം വായിക്കുന്നു; പിന്നീടുള്ള കാൻഡിഡേറ്റുകൾ ലയിപ്പിച്ചിട്ടില്ല. സെർവർ എൻവയോൺമെൻ്റ് ഈ മുൻഗണനയോടെ നിർമ്മിക്കപ്പെടുന്നു (ഏറ്റവും ഉയർന്നത് ആദ്യം):

1. Electron പ്രോസസ്സ് എൻവയോൺമെൻ്റ് (ആപ്പ് ലോഞ്ച് ചെയ്തതിൽ നിന്ന് വേരിയബിളുകൾ പാരമ്പര്യമായി ലഭിക്കുന്നു).
2. തിരഞ്ഞെടുത്ത `.env` ഫയൽ.
3. `<DATA_DIR>/server.env` (മുകളിലുള്ള ബൂട്ട്സ്ട്രാപ്പ് രഹസ്യങ്ങൾ).

ആപ്പ് ആരംഭിക്കുമ്പോൾ പ്രോസസ് എൻവയോൺമെൻ്റ് ക്യാപ്ചർ ചെയ്യപ്പെടും, അതിനാൽ ആപ്പ് പ്രവർത്തിക്കുന്ന സമയത്ത് ഒരു സിസ്റ്റം അല്ലെങ്കിൽ യൂസർ എൻവയോൺമെൻ്റ് വേരിയബിൾ സെറ്റ് (വിൻഡോ അടച്ചതിന് ശേഷം ട്രേയിൽ ഇരിക്കുന്നത് ഉൾപ്പെടെ) ആപ്പ് പൂർണ്ണമായി ഉപേക്ഷിച്ച് വീണ്ടും സമാരംഭിക്കുന്നതുവരെ സെർവറിൽ എത്തില്ല. `CONTEXT_LENGTH_<PROVIDER>` പോലുള്ള റൺടൈം നോബുകൾക്ക് ( [പരിസ്ഥിതി വേരിയബിളുകൾ കാണുക: ഓരോ ദാതാവിനും സന്ദർഭ ദൈർഘ്യം](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), `.env` ഫയൽ തിരഞ്ഞെടുക്കുക, തുടർന്ന് പൂർണ്ണമായും ഉപേക്ഷിക്കുക (ട്രേ,** ഉപേക്ഷിക്കുക** ) വീണ്ടും സമാരംഭിക്കുക.

## വിൻഡോ & ട്രേ

- `BrowserWindow`: 1400 × 900 (മിനിറ്റ് 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, `{ x: 16, y: 16 }` ലെ ട്രാഫിക്ക് ലൈറ്റ്.
- Windows/Linux: നേറ്റീവ് ടൈറ്റിൽ ബാർ.
- അടയ്ക്കുക ബട്ടൺ ട്രേയിലേക്ക് ചെറുതാക്കുന്നു; ട്രേ മെനുവുണ്ട്** OmniRoute തുറക്കുക** ,** ഡാഷ്ബോർഡ് തുറക്കുക** (ബാഹ്യ ബ്രൗസർ),** സെർവർ പോർട്ട്** ഉപമെനു,** അപ്ഡേറ്റുകൾക്കായി പരിശോധിക്കുക** ,** ഉപേക്ഷിക്കുക** .

## ഉള്ളടക്ക സുരക്ഷാ നയം

`session.defaultSession.webRequest.onHeadersReceived` വഴി സജ്ജമാക്കുക. ശ്രദ്ധേയമായ നിർദ്ദേശങ്ങൾ:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- ദേവ് മോഡ് `'unsafe-eval'` `script-src` ലേക്ക് മാത്രം ചേർക്കുന്നു

## സ്വയമേവ അപ്ഡേറ്റ്

GitHub ദാതാവിനൊപ്പം (`diegosouzapw/OmniRoute`) `electron-updater` ഉപയോഗിക്കുന്നു.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- ഇവൻ്റുകൾ `update-status` IPC വഴി റെൻഡറർക്ക് കൈമാറി: `checking`, `available`, `not-available`, `downloading` ( `percent` ഉള്ളത് ), `downloaded`, `error`
- `installUpdate()` സെർവറിനെ കൊല്ലുന്നു, തുടർന്ന് `autoUpdater.quitAndInstall()` എന്ന് വിളിക്കുന്നു
- dev മോഡിൽ ഒഴിവാക്കി (`!app.isPackaged`)

## പൈപ്പ് ലൈൻ നിർമ്മിക്കുക

1. `npm run build` → Next.js `.next/standalone` ൽ ഒറ്റയ്ക്കാണ്.
2. `prepare-electron-standalone.mjs` → വീണ്ടും `.next/electron-standalone` ലേക്ക് ഘട്ടം ഘട്ടമായി `server.js` + `required-server-files.json` നുള്ളിൽ കേവല പാതകൾ വീണ്ടും എഴുതുന്നു, അതിനാൽ ബണ്ടിൽ മാറ്റിസ്ഥാപിക്കാനാകും.
3. `electron-builder` പാക്കേജുകൾ `main.js`, `preload.js`, `node_modules`, `extraResources: { ../.next/electron-standalone → app }`.

### ലക്ഷ്യങ്ങൾ നിർമ്മിക്കുക

| OS      | ലക്ഷ്യങ്ങൾ                                    |
| ------- | --------------------------------------------- |
| Windows | NSIS ഇൻസ്റ്റാളർ + പോർട്ടബിൾ (x64)             |
| macOS   | DMG (Intel + arm64, ഡ്രാഗ്-ടു-ആപ്ലിക്കേഷനുകൾ) |
| Linux   | AppImage + DEB (x64 + arm64)                  |

NSIS ക്രമീകരണങ്ങൾ: `oneClick: false`, ഇൻസ്റ്റോൾ ഡയറക്ടറി തിരഞ്ഞെടുക്കാൻ ഉപയോക്താവിനെ അനുവദിക്കുന്നു, ഡെസ്ക്ടോപ്പും സ്റ്റാർട്ട്-മെനു കുറുക്കുവഴികളും സൃഷ്ടിക്കുന്നു.

## സ്മോക്ക് ടെസ്റ്റിംഗ് പാക്കേജ്ഡ് ബിൽഡ്

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- നിലവിലെ പ്ലാറ്റ്ഫോമിനായി `electron/dist-electron/` യിൽ പാക്കേജുചെയ്ത ബൈനറി സ്വയമേവ കണ്ടെത്തുന്നു.
- ഒറ്റപ്പെട്ട `HOME`/`APPDATA`/`XDG_*` ഡയറക്ടറികൾ ഉപയോഗിച്ച് സമാരംഭിക്കുന്നു, അതിനാൽ ഇത് ഡെവലപ്പർ ഡാറ്റയെ സ്പർശിക്കില്ല.
- 45 സെക്കൻഡിനുള്ളിൽ HTTP 200-നുള്ള വോട്ടെടുപ്പ് `http://127.0.0.1:20128/login`.
- മാരകമായ പാറ്റേണുകൾക്കായുള്ള വാച്ചുകൾ stderr/stdout (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, മുതലായവ).
- തയ്യാറായതിന് ശേഷം 2 സെക്കൻഡ് സ്ഥിരമായ റൺടൈം കാത്തിരിക്കുന്നു, തുടർന്ന് SIGTERM നൽകുകയും പോർട്ട് സ്വതന്ത്രമാകുന്നതിനായി കാത്തിരിക്കുകയും ചെയ്യുന്നു.
- CI യിൽ, സ്വയമേവ `--no-sandbox --disable-gpu` കടന്നുപോകുന്നു (ഒപ്പം Linux ൽ `--disable-dev-shm-usage` ).

എൻവി അസാധുവാക്കുന്നു: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## കോഡ് ഒപ്പിടൽ

`electron/package.json` ചെയ്യുന്നു** അല്ല** ക്രെഡൻഷ്യലുകൾ നേരിട്ട് ഒപ്പിടുക. അവയെ env vars വഴി `electron-builder` ലേക്ക് കൈമാറുക:

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

AppImage സൈനിംഗ് എന്നത് ഓപ്ഷണൽ ആണ് — സെറ്റ് സൈൻ ചെയ്യുകയാണെങ്കിൽ `LINUX_GPG_KEY`.

## വിതരണം

പുരാവസ്തുക്കൾ `electron/dist-electron/` യിൽ ഇറങ്ങുന്നു:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

റിലീസുകൾ GitHub റിലീസുകളിൽ (`diegosouzapw/OmniRoute`) പ്രസിദ്ധീകരിക്കുന്നു, അവിടെയാണ് `electron-updater` പുതിയ പതിപ്പുകൾക്കായി പരിശോധിക്കുന്നത്.

## ട്രബിൾഷൂട്ടിംഗ്

| ലക്ഷണം                                                            | പരിഹരിക്കുക                                                                                                                                                             |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron പ്രധാന ബമ്പിന് ശേഷം`Cannot find module 'better-sqlite3'` | better-sqlite3 v13 ഷിപ്പുകൾ Node-API റൂട്ടിലും `prepare:bundle` ലും — റീ-റൺ `npm install` പ്രീബിൽഡ് ചെയ്യുന്നു (ഇത് നിലവിലെ പ്ലാറ്റ്ഫോമിനായി പ്രീബിൽഡ് പരിശോധിക്കുന്നു) |
| നേറ്റീവ് മൊഡ്യൂളിനായി`ERR_DLOPEN_FAILED`                          | `prepare:bundle` — വീണ്ടും പ്രവർത്തിപ്പിക്കുക, നിലവിലെ പ്ലാറ്റ്ഫോമിനായുള്ള നോഡ്-എപിഐ പ്രീബിൽഡ് കാണാതെ വരുമ്പോൾ അത് വേഗത്തിൽ പരാജയപ്പെടുന്നു                             |
| Linux യിൽ വിൻഡോ ശൂന്യമായി കാണപ്പെടുന്നു                           | Next.js സെർവർ യഥാർത്ഥത്തിൽ PORT ലേക്ക് ബന്ധിപ്പിച്ചതായി സ്ഥിരീകരിക്കുക ( `[Server]` ലോഗുകൾ പരിശോധിക്കുക)                                                                |
| macOS നോട്ടറൈസേഷൻ സ്റ്റാളുകൾ                                      | `APPLE_*` vars കയറ്റുമതി ചെയ്യുന്നുണ്ടെന്ന് ഉറപ്പാക്കുക, `.env` ൽ മാത്രമല്ല                                                                                             |
| Windows SmartScreen മുന്നറിയിപ്പ്                                 | EV cert ഉപയോഗിച്ച് സൈൻ ചെയ്യുക, അല്ലെങ്കിൽ ഉപയോക്താക്കൾ → "എന്തായാലും പ്രവർത്തിപ്പിക്കുക" എന്നതിൽ വലത്-ക്ലിക്കുചെയ്യുക                                                  |
| പോർട്ട്-ഇൻ-ഉപയോഗത്തിൽ സ്മോക്ക് ടെസ്റ്റ് പരാജയപ്പെടുന്നു           | `electron:smoke:packaged` പ്രവർത്തിപ്പിക്കുന്നതിന് മുമ്പ് 20128-ൽ ഏതെങ്കിലും പ്രാദേശിക ദേവ് സെർവർ നിർത്തുക                                                              |

## ഇതും കാണുക

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- ഉറവിടം: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- സഹായികൾ: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
