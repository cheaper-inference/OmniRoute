# Repository Map (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Enovrstični opis za vsako mapo in datoteko v korenu.**
> Zadnja posodobitev: 2026-06-28 — OmniRoute v3.8.40
>
> Uporabite ta zemljevid za hitro krmarjenje po kodni zbirki. Za podrobnejši pregled sledite povezavam do namenske dokumentacije.

## Drevo na najvišji ravni

```
OmniRoute/
├── src/                  # Aplikacija Next.js 16 (uporabniški vmesnik + poti API + knjižnice + domena + strežnik)
├── open-sse/             # Delovni prostor pretočnega mehanizma (obdelovalniki, izvajalniki, prevajalnik, strežnik MCP)
├── packages/            # Delovni prostori npm: ui-kit (vključeni Keak CI UI Kit) in browser-pool
├── electron/             # Namizni ovoj (Electron 41 + electron-builder 26.10)
├── bin/                  # Vstopna točka CLI in obdelovalniki ukazov
├── scripts/              # Skripti za gradnjo, preverjanje, sinhronizacijo in enkratna opravila
├── docs/                 # Javna dokumentacija (trenutno ste tukaj)
├── tests/                # Vsi preizkusni sklopi (enotni, integracijski, e2e, odjemalci protokolov)
├── public/               # Statična sredstva Next.js, manifest PWA, storitveni delavec, ikone
├── config/               # Statična konfiguracija + stanje vrat kakovosti (i18n, payloadRules, quality/)
├── images/               # Slikovna sredstva za trženje / README
├── @omniroute/           # Spremljevalni paketi za objavo (opencode-plugin, opencode-provider)
├── skills/               # Paketi veščin za CLI/agente (cli-* + omni-* + config-codex-cli)
├── examples/             # Vzorčni vtičniki + začetni projekt omniroute-cmd-hello
├── contrib/              # Prispevki skupnosti (podman/)
├── .source/              # Izvorna konfiguracija Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Delovni tokovi GitHub Actions + predloge za težave + predloga za zahteve za spojitev
├── .husky/               # Kavlji Git (pre-commit, pre-push)
├── .claude/              # Ukazi s poševnico za Claude Code (omejeni na projekt)
├── .agents/              # Delovni tokovi in veščine za Codex / splošne agente (zrcalna kopija .claude/)
├── .vscode/              # Nastavitve delovnega prostora VS Code
├── _ideia/               # Načrtovalni zapiski (neformalni; niso vključeni v izdajo)
├── _mono_repo/           # Zgodovinski podprojekti (cloud, site, vscode-extension)
├── _references/          # Referenčni kloni povezanih odprtokodnih projektov, namenjeni samo za branje
├── _tasks/               # Datoteke za spremljanje opravil po posameznih izdajah (neformalno)
├── .build/ .worktrees/ dist/   # Lokalna začasna vsebina za gradnjo / delovna drevesa Git / rezultate gradnje (gitignored)
├── .issues/              # Lokalni predpomnilnik težav (gitignored)
├── .playwright-mcp/      # Artefakti preizkusov Playwright MCP
├── coverage/             # Rezultati pokritosti c8 (gitignored)
├── logs/                 # Dnevniki izvajanja (gitignored)
├── node_modules/         # Odvisnosti (gitignored)
├── package/              # Pripravljalno območje za npm pack (artefakt gradnje)
├── .next/                # Rezultati gradnje Next.js (gitignored)
└── (datoteke v korenu — glejte spodaj)
```

---

## Datoteke v korenu

| Datoteka                                    | Namen                                                                                                     |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Trženjska ciljna stran + hitri začetek + matrika funkcij (glejte tudi `llm.txt`)                          |
| **CHANGELOG.md**                            | Dnevnik sprememb za vsako izdajo (samodejno ustvarjen z veščino `/version-bump-cc`)                       |
| **LICENSE**                                 | Besedilo licence MIT                                                                                      |
| **CLAUDE.md**                               | Projektna pravila za agente Claude Code (stroga pravila, dogovori, scenariji)                             |
| **AGENTS.md**                               | Enako kot CLAUDE.md, vendar za agente umetne inteligence, ki niso Claude (Codex, Cursor itd.)             |
| **GEMINI.md**                               | Jedrnata pravila za agente, ki temeljijo na Gemini (podmnožica CLAUDE.md)                                 |
| **CONTRIBUTING.md**                         | Vodnik za sodelujoče: nastavitev, dogovorjeni zapisi potrditev, testiranje, potek PR                      |
| **SECURITY.md**                             | Pravilnik o prijavi ranljivosti, podprte različice, model groženj                                         |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — pričakovanja glede vedenja v skupnosti                                             |
| **llm.txt**                                 | Ciljna stran v navadnem besedilu, optimizirana za pajke LLM (SEO za pomočnike UI)                         |
| **package.json**                            | Manifest npm, skripti, odvisnosti, pogoni, prag pokritosti c8                                             |
| **package-lock.json**                       | Zaklenjeno drevo odvisnosti                                                                               |
| **tsconfig.json**                           | Korenska konfiguracija TypeScript                                                                         |
| **tsconfig.typecheck-core.json**            | Konfiguracija preverjanja tipov za jedro `src/`                                                           |
| **tsconfig.typecheck-noimplicit-core.json** | Strogo preverjanje tipov (`noImplicitAny`)                                                                |
| **tsconfig.tsbuildinfo**                    | Predpomnilnik inkrementalne gradnje TS (prezrt v Gitu)                                                    |
| **next.config.mjs**                         | Konfiguracija gradnje Next.js 16 (samostojen izhod)                                                       |
| **next-env.d.ts**                           | Samodejno ustvarjeni tipi okolja Next.js                                                                  |
| **eslint.config.mjs**                       | Ploska konfiguracija ESLint (pravila za posamezna področja projekta)                                      |
| **prettier.config.mjs**                     | Pravila oblikovanja Prettier                                                                              |
| **postcss.config.mjs**                      | Konfiguracija PostCSS za cevovod Tailwind/CSS                                                             |
| **playwright.config.ts**                    | Konfiguracija celovitih testov Playwright                                                                 |
| **vitest.config.ts**                        | Konfiguracija Vitest (privzeti nabor)                                                                     |
| **vitest.mcp.config.ts**                    | Konfiguracija Vitest za strežnik MCP / zbirke autoCombo / predpomnilnik                                   |
| **sonar-project.properties**                | Konfiguracija SonarQube/SonarCloud (kakovost kode)                                                        |
| **Dockerfile**                              | Večstopenjska gradnja Docker (graditelj → osnovno izvajalno okolje → izvajalno okolje CLI)                |
| **docker-compose.yml**                      | Razvojni sestav s 4 profili (osnovni, CLI, gostitelj, cliproxyapi) + stranski vsebnik redis               |
| **docker-compose.prod.yml**                 | Produkcijski sestav (vrata 20130, redis, poimenovani nosilci)                                             |
| **.dockerignore**                           | Datoteke, izključene iz konteksta Docker                                                                  |
| **fly.toml**                                | Konfiguracija uvedbe Fly.io (regija `sin`, vrata 20128, nosilec /data)                                    |
| **.env.example**                            | Predloga okoljske datoteke (ob prvi namestitvi se samodejno kopira v `.env`)                              |
| **.gitignore**                              | Vzorci datotek, ki jih Git prezre                                                                         |
| **.npmignore**                              | Seznam izključitev pri objavi npm                                                                         |
| **.npmrc**                                  | Konfiguracija npm (register, pravilnik zaklepne datoteke)                                                 |
| **.node-version**                           | Pripeta različica Node (uporabljajo jo orodja, združljiva z nvm)                                          |
| **.nvmrc**                                  | Pripeta različica Node za nvm                                                                             |
| **eslint.complexity.config.mjs**            | Konfiguracija ESLint za postopno omejevanje kompleksnosti (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Konfiguracija ESLint za pravila SonarJS (kognitivna kompleksnost / podvajanje)                            |
| **source.config.ts**                        | Izvorna konfiguracija Fumadocs `defineDocs` (polni `.source/`)                                            |
| **knip.json**                               | Konfiguracija Knip — neuporabljene datoteke/izvozi/odvisnosti (vir za preverjanje mrtve kode)             |
| **stryker.conf.json**                       | Konfiguracija mutacijskega testiranja Stryker                                                             |
| **.size-limit.json**                        | Konfiguracija proračuna velikosti paketa size-limit                                                       |
| **promptfooconfig.yaml**                    | Konfiguracija evalvacij promptfoo                                                                         |
| **.gitleaks.toml**                          | Nabor pravil gitleaks za pregled skrivnosti                                                               |
| **.zizmor.yml**                             | Konfiguracija varnostnega preverjanja GitHub Actions z orodjem zizmor                                     |
| **socket.yml**                              | Konfiguracija dobavne verige Socket.dev                                                                   |
| **news.json**                               | Lokaliziran vir obvestil v2; element za zagon Radarja je ob izdaji neaktiven                              |
| **flake.nix** / **flake.lock**              | Definicija razvojne lupine Nix + zaklepna datoteka                                                        |
| **.env**                                    | Lokalne skrivnosti (prezrte v Gitu — ustvarjene iz `.env.example`)                                        |

> **Premaknjeno iz korenske mape v različici v3.8.26 (razbremenitev):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` in ustvarjena datoteka `quality-metrics.json` (prezrta v Gitu). Glejte [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — aplikacija Next.js

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

| Pot                                                                          | Namen                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Javni OpenAI-compat API (~ 25 podpoti: klepet, dokončanja, vdelave, datoteke, paketi, zvok, slike, videi, glasba, prerazvrščanje, moderiranje, iskanje, ws, agenti, računi, ponudniki itd.)                                                                                                                                |
| `app/api/v1beta/`                                                            | Končne točke API v slogu Gemini                                                                                                                                                                                                                                                                                            |
| `app/api/playground/`                                                        | Poti Playground Studio: `improve-prompt/` (POST — LLM prompt rewriter), `presets/` (GET list / POST create), `presets/[id]/` (GET / PUT / DELETE) — glejte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                          |
| `app/api/` (ne-v1)                                                           | poti Management/admin (imeniki ~ 60: ponudniki, kombinacije, nastavitve, mcp, a2a, evals, memory, spretnosti, webhooks, skladnost, odpornost, spremljanje, tuneli, orodja cli itd.)                                                                                                                                        |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 poti (nadzor strežnika, agent state/DNS/mappings, bypass, cert, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Glej `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                              |
| `app/api/tools/traffic-inspector/`                                           | Prometni inšpektor REST + WS API — 16 poti + (zahteve, seje, gostitelji, načini zajemanja, izvoz, ws). LOCAL_ONLY + SPAWN_CAPABLE. Glej `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                         |
| `app/a2a/`                                                                   | A2A Vstopna točka JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                               |
| `app/.well-known/agent.json/`                                                | kartica agenta A2A (odkritje)                                                                                                                                                                                                                                                                                              |
| `app/(dashboard)/dashboard/`                                                 | Strani nadzorne plošče UI (50 odsekov +, datoteke ~ 118 page.tsx : ponudniki, kombinacije, nastavitve, pomnilnik, spretnosti, spletni kljuki, ocene, revizija, serija, predpomnilnik, stroški, zdravje, sistem, dejavnost itd.)                                                                                            |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search Tools Studio UI (3 zavihki: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — glejte `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                          |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (načrt 21): `page.tsx` (lupina s 3 zavihki), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | stran nadzorne plošče AgentBridge — strežniška kartica, 9 agentskih kartic, čarovnik za nastavitev, preslikava modela, obhodni seznam. i18n PT-BR + EN. Glej `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                             |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Stran nadzorne plošče Traffic Inspector — razdelitev DevTools, 7 zavihkov s podrobnostmi, 4 preklopi načina zajema, snemalnik seje, barvanje konteksta. i18n PT-BR + EN. Glej `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                      |
| `app/(dashboard)/dashboard/activity/`                                        | Stran z virom dejavnosti (skupina B): `page.tsx` (strežnik) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — glejte `docs/architecture/MONITORING_SECTIONS.md`                                                                                                        |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Stran za deljenje kvot (skupina B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                            |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Konfiguracijska stran načrta ponudnika (skupina B): `page.tsx` + `ProviderPlanConfigClient.tsx` — razsežnosti kvote na preglasitev povezave                                                                                                                                                                                |
| `app/docs/`                                                                  | Vdelan pregledovalnik dokumentacije (upodablja `docs/*.md`)                                                                                                                                                                                                                                                                |
| `app/landing/`                                                               | Tržna ciljna stran                                                                                                                                                                                                                                                                                                         |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Strani, povezane z avtorizacijo                                                                                                                                                                                                                                                                                            |
| `app/{400,401,403,408,429,500,502,503}/`                                     | strani HTTP                                                                                                                                                                                                                                                                                                                |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Static/status strani                                                                                                                                                                                                                                                                                                       |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Korenska postavitev, dom, manifest PWA, globalni CSS                                                                                                                                                                                                                                                                       |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Meje napak                                                                                                                                                                                                                                                                                                                 |

### `src/lib/` — osnovne knjižnice (~ 50 modulov)

| Modul                                    | Namen                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | upravitelj opravil protokola A2A, spretnosti (5), pretakanje                                                                                                                                                                                                                                                                 |
| `acp/`                                   | register agentov CLI (lokalno odkritje CLI — glejte `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                              |
| `api/`                                   | Pomočniki API v skupni rabi (`requireManagementAuth`, validacija)                                                                                                                                                                                                                                                            |
| `auth/`                                  | Seja, zgoščevanje gesel, preverjanje žetonov                                                                                                                                                                                                                                                                                 |
| `batches/`                               | OpenAI Paketi API obdelovalci                                                                                                                                                                                                                                                                                                |
| `catalog/`                               | Ponudnik katalog Zod validacija + zmožnost ločljivost                                                                                                                                                                                                                                                                        |
| `cloudAgent/`                            | Agenti v oblaku (Codex Cloud, Devin, Jules) – glejte `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                        |
| `combos/`                                | Pomočniki za preurejanje kombinirane ločljivosti +                                                                                                                                                                                                                                                                           |
| `audit/`                                 | Pomočniki za vir dejavnosti: `highLevelActions.ts` (seznam dovoljenih + `isHighLevelAction()`), `activityIcons.ts` (karta dejanj → icon/verb ), `timeline.ts` (groupByDay/relativeTime) — glejte `docs/architecture/MONITORING_SECTIONS.md`                                                                                  |
| `compliance/`                            | Revizija dnevnika + ponudnika – glejte `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                         |
| `compression/`                           | Lepilo za kompresijske motorje (motorji živijo v `open-sse/services/compression/`)                                                                                                                                                                                                                                           |
| `config/`                                | Pomočniki za konfiguracijo izvajalnega okolja                                                                                                                                                                                                                                                                                |
| `db/`                                    | 120 + domena DB moduli + 168 migracije (vedno pojdite tukaj za SQLite)                                                                                                                                                                                                                                                       |
| `quota/`                                 | Mehanizem delitve kvote: `dimensions.ts` (types/Zod), `types.ts` (vmesnik QuotaStore ), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — glejte `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Odjemalec kataloga brezplačnega modela radarja: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — glej `docs/frameworks/RADAR.md`                                                                                                                                 |
| `display/`                               | pomočniki za oblikovanje UI (cena, zakasnitev itd.)                                                                                                                                                                                                                                                                          |
| `embeddings/`                            | Pomočniki storitev vdelav                                                                                                                                                                                                                                                                                                    |
| `env/`                                   | Env razčlenjevanje spremenljivke + validacija                                                                                                                                                                                                                                                                                |
| `evals/`                                 | Ogrodje Eval (zbirke, runner, runtime) — glejte `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                                   |
| `guardrails/`                            | PII masker, takojšnja injekcija, vidni most — glejte `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                           |
| `jobs/`                                  | Opravila v ozadju (podobna cronu)                                                                                                                                                                                                                                                                                            |
| `memory/`                                | Pogovorni spomin (SQLite FTS5 + sqlite-vec hybrid RRF + Qdrant nivo 2) — glejte `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                  |
| `memory/embedding/`                      | Vdelana plast z več viri: `index.ts` (razreševalec), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (načrt 21)                                                                                                                                                                               |
| `memory/vectorStore.ts`                  | ovoj sqlite-vec v0.1.9 — KNN brute-force + hibridni RRF ( vektor FTS5 +, k = 60). Lazy-init, elegantno se poslabša, ko sqlite-vec ni na voljo. (načrt 21)                                                                                                                                                                    |
| `memory/reindex.ts`                      | `runReindexBatch()` — obdeluje spomine z `needs_reindex=1` v ozadju; kliče `POST /api/memory/reindex` in pot lenega zasipanja. (načrt 21)                                                                                                                                                                                    |
| `monitoring/`                            | Zdravstveni pregledi, meritve emisij                                                                                                                                                                                                                                                                                         |
| `oauth/`                                 | OAuth/import teče za 22 modulov ponudnika (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                        |
| `plugins/`                               | Register vtičnikov                                                                                                                                                                                                                                                                                                           |
| `promptCache/`                           | Prekinitvene točke predpomnilnika poziva v antropičnem slogu                                                                                                                                                                                                                                                                 |
| `skills/`                                | Ogrodje spretnosti (vgrajena tržnica + + SkillsSH) — glejte `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                      |
| `playground/`                            | Skupni pomočniki Playground Studio: `codeExport.ts` (curl/Python/TS generator), `promptImprover.ts` (meta-prompt builder), `streamMetrics.ts` (pure TTFT/TPS), `types.ts` (cenovna tabela) — glejte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                   |
| `webhookDispatcher.ts`                   | HMAC webhook dostava — glejte `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                  |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Upravljavci predorov — glej `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                      |
| `cloudSync.ts`, `initCloudSync.ts`       | Izbirna sinhronizacija stanja v oblaku                                                                                                                                                                                                                                                                                       |
| `localDb.ts`                             | Ponovni izvoz za module db (brez logike — samo ponovni izvoz)                                                                                                                                                                                                                                                                |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Zahtevaj predpomnjenje idempotence +                                                                                                                                                                                                                                                                                         |
| (~ še 30 datotek najvišje ravni)         | Specializirani pomočniki (logEnv, modelsDevSync, piiSanitizer itd.)                                                                                                                                                                                                                                                          |

### `src/lib/db/` — Baza podatkov (147 modulov + 208 migracij)

| Poddir                    | Namen                                                                                                                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | `getDbInstance()` singleton z vodenjem dnevnika WAL                                                                                                                                                     |
| `db/migrations/`          | Datoteke z različicami SQL (idempotentne, transakcijske). `073_memory_vec.sql` doda stolpec `memory_vec_meta` + `needs_reindex` (načrt 21).                                                             |
| `db/playgroundPresets.ts` | modul CRUD za prednastavitve Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)                           |
| `db/memoryVec.ts`         | CRUD za `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` itd. (načrt 21)                                              |
| `db/<domain>.ts`          | En modul na domeno: ponudniki, kombinacije, apiKeys, uporabniki, seje, uporaba, revizijski dnevnik, webhooks, spretnosti, memory_entries, cloud_agent_tasks, evals* \* , predpomnilnik_razumevanja itd. |

### `src/domain/`

| Modul                  | Namen                                                |
| ---------------------- | ---------------------------------------------------- |
| `policy.ts`            | Motor politike                                       |
| `fallbackPolicy.ts`    | Nadomestno drevo odločitev                           |
| `costRules.ts`         | Pravila za izračun stroškov                          |
| `lockoutPolicy.ts`     | politika zaklepanja Model/connection                 |
| `tagRouter.ts`         | Usmerjanje na podlagi oznak                          |
| `comboResolver.ts`     | Kombinirana ločljivost (uporablja kombinirani motor) |
| `modelAvailability.ts` | Preverjanje razpoložljivosti po modelu               |
| `assessment/`          | Ocena modela (1. faza RFC-AUTO-ACESSMENT )           |

### `src/server/`

| Modul    | Namen                                                                                                 |
| -------- | ----------------------------------------------------------------------------------------------------- |
| `authz/` | Avtorizacijski kanal: `classify` → `policies` → `enforce` — glejte `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | konfiguracijo CORS                                                                                    |
| `auth/`  | Vmesna programska oprema seje                                                                         |

### `src/shared/`

| Modul                            | Namen                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `components/`                    | Komponenta nadzorne plošče API: adapterji prek `packages/ui-kit` — glejte `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: imena ikon, ki jih uporabljajo komponente → Lucide (`<Icon>`)                                      |
| `constants/providers.ts`         | **377 ponudnikov** z Zod validacijo (vir resnice)                                                              |
| `constants/cliTools.ts`          | Zunanji register orodja CLI                                                                                    |
| `constants/routingStrategies.ts` | **20 strategij usmerjanja** s prioritetami                                                                     |
| `constants/publicApiRoutes.ts`   | Poti, ki zahtevajo overitev nosilca (v primerjavi z upravljanjem).                                             |
| `constants/upstreamHeaders.ts`   | Seznam zavrnjenih naslovov za zahteve navzgor                                                                  |
| `validation/schemas.ts`          | ~ 80 Zod (en sam vir resnice za pogodbe API )                                                                  |
| `validation/helpers.ts`          | pomočniki za preverjanje Zod (`validateBody` itd.)                                                             |
| `types/`                         | Vrste TS v skupni rabi                                                                                         |
| `contracts/`                     | Javne pogodbe API (uporablja `files:` v `package.json`)                                                        |
| `utils/circuitBreaker.ts`        | Odklopnik ponudnika (glejte `docs/architecture/RESILIENCE_GUIDE.md`)                                           |
| `utils/apiAuth.ts`               | validacija ključa API, preverjanje obsega                                                                      |
| `utils/fetchTimeout.ts`          | ovoji Timeout/abort za pridobivanje navzgor                                                                    |
| `utils/releaseNotes.ts`          | Zaprt razčlenjevalnik objav v2/legacy, lokalizacija in opustitev ID                                            |

---

## `open-sse/` — Delovni prostor pretočnega mehanizma

Ločen delovni prostor npm (`@omniroute/open-sse`). Upravlja obdelavo zahtev in izvajanje ponudnikov.

```
open-sse/
├── handlers/            # 16 datotek (12 obdelovalnikov + 4 pomožne datoteke): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search itd.
├── executors/           # 150 izvajalnih modulov (razredi, ki razširjajo BaseExecutor, in pomožne datoteke za posamezne ponudnike)
├── translator/          # Pretvorniki formatov (9 za zahteve, 9 za odgovore, 9 pomožnih)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ storitvenih modulov (combo, accountFallback, autoCombo, reasoningCache, prikriti način claude code/chatgpt, modelDeprecation, taskAwareRouter, workflowFSM itd.)
├── mcp-server/          # Strežnik MCP (110 orodij, 3 transporti, 33 obsegov)
├── config/              # Registri ponudnikov/modelov, konfiguracija glav, vzdevki modelov
├── utils/               # Odjemalec TLS, pridobivanje/razpošiljanje prek posredniškega strežnika, omrežni pripomočki
├── index.ts             # Vstopna točka delovnega prostora
├── package.json         # Manifest delovnega prostora
├── tsconfig.json        # Konfiguracija TS delovnega prostora
└── types.d.ts           # Deklaracije tipov delovnega prostora
```

### `open-sse/mcp-server/`

| Pot                         | Namen                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------ |
| `server.ts`                 | Življenjski cikel strežnika MCP (transporta stdio + HTTP)                            |
| `httpTransport.ts`          | Transporti HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                 |
| `audit.ts`                  | Beleženje revizij v tabelo `mcp_tool_audit`                                          |
| `scopeEnforcement.ts`       | Preverjanje obsega za posamezno orodje                                               |
| `runtimeHeartbeat.ts`       | Signal zdravja v `DATA_DIR/runtime/mcp-heartbeat.json`                               |
| `descriptionCompressor.ts`  | Stiskanje metapodatkov opisov orodij za prihranek konteksta                          |
| `schemas/tools.ts`          | 36 osnovnih definicij orodij + obsegi                                                |
| `tools/advancedTools.ts`    | Implementacije naprednih orodij                                                      |
| `tools/memoryTools.ts`      | 3 pomnilniška orodja (iskanje/dodajanje/brisanje)                                    |
| `tools/skillTools.ts`       | 4 orodja za veščine (seznam/omogočanje/izvajanje/izvedbe)                            |
| `tools/compressionTools.ts` | 5 orodij za stiskanje                                                                |
| `README.md`                 | Interni README strežnika MCP (navzkrižno povezan iz `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — Delovni prostori

| Pot                      | Namen                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — vključeni posnetek kompleta Keak CI UI Kit (`private`, `UNLICENSED`), uporabljen neposredno kot izvorna koda (brez gradnje). `UPSTREAM.md` določa izvorno revizijo in beleži licenčno dovoljenje; `PATCHES.md` navaja lokalne popravke (ni jih); `src/` se sinhronizira samo s skriptom `scripts/dev/sync-ui-kit.sh`, skladnost pa preverja `npm run check:ui-kit-snapshot`. Glejte `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — izbirna storitev nabora brskalnikov (klepet, podprt s CloakBrowser in Playwright)                                                                                                                                                                                                                                                                                                                                  |

---

## `electron/` — Namizni ovoj

| Datoteka         | Namen                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `main.js`        | Glavni proces Electron (BrowserWindow, vdelani strežnik Next.js, sistemski pladenj, samodejno posodabljanje) |
| `preload.js`     | Most IPC (contextBridge → `window.omniroute`)                                                                |
| `package.json`   | Konfiguracija electron-builder + odvisnosti Electron 41 in electron-builder 26.10                            |
| `assets/`        | Ikone aplikacije (Windows .ico, macOS .icns, Linux .png)                                                     |
| `dist-electron/` | Izhod gradnje (prezrto v gitu)                                                                               |
| `types.d.ts`     | Deklaracije tipov za most upodabljalnika                                                                     |
| `README.md`      | Interni README za Electron (glejte tudi `docs/guides/ELECTRON_GUIDE.md`)                                     |

---

## `bin/` — CLI

| Datoteka                                                                                                    | Namen                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Glavna vstopna točka CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` itd. |
| `reset-password.mjs`                                                                                        | Samostojni CLI za ponastavitev gesla                                                                                                |
| `cli/commands/setup.mjs`                                                                                    | Interaktivni + neinteraktivni čarovnik za nastavitev                                                                                |
| `cli/commands/doctor.mjs`                                                                                   | Diagnostika stanja sistema (8+ preverjanj)                                                                                          |
| `cli/commands/providers.mjs`                                                                                | Seznam/preizkus/preverjanje ponudnikov                                                                                              |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Pomožni moduli CLI                                                                                                                  |
| `cli/tray/tray.ts`                                                                                          | Integracija s sistemskim pladnjem (večplatformsko: NotifyIcon v Windows, systray2 v macOS/Linux)                                    |
| `cli/tray/tray.ps1`                                                                                         | Zaledje PowerShell NotifyIcon (Windows, brez novih binarnih datotek)                                                                |
| `cli/tray/autostart.ts`                                                                                     | Večplatformski samodejni zagon (LaunchAgent / .desktop / register)                                                                  |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5-stopenjska veriga razreševanja gonilnika SQLite (priloženi → izvajalno okolje → lena namestitev → node:sqlite → sql.js)           |
| `cli/runtime/magicBytes.mjs`                                                                                | Preverjanje magičnih bajtov binarnih datotek (ELF / Mach-O / Mach-O fat / PE)                                                       |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — vnaprej razreši gonilnike ob postinstall / prvem zagonu                                                        |
| `nodeRuntimeSupport.mjs`                                                                                    | Preveri podprto različico Node.js ob namestitvi                                                                                     |

---

## `skills/` — Javne veščine agentov

| Datoteka                     | Namen                                                                                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifestov veščin za zunanje agente umetne inteligence (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Skripti za gradnjo in preverjanje

| Skript                              | Namen                                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `run-next.mjs`                      | Zaganjalnik za razvoj/zagon z nalaganjem okoljskih spremenljivk                                        |
| `build-next-isolated.mjs`           | Samostojna gradnja (samostojni način Next.js 16)                                                       |
| `prepublish.ts`                     | Priprava paketa pred `npm pack`                                                                        |
| `postinstall.mjs`                   | Samodejno ustvari `.env` iz `.env.example` ob prvi namestitvi                                          |
| `sync-env.mjs`                      | Znova uskladi ključe `.env` z `.env.example`                                                           |
| `check-cycles.mjs`                  | Zazna krožne odvisnosti                                                                                |
| `check-route-validation.mjs`        | Preveri, ali imajo vse poti API validacijo Zod                                                         |
| `check-t11-any-budget.mjs`          | Uveljavi izrecno omejitev za `any` za vsako datoteko                                                   |
| `check-docs-sync.mjs`               | Preveri usklajenost različic dokumentacije (obstoječe preverjanje pred potrditvijo)                    |
| **`check-env-doc-sync.mjs`**        | NOVO: navzkrižno preveri okoljske spremenljivke v kodi, `.env.example` in `ENVIRONMENT.md`             |
| **`check-docs-counts-sync.mjs`**    | NOVO: preveri, ali se števila (izvajalci, strategije, OAuth, veščine A2A) ujemajo z dokumentacijo      |
| **`check-deprecated-versions.mjs`** | NOVO: označi zastarele različice/datume v dokumentaciji                                                |
| `check-supported-node-runtime.ts`   | Preveri, ali je trenutna različica Node podprta                                                        |
| `check-pr-test-policy.mjs`          | Uveljavi pravilo »zahtevani testi« pri spremembah produkcijske kode                                    |
| **`gen-provider-reference.ts`**     | NOVO: samodejno ustvari `docs/reference/PROVIDER_REFERENCE.md` iz kataloga                             |
| `i18n/generate-multilang.mjs`       | Prevede nize uporabniškega vmesnika in dokumentacijo z Google Translate                                |
| `i18n_autotranslate.py`             | Potek prevajanja dokumentacije, ki temelji na LLM                                                      |
| `validate_translation.py`           | Preverjanje prevoda za posamezno področno nastavitev                                                   |
| `check_translations.py`             | Preverjanje ključev i18n na strani kode                                                                |
| `run-playwright-tests.mjs`          | Zaganjalnik celovitih testov Playwright                                                                |
| `run-protocol-clients-tests.mjs`    | Zaganjalnik celovitih testov MCP/A2A                                                                   |
| `run-ecosystem-tests.mjs`           | Testi ekosistema (integracije ponudnikov)                                                              |
| `test-report-summary.mjs`           | Ustvari povzetek pokritosti v obliki markdown                                                          |
| `smoke-electron-packaged.mjs`       | Izvede osnovni preizkus zapakirane gradnje Electron                                                    |
| `native-binary-compat.mjs`          | Preveri, ali se izvorne odvisnosti (`better-sqlite3`) ujemajo z različico Node v Electronu             |
| `validate-pack-artifact.ts`         | Preveri izhod npm pack                                                                                 |
| `responses-ws-proxy.mjs`            | Most WebSocket za Codex Responses API                                                                  |
| `v1-ws-bridge.mjs`                  | Most WebSocket za končno točko `/api/v1/ws`                                                            |
| `standalone-server-ws.mjs`          | Zaganjalnik samostojnega strežnika WS                                                                  |
| `system-info.mjs`                   | Izpiše informacije o sistemu/izvajalnem okolju za podporo                                              |
| `healthcheck.mjs`                   | Enkratno preverjanje zdravja (uporablja ga Docker HEALTHCHECK)                                         |
| `uninstall.mjs`                     | Skript za čisto odstranitev                                                                            |
| `dev/sync-ui-kit.sh`                | Kopira `src/` kompleta CI UI Kit pri pripeti potrditvi v `packages/ui-kit/src`                         |
| `check/check-ui-kit-snapshot.mjs`   | Kontrola pred potrditvijo: `packages/ui-kit/src` se ujema s pripeto potrditvijo izvornega repozitorija |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — uporabljena imena ikon, ki jih `ICON_MAP` ne preslika                         |
| `dev/codemod-material-icons.mjs`    | Prepiše dobesedne elemente span za Material Symbols v `<Icon>` (orodje za migracijo)                   |

---

## `docs/` — javna dokumentacija (7 korenskih datotek + 17 podimenikov)

### Vodniki na najvišji ravni

| Doc                         | Namen                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Visokonivojska arhitektura, zemljevid podsistema, površina armaturne plošče               |
| `CODEBASE_DOCUMENTATION.md` | Inženirska referenca: imeniki, moduli, konvencije                                         |
| `FEATURES.md`               | Matrika funkcij s poudarki v3.8                                                           |
| `USER_GUIDE.md`             | Priročnik za končnega uporabnika (nastavitev, modeli, kombinacije, CLIs, zvok itd.)       |
| `API_REFERENCE.md`          | referenca končne točke API z modelom avtorizacije                                         |
| `openapi.yaml`              | specifikacije OpenAPI 3.0 (121 poti)                                                      |
| `SETUP_GUIDE.md`            | Metode namestitve (npm, npx, Docker, Electron, Termux, vir)                               |
| `ENVIRONMENT.md`            | Vse spremenljivke env (~ 800 dokumentiranih, ~ 3050 vrstic `.env.example`)                |
| `TROUBLESHOOTING.md`        | Pogoste napake + v3.8.0 znane težave                                                      |
| `RELEASE_CHECKLIST.md`      | Celoten tok izdaje (veščine, husky, običajne objave, uvedba)                              |
| `COVERAGE_PLAN.md`          | Cilji kritja in trenutno stanje                                                           |
| `FREE_TIERS.md`             | Izbrani brezplačni ponudniki (48 + brezplačno + 11 OAuth)                                 |
| `CLI-TOOLS.md`              | Zunanje integracije CLI + Notranji OmniRoute CLI                                          |
| `I18N.md`                   | arhitektura i18n, dodajanje jezika, 67 krajev                                             |
| `UNINSTALL.md`              | Koraki čiste odstranitve                                                                  |
| `PROVIDER_REFERENCE.md`     | **Samodejno ustvarjeno** katalog 377 ponudnikov (regen: `npm run gen:provider-reference`) |

### Podsistem globokih potopov

| Doc                                         | Namen                                                                                    |
| ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                             | strežnik MCP : 110 orodij, 3 transporti, 33 področij, končne točke REST                  |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC, 6 veščin, pomočniki REST, agentska kartica                           |
| `AGENT_PROTOCOLS_GUIDE.md`                  | Poenoten vodnik: A2A proti ACP proti agentom v oblaku                                    |
| `CLOUD_AGENT.md`                            | Codex Cloud / Devin / Jules orkestracija                                                 |
| `SKILLS.md`                                 | Ogrodje spretnosti (vgrajena tržnica + + SkillsSH + peskovnik)                           |
| `RADAR.md`                                  | Prekrivanje kataloga brezplačnega modela radarja (`RADAR_ENABLED`, privzeto izklopljeno) |
| `MEMORY.md`                                 | Pomnilniški sistem (SQLite FTS5 + Qdrant)                                                |
| `EVALS.md`                                  | Ogrodje Eval (zbirke, poteki, rubrike)                                                   |
| `GUARDRAILS.md`                             | PII masker, takojšnja injekcija, vidni most                                              |
| `COMPLIANCE.md`                             | Dnevnik nadzora, hramba, zavrnitev noLog                                                 |
| `WEBHOOKS.md`                               | Dostava webhooka s podpisom HMAC                                                         |
| `REASONING_REPLAY.md`                       | Hibridni predpomnilnik memory/SQLite za `reasoning_content`                              |
| `AUTHZ_GUIDE.md`                            | Avtorizacijski cevovod (`classify` → `policies` → `enforce`)                             |
| `RESILIENCE_GUIDE.md`                       | Odklopnik + ohladitev + zaklepanje modela                                                |
| `docs/security/STEALTH_GUIDE.md` (samo git) | TLS prstni odtis (JA3/JA4), Claude koda CCH, MITM cert                                   |
| `AUTO-COMBO.md`                             | Motor Auto Combo (16-faktorsko točkovanje, 6 paketov načinov, virtualna tovarna)         |

### Stiskanje

| Doc                             | Namen                                     |
| ------------------------------- | ----------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Pregled načinov stiskanja načrt +         |
| `COMPRESSION_ENGINES.md`        | Motorji Caveman + RTK registrska pogodba  |
| `COMPRESSION_RULES_FORMAT.md`   | JSON paketa pravil Caveman                |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventar paketa pravil za posamezni jezik |
| `RTK_COMPRESSION.md`            | RTK deklarativni cevovod (56 filtrov)     |

### Razporeditev

| Doc                          | Namen                                                              |
| ---------------------------- | ------------------------------------------------------------------ |
| `DOCKER_GUIDE.md`            | Docker build, profili (base/cli/host/cliproxyapi), Redis prikolica |
| `VM_DEPLOYMENT_GUIDE.md`     | Generična uvedba VM/VPS (Ubuntu/Debian + nginx + systemd)          |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Uvedba Fly.io (trenutno samo v Kitajščini)                         |
| `TERMUX_GUIDE.md`            | Android brez glave prek Termuxa                                    |
| `PWA_GUIDE.md`               | Progressive Web App install + service worker                       |
| `ELECTRON_GUIDE.md`          | Namizna aplikacija build + sign + distribute                       |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Lijak                              |
| `PROXY_GUIDE.md`             | 4-stopenjski izhodni proxy + 1proxy marketplace                    |

### Podimeniki

| Poddir                | Namen                                                                                                                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokalizirani prevodi dokumentov (41 jezikov)                                                                                                                                                          |
| `docs/screenshots/`   | Sredstva za slike za vodnike                                                                                                                                                                          |
| `_tasks/superpowers/` | Plans/specs iz velesil (`writing-plans`/`brainstorming`) raziskava + — izoliran repo z ločenimi različicami, ki ga glavno drevo ignorira. Glejte CLAUDE.md → "Artefakti načrtovanja in raziskovanja". |

---

## `tests/` — Zbirke testov

| Podimenik                            | Vrsta                                              | Izvajalnik                                   |
| ------------------------------------ | -------------------------------------------------- | -------------------------------------------- |
| `tests/unit/`                        | Testi enot (~4.800 datotek, najhitrejši)           | Izvorni izvajalnik testov Node               |
| `tests/integration/`                 | Integracijski testi več modulov in podatkovne baze | Izvorni izvajalnik testov Node (sočasnost 1) |
| `tests/e2e/`                         | E2E uporabniškega vmesnika in delovnih tokov       | Playwright                                   |
| `tests/e2e/protocol-clients.test.ts` | E2E MCP in A2A z dejanskimi odjemalci              | Odjemalci protokolov po meri                 |
| `tests/e2e/ecosystem.test.ts`        | Integracija ponudnikov (z uporabo omrežja)         | Izvorni izvajalnik testov Node               |

---

## `public/` — Statična sredstva

| Pot                 | Namen                                                                               |
| ------------------- | ----------------------------------------------------------------------------------- |
| `public/` (koren)   | Ikone spletnega mesta, robots.txt, manifest, storitveni delavec in slike za trženje |
| `public/providers/` | Logotipi ponudnikov PNG/SVG (uporabljeni na nadzorni plošči)                        |

---

## `config/` — Statične konfiguracije in stanje preverjanj kakovosti

Dobavljene predloge konfiguracij skupaj z različicami osnovnih vrednosti preverjanj kakovosti,
shranjenimi v repozitoriju (v v3.8.26 premaknjeno sem iz korena repozitorija, da ta ostane pregleden).

| Pot                                           | Namen                                                                                              |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Seznam področnih nastavitev in metapodatki (kanonični vir za število 42 področnih nastavitev)      |
| `config/i18n-schema.json`                     | Shema JSON za preverjanje datoteke `i18n.json`                                                     |
| `config/payloadRules.json`                    | Pravila za saniranje vhodnih koristnih vsebin                                                      |
| `config/quality/quality-baseline.json`        | Osnovna vrednost večmetričnega mehanizma zategovanja (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Zamrznjena osnovna vrednost kompleksnosti ESLint (`check-complexity.mjs`)                          |
| `config/quality/duplication-baseline.json`    | Zamrznjena osnovna vrednost podvajanja jscpd (`check-duplication.mjs`)                             |
| `config/quality/file-size-baseline.json`      | Zamrznjena osnovna vrednost velikosti posamezne datoteke (`check-file-size.mjs`)                   |
| `config/quality/test-discovery-baseline.json` | Zamrznjena osnovna vrednost osirotelih testov (`check-test-discovery.mjs`)                         |
| `config/quality/dependency-allowlist.json`    | Seznam dovoljenih odobrenih odvisnosti (`check-deps.mjs`)                                          |
| `config/quality/.license-allowlist.json`      | Seznam dovoljenih licenc SPDX (`check-licenses.mjs`)                                               |
| `config/quality/quality-metrics.json`         | Začasno zbrane metrike (ustvari jih `collect-metrics.mjs`; **prezrto v sistemu git**)              |

---

## `.github/` — Integracija z GitHubom

| Pot                                | Namen                                                                |
| ---------------------------------- | -------------------------------------------------------------------- |
| `.github/workflows/`               | Poteki dela GitHub Actions za CI/CD (lint, testi, pokritost, izdaja) |
| `.github/ISSUE_TEMPLATE/`          | Predloge za prijavo napak in predloge funkcionalnosti                |
| `.github/pull_request_template.md` | Predloga za PR                                                       |
| `.github/dependabot.yml`           | Konfiguracija posodabljanja odvisnosti                               |

---

## `.husky/` — Kavlji Git

| Datoteka     | Namen                                                                     |
| ------------ | ------------------------------------------------------------------------- |
| `pre-commit` | Zažene `lint-staged + check-docs-sync + check:any-budget:t11`             |
| `pre-push`   | Trenutno onemogočeno (zakomentirano). Ročno zaženite `npm run test:unit`. |
| `_/`         | Notranje datoteke Husky                                                   |

---

## `.claude/` — Poševni ukazi Claude Code

| Datoteka                                            | Namen                                                                 |
| --------------------------------------------------- | --------------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — zvišanje različice in samodejni dnevnik sprememb |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — celoten potek dela za izdajo                 |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Uvedba na VPS                                                         |
| `commands/capture-release-evidences-cc.md`          | Snemanje novih funkcionalnosti v brskalniku kot WebP                  |
| `commands/review-{prs,discussions}-cc.md`           | Razvrščanje GitHubovih PR-jev in razprav                              |
| `commands/{review-issues,implement-features}-cc.md` | Poteki dela za težave                                                 |
| `settings.local.json`                               | Nastavitve Claude Code za posamezen projekt                           |

---

## `.agents/` — Splošni poteki dela agentov (Codex / Cursor / itd.)

| Pot                      | Namen                                                  |
| ------------------------ | ------------------------------------------------------ |
| `workflows/*-ag.md`      | 11 definicij potekov dela (zrcalo `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definicij veščin z opombami za izvajanje v Codexu    |

> **Opomba:** Poteki dela in ukazi so trenutno bajt za bajtom enaki. Če je `.agents/` namenjen drugemu izvajalnemu okolju agentov (Codex), se morajo različice smiselno razlikovati.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Zunaj drevesa

Ti imeniki s predpono podčrtaja vsebujejo vsebino, ki ni vključena v distribucijo:

- **`_ideia/`** — oblikovalske opombe (kategorije defer / notfit / viable)
- **`_mono_repo/`** — zgodovinski podprojekti (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — kloni povezanih odprtokodnih projektov samo za branje (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api itd.) za navzkrižno preverjanje med razvojem
- **`_tasks/`** — datoteke za spremljanje nalog za posamezne izdaje (neformalno)

Ni vključeno v izhod `npm pack`. Glejte `.npmignore`.

---

## Ustvarjeno / prezrto v Gitu

| Pot                    | Namen                           |
| ---------------------- | ------------------------------- |
| `node_modules/`        | odvisnosti npm                  |
| `.next/`               | rezultat gradnje Next.js        |
| `coverage/`            | poročila o pokritosti c8        |
| `logs/`                | dnevniki izvajanja              |
| `package/`             | priprava paketa npm             |
| `.playwright-mcp/`     | testni artefakti Playwright MCP |
| `.issues/`             | lokalni predpomnilnik težav     |
| `tsconfig.tsbuildinfo` | inkrementalni predpomnilnik TS  |

---

## Nasveti za navigacijo

- **Ste nov sodelavec?** Preberite `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Dodajate ponudnika?** Sledite razdelku `docs/architecture/ARCHITECTURE.md § Adding a New Provider` in ga navzkrižno preverite z `docs/reference/PROVIDER_REFERENCE.md`.
- **Dodajate pot?** `docs/architecture/ARCHITECTURE.md § Adding a New API Route` + `src/shared/validation/schemas.ts`.
- **Dodajate orodje MCP?** `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Dodajate veščino A2A?** `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Izvajate lokalno?** `docs/guides/SETUP_GUIDE.md`.
- **Uvajate?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Objavljate izdajo?** `docs/ops/RELEASE_CHECKLIST.md` (in veščina Claude Code `/generate-release-cc`).
