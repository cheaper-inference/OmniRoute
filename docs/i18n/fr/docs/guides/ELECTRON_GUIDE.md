# Electron Desktop Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Source de vérité :** espace de travail `electron/`** Dernière mise à jour :** 2026-06-28 — v3.8.40

OmniRoute propose une application de bureau multiplateforme (Windows / macOS / Linux) basée sur**Electron 41** +** constructeur d'électrons 26.10** . L'application de bureau génère le serveur autonome Next.js en tant que processus enfant, pointe un `BrowserWindow` dessus et ajoute une barre d'état système, un programme de mise à jour automatique, un pont IPC et un bootstrap secret sans configuration.

## Architecture

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

## Versions

Confirmé par `electron/package.json`:

| Emballer                     | Version                                                                |
| ---------------------------- | ---------------------------------------------------------------------- |
| `electron`                   | `^43.4.1`                                                              |
| `electron-builder`           | `^26.15.3`                                                             |
| `electron-updater`           | `^6.8.9`                                                               |
| `better-sqlite3`             | root `^13.0.2` (Node-API préconstruit — sans reconstruction Electron ) |
| Version de l'application     | `3.8.0`                                                                |
| Identifiant de l'application | `online.omniroute.desktop`                                             |
| Nom du produit               | `OmniRoute`                                                            |

## Scripts (racine `package.json`)

| Scénario                          | But                                                                     |
| --------------------------------- | ----------------------------------------------------------------------- |
| `npm run electron:dev`            | Démarre `npm run dev` + attend `localhost:20128` + lance Electron       |
| `npm run electron:build`          | Construit Next.js puis exécute `electron-builder` pour le OS actuel     |
| `npm run electron:build:win`      | Construit le programme d'installation de Windows NSIS + portable (x64)  |
| `npm run electron:build:mac`      | Construit macOS DMG (Intel + Apple Silicon)                             |
| `npm run electron:build:linux`    | Construit Linux AppImage + DEB (x64 + arm64)                            |
| `npm run electron:smoke:packaged` | Lance le binaire packagé et sonde `/login` pour HTTP 200, puis s'arrête |

L'espace de travail `electron/` expose également :

- `npm run prepare:bundle` — exécute `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — builds macOS à arche unique
- `npm run pack` — construction uniquement dans le répertoire pour les tests locaux (pas d'installateur)

## Packs d'exécution en option

Les versions de bureau peuvent publier des archives d'exécution facultatives avec leurs programmes d'installation. La charge utile du serveur installé contient `optional-packs.index.json` (sous `resources/app` sur Windows et Linux). Pour l'entrée `browser-runtime`, lisez `packs[].tarball` et téléchargez** ce nom de fichier exact de la même version** . Les noms d'archives incluent un résumé SHA-256 ; différentes versions peuvent nécessiter différentes archives. Gardez le nom du fichier téléchargé inchangé.

Copiez l'index de l'application installée et l'archive sélectionnée dans un seul répertoire, puis utilisez le CLI de la même version :

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` affiche l'état d'installation et de vérification, pas le nom du fichier d'archive. L'index groupé sélectionne l'archive. L'installation vérifie la somme de contrôle de son archive avant l'extraction et celle de son package avant de remplacer un pack installé. Il lit les fichiers locaux ; il ne télécharge pas les archives manquantes. Redémarrez l'application après l'installation. Si la version n'a pas de ressource correspondante, le pack facultatif n'est pas disponible via les ressources de cette version.

## Disposition du répertoire

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

`main.js` et `preload.js` sont tous deux** fichiers CommonJS `.js`** , pas TypeScript. Les typages côté moteur de rendu résident dans `electron/types.d.ts`.

## Pont IPC (`preload.js`)

Le préchargement expose un API sur liste blanche sur `window.electronAPI` en utilisant `contextBridge` avec `contextIsolation: true` et `nodeIntegration: false`.

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

Méthodes exposées :

| Appel du moteur de rendu                                          | Taper                          |
| ----------------------------------------------------------------- | ------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoquer                       |
| `openExternal(url)`                                               | invoquer                       |
| `getDataDir()`                                                    | invoquer                       |
| `restartServer()`                                                 | invoquer                       |
| `getAppVersion()`                                                 | invoquer                       |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoquer                       |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | envoyer                        |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | recevoir (retourne le broyeur) |

Les aides à la réception renvoient un** fonction broyeur** plutôt que de compter sur `removeAllListeners` — cela empêche l'accumulation d'écouteurs lors du remontage des composants React.

## Cycle de vie du serveur

`main.js` génère le bundle autonome Next.js directement avec le runtime Electron Node pour éviter une incompatibilité ABI du module natif avec le nœud système :

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Points forts:

- `waitForServer()` interroge le URL jusqu'à 30 s avant d'afficher la fenêtre (pas d'écran vide au démarrage à froid).
- `stdio: "pipe"` capture stdout/stderr; les phrases prêtes (`Ready` / `listening`) émettent `server-status: running` sur IPC.
- `before-quit` attend jusqu'à 5 s pour SIGTERM gracieux (point de contrôle WAL ) puis envoie SIGKILL.
- Le commutateur de port dans le bac (`20128`, `3000`, `8080`) arrête et redémarre le serveur, puis recharge le BrowserWindow.

## Bootstrap secret sans configuration

Au premier lancement, le processus principal génère automatiquement et conserve les secrets manquants :

| Secrète                  | Source                                                                                 |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                               |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (refuse si des crédits cryptés existent déjà) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                               |

J'ai persisté à `<DATA_DIR>/server.env`. `DATA_DIR` résout :

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ou `~/.omniroute`
- macOS: `~/.omniroute`

## Recherche de fichier d'environnement

Avant de générer le serveur, le processus principal (`getPreferredEnvFilePath()` dans `electron/main.js`) sélectionne** un** fichier `.env` : le premier d’entre eux qui existe.

1. `$DATA_DIR/.env`, lorsque `DATA_DIR` est défini dans l'environnement avec lequel l'application a été lancée.
2. `<resolved DATA_DIR>/.env`, en utilisant les mêmes valeurs par défaut que ci-dessus : `%APPDATA%\omniroute\.env` sur Windows, `$XDG_CONFIG_HOME/omniroute/.env` ou `~/.omniroute/.env` sur Linux et macOS.
3. `.env` dans le répertoire de travail du processus.

Le processus principal lit uniquement ce fichier ; les candidats ultérieurs ne sont pas fusionnés. L'environnement serveur est ensuite construit avec cette priorité (la plus élevée en premier) :

1. L'environnement de processus Electron (variables héritées du lancement de l'application).
2. Le fichier `.env` sélectionné.
3. `<DATA_DIR>/server.env` (les secrets d'amorçage ci-dessus).

L'environnement de processus est capturé lorsque l'application démarre, de sorte qu'une variable d'environnement système ou utilisateur définie pendant l'exécution de l'application (y compris lorsqu'elle se trouve dans la barre d'état après la fermeture de sa fenêtre) n'atteint pas le serveur tant que l'application n'est pas complètement fermée et relancée. Pour les boutons d'exécution tels que `CONTEXT_LENGTH_<PROVIDER>` (voir [Variables d'environnement : longueur de contexte par fournisseur](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), préférez le fichier `.env`, puis quittez complètement (bac,** Quitter** ) et relancez.

## Fenêtre et plateau

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, feu tricolore à `{ x: 16, y: 16 }`.
- Windows/Linux: barre de titre native.
- Le bouton de fermeture minimise le bac ; le menu de la barre d'état a** Ouvrir OmniRoute** ,** Ouvrir le tableau de bord** (navigateur externe),** Port du serveur** sous-menu,** Vérifier les mises à jour** ,** Quitter** .

## Politique de sécurité du contenu

Réglé via `session.defaultSession.webRequest.onHeadersReceived`. Directives notables :

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Le mode Dev ajoute `'unsafe-eval'` à `script-src` uniquement

## Mise à jour automatique

Utilise `electron-updater` avec le fournisseur GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Événements transmis au moteur de rendu via `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (avec `percent`), `downloaded`, `error`
- `installUpdate()` tue le serveur puis appelle `autoUpdater.quitAndInstall()`
- Ignoré en mode développement (`!app.isPackaged`)

## Construire un pipeline

1. `npm run build` → Next.js autonome dans `.next/standalone`.
2. `prepare-electron-standalone.mjs` → se réinstalle dans `.next/electron-standalone` et réécrit les chemins absolus à l'intérieur `server.js` + `required-server-files.json` afin que le bundle puisse être déplacé.
3. `electron-builder` packages `main.js`, `preload.js`, `node_modules` et `extraResources: { ../.next/electron-standalone → app }`.

### Construire des cibles

| OS      | Cibles                                             |
| ------- | -------------------------------------------------- |
| Windows | programme d'installation de NSIS + portable (x64)  |
| macOS   | DMG (Intel + arm64, glisser vers les applications) |
| Linux   | AppImage + DEB (x64 + arm64)                       |

Paramètres NSIS : `oneClick: false`, permet à l'utilisateur de choisir le répertoire d'installation, crée des raccourcis sur le bureau et le menu Démarrer.

## Version packagée pour les tests de fumée

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Détecte automatiquement le binaire packagé dans `electron/dist-electron/` pour la plate-forme actuelle.
- Se lance avec des répertoires `HOME`/`APPDATA`/`XDG_*` isolés afin de ne pas toucher aux données du développeur.
- Sonde `http://127.0.0.1:20128/login` pour HTTP 200 dans les 45 s.
- Surveille stderr/stdout pour les modèles fatals (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, etc.).
- Attend 2 s de temps d'exécution stable après la préparation, puis émet SIGTERM et attend que le port se libère.
- Dans CI, passe automatiquement `--no-sandbox --disable-gpu` (et `--disable-dev-shm-usage` sur Linux).

Remplacements d'environnement : `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Signature de code

`electron/package.json` fait** pas** câbler les informations de signature directement. Transmettez-les via env vars à `electron-builder`:

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

La signature AppImage est facultative. — définit `LINUX_GPG_KEY` en cas de signature.

## Distribution

Terrain d'artefacts à `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Les versions sont publiées dans GitHub Releases (`diegosouzapw/OmniRoute`), où `electron-updater` vérifie également les nouvelles versions.

## Dépannage

| Symptôme                                                           | Réparer                                                                                                                                                                         |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` après Electron bosse majeure | better-sqlite3 v13 livre les pré-constructions Node-API — réexécute `npm install` à la racine et `prepare:bundle` (il vérifie la pré-construction pour la plate-forme actuelle) |
| `ERR_DLOPEN_FAILED` pour le module natif                           | Réexécutez `prepare:bundle` — il échoue rapidement lorsque la pré-construction Node-API pour la plate-forme actuelle est manquante                                              |
| La fenêtre apparaît vide sur Linux                                 | Confirmez que le serveur Next.js est réellement lié à PORT (vérifiez les journaux `[Server]` )                                                                                  |
| stands de notarisation macOS                                       | Assurez-vous que les variables `APPLE_*` sont exportées, pas seulement dans `.env`                                                                                              |
| Windows SmartScreen avertissement                                  | Signez avec le certificat EV ou les utilisateurs cliquent avec le bouton droit sur → "Exécuter quand même"                                                                      |
| Le test de fumée échoue avec le port utilisé                       | Arrêtez tout serveur de développement local sur 20128 avant d'exécuter `electron:smoke:packaged`                                                                                |

## Voir aussi

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Source : `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Aides : `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
