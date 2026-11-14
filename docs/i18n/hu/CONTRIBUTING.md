# Contributing to OmniRoute (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Fejlesztői beállítás

### Előfeltételek

- **Node.js** `>=22.22.2 <23`, vagy `>=24.0.0 <27` (ajánlott: 24 LTS)
- **npm** 10+

> **Windows Node 24-gyel:** használja a jelenlegi 24 LTS javítókiadását (legalább 24.20.0).
> A korábbi kiadások sikeres tesztek után is leállhatnak, amikor a `--test-force-exit` bezárja a
> folyamatot. A Node [Windows libuv-javítása](https://github.com/nodejs/node/pull/61999) kezeli
> ezt a futásidejű összeomlást; hagyja engedélyezve a teszt-ellenőrzéseket és a futtató kilépési
> ellenőrzéseit.

> **npm v11+ felhasználók (Node 24+):** Az `npm install` után ellenőrizze, hogy a natív modulok
> telepítve lettek-e:
> `node -e "require('better-sqlite3')"`. Ha a parancs `MODULE_NOT_FOUND` hibával sikertelen,
> futtassa a `npm approve-scripts better-sqlite3 && npm install` parancsot. Lásd a
> [Hibaelhárítás](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module)
> oldalt.

- **Git**

### Klónozás és telepítés

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Környezeti változók

```bash
# Hozza létre a .env fájlt a sablonból
cp .env.example .env

# Generálja a szükséges titkos kulcsokat
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

A fejlesztéshez fontos változók:

| Változó                | Alapértelmezett fejlesztési érték | Leírás                           |
| ---------------------- | --------------------------------- | -------------------------------- |
| `PORT`                 | `20128`                           | A szerver portja                 |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`          | A frontend alap-URL-je           |
| `JWT_SECRET`           | (a fentiek szerint generálandó)   | A JWT-aláírás titkos kulcsa      |
| `INITIAL_PASSWORD`     | `CHANGEME`                        | Az első bejelentkezési jelszó    |
| `APP_LOG_LEVEL`        | `info`                            | A naplózás részletességi szintje |

### Irányítópult beállításai

Az irányítópult felhasználói felületi kapcsolókat biztosít az olyan funkciókhoz, amelyek
környezeti változókon keresztül is beállíthatók:

| Beállítás helye     | Kapcsoló           | Leírás                                           |
| ------------------- | ------------------ | ------------------------------------------------ |
| Settings → Advanced | Debug Mode         | Hibakeresési kérésnaplók engedélyezése (UI)      |
| Settings → General  | Sidebar Visibility | Az oldalsáv szakaszainak megjelenítése/elrejtése |

Ezek a beállítások az adatbázisban tárolódnak, és újraindítások között is megmaradnak,
ha be vannak állítva, felülírva a környezeti változók alapértelmezett értékeit.

### Helyi futtatás

```bash
# Fejlesztési mód (gyors újratöltés)
npm run dev

# Éles build
npm run build    # next build → .build/next/ majd assembleStandalone → dist/
npm run start

# Gyors, csak backend/API fordítás a közreműködői módosításokhoz
npm run build:contributor

# Kiadási build (tiszta újrafordítás + HEAD-jelző — telepítéshez kötelező)
npm run build:release   # rm -rf .build dist && build + létrehozza a dist/BUILD_SHA fájlt

# Gyakori portbeállítás
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

A közreműködői build csak fordítási ellenőrzést hajt végre: nem állítja össze az önálló
disztribúciót, és nem építi fel az opcionális natív csomagolási eszközöket. Használja a
hagyományos éles buildet, amikor a telepíthető csomagot szeretné ellenőrizni.

### A build kimenetének felépítése

| Könyvtár  | Tartalom                                                                      | Követett |
| --------- | ----------------------------------------------------------------------------- | -------- |
| `src/`    | Az alkalmazás forráskódja (TypeScript / TSX)                                  | Igen     |
| `.build/` | Köztes fájlok — a `next build` kimenete (gitignored, `distDir = .build/next`) | Nem      |
| `dist/`   | Telepíthető csomag — az `assembleStandalone` állítja össze (gitignored)       | Nem      |

A buildfolyamat egyetlen lépésből áll:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js kimenet)
  └─ assembleStandalone()                 (az önálló csomagot + statikus + nyilvános + natív eszközöket másolja)
       └─ kimenet: dist/                  (server.js, .next/static/, public/, node_modules/)
```

Az `npm run build:release` ezenfelül először törli mindkét könyvtár tartalmát, majd létrehozza a
`dist/BUILD_SHA` fájlt (= `git rev-parse --short HEAD`) telepítési integritási jelzőként.

Az `npm run build:contributor` a csak backendhez használható buildprofilt alkalmazza. A build
során ideiglenesen helyettesíti az irányítópult felhasználói felületének fájljait, megtartja
az API-útvonalak kezelőit, majd a build után visszaállítja az eredeti fájlokat. Az
irányítópult felhasználói felületét érintő módosításokhoz vagy a teljes kiadási ellenőrzéshez
használja az `npm run build` parancsot; a közreműködői profil nem helyettesíti a kiadási buildet.

> **VPS-telepítési megjegyzés:** a távoli `/usr/lib/node_modules/omniroute/app/` képfájl-könyvtár
> változatlan marad. A telepítési készségek a `dist/` tartalmát rsync segítségével másolják bele.
> Csak a repozitóriumon belüli buildkimenet útvonala változott (`app/` → `dist/`).

Alapértelmezett URL-ek:

- **Irányítópult**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git-munkafolyamat

> ⚠️ **SOHA ne commitolj közvetlenül a `main` ágra.** Mindig használj funkcióágakat.
>
> **PR alapága:** az aktív `release/vX.Y.Z` ágat célozd meg (ne a `main` ágat). Az
> ágankénti kiadás + kiadáskori címkézés modelljéről lásd:
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md).

```bash
# Hozz létre ágat az aktív kiadási ág legfrissebb állapotából (például: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... végezd el a módosításokat ...
git commit -m "feat: írd le a módosítást"
git push -u origin feat/your-feature-name
# Nyiss Pull Requestet a következő alapággal: release/v3.8.49
```

### Ágak elnevezése

| Előtag      | Cél                         |
| ----------- | --------------------------- |
| `feat/`     | Új funkciók                 |
| `fix/`      | Hibajavítások               |
| `refactor/` | A kód átszervezése          |
| `docs/`     | Dokumentáció módosításai    |
| `test/`     | Tesztek hozzáadása/javítása |
| `chore/`    | Eszközök, CI, függőségek    |

### Commitüzenetek

Kövesd a [Conventional Commits](https://www.conventionalcommits.org/) szabványt:

```
feat: áramkör-megszakító hozzáadása a szolgáltatói hívásokhoz
fix: a JWT-titok ellenőrzési peremfeltételének megoldása
docs: a SECURITY.md frissítése a PII védelmével
test: megfigyelhetőségi egységtesztek hozzáadása
refactor(db): a sebességkorlátozási táblák összevonása
```

Hatókörök (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Tesztek futtatása

```bash
# Minden teszt (egységtesztek + Vitest + ökoszisztéma + E2E)
npm run test:all

# Egyetlen tesztfájl (a Node.js natív tesztfuttatója — a legtöbb teszt ezt használja)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Csak a módosítás által érintett egységtesztek (ugyanaz a TIA-szelektor, mint a CI-kapuban, #8084)
npm run test:scoped            # az utolsó commitban (vagy a munkafában) lévő módosítások
npm run test:scoped:staged     # csak az előkészített módosítások — jól használható pre-commit futtatással
npm run test:scoped:full       # előbb újraépíti az importgráf leképezését (fájlok hozzáadása/áthelyezése után)
# Az 1-es kilépési kód + „futtassa a teljes tesztcsomagot” azt jelenti, hogy egy központi fájl (tsconfig, package.json, …) vagy egy
# leképezetlen forrás módosult — a szelektor biztonságosan hibára fut, és soha nem hagy ki semmit észrevétlenül.

# Vitest (MCP-kiszolgáló, autoCombo, gyorsítótár)
npm run test:vitest

# E2E-tesztek (Playwright szükséges)
npm run test:e2e

# Protokollkliensek E2E-tesztjei (MCP-transzportok, A2A)
npm run test:protocols:e2e

# Ökoszisztéma-kompatibilitási tesztek
npm run test:ecosystem

# Lefedettségi küszöb: 60% az utasítások/sorok/függvények/elágazások esetén
npm run test:coverage
npm run coverage:report

# Lintelés + formázás ellenőrzése
npm run lint
npm run check

# Kapuzott, valódi külső szolgáltatásokat használó combo-gyorsteszt (VPS-hozzáférést + valódi szolgáltatói krediteket igényel)
# VALÓDI szolgáltatókat hív meg — némi költséggel jár. SOHA nem fut CI-ben. A kapu nélkül szabályosan kihagyásra kerül.
# Szükséges: ssh root@192.168.0.15 hozzáférés (egy írásvédett DB-pillanatképet tölt be a VPS-ről).
RUN_COMBO_LIVE=1 npm run test:combo:live

# 3. fázisú VPS élő gyorsteszt — egyszerű Node ESM-szkriptek, közvetlenül az élő .15-ös kiszolgálót hívják meg.
# Szükséges: ssh root@192.168.0.15 hozzáférés (a combo-k létrehozása/lebontása SSH-n keresztül, sqlite használatával történik).
# VALÓDI szolgáltatókat hív meg (kis költséggel). Csak __live_test__* combo-kat hoz létre/töröl. SOHA nem fut CI-ben.
# A .15-ös gépen REQUIRE_API_KEY=false, így nincs szükség API-kulcsra, de figyelembe veszi a COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY értékét, ha be van állítva.
npm run test:combo:live:vps              # 7 HTTP-forgatókönyv (prioritásos/ciklikus/súlyozott/költség/fúzió/automatikus + állapotellenőrzés)
npm run test:combo:live:vps:failover     # hozzáad egy valódi, szolgáltatók közötti feladatátvételi forgatókönyvet (összesen 8)
```

Megjegyzések a lefedettséghez:

- Az `npm run test:coverage` a fő egységtesztcsomag forráskód-lefedettségét méri, kizárja a `tests/**` fájlokat, és tartalmazza az `open-sse/**` fájlokat
- A pull requesteknek az utasítások/sorok/függvények/elágazások lefedettségi küszöbét **60%+** értéken kell tartaniuk
- Ha egy PR módosítja az éles kódot a `src/`, `open-sse/`, `electron/` vagy `bin/` könyvtárban, ugyanabban a PR-ben automatizált teszteket is hozzá kell adni vagy frissíteni kell
- Az `npm run coverage:report` kiírja a legutóbbi lefedettségi futtatás részletes, fájlonkénti jelentését
- Az `npm run test:coverage:legacy` megőrzi a régebbi mérőszámot a korábbi eredményekkel való összehasonlításhoz
- A lefedettség fokozatos javításának ütemtervét lásd a `docs/ops/COVERAGE_PLAN.md` fájlban

### Pull requestek követelményei

PR megnyitása előtt használd a
[hozzájárulás ajánlott folyamatát](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), hogy lefuttasd a módosításaidhoz
tartozó célzott ciklust. A teljes egységtesztcsomagért (4 CI-szegmens), a Vitestért, a **60%+** lefedettségi küszöbért és
az éles buildért a CI felel — ezek helyi futtatása nem ad olyan többletinformációt, amelyet a PR
ellenőrzései ne biztosítanának, kisebb gépeken pedig teljesen leterhelheti a gazdagépet (#8084):

- Futtasd a módosításodat lefedő tesztfájlokat: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Futtasd az `npm run lint` parancsot
- Ha az éles kód módosul, ugyanabban a PR-ben adj hozzá vagy frissíts automatizált teszteket
- A `node:test` fájlokban minden legfelső szintű `await` kifejezést (például `await import(...)`) az első `test()` / `describe()` elé helyezz: a `--test-force-exit` használatakor az utána regisztrált tesztek észrevétlenül kimaradhatnak (#18045; ezt az `npm run check:test-tla-order` kényszeríti ki)
- Ha az éles kód módosult, a PR leírásában sorold fel a módosított vagy hozzáadott tesztfájlokat
- Ellenőrizd a SonarQube eredményét a PR-en, ha a projekt titkos értékei konfigurálva vannak a CI-ben

A tesztek jelenlegi állapota: **122 egységtesztfájl**, amelyek a következőket fedik le:

- Szolgáltatói fordítók és formátumkonverzió
- Sebességkorlátozás, megszakító és ellenálló képesség
- Szemantikus gyorsítótár, idempotencia, folyamatkövetés
- Adatbázis-műveletek és séma (21 DB-modul)
- OAuth-folyamatok és hitelesítés
- API-végpontok validációja (Zod v4)
- MCP-kiszolgálóeszközök és hatókör-kikényszerítés
- Memória- és Skills-rendszerek

---

## Kódstílus

- **ESLint** — Véglegesítés előtt futtasd az `npm run lint` parancsot
- **Prettier** — Véglegesítéskor a `lint-staged` automatikusan formázza (2 szóköz, pontosvesszők, dupla idézőjelek, 100 karakteres sorszélesség, es5 záróvesszők)
- **TypeScript** — A `src/` teljes kódja `.ts`/`.tsx` fájlokat használ; az `open-sse/` `.ts`/`.js` fájlokat használ; a dokumentáláshoz használj TSDoc formátumot (`@param`, `@returns`, `@throws`)
- **Tilos az `eval()`** — Az ESLint kikényszeríti a `no-eval`, `no-implied-eval`, `no-new-func` szabályokat
- **Zod-validáció** — Minden API-bemenet validálásához Zod v4 sémákat használj
- **Elnevezés**: fájlok = camelCase/kebab-case, komponensek = PascalCase, konstansok = UPPER_SNAKE

### Hibakezelés / üres catch blokkok

Soha ne hagyj egy `catch` blokkot magyarázat nélkül. Sorold be az alábbi két kategória
egyikébe (ez teszi gyakorlatban alkalmazhatóvá a „soha ne nyeld el csendben a hibákat az SSE-adatfolyamokban”
szigorú szabályt):

- **Szándékos (saját, lehetőség szerinti tisztításunk/telemetriánk)** — az itteni hiba várható és
  ártalmatlan; adj hozzá egysoros indoklást, naplózás nélkül (ez a konvenció az egyes kérésekhez
  tartozó naplózásból eredő zajt hivatott elkerülni).

  ```ts
  } catch {} // a kliens leválása után egy már lezárt vezérlő lezárása várható
  ```

- **Naplózandó (külső/hívó által megadott kód, vagy az elnyelés megváltoztatja a vezérlési folyamatot)** — tartsd
  meg a catch blokkot (soha ne engedd, hogy megszakítsa az adatfolyamot), de adj ki kontextust tartalmazó `console.debug`/`warn`
  üzenetet, hogy a hiba észlelhető legyen.

  ```ts
  } catch (e) {
    console.debug("[STREAM] hiba az onFailure visszahívásban:", e);
  }
  ```

Alkalmazott példákért lásd az `open-sse/utils/stream.ts` és az `open-sse/utils/streamHandler.ts` fájlokat.

---

## Projekt felépítése

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

## Új szolgáltató hozzáadása

### 1. lépés: A szolgáltatói konstansok regisztrálása

Adja hozzá a `src/shared/constants/providers.ts` fájlhoz — a Zod a modul betöltésekor validálja.

### 2. lépés: Végrehajtó hozzáadása (ha egyéni logika szükséges)

Hozzon létre egy, az alap-végrehajtót kiterjesztő végrehajtót az `open-sse/executors/your-provider.ts` fájlban.

### 3. lépés: Átalakító hozzáadása (ha a formátum nem OpenAI-kompatibilis)

Hozza létre a kérés- és válaszátalakítókat az `open-sse/translator/` könyvtárban.

### 4. lépés: OAuth-konfiguráció hozzáadása (OAuth-alapú szolgáltató esetén)

Adja hozzá az OAuth-hitelesítő adatokat a `src/lib/oauth/constants/oauth.ts` fájlban, a szolgáltatást pedig a `src/lib/oauth/services/` könyvtárban.

Ha a külső szolgáltató nyilvános OAuth client_id/secret értéket vagy Firebase Web API-kulcsot terjeszt a nyilvános CLI-jében/böngészős csomagjában, **ne** ágyazza be azt sztringliterálként. Használja az `open-sse/utils/publicCreds.ts` fájlban található `resolvePublicCred()` függvényt, és adjon hozzá egy maszkolt bájtbejegyzést az `EMBEDDED_DEFAULTS` elemhez. A teljes kötelező munkafolyamat dokumentációja itt található: [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

A kezelőkön/végrehajtókon belül a klienshez eljutó hibaüzeneteknek az `open-sse/utils/error.ts` fájlban található `buildErrorBody()` / `sanitizeErrorMessage()` függvényeken kell áthaladniuk — soha ne helyezze a nyers `err.stack` vagy `err.message` értéket egy Response törzsébe. Lásd: [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### 5. lépés: Modellek regisztrálása

Adja hozzá a modelldefiníciókat az `open-sse/config/providerRegistry.ts` fájlban.

### 6. lépés: Tesztek hozzáadása

Írjon egységteszteket a `tests/unit/` könyvtárban, amelyek legalább a következőket lefedik:

- A szolgáltató regisztrációja
- A kérések/válaszok átalakítása
- Hibakezelés

---

## Húzza le a kérés ellenőrzőlistáját

- [ ] A tesztek sikeresek (`npm test`)
- [ ] Linting bérletek (`npm run lint`)
- [ ] Az építés sikeres (`npm run build`)
- [ ] TypeScript típusok hozzáadva az új nyilvános funkciókhoz és interfészekhez
- [ ] Nincsenek kódolt titkok vagy tartalék értékek
- [ ] Nyilvános upstream hitelesítő adatok beágyazva `resolvePublicCred()` keresztül (lásd [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ), soha nem literálként
- [ ] A hibaválaszok `buildErrorBody()` / `sanitizeErrorMessage()` keresztül haladnak — nincs nyers veremnyom a választestekben (lásd: [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) )
- [ ] A shell parancsok (`exec` / `spawn`) a futásidejű értékeket `env` keresztül adják át , nem karakterlánc interpoláción keresztül
- [ ] Minden bemenet Zod sémákkal érvényesítve
- [ ] Változásnapló** töredék** hozzáadva `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` alatt a felhasználót érintő változtatásokhoz (lásd [`changelog.d/README.md`](./changelog.d/README.md) ) — do** nem** `CHANGELOG.md` közvetlen szerkesztése; A töredékek a kiadás időpontjában összegyűlnek, és soha nem ütköznek PRs között
- [ ] A dokumentáció frissítve (ha van)
- [ ] Nem nyitottak meg új CodeQL / Secret-Scanning riasztásokat, és nem utasítottak el egyet sem a megfelelő `docs/security/` dokumentumra hivatkozó technikai indoklással
- [ ] Útvonalak , amelyek gyermekfolyamatokat (`/api/mcp/`, `/api/cli-tools/runtime/`) hoznak létre , amelyek `isLocalOnlyPath()` ként vannak besorolva `src/server/authz/routeGuard.ts` — ben lásd [#15 kemény szabályt](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Nincsenek AI/bot `Co-authored-by` trailerek a véglegesítési üzenetekben (Hard Rule #16) — emberi munkatársak, akiknek munkáját újrafelhasználják, szabványos `Co-authored-by: Name <email>` előzeteseket kapnak

---

## Kiadás

A kiadások kezelése a `/generate-release` munkafolyamaton keresztül történik. Új GitHub Release létrehozásakor a csomag a GitHub Actions segítségével **automatikusan közzétételre kerül az npm-en**.

VPS-telepítésekhez az `npm run build:release` parancsot használja (ne az `npm run build` parancsot) — ez tiszta
újrafordítást végez, összeállítja a csomagot a `dist/` könyvtárban, és létrehozza a `dist/BUILD_SHA` jelzőfájlt.
Ezután használja a `/deploy-vps-*-cc` készségeket, amelyek az rsync segítségével szinkronizálják a `dist/` tartalmát a távoli `app/` könyvtárba.

---

## Segítségkérés

- **Architektúra**: Lásd: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API-referencia**: Lásd: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Biztonsági dokumentáció**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Üzemeltetési dokumentáció**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Hibajegyek**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
