# Repository Map (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Descrição em uma linha para cada diretório e arquivo raiz.**
> Última atualização: 2026-06-28 — OmniRoute v3.8.40
>
> Use este mapa para navegar rapidamente pela base de código. Para análises detalhadas, siga os links para a documentação dedicada.

## Árvore de nível superior

```
OmniRoute/
├── src/                  # Aplicação Next.js 16 (interface + rotas de API + bibliotecas + domínio + servidor)
├── open-sse/             # Workspace do mecanismo de streaming (manipuladores, executores, tradutor, servidor MCP)
├── packages/             # Workspaces npm: ui-kit (Keak CI UI Kit incorporado) e browser-pool
├── electron/             # Wrapper para desktop (Electron 41 + electron-builder 26.10)
├── bin/                  # Ponto de entrada da CLI e manipuladores de comandos
├── scripts/              # Scripts de build, verificação, sincronização e execução única
├── docs/                 # Documentação pública (você está aqui)
├── tests/                # Todas as suítes de testes (unitários, integração, e2e, clientes de protocolo)
├── public/               # Recursos estáticos do Next.js, manifesto PWA, service worker, ícones
├── config/               # Configuração estática + estado dos critérios de qualidade (i18n, payloadRules, quality/)
├── images/               # Recursos de imagem para marketing / README
├── @omniroute/           # Pacotes complementares publicáveis (opencode-plugin, opencode-provider)
├── skills/               # Pacotes de habilidades para CLI/agente (cli-* + omni-* + config-codex-cli)
├── examples/             # Plugins de exemplo + projeto inicial omniroute-cmd-hello
├── contrib/              # Contribuições da comunidade (podman/)
├── .source/              # Configuração de origem do Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Workflows do GitHub Actions + modelos de issues + modelo de PR
├── .husky/               # Hooks do Git (pre-commit, pre-push)
├── .claude/              # Comandos com barra do Claude Code (específicos do projeto)
├── .agents/              # Workflows + habilidades para Codex / agentes genéricos (espelho de .claude/)
├── .vscode/              # Configurações do workspace do VS Code
├── _ideia/               # Notas de planejamento (informais; não distribuídas)
├── _mono_repo/           # Subprojetos históricos (cloud, site, vscode-extension)
├── _references/          # Clones de referência somente leitura de projetos OSS relacionados
├── _tasks/               # Arquivos de acompanhamento de tarefas por versão (informais)
├── .build/ .worktrees/ dist/   # Áreas temporárias locais de build / git-worktree / saída de build (ignoradas pelo Git)
├── .issues/              # Cache local de issues (ignorado pelo Git)
├── .playwright-mcp/      # Artefatos de teste do Playwright MCP
├── coverage/             # Saída de cobertura do c8 (ignorada pelo Git)
├── logs/                 # Logs de execução (ignorados pelo Git)
├── node_modules/         # Dependências (ignoradas pelo Git)
├── package/              # Área de preparação para npm pack (artefato de build)
├── .next/                # Saída de build do Next.js (ignorada pelo Git)
└── (arquivos raiz — veja abaixo)
```

---

## Arquivos raiz

| Arquivo                                     | Finalidade                                                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **README.md**                               | Página inicial de marketing + início rápido + matriz de recursos (consulte também `llm.txt`)                       |
| **CHANGELOG.md**                            | Registro de alterações por versão (gerado automaticamente pela skill `/version-bump-cc`)                           |
| **LICENSE**                                 | Texto da licença MIT                                                                                               |
| **CLAUDE.md**                               | Regras do projeto para agentes do Claude Code (regras rígidas, convenções, cenários)                               |
| **AGENTS.md**                               | Igual ao CLAUDE.md, mas para agentes de IA que não sejam Claude (Codex, Cursor etc.)                               |
| **GEMINI.md**                               | Regras concisas para agentes baseados no Gemini (subconjunto do CLAUDE.md)                                         |
| **CONTRIBUTING.md**                         | Guia do colaborador: configuração, commits convencionais, testes, fluxo de PR                                      |
| **SECURITY.md**                             | Política de relato de vulnerabilidades, versões compatíveis, modelo de ameaças                                     |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — expectativas de comportamento da comunidade                                                 |
| **llm.txt**                                 | Página inicial em texto simples otimizada para rastreadores de LLM (SEO para assistentes de IA)                    |
| **package.json**                            | Manifesto npm, scripts, dependências, engines, limite de cobertura do c8                                           |
| **package-lock.json**                       | Árvore de dependências bloqueada                                                                                   |
| **tsconfig.json**                           | Configuração raiz do TypeScript                                                                                    |
| **tsconfig.typecheck-core.json**            | Configuração de verificação de tipos para o núcleo em `src/`                                                       |
| **tsconfig.typecheck-noimplicit-core.json** | Verificação de tipos estrita (`noImplicitAny`)                                                                     |
| **tsconfig.tsbuildinfo**                    | Cache de build incremental do TS (ignorado pelo Git)                                                               |
| **next.config.mjs**                         | Configuração de build do Next.js 16 (saída independente)                                                           |
| **next-env.d.ts**                           | Tipos de ambiente gerados automaticamente pelo Next.js                                                             |
| **eslint.config.mjs**                       | Configuração flat do ESLint (regras por área do projeto)                                                           |
| **prettier.config.mjs**                     | Regras de formatação do Prettier                                                                                   |
| **postcss.config.mjs**                      | Configuração do PostCSS para o pipeline do Tailwind/CSS                                                            |
| **playwright.config.ts**                    | Configuração de testes E2E do Playwright                                                                           |
| **vitest.config.ts**                        | Configuração do Vitest (suíte padrão)                                                                              |
| **vitest.mcp.config.ts**                    | Configuração do Vitest para o servidor MCP / suítes de autoCombo / cache                                           |
| **sonar-project.properties**                | Configuração do SonarQube/SonarCloud (qualidade do código)                                                         |
| **Dockerfile**                              | Build do Docker em múltiplos estágios (builder → runner-base → runner-cli)                                         |
| **docker-compose.yml**                      | Compose de desenvolvimento com 4 perfis (base, cli, host, cliproxyapi) + sidecar do Redis                          |
| **docker-compose.prod.yml**                 | Compose de produção (porta 20130, Redis, volumes nomeados)                                                         |
| **.dockerignore**                           | Arquivos excluídos do contexto do Docker                                                                           |
| **fly.toml**                                | Configuração de implantação no Fly.io (região `sin`, porta 20128, volume /data)                                    |
| **.env.example**                            | Modelo de arquivo de ambiente (copiado automaticamente para `.env` na primeira instalação)                         |
| **.gitignore**                              | Padrões de exclusão do Git                                                                                         |
| **.npmignore**                              | Lista de exclusão para publicação no npm                                                                           |
| **.npmrc**                                  | Configuração do npm (registro, política de lockfile)                                                               |
| **.node-version**                           | Versão fixada do Node (usada por ferramentas compatíveis com nvm)                                                  |
| **.nvmrc**                                  | Versão fixada do Node para nvm                                                                                     |
| **eslint.complexity.config.mjs**            | Configuração do ESLint para o controle progressivo de complexidade (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Configuração do ESLint para regras do SonarJS (complexidade cognitiva / duplicação)                                |
| **source.config.ts**                        | Configuração da fonte `defineDocs` do Fumadocs (alimenta `.source/`)                                               |
| **knip.json**                               | Configuração do Knip — arquivos/exportações/dependências não utilizados (alimenta a verificação de código morto)   |
| **stryker.conf.json**                       | Configuração de testes de mutação do Stryker                                                                       |
| **.size-limit.json**                        | Configuração do orçamento do bundle do size-limit                                                                  |
| **promptfooconfig.yaml**                    | Configuração de avaliação do promptfoo                                                                             |
| **.gitleaks.toml**                          | Conjunto de regras do gitleaks para varredura de segredos                                                          |
| **.zizmor.yml**                             | Configuração do zizmor para lint de segurança do GitHub Actions                                                    |
| **socket.yml**                              | Configuração de cadeia de suprimentos do Socket.dev                                                                |
| **news.json**                               | Feed localizado de anúncios da v2; o item de lançamento do Radar é distribuído inativo                             |
| **flake.nix** / **flake.lock**              | Definição do shell de desenvolvimento do Nix + arquivo de lock                                                     |
| **.env**                                    | Segredos locais (ignorados pelo git — gerados a partir de `.env.example`)                                          |

> **Movidos da raiz na v3.8.26 (organização):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` e o arquivo gerado `quality-metrics.json` (ignorado pelo git). Consulte [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — aplicativo Next.js

```
src/
├── app/                 # App Router (pages + API routes + status pages + landing)
├── lib/                 # Core libraries / domain modules (80 subdirs + ~70 top-level files)
├── domain/              # Pure domain logic (policy engine, fallback, cost, lockout, comboResolver, assessment)
├── server/              # Server-only modules (authz pipeline, cors, auth middleware) — cannot import from client
├── shared/              # Shared between server and client where safe (constants, types, validation, contracts, utils)
├── i18n/                # next-intl config + per-locale message JSON (67 locales)
├── middleware/          # Next.js middleware (request enrichment, locale detection)
├── mitm/                # MITM proxy core: cert gen/install, handlers, targets, inspector, masks, passthrough
│   ├── handlers/        # 9 IDE-agent handler classes extending MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Traffic capture layer: buffer (in-memory ring), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Model adapter glue (legacy shim)
├── scripts/             # In-tree maintenance scripts (e.g., backfillAggregation)
├── sse/                 # Legacy SSE handlers/services (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Legacy in-memory store (being phased out for src/lib/db)
├── types/               # Shared TS type files
├── instrumentation.ts   # Next.js telemetry hook (browser + edge)
├── instrumentation-node.ts  # Node-only instrumentation
└── proxy.ts             # HTTP-proxy entry shim
```

### `src/app/` — Roteador de aplicativo (Next.js 16)

| Caminho                                                                      | Propósito                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                                | API público compatível com OpenAI (~ 25 sub-rotas: bate-papo, conclusões, incorporações, arquivos, lotes, áudio, imagens, vídeos, música, reclassificação, moderações, pesquisa, ws, agentes, contas, provedores, etc.)                                                                                                  |
| `app/api/v1beta/`                                                            | Terminais API estilo Gemini                                                                                                                                                                                                                                                                                              |
| `app/api/playground/`                                                        | Rotas do Playground Studio: `improve-prompt/` (POST — LLM prompt rewriter), `presets/` (GET list / POST create), `presets/[id]/` (GET / PUT / DELETE) — veja `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                      |
| `app/api/` (não-v1)                                                          | rotas Management/admin (diretórios ~ 60: provedores, combos, configurações, mcp, a2a, avaliações, memória, habilidades, webhooks, conformidade, resiliência, monitoramento, túneis, ferramentas cli, etc.)                                                                                                               |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 rotas (controle de servidor, agente state/DNS/mappings, bypass, certificado, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Veja `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                               |
| `app/api/tools/traffic-inspector/`                                           | Inspetor de tráfego REST + WS API — 16 rotas + (solicitações, sessões, hosts, modos de captura, exportação, ws). LOCAL_ONLY + SPAWN_CAPABLE. Veja `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                             |
| `app/a2a/`                                                                   | Ponto de entrada A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                          |
| `app/.well-known/agent.json/`                                                | Cartão de agente A2A (descoberta)                                                                                                                                                                                                                                                                                        |
| `app/(dashboard)/dashboard/`                                                 | Páginas UI do painel (50 seções +, arquivos ~ 118 page.tsx : provedores, combos, configurações, memória, habilidades, webhooks, avaliações, auditoria, lote, cache, custos, integridade, sistema, atividade, etc.)                                                                                                       |
| `app/(dashboard)/dashboard/search-tools/`                                    | Ferramentas de pesquisa Studio UI (3 guias: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) - consulte `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                             |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plano 21): `page.tsx` (shell de 3 guias), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | página do painel AgentBridge - placa de servidor, 9 placas de agente, assistente de configuração, mapeamento de modelo, lista de bypass. i18n PT-BR + EN. Veja `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                         |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Página do painel do Traffic Inspector - divisão DevTools, 7 guias de detalhes, 4 alternadores de modo de captura, gravador de sessão, colorização de contexto. i18n PT-BR + EN. Veja `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                             |
| `app/(dashboard)/dashboard/activity/`                                        | Página de feed de atividades (Grupo B): `page.tsx` (servidor) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — consulte `docs/architecture/MONITORING_SECTIONS.md`                                                                                                  |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Página de compartilhamento de cota (Grupo B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Página de configuração do plano do provedor (Grupo B): `page.tsx` + `ProviderPlanConfigClient.tsx` — dimensões de cota por substituição de conexão                                                                                                                                                                       |
| `app/docs/`                                                                  | Visualizador de documentação incorporado (renderiza `docs/*.md`)                                                                                                                                                                                                                                                         |
| `app/landing/`                                                               | Página de destino de marketing                                                                                                                                                                                                                                                                                           |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Páginas relacionadas à autenticação                                                                                                                                                                                                                                                                                      |
| `app/{400,401,403,408,429,500,502,503}/`                                     | páginas de erro HTTP                                                                                                                                                                                                                                                                                                     |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | páginas Static/status                                                                                                                                                                                                                                                                                                    |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Layout raiz, home, manifesto PWA, CSS global                                                                                                                                                                                                                                                                             |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Limites de erro                                                                                                                                                                                                                                                                                                          |

### `src/lib/` — Bibliotecas principais (módulos ~ 50)

| Módulo                                   | Propósito                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | gerenciador de tarefas do protocolo A2A, habilidades (5), streaming                                                                                                                                                                                                                                                                          |
| `acp/`                                   | Registro do agente CLI (descoberta CLI local — consulte `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                          |
| `api/`                                   | Ajudantes API compartilhados (`requireManagementAuth`, validação)                                                                                                                                                                                                                                                                            |
| `auth/`                                  | Sessão, hash de senha, validação de token                                                                                                                                                                                                                                                                                                    |
| `batches/`                               | OpenAI Lotes manipuladores API                                                                                                                                                                                                                                                                                                               |
| `catalog/`                               | Resolução do recurso + de validação do catálogo do provedor Zod                                                                                                                                                                                                                                                                              |
| `cloudAgent/`                            | Agentes de nuvem (Codex Cloud, Devin, Jules) — consulte `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                     |
| `combos/`                                | Ajudantes de reordenação + de resolução combinada                                                                                                                                                                                                                                                                                            |
| `audit/`                                 | Auxiliares de feed de atividades: `highLevelActions.ts` (lista de permissões + `isHighLevelAction()`), `activityIcons.ts` (mapa de ação → icon/verb ), `timeline.ts` (groupByDay/relativeTime) — consulte `docs/architecture/MONITORING_SECTIONS.md`                                                                                         |
| `compliance/`                            | Log de auditoria auditoria do provedor + — consulte `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                            |
| `compression/`                           | Cola para motor de compressão (os motores vivem em `open-sse/services/compression/`)                                                                                                                                                                                                                                                         |
| `config/`                                | Auxiliares de configuração de tempo de execução                                                                                                                                                                                                                                                                                              |
| `db/`                                    | 120 módulos + de domínio DB + 168 migrações (sempre passe aqui para SQLite)                                                                                                                                                                                                                                                                  |
| `quota/`                                 | Mecanismo de compartilhamento de cotas: `dimensions.ts` (types/Zod), `types.ts` ( interface QuotaStore ), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — veja `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Cliente de catálogo de modelo livre de radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — consulte `docs/frameworks/RADAR.md`                                                                                                                                               |
| `display/`                               | Auxiliares de formatação UI (custo, latência, etc.)                                                                                                                                                                                                                                                                                          |
| `embeddings/`                            | Ajudantes de serviço de incorporações                                                                                                                                                                                                                                                                                                        |
| `env/`                                   | Variável Env analisando validação +                                                                                                                                                                                                                                                                                                          |
| `evals/`                                 | Estrutura de avaliação (suites, runner, runtime) — consulte `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                                       |
| `guardrails/`                            | mascarador PII, injeção imediata, ponte de visão — veja `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                                        |
| `jobs/`                                  | Trabalhos em segundo plano (semelhantes ao cron)                                                                                                                                                                                                                                                                                             |
| `memory/`                                | Memória de conversação (SQLite FTS5 + sqlite-vec híbrido RRF + Qdrant nível 2) - consulte `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                        |
| `memory/embedding/`                      | Camada de incorporação de múltiplas fontes: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plano 21)                                                                                                                                                                                 |
| `memory/vectorStore.ts`                  | wrapper sqlite-vec v0.1.9 - KNN força bruta + híbrido RRF (vetor FTS5 +, k = 60). Lazy-init, degrada normalmente quando o sqlite-vec não está disponível. (plano 21)                                                                                                                                                                         |
| `memory/reindex.ts`                      | `runReindexBatch()` — processa memórias com `needs_reindex=1` em segundo plano; chamado por `POST /api/memory/reindex` e caminho de preenchimento lento. (plano 21)                                                                                                                                                                          |
| `monitoring/`                            | Verificações de integridade, emissão de métricas                                                                                                                                                                                                                                                                                             |
| `oauth/`                                 | fluxos OAuth/import para 22 módulos provedores (agy, antigravidade, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                                 |
| `plugins/`                               | Registro de plug-in                                                                                                                                                                                                                                                                                                                          |
| `promptCache/`                           | Pontos de interrupção de cache de prompt de estilo antrópico                                                                                                                                                                                                                                                                                 |
| `skills/`                                | Estrutura de habilidades (mercado + integrado + SkillsSH) — consulte `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                             |
| `playground/`                            | Ajudantes compartilhados do Playground Studio: `codeExport.ts` (gerador curl/Python/TS ), `promptImprover.ts` (construtor de meta-prompt), `streamMetrics.ts` ( TTFT/TPS puro), `types.ts` (tabela de preços) - consulte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                              |
| `webhookDispatcher.ts`                   | entrega de webhook HMAC - consulte `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                             |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Gerentes de túneis - veja `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                                        |
| `cloudSync.ts`, `initCloudSync.ts`       | Sincronização opcional de estado na nuvem                                                                                                                                                                                                                                                                                                    |
| `localDb.ts`                             | Barril de reexportação para módulos db (sem lógica - apenas reexportações)                                                                                                                                                                                                                                                                   |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Solicitar cache de idempotência +                                                                                                                                                                                                                                                                                                            |
| (~ mais 30 arquivos de nível superior)   | Ajudantes especializados (logEnv, modelsDevSync, piiSanitizer, etc.)                                                                                                                                                                                                                                                                         |

### `src/lib/db/` — Banco de dados (147 módulos + 208 migrações)

| Subdiretório              | Propósito                                                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `db/core.ts`              | singleton `getDbInstance()` com registro no diário WAL                                                                                                                                     |
| `db/migrations/`          | Arquivos SQL versionados (idempotentes, transacionais). `073_memory_vec.sql` adiciona coluna `memory_vec_meta` + `needs_reindex` (plano 21).                                               |
| `db/playgroundPresets.ts` | Módulo CRUD para predefinições do Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)         |
| `db/memoryVec.ts`         | CRUD para `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue`, etc. (plano 21)                              |
| `db/<domain>.ts`          | Um módulo por domínio: provedores, combos, apiKeys, usuários, sessões, uso, log de auditoria, webhooks, habilidades, memory_entries, cloud_agent_tasks, evals* \* , raciocínio_cache, etc. |

### `src/domain/`

| Módulo                 | Propósito                                                    |
| ---------------------- | ------------------------------------------------------------ |
| `policy.ts`            | Mecanismo de política                                        |
| `fallbackPolicy.ts`    | Árvore de decisão substituta                                 |
| `costRules.ts`         | Regras de cálculo de custos                                  |
| `lockoutPolicy.ts`     | política de bloqueio Model/connection                        |
| `tagRouter.ts`         | Roteamento baseado em tags                                   |
| `comboResolver.ts`     | Resolução de combinação (usada pelo mecanismo de combinação) |
| `modelAvailability.ts` | Verificação de disponibilidade por modelo                    |
| `assessment/`          | Avaliação do modelo (Fase 1 da RFC-AUTO-ASSESSMENT)          |

### `src/server/`

| Módulo   | Propósito                                                                                                  |
| -------- | ---------------------------------------------------------------------------------------------------------- |
| `authz/` | Pipeline de autorização: `classify` → `policies` → `enforce` — consulte `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | configuração CORS                                                                                          |
| `auth/`  | Middleware de sessão                                                                                       |

### `src/shared/`

| Módulo                           | Propósito                                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `components/`                    | Componente do painel API: adaptadores sobre `packages/ui-kit` - consulte `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: nomes de ícones usados pelas telas → componentes Lucide (`<Icon>`)                                |
| `constants/providers.ts`         | **377 provedores** com validação Zod (fonte da verdade)                                                       |
| `constants/cliTools.ts`          | Registro externo da ferramenta CLI                                                                            |
| `constants/routingStrategies.ts` | **20 estratégias de roteamento** com prioridades                                                              |
| `constants/publicApiRoutes.ts`   | Rotas que exigem autenticação do portador (vs gerenciamento)                                                  |
| `constants/upstreamHeaders.ts`   | Lista de bloqueio de cabeçalho para solicitações upstream                                                     |
| `validation/schemas.ts`          | Esquemas ~ 80 Zod (fonte única de verdade para contratos API )                                                |
| `validation/helpers.ts`          | Ajudantes de validação Zod (`validateBody`, etc.)                                                             |
| `types/`                         | Tipos TS compartilhados                                                                                       |
| `contracts/`                     | Contratos públicos API (consumidos por `files:` em `package.json`)                                            |
| `utils/circuitBreaker.ts`        | Disjuntor do provedor (ver `docs/architecture/RESILIENCE_GUIDE.md`)                                           |
| `utils/apiAuth.ts`               | validação de chave API, verificação de escopo                                                                 |
| `utils/fetchTimeout.ts`          | Wrappers Timeout/abort para busca upstream                                                                    |
| `utils/releaseNotes.ts`          | Analisador de anúncio v2/legacy fechado, localização e dispensa ID                                            |

---

## `open-sse/` — Área de trabalho do mecanismo de streaming

Área de trabalho npm separada (`@omniroute/open-sse`). Processa requisições e executa provedores.

```
open-sse/
├── handlers/            # 16 arquivos (12 manipuladores + 4 auxiliares): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search, etc.
├── executors/           # 150 módulos executores (classes que estendem BaseExecutor + auxiliares específicos por provedor)
├── translator/          # Conversores de formato (9 de requisição, 9 de resposta, 9 auxiliares)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ módulos de serviço (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM, etc.)
├── mcp-server/          # Servidor MCP (110 ferramentas, 3 transportes, 33 escopos)
├── config/              # Registros de provedores/modelos, configuração de cabeçalhos, aliases de modelos
├── utils/               # Cliente TLS, fetch/dispatcher de proxy, auxiliares de rede
├── index.ts             # Ponto de entrada da área de trabalho
├── package.json         # Manifesto da área de trabalho
├── tsconfig.json        # Configuração TS da área de trabalho
└── types.d.ts           # Declarações de tipos da área de trabalho
```

### `open-sse/mcp-server/`

| Caminho                     | Finalidade                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| `server.ts`                 | Ciclo de vida do servidor MCP (transportes stdio + HTTP)                                   |
| `httpTransport.ts`          | Transportes HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                      |
| `audit.ts`                  | Registro de auditoria na tabela `mcp_tool_audit`                                           |
| `scopeEnforcement.ts`       | Validação de escopo por ferramenta                                                         |
| `runtimeHeartbeat.ts`       | Sinal de integridade em `DATA_DIR/runtime/mcp-heartbeat.json`                              |
| `descriptionCompressor.ts`  | Compacta os metadados de descrição das ferramentas para economizar contexto                |
| `schemas/tools.ts`          | 36 definições de ferramentas básicas + escopos                                             |
| `tools/advancedTools.ts`    | Implementações de ferramentas avançadas                                                    |
| `tools/memoryTools.ts`      | 3 ferramentas de memória (pesquisar/adicionar/limpar)                                      |
| `tools/skillTools.ts`       | 4 ferramentas de habilidades (listar/habilitar/executar/execuções)                         |
| `tools/compressionTools.ts` | 5 ferramentas de compactação                                                               |
| `README.md`                 | README interno do servidor MCP (com referência cruzada em `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — Áreas de trabalho

| Caminho                  | Finalidade                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — snapshot incorporado do Keak CI UI Kit (`private`, `UNLICENSED`), consumido como código-fonte (sem compilação). `UPSTREAM.md` fixa o commit upstream e registra a autorização da licença; `PATCHES.md` lista patches locais (nenhum); `src/` é sincronizado apenas por `scripts/dev/sync-ui-kit.sh` e protegido por `npm run check:ui-kit-snapshot`. Consulte `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — serviço opcional de pool de navegadores (chat baseado em CloakBrowser e Playwright)                                                                                                                                                                                                                                                                                                          |

---

## `electron/` — Wrapper para desktop

| Arquivo          | Finalidade                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `main.js`        | Processo principal do Electron (BrowserWindow, servidor Next.js integrado, bandeja, atualização automática) |
| `preload.js`     | Ponte IPC (contextBridge → `window.omniroute`)                                                              |
| `package.json`   | Configuração do electron-builder + Electron 41 + dependências do electron-builder 26.10                     |
| `assets/`        | Ícones do aplicativo (Windows .ico, macOS .icns, Linux .png)                                                |
| `dist-electron/` | Saída da compilação (ignorada pelo git)                                                                     |
| `types.d.ts`     | Declarações de tipos para a ponte do renderizador                                                           |
| `README.md`      | README interno do Electron (consulte também `docs/guides/ELECTRON_GUIDE.md`)                                |

---

## `bin/` — CLI

| Arquivo                                                                                                     | Finalidade                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Entrada principal da CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` etc. |
| `reset-password.mjs`                                                                                        | CLI independente para redefinição de senha                                                                                          |
| `cli/commands/setup.mjs`                                                                                    | Assistente de configuração interativo e não interativo                                                                              |
| `cli/commands/doctor.mjs`                                                                                   | Diagnóstico da integridade do sistema (mais de 8 verificações)                                                                      |
| `cli/commands/providers.mjs`                                                                                | Listagem/teste/validação de provedores                                                                                              |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Módulos auxiliares da CLI                                                                                                           |
| `cli/tray/tray.ts`                                                                                          | Integração com a bandeja do sistema (multiplataforma: NotifyIcon no Windows, systray2 no macOS/Linux)                               |
| `cli/tray/tray.ps1`                                                                                         | Backend PowerShell do NotifyIcon (Windows, sem novos binários)                                                                      |
| `cli/tray/autostart.ts`                                                                                     | Inicialização automática multiplataforma (LaunchAgent / .desktop / registro)                                                        |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Cadeia de resolução do driver SQLite em 5 etapas (incluído → tempo de execução → instalação sob demanda → node:sqlite → sql.js)     |
| `cli/runtime/magicBytes.mjs`                                                                                | Validação de bytes mágicos de binários (ELF / Mach-O / Mach-O fat / PE)                                                             |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — pré-resolve os drivers durante o postinstall / primeira inicialização                                          |
| `nodeRuntimeSupport.mjs`                                                                                    | Valida a versão compatível do Node.js durante a instalação                                                                          |

---

## `skills/` — Skills públicas de agentes

| Arquivo                      | Finalidade                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifestos de skills para agentes de IA externos (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Scripts de build e verificação

| Script                              | Finalidade                                                                                            |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Executor de desenvolvimento/inicialização com carregamento de variáveis de ambiente                   |
| `build-next-isolated.mjs`           | Build autônomo (modo standalone do Next.js 16)                                                        |
| `prepublish.ts`                     | Preparação do pacote antes de `npm pack`                                                              |
| `postinstall.mjs`                   | Cria automaticamente o `.env` a partir de `.env.example` na primeira instalação                       |
| `sync-env.mjs`                      | Sincroniza novamente as chaves do `.env` com o `.env.example`                                         |
| `check-cycles.mjs`                  | Detecta dependências circulares                                                                       |
| `check-route-validation.mjs`        | Valida se todas as rotas da API têm validação Zod                                                     |
| `check-t11-any-budget.mjs`          | Impõe um limite explícito de `any` por arquivo                                                        |
| `check-docs-sync.mjs`               | Valida a sincronização das versões da documentação (pre-commit existente)                             |
| **`check-env-doc-sync.mjs`**        | NOVO: verifica as variáveis de ambiente no código em relação ao `.env.example` e ao `ENVIRONMENT.md`  |
| **`check-docs-counts-sync.mjs`**    | NOVO: valida se as contagens (executores, estratégias, OAuth, skills A2A) correspondem à documentação |
| **`check-deprecated-versions.mjs`** | NOVO: sinaliza versões/datas desatualizadas na documentação                                           |
| `check-supported-node-runtime.ts`   | Valida se a versão atual do Node é compatível                                                         |
| `check-pr-test-policy.mjs`          | Impõe a regra de "testes obrigatórios" para alterações no código de produção                          |
| **`gen-provider-reference.ts`**     | NOVO: gera automaticamente `docs/reference/PROVIDER_REFERENCE.md` a partir do catálogo                |
| `i18n/generate-multilang.mjs`       | Traduz strings da interface e documentação por meio do Google Translate                               |
| `i18n_autotranslate.py`             | Pipeline de tradução de documentação baseada em LLM                                                   |
| `validate_translation.py`           | Validação da tradução por localidade                                                                  |
| `check_translations.py`             | Verificação de chaves de i18n no código                                                               |
| `run-playwright-tests.mjs`          | Executor de testes E2E do Playwright                                                                  |
| `run-protocol-clients-tests.mjs`    | Executor de testes E2E de MCP/A2A                                                                     |
| `run-ecosystem-tests.mjs`           | Testes do ecossistema (integração de provedores)                                                      |
| `test-report-summary.mjs`           | Gera um resumo de cobertura em Markdown                                                               |
| `smoke-electron-packaged.mjs`       | Executa um teste de fumaça do build empacotado do Electron                                            |
| `native-binary-compat.mjs`          | Valida se as dependências nativas (`better-sqlite3`) correspondem ao Node do Electron                 |
| `validate-pack-artifact.ts`         | Valida a saída do pacote npm                                                                          |
| `responses-ws-proxy.mjs`            | Ponte WebSocket para a API Codex Responses                                                            |
| `v1-ws-bridge.mjs`                  | Ponte WebSocket para o endpoint `/api/v1/ws`                                                          |
| `standalone-server-ws.mjs`          | Executor do servidor WS autônomo                                                                      |
| `system-info.mjs`                   | Exibe informações do sistema/ambiente de execução para suporte                                        |
| `healthcheck.mjs`                   | Verificação de integridade de execução única (usada pelo Docker HEALTHCHECK)                          |
| `uninstall.mjs`                     | Script de desinstalação limpa                                                                         |
| `dev/sync-ui-kit.sh`                | Copia o `src/` do CI UI Kit em um commit fixado para `packages/ui-kit/src`                            |
| `check/check-ui-kit-snapshot.mjs`   | Verificação de pre-commit: `packages/ui-kit/src` corresponde ao commit upstream fixado                |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — nomes de ícones em uso que `ICON_MAP` não mapeia                             |
| `dev/codemod-material-icons.mjs`    | Reescreve spans literais do Material Symbols como `<Icon>` (ferramenta de migração)                   |

---

## `docs/` — Documentação pública (7 arquivos raiz + 17 subdiretórios)

### Guias de nível superior

| Doutor                      | Propósito                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Arquitetura de alto nível, mapa de subsistemas, superfície do painel                            |
| `CODEBASE_DOCUMENTATION.md` | Referência de engenharia: diretórios, módulos, convenções                                       |
| `FEATURES.md`               | Matriz de recursos com destaques da v3.8                                                        |
| `USER_GUIDE.md`             | Manual do usuário final (configuração, modelos, combos, CLIs, áudio, etc.)                      |
| `API_REFERENCE.md`          | referência de endpoint API com modelo de autenticação                                           |
| `openapi.yaml`              | Especificação OpenAPI 3.0 (121 caminhos)                                                        |
| `SETUP_GUIDE.md`            | Métodos de instalação (npm, npx, Docker, Electron, Termux, fonte)                               |
| `ENVIRONMENT.md`            | Todos os env vars (~ 800 documentados, ~ 3.050 linhas `.env.example`)                           |
| `TROUBLESHOOTING.md`        | Erros comuns, problemas conhecidos + v3.8.0                                                     |
| `RELEASE_CHECKLIST.md`      | Fluxo de liberação completo (habilidades, husky, commits convencionais, implantação)            |
| `COVERAGE_PLAN.md`          | Metas de cobertura e estado atual                                                               |
| `FREE_TIERS.md`             | Provedores de nível gratuito selecionados (48 + grátis + 11 OAuth)                              |
| `CLI-TOOLS.md`              | Integrações CLI externas + OmniRoute interno CLI                                                |
| `I18N.md`                   | Arquitetura i18n, adicionando um idioma, 67 localidades                                         |
| `UNINSTALL.md`              | Limpe as etapas de desinstalação                                                                |
| `PROVIDER_REFERENCE.md`     | **Gerado automaticamente** catálogo de 377 provedores (regen: `npm run gen:provider-reference`) |

### Aprofundamentos do subsistema

| Doutor                                         | Propósito                                                                                  |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `MCP-SERVER.md`                                | Servidor MCP : 110 ferramentas, 3 transportes, 33 escopos, endpoints REST                  |
| `A2A-SERVER.md`                                | A2A v0.3: JSON-RPC, 6 habilidades, ajudantes REST, cartão de agente                        |
| `AGENT_PROTOCOLS_GUIDE.md`                     | Guia unificado: A2A vs ACP vs Cloud Agents                                                 |
| `CLOUD_AGENT.md`                               | Orquestração Codex Cloud / Devin / Jules                                                   |
| `SKILLS.md`                                    | Estrutura de habilidades ( + marketplace integrado + SkillsSH + sandbox)                   |
| `RADAR.md`                                     | Sobreposição de catálogo de modelo livre de radar (`RADAR_ENABLED`, desativado por padrão) |
| `MEMORY.md`                                    | Sistema de memória (SQLite FTS5 + Qdrant)                                                  |
| `EVALS.md`                                     | Estrutura de avaliação (suítes, corridas, rubricas)                                        |
| `GUARDRAILS.md`                                | máscara PII, injeção imediata, ponte de visão                                              |
| `COMPLIANCE.md`                                | Registro de auditoria, retenção, cancelamento de noLog                                     |
| `WEBHOOKS.md`                                  | Entrega de webhook assinado por HMAC                                                       |
| `REASONING_REPLAY.md`                          | Cache memory/SQLite híbrido para `reasoning_content`                                       |
| `AUTHZ_GUIDE.md`                               | Pipeline de autorização (`classify` → `policies` → `enforce`)                              |
| `RESILIENCE_GUIDE.md`                          | Disjuntor + cooldown bloqueio do modelo +                                                  |
| `docs/security/STEALTH_GUIDE.md` (somente git) | impressão digital TLS (JA3/JA4), código CCHClaude, certificado MITM                        |
| `AUTO-COMBO.md`                                | Mecanismo Auto Combo (pontuação de 16 fatores, pacotes de 6 modos, fábrica virtual)        |

### Compressão

| Doutor                          | Propósito                                              |
| ------------------------------- | ------------------------------------------------------ |
| `COMPRESSION_GUIDE.md`          | Visão geral dos modos de compactação + roadmap         |
| `COMPRESSION_ENGINES.md`        | Motores Caveman + RTK, contrato de registro            |
| `COMPRESSION_RULES_FORMAT.md`   | Esquema JSON do pacote de regras do homem das cavernas |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventário de pacotes de regras por idioma             |
| `RTK_COMPRESSION.md`            | Pipeline declarativo RTK (56 filtros)                  |

### Implantação

| Doutor                       | Propósito                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | compilação Docker, perfis (base/cli/host/cliproxyapi), arquivo secundário Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Implantação genérica VM/VPS (Ubuntu/Debian + nginx + systemd)                   |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Implantação Fly.io (atualmente apenas em chinês)                                |
| `TERMUX_GUIDE.md`            | Android sem cabeça via Termux                                                   |
| `PWA_GUIDE.md`               | Progressive Web App instala o trabalhador de serviço +                          |
| `ELECTRON_GUIDE.md`          | Construção de aplicativo de desktop + sign + distribuir                         |
| `TUNNELS_GUIDE.md`           | + ngrok + Tailscale Cloudflared                                                 |
| `PROXY_GUIDE.md`             | Proxy de saída de 4 níveis + 1proxy marketplace                                 |

### Subdiretórios

| Subdiretório          | Propósito                                                                                                                                                                                                            |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Traduções de documentos localizados (41 localidades)                                                                                                                                                                 |
| `docs/screenshots/`   | Recursos de imagem para guias                                                                                                                                                                                        |
| `_tasks/superpowers/` | Plans/specs de superpoderes (`writing-plans`/`brainstorming`) + research — repositório isolado, com versão separada, gitignorado pela árvore principal. Consulte CLAUDE.md → "Artefatos de planejamento e pesquisa". |

---

## `tests/` — Suítes de testes

| Subdiretório                         | Tipo                                             | Executor                                           |
| ------------------------------------ | ------------------------------------------------ | -------------------------------------------------- |
| `tests/unit/`                        | Testes unitários (~4.800 arquivos, mais rápidos) | Executor de testes nativo do Node                  |
| `tests/integration/`                 | Testes de integração de múltiplos módulos + BD   | Executor de testes nativo do Node (concorrência 1) |
| `tests/e2e/`                         | E2E de interface + fluxo de trabalho             | Playwright                                         |
| `tests/e2e/protocol-clients.test.ts` | E2E de cliente real MCP + A2A                    | Clientes de protocolo personalizados               |
| `tests/e2e/ecosystem.test.ts`        | Integração de provedores (com acesso à rede)     | Executor de testes nativo do Node                  |

---

## `public/` — Ativos estáticos

| Caminho             | Finalidade                                                             |
| ------------------- | ---------------------------------------------------------------------- |
| `public/` (raiz)    | Favicons, robots.txt, manifesto, service worker e imagens de marketing |
| `public/providers/` | Logos PNG/SVG dos provedores (usados no painel)                        |

---

## `config/` — Configurações estáticas + estado dos critérios de qualidade

Modelos de configuração distribuídos, além das linhas de base dos critérios de qualidade versionadas
(movidos da raiz do repositório na v3.8.26 para mantê-la enxuta).

| Caminho                                       | Finalidade                                                                                  |
| --------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Lista de localidades + metadados (fonte canônica para a contagem de 42 localidades)         |
| `config/i18n-schema.json`                     | Esquema JSON que valida `i18n.json`                                                         |
| `config/payloadRules.json`                    | Regras de sanitização de payloads upstream                                                  |
| `config/quality/quality-baseline.json`        | Linha de base incremental com várias métricas (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Linha de base congelada de complexidade do ESLint (`check-complexity.mjs`)                  |
| `config/quality/duplication-baseline.json`    | Linha de base congelada de duplicação do jscpd (`check-duplication.mjs`)                    |
| `config/quality/file-size-baseline.json`      | Linha de base congelada de tamanho por arquivo (`check-file-size.mjs`)                      |
| `config/quality/test-discovery-baseline.json` | Linha de base congelada de testes órfãos (`check-test-discovery.mjs`)                       |
| `config/quality/dependency-allowlist.json`    | Lista de permissões de dependências aprovadas (`check-deps.mjs`)                            |
| `config/quality/.license-allowlist.json`      | Lista de permissões de licenças SPDX (`check-licenses.mjs`)                                 |
| `config/quality/quality-metrics.json`         | Métricas efêmeras coletadas (geradas por `collect-metrics.mjs`; **ignoradas pelo Git**)     |

---

## `.github/` — Integração com o GitHub

| Caminho                            | Finalidade                                                                       |
| ---------------------------------- | -------------------------------------------------------------------------------- |
| `.github/workflows/`               | Fluxos de trabalho de CI/CD do GitHub Actions (lint, testes, cobertura, release) |
| `.github/ISSUE_TEMPLATE/`          | Modelos de issues para bugs/funcionalidades                                      |
| `.github/pull_request_template.md` | Modelo de PR                                                                     |
| `.github/dependabot.yml`           | Configuração de atualização de dependências                                      |

---

## `.husky/` — Hooks do Git

| Arquivo      | Finalidade                                                                  |
| ------------ | --------------------------------------------------------------------------- |
| `pre-commit` | Executa `lint-staged + check-docs-sync + check:any-budget:t11`              |
| `pre-push`   | Atualmente desativado (comentado). Execute `npm run test:unit` manualmente. |
| `_/`         | Componentes internos do Husky                                               |

---

## `.claude/` — Comandos de Barra do Claude Code

| Arquivo                                             | Finalidade                                                      |
| --------------------------------------------------- | --------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — incrementa a versão + changelog automático |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — fluxo de trabalho completo de release  |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Faz deploy na VPS                                               |
| `commands/capture-release-evidences-cc.md`          | Grava novos recursos no navegador em formato WebP               |
| `commands/review-{prs,discussions}-cc.md`           | Faz a triagem de PRs/discussões do GitHub                       |
| `commands/{review-issues,implement-features}-cc.md` | Fluxos de trabalho de issues                                    |
| `settings.local.json`                               | Configurações do Claude Code específicas do projeto             |

---

## `.agents/` — Fluxos de Trabalho Genéricos para Agentes (Codex / Cursor / etc.)

| Caminho                  | Finalidade                                                           |
| ------------------------ | -------------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definições de fluxos de trabalho (espelho de `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definições de habilidades com notas de execução do Codex           |

> **Observação:** Atualmente, os fluxos de trabalho e os comandos são idênticos byte por byte. Se `.agents/` tiver como objetivo atender a um runtime de agente diferente (Codex), as variantes precisarão divergir de forma significativa.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Fora da Árvore

Esses diretórios prefixados com sublinhado contêm conteúdo que não é distribuído:

- **`_ideia/`** — notas de design (categorias adiar / inadequado / viável)
- **`_mono_repo/`** — subprojetos históricos (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — clones somente para leitura de projetos OSS relacionados (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api etc.) para referência cruzada durante o desenvolvimento
- **`_tasks/`** — arquivos de acompanhamento de tarefas por release (informais)

Não incluídos na saída de `npm pack`. Consulte `.npmignore`.

---

## Gerados / Ignorados pelo Git

| Caminho                | Finalidade                           |
| ---------------------- | ------------------------------------ |
| `node_modules/`        | Dependências npm                     |
| `.next/`               | Saída de build do Next.js            |
| `coverage/`            | Relatórios de cobertura do c8        |
| `logs/`                | Logs de execução                     |
| `package/`             | Área de preparação do npm pack       |
| `.playwright-mcp/`     | Artefatos de teste do Playwright MCP |
| `.issues/`             | Cache local de issues                |
| `tsconfig.tsbuildinfo` | Cache incremental do TS              |

---

## Dicas de navegação

- **Novo colaborador?** Leia `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Adicionando um provedor?** Siga `docs/architecture/ARCHITECTURE.md § Adding a New Provider` e confira também `docs/reference/PROVIDER_REFERENCE.md`.
- **Adicionando uma rota?** Consulte `docs/architecture/ARCHITECTURE.md § Adding a New API Route` e `src/shared/validation/schemas.ts`.
- **Adicionando uma ferramenta MCP?** Consulte `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Adicionando uma skill A2A?** Consulte `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Executando localmente?** Consulte `docs/guides/SETUP_GUIDE.md`.
- **Fazendo o deploy?** Consulte `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Publicando uma versão?** Consulte `docs/ops/RELEASE_CHECKLIST.md` (e a skill `/generate-release-cc` do Claude Code).
