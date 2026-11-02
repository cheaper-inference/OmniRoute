# Repository Map (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Descrição numa linha para cada diretório e ficheiro raiz.**
> Última atualização: 2026-06-28 — OmniRoute v3.8.40
>
> Utilize este mapa para navegar rapidamente pela base de código. Para análises aprofundadas, siga as ligações para a documentação dedicada.

## Árvore de nível superior

```
OmniRoute/
├── src/                  # Aplicação Next.js 16 (IU + rotas de API + bibliotecas + domínio + servidor)
├── open-sse/             # Espaço de trabalho do motor de streaming (processadores, executores, tradutor, servidor MCP)
├── packages/            # Espaços de trabalho npm: ui-kit (Keak CI UI Kit integrado) e browser-pool
├── electron/             # Wrapper para ambiente de trabalho (Electron 41 + electron-builder 26.10)
├── bin/                  # Ponto de entrada da CLI e processadores de comandos
├── scripts/              # Scripts de compilação, verificação, sincronização e utilização pontual
├── docs/                 # Documentação pública (está aqui)
├── tests/                # Todos os conjuntos de testes (unitários, integração, e2e, clientes de protocolo)
├── public/               # Recursos estáticos do Next.js, manifesto PWA, service worker, ícones
├── config/               # Configuração estática + estado dos controlos de qualidade (i18n, payloadRules, quality/)
├── images/               # Recursos de imagem para marketing/README
├── @omniroute/           # Pacotes complementares publicáveis (opencode-plugin, opencode-provider)
├── skills/               # Pacotes de competências para CLI/agentes (cli-* + omni-* + config-codex-cli)
├── examples/             # Plugins de exemplo + projeto inicial omniroute-cmd-hello
├── contrib/              # Contribuições da comunidade (podman/)
├── .source/              # Configuração de origem do Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Fluxos de trabalho do GitHub Actions + modelos de problemas + modelo de PR
├── .husky/               # Hooks do Git (pre-commit, pre-push)
├── .claude/              # Comandos de barra do Claude Code (específicos do projeto)
├── .agents/              # Fluxos de trabalho + competências do Codex/agentes genéricos (réplica de .claude/)
├── .vscode/              # Definições do espaço de trabalho do VS Code
├── _ideia/               # Notas de planeamento (informais; não distribuídas)
├── _mono_repo/           # Subprojetos históricos (cloud, site, vscode-extension)
├── _references/          # Clones de referência só de leitura de projetos OSS relacionados
├── _tasks/               # Ficheiros de acompanhamento de tarefas por versão (informais)
├── .build/ .worktrees/ dist/   # Área temporária para compilações locais/git worktrees/resultados de compilação (ignorada pelo Git)
├── .issues/              # Cache local de problemas (ignorado pelo Git)
├── .playwright-mcp/      # Artefactos de teste do Playwright MCP
├── coverage/             # Resultados de cobertura do c8 (ignorados pelo Git)
├── logs/                 # Registos de execução (ignorados pelo Git)
├── node_modules/         # Dependências (ignoradas pelo Git)
├── package/              # Área de preparação do npm pack (artefacto de compilação)
├── .next/                # Resultados da compilação do Next.js (ignorados pelo Git)
└── (ficheiros raiz — ver abaixo)
```

---

## Ficheiros raiz

| Ficheiro                                    | Finalidade                                                                                                       |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Página inicial de marketing + início rápido + matriz de funcionalidades (consulte também `llm.txt`)              |
| **CHANGELOG.md**                            | Registo de alterações por versão (gerado automaticamente pela competência `/version-bump-cc`)                    |
| **LICENSE**                                 | Texto da licença MIT                                                                                             |
| **CLAUDE.md**                               | Regras do projeto para agentes Claude Code (regras obrigatórias, convenções, cenários)                           |
| **AGENTS.md**                               | Igual ao CLAUDE.md, mas para agentes de IA que não o Claude (Codex, Cursor, etc.)                                |
| **GEMINI.md**                               | Regras concisas para agentes baseados no Gemini (subconjunto do CLAUDE.md)                                       |
| **CONTRIBUTING.md**                         | Guia para contribuidores: configuração, commits convencionais, testes, fluxo de PR                               |
| **SECURITY.md**                             | Política de comunicação de vulnerabilidades, versões suportadas, modelo de ameaças                               |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — expectativas de comportamento da comunidade                                               |
| **llm.txt**                                 | Página inicial em texto simples otimizada para rastreadores de LLM (SEO para assistentes de IA)                  |
| **package.json**                            | Manifesto npm, scripts, dependências, motores, limiar de cobertura c8                                            |
| **package-lock.json**                       | Árvore de dependências bloqueada                                                                                 |
| **tsconfig.json**                           | Configuração TypeScript de raiz                                                                                  |
| **tsconfig.typecheck-core.json**            | Configuração de verificação de tipos para o núcleo em `src/`                                                     |
| **tsconfig.typecheck-noimplicit-core.json** | Verificação de tipos estrita (`noImplicitAny`)                                                                   |
| **tsconfig.tsbuildinfo**                    | Cache de compilação incremental do TS (ignorada pelo Git)                                                        |
| **next.config.mjs**                         | Configuração de compilação do Next.js 16 (saída autónoma)                                                        |
| **next-env.d.ts**                           | Tipos de ambiente gerados automaticamente pelo Next.js                                                           |
| **eslint.config.mjs**                       | Configuração plana do ESLint (regras por área do projeto)                                                        |
| **prettier.config.mjs**                     | Regras de formatação do Prettier                                                                                 |
| **postcss.config.mjs**                      | Configuração do PostCSS para o pipeline Tailwind/CSS                                                             |
| **playwright.config.ts**                    | Configuração de testes E2E do Playwright                                                                         |
| **vitest.config.ts**                        | Configuração do Vitest (conjunto predefinido)                                                                    |
| **vitest.mcp.config.ts**                    | Configuração do Vitest para os conjuntos do servidor MCP / autoCombo / cache                                     |
| **sonar-project.properties**                | Configuração do SonarQube/SonarCloud (qualidade do código)                                                       |
| **Dockerfile**                              | Compilação Docker em várias fases (builder → runner-base → runner-cli)                                           |
| **docker-compose.yml**                      | Compose de desenvolvimento com 4 perfis (base, cli, host, cliproxyapi) + serviço auxiliar redis                  |
| **docker-compose.prod.yml**                 | Compose de produção (porta 20130, redis, volumes nomeados)                                                       |
| **.dockerignore**                           | Ficheiros excluídos do contexto Docker                                                                           |
| **fly.toml**                                | Configuração de implementação no Fly.io (região `sin`, porta 20128, volume /data)                                |
| **.env.example**                            | Ficheiro de ambiente modelo (copiado automaticamente para `.env` na primeira instalação)                         |
| **.gitignore**                              | Padrões ignorados pelo Git                                                                                       |
| **.npmignore**                              | Lista de exclusões da publicação npm                                                                             |
| **.npmrc**                                  | Configuração npm (registo, política do ficheiro de bloqueio)                                                     |
| **.node-version**                           | Versão fixa do Node (utilizada por ferramentas compatíveis com o nvm)                                            |
| **.nvmrc**                                  | Versão fixa do Node para o nvm                                                                                   |
| **eslint.complexity.config.mjs**            | Configuração do ESLint para o limiar progressivo de complexidade (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Configuração do ESLint para regras SonarJS (complexidade cognitiva / duplicação)                                 |
| **source.config.ts**                        | Configuração de origem `defineDocs` do Fumadocs (alimenta `.source/`)                                            |
| **knip.json**                               | Configuração do Knip — ficheiros/exportações/dependências não utilizados (alimenta o controlo de código morto)   |
| **stryker.conf.json**                       | Configuração de testes de mutação do Stryker                                                                     |
| **.size-limit.json**                        | configuração do orçamento do bundle do size-limit                                                                |
| **promptfooconfig.yaml**                    | configuração de avaliações do promptfoo                                                                          |
| **.gitleaks.toml**                          | conjunto de regras de análise de segredos do gitleaks                                                            |
| **.zizmor.yml**                             | configuração de análise de segurança de GitHub Actions do zizmor                                                 |
| **socket.yml**                              | configuração de segurança da cadeia de fornecimento do Socket.dev                                                |
| **news.json**                               | Feed localizado de anúncios da v2; o item de lançamento do Radar é fornecido inativo                             |
| **flake.nix** / **flake.lock**              | definição da shell de desenvolvimento do Nix + ficheiro de bloqueio                                              |
| **.env**                                    | Segredos locais (ignorados pelo Git — gerados a partir de `.env.example`)                                        |

> **Movido para fora da raiz na v3.8.26 (organização):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` e o ficheiro `quality-metrics.json` gerado (ignorado pelo Git). Consulte [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — aplicação Next.js

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

### `src/app/` — Router de aplicações (Next.js 16)

| Percurso                                                                     | Finalidade                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                                | API público compatível com OpenAI (~ 25 sub-rotas: chat, conclusões, incorporações, ficheiros, lotes, áudio, imagens, vídeos, música, reclassificação, moderações, pesquisa, ws, agentes, contas, fornecedores, etc.)                                                                                                          |
| `app/api/v1beta/`                                                            | Terminais API estilo Gemini                                                                                                                                                                                                                                                                                                    |
| `app/api/playground/`                                                        | Rotas do Playground Studio: `improve-prompt/` (POST — LLM prompt rewriter), `presets/` (GET list / POST create), `presets/[id]/` (GET / PUT / DELETE) — ver `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                             |
| `app/api/` (não-v1)                                                          | Management/admin rotas (diretórios ~ 60: fornecedores, combos, configurações, mcp, a2a, avaliações, memória, competências, webhooks, conformidade, resiliência, monitorização, túneis, ferramentas cli, etc.)                                                                                                                  |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 rotas (controlo de servidor, agente state/DNS/mappings, bypass, certificado, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Ver `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                      |
| `app/api/tools/traffic-inspector/`                                           | Inspetor de tráfego REST + WS API — 16 rotas + (pedidos, sessões, hosts, modos de captura, exportação, ws). LOCAL_ONLY + SPAWN_CAPABLE. Veja `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                        |
| `app/a2a/`                                                                   | Ponto de entrada A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                                |
| `app/.well-known/agent.json/`                                                | Cartão de agente A2A (descoberta)                                                                                                                                                                                                                                                                                              |
| `app/(dashboard)/dashboard/`                                                 | Páginas UI do painel (50 secções +, ficheiros ~ 118 page.tsx : fornecedores, combos, configurações, memória, competências, webhooks, avaliações, auditoria, batch, cache, custos, integridade, sistema, actividade, etc.)                                                                                                      |
| `app/(dashboard)/dashboard/search-tools/`                                    | Ferramentas de pesquisa Studio UI (3 separadores: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) - ver `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                  |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plano 21): `page.tsx` (shell de 3 separadores), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | página do painel AgentBridge - placa de servidor, 9 placas de agente, assistente de configuração, mapeamento de modelos, lista de bypass. i18n PT-BR + EN. Veja `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                              |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Página do painel do Traffic Inspector - divisão DevTools, 7 separadores de detalhes, 4 alternadores de modo de captura, gravador de sessão, colorização de contexto. i18n PT-BR + EN. Veja `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                             |
| `app/(dashboard)/dashboard/activity/`                                        | Página de alimentação de atividades (Grupo B): `page.tsx` (servidor) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — ver `docs/architecture/MONITORING_SECTIONS.md`                                                                                                      |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Página de partilha de quotas (Grupo B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                            |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Página de configuração do plano do fornecedor (Grupo B): `page.tsx` + `ProviderPlanConfigClient.tsx` — dimensões da quota por substituição de ligação                                                                                                                                                                          |
| `app/docs/`                                                                  | Visualizador de documentação incorporado (renderiza `docs/*.md`)                                                                                                                                                                                                                                                               |
| `app/landing/`                                                               | Página de destino de marketing                                                                                                                                                                                                                                                                                                 |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Páginas relacionadas com autenticação                                                                                                                                                                                                                                                                                          |
| `app/{400,401,403,408,429,500,502,503}/`                                     | páginas de erro HTTP                                                                                                                                                                                                                                                                                                           |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | páginas Static/status                                                                                                                                                                                                                                                                                                          |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Layout raiz, home, manifesto PWA, CSS global                                                                                                                                                                                                                                                                                   |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Limites de erro                                                                                                                                                                                                                                                                                                                |

### `src/lib/` — Bibliotecas principais (módulos ~ 50)

| Módulo                                   | Finalidade                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `a2a/`                                   | gestor de tarefas do protocolo A2A, skills (5), streaming                                                                                                                                                                                                                                                                            |
| `acp/`                                   | Registo do agente CLI (descoberta CLI local — ver `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                        |
| `api/`                                   | Ajudantes API partilhados (`requireManagementAuth`, validação)                                                                                                                                                                                                                                                                       |
| `auth/`                                  | Sessão, hash de palavra-passe, validação de token                                                                                                                                                                                                                                                                                    |
| `batches/`                               | OpenAI Lotes manipuladores API                                                                                                                                                                                                                                                                                                       |
| `catalog/`                               | Resolução do recurso + de validação do catálogo do fornecedor Zod                                                                                                                                                                                                                                                                    |
| `cloudAgent/`                            | Agentes de cloud (Codex Cloud, Devin, Jules) — ver `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                  |
| `combos/`                                | Ajudantes de reordenação + de resolução combinada                                                                                                                                                                                                                                                                                    |
| `audit/`                                 | Auxiliares de alimentação de atividades: `highLevelActions.ts` (lista de permissões + `isHighLevelAction()`), `activityIcons.ts` (mapa de ação → icon/verb ), `timeline.ts` (groupByDay/relativeTime) — ver `docs/architecture/MONITORING_SECTIONS.md`                                                                               |
| `compliance/`                            | Registo de auditoria auditoria do fornecedor + — consulte `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                              |
| `compression/`                           | Cola para motor de compressão (os motores vivem em `open-sse/services/compression/`)                                                                                                                                                                                                                                                 |
| `config/`                                | Auxiliares de configuração de tempo de execução                                                                                                                                                                                                                                                                                      |
| `db/`                                    | 120 módulos + de domínio DB + 168 migrações (passar sempre aqui para SQLite)                                                                                                                                                                                                                                                         |
| `quota/`                                 | Mecanismo de partilha de quotas: `dimensions.ts` (types/Zod), `types.ts` ( interface QuotaStore ), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — ver `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Cliente de catálogo de modelo livre de radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — ver `docs/frameworks/RADAR.md`                                                                                                                                            |
| `display/`                               | Auxiliares de formatação UI (custo, latência, etc.)                                                                                                                                                                                                                                                                                  |
| `embeddings/`                            | Ajudantes de serviço de incorporações                                                                                                                                                                                                                                                                                                |
| `env/`                                   | Variável Env analisando a validação +                                                                                                                                                                                                                                                                                                |
| `evals/`                                 | Estrutura de avaliação (suites, runner, runtime) — ver `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                                    |
| `guardrails/`                            | mascarador PII, injeção imediata, ponte de visão — ver `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                                 |
| `jobs/`                                  | Trabalhos em segundo plano (semelhantes ao cron)                                                                                                                                                                                                                                                                                     |
| `memory/`                                | Memória de conversação (SQLite FTS5 + sqlite-vec hybrid RRF + Qdrant level 2) - ver `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                      |
| `memory/embedding/`                      | Camada de incorporação de múltiplas fontes: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plano 21)                                                                                                                                                                         |
| `memory/vectorStore.ts`                  | wrapper sqlite-vec v0.1.9 - KNN força bruta + híbrido RRF (vetor FTS5 +, k = 60). Lazy-init, degrada-se normalmente quando o sqlite-vec não está disponível. (plano 21)                                                                                                                                                              |
| `memory/reindex.ts`                      | `runReindexBatch()` — processa memórias com `needs_reindex=1` em segundo plano; chamado por `POST /api/memory/reindex` e caminho de preenchimento lento. (plano 21)                                                                                                                                                                  |
| `monitoring/`                            | Verificações de integridade, emissão de métricas                                                                                                                                                                                                                                                                                     |
| `oauth/`                                 | OAuth/import streams para 22 módulos fornecedores (agy, anti-gravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                       |
| `plugins/`                               | Registo de plug-in                                                                                                                                                                                                                                                                                                                   |
| `promptCache/`                           | Pontos de interrupção da cache de prompt de estilo antrópico                                                                                                                                                                                                                                                                         |
| `skills/`                                | Estrutura de competências (mercado + integrado + SkillsSH) — ver `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                         |
| `playground/`                            | Ajudantes partilhados do Playground Studio: `codeExport.ts` (gerador curl/Python/TS ), `promptImprover.ts` (construtor de meta-prompt), `streamMetrics.ts` ( TTFT/TPS puro), `types.ts` (tabela de preços) - ver `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                              |
| `webhookDispatcher.ts`                   | entrega de webhook HMAC - ver `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                          |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Gestores de túneis - ver `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                                 |
| `cloudSync.ts`, `initCloudSync.ts`       | Sincronização opcional do estado na nuvem                                                                                                                                                                                                                                                                                            |
| `localDb.ts`                             | Barril de reexportação para módulos db (sem lógica - apenas reexportações)                                                                                                                                                                                                                                                           |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Solicitar cache de idempotência +                                                                                                                                                                                                                                                                                                    |
| (~ mais 30 ficheiros de nível superior)  | Ajudantes especializados (logEnv, modelsDevSync, piiSanitizer, etc.)                                                                                                                                                                                                                                                                 |

### `src/lib/db/` — Base de dados (147 módulos + 208 migrações)

| Subdiretório              | Finalidade                                                                                                                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | singleton `getDbInstance()` com registo no diário WAL                                                                                                                                           |
| `db/migrations/`          | Ficheiros SQL versionados (idempotentes, transacionais). `073_memory_vec.sql` adiciona coluna `memory_vec_meta` + `needs_reindex` (plano 21).                                                   |
| `db/playgroundPresets.ts` | Módulo CRUD para as predefinições do Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)           |
| `db/memoryVec.ts`         | CRUD para `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue`, etc. (plano 21)                                   |
| `db/<domain>.ts`          | Um módulo por domínio: providers, combos, apiKeys, utilizadores, sessões, utilização, log de auditoria, webhooks, skills, memory_entries, cloud_agent_tasks, evals* \* , raciocínio_cache, etc. |

### `src/domain/`

| Módulo                 | Finalidade                                                       |
| ---------------------- | ---------------------------------------------------------------- |
| `policy.ts`            | Mecanismo de política                                            |
| `fallbackPolicy.ts`    | Árvore de decisão substituta                                     |
| `costRules.ts`         | Regras de cálculo de custos                                      |
| `lockoutPolicy.ts`     | política de bloqueio Model/connection                            |
| `tagRouter.ts`         | Encaminhamento baseado em tags                                   |
| `comboResolver.ts`     | Resolução de combinação (utilizada pelo mecanismo de combinação) |
| `modelAvailability.ts` | Verificação da disponibilidade por modelo                        |
| `assessment/`          | Avaliação do modelo (Fase 1 da RFC-AUTO-ASSESSMENT)              |

### `src/server/`

| Módulo   | Finalidade                                                                                            |
| -------- | ----------------------------------------------------------------------------------------------------- |
| `authz/` | Pipeline de autorização: `classify` → `policies` → `enforce` — ver `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | configuração CORS                                                                                     |
| `auth/`  | Middleware de sessão                                                                                  |

### `src/shared/`

| Módulo                           | Finalidade                                                                                               |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `components/`                    | Componente do painel API: adaptadores sobre `packages/ui-kit` - ver `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: nomes de ícones utilizados pelos ecrãs → componentes Lucide (`<Icon>`)                       |
| `constants/providers.ts`         | **377 fornecedores** com validação Zod (fonte da verdade)                                                |
| `constants/cliTools.ts`          | Registo externo da ferramenta CLI                                                                        |
| `constants/routingStrategies.ts` | **20 estratégias de encaminhamento** com prioridades                                                     |
| `constants/publicApiRoutes.ts`   | Rotas que requerem autenticação do portador (vs gestão)                                                  |
| `constants/upstreamHeaders.ts`   | Lista de bloqueio de cabeçalho para pedidos upstream                                                     |
| `validation/schemas.ts`          | Esquemas ~ 80 Zod (fonte única de verdade para contratos API )                                           |
| `validation/helpers.ts`          | Ajudantes de validação Zod (`validateBody`, etc.)                                                        |
| `types/`                         | Tipos TS partilhados                                                                                     |
| `contracts/`                     | Contratos públicos API (consumidos por `files:` em `package.json`)                                       |
| `utils/circuitBreaker.ts`        | Disjuntor do fornecedor (ver `docs/architecture/RESILIENCE_GUIDE.md`)                                    |
| `utils/apiAuth.ts`               | validação de chaves API, verificação de âmbito                                                           |
| `utils/fetchTimeout.ts`          | Wrappers Timeout/abort para pesquisa upstream                                                            |
| `utils/releaseNotes.ts`          | Analisador de anúncios v2/legacy fechado, localização e dispensa ID                                      |

---

## `open-sse/` — Área de Trabalho do Motor de Streaming

Área de trabalho npm separada (`@omniroute/open-sse`). Processa pedidos e executa fornecedores.

```
open-sse/
├── handlers/            # 16 ficheiros (12 processadores + 4 auxiliares): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search, etc.
├── executors/           # 150 módulos executores (classes que estendem BaseExecutor + auxiliares por fornecedor)
├── translator/          # Conversores de formatos (9 de pedidos, 9 de respostas, 9 auxiliares)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ módulos de serviço (combo, accountFallback, autoCombo, reasoningCache, modo furtivo de claude code/chatgpt, modelDeprecation, taskAwareRouter, workflowFSM, etc.)
├── mcp-server/          # Servidor MCP (110 ferramentas, 3 transportes, 33 âmbitos)
├── config/              # Registos de fornecedores/modelos, configuração de cabeçalhos, aliases de modelos
├── utils/               # Cliente TLS, obtenção/dispatcher de proxy, auxiliares de rede
├── index.ts             # Ponto de entrada da área de trabalho
├── package.json         # Manifesto da área de trabalho
├── tsconfig.json        # Configuração TS da área de trabalho
└── types.d.ts           # Declarações de tipos da área de trabalho
```

### `open-sse/mcp-server/`

| Caminho                     | Finalidade                                                                                |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| `server.ts`                 | Ciclo de vida do servidor MCP (transportes stdio + HTTP)                                  |
| `httpTransport.ts`          | Transportes HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                     |
| `audit.ts`                  | Registo de auditoria na tabela `mcp_tool_audit`                                           |
| `scopeEnforcement.ts`       | Validação do âmbito por ferramenta                                                        |
| `runtimeHeartbeat.ts`       | Sinal de estado em `DATA_DIR/runtime/mcp-heartbeat.json`                                  |
| `descriptionCompressor.ts`  | Comprime os metadados das descrições das ferramentas para poupar contexto                 |
| `schemas/tools.ts`          | 36 definições de ferramentas base + âmbitos                                               |
| `tools/advancedTools.ts`    | Implementações de ferramentas avançadas                                                   |
| `tools/memoryTools.ts`      | 3 ferramentas de memória (pesquisar/adicionar/limpar)                                     |
| `tools/skillTools.ts`       | 4 ferramentas de competências (listar/ativar/executar/execuções)                          |
| `tools/compressionTools.ts` | 5 ferramentas de compressão                                                               |
| `README.md`                 | README interno do servidor MCP (com referência cruzada a `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — Áreas de Trabalho

| Caminho                  | Finalidade                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — cópia integrada do Keak CI UI Kit (`private`, `UNLICENSED`), consumida como código-fonte (sem compilação). `UPSTREAM.md` fixa o commit a montante e regista a autorização da licença; `PATCHES.md` lista as correções locais (nenhuma); `src/` é sincronizado apenas por `scripts/dev/sync-ui-kit.sh` e protegido por `npm run check:ui-kit-snapshot`. Consulte `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — serviço opcional de conjunto de browsers (conversação suportada por CloakBrowser e Playwright)                                                                                                                                                                                                                                                                                                 |

---

## `electron/` — Wrapper para desktop

| Ficheiro         | Finalidade                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `main.js`        | Processo principal do Electron (BrowserWindow, servidor Next.js incorporado, área de notificação, atualização automática) |
| `preload.js`     | Ponte IPC (contextBridge → `window.omniroute`)                                                                            |
| `package.json`   | Configuração do electron-builder + dependências Electron 41 + electron-builder 26.10                                      |
| `assets/`        | Ícones da aplicação (Windows .ico, macOS .icns, Linux .png)                                                               |
| `dist-electron/` | Saída da compilação (ignorada pelo git)                                                                                   |
| `types.d.ts`     | Declarações de tipos para a ponte do processo de renderização                                                             |
| `README.md`      | README interno do Electron (ver também `docs/guides/ELECTRON_GUIDE.md`)                                                   |

---

## `bin/` — CLI

| Ficheiro                                                                                                    | Finalidade                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Ponto de entrada principal da CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos`, etc. |
| `reset-password.mjs`                                                                                        | CLI autónoma para reposição da palavra-passe                                                                                                  |
| `cli/commands/setup.mjs`                                                                                    | Assistente de configuração interativo + não interativo                                                                                        |
| `cli/commands/doctor.mjs`                                                                                   | Diagnóstico do estado do sistema (mais de 8 verificações)                                                                                     |
| `cli/commands/providers.mjs`                                                                                | Listagem/teste/validação de fornecedores                                                                                                      |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Módulos auxiliares da CLI                                                                                                                     |
| `cli/tray/tray.ts`                                                                                          | Integração com a área de notificação do sistema (multiplataforma: NotifyIcon no Windows, systray2 no macOS/Linux)                             |
| `cli/tray/tray.ps1`                                                                                         | Backend PowerShell NotifyIcon (Windows, sem novos binários)                                                                                   |
| `cli/tray/autostart.ts`                                                                                     | Arranque automático multiplataforma (LaunchAgent / .desktop / registo)                                                                        |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Cadeia de resolução do controlador SQLite em 5 passos (incluído → ambiente de execução → instalação diferida → node:sqlite → sql.js)          |
| `cli/runtime/magicBytes.mjs`                                                                                | Validação dos bytes mágicos de binários (ELF / Mach-O / Mach-O fat / PE)                                                                      |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — pré-resolve os controladores durante o postinstall / primeiro arranque                                                   |
| `nodeRuntimeSupport.mjs`                                                                                    | Valida a versão suportada do Node.js durante a instalação                                                                                     |

---

## `skills/` — Competências Públicas dos Agentes

| Ficheiro                     | Finalidade                                                                                         |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifestos de competências para agentes de IA externos (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Scripts de Compilação e Verificação

| Script                              | Finalidade                                                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `run-next.mjs`                      | Executor de desenvolvimento/início com carregamento de variáveis de ambiente                                       |
| `build-next-isolated.mjs`           | Compilação autónoma (modo standalone do Next.js 16)                                                                |
| `prepublish.ts`                     | Preparação do pacote antes de `npm pack`                                                                           |
| `postinstall.mjs`                   | Criação automática de `.env` a partir de `.env.example` na primeira instalação                                     |
| `sync-env.mjs`                      | Ressincronização das chaves de `.env` com `.env.example`                                                           |
| `check-cycles.mjs`                  | Deteção de dependências circulares                                                                                 |
| `check-route-validation.mjs`        | Validação de que todas as rotas da API têm validação Zod                                                           |
| `check-t11-any-budget.mjs`          | Aplicação de um limite explícito de `any` por ficheiro                                                             |
| `check-docs-sync.mjs`               | Validação da sincronização de versões da documentação (pre-commit existente)                                       |
| **`check-env-doc-sync.mjs`**        | NOVO: verificação cruzada das variáveis de ambiente no código, em `.env.example` e em `ENVIRONMENT.md`             |
| **`check-docs-counts-sync.mjs`**    | NOVO: validação de que as contagens (executores, estratégias, OAuth, competências A2A) correspondem à documentação |
| **`check-deprecated-versions.mjs`** | NOVO: sinalização de versões/datas desatualizadas na documentação                                                  |
| `check-supported-node-runtime.ts`   | Validação de que a versão atual do Node é suportada                                                                |
| `check-pr-test-policy.mjs`          | Aplicação da regra «testes obrigatórios» a alterações no código de produção                                        |
| **`gen-provider-reference.ts`**     | NOVO: geração automática de `docs/reference/PROVIDER_REFERENCE.md` a partir do catálogo                            |
| `i18n/generate-multilang.mjs`       | Tradução de cadeias da IU e documentação através do Google Translate                                               |
| `i18n_autotranslate.py`             | Pipeline de tradução de documentação baseado em LLM                                                                |
| `validate_translation.py`           | Validação da tradução por região                                                                                   |
| `check_translations.py`             | Verificação das chaves i18n no código                                                                              |
| `run-playwright-tests.mjs`          | Executor de testes E2E do Playwright                                                                               |
| `run-protocol-clients-tests.mjs`    | Executor E2E de MCP/A2A                                                                                            |
| `run-ecosystem-tests.mjs`           | Testes do ecossistema (integração de fornecedores)                                                                 |
| `test-report-summary.mjs`           | Geração do resumo de cobertura em markdown                                                                         |
| `smoke-electron-packaged.mjs`       | Teste rápido da compilação empacotada do Electron                                                                  |
| `native-binary-compat.mjs`          | Validação de que as dependências nativas (`better-sqlite3`) correspondem ao Node do Electron                       |
| `validate-pack-artifact.ts`         | Validação do resultado do pacote npm                                                                               |
| `responses-ws-proxy.mjs`            | Ponte WebSocket para a API Responses do Codex                                                                      |
| `v1-ws-bridge.mjs`                  | Ponte WebSocket para o endpoint `/api/v1/ws`                                                                       |
| `standalone-server-ws.mjs`          | Executor autónomo do servidor WS                                                                                   |
| `system-info.mjs`                   | Apresentação de informações do sistema/ambiente de execução para suporte                                           |
| `healthcheck.mjs`                   | Verificação de estado pontual (utilizada pelo Docker HEALTHCHECK)                                                  |
| `uninstall.mjs`                     | Script de desinstalação completa                                                                                   |
| `dev/sync-ui-kit.sh`                | Cópia de `src/` do Kit de IU de CI num commit fixado para `packages/ui-kit/src`                                    |
| `check/check-ui-kit-snapshot.mjs`   | Verificação pre-commit: `packages/ui-kit/src` corresponde ao commit fixado a montante                              |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — nomes de ícones em utilização que `ICON_MAP` não mapeia                                   |
| `dev/codemod-material-icons.mjs`    | Reescrita de elementos span literais do Material Symbols para `<Icon>` (ferramentas de migração)                   |

---

## `docs/` — Documentação pública (7 ficheiros raiz + 17 subdiretórios)

### Guias de nível superior

| Doutor                      | Finalidade                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Arquitetura de alto nível, mapa de subsistemas, superfície do painel                              |
| `CODEBASE_DOCUMENTATION.md` | Referência de engenharia: diretórios, módulos, convenções                                         |
| `FEATURES.md`               | Matriz de características com destaques da v3.8                                                   |
| `USER_GUIDE.md`             | Manual do utilizador final (configuração, modelos, combos, CLIs, áudio, etc.)                     |
| `API_REFERENCE.md`          | referência de endpoint API com modelo de autenticação                                             |
| `openapi.yaml`              | Especificação OpenAPI 3.0 (121 caminhos)                                                          |
| `SETUP_GUIDE.md`            | Métodos de instalação (npm, npx, Docker, Electron, Termux, fonte)                                 |
| `ENVIRONMENT.md`            | Todos os env vars (~ 800 documentados, ~ 3.050 linhas `.env.example`)                             |
| `TROUBLESHOOTING.md`        | Erros comuns, problemas conhecidos + v3.8.0                                                       |
| `RELEASE_CHECKLIST.md`      | Fluxo de libertação completo (habilidades, husky, commits convencionais, implantação)             |
| `COVERAGE_PLAN.md`          | Metas de cobertura e estado atual                                                                 |
| `FREE_TIERS.md`             | Fornecedores de nível gratuito seleccionados (48 + free + 11 OAuth)                               |
| `CLI-TOOLS.md`              | Integrações CLI externas + OmniRoute interno CLI                                                  |
| `I18N.md`                   | Arquitetura i18n, adicionar um idioma, 67 localizações                                            |
| `UNINSTALL.md`              | Limpe os passos de desinstalação                                                                  |
| `PROVIDER_REFERENCE.md`     | **Gerado automaticamente** catálogo de 377 fornecedores (regen: `npm run gen:provider-reference`) |

### Aprofundamentos do subsistema

| Doutor                                        | Finalidade                                                                                  |
| --------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                               | Servidor MCP : 110 ferramentas, 3 transportes, 33 escopos, endpoints REST                   |
| `A2A-SERVER.md`                               | A2A v0.3: JSON-RPC, 6 habilidades, ajudantes REST, cartão de agente                         |
| `AGENT_PROTOCOLS_GUIDE.md`                    | Guia unificado: A2A vs ACP vs Cloud Agents                                                  |
| `CLOUD_AGENT.md`                              | Orquestração Codex Nuvem / Devin / Jules                                                    |
| `SKILLS.md`                                   | Estrutura de competências ( + marketplace integrado + SkillsSH + sandbox)                   |
| `RADAR.md`                                    | Sobreposição de catálogo de modelo livre de radar (`RADAR_ENABLED`, desativado por defeito) |
| `MEMORY.md`                                   | Sistema de memória (SQLite FTS5 + Qdrant)                                                   |
| `EVALS.md`                                    | Estrutura de avaliação (suites, corridas, rubricas)                                         |
| `GUARDRAILS.md`                               | máscara PII, injeção imediata, ponte de visão                                               |
| `COMPLIANCE.md`                               | Registo de auditoria, retenção, cancelamento de noLog                                       |
| `WEBHOOKS.md`                                 | Entrega de webhook assinado por HMAC                                                        |
| `REASONING_REPLAY.md`                         | Cache memory/SQLite híbrido para `reasoning_content`                                        |
| `AUTHZ_GUIDE.md`                              | Pipeline de autorização (`classify` → `policies` → `enforce`)                               |
| `RESILIENCE_GUIDE.md`                         | Disjuntor + cooldown bloqueio do modelo +                                                   |
| `docs/security/STEALTH_GUIDE.md` (apenas git) | impressão digital TLS (JA3/JA4), código CCHClaude, certificado MITM                         |
| `AUTO-COMBO.md`                               | Mecanismo Auto Combo (pontuação de 16 fatores, pacotes de 6 modos, fábrica virtual)         |

### Compressão

| Doutor                          | Finalidade                                             |
| ------------------------------- | ------------------------------------------------------ |
| `COMPRESSION_GUIDE.md`          | Visão geral dos modos de compressão + roadmap          |
| `COMPRESSION_ENGINES.md`        | Motores Caveman + RTK, contrato de registo             |
| `COMPRESSION_RULES_FORMAT.md`   | Esquema JSON do pacote de regras do homem das cavernas |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventário de pacotes de regras por idioma             |
| `RTK_COMPRESSION.md`            | Pipeline declarativo RTK (56 filtros)                  |

### Implantação

| Doutor                       | Finalidade                                                                       |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | compilação Docker, perfis (base/cli/host/cliproxyapi), ficheiro secundário Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Implantação genérica VM/VPS (Ubuntu/Debian + nginx + systemd)                    |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Implantação Fly.io (atualmente apenas em chinês)                                 |
| `TERMUX_GUIDE.md`            | Android sem cabeça via Termux                                                    |
| `PWA_GUIDE.md`               | Progressive Web App instala o + service worker                                   |
| `ELECTRON_GUIDE.md`          | Construção de aplicação de desktop + sign + distribuir                           |
| `TUNNELS_GUIDE.md`           | + ngrok + Tailscale Nublado                                                      |
| `PROXY_GUIDE.md`             | Proxy de saída de 4 níveis + 1proxy marketplace                                  |

### Subdiretórios

| Subdiretório          | Finalidade                                                                                                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docs/i18n/`          | Traduções de documentos localizados (41 localidades)                                                                                                                                                                     |
| `docs/screenshots/`   | Recursos de imagem para separadores                                                                                                                                                                                      |
| `_tasks/superpowers/` | Plans/specs de superpoderes (`writing-plans`/`brainstorming`) + research — repositório isolado, com versão separada, gitignorado pela árvore principal. Consulte CLAUDE.md → "Artefactos de planeamento e investigação". |

---

## `tests/` — Conjuntos de testes

| Subdiretório                         | Tipo                                                 | Executor                                           |
| ------------------------------------ | ---------------------------------------------------- | -------------------------------------------------- |
| `tests/unit/`                        | Testes unitários (~4 800 ficheiros, os mais rápidos) | Executor de testes nativo do Node                  |
| `tests/integration/`                 | Testes de integração de vários módulos + BD          | Executor de testes nativo do Node (concorrência 1) |
| `tests/e2e/`                         | E2E da IU + fluxos de trabalho                       | Playwright                                         |
| `tests/e2e/protocol-clients.test.ts` | E2E com clientes reais MCP + A2A                     | Clientes de protocolo personalizados               |
| `tests/e2e/ecosystem.test.ts`        | Integração de fornecedores (com acesso à rede)       | Executor de testes nativo do Node                  |

---

## `public/` — Recursos estáticos

| Caminho             | Finalidade                                                            |
| ------------------- | --------------------------------------------------------------------- |
| `public/` (raiz)    | Favicons, robots.txt, manifesto, service worker, imagens de marketing |
| `public/providers/` | Logótipos PNG/SVG dos fornecedores (utilizados no painel de controlo) |

---

## `config/` — Configurações estáticas + estado dos controlos de qualidade

Modelos de configuração distribuídos, juntamente com as linhas de base dos controlos de qualidade incluídas no repositório
(movidos da raiz do repositório na v3.8.26 para manter a raiz simples).

| Caminho                                       | Finalidade                                                                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `config/i18n.json`                            | Lista de idiomas + metadados (fonte canónica para a contagem de 42 idiomas)                |
| `config/i18n-schema.json`                     | Esquema JSON que valida `i18n.json`                                                        |
| `config/payloadRules.json`                    | Regras de sanitização de payloads a montante                                               |
| `config/quality/quality-baseline.json`        | Linha de base progressiva de várias métricas (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Linha de base congelada da complexidade do ESLint (`check-complexity.mjs`)                 |
| `config/quality/duplication-baseline.json`    | Linha de base congelada da duplicação do jscpd (`check-duplication.mjs`)                   |
| `config/quality/file-size-baseline.json`      | Linha de base congelada do tamanho por ficheiro (`check-file-size.mjs`)                    |
| `config/quality/test-discovery-baseline.json` | Linha de base congelada de testes órfãos (`check-test-discovery.mjs`)                      |
| `config/quality/dependency-allowlist.json`    | Lista de dependências aprovadas (`check-deps.mjs`)                                         |
| `config/quality/.license-allowlist.json`      | Lista de licenças SPDX permitidas (`check-licenses.mjs`)                                   |
| `config/quality/quality-metrics.json`         | Métricas efémeras recolhidas (geradas por `collect-metrics.mjs`; **ignoradas pelo git**)   |

---

## `.github/` — Integração com o GitHub

| Caminho                            | Finalidade                                                                          |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| `.github/workflows/`               | Fluxos de trabalho de CI/CD do GitHub Actions (lint, testes, cobertura, lançamento) |
| `.github/ISSUE_TEMPLATE/`          | Modelos de issues para erros/funcionalidades                                        |
| `.github/pull_request_template.md` | Modelo de PR                                                                        |
| `.github/dependabot.yml`           | Configuração de atualização de dependências                                         |

---

## `.husky/` — Hooks do Git

| Ficheiro     | Finalidade                                                                  |
| ------------ | --------------------------------------------------------------------------- |
| `pre-commit` | Executa `lint-staged + check-docs-sync + check:any-budget:t11`              |
| `pre-push`   | Atualmente desativado (comentado). Execute `npm run test:unit` manualmente. |
| `_/`         | Componentes internos do Husky                                               |

---

## `.claude/` — Comandos Slash do Claude Code

| Ficheiro                                            | Finalidade                                                        |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — incrementar a versão + changelog automático  |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — fluxo de trabalho completo de lançamento |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Implementar em VPS                                                |
| `commands/capture-release-evidences-cc.md`          | Gravar no browser as novas funcionalidades em WebP                |
| `commands/review-{prs,discussions}-cc.md`           | Fazer a triagem de PRs/discussões do GitHub                       |
| `commands/{review-issues,implement-features}-cc.md` | Fluxos de trabalho de issues                                      |
| `settings.local.json`                               | Definições do Claude Code específicas do projeto                  |

---

## `.agents/` — Fluxos de Trabalho Genéricos de Agentes (Codex / Cursor / etc.)

| Caminho                  | Finalidade                                                           |
| ------------------------ | -------------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definições de fluxos de trabalho (réplica de `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definições de competências com notas de execução do Codex          |

> **Nota:** Atualmente, os fluxos de trabalho e os comandos são idênticos byte a byte. Se `.agents/` se destinar a um ambiente de execução de agentes diferente (Codex), as variantes têm de divergir de forma significativa.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Fora da Árvore

Estes diretórios com nomes prefixados por um caráter de sublinhado contêm elementos que não são distribuídos:

- **`_ideia/`** — notas de design (categorias defer / notfit / viable)
- **`_mono_repo/`** — subprojetos históricos (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — clones só de leitura de projetos OSS relacionados (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api, etc.) para referência cruzada durante o desenvolvimento
- **`_tasks/`** — ficheiros de acompanhamento de tarefas por lançamento (informais)

Não estão incluídos no resultado de `npm pack`. Consulte `.npmignore`.

---

## Gerado / Ignorado pelo Git

| Caminho                | Finalidade                            |
| ---------------------- | ------------------------------------- |
| `node_modules/`        | Dependências npm                      |
| `.next/`               | Resultado da compilação do Next.js    |
| `coverage/`            | Relatórios de cobertura do c8         |
| `logs/`                | Registos de execução                  |
| `package/`             | Área de preparação do pacote npm      |
| `.playwright-mcp/`     | Artefactos de teste do Playwright MCP |
| `.issues/`             | Cache local de problemas              |
| `tsconfig.tsbuildinfo` | Cache incremental do TS               |

---

## Sugestões de navegação

- **É um novo colaborador?** Leia `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Vai adicionar um fornecedor?** Siga `docs/architecture/ARCHITECTURE.md § Adding a New Provider` e confirme com `docs/reference/PROVIDER_REFERENCE.md`.
- **Vai adicionar uma rota?** Consulte `docs/architecture/ARCHITECTURE.md § Adding a New API Route` e `src/shared/validation/schemas.ts`.
- **Vai adicionar uma ferramenta MCP?** Consulte `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Vai adicionar uma capacidade A2A?** Consulte `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Vai executar localmente?** Consulte `docs/guides/SETUP_GUIDE.md`.
- **Vai implementar?** Consulte `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Vai publicar uma versão?** Consulte `docs/ops/RELEASE_CHECKLIST.md` (e a capacidade `/generate-release-cc` do Claude Code).
