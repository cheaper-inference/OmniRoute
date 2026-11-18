# Contributing to OmniRoute (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Dėkojame, kad domitės galimybe prisidėti! Šiame vadove rasite viską, ko reikia norint pradėti.

Oficiali darbo eiga, taikoma kiekvienam pakeitimui, aprašyta
[Indėlio auksiniame kelyje](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Jame tiekėjų, maršruto parinkimo,
UI/UX, i18n, CLI, duomenų bazės ir kūrimo / diegimo pakeitimai susiejami su jų sutartimis, tiksliniais testais, CI
aprėptimi ir suderinimo veiksmais.

---

## Kūrimo aplinka

### Būtinosios sąlygos

- **Node.js** `>=22.22.2 <23` arba `>=24.0.0 <27` (rekomenduojama: 24 LTS)
- **npm** 10+

> **Windows su Node 24:** naudokite dabartinį 24 LTS pataisų leidimą (bent 24.20.0).
> Ankstesni leidimai gali nutraukti procesą po sėkmingų testų, kai `--test-force-exit` uždaro
> procesą. Node [Windows libuv pataisa](https://github.com/nodejs/node/pull/61999) išsprendžia
> šią vykdymo laiko avariją; testų tvirtinimus ir vykdyklės išėjimo patikras palikite įjungtas.

> **npm v11+ naudotojams (Node 24+):** po `npm install` patikrinkite, ar savieji moduliai buvo įdiegti:
> `node -e "require('better-sqlite3')"`. Jei komanda baigiama klaida `MODULE_NOT_FOUND`,
> paleiskite `npm approve-scripts better-sqlite3 && npm install`. Žr.
> [Trikčių šalinimas](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klonavimas ir diegimas

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Aplinkos kintamieji

```bash
# Sukurkite .env failą iš šablono
cp .env.example .env

# Sugeneruokite reikalingas paslaptis
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Pagrindiniai kūrimo aplinkos kintamieji:

| Kintamasis             | Numatytoji kūrimo reikšmė | Aprašymas                        |
| ---------------------- | ------------------------- | -------------------------------- |
| `PORT`                 | `20128`                   | Serverio prievadas               |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`  | Frontend bazinis URL             |
| `JWT_SECRET`           | (sugeneruokite aukščiau)  | JWT pasirašymo paslaptis         |
| `INITIAL_PASSWORD`     | `CHANGEME`                | Pirmojo prisijungimo slaptažodis |
| `APP_LOG_LEVEL`        | `info`                    | Žurnalo išsamumo lygis           |

### Valdymo skydelio nustatymai

Valdymo skydelyje pateikiami funkcijų jungikliai, kuriuos taip pat galima konfigūruoti naudojant aplinkos kintamuosius:

| Nustatymo vieta           | Jungiklis                 | Aprašymas                               |
| ------------------------- | ------------------------- | --------------------------------------- |
| Nustatymai → Išplėstiniai | Derinimo režimas          | Įjungti derinimo užklausų žurnalus (UI) |
| Nustatymai → Bendrieji    | Šoninės juostos matomumas | Rodyti / slėpti šoninės juostos skiltis |

Šie nustatymai saugomi duomenų bazėje ir išlieka po paleidimo iš naujo, kai yra nustatyti, todėl pakeičia numatytąsias aplinkos kintamųjų reikšmes.

### Paleidimas vietoje

```bash
# Kūrimo režimas (automatinis perkrovimas)
npm run dev

# Produkcinis kūrimas
npm run build    # next build → .build/next/ ir assembleStandalone → dist/
npm run start

# Spartus tik backend / API kompiliavimas pagalbininkų pakeitimams
npm run build:contributor

# Leidimo kūrimas (švarus kūrimas + HEAD žymuo — būtina diegimui)
npm run build:release   # rm -rf .build dist ir build + įrašo dist/BUILD_SHA

# Dažniausiai naudojama prievado konfigūracija
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Pagalbininkų kūrimas atlieka tik kompiliavimo patikrą: jis nesurinkia autonominio
platinimo paketo ir nesukuria pasirinktinių savųjų pakavimo išteklių. Kai reikia
patikrinti paruoštą platinti paketą, naudokite įprastą produkcinį kūrimą.

### Kūrimo išvesties struktūra

| Katalogas | Turinys                                                                              | Sekamas |
| --------- | ------------------------------------------------------------------------------------ | ------- |
| `src/`    | Programos šaltinis (TypeScript / TSX)                                                | Taip    |
| `.build/` | Tarpiniai failai — `next build` išvestis (`gitignored`, `distDir = .build/next`)     | Ne      |
| `dist/`   | Paruoštas platinti paketas — surinktas naudojant `assembleStandalone` (`gitignored`) | Ne      |

Kūrimo konvejeris vykdomas vienu etapu:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js išvestis)
  └─ assembleStandalone()                 (autonominio paketo + statinių + viešų + savųjų išteklių kopijavimas)
       └─ išvestis: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` papildomai pirmiausia išvalo abu katalogus ir įrašo
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) kaip diegimo vientisumo žymenį.

`npm run build:contributor` naudoja tik backend skirtą kūrimo profilį. Kūrimo metu
jis laikinai pakeičia valdymo skydelio UI failus, išsaugo API maršrutų apdorotuvus
ir po kūrimo atkuria pradinius failus. Pakeitimams, kurie turi įtakos valdymo
skydelio UI, arba visai leidimo patikrai naudokite `npm run build`; pagalbininkų
profilis nėra leidimo kūrimo pakaitalas.

> **VPS diegimo pastaba:** nuotolinis atvaizdo katalogas `/usr/lib/node_modules/omniroute/app/`
> lieka nepakeistas. Diegimo įgūdžiai į jį per `rsync` sinchronizuoja `dist/` turinį.
> Pakeistas tik saugykloje esantis kūrimo išvesties kelias (`app/` → `dist/`).

Numatytieji URL:

- **Valdymo skydelis**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git darbo eiga

> ⚠️ **NIEKADA neįrašykite pakeitimų tiesiogiai į `main`.** Visada naudokite funkcionalumo šakas.
>
> **PR bazė:** pasirinkite aktyvią `release/vX.Y.Z` šaką (ne `main`). Išleidimo šakų ir
> išleidimo metu kuriamų žymų modelis aprašytas
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md).

```bash
# Sukurkite šaką nuo aktyvios leidimo šakos viršūnės (pavyzdys: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... atlikite pakeitimus ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Atidarykite Pull Request, kurio bazė = release/v3.8.49
```

### Šakų pavadinimai

| Priešdėlis  | Paskirtis                      |
| ----------- | ------------------------------ |
| `feat/`     | Naujos funkcijos               |
| `fix/`      | Klaidų taisymai                |
| `refactor/` | Kodo pertvarkymas              |
| `docs/`     | Dokumentacijos pakeitimai      |
| `test/`     | Testų papildymai ir pataisymai |
| `chore/`    | Įrankiai, CI, priklausomybės   |

### Įrašų pranešimai

Laikykitės [„Conventional Commits“](https://www.conventionalcommits.org/) standarto:

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Sritys (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Testų vykdymas

```bash
# Visi testai (modulių + vitest + ekosistemos + e2e)
npm run test:all

# Vienas testo failas (įtaisytasis Node.js testų vykdiklis — jį naudoja dauguma testų)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Tik jūsų pakeitimo paveikti modulių testai (tas pats TIA parinkiklis kaip ir CI patikroje, #8084)
npm run test:scoped            # paskutinio patvirtinimo (arba darbinio medžio) pakeitimai
npm run test:scoped:staged     # tik paruošti pakeitimai — patogu naudoti prieš patvirtinimą
npm run test:scoped:full       # pirmiausia iš naujo sukuria importų grafiko žemėlapį (pridėjus ar perkėlus failus)
# Išėjimo kodas 1 + "run the full suite" reiškia, kad pasikeitė centrinis failas (tsconfig, package.json, …) arba
# nesusietas šaltinio failas — parinkiklis saugiai nutraukia darbą ir niekada tyliai nepraleidžia testų.

# Vitest (MCP serveris, autoCombo, podėlis)
npm run test:vitest

# E2E testai (reikalingas Playwright)
npm run test:e2e

# Protokolų klientų E2E testai (MCP transportai, A2A)
npm run test:protocols:e2e

# Ekosistemos suderinamumo testai
npm run test:ecosystem

# Aprėpties slenkstis: 60 % sakinių / eilučių / funkcijų / šakų
npm run test:coverage
npm run coverage:report

# Kodo analizė + formatavimo patikra
npm run lint
npm run check

# Sąlyginiu būdu vykdomas realių išorinių paslaugų derinio bazinis testas (reikalinga VPS prieiga + tikrų teikėjų kreditai)
# Kreipiasi į TIKRUS teikėjus — šiek tiek kainuoja. NIEKADA nevykdomas CI. Jei sąlyga neįvykdyta, korektiškai praleidžiamas.
# Reikalinga: ssh root@192.168.0.15 prieiga (iš VPS paimama tik skaitoma DB momentinė kopija).
RUN_COMBO_LIVE=1 npm run test:combo:live

# 3 etapo VPS tiesioginis bazinis testas — paprasti Node ESM scenarijai, tiesiogiai kreipiasi į veikiantį .15 serverį.
# Reikalinga: ssh root@192.168.0.15 prieiga (deriniai sukuriami ir pašalinami per SSH sqlite).
# Kreipiasi į TIKRUS teikėjus (nedidelė kaina). Sukuria ir pašalina tik __live_test__* derinius. NIEKADA nevykdomas CI.
# .15 serveryje nustatyta REQUIRE_API_KEY=false, todėl API rakto nereikia, tačiau, jei nustatyti, naudojami COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY.
npm run test:combo:live:vps              # 7 HTTP scenarijai (prioritetinis / ciklinis / svertinis / kainos / sintezės / automatinis + būklė)
npm run test:combo:live:vps:failover     # prideda realų perjungimo tarp teikėjų scenarijų (iš viso 8)
```

Pastabos apie aprėptį:

- `npm run test:coverage` matuoja pagrindinio modulių testų rinkinio šaltinio kodo aprėptį, neįtraukia `tests/**` ir įtraukia `open-sse/**`
- Ištraukimo užklausose turi būti išlaikytas **60%+** sakinių / eilučių / funkcijų / šakų aprėpties slenkstis
- Jei PR pakeičia gamybinį kodą kataloguose `src/`, `open-sse/`, `electron/` arba `bin/`, toje pačioje PR turi būti pridėti arba atnaujinti automatiniai testai
- `npm run coverage:report` išveda naujausio aprėpties vykdymo išsamią kiekvieno failo ataskaitą
- `npm run test:coverage:legacy` išsaugo ankstesnę metriką istoriniam palyginimui
- Etapinis aprėpties gerinimo planas pateiktas `docs/ops/COVERAGE_PLAN.md`

### Ištraukimo užklausos reikalavimai

Prieš atidarydami PR, vadovaukitės
[rekomenduojama indėlio teikimo eiga](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), kad atliktumėte tikslinį
pakeistos dalies patikrinimo ciklą. Už visą modulių testų rinkinį (4 CI dalys), Vitest, **60%+** aprėpties slenkstį ir
gamybinį komponavimą atsakinga CI — jų vykdymas vietoje nesuteikia jokios papildomos informacijos, kurios
dar nepateiks PR patikros, o mažesnio pajėgumo įrenginiuose tai gali visiškai apkrauti sistemą (#8084):

- Vykdykite jūsų pakeitimą tikrinančius testų failus: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Vykdykite `npm run lint`
- Pasikeitus gamybiniam kodui, toje pačioje PR pridėkite arba atnaujinkite automatinius testus
- `node:test` failuose kiekvieną aukščiausio lygio `await` (pvz., `await import(...)`) pateikite prieš pirmąjį `test()` / `describe()`: naudojant `--test-force-exit`, po jo užregistruoti testai gali tyliai likti neįvykdyti (#18045; tai užtikrina `npm run check:test-tla-order`)
- Pasikeitus gamybiniam kodui, PR apraše nurodykite pakeistus arba pridėtus testų failus
- Kai CI sukonfigūruotos projekto paslaptys, patikrinkite PR SonarQube rezultatą

Dabartinė testų būsena: **122 modulių testų failai**, apimantys:

- Teikėjų transformavimo priemones ir formatų konvertavimą
- Užklausų dažnio ribojimą, grandinės pertraukiklį ir atsparumą
- Semantinį podėlį, idempotentiškumą ir eigos stebėjimą
- Duomenų bazės operacijas ir schemą (21 DB modulis)
- OAuth eigas ir tapatybės nustatymą
- API galinių taškų validavimą (Zod v4)
- MCP serverio įrankius ir aprėpties taikymą
- Atminties ir įgūdžių sistemas

---

## Kodo stilius

- **ESLint** — prieš patvirtindami pakeitimus paleiskite `npm run lint`
- **Prettier** — patvirtinant pakeitimus automatiškai formatuojama per `lint-staged` (2 tarpai, kabliataškiai, dvigubos kabutės, 100 simbolių eilutės plotis, es5 baigiamieji kableliai)
- **TypeScript** — visas `src/` kodas naudoja `.ts`/`.tsx`; `open-sse/` naudoja `.ts`/`.js`; dokumentuokite naudodami TSDoc (`@param`, `@returns`, `@throws`)
- **Jokio `eval()`** — ESLint užtikrina `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod validavimas** — visų API įvesčių validavimui naudokite Zod v4 schemas
- **Pavadinimai**: failai = camelCase/kebab-case, komponentai = PascalCase, konstantos = UPPER_SNAKE

### Klaidų apdorojimas / tušti catch blokai

Niekada nepalikite `catch` be paaiškinimo. Priskirkite jį vienai iš dviejų kategorijų (taip praktiškai
įgyvendinama griežta taisyklė „SSE srautuose niekada tyliai nepraleisti klaidų“):

- **Tyčinis (mūsų pačių neprivalomas valymas / telemetrija)** — gedimas čia yra tikėtinas ir
  nekenksmingas; pridėkite vienos eilutės paaiškinamąjį komentarą, bet neregistruokite žurnale (registravimas
  kiekvienai užklausai sukeltų triukšmą, kurio šiuo susitarimu siekiama išvengti).

  ```ts
  } catch {} // po kliento atsijungimo tikėtina, kad bus uždaromas jau uždarytas valdiklis
  ```

- **Reikėtų registruoti žurnale (išorinis / kvietėjo pateiktas kodas arba klaidos praleidimas pakeičia valdymo eigą)** — palikite
  catch bloką (niekada neleiskite jam nutraukti srauto), bet pateikite kontekstinį `console.debug`/`warn`, kad
  gedimą būtų galima aptikti.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback klaida:", e);
  }
  ```

Pritaikymo pavyzdžių rasite `open-sse/utils/stream.ts` ir `open-sse/utils/streamHandler.ts`.

---

## Projekto struktūra

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite domain modules + 130 migrations
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, 22 routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 150 executor modules (executor classes + per-provider helpers)
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (110 unique tools, 3 transports, 33 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (1,574 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/
├── adr/                     # Architecture Decision Records
├── architecture/            # System architecture & resilience
├── comparison/              # OmniRoute vs alternatives
├── compression/             # Compression guides & rules
├── dev/                     # Development guides
├── diagrams/                # Architecture diagrams
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # User guide, Docker, setup, troubleshooting
├── i18n/                    # Internationalized README translations
├── marketing/               # Marketing materials
├── ops/                     # Deployment, proxy, coverage, releases
├── providers/               # Provider-specific docs
├── reference/               # API reference, env vars, CLI tools, free tiers
├── releases/                # Release notes
├── routing/                 # Auto-combo engine, reasoning replay
├── screenshots/             # Dashboard screenshots
├── security/                # Guardrails, compliance, stealth, tokens
└── specs/                   # Design specs
```

---

## Naujo teikėjo pridėjimas

### 1 veiksmas: užregistruokite teikėjo konstantas

Pridėkite jas į `src/shared/constants/providers.ts` — įkeliant modulį jos patikrinamos naudojant Zod.

### 2 veiksmas: pridėkite vykdyklę (jei reikalinga pasirinktinė logika)

Sukurkite vykdyklę faile `open-sse/executors/your-provider.ts`, išplėsdami bazinę vykdyklę.

### 3 veiksmas: pridėkite transformatorių (jei naudojamas ne OpenAI formatas)

Sukurkite užklausų ir atsakymų transformatorius kataloge `open-sse/translator/`.

### 4 veiksmas: pridėkite OAuth konfigūraciją (jei naudojamas OAuth)

Pridėkite OAuth prisijungimo duomenis faile `src/lib/oauth/constants/oauth.ts`, o paslaugą — kataloge `src/lib/oauth/services/`.

Jei pirminis teikėjas platina viešą OAuth `client_id` / paslaptį arba Firebase Web API raktą savo viešame CLI / naršyklės pakete, **neįterpkite** jo kaip eilutės literalo. Naudokite `resolvePublicCred()` iš `open-sse/utils/publicCreds.ts` ir pridėkite užmaskuotų baitų įrašą į `EMBEDDED_DEFAULTS`. Visa privaloma darbo eiga aprašyta dokumente [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Apdorojimo funkcijose / vykdyklėse klientą pasiekiantys klaidų pranešimai turi būti apdorojami naudojant `buildErrorBody()` / `sanitizeErrorMessage()` iš `open-sse/utils/error.ts` — niekada nedėkite neapdoroto `err.stack` ar `err.message` į Response turinį. Žr. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### 5 veiksmas: užregistruokite modelius

Pridėkite modelių aprašus faile `open-sse/config/providerRegistry.ts`.

### 6 veiksmas: pridėkite testus

Parašykite vienetinius testus kataloge `tests/unit/`, kurie apimtų bent:

- Teikėjo registravimą
- Užklausų / atsakymų transformavimą
- Klaidų tvarkymą

---

## Ištraukite užklausų kontrolinį sąrašą

- [ ] Testai išlaikyti (`npm test`)
- [ ] Pūkavimo leidimai (`npm run lint`)
- [ ] Sukūrimas sėkmingas (`npm run build`)
- [ ] TypeScript tipai pridėti naujoms viešosioms funkcijoms ir sąsajoms
- [ ] Jokių užkoduotų paslapčių ar atsarginių verčių
- [ ] Viešieji kredencialai, įterpti per `resolvePublicCred()` (žr. [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ), niekada kaip raidės
- [ ] Klaidų atsakymai nukreipiami per `buildErrorBody()` / `sanitizeErrorMessage()` — atsakymo elementuose nėra neapdorotų krūvos pėdsakų (žr. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) )
- [ ] Apvalkalo komandos (`exec` / `spawn`) perduoda vykdymo reikšmes per `env`, o ne per eilutės interpoliaciją
- [ ] Visi įėjimai patvirtinti naudojant Zod schemas
- [ ] Pakeitimų žurnalas** fragmentas** įtraukta į `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md`, kad būtų atlikti vartotojui skirti pakeitimai (žr. [`changelog.d/README.md`](./changelog.d/README.md) ) — do** ne** tiesiogiai redaguoti `CHANGELOG.md` ; fragmentai yra sujungiami išleidimo metu ir niekada neprieštarauja PRs
- [ ] Atnaujinta dokumentacija (jei taikoma)
- [ ] Nauji CodeQL / slapto nuskaitymo įspėjimai neatidaryti arba atmesti su techniniu pagrindimu, nurodant atitinkamą `docs/security/` dokumentą
- [ ] Maršrutai , kurie sukuria antrinius procesus (`/api/mcp/`, `/api/cli-tools/runtime/`) klasifikuojamus kaip `isLocalOnlyPath()` `src/server/authz/routeGuard.ts` — žr. [griežtą taisyklę #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Įsipareigojimo pranešimuose nėra AI/bot `Co-authored-by` priekabų (kieta taisyklė #16) — bendradarbiams, kurių darbas naudojamas pakartotinai, priskiriami standartiniai `Co-authored-by: Name <email>` anonsai

---

## Leidimų publikavimas

Leidimai valdomi naudojant `/generate-release` darbo eigą. Sukūrus naują GitHub leidimą, paketas per GitHub Actions **automatiškai publikuojamas npm**.

Diegimams VPS aplinkoje naudokite `npm run build:release` (ne `npm run build`) — ši komanda atlieka švarų
perkompiliavimą, suformuoja paketą kataloge `dist/` ir įrašo kontrolinį failą `dist/BUILD_SHA`.
Tada naudokite `/deploy-vps-*-cc` įgūdžius, kurie per rsync nukopijuoja `dist/` į nuotolinį katalogą `app/`.

---

## Pagalbos gavimas

- **Architektūra**: žr. [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API žinynas**: žr. [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Saugumo dokumentacija**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Eksploatavimo dokumentacija**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemos**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
