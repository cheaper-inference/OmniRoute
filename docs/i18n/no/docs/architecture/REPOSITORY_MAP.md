# Repository Map (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Hva bor hvor: hver sporet topp-nivå katalog og rotfil, med en linje hensikt.** Sist oppdatert: 2026-11-13 (OmniRoute v3.8.54)
>
> Bruk dette kartet til å finne veien rundt i kodebasen, og følg deretter koblingene til de dedikerte dokumentene. Filtall ble målt med `git ls-files` på datoen ovenfor. De endres med nesten hver utgivelse, så behandle dem som størrelsesordener.

## Tre på toppnivå

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

Lokale, genererte eller private stier (alle gitignored, aldri forpliktet, ikke beskrevet nærmere):

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

Alle sporede filer ved depotroten (`git ls-files | grep -v /`), gruppert etter funksjon.

### Prosjektdokumentasjon

| Fil                      | Hensikt                                                                       |
| ------------------------ | ----------------------------------------------------------------------------- |
| `README.md`              | Landingsside: funksjonsoversikt, hurtigstart, installasjonsmetoder            |
| `CHANGELOG.md`           | Endringslogg per utgivelse (fragmenter fra `changelog.d/` er brettet inn her) |
| `ROADMAP.md`             | Offentlig veikart                                                             |
| `LICENSE`                | MIT lisens                                                                    |
| `THIRD_PARTY_NOTICES.md` | Merknader for medfølgende tredjepartskode (for eksempel wreq-js-bindingene)   |
| `CONTRIBUTING.md`        | Bidragsyterguide: oppsett, konvensjonelle forpliktelser, testmatrise, PR flow |
| `SECURITY.md`            | Retningslinjer for sårbarhetsrapportering                                     |
| `CODE_OF_CONDUCT.md`     | Samfunnsatferdsforventninger                                                  |
| `llm.txt`                | Vanlig tekstprosjektsammendrag for LLM crawlere og assistenter                |

### AI-assistentinstruksjoner

| Fil         | Hensikt                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------- |
| `AGENTS.md` | Enkelt kilde til sannhet for hver AI assistent: konvensjoner, kvalitetsporter, harde regler |
| `CLAUDE.md` | Claude-kodespesifikke deltaer; importerer `AGENTS.md`                                       |
| `GEMINI.md` | Gemini-spesifikke deltaer; peker tilbake til `AGENTS.md`                                    |

Nestede guider finnes også ved siden av koden de beskriver: `open-sse/services/AGENTS.md` og `src/lib/db/AGENTS.md`.

### Pakkemanifester og nodeverktøykjede

| Fil                        | Hensikt                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| `package.json`             | npm-manifest: skript, avhengigheter, `engines`, `workspaces`, publisert `files`          |
| `package-lock.json`        | Låst avhengighetstre                                                                     |
| `pnpm-workspace.yaml`      | pnpm arbeidsområdeliste (`packages/*`, `open-sse`) og godkjenningsliste for native build |
| `.npmrc` / `.npmignore`    | npm config og publiser ekskluderinger                                                    |
| `.node-version` / `.nvmrc` | Nodeversjonspinner for versjonsadministratorer                                           |
| `flake.nix` / `flake.lock` | Nix dev shell og låsen                                                                   |
| `Makefile`                 | `make` snarveier som delegerer til npm-skriptene                                         |

### TypeScript, Next.js og docs build

| Fil                                       | Hensikt                                                                           |
| ----------------------------------------- | --------------------------------------------------------------------------------- |
| `tsconfig.json`                           | Base TypeScript config og banealiaser (`@/*`, `@omniroute/open-sse`)              |
| `tsconfig.typecheck-core.json`            | `npm run typecheck:core` skive                                                    |
| `tsconfig.typecheck-noimplicit-core.json` | `npm run typecheck:noimplicit:core` (streng `noImplicitAny`) skive                |
| `tsconfig.typecheck-api.json`             | API-rutetypesjekk-seksjon (`scripts/check/check-api-typecheck.mjs`)               |
| `tsconfig.typecheck-dashboard.json`       | Dashboard typecheck skive (`npm run check:dashboard-typecheck`)                   |
| `tsconfig.build.json`                     | Produksjonstypekontroll (`npm run typecheck:build`, `check:build-typecheck`)      |
| `tsconfig.mitm.json`                      | MITM byggekonfigurasjon brukt av `scripts/build/buildMitm.mjs`                    |
| `next.config.mjs`                         | Next.js 16 config (frittstående utdata, byggeprofilaliaser)                       |
| `source.config.ts`                        | Fumadocs `defineDocs` config: hvilke `docs/` seksjoner som kompileres til `/docs` |
| `postcss.config.mjs`                      | PostCSS / Tailwind rørledning                                                     |

### Lo og formatering

| Fil                                       | Hensikt                                                                                                        |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `eslint.config.mjs`                       | Main ESLint flat config (`npm run lint`, med `config/quality/eslint-suppressions.json`)                        |
| `eslint.complexity-ratchets.config.mjs`   | Frittstående konfigurasjon som brukes av skrallene for kompleksitet og kognitiv kompleksitet i ett ESLint pass |
| `eslint.complexity.config.mjs`            | Frittstående konfigurasjon med bare kjernen `complexity` + `max-lines-per-function` (brukes av tester)         |
| `prettier.config.mjs` / `.prettierignore` | Prettier -regler og unntak                                                                                     |
| `.editorconfig`                           | Redaktørstandarder (innrykk med to mellomrom)                                                                  |
| `.markdownlint.json`                      | Rådgivende markdown lo (`npm run lint:md`)                                                                     |
| `.vale.ini`                               | Rådgivende prosa lo (`npm run lint:prose`), vokabular i `.vale/`                                               |

### Tester, evaluering og dekning

| Fil                           | Hensikt                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| `vitest.config.ts`            | jsdom Vitest suite: `npm run test:vitest:ui` (dashboard `.tsx`, kroker, memory/skills tester)   |
| `vitest.mcp.config.ts`        | Node Vitest suite: `npm run test:vitest` (MCP server, autoCombo, combo, API `.spec.ts`)         |
| `vitest.quarantine.config.ts` | Kjører filene i karantene som er oppført i `config/quality/vitest-exclusions.json`              |
| `vitest.e2e-live.config.ts`   | Live-server Vitest suiter (`tests/e2e/ecosystem.test.ts`, `tests/e2e/protocol-clients.test.ts`) |
| `playwright.config.ts`        | Playwright E2E (`tests/e2e/**/*.spec.ts`, `npm run test:e2e`)                                   |
| `stryker.conf.mjs`            | Stryker mutasjonstesting (`npm run test:mutation`; beregner `tap.testFiles` fra `mutate`)       |
| `stryker.disablebail.mjs`     | Stryker-variant uten kausjon, for test-redundansmåling                                          |
| `promptfooconfig.yaml`        | promptfoo LLM-sikkerhetssuite                                                                   |
| `codecov.yml`                 | Codecov patch-dekningsinnstillinger                                                             |

### Docker og utplassering

| Fil                               | Hensikt                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------ |
| `Dockerfile`                      | Flertrinnsbilde (`builder` → `runner-base` → `runner-web` / `runner-cli*`)     |
| `Dockerfile.bun`                  | Alternativt bilde på Bun runtime (bygget av `docker-publish.yml`)              |
| `docker-compose.yml`              | Standardkomponering med profiler (base, web, cli, vert, minne, cliproxyapi, …) |
| `docker-compose.prod.yml`         | Separat produksjonsøyeblikksbildeforekomst på port 20130                       |
| `docker-compose.selfhost.yml`     | En-kommando loopback selvvert (par med `.env.selfhost.example`)                |
| `docker-compose.ollama-local.yml` | Docker OmniRoute snakker med en host-innfødt Ollama                            |
| `.dockerignore`                   | Docker byggekontekstekskluderinger                                             |
| `fly.toml`                        | Fly.io app-konfigurasjon (port 20128, `/data` volum)                           |

### Sikkerhet, forsyningskjede og depotroboter

| Fil                                          | Hensikt                                                                          |
| -------------------------------------------- | -------------------------------------------------------------------------------- |
| `.gitleaks.toml`                             | gitleaks hemmelige skanningsregler og godkjenningslister                         |
| `.trivyignore`                               | Undertrykkelse av akseptert risiko for skanning av beholderbilde                 |
| `.zizmor.yml`                                | zizmor GitHub Handlinger security-audit config                                   |
| `socket.yml`                                 | Socket.dev app-konfigurasjon (sti ignorerer; ikke en CI -port)                   |
| `sonar-project.properties`                   | SonarQube/SonarCloud prosjekt konfig                                             |
| `knip.json`                                  | Knip ubrukt files/exports/deps config (feeds `npm run check:dead-code`)          |
| `.size-limit.json`                           | Budsjetter i buntstørrelse                                                       |
| `.mergify.yml`                               | Slå sammen flette-kø konfig                                                      |
| `.coderabbit.yaml`                           | CodeRabbit gjennomgå konfig                                                      |
| `.cbmignore`                                 | Ignorer listen for codebase-memory-mcp-kodeindeksen                              |
| `.gitignore` / `.gitattributes` / `.mailmap` | Ignorer regler, LF -linjeavslutninger for skript, kanoniske forfatteridentiteter |

### Miljømaler, tilstand og feeder

| Fil                         | Hensikt                                                                      |
| --------------------------- | ---------------------------------------------------------------------------- |
| `.env.example`              | Mal kopiert til `.env` ved første installasjon; referanseliste over env vars |
| `.env.selfhost.example`     | Mal for `docker-compose.selfhost.yml`                                        |
| `.env.homolog.example`      | Mal for homologeringsløperen (`npm run homolog`)                             |
| `.env.devin-bridge.example` | Eksempel på env-fil for Devin bridge-oppsettet                               |
| `.i18n-state.json`          | Inkrementell oversettelsestilstand (kildehasher per dokument og lokalitet)   |
| `news.json`                 | Lokalisert kunngjøringsfeed (skjema v2) lest av dashbordet                   |

---

## `src/` — Next.js -applikasjon

Omtrent 4550 sporede filer. Banealias `@/*` → `src/*`.

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

### `src/app/` — App-ruter

| Sti                                                                 | Hensikt                                                                                                                                                                                              |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                       | Offentlig OpenAI-kompatibel API: chat, fullføringer, svar, meldinger, innebygging, bilder, lyd, videoer, musikk, omrangering, moderering, søk, filer, batcher, ws, modeller, …                       |
| `app/api/v1beta/`                                                   | endepunkter i Gemini-stil                                                                                                                                                                            |
| `app/api/` (andre mapper)                                           | Administrasjons- og administrasjonsruter: leverandører, kombinasjoner, innstillinger, nøkler, bruk, logger, mcp, a2a, acp, minne, ferdigheter, evals, webhooks, tunneler, plugins, radar, verktøy, … |
| `app/api/tools/agent-bridge/`                                       | AgentBridge REST API — se [AGENTBRIDGE.md](../frameworks/AGENTBRIDGE.md)                                                                                                                             |
| `app/api/tools/traffic-inspector/`                                  | Trafikkinspektør REST API — se [TRAFFIC_INSPECTOR.md](../frameworks/TRAFFIC_INSPECTOR.md)                                                                                                            |
| `app/(dashboard)/dashboard/`                                        | Én mappe per dashbordseksjon (leverandører, kombinasjoner, logger, bruk, kostnader, cache, komprimering, minne, lekeplass, søkeverktøy, innstillinger, verktøy, …)                                   |
| `app/(dashboard)/home/`                                             | Startskjermen og dens widgets                                                                                                                                                                        |
| `app/docs/`                                                         | Dokumentviser som gjengir Fumadocs-delene oppført i `source.config.ts`                                                                                                                               |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`          | Rotoppsett, rotoppføring (omdirigeringer), PWA -manifest, global CSS                                                                                                                                 |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx` | Feilgrenser og fallbacks                                                                                                                                                                             |

API -ruter følger `Route → CORS → Zod validation → optional auth → policy → handler`; se [ARCHITECTURE.md](ARCHITECTURE.md) og [API_REFERENCE.md](../reference/API_REFERENCE.md).

### `src/lib/` — serverbiblioteker

Omtrent 90 undermapper pluss omtrent 90 toppnivåmoduler. Hovedgrupper:

| Område                    | Mapper / filer                                                                                                      | Dypdykk                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Database                  | `db/` — domenemoduler, `migrations/`, `adapters/`, `repositories/`, `migrationRunner/`                              | [`src/lib/db/AGENTS.md`](../../src/lib/db/AGENTS.md), [DATABASE_GUIDE.md](../ops/DATABASE_GUIDE.md)                                            |
| Bruk, kvote og forbruk    | `usage/`, `quota/`, `spend/`                                                                                        | [QUOTA_SHARE.md](../routing/QUOTA_SHARE.md), [COST_TRACKING.md](../guides/COST_TRACKING.md)                                                    |
| Leverandører og modeller  | `providers/`, `providerModels/`, `modelValidation/`, `catalog/`, `radar/`, `freeProxyProviders/`                    | [RADAR.md](../frameworks/RADAR.md), [MODEL-VALIDATION.md](../guides/MODEL-VALIDATION.md)                                                       |
| OAuth og legitimasjon     | `oauth/` (leverandører/, tjenester/, utils/), `zed-oauth/`, `copilot/`, `cursor/`, `credentialHealth/`              | `resolvePublicCred()` (operatørdokument, ikke vist offentlig)                                                                                  |
| Sikkerhet og styring      | `guardrails/`, `compliance/`, `pii/`, `security/`                                                                   | [GUARDRAILS.md](../security/GUARDRAILS.md), [COMPLIANCE.md](../security/COMPLIANCE.md)                                                         |
| Agentfunksjoner           | `a2a/`, `acp/`, `cloudAgent/`, `memory/`, `skills/`, `agentSkills/`                                                 | [AGENT_PROTOCOLS_GUIDE.md](../frameworks/AGENT_PROTOCOLS_GUIDE.md), [MEMORY.md](../frameworks/MEMORY.md), [SKILLS.md](../frameworks/SKILLS.md) |
| Plugins og tjenester      | `plugins/`, `services/` (installatører og veileder for innebygde tjenester)                                         | [PLUGINS.md](../frameworks/PLUGINS.md), [EMBEDDED-SERVICES.md](../frameworks/EMBEDDED-SERVICES.md)                                             |
| Ruting og spenst          | `combos/`, `routing/`, `resilience/`, `reasoningRouting/`, `promptCache/`                                           | [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                                                     |
| Fullmakter og nettverk    | `proxyHealth/`, `proxySubscription/`, `proxyRelay/`, `proxyEvents/`, tunnelmoduler                                  | [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md), [TUNNELS_GUIDE.md](../ops/TUNNELS_GUIDE.md)                                                           |
| Jobber og planlegging     | `jobs/`, `jobRegistry/`, `warmupScheduler/`                                                                         |                                                                                                                                                |
| Observerbarhet og eksport | `monitoring/`, `logExport/`, `webhooks/`, `audit/`, `events/`                                                       | [LOG-EXPORT.md](../frameworks/LOG-EXPORT.md), [WEBHOOKS.md](../frameworks/WEBHOOKS.md)                                                         |
| CLI og IDE integrasjon    | `cliTools/`, `cli-helper/`, `vscode/`, `inspector/`, `versionManager/`                                              | [CLI-TOOLS.md](../reference/CLI-TOOLS.md), [VSCODE-COPILOT.md](../guides/VSCODE-COPILOT.md)                                                    |
| Kontekstkilder            | `localCorpus/`, `notion/`, `obsidian/`                                                                              | [LOCAL_CORPUS_CONTEXT.md](../frameworks/LOCAL_CORPUS_CONTEXT.md)                                                                               |
| Andre funksjoner          | `evals/`, `playground/`, `gamification/`, `telegram/`, `conductor/`, `batches/`, `deploy/`, `transfer/`, `sync/`, … | [EVALS.md](../frameworks/EVALS.md), [PLAYGROUND_STUDIO.md](../frameworks/PLAYGROUND_STUDIO.md)                                                 |

Toppnivåmoduler som er verdt å vite:

| Fil                                                            | Hensikt                                                       |
| -------------------------------------------------------------- | ------------------------------------------------------------- |
| `cacheLayer.ts`, `idempotencyLayer.ts`, `semanticCache.ts`     | Responsbufring og idempotens                                  |
| `webhookDispatcher.ts`                                         | HMAC-signert webhook-levering                                 |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts` | Tunnelforvaltere                                              |
| `tokenHealthCheck*.ts`, `tokenRefreshCircuit.ts`               | Helsesjekker for bakgrunnslegitimasjon og oppdateringskrets   |
| `streamingPiiTransform.ts`, `streamingCredentialTransform.ts`  | Streaming av responsdesinfeksjonsmidler                       |
| `gracefulShutdown.ts`, `serverLifecycle.ts`                    | Prosess livssyklus                                            |
| `*.stub.ts`                                                    | Byggeprofilstubber byttet inn med aliaser i `next.config.mjs` |

### `src/lib/db/` — database

| Sti                   | Hensikt                                                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`          | `getDbInstance()` singleton (WAL journaling)                                                                                |
| `db/migrations/`      | Nummererte, idempotente `.sql` -migrasjoner (236 filer i skrivende stund; `check-migration-numbering.mjs` -vaktnummerering) |
| `db/migrationRunner/` | Migrasjonsløper                                                                                                             |
| `db/adapters/`        | SQLite driveradaptere (better-sqlite3, node:sqlite, bun:sqlite, sql.js)                                                     |
| `db/repositories/`    | SQLite -depotimplementeringer (kombinasjoner, forhåndsinnstillinger for lekeplass, rutingkonfigurasjon)                     |
| `db/<domain>.ts`      | Omtrent 175 domenemoduler (leverandører, kombinasjoner, apiKeys, innstillinger, bruk, …) — importerer alltid disse direkte  |

### `src/domain/`, `src/server/`, `src/shared/`

| Sti                                                            | Hensikt                                                                                                                                               |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain/policyEngine.ts`                                       | Politikkmotor                                                                                                                                         |
| `domain/fallbackPolicy.ts`, `lockoutPolicy.ts`, `costRules.ts` | Reservebeslutninger, lockoutpolitikk, kostnadsregler                                                                                                  |
| `domain/quotaCache*.ts`, `quotaSnapshot*.ts`                   | Kvotebuffer og vedvarende øyeblikksbilde                                                                                                              |
| `domain/assessment/`                                           | Modellvurdering (bedømmer, kategoriserer, selvhelbredende)                                                                                            |
| `server/authz/`                                                | Autorisasjonsrørledning og rutevakt (`routeGuard.ts`) — se [AUTHZ_GUIDE.md](AUTHZ_GUIDE.md), [ROUTE_GUARD_TIERS.md](../security/ROUTE_GUARD_TIERS.md) |
| `server/origin/`, `server/cors/`                               | Public/MCP/WS origin-oppløsning og CORS — se [CORS.md](../security/CORS.md)                                                                           |
| `server/ws/`                                                   | Live dashboard WebSocket server                                                                                                                       |
| `shared/components/`                                           | Dashboardkomponenter og adaptere over `packages/ui-kit` — se [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)                                                     |
| `shared/constants/`                                            | Leverandørkatalog (`providers.ts`), rutingstrategier, CLI -verktøy, ikonkart, oppstrøms header-avvisningsliste, …                                     |
| `shared/validation/`                                           | Zod -skjemaer og valideringshjelpere                                                                                                                  |
| `shared/utils/`                                                | Kretsbryter, API-nøkkelautentisering, hentetidsavbrudd, funksjonsflagg, …                                                                             |
| `shared/middleware/`, `network/`, `services/`, `hooks/`        | Chatopptak mellomvare, nettverkshjelpere, klienttjenester, React -kroker                                                                              |

---

## arbeidsområde `open-sse/` — strømmemotor

npm arbeidsområde `@omniroute/open-sse` (omtrent 2 390 sporede filer). Den utfører forespørselsbehandlingen og utfører leverandøren. Oversikt: [OPEN_SSE_ARCHITECTURE.md](../frameworks/OPEN_SSE_ARCHITECTURE.md).

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

| Sti                                                                                            | Hensikt                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combo.ts` + `combo/`                                                                          | Combo routing strategier — se [AUTO-COMBO.md](../routing/AUTO-COMBO.md)                                                                                    |
| `autoCombo/`                                                                                   | Auto-Combo scoring og moduspakker                                                                                                                          |
| `accountFallback.ts` + `accountFallback/`                                                      | Tilkoblingsavkjøling og modellsperre — se [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                       |
| `rateLimitManager.ts` + `rateLimitManager/`                                                    | Rate-limit sporing og header parsing                                                                                                                       |
| `compression/`                                                                                 | Kompresjonsmotorer (`engines/`), regelpakker (`rules/`), `eval/`, `harness/`, `riskGate/` — se [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) |
| `tokenRefresh/`, `usage/`, `cache/`, `admission/`, `sessionPool/`, `codexAccount/`, `routing/` | Tokenoppdatering, bruksregnskap, caching, adgangsbaner, øktbassenger, Codex kontoer, rutinghjelpere                                                        |
| `__tests__/`                                                                                   | Samlokaliserte Vitest suiter (samlet inn av Vitest konfigurasjonene)                                                                                       |
| `AGENTS.md`                                                                                    | Agentveiledning for denne mappen                                                                                                                           |

Mønster: en stor modul `X.ts` ved siden av en mappe `X/` betyr at modulen ble delt opp i mindre filer (`handlers/chatCore.ts` + `handlers/chatCore/`, `services/combo.ts` + `services/combo/`).

### `open-sse/mcp-server/`

| Sti                   | Hensikt                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| `server.ts`           | MCP server livssyklus                                                                          |
| `httpTransport.ts`    | Streambare HTTP og SSE -transporter                                                            |
| `scopeEnforcement.ts` | Omfangskontroller per verktøy                                                                  |
| `audit.ts`            | Tool-call revisjonslogging                                                                     |
| `schemas/`            | Verktøydefinisjoner og omfang                                                                  |
| `tools/`              | Verktøyimplementeringer (minne, ferdigheter, komprimering, ...)                                |
| `toolSearch/`         | Verktøysøk                                                                                     |
| `README.md`           | Notater om intern arkitektur; hele katalogen er i [MCP-SERVER.md](../frameworks/MCP-SERVER.md) |

---

## `packages/` — npm arbeidsområder

| Sti                      | Hensikt                                                                                                                                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit`: levert øyeblikksbilde av Keak CI UI settet, brukt som kilde. `UPSTREAM.md` fester oppstrøms commit, `PATCHES.md` viser lokale patcher. `src/` synkroniseres kun av `scripts/dev/sync-ui-kit.sh` og beskyttes av `npm run check:ui-kit-snapshot`. Se [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| `packages/browser-pool/` | `@omniroute/browser-pool`: nettleser-pool-grensesnitt og implementering (`packages/browser-pool/src/index.ts`, `packages/browser-pool/src/interfaces.ts`). Oppført i `workspaces`; kjøretidsnettleserpoolen som brukes av gatewayen, bor i `open-sse/services/`                                               |

## `@omniroute/` — publiserte separat pakker

Dette er ikke npm-arbeidsområder. Hver har sin egen `package.json` og låsefil; mappen sendes i `omniroute` tarball (`files: ["@omniroute/"]`).

| Sti                              | Hensikt                                                                                                                                |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `@omniroute/opencode-plugin/`    | OpenCode plugin (modelloppdagelse, `/connect` auth); brukt av `omniroute setup-opencode` — se [OPENCODE.md](../frameworks/OPENCODE.md) |
| `@omniroute/opencode-plugin-v2/` | OpenCode plugin for v2 Promise API — se [OPENCODE-V2-PLUGIN.md](../guides/OPENCODE-V2-PLUGIN.md)                                       |
| `@omniroute/opencode-provider/`  | Statisk konfigurasjonsgenerator; merket avskrevet i sin egen `package.json` til fordel for `opencode-plugin`                           |

---

## `bin/` — CLI og ops-skript

| Sti                                                                         | Hensikt                                                                                            |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                             | Hoved CLI -oppføring (`omniroute serve`, `setup`, `doctor`, `providers`, `combo`, …)               |
| `reset-password.mjs`                                                        | `omniroute-reset-password` binær                                                                   |
| `mcp-server.mjs`                                                            | MCP stdio inngangspunkt                                                                            |
| `antigravity-bridge.mjs`, `chatgpt-web-codex-mcp.mjs`                       | Hjelpebro / MCP inngangspunkter                                                                    |
| `aliasResolver.mjs`, `aliasResolverHook.mjs`                                | ESM resolve hook som kartlegger tsconfig-banealiaser for globale installasjoner                    |
| `nodeRuntimeSupport.mjs`                                                    | Støttet Node.js versjonssjekk                                                                      |
| `snapshot-data.sh`, `restore-data.sh`, `restore-policies.sh`, `rollback.sh` | Selvvert for gjenopprettingsskript for hendelser (del `_ops-common.sh`)                            |
| `cold-start-bench.sh`                                                       | Kaldstart benchmark — se [PERF_BASELINE.md](../ops/PERF_BASELINE.md)                               |
| `cli/commands/`                                                             | En modul per CLI -kommando (ca. 100, inkludert `setup-*` integrasjonene)                           |
| `cli/api-commands/`                                                         | Generert fra `docs/openapi.yaml` av `npm run build:cli-api` — ikke rediger                         |
| `cli/locales/`                                                              | CLI meldingskataloger (67 lokaliteter)                                                             |
| `cli/tui/`, `cli/tui-components/`                                           | Terminal UI                                                                                        |
| `cli/tray/`                                                                 | Systemstatusfelt og autostart (Windows PowerShell backend, systray på macOS/Linux)                 |
| `cli/runtime/`                                                              | Innebygd kjøretidsoppløsning (`sqliteRuntime.mjs`, `magicBytes.mjs`), prosessveileder              |
| `cli/*.mjs`                                                                 | Delte hjelpere (args, API klient, data dir, kryptering, leverandørbutikk, innstillingsbutikk, ...) |
| `cli/README.md`, `cli/CONVENTIONS.md`                                       | CLI internals og konvensjoner                                                                      |

Se [CLI-TOOLS.md](../reference/CLI-TOOLS.md) og [CLI-COMPANION.md](../guides/CLI-COMPANION.md).

## `electron/` — desktop app

| Sti                                                        | Hensikt                                                                         |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `main.js`                                                  | Electron hovedprosess (vindu, innebygd server, skuff, oppdateringer)            |
| `preload.js`                                               | IPC broen eksponert for gjengiveren                                             |
| `lib/`                                                     | Vinduets livssyklus, serverberedskap, helsevakthund, eksterne serverpreferanser |
| `remoteServerPrompt*.js`, `assets/remoteServerPrompt.html` | Spørringsvindu for ekstern server                                               |
| `processTree.js`, `sqlite-inspection.js`                   | Hjelpere til opprydding av barneprosesser og SQLite inspeksjon                  |
| `package.json` / `package-lock.json`                       | elektronbyggerkonfigurasjon og Electron avhengigheter                           |
| `assets/`                                                  | App- og skuffikoner (`.ico`, `.icns`, `.png`)                                   |
| `README.md`                                                | Interne notater — se [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)           |

## `public/` — statiske eiendeler

| Sti                                         | Hensikt                                                                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `providers/`                                | Leverandørlogoer lastet av id (`/providers/<id>.svg`); herkomst i `config/quality/provider-assets-provenance.jsonl` |
| `favicon.*`, `apple-touch-icon.*`, `icon-*` | Nettleser- og PWA ikoner                                                                                            |
| `sw.js`                                     | Servicemedarbeider — se [PWA_GUIDE.md](../guides/PWA_GUIDE.md)                                                      |
| `openapi.yaml`                              | Kopi av `docs/openapi.yaml` generert av `npm run gen:public-openapi`                                                |
| `images/`, `sponsors/`, `deyin.svg`         | Tier-flow-diagrammer, sponsorbanner, README kunstverk                                                               |

## `skills/` — Agentferdigheter

46 ferdigheter, én mappe hver med en `SKILL.md` (`cli-*`, `omni-*`, `config-codex-cli`, `ponytail`), pluss `skills/README.md`. `src/lib/agentSkills/catalog.ts` leser dem under kjøring og eksponerer dem gjennom `/api/agent-skills`, MCP og A2A. De fleste manifestene genereres av `src/lib/agentSkills/generator.ts` (`scripts/skills/generate-agent-skills.mjs`; `npm run check:agent-skills-sync` sjekker for drift). Se [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md).

---

## `scripts/` — bygge, porter og verktøy

Omtrent 435 sporede filer. Nye skript går i en av undermappene tillatt av `AGENTS.md`; engangskode går i `scripts/ad-hoc/`.

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

Ofte brukte inngangspunkter:

| Manus                                                               | Hensikt                                                                                              |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `dev/run-next.mjs`                                                  | `npm run dev` / `npm start` løper                                                                    |
| `build/build-next-isolated.mjs`                                     | `npm run build` (Next.js frittstående bygg)                                                          |
| `build/prepublish.ts`                                               | `npm run build:cli`: setter sammen npm `dist/`                                                       |
| `build/postinstall.mjs`                                             | npm `postinstall` krok                                                                               |
| `build/publicOpenApi.mjs`                                           | `npm run gen:public-openapi`                                                                         |
| `docs/gen-provider-reference.ts`                                    | `npm run gen:provider-reference` (regenererer PROVIDER_REFERENCE.md)                                 |
| `docs/gen-openapi-module.mjs`                                       | `prebuild:docs` (genererer `src/app/docs/lib/openapi.generated.ts`)                                  |
| `i18n/run-translation.mjs`                                          | `npm run i18n:run` (dokumentspeil)                                                                   |
| `i18n/generate-route-namespaces.mjs`                                | `npm run gen:i18n-routes`                                                                            |
| `release/aggregate-changelog.mjs`                                   | Bretter `changelog.d/` -fragmenter til `CHANGELOG.md`                                                |
| `check/check-fabricated-docs.mjs`                                   | `npm run check:fabricated-docs` (dokumentnøyaktighetsport)                                           |
| `check/check-tracked-artifacts.mjs`                                 | `npm run check:tracked-artifacts` (blokkerer sporede rot- `_*` -baner)                               |
| `quality/check-quality-ratchet.mjs`                                 | `npm run quality:ratchet` (metrisk skralle mot `config/quality/`)                                    |
| `dev/run-playwright-tests.mjs`                                      | `npm run test:e2e`                                                                                   |
| `dev/run-protocol-clients-tests.mjs`, `dev/run-ecosystem-tests.mjs` | `npm run test:protocols:e2e`, `npm run test:ecosystem`                                               |
| `dev/new-worktree.sh`                                               | Oppretter et isolert utviklingsarbeidstre — se [WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md) |
| `dev/sync-ui-kit.sh`                                                | Synkroniserer `packages/ui-kit/src` til en festet oppstrøms commit                                   |

Gatebeholdning og retningslinjer: [QUALITY_GATES.md](QUALITY_GATES.md).

## `config/` — -versjonskonfigurasjon og porttilstand

| Sti                                      | Hensikt                                                                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `i18n.json` / `i18n-schema.json`         | Støttede lokaliteter (kilde til lokalitetsantallet) og deres skjema                                                      |
| `payloadRules.json`                      | Oppstrøms nyttelastregler (`open-sse/services/payloadRules.ts`)                                                          |
| `cli-tools-manifest.json`                | Manifest av integrerbare CLI verktøy (`bin/cli/cli-manifest.mjs`)                                                        |
| `alibaba-free-tier-allowlist.json`       | Alibaba free-tier modell tillatelsesliste                                                                                |
| `ci/toolchain.json`                      | CI verktøykjede versjoner                                                                                                |
| `quality/quality-baseline.json`          | Multimetrisk skralle-grunnlinje (dekning, advarsler, duplisering, ...)                                                   |
| `quality/*-baseline.json`                | Frosne grunnlinjer for individuelle porter (kompleksitet, duplisering, filstørrelse, typesjekkskiver, testoppdagelse, …) |
| `quality/*-allowlist.json`               | Gategodkjenningslister (avhengigheter, lisenser, AI attribusjon, tester for glemte søsken, ...)                          |
| `quality/eslint-suppressions.json`       | Frosne ESLint -undertrykkelser brukt av `npm run lint`                                                                   |
| `quality/gate-manifest.json`             | Portmanifest sjekket av `scripts/quality/gate-manifest.mjs`                                                              |
| `quality/vitest-exclusions.json`         | Karantenebeholdning for `vitest.quarantine.config.ts`                                                                    |
| `quality/skill-templates/`               | Kanoniske SKILL.md -maler sjekket av `scripts/quality/check-skill-contract.mjs`                                          |
| `quality/release-acceptance.schema.json` | Bevisskjema for utgivelsesgodkjenning — se [QUALITY_EVIDENCE_CONTRACT.md](QUALITY_EVIDENCE_CONTRACT.md)                  |
| `release/`                               | Endringsloggavstemminger og wreq-js native manifest, lisensbeholdning og merknader                                       |

## `changelog.d/` — endringsloggfragmenter

En PR legger til ett fragment i stedet for å redigere `CHANGELOG.md`: `features/`, `fixes/` eller `maintenance/`, kalt `<PR-number>-<slug>.md`. Ved utgivelsestidspunktet bretter `scripts/release/aggregate-changelog.mjs` dem til `CHANGELOG.md` og sletter dem; `npm run check:changelog-integrity` validerer dem. Detaljer i `changelog.d/README.md`.

---

## `docs/` — offentlig dokumentasjon

Seksjoner oppført i `source.config.ts` kompileres til `/docs` nettstedet (med noen få sikkerhetssider kun for operatører ekskludert); `docs/meta.json` setter rekkefølgen på sidefeltet. Start på [README.md](../README.md).

| Sti                | Innhold                                                                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getting-started/` | Rask start, selvvert, leverandører, gratis nivåer, Auto-Combo og web-informasjonskapsler                                                                    |
| `guides/`          | Operatør- og utviklerveiledninger: oppsett, Docker, Electron, PWA, Termux, CLIs, i18n, feilsøking, brukerveiledning                                         |
| `architecture/`    | Arkitektur, kodebasereferanse, modifikasjonsoppskrifter, authz, spenst, kvalitetsporter, designsystem, dette kartet                                         |
| `reference/`       | API referanse, miljøvariabler, funksjonsflagg, CLI verktøy, gratis nivåer, generert leverandørreferanse, fjernede leverandører                              |
| `frameworks/`      | MCP, A2A, ACP, ferdigheter, minne, plugins, skyagenter, webhooks, evals, loggeksport, Radar, Playground, …                                                  |
| `routing/`         | Auto-kombinasjon, resonnement replay/routing, kvoteandel, abonnementsstige, strengt nullkostnad, ...                                                        |
| `security/`        | Rekkverk, feilsanering, CORS, SSO, utgangspolicy, rutevaktnivåer, forsyningskjede, …                                                                        |
| `compression/`     | Kompresjonsguide, motorer, RTK, regelformat, språkpakker, kontekstredigering                                                                                |
| `ops/`             | Frigjør flyt, forgrening, sammenslåing, distribusjon (VM, Fly.io, Kubernetes), database, proxyer, arbeidstrær, detaljer om harde regler                     |
| `providers/`       | Veiledninger per leverandør (Claude Code, ChatGPT Web, Cursor, GitHub Copilot, …)                                                                           |
| `comparison/`      | OmniRoute sammenlignet med alternativer                                                                                                                     |
| `integrations/`    | Integrasjonsnotater (fal.ai native, MarkItDown MCP); ikke kompilert til `/docs`                                                                             |
| `openapi.yaml`     | OpenAPI kilde; mater `src/app/docs/lib/openapi.generated.ts`, `public/openapi.yaml` og `bin/cli/api-commands/`                                              |
| `diagrams/`        | Havfruekilder (`.mmd`), gjengitt SVGs (`exported/`) og README SVGs fra `scripts/docs/gen-readme-*`                                                          |
| `assets/`          | Språk-flagg SVGs og andre README eiendeler                                                                                                                  |
| `screenshots/`     | Skjermbilder brukt av README og guider                                                                                                                      |
| `i18n/`            | Oversatte speil: én mappe per lokalitet (66) med root-dokumenter og et `docs/` undersett; produsert av `npm run i18n:run` — se [I18N.md](../guides/I18N.md) |
| toppnivå `*.md`    | `README.md` (doc-indeks), `DEVELOPER-ENVIRONMENT.md` og noen få frittstående notater                                                                        |

Viktige inngangspunkter: [ARCHITECTURE.md](ARCHITECTURE.md), [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md), [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md), [ENVIRONMENT.md](../reference/ENVIRONMENT.md), [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) (generert av `npm run gen:provider-reference`).

---

## `tests/` — testsuiter

Omtrent 9 670 sporede filer. Testfiler hører hjemme her, ikke i prosjektroten. Unntak: de samlokaliserte `__tests__/` mappene i `src/` og `open-sse/` som Vitest -konfigurasjonene samler.

| Sti                                                    | Innhold                                                                                                                                                                  | Løper                                                                                   |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `tests/unit/`                                          | Enhetstester (over 9000 filer): mange på toppnivå, pluss domenemapper (`ui/`, `compression/`, `build/`, `guardrails/`, `db/`, `cli/`, `api/`, `dashboard/`, `combo/`, …) | Node testløper (`npm run test:unit`); `*.tsx` via `test:vitest:ui`                      |
| `tests/unit/serial/`                                   | CPU-sensitive tester kjøres med samtidighet 1                                                                                                                            | `npm run test:unit:serial`                                                              |
| `tests/unit/autoCombo/`, `tests/unit/api/**/*.spec.ts` | Vitest suiter inne i enhetstreet                                                                                                                                         | `npm run test:vitest`                                                                   |
| `tests/integration/`                                   | Multi-modul og DB integrasjonstester; `combo-matrix/`, `combo-live/`, `services/`                                                                                        | `npm run test:integration`, `test:combo:matrix`, `test:combo:live`, `test:services:int` |
| `tests/e2e/`                                           | Playwright `*.spec.ts` + live suiter `ecosystem.test.ts`, `protocol-clients.test.ts`                                                                                     | `npm run test:e2e`, `test:ecosystem`, `test:protocols:e2e`                              |
| `tests/boundary/`                                      | `*.live.test.ts` mot en løpende instans                                                                                                                                  | `npm run test:boundary:live`                                                            |
| `tests/homolog/`                                       | Homologeringssuiter (`api/`, `ui/` med sin egen Playwright konfigurasjon)                                                                                                | `npm run homolog` — se [HOMOLOGATION.md](../ops/HOMOLOGATION.md)                        |
| `tests/load/`                                          | Last inn og bløtlegg skript (k6)                                                                                                                                         | Arbeidsflyt for motstandskraft om natten                                                |
| `tests/_setup/`                                        | `--import` / oppsettfiler (isolert datadir, utgangsvakt, Vitest UI polyfills)                                                                                            | Lastet av løperne                                                                       |
| `tests/_helpers/`, `tests/helpers/`                    | Delte testhjelpere (gyldne øyeblikksbilder, ledelsesøkt, ...)                                                                                                            | Importert ved tester                                                                    |
| `tests/fixtures/`                                      | Armaturdata og barneprosessarmaturer                                                                                                                                     | Importert ved tester                                                                    |
| `tests/snapshots/`                                     | Gylne filer for `tests/helpers/goldenSnapshot.ts`                                                                                                                        | Importert ved tester                                                                    |
| `tests/manual/`                                        | `.http` filer for manuelle REST anrop                                                                                                                                    | Håndbok                                                                                 |
| `tests/security/`                                      | Sikkerhetsskall-skript                                                                                                                                                   | Manuelle / enhetsteste inventar                                                         |
| `tests/types/`                                         | Kontraktinventar på typenivå                                                                                                                                             | —                                                                                       |

Full matrise: `CONTRIBUTING.md` → "Running Tests" og [COVERAGE_PLAN.md](../ops/COVERAGE_PLAN.md).

---

## `deploy/` — Kubernetes

| Sti                                                | Hensikt                                                                                                    |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `deploy/helm/omniroute/`                           | Rordiagram (`Chart.yaml`, `values.yaml`, maler for distribusjon, service, ingress, PVC, secret, configmap) |
| `deploy/kubernetes/base/`                          | Tilpass base (navneområde, distribusjon, tjeneste, PVC, configmap, `secret.example.yaml`)                  |
| `deploy/kubernetes/overlays/k3s/`, `overlays/k8s/` | Klyngespesifikke overlegg (inngang, lagringsklasse, ressurser, sonder)                                     |

Se [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

## `docker/` — hjelpebilder

| Sti                                 | Hensikt                                                                                                               |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `docker/chatgpt-web-codex-browser/` | Hodeløst nettleserbilde med en CDP proxy for ChatGPT -webutføreren — se [CHATGPT_WEB.md](../providers/CHATGPT_WEB.md) |
| `docker/devin-bridge/`              | Devin bridge image, compose file, mocks and network guard                                                             |
| `docker/vnc-browser/`               | Chromium med VNC for interaktive nettleserøkter                                                                       |

Hovedbildet er roten `Dockerfile`; se [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md).

## `contrib/` — fellesskapsoppskrifter (støttes ikke offisielt)

| Sti                     | Hensikt                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `contrib/podman/`       | Podman-quadletter (beholder, volum, nettverk, Redis)                                                                            |
| `contrib/vps/`          | VPS `compose.yaml` + `.env.example`                                                                                             |
| `contrib/windows/`      | `.bat` launchers for å kjøre fra en Windows -kasse                                                                              |
| `contrib/session-sync/` | README for en tredjeparts session-sync nettleserutvidelse — se [SESSION-SYNC-EXTENSION.md](../guides/SESSION-SYNC-EXTENSION.md) |

## `examples/`

| Sti                             | Hensikt                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------- |
| `examples/omniroute-cmd-hello/` | Minimal kommandoplugin — se [PLUGINS.md](../frameworks/PLUGINS.md)           |
| `examples/plugins/`             | Eksempel på plugins: langfuse, request-logger, theme-manager, velkomstbanner |
| `examples/quickstart/`          | Klientbiter: curl, Node.js (aksios), PHP, Python                             |

---

## `.github/` — GitHub integrasjon

| Sti                                                          | Hensikt                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`                                         | CI (`ci.yml`, `quality.yml`, `build.yml`), sikkerhetsskanninger (`codeql.yml`, `semgrep.yml`, `scorecard.yml`, `dast-smoke.yml`), planlagte `nightly-*.yml` suiter, publisering (`npm-publish.yml`, `docker-publish.yml`, `electron-release.yml`), utgivelses- og vedlikeholdsarbeidsflyter |
| `.github/actions/npm-ci-retry/`                              | Sammensatt handling: `npm ci` med cache og prøv på nytt                                                                                                                                                                                                                                     |
| `.github/actions/prepare-unit-storage/`                      | Sammensatt handling: frigjør løperdiskplass, og installerer deretter avhengigheter                                                                                                                                                                                                          |
| `.github/ISSUE_TEMPLATE/`                                    | Skjemaer for feil, funksjoner og testdekning                                                                                                                                                                                                                                                |
| `.github/pull_request_template.md`, `PULL_REQUEST_TEMPLATE/` | Standard PR mal pluss bugfix/feature varianter                                                                                                                                                                                                                                              |
| `.github/CODEOWNERS`, `FUNDING.yml`, `dependabot.yml`        | Kodeeiere, sponsorkoblinger, avhengighetsoppdateringer                                                                                                                                                                                                                                      |
| `.github/labels.yml`                                         | Etikettdefinisjoner brukt av `npm run labels:sync`                                                                                                                                                                                                                                          |
| `.github/copilot-instructions.md`                            | GitHub Copilot instruksjoner (en agent-instruksjonsoverflate)                                                                                                                                                                                                                               |

CI jobbkart: [QUALITY_GATES.md](QUALITY_GATES.md).

## `.husky/` — git kroker

| Fil          | Hensikt                                                                                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pre-commit` | Git-identitetssjekk, lint-stadium, gatemanifest, docs-synkronisering, ethvert budsjett, type-skala skralle, sporede artefakter og ui-kit øyeblikksbildesjekker |
| `commit-msg` | `scripts/check/check-ai-attribution.mjs` på commit-meldingen                                                                                                   |
| `pre-push`   | Lys med vilje: en PATH/npm -tilregnelighetssjekk som går ut av 0                                                                                               |

Hook-kjøretiden i `.husky/_/` genereres ved installasjon og spores ikke.

---

## Navigasjonstips

- **Ny bidragsyter?** `CONTRIBUTING.md` → `AGENTS.md` → [ARCHITECTURE.md](ARCHITECTURE.md) → [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md).
- **Endre noe vanlig** (leverandør, rute, DB modul, MCP verktøy, A2A -ferdighet)? Følg [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md).
- **Vil du legge til en leverandør?** Sjekk [REMOVED_PROVIDERS.md](../reference/REMOVED_PROVIDERS.md) først, deretter krysssjekk [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md).
- **Løpe lokalt?** [SETUP_GUIDE.md](../guides/SETUP_GUIDE.md).
- **Utplassering?** [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [SELF_HOST_GUIDE.md](../getting-started/SELF_HOST_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).
- **Slippe ut?** [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md).
- **En kvalitetsport sviktet?** [QUALITY_GATES.md](QUALITY_GATES.md) og [QUALITY_GATE_PLAYBOOK.md](../ops/QUALITY_GATE_PLAYBOOK.md).
