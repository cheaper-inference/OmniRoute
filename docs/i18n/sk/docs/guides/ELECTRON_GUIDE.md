# Electron Desktop Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Zdroj pravdy:** pracovný priestor `electron/`** Posledná aktualizácia:** 2026-06-28 — v3.8.40

OmniRoute dodáva desktopovú aplikáciu pre rôzne platformy (Windows / macOS / Linux) postavenú na**Electron 41** +** elektron-staviteľ 26.10** . Desktopová aplikácia vytvorí samostatný server Next.js ako podriadený proces, ukáže naň `BrowserWindow` a pridá systémovú lištu, automatickú aktualizáciu, most IPC a tajný bootstrap s nulovou konfiguráciou.

## Architektúra

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

## Verzie

Potvrdené od `electron/package.json`:

| Balíček            | Verzia                                                                |
| ------------------ | --------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                             |
| `electron-builder` | `^26.15.3`                                                            |
| `electron-updater` | `^6.8.9`                                                              |
| `better-sqlite3`   | root `^13.0.2` (Node-API vopred zostaví — bez prebudovania Electron ) |
| Verzia aplikácie   | `3.8.0`                                                               |
| ID aplikácie       | `online.omniroute.desktop`                                            |
| Názov produktu     | `OmniRoute`                                                           |

## Skripty (root `package.json`)

| Skript                            | Účel                                                                          |
| --------------------------------- | ----------------------------------------------------------------------------- |
| `npm run electron:dev`            | Spustí `npm run dev` + čaká na `localhost:20128` + spustí Electron            |
| `npm run electron:build`          | Zostaví Next.js a potom spustí `electron-builder` pre aktuálny OS             |
| `npm run electron:build:win`      | Vytvára Windows NSIS inštalačný + portable (x64)                              |
| `npm run electron:build:mac`      | Vytvára macOS DMG (Intel + Apple Silicon)                                     |
| `npm run electron:build:linux`    | Zostaví Linux AppImage + DEB (x64 + arm64)                                    |
| `npm run electron:smoke:packaged` | Spustí zabalený binárny súbor a sonduje `/login` pre HTTP 200, potom sa vypne |

Pracovný priestor `electron/` tiež odhaľuje:

- `npm run prepare:bundle` — beží `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — zostavy macOS s jedným oblúkom
- `npm run pack` — zostava len pre adresár na lokálne testovanie (bez inštalátora)

## Voliteľné runtime balíčky

Desktopové zostavy môžu publikovať voliteľné runtime archívy spolu s ich inštalátormi. Užitočné zaťaženie nainštalovaného servera obsahuje `optional-packs.index.json` (pod `resources/app` na Windows a Linux). Pre položku `browser-runtime` si prečítajte `packs[].tarball` a stiahnite** presne ten názov súboru z toho istého vydania** . Názvy archívov zahŕňajú súhrn SHA-256 ; rôzne zostavy môžu vyžadovať rôzne archívy. Ponechajte prevzatý názov súboru nezmenený.

Skopírujte index nainštalovanej aplikácie a vybratý archív do jedného adresára a potom použite CLI z rovnakého vydania:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` zobrazuje stav inštalácie a overenia, nie názov súboru archívu. Zbalený index vyberie archív. Inštalácia overí svoj archívny kontrolný súčet pred extrakciou a jeho kontrolné súčty balíkov pred výmenou nainštalovaného balíka. Číta lokálne súbory; nesťahuje chýbajúce archívy. Po inštalácii reštartujte aplikáciu. Ak vydanie nemá žiadne zodpovedajúce aktívum, voliteľný balík nie je dostupný prostredníctvom aktív daného vydania.

## Rozloženie adresára

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

`main.js` aj `preload.js` sú**CommonJS `.js` súbory** , nie TypeScript. Písanie na strane vykresľovacieho modulu žije v `electron/types.d.ts`.

## IPC most (`preload.js`)

Predbežné načítanie odkryje API na bielej listine na `window.electronAPI` pomocou `contextBridge` s `contextIsolation: true` a `nodeIntegration: false`.

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

Exponované metódy:

| Hovor vykresľovača                                                | Typ                  |
| ----------------------------------------------------------------- | -------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | vyvolať              |
| `openExternal(url)`                                               | vyvolať              |
| `getDataDir()`                                                    | vyvolať              |
| `restartServer()`                                                 | vyvolať              |
| `getAppVersion()`                                                 | vyvolať              |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | vyvolať              |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | poslať               |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | prijať (vráti drvič) |

Prijímajúci pomocníci sa vracajú a** funkcia drviča** namiesto spoliehania sa na `removeAllListeners` — to zabraňuje akumulácii poslucháčov pri opätovnom pripájaní komponentov React.

## Životný cyklus servera

`main.js` vytvorí samostatný balík Next.js priamo s runtime uzla Electron, aby sa predišlo nesúladu ABI natívneho modulu so systémovým uzlom:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Najdôležitejšie:

- `waitForServer()` zisťuje URL až 30 s pred zobrazením okna (bez prázdnej obrazovky pri studenom štarte).
- `stdio: "pipe"` zachytáva stdout/stderr; pripravené frázy (`Ready` / `listening`) vyžarujú `server-status: running` cez IPC.
- `before-quit` čaká až 5 s na elegantné SIGTERM (kontrolný bod WAL ), potom odošle SIGKILL.
- Prepínač portov v zásobníku (`20128`, `3000`, `8080`) zastaví a reštartuje server a potom znova načíta BrowserWindow.

## Zero-config Secret Bootstrap

Pri prvom spustení hlavný proces automaticky generuje a pretrváva chýbajúce tajomstvá:

| Tajomstvo                | Zdroj                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                  |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (odmietne, ak už existujú zašifrované poverenia) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                  |

Trval na `<DATA_DIR>/server.env`. `DATA_DIR` rieši:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` alebo `~/.omniroute`
- macOS: `~/.omniroute`

## Vyhľadanie súboru prostredia

Pred vytvorením servera sa vyberie hlavný proces (`getPreferredEnvFilePath()` v `electron/main.js`).** jeden** `.env` súbor: prvý z nich, ktorý existuje.

1. `$DATA_DIR/.env`, keď je `DATA_DIR` nastavené v prostredí, v ktorom bola aplikácia spustená.
2. `<resolved DATA_DIR>/.env` s použitím rovnakých predvolených nastavení ako vyššie: `%APPDATA%\omniroute\.env` na Windows, `$XDG_CONFIG_HOME/omniroute/.env` alebo `~/.omniroute/.env` na Linux a macOS.
3. `.env` v pracovnom adresári procesu.

Hlavný proces číta iba tento súbor; neskorší kandidáti sa nezlúčia. Prostredie servera sa potom vytvorí s touto prioritou (najvyššia ako prvá):

1. Prostredie procesu Electron (premenné zdedené z čohokoľvek, čo spustilo aplikáciu).
2. Vybraný súbor `.env`.
3. `<DATA_DIR>/server.env` (tajomstvo zavádzania vyššie).

Prostredie procesu je zachytené pri spustení aplikácie, takže systémová alebo používateľská premenná prostredia nastavená počas spustenia aplikácie (vrátane doby, keď sedí v zásobníku po zatvorení jej okna), sa nedostane na server, kým sa aplikácia úplne neukončí a znova nespustí. Pre gombíky runtime, ako je `CONTEXT_LENGTH_<PROVIDER>` (pozrite si [časť Premenné prostredia: Dĺžka kontextu podľa poskytovateľa](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), uprednostnite súbor `.env` a potom úplne ukončite (zásobník,** Ukončite** ) a znova spustite.

## Okno a zásobník

- `BrowserWindow`: 1400 × 900 (min. 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, semafor na `{ x: 16, y: 16 }`.
- Windows/Linux: natívny titulný pruh.
- Tlačidlo Zavrieť sa minimalizuje do zásobníka; ponuka zásobníka má** Otvorte OmniRoute** ,** Otvorte informačný panel** (externý prehliadač),** Port servera** podmenu,** Skontrolujte aktualizácie** ,** Ukončite** .

## Zásady zabezpečenia obsahu

Nastaviť cez `session.defaultSession.webRequest.onHeadersReceived`. Pozoruhodné smernice:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Režim Dev pridá `'unsafe-eval'` iba k `script-src`

## Automatická aktualizácia

Používa `electron-updater` s poskytovateľom GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Udalosti preposlané do vykresľovacieho modulu cez `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (so `percent`), `downloaded`, `error`
- `installUpdate()` zabije server a potom zavolá `autoUpdater.quitAndInstall()`
- Preskočené v režime pre vývojárov (`!app.isPackaged`)

## Zostavte potrubie

1. `npm run build` → Next.js samostatne v `.next/standalone`.
2. `prepare-electron-standalone.mjs` → sa prestaví do `.next/electron-standalone` a prepíše absolútne cesty vo vnútri `server.js` + `required-server-files.json` takže balík je premiestniteľný.
3. `electron-builder` balíky `main.js`, `preload.js`, `node_modules` a `extraResources: { ../.next/electron-standalone → app }`.

### Stavať ciele

| OS      | Ciele                                     |
| ------- | ----------------------------------------- |
| Windows | NSIS inštalačný program + portable (x64)  |
| macOS   | DMG (Intel + arm64, drag-to-Applications) |
| Linux   | AppImage + DEB (x64 + arm64)              |

NSIS settings: `oneClick: false`, umožňuje používateľovi vybrať inštalačný adresár, vytvára skratky na pracovnej ploche a v ponuke Štart.

## Balená zostava na testovanie dymu

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automaticky objaví zabalený binárny súbor v `electron/dist-electron/` pre aktuálnu platformu.
- Spúšťa sa s izolovanými adresármi `HOME`/`APPDATA`/`XDG_*`, takže sa nedotýka údajov vývojárov.
- Ankety `http://127.0.0.1:20128/login` za 200 HTTP do 45 s.
- Hodinky stderr/stdout pre fatálne vzory (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` atď.).
- Po pripravenosti čaká 2 s stabilného runtime, potom vydá SIGTERM a čaká na uvoľnenie portu.
- V CI automaticky prechádza `--no-sandbox --disable-gpu` (a `--disable-dev-shm-usage` na Linux).

Env prepíše: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Podpisovanie kódu

`electron/package.json` robí** nie** prihlasovacie údaje priamo na drôt. Odovzdajte ich cez env vars do `electron-builder`:

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

Podpisovanie AppImage je pri podpisovaní voliteľné. — nastavte `LINUX_GPG_KEY`.

## Distribúcia

Artefakty pristávajú v `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Vydania sú publikované v GitHub Releases (`diegosouzapw/OmniRoute`), kde `electron-updater` tiež kontroluje nové verzie.

## Riešenie problémov

| Symptóm                                                        | Opraviť                                                                                                                                                                          |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` po Electron hlavný náraz | better-sqlite3 v13 dodáva predzostavenia rozhrania Node-API — znovu spustite `npm install` v koreňovom adresári a `prepare:bundle` (overí predzostavenie pre aktuálnu platformu) |
| `ERR_DLOPEN_FAILED` pre natívny modul                          | Znova spustite `prepare:bundle` — rýchlo zlyhá, keď chýba predzostavenie rozhrania Node-API pre aktuálnu platformu                                                               |
| Okno na Linux je prázdne                                       | Potvrďte Next.js server skutočne viazaný na PORT (skontrolujte denníky `[Server]` )                                                                                              |
| macOS notárske stánky                                          | Uistite sa, že `APPLE_*` vars sa exportujú, nielen v `.env`                                                                                                                      |
| varovanie Windows SmartScreen                                  | Prihláste sa pomocou certifikátu EV alebo používatelia kliknite pravým tlačidlom myši → „Aj tak spustiť“                                                                         |
| Test dymu zlyhá pri používaní portu                            | Pred spustením `electron:smoke:packaged` zastavte akýkoľvek lokálny dev server v roku 20128                                                                                      |

## Pozri tiež

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Zdroj: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pomocníci: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
