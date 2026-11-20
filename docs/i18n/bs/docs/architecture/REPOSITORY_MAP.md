# Repository Map (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Gdje živi: svaki praćeni direktorij najvišeg nivoa i korijenski fajl, sa svrhom u jednom redu.** Posljednje ažurirano: 2026-11-13 (OmniRoute v3.8.54)
>
> Koristite ovu mapu da biste se snašli u bazi kodova, a zatim slijedite veze do namjenskih dokumenata. Broj datoteka mjeren je pomoću `git ls-files` na datum iznad. Oni se mijenjaju sa skoro svakim izdanjem, pa ih tretirajte kao redove veličine.

## Drvo najvišeg nivoa

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

Lokalne, generirane ili privatne staze (sve gitignorirane, nikad urezane, nisu dalje opisane):

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

## Root fajlovi

Sve praćene datoteke u korijenu spremišta (`git ls-files | grep -v /`), grupisane po funkciji.

### Projektna dokumentacija

| File                     | Svrha                                                                            |
| ------------------------ | -------------------------------------------------------------------------------- |
| `README.md`              | Odredišna stranica: pregled funkcija, brzi početak, metode instalacije           |
| `CHANGELOG.md`           | Dnevnik promjena po izdanju (fragmenti iz `changelog.d/` su presavijeni ovdje)   |
| `ROADMAP.md`             | Javni putokaz                                                                    |
| `LICENSE`                | MIT licence                                                                      |
| `THIRD_PARTY_NOTICES.md` | Obavještenja o paketu koda treće strane (na primjer wreq-js veze)                |
| `CONTRIBUTING.md`        | Vodič za saradnike: podešavanje, konvencionalna urezivanja, test matrica, PR tok |
| `SECURITY.md`            | Politika izvještavanja o ranjivosti                                              |
| `CODE_OF_CONDUCT.md`     | Očekivanja ponašanja u zajednici                                                 |
| `llm.txt`                | Sažetak projekta u jednostavnom tekstu za LLM pretraživače i pomoćnike           |

### Instrukcije AI-asistenta

| File        | Svrha                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------- |
| `AGENTS.md` | Jedinstveni izvor istine za svakog AI asistenta: konvencije, kvalitetne kapije, čvrsta pravila |
| `CLAUDE.md` | Claude Code – specifične delte; uvozi `AGENTS.md`                                              |
| `GEMINI.md` | Delte specifične za Blizance; ukazuje na `AGENTS.md`                                           |

Ugniježđeni vodiči također postoje pored koda koji opisuju: `open-sse/services/AGENTS.md` i `src/lib/db/AGENTS.md`.

### Manifesti paketa i alatni lanac čvorova

| File                       | Svrha                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------- |
| `package.json`             | npm manifest: skripte, zavisnosti, `engines`, `workspaces`, objavljen `files`           |
| `package-lock.json`        | Zaključano stablo zavisnosti                                                            |
| `pnpm-workspace.yaml`      | pnpm lista radnih prostora (`packages/*`, `open-sse`) i lista dopuštenja izvorne izrade |
| `.npmrc` / `.npmignore`    | npm konfiguraciju i publikovanje izuzetaka                                              |
| `.node-version` / `.nvmrc` | Pinovi verzije čvora za upravitelje verzijama                                           |
| `flake.nix` / `flake.lock` | Nix dev shell i njegovo zaključavanje                                                   |
| `Makefile`                 | `make` prečice koje delegiraju npm skripte                                              |

### TypeScript, Next.js i docs build

| File                                      | Svrha                                                                            |
| ----------------------------------------- | -------------------------------------------------------------------------------- |
| `tsconfig.json`                           | Osnovna TypeScript konfiguracija i aliasi putanje (`@/*`, `@omniroute/open-sse`) |
| `tsconfig.typecheck-core.json`            | `npm run typecheck:core` slice                                                   |
| `tsconfig.typecheck-noimplicit-core.json` | `npm run typecheck:noimplicit:core` (strogi `noImplicitAny`) komad               |
| `tsconfig.typecheck-api.json`             | Odsječak za provjeru tipa API rute (`scripts/check/check-api-typecheck.mjs`)     |
| `tsconfig.typecheck-dashboard.json`       | Isječak za provjeru tipa kontrolne ploče (`npm run check:dashboard-typecheck`)   |
| `tsconfig.build.json`                     | Provjera vrste proizvodnje (`npm run typecheck:build`, `check:build-typecheck`)  |
| `tsconfig.mitm.json`                      | MITM build konfiguraciju koju koristi `scripts/build/buildMitm.mjs`              |
| `next.config.mjs`                         | konfiguracija Next.js 16 (samostalni izlaz, pseudonimi build-profila)            |
| `source.config.ts`                        | Fumadocs `defineDocs` config: koje `docs/` sekcije kompajliraju u `/docs`        |
| `postcss.config.mjs`                      | PostCSS / Tailwind cjevovod                                                      |

### Lint i formatiranje

| File                                      | Svrha                                                                                                           |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `eslint.config.mjs`                       | Glavna ESLint ravna konfiguracija (`npm run lint`, sa `config/quality/eslint-suppressions.json`)                |
| `eslint.complexity-ratchets.config.mjs`   | Samostalna konfiguracija koju koriste sistemi za složenost i kognitivnu složenost u jednom ESLint prolazu       |
| `eslint.complexity.config.mjs`            | Samostalna konfiguracija sa samo jezgrom `complexity` + `max-lines-per-function` (koristi se od strane testova) |
| `prettier.config.mjs` / `.prettierignore` | Prettier pravila i isključenja                                                                                  |
| `.editorconfig`                           | Zadane postavke uređivača (uvlačenje s 2 razmaka)                                                               |
| `.markdownlint.json`                      | Savjetodavna markdown lint (`npm run lint:md`)                                                                  |
| `.vale.ini`                               | Savjetodavni prozni lint (`npm run lint:prose`), vokabular u `.vale/`                                           |

### Testovi, evaluacija i pokrivenost

| File                          | Svrha                                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |
| `vitest.config.ts`            | jsdom Vitest suite: `npm run test:vitest:ui` (kontrolna tabla `.tsx`, kuke, memory/skills testovi) |
| `vitest.mcp.config.ts`        | Node Vitest suite: `npm run test:vitest` (MCP server, autoCombo, combo, API `.spec.ts`)            |
| `vitest.quarantine.config.ts` | Pokreće datoteke u karantinu navedene u `config/quality/vitest-exclusions.json`                    |
| `vitest.e2e-live.config.ts`   | Live-server Vitest apartmani (`tests/e2e/ecosystem.test.ts`, `tests/e2e/protocol-clients.test.ts`) |
| `playwright.config.ts`        | Playwright E2E (`tests/e2e/**/*.spec.ts`, `npm run test:e2e`)                                      |
| `stryker.conf.mjs`            | Stryker testiranje mutacije (`npm run test:mutation`; izračunava `tap.testFiles` iz `mutate`)      |
| `stryker.disablebail.mjs`     | Stryker varijanta bez kaucije, za mjerenje zaliha testa                                            |
| `promptfooconfig.yaml`        | promptfoo LLM-sigurnosni paket                                                                     |
| `codecov.yml`                 | Codecov postavke pokrivenosti zakrpe                                                               |

### Docker i raspoređivanje

| File                              | Svrha                                                                            |
| --------------------------------- | -------------------------------------------------------------------------------- |
| `Dockerfile`                      | Višestepena slika (`builder` → `runner-base` → `runner-web` / `runner-cli*`)     |
| `Dockerfile.bun`                  | Alternativna slika na Bun runtime-u (napravio `docker-publish.yml`)              |
| `docker-compose.yml`              | Zadano sastavljanje sa profilima (baza, web, cli, host, memorija, cliproxyapi,…) |
| `docker-compose.prod.yml`         | Odvojena instanca snimka proizvodnje na portu 20130                              |
| `docker-compose.selfhost.yml`     | Self-host s jednom naredbom (uparuje se sa `.env.selfhost.example`)              |
| `docker-compose.ollama-local.yml` | Docker OmniRoute razgovara sa Ollama izvornim domaćinom                          |
| `.dockerignore`                   | Docker build-kontekst izuzimanja                                                 |
| `fly.toml`                        | Konfiguracija aplikacije Fly.io (port 20128, volumen `/data` )                   |

### Botovi sigurnosti, lanca nabavke i spremišta

| File                                         | Svrha                                                                                 |
| -------------------------------------------- | ------------------------------------------------------------------------------------- |
| `.gitleaks.toml`                             | gitleaks pravila tajnog skeniranja i liste dozvoljenih                                |
| `.trivyignore`                               | Prihvaćene supresije rizika za skeniranje slike kontejnera                            |
| `.zizmor.yml`                                | zizmor GitHub Akcije konfiguracije sigurnosne revizije                                |
| `socket.yml`                                 | Konfiguracija aplikacije Socket.dev (put zanemaruje; nije CI kapija)                  |
| `sonar-project.properties`                   | SonarQube/SonarCloud project config                                                   |
| `knip.json`                                  | Knip neiskorištenu files/exports/deps konfiguraciju (feeds `npm run check:dead-code`) |
| `.size-limit.json`                           | Budžeti veličine paketa                                                               |
| `.mergify.yml`                               | Spoji konfiguraciju reda stapanja                                                     |
| `.coderabbit.yaml`                           | CodeRabbit pregled konfig                                                             |
| `.cbmignore`                                 | Lista zanemarivanja za indeks koda codebase-memory-mcp                                |
| `.gitignore` / `.gitattributes` / `.mailmap` | Zanemarite pravila, završetke LF reda za skripte, kanonske identitete autora          |

### Predlošci okruženja, stanje i feedovi

| File                        | Svrha                                                                      |
| --------------------------- | -------------------------------------------------------------------------- |
| `.env.example`              | Šablon kopiran u `.env` pri prvoj instalaciji; referentna lista env vars   |
| `.env.selfhost.example`     | Šablon za `docker-compose.selfhost.yml`                                    |
| `.env.homolog.example`      | Šablon za homologacijski trkač (`npm run homolog`)                         |
| `.env.devin-bridge.example` | Primjer env datoteke za postavljanje Devin mosta                           |
| `.i18n-state.json`          | Inkrementalno stanje prijevoda (izvorni hashovi po dokumentu i lokalitetu) |
| `news.json`                 | Lokalizirani feed najava (šema v2) čita kontrolna tabla                    |

---

## `src/` — Next.js aplikacija

Oko 4.550 praćenih fajlova. Alias putanje `@/*` → `src/*`.

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

| Put                                                                 | Svrha                                                                                                                                                                                            |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                       | Javni API kompatibilan sa OpenAI: ćaskanje, dovršetak, odgovori, poruke, ugrađivanje, slike, audio, video zapisi, muzika, ponovno rangiranje, moderacije, pretraga, fajlovi, grupe, ws, modeli,… |
| `app/api/v1beta/`                                                   | Krajnje tačke u stilu Blizanaca                                                                                                                                                                  |
| `app/api/` (ostali folderi)                                         | Rute upravljanja i administracije: provajderi, kombinacije, postavke, ključevi, upotreba, logovi, mcp, a2a, acp, memorija, vještine, evals, webhookovi, tuneli, dodaci, radari, alati,…          |
| `app/api/tools/agent-bridge/`                                       | AgentBridge REST API — vidi [AGENTBRIDGE.md](../frameworks/AGENTBRIDGE.md)                                                                                                                       |
| `app/api/tools/traffic-inspector/`                                  | Saobraćajni inspektor REST API — vidi [TRAFFIC_INSPECTOR.md](../frameworks/TRAFFIC_INSPECTOR.md)                                                                                                 |
| `app/(dashboard)/dashboard/`                                        | Jedna fascikla po sekciji kontrolne table (provajderi, kombinacije, zapisi, upotreba, troškovi, keš memorija, kompresija, memorija, igralište, alati za pretragu, postavke, alati,…)             |
| `app/(dashboard)/home/`                                             | Početni ekran i njegovi widgeti                                                                                                                                                                  |
| `app/docs/`                                                         | Pregledač dokumenata koji prikazuje Fumadocs sekcije navedene u `source.config.ts`                                                                                                               |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`          | Root izgled, root unos (preusmjeravanja), PWA manifest, globalni CSS                                                                                                                             |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx` | Granice grešaka i zamjenske greške                                                                                                                                                               |

API rute prate `Route → CORS → Zod validation → optional auth → policy → handler`; vidi [ARCHITECTURE.md](ARCHITECTURE.md) i [API_REFERENCE.md](../reference/API_REFERENCE.md).

### `src/lib/` — serverske biblioteke

Otprilike 90 podfoldera plus oko 90 modula najvišeg nivoa. Glavne grupe:

| Područje                    | Fascikle/fajlovi                                                                                                    | Duboko ronjenje                                                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Baza podataka               | `db/` — moduli domene, `migrations/`, `adapters/`, `repositories/`, `migrationRunner/`                              | [`src/lib/db/AGENTS.md`](../../src/lib/db/AGENTS.md), [DATABASE_GUIDE.md](../ops/DATABASE_GUIDE.md)                                            |
| Upotreba, kvota i potrošnja | `usage/`, `quota/`, `spend/`                                                                                        | [QUOTA_SHARE.md](../routing/QUOTA_SHARE.md), [COST_TRACKING.md](../guides/COST_TRACKING.md)                                                    |
| Provajderi i modeli         | `providers/`, `providerModels/`, `modelValidation/`, `catalog/`, `radar/`, `freeProxyProviders/`                    | [RADAR.md](../frameworks/RADAR.md), [MODEL-VALIDATION.md](../guides/MODEL-VALIDATION.md)                                                       |
| OAuth i vjerodajnice        | `oauth/` (provajderi/, usluge/, utils/), `zed-oauth/`, `copilot/`, `cursor/`, `credentialHealth/`                   | `resolvePublicCred()` (dokument operatera, nije javno objavljen)                                                                               |
| Sigurnost i upravljanje     | `guardrails/`, `compliance/`, `pii/`, `security/`                                                                   | [GUARDRAILS.md](../security/GUARDRAILS.md), [COMPLIANCE.md](../security/COMPLIANCE.md)                                                         |
| Karakteristike agenta       | `a2a/`, `acp/`, `cloudAgent/`, `memory/`, `skills/`, `agentSkills/`                                                 | [AGENT_PROTOCOLS_GUIDE.md](../frameworks/AGENT_PROTOCOLS_GUIDE.md), [MEMORY.md](../frameworks/MEMORY.md), [SKILLS.md](../frameworks/SKILLS.md) |
| Dodaci i usluge             | `plugins/`, `services/` (instalateri ugrađenih usluga i supervizor)                                                 | [PLUGINS.md](../frameworks/PLUGINS.md), [EMBEDDED-SERVICES.md](../frameworks/EMBEDDED-SERVICES.md)                                             |
| Usmjeravanje i otpornost    | `combos/`, `routing/`, `resilience/`, `reasoningRouting/`, `promptCache/`                                           | [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                                                     |
| Proksiji i umrežavanje      | `proxyHealth/`, `proxySubscription/`, `proxyRelay/`, `proxyEvents/`, tunelski moduli                                | [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md), [TUNNELS_GUIDE.md](../ops/TUNNELS_GUIDE.md)                                                           |
| Poslovi i raspored          | `jobs/`, `jobRegistry/`, `warmupScheduler/`                                                                         |                                                                                                                                                |
| Uočljivost i izvoz          | `monitoring/`, `logExport/`, `webhooks/`, `audit/`, `events/`                                                       | [LOG-EXPORT.md](../frameworks/LOG-EXPORT.md), [WEBHOOKS.md](../frameworks/WEBHOOKS.md)                                                         |
| CLI i IDE integracija       | `cliTools/`, `cli-helper/`, `vscode/`, `inspector/`, `versionManager/`                                              | [CLI-TOOLS.md](../reference/CLI-TOOLS.md), [VSCODE-COPILOT.md](../guides/VSCODE-COPILOT.md)                                                    |
| Izvori konteksta            | `localCorpus/`, `notion/`, `obsidian/`                                                                              | [LOCAL_CORPUS_CONTEXT.md](../frameworks/LOCAL_CORPUS_CONTEXT.md)                                                                               |
| Ostale karakteristike       | `evals/`, `playground/`, `gamification/`, `telegram/`, `conductor/`, `batches/`, `deploy/`, `transfer/`, `sync/`, … | [EVALS.md](../frameworks/EVALS.md), [PLAYGROUND_STUDIO.md](../frameworks/PLAYGROUND_STUDIO.md)                                                 |

Moduli najvišeg nivoa koje vrijedi znati:

| File                                                           | Svrha                                                                |
| -------------------------------------------------------------- | -------------------------------------------------------------------- |
| `cacheLayer.ts`, `idempotencyLayer.ts`, `semanticCache.ts`     | Keširanje odgovora i idempotencija                                   |
| `webhookDispatcher.ts`                                         | Dostava webhook-a s potpisom HMAC-a                                  |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts` | Menadžeri tunela                                                     |
| `tokenHealthCheck*.ts`, `tokenRefreshCircuit.ts`               | Zdravstvene provjere pozadinskih akreditiva i kolo za osvježavanje   |
| `streamingPiiTransform.ts`, `streamingCredentialTransform.ts`  | Streaming sredstva za dezinfekciju odgovora                          |
| `gracefulShutdown.ts`, `serverLifecycle.ts`                    | Životni ciklus procesa                                               |
| `*.stub.ts`                                                    | Stubovi profila izgradnje zamijenjeni pseudonima u `next.config.mjs` |

### `src/lib/db/` — baza podataka

| Put                   | Svrha                                                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`          | `getDbInstance()` singleton (WAL dnevnik)                                                                                   |
| `db/migrations/`      | Numerisane, idempotentne `.sql` migracije (236 fajlova u vreme pisanja; `check-migration-numbering.mjs` čuvari numerisanje) |
| `db/migrationRunner/` | Migration runner                                                                                                            |
| `db/adapters/`        | SQLite adapteri za drajver (better-sqlite3, node:sqlite, bun:sqlite, sql.js)                                                |
| `db/repositories/`    | implementacije SQLite repozitorija (kombo, unaprijed postavljena igrališta, konfiguracija rutiranja)                        |
| `db/<domain>.ts`      | Oko 175 modula domena (provajderi, kombinacije, apiKeys, postavke, upotreba,…) — ih uvijek uvozi direktno                   |

### `src/domain/`, `src/server/`, `src/shared/`

| Put                                                            | Svrha                                                                                                                                                     |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain/policyEngine.ts`                                       | Policy engine                                                                                                                                             |
| `domain/fallbackPolicy.ts`, `lockoutPolicy.ts`, `costRules.ts` | Rezervne odluke, politika zaključavanja, pravila troškova                                                                                                 |
| `domain/quotaCache*.ts`, `quotaSnapshot*.ts`                   | Kvota keš memorije i postojanost snimka                                                                                                                   |
| `domain/assessment/`                                           | Procjena modela (ocjenjivač, kategorizator, samoiscjelitelj)                                                                                              |
| `server/authz/`                                                | Autorizacija cjevovoda i zaštita rute (`routeGuard.ts`) — vidi [AUTHZ_GUIDE.md](AUTHZ_GUIDE.md), [ROUTE_GUARD_TIERS.md](../security/ROUTE_GUARD_TIERS.md) |
| `server/origin/`, `server/cors/`                               | Public/MCP/WS izvorna rezolucija i CORS — vidi [CORS.md](../security/CORS.md)                                                                             |
| `server/ws/`                                                   | Kontrolna tabla uživo WebSocket server                                                                                                                    |
| `shared/components/`                                           | Komponente kontrolne table i adapteri preko `packages/ui-kit` — vidi [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)                                                 |
| `shared/constants/`                                            | Katalog provajdera (`providers.ts`), strategije usmjeravanja, CLI alati, mapa ikona, upstream header denylist,…                                           |
| `shared/validation/`                                           | Zod šeme i pomoćnici za validaciju                                                                                                                        |
| `shared/utils/`                                                | Prekidač, API-ključ auth, dohvaćanje vremena, zastavice funkcija,…                                                                                        |
| `shared/middleware/`, `network/`, `services/`, `hooks/`        | Međuoprema za pristup chatu, mrežni pomoćnici, klijentske usluge, React kuke                                                                              |

---

## `open-sse/` — streaming engine radni prostor

npm radni prostor `@omniroute/open-sse` (oko 2.390 praćenih datoteka). On obavlja obradu zahtjeva i izvršavanje provajdera. Pregled: [OPEN_SSE_ARCHITECTURE.md](../frameworks/OPEN_SSE_ARCHITECTURE.md).

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

| Put                                                                                            | Svrha                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combo.ts` + `combo/`                                                                          | Kombinirane strategije rutiranja — vidi [AUTO-COMBO.md](../routing/AUTO-COMBO.md)                                                                                      |
| `autoCombo/`                                                                                   | Auto-Combo bodovanje i paketi modova                                                                                                                                   |
| `accountFallback.ts` + `accountFallback/`                                                      | Hlađenje veze i blokada modela — vidi [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                                       |
| `rateLimitManager.ts` + `rateLimitManager/`                                                    | Praćenje ograničenja brzine i raščlanjivanje zaglavlja                                                                                                                 |
| `compression/`                                                                                 | Kompresijski motori (`engines/`), paketi pravila (`rules/`), `eval/`, `harness/`, `riskGate/` — pogledajte [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) |
| `tokenRefresh/`, `usage/`, `cache/`, `admission/`, `sessionPool/`, `codexAccount/`, `routing/` | Osvježavanje tokena, obračun upotrebe, keširanje, pristupne trake, skupovi sesija, Codex računi, pomoćnici za usmjeravanje                                             |
| `__tests__/`                                                                                   | Kolocirani Vitest apartmani (sakupljeni u Vitest konfiguracijama)                                                                                                      |
| `AGENTS.md`                                                                                    | Vodič za agente za ovu fasciklu                                                                                                                                        |

Uzorak: veliki modul `X.ts` pored foldera `X/` znači da je modul podijeljen na manje datoteke (`handlers/chatCore.ts` + `handlers/chatCore/`, `services/combo.ts` + `services/combo/`).

### `open-sse/mcp-server/`

| Put                   | Svrha                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| `server.ts`           | životni ciklus MCP servera                                                                        |
| `httpTransport.ts`    | Streamable HTTP i SSE transporti                                                                  |
| `scopeEnforcement.ts` | Provjere opsega po alatu                                                                          |
| `audit.ts`            | Alat-poziv revizije evidencije                                                                    |
| `schemas/`            | Definicije alata i opseg                                                                          |
| `tools/`              | Implementacije alata (pamćenje, vještine, kompresija,…)                                           |
| `toolSearch/`         | Pretraga alata                                                                                    |
| `README.md`           | Bilješke o internoj arhitekturi; cijeli katalog je u [MCP-SERVER.md](../frameworks/MCP-SERVER.md) |

---

## `packages/` — npm radni prostori

| Put                      | Svrha                                                                                                                                                                                                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/ui-kit/`       | `@omniroute/ui-kit`: isporučeni snimak kompleta Keak CI UI, korišten kao izvor. `UPSTREAM.md` pinuje upstream urezivanje, `PATCHES.md` navodi lokalne zakrpe. `src/` se sinkronizira samo pomoću `scripts/dev/sync-ui-kit.sh` i čuva ga `npm run check:ui-kit-snapshot`. Vidi [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| `packages/browser-pool/` | `@omniroute/browser-pool`: interfejs pretraživača i implementacija (`packages/browser-pool/src/index.ts`, `packages/browser-pool/src/interfaces.ts`). Navedeno u `workspaces`; runtime pretraživač pretraživač koji koristi gateway živi u `open-sse/services/`                                                    |

## `@omniroute/` — zasebno objavljeni paketi

Ovo nisu npm radni prostori. Svaki ima svoj `package.json` i lockfile; fascikla se isporučuje u `omniroute` tarball-u (`files: ["@omniroute/"]`).

| Put                              | Svrha                                                                                                                                     |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `@omniroute/opencode-plugin/`    | OpenCode dodatak (otkrivanje modela, `/connect` auth); koristi `omniroute setup-opencode` — vidi [OPENCODE.md](../frameworks/OPENCODE.md) |
| `@omniroute/opencode-plugin-v2/` | OpenCode dodatak za v2 Promise API — vidi [OPENCODE-V2-PLUGIN.md](../guides/OPENCODE-V2-PLUGIN.md)                                        |
| `@omniroute/opencode-provider/`  | Generator statičke konfiguracije; označen kao zastarjeli u vlastitom `package.json` u korist `opencode-plugin`                            |

---

## `bin/` — CLI i ops skripte

| Put                                                                         | Svrha                                                                                                     |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                             | Glavni CLI unos (`omniroute serve`, `setup`, `doctor`, `providers`, `combo`, …)                           |
| `reset-password.mjs`                                                        | `omniroute-reset-password` binary                                                                         |
| `mcp-server.mjs`                                                            | MCP stdio ulazna tačka                                                                                    |
| `antigravity-bridge.mjs`, `chatgpt-web-codex-mcp.mjs`                       | Pomoćni most / MCP ulazne tačke                                                                           |
| `aliasResolver.mjs`, `aliasResolverHook.mjs`                                | ESM resolve kuka koja mapira pseudonime putanje tsconfig za globalne instalacije                          |
| `nodeRuntimeSupport.mjs`                                                    | Podržana provjera verzije Node.js                                                                         |
| `snapshot-data.sh`, `restore-data.sh`, `restore-policies.sh`, `rollback.sh` | Self-host skripte za oporavak od incidenata (podijelite `_ops-common.sh`)                                 |
| `cold-start-bench.sh`                                                       | Hladni start benchmark — vidi [PERF_BASELINE.md](../ops/PERF_BASELINE.md)                                 |
| `cli/commands/`                                                             | Jedan modul po CLI komandi (oko 100, uključujući `setup-*` integracije)                                   |
| `cli/api-commands/`                                                         | Generirano iz `docs/openapi.yaml` od strane `npm run build:cli-api` — ne uređivati                        |
| `cli/locales/`                                                              | CLI katalozi poruka (67 jezika)                                                                           |
| `cli/tui/`, `cli/tui-components/`                                           | Terminal UI                                                                                               |
| `cli/tray/`                                                                 | Sistemska traka i automatsko pokretanje (Windows PowerShell backend, systray na macOS/Linux)              |
| `cli/runtime/`                                                              | Nativna rezolucija vremena izvođenja (`sqliteRuntime.mjs`, `magicBytes.mjs`), nadzornik procesa           |
| `cli/*.mjs`                                                                 | Dijeljeni pomoćnici (args, API klijent, data dir, enkripcija, skladište provajdera, skladište postavki,…) |
| `cli/README.md`, `cli/CONVENTIONS.md`                                       | CLI interni elementi i konvencije                                                                         |

Vidi [CLI-TOOLS.md](../reference/CLI-TOOLS.md) i [CLI-COMPANION.md](../guides/CLI-COMPANION.md).

## `electron/` — desktop aplikacija

| Put                                                        | Svrha                                                                                      |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `main.js`                                                  | Electron glavni proces (prozor, ugrađeni server, tray, ažuriranja)                         |
| `preload.js`                                               | IPC most izložen rendereru                                                                 |
| `lib/`                                                     | Životni ciklus prozora, spremnost servera, nadzor zdravlja, preferencije udaljenog servera |
| `remoteServerPrompt*.js`, `assets/remoteServerPrompt.html` | Prozor s promptom udaljenog servera                                                        |
| `processTree.js`, `sqlite-inspection.js`                   | Pomagači za čišćenje dječjeg procesa i SQLite inspekciju                                   |
| `package.json` / `package-lock.json`                       | electron-builder config i Electron ovisnosti                                               |
| `assets/`                                                  | Ikone aplikacija i trake (`.ico`, `.icns`, `.png`)                                         |
| `README.md`                                                | Interne napomene — vidi [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)                   |

## `public/` — statička sredstva

| Put                                         | Svrha                                                                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `providers/`                                | Logotipi provajdera učitani id (`/providers/<id>.svg`); porijeklo u `config/quality/provider-assets-provenance.jsonl` |
| `favicon.*`, `apple-touch-icon.*`, `icon-*` | Ikone pretraživača i PWA                                                                                              |
| `sw.js`                                     | Servisni radnik — vidi [PWA_GUIDE.md](../guides/PWA_GUIDE.md)                                                         |
| `openapi.yaml`                              | Kopija `docs/openapi.yaml` koju generiše `npm run gen:public-openapi`                                                 |
| `images/`, `sponsors/`, `deyin.svg`         | Tier-flow dijagrami, sponzorski baner, README ilustracija                                                             |

## `skills/` — Vještine agenta

46 vještina, po jedna mapa sa `SKILL.md` (`cli-*`, `omni-*`, `config-codex-cli`, `ponytail`), plus `skills/README.md`. `src/lib/agentSkills/catalog.ts` ih čita za vrijeme izvođenja i izlaže ih kroz `/api/agent-skills`, MCP i A2A. Većina manifesta je generisana pomoću `src/lib/agentSkills/generator.ts` (`scripts/skills/generate-agent-skills.mjs`; `npm run check:agent-skills-sync` provjerava odstupanje). Vidi [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md).

---

## `scripts/` — gradnja, kapije i alati

Oko 435 praćenih fajlova. Nove skripte idu u jednu od podmapa koje dozvoljava `AGENTS.md`; jednokratni kod ide u `scripts/ad-hoc/`.

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

Često korištene ulazne tačke:

| Skripta                                                             | Svrha                                                                                        |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `dev/run-next.mjs`                                                  | `npm run dev` / `npm start` trkač                                                            |
| `build/build-next-isolated.mjs`                                     | `npm run build` (Next.js samostalna verzija)                                                 |
| `build/prepublish.ts`                                               | `npm run build:cli`: sastavlja npm `dist/`                                                   |
| `build/postinstall.mjs`                                             | npm `postinstall` kuka                                                                       |
| `build/publicOpenApi.mjs`                                           | `npm run gen:public-openapi`                                                                 |
| `docs/gen-provider-reference.ts`                                    | `npm run gen:provider-reference` (regenerira PROVIDER_REFERENCE.md)                          |
| `docs/gen-openapi-module.mjs`                                       | `prebuild:docs` (generira `src/app/docs/lib/openapi.generated.ts`)                           |
| `i18n/run-translation.mjs`                                          | `npm run i18n:run` (ogledala dokumenata)                                                     |
| `i18n/generate-route-namespaces.mjs`                                | `npm run gen:i18n-routes`                                                                    |
| `release/aggregate-changelog.mjs`                                   | Preklapa `changelog.d/` fragmente u `CHANGELOG.md`                                           |
| `check/check-fabricated-docs.mjs`                                   | `npm run check:fabricated-docs` (kapija preciznosti dokumenta)                               |
| `check/check-tracked-artifacts.mjs`                                 | `npm run check:tracked-artifacts` (blokira praćene root `_*` staze)                          |
| `quality/check-quality-ratchet.mjs`                                 | `npm run quality:ratchet` (metrička čegrtaljka protiv `config/quality/`)                     |
| `dev/run-playwright-tests.mjs`                                      | `npm run test:e2e`                                                                           |
| `dev/run-protocol-clients-tests.mjs`, `dev/run-ecosystem-tests.mjs` | `npm run test:protocols:e2e`, `npm run test:ecosystem`                                       |
| `dev/new-worktree.sh`                                               | Kreira izolovano stablo razvoja — vidi [WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md) |
| `dev/sync-ui-kit.sh`                                                | Sinhronizira `packages/ui-kit/src` sa zakačenim uzvodnim urezivanjem                         |

Inventar i politike kapije: [QUALITY_GATES.md](QUALITY_GATES.md).

## `config/` — verzionirana konfiguracija i stanje vrata

| Put                                      | Svrha                                                                                                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `i18n.json` / `i18n-schema.json`         | Podržane lokacije (izvor broja jezika) i njihova shema                                                                                     |
| `payloadRules.json`                      | Pravila upstream korisnog opterećenja (`open-sse/services/payloadRules.ts`)                                                                |
| `cli-tools-manifest.json`                | Manifest integrabilnih CLI alata (`bin/cli/cli-manifest.mjs`)                                                                              |
| `alibaba-free-tier-allowlist.json`       | Alibaba lista dozvoljenih modela slobodnog nivoa                                                                                           |
| `ci/toolchain.json`                      | CI toolchain verzije                                                                                                                       |
| `quality/quality-baseline.json`          | Multimetrička osnovna linija (pokrivenost, upozorenja, dupliciranje,…)                                                                     |
| `quality/*-baseline.json`                | Zamrznute osnovne linije za pojedinačne kapije (složenost, dupliciranje, veličina datoteke, odsječci za provjeru tipa, otkrivanje testa,…) |
| `quality/*-allowlist.json`               | Liste dozvoljenih izlaza (zavisnosti, licence, AI atribucija, zaboravljeni testovi,…)                                                      |
| `quality/eslint-suppressions.json`       | Zamrznuta ESLint potiskivanja primijenjena od strane `npm run lint`                                                                        |
| `quality/gate-manifest.json`             | `scripts/quality/gate-manifest.mjs` je provjerio manifest kapije                                                                           |
| `quality/vitest-exclusions.json`         | Karantinski inventar za `vitest.quarantine.config.ts`                                                                                      |
| `quality/skill-templates/`               | `scripts/quality/check-skill-contract.mjs` provjerava kanonske SKILL.md šablone                                                            |
| `quality/release-acceptance.schema.json` | Šema dokaza o oslobađanju i prihvatanju — vidi [QUALITY_EVIDENCE_CONTRACT.md](QUALITY_EVIDENCE_CONTRACT.md)                                |
| `release/`                               | Usklađivanje dnevnika promjena i izvorni manifest wreq-js, inventar licence i obavijesti                                                   |

## `changelog.d/` — fragmenti dnevnika promjena

PR dodaje jedan fragment umjesto uređivanja `CHANGELOG.md`: `features/`, `fixes/` ili `maintenance/`, pod nazivom `<PR-number>-<slug>.md`. U vrijeme oslobađanja `scripts/release/aggregate-changelog.mjs` ih savija u `CHANGELOG.md` i briše ih; `npm run check:changelog-integrity` ih potvrđuje. Detalji u `changelog.d/README.md`.

---

## `docs/` — javna dokumentacija

Odjeljci navedeni u `source.config.ts` kompiliraju se u `/docs` stranicu (sa izuzetim nekoliko sigurnosnih stranica samo za operatera); `docs/meta.json` postavlja poredak bočne trake. Počnite od [README.md](../README.md).

| Put                   | Sadržaj                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getting-started/`    | Brzi početak, self-host, provajderi, besplatni nivoi, Auto-Combo i vodiči za web-kolačiće                                                                     |
| `guides/`             | Vodiči za operatere i programere: postavljanje, Docker, Electron, PWA, Termux, CLIs, i18n, rješavanje problema, korisnički vodič                              |
| `architecture/`       | Arhitektura, reference kodne baze, modifikacioni recepti, authz, otpornost, kapije kvaliteta, sistem dizajna, ova mapa                                        |
| `reference/`          | API referenca, varijable okruženja, zastavice funkcija, CLI alati, besplatni slojevi, generirana referenca dobavljača, uklonjeni provajderi                   |
| `frameworks/`         | MCP, A2A, ACP, vještine, memorija, dodaci, agenti u oblaku, webhookovi, evals, izvoz dnevnika, radar, igralište,…                                             |
| `routing/`            | Auto-Combo, replay/routing obrazloženja, udio kvote, ljestvica pretplate, stroga nulta cijena,…                                                               |
| `security/`           | Zaštitne ograde, uklanjanje grešaka, CORS, SSO, izlazna politika, nivoi zaštite rute, lanac nabavke,…                                                         |
| `compression/`        | Vodič za kompresiju, motori, RTK, format pravila, jezički paketi, uređivanje konteksta                                                                        |
| `ops/`                | Tok otpuštanja, grananje, spoj spajanja, implementacija (VM, Fly.io, Kubernetes), baza podataka, proksiji, stabla rada, detalji tvrdih pravila                |
| `providers/`          | Vodiči po dobavljačima (Claude Code, ChatGPT Web, Cursor, GitHub Copilot,…)                                                                                   |
| `comparison/`         | OmniRoute u poređenju sa alternativama                                                                                                                        |
| `integrations/`       | Bilješke o integraciji (fal.ai native, MarkItDown MCP); nije kompajlirano u `/docs`                                                                           |
| `openapi.yaml`        | OpenAPI izvor; hrani `src/app/docs/lib/openapi.generated.ts`, `public/openapi.yaml` i `bin/cli/api-commands/`                                                 |
| `diagrams/`           | Izvori sirene (`.mmd`), prikazani SVGs (`exported/`) i README SVGs iz `scripts/docs/gen-readme-*`                                                             |
| `assets/`             | Jezik-zastava SVGs i druga README sredstva                                                                                                                    |
| `screenshots/`        | Snimke ekrana koje koriste README i vodiči                                                                                                                    |
| `i18n/`               | Prevedena ogledala: jedan folder po lokalu (66) sa osnovnim dokumentima i `docs/` podskupom; proizvodi `npm run i18n:run` — vidi [I18N.md](../guides/I18N.md) |
| `*.md` najvišeg nivoa | `README.md` (doc indeks), `DEVELOPER-ENVIRONMENT.md` i nekoliko samostalnih bilješki                                                                          |

Ključne ulazne tačke: [ARCHITECTURE.md](ARCHITECTURE.md), [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md), [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md), [ENVIRONMENT.md](../reference/ENVIRONMENT.md), [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) (generisano pomoću `npm run gen:provider-reference`).

---

## `tests/` — test paketi

Oko 9.670 praćenih fajlova. Testne datoteke pripadaju ovdje, ne u korijenu projekta. Izuzeci: ko-locirane `__tests__/` fascikle u `src/` i `open-sse/` koje prikupljaju Vitest konfiguracije.

| Put                                                    | Sadržaj                                                                                                                                                                                 | Runner                                                                                  |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `tests/unit/`                                          | Jedinični testovi (preko 9.000 fajlova): mnogi na najvišem nivou, plus folderi domena (`ui/`, `compression/`, `build/`, `guardrails/`, `db/`, `cli/`, `api/`, `dashboard/`, `combo/`,…) | Node test runner (`npm run test:unit`); `*.tsx` preko `test:vitest:ui`                  |
| `tests/unit/serial/`                                   | CPU-osetljivi testovi se pokreću uz istovremenost 1                                                                                                                                     | `npm run test:unit:serial`                                                              |
| `tests/unit/autoCombo/`, `tests/unit/api/**/*.spec.ts` | Vitest apartmani unutar stabla jedinica                                                                                                                                                 | `npm run test:vitest`                                                                   |
| `tests/integration/`                                   | Multi-module i DB integracijski testovi; `combo-matrix/`, `combo-live/`, `services/`                                                                                                    | `npm run test:integration`, `test:combo:matrix`, `test:combo:live`, `test:services:int` |
| `tests/e2e/`                                           | Playwright `*.spec.ts` + live apartmani `ecosystem.test.ts`, `protocol-clients.test.ts`                                                                                                 | `npm run test:e2e`, `test:ecosystem`, `test:protocols:e2e`                              |
| `tests/boundary/`                                      | `*.live.test.ts` protiv pokrenute instance                                                                                                                                              | `npm run test:boundary:live`                                                            |
| `tests/homolog/`                                       | Homologacijski paketi (`api/`, `ui/` sa vlastitom Playwright konfiguracijom)                                                                                                            | `npm run homolog` — vidi [HOMOLOGATION.md](../ops/HOMOLOGATION.md)                      |
| `tests/load/`                                          | Učitaj i potopi skripte (k6)                                                                                                                                                            | Noćni radni tok otpornosti                                                              |
| `tests/_setup/`                                        | `--import` / setup fajlovi (izolovani direktorij podataka, izlazni guard, Vitest UI polifili)                                                                                           | Opterećeno od strane trkača                                                             |
| `tests/_helpers/`, `tests/helpers/`                    | Zajednički test pomoćnici (zlatni snimci, sesija upravljanja,…)                                                                                                                         | Uvezeno testovima                                                                       |
| `tests/fixtures/`                                      | Podaci o uređajima i uređaji za podređene procese                                                                                                                                       | Uvezeno testovima                                                                       |
| `tests/snapshots/`                                     | Zlatne turpije za `tests/helpers/goldenSnapshot.ts`                                                                                                                                     | Uvezeno testovima                                                                       |
| `tests/manual/`                                        | `.http` datoteke za ručne REST pozive                                                                                                                                                   | Manual                                                                                  |
| `tests/security/`                                      | Skripte sigurnosne ljuske                                                                                                                                                               | Ručni / jedinični test uređaji                                                          |
| `tests/types/`                                         | Ugovorna oprema na nivou tipa                                                                                                                                                           | —                                                                                       |

Puna matrica: `CONTRIBUTING.md` → "Testovi u radu" i [COVERAGE_PLAN.md](../ops/COVERAGE_PLAN.md).

---

## `deploy/` — Kubernetes

| Put                                                | Svrha                                                                                                      |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `deploy/helm/omniroute/`                           | Helm chart (`Chart.yaml`, `values.yaml`, predlošci za implementaciju, servis, ulaz, PVC, tajna, configmap) |
| `deploy/kubernetes/base/`                          | Prilagodite bazu (imenski prostor, implementacija, usluga, PVC, configmap, `secret.example.yaml`)          |
| `deploy/kubernetes/overlays/k3s/`, `overlays/k8s/` | Prekrivači specifični za klaster (ulaz, klasa skladištenja, resursi, sonde)                                |

Vidi [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

## `docker/` — pomoćne slike

| Put                                 | Svrha                                                                                                                 |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `docker/chatgpt-web-codex-browser/` | Slika preglednika bez glave sa CDP proxy za ChatGPT Web executor — vidi [CHATGPT_WEB.md](../providers/CHATGPT_WEB.md) |
| `docker/devin-bridge/`              | Devin bridge slika, komponujte fajl, mocks i mrežni čuvar                                                             |
| `docker/vnc-browser/`               | Chromium sa VNC za interaktivne sesije pretraživača                                                                   |

Glavna slika je korijen `Dockerfile`; vidi [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md).

## `contrib/` — recepti zajednice (nisu službeno podržani)

| Put                     | Svrha                                                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contrib/podman/`       | Podman kvadleti (kontejner, volumen, mreža, Redis)                                                                                                    |
| `contrib/vps/`          | VPS `compose.yaml` + `.env.example`                                                                                                                   |
| `contrib/windows/`      | `.bat` launchers for running from a Windows checkout                                                                                                  |
| `contrib/session-sync/` | README za proširenje pretraživača za sinhronizaciju sesije treće strane — pogledajte [SESSION-SYNC-EXTENSION.md](../guides/SESSION-SYNC-EXTENSION.md) |

## `examples/`

| Put                             | Svrha                                                                      |
| ------------------------------- | -------------------------------------------------------------------------- |
| `examples/omniroute-cmd-hello/` | Minimalni komandni dodatak — vidi [PLUGINS.md](../frameworks/PLUGINS.md)   |
| `examples/plugins/`             | Primjeri dodataka: langfuse, request-logger, theme-manager, welcome-banner |
| `examples/quickstart/`          | Isječci klijenta: curl, Node.js (axios), PHP, Python                       |

---

## `.github/` — GitHub integracija

| Put                                                          | Svrha                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`                                         | CI (`ci.yml`, `quality.yml`, `build.yml`), sigurnosna skeniranja (`codeql.yml`, `semgrep.yml`, `scorecard.yml`, `dast-smoke.yml`), zakazani `nightly-*.yml` paketi, objavljivanje (`npm-publish.yml`, `docker-publish.yml`, `electron-release.yml`), izdavanje i održavanje |
| `.github/actions/npm-ci-retry/`                              | Kompozitna radnja: `npm ci` s predmemorijem i ponovni pokušaj                                                                                                                                                                                                               |
| `.github/actions/prepare-unit-storage/`                      | Kompozitna radnja: oslobađa prostor na disku pokretača, a zatim instalira zavisnosti                                                                                                                                                                                        |
| `.github/ISSUE_TEMPLATE/`                                    | Obrasci problema sa greškom, karakteristikama i pokrivenošću testa                                                                                                                                                                                                          |
| `.github/pull_request_template.md`, `PULL_REQUEST_TEMPLATE/` | Zadani PR šablon plus bugfix/feature varijante                                                                                                                                                                                                                              |
| `.github/CODEOWNERS`, `FUNDING.yml`, `dependabot.yml`        | Vlasnici kodova, sponzorske veze, ažuriranja ovisnosti                                                                                                                                                                                                                      |
| `.github/labels.yml`                                         | Definicije oznaka koje primjenjuje `npm run labels:sync`                                                                                                                                                                                                                    |
| `.github/copilot-instructions.md`                            | GitHub Copilot instrukcije (površina instrukcija agenta)                                                                                                                                                                                                                    |

CI mapa poslova: [QUALITY_GATES.md](QUALITY_GATES.md).

## `.husky/` — git hooks

| File         | Svrha                                                                                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pre-commit` | Git provjera identiteta, lint-staged, gate manifest, sinhronizacija dokumenata, bilo koji budžet, tip-skala ratchet, praćene artefakte i ui-kit snapshot provjere |
| `commit-msg` | `scripts/check/check-ai-attribution.mjs` na poruci urezivanja                                                                                                     |
| `pre-push`   | Namjerno svjetlo: PATH/npm provjera ispravnosti koja izlazi iz 0                                                                                                  |

Vrijeme izvođenja kuke u `.husky/_/` se generira prilikom instalacije i ne prati se.

---

## Savjeti za navigaciju

- **Novi saradnik?** `CONTRIBUTING.md` → `AGENTS.md` → [ARCHITECTURE.md](ARCHITECTURE.md) → [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md).
- **Promena nečeg uobičajenog** (provajder, ruta, DB modul, MCP alat, A2A skill)? Pratite [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md).
- **Dodavanje provajdera?** Prvo provjerite [REMOVED_PROVIDERS.md](../reference/REMOVED_PROVIDERS.md), a zatim provjerite [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md).
- **Trčanje lokalno?** [SETUP_GUIDE.md](../guides/SETUP_GUIDE.md).
- **Raspoređivanje?** [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [SELF_HOST_GUIDE.md](../getting-started/SELF_HOST_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).
- **Oslobađanje?** [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md).
- **Kvalitetna kapija nije uspjela?** [QUALITY_GATES.md](QUALITY_GATES.md) i [QUALITY_GATE_PLAYBOOK.md](../ops/QUALITY_GATE_PLAYBOOK.md).
