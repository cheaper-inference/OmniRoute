# Repository Map (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Beskrivelse på én linje af hver mappe og fil i roden.**
> Senest opdateret: 2026-06-28 — OmniRoute v3.8.40
>
> Brug dette kort til hurtigt at navigere i kodebasen. Følg links til dedikeret dokumentation for mere dybdegående oplysninger.

## Træ på øverste niveau

```
OmniRoute/
├── src/                  # Next.js 16-applikation (brugergrænseflade + API-ruter + biblioteker + domæne + server)
├── open-sse/             # Arbejdsområde til streamingmotoren (håndteringsfunktioner, eksekveringskomponenter, oversætter, MCP-server)
├── packages/            # npm-arbejdsområder: ui-kit (integreret Keak CI UI Kit) og browser-pool
├── electron/             # Desktop-wrapper (Electron 41 + electron-builder 26.10)
├── bin/                  # CLI-startpunkt og kommandohåndteringsfunktioner
├── scripts/              # Scripts til build, kontrol, synkronisering og enkeltstående opgaver
├── docs/                 # Offentlig dokumentation (du er her)
├── tests/                # Alle testsuiter (enheds-, integrations- og e2e-tests samt protokolklienter)
├── public/               # Statiske Next.js-aktiver, PWA-manifest, service worker og ikoner
├── config/               # Statisk konfiguration + tilstand for kvalitetskontrol (i18n, payloadRules, quality/)
├── images/               # Billedaktiver til markedsføring og README
├── @omniroute/           # Publicerbare ledsagepakker (opencode-plugin, opencode-provider)
├── skills/               # Færdighedspakker til CLI/agenter (cli-* + omni-* + config-codex-cli)
├── examples/             # Eksempelplugins + omniroute-cmd-hello-startskabelon
├── contrib/              # Bidrag fra fællesskabet (podman/)
├── .source/              # Fumadocs-kildekonfiguration (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actions-workflows + issueskabeloner + PR-skabelon
├── .husky/               # Git-hooks (pre-commit, pre-push)
├── .claude/              # Claude Code-skråstregskommandoer (projektspecifikke)
├── .agents/              # Workflows + færdigheder til Codex/generiske agenter (spejling af .claude/)
├── .vscode/              # Indstillinger for VS Code-arbejdsområdet
├── _ideia/               # Planlægningsnoter (uformelle; distribueres ikke)
├── _mono_repo/           # Historiske delprojekter (cloud, site, vscode-extension)
├── _references/          # Skrivebeskyttede referencekloner fra relaterede OSS-projekter
├── _tasks/               # Filer til opgavesporing pr. udgivelse (uformelle)
├── .build/ .worktrees/ dist/   # Lokalt build-/git-worktree-/build-output-arbejdsområde (ignoreres af git)
├── .issues/              # Lokal issue-cache (ignoreres af git)
├── .playwright-mcp/      # Playwright MCP-testartefakter
├── coverage/             # c8-dækningsoutput (ignoreres af git)
├── logs/                 # Kørselslogfiler (ignoreres af git)
├── node_modules/         # Afhængigheder (ignoreres af git)
├── package/              # Midlertidigt område til npm pack (buildartefakt)
├── .next/                # Next.js-buildoutput (ignoreres af git)
└── (filer i roden — se nedenfor)
```

---

## Filer i roden

| Fil                                         | Formål                                                                                 |
| ------------------------------------------- | -------------------------------------------------------------------------------------- |
| **README.md**                               | Marketinglandingsside + hurtig start + funktionsmatrix (se også `llm.txt`)             |
| **CHANGELOG.md**                            | Ændringslog pr. udgivelse (automatisk genereret af færdigheden `/version-bump-cc`)     |
| **LICENSE**                                 | MIT-licenstekst                                                                        |
| **CLAUDE.md**                               | Projektregler for Claude Code-agenter (ufravigelige regler, konventioner, scenarier)   |
| **AGENTS.md**                               | Samme som CLAUDE.md, men for AI-agenter, der ikke er Claude (Codex, Cursor osv.)       |
| **GEMINI.md**                               | Kortfattede regler for Gemini-baserede agenter (delmængde af CLAUDE.md)                |
| **CONTRIBUTING.md**                         | Bidragydervejledning: opsætning, konventionelle commits, test og PR-flow               |
| **SECURITY.md**                             | Politik for rapportering af sårbarheder, understøttede versioner og trusselsmodel      |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — forventninger til adfærd i fællesskabet                         |
| **llm.txt**                                 | Landingsside i ren tekst optimeret til LLM-crawlere (SEO til AI-assistenter)           |
| **package.json**                            | npm-manifest, scripts, afhængigheder, engines og c8-dækningskrav                       |
| **package-lock.json**                       | Låst afhængighedstræ                                                                   |
| **tsconfig.json**                           | TypeScript-rodconfig                                                                   |
| **tsconfig.typecheck-core.json**            | Typecheck-config til kernen i `src/`                                                   |
| **tsconfig.typecheck-noimplicit-core.json** | Streng typecheck (`noImplicitAny`)                                                     |
| **tsconfig.tsbuildinfo**                    | Cache til inkrementel TS-build (ignoreret af git)                                      |
| **next.config.mjs**                         | Next.js 16-buildkonfiguration (selvstændigt output)                                    |
| **next-env.d.ts**                           | Automatisk genererede miljøtyper fra Next.js                                           |
| **eslint.config.mjs**                       | Flad ESLint-config (regler pr. projektområde)                                          |
| **prettier.config.mjs**                     | Formateringsregler for Prettier                                                        |
| **postcss.config.mjs**                      | PostCSS-config til Tailwind/CSS-pipeline                                               |
| **playwright.config.ts**                    | Playwright-config til E2E-test                                                         |
| **vitest.config.ts**                        | Vitest-config (standardsuite)                                                          |
| **vitest.mcp.config.ts**                    | Vitest-config til MCP-server-/autoCombo-/cachesuiter                                   |
| **sonar-project.properties**                | SonarQube-/SonarCloud-config (kodekvalitet)                                            |
| **Dockerfile**                              | Docker-build i flere faser (builder → runner-base → runner-cli)                        |
| **docker-compose.yml**                      | Udviklings-compose med 4 profiler (base, cli, host, cliproxyapi) + redis-sidecar       |
| **docker-compose.prod.yml**                 | Produktions-compose (port 20130, redis, navngivne volumes)                             |
| **.dockerignore**                           | Filer udeladt fra Docker-konteksten                                                    |
| **fly.toml**                                | Fly.io-udrulningsconfig (region `sin`, port 20128, /data-volume)                       |
| **.env.example**                            | Skabelon til miljøfil (kopieres automatisk til `.env` ved første installation)         |
| **.gitignore**                              | Git-ignore-mønstre                                                                     |
| **.npmignore**                              | Eksklusionsliste til npm-udgivelse                                                     |
| **.npmrc**                                  | npm-config (registry, lockfile-politik)                                                |
| **.node-version**                           | Fastlåst Node-version (bruges af nvm-kompatible værktøjer)                             |
| **.nvmrc**                                  | Fastlåst Node-version til nvm                                                          |
| **eslint.complexity.config.mjs**            | ESLint-config til kompleksitetsratchet (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | ESLint-config til SonarJS-regler (kognitiv kompleksitet/duplikering)                   |
| **source.config.ts**                        | Fumadocs-`defineDocs`-kildeconfig (leverer data til `.source/`)                        |
| **knip.json**                               | Knip-config — ubrugte filer/exports/afhængigheder (leverer data til dead code-kravet)  |
| **stryker.conf.json**                       | Stryker-config til mutationstest                                                       |
| **.size-limit.json**                        | Konfiguration af bundlebudget for size-limit                                           |
| **promptfooconfig.yaml**                    | Konfiguration af promptfoo-evaluering                                                  |
| **.gitleaks.toml**                          | Regelsæt til hemmelighedsscanning med gitleaks                                         |
| **.zizmor.yml**                             | Konfiguration af zizmor-sikkerhedslintning for GitHub Actions                          |
| **socket.yml**                              | Konfiguration af forsyningskæde for Socket.dev                                         |
| **news.json**                               | Lokaliseret v2-meddelelsesfeed; Radar-lanceringselementet leveres inaktivt             |
| **flake.nix** / **flake.lock**              | Definition og låsning af Nix-udviklingsshell                                           |
| **.env**                                    | Lokale hemmeligheder (ignoreres af git — genereret fra `.env.example`)                 |

> **Flyttet ud af roden i v3.8.26 (oprydning):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` og den genererede `quality-metrics.json` (ignoreres af git). Se [`## config/`](#config--static-configs--quality-gate-state).

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

### `src/app/` — App Router (Next.js 16)

| Sti                                                                          | Formål                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Offentlig OpenAI-compat API (~ 25 underruter: chat, fuldførelser, indlejringer, filer, batches, lyd, billeder, videoer, musik, omrangering, moderering, søgning, ws, agenter, konti, udbydere osv.)                                                                                                                 |
| `app/api/v1beta/`                                                            | API endepunkter i Gemini-stil                                                                                                                                                                                                                                                                                       |
| `app/api/playground/`                                                        | Playground Studio-ruter: `improve-prompt/` (POST — LLM prompt rewriter), `presets/` (GET list / POST create), `presets/[id]/` (GET / PUT / DELETE) - se `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                      |
| `app/api/` (ikke-v1)                                                         | Management/admin -ruter (~ 60 mapper: udbydere, kombinationer, indstillinger, mcp, a2a, evals, hukommelse, færdigheder, webhooks, compliance, modstandsdygtighed, overvågning, tunneler, cli-værktøjer osv.)                                                                                                        |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 ruter (serverkontrol, agent state/DNS/mappings, bypass, cert, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Se `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                           |
| `app/api/tools/traffic-inspector/`                                           | Trafikinspektør REST + WS API — 16 + ruter (anmodninger, sessioner, værter, optagelsestilstande, eksport, ws). LOCAL_ONLY + SPAWN_CAPABLE. Se `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                            |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 indgangspunkt (`POST /a2a`)                                                                                                                                                                                                                                                                        |
| `app/.well-known/agent.json/`                                                | A2A agentkort (opdagelse)                                                                                                                                                                                                                                                                                           |
| `app/(dashboard)/dashboard/`                                                 | Dashboard UI sider (50 + sektioner, ~ 118 page.tsx -filer: udbydere, kombinationer, indstillinger, hukommelse, færdigheder, webhooks, evals, revision, batch, cache, omkostninger, sundhed, system, aktivitet osv.)                                                                                                 |
| `app/(dashboard)/dashboard/search-tools/`                                    | Søgeværktøjer Studio UI (3 faner: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — se `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                        |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (3-tabs shell), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge dashboard-side — serverkort, 9 agentkort, opsætningsguide, modelkortlægning, bypass-liste. i18n PT-BR + EN. Se `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                                        |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector-dashboard-side — DevTools deling, 7 detaljefaner, 4 optagetilstandsskift, sessionsoptager, kontekstfarvning. i18n PT-BR + EN. Se `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                                          |
| `app/(dashboard)/dashboard/activity/`                                        | Aktivitetsfeedside (Gruppe B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — se `docs/architecture/MONITORING_SECTIONS.md`                                                                                                              |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Kvotedelingsside (Gruppe B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                            |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Konfigurationsside for udbyderplan (Gruppe B): `page.tsx` + `ProviderPlanConfigClient.tsx` — kvotedimensioner pr. forbindelsestilsidesættelse                                                                                                                                                                       |
| `app/docs/`                                                                  | Indlejret dokumentationsfremviser (gengiver `docs/*.md`)                                                                                                                                                                                                                                                            |
| `app/landing/`                                                               | Marketing landingsside                                                                                                                                                                                                                                                                                              |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Auth-relaterede sider                                                                                                                                                                                                                                                                                               |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP fejlsider                                                                                                                                                                                                                                                                                                      |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Static/status sider                                                                                                                                                                                                                                                                                                 |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Rodlayout, hjem, PWA -manifest, global CSS                                                                                                                                                                                                                                                                          |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Fejlgrænser                                                                                                                                                                                                                                                                                                         |

### `src/lib/` — Kernebiblioteker (~ 50 moduler)

| modul                                    | Formål                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A protokol task manager, færdigheder (5), streaming                                                                                                                                                                                                                                                                 |
| `acp/`                                   | CLI Agent Registry (lokal CLI -opdagelse - se `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                             |
| `api/`                                   | Delte API hjælpere (`requireManagementAuth`, validering)                                                                                                                                                                                                                                                              |
| `auth/`                                  | Session, hashing af adgangskode, token-validering                                                                                                                                                                                                                                                                     |
| `batches/`                               | OpenAI Batches API handlere                                                                                                                                                                                                                                                                                           |
| `catalog/`                               | Udbyder katalog Zod validering + kapacitet opløsning                                                                                                                                                                                                                                                                  |
| `cloudAgent/`                            | Cloud-agenter (Codex Cloud, Devin, Jules) — se `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                       |
| `combos/`                                | Combo resolution + genbestilling hjælpere                                                                                                                                                                                                                                                                             |
| `audit/`                                 | Aktivitetsfeedhjælpere: `highLevelActions.ts` (tilladelsesliste + `isHighLevelAction()`), `activityIcons.ts` (action → icon/verb map), `timeline.ts` (groupByDay/relativeTime) — se `docs/architecture/MONITORING_SECTIONS.md`                                                                                        |
| `compliance/`                            | Revisionslog + provider revision — se `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                   |
| `compression/`                           | Kompressionsmotorlim (motorer lever i `open-sse/services/compression/`)                                                                                                                                                                                                                                               |
| `config/`                                | Runtime config hjælpere                                                                                                                                                                                                                                                                                               |
| `db/`                                    | 120 + domæne DB moduler + 168 migreringer (gå altid igennem her for SQLite)                                                                                                                                                                                                                                           |
| `quota/`                                 | Kvotedelingsmotor: `dimensions.ts` (types/Zod), `types.ts` (QuotaStore grænseflade), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — se `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Radar fri-model katalog klient: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — se `docs/frameworks/RADAR.md`                                                                                                                                            |
| `display/`                               | UI -formateringshjælpere (omkostninger, latens osv.)                                                                                                                                                                                                                                                                  |
| `embeddings/`                            | Indstøbningsservice hjælpere                                                                                                                                                                                                                                                                                          |
| `env/`                                   | Env variabel parsing + validering                                                                                                                                                                                                                                                                                     |
| `evals/`                                 | Eval framework (suiter, runner, runtime) - se `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                              |
| `guardrails/`                            | PII masker, hurtig indsprøjtning, synsbro — se `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                          |
| `jobs/`                                  | Baggrundsjob (cron-lignende)                                                                                                                                                                                                                                                                                          |
| `memory/`                                | Samtalehukommelse (SQLite FTS5 + sqlite-vec hybrid RRF + Qdrant tier 2) — se `docs/frameworks/MEMORY.md`                                                                                                                                                                                                              |
| `memory/embedding/`                      | Indlejringslag med flere kilder: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                      |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 wrapper — KNN brute-force + hybrid RRF (FTS5 + vektor, k = 60). Lazy-init, nedbrydes elegant, når sqlite-vec ikke er tilgængelig. (plan 21)                                                                                                                                                         |
| `memory/reindex.ts`                      | `runReindexBatch()` — behandler minder med `needs_reindex=1` i baggrunden; kaldet af `POST /api/memory/reindex` og lazy-backfill-sti. (plan 21)                                                                                                                                                                       |
| `monitoring/`                            | Sundhedstjek, metriske emissioner                                                                                                                                                                                                                                                                                     |
| `oauth/`                                 | OAuth/import flows for 22 udbydermoduler (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, qoder- traference, zed)                                                                                |
| `plugins/`                               | Plugin-registrering                                                                                                                                                                                                                                                                                                   |
| `promptCache/`                           | Prompt-cache-breakpoints i antropisk stil                                                                                                                                                                                                                                                                             |
| `skills/`                                | Skills framework (indbygget + marketplace + SkillsSH) — se `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                |
| `playground/`                            | Playground Studio delte hjælpere: `codeExport.ts` (curl/Python/TS generator), `promptImprover.ts` (meta-prompt builder), `streamMetrics.ts` (ren TTFT/TPS), `types.ts` (pristabel) — se `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                        |
| `webhookDispatcher.ts`                   | HMAC webhook levering — se `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                              |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Tunnelledere — se `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                         |
| `cloudSync.ts`, `initCloudSync.ts`       | Valgfri skysynkronisering af staten                                                                                                                                                                                                                                                                                   |
| `localDb.ts`                             | Re-eksport tønde til db-moduler (ingen logik - kun reeksporterer)                                                                                                                                                                                                                                                     |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Anmod om caching + idempotens                                                                                                                                                                                                                                                                                         |
| (~ 30 flere filer på øverste niveau)     | Specialiserede hjælpere (logEnv, modelsDevSync, piiSanitizer osv.)                                                                                                                                                                                                                                                    |

### `src/lib/db/` — Database (147 moduler + 208-migreringer)

| Underdir                  | Formål                                                                                                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | `getDbInstance()` singleton med WAL journaling                                                                                                                                              |
| `db/migrations/`          | Versionerede SQL filer (idempotente, transaktionelle). `073_memory_vec.sql` tilføjer `memory_vec_meta` + `needs_reindex` kolonne (plan 21).                                                 |
| `db/playgroundPresets.ts` | CRUD modul til Playground Studio forudindstillinger (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)          |
| `db/memoryVec.ts`         | CRUD for `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` osv. (plan 21)                                  |
| `db/<domain>.ts`          | Et modul pr. domæne: udbydere, kombinationer, apiKeys, brugere, sessioner, brug, revisionslog, webhooks, færdigheder, memory_entries, cloud_agent_tasks, evals* \* , ræsonnement_cache osv. |

### `src/domain/`

| modul                  | Formål                                              |
| ---------------------- | --------------------------------------------------- |
| `policy.ts`            | Politik motor                                       |
| `fallbackPolicy.ts`    | Fallback beslutningstræ                             |
| `costRules.ts`         | Regler for omkostningsberegning                     |
| `lockoutPolicy.ts`     | Model/connection lockout politik                    |
| `tagRouter.ts`         | Tag-baseret routing                                 |
| `comboResolver.ts`     | Kombinationsopløsning (bruges af kombinationsmotor) |
| `modelAvailability.ts` | Kontrol af tilgængelighed pr. model                 |
| `assessment/`          | Modelvurdering (Fase 1 af RFC-AUTO-ASSESSMENT )     |

### `src/server/`

| modul    | Formål                                                                                             |
| -------- | -------------------------------------------------------------------------------------------------- |
| `authz/` | Autorisationspipeline: `classify` → `policies` → `enforce` — se `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS konfiguration                                                                                 |
| `auth/`  | Session middleware                                                                                 |

### `src/shared/`

| modul                            | Formål                                                                                             |
| -------------------------------- | -------------------------------------------------------------------------------------------------- |
| `components/`                    | Dashboard-komponent API: adaptere over `packages/ui-kit` — se `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: ikonnavne, der bruges af skærmene → Lucide-komponenter (`<Icon>`)                      |
| `constants/providers.ts`         | **377 udbydere** med Zod -validering (sandhedens kilde)                                            |
| `constants/cliTools.ts`          | Ekstern CLI -værktøjsregistrering                                                                  |
| `constants/routingStrategies.ts` | **20 routingstrategier** med prioriteringer                                                        |
| `constants/publicApiRoutes.ts`   | Ruter, der kræver bærer (vs. ledelse) godkendelse                                                  |
| `constants/upstreamHeaders.ts`   | Header afvisningsliste til upstream-anmodninger                                                    |
| `validation/schemas.ts`          | ~ 80 Zod skemaer (enkelt kilde til sandhed for API kontrakter)                                     |
| `validation/helpers.ts`          | Zod -valideringshjælpere (`validateBody` osv.)                                                     |
| `types/`                         | Delte TS typer                                                                                     |
| `contracts/`                     | Offentlige API kontrakter (forbruges af `files:` i `package.json`)                                 |
| `utils/circuitBreaker.ts`        | Udbyder afbryder (se `docs/architecture/RESILIENCE_GUIDE.md`)                                      |
| `utils/apiAuth.ts`               | API nøglevalidering, kontrol af omfang                                                             |
| `utils/fetchTimeout.ts`          | Timeout/abort indpakninger til opstrømshentning                                                    |
| `utils/releaseNotes.ts`          | Lukket v2/legacy -meddelelsesparser, lokalisering og ID afvisning                                  |

---

## `open-sse/` — arbejdsområde til streamingmotor

Separat npm-arbejdsområde (`@omniroute/open-sse`). Håndterer behandling af anmodninger + kørsel hos udbydere.

```
open-sse/
├── handlers/            # 16 filer (12 handlere + 4 hjælpefunktioner): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search osv.
├── executors/           # 150 eksekveringsmoduler (klasser, der udvider BaseExecutor + hjælpefunktioner pr. udbyder)
├── translator/          # Formatkonvertere (9 til anmodninger, 9 til svar, 9 hjælpefunktioner)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ tjenestemoduler (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM osv.)
├── mcp-server/          # MCP-server (110 værktøjer, 3 transporter, 33 scopes)
├── config/              # Udbyder-/modelregistre, headerkonfiguration, modelaliasser
├── utils/               # TLS-klient, proxy-fetch/-dispatcher, netværkshjælpefunktioner
├── index.ts             # Indgangspunkt for arbejdsområdet
├── package.json         # Arbejdsområdets manifest
├── tsconfig.json        # Arbejdsområdets TS-konfiguration
└── types.d.ts           # Arbejdsområdets typedeklarationer
```

### `open-sse/mcp-server/`

| Sti                         | Formål                                                                            |
| --------------------------- | --------------------------------------------------------------------------------- |
| `server.ts`                 | MCP-serverens livscyklus (stdio- + HTTP-transporter)                              |
| `httpTransport.ts`          | HTTP Streamable- + SSE-transporter (`/api/mcp/sse`, `/api/mcp/stream`)            |
| `audit.ts`                  | Revisionslogning til tabellen `mcp_tool_audit`                                    |
| `scopeEnforcement.ts`       | Scopevalidering pr. værktøj                                                       |
| `runtimeHeartbeat.ts`       | Sundheds-heartbeat til `DATA_DIR/runtime/mcp-heartbeat.json`                      |
| `descriptionCompressor.ts`  | Komprimerer metadata for værktøjsbeskrivelser for at spare kontekst               |
| `schemas/tools.ts`          | 36 grundlæggende værktøjsdefinitioner + scopes                                    |
| `tools/advancedTools.ts`    | Avancerede værktøjsimplementeringer                                               |
| `tools/memoryTools.ts`      | 3 hukommelsesværktøjer (søg/tilføj/ryd)                                           |
| `tools/skillTools.ts`       | 4 færdighedsværktøjer (vis/aktivér/kør/kørsler)                                   |
| `tools/compressionTools.ts` | 5 komprimeringsværktøjer                                                          |
| `README.md`                 | Intern README til MCP-serveren (krydshenvist fra `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — arbejdsområder

| Sti                      | Formål                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — leverandørintegreret øjebliksbillede af Keak CI UI Kit (`private`, `UNLICENSED`), anvendt som kildekode (ingen build). `UPSTREAM.md` fastlåser upstream-committet og dokumenterer licensgodkendelsen; `PATCHES.md` viser lokale patches (ingen); `src/` synkroniseres kun af `scripts/dev/sync-ui-kit.sh` og beskyttes af `npm run check:ui-kit-snapshot`. Se `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — valgfri browserpooltjeneste (CloakBrowser- og Playwright-baseret chat)                                                                                                                                                                                                                                                                                                                       |

---

## `electron/` — Desktop-wrapper

| Fil              | Formål                                                                                               |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| `main.js`        | Electrons hovedproces (BrowserWindow, integreret Next.js-server, systembakke, automatisk opdatering) |
| `preload.js`     | IPC-bro (contextBridge → `window.omniroute`)                                                         |
| `package.json`   | electron-builder-konfiguration + Electron 41 + electron-builder 26.10-afhængigheder                  |
| `assets/`        | Appikoner (Windows .ico, macOS .icns, Linux .png)                                                    |
| `dist-electron/` | Buildoutput (ignoreres af git)                                                                       |
| `types.d.ts`     | Typedeklarationer til renderer-broen                                                                 |
| `README.md`      | Intern Electron-README (se også `docs/guides/ELECTRON_GUIDE.md`)                                     |

---

## `bin/` — CLI

| Fil                                                                                                         | Formål                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Primært CLI-entrypoint — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` osv. |
| `reset-password.mjs`                                                                                        | Selvstændig CLI til nulstilling af adgangskode                                                                                    |
| `cli/commands/setup.mjs`                                                                                    | Interaktiv + ikke-interaktiv opsætningsguide                                                                                      |
| `cli/commands/doctor.mjs`                                                                                   | Diagnosticering af systemtilstand (8+ kontroller)                                                                                 |
| `cli/commands/providers.mjs`                                                                                | Liste over/test/validering af udbydere                                                                                            |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI-hjælpemoduler                                                                                                                 |
| `cli/tray/tray.ts`                                                                                          | Integration med systembakken (på tværs af platforme: NotifyIcon på Windows, systray2 på macOS/Linux)                              |
| `cli/tray/tray.ps1`                                                                                         | PowerShell NotifyIcon-backend (Windows, ingen nye binære filer)                                                                   |
| `cli/tray/autostart.ts`                                                                                     | Automatisk start på tværs af platforme (LaunchAgent / .desktop / registreringsdatabase)                                           |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5-trins resolveringskæde for SQLite-driver (medfølgende → runtime → forsinket installation → node:sqlite → sql.js)                |
| `cli/runtime/magicBytes.mjs`                                                                                | Validering af binære magic bytes (ELF / Mach-O / Mach-O fat / PE)                                                                 |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — forhåndsresolverer drivere ved postinstall / første opstart                                                  |
| `nodeRuntimeSupport.mjs`                                                                                    | Validerer den understøttede Node.js-version ved installation                                                                      |

---

## `skills/` — Offentlige agentfærdigheder

| Fil                          | Formål                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 færdighedsmanifestfiler til eksterne AI-agenter (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Build- og kontrolscripts

| Script                              | Formål                                                                                              |
| ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Udviklings-/startkørsel med indlæsning af miljøvariabler                                            |
| `build-next-isolated.mjs`           | Selvstændigt build (selvstændig Next.js 16)                                                         |
| `prepublish.ts`                     | Klargøring af pakke før `npm pack`                                                                  |
| `postinstall.mjs`                   | Opret automatisk `.env` ud fra `.env.example` ved første installation                               |
| `sync-env.mjs`                      | Synkroniser nøgler i `.env` med `.env.example` igen                                                 |
| `check-cycles.mjs`                  | Registrer cirkulære afhængigheder                                                                   |
| `check-route-validation.mjs`        | Kontrollér, at alle API-ruter har Zod-validering                                                    |
| `check-t11-any-budget.mjs`          | Håndhæv eksplicit budget for `any` pr. fil                                                          |
| `check-docs-sync.mjs`               | Kontrollér synkronisering af dokumentationsversioner (eksisterende pre-commit)                      |
| **`check-env-doc-sync.mjs`**        | NYT: Krydstjek miljøvariabler i kode mod `.env.example` og `ENVIRONMENT.md`                         |
| **`check-docs-counts-sync.mjs`**    | NYT: Kontrollér, at antal (eksekutorer, strategier, OAuth, A2A-færdigheder) matcher dokumentationen |
| **`check-deprecated-versions.mjs`** | NYT: Markér forældede versioner/datoer i dokumentationen                                            |
| `check-supported-node-runtime.ts`   | Kontrollér, at den aktuelle Node-version understøttes                                               |
| `check-pr-test-policy.mjs`          | Håndhæv reglen om "påkrævede tests" ved ændringer i produktionskode                                 |
| **`gen-provider-reference.ts`**     | NYT: Generér automatisk `docs/reference/PROVIDER_REFERENCE.md` fra kataloget                        |
| `i18n/generate-multilang.mjs`       | Oversæt UI-strenge og dokumentation via Google Translate                                            |
| `i18n_autotranslate.py`             | LLM-baseret pipeline til oversættelse af dokumentation                                              |
| `validate_translation.py`           | Validering af oversættelser pr. landestandard                                                       |
| `check_translations.py`             | Kontrol af i18n-nøgler på kodesiden                                                                 |
| `run-playwright-tests.mjs`          | Playwright E2E-testkørsel                                                                           |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2E-testkørsel                                                                              |
| `run-ecosystem-tests.mjs`           | Test af økosystemet (providerintegration)                                                           |
| `test-report-summary.mjs`           | Generér oversigt over testdækning i Markdown                                                        |
| `smoke-electron-packaged.mjs`       | Røgtest af pakket Electron-build                                                                    |
| `native-binary-compat.mjs`          | Kontrollér, at native afhængigheder (`better-sqlite3`) matcher Electrons Node                       |
| `validate-pack-artifact.ts`         | Kontrollér output fra npm-pakke                                                                     |
| `responses-ws-proxy.mjs`            | WebSocket-bro til Codex Responses API                                                               |
| `v1-ws-bridge.mjs`                  | WebSocket-bro til `/api/v1/ws`-slutpunktet                                                          |
| `standalone-server-ws.mjs`          | Kørsel af selvstændig WS-server                                                                     |
| `system-info.mjs`                   | Udskriv system-/kørselsmiljøoplysninger til support                                                 |
| `healthcheck.mjs`                   | Engangssundhedstjek (bruges af Docker HEALTHCHECK)                                                  |
| `uninstall.mjs`                     | Script til fuldstændig afinstallation                                                               |
| `dev/sync-ui-kit.sh`                | Kopiér CI UI Kit `src/` fra en fastgjort commit til `packages/ui-kit/src`                           |
| `check/check-ui-kit-snapshot.mjs`   | Pre-commit-kontrol: `packages/ui-kit/src` matcher den fastgjorte upstream-commit                    |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — ikonnavne i brug, som `ICON_MAP` ikke tilknytter                           |
| `dev/codemod-material-icons.mjs`    | Omskriv bogstavelige Material Symbols-spans til `<Icon>` (migreringsværktøj)                        |

---

## `docs/` — Offentlig dokumentation (7 rodfiler + 17 underkataloger)

### Guider på øverste niveau

| Dok                         | Formål                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------ |
| `ARCHITECTURE.md`           | Arkitektur på højt niveau, undersystemkort, dashboardoverflade                       |
| `CODEBASE_DOCUMENTATION.md` | Teknisk reference: mapper, moduler, konventioner                                     |
| `FEATURES.md`               | Feature matrix med v3.8 højdepunkter                                                 |
| `USER_GUIDE.md`             | Slutbrugervejledning (opsætning, modeller, kombinationer, CLIs, lyd osv.)            |
| `API_REFERENCE.md`          | API -endepunktsreference med godkendelsesmodel                                       |
| `openapi.yaml`              | OpenAPI 3.0 spec (121 stier)                                                         |
| `SETUP_GUIDE.md`            | Installationsmetoder (npm, npx, Docker, Electron, Termux, source)                    |
| `ENVIRONMENT.md`            | Alle env vars (~ 800 dokumenteret, ~ 3.050 linjer `.env.example`)                    |
| `TROUBLESHOOTING.md`        | Almindelige fejl + v3.8.0 kendte problemer                                           |
| `RELEASE_CHECKLIST.md`      | Fuld frigivelsesflow (færdigheder, husky, konventionelle commits, implementering)    |
| `COVERAGE_PLAN.md`          | Dækningsmål og nuværende tilstand                                                    |
| `FREE_TIERS.md`             | Kurerede free-tier-udbydere (48 + gratis + 11 OAuth)                                 |
| `CLI-TOOLS.md`              | Eksterne CLI integrationer + Intern OmniRoute CLI                                    |
| `I18N.md`                   | i18n-arkitektur, tilføjelse af et sprog, 67 lokaliteter                              |
| `UNINSTALL.md`              | Rengør afinstallationstrinene                                                        |
| `PROVIDER_REFERENCE.md`     | **Autogenereret** katalog med 377 udbydere (regen: `npm run gen:provider-reference`) |

### Delsystem dybt dyk

| Dok                                        | Formål                                                                      |
| ------------------------------------------ | --------------------------------------------------------------------------- |
| `MCP-SERVER.md`                            | MCP server: 110 værktøjer, 3 transporter, 33 scopes, REST endepunkter       |
| `A2A-SERVER.md`                            | A2A v0.3: JSON-RPC, 6 færdigheder, REST hjælpere, agentkort                 |
| `AGENT_PROTOCOLS_GUIDE.md`                 | Samlet guide: A2A vs ACP vs Cloud Agents                                    |
| `CLOUD_AGENT.md`                           | Codex Cloud / Devin / Jules orkestrering                                    |
| `SKILLS.md`                                | Skills framework (indbygget + marketplace + SkillsSH + sandbox)             |
| `RADAR.md`                                 | Radar fri-model katalog overlay (`RADAR_ENABLED`, deaktiveret som standard) |
| `MEMORY.md`                                | Hukommelsessystem (SQLite FTS5 + Qdrant)                                    |
| `EVALS.md`                                 | Eval framework (suiter, runs, rubrikker)                                    |
| `GUARDRAILS.md`                            | PII masker, hurtig injektion, synsbro                                       |
| `COMPLIANCE.md`                            | Revisionslog, fastholdelse, noLog fravalg                                   |
| `WEBHOOKS.md`                              | HMAC-signeret webhook levering                                              |
| `REASONING_REPLAY.md`                      | Hybrid memory/SQLite cache til `reasoning_content`                          |
| `AUTHZ_GUIDE.md`                           | Autorisationspipeline (`classify` → `policies` → `enforce`)                 |
| `RESILIENCE_GUIDE.md`                      | Circuit breaker + cooldown + model lockout                                  |
| `docs/security/STEALTH_GUIDE.md` (kun git) | TLS fingeraftryk (JA3/JA4), Claude Code CCH, MITM cert                      |
| `AUTO-COMBO.md`                            | Auto Combo-motor (16-faktor scoring, 6 mode-pakker, virtuel fabrik)         |

### Kompression

| Dok                             | Formål                                         |
| ------------------------------- | ---------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Oversigt over kompressionstilstande + køreplan |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK motorer, registreringskontrakt   |
| `COMPRESSION_RULES_FORMAT.md`   | Caveman rule pack JSON skema                   |
| `COMPRESSION_LANGUAGE_PACKS.md` | Beholdning af regelpakke pr. sprog             |
| `RTK_COMPRESSION.md`            | RTK deklarative pipeline (56 filtre)           |

### Implementering

| Dok                          | Formål                                                             |
| ---------------------------- | ------------------------------------------------------------------ |
| `DOCKER_GUIDE.md`            | Docker build, profiler (base/cli/host/cliproxyapi), Redis sidevogn |
| `VM_DEPLOYMENT_GUIDE.md`     | Generisk VM/VPS -implementering (Ubuntu/Debian + nginx + systemd)  |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io-implementering (i øjeblikket kun kinesisk)                  |
| `TERMUX_GUIDE.md`            | Android hovedløs via Termux                                        |
| `PWA_GUIDE.md`               | Progressive Web App installer + service worker                     |
| `ELECTRON_GUIDE.md`          | Desktop app build + sign + distribuere                             |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale tragt                              |
| `PROXY_GUIDE.md`             | 4-niveau udgående proxy + 1proxy markedsplads                      |

### Undermapper

| Underdir              | Formål                                                                                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docs/i18n/`          | Lokaliserede dokumentoversættelser (41 lokaliteter)                                                                                                                                              |
| `docs/screenshots/`   | Billedaktiver til guider                                                                                                                                                                         |
| `_tasks/superpowers/` | Plans/specs fra supermagter (`writing-plans`/`brainstorming`) + forskning — isoleret repo med separat version, gitignoreret af hovedtræet. Se CLAUDE.md → "Planlægning og forskning artefakter". |

---

## `tests/` — Testpakker

| Undermappe                           | Type                                           | Testkørsel                                  |
| ------------------------------------ | ---------------------------------------------- | ------------------------------------------- |
| `tests/unit/`                        | Enhedstest (~4.800 filer, hurtigst)            | Nodes indbyggede testkørsel                 |
| `tests/integration/`                 | Integrations­test med flere moduler + database | Nodes indbyggede testkørsel (samtidighed 1) |
| `tests/e2e/`                         | E2E for brugergrænseflade + arbejdsgang        | Playwright                                  |
| `tests/e2e/protocol-clients.test.ts` | E2E med rigtige MCP- og A2A-klienter           | Brugerdefinerede protokolklienter           |
| `tests/e2e/ecosystem.test.ts`        | Udbyderintegration (med netværksadgang)        | Nodes indbyggede testkørsel                 |

---

## `public/` — Statiske aktiver

| Sti                 | Formål                                                                   |
| ------------------- | ------------------------------------------------------------------------ |
| `public/` (rod)     | Favicons, robots.txt, manifest, service worker og markedsføringsbilleder |
| `public/providers/` | Udbyderlogoer i PNG/SVG-format (bruges i kontrolpanelet)                 |

---

## `config/` — Statiske konfigurationer + tilstand for kvalitetskontrol

Leverede konfigurationsskabeloner samt de versionsstyrede baselines for kvalitetskontrol
(flyttet hertil fra repositoryets rod i v3.8.26 for at holde roden enkel).

| Sti                                           | Formål                                                                                         |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Liste over lokaliteter + metadata (kanonisk kilde til antallet på 42 lokaliteter)              |
| `config/i18n-schema.json`                     | JSON-skema, der validerer `i18n.json`                                                          |
| `config/payloadRules.json`                    | Regler for oprensning af upstream-payloads                                                     |
| `config/quality/quality-baseline.json`        | Ratchet-baseline med flere målepunkter (`scripts/quality/check-quality-ratchet.mjs`)           |
| `config/quality/complexity-baseline.json`     | Fastfrosset baseline for ESLint-kompleksitet (`check-complexity.mjs`)                          |
| `config/quality/duplication-baseline.json`    | Fastfrosset baseline for jscpd-duplikering (`check-duplication.mjs`)                           |
| `config/quality/file-size-baseline.json`      | Fastfrosset baseline for størrelse pr. fil (`check-file-size.mjs`)                             |
| `config/quality/test-discovery-baseline.json` | Fastfrosset baseline for forældreløse test (`check-test-discovery.mjs`)                        |
| `config/quality/dependency-allowlist.json`    | Tilladelsesliste over godkendte afhængigheder (`check-deps.mjs`)                               |
| `config/quality/.license-allowlist.json`      | Tilladelsesliste over SPDX-licenser (`check-licenses.mjs`)                                     |
| `config/quality/quality-metrics.json`         | Midlertidigt indsamlede målepunkter (genereret af `collect-metrics.mjs`; **ignoreres af Git**) |

---

## `.github/` — GitHub-integration

| Sti                                | Formål                                                           |
| ---------------------------------- | ---------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions CI/CD-workflows (linting, test, dækning, release) |
| `.github/ISSUE_TEMPLATE/`          | Skabeloner til fejl-/funktions-issues                            |
| `.github/pull_request_template.md` | PR-skabelon                                                      |
| `.github/dependabot.yml`           | Konfiguration af afhængighedsopdateringer                        |

---

## `.husky/` — Git-hooks

| Fil          | Formål                                                                     |
| ------------ | -------------------------------------------------------------------------- |
| `pre-commit` | Kører `lint-staged + check-docs-sync + check:any-budget:t11`               |
| `pre-push`   | Deaktiveret i øjeblikket (udkommenteret). Kør `npm run test:unit` manuelt. |
| `_/`         | Interne Husky-filer                                                        |

---

## `.claude/` — Claude Code-slash-kommandoer

| Fil                                                 | Formål                                                        |
| --------------------------------------------------- | ------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — opdater version + automatisk ændringslog |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — komplet release-workflow             |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Udrul til VPS                                                 |
| `commands/capture-release-evidences-cc.md`          | Optag nye funktioner i browseren som WebP                     |
| `commands/review-{prs,discussions}-cc.md`           | Triager GitHub-PR'er/-diskussioner                            |
| `commands/{review-issues,implement-features}-cc.md` | Issue-workflows                                               |
| `settings.local.json`                               | Projektspecifikke Claude Code-indstillinger                   |

---

## `.agents/` — Generiske agent-workflows (Codex / Cursor / osv.)

| Sti                      | Formål                                                    |
| ------------------------ | --------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 workflowdefinitioner (spejling af `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 færdighedsdefinitioner med Codex Execution Notes        |

> **Bemærk:** Workflows og kommandoer er i øjeblikket identiske byte for byte. Hvis `.agents/` er beregnet til et andet agent-runtime-miljø (Codex), skal varianterne adskille sig på en meningsfuld måde.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Uden for træet

Disse mapper med understregningspræfiks indeholder indhold, der ikke distribueres:

- **`_ideia/`** — designnoter (kategorierne defer / notfit / viable)
- **`_mono_repo/`** — historiske underprojekter (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — skrivebeskyttede kloner af relaterede OSS-projekter (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api osv.) til krydsreference under udvikling
- **`_tasks/`** — filer til uformel opgavesporing pr. release

Ikke inkluderet i outputtet fra `npm pack`. Se `.npmignore`.

---

## Genereret / ignoreret af Git

| Sti                    | Formål                        |
| ---------------------- | ----------------------------- |
| `node_modules/`        | npm-afhængigheder             |
| `.next/`               | Next.js-buildoutput           |
| `coverage/`            | c8-dækningsrapporter          |
| `logs/`                | Kørselslogfiler               |
| `package/`             | Klargøring til npm pack       |
| `.playwright-mcp/`     | Playwright MCP-testartefakter |
| `.issues/`             | Lokal issue-cache             |
| `tsconfig.tsbuildinfo` | Inkrementel TS-cache          |

---

## Navigationstips

- **Ny bidragyder?** Læs `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Tilføjer du en provider?** Følg `docs/architecture/ARCHITECTURE.md § Adding a New Provider`, og krydstjek med `docs/reference/PROVIDER_REFERENCE.md`.
- **Tilføjer du en route?** Se `docs/architecture/ARCHITECTURE.md § Adding a New API Route` og `src/shared/validation/schemas.ts`.
- **Tilføjer du et MCP-værktøj?** Se `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Tilføjer du en A2A-skill?** Se `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Kører du lokalt?** Se `docs/guides/SETUP_GUIDE.md`.
- **Implementerer du?** Se `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Udgiver du en version?** Se `docs/ops/RELEASE_CHECKLIST.md` (og Claude Code-skillen `/generate-release-cc`).
