# Electron Desktop Guide (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Izvor istine:** `electron/` radni prostor** Zadnje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute isporučuje višeplatformsku aplikaciju za stolna računala (Windows / macOS / Linux) izgrađenu na**Electron 41** +** elektron-graditelj 26.10** . Aplikacija za radnu površinu stvara Next.js samostalni poslužitelj kao podređeni proces, usmjerava `BrowserWindow` na njega i dodaje sistemsku traku, automatsko ažuriranje, IPC most i tajni bootstrap bez konfiguracije.

## Arhitektura

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

## Verzije

Potvrđeno od `electron/package.json`:

| Paket              | Verzija                                                         |
| ------------------ | --------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                       |
| `electron-builder` | `^26.15.3`                                                      |
| `electron-updater` | `^6.8.9`                                                        |
| `better-sqlite3`   | root `^13.0.2` (Node-API unaprijed gradi — no Electron rebuild) |
| Verzija aplikacije | `3.8.0`                                                         |
| ID aplikacije      | `online.omniroute.desktop`                                      |
| Naziv proizvoda    | `OmniRoute`                                                     |

## Skripte (root `package.json`)

| Skripta                           | Svrha                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Pokreće `npm run dev` + čeka `localhost:20128` + pokreće Electron                  |
| `npm run electron:build`          | Gradi Next.js zatim pokreće `electron-builder` za trenutni OS                      |
| `npm run electron:build:win`      | Gradi Windows NSIS instalater + prijenosni (x64)                                   |
| `npm run electron:build:mac`      | Gradi macOS DMG (Intel + Apple Silicon)                                            |
| `npm run electron:build:linux`    | Gradi Linux AppImage + DEB (x64 + arm64)                                           |
| `npm run electron:smoke:packaged` | Pokreće pakiranu binarnu datoteku i ispituje `/login` za HTTP 200, a zatim se gasi |

Radni prostor `electron/` također izlaže:

- `npm run prepare:bundle` — pokreće `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — jednolučne macOS građe
- `npm run pack` — verzija samo za direktorij za lokalno testiranje (bez programa za instalaciju)

## Dodatni runtime paketi

Gradnje stolnih računala mogu objaviti izborne arhive vremena izvođenja uz svoje programe za instalaciju. Instalirani teret poslužitelja sadrži `optional-packs.index.json` (pod `resources/app` na Windows i Linux). Za unos `browser-runtime` pročitajte `packs[].tarball` i preuzmite** točan naziv datoteke iz istog izdanja** . Imena arhiva uključuju SHA-256 sažetak; različite verzije mogu zahtijevati različite arhive. Neka naziv preuzete datoteke ostane nepromijenjen.

Kopirajte indeks instalirane aplikacije i odabranu arhivu u jedan direktorij, zatim upotrijebite CLI iz istog izdanja:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` prikazuje stanje instalacije i provjere, a ne naziv datoteke arhive. Indeks u paketu odabire arhivu. Instalacija provjerava kontrolni zbroj arhive prije izdvajanja i kontrolni zbroj paketa prije zamjene instaliranog paketa. Čita lokalne datoteke; ne preuzima arhive koje nedostaju. Ponovno pokrenite aplikaciju nakon instalacije. Ako izdanje nema odgovarajuće sredstvo, izborni paket nije dostupan putem sredstava tog izdanja.

## Izgled imenika

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

I `main.js` i `preload.js` su**CommonJS `.js` datoteke** , ne TypeScript. Upisi na strani iscrtivača žive u `electron/types.d.ts`.

## IPC (`preload.js`)

Predučitavanje izlaže API s popisa dopuštenih na `window.electronAPI` koristeći `contextBridge` sa `contextIsolation: true` i `nodeIntegration: false`.

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

Izložene metode:

| Poziv renderera                                                   | Tip                     |
| ----------------------------------------------------------------- | ----------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | prizivati               |
| `openExternal(url)`                                               | prizivati               |
| `getDataDir()`                                                    | prizivati               |
| `restartServer()`                                                 | prizivati               |
| `getAppVersion()`                                                 | prizivati               |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | prizivati               |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | poslati                 |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | primati (odlagač vraća) |

Pomoćnici primanja vraćaju se a** disposer funkcija** umjesto oslanjanja na `removeAllListeners` — ovo sprječava gomilanje slušatelja kada React komponente ponovno montirate.

## Životni ciklus poslužitelja

`main.js` rađa Next.js samostalni paket izravno sa Electron čvorom za izvođenje kako bi se izbjegla neusklađenost izvornog modula ABI sa sistemskim čvorom:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Izdvajamo:

- `waitForServer()` provjerava URL do 30 s prije prikazivanja prozora (nema praznog ekrana pri hladnom pokretanju).
- `stdio: "pipe"` hvata stdout/stderr; spremni izrazi (`Ready` / `listening`) emitiraju `server-status: running` preko IPC.
- `before-quit` čeka do 5 s za graciozni SIGTERM (kontrolna točka WAL ) zatim šalje SIGKILL.
- Prebacivač priključaka u ladici (`20128`, `3000`, `8080`) zaustavlja i ponovno pokreće poslužitelj, a zatim ponovno učitava BrowserWindow.

## Zero-config Secret Bootstrap

Pri prvom pokretanju, glavni proces automatski generira i održava nedostajuće tajne:

| Tajna                    | Izvor                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                 |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (odbija ako već postoje šifrirane vjerodajnice) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                 |

Ustrajao na `<DATA_DIR>/server.env`. `DATA_DIR` rješava na:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ili `~/.omniroute`
- macOS: `~/.omniroute`

## Traženje datoteke okruženja

Prije pokretanja poslužitelja, glavni proces (`getPreferredEnvFilePath()` u `electron/main.js`) bira** jedan** `.env` datoteka: prva od ovih koja postoji.

1. `$DATA_DIR/.env`, kada je `DATA_DIR` postavljen u okruženju s kojim je aplikacija pokrenuta.
2. `<resolved DATA_DIR>/.env`, koristeći iste zadane vrijednosti kao gore: `%APPDATA%\omniroute\.env` na Windows, `$XDG_CONFIG_HOME/omniroute/.env` ili `~/.omniroute/.env` na Linux i macOS.
3. `.env` u radnom direktoriju procesa.

Glavni proces čita samo tu datoteku; kasniji kandidati se ne spajaju. Poslužiteljsko okruženje se zatim gradi s ovim prioritetom (najviši prvi):

1. Okruženje procesa Electron (varijable naslijeđene od onoga što je pokrenulo aplikaciju).
2. Odabrana `.env` datoteka.
3. `<DATA_DIR>/server.env` (gornje tajne bootstrapa).

Okruženje procesa bilježi se kada se aplikacija pokrene, tako da varijabla okruženja sustava ili korisnika postavljena dok je aplikacija pokrenuta (uključujući dok stoji u ladici nakon zatvaranja prozora) ne dolazi do poslužitelja dok se aplikacija u potpunosti ne zatvori i ponovno pokrene. Za runtime gumbe kao što je `CONTEXT_LENGTH_<PROVIDER>` (pogledajte [Varijable okruženja: Duljina konteksta po pružatelju](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), preferirajte `.env` datoteku, a zatim potpuno zatvorite (ladica,** Prestati** ) i ponovno pokrenite.

## Prozor i pladanj

- `BrowserWindow`: 1400 × 900 (min. 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, semafor na `{ x: 16, y: 16 }`.
- Windows/Linux: matična naslovna traka.
- Gumb za zatvaranje minimizira na ladicu; tray izbornik ima** Otvori OmniRoute** ,** Otvori nadzornu ploču** (vanjski preglednik),** Port poslužitelja** podizbornik,** Provjerite ima li ažuriranja** ,** Prestati** .

## Politika sigurnosti sadržaja

Postavite putem `session.defaultSession.webRequest.onHeadersReceived`. Značajne direktive:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev način rada dodaje samo `'unsafe-eval'` u `script-src`

## Automatsko ažuriranje

Koristi `electron-updater` s pružateljem GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Događaji proslijeđeni rendereru putem `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (sa `percent`), `downloaded`, `error`
- `installUpdate()` ubija poslužitelj i zatim poziva `autoUpdater.quitAndInstall()`
- Preskočeno u razvojnom načinu rada (`!app.isPackaged`)

## Izgradite cjevovod

1. `npm run build` → Next.js samostalan u `.next/standalone`.
2. `prepare-electron-standalone.mjs` → ponovno postavlja u `.next/electron-standalone` i prepisuje apsolutne putanje unutar `server.js` + `required-server-files.json` tako da se paket može premjestiti.
3. `electron-builder` paketi `main.js`, `preload.js`, `node_modules` i `extraResources: { ../.next/electron-standalone → app }`.

### Izgradite ciljeve

| OS      | Mete                                          |
| ------- | --------------------------------------------- |
| Windows | NSIS instalacijski program + prijenosni (x64) |
| macOS   | DMG (Intel + arm64, povuci u aplikacije)      |
| Linux   | AppImage + DEB (x64 + arm64)                  |

NSIS postavke: `oneClick: false`, omogućuje korisniku odabir direktorija za instalaciju, stvara prečace na radnoj površini i izborniku Start.

## Ispitivanje dima pakirane građe

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automatski otkriva pakiranu binarnu datoteku u `electron/dist-electron/` za trenutnu platformu.
- Pokreće se s izoliranim direktorijima `HOME`/`APPDATA`/`XDG_*` tako da ne dodiruje podatke programera.
- Ankete `http://127.0.0.1:20128/login` za HTTP 200 unutar 45 s.
- Promatra stderr/stdout za fatalne uzorke (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, itd.).
- Čeka 2 s stabilnog vremena rada nakon spremnosti, zatim izdaje SIGTERM i čeka da se port oslobodi.
- U CI automatski prolazi `--no-sandbox --disable-gpu` (i `--disable-dev-shm-usage` na Linux).

Env nadjačava: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Potpisivanje koda

`electron/package.json` radi** ne** izravno potpisivanje vjerodajnica. Proslijedite ih putem env vars u `electron-builder`:

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

AppImage potpisivanje je izborno — postavi `LINUX_GPG_KEY` ako je potpisivanje.

## Distribucija

Artefakti slijeću u `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Izdanja se objavljuju u GitHub izdanjima (`diegosouzapw/OmniRoute`), gdje `electron-updater` također provjerava nove verzije.

## Rješavanje problema

| Simptom                                                           | Popraviti                                                                                                                                                             |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` nakon Electron velika kvrga | better-sqlite3 v13 isporučuje predizgradnje Node-API — ponovno pokrenite `npm install` u korijenu i `prepare:bundle` (provjerava predizgradnju za trenutnu platformu) |
| `ERR_DLOPEN_FAILED` za izvorni modul                              | Ponovno pokrenite `prepare:bundle` — brzo pada ako nedostaje predizgradnja Node-API-ja za trenutnu platformu                                                          |
| Prozor se pojavljuje prazan na Linux                              | Potvrdite da je Next.js poslužitelj stvarno povezan sa PORT (provjerite `[Server]` zapise)                                                                            |
| macOS ovjera staje                                                | Osigurajte da se `APPLE_*` vars izvoze, a ne samo u `.env`                                                                                                            |
| Windows SmartScreen upozorenje                                    | Potpišite se pomoću EV certifikata ili korisnici desnom tipkom miša kliknu → "Svejedno pokreni"                                                                       |
| Test dima ne uspijeva s priključkom u uporabi                     | Zaustavite bilo koji lokalni razvojni poslužitelj na 20128 prije pokretanja `electron:smoke:packaged`                                                                 |

## Vidi također

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Izvor: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pomoćnici: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
