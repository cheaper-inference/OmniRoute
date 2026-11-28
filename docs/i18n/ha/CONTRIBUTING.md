# Contributing to OmniRoute (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Na gode da sha’awarku ta ba da gudummawa! Wannan jagorar ta ƙunshi duk abin da kuke buƙata domin farawa.

Don tsarin aiki na hukuma na kowane canji, ku fara da
[Hanyar Zinariya ta Ba da Gudummawa](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Tana danganta sauye-sauyen mai samarwa, tsarin turawa,
UI/UX, i18n, CLI, ma’ajiyar bayanai, da ginawa/turawa zuwa kwangilolinsu, gwaje-gwajen da aka mayar da hankali a kansu, ɗaukar nauyin CI,
da matakan daidaitawa.

---

## Saitin Ci gaba

### Abubuwan da ake bukata

- **Node.js** `>=22.22.2 <23`, ko `>=24.0.0 <27` (an shawarta: 24 LTS)
- **npm** 10 +

> **Windows tare da Node 24:** yi amfani da sakin facin 24 LTS na yanzu (akalla 24.20.0). Tun da farko za a iya zubar da ciki bayan gwaje-gwaje masu nasara lokacin da `--test-force-exit` ya rufe aikin. Node's [Windows libuv fix](https://github.com/nodejs/node/pull/61999) yana magance wannan karon lokacin gudu; ci gaba da tabbatar da gwajin gwajin da tabbatar da fitowar mai gudu.

> **npm v11 + masu amfani (Node 24 +):** Bayan `npm install`, tabbatar an shigar da na'urori na asali: `node -e "require('better-sqlite3')"`. Idan ya kasa tare da `MODULE_NOT_FOUND`, gudanar da `npm approve-scripts better-sqlite3 && npm install`. Duba [Shirya matsala](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Clone & Shigar

```bash
git clone https://github.com/cheaper-inference/OmniRoute.git
cd OmniRoute
npm install
```

### Canje-canjen Muhalli

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Mabuɗin maɓalli don haɓakawa:

| Mai canzawa            | Default na ci gaba       | Bayani                |
| ---------------------- | ------------------------ | --------------------- |
| `PORT`                 | `20128`                  | tashar jiragen ruwa   |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Tushen URL don gaba   |
| `JWT_SECRET`           | (ƙirƙira a sama)         | JWT sa hannu          |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Kalmar shiga ta farko |
| `APP_LOG_LEVEL`        | `info`                   | Shiga matakin magana  |

### Saitunan Dashboard

Dashboard ɗin yana ba da jujjuyawar UI don fasalulluka waɗanda kuma za'a iya saita su ta masu canjin yanayi:

| Saitin Wuri           | Juyawa                | Bayani                                    |
| --------------------- | --------------------- | ----------------------------------------- |
| Saitunan → Na ci gaba | Yanayin gyara kuskure | Kunna rajistan ayyukan gyara kuskure (UI) |
| Saituna → Gabaɗaya    | Ganuwa na gefen gefe  | sassan labarun Show/hide                  |

Ana adana waɗannan saituna a cikin ma'ajin bayanai kuma suna dagewa cikin sake farawa, suna ƙetare kurakuran env var lokacin da aka saita.

### Gudun Gida

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build    # next build → .build/next/ then assembleStandalone → dist/
npm run start

# Fast backend/API-only compile for contributor changes
npm run build:contributor

# Release build (clean rebuild + HEAD sentinel — required for deploy)
npm run build:release   # rm -rf .build dist && build + writes dist/BUILD_SHA

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Gina mai ba da gudummawa yana aiwatar da ingantaccen tattarawa-kawai: baya haɗa rarrabawar kai tsaye ko gina kadarorin marufi na asali na zaɓi. Yi amfani da ginin samarwa na yau da kullun lokacin da kuke buƙatar tabbatar da tarin jigilar kaya.

### Gina Fitar da Fitowa

| Jagora    | Abubuwan da ke ciki                                                       | Ana bin sawu |
| --------- | ------------------------------------------------------------------------- | ------------ |
| `src/`    | Tushen aikace-aikacen (TypeScript / TSX)                                  | Ee           |
| `.build/` | Matsakaicin fitarwar — `next build` (gitignored, `distDir = .build/next`) | A'a          |
| `dist/`   | Bundle — mai jigilar kaya wanda `assembleStandalone` ya tara (gitignored) | A'a          |

Gina bututun wucewa guda ɗaya ne:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js output)
  └─ assembleStandalone()                 (copies standalone + static + public + native assets)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` kuma yana wanke kundayen adireshi biyu da farko kuma ya rubuta `dist/BUILD_SHA` (= `git rev-parse --short HEAD`) azaman aika saƙon gaskiya.

`npm run build:contributor` yana amfani da bayanan ginin baya-kawai. Yana toshe fayilolin UI dashboard na ɗan lokaci yayin gini, yana riƙe masu sarrafa hanyar API, kuma yana maido da ainihin fayilolin bayan ginin. Yi amfani da `npm run build` don canje-canjen da suka shafi dashboard UI ko don cikakken ingantaccen fitarwa; bayanin mai ba da gudummawa ba shine maye gurbin ginin sakin ba.

> **VPS deploy note:** `/usr/lib/node_modules/omniroute/app/` na hoton nesa ba ya canzawa. Ƙwarewar ƙaddamar da abubuwan da ke cikin `dist/` a ciki. Hanyar fitarwar in-repo kawai ta motsa (`app/` → `dist/`).

Default URLs:

- **Dashboard** : `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Tsarin Aikin Git

> ⚠️ **KADA KA TAƁA yin commit kai tsaye zuwa `main`.** Koyaushe yi amfani da rassan fasali.
>
> **Tushen PR:** saita reshen `release/vX.Y.Z` da ke aiki a matsayin manufa (ba `main` ba). Duba
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) don tsarin
> sakin-kowane-reshe + sanya-tag-lokacin-fitarwa.

```bash
# Ƙirƙiri reshe daga ƙarshen reshen sakin da ke aiki (misali: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... yi canje-canje ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Buɗe Pull Request tare da base = release/v3.8.49
```

### Sanya Sunan Reshe

| Prefix      | Manufa                   |
| ----------- | ------------------------ |
| `feat/`     | Sabbin fasaloli          |
| `fix/`      | Gyaran kurakurai         |
| `refactor/` | Sake tsara lamba         |
| `docs/`     | Canje-canjen takardu     |
| `test/`     | Ƙarin/gyaran gwaje-gwaje |
| `chore/`    | Kayan aiki, CI, dogarori |

### Saƙonnin Commit

Bi [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: ƙara circuit breaker don kiran masu samarwa
fix: warware matsalar gefen tabbatar da sirrin JWT
docs: sabunta SECURITY.md da kariyar PII
test: ƙara gwaje-gwajen raka'a na observability
refactor(db): haɗa jadawalan iyakance ƙima
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Gudanar da Gwaje-gwaje

```bash
# Duk gwaje-gwaje (unit + vitest + ecosystem + e2e)
npm run test:all

# Fayil ɗin gwaji guda ɗaya (mai gudanar da gwaji na asali na Node.js — yawancin gwaje-gwaje suna amfani da wannan)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Gwaje-gwajen unit kawai da canjin ku ya shafa (mai zaɓin TIA iri ɗaya da shingen CI, #8084)
npm run test:scoped            # canje-canje a commit na ƙarshe (ko working tree)
npm run test:scoped:staged     # staged changes kawai — ya dace sosai da gudanarwar pre-commit
npm run test:scoped:full       # fara sake gina taswirar import-graph (bayan ƙara/matsar da fayiloli)
# Exit 1 + "gudanar da cikakken suite" na nufin wani hub file (tsconfig, package.json, …) ko wani
# source da ba a yi masa mapping ba ya canza — mai zaɓin yana gazawa cikin aminci, ba ya taɓa tsallakewa a ɓoye.

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# Gwaje-gwajen E2E (yana buƙatar Playwright)
npm run test:e2e

# E2E na protocol clients (MCP transports, A2A)
npm run test:protocols:e2e

# Gwaje-gwajen dacewar ecosystem
npm run test:ecosystem

# Shingen coverage: 60% na statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# Binciken lint + format
npm run lint
npm run check

# Gwajin combo smoke na ainihin upstream mai shinge (yana buƙatar damar shiga VPS + kuɗin ainihin provider)
# Yana tuntuɓar ainihin providers — yana cin kuɗi kaɗan. BA YA TAƁA gudana a CI. Yana tsallakewa yadda ya dace idan babu shingen.
# Ana buƙata: damar ssh root@192.168.0.15 (yana samo snapshot na DB mai read-only daga VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Gwajin live smoke na VPS na Phase-3 — tsantsar scripts na Node ESM, suna tuntuɓar live .15 server kai tsaye.
# Yana buƙatar: damar ssh root@192.168.0.15 (ana ƙirƙira/rushe combos ta hanyar SSH sqlite).
# Yana tuntuɓar ainihin providers (ƙaramin kuɗi). Yana ƙirƙira/goge combos na __live_test__* kawai. BA YA TAƁA gudana a CI.
# REQUIRE_API_KEY=false a .15 don haka ba a buƙatar API key, amma yana bin COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY idan an saita su.
npm run test:combo:live:vps              # yanayin HTTP guda 7 (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # yana ƙara ainihin yanayin failover tsakanin providers (jimilla 8)
```

Bayanan coverage:

- `npm run test:coverage` yana auna coverage na source don babban unit test suite, yana cire `tests/**`, kuma yana haɗa `open-sse/**`
- Dole ne pull requests su kiyaye shingen coverage na **60%+** na statements/lines/functions/branches
- Idan PR ya canza production code a cikin `src/`, `open-sse/`, `electron/`, ko `bin/`, dole ne ya ƙara ko ya sabunta automated tests a cikin PR ɗin
- `npm run coverage:report` yana fitar da cikakken rahoto fayil-bayan-fayil daga gudanarwar coverage ta baya-bayan nan
- `npm run test:coverage:legacy` yana adana tsohon ma'auni don kwatanta tarihi
- Duba `docs/ops/COVERAGE_PLAN.md` don phased coverage improvement roadmap

### Abubuwan da Ake Buƙata na Pull Request

Kafin buɗe PR, yi amfani da
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) don gudanar da focused loop na
abin da kuka canza. Cikakken unit suite (4 CI shards), Vitest, shingen coverage na **60%+**, da
production build alhakin CI ne — gudanar da su a gida ba ya ƙara wani bayani da gwaje-gwajen PR
ba za su riga sun ba ku ba, kuma a kan ƙananan na'urori yana iya cika ƙarfin host (#8084):

- Gudanar da test files da suka shafi canjinku: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Gudanar da `npm run lint`
- Ƙara ko sabunta automated tests a cikin PR ɗin duk lokacin da production code ya canza
- A cikin fayilolin `node:test`, sanya kowane top-level `await` (kamar `await import(...)`) kafin `test()` / `describe()` na farko: a ƙarƙashin `--test-force-exit`, gwaje-gwajen da aka yi wa rajista bayansa na iya ƙin gudana a ɓoye (#18045; ana tilasta wannan ta `npm run check:test-tla-order`)
- Haɗa test files da aka canza ko aka ƙara a cikin bayanin PR idan production code ya canza
- Duba sakamakon SonarQube a kan PR lokacin da aka saita project secrets a CI

Matsayin gwaji na yanzu: **122 unit test files** waɗanda suka shafi:

- Provider translators da format conversion
- Rate limiting, circuit breaker, da resilience
- Semantic cache, idempotency, da progress tracking
- Database operations da schema (21 DB modules)
- OAuth flows da authentication
- Tabbatar da API endpoint (Zod v4)
- MCP server tools da tilasta scope
- Tsarukan Memory da Skills

---

## Salon Rubuta Lamba

- **ESLint** — Gudanar da `npm run lint` kafin yin commit
- **Prettier** — Ana tsara shi ta atomatik ta hanyar `lint-staged` yayin commit (sarari 2, semicolons, double quotes, faɗin haruffa 100, es5 trailing commas)
- **TypeScript** — Duk lambar `src/` tana amfani da `.ts`/`.tsx`; `open-sse/` yana amfani da `.ts`/`.js`; yi rubutun bayani da TSDoc (`@param`, `@returns`, `@throws`)
- **Ba a yarda da `eval()` ba** — ESLint yana tilasta `no-eval`, `no-implied-eval`, `no-new-func`
- **Tabbatarwa ta Zod** — Yi amfani da Zod v4 schemas don tabbatar da duk bayanan shigar API
- **Sanya suna**: Fayiloli = camelCase/kebab-case, components = PascalCase, constants = UPPER_SNAKE

### Sarrafa kurakurai / tubalan catch marasa komai

Kada a taɓa barin `catch` ba tare da bayani ba. Rarraba shi cikin ɗaya daga cikin rukuni biyu (wannan yana aiwatar da
ƙaƙƙarfan ƙa'idar "kada a taɓa haɗiye kurakurai a ɓoye cikin rafukan SSE"):

- **Da gangan (namu aikin tsaftacewa/telemetry na iya ƙoƙari)** — ana tsammanin gazawa a nan kuma
  ba ta da illa; ƙara sharhin dalili na layi ɗaya, ba tare da logging ba (logging a kan kowace buƙata shi ne
  hayaniyar da wannan ƙa'ida take kauce wa).

  ```ts
  } catch {} // ana tsammanin rufe controller da aka riga aka rufe bayan client ya yanke haɗi
  ```

- **Ya kamata a yi logging (lambar waje/wadda mai kira ya bayar, ko kuma haɗiye kuskuren yana sauya control flow)** — bar
  catch ɗin (kada a taɓa barinsa ya katse rafin) amma fitar da `console.debug`/`warn` mai bayanin mahallin domin
  a iya gano gazawar.

  ```ts
  } catch (e) {
    console.debug("[STREAM] kuskuren onFailure callback:", e);
  }
  ```

Duba `open-sse/utils/stream.ts` da `open-sse/utils/streamHandler.ts` don misalan da aka aiwatar.

---

## Tsarin Aikin

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

## Ƙara Sabon Mai Samarwa

### Mataki na 1: Yi Rijistar Constants na Mai Samarwa

Ƙara zuwa `src/shared/constants/providers.ts` — ana tabbatar da ingancinsa da Zod yayin loda module.

### Mataki na 2: Ƙara Executor (idan ana buƙatar logic na musamman)

Ƙirƙiri executor a `open-sse/executors/your-provider.ts` wanda ya gaji base executor.

### Mataki na 3: Ƙara Translator (idan tsarin ba na OpenAI ba ne)

Ƙirƙiri translators na request/response a `open-sse/translator/`.

### Mataki na 4: Ƙara Tsarin OAuth (idan yana amfani da OAuth)

Ƙara bayanan shaidar OAuth a `src/lib/oauth/constants/oauth.ts` da service a `src/lib/oauth/services/`.

Idan upstream provider yana rarraba client_id/secret na OAuth na jama'a ko Firebase Web API key a cikin CLI / browser bundle ɗinsa na jama'a, **kar a** saka shi a matsayin string literal. Yi amfani da `resolvePublicCred()` daga `open-sse/utils/publicCreds.ts` sannan ka ƙara masked byte entry zuwa `EMBEDDED_DEFAULTS`. An rubuta cikakken tsarin aikin da dole a bi a [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

A cikin handlers/executors, saƙonnin kuskure da za su isa ga client dole ne su bi ta `buildErrorBody()` / `sanitizeErrorMessage()` daga `open-sse/utils/error.ts` — kada a taɓa saka ainihin `err.stack` ko `err.message` a jikin Response. Duba [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Mataki na 5: Yi Rijistar Models

Ƙara ma'anar models a `open-sse/config/providerRegistry.ts`.

### Mataki na 6: Ƙara Tests

Rubuta unit tests a `tests/unit/` waɗanda aƙalla za su rufe:

- Rijistar mai samarwa
- Fassarar request/response
- Sarrafa kuskure

---

## Jerin Dubawa na Pull Request

- [ ] Gwaje-gwaje sun yi nasara (`npm test`)
- [ ] Binciken lint ya yi nasara (`npm run lint`)
- [ ] Gina ya yi nasara (`npm run build`)
- [ ] An ƙara nau'ikan TypeScript don sabbin public functions da interfaces
- [ ] Babu secrets ko fallback values da aka rubuta kai tsaye
- [ ] An saka public upstream credentials ta hanyar `resolvePublicCred()` (duba [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), ba a taɓa saka su kai tsaye a matsayin literals ba
- [ ] Error responses suna bi ta `buildErrorBody()` / `sanitizeErrorMessage()` — babu raw stack traces a cikin response bodies (duba [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell commands (`exec` / `spawn`) suna aika runtime values ta `env`, ba ta hanyar string interpolation ba
- [ ] An tantance dukkan inputs da Zod schemas
- [ ] An ƙara **fragment** na changelog a ƙarƙashin `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` don canje-canjen da masu amfani za su gani (duba [`changelog.d/README.md`](./changelog.d/README.md)) — **kada** a gyara `CHANGELOG.md` kai tsaye; ana haɗa fragments lokacin release kuma ba sa taɓa cin karo tsakanin PRs
- [ ] An sabunta takardu (idan ya dace)
- [ ] Ba a buɗe sabbin faɗakarwar CodeQL / Secret-Scanning ba, ko kuma an yi watsi da kowannensu tare da hujjar fasaha mai nuni zuwa takardar `docs/security/` da ta dace
- [ ] An rarraba routes da ke ƙaddamar da child processes (`/api/mcp/`, `/api/cli-tools/runtime/`) a matsayin `isLocalOnlyPath()` a cikin `src/server/authz/routeGuard.ts` — duba [Ƙa'ida Mai Tsauri #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Babu trailers na AI/bot na `Co-authored-by` a cikin commit messages (Ƙa'ida Mai Tsauri #16) — ana yaba wa human collaborators waɗanda aka sake amfani da aikinsu da daidaitattun trailers na `Co-authored-by: Name <email>`

---

## Fitar da Sabbin Sigogi

Ana sarrafa fitar da sabbin sigogi ta hanyar workflow ɗin `/generate-release`. Lokacin da aka ƙirƙiri sabon GitHub Release, ana **buga package ɗin zuwa npm ta atomatik** ta hanyar GitHub Actions.

Don deploy zuwa VPS, yi amfani da `npm run build:release` (ba `npm run build` ba) — yana yin sabon
build mai tsabta, ya haɗa bundle ɗin cikin `dist/`, sannan ya rubuta sentinel ɗin `dist/BUILD_SHA`.
Daga nan sai a yi amfani da skills na `/deploy-vps-*-cc`, waɗanda ke amfani da rsync don tura `dist/` zuwa directory ɗin `app/` na remote.

---

## Samun Taimako

- **Gine-gine** : See [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API Reference** : ga [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Dokokin tsaro** : [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), za , [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Ops docs** : [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Batutuwa** : [github.com/cheaper-inference/OmniRoute/issues](https://github.com/cheaper-inference/OmniRoute/issues)
