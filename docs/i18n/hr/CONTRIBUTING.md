# Contributing to OmniRoute (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Hvala vam na interesu za doprinos! Ovaj vodič pokriva sve što vam je potrebno za početak.

Za službeni tijek rada po promjeni, počnite s
[Zlatnom stazom doprinosa](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Ona mapira promjene pružatelja, usmjeravanja,
UI/UX-a, i18n-a, CLI-ja, baze podataka i izgradnje/postavljanja na njihove ugovore, fokusirane testove, CI
pokrivenost i korake usklađivanja.

---

## Postavljanje razvojnog okruženja

### Preduvjeti

- **Node.js** `>=22.22.2 <23` ili `>=24.0.0 <27` (preporučeno: 24 LTS)
- **npm** 10+

> **Korisnici verzije npm v11+ (Node 24+):** Nakon naredbe `npm install` provjerite jesu li nativni moduli instalirani:
> `node -e "require('better-sqlite3')"`. Ako naredba ne uspije uz pogrešku `MODULE_NOT_FOUND`,
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
# Izradite svoj .env prema predlošku
cp .env.example .env

# Generirajte potrebne tajne ključeve
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Ključne varijable za razvoj:

| Varijabla              | Zadana razvojna vrijednost | Opis                              |
| ---------------------- | -------------------------- | --------------------------------- |
| `PORT`                 | `20128`                    | Port poslužitelja                 |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`   | Osnovni URL za sučelje            |
| `JWT_SECRET`           | (generirajte iznad)        | Tajni ključ za potpisivanje JWT-a |
| `INITIAL_PASSWORD`     | `CHANGEME`                 | Lozinka za prvu prijavu           |
| `APP_LOG_LEVEL`        | `info`                     | Razina opširnosti zapisnika       |

### Postavke nadzorne ploče

Nadzorna ploča pruža kontrole korisničkog sučelja za značajke koje se također mogu konfigurirati putem varijabli okruženja:

| Lokacija postavke   | Kontrola                            | Opis                                                       |
| ------------------- | ----------------------------------- | ---------------------------------------------------------- |
| Postavke → Napredno | Način rada za otklanjanje pogrešaka | Omogućuje zapisnike zahtjeva za otklanjanje pogrešaka (UI) |
| Postavke → Općenito | Vidljivost bočne trake              | Prikazuje/skriva odjeljke bočne trake                      |

Te se postavke pohranjuju u bazu podataka i zadržavaju nakon ponovnih pokretanja, pri čemu, ako su postavljene, nadjačavaju zadane vrijednosti varijabli okruženja.

### Lokalno pokretanje

```bash
# Razvojni način rada (automatsko ponovno učitavanje)
npm run dev

# Produkcijska izgradnja
npm run build    # next build → .build/next/, zatim assembleStandalone → dist/
npm run start

# Brzo kompajliranje samo pozadinskog sustava/API-ja za izmjene suradnika
npm run build:contributor

# Izgradnja izdanja (čista ponovna izgradnja + kontrolna oznaka HEAD — obavezno za implementaciju)
npm run build:release   # rm -rf .build dist && izgradnja + zapisuje dist/BUILD_SHA

# Uobičajena konfiguracija porta
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Izgradnja za suradnike provodi samo provjeru kompajliranjem: ne sastavlja samostalnu
distribuciju niti izrađuje dodatne nativne resurse za pakiranje. Upotrijebite uobičajenu produkcijsku izgradnju kada
trebate provjeriti paket spreman za isporuku.

### Raspored izlaznih datoteka izgradnje

| Direktorij | Sadržaj                                                                                | Prati se |
| ---------- | -------------------------------------------------------------------------------------- | -------- |
| `src/`     | Izvorni kod aplikacije (TypeScript / TSX)                                              | Da       |
| `.build/`  | Međurezultati — izlaz naredbe `next build` (zanemaren u Gitu, `distDir = .build/next`) | Ne       |
| `dist/`    | Paket spreman za isporuku — sastavlja ga `assembleStandalone` (zanemaren u Gitu)       | Ne       |

Proces izgradnje odvija se u jednom prolazu:

```
npm run build
  └─ next build → .build/next/standalone  (izlaz alata Next.js)
  └─ assembleStandalone()                 (kopira samostalnu verziju + statičke + javne + nativne resurse)
       └─ izlaz: dist/                    (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` dodatno najprije čisti oba direktorija i zapisuje
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) kao kontrolnu oznaku integriteta implementacije.

`npm run build:contributor` koristi profil izgradnje samo za pozadinski sustav. Tijekom izgradnje privremeno zamjenjuje
datoteke korisničkog sučelja nadzorne ploče pomoćnim datotekama, zadržava rukovatelje API ruta i vraća izvorne datoteke
nakon izgradnje. Upotrijebite `npm run build` za izmjene koje utječu na korisničko sučelje nadzorne ploče ili za potpunu
provjeru izdanja; profil za suradnike nije zamjena za izgradnju izdanja.

> **Napomena o implementaciji na VPS-u:** udaljeni direktorij slike `/usr/lib/node_modules/omniroute/app/`
> ostaje nepromijenjen. Postupci implementacije pomoću alata rsync sinkroniziraju sadržaj direktorija `dist/` s njim.
> Promijenjena je samo putanja izlaza izgradnje unutar repozitorija (`app/` → `dist/`).

Zadani URL-ovi:

- **Nadzorna ploča**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git Radni Tijek

> ⚠️ **NIKAD ne commita direktno na `main`.** Uvijek koristite feature grane.
>
> **Baza PR-a:** ciljajte na aktivnu `release/vX.Y.Z` granu (ne `main`). Pogledajte
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) za model jedne release grane po izdanju + označavanja pri isporuci.

```bash
# Granaj od aktivnog vrha release grane (primjer: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... unesite izmjene ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Otvorite Pull Request s bazom = release/v3.8.49
```

### Imenovanje Grana

| Prefiks     | Svrha                      |
| ----------- | -------------------------- |
| `feat/`     | Nove funkcionalnosti       |
| `fix/`      | Ispravci grešaka           |
| `refactor/` | Restrukturiranje koda      |
| `docs/`     | Izmjene dokumentacije      |
| `test/`     | Dodavanje/ispravci testova |
| `chore/`    | Alati, CI, ovisnosti       |

### Poruke Commita

Slijedite [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Opsezi (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Pokretanje testova

```bash
# Svi testovi (jedinični + vitest + ekosustav + e2e)
npm run test:all

# Jedna testna datoteka (izvorni pokretač testova za Node.js — većina testova koristi njega)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Samo jedinični testovi na koje utječe vaša promjena (isti TIA selektor kao na CI kontrolnoj točki, #8084)
npm run test:scoped            # promjene u posljednjem commitu (ili radnom stablu)
npm run test:scoped:staged     # samo pripremljene promjene — dobro se uklapa s pokretanjem prije commita
npm run test:scoped:full       # prvo ponovno izgradite mapu grafa uvoza (nakon dodavanja/premještanja datoteka)
# Izlaz 1 + "pokrenite cijeli skup" znači da se promijenila središnja datoteka (tsconfig, package.json, …) ili
# nemapirani izvor — selektor radi sigurno i nikada ništa prešutno ne preskače.

# Vitest (MCP poslužitelj, autoCombo, predmemorija)
npm run test:vitest

# E2E testovi (zahtijeva Playwright)
npm run test:e2e

# E2E klijenata protokola (MCP prijenosi, A2A)
npm run test:protocols:e2e

# Testovi kompatibilnosti ekosustava
npm run test:ecosystem

# Prag pokrivenosti: 60% naredbi/redaka/funkcija/grana
npm run test:coverage
npm run coverage:report

# Provjera lintanja + formatiranja
npm run lint
npm run check

# Kontrolirani osnovni test stvarnih vanjskih sustava za combo (zahtijeva pristup VPS-u + stvarne kredite pružatelja)
# Pristupa STVARNIM pružateljima — stvara mali trošak. NIKADA se ne pokreće u CI-ju. Uredno se preskače bez kontrolne zastavice.
# Potrebno: pristup ssh root@192.168.0.15 (učitava snimku baze podataka samo za čitanje s VPS-a).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Aktivni VPS osnovni test 3. faze — obične Node ESM skripte izravno pristupaju aktivnom .15 poslužitelju.
# Zahtijeva: pristup ssh root@192.168.0.15 (combo konfiguracije stvaraju se/uklanjaju putem SSH sqlitea).
# Pristupa STVARNIM pružateljima (mali trošak). Stvara/briše samo combo konfiguracije __live_test__*. NIKADA se ne pokreće u CI-ju.
# Na .15 je REQUIRE_API_KEY=false pa API ključ nije potreban, ali poštuje COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY ako su postavljeni.
npm run test:combo:live:vps              # 7 HTTP scenarija (prioritet/kružno raspoređivanje/ponderirano/trošak/fuzija/automatski + stanje)
npm run test:combo:live:vps:failover     # dodaje stvarni scenarij prebacivanja između pružatelja (ukupno 8)
```

Napomene o pokrivenosti:

- `npm run test:coverage` mjeri pokrivenost izvornog koda za glavni skup jediničnih testova, izuzima `tests/**` i uključuje `open-sse/**`
- Zahtjevi za spajanje moraju održavati prag pokrivenosti od **60%+** za naredbe/retke/funkcije/grane
- Ako PR mijenja produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/`, u istom PR-u mora dodati ili ažurirati automatizirane testove
- `npm run coverage:report` ispisuje detaljno izvješće za svaku datoteku iz posljednjeg pokretanja pokrivenosti
- `npm run test:coverage:legacy` zadržava stariju metriku radi povijesne usporedbe
- Pogledajte `docs/ops/COVERAGE_PLAN.md` za fazni plan poboljšanja pokrivenosti

### Zahtjevi za zahtjev za spajanje

Prije otvaranja PR-a upotrijebite
[Zlatni put za doprinošenje](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) kako biste pokrenuli usredotočeni ciklus za
ono što ste promijenili. Za cijeli skup jediničnih testova (4 CI segmenta), Vitest, prag pokrivenosti od **60%+** i
produkcijsku izgradnju odgovoran je CI — njihovo lokalno pokretanje ne pruža dodatne informacije koje vam
provjere PR-a već neće dati, a na slabijim računalima može preopteretiti sustav (#8084):

- Pokrenite testne datoteke koje pokrivaju vašu promjenu: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Pokrenite `npm run lint`
- Dodajte ili ažurirajte automatizirane testove u istom PR-u kad god se promijeni produkcijski kod
- U datotekama `node:test` postavite svaki `await` najviše razine (kao što je `await import(...)`) prije prvog `test()` / `describe()`: uz `--test-force-exit`, testovi registrirani nakon njega mogu se prešutno uopće ne pokrenuti (#18045; provodi se naredbom `npm run check:test-tla-order`)
- Kada se promijeni produkcijski kod, u opis PR-a uključite promijenjene ili dodane testne datoteke
- Provjerite rezultat SonarQubea na PR-u kada su tajne projekta konfigurirane u CI-ju

Trenutačno stanje testova: **122 datoteke jediničnih testova** koje pokrivaju:

- Prevoditelje pružatelja i pretvorbu formata
- Ograničavanje brzine, prekidač strujnog kruga i otpornost
- Semantičku predmemoriju, idempotentnost i praćenje napretka
- Operacije baze podataka i shemu (21 modul baze podataka)
- OAuth tokove i autentifikaciju
- Validaciju krajnjih točaka API-ja (Zod v4)
- Alate MCP poslužitelja i provedbu opsega
- Sustave memorije i vještina

---

## Stil koda

- **ESLint** — Pokrenite `npm run lint` prije commitanja
- **Prettier** — Automatsko formatiranje putem `lint-staged` pri commitu (2 razmaka, točka-zarez, dvostruki navodnici, širina 100 znakova, es5 trailing zarezi)
- **TypeScript** — Sav kôd u `src/` koristi `.ts`/`.tsx`; `open-sse/` koristi `.ts`/`.js`; dokumentirajte uz TSDoc (`@param`, `@returns`, `@throws`)
- **Bez `eval()`** — ESLint provodi `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod validacija** — Koristite Zod v4 sheme za svu validaciju API ulaznih podataka
- **Imenovanje**: Datoteke = camelCase/kebab-case, komponente = PascalCase, konstante = UPPER_SNAKE

### Rukovanje greškama / prazni catch blokovi

Nikada ne ostavljajte `catch` bez objašnjenja. Svrstajte ga u jednu od dvije kategorije (operacionalizira
strogo pravilo "nikada tiho ne gutajte greške u SSE streamovima"):

- **Namjerno (naše vlastito cleanup/telemetrija prema najboljim mogućnostima)** — neuspjeh ovdje je očekivan i
  bezopasan; dodajte jednolinirani komentar s obrazloženjem, bez logiranja (logiranje na svakom zahtjevu je
  buka koju ova konvencija izbjegava).

  ```ts
  } catch {} // zatvaranje već zatvorenog controllera nakon prekida veze s klijentom je očekivano
  ```

- **Treba logirati (vanjski/kod koji daje pozivatelj, ili gutanje mijenja kontrolni tok)** — zadržite
  catch (nikada ne dopustite da prekine stream) ali emitirajte kontekstualni `console.debug`/`warn` kako bi
  neuspjeh bio otkriven.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Pogledajte `open-sse/utils/stream.ts` i `open-sse/utils/streamHandler.ts` za primijenjene primjere.

---

## Struktura projekta

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Stranice nadzorne ploče (23 odjeljka)
│   ├── api/                # API rute (51 direktorij)
│   └── login/              # Stranice za autentifikaciju (.tsx)
├── domain/                 # Mehanizam pravila (policyEngine, comboResolver, costRules itd.)
├── lib/                    # Temeljna poslovna logika (.ts)
│   ├── a2a/                # Poslužitelj protokola Agent-to-Agent v0.3
│   ├── acp/                # Registar protokola Agent Communication Protocol
│   ├── compliance/         # Mehanizam pravila usklađenosti
│   ├── db/                 # SQLite domenski moduli + 130 migracija
│   ├── memory/             # Trajna konverzacijska memorija
│   ├── oauth/              # OAuth pružatelji, servisi i pomoćni alati
│   ├── skills/             # Proširivi okvir vještina
│   ├── usage/              # Praćenje upotrebe i izračun troškova
│   └── localDb.ts          # Samo sloj za ponovni izvoz — ovdje nikada nemojte dodavati logiku
├── middleware/              # Posrednički softver zahtjeva (promptInjectionGuard)
├── mitm/                   # MITM proxy (certifikat, DNS, usmjeravanje prema odredištu)
├── shared/
│   ├── components/         # React komponente (.tsx)
│   ├── constants/          # Definicije pružatelja (329), MCP opsezi, 20 strategija usmjeravanja
│   ├── utils/              # Prekidač strujnog kruga, alat za sanitizaciju, pomoćni alati za autentifikaciju
│   └── validation/         # Zod v4 sheme
└── sse/                    # SSE proxy cjevovod

open-sse/                   # @omniroute/open-sse radni prostor
├── executors/              # 150 modula izvršitelja (klase izvršitelja + pomoćni alati po pružatelju)
├── handlers/               # 11 rukovatelja zahtjevima (razgovor, odgovori, ugradnje, slike itd.)
├── mcp-server/             # MCP poslužitelj (110 jedinstvenih alata, 3 transporta, 33 opsega)
├── services/               # 178 servisa najviše razine (combo, autoCombo, rateLimitManager itd.)
├── translator/             # Prevoditelji formata (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Transformator Responses API-ja
└── utils/                  # 22 pomoćna modula (tok, TLS, proxy, zapisivanje)

electron/                   # Electron aplikacija za stolna računala (višeplatformska)

tests/
├── unit/                   # Node.js pokretač testova (1.574 datoteke testova)
├── integration/            # Integracijski testovi
├── e2e/                    # Playwright testovi
├── security/               # Sigurnosni testovi
├── translator/             # Testovi specifični za prevoditelj
└── load/                   # Testovi opterećenja

docs/
├── adr/                     # Zapisi o arhitektonskim odlukama
├── architecture/            # Arhitektura sustava i otpornost
├── comparison/              # OmniRoute u usporedbi s alternativama
├── compression/             # Vodiči i pravila za kompresiju
├── dev/                     # Vodiči za razvoj
├── diagrams/                # Arhitektonski dijagrami
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Korisnički vodič, Docker, postavljanje, rješavanje problema
├── i18n/                    # Internacionalizirani prijevodi README-a
├── marketing/               # Marketinški materijali
├── ops/                     # Implementacija, proxy, pokrivenost, izdanja
├── providers/               # Dokumentacija specifična za pružatelje
├── reference/               # Referenca API-ja, varijable okruženja, CLI alati, besplatne razine
├── releases/                # Napomene uz izdanja
├── routing/                 # Mehanizam automatskog kombiniranja, ponovna reprodukcija zaključivanja
├── screenshots/             # Snimke zaslona nadzorne ploče
├── security/                # Zaštitne mjere, usklađenost, prikrivanje, tokeni
└── specs/                   # Specifikacije dizajna
```

---

## Dodavanje Novog Pružatelja Usluge

### Korak 1: Registracija Konstanti Pružatelja

Dodajte u `src/shared/constants/providers.ts` — Zod-validacija se izvodi pri učitavanju modula.

### Korak 2: Dodavanje Izvršitelja (ako je potrebna prilagođena logika)

Stvorite izvršitelja u `open-sse/executors/your-provider.ts` nasljeđivanjem baznog izvršitelja.

### Korak 3: Dodavanje Prevoditelja (ako format nije OpenAI)

Stvorite prevoditelje zahtjeva/odgovora u `open-sse/translator/`.

### Korak 4: Dodavanje OAuth Konfiguracije (ako se temelji na OAuth-u)

Dodajte OAuth vjerodajnice u `src/lib/oauth/constants/oauth.ts` i uslugu u `src/lib/oauth/services/`.

Ako uzvodni pružatelj usluge distribuira javni OAuth `client_id`/tajnu ili Firebase Web API ključ unutar svog javnog CLI-ja / bundle-a za preglednik, **nemojte** ga ugraditi kao string literal. Koristite `resolvePublicCred()` iz `open-sse/utils/publicCreds.ts` i dodajte maskirani unos bajtova u `EMBEDDED_DEFAULTS`. Cjelokupni obavezni tijek rada dokumentiran je u [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Unutar handlera/izvršitelja, poruke o pogreškama koje dospijevaju do klijenta moraju proći kroz `buildErrorBody()` / `sanitizeErrorMessage()` iz `open-sse/utils/error.ts` — nikada ne stavljajte sirovi `err.stack` ili `err.message` u tijelo odgovora (Response body). Pogledajte [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Korak 5: Registracija Modela

Dodajte definicije modela u `open-sse/config/providerRegistry.ts`.

### Korak 6: Dodavanje Testova

Napišite jedinične testove u `tests/unit/` koji pokrivaju minimalno:

- Registraciju pružatelja usluge
- Prevođenje zahtjeva/odgovora
- Rukovanje pogreškama

---

## Kontrolni popis za Pull Request

- [ ] Testovi prolaze (`npm test`)
- [ ] Linting prolazi (`npm run lint`)
- [ ] Izgradnja je uspješna (`npm run build`)
- [ ] Dodani su TypeScript tipovi za nove javne funkcije i sučelja
- [ ] Nema tvrdo kodiranih tajni ni pričuvnih vrijednosti
- [ ] Javne vjerodajnice uzvodnih sustava ugrađene su putem `resolvePublicCred()` (pogledajte [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), nikada kao literali
- [ ] Odgovori o pogreškama prolaze kroz `buildErrorBody()` / `sanitizeErrorMessage()` — nema neobrađenih tragova stoga u tijelima odgovora (pogledajte [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Naredbe ljuske (`exec` / `spawn`) prosljeđuju vrijednosti tijekom izvođenja putem `env`, a ne interpolacijom niza
- [ ] Svi su ulazni podaci validirani Zod shemama
- [ ] **Fragment** dnevnika promjena dodan je u `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` za promjene vidljive korisnicima (pogledajte [`changelog.d/README.md`](./changelog.d/README.md)) — **nemojte** izravno uređivati `CHANGELOG.md`; fragmenti se objedinjuju pri objavi izdanja i nikada ne uzrokuju sukobe među PR-ovima
- [ ] Dokumentacija je ažurirana (ako je primjenjivo)
- [ ] Nisu otvorena nova upozorenja alata CodeQL / Secret-Scanning ili je svako odbačeno uz tehničko obrazloženje koje upućuje na relevantni dokument u `docs/security/`
- [ ] Rute koje pokreću podređene procese (`/api/mcp/`, `/api/cli-tools/runtime/`) klasificirane su kao `isLocalOnlyPath()` u `src/server/authz/routeGuard.ts` — pogledajte [Strogo pravilo #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Nema AI/bot najavnih redaka `Co-authored-by` u porukama predaje (Strogo pravilo #16) — ljudskim suradnicima čiji se rad ponovno koristi odaje se priznanje standardnim najavnim redcima `Co-authored-by: Name <email>`

---

## Objavljivanje

Objavama se upravlja putem tijeka rada `/generate-release`. Kada se stvori novo GitHub izdanje, paket se **automatski objavljuje na npm** putem GitHub Actions.

Za VPS deploy, koristite `npm run build:release` (ne `npm run build`) — izvodi čisto
ponovno izgradnju, sastavlja paket u `dist/` i zapisuje sentinel datoteku `dist/BUILD_SHA`.
Zatim koristite vještine `/deploy-vps-*-cc` koje rsync-aju `dist/` u udaljeni direktorij `app/`.

---

## Dobivanje pomoći

- **Arhitektura**: Pogledajte [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Referenca API-ja**: Pogledajte [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Sigurnosna dokumentacija**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Operativna dokumentacija**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemi**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
