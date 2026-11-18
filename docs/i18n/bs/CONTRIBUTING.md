# Contributing to OmniRoute (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Hvala vam na interesovanju za doprinos! Ovaj vodič pokriva sve što vam je potrebno za početak.

Za zvanični workflow po promjeni, počnite sa
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). On mapira promjene providera, rutiranja,
UI/UX-a, i18n-a, CLI-ja, baze podataka i build/deploy procesa na njihove ugovore, fokusirane testove, CI
pokrivenost i korake usklađivanja.

---

## Postavljanje razvojnog okruženja

### Preduslovi

- **Node.js** `>=22.22.2 <23`, ili `>=24.0.0 <27` (preporučeno: 24 LTS)
- **npm** 10+

> **Windows sa Node 24:** koristite aktuelno izdanje zakrpe za 24 LTS (najmanje 24.20.0).
> Ranija izdanja mogu prekinuti rad nakon uspješnih testova kada `--test-force-exit` zatvori
> proces. Node-ova [Windows libuv ispravka](https://github.com/nodejs/node/pull/61999) rješava
> ovaj pad tokom izvršavanja; zadržite omogućene provjere tvrdnji testova i izlaza pokretača.

> **Korisnici npm v11+ (Node 24+):** Nakon `npm install`, provjerite da li su nativni moduli instalirani:
> `node -e "require('better-sqlite3')"`. Ako ne uspije uz `MODULE_NOT_FOUND`,
> pokrenite `npm approve-scripts better-sqlite3 && npm install`. Pogledajte
> [Rješavanje problema](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Kloniranje i instalacija

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Varijable okruženja

```bash
# Kreirajte svoj .env iz predloška
cp .env.example .env

# Generišite potrebne tajne
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Ključne varijable za razvoj:

| Varijabla              | Podrazumijevana vrijednost za razvoj | Opis                        |
| ---------------------- | ------------------------------------ | --------------------------- |
| `PORT`                 | `20128`                              | Port servera                |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`             | Osnovni URL za frontend     |
| `JWT_SECRET`           | (generišite iznad)                   | Tajna za potpisivanje JWT-a |
| `INITIAL_PASSWORD`     | `CHANGEME`                           | Lozinka za prvu prijavu     |
| `APP_LOG_LEVEL`        | `info`                               | Nivo detaljnosti zapisnika  |

### Postavke kontrolne table

Kontrolna tabla pruža prekidače u korisničkom interfejsu za funkcije koje se takođe mogu konfigurisati putem varijabli okruženja:

| Lokacija postavke   | Prekidač           | Opis                                                   |
| ------------------- | ------------------ | ------------------------------------------------------ |
| Settings → Advanced | Debug Mode         | Omogući zapisnike zahtjeva za otklanjanje grešaka (UI) |
| Settings → General  | Sidebar Visibility | Prikaži/sakrij odjeljke bočne trake                    |

Ove postavke se čuvaju u bazi podataka i zadržavaju nakon ponovnog pokretanja, nadjačavajući podrazumijevane vrijednosti varijabli okruženja kada su postavljene.

### Lokalno pokretanje

```bash
# Razvojni režim (automatsko ponovno učitavanje)
npm run dev

# Produkcijska izgradnja
npm run build    # next build → .build/next/ zatim assembleStandalone → dist/
npm run start

# Brza kompilacija samo backend/API-ja za izmjene saradnika
npm run build:contributor

# Izgradnja izdanja (čista ponovna izgradnja + HEAD sentinel — potrebno za isporuku)
npm run build:release   # rm -rf .build dist zatim build + upisuje dist/BUILD_SHA

# Uobičajena konfiguracija porta
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Izgradnja za saradnike obavlja provjeru samo tokom kompilacije: ne sastavlja samostalnu
distribuciju niti izgrađuje opcionalne nativne pakete. Koristite uobičajenu produkcijsku izgradnju
kada trebate provjeriti paket spreman za isporuku.

### Raspored izlaznih datoteka izgradnje

| Direktorij | Sadržaj                                                                          | Praćen |
| ---------- | -------------------------------------------------------------------------------- | ------ |
| `src/`     | Izvorni kod aplikacije (TypeScript / TSX)                                        | Da     |
| `.build/`  | Međurezultati — izlaz komande `next build` (gitignored, `distDir = .build/next`) | Ne     |
| `dist/`    | Paket spreman za isporuku — sastavlja ga `assembleStandalone` (gitignored)       | Ne     |

Proces izgradnje odvija se u jednom prolazu:

```
npm run build
  └─ next build → .build/next/standalone  (izlaz Next.js-a)
  └─ assembleStandalone()                 (kopira standalone + static + public + native assets)
       └─ izlaz: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` dodatno prvo čisti oba direktorija i upisuje
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) kao sentinel za provjeru integriteta isporuke.

`npm run build:contributor` koristi profil izgradnje samo za backend. Privremeno zamjenjuje
datoteke korisničkog interfejsa kontrolne table tokom izgradnje, zadržava rukovaoce API ruta i
vraća originalne datoteke nakon izgradnje. Koristite `npm run build` za izmjene koje utiču na
korisnički interfejs kontrolne table ili za potpunu provjeru izdanja; profil za saradnike nije
zamjena za izgradnju izdanja.

> **Napomena o isporuci na VPS:** udaljeni direktorij slika `/usr/lib/node_modules/omniroute/app/`
> ostaje nepromijenjen. Vještine za isporuku rsync-om sinhronizuju sadržaj direktorija `dist/` u njega.
> Promijenjena je samo putanja izlaza izgradnje unutar repozitorija (`app/` → `dist/`).

Podrazumijevani URL-ovi:

- **Kontrolna tabla**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git Workflow

> ⚠️ **NIKADA ne commit-ujte direktno u `main`.** Uvijek koristite feature grane.
>
> **PR baza:** ciljajte aktivnu `release/vX.Y.Z` granu (ne `main`). Pogledajte
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) za
> model release-per-branch + tag-at-ship.

```bash
# Grana od vrha aktivnog release-a (primjer: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... unesite izmjene ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Otvorite Pull Request sa bazom = release/v3.8.49
```

### Imenovanje grana

| Prefiks     | Svrha                      |
| ----------- | -------------------------- |
| `feat/`     | Nove funkcionalnosti       |
| `fix/`      | Ispravci bugova            |
| `refactor/` | Restrukturiranje koda      |
| `docs/`     | Izmjene dokumentacije      |
| `test/`     | Dodavanje/ispravci testova |
| `chore/`    | Tooling, CI, zavisnosti    |

### Poruke commit-a

Pratite [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scope-ovi (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Pokretanje testova

```bash
# Svi testovi (jedinični + vitest + ekosistem + e2e)
npm run test:all

# Pojedinačna testna datoteka (izvorni Node.js pokretač testova — većina testova koristi ovaj)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Samo jedinični testovi na koje utiče vaša izmjena (isti TIA selektor kao CI kontrola, #8084)
npm run test:scoped            # izmjene u posljednjem commitu (ili radnom stablu)
npm run test:scoped:staged     # samo pripremljene izmjene — dobro se uklapa s pokretanjem prije commita
npm run test:scoped:full       # prvo ponovo izgradite mapu grafa importa (nakon dodavanja/premještanja datoteka)
# Izlaz 1 + "pokrenite cijeli paket" znači da je centralna datoteka (tsconfig, package.json, …) ili
# nemapirani izvor izmijenjen — selektor sigurno prekida, nikada ništa ne preskače bez upozorenja.

# Vitest (MCP server, autoCombo, keš)
npm run test:vitest

# E2E testovi (zahtijeva Playwright)
npm run test:e2e

# E2E za klijente protokola (MCP transporti, A2A)
npm run test:protocols:e2e

# Testovi kompatibilnosti ekosistema
npm run test:ecosystem

# Prag pokrivenosti: 60% naredbi/linija/funkcija/grana
npm run test:coverage
npm run coverage:report

# Provjera linta + formatiranja
npm run lint
npm run check

# Kontrolirani kombinovani test osnovne funkcionalnosti sa stvarnim vanjskim servisima (zahtijeva VPS pristup + stvarne kredite pružatelja)
# Koristi STVARNE pružatelje — košta malo. NIKADA se ne pokreće u CI-ju. Uredno se preskače bez kontrolne varijable.
# Potrebno: ssh root@192.168.0.15 pristup (učitava snimak baze podataka samo za čitanje s VPS-a).
RUN_COMBO_LIVE=1 npm run test:combo:live

# VPS test osnovne funkcionalnosti faze 3 uživo — obične Node ESM skripte, direktno pristupaju aktivnom .15 serveru.
# Zahtijeva: ssh root@192.168.0.15 pristup (kombinacije se kreiraju/uklanjaju putem SSH sqlite).
# Koristi STVARNE pružatelje (mali trošak). Kreira/briše samo __live_test__* kombinacije. NIKADA se ne pokreće u CI-ju.
# REQUIRE_API_KEY=false na .15 pa API ključ nije potreban, ali poštuje COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY ako su postavljeni.
npm run test:combo:live:vps              # 7 HTTP scenarija (prioritet/kružno raspoređivanje/ponderiranje/trošak/fuzija/automatski + stanje)
npm run test:combo:live:vps:failover     # dodaje stvarni scenarij prebacivanja između pružatelja (ukupno 8)
```

Napomene o pokrivenosti:

- `npm run test:coverage` mjeri pokrivenost izvornog koda za glavni paket jediničnih testova, izuzima `tests/**` i uključuje `open-sse/**`
- Zahtjevi za spajanje moraju održavati prag pokrivenosti od **60%+** naredbi/linija/funkcija/grana
- Ako PR mijenja produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/`, mora dodati ili ažurirati automatizirane testove u istom PR-u
- `npm run coverage:report` ispisuje detaljan izvještaj po datotekama iz posljednjeg pokretanja provjere pokrivenosti
- `npm run test:coverage:legacy` zadržava stariju metriku radi historijskog poređenja
- Pogledajte `docs/ops/COVERAGE_PLAN.md` za fazni plan poboljšanja pokrivenosti

### Zahtjevi za zahtjev za spajanje

Prije otvaranja PR-a koristite
[Preporučeni postupak doprinosa](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) kako biste pokrenuli ciljani ciklus za
ono što ste izmijenili. CI je odgovoran za cijeli paket jediničnih testova (4 CI particije), Vitest, prag pokrivenosti od **60%+** i
produkcijsku izgradnju — njihovo lokalno pokretanje ne pruža nikakve dodatne informacije koje vam
PR provjere već neće dati, a na slabijim računarima može preopteretiti sistem (#8084):

- Pokrenite testne datoteke koje pokrivaju vašu izmjenu: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Pokrenite `npm run lint`
- Uključite ili ažurirajte automatizirane testove u istom PR-u kad god se mijenja produkcijski kod
- U `node:test` datotekama postavite svaki `await` najvišeg nivoa (kao što je `await import(...)`) prije prvog `test()` / `describe()`: pod `--test-force-exit`, testovi registrirani nakon njega mogu se neprimjetno nikada ne pokrenuti (#18045; provodi se pomoću `npm run check:test-tla-order`)
- Uključite izmijenjene ili dodane testne datoteke u opis PR-a kada je izmijenjen produkcijski kod
- Provjerite SonarQube rezultat na PR-u kada su tajne projekta konfigurirane u CI-ju

Trenutni status testova: **122 datoteke jediničnih testova** koje pokrivaju:

- Prevodioce pružatelja i konverziju formata
- Ograničavanje brzine, prekidač strujnog kruga i otpornost
- Semantički keš, idempotentnost i praćenje napretka
- Operacije baze podataka i shemu (21 DB modul)
- OAuth tokove i autentifikaciju
- Validaciju API krajnjih tačaka (Zod v4)
- Alate MCP servera i provođenje opsega
- Sisteme memorije i vještina

---

## Stil koda

- **ESLint** — Pokrenite `npm run lint` prije commit-ovanja
- **Prettier** — Automatsko formatiranje putem `lint-staged` pri commit-ovanju (2 razmaka, tačka-zarez, dvostruki navodnici, širina od 100 znakova, es5 trailing zarezi)
- **TypeScript** — Sav kod u `src/` koristi `.ts`/`.tsx`; `open-sse/` koristi `.ts`/`.js`; dokumentujte pomoću TSDoc-a (`@param`, `@returns`, `@throws`)
- **Bez `eval()`** — ESLint nameće `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod validacija** — Koristite Zod v4 sheme za svu validaciju API ulaza
- **Imenovanje**: Datoteke = camelCase/kebab-case, komponente = PascalCase, konstante = UPPER_SNAKE

### Obrada grešaka / prazni catch blokovi

Nikada ne ostavljajte `catch` neobjašnjenim. Klasifikujte ga u jednu od dvije kategorije (operacionalizuje strogo pravilo "nikada ne gutajte greške u tišini u SSE stream-ovima"):

- **Namjerno (naše vlastito čišćenje/telemetrija na principu "best-effort")** — ovdje je neuspjeh očekivan i bezopasan; dodajte komentar sa objašnjenjem u jednoj liniji, bez logovanja (logovanje pri svakom zahtjevu je upravo onaj šum koji ova konvencija izbjegava).

  ```ts
  } catch {} // zatvaranje već zatvorenog kontrolera nakon diskonekcije klijenta je očekivano
  ```

- **Treba logovati (eksterni kod/kod koji šalje pozivač, ili ako gutanje greške mijenja tok kontrole)** — zadržite catch (nikada ne dopustite da prekine stream), ali emitujte kontekstualni `console.debug`/`warn` kako bi se neuspjeh mogao otkriti.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Pogledajte `open-sse/utils/stream.ts` i `open-sse/utils/streamHandler.ts` za primjere primjene.

---

## Struktura projekta

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

## Dodavanje novog providera

### Korak 1: Registracija konstanti providera

Dodajte u `src/shared/constants/providers.ts` — Zod-validirano prilikom učitavanja modula.

### Korak 2: Dodavanje executora (ako je potrebna prilagođena logika)

Kreirajte executor u `open-sse/executors/your-provider.ts` koji proširuje bazni executor.

### Korak 3: Dodavanje translatora (ako format nije OpenAI)

Kreirajte translate-ore za zahtjeve/odgovore u `open-sse/translator/`.

### Korak 4: Dodavanje OAuth konfiguracije (ako se bazira na OAuth-u)

Dodajte OAuth kredencijale u `src/lib/oauth/constants/oauth.ts` i servis u `src/lib/oauth/services/`.

Ako upstream provider distribuira javni OAuth client_id/secret ili Firebase Web API ključ unutar svog javnog CLI-ja / browser bundle-a, **nemojte** ga ugrađivati kao string literal. Koristite `resolvePublicCred()` iz `open-sse/utils/publicCreds.ts` i dodajte maskirani byte unos u `EMBEDDED_DEFAULTS`. Kompletan obavezni workflow je dokumentovan u [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Unutar handlera/executora, poruke o greškama koje stižu do klijenta moraju proći kroz `buildErrorBody()` / `sanitizeErrorMessage()` iz `open-sse/utils/error.ts` — nikada ne stavljajte sirovi `err.stack` ili `err.message` u tijelo Response-a. Pogledajte [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Korak 5: Registracija modela

Dodajte definicije modela u `open-sse/config/providerRegistry.ts`.

### Korak 6: Dodavanje testova

Napišite unit testove u `tests/unit/` koji pokrivaju najmanje:

- Registraciju providera
- Translaciju zahtjeva/odgovora
- Obradu grešaka

---

## Kontrolna lista za Pull Request

- [ ] Testovi prolaze (`npm test`)
- [ ] Provjera lintinga prolazi (`npm run lint`)
- [ ] Build je uspješan (`npm run build`)
- [ ] Dodani su TypeScript tipovi za nove javne funkcije i interfejse
- [ ] Nema hardkodiranih tajni ili rezervnih vrijednosti
- [ ] Javni pristupni podaci uzvodnog sistema ugrađeni su putem `resolvePublicCred()` (pogledajte [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), nikada kao literali
- [ ] Odgovori s greškama prolaze kroz `buildErrorBody()` / `sanitizeErrorMessage()` — nema neobrađenih stack traceova u tijelima odgovora (pogledajte [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell komande (`exec` / `spawn`) prosljeđuju vrijednosti tokom izvršavanja putem `env`, a ne putem interpolacije stringova
- [ ] Svi ulazi validirani su pomoću Zod schema
- [ ] **Fragment** dnevnika promjena dodan je u `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` za promjene vidljive korisnicima (pogledajte [`changelog.d/README.md`](./changelog.d/README.md)) — **nemojte** direktno uređivati `CHANGELOG.md`; fragmenti se objedinjuju prilikom izdavanja i nikada ne uzrokuju konflikte između PR-ova
- [ ] Dokumentacija je ažurirana (ako je primjenjivo)
- [ ] Nisu otvorena nova CodeQL upozorenja / upozorenja skeniranja tajni ili je svako od njih odbačeno uz tehničko obrazloženje koje upućuje na relevantni dokument u `docs/security/`
- [ ] Rute koje pokreću podređene procese (`/api/mcp/`, `/api/cli-tools/runtime/`) klasificirane su kao `isLocalOnlyPath()` u `src/server/authz/routeGuard.ts` — pogledajte [Strogo pravilo #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Nema AI/bot `Co-authored-by` završnih redova u porukama commita (Strogo pravilo #16) — ljudski saradnici čiji se rad ponovo koristi navode se standardnim `Co-authored-by: Name <email>` završnim redovima

---

## Objavljivanje (Releasing)

Objave se upravljaju putem `/generate-release` workflow-a. Kada se kreira novi GitHub Release, paket se **automatski objavljuje na npm** putem GitHub Actions.

Za VPS deploymente, koristite `npm run build:release` (ne `npm run build`) — on vrši čisto ponovno građenje (Rebuild), sastavlja bundle u `dist/` i zapisuje `dist/BUILD_SHA` sentinel.
Zatim koristite `/deploy-vps-*-cc` skill-ove koji rsync-uju `dist/` u udaljeni `app/` direktorij.

---

## Dobivanje pomoći

- **Arhitektura**: Pogledajte [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API referenca**: Pogledajte [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Sigurnosna dokumentacija**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Operativna dokumentacija**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemi**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
