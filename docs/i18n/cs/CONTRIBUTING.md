# Contributing to OmniRoute (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Nastavení vývoje

### Požadavky

- **Node.js** `>=22.22.2 <23`, nebo `>=24.0.0 <27` (doporučeno: 24 LTS)
- **npm** 10+

> **Windows s Node 24:** použijte aktuální opravnou verzi 24 LTS (nejméně 24.20.0).
> Starší verze mohou po úspěšném dokončení testů ukončit proces, když `--test-force-exit`
> proces zavře. Tento pád za běhu řeší [oprava Windows pro libuv](https://github.com/nodejs/node/pull/61999);
> ponechte povolené kontroly asercí testů a ukončení runneru.

> **Uživatelé npm v11+ (Node 24+):** Po `npm install` ověřte, že byly nainstalovány nativní moduly:
> `node -e "require('better-sqlite3')"`. Pokud příkaz selže s chybou `MODULE_NOT_FOUND`,
> spusťte `npm approve-scripts better-sqlite3 && npm install`. Viz
> [Řešení problémů](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klonování a instalace

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Proměnné prostředí

```bash
# Vytvořte soubor .env ze šablony
cp .env.example .env

# Vygenerujte požadované tajné hodnoty
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Klíčové proměnné pro vývoj:

| Proměnná               | Výchozí hodnota pro vývoj | Popis                           |
| ---------------------- | ------------------------- | ------------------------------- |
| `PORT`                 | `20128`                   | Port serveru                    |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`  | Základní URL frontendu          |
| `JWT_SECRET`           | (vygenerujte výše)        | Tajný klíč pro podepisování JWT |
| `INITIAL_PASSWORD`     | `CHANGEME`                | Heslo pro první přihlášení      |
| `APP_LOG_LEVEL`        | `info`                    | Úroveň podrobnosti protokolů    |

### Nastavení řídicího panelu

Řídicí panel poskytuje přepínače uživatelského rozhraní pro funkce, které lze konfigurovat také prostřednictvím proměnných prostředí:

| Umístění nastavení    | Přepínač                       | Popis                                   |
| --------------------- | ------------------------------ | --------------------------------------- |
| Nastavení → Pokročilé | Režim ladění                   | Povolit protokoly požadavků ladění (UI) |
| Nastavení → Obecné    | Viditelnost postranního panelu | Zobrazit/skrýt části postranního panelu |

Tato nastavení se ukládají do databáze a přetrvávají po restartování. Pokud jsou nastavena,
mají přednost před výchozími hodnotami proměnných prostředí.

### Lokální spuštění

```bash
# Vývojový režim (automatické načítání změn)
npm run dev

# Produkční sestavení
npm run build    # next build → .build/next/ a poté assembleStandalone → dist/
npm run start

# Rychlá kompilace pouze backendu/API pro změny přispěvatelů
npm run build:contributor

# Sestavení vydání (čisté sestavení + sentinel HEAD — vyžadováno pro nasazení)
npm run build:release   # rm -rf .build dist a poté build + zápis dist/BUILD_SHA

# Běžné nastavení portu
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Sestavení pro přispěvatele provádí pouze ověření kompilace: nesestavuje samostatnou
distribuci ani nevytváří volitelné nativní balicí prostředky. Pokud potřebujete ověřit
balíček připravený k distribuci, použijte běžné produkční sestavení.

### Struktura výstupu sestavení

| Adresář   | Obsah                                                                                            | Sledován |
| --------- | ------------------------------------------------------------------------------------------------ | -------- |
| `src/`    | Zdrojový kód aplikace (TypeScript / TSX)                                                         | Ano      |
| `.build/` | Meziprodukty — výstup `next build` (ignorován systémem git, `distDir = .build/next`)             | Ne       |
| `dist/`   | Balíček připravený k distribuci — sestavený pomocí `assembleStandalone` (ignorován systémem git) | Ne       |

Proces sestavení probíhá v jediném průchodu:

```
npm run build
  └─ next build → .build/next/standalone  (výstup Next.js)
  └─ assembleStandalone()                 (zkopíruje standalone + static + public + nativní prostředky)
       └─ výstup: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` navíc nejprve vyčistí oba adresáře a zapíše
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) jako sentinel integrity nasazení.

`npm run build:contributor` používá profil sestavení pouze pro backend. Během sestavení
dočasně nahradí soubory uživatelského rozhraní řídicího panelu, zachová obslužné rutiny
API tras a po dokončení sestavení obnoví původní soubory. Pro změny ovlivňující uživatelské
rozhraní řídicího panelu nebo pro úplné ověření vydání použijte `npm run build`;
profil pro přispěvatele není náhradou za sestavení vydání.

> **Poznámka k nasazení na VPS:** vzdálený adresář s obrazem `/usr/lib/node_modules/omniroute/app/`
> se nemění. Nástroje pro nasazení do něj synchronizují obsah `dist/` pomocí rsync.
> Přesunuta byla pouze cesta výstupu sestavení v repozitáři (`app/` → `dist/`).

Výchozí URL:

- **Řídicí panel**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Pracovní postup v Gitu

> ⚠️ **NIKDY neprovádějte commit přímo do větve `main`.** Vždy používejte větve pro funkce.
>
> **Základ PR:** cílem musí být aktivní větev `release/vX.Y.Z` (nikoli `main`). Model
> s větví pro každé vydání a označením tagem při nasazení je popsán v souboru
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md).

```bash
# Vytvořte větev z konce aktivní větve vydání (příklad: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... proveďte změny ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Otevřete Pull Request se základem = release/v3.8.49
```

### Pojmenování větví

| Prefix      | Účel                     |
| ----------- | ------------------------ |
| `feat/`     | Nové funkce              |
| `fix/`      | Opravy chyb              |
| `refactor/` | Restrukturalizace kódu   |
| `docs/`     | Změny dokumentace        |
| `test/`     | Přidání/opravy testů     |
| `chore/`    | Nástroje, CI, závislosti |

### Zprávy commitů

Dodržujte standard [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Rozsahy (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Spouštění testů

```bash
# Všechny testy (unitární + vitest + ekosystémové + e2e)
npm run test:all

# Jeden testovací soubor (nativní testovací nástroj Node.js — používá ho většina testů)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Pouze unitární testy ovlivněné vaší změnou (stejný selektor TIA jako kontrola v CI, #8084)
npm run test:scoped            # změny v posledním commitu (nebo v pracovním stromu)
npm run test:scoped:staged     # pouze připravené změny — dobře se hodí pro spuštění před commitem
npm run test:scoped:full       # nejprve znovu sestaví mapu grafu importů (po přidání/přesunutí souborů)
# Ukončení s kódem 1 + „spusťte celou sadu“ znamená, že se změnil centrální soubor
# (tsconfig, package.json, …) nebo nezmapovaný zdroj — selektor bezpečně selže a nikdy nic tiše nepřeskočí.

# Vitest (server MCP, autoCombo, mezipaměť)
npm run test:vitest

# Testy E2E (vyžadují Playwright)
npm run test:e2e

# E2E klientů protokolu (transporty MCP, A2A)
npm run test:protocols:e2e

# Testy kompatibility ekosystému
npm run test:ecosystem

# Kontrola pokrytí: 60 % příkazů/řádků/funkcí/větví
npm run test:coverage
npm run coverage:report

# Kontrola lintování + formátování
npm run lint
npm run check

# Kontrolovaný smoke test kombinace proti skutečným upstreamům (vyžaduje přístup k VPS + kredity u skutečných poskytovatelů)
# Využívá SKUTEČNÉ poskytovatele — něco málo stojí. NIKDY se nespouští v CI. Bez povolení kontroly se korektně přeskočí.
# Vyžaduje: přístup přes ssh root@192.168.0.15 (načte z VPS snapshot databáze pouze pro čtení).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Živý smoke test fáze 3 na VPS — prosté skripty Node ESM přistupující přímo k živému serveru .15.
# Vyžaduje: přístup přes ssh root@192.168.0.15 (kombinace se vytvářejí/odstraňují prostřednictvím SSH sqlite).
# Využívá SKUTEČNÉ poskytovatele (nízké náklady). Vytváří/odstraňuje pouze kombinace __live_test__*. NIKDY se nespouští v CI.
# Na .15 je REQUIRE_API_KEY=false, takže není potřeba klíč API, ale jsou respektovány COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY, pokud jsou nastaveny.
npm run test:combo:live:vps              # 7 scénářů HTTP (priorita/round-robin/vážený/náklady/fúze/automatický + stav)
npm run test:combo:live:vps:failover     # přidá skutečný scénář převzetí služeb při selhání mezi poskytovateli (celkem 8)
```

Poznámky k pokrytí:

- `npm run test:coverage` měří pokrytí zdrojového kódu pro hlavní sadu unitárních testů, vylučuje `tests/**` a zahrnuje `open-sse/**`
- Žádosti o přijetí změn musí udržet kontrolu pokrytí na úrovni **60 % nebo více** pro příkazy/řádky/funkce/větve
- Pokud PR mění produkční kód v `src/`, `open-sse/`, `electron/` nebo `bin/`, musí ve stejném PR přidat nebo aktualizovat automatizované testy
- `npm run coverage:report` vypíše podrobnou zprávu po jednotlivých souborech z posledního spuštění měření pokrytí
- `npm run test:coverage:legacy` zachovává starší metriku pro historické porovnání
- Postupný plán zlepšování pokrytí najdete v `docs/ops/COVERAGE_PLAN.md`

### Požadavky na žádost o přijetí změn

Před otevřením PR použijte
[Preferovaný postup přispívání](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) a spusťte cílený cyklus pro
své změny. Za úplnou sadu unitárních testů (4 části CI), Vitest, kontrolu pokrytí **60 % nebo více** a
produkční sestavení odpovídá CI — jejich lokální spuštění neposkytuje žádné dodatečné informace,
které by vám kontroly PR již neposkytly, a na méně výkonných počítačích může hostitele přetížit (#8084):

- Spusťte testovací soubory pokrývající vaši změnu: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Spusťte `npm run lint`
- Při každé změně produkčního kódu zahrňte nebo aktualizujte automatizované testy ve stejném PR
- V souborech `node:test` umístěte každý příkaz `await` na nejvyšší úrovni (například `await import(...)`) před první `test()` / `describe()`: při použití `--test-force-exit` se testy zaregistrované až za ním nemusí vůbec spustit, aniž by se zobrazila chyba (#18045; vynucuje `npm run check:test-tla-order`)
- Pokud se změnil produkční kód, uveďte změněné nebo přidané testovací soubory v popisu PR
- Pokud jsou v CI nakonfigurována tajemství projektu, zkontrolujte v PR výsledek SonarQube

Aktuální stav testů: **122 souborů unitárních testů** pokrývajících:

- Překladače poskytovatelů a převod formátů
- Omezování frekvence požadavků, jistič a odolnost
- Sémantickou mezipaměť, idempotenci a sledování průběhu
- Databázové operace a schéma (21 databázových modulů)
- Toky OAuth a ověřování
- Validaci koncových bodů API (Zod v4)
- Nástroje serveru MCP a vynucování rozsahu oprávnění
- Systémy paměti a dovedností

---

## Styl kódu

- **ESLint** — Před commitem spusťte `npm run lint`
- **Prettier** — Automaticky formátováno pomocí `lint-staged` při commitu (2 mezery, středníky, dvojité uvozovky, šířka 100 znaků, koncové čárky dle es5)
- **TypeScript** — Veškerý kód v `src/` používá `.ts`/`.tsx`; `open-sse/` používá `.ts`/`.js`; dokumentujte pomocí TSDoc (`@param`, `@returns`, `@throws`)
- **Žádné `eval()`** — ESLint vynucuje `no-eval`, `no-implied-eval`, `no-new-func`
- **Validace pomocí Zod** — Pro validaci všech vstupů API používejte schémata Zod v4
- **Pojmenování**: Soubory = camelCase/kebab-case, komponenty = PascalCase, konstanty = UPPER_SNAKE

### Zpracování chyb / prázdné bloky catch

Nikdy nenechávejte blok `catch` bez vysvětlení. Zařaďte jej do jedné ze dvou kategorií (tím se
prakticky uplatňuje striktní pravidlo „nikdy tiše nepotlačovat chyby v SSE streamech“):

- **Záměrné (náš vlastní nezávazný úklid / telemetrie)** — selhání je zde očekávané a
  neškodné; přidejte jednořádkový komentář s odůvodněním, bez protokolování (tato konvence
  zabraňuje šumu způsobenému protokolováním každého požadavku).

  ```ts
  } catch {} // uzavření již uzavřeného kontroleru po odpojení klienta je očekávané
  ```

- **Mělo by se protokolovat (externí kód / kód dodaný volajícím, nebo potlačení mění tok řízení)** — ponechte
  blok catch (nikdy nedovolte, aby narušil stream), ale vypište kontextovou zprávu pomocí `console.debug`/`warn`,
  aby bylo možné selhání odhalit.

  ```ts
  } catch (e) {
    console.debug("[STREAM] chyba callbacku onFailure:", e);
  }
  ```

Příklady použití najdete v `open-sse/utils/stream.ts` a `open-sse/utils/streamHandler.ts`.

---

## Struktura projektu

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

## Přidání nového poskytovatele

### Krok 1: Registrace konstant poskytovatele

Přidejte je do `src/shared/constants/providers.ts` — při načtení modulu jsou ověřeny pomocí Zod.

### Krok 2: Přidání executoru (pokud je potřeba vlastní logika)

Vytvořte executor v `open-sse/executors/your-provider.ts`, který rozšiřuje základní executor.

### Krok 3: Přidání překladače (pokud formát není kompatibilní s OpenAI)

Vytvořte překladače požadavků a odpovědí v `open-sse/translator/`.

### Krok 4: Přidání konfigurace OAuth (pokud je založena na OAuth)

Přidejte přihlašovací údaje OAuth do `src/lib/oauth/constants/oauth.ts` a službu do `src/lib/oauth/services/`.

Pokud upstream poskytovatel distribuuje veřejný OAuth client_id/secret nebo Firebase Web API klíč ve svém veřejném CLI / balíčku pro prohlížeč, **nevkládejte** jej jako řetězcový literál. Použijte `resolvePublicCred()` z `open-sse/utils/publicCreds.ts` a přidejte maskovaný bajtový záznam do `EMBEDDED_DEFAULTS`. Úplný povinný postup je zdokumentován v [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Uvnitř handlerů/executorů musí chybové zprávy odesílané klientovi projít přes `buildErrorBody()` / `sanitizeErrorMessage()` z `open-sse/utils/error.ts` — nikdy nevkládejte nezpracované `err.stack` ani `err.message` do těla Response. Viz [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Krok 5: Registrace modelů

Přidejte definice modelů do `open-sse/config/providerRegistry.ts`.

### Krok 6: Přidání testů

Napište unit testy v `tests/unit/`, které budou pokrývat minimálně:

- Registraci poskytovatele
- Překlad požadavků a odpovědí
- Zpracování chyb

---

## Vytáhněte kontrolní seznam požadavku

- [ ] Úspěšné testy (`npm test`)
- [ ] Linling passy (`npm run lint`)
- [ ] Sestavení bylo úspěšné (`npm run build`)
- [ ] Přidány typy TypeScript pro nové veřejné funkce a rozhraní
- [ ] Žádná napevno zakódovaná tajemství nebo záložní hodnoty
- [ ] Veřejné upstream přihlašovací údaje vložené přes `resolvePublicCred()` (viz [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ), nikdy jako literály
- [ ] Cesta chybových odpovědí přes `buildErrorBody()` / `sanitizeErrorMessage()` — žádné nezpracované trasování zásobníku v těle odpovědi (viz [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) )
- [ ] Příkazy shellu (`exec` / `spawn`) předávají hodnoty za běhu prostřednictvím `env`, nikoli pomocí řetězcové interpolace
- [ ] Všechny vstupy byly ověřeny pomocí schémat Zod
- [ ] Seznam změn** fragment** přidáno pod `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` pro změny orientované na uživatele (viz [`changelog.d/README.md`](./changelog.d/README.md) ) — do** ne** editovat `CHANGELOG.md` přímo; fragmenty jsou agregovány v době vydání a nikdy nejsou v konfliktu mezi PRs
- [ ] Aktualizace dokumentace (pokud existuje)
- [ ] No new CodeQL / Secret-Scanning alerts opened, or each one dismissed with technical justification referencing the relevant `docs/security/` doc
- [ ] Cesty, které vytvářejí podřízené procesy (`/api/mcp/`, `/api/cli-tools/runtime/`) klasifikované jako `isLocalOnlyPath()` v `src/server/authz/routeGuard.ts` — viz [tvrdé pravidlo #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Žádné upoutávky AI/bot `Co-authored-by` ve zprávách odevzdání (Hard Rule #16) Lidským spolupracovníkům —, jejichž práce je znovu použita, jsou připisovány standardní upoutávky `Co-authored-by: Name <email>`

---

## Vydávání verzí

Vydávání verzí se spravuje pomocí workflow `/generate-release`. Když je vytvořena nová verze na GitHubu, balíček je **automaticky publikován do npm** prostřednictvím GitHub Actions.

Pro nasazení na VPS použijte `npm run build:release` (nikoli `npm run build`) — tento příkaz provede čisté
sestavení, připraví balíček v adresáři `dist/` a zapíše kontrolní soubor `dist/BUILD_SHA`.
Poté použijte dovednosti `/deploy-vps-*-cc`, které pomocí rsync synchronizují adresář `dist/` se vzdáleným adresářem `app/`.

---

## Získání pomoci

- **Architektura**: Viz [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Referenční dokumentace API**: Viz [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Dokumentace zabezpečení**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Provozní dokumentace**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Hlášení problémů**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
