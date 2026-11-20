# Repository Map (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Vad bor var: varje spårad toppnivåkatalog och rotfil, med en rad syfte.** Senast uppdaterad: 2026-11-13 (OmniRoute v3.8.54)
>
> Använd den här kartan för att hitta rätt i kodbasen och följ sedan länkarna till de dedikerade dokumenten. Filantal mättes med `git ls-files` på datumet ovan. De förändras med nästan varje release, så behandla dem som storleksordningar.

## Träd på toppnivå

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

Lokala, genererade eller privata sökvägar (alla gitignorerade, aldrig engagerade, inte beskrivna ytterligare):

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

## Rotfiler

Alla spårade filer i arkivets rot (`git ls-files | grep -v /`), grupperade efter funktion.

### Projektdokumentation

| Fil                      | Ändamål                                                                      |
| ------------------------ | ---------------------------------------------------------------------------- |
| `README.md`              | Målsida: funktionsöversikt, snabbstart, installationsmetoder                 |
| `CHANGELOG.md`           | Ändringslogg per utgåva (fragment från `changelog.d/` viks in här)           |
| `ROADMAP.md`             | Offentlig färdplan                                                           |
| `LICENSE`                | MIT licens                                                                   |
| `THIRD_PARTY_NOTICES.md` | Meddelanden för paketerad tredjepartskod (till exempel wreq-js-bindningarna) |
| `CONTRIBUTING.md`        | Bidragsguide: inställning, konventionella commits, testmatris, PR -flöde     |
| `SECURITY.md`            | Sårbarhetsrapporteringspolicy                                                |
| `CODE_OF_CONDUCT.md`     | Förväntningar på samhällets beteende                                         |
| `llm.txt`                | Oformaterad projektsammanfattning för LLM sökrobotar och assistenter         |

### AI-assistent instruktioner

| Fil         | Ändamål                                                                                         |
| ----------- | ----------------------------------------------------------------------------------------------- |
| `AGENTS.md` | En enda källa till sanning för varje AI assistent: konventioner, kvalitetsgrindar, hårda regler |
| `CLAUDE.md` | Claude Code-specifika deltan; importerar `AGENTS.md`                                            |
| `GEMINI.md` | Gemini-specifika delta; pekar tillbaka på `AGENTS.md`                                           |

Kapslade guider finns också bredvid koden de beskriver: `open-sse/services/AGENTS.md` och `src/lib/db/AGENTS.md`.

### Paketmanifest och nodverktygskedja

| Fil                        | Ändamål                                                                           |
| -------------------------- | --------------------------------------------------------------------------------- |
| `package.json`             | npm-manifest: skript, beroenden, `engines`, `workspaces`, publicerade `files`     |
| `package-lock.json`        | Låst beroendeträd                                                                 |
| `pnpm-workspace.yaml`      | pnpm arbetsyta lista (`packages/*`, `open-sse`) och native-build godkännandelista |
| `.npmrc` / `.npmignore`    | npm config och publicera undantag                                                 |
| `.node-version` / `.nvmrc` | Nodversionsstift för versionshanterare                                            |
| `flake.nix` / `flake.lock` | Nix dev-skal och dess lås                                                         |
| `Makefile`                 | `make` -genvägar som delegerar till npm-skripten                                  |

### TypeScript, Next.js och docs build

| Fil                                       | Ändamål                                                                           |
| ----------------------------------------- | --------------------------------------------------------------------------------- |
| `tsconfig.json`                           | Bas TypeScript config och sökvägsalias (`@/*`, `@omniroute/open-sse`)             |
| `tsconfig.typecheck-core.json`            | `npm run typecheck:core` skiva                                                    |
| `tsconfig.typecheck-noimplicit-core.json` | `npm run typecheck:noimplicit:core` (strikt `noImplicitAny`) skiva                |
| `tsconfig.typecheck-api.json`             | API-rutt typkontrollsnitt (`scripts/check/check-api-typecheck.mjs`)               |
| `tsconfig.typecheck-dashboard.json`       | Dashboard typkontroll skiva (`npm run check:dashboard-typecheck`)                 |
| `tsconfig.build.json`                     | Produktionstypkontroll (`npm run typecheck:build`, `check:build-typecheck`)       |
| `tsconfig.mitm.json`                      | MITM build config som används av `scripts/build/buildMitm.mjs`                    |
| `next.config.mjs`                         | Next.js 16 config (fristående utdata, byggprofilalias)                            |
| `source.config.ts`                        | Fumadocs `defineDocs` config: vilka `docs/` sektioner som kompileras till `/docs` |
| `postcss.config.mjs`                      | PostCSS / Tailwind pipeline                                                       |

### Ludd och formatering

| Fil                                       | Ändamål                                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `eslint.config.mjs`                       | Main ESLint flat config (`npm run lint`, med `config/quality/eslint-suppressions.json`)                      |
| `eslint.complexity-ratchets.config.mjs`   | Fristående konfiguration som används av spärrarna för komplexitet och kognitiv komplexitet i ett ESLint pass |
| `eslint.complexity.config.mjs`            | Fristående konfiguration med bara kärnan `complexity` + `max-lines-per-function` (används av tester)         |
| `prettier.config.mjs` / `.prettierignore` | Prettier regler och undantag                                                                                 |
| `.editorconfig`                           | Redaktörens standardinställningar (indrag med två mellanslag)                                                |
| `.markdownlint.json`                      | Rådgivande markdown lint (`npm run lint:md`)                                                                 |
| `.vale.ini`                               | Rådgivande prosa lint (`npm run lint:prose`), ordförråd i `.vale/`                                           |

### Tester, utvärdering och bevakning

| Fil                           | Ändamål                                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| `vitest.config.ts`            | jsdom Vitest suite: `npm run test:vitest:ui` (instrumentpanel `.tsx`, krokar, memory/skills tester) |
| `vitest.mcp.config.ts`        | Node Vitest suite: `npm run test:vitest` (MCP server, autoCombo, combo, API `.spec.ts`)             |
| `vitest.quarantine.config.ts` | Kör filerna i karantän som anges i `config/quality/vitest-exclusions.json`                          |
| `vitest.e2e-live.config.ts`   | Live-server Vitest -sviter (`tests/e2e/ecosystem.test.ts`, `tests/e2e/protocol-clients.test.ts`)    |
| `playwright.config.ts`        | Playwright E2E (`tests/e2e/**/*.spec.ts`, `npm run test:e2e`)                                       |
| `stryker.conf.mjs`            | Stryker mutationstestning (`npm run test:mutation`; beräknar `tap.testFiles` från `mutate`)         |
| `stryker.disablebail.mjs`     | Stryker-variant utan borgen, för test-redundansmätning                                              |
| `promptfooconfig.yaml`        | promptfoo LLM-säkerhetssvit                                                                         |
| `codecov.yml`                 | Codecov patch-täckningsinställningar                                                                |

### Docker och utplacering

| Fil                               | Ändamål                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------ |
| `Dockerfile`                      | Flerstegsbild (`builder` → `runner-base` → `runner-web` / `runner-cli*`)       |
| `Dockerfile.bun`                  | Alternativ bild på Bun runtime (byggd av `docker-publish.yml`)                 |
| `docker-compose.yml`              | Standardkomponering med profiler (bas, webb, cli, värd, minne, cliproxyapi, …) |
| `docker-compose.prod.yml`         | Separat instans av produktionsögonblicksbild på port 20130                     |
| `docker-compose.selfhost.yml`     | Enkommando loopback självvärd (par med `.env.selfhost.example`)                |
| `docker-compose.ollama-local.yml` | Docker OmniRoute pratar med en värd-infödd Ollama                              |
| `.dockerignore`                   | exkludering av Docker build-kontext                                            |
| `fly.toml`                        | Fly.io app config (port 20128, `/data` volym)                                  |

### Botar för säkerhet, försörjningskedja och förvar

| Fil                                          | Ändamål                                                                  |
| -------------------------------------------- | ------------------------------------------------------------------------ |
| `.gitleaks.toml`                             | gitleaks hemliga genomsökningsregler och godkännandelistor               |
| `.trivyignore`                               | Accepterade riskundertryckningar för behållarbildsskanningen             |
| `.zizmor.yml`                                | zizmor GitHub Actions security-audit config                              |
| `socket.yml`                                 | Socket.dev app config (sökväg ignoreras; inte en CI -grind)              |
| `sonar-project.properties`                   | SonarQube/SonarCloud projektets konfiguration                            |
| `knip.json`                                  | Knip oanvänd files/exports/deps config (feeds `npm run check:dead-code`) |
| `.size-limit.json`                           | Budgetar i paketstorlek                                                  |
| `.mergify.yml`                               | Slå samman sammanslagningskökonfiguration                                |
| `.coderabbit.yaml`                           | CodeRabbit granska konfig                                                |
| `.cbmignore`                                 | Ignorera listan för kodindexet codebase-memory-mcp                       |
| `.gitignore` / `.gitattributes` / `.mailmap` | Ignorera regler, LF -radslut för skript, kanoniska författaridentiteter  |

### Miljömallar, tillstånd och flöden

| Fil                         | Ändamål                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------ |
| `.env.example`              | Mallen kopierades till `.env` vid första installationen; referenslista över env vars |
| `.env.selfhost.example`     | Mall för `docker-compose.selfhost.yml`                                               |
| `.env.homolog.example`      | Mall för homologeringslöparen (`npm run homolog`)                                    |
| `.env.devin-bridge.example` | Exempel på env-fil för Devin bridge-installationen                                   |
| `.i18n-state.json`          | Inkrementell översättningstillstånd (källhaschar per dokument och språk)             |
| `news.json`                 | Lokaliserat meddelandeflöde (schema v2) läses av instrumentpanelen                   |

---

## `src/` — Next.js applikation

Cirka 4 550 spårade filer. Sökväg alias `@/*` → `src/*`.

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

| Väg                                                                 | Ändamål                                                                                                                                                                                                |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                       | Public OpenAI-kompatibel API: chatt, kompletteringar, svar, meddelanden, inbäddningar, bilder, ljud, videor, musik, omrankning, moderering, sökning, filer, partier, ws, modeller, …                   |
| `app/api/v1beta/`                                                   | Slutpunkter i Gemini-stil                                                                                                                                                                              |
| `app/api/` (andra mappar)                                           | Hanterings- och administratörsrutter: leverantörer, kombinationer, inställningar, nycklar, användning, loggar, mcp, a2a, acp, minne, färdigheter, evals, webhooks, tunnlar, plugins, radar, verktyg, … |
| `app/api/tools/agent-bridge/`                                       | AgentBridge REST API — se [AGENTBRIDGE.md](../frameworks/AGENTBRIDGE.md)                                                                                                                               |
| `app/api/tools/traffic-inspector/`                                  | Trafikinspektör REST API — se [TRAFFIC_INSPECTOR.md](../frameworks/TRAFFIC_INSPECTOR.md)                                                                                                               |
| `app/(dashboard)/dashboard/`                                        | En mapp per instrumentpanelsektion (leverantörer, kombinationer, loggar, användning, kostnader, cache, komprimering, minne, lekplats, sökverktyg, inställningar, verktyg, …)                           |
| `app/(dashboard)/home/`                                             | Hemskärmen och dess widgets                                                                                                                                                                            |
| `app/docs/`                                                         | Dokumentvisaren som återger Fumadocs-sektionerna listade i `source.config.ts`                                                                                                                          |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`          | Rotlayout, rotpost (omdirigeringar), PWA -manifest, global CSS                                                                                                                                         |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx` | Felgränser och fallbacks                                                                                                                                                                               |

API rutter följer `Route → CORS → Zod validation → optional auth → policy → handler`; se [ARCHITECTURE.md](ARCHITECTURE.md) och [API_REFERENCE.md](../reference/API_REFERENCE.md).

### `src/lib/` — -serverbibliotek

Ungefär 90 undermappar plus cirka 90 toppnivåmoduler. Huvudgrupper:

| Område                        | Mappar/filer                                                                                                        | Djupt dyk                                                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Databas                       | `db/` — -domänmoduler, `migrations/`, `adapters/`, `repositories/`, `migrationRunner/`                              | [`src/lib/db/AGENTS.md`](../../src/lib/db/AGENTS.md), [DATABASE_GUIDE.md](../ops/DATABASE_GUIDE.md)                                            |
| Användning, kvot och utgifter | `usage/`, `quota/`, `spend/`                                                                                        | [QUOTA_SHARE.md](../routing/QUOTA_SHARE.md), [COST_TRACKING.md](../guides/COST_TRACKING.md)                                                    |
| Leverantörer och modeller     | `providers/`, `providerModels/`, `modelValidation/`, `catalog/`, `radar/`, `freeProxyProviders/`                    | [RADAR.md](../frameworks/RADAR.md), [MODEL-VALIDATION.md](../guides/MODEL-VALIDATION.md)                                                       |
| OAuth och referenser          | `oauth/` (leverantörer/, tjänster/, utils/), `zed-oauth/`, `copilot/`, `cursor/`, `credentialHealth/`               | `resolvePublicCred()` (operatörsdokument, visas inte offentligt)                                                                               |
| Säkerhet och styrning         | `guardrails/`, `compliance/`, `pii/`, `security/`                                                                   | [GUARDRAILS.md](../security/GUARDRAILS.md), [COMPLIANCE.md](../security/COMPLIANCE.md)                                                         |
| Agentfunktioner               | `a2a/`, `acp/`, `cloudAgent/`, `memory/`, `skills/`, `agentSkills/`                                                 | [AGENT_PROTOCOLS_GUIDE.md](../frameworks/AGENT_PROTOCOLS_GUIDE.md), [MEMORY.md](../frameworks/MEMORY.md), [SKILLS.md](../frameworks/SKILLS.md) |
| Plugins och tjänster          | `plugins/`, `services/` (installatörer och arbetsledare för inbyggda tjänster)                                      | [PLUGINS.md](../frameworks/PLUGINS.md), [EMBEDDED-SERVICES.md](../frameworks/EMBEDDED-SERVICES.md)                                             |
| Routing och motståndskraft    | `combos/`, `routing/`, `resilience/`, `reasoningRouting/`, `promptCache/`                                           | [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                                                     |
| Proxies och nätverkande       | `proxyHealth/`, `proxySubscription/`, `proxyRelay/`, `proxyEvents/`, tunnelmoduler                                  | [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md), [TUNNELS_GUIDE.md](../ops/TUNNELS_GUIDE.md)                                                           |
| Jobb och schemaläggning       | `jobs/`, `jobRegistry/`, `warmupScheduler/`                                                                         |                                                                                                                                                |
| Observerbarhet och export     | `monitoring/`, `logExport/`, `webhooks/`, `audit/`, `events/`                                                       | [LOG-EXPORT.md](../frameworks/LOG-EXPORT.md), [WEBHOOKS.md](../frameworks/WEBHOOKS.md)                                                         |
| CLI och IDE integration       | `cliTools/`, `cli-helper/`, `vscode/`, `inspector/`, `versionManager/`                                              | [CLI-TOOLS.md](../reference/CLI-TOOLS.md), [VSCODE-COPILOT.md](../guides/VSCODE-COPILOT.md)                                                    |
| Kontextkällor                 | `localCorpus/`, `notion/`, `obsidian/`                                                                              | [LOCAL_CORPUS_CONTEXT.md](../frameworks/LOCAL_CORPUS_CONTEXT.md)                                                                               |
| Andra funktioner              | `evals/`, `playground/`, `gamification/`, `telegram/`, `conductor/`, `batches/`, `deploy/`, `transfer/`, `sync/`, … | [EVALS.md](../frameworks/EVALS.md), [PLAYGROUND_STUDIO.md](../frameworks/PLAYGROUND_STUDIO.md)                                                 |

Moduler på toppnivå värda att veta:

| Fil                                                            | Ändamål                                                      |
| -------------------------------------------------------------- | ------------------------------------------------------------ |
| `cacheLayer.ts`, `idempotencyLayer.ts`, `semanticCache.ts`     | Responscaching och idempotens                                |
| `webhookDispatcher.ts`                                         | HMAC-signerad webhook leverans                               |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts` | Tunnelförvaltare                                             |
| `tokenHealthCheck*.ts`, `tokenRefreshCircuit.ts`               | Hälsokontroller för bakgrundsuppgifter och uppdateringskrets |
| `streamingPiiTransform.ts`, `streamingCredentialTransform.ts`  | Strömmande desinficeringsmedel                               |
| `gracefulShutdown.ts`, `serverLifecycle.ts`                    | Processens livscykel                                         |
| `*.stub.ts`                                                    | Byggprofilstubbar byts in av alias i `next.config.mjs`       |

### `src/lib/db/` — databas

| Väg                   | Ändamål                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`          | `getDbInstance()` singleton (WAL journaling)                                                                                 |
| `db/migrations/`      | Numrerade, idempotenta `.sql` -migreringar (236 filer i skrivande stund; `check-migration-numbering.mjs` guards numrering)   |
| `db/migrationRunner/` | Migrationslöpare                                                                                                             |
| `db/adapters/`        | SQLite drivrutinsadaptrar (better-sqlite3, node:sqlite, bun:sqlite, sql.js)                                                  |
| `db/repositories/`    | SQLite -förvarsimplementeringar (kombinationer, förinställningar för lekplats, routingkonfiguration)                         |
| `db/<domain>.ts`      | Cirka 175 domänmoduler (leverantörer, kombinationer, apiKeys, inställningar, användning, …) — importerar alltid dessa direkt |

### `src/domain/`, `src/server/`, `src/shared/`

| Väg                                                            | Ändamål                                                                                                                                               |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain/policyEngine.ts`                                       | Policymotor                                                                                                                                           |
| `domain/fallbackPolicy.ts`, `lockoutPolicy.ts`, `costRules.ts` | Reservbeslut, lockoutpolicy, kostnadsregler                                                                                                           |
| `domain/quotaCache*.ts`, `quotaSnapshot*.ts`                   | Kvotcache och ögonblicksbildbeständighet                                                                                                              |
| `domain/assessment/`                                           | Modellbedömning (bedömare, kategoriserare, självläkare)                                                                                               |
| `server/authz/`                                                | Auktoriseringspipeline och ruttvakt (`routeGuard.ts`) — se [AUTHZ_GUIDE.md](AUTHZ_GUIDE.md), [ROUTE_GUARD_TIERS.md](../security/ROUTE_GUARD_TIERS.md) |
| `server/origin/`, `server/cors/`                               | Public/MCP/WS ursprungsupplösning och CORS — se [CORS.md](../security/CORS.md)                                                                        |
| `server/ws/`                                                   | Live instrumentpanel WebSocket server                                                                                                                 |
| `shared/components/`                                           | Instrumentpanelskomponenter och adaptrar över `packages/ui-kit` — se [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)                                             |
| `shared/constants/`                                            | Leverantörskatalog (`providers.ts`), routingstrategier, CLI verktyg, ikonkarta, uppströms header denylist, …                                          |
| `shared/validation/`                                           | Zod -scheman och valideringshjälpmedel                                                                                                                |
| `shared/utils/`                                                | Strömbrytare, API-nyckelauth, hämtningstidsgränser, funktionsflaggor, ...                                                                             |
| `shared/middleware/`, `network/`, `services/`, `hooks/`        | Mellanvara för chattbehörighet, nätverkshjälpare, klienttjänster, React -krokar                                                                       |

---

## `open-sse/` — strömningsmotor arbetsyta

npm workspace `@omniroute/open-sse` (cirka 2 390 spårade filer). Det gör begäran bearbetning och leverantör exekvering. Översikt: [OPEN_SSE_ARCHITECTURE.md](../frameworks/OPEN_SSE_ARCHITECTURE.md).

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

| Väg                                                                                            | Ändamål                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combo.ts` + `combo/`                                                                          | Combo routingstrategier — se [AUTO-COMBO.md](../routing/AUTO-COMBO.md)                                                                                     |
| `autoCombo/`                                                                                   | Auto-Combo poäng och lägespaket                                                                                                                            |
| `accountFallback.ts` + `accountFallback/`                                                      | Anslutning kylning och modell lockout — se [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                      |
| `rateLimitManager.ts` + `rateLimitManager/`                                                    | Spårning av hastighetsgräns och rubrikanalys                                                                                                               |
| `compression/`                                                                                 | Kompressionsmotorer (`engines/`), regelpaket (`rules/`), `eval/`, `harness/`, `riskGate/` — se [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) |
| `tokenRefresh/`, `usage/`, `cache/`, `admission/`, `sessionPool/`, `codexAccount/`, `routing/` | Tokenuppdatering, användningsredovisning, cachning, inträdesbanor, sessionspooler, Codex konton, routinghjälpare                                           |
| `__tests__/`                                                                                   | Samlokaliserade Vitest sviter (samlade av Vitest konfigurationerna)                                                                                        |
| `AGENTS.md`                                                                                    | Agentguide för den här mappen                                                                                                                              |

Mönster: en stor modul `X.ts` bredvid en mapp `X/` betyder att modulen delades upp i mindre filer (`handlers/chatCore.ts` + `handlers/chatCore/`, `services/combo.ts` + `services/combo/`).

### `open-sse/mcp-server/`

| Väg                   | Ändamål                                                                                             |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| `server.ts`           | MCP serverns livscykel                                                                              |
| `httpTransport.ts`    | Strömbara HTTP och SSE -transporter                                                                 |
| `scopeEnforcement.ts` | Omfattningskontroller per verktyg                                                                   |
| `audit.ts`            | Tool-call revisionsloggning                                                                         |
| `schemas/`            | Verktygsdefinitioner och omfång                                                                     |
| `tools/`              | Verktygsimplementeringar (minne, färdigheter, komprimering, …)                                      |
| `toolSearch/`         | Verktygssökning                                                                                     |
| `README.md`           | Interna arkitekturanteckningar; hela katalogen finns i [MCP-SERVER.md](../frameworks/MCP-SERVER.md) |

---

## `packages/` — npm arbetsytor

| Väg                      | Ändamål                                                                                                                                                                                                                                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit`: levererad ögonblicksbild av Keak CI UI Kit, konsumerad som källa. `UPSTREAM.md` stiftar uppströms commit, `PATCHES.md` listar lokala patchar. `src/` synkroniseras endast av `scripts/dev/sync-ui-kit.sh` och bevakas av `npm run check:ui-kit-snapshot`. Se [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| `packages/browser-pool/` | `@omniroute/browser-pool`: webbläsar-pool-gränssnitt och implementering (`packages/browser-pool/src/index.ts`, `packages/browser-pool/src/interfaces.ts`). Listad i `workspaces`; runtime webbläsarpoolen som används av gatewayen bor i `open-sse/services/`                                                          |

## `@omniroute/` — publicerade separata paket

Dessa är inte npm-arbetsytor. Var och en har sin egen `package.json` och låsfil; mappen skickas i `omniroute` tarball (`files: ["@omniroute/"]`).

| Väg                              | Ändamål                                                                                                                                |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `@omniroute/opencode-plugin/`    | OpenCode plugin (modellupptäckt, `/connect` auth); används av `omniroute setup-opencode` — se [OPENCODE.md](../frameworks/OPENCODE.md) |
| `@omniroute/opencode-plugin-v2/` | OpenCode plugin för v2 Promise API — se [OPENCODE-V2-PLUGIN.md](../guides/OPENCODE-V2-PLUGIN.md)                                       |
| `@omniroute/opencode-provider/`  | Statisk konfigurationsgenerator; märkt utfasad i sin egen `package.json` till förmån för `opencode-plugin`                             |

---

## `bin/` — CLI och ops-skript

| Väg                                                                         | Ändamål                                                                                          |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `omniroute.mjs`                                                             | Huvudpost för CLI (`omniroute serve`, `setup`, `doctor`, `providers`, `combo`, …)                |
| `reset-password.mjs`                                                        | `omniroute-reset-password` binär                                                                 |
| `mcp-server.mjs`                                                            | MCP stdio ingångspunkt                                                                           |
| `antigravity-bridge.mjs`, `chatgpt-web-codex-mcp.mjs`                       | Hjälpbro/ MCP -ingångspunkter                                                                    |
| `aliasResolver.mjs`, `aliasResolverHook.mjs`                                | ESM resolve hook som mappar tsconfig-sökvägsalias för globala installationer                     |
| `nodeRuntimeSupport.mjs`                                                    | Stöd för Node.js versionskontroll                                                                |
| `snapshot-data.sh`, `restore-data.sh`, `restore-policies.sh`, `rollback.sh` | Självvärd för incident-återställningsskript (dela `_ops-common.sh`)                              |
| `cold-start-bench.sh`                                                       | Benchmark för kallstart — se [PERF_BASELINE.md](../ops/PERF_BASELINE.md)                         |
| `cli/commands/`                                                             | En modul per CLI -kommando (cirka 100, inklusive `setup-*` integreringarna)                      |
| `cli/api-commands/`                                                         | Genereras från `docs/openapi.yaml` av `npm run build:cli-api` — redigera inte                    |
| `cli/locales/`                                                              | CLI meddelandekataloger (67 språk)                                                               |
| `cli/tui/`, `cli/tui-components/`                                           | Terminal UI                                                                                      |
| `cli/tray/`                                                                 | Systemfältet och autostart (Windows PowerShell backend, systray på macOS/Linux)                  |
| `cli/runtime/`                                                              | Native runtime resolution (`sqliteRuntime.mjs`, `magicBytes.mjs`), process supervisor            |
| `cli/*.mjs`                                                                 | Delade hjälpare (args, API klient, data dir, kryptering, leverantörsbutik, inställningsarkiv, …) |
| `cli/README.md`, `cli/CONVENTIONS.md`                                       | CLI interna och konventioner                                                                     |

Se [CLI-TOOLS.md](../reference/CLI-TOOLS.md) och [CLI-COMPANION.md](../guides/CLI-COMPANION.md).

## `electron/` — stationär app

| Väg                                                        | Ändamål                                                                            |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `main.js`                                                  | Electron huvudprocess (fönster, inbäddad server, fack, uppdateringar)              |
| `preload.js`                                               | IPC -bro exponerad för renderaren                                                  |
| `lib/`                                                     | Fönsterlivscykel, serverberedskap, hälsoövervakning, inställningar för fjärrserver |
| `remoteServerPrompt*.js`, `assets/remoteServerPrompt.html` | Fönstret för fjärrserverprompt                                                     |
| `processTree.js`, `sqlite-inspection.js`                   | Hjälpare för sanering av barnprocesser och SQLite inspektioner                     |
| `package.json` / `package-lock.json`                       | elektronbyggarens konfiguration och Electron beroenden                             |
| `assets/`                                                  | App- och fackikoner (`.ico`, `.icns`, `.png`)                                      |
| `README.md`                                                | Interna anteckningar — se [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)         |

## `public/` — statiska tillgångar

| Väg                                         | Ändamål                                                                                                                  |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `providers/`                                | Leverantörslogotyper laddade av id (`/providers/<id>.svg`); härkomst i `config/quality/provider-assets-provenance.jsonl` |
| `favicon.*`, `apple-touch-icon.*`, `icon-*` | Webbläsare och PWA ikoner                                                                                                |
| `sw.js`                                     | Servicearbetare — se [PWA_GUIDE.md](../guides/PWA_GUIDE.md)                                                              |
| `openapi.yaml`                              | Kopia av `docs/openapi.yaml` genererad av `npm run gen:public-openapi`                                                   |
| `images/`, `sponsors/`, `deyin.svg`         | Tier-flödesdiagram, sponsor banner, README konstverk                                                                     |

## `skills/` — Agentfärdigheter

46 färdigheter, en mapp vardera med en `SKILL.md` (`cli-*`, `omni-*`, `config-codex-cli`, `ponytail`), plus `skills/README.md`. `src/lib/agentSkills/catalog.ts` läser dem under körning och exponerar dem genom `/api/agent-skills`, MCP och A2A. De flesta manifesten genereras av `src/lib/agentSkills/generator.ts` (`scripts/skills/generate-agent-skills.mjs`; `npm run check:agent-skills-sync` kontrollerar drift). Se [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md).

---

## `scripts/` — konstruktion, grindar och verktyg

Cirka 435 spårade filer. Nya skript hamnar i en av undermapparna som tillåts av `AGENTS.md`; engångskoden går i `scripts/ad-hoc/`.

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

Ofta använda ingångspunkter:

| Manus                                                               | Ändamål                                                                                              |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `dev/run-next.mjs`                                                  | `npm run dev` / `npm start` löpare                                                                   |
| `build/build-next-isolated.mjs`                                     | `npm run build` (Next.js fristående version)                                                         |
| `build/prepublish.ts`                                               | `npm run build:cli`: sätter ihop npm `dist/`                                                         |
| `build/postinstall.mjs`                                             | npm `postinstall` krok                                                                               |
| `build/publicOpenApi.mjs`                                           | `npm run gen:public-openapi`                                                                         |
| `docs/gen-provider-reference.ts`                                    | `npm run gen:provider-reference` (återskapar PROVIDER_REFERENCE.md)                                  |
| `docs/gen-openapi-module.mjs`                                       | `prebuild:docs` (genererar `src/app/docs/lib/openapi.generated.ts`)                                  |
| `i18n/run-translation.mjs`                                          | `npm run i18n:run` (docs speglar)                                                                    |
| `i18n/generate-route-namespaces.mjs`                                | `npm run gen:i18n-routes`                                                                            |
| `release/aggregate-changelog.mjs`                                   | Viker `changelog.d/` -fragment till `CHANGELOG.md`                                                   |
| `check/check-fabricated-docs.mjs`                                   | `npm run check:fabricated-docs` (doc precision gate)                                                 |
| `check/check-tracked-artifacts.mjs`                                 | `npm run check:tracked-artifacts` (blockerar spårade rot- `_*` vägar)                                |
| `quality/check-quality-ratchet.mjs`                                 | `npm run quality:ratchet` (metrisk spärr mot `config/quality/`)                                      |
| `dev/run-playwright-tests.mjs`                                      | `npm run test:e2e`                                                                                   |
| `dev/run-protocol-clients-tests.mjs`, `dev/run-ecosystem-tests.mjs` | `npm run test:protocols:e2e`, `npm run test:ecosystem`                                               |
| `dev/new-worktree.sh`                                               | Skapar ett isolerat utvecklingsarbetsträd — se [WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md) |
| `dev/sync-ui-kit.sh`                                                | Synkroniserar `packages/ui-kit/src` med en fäst uppströms commit                                     |

Gateinventering och policyer: [QUALITY_GATES.md](QUALITY_GATES.md).

## `config/` — versionerad konfiguration och grindtillstånd

| Väg                                      | Ändamål                                                                                                              |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `i18n.json` / `i18n-schema.json`         | Lokaler som stöds (källan till språkantalet) och deras schema                                                        |
| `payloadRules.json`                      | Uppströms nyttolastregler (`open-sse/services/payloadRules.ts`)                                                      |
| `cli-tools-manifest.json`                | Manifest av integrerbara CLI verktyg (`bin/cli/cli-manifest.mjs`)                                                    |
| `alibaba-free-tier-allowlist.json`       | Alibaba free-tier modell godkännandelista                                                                            |
| `ci/toolchain.json`                      | CI verktygskedja versioner                                                                                           |
| `quality/quality-baseline.json`          | Multimetrisk spärrbaslinje (täckning, varningar, duplicering, …)                                                     |
| `quality/*-baseline.json`                | Frysta baslinjer för individuella grindar (komplexitet, duplicering, filstorlek, typkontrollskivor, testupptäckt, …) |
| `quality/*-allowlist.json`               | Gategodkännandelistor (beroenden, licenser, AI attribution, tester för glömda syskon, …)                             |
| `quality/eslint-suppressions.json`       | Frysta ESLint -undertryckningar tillämpas av `npm run lint`                                                          |
| `quality/gate-manifest.json`             | Gatemanifest kontrollerat av `scripts/quality/gate-manifest.mjs`                                                     |
| `quality/vitest-exclusions.json`         | Karantäninventering för `vitest.quarantine.config.ts`                                                                |
| `quality/skill-templates/`               | Kanoniska SKILL.md mallar kontrolleras av `scripts/quality/check-skill-contract.mjs`                                 |
| `quality/release-acceptance.schema.json` | Bevisschema för release-acceptans — se [QUALITY_EVIDENCE_CONTRACT.md](QUALITY_EVIDENCE_CONTRACT.md)                  |
| `release/`                               | Ändringsloggavstämningar och wreq-js inbyggda manifest, licensinventering och meddelanden                            |

## `changelog.d/` — ändringsloggfragment

En PR lägger till ett fragment istället för att redigera `CHANGELOG.md`: `features/`, `fixes/` eller `maintenance/`, som heter `<PR-number>-<slug>.md`. Vid släpptid viker `scripts/release/aggregate-changelog.mjs` dem till `CHANGELOG.md` och raderar dem; `npm run check:changelog-integrity` validerar dem. Detaljer i `changelog.d/README.md`.

---

## `docs/` — offentlig dokumentation

Sektioner listade i `source.config.ts` kompileras till `/docs` webbplatsen (med ett fåtal säkerhetssidor för endast operatörer uteslutna); `docs/meta.json` ställer in sidofältsordningen. Börja på [README.md](../README.md).

| Väg                | Innehåll                                                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getting-started/` | Snabbstart, självvärd, leverantörer, gratis nivåer, Auto-Combo och guider för webbkakor                                                                   |
| `guides/`          | Operatörs- och utvecklarguider: installation, Docker, Electron, PWA, Termux, CLIs, i18n, felsökning, användarguide                                        |
| `architecture/`    | Arkitektur, kodbasreferens, modifieringsrecept, authz, resiliens, kvalitetsportar, designsystem, denna karta                                              |
| `reference/`       | API -referens, miljövariabler, funktionsflaggor, CLI verktyg, gratisnivåer, genererad leverantörsreferens, borttagna leverantörer                         |
| `frameworks/`      | MCP, A2A, ACP, färdigheter, minne, plugins, molnagenter, webhooks, evals, loggexport, Radar, Playground, …                                                |
| `routing/`         | Auto-Combo, resonemang replay/routing, kvotandel, prenumerationstrappa, strikt nollkostnad, …                                                             |
| `security/`        | Skyddsräcken, felsanering, CORS, SSO, utträdespolicy, ruttskyddsnivåer, leveranskedja, …                                                                  |
| `compression/`     | Kompressionsguide, motorer, RTK, regelformat, språkpaket, sammanhangsredigering                                                                           |
| `ops/`             | Släppflöde, förgrening, sammanfogning av tåg, implementering (VM, Fly.io, Kubernetes), databas, proxyservrar, arbetsträd, detaljer om hårda regler        |
| `providers/`       | Guider per leverantör (Claude Code, ChatGPT Web, Cursor, GitHub Copilot, …)                                                                               |
| `comparison/`      | OmniRoute jämfört med alternativ                                                                                                                          |
| `integrations/`    | Integreringsanteckningar (fal.ai native, MarkItDown MCP); inte kompilerad till `/docs`                                                                    |
| `openapi.yaml`     | OpenAPI källa; matar `src/app/docs/lib/openapi.generated.ts`, `public/openapi.yaml` och `bin/cli/api-commands/`                                           |
| `diagrams/`        | Sjöjungfrukällor (`.mmd`), renderade SVGs (`exported/`) och README SVGs från `scripts/docs/gen-readme-*`                                                  |
| `assets/`          | Språkflagga SVGs och andra README tillgångar                                                                                                              |
| `screenshots/`     | Skärmdumpar som används av README och guider                                                                                                              |
| `i18n/`            | Översatta speglar: en mapp per lokal (66) med root-dokument och en `docs/` undergrupp; producerad av `npm run i18n:run` — se [I18N.md](../guides/I18N.md) |
| toppnivå `*.md`    | `README.md` (doc index), `DEVELOPER-ENVIRONMENT.md` och några fristående anteckningar                                                                     |

Viktiga ingångspunkter: [ARCHITECTURE.md](ARCHITECTURE.md), [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md), [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md), [ENVIRONMENT.md](../reference/ENVIRONMENT.md), [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) (genererad av `npm run gen:provider-reference`).

---

## `tests/` — testsviter

Cirka 9 670 spårade filer. Testfiler hör hemma här, inte i projektroten. Undantag: de samlokaliserade `__tests__/` mapparna i `src/` och `open-sse/` som Vitest -konfigurationerna samlar in.

| Väg                                                    | Innehåll                                                                                                                                                                     | Löpare                                                                                  |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `tests/unit/`                                          | Enhetstester (över 9 000 filer): många på översta nivån, plus domänmappar (`ui/`, `compression/`, `build/`, `guardrails/`, `db/`, `cli/`, `api/`, `dashboard/`, `combo/`, …) | Nodtestlöpare (`npm run test:unit`); `*.tsx` via `test:vitest:ui`                       |
| `tests/unit/serial/`                                   | CPU-känsliga tester körs med samtidighet 1                                                                                                                                   | `npm run test:unit:serial`                                                              |
| `tests/unit/autoCombo/`, `tests/unit/api/**/*.spec.ts` | Vitest sviter inne i enhetsträdet                                                                                                                                            | `npm run test:vitest`                                                                   |
| `tests/integration/`                                   | Multimodul- och DB -integreringstest; `combo-matrix/`, `combo-live/`, `services/`                                                                                            | `npm run test:integration`, `test:combo:matrix`, `test:combo:live`, `test:services:int` |
| `tests/e2e/`                                           | Playwright `*.spec.ts` + live suites `ecosystem.test.ts`, `protocol-clients.test.ts`                                                                                         | `npm run test:e2e`, `test:ecosystem`, `test:protocols:e2e`                              |
| `tests/boundary/`                                      | `*.live.test.ts` mot en pågående instans                                                                                                                                     | `npm run test:boundary:live`                                                            |
| `tests/homolog/`                                       | Homologationssviter (`api/`, `ui/` med sin egen Playwright konfiguration)                                                                                                    | `npm run homolog` — se [HOMOLOGATION.md](../ops/HOMOLOGATION.md)                        |
| `tests/load/`                                          | Ladda och blötlägg skript (k6)                                                                                                                                               | Arbetsflöde för motståndskraft på natten                                                |
| `tests/_setup/`                                        | `--import` / installationsfiler (isolerad data dir, egress guard, Vitest UI polyfills)                                                                                       | Laddas av löparna                                                                       |
| `tests/_helpers/`, `tests/helpers/`                    | Delade testhjälpare (gyllene ögonblicksbilder, ledningssession, ...)                                                                                                         | Importerad genom tester                                                                 |
| `tests/fixtures/`                                      | Fixturdata och underordnade processfixturer                                                                                                                                  | Importerad genom tester                                                                 |
| `tests/snapshots/`                                     | Gyllene filer för `tests/helpers/goldenSnapshot.ts`                                                                                                                          | Importerad genom tester                                                                 |
| `tests/manual/`                                        | `.http` filer för manuella REST samtal                                                                                                                                       | Manuell                                                                                 |
| `tests/security/`                                      | Skript för säkerhetsskal                                                                                                                                                     | Manuell / enhetstestfixturer                                                            |
| `tests/types/`                                         | Kontraktsarmaturer på typnivå                                                                                                                                                | —                                                                                       |

Fullständig matris: `CONTRIBUTING.md` → "Running Tests" och [COVERAGE_PLAN.md](../ops/COVERAGE_PLAN.md).

---

## `deploy/` — Kubernetes

| Väg                                                | Ändamål                                                                                                      |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `deploy/helm/omniroute/`                           | Styrdiagram (`Chart.yaml`, `values.yaml`, mallar för distribution, service, ingress, PVC, secret, configmap) |
| `deploy/kubernetes/base/`                          | Anpassa bas (namnområde, distribution, tjänst, PVC, configmap, `secret.example.yaml`)                        |
| `deploy/kubernetes/overlays/k3s/`, `overlays/k8s/` | Klusterspecifika överlagringar (ingång, lagringsklass, resurser, sonder)                                     |

Se [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

## `docker/` — hjälpbilder

| Väg                                 | Ändamål                                                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `docker/chatgpt-web-codex-browser/` | Huvudlös webbläsarbild med en CDP proxy för ChatGPT Web executor — se [CHATGPT_WEB.md](../providers/CHATGPT_WEB.md) |
| `docker/devin-bridge/`              | Devin bryggbild, komponera fil, hånar och nätverksvakt                                                              |
| `docker/vnc-browser/`               | Chromium med VNC för interaktiva webbläsarsessioner                                                                 |

Huvudbilden är roten `Dockerfile`; se [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md).

## `contrib/` — community-recept (stöds inte officiellt)

| Väg                     | Ändamål                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `contrib/podman/`       | Podman-quadletter (container, volym, nätverk, Redis)                                                                           |
| `contrib/vps/`          | VPS `compose.yaml` + `.env.example`                                                                                            |
| `contrib/windows/`      | `.bat` launchers för att köra från en Windows kassa                                                                            |
| `contrib/session-sync/` | README för en tredje parts session-sync webbläsartillägg — se [SESSION-SYNC-EXTENSION.md](../guides/SESSION-SYNC-EXTENSION.md) |

## `examples/`

| Väg                             | Ändamål                                                                     |
| ------------------------------- | --------------------------------------------------------------------------- |
| `examples/omniroute-cmd-hello/` | Minimal kommandoplugin — se [PLUGINS.md](../frameworks/PLUGINS.md)          |
| `examples/plugins/`             | Exempel på plugins: langfuse, request-logger, temahanterare, välkomstbanner |
| `examples/quickstart/`          | Klientsnuttar: curl, Node.js (axios), PHP, Python                           |

---

## `.github/` — GitHub integration

| Väg                                                          | Ändamål                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.github/workflows/`                                         | CI (`ci.yml`, `quality.yml`, `build.yml`), säkerhetsskanningar (`codeql.yml`, `semgrep.yml`, `scorecard.yml`, `dast-smoke.yml`), schemalagda `nightly-*.yml` sviter, publicering (`npm-publish.yml`, `docker-publish.yml`, `electron-release.yml`), arbetsflöden för release och underhåll |
| `.github/actions/npm-ci-retry/`                              | Sammansatt åtgärd: `npm ci` med cache och försök igen                                                                                                                                                                                                                                      |
| `.github/actions/prepare-unit-storage/`                      | Sammansatt åtgärd: frigör löpardiskutrymme och installerar sedan beroenden                                                                                                                                                                                                                 |
| `.github/ISSUE_TEMPLATE/`                                    | Bugg-, funktions- och testtäckningsformulär                                                                                                                                                                                                                                                |
| `.github/pull_request_template.md`, `PULL_REQUEST_TEMPLATE/` | Standard PR mall plus bugfix/feature varianter                                                                                                                                                                                                                                             |
| `.github/CODEOWNERS`, `FUNDING.yml`, `dependabot.yml`        | Kodägare, sponsringslänkar, beroendeuppdateringar                                                                                                                                                                                                                                          |
| `.github/labels.yml`                                         | Etikettdefinitioner tillämpas av `npm run labels:sync`                                                                                                                                                                                                                                     |
| `.github/copilot-instructions.md`                            | GitHub Copilot instruktioner (en agent-instruktionsyta)                                                                                                                                                                                                                                    |

CI jobbkarta: [QUALITY_GATES.md](QUALITY_GATES.md).

## `.husky/` — git krokar

| Fil          | Ändamål                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `pre-commit` | Git-identitetskontroll, lint-stadium, gatemanifest, docs sync, any-budget, typ-scale ratchet, tracked-artefacts och ui-kit snapshot checks |
| `commit-msg` | `scripts/check/check-ai-attribution.mjs` på commit-meddelandet                                                                             |
| `pre-push`   | Avsiktligt ljus: en PATH/npm förnuftskontroll som går ut 0                                                                                 |

Hook-körtiden i `.husky/_/` genereras vid installationen och spåras inte.

---

## Navigeringstips

- **Ny bidragsgivare?** `CONTRIBUTING.md` → `AGENTS.md` → [ARCHITECTURE.md](ARCHITECTURE.md) → [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md).
- **Att förändra något vanligt** (leverantör, rutt, DB modul, MCP verktyg, A2A -färdighet)? Följ [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md).
- **Lägga till en leverantör?** Kontrollera först [REMOVED_PROVIDERS.md](../reference/REMOVED_PROVIDERS.md) och krysskolla sedan [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md).
- **Köra lokalt?** [SETUP_GUIDE.md](../guides/SETUP_GUIDE.md).
- **Utplacera?** [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [SELF_HOST_GUIDE.md](../getting-started/SELF_HOST_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).
- **Släpp?** [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md).
- **En kvalitetsgrind misslyckades?** [QUALITY_GATES.md](QUALITY_GATES.md) och [QUALITY_GATE_PLAYBOOK.md](../ops/QUALITY_GATE_PLAYBOOK.md).
