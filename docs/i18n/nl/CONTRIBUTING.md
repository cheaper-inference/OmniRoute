# Contributing to OmniRoute (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Ontwikkelomgeving instellen

### Vereisten

- **Node.js** `>=22.22.2 <23`, of `>=24.0.0 <27` (aanbevolen: 24 LTS)
- **npm** 10+

> **Windows met Node 24:** gebruik de huidige 24 LTS-patchrelease (minimaal 24.20.0).
> Eerdere releases kunnen na geslaagde tests afbreken wanneer `--test-force-exit` het
> proces sluit. Node's [Windows libuv-fix](https://github.com/nodejs/node/pull/61999) verhelpt
> deze runtimecrash; laat de testasserties en controles van het runner-afsluiten ingeschakeld.

> **Gebruikers van npm v11+ (Node 24+):** Controleer na `npm install` of native modules zijn geïnstalleerd:
> `node -e "require('better-sqlite3')"`. Als dit mislukt met `MODULE_NOT_FOUND`,
> voer je `npm approve-scripts better-sqlite3 && npm install` uit. Zie
> [Probleemoplossing](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klonen en installeren

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Omgevingsvariabelen

```bash
# Maak je .env aan vanuit de template
cp .env.example .env

# Genereer de vereiste geheimen
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Belangrijke variabelen voor ontwikkeling:

| Variabele              | Standaardwaarde voor ontwikkeling | Beschrijving                 |
| ---------------------- | --------------------------------- | ---------------------------- |
| `PORT`                 | `20128`                           | Serverpoort                  |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`          | Basis-URL voor frontend      |
| `JWT_SECRET`           | (hierboven genereren)             | JWT-ondertekeningsgeheim     |
| `INITIAL_PASSWORD`     | `CHANGEME`                        | Wachtwoord voor eerste login |
| `APP_LOG_LEVEL`        | `info`                            | Niveau van loguitvoer        |

### Dashboardinstellingen

Het dashboard biedt UI-schakelaars voor functies die ook via omgevingsvariabelen kunnen worden geconfigureerd:

| Instellingslocatie  | Schakelaar         | Beschrijving                             |
| ------------------- | ------------------ | ---------------------------------------- |
| Settings → Advanced | Debug Mode         | Debug-aanvraaglogboeken inschakelen (UI) |
| Settings → General  | Sidebar Visibility | Zijbalksecties tonen/verbergen           |

Deze instellingen worden in de database opgeslagen en blijven na herstarts behouden. Wanneer ze zijn ingesteld, overschrijven ze de standaardwaarden van omgevingsvariabelen.

### Lokaal uitvoeren

```bash
# Ontwikkelingsmodus (hot reload)
npm run dev

# Productiebuild
npm run build    # next build → .build/next/ en vervolgens assembleStandalone → dist/
npm run start

# Snelle backend/API-only compilatie voor wijzigingen van bijdragers
npm run build:contributor

# Releasebuild (schone rebuild + HEAD-sentinel — vereist voor deployment)
npm run build:release   # rm -rf .build dist en build + schrijft dist/BUILD_SHA

# Veelgebruikte poortconfiguratie
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

De contributor-build voert uitsluitend compilatievalidatie uit: de standalone-distributie wordt niet samengesteld en optionele native packaging-assets worden niet gebouwd. Gebruik de reguliere productiebuild wanneer je de distributie die kan worden uitgeleverd wilt valideren.

### Indeling van de build-uitvoer

| Map       | Inhoud                                                                           | Bijgehouden |
| --------- | -------------------------------------------------------------------------------- | ----------- |
| `src/`    | Broncode van de applicatie (TypeScript / TSX)                                    | Ja          |
| `.build/` | Tussenbestanden — uitvoer van `next build` (gitignored, `distDir = .build/next`) | Nee         |
| `dist/`   | Uitleverbare bundel — samengesteld door `assembleStandalone` (gitignored)        | Nee         |

De build-pipeline bestaat uit één doorgang:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js-uitvoer)
  └─ assembleStandalone()                 (kopieert standalone + static + public + native assets)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` maakt bovendien eerst beide mappen leeg en schrijft
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) als sentinel voor de integriteit van de deployment.

`npm run build:contributor` gebruikt het backend-only-buildprofiel. Tijdens het bouwen worden
dashboard-UI-bestanden tijdelijk gestubd, blijven API-routehandlers behouden en worden de oorspronkelijke bestanden
na de build teruggezet. Gebruik `npm run build` voor wijzigingen die gevolgen hebben voor de dashboard-UI of voor volledige releasevalidatie; het contributor-profiel is geen vervanging voor de releasebuild.

> **Opmerking over VPS-deployment:** de externe imagemap `/usr/lib/node_modules/omniroute/app/`
> blijft ongewijzigd. De deploy-skills rsync'en de inhoud van `dist/` hiernaartoe.
> Alleen het build-uitvoerpad in de repository is gewijzigd (`app/` → `dist/`).

Standaard-URL's:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git-workflow

> ⚠️ **Commit NOOIT rechtstreeks naar `main`.** Gebruik altijd featurebranches.
>
> **PR-basis:** richt de PR op de actieve `release/vX.Y.Z`-branch (niet op `main`). Zie
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) voor het
> model met één release per branch en een tag bij de oplevering.

```bash
# Maak een branch vanaf de tip van de actieve releasebranch (voorbeeld: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... breng wijzigingen aan ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Open een Pull Request met base = release/v3.8.49
```

### Branchnamen

| Voorvoegsel | Doel                              |
| ----------- | --------------------------------- |
| `feat/`     | Nieuwe functionaliteit            |
| `fix/`      | Bugfixes                          |
| `refactor/` | Herstructurering van code         |
| `docs/`     | Documentatiewijzigingen           |
| `test/`     | Toevoegingen/correcties van tests |
| `chore/`    | Tooling, CI, afhankelijkheden     |

### Commitberichten

Volg [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: voeg een circuitonderbreker toe voor provideraanroepen
fix: los een randgeval bij de validatie van het JWT-secret op
docs: werk SECURITY.md bij met bescherming van PII
test: voeg unittests voor observability toe
refactor(db): consolideer tabellen voor rate limiting
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Tests uitvoeren

```bash
# Alle tests (unit + vitest + ecosysteem + e2e)
npm run test:all

# Eén testbestand (ingebouwde testrunner van Node.js — de meeste tests gebruiken deze)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Alleen de unit-tests die door je wijziging worden beïnvloed (dezelfde TIA-selector als de CI-gate, #8084)
npm run test:scoped            # wijzigingen in de laatste commit (of de werkmap)
npm run test:scoped:staged     # alleen gestagede wijzigingen — goed te combineren met een pre-commit-run
npm run test:scoped:full       # bouw eerst de importgraaf opnieuw op (na het toevoegen/verplaatsen van bestanden)
# Exit 1 + "run the full suite" betekent dat een centraal bestand (tsconfig, package.json, …) of een
# niet-toegewezen bronbestand is gewijzigd — de selector faalt veilig en slaat nooit stilzwijgend iets over.

# Vitest (MCP-server, autoCombo, cache)
npm run test:vitest

# E2E-tests (vereist Playwright)
npm run test:e2e

# E2E voor protocolclients (MCP-transports, A2A)
npm run test:protocols:e2e

# Compatibiliteitstests voor het ecosysteem
npm run test:ecosystem

# Dekkingsgate: 60% statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# Controle op linting en opmaak
npm run lint
npm run check

# Afgeschermde combo-smoketest met echte upstreams (vereist VPS-toegang + echt providertegoed)
# Benadert ECHTE providers — kost een klein bedrag. Wordt NOOIT in CI uitgevoerd. Wordt netjes overgeslagen zonder de gate.
# Vereist: toegang via ssh root@192.168.0.15 (haalt een alleen-lezen DB-snapshot op van de VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Live-smoketest voor fase 3 op de VPS — gewone Node ESM-scripts die de live .15-server rechtstreeks benaderen.
# Vereist: toegang via ssh root@192.168.0.15 (combo's worden via SSH sqlite aangemaakt/verwijderd).
# Benadert ECHTE providers (lage kosten). Maakt/verwijdert alleen combo's met __live_test__*. Wordt NOOIT in CI uitgevoerd.
# REQUIRE_API_KEY=false op .15, dus er is geen API-sleutel nodig, maar COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY worden gebruikt indien ingesteld.
npm run test:combo:live:vps              # 7 HTTP-scenario's (prioriteit/round-robin/gewogen/kosten/fusie/auto + status)
npm run test:combo:live:vps:failover     # voegt een echt provideroverschrijdend failoverscenario toe (8 in totaal)
```

Opmerkingen over dekking:

- `npm run test:coverage` meet de broncodedekking voor de belangrijkste unit-testsuite, sluit `tests/**` uit en neemt `open-sse/**` op
- Pull requests moeten de dekkingsgate op **60%+** statements/lines/functions/branches houden
- Als een PR productiecode in `src/`, `open-sse/`, `electron/` of `bin/` wijzigt, moeten in dezelfde PR geautomatiseerde tests worden toegevoegd of bijgewerkt
- `npm run coverage:report` toont het gedetailleerde rapport per bestand van de meest recente dekkingsrun
- `npm run test:coverage:legacy` behoudt de oudere metriek voor historische vergelijking
- Zie `docs/ops/COVERAGE_PLAN.md` voor de gefaseerde roadmap voor verbetering van de dekking

### Vereisten voor pull requests

Gebruik voordat je een PR opent het
[Gouden pad voor bijdragen](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) om de gerichte cyclus uit te voeren voor
wat je hebt gewijzigd. De volledige unit-testsuite (4 CI-shards), Vitest, de dekkingsgate van **60%+** en
de productiebuild vallen onder de verantwoordelijkheid van CI — ze lokaal uitvoeren levert geen extra
informatie op die de PR-controles je niet al geven, en op kleinere machines kan dit de host overbelasten (#8084):

- Voer de testbestanden uit die je wijziging afdekken: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Voer `npm run lint` uit
- Voeg geautomatiseerde tests toe of werk ze bij in dezelfde PR wanneer productiecode verandert
- Plaats in `node:test`-bestanden elke `await` op het hoogste niveau (zoals `await import(...)`) vóór de eerste `test()` / `describe()`: onder `--test-force-exit` kunnen tests die daarna worden geregistreerd stilzwijgend nooit worden uitgevoerd (#18045; afgedwongen door `npm run check:test-tla-order`)
- Vermeld de gewijzigde of toegevoegde testbestanden in de PR-beschrijving wanneer productiecode is gewijzigd
- Controleer het SonarQube-resultaat voor de PR wanneer de projectgeheimen in CI zijn geconfigureerd

Huidige teststatus: **122 unit-testbestanden** met dekking voor:

- Providertranslators en formaatconversie
- Snelheidsbegrenzing, circuitbreaker en robuustheid
- Semantische cache, idempotentie en voortgangsregistratie
- Databasebewerkingen en schema (21 DB-modules)
- OAuth-flows en authenticatie
- Validatie van API-endpoints (Zod v4)
- MCP-servertools en afdwinging van scopes
- Memory- en Skills-systemen

---

## Codestijl

- **ESLint** — Voer `npm run lint` uit voordat je commit
- **Prettier** — Wordt bij het committen automatisch geformatteerd via `lint-staged` (2 spaties, puntkomma's, dubbele aanhalingstekens, regelbreedte van 100 tekens, afsluitende komma's volgens es5)
- **TypeScript** — Alle code in `src/` gebruikt `.ts`/`.tsx`; `open-sse/` gebruikt `.ts`/`.js`; documenteer met TSDoc (`@param`, `@returns`, `@throws`)
- **Geen `eval()`** — ESLint handhaaft `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod-validatie** — Gebruik Zod v4-schema's voor alle validatie van API-invoer
- **Naamgeving**: bestanden = camelCase/kebab-case, componenten = PascalCase, constanten = UPPER_SNAKE

### Foutafhandeling / lege catch-blokken

Laat een `catch` nooit onverklaard. Deel deze in een van de volgende twee categorieën in (dit operationaliseert
de harde regel "slik fouten in SSE-streams nooit stilzwijgend in"):

- **Opzettelijk (onze eigen best-effort-opruiming/telemetrie)** — een fout is hier te verwachten en
  onschadelijk; voeg een commentaarregel toe met de reden, zonder logging (logging bij elk verzoek is de
  ruis die met deze conventie wordt vermeden).

  ```ts
  } catch {} // het sluiten van een reeds gesloten controller nadat de client de verbinding heeft verbroken, is te verwachten
  ```

- **Moet worden gelogd (externe/door de aanroeper aangeleverde code, of het inslikken verandert de besturingsstroom)** — behoud
  de catch (laat deze nooit de stream onderbreken), maar genereer een contextuele `console.debug`/`warn`, zodat de
  fout kan worden ontdekt.

  ```ts
  } catch (e) {
    console.debug("[STREAM] fout in onFailure-callback:", e);
  }
  ```

Zie `open-sse/utils/stream.ts` en `open-sse/utils/streamHandler.ts` voor toegepaste voorbeelden.

---

## Projectstructuur

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

## Een nieuwe provider toevoegen

### Stap 1: Providerconstanten registreren

Voeg ze toe aan `src/shared/constants/providers.ts` — gevalideerd met Zod bij het laden van de module.

### Stap 2: Executor toevoegen (indien aangepaste logica nodig is)

Maak een executor in `open-sse/executors/your-provider.ts` die de basisexecutor uitbreidt.

### Stap 3: Translator toevoegen (indien geen OpenAI-indeling)

Maak translators voor verzoeken en antwoorden in `open-sse/translator/`.

### Stap 4: OAuth-configuratie toevoegen (indien gebaseerd op OAuth)

Voeg OAuth-inloggegevens toe in `src/lib/oauth/constants/oauth.ts` en een service in `src/lib/oauth/services/`.

Als de upstreamprovider een openbare OAuth-`client_id`/`secret` of Firebase Web API-sleutel in zijn openbare CLI-/browserbundel distribueert, neem deze dan **niet** op als een letterlijke tekenreeks. Gebruik `resolvePublicCred()` uit `open-sse/utils/publicCreds.ts` en voeg een gemaskeerde bytevermelding toe aan `EMBEDDED_DEFAULTS`. De volledige verplichte workflow is gedocumenteerd in [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Binnen handlers/executors moeten foutmeldingen die de client bereiken, worden verwerkt via `buildErrorBody()` / `sanitizeErrorMessage()` uit `open-sse/utils/error.ts` — plaats nooit onbewerkte `err.stack` of `err.message` in de body van een Response. Zie [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Stap 5: Modellen registreren

Voeg modeldefinities toe in `open-sse/config/providerRegistry.ts`.

### Stap 6: Tests toevoegen

Schrijf unittests in `tests/unit/` die minimaal het volgende afdekken:

- Providerregistratie
- Vertaling van verzoeken en antwoorden
- Foutafhandeling

---

## Checklist voor pull requests

- [ ] Tests slagen (`npm test`)
- [ ] Linting slaagt (`npm run lint`)
- [ ] Build slaagt (`npm run build`)
- [ ] TypeScript-typen toegevoegd voor nieuwe openbare functies en interfaces
- [ ] Geen hardgecodeerde geheimen of terugvalwaarden
- [ ] Openbare upstream-inloggegevens ingesloten via `resolvePublicCred()` (zie [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), nooit als letterlijke waarden
- [ ] Foutreacties worden verwerkt via `buildErrorBody()` / `sanitizeErrorMessage()` — geen onbewerkte stacktraces in responsbody's (zie [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell-opdrachten (`exec` / `spawn`) geven runtimewaarden door via `env`, niet via tekenreeksinterpolatie
- [ ] Alle invoer gevalideerd met Zod-schema's
- [ ] **Fragment** voor de changelog toegevoegd onder `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` voor gebruikersgerichte wijzigingen (zie [`changelog.d/README.md`](./changelog.d/README.md)) — bewerk `CHANGELOG.md` **niet** rechtstreeks; fragmenten worden bij een release samengevoegd en veroorzaken nooit conflicten tussen pull requests
- [ ] Documentatie bijgewerkt (indien van toepassing)
- [ ] Geen nieuwe CodeQL- of Secret-Scanning-meldingen geopend, of elke melding afgewezen met een technische onderbouwing die verwijst naar het relevante document in `docs/security/`
- [ ] Routes die onderliggende processen starten (`/api/mcp/`, `/api/cli-tools/runtime/`) geclassificeerd als `isLocalOnlyPath()` in `src/server/authz/routeGuard.ts` — zie [harde regel #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Geen AI-/bottrailers met `Co-authored-by` in commitberichten (harde regel #16) — menselijke medewerkers van wie werk wordt hergebruikt, worden vermeld met standaardtrailers in de vorm `Co-authored-by: Name <email>`

---

## Releases uitbrengen

Releases worden beheerd via de `/generate-release`-workflow. Wanneer er een nieuwe GitHub Release wordt aangemaakt, wordt het pakket via GitHub Actions **automatisch naar npm gepubliceerd**.

Gebruik voor VPS-deployments `npm run build:release` (niet `npm run build`) — deze opdracht voert een schone
rebuild uit, stelt de bundel samen in `dist/` en schrijft het sentinelbestand `dist/BUILD_SHA`.
Gebruik vervolgens de `/deploy-vps-*-cc`-skills, die `dist/` via rsync naar de externe map `app/` synchroniseren.

---

## Hulp krijgen

- **Architectuur**: Zie [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API-referentie**: Zie [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Beveiligingsdocumentatie**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Beheerdocumentatie**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemen**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
