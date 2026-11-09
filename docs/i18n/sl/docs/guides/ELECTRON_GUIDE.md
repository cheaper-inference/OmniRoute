# Electron Desktop Guide (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Vir resnice:** delovni prostor `electron/`** Zadnja posodobitev:** 2026-06-28 — v3.8.40

OmniRoute pošilja namizno aplikacijo za več platform (Windows / macOS / Linux), zgrajeno na**Electron 41** +** elektron-graditelj 26.10** . Namizna aplikacija ustvari samostojni strežnik Next.js kot podrejeni proces, nanj usmeri `BrowserWindow` in doda sistemsko vrstico, samodejno posodabljanje, most IPC in skrivni zagon z ničelno konfiguracijo.

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

## Različice

Potrjeno z `electron/package.json`:

| Paket                | Različica                                                                    |
| -------------------- | ---------------------------------------------------------------------------- |
| `electron`           | `^43.4.1`                                                                    |
| `electron-builder`   | `^26.15.3`                                                                   |
| `electron-updater`   | `^6.8.9`                                                                     |
| `better-sqlite3`     | root `^13.0.2` (Node-API vnaprej zgradi — brez vnovične izgradnje Electron ) |
| Različica aplikacije | `3.8.0`                                                                      |
| ID aplikacije        | `online.omniroute.desktop`                                                   |
| Ime izdelka          | `OmniRoute`                                                                  |

## Skripti (koren `package.json`)

| Skripta                           | Namen                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Zažene `npm run dev` + čaka na `localhost:20128` + zažene Electron                      |
| `npm run electron:build`          | Zgradi Next.js in nato zažene `electron-builder` za trenutni OS                         |
| `npm run electron:build:win`      | Zgradi namestitveni program Windows NSIS + portable (x64)                               |
| `npm run electron:build:mac`      | Gradi macOS DMG (Intel + Apple Silicon)                                                 |
| `npm run electron:build:linux`    | Zgradi Linux AppImage + DEB (x64 + arm64)                                               |
| `npm run electron:smoke:packaged` | Zažene paketno dvojiško datoteko in preizkusi `/login` za HTTP 200, nato pa se zaustavi |

Delovni prostor `electron/` izpostavlja tudi:

- `npm run prepare:bundle` — izvaja `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — zgradbe z enim lokom macOS
- `npm run pack` — samo imenik gradnje za lokalno testiranje (brez namestitvenega programa)

## Izbirni izvajalni paketi

Graditve namizja lahko poleg svojih namestitvenih programov objavijo izbirne arhive izvajalnega okolja. Koristni tovor nameščenega strežnika vsebuje `optional-packs.index.json` (pod `resources/app` na Windows in Linux). Za vnos `browser-runtime` preberite `packs[].tarball` in prenesite** to točno ime datoteke iz iste izdaje** . Imena arhivov vključujejo izvleček SHA-256 ; različne zgradbe lahko zahtevajo različne arhive. Ime prenesene datoteke naj ostane nespremenjeno.

Kopirajte indeks nameščene aplikacije in izbrani arhiv v en imenik, nato pa uporabite CLI iz iste izdaje:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` prikaže stanje namestitve in preverjanja, ne imena arhivske datoteke. Priloženo kazalo izbere arhiv. Namestitev preveri kontrolno vsoto arhiva pred ekstrakcijo in kontrolne vsote paketa pred zamenjavo nameščenega paketa. Bere lokalne datoteke; ne prenaša manjkajočih arhivov. Po namestitvi znova zaženite aplikacijo. Če izdaja nima ujemajočega se sredstva, izbirni paket ni na voljo prek sredstev te izdaje.

## Postavitev imenika

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

Tako `main.js` kot `preload.js` sta**CommonJS `.js`** , ne TypeScript. Tipkanje na strani upodabljalnika je v `electron/types.d.ts`.

## IPC (`preload.js`)

Prednalaganje razkrije API na seznamu dovoljenih na `window.electronAPI` z uporabo `contextBridge` z `contextIsolation: true` in `nodeIntegration: false`.

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

Izpostavljene metode:

| Klic upodabljalnika                                               | Vrsta                         |
| ----------------------------------------------------------------- | ----------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | priklicati                    |
| `openExternal(url)`                                               | priklicati                    |
| `getDataDir()`                                                    | priklicati                    |
| `restartServer()`                                                 | priklicati                    |
| `getAppVersion()`                                                 | priklicati                    |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | priklicati                    |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | poslati                       |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | prejem (odstranjevalnik vrne) |

Pomočniki za sprejem vrnejo a** funkcija odstranjevalca** namesto da bi se zanašal na `removeAllListeners` — to prepreči kopičenje poslušalcev, ko komponente React znova namestite.

## Življenjski cikel strežnika

`main.js` ustvari samostojni sveženj Next.js neposredno z izvajalnim okoljem vozlišča Electron, da se izogne neujemanju izvornega modula ABI s sistemskim vozliščem:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Poudarki:

- `waitForServer()` anketira URL do 30 s, preden prikaže okno (brez praznega zaslona pri hladnem zagonu).
- `stdio: "pipe"` zajame stdout/stderr; pripravljene fraze (`Ready` / `listening`) oddajajo `server-status: running` nad IPC.
- `before-quit` čaka do 5 s na eleganten SIGTERM (kontrolna točka WAL ), nato pa pošlje SIGKILL.
- Preklopnik vrat v pladnju (`20128`, `3000`, `8080`) ustavi in znova zažene strežnik, nato pa znova naloži BrowserWindow.

## Zero-config Secret Bootstrap

Ob prvem zagonu glavni proces samodejno ustvari in ohrani manjkajoče skrivnosti:

| Skrivnost                | Vir                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                 |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (zavrne, če že obstajajo šifrirane poverilnice) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                 |

Vztrajal pri `<DATA_DIR>/server.env`. `DATA_DIR` se razreši na:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ali `~/.omniroute`
- macOS: `~/.omniroute`

## Iskanje okoljske datoteke

Pred ustvarjanjem strežnika glavni proces (`getPreferredEnvFilePath()` in `electron/main.js`) izbere** eno** datoteka `.env` : prva od teh, ki obstaja.

1. `$DATA_DIR/.env`, ko je `DATA_DIR` nastavljen v okolju, s katerim je bila aplikacija zagnana.
2. `<resolved DATA_DIR>/.env` z enakimi privzetimi nastavitvami kot zgoraj: `%APPDATA%\omniroute\.env` na Windows, `$XDG_CONFIG_HOME/omniroute/.env` ali `~/.omniroute/.env` na Linux in macOS.
3. `.env` v delovnem imeniku procesa.

Glavni proces bere samo to datoteko; poznejši kandidati niso združeni. Strežniško okolje je nato zgrajeno s to prednostjo (najvišji prvi):

1. Procesno okolje Electron (spremenljivke, podedovane od tistega, kar je zagnalo aplikacijo).
2. Izbrana datoteka `.env`.
3. `<DATA_DIR>/server.env` (skrivnosti zagonskega sistema zgoraj).

Okolje procesa se zajame, ko se aplikacija zažene, tako da spremenljivka sistemskega ali uporabniškega okolja, nastavljena med izvajanjem aplikacije (vključno s tem, ko je v pladnju, potem ko je njeno okno zaprto), ne doseže strežnika, dokler aplikacija ni popolnoma zaprta in znova zagnana. Za gumbe izvajalnega okolja, kot je `CONTEXT_LENGTH_<PROVIDER>` (glejte [Okoljske spremenljivke: dolžina konteksta na ponudnika](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), izberite datoteko `.env` in nato popolnoma zaprite (pladenj,** Odnehaj** ) in znova zaženite.

## Okno in pladenj

- `BrowserWindow`: 1400 × 900 (najmanj 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, semafor pri `{ x: 16, y: 16 }`.
- Windows/Linux: izvorna naslovna vrstica.
- Gumb za zapiranje minimizira na pladenj; meni pladnja ima** Odprite OmniRoute** ,** Odpri nadzorno ploščo** (zunanji brskalnik),** Vrata strežnika** podmeni,** Preverite posodobitve** ,** Odnehaj** .

## Politika varnosti vsebine

Nastavite prek `session.defaultSession.webRequest.onHeadersReceived`. Pomembne direktive:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Način za razvijalce doda `'unsafe-eval'` samo `script-src`

## Samodejno posodabljanje

Uporablja `electron-updater` s ponudnikom GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Dogodki, posredovani upodabljalniku prek `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (z `percent`), `downloaded`, `error`
- `installUpdate()` ubije strežnik in nato pokliče `autoUpdater.quitAndInstall()`
- Preskočeno v načinu za razvijalce (`!app.isPackaged`)

## Zgradite cevovod

1. `npm run build` → Next.js samostojno v `.next/standalone`.
2. `prepare-electron-standalone.mjs` → prestavi v `.next/electron-standalone` in prepiše absolutne poti znotraj `server.js` + `required-server-files.json` tako da je sveženj mogoče premestiti.
3. `electron-builder` paketi `main.js`, `preload.js`, `node_modules` in `extraResources: { ../.next/electron-standalone → app }`.

### Zgradite cilje

| OS      | Tarče                                      |
| ------- | ------------------------------------------ |
| Windows | NSIS namestitveni program + portable (x64) |
| macOS   | DMG (Intel + arm64, povleci v aplikacije)  |
| Linux   | AppImage + DEB (x64 + arm64)               |

nastavitve NSIS : `oneClick: false`, uporabniku omogoča izbiro namestitvenega imenika, ustvarjanje bližnjic na namizju in meniju Start.

## Pakirana zgradba za testiranje dima

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Samodejno odkrije pakirano dvojiško datoteko v `electron/dist-electron/` za trenutno platformo.
- Zažene se z izoliranimi imeniki `HOME`/`APPDATA`/`XDG_*`, tako da se ne dotika podatkov razvijalca.
- Ankete `http://127.0.0.1:20128/login` za HTTP 200 v 45 s.
- Opazuje stderr/stdout za usodne vzorce (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` itd.).
- Čaka 2 s stabilnega časa izvajanja po pripravljenosti, nato izda SIGTERM in počaka, da se vrata sprostijo.
- V CI samodejno prenese `--no-sandbox --disable-gpu` (in `--disable-dev-shm-usage` na Linux).

Env preglasi: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Podpisovanje kode

`electron/package.json` počne** ne** neposredno podpisovanje poverilnic. Posredujte jih prek env vars v `electron-builder`:

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

podpisovanje AppImage je neobvezno — nastavite `LINUX_GPG_KEY` če je podpisovanje.

## Distribucija

Artefakti pristanejo v `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Izdaje so objavljene v GitHub Releases (`diegosouzapw/OmniRoute`), kjer `electron-updater` tudi preverja, ali so na voljo nove različice.

## Odpravljanje težav

| Simptom                                                        | Popravi                                                                                                                                                   |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` po Electron večji udarec | better-sqlite3 v13 pošilja predizdelke Node-API — znova zaženite `npm install` v korenu in `prepare:bundle` (preveri predizgradnjo za trenutno platformo) |
| `ERR_DLOPEN_FAILED` za izvorni modul                           | Znova zaženite `prepare:bundle` — hitro odpove, če manjka predizdelava Node-API za trenutno platformo                                                     |
| Na Linux je okno prazno                                        | Potrdite, da je strežnik Next.js dejansko povezan z PORT (preverite dnevnike `[Server]` )                                                                 |
| macOS notarsko overitev stoji                                  | Zagotovite, da so spremenljive `APPLE_*` izvožene, ne samo v `.env`                                                                                       |
| Windows SmartScreen opozorilo                                  | Podpišite se s certifikatom EV ali uporabniki z desno miškino tipko kliknite → »Vseeno zaženi«                                                            |
| Preizkus dima ni uspel z vrati v uporabi                       | Preden zaženete `electron:smoke:packaged` zaustavite kateri koli lokalni strežnik razvijalcev na 20128                                                    |

## Glej tudi

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Vir: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pomočniki: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
