# Electron Desktop Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Totuuden lähde:** `electron/` työtila** Viimeksi päivitetty:** 28.6.2026 — v3.8.40

OmniRoute toimittaa monikäyttöisen työpöytäsovelluksen (Windows / macOS / Linux), joka on rakennettu**Electron 41** +** elektronien rakentaja 26.10** . Työpöytäsovellus luo itsenäisen Next.js palvelimen aliprosessina, osoittaa siihen `BrowserWindow` n ja lisää järjestelmälokeron, automaattisen päivityksen, IPC sillan ja nollakonfig-salaisen käynnistysohjelman.

## Arkkitehtuuri

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

## Versiot

Vahvistettu `electron/package.json`:

| Paketti            | Versio                                                   |
| ------------------ | -------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                |
| `electron-builder` | `^26.15.3`                                               |
| `electron-updater` | `^6.8.9`                                                 |
| `better-sqlite3`   | root `^13.0.2` (Node-API esibuild — no Electron rebuild) |
| Sovelluksen versio | `3.8.0`                                                  |
| Sovelluksen tunnus | `online.omniroute.desktop`                               |
| Tuotteen nimi      | `OmniRoute`                                              |

## Skriptit (root `package.json`)

| Käsikirjoitus                     | Tarkoitus                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------ |
| `npm run electron:dev`            | Käynnistää `npm run dev` + odottaa `localhost:20128` + käynnistää Electron                 |
| `npm run electron:build`          | Muodostaa Next.js ja suorittaa sitten `electron-builder` nykyiselle OS                     |
| `npm run electron:build:win`      | Rakentaa Windows NSIS -asennusohjelman + portable (x64)                                    |
| `npm run electron:build:mac`      | Rakentaa macOS DMG (Intel + Apple Silicon)                                                 |
| `npm run electron:build:linux`    | Rakentaa Linux AppImage + DEB (x64 + arm64)                                                |
| `npm run electron:smoke:packaged` | Käynnistää pakatun binääritiedoston ja tutkii `/login` :n HTTP 200:lle ja sammuttaa sitten |

`electron/` -työtila paljastaa myös:

- `npm run prepare:bundle` — ajaa `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — yksikaariset macOS -koontiversiot
- `npm run pack` — vain hakemiston koontiversio paikallista testausta varten (ei asennusohjelmaa)

## Valinnaiset suoritusaikapaketit

Työpöytäversiot voivat julkaista valinnaisia ajonaikaisia arkistoja asentajiensa ohella. Asennettu palvelimen hyötykuorma sisältää `optional-packs.index.json` ( `resources/app` alla Windows ssä ja Linux). Lue `browser-runtime` -merkintä `packs[].tarball` ja lataa** sama tiedostonimi samasta julkaisusta** . Arkiston nimet sisältävät SHA-256 -tiivistelmän; eri rakennelmat voivat vaatia erilaisia arkistoja. Pidä ladatun tiedoston nimi ennallaan.

Kopioi asennetun sovelluksen hakemisto ja valittu arkisto yhteen hakemistoon ja käytä sitten CLI samasta julkaisusta:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` näyttää asennuksen ja vahvistuksen tilan, ei arkiston tiedostonimeä. Niputettu hakemisto valitsee arkiston. Asennus tarkistaa arkiston tarkistussumman ennen purkamista ja pakettien tarkistussummat ennen asennetun paketin vaihtamista. Se lukee paikallisia tiedostoja; se ei lataa puuttuvia arkistoja. Käynnistä sovellus uudelleen asennuksen jälkeen. Jos julkaisussa ei ole vastaavaa sisältöä, valinnainen paketti ei ole saatavilla kyseisen julkaisun sisältöjen kautta.

## Hakemiston asettelu

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

Sekä `main.js` että `preload.js` ovat**CommonJS `.js` tiedostot** , ei TypeScript. Renderöijän puolen kirjoitukset elävät `electron/types.d.ts`-muodossa.

## IPC silta (`preload.js`)

Esilataus paljastaa sallittujen luettelon API `window.electronAPI` ssä käyttämällä `contextBridge` `contextIsolation: true` ja `nodeIntegration: false` kanssa.

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

Paljastetut menetelmät:

| Rendererin kutsu                                                  | Tyyppi                             |
| ----------------------------------------------------------------- | ---------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | vedota                             |
| `openExternal(url)`                                               | vedota                             |
| `getDataDir()`                                                    | vedota                             |
| `restartServer()`                                                 | vedota                             |
| `getAppVersion()`                                                 | vedota                             |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | vedota                             |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | lähetä                             |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | vastaanottaa (palauttaa hävittäjä) |

Vastaanottavat avustajat palauttavat a** hävittäjätoiminto** sen sijaan, että luottaisi `removeAllListeners` —, tämä estää kuuntelijoiden kerääntymisen, kun React komponentit asennetaan uudelleen.

## Palvelimen elinkaari

`main.js` luo erillisen Next.js paketin suoraan Electron solmun ajon aikana välttääkseen alkuperäisen moduulin ABI epäsopivuuden järjestelmäsolmun kanssa:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Kohokohdat:

- `waitForServer()` kysyy URL jopa 30 s ennen ikkunan näyttämistä (ei tyhjää näyttöä kylmäkäynnistyksessä).
- `stdio: "pipe"` kaappaa stdout/stderr; valmiit lauseet (`Ready` / `listening`) lähettävät `server-status: running` IPC n yli.
- `before-quit` odottaa jopa 5 sekuntia siroa SIGTERM (WAL checkpoint) ja lähettää sitten SIGKILL.
- Lokeron portinvaihtaja (`20128`, `3000`, `8080`) pysäyttää ja käynnistää palvelimen uudelleen ja lataa sitten BrowserWindow n uudelleen.

## Zero-config Secret Bootstrap

Ensimmäisellä käynnistyksellä pääprosessi luo automaattisesti ja säilyttää puuttuvat salaisuudet:

| Salaisuus                | Lähde                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                        |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (kieltäytyy, jos salatut tunnusluvut ovat jo olemassa) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                        |

Pysyi `<DATA_DIR>/server.env` asti. `DATA_DIR` ratkaisee:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` tai `~/.omniroute`
- macOS: `~/.omniroute`

## Ympäristötiedoston haku

Ennen palvelimen luomista pääprosessi (`getPreferredEnvFilePath()` in `electron/main.js`) valitsee** yksi** `.env` -tiedosto: ensimmäinen näistä olemassa olevista.

1. `$DATA_DIR/.env`, kun `DATA_DIR` on asetettu ympäristöön, jossa sovellus käynnistettiin.
2. `<resolved DATA_DIR>/.env` käyttäen samoja oletusasetuksia kuin yllä: `%APPDATA%\omniroute\.env` Windows ssä, `$XDG_CONFIG_HOME/omniroute/.env` tai `~/.omniroute/.env` Linux ssä ja macOS ssä.
3. `.env` prosessin työhakemistossa.

Pääprosessi lukee vain kyseisen tiedoston; myöhempiä ehdokkaita ei yhdistetä. Palvelinympäristö rakennetaan sitten tällä prioriteetilla (korkein ensin):

1. Electron -prosessiympäristö (muuttujat, jotka on peritty mistä tahansa sovelluksen käynnistämisestä).
2. Valittu `.env` tiedosto.
3. `<DATA_DIR>/server.env` (yllä olevat bootstrapin salaisuudet).

Prosessiympäristö kaapataan, kun sovellus käynnistetään, joten järjestelmä- tai käyttäjäympäristömuuttuja, joka on asetettu sovelluksen ollessa käynnissä (mukaan lukien silloin, kun se on lokerossa sen ikkunan sulkemisen jälkeen), ei saavuta palvelinta ennen kuin sovellus suljetaan kokonaan ja käynnistetään uudelleen. Jos käytät ajonaikaisia nuppeja, kuten `CONTEXT_LENGTH_<PROVIDER>` (katso [Ympäristömuuttujat: Palveluntarjoajakohtainen kontekstin pituus](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), valitse `.env` -tiedosto ja sulje sitten kokonaan (lokero,** Lopettaa** ) ja käynnistä uudelleen.

## Ikkuna ja lokero

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, liikennevalo `{ x: 16, y: 16 }`:ssä.
- Windows/Linux: alkuperäinen otsikkorivi.
- Sulje-painike pienentää lokeron; lokerovalikossa on** Avaa OmniRoute** ,** Avaa Dashboard** (ulkoinen selain),** Palvelimen portti** alivalikko,** Tarkista päivitykset** ,** Lopettaa** .

## Sisällön suojauskäytäntö

Aseta `session.defaultSession.webRequest.onHeadersReceived` kautta. Huomattavia ohjeita:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Kehittäjätila lisää `'unsafe-eval'` n vain `script-src`

## Automaattinen päivitys

Käyttää `electron-updater` GitHub -palveluntarjoajan (`diegosouzapw/OmniRoute`) kanssa.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Tapahtumat, jotka on välitetty renderöijälle `update-status` IPC kautta: `checking`, `available`, `not-available`, `downloading` (ja `percent`), `downloaded`, `error`
- `installUpdate()` tappaa palvelimen ja kutsuu sitten `autoUpdater.quitAndInstall()`
- Ohitettu kehittäjätilassa (`!app.isPackaged`)

## Rakenna putkisto

1. `npm run build` → Next.js erillinen `.next/standalone` ssä.
2. `prepare-electron-standalone.mjs` → siirtyy uudelleen `.next/electron-standalone` ksi ja kirjoittaa uudelleen absoluuttiset polut `server.js` + `required-server-files.json` sisällä, jotta nippu voidaan sijoittaa uudelleen.
3. `electron-builder` -paketit `main.js`, `preload.js`, `node_modules` ja `extraResources: { ../.next/electron-standalone → app }`.

### Rakenna tavoitteita

| OS      | Tavoitteet                             |
| ------- | -------------------------------------- |
| Windows | NSIS asennusohjelma + kannettava (x64) |
| macOS   | DMG (Intel + arm64, vedä sovelluksiin) |
| Linux   | AppImage + DEB (x64 + arm64)           |

NSIS -asetukset: `oneClick: false`, antaa käyttäjän valita asennushakemiston, luo työpöydän ja Käynnistä-valikon pikakuvakkeita.

## Savun testauspaketti

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Löytää automaattisesti pakatun binaarin `electron/dist-electron/` muodossa nykyiselle alustalle.
- Käynnistyy eristetyillä `HOME`/`APPDATA`/`XDG_*` -hakemistoilla, jotta se ei kosketa kehittäjien tietoja.
- Kyselyt `http://127.0.0.1:20128/login` for HTTP 200 45 sekunnin sisällä.
- Kellot stderr/stdout kohtalokkaille kuvioille (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` jne.).
- Odottaa 2 s vakaata käyttöaikaa valmiuden jälkeen, antaa sitten SIGTERM ja odottaa portin vapautumista.
- Kohdassa CI ohittaa automaattisesti `--no-sandbox --disable-gpu` (ja `--disable-dev-shm-usage` n Linux:ssä).

Env ohittaa: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Koodi allekirjoitus

`electron/package.json` tekee** ei** allekirjoitustiedot suoraan. Välitä ne env varsin kautta `electron-builder`:lle:

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

AppImage -allekirjoitus on valinnainen. — aseta `LINUX_GPG_KEY` allekirjoituksen yhteydessä.

## Jakelu

Artefaktit laskeutuvat `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Julkaisut julkaistaan GitHub Releases (`diegosouzapw/OmniRoute`) -sivustolle, josta `electron-updater` myös tarkistaa uudet versiot.

## Vianetsintä

| Oire                                                                   | Korjata                                                                                                                                              |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` jälkeen Electron suuren kolahtaa | better-sqlite3 v13 toimittaa Node-API esikoontit — ajaa `npm install` uudelleen juuressa ja `prepare:bundle` (se varmistaa nykyisen alustan esikoon) |
| `ERR_DLOPEN_FAILED` alkuperäiselle moduulille                          | Suorita `prepare:bundle` — uudelleen, se epäonnistuu nopeasti, kun nykyisen alustan Node-API-esirakennus puuttuu                                     |
| Ikkuna näkyy tyhjänä Linux                                             | Vahvista, että Next.js palvelin on todella sidottu PORT (tarkista `[Server]` lokit)                                                                  |
| macOS notaarin vahvistaminen                                           | Varmista, että `APPLE_*` varsit viedään, ei vain `.env` ssä                                                                                          |
| Windows SmartScreen varoitus                                           | Allekirjoita EV sertifikaatilla tai käyttäjät napsauta hiiren kakkospainikkeella → "Suorita silti"                                                   |
| Savustesti epäonnistuu portin ollessa käytössä                         | Pysäytä mikä tahansa paikallinen kehityspalvelin vuonna 20128 ennen `electron:smoke:packaged` suorittamista                                          |

## Katso myös

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Lähde: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Avustajat: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
