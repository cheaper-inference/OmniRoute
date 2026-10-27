# Repository Map (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Opis u jednom redu za svaki direktorij i datoteku u korijenu.**
> Posljednje ažuriranje: 2026-06-28 — OmniRoute v3.8.40
>
> Koristite ovu mapu za brzo kretanje kroz bazu koda. Za detaljniji pregled slijedite poveznice do namjenske dokumentacije.

## Stablo najvišeg nivoa

```
OmniRoute/
├── src/                  # Next.js 16 aplikacija (UI + API rute + biblioteke + domena + poslužitelj)
├── open-sse/             # Radni prostor mehanizma za strujanje (obrađivači, izvršitelji, prevodilac, MCP poslužitelj)
├── packages/            # npm radni prostori: ui-kit (uključeni Keak CI UI Kit) i browser-pool
├── electron/             # Omotač za desktop aplikaciju (Electron 41 + electron-builder 26.10)
├── bin/                  # Ulazna tačka CLI-ja i obrađivači naredbi
├── scripts/              # Skripte za izgradnju, provjeru, sinhronizaciju i jednokratne zadatke
├── docs/                 # Javna dokumentacija (ovdje se nalazite)
├── tests/                # Svi skupovi testova (jedinični, integracijski, e2e, klijenti protokola)
├── public/               # Next.js statički resursi, PWA manifest, service worker, ikone
├── config/               # Statička konfiguracija + stanje provjere kvaliteta (i18n, payloadRules, quality/)
├── images/               # Slike za marketing / README
├── @omniroute/           # Prateći paketi koji se mogu objaviti (opencode-plugin, opencode-provider)
├── skills/               # Paketi vještina za CLI/agente (cli-* + omni-* + config-codex-cli)
├── examples/             # Primjeri dodataka + početni predložak omniroute-cmd-hello
├── contrib/              # Doprinosi zajednice (podman/)
├── .source/              # Konfiguracija izvora za Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actions radni tokovi + predlošci za probleme + PR predložak
├── .husky/               # Git kuke (pre-commit, pre-push)
├── .claude/              # Claude Code kose naredbe (ograničene na projekt)
├── .agents/              # Codex / generički radni tokovi i vještine agenata (kopija direktorija .claude/)
├── .vscode/              # Postavke VS Code radnog prostora
├── _ideia/               # Bilješke za planiranje (neformalne; ne isporučuju se)
├── _mono_repo/           # Historijski potprojekti (cloud, site, vscode-extension)
├── _references/          # Referentni klonovi povezanih OSS projekata namijenjeni samo za čitanje
├── _tasks/               # Datoteke za praćenje zadataka po izdanju (neformalne)
├── .build/ .worktrees/ dist/   # Lokalni privremeni podaci za izgradnju / git-worktree / izlaz izgradnje (gitignored)
├── .issues/              # Lokalna predmemorija problema (gitignored)
├── .playwright-mcp/      # Artefakti Playwright MCP testova
├── coverage/             # Izlaz c8 pokrivenosti (gitignored)
├── logs/                 # Dnevnici izvođenja (gitignored)
├── node_modules/         # Zavisnosti (gitignored)
├── package/              # Pripremno područje za npm pack (artefakt izgradnje)
├── .next/                # Izlaz Next.js izgradnje (gitignored)
└── (datoteke u korijenu — pogledajte ispod)
```

---

## Datoteke u korijenu

| Datoteka                                    | Namjena                                                                                                    |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Marketinška odredišna stranica + brzi početak + matrica funkcionalnosti (pogledajte i `llm.txt`)           |
| **CHANGELOG.md**                            | Dnevnik promjena po izdanju (automatski generisan pomoću vještine `/version-bump-cc`)                      |
| **LICENSE**                                 | Tekst MIT licence                                                                                          |
| **CLAUDE.md**                               | Projektna pravila za Claude Code agente (stroga pravila, konvencije, scenariji)                            |
| **AGENTS.md**                               | Isto kao CLAUDE.md, ali za AI agente koji nisu Claude (Codex, Cursor itd.)                                 |
| **GEMINI.md**                               | Sažeta pravila za agente zasnovane na Geminiju (podskup dokumenta CLAUDE.md)                               |
| **CONTRIBUTING.md**                         | Vodič za doprinosioce: postavljanje, konvencionalne commit poruke, testiranje, PR proces                   |
| **SECURITY.md**                             | Pravila prijavljivanja ranjivosti, podržane verzije, model prijetnji                                       |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — očekivanja u pogledu ponašanja zajednice                                            |
| **llm.txt**                                 | Odredišna stranica u običnom tekstu optimizovana za LLM pretraživače (SEO za AI asistente)                 |
| **package.json**                            | npm manifest, skripte, zavisnosti, mehanizmi, c8 prag pokrivenosti                                         |
| **package-lock.json**                       | Zaključano stablo zavisnosti                                                                               |
| **tsconfig.json**                           | Korijenska TypeScript konfiguracija                                                                        |
| **tsconfig.typecheck-core.json**            | Konfiguracija provjere tipova za jezgru `src/`                                                             |
| **tsconfig.typecheck-noimplicit-core.json** | Stroga (`noImplicitAny`) provjera tipova                                                                   |
| **tsconfig.tsbuildinfo**                    | Keš inkrementalne TS izgradnje (gitignored)                                                                |
| **next.config.mjs**                         | Konfiguracija izgradnje za Next.js 16 (samostalni izlaz)                                                   |
| **next-env.d.ts**                           | Automatski generisani tipovi okruženja za Next.js                                                          |
| **eslint.config.mjs**                       | ESLint ravna konfiguracija (pravila po području projekta)                                                  |
| **prettier.config.mjs**                     | Prettier pravila formatiranja                                                                              |
| **postcss.config.mjs**                      | PostCSS konfiguracija za Tailwind/CSS proces                                                               |
| **playwright.config.ts**                    | Konfiguracija Playwright E2E testova                                                                       |
| **vitest.config.ts**                        | Vitest konfiguracija (zadani skup testova)                                                                 |
| **vitest.mcp.config.ts**                    | Vitest konfiguracija za MCP server / autoCombo / skupove testova keša                                      |
| **sonar-project.properties**                | SonarQube/SonarCloud konfiguracija (kvalitet koda)                                                         |
| **Dockerfile**                              | Višefazna Docker izgradnja (builder → runner-base → runner-cli)                                            |
| **docker-compose.yml**                      | Razvojna compose konfiguracija s 4 profila (base, cli, host, cliproxyapi) + redis pomoćni servis           |
| **docker-compose.prod.yml**                 | Produkcijska compose konfiguracija (port 20130, redis, imenovani volumeni)                                 |
| **.dockerignore**                           | Datoteke isključene iz Docker konteksta                                                                    |
| **fly.toml**                                | Konfiguracija implementacije za Fly.io (regija `sin`, port 20128, volumen /data)                           |
| **.env.example**                            | Predložak datoteke okruženja (automatski se kopira u `.env` pri prvoj instalaciji)                         |
| **.gitignore**                              | Git obrasci ignorisanja                                                                                    |
| **.npmignore**                              | Lista isključenja pri npm objavljivanju                                                                    |
| **.npmrc**                                  | npm konfiguracija (registar, pravila za lockfile)                                                          |
| **.node-version**                           | Fiksirana verzija Nodea (koriste je alati kompatibilni s nvm-om)                                           |
| **.nvmrc**                                  | Fiksirana verzija Nodea za nvm                                                                             |
| **eslint.complexity.config.mjs**            | ESLint konfiguracija za postepeno ograničavanje složenosti (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | ESLint konfiguracija za SonarJS pravila (kognitivna složenost / dupliciranje)                              |
| **source.config.ts**                        | Fumadocs `defineDocs` konfiguracija izvora (popunjava `.source/`)                                          |
| **knip.json**                               | Knip konfiguracija — nekorištene datoteke/izvozi/zavisnosti (ulaz za provjeru mrtvog koda)                 |
| **stryker.conf.json**                       | Konfiguracija Stryker mutacijskog testiranja                                                               |
| **.size-limit.json**                        | Konfiguracija ograničenja veličine paketa za size-limit                                                    |
| **promptfooconfig.yaml**                    | Konfiguracija evaluacije za promptfoo                                                                      |
| **.gitleaks.toml**                          | Skup pravila za gitleaks skeniranje tajni                                                                  |
| **.zizmor.yml**                             | Konfiguracija sigurnosne provjere GitHub Actionsa pomoću alata zizmor                                      |
| **socket.yml**                              | Konfiguracija lanca snabdijevanja za Socket.dev                                                            |
| **news.json**                               | Lokalizirani izvor v2 obavijesti; stavka o pokretanju Radara isporučuje se neaktivna                       |
| **flake.nix** / **flake.lock**              | Definicija Nix razvojnog okruženja + zaključavanje                                                         |
| **.env**                                    | Lokalne tajne (Git ih ignoriše — generirano iz `.env.example`)                                             |

> **Premješteno iz korijenskog direktorija u v3.8.26 (smanjenje nereda):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` i generirani `quality-metrics.json` (Git ga ignoriše). Pogledajte [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js aplikacija

```
src/
├── app/                 # App Router (stranice + API rute + statusne stranice + odredišna stranica)
├── lib/                 # Osnovne biblioteke / domenski moduli (80 poddirektorija + ~70 datoteka najvišeg nivoa)
├── domain/              # Čista domenska logika (mehanizam politika, rezervna opcija, trošak, zaključavanje, comboResolver, procjena)
├── server/              # Moduli samo za server (autorizacijski cjevovod, cors, autentifikacijski middleware) — ne mogu se uvoziti iz klijenta
├── shared/              # Dijeljeno između servera i klijenta gdje je sigurno (konstante, tipovi, validacija, ugovori, pomoćni alati)
├── i18n/                # next-intl konfiguracija + JSON poruke za svaki lokalitet (67 lokaliteta)
├── middleware/          # Next.js middleware (obogaćivanje zahtjeva, otkrivanje lokaliteta)
├── mitm/                # Jezgra MITM proxyja: generiranje/instalacija certifikata, rukovatelji, ciljevi, inspektor, maske, direktno prosljeđivanje
│   ├── handlers/        # 9 klasa rukovatelja IDE agenata koje proširuju MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Sloj za bilježenje saobraćaja: međuspremnik (prsten u memoriji), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Poveznički kod za adapter modela (naslijeđeni sloj kompatibilnosti)
├── scripts/             # Skripte za održavanje unutar stabla (npr. backfillAggregation)
├── sse/                 # Naslijeđeni SSE rukovatelji/servisi (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Naslijeđeno spremište u memoriji (postepeno se zamjenjuje sa src/lib/db)
├── types/               # Dijeljene datoteke TS tipova
├── instrumentation.ts   # Next.js priključak za telemetriju (preglednik + edge)
├── instrumentation-node.ts  # Instrumentacija samo za Node
└── proxy.ts             # Ulazni sloj kompatibilnosti za HTTP proxy
```

### `src/app/` — App Router (Next.js 16)

| Putanja                                                                      | Namjena                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                                | Javni API kompatibilan s OpenAI-jem (~25 podruta: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers itd.)                                                                                                                        |
| `app/api/v1beta/`                                                            | Krajnje tačke API-ja u Gemini stilu                                                                                                                                                                                                                                                                                      |
| `app/api/playground/`                                                        | Rute za Playground Studio: `improve-prompt/` (POST — LLM alat za prepisivanje upita), `presets/` (GET lista / POST kreiranje), `presets/[id]/` (GET / PUT / DELETE) — pogledajte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                  |
| `app/api/` (non-v1)                                                          | Rute za upravljanje/administraciju (~60 direktorija: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools itd.)                                                                                                                                |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 ruta (upravljanje serverom, stanje agenta/DNS/mapiranja, zaobilaženje, certifikat, nadređeni CA). LOCAL_ONLY + SPAWN_CAPABLE. Pogledajte `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                  |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16+ ruta (zahtjevi, sesije, hostovi, načini snimanja, izvoz, ws). LOCAL_ONLY + SPAWN_CAPABLE. Pogledajte `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                    |
| `app/a2a/`                                                                   | Ulazna tačka za A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                           |
| `app/.well-known/agent.json/`                                                | A2A kartica agenta (otkrivanje)                                                                                                                                                                                                                                                                                          |
| `app/(dashboard)/dashboard/`                                                 | Stranice korisničkog interfejsa kontrolne ploče (50+ odjeljaka, ~118 page.tsx datoteka: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity itd.)                                                                                                         |
| `app/(dashboard)/dashboard/search-tools/`                                    | Korisnički interfejs Search Tools Studija (3 kartice: Pretraga/Izvlačenje/Upoređivanje + SearchConceptCard + ProviderCatalog) — pogledajte `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                      |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (okvir s 3 kartice), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Stranica kontrolne ploče AgentBridge — kartica servera, 9 kartica agenata, čarobnjak za postavljanje, mapiranje modela, lista zaobilaženja. i18n PT-BR + EN. Pogledajte `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Stranica kontrolne ploče Traffic Inspector — podijeljeni DevTools prikaz, 7 kartica s detaljima, 4 prekidača načina snimanja, snimač sesije, označavanje konteksta bojama. i18n PT-BR + EN. Pogledajte `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                           |
| `app/(dashboard)/dashboard/activity/`                                        | Stranica sa sažetkom aktivnosti (Grupa B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — pogledajte `docs/architecture/MONITORING_SECTIONS.md`                                                                                               |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Stranica za dijeljenje kvota (Grupa B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                      |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Stranica za konfiguraciju plana pružaoca usluge (Grupa B): `page.tsx` + `ProviderPlanConfigClient.tsx` — nadjačavanje dimenzija kvote po vezi                                                                                                                                                                            |
| `app/docs/`                                                                  | Ugrađeni preglednik dokumentacije (renderuje `docs/*.md`)                                                                                                                                                                                                                                                                |
| `app/landing/`                                                               | Marketinška odredišna stranica                                                                                                                                                                                                                                                                                           |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Stranice povezane s autentifikacijom                                                                                                                                                                                                                                                                                     |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Stranice HTTP grešaka                                                                                                                                                                                                                                                                                                    |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statičke/statusne stranice                                                                                                                                                                                                                                                                                               |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Korijenski raspored, početna stranica, PWA manifest, globalni CSS                                                                                                                                                                                                                                                        |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Granice grešaka                                                                                                                                                                                                                                                                                                          |

### `src/lib/` — Osnovne biblioteke (~50 modula)

| Modul                                    | Svrha                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Upravitelj zadataka A2A protokola, vještine (5), streaming                                                                                                                                                                                                                                                                               |
| `acp/`                                   | Registar CLI agenata (lokalno otkrivanje CLI-ja — pogledajte `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                 |
| `api/`                                   | Zajednički API pomoćni alati (`requireManagementAuth`, validacija)                                                                                                                                                                                                                                                                       |
| `auth/`                                  | Sesija, heširanje lozinki, validacija tokena                                                                                                                                                                                                                                                                                             |
| `batches/`                               | Obrađivači za OpenAI Batches API                                                                                                                                                                                                                                                                                                         |
| `catalog/`                               | Zod validacija kataloga pružalaca + razrješavanje mogućnosti                                                                                                                                                                                                                                                                             |
| `cloudAgent/`                            | Agenti u oblaku (Codex Cloud, Devin, Jules) — pogledajte `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                |
| `combos/`                                | Razrješavanje kombinacija + pomoćni alati za promjenu redoslijeda                                                                                                                                                                                                                                                                        |
| `audit/`                                 | Pomoćni alati za tok aktivnosti: `highLevelActions.ts` (lista dozvoljenih + `isHighLevelAction()`), `activityIcons.ts` (mapiranje radnje → ikona/glagol), `timeline.ts` (groupByDay/relativeTime) — pogledajte `docs/architecture/MONITORING_SECTIONS.md`                                                                                |
| `compliance/`                            | Dnevnik revizije + revizija pružalaca — pogledajte `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                         |
| `compression/`                           | Povezivanje mehanizama za kompresiju (mehanizmi se nalaze u `open-sse/services/compression/`)                                                                                                                                                                                                                                            |
| `config/`                                | Pomoćni alati za konfiguraciju tokom izvršavanja                                                                                                                                                                                                                                                                                         |
| `db/`                                    | Više od 120 domenskih DB modula + 168 migracija (za SQLite uvijek pristupajte putem ovog modula)                                                                                                                                                                                                                                         |
| `quota/`                                 | Mehanizam za dijeljenje kvota: `dimensions.ts` (tipovi/Zod), `types.ts` (QuotaStore interfejs), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — pogledajte `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Klijent Radar kataloga besplatnih modela: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — pogledajte `docs/frameworks/RADAR.md`                                                                                                                                             |
| `display/`                               | Pomoćne funkcije za formatiranje korisničkog interfejsa (trošak, latencija itd.)                                                                                                                                                                                                                                                         |
| `embeddings/`                            | Pomoćne funkcije servisa za ugrađivanja                                                                                                                                                                                                                                                                                                  |
| `env/`                                   | Parsiranje i validacija varijabli okruženja                                                                                                                                                                                                                                                                                              |
| `evals/`                                 | Okvir za evaluaciju (paketi testova, pokretač, izvršno okruženje) — pogledajte `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                |
| `guardrails/`                            | Maskiranje ličnih podataka, zaštita od ubacivanja naredbi u prompt, most za obradu slika — pogledajte `docs/security/GUARDRAILS.md`                                                                                                                                                                                                      |
| `jobs/`                                  | Pozadinski zadaci (nalik cronu)                                                                                                                                                                                                                                                                                                          |
| `memory/`                                | Konverzacijska memorija (hibridni RRF zasnovan na SQLite FTS5 + sqlite-vec, uz Qdrant kao drugi nivo) — pogledajte `docs/frameworks/MEMORY.md`                                                                                                                                                                                           |
| `memory/embedding/`                      | Sloj za ugrađivanja iz više izvora: `index.ts` (razrješivač), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                                   |
| `memory/vectorStore.ts`                  | Omotač za sqlite-vec v0.1.9 — KNN pretraga grubom silom + hibridni RRF (FTS5 + vektor, k=60). Lijena inicijalizacija, postepeno smanjuje funkcionalnost kada sqlite-vec nije dostupan. (plan 21)                                                                                                                                         |
| `memory/reindex.ts`                      | `runReindexBatch()` — obrađuje memorije s `needs_reindex=1` u pozadini; poziva se putem `POST /api/memory/reindex` i putanje za lijeno naknadno popunjavanje. (plan 21)                                                                                                                                                                  |
| `monitoring/`                            | Provjere ispravnosti, emitovanje metrika                                                                                                                                                                                                                                                                                                 |
| `oauth/`                                 | OAuth/tokovi uvoza za 22 modula pružalaca usluga (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                             |
| `plugins/`                               | Registar dodataka                                                                                                                                                                                                                                                                                                                        |
| `promptCache/`                           | Kontrolne tačke keša promptova u Anthropic stilu                                                                                                                                                                                                                                                                                         |
| `skills/`                                | Okvir za vještine (ugrađene + tržište + SkillsSH) — pogledajte `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                               |
| `playground/`                            | Dijeljeni pomoćni alati za Playground Studio: `codeExport.ts` (curl/Python/TS generator), `promptImprover.ts` (alat za izradu meta-promptova), `streamMetrics.ts` (čisti TTFT/TPS), `types.ts` (tabela cijena) — pogledajte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                       |
| `webhookDispatcher.ts`                   | HMAC isporuka webhookova — pogledajte `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                      |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Upravitelji tunela — pogledajte `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                              |
| `cloudSync.ts`, `initCloudSync.ts`       | Opcionalna sinhronizacija stanja s oblakom                                                                                                                                                                                                                                                                                               |
| `localDb.ts`                             | Modul za ponovni izvoz db modula (bez logike — samo ponovni izvozi)                                                                                                                                                                                                                                                                      |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Keširanje zahtjeva + idempotentnost                                                                                                                                                                                                                                                                                                      |
| (~30 dodatnih datoteka najvišeg nivoa)   | Specijalizirani pomoćni alati (logEnv, modelsDevSync, piiSanitizer itd.)                                                                                                                                                                                                                                                                 |

### `src/lib/db/` — Baza podataka (147 modula + 208 migracija)

| Poddirektorij             | Namjena                                                                                                                                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Jedinstvena instanca `getDbInstance()` s WAL vođenjem dnevnika                                                                                                                                      |
| `db/migrations/`          | Verzijski SQL fajlovi (idempotentni, transakcijski). `073_memory_vec.sql` dodaje `memory_vec_meta` + kolonu `needs_reindex` (plan 21).                                                              |
| `db/playgroundPresets.ts` | CRUD modul za unaprijed postavljene konfiguracije Playground Studija (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD za `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` itd. (plan 21)                                           |
| `db/<domain>.ts`          | Jedan modul po domeni: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache itd.                           |

### `src/domain/`

| Modul                  | Namjena                                                      |
| ---------------------- | ------------------------------------------------------------ |
| `policy.ts`            | Mehanizam pravila                                            |
| `fallbackPolicy.ts`    | Stablo odluka za rezervne opcije                             |
| `costRules.ts`         | Pravila izračunavanja troškova                               |
| `lockoutPolicy.ts`     | Pravila zaključavanja modela/veze                            |
| `tagRouter.ts`         | Usmjeravanje zasnovano na oznakama                           |
| `comboResolver.ts`     | Razrješavanje kombinacija (koristi ga mehanizam kombinacija) |
| `modelAvailability.ts` | Provjera dostupnosti po modelu                               |
| `assessment/`          | Procjena modela (Faza 1 dokumenta RFC-AUTO-ASSESSMENT)       |

### `src/server/`

| Modul    | Namjena                                                                                               |
| -------- | ----------------------------------------------------------------------------------------------------- |
| `authz/` | Tok autorizacije: `classify` → `policies` → `enforce` — pogledajte `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS konfiguracija                                                                                    |
| `auth/`  | Posrednički softver sesije                                                                            |

### `src/shared/`

| Modul                            | Namjena                                                                                                         |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `components/`                    | API komponenti kontrolne ploče: adapteri za `packages/ui-kit` — pogledajte `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: nazivi ikona koje koriste ekrani → Lucide komponente (`<Icon>`)                                     |
| `constants/providers.ts`         | **376 pružalaca usluga** sa Zod validacijom (jedini izvor istine)                                               |
| `constants/cliTools.ts`          | Registar vanjskih CLI alata                                                                                     |
| `constants/routingStrategies.ts` | **20 strategija usmjeravanja** s prioritetima                                                                   |
| `constants/publicApiRoutes.ts`   | Rute koje zahtijevaju Bearer autentifikaciju (za razliku od upravljačke)                                        |
| `constants/upstreamHeaders.ts`   | Lista zabranjenih zaglavlja za zahtjeve prema nadređenim servisima                                              |
| `validation/schemas.ts`          | ~80 Zod shema (jedini izvor istine za API ugovore)                                                              |
| `validation/helpers.ts`          | Pomoćne funkcije za Zod validaciju (`validateBody` itd.)                                                        |
| `types/`                         | Dijeljeni TS tipovi                                                                                             |
| `contracts/`                     | Javni API ugovori (koriste se putem `files:` u `package.json`)                                                  |
| `utils/circuitBreaker.ts`        | Zaštitni prekidač pružaoca usluga (pogledajte `docs/architecture/RESILIENCE_GUIDE.md`)                          |
| `utils/apiAuth.ts`               | Validacija API ključa, provjera opsega                                                                          |
| `utils/fetchTimeout.ts`          | Omotači za vremensko ograničenje/prekid upstream fetch zahtjeva                                                 |
| `utils/releaseNotes.ts`          | Parser zatvorenih v2/naslijeđenih obavijesti, lokalizacija i odbacivanje prema ID-u                             |

---

## `open-sse/` — Radni prostor mehanizma za streaming

Odvojeni npm radni prostor (`@omniroute/open-sse`). Obrađuje zahtjeve i izvršavanje pružalaca usluga.

```
open-sse/
├── handlers/            # 16 datoteka (12 rukovalaca + 4 pomoćna modula): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search itd.
├── executors/           # 150 izvršnih modula (klase koje proširuju BaseExecutor + pomoćni moduli za pojedinačne pružaoce)
├── translator/          # Pretvarači formata (9 za zahtjeve, 9 za odgovore, 9 pomoćnih)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ servisnih modula (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM itd.)
├── mcp-server/          # MCP server (110 alata, 3 transporta, 33 opsega)
├── config/              # Registri pružalaca/modela, konfiguracija zaglavlja, pseudonimi modela
├── utils/               # TLS klijent, proxy fetch/dispatcher, mrežni pomoćni moduli
├── index.ts             # Ulazna tačka radnog prostora
├── package.json         # Manifest radnog prostora
├── tsconfig.json        # TS konfiguracija radnog prostora
└── types.d.ts           # Deklaracije tipova radnog prostora
```

### `open-sse/mcp-server/`

| Putanja                     | Namjena                                                                          |
| --------------------------- | -------------------------------------------------------------------------------- |
| `server.ts`                 | Životni ciklus MCP servera (stdio + HTTP transporti)                             |
| `httpTransport.ts`          | HTTP Streamable + SSE transporti (`/api/mcp/sse`, `/api/mcp/stream`)             |
| `audit.ts`                  | Zapisivanje revizijskih događaja u tabelu `mcp_tool_audit`                       |
| `scopeEnforcement.ts`       | Validacija opsega za svaki alat                                                  |
| `runtimeHeartbeat.ts`       | Signal stanja sistema u `DATA_DIR/runtime/mcp-heartbeat.json`                    |
| `descriptionCompressor.ts`  | Komprimira metapodatke opisa alata radi uštede konteksta                         |
| `schemas/tools.ts`          | 36 osnovnih definicija alata + opsezi                                            |
| `tools/advancedTools.ts`    | Napredne implementacije alata                                                    |
| `tools/memoryTools.ts`      | 3 memorijska alata (pretraga/dodavanje/brisanje)                                 |
| `tools/skillTools.ts`       | 4 alata za vještine (popis/omogućavanje/izvršavanje/izvršavanja)                 |
| `tools/compressionTools.ts` | 5 alata za kompresiju                                                            |
| `README.md`                 | Interni README MCP servera (unakrsno povezan iz `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — Radni prostori

| Putanja                  | Namjena                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — lokalna kopija Keak CI UI Kit-a (`private`, `UNLICENSED`), koristi se kao izvorni kod (bez izgradnje). `UPSTREAM.md` bilježi određeni upstream commit i autorizaciju licence; `PATCHES.md` navodi lokalne zakrpe (nema ih); `src/` se sinhronizira isključivo pomoću `scripts/dev/sync-ui-kit.sh`, a provjerava pomoću `npm run check:ui-kit-snapshot`. Pogledajte `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — opcionalna usluga skupa preglednika (chat zasnovan na CloakBrowseru i Playwrightu)                                                                                                                                                                                                                                                                                                                |

---

## `electron/` — Desktop omotač

| Datoteka         | Namjena                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| `main.js`        | Glavni Electron proces (BrowserWindow, ugrađeni Next.js server, sistemska traka, automatsko ažuriranje) |
| `preload.js`     | IPC most (contextBridge → `window.omniroute`)                                                           |
| `package.json`   | electron-builder konfiguracija + Electron 41 + electron-builder 26.10 zavisnosti                        |
| `assets/`        | Ikone aplikacije (Windows .ico, macOS .icns, Linux .png)                                                |
| `dist-electron/` | Izlaz iz procesa izgradnje (gitignored)                                                                 |
| `types.d.ts`     | Deklaracije tipova za most renderera                                                                    |
| `README.md`      | Interni Electron README (pogledajte i `docs/guides/ELECTRON_GUIDE.md`)                                  |

---

## `bin/` — CLI

| Datoteka                                                                                                    | Namjena                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute.mjs`                                                                                             | Glavna CLI ulazna tačka — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` itd.         |
| `reset-password.mjs`                                                                                        | Samostalni CLI za ponovno postavljanje lozinke                                                                                             |
| `cli/commands/setup.mjs`                                                                                    | Interaktivni + neinteraktivni čarobnjak za postavljanje                                                                                    |
| `cli/commands/doctor.mjs`                                                                                   | Dijagnostika stanja sistema (8+ provjera)                                                                                                  |
| `cli/commands/providers.mjs`                                                                                | Popis/testiranje/validacija pružalaca                                                                                                      |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI pomoćni moduli                                                                                                                         |
| `cli/tray/tray.ts`                                                                                          | Integracija sistemske trake (na više platformi: NotifyIcon na Windowsu, systray2 na macOS-u/Linuxu)                                        |
| `cli/tray/tray.ps1`                                                                                         | PowerShell NotifyIcon pozadinski sistem (Windows, bez novih binarnih datoteka)                                                             |
| `cli/tray/autostart.ts`                                                                                     | Automatsko pokretanje na više platformi (LaunchAgent / .desktop / registar)                                                                |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Lanac razrješavanja SQLite upravljačkog programa u 5 koraka (u paketu → vrijeme izvršavanja → odgođena instalacija → node:sqlite → sql.js) |
| `cli/runtime/magicBytes.mjs`                                                                                | Validacija magičnih bajtova binarne datoteke (ELF / Mach-O / Mach-O fat / PE)                                                              |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — unaprijed razrješava upravljačke programe pri postinstall / prvom pokretanju                                          |
| `nodeRuntimeSupport.mjs`                                                                                    | Validira podržanu verziju Node.js-a prilikom instalacije                                                                                   |

---

## `skills/` — Javne vještine agenata

| Datoteka                     | Namjena                                                                             |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifesta vještina za vanjske AI agente (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Skripte za izgradnju i provjeru

| Skripta                             | Namjena                                                                                            |
| ----------------------------------- | -------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Pokretač za razvoj/pokretanje s učitavanjem varijabli okruženja                                    |
| `build-next-isolated.mjs`           | Samostalna izgradnja (Next.js 16 standalone)                                                       |
| `prepublish.ts`                     | Priprema paketa prije `npm pack`                                                                   |
| `postinstall.mjs`                   | Automatsko kreiranje `.env` iz `.env.example` pri prvoj instalaciji                                |
| `sync-env.mjs`                      | Ponovna sinhronizacija ključeva iz `.env` s `.env.example`                                         |
| `check-cycles.mjs`                  | Otkrivanje kružnih zavisnosti                                                                      |
| `check-route-validation.mjs`        | Provjera da sve API rute imaju Zod validaciju                                                      |
| `check-t11-any-budget.mjs`          | Nametanje eksplicitnog ograničenja za `any` po datoteci                                            |
| `check-docs-sync.mjs`               | Provjera sinhronizacije verzija dokumentacije (postojeći pre-commit)                               |
| **`check-env-doc-sync.mjs`**        | NOVO: unakrsna provjera varijabli okruženja u kodu, `.env.example` i `ENVIRONMENT.md`              |
| **`check-docs-counts-sync.mjs`**    | NOVO: provjera podudaranja brojeva (izvršitelji, strategije, OAuth, A2A vještine) s dokumentacijom |
| **`check-deprecated-versions.mjs`** | NOVO: označavanje zastarjelih verzija/datuma u dokumentaciji                                       |
| `check-supported-node-runtime.ts`   | Provjera da je trenutna verzija Nodea podržana                                                     |
| `check-pr-test-policy.mjs`          | Nametanje pravila „testovi su obavezni” za izmjene produkcijskog koda                              |
| **`gen-provider-reference.ts`**     | NOVO: automatsko generisanje `docs/reference/PROVIDER_REFERENCE.md` iz kataloga                    |
| `i18n/generate-multilang.mjs`       | Prevođenje tekstova korisničkog interfejsa i dokumentacije putem Google Translatea                 |
| `i18n_autotranslate.py`             | Proces prevođenja dokumentacije zasnovan na LLM-u                                                  |
| `validate_translation.py`           | Provjera prijevoda za svaki lokalitet                                                              |
| `check_translations.py`             | Provjera i18n ključeva na strani koda                                                              |
| `run-playwright-tests.mjs`          | Pokretač Playwright E2E testova                                                                    |
| `run-protocol-clients-tests.mjs`    | Pokretač MCP/A2A E2E testova                                                                       |
| `run-ecosystem-tests.mjs`           | Testovi ekosistema (integracije pružalaca usluga)                                                  |
| `test-report-summary.mjs`           | Generisanje markdown sažetka pokrivenosti                                                          |
| `smoke-electron-packaged.mjs`       | Osnovni test zapakovane Electron izgradnje                                                         |
| `native-binary-compat.mjs`          | Provjera podudaranja izvornih zavisnosti (`better-sqlite3`) s Electronovim Nodeom                  |
| `validate-pack-artifact.ts`         | Provjera izlaza npm pakovanja                                                                      |
| `responses-ws-proxy.mjs`            | WebSocket posrednik za Codex Responses API                                                         |
| `v1-ws-bridge.mjs`                  | WebSocket posrednik za krajnju tačku `/api/v1/ws`                                                  |
| `standalone-server-ws.mjs`          | Pokretač samostalnog WS servera                                                                    |
| `system-info.mjs`                   | Ispis informacija o sistemu/izvršnom okruženju za podršku                                          |
| `healthcheck.mjs`                   | Jednokratna provjera ispravnosti (koristi je Docker HEALTHCHECK)                                   |
| `uninstall.mjs`                     | Skripta za čistu deinstalaciju                                                                     |
| `dev/sync-ui-kit.sh`                | Kopiranje `src/` iz CI UI Kita pri fiksiranom commitu u `packages/ui-kit/src`                      |
| `check/check-ui-kit-snapshot.mjs`   | Pre-commit kontrola: `packages/ui-kit/src` odgovara fiksiranom uzvodnom commitu                    |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — nazivi ikona u upotrebi koji nisu mapirani u `ICON_MAP`                   |
| `dev/codemod-material-icons.mjs`    | Prepisivanje doslovnih raspona Material Symbols u `<Icon>` (alat za migraciju)                     |

---

## `docs/` — Javna dokumentacija (7 korijenskih datoteka + 17 poddirektorija)

### Vodiči najvišeg nivoa

| Dokument                    | Namjena                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| `ARCHITECTURE.md`           | Arhitektura visokog nivoa, mapa podsistema, sučelje kontrolne ploče                                    |
| `CODEBASE_DOCUMENTATION.md` | Inženjerska referenca: direktoriji, moduli, konvencije                                                 |
| `FEATURES.md`               | Matrica funkcionalnosti s istaknutim novostima u v3.8                                                  |
| `USER_GUIDE.md`             | Priručnik za krajnje korisnike (postavljanje, modeli, kombinacije, CLI alati, zvuk itd.)               |
| `API_REFERENCE.md`          | Referenca API krajnjih tačaka s modelom autentifikacije                                                |
| `openapi.yaml`              | OpenAPI 3.0 specifikacija (121 putanja)                                                                |
| `SETUP_GUIDE.md`            | Metode instalacije (npm, npx, Docker, Electron, Termux, izvorni kod)                                   |
| `ENVIRONMENT.md`            | Sve varijable okruženja (~800 dokumentovanih, ~3.050 redova u `.env.example`)                          |
| `TROUBLESHOOTING.md`        | Uobičajene greške + poznati problemi u v3.8.0                                                          |
| `RELEASE_CHECKLIST.md`      | Potpuni tok izdanja (vještine, husky, konvencionalne poruke commita, implementacija)                   |
| `COVERAGE_PLAN.md`          | Ciljevi pokrivenosti i trenutno stanje                                                                 |
| `FREE_TIERS.md`             | Odabrani pružaoci besplatnih nivoa (48+ besplatnih + 11 OAuth)                                         |
| `CLI-TOOLS.md`              | Integracije s vanjskim CLI alatima + interni OmniRoute CLI                                             |
| `I18N.md`                   | i18n arhitektura, dodavanje jezika, 67 lokalizacija                                                    |
| `UNINSTALL.md`              | Koraci za čistu deinstalaciju                                                                          |
| `PROVIDER_REFERENCE.md`     | **Automatski generisan** katalog 376 pružalaca (ponovno generisanje: `npm run gen:provider-reference`) |

### Detaljni pregledi podsistema

| Dokument                                    | Namjena                                                                                |
| ------------------------------------------- | -------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                             | MCP server: 110 alata, 3 transporta, 33 opsega, REST krajnje tačke                     |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC, 6 vještina, REST pomoćne funkcije, kartica agenta                  |
| `AGENT_PROTOCOLS_GUIDE.md`                  | Objedinjeni vodič: A2A naspram ACP-a naspram Cloud Agents                              |
| `CLOUD_AGENT.md`                            | Orkestracija za Codex Cloud / Devin / Jules                                            |
| `SKILLS.md`                                 | Okvir vještina (ugrađene + tržište + SkillsSH + sandbox)                               |
| `RADAR.md`                                  | Radarski sloj kataloga besplatnih modela (`RADAR_ENABLED`, podrazumijevano isključen)  |
| `MEMORY.md`                                 | Sistem memorije (SQLite FTS5 + Qdrant)                                                 |
| `EVALS.md`                                  | Okvir za evaluaciju (skupovi, pokretanja, kriteriji)                                   |
| `GUARDRAILS.md`                             | Maskiranje PII podataka, ubacivanje upita, most za viziju                              |
| `COMPLIANCE.md`                             | Dnevnik revizije, zadržavanje, mogućnost isključivanja noLog                           |
| `WEBHOOKS.md`                               | Isporuka webhookova potpisanih HMAC-om                                                 |
| `REASONING_REPLAY.md`                       | Hibridni keš memorije/SQLite za `reasoning_content`                                    |
| `AUTHZ_GUIDE.md`                            | Tok autorizacije (`classify` → `policies` → `enforce`)                                 |
| `RESILIENCE_GUIDE.md`                       | Prekidač strujnog kola + period hlađenja + blokada modela                              |
| `docs/security/STEALTH_GUIDE.md` (samo git) | TLS otisci (JA3/JA4), Claude Code CCH, MITM certifikat                                 |
| `AUTO-COMBO.md`                             | Auto Combo mehanizam (bodovanje s 16 faktora, 6 paketa načina rada, virtuelna fabrika) |

### Kompresija

| Dokument                        | Namjena                                  |
| ------------------------------- | ---------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Pregled načina kompresije + plan razvoja |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK mehanizmi, ugovor registra |
| `COMPRESSION_RULES_FORMAT.md`   | JSON shema Caveman paketa pravila        |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventar paketa pravila po jeziku        |
| `RTK_COMPRESSION.md`            | RTK deklarativni tok obrade (49 filtera) |

### Implementacija

| Dokument                     | Namjena                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------ |
| `DOCKER_GUIDE.md`            | Docker izgradnja, profili (base/cli/host/cliproxyapi), Redis pomoćni kontejner |
| `VM_DEPLOYMENT_GUIDE.md`     | Generičko postavljanje na VM/VPS (Ubuntu/Debian + nginx + systemd)             |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Postavljanje na Fly.io (trenutno samo na kineskom)                             |
| `TERMUX_GUIDE.md`            | Android bez grafičkog interfejsa putem Termuxa                                 |
| `PWA_GUIDE.md`               | Instalacija Progressive Web App aplikacije + service worker                    |
| `ELECTRON_GUIDE.md`          | Izgradnja + potpisivanje + distribucija desktop aplikacije                     |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                         |
| `PROXY_GUIDE.md`             | Izlazni proxy s 4 nivoa + 1proxy tržište                                       |

### Poddirektoriji

| Poddirektorij         | Namjena                                                                                                                                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokalizirani prijevodi dokumentacije (41 lokalitet)                                                                                                                                                                                            |
| `docs/screenshots/`   | Slikovni resursi za vodiče                                                                                                                                                                                                                     |
| `_tasks/superpowers/` | Planovi/specifikacije iz superpowers (`writing-plans`/`brainstorming`) + istraživanje — izolirani repozitorij s odvojenim verzioniranjem koji glavno stablo ignoriše putem gita. Pogledajte CLAUDE.md → "Artefakti planiranja i istraživanja". |

---

## `tests/` — Paketi testova

| Poddirektorij                        | Vrsta                                             | Pokretač                                        |
| ------------------------------------ | ------------------------------------------------- | ----------------------------------------------- |
| `tests/unit/`                        | Jedinični testovi (~4.800 datoteka, najbrži)      | Izvorni Node pokretač testova                   |
| `tests/integration/`                 | Integracijski testovi više modula + baze podataka | Izvorni Node pokretač testova (konkurentnost 1) |
| `tests/e2e/`                         | E2E korisničkog interfejsa + radnog toka          | Playwright                                      |
| `tests/e2e/protocol-clients.test.ts` | E2E sa stvarnim MCP + A2A klijentima              | Prilagođeni protokolarni klijenti               |
| `tests/e2e/ecosystem.test.ts`        | Integracija pružatelja usluga (koristi mrežu)     | Izvorni Node pokretač testova                   |

---

## `public/` — Statički resursi

| Putanja             | Namjena                                                             |
| ------------------- | ------------------------------------------------------------------- |
| `public/` (korijen) | Favikoni, robots.txt, manifest, servisni radnik, marketinške slike  |
| `public/providers/` | PNG/SVG logotipi pružatelja usluga (koriste se na kontrolnoj ploči) |

---

## `config/` — Statičke konfiguracije + stanje provjere kvaliteta

Isporučeni konfiguracijski predlošci i potvrđene osnovne vrijednosti provjere kvaliteta
(premješteni ovdje iz korijena repozitorija u v3.8.26 kako bi korijen ostao pregledan).

| Putanja                                       | Namjena                                                                                  |
| --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Lista lokalizacija + metapodaci (kanonski izvor za broj od 42 lokalizacije)              |
| `config/i18n-schema.json`                     | JSON shema koja validira `i18n.json`                                                     |
| `config/payloadRules.json`                    | Pravila za pročišćavanje dolaznog korisnog sadržaja                                      |
| `config/quality/quality-baseline.json`        | Osnovna vrijednost višemetričke čegrtaljke (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Zamrznuta osnovna vrijednost ESLint složenosti (`check-complexity.mjs`)                  |
| `config/quality/duplication-baseline.json`    | Zamrznuta osnovna vrijednost jscpd dupliciranja (`check-duplication.mjs`)                |
| `config/quality/file-size-baseline.json`      | Zamrznuta osnovna vrijednost veličine po datoteci (`check-file-size.mjs`)                |
| `config/quality/test-discovery-baseline.json` | Zamrznuta osnovna vrijednost nepovezanih testova (`check-test-discovery.mjs`)            |
| `config/quality/dependency-allowlist.json`    | Lista dopuštenih odobrenih zavisnosti (`check-deps.mjs`)                                 |
| `config/quality/.license-allowlist.json`      | Lista dopuštenih SPDX licenci (`check-licenses.mjs`)                                     |
| `config/quality/quality-metrics.json`         | Privremeno prikupljene metrike (generira ih `collect-metrics.mjs`; **ignorira ih git**)  |

---

## `.github/` — GitHub integracija

| Putanja                            | Namjena                                                                    |
| ---------------------------------- | -------------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions CI/CD radni tokovi (lint, testiranje, pokrivenost, izdanje) |
| `.github/ISSUE_TEMPLATE/`          | Predlošci za prijavu grešaka/funkcionalnosti                               |
| `.github/pull_request_template.md` | PR predložak                                                               |
| `.github/dependabot.yml`           | Konfiguracija ažuriranja zavisnosti                                        |

---

## `.husky/` — Git hookovi

| Datoteka     | Namjena                                                                      |
| ------------ | ---------------------------------------------------------------------------- |
| `pre-commit` | Pokreće `lint-staged + check-docs-sync + check:any-budget:t11`               |
| `pre-push`   | Trenutno onemogućeno (zakomentarisano). Ručno pokrenite `npm run test:unit`. |
| `_/`         | Husky interne datoteke                                                       |

---

## `.claude/` — Claude Code kose komande

| Datoteka                                            | Namjena                                                             |
| --------------------------------------------------- | ------------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — povećanje verzije + automatski dnevnik izmjena |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — kompletan radni tok izdavanja              |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Implementacija na VPS                                               |
| `commands/capture-release-evidences-cc.md`          | Snimanje novih funkcionalnosti u pregledniku kao WebP               |
| `commands/review-{prs,discussions}-cc.md`           | Trijaža GitHub PR-ova/diskusija                                     |
| `commands/{review-issues,implement-features}-cc.md` | Radni tokovi za probleme                                            |
| `settings.local.json`                               | Claude Code postavke za pojedinačni projekt                         |

---

## `.agents/` — Generički radni tokovi agenata (Codex / Cursor / itd.)

| Putanja                  | Namjena                                                    |
| ------------------------ | ---------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definicija radnih tokova (preslika `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definicija vještina s napomenama za izvršavanje u Codexu |

> **Napomena:** Radni tokovi i komande trenutno su identični bajt po bajt. Ako je `.agents/` namijenjen drugom okruženju za izvršavanje agenata (Codex), varijante se moraju smisleno razlikovati.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Izvan stabla

Ovi direktoriji s prefiksom donje crte sadrže sadržaj koji se ne isporučuje:

- **`_ideia/`** — bilješke o dizajnu (kategorije defer / notfit / viable)
- **`_mono_repo/`** — historijski potprojekti (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — klonovi povezanih OSS projekata samo za čitanje (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api, itd.) za unakrsno referenciranje tokom razvoja
- **`_tasks/`** — datoteke za praćenje zadataka po izdanju (neformalno)

Nije uključeno u izlaz komande `npm pack`. Pogledajte `.npmignore`.

---

## Generirano / Ignorisano u Gitu

| Putanja                | Namjena                         |
| ---------------------- | ------------------------------- |
| `node_modules/`        | npm zavisnosti                  |
| `.next/`               | Izlaz Next.js izgradnje         |
| `coverage/`            | c8 izvještaji o pokrivenosti    |
| `logs/`                | Dnevnici izvršavanja            |
| `package/`             | Priprema za npm paketiranje     |
| `.playwright-mcp/`     | Playwright MCP testni artefakti |
| `.issues/`             | Lokalni keš problema            |
| `tsconfig.tsbuildinfo` | TS inkrementalni keš            |

---

## Savjeti za navigaciju

- **Novi saradnik?** Pročitajte `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Dodajete pružaoca usluge?** Pratite `docs/architecture/ARCHITECTURE.md § Adding a New Provider` i uporedite s `docs/reference/PROVIDER_REFERENCE.md`.
- **Dodajete rutu?** `docs/architecture/ARCHITECTURE.md § Adding a New API Route` + `src/shared/validation/schemas.ts`.
- **Dodajete MCP alat?** `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Dodajete A2A vještinu?** `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Pokrećete lokalno?** `docs/guides/SETUP_GUIDE.md`.
- **Implementirate?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Objavljujete izdanje?** `docs/ops/RELEASE_CHECKLIST.md` (i Claude Code vještina `/generate-release-cc`).
