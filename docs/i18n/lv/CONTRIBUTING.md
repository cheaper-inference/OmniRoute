# Contributing to OmniRoute (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Paldies par interesi sniegt ieguldījumu! Šajā rokasgrāmatā ir aprakstīts viss nepieciešamais, lai sāktu darbu.

Oficiālo katras izmaiņas darbplūsmu skatiet sadaļā
[Zelta ceļš ieguldījumu veikšanai](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Tajā pakalpojumu sniedzēja,
maršrutēšanas, UI/UX, i18n, CLI, datubāzes un būvēšanas/izvietošanas izmaiņas ir sasaistītas
ar to līgumiem, mērķētiem testiem, CI pārklājumu un saskaņošanas darbībām.

---

## Izstrādes iestatīšana

### Priekšnosacījumi

- **Node.js** `>=22.22.2 <23`, vai `>=24.0.0 <27` (ieteicams: 24 LTS)
- **npm** 10+

> **Windows ar Node 24:** izmantojiet pašreizējo 24 LTS labojumversiju (vismaz 24.20.0).
> Vecākas versijas var pārtraukt darbību pēc veiksmīgiem testiem, kad `--test-force-exit` aizver
> procesu. Node [Windows libuv labojums](https://github.com/nodejs/node/pull/61999) novērš
> šo izpildlaika avāriju; atstājiet testu apgalvojumu un izpildītāja iziešanas pārbaudes iespējotas.

> **npm v11+ lietotāji (Node 24+):** pēc `npm install` pārbaudiet, vai vietējie moduļi tika instalēti:
> `node -e "require('better-sqlite3')"`. Ja komanda neizdodas ar `MODULE_NOT_FOUND`,
> izpildiet `npm approve-scripts better-sqlite3 && npm install`. Skatiet
> [Problēmu novēršana](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klonēšana un instalēšana

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Vides mainīgie

```bash
# Izveidojiet .env no veidnes
cp .env.example .env

# Ģenerējiet nepieciešamos noslēpumus
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Galvenie izstrādes mainīgie:

| Mainīgais              | Noklusējuma vērtība izstrādē | Apraksts                      |
| ---------------------- | ---------------------------- | ----------------------------- |
| `PORT`                 | `20128`                      | Servera ports                 |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`     | Frontend pamata URL           |
| `JWT_SECRET`           | (ģenerējiet iepriekš)        | JWT parakstīšanas noslēpums   |
| `INITIAL_PASSWORD`     | `CHANGEME`                   | Pirmās pieteikšanās parole    |
| `APP_LOG_LEVEL`        | `info`                       | Žurnāla detalizācijas līmenis |

### Informācijas paneļa iestatījumi

Informācijas panelī ir pieejami lietotāja saskarnes slēdži funkcijām, kuras var konfigurēt arī, izmantojot vides mainīgos:

| Iestatījuma atrašanās vieta | Slēdzis            | Apraksts                                         |
| --------------------------- | ------------------ | ------------------------------------------------ |
| Settings → Advanced         | Debug Mode         | Iespējot atkļūdošanas pieprasījumu žurnālus (UI) |
| Settings → General          | Sidebar Visibility | Rādīt/slēpt sānjoslas sadaļas                    |

Šie iestatījumi tiek glabāti datubāzē un saglabājas pēc atkārtotas palaišanas, ja tie ir iestatīti, ignorējot vides mainīgo noklusējuma vērtības.

### Palaišana lokāli

```bash
# Izstrādes režīms (automātiska pārlāde)
npm run dev

# Produkcijas būvējums
npm run build    # next build → .build/next/ then assembleStandalone → dist/
npm run start

# Ātra aizmugursistēmas/API kompilācija līdzautoru izmaiņām
npm run build:contributor

# Izlaides būvējums (tīra pārbūve + HEAD marķieris — nepieciešams izvietošanai)
npm run build:release   # rm -rf .build dist && build + writes dist/BUILD_SHA

# Izplatīta porta konfigurācija
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Līdzautoru būvējums veic tikai kompilācijas validāciju: tas neizveido atsevišķo
distribūciju un nebūvē neobligātos vietējās pakotnes līdzekļus. Izmantojiet parasto produkcijas būvējumu,
ja nepieciešams validēt publicējamo pakotni.

### Būvējuma izvades izkārtojums

| Direktorija | Saturs                                                                           | Izsekota |
| ----------- | -------------------------------------------------------------------------------- | -------- |
| `src/`      | Lietotnes pirmkods (TypeScript / TSX)                                            | Jā       |
| `.build/`   | Starpfaili — `next build` izvade (ignorēta Git sistēmā, `distDir = .build/next`) | Nē       |
| `dist/`     | Publicējamā pakotne — izveidota ar `assembleStandalone` (ignorēta Git sistēmā)   | Nē       |

Būvēšanas process notiek vienā piegājienā:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js izvade)
  └─ assembleStandalone()                 (kopē standalone + static + public + native assets)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` papildus vispirms notīra abas direktorijas un ieraksta
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) kā izvietošanas integritātes marķieri.

`npm run build:contributor` izmanto tikai aizmugursistēmas būvējuma profilu. Būvēšanas laikā
tas īslaicīgi aizstāj informācijas paneļa UI failus ar tukšiem failiem, saglabā API maršrutu
apstrādātājus un pēc būvējuma atjauno sākotnējos failus. Izmantojiet `npm run build`, ja izmaiņas
ietekmē informācijas paneļa UI, vai pilnai izlaides validācijai; līdzautoru profils neaizstāj izlaides būvējumu.

> **Piezīme par VPS izvietošanu:** attālā attēla direktorija `/usr/lib/node_modules/omniroute/app/`
> paliek nemainīta. Izvietošanas prasmes tajā sinhronizē `dist/` saturu, izmantojot rsync.
> Mainīts ir tikai repozitorijā esošais būvējuma izvades ceļš (`app/` → `dist/`).

Noklusējuma URL:

- **Informācijas panelis**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git darbplūsma

> ⚠️ **NEKAD neveiciet tiešu commit uz `main`.** Vienmēr izmantojiet funkciju zarus.
>
> **PR bāze:** mērķējiet uz aktīvo `release/vX.Y.Z` zaru (nevis `main`). Skatiet
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md), lai iepazītos ar
> modeli “release-per-branch + tag-at-ship”.

```bash
# Izveidot zaru no aktīvā release gala (piemērs: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... veikt izmaiņas ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Atveriet Pull Request ar base = release/v3.8.49
```

### Zaru nosaukumi

| Prefix      | Nolūks                      |
| ----------- | --------------------------- |
| `feat/`     | Jaunas funkcijas            |
| `fix/`      | Kļūdu labojumi              |
| `refactor/` | Koda pārstrukturēšana       |
| `docs/`     | Dokumentācijas izmaiņas     |
| `test/`     | Testu pievienošana/labošana |
| `chore/`    | Rīki, CI, atkarības         |

### Commit ziņojumi

Ievērojiet [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Tvērumi (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Testu izpilde

```bash
# Visi testi (vienībtesti + vitest + ekosistēma + e2e)
npm run test:all

# Atsevišķs testa fails (Node.js iebūvētais testu izpildītājs — to izmanto lielākā daļa testu)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Tikai jūsu izmaiņu ietekmētie vienībtesti (tas pats TIA atlasītājs kā CI pārbaudē, #8084)
npm run test:scoped            # izmaiņas pēdējā komitā (vai darba kokā)
npm run test:scoped:staged     # tikai sagatavotās izmaiņas — labi sader ar izpildi pirms komita
npm run test:scoped:full       # vispirms no jauna izveido importēšanas grafa karti (pēc failu pievienošanas/pārvietošanas)
# Izejas kods 1 + "izpildiet pilno komplektu" nozīmē, ka ir mainīts centrmezgla fails (tsconfig, package.json, …) vai
# nekartēts avota fails — atlasītājs droši pārtrauc darbu un nekad klusām neizlaiž testus.

# Vitest (MCP serveris, autoCombo, kešatmiņa)
npm run test:vitest

# E2E testi (nepieciešams Playwright)
npm run test:e2e

# Protokolu klientu E2E (MCP transporti, A2A)
npm run test:protocols:e2e

# Ekosistēmas saderības testi
npm run test:ecosystem

# Pārklājuma slieksnis: 60% priekšrakstu/rindu/funkciju/zaru
npm run test:coverage
npm run coverage:report

# Lintēšanas un formatējuma pārbaude
npm run lint
npm run check

# Ar slēdzi iespējota reālās augšupstraumes combo ātrā pārbaude (nepieciešama VPS piekļuve un reālu pakalpojumu sniedzēju kredīti)
# Izmanto REĀLUS pakalpojumu sniedzējus — rada nelielas izmaksas. NEKAD netiek izpildīta CI. Ja slēdzis nav iestatīts, tiek korekti izlaista.
# Nepieciešama: ssh root@192.168.0.15 piekļuve (no VPS tiek ielādēts tikai lasāms DB momentuzņēmums).
RUN_COMBO_LIVE=1 npm run test:combo:live

# 3. posma VPS tiešā ātrā pārbaude — vienkārši Node ESM skripti, kas tieši izmanto aktīvo .15 serveri.
# Nepieciešama: ssh root@192.168.0.15 piekļuve (combo tiek izveidoti/noņemti, izmantojot SSH sqlite).
# Izmanto REĀLUS pakalpojumu sniedzējus (nelielas izmaksas). Izveido/dzēš tikai __live_test__* combo. NEKAD netiek izpildīta CI.
# .15 serverī ir REQUIRE_API_KEY=false, tāpēc API atslēga nav nepieciešama, taču, ja iestatīti COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY, tie tiek ievēroti.
npm run test:combo:live:vps              # 7 HTTP scenāriji (prioritāte/cikliska atlase/svēršana/izmaksas/apvienošana/automātiska atlase + darbspēja)
npm run test:combo:live:vps:failover     # pievieno reālu kļūmjpārlēces scenāriju starp pakalpojumu sniedzējiem (kopā 8)
```

Piezīmes par pārklājumu:

- `npm run test:coverage` mēra avota pārklājumu galvenajam vienībtestu komplektam, izslēdz `tests/**` un iekļauj `open-sse/**`
- Izmaiņu pieprasījumos ir jāsaglabā vismaz **60%** priekšrakstu/rindu/funkciju/zaru pārklājuma slieksnis
- Ja PR maina produkcijas kodu mapē `src/`, `open-sse/`, `electron/` vai `bin/`, tajā pašā PR ir jāpievieno vai jāatjaunina automatizētie testi
- `npm run coverage:report` izdrukā jaunākās pārklājuma izpildes detalizētu pārskatu par katru failu
- `npm run test:coverage:legacy` saglabā vecāko metriku vēsturiskai salīdzināšanai
- Pakāpeniskā pārklājuma uzlabošanas ceļvedi skatiet failā `docs/ops/COVERAGE_PLAN.md`

### Izmaiņu pieprasījuma prasības

Pirms PR atvēršanas izmantojiet
[ieteicamo ieguldījumu procesu](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), lai izpildītu mērķēto ciklu
jūsu veiktajām izmaiņām. Par pilno vienībtestu komplektu (4 CI daļas), Vitest, **60%+** pārklājuma slieksni un
produkcijas būvējumu atbild CI — to lokāla izpilde nesniedz nekādu papildu informāciju, ko PR
pārbaudes jau nesniegtu, un mazāk jaudīgās iekārtās tā var pārslogot sistēmu (#8084):

- Izpildiet testa failus, kas pārbauda jūsu izmaiņas: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Izpildiet `npm run lint`
- Ikreiz, kad mainās produkcijas kods, tajā pašā PR iekļaujiet vai atjauniniet automatizētos testus
- `node:test` failos katru augstākā līmeņa `await` (piemēram, `await import(...)`) novietojiet pirms pirmā `test()` / `describe()`: izmantojot `--test-force-exit`, pēc tā reģistrētie testi var klusām vispār netikt izpildīti (#18045; to nodrošina `npm run check:test-tla-order`)
- Ja ir mainīts produkcijas kods, PR aprakstā norādiet mainītos vai pievienotos testa failus
- Ja projektam CI vidē ir konfigurēti noslēpumi, pārbaudiet PR SonarQube rezultātu

Pašreizējais testu statuss: **122 vienībtestu faili**, kas aptver:

- Pakalpojumu sniedzēju tulkotājus un formātu pārveidošanu
- Ātruma ierobežošanu, ķēdes pārtraucēju un noturību
- Semantisko kešatmiņu, idempotenci un progresa izsekošanu
- Datubāzes operācijas un shēmu (21 DB modulis)
- OAuth plūsmas un autentifikāciju
- API galapunktu validāciju (Zod v4)
- MCP servera rīkus un tvēruma ierobežojumu piemērošanu
- Memory un Skills sistēmas

---

## Koda stils

- **ESLint** — Pirms komita izpildiet `npm run lint`
- **Prettier** — Komita laikā automātiski formatē, izmantojot `lint-staged` (2 atstarpes, semikoli, dubultās pēdiņas, 100 rakstzīmju platums, `es5` beigu komati)
- **TypeScript** — Viss `src/` kods izmanto `.ts`/`.tsx`; `open-sse/` izmanto `.ts`/`.js`; dokumentējiet ar TSDoc (`@param`, `@returns`, `@throws`)
- **Bez `eval()`** — ESLint ievēro `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod validācija** — Visai API ievades validācijai izmantojiet Zod v4 shēmas
- **Nosaukumi**: faili = camelCase/kebab-case, komponenti = PascalCase, konstantes = UPPER_SNAKE

### Kļūdu apstrāde / tukši catch bloki

Nekad neatstājiet `catch` bez paskaidrojuma. Klasificējiet to vienā no divām kategorijām (tādējādi tiek ieviests stingrais noteikums “nekad klusi neignorēt kļūdas SSE straumēs”):

- **Apzināta (mūsu pašu labāko centienu tīrīšana/telemetrija)** — kļūme šeit ir sagaidāma un nekaitīga; pievienojiet vienas rindiņas pamatojuma komentāru, neveiciet reģistrēšanu (reģistrēšana katra pieprasījuma laikā ir troksnis, no kura šī konvencija palīdz izvairīties).

  ```ts
  } catch {} // jau aizvērta kontrollera aizvēršana pēc klienta atvienošanās ir sagaidāma
  ```

- **Jāreģistrē (ārējs/zvanītāja nodrošināts kods vai kļūdas ignorēšana maina vadības plūsmu)** — saglabājiet `catch` (nekad neļaujiet tam pārtraukt straumi), bet izvadiet kontekstuālu `console.debug`/`warn`, lai kļūme būtu atklājama.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Skatiet `open-sse/utils/stream.ts` un `open-sse/utils/streamHandler.ts`, lai iepazītos ar pielietotajiem piemēriem.

---

## Projekta struktūra

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

## Jauna nodrošinātāja pievienošana

### 1. darbība: reģistrējiet nodrošinātāja konstantes

Pievienojiet `src/shared/constants/providers.ts` — validācija ar Zod tiek veikta moduļa ielādes laikā.

### 2. darbība: pievienojiet izpildītāju (ja nepieciešama pielāgota loģika)

Izveidojiet izpildītāju `open-sse/executors/your-provider.ts`, paplašinot bāzes izpildītāju.

### 3. darbība: pievienojiet tulkotāju (ja formāts nav OpenAI formāts)

Izveidojiet pieprasījumu/atbilžu tulkotājus direktorijā `open-sse/translator/`.

### 4. darbība: pievienojiet OAuth konfigurāciju (ja tiek izmantots OAuth)

Pievienojiet OAuth akreditācijas datus failā `src/lib/oauth/constants/oauth.ts` un pakalpojumu direktorijā `src/lib/oauth/services/`.

Ja augšupējais nodrošinātājs izplata publisku OAuth client_id/secret vai Firebase Web API key savā publiskajā CLI / pārlūkprogrammas komplektā, **neieguliet to kā virknes literāli**. Izmantojiet `resolvePublicCred()` no `open-sse/utils/publicCreds.ts` un pievienojiet maskētu baitu ierakstu kolekcijai `EMBEDDED_DEFAULTS`. Pilnā obligātā darbplūsma ir dokumentēta failā [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Apstrādātājos/izpildītājos kļūdu ziņojumiem, kas sasniedz klientu, ir jāizmanto `buildErrorBody()` / `sanitizeErrorMessage()` no `open-sse/utils/error.ts` — nekad neievietojiet neapstrādātu `err.stack` vai `err.message` objekta `Response` pamattekstā. Skatiet [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### 5. darbība: reģistrējiet modeļus

Pievienojiet modeļu definīcijas failā `open-sse/config/providerRegistry.ts`.

### 6. darbība: pievienojiet testus

Uzrakstiet vienību testus direktorijā `tests/unit/`, kas aptver vismaz:

- Nodrošinātāja reģistrāciju
- Pieprasījumu/atbilžu tulkošanu
- Kļūdu apstrādi

---

## Pull Request Checklist

- [ ] Pārbaudes nokārtotas (`npm test`)
- [ ] Šķērsošanas caurlaides (`npm run lint`)
- [ ] Būvēšana ir veiksmīga (`npm run build`)
- [ ] TypeScript veidi pievienoti jaunām publiskām funkcijām un saskarnēm
- [ ] Nav šifrētu noslēpumu vai rezerves vērtību
- [ ] Publiskie augšupējie akreditācijas dati, kas iegulti, izmantojot `resolvePublicCred()` (skatiet [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ), nekad kā burti
- [ ] Kļūdu atbildes virzās caur `buildErrorBody()` / `sanitizeErrorMessage()` — atbildes ķermeņos nav neapstrādātas steka pēdas (skatiet [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) )
- [ ] Shell komandas (`exec` / `spawn`) nodod izpildlaika vērtības , izmantojot `env`, nevis virknes interpolāciju
- [ ] Visas ievades ir apstiprinātas ar Zod shēmām
- [ ] Izmaiņu žurnāls** fragments** pievienots zem `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` lietotājam paredzētām izmaiņām (sk. [`changelog.d/README.md`](./changelog.d/README.md) ) — do** nē** rediģēt `CHANGELOG.md` tieši; fragmenti tiek apkopoti izlaišanas laikā un nekad nav pretrunā starp PRs
- [ ] Dokumentācija atjaunināta (ja piemērojama)
- [ ] Nav atvērts neviens jauns CodeQL /Slepenās meklēšanas brīdinājums vai katrs no tiem ir noraidīts ar tehnisku pamatojumu, atsaucoties uz attiecīgo `docs/security/` dokumentu
- [ ] Maršruti , kas rada bērnu procesus (`/api/mcp/`, `/api/cli-tools/runtime/`) , kas klasificēti kā `isLocalOnlyPath()` in `src/server/authz/routeGuard.ts` — skatiet [cieto noteikumu #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Nav AI/bot `Co-authored-by` piekabju saistību ziņojumos (Hard Rule #16) — līdzstrādniekiem, kuru darbs tiek atkārtoti izmantots, tiek piešķirti standarta `Co-authored-by: Name <email>` piekabes

---

## Izlaides

Izlaides tiek pārvaldītas, izmantojot `/generate-release` darbplūsmu. Kad tiek izveidots jauns GitHub laidiens, pakotne tiek **automātiski publicēta npm** platformā, izmantojot GitHub Actions.

VPS izvietošanai izmantojiet `npm run build:release` (nevis `npm run build`) — tas veic tīru
pārbūvi, apkopo komplektu mapē `dist/` un izveido `dist/BUILD_SHA` indikatorfailu.
Pēc tam izmantojiet `/deploy-vps-*-cc` prasmes, kas ar rsync sinhronizē `dist/` ar attālo `app/` mapi.

---

## Palīdzības saņemšana

- **Arhitektūra**: Skatiet [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API atsauce**: Skatiet [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Drošības dokumentācija**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Ekspluatācijas dokumentācija**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problēmas**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
