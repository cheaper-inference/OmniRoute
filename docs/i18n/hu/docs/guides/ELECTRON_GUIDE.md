# Electron Desktop Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Az igazság forrása:** `electron/` munkaterület** Utolsó frissítés:** 2026-06-28 — v3.8.40

OmniRoute egy többplatformos asztali alkalmazást (Windows / macOS / Linux) szállít, amelyre épül**Electron 41** +** elektronépítő 26.10** . Az asztali alkalmazás a Next.js önálló kiszolgálót gyermekfolyamatként hozza létre, egy `BrowserWindow` mutat rá, és hozzáad egy rendszertálcát, automatikus frissítőt, IPC hidat és nulla konfigurációs titkos rendszerindítót.

## Építészet

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

## Verziók

`electron/package.json` ból megerősítve:

| Csomag                 | Változat                                                          |
| ---------------------- | ----------------------------------------------------------------- |
| `electron`             | `^43.4.1`                                                         |
| `electron-builder`     | `^26.15.3`                                                        |
| `electron-updater`     | `^6.8.9`                                                          |
| `better-sqlite3`       | root `^13.0.2` (Node-API előre építi — nincs Electron újraépítés) |
| Az alkalmazás verziója | `3.8.0`                                                           |
| Alkalmazásazonosító    | `online.omniroute.desktop`                                        |
| Termék neve            | `OmniRoute`                                                       |

## Szkriptek (root `package.json`)

| Forgatókönyv                      | Cél                                                                                    |
| --------------------------------- | -------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Elindítja `npm run dev` + vár `localhost:20128` + elindítja Electron                   |
| `npm run electron:build`          | Összeállítja Next.js majd futtatja `electron-builder` az aktuális OS                   |
| `npm run electron:build:win`      | Összeállítja Windows NSIS telepítőt, + portablet (x64)                                 |
| `npm run electron:build:mac`      | macOS DMG épít (Intel + Apple Silicon)                                                 |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) épít                                                |
| `npm run electron:smoke:packaged` | Elindítja a csomagolt bináris fájlt, és megvizsgálja `/login` HTTP 200-hoz, majd leáll |

A `electron/` munkaterületen a következők is láthatók:

- `npm run prepare:bundle` — futtatja `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — egyíves macOS buildek
- `npm run pack` — csak könyvtári build helyi teszteléshez (nincs telepítő)

## Opcionális futásidejű csomagok

Az asztali buildek opcionális futásidejű archívumokat is közzétehetnek a telepítőik mellett. A telepített szerver hasznos adattartalma `optional-packs.index.json` tartalmaz ( `resources/app` alatt Windows és Linux esetén). A `browser-runtime` bejegyzéshez olvassa el `packs[].tarball` és töltse le** a pontos fájlnév ugyanabból a kiadásból** . Az archívum nevek között szerepel egy SHA-256 kivonat; a különböző összeállításokhoz különböző archívumok szükségesek. A letöltött fájl nevét ne változtassa meg.

Másolja a telepített alkalmazás indexét és a kiválasztott archívumot egy könyvtárba, majd használja a CLI ugyanabból a kiadásból:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` a telepítési és ellenőrzési állapotot jeleníti meg, nem az archívum fájlnevét. A kötegelt index kiválasztja az archívumot. A telepítés ellenőrzi az archívum ellenőrző összegét a kibontás előtt és a csomag ellenőrző összegét a telepített csomag cseréje előtt. Helyi fájlokat olvas; nem tölti le a hiányzó archívumokat. A telepítés után indítsa újra az alkalmazást. Ha a kiadásnak nincs megfelelő eleme, akkor az opcionális csomag nem érhető el az adott kiadás eszközein keresztül.

## Könyvtár elrendezése

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

`main.js` és `preload.js` is az**CommonJS `.js` fájlokat** , nem TypeScript. A renderer-oldali gépelések `electron/types.d.ts`-ben élnek.

## IPC híd (`preload.js`)

Az előtöltés egy engedélyezőlistán szereplő API tesz közzé a `window.electronAPI` -n a `contextBridge` `contextIsolation: true` és `nodeIntegration: false` használatával.

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

Kitett módszerek:

| Renderelő hívás                                                   | Írja be                              |
| ----------------------------------------------------------------- | ------------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | hivatkozni                           |
| `openExternal(url)`                                               | hivatkozni                           |
| `getDataDir()`                                                    | hivatkozni                           |
| `restartServer()`                                                 | hivatkozni                           |
| `getAppVersion()`                                                 | hivatkozni                           |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | hivatkozni                           |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | elküld                               |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | fogadni (visszaküldi ártalmatlanító) |

A fogadó segítők visszaküldik a** ártalmatlanító funkció** Ahelyett, hogy `removeAllListeners` — -re hagyatkozna, ez megakadályozza a hallgatók felhalmozódását React komponensek visszacsatolásakor.

## Szerver életciklusa

`main.js` a Next.js önálló csomagot közvetlenül a Electron Node futási környezettel hozza létre, hogy elkerülje a natív modul ABI a rendszercsomópont közötti eltérést:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Fénypontok:

- `waitForServer()` az ablak megjelenítése előtt 30 másodpercig lekérdezi a URL (hidegindításkor nincs üres képernyő).
- `stdio: "pipe"` rögzíti stdout/stderr; kész kifejezések (`Ready` / `listening`) `server-status: running` bocsátanak ki IPC felett .
- `before-quit` legfeljebb 5 másodpercet vár a kecses SIGTERM -re (WAL checkpoint), majd elküldi SIGKILL.
- A tálcán lévő portváltó (`20128`, `3000`, `8080`) leállítja és újraindítja a szervert, majd újratölti a BrowserWindow.

## Zero-config Secret Bootstrap

Az első indításkor a fő folyamat automatikusan generálódik, és a hiányzó titkok továbbra is megmaradnak:

| Titkos                   | Forrás                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                         |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (megtagadja, ha már léteznek titkosított hitelesítések) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                         |

Kitartott `<DATA_DIR>/server.env`-ig. `DATA_DIR` a következőt oldja meg:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` vagy `~/.omniroute`
- macOS: `~/.omniroute`

## Környezeti fájl keresése

A szerver létrehozása előtt a fő folyamat (`getPreferredEnvFilePath()` a `electron/main.js`-ben) választ** egy** `.env` fájl: ezek közül az első létező.

1. `$DATA_DIR/.env`, ha `DATA_DIR` van állítva abban a környezetben, amellyel az alkalmazás elindult.
2. `<resolved DATA_DIR>/.env`, ugyanazokkal az alapértelmezésekkel, mint fent: `%APPDATA%\omniroute\.env` a Windows n, `$XDG_CONFIG_HOME/omniroute/.env` vagy `~/.omniroute/.env` Linux en és macOS.
3. `.env` a folyamat munkakönyvtárában.

A fő folyamat csak azt a fájlt olvassa be; A későbbi jelöltek nem egyesülnek. A szerverkörnyezet ezután ezzel az elsőbbséggel épül fel (a legmagasabb először):

1. A Electron folyamatkörnyezet (az alkalmazás elindítóitól örökölt változók).
2. A kiválasztott `.env` fájl.
3. `<DATA_DIR>/server.env` (a fenti rendszerindító titkok).

A folyamatkörnyezet az alkalmazás indításakor kerül rögzítésre, így az alkalmazás futása közben beállított rendszer- vagy felhasználói környezeti változó (beleértve azt is, amikor az ablak bezárása után a tálcán van) addig nem éri el a szervert, amíg az alkalmazást teljesen ki nem zárják és újra nem indítják. A futásidejű potméterek, például `CONTEXT_LENGTH_<PROVIDER>` (lásd [: Környezeti változók: szolgáltatónkénti kontextushossz](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ) esetén előnyben részesítse a `.env` fájlt, majd teljesen lépjen ki (tálca,** Kilép** ) és indítsa újra.

## Ablak és tálca

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, közlekedési lámpa a `{ x: 16, y: 16 }`-nél.
- Windows/Linux: natív címsor.
- A bezárás gomb lekicsinyíti a tálcát; a tálca menüben van** Nyissa meg OmniRoute** ,** Nyissa meg az Irányítópultot** (külső böngésző),** Szerver port** almenü,** Ellenőrizze a frissítéseket** ,** Kilép** .

## Tartalombiztonsági szabályzat

Beállítás `session.defaultSession.webRequest.onHeadersReceived` keresztül. Figyelemre méltó irányelvek:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- A fejlesztői mód csak `'unsafe-eval'` adja hozzá `script-src` hez

## Automatikus frissítés

`electron-updater` használja a GitHub szolgáltatóval (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- `update-status` IPC keresztül a megjelenítőhöz továbbított események: `checking`, `available`, `not-available`, `downloading` ( `percent`), `downloaded`, `error`
- `installUpdate()` megöli a szervert, majd meghívja `autoUpdater.quitAndInstall()`
- Kihagyva fejlesztői módban (`!app.isPackaged`)

## Csővezeték építése

1. `npm run build` → Next.js önálló a `.next/standalone`.
2. `prepare-electron-standalone.mjs` → átlép `.next/electron-standalone` -be, és átírja az abszolút útvonalakat `server.js` + `required-server-files.json` belül, így a köteg áthelyezhető.
3. `electron-builder` csomagok `main.js`, `preload.js`, `node_modules` és `extraResources: { ../.next/electron-standalone → app }`.

### Építsen célokat

| OS      | Célok                                     |
| ------- | ----------------------------------------- |
| Windows | NSIS telepítő + hordozható (x64)          |
| macOS   | DMG (Intel + arm64, drag-to-Applications) |
| Linux   | AppImage + DEB (x64 + arm64)              |

NSIS beállítások: `oneClick: false`, lehetővé teszi a felhasználó számára a telepítési könyvtár kiválasztását, létrehozza az Asztal és a Start menü parancsikonjait.

## Füstvizsgálati csomagolt összeállítás

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automatikusan felfedezi a csomagolt bináris fájlt `electron/dist-electron/` ban az aktuális platformhoz.
- Elszigetelt `HOME`/`APPDATA`/`XDG_*` könyvtárakkal indul, így nem érinti a fejlesztői adatokat.
- `http://127.0.0.1:20128/login` szavazás HTTP 200-hoz 45 másodpercen belül.
- A stderr/stdout órák végzetes minták esetén (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` stb.).
- A készenlét után vár 2 másodpercet a stabil futásidőre, majd kiadja SIGTERM, és megvárja a port felszabadulását.
- CI-ban automatikusan átadja `--no-sandbox --disable-gpu` (és `--disable-dev-shm-usage` Linux).

Env felülbírálása: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kód aláírása

`electron/package.json` igen** nem** vezetékes aláíró hitelesítő adatok közvetlenül. Adja át őket az env vars-on keresztül a `electron-builder`:

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

AppImage aláírás nem kötelező, ha aláírja, — beállítása `LINUX_GPG_KEY`.

## Elosztás

Leletek landolnak `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

A kiadásokat GitHub Releases (`diegosouzapw/OmniRoute`) közzéteszi, ahol `electron-updater` is keresi az új verziókat.

## Hibaelhárítás

| Tünet                                                         | Fix                                                                                                                                                              |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` Electron nagy ütés után | better-sqlite3 v13 szállítja a Node-API előépítéseit, — futtassa újra `npm install` a gyökérben és `prepare:bundle` (ellenőrzi az aktuális platform előépítését) |
| `ERR_DLOPEN_FAILED` a natív modulhoz                          | Futtassa újra `prepare:bundle` — gyorsan meghibásodik, ha az aktuális platform csomópont-API előépítése hiányzik                                                 |
| Az ablak üresen jelenik meg a Linux                           | Erősítse meg, hogy Next.js szerver valóban hozzá van kötve PORT (ellenőrizze `[Server]` naplókat)                                                                |
| macOS közjegyzői standok                                      | Győződjön meg arról, hogy `APPLE_*` vars exportálásra kerül, nem csak `.env` ben                                                                                 |
| Windows SmartScreen figyelmeztetés                            | Jelentkezzen be EV tanúsítvánnyal, vagy kattintson a jobb gombbal → "Futtatás mindenképpen" lehetőségre.                                                         |
| A füstteszt sikertelen a használatban lévő portnál            | `electron:smoke:packaged` futtatása előtt állítson le minden helyi fejlesztői kiszolgálót 20128-on                                                               |

## Lásd még

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Forrás: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Segítők: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
