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
├── app/                 # App Router (lehed + API-marsruudid + olekulehed + sihtleht)
├── lib/                 # Põhiteegid / domeenimoodulid (80 alamkausta + ~70 tipptaseme faili)
├── domain/              # Puhas domeeniloogika (poliitikamootor, tagavaralahendus, maksumus, lukustus, comboResolver, hindamine)
├── server/              # Ainult serveri moodulid (authz-torustik, cors, autentimise vahevara) — kliendist ei tohi importida
├── shared/              # Serveri ja kliendi vahel jagatav, kus see on ohutu (konstandid, tüübid, valideerimine, lepingud, utiliidid)
├── i18n/                # next-intl konfiguratsioon + lokaadipõhine sõnumite JSON (67 lokaati)
├── middleware/          # Next.js vahevara (päringu rikastamine, lokaadi tuvastamine)
├── mitm/                # MITM-proksi tuum: sertifikaadi genereerimine/paigaldamine, handlers, targets, inspector, masks, passthrough
│   ├── handlers/        # 9 IDE-agendi käsitlejaklassi, mis laiendavad MitmHandlerBase'i (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Liikluse jäädvustamise kiht: buffer (mälusisene ringpuhver), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Mudeliadapteri liimkood (pärand-shim)
├── scripts/             # Koodipuu-sisesed hooldusskriptid (nt backfillAggregation)
├── sse/                 # Pärand-SSE käsitlejad/teenused (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Pärand mälusisene salv (järk-järgult asendamisel src/lib/db-ga)
├── types/               # Jagatud TS-i tüübifailid
├── instrumentation.ts   # Next.js telemeetria hook (brauser + edge)
├── instrumentation-node.ts  # Ainult Node'i instrumentatsioon
└── proxy.ts             # HTTP-proksi sisenemispunkti shim
```

### `src/app/` — App Router (Next.js 16)

| Path                                                                         | Purpose                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Avalik OpenAI-ühilduv API (~25 alamteed: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers jne)                                                                                                                                           |
| `app/api/v1beta/`                                                            | Gemini-stiilis API lõppunktid                                                                                                                                                                                                                                                                                                     |
| `app/api/playground/`                                                        | Playground Studio marsruudid: `improve-prompt/` (POST — LLM-i promptide ümberkirjutaja), `presets/` (GET loend / POST loomine), `presets/[id]/` (GET / PUT / DELETE) — vt `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                  |
| `app/api/` (non-v1)                                                          | Haldus-/administraatorimarsruudid (~60 kataloogi: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools jne)                                                                                                                                             |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 marsruuti (serveri juhtimine, agendi olek/DNS/vastendused, möödalase, sertifikaat, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Vt `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                    |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16+ marsruuti (requests, sessions, hosts, capture-modes, export, ws). LOCAL_ONLY + SPAWN_CAPABLE. Vt `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                                 |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 sisendpunkt (`POST /a2a`)                                                                                                                                                                                                                                                                                        |
| `app/.well-known/agent.json/`                                                | A2A agendikaart (avastamine)                                                                                                                                                                                                                                                                                                      |
| `app/(dashboard)/dashboard/`                                                 | Armatuurlaua UI lehed (50+ sektsiooni, ~118 page.tsx faili: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity jne)                                                                                                                                               |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search Tools Studio UI (3 vahekaarti: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — vt `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                                  |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plaan 21): `page.tsx` (kolme vahekaardiga koorik), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge'i armatuurlaualeht — serveri kaart, 9 agendi kaarti, seadistusviisard, mudelite vastendamine, möödalasete loend. i18n PT-BR + EN. Vt `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                                |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspectori armatuurlaualeht — DevToolsi poolitatud vaade, 7 detailide vahekaarti, 4 jäädvustusrežiimi lülitit, seansi salvestaja, konteksti värvimine. i18n PT-BR + EN. Vt `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                        |
| `app/(dashboard)/dashboard/activity/`                                        | Tegevuste voo leht (B grupp): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — vaata `docs/architecture/MONITORING_SECTIONS.md`                                                                                                                          |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Kvoodi jagamise leht (B grupp): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                                       |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Teenusepakkuja plaani seadistusleht (B grupp): `page.tsx` + `ProviderPlanConfigClient.tsx` — kvoodi mõõtmete alistus ühenduse kaupa                                                                                                                                                                                               |
| `app/docs/`                                                                  | Sisseehitatud dokumentatsiooni vaatur (renderdab `docs/*.md`)                                                                                                                                                                                                                                                                     |
| `app/landing/`                                                               | Turunduslik sihtleht                                                                                                                                                                                                                                                                                                              |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Autentimisega seotud lehed                                                                                                                                                                                                                                                                                                        |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP vealehed                                                                                                                                                                                                                                                                                                                     |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Staatilised/olekulehed                                                                                                                                                                                                                                                                                                            |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Juurpaigutus, avaleht, PWA manifest, globaalne CSS                                                                                                                                                                                                                                                                                |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Veapiirid                                                                                                                                                                                                                                                                                                                         |

### `src/lib/` — Põhiteegid (~50 moodulit)

| Moodul                                   | Eesmärk                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A protokolli ülesannete haldur, oskused (5), voogedastus                                                                                                                                                                                                                                                            |
| `acp/`                                   | CLI agentide register (kohalike CLI-de avastamine — vt `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                    |
| `api/`                                   | Jagatud API abifunktsioonid (`requireManagementAuth`, valideerimine)                                                                                                                                                                                                                                                  |
| `auth/`                                  | Sessioon, paroolide räsimine, tokenite valideerimine                                                                                                                                                                                                                                                                  |
| `batches/`                               | OpenAI Batches API käsitlejad                                                                                                                                                                                                                                                                                         |
| `catalog/`                               | Teenusepakkujate kataloogi Zod-valideerimine + võimekuste lahendamine                                                                                                                                                                                                                                                 |
| `cloudAgent/`                            | Pilveagendid (Codex Cloud, Devin, Jules) — vt `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                        |
| `combos/`                                | Kombode lahendamine + ümberjärjestamise abifunktsioonid                                                                                                                                                                                                                                                               |
| `audit/`                                 | Tegevusvoo abifunktsioonid: `highLevelActions.ts` (lubatusloend + `isHighLevelAction()`), `activityIcons.ts` (tegevus → ikooni/tegusõna vastendus), `timeline.ts` (groupByDay/relativeTime) — vt `docs/architecture/MONITORING_SECTIONS.md`                                                                           |
| `compliance/`                            | Auditilogi + teenusepakkujate audit — vt `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                |
| `compression/`                           | Tihendusmootori liimkood (mootorid asuvad kataloogis `open-sse/services/compression/`)                                                                                                                                                                                                                                |
| `config/`                                | Käitusaja konfiguratsiooni abifunktsioonid                                                                                                                                                                                                                                                                            |
| `db/`                                    | 120+ domeeni andmebaasimoodulit + 168 migratsiooni (SQLite'i puhul käi alati siit läbi)                                                                                                                                                                                                                               |
| `quota/`                                 | Kvoodijagamise mootor: `dimensions.ts` (tüübid/Zod), `types.ts` (QuotaStore liides), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — vt `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Radari tasuta mudelite kataloogiklient: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — vt `docs/frameworks/RADAR.md`                                                                                                                                    |
| `display/`                               | Kasutajaliidese vormindamise abifunktsioonid (maksumus, latentsus jne)                                                                                                                                                                                                                                                |
| `embeddings/`                            | Embeddingute teenuse abifunktsioonid                                                                                                                                                                                                                                                                                  |
| `env/`                                   | Keskkonnamuutujate parsimine + valideerimine                                                                                                                                                                                                                                                                          |
| `evals/`                                 | Hindamisraamistik (komplektid, käivitaja, käituskeskkond) — vt `docs/frameworks/EVALS.md`                                                                                                                                                                                                                             |
| `guardrails/`                            | PII-maskeerija, prompt injection, visioonisild — vt `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                     |
| `jobs/`                                  | Taustatööd (cron-laadsed)                                                                                                                                                                                                                                                                                             |
| `memory/`                                | Vestlusmälu (SQLite FTS5 + sqlite-vec hübriid-RRF + Qdrant 2. tase) — vt `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                  |
| `memory/embedding/`                      | Mitmeallikane embeddingukiht: `index.ts` (lahendaja), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plaan 21)                                                                                                                                                                       |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 mähis — KNN brute-force + hübriid-RRF (FTS5 + vektor, k=60). Laisk-init, degradeerub sujuvalt, kui sqlite-vec pole saadaval. (plaan 21)                                                                                                                                                             |
| `memory/reindex.ts`                      | `runReindexBatch()` — töötleb taustal mäluüksusi väärtusega `needs_reindex=1`; kutsutakse välja `POST /api/memory/reindex` ja laisa tagasitäitmise tee kaudu. (plaan 21)                                                                                                                                              |
| `monitoring/`                            | Tervisekontrollid, mõõdikute saatmine                                                                                                                                                                                                                                                                                 |
| `oauth/`                                 | OAuth/import-vood 22 pakkujamooduli jaoks (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                 |
| `plugins/`                               | Pluginate register                                                                                                                                                                                                                                                                                                    |
| `promptCache/`                           | Anthropicu stiilis prompt-vahemälu murdepunktid                                                                                                                                                                                                                                                                       |
| `skills/`                                | Oskuste raamistik (sisseehitatud + turg + SkillsSH) — vt `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                  |
| `playground/`                            | Playground Studio jagatud abifunktsioonid: `codeExport.ts` (curl/Python/TS generaator), `promptImprover.ts` (metavihiprompti ehitaja), `streamMetrics.ts` (puhas TTFT/TPS), `types.ts` (hinnatabel) — vt `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                       |
| `webhookDispatcher.ts`                   | HMAC-webhookide edastus — vt `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                            |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Tunnelihaldurid — vt `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                      |
| `cloudSync.ts`, `initCloudSync.ts`       | Oleku valikuline pilvesünkroniseerimine                                                                                                                                                                                                                                                                               |
| `localDb.ts`                             | Db-moodulite taas-ekspordi barrel (loogikat ei sisalda — ainult taas-ekspordid)                                                                                                                                                                                                                                       |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Päringute vahemällu salvestamine + idempotentsus                                                                                                                                                                                                                                                                      |
| (~30 top-level faili veel)               | Spetsialiseeritud abifunktsioonid (logEnv, modelsDevSync, piiSanitizer jne)                                                                                                                                                                                                                                           |

### `src/lib/db/` — Andmebaas (147 moodulit + 208 migratsiooni)

| Alamkaust                 | Eesmärk                                                                                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | `getDbInstance()` singleton WAL-journalinguga                                                                                                                                |
| `db/migrations/`          | Versioonitud SQL-failid (idempotentsed, transaktsioonilised). `073_memory_vec.sql` lisab `memory_vec_meta` + `needs_reindex` veeru (plaan 21).                               |
| `db/playgroundPresets.ts` | Playground Studio eelseadete CRUD-moodul (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)      |
| `db/memoryVec.ts`         | CRUD tabelile `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` jne (plaan 21)              |
| `db/<domain>.ts`          | Üks moodul domeeni kohta: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache jne. |

### `src/domain/`

| Moodul                 | Eesmärk                                          |
| ---------------------- | ------------------------------------------------ |
| `policy.ts`            | Poliitikamootor                                  |
| `fallbackPolicy.ts`    | Fallbacki otsustuspuu                            |
| `costRules.ts`         | Kulu arvutamise reeglid                          |
| `lockoutPolicy.ts`     | Mudeli/ühenduse blokeerimispoliitika             |
| `tagRouter.ts`         | Sildipõhine marsruutimine                        |
| `comboResolver.ts`     | Combo lahendamine (kasutab combo-mootor)         |
| `modelAvailability.ts` | Mudelipõhine saadavuse kontroll                  |
| `assessment/`          | Mudelite hindamine (RFC-AUTO-ASSESSMENT 1. faas) |

### `src/server/`

| Moodul   | Eesmärk                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------- |
| `authz/` | Autoriseerimise toru: `classify` → `policies` → `enforce` — vt `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS-i konfiguratsioon                                                                            |
| `auth/`  | Sessiooni vahevara                                                                                |

### `src/shared/`

| Moodul                           | Eesmärk                                                                                                           |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `components/`                    | Armatuurlaua komponentide API: adapterid paketi `packages/ui-kit` kohal — vt `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: ekraanidel kasutatavad ikooninimed → Lucide'i komponendid (`<Icon>`)                                  |
| `constants/providers.ts`         | **376 teenusepakkujat** koos Zod-valideerimisega (tõesuse allikas)                                                |
| `constants/cliTools.ts`          | Väliste CLI-tööriistade register                                                                                  |
| `constants/routingStrategies.ts` | **20 marsruutimisstrateegiat** koos prioriteetidega                                                               |
| `constants/publicApiRoutes.ts`   | Marsruudid, mis nõuavad Bearer-autentimist (võrreldes haldusautentimisega)                                        |
| `constants/upstreamHeaders.ts`   | Päiste keelunimekiri ülesvoolupäringute jaoks                                                                     |
| `validation/schemas.ts`          | ~80 Zod-skeemi (API-lepingute ainus tõese allikas)                                                                |
| `validation/helpers.ts`          | Zod-valideerimise abifunktsioonid (`validateBody` jne)                                                            |
| `types/`                         | Jagatud TS-tüübid                                                                                                 |
| `contracts/`                     | Avaliku API lepingud (tarbitakse `files:` kaudu failis `package.json`)                                            |
| `utils/circuitBreaker.ts`        | Teenusepakkujate rikkekatkesti (vt `docs/architecture/RESILIENCE_GUIDE.md`)                                       |
| `utils/apiAuth.ts`               | API-võtme valideerimine, ulatuse kontrollimine                                                                    |
| `utils/fetchTimeout.ts`          | Ajalõpu- ja katkestusümbrised ülesvoolu fetch-päringutele                                                         |
| `utils/releaseNotes.ts`          | Suletud v2/legacy teadaannete parser, lokaliseerimine ja ID-põhine tagasilükkamine                                |

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

## `docs/` — Avalik dokumentatsioon (7 juurfaili + 17 alamkausta)

### Ülataseme juhendid

| Dok                         | Eesmärk                                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Kõrgetasemeline arhitektuur, alamsüsteemide kaart, armatuurlaua liides                                          |
| `CODEBASE_DOCUMENTATION.md` | Tehniline teatmik: kataloogid, moodulid, kokkulepped                                                            |
| `FEATURES.md`               | Funktsioonide maatriks koos v3.8 esiletõstetega                                                                 |
| `USER_GUIDE.md`             | Lõppkasutaja juhend (seadistus, mudelid, kombod, CLI-d, heli jne)                                               |
| `API_REFERENCE.md`          | API lõpp-punktide teatmik koos autentimismudeliga                                                               |
| `openapi.yaml`              | OpenAPI 3.0 spetsifikatsioon (121 rada)                                                                         |
| `SETUP_GUIDE.md`            | Paigaldusviisid (npm, npx, Docker, Electron, Termux, lähtekood)                                                 |
| `ENVIRONMENT.md`            | Kõik keskkonnamuutujad (~800 dokumenteeritud, ~3050 rida failis `.env.example`)                                 |
| `TROUBLESHOOTING.md`        | Levinud vead + v3.8.0 teadaolevad probleemid                                                                    |
| `RELEASE_CHECKLIST.md`      | Täielik väljalaskevoog (skills, husky, conventional commits, juurutamine)                                       |
| `COVERAGE_PLAN.md`          | Testikatvuse eesmärgid ja praegune olukord                                                                      |
| `FREE_TIERS.md`             | Kureeritud tasuta taseme pakkujad (48+ tasuta + 11 OAuth)                                                       |
| `CLI-TOOLS.md`              | Välised CLI integratsioonid + sisemine OmniRoute CLI                                                            |
| `I18N.md`                   | i18n arhitektuur, keele lisamine, 67 lokaati                                                                    |
| `UNINSTALL.md`              | Puhta eemaldamise sammud                                                                                        |
| `PROVIDER_REFERENCE.md`     | **Automaatselt genereeritud** 376 teenusepakkuja kataloog (taasgenereerimine: `npm run gen:provider-reference`) |

### Alamsüsteemide põhjalikud ülevaated

| Dok                                           | Eesmärk                                                                         |
| --------------------------------------------- | ------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                               | MCP server: 110 tööriista, 3 transporti, 33 ulatust, REST lõpp-punktid          |
| `A2A-SERVER.md`                               | A2A v0.3: JSON-RPC, 6 skills, REST abivahendid, agendikaart                     |
| `AGENT_PROTOCOLS_GUIDE.md`                    | Ühtne juhend: A2A vs ACP vs Cloud Agents                                        |
| `CLOUD_AGENT.md`                              | Codex Cloud / Devin / Jules orkestreerimine                                     |
| `SKILLS.md`                                   | Skills raamistik (sisseehitatud + marketplace + SkillsSH + liivakast)           |
| `RADAR.md`                                    | Radari tasuta mudelite kataloogi ülekate (`RADAR_ENABLED`, vaikimisi väljas)    |
| `MEMORY.md`                                   | Mälusüsteem (SQLite FTS5 + Qdrant)                                              |
| `EVALS.md`                                    | Eval raamistik (komplektid, käivitused, rubriigid)                              |
| `GUARDRAILS.md`                               | PII maskeerija, prompt injection, visioonisild                                  |
| `COMPLIANCE.md`                               | Auditilogi, säilitamine, noLog-st loobumine                                     |
| `WEBHOOKS.md`                                 | HMAC-allkirjastatud webhookide kohaletoimetamine                                |
| `REASONING_REPLAY.md`                         | Hübriidne mälus/SQLite'i vahemälu `reasoning_content` jaoks                     |
| `AUTHZ_GUIDE.md`                              | Autoriseerimise konveier (`classify` → `policies` → `enforce`)                  |
| `RESILIENCE_GUIDE.md`                         | Kaitselüliti + cooldown + mudeli blokeering                                     |
| `docs/security/STEALTH_GUIDE.md` (ainult git) | TLS sõrmejälgedamine (JA3/JA4), Claude Code CCH, MITM sert                      |
| `AUTO-COMBO.md`                               | Auto Combo mootor (16-faktoriline skoorimine, 6 režiimipakki, virtuaalne tehas) |

### Tihendamine

| Dok                             | Eesmärk                                    |
| ------------------------------- | ------------------------------------------ |
| `COMPRESSION_GUIDE.md`          | Tihendamisrežiimide ülevaade + tegevuskava |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK mootorid, registri leping    |
| `COMPRESSION_RULES_FORMAT.md`   | Cavemani reeglipaki JSON-skeem             |
| `COMPRESSION_LANGUAGE_PACKS.md` | Keelekohtane reeglipakkide inventuur       |
| `RTK_COMPRESSION.md`            | RTK deklaratiivne konveier (56 filtrit)    |

### Juurutamine

| Dokument                     | Eesmärk                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Dockeri ehitus, profiilid (base/cli/host/cliproxyapi), Redise sidecar-konteiner |
| `VM_DEPLOYMENT_GUIDE.md`     | Üldine VM/VPS juurutus (Ubuntu/Debian + nginx + systemd)                        |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io juurutus (praegu ainult hiina keeles)                                    |
| `TERMUX_GUIDE.md`            | Androidi headless-kasutus Termuxi kaudu                                         |
| `PWA_GUIDE.md`               | Progressiivse veebirakenduse (PWA) paigaldamine + service worker                |
| `ELECTRON_GUIDE.md`          | Töölauarakenduse ehitamine + allkirjastamine + levitamine                       |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                          |
| `PROXY_GUIDE.md`             | 4-tasemeline väljuvproksi + 1proxy turuplats                                    |

### Alamkataloogid

| Alamkataloog          | Eesmärk                                                                                                                                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokaliseeritud dokumentatsiooni tõlked (41 lokaati)                                                                                                                                                         |
| `docs/screenshots/`   | Juhendite pildiressursid                                                                                                                                                                                    |
| `_tasks/superpowers/` | Superpowers'i plaanid/spetsifikatsioonid (`writing-plans`/`brainstorming`) + uurimistöö — isoleeritud, eraldi versioonitav repo, mida põhipuu gitignore'ib. Vt CLAUDE.md → "Planning & Research Artifacts". |

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
