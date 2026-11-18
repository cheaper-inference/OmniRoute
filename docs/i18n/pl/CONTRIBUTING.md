# Contributing to OmniRoute (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Dziękujemy za zainteresowanie współtworzeniem projektu! Ten przewodnik zawiera wszystko, czego potrzebujesz, aby rozpocząć.

Oficjalny proces dotyczący poszczególnych zmian opisano w
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Dokument ten przyporządkowuje zmiany dotyczące dostawców, routingu,
UI/UX, i18n, CLI, bazy danych oraz kompilacji/wdrażania do odpowiednich kontraktów, ukierunkowanych testów, zakresu CI
i kroków uzgadniania.

---

## Konfiguracja środowiska deweloperskiego

### Wymagania wstępne

- **Node.js** `>=22.22.2 <23` lub `>=24.0.0 <27` (zalecana wersja: 24 LTS)
- **npm** 10+

> **Windows z Node 24:** użyj bieżącej poprawkowej wersji 24 LTS (co najmniej 24.20.0).
> Wcześniejsze wersje mogą przerwać działanie po pomyślnym przejściu testów, gdy `--test-force-exit` zamyka
> proces. [Poprawka Windows w bibliotece libuv](https://github.com/nodejs/node/pull/61999) dla Node.js
> rozwiązuje ten błąd środowiska uruchomieniowego; pozostaw włączone asercje testów i kontrole wyjścia runnera.

> **Użytkownicy npm v11+ (Node 24+):** Po wykonaniu `npm install` sprawdź, czy moduły natywne zostały zainstalowane:
> `node -e "require('better-sqlite3')"`. Jeśli polecenie zakończy się błędem `MODULE_NOT_FOUND`,
> uruchom `npm approve-scripts better-sqlite3 && npm install`. Zobacz
> [Rozwiązywanie problemów](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klonowanie i instalacja

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Zmienne środowiskowe

```bash
# Utwórz plik .env na podstawie szablonu
cp .env.example .env

# Wygeneruj wymagane sekrety
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Najważniejsze zmienne w środowisku deweloperskim:

| Zmienna                | Wartość domyślna w środowisku deweloperskim | Opis                           |
| ---------------------- | ------------------------------------------- | ------------------------------ |
| `PORT`                 | `20128`                                     | Port serwera                   |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`                    | Bazowy URL frontendu           |
| `JWT_SECRET`           | (wygeneruj powyżej)                         | Sekret podpisywania JWT        |
| `INITIAL_PASSWORD`     | `CHANGEME`                                  | Hasło przy pierwszym logowaniu |
| `APP_LOG_LEVEL`        | `info`                                      | Poziom szczegółowości logów    |

### Ustawienia panelu

Panel udostępnia przełączniki interfejsu użytkownika dla funkcji, które można również konfigurować za pomocą zmiennych środowiskowych:

| Lokalizacja ustawienia    | Przełącznik               | Opis                              |
| ------------------------- | ------------------------- | --------------------------------- |
| Ustawienia → Zaawansowane | Tryb debugowania          | Włącz debugowe logi żądań (UI)    |
| Ustawienia → Ogólne       | Widoczność paska bocznego | Pokaż/ukryj sekcje paska bocznego |

Te ustawienia są przechowywane w bazie danych i zachowują się po ponownym uruchomieniu, zastępując wartości domyślne zmiennych środowiskowych, jeśli zostały ustawione.

### Uruchamianie lokalne

```bash
# Tryb deweloperski (automatyczne przeładowywanie)
npm run dev

# Kompilacja produkcyjna
npm run build    # next build → .build/next/ then assembleStandalone → dist/
npm run start

# Szybka kompilacja tylko backendu/API dla zmian wprowadzanych przez współtwórców
npm run build:contributor

# Kompilacja wydania (czysta kompilacja + znacznik HEAD — wymagane przed wdrożeniem)
npm run build:release   # rm -rf .build dist && build + writes dist/BUILD_SHA

# Typowa konfiguracja portu
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Kompilacja dla współtwórców wykonuje wyłącznie walidację kompilacji: nie składa dystrybucji standalone
ani nie buduje opcjonalnych natywnych zasobów pakietowania. Użyj standardowej kompilacji produkcyjnej,
jeśli chcesz zweryfikować pakiet przeznaczony do wdrożenia.

### Układ danych wyjściowych kompilacji

| Katalog   | Zawartość                                                                                     | Śledzony |
| --------- | --------------------------------------------------------------------------------------------- | -------- |
| `src/`    | Kod źródłowy aplikacji (TypeScript / TSX)                                                     | Tak      |
| `.build/` | Pliki pośrednie — dane wyjściowe `next build` (ignorowane przez git, `distDir = .build/next`) | Nie      |
| `dist/`   | Pakiet przeznaczony do wdrożenia — składany przez `assembleStandalone` (ignorowany przez git) | Nie      |

Potok kompilacji składa się z jednego przebiegu:

```
npm run build
  └─ next build → .build/next/standalone  (dane wyjściowe Next.js)
  └─ assembleStandalone()                 (kopiuje standalone + static + public + zasoby natywne)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` dodatkowo najpierw czyści oba katalogi i zapisuje
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) jako znacznik integralności wdrożenia.

`npm run build:contributor` używa profilu kompilacji tylko backendu. Tymczasowo zastępuje pliki interfejsu
panelu podczas kompilacji, zachowuje procedury obsługi tras API i przywraca oryginalne pliki
po zakończeniu kompilacji. Użyj `npm run build` w przypadku zmian wpływających na interfejs panelu
lub pełnej walidacji wydania; profil dla współtwórców nie zastępuje kompilacji wydania.

> **Uwaga dotycząca wdrożenia na VPS:** zdalny katalog obrazów `/usr/lib/node_modules/omniroute/app/`
> pozostaje bez zmian. Narzędzia wdrożeniowe rsyncują do niego zawartość `dist/`.
> Zmieniono tylko ścieżkę danych wyjściowych kompilacji w repozytorium (`app/` → `dist/`).

Domyślne adresy URL:

- **Panel**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Przepływ pracy z Git

> ⚠️ **NIGDY nie wykonuj commitów bezpośrednio do `main`.** Zawsze używaj gałęzi funkcjonalnych.
>
> **Gałąź bazowa PR:** wybierz aktywną gałąź `release/vX.Y.Z` (nie `main`). Zobacz
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md), aby poznać model
> osobnej gałęzi dla każdego wydania oraz tworzenia tagu podczas publikacji.

```bash
# Utwórz gałąź od najnowszego commita aktywnej gałęzi wydania (przykład: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... wprowadź zmiany ...
git commit -m "feat: opisz swoją zmianę"
git push -u origin feat/your-feature-name
# Otwórz Pull Request z base = release/v3.8.49
```

### Nazewnictwo gałęzi

| Prefiks     | Przeznaczenie                |
| ----------- | ---------------------------- |
| `feat/`     | Nowe funkcje                 |
| `fix/`      | Poprawki błędów              |
| `refactor/` | Restrukturyzacja kodu        |
| `docs/`     | Zmiany w dokumentacji        |
| `test/`     | Dodawanie/poprawianie testów |
| `chore/`    | Narzędzia, CI, zależności    |

### Komunikaty commitów

Stosuj standard [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: dodaj wyłącznik awaryjny dla wywołań dostawców
fix: rozwiąż przypadek brzegowy walidacji sekretu JWT
docs: zaktualizuj SECURITY.md o ochronę danych PII
test: dodaj testy jednostkowe obserwowalności
refactor(db): skonsoliduj tabele limitów szybkości
```

Zakresy (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Uruchamianie testów

```bash
# Wszystkie testy (jednostkowe + vitest + ekosystem + e2e)
npm run test:all

# Pojedynczy plik testowy (natywny mechanizm uruchamiania testów Node.js — korzysta z niego większość testów)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Tylko testy jednostkowe, na które wpływa Twoja zmiana (ten sam selektor TIA co w bramce CI, #8084)
npm run test:scoped            # zmiany w ostatnim commicie (lub w drzewie roboczym)
npm run test:scoped:staged     # tylko zmiany dodane do indeksu — dobrze współpracuje z uruchomieniem przed commitem
npm run test:scoped:full       # najpierw ponownie tworzy mapę grafu importów (po dodaniu/przeniesieniu plików)
# Kod wyjścia 1 + „uruchom pełny zestaw” oznacza, że zmienił się plik centralny (tsconfig, package.json, …) lub
# niezmapowane źródło — selektor bezpiecznie przerywa działanie i nigdy po cichu niczego nie pomija.

# Vitest (serwer MCP, autoCombo, pamięć podręczna)
npm run test:vitest

# Testy E2E (wymagają Playwright)
npm run test:e2e

# Testy E2E klientów protokołów (transporty MCP, A2A)
npm run test:protocols:e2e

# Testy zgodności z ekosystemem
npm run test:ecosystem

# Bramka pokrycia: 60% instrukcji/wierszy/funkcji/gałęzi
npm run test:coverage
npm run coverage:report

# Sprawdzanie lintowania i formatowania
npm run lint
npm run check

# Warunkowy test smoke rzeczywistej kombinacji upstream (wymaga dostępu do VPS i środków u rzeczywistych dostawców)
# Korzysta z RZECZYWISTYCH dostawców — generuje niewielkie koszty. NIGDY nie działa w CI. Jest bezpiecznie pomijany bez aktywnej bramki.
# Wymaga dostępu: ssh root@192.168.0.15 (pobiera z VPS migawkę bazy danych tylko do odczytu).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Test smoke na żywo fazy 3 na VPS — zwykłe skrypty Node ESM, bezpośrednio korzystające z działającego serwera .15.
# Wymaga dostępu: ssh root@192.168.0.15 (kombinacje są tworzone/usuwane przez SSH sqlite).
# Korzysta z RZECZYWISTYCH dostawców (niewielki koszt). Tworzy/usuwa wyłącznie kombinacje __live_test__*. NIGDY nie działa w CI.
# Na .15 ustawiono REQUIRE_API_KEY=false, więc klucz API nie jest wymagany, ale ustawienia COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY są respektowane.
npm run test:combo:live:vps              # 7 scenariuszy HTTP (priorytet/cykliczny/ważony/koszt/fuzja/automatyczny + kondycja)
npm run test:combo:live:vps:failover     # dodaje rzeczywisty scenariusz przełączania awaryjnego między dostawcami (łącznie 8)
```

Uwagi dotyczące pokrycia:

- `npm run test:coverage` mierzy pokrycie kodu źródłowego dla głównego zestawu testów jednostkowych, wyklucza `tests/**` i obejmuje `open-sse/**`
- Pull requesty muszą utrzymywać bramkę pokrycia na poziomie **60%+** instrukcji/wierszy/funkcji/gałęzi
- Jeśli PR zmienia kod produkcyjny w `src/`, `open-sse/`, `electron/` lub `bin/`, musi w tym samym PR dodawać lub aktualizować testy automatyczne
- `npm run coverage:report` wyświetla szczegółowy raport dla poszczególnych plików z ostatniego pomiaru pokrycia
- `npm run test:coverage:legacy` zachowuje starszą metrykę do porównań historycznych
- Etapowy plan poprawy pokrycia znajduje się w `docs/ops/COVERAGE_PLAN.md`

### Wymagania dotyczące pull requestów

Przed otwarciem PR skorzystaj z
[zalecanej ścieżki wnoszenia zmian](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), aby uruchomić ukierunkowaną pętlę dla
wprowadzonych zmian. Pełny zestaw testów jednostkowych (4 fragmenty CI), Vitest, bramka pokrycia **60%+** oraz
kompilacja produkcyjna należą do obowiązków CI — ich lokalne uruchamianie nie dostarcza żadnych informacji,
których nie zapewnią już kontrole PR, a na słabszych maszynach może przeciążyć hosta (#8084):

- Uruchom pliki testowe obejmujące Twoją zmianę: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Uruchom `npm run lint`
- Za każdym razem, gdy zmienia się kod produkcyjny, uwzględnij lub zaktualizuj testy automatyczne w tym samym PR
- W plikach `node:test` umieść każde `await` najwyższego poziomu (np. `await import(...)`) przed pierwszym `test()` / `describe()`: przy `--test-force-exit` testy zarejestrowane po nim mogą po cichu nigdy się nie uruchomić (#18045; wymuszane przez `npm run check:test-tla-order`)
- Jeśli zmienił się kod produkcyjny, uwzględnij zmienione lub dodane pliki testowe w opisie PR
- Gdy sekrety projektu są skonfigurowane w CI, sprawdź wynik SonarQube dla PR

Bieżący stan testów: **122 pliki testów jednostkowych** obejmujące:

- Translatory dostawców i konwersję formatów
- Ograniczanie częstotliwości, wyłącznik automatyczny i odporność
- Semantyczną pamięć podręczną, idempotencję i śledzenie postępu
- Operacje na bazie danych i schemat (21 modułów DB)
- Przepływy OAuth i uwierzytelnianie
- Walidację punktów końcowych API (Zod v4)
- Narzędzia serwera MCP i egzekwowanie zakresów
- Systemy pamięci i umiejętności

---

## Styl kodu

- **ESLint** — uruchom `npm run lint` przed zatwierdzeniem zmian
- **Prettier** — automatyczne formatowanie za pomocą `lint-staged` podczas zatwierdzania zmian (2 spacje, średniki, podwójne cudzysłowy, szerokość 100 znaków, końcowe przecinki zgodne z es5)
- **TypeScript** — cały kod w `src/` używa `.ts`/`.tsx`; `open-sse/` używa `.ts`/`.js`; dokumentuj za pomocą TSDoc (`@param`, `@returns`, `@throws`)
- **Bez `eval()`** — ESLint wymusza `no-eval`, `no-implied-eval`, `no-new-func`
- **Walidacja Zod** — używaj schematów Zod v4 do walidacji wszystkich danych wejściowych API
- **Nazewnictwo**: pliki = camelCase/kebab-case, komponenty = PascalCase, stałe = UPPER_SNAKE

### Obsługa błędów / puste bloki catch

Nigdy nie pozostawiaj bloku `catch` bez wyjaśnienia. Przypisz go do jednej z dwóch kategorii (stanowi to praktyczne zastosowanie
bezwzględnej zasady „nigdy nie ignoruj po cichu błędów w strumieniach SSE”):

- **Celowe (nasze własne czyszczenie/telemetria typu best-effort)** — błąd w tym miejscu jest oczekiwany i
  nieszkodliwy; dodaj jednowierszowy komentarz z uzasadnieniem, bez logowania (ta konwencja pozwala uniknąć
  szumu wynikającego z logowania każdego żądania).

  ```ts
  } catch {} // zamknięcie już zamkniętego kontrolera po rozłączeniu klienta jest oczekiwane
  ```

- **Należy logować (kod zewnętrzny/dostarczony przez wywołującego albo zignorowanie błędu zmienia przepływ sterowania)** — zachowaj
  blok catch (nigdy nie pozwalaj, aby przerwał strumień), ale wyemituj kontekstowy wpis `console.debug`/`warn`, aby
  błąd można było wykryć.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Przykłady zastosowania znajdują się w `open-sse/utils/stream.ts` i `open-sse/utils/streamHandler.ts`.

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

## Dodawanie nowego dostawcy

### Krok 1: Zarejestruj stałe dostawcy

Dodaj je do `src/shared/constants/providers.ts` — są walidowane przez Zod podczas ładowania modułu.

### Krok 2: Dodaj executor (jeśli wymagana jest niestandardowa logika)

Utwórz executor w `open-sse/executors/your-provider.ts`, rozszerzający bazowy executor.

### Krok 3: Dodaj translator (jeśli format jest niezgodny z OpenAI)

Utwórz translatory żądań/odpowiedzi w `open-sse/translator/`.

### Krok 4: Dodaj konfigurację OAuth (jeśli dostawca korzysta z OAuth)

Dodaj dane uwierzytelniające OAuth w `src/lib/oauth/constants/oauth.ts` oraz usługę w `src/lib/oauth/services/`.

Jeśli dostawca nadrzędny rozpowszechnia publiczny OAuth client_id/secret lub klucz Firebase Web API w swoim publicznym CLI / pakiecie przeglądarkowym, **nie** osadzaj go jako literału ciągu znaków. Użyj `resolvePublicCred()` z `open-sse/utils/publicCreds.ts` i dodaj zamaskowany wpis bajtowy do `EMBEDDED_DEFAULTS`. Pełny obowiązkowy proces opisano w [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

W handlerach/executorach komunikaty o błędach przekazywane klientowi muszą przechodzić przez `buildErrorBody()` / `sanitizeErrorMessage()` z `open-sse/utils/error.ts` — nigdy nie umieszczaj nieprzetworzonego `err.stack` ani `err.message` w treści Response. Zobacz [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Krok 5: Zarejestruj modele

Dodaj definicje modeli w `open-sse/config/providerRegistry.ts`.

### Krok 6: Dodaj testy

Napisz testy jednostkowe w `tests/unit/`, obejmujące co najmniej:

- Rejestrację dostawcy
- Translację żądań/odpowiedzi
- Obsługę błędów

---

## Lista kontrolna żądania ściągnięcia

- [ ] Testy zaliczone (`npm test`)
- [ ] Karnety lintingowe (`npm run lint`)
- [ ] Kompilacja zakończyła się sukcesem (`npm run build`)
- [ ] dodano typy TypeScript dla nowych funkcji publicznych i interfejsów
- [ ] Żadnych zakodowanych na stałe sekretów ani wartości zastępczych
- [ ] Publiczne dane uwierzytelniające nadrzędne osadzone za pośrednictwem `resolvePublicCred()` (patrz [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ), nigdy jako literały
- [ ] Odpowiedzi na błędy przechodzą przez `buildErrorBody()` / `sanitizeErrorMessage()` — brak surowych śladów stosu w treściach odpowiedzi (patrz [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) )
- [ ] Polecenia powłoki (`exec` / `spawn`) przekazują wartości czasu wykonania przez `env`, a nie poprzez interpolację ciągów
- [ ] Wszystkie dane wejściowe zostały zweryfikowane za pomocą schematów Zod
- [ ] Dziennik zmian** fragment** dodano w `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` dla zmian widocznych dla użytkownika (zobacz [`changelog.d/README.md`](./changelog.d/README.md) ) — do** nie** edytuj bezpośrednio `CHANGELOG.md` ; fragmenty są agregowane w momencie wydania i nigdy nie powodują konfliktów między PRs
- [ ] Zaktualizowano dokumentację (jeśli dotyczy)
- [ ] Nie otwarto żadnych nowych alertów CodeQL / Secret-Scanning lub każdy z nich został odrzucony z uzasadnieniem technicznym odnoszącym się do odpowiedniego `docs/security/` ZQB
- [ ] Trasy generujące procesy potomne (`/api/mcp/`, `/api/cli-tools/runtime/`) sklasyfikowane jako `isLocalOnlyPath()` w `src/server/authz/routeGuard.ts` — patrz [Twarda reguła #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Brak zwiastunów AI/bot `Co-authored-by` w komunikatach zatwierdzeń (twarda reguła #16) współpracownicy —, których praca jest ponownie wykorzystywana, otrzymują standardowe zwiastuny `Co-authored-by: Name <email>`

---

## Wydawanie wersji

Wydania są zarządzane za pomocą przepływu pracy `/generate-release`. Po utworzeniu nowego wydania GitHub pakiet jest **automatycznie publikowany w npm** za pośrednictwem GitHub Actions.

W przypadku wdrożeń na VPS użyj `npm run build:release` (zamiast `npm run build`) — polecenie wykonuje czystą
przebudowę, przygotowuje pakiet w katalogu `dist/` i zapisuje plik kontrolny `dist/BUILD_SHA`.
Następnie użyj umiejętności `/deploy-vps-*-cc`, które synchronizują katalog `dist/` zdalnie za pomocą rsync do katalogu `app/`.

---

## Uzyskiwanie pomocy

- **Architektura**: Zobacz [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Dokumentacja API**: Zobacz [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Dokumentacja bezpieczeństwa**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Dokumentacja operacyjna**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Zgłoszenia**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
