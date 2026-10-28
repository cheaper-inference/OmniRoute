# Repository Map (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Egysoros leírás minden könyvtárhoz és gyökérszintű fájlhoz.**
> Utolsó frissítés: 2026-06-28 — OmniRoute v3.8.40
>
> Ezzel a térképpel gyorsan eligazodhatsz a kódbázisban. A részletesebb információkért kövesd a dedikált dokumentációkra mutató hivatkozásokat.

## Legfelső szintű könyvtárfa

```
OmniRoute/
├── src/                  # Next.js 16 alkalmazás (felhasználói felület + API-útvonalak + könyvtárak + tartomány + kiszolgáló)
├── open-sse/             # Streamelési motor munkaterülete (kezelők, végrehajtók, fordító, MCP-kiszolgáló)
├── packages/            # npm-munkaterületek: ui-kit (beágyazott Keak CI UI Kit) és browser-pool
├── electron/             # Asztali alkalmazásburkoló (Electron 41 + electron-builder 26.10)
├── bin/                  # CLI-belépési pont és parancskezelők
├── scripts/              # Buildelési, ellenőrzési, szinkronizálási és egyszeri szkriptek
├── docs/                 # Nyilvános dokumentáció (jelenleg itt vagy)
├── tests/                # Minden tesztcsomag (egység-, integrációs, e2e- és protokollkliens-tesztek)
├── public/               # Next.js statikus erőforrások, PWA-jegyzékfájl, service worker, ikonok
├── config/               # Statikus konfiguráció + minőségi kapu állapota (i18n, payloadRules, quality/)
├── images/               # Marketing- és README-képerőforrások
├── @omniroute/           # Közzétehető kiegészítő csomagok (opencode-plugin, opencode-provider)
├── skills/               # CLI-/ügynökkészség-csomagok (cli-* + omni-* + config-codex-cli)
├── examples/             # Példabővítmények + omniroute-cmd-hello kezdősablon
├── contrib/              # Közösségi hozzájárulások (podman/)
├── .source/              # Fumadocs-forráskonfiguráció (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actions-munkafolyamatok + hibajegysablonok + PR-sablon
├── .husky/               # Git-hookok (pre-commit, pre-push)
├── .claude/              # Claude Code perjeles parancsok (projektszintű)
├── .agents/              # Codex- / általános ügynöki munkafolyamatok + készségek (a .claude/ tükörképe)
├── .vscode/              # VS Code-munkaterület beállításai
├── _ideia/               # Tervezési jegyzetek (informálisak; nem kerülnek kiadásra)
├── _mono_repo/           # Korábbi alprojektek (cloud, site, vscode-extension)
├── _references/          # Kapcsolódó nyílt forráskódú projektek csak olvasható referenciaklónjai
├── _tasks/               # Kiadásonkénti feladatkövető fájlok (informálisak)
├── .build/ .worktrees/ dist/   # helyi buildelési / git-worktree / buildkimeneti munkaterület (a Git figyelmen kívül hagyja)
├── .issues/              # Helyi hibajegy-gyorsítótár (a Git figyelmen kívül hagyja)
├── .playwright-mcp/      # Playwright MCP-tesztek műtermékei
├── coverage/             # c8 lefedettségi kimenet (a Git figyelmen kívül hagyja)
├── logs/                 # Futásidejű naplók (a Git figyelmen kívül hagyja)
├── node_modules/         # Függőségek (a Git figyelmen kívül hagyja)
├── package/              # npm pack előkészítési terület (buildelési műtermék)
├── .next/                # Next.js buildkimenet (a Git figyelmen kívül hagyja)
└── (gyökérszintű fájlok — lásd alább)
```

---

## Gyökérszintű fájlok

| Fájl                                        | Rendeltetés                                                                                   |
| ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **README.md**                               | Marketing-céloldal + gyors kezdés + funkciómátrix (lásd még: `llm.txt`)                       |
| **CHANGELOG.md**                            | Kiadásonkénti változásnapló (a `/version-bump-cc` skill automatikusan generálja)              |
| **LICENSE**                                 | MIT-licenc szövege                                                                            |
| **CLAUDE.md**                               | Projektszabályok Claude Code-ügynökök számára (szigorú szabályok, konvenciók, forgatókönyvek) |
| **AGENTS.md**                               | Ugyanaz, mint a CLAUDE.md, de nem Claude-alapú AI-ügynökök számára (Codex, Cursor stb.)       |
| **GEMINI.md**                               | Tömör szabályok Gemini-alapú ügynökök számára (a CLAUDE.md részhalmaza)                       |
| **CONTRIBUTING.md**                         | Közreműködői útmutató: beállítás, konvencionális commitok, tesztelés, PR-folyamat             |
| **SECURITY.md**                             | Sérülékenység-bejelentési szabályzat, támogatott verziók, fenyegetési modell                  |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — a közösségi viselkedéssel kapcsolatos elvárások                        |
| **llm.txt**                                 | LLM-feltérképezők számára optimalizált egyszerű szöveges céloldal (SEO AI-asszisztensekhez)   |
| **package.json**                            | npm-manifeszt, szkriptek, függőségek, motorok, c8-lefedettségi kapu                           |
| **package-lock.json**                       | Zárolt függőségi fa                                                                           |
| **tsconfig.json**                           | Gyökérszintű TypeScript-konfiguráció                                                          |
| **tsconfig.typecheck-core.json**            | Típusellenőrzési konfiguráció az `src/` maghoz                                                |
| **tsconfig.typecheck-noimplicit-core.json** | Szigorú (`noImplicitAny`) típusellenőrzés                                                     |
| **tsconfig.tsbuildinfo**                    | TS növekményes build-gyorsítótár (git által figyelmen kívül hagyva)                           |
| **next.config.mjs**                         | Next.js 16 buildkonfiguráció (önálló kimenet)                                                 |
| **next-env.d.ts**                           | A Next.js által automatikusan generált környezeti típusok                                     |
| **eslint.config.mjs**                       | ESLint lapos konfiguráció (projektrészenkénti szabályok)                                      |
| **prettier.config.mjs**                     | Prettier-formázási szabályok                                                                  |
| **postcss.config.mjs**                      | PostCSS-konfiguráció a Tailwind/CSS-folyamathoz                                               |
| **playwright.config.ts**                    | Playwright E2E-tesztkonfiguráció                                                              |
| **vitest.config.ts**                        | Vitest-konfiguráció (alapértelmezett tesztcsomag)                                             |
| **vitest.mcp.config.ts**                    | Vitest-konfiguráció az MCP-szerverhez / autoCombo / gyorsítótár-tesztcsomagokhoz              |
| **sonar-project.properties**                | SonarQube/SonarCloud-konfiguráció (kódminőség)                                                |
| **Dockerfile**                              | Többlépcsős Docker-build (builder → runner-base → runner-cli)                                 |
| **docker-compose.yml**                      | Fejlesztői compose 4 profillal (base, cli, host, cliproxyapi) + redis sidecar                 |
| **docker-compose.prod.yml**                 | Éles környezethez készült compose (20130-as port, redis, elnevezett kötetek)                  |
| **.dockerignore**                           | A Docker-környezetből kizárt fájlok                                                           |
| **fly.toml**                                | Fly.io telepítési konfiguráció (`sin` régió, 20128-as port, /data kötet)                      |
| **.env.example**                            | Környezetifájl-sablon (az első telepítéskor automatikusan `.env` néven másolódik)             |
| **.gitignore**                              | Git figyelmen kívül hagyási minták                                                            |
| **.npmignore**                              | npm-közzétételi kizárási lista                                                                |
| **.npmrc**                                  | npm-konfiguráció (regisztrációs adatbázis, lockfile-szabályzat)                               |
| **.node-version**                           | Rögzített Node-verzió (nvm-kompatibilis eszközök használják)                                  |
| **.nvmrc**                                  | Rögzített Node-verzió az nvm számára                                                          |
| **eslint.complexity.config.mjs**            | ESLint-konfiguráció a komplexitási racsnihoz (`scripts/check/check-complexity.mjs --config`)  |
| **eslint.sonarjs.config.mjs**               | ESLint-konfiguráció a SonarJS-szabályokhoz (kognitív komplexitás / duplikáció)                |
| **source.config.ts**                        | Fumadocs `defineDocs` forráskonfiguráció (a `.source/` bemenete)                              |
| **knip.json**                               | Knip-konfiguráció — nem használt fájlok/exportok/függőségek (a holtkód-kapu bemenete)         |
| **stryker.conf.json**                       | Stryker mutációtesztelési konfiguráció                                                        |
| **.size-limit.json**                        | size-limit csomagméretkeret-konfiguráció                                                      |
| **promptfooconfig.yaml**                    | promptfoo kiértékelési konfiguráció                                                           |
| **.gitleaks.toml**                          | gitleaks titokellenőrzési szabálykészlet                                                      |
| **.zizmor.yml**                             | zizmor GitHub Actions biztonsági lintelési konfiguráció                                       |
| **socket.yml**                              | Socket.dev ellátásilánc-konfiguráció                                                          |
| **news.json**                               | Lokalizált v2 bejelentési hírfolyam; a Radar indulási eleme inaktív állapotban érkezik        |
| **flake.nix** / **flake.lock**              | Nix fejlesztői shell definíciója + zárolása                                                   |
| **.env**                                    | Helyi titkos adatok (a git figyelmen kívül hagyja — a `.env.example` alapján generálva)       |

> **A v3.8.26 verzióban kikerült a gyökérkönyvtárból (rendezés):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json`, valamint a generált `quality-metrics.json` (a git figyelmen kívül hagyja). Lásd: [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js-alkalmazás

```
src/
├── app/                 # App Router (oldalak + API-útvonalak + állapotoldalak + nyitóoldal)
├── lib/                 # Alapvető könyvtárak / tartományi modulok (80 alkönyvtár + ~70 felső szintű fájl)
├── domain/              # Tiszta tartományi logika (szabálymotor, tartalékmechanizmus, költség, kizárás, comboResolver, kiértékelés)
├── server/              # Kizárólag szerveroldali modulok (engedélyezési folyamat, cors, hitelesítési middleware) — kliensből nem importálhatók
├── shared/              # Biztonságosan megosztható a szerver és a kliens között (konstansok, típusok, validáció, szerződések, segédprogramok)
├── i18n/                # next-intl-konfiguráció + területi beállításonkénti üzenet-JSON (67 területi beállítás)
├── middleware/          # Next.js-middleware (kérések kiegészítése, területi beállítás észlelése)
├── mitm/                # MITM-proxy magja: tanúsítvány létrehozása/telepítése, kezelők, célok, vizsgáló, maszkok, közvetlen továbbítás
│   ├── handlers/        # 9, a MitmHandlerBase osztályt kiterjesztő IDE-ügynökkezelő osztály (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Forgalomrögzítési réteg: puffer (memóriabeli gyűrűs puffer), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Modelladapter-összekötő réteg (örökölt kompatibilitási réteg)
├── scripts/             # Forrásfán belüli karbantartási szkriptek (pl. backfillAggregation)
├── sse/                 # Örökölt SSE-kezelők/-szolgáltatások (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Örökölt memóriabeli adattár (fokozatosan felváltja a src/lib/db)
├── types/               # Megosztott TS-típusfájlok
├── instrumentation.ts   # Next.js telemetriai hook (böngésző + edge)
├── instrumentation-node.ts  # Kizárólag Node-on futó műszerezés
└── proxy.ts             # HTTP-proxy belépési kompatibilitási rétege
```

### `src/app/` — App Router (Next.js 16)

| Útvonal                                                                      | Rendeltetés                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Nyilvános, OpenAI-kompatibilis API (~25 alútvonal: csevegés, kiegészítések, beágyazások, fájlok, kötegek, hang, képek, videók, zene, újrarangsorolás, moderálás, keresés, ws, ügynökök, fiókok, szolgáltatók stb.)                                                                                                    |
| `app/api/v1beta/`                                                            | Gemini-stílusú API-végpontok                                                                                                                                                                                                                                                                                          |
| `app/api/playground/`                                                        | Playground Studio-útvonalak: `improve-prompt/` (POST — LLM-promptátíró), `presets/` (GET-listázás / POST-létrehozás), `presets/[id]/` (GET / PUT / DELETE) — lásd: `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                             |
| `app/api/` (nem v1)                                                          | Kezelési/adminisztrációs útvonalak (~60 könyvtár: szolgáltatók, kombinációk, beállítások, mcp, a2a, kiértékelések, memória, készségek, webhookok, megfelelőség, reziliencia, monitorozás, alagutak, CLI-eszközök stb.)                                                                                                |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 útvonal (szervervezérlés, ügynökállapot/DNS/leképezések, megkerülés, tanúsítvány, felsőbb szintű hitelesítésszolgáltató). LOCAL_ONLY + SPAWN_CAPABLE. Lásd: `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                            |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — több mint 16 útvonal (kérések, munkamenetek, gazdagépek, rögzítési módok, exportálás, ws). LOCAL_ONLY + SPAWN_CAPABLE. Lásd: `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                             |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 belépési pont (`POST /a2a`)                                                                                                                                                                                                                                                                          |
| `app/.well-known/agent.json/`                                                | A2A ügynökkártya (felderítés)                                                                                                                                                                                                                                                                                         |
| `app/(dashboard)/dashboard/`                                                 | Vezérlőpult felhasználói felületének oldalai (több mint 50 szakasz, ~118 page.tsx fájl: szolgáltatók, kombinációk, beállítások, memória, készségek, webhookok, kiértékelések, auditálás, kötegelt feldolgozás, gyorsítótár, költségek, állapot, rendszer, tevékenység stb.)                                           |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search Tools Studio felhasználói felülete (3 lap: Keresés/Kinyerés/Összehasonlítás + SearchConceptCard + ProviderCatalog) — lásd: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                            |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (21. terv): `page.tsx` (3 lapos keret), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge vezérlőpultoldal — szerverkártya, 9 ügynökkártya, beállítási varázsló, modell-leképezés, megkerülési lista. i18n PT-BR + EN. Lásd: `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                      |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector vezérlőpultoldal — osztott DevTools-nézet, 7 részletlap, 4 rögzítésimód-kapcsoló, munkamenetrögzítő, kontextus szerinti színezés. i18n PT-BR + EN. Lásd: `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                    |
| `app/(dashboard)/dashboard/activity/`                                        | Tevékenységfolyam oldal (B csoport): `page.tsx` (szerver) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — lásd: `docs/architecture/MONITORING_SECTIONS.md`                                                                                                      |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Kvótamegosztási oldal (B csoport): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                        |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Szolgáltatói csomag konfigurációs oldala (B csoport): `page.tsx` + `ProviderPlanConfigClient.tsx` — kapcsolatonként felülírható kvótadimenziók                                                                                                                                                                        |
| `app/docs/`                                                                  | Beágyazott dokumentációmegjelenítő (a `docs/*.md` fájlokat jeleníti meg)                                                                                                                                                                                                                                              |
| `app/landing/`                                                               | Marketinges nyitóoldal                                                                                                                                                                                                                                                                                                |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Hitelesítéssel kapcsolatos oldalak                                                                                                                                                                                                                                                                                    |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP-hibaoldalak                                                                                                                                                                                                                                                                                                      |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statikus/állapotoldalak                                                                                                                                                                                                                                                                                               |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Gyökérelrendezés, kezdőlap, PWA-manifeszt, globális CSS                                                                                                                                                                                                                                                               |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Hibakezelési határok                                                                                                                                                                                                                                                                                                  |

### `src/lib/` — Alapvető könyvtárak (~50 modul)

| Modul                                    | Rendeltetés                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A protokoll feladatkezelője, képességek (5), streamelés                                                                                                                                                                                                                                                                    |
| `acp/`                                   | CLI-ügynökregiszter (helyi CLI-felderítés — lásd: `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                |
| `api/`                                   | Megosztott API-segédfüggvények (`requireManagementAuth`, validálás)                                                                                                                                                                                                                                                          |
| `auth/`                                  | Munkamenet, jelszóhashelés, tokenvalidálás                                                                                                                                                                                                                                                                                   |
| `batches/`                               | OpenAI Batches API-kezelők                                                                                                                                                                                                                                                                                                   |
| `catalog/`                               | Szolgáltatáskatalógus Zod-validálása + képességfeloldás                                                                                                                                                                                                                                                                      |
| `cloudAgent/`                            | Felhőügynökök (Codex Cloud, Devin, Jules) — lásd: `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                           |
| `combos/`                                | Kombinációfeloldó és átrendező segédfüggvények                                                                                                                                                                                                                                                                               |
| `audit/`                                 | Tevékenységfolyam-segédfüggvények: `highLevelActions.ts` (engedélyezési lista + `isHighLevelAction()`), `activityIcons.ts` (művelet → ikon/ige leképezés), `timeline.ts` (groupByDay/relativeTime) — lásd: `docs/architecture/MONITORING_SECTIONS.md`                                                                        |
| `compliance/`                            | Auditnapló + szolgáltatói audit — lásd: `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                        |
| `compression/`                           | Tömörítőmotor-integráció (a motorok helye: `open-sse/services/compression/`)                                                                                                                                                                                                                                                 |
| `config/`                                | Futásidejű konfigurációs segédfüggvények                                                                                                                                                                                                                                                                                     |
| `db/`                                    | Több mint 120 tartományspecifikus adatbázismodul + 168 migráció (SQLite esetén mindig ezeket használd)                                                                                                                                                                                                                       |
| `quota/`                                 | Kvótamegosztási motor: `dimensions.ts` (típusok/Zod), `types.ts` (QuotaStore interfész), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — lásd: `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Radar ingyenesmodell-katalógus kliens: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — lásd: `docs/frameworks/RADAR.md`                                                                                                                                         |
| `display/`                               | Felhasználói felület formázási segédfüggvényei (költség, késleltetés stb.)                                                                                                                                                                                                                                                   |
| `embeddings/`                            | Beágyazási szolgáltatás segédfüggvényei                                                                                                                                                                                                                                                                                      |
| `env/`                                   | Környezeti változók feldolgozása és ellenőrzése                                                                                                                                                                                                                                                                              |
| `evals/`                                 | Kiértékelési keretrendszer (tesztcsomagok, futtató, futtatókörnyezet) — lásd: `docs/frameworks/EVALS.md`                                                                                                                                                                                                                     |
| `guardrails/`                            | Személyazonosításra alkalmas adatok maszkolója, promptinjektálás elleni védelem, vizuális híd — lásd: `docs/security/GUARDRAILS.md`                                                                                                                                                                                          |
| `jobs/`                                  | Háttérfeladatok (cron-szerű)                                                                                                                                                                                                                                                                                                 |
| `memory/`                                | Társalgási memória (SQLite FTS5 + sqlite-vec hibrid RRF + Qdrant 2. szint) — lásd: `docs/frameworks/MEMORY.md`                                                                                                                                                                                                               |
| `memory/embedding/`                      | Többforrásos beágyazási réteg: `index.ts` (feloldó), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (21. terv)                                                                                                                                                                               |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 burkoló — teljes kereséses KNN + hibrid RRF (FTS5 + vektor, k=60). Lusta inicializálás; szabályosan csökkentett funkcionalitással működik, ha a sqlite-vec nem érhető el. (21. terv)                                                                                                                       |
| `memory/reindex.ts`                      | `runReindexBatch()` — a háttérben dolgozza fel a `needs_reindex=1` értékű memóriákat; a `POST /api/memory/reindex` és a lusta visszatöltési útvonal hívja meg. (21. terv)                                                                                                                                                    |
| `monitoring/`                            | Állapotellenőrzések, metrikák kibocsátása                                                                                                                                                                                                                                                                                    |
| `oauth/`                                 | OAuth-/importálási folyamatok 22 szolgáltatói modulhoz (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                           |
| `plugins/`                               | Bővítmény-nyilvántartás                                                                                                                                                                                                                                                                                                      |
| `promptCache/`                           | Anthropic-stílusú prompt-gyorsítótár töréspontjai                                                                                                                                                                                                                                                                            |
| `skills/`                                | Képesség-keretrendszer (beépített + piactér + SkillsSH) — lásd: `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                  |
| `playground/`                            | A Playground Studio megosztott segédfüggvényei: `codeExport.ts` (curl/Python/TS-generátor), `promptImprover.ts` (metaprompt-építő), `streamMetrics.ts` (tisztán számított TTFT/TPS), `types.ts` (árazási táblázat) — lásd: `docs/frameworks/PLAYGROUND_STUDIO.md`                                                            |
| `webhookDispatcher.ts`                   | HMAC-webhookok kézbesítése — lásd: `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                             |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Alagútkezelők — lásd: `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                            |
| `cloudSync.ts`, `initCloudSync.ts`       | Az állapot opcionális felhőszinkronizálása                                                                                                                                                                                                                                                                                   |
| `localDb.ts`                             | Újraexportáló gyűjtőmodul az adatbázismodulokhoz (nincs logika — csak újraexportálás)                                                                                                                                                                                                                                        |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Kérések gyorsítótárazása + idempotencia                                                                                                                                                                                                                                                                                      |
| (további ~30 felső szintű fájl)          | Specializált segédfüggvények (logEnv, modelsDevSync, piiSanitizer stb.)                                                                                                                                                                                                                                                      |

### `src/lib/db/` — Adatbázis (147 modul + 208 migráció)

| Alkönyvtár                | Rendeltetés                                                                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | `getDbInstance()` singleton WAL-naplózással                                                                                                                                     |
| `db/migrations/`          | Verziózott SQL-fájlok (idempotensek, tranzakciósak). A `073_memory_vec.sql` hozzáadja a `memory_vec_meta` táblát és a `needs_reindex` oszlopot (21. terv).                      |
| `db/playgroundPresets.ts` | CRUD-modul a Playground Studio előbeállításaihoz (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD a `memory_vec_meta` számára (active_dim, embedding_signature, last_reset_at, vec_loaded), továbbá `markMemoryNeedsReindex`, `getMemoryReindexQueue` stb. (21. terv)        |
| `db/<domain>.ts`          | Tartományonként egy modul: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache stb.   |

### `src/domain/`

| Modul                  | Rendeltetés                                        |
| ---------------------- | -------------------------------------------------- |
| `policy.ts`            | Házirendmotor                                      |
| `fallbackPolicy.ts`    | Tartalékmegoldási döntési fa                       |
| `costRules.ts`         | Költségszámítási szabályok                         |
| `lockoutPolicy.ts`     | Modell-/kapcsolatzárolási házirend                 |
| `tagRouter.ts`         | Címkealapú útválasztás                             |
| `comboResolver.ts`     | Kombinációfeloldás (a kombinációs motor használja) |
| `modelAvailability.ts` | Modellenkénti elérhetőség-ellenőrzés               |
| `assessment/`          | Modellértékelés (az RFC-AUTO-ASSESSMENT 1. fázisa) |

### `src/server/`

| Modul    | Rendeltetés                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------ |
| `authz/` | Engedélyezési folyamat: `classify` → `policies` → `enforce` — lásd: `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS-konfiguráció                                                                                      |
| `auth/`  | Munkamenet-köztesszoftver                                                                              |

### `src/shared/`

| Modul                            | Rendeltetés                                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `components/`                    | Irányítópult-komponens API: adapterek a `packages/ui-kit` felett — lásd: `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: a képernyők által használt ikonnevek → Lucide-komponensek (`<Icon>`)                              |
| `constants/providers.ts`         | **376 szolgáltató** Zod-validációval (hiteles forrás)                                                         |
| `constants/cliTools.ts`          | Külső CLI-eszközök nyilvántartása                                                                             |
| `constants/routingStrategies.ts` | **20 útválasztási stratégia** prioritásokkal                                                                  |
| `constants/publicApiRoutes.ts`   | Bearer-hitelesítést (a felügyeleti hitelesítés helyett) igénylő útvonalak                                     |
| `constants/upstreamHeaders.ts`   | Tiltólista a felsőbb szintű kérések fejléceihez                                                               |
| `validation/schemas.ts`          | ~80 Zod-séma (az API-szerződések egyetlen hiteles forrása)                                                    |
| `validation/helpers.ts`          | Zod-validációs segédfüggvények (`validateBody` stb.)                                                          |
| `types/`                         | Megosztott TS-típusok                                                                                         |
| `contracts/`                     | Nyilvános API-szerződések (a `package.json` `files:` mezője használja őket)                                   |
| `utils/circuitBreaker.ts`        | Szolgáltatói megszakító (lásd: `docs/architecture/RESILIENCE_GUIDE.md`)                                       |
| `utils/apiAuth.ts`               | API-kulcsok validálása, hatókörök ellenőrzése                                                                 |
| `utils/fetchTimeout.ts`          | Időtúllépési/megszakítási burkolók a felsőbb szintű lekérésekhez                                              |
| `utils/releaseNotes.ts`          | Lezárt v2/örökölt közlemények elemzője, lokalizálása és azonosító-alapú elvetése                              |

---

## `open-sse/` — Streamelési motor munkaterülete

Különálló npm-munkaterület (`@omniroute/open-sse`). A kérések feldolgozását és a szolgáltatók végrehajtását kezeli.

```
open-sse/
├── handlers/            # 16 fájl (12 kezelő + 4 segéd): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search stb.
├── executors/           # 150 végrehajtómodul (a BaseExecutor osztályt kiterjesztő osztályok + szolgáltatónkénti segédek)
├── translator/          # Formátumkonverterek (9 kérés-, 9 válasz- és 9 segédmodul)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ szolgáltatásmodul (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM stb.)
├── mcp-server/          # MCP-kiszolgáló (110 eszköz, 3 transzport, 33 hatókör)
├── config/              # Szolgáltató- és modelljegyzékek, fejléc-konfiguráció, modellálnevek
├── utils/               # TLS-kliens, proxy fetch/dispatcher, hálózati segédek
├── index.ts             # A munkaterület belépési pontja
├── package.json         # A munkaterület manifesztje
├── tsconfig.json        # A munkaterület TS-konfigurációja
└── types.d.ts           # A munkaterület típusdeklarációi
```

### `open-sse/mcp-server/`

| Elérési út                  | Rendeltetés                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| `server.ts`                 | Az MCP-kiszolgáló életciklusa (stdio + HTTP-transzportok)                                     |
| `httpTransport.ts`          | HTTP Streamable + SSE transzportok (`/api/mcp/sse`, `/api/mcp/stream`)                        |
| `audit.ts`                  | Naplózás a `mcp_tool_audit` táblába                                                           |
| `scopeEnforcement.ts`       | Eszközönkénti hatókör-ellenőrzés                                                              |
| `runtimeHeartbeat.ts`       | Állapotjelzés a `DATA_DIR/runtime/mcp-heartbeat.json` fájlba                                  |
| `descriptionCompressor.ts`  | Az eszközleírások metaadatainak tömörítése a kontextus megtakarításához                       |
| `schemas/tools.ts`          | 36 alapvető eszközdefiníció + hatókörök                                                       |
| `tools/advancedTools.ts`    | Speciális eszközök implementációi                                                             |
| `tools/memoryTools.ts`      | 3 memóriaeszköz (keresés/hozzáadás/törlés)                                                    |
| `tools/skillTools.ts`       | 4 készségeszköz (listázás/engedélyezés/végrehajtás/végrehajtások)                             |
| `tools/compressionTools.ts` | 5 tömörítési eszköz                                                                           |
| `README.md`                 | Belső MCP-kiszolgálói README (kereszthivatkozással a `docs/frameworks/MCP-SERVER.md` fájlból) |

---

## `packages/` — Munkaterületek

| Elérési út               | Rendeltetés                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — a Keak CI UI Kit helyben tárolt pillanatképe (`private`, `UNLICENSED`), közvetlenül forrásként használva (fordítás nélkül). Az `UPSTREAM.md` rögzíti a forrásként szolgáló commitot és a licencengedélyt; a `PATCHES.md` felsorolja a helyi javításokat (jelenleg nincsenek); az `src/` szinkronizálását kizárólag a `scripts/dev/sync-ui-kit.sh` végzi, épségét pedig az `npm run check:ui-kit-snapshot` védi. Lásd: `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — opcionális böngészőpool-szolgáltatás (CloakBrowser- és Playwright-alapú csevegés)                                                                                                                                                                                                                                                                                                                                                                    |

---

## `electron/` — Asztali keretalkalmazás

| Fájl             | Rendeltetés                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `main.js`        | Electron főfolyamat (BrowserWindow, beágyazott Next.js-szerver, tálca, automatikus frissítés) |
| `preload.js`     | IPC-híd (contextBridge → `window.omniroute`)                                                  |
| `package.json`   | electron-builder-konfiguráció + Electron 41 + electron-builder 26.10 függőségek               |
| `assets/`        | Alkalmazásikonok (Windows .ico, macOS .icns, Linux .png)                                      |
| `dist-electron/` | Buildkimenet (a git figyelmen kívül hagyja)                                                   |
| `types.d.ts`     | Típusdeklarációk a megjelenítő hídjához                                                       |
| `README.md`      | Belső Electron README (lásd még: `docs/guides/ELECTRON_GUIDE.md`)                             |

---

## `bin/` — CLI

| Fájl                                                                                                        | Rendeltetés                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Fő CLI-belépési pont — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` stb. |
| `reset-password.mjs`                                                                                        | Önálló jelszó-visszaállító CLI                                                                                                  |
| `cli/commands/setup.mjs`                                                                                    | Interaktív és nem interaktív telepítővarázsló                                                                                   |
| `cli/commands/doctor.mjs`                                                                                   | Rendszerállapot-diagnosztika (8+ ellenőrzés)                                                                                    |
| `cli/commands/providers.mjs`                                                                                | Szolgáltatók listázása/tesztelése/ellenőrzése                                                                                   |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI-segédmodulok                                                                                                                |
| `cli/tray/tray.ts`                                                                                          | Rendszertálca-integráció (platformfüggetlen: NotifyIcon Windows rendszeren, systray2 macOS/Linux rendszeren)                    |
| `cli/tray/tray.ps1`                                                                                         | PowerShell NotifyIcon-háttérrendszer (Windows, nulla új bináris fájl)                                                           |
| `cli/tray/autostart.ts`                                                                                     | Platformfüggetlen automatikus indítás (LaunchAgent / .desktop / beállításjegyzék)                                               |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Ötlépéses SQLite-illesztőprogram-feloldási lánc (csomagolt → futásidejű → késleltetett telepítés → node:sqlite → sql.js)        |
| `cli/runtime/magicBytes.mjs`                                                                                | Bináris magic byte ellenőrzése (ELF / Mach-O / Mach-O fat / PE)                                                                 |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — előre feloldja az illesztőprogramokat az utótelepítéskor / első indításkor                                 |
| `nodeRuntimeSupport.mjs`                                                                                    | A támogatott Node.js-verzió ellenőrzése telepítéskor                                                                            |

---

## `skills/` — Nyilvános ügynökképességek

| Fájl                         | Rendeltetés                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 képességjegyzék külső MI-ügynökökhöz (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Buildelési és ellenőrző szkriptek

| Szkript                             | Rendeltetés                                                                                                           |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Fejlesztési/indítási futtató környezeti változók betöltésével                                                         |
| `build-next-isolated.mjs`           | Önálló build (önálló Next.js 16)                                                                                      |
| `prepublish.ts`                     | Csomag-előkészítés az `npm pack` előtt                                                                                |
| `postinstall.mjs`                   | A `.env` automatikus létrehozása a `.env.example` alapján az első telepítéskor                                        |
| `sync-env.mjs`                      | A `.env` kulcsainak újbóli szinkronizálása a `.env.example` fájllal                                                   |
| `check-cycles.mjs`                  | Körkörös függőségek észlelése                                                                                         |
| `check-route-validation.mjs`        | Annak ellenőrzése, hogy minden API-útvonal rendelkezik Zod-validációval                                               |
| `check-t11-any-budget.mjs`          | Fájlonkénti explicit `any`-keret kikényszerítése                                                                      |
| `check-docs-sync.mjs`               | A dokumentáció verziószinkronjának ellenőrzése (meglévő pre-commit)                                                   |
| **`check-env-doc-sync.mjs`**        | ÚJ: a kódban, a `.env.example` fájlban és az `ENVIRONMENT.md` dokumentumban lévő környezeti változók összevetése      |
| **`check-docs-counts-sync.mjs`**    | ÚJ: annak ellenőrzése, hogy a darabszámok (végrehajtók, stratégiák, OAuth, A2A-képességek) egyeznek a dokumentációval |
| **`check-deprecated-versions.mjs`** | ÚJ: az elavult verziók/dátumok megjelölése a dokumentációban                                                          |
| `check-supported-node-runtime.ts`   | Annak ellenőrzése, hogy az aktuális Node-verzió támogatott-e                                                          |
| `check-pr-test-policy.mjs`          | A „tesztek szükségesek” szabály kikényszerítése az éles kód módosításainál                                            |
| **`gen-provider-reference.ts`**     | ÚJ: a `docs/reference/PROVIDER_REFERENCE.md` automatikus generálása a katalógusból                                    |
| `i18n/generate-multilang.mjs`       | Felhasználóifelület-szövegek és dokumentáció fordítása a Google Fordítóval                                            |
| `i18n_autotranslate.py`             | LLM-alapú dokumentációfordítási folyamat                                                                              |
| `validate_translation.py`           | Lokalizációnkénti fordításellenőrzés                                                                                  |
| `check_translations.py`             | Kódoldali i18n-kulcsok ellenőrzése                                                                                    |
| `run-playwright-tests.mjs`          | Playwright E2E-futtató                                                                                                |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2E-futtató                                                                                                   |
| `run-ecosystem-tests.mjs`           | Ökoszisztéma- (szolgáltatói integrációs) tesztek                                                                      |
| `test-report-summary.mjs`           | Lefedettségi összefoglaló generálása markdown formátumban                                                             |
| `smoke-electron-packaged.mjs`       | A csomagolt Electron-build füsttesztelése                                                                             |
| `native-binary-compat.mjs`          | Annak ellenőrzése, hogy a natív függőségek (`better-sqlite3`) illeszkednek-e az Electron Node-verziójához             |
| `validate-pack-artifact.ts`         | Az npm-csomag kimenetének ellenőrzése                                                                                 |
| `responses-ws-proxy.mjs`            | WebSocket-híd a Codex Responses API-hoz                                                                               |
| `v1-ws-bridge.mjs`                  | WebSocket-híd az `/api/v1/ws` végponthoz                                                                              |
| `standalone-server-ws.mjs`          | Önálló WS-kiszolgáló futtatója                                                                                        |
| `system-info.mjs`                   | Rendszer-/futásidejű információk kiírása támogatási célokra                                                           |
| `healthcheck.mjs`                   | Egyszeri állapotellenőrzés (a Docker HEALTHCHECK használja)                                                           |
| `uninstall.mjs`                     | Tiszta eltávolítást végző szkript                                                                                     |
| `dev/sync-ui-kit.sh`                | A CI UI Kit `src/` könyvtárának másolása egy rögzített commitból a `packages/ui-kit/src` könyvtárba                   |
| `check/check-ui-kit-snapshot.mjs`   | Pre-commit ellenőrzési kapu: a `packages/ui-kit/src` megegyezik a rögzített upstream committal                        |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — használatban lévő ikonnevek, amelyeket az `ICON_MAP` nem képez le                            |
| `dev/codemod-material-icons.mjs`    | Literális Material Symbols span elemek átírása `<Icon>` elemekre (migrációs eszköz)                                   |

---

## `docs/` — Nyilvános dokumentáció (7 gyökérszintű fájl + 17 alkönyvtár)

### Felső szintű útmutatók

| Dok                         | Rendeltetés                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Magas szintű architektúra, alrendszer-térkép, irányítópult-felület                                        |
| `CODEBASE_DOCUMENTATION.md` | Mérnöki referencia: könyvtárak, modulok, konvenciók                                                       |
| `FEATURES.md`               | Funkciómátrix a v3.8 kiemelt újdonságaival                                                                |
| `USER_GUIDE.md`             | Végfelhasználói kézikönyv (beállítás, modellek, kombók, CLI-k, hang stb.)                                 |
| `API_REFERENCE.md`          | API-végpont-referencia hitelesítési modellel                                                              |
| `openapi.yaml`              | OpenAPI 3.0 specifikáció (121 útvonal)                                                                    |
| `SETUP_GUIDE.md`            | Telepítési módszerek (npm, npx, Docker, Electron, Termux, forrás)                                         |
| `ENVIRONMENT.md`            | Az összes környezeti változó (~800 dokumentálva, ~3050 soros `.env.example`)                              |
| `TROUBLESHOOTING.md`        | Gyakori hibák + a v3.8.0 ismert problémái                                                                 |
| `RELEASE_CHECKLIST.md`      | Teljes kiadási folyamat (skillek, husky, conventional commits, deploy)                                    |
| `COVERAGE_PLAN.md`          | Lefedettségi célok és aktuális állapot                                                                    |
| `FREE_TIERS.md`             | Válogatott ingyenes csomagú szolgáltatók (48+ ingyenes + 11 OAuth)                                        |
| `CLI-TOOLS.md`              | Külső CLI-integrációk + belső OmniRoute CLI                                                               |
| `I18N.md`                   | i18n-architektúra, nyelv hozzáadása, 67 területi beállítás                                                |
| `UNINSTALL.md`              | Tiszta eltávolítás lépései                                                                                |
| `PROVIDER_REFERENCE.md`     | **Automatikusan generált** katalógus 376 szolgáltatóról (újragenerálás: `npm run gen:provider-reference`) |

### Alrendszeri mélyreható ismertetők

| Dok                                         | Rendeltetés                                                                                    |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                             | MCP-szerver: 110 eszköz, 3 átvitel, 33 hatókör, REST-végpontok                                 |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC, 6 skill, REST-segédek, ügynökkártya                                        |
| `AGENT_PROTOCOLS_GUIDE.md`                  | Egységesített útmutató: A2A vs ACP vs felhős ügynökök                                          |
| `CLOUD_AGENT.md`                            | Codex Cloud / Devin / Jules-orchestráció                                                       |
| `SKILLS.md`                                 | Skills-keretrendszer (beépített + marketplace + SkillsSH + sandbox)                            |
| `RADAR.md`                                  | Radar ingyenesmodell-katalógus felülíró réteg (`RADAR_ENABLED`, alapértelmezetten kikapcsolva) |
| `MEMORY.md`                                 | Memóriarendszer (SQLite FTS5 + Qdrant)                                                         |
| `EVALS.md`                                  | Eval-keretrendszer (csomagok, futtatások, értékelési szempontok)                               |
| `GUARDRAILS.md`                             | PII-maszkoló, prompt-injektálás, vision-híd                                                    |
| `COMPLIANCE.md`                             | Auditnapló, megőrzés, noLog-leiratkozás                                                        |
| `WEBHOOKS.md`                               | HMAC-aláírt webhook-kézbesítés                                                                 |
| `REASONING_REPLAY.md`                       | Hibrid memória/SQLite-gyorsítótár a `reasoning_content`-hez                                    |
| `AUTHZ_GUIDE.md`                            | Engedélyezési feldolgozási sor (`classify` → `policies` → `enforce`)                           |
| `RESILIENCE_GUIDE.md`                       | Circuit breaker + cooldown + modell-kizárás                                                    |
| `docs/security/STEALTH_GUIDE.md` (git only) | TLS-ujjlenyomat (JA3/JA4), Claude Code CCH, MITM-tanúsítvány                                   |
| `AUTO-COMBO.md`                             | Auto Combo motor (16 tényezős pontozás, 6 módcsomag, virtuális gyár)                           |

### Tömörítés

| Dok                             | Rendeltetés                                |
| ------------------------------- | ------------------------------------------ |
| `COMPRESSION_GUIDE.md`          | A tömörítési módok áttekintése + ütemterv  |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK motorok, registry-szerződés  |
| `COMPRESSION_RULES_FORMAT.md`   | Caveman szabálycsomag JSON-séma            |
| `COMPRESSION_LANGUAGE_PACKS.md` | Nyelvenkénti szabálycsomag-leltár          |
| `RTK_COMPRESSION.md`            | RTK deklaratív feldolgozási sor (56 szűrő) |

### Üzembe helyezés

| Dokumentum                   | Cél                                                               |
| ---------------------------- | ----------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker build, profilok (base/cli/host/cliproxyapi), Redis sidecar |
| `VM_DEPLOYMENT_GUIDE.md`     | Általános VM/VPS telepítés (Ubuntu/Debian + nginx + systemd)      |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io telepítés (jelenleg csak kínaiul)                          |
| `TERMUX_GUIDE.md`            | Android headless futtatás Termux-szal                             |
| `PWA_GUIDE.md`               | Progressive Web App telepítés + service worker                    |
| `ELECTRON_GUIDE.md`          | Asztali alkalmazás buildelése + aláírása + terjesztése            |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                            |
| `PROXY_GUIDE.md`             | 4 szintű kimenő proxy + 1proxy marketplace                        |

### Alkönyvtárak

| Alkönyvtár            | Cél                                                                                                                                                                                                   |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Honosított dokumentációs fordítások (41 nyelven)                                                                                                                                                      |
| `docs/screenshots/`   | Képi elemek az útmutatókhoz                                                                                                                                                                           |
| `_tasks/superpowers/` | Tervek/specifikációk a superpowers-ből (`writing-plans`/`brainstorming`) + kutatás — izolált, külön verziózott repo, amelyet a fő fa gitignore-ol. Lásd: CLAUDE.md → "Planning & Research Artifacts". |

---

## `tests/` — Tesztcsomagok

| Alkatalógus                          | Típus                                            | Futtató                                          |
| ------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `tests/unit/`                        | Egységtesztek (~4 800 fájl, a leggyorsabbak)     | A Node natív tesztfuttatója                      |
| `tests/integration/`                 | Többmodulos + DB-integrációs tesztek             | A Node natív tesztfuttatója (1-es párhuzamosság) |
| `tests/e2e/`                         | Felhasználói felület + munkafolyamat E2E-tesztek | Playwright                                       |
| `tests/e2e/protocol-clients.test.ts` | MCP + A2A valós klienses E2E-tesztek             | Egyedi protokollkliensek                         |
| `tests/e2e/ecosystem.test.ts`        | Szolgáltatói integráció (hálózati hozzáféréssel) | A Node natív tesztfuttatója                      |

---

## `public/` — Statikus erőforrások

| Elérési út          | Rendeltetés                                                              |
| ------------------- | ------------------------------------------------------------------------ |
| `public/` (gyökér)  | Faviconok, robots.txt, manifest, service worker, marketingképek          |
| `public/providers/` | Szolgáltatói logók PNG/SVG formátumban (az irányítópulton használatosak) |

---

## `config/` — Statikus konfigurációk + minőségkapu-állapot

A kiadással szállított konfigurációs sablonok, valamint a verziókezelőbe mentett minőségkapu-alapértékek
(a v3.8.26 verzióban kerültek át ide a repó gyökeréből, hogy a gyökérkönyvtár áttekinthető maradjon).

| Elérési út                                    | Rendeltetés                                                                                              |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Területi beállítások listája + metaadatok (a 42 területi beállítás számának hiteles forrása)             |
| `config/i18n-schema.json`                     | Az `i18n.json` fájlt ellenőrző JSON-séma                                                                 |
| `config/payloadRules.json`                    | A felsőbb rétegből érkező hasznos adatok tisztítási szabályai                                            |
| `config/quality/quality-baseline.json`        | Több mérőszámos, csak szigorítható alapérték (`scripts/quality/check-quality-ratchet.mjs`)               |
| `config/quality/complexity-baseline.json`     | Rögzített ESLint-komplexitási alapérték (`check-complexity.mjs`)                                         |
| `config/quality/duplication-baseline.json`    | Rögzített jscpd-duplikációs alapérték (`check-duplication.mjs`)                                          |
| `config/quality/file-size-baseline.json`      | Rögzített, fájlonkénti méretalapérték (`check-file-size.mjs`)                                            |
| `config/quality/test-discovery-baseline.json` | Rögzített árva teszt alapérték (`check-test-discovery.mjs`)                                              |
| `config/quality/dependency-allowlist.json`    | Jóváhagyott függőségek engedélyezési listája (`check-deps.mjs`)                                          |
| `config/quality/.license-allowlist.json`      | SPDX-licencek engedélyezési listája (`check-licenses.mjs`)                                               |
| `config/quality/quality-metrics.json`         | Ideiglenesen gyűjtött mérőszámok (a `collect-metrics.mjs` hozza létre; **a git figyelmen kívül hagyja**) |

---

## `.github/` — GitHub-integráció

| Elérési út                         | Rendeltetés                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions CI/CD-munkafolyamatok (lintelés, tesztelés, lefedettség, kiadás) |
| `.github/ISSUE_TEMPLATE/`          | Hiba- és funkcióigény-sablonok                                                  |
| `.github/pull_request_template.md` | PR-sablon                                                                       |
| `.github/dependabot.yml`           | Függőségfrissítési konfiguráció                                                 |

---

## `.husky/` — Git-hookok

| Fájl         | Rendeltetés                                                                     |
| ------------ | ------------------------------------------------------------------------------- |
| `pre-commit` | Futtatja a következőket: `lint-staged + check-docs-sync + check:any-budget:t11` |
| `pre-push`   | Jelenleg letiltva (kikommentezve). Futtassa kézzel: `npm run test:unit`.        |
| `_/`         | A Husky belső fájljai                                                           |

---

## `.claude/` — Claude Code perjeles parancsok

| Fájl                                                | Rendeltetés                                                   |
| --------------------------------------------------- | ------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — verzióemelés + automatikus változásnapló |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — teljes kiadási munkafolyamat         |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Telepítés VPS-re                                              |
| `commands/capture-release-evidences-cc.md`          | Új funkciók böngészőbeli rögzítése WebP formátumban           |
| `commands/review-{prs,discussions}-cc.md`           | GitHub PR-ek/discussions rendszerezése                        |
| `commands/{review-issues,implement-features}-cc.md` | Hibajegy-munkafolyamatok                                      |
| `settings.local.json`                               | Projektspecifikus Claude Code-beállítások                     |

---

## `.agents/` — Általános ügynöki munkafolyamatok (Codex / Cursor / stb.)

| Elérési út               | Rendeltetés                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 munkafolyamat-definíció (a `.claude/commands/` tükörpéldánya) |
| `skills/<name>/SKILL.md` | 9 készségdefiníció Codex végrehajtási megjegyzésekkel            |

> **Megjegyzés:** A munkafolyamatok és a parancsok jelenleg bájtról bájtra megegyeznek. Ha az `.agents/` célja egy másik ügynök-futtatókörnyezet (Codex) támogatása, a változatoknak érdemben el kell térniük egymástól.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — A projektfán kívüli tartalom

Ezek az aláhúzásjellel kezdődő könyvtárak a kiadásba nem kerülő tartalmakat tárolják:

- **`_ideia/`** — tervezési jegyzetek (defer / notfit / viable kategóriák)
- **`_mono_repo/`** — korábbi alprojektek (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — kapcsolódó nyílt forráskódú projektek csak olvasható klónjai (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api stb.), fejlesztés közbeni összehasonlítás céljából
- **`_tasks/`** — kiadásonkénti feladatkövetési fájlok (informális)

Nem szerepelnek az `npm pack` kimenetében. Lásd: `.npmignore`.

---

## Generált / Git által figyelmen kívül hagyott

| Elérési út             | Rendeltetés                        |
| ---------------------- | ---------------------------------- |
| `node_modules/`        | npm-függőségek                     |
| `.next/`               | Next.js buildkimenet               |
| `coverage/`            | c8 lefedettségi jelentések         |
| `logs/`                | Futásidejű naplók                  |
| `package/`             | npm pack előkészítési könyvtára    |
| `.playwright-mcp/`     | Playwright MCP tesztmelléktermékek |
| `.issues/`             | Helyi hibajegy-gyorsítótár         |
| `tsconfig.tsbuildinfo` | TS inkrementális gyorsítótár       |

---

## Navigációs tippek

- **Új közreműködő vagy?** Olvasd el ezeket sorrendben: `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Szolgáltatót adsz hozzá?** Kövesd a `docs/architecture/ARCHITECTURE.md § Adding a New Provider` szakaszt, és vesd össze a `docs/reference/PROVIDER_REFERENCE.md` dokumentummal.
- **Útvonalat adsz hozzá?** `docs/architecture/ARCHITECTURE.md § Adding a New API Route` + `src/shared/validation/schemas.ts`.
- **MCP-eszközt adsz hozzá?** `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **A2A-képességet adsz hozzá?** `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Helyben futtatnád?** `docs/guides/SETUP_GUIDE.md`.
- **Üzembe helyeznéd?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Kiadást készítenél?** `docs/ops/RELEASE_CHECKLIST.md` (és a `/generate-release-cc` Claude Code-képesség).
