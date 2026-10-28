# Repository Map (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Enradig beskrivning av varje katalog och rotfil.**
> Senast uppdaterad: 2026-06-28 — OmniRoute v3.8.40
>
> Använd den här kartan för att snabbt navigera i kodbasen. För djupdykningar följer du länkarna till den dedikerade dokumentationen.

## Träd på toppnivå

```
OmniRoute/
├── src/                  # Next.js 16-applikation (UI + API-rutter + bibliotek + domän + server)
├── open-sse/             # Arbetsyta för strömningsmotorn (hanterare, exekverare, översättare, MCP-server)
├── packages/            # npm-arbetsytor: ui-kit (inkluderat Keak CI UI Kit) och browser-pool
├── electron/             # Skrivbordsomslag (Electron 41 + electron-builder 26.10)
├── bin/                  # Startpunkt för CLI och kommandohanterare
├── scripts/              # Skript för bygge, kontroller, synkronisering och engångskörningar
├── docs/                 # Offentlig dokumentation (du är här)
├── tests/                # Alla testsviter (enhets-, integrations- och e2e-tester samt protokollklienter)
├── public/               # Statiska Next.js-resurser, PWA-manifest, service worker, ikoner
├── config/               # Statisk konfiguration + tillstånd för kvalitetsgrind (i18n, payloadRules, quality/)
├── images/               # Bildresurser för marknadsföring/README
├── @omniroute/           # Publicerbara kompletterande paket (opencode-plugin, opencode-provider)
├── skills/               # Färdighetspaket för CLI/agenter (cli-* + omni-* + config-codex-cli)
├── examples/             # Exempelplugins + startmall för omniroute-cmd-hello
├── contrib/              # Bidrag från communityn (podman/)
├── .source/              # Fumadocs-källkonfiguration (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actions-arbetsflöden + ärendemallar + PR-mall
├── .husky/               # Git-hooks (pre-commit, pre-push)
├── .claude/              # Snedstreckskommandon för Claude Code (projektspecifika)
├── .agents/              # Arbetsflöden + färdigheter för Codex/generiska agenter (spegel av .claude/)
├── .vscode/              # Arbetsyteinställningar för VS Code
├── _ideia/               # Planeringsanteckningar (informella; distribueras inte)
├── _mono_repo/           # Historiska delprojekt (cloud, site, vscode-extension)
├── _references/          # Skrivskyddade referenskloner från relaterade OSS-projekt
├── _tasks/               # Filer för uppgiftsspårning per utgåva (informella)
├── .build/ .worktrees/ dist/   # Lokala arbetsytor för bygge/git-worktree/byggutdata (ignoreras av git)
├── .issues/              # Lokal ärendecache (ignoreras av git)
├── .playwright-mcp/      # Testartefakter för Playwright MCP
├── coverage/             # Täckningsutdata från c8 (ignoreras av git)
├── logs/                 # Körtidsloggar (ignoreras av git)
├── node_modules/         # Beroenden (ignoreras av git)
├── package/              # Förberedelseområde för npm pack (byggartefakt)
├── .next/                # Byggutdata från Next.js (ignoreras av git)
└── (rotfiler — se nedan)
```

---

## Rotfiler

| Fil                                         | Syfte                                                                                        |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **README.md**                               | Marknadsföringssida + snabbstart + funktionsmatris (se även `llm.txt`)                       |
| **CHANGELOG.md**                            | Ändringslogg per utgåva (automatiskt genererad av färdigheten `/version-bump-cc`)            |
| **LICENSE**                                 | MIT-licenstext                                                                               |
| **CLAUDE.md**                               | Projektregler för Claude Code-agenter (strikta regler, konventioner, scenarier)              |
| **AGENTS.md**                               | Samma som CLAUDE.md, men för AI-agenter som inte är Claude (Codex, Cursor osv.)              |
| **GEMINI.md**                               | Kortfattade regler för Gemini-baserade agenter (delmängd av CLAUDE.md)                       |
| **CONTRIBUTING.md**                         | Bidragsguide: konfiguration, conventional commits, testning, PR-flöde                        |
| **SECURITY.md**                             | Policy för rapportering av sårbarheter, versioner som stöds, hotmodell                       |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — förväntningar på beteende i gemenskapen                               |
| **llm.txt**                                 | Landningssida i klartext, optimerad för LLM-crawlare (SEO för AI-assistenter)                |
| **package.json**                            | npm-manifest, skript, beroenden, motorer, c8-täckningsgrind                                  |
| **package-lock.json**                       | Låst beroendeträd                                                                            |
| **tsconfig.json**                           | TypeScript-konfiguration på rotnivå                                                          |
| **tsconfig.typecheck-core.json**            | Typkontrollskonfiguration för kärnan i `src/`                                                |
| **tsconfig.typecheck-noimplicit-core.json** | Strikt typkontroll (`noImplicitAny`)                                                         |
| **tsconfig.tsbuildinfo**                    | Cache för inkrementella TS-byggen (ignoreras av git)                                         |
| **next.config.mjs**                         | Byggkonfiguration för Next.js 16 (fristående utdata)                                         |
| **next-env.d.ts**                           | Automatiskt genererade miljötyper för Next.js                                                |
| **eslint.config.mjs**                       | Platt ESLint-konfiguration (regler per projektområde)                                        |
| **prettier.config.mjs**                     | Formateringsregler för Prettier                                                              |
| **postcss.config.mjs**                      | PostCSS-konfiguration för Tailwind-/CSS-pipeline                                             |
| **playwright.config.ts**                    | Konfiguration för Playwright E2E-tester                                                      |
| **vitest.config.ts**                        | Vitest-konfiguration (standardsvit)                                                          |
| **vitest.mcp.config.ts**                    | Vitest-konfiguration för MCP-server-/autoCombo-/cachesviter                                  |
| **sonar-project.properties**                | SonarQube-/SonarCloud-konfiguration (kodkvalitet)                                            |
| **Dockerfile**                              | Docker-bygge i flera steg (builder → runner-base → runner-cli)                               |
| **docker-compose.yml**                      | Compose för utveckling med fyra profiler (base, cli, host, cliproxyapi) + redis-sidecar      |
| **docker-compose.prod.yml**                 | Compose för produktion (port 20130, redis, namngivna volymer)                                |
| **.dockerignore**                           | Filer som exkluderas från Docker-kontexten                                                   |
| **fly.toml**                                | Distributionskonfiguration för Fly.io (region `sin`, port 20128, /data-volym)                |
| **.env.example**                            | Mall för miljöfil (kopieras automatiskt till `.env` vid första installationen)               |
| **.gitignore**                              | Ignoreringsmönster för Git                                                                   |
| **.npmignore**                              | Exkluderingslista för npm-publicering                                                        |
| **.npmrc**                                  | npm-konfiguration (register, policy för låsfil)                                              |
| **.node-version**                           | Låst Node-version (används av nvm-kompatibla verktyg)                                        |
| **.nvmrc**                                  | Låst Node-version för nvm                                                                    |
| **eslint.complexity.config.mjs**            | ESLint-konfiguration för komplexitetsspärren (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | ESLint-konfiguration för SonarJS-regler (kognitiv komplexitet/dubblering)                    |
| **source.config.ts**                        | Fumadocs `defineDocs`-källkonfiguration (matar `.source/`)                                   |
| **knip.json**                               | Knip-konfiguration — oanvända filer/exporter/beroenden (matar spärren för död kod)           |
| **stryker.conf.json**                       | Konfiguration för mutationstestning med Stryker                                              |
| **.size-limit.json**                        | Konfiguration av storleksgräns för paket                                                     |
| **promptfooconfig.yaml**                    | Utvärderingskonfiguration för promptfoo                                                      |
| **.gitleaks.toml**                          | Regeluppsättning för hemlighetsskanning med gitleaks                                         |
| **.zizmor.yml**                             | Konfiguration för säkerhetslintning av GitHub Actions med zizmor                             |
| **socket.yml**                              | Konfiguration för leveranskedjan med Socket.dev                                              |
| **news.json**                               | Lokaliserat v2-meddelandeflöde; lanseringspost för Radar levereras inaktiv                   |
| **flake.nix** / **flake.lock**              | Definition och låsfil för Nix-utvecklingsskal                                                |
| **.env**                                    | Lokala hemligheter (ignoreras av git — genereras från `.env.example`)                        |

> **Flyttat från roten i v3.8.26 (rensning):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` och den genererade `quality-metrics.json` (ignoreras av git). Se [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js applikation

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

### `src/app/` — App-router (Next.js 16)

| Väg                                                                          | Ändamål                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                                | Public OpenAI-compat API (~ 25 underrutter: chatt, kompletteringar, inbäddningar, filer, partier, ljud, bilder, videor, musik, omrankning, moderering, sökning, ws, agenter, konton, leverantörer, etc.)                                                                                                           |
| `app/api/v1beta/`                                                            | API slutpunkter i Gemini-stil                                                                                                                                                                                                                                                                                      |
| `app/api/playground/`                                                        | Playground Studio rutter: `improve-prompt/` (POST — LLM prompt rewriter), `presets/` (GET list / POST create), `presets/[id]/` (GET / PUT / DELETE) - se `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                    |
| `app/api/` (icke-v1)                                                         | Management/admin -rutter (~ 60-kataloger: leverantörer, kombinationer, inställningar, mcp, a2a, evals, minne, färdigheter, webhooks, efterlevnad, motståndskraft, övervakning, tunnlar, cli-verktyg, etc.)                                                                                                         |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 rutter (serverkontroll, agent state/DNS/mappings, bypass, cert, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Se `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                        |
| `app/api/tools/traffic-inspector/`                                           | Trafikinspektör REST + WS API — 16 + -rutter (förfrågningar, sessioner, värdar, fångstlägen, export, ws). LOCAL_ONLY + SPAWN_CAPABLE. Se `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 ingångspunkt (`POST /a2a`)                                                                                                                                                                                                                                                                        |
| `app/.well-known/agent.json/`                                                | A2A Agent Card (upptäckt)                                                                                                                                                                                                                                                                                          |
| `app/(dashboard)/dashboard/`                                                 | Dashboard UI sidor (50 + sektioner, ~ 118 page.tsx -filer: leverantörer, kombinationer, inställningar, minne, färdigheter, webhooks, evals, revision, batch, cache, kostnader, hälsa, system, aktivitet, etc.)                                                                                                     |
| `app/(dashboard)/dashboard/search-tools/`                                    | Sökverktyg Studio UI (3 flikar: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — se `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                         |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (3-tabs skal), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge instrumentpanelsida — serverkort, 9 agentkort, installationsguide, modellmappning, bypass-lista. i18n PT-BR + EN. Se `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                                 |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Trafikinspektörens instrumentpanelsida — DevTools -delning, 7 detaljflikar, 4 växlar för fångstläge, sessionsinspelning, kontextfärgning. i18n PT-BR + EN. Se `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                              |
| `app/(dashboard)/dashboard/activity/`                                        | Aktivitetsflödessida (grupp B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — se `docs/architecture/MONITORING_SECTIONS.md`                                                                                                            |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Sida för kvotdelning (Grupp B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                        |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Konfigurationssida för leverantörsplan (Grupp B): `page.tsx` + `ProviderPlanConfigClient.tsx` — kvotdimensioner per anslutningsöverstyrning                                                                                                                                                                        |
| `app/docs/`                                                                  | Inbäddad dokumentationsvisare (renderar `docs/*.md`)                                                                                                                                                                                                                                                               |
| `app/landing/`                                                               | Marknadsföringsmålsida                                                                                                                                                                                                                                                                                             |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Auth-relaterade sidor                                                                                                                                                                                                                                                                                              |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP felsidor                                                                                                                                                                                                                                                                                                      |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Static/status sidor                                                                                                                                                                                                                                                                                                |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Rotlayout, hem, PWA -manifest, global CSS                                                                                                                                                                                                                                                                          |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Felgränser                                                                                                                                                                                                                                                                                                         |

### `src/lib/` — Kärnbibliotek (~ 50 moduler)

| Modul                                    | Ändamål                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A protokoll uppgiftshanterare, färdigheter (5), streaming                                                                                                                                                                                                                                                             |
| `acp/`                                   | CLI Agent Registry (lokal CLI -upptäckt — se `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                |
| `api/`                                   | Delade API hjälpare (`requireManagementAuth`, validering)                                                                                                                                                                                                                                                               |
| `auth/`                                  | Session, lösenordshasning, tokenvalidering                                                                                                                                                                                                                                                                              |
| `batches/`                               | OpenAI Batcher API hanterare                                                                                                                                                                                                                                                                                            |
| `catalog/`                               | Leverantörskatalog Zod -validering + -kapacitetsupplösning                                                                                                                                                                                                                                                              |
| `cloudAgent/`                            | Molnagenter (Codex Cloud, Devin, Jules) — se `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                           |
| `combos/`                                | Combo resolution + omordning hjälpare                                                                                                                                                                                                                                                                                   |
| `audit/`                                 | Aktivitetsflödeshjälpare: `highLevelActions.ts` (tillståndslista + `isHighLevelAction()`), `activityIcons.ts` (action → icon/verb map), `timeline.ts` (groupByDay/relativeTime) — se `docs/architecture/MONITORING_SECTIONS.md`                                                                                         |
| `compliance/`                            | Granskningslogg + provider audit — se `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                     |
| `compression/`                           | Kompressionsmotorlim (motorerna bor i `open-sse/services/compression/`)                                                                                                                                                                                                                                                 |
| `config/`                                | Körtidskonfigurationshjälpmedel                                                                                                                                                                                                                                                                                         |
| `db/`                                    | 120 + domän DB moduler + 168-migreringar (gå alltid igenom här för SQLite)                                                                                                                                                                                                                                              |
| `quota/`                                 | Quota Sharing Engine: `dimensions.ts` (types/Zod), `types.ts` (QuotaStore gränssnitt), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — se `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Radarfri modellkatalogklient: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — se `docs/frameworks/RADAR.md`                                                                                                                                                |
| `display/`                               | UI -formateringshjälpmedel (kostnad, latens, etc.)                                                                                                                                                                                                                                                                      |
| `embeddings/`                            | Inbäddningstjänsthjälpare                                                                                                                                                                                                                                                                                               |
| `env/`                                   | Env-variabel tolkar + -validering                                                                                                                                                                                                                                                                                       |
| `evals/`                                 | Eval framework (suites, runner, runtime) — se `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                                |
| `guardrails/`                            | PII masker, snabb injektion, vision bridge — se `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                           |
| `jobs/`                                  | Bakgrundsjobb (cron-liknande)                                                                                                                                                                                                                                                                                           |
| `memory/`                                | Konversationsminne (SQLite FTS5 + sqlite-vec hybrid RRF + Qdrant tier 2) — se `docs/frameworks/MEMORY.md`                                                                                                                                                                                                               |
| `memory/embedding/`                      | Inbäddningslager med flera källor: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                      |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 wrapper — KNN brute-force + hybrid RRF (FTS5 + vektor, k = 60). Lazy-init, försämras graciöst när sqlite-vec inte är tillgänglig. (plan 21)                                                                                                                                                           |
| `memory/reindex.ts`                      | `runReindexBatch()` — bearbetar minnen med `needs_reindex=1` i bakgrunden; anropas av `POST /api/memory/reindex` och lazy-backfill path. (plan 21)                                                                                                                                                                      |
| `monitoring/`                            | Hälsokontroller, mätvärden emission                                                                                                                                                                                                                                                                                     |
| `oauth/`                                 | OAuth/import flöden för 22 leverantörsmoduler (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, qoder- traference, zed)                                                                             |
| `plugins/`                               | Plugin-registret                                                                                                                                                                                                                                                                                                        |
| `promptCache/`                           | Cache-brytpunkter i antropisk stil                                                                                                                                                                                                                                                                                      |
| `skills/`                                | Skills framework (inbyggd + marketplace + SkillsSH) — se `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                    |
| `playground/`                            | Playground Studio delade hjälpare: `codeExport.ts` (curl/Python/TS generator), `promptImprover.ts` (meta-promptbyggare), `streamMetrics.ts` (ren TTFT/TPS), `types.ts` (pristabell) — se `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                         |
| `webhookDispatcher.ts`                   | HMAC webhook leverans — se `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Tunnelförvaltare — se `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                       |
| `cloudSync.ts`, `initCloudSync.ts`       | Valfri molnsynkronisering av tillstånd                                                                                                                                                                                                                                                                                  |
| `localDb.ts`                             | Återexportera fat för db-moduler (ingen logik – endast återexport)                                                                                                                                                                                                                                                      |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Begär caching + idempotens                                                                                                                                                                                                                                                                                              |
| (~ 30 fler toppnivåfiler)                | Specialiserade hjälpare (logEnv, modelsDevSync, piiSanitizer, etc.)                                                                                                                                                                                                                                                     |

### `src/lib/db/` — Databas (147 moduler + 208-migreringar)

| Subdir                    | Ändamål                                                                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `db/core.ts`              | `getDbInstance()` singleton med WAL journaling                                                                                                                                                         |
| `db/migrations/`          | Versionerade SQL filer (idempotenta, transaktionella). `073_memory_vec.sql` lägger till `memory_vec_meta` + `needs_reindex` kolumn (plan 21).                                                          |
| `db/playgroundPresets.ts` | CRUD modul för Playground Studio-förinställningar (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)                       |
| `db/memoryVec.ts`         | CRUD för `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue`, etc. (plan 21)                                            |
| `db/<domain>.ts`          | En modul per domän: leverantörer, kombinationer, apiKeys, användare, sessioner, användning, granskningslogg, webhooks, färdigheter, minnesposter, cloud_agent_tasks, evals* \* , resonemangscache osv. |

### `src/domain/`

| Modul                  | Ändamål                                         |
| ---------------------- | ----------------------------------------------- |
| `policy.ts`            | Policymotor                                     |
| `fallbackPolicy.ts`    | Reservbeslutsträd                               |
| `costRules.ts`         | Regler för kostnadsberäkning                    |
| `lockoutPolicy.ts`     | Model/connection lockoutpolicy                  |
| `tagRouter.ts`         | Taggbaserad routing                             |
| `comboResolver.ts`     | Combo-upplösning (används av combo-motorn)      |
| `modelAvailability.ts` | Tillgänglighetskontroll per modell              |
| `assessment/`          | Modellbedömning (Fas 1 av RFC-AUTO-ASSESSMENT ) |

### `src/server/`

| Modul    | Ändamål                                                                                             |
| -------- | --------------------------------------------------------------------------------------------------- |
| `authz/` | Auktoriseringspipeline: `classify` → `policies` → `enforce` — se `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS -konfiguration                                                                                 |
| `auth/`  | Session mellanprogram                                                                               |

### `src/shared/`

| Modul                            | Ändamål                                                                                                  |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `components/`                    | Instrumentpanelskomponent API: adaptrar över `packages/ui-kit` — se `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: ikonnamn som används av skärmarna → Lucide-komponenter (`<Icon>`)                            |
| `constants/providers.ts`         | **377 leverantörer** med Zod -validering (källa till sanning)                                            |
| `constants/cliTools.ts`          | Externt CLI -verktygsregister                                                                            |
| `constants/routingStrategies.ts` | **20 routingstrategier** med prioriteringar                                                              |
| `constants/publicApiRoutes.ts`   | Rutter som kräver bärare (mot hantering) autentisering                                                   |
| `constants/upstreamHeaders.ts`   | Header denylist för uppströmsförfrågningar                                                               |
| `validation/schemas.ts`          | ~ 80 Zod scheman (enda källa till sanning för API kontrakt)                                              |
| `validation/helpers.ts`          | Zod -valideringshjälpmedel (`validateBody`, etc.)                                                        |
| `types/`                         | Delade TS typer                                                                                          |
| `contracts/`                     | Offentliga API kontrakt (konsumeras av `files:` i `package.json`)                                        |
| `utils/circuitBreaker.ts`        | Leverantörs strömbrytare (se `docs/architecture/RESILIENCE_GUIDE.md`)                                    |
| `utils/apiAuth.ts`               | API -nyckelvalidering, omfattningskontroll                                                               |
| `utils/fetchTimeout.ts`          | Timeout/abort -omslag för uppströmshämtning                                                              |
| `utils/releaseNotes.ts`          | Stängd v2/legacy -meddelandeparser, lokalisering och ID -avvisning                                       |

---

## `open-sse/` — arbetsyta för strömningsmotorn

Separat npm-arbetsyta (`@omniroute/open-sse`). Hanterar bearbetning av förfrågningar och körning mot leverantörer.

```
open-sse/
├── handlers/            # 16 filer (12 hanterare + 4 hjälpfunktioner): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search osv.
├── executors/           # 150 exekveringsmoduler (klasser som utökar BaseExecutor + hjälpfunktioner per leverantör)
├── translator/          # Formatkonverterare (9 för förfrågningar, 9 för svar, 9 hjälpfunktioner)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ tjänstemoduler (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM osv.)
├── mcp-server/          # MCP-server (110 verktyg, 3 transporter, 33 behörighetsomfång)
├── config/              # Leverantörs-/modellregister, konfiguration av headers, modellalias
├── utils/               # TLS-klient, proxy-fetch/dispatcher, nätverkshjälpfunktioner
├── index.ts             # Arbetsytans startpunkt
├── package.json         # Arbetsytans manifest
├── tsconfig.json        # Arbetsytans TS-konfiguration
└── types.d.ts           # Arbetsytans typdeklarationer
```

### `open-sse/mcp-server/`

| Sökväg                      | Syfte                                                                           |
| --------------------------- | ------------------------------------------------------------------------------- |
| `server.ts`                 | MCP-serverns livscykel (stdio- och HTTP-transporter)                            |
| `httpTransport.ts`          | HTTP Streamable- och SSE-transporter (`/api/mcp/sse`, `/api/mcp/stream`)        |
| `audit.ts`                  | Granskningsloggning till tabellen `mcp_tool_audit`                              |
| `scopeEnforcement.ts`       | Validering av behörighetsomfång per verktyg                                     |
| `runtimeHeartbeat.ts`       | Hälsopuls till `DATA_DIR/runtime/mcp-heartbeat.json`                            |
| `descriptionCompressor.ts`  | Komprimerar metadata för verktygsbeskrivningar för att spara kontext            |
| `schemas/tools.ts`          | 36 grundläggande verktygsdefinitioner + behörighetsomfång                       |
| `tools/advancedTools.ts`    | Avancerade verktygsimplementationer                                             |
| `tools/memoryTools.ts`      | 3 minnesverktyg (sök/lägg till/rensa)                                           |
| `tools/skillTools.ts`       | 4 färdighetsverktyg (lista/aktivera/kör/körningar)                              |
| `tools/compressionTools.ts` | 5 komprimeringsverktyg                                                          |
| `README.md`                 | Intern README för MCP-servern (korslänkad från `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — arbetsytor

| Sökväg                   | Syfte                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — lokalt lagrad ögonblicksbild av Keak CI UI Kit (`private`, `UNLICENSED`), som används direkt som källkod (ingen byggprocess). `UPSTREAM.md` låser uppströms-committen och dokumenterar licensgodkännandet; `PATCHES.md` listar lokala patchar (inga); `src/` synkroniseras endast av `scripts/dev/sync-ui-kit.sh` och skyddas av `npm run check:ui-kit-snapshot`. Se `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — valfri tjänst för webbläsarpool (CloakBrowser och Playwright-baserad chatt)                                                                                                                                                                                                                                                                                                                         |

---

## `electron/` — Skrivbordsomslag

| Fil              | Syfte                                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| `main.js`        | Electrons huvudprocess (BrowserWindow, inbäddad Next.js-server, systemfält, automatisk uppdatering) |
| `preload.js`     | IPC-brygga (contextBridge → `window.omniroute`)                                                     |
| `package.json`   | electron-builder-konfiguration + Electron 41 + electron-builder 26.10-beroenden                     |
| `assets/`        | Appikoner (Windows .ico, macOS .icns, Linux .png)                                                   |
| `dist-electron/` | Byggutdata (ignoreras av git)                                                                       |
| `types.d.ts`     | Typdeklarationer för renderingsbryggan                                                              |
| `README.md`      | Intern README för Electron (se även `docs/guides/ELECTRON_GUIDE.md`)                                |

---

## `bin/` — CLI

| Fil                                                                                                         | Syfte                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Huvudsaklig CLI-ingångspunkt — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` osv. |
| `reset-password.mjs`                                                                                        | Fristående CLI för lösenordsåterställning                                                                                               |
| `cli/commands/setup.mjs`                                                                                    | Interaktiv + icke-interaktiv installationsguide                                                                                         |
| `cli/commands/doctor.mjs`                                                                                   | Diagnostik av systemets hälsa (8+ kontroller)                                                                                           |
| `cli/commands/providers.mjs`                                                                                | Lista/testa/validera leverantörer                                                                                                       |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI-hjälpmoduler                                                                                                                        |
| `cli/tray/tray.ts`                                                                                          | Integrering med systemfältet (plattformsoberoende: NotifyIcon i Windows, systray2 i macOS/Linux)                                        |
| `cli/tray/tray.ps1`                                                                                         | PowerShell-bakände för NotifyIcon (Windows, inga nya binärfiler)                                                                        |
| `cli/tray/autostart.ts`                                                                                     | Plattformsoberoende automatisk start (LaunchAgent / .desktop / registret)                                                               |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Upplösningskedja i 5 steg för SQLite-drivrutiner (paketerad → körning → lat installation → node:sqlite → sql.js)                        |
| `cli/runtime/magicBytes.mjs`                                                                                | Validering av binära magiska byte (ELF / Mach-O / Mach-O fat / PE)                                                                      |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — förhandsupplöser drivrutiner efter installation / vid första starten                                               |
| `nodeRuntimeSupport.mjs`                                                                                    | Validerar att Node.js-versionen stöds vid installation                                                                                  |

---

## `skills/` — Offentliga agentfärdigheter

| Fil                          | Syfte                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 färdighetsmanifest för externa AI-agenter (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Skript för bygge och kontroller

| Skript                              | Syfte                                                                                                |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Utvecklings-/startskript med inläsning av miljövariabler                                             |
| `build-next-isolated.mjs`           | Fristående bygge (fristående Next.js 16)                                                             |
| `prepublish.ts`                     | Paketförberedelser före `npm pack`                                                                   |
| `postinstall.mjs`                   | Skapa `.env` automatiskt från `.env.example` vid första installationen                               |
| `sync-env.mjs`                      | Synkronisera om nycklar i `.env` med `.env.example`                                                  |
| `check-cycles.mjs`                  | Identifiera cirkulära beroenden                                                                      |
| `check-route-validation.mjs`        | Verifiera att alla API-rutter har Zod-validering                                                     |
| `check-t11-any-budget.mjs`          | Genomdriv en uttrycklig budget för `any` per fil                                                     |
| `check-docs-sync.mjs`               | Verifiera synkronisering av dokumentationsversioner (befintlig kontroll före incheckning)            |
| **`check-env-doc-sync.mjs`**        | NYTT: jämför miljövariabler i koden med `.env.example` och `ENVIRONMENT.md`                          |
| **`check-docs-counts-sync.mjs`**    | NYTT: verifiera att antal (exekverare, strategier, OAuth, A2A-färdigheter) stämmer i dokumentationen |
| **`check-deprecated-versions.mjs`** | NYTT: flagga inaktuella versioner/datum i dokumentationen                                            |
| `check-supported-node-runtime.ts`   | Verifiera att den aktuella Node-versionen stöds                                                      |
| `check-pr-test-policy.mjs`          | Genomdriv regeln ”tester krävs” för ändringar i produktionskod                                       |
| **`gen-provider-reference.ts`**     | NYTT: generera `docs/reference/PROVIDER_REFERENCE.md` automatiskt från katalogen                     |
| `i18n/generate-multilang.mjs`       | Översätt UI-strängar och dokumentation via Google Translate                                          |
| `i18n_autotranslate.py`             | LLM-baserad pipeline för dokumentöversättning                                                        |
| `validate_translation.py`           | Validering av översättningar per språkversion                                                        |
| `check_translations.py`             | Kontroll av i18n-nycklar på kodsidan                                                                 |
| `run-playwright-tests.mjs`          | Playwright-körskript för E2E-tester                                                                  |
| `run-protocol-clients-tests.mjs`    | Körskript för MCP/A2A-E2E-tester                                                                     |
| `run-ecosystem-tests.mjs`           | Ekosystemtester (leverantörsintegration)                                                             |
| `test-report-summary.mjs`           | Generera sammanfattning av kodtäckning i markdown                                                    |
| `smoke-electron-packaged.mjs`       | Röktesta paketerat Electron-bygge                                                                    |
| `native-binary-compat.mjs`          | Verifiera att inbyggda beroenden (`better-sqlite3`) matchar Electrons Node-version                   |
| `validate-pack-artifact.ts`         | Verifiera utdata från npm-paketering                                                                 |
| `responses-ws-proxy.mjs`            | WebSocket-brygga för Codex Responses API                                                             |
| `v1-ws-bridge.mjs`                  | WebSocket-brygga för ändpunkten `/api/v1/ws`                                                         |
| `standalone-server-ws.mjs`          | Körskript för fristående WS-server                                                                   |
| `system-info.mjs`                   | Skriv ut system-/körningsinformation för support                                                     |
| `healthcheck.mjs`                   | Hälsokontroll som körs en gång (används av Docker HEALTHCHECK)                                       |
| `uninstall.mjs`                     | Skript för ren avinstallation                                                                        |
| `dev/sync-ui-kit.sh`                | Kopiera CI UI Kit `src/` från en fäst incheckning till `packages/ui-kit/src`                         |
| `check/check-ui-kit-snapshot.mjs`   | Kontroll före incheckning: `packages/ui-kit/src` matchar den fästa uppströmsincheckningen            |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — använda ikonnamn som `ICON_MAP` inte mappar                                 |
| `dev/codemod-material-icons.mjs`    | Skriv om bokstavliga Material Symbols-span-element till `<Icon>` (migreringsverktyg)                 |

---

## `docs/` — Offentlig dokumentation (7 rotfiler + 17 underkataloger)

### Guider på högsta nivå

| Dok                         | Ändamål                                                                                  |
| --------------------------- | ---------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Högnivåarkitektur, delsystemkarta, instrumentpanelsyta                                   |
| `CODEBASE_DOCUMENTATION.md` | Teknisk referens: kataloger, moduler, konventioner                                       |
| `FEATURES.md`               | Funktionsmatris med v3.8-höjdpunkter                                                     |
| `USER_GUIDE.md`             | Slutanvändarmanual (installation, modeller, kombinationer, CLIs, ljud, etc.)             |
| `API_REFERENCE.md`          | API slutpunktsreferens med auth-modell                                                   |
| `openapi.yaml`              | OpenAPI 3.0 spec (121 sökvägar)                                                          |
| `SETUP_GUIDE.md`            | Installationsmetoder (npm, npx, Docker, Electron, Termux, source)                        |
| `ENVIRONMENT.md`            | Alla env vars (~ 800 dokumenterad, ~ 3 050 rader `.env.example`)                         |
| `TROUBLESHOOTING.md`        | Vanliga fel + v3.8.0 kända problem                                                       |
| `RELEASE_CHECKLIST.md`      | Fullständigt frigöringsflöde (färdigheter, husky, konventionella commits, deploy)        |
| `COVERAGE_PLAN.md`          | Täckningsmål och nuvarande tillstånd                                                     |
| `FREE_TIERS.md`             | Utvalda leverantörer av fri nivå (48 + gratis + 11 OAuth)                                |
| `CLI-TOOLS.md`              | Externa CLI -integreringar + Intern OmniRoute CLI                                        |
| `I18N.md`                   | i18n-arkitektur, lägga till ett språk, 67 språk                                          |
| `UNINSTALL.md`              | Rengör avinstallationsstegen                                                             |
| `PROVIDER_REFERENCE.md`     | **Autogenererad** katalog med 377 leverantörer (regen: `npm run gen:provider-reference`) |

### Delsystem djupdykning

| Dok                                           | Ändamål                                                                    |
| --------------------------------------------- | -------------------------------------------------------------------------- |
| `MCP-SERVER.md`                               | MCP server: 110 verktyg, 3 transporter, 33 scopes, REST slutpunkter        |
| `A2A-SERVER.md`                               | A2A v0.3: JSON-RPC, 6 färdigheter, REST hjälpare, agentkort                |
| `AGENT_PROTOCOLS_GUIDE.md`                    | Enad guide: A2A vs ACP vs Cloud Agents                                     |
| `CLOUD_AGENT.md`                              | Codex Cloud / Devin / Jules orkestrering                                   |
| `SKILLS.md`                                   | Färdighetsramverk (inbyggd + marketplace + SkillsSH + sandlåda)            |
| `RADAR.md`                                    | Radarfri modellkatalogöverlagring (`RADAR_ENABLED`, av som standard)       |
| `MEMORY.md`                                   | Minnessystem (SQLite FTS5 + Qdrant)                                        |
| `EVALS.md`                                    | Eval-ramverk (sviter, körningar, rubriker)                                 |
| `GUARDRAILS.md`                               | PII masker, snabb injektion, synbro                                        |
| `COMPLIANCE.md`                               | Revisionslogg, retention, noLog opt-out                                    |
| `WEBHOOKS.md`                                 | HMAC-signerad webhook leverans                                             |
| `REASONING_REPLAY.md`                         | Hybrid memory/SQLite -cache för `reasoning_content`                        |
| `AUTHZ_GUIDE.md`                              | Auktoriseringspipeline (`classify` → `policies` → `enforce`)               |
| `RESILIENCE_GUIDE.md`                         | Strömbrytare + cooldown + modell lockout                                   |
| `docs/security/STEALTH_GUIDE.md` (endast git) | TLS fingeravtryck (JA3/JA4), Claude Code CCH, MITM cert                    |
| `AUTO-COMBO.md`                               | Auto Combo-motor (16-faktors poängsättning, 6 lägespaket, virtuell fabrik) |

### Kompression

| Dok                             | Ändamål                                    |
| ------------------------------- | ------------------------------------------ |
| `COMPRESSION_GUIDE.md`          | Översikt över kompressionslägen + färdplan |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK motorer, registerkontrakt    |
| `COMPRESSION_RULES_FORMAT.md`   | Caveman regel pack JSON schema             |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventering av regelpaket per språk        |
| `RTK_COMPRESSION.md`            | RTK deklarativ pipeline (56 filter)        |

### Spridning

| Dok                          | Ändamål                                                           |
| ---------------------------- | ----------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker build, profiler (base/cli/host/cliproxyapi), Redis sidvagn |
| `VM_DEPLOYMENT_GUIDE.md`     | Generisk VM/VPS distribution (Ubuntu/Debian + nginx + systemd)    |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io-distribution (för närvarande endast kinesiska)             |
| `TERMUX_GUIDE.md`            | Android headless via Termux                                       |
| `PWA_GUIDE.md`               | Progressive Web App installation + service worker                 |
| `ELECTRON_GUIDE.md`          | Skrivbordsapp bygga + sign + distribuera                          |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale tratt                             |
| `PROXY_GUIDE.md`             | 4-nivå utgående proxy + 1proxy marknadsplats                      |

### Underkataloger

| Subdir                | Ändamål                                                                                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokaliserade dokumentöversättningar (41 språk)                                                                                                                                                    |
| `docs/screenshots/`   | Bildtillgångar för guider                                                                                                                                                                         |
| `_tasks/superpowers/` | Plans/specs från supermakter (`writing-plans`/`brainstorming`) + forskning — isolerad repo med separat version, gitignorerad av huvudträdet. Se CLAUDE.md → "Planering och forskning artefakter". |

---

## `tests/` — Testsviter

| Underkatalog                         | Typ                                          | Testkörare                                |
| ------------------------------------ | -------------------------------------------- | ----------------------------------------- |
| `tests/unit/`                        | Enhetstester (~4 800 filer, snabbast)        | Nodes inbyggda testkörare                 |
| `tests/integration/`                 | Integrationstester för flera moduler + DB    | Nodes inbyggda testkörare (samtidighet 1) |
| `tests/e2e/`                         | E2E för användargränssnitt + arbetsflöde     | Playwright                                |
| `tests/e2e/protocol-clients.test.ts` | E2E med verkliga klienter för MCP + A2A      | Anpassade protokollklienter               |
| `tests/e2e/ecosystem.test.ts`        | Leverantörsintegration (med nätverksåtkomst) | Nodes inbyggda testkörare                 |

---

## `public/` — Statiska resurser

| Sökväg              | Syfte                                                                  |
| ------------------- | ---------------------------------------------------------------------- |
| `public/` (rot)     | Favikoner, robots.txt, manifest, service worker, marknadsföringsbilder |
| `public/providers/` | Leverantörslogotyper i PNG/SVG (används i kontrollpanelen)             |

---

## `config/` — Statiska konfigurationer + tillstånd för kvalitetsgrindar

Levererade konfigurationsmallar samt versionshanterade baslinjer för kvalitetsgrindar
(flyttade hit från kodförrådets rot i v3.8.26 för att hålla roten avskalad).

| Sökväg                                        | Syfte                                                                                  |
| --------------------------------------------- | -------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Lista över språkversioner + metadata (kanonisk källa för antalet 42 språkversioner)    |
| `config/i18n-schema.json`                     | JSON-schema som validerar `i18n.json`                                                  |
| `config/payloadRules.json`                    | Regler för sanering av nyttolaster från uppströmskällor                                |
| `config/quality/quality-baseline.json`        | Spärrbaslinje med flera mätvärden (`scripts/quality/check-quality-ratchet.mjs`)        |
| `config/quality/complexity-baseline.json`     | Fryst baslinje för ESLint-komplexitet (`check-complexity.mjs`)                         |
| `config/quality/duplication-baseline.json`    | Fryst baslinje för jscpd-duplicering (`check-duplication.mjs`)                         |
| `config/quality/file-size-baseline.json`      | Fryst baslinje för storlek per fil (`check-file-size.mjs`)                             |
| `config/quality/test-discovery-baseline.json` | Fryst baslinje för fristående tester (`check-test-discovery.mjs`)                      |
| `config/quality/dependency-allowlist.json`    | Tillåtelselista över godkända beroenden (`check-deps.mjs`)                             |
| `config/quality/.license-allowlist.json`      | Tillåtelselista över SPDX-licenser (`check-licenses.mjs`)                              |
| `config/quality/quality-metrics.json`         | Tillfälligt insamlade mätvärden (genereras av `collect-metrics.mjs`; **gitignorerad**) |

---

## `.github/` — GitHub-integration

| Sökväg                             | Syfte                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions-arbetsflöden för CI/CD (lintning, testning, täckning, lansering) |
| `.github/ISSUE_TEMPLATE/`          | Ärendemallar för buggar/funktioner                                              |
| `.github/pull_request_template.md` | PR-mall                                                                         |
| `.github/dependabot.yml`           | Konfiguration för beroendeuppdateringar                                         |

---

## `.husky/` — Git-hooks

| Fil          | Syfte                                                                           |
| ------------ | ------------------------------------------------------------------------------- |
| `pre-commit` | Kör `lint-staged + check-docs-sync + check:any-budget:t11`                      |
| `pre-push`   | För närvarande inaktiverad (bortkommenterad). Kör `npm run test:unit` manuellt. |
| `_/`         | Husky-interna filer                                                             |

---

## `.claude/` — Snedstreckskommandon för Claude Code

| Fil                                                 | Syfte                                                        |
| --------------------------------------------------- | ------------------------------------------------------------ |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — höj versionen + automatisk ändringslogg |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — fullständigt lanseringsarbetsflöde  |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Distribuera till VPS                                         |
| `commands/capture-release-evidences-cc.md`          | Spela in nya funktioner i webbläsaren som WebP               |
| `commands/review-{prs,discussions}-cc.md`           | Prioritera GitHub-PR:er/diskussioner                         |
| `commands/{review-issues,implement-features}-cc.md` | Arbetsflöden för ärenden                                     |
| `settings.local.json`                               | Projektspecifika Claude Code-inställningar                   |

---

## `.agents/` — Generiska agentarbetsflöden (Codex/Cursor/etc.)

| Sökväg                   | Syfte                                                         |
| ------------------------ | ------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 arbetsflödesdefinitioner (spegling av `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 färdighetsdefinitioner med körningsanteckningar för Codex   |

> **Obs!** Arbetsflöden och kommandon är för närvarande identiska byte för byte. Om `.agents/` är avsett för en annan agentkörmiljö (Codex) måste varianterna skilja sig åt på ett meningsfullt sätt.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Utanför projektträdet

Dessa kataloger med inledande understreck innehåller material som inte distribueras:

- **`_ideia/`** — designanteckningar (kategorierna defer/notfit/viable)
- **`_mono_repo/`** — historiska delprojekt (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — skrivskyddade kloner av relaterade OSS-projekt (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api osv.) för jämförelser under utvecklingen
- **`_tasks/`** — uppgiftsspårningsfiler per lansering (informella)

Ingår inte i utdata från `npm pack`. Se `.npmignore`.

---

## Genererat / Git-ignorerat

| Sökväg                 | Syfte                              |
| ---------------------- | ---------------------------------- |
| `node_modules/`        | npm-beroenden                      |
| `.next/`               | Byggutdata från Next.js            |
| `coverage/`            | Täckningsrapporter från c8         |
| `logs/`                | Körningsloggar                     |
| `package/`             | Mellanlagring för npm pack         |
| `.playwright-mcp/`     | Testartefakter från Playwright MCP |
| `.issues/`             | Lokal ärendecache                  |
| `tsconfig.tsbuildinfo` | Inkrementell cache för TS          |

---

## Navigeringstips

- **Ny bidragsgivare?** Läs `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Lägger du till en leverantör?** Följ `docs/architecture/ARCHITECTURE.md § Adding a New Provider` och dubbelkolla mot `docs/reference/PROVIDER_REFERENCE.md`.
- **Lägger du till en rutt?** `docs/architecture/ARCHITECTURE.md § Adding a New API Route` + `src/shared/validation/schemas.ts`.
- **Lägger du till ett MCP-verktyg?** `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Lägger du till en A2A-funktion?** `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Kör du lokalt?** `docs/guides/SETUP_GUIDE.md`.
- **Driftsätter du?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Gör du en release?** `docs/ops/RELEASE_CHECKLIST.md` (och Claude Code-funktionen `/generate-release-cc`).
