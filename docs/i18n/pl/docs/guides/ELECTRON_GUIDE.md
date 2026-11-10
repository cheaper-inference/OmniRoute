# Electron Desktop Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Źródło prawdy:** obszar roboczy `electron/`** Ostatnia aktualizacja:** 2026-06-28 — v3.8.40

OmniRoute dostarcza wbudowaną wieloplatformową aplikację komputerową (Windows / macOS / Linux).**Electron 41** +** konstruktor elektronów 26.10** . Aplikacja komputerowa tworzy samodzielny serwer Next.js jako proces potomny, wskazuje na niego `BrowserWindow` i dodaje tacę systemową, automatyczną aktualizację, most IPC i tajny pasek startowy o zerowej konfiguracji.

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

## Wersje

Potwierdzone z `electron/package.json`:

| Pakiet                  | Wersja                                                             |
| ----------------------- | ------------------------------------------------------------------ |
| `electron`              | `^43.4.1`                                                          |
| `electron-builder`      | `^26.15.3`                                                         |
| `electron-updater`      | `^6.8.9`                                                           |
| `better-sqlite3`        | root `^13.0.2` (prekompilacja Node-API — bez przebudowy Electron ) |
| Wersja aplikacji        | `3.8.0`                                                            |
| Identyfikator aplikacji | `online.omniroute.desktop`                                         |
| Nazwa produktu          | `OmniRoute`                                                        |

## Skrypty (root `package.json`)

| Scenariusz                        | Zamiar                                                                                   |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Uruchamia `npm run dev` + czeka na `localhost:20128` + uruchamia Electron                |
| `npm run electron:build`          | Kompiluje Next.js a następnie uruchamia `electron-builder` dla bieżącego OS              |
| `npm run electron:build:win`      | Kompiluje instalator Windows NSIS + Portable (x64)                                       |
| `npm run electron:build:mac`      | Tworzy macOS DMG (Intel + Apple Silicon)                                                 |
| `npm run electron:build:linux`    | Buduje Linux AppImage + DEB (x64 + arm64)                                                |
| `npm run electron:smoke:packaged` | Uruchamia spakowany plik binarny i sonduje `/login` dla HTTP 200, a następnie zamyka się |

Obszar roboczy `electron/` udostępnia również:

- `npm run prepare:bundle` — uruchamia `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — jednołukowe kompilacje macOS
- `npm run pack` — kompilacja wyłącznie katalogowa do testów lokalnych (bez instalatora)

## Opcjonalne pakiety wykonawcze

Kompilacje komputerów stacjonarnych mogą publikować opcjonalne archiwa środowiska wykonawczego wraz z instalatorami. Zainstalowany ładunek serwera zawiera `optional-packs.index.json` (pod `resources/app` na Windows i Linux). Aby zapoznać się z wpisem `browser-runtime`, przeczytaj `packs[].tarball` i pobierz** dokładnie tę nazwę pliku z tego samego wydania** . Nazwy archiwów zawierają skrót SHA-256 ; różne kompilacje mogą wymagać różnych archiwów. Zachowaj nazwę pobranego pliku bez zmian.

Skopiuj indeks zainstalowanej aplikacji i wybrane archiwum do jednego katalogu, a następnie użyj CLI z tej samej wersji:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` wyświetla stan instalacji i weryfikacji, a nie nazwę pliku archiwum. Dołączony indeks wybiera archiwum. Instalacja sprawdza sumę kontrolną archiwum przed wyodrębnieniem i sumy kontrolne pakietu przed wymianą zainstalowanego pakietu. Czyta pliki lokalne; nie pobiera brakujących archiwów. Uruchom ponownie aplikację po instalacji. Jeśli wydanie nie ma pasującego zasobu, opcjonalny pakiet nie jest dostępny w zasobach tej wersji.

## Układ katalogu

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

Zarówno `main.js` jak i `preload.js` są**CommonJS pliki `.js`** , nie TypeScript. Typowanie po stronie modułu renderującego znajduje się w `electron/types.d.ts`.

## Most IPC (`preload.js`)

Wstępne ładowanie udostępnia API z białej listy na `window.electronAPI` przy użyciu `contextBridge` `contextIsolation: true` i `nodeIntegration: false`.

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

Odsłonięte metody:

| Wywołanie renderera                                               | Typ                             |
| ----------------------------------------------------------------- | ------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | odwołać się                     |
| `openExternal(url)`                                               | odwołać się                     |
| `getDataDir()`                                                    | odwołać się                     |
| `restartServer()`                                                 | odwołać się                     |
| `getAppVersion()`                                                 | odwołać się                     |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | odwołać się                     |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | wysłać                          |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | odbierać (dysponujący zwrotami) |

Pomocnicy odbierający zwracają a** funkcja rozdrabniacza** zamiast polegać na `removeAllListeners` — zapobiega to gromadzeniu się słuchaczy podczas ponownego montażu komponentów React.

## Cykl życia serwera

`main.js` tworzy samodzielny pakiet Next.js bezpośrednio ze środowiskiem wykonawczym Electron Node, aby uniknąć niezgodności ABI modułu natywnego z węzłem systemowym:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Przegląd najważniejszych wydarzeń:

- `waitForServer()` odpytuje URL do 30 sekund przed wyświetleniem okna (bez pustego ekranu przy zimnym starcie).
- `stdio: "pipe"` przechwytuje stdout/stderr; gotowe frazy (`Ready` / `listening`) emitują `server-status: running` przez IPC.
- `before-quit` czeka do 5 sekund na pełne wdzięku SIGTERM (punkt kontrolny WAL ), a następnie wysyła SIGKILL.
- Przełącznik portów w zasobniku (`20128`, `3000`, `8080`) zatrzymuje się i uruchamia ponownie serwer, a następnie ponownie ładuje BrowserWindow.

## Tajny Bootstrap z zerową konfiguracją

Przy pierwszym uruchomieniu główny proces automatycznie generuje i utrzymuje brakujące sekrety:

| Sekret                   | Źródło                                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                   |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (odmawia, jeśli istnieją już zaszyfrowane dane uwierzytelniające) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                   |

Utrzymywał się do `<DATA_DIR>/server.env`. `DATA_DIR` postanawia:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` lub `~/.omniroute`
- macOS: `~/.omniroute`

## Wyszukiwanie plików środowiska

Przed odrodzeniem serwera wybiera główny proces (`getPreferredEnvFilePath()` w `electron/main.js`).** jeden** plik `.env` : pierwszy z istniejących.

1. `$DATA_DIR/.env`, gdy `DATA_DIR` jest ustawione w środowisku, w którym aplikacja została uruchomiona.
2. `<resolved DATA_DIR>/.env`, używając tych samych ustawień domyślnych co powyżej: `%APPDATA%\omniroute\.env` na Windows, `$XDG_CONFIG_HOME/omniroute/.env` lub `~/.omniroute/.env` na Linux i macOS.
3. `.env` w katalogu roboczym procesu.

Główny proces czyta tylko ten plik; późniejsi kandydaci nie są łączeni. Środowisko serwera jest następnie budowane z następującym priorytetem (najpierw najwyższy):

1. Środowisko procesu Electron (zmienne dziedziczone z tego, co uruchomiło aplikację).
2. Wybrany plik `.env`.
3. `<DATA_DIR>/server.env` (sekrety bootstrapu powyżej).

Środowisko procesu jest przechwytywane podczas uruchamiania aplikacji, więc zmienna środowiskowa systemu lub użytkownika ustawiona podczas działania aplikacji (w tym także wtedy, gdy znajduje się ona w zasobniku po zamknięciu okna) nie dociera do serwera, dopóki aplikacja nie zostanie całkowicie zamknięta i uruchomiona ponownie. W przypadku pokręteł czasu wykonywania, takich jak `CONTEXT_LENGTH_<PROVIDER>` (zobacz [Zmienne środowiskowe: Długość kontekstu na dostawcę](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), preferuj plik `.env`, a następnie całkowicie wyjdź (zasobnik,** Zrezygnować** ) i uruchom ponownie.

## Okno i taca

- `BrowserWindow`: 1400 × 900 (min. 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, sygnalizacja świetlna w `{ x: 16, y: 16 }`.
- Windows/Linux: natywny pasek tytułu.
- Przycisk Zamknij minimalizuje do zasobnika; menu zasobnika ma** Otwórz OmniRoute** ,** Otwórz Panel** (przeglądarka zewnętrzna),** Port serwera** podmenu,** Sprawdź aktualizacje** ,** Zrezygnować** .

## Polityka bezpieczeństwa treści

Ustaw przez `session.defaultSession.webRequest.onHeadersReceived`. Godne uwagi dyrektywy:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Tryb deweloperski dodaje `'unsafe-eval'` tylko do `script-src`

## Automatyczna aktualizacja

Używa `electron-updater` z dostawcą GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Zdarzenia przekazywane do modułu renderującego przez `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (z `percent`), `downloaded`, `error`
- `installUpdate()` zabija serwer, a następnie wywołuje `autoUpdater.quitAndInstall()`
- Pominięte w trybie deweloperskim (`!app.isPackaged`)

## Zbuduj rurociąg

1. `npm run build` → Next.js samodzielny w `.next/standalone`.
2. `prepare-electron-standalone.mjs` → ponownie przechodzi do `.next/electron-standalone` i przepisuje ścieżki bezwzględne wewnątrz `server.js` + `required-server-files.json`, więc pakiet można przenieść.
3. pakiety `electron-builder` `main.js`, `preload.js`, `node_modules` i `extraResources: { ../.next/electron-standalone → app }`.

### Buduj cele

| OS      | Cele                                          |
| ------- | --------------------------------------------- |
| Windows | instalator NSIS + przenośny (x64)             |
| macOS   | DMG (Intel + arm64, przeciągnij do aplikacji) |
| Linux   | AppImage + DEB (x64 + arm64)                  |

NSIS settings: `oneClick: false`, pozwala użytkownikowi wybrać katalog instalacyjny, tworzy skróty na pulpicie i w menu Start.

## Wersja pakietowa do testowania dymu

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automatycznie wykrywa spakowany plik binarny w `electron/dist-electron/` dla bieżącej platformy.
- Uruchamia się z izolowanymi katalogami `HOME`/`APPDATA`/`XDG_*`, więc nie wpływa na dane programisty.
- Ankiety `http://127.0.0.1:20128/login` dla HTTP 200 w ciągu 45 s.
- Ogląda stderr/stdout pod kątem fatalnych wzorców (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` itp.).
- Po osiągnięciu gotowości oczekuje 2 s stabilnego środowiska wykonawczego, następnie wydaje SIGTERM i czeka na zwolnienie portu.
- W CI automatycznie przekazuje `--no-sandbox --disable-gpu` (i `--disable-dev-shm-usage` na Linux).

Env zastępuje: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Podpisanie kodu

`electron/package.json` tak** nie** Bezpośrednie poświadczenia podpisywania drutu. Przekaż je przez env vars do `electron-builder`:

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

podpisywanie AppImage jest opcjonalne. — ustawia `LINUX_GPG_KEY` jeśli się podpisuje.

## Dystrybucja

Artefakty lądują w `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Wydania są publikowane w GitHub Releases (`diegosouzapw/OmniRoute`), gdzie `electron-updater` sprawdza również dostępność nowych wersji.

## Rozwiązywanie problemów

| Objaw                                                             | Naprawić                                                                                                                                                              |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` po dużym uderzeniu Electron | better-sqlite3 v13 dostarcza prebuildy Node-API — ponownie uruchamia `npm install` w katalogu głównym i `prepare:bundle` (weryfikuje prebuild dla bieżącej platformy) |
| `ERR_DLOPEN_FAILED` dla modułu natywnego                          | Uruchom ponownie `prepare:bundle` — szybko kończy się niepowodzeniem, gdy brakuje wstępnej kompilacji Node-API dla bieżącej platformy                                 |
| Okno na Linux wydaje się puste                                    | Potwierdź, że serwer Next.js faktycznie jest powiązany z PORT (sprawdź logi `[Server]` )                                                                              |
| stragany notarialne macOS                                         | Upewnij się, że `APPLE_*` vars są eksportowane, a nie tylko do `.env`                                                                                                 |
| Windows SmartScreen ostrzeżenie                                   | Podpisz za pomocą certyfikatu EV lub kliknij prawym przyciskiem myszy → „Uruchom mimo to”                                                                             |
| Test dymu kończy się niepowodzeniem przy używanym porcie          | Zatrzymaj dowolny lokalny serwer deweloperski w wersji 20128 przed uruchomieniem `electron:smoke:packaged`                                                            |

## Zobacz także

- [SETUP_GUIDE](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST](../ops/RELEASE_CHECKLIST.md)
- Źródło: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pomocnicy: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
