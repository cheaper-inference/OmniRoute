# Repository Map (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Hvad bor hvor: hver sporet mappe på øverste niveau og rodfil med et enkelt-linje formål.** Sidst opdateret: 2026-11-13 (OmniRoute v3.8.54)
>
> Brug dette kort til at finde rundt i kodebasen, og følg derefter linkene til de dedikerede dokumenter. Filantal blev målt med `git ls-files` på ovenstående dato. De ændrer sig med næsten hver udgivelse, så behandl dem som størrelsesordener.

## Træ på øverste niveau

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

Lokale, genererede eller private stier (alle gitignored, aldrig forpligtet, ikke beskrevet yderligere):

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

## Root-filer

Alle sporede filer ved lagerroden (`git ls-files | grep -v /`), grupperet efter funktion.

### Projektdokumentation

| Fil                      | Formål                                                                      |
| ------------------------ | --------------------------------------------------------------------------- |
| `README.md`              | Landingsside: funktionsoversigt, hurtig start, installationsmetoder         |
| `CHANGELOG.md`           | Ændringslog pr. udgivelse (fragmenter fra `changelog.d/` er foldet ind her) |
| `ROADMAP.md`             | Offentlig køreplan                                                          |
| `LICENSE`                | MIT licens                                                                  |
| `THIRD_PARTY_NOTICES.md` | Meddelelser om bundtet tredjepartskode (for eksempel wreq-js-bindingerne)   |
| `CONTRIBUTING.md`        | Bidragyderguide: opsætning, konventionelle commits, testmatrix, PR flow     |
| `SECURITY.md`            | Sårbarhedsrapporteringspolitik                                              |
| `CODE_OF_CONDUCT.md`     | Forventninger til fællesskabets adfærd                                      |
| `llm.txt`                | Projektoversigt i almindelig tekst for LLM crawlere og assistenter          |

### AI-assistent instruktioner

| Fil         | Formål                                                                                        |
| ----------- | --------------------------------------------------------------------------------------------- |
| `AGENTS.md` | En enkelt kilde til sandhed for hver AI assistent: konventioner, kvalitetsporte, hårde regler |
| `CLAUDE.md` | Claude Kode-specifikke deltaer; importerer `AGENTS.md`                                        |
| `GEMINI.md` | Gemini-specifikke deltaer; peger tilbage på `AGENTS.md`                                       |

Indlejrede guider findes også ved siden af den kode, de beskriver: `open-sse/services/AGENTS.md` og `src/lib/db/AGENTS.md`.

### Pakkemanifester og Node-værktøjskæde

| Fil                        | Formål                                                                              |
| -------------------------- | ----------------------------------------------------------------------------------- |
| `package.json`             | npm-manifest: scripts, afhængigheder, `engines`, `workspaces`, publiceret `files`   |
| `package-lock.json`        | Låst afhængighedstræ                                                                |
| `pnpm-workspace.yaml`      | pnpm-arbejdsområdeliste (`packages/*`, `open-sse`) og native-build-tilladelsesliste |
| `.npmrc` / `.npmignore`    | npm-konfiguration og udgiv ekskluderinger                                           |
| `.node-version` / `.nvmrc` | Nodeversionsstifter til versionsadministratorer                                     |
| `flake.nix` / `flake.lock` | Nix dev shell og dens lås                                                           |
| `Makefile`                 | `make` -genveje, der uddelegerer til npm-scripts                                    |

### TypeScript, Next.js og docs build

| Fil                                       | Formål                                                                        |
| ----------------------------------------- | ----------------------------------------------------------------------------- |
| `tsconfig.json`                           | Base TypeScript config og sti aliaser (`@/*`, `@omniroute/open-sse`)          |
| `tsconfig.typecheck-core.json`            | `npm run typecheck:core` skive                                                |
| `tsconfig.typecheck-noimplicit-core.json` | `npm run typecheck:noimplicit:core` (streng `noImplicitAny`) skive            |
| `tsconfig.typecheck-api.json`             | API-rute typecheck udsnit (`scripts/check/check-api-typecheck.mjs`)           |
| `tsconfig.typecheck-dashboard.json`       | Dashboard typecheck udsnit (`npm run check:dashboard-typecheck`)              |
| `tsconfig.build.json`                     | Produktionstypekontrol (`npm run typecheck:build`, `check:build-typecheck`)   |
| `tsconfig.mitm.json`                      | MITM build config brugt af `scripts/build/buildMitm.mjs`                      |
| `next.config.mjs`                         | Next.js 16 config (standalone output, build-profil aliaser)                   |
| `source.config.ts`                        | Fumadocs `defineDocs` config: hvilke `docs/` sektioner kompilerer til `/docs` |
| `postcss.config.mjs`                      | PostCSS / Tailwind rørledning                                                 |

### Lint og formatering

| Fil                                       | Formål                                                                                                       |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `eslint.config.mjs`                       | Main ESLint flat config (`npm run lint`, med `config/quality/eslint-suppressions.json`)                      |
| `eslint.complexity-ratchets.config.mjs`   | Standalone konfiguration, der bruges af skralderne for kompleksitet og kognitiv kompleksitet i én ESLint pas |
| `eslint.complexity.config.mjs`            | Standalone konfiguration med kun kerne `complexity` + `max-lines-per-function` (bruges af test)              |
| `prettier.config.mjs` / `.prettierignore` | Prettier regler og undtagelser                                                                               |
| `.editorconfig`                           | Editorstandarder (indrykning med 2 mellemrum)                                                                |
| `.markdownlint.json`                      | Rådgivende markdown fnug (`npm run lint:md`)                                                                 |
| `.vale.ini`                               | Rådgivende prosa lint (`npm run lint:prose`), ordforråd i `.vale/`                                           |

### Tests, evaluering og dækning

| Fil                           | Formål                                                                                          |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| `vitest.config.ts`            | jsdom Vitest suite: `npm run test:vitest:ui` (dashboard `.tsx`, kroge, memory/skills tests)     |
| `vitest.mcp.config.ts`        | Node Vitest suite: `npm run test:vitest` (MCP server, autoCombo, combo, API `.spec.ts`)         |
| `vitest.quarantine.config.ts` | Kører de filer i karantæne, der er angivet i `config/quality/vitest-exclusions.json`            |
| `vitest.e2e-live.config.ts`   | Live-server Vitest suiter (`tests/e2e/ecosystem.test.ts`, `tests/e2e/protocol-clients.test.ts`) |
| `playwright.config.ts`        | Playwright E2E (`tests/e2e/**/*.spec.ts`, `npm run test:e2e`)                                   |
| `stryker.conf.mjs`            | Stryker mutationstest (`npm run test:mutation`; beregner `tap.testFiles` fra `mutate`)          |
| `stryker.disablebail.mjs`     | Stryker-variant uden kaution, til test-redundansmåling                                          |
| `promptfooconfig.yaml`        | promptfoo LLM-sikkerhedspakke                                                                   |
| `codecov.yml`                 | Indstillinger for Codecov patch-dækning                                                         |

### Docker og udrulning

| Fil                               | Formål                                                                              |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `Dockerfile`                      | Flertrinsbillede (`builder` → `runner-base` → `runner-web` / `runner-cli*`)         |
| `Dockerfile.bun`                  | Alternativt billede på Bun runtime (bygget af `docker-publish.yml`)                 |
| `docker-compose.yml`              | Standardkomponering med profiler (base, web, cli, vært, hukommelse, cliproxyapi, …) |
| `docker-compose.prod.yml`         | Separat produktions-snapshot-instans på port 20130                                  |
| `docker-compose.selfhost.yml`     | En-kommando loopback selvvært (par med `.env.selfhost.example`)                     |
| `docker-compose.ollama-local.yml` | Docker OmniRoute taler med en værtsindfødt Ollama                                   |
| `.dockerignore`                   | Docker build-kontekst ekskluderinger                                                |
| `fly.toml`                        | Fly.io app config (port 20128, `/data` volumen)                                     |

### Sikkerheds-, forsyningskæde- og repository-bots

| Fil                                          | Formål                                                                           |
| -------------------------------------------- | -------------------------------------------------------------------------------- |
| `.gitleaks.toml`                             | gitleaks hemmelige scanningsregler og tilladelseslister                          |
| `.trivyignore`                               | Accepteret risikoundertrykkelse for beholderbilledescanningen                    |
| `.zizmor.yml`                                | zizmor GitHub Handlinger security-audit config                                   |
| `socket.yml`                                 | Socket.dev app config (sti ignorerer; ikke en CI gate)                           |
| `sonar-project.properties`                   | SonarQube/SonarCloud projekt konfiguration                                       |
| `knip.json`                                  | Knip ubrugt files/exports/deps config (feeds `npm run check:dead-code`)          |
| `.size-limit.json`                           | Budgetter i bundtstørrelse                                                       |
| `.mergify.yml`                               | Mergify merge-queue config                                                       |
| `.coderabbit.yaml`                           | CodeRabbit review config                                                         |
| `.cbmignore`                                 | Ignorer listen for codebase-memory-mcp kodeindekset                              |
| `.gitignore` / `.gitattributes` / `.mailmap` | Ignorer regler, LF linjeafslutninger for scripts, kanoniske forfatteridentiteter |

### Miljøskabeloner, tilstand og feeds

| Fil                         | Formål                                                                             |
| --------------------------- | ---------------------------------------------------------------------------------- |
| `.env.example`              | Skabelon kopieret til `.env` ved første installation; referenceliste over env vars |
| `.env.selfhost.example`     | Skabelon til `docker-compose.selfhost.yml`                                         |
| `.env.homolog.example`      | Skabelon til homologeringsløberen (`npm run homolog`)                              |
| `.env.devin-bridge.example` | Eksempel på env-fil til Devin bridge-opsætningen                                   |
| `.i18n-state.json`          | Inkrementel oversættelsestilstand (kildehashes pr. dokument og landestandard)      |
| `news.json`                 | Lokaliseret meddelelsesfeed (skema v2) læst af betjeningspanelet                   |

---

## `src/` — Next.js applikation

Omkring 4.550 sporede filer. Sti alias `@/*` → `src/*`.

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

### `src/app/` — App Router

| Sti                                                                 | Formål                                                                                                                                                                                                    |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                       | Offentlig OpenAI-kompatibel API: chat, fuldførelser, svar, beskeder, indlejringer, billeder, lyd, videoer, musik, omrangering, moderering, søgning, filer, batches, ws, modeller, …                       |
| `app/api/v1beta/`                                                   | Slutpunkter i Gemini-stil                                                                                                                                                                                 |
| `app/api/` (andre mapper)                                           | Administrations- og administrationsruter: udbydere, kombinationer, indstillinger, nøgler, brug, logfiler, mcp, a2a, acp, hukommelse, færdigheder, evals, webhooks, tunneler, plugins, radar, værktøjer, … |
| `app/api/tools/agent-bridge/`                                       | AgentBridge REST API — se [AGENTBRIDGE.md](../frameworks/AGENTBRIDGE.md)                                                                                                                                  |
| `app/api/tools/traffic-inspector/`                                  | Trafikinspektør REST API — se [TRAFFIC_INSPECTOR.md](../frameworks/TRAFFIC_INSPECTOR.md)                                                                                                                  |
| `app/(dashboard)/dashboard/`                                        | Én mappe pr. dashboardsektion (udbydere, kombinationer, logfiler, brug, omkostninger, cache, komprimering, hukommelse, legeplads, søgeværktøjer, indstillinger, værktøjer, …)                             |
| `app/(dashboard)/home/`                                             | Startskærmen og dens widgets                                                                                                                                                                              |
| `app/docs/`                                                         | Dokumentfremviser, der gengiver Fumadocs-sektionerne opført i `source.config.ts`                                                                                                                          |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`          | Rodlayout, root-indtastning (omdirigeringer), PWA -manifest, global CSS                                                                                                                                   |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx` | Fejlgrænser og tilbagefald                                                                                                                                                                                |

API -ruter følger `Route → CORS → Zod validation → optional auth → policy → handler`; se [ARCHITECTURE.md](ARCHITECTURE.md) og [API_REFERENCE.md](../reference/API_REFERENCE.md).

### `src/lib/` — serverbiblioteker

Omtrent 90 undermapper plus omkring 90 moduler på øverste niveau. Hovedgrupper:

| Areal                             | Mapper / filer                                                                                                      | Dybt dyk                                                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Database                          | `db/` — domænemoduler, `migrations/`, `adapters/`, `repositories/`, `migrationRunner/`                              | [`src/lib/db/AGENTS.md`](../../src/lib/db/AGENTS.md), [DATABASE_GUIDE.md](../ops/DATABASE_GUIDE.md)                                         |
| Brug, kvote og forbrug            | `usage/`, `quota/`, `spend/`                                                                                        | [QUOTA_SHARE.md](../routing/QUOTA_SHARE.md), [COST_TRACKING.md](../guides/COST_TRACKING.md)                                                 |
| Udbydere og modeller              | `providers/`, `providerModels/`, `modelValidation/`, `catalog/`, `radar/`, `freeProxyProviders/`                    | [RADAR.md](../frameworks/RADAR.md), [MODEL-VALIDATION.md](../guides/MODEL-VALIDATION.md)                                                    |
| OAuth og legitimationsoplysninger | `oauth/` (udbydere/, services/, utils/), `zed-oauth/`, `copilot/`, `cursor/`, `credentialHealth/`                   | `resolvePublicCred()` (operatørdokument, ikke vist offentligt)                                                                              |
| Sikkerhed og styring              | `guardrails/`, `compliance/`, `pii/`, `security/`                                                                   | [GUARDRAILS.md](../security/GUARDRAILS.md), [COMPLIANCE.md](../security/COMPLIANCE.md)                                                      |
| Agent funktioner                  | `a2a/`, `acp/`, `cloudAgent/`, `memory/`, `skills/`, `agentSkills/`                                                 | [AGENT_PROTOCOLS_GUIDE](../frameworks/AGENT_PROTOCOLS_GUIDE.md), [MEMORY.md](../frameworks/MEMORY.md), [SKILLS.md](../frameworks/SKILLS.md) |
| Plugins og tjenester              | `plugins/`, `services/` (embedded-service installatører og supervisor)                                              | [PLUGINS.md](../frameworks/PLUGINS.md), [EMBEDDED-SERVICES.md](../frameworks/EMBEDDED-SERVICES.md)                                          |
| Routing og robusthed              | `combos/`, `routing/`, `resilience/`, `reasoningRouting/`, `promptCache/`                                           | [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                                                  |
| Fuldmagter og netværk             | `proxyHealth/`, `proxySubscription/`, `proxyRelay/`, `proxyEvents/`, tunnelmoduler                                  | [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md), [TUNNELS_GUIDE.md](../ops/TUNNELS_GUIDE.md)                                                        |
| Job og planlægning                | `jobs/`, `jobRegistry/`, `warmupScheduler/`                                                                         |                                                                                                                                             |
| Observerbarhed og eksport         | `monitoring/`, `logExport/`, `webhooks/`, `audit/`, `events/`                                                       | [LOG-EXPORT.md](../frameworks/LOG-EXPORT.md), [WEBHOOKS.md](../frameworks/WEBHOOKS.md)                                                      |
| CLI og IDE integration            | `cliTools/`, `cli-helper/`, `vscode/`, `inspector/`, `versionManager/`                                              | [CLI-TOOLS.md](../reference/CLI-TOOLS.md), [VSCODE-COPILOT.md](../guides/VSCODE-COPILOT.md)                                                 |
| Kontekstkilder                    | `localCorpus/`, `notion/`, `obsidian/`                                                                              | [LOCAL_CORPUS_CONTEXT.md](../frameworks/LOCAL_CORPUS_CONTEXT.md)                                                                            |
| Andre funktioner                  | `evals/`, `playground/`, `gamification/`, `telegram/`, `conductor/`, `batches/`, `deploy/`, `transfer/`, `sync/`, … | [EVALS.md](../frameworks/EVALS.md), [PLAYGROUND_STUDIO.md](../frameworks/PLAYGROUND_STUDIO.md)                                              |

Top-niveau moduler værd at vide:

| Fil                                                            | Formål                                                                   |
| -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `cacheLayer.ts`, `idempotencyLayer.ts`, `semanticCache.ts`     | Responscaching og idempotens                                             |
| `webhookDispatcher.ts`                                         | HMAC-signeret webhook levering                                           |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts` | Tunnelledere                                                             |
| `tokenHealthCheck*.ts`, `tokenRefreshCircuit.ts`               | Sundhedstjek af baggrundslegitimationsoplysninger og opdateringskredsløb |
| `streamingPiiTransform.ts`, `streamingCredentialTransform.ts`  | Streaming af desinfektionsmidler                                         |
| `gracefulShutdown.ts`, `serverLifecycle.ts`                    | Proces livscyklus                                                        |
| `*.stub.ts`                                                    | Build-profil stubbe byttet ind med aliaser i `next.config.mjs`           |

### `src/lib/db/` — database

| Sti                   | Formål                                                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`          | `getDbInstance()` singleton (WAL journaling)                                                                                 |
| `db/migrations/`      | Nummererede, idempotente `.sql` -migreringer (236 filer i skrivende stund; `check-migration-numbering.mjs` -vagtnummerering) |
| `db/migrationRunner/` | Migrationsløber                                                                                                              |
| `db/adapters/`        | SQLite driver adaptere (better-sqlite3, node:sqlite, bun:sqlite, sql.js)                                                     |
| `db/repositories/`    | SQLite -depotimplementeringer (kombinationer, legepladsforudindstillinger, routingkonfiguration)                             |
| `db/<domain>.ts`      | Omkring 175 domænemoduler (udbydere, kombinationer, apiKeys, indstillinger, brug, …) — importerer altid disse direkte        |

### `src/domain/`, `src/server/`, `src/shared/`

| Sti                                                            | Formål                                                                                                                                              |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain/policyEngine.ts`                                       | Politik motor                                                                                                                                       |
| `domain/fallbackPolicy.ts`, `lockoutPolicy.ts`, `costRules.ts` | Fallback-beslutninger, lockoutpolitik, omkostningsregler                                                                                            |
| `domain/quotaCache*.ts`, `quotaSnapshot*.ts`                   | Kvotecache og øjebliksbilledepersistens                                                                                                             |
| `domain/assessment/`                                           | Modelvurdering (bedømmer, kategoriserer, selvhelbredende)                                                                                           |
| `server/authz/`                                                | Autorisationspipeline og rutevagt (`routeGuard.ts`) — se [AUTHZ_GUIDE.md](AUTHZ_GUIDE.md), [ROUTE_GUARD_TIERS.md](../security/ROUTE_GUARD_TIERS.md) |
| `server/origin/`, `server/cors/`                               | Public/MCP/WS oprindelse opløsning og CORS — se [CORS.md](../security/CORS.md)                                                                      |
| `server/ws/`                                                   | Live dashboard WebSocket server                                                                                                                     |
| `shared/components/`                                           | Dashboard komponenter og adaptere over `packages/ui-kit` — se [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)                                                  |
| `shared/constants/`                                            | Udbyderkatalog (`providers.ts`), routingstrategier, CLI værktøjer, ikonkort, upstream-header-afvisningsliste, …                                     |
| `shared/validation/`                                           | Zod -skemaer og valideringshjælpere                                                                                                                 |
| `shared/utils/`                                                | Circuit breaker, API-nøglegodkendelse, hente timeouts, feature flag, …                                                                              |
| `shared/middleware/`, `network/`, `services/`, `hooks/`        | Chatadgangsmiddleware, netværkshjælpere, klienttjenester, React hooks                                                                               |

---

## `open-sse/` — streaming engine arbejdsområde

npm workspace `@omniroute/open-sse` (ca. 2.390 sporede filer). Det udfører anmodningsbehandlingen og udbyderens udførelse. Oversigt: [OPEN_SSE_ARCHITECTURE.md](../frameworks/OPEN_SSE_ARCHITECTURE.md).

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

| Sti                                                                                            | Formål                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combo.ts` + `combo/`                                                                          | Combo routingstrategier — se [AUTO-COMBO.md](../routing/AUTO-COMBO.md)                                                                                      |
| `autoCombo/`                                                                                   | Auto-Combo scoring og mode-pakker                                                                                                                           |
| `accountFallback.ts` + `accountFallback/`                                                      | Tilslutningsafkøling og modelspærring — se [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                       |
| `rateLimitManager.ts` + `rateLimitManager/`                                                    | Rate-limit sporing og header parsing                                                                                                                        |
| `compression/`                                                                                 | Kompressionsmotorer (`engines/`), regelpakker (`rules/`), `eval/`, `harness/`, `riskGate/` — se [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) |
| `tokenRefresh/`, `usage/`, `cache/`, `admission/`, `sessionPool/`, `codexAccount/`, `routing/` | Token-opdatering, brugsregnskab, caching, adgangsbaner, sessionspuljer, Codex konti, routing-hjælpere                                                       |
| `__tests__/`                                                                                   | Samlokaliserede Vitest suiter (samlet af Vitest konfigurationerne)                                                                                          |
| `AGENTS.md`                                                                                    | Agentguide til denne mappe                                                                                                                                  |

Mønster: et stort modul `X.ts` ved siden af en mappe `X/` betyder, at modulet blev opdelt i mindre filer (`handlers/chatCore.ts` + `handlers/chatCore/`, `services/combo.ts` + `services/combo/`).

### `open-sse/mcp-server/`

| Sti                   | Formål                                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| `server.ts`           | MCP server livscyklus                                                                          |
| `httpTransport.ts`    | Streambare HTTP og SSE -transporter                                                            |
| `scopeEnforcement.ts` | Kontrol af omfang pr. værktøj                                                                  |
| `audit.ts`            | Værktøj-opkald revisionslogning                                                                |
| `schemas/`            | Værktøjsdefinitioner og omfang                                                                 |
| `tools/`              | Værktøjsimplementeringer (hukommelse, færdigheder, komprimering, …)                            |
| `toolSearch/`         | Værktøjssøgning                                                                                |
| `README.md`           | Notater om intern arkitektur; hele kataloget er i [MCP-SERVER.md](../frameworks/MCP-SERVER.md) |

---

## `packages/` — npm-arbejdsområder

| Sti                      | Formål                                                                                                                                                                                                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit`: Sælgeret øjebliksbillede af Keak CI UI sættet, brugt som kilde. `UPSTREAM.md` pins upstream commit, `PATCHES.md` viser lokale patches. `src/` synkroniseres kun af `scripts/dev/sync-ui-kit.sh` og beskyttes af `npm run check:ui-kit-snapshot`. Se [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| `packages/browser-pool/` | `@omniroute/browser-pool`: browser-pool-grænseflader og implementering (`packages/browser-pool/src/index.ts`, `packages/browser-pool/src/interfaces.ts`). Opført i `workspaces`; runtime-browserpuljen, der bruges af gatewayen, bor i `open-sse/services/`                                                   |

## `@omniroute/` — separat offentliggjorte pakker

Disse er ikke npm-arbejdsområder. Hver har sin egen `package.json` og låsefil; mappen sendes i `omniroute` tarball (`files: ["@omniroute/"]`).

| Sti                              | Formål                                                                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `@omniroute/opencode-plugin/`    | OpenCode plugin (modelopdagelse, `/connect` auth); brugt af `omniroute setup-opencode` — se [OPENCODE.md](../frameworks/OPENCODE.md) |
| `@omniroute/opencode-plugin-v2/` | OpenCode plugin til v2 Promise API — se [OPENCODE-V2-PLUGIN.md](../guides/OPENCODE-V2-PLUGIN.md)                                     |
| `@omniroute/opencode-provider/`  | Statisk konfigurationsgenerator; markeret forældet i sin egen `package.json` til fordel for `opencode-plugin`                        |

---

## `bin/` — CLI og ops scripts

| Sti                                                                         | Formål                                                                                      |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                             | Hoved CLI -indgang (`omniroute serve`, `setup`, `doctor`, `providers`, `combo`, …)          |
| `reset-password.mjs`                                                        | `omniroute-reset-password` binær                                                            |
| `mcp-server.mjs`                                                            | MCP stdio indgangspunkt                                                                     |
| `antigravity-bridge.mjs`, `chatgpt-web-codex-mcp.mjs`                       | Hjælpebro / MCP -indgangspunkter                                                            |
| `aliasResolver.mjs`, `aliasResolverHook.mjs`                                | ESM resolve hook, der kortlægger tsconfig-stialiasser til globale installationer            |
| `nodeRuntimeSupport.mjs`                                                    | Understøttet Node.js version check                                                          |
| `snapshot-data.sh`, `restore-data.sh`, `restore-policies.sh`, `rollback.sh` | Selvvært-hændelsesgendannelsesscripts (del `_ops-common.sh`)                                |
| `cold-start-bench.sh`                                                       | Koldstart benchmark — se [PERF_BASELINE.md](../ops/PERF_BASELINE.md)                        |
| `cli/commands/`                                                             | Et modul pr. CLI -kommando (ca. 100, inklusive `setup-*` integrationerne)                   |
| `cli/api-commands/`                                                         | Genereret fra `docs/openapi.yaml` af `npm run build:cli-api` — må ikke redigeres            |
| `cli/locales/`                                                              | CLI -meddelelseskataloger (67 lokaliteter)                                                  |
| `cli/tui/`, `cli/tui-components/`                                           | Terminal UI                                                                                 |
| `cli/tray/`                                                                 | Systembakke og autostart (Windows PowerShell backend, systray på macOS/Linux)               |
| `cli/runtime/`                                                              | Native runtime resolution (`sqliteRuntime.mjs`, `magicBytes.mjs`), proces supervisor        |
| `cli/*.mjs`                                                                 | Delte hjælpere (args, API klient, data dir, kryptering, udbyderbutik, indstillingslager, …) |
| `cli/README.md`, `cli/CONVENTIONS.md`                                       | CLI internals og konventioner                                                               |

Se [CLI-TOOLS.md](../reference/CLI-TOOLS.md) og [CLI-COMPANION.md](../guides/CLI-COMPANION.md).

## `electron/` — desktop app

| Sti                                                        | Formål                                                                           |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `main.js`                                                  | Electron hovedproces (vindue, indlejret server, bakke, opdateringer)             |
| `preload.js`                                               | IPC broen udsat for rendereren                                                   |
| `lib/`                                                     | Vindues livscyklus, serverberedskab, sundhedsovervågning, fjernserverpræferencer |
| `remoteServerPrompt*.js`, `assets/remoteServerPrompt.html` | Remote-server prompt vindue                                                      |
| `processTree.js`, `sqlite-inspection.js`                   | Hjælpere til oprydning af børneprocesser og SQLite inspektion                    |
| `package.json` / `package-lock.json`                       | elektron-builder-konfiguration og Electron afhængigheder                         |
| `assets/`                                                  | App- og bakkeikoner (`.ico`, `.icns`, `.png`)                                    |
| `README.md`                                                | Interne noter — se [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)              |

## `public/` — statiske aktiver

| Sti                                         | Formål                                                                                                            |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `providers/`                                | Udbyderlogoer indlæst af id (`/providers/<id>.svg`); herkomst i `config/quality/provider-assets-provenance.jsonl` |
| `favicon.*`, `apple-touch-icon.*`, `icon-*` | Browser og PWA ikoner                                                                                             |
| `sw.js`                                     | Servicemedarbejder — se [PWA_GUIDE.md](../guides/PWA_GUIDE.md)                                                    |
| `openapi.yaml`                              | Kopi af `docs/openapi.yaml` genereret af `npm run gen:public-openapi`                                             |
| `images/`, `sponsors/`, `deyin.svg`         | Tier-flow diagrammer, sponsor banner, README kunstværk                                                            |

## `skills/` — Agentfærdigheder

46 færdigheder, en mappe hver med en `SKILL.md` (`cli-*`, `omni-*`, `config-codex-cli`, `ponytail`), plus `skills/README.md`. `src/lib/agentSkills/catalog.ts` læser dem under kørsel og eksponerer dem gennem `/api/agent-skills`, MCP og A2A. De fleste manifester genereres af `src/lib/agentSkills/generator.ts` (`scripts/skills/generate-agent-skills.mjs`; `npm run check:agent-skills-sync` kontrollerer for drift). Se [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md).

---

## `scripts/` — konstruktion, porte og værktøj

Omkring 435 sporede filer. Nye scripts går i en af undermapperne tilladt af `AGENTS.md`; engangskode går i `scripts/ad-hoc/`.

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

Ofte brugte indgangspunkter:

| Manuskript                                                          | Formål                                                                                               |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `dev/run-next.mjs`                                                  | `npm run dev` / `npm start` løber                                                                    |
| `build/build-next-isolated.mjs`                                     | `npm run build` (Next.js selvstændig build)                                                          |
| `build/prepublish.ts`                                               | `npm run build:cli`: samler npm `dist/`                                                              |
| `build/postinstall.mjs`                                             | npm `postinstall` krog                                                                               |
| `build/publicOpenApi.mjs`                                           | `npm run gen:public-openapi`                                                                         |
| `docs/gen-provider-reference.ts`                                    | `npm run gen:provider-reference` (genskaber PROVIDER_REFERENCE.md)                                   |
| `docs/gen-openapi-module.mjs`                                       | `prebuild:docs` (genererer `src/app/docs/lib/openapi.generated.ts`)                                  |
| `i18n/run-translation.mjs`                                          | `npm run i18n:run` (dokumenter spejle)                                                               |
| `i18n/generate-route-namespaces.mjs`                                | `npm run gen:i18n-routes`                                                                            |
| `release/aggregate-changelog.mjs`                                   | Folder `changelog.d/` -fragmenter til `CHANGELOG.md`                                                 |
| `check/check-fabricated-docs.mjs`                                   | `npm run check:fabricated-docs` (doc nøjagtighedsport)                                               |
| `check/check-tracked-artifacts.mjs`                                 | `npm run check:tracked-artifacts` (blokerer sporede `_*` rodstier)                                   |
| `quality/check-quality-ratchet.mjs`                                 | `npm run quality:ratchet` (metrisk skralde mod `config/quality/`)                                    |
| `dev/run-playwright-tests.mjs`                                      | `npm run test:e2e`                                                                                   |
| `dev/run-protocol-clients-tests.mjs`, `dev/run-ecosystem-tests.mjs` | `npm run test:protocols:e2e`, `npm run test:ecosystem`                                               |
| `dev/new-worktree.sh`                                               | Opretter et isoleret udviklingsarbejdstræ — se [WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md) |
| `dev/sync-ui-kit.sh`                                                | Synkroniserer `packages/ui-kit/src` med en fastgjort upstream-commit                                 |

Gatebeholdning og politikker: [QUALITY_GATES.md](QUALITY_GATES.md).

## `config/` — versioneret konfiguration og gate-tilstand

| Sti                                      | Formål                                                                                                                  |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `i18n.json` / `i18n-schema.json`         | Understøttede lokaliteter (kilde til lokalitetsantal) og deres skema                                                    |
| `payloadRules.json`                      | Regler for opstrøms nyttelast (`open-sse/services/payloadRules.ts`)                                                     |
| `cli-tools-manifest.json`                | Manifest af integrerbare CLI værktøjer (`bin/cli/cli-manifest.mjs`)                                                     |
| `alibaba-free-tier-allowlist.json`       | Alibaba free-tier model tilladelsesliste                                                                                |
| `ci/toolchain.json`                      | CI værktøjskæde versioner                                                                                               |
| `quality/quality-baseline.json`          | Multimetrisk skraldebasislinje (dækning, advarsler, duplikering, …)                                                     |
| `quality/*-baseline.json`                | Frosne basislinjer for individuelle porte (kompleksitet, duplikering, filstørrelse, typecheck-udsnit, testopdagelse, …) |
| `quality/*-allowlist.json`               | Gate-tilladelseslister (afhængigheder, licenser, AI tilskrivning, tests for glemte søskende, …)                         |
| `quality/eslint-suppressions.json`       | Frosne ESLint undertrykkelser anvendt af `npm run lint`                                                                 |
| `quality/gate-manifest.json`             | Portmanifest kontrolleret af `scripts/quality/gate-manifest.mjs`                                                        |
| `quality/vitest-exclusions.json`         | Karantænebeholdning for `vitest.quarantine.config.ts`                                                                   |
| `quality/skill-templates/`               | Kanoniske SKILL.md skabeloner kontrolleret af `scripts/quality/check-skill-contract.mjs`                                |
| `quality/release-acceptance.schema.json` | Udgivelses-accept bevisskema — se [QUALITY_EVIDENCE_CONTRACT.md](QUALITY_EVIDENCE_CONTRACT.md)                          |
| `release/`                               | Ændringslogafstemninger og wreq-js native manifest, licensbeholdning og meddelelser                                     |

## `changelog.d/` — changelog fragmenter

En PR tilføjer et fragment i stedet for at redigere `CHANGELOG.md`: `features/`, `fixes/` eller `maintenance/`, kaldet `<PR-number>-<slug>.md`. Ved udgivelsestidspunktet folder `scripts/release/aggregate-changelog.mjs` dem til `CHANGELOG.md` og sletter dem; `npm run check:changelog-integrity` validerer dem. Detaljer i `changelog.d/README.md`.

---

## `docs/` — offentlig dokumentation

Sektioner, der er angivet i `source.config.ts` kompileres til `/docs` webstedet (med nogle få sikkerhedssider kun for operatører udelukket); `docs/meta.json` indstiller rækkefølgen på sidebjælken. Start ved [README.md](../README.md).

| Sti                | Indhold                                                                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getting-started/` | Hurtig start, selvvært, udbydere, gratis niveauer, Auto-Combo og web-cookie-guider                                                                         |
| `guides/`          | Operatør- og udviklervejledninger: opsætning, Docker, Electron, PWA, Termux, CLIs, i18n, fejlfinding, brugervejledning                                     |
| `architecture/`    | Arkitektur, kodebasereference, modifikationsopskrifter, authz, modstandsdygtighed, kvalitetsporte, designsystem, dette kort                                |
| `reference/`       | API -reference, miljøvariabler, featureflag, CLI værktøjer, gratis niveauer, genereret udbyderreference, fjernede udbydere                                 |
| `frameworks/`      | MCP, A2A, ACP, færdigheder, hukommelse, plugins, cloud-agenter, webhooks, evals, logeksport, Radar, Playground, …                                          |
| `routing/`         | Auto-Combo, ræsonnement replay/routing, kvoteandel, abonnementsstige, strenge nulomkostninger, …                                                           |
| `security/`        | Autoværn, fejlsanering, CORS, SSO, udgangspolitik, ruteafskærmningsniveauer, forsyningskæde, …                                                             |
| `compression/`     | Kompressionsguide, motorer, RTK, regelformat, sprogpakker, kontekstredigering                                                                              |
| `ops/`             | Frigivelsesflow, forgrening, flettog, implementering (VM, Fly.io, Kubernetes), database, proxyer, arbejdstræer, detaljer om hårde regler                   |
| `providers/`       | Vejledninger pr. udbyder (Claude Code, ChatGPT Web, Cursor, GitHub Copilot, …)                                                                             |
| `comparison/`      | OmniRoute sammenlignet med alternativer                                                                                                                    |
| `integrations/`    | Integrationsnoter (fal.ai native, MarkItDown MCP); ikke kompileret i `/docs`                                                                               |
| `openapi.yaml`     | OpenAPI kilde; feeds `src/app/docs/lib/openapi.generated.ts`, `public/openapi.yaml` og `bin/cli/api-commands/`                                             |
| `diagrams/`        | Havfruekilder (`.mmd`), gengivet SVGs (`exported/`) og README SVGs fra `scripts/docs/gen-readme-*`                                                         |
| `assets/`          | Sprog-flag SVGs og andre README aktiver                                                                                                                    |
| `screenshots/`     | Skærmbilleder brugt af README og guider                                                                                                                    |
| `i18n/`            | Oversatte spejle: én mappe pr. lokalitet (66) med roddokumenter og et `docs/` undersæt; produceret af `npm run i18n:run` — se [I18N.md](../guides/I18N.md) |
| topniveau `*.md`   | `README.md` (doc-indeks), `DEVELOPER-ENVIRONMENT.md` og et par enkeltstående noter                                                                         |

Vigtige indgangspunkter: [ARCHITECTURE.md](ARCHITECTURE.md), [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md), [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md), [ENVIRONMENT.md](../reference/ENVIRONMENT.md), [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) (genereret af `npm run gen:provider-reference`).

---

## `tests/` — test suiter

Omkring 9.670 sporede filer. Testfiler hører hjemme her, ikke i projektroden. Undtagelser: de co-placerede `__tests__/` mapper i `src/` og `open-sse/`, som Vitest konfigurationerne indsamler.

| Sti                                                    | Indhold                                                                                                                                                                | Løber                                                                                   |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `tests/unit/`                                          | Enhedstest (over 9.000 filer): mange på topniveau plus domænemapper (`ui/`, `compression/`, `build/`, `guardrails/`, `db/`, `cli/`, `api/`, `dashboard/`, `combo/`, …) | Node testløber (`npm run test:unit`); `*.tsx` via `test:vitest:ui`                      |
| `tests/unit/serial/`                                   | CPU-følsomme tests kører med samtidighed 1                                                                                                                             | `npm run test:unit:serial`                                                              |
| `tests/unit/autoCombo/`, `tests/unit/api/**/*.spec.ts` | Vitest suiter inde i enhedstræet                                                                                                                                       | `npm run test:vitest`                                                                   |
| `tests/integration/`                                   | Multi-modul og DB integration test; `combo-matrix/`, `combo-live/`, `services/`                                                                                        | `npm run test:integration`, `test:combo:matrix`, `test:combo:live`, `test:services:int` |
| `tests/e2e/`                                           | Playwright `*.spec.ts` + live suiter `ecosystem.test.ts`, `protocol-clients.test.ts`                                                                                   | `npm run test:e2e`, `test:ecosystem`, `test:protocols:e2e`                              |
| `tests/boundary/`                                      | `*.live.test.ts` mod en kørende instans                                                                                                                                | `npm run test:boundary:live`                                                            |
| `tests/homolog/`                                       | Homologeringssuiter (`api/`, `ui/` med sin egen Playwright -konfiguration)                                                                                             | `npm run homolog` — se [HOMOLOGATION.md](../ops/HOMOLOGATION.md)                        |
| `tests/load/`                                          | Indlæs og gennemblød scripts (k6)                                                                                                                                      | Natlig robust arbejdsgang                                                               |
| `tests/_setup/`                                        | `--import` / opsætningsfiler (isoleret data dir, egress guard, Vitest UI polyfills)                                                                                    | Belastet af løberne                                                                     |
| `tests/_helpers/`, `tests/helpers/`                    | Delte testhjælpere (gyldne øjebliksbilleder, ledelsessession, …)                                                                                                       | Importeret ved test                                                                     |
| `tests/fixtures/`                                      | Fixturdata og underordnede processer                                                                                                                                   | Importeret ved test                                                                     |
| `tests/snapshots/`                                     | Gyldne filer til `tests/helpers/goldenSnapshot.ts`                                                                                                                     | Importeret ved test                                                                     |
| `tests/manual/`                                        | `.http` filer til manuelle REST -opkald                                                                                                                                | Manuel                                                                                  |
| `tests/security/`                                      | Sikkerhedsskal-scripts                                                                                                                                                 | Manual / enhed-test armaturer                                                           |
| `tests/types/`                                         | Kontraktinventar på typeniveau                                                                                                                                         | —                                                                                       |

Fuld matrix: `CONTRIBUTING.md` → "Running Tests" og [COVERAGE_PLAN.md](../ops/COVERAGE_PLAN.md).

---

## `deploy/` — Kubernetes

| Sti                                                | Formål                                                                                                              |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `deploy/helm/omniroute/`                           | Styrediagram (`Chart.yaml`, `values.yaml`, skabeloner til implementering, service, ingress, PVC, secret, configmap) |
| `deploy/kubernetes/base/`                          | Tilpas base (navneområde, implementering, service, PVC, configmap, `secret.example.yaml`)                           |
| `deploy/kubernetes/overlays/k3s/`, `overlays/k8s/` | Klyngespecifikke overlejringer (indgang, lagerklasse, ressourcer, sonder)                                           |

Se [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

## `docker/` — hjælpebilleder

| Sti                                 | Formål                                                                                                                |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `docker/chatgpt-web-codex-browser/` | Hovedløst browserbillede med en CDP proxy til ChatGPT web-executor — se [CHATGPT_WEB.md](../providers/CHATGPT_WEB.md) |
| `docker/devin-bridge/`              | Devin brobillede, komponer-fil, håner og netværksvagt                                                                 |
| `docker/vnc-browser/`               | Chromium med VNC til interaktive browsersessioner                                                                     |

Hovedbilledet er roden `Dockerfile`; se [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md).

## `contrib/` — fællesskabsopskrifter (ikke officielt understøttet)

| Sti                     | Formål                                                                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `contrib/podman/`       | Podman-quadletter (container, volumen, netværk, Redis)                                                                        |
| `contrib/vps/`          | VPS `compose.yaml` + `.env.example`                                                                                           |
| `contrib/windows/`      | `.bat` launchers til at køre fra en Windows -kasse                                                                            |
| `contrib/session-sync/` | README for en tredjeparts session-sync browserudvidelse — se [SESSION-SYNC-EXTENSION.md](../guides/SESSION-SYNC-EXTENSION.md) |

## `examples/`

| Sti                             | Formål                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------ |
| `examples/omniroute-cmd-hello/` | Minimalt kommandoplugin. Se [PLUGINS.md](../frameworks/PLUGINS.md).            |
| `examples/plugins/`             | Eksempelplugins som langfuse, request-logger, theme-manager og welcome-banner. |
| `examples/quickstart/`          | Klienteksempler til curl, Node.js (axios), PHP og Python.                      |

---

## `.github/` — GitHub integration

| Sti                                                          | Formål                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`                                         | CI (`ci.yml`, `quality.yml`, `build.yml`), sikkerhedsscanninger (`codeql.yml`, `semgrep.yml`, `scorecard.yml`, `dast-smoke.yml`), planlagte `nightly-*.yml` suiter, udgivelse (`npm-publish.yml`, `docker-publish.yml`, `electron-release.yml`), udgivelses- og vedligeholdelsesarbejdsgange |
| `.github/actions/npm-ci-retry/`                              | Sammensat handling: `npm ci` med cache og prøv igen                                                                                                                                                                                                                                          |
| `.github/actions/prepare-unit-storage/`                      | Sammensat handling: frigør runner diskplads og installerer derefter afhængigheder                                                                                                                                                                                                            |
| `.github/ISSUE_TEMPLATE/`                                    | Formularer til fejl, funktion og testdækning                                                                                                                                                                                                                                                 |
| `.github/pull_request_template.md`, `PULL_REQUEST_TEMPLATE/` | Standard PR skabelon plus bugfix/feature varianter                                                                                                                                                                                                                                           |
| `.github/CODEOWNERS`, `FUNDING.yml`, `dependabot.yml`        | Kodeejere, sponsorlinks, afhængighedsopdateringer                                                                                                                                                                                                                                            |
| `.github/labels.yml`                                         | Etiketdefinitioner anvendt af `npm run labels:sync`                                                                                                                                                                                                                                          |
| `.github/copilot-instructions.md`                            | GitHub Copilot instruktioner (en agent-instruktions overflade)                                                                                                                                                                                                                               |

CI job kort: [QUALITY_GATES.md](QUALITY_GATES.md).

## `.husky/` — git hooks

| Fil          | Formål                                                                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pre-commit` | Git-identitetstjek, lint-stadium, gate-manifest, docs-synkronisering, ethvert budget, typeskala-ratchet, tracked-artefakter og ui-kit snapshot-tjek |
| `commit-msg` | `scripts/check/check-ai-attribution.mjs` på commit-beskeden                                                                                         |
| `pre-push`   | Med vilje lys: en PATH/npm -sindskontrol, der afslutter 0                                                                                           |

Hook runtime i `.husky/_/` genereres ved installation og spores ikke.

---

## Navigationstips

- **Ny bidragyder?** `CONTRIBUTING.md` → `AGENTS.md` → [ARCHITECTURE.md](ARCHITECTURE.md) → [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md).
- **Ændre noget almindeligt** (udbyder, rute, DB modul, MCP værktøj, A2A færdighed)? Følg [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md).
- **Vil du tilføje en udbyder?** Tjek først [REMOVED_PROVIDERS.md](../reference/REMOVED_PROVIDERS.md), og krydskryds derefter [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md).
- **Kører du lokalt?** [SETUP_GUIDE.md](../guides/SETUP_GUIDE.md).
- **Implementerer?** [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [SELF_HOST_GUIDE.md](../getting-started/SELF_HOST_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).
- **Frigive?** [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md).
- **En kvalitetsport fejlede?** [QUALITY_GATES.md](QUALITY_GATES.md) og [QUALITY_GATE_PLAYBOOK.md](../ops/QUALITY_GATE_PLAYBOOK.md).
