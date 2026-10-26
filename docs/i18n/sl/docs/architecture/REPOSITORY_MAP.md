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
├── app/                 # App Router (strani + poti API + strani stanja + ciljna stran)
├── lib/                 # Osrednje knjižnice/domenski moduli (80 podimenikov + ~70 datotek na vrhnji ravni)
├── domain/              # Čista domenska logika (mehanizem pravilnikov, nadomestna možnost, stroški, zaklepanje, comboResolver, ocenjevanje)
├── server/              # Moduli samo za strežnik (cevovod authz, cors, vmesna programska oprema za preverjanje pristnosti) — ni jih mogoče uvoziti v odjemalca
├── shared/              # Varno deljeno med strežnikom in odjemalcem (konstante, tipi, preverjanje veljavnosti, pogodbe, pripomočki)
├── i18n/                # Konfiguracija next-intl + datoteke JSON s sporočili za posamezne jezike (67 jezikov)
├── middleware/          # Vmesna programska oprema Next.js (obogatitev zahtev, zaznavanje jezika)
├── mitm/                # Jedro posredniškega strežnika MITM: ustvarjanje/namestitev potrdil, obdelovalniki, cilji, pregledovalnik, maske, neposredno posredovanje
│   ├── handlers/        # 9 razredov obdelovalnikov agentov IDE, ki razširjajo MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Plast za zajem prometa: medpomnilnik (krožni medpomnilnik v pomnilniku), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Povezovalna koda za prilagoditvene vmesnike modelov (starejši združljivostni sloj)
├── scripts/             # Vgrajeni vzdrževalni skripti (npr. backfillAggregation)
├── sse/                 # Starejši obdelovalniki/storitve SSE (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Starejša shramba v pomnilniku (postopoma jo nadomešča src/lib/db)
├── types/               # Deljene datoteke s tipi TS
├── instrumentation.ts   # Telemetrijska kljuka Next.js (brskalnik + robno okolje)
├── instrumentation-node.ts  # Instrumentacija samo za Node
└── proxy.ts             # Vstopni združljivostni sloj za posredniški strežnik HTTP
```

### `src/app/` — App Router (Next.js 16)

| Pot                                                                          | Namen                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Javni API, združljiv z OpenAI (~25 podrejenih poti: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers itd.)                                                                                                                         |
| `app/api/v1beta/`                                                            | Končne točke API-ja v slogu Gemini                                                                                                                                                                                                                                                                                          |
| `app/api/playground/`                                                        | Poti za Playground Studio: `improve-prompt/` (POST — preoblikovalnik pozivov LLM), `presets/` (GET seznam / POST ustvarjanje), `presets/[id]/` (GET / PUT / DELETE) — glejte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                         |
| `app/api/` (brez v1)                                                         | Poti za upravljanje/skrbništvo (~60 imenikov: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools itd.)                                                                                                                                          |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 poti (nadzor strežnika, stanje agenta/DNS/preslikave, obhod, potrdilo, nadrejeni CA). LOCAL_ONLY + SPAWN_CAPABLE. Glejte `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                     |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — več kot 16 poti (zahteve, seje, gostitelji, načini zajemanja, izvoz, ws). LOCAL_ONLY + SPAWN_CAPABLE. Glejte `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                   |
| `app/a2a/`                                                                   | Vstopna točka A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                                |
| `app/.well-known/agent.json/`                                                | Kartica agenta A2A (odkrivanje)                                                                                                                                                                                                                                                                                             |
| `app/(dashboard)/dashboard/`                                                 | Strani uporabniškega vmesnika nadzorne plošče (več kot 50 razdelkov, ~118 datotek page.tsx: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity itd.)                                                                                                        |
| `app/(dashboard)/dashboard/search-tools/`                                    | Uporabniški vmesnik Search Tools Studio (3 zavihki: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — glejte `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                          |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (načrt 21): `page.tsx` (ogrodje s 3 zavihki), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Stran nadzorne plošče AgentBridge — kartica strežnika, 9 kartic agentov, čarovnik za nastavitev, preslikava modelov, seznam obhodov. i18n PT-BR + EN. Glejte `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                              |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Stran nadzorne plošče Traffic Inspector — razdeljeni pogled DevTools, 7 zavihkov s podrobnostmi, 4 preklopniki načinov zajemanja, snemalnik sej, kontekstno barvno označevanje. i18n PT-BR + EN. Glejte `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                             |
| `app/(dashboard)/dashboard/activity/`                                        | Stran vira dejavnosti (skupina B): `page.tsx` (strežniška komponenta) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — glejte `docs/architecture/MONITORING_SECTIONS.md`                                                                                               |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Stran za deljenje kvot (skupina B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                             |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Stran za konfiguracijo paketov ponudnika (skupina B): `page.tsx` + `ProviderPlanConfigClient.tsx` — preglasitev dimenzij kvot za posamezno povezavo                                                                                                                                                                         |
| `app/docs/`                                                                  | Vdelan pregledovalnik dokumentacije (upodablja `docs/*.md`)                                                                                                                                                                                                                                                                 |
| `app/landing/`                                                               | Trženjska ciljna stran                                                                                                                                                                                                                                                                                                      |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Strani, povezane z avtentikacijo                                                                                                                                                                                                                                                                                            |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Strani z napakami HTTP                                                                                                                                                                                                                                                                                                      |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statične strani in strani s stanjem                                                                                                                                                                                                                                                                                         |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Korenska postavitev, domača stran, manifest PWA, globalni CSS                                                                                                                                                                                                                                                               |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Meje za obravnavo napak                                                                                                                                                                                                                                                                                                     |

### `src/lib/` — Temeljne knjižnice (~50 modulov)

| Modul                                    | Namen                                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Upravljalnik opravil protokola A2A, veščine (5), pretočno izvajanje                                                                                                                                                                                                                                                              |
| `acp/`                                   | Register agentov CLI (lokalno odkrivanje CLI — glejte `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                |
| `api/`                                   | Skupni pomožni moduli API (`requireManagementAuth`, preverjanje veljavnosti)                                                                                                                                                                                                                                                     |
| `auth/`                                  | Seje, zgoščevanje gesel, preverjanje veljavnosti žetonov                                                                                                                                                                                                                                                                         |
| `batches/`                               | Obdelovalniki za OpenAI Batches API                                                                                                                                                                                                                                                                                              |
| `catalog/`                               | Preverjanje veljavnosti kataloga ponudnikov z Zod + razreševanje zmogljivosti                                                                                                                                                                                                                                                    |
| `cloudAgent/`                            | Agenti v oblaku (Codex Cloud, Devin, Jules) — glejte `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                            |
| `combos/`                                | Pomožni moduli za razreševanje kombinacij + spreminjanje vrstnega reda                                                                                                                                                                                                                                                           |
| `audit/`                                 | Pomožni moduli za vir dejavnosti: `highLevelActions.ts` (seznam dovoljenih + `isHighLevelAction()`), `activityIcons.ts` (preslikava dejanja → ikona/glagol), `timeline.ts` (groupByDay/relativeTime) — glejte `docs/architecture/MONITORING_SECTIONS.md`                                                                         |
| `compliance/`                            | Dnevnik revizije + revizija ponudnikov — glejte `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                    |
| `compression/`                           | Povezovalna plast mehanizma za stiskanje (mehanizmi so v `open-sse/services/compression/`)                                                                                                                                                                                                                                       |
| `config/`                                | Pomožni moduli za konfiguracijo med izvajanjem                                                                                                                                                                                                                                                                                   |
| `db/`                                    | Več kot 120 domenskih modulov podatkovne zbirke + 168 migracij (za SQLite vedno dostopajte prek tega modula)                                                                                                                                                                                                                     |
| `quota/`                                 | Mehanizem za skupno rabo kvot: `dimensions.ts` (tipi/Zod), `types.ts` (vmesnik QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — glejte `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Odjemalec kataloga brezplačnih modelov Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — glejte `docs/frameworks/RADAR.md`                                                                                                                                     |
| `display/`                               | Pomožne funkcije za oblikovanje uporabniškega vmesnika (stroški, zakasnitev itd.)                                                                                                                                                                                                                                                |
| `embeddings/`                            | Pomožne funkcije storitve za vdelave                                                                                                                                                                                                                                                                                             |
| `env/`                                   | Razčlenjevanje in preverjanje veljavnosti okoljskih spremenljivk                                                                                                                                                                                                                                                                 |
| `evals/`                                 | Ogrodje za vrednotenje (zbirke, izvajalnik, izvajalno okolje) — glejte `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                |
| `guardrails/`                            | Prikrivanje osebno določljivih podatkov, zaščita pred vrivanjem pozivov, most za vid — glejte `docs/security/GUARDRAILS.md`                                                                                                                                                                                                      |
| `jobs/`                                  | Opravila v ozadju (podobna cron-u)                                                                                                                                                                                                                                                                                               |
| `memory/`                                | Pogovorni pomnilnik (hibridni RRF s SQLite FTS5 in sqlite-vec + Qdrant 2. ravni) — glejte `docs/frameworks/MEMORY.md`                                                                                                                                                                                                            |
| `memory/embedding/`                      | Večizvorna plast za vdelave: `index.ts` (razreševalnik), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (načrt 21)                                                                                                                                                                               |
| `memory/vectorStore.ts`                  | Ovoj za sqlite-vec v0.1.9 — iskanje KNN z grobo silo + hibridni RRF (FTS5 + vektor, k=60). Inicializira se ob prvi uporabi in se brez težav prilagodi, ko sqlite-vec ni na voljo. (načrt 21)                                                                                                                                     |
| `memory/reindex.ts`                      | `runReindexBatch()` — v ozadju obdela pomnilniške zapise z `needs_reindex=1`; kličejo ga `POST /api/memory/reindex` in pot sprotnega dopolnjevanja. (načrt 21)                                                                                                                                                                   |
| `monitoring/`                            | Preverjanja stanja, oddajanje metrik                                                                                                                                                                                                                                                                                             |
| `oauth/`                                 | Poteki OAuth/uvoza za 22 modulov ponudnikov (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                          |
| `plugins/`                               | Register vtičnikov                                                                                                                                                                                                                                                                                                               |
| `promptCache/`                           | Prelomne točke predpomnilnika pozivov v slogu Anthropic                                                                                                                                                                                                                                                                          |
| `skills/`                                | Ogrodje veščin (vgrajene + tržnica + SkillsSH) — glejte `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                              |
| `playground/`                            | Skupni pomožni moduli za Playground Studio: `codeExport.ts` (generator za curl/Python/TS), `promptImprover.ts` (gradnik meta-pozivov), `streamMetrics.ts` (čisti TTFT/TPS), `types.ts` (tabela cen) — glejte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                              |
| `webhookDispatcher.ts`                   | Dostava webhookov HMAC — glejte `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                    |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Upravljalniki tunelov — glejte `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                       |
| `cloudSync.ts`, `initCloudSync.ts`       | Izbirna sinhronizacija stanja z oblakom                                                                                                                                                                                                                                                                                          |
| `localDb.ts`                             | Zbirni modul za ponovni izvoz modulov db (brez logike — samo ponovni izvozi)                                                                                                                                                                                                                                                     |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Predpomnjenje zahtev + idempotentnost                                                                                                                                                                                                                                                                                            |
| (~30 dodatnih datotek na najvišji ravni) | Specializirani pomožni moduli (logEnv, modelsDevSync, piiSanitizer itd.)                                                                                                                                                                                                                                                         |

### `src/lib/db/` — Podatkovna zbirka (147 modulov + 208 migracij)

| Podimenik                 | Namen                                                                                                                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Edinec `getDbInstance()` z beleženjem WAL                                                                                                                                     |
| `db/migrations/`          | Različicami označene datoteke SQL (idempotentne, transakcijske). `073_memory_vec.sql` doda `memory_vec_meta` + stolpec `needs_reindex` (načrt 21).                            |
| `db/playgroundPresets.ts` | Modul CRUD za prednastavitve Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD za `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` itd. (načrt 21)                    |
| `db/<domain>.ts`          | En modul na domeno: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache itd.        |

### `src/domain/`

| Modul                  | Namen                                                       |
| ---------------------- | ----------------------------------------------------------- |
| `policy.ts`            | Mehanizem pravilnikov                                       |
| `fallbackPolicy.ts`    | Odločitveno drevo za nadomestno izvajanje                   |
| `costRules.ts`         | Pravila za izračun stroškov                                 |
| `lockoutPolicy.ts`     | Pravilnik zaklepanja modelov/povezav                        |
| `tagRouter.ts`         | Usmerjanje na podlagi oznak                                 |
| `comboResolver.ts`     | Razreševanje kombinacij (uporablja ga mehanizem kombinacij) |
| `modelAvailability.ts` | Preverjanje razpoložljivosti posameznega modela             |
| `assessment/`          | Ocenjevanje modelov (1. faza RFC-AUTO-ASSESSMENT )          |

### `src/server/`

| Modul    | Namen                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------- |
| `authz/` | Tok avtorizacije: `classify` → `policies` → `enforce` — glejte `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Konfiguracija CORS                                                                                |
| `auth/`  | Vmesna programska oprema seje                                                                     |

### `src/shared/`

| Modul                            | Namen                                                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `components/`                    | API komponent nadzorne plošče: prilagoditvene plasti nad `packages/ui-kit` — glejte `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: imena ikon, ki jih uporabljajo zasloni → komponente Lucide (`<Icon>`)                                        |
| `constants/providers.ts`         | **375 ponudnikov** s preverjanjem veljavnosti Zod (vir resnice)                                                          |
| `constants/cliTools.ts`          | Register zunanjih orodij CLI                                                                                             |
| `constants/routingStrategies.ts` | **20 strategij usmerjanja** s prioritetami                                                                               |
| `constants/publicApiRoutes.ts`   | Poti, ki zahtevajo avtentikacijo Bearer (namesto upravljavske)                                                           |
| `constants/upstreamHeaders.ts`   | Seznam prepovedanih glav za zahteve do nadrejenih strežnikov                                                             |
| `validation/schemas.ts`          | ~80 shem Zod (enotni vir resnice za pogodbe API)                                                                         |
| `validation/helpers.ts`          | Pomožne funkcije za preverjanje veljavnosti Zod (`validateBody` itd.)                                                    |
| `types/`                         | Skupni tipi TS                                                                                                           |
| `contracts/`                     | Javne pogodbe API (uporablja jih `files:` v `package.json`)                                                              |
| `utils/circuitBreaker.ts`        | Varovalka tokokroga ponudnika (glejte `docs/architecture/RESILIENCE_GUIDE.md`)                                           |
| `utils/apiAuth.ts`               | Preverjanje veljavnosti ključa API in obsega                                                                             |
| `utils/fetchTimeout.ts`          | Ovojnice za časovno omejitev/prekinitev pridobivanja iz nadrejenih strežnikov                                            |
| `utils/releaseNotes.ts`          | Razčlenjevalnik obvestil za zaprto različico v2/starejše različice, lokalizacija in opustitev po ID-ju                   |

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

## `docs/` — Javna dokumentacija (7 datotek v korenu + 17 podimenikov)

### Vodniki na najvišji ravni

| Dokument                    | Namen                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Visokonivojska arhitektura, zemljevid podsistemov, površina nadzorne plošče                         |
| `CODEBASE_DOCUMENTATION.md` | Inženirska referenca: imeniki, moduli, dogovori                                                     |
| `FEATURES.md`               | Matrika funkcij s poudarki različice v3.8                                                           |
| `USER_GUIDE.md`             | Priročnik za končne uporabnike (nastavitev, modeli, kombinacije, CLI-ji, zvok itd.)                 |
| `API_REFERENCE.md`          | Referenca končnih točk API-ja z modelom avtentikacije                                               |
| `openapi.yaml`              | Specifikacija OpenAPI 3.0 (121 poti)                                                                |
| `SETUP_GUIDE.md`            | Načini namestitve (npm, npx, Docker, Electron, Termux, izvorna koda)                                |
| `ENVIRONMENT.md`            | Vse okoljske spremenljivke (~800 dokumentiranih, ~3.050 vrstic v `.env.example`)                    |
| `TROUBLESHOOTING.md`        | Pogoste napake + znane težave v3.8.0                                                                |
| `RELEASE_CHECKLIST.md`      | Celoten postopek izdaje (veščine, husky, conventional commits, uvedba)                              |
| `COVERAGE_PLAN.md`          | Cilji pokritosti in trenutno stanje                                                                 |
| `FREE_TIERS.md`             | Izbrani ponudniki brezplačnih paketov (48+ brezplačnih + 11 OAuth)                                  |
| `CLI-TOOLS.md`              | Zunanje integracije CLI + notranji CLI OmniRoute                                                    |
| `I18N.md`                   | Arhitektura i18n, dodajanje jezika, 67 področnih nastavitev                                         |
| `UNINSTALL.md`              | Koraki za čisto odstranitev                                                                         |
| `PROVIDER_REFERENCE.md`     | **Samodejno ustvarjen** katalog 375 ponudnikov (ponovna izdelava: `npm run gen:provider-reference`) |

### Poglobljeni pregledi podsistemov

| Dokument                                    | Namen                                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `MCP-SERVER.md`                             | Strežnik MCP: 110 orodij, 3 prenosi, 33 obsegov, končne točke REST                         |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC, 6 veščin, pomožne funkcije REST, kartica agenta                        |
| `AGENT_PROTOCOLS_GUIDE.md`                  | Poenoten vodnik: A2A v primerjavi z ACP in Cloud Agents                                    |
| `CLOUD_AGENT.md`                            | Orkestracija Codex Cloud / Devin / Jules                                                   |
| `SKILLS.md`                                 | Ogrodje veščin (vgrajene + tržnica + SkillsSH + peskovnik)                                 |
| `RADAR.md`                                  | Prekrivna plast kataloga brezplačnih modelov Radar (`RADAR_ENABLED`, privzeto izklopljeno) |
| `MEMORY.md`                                 | Pomnilniški sistem (SQLite FTS5 + Qdrant)                                                  |
| `EVALS.md`                                  | Ogrodje za vrednotenje (zbirke, izvajanja, merila)                                         |
| `GUARDRAILS.md`                             | Maskiranje PII, vstavljanje pozivov, most za vid                                           |
| `COMPLIANCE.md`                             | Dnevnik revizij, hramba, izključitev noLog                                                 |
| `WEBHOOKS.md`                               | Dostava spletnih kavljev, podpisanih s HMAC                                                |
| `REASONING_REPLAY.md`                       | Hibridni pomnilnik/predpomnilnik SQLite za `reasoning_content`                             |
| `AUTHZ_GUIDE.md`                            | Cevovod avtorizacije (`classify` → `policies` → `enforce`)                                 |
| `RESILIENCE_GUIDE.md`                       | Odklopnik + obdobje ohlajanja + zaklep modela                                              |
| `docs/security/STEALTH_GUIDE.md` (samo git) | Prstni odtisi TLS (JA3/JA4), Claude Code CCH, potrdilo MITM                                |
| `AUTO-COMBO.md`                             | Pogon Auto Combo (16-faktorsko točkovanje, 6 paketov načinov, virtualna tovarna)           |

### Stiskanje

| Dokument                        | Namen                                     |
| ------------------------------- | ----------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Pregled načinov stiskanja + časovni načrt |
| `COMPRESSION_ENGINES.md`        | Pogoni Caveman + RTK, pogodba registra    |
| `COMPRESSION_RULES_FORMAT.md`   | Shema JSON paketa pravil Caveman          |
| `COMPRESSION_LANGUAGE_PACKS.md` | Popis paketov pravil za posamezne jezike  |
| `RTK_COMPRESSION.md`            | Deklarativni cevovod RTK (49 filtrov)     |

### Uvajanje

| Dokument                     | Namen                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Gradnja z Dockerjem, profili (base/cli/host/cliproxyapi), stranski vsebnik Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Splošna namestitev na VM/VPS (Ubuntu/Debian + nginx + systemd)                   |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Namestitev na Fly.io (trenutno samo v kitajščini)                                |
| `TERMUX_GUIDE.md`            | Brezglavo izvajanje v sistemu Android prek Termuxa                               |
| `PWA_GUIDE.md`               | Namestitev progresivne spletne aplikacije + storitveni delavec                   |
| `ELECTRON_GUIDE.md`          | Gradnja + podpisovanje + distribucija namizne aplikacije                         |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                           |
| `PROXY_GUIDE.md`             | 4-nivojski izhodni posredniški strežnik + tržnica 1proxy                         |

### Podimeniki

| Podimenik             | Namen                                                                                                                                                                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokalizirani prevodi dokumentacije (41 jezikovnih različic)                                                                                                                                                                         |
| `docs/screenshots/`   | Slikovna sredstva za vodnike                                                                                                                                                                                                        |
| `_tasks/superpowers/` | Načrti/specifikacije iz superpowers (`writing-plans`/`brainstorming`) + raziskave — izoliran repozitorij z ločenim različicanjem, ki ga glavno drevo prezre prek gitignore. Glejte CLAUDE.md → »Artefakti načrtovanja in raziskav«. |

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
