# Log export (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Ciągły, przyrostowy eksport dzienników wywołań OmniRoute do zewnętrznego magazynu analitycznego.

Karta Dzienniki w panelu przechowuje historię żądań w SQLite (`call_logs`), której rozmiar ograniczają
rotacja i retencja. Eksport dzienników wysyła ten sam zbiór rekordów zgodnie z harmonogramem, aby można było przechowywać go dłużej
niż w lokalnej bazie danych i łączyć z innymi danymi. Pierwszym miejscem docelowym jest BigQuery;
potok opiera się na rejestrze, więc kolejne miejsca docelowe można dodawać niezależnie.

---

## 1. Jak to działa

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Harmonogram** — jedno zadanie cron w `JobRegistry`, `log_export`, domyślnie `0 * * * *` (co godzinę,
  UTC). Rejestrowane w `src/lib/initCloudSync.ts`; można je nadpisać za pomocą `OMNIROUTE_LOG_EXPORT_CRON`.
  Każde wyzwolenie przetwarza kolejno wszystkie **włączone** miejsca docelowe.
- **Kursor** — niejawne pole `call_logs.rowid` w SQLite, zapisywane osobno dla każdego miejsca docelowego w
  `log_export_destinations.cursor_row_id`. Pole `timestamp` celowo nie jest kursorem: wywołujący
  mogą podawać własną wartość, więc wolne żądanie może zostać zapisane po szybszym, które rozpoczęło się
  później, a kursor oparty na znaczniku czasu by je pominął.
- **Przetwarzanie partiami** — `batch_size` wierszy na żądanie (domyślnie 500), `max_rows_per_run` wierszy na uruchomienie
  (domyślnie 10000), dzięki czemu duże zaległości są przetwarzane w kilku wyzwoleniach, zamiast blokować jedno.
- **Dostarczanie** — kursor przesuwa się dopiero po pomyślnym zakończeniu `send()`. Nieudana partia pozostawia
  kursor w dotychczasowym miejscu, więc te same wiersze są ponawiane przy następnym uruchomieniu. Gwarancją jest
  dostarczenie co najmniej raz oraz deduplikacja po stronie miejsca docelowego, a nie rzeczywiste dostarczenie dokładnie raz: BigQuery identyfikuje każdy
  wiersz za pomocą identyfikatora wpisu dziennika wywołań, który uwzględnia w miarę możliwości w ramach własnego okna deduplikacji.
- **Ochrona przed nakładaniem się uruchomień** — wyzwolenie cron i `POST .../run` mogą nastąpić jednocześnie. Miejsce docelowe,
  które jest już przetwarzane, zostaje pominięte zamiast być przetwarzane dwukrotnie (`skipped: true` w wyniku uruchomienia),
  więc równoległe uruchomienie nie może ponownie wysłać partii ani cofnąć kursora.
- **Odzyskiwanie po wyczyszczeniu danych** — jeśli `cursor_row_id` przekroczy `MAX(rowid)` (cała tabela została
  wyczyszczona, a wartości rowid zaczęły się od początku), mechanizm wykonawczy cofa kursor do 0, zamiast trwale przestać wykrywać dane.

### Izolowany mechanizm wykonawczy i limity

Każde uruchomienie eksportu do miejsca docelowego w Node uruchamia oddzielny, krótkotrwały proces potomny systemu operacyjnego (`child_process`
z IPC, a nie `worker_threads`). Odczyty treści, parsowanie i serializacja ładunku JSON, metoda
`prepare()` miejsca docelowego oraz sieciowe operacje wejścia/wyjścia miejsca docelowego odbywają się właśnie tam, a nie w pętli zdarzeń serwera.
Przez IPC przechodzą tylko konfiguracja i niewielkie komunikaty o postępie; eksportowane rekordy nigdy nie wracają
do serwera. Zadanie cron i trasa Uruchom teraz zachowują ten sam publiczny wynik oraz ochronę przed nakładaniem się uruchomień.

Proces potomny otwiera plik `DATA_DIR/storage.sqlite` ze ścieżki ustalonej przez serwer w trybie tylko do odczytu za pomocą `node:sqlite`,
z ustawieniami `busy_timeout=5000` i `query_only=ON`. Nie importuje singletonu bazy danych ani nie wykonuje
migracji, kopii zapasowych czy aktualizacji SQLite. Obsługa ewidencji brakujących/uszkodzonych artefaktów (w tym
aktualizacja UPDATE dotycząca uszkodzonego artefaktu) pozostaje wyłącznie w ścieżce szczegółów panelu. Obie ścieżki współdzielą czystą
funkcję rozwiązywania szczegółów; eksport korzysta z asynchronicznych odczytów systemu plików i tej samej kolejności wyszukiwania: artefakt → starsza
postać osadzona → starsza postać na dysku → brak. Uruchomienie utrwala maksymalną wartość rowid wstawionych rekordów
w chwili otwarcia czytnika przez proces potomny; późniejsze operacje wstawiania czekają na następne uruchomienie. Jest to granica
wstawiania, a nie długotrwała transakcja SQLite: procesy zapisujące WAL i punkty kontrolne mogą działać swobodnie podczas
oczekiwania na sieć. Ta granica nie zamraża aktualizacji ani usuwania istniejących wierszy.

Po każdej zaakceptowanej partii proces potomny czeka na potwierdzenie. Serwer najpierw zapisuje
kursor za pomocą `advanceLogExportCursor`, a następnie wysyła `ack`; wcześniej nie rozpoczyna się żadna następna partia.
Błąd wysyłania, awaria lub przekroczenie limitu czasu powodują zarejestrowanie niepowodzenia bez przesuwania kursora dla tej partii. Wcześniej
potwierdzone partie pozostają zatwierdzone; ponownie wysłana może zostać co najwyżej jedna niepotwierdzona partia.
Sukces jest rejestrowany dopiero po otrzymaniu `done` i prawidłowym zakończeniu procesu potomnego. W razie niepowodzenia proces potomny jest kończony
sygnałem SIGTERM, a po 500 ms sygnałem SIGKILL, zaś mechanizm wykonawczy czeka na zamknięcie procesu.

| Zmienna środowiskowa                          | Wartość domyślna | Przeznaczenie                                     |
| --------------------------------------------- | ---------------- | ------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000           | Limit czasu rzeczywistego na miejsce docelowe     |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024             | Limit obszaru old-space V8 procesu potomnego w MB |

Wartości nieprawidłowe, niedodatnie lub niecałkowite powodują użycie wartości domyślnych. Ustawienie sterty nie jest limitem całkowitego
RSS; bardzo duże partie nadal mogą wyczerpać pamięć procesu potomnego i bezpiecznie zakończyć uruchomienie niepowodzeniem.
Domyślne 1024 MB pozostawia zapas dla domyślnej partii 500 wierszy artefaktów o rozmiarze 512 KiB przy
włączonym eksportowaniu treści, z uwzględnieniem serializacji JSON w porcjach bajtowych stosowanej przez BigQuery. Nie sprawia to, że
partia 10000 wierszy z treścią staje się bezpieczna. Wyczerpanie sterty V8 powoduje zarejestrowanie błędu ze wskazówką działania: zmniejsz rozmiar
partii lub zwiększ `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursor pozostaje na ostatniej
potwierdzonej partii. Historyczne treści osadzone lub przechowywane na dysku nie są objęte współczesnym limitem rozmiaru artefaktów.
Operatorzy muszą osobno zaplanować budżet RSS, szczególnie w kontenerach z ograniczoną pamięcią.

Proces potomny dziedziczy wyłącznie rozwiązaną wartość `DATA_DIR`, `NODE_ENV`, jawnie ustawione `TZ` (ustalanie
czasu lokalnego dla starszego formatu nazw plików), `ELECTRON_RUN_AS_NODE`, jeśli jest obecne, oraz następujące ustawienia połączeń wychodzących:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (i ich odpowiedniki zapisane małymi literami),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Globalny dispatcher Undici korzysta z tych samych co serwer reguł ustalania proxy wyłącznie na podstawie zmiennych środowiskowych oraz omijania proxy
dla hostów lokalnych, w tym `NO_PROXY`; nie importuje `proxyFetch.ts` ani powiązanych z nim flag bazy danych i funkcji.
Dane uwierzytelniające proxy są maskowane w przekazywanych danych wyjściowych i rejestrowanych błędach. Dane uwierzytelniające miejsca docelowego
są przesyłane wyłącznie w jednym komunikacie startowym IPC, nigdy przez argv ani zmienne środowiskowe; przekazywane dane wyjściowe i błędy
są opatrywane prefiksem i oczyszczane. W argumentach uruchomieniowych procesu potomnego wyłączane są tylko ostrzeżenia `ExperimentalWarning`, aby uniknąć
powtarzania ostrzeżenia Node dotyczącego SQLite przy każdym uruchomieniu zadania cron; inne typy ostrzeżeń pozostają widoczne.

Moduły miejsc docelowych muszą umożliwiać import bez zależności Next.js ani zależności przeznaczonych wyłącznie dla serwera. Istniejąca
implementacja BigQuery już spełnia ten wymóg. Pamięć podręczna tokenów dostępu istnieje tylko przez czas działania procesu potomnego,
a nie między uruchomieniami. Obsługiwanym środowiskiem uruchomieniowym jest Node (pole engines w `package.json`), ale sekcja instalacji Bun w README
oraz `Dockerfile.bun` wskazują również ścieżkę zgodności produkcyjnej z użyciem
`bun:sqlite` (`src/lib/db/core.ts` / adaptery). Dlatego w środowisku Bun eksport zachowuje wcześniejszą
ścieżkę działania w tym samym procesie i emituje jednorazowe ostrzeżenie: izolacja sterty i limitu czasu w procesie potomnym jest niedostępna. Używaj
Node, aby uzyskać izolację pętli zdarzeń i ochronę przed skutkami wyczerpania pamięci; Bun nie jest tu traktowany jako środowisko wyłącznie deweloperskie.

Gdy włączone jest `includeBodies`, preferuj harmonogram z częstotliwością rzędu minut, taki jak
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, zamiast gromadzić dane przez godzinę przed eksportem.
Limity partii i wierszy nadal ograniczają każde uruchomienie. Koszt uruchomienia procesu jest ponoszony dla każdego miejsca docelowego przy każdym uruchomieniu;
niewielki koszt startu zapewnia izolację pętli zdarzeń serwera, a nie zmniejszenie całkowitego zużycia CPU.

### Dane żądań i odpowiedzi (prompty i wygenerowane odpowiedzi)

Domyślnie eksport zawiera tylko pola podsumowania widoczne na **liście** logów. Włączenie
opcji **Eksportuj prompty i odpowiedzi** (`includeBodies`) dodatkowo powoduje przesyłanie danych widocznych w panelu **szczegółów**
logów dla każdego wywołania:

| Pole                             | Zawartość                                                                   |
| -------------------------------- | --------------------------------------------------------------------------- |
| `request_body` / `response_body` | Dane wywołania w postaci wyświetlanej w panelu                              |
| `pipeline_route_decision`        | Cel i model wybrane przez router                                            |
| `pipeline_client_request`        | Surowe żądanie dokładnie w postaci wysłanej przez klienta                   |
| `pipeline_openai_request`        | Po przekształceniu do wewnętrznego formatu OpenAI                           |
| `pipeline_provider_request`      | W postaci faktycznie wysłanej do dostawcy, w jego formacie                  |
| `pipeline_provider_response`     | Surowa odpowiedź dostawcy                                                   |
| `pipeline_client_response`       | Dane zwrócone do wywołującego                                               |
| `pipeline_error`                 | Szczegóły błędu potoku dla nieudanego wywołania                             |
| `bodies_truncated`               | Wartość prawda, gdy dowolne z powyższych pól osiągnęło limit `maxBodyBytes` |

Są to treści promptów, dlatego opcja jest **domyślnie wyłączona**, a jej włączenie jest celowo osobnym wyborem dla każdego miejsca docelowego.
Przesyłane są te same dane, które pokazuje panel, ponieważ eksport i `getCallLogById` korzystają ze wspólnego mechanizmu
ustalania szczegółów: dane są
już oczyszczane z danych osobowych i sekretów podczas zapisu, a wywołanie wykonane przy użyciu
klucza API `noLog` w ogóle nie zapisuje danych żądania ani odpowiedzi, więc nie ma czego eksportować.

Dane żądań i odpowiedzi są odczytywane dla każdego wiersza z artefaktu w systemie plików, więc ich doładowywanie odbywa się tylko dla miejsc docelowych,
które tego zażądały. W przypadku brakującego lub uszkodzonego artefaktu eksportowane jest podsumowanie z pustymi wartościami danych zamiast
przerywania partii i blokowania kursora.

`maxBodyBytes` (domyślnie 262144) ogranicza rozmiar każdego pola. Dłuższe dane są **obcinane, a nie
pomijane** — skrócony prompt nadal odpowiada na pytanie „o co zapytano” — a wiersz jest oznaczany flagą
`bodies_truncated`. Przyrostowe fragmenty strumienia nie są eksportowane; złożona odpowiedź
znajduje się już w `pipeline_provider_response` i `pipeline_client_response`.

---

## 2. Pliki

| Element                                    | Lokalizacja                                  |
| ------------------------------------------ | -------------------------------------------- |
| Kontrakt miejsca docelowego                | `src/lib/logExport/types.ts`                 |
| Rejestr                                    | `src/lib/logExport/registry.ts`              |
| Obsługa sekretów                           | `src/lib/logExport/secrets.ts`               |
| Moduł wykonawczy (IPC procesu nadrzędnego) | `src/lib/logExport/runner.ts`                |
| Cykl życia procesu                         | `src/lib/logExport/childRunner.ts`           |
| Punkt wejścia procesu potomnego            | `src/lib/logExport/exportChild.ts`           |
| Otwieranie w trybie tylko do odczytu       | `src/lib/db/logExportReadOnly.ts`            |
| Wspólne zapytania/mapowanie                | `src/lib/usage/callLogExportQueries.ts`      |
| Moduł rozwiązywania szczegółów             | `src/lib/usage/callLogDetailResolver.ts`     |
| Projekcja API                              | `src/lib/logExport/presenter.ts`             |
| Miejsce docelowe BigQuery                  | `src/lib/logExport/destinations/bigquery.ts` |
| Uwierzytelnianie konta usługi Google       | `src/lib/logExport/googleServiceAccount.ts`  |
| Źródło dziennika wywołań                   | `src/lib/usage/callLogExportSource.ts`       |
| Trwałe przechowywanie                      | `src/lib/db/logExportDestinations.ts`        |
| Zadanie cron                               | `src/lib/jobs/logExportJob.ts`               |
| Warstwa REST                               | `src/app/api/log-export/`                    |
| Strona panelu                              | `src/app/(dashboard)/dashboard/log-export/`  |

Schemat: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Wszystkie trasy wymagają uwierzytelniania administracyjnego (`requireManagementAuth`). Sekrety nigdy nie są zwracane:
zapisany sekret jest zwracany jako literał `__stored__`, a przesłanie tej wartości z powrotem podczas aktualizacji
powoduje zachowanie zapisanych danych uwierzytelniających.

Utworzenie lub aktualizacja miejsca docelowego, którego typ deklaruje sekret, **wymaga
`STORAGE_ENCRYPTION_KEY`**. Bez tego `encrypt()` po cichu przepuszcza dane bez zmian, więc zapis jest
odrzucany z kodem 400 zamiast umieszczać dane uwierzytelniające w SQLite w postaci jawnego tekstu (to samo zabezpieczenie
stosuje webhook Telegrama).

| Metoda   | Ścieżka                                  | Przeznaczenie                                                                       |
| -------- | ---------------------------------------- | ----------------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Typy miejsc docelowych i listy ich pól konfiguracyjnych                             |
| `GET`    | `/api/log-export/destinations`           | Lista miejsc docelowych (sekrety ukryte)                                            |
| `POST`   | `/api/log-export/destinations`           | Utworzenie miejsca docelowego                                                       |
| `GET`    | `/api/log-export/destinations/{id}`      | Odczyt jednego miejsca docelowego                                                   |
| `PUT`    | `/api/log-export/destinations/{id}`      | Aktualizacja nazwy / stanu włączenia / konfiguracji / przetwarzania partiami        |
| `DELETE` | `/api/log-export/destinations/{id}`      | Usunięcie                                                                           |
| `POST`   | `/api/log-export/destinations/{id}/test` | Sprawdzenie danych uwierzytelniających bez zapisywania czegokolwiek                 |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Natychmiastowe opróżnienie kolejki, tą samą ścieżką co zaplanowane uruchomienie     |
| `GET`    | `/api/log-export/status`                 | Stan zadania cron, ostatnie uruchomienia, zaległości dla każdego miejsca docelowego |

`GET /api/log-export/types` zapewnia uniwersalność interfejsu użytkownika: formularz panelu jest renderowany na podstawie
zwróconych deskryptorów pól, więc dodanie nowego miejsca docelowego nie wymaga zmian w interfejsie.

---

## 4. Miejsce docelowe BigQuery

Klucze konfiguracji (`type: "bigquery"`):

| Klucz                | Uwagi                                                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | Projekt GCP zawierający zbiór danych                                                                                                            |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                                                 |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                                                 |
| `location`           | Używane tylko wtedy, gdy trzeba utworzyć zbiór danych (domyślnie `EU`)                                                                          |
| `serviceAccountJson` | Klucz konta usługi. Sekret: szyfrowany w spoczynku, nigdy niezwracany                                                                           |
| `autoCreate`         | Tworzenie brakującego zbioru danych/tabeli; warunkowe dodawanie dopuszczających wartości null kolumn z informacjami o użyciu (domyślnie `true`) |

Konto usługi potrzebuje uprawnienia `bigquery.tables.updateData` dla docelowej tabeli, a także
`bigquery.datasets.create` / `bigquery.tables.create`, gdy opcja `autoCreate` jest włączona.
Aktualizacja istniejącej tabeli w celu dodania dwóch dopuszczających wartości null pól z informacjami
o użyciu wymaga również `bigquery.tables.update`. Brak uprawnienia powoduje niepowodzenie eksportu
bez przesunięcia jego kursora.

Skonfigurowana partia jest jednostką **kursora**, a nie HTTP: `send()` dzieli ją na wywołania
insertAll zawierające najwyżej 500 wierszy, więc duża wartość `batch_size` nie może spowodować
przekroczenia limitu żądania BigQuery wynoszącego 10 MB. Statusy przejściowe (408/429/500/502/503/504)
są ponawiane maksymalnie trzy razy z wykładniczym opóźnieniem, przy ponownym użyciu tych samych
insertIds; błędy uwierzytelniania i schematu są zgłaszane przy pierwszej próbie, zamiast zużywać
całe wykonanie.

Tabela utworzona przed chwilą nie jest jeszcze widoczna dla punktu końcowego przesyłania strumieniowego,
który przez kilka sekund odpowiada kodem 404. Ten kod 404 jest ponawiany, ale **tylko wtedy, gdy ta
tabela została utworzona podczas tego wykonania** — rzeczywiście brakująca tabela nadal powoduje
natychmiastowe niepowodzenie. Należy pamiętać, że ponowne utworzenie tabeli pod nazwą, która
niedawno została usunięta, powoduje, że BigQuery przez kilka minut odmawia wstawiania strumieniowego;
jest to właściwość operacji usunięcia i ponownego utworzenia, dlatego zamiast usuwać i dodawać tabelę
ponownie lepiej użyć nowej nazwy tabeli.

**Częściowe niepowodzenie jest zwracane jako HTTP 200 z niepustym `insertErrors[]`.** Jest ono
traktowane jako błąd i powoduje zgłoszenie wyjątku, co zatrzymuje przesuwanie kursora poza wiersze,
których BigQuery nigdy nie zaakceptował; `tests/unit/log-export-bigquery.test.ts` testuje to
zachowanie.

Transport korzysta ze zwykłego REST — podpisane własnym kluczem oświadczenie RS256 jest wymieniane
na token dostępu pod adresem `https://oauth2.googleapis.com/token`, a następnie wiersze są wysyłane
do `tabledata.insertAll`. Nie jest dołączany żaden pakiet Google SDK. Tokeny dostępu są buforowane
w procesie osobno dla każdej pary (konto usługi, zakres).

Utworzona tabela zawiera jedną kolumnę dla każdego pola z karty Logs oraz `exported_at` i jest
zaprojektowana z myślą o sposobie, w jaki dzienniki wywołań są faktycznie wyszukiwane:

- **Partycjonowanie według dnia na podstawie `timestamp`**, dzięki czemu zapytanie ograniczone
  datą skanuje tylko te dni.
- **Klastrowanie według `api_key_name`, `provider`, `model`, `status`** (w tej kolejności), dzięki
  czemu filtrowanie według osoby, która wykonała wywołanie, miejsca docelowego lub tego, czy
  wywołanie się nie powiodło, eliminuje bloki wewnątrz każdej partycji. BigQuery zezwala na
  najwyżej cztery kolumny klastrowania, a kolejność ma znaczenie: filtr tylko na
  `api_key_name` eliminuje bloki, filtr tylko na `status` — nie.
- **Opcjonalne przechowywanie partycji** za pomocą `partitionExpirationDays` (wartość 0 zachowuje
  wszystko), stosowane podczas tworzenia tabeli.

Oba ustawienia mają zastosowanie w czasie tworzenia. Istniejąca tabela zachowuje układ, który już
posiada, więc jeśli chcesz go zastosować, wskaż miejsce docelowe z nowym identyfikatorem tabeli.

`tests/unit/log-export-bigquery.test.ts` sprawdza, czy mapper i schemat tabeli pozostają zgodne,
dzięki czemu nowa kolumna dziennika wywołań nie może zostać po cichu pominięta podczas eksportu.

Partie są dzielone według **zarówno liczby wierszy, jak i liczby serializowanych bajtów**. Sama
liczba wierszy nie wystarcza, gdy eksportowane są ładunki: 500 wierszy zawierających prompty może
zajmować dziesiątki megabajtów, a insertAll odrzuca żądanie przekraczające 10 MB. Fragmenty są
zamykane po osiągnięciu 500 wierszy lub 9 MB — zależnie od tego, co nastąpi wcześniej.

---

## 5. Miejsce docelowe śladów OTLP/HTTP

Konfiguracja używa `type: "otlp-http"`. Jest to zaplanowany eksport utrwalonych logów
wywołań oparty na kursorze, a nie mechanizm best-effort do bieżącego routingu zdarzeń
znajdujący się w `open-sse/services/routing/otel.ts`. Nie odczytuje on ani nie zmienia
zmiennych środowiskowych, timerów lub buforów tego mechanizmu. Włączenie obu może generować
dwa niezależne rodzaje spanów; użyj zakresu instrumentacji `omniroute.log-export`,
aby rozróżnić te spany logów wywołań.

| Klucz                    | Domyślna wartość / przeznaczenie                                                        |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `endpoint`               | Wymagany pełny adres URL śladów HTTP(S); sufiks `/v1/traces` nie jest dodawany          |
| `headers`                | Opcjonalne wiersze `Name: value` lub obiekt JSON zawierający ciągi znaków; szyfrowane   |
| `requestHeaderAllowlist` | Pusta (wyłączona); nazwy/prefiksy nagłówków klienta przechwytywane jako atrybuty spanów |
| `serviceName`            | `omniroute`; zasób `service.name`                                                       |
| `langfuseMapping`        | `false`; dodaje atrybuty generowania/sesji/użytkownika Langfuse                         |
| `identity`               | `pseudonymous`, `keyName` lub `none`                                                    |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                 |
| `timeoutMs`              | `30000` na każdą próbę HTTP                                                             |
| `environment`            | Nieustawione; opcjonalne `langfuse.environment`                                         |

Ogólny pulpit renderuje te pola. `paths` akceptuje tablicę API lub pole tekstowe
z dokładnymi ścieżkami rozdzielonymi znakami nowej linii/przecinkami. Żądania embeddings,
rerank i inne ścieżki są pomijane, chyba że zostaną jawnie dozwolone. Pominięte wiersze
nadal przesuwają kursor; liczniki `exported`/`exportedTotal` istniejącego runnera zliczają
przetworzone wiersze źródłowe, w tym wiersze odfiltrowane, a nie zaakceptowane spany.
Filtrowanie odbywa się w procesie potomnym, bez zmiany kontraktu IPC/kursora.

Walidacja adresu URL używa pomocnika `parseAndValidateNonMetadataUrl` niezależnego od bazy
danych, znajdującego się w `src/shared/network/outboundUrlGuard.ts`: zasady
`block-metadata`. Obejmuje ona te same bezwarunkowe kontrole metadanych, protokołu
i osadzonych danych uwierzytelniających co walidator webhooków, ale z włączoną obsługą
prywatnych adresów URL; celowo zezwala jednak na cele localhost/LAN bez globalnego
nadpisania flagi funkcji. Umożliwia to korzystanie z samodzielnie hostowanych punktów
końcowych Langfuse, Phoenix, Tempo i Collector, w tym prywatnych punktów końcowych HTTP.
Hosty metadanych chmurowych są zawsze blokowane. Przekierowania nie są śledzone, więc
collector nie może przekierować danych uwierzytelniających do innego hosta. Podobnie jak
istniejący leksykalny mechanizm ochrony adresów URL, nie przypina on rozpoznawania DNS;
konfiguruj wyłącznie hosty kontrolowane przez operatora. Gdy punkt końcowy nie znajduje się
w zaufanej sieci, preferuj HTTPS.

### Ładunek i dostarczanie

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) zawiera jeden
span CLIENT dla każdego dozwolonego wiersza, nazwany dokładną ścieżką żądania. Nazewnictwo
ścieżek rozróżnia Chat Completions, Responses i Messages bez umieszczania danych modelu
lub tożsamości w nazwie spanu. Atrybuty zasobu obejmują `service.name` oraz pakietowe
`service.version`.

Standardowy logger prób czatu (`open-sse/handlers/chatCore/attemptLogging.ts`) zapisuje
`duration = Date.now() - startTime` po zakończeniu i nie dostarcza znacznika czasu;
`saveCallLogOperation` w `src/lib/usage/callLogs.ts` domyślnie ustawia znacznik czasu
na moment zapisu (zakończenia). Eksport ustawia więc end na znacznik czasu wiersza,
a start na end − duration (w milisekundach, przeliczonych na dziesiętne nanosekundy).
Dostarczone przez wywołującego historyczne znaczniki czasu również są zachowywane jako
czas end; nie istnieje rozróżnienie startu/zakończenia dla poszczególnych wierszy.
Wartość null duration staje się zerem. Nieprawidłowe/brakujące znaczniki czasu powodują
niepowodzenie partii zamiast tworzenia niedeterministycznych spanów. `ttftMs` może mieć
wartość null i jest mapowane na `omniroute.ttft_ms`.

Atrybuty obejmują `gen_ai.operation.name="chat"`, dostawcę, żądany/model odpowiedzi,
tokeny wejściowe/wyjściowe, opcjonalne tokeny odczytu pamięci podręcznej, tworzenia pamięci
podręcznej i rozumowania, status HTTP, combo, źródło pamięci podręcznej, znacznik sesji
oraz identyfikator korelacji. Wartości całkowite OTLP i znaczniki czasu są ciągami
dziesiętnymi; ciągi znaków, wartości logiczne i liczby ułamkowe używają swoich
natywnych wariantów wartości OTLP. Spany błędów mają status ERROR i oczyszczony komunikat
statusu. Rekord kanoniczny nie zawiera adresu URL hosta upstream, dlatego `server.address`
jest pomijane, zamiast niepoprawnie identyfikować collector jako serwer modelu. Koszt
nie jest eksportowany.

Tylko `includeBodies=true` pobiera zawartość. Gdy `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` zawierają oczyszczony JSON treści
żądania/odpowiedzi przechowywany przez OmniRoute (kanonizowany, jeśli można go sparsować),
a nie przekształconą tablicę komunikatów semconv. Przycięte lub niebędące JSON-em treści
pozostają nieprzetworzonym tekstem. Gdy `langfuseMapping=true`, treści są emitowane
wyłącznie jako `langfuse.observation.input` / `langfuse.observation.output`;
atrybuty `gen_ai.*.messages` są pomijane, aby każda treść była wysyłana tylko raz.
Oba tryby dziedziczą `maxBodyBytes` z istniejącej ścieżki pobierania;
`omniroute.bodies_truncated=true` oznacza przycięcie.
To miejsce docelowe nie dodaje dodatkowych migawek potoku ani odczytów nieoczyszczonych
artefaktów; opcjonalne przechwytywanie nagłówków żądania używa istniejącej pobranej migawki
klienta opisanej poniżej. Podczas eksportowania treści używaj częstotliwości co minutę,
takiej jak `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, zamiast gromadzić zaległości
godzinami.

### Opcjonalne nagłówki żądań klienta

Przechwytywanie nagłówków jest **domyślnie wyłączone**. Ustaw `requestHeaderAllowlist`
w konfiguracji miejsca docelowego i włącz **Eksportuj prompty i odpowiedzi**
(`includeBodies: true` w miejscu docelowym).
Lista dozwolonych wartości akceptuje tablicę API lub pole tekstowe z nazwami rozdzielonymi
znakami nowej linii/przecinkami:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Nazwy są dopasowywane bez uwzględniania wielkości liter i dokładnie, chyba że pojedynczy końcowy
`*` wybiera niepusty prefiks nazwy nagłówka. Samodzielny `*`, symbole wieloznaczne osadzone w nazwie
oraz nieprawidłowe nazwy nagłówków HTTP są odrzucane. Liczba selektorów wynosi maksymalnie 64, a nazwa/prefiks
każdego z nich ma maksymalnie 256 bajtów ASCII. To ustawienie jest niezależne od `headers`, które
uwierzytelnia eksportera względem kolektora.

Przechwytywanie odczytuje wyłącznie `pipeline_client_request`, wypełnione z zapisanego szczegółowego potoku
`clientRawRequest` (lub starszego `clientRequest`). Nigdy nie korzysta zastępczo z nagłówków żądania dostawcy.
Szczegółowe logowanie potoku musiało być włączone w momencie rejestrowania żądania. Gdy
`includeBodies` jest wyłączone albo brakuje pliku JSON migawki klienta, jest on uszkodzony lub obcięty,
nie są emitowane żadne atrybuty nagłówków. Zwiększenie `maxBodyBytes` może zapobiec obcięciu migawki
w czasie eksportu, ale nie może przywrócić szczegółów, które nigdy nie zostały zapisane. Migawka większa
niż 1 MiB lub zawierająca więcej niż 256 wpisów nagłówków jest ignorowana. Istniejący eksport promptu/odpowiedzi
pozostaje włączony równolegle z przechwytywaniem nagłówków; allowlista nie zapewnia trybu nawadniania
wyłącznie nagłówków.

Wybrane wartości stają się tablicami ciągów OTLP `http.request.header.<full lowercase header name>`,
nawet w przypadku pojedynczego ciągu. Na przykład `X-OmniRoute-Meta-Team: example-team` staje się
`http.request.header.x-omniroute-meta-team` z wartością
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Pełny prefiks jest zachowywany: są to zwykłe nagłówki, bez analizowania pól biznesowych ani konwersji do
`omniroute.metadata.*` / metadanych Langfuse. `langfuseMapping` nie zmienia semantyki nagłówków. Wybrany
nagłówek `User-Agent` z pojedynczą wartością ustawia również standardowy skalarny atrybut
`user_agent.original`. Przecinki wewnątrz jednej wartości nie są rozdzielane. Warianty różniące się wielkością
liter są łączone w kolejności zapisanych wpisów; każda nieprawidłowa odmiana powoduje pominięcie całego
nagłówka. Atrybuty są uporządkowane według nazwy zapisanej małymi literami.

Nagłówki Authorization, Proxy-Authorization, Cookie, Set-Cookie i nagłówki kluczy API, nazwy zawierające
znaczniki auth/token/secret/password/credential oraz wewnętrzne dane uwierzytelniające bramy są zawsze
wykluczane, nawet jeśli zostały wybrane lub częściowo zamaskowane w pamięci. Znane wzorce danych uwierzytelniających
ponownie wykorzystują współdzielony detektor danych uwierzytelniających; znaczniki redakcji są pomijane, a nie
eksportowane jako bezpieczne wartości. Akceptowane są wyłącznie ciągi i niepuste tablice ciągów; liczby ani
obiekty nie są konwertowane. Nieprawidłowe nazwy, klucze prototypu, znaki sterujące (z wyjątkiem poziomej
tabulacji) oraz nieprawidłowo zakodowany Unicode są ignorowane bez przerywania przetwarzania partii ani
odzwierciedlania ich zawartości w błędach.

Każdy span przechwytuje maksymalnie 32 nagłówki, 16 wartości na nagłówek, 4096 bajtów UTF-8 na wartość
oraz 16384 łącznych bajtów UTF-8 dla przechwyconych nazw i wartości nagłówków. Zbyt duże/nieprawidłowe
nagłówki są pomijane w całości, a nie obcinane. Wybór jest decyzją operatora dotyczącą prywatności: nazwy
wyglądające na bezpieczne nadal mogą zawierać dane osobowe, a te ograniczenia i detektory nie są ogólnym
mechanizmem usuwania danych PII.

### Limity dostarczania

Żądania są ograniczone do 500 spanów i 4 MiB kodu JSON UTF-8, wliczając kopertę.
Każdy dozwolony span jest sprawdzany pod względem rozmiaru przed pierwszym żądaniem partii kursora. Pojedynczy
span większy niż limit powoduje, że żadna część tej partii nie zostanie wysłana, a operacja kończy się błędem
z instrukcją obniżenia `maxBodyBytes`; span nie jest po cichu odrzucany. Kontrola wstępna zachowuje wyłącznie
odwołania do rekordów i liczniki bajtów, usuwając każdy tymczasowy span/JSON; spany są odbudowywane dla
ograniczonych fragmentów zamiast przechowywania drugiej zserializowanej kopii partii. Błędy HTTP 408/429/5xx,
błędy sieciowe i przekroczenia limitu czasu otrzymują najwyżej trzy próby, z wykładniczym opóźnieniem
250/500 ms. `Retry-After` wyrażony w sekundach lub jako daty HTTP może wydłużyć opóźnienie do 5 sekund.
Inne statusy kończą się natychmiastowym błędem. Częściowe odrzucenie OTLP 2xx również powoduje błąd zamiast
potwierdzenia utraconego spanu; puste lub prawidłowe potwierdzenia JSON są akceptowane, z limitem odczytu
odpowiedzi wynoszącym 64 KiB.

Błędy zawierają wyłącznie informacje należące do eksportera: status HTTP, klasę ponowienia, liczbę prób i
liczbę wysłanych spanów albo stały komunikat o błędzie potwierdzenia/sieci. Treści odpowiedzi kolektora,
liczniki częściowych powodzeń i nagłówki odpowiedzi nigdy nie są kopiowane do błędów, logów ani panelu.
Partia zakończona błędem lub częściowo zaakceptowana nie jest potwierdzana: miejsce docelowe wyświetla stan
Failing wraz z tym statusem, kursor pozostaje przy ostatniej potwierdzonej partii, a następne uruchomienie
ponownie wyśle te same wiersze. Trwałe statusy nadal powodują błędy do czasu naprawienia kolektora lub
konfiguracji. Szczegóły odpowiedzi znajdziesz we własnych logach kolektora. Oddzielne redagowanie zachowują
podsumowania błędów dziennika wywołań.
`prepare()` nie inicjuje żadnych zasobów; Test wysyła dokładnie `{"resourceSpans":[]}` i zgłasza
status HTTP bez zapisywania spanów dziennika wywołań.

Identyfikatory śledzenia i identyfikatory spanów to pierwsze 32/16 cyfr szesnastkowych SHA-256 obliczone dla
`"omniroute.trace\\0" + callLogId` oraz `"omniroute.span\\0" + callLogId`. Ponowne wysłania zawierają
identyczne identyfikatory. Nie jest to gwarancja deduplikacji: niektóre backendy, w tym przetwarzanie Langfuse
v4, nie deduplikują spanów o tym samym identyfikatorze. Awaria lub częściowe niepowodzenie fragmentu może
spowodować ponowne wysłanie najwyżej jednej niepotwierdzonej partii kursora; cała ta partia może zostać
zduplikowana, a nie tylko jej ostatni fragment HTTP. Wybierając rozmiar partii kursora, należy uwzględnić
ten kompromis.

### Przykład Langfuse

Skonfiguruj te pola dla samodzielnie hostowanej instancji Langfuse:

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

Utwórz lokalnie wartość Authorization jako Base64 dosłownego ciągu `public-key:secret-key`
(na przykład za pomocą `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Nie wklejaj prawdziwych danych uwierzytelniających do logów, zrzutów ekranu ani zgłoszeń. Mapowanie automatycznie
ustawia `x-langfuse-ingestion-version: 4`; Authorization nadal należy podać w `headers`.
Zarówno nagłówki, jak i generowana sól tożsamości używają istniejącego mechanizmu zaszyfrowanych pól
sekretów i symboli zastępczych API; wymagane jest `STORAGE_ENCRYPTION_KEY`.

Mapowanie dodaje typ/model generowania, szczegóły użycia w formacie JSON (wejście/wyjście/suma oraz dostępne
klucze pamięci podręcznej), migawki wejścia/wyjścia JSON, poziom ERROR/DEFAULT, oczyszczony komunikat
statusu, nazwę śledzenia, identyfikator sesji, opcjonalne środowisko oraz możliwość filtrowania według
`langfuse.observation.metadata.<key>` dla dostawcy, żądanego modelu, ścieżki, kombinacji, źródła pamięci podręcznej
i statusu. `langfuse.observation.completion_start_time` ma format ISO 8601 i wskazuje moment
rozpoczęcia + TTFT tylko wtedy, gdy TTFT jest znane i mieści się w czasie trwania. Nie są wysyłane żadne atrybuty kosztów.

Tryby tożsamości dotyczą `langfuse.user.id`:

- `pseudonymous` (domyślny): HMAC-SHA256 wewnętrznego identyfikatora klucza API z losową
  32-bajtową solą dla każdego miejsca docelowego. Sól jest generowana podczas tworzenia, jeśli jej brakuje,
  szyfrowana jako `identitySalt`, nigdy nie jest zwracana i pozostaje zachowana podczas edycji.
  Surowe identyfikatory kluczy nigdy nie są umieszczane w atrybutach spanów. Ponowne utworzenie lub rotacja soli
  miejsca docelowego zmienia tożsamości.
- `keyName`: skonfigurowana nazwa klucza API, celowo ujawniająca etykietę operatora.
- `none`: brak identyfikatora użytkownika. Tagi sesji nadal są eksportowane, jeśli są dostępne; te tryby nie
  anonimizują dowolnej treści promptów ani dostarczonych przez operatora etykiet sesji/korelacji.

### Rozpoczęcie bez uzupełniania danych historycznych

Wyłącznie podczas tworzenia włącz opcję **Start from current position (skip existing logs)** lub przekaż
`startFromCurrentPosition: true` na najwyższym poziomie ładunku żądania API tworzenia. Inicjalizuje ona
`cursor_row_id` bieżącą maksymalną wartością rowid zachowanych wierszy dziennika wywołań przy użyciu
istniejących pomocniczych funkcji kursora, bez migracji. Wartość domyślna to false (kursor 0 i uzupełnianie zachowanej historii).
Nie jest to ustawienie resetowania kursora podczas aktualizacji.

Współdzielone dodanie `ttftMs` dodaje również nullable kolumnę `ttft_ms` do mappera BigQuery
i schematu nowej tabeli: test schematu wymaga, aby każde kanoniczne pole rekordu miało kolumnę.
Istniejące tabele nadal eksportują dane bez zmian: `prepare()` odczytuje schemat tabeli
i pomija wyłącznie `ttft_ms`, gdy ta kolumna nie istnieje. Dodaj nullable kolumnę INT64, aby uzyskać TTFT
przy następnym uruchomieniu, lub użyj nowej tabeli. Opcjonalna kolumna TTFT nie wyzwala aktualizacji schematu. Kolumny danych potwierdzających użycie
postępują zgodnie z poniższym warunkowym przepływem zgodności wymagającym jawnego wyrażenia zgody; pozostałe pola wierszy zachowują ścisłe sprawdzanie schematu.

---

## 6. Dodawanie miejsca docelowego

1. Utwórz `src/lib/logExport/destinations/<name>.ts` eksportujący `LogExportDestinationType`:
   schemat Zod `configSchema`, tablicę deskryptorów `fields` dla interfejsu użytkownika, `secretFields` oraz
   `createClient(config)` zwracający `test()` / `prepare()` / `send(records)`.
2. Dodaj go do tablicy `DESTINATIONS` w `src/lib/logExport/registry.ts`.
3. Napisz testy w `tests/unit/`.

To cała zmiana: mechanizm trwałego zapisu, zadanie cron, warstwa REST, szyfrowanie sekretów i
formularz w panelu korzystają z rejestru.

Dwie zasady dotyczące nowego miejsca docelowego:

- `send()` **musi zgłaszać wyjątek** w przypadku częściowego niepowodzenia. Zakończenie bez błędu oznacza „miejsce docelowe ma te wiersze”,
  a kursor zostaje trwale przesunięty za nie.
- Miejsce docelowe przyjmujące adres URL podany przez użytkownika musi go zweryfikować za pomocą
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) przed pobraniem danych,
  tak samo jak robią to webhooki. BigQuery tego nie wymaga: adresy jego hostów są stałe.

---

## 7. Obsługa

- **Panel**: Integrations → Log export. Dodaj miejsce docelowe, uruchom **Test**, aby sprawdzić dane uwierzytelniające
  bez zapisywania wierszy, a następnie je włącz.
- **Backlog**: każda karta miejsca docelowego pokazuje oczekujące wiersze i kursor; `GET
/api/log-export/status` zwraca te same dane oraz 20 ostatnich uruchomień zadań.
- **Błąd jednego miejsca docelowego nie powoduje błędu pozostałych** — podsumowanie uruchomienia zapisuje stan dla każdego miejsca docelowego
  w `last_status` / `last_error`, a historia uruchomień zadań zachowuje wynik zbiorczy.
- **Usunięcie miejsca docelowego usuwa jego kursor.** Ponowne dodanie rozpoczyna działanie od najstarszego zachowanego
  wywołania w dzienniku, co powoduje ponowne wysłanie wierszy, które miejsce docelowe może już zawierać. W BigQuery wartość
  `insertId` eliminuje duplikaty tylko w ramach własnego okna deduplikacji BigQuery, dlatego zamiast usuwać
  miejsce docelowe lepiej je wyłączyć.

### Zgodność schematu danych o użyciu

Nowe tabele BigQuery zawierają wartości null dla `usage_evidence` (STRING zawierający JSON) oraz
`usage_estimated` (BOOL). Gdy włączono `autoCreate`, istniejąca tabela może otrzymać
wyłącznie te brakujące kolumny zezwalające na wartości null. Eksporter zachowuje pełny istniejący
schemat, w tym metadane pól, i wysyła warunkowe żądanie PATCH z użyciem zwróconego etag. Równoczesna zmiana schematu
powoduje niepowodzenie eksportu zamiast nadpisania go; przy następnym uruchomieniu tabela zostanie odczytana ponownie.

Gdy `autoCreate` jest wyłączone, przed eksportowaniem rekordów z danymi o użyciu dodaj te kolumny samodzielnie. Brak metadanych schematu/etag lub nieudana aktualizacja również uniemożliwiają wstawianie rekordów zawierających dane o użyciu. Kursor eksportu nie przesuwa się po takim niepowodzeniu, a dane o użyciu nigdy nie są po cichu pomijane. Lokalne przechowywanie dzienników nadal obowiązuje, gdy eksport jest zablokowany, dlatego usuń przyczynę niepowodzenia, zanim wygaśnie okres przechowywania zachowanych wierszy źródłowych.
