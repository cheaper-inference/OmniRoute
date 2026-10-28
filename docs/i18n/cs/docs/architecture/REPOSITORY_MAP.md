# Repository Map (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Jednořádkový popis každého adresáře a souboru v kořenovém adresáři.**
> Naposledy aktualizováno: 2026-06-28 — OmniRoute v3.8.40
>
> Tato mapa slouží k rychlé orientaci v kódové základně. Podrobnější informace naleznete v odkazované specializované dokumentaci.

## Strom nejvyšší úrovně

```
OmniRoute/
├── src/                  # Aplikace Next.js 16 (uživatelské rozhraní + API trasy + knihovny + doména + server)
├── open-sse/             # Pracovní prostor streamovacího enginu (obslužné rutiny, vykonávací moduly, překladač, server MCP)
├── packages/            # Pracovní prostory npm: ui-kit (začleněná sada Keak CI UI Kit) a browser-pool
├── electron/             # Desktopový obal (Electron 41 + electron-builder 26.10)
├── bin/                  # Vstupní bod CLI a obslužné rutiny příkazů
├── scripts/              # Skripty pro sestavení, kontroly, synchronizaci a jednorázové úlohy
├── docs/                 # Veřejná dokumentace (nacházíte se zde)
├── tests/                # Všechny testovací sady (jednotkové, integrační, e2e, klienti protokolů)
├── public/               # Statické prostředky Next.js, manifest PWA, service worker, ikony
├── config/               # Statická konfigurace + stav kontrol kvality (i18n, payloadRules, quality/)
├── images/               # Obrázkové podklady pro marketing / README
├── @omniroute/           # Publikovatelné doprovodné balíčky (opencode-plugin, opencode-provider)
├── skills/               # Balíčky dovedností pro CLI/agenty (cli-* + omni-* + config-codex-cli)
├── examples/             # Ukázkové pluginy + počáteční projekt omniroute-cmd-hello
├── contrib/              # Komunitní příspěvky (podman/)
├── .source/              # Konfigurace zdrojů Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Pracovní postupy GitHub Actions + šablony problémů + šablona PR
├── .husky/               # Hooky systému Git (pre-commit, pre-push)
├── .claude/              # Příkazy s lomítkem pro Claude Code (vázané na projekt)
├── .agents/              # Pracovní postupy + dovednosti pro Codex / obecné agenty (zrcadlo .claude/)
├── .vscode/              # Nastavení pracovního prostoru VS Code
├── _ideia/               # Poznámky k plánování (neformální; nejsou součástí distribuce)
├── _mono_repo/           # Historické dílčí projekty (cloud, site, vscode-extension)
├── _references/          # Klony souvisejících projektů OSS určené pouze pro čtení
├── _tasks/               # Soubory pro sledování úloh jednotlivých vydání (neformální)
├── .build/ .worktrees/ dist/   # Pomocná data místního sestavení / pracovních stromů Git / výstupů sestavení (ignorováno systémem Git)
├── .issues/              # Místní mezipaměť problémů (ignorováno systémem Git)
├── .playwright-mcp/      # Artefakty testů Playwright MCP
├── coverage/             # Výstup pokrytí c8 (ignorováno systémem Git)
├── logs/                 # Provozní protokoly (ignorováno systémem Git)
├── node_modules/         # Závislosti (ignorováno systémem Git)
├── package/              # Přípravná oblast pro npm pack (artefakt sestavení)
├── .next/                # Výstup sestavení Next.js (ignorováno systémem Git)
└── (soubory v kořenovém adresáři — viz níže)
```

---

## Soubory v kořenovém adresáři

| Soubor                                      | Účel                                                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **README.md**                               | Marketingová vstupní stránka + rychlý start + matice funkcí (viz také `llm.txt`)                       |
| **CHANGELOG.md**                            | Přehled změn pro jednotlivá vydání (automaticky generovaný pomocí dovednosti `/version-bump-cc`)       |
| **LICENSE**                                 | Text licence MIT                                                                                       |
| **CLAUDE.md**                               | Pravidla projektu pro agenty Claude Code (pevná pravidla, konvence, scénáře)                           |
| **AGENTS.md**                               | Totéž jako CLAUDE.md, ale pro AI agenty jiné než Claude (Codex, Cursor atd.)                           |
| **GEMINI.md**                               | Stručná pravidla pro agenty založené na Gemini (podmnožina CLAUDE.md)                                  |
| **CONTRIBUTING.md**                         | Příručka pro přispěvatele: nastavení, konvenční commity, testování, postup PR                          |
| **SECURITY.md**                             | Zásady hlášení zranitelností, podporované verze, model hrozeb                                          |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — očekávání ohledně chování v komunitě                                            |
| **llm.txt**                                 | Textová vstupní stránka optimalizovaná pro crawlery LLM (SEO pro AI asistenty)                         |
| **package.json**                            | Manifest npm, skripty, závislosti, běhová prostředí, limit pokrytí c8                                  |
| **package-lock.json**                       | Uzamčený strom závislostí                                                                              |
| **tsconfig.json**                           | Kořenová konfigurace TypeScriptu                                                                       |
| **tsconfig.typecheck-core.json**            | Konfigurace kontroly typů pro jádro `src/`                                                             |
| **tsconfig.typecheck-noimplicit-core.json** | Striktní kontrola typů (`noImplicitAny`)                                                               |
| **tsconfig.tsbuildinfo**                    | Mezipaměť inkrementálního sestavení TS (ignorovaná Gitem)                                              |
| **next.config.mjs**                         | Konfigurace sestavení Next.js 16 (samostatný výstup)                                                   |
| **next-env.d.ts**                           | Automaticky generované typy prostředí Next.js                                                          |
| **eslint.config.mjs**                       | Plochá konfigurace ESLint (pravidla pro jednotlivé oblasti projektu)                                   |
| **prettier.config.mjs**                     | Pravidla formátování Prettier                                                                          |
| **postcss.config.mjs**                      | Konfigurace PostCSS pro pipeline Tailwind/CSS                                                          |
| **playwright.config.ts**                    | Konfigurace E2E testů Playwright                                                                       |
| **vitest.config.ts**                        | Konfigurace Vitest (výchozí sada)                                                                      |
| **vitest.mcp.config.ts**                    | Konfigurace Vitest pro server MCP / sady autoCombo / mezipaměti                                        |
| **sonar-project.properties**                | Konfigurace SonarQube/SonarCloud (kvalita kódu)                                                        |
| **Dockerfile**                              | Vícefázové sestavení Dockeru (builder → runner-base → runner-cli)                                      |
| **docker-compose.yml**                      | Vývojová konfigurace Compose se 4 profily (base, cli, host, cliproxyapi) + pomocný kontejner Redis     |
| **docker-compose.prod.yml**                 | Produkční konfigurace Compose (port 20130, Redis, pojmenované svazky)                                  |
| **.dockerignore**                           | Soubory vyloučené z kontextu Dockeru                                                                   |
| **fly.toml**                                | Konfigurace nasazení Fly.io (oblast `sin`, port 20128, svazek /data)                                   |
| **.env.example**                            | Šablona souboru prostředí (při první instalaci automaticky zkopírovaná do `.env`)                      |
| **.gitignore**                              | Vzory ignorovaných souborů Gitu                                                                        |
| **.npmignore**                              | Seznam souborů vyloučených při publikování npm                                                         |
| **.npmrc**                                  | Konfigurace npm (registr, zásady souboru lockfile)                                                     |
| **.node-version**                           | Připnutí verze Node (používané nástroji kompatibilními s nvm)                                          |
| **.nvmrc**                                  | Připnutí verze Node pro nvm                                                                            |
| **eslint.complexity.config.mjs**            | Konfigurace ESLint pro postupné zpřísňování složitosti (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Konfigurace ESLint pro pravidla SonarJS (kognitivní složitost / duplicita)                             |
| **source.config.ts**                        | Konfigurace zdroje Fumadocs `defineDocs` (napájí `.source/`)                                           |
| **knip.json**                               | Konfigurace Knip — nepoužité soubory/exporty/závislosti (podklad pro kontrolu mrtvého kódu)            |
| **stryker.conf.json**                       | Konfigurace mutačního testování Stryker                                                                |
| **.size-limit.json**                        | Konfigurace limitu velikosti balíčku size-limit                                                        |
| **promptfooconfig.yaml**                    | Konfigurace vyhodnocování promptfoo                                                                    |
| **.gitleaks.toml**                          | Sada pravidel gitleaks pro kontrolu tajných údajů                                                      |
| **.zizmor.yml**                             | Konfigurace bezpečnostní kontroly GitHub Actions pomocí zizmor                                         |
| **socket.yml**                              | Konfigurace zabezpečení dodavatelského řetězce Socket.dev                                              |
| **news.json**                               | Lokalizovaný kanál oznámení v2; položka o spuštění Radaru je dodávána jako neaktivní                   |
| **flake.nix** / **flake.lock**              | Definice vývojového shellu Nix + zámek                                                                 |
| **.env**                                    | Místní tajné údaje (ignorováno systémem git — generováno z `.env.example`)                             |

> **Přesunuto z kořenového adresáře ve verzi v3.8.26 (pro zpřehlednění):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` a generovaný soubor `quality-metrics.json` (ignorovaný systémem git). Viz [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — aplikace Next.js

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

| Cesta                                                                        | Účel                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Veřejné OpenAI-compat API (~ 25 dílčích tras: chat, dokončení, vložení, soubory, dávky, zvuk, obrázky, videa, hudba, přehodnocení, moderování, vyhledávání, ws, agenti, účty, poskytovatelé atd.)                                                                                                                     |
| `app/api/v1beta/`                                                            | Koncové body API ve stylu Gemini                                                                                                                                                                                                                                                                                      |
| `app/api/playground/`                                                        | Trasy Playground Studio: `improve-prompt/` (POST — LLM prompt rewriter), `presets/` (GET list / POST create), `presets/[id]/` (GET / PUT / DELETE) — viz `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                       |
| `app/api/` (jiná než v1)                                                     | Management/admin routes (adresáře ~ 60: poskytovatelé, komba, nastavení, mcp, a2a, evals, paměť, dovednosti, webhooky, soulad, odolnost, monitorování, tunely, cli-tools atd.)                                                                                                                                        |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 cest (řízení serveru, agent state/DNS/mappings, bypass, cert, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Viz `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                            |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16 tras + (požadavky, relace, hostitelé, režimy zachycení, export, ws). LOCAL_ONLY + SPAWN_CAPABLE. Viz `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                  |
| `app/a2a/`                                                                   | vstupní bod A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                            |
| `app/.well-known/agent.json/`                                                | A2A karta agenta (objevení)                                                                                                                                                                                                                                                                                           |
| `app/(dashboard)/dashboard/`                                                 | Stránky UI řídicího panelu (50 sekcí +, soubory ~ 118 page.tsx : poskytovatelé, komba, nastavení, paměť, dovednosti, webhooky, hodnocení, audit, dávka, mezipaměť, náklady, zdraví, systém, aktivita atd.)                                                                                                            |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search Tools Studio UI (3 karty: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — viz `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                          |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plán 21): `page.tsx` (3kartový shell), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Stránka řídicího panelu AgentBridge — karta serveru, 9 karet agentů, průvodce nastavením, mapování modelu, seznam vynechaných položek. i18n PT-BR + EN. Viz `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                         |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Stránka řídicího panelu Traffic Inspector – rozdělení DevTools, 7 karet s podrobnostmi, 4 přepínače režimu snímání, záznam relace, vybarvení kontextu. i18n PT-BR + EN. Viz `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                   |
| `app/(dashboard)/dashboard/activity/`                                        | Stránka zdroje aktivit (skupina B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — viz `docs/architecture/MONITORING_SECTIONS.md`                                                                                                          |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Stránka sdílení kvót (skupina B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                         |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Stránka konfigurace plánu poskytovatele (skupina B): `page.tsx` + `ProviderPlanConfigClient.tsx` – přepsání dimenzí kvóty na připojení                                                                                                                                                                                |
| `app/docs/`                                                                  | Vestavěný prohlížeč dokumentace (vykresluje `docs/*.md`)                                                                                                                                                                                                                                                              |
| `app/landing/`                                                               | Marketingová vstupní stránka                                                                                                                                                                                                                                                                                          |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Stránky související s ověřováním                                                                                                                                                                                                                                                                                      |
| `app/{400,401,403,408,429,500,502,503}/`                                     | chybové stránky HTTP                                                                                                                                                                                                                                                                                                  |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | stránky Static/status                                                                                                                                                                                                                                                                                                 |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Root layout, home, PWA manifest, global CSS                                                                                                                                                                                                                                                                           |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Hranice chyb                                                                                                                                                                                                                                                                                                          |

### `src/lib/` — základní knihovny (~ 50 modulů)

| Modul                                    | Účel                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | správce úloh protokolu A2A, dovednosti (5), streamování                                                                                                                                                                                                                                                                     |
| `acp/`                                   | Registr agentů CLI (místní objev CLI – viz `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                      |
| `api/`                                   | Sdílení pomocníci API (`requireManagementAuth`, ověření)                                                                                                                                                                                                                                                                    |
| `auth/`                                  | Relace, hash hesla, ověření tokenu                                                                                                                                                                                                                                                                                          |
| `batches/`                               | OpenAI Dávkové manipulátory API                                                                                                                                                                                                                                                                                             |
| `catalog/`                               | Katalog poskytovatelů Zod validace rozlišení schopnosti +                                                                                                                                                                                                                                                                   |
| `cloudAgent/`                            | Cloud Agents (Codex Cloud, Devin, Jules) — viz `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                             |
| `combos/`                                | Pomocníci při změně pořadí + v kombinovaném rozlišení                                                                                                                                                                                                                                                                       |
| `audit/`                                 | Pomocníci zdroje aktivit: `highLevelActions.ts` (seznam povolených + `isHighLevelAction()`), `activityIcons.ts` (mapa akce → icon/verb ), `timeline.ts` (groupByDay/relativeTime) — viz `docs/architecture/MONITORING_SECTIONS.md`                                                                                          |
| `compliance/`                            | Protokol auditu audit poskytovatele + — viz `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                   |
| `compression/`                           | Lepidlo na kompresní motory (motory žijí v `open-sse/services/compression/`)                                                                                                                                                                                                                                                |
| `config/`                                | Pomocníci pro konfiguraci za běhu                                                                                                                                                                                                                                                                                           |
| `db/`                                    | 120 + doménových DB modulů + 168 migrací (pro SQLite vždy projděte zde)                                                                                                                                                                                                                                                     |
| `quota/`                                 | Engine pro sdílení kvót: `dimensions.ts` (types/Zod), `types.ts` ( rozhraní QuotaStore ), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` – viz `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Klient katalogu bezplatného modelu radaru: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — viz `docs/frameworks/RADAR.md`                                                                                                                                      |
| `display/`                               | pomocníci pro formátování UI (cena, latence atd.)                                                                                                                                                                                                                                                                           |
| `embeddings/`                            | Pomocníci služby vkládání                                                                                                                                                                                                                                                                                                   |
| `env/`                                   | + validace analýzy proměnné Env                                                                                                                                                                                                                                                                                             |
| `evals/`                                 | Eval framework (suites, runner, runtime) — viz `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                                   |
| `guardrails/`                            | PII masker, rychlá injekce, zrakový most – viz `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                                |
| `jobs/`                                  | Úlohy na pozadí (jako cron)                                                                                                                                                                                                                                                                                                 |
| `memory/`                                | Konverzační paměť (SQLite FTS5 + sqlite-vec hybrid RRF + Qdrant tier 2) — viz `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                   |
| `memory/embedding/`                      | Vrstva pro vkládání z více zdrojů: `index.ts` (překladač), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plán 21)                                                                                                                                                                         |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 wrapper — KNN brute-force + hybrid RRF (FTS5 + vector, k = 60). Lazy-init, ladně degraduje, když sqlite-vec není k dispozici. (plán 21)                                                                                                                                                                   |
| `memory/reindex.ts`                      | `runReindexBatch()` — zpracovává vzpomínky se `needs_reindex=1` na pozadí; volaná `POST /api/memory/reindex` a lazy-backfill path. (plán 21)                                                                                                                                                                                |
| `monitoring/`                            | Zdravotní kontroly, emise metrik                                                                                                                                                                                                                                                                                            |
| `oauth/`                                 | toky OAuth/import pro 22 modulů poskytovatelů (agy, antigravity, claude, cline, codebuddy-cn, codex, kurzor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, xenoqi, opendir. zed-hosted, zed)                                                                       |
| `plugins/`                               | Registr zásuvných modulů                                                                                                                                                                                                                                                                                                    |
| `promptCache/`                           | Zarážky mezipaměti výzvy v antropickém stylu                                                                                                                                                                                                                                                                                |
| `skills/`                                | Rámec dovedností (vestavěný + marketplace + SkillsSH) – viz `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                     |
| `playground/`                            | Sdílení pomocníci Playground Studio: `codeExport.ts` (curl/Python/TS generátor), `promptImprover.ts` (meta-prompt builder), `streamMetrics.ts` (pure TTFT/TPS), `types.ts` (ceník) — viz `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                             |
| `webhookDispatcher.ts`                   | HMAC webhook delivery — viz `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                   |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Správci tunelů – viz `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                            |
| `cloudSync.ts`, `initCloudSync.ts`       | Volitelná cloudová synchronizace stavu                                                                                                                                                                                                                                                                                      |
| `localDb.ts`                             | Re-export barel pro db moduly (bez logiky – pouze reexporty)                                                                                                                                                                                                                                                                |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Požadavek na mezipaměť + idempotency                                                                                                                                                                                                                                                                                        |
| (~ 30 dalších souborů nejvyšší úrovně)   | Specializovaní pomocníci (logEnv, modelsDevSync, piiSanitizer atd.)                                                                                                                                                                                                                                                         |

### `src/lib/db/` — Databáze (147 modulů + 208 migrací)

| Subdir                    | Účel                                                                                                                                                                                           |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | `getDbInstance()` singleton s žurnálováním WAL                                                                                                                                                 |
| `db/migrations/`          | Verzované soubory SQL (idempotentní, transakční). `073_memory_vec.sql` přidá sloupec `memory_vec_meta` + `needs_reindex` (plán 21).                                                            |
| `db/playgroundPresets.ts` | modul CRUD pro předvolby Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)                      |
| `db/memoryVec.ts`         | CRUD pro `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` atd. (plán 21)                                     |
| `db/<domain>.ts`          | Jeden modul na doménu: poskytovatelé, komba, apiKeys, uživatelé, relace, využití, protokol auditu, webhooky, dovednosti, memory_entries, cloud_agent_tasks, evals* \* , logická_mezipaměť atd. |

### `src/domain/`

| Modul                  | Účel                                            |
| ---------------------- | ----------------------------------------------- |
| `policy.ts`            | Modul zásad                                     |
| `fallbackPolicy.ts`    | Záložní rozhodovací strom                       |
| `costRules.ts`         | Pravidla kalkulace nákladů                      |
| `lockoutPolicy.ts`     | zásada uzamčení Model/connection                |
| `tagRouter.ts`         | Směrování založené na značkách                  |
| `comboResolver.ts`     | Kombinované rozlišení (používané combo enginem) |
| `modelAvailability.ts` | Kontrola dostupnosti podle modelu               |
| `assessment/`          | Hodnocení modelu (1. fáze RFC-AUTO-ASSESSMENT)  |

### `src/server/`

| Modul    | Účel                                                                                            |
| -------- | ----------------------------------------------------------------------------------------------- |
| `authz/` | Autorizační kanál: `classify` → `policies` → `enforce` — viz `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | konfigurace CORS                                                                                |
| `auth/`  | Middleware relace                                                                               |

### `src/shared/`

| Modul                            | Účel                                                                                                     |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `components/`                    | Komponenta palubní desky API: adaptéry přes `packages/ui-kit` — viz `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: názvy ikon používané obrazovkami → komponenty Lucide (`<Icon>`)                              |
| `constants/providers.ts`         | **377 poskytovatelů** s ověřením Zod (zdroj pravdy)                                                      |
| `constants/cliTools.ts`          | Externí registr nástrojů CLI                                                                             |
| `constants/routingStrategies.ts` | **20 směrovacích strategií** s prioritami                                                                |
| `constants/publicApiRoutes.ts`   | Cesty, které vyžadují ověření nosiče (vs. management).                                                   |
| `constants/upstreamHeaders.ts`   | Seznam odmítnutí záhlaví pro upstream požadavky                                                          |
| `validation/schemas.ts`          | schémata ~ 80 Zod (jediný zdroj pravdy pro smlouvy API )                                                 |
| `validation/helpers.ts`          | Pomocníci pro ověření Zod (`validateBody` atd.)                                                          |
| `types/`                         | Sdílené typy TS                                                                                          |
| `contracts/`                     | Veřejné smlouvy API (spotřebované `files:` v `package.json`)                                             |
| `utils/circuitBreaker.ts`        | Jistič poskytovatele (viz `docs/architecture/RESILIENCE_GUIDE.md`)                                       |
| `utils/apiAuth.ts`               | ověření klíče API, kontrola rozsahu                                                                      |
| `utils/fetchTimeout.ts`          | Timeout/abort wrappery pro upstream načítání                                                             |
| `utils/releaseNotes.ts`          | Uzavřený analyzátor oznámení v2/legacy, lokalizace a zrušení ID                                          |

---

## `open-sse/` — Pracovní prostor streamovacího enginu

Samostatný pracovní prostor npm (`@omniroute/open-sse`). Zajišťuje zpracování požadavků a spouštění poskytovatelů.

```
open-sse/
├── handlers/            # 16 souborů (12 obslužných rutin + 4 pomocné moduly): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search atd.
├── executors/           # 150 modulů executorů (třídy rozšiřující BaseExecutor + pomocné moduly pro jednotlivé poskytovatele)
├── translator/          # Převodníky formátů (9 pro požadavky, 9 pro odpovědi, 9 pomocných modulů)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ modulů služeb (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM atd.)
├── mcp-server/          # Server MCP (110 nástrojů, 3 transporty, 33 rozsahů)
├── config/              # Registry poskytovatelů/modelů, konfigurace hlaviček, aliasy modelů
├── utils/               # Klient TLS, proxy fetch/dispatcher, síťové pomocné moduly
├── index.ts             # Vstupní bod pracovního prostoru
├── package.json         # Manifest pracovního prostoru
├── tsconfig.json        # Konfigurace TS pracovního prostoru
└── types.d.ts           # Deklarace typů pracovního prostoru
```

### `open-sse/mcp-server/`

| Cesta                       | Účel                                                                              |
| --------------------------- | --------------------------------------------------------------------------------- |
| `server.ts`                 | Životní cyklus serveru MCP (transporty stdio + HTTP)                              |
| `httpTransport.ts`          | Transporty HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)              |
| `audit.ts`                  | Protokolování auditu do tabulky `mcp_tool_audit`                                  |
| `scopeEnforcement.ts`       | Ověřování rozsahu pro jednotlivé nástroje                                         |
| `runtimeHeartbeat.ts`       | Prezenční signál stavu do `DATA_DIR/runtime/mcp-heartbeat.json`                   |
| `descriptionCompressor.ts`  | Komprese metadat popisu nástroje za účelem úspory kontextu                        |
| `schemas/tools.ts`          | 36 definic základních nástrojů + rozsahy                                          |
| `tools/advancedTools.ts`    | Implementace pokročilých nástrojů                                                 |
| `tools/memoryTools.ts`      | 3 paměťové nástroje (vyhledání/přidání/vymazání)                                  |
| `tools/skillTools.ts`       | 4 nástroje dovedností (seznam/povolení/spuštění/provedení)                        |
| `tools/compressionTools.ts` | 5 kompresních nástrojů                                                            |
| `README.md`                 | Interní README serveru MCP (s křížovým odkazem z `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — Pracovní prostory

| Cesta                    | Účel                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — lokálně spravovaný snapshot Keak CI UI Kit (`private`, `UNLICENSED`), používaný přímo jako zdrojový kód (bez sestavení). `UPSTREAM.md` připíná konkrétní upstreamový commit a zaznamenává licenční oprávnění; `PATCHES.md` uvádí místní úpravy (žádné); `src/` se synchronizuje pouze pomocí `scripts/dev/sync-ui-kit.sh` a jeho konzistence je ověřována příkazem `npm run check:ui-kit-snapshot`. Viz `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — volitelná služba fondu prohlížečů (chat založený na CloakBrowser a Playwright)                                                                                                                                                                                                                                                                                                                                                         |

---

## `electron/` — Desktopový obal

| Soubor           | Účel                                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `main.js`        | Hlavní proces Electronu (BrowserWindow, vestavěný server Next.js, systémová lišta, automatické aktualizace) |
| `preload.js`     | Most IPC (contextBridge → `window.omniroute`)                                                               |
| `package.json`   | Konfigurace electron-builderu + závislosti Electron 41 a electron-builder 26.10                             |
| `assets/`        | Ikony aplikace (Windows .ico, macOS .icns, Linux .png)                                                      |
| `dist-electron/` | Výstup sestavení (ignorovaný Gitem)                                                                         |
| `types.d.ts`     | Deklarace typů pro most vykreslovacího procesu                                                              |
| `README.md`      | Interní README pro Electron (viz také `docs/guides/ELECTRON_GUIDE.md`)                                      |

---

## `bin/` — CLI

| Soubor                                                                                                      | Účel                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Hlavní vstupní bod CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` atd. |
| `reset-password.mjs`                                                                                        | Samostatné CLI pro resetování hesla                                                                                               |
| `cli/commands/setup.mjs`                                                                                    | Interaktivní + neinteraktivní průvodce nastavením                                                                                 |
| `cli/commands/doctor.mjs`                                                                                   | Diagnostika stavu systému (8+ kontrol)                                                                                            |
| `cli/commands/providers.mjs`                                                                                | Výpis/testování/ověřování poskytovatelů                                                                                           |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Pomocné moduly CLI                                                                                                                |
| `cli/tray/tray.ts`                                                                                          | Integrace do systémové lišty (napříč platformami: NotifyIcon ve Windows, systray2 v macOS/Linuxu)                                 |
| `cli/tray/tray.ps1`                                                                                         | Backend NotifyIcon v PowerShellu (Windows, žádné nové binární soubory)                                                            |
| `cli/tray/autostart.ts`                                                                                     | Automatické spouštění napříč platformami (LaunchAgent / .desktop / registr)                                                       |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Pětikrokový řetězec rozpoznávání ovladače SQLite (přibalený → runtime → odložená instalace → node:sqlite → sql.js)                |
| `cli/runtime/magicBytes.mjs`                                                                                | Ověřování magických bajtů binárních souborů (ELF / Mach-O / Mach-O fat / PE)                                                      |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — předem rozpozná ovladače při postinstall / prvním spuštění                                                   |
| `nodeRuntimeSupport.mjs`                                                                                    | Ověření podporované verze Node.js při instalaci                                                                                   |

---

## `skills/` — Veřejné dovednosti agentů

| Soubor                       | Účel                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifestů dovedností pro externí AI agenty (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Skripty pro sestavení a kontroly

| Skript                              | Účel                                                                                         |
| ----------------------------------- | -------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Spouštěč pro vývoj/spuštění s načtením proměnných prostředí                                  |
| `build-next-isolated.mjs`           | Samostatné sestavení (samostatný režim Next.js 16)                                           |
| `prepublish.ts`                     | Příprava balíčku před `npm pack`                                                             |
| `postinstall.mjs`                   | Automatické vytvoření `.env` z `.env.example` při první instalaci                            |
| `sync-env.mjs`                      | Opětovná synchronizace klíčů v `.env` s `.env.example`                                       |
| `check-cycles.mjs`                  | Detekce cyklických závislostí                                                                |
| `check-route-validation.mjs`        | Ověření, že všechny trasy API používají validaci Zod                                         |
| `check-t11-any-budget.mjs`          | Vynucení explicitního limitu použití `any` pro jednotlivé soubory                            |
| `check-docs-sync.mjs`               | Ověření synchronizace verzí dokumentace (stávající kontrola před commitem)                   |
| **`check-env-doc-sync.mjs`**        | NOVÉ: křížová kontrola proměnných prostředí v kódu, `.env.example` a `ENVIRONMENT.md`        |
| **`check-docs-counts-sync.mjs`**    | NOVÉ: ověření, že počty (executory, strategie, OAuth, dovednosti A2A) odpovídají dokumentaci |
| **`check-deprecated-versions.mjs`** | NOVÉ: označení zastaralých verzí/dat v dokumentaci                                           |
| `check-supported-node-runtime.ts`   | Ověření, že je aktuální verze Node podporována                                               |
| `check-pr-test-policy.mjs`          | Vynucení pravidla „testy jsou povinné“ při změnách produkčního kódu                          |
| **`gen-provider-reference.ts`**     | NOVÉ: automatické generování `docs/reference/PROVIDER_REFERENCE.md` z katalogu               |
| `i18n/generate-multilang.mjs`       | Překlad řetězců uživatelského rozhraní a dokumentace pomocí Google Translate                 |
| `i18n_autotranslate.py`             | Pipeline pro překlad dokumentace založený na LLM                                             |
| `validate_translation.py`           | Ověření překladů pro jednotlivá národní prostředí                                            |
| `check_translations.py`             | Kontrola klíčů i18n v kódu                                                                   |
| `run-playwright-tests.mjs`          | Spouštěč E2E testů Playwright                                                                |
| `run-protocol-clients-tests.mjs`    | Spouštěč E2E testů MCP/A2A                                                                   |
| `run-ecosystem-tests.mjs`           | Testy ekosystému (integrace poskytovatelů)                                                   |
| `test-report-summary.mjs`           | Generování markdownového souhrnu pokrytí                                                     |
| `smoke-electron-packaged.mjs`       | Základní test zabaleného sestavení Electron                                                  |
| `native-binary-compat.mjs`          | Ověření, že nativní závislosti (`better-sqlite3`) odpovídají verzi Node v Electronu          |
| `validate-pack-artifact.ts`         | Ověření výstupu balení npm                                                                   |
| `responses-ws-proxy.mjs`            | Most WebSocket pro Codex Responses API                                                       |
| `v1-ws-bridge.mjs`                  | Most WebSocket pro koncový bod `/api/v1/ws`                                                  |
| `standalone-server-ws.mjs`          | Spouštěč samostatného serveru WS                                                             |
| `system-info.mjs`                   | Výpis informací o systému/běhovém prostředí pro účely podpory                                |
| `healthcheck.mjs`                   | Jednorázová kontrola stavu (používaná funkcí Docker HEALTHCHECK)                             |
| `uninstall.mjs`                     | Skript pro čistou odinstalaci                                                                |
| `dev/sync-ui-kit.sh`                | Kopírování `src/` sady CI UI Kit z připnutého commitu do `packages/ui-kit/src`               |
| `check/check-ui-kit-snapshot.mjs`   | Kontrola před commitem: `packages/ui-kit/src` odpovídá připnutému upstreamovému commitu      |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — používané názvy ikon, které `ICON_MAP` nemapuje                     |
| `dev/codemod-material-icons.mjs`    | Přepis literálních elementů span Material Symbols na `<Icon>` (migrační nástroje)            |

---

## `docs/` — Veřejná dokumentace (7 kořenových souborů + 17 podadresářů)

### Průvodce na nejvyšší úrovni

| Doc                         | Účel                                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Architektura na vysoké úrovni, mapa subsystému, povrch palubní desky                           |
| `CODEBASE_DOCUMENTATION.md` | Technická reference: adresáře, moduly, konvence                                                |
| `FEATURES.md`               | Matice funkcí se zvýrazněními verze 3.8                                                        |
| `USER_GUIDE.md`             | Příručka pro koncového uživatele (nastavení, modely, komba, CLIs, audio atd.)                  |
| `API_REFERENCE.md`          | Reference koncového bodu API s modelem ověřování                                               |
| `openapi.yaml`              | Specifikace OpenAPI 3.0 (121 cest)                                                             |
| `SETUP_GUIDE.md`            | Instalační metody (npm, npx, Docker, Electron, Termux, zdroj)                                  |
| `ENVIRONMENT.md`            | Všechny env vars (~ 800 zdokumentováno, ~ 3 050 řádků `.env.example`)                          |
| `TROUBLESHOOTING.md`        | Běžné chyby Známé problémy + v3.8.0                                                            |
| `RELEASE_CHECKLIST.md`      | Úplný tok vydání (dovednosti, husky, konvenční commity, nasazení)                              |
| `COVERAGE_PLAN.md`          | Cíle pokrytí a současný stav                                                                   |
| `FREE_TIERS.md`             | Vybraní poskytovatelé bezplatné úrovně (48 + zdarma + 11 OAuth)                                |
| `CLI-TOOLS.md`              | Externí integrace CLI + Vnitřní OmniRoute CLI                                                  |
| `I18N.md`                   | architektura i18n, přidání jazyka, 67 lokalit                                                  |
| `UNINSTALL.md`              | Čisté kroky odinstalace                                                                        |
| `PROVIDER_REFERENCE.md`     | **Automaticky generované** katalog 377 poskytovatelů (regen: `npm run gen:provider-reference`) |

### Subsystém hloubkové ponory

| Doc                                          | Účel                                                                                             |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `MCP-SERVER.md`                              | MCP server: 110 nástrojů, 3 transporty, 33 oborů, REST koncové body                              |
| `A2A-SERVER.md`                              | A2A v0.3: JSON-RPC, 6 dovedností, pomocníci REST, karta agenta                                   |
| `AGENT_PROTOCOLS_GUIDE.md`                   | Jednotný průvodce: A2A vs ACP vs Cloud Agents                                                    |
| `CLOUD_AGENT.md`                             | Codex Cloud / Devin / Jules orchestrace                                                          |
| `SKILLS.md`                                  | Rámec dovedností (vestavěný + marketplace + SkillsSH + sandbox)                                  |
| `RADAR.md`                                   | Překryvná vrstva katalogu volného modelu radaru (`RADAR_ENABLED`, ve výchozím nastavení vypnuto) |
| `MEMORY.md`                                  | Paměťový systém (SQLite FTS5 + Qdrant)                                                           |
| `EVALS.md`                                   | Eval framework (sady, běhy, rubriky)                                                             |
| `GUARDRAILS.md`                              | PII masker, rychlá injekce, můstek vidění                                                        |
| `COMPLIANCE.md`                              | Protokol auditu, uchovávání, odhlášení noLog                                                     |
| `WEBHOOKS.md`                                | Doručení webhooku podepsaného HMAC                                                               |
| `REASONING_REPLAY.md`                        | Hybridní mezipaměť memory/SQLite pro `reasoning_content`                                         |
| `AUTHZ_GUIDE.md`                             | Autorizační kanál (`classify` → `policies` → `enforce`)                                          |
| `RESILIENCE_GUIDE.md`                        | Jistič + cooldown + model lockout                                                                |
| `docs/security/STEALTH_GUIDE.md` (pouze git) | TLS fingerprinting (JA3/JA4), Claude Code CCH, MITM cert                                         |
| `AUTO-COMBO.md`                              | Auto Combo engine (16faktorové hodnocení, 6 balíčků režimů, virtuální továrna)                   |

### Komprese

| Doc                             | Účel                                      |
| ------------------------------- | ----------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Přehled kompresních režimů + roadmap      |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK motory, registrační smlouva |
| `COMPRESSION_RULES_FORMAT.md`   | Schéma Caveman rule pack JSON             |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventář sady pravidel pro jazyk          |
| `RTK_COMPRESSION.md`            | deklarativní potrubí RTK (56 filtrů)      |

### Nasazení

| Doc                          | Účel                                                             |
| ---------------------------- | ---------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker build, profily (base/cli/host/cliproxyapi), Redis sidecar |
| `VM_DEPLOYMENT_GUIDE.md`     | Obecné nasazení VM/VPS (Ubuntu/Debian + nginx + systemd)         |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Nasazení Fly.io (aktuálně pouze v čínštině)                      |
| `TERMUX_GUIDE.md`            | Android bezhlavě přes Termux                                     |
| `PWA_GUIDE.md`               | Servisní pracovník + pro instalaci progresivní webové aplikace   |
| `ELECTRON_GUIDE.md`          | Sestavení desktopové aplikace + sign + distribute                |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Trychtýř                         |
| `PROXY_GUIDE.md`             | 4úrovňový odchozí proxy + 1proxy marketplace                     |

### Podadresáře

| Subdir                | Účel                                                                                                                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokalizované překlady dokumentů (41 jazyků)                                                                                                                                                     |
| `docs/screenshots/`   | Obrazové podklady pro průvodce                                                                                                                                                                  |
| `_tasks/superpowers/` | Plans/specs od supervelmocí (`writing-plans`/`brainstorming`) + research — izolované, samostatně verzované repo, gitignorované hlavním stromem. Viz CLAUDE.md → "Plánování a výzkum artefaktů". |

---

## `tests/` — Testovací sady

| Podadresář                           | Typ                                             | Spouštěč                                   |
| ------------------------------------ | ----------------------------------------------- | ------------------------------------------ |
| `tests/unit/`                        | Jednotkové testy (~4 800 souborů, nejrychlejší) | Nativní spouštěč testů Node                |
| `tests/integration/`                 | Integrační testy více modulů + DB               | Nativní spouštěč testů Node (souběžnost 1) |
| `tests/e2e/`                         | E2E uživatelského rozhraní + pracovních postupů | Playwright                                 |
| `tests/e2e/protocol-clients.test.ts` | E2E MCP + A2A se skutečnými klienty             | Vlastní klienti protokolů                  |
| `tests/e2e/ecosystem.test.ts`        | Integrace poskytovatelů (využívající síť)       | Nativní spouštěč testů Node                |

---

## `public/` — Statické prostředky

| Cesta               | Účel                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| `public/` (kořen)   | Favikony, robots.txt, manifest, service worker, marketingové obrázky |
| `public/providers/` | Loga poskytovatelů ve formátu PNG/SVG (používaná v řídicím panelu)   |

---

## `config/` — Statické konfigurace + stav kontrol kvality

Distribuované konfigurační šablony spolu s verzovanými referenčními hodnotami kontrol kvality
(přesunuto sem z kořenového adresáře repozitáře ve verzi v3.8.26, aby zůstal přehledný).

| Cesta                                         | Účel                                                                                                  |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Seznam národních prostředí + metadata (kanonický zdroj počtu 42 národních prostředí)                  |
| `config/i18n-schema.json`                     | Schéma JSON ověřující `i18n.json`                                                                     |
| `config/payloadRules.json`                    | Pravidla sanitizace příchozích dat                                                                    |
| `config/quality/quality-baseline.json`        | Referenční hodnoty pro postupné zpřísňování více metrik (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Zmrazené referenční hodnoty složitosti ESLint (`check-complexity.mjs`)                                |
| `config/quality/duplication-baseline.json`    | Zmrazené referenční hodnoty duplicit jscpd (`check-duplication.mjs`)                                  |
| `config/quality/file-size-baseline.json`      | Zmrazené referenční hodnoty velikosti jednotlivých souborů (`check-file-size.mjs`)                    |
| `config/quality/test-discovery-baseline.json` | Zmrazené referenční hodnoty osiřelých testů (`check-test-discovery.mjs`)                              |
| `config/quality/dependency-allowlist.json`    | Seznam povolených schválených závislostí (`check-deps.mjs`)                                           |
| `config/quality/.license-allowlist.json`      | Seznam povolených licencí SPDX (`check-licenses.mjs`)                                                 |
| `config/quality/quality-metrics.json`         | Dočasné shromážděné metriky (generované skriptem `collect-metrics.mjs`; **ignorované systémem git**)  |

---

## `.github/` — Integrace s GitHubem

| Cesta                              | Účel                                                                   |
| ---------------------------------- | ---------------------------------------------------------------------- |
| `.github/workflows/`               | Pracovní postupy CI/CD v GitHub Actions (lint, testy, pokrytí, vydání) |
| `.github/ISSUE_TEMPLATE/`          | Šablony hlášení chyb a požadavků na funkce                             |
| `.github/pull_request_template.md` | Šablona PR                                                             |
| `.github/dependabot.yml`           | Konfigurace aktualizací závislostí                                     |

---

## `.husky/` — Git hooky

| Soubor       | Účel                                                                  |
| ------------ | --------------------------------------------------------------------- |
| `pre-commit` | Spouští `lint-staged + check-docs-sync + check:any-budget:t11`        |
| `pre-push`   | Aktuálně zakázáno (zakomentováno). Spusťte `npm run test:unit` ručně. |
| `_/`         | Interní součásti Husky                                                |

---

## `.claude/` — Lomítkové příkazy Claude Code

| Soubor                                              | Účel                                                       |
| --------------------------------------------------- | ---------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — zvýšení verze + automatický changelog |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — kompletní postup vydání           |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Nasazení na VPS                                            |
| `commands/capture-release-evidences-cc.md`          | Záznam nových funkcí v prohlížeči ve formátu WebP          |
| `commands/review-{prs,discussions}-cc.md`           | Třídění PR a diskusí na GitHubu                            |
| `commands/{review-issues,implement-features}-cc.md` | Pracovní postupy pro issues                                |
| `settings.local.json`                               | Nastavení Claude Code pro konkrétní projekt                |

---

## `.agents/` — Obecné pracovní postupy agentů (Codex / Cursor / atd.)

| Cesta                    | Účel                                                      |
| ------------------------ | --------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definic pracovních postupů (kopie `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definic dovedností s poznámkami k provádění v Codexu    |

> **Poznámka:** Pracovní postupy a příkazy jsou v současnosti identické bajt po bajtu. Pokud má `.agents/` cílit na jiné běhové prostředí agenta (Codex), musí se varianty smysluplně lišit.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Mimo strom projektu

Tyto adresáře s podtržítkem na začátku obsahují materiály, které nejsou součástí distribuce:

- **`_ideia/`** — poznámky k návrhu (kategorie defer / notfit / viable)
- **`_mono_repo/`** — historické dílčí projekty (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — klony souvisejících OSS projektů pouze pro čtení (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api atd.) určené ke křížovému porovnávání během vývoje
- **`_tasks/`** — neformální soubory pro sledování úkolů jednotlivých vydání

Nejsou zahrnuty ve výstupu `npm pack`. Viz `.npmignore`.

---

## Generováno / ignorováno Gitem

| Cesta                  | Účel                               |
| ---------------------- | ---------------------------------- |
| `node_modules/`        | Závislosti npm                     |
| `.next/`               | Výstup sestavení Next.js           |
| `coverage/`            | Reporty pokrytí c8                 |
| `logs/`                | Provozní protokoly                 |
| `package/`             | Přípravná oblast npm pack          |
| `.playwright-mcp/`     | Testovací artefakty Playwright MCP |
| `.issues/`             | Místní mezipaměť problémů          |
| `tsconfig.tsbuildinfo` | Inkrementální mezipaměť TS         |

---

## Tipy pro navigaci

- **Jste nový přispěvatel?** Přečtěte si `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Přidáváte poskytovatele?** Postupujte podle `docs/architecture/ARCHITECTURE.md § Adding a New Provider` a porovnejte s `docs/reference/PROVIDER_REFERENCE.md`.
- **Přidáváte trasu?** Viz `docs/architecture/ARCHITECTURE.md § Adding a New API Route` a `src/shared/validation/schemas.ts`.
- **Přidáváte nástroj MCP?** Viz `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Přidáváte dovednost A2A?** Viz `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Spouštíte projekt lokálně?** Viz `docs/guides/SETUP_GUIDE.md`.
- **Nasazujete projekt?** Viz `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Vydáváte novou verzi?** Viz `docs/ops/RELEASE_CHECKLIST.md` (a dovednost Claude Code `/generate-release-cc`).
