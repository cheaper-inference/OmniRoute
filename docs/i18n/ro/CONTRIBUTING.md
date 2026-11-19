# Contributing to OmniRoute (Română)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Configurarea mediului de dezvoltare

### Cerințe preliminare

- **Node.js** `>=22.22.2 <23` sau `>=24.0.0 <27` (recomandat: 24 LTS)
- **npm** 10+

> **Windows cu Node 24:** utilizați versiunea curentă de patch 24 LTS (cel puțin 24.20.0).
> Versiunile anterioare se pot închide după teste reușite atunci când `--test-force-exit` închide
> procesul. [Remedierea Windows libuv](https://github.com/nodejs/node/pull/61999) din Node
> soluționează această eroare de execuție; păstrați activate aserțiunile testelor și verificările
> de ieșire ale runnerului.

> **Utilizatorii npm v11+ (Node 24+):** după `npm install`, verificați dacă modulele native au fost instalate:
> `node -e "require('better-sqlite3')"`. Dacă eșuează cu `MODULE_NOT_FOUND`,
> rulați `npm approve-scripts better-sqlite3 && npm install`. Consultați
> [Depanarea](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Clonare și instalare

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Variabile de mediu

```bash
# Creați fișierul .env din șablon
cp .env.example .env

# Generați secretele necesare
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Variabile importante pentru dezvoltare:

| Variabilă              | Valoare implicită pentru dezvoltare | Descriere                          |
| ---------------------- | ----------------------------------- | ---------------------------------- |
| `PORT`                 | `20128`                             | Portul serverului                  |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`            | URL de bază pentru interfața web   |
| `JWT_SECRET`           | (generați mai sus)                  | Secretul de semnare JWT            |
| `INITIAL_PASSWORD`     | `CHANGEME`                          | Parola pentru prima autentificare  |
| `APP_LOG_LEVEL`        | `info`                              | Nivelul de detaliere al jurnalelor |

### Setările tabloului de bord

Tabloul de bord oferă comutatoare în interfața utilizatorului pentru funcții care pot fi configurate și prin variabile de mediu:

| Locația setării     | Comutator          | Descriere                                                                |
| ------------------- | ------------------ | ------------------------------------------------------------------------ |
| Settings → Advanced | Debug Mode         | Activează jurnalele de depanare ale cererilor (interfața utilizatorului) |
| Settings → General  | Sidebar Visibility | Afișează/ascunde secțiunile barei laterale                               |

Aceste setări sunt stocate în baza de date și persistă după reporniri, înlocuind valorile implicite ale variabilelor de mediu atunci când sunt definite.

### Rularea locală

```bash
# Modul de dezvoltare (reîncărcare automată)
npm run dev

# Compilare pentru producție
npm run build    # next build → .build/next/ then assembleStandalone → dist/

# Compilare rapidă doar pentru backend/API pentru modificările contribuitorilor
npm run build:contributor

# Compilare pentru lansare (recompilare curată + sentinelă HEAD — necesară pentru implementare)
npm run build:release   # rm -rf .build dist && build + writes dist/BUILD_SHA

# Configurarea uzuală a portului
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Compilarea pentru contribuitori efectuează validarea exclusivă a compilării: nu asamblează
distribuția autonomă și nu compilează activele opționale pentru împachetarea nativă. Utilizați
compilarea obișnuită pentru producție atunci când trebuie să validați pachetul pregătit pentru livrare.

### Structura rezultatului compilării

| Director  | Conținut                                                                           | Urmărit |
| --------- | ---------------------------------------------------------------------------------- | ------- |
| `src/`    | Codul sursă al aplicației (TypeScript / TSX)                                       | Da      |
| `.build/` | Intermediare — rezultatul `next build` (ignorat de git, `distDir = .build/next`)   | Nu      |
| `dist/`   | Pachet pregătit pentru livrare — asamblat de `assembleStandalone` (ignorat de git) | Nu      |

Conducta de compilare are o singură trecere:

```
npm run build
  └─ next build → .build/next/standalone  (rezultatul Next.js)
  └─ assembleStandalone()                 (copiază standalone + static + public + active native)
       └─ rezultat: dist/                 (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` curăță suplimentar ambele directoare mai întâi și scrie
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) ca sentinelă pentru integritatea implementării.

`npm run build:contributor` utilizează profilul de compilare exclusiv pentru backend. Înlocuiește temporar
fișierele interfeței tabloului de bord în timpul compilării, păstrează gestionarele rutelor API și restaurează
fișierele originale după compilare. Utilizați `npm run build` pentru modificări care afectează interfața
tabloului de bord sau pentru validarea completă a lansării; profilul pentru contribuitori nu înlocuiește
compilarea pentru lansare.

> **Notă privind implementarea pe VPS:** directorul imaginii la distanță `/usr/lib/node_modules/omniroute/app/`
> rămâne neschimbat. Abilitățile de implementare sincronizează prin rsync conținutul `dist/` în acesta.
> S-a mutat doar calea rezultatului compilării din depozit (`app/` → `dist/`).

URL-uri implicite:

- **Tablou de bord**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Flux de lucru Git

> ⚠️ **Nu efectuați NICIODATĂ commit-uri direct în `main`.** Utilizați întotdeauna ramuri pentru funcționalități.
>
> **Baza PR-ului:** vizați ramura activă `release/vX.Y.Z` (nu `main`). Consultați
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) pentru modelul
> cu câte o ramură per versiune și etichetare la livrare.

```bash
# Creați ramura pornind de la cel mai recent commit al versiunii active (exemplu: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... efectuați modificările ...
git commit -m "feat: descrieți modificarea"
git push -u origin feat/your-feature-name
# Deschideți un Pull Request cu baza = release/v3.8.49
```

### Denumirea ramurilor

| Prefix      | Scop                         |
| ----------- | ---------------------------- |
| `feat/`     | Funcționalități noi          |
| `fix/`      | Remedierea erorilor          |
| `refactor/` | Restructurarea codului       |
| `docs/`     | Modificări ale documentației |
| `test/`     | Adăugări/remedieri de teste  |
| `chore/`    | Instrumente, CI, dependențe  |

### Mesajele commit-urilor

Urmați [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adăugați un disjunctor pentru apelurile furnizorilor
fix: rezolvați cazul-limită al validării secretului JWT
docs: actualizați SECURITY.md cu protecția PII
test: adăugați teste unitare pentru observabilitate
refactor(db): consolidați tabelele pentru limitarea ratei
```

Domenii (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Rularea testelor

```bash
# Toate testele (unitare + vitest + ecosistem + e2e)
npm run test:all

# Un singur fișier de testare (executorul de teste nativ Node.js — majoritatea testelor îl folosesc)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Doar testele unitare afectate de modificarea dvs. (același selector TIA ca pragul CI, #8084)
npm run test:scoped            # modificările din ultimul commit (sau din arborele de lucru)
npm run test:scoped:staged     # doar modificările pregătite — se potrivește bine cu o rulare pre-commit
npm run test:scoped:full       # reconstruiește mai întâi harta grafului de importuri (după adăugarea/mutarea fișierelor)
# Exit 1 + „rulați întreaga suită” înseamnă că un fișier central (tsconfig, package.json, …) sau o
# sursă necartografiată s-a modificat — selectorul eșuează în siguranță, nu omite niciodată ceva în mod silențios.

# Vitest (server MCP, autoCombo, cache)
npm run test:vitest

# Teste E2E (necesită Playwright)
npm run test:e2e

# E2E pentru clienții de protocol (transporturi MCP, A2A)
npm run test:protocols:e2e

# Teste de compatibilitate cu ecosistemul
npm run test:ecosystem

# Prag de acoperire: 60% pentru instrucțiuni/linii/funcții/ramuri
npm run test:coverage
npm run coverage:report

# Verificare lint + formatare
npm run lint
npm run check

# Test smoke combinat condiționat, cu servicii upstream reale (necesită acces VPS + credite reale la furnizori)
# Accesează furnizori REALI — costă puțin. Nu rulează NICIODATĂ în CI. Este omis fără erori în absența condiției.
# Necesită: acces ssh root@192.168.0.15 (încarcă un instantaneu DB doar în citire de pe VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Test smoke live VPS de faza 3 — scripturi Node ESM simple, accesează direct serverul live .15.
# Necesită: acces ssh root@192.168.0.15 (combinațiile sunt create/eliminate prin SSH sqlite).
# Accesează furnizori REALI (cost redus). Creează/șterge doar combinații __live_test__*. Nu rulează NICIODATĂ în CI.
# REQUIRE_API_KEY=false pe .15, deci nu este necesară nicio cheie API, dar respectă COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY dacă sunt setate.
npm run test:combo:live:vps              # 7 scenarii HTTP (prioritate/round-robin/ponderat/cost/fuziune/automat + stare)
npm run test:combo:live:vps:failover     # adaugă un scenariu real de failover între furnizori (8 în total)
```

Note privind acoperirea:

- `npm run test:coverage` măsoară acoperirea codului sursă pentru suita principală de teste unitare, exclude `tests/**` și include `open-sse/**`
- Solicitările de integrare trebuie să mențină pragul de acoperire la **60%+** pentru instrucțiuni/linii/funcții/ramuri
- Dacă un PR modifică codul de producție din `src/`, `open-sse/`, `electron/` sau `bin/`, acesta trebuie să adauge sau să actualizeze teste automate în același PR
- `npm run coverage:report` afișează raportul detaliat, fișier cu fișier, de la cea mai recentă rulare a acoperirii
- `npm run test:coverage:legacy` păstrează metrica mai veche pentru comparații istorice
- Consultați `docs/ops/COVERAGE_PLAN.md` pentru foaia de parcurs etapizată privind îmbunătățirea acoperirii

### Cerințe pentru solicitările de integrare

Înainte de a deschide un PR, utilizați
[Fluxul recomandat pentru contribuții](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) pentru a rula ciclul focalizat pentru
ceea ce ați modificat. Suita completă de teste unitare (4 partiții CI), Vitest, pragul de acoperire de **60%+** și
buildul de producție sunt responsabilitatea CI — rularea lor locală nu oferă informații suplimentare față de cele
pe care vi le vor furniza deja verificările PR-ului, iar pe sistemele mai mici poate satura gazda (#8084):

- Rulați fișierele de testare care acoperă modificarea dvs.: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Rulați `npm run lint`
- Includeți sau actualizați teste automate în același PR ori de câte ori se modifică codul de producție
- În fișierele `node:test`, plasați fiecare `await` de nivel superior (precum `await import(...)`) înaintea primului `test()` / `describe()`: cu `--test-force-exit`, testele înregistrate după acesta pot să nu ruleze niciodată, fără nicio avertizare (#18045; regulă verificată prin `npm run check:test-tla-order`)
- Includeți în descrierea PR-ului fișierele de testare modificate sau adăugate atunci când s-a modificat codul de producție
- Verificați rezultatul SonarQube pentru PR atunci când secretele proiectului sunt configurate în CI

Starea actuală a testelor: **122 de fișiere de teste unitare** care acoperă:

- Translatoare pentru furnizori și conversia formatelor
- Limitarea ratei, întrerupătorul de circuit și reziliența
- Cache-ul semantic, idempotenta și urmărirea progresului
- Operațiunile bazei de date și schema (21 de module DB)
- Fluxurile OAuth și autentificarea
- Validarea endpointurilor API (Zod v4)
- Instrumentele serverului MCP și aplicarea domeniilor de acces
- Sistemele Memory și Skills

---

## Stilul codului

- **ESLint** — Rulați `npm run lint` înainte de commit
- **Prettier** — Formatare automată prin `lint-staged` la commit (2 spații, punct și virgulă, ghilimele duble, lățime de 100 de caractere, virgule finale es5)
- **TypeScript** — Tot codul din `src/` utilizează `.ts`/`.tsx`; `open-sse/` utilizează `.ts`/`.js`; documentați cu TSDoc (`@param`, `@returns`, `@throws`)
- **Fără `eval()`** — ESLint impune `no-eval`, `no-implied-eval`, `no-new-func`
- **Validare Zod** — Utilizați scheme Zod v4 pentru validarea tuturor datelor de intrare API
- **Denumire**: fișiere = camelCase/kebab-case, componente = PascalCase, constante = UPPER_SNAKE

### Gestionarea erorilor / blocuri catch goale

Nu lăsați niciodată un `catch` neexplicat. Clasificați-l într-una dintre cele două categorii (punând
în practică regula strictă „nu ignorați niciodată în tăcere erorile din fluxurile SSE”):

- **Intenționat (propria noastră curățare/telemetrie de tip best-effort)** — o eroare în acest caz este așteptată și
  inofensivă; adăugați un comentariu explicativ pe un singur rând, fără jurnalizare (jurnalizarea la fiecare cerere este
  zgomotul pe care această convenție îl evită).

  ```ts
  } catch {} // închiderea unui controler deja închis după deconectarea clientului este de așteptat
  ```

- **Trebuie jurnalizat (cod extern/furnizat de apelant sau ignorarea erorii modifică fluxul de control)** — păstrați
  blocul catch (nu permiteți niciodată ca acesta să întrerupă fluxul), dar emiteți un mesaj contextual prin `console.debug`/`warn`, astfel încât
  eroarea să poată fi identificată.

  ```ts
  } catch (e) {
    console.debug("[STREAM] eroare în callback-ul onFailure:", e);
  }
  ```

Consultați `open-sse/utils/stream.ts` și `open-sse/utils/streamHandler.ts` pentru exemple aplicate.

---

## Structura proiectului

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

## Adăugarea unui furnizor nou

### Pasul 1: Înregistrați constantele furnizorului

Adăugați-le în `src/shared/constants/providers.ts` — validate cu Zod la încărcarea modulului.

### Pasul 2: Adăugați executorul (dacă este necesară logică personalizată)

Creați executorul în `open-sse/executors/your-provider.ts`, extinzând executorul de bază.

### Pasul 3: Adăugați translatorul (dacă formatul nu este OpenAI)

Creați translatoare pentru cereri/răspunsuri în `open-sse/translator/`.

### Pasul 4: Adăugați configurația OAuth (dacă se bazează pe OAuth)

Adăugați credențialele OAuth în `src/lib/oauth/constants/oauth.ts` și serviciul în `src/lib/oauth/services/`.

Dacă furnizorul din amonte distribuie un client_id/secret OAuth public sau o cheie Firebase Web API în CLI-ul său public / pachetul pentru browser, **nu** îl/o încorporați ca literal de tip șir. Utilizați `resolvePublicCred()` din `open-sse/utils/publicCreds.ts` și adăugați o intrare de octeți mascată în `EMBEDDED_DEFAULTS`. Fluxul de lucru complet și obligatoriu este documentat în [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

În interiorul handlerelor/executorilor, mesajele de eroare care ajung la client trebuie să treacă prin `buildErrorBody()` / `sanitizeErrorMessage()` din `open-sse/utils/error.ts` — nu includeți niciodată valorile brute `err.stack` sau `err.message` în corpul unui răspuns. Consultați [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Pasul 5: Înregistrați modelele

Adăugați definițiile modelelor în `open-sse/config/providerRegistry.ts`.

### Pasul 6: Adăugați teste

Scrieți teste unitare în `tests/unit/` care să acopere cel puțin:

- Înregistrarea furnizorului
- Traducerea cererilor/răspunsurilor
- Gestionarea erorilor

---

## Lista de verificare a cererii de tragere

- [ ] Testele trec (`npm test`)
- [ ] Treci de scame (`npm run lint`)
- [ ] Construirea reușește (`npm run build`)
- [ ] Tipuri TypeScript adăugate pentru noi funcții publice și interfețe
- [ ] Fără secrete hardcoded sau valori alternative
- [ ] Acreditări publice în amonte încorporate prin `resolvePublicCred()` (vezi [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ), niciodată ca literale
- [ ] Răspunsurile de eroare sunt direcționate prin `buildErrorBody()` / `sanitizeErrorMessage()` — fără urme brute de stivă în corpurile de răspuns (a se vedea [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) )
- [ ] Comenzile Shell (`exec` / `spawn`) trec valorile de rulare prin `env`, nu prin interpolare de șiruri
- [ ] Toate intrările validate cu scheme Zod
- [ ] Jurnalul modificărilor** fragment** adăugat sub `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` pentru modificări adresate utilizatorului (vezi [`changelog.d/README.md`](./changelog.d/README.md) ) — do** nu** editați `CHANGELOG.md` direct; fragmentele sunt agregate la momentul lansării și nu intră niciodată în conflict între PRs
- [ ] Documentația actualizată (dacă este cazul)
- [ ] Nu s-au deschis alerte noi CodeQL /Scanare secretă sau fiecare a fost respinsă cu o justificare tehnică care face referire la documentul `docs/security/` relevant
- [ ] Rute care generează procese secundare (`/api/mcp/`, `/api/cli-tools/runtime/`) clasificate ca `isLocalOnlyPath()` în `src/server/authz/routeGuard.ts` — vezi [Hard Rule #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Fără trailere AI/bot `Co-authored-by` în mesajele de confirmare (Hard Rule #16) Colaboratorii umani — a căror muncă este reutilizată sunt creditați cu trailere `Co-authored-by: Name <email>` standard

---

## Publicarea versiunilor

Versiunile sunt gestionate prin fluxul de lucru `/generate-release`. Când este creată o nouă versiune GitHub, pachetul este **publicat automat pe npm** prin GitHub Actions.

Pentru implementările pe VPS, utilizați `npm run build:release` (nu `npm run build`) — acesta efectuează o
recompilare de la zero, asamblează pachetul în `dist/` și scrie fișierul santinelă `dist/BUILD_SHA`.
Apoi utilizați abilitățile `/deploy-vps-*-cc`, care sincronizează prin rsync directorul `dist/` cu directorul `app/` de la distanță.

---

## Obținerea ajutorului

- **Arhitectură**: Consultați [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Referință API**: Consultați [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Documentație de securitate**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Documentație operațională**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Probleme**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
