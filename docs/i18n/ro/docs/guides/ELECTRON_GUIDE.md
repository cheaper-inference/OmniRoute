# Electron Desktop Guide (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Sursa adevărului:** spațiu de lucru `electron/`** Ultima actualizare:** 2026-06-28 — v3.8.40

OmniRoute oferă o aplicație desktop multiplatformă (Windows / macOS / Linux) construită pe**Electron 41** +** constructor de electroni 26.10** . Aplicația desktop generează serverul Next.js independent ca un proces copil, indică un `BrowserWindow` către el și adaugă o bară de sistem, un auto-updater, IPC bridge și zero-config secret bootstrap.

## Arhitectură

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

## Versiuni

Confirmat de `electron/package.json`:

| Pachet               | Versiune                                                        |
| -------------------- | --------------------------------------------------------------- |
| `electron`           | `^43.4.1`                                                       |
| `electron-builder`   | `^26.15.3`                                                      |
| `electron-updater`   | `^6.8.9`                                                        |
| `better-sqlite3`     | rădăcină `^13.0.2` (Node-API prebuilding — no Electron rebuild) |
| Versiunea aplicației | `3.8.0`                                                         |
| ID aplicație         | `online.omniroute.desktop`                                      |
| Numele produsului    | `OmniRoute`                                                     |

## Scripturi (rădăcină `package.json`)

| Scenariul                         | Scop                                                                          |
| --------------------------------- | ----------------------------------------------------------------------------- |
| `npm run electron:dev`            | Pornește `npm run dev` + așteaptă `localhost:20128` + lansează Electron       |
| `npm run electron:build`          | Construiește Next.js apoi rulează `electron-builder` pentru OS curent         |
| `npm run electron:build:win`      | Construiește Windows NSIS installer + portabil (x64)                          |
| `npm run electron:build:mac`      | Construiește macOS DMG (Intel + Apple Silicon)                                |
| `npm run electron:build:linux`    | Construiește Linux AppImage + DEB (x64 + arm64)                               |
| `npm run electron:smoke:packaged` | Lansează pachetul binar și probează `/login` pentru HTTP 200, apoi se oprește |

Spațiul de lucru `electron/` expune și:

- `npm run prepare:bundle` — rulează `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — macOS un singur arc
- `npm run pack` — numai director pentru testare locală (fără program de instalare)

## Pachete de runtime opționale

Compilările desktop pot publica arhivele de rulare opționale alături de instalatorii lor. Sarcina utilă a serverului instalat conține `optional-packs.index.json` (sub `resources/app` pe Windows și Linux). Pentru intrarea `browser-runtime`, citiți `packs[].tarball` și descărcați** exact acel nume de fișier din aceeași versiune** . Numele arhivelor includ un rezumat SHA-256 ; diferite versiuni pot necesita diferite arhive. Păstrați numele fișierului descărcat neschimbat.

Copiați indexul aplicației instalate și arhiva selectată într-un singur director, apoi utilizați CLI din aceeași versiune:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` afișează starea de instalare și verificare, nu numele fișierului de arhivă. Indexul grupat selectează arhiva. Instalarea își verifică suma de verificare a arhivei înainte de extracție și sumele de verificare a pachetului înainte de a înlocui un pachet instalat. Citește fișierele locale; nu descarcă arhivele lipsă. Reporniți aplicația după instalare. Dacă ediția nu are niciun activ care se potrivește, pachetul opțional nu este disponibil prin activele versiunii respective.

## Aspect director

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

Atât `main.js`, cât și `preload.js` sunt** fișiere CommonJS `.js`** , nu TypeScript. Tastările din partea de redare se află în `electron/types.d.ts`.

## Podul IPC (`preload.js`)

Preîncărcarea expune un API pe lista albă pe `window.electronAPI` folosind `contextBridge` cu `contextIsolation: true` și `nodeIntegration: false`.

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

Metode expuse:

| Apel de redare                                                    | Tip                               |
| ----------------------------------------------------------------- | --------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoca                            |
| `openExternal(url)`                                               | invoca                            |
| `getDataDir()`                                                    | invoca                            |
| `restartServer()`                                                 | invoca                            |
| `getAppVersion()`                                                 | invoca                            |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoca                            |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | trimite                           |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | primiți (returnează dispozitivul) |

Ajutoarele care primesc se întorc a** funcția de eliminare** în loc să se bazeze pe `removeAllListeners` — acest lucru previne acumularea de ascultători atunci când componentele React se remontează.

## Ciclul de viață al serverului

`main.js` generează pachetul Next.js autonom direct cu timpul de execuție Electron Node pentru a evita nepotrivirea ABI a modulului nativ cu Nodul de sistem:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Repere:

- `waitForServer()` sonda URL până la 30 s înainte de a afișa fereastra (fără ecran gol la pornirea la rece).
- `stdio: "pipe"` captează stdout/stderr; frazele gata (`Ready` / `listening`) emit `server-status: running` peste IPC.
- `before-quit` așteaptă până la 5 s pentru SIGTERM grațios (punct de control WAL ), apoi trimite SIGKILL.
- Comutatorul de porturi din tavă (`20128`, `3000`, `8080`) oprește și repornește serverul, apoi reîncarcă BrowserWindow.

## Bootstrap secret cu configurație zero

La prima lansare, procesul principal generează automat și persistă secretele lipsă:

| Secret                   | Sursă                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                            |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (refuză dacă există deja credite criptate) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                            |

A persistat la `<DATA_DIR>/server.env`. `DATA_DIR` se rezolvă la:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` sau `~/.omniroute`
- macOS: `~/.omniroute`

## Căutare fișier de mediu

Înainte de a genera serverul, procesul principal (`getPreferredEnvFilePath()` în `electron/main.js`) alege** unul** fișier `.env` : primul dintre acestea care există.

1. `$DATA_DIR/.env`, când `DATA_DIR` este setat în mediul în care a fost lansată aplicația.
2. `<resolved DATA_DIR>/.env`, folosind aceleași valori implicite ca mai sus: `%APPDATA%\omniroute\.env` pe Windows, `$XDG_CONFIG_HOME/omniroute/.env` sau `~/.omniroute/.env` pe Linux și macOS.
3. `.env` în directorul de lucru al procesului.

Procesul principal citește doar acel fișier; candidații ulterioare nu sunt îmbinați. Mediul server este apoi construit cu această prioritate (mai întâi cea mai mare):

1. Mediul de proces Electron (variabile moștenite de la orice a lansat aplicația).
2. Fișierul `.env` selectat.
3. `<DATA_DIR>/server.env` (secretele bootstrap de mai sus).

Mediul de proces este capturat atunci când pornește aplicația, astfel încât o variabilă de mediu de sistem sau utilizator setată în timp ce aplicația rulează (inclusiv în timp ce se află în tavă după ce fereastra sa este închisă) nu ajunge la server până când aplicația este complet închisă și relansată. Pentru butoanele de rulare, cum ar fi `CONTEXT_LENGTH_<PROVIDER>` (consultați [Variabilele de mediu: lungimea contextului pe furnizor](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), preferați fișierul `.env`, apoi ieșiți complet (tava,** Renunță** ) și relansați.

## Fereastra si tava

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, semafor la `{ x: 16, y: 16 }`.
- Windows/Linux: bara de titlu nativă.
- Butonul de închidere minimizează în tavă; meniul tava are** Deschide OmniRoute** ,** Deschideți tabloul de bord** (browser extern),** Portul serverului** submeniu,** Verificați actualizările** ,** Renunță** .

## Politica de securitate a conținutului

Setați prin `session.defaultSession.webRequest.onHeadersReceived`. Directive notabile:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Modul Dev adaugă `'unsafe-eval'` numai la `script-src`

## Actualizare automată

Utilizează `electron-updater` cu furnizorul GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Evenimente redirecționate către redator prin `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (cu `percent`), `downloaded`, `error`
- `installUpdate()` ucide serverul apoi apelează `autoUpdater.quitAndInstall()`
- S-a omis în modul de dezvoltare (`!app.isPackaged`)

## Construiți o conductă

1. `npm run build` → Next.js independent în `.next/standalone`.
2. `prepare-electron-standalone.mjs` → re-stadiază în `.next/electron-standalone` și rescrie căile absolute în interiorul `server.js` + `required-server-files.json`, astfel încât pachetul să fie relocabil.
3. pachetele `electron-builder` `main.js`, `preload.js`, `node_modules` și `extraResources: { ../.next/electron-standalone → app }`.

### Construiți ținte

| OS      | Ținte                                     |
| ------- | ----------------------------------------- |
| Windows | NSIS installer + portable (x64)           |
| macOS   | DMG (Intel + arm64, drag-to-Applications) |
| Linux   | AppImage + DEB (x64 + arm64)              |

Setări NSIS : `oneClick: false`, permite utilizatorului să aleagă directorul de instalare, creează comenzi rapide pentru Desktop și Start-Menu.

## Constructie ambalată pentru testarea fumului

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Descoperă automat binarul împachetat în `electron/dist-electron/` pentru platforma curentă.
- Se lansează cu directoare izolate `HOME`/`APPDATA`/`XDG_*`, astfel încât să nu atingă datele dezvoltatorului.
- Sondați `http://127.0.0.1:20128/login` pentru 200 HTTP în 45 de secunde.
- Ceasuri stderr/stdout pentru modele fatale (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, etc.).
- Așteaptă 2 s de durată stabilă după pregătire, apoi emite SIGTERM și așteaptă ca portul să se elibereze.
- În CI, trece automat `--no-sandbox --disable-gpu` (și `--disable-dev-shm-usage` pe Linux).

Înv. suprascrie: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Semnarea codului

`electron/package.json` face** nu** acreditările de semnare prin cablu direct. Transmite-le prin env vars la `electron-builder`:

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

semnarea AppImage este opțională — set `LINUX_GPG_KEY` dacă semnați.

## Distributie

Artefacte aterizează în `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Lansările sunt publicate în GitHub Releases (`diegosouzapw/OmniRoute`), care este, de asemenea, locul în care `electron-updater` verifică pentru versiuni noi.

## Depanare

| Simptom                                                        | Fix                                                                                                                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` după Electron bump major | better-sqlite3 v13 livrează Node-API prebuild — re-run `npm install` la rădăcină și `prepare:bundle` (verifică prebuild-ul pentru platforma curentă) |
| `ERR_DLOPEN_FAILED` pentru modulul nativ                       | Reluați `prepare:bundle` — eșuează rapid când lipsește prebuild-ul Node-API pentru platforma actuală                                                 |
| Fereastra apare goală pe Linux                                 | Confirmați că serverul Next.js este legat efectiv la PORT (verificați jurnalele `[Server]` )                                                         |
| macOS standuri de notarizare                                   | Asigurați-vă că `APPLE_*` vars sunt exportate, nu doar în `.env`                                                                                     |
| avertisment Windows SmartScreen                                | Semnează cu EV cert sau utilizatorii dau clic dreapta pe → „Run anyway”                                                                              |
| Testul de fum eșuează cu portul în uz                          | Opriți orice server de dezvoltare local pe 20128 înainte de a rula `electron:smoke:packaged`                                                         |

## Vezi De asemenea

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Sursa: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Ajutoare: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
