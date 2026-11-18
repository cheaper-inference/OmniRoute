# Contributing to OmniRoute (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Täname huvi eest panustamise vastu! See juhend hõlmab kõike, mida alustamiseks vajate.

Ametliku muudatusepõhise töövoo jaoks alustage
[panustamise põhiteest](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). See seob teenusepakkuja, marsruutimise,
UI/UX-i, i18n-i, CLI, andmebaasi ning koostamise/juurutamise muudatused nende lepingute, suunatud testide, CI
katvuse ja vastavusse viimise sammudega.

---

## Arenduskeskkonna seadistamine

### Eeltingimused

- **Node.js** `>=22.22.2 <23` või `>=24.0.0 <27` (soovitatav: 24 LTS)
- **npm** 10+

> **Windows koos Node 24-ga:** kasutage praeguse 24 LTS-i haru uusimat paigaversiooni (vähemalt 24.20.0).
> Varasemad versioonid võivad pärast edukalt läbitud teste katkestada, kui `--test-force-exit` protsessi
> sulgeb. Node'i [Windowsi libuv parandus](https://github.com/nodejs/node/pull/61999) lahendab
> selle käitusaegse krahhi; jätke testiväited ja käituri väljumise kontrollid sisse.

> **npm v11+ kasutajad (Node 24+):** pärast `npm install` käivitamist kontrollige, kas natiivsed moodulid on installitud:
> `node -e "require('better-sqlite3')"`. Kui see nurjub veaga `MODULE_NOT_FOUND`,
> käivitage `npm approve-scripts better-sqlite3 && npm install`. Vt
> [Tõrkeotsing](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klooni loomine ja installimine

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Keskkonnamuutujad

```bash
# Looge mallist oma .env
cp .env.example .env

# Genereerige vajalikud saladused
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Arenduse jaoks olulised muutujad:

| Muutuja                | Arenduse vaikeväärtus    | Kirjeldus                      |
| ---------------------- | ------------------------ | ------------------------------ |
| `PORT`                 | `20128`                  | Serveri port                   |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Veebikliendi baas-URL          |
| `JWT_SECRET`           | (genereerige ülal)       | JWT allkirjastamise saladus    |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Esimese sisselogimise parool   |
| `APP_LOG_LEVEL`        | `info`                   | Logimise üksikasjalikkuse tase |

### Armatuurlaua seaded

Armatuurlaud pakub kasutajaliidese lüliteid funktsioonide jaoks, mida saab seadistada ka keskkonnamuutujate kaudu:

| Seadistuse asukoht  | Lüliti             | Kirjeldus                                  |
| ------------------- | ------------------ | ------------------------------------------ |
| Settings → Advanced | Debug Mode         | Silumisrežiimi päringulogide lubamine (UI) |
| Settings → General  | Sidebar Visibility | Külgriba jaotiste kuvamine/peitmine        |

Need seaded salvestatakse andmebaasi ja säilivad taaskäivituste vahel, kui need on määratud, tühistades keskkonnamuutujate vaikeväärtused.

### Kohalik käivitamine

```bash
# Arendusrežiim (kuumlaadimine)
npm run dev

# Tootmisjärk
npm run build    # next build → .build/next/ then assembleStandalone → dist/
npm run start

# Kiire ainult tagarakenduse/API kompileerimine kaasautorite muudatuste jaoks
npm run build:contributor

# Väljalaskejärk (puhas ümberehitus + HEAD-i marker — juurutamiseks nõutav)
npm run build:release   # rm -rf .build dist && build + writes dist/BUILD_SHA

# Levinud pordi seadistus
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Kaasautorite järk teostab ainult kompileerimise valideerimise: see ei koosta eraldiseisvat
distributsiooni ega ehita valikulisi natiivse pakendamise varasid. Kui teil on vaja
valmivat paketti valideerida, kasutage tavalist tootmisjärku.

### Järgu väljundipaigutus

| Kataloog  | Sisu                                                                    | Jälgitav |
| --------- | ----------------------------------------------------------------------- | -------- |
| `src/`    | Rakenduse lähtekood (TypeScript / TSX)                                  | Jah      |
| `.build/` | Vahefailid — `next build` väljund (gitignored, `distDir = .build/next`) | Ei       |
| `dist/`   | Valmis pakett — koostatud `assembleStandalone` abil (gitignored)        | Ei       |

Järgu töövoog on ühekordne:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js väljund)
  └─ assembleStandalone()                 (kopeerib standalone + static + public + native assets)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` puhastab lisaks esmalt mõlemad kataloogid ja kirjutab
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) juurutamise terviklikkuse markerina.

`npm run build:contributor` kasutab ainult tagarakenduse järgu profiili. See asendab
järgu ajaks ajutiselt armatuurlaua kasutajaliidese failid, säilitab API marsruudikäitlejad
ja taastab pärast järku algsed failid. Kasutage `npm run build` muudatuste korral, mis
mõjutavad armatuurlaua kasutajaliidest, või täielikuks väljalaske valideerimiseks;
kaasautorite profiil ei asenda väljalaskejärku.

> **VPS-i juurutamise märkus:** kaugpildi kataloog `/usr/lib/node_modules/omniroute/app/`
> jääb muutmata. Juurutamisoskused sünkroonivad `dist/` sisu sinna rsynci abil.
> Muudeti ainult repositooriumisisese järgu väljundirada (`app/` → `dist/`).

Vaike-URL-id:

- **Armatuurlaud**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Giti töövoog

> ⚠️ **ÄRA KUNAGI commiti otse harusse `main`.** Kasuta alati funktsionaalsusharusid.
>
> **PR-i baasharu:** sihi aktiivset haru `release/vX.Y.Z` (mitte `main`). Harupõhise väljalaske
> ja avaldamisel sildistamise mudelit kirjeldab
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md).

```bash
# Loo haru aktiivse väljalaske tipust (näide: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... tee muudatused ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Ava Pull Request, mille base = release/v3.8.49
```

### Harude nimetamine

| Prefiks     | Otstarve                     |
| ----------- | ---------------------------- |
| `feat/`     | Uued funktsioonid            |
| `fix/`      | Veaparandused                |
| `refactor/` | Koodi ümberstruktureerimine  |
| `docs/`     | Dokumentatsiooni muudatused  |
| `test/`     | Testide lisamised/parandused |
| `chore/`    | Tööriistad, CI, sõltuvused   |

### Commiti sõnumid

Järgi standardit [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Ulatused (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Testide käitamine

```bash
# Kõik testid (üksustestid + Vitest + ökosüsteem + E2E)
npm run test:all

# Üks testifail (Node.js-i sisseehitatud testikäitaja — enamik teste kasutab seda)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Ainult sinu muudatusest mõjutatud üksustestid (sama TIA valikumehhanism nagu CI kontrollis, #8084)
npm run test:scoped            # viimase commiti (või tööpuu) muudatused
npm run test:scoped:staged     # ainult stage’itud muudatused — sobib hästi commitieelse käitamisega
npm run test:scoped:full       # esmalt koosta impordigraafi kaart uuesti (pärast failide lisamist/teisaldamist)
# Väljumiskood 1 + „käita kogu komplekt” tähendab, et keskne fail (tsconfig, package.json, …) või
# kaardistamata lähtekood muutus — valikumehhanism lõpetab turvaliselt ega jäta teste kunagi märkamatult vahele.

# Vitest (MCP-server, autoCombo, vahemälu)
npm run test:vitest

# E2E-testid (nõuab Playwrighti)
npm run test:e2e

# Protokolliklientide E2E-testid (MCP-transpordid, A2A)
npm run test:protocols:e2e

# Ökosüsteemi ühilduvustestid
npm run test:ecosystem

# Katvuse lävend: 60% lausete/ridade/funktsioonide/harude katvus
npm run test:coverage
npm run coverage:report

# Lintimise + vorminduse kontroll
npm run lint
npm run check

# Kontrollitav päris ülesvoolu kombinatsiooni suitsutest (nõuab VPS-ile juurdepääsu + päris teenusepakkujate krediiti)
# Kasutab PÄRIS teenusepakkujaid — maksab veidi. EI tööta KUNAGI CI-s. Jäetakse ilma kontrollmuutujata puhtalt vahele.
# Vajab juurdepääsu: ssh root@192.168.0.15 (laadib VPS-ist kirjutuskaitstud andmebaasitõmmise).
RUN_COMBO_LIVE=1 npm run test:combo:live

# 3. etapi VPS-i reaalne suitsutest — lihtsad Node ESM-i skriptid, mis kasutavad otse töötavat .15 serverit.
# Vajab juurdepääsu: ssh root@192.168.0.15 (kombinatsioonid luuakse/eemaldatakse SSH kaudu SQLite’is).
# Kasutab PÄRIS teenusepakkujaid (väike kulu). Loob/kustutab ainult __live_test__* kombinatsioone. EI tööta KUNAGI CI-s.
# .15 serveris on REQUIRE_API_KEY=false, seega API-võtit pole vaja, kuid kasutab COMBO_LIVE_BASE_URL-i / COMBO_LIVE_API_KEY-d, kui need on määratud.
npm run test:combo:live:vps              # 7 HTTP-stsenaariumi (prioriteet/tsükliline/kaalutud/kulu/fusioon/automaatne + tervisekontroll)
npm run test:combo:live:vps:failover     # lisab päris teenusepakkujatevahelise tõrkesiirdestsenaariumi (kokku 8)
```

Märkused katvuse kohta:

- `npm run test:coverage` mõõdab peamise üksustestide komplekti lähtekoodi katvust, välistab `tests/**` ja hõlmab `open-sse/**`
- Pull request’id peavad säilitama lausete/ridade/funktsioonide/harude katvuse lävendi **60%+**
- Kui PR muudab tootmiskoodi kataloogides `src/`, `open-sse/`, `electron/` või `bin/`, peab sama PR lisama või uuendama automatiseeritud teste
- `npm run coverage:report` väljastab viimase katvuskäituse üksikasjaliku failipõhise aruande
- `npm run test:coverage:legacy` säilitab vanema mõõdiku ajalooliseks võrdluseks
- Katvuse järkjärgulise parandamise tegevuskava leiad failist `docs/ops/COVERAGE_PLAN.md`

### Pull request’i nõuded

Enne PR-i avamist kasuta
[panustamise kuldteed](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), et käitada oma
muudatusele keskendunud töövoog. Täielik üksustestide komplekt (4 CI-kildu), Vitest, **60%+**
katvuse lävend ja tootmisversiooni kooste on CI vastutusel — nende kohalik käitamine ei anna
lisateavet, mida PR-i kontrollid juba ei annaks, ning võib väiksemates masinates süsteemi üle koormata (#8084):

- Käita oma muudatust katvad testifailid: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Käita `npm run lint`
- Tootmiskoodi muutmisel lisa või uuenda samas PR-is automatiseeritud teste
- Paiguta `node:test` failides iga tipptaseme `await` (näiteks `await import(...)`) enne esimest `test()` / `describe()` kutset: suvandi `--test-force-exit` kasutamisel võivad pärast seda registreeritud testid märkamatult käitamata jääda (#18045; kontrollib `npm run check:test-tla-order`)
- Kui tootmiskood muutus, lisa muudetud või lisatud testifailid PR-i kirjeldusse
- Kui projekti saladused on CI-s seadistatud, kontrolli PR-is SonarQube’i tulemust

Testide praegune olek: **122 üksustestifaili**, mis hõlmavad järgmist:

- Teenusepakkujate tõlkijad ja vormingute teisendamine
- Päringusageduse piiramine, kaitselüliti ja tõrkekindlus
- Semantiline vahemälu, idempotentsus ja edenemise jälgimine
- Andmebaasitoimingud ja skeem (21 andmebaasimoodulit)
- OAuthi vood ja autentimine
- API lõpp-punktide valideerimine (Zod v4)
- MCP-serveri tööriistad ja ulatuse jõustamine
- Mälu- ja oskustesüsteemid

---

## Koodistiil

- **ESLint** — Käivita `npm run lint` enne commitimist
- **Prettier** — Automaatselt vormindatud `lint-staged` abil commitimisel (2 tühikut, semikoolonid, kahekordsed jutumärgid, 100 märgi laius, es5 järgnevad komad)
- **TypeScript** — Kogu `src/` kood kasutab `.ts`/`.tsx`; `open-sse/` kasutab `.ts`/`.js`; dokumendi TSDoc-ga (`@param`, `@returns`, `@throws`)
- **Keelatud `eval()`** — ESLint rakendab `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod valideerimine** — Kasuta Zod v4 skeeme kõigi API sisendi valideerimiseks
- **Nimetamine**: Failid = camelCase/kebab-case, komponendid = PascalCase, konstantid = UPPER_SNAKE

### Vigade töötlemine / tühjad catch-blokid

Ära jäta `catch` kunagi selgitamata. Klasifitseeri see kahe kategooriasse (operationaliseerib kange reegli "mitte kunagi vaikselt loe SSE voogudes vigu"):

- **Intentsionaalne (oma parima püüdluse puhastus/telemeetria)** — ebaõnnestumine siin on oodatud ja
  kahjutus; lisa ühe rea põhjendav kommentaar, logimata (iga päringu logimine on see müra, mida see konventsioon vältib).

  ```ts
  } catch {} // juba suletud kontrolleri sulgemine kliendi discconnecti järel on oodatud
  ```

- **Peab logima (väline/hüvitaja kood, või niitamine muudab kontrollivoolu)** — hoia
  catch (kunagi lase see voogu murda) aga emiteeri kontekstuaalne `console.debug`/`warn`, et
  ebaõnnestumine on avastatav.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Vaata `open-sse/utils/stream.ts` ja `open-sse/utils/streamHandler.ts` rakendatud näidete jaoks.

---

## Projekti struktuur

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

## Uue tarnija lisamine

### 1. samm: Registreeri tarnija konstandid

Lisa `src/shared/constants/providers.ts` — Zod-valideeritud moduli laadimisel.

### 2. samm: Lisa käivitaja (kui on vaja kohandatud loogikat)

Loo käivitaja `open-sse/executors/your-provider.ts`, laiendades baaskäivitajat.

### 3. samm: Lisa tõlkija (kui formaat pole OpenAI)

Loo päringu/vastuse tõlkijad `open-sse/translator/` kataloogi.

### 4. samm: Lisa OAuth konfiguratsioon (kui põhineb OAuth-il)

Lisa OAuth volikirjad `src/lib/oauth/constants/oauth.ts` ja teenus `src/lib/oauth/services/` kataloogi.

Kui ülemine tarnija levitab avalikku OAuth kliendi_id/secret või Firebase Web API võtit oma avalikus CLI / brauseri paketis, **ära** pea seda sõna-sõnalt stringina. Kasuta `resolvePublicCred()` funktsiooni `open-sse/utils/publicCreds.ts` failist ja lis maskeeritud baitide kiri `EMBEDDED_DEFAULTS` massiivi. Täielik kohustuslik töövoog on dokumenteeritud [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) dokumendis.

Käitlejate/käivitajate sees peavad kliendini jõudvad veateated läbima `buildErrorBody()` / `sanitizeErrorMessage()` funktsioonid `open-sse/utils/error.ts` failist — ära pane kunagi tooret `err.stack` või `err.message` Response kehasse. Vaata [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) dokumenti.

### 5. samm: Registreeri mudelid

Lisa määratlused `open-sse/config/providerRegistry.ts` failis.

### 6. samm: Lisa testid

Kirjuta üksiktestid `tests/unit/` kataloogi, kattes vähemalt:

- Tarnija registreerimine
- Päringu/vastuse tõlkimine
- Vigade käsitlemine

---

## Tõmmake päringu kontrollnimekiri

- [ ] Testid läbisid (`npm test`)
- [ ] Linting passid (`npm run lint`)
- [ ] Ehitamine õnnestub (`npm run build`)
- [ ] TypeScript tüübid on lisatud uute avalike funktsioonide ja liideste jaoks
- [ ] Ei mingeid kodeeritud saladusi ega varuväärtusi
- [ ] `resolvePublicCred()` kaudu manustatud avalikud ülesvoolu mandaadid (vt [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ), mitte kunagi literaalidena
- [ ] Vea vastused suunatakse läbi `buildErrorBody()` / `sanitizeErrorMessage()` — vastuse kehades pole töötlemata pinu jälgi (vt [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) )
- [ ] Shellikäsud (`exec` / `spawn`) edastavad käitusaja väärtused `env`, mitte stringi interpolatsiooni kaudu
- [ ] Kõik sisendid on kinnitatud Zod skeemidega
- [ ] Muudatuste logi** fragment** lisatud `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` alla kasutajale suunatud muudatuste jaoks (vt [`changelog.d/README.md`](./changelog.d/README.md) ) — do** mitte** muuda `CHANGELOG.md` otse; fragmendid koondatakse vabastamise ajal ja need ei ole kunagi vastuolus PRs vahel
- [ ] Dokumentatsiooni uuendatud (kui see on kohaldatav)
- [ ] Ühtegi uut CodeQL / salajase skannimise märguannet ei avatud või neist ei loobutud tehnilise põhjendusega, mis viitab asjakohasele `docs/security/` dokile
- [ ] Marsruudid , mis tekitavad alamprotsesse (`/api/mcp/`, `/api/cli-tools/runtime/`) klassifitseeritud `isLocalOnlyPath()` `src/server/authz/routeGuard.ts` — vt [kõva reeglit #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Kinnitussõnumites pole AI/bot `Co-authored-by` treilereid (Hard Rule #16) — kaastöötajaid, kelle tööd taaskasutatakse, tunnustatakse standardsete `Co-authored-by: Name <email>` treileritega

---

## Avaldamine

Avaldusi haldab töövoog `/generate-release`. Kui luuakse uus GitHub Release, avaldatakse pakett **automaatselt npm-i** GitHub Actions'i kaudu.

VPS desployimiseks kasuta käsku `npm run build:release` (mitte `npm run build`) — see teostab puhta
taastöötluse, koondab kimpude kokku kausta `dist/` ja kirjutab lähtefaili `dist/BUILD_SHA`.
Seejärel kasuta töövooge `/deploy-vps-*-cc`, mis kasutavad rsync-i `dist/` edastamiseks kaugserveri kataloogi `app/`.

---

## Abi saamine

- **Arhitektuur**: Vaadake faili [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API viitedokumentatsioon**: Vaadake faili [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Turbedokumentatsioon**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Käitlusdokumentatsioon**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Probleemid**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
