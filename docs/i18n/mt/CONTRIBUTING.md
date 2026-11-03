# Contributing to OmniRoute (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Grazzi tal-interess tiegħek li tikkontribwixxi! Din il-gwida tkopri dak kollu li għandek bżonn biex tibda.

Għall-fluss tax-xogħol uffiċjali għal kull bidla, ibda bil-
[Proċess Ideali għall-Kontribuzzjonijiet](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Dan jorbot il-bidliet fil-fornituri, fir-routing,
fl-UI/UX, fl-i18n, fis-CLI, fid-database, u fil-bini/implimentazzjoni mal-kuntratti tagħhom, mat-testijiet immirati, mal-kopertura tas-CI,
u mal-passi ta' rikonċiljazzjoni.

---

## Konfigurazzjoni tal-Iżvilupp

### Prerekwiżiti

- **Node.js** `>=22.22.2 <23`, jew `>=24.0.0 <27` (rakkomandat: 24 LTS)
- **npm** 10+

> **Utenti ta' npm v11+ (Node 24+):** Wara `npm install`, ivverifika li l-moduli nattivi ġew installati:
> `node -e "require('better-sqlite3')"`. Jekk ifalli b'`MODULE_NOT_FOUND`,
> ħaddem `npm approve-scripts better-sqlite3 && npm install`. Ara
> [Soluzzjoni tal-Problemi](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Ikklona u Installa

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Varjabbli tal-Ambjent

```bash
# Oħloq il-fajl .env tiegħek mill-mudell
cp .env.example .env

# Iġġenera s-sigrieti meħtieġa
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Varjabbli ewlenin għall-iżvilupp:

| Varjabbli              | Valur Predefinit tal-Iżvilupp | Deskrizzjoni                    |
| ---------------------- | ----------------------------- | ------------------------------- |
| `PORT`                 | `20128`                       | Port tas-server                 |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`      | URL bażi għall-frontend         |
| `JWT_SECRET`           | (iġġenera hawn fuq)           | Sigriet għall-iffirmar tal-JWT  |
| `INITIAL_PASSWORD`     | `CHANGEME`                    | Password tal-ewwel login        |
| `APP_LOG_LEVEL`        | `info`                        | Livell ta' dettall tar-reġistru |

### Settings tad-Dashboard

Id-dashboard jipprovdi kontrolli fl-UI għal funzjonalitajiet li jistgħu jiġu kkonfigurati wkoll permezz tal-varjabbli tal-ambjent:

| Post tas-Setting     | Kontroll                         | Deskrizzjoni                                 |
| -------------------- | -------------------------------- | -------------------------------------------- |
| Settings → Avvanzati | Modalità ta' Debug               | Attiva r-reġistri tat-talbiet tad-debug (UI) |
| Settings → Ġenerali  | Viżibbiltà tal-Istrixxa tal-Ġenb | Uri/aħbi t-taqsimiet tal-istrixxa tal-ġenb   |

Dawn is-settings jinħażnu fid-database u jibqgħu fis-seħħ bejn startjar mill-ġdid, filwaqt li jieħdu preċedenza fuq il-valuri predefiniti tal-varjabbli tal-ambjent meta jkunu ssettjati.

### Tħaddim Lokalment

```bash
# Modalità tal-iżvilupp (rikarigu awtomatiku)
npm run dev

# Build tal-produzzjoni
npm run build    # next build → .build/next/ imbagħad assembleStandalone → dist/
npm run start

# Kompilazzjoni rapida tal-backend/API biss għal bidliet mill-kontributuri
npm run build:contributor

# Build tar-rilaxx (build mill-ġdid nadif + sentinella HEAD — meħtieġ għad-deployment)
npm run build:release   # rm -rf .build dist && build + jikteb dist/BUILD_SHA

# Konfigurazzjoni komuni tal-port
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Il-build tal-kontributur iwettaq validazzjoni permezz tal-kompilazzjoni biss: ma jiġborx id-distribuzzjoni
standalone u lanqas jibni l-assi fakultattivi tal-ippakkjar nattiv. Uża l-build regolari tal-produzzjoni meta
jkollok bżonn tivvalida l-pakkett lest għad-distribuzzjoni.

### Struttura tal-Output tal-Build

| Direttorju | Kontenut                                                                         | Traċċat |
| ---------- | -------------------------------------------------------------------------------- | ------- |
| `src/`     | Kodiċi sors tal-applikazzjoni (TypeScript / TSX)                                 | Iva     |
| `.build/`  | Fajls intermedji — output ta' `next build` (gitignored, `distDir = .build/next`) | Le      |
| `dist/`    | Pakkett lest għad-distribuzzjoni — miġbur minn `assembleStandalone` (gitignored) | Le      |

Il-pipeline tal-build jitwettaq f'pass wieħed:

```
npm run build
  └─ next build → .build/next/standalone  (output ta' Next.js)
  └─ assembleStandalone()                 (jikkopja standalone + static + public + assi nattivi)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` barra minn hekk inaddaf iż-żewġ direttorji l-ewwel u jikteb
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) bħala sentinella tal-integrità tad-deployment.

`npm run build:contributor` juża l-profil tal-build tal-backend biss. Huwa jissostitwixxi temporanjament
il-fajls tal-UI tad-dashboard b'verżjonijiet stub waqt il-build, iżomm il-handlers tar-rotot tal-API, u jirrestawra l-fajls oriġinali
wara l-build. Uża `npm run build` għal bidliet li jaffettwaw l-UI tad-dashboard jew għal
validazzjoni sħiħa tar-rilaxx; il-profil tal-kontributur mhuwiex sostitut għall-build tar-rilaxx.

> **Nota dwar deployment fuq VPS:** id-direttorju remot tal-image `/usr/lib/node_modules/omniroute/app/`
> ma nbidilx. Il-mekkaniżmi tad-deployment jużaw rsync biex jikkopjaw fih il-kontenut ta' `dist/`.
> Inbidlet biss il-mogħdija tal-output tal-build fir-repożitorju (`app/` → `dist/`).

URLs predefiniti:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Flux ta' Git

> ⚠️ **QATT ma tcommetti direttament għal `main`.** Uża daqsbranches ta' features.
>
> **Base tal-PR:** targetta l-`release/vX.Y.Z` attiva (mhux `main`). Ara
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) għall-
> modell release-per-branch + tag-at-ship.

```bash
# Branch mill-punt release attiv (eżempju: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... agħmel bidla ...
git commit -m "feat: deskrivi l-bidla tiegħek"
git push -u origin feat/your-feature-name
# Iftah Pull Request b'base = release/v3.8.49
```

### Konvenzjoni ta' Isem tal-Branch

| Prefix      | Skop                             |
| ----------- | -------------------------------- |
| `feat/`     | Features ġodda                   |
| `fix/`      | Fixes ta' bugs                   |
| `refactor/` | Restrutturazzjoni tal-kod        |
| `docs/`     | Bidliet fid-dokumentazzjoni      |
| `test/`     | Aġġornamenti/fixes tat-testijiet |
| `chore/`    | Tooling, CI, dipendenzi          |

### Messaggi ta' Commit

Sewi [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Tħaddim tat-Testijiet

```bash
# It-testijiet kollha (unit + vitest + ecosystem + e2e)
npm run test:all

# Fajl wieħed tat-testijiet (runner nattiv tat-testijiet ta’ Node.js — il-biċċa l-kbira tat-testijiet jużaw dan)
node --import tsx/esm --test tests/unit/your-file.test.ts

# It-testijiet unit biss affettwati mill-bidla tiegħek (l-istess selettur TIA bħall-kontroll tas-CI, #8084)
npm run test:scoped            # bidliet fl-aħħar commit (jew fis-siġra tax-xogħol)
npm run test:scoped:staged     # bidliet staged biss — jaħdem tajjeb ma’ tħaddim pre-commit
npm run test:scoped:full       # l-ewwel ibni mill-ġdid il-mappa tal-graff tal-importazzjonijiet (wara li żżid/iċċaqlaq fajls)
# Exit 1 + "run the full suite" tfisser li nbidel fajl ċentrali (tsconfig, package.json, …) jew
# sors mhux immappjat — is-selettur ifalli b’mod sikur u qatt ma jaqbeż testijiet fis-skiet.

# Vitest (server MCP, autoCombo, cache)
npm run test:vitest

# Testijiet E2E (jeħtieġu Playwright)
npm run test:e2e

# E2E tal-klijenti tal-protokoll (trasporti MCP, A2A)
npm run test:protocols:e2e

# Testijiet tal-kompatibbiltà tal-ekosistema
npm run test:ecosystem

# Limitu tal-kopertura: 60% dikjarazzjonijiet/linji/funzjonijiet/fergħat
npm run test:coverage
npm run coverage:report

# Kontroll tal-lint + format
npm run lint
npm run check

# Smoke test combo reali kkontrollat fuq upstream (jeħtieġ aċċess għall-VPS + krediti reali tal-fornitur)
# Jaċċessa fornituri REALI — jiswa ftit. QATT ma jitħaddem fis-CI. Jinqabeż b’mod nadif mingħajr il-kontroll.
# Jeħtieġ: aċċess ssh root@192.168.0.15 (juża snapshot read-only tad-DB mill-VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Smoke test live tal-VPS tal-Fażi 3 — skripts Node ESM sempliċi, jaċċessaw direttament is-server live .15.
# Jeħtieġ: aċċess ssh root@192.168.0.15 (il-combos jinħolqu/jitneħħew permezz ta’ SSH sqlite).
# Jaċċessa fornituri REALI (spiża żgħira). Joħloq/iħassar biss combos __live_test__*. QATT ma jitħaddem fis-CI.
# REQUIRE_API_KEY=false fuq .15 għalhekk mhi meħtieġa l-ebda API key, iżda jirrispetta COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY jekk issettjati.
npm run test:combo:live:vps              # 7 xenarji HTTP (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # iżid xenarju reali ta’ failover bejn fornituri (8 b’kollox)
```

Noti dwar il-kopertura:

- `npm run test:coverage` ikejjel il-kopertura tas-sors għas-suite ewlenija tat-testijiet unit, jeskludi `tests/**`, u jinkludi `open-sse/**`
- Il-pull requests iridu jżommu l-limitu tal-kopertura ta’ **60%+** għad-dikjarazzjonijiet/linji/funzjonijiet/fergħat
- Jekk PR jibdel il-kodiċi tal-produzzjoni f’`src/`, `open-sse/`, `electron/`, jew `bin/`, irid iżid jew jaġġorna testijiet awtomatizzati fl-istess PR
- `npm run coverage:report` jistampa r-rapport dettaljat fajl b’fajl mill-aktar tħaddim reċenti tal-kopertura
- `npm run test:coverage:legacy` iżomm il-metrika l-antika għal tqabbil storiku
- Ara `docs/ops/COVERAGE_PLAN.md` għall-pjan direzzjonali gradwali għat-titjib tal-kopertura

### Rekwiżiti tal-Pull Request

Qabel tiftaħ PR, uża l-
[Proċess Rakkomandat għall-Kontribuzzjonijiet](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) biex tħaddem iċ-ċiklu ffukat għal
dak li biddilt. Is-suite sħiħa tat-testijiet unit (4 shards tas-CI), Vitest, il-limitu tal-kopertura ta’ **60%+**, u
l-build tal-produzzjoni huma r-responsabbiltà tas-CI — it-tħaddim tagħhom lokalment ma jipprovdi ebda indikazzjoni li l-kontrolli
tal-PR ma jkunux diġà se jagħtuk, u fuq magni iżgħar jista’ jgħabbi żżejjed lill-host (#8084):

- Ħaddem il-fajls tat-testijiet li jkopru l-bidla tiegħek: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Ħaddem `npm run lint`
- Inkludi jew aġġorna testijiet awtomatizzati fl-istess PR kull meta jinbidel il-kodiċi tal-produzzjoni
- Fil-fajls `node:test`, poġġi kull `await` tal-ogħla livell (bħal `await import(...)`) qabel l-ewwel `test()` / `describe()`: taħt `--test-force-exit`, testijiet irreġistrati warajh jistgħu fis-skiet qatt ma jitħaddmu (#18045; infurzat minn `npm run check:test-tla-order`)
- Inkludi l-fajls tat-testijiet mibdula jew miżjuda fid-deskrizzjoni tal-PR meta jkun inbidel il-kodiċi tal-produzzjoni
- Iċċekkja r-riżultat ta’ SonarQube fuq il-PR meta s-segreti tal-proġett ikunu kkonfigurati fis-CI

L-istatus attwali tat-testijiet: **122 fajl tat-testijiet unit** li jkopru:

- Tradutturi tal-fornituri u konverżjoni tal-format
- Limitazzjoni tar-rata, circuit breaker, u reżiljenza
- Cache semantiku, idempotenza, u traċċar tal-progress
- Operazzjonijiet tad-database u schema (21 modulu tad-DB)
- Flussi OAuth u awtentikazzjoni
- Validazzjoni tal-endpoints tal-API (Zod v4)
- Għodod tas-server MCP u infurzar tal-ambitu
- Sistemi tal-Memorja u tal-Ħiliet

---

## Stil tal-Kodiċi

- **ESLint** — Ħaddem `npm run lint` qabel ma tagħmel kummitment
- **Prettier** — Formatjar awtomatiku permezz ta' `lint-staged` fil-kummitment (spazji doppji, punti virgoli, virgoletti doppji, wisa' ta' 100 karattru, virgoli wara l-kkejk ta' l-es5)
- **TypeScript** — Kull kodiċi ta' `src/` juża `.ts`/`.tsx`; `open-sse/` juża `.ts`/`.js`; iddokumenta permezz ta' TSDoc (`@param`, `@returns`, `@throws`)
- **Ebda `eval()`** — L-ESLint jinfurza `no-eval`, `no-implied-eval`, `no-new-func`
- **Validazzjoni Zod** — Uża schemas ta' Zod v4 għal validazzjoni ta' dħul API kollha
- **Isem**: Fajls = camelCase/kebab-case, komponenti = PascalCase, kostanti = UPPER_SNAKE

### Tħaddim ta' żbalji / blokki catch vojta

Qatt tħalli `catch` mingħajr spjegazzjoni. Klassifikah f'wieħed miż-żewġ kategoriji (joperazzjonalizza l-istrett regola "qatt xwwak b'ssokkżiżzjoni silenzjuża f'xorriet SSE"):

- **Intenzjonali (it-tindif/telemetria ta' l-aħjar effort tagħna stess)** — falliment hawnhekk huwa mistenni u ħażin; żid kumment ta' spjegazzjoni ta' linja waħda, bla logging (logging fuq kull talba huwa l-istorbju li dan il-konvenzjonal jippoġġa):

  ```ts
  } catch {} // il-qbid ta' kontrollur diġà magħluq wara l-klijent jingħaqad huwa mistenni
  ```

- **Għandu jiġi logjat (kodiċi estern/mgħoti mill-issejħa, jew il-xwwak ibiddel il-kontroll)** — iżżomm il-catch (qatt tħallih jikser is-stream) iżda leġġi `console.debug`/`warn` kontestwali sabiex il-falliment jista' jiġi skopert.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Ara `open-sse/utils/stream.ts` u `open-sse/utils/streamHandler.ts` għal eżempji applikati.

---

## Struttura tal-Proġett

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # App Router ta’ Next.js 16
│   ├── (dashboard)/        # Paġni tad-dashboard (23 taqsima)
│   ├── api/                # Rotot tal-API (51 direttorju)
│   └── login/              # Paġni tal-awtentikazzjoni (.tsx)
├── domain/                 # Magna tal-politiki (policyEngine, comboResolver, costRules, eċċ.)
├── lib/                    # Loġika ewlenija tan-negozju (.ts)
│   ├── a2a/                # Server tal-protokoll Agent-to-Agent v0.3
│   ├── acp/                # Reġistru tal-Agent Communication Protocol
│   ├── compliance/         # Magna tal-politiki tal-konformità
│   ├── db/                 # Moduli tad-dominju SQLite + 130 migrazzjoni
│   ├── memory/             # Memorja persistenti tal-konversazzjonijiet
│   ├── oauth/              # Fornituri, servizzi u utilitajiet OAuth
│   ├── skills/             # Qafas estensibbli tal-ħiliet
│   ├── usage/              # Traċċar tal-użu u kalkolu tal-ispejjeż
│   └── localDb.ts          # Saff ta’ esportazzjoni mill-ġdid biss — qatt iżżid loġika hawn
├── middleware/              # Middleware tat-talbiet (promptInjectionGuard)
├── mitm/                   # Proxy MITM (ċertifikat, DNS, direzzjonar tad-destinazzjoni)
├── shared/
│   ├── components/         # Komponenti React (.tsx)
│   ├── constants/          # Definizzjonijiet tal-fornituri (329), ambiti MCP, 20 strateġija ta’ direzzjonar
│   ├── utils/              # Circuit breaker, sanitizer, għodod awżiljarji tal-awtentikazzjoni
│   └── validation/         # Skemi Zod v4
└── sse/                    # Pipeline tal-proxy SSE

open-sse/                   # Spazju tax-xogħol @omniroute/open-sse
├── executors/              # 150 modulu ta’ eżekuzzjoni (klassijiet tal-eżekuturi + għodod awżiljarji għal kull fornitur)
├── handlers/               # 11-il handler tat-talbiet (chat, responses, embeddings, images, eċċ.)
├── mcp-server/             # Server MCP (110 għodda unika, 3 trasporti, 33 ambitu)
├── services/               # 178 servizz tal-ogħla livell (combo, autoCombo, rateLimitManager, eċċ.)
├── translator/             # Tradutturi tal-formati (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Transformer tal-API Responses
└── utils/                  # 22 modulu ta’ utilità (stream, TLS, proxy, logging)

electron/                   # Applikazzjoni desktop Electron (għal diversi pjattaformi)

tests/
├── unit/                   # Runner tat-testijiet Node.js (1,574 fajl tat-testijiet)
├── integration/            # Testijiet tal-integrazzjoni
├── e2e/                    # Testijiet Playwright
├── security/               # Testijiet tas-sigurtà
├── translator/             # Testijiet speċifiċi għat-traduttur
└── load/                   # Testijiet tat-tagħbija

docs/
├── adr/                     # Rekords tad-Deċiżjonijiet Arkitettoniċi
├── architecture/            # Arkitettura u reżiljenza tas-sistema
├── comparison/              # OmniRoute kontra alternattivi
├── compression/             # Gwidi u regoli tal-kompressjoni
├── dev/                     # Gwidi tal-iżvilupp
├── diagrams/                # Dijagrammi tal-arkitettura
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Gwida għall-utent, Docker, konfigurazzjoni, soluzzjoni tal-problemi
├── i18n/                    # Traduzzjonijiet internazzjonalizzati tar-README
├── marketing/               # Materjal tal-marketing
├── ops/                     # Distribuzzjoni, proxy, kopertura, rilaxxi
├── providers/               # Dokumentazzjoni speċifika għall-fornituri
├── reference/               # Referenza tal-API, varjabbli tal-ambjent, għodod CLI, livelli bla ħlas
├── releases/                # Noti tar-rilaxx
├── routing/                 # Magna auto-combo, riproduzzjoni tar-raġunament
├── screenshots/             # Screenshots tad-dashboard
├── security/                # Salvagwardji, konformità, stealth, tokens
└── specs/                   # Speċifikazzjonijiet tad-disinn
```

---

## Ġdid tal-Foritur

### Pass 1: Irreġistra costanti tal-Foritur

Żid f'`src/shared/constants/providers.ts` — validazzjoni Zod waqt it-tniġħis tal-modulu.

### Pass 2: Żid eżekutur (jekk hemm bżonn loġika custom)

Oħloq eżekutur f'`open-sse/executors/your-provider.ts` li jestendi l-eżekutur bażi.

### Pass 3: Żid traduttur (jekk mhux il-format ta' OpenAI)

Oħloq tradutturi għat-talb/tweġiba f'`open-sse/translator/`.

### Pass 4: Żid kfigurazzjoni OAuth (jekk bbażat fuq OAuth)

Żid kredenzjali OAuth f'`src/lib/oauth/constants/oauth.ts` u s-servizz f'`src/lib/oauth/services/`.

Jekk il-foritur upstream jidistribwixxi OAuth pubbliku client_id/secret jew Firebase Web API key fil-bundle pubbliku tiegħu / CLI tal-brawżer, **tagħmilx** backup bħala literal string. Uża `resolvePublicCred()` minn `open-sse/utils/publicCreds.ts` u żid entry masquerata f'`EMBEDDED_DEFAULTS`. Il-workflow obbligatorju kollu huwa dokumentat f'[`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Fis-servizzi l-oħra, il-messaġġi ta' żball li jilħqu l-klijent iridu jgħaddu minn `buildErrorBody()` / `sanitizeErrorMessage()` minn `open-sse/utils/error.ts` — qatt tpoġġi `err.stack` jew `err.message` rwiexi f'korp tal-Response. Ara [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Pass 5: Irreġistra mudelli

Żid definizzjonijiet tal-mudell f'`open-sse/config/providerRegistry.ts`.

### Pass 6: Żid testijiet

Ikteb testijiet unitarji f'`tests/unit/` li jkopru mill-inqas:

- Reġistrazzjoni tal-foritur
- Traduzzjoni tal-biex/tweġiba
- Trattament ta' żbalji

---

## Lista ta' Kontroll tal-Pull Request

- [ ] It-testijiet jgħaddu (`npm test`)
- [ ] Il-linting jgħaddi (`npm run lint`)
- [ ] Il-build jirnexxi (`npm run build`)
- [ ] Żdiedu t-tipi TypeScript għal funzjonijiet u interfaces pubbliċi ġodda
- [ ] L-ebda sigriet jew valur ta' riżerva kkodifikat direttament
- [ ] Il-kredenzjali upstream pubbliċi huma inkorporati permezz ta' `resolvePublicCred()` (ara [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), u qatt bħala litterali
- [ ] Ir-risposti ta' żball jgħaddu minn `buildErrorBody()` / `sanitizeErrorMessage()` — l-ebda stack trace mhux ipproċessat fil-korpi tar-risposti (ara [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Il-kmandi tax-shell (`exec` / `spawn`) jgħaddu l-valuri waqt l-eżekuzzjoni permezz ta' `env`, mhux permezz ta' interpolazzjoni ta' strings
- [ ] L-inputs kollha huma vvalidati bi skemi Zod
- [ ] Żdied **framment** tal-changelog taħt `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` għal bidliet viżibbli għall-utent (ara [`changelog.d/README.md`](./changelog.d/README.md)) — teditjax `CHANGELOG.md` direttament; il-frammenti jiġu aggregati waqt ir-rilaxx u qatt ma joħolqu kunflitti bejn il-PRs
- [ ] Id-dokumentazzjoni ġiet aġġornata (jekk applikabbli)
- [ ] Ma nfetħux twissijiet ġodda ta' CodeQL / Secret-Scanning, jew kull waħda ġiet miċħuda b'ġustifikazzjoni teknika li tirreferi għad-dokument rilevanti f'`docs/security/`
- [ ] Ir-rotot li jniedu proċessi sekondarji (`/api/mcp/`, `/api/cli-tools/runtime/`) huma kklassifikati bħala `isLocalOnlyPath()` f'`src/server/authz/routeGuard.ts` — ara [Regola Stretta #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] L-ebda trailer `Co-authored-by` ta' AI/bot fil-messaġġi tal-commit (Regola Stretta #16) — il-kollaboraturi umani li x-xogħol tagħhom jerġa' jintuża jingħataw kreditu bi trailers standard `Co-authored-by: Name <email>`

---

## Rilaxjar

Ir-rilaxxijiet huma mġedda permezz tal-workflow `/generate-release`. Meta tintefa' Release ġdida fuq GitHub, il-pakkett jitwaħħal **awtomatikament fil-ħanut npm** permezz ta' GitHub Actions.

Għad-displokki VPS, uża `npm run build:release` (mhux `npm run build`) — dan jagħmel tiswif ġdid nadif, jiġbor il-bundle fid-direttorju `dist/`, u jikteb is-sentinel `dist/BUILD_SHA`. Imbagħad uża l-ħiliet `/deploy-vps-*-cc` li jużaw rsync biex iġibu `dist/` fil-direttorju `app/` ir-rimot.

---

## Kif Tikseb l-Għajnuna

- **Arkitettura**: Ara [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Referenza tal-API**: Ara [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Dokumentazzjoni tas-sigurtà**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Dokumentazzjoni tal-operazzjonijiet**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemi**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
