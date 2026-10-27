# Repository Map (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Isang linyang paglalarawan para sa bawat direktoryo at root file.**
> Huling na-update: 2026-06-28 — OmniRoute v3.8.40
>
> Gamitin ang mapang ito upang mabilis na mag-navigate sa codebase. Para sa mas malalim na detalye, sundan ang mga link patungo sa nakalaang dokumentasyon.

## Tree sa pinakamataas na antas

```
OmniRoute/
├── src/                  # Next.js 16 application (UI + API routes + mga library + domain + server)
├── open-sse/             # Workspace ng streaming engine (mga handler, executor, translator, MCP server)
├── packages/            # Mga npm workspace: ui-kit (vendored Keak CI UI Kit) at browser-pool
├── electron/             # Desktop wrapper (Electron 41 + electron-builder 26.10)
├── bin/                  # Entry point ng CLI at mga command handler
├── scripts/              # Mga script para sa build, pagsusuri, pag-sync, at minsanang paggamit
├── docs/                 # Pampublikong dokumentasyon (narito ka)
├── tests/                # Lahat ng test suite (unit, integration, e2e, mga protocol client)
├── public/               # Mga static asset ng Next.js, PWA manifest, service worker, mga icon
├── config/               # Static na config + estado ng quality gate (i18n, payloadRules, quality/)
├── images/               # Mga image asset para sa marketing / README
├── @omniroute/           # Mga kasamang package na maaaring i-publish (opencode-plugin, opencode-provider)
├── skills/               # Mga skill pack ng CLI/agent (cli-* + omni-* + config-codex-cli)
├── examples/             # Mga halimbawang plugin + omniroute-cmd-hello starter
├── contrib/              # Mga kontribusyon ng komunidad (podman/)
├── .source/              # Source config ng Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Mga workflow ng GitHub Actions + mga template ng issue + template ng PR
├── .husky/               # Mga Git hook (pre-commit, pre-push)
├── .claude/              # Mga slash command ng Claude Code (nakalaan sa proyekto)
├── .agents/              # Mga workflow + skill ng Codex / generic agent (salamin ng .claude/)
├── .vscode/              # Mga setting ng workspace ng VS Code
├── _ideia/               # Mga tala sa pagpaplano (impormal; hindi isinasama sa release)
├── _mono_repo/           # Mga makasaysayang subproject (cloud, site, vscode-extension)
├── _references/          # Mga read-only na reference clone mula sa mga kaugnay na proyekto ng OSS
├── _tasks/               # Mga file sa pagsubaybay ng gawain para sa bawat release (impormal)
├── .build/ .worktrees/ dist/   # Lokal na build / git-worktree / pansamantalang build output (gitignored)
├── .issues/              # Lokal na cache ng issue (gitignored)
├── .playwright-mcp/      # Mga artifact ng Playwright MCP test
├── coverage/             # Output ng c8 coverage (gitignored)
├── logs/                 # Mga runtime log (gitignored)
├── node_modules/         # Mga dependency (gitignored)
├── package/              # Staging area ng npm pack (build artifact)
├── .next/                # Output ng Next.js build (gitignored)
└── (mga root file — tingnan sa ibaba)
```

---

## Mga root file

| File                                        | Layunin                                                                                                       |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Landing page para sa marketing + mabilisang pagsisimula + matrix ng mga feature (tingnan din ang `llm.txt`)   |
| **CHANGELOG.md**                            | Changelog para sa bawat release (awtomatikong binubuo ng skill na `/version-bump-cc`)                         |
| **LICENSE**                                 | Teksto ng lisensyang MIT                                                                                      |
| **CLAUDE.md**                               | Mga panuntunan ng proyekto para sa mga agent ng Claude Code (mahihigpit na panuntunan, convention, sitwasyon) |
| **AGENTS.md**                               | Katulad ng CLAUDE.md ngunit para sa mga AI agent na hindi Claude (Codex, Cursor, atbp.)                       |
| **GEMINI.md**                               | Maiikling panuntunan para sa mga agent na nakabatay sa Gemini (subset ng CLAUDE.md)                           |
| **CONTRIBUTING.md**                         | Gabay para sa contributor: pag-setup, conventional commit, pag-test, daloy ng PR                              |
| **SECURITY.md**                             | Patakaran sa pag-uulat ng vulnerability, mga sinusuportahang version, threat model                            |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — mga inaasahan sa pag-uugali ng komunidad                                               |
| **llm.txt**                                 | Plain-text na landing page na na-optimize para sa mga LLM crawler (SEO para sa mga AI assistant)              |
| **package.json**                            | npm manifest, mga script, dependency, engine, c8 coverage gate                                                |
| **package-lock.json**                       | Naka-lock na dependency tree                                                                                  |
| **tsconfig.json**                           | Root na configuration ng TypeScript                                                                           |
| **tsconfig.typecheck-core.json**            | Configuration ng typecheck para sa core na `src/`                                                             |
| **tsconfig.typecheck-noimplicit-core.json** | Mahigpit na (`noImplicitAny`) typecheck                                                                       |
| **tsconfig.tsbuildinfo**                    | Cache ng incremental build ng TS (gitignored)                                                                 |
| **next.config.mjs**                         | Configuration ng build ng Next.js 16 (standalone na output)                                                   |
| **next-env.d.ts**                           | Mga env type na awtomatikong binuo ng Next.js                                                                 |
| **eslint.config.mjs**                       | Flat config ng ESLint (mga panuntunan ayon sa bahagi ng proyekto)                                             |
| **prettier.config.mjs**                     | Mga panuntunan sa pag-format ng Prettier                                                                      |
| **postcss.config.mjs**                      | Configuration ng PostCSS para sa pipeline ng Tailwind/CSS                                                     |
| **playwright.config.ts**                    | Configuration ng Playwright E2E test                                                                          |
| **vitest.config.ts**                        | Configuration ng Vitest (default na suite)                                                                    |
| **vitest.mcp.config.ts**                    | Configuration ng Vitest para sa MCP server / autoCombo / mga cache suite                                      |
| **sonar-project.properties**                | Configuration ng SonarQube/SonarCloud (kalidad ng code)                                                       |
| **Dockerfile**                              | Multi-stage na Docker build (builder → runner-base → runner-cli)                                              |
| **docker-compose.yml**                      | Dev compose na may 4 na profile (base, cli, host, cliproxyapi) + redis sidecar                                |
| **docker-compose.prod.yml**                 | Production compose (port 20130, redis, mga pinangalanang volume)                                              |
| **.dockerignore**                           | Mga file na hindi kasama sa Docker context                                                                    |
| **fly.toml**                                | Configuration ng deployment sa Fly.io (region `sin`, port 20128, /data volume)                                |
| **.env.example**                            | Template na env file (awtomatikong kinokopya sa `.env` sa unang pag-install)                                  |
| **.gitignore**                              | Mga pattern na hindi isinasaalang-alang ng Git                                                                |
| **.npmignore**                              | Listahan ng mga hindi isasama sa pag-publish sa npm                                                           |
| **.npmrc**                                  | Configuration ng npm (registry, patakaran sa lockfile)                                                        |
| **.node-version**                           | Naka-pin na version ng Node (ginagamit ng mga tool na compatible sa nvm)                                      |
| **.nvmrc**                                  | Naka-pin na version ng Node para sa nvm                                                                       |
| **eslint.complexity.config.mjs**            | Configuration ng ESLint para sa complexity ratchet (`scripts/check/check-complexity.mjs --config`)            |
| **eslint.sonarjs.config.mjs**               | Configuration ng ESLint para sa mga panuntunan ng SonarJS (cognitive complexity / duplication)                |
| **source.config.ts**                        | Source configuration ng Fumadocs `defineDocs` (nagbibigay ng input sa `.source/`)                             |
| **knip.json**                               | Configuration ng Knip — mga hindi ginagamit na file/export/dependency (nagbibigay ng input sa dead-code gate) |
| **stryker.conf.json**                       | Configuration ng Stryker mutation testing                                                                     |
| **.size-limit.json**                        | Config ng budget ng bundle para sa size-limit                                                                 |
| **promptfooconfig.yaml**                    | Config ng eval ng promptfoo                                                                                   |
| **.gitleaks.toml**                          | Ruleset ng pag-scan ng secret ng gitleaks                                                                     |
| **.zizmor.yml**                             | Config ng security lint ng zizmor para sa GitHub Actions                                                      |
| **socket.yml**                              | Config ng supply chain ng Socket.dev                                                                          |
| **news.json**                               | Naka-localize na feed ng anunsyo para sa v2; hindi aktibo sa paglabas ang item ng Radar                       |
| **flake.nix** / **flake.lock**              | Depinisyon at lock ng Nix dev shell                                                                           |
| **.env**                                    | Mga lokal na secret (gitignored — binuo mula sa `.env.example`)                                               |

> **Inilipat mula sa root sa v3.8.26 (pag-aayos):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json`, at ang binuong `quality-metrics.json` (gitignored). Tingnan ang [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js na aplikasyon

```
src/
├── app/                 # App Router (mga page + API route + status page + landing page)
├── lib/                 # Mga pangunahing library / module ng domain (80 subdirectory + ~70 top-level na file)
├── domain/              # Purong lohika ng domain (policy engine, fallback, gastos, lockout, comboResolver, assessment)
├── server/              # Mga module para lamang sa server (authz pipeline, cors, auth middleware) — hindi maaaring i-import mula sa client
├── shared/              # Pinagsasaluhan ng server at client kung ligtas (mga constant, type, validation, contract, utility)
├── i18n/                # next-intl config + message JSON para sa bawat locale (67 locale)
├── middleware/          # Next.js middleware (pagdaragdag ng impormasyon sa request, pagtukoy ng locale)
├── mitm/                # Core ng MITM proxy: pagbuo/pag-install ng certificate, mga handler, target, inspector, mask, passthrough
│   ├── handlers/        # 9 na IDE-agent handler class na nag-e-extend sa MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Layer ng pagkuha ng trapiko: buffer (in-memory ring), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Pandugtong ng model adapter (legacy shim)
├── scripts/             # Mga maintenance script sa loob ng tree (hal., backfillAggregation)
├── sse/                 # Mga legacy na SSE handler/service (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Legacy na in-memory store (unti-unting pinapalitan ng src/lib/db)
├── types/               # Mga pinagsasaluhang TS type file
├── instrumentation.ts   # Next.js telemetry hook (browser + edge)
├── instrumentation-node.ts  # Instrumentation para lamang sa Node
└── proxy.ts             # HTTP-proxy entry shim
```

### `src/app/` — App Router (Next.js 16)

| Landas                                                                       | Layunin                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Pampublikong API na compatible sa OpenAI (~25 sub-route: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers, atbp.)                                                                                                                 |
| `app/api/v1beta/`                                                            | Mga endpoint ng API na istilong Gemini                                                                                                                                                                                                                                                                                     |
| `app/api/playground/`                                                        | Mga route ng Playground Studio: `improve-prompt/` (POST — tagapagsulat muli ng prompt gamit ang LLM), `presets/` (GET listahan / POST gumawa), `presets/[id]/` (GET / PUT / DELETE) — tingnan ang `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                   |
| `app/api/` (hindi v1)                                                        | Mga route para sa pamamahala/admin (~60 directory: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools, atbp.)                                                                                                                                  |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 route (kontrol sa server, estado/DNS/mappings ng agent, bypass, cert, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Tingnan ang `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                 |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16+ route (requests, sessions, hosts, capture-modes, export, ws). LOCAL_ONLY + SPAWN_CAPABLE. Tingnan ang `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                     |
| `app/a2a/`                                                                   | Pasukan ng A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                                  |
| `app/.well-known/agent.json/`                                                | A2A Agent Card (pagtuklas)                                                                                                                                                                                                                                                                                                 |
| `app/(dashboard)/dashboard/`                                                 | Mga page ng Dashboard UI (50+ seksyon, ~118 page.tsx file: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity, atbp.)                                                                                                                                      |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search Tools Studio UI (3 tab: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — tingnan ang `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                         |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plano 21): `page.tsx` (shell na may 3 tab), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Page ng dashboard ng AgentBridge — card ng server, 9 na card ng agent, setup wizard, pagmamapa ng modelo, listahan ng bypass. i18n PT-BR + EN. Tingnan ang `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                               |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Page ng dashboard ng Traffic Inspector — hatiang DevTools, 7 tab ng detalye, 4 na toggle ng capture mode, recorder ng session, pagkukulay ayon sa konteksto. i18n PT-BR + EN. Tingnan ang `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                          |
| `app/(dashboard)/dashboard/activity/`                                        | Pahina ng feed ng aktibidad (Group B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — tingnan ang `docs/architecture/MONITORING_SECTIONS.md`                                                                                                    |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Pahina ng Pagbabahagi ng Quota (Group B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                      |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Pahina ng configuration ng provider plan (Group B): `page.tsx` + `ProviderPlanConfigClient.tsx` — pag-override sa mga dimensyon ng quota para sa bawat koneksyon                                                                                                                                                           |
| `app/docs/`                                                                  | Naka-embed na viewer ng dokumentasyon (nire-render ang `docs/*.md`)                                                                                                                                                                                                                                                        |
| `app/landing/`                                                               | Landing page para sa marketing                                                                                                                                                                                                                                                                                             |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Mga pahinang nauugnay sa auth                                                                                                                                                                                                                                                                                              |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Mga pahina ng HTTP error                                                                                                                                                                                                                                                                                                   |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Mga static/status na pahina                                                                                                                                                                                                                                                                                                |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Root layout, home, PWA manifest, global CSS                                                                                                                                                                                                                                                                                |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Mga boundary ng error                                                                                                                                                                                                                                                                                                      |

### `src/lib/` — Mga pangunahing library (~50 module)

| Module                                   | Layunin                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `a2a/`                                   | Tagapamahala ng gawain para sa A2A protocol, mga kasanayan (5), streaming                                                                                                                                                                                                                                                            |
| `acp/`                                   | Registry ng CLI Agent (lokal na pagtuklas ng CLI — tingnan ang `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                           |
| `api/`                                   | Mga nakabahaging helper ng API (`requireManagementAuth`, validation)                                                                                                                                                                                                                                                                 |
| `auth/`                                  | Session, pag-hash ng password, validation ng token                                                                                                                                                                                                                                                                                   |
| `batches/`                               | Mga handler ng OpenAI Batches API                                                                                                                                                                                                                                                                                                    |
| `catalog/`                               | Zod validation ng catalog ng provider + pagtukoy sa capability                                                                                                                                                                                                                                                                       |
| `cloudAgent/`                            | Mga Cloud Agent (Codex Cloud, Devin, Jules) — tingnan ang `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                           |
| `combos/`                                | Pagtukoy sa combo + mga helper sa muling pagsasaayos                                                                                                                                                                                                                                                                                 |
| `audit/`                                 | Mga helper ng activity feed: `highLevelActions.ts` (allowlist + `isHighLevelAction()`), `activityIcons.ts` (mapa ng aksiyon → icon/pandiwa), `timeline.ts` (groupByDay/relativeTime) — tingnan ang `docs/architecture/MONITORING_SECTIONS.md`                                                                                        |
| `compliance/`                            | Log ng audit + audit ng provider — tingnan ang `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                         |
| `compression/`                           | Pandikit ng compression engine (matatagpuan ang mga engine sa `open-sse/services/compression/`)                                                                                                                                                                                                                                      |
| `config/`                                | Mga helper ng runtime config                                                                                                                                                                                                                                                                                                         |
| `db/`                                    | 120+ domain DB module + 168 migration (palaging dumaan dito para sa SQLite)                                                                                                                                                                                                                                                          |
| `quota/`                                 | Quota Sharing Engine: `dimensions.ts` (mga uri/Zod), `types.ts` (interface ng QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — tingnan ang `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Client ng katalogo ng libreng modelo ng Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — tingnan ang `docs/frameworks/RADAR.md`                                                                                                                                   |
| `display/`                               | Mga helper sa pag-format ng UI (gastos, latency, atbp.)                                                                                                                                                                                                                                                                              |
| `embeddings/`                            | Mga helper ng serbisyo sa embeddings                                                                                                                                                                                                                                                                                                 |
| `env/`                                   | Pag-parse at pag-validate ng environment variable                                                                                                                                                                                                                                                                                    |
| `evals/`                                 | Framework ng eval (mga suite, runner, runtime) — tingnan ang `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                              |
| `guardrails/`                            | PII masker, prompt injection, vision bridge — tingnan ang `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                              |
| `jobs/`                                  | Mga background job (tulad ng cron)                                                                                                                                                                                                                                                                                                   |
| `memory/`                                | Memorya ng pag-uusap (SQLite FTS5 + sqlite-vec hybrid RRF + Qdrant tier 2) — tingnan ang `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                 |
| `memory/embedding/`                      | Multi-source embedding layer: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plano 21)                                                                                                                                                                                       |
| `memory/vectorStore.ts`                  | Wrapper ng sqlite-vec v0.1.9 — brute-force na KNN + hybrid RRF (FTS5 + vector, k=60). Lazy-init, maayos na bumababa ang functionality kapag hindi available ang sqlite-vec. (plano 21)                                                                                                                                               |
| `memory/reindex.ts`                      | `runReindexBatch()` — pinoproseso sa background ang mga memoryang may `needs_reindex=1`; tinatawag ng `POST /api/memory/reindex` at ng lazy-backfill path. (plano 21)                                                                                                                                                                |
| `monitoring/`                            | Mga health check, pag-emit ng metrics                                                                                                                                                                                                                                                                                                |
| `oauth/`                                 | Mga OAuth/import flow para sa 22 provider module (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                         |
| `plugins/`                               | Registry ng plugin                                                                                                                                                                                                                                                                                                                   |
| `promptCache/`                           | Mga breakpoint ng prompt cache na istilong Anthropic                                                                                                                                                                                                                                                                                 |
| `skills/`                                | Framework ng skills (built-in + marketplace + SkillsSH) — tingnan ang `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                    |
| `playground/`                            | Mga shared helper ng Playground Studio: `codeExport.ts` (generator ng curl/Python/TS), `promptImprover.ts` (tagabuo ng meta-prompt), `streamMetrics.ts` (purong TTFT/TPS), `types.ts` (talahanayan ng pagpepresyo) — tingnan ang `docs/frameworks/PLAYGROUND_STUDIO.md`                                                              |
| `webhookDispatcher.ts`                   | Paghahatid ng HMAC webhook — tingnan ang `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                               |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Mga tagapamahala ng tunnel — tingnan ang `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                 |
| `cloudSync.ts`, `initCloudSync.ts`       | Opsyonal na cloud sync ng state                                                                                                                                                                                                                                                                                                      |
| `localDb.ts`                             | Re-export barrel para sa mga db module (walang lohika — mga re-export lamang)                                                                                                                                                                                                                                                        |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Pag-cache ng request + idempotency                                                                                                                                                                                                                                                                                                   |
| (~30 pang top-level na file)             | Mga espesyal na helper (logEnv, modelsDevSync, piiSanitizer, atbp.)                                                                                                                                                                                                                                                                  |

### `src/lib/db/` — Database (147 module + 208 migration)

| Subdir                    | Layunin                                                                                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | `getDbInstance()` singleton na may WAL journaling                                                                                                                                  |
| `db/migrations/`          | Mga may bersyong SQL file (idempotent, transactional). Idinaragdag ng `073_memory_vec.sql` ang `memory_vec_meta` + `needs_reindex` column (plano 21).                              |
| `db/playgroundPresets.ts` | CRUD module para sa mga preset ng Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD para sa `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue`, atbp. (plano 21)                  |
| `db/<domain>.ts`          | Isang module sa bawat domain: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache, atbp. |

### `src/domain/`

| Module                 | Layunin                                               |
| ---------------------- | ----------------------------------------------------- |
| `policy.ts`            | Policy engine                                         |
| `fallbackPolicy.ts`    | Fallback decision tree                                |
| `costRules.ts`         | Mga panuntunan sa pagkalkula ng gastos                |
| `lockoutPolicy.ts`     | Patakaran sa pag-lockout ng modelo/koneksyon          |
| `tagRouter.ts`         | Routing batay sa tag                                  |
| `comboResolver.ts`     | Pagresolba ng combo (ginagamit ng combo engine)       |
| `modelAvailability.ts` | Pagsusuri ng availability ng bawat modelo             |
| `assessment/`          | Pagtatasa ng modelo (Yugto 1 ng RFC-AUTO-ASSESSMENT ) |

### `src/server/`

| Module   | Layunin                                                                                                        |
| -------- | -------------------------------------------------------------------------------------------------------------- |
| `authz/` | Pipeline ng awtorisasyon: `classify` → `policies` → `enforce` — tingnan ang `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Configuration ng CORS                                                                                          |
| `auth/`  | Middleware ng session                                                                                          |

### `src/shared/`

| Module                           | Layunin                                                                                                                      |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `components/`                    | API ng component ng dashboard: mga adapter sa ibabaw ng `packages/ui-kit` — tingnan ang `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: mga pangalan ng icon na ginagamit ng mga screen → mga component ng Lucide (`<Icon>`)                             |
| `constants/providers.ts`         | **376 provider** na may Zod validation (pinagmumulan ng katotohanan)                                                         |
| `constants/cliTools.ts`          | Registry ng external na CLI tool                                                                                             |
| `constants/routingStrategies.ts` | **20 diskarte sa routing** na may mga priyoridad                                                                             |
| `constants/publicApiRoutes.ts`   | Mga route na nangangailangan ng Bearer auth (kumpara sa management auth)                                                     |
| `constants/upstreamHeaders.ts`   | Denylist ng header para sa mga upstream request                                                                              |
| `validation/schemas.ts`          | ~80 Zod schema (iisang pinagmumulan ng katotohanan para sa mga API contract)                                                 |
| `validation/helpers.ts`          | Mga helper para sa Zod validation (`validateBody`, atbp.)                                                                    |
| `types/`                         | Mga nakabahaging TS type                                                                                                     |
| `contracts/`                     | Mga pampublikong API contract (ginagamit ng `files:` sa `package.json`)                                                      |
| `utils/circuitBreaker.ts`        | Circuit breaker ng provider (tingnan ang `docs/architecture/RESILIENCE_GUIDE.md`)                                            |
| `utils/apiAuth.ts`               | Pagpapatunay ng API key, pagsusuri ng scope                                                                                  |
| `utils/fetchTimeout.ts`          | Mga wrapper ng timeout/abort para sa upstream fetch                                                                          |
| `utils/releaseNotes.ts`          | Parser ng closed v2/legacy announcement, localization, at pag-dismiss ayon sa ID                                             |

---

## `open-sse/` — Workspace ng Streaming Engine

Hiwalay na npm workspace (`@omniroute/open-sse`). Pinangangasiwaan ang pagproseso ng request at pagpapatupad ng provider.

```
open-sse/
├── handlers/            # 16 na file (12 handler + 4 helper): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search, atbp.
├── executors/           # 150 executor module (mga class na nag-e-extend sa BaseExecutor + mga helper para sa bawat provider)
├── translator/          # Mga converter ng format (9 request, 9 response, 9 helper)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ service module (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM, atbp.)
├── mcp-server/          # MCP server (110 tool, 3 transport, 33 scope)
├── config/              # Mga registry ng provider/model, config ng header, mga alias ng model
├── utils/               # TLS client, proxy fetch/dispatcher, mga network helper
├── index.ts             # Entry ng workspace
├── package.json         # Manifest ng workspace
├── tsconfig.json        # TS config ng workspace
└── types.d.ts           # Mga deklarasyon ng type ng workspace
```

### `open-sse/mcp-server/`

| Path                        | Layunin                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| `server.ts`                 | Lifecycle ng MCP server (stdio + mga HTTP transport)                                       |
| `httpTransport.ts`          | HTTP Streamable + mga SSE transport (`/api/mcp/sse`, `/api/mcp/stream`)                    |
| `audit.ts`                  | Pag-log ng audit sa table na `mcp_tool_audit`                                              |
| `scopeEnforcement.ts`       | Pag-validate ng scope para sa bawat tool                                                   |
| `runtimeHeartbeat.ts`       | Health heartbeat sa `DATA_DIR/runtime/mcp-heartbeat.json`                                  |
| `descriptionCompressor.ts`  | Kino-compress ang metadata ng paglalarawan ng tool upang makatipid ng context              |
| `schemas/tools.ts`          | 36 na batayang depinisyon ng tool + mga scope                                              |
| `tools/advancedTools.ts`    | Mga advanced na implementasyon ng tool                                                     |
| `tools/memoryTools.ts`      | 3 memory tool (search/add/clear)                                                           |
| `tools/skillTools.ts`       | 4 skill tool (list/enable/execute/executions)                                              |
| `tools/compressionTools.ts` | 5 compression tool                                                                         |
| `README.md`                 | Internal na README ng MCP server (naka-cross-link mula sa `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — Mga Workspace

| Path                     | Layunin                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — vendored snapshot ng Keak CI UI Kit (`private`, `UNLICENSED`), ginagamit bilang source (walang build). Itinatakda ng `UPSTREAM.md` ang upstream commit at itinatala ang pahintulot sa lisensya; inililista ng `PATCHES.md` ang mga lokal na patch (wala); sini-sync lamang ang `src/` ng `scripts/dev/sync-ui-kit.sh` at binabantayan ng `npm run check:ui-kit-snapshot`. Tingnan ang `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — opsyonal na serbisyo ng browser pool (chat na sinusuportahan ng CloakBrowser at Playwright)                                                                                                                                                                                                                                                                                                                          |

---

## `electron/` — Desktop Wrapper

| File             | Layunin                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `main.js`        | Pangunahing proseso ng Electron (BrowserWindow, naka-embed na Next.js server, system tray, awtomatikong pag-update) |
| `preload.js`     | IPC bridge (contextBridge → `window.omniroute`)                                                                     |
| `package.json`   | Config ng electron-builder + Electron 41 + mga dependency ng electron-builder 26.10                                 |
| `assets/`        | Mga icon ng app (Windows .ico, macOS .icns, Linux .png)                                                             |
| `dist-electron/` | Output ng build (gitignored)                                                                                        |
| `types.d.ts`     | Mga deklarasyon ng type para sa renderer bridge                                                                     |
| `README.md`      | Panloob na README ng Electron (tingnan din ang `docs/guides/ELECTRON_GUIDE.md`)                                     |

---

## `bin/` — CLI

| File                                                                                                        | Layunin                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Pangunahing entry ng CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos`, atbp. |
| `reset-password.mjs`                                                                                        | Standalone na CLI para sa pag-reset ng password                                                                                       |
| `cli/commands/setup.mjs`                                                                                    | Interactive + non-interactive na setup wizard                                                                                         |
| `cli/commands/doctor.mjs`                                                                                   | Mga diagnostic sa kalusugan ng system (8+ pagsusuri)                                                                                  |
| `cli/commands/providers.mjs`                                                                                | Paglista/pagsubok/pag-validate ng provider                                                                                            |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Mga helper module ng CLI                                                                                                              |
| `cli/tray/tray.ts`                                                                                          | Integrasyon sa system tray (cross-platform: NotifyIcon sa Windows, systray2 sa macOS/Linux)                                           |
| `cli/tray/tray.ps1`                                                                                         | PowerShell NotifyIcon backend (Windows, walang bagong binary)                                                                         |
| `cli/tray/autostart.ts`                                                                                     | Cross-platform na awtomatikong pagsisimula (LaunchAgent / .desktop / registry)                                                        |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5-hakbang na chain ng pag-resolve sa SQLite driver (bundled → runtime → lazy-install → node:sqlite → sql.js)                          |
| `cli/runtime/magicBytes.mjs`                                                                                | Binary magic-byte validation (ELF / Mach-O / Mach-O fat / PE)                                                                         |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — paunang nire-resolve ang mga driver sa postinstall / unang pagsisimula                                           |
| `nodeRuntimeSupport.mjs`                                                                                    | I-validate ang sinusuportahang bersyon ng Node.js sa pag-install                                                                      |

---

## `skills/` — Mga Pampublikong Kasanayan ng Agent

| File                         | Layunin                                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifest ng kasanayan para sa mga panlabas na AI agent (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Mga Script sa Pag-build at Pagsusuri

| Script                              | Layunin                                                                                        |
| ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Runner para sa pag-develop/pagsisimula na may hydration ng env                                 |
| `build-next-isolated.mjs`           | Standalone na build (Next.js 16 standalone)                                                    |
| `prepublish.ts`                     | Paghahanda ng package bago ang `npm pack`                                                      |
| `postinstall.mjs`                   | Awtomatikong gumawa ng `.env` mula sa `.env.example` sa unang pag-install                      |
| `sync-env.mjs`                      | Muling i-sync ang mga key ng `.env` sa `.env.example`                                          |
| `check-cycles.mjs`                  | Tukuyin ang mga circular dependency                                                            |
| `check-route-validation.mjs`        | Tiyaking may Zod validation ang lahat ng API route                                             |
| `check-t11-any-budget.mjs`          | Ipatupad ang tahasang budget ng `any` sa bawat file                                            |
| `check-docs-sync.mjs`               | Tiyakin ang pag-sync ng bersyon ng docs (kasalukuyang pre-commit)                              |
| **`check-env-doc-sync.mjs`**        | BAGO: pagtugmain ang mga env var sa code, `.env.example`, at `ENVIRONMENT.md`                  |
| **`check-docs-counts-sync.mjs`**    | BAGO: tiyaking tumutugma sa docs ang mga bilang (executor, strategy, OAuth, A2A skill)         |
| **`check-deprecated-versions.mjs`** | BAGO: markahan ang mga lipas na bersyon/petsa sa docs                                          |
| `check-supported-node-runtime.ts`   | Tiyaking sinusuportahan ang kasalukuyang bersyon ng Node                                       |
| `check-pr-test-policy.mjs`          | Ipatupad ang panuntunang "kailangan ang mga test" sa mga pagbabago sa production code          |
| **`gen-provider-reference.ts`**     | BAGO: awtomatikong buuin ang `docs/reference/PROVIDER_REFERENCE.md` mula sa catalog            |
| `i18n/generate-multilang.mjs`       | Isalin ang mga UI string at docs gamit ang Google Translate                                    |
| `i18n_autotranslate.py`             | Pipeline ng pagsasalin ng docs na nakabatay sa LLM                                             |
| `validate_translation.py`           | Pagpapatunay ng pagsasalin para sa bawat locale                                                |
| `check_translations.py`             | Pagsusuri ng i18n key sa panig ng code                                                         |
| `run-playwright-tests.mjs`          | Playwright E2E runner                                                                          |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2E runner                                                                             |
| `run-ecosystem-tests.mjs`           | Mga test sa ecosystem (integrasyon ng provider)                                                |
| `test-report-summary.mjs`           | Bumuo ng markdown ng buod ng coverage                                                          |
| `smoke-electron-packaged.mjs`       | I-smoke test ang naka-package na Electron build                                                |
| `native-binary-compat.mjs`          | Tiyaking tumutugma sa Node ng Electron ang mga native dependency (`better-sqlite3`)            |
| `validate-pack-artifact.ts`         | Tiyakin ang output ng npm pack                                                                 |
| `responses-ws-proxy.mjs`            | WebSocket bridge para sa Codex Responses API                                                   |
| `v1-ws-bridge.mjs`                  | WebSocket bridge para sa `/api/v1/ws` endpoint                                                 |
| `standalone-server-ws.mjs`          | Standalone na WS server runner                                                                 |
| `system-info.mjs`                   | I-print ang impormasyon ng system/runtime para sa suporta                                      |
| `healthcheck.mjs`                   | Isahang health check (ginagamit ng Docker HEALTHCHECK)                                         |
| `uninstall.mjs`                     | Script para sa malinis na pag-uninstall                                                        |
| `dev/sync-ui-kit.sh`                | Kopyahin ang `src/` ng CI UI Kit sa isang naka-pin na commit papunta sa `packages/ui-kit/src`  |
| `check/check-ui-kit-snapshot.mjs`   | Pre-commit gate: tumutugma ang `packages/ui-kit/src` sa naka-pin na upstream commit            |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — mga ginagamit na pangalan ng icon na hindi mina-map ng `ICON_MAP`     |
| `dev/codemod-material-icons.mjs`    | Isulat muli ang mga literal na span ng Material Symbols bilang `<Icon>` (tooling sa migration) |

---

## `docs/` — Pampublikong Dokumentasyon (7 root file + 17 subdirectory)

### Mga gabay sa pinakamataas na antas

| Dokumento                   | Layunin                                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Pangkalahatang arkitektura, mapa ng subsystem, saklaw ng dashboard                                 |
| `CODEBASE_DOCUMENTATION.md` | Sanggunian sa engineering: mga directory, module, convention                                       |
| `FEATURES.md`               | Matrix ng feature na may mga highlight ng v3.8                                                     |
| `USER_GUIDE.md`             | Manwal ng end user (setup, mga model, combo, CLI, audio, atbp.)                                    |
| `API_REFERENCE.md`          | Sanggunian ng API endpoint na may modelo ng authentication                                         |
| `openapi.yaml`              | OpenAPI 3.0 specification (121 path)                                                               |
| `SETUP_GUIDE.md`            | Mga paraan ng pag-install (npm, npx, Docker, Electron, Termux, source)                             |
| `ENVIRONMENT.md`            | Lahat ng env var (~800 ang dokumentado, ~3,050 linya sa `.env.example`)                            |
| `TROUBLESHOOTING.md`        | Mga karaniwang error + mga kilalang isyu sa v3.8.0                                                 |
| `RELEASE_CHECKLIST.md`      | Kumpletong daloy ng release (skills, husky, conventional commits, deploy)                          |
| `COVERAGE_PLAN.md`          | Mga layunin sa coverage at kasalukuyang kalagayan                                                  |
| `FREE_TIERS.md`             | Piniling mga free-tier provider (48+ libre + 11 OAuth)                                             |
| `CLI-TOOLS.md`              | Mga external CLI integration + Internal OmniRoute CLI                                              |
| `I18N.md`                   | Arkitektura ng i18n, pagdaragdag ng wika, 67 locale                                                |
| `UNINSTALL.md`              | Mga hakbang para sa malinis na pag-uninstall                                                       |
| `PROVIDER_REFERENCE.md`     | **Awtomatikong binuo** na catalog ng 376 provider (muling buuin: `npm run gen:provider-reference`) |

### Masusing pagtalakay sa mga subsystem

| Dokumento                                     | Layunin                                                                                 |
| --------------------------------------------- | --------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                               | MCP server: 110 tool, 3 transport, 33 saklaw, mga REST endpoint                         |
| `A2A-SERVER.md`                               | A2A v0.3: JSON-RPC, 6 na skill, mga REST helper, agent card                             |
| `AGENT_PROTOCOLS_GUIDE.md`                    | Pinag-isang gabay: A2A vs ACP vs Cloud Agents                                           |
| `CLOUD_AGENT.md`                              | Orchestration ng Codex Cloud / Devin / Jules                                            |
| `SKILLS.md`                                   | Framework ng skill (built-in + marketplace + SkillsSH + sandbox)                        |
| `RADAR.md`                                    | Overlay ng catalog ng libreng model ng Radar (`RADAR_ENABLED`, naka-off bilang default) |
| `MEMORY.md`                                   | Sistema ng memory (SQLite FTS5 + Qdrant)                                                |
| `EVALS.md`                                    | Framework ng eval (mga suite, run, rubric)                                              |
| `GUARDRAILS.md`                               | PII masker, prompt injection, vision bridge                                             |
| `COMPLIANCE.md`                               | Audit log, retention, opsyong hindi gumamit ng noLog                                    |
| `WEBHOOKS.md`                                 | Paghahatid ng webhook na nilagdaan gamit ang HMAC                                       |
| `REASONING_REPLAY.md`                         | Hybrid memory/SQLite cache para sa `reasoning_content`                                  |
| `AUTHZ_GUIDE.md`                              | Pipeline ng authorization (`classify` → `policies` → `enforce`)                         |
| `RESILIENCE_GUIDE.md`                         | Circuit breaker + cooldown + pag-lockout ng model                                       |
| `docs/security/STEALTH_GUIDE.md` (git lamang) | TLS fingerprinting (JA3/JA4), Claude Code CCH, MITM certificate                         |
| `AUTO-COMBO.md`                               | Auto Combo engine (16-factor scoring, 6 na mode pack, virtual factory)                  |

### Kompresyon

| Dokumento                       | Layunin                                                |
| ------------------------------- | ------------------------------------------------------ |
| `COMPRESSION_GUIDE.md`          | Pangkalahatang-ideya ng mga compression mode + roadmap |
| `COMPRESSION_ENGINES.md`        | Mga Caveman + RTK engine, registry contract            |
| `COMPRESSION_RULES_FORMAT.md`   | JSON schema ng Caveman rule pack                       |
| `COMPRESSION_LANGUAGE_PACKS.md` | Imbentaryo ng rule pack para sa bawat wika             |
| `RTK_COMPRESSION.md`            | Declarative pipeline ng RTK (49 na filter)             |

### Pag-deploy

| Doc                          | Layunin                                                                  |
| ---------------------------- | ------------------------------------------------------------------------ |
| `DOCKER_GUIDE.md`            | Pagbuo ng Docker, mga profile (base/cli/host/cliproxyapi), Redis sidecar |
| `VM_DEPLOYMENT_GUIDE.md`     | Pangkalahatang deployment sa VM/VPS (Ubuntu/Debian + nginx + systemd)    |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Deployment sa Fly.io (kasalukuyang nasa Chinese lamang)                  |
| `TERMUX_GUIDE.md`            | Headless na Android sa pamamagitan ng Termux                             |
| `PWA_GUIDE.md`               | Pag-install ng Progressive Web App + service worker                      |
| `ELECTRON_GUIDE.md`          | Pagbuo + pag-sign + pamamahagi ng desktop app                            |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                   |
| `PROXY_GUIDE.md`             | 4-level na outbound proxy + 1proxy marketplace                           |

### Mga subdirectory

| Subdir                | Layunin                                                                                                                                                                                                                                         |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Mga lokal na salin ng dokumentasyon (41 locale)                                                                                                                                                                                                 |
| `docs/screenshots/`   | Mga image asset para sa mga gabay                                                                                                                                                                                                               |
| `_tasks/superpowers/` | Mga plano/spec mula sa superpowers (`writing-plans`/`brainstorming`) + pananaliksik — nakahiwalay at may sariling versioning na repo, naka-gitignore sa pangunahing tree. Tingnan ang CLAUDE.md → "Mga Artifact ng Pagpaplano at Pananaliksik". |

---

## `tests/` — Mga Suite ng Pagsubok

| Subdirektoryo                        | Uri                                            | Tagapagpatakbo                                |
| ------------------------------------ | ---------------------------------------------- | --------------------------------------------- |
| `tests/unit/`                        | Mga unit test (~4,800 file, pinakamabilis)     | Native na test runner ng Node                 |
| `tests/integration/`                 | Mga integration test ng maraming module + DB   | Native na test runner ng Node (concurrency 1) |
| `tests/e2e/`                         | E2E ng UI + workflow                           | Playwright                                    |
| `tests/e2e/protocol-clients.test.ts` | E2E ng tunay na client para sa MCP + A2A       | Mga custom na protocol client                 |
| `tests/e2e/ecosystem.test.ts`        | Integrasyon ng provider (gumagamit ng network) | Native na test runner ng Node                 |

---

## `public/` — Mga Statikong Asset

| Path                | Layunin                                                                      |
| ------------------- | ---------------------------------------------------------------------------- |
| `public/` (root)    | Mga favicon, robots.txt, manifest, service worker, at larawang pangmarketing |
| `public/providers/` | Mga PNG/SVG na logo ng provider (ginagamit sa dashboard)                     |

---

## `config/` — Mga Statikong Config + Kalagayan ng Quality Gate

Mga kasamang template ng configuration at mga naka-commit na baseline ng quality gate
(inilipat dito mula sa root ng repo sa v3.8.26 upang mapanatiling magaan ang root).

| Path                                          | Layunin                                                                                              |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Listahan ng locale + metadata (kanonikal na source para sa bilang na 42 locale)                      |
| `config/i18n-schema.json`                     | JSON schema na nagpapatunay sa `i18n.json`                                                           |
| `config/payloadRules.json`                    | Mga panuntunan sa sanitization ng upstream payload                                                   |
| `config/quality/quality-baseline.json`        | Multi-metric ratchet baseline (`scripts/quality/check-quality-ratchet.mjs`)                          |
| `config/quality/complexity-baseline.json`     | Naka-freeze na baseline ng ESLint complexity (`check-complexity.mjs`)                                |
| `config/quality/duplication-baseline.json`    | Naka-freeze na baseline ng jscpd duplication (`check-duplication.mjs`)                               |
| `config/quality/file-size-baseline.json`      | Naka-freeze na baseline ng laki ng bawat file (`check-file-size.mjs`)                                |
| `config/quality/test-discovery-baseline.json` | Naka-freeze na baseline ng mga orphan test (`check-test-discovery.mjs`)                              |
| `config/quality/dependency-allowlist.json`    | Allowlist ng mga aprubadong dependency (`check-deps.mjs`)                                            |
| `config/quality/.license-allowlist.json`      | Allowlist ng mga lisensyang SPDX (`check-licenses.mjs`)                                              |
| `config/quality/quality-metrics.json`         | Pansamantalang nakolektang metrics (binuo ng `collect-metrics.mjs`; **hindi sinusubaybayan ng git**) |

---

## `.github/` — Integrasyon sa GitHub

| Path                               | Layunin                                                              |
| ---------------------------------- | -------------------------------------------------------------------- |
| `.github/workflows/`               | Mga workflow ng GitHub Actions CI/CD (lint, test, coverage, release) |
| `.github/ISSUE_TEMPLATE/`          | Mga template ng issue para sa bug/feature                            |
| `.github/pull_request_template.md` | Template ng PR                                                       |
| `.github/dependabot.yml`           | Configuration ng pag-update ng dependency                            |

---

## `.husky/` — Mga Git Hook

| File         | Layunin                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------- |
| `pre-commit` | Pinapatakbo ang `lint-staged + check-docs-sync + check:any-budget:t11`                    |
| `pre-push`   | Kasalukuyang naka-disable (naka-comment). Manu-manong patakbuhin ang `npm run test:unit`. |
| `_/`         | Mga internal na bahagi ng Husky                                                           |

---

## `.claude/` — Mga Slash Command ng Claude Code

| File                                                | Layunin                                                          |
| --------------------------------------------------- | ---------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — i-bump ang bersyon + awtomatikong changelog |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — kumpletong workflow ng release          |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Mag-deploy sa VPS                                                |
| `commands/capture-release-evidences-cc.md`          | I-record sa browser ang mga bagong feature bilang WebP           |
| `commands/review-{prs,discussions}-cc.md`           | I-triage ang mga GitHub PR/talakayan                             |
| `commands/{review-issues,implement-features}-cc.md` | Mga workflow ng issue                                            |
| `settings.local.json`                               | Mga setting ng Claude Code para sa bawat proyekto                |

---

## `.agents/` — Mga Generic na Workflow ng Agent (Codex / Cursor / atbp.)

| Path                     | Layunin                                                   |
| ------------------------ | --------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 kahulugan ng workflow (salamin ng `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 na kahulugan ng skill na may Codex Execution Notes      |

> **Paalala:** Kasalukuyang magkapareho ang mga workflow at command sa bawat byte. Kung nakalaan ang `.agents/` para sa ibang agent runtime (Codex), kailangang magkaroon ng makabuluhang pagkakaiba ang mga variant.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Nasa Labas ng Tree

Naglalaman ang mga directory na ito na may underscore prefix ng content na hindi kasama sa shipping:

- **`_ideia/`** — mga tala sa disenyo (mga kategoryang defer / notfit / viable)
- **`_mono_repo/`** — mga makasaysayang subproject (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — mga read-only na clone ng mga kaugnay na OSS project (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api, atbp.) para sa cross-reference habang nagde-develop
- **`_tasks/`** — mga file sa pagsubaybay ng gawain para sa bawat release (impormal)

Hindi kasama sa output ng `npm pack`. Tingnan ang `.npmignore`.

---

## Binuo / Hindi Sinusubaybayan ng Git

| Path                   | Layunin                                |
| ---------------------- | -------------------------------------- |
| `node_modules/`        | Mga dependency ng npm                  |
| `.next/`               | Output ng build ng Next.js             |
| `coverage/`            | Mga ulat ng coverage ng c8             |
| `logs/`                | Mga log habang tumatakbo               |
| `package/`             | Staging para sa npm pack               |
| `.playwright-mcp/`     | Mga artifact ng test ng Playwright MCP |
| `.issues/`             | Lokal na cache ng issue                |
| `tsconfig.tsbuildinfo` | Incremental na cache ng TS             |

---

## Mga tip sa pag-navigate

- **Bagong contributor?** Basahin ang `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Nagdaragdag ng provider?** Sundin ang `docs/architecture/ARCHITECTURE.md § Adding a New Provider` + i-cross-check ang `docs/reference/PROVIDER_REFERENCE.md`.
- **Nagdaragdag ng route?** `docs/architecture/ARCHITECTURE.md § Adding a New API Route` + `src/shared/validation/schemas.ts`.
- **Nagdaragdag ng MCP tool?** `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Nagdaragdag ng A2A skill?** `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Lokal na pagpapatakbo?** `docs/guides/SETUP_GUIDE.md`.
- **Pagde-deploy?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Pagre-release?** `docs/ops/RELEASE_CHECKLIST.md` (at ang `/generate-release-cc` na skill ng Claude Code).
