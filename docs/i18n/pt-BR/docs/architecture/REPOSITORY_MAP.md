# Repository Map (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **O que reside onde: cada diretório de nível superior rastreado e arquivo raiz, com uma finalidade de uma linha.** Última atualização: 13/11/2026 (OmniRoute v3.8.54)
>
> Use este mapa para se orientar na base de código e siga os links para os documentos dedicados. As contagens de arquivos foram medidas com `git ls-files` na data acima. Eles mudam a cada lançamento, portanto, trate-os como ordens de magnitude.

## Árvore de nível superior

```
OmniRoute/
├── src/              # Next.js 16 app: dashboard, /api and /v1 routes, server libs, domain, i18n
├── open-sse/         # Streaming engine workspace (@omniroute/open-sse): handlers, executors, translator, services, MCP server
├── packages/         # npm workspaces: ui-kit (vendored Keak CI UI Kit) and browser-pool
├── @omniroute/       # Separately published npm packages (OpenCode plugins and provider)
├── bin/              # Published `omniroute` CLI, MCP/bridge entry points, self-host ops scripts (*.sh)
├── electron/         # Desktop app (Electron main/preload + helpers + icons)
├── public/           # Static assets served by Next.js (provider logos, PWA icons, sw.js, openapi.yaml copy)
├── skills/           # Agent Skills (SKILL.md) served by /api/agent-skills, MCP and A2A
├── tests/            # All test suites: unit, integration, e2e, homolog, fixtures, snapshots
├── scripts/          # Build, quality gates, i18n, release, ops, perf and one-off scripts (allow-listed subfolders)
├── config/           # Versioned config: i18n, payload rules, CLI manifest, quality-gate baselines, release inventories
├── changelog.d/      # Per-PR changelog fragments, aggregated into CHANGELOG.md at release time
├── docs/             # Public documentation (served at /docs via Fumadocs) + translated mirrors in docs/i18n/
├── examples/         # Example plugins and quickstart clients
├── deploy/           # Kubernetes deployment: Helm chart + Kustomize base/overlays
├── docker/           # Auxiliary container images (not the main image, which is the root Dockerfile)
├── contrib/          # Community recipes: Podman quadlets, VPS compose, Windows launchers, session-sync note
├── .github/          # GitHub Actions workflows, composite actions, issue/PR templates, CODEOWNERS, labels
├── .husky/           # Tracked git hooks: commit-msg, pre-commit, pre-push
├── .vale/            # Vale prose-lint vocabulary (styles/Vocab/OmniRoute/accept.txt)
├── .vscode/          # Shared VS Code workspace settings (settings.json)
└── (root files — see below)
```

Caminhos locais, gerados ou privados (todos ignorados pelo git, nunca confirmados, não descritos mais detalhadamente):

```
node_modules/            # npm dependencies
.build/                  # Next.js build output (default distDir .build/next, see next.config.mjs)
dist/                    # npm staging directory assembled by scripts/build/prepublish.ts
.source/                 # fumadocs-mdx output that feeds the /docs viewer
.husky/_/                # Husky runtime generated on install (core.hooksPath target)
coverage/ logs/ test-results/ playwright-report/   # coverage, runtime logs, Playwright output
.env                     # local secrets generated from .env.example
_*/                      # private local-only folders (anchored /_* ignore); never tracked
.claude/ .agents/        # local AI-assistant state and skills; never tracked
```

---

## Arquivos raiz

Todos os arquivos rastreados na raiz do repositório (`git ls-files | grep -v /`), agrupados por função.

### Documentação do projeto

| Arquivo                  | Propósito                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `README.md`              | Página inicial: visão geral dos recursos, início rápido, métodos de instalação       |
| `CHANGELOG.md`           | Changelog por lançamento (fragmentos do `changelog.d/` são dobrados aqui)            |
| `ROADMAP.md`             | Roteiro público                                                                      |
| `LICENSE`                | licença MIT                                                                          |
| `THIRD_PARTY_NOTICES.md` | Avisos para código de terceiros incluído (por exemplo, as ligações wreq-js)          |
| `CONTRIBUTING.md`        | Guia do contribuidor: configuração, commits convencionais, matriz de teste, fluxo PR |
| `SECURITY.md`            | Política de relatórios de vulnerabilidade                                            |
| `CODE_OF_CONDUCT.md`     | Expectativas de comportamento da comunidade                                          |
| `llm.txt`                | Resumo do projeto em texto simples para rastreadores e assistentes LLM               |

### Instruções do assistente de IA

| Arquivo     | Propósito                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------- |
| `AGENTS.md` | Fonte única de verdade para cada assistente AI : convenções, portões de qualidade, regras rígidas |
| `CLAUDE.md` | Deltas específicos do Código Claude; importa `AGENTS.md`                                          |
| `GEMINI.md` | Deltas específicos de Gêmeos; aponta de volta para `AGENTS.md`                                    |

Guias aninhados também existem próximos ao código que descrevem: `open-sse/services/AGENTS.md` e `src/lib/db/AGENTS.md`.

### Manifestos de pacote e conjunto de ferramentas do Node

| Arquivo                    | Propósito                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------- |
| `package.json`             | manifesto npm: scripts, dependências, `engines`, `workspaces`, `files` publicado                        |
| `package-lock.json`        | Árvore de dependência bloqueada                                                                         |
| `pnpm-workspace.yaml`      | lista de espaços de trabalho pnpm (`packages/*`, `open-sse`) e lista de permissões de compilação nativa |
| `.npmrc` / `.npmignore`    | configuração do npm e exclusões de publicação                                                           |
| `.node-version` / `.nvmrc` | Pins de versão do nó para gerenciadores de versão                                                       |
| `flake.nix` / `flake.lock` | Nix dev shell e seu bloqueio                                                                            |
| `Makefile`                 | Atalhos `make` que delegam aos scripts npm                                                              |

### compilação TypeScript, Next.js e docs

| Arquivo                                   | Propósito                                                                              |
| ----------------------------------------- | -------------------------------------------------------------------------------------- |
| `tsconfig.json`                           | Configuração básica TypeScript e aliases de caminho (`@/*`, `@omniroute/open-sse`)     |
| `tsconfig.typecheck-core.json`            | fatia `npm run typecheck:core`                                                         |
| `tsconfig.typecheck-noimplicit-core.json` | fatia `npm run typecheck:noimplicit:core` ( `noImplicitAny` estrito)                   |
| `tsconfig.typecheck-api.json`             | Fatia de verificação de tipo de rota API (`scripts/check/check-api-typecheck.mjs`)     |
| `tsconfig.typecheck-dashboard.json`       | Fatia de verificação de digitação do painel (`npm run check:dashboard-typecheck`)      |
| `tsconfig.build.json`                     | Verificação de tipo de produção (`npm run typecheck:build`, `check:build-typecheck`)   |
| `tsconfig.mitm.json`                      | Configuração de compilação MITM usada pelo `scripts/build/buildMitm.mjs`               |
| `next.config.mjs`                         | Configuração Next.js 16 (saída independente, aliases de perfil de construção)          |
| `source.config.ts`                        | Configuração do Fumadocs `defineDocs` : quais seções `docs/` são compiladas no `/docs` |
| `postcss.config.mjs`                      | pipeline PostCSS / Tailwind                                                            |

### Lint e formatação

| Arquivo                                   | Propósito                                                                                                  |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `eslint.config.mjs`                       | Configuração plana principal ESLint (`npm run lint`, com `config/quality/eslint-suppressions.json`)        |
| `eslint.complexity-ratchets.config.mjs`   | Configuração autônoma usada pelas catracas de complexidade e complexidade cognitiva em uma passagem ESLint |
| `eslint.complexity.config.mjs`            | Configuração autônoma apenas com núcleo `complexity` + `max-lines-per-function` (usado por testes)         |
| `prettier.config.mjs` / `.prettierignore` | regras e exclusões Prettier                                                                                |
| `.editorconfig`                           | Padrões do editor (recuo de 2 espaços)                                                                     |
| `.markdownlint.json`                      | Lint de marcação consultiva (`npm run lint:md`)                                                            |
| `.vale.ini`                               | Lint de prosa consultiva (`npm run lint:prose`), vocabulário em `.vale/`                                   |

### Testes, avaliação e cobertura

| Arquivo                       | Propósito                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| `vitest.config.ts`            | suíte jsdom Vitest : `npm run test:vitest:ui` (painel `.tsx`, ganchos, testes memory/skills )            |
| `vitest.mcp.config.ts`        | Conjunto Vitest do nó: `npm run test:vitest` (servidor MCP, autoCombo, combo, API `.spec.ts`)            |
| `vitest.quarantine.config.ts` | Executa os arquivos em quarentena listados em `config/quality/vitest-exclusions.json`                    |
| `vitest.e2e-live.config.ts`   | Conjuntos Vitest de servidor ativo (`tests/e2e/ecosystem.test.ts`, `tests/e2e/protocol-clients.test.ts`) |
| `playwright.config.ts`        | Playwright E2E (`tests/e2e/**/*.spec.ts`, `npm run test:e2e`)                                            |
| `stryker.conf.mjs`            | Teste de mutação Stryker (`npm run test:mutation`; calcula `tap.testFiles` a partir de `mutate`)         |
| `stryker.disablebail.mjs`     | Variante Stryker sem fiança, para medição de redundância de teste                                        |
| `promptfooconfig.yaml`        | conjunto de segurança promptfoo LLM                                                                      |
| `codecov.yml`                 | Configurações de cobertura de patch Codecov                                                              |

### Docker e implantação

| Arquivo                           | Propósito                                                                            |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `Dockerfile`                      | Imagem em vários estágios (`builder` → `runner-base` → `runner-web` / `runner-cli*`) |
| `Dockerfile.bun`                  | Imagem alternativa no tempo de execução Bun (construída por `docker-publish.yml`)    |
| `docker-compose.yml`              | Composição padrão com perfis (base, web, cli, host, memória, cliproxyapi,…)          |
| `docker-compose.prod.yml`         | Instância separada de instantâneo de produção na porta 20130                         |
| `docker-compose.selfhost.yml`     | Auto-host de loopback de um comando (pares com `.env.selfhost.example`)              |
| `docker-compose.ollama-local.yml` | Docker OmniRoute conversando com um Ollama nativo do host                            |
| `.dockerignore`                   | exclusões de contexto de construção Docker                                           |
| `fly.toml`                        | Configuração do aplicativo Fly.io (porta 20128, volume `/data` )                     |

### Segurança, cadeia de suprimentos e bots de repositório

| Arquivo                                      | Propósito                                                                                 |
| -------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `.gitleaks.toml`                             | regras e listas de permissões de verificação secreta do gitleaks                          |
| `.trivyignore`                               | Supressões de risco aceito para verificação de imagem de contêiner                        |
| `.zizmor.yml`                                | Configuração de auditoria de segurança de ações zizmor GitHub                             |
| `socket.yml`                                 | Configuração do aplicativo Socket.dev (caminho ignora; não é um portão CI )               |
| `sonar-project.properties`                   | configuração do projeto SonarQube/SonarCloud                                              |
| `knip.json`                                  | Cortar configuração files/exports/deps não utilizada (alimenta `npm run check:dead-code`) |
| `.size-limit.json`                           | Orçamentos de tamanho de pacote                                                           |
| `.mergify.yml`                               | Configuração da fila de mesclagem do Mergify                                              |
| `.coderabbit.yaml`                           | configuração de revisão CodeRabbit                                                        |
| `.cbmignore`                                 | Lista de ignorados para o índice de código codebase-memory-mcp                            |
| `.gitignore` / `.gitattributes` / `.mailmap` | Ignorar regras, finais de linha LF para scripts, identidades canônicas de autores         |

### Modelos de ambiente, estado e feeds

| Arquivo                     | Propósito                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------- |
| `.env.example`              | Modelo copiado para `.env` na primeira instalação; lista de referência de env vars |
| `.env.selfhost.example`     | Modelo para `docker-compose.selfhost.yml`                                          |
| `.env.homolog.example`      | Modelo para o executor de homologação (`npm run homolog`)                          |
| `.env.devin-bridge.example` | Exemplo de arquivo env para a configuração da ponte Devin                          |
| `.i18n-state.json`          | Estado de tradução incremental (hashes de origem por documento e localidade)       |
| `news.json`                 | Feed de anúncio localizado (esquema v2) lido pelo painel                           |

---

## aplicativo `src/` — Next.js

Cerca de 4.550 arquivos rastreados. Alias do caminho `@/*` → `src/*`.

```
src/
├── app/                  # App Router: pages, layouts and route handlers (file-convention loaded)
│   ├── (dashboard)/      # Route group for the dashboard: dashboard/<section>/ pages + home widgets
│   ├── api/              # HTTP routes: v1/ (OpenAI-compatible), v1beta/ (Gemini-style), management routes
│   ├── docs/             # Embedded docs viewer (lib/openapi.generated.ts is generated)
│   ├── a2a/ .well-known/ # A2A JSON-RPC entry point and Agent Card discovery
│   ├── healthz/ livez/ readyz/ status/   # Health probes and status page
│   ├── landing/ login/ auth/ authorize/ callback/ connect/   # Public, auth and OAuth pages
│   ├── miniapp/          # Telegram Mini App page
│   └── 400/ … 503/       # Static HTTP error pages
├── lib/                  # Server-side libraries and domain modules (largest folder)
├── shared/               # Code shared by server and client: components, constants, validation, utils
├── sse/                  # Next.js side of the SSE pipeline: handlers/ (chat*), services/ (auth, leases, quotas)
├── mitm/                 # MITM / TPROXY capture: cert/, dns/, handlers/, targets/, inspector/, tproxy/ (C addon)
├── server/               # Server-only: authz/ (route guard pipeline), auth/, cors/, origin/, ws/
├── domain/               # Policy engine, fallback, cost rules, lockout, quota cache, assessment/
├── i18n/                 # next-intl: messages/ (67 locales), global-error-messages/ (generated), routeNamespaces.generated.json
├── store/                # Zustand client stores (theme, notifications, …)
├── hooks/                # Client hooks (live dashboard, compression preview, breaker health)
├── types/                # Ambient and shared type declarations
├── models/               # Compatibility barrel re-exporting db functions
├── middleware/           # promptInjectionGuard.ts (facade over the guardrail system)
├── scripts/              # backfillAggregation.ts (`npm run backfill-aggregation`)
├── proxy.ts              # Next.js 16 proxy: headless gate + authz pipeline for dashboard, /api and /v1-style paths
├── instrumentation.ts    # Next.js instrumentation hook (delegates Node-only work)
└── instrumentation-node.ts   # Node-only startup work
```

### Roteador de aplicativo `src/app/` —

| Caminho                                                             | Propósito                                                                                                                                                                                            |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                       | API público compatível com OpenAI: bate-papo, conclusões, respostas, mensagens, incorporações, imagens, áudio, vídeos, música, reclassificação, moderações, pesquisa, arquivos, lotes, ws, modelos,… |
| `app/api/v1beta/`                                                   | Pontos de extremidade estilo Gêmeos                                                                                                                                                                  |
| `app/api/` (outras pastas)                                          | Rotas de gerenciamento e administração: provedores, combos, configurações, chaves, uso, logs, mcp, a2a, acp, memória, habilidades, avaliações, webhooks, túneis, plugins, radar, ferramentas,…       |
| `app/api/tools/agent-bridge/`                                       | AgentBridge REST API — veja [AGENTBRIDGE.md](../frameworks/AGENTBRIDGE.md)                                                                                                                           |
| `app/api/tools/traffic-inspector/`                                  | Inspetor de tráfego REST API — consulte [TRAFFIC_INSPECTOR.md](../frameworks/TRAFFIC_INSPECTOR.md)                                                                                                   |
| `app/(dashboard)/dashboard/`                                        | Uma pasta por seção do painel (provedores, combos, logs, uso, custos, cache, compactação, memória, playground, ferramentas de pesquisa, configurações, ferramentas,…)                                |
| `app/(dashboard)/home/`                                             | Tela inicial e seus widgets                                                                                                                                                                          |
| `app/docs/`                                                         | Visualizador de documentos renderizando as seções do Fumadocs listadas em `source.config.ts`                                                                                                         |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`          | Layout raiz, entrada raiz (redirecionamentos), manifesto PWA, CSS global                                                                                                                             |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx` | Limites de erro e substitutos                                                                                                                                                                        |

as rotas API seguem `Route → CORS → Zod validation → optional auth → policy → handler`; veja [ARCHITECTURE.md](ARCHITECTURE.md) e [API_REFERENCE](../reference/API_REFERENCE.md)

### bibliotecas do servidor `src/lib/` —

Aproximadamente 90 subpastas mais cerca de 90 módulos de nível superior. Grupos principais:

| Área                         | Pastas/arquivos                                                                                                     | Mergulho profundo                                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Banco de dados               | módulos de domínio `db/` —, `migrations/`, `adapters/`, `repositories/`, `migrationRunner/`                         | [`src/lib/db/AGENTS.md`](../../src/lib/db/AGENTS.md), [DATABASE_GUIDE](../ops/DATABASE_GUIDE.md)                                            |
| Uso, cota e gastos           | `usage/`, `quota/`, `spend/`                                                                                        | [QUOTA_SHARE](../routing/QUOTA_SHARE.md), [COST_TRACKING](../guides/COST_TRACKING.md)                                                       |
| Provedores e modelos         | `providers/`, `providerModels/`, `modelValidation/`, `catalog/`, `radar/`, `freeProxyProviders/`                    | [RADAR.md](../frameworks/RADAR.md), [MODEL-VALIDATION.md](../guides/MODEL-VALIDATION.md)                                                    |
| OAuth e credenciais          | `oauth/` (provedores/, serviços/, utilitários/), `zed-oauth/`, `copilot/`, `cursor/`, `credentialHealth/`           | `resolvePublicCred()` (documento do operador, não veiculado publicamente)                                                                   |
| Segurança e governança       | `guardrails/`, `compliance/`, `pii/`, `security/`                                                                   | [GUARDRAILS.md](../security/GUARDRAILS.md), [COMPLIANCE.md](../security/COMPLIANCE.md)                                                      |
| Recursos do agente           | `a2a/`, `acp/`, `cloudAgent/`, `memory/`, `skills/`, `agentSkills/`                                                 | [AGENT_PROTOCOLS_GUIDE](../frameworks/AGENT_PROTOCOLS_GUIDE.md), [MEMORY.md](../frameworks/MEMORY.md), [SKILLS.md](../frameworks/SKILLS.md) |
| Plug-ins e serviços          | `plugins/`, `services/` (instaladores e supervisores de serviços integrados)                                        | [PLUGINS.md](../frameworks/PLUGINS.md), [EMBEDDED-SERVICES.md](../frameworks/EMBEDDED-SERVICES.md)                                          |
| Roteamento e resiliência     | `combos/`, `routing/`, `resilience/`, `reasoningRouting/`, `promptCache/`                                           | [RESILIENCE_GUIDE](RESILIENCE_GUIDE.md)                                                                                                     |
| Proxies e redes              | `proxyHealth/`, `proxySubscription/`, `proxyRelay/`, `proxyEvents/`, módulos de túnel                               | [PROXY_GUIDE](../ops/PROXY_GUIDE.md), [TUNNELS_GUIDE](../ops/TUNNELS_GUIDE.md)                                                              |
| Trabalhos e agendamento      | `jobs/`, `jobRegistry/`, `warmupScheduler/`                                                                         |                                                                                                                                             |
| Observabilidade e exportação | `monitoring/`, `logExport/`, `webhooks/`, `audit/`, `events/`                                                       | [LOG-EXPORT.md](../frameworks/LOG-EXPORT.md), [WEBHOOKS.md](../frameworks/WEBHOOKS.md)                                                      |
| integração CLI e IDE         | `cliTools/`, `cli-helper/`, `vscode/`, `inspector/`, `versionManager/`                                              | [CLI-TOOLS.md](../reference/CLI-TOOLS.md), [VSCODE-COPILOT.md](../guides/VSCODE-COPILOT.md)                                                 |
| Fontes de contexto           | `localCorpus/`, `notion/`, `obsidian/`                                                                              | [LOCAL_CORPUS_CONTEXT](../frameworks/LOCAL_CORPUS_CONTEXT.md)                                                                               |
| Outros recursos              | `evals/`, `playground/`, `gamification/`, `telegram/`, `conductor/`, `batches/`, `deploy/`, `transfer/`, `sync/`, … | [EVALS.md](../frameworks/EVALS.md), [PLAYGROUND_STUDIO](../frameworks/PLAYGROUND_STUDIO.md)                                                 |

Módulos de nível superior que vale a pena conhecer:

| Arquivo                                                        | Propósito                                                                             |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `cacheLayer.ts`, `idempotencyLayer.ts`, `semanticCache.ts`     | Cache de resposta e idempotência                                                      |
| `webhookDispatcher.ts`                                         | Entrega de webhook assinado por HMAC                                                  |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts` | Gerentes de túneis                                                                    |
| `tokenHealthCheck*.ts`, `tokenRefreshCircuit.ts`               | Verificações de integridade de credenciais em segundo plano e circuito de atualização |
| `streamingPiiTransform.ts`, `streamingCredentialTransform.ts`  | Desinfetantes de resposta de streaming                                                |
| `gracefulShutdown.ts`, `serverLifecycle.ts`                    | Ciclo de vida do processo                                                             |
| `*.stub.ts`                                                    | Stubs de perfil de construção trocados por aliases em `next.config.mjs`               |

### banco de dados `src/lib/db/` —

| Caminho               | Propósito                                                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`          | `getDbInstance()` singleton (WAL diário)                                                                                              |
| `db/migrations/`      | Migrações `.sql` numeradas e idempotentes (236 arquivos no momento da escrita; numeração de guardas `check-migration-numbering.mjs` ) |
| `db/migrationRunner/` | Corredor de migração                                                                                                                  |
| `db/adapters/`        | Adaptadores de driver SQLite (better-sqlite3, node:sqlite, bun:sqlite, sql.js)                                                        |
| `db/repositories/`    | Implementações do repositório SQLite (combos, predefinições de playground, configuração de roteamento)                                |
| `db/<domain>.ts`      | Cerca de 175 módulos de domínio (provedores, combos, apiKeys, configurações, uso,…) — sempre os importa diretamente                   |

### `src/domain/`, `src/server/`, `src/shared/`

| Caminho                                                        | Propósito                                                                                                                                                          |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `domain/policyEngine.ts`                                       | Mecanismo de política                                                                                                                                              |
| `domain/fallbackPolicy.ts`, `lockoutPolicy.ts`, `costRules.ts` | Decisões alternativas, política de bloqueio, regras de custos                                                                                                      |
| `domain/quotaCache*.ts`, `quotaSnapshot*.ts`                   | Cache de cota e persistência de snapshot                                                                                                                           |
| `domain/assessment/`                                           | Avaliação do modelo (avaliador, categorizador, autocurador)                                                                                                        |
| `server/authz/`                                                | Pipeline de autorização e proteção de rota (`routeGuard.ts`) — consulte [AUTHZ_GUIDE.md](AUTHZ_GUIDE.md), [ROUTE_GUARD_TIERS.md](../security/ROUTE_GUARD_TIERS.md) |
| `server/origin/`, `server/cors/`                               | resolução de origem Public/MCP/WS e CORS — veja [CORS.md](../security/CORS.md)                                                                                     |
| `server/ws/`                                                   | Servidor WebSocket de painel ao vivo                                                                                                                               |
| `shared/components/`                                           | Componentes e adaptadores do painel sobre `packages/ui-kit` — consulte [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)                                                        |
| `shared/constants/`                                            | Catálogo de provedores (`providers.ts`), estratégias de roteamento, ferramentas CLI, mapa de ícones, lista de bloqueio de cabeçalho upstream,…                     |
| `shared/validation/`                                           | esquemas Zod e auxiliares de validação                                                                                                                             |
| `shared/utils/`                                                | Disjuntor, autenticação de chave de API, tempos limite de busca, sinalizadores de recursos,…                                                                       |
| `shared/middleware/`, `network/`, `services/`, `hooks/`        | Middleware de admissão de bate-papo, ajudantes de rede, serviços de cliente, ganchos React                                                                         |

---

## Espaço de trabalho do mecanismo de streaming `open-sse/` —

npm workspace `@omniroute/open-sse` (cerca de 2.390 arquivos rastreados). Ele faz o processamento da solicitação e a execução do provedor. Visão geral: [OPEN_SSE_ARCHITECTURE.md](../frameworks/OPEN_SSE_ARCHITECTURE.md).

```
open-sse/
├── handlers/       # Request handlers: chatCore.ts + chatCore/, responses, embeddings, audio, imageGeneration/,
│                   #   videoGeneration/, search/, fal/, mediaGeneration/, sseParser/, responseSanitizer/, …
├── executors/      # Provider-specific HTTP dispatch, registered in executors/registry.ts; base/ holds shared recovery helpers
├── translator/     # Format conversion: request/, response/, helpers/, image/, registry.ts, bootstrap.ts
├── transformer/    # responsesTransformer.ts (Responses API ↔ Chat Completions TransformStream)
├── services/       # Combo routing, rate limits, fallback, caching, usage, token refresh, compression (see below)
├── config/         # Provider registry (config/providers/registry/<id>/), constants, model/media registries
├── mcp-server/     # MCP server: tools/, schemas/, toolSearch/, transports, audit, scopes, __tests__/
├── utils/          # Stream, error, TLS, proxy-fetch and logging utilities
├── vendor/         # codex-chatgpt-web/ — vendored adapter (provenance in vendor.json)
├── lib/            # DeepSeek proof-of-work worker and hash
├── shared/         # zedAuth.ts
├── index.ts        # Workspace entry
└── package.json · tsconfig.json · types.d.ts
```

### `open-sse/services/`

| Caminho                                                                                        | Propósito                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combo.ts` + `combo/`                                                                          | Estratégias de roteamento combinadas — consulte [AUTO-COMBO.md](../routing/AUTO-COMBO.md)                                                                                     |
| `autoCombo/`                                                                                   | Pontuação Auto-Combo e pacotes de modos                                                                                                                                       |
| `accountFallback.ts` + `accountFallback/`                                                      | Resfriamento de conexão e bloqueio de modelo — consulte [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                            |
| `rateLimitManager.ts` + `rateLimitManager/`                                                    | Rastreamento de limite de taxa e análise de cabeçalho                                                                                                                         |
| `compression/`                                                                                 | Mecanismos de compactação (`engines/`), pacotes de regras (`rules/`), `eval/`, `harness/`, `riskGate/` — consulte [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) |
| `tokenRefresh/`, `usage/`, `cache/`, `admission/`, `sessionPool/`, `codexAccount/`, `routing/` | Atualização de token, contabilidade de uso, cache, vias de admissão, pools de sessões, contas Codex, auxiliares de roteamento                                                 |
| `__tests__/`                                                                                   | Conjuntos Vitest co-localizados (coletados pelas configurações Vitest )                                                                                                       |
| `AGENTS.md`                                                                                    | Guia do agente para esta pasta                                                                                                                                                |

Padrão: um módulo grande `X.ts` próximo a uma pasta `X/` significa que o módulo foi dividido em arquivos menores (`handlers/chatCore.ts` + `handlers/chatCore/`, `services/combo.ts` + `services/combo/`).

### `open-sse/mcp-server/`

| Caminho               | Propósito                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| `server.ts`           | Ciclo de vida do servidor MCP                                                                          |
| `httpTransport.ts`    | Transportes HTTP e SSE streamáveis                                                                     |
| `scopeEnforcement.ts` | Verificações de escopo por ferramenta                                                                  |
| `audit.ts`            | Registro de auditoria de chamada de ferramenta                                                         |
| `schemas/`            | Definições e escopos de ferramentas                                                                    |
| `tools/`              | Implementações de ferramentas (memória, habilidades, compressão,…)                                     |
| `toolSearch/`         | Pesquisa de ferramentas                                                                                |
| `README.md`           | Notas de arquitetura interna; o catálogo completo está em [MCP-SERVER.md](../frameworks/MCP-SERVER.md) |

---

## espaços de trabalho `packages/` — npm

| Caminho                  | Propósito                                                                                                                                                                                                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit`: snapshot vendido do kit Keak CI UI, consumido como fonte. `UPSTREAM.md` fixa o commit upstream, `PATCHES.md` lista patches locais. `src/` é sincronizado apenas por `scripts/dev/sync-ui-kit.sh` e protegido por `npm run check:ui-kit-snapshot`. Veja [DESIGN_SYSTEM](DESIGN_SYSTEM.md) |
| `packages/browser-pool/` | `@omniroute/browser-pool`: interfaces e implementação do pool de navegadores (`packages/browser-pool/src/index.ts`, `packages/browser-pool/src/interfaces.ts`). Listado em `workspaces`; o pool de navegadores de tempo de execução usado pelo gateway reside em `open-sse/services/`                         |

## pacotes `@omniroute/` — publicados separadamente

Estes não são espaços de trabalho npm. Cada um tem seu próprio `package.json` e lockfile; a pasta vem no tarball `omniroute` (`files: ["@omniroute/"]`).

| Caminho                          | Propósito                                                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@omniroute/opencode-plugin/`    | plugin OpenCode (descoberta de modelo, autenticação `/connect` ); usado por `omniroute setup-opencode` — veja [OPENCODE.md](../frameworks/OPENCODE.md) |
| `@omniroute/opencode-plugin-v2/` | Plugin OpenCode para v2 Promise API — veja [OPENCODE-V2-PLUGIN.md](../guides/OPENCODE-V2-PLUGIN.md)                                                    |
| `@omniroute/opencode-provider/`  | Gerador de configuração estática; marcado como obsoleto em seu próprio `package.json` em favor do `opencode-plugin`                                    |

---

## scripts `bin/` — CLI e operações

| Caminho                                                                     | Propósito                                                                                                                                     |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                             | Entrada CLI principal (`omniroute serve`, `setup`, `doctor`, `providers`, `combo`,…)                                                          |
| `reset-password.mjs`                                                        | binário `omniroute-reset-password`                                                                                                            |
| `mcp-server.mjs`                                                            | ponto de entrada MCP stdio                                                                                                                    |
| `antigravity-bridge.mjs`, `chatgpt-web-codex-mcp.mjs`                       | Ponte auxiliar / pontos de entrada MCP                                                                                                        |
| `aliasResolver.mjs`, `aliasResolverHook.mjs`                                | gancho ESM resolve que mapeia aliases de caminho tsconfig para instalações globais                                                            |
| `nodeRuntimeSupport.mjs`                                                    | Verificação de versão Node.js compatível                                                                                                      |
| `snapshot-data.sh`, `restore-data.sh`, `restore-policies.sh`, `rollback.sh` | Scripts de recuperação de incidentes de auto-hospedagem (compartilhar `_ops-common.sh`)                                                       |
| `cold-start-bench.sh`                                                       | Benchmark de inicialização a frio — consulte [PERF_BASELINE.md](../ops/PERF_BASELINE.md)                                                      |
| `cli/commands/`                                                             | Um módulo por comando CLI (cerca de 100, incluindo as integrações `setup-*` )                                                                 |
| `cli/api-commands/`                                                         | Gerado de `docs/openapi.yaml` por `npm run build:cli-api` — não edite                                                                         |
| `cli/locales/`                                                              | catálogos de mensagens CLI (67 localidades)                                                                                                   |
| `cli/tui/`, `cli/tui-components/`                                           | Terminal UI                                                                                                                                   |
| `cli/tray/`                                                                 | Bandeja do sistema e inicialização automática (backend Windows PowerShell, bandeja do sistema no macOS/Linux)                                 |
| `cli/runtime/`                                                              | Resolução de tempo de execução nativa (`sqliteRuntime.mjs`, `magicBytes.mjs`), supervisor de processo                                         |
| `cli/*.mjs`                                                                 | Ajudantes compartilhados (args, cliente API, diretório de dados, criptografia, armazenamento de provedores, armazenamento de configurações,…) |
| `cli/README.md`, `cli/CONVENTIONS.md`                                       | internos e convenções CLI                                                                                                                     |

Veja [CLI-TOOLS.md](../reference/CLI-TOOLS.md) e [CLI-COMPANION.md](../guides/CLI-COMPANION.md).

## aplicativo de desktop `electron/` —

| Caminho                                                    | Propósito                                                                                                     |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `main.js`                                                  | Processo principal Electron (janela, servidor incorporado, bandeja, atualizações)                             |
| `preload.js`                                               | ponte IPC exposta ao renderizador                                                                             |
| `lib/`                                                     | Ciclo de vida da janela, prontidão do servidor, monitoramento de integridade, preferências de servidor remoto |
| `remoteServerPrompt*.js`, `assets/remoteServerPrompt.html` | Janela de prompt do servidor remoto                                                                           |
| `processTree.js`, `sqlite-inspection.js`                   | Ajudantes de limpeza de processos infantis e inspeção SQLite                                                  |
| `package.json` / `package-lock.json`                       | configuração do construtor de elétrons e dependências Electron                                                |
| `assets/`                                                  | Ícones de aplicativos e bandeja (`.ico`, `.icns`, `.png`)                                                     |
| `README.md`                                                | Notas internas — consulte [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)                                    |

## ativos estáticos `public/` —

| Caminho                                     | Propósito                                                                                                                          |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `providers/`                                | Logotipos do provedor carregados por id (`/providers/<id>.svg`); proveniência em `config/quality/provider-assets-provenance.jsonl` |
| `favicon.*`, `apple-touch-icon.*`, `icon-*` | Ícones do navegador e PWA                                                                                                          |
| `sw.js`                                     | Trabalhador de serviço — consulte [PWA_GUIDE.md](../guides/PWA_GUIDE.md)                                                           |
| `openapi.yaml`                              | Cópia do `docs/openapi.yaml` gerada pelo `npm run gen:public-openapi`                                                              |
| `images/`, `sponsors/`, `deyin.svg`         | Diagramas de fluxo de níveis, banner do patrocinador, arte README                                                                  |

## Habilidades do agente `skills/` —

46 habilidades, uma pasta cada uma com um `SKILL.md` (`cli-*`, `omni-*`, `config-codex-cli`, `ponytail`), mais `skills/README.md`. `src/lib/agentSkills/catalog.ts` os lê em tempo de execução e os expõe por meio de `/api/agent-skills`, MCP e A2A. A maioria dos manifestos é gerada por `src/lib/agentSkills/generator.ts` (`scripts/skills/generate-agent-skills.mjs`; `npm run check:agent-skills-sync` verifica desvios). Veja [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md).

---

## construção `scripts/` —, portões e ferramentas

Cerca de 435 arquivos rastreados. Novos scripts vão para uma das subpastas permitidas por `AGENTS.md`; o código único entra `scripts/ad-hoc/`.

```
scripts/
├── check-permissions.sh   # Container ENTRYPOINT (copied to /app by the Dockerfile)
├── postinstall.mjs        # Native-runtime warm-up run after scripts/build/postinstall.mjs
├── start-ws-server.mjs    # Starts the live-dashboard WebSocket server as a separate process
├── build/                 # Build, standalone assembly, npm pack/publish, postinstall, MITM, Electron prep
├── check/                 # Quality gates behind most `npm run check:*` scripts; lib/ holds shared helpers
├── quality/               # Ratchets, gate manifest, impact map, mutation tooling, release acceptance
├── ci/                    # Steps invoked only by workflows (Docker publish, Release-Green, scanners)
├── dev/                   # Dev runners (run-next, Playwright/protocol/ecosystem runners) and runtime helpers shipped in the package
├── docs/                  # README SVG/diagram generators, OpenAPI module, provider reference, wiki sync
├── i18n/                  # UI and docs translation pipeline, coverage checks, glossary/, lib/
├── release/               # Changelog aggregation, contributors, merge train, LTS cut, publish verification
├── ops/                   # Canary deploy, OpenCode free relay, runner janitor, allowlist sync
├── perf/                  # Benchmarks and one-off performance A/B scripts
├── cli/                   # CLI tooling (API-command generator, SSO, CLI smoke tests, media MCP)
├── homolog/               # Homologation against a running instance + promptfoo config generation
├── features/              # Feature-triage engine and its lib/
├── router-eval/           # Offline router evaluation (`npm run eval:router*`)
├── compression/           # Compression benchmark (`npm run bench:compression`, runs on Bun)
├── compression-eval/      # Compression quality evaluation (`npm run eval:compression`)
├── devin-bridge/          # Shell entry points for the Devin bridge (build, launch, tests)
├── docker/                # Base-path patching for the standalone server inside containers
├── integrations/          # MarkItDown MCP launchers — see docs/integrations/MARKITDOWN_MCP.md
├── launchers/             # Double-click launchers and desktop-shortcut creators (Windows/macOS/Linux)
├── packs/                 # Optional-pack manifest and installer (shipped in the npm package)
├── test/                  # Live smoke scripts (combo-live, OpenCode/ChatGPT Web)
├── sre/                   # On-call rotation, log redaction, TCP close analyzer
├── vps/                   # Start/stop the release runner
├── skills/                # Agent Skills generator CLI
├── research/              # Free-tier budget card SVG generator
└── ad-hoc/                # One-shot diagnostics and migrations
```

Pontos de entrada usados com frequência:

| Roteiro                                                             | Propósito                                                                                                               |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `dev/run-next.mjs`                                                  | corredor `npm run dev` / `npm start`                                                                                    |
| `build/build-next-isolated.mjs`                                     | `npm run build` (construção autônoma Next.js )                                                                          |
| `build/prepublish.ts`                                               | `npm run build:cli`: monta o npm `dist/`                                                                                |
| `build/postinstall.mjs`                                             | gancho npm `postinstall`                                                                                                |
| `build/publicOpenApi.mjs`                                           | `npm run gen:public-openapi`                                                                                            |
| `docs/gen-provider-reference.ts`                                    | `npm run gen:provider-reference` (regenera PROVIDER_REFERENCE.md)                                                       |
| `docs/gen-openapi-module.mjs`                                       | `prebuild:docs` (gera `src/app/docs/lib/openapi.generated.ts`)                                                          |
| `i18n/run-translation.mjs`                                          | `npm run i18n:run` (espelhos de documentos)                                                                             |
| `i18n/generate-route-namespaces.mjs`                                | `npm run gen:i18n-routes`                                                                                               |
| `release/aggregate-changelog.mjs`                                   | Dobra fragmentos `changelog.d/` em `CHANGELOG.md`                                                                       |
| `check/check-fabricated-docs.mjs`                                   | `npm run check:fabricated-docs` (portão de precisão do documento)                                                       |
| `check/check-tracked-artifacts.mjs`                                 | `npm run check:tracked-artifacts` (bloqueia caminhos `_*` raiz rastreados)                                              |
| `quality/check-quality-ratchet.mjs`                                 | `npm run quality:ratchet` (catraca métrica contra `config/quality/`)                                                    |
| `dev/run-playwright-tests.mjs`                                      | `npm run test:e2e`                                                                                                      |
| `dev/run-protocol-clients-tests.mjs`, `dev/run-ecosystem-tests.mjs` | `npm run test:protocols:e2e`, `npm run test:ecosystem`                                                                  |
| `dev/new-worktree.sh`                                               | Cria uma árvore de trabalho de desenvolvimento isolada — consulte [WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md) |
| `dev/sync-ui-kit.sh`                                                | Sincroniza `packages/ui-kit/src` com um commit upstream fixado                                                          |

Inventário e políticas do portão: [QUALITY_GATES.md](QUALITY_GATES.md).

## Configuração com versão `config/` — e estado do portão

| Caminho                                  | Propósito                                                                                                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `i18n.json` / `i18n-schema.json`         | Localidades suportadas (fonte da contagem de localidade) e seu esquema                                                                                 |
| `payloadRules.json`                      | Regras de carga útil upstream (`open-sse/services/payloadRules.ts`)                                                                                    |
| `cli-tools-manifest.json`                | Manifesto de ferramentas CLI integráveis (`bin/cli/cli-manifest.mjs`)                                                                                  |
| `alibaba-free-tier-allowlist.json`       | Lista de permissões do modelo de nível gratuito Alibaba                                                                                                |
| `ci/toolchain.json`                      | versões do conjunto de ferramentas CI                                                                                                                  |
| `quality/quality-baseline.json`          | Linha de base da catraca multimétrica (cobertura, avisos, duplicação, …)                                                                               |
| `quality/*-baseline.json`                | Linhas de base congeladas para portas individuais (complexidade, duplicação, tamanho de arquivo, fatias de verificação de tipo, descoberta de teste,…) |
| `quality/*-allowlist.json`               | Listas de permissões de acesso (dependências, licenças, atribuição AI, testes de irmãos esquecidos,…)                                                  |
| `quality/eslint-suppressions.json`       | Supressões ESLint congeladas aplicadas por `npm run lint`                                                                                              |
| `quality/gate-manifest.json`             | Manifesto do portão verificado pelo `scripts/quality/gate-manifest.mjs`                                                                                |
| `quality/vitest-exclusions.json`         | Inventário de quarentena para `vitest.quarantine.config.ts`                                                                                            |
| `quality/skill-templates/`               | Modelos canônicos SKILL.md verificados pelo `scripts/quality/check-skill-contract.mjs`                                                                 |
| `quality/release-acceptance.schema.json` | Esquema de evidência de aceitação de liberação — consulte [QUALITY_EVIDENCE_CONTRACT.md](QUALITY_EVIDENCE_CONTRACT.md)                                 |
| `release/`                               | Reconciliações do changelog e manifesto nativo wreq-js, inventário de licenças e avisos                                                                |

## fragmentos do log de alterações `changelog.d/` —

Um PR adiciona um fragmento em vez de editar `CHANGELOG.md`: `features/`, `fixes/` ou `maintenance/`, denominado `<PR-number>-<slug>.md`. No momento do lançamento, `scripts/release/aggregate-changelog.mjs` os dobra em `CHANGELOG.md` e os exclui; `npm run check:changelog-integrity` os valida. Detalhes em `changelog.d/README.md`.

---

## documentação pública `docs/` —

As seções listadas em `source.config.ts` são compiladas no site `/docs` (excluindo algumas páginas de segurança exclusivas para operadores); `docs/meta.json` define a ordem da barra lateral. Comece em [README.md](../README.md).

| Caminho                  | Conteúdo                                                                                                                                                              |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getting-started/`       | Início rápido, auto-hospedagem, provedores, níveis gratuitos, Auto-Combo e guias de cookies da web                                                                    |
| `guides/`                | Guias do operador e do desenvolvedor: configuração, Docker, Electron, PWA, Termux, CLIs, i18n, solução de problemas, guia do usuário                                  |
| `architecture/`          | Arquitetura, referência de base de código, receitas de modificação, autorização, resiliência, portas de qualidade, sistema de design, este mapa                       |
| `reference/`             | referência API, variáveis de ambiente, sinalizadores de recursos, ferramentas CLI, níveis gratuitos, referência de provedor gerada, provedores removidos              |
| `frameworks/`            | MCP, A2A, ACP, habilidades, memória, plug-ins, agentes de nuvem, webhooks, avaliações, exportação de log, Radar, Playground,…                                         |
| `routing/`               | Auto-Combo, raciocínio replay/routing, cota compartilhada, escada de assinatura, custo zero estrito,…                                                                 |
| `security/`              | Guardrails, sanitização de erros, CORS, SSO, política de saída, níveis de proteção de rota, cadeia de suprimentos,…                                                   |
| `compression/`           | Guia de compactação, mecanismos, RTK, formato de regras, pacotes de idiomas, edição de contexto                                                                       |
| `ops/`                   | Fluxo de liberação, ramificação, trem de mesclagem, implantação (VM, Fly.io, Kubernetes), banco de dados, proxies, árvores de trabalho, detalhes de regras rígidas    |
| `providers/`             | Guias por provedor (Claude Code, ChatGPT Web, Cursor, GitHub Copilot,…)                                                                                               |
| `comparison/`            | OmniRoute comparado com alternativas                                                                                                                                  |
| `integrations/`          | Notas de integração (fal.ai nativo, MarkItDown MCP); não compilado em `/docs`                                                                                         |
| `openapi.yaml`           | fonte OpenAPI ; alimenta `src/app/docs/lib/openapi.generated.ts`, `public/openapi.yaml` e `bin/cli/api-commands/`                                                     |
| `diagrams/`              | Fontes sereia (`.mmd`), SVGs renderizado (`exported/`) e README SVGs de `scripts/docs/gen-readme-*`                                                                   |
| `assets/`                | Sinalizador de idioma SVGs e outros ativos README                                                                                                                     |
| `screenshots/`           | Capturas de tela usadas pelo README e guias                                                                                                                           |
| `i18n/`                  | Mirrors traduzidos: uma pasta por localidade (66) com documentos raiz e um subconjunto `docs/` ; produzido por `npm run i18n:run` — veja [I18N.md](../guides/I18N.md) |
| `*.md` de nível superior | `README.md` (índice de documentos), `DEVELOPER-ENVIRONMENT.md` e algumas notas independentes                                                                          |

Principais pontos de entrada: [ARCHITECTURE.md](ARCHITECTURE.md), [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md), [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md), [ENVIRONMENT.md](../reference/ENVIRONMENT.md), [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) (gerado por `npm run gen:provider-reference`).

---

## conjuntos de testes `tests/` —

Cerca de 9.670 arquivos rastreados. Os arquivos de teste pertencem aqui, não na raiz do projeto. Exceções: as pastas `__tests__/` co-localizadas em `src/` e `open-sse/` que as configurações Vitest coletam.

| Caminho                                                | Conteúdo                                                                                                                                                                                         | Corredor                                                                                |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `tests/unit/`                                          | Testes unitários (mais de 9.000 arquivos): muitos de nível superior, além de pastas de domínio (`ui/`, `compression/`, `build/`, `guardrails/`, `db/`, `cli/`, `api/`, `dashboard/`, `combo/`,…) | Executor de teste de nó (`npm run test:unit`); `*.tsx` via `test:vitest:ui`             |
| `tests/unit/serial/`                                   | Testes sensíveis à CPU são executados com simultaneidade 1                                                                                                                                       | `npm run test:unit:serial`                                                              |
| `tests/unit/autoCombo/`, `tests/unit/api/**/*.spec.ts` | suítes Vitest dentro da árvore de unidades                                                                                                                                                       | `npm run test:vitest`                                                                   |
| `tests/integration/`                                   | Testes de integração multimódulo e DB ; `combo-matrix/`, `combo-live/`, `services/`                                                                                                              | `npm run test:integration`, `test:combo:matrix`, `test:combo:live`, `test:services:int` |
| `tests/e2e/`                                           | Playwright `*.spec.ts` + suítes ao vivo `ecosystem.test.ts`, `protocol-clients.test.ts`                                                                                                          | `npm run test:e2e`, `test:ecosystem`, `test:protocols:e2e`                              |
| `tests/boundary/`                                      | `*.live.test.ts` contra uma instância em execução                                                                                                                                                | `npm run test:boundary:live`                                                            |
| `tests/homolog/`                                       | Conjuntos de homologação (`api/`, `ui/` com sua própria configuração Playwright )                                                                                                                | `npm run homolog` — veja [HOMOLOGATION.md](../ops/HOMOLOGATION.md)                      |
| `tests/load/`                                          | Carregar e absorver scripts (k6)                                                                                                                                                                 | Fluxo de trabalho de resiliência noturno                                                |
| `tests/_setup/`                                        | arquivos `--import` / setup (diretório de dados isolado, proteção de saída, Vitest UI polyfills)                                                                                                 | Carregado pelos corredores                                                              |
| `tests/_helpers/`, `tests/helpers/`                    | Auxiliares de teste compartilhados (golden snapshots, sessão de gerenciamento,…)                                                                                                                 | Importado por testes                                                                    |
| `tests/fixtures/`                                      | Dados de fixture e fixtures de processo filho                                                                                                                                                    | Importado por testes                                                                    |
| `tests/snapshots/`                                     | Arquivos dourados para `tests/helpers/goldenSnapshot.ts`                                                                                                                                         | Importado por testes                                                                    |
| `tests/manual/`                                        | arquivos `.http` para chamadas REST manuais                                                                                                                                                      | Manual                                                                                  |
| `tests/security/`                                      | Scripts de shell de segurança                                                                                                                                                                    | Dispositivos manuais/de teste unitário                                                  |
| `tests/types/`                                         | Dispositivos contratuais de nível de tipo                                                                                                                                                        | —                                                                                       |

Matriz completa: `CONTRIBUTING.md` → "Executando testes" e [COVERAGE_PLAN.md](../ops/COVERAGE_PLAN.md).

---

## `deploy/` — Kubernetes

| Caminho                                            | Propósito                                                                                                       |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `deploy/helm/omniroute/`                           | Gráfico Helm (`Chart.yaml`, `values.yaml`, modelos para implantação, serviço, entrada, PVC, segredo, configmap) |
| `deploy/kubernetes/base/`                          | Base Kustomize (namespace, implantação, serviço, PVC, configmap, `secret.example.yaml`)                         |
| `deploy/kubernetes/overlays/k3s/`, `overlays/k8s/` | Sobreposições específicas de cluster (entrada, classe de armazenamento, recursos, sondagens)                    |

Veja [KUBERNETES_DEPLOYMENT_GUIDE](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md)

## imagens auxiliares `docker/` —

| Caminho                             | Propósito                                                                                                                               |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `docker/chatgpt-web-codex-browser/` | Imagem do navegador sem cabeça com um proxy CDP para o executor da Web ChatGPT — consulte [CHATGPT_WEB.md](../providers/CHATGPT_WEB.md) |
| `docker/devin-bridge/`              | imagem da ponte Devin, arquivo de composição, simulações e proteção de rede                                                             |
| `docker/vnc-browser/`               | Chromium com VNC para sessões interativas de navegador                                                                                  |

A imagem principal é a raiz `Dockerfile`; veja [DOCKER_GUIDE](../guides/DOCKER_GUIDE.md)

## receitas da comunidade `contrib/` — (não suportadas oficialmente)

| Caminho                 | Propósito                                                                                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contrib/podman/`       | Quadlets Podman (contêiner, volume, rede, Redis)                                                                                                          |
| `contrib/vps/`          | VPS `compose.yaml` + `.env.example`                                                                                                                       |
| `contrib/windows/`      | lançadores `.bat` para execução a partir de um checkout Windows                                                                                           |
| `contrib/session-sync/` | README para uma extensão de navegador de sincronização de sessão de terceiros — consulte [SESSION-SYNC-EXTENSION.md](../guides/SESSION-SYNC-EXTENSION.md) |

## `examples/`

| Caminho                         | Propósito                                                                    |
| ------------------------------- | ---------------------------------------------------------------------------- |
| `examples/omniroute-cmd-hello/` | Plugin de comando mínimo — veja [PLUGINS.md](../frameworks/PLUGINS.md)       |
| `examples/plugins/`             | Plug-ins de exemplo: langfuse, request-logger, theme-manager, Welcome-banner |
| `examples/quickstart/`          | Trechos de cliente: curl, Node.js (axios), PHP, Python                       |

---

## integração `.github/` — GitHub

| Caminho                                                      | Propósito                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`                                         | CI (`ci.yml`, `quality.yml`, `build.yml`), verificações de segurança (`codeql.yml`, `semgrep.yml`, `scorecard.yml`, `dast-smoke.yml`), suítes `nightly-*.yml` agendadas, publicação (`npm-publish.yml`, `docker-publish.yml`, `electron-release.yml`), fluxos de trabalho de liberação e manutenção |
| `.github/actions/npm-ci-retry/`                              | Ação composta: `npm ci` com cache e nova tentativa                                                                                                                                                                                                                                                  |
| `.github/actions/prepare-unit-storage/`                      | Ação composta: libera espaço em disco do executor e instala dependências                                                                                                                                                                                                                            |
| `.github/ISSUE_TEMPLATE/`                                    | Formulários de problemas de bugs, recursos e cobertura de testes                                                                                                                                                                                                                                    |
| `.github/pull_request_template.md`, `PULL_REQUEST_TEMPLATE/` | Modelo PR padrão mais variantes bugfix/feature                                                                                                                                                                                                                                                      |
| `.github/CODEOWNERS`, `FUNDING.yml`, `dependabot.yml`        | Proprietários de código, links de patrocínio, atualizações de dependências                                                                                                                                                                                                                          |
| `.github/labels.yml`                                         | Definições de rótulo aplicadas por `npm run labels:sync`                                                                                                                                                                                                                                            |
| `.github/copilot-instructions.md`                            | instruções GitHub Copilot (uma superfície de instrução do agente)                                                                                                                                                                                                                                   |

Mapa de tarefas CI : [QUALITY_GATES.md](QUALITY_GATES.md).

## ganchos `.husky/` — git

| Arquivo      | Propósito                                                                                                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pre-commit` | Verificação de identidade Git, lint-staged, manifesto de portão, sincronização de documentos, qualquer orçamento, catraca de escala de tipo, artefatos rastreados e verificações de snapshot do kit de interface do usuário |
| `commit-msg` | `scripts/check/check-ai-attribution.mjs` na mensagem de commit                                                                                                                                                              |
| `pre-push`   | Intencionalmente leve: uma verificação de sanidade PATH/npm que sai de 0                                                                                                                                                    |

O tempo de execução do gancho no `.husky/_/` é gerado na instalação e não é rastreado.

---

## Dicas de navegação

- **Novo contribuidor?** `CONTRIBUTING.md` → `AGENTS.md` → [ARCHITECTURE.md](ARCHITECTURE.md) → [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md).
- **Mudando algo comum** (provedor, rota, módulo DB, ferramenta MCP, habilidade A2A )? Siga [MODIFICATION_SCENARIOS](MODIFICATION_SCENARIOS.md)
- **Adicionando um provedor?** Verifique [REMOVED_PROVIDERS.md](../reference/REMOVED_PROVIDERS.md) primeiro e, em seguida, verifique [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md).
- **Executando localmente?** [SETUP_GUIDE.md](../guides/SETUP_GUIDE.md).
- **Implantando?** [DOCKER_GUIDE](../guides/DOCKER_GUIDE.md), [SELF_HOST_GUIDE](../getting-started/SELF_HOST_GUIDE.md), [VM_DEPLOYMENT_GUIDE](../ops/VM_DEPLOYMENT_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [KUBERNETES_DEPLOYMENT_GUIDE](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md)
- **Liberando?** [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md).
- **Um portão de qualidade falhou?** [QUALITY_GATES](QUALITY_GATES.md) e [QUALITY_GATE_PLAYBOOK](../ops/QUALITY_GATE_PLAYBOOK.md)
