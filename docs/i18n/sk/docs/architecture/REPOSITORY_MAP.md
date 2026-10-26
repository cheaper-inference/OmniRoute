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
├── app/                 # App Router (stránky + trasy API + stavové stránky + vstupná stránka)
├── lib/                 # Základné knižnice / doménové moduly (80 podadresárov + ~70 súborov najvyššej úrovne)
├── domain/              # Čistá doménová logika (modul pravidiel, záložný mechanizmus, náklady, uzamknutie, comboResolver, vyhodnotenie)
├── server/              # Moduly určené iba pre server (reťazec authz, cors, middleware overovania) — nemožno importovať z klienta
├── shared/              # Bezpečne zdieľané medzi serverom a klientom (konštanty, typy, validácia, kontrakty, pomocné nástroje)
├── i18n/                # Konfigurácia next-intl + JSON so správami pre jednotlivé jazyky (67 jazykov)
├── middleware/          # Middleware Next.js (obohatenie požiadaviek, detekcia jazyka)
├── mitm/                # Jadro MITM proxy: generovanie/inštalácia certifikátov, obslužné moduly, ciele, inšpektor, masky, priame preposielanie
│   ├── handlers/        # 9 tried obslužných modulov agentov IDE rozširujúcich MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Vrstva zachytávania prevádzky: buffer (kruhový buffer v pamäti), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Prepojovacia vrstva adaptérov modelov (staršia kompatibilná vrstva)
├── scripts/             # Interné skripty údržby (napr. backfillAggregation)
├── sse/                 # Staršie obslužné moduly/služby SSE (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Staršie úložisko v pamäti (postupne nahrádzané src/lib/db)
├── types/               # Zdieľané súbory typov TS
├── instrumentation.ts   # Telemetrický hook Next.js (prehliadač + edge)
├── instrumentation-node.ts  # Inštrumentácia určená iba pre Node
└── proxy.ts             # Vstupná kompatibilná vrstva HTTP proxy
```

### `src/app/` — App Router (Next.js 16)

| Cesta                                                                        | Účel                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Verejné API kompatibilné s OpenAI (~25 podtrás: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers atď.)                                                                                                                               |
| `app/api/v1beta/`                                                            | Koncové body API v štýle Gemini                                                                                                                                                                                                                                                                                               |
| `app/api/playground/`                                                        | Trasy Playground Studio: `improve-prompt/` (POST — prepisovanie promptov pomocou LLM), `presets/` (GET zoznam / POST vytvorenie), `presets/[id]/` (GET / PUT / DELETE) — pozrite si `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                    |
| `app/api/` (mimo v1)                                                         | Trasy na správu a administráciu (~60 adresárov: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools atď.)                                                                                                                                          |
| `app/api/tools/agent-bridge/`                                                | REST API AgentBridge — 12 trás (ovládanie servera, stav/DNS/mapovania agenta, obchádzanie, certifikát, upstream CA). LOCAL_ONLY + SPAWN_CAPABLE. Pozrite si `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                              |
| `app/api/tools/traffic-inspector/`                                           | REST + WS API nástroja Traffic Inspector — viac ako 16 trás (požiadavky, relácie, hostitelia, režimy zachytávania, export, ws). LOCAL_ONLY + SPAWN_CAPABLE. Pozrite si `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                             |
| `app/a2a/`                                                                   | Vstupný bod A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                                    |
| `app/.well-known/agent.json/`                                                | Karta agenta A2A (zisťovanie)                                                                                                                                                                                                                                                                                                 |
| `app/(dashboard)/dashboard/`                                                 | Stránky používateľského rozhrania ovládacieho panela (viac ako 50 sekcií, ~118 súborov page.tsx: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity atď.)                                                                                                     |
| `app/(dashboard)/dashboard/search-tools/`                                    | Používateľské rozhranie Search Tools Studio (3 karty: vyhľadávanie/extrakcia/porovnanie + SearchConceptCard + ProviderCatalog) — pozrite si `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                          |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plán 21): `page.tsx` (prostredie s 3 kartami), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Stránka ovládacieho panela AgentBridge — karta servera, 9 kariet agentov, sprievodca nastavením, mapovanie modelov, zoznam obchádzania. i18n PT-BR + EN. Pozrite si `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                         |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Stránka ovládacieho panela Traffic Inspector — rozdelené zobrazenie DevTools, 7 kariet podrobností, 4 prepínače režimu zachytávania, záznamník relácií, farebné rozlíšenie kontextu. i18n PT-BR + EN. Pozrite si `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                      |
| `app/(dashboard)/dashboard/activity/`                                        | Stránka kanála aktivity (skupina B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — pozri `docs/architecture/MONITORING_SECTIONS.md`                                                                                                               |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Stránka zdieľania kvót (skupina B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                               |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Stránka konfigurácie plánu poskytovateľa (skupina B): `page.tsx` + `ProviderPlanConfigClient.tsx` — prepísanie dimenzií kvót pre jednotlivé pripojenia                                                                                                                                                                        |
| `app/docs/`                                                                  | Vstavaný prehliadač dokumentácie (vykresľuje `docs/*.md`)                                                                                                                                                                                                                                                                     |
| `app/landing/`                                                               | Marketingová vstupná stránka                                                                                                                                                                                                                                                                                                  |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Stránky súvisiace s autentifikáciou                                                                                                                                                                                                                                                                                           |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Stránky chýb HTTP                                                                                                                                                                                                                                                                                                             |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statické/stavové stránky                                                                                                                                                                                                                                                                                                      |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Koreňové rozloženie, domovská stránka, manifest PWA, globálne CSS                                                                                                                                                                                                                                                             |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Hranice chýb                                                                                                                                                                                                                                                                                                                  |

### `src/lib/` — Základné knižnice (~50 modulov)

| Module                                   | Účel                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Správca úloh protokolu A2A, zručnosti (5), streamovanie                                                                                                                                                                                                                                                                             |
| `acp/`                                   | Register agentov CLI (lokálne zisťovanie CLI — pozrite si `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                               |
| `api/`                                   | Zdieľané pomocné nástroje API (`requireManagementAuth`, validácia)                                                                                                                                                                                                                                                                  |
| `auth/`                                  | Relácie, hašovanie hesiel, validácia tokenov                                                                                                                                                                                                                                                                                        |
| `batches/`                               | Obslužné rutiny rozhrania OpenAI Batches API                                                                                                                                                                                                                                                                                        |
| `catalog/`                               | Validácia katalógu poskytovateľov pomocou Zod + určovanie schopností                                                                                                                                                                                                                                                                |
| `cloudAgent/`                            | Cloudoví agenti (Codex Cloud, Devin, Jules) — pozrite si `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                           |
| `combos/`                                | Určovanie kombinácií + pomocné nástroje na zmenu poradia                                                                                                                                                                                                                                                                            |
| `audit/`                                 | Pomocné nástroje informačného kanála aktivít: `highLevelActions.ts` (zoznam povolených položiek + `isHighLevelAction()`), `activityIcons.ts` (mapovanie akcie → ikona/sloveso), `timeline.ts` (groupByDay/relativeTime) — pozrite si `docs/architecture/MONITORING_SECTIONS.md`                                                     |
| `compliance/`                            | Protokol auditu + audit poskytovateľov — pozrite si `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                   |
| `compression/`                           | Prepojovacia vrstva kompresného mechanizmu (mechanizmy sa nachádzajú v `open-sse/services/compression/`)                                                                                                                                                                                                                            |
| `config/`                                | Pomocné nástroje konfigurácie za behu                                                                                                                                                                                                                                                                                               |
| `db/`                                    | Viac než 120 doménových databázových modulov + 168 migrácií (pre SQLite vždy používajte túto vrstvu)                                                                                                                                                                                                                                |
| `quota/`                                 | Mechanizmus zdieľania kvót: `dimensions.ts` (typy/Zod), `types.ts` (rozhranie QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — pozrite si `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Klient katalógu bezplatných modelov Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — pozrite si `docs/frameworks/RADAR.md`                                                                                                                                       |
| `display/`                               | Pomocné funkcie na formátovanie používateľského rozhrania (náklady, latencia atď.)                                                                                                                                                                                                                                                  |
| `embeddings/`                            | Pomocné funkcie služby embeddings                                                                                                                                                                                                                                                                                                   |
| `env/`                                   | Analýza a overovanie premenných prostredia                                                                                                                                                                                                                                                                                          |
| `evals/`                                 | Framework na vyhodnocovanie (súpravy, spúšťač, behové prostredie) — pozrite si `docs/frameworks/EVALS.md`                                                                                                                                                                                                                           |
| `guardrails/`                            | Maskovanie PII, ochrana pred vložením škodlivých inštrukcií do promptu, premostenie pre obrazové vstupy — pozrite si `docs/security/GUARDRAILS.md`                                                                                                                                                                                  |
| `jobs/`                                  | Úlohy na pozadí (podobné systému cron)                                                                                                                                                                                                                                                                                              |
| `memory/`                                | Konverzačná pamäť (hybridné RRF s SQLite FTS5 + sqlite-vec a Qdrant druhej úrovne) — pozrite si `docs/frameworks/MEMORY.md`                                                                                                                                                                                                         |
| `memory/embedding/`                      | Vrstva embeddings z viacerých zdrojov: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plán 21)                                                                                                                                                                              |
| `memory/vectorStore.ts`                  | Obal pre sqlite-vec v0.1.9 — KNN hrubou silou + hybridné RRF (FTS5 + vektor, k=60). Inicializuje sa len v prípade potreby a pri nedostupnosti sqlite-vec elegantne prejde do obmedzeného režimu. (plán 21)                                                                                                                          |
| `memory/reindex.ts`                      | `runReindexBatch()` — spracúva na pozadí pamäte s `needs_reindex=1`; volá sa prostredníctvom `POST /api/memory/reindex` a cesty oneskoreného doplnenia. (plán 21)                                                                                                                                                                   |
| `monitoring/`                            | Kontroly stavu, emitovanie metrík                                                                                                                                                                                                                                                                                                   |
| `oauth/`                                 | Toky OAuth/importu pre 22 modulov poskytovateľov (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                        |
| `plugins/`                               | Register doplnkov                                                                                                                                                                                                                                                                                                                   |
| `promptCache/`                           | Body prerušenia vyrovnávacej pamäte promptov v štýle Anthropic                                                                                                                                                                                                                                                                      |
| `skills/`                                | Framework zručností (vstavané + trhovisko + SkillsSH) — pozrite si `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                      |
| `playground/`                            | Zdieľané pomocné moduly Playground Studio: `codeExport.ts` (generátor curl/Python/TS), `promptImprover.ts` (zostavovač metapromptov), `streamMetrics.ts` (čisté TTFT/TPS), `types.ts` (tabuľka cien) — pozrite si `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                            |
| `webhookDispatcher.ts`                   | Doručovanie webhookov pomocou HMAC — pozrite si `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                       |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Správcovia tunelov — pozrite si `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                         |
| `cloudSync.ts`, `initCloudSync.ts`       | Voliteľná cloudová synchronizácia stavu                                                                                                                                                                                                                                                                                             |
| `localDb.ts`                             | Súhrnný modul opätovných exportov pre databázové moduly (bez logiky — iba opätovné exporty)                                                                                                                                                                                                                                         |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Ukladanie požiadaviek do vyrovnávacej pamäte + idempotencia                                                                                                                                                                                                                                                                         |
| (~30 ďalších súborov najvyššej úrovne)   | Špecializované pomocné moduly (logEnv, modelsDevSync, piiSanitizer atď.)                                                                                                                                                                                                                                                            |

### `src/lib/db/` — Databáza (147 modulov + 208 migrácií)

| Podadresár                | Účel                                                                                                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Jediná inštancia `getDbInstance()` so žurnálovaním WAL                                                                                                                           |
| `db/migrations/`          | Verziované súbory SQL (idempotentné, transakčné). `073_memory_vec.sql` pridáva stĺpec `memory_vec_meta` + `needs_reindex` (plán 21).                                             |
| `db/playgroundPresets.ts` | Modul CRUD pre predvoľby Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)        |
| `db/memoryVec.ts`         | CRUD pre `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` atď. (plán 21)                       |
| `db/<domain>.ts`          | Jeden modul pre každú doménu: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache atď. |

### `src/domain/`

| Modul                  | Účel                                                      |
| ---------------------- | --------------------------------------------------------- |
| `policy.ts`            | Mechanizmus politík                                       |
| `fallbackPolicy.ts`    | Rozhodovací strom záložných možností                      |
| `costRules.ts`         | Pravidlá výpočtu nákladov                                 |
| `lockoutPolicy.ts`     | Politika uzamknutia modelu/pripojenia                     |
| `tagRouter.ts`         | Smerovanie na základe značiek                             |
| `comboResolver.ts`     | Rozlíšenie kombinácií (používa ho mechanizmus kombinácií) |
| `modelAvailability.ts` | Kontrola dostupnosti jednotlivých modelov                 |
| `assessment/`          | Posudzovanie modelov (1. fáza RFC-AUTO-ASSESSMENT )       |

### `src/server/`

| Modul    | Účel                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------- |
| `authz/` | Autorizačný proces: `classify` → `policies` → `enforce` — pozrite si `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Konfigurácia CORS                                                                                       |
| `auth/`  | Middleware relácie                                                                                      |

### `src/shared/`

| Modul                            | Účel                                                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `components/`                    | API komponentov ovládacieho panela: adaptéry nad `packages/ui-kit` — pozrite `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: názvy ikon používané obrazovkami → komponenty Lucide (`<Icon>`)                                       |
| `constants/providers.ts`         | **375 poskytovateľov** s validáciou Zod (zdroj pravdy)                                                            |
| `constants/cliTools.ts`          | Register externých nástrojov CLI                                                                                  |
| `constants/routingStrategies.ts` | **20 stratégií smerovania** s prioritami                                                                          |
| `constants/publicApiRoutes.ts`   | Trasy, ktoré vyžadujú autentifikáciu Bearer (na rozdiel od správcovskej autentifikácie)                           |
| `constants/upstreamHeaders.ts`   | Zoznam zakázaných hlavičiek pre upstream požiadavky                                                               |
| `validation/schemas.ts`          | ~80 schém Zod (jediný zdroj pravdy pre kontrakty API)                                                             |
| `validation/helpers.ts`          | Pomocné funkcie validácie Zod (`validateBody` atď.)                                                               |
| `types/`                         | Zdieľané typy TS                                                                                                  |
| `contracts/`                     | Verejné kontrakty API (používané prostredníctvom `files:` v súbore `package.json`)                                |
| `utils/circuitBreaker.ts`        | Istič poskytovateľa (pozrite `docs/architecture/RESILIENCE_GUIDE.md`)                                             |
| `utils/apiAuth.ts`               | Validácia kľúča API, kontrola rozsahu                                                                             |
| `utils/fetchTimeout.ts`          | Obalové funkcie pre časový limit/prerušenie upstream požiadaviek                                                  |
| `utils/releaseNotes.ts`          | Parser uzavretých oznámení v2/starších verzií, lokalizácia a odmietnutie podľa ID                                 |

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

### Hlavné príručky

| Dokument                    | Účel                                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Architektúra na vysokej úrovni, mapa subsystémov, rozhranie ovládacieho panela                        |
| `CODEBASE_DOCUMENTATION.md` | Technická referencia: adresáre, moduly, konvencie                                                     |
| `FEATURES.md`               | Matica funkcií s hlavnými novinkami verzie v3.8                                                       |
| `USER_GUIDE.md`             | Používateľská príručka (nastavenie, modely, kombinácie, CLI, zvuk atď.)                               |
| `API_REFERENCE.md`          | Referencia koncových bodov API s modelom autentifikácie                                               |
| `openapi.yaml`              | Špecifikácia OpenAPI 3.0 (121 ciest)                                                                  |
| `SETUP_GUIDE.md`            | Spôsoby inštalácie (npm, npx, Docker, Electron, Termux, zdrojový kód)                                 |
| `ENVIRONMENT.md`            | Všetky premenné prostredia (~800 zdokumentovaných, ~3 050 riadkov v `.env.example`)                   |
| `TROUBLESHOOTING.md`        | Bežné chyby + známe problémy verzie v3.8.0                                                            |
| `RELEASE_CHECKLIST.md`      | Kompletný proces vydania (zručnosti, husky, konvenčné commity, nasadenie)                             |
| `COVERAGE_PLAN.md`          | Ciele pokrytia a aktuálny stav                                                                        |
| `FREE_TIERS.md`             | Kurátorovaný zoznam poskytovateľov bezplatných úrovní (48+ bezplatných + 11 OAuth)                    |
| `CLI-TOOLS.md`              | Integrácie externých nástrojov CLI + interné CLI OmniRoute                                            |
| `I18N.md`                   | Architektúra i18n, pridanie jazyka, 67 lokalizácií                                                    |
| `UNINSTALL.md`              | Postup čistej odinštalácie                                                                            |
| `PROVIDER_REFERENCE.md`     | **Automaticky generovaný** katalóg 375 poskytovateľov (regenerácia: `npm run gen:provider-reference`) |

### Podrobné opisy subsystémov

| Dokument                                   | Účel                                                                                    |
| ------------------------------------------ | --------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                            | Server MCP: 110 nástrojov, 3 transporty, 33 rozsahov, koncové body REST                 |
| `A2A-SERVER.md`                            | A2A v0.3: JSON-RPC, 6 zručností, pomocné funkcie REST, karta agenta                     |
| `AGENT_PROTOCOLS_GUIDE.md`                 | Zjednotená príručka: A2A vs. ACP vs. Cloud Agents                                       |
| `CLOUD_AGENT.md`                           | Orchestrácia Codex Cloud / Devin / Jules                                                |
| `SKILLS.md`                                | Framework zručností (vstavané + trhovisko + SkillsSH + sandbox)                         |
| `RADAR.md`                                 | Prekrytie katalógu bezplatných modelov Radar (`RADAR_ENABLED`, predvolene vypnuté)      |
| `MEMORY.md`                                | Pamäťový systém (SQLite FTS5 + Qdrant)                                                  |
| `EVALS.md`                                 | Framework vyhodnocovania (súpravy, spustenia, kritériá)                                 |
| `GUARDRAILS.md`                            | Maskovanie PII, injektovanie promptov, most pre vizuálne vstupy                         |
| `COMPLIANCE.md`                            | Protokol auditu, uchovávanie, možnosť odmietnutia noLog                                 |
| `WEBHOOKS.md`                              | Doručovanie webhookov podpísaných pomocou HMAC                                          |
| `REASONING_REPLAY.md`                      | Hybridná pamäť/vyrovnávacia pamäť SQLite pre `reasoning_content`                        |
| `AUTHZ_GUIDE.md`                           | Autorizačný proces (`classify` → `policies` → `enforce`)                                |
| `RESILIENCE_GUIDE.md`                      | Istič + čakacia lehota + uzamknutie modelu                                              |
| `docs/security/STEALTH_GUIDE.md` (iba git) | Odtlačky TLS (JA3/JA4), Claude Code CCH, certifikát MITM                                |
| `AUTO-COMBO.md`                            | Nástroj Auto Combo (hodnotenie podľa 16 faktorov, 6 balíkov režimov, virtuálna továreň) |

### Kompresia

| Dokument                        | Účel                                     |
| ------------------------------- | ---------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Prehľad režimov kompresie + plán vývoja  |
| `COMPRESSION_ENGINES.md`        | Nástroje Caveman + RTK, zmluva registra  |
| `COMPRESSION_RULES_FORMAT.md`   | Schéma JSON balíka pravidiel Caveman     |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventár balíkov pravidiel podľa jazykov |
| `RTK_COMPRESSION.md`            | Deklaratívny proces RTK (49 filtrov)     |

### Nasadenie

| Dokument                     | Účel                                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Zostavenie Dockeru, profily (base/cli/host/cliproxyapi), sprievodný kontajner Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Všeobecné nasadenie na VM/VPS (Ubuntu/Debian + nginx + systemd)                     |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Nasadenie na Fly.io (momentálne iba v čínštine)                                     |
| `TERMUX_GUIDE.md`            | Bezobslužná prevádzka v Androide prostredníctvom Termuxu                            |
| `PWA_GUIDE.md`               | Inštalácia progresívnej webovej aplikácie + service worker                          |
| `ELECTRON_GUIDE.md`          | Zostavenie + podpísanie + distribúcia desktopovej aplikácie                         |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                              |
| `PROXY_GUIDE.md`             | 4-úrovňový odchádzajúci proxy server + trhovisko 1proxy                             |

### Podadresáre

| Podadresár            | Účel                                                                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokalizované preklady dokumentácie (41 lokalizácií)                                                                                                                                                                       |
| `docs/screenshots/`   | Obrazové podklady pre príručky                                                                                                                                                                                            |
| `_tasks/superpowers/` | Plány/špecifikácie zo superpowers (`writing-plans`/`brainstorming`) + výskum — izolovaný repozitár so samostatným verzovaním, ignorovaný Gitom v hlavnom strome. Pozrite si CLAUDE.md → „Artefakty plánovania a výskumu“. |

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
