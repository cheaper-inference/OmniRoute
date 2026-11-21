# Database Schema & Operations Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute używa **SQLite z dziennikiem WAL** jako głównego magazynu danych oraz szyfrowania **AES-256-GCM** dla poufnych pól przechowywanych na dysku. Ten przewodnik obejmuje schemat, migracje, tworzenie i przywracanie kopii zapasowych oraz procedury operacyjne.

**Źródła:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tabel bazowych)
- `src/lib/db/migrationRunner.ts` — wersjonowane migracje
- `src/lib/db/migrations/` — 167 wersjonowanych plików SQL
- `src/lib/db/encryption.ts` — funkcje pomocnicze szyfrowania
- `src/lib/db/backup.ts` — eksport/import kopii zapasowych
- `src/lib/db/healthCheck.ts` — diagnostyka stanu

---

## Dlaczego SQLite?

OmniRoute wybrał SQLite zamiast PostgreSQL/MySQL z kilku powodów:

| Czynnik            | SQLite                                               | PostgreSQL                                        |
| ------------------ | ---------------------------------------------------- | ------------------------------------------------- |
| **Wdrożenie**      | Wbudowana — bez oddzielnego serwera                  | Wymaga skonfigurowania serwera                    |
| **Szyfrowanie**    | Warstwa aplikacji (AES-256-GCM)                      | Wbudowane TDE                                     |
| **Wydajność**      | Szybsza dla małych/średnich obciążeń                 | Lepsza przy ogromnej liczbie równoległych zapisów |
| **Współbieżność**  | Tryb WAL umożliwia równoległe odczyty                | Pełne MVCC                                        |
| **Kopia zapasowa** | Kopia pojedynczego pliku                             | `pg_dump` lub migawka systemu plików              |
| **Zastosowanie**   | Instalacja dla jednego użytkownika, system wbudowany | Wielodostępny SaaS                                |

W przypadku wdrożeń przeznaczonych dla **jednego użytkownika i jednej instancji** (głównego zastosowania OmniRoute) SQLite jest prostszy i szybszy.

### Dziennik WAL

`core.ts` otwiera bazę danych w **trybie WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL umożliwia **równoległe odczyty** podczas zapisu — jest to ważne dla panelu, który wykonuje zapytania w trakcie rejestrowania żądań.

Domyślny rozmiar pamięci podręcznej wynosi **65 536 KiB (64 MiB)**. SQLite interpretuje ujemną wartość
`cache_size` jako przybliżony górny limit w KiB i przydziela strony na żądanie.
Ustawienie **Ustawienia > System i pamięć masowa > Rozmiar pamięci podręcznej** przyjmuje wartości całkowite od **1 do
1 000 000 KiB**; zapisanie ustawienia powoduje zastosowanie go do aktywnego połączenia z bazą danych,
a OmniRoute przywraca zapisaną wartość podczas uruchamiania.

---

## Lokalizacja bazy danych

Plik SQLite jest przechowywany w następującej lokalizacji:

| System operacyjny | Ścieżka                                                          |
| ----------------- | ---------------------------------------------------------------- |
| Linux             | `~/.omniroute/storage.sqlite`                                    |
| macOS             | `~/.omniroute/storage.sqlite`                                    |
| Windows           | `%USERPROFILE%\.omniroute\storage.sqlite`                        |
| Docker            | `/app/data/storage.sqlite` (konfigurowalne za pomocą `DATA_DIR`) |

Pliki towarzyszące:

- `storage.sqlite-wal` — dziennik zapisu wyprzedzającego
- `storage.sqlite-shm` — plik pamięci współdzielonej
- `call_logs/` — artefakty danych żądań (jeśli włączono)

**Zmiana lokalizacji:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Architektura modułów domenowych

Baza danych OmniRoute obejmuje **110 modułów TypeScript najwyższego poziomu** w katalogu `src/lib/db/`. Każdy moduł domenowy:

- Jest właścicielem co najmniej jednej konkretnej tabeli
- Eksportuje typowane funkcje CRUD
- Nigdy nie uzyskuje dostępu do tabel innego modułu
- Używa funkcji `getDbInstance()` z pliku `core.ts`, aby uzyskać dostęp do bazy danych

### 110 modułów DB najwyższego poziomu

OmniRoute zawiera **110 plików TypeScript najwyższego poziomu** w katalogu `src/lib/db/`. Poniżej przedstawiono przykładowe moduły podstawowe; pełna lista znajduje się w wykazie zawartości katalogu:

| Moduł                   | Tabele                                                         | Odpowiedzialność                                                                  |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Rejestrowanie dostawców oraz danych uwierzytelniających OAuth/kluczy API          |
| `models.ts`             | `key_value` (dane modeli)                                      | Definicje modeli, możliwości, ceny                                                |
| `combos.ts`             | `combos`                                                       | Konfiguracje routingu kombinacji i ich kolejność                                  |
| `apiKeys.ts`            | `api_keys`                                                     | Cykl życia kluczy API, zakresy uprawnień, śledzenie limitów                       |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Konfiguracja systemu i współdzielony magazyn KV                                   |
| `backup.ts`             | —                                                              | Operacje eksportowania/importowania kopii zapasowych                              |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Konfiguracje serwerów proxy i reguły routingu                                     |
| `prompts.ts`            | `prompt_templates`                                             | Szablony promptów wielokrotnego użytku i wersjonowanie                            |
| `webhooks.ts`           | `webhooks`                                                     | Subskrypcje webhooków sterowane zdarzeniami oraz dzienniki                        |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Rejestrowanie audytowe poszczególnych żądań (opcjonalne, duży wolumen)            |
| `domainState.ts`        | `domain_*` (5 tabel)                                           | Budżety domen, wyłączniki awaryjne, blokady, łańcuchy rezerwowe, historia kosztów |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Klucze API z listy dozwolonych dla MCP/A2A                                        |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historyczne wykorzystanie limitów                                                 |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mapowanie modeli na domyślne kombinacje                                           |
| `cliToolState.ts`       | `cli_tool_state`                                               | Trwały stan specyficzny dla CLI                                                   |
| `encryption.ts`         | —                                                              | Funkcje pomocnicze do szyfrowania/odszyfrowywania pól                             |
| `readCache.ts`          | —                                                              | Pamięć podręczna w pamięci operacyjnej dla operacji z dużą liczbą odczytów        |
| `secrets.ts`            | `key_value` (zaszyfrowane wpisy)                               | Przechowywanie zaszyfrowanych sekretów                                            |
| `stateReset.ts`         | —                                                              | Czyszczenie/resetowanie stanu bazy danych na potrzeby testów                      |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Kontekst sesji na potrzeby przekazywania zadań między agentami                    |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Śledzenie użycia                                                                  |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfiguracja kompresji                                                            |

### Granice modułów

Podstawowa reguła architektoniczna: **moduły nie uzyskują bezpośredniego dostępu do tabel innych modułów**. Aby pracować z danymi innego modułu, należy zaimportować funkcję z tego modułu.

```ts
// ❌ ŹLE: bezpośrednie zapytanie SQL do tabeli innego modułu
db.prepare("SELECT * FROM provider_connections").all();

// ✅ DOBRZE: użycie funkcji modułu providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Przestrzeganie tej reguły jest egzekwowane podczas przeglądu kodu — nie istnieje kontrola statyczna, ale naruszenia są oznaczane.

---

## Schemat bazowy (17 tabel)

`core.ts` definiuje 17 tabel bazowych w `SCHEMA_SQL`. Są one tworzone przez migrację `001_initial_schema.sql` i stanowią główny schemat.

### Główne tabele (tworzone podczas migracji początkowej)

| Tabela                     | Przeznaczenie                                | Kluczowe kolumny                                                        |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Dane uwierzytelniające dostawcy (szyfrowane) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informacje o routingu węzłów dostawcy        | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Ogólny magazyn klucz-wartość                 | `namespace`, `key`, `value`                                             |
| `combos`                   | Definicje kombinacji routingu                | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Klucze API dla bramy                         | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadane bazy danych                         | `key`, `value`                                                          |
| `usage_history`            | Rekordy wykorzystania żądań                  | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Dane żądań i odpowiedzi                      | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Dzienniki żądań proxy                        | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Łańcuchy model–dostawca                      | `model`, `chain`                                                        |
| `domain_budgets`           | Budżety wydatków dla poszczególnych domen    | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Historia resetowania budżetów                | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Śledzenie kosztów dla poszczególnych domen   | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Stan limitowania częstotliwości dla domen    | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Stan wyłącznika awaryjnego dla każdej domeny | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Pamięć podręczna odpowiedzi LLM              | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historyczne migawki limitów                  | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Dodatkowe tabele (dodane przez późniejsze migracje)

Kolejne migracje dodają między innymi następujące tabele:

- `cli_tool_state` (migracja 011) — stan narzędzia CLI
- tabele `mcp_*` — audyt serwera MCP
- tabele `a2a_*` — stan zadań A2A
- tabele `usage_*` — śledzenie wykorzystania
- tabele `plugin_*` — system wtyczek
- `skill_executions` — historia wykonywania umiejętności
- tabele `memory_*` — system pamięci
- tabele `compression_*` — system kompresji
- tabele `webhook_*` — dziennik dostarczania webhooków
- tabele `acp_*` — Agent Client Protocol
- tabele `oneproxy_*` — platforma handlowa 1proxy
- `proxy_assignments` — powiązania zakresów proxy
- `detailed_call_artifacts` — metadane artefaktów dziennika wywołań
- `quota_alert_history` — audyt alertów dotyczących limitów
- `command_code_auth_sessions` — sesje OAuth Command Code

Pełna lista ponad 30 tabel znajduje się w `src/lib/db/migrations/`.

---

## Migracje

OmniRoute używa** wersjonowane, idempotentne migracje** w `src/lib/db/migrations/`. Każda migracja to pojedynczy plik SQL. Współistnieją dwa formaty nazewnictwa; wersja zapisana w `_omniroute_migrations` jest przedrostkiem numerycznym.

### Nazewnictwo migracji

| Format                                          | Przykład                             | Używany do                                                                                                                                                                  |
| ----------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (dokładnie 3 cyfry)       | `241_seen_models.sql`                | Stara seria `001`–`241`. Zawieszone po wylądowaniu formatu znacznika czasu (`240` i `241` zostały połączone tuż przed nim): żaden nowy plik nie otrzymuje numeru kolejnego. |
| `YYYYMMDDHHMMSS_description.sql` (14 cyfr, UTC) | `20261113120000_add_usage_index.sql` | Każda migracja utworzona od 13.11.2026 r.                                                                                                                                   |

Dlaczego zmiana: w przypadku numerów kolejnych równoległe PRs wybrało ten sam następny numer i wszystkie oprócz jednego musiały przenumerować przed połączeniem. Znacznik czasu UTC nadaje każdemu PR własną wersję.

Reguły formatu znacznika czasu (wymuszone przez `npm run check:migration-numbering`, współdzielone z generatorem w `scripts/check/lib/migrationNaming.mjs`):

- Znacznik czasu to prawdziwa data i godzina UTC, nie wcześniejsza niż `20261113000000` i nie późniejsza niż 10 minut w przyszłości.
- Opis pisany jest małymi literami `snake_case` i zaczyna się od litery (`a-z`, `0-9`, pojedyncze `_` między słowami), maksymalnie 80 znaków.
- Dwa pliki z tym samym znacznikiem czasu są duplikatami.
- Zasada braku przerw dotyczy tylko starej serii: musi istnieć każda liczba od `001` do `241`, z wyjątkiem znanych luk `026`, `055` i `121`. Usunięcie `241` (lub dowolnego starego pliku) kończy się niepowodzeniem. `001` i `241` nie można nigdy dodać do listy dozwolonych `KNOWN_GAPS`. Pliki ze znacznikiem czasu nigdy nie tworzą luki.
- Każdy wpis w `src/lib/db/migrations/` musi być zwykłym plikiem z poprawną nazwą `.sql` małymi literami. Katalog, dowiązanie symboliczne, plik `.SQL` lub `.sql.bak`, plik ukryty lub nazwa ze spacją nie przepuszczają bramki, ponieważ biegacz pominąłby je po cichu lub zawiesił się podczas uruchamiania.

**Zastosuj zamówienie.** Moduł uruchamiający sortuje według wartości numerycznej przedrostka, a nie według tekstu: najpierw stare pliki `001`–`241`, następnie pliki ze znacznikami czasu w kolejności znacznika czasu, a następnie dowolne katalogi z przestrzenią nazw zarejestrowane w `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (wersje takie jak `ee-001`). Oczekująca migracja to dowolny plik, którego wersji nie ma w `_omniroute_migrations`, więc migracja ze starszej gałęzi, która łączy się po nowszej, nadal obowiązuje w istniejących bazach danych.

**Znacznik czasu oznacza kolejność tworzenia, a nie kolejność scalania.** Jeśli Twoja migracja zależy od tabeli lub kolumny utworzonej w wyniku migracji za pomocą pliku** nowszy** znacznik czasu (na przykład jeden z innego PR, który połączył się jako pierwszy), świeża baza danych uruchomiłaby twoją jako pierwszą i zakończyłaby się niepowodzeniem. Gdy PR jest nadal otwarty, wygeneruj ponownie nazwę pliku za pomocą `npm run db:new-migration`, aby otrzymał nowszy znacznik czasu lub uniezależnij go. `npm run test:migrations:fresh` stosuje każdą migrację do pustej bazy danych i wychwytuje to.

### Scalona migracja nigdy nie jest usuwana ani zmieniana jej nazwa

Gdy plik migracji znajdzie się w gałęzi wydania lub `main`, będzie już działał w bazach danych homologów i deweloperów, podczas instalacji VPS i synchronizacji korporacyjnej. Od tego momentu:

- **Nigdy go nie usuwaj.** Świeże instalacje stracą swój schemat, podczas gdy uaktualnione bazy danych go zachowają.
- **Nigdy nie zmieniaj nazwy.** Wersja w `_omniroute_migrations` nie będzie już pasować do pliku, więc każda baza danych, która już ją zastosowała, uruchomi ją ponownie. Nie-idempotentny SQL następnie duplikuje dane lub zatrzymuje rozruch.
- **Potrzebujesz innego schematu?** Utwórz nową migrację za pomocą `npm run db:new-migration`.

Zmiana nazwy jest bezpieczna tylko dla pliku, który nie został jeszcze scalony, o czym mówią wskazówki dotyczące bramki. Znacznik wydania nic tutaj nie zmienia: każde wypchnięcie do gałęzi `release/v*` publikuje obraz Docker `:next` i działa na homologu, instalacjach VPS i synchronizacji korporacyjnej, więc scalona migracja została uruchomiona na prawdziwych bazach danych, zanim istnieje jakikolwiek tag `vX.Y.Z`. Brama kończy się niepowodzeniem przy każdym usunięciu pliku podstawowego, oznaczonego lub nie.

- **Wycofywanie scalonej migracji.** `git revert`, która usuwa plik, nie spełnia bramy. Zachowaj plik i cofnij jego schemat w nowej migracji: `npm run db:new-migration -- <description>`, z `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` i tak dalej. Uaktualnione i świeże bazy danych kończą się wówczas tym samym schematem.
- **Ta zaakceptowana zmiana nazwy: wpis dotyczący zgodności i identyczna treść.** Jeśli scalony plik musi zostać przeniesiony (na przykład dwa połączone pliki mają ten sam znacznik czasu, a program uruchamiający zatrzymuje się z powodu kolizji wersji), zmień nazwę późniejszego pliku bez dotykania jego SQL i dodaj `{ fromVersion, fromName, toVersion, toName }` do `RENAMED_MIGRATION_COMPATIBILITY` w `src/lib/db/migrationRunner/constants.ts`. W bazach danych, które zastosowały starą wersję, wiersze `_omniroute_migrations` są przenoszone, zamiast ponownie uruchamiać plik. Brama ostrzega o takiej zmianie nazwy i zawsze przeprowadza na niej kontrolę komutacji, niezależnie od nowego znacznika czasu: świeże instalacje stosują plik w nowej pozycji, zaktualizowane bazy danych nie, więc wybierz nowy znacznik czasu w pobliżu starego. Zmiana nazwy bramy nie powiedzie się, jeśli treść uległa zmianie (zmiana schematu nadal dotyczy nowej migracji) lub jeśli pliku docelowego wpisu nie ma na dysku.
- **Nigdy nie zmieniaj nazwy w tym samym znaczniku czasu.** Zmiana nazwy, która zachowuje znacznik czasu i zmienia tylko opis, nie spełnia warunku, z wpisem lub bez. W przypadku wpisu, którego `toVersion` jest równy jego `fromVersion`, moduł uruchamiający usuwa stary wiersz `_omniroute_migrations` i ponownie stosuje plik w każdej bazie danych, która już go uruchomiła. Bez wpisu moduł uruchamiający śledzi tylko wersję: pomija plik w tych bazach danych (nowa zawartość nigdy się tam nie uruchamia) i rejestruje błąd zmiany numeracji przy każdym uruchomieniu. Użyj innego znacznika czasu i wpisu dotyczącego zgodności lub zachowaj nazwę.
- **Brama sprawdza, czy plik o zmienionej nazwie nie uruchamia się ponownie.** Dla każdej objętej zmiany nazwy bramka przekazuje nową nazwę pliku do kontroli komutacji za pomocą `--must-not-apply`. Kontrola uruchamia zaktualizowaną bazę danych przy użyciu prawdziwego modułu uruchamiającego i jeśli moduł uruchamiający ponownie zastosuje ten plik (na przykład dlatego, że wpis ma złą wersję lub nazwę, lub ponieważ parser tekstu bramki odczytuje `constants.ts` inaczej niż TypeScript), bramka kończy się niepowodzeniem podczas wykonywania `migration renomeada rodaria de novo` i prosi o sprawdzenie starych i nowych wersji oraz nazw wpisu.

### Co brama sprawdza w stosunku do podstawy

Podczas żądania ściągnięcia i uruchomienia kolejki scalania `npm run check:migration-numbering` porównuje `src/lib/db/migrations/` na dysku z tym samym katalogiem w gałęzi podstawowej. Podstawą jest, w następującej kolejności: `--base-latest-tag`, `--base <ref>`, zmienna `MIGRATION_BASE_REF` lub, gdy `GITHUB_EVENT_NAME` to `pull_request`, `pull_request_target` lub `merge_group`, pierwszy rodzic zatwierdzenia scalającego, `merge_group.base_sha` ładunku zdarzenia lub `git merge-base HEAD origin/$GITHUB_BASE_REF`. W przypadku żądania ściągnięcia lub uruchomienia kolejki scalania bez rozpoznawalnej podstawy bramka kończy się niepowodzeniem. Poza CI bez `--base` wypisuje `comparação com a base: pulada (sem --base)` i pomija te reguły.

`--base-latest-tag` porównuje się z najnowszym tagiem wydania (`vX.Y.Z` w kolejności semver; tagi z sufiksami, takie jak nightlies nie liczą się), który jest w historii `HEAD`, z tymi samymi zasadami co `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) uruchamia bramę w ten sposób, ponieważ push i zaplanowane uruchomienia nie mają podstawy żądań ściągnięcia, a połączenie może nastąpić bez nowego uruchomienia CI. Bez znacznika wydania w historii bramka kończy się niepowodzeniem; uruchom `git fetch --tags` (w CI, `actions/checkout` z `fetch-depth: 0` przynosi tagi).

| Zmień żądanie ściągnięcia                                                                                                       | Wynik                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zmieniana jest nazwa pliku istniejącego w bazie, z wpisem `RENAMED_MIGRATION_COMPATIBILITY`                                     | **Ostrzeżenie** jeśli treść jest identyczna, a kontrola komutacji przebiega niezależnie od nowego znacznika czasu; kończy się niepowodzeniem, jeśli nowa pozycja zmieni ostateczny schemat (cofnij zmianę nazwy lub wybierz inny nowy znacznik czasu, do którego dojeżdża) lub jeśli moduł uruchamiający ponownie zastosuje plik o zmienionej nazwie w zaktualizowanej bazie danych.** Nie udaje się** jeśli treść uległa zmianie. |
| Nazwa pliku istniejącego w bazie zostanie zmieniona z zachowaniem znacznika czasu (zmieni się tylko opis)                       | **Nie udaje się** , z wpisem lub bez: biegacz zastosuje go ponownie (z wpisem) lub pominie według wersji (bez wpisu). Użyj innego znacznika czasu i wpisu dotyczącego zgodności lub zachowaj nazwę.                                                                                                                                                                                                                                |
| Plik istniejący w bazie zostanie usunięty lub zmieniona jego nazwa bez wpisu                                                    | **Nie udaje się** , niezależnie od tego, czy plik znajduje się w znaczniku wydania. Aby to cofnąć, przywróć plik za pomocą `git checkout <base> -- src/lib/db/migrations/<file>`; aby przywrócić schemat, dodaj nową migrację za pomocą `DROP ... IF EXISTS`.                                                                                                                                                                      |
| Plik istniejący w bazie ma inną zawartość                                                                                       | **Ostrzeżenie** (adnotacja `::warning` w akcjach GitHub ) i uruchamiana jest kontrola komutacji. Nie powiedzie się, jeśli edycja zmieni ostateczny schemat, ponieważ zaktualizowane bazy danych nie zastosują ponownie edytowanego pliku: umieść zmianę w nowej migracji. Nieszkodliwa edycja (komentarz, `IF NOT EXISTS`) tylko ostrzega.                                                                                         |
| Dodawany jest plik ze znacznikiem czasu, którego znacznik czasu nie jest nowszy niż najnowszy w bazie                           | Uruchamia kontrolę komutacji opisaną poniżej.                                                                                                                                                                                                                                                                                                                                                                                      |
| Dodawany jest plik `NNN_` w starym formacie z numerem poniżej najnowszego pliku w starym formacie bazy                          | **Nie udaje się** , nawet jeśli `KNOWN_GAPS` jest edytowane w tym samym żądaniu ściągnięcia: stara seria jest zamrożona, utwórz migrację za pomocą `npm run db:new-migration`. Akceptowane są pliki w starym formacie znajdujące się nad najnowszym plikiem bazy (żądanie ściągnięcia `release/v*` do `main` ).                                                                                                                    |
| Plik w niewłaściwej kolejności, edytowany lub o zmienionej nazwie zawiera instrukcje `INSERT`, `UPDATE`, `DELETE` lub `REPLACE` | **Ostrzeżenie** : kontrola komutacji nie porównuje danych, więc sprawdź, czy kolejność stosowania zaktualizowanych i świeżych baz danych zmienia wynik.                                                                                                                                                                                                                                                                            |

Jedno uruchomienie kontroli komutacji obejmuje łącznie pliki nie w kolejności, pliki edytowane i pliki o zmienionych nazwach.

Kontrola komutacji (`scripts/check/migration-commutation.ts`) tworzy dwie tymczasowe bazy danych z rzeczywistą ścieżką instalacji: an** ulepszony** jeden (uruchom z podstawowymi migracjami, a następnie uruchom ponownie z tego samego pliku z migracjami żądania ściągnięcia) i** świeży** jeden (jeden rozruch z migracją żądania ściągnięcia). Porównuje wynikowe schematy: tabele i kolumny (ignorując kolejność kolumn), ograniczenia UNIQUE / PRIMARY KEY i FOREIGN KEY, znormalizowany tekst `CREATE TABLE` każdej tabeli (który obejmuje ograniczenia CHECK, zestawienia, wygenerowane kolumny i opcje tabeli), indeksy, wyzwalacze i widoki. Dane wierszy nie są porównywane. Jeśli są zgodne, bramka drukuje, że plik jest nie w porządku, ale dojeżdża do pracy i przechodzi. Jeśli się różnią, bramka zawiedzie z różnicą i wskazówką dla przypadku: w przypadku pliku niew porządku należy ponownie wygenerować jego nazwę za pomocą `npm run db:new-migration`, co jest bezpieczne, ponieważ plik nie jest jeszcze scalony; w przypadku edytowanego pliku bazowego przywróć zawartość bazową i umieść zmianę w nowej migracji; w przypadku pliku o zmienionej nazwie cofnij zmianę nazwy lub wybierz inny nowy znacznik czasu w miejscu dojazdu, nigdy ten sam znacznik czasu z inną nazwą. Jeśli samo sprawdzenie nie może zostać wykonane, brama kończy się niepowodzeniem w CI i ostrzega tylko lokalnie. W przypadku edytowanego pliku podstawowego zaktualizowana baza danych jest tworzona z zawartości podstawowej tego pliku, a drugie uruchomienie pomija ją, ponieważ jej wersja jest już zarejestrowana. W przypadku pliku o zmienionej nazwie tworzona jest zaktualizowana baza danych z plikiem pod jego starą nazwą, a podczas drugiego rozruchu wiersz `_omniroute_migrations` jest przesuwany przez wpis dotyczący zgodności, zamiast uruchamiać go ponownie; brama przekazuje nową nazwę za pomocą `--must-not-apply`, więc sprawdzenie kończy się niepowodzeniem, jeśli zastosuje ją drugi rozruch. Jeśli migracja żądania ściągnięcia nie powiedzie się na zaktualizowanej ścieżce, to znaczy po każdej migracji podstawowej (niezależnie od tego, czy zakończy się ona niepowodzeniem również w przypadku świeżej instalacji), brama zgłasza `migration do PR não aplica` i prosi o naprawienie SQL zgodnie z bieżącym schematem bazy; jeśli plik zależy od innej migracji żądania ściągnięcia z późniejszym znacznikiem czasu, wygeneruj ponownie jego nazwę za pomocą `npm run db:new-migration`.

Aby przeprowadzić to samo porównanie lokalnie, przekaż jawnie bazę, na przykład `npm run check:migration-numbering -- --base origin/<base-branch>` lub `npm run check:migration-numbering -- --base-latest-tag` aby porównać z najnowszą wersją.

### Konwersja migracji `NNN` otwartego PR

Żądanie ściągnięcia otwarte przed przełącznikiem może nadal zawierać plik sekwencyjny, taki jak `242_add_widgets.sql`. Stare numery powyżej `241` są odrzucane, więc przekonwertuj je przed połączeniem:

1. **Zmień nazwę pliku za pomocą generatora, zachowując opis.** Uruchom `npm run db:new-migration -- <same description>`, aby uzyskać nową nazwę, przenieś do niego SQL i usuń stary plik `NNN_`. Opis musi pozostać identyczny: pasuje do niego poniższy wpis dotyczący zgodności.
2. **Dodaj wpis dotyczący zgodności, jeśli trwała baza danych korzystała ze starego numeru.** Jeśli jakakolwiek przechowywana baza danych (homolog, VPS, własna instalacja współautora) uruchomiła kompilację PR z plikiem `NNN_`, dodaj `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` do `RENAMED_MIGRATION_COMPATIBILITY` w `src/lib/db/migrationRunner/constants.ts`. To jest** wymagane dla `237` do `241`** : te sloty zawierają teraz kanoniczne `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` i `241_seen_models.sql`, a bez wpisu taka baza danych na zawsze pomija migrację kanoniczną i ponownie uruchamia przekonwertowaną. Działa to również w przypadku szczeliny, która pozostaje pusta, na przykład `242`, gdy miejscem docelowym jest znacznik czasu. W razie wątpliwości dodaj wpis. Miejsce, w którym dodasz go do tablicy, nie ma znaczenia: gdy w docelowym slocie wpisu nadal znajduje się wiersz, który odsuwa się inny wpis (na przykład `237` przechowuje wiersz PR podczas gdy starszy wiersz `usage_history_calculated_cost` czeka na przejście do `237`), moduł uruchamiający pozwala temu wpisowi poczekać, aż slot będzie wolny. Tylko prawdziwy konflikt, taki jak miejsce zajmowane przez rząd, w którym nie ma ruchu, lub dwa wpisy zamieniające się miejscami, powoduje zatrzymanie rozruchu za pomocą `Cannot reconcile ...`.
3. **Zachowaj idempotent SQL** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), ponieważ przekonwertowana migracja może spotkać się z bazą danych, w której jej schemat już istnieje.
4. **Przenieś specjalne przypadki z kluczem wersji.** Jeśli PR dodała przypadek dla swojego starego numeru w `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) lub w `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), zmień klucz na nowy znacznik czasu.

`tests/unit/db/codex-fence-migration-rename.test.ts` jest działającym przykładem testu migracji ze zmienioną nazwą.

### Backporty do oddziałów przed zmianą

Nigdy nie wybieraj wiśniowo ani nie przenoś pliku `YYYYMMDDHHMMSS_` do gałęzi poprzedzającej przełącznik (na przykład starsza gałąź `release/v*` ). Znajdujący się tam moduł uruchamiający sortuje nazwy plików jako tekst, więc plik ze znacznikiem czasu będzie działał pomiędzy `201_` i `202_` w nowej bazie danych, a stara brama nie obsługuje 14-cyfrowych prefiksów. W takiej gałęzi zapisz zmianę jako następny plik `NNN_` tej gałęzi, idempotentny, więc nie będzie to możliwe, gdy wersja ze znacznikiem czasu pojawi się później.

### Jak przebiegają migracje

Przy uruchomieniu `migrationRunner.ts`:

1. Tworzy tabelę `_omniroute_migrations`, jeśli nie istnieje
2. Zapytania dotyczące już zastosowanych migracji
3. Stosuje nowe migracje w kolejności, każda w ramach transakcji
4. Rejestruje każdą zastosowaną migrację ze znacznikiem czasu

```ts
// src/lib/db/migrationRunner.ts (simplified)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Idempotencja

Migracje muszą być** idempotentny** — uruchomienie ich dwukrotnie powinno być nieskuteczne:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Używaj klauzul `IF NOT EXISTS`, `IF EXISTS` i `OR IGNORE` / `OR REPLACE` swobodnie.

### Dodanie nowej migracji

1. **Utwórz plik za pomocą generatora** : `npm run db:new-migration -- <description>` (na przykład `npm run db:new-migration -- add combo priority`). Zapisuje `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` z bieżącym czasem UTC i nagłówkiem komentarza, przesuwa się o jedną sekundę do przodu, jeśli ten znacznik czasu jest zajęty i nigdy nie nadpisuje pliku. Nie wybieraj numeru ręcznie.
2. **Używaj bezpiecznego DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Uważnie uzupełnij dane** : użyj `UPDATE ... WHERE ...` do obsługi istniejących wierszy
4. **Sprawdź kolejność i nazewnictwo** : `npm run test:migrations:fresh` (wszystkie migracje w pustej bazie danych) i `npm run check:migration-numbering`
5. **Przetestuj na kopii** : nigdy nie uruchamiaj nieprzetestowanych migracji na platformie produkcyjnej
6. **Tabela utworzona na podstawie kodu również wymaga migracji** : jeśli moduł również tworzy tabelę leniwie (`CREATE TABLE IF NOT EXISTS`, przechowywana jako ścieżka samonaprawy), migracja musi ją utworzyć z tym samym DDL. W przeciwnym razie czysta instalacja i uaktualniona instalacja kończą się różnymi schematami, w zależności od tego, czy działała ta ścieżka kodu. `tests/unit/db/lazy-table-migration-guard.test.ts` skanuje `src/` i `open-sse/` i kończy się niepowodzeniem na leniwym `CREATE` bez migracji (#20557). Przykład: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Przykład:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Zmiany niekompatybilne wstecz** (np. upuszczenie kolumn) jest trudne. OmniRoute czy NOT obsługuje niższą wersję — po zastosowaniu migracji, zmiana schematu jest trwała. Zaplanuj odpowiednio.

---

## Szyfrowanie danych przechowywanych

Pola poufne (klucze API, tokeny OAuth, parametry połączenia) są szyfrowane podczas przechowywania za pomocą algorytmu **AES-256-GCM**.

### Jak to działa

```ts
// src/lib/db/encryption.ts (uproszczony)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Gdzie jest używane

- `provider_connections.api_key` — szyfrowane na poziomie aplikacji
- `provider_connections.access_token`, `refresh_token`, `id_token` — szyfrowane na poziomie aplikacji
- Wpisy `key_value` z `namespace = "secrets"` — szyfrowane na poziomie aplikacji
- `proxy_registry.auth` — szyfrowane na poziomie aplikacji (jeśli występuje)

### Klucz szyfrowania

Klucz szyfrowania jest wyprowadzany z **hasła** (ustawianego za pomocą zmiennej środowiskowej `STORAGE_ENCRYPTION_KEY`) oraz **soli** (przechowywanej w bazie danych). Obie wartości są wymagane do odszyfrowania danych.

```bash
# Wygeneruj bezpieczne hasło
openssl rand -hex 32

# Ustaw w pliku .env
STORAGE_ENCRYPTION_KEY=<twój-klucz>
```

> **Krytyczne**: Utrata klucza szyfrowania oznacza utratę dostępu do wszystkich zaszyfrowanych danych. **Utwórz kopię zapasową klucza oddzielnie od bazy danych**.

### Co NIE jest szyfrowane

Ze względów wydajnościowych następujące dane są przechowywane w postaci jawnego tekstu:

- Nazwy wyświetlane dostawców
- Definicje modeli (są już publiczne)
- Reguły routingu
- Rekordy użycia (nie zawierają danych osobowych)

---

## Uwagi dotyczące szyfrowania (v3.8.16+)

OmniRoute używa funkcji **`migrateLegacyEncryptedString()`**, aby w sposób niewidoczny obsługiwać dwa schematy szyfrowania:

- **Starszy** (sprzed v3.5.0): „szyfrowanie” oparte na XOR (nie jest to prawdziwa kryptografia)
- **Obecny**: AES-256-GCM z prawidłowym wektorem IV i tagiem uwierzytelniającym

Funkcja pomocnicza migracji wykrywa starszy format i przy pierwszym odczycie ponownie szyfruje dane przy użyciu nowego schematu. Oznacza to, że można zaktualizować starą bazę danych bez utraty danych uwierzytelniających.

---

## Pamięć podręczna odczytu

W przypadku często odczytywanych danych (modeli, dostawców, ustawień) plik `readCache.ts` zapewnia **pamięć podręczną w pamięci operacyjnej**:

```ts
// Buforowane podczas uruchamiania, unieważniane przy zapisie
const providers = await getCachedProviders(); // Szybkie, z pamięci operacyjnej
const fresh = await listProviders(); // Wolne, odczytuje z bazy danych
```

| Buforowana encja       | Klucz pamięci podręcznej | TTL               |
| ---------------------- | ------------------------ | ----------------- |
| `models`               | `models:v1`              | Do momentu zapisu |
| `provider_connections` | `providers:v1`           | Do momentu zapisu |
| `settings`             | `settings:v1`            | Do momentu zapisu |
| `combos`               | `combos:v1`              | Do momentu zapisu |

Pamięć podręczna jest unieważniana przy każdym zapisie do odpowiedniej tabeli.

---

## Tworzenie i przywracanie kopii zapasowych

### Ręczne tworzenie kopii zapasowej

```bash
# Użyj interfejsu CLI, aby utworzyć lokalną kopię zapasową
omniroute backup create --name pre-migration

# Lub za pośrednictwem API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Plik kopii zapasowej zawiera:

- Wszystkie tabele bazy danych (serializowane do formatu JSON)
- Artefakty dziennika wywołań (zakodowane w formacie base64, opcjonalne)
- Ustawienia i dane poufne (zaszyfrowane)
- Konfigurację wtyczek

### Przywracanie

```bash
# Za pośrednictwem CLI
omniroute restore pre-migration

# Za pośrednictwem API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Ostrzeżenie**: Przywracanie nadpisuje całą bazę danych. Najpierw zatrzymaj wszystkich klientów.

### Automatyczne kopie zapasowe

```bash
# Włącz automatyczne codzienne kopie zapasowe za pośrednictwem CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Harmonogram jest wykonywany po stronie serwera przez zadanie działające w tle, które uruchamia się co 30 sekund
(domyślnie) i sprawdza wyrażenie cron względem lokalnego czasu serwera.

| Zmienna                                     | Wartość domyślna | Opis                                                                                                                             |
| ------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`          | Interwał uruchamiania w ms (min. `5000`). Musi być krótszy niż 60 s, aby niezawodnie trafić w pasującą minutę harmonogramu cron. |

### Kopia zapasowa działającej bazy SQLite

Aby utworzyć kopię zapasową działającej bazy danych bez przestojów:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Wykorzystuje to internetowy interfejs API kopii zapasowych SQLite — można go bezpiecznie używać podczas działania OmniRoute.

---

## Strojenie wydajności

### Tryb WAL

WAL jest domyślnie włączona. W przypadku obciążeń wymagających dużego zapisu należy rozważyć:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute nie ustawia `journal_size_limit`. Punkt kontrolny przenosi ramki WAL do pliku głównego, ale plik WAL zachowuje największy przydzielony rozmiar. Strażnik `OMNIROUTE_WAL_GUARD_MAX_MB` tylko ostrzega i uruchamia `wal_checkpoint(RESTART)`; nie jest to ograniczenie rozmiaru dysku.

### Indeksy

Kluczowe indeksy wydajności (tworzone automatycznie przez migracje):

- `idx_models_provider` — wyszukiwanie modeli według dostawcy
- `idx_combo_targets_combo_id` — rozszerzenie celu kombi
- `idx_usage_history_api_key_timestamp` — analiza użytkowania
- `idx_quota_snapshots_api_key_window` — śledzenie limitów
- `idx_call_logs_timestamp` — zapytania do dziennika połączeń

Aby dodać nowy indeks, utwórz migrację:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Mapowane w pamięci I/O

W przypadku bardzo dużych baz danych (> 10 GB) mapowanie pamięci można dostosować za pomocą SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Zagęszczanie

Długotrwałe instancje OmniRoute korzystają z okazjonalnych `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Uruchamiaj co miesiąc w okresach o małym natężeniu ruchu. (tryb WAL zmniejsza potrzebę, ale jej nie eliminuje.)

---

## Kontrola kondycji

Plik `src/lib/db/healthCheck.ts` udostępnia **diagnostykę kondycji na poziomie bazy danych**:

Obie metody wymagają uwierzytelnienia (w przeciwnym razie zwracany jest kod `401`). Metoda `GET` wykonuje tylko diagnostykę, natomiast `POST` uruchamia tę samą kontrolę z włączoną opcją `autoRepair`.

```bash
GET  /api/db/health   # diagnostyka
POST /api/db/health   # diagnostyka + naprawa
```

Odpowiedzią jest obiekt `DbHealthCheckResult` utworzony przez funkcję `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Limity domen odwoływały się do kluczy API, które już nie istnieją.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Pole              | Znaczenie                                                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | Ma wartość `true`, gdy `issues` jest puste. Pole `driver` nigdy nie wpływa na tę wartość.                                                                                                         |
| `issues[].type`   | Jedna z wartości: `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                                |
| `repairedCount`   | Liczba wierszy naprawionych podczas tego uruchomienia; zawsze `0`, gdy `autoRepair` ma wartość false.                                                                                             |
| `backupCreated`   | Określa, czy przed naprawą utworzono kopię zapasową.                                                                                                                                              |
| `checkedAt`       | Znacznik czasu ISO wspólny dla uruchomienia oraz dla każdej zapisanej przez nie notatki dotyczącej naprawy.                                                                                       |
| `driver.name`     | Sterownik SQLite obsługujący sprawdzaną bazę danych.                                                                                                                                              |
| `driver.degraded` | Ma wartość `true`, gdy zapisy nie są trwale przechowywane w pliku bazy danych — w przypadku awaryjnego sterownika WASM `sql.js` (trwałość całego pliku) lub bazy danych przechowywanej w pamięci. |

Ten sam ładunek jest zwracany przez narzędzie MCP `omniroute_db_health_check`.

Uruchom `PRAGMA integrity_check`, aby wykryć uszkodzenia:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Powinno zostać wyświetlone: ok
```

Jeśli zostanie zwrócone cokolwiek innego niż `ok`, **natychmiast przestań używać bazy danych** i przywróć ją z kopii zapasowej.

---

## Odzyskiwanie po awarii

### Scenariusz 1: Utrata pliku WAL

Brakuje pliku `-wal`, ale plik `-shm` i główna baza danych są nienaruszone:

```bash
# Automatyczne odzyskiwanie przy następnym otwarciu
omniroute
```

Jeśli SQLite nie może automatycznie odzyskać danych:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenariusz 2: Uszkodzenie pliku głównej bazy danych

Przywróć z kopii zapasowej:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` jedynie pobiera pełne archiwum `.tar.gz` z działającego serwera
(`GET /api/db-backups/exportAll`, wymagane poświadczenia operatora); nie przywraca żadnych danych.

### Scenariusz 3: Utrata klucza szyfrowania

**Odzyskanie danych bez klucza nie jest możliwe**. Zaszyfrowane pola są nieczytelne. Dodaj ponownie ręcznie wszystkich dostawców, używając nowych poświadczeń.

> **Ograniczenie ryzyka**: Zawsze twórz osobną kopię zapasową klucza szyfrowania, najlepiej w menedżerze haseł lub systemie KMS.

### Scenariusz 4: Zapełnienie dysku

SQLite będzie zwracać błędy `SQLITE_FULL`. Zwolnij miejsce na dysku, a następnie wykonaj:

```bash
# Wykonaj punkt kontrolny WAL, aby zwolnić miejsce
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Typowe operacje

### Sprawdzanie tabeli

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Liczenie wierszy we wszystkich tabelach

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Resetowanie (usuwanie) wszystkich danych

```bash
# Najpierw zatrzymaj OmniRoute
omniroute stop

# Usuń plik bazy danych
rm ~/.omniroute/storage.sqlite*

# Uruchom ponownie (zostanie utworzona pusta baza danych)
omniroute
```

Aby wykonać reset **selektywny** (zachować dostawców, usunąć dane dotyczące użycia):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Eksportowanie pojedynczej tabeli

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Rozwiązywanie problemów

### „Baza danych jest zablokowana”

Inny proces utrzymuje blokadę zapisu. Możesz:

- Poczekać na zakończenie innego procesu (sprawdź za pomocą `lsof | grep storage.sqlite`)
- Zakończyć inny proces
- Jeśli problem nie ustępuje, uruchomić ponownie OmniRoute

### „Naruszono ograniczenie klucza obcego”

Moduł domeny narusza integralność referencyjną. Sprawdź:

- Osierocone wiersze w tabelach zależnych
- Kaskadowe usunięcia, które nie zostały rozpropagowane
- Ostatnią migrację, która zmieniła klucz obcy

Uruchom `PRAGMA foreign_key_check;`, aby znaleźć naruszenia.

### „Brak pamięci”

Operacje wejścia/wyjścia SQLite mapowane w pamięci przekraczają limit systemu operacyjnego. Zmniejsz limit za pomocą dyrektywy pragma SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128 MB zamiast 256 MB
```

Możesz też wyłączyć tę funkcję:

```sql
PRAGMA mmap_size = 0;
```

### „Migracja nie powiodła się w trakcie wykonywania”

Migracja została wykonana w ramach transakcji, dlatego jej zmiany powinny zostać wycofane. Jeśli tak się nie stało:

1. **Zatrzymaj OmniRoute** (aby zapobiec kolejnym próbom)
2. **Sprawdź stan bazy danych** za pomocą `sqlite3`
3. **Ręcznie napraw** częściowo wykonaną migrację
4. **Uruchom ponownie** OmniRoute (migracja zostanie ponowiona)

Aby temu zapobiec, zawsze najpierw testuj migracje na kopii bazy danych.

---

## Zobacz także

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabele użycia
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monitorowanie stanu
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — proces wydawania wersji
- Źródło: `src/lib/db/` (ponad 80 plików, około 25 tys. wierszy kodu)
