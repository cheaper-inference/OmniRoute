# Electron Desktop Guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Izvor istine:** `electron/` radni prostor** Posljednje ažurirano:** 2026-06-28 — v3.8.40

OmniRoute isporučuje višeplatformsku desktop aplikaciju (Windows / macOS / Linux) izgrađenu na**Electron 41** +** graditelj elektrona 26.10** . Desktop aplikacija pokreće Next.js samostalni server kao podređeni proces, usmjerava `BrowserWindow` na njega i dodaje sistemsku traku, automatski ažuriranje, IPC most i tajni bootstrap sa nultom konfiguracijom.

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

| Paket              | Verzija                                                          |
| ------------------ | ---------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                        |
| `electron-builder` | `^26.15.3`                                                       |
| `electron-updater` | `^6.8.9`                                                         |
| `better-sqlite3`   | root `^13.0.2` (Node-API unaprijed gradi — bez Electron rebuild) |
| Verzija aplikacije | `3.8.0`                                                          |
| ID aplikacije      | `online.omniroute.desktop`                                       |
| Naziv proizvoda    | `OmniRoute`                                                      |

## Skripte (root `package.json`)

| Skripta                           | Svrha                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Pokreće `npm run dev` + čeka `localhost:20128` + pokreće Electron                     |
| `npm run electron:build`          | Gradi Next.js zatim pokreće `electron-builder` za trenutni OS                         |
| `npm run electron:build:win`      | Izrađuje Windows NSIS instalater + portable (x64)                                     |
| `npm run electron:build:mac`      | Izrađuje macOS DMG (Intel + Apple Silicon)                                            |
| `npm run electron:build:linux`    | Gradi Linux AppImage + DEB (x64 + arm64)                                              |
| `npm run electron:smoke:packaged` | Pokreće upakovanu binarnu datoteku i provjerava `/login` za HTTP 200, a zatim se gasi |

`electron/` radni prostor također izlaže:

- `npm run prepare:bundle` — pokreće `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — jednolučne macOS grade
- `npm run pack` — verzija samo za direktorij za lokalno testiranje (bez instalatera)

## Opcioni runtime paketi

Desktop verzije mogu objaviti opcionalne arhive vremena izvršavanja zajedno sa svojim instalaterima. Instalirani server sadrži `optional-packs.index.json` (pod `resources/app` na Windows i Linux). Za unos `browser-runtime` pročitajte `packs[].tarball` i preuzmite** taj tačan naziv datoteke iz istog izdanja** . Imena arhiva uključuju SHA-256 sažetak; različite gradnje mogu zahtijevati različite arhive. Neka preuzeto ime datoteke ostane nepromijenjeno.

Kopirajte indeks instalirane aplikacije i odabranu arhivu u jedan direktorij, a zatim koristite CLI iz istog izdanja:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` prikazuje stanje instalacije i verifikacije, a ne ime arhivske datoteke. Uvezani indeks odabire arhivu. Instalacija provjerava kontrolnu sumu arhive prije ekstrakcije i kontrolnu sumu svog paketa prije zamjene instaliranog paketa. Čita lokalne datoteke; ne preuzima arhive koje nedostaju. Ponovo pokrenite aplikaciju nakon instalacije. Ako izdanje nema odgovarajući materijal, opcijski paket nije dostupan kroz sredstva tog izdanja.

## Izgled direktorija

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

`main.js` i `preload.js` su**CommonJS `.js` fajlovi** , ne TypeScript. Tipovi na strani renderera žive u `electron/types.d.ts`.

## IPC most (`preload.js`)

Predučitavanje izlaže API na bijeloj listi na `window.electronAPI` koristeći `contextBridge` sa `contextIsolation: true` i `nodeIntegration: false`.

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

| Poziv renderera                                                   | Tip                      |
| ----------------------------------------------------------------- | ------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                   |
| `openExternal(url)`                                               | invoke                   |
| `getDataDir()`                                                    | invoke                   |
| `restartServer()`                                                 | invoke                   |
| `getAppVersion()`                                                 | invoke                   |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                   |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | poslati                  |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | primiti (vraća disposer) |

Primaoci vraćaju a** funkcija disposera** umjesto oslanjanja na `removeAllListeners` — ovo sprječava akumulaciju slušatelja kada se React komponente ponovo montiraju.

## Životni ciklus servera

`main.js` pokreće Next.js samostalni paket direktno sa Electron Node runtime-om kako bi se izbjeglo neslaganje ABI izvornog modula sa sistemskim čvorom:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Izdvajamo:

- `waitForServer()` anketira URL do 30 s prije nego što prikaže prozor (nema praznog ekrana pri hladnom startu).
- `stdio: "pipe"` hvata stdout/stderr; spremne fraze (`Ready` / `listening`) emituju `server-status: running` preko IPC.
- `before-quit` čeka do 5 s za graciozan SIGTERM (WAL kontrolna tačka) zatim šalje SIGKILL.
- Prebacivač portova u tray-u (`20128`, `3000`, `8080`) zaustavlja i ponovo pokreće server, a zatim ponovo učitava BrowserWindow.

## Tajni bootstrap sa nultom konfiguracijom

Prilikom prvog pokretanja, glavni proces automatski generiše i zadržava tajne koje nedostaju:

| Tajna                    | Izvor                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                            |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (odbija ako šifrirani krediti već postoje) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                            |

Ustrajao na `<DATA_DIR>/server.env`. `DATA_DIR` rješava na:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ili `~/.omniroute`
- macOS: `~/.omniroute`

## Pronalaženje datoteke okruženja

Prije pokretanja servera, glavni proces (`getPreferredEnvFilePath()` u `electron/main.js`) bira** jedan** `.env` datoteka: prva od ovih koja postoji.

1. `$DATA_DIR/.env`, kada je `DATA_DIR` postavljen u okruženju s kojim je aplikacija pokrenuta.
2. `<resolved DATA_DIR>/.env`, koristeći iste zadane postavke kao gore: `%APPDATA%\omniroute\.env` na Windows, `$XDG_CONFIG_HOME/omniroute/.env` ili `~/.omniroute/.env` na Linux i macOS.
3. `.env` u radnom direktoriju procesa.

Glavni proces čita samo tu datoteku; kasniji kandidati se ne spajaju. Serversko okruženje se tada gradi sa ovim prioritetom (prvo najviše):

1. Electron procesno okruženje (varijable naslijeđene od onoga što je pokrenulo aplikaciju).
2. Odabrana `.env` datoteka.
3. `<DATA_DIR>/server.env` (gore tajne za pokretanje).

Procesno okruženje se snima kada se aplikacija pokrene, tako da varijabla sistemskog ili korisničkog okruženja postavljena dok je aplikacija pokrenuta (uključujući i dok se nalazi u traci nakon što je prozor zatvoren) ne stiže do servera dok se aplikacija potpuno ne zatvori i ponovo pokrene. Za dugmad za vrijeme izvođenja kao što je `CONTEXT_LENGTH_<PROVIDER>` (pogledajte [Varijable okruženja: dužina konteksta po dobavljaču](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), preferirajte `.env` datoteku, a zatim potpuno zatvorite (tray,** Prestani** ) i ponovo pokrenuti.

## Prozor i ležište

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, semafor na `{ x: 16, y: 16 }`.
- Windows/Linux: izvorna naslovna traka.
- Dugme za zatvaranje se minimizira u ležište; Tray meni ima** Otvori OmniRoute** ,** Otvorite Dashboard** (vanjski pretraživač),** Port servera** podmeni,** Provjerite ima li ažuriranja** ,** Prestani** .

## Politika sigurnosti sadržaja

Postavljeno preko `session.defaultSession.webRequest.onHeadersReceived`. Značajne direktive:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev mod dodaje `'unsafe-eval'` samo u `script-src`

## Automatsko ažuriranje

Koristi `electron-updater` sa GitHub provajderom (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Događaji se prosljeđuju rendereru preko `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (sa `percent`), `downloaded`, `error`
- `installUpdate()` ubija server, a zatim poziva `autoUpdater.quitAndInstall()`
- Preskočeno u dev modu (`!app.isPackaged`)

## Build Pipeline

1. `npm run build` → Next.js samostalno u `.next/standalone`.
2. `prepare-electron-standalone.mjs` → ponovo stupa u `.next/electron-standalone` i prepisuje apsolutne putanje unutar `server.js` + `required-server-files.json` tako da se paket može premjestiti.
3. `electron-builder` paketi `main.js`, `preload.js`, `node_modules` i `extraResources: { ../.next/electron-standalone → app }`.

### Izgradite mete

| OS      | Ciljevi                                      |
| ------- | -------------------------------------------- |
| Windows | NSIS installer + portable (x64)              |
| macOS   | DMG (Intel + arm64, prevucite na aplikacije) |
| Linux   | AppImage + DEB (x64 + arm64)                 |

NSIS postavke: `oneClick: false`, omogućava korisniku da odabere direktorij za instalaciju, kreira prečice na radnoj površini i Start-Menu.

## Upakovana verzija za testiranje dima

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automatski otkriva upakovanu binarnu datoteku u `electron/dist-electron/` za trenutnu platformu.
- Pokreće se sa izolovanim direktorijumima `HOME`/`APPDATA`/`XDG_*` tako da ne dodiruje podatke programera.
- Ankete `http://127.0.0.1:20128/login` za HTTP 200 u roku od 45 s.
- Gleda stderr/stdout za fatalne obrasce (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, itd.).
- Čeka 2 s stabilnog vremena rada nakon spremnosti, zatim izdaje SIGTERM i čeka da se port oslobodi.
- U CI, automatski prosljeđuje `--no-sandbox --disable-gpu` (i `--disable-dev-shm-usage` na Linux).

Env nadjačava: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Potpisivanje koda

`electron/package.json` radi** ne** direktno potpisivanje akreditiva. Proslijedite ih preko env vars u `electron-builder`:

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

AppImage potpisivanje je opciono — set `LINUX_GPG_KEY` ako potpisuje.

## Distribucija

Artefakti slijeću u `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Izdanja se objavljuju u GitHub izdanjima (`diegosouzapw/OmniRoute`), gdje `electron-updater` također provjerava nove verzije.

## Rješavanje problema

| Simptom                                                            | Fix                                                                                                                                                         |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` nakon Electron velike udarce | better-sqlite3 v13 isporučuje Node-API prebuilds — ponovo pokrenite `npm install` u korijenu i `prepare:bundle` (provjerava prebuild za trenutnu platformu) |
| `ERR_DLOPEN_FAILED` za izvorni modul                               | Ponovo pokrenite `prepare:bundle` — brzo ne uspijeva kada nedostaje Node-API prebuild za trenutnu platformu                                                 |
| Prozor je prazan na Linux                                          | Potvrdite Next.js server stvarno vezan za PORT (provjerite `[Server]` dnevnike)                                                                             |
| macOS tezge za ovjeru                                              | Osigurajte da se `APPLE_*` vars izvoze, ne samo u `.env`                                                                                                    |
| Windows SmartScreen upozorenje                                     | Potpišite se sa EV certifikatom ili korisnici desnim klikom na → "Pokreni svejedno"                                                                         |
| Test dima nije uspio s priključkom u upotrebi                      | Zaustavite bilo koji lokalni dev server na 20128 prije pokretanja `electron:smoke:packaged`                                                                 |

## Vidi također

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Izvor: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pomagači: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
