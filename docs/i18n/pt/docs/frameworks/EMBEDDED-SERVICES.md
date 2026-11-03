# Embedded Services (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Versão:** v3.8.44** Última atualização:** 28/10/2026** Audiência:** Engenheiros a adicionar, manter ou depurar serviços incorporados (9Router, CLIProxyAPI, Mux, Bifrost, open-wa, LLMLingua, sing-box).

Os serviços incorporados são ferramentas secundárias de processo instaladas localmente que OmniRoute instala, supervisiona e expõe como alvos de encaminhamento de primeira classe. Ao contrário dos fornecedores externos (que são acedidos pela Internet através de chaves API ), os serviços incorporados são executados na mesma máquina que OmniRoute e comunicam por loopback.

---

## Índice

1. [Visão geral](#1-overview)
2. [Arquitetura — 4 camadas](#2-architecture--4-layers)
3. [Máquina de estados do ciclo de vida](#3-lifecycle-state-machine)
4. [Referência da API](#4-api-reference)
5. [Segurança](#5-security)
6. [Adicionar um novo serviço incorporado](#6-adding-a-new-embedded-service)
7. [Resolução de problemas](#7-troubleshooting)
8. [Perguntas frequentes](#8-faq)

---

## 1. Visão geral

### Porquê serviços incorporados?

Oito serviços estão incorporados:

| Serviço             | pacote npm                                | Porta padrão | Finalidade                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------- | ----------------------------------------- | :----------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **9Router**         | `9router`                                 |    20130     | router AI que OmniRoute pode utilizar como subfornecedor. Modelos expostos como `9router/{sub}/{model}`                                                                                                                                                                                                                                                                                   |
| **CLIProxyAPI**     | binário de libertação GitHub (`cliproxy`) |     8317     | Adaptador de proxy local para fluxos de autenticação Anthropic CLI. Fornece um encaminhamento substituto quando os tokens OAuth expiram                                                                                                                                                                                                                                                   |
| **Mux**             | `mux` ( `mux server` sem cabeça)          |     8322     | Daemon de orquestração de agentes locais (coder/mux). Apenas — gerido pelo ciclo de vida, não um destino de encaminhamento (sem proxy LLM ).                                                                                                                                                                                                                                              |
| **Bifrost**         | `@maximhq/bifrost`                        |     8080     | Vá para o back-end de retransmissão do gateway AI. Ao executar, selecionado automaticamente pela rota de retransmissão (`/v1/relay/`)                                                                                                                                                                                                                                                     |
| **Dário**           | `@askalf/dario`                           |     3456     | Claude — alternative/failover assinatura proxy para CLIProxyAPI para tráfego em formato Claude-Code; a chave injetada passa a ser `DARIO_ADMIN_TOKEN` bloqueando o seu plano de controlo `/admin/*` OAuth                                                                                                                                                                                 |
| **abrir-wa**        | `@open-wa/wa-automate`                    |     8323     | Automação WhatsApp Web (Chromium headless via Puppeteer). Apenas — gerido pelo ciclo de vida não é um destino de encaminhamento.                                                                                                                                                                                                                                                          |
| **LLMLingua**       | `@atjsh/llmlingua-2`                      |    20135     | Modelo sidecar de compressão de prompt — real LLMLingua-2 ONNX (porta JS/TS do algoritmo de Microsoft). `open-sse/services/compression/engines/llmlingua/index.ts` despacha `/compress` sobre HTTP para ele, voltando para o back-end do thread de trabalho em processo quando o ficheiro secundário está inativo. Apenas — gerido pelo ciclo de vida não é um destino de encaminhamento. |
| **caixa de cantar** | binário de libertação GitHub (`singbox`)  |    20140     | TPROXY sidecar suportando a interceção de proxy transparente do `applyTproxy()`(`src/mitm/tproxy/setup.ts`). O instalador descarrega a versão fixada e verificada pela soma de verificação. Apenas — gerido pelo ciclo de vida, não um destino de encaminhamento (sem proxy LLM )                                                                                                         |

Todos os oito seguem o mesmo modelo de supervisão:

- OmniRoute instala-os em `DATA_DIR/services/{name}/` (isolado do próprio OmniRoute `package.json`)
- OmniRoute gera-os e monitoriza-os como processos filhos
- OmniRoute injeta uma chave API efémera no ambiente filho e roda-a sem tempo de inatividade (quando aplicável)
- Todas as rotas de gestão (`/api/services/*`) são**LOCAL_ONLY** — apenas acessível por loopback (regra rígida nº 17)

### Principais decisões (do plano de design)

| Decisão                               | Valor                                                                            |
| ------------------------------------- | -------------------------------------------------------------------------------- |
| Acesso ao painel UI nativo do 9Router | Proxy reverso em `/dashboard/providers/services/9router/embed/*`                 |
| Mecanismo de instalação               | `npm install {package}` via `execFile` (sem interpolação de shell)               |
| Modo de consumo                       | Fornecedor registado como `9router/{sub}/{model}` no mecanismo de encaminhamento |
| gestão de chaves API                  | OmniRoute gera, encripta em repouso (AES-256-GCM) e injecta via env              |
| Localização do painel                 | `/dashboard/providers/services` (três guias)                                     |
| Início automático                     | Alternar por serviço, OFF padrão                                                 |

---

## 2. Arquitetura — 4 camadas

```
┌────────────────────────────────────────────────────────────────────┐
│  Layer 1 — UI                                                      │
│  /dashboard/providers/services  (tabs: CLIProxyAPI | 9Router | Mux)│
│  Logs live (SSE), Start/Stop/Restart/Update, Settings, Install     │
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Shell + tab routing by ?tab=         │
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (Next.js fetch)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Layer 2 — API (LOCAL_ONLY — loopback only)                        │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (reverse HTTP + WebSocket proxy → 9Router upstream)             │
│                                                                    │
│  Gate: LOCAL_ONLY_API_PREFIXES includes "/api/services/" and       │
│        "/dashboard/providers/services/*/embed/"                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ in-process calls
┌──────────────────────▼─────────────────────────────────────────────┐
│  Layer 3 — ServiceSupervisor (src/lib/services/)                   │
│                                                                    │
│  ServiceSupervisor.ts   Generic supervisor (child_process.spawn)   │
│    ├── install:    execFile('npm', ['install', pkg, '--prefix'])    │
│    ├── start:      spawn(node, [entrypoint], {env, cwd})           │
│    ├── api_key:    crypto.randomBytes(32) → env NINEROUTER_API_KEY  │
│    ├── port:       20130 for 9Router (configurable)                │
│    ├── logs:       stdio ring buffer 5 MB → SSE events             │
│    ├── health:     HTTP GET /health every 2–5 s, lazy recovery     │
│    └── lifecycle:  SIGTERM 15 s → SIGKILL                          │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Bootstraps all SERVICES[] at process start     │
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       Periodic GET /v1/models → service_models table │
│  ringBuffer.ts      Circular log buffer (5 MB per service)         │
│  healthCheck.ts     Polling HTTP health probe                      │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts, openwa.ts  │
│                      (installer adapters)                          │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ OpenAI-compatible HTTP (loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Layer 4 — Provider / Routing                                      │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Re-looks up port and API key per-request (no caching).          │
│    Strips "9router/" prefix from model id before proxying.         │
│    Returns 503 service_not_running if supervisor not in "running". │
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Entry for "9router": isEmbeddedService: true                    │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Models stored as "9router/{sub}/{model}" (prefixed).            │
│    Synced every 5 min by modelSync.ts.                             │
│                                                                    │
│  Mux is lifecycle-managed ONLY (Layers 1-3) — it is an agent-       │
│  orchestration daemon, not an LLM proxy, so it has no Layer 4      │
│  executor/provider entry and is never a routing target.            │
└────────────────────────────────────────────────────────────────────┘
```

### Principais ficheiros de origem

| Ficheiro                                    | Papel                                                                  |
| ------------------------------------------- | ---------------------------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | Classe principal: ciclo de vida, bloqueio, integridade, buffer de anel |
| `src/lib/services/bootstrap.ts`             | Registo ao nível de processo e início automático                       |
| `src/lib/services/registry.ts`              | Mapa singleton `tool → supervisor`                                     |
| `src/lib/services/apiKey.ts`                | Geração de chaves, encriptação AES-256-GCM em repouso                  |
| `src/lib/services/modelSync.ts`             | Sincronização periódica do modelo (5 min) + a pedido                   |
| `src/lib/services/ringBuffer.ts`            | 5 buffer de registo circular MB com assinatura SSE                     |
| `src/lib/services/healthCheck.ts`           | Sonda de integridade HTTP (intervalo configurável)                     |
| `src/lib/services/installers/ninerouter.ts` | npm install/update/uninstall para 9Router                              |
| `src/lib/services/installers/cliproxy.ts`   | npm install/update/uninstall para CLIProxyAPI                          |
| `src/lib/services/installers/mux.ts`        | npm install/update/uninstall para Mux                                  |
| `src/lib/services/installers/openwa.ts`     | npm install/update/uninstall para open-wa                              |
| `src/lib/services/installers/llmlingua.ts`  | npm install/update/uninstall para LLMLingua                            |
| `src/app/api/services/9router/_lib.ts`      | ajudante `getOrInitSupervisor()`                                       |
| `src/app/api/services/[name]/logs/route.ts` | Endpoint de registos SSE partilhado                                    |
| `open-sse/executors/ninerouter.ts`          | Executor do fornecedor (camada 4)                                      |

---

## 3. Máquina de estados do ciclo de vida

```
                    install()
  ┌─────────────┐ ──────────► ┌─────────────┐
  │ not_installed│             │   stopped   │◄──────────────────┐
  └─────────────┘             └──────┬──────┘                   │
                                     │ start()                   │
                                     ▼                           │ stop()
                               ┌──────────┐                      │
                               │ starting │                      │
                               └────┬─────┘                     │
           verificação de saúde ok  │      falha / SIGTERM      │
                               ┌────▼─────┐  (saída em 5 s)     │
                               │ running  │──── falha ──────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Os estados são armazenados na tabela `version_manager` da BD (coluna `status`) e
replicados no estado em memória de `ServiceSupervisor`. O estado em memória é a
fonte autoritativa para um processo em execução; o estado da BD é a alternativa
persistente durante o arranque.

### Transições de estado

| De              | Evento                                     | Para                   |
| --------------- | ------------------------------------------ | ---------------------- |
| `not_installed` | `install()` é concluído com êxito          | `stopped`              |
| `stopped`       | `start()` é chamado                        | `starting`             |
| `starting`      | a verificação de saúde devolve 200         | `running`              |
| `starting`      | o processo termina antes de estar saudável | `error`                |
| `running`       | `stop()` é chamado                         | `stopping` → `stopped` |
| `running`       | o processo termina inesperadamente (< 5 s) | `error` (falha rápida) |
| `running`       | o processo termina inesperadamente (> 5 s) | `error`                |
| `error`         | `start()` é chamado                        | `starting`             |
| qualquer        | `stop()` durante `stopping`                | nenhuma operação       |

### Bloqueio de operações

`ServiceSupervisor` serializa as operações do ciclo de vida através de um bloqueio
assíncrono de operações (`withLock()`). Chamadas simultâneas a `start()` no mesmo
supervisor resultam na criação de exatamente um processo; o segundo autor aguarda
e devolve o estado existente. Isto evita condições de corrida quando, por exemplo,
o arranque automático e um botão da IU são acionados simultaneamente.

---

## 4. referência API

Todas as rotas sob `/api/services/` são**LOCAL_ONLY** (apenas loopback, regra rígida nº 17). Os pedidos sem loopback recebem `403 LOCAL_ONLY` independentemente do token de autenticação.

### 4.1 9 Terminais do router (11 rotas)

#### `POST /api/services/9router/install`

Instale o 9Router a partir do npm. Cria `DATA_DIR/services/9router/` com os seus próprios `package.json` e `node_modules/`. Não entra em conflito com as próprias dependências do OmniRoute.

**Solicitar corpo** (todos opcionais):

```json
{ "version": "latest" }
```

| Campo     | Tipo     | Predefinição | Descrição                                 |
| --------- | -------- | ------------ | ----------------------------------------- |
| `version` | `string` | `"latest"`   | tag de versão npm ou semver para instalar |

**Respostas:**

| Estatuto | Descrição                                              |
| -------- | ------------------------------------------------------ |
| `200`    | `{ ok: true, installedVersion: "x.y.z", path: "..." }` |
| `400`    | Corpo do pedido inválido (falha na validação Zod )     |
| `409`    | Já a instalar (bloqueio mantido)                       |
| `500`    | npm install failed — ver `message` para erro amigável  |

**Notas:** Utiliza `execFile('npm', [...])` — sem shell, sem interpolação (regra rígida nº 13). Os erros EACCES são apresentados como mensagens amigáveis.

---

#### `POST /api/services/9router/start`

Inicie o 9Router. Regista um supervisor, se ainda não estiver registado, e depois chama `supervisor.start()`. Idempotente quando já está em execução.

**Corpo do pedido:** nenhum

**Respostas:**

| Estatuto | Descrição                                                   |
| -------- | ----------------------------------------------------------- |
| `200`    | objeto `ServiceStatus` (ver esquema abaixo)                 |
| `409`    | 9O router não está instalado (`status: "not_installed"`)    |
| `503`    | Falha na inicialização (erro de processo — ver `lastError`) |

**esquema ServiceStatus :**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null
}
```

---

#### `POST /api/services/9router/stop`

Pare graciosamente o 9Router. Envia SIGTERM, espera 15 s e SIGKILL se ainda estiver vivo. Idempotente quando já parado.

**Corpo do pedido:** nenhum

**Respostas:**

| Estatuto | Descrição                          |
| -------- | ---------------------------------- |
| `200`    | `ServiceStatus` (estado: "parado") |
| `503`    | A paragem falhou inesperadamente   |

---

#### `POST /api/services/9router/restart`

Equivalente a `stop()` e `start()` no bloqueio de operação.

**Corpo do pedido:** nenhum

**Respostas:** igual a `start` (retorna final `ServiceStatus`).

---

#### `POST /api/services/9router/update`

Atualiza o 9Router para uma versão npm mais recente. Se o serviço estiver em execução, será interrompido primeiro, será executado npm install (instalando a versão mais recente no local) e, em seguida, o serviço será reiniciado.

**Solicitar corpo** (todos opcionais):

```json
{ "version": "latest" }
```

**Respostas:**

| Estatuto | Descrição                                                       |
| -------- | --------------------------------------------------------------- |
| `200`    | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`    | Corpo inválido                                                  |
| `500`    | atualização do npm falhou                                       |

---

#### `POST /api/services/9router/rotate-key`

Gera uma nova chave API para o 9Router, encripta-a em repouso e reinicia o serviço (se estiver a ser executado) para que este apanhe a nova chave do seu ambiente. A chave antiga é invalidada imediatamente.

**Corpo do pedido:** nenhum

**Respostas:**

| Estatuto | Descrição                                  |
| -------- | ------------------------------------------ |
| `200`    | `{ keyRotated: true, restarted: boolean }` |
| `500`    | Falha na rotação                           |

**Segurança:** A nova chave nunca é devolvida na resposta (sem fuga de credencial). É armazenado encriptado (AES-256-GCM) na tabela `version_manager`.

---

#### `GET /api/services/9router/status`

Retorna o estado + DB combinado ao vivo, incluindo metadados de versão e visualização da chave API.

**Respostas:**

| Estatuto | Descrição                  |
| -------- | -------------------------- |
| `200`    | Veja esquema abaixo        |
| `500`    | Falha na leitura do estado |

**Esquema de resposta:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null,
  "installedVersion": "1.2.3",
  "latestVersion": "1.2.4",
  "updateAvailable": true,
  "apiKeyMasked": "nr_****abcd",
  "autoStart": false,
  "providerExpose": false
}
```

---

#### `POST /api/services/9router/auto-start`

Alterne o sinalizador de início automático. Quando `enabled: true`, o serviço será iniciado automaticamente na próxima vez que OmniRoute for inicializado (se o serviço estiver instalado).

**Corpo do pedido:**

```json
{ "enabled": true }
```

**Respostas:**

| Estatuto | Descrição             |
| -------- | --------------------- |
| `200`    | `{ autoStart: true }` |
| `400`    | Corpo inválido        |

---

#### `GET /api/services/9router/logs`

SSE stream de registos ao vivo do buffer de anel stdout/stderr do 9Router.

**Parâmetros de consulta:**

| Parâmetro | Tipo      | Predefinição | Descrição                                                                               |
| --------- | --------- | ------------ | --------------------------------------------------------------------------------------- |
| `tail`    | `integer` | 200          | Quantas linhas históricas enviar primeiro (máximo de 1.000)                             |
| `filter`  | `string`  | nenhum       | Filtro de substring que não distingue maiúsculas de minúsculas (sem regex — ReDoS-safe) |

**eventos SSE :**

| Evento      | Dados       | Descrição                |
| ----------- | ----------- | ------------------------ |
| `snapshot`  | `LogLine[]` | Cauda histórica inicial  |
| `log`       | `LogLine`   | Linha de registo ao vivo |
| `heartbeat` | `{}`        | Keep-alive a cada 15 s   |

**esquema LogLine :**

```json
{ "ts": 1716633600000, "stream": "stdout", "line": "[9router] Listening on :20130" }
```

**Respostas:**

| Estatuto | Descrição                                             |
| -------- | ----------------------------------------------------- |
| `200`    | `text/event-stream`                                   |
| `400`    | Parâmetro `filter` demasiado longo (> 200 caracteres) |
| `404`    | Serviço não encontrado (supervisor não registado)     |

---

### 4.2 terminais CLIProxyAPI (10 rotas)

CLIProxyAPI tem o mesmo formato de ponto final que 9Router menos `rotate-key`, mais `accounts`, `provider-expose` e `auto-restart-adopted`. Agora recebe uma chave API plano de dados dedicada injetada no spawn (`needsApiKey: true` in `bootstrap.ts`, utilizada para sincronização de modelos); `status` inclui menos campos.

| Método | Percurso                            | Descrição                                |
| ------ | ----------------------------------- | ---------------------------------------- |
| `POST` | `/api/services/cliproxy/install`    | Instale CLIProxyAPI do npm               |
| `POST` | `/api/services/cliproxy/start`      | Iniciar CLIProxyAPI                      |
| `POST` | `/api/services/cliproxy/stop`       | Pare CLIProxyAPI                         |
| `POST` | `/api/services/cliproxy/restart`    | Reinicie CLIProxyAPI                     |
| `POST` | `/api/services/cliproxy/update`     | Atualizar para uma versão mais recente   |
| `GET`  | `/api/services/cliproxy/status`     | Estado + DB ao vivo (sem `apiKeyMasked`) |
| `POST` | `/api/services/cliproxy/auto-start` | Alternar arranque automático             |

O endpoint partilhado `GET /api/services/{name}/logs` (ver §4.1) funciona para todos os quatro serviços utilizando o segmento dinâmico `[name]`.

---

### 4.3 Terminais Mux (8 rotas)

O mux tem o mesmo formato de ponto final que CLIProxyAPI — na route `rotate-key` na superfície API (o token do portador é gerado da mesma forma que o 9Router através do `getOrCreateApiKey("mux")` e injetado através do `MUX_SERVER_AUTH_TOKEN` env var, mas ainda não existe um ponto final de rotação dedicado). O Mux é gerido apenas pelo ciclo de vida: ao contrário do 9Router, não tem executor de Camada 4 e nunca está registado como fornecedor de encaminhamento.

| Método | Percurso                       | Descrição                                  |
| ------ | ------------------------------ | ------------------------------------------ |
| `POST` | `/api/services/mux/install`    | Instale o Mux do npm (`npm i mux`)         |
| `POST` | `/api/services/mux/start`      | Iniciar Mux (`mux server`)                 |
| `POST` | `/api/services/mux/stop`       | Pare Mux                                   |
| `POST` | `/api/services/mux/restart`    | Reinicie o Mux                             |
| `POST` | `/api/services/mux/update`     | Atualize para a versão mais recente do npm |
| `GET`  | `/api/services/mux/status`     | Estado + DB ao vivo                        |
| `POST` | `/api/services/mux/auto-start` | Alternar arranque automático               |

---

### 4.4 Terminais Bifrost (8 rotas)

Bifrost é um back-end de retransmissão de gateway Go AI (`@maximhq/bifrost`). Utiliza o mesmo formato de endpoint que CLIProxyAPI (nenhum `rotate-key` — Bifrost gere as suas próprias chaves de fornecedor no `config.json` sob o seu `-app-dir`).

| Método | Percurso                           | Descrição                                             |
| ------ | ---------------------------------- | ----------------------------------------------------- |
| `POST` | `/api/services/bifrost/install`    | Instale o Bifrost do npm (`@maximhq/bifrost`)         |
| `POST` | `/api/services/bifrost/start`      | Inicie o Bifrost na porta 8080 (padrão)               |
| `POST` | `/api/services/bifrost/stop`       | Pare o Bifrost                                        |
| `POST` | `/api/services/bifrost/restart`    | Reinicie o Bifrost                                    |
| `POST` | `/api/services/bifrost/update`     | Atualizar para uma versão mais recente                |
| `GET`  | `/api/services/bifrost/status`     | Estado + DB ao vivo                                   |
| `POST` | `/api/services/bifrost/auto-start` | Alternar arranque automático                          |
| `GET`  | `/api/services/bifrost/logs`       | SSE log tail (via `[name]/logs` dynamic route shared) |

**Cablagem de encaminhamento:** Quando `BIFROST_BASE_URL` não está definido e a instância supervisionada do Bifrost está em execução, `getBifrostRoutingConfig()` (em `routingBackend.ts`) utiliza automaticamente `http://127.0.0.1:{port}` como base de retransmissão URL. O env `BIFROST_BASE_URL` explícito tem sempre precedência.

---

### 4.5 Terminais Dario (12 percursos)

A mesma forma de ciclo de vida dos outros serviços (`install`, `start`, `stop`, `restart`, `update`, `status`, `auto-start`, `auto-restart-adopted`) mais um plano de controlo OAuth controlado por token sob `admin/`: `admin/accounts`, `admin/import-from-omniroute`, `admin/login-start`, `admin/login-complete` (todos atrás de `DARIO_ADMIN_TOKEN`).

### 4.6 endpoints open-wa (7 rotas)

open-wa (`@open-wa/wa-automate`) conduz uma instância headless do Chromium (via Puppeteer) para automatizar WhatsApp Web. Utiliza o mesmo formato de endpoint do Mux (ainda não existe uma rota `rotate-key` ). É gerido pelo ciclo de vida apenas — não é um alvo de encaminhamento, não há entrada executor/provider da Camada 4.

| Método | Percurso                          | Descrição                                             |
| ------ | --------------------------------- | ----------------------------------------------------- |
| `POST` | `/api/services/openwa/install`    | Instale o open-wa do npm (`@open-wa/wa-automate`)     |
| `POST` | `/api/services/openwa/start`      | Inicie o open-wa na porta 8323 (padrão)               |
| `POST` | `/api/services/openwa/stop`       | Pare de abrir                                         |
| `POST` | `/api/services/openwa/restart`    | Reinicie o open-wa                                    |
| `POST` | `/api/services/openwa/update`     | Atualizar para uma versão mais recente                |
| `GET`  | `/api/services/openwa/status`     | Estado + DB ao vivo                                   |
| `POST` | `/api/services/openwa/auto-start` | Alternar arranque automático                          |
| `GET`  | `/api/services/openwa/logs`       | SSE log tail (via `[name]/logs` dynamic route shared) |

**chave API :** injectado como `WA_KEY` — open-wa generic `WA_*` -prefixed env override mapeia-o na opção `--key`/`-k` CLI (`dist/cli/setup.js::envArgs()`, verificado em relação ao pacote 4.76.0 instalado). `ow_` com prefixo quando gerado por `generateServiceApiKey()`. open-wa lê a chave de um cabeçalho `key`/`api_key` HTTP (não `Authorization: Bearer`); `/api-docs*` está explicitamente isento da verificação (`setupAuthenticationLayer` in `dist/cli/server.js`), pelo que a investigação de integridade não necessita de cabeçalho de autenticação.

**Emparelhamento:** o open-wa não é oficial e não está afiliado ao WhatsApp — o número ligado acarreta um risco de banimento da própria detecção de automação do WhatsApp. Na primeira inicialização, o código QR de emparelhamento é impresso em stdout e apresentado através do fluxo panel/SSE Logs existente — ainda não existe um endpoint de imagem QR dedicado nesta integração.

---

### 4,7 terminais LLMLingua (8 rotas)

LLMLingua é um sidecar de compressão imediata `@atjsh/llmlingua-2` (modelo real de classificação de tokens ONNX, descarregado de Hugging Face na primeira chamada `/compress` ). Utiliza o mesmo formato de endpoint do Bifrost (sem chave API — `needsApiKey: false`, nunca lida com credenciais).

| Método | Percurso                                       | Descrição                                                                         |
| ------ | ---------------------------------------------- | --------------------------------------------------------------------------------- |
| `POST` | `/api/services/llmlingua/install`              | npm-install `@atjsh/llmlingua-2` + peers, escreva o script do servidor secundário |
| `POST` | `/api/services/llmlingua/start`                | Inicie o sidecar na porta 20135 (padrão)                                          |
| `POST` | `/api/services/llmlingua/stop`                 | Pare o carro lateral                                                              |
| `POST` | `/api/services/llmlingua/restart`              | Reinicie o carro lateral                                                          |
| `POST` | `/api/services/llmlingua/update`               | Atualize para a versão mais recente do pacote                                     |
| `GET`  | `/api/services/llmlingua/status`               | Estado + DB ao vivo                                                               |
| `POST` | `/api/services/llmlingua/auto-start`           | Alternar arranque automático                                                      |
| `POST` | `/api/services/llmlingua/auto-restart-adopted` | Alternar a reinicialização automática de uma instância adotada (pré-existente)    |
| `GET`  | `/api/services/llmlingua/logs`                 | SSE log tail (via `[name]/logs` dynamic route shared)                             |

**Contrato de carro secundário:** o script do servidor expõe `GET /health` ( — instantâneo não espera no modelo) e `POST /compress` (`{ text, rate }` → `{ text, compressed, ratio }`). O modelo carrega lentamente na primeira chamada `/compress`.

**Cablagem de compressão:** `open-sse/services/compression/engines/llmlingua/index.ts`'s `httpSidecarBackend` chama `LLMLINGUA_BASE_URL` (padrão `http://127.0.0.1:20135`) e só aceita a resposta do sidecar quando esta é estritamente menor que a entrada; qualquer falha (não execução, tempo limite, resposta não operacional) regressa ao back-end do thread de trabalho em processo (`./worker.ts`).

---

### 4.8 terminais de caixa única (8 rotas)

sing-box tem o mesmo formato de endpoint que Mux — sem rota `rotate-key`, sem injecção de chave API (`needsApiKey: false` in `bootstrap.ts`). É gerido apenas pelo ciclo de vida: nunca é um fornecedor routing/LLM. `install()` descarrega o binário de lançamento oficial GitHub (`SagerNet/sing-box`) para a versão fixada (`SINGBOX_PINNED_VERSION` em `src/lib/services/installers/singbox.ts`) e verifica o seu SHA256 em relação a uma soma de verificação introduzida no mesmo ficheiro antes de o gravar no disco. — qualquer outra versão solicitada é rejeitada.

| Método | Percurso                                     | Descrição                                                                      |
| ------ | -------------------------------------------- | ------------------------------------------------------------------------------ |
| `POST` | `/api/services/singbox/install`              | Descarregue + para verificar a versão fixada do sing-box                       |
| `POST` | `/api/services/singbox/start`                | Inicie a caixa de canto (`sing-box run -c config.json`)                        |
| `POST` | `/api/services/singbox/stop`                 | Pare de cantar                                                                 |
| `POST` | `/api/services/singbox/restart`              | Reinicie o sing-box                                                            |
| `POST` | `/api/services/singbox/update`               | Re-verify/reinstall o lançamento fixado                                        |
| `GET`  | `/api/services/singbox/status`               | Estado + DB ao vivo                                                            |
| `POST` | `/api/services/singbox/auto-start`           | Alternar arranque automático                                                   |
| `POST` | `/api/services/singbox/auto-restart-adopted` | Alternar a reinicialização automática para um processo adotado (pré-existente) |
| `GET`  | `/api/services/singbox/logs`                 | SSE log tail (via `[name]/logs` dynamic route shared)                          |

**cablagem TPROXY :** `ensureSingboxTproxy()` (`src/mitm/tproxy/setup.ts`) escreve `config.json` e inicia o supervisor antes de `applyTproxy()` instalar as regras de firewall TPROXY. Se o supervisor estiver ausente ou não conseguir alcançar `running`, irá agora registar no nível de erro (em vez de engolir silenciosamente a falha) para que um operador possa informar que as regras TPROXY foram aplicadas sem um ouvinte ativo por trás delas.

---

### 4.9 Proxy reverso (incorporação do painel do 9Router)

O painel incorpora o 9Router web UI dentro de um iframe através de um proxy reverso interno em:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Este proxy:

- Encaminha o pedido para `http://127.0.0.1:{port}/{path}` (somente loopback)
- Remove os cabeçalhos `cookie` e `authorization` de entrada (sem fuga da sessão OmniRoute )
- Injeta `Authorization: Bearer {apiKey}` para autenticação 9Router
- Retira `set-cookie`, `content-security-policy`, `x-frame-options`, `cross-origin-*` da resposta
- Reescreve as respostas HTML para injectar `<base href>` e normalizar caminhos absolutos (`/foo` → `/dashboard/.../embed/foo`)

As atualizações WebSocket para o painel integrado são geridas por um servidor complementar numa porta dedicada (consulte `src/lib/services/embedWsProxy.ts`).

**Segurança:** As rotas de proxy incorporadas são classificadas em `LOCAL_ONLY_API_PREFIXES` e só podem ser acedidas através de loopback. Um atacante que obtenha um JWT através de um túnel Cloudflare/Ngrok não pode fazer proxy em serviços incorporados.

---

## 5. Segurança

### Aplicação de LOCAL_ONLY (regra rígida n.º 17)

Todas as rotas em `/api/services/` e `/dashboard/providers/services/*/embed/` estão
classificadas como LOCAL_ONLY em `src/server/authz/routeGuard.ts`. A verificação de
loopback é executada incondicionalmente antes de qualquer ramo de autenticação:

```
o pedido chega
  → isLocalOnlyPath(path)?
      → não loopback → 403 LOCAL_ONLY (sempre, antes da verificação de autenticação)
      → loopback     → prossegue para a autenticação normal
```

Isto impede que um JWT exposto (por exemplo, através de um túnel) acione `npm install`
ou a criação de processos. Consulte `docs/security/ROUTE_GUARD_TIERS.md` para obter a
matriz completa de níveis.

### Injeção de chaves de API

O 9Router e o Mux requerem uma chave de API/token bearer para os respetivos endpoints
HTTP. O OmniRoute:

1. Gera uma chave através de `crypto.randomBytes(32).toString("base64url")` com um
   prefixo específico do serviço (`nr_` para o 9Router, `mx_` para o Mux).
2. Encripta-a em repouso utilizando AES-256-GCM (a mesma cifra utilizada para as
   credenciais dos fornecedores).
3. Desencripta-a e injeta-a como uma variável de ambiente no momento da criação do
   processo — `NINEROUTER_API_KEY` para o 9Router, `MUX_SERVER_AUTH_TOKEN` para o Mux
   (nunca como um sinalizador da CLI, para que o token nunca apareça em `ps`/listagens
   de processos).
4. Nunca devolve a chave em texto simples em qualquer resposta HTTP.

O CLIProxyAPI recebe uma chave dedicada do plano de dados, injetada no momento da
criação do processo (`needsApiKey: true` — utilizada para a sincronização de modelos
com o adaptador).

### Defesa contra SSRF

O proxy HTTP inverso (`/dashboard/.../embed/[...path]`) está codificado para reencaminhar
apenas para `http://127.0.0.1:{port}`. Nunca segue redirecionamentos para destinos que
não sejam loopback. A biblioteca `ssrf-req-filter` é utilizada para rejeitar qualquer
URL upstream que seja resolvido para fora do intervalo de loopback.

### Segurança da shell (regra rígida n.º 13)

`npm install` é invocado através de `execFile('npm', ['install', pkg, '--prefix', dir])` —
sem template literals, sem shell e sem interpolação de caminhos externos na cadeia de
comando. Os valores de execução (portas, chaves de API) são transmitidos através do
objeto `env` do processo filho.

### Saneamento de erros (regra rígida n.º 12)

Todas as respostas de erro de `/api/services/*` passam por `buildErrorBody()` ou
`sanitizeErrorMessage()`. Os valores brutos de `err.stack` e `err.message` nunca são
devolvidos literalmente ao cliente.

---

## 6. Adicionar um novo serviço incorporado

Siga estes 8 passos. Consulte as implementações existentes em `src/lib/services/installers/`
e `src/app/api/services/` como referência canónica.

### Passo 1 — Criar o instalador

Crie `src/lib/services/installers/{name}.ts` com base em `ninerouter.ts`:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // escolha uma porta livre

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Utilize `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` de `installers/utils.ts`
— nunca `execSync` nem interpolação da shell.

### Passo 2 — Registar no bootstrap

Adicione uma `ServiceEntry` ao array `SERVICES` em `src/lib/services/bootstrap.ts`:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false se não for necessária uma chave de API
}
```

Expanda `buildSpawnArgsFactory()` para processar `cfg.tool === "myservice"`.

#### Contrato de plugin de fornecedor extensível (Fase 1, #7333)

`src/lib/services/providerPlugins/` introduz um contrato `ServiceProviderPlugin` que
agrega os campos `ServiceEntry` do `bootstrap.ts` de um backend e os campos de modelo
de manifesto de `serviceBackends.ts` num único objeto, em vez de a estrutura do mesmo
backend ser expressa separadamente em dois ficheiros sem relação entre si. À data da
redação deste documento, **apenas `9router` foi migrado** — `bootstrap.ts` deriva a sua
entrada `SERVICES[]` de `getServiceProviderPlugin("9router")`
(`src/lib/services/providerPlugins/registry.ts`), lançando um erro de arranque se o
plugin estiver ausente. `cliproxy`, `mux` e `bifrost` permanecem inalterados nos
literais `SERVICES[]` inline preexistentes.

`open-sse/config/providerPluginManifest.ts` também recebeu uma função auxiliar aditiva
`createServiceBackendManifestEntry(pluginId, template)`, que cria uma
`ProviderPluginManifestEntry` bem formada a partir de uma entrada
`SERVICE_BACKEND_MANIFEST_TEMPLATE` — **ainda não** está ligada a qualquer fluxo de
pedidos ativo (nem `generateProviderPluginManifestFromRegistry()` nem
`/v1/providers/[provider]/models`); isso fica para uma etapa posterior, depois de o
contrato ser validado para um segundo backend.

Adiado para PRs posteriores, acompanhado no âmbito do issue #7333: migrar
`cliproxyapi` através do mesmo registo, generalizar `mux`/`bifrost` na união
`ServiceBackendPluginId`, integrar no contrato do plugin os casos especiais de
encaminhamento do executor (`open-sse/executors/index.ts`,
`open-sse/handlers/chatCore/executorProxy.ts`) e ligar
`createServiceBackendManifestEntry()` a um fluxo ativo de código de manifesto/modelos.

### Passo 3 — Adicionar a migração e os dados iniciais da BD

Certifique-se de que o serviço tem uma linha em `version_manager` através de uma
migração em `src/lib/db/migrations/`. A linha deve conter:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Passo 4 — Criar os 7 endpoints da API

Em `src/app/api/services/{name}/`:

```
_lib.ts            função auxiliar getOrInitSupervisor()
install/route.ts   POST — chama installer.install()
start/route.ts     POST — chama supervisor.start()
stop/route.ts      POST — chama supervisor.stop()
restart/route.ts   POST — chama supervisor.restart()
update/route.ts    POST — chama installer.update()
status/route.ts    GET  — combina o estado em tempo real com o estado da BD
auto-start/route.ts POST — alterna o sinalizador auto_start
```

A rota partilhada `GET /api/services/[name]/logs` já está configurada — não são necessárias alterações aí.

Delegue todas as respostas de erro através de `createErrorResponse()` / `buildErrorBody()`.

### Passo 5 — Adicionar a LOCAL_ONLY_API_PREFIXES

Em `src/server/authz/routeGuard.ts`, verifique se `/api/services/` já está incluído.
Se introduzir um novo prefixo (por exemplo, `/api/tools/`), adicione-o tanto a
`LOCAL_ONLY_API_PREFIXES` como, caso inicie processos, a `SPAWN_CAPABLE_PREFIXES`.
Adicione um teste em `tests/unit/authz/routeGuard.test.ts`.

### Passo 6 — Adicionar o separador à IU

Crie `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Reutilize os componentes partilhados:

- `ServiceStatusCard` — estado em tempo real + distintivo de integridade
- `ServiceLifecycleButtons` — Iniciar / Parar / Reiniciar / Atualizar
- `ServiceLogsPanel` — acompanhamento de registos via SSE (liga-se a `/api/services/{name}/logs`)
- `ApiKeyCard` — revelar + rodar a chave (se `needsApiKey: true`)

Registe o separador em `ServicesPageShell.tsx`.

### Passo 7 — Adicionar a entrada do fornecedor (se o serviço for um destino de encaminhamento)

Se o serviço incorporado expuser um endpoint `/v1/chat/completions` compatível com OpenAI:

1. Adicione uma entrada de fornecedor em `src/shared/constants/providers.ts` com `isEmbeddedService: true`.
2. Crie `open-sse/executors/{name}.ts` que estenda `BaseExecutor`. Volte a consultar a porta e
   a chave de API em cada pedido (nunca as coloque em cache no construtor). Devolva uma resposta
   `503 service_not_running` quando o estado do supervisor não for `"running"`.
3. Registe os modelos em `open-sse/config/providerRegistry.ts` com o prefixo do serviço
   (por exemplo, `myservice/sub/model`). `modelSync.ts` irá mantê-los atualizados.

### Passo 8 — Documentar e testar

1. Atualize `docs/frameworks/EMBEDDED-SERVICES.md` (este ficheiro) — adicione o serviço à
   tabela da §1 e quaisquer novos endpoints à §4.
2. Adicione testes unitários em `tests/unit/services/` (ciclo de vida, instalador, formato da API).
3. Adicione um teste de integração em `tests/integration/services/` (condicionado por `RUN_SERVICES_INT=1`).
4. Atualize `docs/openapi.yaml` com os novos endpoints.

---

## 7. Resolução de problemas

### O serviço não inicia

**Sintomas:** O botão de início devolve 503 e o estado permanece em `"error"` ou `"starting"`.

**Lista de verificação:**

1. Verifique `GET /api/services/{name}/logs` (ou o painel Logs no dashboard). Procure
   linhas como `Error: ENOENT`, `address already in use` ou `Cannot find module`.
2. Verifique se `npm` está no PATH: execute `which npm` a partir da mesma conta de utilizador que executa o OmniRoute.
3. Verifique se o serviço está instalado: consulte `GET /api/services/{name}/status` e procure
   `installedVersion`. Se for `null`, execute primeiro a instalação.
4. Verifique se `DATA_DIR/services/{name}/node_modules/` existe e não está vazio.
5. Verifique o campo `lastError` na resposta de estado para consultar o motivo de saída sanitizado.

---

### O arranque a frio é lento (> 10 s até atingir `running`)

**Sintomas:** O estado permanece em `"starting"` durante muito tempo antes de mudar para `"running"` ou `"error"`.

**Explicação:** O arranque a frio do 9Router inclui a importação de grandes árvores de dependências (módulos de DNS,
túnel e MITM). O intervalo de verificação de funcionamento predefinido é de 2 s, com 3 tentativas antes de o
supervisor declarar um tempo limite excedido (mas continua a consultar).

**Correção:** O `healthIntervalMs` e o tempo limite de `waitForHealthy`
(`healthIntervalMs * 3`) são configuráveis em `bootstrap.ts`. Para serviços com tempos
de arranque mais longos, aumente `healthIntervalMs` para 5000 e `stopTimeoutMs` para 30 000.

---

### Conflito de porta (`EADDRINUSE`)

**Sintomas:** Os registos mostram `address already in use :::20130`.

**Causas:**

- Outro processo já está a utilizar a porta 20130.
- Um processo anterior do 9Router não foi totalmente terminado (PID zombie).

**Correção:**

1. Altere a porta predefinida através da variável de ambiente `NINEROUTER_PORT` no ficheiro `.env`.
2. Localize e termine o processo em conflito: `lsof -ti :20130 | xargs kill -9`.
3. A porta é configurável por serviço em `bootstrap.ts` através do campo `port`.

**Nota:** O 9Router utiliza por predefinição a porta 20130 especificamente para evitar conflitos com
a porta predefinida 20128 do OmniRoute.

---

### Permissão negada (EACCES) durante a instalação

**Sintomas:** A instalação devolve 500 e os registos mostram `EACCES` ou `permission denied`.

**Causas:**

- `DATA_DIR` ou o respetivo diretório principal não permite escrita pelo processo OmniRoute.
- Execução num Docker sem privilégios de root e sem acesso de escrita ao volume mapeado.

**Correção:**

1. Verifique `DATA_DIR` (predefinição: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Certifique-se de que o utilizador do processo OmniRoute é proprietário do diretório: `chown -R $USER ~/.omniroute/`
3. No Docker, certifique-se de que o volume montado tem as permissões corretas para o utilizador do contentor.

---

### A atualização falha (tempo limite de `npm install` excedido ou erro de rede)

**Sintomas:** A atualização devolve 500 com `InstallError` e os registos mostram um tempo limite de rede excedido.

**Lista de verificação:**

1. Confirme que o registo npm está acessível: `npm ping`.
2. Verifique se existe um proxy empresarial: `npm config get proxy`, `npm config get https-proxy`.
3. Tente efetuar a instalação manualmente: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Se estiver numa rede isolada, transfira previamente o tarball e utilize `npm install /path/to/tarball.tgz`.

---

### O serviço apresenta imediatamente o estado `"error"` após o início (falha rápida)

**Sintomas:** O estado muda de `"starting"` para `"error"` em menos de 5 segundos.
`lastError` apresenta `"Fast crash (exited with code 1)"`.

**Lista de verificação:**

1. Leia o final completo do registo: `GET /api/services/{name}/logs?tail=500`.
2. Causa comum: variáveis de ambiente esperadas pelo serviço em falta.
3. Para o 9Router: verifique se `NINEROUTER_DISABLE_MITM=true` e
   `NINEROUTER_DISABLE_TUNNEL=true` estão no ambiente transmitido ao criar o processo (consulte
   `installers/ninerouter.ts` `resolveSpawnArgs`).

---

## 8. Perguntas frequentes

**P: Posso expor os endpoints dos serviços integrados a clientes que não sejam de loopback?**

Não. O nível LOCAL_ONLY é intencional (regra rígida n.º 17). As rotas que podem invocar
`npm install` ou iniciar processos `node` não podem estar acessíveis a partir de tráfego
que não seja de loopback, porque, caso contrário, um JWT exposto através de um túnel
(Cloudflare, Ngrok, Tailscale) permitiria iniciar processos arbitrários. Não existe
qualquer exceção de exclusão voluntária para `/api/services/` — ao contrário de
`/api/mcp/`, este caminho está excluído da lista de exceções do âmbito manage.
Consulte `docs/security/ROUTE_GUARD_TIERS.md`.

---

**P: O 9Router e a CLIProxyAPI estarão disponíveis em implementações de produção/na cloud?**

Sim. Ambos os serviços seguem o mesmo modelo local-first do próprio OmniRoute. São
executados na mesma máquina e comunicam através de loopback. Neste caso, «produção»
refere-se ao VPS ou servidor local onde o OmniRoute está implementado, e não a um
fornecedor de cloud remoto.

---

**P: Como posso depurar o supervisor?**

1. Acompanhe o fluxo de registos SSE: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Verifique os registos estruturados na saída pino do OmniRoute, filtrados pelo
   namespace `service:supervisor`.
3. Inspecione a linha da base de dados: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Utilize `GET /api/services/9router/status` para ver, numa única chamada, o estado
   atual em tempo real, o PID, a integridade e `lastError`.

---

**P: O supervisor mostra `health: "degraded"` ou `health: "unknown"`, mas o estado é `"running"`. É um problema?**

`"degraded"` significa que a sonda de integridade devolveu uma resposta diferente de 200. `"unknown"` significa que ainda não foi concluída qualquer sondagem (condição de
corrida com a primeira consulta). Ambos os estados são transitórios durante o arranque.
Se a integridade permanecer como `"degraded"` durante mais de `healthIntervalMs * 3`
ms após `"running"`, o serviço integrado está em execução, mas a respetiva API HTTP não
está a responder. Verifique se a porta está correta na resposta de estado e se o
serviço está efetivamente à escuta nessa porta.

---

**P: Posso alterar a chave de API do 9Router sem um reinício completo?**

Não. A chave de API é transmitida ao 9Router através de uma variável de ambiente no
momento em que o processo é iniciado. As variáveis de ambiente não podem ser alteradas
num processo em execução. `POST .../rotate-key` para e reinicia automaticamente o
serviço para aplicar a nova chave. A rotação da chave entra em vigor dentro do
`stopTimeoutMs` do serviço (15 s por predefinição), acrescido do respetivo tempo de
arranque.

---

**P: Qual é o limite do buffer circular e o que acontece quando este fica cheio?**

Cada serviço tem um buffer circular dedicado de 5 MB. Quando o buffer fica cheio, as
linhas de registo mais antigas são removidas para libertar espaço para as novas. O
evento SSE `snapshot` devolve as linhas mais recentes dentro do limite `tail`. Os
registos não são guardados no disco, a menos que `logsBufferPath` esteja definido na
linha da base de dados.

---

## Consulte também

- `docs/security/ROUTE_GUARD_TIERS.md` — detalhes do nível LOCAL_ONLY
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 Mapeamento do módulo de Serviços Integrados
- `docs/architecture/ARCHITECTURE.md` — contexto ao nível do sistema
- `docs/openapi.yaml` — definições de endpoints legíveis por máquina
- `CLAUDE.md` §"Adding a New Embedded Service" — lista de verificação para consulta rápida
