# Electron Desktop Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Fonte della verità:** `electron/` spazio di lavoro** Ultimo aggiornamento:** 2026-06-28 — v3.8.40

OmniRoute fornisce un'app desktop multipiattaforma (Windows / macOS / Linux) integrata**Electron 41** +** costruttore di elettroni 26.10** . L'app desktop genera il server autonomo Next.js come processo figlio, punta `BrowserWindow` su di esso e aggiunge una barra delle applicazioni, un aggiornamento automatico, un bridge IPC e un bootstrap segreto a configurazione zero.

## Architettura

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

## Versioni

Confermato da `electron/package.json`:

| Pacchetto          | Versione                                                                  |
| ------------------ | ------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                 |
| `electron-builder` | `^26.15.3`                                                                |
| `electron-updater` | `^6.8.9`                                                                  |
| `better-sqlite3`   | root `^13.0.2` (precompilazione Node-API — senza ricostruzione Electron ) |
| Versione dell'app  | `3.8.0`                                                                   |
| ID dell'app        | `online.omniroute.desktop`                                                |
| Nome del prodotto  | `OmniRoute`                                                               |

## Script (radice `package.json`)

| Copione                           | Scopo                                                                         |
| --------------------------------- | ----------------------------------------------------------------------------- |
| `npm run electron:dev`            | Avvia `npm run dev` + attende `localhost:20128` + avvia Electron              |
| `npm run electron:build`          | Compila Next.js quindi esegue `electron-builder` per lo OS corrente           |
| `npm run electron:build:win`      | Costruisce il programma di installazione Windows NSIS + portatile (x64)       |
| `npm run electron:build:mac`      | Costruisce macOS DMG (Intel + Apple Silicon)                                  |
| `npm run electron:build:linux`    | Costruisce Linux AppImage + DEB (x64 + arm64)                                 |
| `npm run electron:smoke:packaged` | Avvia il pacchetto binario ed esamina `/login` per HTTP 200, quindi si spegne |

L'area di lavoro `electron/` espone anche:

- `npm run prepare:bundle` — esegue `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — build macOS ad arco singolo
- `npm run pack` — build solo directory per test locali (nessun programma di installazione)

## Pacchetti runtime opzionali

Le build desktop possono pubblicare archivi runtime opzionali insieme ai relativi programmi di installazione. Il payload del server installato contiene `optional-packs.index.json` (sotto `resources/app` su Windows e Linux). Per la voce `browser-runtime`, leggi `packs[].tarball` e scarica** quel nome file esatto dalla stessa versione** . I nomi degli archivi includono un digest SHA-256 ; build diverse possono richiedere archivi diversi. Mantieni invariato il nome del file scaricato.

Copia l'indice dell'app installata e l'archivio selezionato in una directory, quindi utilizza CLI della stessa versione:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` mostra lo stato di installazione e verifica, non il nome del file di archivio. L'indice in bundle seleziona l'archivio. L'installazione verifica il checksum dell'archivio prima dell'estrazione e il checksum del pacchetto prima di sostituire un pacchetto installato. Legge i file locali; non scarica gli archivi mancanti. Riavviare l'applicazione dopo l'installazione. Se la versione non ha risorse corrispondenti, il pacchetto opzionale non è disponibile tramite le risorse di quella versione.

## Disposizione della rubrica

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

Sia `main.js` che `preload.js` lo sono** file CommonJS `.js`** , non TypeScript. Le digitazioni lato renderer risiedono in `electron/types.d.ts`.

## Ponte IPC (`preload.js`)

Il precaricamento espone uno API inserito nella whitelist su `window.electronAPI` utilizzando `contextBridge` con `contextIsolation: true` e `nodeIntegration: false`.

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

Metodi esposti:

| Chiamata del renderer                                             | Tipo                                 |
| ----------------------------------------------------------------- | ------------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invocare                             |
| `openExternal(url)`                                               | invocare                             |
| `getDataDir()`                                                    | invocare                             |
| `restartServer()`                                                 | invocare                             |
| `getAppVersion()`                                                 | invocare                             |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invocare                             |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | Inviare                              |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | ricevere (restituisce lo smaltitore) |

Gli aiutanti che ricevono restituiscono a** funzione di smaltimento** invece di fare affidamento su `removeAllListeners` — ciò impedisce l'accumulo di ascoltatori quando i componenti React vengono rimontati.

## Ciclo di vita del server

`main.js` genera il bundle Next.js autonomo direttamente con il runtime del nodo Electron per evitare la mancata corrispondenza ABI del modulo nativo con il nodo di sistema:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Punti salienti:

- `waitForServer()` interroga URL fino a 30 s prima di mostrare la finestra (nessuna schermata vuota all'avvio a freddo).
- `stdio: "pipe"` cattura stdout/stderr; le frasi pronte (`Ready` / `listening`) emettono `server-status: running` su IPC.
- `before-quit` attende fino a 5 s per il grazioso SIGTERM ( checkpoint WAL ) quindi invia SIGKILL.
- Il commutatore di porta nel vassoio (`20128`, `3000`, `8080`) arresta e riavvia il server, quindi ricarica BrowserWindow.

## Bootstrap segreto a configurazione zero

Al primo avvio, il processo principale genera automaticamente e mantiene i segreti mancanti:

| Segreto                  | Fonte                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                     |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (rifiuta se esistono già credenziali crittografate) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                     |

Persistito fino a `<DATA_DIR>/server.env`. `DATA_DIR` si risolve in:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` o `~/.omniroute`
- macOS: `~/.omniroute`

## Ricerca di file di ambiente

Prima di generare il server, il processo principale (`getPreferredEnvFilePath()` in `electron/main.js`) seleziona** uno** `.env` file: il primo di questi che esiste.

1. `$DATA_DIR/.env`, quando `DATA_DIR` è impostato nell'ambiente con cui è stata avviata l'app.
2. `<resolved DATA_DIR>/.env`, utilizzando le stesse impostazioni predefinite di cui sopra: `%APPDATA%\omniroute\.env` su Windows, `$XDG_CONFIG_HOME/omniroute/.env` o `~/.omniroute/.env` su Linux e macOS.
3. `.env` nella directory di lavoro del processo.

Il processo principale legge solo quel file; i candidati successivi non vengono uniti. L'ambiente server viene quindi creato con questa precedenza (prima il più alto):

1. L'ambiente del processo Electron (variabili ereditate da qualunque cosa abbia lanciato l'app).
2. Il file `.env` selezionato.
3. `<DATA_DIR>/server.env` (i segreti del bootstrap sopra).

L'ambiente del processo viene acquisito all'avvio dell'app, quindi una variabile di sistema o di ambiente utente impostata mentre l'app è in esecuzione (anche mentre si trova nella barra delle applicazioni dopo la chiusura della finestra) non raggiunge il server finché l'app non viene completamente chiusa e riavviata. Per le manopole di runtime come `CONTEXT_LENGTH_<PROVIDER>` (vedi [Variabili d'ambiente: lunghezza del contesto per provider](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), preferisci il file `.env`, quindi esci completamente (vassoio,** Esentato** ) e rilanciare.

## Finestra e vassoio

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, semaforo a `{ x: 16, y: 16 }`.
- Windows/Linux: barra del titolo nativa.
- Il pulsante Chiudi viene ridotto a icona nel vassoio; il menu del vassoio ha** Apri OmniRoute** ,** Apri Dashboard** (browser esterno),** Porta del server** sottomenu,** Controlla gli aggiornamenti** ,** Esentato** .

## Politica sulla sicurezza dei contenuti

Impostato tramite `session.defaultSession.webRequest.onHeadersReceived`. Direttive notevoli:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- La modalità Dev aggiunge `'unsafe-eval'` solo a `script-src`

## Aggiornamento automatico

Utilizza `electron-updater` con il provider GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Eventi inoltrati al renderer tramite `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (con `percent`), `downloaded`, `error`
- `installUpdate()` uccide il server quindi chiama `autoUpdater.quitAndInstall()`
- Saltato in modalità sviluppatore (`!app.isPackaged`)

## Costruisci pipeline

1. `npm run build` → Next.js autonomo in `.next/standalone`.
2. `prepare-electron-standalone.mjs` → riorganizza in `.next/electron-standalone` e riscrive i percorsi assoluti all'interno `server.js` + `required-server-files.json` in modo che il bundle sia riposizionabile.
3. `electron-builder` pacchetti `main.js`, `preload.js`, `node_modules` e `extraResources: { ../.next/electron-standalone → app }`.

### Costruisci obiettivi

| OS      | Obiettivi                                         |
| ------- | ------------------------------------------------- |
| Windows | programma di installazione NSIS + portatile (x64) |
| macOS   | DMG (Intel + arm64, trascina su applicazioni)     |
| Linux   | AppImage + DEB (x64 + arm64)                      |

Impostazioni NSIS : `oneClick: false`, consente all'utente di scegliere la directory di installazione, crea scorciatoie sul desktop e sul menu Start.

## Costruzione confezionata per test del fumo

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Rileva automaticamente il pacchetto binario in `electron/dist-electron/` per la piattaforma corrente.
- Si avvia con directory `HOME`/`APPDATA`/`XDG_*` isolate in modo da non toccare i dati degli sviluppatori.
- Sondaggi `http://127.0.0.1:20128/login` per HTTP 200 entro 45 s.
- Controlla stderr/stdout per schemi fatali (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, ecc.).
- Attende 2 secondi di runtime stabile dopo essere pronto, quindi emette SIGTERM e attende che la porta si liberi.
- In CI, passa automaticamente `--no-sandbox --disable-gpu` (e `--disable-dev-shm-usage` su Linux).

Env esegue l'override: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Firma del codice

`electron/package.json` lo fa** non** trasferire direttamente le credenziali di firma. Passali tramite env vars a `electron-builder`:

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

La firma AppImage è facoltativa — imposta `LINUX_GPG_KEY` se si firma.

## Distribuzione

Gli artefatti atterrano in `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Le versioni vengono pubblicate su GitHub Releases (`diegosouzapw/OmniRoute`), che è anche il luogo in cui `electron-updater` verifica la presenza di nuove versioni.

## Risoluzione dei problemi

| Sintomo                                                        | Aggiustare                                                                                                                                               |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` dopo Electron forte urto | better-sqlite3 v13 fornisce prebuild Node-API — riesegui `npm install` alla radice e `prepare:bundle` (verifica la prebuild per la piattaforma corrente) |
| `ERR_DLOPEN_FAILED` per il modulo nativo                       | Rieseguire `prepare:bundle` — fallisce rapidamente quando manca la precompilazione dell'API Node per la piattaforma corrente                             |
| La finestra appare vuota su Linux                              | Conferma il server Next.js effettivamente associato a PORT (controlla i log `[Server]` )                                                                 |
| bancarelle di autenticazione macOS                             | Assicurati che le variabili `APPLE_*` vengano esportate, non solo in `.env`                                                                              |
| avviso Windows SmartScreen                                     | Accedi con EV cert oppure gli utenti fanno clic con il pulsante destro del mouse → "Esegui comunque"                                                     |
| Il test del fumo fallisce con la porta in uso                  | Arrestare qualsiasi server di sviluppo locale su 20128 prima di eseguire `electron:smoke:packaged`                                                       |

## Vedi anche

- [SETUP_GUIDE](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST](../ops/RELEASE_CHECKLIST.md)
- Fonte: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Aiutanti: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
