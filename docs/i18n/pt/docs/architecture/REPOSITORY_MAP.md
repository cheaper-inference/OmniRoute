# Repository Map (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Descrição de uma linha para cada diretório e ficheiro na raiz.**
> Última atualização: 2026-06-28 — OmniRoute v3.8.40
>
> Utilize este mapa para navegar rapidamente na base de código. Para análises mais detalhadas, siga as ligações para a documentação dedicada.

## Árvore de nível superior

```
OmniRoute/
├── src/                  # Aplicação Next.js 16 (UI + rotas de API + bibliotecas + domínio + servidor)
├── open-sse/             # Workspace do motor de streaming (handlers, executors, translator, servidor MCP)
├── packages/            # npm workspaces: ui-kit (Keak CI UI Kit incorporado) e browser-pool
├── electron/             # Wrapper de desktop (Electron 41 + electron-builder 26.10)
├── bin/                  # Ponto de entrada da CLI e handlers de comandos
├── scripts/              # Scripts de build, verificação, sincronização e pontuais
├── docs/                 # Documentação pública (está aqui)
├── tests/                # Todas as suites de testes (unitários, integração, e2e, clientes de protocolo)
├── public/               # Assets estáticos do Next.js, manifesto PWA, service worker, ícones
├── config/               # Configuração estática + estado do quality-gate (i18n, payloadRules, quality/)
├── images/               # Assets de imagem para marketing / README
├── @omniroute/           # Pacotes complementares publicáveis (opencode-plugin, opencode-provider)
├── skills/               # Packs de skills para CLI/agente (cli-* + omni-* + config-codex-cli)
├── examples/             # Plugins de exemplo + starter omniroute-cmd-hello
├── contrib/              # Contribuições da comunidade (podman/)
├── .source/              # Configuração source do Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Workflows do GitHub Actions + templates de issues + template de PR
├── .husky/               # Git hooks (pre-commit, pre-push)
├── .claude/              # Slash commands do Claude Code (ao nível do projeto)
├── .agents/              # Workflows e skills do Codex / agente genérico (espelho de .claude/)
├── .vscode/              # Definições do workspace do VS Code
├── _ideia/               # Notas de planeamento (informal; não distribuído)
├── _mono_repo/           # Subprojetos históricos (cloud, site, vscode-extension)
├── _references/          # Clones de referência apenas de leitura de projetos OSS relacionados
├── _tasks/               # Ficheiros de acompanhamento de tarefas por release (informal)
├── .build/ .worktrees/ dist/   # Área temporária local de build / git-worktree / saída de build (ignorado pelo git)
├── .issues/              # Cache local de issues (ignorado pelo git)
├── .playwright-mcp/      # Artefatos de teste do Playwright MCP
├── coverage/             # Saída de cobertura do c8 (ignorado pelo git)
├── logs/                 # Logs de execução (ignorado pelo git)
├── node_modules/         # Dependências (ignorado pelo git)
├── package/              # Área de staging do npm pack (artefato de build)
├── .next/                # Saída de build do Next.js (ignorado pelo git)
└── (ficheiros na raiz — ver abaixo)
```

---

## Ficheiros na raiz

| Ficheiro                                    | Finalidade                                                                                                 |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Página de destino de marketing + início rápido + matriz de funcionalidades (ver também `llm.txt`)          |
| **CHANGELOG.md**                            | Registo de alterações por versão (gerado automaticamente pela skill `/version-bump-cc`)                    |
| **LICENSE**                                 | Texto da licença MIT                                                                                       |
| **CLAUDE.md**                               | Regras do projeto para agentes Claude Code (regras rígidas, convenções, cenários)                          |
| **AGENTS.md**                               | Igual ao CLAUDE.md mas para agentes de IA não-Claude (Codex, Cursor, etc.)                                 |
| **GEMINI.md**                               | Regras concisas para agentes baseados em Gemini (subconjunto do CLAUDE.md)                                 |
| **CONTRIBUTING.md**                         | Guia do contribuidor: configuração, conventional commits, testes, fluxo de PR                              |
| **SECURITY.md**                             | Política de reporte de vulnerabilidades, versões suportadas, modelo de ameaças                             |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — expectativas de comportamento da comunidade                                         |
| **llm.txt**                                 | Página de destino em texto simples otimizada para crawlers de LLM (SEO para assistentes de IA)             |
| **package.json**                            | Manifesto npm, scripts, dependências, engines, gate de cobertura c8                                        |
| **package-lock.json**                       | Árvore de dependências bloqueada                                                                           |
| **tsconfig.json**                           | Configuração TypeScript raiz                                                                               |
| **tsconfig.typecheck-core.json**            | Configuração de verificação de tipos para o núcleo `src/`                                                  |
| **tsconfig.typecheck-noimplicit-core.json** | Verificação de tipos estrita (`noImplicitAny`)                                                             |
| **tsconfig.tsbuildinfo**                    | Cache de build incremental do TS (ignorado pelo git)                                                       |
| **next.config.mjs**                         | Configuração de build do Next.js 16 (saída standalone)                                                     |
| **next-env.d.ts**                           | Tipos de ambiente gerados automaticamente pelo Next.js                                                     |
| **eslint.config.mjs**                       | Configuração flat do ESLint (regras por área do projeto)                                                   |
| **prettier.config.mjs**                     | Regras de formatação do Prettier                                                                           |
| **postcss.config.mjs**                      | Configuração PostCSS para o pipeline Tailwind/CSS                                                          |
| **playwright.config.ts**                    | Configuração de testes E2E do Playwright                                                                   |
| **vitest.config.ts**                        | Configuração do Vitest (suíte predefinida)                                                                 |
| **vitest.mcp.config.ts**                    | Configuração do Vitest para as suítes MCP server / autoCombo / cache                                       |
| **sonar-project.properties**                | Configuração SonarQube/SonarCloud (qualidade de código)                                                    |
| **Dockerfile**                              | Build Docker multi-stage (builder → runner-base → runner-cli)                                              |
| **docker-compose.yml**                      | Compose de desenvolvimento com 4 perfis (base, cli, host, cliproxyapi) + sidecar redis                     |
| **docker-compose.prod.yml**                 | Compose de produção (porta 20130, redis, volumes nomeados)                                                 |
| **.dockerignore**                           | Ficheiros excluídos do contexto Docker                                                                     |
| **fly.toml**                                | Configuração de deployment do Fly.io (região `sin`, porta 20128, volume /data)                             |
| **.env.example**                            | Ficheiro de ambiente modelo (copiado automaticamente para `.env` na primeira instalação)                   |
| **.gitignore**                              | Padrões de exclusão do Git                                                                                 |
| **.npmignore**                              | Lista de exclusão de publicação npm                                                                        |
| **.npmrc**                                  | Configuração npm (registry, política de lockfile)                                                          |
| **.node-version**                           | Fixação da versão do Node (usada por ferramentas compatíveis com nvm)                                      |
| **.nvmrc**                                  | Fixação da versão do Node para nvm                                                                         |
| **eslint.complexity.config.mjs**            | Configuração ESLint para o ratchet de complexidade (`scripts/check/check-complexity.mjs --config`)         |
| **eslint.sonarjs.config.mjs**               | Configuração ESLint para regras SonarJS (complexidade cognitiva / duplicação)                              |
| **source.config.ts**                        | Configuração de fonte `defineDocs` do Fumadocs (alimenta `.source/`)                                       |
| **knip.json**                               | Configuração do Knip — ficheiros/exportações/dependências não utilizados (alimenta o gate de código morto) |
| **stryker.conf.json**                       | Configuração de testes de mutação do Stryker                                                               |
| **.size-limit.json**                        | configuração de orçamento do bundle do size-limit                                                          |
| **promptfooconfig.yaml**                    | configuração de avaliação do promptfoo                                                                     |
| **.gitleaks.toml**                          | conjunto de regras de verificação de segredos do gitleaks                                                  |
| **.zizmor.yml**                             | configuração de lint de segurança do zizmor para GitHub Actions                                            |
| **socket.yml**                              | configuração da cadeia de fornecimento do Socket.dev                                                       |
| **news.json**                               | Feed de anúncios v2 localizado; o item de lançamento do Radar é distribuído inativo                        |
| **flake.nix** / **flake.lock**              | definição de dev-shell do Nix + lock                                                                       |
| **.env**                                    | Segredos locais (ignorado pelo git — gerado a partir de `.env.example`)                                    |

> **Movidos da raiz na v3.8.26 (limpeza):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json`, e o ficheiro gerado `quality-metrics.json` (ignorado pelo git). Consulte [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Aplicação Next.js

```
src/
├── app/                 # App Router (páginas + rotas de API + páginas de estado + landing)
├── lib/                 # Bibliotecas principais / módulos de domínio (80 subdiretórios + ~70 ficheiros de topo)
├── domain/              # Lógica de domínio pura (motor de políticas, fallback, custo, lockout, comboResolver, avaliação)
├── server/              # Módulos exclusivos do servidor (pipeline de autorização, cors, middleware de autenticação) — não podem importar do cliente
├── shared/              # Partilhado entre servidor e cliente quando seguro (constantes, tipos, validação, contratos, utilitários)
├── i18n/                # Configuração do next-intl + JSON de mensagens por idioma (67 idiomas)
├── middleware/          # Middleware Next.js (enriquecimento de pedidos, deteção de idioma)
├── mitm/                # Núcleo do proxy MITM: geração/instalação de certificados, handlers, targets, inspector, masks, passthrough
│   ├── handlers/        # 9 classes de handlers de agentes IDE que estendem MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Camada de captura de tráfego: buffer (anel em memória), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Ligação do adaptador de modelos (shim legado)
├── scripts/             # Scripts de manutenção incluídos no repositório (ex.: backfillAggregation)
├── sse/                 # Handlers/serviços SSE legados (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Store em memória legada (a ser descontinuada em favor de src/lib/db)
├── types/               # Ficheiros de tipos TS partilhados
├── instrumentation.ts   # Hook de telemetria do Next.js (browser + edge)
├── instrumentation-node.ts  # Instrumentação exclusiva do Node
└── proxy.ts             # Shim de entrada do proxy HTTP
```

### `src/app/` — App Router (Next.js 16)

| Caminho                                                                      | Objetivo                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | API pública compatível com OpenAI (~25 sub-rotas: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers, etc.)                                                                                                                                 |
| `app/api/v1beta/`                                                            | Endpoints de API estilo Gemini                                                                                                                                                                                                                                                                                                     |
| `app/api/playground/`                                                        | Rotas do Playground Studio: `improve-prompt/` (POST — reescritor de prompts LLM), `presets/` (GET listar / POST criar), `presets/[id]/` (GET / PUT / DELETE) — ver `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                          |
| `app/api/` (não-v1)                                                          | Rotas de gestão/administração (~60 diretórios: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools, etc.)                                                                                                                                               |
| `app/api/tools/agent-bridge/`                                                | API REST do AgentBridge — 12 rotas (controlo do servidor, estado de agentes/DNS/mappings, bypass, cert, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Ver `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                         |
| `app/api/tools/traffic-inspector/`                                           | API REST + WS do Traffic Inspector — 16+ rotas (requests, sessions, hosts, capture-modes, export, ws). LOCAL_ONLY + SPAWN_CAPABLE. Ver `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                                  |
| `app/a2a/`                                                                   | Ponto de entrada A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                                    |
| `app/.well-known/agent.json/`                                                | A2A Agent Card (descoberta)                                                                                                                                                                                                                                                                                                        |
| `app/(dashboard)/dashboard/`                                                 | Páginas da UI do Dashboard (50+ secções, ~118 ficheiros page.tsx: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity, etc.)                                                                                                                                        |
| `app/(dashboard)/dashboard/search-tools/`                                    | UI do Search Tools Studio (3 separadores: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — ver `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                              |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plano 21): `page.tsx` (estrutura de 3 separadores), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Página do dashboard do AgentBridge — cartão do servidor, 9 cartões de agentes, assistente de configuração, mapeamento de modelos, lista de bypass. i18n PT-BR + EN. Ver `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                          |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Página do dashboard do Traffic Inspector — vista dividida DevTools, 7 separadores de detalhe, 4 alternadores de modo de captura, gravador de sessões, colorização de contexto. i18n PT-BR + EN. Ver `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                        |
| `app/(dashboard)/dashboard/activity/`                                        | Página de feed de atividade (Grupo B): `page.tsx` (servidor) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — ver `docs/architecture/MONITORING_SECTIONS.md`                                                                                                                  |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Página de Partilha de Quotas (Grupo B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                                |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Página de configuração de planos de fornecedor (Grupo B): `page.tsx` + `ProviderPlanConfigClient.tsx` — substituição das dimensões de quota por ligação                                                                                                                                                                            |
| `app/docs/`                                                                  | Visualizador de documentação incorporado (renderiza `docs/*.md`)                                                                                                                                                                                                                                                                   |
| `app/landing/`                                                               | Landing page de marketing                                                                                                                                                                                                                                                                                                          |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Páginas relacionadas com autenticação                                                                                                                                                                                                                                                                                              |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Páginas de erro HTTP                                                                                                                                                                                                                                                                                                               |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Páginas estáticas/de estado                                                                                                                                                                                                                                                                                                        |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Layout raiz, página inicial, manifesto PWA, CSS global                                                                                                                                                                                                                                                                             |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Barreiras de erro                                                                                                                                                                                                                                                                                                                  |

### `src/lib/` — Bibliotecas principais (~50 módulos)

| Módulo                                       | Finalidade                                                                                                                                                                                                                                                                                                              |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                       | Gestor de tarefas do protocolo A2A, skills (5), streaming                                                                                                                                                                                                                                                               |
| `acp/`                                       | CLI Agent Registry (descoberta de CLIs locais — ver `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                         |
| `api/`                                       | Auxiliares de API partilhados (`requireManagementAuth`, validação)                                                                                                                                                                                                                                                      |
| `auth/`                                      | Sessão, hashing de palavras-passe, validação de tokens                                                                                                                                                                                                                                                                  |
| `batches/`                                   | Handlers da OpenAI Batches API                                                                                                                                                                                                                                                                                          |
| `catalog/`                                   | Validação Zod do catálogo de providers + resolução de capacidades                                                                                                                                                                                                                                                       |
| `cloudAgent/`                                | Cloud Agents (Codex Cloud, Devin, Jules) — ver `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                         |
| `combos/`                                    | Resolução de combos + auxiliares de reordenação                                                                                                                                                                                                                                                                         |
| `audit/`                                     | Auxiliares do feed de atividade: `highLevelActions.ts` (allowlist + `isHighLevelAction()`), `activityIcons.ts` (mapa ação → ícone/verbo), `timeline.ts` (groupByDay/relativeTime) — ver `docs/architecture/MONITORING_SECTIONS.md`                                                                                      |
| `compliance/`                                | Registo de auditoria + auditoria de providers — ver `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                       |
| `compression/`                               | Ligação do motor de compressão (os motores residem em `open-sse/services/compression/`)                                                                                                                                                                                                                                 |
| `config/`                                    | Auxiliares de configuração em runtime                                                                                                                                                                                                                                                                                   |
| `db/`                                        | 120+ módulos de BD de domínio + 168 migrações (passar sempre por aqui para SQLite)                                                                                                                                                                                                                                      |
| `quota/`                                     | Quota Sharing Engine: `dimensions.ts` (tipos/Zod), `types.ts` (interface QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — ver `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                     | Cliente do catálogo de modelos gratuitos Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — ver `docs/frameworks/RADAR.md`                                                                                                                             |
| `display/`                                   | Auxiliares de formatação da IU (custo, latência, etc.)                                                                                                                                                                                                                                                                  |
| `embeddings/`                                | Auxiliares do serviço de embeddings                                                                                                                                                                                                                                                                                     |
| `env/`                                       | Análise e validação de variáveis de ambiente                                                                                                                                                                                                                                                                            |
| `evals/`                                     | Framework de avaliação (suites, runner, runtime) — ver `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                       |
| `guardrails/`                                | Mascaramento de PII, injeção de prompts, ponte de visão — ver `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                             |
| `jobs/`                                      | Tarefas em segundo plano (tipo cron)                                                                                                                                                                                                                                                                                    |
| `memory/`                                    | Memória conversacional (SQLite FTS5 + sqlite-vec RRF híbrido + Qdrant nível 2) — ver `docs/frameworks/MEMORY.md`                                                                                                                                                                                                        |
| `memory/embedding/`                          | Camada de embedding multi-fonte: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plano 21)                                                                                                                                                                       |
| `memory/vectorStore.ts`                      | Wrapper do sqlite-vec v0.1.9 — KNN brute-force + RRF híbrido (FTS5 + vetorial, k=60). Inicialização diferida, degrada graciosamente quando o sqlite-vec não está disponível. (plano 21)                                                                                                                                 |
| `memory/reindex.ts`                          | `runReindexBatch()` — processa memórias com `needs_reindex=1` em segundo plano; chamado por `POST /api/memory/reindex` e pelo caminho de preenchimento diferido (lazy-backfill). (plano 21)                                                                                                                             |
| `monitoring/`                                | Verificações de saúde, emissão de métricas                                                                                                                                                                                                                                                                              |
| `oauth/`                                     | Fluxos OAuth/importação para 22 módulos de fornecedores (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                     |
| `plugins/`                                   | Registo de plugins                                                                                                                                                                                                                                                                                                      |
| `promptCache/`                               | Pontos de interrupção de cache de prompts ao estilo Anthropic                                                                                                                                                                                                                                                           |
| `skills/`                                    | Framework de skills (integradas + marketplace + SkillsSH) — ver `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                             |
| `playground/`                                | Auxiliares partilhados do Playground Studio: `codeExport.ts` (gerador curl/Python/TS), `promptImprover.ts` (construtor de meta-prompts), `streamMetrics.ts` (TTFT/TPS puros), `types.ts` (tabela de preços) — ver `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                |
| `webhookDispatcher.ts`                       | Entrega de webhooks HMAC — ver `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                            |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`     | Gestores de túneis — ver `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                    |
| `cloudSync.ts`, `initCloudSync.ts`           | Sincronização opcional do estado com a cloud                                                                                                                                                                                                                                                                            |
| `localDb.ts`                                 | Barrel de reexportação para os módulos de db (sem lógica — apenas reexportações)                                                                                                                                                                                                                                        |
| `cacheLayer.ts`, `idempotencyLayer.ts`       | Cache de pedidos + idempotência                                                                                                                                                                                                                                                                                         |
| (~30 ficheiros adicionais de nível superior) | Auxiliares especializados (logEnv, modelsDevSync, piiSanitizer, etc.)                                                                                                                                                                                                                                                   |

### `src/lib/db/` — Base de dados (147 módulos + 208 migrações)

| Subdiretório              | Objetivo                                                                                                                                                                           |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Singleton `getDbInstance()` com journaling WAL                                                                                                                                     |
| `db/migrations/`          | Ficheiros SQL versionados (idempotentes, transacionais). `073_memory_vec.sql` adiciona `memory_vec_meta` + a coluna `needs_reindex` (plano 21).                                    |
| `db/playgroundPresets.ts` | Módulo CRUD para predefinições do Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD para `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue`, etc. (plano 21)                      |
| `db/<domain>.ts`          | Um módulo por domínio: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache, etc.         |

### `src/domain/`

| Módulo                 | Objetivo                                              |
| ---------------------- | ----------------------------------------------------- |
| `policy.ts`            | Motor de políticas                                    |
| `fallbackPolicy.ts`    | Árvore de decisão de fallback                         |
| `costRules.ts`         | Regras de cálculo de custos                           |
| `lockoutPolicy.ts`     | Política de bloqueio de modelos/ligações              |
| `tagRouter.ts`         | Encaminhamento baseado em tags                        |
| `comboResolver.ts`     | Resolução de combos (usada pelo motor de combos)      |
| `modelAvailability.ts` | Verificação de disponibilidade por modelo             |
| `assessment/`          | Avaliação de modelos (Fase 1 do RFC-AUTO-ASSESSMENT ) |

### `src/server/`

| Módulo   | Objetivo                                                                                              |
| -------- | ----------------------------------------------------------------------------------------------------- |
| `authz/` | Pipeline de autorização: `classify` → `policies` → `enforce` — ver `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Configuração de CORS                                                                                  |
| `auth/`  | Middleware de sessões                                                                                 |

### `src/shared/`

| Módulo                           | Objetivo                                                                                                        |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `components/`                    | API de componentes do Dashboard: adaptadores sobre `packages/ui-kit` — ver `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: nomes de ícones utilizados pelos ecrãs → componentes Lucide (`<Icon>`)                              |
| `constants/providers.ts`         | **375 fornecedores** com validação Zod (fonte da verdade)                                                       |
| `constants/cliTools.ts`          | Registo de ferramentas CLI externas                                                                             |
| `constants/routingStrategies.ts` | **20 estratégias de encaminhamento** com prioridades                                                            |
| `constants/publicApiRoutes.ts`   | Rotas que exigem autenticação Bearer (vs. de gestão)                                                            |
| `constants/upstreamHeaders.ts`   | Lista de exclusão de cabeçalhos para pedidos upstream                                                           |
| `validation/schemas.ts`          | ~80 esquemas Zod (fonte única da verdade para contratos de API)                                                 |
| `validation/helpers.ts`          | Auxiliares de validação Zod (`validateBody`, etc.)                                                              |
| `types/`                         | Tipos TS partilhados                                                                                            |
| `contracts/`                     | Contratos de API pública (consumidos por `files:` no `package.json`)                                            |
| `utils/circuitBreaker.ts`        | Circuit breaker de fornecedores (ver `docs/architecture/RESILIENCE_GUIDE.md`)                                   |
| `utils/apiAuth.ts`               | Validação de chaves de API, verificação de âmbitos                                                              |
| `utils/fetchTimeout.ts`          | Wrappers de tempo limite/anulação para fetch upstream                                                           |
| `utils/releaseNotes.ts`          | Analisador de anúncios v2/legacy encerrados, localização e dispensa de IDs                                      |

---

## `open-sse/` — Workspace do Motor de Streaming

Workspace npm separado (`@omniroute/open-sse`). Gere o processamento de pedidos + a execução nos fornecedores.

```
open-sse/
├── handlers/            # 16 ficheiros (12 handlers + 4 helpers): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search, etc.
├── executors/           # 150 módulos executores (classes que estendem BaseExecutor + helpers por fornecedor)
├── translator/          # Conversores de formato (9 de pedidos, 9 de respostas, 9 helpers)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ módulos de serviços (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM, etc.)
├── mcp-server/          # Servidor MCP (110 ferramentas, 3 transportes, 33 âmbitos)
├── config/              # Registos de fornecedores/modelos, configuração de headers, aliases de modelos
├── utils/               # Cliente TLS, fetch/dispatcher de proxy, helpers de rede
├── index.ts             # Entrada do workspace
├── package.json         # Manifesto do workspace
├── tsconfig.json        # Configuração TS do workspace
└── types.d.ts           # Declarações de tipos do workspace
```

### `open-sse/mcp-server/`

| Caminho                     | Finalidade                                                                                          |
| --------------------------- | --------------------------------------------------------------------------------------------------- |
| `server.ts`                 | Ciclo de vida do servidor MCP (transportes stdio + HTTP)                                            |
| `httpTransport.ts`          | Transportes HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                               |
| `audit.ts`                  | Registo de auditoria para a tabela `mcp_tool_audit`                                                 |
| `scopeEnforcement.ts`       | Validação de âmbitos por ferramenta                                                                 |
| `runtimeHeartbeat.ts`       | Heartbeat de estado para `DATA_DIR/runtime/mcp-heartbeat.json`                                      |
| `descriptionCompressor.ts`  | Comprime metadados de descrição das ferramentas para poupar contexto                                |
| `schemas/tools.ts`          | 36 definições de ferramentas base + âmbitos                                                         |
| `tools/advancedTools.ts`    | Implementações de ferramentas avançadas                                                             |
| `tools/memoryTools.ts`      | 3 ferramentas de memória (search/add/clear)                                                         |
| `tools/skillTools.ts`       | 4 ferramentas de skills (list/enable/execute/executions)                                            |
| `tools/compressionTools.ts` | 5 ferramentas de compressão                                                                         |
| `README.md`                 | README interno do servidor MCP (com referência cruzada a partir de `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — Workspaces

| Caminho                  | Finalidade                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — snapshot incorporado (vendored) do Keak CI UI Kit (`private`, `UNLICENSED`), consumido como código-fonte (sem build). `UPSTREAM.md` fixa o commit upstream e regista a autorização de licença; `PATCHES.md` lista os patches locais (nenhum); `src/` é sincronizado apenas por `scripts/dev/sync-ui-kit.sh` e protegido por `npm run check:ui-kit-snapshot`. Consulte `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — serviço opcional de pool de browsers (chat com CloakBrowser e baseado em Playwright)                                                                                                                                                                                                                                                                                                                 |

---

## `electron/` — Wrapper de Desktop

| Ficheiro         | Objetivo                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| `main.js`        | Processo principal do Electron (BrowserWindow, servidor Next.js incorporado, bandeja, atualização automática) |
| `preload.js`     | Ponte IPC (contextBridge → `window.omniroute`)                                                                |
| `package.json`   | Configuração do electron-builder + dependências do Electron 41 + electron-builder 26.10                       |
| `assets/`        | Ícones da aplicação (Windows .ico, macOS .icns, Linux .png)                                                   |
| `dist-electron/` | Resultado da compilação (ignorado pelo git)                                                                   |
| `types.d.ts`     | Declarações de tipos para a ponte do renderer                                                                 |
| `README.md`      | README interno do Electron (ver também `docs/guides/ELECTRON_GUIDE.md`)                                       |

---

## `bin/` — CLI

| Ficheiro                                                                                                    | Objetivo                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Ponto de entrada principal da CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos`, etc. |
| `reset-password.mjs`                                                                                        | CLI autónoma de reposição de palavra-passe                                                                                                    |
| `cli/commands/setup.mjs`                                                                                    | Assistente de configuração interativo e não interativo                                                                                        |
| `cli/commands/doctor.mjs`                                                                                   | Diagnósticos de estado do sistema (8+ verificações)                                                                                           |
| `cli/commands/providers.mjs`                                                                                | Listar/testar/validar fornecedores                                                                                                            |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Módulos auxiliares da CLI                                                                                                                     |
| `cli/tray/tray.ts`                                                                                          | Integração com a bandeja do sistema (multiplataforma: NotifyIcon no Windows, systray2 no macOS/Linux)                                         |
| `cli/tray/tray.ps1`                                                                                         | Backend PowerShell NotifyIcon (Windows, sem novos binários)                                                                                   |
| `cli/tray/autostart.ts`                                                                                     | Arranque automático multiplataforma (LaunchAgent / .desktop / registo)                                                                        |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Cadeia de resolução do driver SQLite em 5 passos (incluído → runtime → instalação diferida → node:sqlite → sql.js)                            |
| `cli/runtime/magicBytes.mjs`                                                                                | Validação de magic bytes binários (ELF / Mach-O / Mach-O fat / PE)                                                                            |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — pré-resolve os drivers no postinstall / primeiro arranque                                                                |
| `nodeRuntimeSupport.mjs`                                                                                    | Valida a versão do Node.js suportada durante a instalação                                                                                     |

---

## `skills/` — Skills Públicas para Agentes

| Ficheiro                     | Finalidade                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifestos de skills para agentes de IA externos (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Scripts de Compilação e Verificação

| Script                              | Finalidade                                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `run-next.mjs`                      | Executor de dev/arranque com hidratação de variáveis de ambiente                                       |
| `build-next-isolated.mjs`           | Compilação standalone (Next.js 16 standalone)                                                          |
| `prepublish.ts`                     | Preparação do pacote antes de `npm pack`                                                               |
| `postinstall.mjs`                   | Cria automaticamente `.env` a partir de `.env.example` na primeira instalação                          |
| `sync-env.mjs`                      | Resincroniza as chaves de `.env` com `.env.example`                                                    |
| `check-cycles.mjs`                  | Deteta dependências circulares                                                                         |
| `check-route-validation.mjs`        | Valida que todas as rotas de API têm validação Zod                                                     |
| `check-t11-any-budget.mjs`          | Impõe um orçamento explícito de `any` por ficheiro                                                     |
| `check-docs-sync.mjs`               | Valida a sincronização de versões da documentação (pre-commit existente)                               |
| **`check-env-doc-sync.mjs`**        | NOVO: verificação cruzada de variáveis de ambiente no código vs `.env.example` vs `ENVIRONMENT.md`     |
| **`check-docs-counts-sync.mjs`**    | NOVO: valida que as contagens (executores, estratégias, OAuth, skills A2A) correspondem à documentação |
| **`check-deprecated-versions.mjs`** | NOVO: sinaliza versões/datas desatualizadas na documentação                                            |
| `check-supported-node-runtime.ts`   | Valida que a versão atual do Node é suportada                                                          |
| `check-pr-test-policy.mjs`          | Impõe a regra de "testes obrigatórios" em alterações ao código de produção                             |
| **`gen-provider-reference.ts`**     | NOVO: gera automaticamente `docs/reference/PROVIDER_REFERENCE.md` a partir do catálogo                 |
| `i18n/generate-multilang.mjs`       | Traduz strings da UI + documentação via Google Translate                                               |
| `i18n_autotranslate.py`             | Pipeline de tradução de documentação baseada em LLM                                                    |
| `validate_translation.py`           | Validação de traduções por localidade                                                                  |
| `check_translations.py`             | Verificação de chaves i18n no código                                                                   |
| `run-playwright-tests.mjs`          | Executor de testes E2E Playwright                                                                      |
| `run-protocol-clients-tests.mjs`    | Executor de testes E2E MCP/A2A                                                                         |
| `run-ecosystem-tests.mjs`           | Testes de ecossistema (integração com fornecedores)                                                    |
| `test-report-summary.mjs`           | Gera resumo de cobertura em markdown                                                                   |
| `smoke-electron-packaged.mjs`       | Teste de smoke da compilação Electron empacotada                                                       |
| `native-binary-compat.mjs`          | Valida que as dependências nativas (`better-sqlite3`) correspondem ao Node do Electron                 |
| `validate-pack-artifact.ts`         | Valida a saída de npm pack                                                                             |
| `responses-ws-proxy.mjs`            | Ponte WebSocket para a Codex Responses API                                                             |
| `v1-ws-bridge.mjs`                  | Ponte WebSocket para o endpoint `/api/v1/ws`                                                           |
| `standalone-server-ws.mjs`          | Executor de servidor WS standalone                                                                     |
| `system-info.mjs`                   | Imprime informação do sistema/runtime para suporte                                                     |
| `healthcheck.mjs`                   | Verificação de estado pontual (usada pelo Docker HEALTHCHECK)                                          |
| `uninstall.mjs`                     | Script de desinstalação limpa                                                                          |
| `dev/sync-ui-kit.sh`                | Copia o `src/` do CI UI Kit num commit fixado para `packages/ui-kit/src`                               |
| `check/check-ui-kit-snapshot.mjs`   | Verificação de pre-commit: `packages/ui-kit/src` corresponde ao commit upstream fixado                 |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — nomes de ícones em uso que `ICON_MAP` não mapeia                              |
| `dev/codemod-material-icons.mjs`    | Reescreve spans literais de Material Symbols para `<Icon>` (ferramenta de migração)                    |

---

## `docs/` — Documentação Pública (7 ficheiros na raiz + 17 subdiretórios)

### Guias de nível superior

| Doc                         | Finalidade                                                                                            |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Arquitetura de alto nível, mapa de subsistemas, superfície do dashboard                               |
| `CODEBASE_DOCUMENTATION.md` | Referência de engenharia: diretórios, módulos, convenções                                             |
| `FEATURES.md`               | Matriz de funcionalidades com destaques da v3.8                                                       |
| `USER_GUIDE.md`             | Manual do utilizador final (configuração, modelos, combos, CLIs, áudio, etc.)                         |
| `API_REFERENCE.md`          | Referência de endpoints da API com modelo de autenticação                                             |
| `openapi.yaml`              | Especificação OpenAPI 3.0 (121 caminhos)                                                              |
| `SETUP_GUIDE.md`            | Métodos de instalação (npm, npx, Docker, Electron, Termux, código-fonte)                              |
| `ENVIRONMENT.md`            | Todas as variáveis de ambiente (~800 documentadas, ~3.050 linhas no `.env.example`)                   |
| `TROUBLESHOOTING.md`        | Erros comuns + problemas conhecidos da v3.8.0                                                         |
| `RELEASE_CHECKLIST.md`      | Fluxo completo de lançamento (skills, husky, conventional commits, deploy)                            |
| `COVERAGE_PLAN.md`          | Objetivos de cobertura e estado atual                                                                 |
| `FREE_TIERS.md`             | Fornecedores com nível gratuito selecionados (48+ gratuitos + 11 OAuth)                               |
| `CLI-TOOLS.md`              | Integrações de CLI externas + CLI interno do OmniRoute                                                |
| `I18N.md`                   | Arquitetura i18n, adicionar um idioma, 67 locales                                                     |
| `UNINSTALL.md`              | Passos para uma desinstalação limpa                                                                   |
| `PROVIDER_REFERENCE.md`     | Catálogo **gerado automaticamente** de 375 fornecedores (regenerar: `npm run gen:provider-reference`) |

### Análises aprofundadas de subsistemas

| Doc                                           | Finalidade                                                                                         |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                               | Servidor MCP: 110 ferramentas, 3 transportes, 33 âmbitos, endpoints REST                           |
| `A2A-SERVER.md`                               | A2A v0.3: JSON-RPC, 6 skills, auxiliares REST, cartão de agente                                    |
| `AGENT_PROTOCOLS_GUIDE.md`                    | Guia unificado: A2A vs ACP vs Cloud Agents                                                         |
| `CLOUD_AGENT.md`                              | Orquestração Codex Cloud / Devin / Jules                                                           |
| `SKILLS.md`                                   | Framework de skills (integradas + marketplace + SkillsSH + sandbox)                                |
| `RADAR.md`                                    | Sobreposição de catálogo de modelos gratuitos Radar (`RADAR_ENABLED`, desativado por predefinição) |
| `MEMORY.md`                                   | Sistema de memória (SQLite FTS5 + Qdrant)                                                          |
| `EVALS.md`                                    | Framework de avaliação (suites, execuções, rubricas)                                               |
| `GUARDRAILS.md`                               | Mascaramento de PII, injeção de prompts, ponte de visão                                            |
| `COMPLIANCE.md`                               | Registo de auditoria, retenção, exclusão voluntária de noLog                                       |
| `WEBHOOKS.md`                                 | Entrega de webhooks assinados com HMAC                                                             |
| `REASONING_REPLAY.md`                         | Cache híbrida memória/SQLite para `reasoning_content`                                              |
| `AUTHZ_GUIDE.md`                              | Pipeline de autorização (`classify` → `policies` → `enforce`)                                      |
| `RESILIENCE_GUIDE.md`                         | Circuit breaker + cooldown + bloqueio de modelo                                                    |
| `docs/security/STEALTH_GUIDE.md` (apenas git) | Fingerprinting TLS (JA3/JA4), Claude Code CCH, certificado MITM                                    |
| `AUTO-COMBO.md`                               | Motor Auto Combo (pontuação de 16 fatores, 6 pacotes de modos, fábrica virtual)                    |

### Compressão

| Doc                             | Finalidade                                    |
| ------------------------------- | --------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Visão geral dos modos de compressão + roadmap |
| `COMPRESSION_ENGINES.md`        | Motores Caveman + RTK, contrato de registo    |
| `COMPRESSION_RULES_FORMAT.md`   | Esquema JSON do pacote de regras Caveman      |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventário de pacotes de regras por idioma    |
| `RTK_COMPRESSION.md`            | Pipeline declarativo RTK (49 filtros)         |

### Implementação

| Documento                    | Objetivo                                                           |
| ---------------------------- | ------------------------------------------------------------------ |
| `DOCKER_GUIDE.md`            | Build Docker, perfis (base/cli/host/cliproxyapi), sidecar Redis    |
| `VM_DEPLOYMENT_GUIDE.md`     | Implementação genérica em VM/VPS (Ubuntu/Debian + nginx + systemd) |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Implementação no Fly.io (atualmente apenas em chinês)              |
| `TERMUX_GUIDE.md`            | Android em modo headless via Termux                                |
| `PWA_GUIDE.md`               | Instalação de Progressive Web App + service worker                 |
| `ELECTRON_GUIDE.md`          | Compilação + assinatura + distribuição da aplicação desktop        |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                             |
| `PROXY_GUIDE.md`             | Proxy de saída de 4 níveis + marketplace 1proxy                    |

### Subdiretórios

| Subdiretório          | Objetivo                                                                                                                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Traduções localizadas da documentação (41 idiomas)                                                                                                                                                                                    |
| `docs/screenshots/`   | Recursos de imagem para os guias                                                                                                                                                                                                      |
| `_tasks/superpowers/` | Planos/especificações do superpowers (`writing-plans`/`brainstorming`) + investigação — repositório isolado, com versionamento separado, ignorado pelo git na árvore principal. Consulte CLAUDE.md → "Planning & Research Artifacts". |

---

## `tests/` — Conjuntos de Testes

| Subdiretório                         | Tipo                                                 | Executor                                           |
| ------------------------------------ | ---------------------------------------------------- | -------------------------------------------------- |
| `tests/unit/`                        | Testes unitários (~4 800 ficheiros, os mais rápidos) | Executor de testes nativo do Node                  |
| `tests/integration/`                 | Testes de integração multi-módulo + BD               | Executor de testes nativo do Node (concorrência 1) |
| `tests/e2e/`                         | E2E de IU + fluxos de trabalho                       | Playwright                                         |
| `tests/e2e/protocol-clients.test.ts` | E2E com clientes reais MCP + A2A                     | Clientes de protocolo personalizados               |
| `tests/e2e/ecosystem.test.ts`        | Integração com fornecedores (com acesso à rede)      | Executor de testes nativo do Node                  |

---

## `public/` — Recursos Estáticos

| Caminho             | Finalidade                                                           |
| ------------------- | -------------------------------------------------------------------- |
| `public/` (raiz)    | Favicons, robots.txt, manifest, service worker, imagens de marketing |
| `public/providers/` | Logótipos de fornecedores em PNG/SVG (usados no painel)              |

---

## `config/` — Configurações Estáticas + Estado do Quality Gate

Modelos de configuração distribuídos, mais as linhas de base de quality gate
incluídas no repositório (movidas para aqui a partir da raiz do repositório na
v3.8.26 para manter a raiz leve).

| Caminho                                       | Finalidade                                                                               |
| --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Lista de idiomas + metadados (fonte canónica para a contagem dos 42 idiomas)             |
| `config/i18n-schema.json`                     | Esquema JSON que valida o `i18n.json`                                                    |
| `config/payloadRules.json`                    | Regras de sanitização de payloads upstream                                               |
| `config/quality/quality-baseline.json`        | Linha de base ratchet multi-métrica (`scripts/quality/check-quality-ratchet.mjs`)        |
| `config/quality/complexity-baseline.json`     | Linha de base congelada de complexidade do ESLint (`check-complexity.mjs`)               |
| `config/quality/duplication-baseline.json`    | Linha de base congelada de duplicação do jscpd (`check-duplication.mjs`)                 |
| `config/quality/file-size-baseline.json`      | Linha de base congelada de tamanho por ficheiro (`check-file-size.mjs`)                  |
| `config/quality/test-discovery-baseline.json` | Linha de base congelada de testes órfãos (`check-test-discovery.mjs`)                    |
| `config/quality/dependency-allowlist.json`    | Lista de permissões de dependências aprovadas (`check-deps.mjs`)                         |
| `config/quality/.license-allowlist.json`      | Lista de permissões de licenças SPDX (`check-licenses.mjs`)                              |
| `config/quality/quality-metrics.json`         | Métricas efémeras recolhidas (geradas por `collect-metrics.mjs`; **ignoradas pelo git**) |

---

## `.github/` — Integração com o GitHub

| Caminho                            | Finalidade                                                                 |
| ---------------------------------- | -------------------------------------------------------------------------- |
| `.github/workflows/`               | Fluxos de trabalho CI/CD do GitHub Actions (lint, test, coverage, release) |
| `.github/ISSUE_TEMPLATE/`          | Modelos de issues para bugs/funcionalidades                                |
| `.github/pull_request_template.md` | Modelo de PR                                                               |
| `.github/dependabot.yml`           | Configuração de atualização de dependências                                |

---

## `.husky/` — Git Hooks

| Ficheiro     | Finalidade                                                                  |
| ------------ | --------------------------------------------------------------------------- |
| `pre-commit` | Executa `lint-staged + check-docs-sync + check:any-budget:t11`              |
| `pre-push`   | Atualmente desativado (comentado). Execute `npm run test:unit` manualmente. |
| `_/`         | Componentes internos do Husky                                               |

---

## `.claude/` — Comandos Slash do Claude Code

| Ficheiro                                            | Finalidade                                                     |
| --------------------------------------------------- | -------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — incrementar versão + changelog automático |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — fluxo de lançamento completo          |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Implementar em VPS                                             |
| `commands/capture-release-evidences-cc.md`          | Gravar novas funcionalidades no navegador como WebP            |
| `commands/review-{prs,discussions}-cc.md`           | Triagem de PRs/discussões do GitHub                            |
| `commands/{review-issues,implement-features}-cc.md` | Fluxos de trabalho de issues                                   |
| `settings.local.json`                               | Definições do Claude Code por projeto                          |

---

## `.agents/` — Fluxos de Trabalho Genéricos de Agentes (Codex / Cursor / etc.)

| Caminho                  | Finalidade                                                           |
| ------------------------ | -------------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definições de fluxos de trabalho (espelho de `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definições de skills com Notas de Execução do Codex                |

> **Nota:** Os fluxos de trabalho e os comandos são atualmente idênticos byte a byte. Se `.agents/` se destinar a um runtime de agente diferente (Codex), as variantes precisam de divergir de forma significativa.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Fora da árvore

Estes diretórios com prefixo de underscore contêm conteúdo que não é distribuído:

- **`_ideia/`** — notas de design (categorias defer / notfit / viable)
- **`_mono_repo/`** — subprojetos históricos (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — clones só de leitura de projetos OSS relacionados (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api, etc.) para referência cruzada durante o desenvolvimento
- **`_tasks/`** — ficheiros de acompanhamento de tarefas por lançamento (informal)

Não incluídos na saída do `npm pack`. Consulte `.npmignore`.

---

## Gerados / Ignorados pelo Git

| Caminho                | Finalidade                             |
| ---------------------- | -------------------------------------- |
| `node_modules/`        | dependências npm                       |
| `.next/`               | output do build do Next.js             |
| `coverage/`            | relatórios de cobertura do c8          |
| `logs/`                | registos de execução                   |
| `package/`             | staging do npm pack                    |
| `.playwright-mcp/`     | artefactos de testes do Playwright MCP |
| `.issues/`             | cache local de issues                  |
| `tsconfig.tsbuildinfo` | cache incremental do TS                |

---

## Dicas de navegação

- **Novo contribuidor?** Leia `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Adicionar um provider?** Siga `docs/architecture/ARCHITECTURE.md § Adding a New Provider` e verifique `docs/reference/PROVIDER_REFERENCE.md`.
- **Adicionar uma rota?** `docs/architecture/ARCHITECTURE.md § Adding a New API Route` + `src/shared/validation/schemas.ts`.
- **Adicionar uma ferramenta MCP?** `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Adicionar uma skill A2A?** `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Executar localmente?** `docs/guides/SETUP_GUIDE.md`.
- **Fazer deploy?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Lançar uma release?** `docs/ops/RELEASE_CHECKLIST.md` (e a skill `/generate-release-cc` do Claude Code).
