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

## `src/` — Next.js-applikation

```
src/
├── app/                 # App Router (sidor + API-rutter + statussidor + landningssida)
├── lib/                 # Kärnbibliotek / domänmoduler (80 underkataloger + ~70 filer på toppnivå)
├── domain/              # Ren domänlogik (principmotor, fallback, cost, lockout, comboResolver, assessment)
├── server/              # Moduler enbart för server (authz-pipeline, cors, auth-middleware) — kan inte importeras från klienten
├── shared/              # Delas mellan server och klient där det är säkert (konstanter, typer, validering, kontrakt, hjälpfunktioner)
├── i18n/                # next-intl-konfiguration + meddelande-JSON per språk (67 språk)
├── middleware/          # Next.js-middleware (berikning av förfrågningar, språkidentifiering)
├── mitm/                # Kärna för MITM-proxy: generering/installation av certifikat, handlers, targets, inspector, masks, passthrough
│   ├── handlers/        # 9 handler-klasser för IDE-agenter som utökar MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Lager för trafikfångst: buffer (ring i minnet), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Limkod för modelladaptrar (äldre shim)
├── scripts/             # Underhållsskript i trädet (t.ex. backfillAggregation)
├── sse/                 # Äldre SSE-handlers/tjänster (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Äldre minnesbaserad lagring (håller på att fasas ut till förmån för src/lib/db)
├── types/               # Delade TS-typfiler
├── instrumentation.ts   # Next.js-telemetrihook (webbläsare + edge)
├── instrumentation-node.ts  # Instrumentering enbart för Node
└── proxy.ts             # Shim som ingångspunkt för HTTP-proxy
```

### `src/app/` — App Router (Next.js 16)

| Sökväg                                                                       | Syfte                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                                | Offentligt OpenAI-kompatibelt API (~25 undervägar: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers, osv.)                                                                                                                |
| `app/api/v1beta/`                                                            | API-slutpunkter i Gemini-stil                                                                                                                                                                                                                                                                                      |
| `app/api/playground/`                                                        | Playground Studio-vägar: `improve-prompt/` (POST — LLM-promptomskrivare), `presets/` (GET lista / POST skapa), `presets/[id]/` (GET / PUT / DELETE) — se `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                    |
| `app/api/` (icke-v1)                                                         | Hanterings-/adminvägar (~60 kataloger: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools, osv.)                                                                                                                                       |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 vägar (serverstyrning, agenttillstånd/DNS/mappningar, bypass, cert, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Se `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                    |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16+ vägar (requests, sessions, hosts, capture-modes, export, ws). LOCAL_ONLY + SPAWN_CAPABLE. Se `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                      |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0-ingångspunkt (`POST /a2a`)                                                                                                                                                                                                                                                                        |
| `app/.well-known/agent.json/`                                                | A2A Agent Card (upptäckt)                                                                                                                                                                                                                                                                                          |
| `app/(dashboard)/dashboard/`                                                 | Dashboard-UI-sidor (50+ sektioner, ~118 page.tsx-filer: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity, osv.)                                                                                                                                  |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search Tools Studio-UI (3 flikar: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — se `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                       |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (3-fliksskal), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge-dashboardsida — serverkort, 9 agentkort, installationsguide, modellmappning, bypass-lista. i18n PT-BR + EN. Se `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                                       |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector-dashboardsida — DevTools-delning, 7 detaljflikar, 4 fångstlägesväxlar, sessionsinspelare, kontextfärgning. i18n PT-BR + EN. Se `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                                           |
| `app/(dashboard)/dashboard/activity/`                                        | Aktivitetsflödessida (grupp B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — se `docs/architecture/MONITORING_SECTIONS.md`                                                                                                            |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Sida för kvotdelning (grupp B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                        |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Konfigurationssida för leverantörsplaner (grupp B): `page.tsx` + `ProviderPlanConfigClient.tsx` — åsidosättande av kvotdimensioner per anslutning                                                                                                                                                                  |
| `app/docs/`                                                                  | Inbäddad dokumentationsvisare (renderar `docs/*.md`)                                                                                                                                                                                                                                                               |
| `app/landing/`                                                               | Landningssida för marknadsföring                                                                                                                                                                                                                                                                                   |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Autentiseringsrelaterade sidor                                                                                                                                                                                                                                                                                     |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP-felsidor                                                                                                                                                                                                                                                                                                      |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statiska sidor och statussidor                                                                                                                                                                                                                                                                                     |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Rotlayout, startsida, PWA-manifest, global CSS                                                                                                                                                                                                                                                                     |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Felgränser                                                                                                                                                                                                                                                                                                         |

### `src/lib/` — Kärnbibliotek (~50 moduler)

| Modul                                    | Syfte                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `a2a/`                                   | A2A-protokollets uppgiftshanterare, färdigheter (5), streaming                                                                                                                                                                                                                                                           |
| `acp/`                                   | CLI-agentregister (lokal CLI-upptäckt — se `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                   |
| `api/`                                   | Delade API-hjälpfunktioner (`requireManagementAuth`, validering)                                                                                                                                                                                                                                                         |
| `auth/`                                  | Session, lösenordshashning, tokenvalidering                                                                                                                                                                                                                                                                              |
| `batches/`                               | Hanterare för OpenAI Batches API                                                                                                                                                                                                                                                                                         |
| `catalog/`                               | Zod-validering av leverantörskatalog + kapabilitetsupplösning                                                                                                                                                                                                                                                            |
| `cloudAgent/`                            | Molnagenter (Codex Cloud, Devin, Jules) — se `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                            |
| `combos/`                                | Combo-upplösning + hjälpfunktioner för omordning                                                                                                                                                                                                                                                                         |
| `audit/`                                 | Hjälpfunktioner för aktivitetsflöde: `highLevelActions.ts` (tillåtelselista + `isHighLevelAction()`), `activityIcons.ts` (mappning åtgärd → ikon/verb), `timeline.ts` (groupByDay/relativeTime) — se `docs/architecture/MONITORING_SECTIONS.md`                                                                          |
| `compliance/`                            | Granskningslogg + leverantörsgranskning — se `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                               |
| `compression/`                           | Kopplingskod för komprimeringsmotorn (motorerna finns i `open-sse/services/compression/`)                                                                                                                                                                                                                                |
| `config/`                                | Hjälpfunktioner för körtidskonfiguration                                                                                                                                                                                                                                                                                 |
| `db/`                                    | 120+ domän-DB-moduler + 168 migrationer (gå alltid via denna för SQLite)                                                                                                                                                                                                                                                 |
| `quota/`                                 | Motor för kvotdelning: `dimensions.ts` (typer/Zod), `types.ts` (QuotaStore-gränssnitt), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — se `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Radar-klient för katalog över kostnadsfria modeller: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — se `docs/frameworks/RADAR.md`                                                                                                                          |
| `display/`                               | UI-formateringshjälpfunktioner (kostnad, latens osv.)                                                                                                                                                                                                                                                                    |
| `embeddings/`                            | Hjälpfunktioner för embeddings-tjänsten                                                                                                                                                                                                                                                                                  |
| `env/`                                   | Parsning + validering av miljövariabler                                                                                                                                                                                                                                                                                  |
| `evals/`                                 | Eval-ramverk (sviter, runner, runtime) — se `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                                   |
| `guardrails/`                            | PII-maskering, prompt injection, vision-brygga — se `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                        |
| `jobs/`                                  | Bakgrundsjobb (cron-liknande)                                                                                                                                                                                                                                                                                            |
| `memory/`                                | Konversationsminne (SQLite FTS5 + sqlite-vec hybrid RRF + Qdrant nivå 2) — se `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                |
| `memory/embedding/`                      | Embedding-lager med flera källor: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                        |
| `memory/vectorStore.ts`                  | Wrapper för sqlite-vec v0.1.9 — brute-force-KNN + hybrid RRF (FTS5 + vektor, k=60). Lazy-init, degraderar mjukt när sqlite-vec inte är tillgänglig. (plan 21)                                                                                                                                                            |
| `memory/reindex.ts`                      | `runReindexBatch()` — bearbetar minnen med `needs_reindex=1` i bakgrunden; anropas av `POST /api/memory/reindex` och sökvägen för lazy-backfill. (plan 21)                                                                                                                                                               |
| `monitoring/`                            | Hälsokontroller, utskick av mätvärden                                                                                                                                                                                                                                                                                    |
| `oauth/`                                 | OAuth-/importflöden för 22 leverantörsmoduler (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                |
| `plugins/`                               | Plugin-register                                                                                                                                                                                                                                                                                                          |
| `promptCache/`                           | Brytpunkter för prompt-cache i Anthropic-stil                                                                                                                                                                                                                                                                            |
| `skills/`                                | Skills-ramverk (inbyggt + marknadsplats + SkillsSH) — se `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                     |
| `playground/`                            | Delade hjälpfunktioner för Playground Studio: `codeExport.ts` (generator för curl/Python/TS), `promptImprover.ts` (meta-prompt-byggare), `streamMetrics.ts` (ren TTFT/TPS), `types.ts` (pristabell) — se `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                          |
| `webhookDispatcher.ts`                   | HMAC-webhook-leverans — se `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                 |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Tunnelhanterare — se `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                         |
| `cloudSync.ts`, `initCloudSync.ts`       | Valfri molnsynkronisering av tillstånd                                                                                                                                                                                                                                                                                   |
| `localDb.ts`                             | Barrel-fil för återexport av db-moduler (ingen logik — endast återexporter)                                                                                                                                                                                                                                              |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Cachning av förfrågningar + idempotens                                                                                                                                                                                                                                                                                   |
| (~30 fler toppnivåfiler)                 | Specialiserade hjälpfunktioner (logEnv, modelsDevSync, piiSanitizer, osv.)                                                                                                                                                                                                                                               |

### `src/lib/db/` — Databas (147 moduler + 208 migrationer)

| Underkatalog              | Syfte                                                                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | `getDbInstance()`-singleton med WAL-journalföring                                                                                                                                |
| `db/migrations/`          | Versionshanterade SQL-filer (idempotenta, transaktionella). `073_memory_vec.sql` lägger till `memory_vec_meta` + kolumnen `needs_reindex` (plan 21).                             |
| `db/playgroundPresets.ts` | CRUD-modul för Playground Studio-förinställningar (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD för `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue`, osv. (plan 21)                      |
| `db/<domain>.ts`          | En modul per domän: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache, osv.          |

### `src/domain/`

| Modul                  | Syfte                                           |
| ---------------------- | ----------------------------------------------- |
| `policy.ts`            | Policymotor                                     |
| `fallbackPolicy.ts`    | Beslutsträd för fallback                        |
| `costRules.ts`         | Regler för kostnadsberäkning                    |
| `lockoutPolicy.ts`     | Låsningspolicy för modell/anslutning            |
| `tagRouter.ts`         | Taggbaserad routing                             |
| `comboResolver.ts`     | Combo-upplösning (används av combo-motorn)      |
| `modelAvailability.ts` | Tillgänglighetskontroll per modell              |
| `assessment/`          | Modellbedömning (fas 1 av RFC-AUTO-ASSESSMENT ) |

### `src/server/`

| Modul    | Syfte                                                                                               |
| -------- | --------------------------------------------------------------------------------------------------- |
| `authz/` | Auktoriseringspipeline: `classify` → `policies` → `enforce` — se `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS-konfiguration                                                                                  |
| `auth/`  | Sessionsmiddleware                                                                                  |

### `src/shared/`

| Modul                            | Syfte                                                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `components/`                    | Instrumentpanelens komponent-API: adaptrar över `packages/ui-kit` — se `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: ikonnamn som används av skärmarna → Lucide-komponenter (`<Icon>`)                               |
| `constants/providers.ts`         | **376 leverantörer** med Zod-validering (sanningskälla)                                                     |
| `constants/cliTools.ts`          | Register över externa CLI-verktyg                                                                           |
| `constants/routingStrategies.ts` | **20 routingstrategier** med prioriteter                                                                    |
| `constants/publicApiRoutes.ts`   | Rutter som kräver Bearer-autentisering (till skillnad från hanteringsautentisering)                         |
| `constants/upstreamHeaders.ts`   | Blockeringslista för headers i uppströmsanrop                                                               |
| `validation/schemas.ts`          | ~80 Zod-scheman (enda sanningskälla för API-kontrakt)                                                       |
| `validation/helpers.ts`          | Hjälpfunktioner för Zod-validering (`validateBody`, osv.)                                                   |
| `types/`                         | Delade TS-typer                                                                                             |
| `contracts/`                     | Offentliga API-kontrakt (används via `files:` i `package.json`)                                             |
| `utils/circuitBreaker.ts`        | Circuit breaker för leverantörer (se `docs/architecture/RESILIENCE_GUIDE.md`)                               |
| `utils/apiAuth.ts`               | Validering av API-nycklar, kontroll av scope                                                                |
| `utils/fetchTimeout.ts`          | Wrappers för timeout/avbrott vid uppströmsanrop med fetch                                                   |
| `utils/releaseNotes.ts`          | Parser för Closed v2/legacy-meddelanden, lokalisering och avfärdande via ID                                 |

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

### Guider på toppnivå

| Dok.                        | Syfte                                                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Arkitektur på hög nivå, delsystemkarta, dashboard-yta                                                 |
| `CODEBASE_DOCUMENTATION.md` | Teknisk referens: kataloger, moduler, konventioner                                                    |
| `FEATURES.md`               | Funktionsmatris med höjdpunkter i v3.8                                                                |
| `USER_GUIDE.md`             | Slutanvändarmanual (installation, modeller, kombos, CLI:er, ljud, m.m.)                               |
| `API_REFERENCE.md`          | Referens för API-endpunkter med autentiseringsmodell                                                  |
| `openapi.yaml`              | OpenAPI 3.0-specifikation (121 sökvägar)                                                              |
| `SETUP_GUIDE.md`            | Installationsmetoder (npm, npx, Docker, Electron, Termux, källkod)                                    |
| `ENVIRONMENT.md`            | Alla miljövariabler (~800 dokumenterade, ~3 050 rader i `.env.example`)                               |
| `TROUBLESHOOTING.md`        | Vanliga fel + kända problem i v3.8.0                                                                  |
| `RELEASE_CHECKLIST.md`      | Komplett releaseflöde (skills, husky, conventional commits, driftsättning)                            |
| `COVERAGE_PLAN.md`          | Täckningsmål och nuvarande status                                                                     |
| `FREE_TIERS.md`             | Utvalda gratisleverantörer (48+ gratis + 11 OAuth)                                                    |
| `CLI-TOOLS.md`              | Externa CLI-integrationer + internt OmniRoute CLI                                                     |
| `I18N.md`                   | i18n-arkitektur, lägga till ett språk, 67 språkversioner                                              |
| `UNINSTALL.md`              | Steg för ren avinstallation                                                                           |
| `PROVIDER_REFERENCE.md`     | **Automatiskt genererad** katalog över 376 leverantörer (återskapa: `npm run gen:provider-reference`) |

### Fördjupningar i delsystem

| Dok.                                          | Syfte                                                                           |
| --------------------------------------------- | ------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                               | MCP-server: 110 verktyg, 3 transporter, 33 scopes, REST-endpunkter              |
| `A2A-SERVER.md`                               | A2A v0.3: JSON-RPC, 6 skills, REST-hjälpfunktioner, agentkort                   |
| `AGENT_PROTOCOLS_GUIDE.md`                    | Enhetlig guide: A2A mot ACP mot Cloud Agents                                    |
| `CLOUD_AGENT.md`                              | Orkestrering av Codex Cloud / Devin / Jules                                     |
| `SKILLS.md`                                   | Skills-ramverk (inbyggt + marketplace + SkillsSH + sandbox)                     |
| `RADAR.md`                                    | Radars överlägg för gratismodellkatalog (`RADAR_ENABLED`, av som standard)      |
| `MEMORY.md`                                   | Minnessystem (SQLite FTS5 + Qdrant)                                             |
| `EVALS.md`                                    | Eval-ramverk (sviter, körningar, bedömningskriterier)                           |
| `GUARDRAILS.md`                               | PII-maskering, prompt injection, vision-brygga                                  |
| `COMPLIANCE.md`                               | Revisionslogg, lagringstid, noLog-avanmälan                                     |
| `WEBHOOKS.md`                                 | HMAC-signerad webhook-leverans                                                  |
| `REASONING_REPLAY.md`                         | Hybridcache i minne/SQLite för `reasoning_content`                              |
| `AUTHZ_GUIDE.md`                              | Auktoriseringspipeline (`classify` → `policies` → `enforce`)                    |
| `RESILIENCE_GUIDE.md`                         | Circuit breaker + cooldown + modellspärr                                        |
| `docs/security/STEALTH_GUIDE.md` (endast git) | TLS-fingeravtryck (JA3/JA4), Claude Code CCH, MITM-certifikat                   |
| `AUTO-COMBO.md`                               | Auto Combo-motor (poängsättning med 16 faktorer, 6 lägespaket, virtuell fabrik) |

### Komprimering

| Dok.                            | Syfte                                       |
| ------------------------------- | ------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Översikt över komprimeringslägen + färdplan |
| `COMPRESSION_ENGINES.md`        | Caveman- och RTK-motorer, registerkontrakt  |
| `COMPRESSION_RULES_FORMAT.md`   | JSON-schema för Caveman-regelpaket          |
| `COMPRESSION_LANGUAGE_PACKS.md` | Förteckning över regelpaket per språk       |
| `RTK_COMPRESSION.md`            | RTK:s deklarativa pipeline (56 filter)      |

### Driftsättning

| Dokument                     | Syfte                                                             |
| ---------------------------- | ----------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker-bygge, profiler (base/cli/host/cliproxyapi), Redis-sidecar |
| `VM_DEPLOYMENT_GUIDE.md`     | Generell VM/VPS-driftsättning (Ubuntu/Debian + nginx + systemd)   |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io-driftsättning (för närvarande endast på kinesiska)         |
| `TERMUX_GUIDE.md`            | Android headless via Termux                                       |
| `PWA_GUIDE.md`               | Installation av Progressive Web App + service worker              |
| `ELECTRON_GUIDE.md`          | Bygg, signering och distribution av skrivbordsapp                 |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                            |
| `PROXY_GUIDE.md`             | Utgående proxy med 4 nivåer + 1proxy-marknadsplats                |

### Underkataloger

| Underkatalog          | Syfte                                                                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokaliserade dokumentationsöversättningar (41 språkversioner)                                                                                                                                                 |
| `docs/screenshots/`   | Bildmaterial för guider                                                                                                                                                                                       |
| `_tasks/superpowers/` | Planer/specifikationer från superpowers (`writing-plans`/`brainstorming`) + forskning — isolerat, separat versionshanterat repo, gitignorerat av huvudträdet. Se CLAUDE.md → "Planning & Research Artifacts". |

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
