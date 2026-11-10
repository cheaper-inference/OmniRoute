# Electron Desktop Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Quelle der Wahrheit:** `electron/` Arbeitsbereich** Letzte Aktualisierung:** 28.06.2026 — v3.8.40

OmniRoute liefert eine plattformübergreifende Desktop-App (Windows / macOS / Linux), die darauf aufbaut**Electron 41** +** Elektronenbildner 26.10** . Die Desktop-App erzeugt den eigenständigen Next.js -Server als untergeordneten Prozess, richtet einen `BrowserWindow` darauf und fügt eine Taskleiste, einen automatischen Updater, IPC Brücke und einen geheimen Null-Konfigurations-Bootstrap hinzu.

## Architektur

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

## Versionen

Bestätigt von `electron/package.json`:

| Paket              | Version                                                                  |
| ------------------ | ------------------------------------------------------------------------ |
| `electron`         | `^43.4.1`                                                                |
| `electron-builder` | `^26.15.3`                                                               |
| `electron-updater` | `^6.8.9`                                                                 |
| `better-sqlite3`   | root `^13.0.2` (Node-API baut — vor, erstellt keinen Electron Neuaufbau) |
| App-Version        | `3.8.0`                                                                  |
| App-ID             | `online.omniroute.desktop`                                               |
| Produktname        | `OmniRoute`                                                              |

## Skripte (root `package.json`)

| Skript                            | Zweck                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Startet `npm run dev` + wartet auf `localhost:20128` + startet Electron            |
| `npm run electron:build`          | Erstellt Next.js führt dann `electron-builder` für das aktuelle OS aus             |
| `npm run electron:build:win`      | Erstellt Windows NSIS Installationsprogramm + Portable (x64)                       |
| `npm run electron:build:mac`      | Baut macOS DMG (Intel + Apple Silicon)                                             |
| `npm run electron:build:linux`    | Erstellt Linux AppImage + DEB (x64 + arm64)                                        |
| `npm run electron:smoke:packaged` | Startet gepackte Binärdateien, prüft `/login` auf HTTP 200 und fährt dann herunter |

Der `electron/` Arbeitsbereich stellt außerdem Folgendes bereit:

- `npm run prepare:bundle` — führt `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — Single-Arch- macOS Builds
- `npm run pack` — Verzeichnis-Build für lokale Tests (kein Installationsprogramm)

## Optionale Laufzeitpakete

Desktop-Builds können neben ihren Installationsprogrammen optionale Laufzeitarchive veröffentlichen. Die installierte Servernutzlast enthält `optional-packs.index.json` (unter `resources/app` auf Windows und Linux). Für den `browser-runtime` Eintrag lesen Sie `packs[].tarball` und laden Sie ihn herunter** genau diesen Dateinamen aus derselben Version** . Archivnamen enthalten einen SHA-256 Digest; Unterschiedliche Builds können unterschiedliche Archive erfordern. Behalten Sie den Namen der heruntergeladenen Datei bei.

Kopieren Sie den Index der installierten App und das ausgewählte Archiv in ein Verzeichnis und verwenden Sie dann die CLI aus derselben Version:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` zeigt den Installations- und Überprüfungsstatus an, nicht den Namen der Archivdatei. Der gebündelte Index wählt das Archiv aus. Die Installation überprüft ihre Archivprüfsumme vor dem Extrahieren und ihre Paketprüfsummen vor dem Ersetzen eines installierten Pakets. Es liest lokale Dateien; Fehlende Archive werden nicht heruntergeladen. Starten Sie die Anwendung nach der Installation neu. Wenn die Version kein passendes Asset hat, ist das optionale Paket nicht über die Assets dieser Version verfügbar.

## Verzeichnislayout

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

Sowohl `main.js` als auch `preload.js` sind**CommonJS `.js` Dateien** , nicht TypeScript. Die Renderer-seitigen Typisierungen leben in `electron/types.d.ts`.

## IPC Brücke (`preload.js`)

Durch das Vorladen wird ein API auf der Whitelist auf `window.electronAPI` unter Verwendung `contextBridge` mit `contextIsolation: true` und `nodeIntegration: false` verfügbar gemacht.

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

Offengelegte Methoden:

| Renderer-Aufruf                                                   | Typ                          |
| ----------------------------------------------------------------- | ---------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | aufrufen                     |
| `openExternal(url)`                                               | aufrufen                     |
| `getDataDir()`                                                    | aufrufen                     |
| `restartServer()`                                                 | aufrufen                     |
| `getAppVersion()`                                                 | aufrufen                     |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | aufrufen                     |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | schicken                     |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | erhalten (Retourenentsorger) |

Die Empfangshelfer geben a zurück** Entsorgerfunktion** Anstatt sich auf `removeAllListeners` — zu verlassen, verhindert dies eine Anhäufung von Listenern, wenn React Komponenten erneut bereitgestellt werden.

## Serverlebenszyklus

`main.js` erzeugt das eigenständige Next.js -Bundle direkt mit der Electron Node-Laufzeitumgebung, um eine Nichtübereinstimmung des nativen Moduls ABI mit dem System-Node zu vermeiden:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Höhepunkte:

- `waitForServer()` fragt den URL bis zu 30 s ab, bevor das Fenster angezeigt wird (kein leerer Bildschirm beim Kaltstart).
- `stdio: "pipe"` erfasst stdout/stderr; Fertige Phrasen (`Ready` / `listening`) geben `server-status: running` über IPC aus.
- `before-quit` wartet bis zu 5 s auf ordnungsgemäßen SIGTERM (WAL Prüfpunkt) und sendet dann SIGKILL.
- Der Port-Umschalter im Fach (`20128`, `3000`, `8080`) stoppt und startet den Server neu und lädt dann den BrowserWindow neu.

## Geheimer Bootstrap ohne Konfiguration

Beim ersten Start generiert der Hauptprozess automatisch fehlende Geheimnisse und behält sie bei:

| Geheimnis                | Quelle                                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                  |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (weigert sich, wenn bereits verschlüsselte Creds vorhanden sind) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                  |

Beharrte auf `<DATA_DIR>/server.env`. `DATA_DIR` löst auf:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` oder `~/.omniroute`
- macOS: `~/.omniroute`

## Nachschlagen von Umgebungsdateien

Vor dem Spawnen des Servers wird der Hauptprozess (`getPreferredEnvFilePath()` in `electron/main.js`) ausgewählt** eins** `.env` Datei: die erste davon, die existiert.

1. `$DATA_DIR/.env`, wenn `DATA_DIR` in der Umgebung festgelegt ist, mit der die App gestartet wurde.
2. `<resolved DATA_DIR>/.env`, wobei dieselben Standardeinstellungen wie oben verwendet werden: `%APPDATA%\omniroute\.env` für Windows, `$XDG_CONFIG_HOME/omniroute/.env` oder `~/.omniroute/.env` für Linux und macOS.
3. `.env` im Prozessarbeitsverzeichnis.

Der Hauptprozess liest nur diese Datei; Spätere Kandidaten werden nicht zusammengeführt. Die Serverumgebung wird dann mit dieser Priorität erstellt (höchste zuerst):

1. Die Electron -Prozessumgebung (Variablen, die von dem geerbt wurden, was auch immer die App gestartet hat).
2. Die ausgewählte `.env` Datei.
3. `<DATA_DIR>/server.env` (die Bootstrap-Geheimnisse oben).

Die Prozessumgebung wird erfasst, wenn die App gestartet wird, sodass eine System- oder Benutzerumgebungsvariable, die während der Ausführung der App festgelegt wird (einschließlich, während sie sich nach dem Schließen des Fensters in der Taskleiste befindet), den Server erst erreicht, wenn die App vollständig beendet und neu gestartet wird. Für Laufzeitknöpfe wie `CONTEXT_LENGTH_<PROVIDER>` (siehe [Umgebungsvariablen: Kontextlänge pro Anbieter](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ) bevorzugen Sie die `.env` Datei und beenden sie dann vollständig (Tray,** Aufhören** ) und neu starten.

## Fenster und Tablett

- `BrowserWindow`: 1400 × 900 (min. 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, Ampel bei `{ x: 16, y: 16 }`.
- Windows/Linux: native Titelleiste.
- Die Schaltfläche „Schließen“ wird auf das Fach minimiert. Das Fachmenü hat** OmniRoute öffnen** ,** Öffnen Sie das Dashboard** (externer Browser),** Server-Port** Untermenü,** Suchen Sie nach Updates** ,** Aufhören** .

## Inhaltssicherheitsrichtlinie

Über `session.defaultSession.webRequest.onHeadersReceived` eingestellt. Bemerkenswerte Richtlinien:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Der Dev-Modus fügt nur `'unsafe-eval'` zu `script-src` hinzu

## Automatische Aktualisierung

Verwendet `electron-updater` mit dem GitHub Anbieter (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Über `update-status` IPC an den Renderer weitergeleitete Ereignisse: `checking`, `available`, `not-available`, `downloading` (mit `percent`), `downloaded`, `error`
- `installUpdate()` beendet den Server und ruft dann `autoUpdater.quitAndInstall()` auf
- Im Entwicklungsmodus übersprungen (`!app.isPackaged`)

## Pipeline erstellen

1. `npm run build` → Next.js eigenständig in `.next/standalone`.
2. `prepare-electron-standalone.mjs` → wird erneut in `.next/electron-standalone` bereitgestellt und schreibt absolute Pfade innerhalb `server.js` + `required-server-files.json` neu, sodass das Bundle verschoben werden kann.
3. `electron-builder` -Pakete `main.js`, `preload.js`, `node_modules` und `extraResources: { ../.next/electron-standalone → app }`.

### Ziele aufbauen

| OS      | Ziele                                        |
| ------- | -------------------------------------------- |
| Windows | NSIS -Installationsprogramm + Portable (x64) |
| macOS   | DMG (Intel + arm64, Drag-to-Applications)    |
| Linux   | AppImage + DEB (x64 + arm64)                 |

NSIS Einstellungen: `oneClick: false`, lässt den Benutzer das Installationsverzeichnis auswählen, erstellt Desktop- und Startmenü-Verknüpfungen.

## Rauchtest-Paketbau

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Erkennt automatisch die gepackte Binärdatei in `electron/dist-electron/` für die aktuelle Plattform.
- Wird mit isolierten `HOME`/`APPDATA`/`XDG_*` -Verzeichnissen gestartet, sodass Entwicklerdaten nicht berührt werden.
- Fragt `http://127.0.0.1:20128/login` innerhalb von 45 s nach HTTP 200 ab.
- Überwacht stderr/stdout auf fatale Muster (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` usw.).
- Wartet nach der Bereitschaft 2 Sekunden lang auf stabile Laufzeit, gibt dann SIGTERM aus und wartet darauf, dass der Port frei wird.
- Übergibt in CI automatisch `--no-sandbox --disable-gpu` (und `--disable-dev-shm-usage` auf Linux).

Env überschreibt: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Code-Signierung

`electron/package.json` tut es** nicht** Signaturdaten direkt übermitteln. Übergeben Sie sie über env vars an `electron-builder`:

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

AppImage Signierung ist optional — setzt `LINUX_GPG_KEY` wenn signiert wird.

## Verteilung

Artefakte landen in `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Releases werden in GitHub Releases (`diegosouzapw/OmniRoute`) veröffentlicht, wo `electron-updater` auch nach neuen Versionen sucht.

## Fehlerbehebung

| Symptom                                                         | Fix                                                                                                                                                                                  |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` nach Electron großer Stoß | better-sqlite3 v13 liefert Node-API-Prebuilds aus. — führt `npm install` im Stammverzeichnis und `prepare:bundle` erneut aus (es überprüft den Prebuild für die aktuelle Plattform). |
| `ERR_DLOPEN_FAILED` für natives Modul                           | Führen Sie `prepare:bundle` — erneut aus. Es schlägt schnell fehl, wenn der Node-API-Prebuild für die aktuelle Plattform fehlt                                                       |
| Das Fenster auf Linux erscheint leer                            | Bestätigen Sie, dass der Next.js -Server tatsächlich an PORT gebunden ist (überprüfen Sie `[Server]` Protokolle).                                                                    |
| macOS -Notarisierungsstände                                     | Stellen Sie sicher, dass `APPLE_*` Variablen exportiert werden, nicht nur in `.env`                                                                                                  |
| Windows SmartScreen Warnung                                     | Mit EV Zertifikat signieren, oder Benutzer klicken mit der rechten Maustaste auf → „Trotzdem ausführen“                                                                              |
| Der Rauchtest schlägt bei verwendetem Anschluss fehl            | Stoppen Sie alle lokalen Entwicklungsserver auf 20128, bevor Sie `electron:smoke:packaged` ausführen                                                                                 |

## Siehe auch

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Quelle: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Helfer: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
