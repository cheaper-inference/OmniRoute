# Electron Desktop Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Fonte da verdade:** espaço de trabalho `electron/`** Última atualização:** 28/06/2026 — v3.8.40

OmniRoute fornece uma aplicação de desktop multiplataforma (Windows / macOS / Linux) construída em**Electron 41** +** construtor de electrões 26.10** . A aplicação de desktop gera o servidor autónomo Next.js como um processo filho, aponta um `BrowserWindow` para ele e adiciona uma bandeja do sistema, atualizador automático, ponte IPC e inicialização secreta de configuração zero.

## Arquitetura

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

## Versões

Confirmado pelo `electron/package.json`:

| Pacote               | Versão                                                              |
| -------------------- | ------------------------------------------------------------------- |
| `electron`           | `^43.4.1`                                                           |
| `electron-builder`   | `^26.15.3`                                                          |
| `electron-updater`   | `^6.8.9`                                                            |
| `better-sqlite3`     | root `^13.0.2` (Node-API pré-construi — sem reconstrução Electron ) |
| Versão do aplicativo | `3.8.0`                                                             |
| ID do aplicativo     | `online.omniroute.desktop`                                          |
| Nome do produto      | `OmniRoute`                                                         |

## Scripts (raiz `package.json`)

| Argumento                         | Finalidade                                                                      |
| --------------------------------- | ------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Inicia `npm run dev` + espera pelo `localhost:20128` + inicia Electron          |
| `npm run electron:build`          | Constrói Next.js e depois executa `electron-builder` para o OS atual            |
| `npm run electron:build:win`      | Constrói o instalador Windows NSIS + portátil (x64)                             |
| `npm run electron:build:mac`      | Constrói macOS DMG (Intel + Apple Silicon)                                      |
| `npm run electron:build:linux`    | Constrói Linux AppImage + DEB (x64 + arm64)                                     |
| `npm run electron:smoke:packaged` | Inicia o binário empacotado e investiga `/login` para HTTP 200 e depois desliga |

O espaço de trabalho `electron/` expõe também:

- `npm run prepare:bundle` — executa `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — compilações macOS de arco único
- `npm run pack` — compilação apenas de diretório para testes locais (sem instalador)

## Pacotes de tempo de execução opcionais

As compilações de ambiente de trabalho podem publicar ficheiros de tempo de execução opcionais juntamente com os seus instaladores. A carga útil do servidor instalado contém `optional-packs.index.json` (em `resources/app` em Windows e Linux). Para a entrada `browser-runtime`, leia `packs[].tarball` e descarregue** esse nome de ficheiro exato da mesma versão** . Os nomes dos ficheiros incluem um resumo SHA-256 ; compilações diferentes podem exigir ficheiros diferentes. Mantenha o nome do ficheiro descarregado inalterado.

Copie o índice da aplicação instalada e o ficheiro selecionado para um diretório e utilize o CLI da mesma versão:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` apresenta o estado de instalação e verificação, não o nome do ficheiro comprimido. O índice incluído seleciona o ficheiro. A instalação verifica a soma de verificação do ficheiro antes da extração e a soma de verificação do pacote antes de substituir um pacote instalado. Lê ficheiros locais; não descarrega arquivos ausentes. Reinicie a aplicação após a instalação. Se a versão não tiver funcionalidades correspondentes, o pacote opcional não estará disponível nos ativos dessa versão.

## Layout do diretório

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

Tanto `main.js` como `preload.js` são** ficheiros CommonJS `.js`** , e não TypeScript. As tipificações do lado do renderizador residem em `electron/types.d.ts`.

## Ponte IPC (`preload.js`)

O pré-carregamento expõe um API na lista de permissões no `window.electronAPI` utilizando `contextBridge` com `contextIsolation: true` e `nodeIntegration: false`.

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

Métodos expostos:

| Chamada de renderizador                                           | Tipo                           |
| ----------------------------------------------------------------- | ------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invocar                        |
| `openExternal(url)`                                               | invocar                        |
| `getDataDir()`                                                    | invocar                        |
| `restartServer()`                                                 | invocar                        |
| `getAppVersion()`                                                 | invocar                        |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invocar                        |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | enviar                         |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receber (devolve o triturador) |

Os ajudantes de receção devolvem um** função de triturador** em vez de depender de `removeAllListeners` — isto evita a acumulação de ouvintes quando os componentes React são remontados.

## Ciclo de vida do servidor

`main.js` gera o pacote autónomo Next.js diretamente com o tempo de execução do nó Electron para evitar a incompatibilidade do módulo nativo ABI com o nó do sistema:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Destaques:

- `waitForServer()` pesquisa o URL até 30 s antes de mostrar a janela (sem ecrã em branco no arranque a frio).
- `stdio: "pipe"` captura stdout/stderr; frases feitas (`Ready` / `listening`) emitem `server-status: running` sobre IPC.
- `before-quit` espera até 5 s pelo SIGTERM gracioso (ponto de verificação WAL ) e depois envia SIGKILL.
- O comutador de porta na bandeja (`20128`, `3000`, `8080`) pára e reinicia o servidor e recarrega o BrowserWindow.

## Bootstrap secreto de configuração zero

Na primeira inicialização, o processo principal gera automaticamente e persiste os segredos em falta:

| Segredo                  | Fonte                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                  |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (recusa se já existirem credenciais encriptadas) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                  |

Persistiu em `<DATA_DIR>/server.env`. `DATA_DIR` resolve para:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ou `~/.omniroute`
- macOS: `~/.omniroute`

## Pesquisa de ficheiro de ambiente

Antes de gerar o servidor, o processo principal (`getPreferredEnvFilePath()` em `electron/main.js`) escolhe** um** Ficheiro `.env` : o primeiro deles que existe.

1. `$DATA_DIR/.env`, quando `DATA_DIR` está definido no ambiente com o qual a aplicação foi iniciada.
2. `<resolved DATA_DIR>/.env`, utilizando os mesmos padrões anteriores: `%APPDATA%\omniroute\.env` em Windows, `$XDG_CONFIG_HOME/omniroute/.env` ou `~/.omniroute/.env` em Linux e macOS.
3. `.env` no diretório de trabalho do processo.

O processo principal apenas lê esse ficheiro; os candidatos posteriores não são fundidos. O ambiente do servidor é então construído com esta precedência (a mais elevada primeiro):

1. O ambiente do processo Electron (variáveis herdadas de tudo o que iniciou a aplicação).
2. O ficheiro `.env` selecionado.
3. `<DATA_DIR>/server.env` (os segredos do bootstrap acima).

O ambiente do processo é capturado quando a aplicação é iniciada, pelo que uma variável de ambiente do sistema ou do utilizador definida enquanto a aplicação está em execução (incluindo enquanto permanece na bandeja após a janela ser fechada) não chega ao servidor até que a aplicação seja totalmente terminada e reiniciada. Para botões de tempo de execução como `CONTEXT_LENGTH_<PROVIDER>` (consulte [Variáveis de ambiente: comprimento do contexto por fornecedor](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), prefira o ficheiro `.env` e saia completamente (bandeja,** Despedir-se** ) e relançar.

## Janela e tabuleiro

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, semáforo em `{ x: 16, y: 16 }`.
- Windows/Linux: barra de título nativa.
- O botão Fechar minimiza para o tabuleiro; o menu da bandeja tem** Abrir OmniRoute** ,** Abra o painel** (navegador externo),** Porta do servidor** submenu,** Verifique se existem atualizações** ,** Despedir-se** .

## Política de segurança de conteúdos

Definido via `session.defaultSession.webRequest.onHeadersReceived`. Diretivas notáveis:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- O modo Dev adiciona `'unsafe-eval'` apenas ao `script-src`

## Atualização automática

Utiliza `electron-updater` com o fornecedor GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Eventos encaminhados para o renderizador através de `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (com `percent`), `downloaded`, `error`
- `installUpdate()` mata o servidor e depois chama `autoUpdater.quitAndInstall()`
- Ignorado no modo dev (`!app.isPackaged`)

## Construir pipeline

1. `npm run build` → Next.js autónomo em `.next/standalone`.
2. `prepare-electron-standalone.mjs` → é reorganizado em `.next/electron-standalone` e reescreve caminhos absolutos dentro `server.js` + `required-server-files.json` de modo a que o pacote seja relocalizável.
3. pacotes `electron-builder` `main.js`, `preload.js`, `node_modules` e `extraResources: { ../.next/electron-standalone → app }`.

### Construir metas

| OS      | Alvos                                         |
| ------- | --------------------------------------------- |
| Windows | instalador NSIS + portátil (x64)              |
| macOS   | DMG (Intel + arm64, arrastar para aplicações) |
| Linux   | AppImage + DEB (x64 + arm64)                  |

Configurações NSIS : `oneClick: false`, permite ao utilizador escolher o directório de instalação, cria atalhos no ambiente de trabalho e no menu Iniciar.

## Versão empacotada para teste de fumo

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Descobre automaticamente o binário empacotado em `electron/dist-electron/` para a plataforma atual.
- É lançado com diretórios `HOME`/`APPDATA`/`XDG_*` isolados para não afetar os dados do programador.
- Pesquisa `http://127.0.0.1:20128/login` para HTTP 200 em 45 s.
- Observa stderr/stdout em busca de padrões fatais (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, etc.).
- Aguarda 2 s de tempo de execução estável após a prontidão, depois emite SIGTERM e aguarda a libertação da porta.
- Em CI, passa automaticamente `--no-sandbox --disable-gpu` (e `--disable-dev-shm-usage` em Linux).

Substituições de ambiente: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Assinatura de código

`electron/package.json` faz** não** transferir as credenciais de assinatura diretamente. Passe-os via env vars para `electron-builder`:

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

A assinatura AppImage é opcional — set `LINUX_GPG_KEY` se estiver a assinar.

## Distribuição

Artefactos pousam em `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

As versões são publicadas em GitHub Releases (`diegosouzapw/OmniRoute`), que é também onde `electron-updater` verifica as novas versões.

## Solução de problemas

| Sintoma                                                            | Corrigir                                                                                                                                                           |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` após Electron grande colisão | better-sqlite3 v13 envia pré-construções Node-API — executa novamente `npm install` na raiz e `prepare:bundle` (verifica a pré-construção para a plataforma atual) |
| `ERR_DLOPEN_FAILED` para módulo nativo                             | Execute novamente `prepare:bundle` — falha rapidamente quando a pré-construção da API do Nó para a plataforma atual está em falta                                  |
| A janela aparece em branco no Linux                                | Confirme se o servidor Next.js está realmente ligado ao PORT (verificar os registos `[Server]` )                                                                   |
| tendas de reconhecimento de firma macOS                            | Certifique-se de `APPLE_*` vars são exportados, e não apenas em `.env`                                                                                             |
| aviso Windows SmartScreen                                          | Subscreva com EV cert ou os utilizadores cliquem com o botão direito do rato em → "Executar mesmo assim"                                                           |
| O teste de fumo falha com porta em uso                             | Pare qualquer servidor de desenvolvimento local em 20128 antes de executar `electron:smoke:packaged`                                                               |

## Veja também

- [SETUP_GUIDE](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST](../ops/RELEASE_CHECKLIST.md)
- Fonte: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Ajudantes: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
