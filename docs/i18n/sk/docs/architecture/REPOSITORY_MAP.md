# Repository Map (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Jednoriadkový opis každého adresára a súboru v koreňovom adresári.**
> Naposledy aktualizované: 2026-06-28 — OmniRoute v3.8.40
>
> Pomocou tejto mapy sa môžete rýchlo orientovať v kódovej základni. Podrobnejšie informácie nájdete v odkazoch na príslušnú dokumentáciu.

## Strom najvyššej úrovne

```
OmniRoute/
├── src/                  # Aplikácia Next.js 16 (používateľské rozhranie + trasy API + knižnice + doména + server)
├── open-sse/             # Pracovný priestor streamovacieho jadra (obslužné rutiny, vykonávacie moduly, prekladač, server MCP)
├── packages/            # Pracovné priestory npm: ui-kit (dodávaný Keak CI UI Kit) a browser-pool
├── electron/             # Desktopový obal (Electron 41 + electron-builder 26.10)
├── bin/                  # Vstupný bod CLI a obslužné rutiny príkazov
├── scripts/              # Skripty na zostavovanie, kontroly, synchronizáciu a jednorazové úlohy
├── docs/                 # Verejná dokumentácia (nachádzate sa tu)
├── tests/                # Všetky testovacie sady (jednotkové, integračné, e2e, klienti protokolov)
├── public/               # Statické prostriedky Next.js, manifest PWA, service worker, ikony
├── config/               # Statická konfigurácia + stav brány kvality (i18n, payloadRules, quality/)
├── images/               # Obrázkové prostriedky pre marketing a README
├── @omniroute/           # Publikovateľné sprievodné balíky (opencode-plugin, opencode-provider)
├── skills/               # Balíky zručností pre CLI/agentov (cli-* + omni-* + config-codex-cli)
├── examples/             # Vzorové pluginy + štartovací projekt omniroute-cmd-hello
├── contrib/              # Komunitné príspevky (podman/)
├── .source/              # Zdrojová konfigurácia Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Pracovné postupy GitHub Actions + šablóny problémov + šablóna PR
├── .husky/               # Git hooky (pre-commit, pre-push)
├── .claude/              # Lomkové príkazy Claude Code (v rámci projektu)
├── .agents/              # Pracovné postupy a zručnosti pre Codex/všeobecných agentov (zrkadlo .claude/)
├── .vscode/              # Nastavenia pracovného priestoru VS Code
├── _ideia/               # Plánovacie poznámky (neformálne; nedistribuujú sa)
├── _mono_repo/           # Historické podprojekty (cloud, site, vscode-extension)
├── _references/          # Referenčné klony súvisiacich projektov OSS určené iba na čítanie
├── _tasks/               # Súbory na sledovanie úloh pre jednotlivé vydania (neformálne)
├── .build/ .worktrees/ dist/   # Dočasné lokálne zostavenia, git-worktree a výstupy zostavenia (ignorované systémom git)
├── .issues/              # Lokálna vyrovnávacia pamäť problémov (ignorovaná systémom git)
├── .playwright-mcp/      # Artefakty testov Playwright MCP
├── coverage/             # Výstup pokrytia c8 (ignorovaný systémom git)
├── logs/                 # Prevádzkové protokoly (ignorované systémom git)
├── node_modules/         # Závislosti (ignorované systémom git)
├── package/              # Prípravná oblasť pre npm pack (artefakt zostavenia)
├── .next/                # Výstup zostavenia Next.js (ignorovaný systémom git)
└── (súbory v koreňovom adresári — pozri nižšie)
```

---

## Súbory v koreňovom adresári

| Súbor                                       | Účel                                                                                                 |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **README.md**                               | Marketingová vstupná stránka + rýchly štart + matica funkcií (pozri aj `llm.txt`)                    |
| **CHANGELOG.md**                            | Záznam zmien pre jednotlivé vydania (automaticky generovaný nástrojom `/version-bump-cc`)            |
| **LICENSE**                                 | Text licencie MIT                                                                                    |
| **CLAUDE.md**                               | Pravidlá projektu pre agentov Claude Code (pevné pravidlá, konvencie, scenáre)                       |
| **AGENTS.md**                               | To isté ako CLAUDE.md, ale pre AI agentov iných než Claude (Codex, Cursor atď.)                      |
| **GEMINI.md**                               | Stručné pravidlá pre agentov založených na Gemini (podmnožina CLAUDE.md)                             |
| **CONTRIBUTING.md**                         | Príručka pre prispievateľov: nastavenie, konvenčné commity, testovanie, postup PR                    |
| **SECURITY.md**                             | Zásady nahlasovania zraniteľností, podporované verzie, model hrozieb                                 |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — očakávania týkajúce sa správania komunity                                     |
| **llm.txt**                                 | Vstupná stránka vo formáte čistého textu optimalizovaná pre crawlery LLM (SEO pre AI asistentov)     |
| **package.json**                            | Manifest npm, skripty, závislosti, enginy, brána pokrytia c8                                         |
| **package-lock.json**                       | Uzamknutý strom závislostí                                                                           |
| **tsconfig.json**                           | Koreňová konfigurácia TypeScriptu                                                                    |
| **tsconfig.typecheck-core.json**            | Konfigurácia kontroly typov pre jadro `src/`                                                         |
| **tsconfig.typecheck-noimplicit-core.json** | Prísna (`noImplicitAny`) kontrola typov                                                              |
| **tsconfig.tsbuildinfo**                    | Vyrovnávacia pamäť inkrementálneho zostavenia TS (ignorovaná Gitom)                                  |
| **next.config.mjs**                         | Konfigurácia zostavenia Next.js 16 (samostatný výstup)                                               |
| **next-env.d.ts**                           | Automaticky generované typy prostredia Next.js                                                       |
| **eslint.config.mjs**                       | Plochá konfigurácia ESLint (pravidlá podľa oblasti projektu)                                         |
| **prettier.config.mjs**                     | Pravidlá formátovania Prettier                                                                       |
| **postcss.config.mjs**                      | Konfigurácia PostCSS pre pipeline Tailwind/CSS                                                       |
| **playwright.config.ts**                    | Konfigurácia E2E testov Playwright                                                                   |
| **vitest.config.ts**                        | Konfigurácia Vitest (predvolený balík testov)                                                        |
| **vitest.mcp.config.ts**                    | Konfigurácia Vitest pre server MCP / autoCombo / balíky vyrovnávacej pamäte                          |
| **sonar-project.properties**                | Konfigurácia SonarQube/SonarCloud (kvalita kódu)                                                     |
| **Dockerfile**                              | Viacfázové zostavenie Docker (builder → runner-base → runner-cli)                                    |
| **docker-compose.yml**                      | Vývojová konfigurácia compose so 4 profilmi (base, cli, host, cliproxyapi) + pomocný kontajner redis |
| **docker-compose.prod.yml**                 | Produkčná konfigurácia compose (port 20130, redis, pomenované zväzky)                                |
| **.dockerignore**                           | Súbory vylúčené z kontextu Docker                                                                    |
| **fly.toml**                                | Konfigurácia nasadenia Fly.io (región `sin`, port 20128, zväzok /data)                               |
| **.env.example**                            | Šablóna súboru prostredia (pri prvej inštalácii sa automaticky skopíruje do `.env`)                  |
| **.gitignore**                              | Vzory ignorovania pre Git                                                                            |
| **.npmignore**                              | Zoznam súborov vylúčených pri publikovaní v npm                                                      |
| **.npmrc**                                  | Konfigurácia npm (register, zásady súboru lockfile)                                                  |
| **.node-version**                           | Pripnutá verzia Node (používaná nástrojmi kompatibilnými s nvm)                                      |
| **.nvmrc**                                  | Pripnutá verzia Node pre nvm                                                                         |
| **eslint.complexity.config.mjs**            | Konfigurácia ESLint pre račňu zložitosti (`scripts/check/check-complexity.mjs --config`)             |
| **eslint.sonarjs.config.mjs**               | Konfigurácia ESLint pre pravidlá SonarJS (kognitívna zložitosť / duplicita)                          |
| **source.config.ts**                        | Zdrojová konfigurácia Fumadocs `defineDocs` (poskytuje údaje pre `.source/`)                         |
| **knip.json**                               | Konfigurácia Knip — nepoužívané súbory/exporty/závislosti (poskytuje údaje pre bránu mŕtveho kódu)   |
| **stryker.conf.json**                       | Konfigurácia mutačného testovania Stryker                                                            |
| **.size-limit.json**                        | konfigurácia rozpočtu veľkosti balíka size-limit                                                     |
| **promptfooconfig.yaml**                    | konfigurácia vyhodnocovania promptfoo                                                                |
| **.gitleaks.toml**                          | súbor pravidiel nástroja gitleaks na vyhľadávanie tajomstiev                                         |
| **.zizmor.yml**                             | konfigurácia bezpečnostnej kontroly GitHub Actions nástrojom zizmor                                  |
| **socket.yml**                              | konfigurácia zabezpečenia dodávateľského reťazca Socket.dev                                          |
| **news.json**                               | Lokalizovaný kanál oznámení v2; položka o spustení Radaru sa dodáva ako neaktívna                    |
| **flake.nix** / **flake.lock**              | definícia vývojového shellu Nix + zámok                                                              |
| **.env**                                    | Lokálne tajomstvá (ignorované systémom git — generované z `.env.example`)                            |

> **Presunuté z koreňového adresára vo verzii v3.8.26 (sprehľadnenie):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` a generovaný súbor `quality-metrics.json` (ignorovaný systémom git). Pozrite si [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — aplikácia Next.js

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

### `src/app/` — smerovač aplikácií (Next.js 16)

| Cesta                                                                        | Účel                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                                | Verejné OpenAI-compat API (~ 25 podtrás: chat, dokončenia, vloženia, súbory, dávky, zvuk, obrázky, videá, hudba, zmena hodnotenia, moderovanie, vyhľadávanie, ws, agenti, účty, poskytovatelia atď.)                                                                                                               |
| `app/api/v1beta/`                                                            | Koncové body API v štýle Blížencov                                                                                                                                                                                                                                                                                 |
| `app/api/playground/`                                                        | Trasy Playground Studio: `improve-prompt/` (POST — LLM prompt rewriter), `presets/` (GET list / POST create), `presets/[id]/` (GET / PUT / DELETE) — pozri `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                  |
| `app/api/` (nie v1)                                                          | Management/admin routes (adresáre ~ 60: poskytovatelia, kombá, nastavenia, mcp, a2a, evals, pamäť, zručnosti, webhooky, súlad, odolnosť, monitorovanie, tunely, nástroje cli-tools atď.)                                                                                                                           |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 ciest (riadenie servera, agent state/DNS/mappings, bypass, cert, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Pozri `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                    |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16 trás + (požiadavky, relácie, hostitelia, režimy zachytávania, export, ws). LOCAL_ONLY + SPAWN_CAPABLE. Pozri `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                       |
| `app/a2a/`                                                                   | A2A vstupný bod JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                         |
| `app/.well-known/agent.json/`                                                | A2A karta agenta (objavenie)                                                                                                                                                                                                                                                                                       |
| `app/(dashboard)/dashboard/`                                                 | Stránky UI na paneli (50 sekcií +, súbory ~ 118 page.tsx : poskytovatelia, kombá, nastavenia, pamäť, zručnosti, webhooky, hodnotenia, audit, dávka, vyrovnávacia pamäť, náklady, zdravie, systém, aktivita atď.)                                                                                                   |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search Tools Studio UI (3 karty: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — pozri `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                     |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plán 21): `page.tsx` (3-tab shell), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Stránka dashboardu AgentBridge — karta servera, 9 kariet agentov, sprievodca nastavením, mapovanie modelov, zoznam premostení. i18n PT-BR + EN. Pozri `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                            |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Stránka ovládacieho panela Traffic Inspector – rozdelenie DevTools, 7 kariet s podrobnosťami, 4 prepínače režimu snímania, záznam relácie, zafarbenie kontextu. i18n PT-BR + EN. Pozri `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                     |
| `app/(dashboard)/dashboard/activity/`                                        | Stránka informačného kanála aktivity (skupina B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` – pozri `docs/architecture/MONITORING_SECTIONS.md`                                                                                       |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Stránka zdieľania kvót (skupina B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                    |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Konfiguračná stránka plánu poskytovateľa (skupina B): `page.tsx` + `ProviderPlanConfigClient.tsx` – prepísanie rozmerov kvóty na pripojenie                                                                                                                                                                        |
| `app/docs/`                                                                  | Vložený prehliadač dokumentácie (vykresľuje `docs/*.md`)                                                                                                                                                                                                                                                           |
| `app/landing/`                                                               | Marketingová vstupná stránka                                                                                                                                                                                                                                                                                       |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Stránky súvisiace s autorizáciou                                                                                                                                                                                                                                                                                   |
| `app/{400,401,403,408,429,500,502,503}/`                                     | chybové stránky HTTP                                                                                                                                                                                                                                                                                               |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Static/status stránky                                                                                                                                                                                                                                                                                              |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Root layout, home, PWA manifest, global CSS                                                                                                                                                                                                                                                                        |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Hranice chýb                                                                                                                                                                                                                                                                                                       |

### `src/lib/` — základné knižnice (~ 50 modulov)

| modul                                    | Účel                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | správca úloh protokolu A2A, zručnosti (5), streamovanie                                                                                                                                                                                                                                                                          |
| `acp/`                                   | Registre agentov CLI (lokálny objav CLI – pozri `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                      |
| `api/`                                   | Zdieľaní pomocníci API (`requireManagementAuth`, overenie)                                                                                                                                                                                                                                                                       |
| `auth/`                                  | Relácia, hashovanie hesla, overenie tokenu                                                                                                                                                                                                                                                                                       |
| `batches/`                               | OpenAI Dávkové manipulátory API                                                                                                                                                                                                                                                                                                  |
| `catalog/`                               | Katalóg poskytovateľa Zod validácia rozlíšenie schopnosti +                                                                                                                                                                                                                                                                      |
| `cloudAgent/`                            | Cloud Agents (Codex Cloud, Devin, Jules) — pozri `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                |
| `combos/`                                | Kombinované rozlíšenie + pomocníkov na zmenu poradia                                                                                                                                                                                                                                                                             |
| `audit/`                                 | Pomocníci informačného kanála aktivity: `highLevelActions.ts` (zoznam povolených + `isHighLevelAction()`), `activityIcons.ts` (mapa akcie → icon/verb ), `timeline.ts` (groupByDay/relativeTime) — pozri `docs/architecture/MONITORING_SECTIONS.md`                                                                              |
| `compliance/`                            | Protokol auditu audit poskytovateľa + — pozri `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                      |
| `compression/`                           | Lepidlo na kompresné motory (motory žijú v `open-sse/services/compression/`)                                                                                                                                                                                                                                                     |
| `config/`                                | Pomocníci pri konfigurácii za behu                                                                                                                                                                                                                                                                                               |
| `db/`                                    | 120 + doménových DB modulov + 168 migrácií (pre SQLite vždy prejdite sem)                                                                                                                                                                                                                                                        |
| `quota/`                                 | Nástroj na zdieľanie kvót: `dimensions.ts` (types/Zod), `types.ts` ( rozhranie QuotaStore ), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` – pozri `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Klient katalógu voľného modelu radaru: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — pozri `docs/frameworks/RADAR.md`                                                                                                                                             |
| `display/`                               | Pomocníci pri formátovaní UI (cena, latencia atď.)                                                                                                                                                                                                                                                                               |
| `embeddings/`                            | Pomocníci služby vkladania                                                                                                                                                                                                                                                                                                       |
| `env/`                                   | Analýza + premennej env                                                                                                                                                                                                                                                                                                          |
| `evals/`                                 | Eval framework (suites, runner, runtime) — pozri `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                                      |
| `guardrails/`                            | PII masker, rýchla injekcia, most videnia — pozri `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                                  |
| `jobs/`                                  | Úlohy na pozadí (ako cron)                                                                                                                                                                                                                                                                                                       |
| `memory/`                                | Konverzačná pamäť (SQLite FTS5 + sqlite-vec hybrid RRF + Qdrant vrstva 2) – pozri `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                    |
| `memory/embedding/`                      | Vrstva na vkladanie z viacerých zdrojov: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plán 21)                                                                                                                                                                         |
| `memory/vectorStore.ts`                  | obal sqlite-vec v0.1.9 — KNN brute-force + hybrid RRF ( vektor FTS5 +, k = 60). Lazy-init, ladne degraduje, keď sqlite-vec nie je k dispozícii. (plán 21)                                                                                                                                                                        |
| `memory/reindex.ts`                      | `runReindexBatch()` — spracováva spomienky so `needs_reindex=1` v pozadí; volaná `POST /api/memory/reindex` a lazy-backfill path. (plán 21)                                                                                                                                                                                      |
| `monitoring/`                            | Zdravotné kontroly, emisie metrík                                                                                                                                                                                                                                                                                                |
| `oauth/`                                 | toky OAuth/import pre 22 modulov poskytovateľov (agy, antigravity, claude, cline, codebuddy-cn, codex, kurzor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, xenoquder, open zed-hosted, zed)                                                                           |
| `plugins/`                               | Register zásuvných modulov                                                                                                                                                                                                                                                                                                       |
| `promptCache/`                           | Antropické zarážky rýchlej vyrovnávacej pamäte                                                                                                                                                                                                                                                                                   |
| `skills/`                                | Rámec zručností (vstavaný trh + + SkillsSH) – pozri `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                                  |
| `playground/`                            | Zdieľaní pomocníci Playground Studio: `codeExport.ts` (generátor curl/Python/TS ), `promptImprover.ts` (staviteľ meta-výzvy), `streamMetrics.ts` (čistý TTFT/TPS), `types.ts` (tabuľka cien) — pozri `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                      |
| `webhookDispatcher.ts`                   | HMAC webhook delivery — pozri `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                      |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Správcovia tunelov – pozri `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                           |
| `cloudSync.ts`, `initCloudSync.ts`       | Voliteľná cloudová synchronizácia stavu                                                                                                                                                                                                                                                                                          |
| `localDb.ts`                             | Sud reexportu pre db moduly (bez logiky – iba reexport)                                                                                                                                                                                                                                                                          |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Žiadosť o ukladanie do vyrovnávacej pamäte + idempotency                                                                                                                                                                                                                                                                         |
| (~ 30 ďalších súborov najvyššej úrovne)  | Špecializovaní pomocníci (logEnv, modelsDevSync, piiSanitizer atď.)                                                                                                                                                                                                                                                              |

### `src/lib/db/` — Databáza (147 modulov + 208 migrácií)

| Subdir                    | Účel                                                                                                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `db/core.ts`              | `getDbInstance()` singleton s žurnálovaním WAL                                                                                                                                                   |
| `db/migrations/`          | Verzované súbory SQL (idempotentné, transakčné). `073_memory_vec.sql` pridá stĺpec `memory_vec_meta` + `needs_reindex` (plán 21).                                                                |
| `db/playgroundPresets.ts` | modul CRUD pre predvoľby Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)                        |
| `db/memoryVec.ts`         | CRUD pre `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` atď. (plán 21)                                       |
| `db/<domain>.ts`          | Jeden modul na doménu: poskytovatelia, kombá, apiKeys, používatelia, relácie, využitie, protokol auditu, webhooky, zručnosti, memory_entries, cloud_agent_tasks, evals* \* , logická_pamät' atď. |

### `src/domain/`

| modul                  | Účel                                                    |
| ---------------------- | ------------------------------------------------------- |
| `policy.ts`            | Nástroj politiky                                        |
| `fallbackPolicy.ts`    | Záložný rozhodovací strom                               |
| `costRules.ts`         | Pravidlá výpočtu nákladov                               |
| `lockoutPolicy.ts`     | politika blokovania Model/connection                    |
| `tagRouter.ts`         | Smerovanie založené na značkách                         |
| `comboResolver.ts`     | Kombinované rozlíšenie (používané kombinovaným motorom) |
| `modelAvailability.ts` | Kontrola dostupnosti podľa modelu                       |
| `assessment/`          | Hodnotenie modelu (1. fáza RFC-AUTO-ASSESSMENT)         |

### `src/server/`

| modul    | Účel                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| `authz/` | Autorizačný kanál: `classify` → `policies` → `enforce` – pozri `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | konfigurácia CORS                                                                                 |
| `auth/`  | Middleware relácie                                                                                |

### `src/shared/`

| modul                            | Účel                                                                                                      |
| -------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `components/`                    | Komponent palubnej dosky API: adaptéry cez `packages/ui-kit` – pozri `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: názvy ikon používané obrazovkami → komponenty Lucide (`<Icon>`)                               |
| `constants/providers.ts`         | **377 poskytovateľov** s overením Zod (zdroj pravdy)                                                      |
| `constants/cliTools.ts`          | Externý register nástrojov CLI                                                                            |
| `constants/routingStrategies.ts` | **20 stratégií smerovania** s prioritami                                                                  |
| `constants/publicApiRoutes.ts`   | Trasy, ktoré vyžadujú overenie nositeľa (v porovnaní so správou).                                         |
| `constants/upstreamHeaders.ts`   | Zoznam odmietnutých hlavičiek pre upstream požiadavky                                                     |
| `validation/schemas.ts`          | schémy ~ 80 Zod (jediný zdroj pravdy pre zmluvy API )                                                     |
| `validation/helpers.ts`          | Pomocníci na overenie Zod (`validateBody` atď.)                                                           |
| `types/`                         | Zdieľané typy TS                                                                                          |
| `contracts/`                     | Verejné zmluvy API (spotrebované `files:` v `package.json`)                                               |
| `utils/circuitBreaker.ts`        | Istič poskytovateľa (pozri `docs/architecture/RESILIENCE_GUIDE.md`)                                       |
| `utils/apiAuth.ts`               | validácia kľúča API, kontrola rozsahu                                                                     |
| `utils/fetchTimeout.ts`          | Timeout/abort wrappery pre upstream načítanie                                                             |
| `utils/releaseNotes.ts`          | Uzavretý analyzátor oznámení v2/legacy, lokalizácia a zrušenie ID                                         |

---

## `open-sse/` — Pracovný priestor streamovacieho jadra

Samostatný pracovný priestor npm (`@omniroute/open-sse`). Spracúva požiadavky a vykonávanie poskytovateľov.

```
open-sse/
├── handlers/            # 16 súborov (12 obslužných modulov + 4 pomocné moduly): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search atď.
├── executors/           # 150 vykonávacích modulov (triedy rozširujúce BaseExecutor + pomocné moduly pre jednotlivých poskytovateľov)
├── translator/          # Konvertory formátov (9 pre požiadavky, 9 pre odpovede, 9 pomocných)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ modulov služieb (combo, accountFallback, autoCombo, reasoningCache, skrytý režim claude code/chatgpt, modelDeprecation, taskAwareRouter, workflowFSM atď.)
├── mcp-server/          # Server MCP (110 nástrojov, 3 transporty, 33 rozsahov)
├── config/              # Registre poskytovateľov/modelov, konfigurácia hlavičiek, aliasy modelov
├── utils/               # Klient TLS, proxy načítavanie/dispečer, sieťové pomocné moduly
├── index.ts             # Vstupný bod pracovného priestoru
├── package.json         # Manifest pracovného priestoru
├── tsconfig.json        # Konfigurácia TS pracovného priestoru
└── types.d.ts           # Deklarácie typov pracovného priestoru
```

### `open-sse/mcp-server/`

| Cesta                       | Účel                                                                                   |
| --------------------------- | -------------------------------------------------------------------------------------- |
| `server.ts`                 | Životný cyklus servera MCP (transporty stdio + HTTP)                                   |
| `httpTransport.ts`          | Streamovateľné transporty HTTP + SSE (`/api/mcp/sse`, `/api/mcp/stream`)               |
| `audit.ts`                  | Zaznamenávanie auditu do tabuľky `mcp_tool_audit`                                      |
| `scopeEnforcement.ts`       | Overovanie rozsahu pre jednotlivé nástroje                                             |
| `runtimeHeartbeat.ts`       | Signál o stave do `DATA_DIR/runtime/mcp-heartbeat.json`                                |
| `descriptionCompressor.ts`  | Komprimuje metadáta opisov nástrojov s cieľom šetriť kontext                           |
| `schemas/tools.ts`          | 36 základných definícií nástrojov + rozsahy                                            |
| `tools/advancedTools.ts`    | Implementácie pokročilých nástrojov                                                    |
| `tools/memoryTools.ts`      | 3 pamäťové nástroje (vyhľadanie/pridanie/vymazanie)                                    |
| `tools/skillTools.ts`       | 4 nástroje zručností (zoznam/povolenie/vykonanie/vykonania)                            |
| `tools/compressionTools.ts` | 5 kompresných nástrojov                                                                |
| `README.md`                 | Interný súbor README servera MCP (krížovo prepojený z `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — Pracovné priestory

| Cesta                    | Účel                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — lokálne zahrnutá snímka Keak CI UI Kit (`private`, `UNLICENSED`), používaná ako zdrojový kód (bez zostavenia). `UPSTREAM.md` pripína nadradený commit a zaznamenáva licenčné oprávnenie; `PATCHES.md` uvádza lokálne záplaty (žiadne); `src/` sa synchronizuje iba pomocou `scripts/dev/sync-ui-kit.sh` a kontroluje príkazom `npm run check:ui-kit-snapshot`. Pozrite si `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — voliteľná služba fondu prehliadačov (čet založený na CloakBrowser a Playwright)                                                                                                                                                                                                                                                                                                                          |

---

## `electron/` — Desktopový wrapper

| Súbor            | Účel                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| `main.js`        | Hlavný proces Electronu (BrowserWindow, vložený server Next.js, systémová lišta, automatická aktualizácia) |
| `preload.js`     | Most IPC (contextBridge → `window.omniroute`)                                                              |
| `package.json`   | Konfigurácia electron-builder + Electron 41 + závislosti electron-builder 26.10                            |
| `assets/`        | Ikony aplikácie (Windows .ico, macOS .icns, Linux .png)                                                    |
| `dist-electron/` | Výstup zostavenia (ignorovaný systémom Git)                                                                |
| `types.d.ts`     | Deklarácie typov pre most vykresľovacieho procesu                                                          |
| `README.md`      | Interný súbor README pre Electron (pozrite si aj `docs/guides/ELECTRON_GUIDE.md`)                          |

---

## `bin/` — CLI

| Súbor                                                                                                       | Účel                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Hlavný vstupný bod CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` atď. |
| `reset-password.mjs`                                                                                        | Samostatné CLI na obnovenie hesla                                                                                                 |
| `cli/commands/setup.mjs`                                                                                    | Interaktívny + neinteraktívny sprievodca nastavením                                                                               |
| `cli/commands/doctor.mjs`                                                                                   | Diagnostika stavu systému (8+ kontrol)                                                                                            |
| `cli/commands/providers.mjs`                                                                                | Zoznam/testovanie/overenie poskytovateľov                                                                                         |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Pomocné moduly CLI                                                                                                                |
| `cli/tray/tray.ts`                                                                                          | Integrácia systémovej lišty (multiplatformová: NotifyIcon vo Windowse, systray2 v macOS/Linux)                                    |
| `cli/tray/tray.ps1`                                                                                         | Backend NotifyIcon v PowerShelli (Windows, žiadne nové binárne súbory)                                                            |
| `cli/tray/autostart.ts`                                                                                     | Multiplatformové automatické spúšťanie (LaunchAgent / .desktop / register)                                                        |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5-krokový reťazec rozpoznania ovládača SQLite (pribalený → runtime → oneskorená inštalácia → node:sqlite → sql.js)                |
| `cli/runtime/magicBytes.mjs`                                                                                | Overenie magických bajtov binárneho súboru (ELF / Mach-O / Mach-O fat / PE)                                                       |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — vopred rozpozná ovládače pri postinstall / prvom spustení                                                    |
| `nodeRuntimeSupport.mjs`                                                                                    | Overenie podporovanej verzie Node.js pri inštalácii                                                                               |

---

## `skills/` — Verejné zručnosti agentov

| Súbor                        | Účel                                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifestov zručností pre externých agentov AI (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Skripty na zostavenie a kontrolu

| Skript                              | Účel                                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Spúšťač vývojového/produkčného režimu s načítaním premenných prostredia                                 |
| `build-next-isolated.mjs`           | Samostatné zostavenie (samostatný režim Next.js 16)                                                     |
| `prepublish.ts`                     | Príprava balíka pred `npm pack`                                                                         |
| `postinstall.mjs`                   | Automatické vytvorenie `.env` zo súboru `.env.example` pri prvej inštalácii                             |
| `sync-env.mjs`                      | Opätovná synchronizácia kľúčov v `.env` so súborom `.env.example`                                       |
| `check-cycles.mjs`                  | Detekcia cyklických závislostí                                                                          |
| `check-route-validation.mjs`        | Overenie, že všetky trasy API používajú validáciu Zod                                                   |
| `check-t11-any-budget.mjs`          | Vynútenie explicitného limitu použitia `any` pre každý súbor                                            |
| `check-docs-sync.mjs`               | Overenie synchronizácie verzií dokumentácie (existujúca kontrola pred potvrdením zmien)                 |
| **`check-env-doc-sync.mjs`**        | NOVÉ: krížová kontrola premenných prostredia v kóde, `.env.example` a `ENVIRONMENT.md`                  |
| **`check-docs-counts-sync.mjs`**    | NOVÉ: overenie, že počty (vykonávacie moduly, stratégie, OAuth, zručnosti A2A) zodpovedajú dokumentácii |
| **`check-deprecated-versions.mjs`** | NOVÉ: označenie zastaraných verzií/dátumov v dokumentácii                                               |
| `check-supported-node-runtime.ts`   | Overenie, či je aktuálna verzia Node podporovaná                                                        |
| `check-pr-test-policy.mjs`          | Vynútenie pravidla „testy sú povinné“ pri zmenách produkčného kódu                                      |
| **`gen-provider-reference.ts`**     | NOVÉ: automatické generovanie `docs/reference/PROVIDER_REFERENCE.md` z katalógu                         |
| `i18n/generate-multilang.mjs`       | Preklad reťazcov používateľského rozhrania a dokumentácie pomocou Google Translate                      |
| `i18n_autotranslate.py`             | Proces prekladu dokumentácie založený na LLM                                                            |
| `validate_translation.py`           | Overenie prekladu pre jednotlivé jazykové verzie                                                        |
| `check_translations.py`             | Kontrola kľúčov i18n na strane kódu                                                                     |
| `run-playwright-tests.mjs`          | Spúšťač E2E testov Playwright                                                                           |
| `run-protocol-clients-tests.mjs`    | Spúšťač E2E testov MCP/A2A                                                                              |
| `run-ecosystem-tests.mjs`           | Testy ekosystému (integrácie poskytovateľov)                                                            |
| `test-report-summary.mjs`           | Generovanie súhrnu pokrytia vo formáte Markdown                                                         |
| `smoke-electron-packaged.mjs`       | Základný test zabaleného zostavenia Electron                                                            |
| `native-binary-compat.mjs`          | Overenie, že natívne závislosti (`better-sqlite3`) zodpovedajú verzii Node v Electrone                  |
| `validate-pack-artifact.ts`         | Overenie výstupu balenia npm                                                                            |
| `responses-ws-proxy.mjs`            | Most WebSocket pre rozhranie Codex Responses API                                                        |
| `v1-ws-bridge.mjs`                  | Most WebSocket pre koncový bod `/api/v1/ws`                                                             |
| `standalone-server-ws.mjs`          | Spúšťač samostatného servera WS                                                                         |
| `system-info.mjs`                   | Výpis informácií o systéme a runtime prostredí na účely podpory                                         |
| `healthcheck.mjs`                   | Jednorazová kontrola stavu (používaná príkazom Docker HEALTHCHECK)                                      |
| `uninstall.mjs`                     | Skript na čistú odinštaláciu                                                                            |
| `dev/sync-ui-kit.sh`                | Kopírovanie `src/` súpravy CI UI Kit z pripnutého commitu do `packages/ui-kit/src`                      |
| `check/check-ui-kit-snapshot.mjs`   | Kontrola pred commitom: `packages/ui-kit/src` zodpovedá pripnutému nadradenému commitu                  |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — používané názvy ikon, ktoré `ICON_MAP` nemapuje                                |
| `dev/codemod-material-icons.mjs`    | Prepis doslovných prvkov span Material Symbols na `<Icon>` (nástroje na migráciu)                       |

---

## `docs/` — Verejná dokumentácia (7 koreňových súborov + 17 podadresárov)

### Sprievodcovia na najvyššej úrovni

| Doc                         | Účel                                                                                            |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Architektúra na vysokej úrovni, mapa subsystému, povrch palubnej dosky                          |
| `CODEBASE_DOCUMENTATION.md` | Technická referencia: adresáre, moduly, konvencie                                               |
| `FEATURES.md`               | Matica funkcií so zvýrazneniami verzie 3.8                                                      |
| `USER_GUIDE.md`             | Príručka pre koncového používateľa (nastavenia, modely, kombá, CLIs, audio atď.)                |
| `API_REFERENCE.md`          | Referencia koncového bodu API s modelom overenia                                                |
| `openapi.yaml`              | špecifikácia OpenAPI 3.0 (121 ciest)                                                            |
| `SETUP_GUIDE.md`            | Inštalačné metódy (npm, npx, Docker, Electron, Termux, zdroj)                                   |
| `ENVIRONMENT.md`            | Všetky env vars (~ 800 zdokumentované, ~ 3 050 riadkov `.env.example`)                          |
| `TROUBLESHOOTING.md`        | Bežné chyby Známe problémy + v3.8.0                                                             |
| `RELEASE_CHECKLIST.md`      | Úplný tok uvoľnenia (zručnosti, husky, konvenčné odovzdania, nasadenie)                         |
| `COVERAGE_PLAN.md`          | Ciele pokrytia a aktuálny stav                                                                  |
| `FREE_TIERS.md`             | Vybraní poskytovatelia bezplatnej úrovne (48 + zadarmo + 11 OAuth)                              |
| `CLI-TOOLS.md`              | Externé integrácie CLI + Interné OmniRoute CLI                                                  |
| `I18N.md`                   | architektúra i18n, pridanie jazyka, 67 miestnych nastavení                                      |
| `UNINSTALL.md`              | Čisté kroky odinštalovania                                                                      |
| `PROVIDER_REFERENCE.md`     | **Automaticky generované** katalóg 377 poskytovateľov (regen: `npm run gen:provider-reference`) |

### Subsystém hĺbkové ponory

| Doc                                        | Účel                                                                               |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                            | server MCP : 110 nástrojov, 3 prenosy, 33 rozsahov, koncové body REST              |
| `A2A-SERVER.md`                            | A2A v0.3: JSON-RPC, 6 zručností, pomocníci REST, karta agenta                      |
| `AGENT_PROTOCOLS_GUIDE.md`                 | Jednotný sprievodca: A2A vs ACP vs Cloud Agents                                    |
| `CLOUD_AGENT.md`                           | orchestrácia Codex Cloud / Devin / Jules                                           |
| `SKILLS.md`                                | Rámec zručností (vstavaný + marketplace + SkillsSH + sandbox)                      |
| `RADAR.md`                                 | Prekrytie katalógu bezplatného modelu radaru (`RADAR_ENABLED`, predvolene vypnuté) |
| `MEMORY.md`                                | Pamäťový systém (SQLite FTS5 + Qdrant)                                             |
| `EVALS.md`                                 | Eval framework (sady, runy, rubriky)                                               |
| `GUARDRAILS.md`                            | PII masker, rýchla injekcia, most videnia                                          |
| `COMPLIANCE.md`                            | Audit log, uchovávanie, noLog opt-out                                              |
| `WEBHOOKS.md`                              | Doručenie webhooku podpísaného HMAC                                                |
| `REASONING_REPLAY.md`                      | Hybridná vyrovnávacia pamäť memory/SQLite pre `reasoning_content`                  |
| `AUTHZ_GUIDE.md`                           | Autorizačný kanál (`classify` → `policies` → `enforce`)                            |
| `RESILIENCE_GUIDE.md`                      | Istič + cooldown + model lockout                                                   |
| `docs/security/STEALTH_GUIDE.md` (iba git) | TLS fingerprinting (JA3/JA4), Claude Code CCH, MITM cert                           |
| `AUTO-COMBO.md`                            | Auto Combo engine (16-faktorové hodnotenie, 6 balíkov režimov, virtuálna továreň)  |

### Kompresia

| Doc                             | Účel                                            |
| ------------------------------- | ----------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Prehľad kompresných režimov + roadmap           |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK motory, registračná zmluva        |
| `COMPRESSION_RULES_FORMAT.md`   | Caveman rule pack JSON schéma                   |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventár balíka pravidiel pre jednotlivé jazyky |
| `RTK_COMPRESSION.md`            | deklaratívny kanál RTK (56 filtrov)             |

### Nasadenie

| Doc                          | Účel                                                               |
| ---------------------------- | ------------------------------------------------------------------ |
| `DOCKER_GUIDE.md`            | zostava Docker, profily (base/cli/host/cliproxyapi), sajdkár Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Všeobecné nasadenie VM/VPS (Ubuntu/Debian + nginx + systemd)       |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Nasadenie Fly.io (momentálne iba v čínštine)                       |
| `TERMUX_GUIDE.md`            | Android bezhlavo cez Termux                                        |
| `PWA_GUIDE.md`               | Servisný pracovník + na inštaláciu progresívnej webovej aplikácie  |
| `ELECTRON_GUIDE.md`          | Vytvorenie desktopovej aplikácie + sign + distribute               |
| `TUNNELS_GUIDE.md`           | Lievik + ngrok + Tailscale                                         |
| `PROXY_GUIDE.md`             | 4-úrovňový outbound proxy + 1proxy marketplace                     |

### Podadresáre

| Subdir                | Účel                                                                                                                                                                                               |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokalizované preklady dokumentov (41 jazykov)                                                                                                                                                      |
| `docs/screenshots/`   | Obrazové podklady pre sprievodcov                                                                                                                                                                  |
| `_tasks/superpowers/` | Plans/specs od superschopností (`writing-plans`/`brainstorming`) + research — izolované, oddelene verzované repo, gitignované hlavným stromom. Pozri CLAUDE.md → "Plánovanie a výskum artefaktov". |

---

## `tests/` — Testovacie sady

| Podadresár                           | Typ                                                 | Nástroj na spúšťanie testov                            |
| ------------------------------------ | --------------------------------------------------- | ------------------------------------------------------ |
| `tests/unit/`                        | Jednotkové testy (~4 800 súborov, najrýchlejšie)    | Natívny nástroj Node na spúšťanie testov               |
| `tests/integration/`                 | Integračné testy viacerých modulov + DB             | Natívny nástroj Node na spúšťanie testov (súbežnosť 1) |
| `tests/e2e/`                         | E2E používateľského rozhrania + pracovných postupov | Playwright                                             |
| `tests/e2e/protocol-clients.test.ts` | E2E MCP + A2A so skutočnými klientmi                | Vlastní klienti protokolov                             |
| `tests/e2e/ecosystem.test.ts`        | Integrácia poskytovateľov (využíva sieť)            | Natívny nástroj Node na spúšťanie testov               |

---

## `public/` — Statické aktíva

| Cesta               | Účel                                                                   |
| ------------------- | ---------------------------------------------------------------------- |
| `public/` (koreň)   | Favikony, robots.txt, manifest, service worker, marketingové obrázky   |
| `public/providers/` | Logá poskytovateľov vo formáte PNG/SVG (používané na ovládacom paneli) |

---

## `config/` — Statické konfigurácie + stav kontroly kvality

Dodávané konfiguračné šablóny spolu s potvrdenými východiskovými hodnotami kontroly kvality
(presunuté sem z koreňového adresára repozitára vo v3.8.26, aby koreň zostal prehľadný).

| Cesta                                         | Účel                                                                                                      |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Zoznam lokalizácií + metadáta (kanonický zdroj počtu 42 lokalizácií)                                      |
| `config/i18n-schema.json`                     | Schéma JSON overujúca `i18n.json`                                                                         |
| `config/payloadRules.json`                    | Pravidlá sanitizácie dátovej časti z nadradeného zdroja                                                   |
| `config/quality/quality-baseline.json`        | Viacmetriková východisková hodnota s postupným sprísňovaním (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Pevná východisková hodnota komplexnosti ESLint (`check-complexity.mjs`)                                   |
| `config/quality/duplication-baseline.json`    | Pevná východisková hodnota duplicity jscpd (`check-duplication.mjs`)                                      |
| `config/quality/file-size-baseline.json`      | Pevná východisková hodnota veľkosti jednotlivých súborov (`check-file-size.mjs`)                          |
| `config/quality/test-discovery-baseline.json` | Pevná východisková hodnota osamotených testov (`check-test-discovery.mjs`)                                |
| `config/quality/dependency-allowlist.json`    | Zoznam povolených schválených závislostí (`check-deps.mjs`)                                               |
| `config/quality/.license-allowlist.json`      | Zoznam povolených licencií SPDX (`check-licenses.mjs`)                                                    |
| `config/quality/quality-metrics.json`         | Dočasné zhromaždené metriky (generované pomocou `collect-metrics.mjs`; **ignorované Gitom**)              |

---

## `.github/` — Integrácia so službou GitHub

| Cesta                              | Účel                                                                               |
| ---------------------------------- | ---------------------------------------------------------------------------------- |
| `.github/workflows/`               | Pracovné postupy CI/CD služby GitHub Actions (lint, testovanie, pokrytie, vydanie) |
| `.github/ISSUE_TEMPLATE/`          | Šablóny hlásení chýb a požiadaviek na funkcie                                      |
| `.github/pull_request_template.md` | Šablóna PR                                                                         |
| `.github/dependabot.yml`           | Konfigurácia aktualizácií závislostí                                               |

---

## `.husky/` — Hooky systému Git

| Súbor        | Účel                                                                     |
| ------------ | ------------------------------------------------------------------------ |
| `pre-commit` | Spúšťa `lint-staged + check-docs-sync + check:any-budget:t11`            |
| `pre-push`   | Aktuálne vypnuté (zakomentované). Spustite `npm run test:unit` manuálne. |
| `_/`         | Interné súčasti Husky                                                    |

---

## `.claude/` — Lomkové príkazy Claude Code

| Súbor                                               | Účel                                                            |
| --------------------------------------------------- | --------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — zvýšenie verzie + automatický zoznam zmien |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — kompletný pracovný postup vydania      |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Nasadenie na VPS                                                |
| `commands/capture-release-evidences-cc.md`          | Zaznamenanie nových funkcií v prehliadači vo formáte WebP       |
| `commands/review-{prs,discussions}-cc.md`           | Triedenie PR a diskusií na GitHube                              |
| `commands/{review-issues,implement-features}-cc.md` | Pracovné postupy pre hlásenia                                   |
| `settings.local.json`                               | Nastavenia Claude Code špecifické pre projekt                   |

---

## `.agents/` — Všeobecné pracovné postupy agentov (Codex / Cursor / atď.)

| Cesta                    | Účel                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `workflows/*-ag.md`      | 11 definícií pracovných postupov (kópia `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definícií zručností s poznámkami k vykonávaniu v Codexe    |

> **Poznámka:** Pracovné postupy a príkazy sú aktuálne bajt po bajte identické. Ak má `.agents/` cieliť na iné behové prostredie agenta (Codex), varianty sa musia zmysluplne odlišovať.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Mimo stromu

Tieto adresáre s podčiarkovníkom na začiatku obsahujú obsah, ktorý nie je súčasťou distribúcie:

- **`_ideia/`** — poznámky k návrhu (kategórie defer / notfit / viable)
- **`_mono_repo/`** — historické podprojekty (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — klony súvisiacich projektov OSS určené len na čítanie (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api atď.) na krížové porovnávanie počas vývoja
- **`_tasks/`** — súbory na sledovanie úloh pre jednotlivé vydania (neformálne)

Nie sú zahrnuté vo výstupe `npm pack`. Pozrite si `.npmignore`.

---

## Generované / ignorované systémom Git

| Cesta                  | Účel                                 |
| ---------------------- | ------------------------------------ |
| `node_modules/`        | závislosti npm                       |
| `.next/`               | výstup zostavenia Next.js            |
| `coverage/`            | správy o pokrytí c8                  |
| `logs/`                | prevádzkové protokoly                |
| `package/`             | prípravný adresár balíka npm         |
| `.playwright-mcp/`     | testovacie artefakty Playwright MCP  |
| `.issues/`             | lokálna vyrovnávacia pamäť problémov |
| `tsconfig.tsbuildinfo` | inkrementálna vyrovnávacia pamäť TS  |

---

## Tipy na orientáciu

- **Ste nový prispievateľ?** Prečítajte si `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Pridávate poskytovateľa?** Postupujte podľa `docs/architecture/ARCHITECTURE.md § Adding a New Provider` a porovnajte s `docs/reference/PROVIDER_REFERENCE.md`.
- **Pridávate trasu?** Pozrite si `docs/architecture/ARCHITECTURE.md § Adding a New API Route` a `src/shared/validation/schemas.ts`.
- **Pridávate nástroj MCP?** Pozrite si `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Pridávate zručnosť A2A?** Pozrite si `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Spúšťate lokálne?** Pozrite si `docs/guides/SETUP_GUIDE.md`.
- **Nasadzujete?** Pozrite si `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Vydávate novú verziu?** Pozrite si `docs/ops/RELEASE_CHECKLIST.md` (a zručnosť Claude Code `/generate-release-cc`).
