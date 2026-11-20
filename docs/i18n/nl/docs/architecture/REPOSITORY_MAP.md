# Repository Map (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Wat leeft waar: elke bijgehouden map op het hoogste niveau en rootbestand, met een doel van één regel.** Laatst bijgewerkt: 13-11-2026 (OmniRoute v3.8.54)
>
> Gebruik deze kaart om uw weg te vinden in de codebase en volg vervolgens de links naar de speciale documenten. Op bovenstaande datum zijn de dossieraantallen gemeten met `git ls-files`. Ze veranderen bij bijna elke release, dus behandel ze als ordes van grootte.

## Boom op het hoogste niveau

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

Lokale, gegenereerde of privépaden (allemaal gitignored, nooit vastgelegd, niet verder beschreven):

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

## Root-bestanden

Alle bijgehouden bestanden in de hoofdmap van de repository (`git ls-files | grep -v /`), gegroepeerd op functie.

### Projectdocumentatie

| Bestand                  | Doel                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `README.md`              | Landingspagina: functieoverzicht, snelle start, installatiemethoden                     |
| `CHANGELOG.md`           | Changelog per release (fragmenten van `changelog.d/` zijn hier ingeklapt)               |
| `ROADMAP.md`             | Publieke routekaart                                                                     |
| `LICENSE`                | MIT -licentie                                                                           |
| `THIRD_PARTY_NOTICES.md` | Kennisgevingen voor gebundelde code van derden (bijvoorbeeld de wreq-js-bindingen)      |
| `CONTRIBUTING.md`        | Handleiding voor bijdragers: installatie, conventionele commits, testmatrix, PR -stroom |
| `SECURITY.md`            | Beleid voor rapportage van kwetsbaarheden                                               |
| `CODE_OF_CONDUCT.md`     | Verwachtingen op het gebied van gedrag van de gemeenschap                               |
| `llm.txt`                | Projectsamenvatting in platte tekst voor LLM crawlers en assistenten                    |

### Instructies voor AI-assistent

| Bestand     | Doel                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------- |
| `AGENTS.md` | Eén bron van waarheid voor iedere AI assistent: conventies, kwaliteitspoorten, harde regels |
| `CLAUDE.md` | Claude Code-specifieke delta's; importeert `AGENTS.md`                                      |
| `GEMINI.md` | Gemini-specifieke delta's; wijst terug naar `AGENTS.md`                                     |

Er bestaan ook geneste hulplijnen naast de code die ze beschrijven: `open-sse/services/AGENTS.md` en `src/lib/db/AGENTS.md`.

### Pakketmanifesten en Node-toolchain

| Bestand                    | Doel                                                                                    |
| -------------------------- | --------------------------------------------------------------------------------------- |
| `package.json`             | npm-manifest: scripts, afhankelijkheden, `engines`, `workspaces`, gepubliceerde `files` |
| `package-lock.json`        | Vergrendelde afhankelijkheidsboom                                                       |
| `pnpm-workspace.yaml`      | pnpm-werkruimtelijst (`packages/*`, `open-sse`) en native-build toelatingslijst         |
| `.npmrc` / `.npmignore`    | npm configuratie en publicatie-uitsluitingen                                            |
| `.node-version` / `.nvmrc` | Knooppuntversiepinnen voor versiebeheerders                                             |
| `flake.nix` / `flake.lock` | Nix dev shell en zijn slot                                                              |
| `Makefile`                 | `make` snelkoppelingen die delegeren naar de npm-scripts                                |

### TypeScript, Next.js en docs bouwen

| Bestand                                   | Doel                                                                         |
| ----------------------------------------- | ---------------------------------------------------------------------------- |
| `tsconfig.json`                           | Basis TypeScript -configuratie en padaliassen (`@/*`, `@omniroute/open-sse`) |
| `tsconfig.typecheck-core.json`            | `npm run typecheck:core` stukje                                              |
| `tsconfig.typecheck-noimplicit-core.json` | `npm run typecheck:noimplicit:core` (strikte `noImplicitAny`) plak           |
| `tsconfig.typecheck-api.json`             | API-route typecheck slice (`scripts/check/check-api-typecheck.mjs`)          |
| `tsconfig.typecheck-dashboard.json`       | Dashboardtypecontrole-segment (`npm run check:dashboard-typecheck`)          |
| `tsconfig.build.json`                     | Productietypecontrole (`npm run typecheck:build`, `check:build-typecheck`)   |
| `tsconfig.mitm.json`                      | MITM build-configuratie gebruikt door `scripts/build/buildMitm.mjs`          |
| `next.config.mjs`                         | Next.js 16 config (standalone uitvoer, build-profiel aliassen)               |
| `source.config.ts`                        | Fumadocs `defineDocs` config: welke `docs/` secties compileren in `/docs`    |
| `postcss.config.mjs`                      | PostCSS / Tailwind -pijplijn                                                 |

### Lint en opmaak

| Bestand                                   | Doel                                                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `eslint.config.mjs`                       | Hoofd ESLint platte configuratie (`npm run lint`, met `config/quality/eslint-suppressions.json`)                          |
| `eslint.complexity-ratchets.config.mjs`   | Op zichzelf staande configuratie die wordt gebruikt door de complexiteit en cognitieve complexiteit in één ESLint passage |
| `eslint.complexity.config.mjs`            | Standalone configuratie met alleen kern `complexity` + `max-lines-per-function` (gebruikt door tests)                     |
| `prettier.config.mjs` / `.prettierignore` | Prettier -regels en uitsluitingen                                                                                         |
| `.editorconfig`                           | Standaardinstellingen voor de editor (inspringing met 2 spaties)                                                          |
| `.markdownlint.json`                      | Adviesprijsverlaging lint (`npm run lint:md`)                                                                             |
| `.vale.ini`                               | Adviserend prozalint (`npm run lint:prose`), woordenschat in `.vale/`                                                     |

### Tests, evaluatie en dekking

| Bestand                       | Doel                                                                                                           |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `vitest.config.ts`            | jsdom Vitest suite: `npm run test:vitest:ui` (dashboard `.tsx`, hooks, memory/skills tests)                    |
| `vitest.mcp.config.ts`        | Knooppunt Vitest suite: `npm run test:vitest` (MCP server, autoCombo, combo, API `.spec.ts`)                   |
| `vitest.quarantine.config.ts` | Voert de in quarantaine geplaatste bestanden uit die worden vermeld in `config/quality/vitest-exclusions.json` |
| `vitest.e2e-live.config.ts`   | Live-server Vitest suites (`tests/e2e/ecosystem.test.ts`, `tests/e2e/protocol-clients.test.ts`)                |
| `playwright.config.ts`        | Playwright E2E (`tests/e2e/**/*.spec.ts`, `npm run test:e2e`)                                                  |
| `stryker.conf.mjs`            | Stryker-mutatietesten (`npm run test:mutation`; berekent `tap.testFiles` uit `mutate`)                         |
| `stryker.disablebail.mjs`     | Stryker-variant zonder beugel, voor test-redundantiemeting                                                     |
| `promptfooconfig.yaml`        | promptfoo LLM-beveiligingssuite                                                                                |
| `codecov.yml`                 | Instellingen voor Codecov-patchdekking                                                                         |

### Docker en inzet

| Bestand                           | Doel                                                                             |
| --------------------------------- | -------------------------------------------------------------------------------- |
| `Dockerfile`                      | Meertrapsafbeelding (`builder` → `runner-base` → `runner-web` / `runner-cli*`)   |
| `Dockerfile.bun`                  | Alternatieve afbeelding op de Bun runtime (gebouwd door `docker-publish.yml`)    |
| `docker-compose.yml`              | Standaard opstellen met profielen (base, web, cli, host, memory, cliproxyapi, …) |
| `docker-compose.prod.yml`         | Afzonderlijk productiemomentopname-exemplaar op poort 20130                      |
| `docker-compose.selfhost.yml`     | Loopback self-host met één opdracht (paren met `.env.selfhost.example`)          |
| `docker-compose.ollama-local.yml` | Docker OmniRoute praat met een host-native Ollama                                |
| `.dockerignore`                   | Docker build-context-uitsluitingen                                               |
| `fly.toml`                        | Fly.io app-configuratie (poort 20128, `/data` -volume)                           |

### Beveiligings-, supply chain- en repository-bots

| Bestand                                      | Doel                                                                          |
| -------------------------------------------- | ----------------------------------------------------------------------------- |
| `.gitleaks.toml`                             | gitleaks geheime scanregels en toelatingslijsten                              |
| `.trivyignore`                               | Onderdrukking van geaccepteerde risico's voor de containerimagescan           |
| `.zizmor.yml`                                | zizmor GitHub Acties security-audit config                                    |
| `socket.yml`                                 | Socket.dev app-configuratie (pad negeert; geen CI poort)                      |
| `sonar-project.properties`                   | SonarQube/SonarCloud projectconfiguratie                                      |
| `knip.json`                                  | Knip ongebruikte files/exports/deps -config (feeds `npm run check:dead-code`) |
| `.size-limit.json`                           | Budgetten op bundelformaat                                                    |
| `.mergify.yml`                               | Samenvoegwachtrijconfiguratie samenvoegen                                     |
| `.coderabbit.yaml`                           | CodeRabbit beoordelingsconfiguratie                                           |
| `.cbmignore`                                 | Negeer de lijst voor de codebase-memory-mcp code-index                        |
| `.gitignore` / `.gitattributes` / `.mailmap` | Negeer regels, LF -regeleinden voor scripts, canonieke auteursidentiteiten    |

### Omgevingssjablonen, status en feeds

| Bestand                     | Doel                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------- |
| `.env.example`              | Sjabloon gekopieerd naar `.env` bij de eerste installatie; referentielijst van env vars |
| `.env.selfhost.example`     | Sjabloon voor `docker-compose.selfhost.yml`                                             |
| `.env.homolog.example`      | Sjabloon voor de homologatieloper (`npm run homolog`)                                   |
| `.env.devin-bridge.example` | Voorbeeld env-bestand voor de Devin -bridge-installatie                                 |
| `.i18n-state.json`          | Incrementele vertaalstatus (bron-hashes per document en landinstelling)                 |
| `news.json`                 | Gelokaliseerde aankondigingsfeed (schema v2) gelezen door het dashboard                 |

---

## `src/` — Next.js toepassing

Ongeveer 4.550 bijgehouden bestanden. Padalias `@/*` → `src/*`.

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

### `src/app/` — App-router

| Pad                                                                 | Doel                                                                                                                                                                                                        |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                       | Openbare OpenAI-compatibele API: chat, aanvullingen, antwoorden, berichten, insluitingen, afbeeldingen, audio, video's, muziek, herrangschikking, moderaties, zoeken, bestanden, batches, ws, modellen, ... |
| `app/api/v1beta/`                                                   | Eindpunten in Gemini-stijl                                                                                                                                                                                  |
| `app/api/` (andere mappen)                                          | Beheer- en beheerroutes: providers, combo's, instellingen, sleutels, gebruik, logs, mcp, a2a, acp, geheugen, vaardigheden, evaluaties, webhooks, tunnels, plug-ins, radar, tools, ...                       |
| `app/api/tools/agent-bridge/`                                       | AgentBridge REST API — zie [AGENTBRIDGE.md](../frameworks/AGENTBRIDGE.md)                                                                                                                                   |
| `app/api/tools/traffic-inspector/`                                  | Verkeersinspecteur REST API — zie [TRAFFIC_INSPECTOR.md](../frameworks/TRAFFIC_INSPECTOR.md)                                                                                                                |
| `app/(dashboard)/dashboard/`                                        | Eén map per dashboardsectie (providers, combo's, logs, gebruik, kosten, cache, compressie, geheugen, speeltuin, zoektools, instellingen, tools, ...)                                                        |
| `app/(dashboard)/home/`                                             | Startscherm en zijn widgets                                                                                                                                                                                 |
| `app/docs/`                                                         | Docs-viewer die de Fumadocs-secties weergeeft die worden vermeld in `source.config.ts`                                                                                                                      |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`          | Root-indeling, root-invoer (omleidingen), PWA -manifest, globale CSS                                                                                                                                        |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx` | Foutgrenzen en fallbacks                                                                                                                                                                                    |

API -routes volgen `Route → CORS → Zod validation → optional auth → policy → handler`; zie [ARCHITECTURE.md](ARCHITECTURE.md) en [API_REFERENCE.md](../reference/API_REFERENCE.md).

### `src/lib/` — -serverbibliotheken

Ongeveer 90 submappen plus ongeveer 90 modules op het hoogste niveau. Hoofdgroepen:

| Gebied                     | Mappen / bestanden                                                                                                  | Diepe duik                                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Database                   | `db/` — domeinmodules, `migrations/`, `adapters/`, `repositories/`, `migrationRunner/`                              | [`src/lib/db/AGENTS.md`](../../src/lib/db/AGENTS.md), [DATABASE_GUIDE.md](../ops/DATABASE_GUIDE.md)                                            |
| Gebruik, quota en uitgaven | `usage/`, `quota/`, `spend/`                                                                                        | [QUOTA_SHARE.md](../routing/QUOTA_SHARE.md), [COST_TRACKING.md](../guides/COST_TRACKING.md)                                                    |
| Aanbieders en modellen     | `providers/`, `providerModels/`, `modelValidation/`, `catalog/`, `radar/`, `freeProxyProviders/`                    | [RADAR.md](../frameworks/RADAR.md), [MODEL-VALIDATION.md](../guides/MODEL-VALIDATION.md)                                                       |
| OAuth en inloggegevens     | `oauth/` (providers/, services/, utils/), `zed-oauth/`, `copilot/`, `cursor/`, `credentialHealth/`                  | `resolvePublicCred()` (operatordocument, niet openbaar weergegeven)                                                                            |
| Veiligheid en bestuur      | `guardrails/`, `compliance/`, `pii/`, `security/`                                                                   | [GUARDRAILS.md](../security/GUARDRAILS.md), [COMPLIANCE.md](../security/COMPLIANCE.md)                                                         |
| Agent-functies             | `a2a/`, `acp/`, `cloudAgent/`, `memory/`, `skills/`, `agentSkills/`                                                 | [AGENT_PROTOCOLS_GUIDE.md](../frameworks/AGENT_PROTOCOLS_GUIDE.md), [MEMORY.md](../frameworks/MEMORY.md), [SKILLS.md](../frameworks/SKILLS.md) |
| Plug-ins en services       | `plugins/`, `services/` (embedded-service installateurs en supervisor)                                              | [PLUGINS.md](../frameworks/PLUGINS.md), [EMBEDDED-SERVICES.md](../frameworks/EMBEDDED-SERVICES.md)                                             |
| Routing en veerkracht      | `combos/`, `routing/`, `resilience/`, `reasoningRouting/`, `promptCache/`                                           | [RESILIENCE_GUIDE](RESILIENCE_GUIDE.md)                                                                                                        |
| Proxy's en netwerken       | `proxyHealth/`, `proxySubscription/`, `proxyRelay/`, `proxyEvents/`, tunnelmodules                                  | [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md), [TUNNELS_GUIDE.md](../ops/TUNNELS_GUIDE.md)                                                           |
| Taken en planning          | `jobs/`, `jobRegistry/`, `warmupScheduler/`                                                                         |                                                                                                                                                |
| Waarneembaarheid en export | `monitoring/`, `logExport/`, `webhooks/`, `audit/`, `events/`                                                       | [LOG-EXPORT.md](../frameworks/LOG-EXPORT.md), [WEBHOOKS.md](../frameworks/WEBHOOKS.md)                                                         |
| CLI en IDE integratie      | `cliTools/`, `cli-helper/`, `vscode/`, `inspector/`, `versionManager/`                                              | [CLI-TOOLS.md](../reference/CLI-TOOLS.md), [VSCODE-COPILOT.md](../guides/VSCODE-COPILOT.md)                                                    |
| Contextbronnen             | `localCorpus/`, `notion/`, `obsidian/`                                                                              | [LOCAL_CORPUS_CONTEXT](../frameworks/LOCAL_CORPUS_CONTEXT.md)                                                                                  |
| Andere kenmerken           | `evals/`, `playground/`, `gamification/`, `telegram/`, `conductor/`, `batches/`, `deploy/`, `transfer/`, `sync/`, … | [EVALS.md](../frameworks/EVALS.md), [PLAYGROUND_STUDIO.md](../frameworks/PLAYGROUND_STUDIO.md)                                                 |

Modules op het hoogste niveau die de moeite waard zijn om te weten:

| Bestand                                                        | Doel                                                              |
| -------------------------------------------------------------- | ----------------------------------------------------------------- |
| `cacheLayer.ts`, `idempotencyLayer.ts`, `semanticCache.ts`     | Antwoordcaching en idempotentie                                   |
| `webhookDispatcher.ts`                                         | Door HMAC ondertekende webhooklevering                            |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts` | Tunnelbeheerders                                                  |
| `tokenHealthCheck*.ts`, `tokenRefreshCircuit.ts`               | Statuscontroles van achtergrondreferenties en vernieuwingscircuit |
| `streamingPiiTransform.ts`, `streamingCredentialTransform.ts`  | Streaming van reactie-ontsmettingsmiddelen                        |
| `gracefulShutdown.ts`, `serverLifecycle.ts`                    | Proceslevenscyclus                                                |
| `*.stub.ts`                                                    | Build-profielstubs vervangen door aliassen in `next.config.mjs`   |

### `src/lib/db/` — database

| Pad                   | Doel                                                                                                                                    |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`          | `getDbInstance()` singleton (WAL journaling)                                                                                            |
| `db/migrations/`      | Genummerde, idempotente `.sql` migraties (236 bestanden op het moment van schrijven; `check-migration-numbering.mjs` bewaakt nummering) |
| `db/migrationRunner/` | Migratie loper                                                                                                                          |
| `db/adapters/`        | SQLite stuurprogramma-adapters (better-sqlite3, knooppunt:sqlite, bun:sqlite, sql.js)                                                   |
| `db/repositories/`    | SQLite repository-implementaties (combo's, voorinstellingen voor speeltuinen, routeringsconfiguratie)                                   |
| `db/<domain>.ts`      | Ongeveer 175 domeinmodules (providers, combo's, apiKeys, instellingen, gebruik, …) — importeert deze altijd rechtstreeks                |

### `src/domain/`, `src/server/`, `src/shared/`

| Pad                                                            | Doel                                                                                                                                                       |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain/policyEngine.ts`                                       | Beleidsmotor                                                                                                                                               |
| `domain/fallbackPolicy.ts`, `lockoutPolicy.ts`, `costRules.ts` | Fallback-beslissingen, lock-outbeleid, kostenregels                                                                                                        |
| `domain/quotaCache*.ts`, `quotaSnapshot*.ts`                   | Quotumcache en persistentie van momentopnamen                                                                                                              |
| `domain/assessment/`                                           | Modelbeoordeling (beoordelaar, categoriseerder, zelfgenezer)                                                                                               |
| `server/authz/`                                                | Autorisatie pijpleiding en routebewaker (`routeGuard.ts`) — zie [AUTHZ_GUIDE.md](AUTHZ_GUIDE.md), [ROUTE_GUARD_TIERS.md](../security/ROUTE_GUARD_TIERS.md) |
| `server/origin/`, `server/cors/`                               | Public/MCP/WS oorsprongresolutie en CORS — zie [CORS.md](../security/CORS.md)                                                                              |
| `server/ws/`                                                   | Live dashboard WebSocket server                                                                                                                            |
| `shared/components/`                                           | Dashboardcomponenten en adapters via `packages/ui-kit` — zie [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)                                                          |
| `shared/constants/`                                            | Providercatalogus (`providers.ts`), routeringsstrategieën, CLI tools, icon map, upstream header denylist, ...                                              |
| `shared/validation/`                                           | Zod -schema's en validatiehelpers                                                                                                                          |
| `shared/utils/`                                                | Stroomonderbreker, API-sleutelauthenticatie, time-outs voor ophalen, functievlaggen, ...                                                                   |
| `shared/middleware/`, `network/`, `services/`, `hooks/`        | Middleware voor chattoegang, netwerkhelpers, klantenservice, React hooks                                                                                   |

---

## `open-sse/` — streaming engine-werkruimte

npm werkruimte `@omniroute/open-sse` (ongeveer 2.390 bijgehouden bestanden). Het voert de verzoekverwerking en de uitvoering van de provider uit. Overzicht: [OPEN_SSE_ARCHITECTURE.md](../frameworks/OPEN_SSE_ARCHITECTURE.md).

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

| Pad                                                                                            | Doel                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combo.ts` + `combo/`                                                                          | Combo-routeringsstrategieën — zie [AUTO-COMBO.md](../routing/AUTO-COMBO.md)                                                                                   |
| `autoCombo/`                                                                                   | Auto-Combo-score- en moduspakketten                                                                                                                           |
| `accountFallback.ts` + `accountFallback/`                                                      | Verbindingsafkoeling en modelvergrendeling — zie [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                   |
| `rateLimitManager.ts` + `rateLimitManager/`                                                    | Tracking van snelheidslimieten en parseren van headers                                                                                                        |
| `compression/`                                                                                 | Compressiemotoren (`engines/`), regelpakketten (`rules/`), `eval/`, `harness/`, `riskGate/` — zie [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) |
| `tokenRefresh/`, `usage/`, `cache/`, `admission/`, `sessionPool/`, `codexAccount/`, `routing/` | Tokenvernieuwing, gebruiksaccounting, caching, toegangslijnen, sessiepools, Codex accounts, routeringshelpers                                                 |
| `__tests__/`                                                                                   | Co-located Vitest suites (verzameld door de Vitest configuraties)                                                                                             |
| `AGENTS.md`                                                                                    | Agenthandleiding voor deze map                                                                                                                                |

Patroon: een grote module `X.ts` naast een map `X/` betekent dat de module is opgesplitst in kleinere bestanden (`handlers/chatCore.ts` + `handlers/chatCore/`, `services/combo.ts` + `services/combo/`).

### `open-sse/mcp-server/`

| Pad                   | Doel                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------- |
| `server.ts`           | MCP -serverlevenscyclus                                                                                 |
| `httpTransport.ts`    | Streambare HTTP en SSE transporten                                                                      |
| `scopeEnforcement.ts` | Controles per tool                                                                                      |
| `audit.ts`            | Auditregistratie van toolcalls                                                                          |
| `schemas/`            | Gereedschapsdefinities en -bereiken                                                                     |
| `tools/`              | Tool-implementaties (geheugen, vaardigheden, compressie, …)                                             |
| `toolSearch/`         | Gereedschap zoeken                                                                                      |
| `README.md`           | Interne architectuurnotities; de volledige catalogus is in [MCP-SERVER.md](../frameworks/MCP-SERVER.md) |

---

## `packages/` — npm-werkruimten

| Pad                      | Doel                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/ui-kit/`       | `@omniroute/ui-kit`: door de leverancier verstrekte momentopname van de Keak CI UI Kit, geconsumeerd als bron. `UPSTREAM.md` pint de upstream commit, `PATCHES.md` geeft een overzicht van lokale patches. `src/` wordt alleen gesynchroniseerd door `scripts/dev/sync-ui-kit.sh` en bewaakt door `npm run check:ui-kit-snapshot`. Zie [DESIGN_SYSTEM](DESIGN_SYSTEM.md) |
| `packages/browser-pool/` | `@omniroute/browser-pool`: browserpoolinterfaces en implementatie (`packages/browser-pool/src/index.ts`, `packages/browser-pool/src/interfaces.ts`). Vermeld in `workspaces`; de runtime browserpool die door de gateway wordt gebruikt, bevindt zich in `open-sse/services/`                                                                                            |

## `@omniroute/` — afzonderlijk uitgegeven pakketten

Dit zijn geen npm-werkruimten. Elk heeft zijn eigen `package.json` en lockfile; de map wordt verzonden in de `omniroute` tarball (`files: ["@omniroute/"]`).

| Pad                              | Doel                                                                                                                                                  |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@omniroute/opencode-plugin/`    | OpenCode -plug-in (modeldetectie, `/connect` -authenticatie); gebruikt door `omniroute setup-opencode` — zie [OPENCODE.md](../frameworks/OPENCODE.md) |
| `@omniroute/opencode-plugin-v2/` | OpenCode plug-in voor de v2 Promise API — zie [OPENCODE-V2-PLUGIN.md](../guides/OPENCODE-V2-PLUGIN.md)                                                |
| `@omniroute/opencode-provider/`  | Statische configuratiegenerator; gemarkeerd als verouderd in zijn eigen `package.json` ten gunste van `opencode-plugin`                               |

---

## `bin/` — CLI en ops-scripts

| Pad                                                                         | Doel                                                                                                 |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                             | Hoofd CLI -invoer (`omniroute serve`, `setup`, `doctor`, `providers`, `combo`, ...)                  |
| `reset-password.mjs`                                                        | `omniroute-reset-password` binair                                                                    |
| `mcp-server.mjs`                                                            | MCP stdio-ingangspunt                                                                                |
| `antigravity-bridge.mjs`, `chatgpt-web-codex-mcp.mjs`                       | Hulpbrug / MCP instappunten                                                                          |
| `aliasResolver.mjs`, `aliasResolverHook.mjs`                                | ESM solve hook die tsconfig-padaliassen voor globale installaties in kaart brengt                    |
| `nodeRuntimeSupport.mjs`                                                    | Ondersteunde Node.js versiecontrole                                                                  |
| `snapshot-data.sh`, `restore-data.sh`, `restore-policies.sh`, `rollback.sh` | Scripts voor incidentherstel zelf hosten (deel `_ops-common.sh`)                                     |
| `cold-start-bench.sh`                                                       | Benchmark voor koude start — zie [PERF_BASELINE.md](../ops/PERF_BASELINE.md)                         |
| `cli/commands/`                                                             | Eén module per CLI -opdracht (ongeveer 100, inclusief de `setup-*` integraties)                      |
| `cli/api-commands/`                                                         | Gegenereerd uit `docs/openapi.yaml` door `npm run build:cli-api` — niet bewerken                     |
| `cli/locales/`                                                              | CLI -berichtencatalogi (67 talen)                                                                    |
| `cli/tui/`, `cli/tui-components/`                                           | Terminal UI                                                                                          |
| `cli/tray/`                                                                 | Systeemvak en autostart (Windows PowerShell backend, systray op macOS/Linux)                         |
| `cli/runtime/`                                                              | Native runtime-resolutie (`sqliteRuntime.mjs`, `magicBytes.mjs`), processupervisor                   |
| `cli/*.mjs`                                                                 | Gedeelde helpers (args, API client, gegevensmap, encryptie, provideropslag, instellingenopslag, ...) |
| `cli/README.md`, `cli/CONVENTIONS.md`                                       | CLI internals en conventies                                                                          |

Zie [CLI-TOOLS.md](../reference/CLI-TOOLS.md) en [CLI-COMPANION.md](../guides/CLI-COMPANION.md).

## `electron/` — desktop-app

| Pad                                                        | Doel                                                                                        |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `main.js`                                                  | Electron hoofdproces (venster, embedded server, lade, updates)                              |
| `preload.js`                                               | IPC -brug blootgesteld aan de renderer                                                      |
| `lib/`                                                     | Vensterlevenscyclus, servergereedheid, gezondheidswaakhond, voorkeuren voor externe servers |
| `remoteServerPrompt*.js`, `assets/remoteServerPrompt.html` | Promptvenster voor externe server                                                           |
| `processTree.js`, `sqlite-inspection.js`                   | Kinderprocesopruiming en SQLite inspectiehulpen                                             |
| `package.json` / `package-lock.json`                       | elektronen-builder configuratie en Electron afhankelijkheden                                |
| `assets/`                                                  | App- en systeemvakpictogrammen (`.ico`, `.icns`, `.png`)                                    |
| `README.md`                                                | Interne opmerkingen — zie [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)                  |

## `public/` — statische activa

| Pad                                         | Doel                                                                                                                |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `providers/`                                | Providerlogo's geladen op id (`/providers/<id>.svg`); herkomst in `config/quality/provider-assets-provenance.jsonl` |
| `favicon.*`, `apple-touch-icon.*`, `icon-*` | Browser- en PWA pictogrammen                                                                                        |
| `sw.js`                                     | Servicemedewerker — zie [PWA_GUIDE.md](../guides/PWA_GUIDE.md)                                                      |
| `openapi.yaml`                              | Kopie van `docs/openapi.yaml` gegenereerd door `npm run gen:public-openapi`                                         |
| `images/`, `sponsors/`, `deyin.svg`         | Tier-flow diagrammen, sponsorbanner, README artwork                                                                 |

## `skills/` — Agentvaardigheden

46 vaardigheden, elk één map met een `SKILL.md` (`cli-*`, `omni-*`, `config-codex-cli`, `ponytail`), plus `skills/README.md`. `src/lib/agentSkills/catalog.ts` leest ze tijdens runtime en stelt ze bloot via `/api/agent-skills`, MCP en A2A. De meeste manifesten worden gegenereerd door `src/lib/agentSkills/generator.ts` (`scripts/skills/generate-agent-skills.mjs`; `npm run check:agent-skills-sync` controleert op drift). Zie [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md).

---

## `scripts/` — bouwen, poorten en gereedschap

Ongeveer 435 bijgehouden bestanden. Nieuwe scripts worden in een van de door `AGENTS.md` toegestane submappen geplaatst; eenmalige code gaat in `scripts/ad-hoc/`.

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

Veelgebruikte toegangspunten:

| Script                                                              | Doel                                                                                                      |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `dev/run-next.mjs`                                                  | `npm run dev` / `npm start` loper                                                                         |
| `build/build-next-isolated.mjs`                                     | `npm run build` (zelfstandige Next.js -build)                                                             |
| `build/prepublish.ts`                                               | `npm run build:cli`: assembleert de npm `dist/`                                                           |
| `build/postinstall.mjs`                                             | npm `postinstall` haak                                                                                    |
| `build/publicOpenApi.mjs`                                           | `npm run gen:public-openapi`                                                                              |
| `docs/gen-provider-reference.ts`                                    | `npm run gen:provider-reference` (regenereert PROVIDER_REFERENCE.md)                                      |
| `docs/gen-openapi-module.mjs`                                       | `prebuild:docs` (genereert `src/app/docs/lib/openapi.generated.ts`)                                       |
| `i18n/run-translation.mjs`                                          | `npm run i18n:run` (docs-spiegels)                                                                        |
| `i18n/generate-route-namespaces.mjs`                                | `npm run gen:i18n-routes`                                                                                 |
| `release/aggregate-changelog.mjs`                                   | Vouwt `changelog.d/` fragmenten tot `CHANGELOG.md`                                                        |
| `check/check-fabricated-docs.mjs`                                   | `npm run check:fabricated-docs` (doc-nauwkeurigheidspoort)                                                |
| `check/check-tracked-artifacts.mjs`                                 | `npm run check:tracked-artifacts` (blokkeert bijgehouden root- `_*` -paden)                               |
| `quality/check-quality-ratchet.mjs`                                 | `npm run quality:ratchet` (metrische ratel tegen `config/quality/`)                                       |
| `dev/run-playwright-tests.mjs`                                      | `npm run test:e2e`                                                                                        |
| `dev/run-protocol-clients-tests.mjs`, `dev/run-ecosystem-tests.mjs` | `npm run test:protocols:e2e`, `npm run test:ecosystem`                                                    |
| `dev/new-worktree.sh`                                               | Creëert een geïsoleerde ontwikkelingswerkboom — zie [WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md) |
| `dev/sync-ui-kit.sh`                                                | Synchroniseert `packages/ui-kit/src` met een vastgezette upstream-commit                                  |

Poortinventaris en beleid: [QUALITY_GATES.md](QUALITY_GATES.md).

## `config/` — versieconfiguratie en poortstatus

| Pad                                      | Doel                                                                                                                            |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `i18n.json` / `i18n-schema.json`         | Ondersteunde landinstellingen (bron van het aantal landinstellingen) en hun schema                                              |
| `payloadRules.json`                      | Regels voor upstream-payload (`open-sse/services/payloadRules.ts`)                                                              |
| `cli-tools-manifest.json`                | Manifest van integreerbare CLI tools (`bin/cli/cli-manifest.mjs`)                                                               |
| `alibaba-free-tier-allowlist.json`       | Alibaba free-tier model toelatingslijst                                                                                         |
| `ci/toolchain.json`                      | CI toolchain-versies                                                                                                            |
| `quality/quality-baseline.json`          | Multi-metrische ratelbasislijn (dekking, waarschuwingen, duplicatie, ...)                                                       |
| `quality/*-baseline.json`                | Bevroren basislijnen voor individuele poorten (complexiteit, duplicatie, bestandsgrootte, typecheck-plakken, testdetectie, ...) |
| `quality/*-allowlist.json`               | Gate-toelatingslijsten (afhankelijkheden, licenties, AI toeschrijving, tests voor vergeten broers en zussen, ...)               |
| `quality/eslint-suppressions.json`       | Bevroren ESLint onderdrukkingen toegepast door `npm run lint`                                                                   |
| `quality/gate-manifest.json`             | Poortmanifest gecontroleerd door `scripts/quality/gate-manifest.mjs`                                                            |
| `quality/vitest-exclusions.json`         | Quarantaine-inventaris voor `vitest.quarantine.config.ts`                                                                       |
| `quality/skill-templates/`               | Canonieke SKILL.md sjablonen gecontroleerd door `scripts/quality/check-skill-contract.mjs`                                      |
| `quality/release-acceptance.schema.json` | Bewijsschema vrijgave-acceptatie — zie [QUALITY_EVIDENCE_CONTRACT.md](QUALITY_EVIDENCE_CONTRACT.md)                             |
| `release/`                               | Changelog-afstemmingen en het wreq-js native manifest, licentie-inventaris en mededelingen                                      |

## `changelog.d/` — changelog-fragmenten

Een PR voegt één fragment toe in plaats van `CHANGELOG.md` te bewerken: `features/`, `fixes/` of `maintenance/`, genaamd `<PR-number>-<slug>.md`. Op het moment van uitgave vouwt `scripts/release/aggregate-changelog.mjs` ze in `CHANGELOG.md` en verwijdert ze; `npm run check:changelog-integrity` valideert ze. Details in `changelog.d/README.md`.

---

## `docs/` — openbare documentatie

Secties vermeld in `source.config.ts` worden gecompileerd in de `/docs` site (met uitzondering van een paar beveiligingspagina's die alleen toegankelijk zijn voor operators); `docs/meta.json` stelt de volgorde van de zijbalk in. Begin bij [README.md](../README.md).

| Pad                          | Inhoud                                                                                                                                                                       |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getting-started/`           | Snelstartgids, zelfhosting, providers, gratis niveaus, Auto-Combo en webcookiehandleidingen                                                                                  |
| `guides/`                    | Handleidingen voor operators en ontwikkelaars: setup, Docker, Electron, PWA, Termux, CLIs, i18n, probleemoplossing, gebruikershandleiding                                    |
| `architecture/`              | Architectuur, codebase-referentie, wijzigingsrecepten, authz, veerkracht, kwaliteitspoorten, ontwerpsysteem, deze kaart                                                      |
| `reference/`                 | API referentie, omgevingsvariabelen, functievlaggen, CLI tools, gratis lagen, gegenereerde providerreferentie, verwijderde providers                                         |
| `frameworks/`                | MCP, A2A, ACP, vaardigheden, geheugen, plug-ins, cloudagents, webhooks, evaluaties, logexport, radar, speeltuin, ...                                                         |
| `routing/`                   | Auto-Combo, redenering replay/routing, quota delen, abonnementsladder, strikte nulkosten, …                                                                                  |
| `security/`                  | Vangrails, foutopschoning, CORS, SSO, uitgaand beleid, routebewakingsniveaus, toeleveringsketen, ...                                                                         |
| `compression/`               | Compressiegids, motoren, RTK, regelformaat, taalpakketten, contextbewerking                                                                                                  |
| `ops/`                       | Vrijgavestroom, vertakkingen, samenvoegtrein, implementatie (VM, Fly.io, Kubernetes), database, proxy's, werkbomen, details van harde regels                                 |
| `providers/`                 | Handleidingen per provider (Claude Code, ChatGPT Web, Cursor, GitHub Copilot, …)                                                                                             |
| `comparison/`                | OmniRoute vergeleken met alternatieven                                                                                                                                       |
| `integrations/`              | Integratie-aantekeningen (fal.ai native, MarkItDown MCP); niet gecompileerd in `/docs`                                                                                       |
| `openapi.yaml`               | OpenAPI bron; feeds `src/app/docs/lib/openapi.generated.ts`, `public/openapi.yaml` en `bin/cli/api-commands/`                                                                |
| `diagrams/`                  | Zeemeerminbronnen (`.mmd`), weergegeven SVGs (`exported/`) en README SVGs uit `scripts/docs/gen-readme-*`                                                                    |
| `assets/`                    | Taalvlag SVGs en andere README middelen                                                                                                                                      |
| `screenshots/`               | Screenshots gebruikt door de README en gidsen                                                                                                                                |
| `i18n/`                      | Vertaalde spiegelservers: één map per landinstelling (66) met hoofddocumenten en een `docs/` subset; geproduceerd door `npm run i18n:run` — zie [I18N.md](../guides/I18N.md) |
| `*.md` op het hoogste niveau | `README.md` (doc-index), `DEVELOPER-ENVIRONMENT.md` en een paar op zichzelf staande notities                                                                                 |

Belangrijkste toegangspunten: [ARCHITECTURE.md](ARCHITECTURE.md), [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md), [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md), [ENVIRONMENT.md](../reference/ENVIRONMENT.md), [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) (gegenereerd door `npm run gen:provider-reference`).

---

## `tests/` — -testsuites

Ongeveer 9.670 bijgehouden bestanden. Testbestanden horen hier, niet in de hoofdmap van het project. Uitzonderingen: de naast elkaar geplaatste `__tests__/` mappen in `src/` en `open-sse/` die de Vitest configuraties verzamelen.

| Pad                                                    | Inhoud                                                                                                                                                                                       | Loper                                                                                   |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `tests/unit/`                                          | Eenheidstests (meer dan 9.000 bestanden): veel op het hoogste niveau, plus domeinmappen (`ui/`, `compression/`, `build/`, `guardrails/`, `db/`, `cli/`, `api/`, `dashboard/`, `combo/`, ...) | Knooppunt-testloper (`npm run test:unit`); `*.tsx` via `test:vitest:ui`                 |
| `tests/unit/serial/`                                   | CPU-gevoelige tests worden uitgevoerd met gelijktijdigheid 1                                                                                                                                 | `npm run test:unit:serial`                                                              |
| `tests/unit/autoCombo/`, `tests/unit/api/**/*.spec.ts` | Vitest suites in de eenheidsboom                                                                                                                                                             | `npm run test:vitest`                                                                   |
| `tests/integration/`                                   | Multimodule- en DB -integratietesten; `combo-matrix/`, `combo-live/`, `services/`                                                                                                            | `npm run test:integration`, `test:combo:matrix`, `test:combo:live`, `test:services:int` |
| `tests/e2e/`                                           | Playwright `*.spec.ts` + live suites `ecosystem.test.ts`, `protocol-clients.test.ts`                                                                                                         | `npm run test:e2e`, `test:ecosystem`, `test:protocols:e2e`                              |
| `tests/boundary/`                                      | `*.live.test.ts` tegen een actief exemplaar                                                                                                                                                  | `npm run test:boundary:live`                                                            |
| `tests/homolog/`                                       | Homologatiesuites (`api/`, `ui/` met zijn eigen Playwright configuratie)                                                                                                                     | `npm run homolog` — zie [HOMOLOGATION.md](../ops/HOMOLOGATION.md)                       |
| `tests/load/`                                          | Scripts laden en weken (k6)                                                                                                                                                                  | Nachtelijke veerkrachtworkflow                                                          |
| `tests/_setup/`                                        | `--import` / setup-bestanden (geïsoleerde gegevensmap, egress guard, Vitest UI polyfills)                                                                                                    | Geladen door de lopers                                                                  |
| `tests/_helpers/`, `tests/helpers/`                    | Gedeelde testhelpers (golden snapshots, managementsessie, …)                                                                                                                                 | Geïmporteerd door tests                                                                 |
| `tests/fixtures/`                                      | Armatuurgegevens en kindproces-armaturen                                                                                                                                                     | Geïmporteerd door tests                                                                 |
| `tests/snapshots/`                                     | Gouden bestanden voor `tests/helpers/goldenSnapshot.ts`                                                                                                                                      | Geïmporteerd door tests                                                                 |
| `tests/manual/`                                        | `.http` bestanden voor handmatige REST oproepen                                                                                                                                              | Handmatig                                                                               |
| `tests/security/`                                      | Beveiligingshell-scripts                                                                                                                                                                     | Handmatige / unit-testarmaturen                                                         |
| `tests/types/`                                         | Contractarmaturen op typeniveau                                                                                                                                                              | —                                                                                       |

Volledige matrix: `CONTRIBUTING.md` → "Tests uitvoeren" en [COVERAGE_PLAN.md](../ops/COVERAGE_PLAN.md).

---

## `deploy/` — Kubernetes

| Pad                                                | Doel                                                                                                               |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `deploy/helm/omniroute/`                           | Helm-diagram (`Chart.yaml`, `values.yaml`, sjablonen voor implementatie, service, ingress, PVC, geheim, configmap) |
| `deploy/kubernetes/base/`                          | Kustomize-basis (naamruimte, implementatie, service, PVC, configmap, `secret.example.yaml`)                        |
| `deploy/kubernetes/overlays/k3s/`, `overlays/k8s/` | Clusterspecifieke overlays (ingang, opslagklasse, bronnen, tests)                                                  |

Zie [KUBERNETES_DEPLOYMENT_GUIDE](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md)

## `docker/` — hulpafbeeldingen

| Pad                                 | Doel                                                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `docker/chatgpt-web-codex-browser/` | Headless browserafbeelding met een CDP proxy voor de ChatGPT webuitvoerder — zie [CHATGPT_WEB.md](../providers/CHATGPT_WEB.md) |
| `docker/devin-bridge/`              | Devin bridge-afbeelding, bestand opstellen, bespottingen en netwerkwachter                                                     |
| `docker/vnc-browser/`               | Chromium met VNC voor interactieve browsersessies                                                                              |

De hoofdafbeelding is de wortel `Dockerfile`; zie [DOCKER_GUIDE](../guides/DOCKER_GUIDE.md)

## `contrib/` — community-recepten (niet officieel ondersteund)

| Pad                     | Doel                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `contrib/podman/`       | Podman quadlets (container, volume, netwerk, Redis)                                                                            |
| `contrib/vps/`          | VPS `compose.yaml` + `.env.example`                                                                                            |
| `contrib/windows/`      | `.bat` -draagraketten voor het uitvoeren van een Windows -kassa                                                                |
| `contrib/session-sync/` | README for a third-party session-sync browser extension — see [SESSION-SYNC-EXTENSION.md](../guides/SESSION-SYNC-EXTENSION.md) |

## `examples/`

| Pad                             | Doel                                                                       |
| ------------------------------- | -------------------------------------------------------------------------- |
| `examples/omniroute-cmd-hello/` | Minimale opdrachtplug- — zie [PLUGINS.md](../frameworks/PLUGINS.md)        |
| `examples/plugins/`             | Voorbeeldplug-ins: langfuse, request-logger, thema-manager, welkomstbanner |
| `examples/quickstart/`          | Clientfragmenten: curl, Node.js (axios), PHP, Python                       |

---

## `.github/` — GitHub integratie

| Pad                                                          | Doel                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`                                         | CI (`ci.yml`, `quality.yml`, `build.yml`), beveiligingsscans (`codeql.yml`, `semgrep.yml`, `scorecard.yml`, `dast-smoke.yml`), geplande `nightly-*.yml` suites, publicatie (`npm-publish.yml`, `docker-publish.yml`, `electron-release.yml`), release- en onderhoudsworkflows |
| `.github/actions/npm-ci-retry/`                              | Samengestelde actie: `npm ci` met cache en opnieuw proberen                                                                                                                                                                                                                   |
| `.github/actions/prepare-unit-storage/`                      | Samengestelde actie: maakt runner-schijfruimte vrij en installeert vervolgens afhankelijkheden                                                                                                                                                                                |
| `.github/ISSUE_TEMPLATE/`                                    | Probleemformulieren voor bugs, functies en testdekking                                                                                                                                                                                                                        |
| `.github/pull_request_template.md`, `PULL_REQUEST_TEMPLATE/` | Standaard PR plus bugfix/feature varianten                                                                                                                                                                                                                                    |
| `.github/CODEOWNERS`, `FUNDING.yml`, `dependabot.yml`        | Code-eigenaren, sponsorlinks, afhankelijkheidsupdates                                                                                                                                                                                                                         |
| `.github/labels.yml`                                         | Labeldefinities toegepast door `npm run labels:sync`                                                                                                                                                                                                                          |
| `.github/copilot-instructions.md`                            | GitHub Copilot instructies (een agent-instructieoppervlak)                                                                                                                                                                                                                    |

CI -takenkaart: [QUALITY_GATES.md](QUALITY_GATES.md).

## `.husky/` — git haken

| Bestand      | Doel                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pre-commit` | Git-identiteitscontrole, lint-staged, gate-manifest, synchronisatie van documenten, elk budget, ratchet op typeschaal, bijgehouden artefacten en momentopnamecontroles van de ui-kit |
| `commit-msg` | `scripts/check/check-ai-attribution.mjs` in het commit-bericht                                                                                                                       |
| `pre-push`   | Opzettelijk licht: een PATH/npm sanity check die op 0 uitkomt                                                                                                                        |

De hook-runtime in `.husky/_/` wordt gegenereerd tijdens de installatie en wordt niet bijgehouden.

---

## Navigatietips

- **Nieuwe bijdrager?** `CONTRIBUTING.md` → `AGENTS.md` → [ARCHITECTURE.md](ARCHITECTURE.md) → [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md).
- **Iets gemeenschappelijks veranderen** (provider, route, DB module, MCP tool, A2A vaardigheid)? Volg [MODIFICATION_SCENARIOS](MODIFICATION_SCENARIOS.md)
- **Een aanbieder toevoegen?** Controleer eerst [REMOVED_PROVIDERS.md](../reference/REMOVED_PROVIDERS.md) en controleer vervolgens [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md).
- **Lokaal draaien?** [SETUP_GUIDE](../guides/SETUP_GUIDE.md)
- **Implementeren?** [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [SELF_HOST_GUIDE.md](../getting-started/SELF_HOST_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).
- **Vrijgeven?** [RELEASE_CHECKLIST](../ops/RELEASE_CHECKLIST.md)
- **Een kwaliteitspoort mislukt?** [QUALITY_GATES.md](QUALITY_GATES.md) en [QUALITY_GATE_PLAYBOOK.md](../ops/QUALITY_GATE_PLAYBOOK.md).
