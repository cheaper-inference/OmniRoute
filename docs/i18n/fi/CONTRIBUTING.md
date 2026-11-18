# Contributing to OmniRoute (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Kehitysympäristön määritys

### Edellytykset

- **Node.js** `>=22.22.2 <23` tai `>=24.0.0 <27` (suositus: 24 LTS)
- **npm** 10+

> **Windows ja Node 24:** käytä nykyistä 24 LTS -korjausjulkaisua (vähintään 24.20.0).
> Aiemmat julkaisut voivat keskeyttää prosessin onnistuneiden testien jälkeen, kun `--test-force-exit` sulkee
> prosessin. Noden [Windows libuv -korjaus](https://github.com/nodejs/node/pull/61999) korjaa
> tämän ajonaikaisen kaatumisen; pidä testiväitteet ja suorittimen poistumistarkistukset käytössä.

> **npm v11+ -käyttäjät (Node 24+):** tarkista `npm install` -komennon jälkeen, että natiivimoduulit asennettiin:
> `node -e "require('better-sqlite3')"`. Jos komento epäonnistuu virheellä `MODULE_NOT_FOUND`,
> suorita `npm approve-scripts better-sqlite3 && npm install`. Katso
> [Vianmääritys](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Kloonaus ja asennus

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Ympäristömuuttujat

```bash
# Luo .env-muuttuja mallista
cp .env.example .env

# Luo vaaditut salaisuudet
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Kehityksen kannalta tärkeät muuttujat:

| Muuttuja               | Kehityksen oletusarvo       | Kuvaus                             |
| ---------------------- | --------------------------- | ---------------------------------- |
| `PORT`                 | `20128`                     | Palvelimen portti                  |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`    | Käyttöliittymän perus-URL          |
| `JWT_SECRET`           | (luo yllä olevalla tavalla) | JWT-allekirjoituksen salaisuus     |
| `INITIAL_PASSWORD`     | `CHANGEME`                  | Ensimmäisen kirjautumisen salasana |
| `APP_LOG_LEVEL`        | `info`                      | Lokien yksityiskohtaisuustaso      |

### Hallintapaneelin asetukset

Hallintapaneelissa on käyttöliittymän vaihtopainikkeita ominaisuuksille, jotka voidaan määrittää myös ympäristömuuttujilla:

| Asetuksen sijainti  | Vaihtopainike      | Kuvaus                                                      |
| ------------------- | ------------------ | ----------------------------------------------------------- |
| Settings → Advanced | Debug Mode         | Ota virheenkorjauksen pyyntölokit käyttöön (käyttöliittymä) |
| Settings → General  | Sidebar Visibility | Näytä/piilota sivupalkin osiot                              |

Nämä asetukset tallennetaan tietokantaan, ja ne säilyvät uudelleenkäynnistysten yli. Kun ne on määritetty, ne ohittavat ympäristömuuttujien oletusarvot.

### Suorittaminen paikallisesti

```bash
# Kehitystila (kuuma uudelleenlataus)
npm run dev

# Tuotantokoontiversio
npm run build    # next build → .build/next/ ja sen jälkeen assembleStandalone → dist/
npm run start

# Nopea vain taustajärjestelmän ja API:n käännös avustajien muutoksia varten
npm run build:contributor

# Julkaisukoontiversio (puhdas uudelleenkoonti + HEAD-paikkamerkki — käyttöönottoa varten pakollinen)
npm run build:release   # rm -rf .build dist ja build + kirjoittaa dist/BUILD_SHA

# Yleinen portin määritys
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Avustajakoontiversio suorittaa vain käännöksen validoinnin: se ei kokoa itsenäistä
jakelua eikä rakenna valinnaisia natiivipaketoinnin resursseja. Käytä tavallista tuotantokoontiversiota,
kun haluat validoida toimitettavan paketin.

### Koontituloksen hakemistorakenne

| Hakemisto | Sisältö                                                                           | Seurattu |
| --------- | --------------------------------------------------------------------------------- | -------- |
| `src/`    | Sovelluksen lähdekoodi (TypeScript / TSX)                                         | Kyllä    |
| `.build/` | Väliaikaistiedostot — `next build` -tulos (gitignorettu, `distDir = .build/next`) | Ei       |
| `dist/`   | Toimitettava paketti — `assembleStandalone` kokoaa sen (gitignorettu)             | Ei       |

Koontiputki on yksivaiheinen:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js-tulos)
  └─ assembleStandalone()                 (kopioi standalone + static + public + native assets)
       └─ tulos: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` tyhjentää lisäksi ensin molemmat hakemistot ja kirjoittaa
`dist/BUILD_SHA`-tiedoston (= `git rev-parse --short HEAD`) käyttöönoton eheyden paikkamerkiksi.

`npm run build:contributor` käyttää vain taustajärjestelmälle tarkoitettua koontiprofiilia. Se korvaa
hallintapaneelin käyttöliittymän tiedostot tilapäisesti koonnin ajaksi, säilyttää API-reittien käsittelijät
ja palauttaa alkuperäiset tiedostot koonnin jälkeen. Käytä `npm run build` -komentoa muutoksille, jotka
vaikuttavat hallintapaneelin käyttöliittymään, tai täydelliseen julkaisun validointiin; avustajaprofiili
ei korvaa julkaisukoontiversiota.

> **VPS-käyttöönottoa koskeva huomautus:** etäpalvelimen kuvatiedostoja sisältävä hakemisto `/usr/lib/node_modules/omniroute/app/`
> säilyy muuttumattomana. Käyttöönoton työkalut synkronoivat `dist/`-hakemiston sisällön sinne rsyncillä.
> Vain repositorion sisäinen koontituloksen polku siirrettiin (`app/` → `dist/`).

Oletus-URL-osoitteet:

- **Hallintapaneeli**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git-työnkulku

> ⚠️ **ÄLÄ KOSKAAN tee committia suoraan `main`-haaraan.** Käytä aina ominaisuushaaroja.
>
> **PR:n kohdehaara:** valitse kohteeksi aktiivinen `release/vX.Y.Z`-haara (ei `main`). Katso
> haarakohtaista julkaisua ja toimituksen yhteydessä tehtävää taggausta koskeva malli:
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md).

```bash
# Luo haara aktiivisen julkaisuhaaran uusimmasta commitista (esimerkki: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... tee muutokset ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Avaa Pull Request, jonka base = release/v3.8.49
```

### Haarojen nimeäminen

| Etuliite    | Tarkoitus                    |
| ----------- | ---------------------------- |
| `feat/`     | Uudet ominaisuudet           |
| `fix/`      | Virheenkorjaukset            |
| `refactor/` | Koodin uudelleenjärjestely   |
| `docs/`     | Dokumentaatiomuutokset       |
| `test/`     | Testien lisäykset/korjaukset |
| `chore/`    | Työkalut, CI, riippuvuudet   |

### Commit-viestit

Noudata [Conventional Commits](https://www.conventionalcommits.org/) -käytäntöä:

```
feat: lisää palveluntarjoajakutsuille circuit breaker
fix: korjaa JWT-salaisuuden validoinnin reunatapaus
docs: päivitä SECURITY.md PII-tietojen suojauksella
test: lisää havainnoitavuuden yksikkötestit
refactor(db): yhdistä nopeusrajoitustaulut
```

Kohdealueet (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Testien suorittaminen

```bash
# Kaikki testit (yksikkötestit + vitest + ekosysteemi + e2e)
npm run test:all

# Yksittäinen testitiedosto (Node.js:n oma testien suoritusohjelma — useimmat testit käyttävät tätä)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vain muutoksesi vaikutuspiirissä olevat yksikkötestit (sama TIA-valitsin kuin CI-portissa, #8084)
npm run test:scoped            # viimeisimmän committauksen (tai työhakemiston) muutokset
npm run test:scoped:staged     # vain valmistellut muutokset — sopii hyvin ennen committausta suoritettavaksi
npm run test:scoped:full       # muodosta tuontigraafikartta ensin uudelleen (tiedostojen lisäämisen/siirtämisen jälkeen)
# Poistumiskoodi 1 + "suorita koko testikokonaisuus" tarkoittaa, että keskitetty tiedosto (tsconfig, package.json, …) tai
# kartoittamaton lähdetiedosto muuttui — valitsin toimii vikatilanteessa turvallisesti eikä koskaan ohita testejä huomaamatta.

# Vitest (MCP-palvelin, autoCombo, välimuisti)
npm run test:vitest

# E2E-testit (edellyttää Playwrightia)
npm run test:e2e

# Protokolla-asiakkaiden E2E-testit (MCP-siirtotavat, A2A)
npm run test:protocols:e2e

# Ekosysteemin yhteensopivuustestit
npm run test:ecosystem

# Kattavuusportti: 60 % lauseista/riveistä/funktioista/haaroista
npm run test:coverage
npm run coverage:report

# Linttaus + muotoilun tarkistus
npm run lint
npm run check

# Portilla suojattu, todellisia upstream-palveluita käyttävä combo-savutesti (edellyttää VPS-käyttöoikeutta + todellisten palveluntarjoajien krediittejä)
# Käyttää TODELLISIA palveluntarjoajia — aiheuttaa hieman kustannuksia. EI KOSKAAN suoriteta CI:ssä. Ohitetaan siististi ilman porttia.
# Edellyttää: ssh root@192.168.0.15 -käyttöoikeus (lataa VPS:ltä vain luku -tilassa olevan tietokantavedoksen).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Vaiheen 3 VPS-savutesti tuotantoympäristössä — tavalliset Node ESM -skriptit, jotka käyttävät suoraan käytössä olevaa .15-palvelinta.
# Edellyttää: ssh root@192.168.0.15 -käyttöoikeus (combot luodaan/puretaan SSH:n kautta sqlite-tietokannassa).
# Käyttää TODELLISIA palveluntarjoajia (pieni kustannus). Luo/poistaa vain __live_test__*-comboja. EI KOSKAAN suoriteta CI:ssä.
# REQUIRE_API_KEY=false palvelimella .15, joten API-avainta ei tarvita, mutta COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY huomioidaan, jos ne on asetettu.
npm run test:combo:live:vps              # 7 HTTP-skenaariota (prioriteetti/kiertovuorottelu/painotettu/kustannus/fuusio/automaattinen + kunto)
npm run test:combo:live:vps:failover     # lisää todellisen palveluntarjoajien välisen vikasietoskenaarion (yhteensä 8)
```

Kattavuutta koskevat huomautukset:

- `npm run test:coverage` mittaa lähdekoodin kattavuuden pääasialliselle yksikkötestikokonaisuudelle, jättää pois `tests/**`-hakemiston ja sisältää `open-sse/**`-hakemiston
- Pull requestien on pidettävä kattavuusportin arvo vähintään **60 %:ssa** lauseiden/rivien/funktioiden/haarojen osalta
- Jos PR muuttaa tuotantokoodia hakemistossa `src/`, `open-sse/`, `electron/` tai `bin/`, sen on lisättävä tai päivitettävä automaattisia testejä samassa PR:ssä
- `npm run coverage:report` tulostaa viimeisimmän kattavuusajon yksityiskohtaisen tiedostokohtaisen raportin
- `npm run test:coverage:legacy` säilyttää vanhemman mittarin historiallista vertailua varten
- Katso vaiheittainen kattavuuden parannussuunnitelma tiedostosta `docs/ops/COVERAGE_PLAN.md`

### Pull requestin vaatimukset

Ennen PR:n avaamista käytä
[osallistumisen suositeltua polkua](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) suorittaaksesi kohdennetun tarkistuskierroksen
tekemillesi muutoksille. Koko yksikkötestikokonaisuus (4 CI-osiota), Vitest, **60 %+**:n kattavuusportti ja
tuotantokoonti ovat CI:n vastuulla — niiden suorittaminen paikallisesti ei anna tietoa, jota PR:n
tarkistukset eivät jo tarjoaisi, ja pienemmissä koneissa se voi kuormittaa järjestelmän äärimmilleen (#8084):

- Suorita muutoksesi kattavat testitiedostot: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Suorita `npm run lint`
- Lisää tai päivitä automaattisia testejä samassa PR:ssä aina, kun tuotantokoodi muuttuu
- Sijoita `node:test`-tiedostoissa jokainen ylätason `await` (kuten `await import(...)`) ennen ensimmäistä `test()`- / `describe()`-kutsua: `--test-force-exit`-asetusta käytettäessä sen jälkeen rekisteröidyt testit voivat jäädä huomaamatta kokonaan suorittamatta (#18045; tämän valvoo `npm run check:test-tla-order`)
- Sisällytä muuttuneet tai lisätyt testitiedostot PR:n kuvaukseen, kun tuotantokoodi muuttui
- Tarkista PR:n SonarQube-tulos, kun projektin salaisuudet on määritetty CI:ssä

Testien nykyinen tila: **122 yksikkötestitiedostoa**, jotka kattavat:

- Palveluntarjoajien muuntimet ja muotomuunnokset
- Nopeusrajoituksen, katkaisijan ja häiriönsietokyvyn
- Semanttisen välimuistin, idempotenssin ja edistymisen seurannan
- Tietokantatoiminnot ja skeeman (21 tietokantamoduulia)
- OAuth-prosessit ja todennuksen
- API-päätepisteiden validoinnin (Zod v4)
- MCP-palvelimen työkalut ja käyttöalueiden valvonnan
- Muisti- ja Skills-järjestelmät

---

## Koodityyli

- **ESLint** — Suorita `npm run lint` ennen commitointia
- **Prettier** — Muotoillaan automaattisesti `lint-staged`-työkalulla commitoinnin yhteydessä (2 välilyöntiä, puolipisteet, kaksinkertaiset lainausmerkit, 100 merkin rivinleveys, es5-tyyliset loppupilkut)
- **TypeScript** — Kaikki `src/`-koodi käyttää `.ts`/`.tsx`-tiedostoja; `open-sse/` käyttää `.ts`/`.js`-tiedostoja; dokumentoi TSDocilla (`@param`, `@returns`, `@throws`)
- **Ei `eval()`-kutsuja** — ESLint pakottaa säännöt `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod-validointi** — Käytä Zod v4 -skeemoja kaiken API-syötteen validointiin
- **Nimeäminen**: Tiedostot = camelCase/kebab-case, komponentit = PascalCase, vakiot = UPPER_SNAKE

### Virheenkäsittely / tyhjät catch-lohkot

Älä koskaan jätä `catch`-lohkoa selittämättä. Luokittele se jompaankumpaan kahdesta ryhmästä (tämä tekee tiukasta säännöstä "älä koskaan niele virheitä hiljaisesti SSE-virroissa" käytännöllisen):

- **Tarkoituksellinen (oma best-effort-siivouksemme/telemetriamme)** — virhe on tässä odotettu ja
  harmiton; lisää yhden rivin perustelukommentti, älä lokita (tämä käytäntö välttää jokaisen
  pyynnön lokittamisesta aiheutuvan kohinan).

  ```ts
  } catch {} // jo suljetun ohjaimen sulkeminen asiakkaan yhteyden katkeamisen jälkeen on odotettua
  ```

- **Tulisi lokittaa (ulkoinen/kutsujan toimittama koodi tai virheen nieleminen muuttaa ohjausvirtaa)** — säilytä
  catch-lohko (älä koskaan anna sen katkaista virtaa), mutta tulosta asiayhteyden sisältävä `console.debug`/`warn`, jotta
  virhe voidaan havaita.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure-kutsun virhe:", e);
  }
  ```

Katso käytännön esimerkkejä tiedostoista `open-sse/utils/stream.ts` ja `open-sse/utils/streamHandler.ts`.

---

## Hankkeen rakenne

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

## Uuden palveluntarjoajan lisääminen

### Vaihe 1: Rekisteröi palveluntarjoajan vakiot

Lisää tiedostoon `src/shared/constants/providers.ts` — Zod validoi ne moduulin latauksen yhteydessä.

### Vaihe 2: Lisää suoritin (jos mukautettua logiikkaa tarvitaan)

Luo perussuorittimen laajentava suoritin tiedostoon `open-sse/executors/your-provider.ts`.

### Vaihe 3: Lisää muunnin (jos muoto ei ole OpenAI-yhteensopiva)

Luo pyyntö- ja vastausmuuntimet hakemistoon `open-sse/translator/`.

### Vaihe 4: Lisää OAuth-määritykset (jos OAuth-pohjainen)

Lisää OAuth-tunnistetiedot tiedostoon `src/lib/oauth/constants/oauth.ts` ja palvelu hakemistoon `src/lib/oauth/services/`.

Jos ylemmän tason palveluntarjoaja jakelee julkista OAuth client_id/secret -arvoa tai Firebase Web API -avainta julkisessa CLI-/selainpaketissaan, **älä** upota sitä merkkijonoliteraalina. Käytä `resolvePublicCred()`-funktiota tiedostosta `open-sse/utils/publicCreds.ts` ja lisää peitetty tavumerkintä `EMBEDDED_DEFAULTS`-vakioon. Täydellinen pakollinen työnkulku on dokumentoitu tiedostossa [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Käsittelijöissä/suorittimissa asiakkaalle välitettävien virheilmoitusten on kuljettava tiedoston `open-sse/utils/error.ts` `buildErrorBody()`- / `sanitizeErrorMessage()`-funktioiden kautta — älä koskaan lisää käsittelemätöntä `err.stack`- tai `err.message`-arvoa Response-runkotekstiin. Katso [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Vaihe 5: Rekisteröi mallit

Lisää mallimääritykset tiedostoon `open-sse/config/providerRegistry.ts`.

### Vaihe 6: Lisää testit

Kirjoita hakemistoon `tests/unit/` yksikkötestit, jotka kattavat vähintään seuraavat:

- Palveluntarjoajan rekisteröinti
- Pyyntöjen ja vastausten muuntaminen
- Virheenkäsittely

---

## Pull Request -tarkistuslista

- [ ] Testit läpäisevät (`npm test`)
- [ ] Linttaus läpäisee (`npm run lint`)
- [ ] Koonti onnistuu (`npm run build`)
- [ ] TypeScript-tyypit lisätty uusille julkisille funktioille ja rajapinnoille
- [ ] Ei kovakoodattuja salaisuuksia tai varmistusarvoja
- [ ] Julkiset upstream-tunnistetiedot upotettu `resolvePublicCred()`-funktion avulla (katso [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), ei koskaan literaaleina
- [ ] Virhevastaukset käsitellään `buildErrorBody()`- / `sanitizeErrorMessage()`-funktioiden kautta — vastausten sisältö ei sisällä käsittelemättömiä pinojälkiä (katso [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Komentotulkin komennot (`exec` / `spawn`) välittävät ajonaikaiset arvot `env`-muuttujan kautta, eivät merkkijonointerpolaatiolla
- [ ] Kaikki syötteet validoitu Zod-skeemoilla
- [ ] Käyttäjille näkyvistä muutoksista lisätty muutoslokin **katkelma** hakemistoon `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` (katso [`changelog.d/README.md`](./changelog.d/README.md)) — älä muokkaa `CHANGELOG.md`-tiedostoa suoraan; katkelmat yhdistetään julkaisuhetkellä, eivätkä ne koskaan aiheuta ristiriitoja PR:ien välillä
- [ ] Dokumentaatio päivitetty (tarvittaessa)
- [ ] Uusia CodeQL- tai Secret-Scanning-hälytyksiä ei ole avattu, tai jokainen niistä on kuitattu teknisellä perustelulla, jossa viitataan asianmukaiseen `docs/security/`-dokumenttiin
- [ ] Aliprosesseja käynnistävät reitit (`/api/mcp/`, `/api/cli-tools/runtime/`) luokiteltu `isLocalOnlyPath()`-funktion avulla tiedostossa `src/server/authz/routeGuard.ts` — katso [ehdoton sääntö #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Commit-viesteissä ei ole tekoäly-/bottiavustajien `Co-authored-by`-lopputunnisteita (ehdoton sääntö #16) — ihmiskollaboraattorit, joiden työtä hyödynnetään, mainitaan tavanomaisilla `Co-authored-by: Name <email>` -lopputunnisteilla

---

## Julkaiseminen

Julkaisuja hallitaan `/generate-release`-työnkulun kautta. Kun uusi GitHub-julkaisu luodaan, paketti **julkaistaan automaattisesti npm:ään** GitHub Actionsin kautta.

VPS-käyttöönottoihin käytetään komentoa `npm run build:release` (ei komentoa `npm run build`) — se suorittaa puhtaan
uudelleenkäännöksen, kokoaa paketin `dist/`-hakemistoon ja kirjoittaa `dist/BUILD_SHA`-tunnistetiedoston.
Käytä sitten `/deploy-vps-*-cc`-taitoja, jotka synkronoivat `dist/`-hakemiston rsyncillä etäpalvelimen `app/`-hakemistoon.

---

## Avun saaminen

- **Arkkitehtuuri**: Katso [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API-viite**: Katso [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Tietoturvadokumentaatio**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Ylläpitodokumentaatio**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Ongelmat**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
