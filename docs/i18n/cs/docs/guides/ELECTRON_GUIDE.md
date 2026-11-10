# Electron Desktop Guide (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Zdroj pravdy:** pracovní prostor `electron/`** Poslední aktualizace:** 2026-06-28 — v3.8.40

OmniRoute dodává desktopovou aplikaci pro různé platformy (Windows / macOS / Linux) postavenou na**Electron 41** +** elektron-builder 26.10** . Desktopová aplikace vytvoří samostatný server Next.js jako podřízený proces, ukáže na něj `BrowserWindow` a přidá systémovou lištu, automatickou aktualizaci, most IPC a tajný bootstrap s nulovou konfigurací.

## Architektura

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

## Verze

Potvrzeno od `electron/package.json`:

| Balík              | Verze                                                     |
| ------------------ | --------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                 |
| `electron-builder` | `^26.15.3`                                                |
| `electron-updater` | `^6.8.9`                                                  |
| `better-sqlite3`   | root `^13.0.2` (Node-API prebuilds — no Electron rebuild) |
| Verze aplikace     | `3.8.0`                                                   |
| ID aplikace        | `online.omniroute.desktop`                                |
| Název produktu     | `OmniRoute`                                               |

## Skripty (kořenový `package.json`)

| Skript                            | Účel                                                                            |
| --------------------------------- | ------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Spustí `npm run dev` + čeká na `localhost:20128` + spustí Electron              |
| `npm run electron:build`          | Sestaví Next.js a poté spustí `electron-builder` pro aktuální OS                |
| `npm run electron:build:win`      | Sestaví instalační program Windows NSIS + portable (x64)                        |
| `npm run electron:build:mac`      | Staví macOS DMG (Intel + Apple Silicon)                                         |
| `npm run electron:build:linux`    | Sestaví Linux AppImage + DEB (x64 + arm64)                                      |
| `npm run electron:smoke:packaged` | Spustí zabalený binární soubor a prozkoumá `/login` pro HTTP 200, poté se vypne |

Pracovní plocha `electron/` také odhaluje:

- `npm run prepare:bundle` — běží `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — jednoobloukové sestavy macOS
- `npm run pack` — sestavení pouze pro adresář pro místní testování (žádný instalátor)

## Volitelné runtime balíčky

Sestavení pro stolní počítače mohou publikovat volitelné runtime archivy spolu se svými instalačními programy. Nainstalovaná datová část serveru obsahuje `optional-packs.index.json` (pod `resources/app` na Windows a Linux). Pro záznam `browser-runtime` si přečtěte `packs[].tarball` a stáhněte** přesný název souboru ze stejného vydání** . Názvy archivů zahrnují výtah SHA-256 ; různé sestavení mohou vyžadovat různé archivy. Ponechte stažený název souboru beze změny.

Zkopírujte index nainstalované aplikace a vybraný archiv do jednoho adresáře a poté použijte CLI ze stejného vydání:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` zobrazuje stav instalace a ověření, nikoli název souboru archivu. Sdružený index vybere archiv. Instalace ověří kontrolní součet archivu před extrakcí a kontrolní součty balíčků před výměnou nainstalovaného balíčku. Čte místní soubory; nestahuje chybějící archivy. Po instalaci restartujte aplikaci. Pokud vydání nemá žádné odpovídající aktivum, volitelný balíček není dostupný prostřednictvím aktiv daného vydání.

## Rozložení adresáře

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

`main.js` i `preload.js` jsou**CommonJS `.js` soubory** , ne TypeScript. Typy na straně vykreslovače žijí v `electron/types.d.ts`.

## IPC most (`preload.js`)

Předběžné načtení odhalí API na seznamu povolených na `window.electronAPI` pomocí `contextBridge` s `contextIsolation: true` a `nodeIntegration: false`.

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

Exponované metody:

| Volání rendereru                                                  | Typ                    |
| ----------------------------------------------------------------- | ---------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | vyvolat                |
| `openExternal(url)`                                               | vyvolat                |
| `getDataDir()`                                                    | vyvolat                |
| `restartServer()`                                                 | vyvolat                |
| `getAppVersion()`                                                 | vyvolat                |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | vyvolat                |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | poslat                 |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | přijímat (vrací drtič) |

Přijímající pomocníci se vracejí a** funkce drtiče** místo spoléhání se na `removeAllListeners` — to zabrání akumulaci posluchačů při opětovném připojení komponent React.

## Životní cyklus serveru

`main.js` vytvoří samostatný balíček Next.js přímo s běhovým prostředím uzlu Electron, aby se zabránilo nesouladu ABI nativního modulu se systémovým uzlem:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Nejdůležitější:

- `waitForServer()` dotazuje URL až 30 s před zobrazením okna (při studeném startu žádná prázdná obrazovka).
- `stdio: "pipe"` zachycuje stdout/stderr; připravené fráze (`Ready` / `listening`) vydávají `server-status: running` přes IPC.
- `before-quit` čeká až 5 s na elegantní SIGTERM (kontrolní bod WAL ), poté odešle SIGKILL.
- Přepínač portů v zásobníku (`20128`, `3000`, `8080`) zastaví a restartuje server a poté znovu načte BrowserWindow.

## Tajný bootstrap s nulovou konfigurací

Při prvním spuštění hlavní proces automaticky generuje a přetrvává chybějící tajemství:

| Tajný                    | Zdroj                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                    |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (odmítne, pokud již zašifrovaná pověření existují) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                    |

Trval na `<DATA_DIR>/server.env`. `DATA_DIR` řeší:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` nebo `~/.omniroute`
- macOS: `~/.omniroute`

## Vyhledávání souborů prostředí

Před spuštěním serveru se vybere hlavní proces (`getPreferredEnvFilePath()` v `electron/main.js`).** jeden** `.env` soubor: první z nich, který existuje.

1. `$DATA_DIR/.env`, když je `DATA_DIR` nastaveno v prostředí, se kterým byla aplikace spuštěna.
2. `<resolved DATA_DIR>/.env` s použitím stejných výchozích hodnot jako výše: `%APPDATA%\omniroute\.env` na Windows, `$XDG_CONFIG_HOME/omniroute/.env` nebo `~/.omniroute/.env` na Linux a macOS.
3. `.env` v pracovním adresáři procesu.

Hlavní proces čte pouze tento soubor; pozdější kandidáti se neslučují. Prostředí serveru je pak vytvořeno s touto prioritou (nejvyšší první):

1. Prostředí procesu Electron (proměnné zděděné z čehokoli, co spustilo aplikaci).
2. Vybraný soubor `.env`.
3. `<DATA_DIR>/server.env` (tajemství bootstrapu výše).

Prostředí procesu je zachyceno při spuštění aplikace, takže systémová nebo uživatelská proměnná prostředí nastavená za běhu aplikace (včetně doby, kdy sedí v zásobníku po zavření okna) se nedostane na server, dokud není aplikace zcela ukončena a znovu spuštěna. U knobů runtime, jako je `CONTEXT_LENGTH_<PROVIDER>` (viz [Proměnné prostředí: Délka kontextu podle poskytovatele](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), upřednostňujte soubor `.env` a poté úplně ukončete (zásobník,** Přestat** ) a znovu spustit.

## Okno a zásobník

- `BrowserWindow`: 1400 × 900 (min. 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, semafor na `{ x: 16, y: 16 }`.
- Windows/Linux: nativní titulní pruh.
- Tlačítko Zavřít se minimalizuje do zásobníku; nabídka zásobníku má** Otevřete OmniRoute** ,** Otevřete řídicí panel** (externí prohlížeč),** Port serveru** podnabídka,** Zkontrolujte aktualizace** ,** Přestat** .

## Zásady zabezpečení obsahu

Nastavit přes `session.defaultSession.webRequest.onHeadersReceived`. Pozoruhodné směrnice:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Režim Dev přidává `'unsafe-eval'` pouze k `script-src`

## Automatická aktualizace

Používá `electron-updater` s poskytovatelem GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Události předávané do vykreslovače prostřednictvím `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (se `percent`), `downloaded`, `error`
- `installUpdate()` zabije server a poté zavolá `autoUpdater.quitAndInstall()`
- Přeskočeno v režimu pro vývojáře (`!app.isPackaged`)

## Sestavte potrubí

1. `npm run build` → Next.js samostatně v `.next/standalone`.
2. `prepare-electron-standalone.mjs` → se přestaví do `.next/electron-standalone` a přepíše absolutní cesty uvnitř `server.js` + `required-server-files.json` takže svazek je přemístitelný.
3. `electron-builder` balíčky `main.js`, `preload.js`, `node_modules` a `extraResources: { ../.next/electron-standalone → app }`.

### Stavte cíle

| OS      | Cíle                                      |
| ------- | ----------------------------------------- |
| Windows | NSIS instalační program + portable (x64)  |
| macOS   | DMG (Intel + arm64, drag-to-Applications) |
| Linux   | AppImage + DEB (x64 + arm64)              |

NSIS settings: `oneClick: false`, umožňuje uživateli vybrat instalační adresář, vytváří zástupce na ploše a v nabídce Start.

## Balená sestavení pro testování kouře

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automaticky objeví zabalený binární soubor v `electron/dist-electron/` pro aktuální platformu.
- Spouští se s izolovanými adresáři `HOME`/`APPDATA`/`XDG_*`, takže se nedotýká vývojářských dat.
- Ankety `http://127.0.0.1:20128/login` za 200 HTTP během 45 s.
- Hodinky stderr/stdout pro fatální vzory (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` atd.).
- Po připravenosti čeká 2 s stabilního běhu, poté vydá SIGTERM a čeká na uvolnění portu.
- V CI automaticky předá `--no-sandbox --disable-gpu` (a `--disable-dev-shm-usage` na Linux).

Env přepíše: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Podepisování kódu

`electron/package.json` dělá** ne** přímo přihlašovací údaje pro podpis drátu. Předejte je přes env vars do `electron-builder`:

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

podepisování AppImage je volitelné — nastavit `LINUX_GPG_KEY` při podepisování.

## Rozdělení

Artefakty přistávají v `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Vydání jsou publikována do GitHub Releases (`diegosouzapw/OmniRoute`), kde také `electron-updater` kontroluje nové verze.

## Odstraňování problémů

| Příznak                                                        | Opravit                                                                                                                                                      |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` po Electron hlavní náraz | better-sqlite3 v13 dodává prebuilds Node-API — znovu spusťte `npm install` v kořenovém adresáři a `prepare:bundle` (ověřuje prebuild pro aktuální platformu) |
| `ERR_DLOPEN_FAILED` pro nativní modul                          | Znovu spusťte `prepare:bundle` — rychle selže, když chybí předsestavení Node-API pro aktuální platformu                                                      |
| Na Linux je okno prázdné                                       | Potvrďte Next.js server skutečně navázaný na PORT (zkontrolujte protokoly `[Server]` )                                                                       |
| macOS notářské stánky                                          | Zajistěte export proměnných `APPLE_*`, nikoli pouze v `.env`                                                                                                 |
| varování Windows SmartScreen                                   | Přihlaste se pomocí certifikátu EV nebo uživatelé klepněte pravým tlačítkem myši → „Přesto spustit“                                                          |
| Test kouře selže s portem v provozu                            | Před spuštěním `electron:smoke:packaged` zastavte jakýkoli místní dev server v roce 20128                                                                    |

## Viz také

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Zdroj: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pomocníci: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
