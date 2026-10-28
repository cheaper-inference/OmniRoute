# Repository Map (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Iga kataloogi ja juurfaili üherealine kirjeldus.**
> Viimati uuendatud: 2026-06-28 — OmniRoute v3.8.40
>
> Kasutage seda kaarti koodibaasis kiireks navigeerimiseks. Põhjalikuma teabe saamiseks järgige spetsiaalse dokumentatsiooni linke.

## Tipptaseme puu

```
OmniRoute/
├── src/                  # Next.js 16 rakendus (kasutajaliides + API marsruudid + teegid + domeen + server)
├── open-sse/             # Voogedastusmootori tööruum (töötlejad, täiturid, tõlkija, MCP-server)
├── packages/            # npm-i tööruumid: ui-kit (kaasatud Keak CI UI Kit) ja browser-pool
├── electron/             # Töölauarakenduse ümbris (Electron 41 + electron-builder 26.10)
├── bin/                  # CLI sisenemispunkt ja käskude töötlejad
├── scripts/              # Koostamis-, kontrollimis-, sünkroonimis- ja ühekordsed skriptid
├── docs/                 # Avalik dokumentatsioon (olete siin)
├── tests/                # Kõik testikomplektid (ühik-, integratsiooni-, e2e- ja protokolliklientide testid)
├── public/               # Next.js-i staatilised varad, PWA manifest, teenusetöötaja, ikoonid
├── config/               # Staatiline konfiguratsioon + kvaliteedivärava olek (i18n, payloadRules, quality/)
├── images/               # Turunduse / README pildivarad
├── @omniroute/           # Avaldatavad kaaspaketid (opencode-plugin, opencode-provider)
├── skills/               # CLI/agentide oskuspaketid (cli-* + omni-* + config-codex-cli)
├── examples/             # Näidispluginad + omniroute-cmd-hello alustuspõhi
├── contrib/              # Kogukonna panused (podman/)
├── .source/              # Fumadocsi lähtekonfiguratsioon (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actionsi töövood + probleemimallid + PR-i mall
├── .husky/               # Git-konksud (pre-commit, pre-push)
├── .claude/              # Claude Code'i kaldkriipsukäsud (projektipõhised)
├── .agents/              # Codexi / üldiste agentide töövood + oskused (.claude/ peegel)
├── .vscode/              # VS Code'i tööruumi sätted
├── _ideia/               # Planeerimismärkmed (mitteametlikud; ei tarnita)
├── _mono_repo/           # Ajaloolised alamprojektid (cloud, site, vscode-extension)
├── _references/          # Seotud OSS-projektide kirjutuskaitstud viitekloonid
├── _tasks/               # Väljalaskepõhised ülesannete jälgimise failid (mitteametlikud)
├── .build/ .worktrees/ dist/   # Kohalikud koostamis-, git-worktree- ja koostamisväljundi ajutised failid (gitignore'iga eiratud)
├── .issues/              # Kohalik probleemide vahemälu (gitignore'iga eiratud)
├── .playwright-mcp/      # Playwright MCP testiartefaktid
├── coverage/             # c8 testikatvuse väljund (gitignore'iga eiratud)
├── logs/                 # Käitusaegsed logid (gitignore'iga eiratud)
├── node_modules/         # Sõltuvused (gitignore'iga eiratud)
├── package/              # npm pack-i ettevalmistusala (koostamisartefakt)
├── .next/                # Next.js-i koostamisväljund (gitignore'iga eiratud)
└── (juurfailid — vt allpool)
```

---

## Juurfailid

| Fail                                        | Otstarve                                                                                                  |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Turunduslik sihtleht + kiirjuhend + funktsioonide maatriks (vt ka `llm.txt`)                              |
| **CHANGELOG.md**                            | Väljalaskepõhine muudatuste logi (genereeritakse automaatselt oskusega `/version-bump-cc`)                |
| **LICENSE**                                 | MIT-litsentsi tekst                                                                                       |
| **CLAUDE.md**                               | Projekti reeglid Claude Code’i agentidele (kohustuslikud reeglid, kokkulepped, stsenaariumid)             |
| **AGENTS.md**                               | Sama mis CLAUDE.md, kuid muudele AI-agentidele (Codex, Cursor jne)                                        |
| **GEMINI.md**                               | Lühikesed reeglid Gemini-põhistele agentidele (CLAUDE.md alamhulk)                                        |
| **CONTRIBUTING.md**                         | Kaastööjuhend: seadistamine, tavapärased commit’id, testimine, PR-i töövoog                               |
| **SECURITY.md**                             | Turvanõrkustest teatamise kord, toetatud versioonid, ohumudel                                             |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — kogukonnas käitumise ootused                                                       |
| **llm.txt**                                 | Lihttekstis sihtleht, mis on optimeeritud LLM-i roomikutele (SEO AI-assistentide jaoks)                   |
| **package.json**                            | npm-i manifest, skriptid, sõltuvused, käituskeskkonna nõuded, c8 katvuskontroll                           |
| **package-lock.json**                       | Lukustatud sõltuvuspuu                                                                                    |
| **tsconfig.json**                           | TypeScripti juurkonfiguratsioon                                                                           |
| **tsconfig.typecheck-core.json**            | Tüübikontrolli konfiguratsioon `src/` tuuma jaoks                                                         |
| **tsconfig.typecheck-noimplicit-core.json** | Range (`noImplicitAny`) tüübikontroll                                                                     |
| **tsconfig.tsbuildinfo**                    | TS-i inkrementaalse koostamise vahemälu (gitignored)                                                      |
| **next.config.mjs**                         | Next.js 16 koostekonfiguratsioon (eraldiseisev väljund)                                                   |
| **next-env.d.ts**                           | Next.js-i automaatselt genereeritud keskkonnatüübid                                                       |
| **eslint.config.mjs**                       | ESLinti lamekonfiguratsioon (reeglid projektialade kaupa)                                                 |
| **prettier.config.mjs**                     | Prettieri vormindusreeglid                                                                                |
| **postcss.config.mjs**                      | PostCSS-i konfiguratsioon Tailwindi/CSS-i töövoo jaoks                                                    |
| **playwright.config.ts**                    | Playwrighti E2E-testide konfiguratsioon                                                                   |
| **vitest.config.ts**                        | Vitesti konfiguratsioon (vaikimisi testikomplekt)                                                         |
| **vitest.mcp.config.ts**                    | Vitesti konfiguratsioon MCP-serveri / autoCombo / vahemälu testikomplektide jaoks                         |
| **sonar-project.properties**                | SonarQube’i/SonarCloudi konfiguratsioon (koodikvaliteet)                                                  |
| **Dockerfile**                              | Mitmeetapiline Dockeri koosteprotsess (builder → runner-base → runner-cli)                                |
| **docker-compose.yml**                      | Arenduskeskkonna Compose nelja profiiliga (base, cli, host, cliproxyapi) + Redise kõrvalkonteiner         |
| **docker-compose.prod.yml**                 | Tootmiskeskkonna Compose (port 20130, Redis, nimega andmeköited)                                          |
| **.dockerignore**                           | Dockeri kontekstist välistatud failid                                                                     |
| **fly.toml**                                | Fly.io juurutuskonfiguratsioon (piirkond `sin`, port 20128, andmeköide /data)                             |
| **.env.example**                            | Keskkonnafaili mall (kopeeritakse esimesel installimisel automaatselt faili `.env`)                       |
| **.gitignore**                              | Giti eiramismustrid                                                                                       |
| **.npmignore**                              | npm-is avaldamisest välistatavate failide loend                                                           |
| **.npmrc**                                  | npm-i konfiguratsioon (register, lukustusfaili reeglid)                                                   |
| **.node-version**                           | Fikseeritud Node’i versioon (kasutavad nvm-iga ühilduvad tööriistad)                                      |
| **.nvmrc**                                  | Fikseeritud Node’i versioon nvm-i jaoks                                                                   |
| **eslint.complexity.config.mjs**            | ESLinti konfiguratsioon keerukuse astmelise piiraja jaoks (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | ESLinti konfiguratsioon SonarJS-i reeglite jaoks (kognitiivne keerukus / dubleerimine)                    |
| **source.config.ts**                        | Fumadocsi `defineDocs` lähtekonfiguratsioon (täidab `.source/` sisu)                                      |
| **knip.json**                               | Knipi konfiguratsioon — kasutamata failid/ekspordid/sõltuvused (toidab surnud koodi kontrolli)            |
| **stryker.conf.json**                       | Strykeri mutatsioonitestimise konfiguratsioon                                                             |
| **.size-limit.json**                        | size-limit'i paketi mahupiirangu konfiguratsioon                                                          |
| **promptfooconfig.yaml**                    | promptfoo hindamise konfiguratsioon                                                                       |
| **.gitleaks.toml**                          | gitleaksi saladuste skannimise reeglistik                                                                 |
| **.zizmor.yml**                             | zizmori GitHub Actionsi turbekontrolli konfiguratsioon                                                    |
| **socket.yml**                              | Socket.devi tarkvara tarneahela konfiguratsioon                                                           |
| **news.json**                               | Lokaliseeritud v2 teadaannete voog; Radari väljalaskekirje tarnitakse inaktiivsena                        |
| **flake.nix** / **flake.lock**              | Nixi arenduskesta definitsioon + lukufail                                                                 |
| **.env**                                    | Kohalikud saladused (gitignore'iga eiratud — genereeritud failist `.env.example`)                         |

> **Teisaldatud versioonis v3.8.26 juurkataloogist välja (korrastamine):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` ja genereeritud `quality-metrics.json` (gitignore'iga eiratud). Vaadake jaotist [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js rakendus

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

### `src/app/` – rakenduse ruuter (Next.js 16)

| Tee                                                                          | Eesmärk                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Avalik OpenAI-compat API (~ 25 alammarsruudid: vestlus, lõpetamised, manustused, failid, paketid, heli, pildid, videod, muusika, ümberpaigutamine, modereerimine, otsing, ws, agendid, kontod, pakkujad jne)                                                                                      |
| `app/api/v1beta/`                                                            | Kaksikute stiilis API lõpp-punktid                                                                                                                                                                                                                                                                |
| `app/api/playground/`                                                        | Playground Studio marsruudid: `improve-prompt/` (POST — LLM viipade ümberkirjutaja), `presets/` (GET list / POST create), `presets/[id]/` (GET / PUT / DELETE) — vt `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                        |
| `app/api/` (mitte v1)                                                        | Management/admin marsruudid (~ 60 kataloogid: pakkujad, kombod, seaded, mcp, a2a, evals, mälu, oskused, veebihaagid, vastavus, vastupidavus, jälgimine, tunnelid, kliiritööriistad jne)                                                                                                           |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 marsruuti (serveri juhtimine, agent state/DNS/mappings, ümbersõit, sert, ülesvoolu CA). LOCAL_ONLY + SPAWN_CAPABLE. Vaadake `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                        |
| `app/api/tools/traffic-inspector/`                                           | Liiklusinspektor REST + WS API — 16 + marsruuti (päringud, seansid, hostid, püüdmisrežiimid, eksport, ws). LOCAL_ONLY + SPAWN_CAPABLE. Vaata `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                           |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 sisendpunkt (`POST /a2a`)                                                                                                                                                                                                                                                        |
| `app/.well-known/agent.json/`                                                | A2A agendikaart (avastus)                                                                                                                                                                                                                                                                         |
| `app/(dashboard)/dashboard/`                                                 | Armatuurlaua UI lehed (50 + jaotist, ~ 118 page.tsx -faili: pakkujad, kombinatsioonid, seaded, mälu, oskused, veebihaagid, evals, audit, pakett, vahemälu, kulud, tervis, süsteem, tegevus jne)                                                                                                   |
| `app/(dashboard)/dashboard/search-tools/`                                    | Otsingutööriistad Studio UI (3 vahekaarti: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — vt `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                             |
| `app/(dashboard)/dashboard/memory/`                                          | Mälustuudio (plaan 21): `page.tsx` (3 vahekaardi kest), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (kasuta,Sgine) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge armatuurlaua leht — serverikaart, 9 agendikaarti, häälestusviisard, mudeli kaardistamine, möödaviiguloend. i18n PT-BR + EN. Vaata `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                   |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Liiklusinspektori armatuurlaua leht – DevTools split, 7 detaili vahekaarti, 4 jäädvustamisrežiimi lülitit, seansi salvestaja, konteksti värvimine. i18n PT-BR + EN. Vaata `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                 |
| `app/(dashboard)/dashboard/activity/`                                        | Tegevuste voo leht (rühm B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — vt `docs/architecture/MONITORING_SECTIONS.md`                                                                                              |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Kvoodi jagamise leht (rühm B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                        |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Pakkuja plaani konfiguratsioonileht (rühm B): `page.tsx` + `ProviderPlanConfigClient.tsx` — kvoodi mõõtmed ühenduse alistamise kohta                                                                                                                                                              |
| `app/docs/`                                                                  | Manustatud dokumentatsiooni vaataja (renderdab `docs/*.md`)                                                                                                                                                                                                                                       |
| `app/landing/`                                                               | Turunduse sihtleht                                                                                                                                                                                                                                                                                |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Authiga seotud lehed                                                                                                                                                                                                                                                                              |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP vealehed                                                                                                                                                                                                                                                                                     |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Static/status                                                                                                                                                                                                                                                                                     |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Juurepaigutus, koduleht, PWA manifest, globaalne CSS                                                                                                                                                                                                                                              |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Vigade piirid                                                                                                                                                                                                                                                                                     |

### `src/lib/` – põhiteegid (~ 50 moodulit)

| Moodul                                   | Eesmärk                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A protokolli ülesannete haldur, oskused (5), voogedastus                                                                                                                                                                                                                                                            |
| `acp/`                                   | CLI agendiregister (kohalik CLI tuvastus – vt `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                             |
| `api/`                                   | Jagatud API abilised (`requireManagementAuth`, valideerimine)                                                                                                                                                                                                                                                         |
| `auth/`                                  | Seanss, parooli räsimine, loa valideerimine                                                                                                                                                                                                                                                                           |
| `batches/`                               | OpenAI Partii API käitlejad                                                                                                                                                                                                                                                                                           |
| `catalog/`                               | Pakkuja kataloog Zod valideerimine + võimekuse eraldusvõime                                                                                                                                                                                                                                                           |
| `cloudAgent/`                            | Pilveagendid (Codex Cloud, Devin, Jules) – vt `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                        |
| `combos/`                                | Kombineeritud eraldusvõimega + ümbertellimise abilised                                                                                                                                                                                                                                                                |
| `audit/`                                 | Tegevusvoo abilised: `highLevelActions.ts` (lubade loend + `isHighLevelAction()`), `activityIcons.ts` (tegevuste → icon/verb kaart), `timeline.ts` (groupByDay/relativeTime) — vt `docs/architecture/MONITORING_SECTIONS.md`                                                                                          |
| `compliance/`                            | Auditi logi + pakkuja audit – vt `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                        |
| `compression/`                           | Kompressioonmootori liim (mootorid elavad `open-sse/services/compression/`)                                                                                                                                                                                                                                           |
| `config/`                                | Käitusaja konfigureerimise abilised                                                                                                                                                                                                                                                                                   |
| `db/`                                    | 120 + domeeni DB moodulit + 168 migratsiooni ( SQLite puhul minge alati siit läbi)                                                                                                                                                                                                                                    |
| `quota/`                                 | Kvoodi jagamise mootor: `dimensions.ts` (types/Zod), `types.ts` (QuotaStore liides), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — vt `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Radari vabamudeli kataloogi klient: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — vt `docs/frameworks/RADAR.md`                                                                                                                                        |
| `display/`                               | UI vormindamise abilised (kulu, latentsus jne)                                                                                                                                                                                                                                                                        |
| `embeddings/`                            | Manustatakse teenuse abilised                                                                                                                                                                                                                                                                                         |
| `env/`                                   | Env muutuja parsimine + valideerimine                                                                                                                                                                                                                                                                                 |
| `evals/`                                 | Eval raamistik (sviidid, jooksja, käitusaeg) – vt `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                          |
| `guardrails/`                            | PII masker, kiire süstimine, nägemissild – vt `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                           |
| `jobs/`                                  | Taustatööd (cronilaadsed)                                                                                                                                                                                                                                                                                             |
| `memory/`                                | Vestlusmälu (SQLite FTS5 + sqlite-vec hübriid RRF + Qdrant tase 2) — vt `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                   |
| `memory/embedding/`                      | Mitme allikaga manustamiskiht: `index.ts` (lahendaja), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plaan 21)                                                                                                                                                                      |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 ümbris – KNN brute-force + hübriid RRF (FTS5 + vektor, k = 60). Lazy-init, laguneb graatsiliselt, kui sqlite-vec pole saadaval. (plaan 21)                                                                                                                                                          |
| `memory/reindex.ts`                      | `runReindexBatch()` — töötleb mälestusi `needs_reindex=1` taustal; kutsutakse `POST /api/memory/reindex` ja laiska-tagasitäite teega. (plaan 21)                                                                                                                                                                      |
| `monitoring/`                            | Tervisekontroll, mõõdikud emissioon                                                                                                                                                                                                                                                                                   |
| `oauth/`                                 | OAuth/import vood 22 pakkuja mooduli jaoks (agy, antigravity, claude, cline, codebuddy-cn, codex, kursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilokood, kimi-kodeerimine, traqo, xau-oference, kiro, xai-oference zed-hosted, zed)                                              |
| `plugins/`                               | Pluginate register                                                                                                                                                                                                                                                                                                    |
| `promptCache/`                           | Antroopilises stiilis kiire vahemälu katkestuspunktid                                                                                                                                                                                                                                                                 |
| `skills/`                                | Oskuste raamistik (sisseehitatud + turg + SkillsSH) – vt `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                  |
| `playground/`                            | Playground Studio jagasid abilised: `codeExport.ts` (curl/Python/TS generaator), `promptImprover.ts` (meta-prompt builder), `streamMetrics.ts` (puhas TTFT/TPS), `types.ts` (hinnatabel) — vaata `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                               |
| `webhookDispatcher.ts`                   | HMAC veebihaagi kohaletoimetamine – vt `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                  |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Tunnelihaldurid – vt `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                      |
| `cloudSync.ts`, `initCloudSync.ts`       | Valikuline oleku pilvesünkroonimine                                                                                                                                                                                                                                                                                   |
| `localDb.ts`                             | Reekspordi tünn db-moodulite jaoks (ilma loogikata – ainult reeksport)                                                                                                                                                                                                                                                |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Taotlege + idempotentsuse vahemällu salvestamist                                                                                                                                                                                                                                                                      |
| (~ veel 30 tipptaseme faili)             | Spetsiaalsed abilised (logEnv, modelsDevSync, piiSanitizer jne)                                                                                                                                                                                                                                                       |

### `src/lib/db/` – andmebaas (147 moodulit + 208 migratsiooni)

| Subdir                    | Eesmärk                                                                                                                                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | `getDbInstance()` singleton koos WAL ajakirjandusega                                                                                                                                                        |
| `db/migrations/`          | Versioonitud SQL failid (idempotentsed, tehingupõhised). `073_memory_vec.sql` lisab `memory_vec_meta` + `needs_reindex` veeru (plaan 21).                                                                   |
| `db/playgroundPresets.ts` | CRUD moodul Playground Studio eelseadete jaoks (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)                               |
| `db/memoryVec.ts`         | CRUD `memory_vec_meta` jaoks (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` jne (plaan 21)                                                |
| `db/<domain>.ts`          | Üks moodul domeeni kohta: pakkujad, kombinatsioonid, apiKeys, kasutajad, seansid, kasutus, auditi logi, veebihaagid, oskused, mälu_sisestused, pilve_agendi_ülesanded, evals* \* , põhjenduse_vahemälu jne. |

### `src/domain/`

| Moodul                 | Eesmärk                                                   |
| ---------------------- | --------------------------------------------------------- |
| `policy.ts`            | Poliitikamootor                                           |
| `fallbackPolicy.ts`    | Varuotsuste puu                                           |
| `costRules.ts`         | Kulude arvutamise reeglid                                 |
| `lockoutPolicy.ts`     | Model/connection töösulu poliitika                        |
| `tagRouter.ts`         | Sildipõhine marsruutimine                                 |
| `comboResolver.ts`     | Kombineeritud eraldusvõime (kasutab kombineeritud mootor) |
| `modelAvailability.ts` | Mudeli saadavuse kontroll                                 |
| `assessment/`          | Mudeli hindamine (RFC-AUTO-HINDAMISE 1. etapp)            |

### `src/server/`

| Moodul   | Eesmärk                                                                                             |
| -------- | --------------------------------------------------------------------------------------------------- |
| `authz/` | Autoriseerimiskonveier: `classify` → `policies` → `enforce` — vt `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS konfiguratsioon                                                                                |
| `auth/`  | Seansi vahevara                                                                                     |

### `src/shared/`

| Moodul                           | Eesmärk                                                                                               |
| -------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `components/`                    | Armatuurlaua komponent API: adapterid üle `packages/ui-kit` – vt `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: ekraanidel kasutatavad ikooninimed → Lucide'i komponendid (`<Icon>`)                      |
| `constants/providers.ts`         | **377 pakkujat** Zod valideerimisega (tõe allikas)                                                    |
| `constants/cliTools.ts`          | Väline CLI tööriista register                                                                         |
| `constants/routingStrategies.ts` | **20 marsruutimisstrateegiat** prioriteetidega                                                        |
| `constants/publicApiRoutes.ts`   | Marsruudid, mis nõuavad kandja (vs haldamise) autentimist                                             |
| `constants/upstreamHeaders.ts`   | Päise keelamisloend ülesvoolu päringute jaoks                                                         |
| `validation/schemas.ts`          | ~ 80 Zod skeemi (üks tõeallikas API lepingute jaoks)                                                  |
| `validation/helpers.ts`          | Zod valideerimisabilised (`validateBody` jne)                                                         |
| `types/`                         | Jagatud TS tüübid                                                                                     |
| `contracts/`                     | Riiklikud API lepingud (tarbib `files:` `package.json`)                                               |
| `utils/circuitBreaker.ts`        | Pakkuja kaitselüliti (vt `docs/architecture/RESILIENCE_GUIDE.md`)                                     |
| `utils/apiAuth.ts`               | API võtme valideerimine, ulatuse kontroll                                                             |
| `utils/fetchTimeout.ts`          | Timeout/abort ümbrised ülesvoolu toomiseks                                                            |
| `utils/releaseNotes.ts`          | Suletud v2/legacy teadaannete parser, lokaliseerimine ja ID vallandamine                              |

---

## `open-sse/` — voogedastusmootori tööruum

Eraldi npm-i tööruum (`@omniroute/open-sse`). Tegeleb päringute töötlemise ja teenusepakkujate käitamisega.

```
open-sse/
├── handlers/            # 16 faili (12 töötlejat + 4 abifaili): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search jne.
├── executors/           # 150 käituri moodulit (BaseExecutorit laiendavad klassid + teenusepakkuja-põhised abifailid)
├── translator/          # Vormingute teisendajad (9 päringu-, 9 vastuse- ja 9 abimoodulit)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ teenusemoodulit (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM jne)
├── mcp-server/          # MCP-server (110 tööriista, 3 transporti, 33 ulatust)
├── config/              # Teenusepakkujate/mudelite registrid, päiste konfiguratsioon, mudelite aliased
├── utils/               # TLS-klient, puhverserveri fetch/dispatcher, võrguabitööriistad
├── index.ts             # Tööruumi sisenemispunkt
├── package.json         # Tööruumi manifest
├── tsconfig.json        # Tööruumi TS-konfiguratsioon
└── types.d.ts           # Tööruumi tüübideklaratsioonid
```

### `open-sse/mcp-server/`

| Tee                         | Otstarve                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------- |
| `server.ts`                 | MCP-serveri elutsükkel (stdio- ja HTTP-transpordid)                                |
| `httpTransport.ts`          | HTTP Streamable'i + SSE transpordid (`/api/mcp/sse`, `/api/mcp/stream`)            |
| `audit.ts`                  | Auditilogimine tabelisse `mcp_tool_audit`                                          |
| `scopeEnforcement.ts`       | Tööriistapõhine ulatuse valideerimine                                              |
| `runtimeHeartbeat.ts`       | Tervise olekusignaal faili `DATA_DIR/runtime/mcp-heartbeat.json`                   |
| `descriptionCompressor.ts`  | Tihendab konteksti säästmiseks tööriistakirjelduste metaandmeid                    |
| `schemas/tools.ts`          | 36 põhitööriista definitsiooni + ulatused                                          |
| `tools/advancedTools.ts`    | Täiustatud tööriistade teostused                                                   |
| `tools/memoryTools.ts`      | 3 mälutööriista (otsimine/lisamine/tühjendamine)                                   |
| `tools/skillTools.ts`       | 4 oskusetööriista (loend/lubamine/käivitamine/käivitused)                          |
| `tools/compressionTools.ts` | 5 tihendustööriista                                                                |
| `README.md`                 | MCP-serveri sisemine README (ristviidatud failist `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — tööruumid

| Tee                      | Otstarve                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — Keak CI UI Kit-i repoteegis hoitav hetktõmmis (`private`, `UNLICENSED`), mida kasutatakse lähtekoodina (koostamist pole). `UPSTREAM.md` fikseerib ülesvoolu commiti ja dokumenteerib litsentsiloa; `PATCHES.md` loetleb kohalikud paigad (puuduvad); `src/` sünkroonitakse ainult skriptiga `scripts/dev/sync-ui-kit.sh` ja seda kontrollib `npm run check:ui-kit-snapshot`. Vt `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — valikuline brauserikogumi teenus (CloakBrowseri ja Playwrighti-põhine vestlus)                                                                                                                                                                                                                                                                                                                                 |

---

## `electron/` — Töölauarakenduse ümbris

| Fail             | Otstarve                                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `main.js`        | Electroni põhiprotsess (BrowserWindow, sisseehitatud Next.js-i server, süsteemisalv, automaatne uuendamine) |
| `preload.js`     | IPC-sild (contextBridge → `window.omniroute`)                                                               |
| `package.json`   | electron-builderi konfiguratsioon + Electron 41 + electron-builder 26.10 sõltuvused                         |
| `assets/`        | Rakenduse ikoonid (Windows .ico, macOS .icns, Linux .png)                                                   |
| `dist-electron/` | Koosteväljund (giti poolt eiratud)                                                                          |
| `types.d.ts`     | Renderdusprotsessi silla tüübi deklaratsioonid                                                              |
| `README.md`      | Electroni sisemine README (vt ka `docs/guides/ELECTRON_GUIDE.md`)                                           |

---

## `bin/` — Käsurealiides

| Fail                                                                                                        | Otstarve                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Käsurealiidese peamine sisenemispunkt — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` jne |
| `reset-password.mjs`                                                                                        | Eraldiseisev käsureatööriist parooli lähtestamiseks                                                                                             |
| `cli/commands/setup.mjs`                                                                                    | Interaktiivne ja mitteinteraktiivne häälestusviisard                                                                                            |
| `cli/commands/doctor.mjs`                                                                                   | Süsteemi seisundi diagnostika (üle 8 kontrolli)                                                                                                 |
| `cli/commands/providers.mjs`                                                                                | Pakkujate loendamine/testimine/valideerimine                                                                                                    |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Käsurealiidese abimoodulid                                                                                                                      |
| `cli/tray/tray.ts`                                                                                          | Süsteemisalve integratsioon (platvormiülene: NotifyIcon Windowsis, systray2 macOS-is/Linuxis)                                                   |
| `cli/tray/tray.ps1`                                                                                         | PowerShelli NotifyIconi taustaprogramm (Windows, ei lisa uusi binaarfaile)                                                                      |
| `cli/tray/autostart.ts`                                                                                     | Platvormiülene automaatkäivitus (LaunchAgent / .desktop / register)                                                                             |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | SQLite'i draiveri 5-etapiline lahendusahel (komplekteeritud → käituskeskkond → viitpaigaldus → node:sqlite → sql.js)                            |
| `cli/runtime/magicBytes.mjs`                                                                                | Binaarfailide signatuurbaitide valideerimine (ELF / Mach-O / Mach-O fat / PE)                                                                   |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — eellahendab draiverid pärast paigaldamist / esmakordsel käivitamisel                                                       |
| `nodeRuntimeSupport.mjs`                                                                                    | Toetatud Node.js-i versiooni valideerimine paigaldamisel                                                                                        |

---

## `skills/` — avalikud agendioskused

| Fail                         | Eesmärk                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 oskuste manifesti välistele tehisintellektiagentidele (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — koostamis- ja kontrollskriptid

| Skript                              | Eesmärk                                                                                                     |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Arendus-/käivitustööriist keskkonnamuutujate laadimisega                                                    |
| `build-next-isolated.mjs`           | Autonoomne koostamine (Next.js 16 standalone)                                                               |
| `prepublish.ts`                     | Paketi ettevalmistamine enne käsku `npm pack`                                                               |
| `postinstall.mjs`                   | `.env`-faili automaatne loomine `.env.example`-faili põhjal esmakordsel installimisel                       |
| `sync-env.mjs`                      | `.env`-faili võtmete uuesti sünkroonimine `.env.example`-failiga                                            |
| `check-cycles.mjs`                  | Tsükliliste sõltuvuste tuvastamine                                                                          |
| `check-route-validation.mjs`        | Kontrollib, et kõigil API marsruutidel oleks Zodi valideerimine                                             |
| `check-t11-any-budget.mjs`          | Jõustab failipõhise selgesõnalise `any` limiidi                                                             |
| `check-docs-sync.mjs`               | Dokumentatsiooni versioonide sünkroonsuse kontrollimine (olemasolev eelkommiteri kontroll)                  |
| **`check-env-doc-sync.mjs`**        | UUS: koodis, `.env.example`-failis ja `ENVIRONMENT.md`-failis olevate keskkonnamuutujate ristkontroll       |
| **`check-docs-counts-sync.mjs`**    | UUS: kontrollib, et arvud (täitjad, strateegiad, OAuth, A2A oskused) vastaksid dokumentatsioonile           |
| **`check-deprecated-versions.mjs`** | UUS: märgib dokumentatsioonis aegunud versioonid/kuupäevad                                                  |
| `check-supported-node-runtime.ts`   | Kontrollib, kas praegune Node'i versioon on toetatud                                                        |
| `check-pr-test-policy.mjs`          | Jõustab tootmiskoodi muudatuste puhul reegli „testid on kohustuslikud”                                      |
| **`gen-provider-reference.ts`**     | UUS: genereerib kataloogist automaatselt faili `docs/reference/PROVIDER_REFERENCE.md`                       |
| `i18n/generate-multilang.mjs`       | Kasutajaliidese stringide ja dokumentatsiooni tõlkimine Google Translate'i kaudu                            |
| `i18n_autotranslate.py`             | LLM-il põhinev dokumentatsiooni tõlketöövoog                                                                |
| `validate_translation.py`           | Tõlgete valideerimine lokaadi kaupa                                                                         |
| `check_translations.py`             | Koodipoolne i18n-võtmete kontroll                                                                           |
| `run-playwright-tests.mjs`          | Playwrighti E2E-testide käivitaja                                                                           |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2E-testide käivitaja                                                                               |
| `run-ecosystem-tests.mjs`           | Ökosüsteemi (teenusepakkujate integratsiooni) testid                                                        |
| `test-report-summary.mjs`           | Katvuse kokkuvõtte genereerimine Markdowni vormingus                                                        |
| `smoke-electron-packaged.mjs`       | Pakendatud Electroni koostu suitsutest                                                                      |
| `native-binary-compat.mjs`          | Kontrollib, et omasõltuvused (`better-sqlite3`) vastaksid Electroni Node'ile                                |
| `validate-pack-artifact.ts`         | npm-paketi väljundi valideerimine                                                                           |
| `responses-ws-proxy.mjs`            | WebSocketi sild Codex Responses API jaoks                                                                   |
| `v1-ws-bridge.mjs`                  | WebSocketi sild lõpp-punktile `/api/v1/ws`                                                                  |
| `standalone-server-ws.mjs`          | Autonoomse WS-serveri käivitaja                                                                             |
| `system-info.mjs`                   | Süsteemi-/käituskeskkonna teabe kuvamine kasutajatoe jaoks                                                  |
| `healthcheck.mjs`                   | Ühekordne seisundikontroll (kasutab Docker HEALTHCHECK)                                                     |
| `uninstall.mjs`                     | Puhas desinstallimisskript                                                                                  |
| `dev/sync-ui-kit.sh`                | CI UI Kit-i kataloogi `src/` kopeerimine fikseeritud kommiti seisuga kataloogi `packages/ui-kit/src`        |
| `check/check-ui-kit-snapshot.mjs`   | Eelkommiteri kontroll: `packages/ui-kit/src` vastab fikseeritud ülesvoolu kommitile                         |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — kasutatavad ikooninimed, mida `ICON_MAP` ei vastenda                               |
| `dev/codemod-material-icons.mjs`    | Literaalsete Material Symbolsi span-elementide ümberkirjutamine elemendiks `<Icon>` (migreerimistööriistad) |

---

## `docs/` – avalik dokumentatsioon (7 juurfaili + 17 alamkataloogi)

### Tipptasemel juhendid

| Doc                         | Eesmärk                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Kõrgetasemeline arhitektuur, alamsüsteemi kaart, armatuurlaua pind                             |
| `CODEBASE_DOCUMENTATION.md` | Tehniline viide: kataloogid, moodulid, kokkulepped                                             |
| `FEATURES.md`               | Funktsioonimaatriks koos v3.8 esiletõstmistega                                                 |
| `USER_GUIDE.md`             | Lõppkasutaja käsiraamat (seadistus, mudelid, kombinatsioonid, CLIs, heli jne)                  |
| `API_REFERENCE.md`          | API lõpp-punkti viide autentimismudeliga                                                       |
| `openapi.yaml`              | OpenAPI 3.0 spetsifikatsioon (121 rada)                                                        |
| `SETUP_GUIDE.md`            | Installimismeetodid (npm, npx, Docker, Electron, Termux, allikas)                              |
| `ENVIRONMENT.md`            | Kõik env-vars (dokumenteeritud ~ 800, ~ 3050 rida `.env.example`)                              |
| `TROUBLESHOOTING.md`        | Levinud vead + v3.8.0 teadaolevad probleemid                                                   |
| `RELEASE_CHECKLIST.md`      | Täielik vabastamise voog (oskused, husky, tavapärased kohustused, juurutamine)                 |
| `COVERAGE_PLAN.md`          | Katvuse eesmärgid ja hetkeseis                                                                 |
| `FREE_TIERS.md`             | Kureeritud vabataseme pakkujad (48 + tasuta + 11 OAuth)                                        |
| `CLI-TOOLS.md`              | Välised CLI integratsioonid + Sisemine OmniRoute CLI                                           |
| `I18N.md`                   | i18n arhitektuur, keele lisamine, 67 lokaali                                                   |
| `UNINSTALL.md`              | Puhastage desinstalli sammud                                                                   |
| `PROVIDER_REFERENCE.md`     | **Automaatselt genereeritud** kataloog 377 pakkujast (regen: `npm run gen:provider-reference`) |

### Alamsüsteemi süvasukeldumised

| Doc                                           | Eesmärk                                                                                       |
| --------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                               | MCP server: 110 tööriista, 3 transporti, 33 ulatust, REST lõpp-punktid                        |
| `A2A-SERVER.md`                               | A2A v0.3: JSON-RPC, 6 oskust, REST abilised, agendikaart                                      |
| `AGENT_PROTOCOLS_GUIDE.md`                    | Ühtne juhend: A2A vs ACP vs pilveagendid                                                      |
| `CLOUD_AGENT.md`                              | Codex Cloud / Devin / Jules orkestratsioon                                                    |
| `SKILLS.md`                                   | Oskuste raamistik (sisseehitatud + turuplats + SkillsSH + liivakast)                          |
| `RADAR.md`                                    | Radari vabamudeli kataloogi ülekate (`RADAR_ENABLED`, vaikimisi väljas)                       |
| `MEMORY.md`                                   | Mälusüsteem (SQLite FTS5 + Qdrant)                                                            |
| `EVALS.md`                                    | Evali raamistik (sviidid, jooksud, rubriigid)                                                 |
| `GUARDRAILS.md`                               | PII masker, kiire süstimine, nägemissild                                                      |
| `COMPLIANCE.md`                               | Auditi logi, säilitamine, noLog loobumine                                                     |
| `WEBHOOKS.md`                                 | HMAC-allkirjaga veebihaagi kohaletoimetamine                                                  |
| `REASONING_REPLAY.md`                         | Hübriidne memory/SQLite vahemälu `reasoning_content` jaoks                                    |
| `AUTHZ_GUIDE.md`                              | Autoriseerimiskonveier (`classify` → `policies` → `enforce`)                                  |
| `RESILIENCE_GUIDE.md`                         | Kaitselüliti + jahtumine + mudeli lukustus                                                    |
| `docs/security/STEALTH_GUIDE.md` (ainult git) | TLS sõrmejälgede võtmine (JA3/JA4), Claude kood CCH, MITM sert                                |
| `AUTO-COMBO.md`                               | Automaatne kombineeritud mootor (16-teguriline hindamine, 6 režiimipaketti, virtuaalne tehas) |

### Kokkusurumine

| Doc                             | Eesmärk                                    |
| ------------------------------- | ------------------------------------------ |
| `COMPRESSION_GUIDE.md`          | Ülevaade tihendusrežiimidest + tegevuskava |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK mootorid, registrileping     |
| `COMPRESSION_RULES_FORMAT.md`   | Koopainimese reeglipaketi JSON skeem       |
| `COMPRESSION_LANGUAGE_PACKS.md` | Keelepõhine reeglipaketi inventar          |
| `RTK_COMPRESSION.md`            | RTK deklaratiivne torujuhe (56 filtrit)    |

### Kasutuselevõtt

| Doc                          | Eesmärk                                                              |
| ---------------------------- | -------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker ehitus, profiilid (base/cli/host/cliproxyapi), Redis külgkorv |
| `VM_DEPLOYMENT_GUIDE.md`     | Üldine VM/VPS juurutus (Ubuntu/Debian + nginx + systemd)             |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io juurutamine (praegu ainult Hiina jaoks)                       |
| `TERMUX_GUIDE.md`            | Android peata Termuxi kaudu                                          |
| `PWA_GUIDE.md`               | Progressiivne veebirakenduse installi + teenindustöötaja             |
| `ELECTRON_GUIDE.md`          | Töölauarakenduse loomine + märgi + levitamine                        |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale lehter                               |
| `PROXY_GUIDE.md`             | 4-tasemeline väljaminev puhverserver + 1 puhverserveri turg          |

### Alamkataloogid

| Subdir                | Eesmärk                                                                                                                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokaliseeritud dokumentide tõlked (41 lokaadi)                                                                                                                                                |
| `docs/screenshots/`   | Pildivarad juhenditele                                                                                                                                                                        |
| `_tasks/superpowers/` | Plans/specs suurriikidelt (`writing-plans`/`brainstorming`) + -uuringud — isoleeritud, eraldi versiooniga repo, mida peapuu ignoreerib. Vt CLAUDE.md → "Planeerimise ja uurimise artefaktid". |

---

## `tests/` — Testikomplektid

| Alamkataloog                         | Tüüp                                       | Käitaja                                            |
| ------------------------------------ | ------------------------------------------ | -------------------------------------------------- |
| `tests/unit/`                        | Üksustestid (~4 800 faili, kõige kiiremad) | Node'i sisseehitatud testikäitaja                  |
| `tests/integration/`                 | Mitme mooduli + DB integratsioonitestid    | Node'i sisseehitatud testikäitaja (paralleelsus 1) |
| `tests/e2e/`                         | Kasutajaliidese + töövoo E2E-testid        | Playwright                                         |
| `tests/e2e/protocol-clients.test.ts` | MCP + A2A pärisklientide E2E-testid        | Kohandatud protokollikliendid                      |
| `tests/e2e/ecosystem.test.ts`        | Pakkujate integratsioon (kasutab võrku)    | Node'i sisseehitatud testikäitaja                  |

---

## `public/` — Staatilised ressursid

| Tee                 | Otstarve                                                        |
| ------------------- | --------------------------------------------------------------- |
| `public/` (juur)    | Favikonid, robots.txt, manifest, teenusetöötaja, turunduspildid |
| `public/providers/` | Pakkujate logod PNG-/SVG-vormingus (kasutatakse juhtpaneelil)   |

---

## `config/` — Staatilised konfiguratsioonid + kvaliteedivärava olek

Tarnitavad konfiguratsioonimallid koos versioonihaldusesse lisatud kvaliteedivärava lähtetasemetega
(teisaldatud hoidla juurkataloogist siia versioonis v3.8.26, et hoida juurkataloog puhtana).

| Tee                                           | Otstarve                                                                                         |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `config/i18n.json`                            | Lokaatide loend + metaandmed (42 lokaadi arvu kanooniline allikas)                               |
| `config/i18n-schema.json`                     | JSON-skeem faili `i18n.json` valideerimiseks                                                     |
| `config/payloadRules.json`                    | Ülesvoolu kasuliku koormuse puhastamise reeglid                                                  |
| `config/quality/quality-baseline.json`        | Mitme mõõdiku järkjärgulise karmistamise lähtetase (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Fikseeritud ESLinti keerukuse lähtetase (`check-complexity.mjs`)                                 |
| `config/quality/duplication-baseline.json`    | Fikseeritud jscpd dubleerimise lähtetase (`check-duplication.mjs`)                               |
| `config/quality/file-size-baseline.json`      | Fikseeritud failipõhise suuruse lähtetase (`check-file-size.mjs`)                                |
| `config/quality/test-discovery-baseline.json` | Fikseeritud sidumata testide lähtetase (`check-test-discovery.mjs`)                              |
| `config/quality/dependency-allowlist.json`    | Heakskiidetud sõltuvuste lubatud loend (`check-deps.mjs`)                                        |
| `config/quality/.license-allowlist.json`      | SPDX-litsentside lubatud loend (`check-licenses.mjs`)                                            |
| `config/quality/quality-metrics.json`         | Ajutised kogutud mõõdikud (genereerib `collect-metrics.mjs`; **gitignore'iga eiratud**)          |

---

## `.github/` — GitHubi integratsioon

| Tee                                | Otstarve                                                                |
| ---------------------------------- | ----------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actionsi CI/CD töövood (lintimine, testimine, katvus, väljalase) |
| `.github/ISSUE_TEMPLATE/`          | Vea- ja funktsioonitaotluste mallid                                     |
| `.github/pull_request_template.md` | PR-i mall                                                               |
| `.github/dependabot.yml`           | Sõltuvuste uuendamise konfiguratsioon                                   |

---

## `.husky/` — Giti konksud

| Fail         | Otstarve                                                                     |
| ------------ | ---------------------------------------------------------------------------- |
| `pre-commit` | Käitab `lint-staged + check-docs-sync + check:any-budget:t11`                |
| `pre-push`   | Praegu keelatud (välja kommenteeritud). Käitage `npm run test:unit` käsitsi. |
| `_/`         | Husky sisemised failid                                                       |

---

## `.claude/` — Claude Code'i kaldkriipsukäsud

| Fail                                                | Otstarve                                                             |
| --------------------------------------------------- | -------------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — versiooni tõstmine + automaatne muudatuste logi |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — täielik väljalaske töövoog                  |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | VPS-i juurutamine                                                    |
| `commands/capture-release-evidences-cc.md`          | Uute funktsioonide salvestamine brauseris WebP-vormingus             |
| `commands/review-{prs,discussions}-cc.md`           | GitHubi PR-ide/arutelude triaaž                                      |
| `commands/{review-issues,implement-features}-cc.md` | Probleemidega seotud töövood                                         |
| `settings.local.json`                               | Projektipõhised Claude Code'i sätted                                 |

---

## `.agents/` — Üldised agenditöövood (Codex / Cursor / jne)

| Tee                      | Otstarve                                                |
| ------------------------ | ------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 töövoo definitsiooni (`.claude/commands/` peegeldus) |
| `skills/<name>/SKILL.md` | 9 oskuse definitsiooni koos Codexi käivitusmärkustega   |

> **Märkus:** Töövood ja käsud on praegu bait-baidi haaval identsed. Kui `.agents/` on mõeldud teisele agendi käituskeskkonnale (Codex), peavad variandid sisuliselt erinema.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Põhipuust väljaspool

Need alakriipsuga algavad kataloogid sisaldavad sisu, mida ei tarnita:

- **`_ideia/`** — disainimärkmed (edasilükkamise / sobimatuse / elujõulisuse kategooriad)
- **`_mono_repo/`** — ajaloolised alamprojektid (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — seotud avatud lähtekoodiga projektide (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api jne) kirjutuskaitstud kloonid, mida kasutatakse arenduse ajal ristviideteks
- **`_tasks/`** — väljalaskepõhised ülesannete jälgimise failid (mitteametlikud)

Ei sisaldu `npm pack` väljundis. Vaadake `.npmignore`.

---

## Genereeritud / Giti poolt ignoreeritud

| Tee                    | Otstarve                       |
| ---------------------- | ------------------------------ |
| `node_modules/`        | npm-i sõltuvused               |
| `.next/`               | Next.js-i koosteväljund        |
| `coverage/`            | c8 testkatvuse aruanded        |
| `logs/`                | Käitusaegsed logid             |
| `package/`             | npm pack-i ettevalmistusala    |
| `.playwright-mcp/`     | Playwright MCP testiartefaktid |
| `.issues/`             | Kohalik probleemide vahemälu   |
| `tsconfig.tsbuildinfo` | TS-i inkrementaalne vahemälu   |

---

## Navigeerimisjuhised

- **Uus kaastööline?** Loe `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Lisad teenusepakkujat?** Järgi jaotist `docs/architecture/ARCHITECTURE.md § Adding a New Provider` ning kontrolli teavet failist `docs/reference/PROVIDER_REFERENCE.md`.
- **Lisad marsruuti?** Vaata `docs/architecture/ARCHITECTURE.md § Adding a New API Route` ja `src/shared/validation/schemas.ts`.
- **Lisad MCP tööriista?** Vaata `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Lisad A2A oskust?** Vaata `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Käivitad kohalikult?** Vaata `docs/guides/SETUP_GUIDE.md`.
- **Juurutad?** Vaata `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Avaldad versiooni?** Vaata `docs/ops/RELEASE_CHECKLIST.md` (ja Claude Code’i oskust `/generate-release-cc`).
