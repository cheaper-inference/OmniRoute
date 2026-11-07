# Electron Desktop Guide (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Fuente de la verdad:** espacio de trabajo `electron/`** Última actualización:** 2026-06-28 —

OmniRoute incluye una aplicación de escritorio multiplataforma (Windows / macOS / Linux) integrada en**Electron 41** +** constructor de electrones 26.10** . La aplicación de escritorio genera el servidor independiente Next.js como un proceso secundario, le apunta con un `BrowserWindow` y agrega una bandeja del sistema, un actualizador automático, un puente IPC y un arranque secreto de configuración cero.

## Arquitectura

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

## Versiones

Confirmado de `electron/package.json`:

| Paquete                         | Versión                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------- |
| `electron`                      | `^43.4.1`                                                                    |
| `electron-builder`              | `^26.15.3`                                                                   |
| `electron-updater`              | `^6.8.9`                                                                     |
| `better-sqlite3`                | root `^13.0.2` (precompilaciones de Node-API — sin reconstrucción Electron ) |
| Versión de la aplicación        | `3.8.0`                                                                      |
| Identificación de la aplicación | `online.omniroute.desktop`                                                   |
| Nombre del producto             | `OmniRoute`                                                                  |

## Scripts (raíz `package.json`)

| Guion                             | Objetivo                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `npm run electron:dev`            | Inicia `npm run dev` + espera `localhost:20128` + lanza Electron                     |
| `npm run electron:build`          | Construye Next.js y luego ejecuta `electron-builder` para el OS actual.              |
| `npm run electron:build:win`      | Construye el instalador Windows NSIS + portable (x64)                                |
| `npm run electron:build:mac`      | Construye macOS DMG (Intel + Apple Silicon)                                          |
| `npm run electron:build:linux`    | Construye Linux AppImage + DEB (x64 + arm64)                                         |
| `npm run electron:smoke:packaged` | Inicia el binario empaquetado y prueba `/login` en busca de HTTP 200, luego se apaga |

El espacio de trabajo `electron/` también expone:

- `npm run prepare:bundle` — ejecuta `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — compilaciones macOS un solo arco
- `npm run pack` — compilación de solo directorio para pruebas locales (sin instalador)

## Paquetes de tiempo de ejecución opcionales

Las compilaciones de escritorio pueden publicar archivos de tiempo de ejecución opcionales junto con sus instaladores. La carga útil del servidor instalado contiene `optional-packs.index.json` (bajo `resources/app` en Windows y Linux). Para la entrada `browser-runtime`, lea `packs[].tarball` y descargue** ese nombre de archivo exacto de la misma versión** . Los nombres de los archivos incluyen un resumen SHA-256 ; diferentes compilaciones pueden requerir diferentes archivos. Mantenga el nombre del archivo descargado sin cambios.

Copie el índice de la aplicación instalada y el archivo seleccionado en un directorio, luego use CLI de la misma versión:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` muestra el estado de instalación y verificación, no el nombre del archivo comprimido. El índice incluido selecciona el archivo. La instalación verifica la suma de verificación del archivo antes de la extracción y la suma de verificación del paquete antes de reemplazar un paquete instalado. Lee archivos locales; no descarga archivos faltantes. Reinicie la aplicación después de la instalación. Si la versión no tiene ningún activo coincidente, el paquete opcional no está disponible a través de los activos de esa versión.

## Diseño del directorio

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

Tanto `main.js` como `preload.js` son** archivos CommonJS `.js`** , no TypeScript. Las tipificaciones del lado del renderizador se encuentran en `electron/types.d.ts`.

## Puente IPC (`preload.js`)

La precarga expone un API incluido en la lista blanca en `window.electronAPI` usando `contextBridge` con `contextIsolation: true` y `nodeIntegration: false`.

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

Métodos expuestos:

| Llamada al renderizador                                           | Tipo                             |
| ----------------------------------------------------------------- | -------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invocar                          |
| `openExternal(url)`                                               | invocar                          |
| `getDataDir()`                                                    | invocar                          |
| `restartServer()`                                                 | invocar                          |
| `getAppVersion()`                                                 | invocar                          |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invocar                          |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | enviar                           |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | recibir (devuelve el eliminador) |

Los ayudantes de recepción devuelven un** función de triturador** en lugar de depender de `removeAllListeners` — esto evita la acumulación de escuchas cuando se vuelven a montar los componentes React.

## Ciclo de vida del servidor

`main.js` genera el paquete independiente Next.js directamente con el tiempo de ejecución del nodo Electron para evitar que el módulo nativo ABI no coincida con el nodo del sistema:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Reflejos:

- `waitForServer()` sondea el URL hasta 30 s antes de mostrar la ventana (no hay pantalla en blanco en el arranque en frío).
- `stdio: "pipe"` captura stdout/stderr; Las frases listas (`Ready` / `listening`) emiten `server-status: running` sobre IPC.
- `before-quit` espera hasta 5 s para SIGTERM elegante (punto de control WAL ) y luego envía SIGKILL.
- El conmutador de puertos en la bandeja (`20128`, `3000`, `8080`) detiene y reinicia el servidor, luego recarga el BrowserWindow.

## Bootstrap secreto de configuración cero

En el primer lanzamiento, el proceso principal genera automáticamente y persiste los secretos faltantes:

| Secreto                  | Fuente                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                            |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (se niega si ya existen créditos cifrados) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                            |

Persistió hasta `<DATA_DIR>/server.env`. `DATA_DIR` resuelve:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` o `~/.omniroute`
- macOS: `~/.omniroute`

## Búsqueda de archivos de entorno

Antes de generar el servidor, el proceso principal (`getPreferredEnvFilePath()` en `electron/main.js`) selecciona** uno** Archivo `.env` : el primero de estos que existe.

1. `$DATA_DIR/.env`, cuando `DATA_DIR` está configurado en el entorno con el que se inició la aplicación.
2. `<resolved DATA_DIR>/.env`, usando los mismos valores predeterminados que arriba: `%APPDATA%\omniroute\.env` en Windows, `$XDG_CONFIG_HOME/omniroute/.env` o `~/.omniroute/.env` en Linux y macOS.
3. `.env` en el directorio de trabajo del proceso.

El proceso principal lee sólo ese archivo; Los candidatos posteriores no se fusionan. Luego, el entorno del servidor se construye con esta prioridad (la más alta primero):

1. El entorno del proceso Electron (variables heredadas de lo que inició la aplicación).
2. El archivo `.env` seleccionado.
3. `<DATA_DIR>/server.env` (los secretos de arranque anteriores).

El entorno del proceso se captura cuando se inicia la aplicación, por lo que una variable de entorno del sistema o del usuario configurada mientras la aplicación se está ejecutando (incluso mientras permanece en la bandeja después de cerrar la ventana) no llega al servidor hasta que la aplicación se cierra por completo y se reinicia. Para controles de tiempo de ejecución como `CONTEXT_LENGTH_<PROVIDER>` (consulte [Variables de entorno: longitud de contexto por proveedor](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), prefiera el archivo `.env` y luego salga por completo (bandeja,** Abandonar** ) y relanzar.

## Ventana y bandeja

- `BrowserWindow`: 1400 × 900 (mínimo 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, semáforo en `{ x: 16, y: 16 }`.
- Windows/Linux: barra de título nativa.
- El botón Cerrar se minimiza en la bandeja; el menú de la bandeja tiene** abrir OmniRoute** ,** Abrir panel** (navegador externo),** Puerto del servidor** submenú,** Buscar actualizaciones** ,** Abandonar** .

## Política de seguridad de contenido

Establecido a través de `session.defaultSession.webRequest.onHeadersReceived`. Directivas notables:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- El modo de desarrollo agrega `'unsafe-eval'` solo a `script-src`

## Actualización automática

Utiliza `electron-updater` con el proveedor GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Eventos reenviados al renderizador a través de `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (con `percent`), `downloaded`, `error`
- `installUpdate()` mata el servidor y luego llama a `autoUpdater.quitAndInstall()`
- Omitido en modo de desarrollo (`!app.isPackaged`)

## Construir canalización

1. `npm run build` → Next.js independiente en `.next/standalone`.
2. `prepare-electron-standalone.mjs` → vuelve a pasar a `.next/electron-standalone` y reescribe rutas absolutas dentro de `server.js` + `required-server-files.json` para que el paquete sea reubicable.
3. Paquetes `electron-builder` `main.js`, `preload.js`, `node_modules` y `extraResources: { ../.next/electron-standalone → app }`.

### Construir objetivos

| OS      | Objetivos                                     |
| ------- | --------------------------------------------- |
| Windows | instalador NSIS + portátil (x64)              |
| macOS   | DMG (Intel + arm64, arrastrar a Aplicaciones) |
| Linux   | AppImage + DEB (x64 + arm64)                  |

Configuración NSIS : `oneClick: false`, permite al usuario elegir el directorio de instalación, crea accesos directos al escritorio y al menú Inicio.

## Construcción empaquetada de prueba de humo

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Descubre automáticamente el binario empaquetado en `electron/dist-electron/` para la plataforma actual.
- Se inicia con directorios `HOME`/`APPDATA`/`XDG_*` aislados para que no toque los datos del desarrollador.
- Encuesta `http://127.0.0.1:20128/login` por 200 HTTP en 45 s.
- Observa stderr/stdout en busca de patrones fatales (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, etc.).
- Espera 2 s de tiempo de ejecución estable después de estar listo, luego emite SIGTERM y espera a que se libere el puerto.
- En CI, pasa automáticamente `--no-sandbox --disable-gpu` (y `--disable-dev-shm-usage` en Linux).

Anulaciones de entorno: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Firma de código

`electron/package.json` lo hace** no** transfiera las credenciales de firma directamente. Páselos a través de env vars a `electron-builder`:

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

La firma AppImage es opcional. — establece `LINUX_GPG_KEY` si se firma.

## Distribución

Los artefactos aterrizan en `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Las versiones se publican en GitHub Releases (`diegosouzapw/OmniRoute`), que también es donde `electron-updater` busca nuevas versiones.

## Solución de problemas

| Síntoma                                                                     | Arreglar                                                                                                                                                                                |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` después del golpe importante Electron | better-sqlite3 v13 incluye compilaciones previas de Node-API — vuelve a ejecutar `npm install` en la raíz y `prepare:bundle` (verifica la compilación previa para la plataforma actual) |
| `ERR_DLOPEN_FAILED` para módulo nativo                                      | Vuelva a ejecutar `prepare:bundle` — falla rápidamente cuando falta la compilación previa de Node-API para la plataforma actual                                                         |
| La ventana aparece en blanco en Linux                                       | Confirme que el servidor Next.js realmente está vinculado a PORT (verifique los registros `[Server]` )                                                                                  |
| puestos de notariación macOS                                                | Asegúrese de que se exporten `APPLE_*` vars, no solo en `.env`                                                                                                                          |
| advertencia Windows SmartScreen                                             | Firme con el certificado EV o los usuarios hagan clic derecho en → "Ejecutar de todos modos"                                                                                            |
| La prueba de humo falla con el puerto en uso                                | Detenga cualquier servidor de desarrollo local en 20128 antes de ejecutar `electron:smoke:packaged`                                                                                     |

## Ver también

- [SETUP_GUIDE](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST](../ops/RELEASE_CHECKLIST.md)
- Fuente: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Ayudantes: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
