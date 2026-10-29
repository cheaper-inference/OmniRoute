# Log export (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Ciągły, przyrostowy eksport dzienników wywołań OmniRoute do zewnętrznego magazynu analitycznego.

Karta panelu Dzienniki przechowuje historię żądań w SQLite (`call_logs`), której rozmiar jest ograniczony przez
rotację i retencję. Eksport dzienników wysyła ten sam zestaw rekordów zgodnie z harmonogramem, dzięki czemu mogą one być przechowywane
dłużej niż w lokalnej bazie danych i łączone z innymi danymi. BigQuery jest pierwszym miejscem docelowym;
potok korzysta z rejestru, więc można do niego dodawać kolejne miejsca docelowe.

---

## 1. Jak to działa

```
serwer (odszyfrowanie i walidacja konfiguracji, uzgodnienie kursora)
  → uruchomienie IPC → izolowany proces systemowy exportChild
    → storage.sqlite tylko do odczytu → współdzielone zapytanie/mapowanie dziennika wywołań
      → asynchroniczne pobieranie artefaktów → docelowe prepare()/send()
        → wsadowe IPC → serwer utrwala kursor → potwierdzenie przez IPC
          → następna partia; komunikat done przez IPC → serwer rejestruje powodzenie
```

- **Harmonogram** — jedno zadanie cron `JobRegistry`, `log_export`, domyślnie `0 * * * *` (co godzinę,
  UTC). Rejestrowane w `src/lib/initCloudSync.ts`; można je nadpisać za pomocą `OMNIROUTE_LOG_EXPORT_CRON`.
  Każde uruchomienie przetwarza kolejno wszystkie **włączone** miejsca docelowe.
- **Kursor** — niejawne `call_logs.rowid` SQLite, utrwalane osobno dla każdego miejsca docelowego w
  `log_export_destinations.cursor_row_id`. `timestamp` celowo nie jest kursorem: wywołujący
  mogą podać własną wartość, więc wolne żądanie może zostać zapisane po szybszym żądaniu, które
  rozpoczęło się później, a kursor oparty na znaczniku czasu by je pominął.
- **Przetwarzanie wsadowe** — `batch_size` wierszy na żądanie (domyślnie 500), `max_rows_per_run` wierszy na uruchomienie
  (domyślnie 10000), dzięki czemu duża zaległość jest przetwarzana w ciągu kilku cykli zamiast blokować jeden z nich.
- **Dostarczanie** — kursor przesuwa się dopiero po zakończeniu `send()`. Nieudana partia pozostawia
  kursor bez zmian, więc te same wiersze są ponawiane przy następnym uruchomieniu. Gwarancją jest
  dostarczenie co najmniej raz oraz deduplikacja po stronie miejsca docelowego, a nie faktyczne dostarczenie dokładnie raz: BigQuery przypisuje każdemu
  wierszowi klucz na podstawie identyfikatora dziennika wywołań, który uwzględnia w miarę możliwości w obrębie własnego okna deduplikacji.
- **Ochrona przed nakładaniem się uruchomień** — cykl cron i `POST .../run` mogą zostać uruchomione jednocześnie. Miejsce docelowe,
  które jest już przetwarzane, zostaje pominięte zamiast przetwarzane dwukrotnie (`skipped: true` w wyniku uruchomienia),
  dzięki czemu równoległe uruchomienie nie może ponownie wysłać partii ani cofnąć kursora.
- **Odzyskiwanie po wyczyszczeniu** — jeśli `cursor_row_id` znajdzie się powyżej `MAX(rowid)` (cała tabela została
  wyczyszczona, a identyfikatory wierszy zaczęły się od nowa), mechanizm wykonawczy cofa kursor do 0, zamiast trwale przestać wykrywać dane.

### Izolowany mechanizm wykonawczy i limity

Każde uruchomienie miejsca docelowego w środowisku Node rozpoczyna osobny, krótkotrwały proces potomny systemu operacyjnego (`child_process`
z IPC, a nie `worker_threads`). Odczyty treści, parsowanie/serializacja JSON ładunku, docelowe
`prepare()` oraz sieciowe operacje wejścia/wyjścia miejsca docelowego są wykonywane w tym procesie, a nie w pętli zdarzeń serwera.
Przez IPC przesyłane są wyłącznie konfiguracja i niewielkie komunikaty o postępie; eksportowane rekordy nigdy nie wracają do
serwera. Zadanie cron i trasa Uruchom teraz zachowują ten sam publiczny wynik oraz ochronę przed nakładaniem się uruchomień.

Proces potomny otwiera rozpoznany przez serwer plik `DATA_DIR/storage.sqlite` tylko do odczytu za pomocą `node:sqlite`,
z ustawieniami `busy_timeout=5000` i `query_only=ON`. Nie importuje żadnego singletonu bazy danych i nie wykonuje
migracji, kopii zapasowych ani aktualizacji SQLite. Obsługa brakujących/uszkodzonych artefaktów (w tym
operacja UPDATE uszkodzonego artefaktu) pozostaje wyłącznie w ścieżce szczegółów panelu. Obie ścieżki korzystają ze wspólnego, czystego
mechanizmu rozpoznawania szczegółów; eksport używa asynchronicznych odczytów systemu plików oraz tej samej kolejności rozpoznawania:
artefakt → starsza treść wbudowana → starszy zapis na dysku → brak. Uruchomienie wykonuje migawkę maksymalnego identyfikatora wiersza wstawienia,
gdy proces potomny otwiera czytnik; późniejsze wstawienia czekają do następnego uruchomienia. Jest to granica
wstawiania, a nie długotrwała transakcja SQLite: procesy zapisujące WAL i punkty kontrolne mogą działać swobodnie podczas
oczekiwania na operacje sieciowe. Aktualizacje/usunięcia istniejących wierszy nie są zamrażane przez tę granicę.

Po każdej zaakceptowanej partii proces potomny czeka na potwierdzenie. Serwer najpierw utrwala
kursor za pomocą `advanceLogExportCursor`, a następnie wysyła `ack`; przedtem nie rozpoczyna się następna partia.
Błąd wysyłania, awaria lub przekroczenie limitu czasu powodują zarejestrowanie niepowodzenia bez przesunięcia kursora dla tej partii. Wcześniej
potwierdzone partie pozostają zatwierdzone; ponownie wysłana może zostać co najwyżej jedna niepotwierdzona partia.
Powodzenie jest rejestrowane dopiero po otrzymaniu `done` i prawidłowym zakończeniu procesu potomnego. W razie niepowodzenia proces potomny
jest kończony sygnałem SIGTERM, a po 500 ms następuje eskalacja do SIGKILL; mechanizm wykonawczy czeka na zamknięcie procesu.

| Zmienna środowiskowa                          | Wartość domyślna | Przeznaczenie                                      |
| --------------------------------------------- | ---------------- | -------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000           | Limit czasu rzeczywistego dla miejsca docelowego   |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024             | Limit starej przestrzeni V8 procesu potomnego w MB |

Nieprawidłowe, niedodatnie lub niecałkowite wartości są zastępowane wartościami domyślnymi. Ustawienie sterty nie stanowi całkowitego
limitu RSS; bardzo duże partie nadal mogą wyczerpać pamięć procesu potomnego i spowodować bezpieczne niepowodzenie uruchomienia.
Domyślne 1024 MB pozostawia zapas dla domyślnej partii 500 wierszy z artefaktami o rozmiarze 512 KiB i
włączonymi treściami, wliczając serializację JSON BigQuery dzieloną na fragmenty bajtowe. Nie sprawia to, że
partia 10000 wierszy z treściami jest bezpieczna. Wyczerpanie sterty V8 powoduje zarejestrowanie błędu ze wskazaniem rozwiązania: należy zmniejszyć rozmiar
partii lub zwiększyć `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursor pozostaje na ostatniej
potwierdzonej partii. Historyczne treści wbudowane/na dysku nie są objęte współczesnym limitem artefaktów.
Operatorzy muszą osobno zaplanować zużycie RSS, szczególnie wewnątrz kontenerów z ograniczoną pamięcią.

Proces potomny dziedziczy wyłącznie rozpoznane `DATA_DIR`, `NODE_ENV`, jawnie ustawione `TZ` (rozpoznawanie czasu lokalnego
w starszych nazwach plików), `ELECTRON_RUN_AS_NODE`, jeśli jest obecne, oraz następujące parametry połączeń wychodzących:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (oraz ich warianty zapisane małymi literami),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Globalny dyspozytor Undici współdzieli z serwerem czyste rozpoznawanie serwera proxy na podstawie środowiska oraz reguły
omijania dla hostów lokalnych, w tym `NO_PROXY`; nie importuje `proxyFetch.ts` ani jego flag bazy danych/funkcji.
Dane uwierzytelniające serwera proxy są usuwane z przekazywanych danych wyjściowych i rejestrowanych błędów. Dane uwierzytelniające miejsca docelowego
są przesyłane wyłącznie w pojedynczym komunikacie startowym IPC, nigdy w argv ani w środowisku; przekazywane dane wyjściowe/błędy
otrzymują prefiks i są oczyszczane. W argumentach wykonania procesu potomnego wyłączone jest tylko `ExperimentalWarning`, aby uniknąć
powtarzania ostrzeżenia Node dotyczącego SQLite przy każdym uruchomieniu cron; pozostałe typy ostrzeżeń pozostają widoczne.

Moduły miejsc docelowych muszą być możliwe do zaimportowania bez zależności od Next.js ani zależności dostępnych wyłącznie po stronie serwera. Istniejąca
implementacja BigQuery już spełnia ten wymóg. Pamięci podręczne tokenów dostępu działają tylko przez czas
uruchomienia procesu potomnego, a nie pomiędzy uruchomieniami. Obsługiwanym środowiskiem uruchomieniowym jest Node (`package.json` engines), jednak sekcja
instalacji Bun w README oraz `Dockerfile.bun` również deklarują ścieżkę zgodności produkcyjnej korzystającą z
`bun:sqlite` (`src/lib/db/core.ts` / adaptery). Dlatego w środowisku Bun eksport zachowuje poprzednią
ścieżkę wewnątrzprocesową i jednorazowo wyświetla ostrzeżenie: izolacja sterty i limitu czasu za pomocą procesu potomnego jest niedostępna. Używaj
Node do izolacji pętli zdarzeń i błędów OOM; Bun nie jest tutaj traktowany jako środowisko wyłącznie deweloperskie.

Gdy włączono `includeBodies`, preferuj harmonogram z dokładnością do minuty, na przykład
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, zamiast gromadzenia przez godzinę zaległych ładunków.
Limity partii i wierszy nadal ograniczają każde uruchomienie. Koszt uruchomienia procesu jest ponoszony osobno dla każdego miejsca docelowego podczas każdego uruchomienia;
oznacza to niewielki koszt uruchomienia w zamian za izolację pętli zdarzeń serwera, a nie zmniejszenie całkowitego wykorzystania CPU.

### Ładunki (prompty i odpowiedzi)

Domyślnie eksport zawiera tylko pola podsumowania widoczne na **liście** dzienników. Włączenie opcji
**Eksportuj prompty i odpowiedzi** (`includeBodies`) powoduje dodatkowo wysłanie danych widocznych w panelu
**szczegółów** dziennika dla każdego wywołania:

| Pole                             | Zawartość                                                                           |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| `request_body` / `response_body` | Ładunki wywołania w postaci wyświetlanej przez panel                                |
| `pipeline_route_decision`        | Cel i model wybrane przez router                                                    |
| `pipeline_client_request`        | Surowe żądanie dokładnie w postaci wysłanej przez klienta                           |
| `pipeline_openai_request`        | Żądanie po przekształceniu do wewnętrznego formatu OpenAI                           |
| `pipeline_provider_request`      | Żądanie faktycznie wysłane do usługi nadrzędnej, w dialekcie dostawcy               |
| `pipeline_provider_response`     | Surowa odpowiedź usługi nadrzędnej                                                  |
| `pipeline_client_response`       | Dane przekazane z powrotem wywołującemu                                             |
| `pipeline_error`                 | Szczegóły błędu na poziomie potoku dla nieudanego wywołania                         |
| `bodies_truncated`               | Wartość prawdziwa, gdy którekolwiek z powyższych pól osiągnęło limit `maxBodyBytes` |

Są to treści promptów, dlatego funkcja jest **domyślnie wyłączona** i celowo konfigurowana osobno dla każdego miejsca docelowego.
Wysyłane są dane widoczne w panelu, ponieważ eksport i `getCallLogById` współdzielą mechanizm
ustalania szczegółów: ładunki są
już oczyszczone z danych osobowych i mają zamaskowane sekrety w chwili zapisu, a wywołanie wykonane za pomocą klucza API
`noLog` nie zapisuje żadnego ładunku, więc nie ma czego eksportować.

Ładunki są odczytywane osobno dla każdego wiersza z artefaktu w systemie plików, dlatego hydracja jest wykonywana tylko dla miejsc docelowych,
które jej zażądały. W przypadku brakującego lub uszkodzonego artefaktu eksportowane jest jego podsumowanie z pustymi ładunkami,
zamiast przerywania partii i blokowania kursora.

`maxBodyBytes` (domyślnie 262144) ogranicza rozmiar każdego pola. Dłuższe ładunki są **obcinane, a nie
odrzucane** — skrócony prompt nadal pozwala ustalić „o co zapytano” — a wiersz jest oznaczany polem
`bodies_truncated`. Delty przesyłane strumieniowo fragment po fragmencie nie są eksportowane; złożona odpowiedź znajduje się już
w `pipeline_provider_response` i `pipeline_client_response`.

---

## 2. Pliki

| Element                                     | Lokalizacja                                  |
| ------------------------------------------- | -------------------------------------------- |
| Kontrakt miejsca docelowego                 | `src/lib/logExport/types.ts`                 |
| Rejestr                                     | `src/lib/logExport/registry.ts`              |
| Obsługa sekretów                            | `src/lib/logExport/secrets.ts`               |
| Proces wykonawczy (nadrzędny IPC)           | `src/lib/logExport/runner.ts`                |
| Cykl życia procesu                          | `src/lib/logExport/childRunner.ts`           |
| Punkt wejścia procesu potomnego             | `src/lib/logExport/exportChild.ts`           |
| Moduł otwierający w trybie tylko do odczytu | `src/lib/db/logExportReadOnly.ts`            |
| Wspólne zapytania/mapowanie                 | `src/lib/usage/callLogExportQueries.ts`      |
| Mechanizm rozwiązywania szczegółów          | `src/lib/usage/callLogDetailResolver.ts`     |
| Projekcja API                               | `src/lib/logExport/presenter.ts`             |
| Miejsce docelowe BigQuery                   | `src/lib/logExport/destinations/bigquery.ts` |
| Uwierzytelnianie konta usługi Google        | `src/lib/logExport/googleServiceAccount.ts`  |
| Źródło rejestru wywołań                     | `src/lib/usage/callLogExportSource.ts`       |
| Trwałe przechowywanie                       | `src/lib/db/logExportDestinations.ts`        |
| Zadanie cron                                | `src/lib/jobs/logExportJob.ts`               |
| Warstwa REST                                | `src/app/api/log-export/`                    |
| Strona panelu                               | `src/app/(dashboard)/dashboard/log-export/`  |

Schemat: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Wszystkie trasy wymagają uwierzytelnienia zarządzającego (`requireManagementAuth`). Sekrety nigdy nie są zwracane:
zapisany sekret jest zwracany jako literał `__stored__`, a przesłanie tej wartości z powrotem podczas aktualizacji
zachowuje zapisane dane uwierzytelniające.

Utworzenie lub aktualizacja miejsca docelowego, którego typ deklaruje sekret, **wymaga
`STORAGE_ENCRYPTION_KEY`**. Bez niego `encrypt()` po cichu przepuszcza dane bez zmian, dlatego zapis
jest odrzucany z kodem 400 zamiast umieszczenia danych uwierzytelniających w SQLite jako zwykłego tekstu (jest to takie samo zabezpieczenie,
jakie stosuje webhook Telegrama).

| Metoda   | Ścieżka                                  | Przeznaczenie                                                                 |
| -------- | ---------------------------------------- | ----------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Typy miejsc docelowych i lista ich pól konfiguracji                           |
| `GET`    | `/api/log-export/destinations`           | Wyświetlenie miejsc docelowych (sekrety ukryte)                               |
| `POST`   | `/api/log-export/destinations`           | Utworzenie miejsca docelowego                                                 |
| `GET`    | `/api/log-export/destinations/{id}`      | Odczyt jednego miejsca docelowego                                             |
| `PUT`    | `/api/log-export/destinations/{id}`      | Aktualizacja nazwy / stanu włączenia / konfiguracji / przetwarzania wsadowego |
| `DELETE` | `/api/log-export/destinations/{id}`      | Usunięcie                                                                     |
| `POST`   | `/api/log-export/destinations/{id}/test` | Sprawdzenie danych uwierzytelniających bez zapisywania                        |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Natychmiastowe opróżnienie kolejki, tą samą ścieżką co wykonanie zaplanowane  |
| `GET`    | `/api/log-export/status`                 | Stan cron, ostatnie wykonania, zaległości dla każdego celu                    |

`GET /api/log-export/types` sprawia, że interfejs użytkownika jest ogólny: formularz panelu jest renderowany na podstawie
zwróconych deskryptorów pól, dzięki czemu nowe miejsce docelowe nie wymaga zmiany interfejsu użytkownika.

---

## 4. Miejsce docelowe BigQuery

Klucze konfiguracji (`type: "bigquery"`):

| Klucz                | Uwagi                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| `projectId`          | Projekt GCP zawierający zbiór danych                                             |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                  |
| `tableId`            | `[A-Za-z0-9_]+`                                                                  |
| `location`           | Używane tylko wtedy, gdy trzeba utworzyć zbiór danych (domyślnie `EU`)           |
| `serviceAccountJson` | Klucz konta usługi. Sekret: szyfrowany w spoczynku, nigdy niezwracany            |
| `autoCreate`         | Utworzenie zbioru danych i tabeli podczas pierwszego eksportu (domyślnie `true`) |

Konto usługi wymaga uprawnienia `bigquery.tables.updateData` do tabeli docelowej, a także
`bigquery.datasets.create` / `bigquery.tables.create`, gdy `autoCreate` jest włączone.

Skonfigurowana partia jest jednostką **kursora**, a nie HTTP: `send()` dzieli ją na wywołania insertAll
obejmujące maksymalnie 500 wierszy, dzięki czemu duża wartość `batch_size` nie może przekroczyć limitu żądania BigQuery wynoszącego 10 MB.
Przejściowe statusy (408/429/500/502/503/504) są ponawiane maksymalnie trzy razy z wykładniczo rosnącym
opóźnieniem, przy ponownym użyciu tych samych insertIds; błędy uwierzytelniania i schematu powodują wyjątek przy pierwszej próbie,
zamiast zużywać całe wykonanie.

Tabela utworzona przed chwilą nie jest jeszcze widoczna dla punktu końcowego przesyłania strumieniowego, który przez
kilka sekund odpowiada kodem 404. Taka odpowiedź 404 jest ponawiana, ale **tylko wtedy, gdy tabela została utworzona podczas tego wykonania** —
rzeczywiście brakująca tabela nadal powoduje natychmiastowe niepowodzenie. Należy pamiętać, że ponowne utworzenie tabeli pod nazwą, która
została niedawno usunięta, sprawia, że BigQuery przez kilka minut odrzuca strumieniowe wstawianie danych; jest to
właściwość operacji usunięcia i ponownego utworzenia, dlatego zamiast usuwać i ponownie dodawać tabelę, lepiej użyć nowej nazwy.

**Częściowe niepowodzenie przychodzi jako HTTP 200 z niepustą tablicą `insertErrors[]`.** Jest ono traktowane jako
błąd i powoduje wyjątek, co zapobiega przesunięciu kursora poza wiersze, których BigQuery nigdy
nie przyjął; `tests/unit/log-export-bigquery.test.ts` utrwala to zachowanie.

Transport odbywa się przez zwykły REST — samodzielnie podpisana asercja RS256 jest wymieniana na token dostępu pod adresem
`https://oauth2.googleapis.com/token`, a następnie wiersze trafiają do `tabledata.insertAll`. Żaden pakiet SDK Google nie jest
dołączany. Tokeny dostępu są buforowane w ramach procesu dla każdej pary (konto usługi, zakres).

Utworzona tabela zawiera po jednej kolumnie dla każdego pola karty Logs oraz `exported_at` i jest zorganizowana pod kątem
rzeczywistego sposobu wykonywania zapytań do rejestrów wywołań:

- **Partycjonowanie dzienne według `timestamp`**, dzięki czemu zapytanie ograniczone według daty skanuje tylko te dni.
- **Klastrowanie według `api_key_name`, `provider`, `model`, `status`** (w tej kolejności), dzięki czemu filtrowanie według
  tego, kto uruchomił wywołanie, dokąd zostało skierowane lub czy zakończyło się niepowodzeniem, pomija bloki wewnątrz każdej partycji. BigQuery
  dopuszcza maksymalnie cztery kolumny klastrowania, a ich kolejność ma znaczenie: filtr obejmujący wyłącznie `api_key_name`
  umożliwia pomijanie, natomiast filtr obejmujący wyłącznie `status` — nie.
- **Opcjonalny okres przechowywania partycji** za pomocą `partitionExpirationDays` (0 zachowuje wszystko), stosowany
  podczas tworzenia tabeli.

Oba ustawienia są stosowane podczas tworzenia. Istniejąca tabela zachowuje swój dotychczasowy układ, dlatego
jeśli chcesz je zastosować, wskaż jako miejsce docelowe nowy identyfikator tabeli.

`tests/unit/log-export-bigquery.test.ts` sprawdza, czy mapper i schemat tabeli pozostają
zsynchronizowane, dzięki czemu nowa kolumna dziennika wywołań nie może zostać po cichu pominięta podczas eksportu.

Partie są dzielone zarówno według liczby wierszy, jak i liczby bajtów po serializacji. Sama liczba wierszy nie wystarcza,
gdy eksportowane są ładunki: 500 wierszy zawierających prompty może zajmować dziesiątki megabajtów, a insertAll
odrzuca żądania przekraczające 10 MB. Fragmenty są zamykane po osiągnięciu 500 wierszy lub 9 MB — w zależności od tego, co nastąpi wcześniej.

---

## 5. Miejsce docelowe śladów OTLP/HTTP

Konfiguracja używa `type: "otlp-http"`. Jest to zaplanowany eksport zapisanych
dzienników wywołań, oparty na kursorze, a nie mechanizm wysyłania zdarzeń routingu na żywo działający na zasadzie best effort w
`open-sse/services/routing/otel.ts`. Nie odczytuje ani nie zmienia zmiennych
środowiskowych, liczników czasu ani buforów tego mechanizmu. Włączenie obu może generować dwa niezależne rodzaje spanów;
do rozróżniania spanów dziennika wywołań używaj zakresu instrumentacji `omniroute.log-export`.

| Klucz                    | Wartość domyślna / przeznaczenie                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `endpoint`               | Wymagany pełny adres URL śladów HTTP(S); sufiks `/v1/traces` nie jest dopisywany         |
| `headers`                | Opcjonalne wiersze `Name: value` lub obiekt JSON z wartościami tekstowymi; szyfrowane    |
| `requestHeaderAllowlist` | Pusta (wyłączona); nazwy/prefiksy nagłówków klienta przechwytywanych jako atrybuty spanu |
| `serviceName`            | `omniroute`; atrybut zasobu `service.name`                                               |
| `langfuseMapping`        | `false`; dodaje atrybuty generowania/sesji/użytkownika Langfuse                          |
| `identity`               | `pseudonymous`, `keyName` lub `none`                                                     |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                  |
| `timeoutMs`              | `30000` na każdą próbę HTTP                                                              |
| `environment`            | Nieustawione; opcjonalne `langfuse.environment`                                          |

Ogólny panel wyświetla te pola. `paths` przyjmuje tablicę przez API lub pole tekstowe
z dokładnymi ścieżkami rozdzielonymi znakami nowego wiersza/przecinkami. Ścieżki embeddings, rerank i inne są
pomijane, chyba że zostaną jawnie dozwolone. Pominięte wiersze również przesuwają kursor; istniejące
liczniki `exported`/`exportedTotal` procesu wykonawczego zliczają przetworzone wiersze źródłowe, w tym wiersze odfiltrowane,
a nie zaakceptowane spany. Filtrowanie odbywa się w procesie potomnym, bez zmiany jego
kontraktu IPC/kursora.

Walidacja adresu URL używa funkcji pomocniczej `parseAndValidateNonMetadataUrl`, niewymagającej dostępu do bazy danych, z
`src/shared/network/outboundUrlGuard.ts`: zasady `block-metadata`. Stosuje ona te same
bezwarunkowe kontrole metadanych/protokołu/osadzonych danych uwierzytelniających co walidator webhooków z
włączoną obsługą prywatnych adresów URL, ale celowo zezwala na cele localhost/LAN bez globalnego
nadpisania flagi funkcji. Umożliwia to korzystanie z samodzielnie hostowanych endpointów Langfuse, Phoenix, Tempo i Collector,
w tym prywatnych endpointów HTTP. Hosty metadanych chmurowych są zawsze blokowane.
Przekierowania nie są obsługiwane, więc kolektor nie może przekierować danych uwierzytelniających do innego hosta.
Podobnie jak istniejący leksykalny mechanizm ochrony adresów URL, nie przypina to wyniku rozwiązywania DNS; konfiguruj wyłącznie
hosty kontrolowane przez operatora. Preferuj HTTPS, gdy endpoint nie znajduje się w zaufanej sieci.

### Dane i dostarczanie

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) przesyła jeden
span CLIENT na każdy dozwolony wiersz, nazwany zgodnie z dokładną ścieżką żądania. Nazewnictwo oparte na ścieżkach rozróżnia
Chat Completions, Responses i Messages bez umieszczania danych modelu ani tożsamości w
nazwie spanu. Atrybuty zasobu obejmują `service.name` i `service.version` pakietu.

Standardowy mechanizm rejestrowania prób czatu (`open-sse/handlers/chatCore/attemptLogging.ts`) zapisuje
`duration = Date.now() - startTime` po zakończeniu i nie podaje znacznika czasu;
`saveCallLogOperation` w `src/lib/usage/callLogs.ts` domyślnie ustawia znacznik czasu na moment zapisu
(zakończenia). Eksport ustawia więc koniec = znacznik czasu wiersza, a początek = koniec − czas trwania
(milisekundy przeliczone na nanosekundy w zapisie dziesiętnym). Historyczne znaczniki czasu dostarczone przez wywołującego
również są zachowywane jako czas zakończenia; nie ma znacznika rozróżniającego początek i zakończenie dla poszczególnych wierszy.
Czas trwania o wartości null staje się zerem. Nieprawidłowe lub brakujące znaczniki czasu powodują niepowodzenie całej partii zamiast tworzenia
niedeterministycznych spanów. `ttftMs` dopuszcza wartość null i jest mapowane na `omniroute.ttft_ms`.

Atrybuty obejmują `gen_ai.operation.name="chat"`, dostawcę, żądany/zwrócony model,
tokeny wejściowe/wyjściowe, opcjonalne tokeny odczytu z pamięci podręcznej/tworzenia pamięci podręcznej/rozumowania, status HTTP,
combo, źródło pamięci podręcznej, tag sesji i identyfikator korelacji. Całkowite wartości OTLP i znaczniki czasu
są ciągami znaków w zapisie dziesiętnym; ciągi znaków, wartości logiczne i liczby ułamkowe używają swoich natywnych wariantów wartości OTLP.
Spany błędów mają status ERROR i oczyszczony komunikat statusu. Rekord kanoniczny
nie zawiera adresu URL hosta nadrzędnego, więc `server.address` jest pomijany, zamiast błędnie
identyfikować kolektor jako serwer modelu. Koszt nie jest eksportowany.

Tylko `includeBodies=true` powoduje dołączenie treści. Przy `langfuseMapping=false`
`gen_ai.input.messages` / `gen_ai.output.messages` przenoszą oczyszczoną treść JSON żądania/odpowiedzi
w postaci zapisanej przez OmniRoute (kanonizowanej, gdy można ją sparsować), a nie przekształconą tablicę
wiadomości zgodną z konwencjami semantycznymi. Obcięte treści i treści inne niż JSON pozostają surowym tekstem. Przy `langfuseMapping=true`
treści są emitowane wyłącznie jako `langfuse.observation.input` / `langfuse.observation.output`;
atrybuty `gen_ai.*.messages` są pomijane, aby każda treść była wysyłana tylko raz. Oba tryby
dziedziczą `maxBodyBytes` z istniejącej ścieżki dołączania treści;
`omniroute.bodies_truncated=true` oznacza obcięcie.
To miejsce docelowe nie dodaje żadnych dodatkowych migawek potoku ani odczytów nieoczyszczonych artefaktów;
opcjonalne przechwytywanie nagłówków żądania korzysta z istniejącej, uzupełnionej migawki klienta opisanej poniżej.
Podczas eksportowania treści używaj harmonogramu o częstotliwości minutowej, takiego jak `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`,
zamiast gromadzić godzinne zaległości.

### Opcjonalne nagłówki żądań klienta

Przechwytywanie nagłówków jest **domyślnie wyłączone**. Ustaw `requestHeaderAllowlist` w konfiguracji miejsca docelowego
i włącz **Eksportuj prompty i odpowiedzi** (`includeBodies: true` w miejscu docelowym).
Lista dozwolonych nagłówków przyjmuje tablicę przez API lub pole tekstowe z nazwami rozdzielonymi znakami nowego wiersza/przecinkami:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Nazwy są dopasowywane dokładnie, bez uwzględniania wielkości liter, chyba że pojedynczy końcowy `*` wskazuje niepusty
prefiks nazwy nagłówka. Samotny `*`, symbole wieloznaczne wewnątrz nazwy oraz nieprawidłowe nazwy nagłówków HTTP są odrzucane.
Dozwolone są maksymalnie 64 selektory, każdy z nazwą lub prefiksem o długości najwyżej 256 bajtów ASCII.
To ustawienie jest niezależne od `headers`, które służy do uwierzytelniania eksportera w kolektorze.

Przechwytywanie odczytuje wyłącznie `pipeline_client_request`, wypełniane na podstawie
`clientRawRequest` (lub starszego `clientRequest`) z zapisanego szczegółowego potoku. Nigdy nie korzysta zastępczo z nagłówków żądania do dostawcy.
Szczegółowe rejestrowanie potoku musiało być włączone w momencie zapisywania żądania. Gdy
`includeBodies` jest wyłączone lub gdy brakuje pliku JSON migawki klienta albo jest on uszkodzony lub obcięty, żadne atrybuty
nagłówków nie są emitowane. Zwiększenie `maxBodyBytes` może zapobiec obcinaniu migawki podczas eksportu;
nie przywróci jednak szczegółów, które nigdy nie zostały zapisane. Migawka większa niż 1 MiB lub zawierająca ponad
256 wpisów nagłówków jest ignorowana. Dotychczasowy eksport promptów i odpowiedzi pozostaje włączony równolegle
z przechwytywaniem nagłówków; lista dozwolonych nagłówków nie udostępnia trybu odtwarzania wyłącznie nagłówków.

Wybrane wartości stają się tablicami ciągów znaków OTLP `http.request.header.<full lowercase header name>`,
nawet w przypadku pojedynczego ciągu. Na przykład `X-OmniRoute-Meta-Team: example-team` staje się
`http.request.header.x-omniroute-meta-team` z wartością
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Pełny prefiks zostaje zachowany: są to zwykłe nagłówki, bez parsowania pól biznesowych ani
konwersji na metadane `omniroute.metadata.*` / Langfuse. `langfuseMapping` nie zmienia semantyki
nagłówków. Wybrany nagłówek `User-Agent` z pojedynczą wartością ustawia również standardowy atrybut skalarny
`user_agent.original`. Przecinki wewnątrz jednej wartości nie powodują jej podziału. Warianty różniące się wielkością liter są scalane w kolejności
zapisanych wpisów; każdy nieprawidłowy wariant powoduje pominięcie całego nagłówka. Atrybuty są uporządkowane według nazw zapisanych małymi literami.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, nagłówki kluczy API, nazwy zawierające
znaczniki auth/token/secret/password/credential oraz wewnętrzne dane uwierzytelniające bramy są zawsze
wykluczane, nawet jeśli zostały wybrane lub częściowo zamaskowane w pamięci trwałej. Rozpoznawanie znanych wzorców danych uwierzytelniających wykorzystuje
wspólny detektor danych uwierzytelniających; znaczniki maskowania są pomijane, a nie eksportowane jako bezpieczne wartości.
Akceptowane są wyłącznie ciągi znaków i niepuste tablice ciągów znaków; liczby ani obiekty nie są konwertowane.
Nieprawidłowe nazwy, klucze prototypu, znaki sterujące (z wyjątkiem tabulatora poziomego) i nieprawidłowe sekwencje Unicode
są ignorowane bez przerywania przetwarzania partii ani ujawniania ich zawartości w błędach.

Każdy span przechwytuje najwyżej 32 nagłówki, 16 wartości na nagłówek, 4096 bajtów UTF-8 na wartość
oraz łącznie 16384 bajty UTF-8 we wszystkich przechwyconych nazwach i wartościach nagłówków. Zbyt duże lub nieprawidłowe nagłówki
są pomijane w całości, a nie obcinane. Wybór nagłówków jest decyzją operatora dotyczącą prywatności: nazwy wyglądające na bezpieczne
nadal mogą zawierać dane osobowe, a te limity i detektory nie są uniwersalnym narzędziem do usuwania danych umożliwiających identyfikację osób.

### Limity dostarczania

Żądania są ograniczone do 500 spanów i 4 MiB danych JSON w UTF-8, łącznie z otoczką.
Rozmiar każdego dozwolonego spanu jest sprawdzany przed pierwszym żądaniem w partii kursora. Pojedynczy
span przekraczający limit powoduje, że żadna część tej partii nie zostaje wysłana, a operacja kończy się błędem z zaleceniem zmniejszenia
`maxBodyBytes`; span nie jest po cichu pomijany. Kontrola wstępna zachowuje tylko odwołania do rekordów i
liczby bajtów, odrzucając każdy tymczasowy span i JSON; spany są odtwarzane dla fragmentów o ograniczonym rozmiarze
zamiast przechowywania drugiej zserializowanej kopii partii. W przypadku HTTP 408/429/5xx, błędów sieciowych i przekroczeń limitu czasu podejmowane są najwyżej
trzy próby, z wykładniczo rosnącym opóźnieniem 250/500 ms. Wartości `Retry-After` podane w sekundach lub jako daty HTTP
mogą wydłużyć opóźnienie do 5 sekund. Inne statusy powodują natychmiastowe niepowodzenie. Częściowe odrzucenie OTLP przy statusie 2xx również powoduje zgłoszenie wyjątku zamiast
potwierdzenia utraconego spanu; akceptowane są potwierdzenia puste lub zawierające prawidłowy JSON, przy
limicie odczytu odpowiedzi wynoszącym 64 KiB.

Błędy zawierają wyłącznie informacje pochodzące z eksportera: status HTTP, kategorię ponawiania, liczbę prób i liczbę wysłanych
spanów albo stałe komunikaty o błędzie potwierdzenia lub sieci. Treści odpowiedzi kolektora,
liczniki częściowego powodzenia i nagłówki odpowiedzi nigdy nie są kopiowane do błędów, dzienników ani
panelu. Partia zakończona niepowodzeniem lub zaakceptowana częściowo nie jest potwierdzana: miejsce docelowe pokazuje
stan niepowodzenia z danym statusem, kursor pozostaje na ostatniej potwierdzonej partii, a następne uruchomienie
ponownie wysyła te same wiersze. Trwałe statusy błędów powodują kolejne niepowodzenia do czasu naprawienia kolektora lub
konfiguracji. Szczegóły odpowiedzi można znaleźć w dziennikach samego kolektora. Podsumowania błędów w dzienniku wywołań zachowują
odrębny mechanizm maskowania.
`prepare()` nie tworzy żadnych zasobów; funkcja testowania wysyła metodą POST dokładnie `{"resourceSpans":[]}` i zgłasza
status HTTP bez zapisywania spanów dziennika wywołań.

Identyfikatory śladów i spanów to pierwsze 32/16 cyfr szesnastkowych skrótu SHA-256 obliczonego dla
`"omniroute.trace\0" + callLogId` oraz `"omniroute.span\0" + callLogId`. Ponowne wysyłki zawierają
identyczne identyfikatory. Nie gwarantuje to deduplikacji: niektóre systemy zaplecza, w tym mechanizm przyjmowania danych Langfuse
v4, nie deduplikują spanów o tym samym identyfikatorze. Awaria lub częściowe niepowodzenie wysyłania fragmentu może
spowodować ponowne wysłanie najwyżej jednej niepotwierdzonej partii kursora; zduplikowana może zostać cała ta partia,
a nie tylko jej ostatni fragment HTTP. Wybierając rozmiar partii kursora, należy uwzględnić ten kompromis.

### Przykład dla Langfuse

Skonfiguruj poniższe pola dla samodzielnie hostowanej instancji Langfuse:

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Utwórz lokalnie wartość Authorization jako zakodowany w Base64 dosłowny ciąg `public-key:secret-key`
(na przykład za pomocą `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Nie wklejaj rzeczywistych danych uwierzytelniających do dzienników, zrzutów ekranu ani zgłoszeń. Mapowanie automatycznie
ustawia `x-langfuse-ingestion-version: 4`; Authorization nadal jest podawane w `headers`.
Zarówno nagłówki, jak i wygenerowana sól tożsamości korzystają z istniejącego mechanizmu szyfrowanych pól tajnych
oraz symboli zastępczych API; wymagane jest `STORAGE_ENCRYPTION_KEY`.

Mapowanie dodaje typ/model generowania, szczegóły użycia w formacie JSON (wejście/wyjście/suma oraz dostępne
klucze pamięci podręcznej), migawki wejścia/wyjścia w formacie JSON, poziom ERROR/DEFAULT, oczyszczony komunikat o stanie,
nazwę śladu, identyfikator sesji, opcjonalne środowisko oraz umożliwiające filtrowanie
`langfuse.observation.metadata.<key>` dla dostawcy, żądanego modelu, ścieżki, kombinacji, źródła pamięci
podręcznej i stanu. `langfuse.observation.completion_start_time` ma format ISO 8601 i jest wyznaczany jako
czas rozpoczęcia + TTFT tylko wtedy, gdy TTFT jest znany i mieści się w czasie trwania. Atrybuty kosztów nie są wysyłane.

Tryby tożsamości dotyczą `langfuse.user.id`:

- `pseudonymous` (domyślny): HMAC-SHA256 wewnętrznego identyfikatora klucza API z losową,
  32-bajtową solą przypisaną do miejsca docelowego. Jeśli sól nie istnieje, jest generowana podczas tworzenia, szyfrowana
  jako `identitySalt`, nigdy nie jest zwracana i zostaje zachowana podczas edycji. Surowe identyfikatory kluczy nigdy nie
  trafiają do atrybutów spanów. Ponowne utworzenie lub rotacja soli miejsca docelowego zmienia tożsamości.
- `keyName`: skonfigurowana nazwa klucza API, celowo ujawniająca tę etykietę nadaną przez operatora.
- `none`: brak identyfikatora użytkownika. Tagi sesji nadal są eksportowane, jeśli występują; te tryby nie
  anonimizują dowolnej treści promptów ani etykiet sesji/korelacji podanych przez operatora.

### Rozpoczęcie bez uzupełniania danych historycznych

Wyłącznie podczas tworzenia włącz **Rozpocznij od bieżącej pozycji (pomiń istniejące logi)** lub przekaż
`startFromCurrentPosition: true` na najwyższym poziomie danych żądania API tworzącego zasób. Powoduje to ustawienie
`cursor_row_id` na bieżący maksymalny rowid w zachowanych logach wywołań przy użyciu istniejących funkcji pomocniczych
kursora, bez migracji. Wartość domyślna to false (kursor 0 i uzupełnianie zachowanej historii).
Nie jest to ustawienie resetujące kursor podczas aktualizacji.

Wspólne rozszerzenie o `ttftMs` dodaje również kolumnę `ttft_ms` dopuszczającą wartość null do mappera BigQuery
i schematu nowych tabel: test schematu wymaga, aby każde pole rekordu kanonicznego miało odpowiadającą mu
kolumnę. Eksport do istniejących tabel pozostaje bez zmian: `prepare()` odczytuje schemat tabeli i
pomija wyłącznie `ttft_ms`, gdy ta kolumna nie istnieje. Dodaj kolumnę typu INT64 dopuszczającą wartość null, aby uzyskać TTFT
przy następnym uruchomieniu, lub użyj nowej tabeli. Nie są wymagane żądania PATCH, automatyczne zmiany schematu ani dodatkowe
uprawnienia; wszystkie pozostałe pola wiersza nadal podlegają ścisłej kontroli zgodności ze schematem.

---

## 6. Dodawanie miejsca docelowego

1. Utwórz plik `src/lib/logExport/destinations/<name>.ts` eksportujący typ `LogExportDestinationType`:
   schemat Zod `configSchema`, tablicę deskryptorów `fields` dla interfejsu użytkownika, `secretFields` oraz
   funkcję `createClient(config)` zwracającą `test()` / `prepare()` / `send(records)`.
2. Dodaj go do tablicy `DESTINATIONS` w pliku `src/lib/logExport/registry.ts`.
3. Napisz testy w katalogu `tests/unit/`.

To cała zmiana: mechanizmy trwałego przechowywania, zadanie cron, warstwa REST, szyfrowanie sekretów i
formularz w panelu administracyjnym korzystają z rejestru.

Dwie zasady dotyczące nowego miejsca docelowego:

- `send()` **musi zgłaszać wyjątek** w przypadku częściowego niepowodzenia. Pomyślne zakończenie oznacza „miejsce docelowe zawiera te wiersze”,
  a kursor zostaje trwale przesunięty poza nie.
- Miejsce docelowe przyjmujące adres URL podany przez użytkownika musi przed pobraniem zweryfikować go za pomocą
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`),
  tak samo jak webhooki. BigQuery tego nie wymaga, ponieważ jego hosty są stałe.

---

## 7. Obsługa

- **Panel administracyjny**: Integracje → Eksport logów. Dodaj miejsce docelowe, uruchom **Test**, aby sprawdzić dane uwierzytelniające
  bez zapisywania wierszy, a następnie je włącz.
- **Zaległości**: każda karta miejsca docelowego pokazuje oczekujące wiersze i kursor; `GET
/api/log-export/status` zwraca te same dane oraz informacje o ostatnich 20 uruchomieniach zadania.
- **Awaria jednego miejsca docelowego nie powoduje awarii pozostałych** — podsumowanie uruchomienia zapisuje status każdego miejsca docelowego
  w `last_status` / `last_error`, a historia uruchomień zadania przechowuje dane zbiorcze.
- **Usunięcie miejsca docelowego powoduje usunięcie jego kursora.** Ponowne dodanie rozpoczyna eksport od najstarszego zachowanego
  logu wywołań, co powoduje ponowne wysłanie wierszy, które miejsce docelowe może już zawierać. W BigQuery identyfikator
  `insertId` przypisany do każdego wiersza zapobiega temu jedynie w ramach własnego okna deduplikacji BigQuery, dlatego zamiast usuwać
  miejsce docelowe, lepiej je wyłączyć.
