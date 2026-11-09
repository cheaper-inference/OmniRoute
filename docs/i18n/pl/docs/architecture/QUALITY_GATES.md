# Quality Gates Reference (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Ten dokument stanowi wiążący materiał referencyjny dla wszystkich bramek jakości CI w OmniRoute.
Opisuje każdą bramkę, zakres jej weryfikacji, zadanie CI, w którym jest uruchamiana, to, czy
wykorzystuje bazową wartość mechanizmu zapadkowego, czy zasady zaliczenia/niezaliczenia, oraz to,
czy blokuje kompilację, czy ma charakter doradczy.

Krótkie podsumowanie i zasady listy dozwolonych wyjątków znajdują się w sekcji „Quality Gates & Ratchets”
w pliku `AGENTS.md`. Krytyczną ocenę, klasyfikację dojrzałości oraz niezależny od narzędzi
plan odtworzenia tego samego systemu zawiera
[Podręcznik bramek jakości](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inwentarz bramek i profile wykonywania

### Przyjęcie kandydata

Przepływy pracy CI i Quality Gates wydają stabilny werdykt: `Gate / CI` i `Gate / Quality`. Ich wersjonowane zasady przyjmowania wyliczają każde stanowisko wyższego szczebla jako wymagane lub doradcze. Odpowiednie wymagane zadanie musi zakończyć się pomyślnie: brakujące, anulowane, pominięte, oczekujące i nieznane wyniki nie mogą ustalić PASS. Ważna klasyfikacja obejmująca tylko dokumenty lub tylko katalog może spowodować, że pas kodowy nie będzie miał zastosowania; zwykły projekt PR nie jest zaakceptowanym kandydatem. Etykieta `hotfix` nie zrzeka się dowodów.

Obydwa przepływy pracy obejmują PRs do gałęzi main/release, wypychanie do `main`, ręczne wysyłanie i zdarzenia łączenia grup. Wypychanie, wysyłanie i łączenie grup uruchamiają pełny wybór. Zaufana wersja robocza kolejki Mergify uruchamia również odpowiednie zadania `full-code`/`full-code-e2e` ; zwykły PRs pomiń je. Przed ręcznym połączeniem przeprowadź pełną wysyłkę dokładnie do konkretnego kandydata. Wypychanie do `release/**` nie uruchamia tych przepływów pracy; Release-Green osobno obserwuje połączoną bazę (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forki i grupy scalone wykorzystują hostowane moduły uruchamiające do zadań, które w innym przypadku wybierałyby samodzielnie hostowane moduły uruchamiające; przed wdrożeniem należy sprawdzić wystarczającą pojemność hosta.

Zwykły PR uruchamia szybką selekcję. Ścieżki `full-code` i `full-code-e2e` polityki dostępu (E2E, integracja, artefakt pakietu, Electron smoke, Bun SQLite, klienci ekosystemu i protokołu) działają tylko w wersji roboczej kolejki Mergify lub przy pełnym uruchomieniu: `gh workflow run ci.yml --ref <branch>`.

Każdy paragon JSON identyfikuje wyewidencjonowane SHA, przebieg przepływu pracy i próbę. CLI odrzuca niedopasowanie checkout/event SHA. Testy przepływu pracy wiążą członkostwo w zasadach z listą `needs` zadania werdyktowego, dzięki czemu nowy lub usunięty pas nie może po cichu zniknąć. Potwierdzenia obejmują własny przepływ pracy, a nie publikację, wdrożenie lub elementy wewnętrzne istniejącego skanera doradczego. Dokonanie odpowiednich kontroli wymaganych przepisami branżowymi stanowi odrębną zmianę administracyjną; określenie ich stanowisk pracy samo w sobie nie chroni oddziału.

`API Route Typecheck` to niezależna kontrola przepływu pracy, poza zarówno zbiorczymi werdyktami, jak i statycznym profilem lokalnego pełnego obserwatora. Sprawdź jego wynik osobno dla konkretnego kandydata. `.github/workflows/api-route-typecheck.yml` działa na PRs w `main` lub `release/**`, wypycha do dowolnej rodziny gałęzi, ręczne wysyłanie i zdarzenia `merge_group` typu `checks_requested`. Nie ma filtra ścieżki. Połącz grupy sprawdź `merge_group.head_sha`; inne wydarzenia sprawdź `github.sha`. Wszystkie zdarzenia korzystają z tych samych testów bramki diagnostycznej i jednostki bramki API. Bazowe retargety PR żądają nowego sprawdzenia; zmiany w body/title wykorzystują nazwę `Admission not requested / API Route Typecheck` służącą wyłącznie do obserwacji i nie mogą zastąpić kontroli wstępu.

### Zachowane dowody w reduktorze akceptacji

`scripts/quality/validate-release-acceptance.mjs` redukuje dostarczony plan i jego
manifesty; nie ustala, czy plan obejmuje kompletny potok wydania.
Jego raporty jawnie ustawiają `releaseAcceptance: false`, nawet gdy plan ma status
`VERIFIED`. Przepływ pracy `release-acceptance.yml` nadal używa fikstur trybu cienia, a nie
rzeczywistych potwierdzeń kompilacji, pakowania, uruchomienia ani promocji.

CLI wymaga `--evidence-root` do weryfikacji zachowanych dowodów. Pliki są rozwiązywane
jako `<evidence-root>/<artifact_id>/<member>` i haszowane przy użyciu SHA-256. Rekord PASS
bez dowodów, brakujący lub zmieniony plik, niebezpieczna ścieżka albo dowiązanie symboliczne
uniemożliwiają weryfikację. Brakujące pliki nie są równoważne pustym dziennikom pomyślnego
wykonania. Istniejące kontrole SHA/uruchomienia/próby pozostają niezależne: zgodne bajty nie mogą
uratować nieaktualnego potwierdzenia. Integralność pliku nie stanowi dowodu autentyczności
wykonania ani promocji artefaktu.

### DAST korzysta ze zweryfikowanego buildu CI

Wymagane zadanie CI `dast-smoke` wywołuje `.github/workflows/dast-smoke.yml` po `build`. Stosuje ten sam wybór kodu i szkiców co build, w tym obsługiwane PR z forków, PR kierowane do wydania i grupy scalania. Brakujące, nieudane, anulowane lub nieoczekiwanie pominięte zadanie DAST blokuje `Gate / CI`. Workflow wielokrotnego użytku nie ma niezależnego wyzwalacza PR ani ręcznego; walidacja ręczna korzysta z uruchomienia CI, aby build i odbiorca pozostali w jednym przebiegu.

`scripts/ci/next-build-provenance.mjs` zabezpiecza cały artefakt Next skrótem tar, repozytorium/zdarzeniem/przebiegiem, próbą producenta, head/base/checkout/tree, tożsamościami workflow, plikiem blokady, dokładną wersją i ABI Node, platformą oraz bundlerem. DAST wybiera niezmienny identyfikator artefaktu z `needs.build.outputs`, wymaga weryfikacji skrótu pobranego pliku i niezależnie oblicza skrót ZIP wobec skrótu producenta przed wyodrębnieniem dwóch dozwolonych elementów przez `scripts/ci/unpack-ci-build.py`. Manifest i archiwum tar również muszą odpowiadać niezależnym wynikom producenta przed wyodrębnieniem drzewa Next. Nigdy nie szuka ostatniego udanego buildu gałęzi. Częściowe ponowienie może wykorzystać tę samą próbę producenta, jeśli jej identyfikator i wszystkie dane wejściowe nadal się zgadzają; potwierdzenie zapisuje obie próby.

Odbiorca pozostaje na hostowanym runnerze Linux z dostępem do repozytorium tylko do odczytu i bez jego sekretów. Instaluje dokładną wersję Node producenta, a następnie składa CLI z `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` odrzuca brak samodzielnego serwera przed jakimkolwiek buildem awaryjnym; zwykłe lokalne buildy CLI zachowują dotychczasową ścieżkę awaryjną. Gotowość serwera, Schemathesis i promptfoo muszą wszystkie zakończyć się sukcesem w niezmienionym limicie zadania wynoszącym 25 minut. Potwierdzenie pochodzenia dowodzi tożsamości i bajtów wejścia, nie udanego skanu DAST. Wygaśnięcie artefaktu, przerwanie runnera lub błąd skanera pozostają dowodami niepełnymi lub negatywnymi; wrapper doradczy nie może zamienić ich w PASS.

### Zdolność wykonywania testów UI

CI uruchamia pełny inwentarz UI jako cztery fragmenty macierzy `test-vitest`, każdy z maksymalnie
dwoma workerami na fragment i istniejącym 15-minutowym limitem zadania. Pierwszy fragment uruchamia
również zestaw Vitest MCP/autoCombo. Wynik wymaganego zadania obejmuje każdy element macierzy;
awaria lub anulowanie jednego fragmentu nie może ustanowić dopuszczenia kandydata.

Nocny obserwator zachowuje osobne potwierdzenie dokładnego kandydata dla każdego fragmentu UI,
w tym wykonanie MCP w pierwszym potwierdzeniu. Wymagane są wszystkie cztery potwierdzenia,
dzienniki i zgodne tożsamości wykonań. Lokalne `npm run test:vitest:ui` nadal wybiera
kompletny zestaw; pojedyncze uruchomienie `--shard` stanowi jedynie częściowy dowód.

### Zbieranie pokrycia testów jednostkowych

Dwanaście fragmentów testów jednostkowych zbiera pokrycie V8 podczas istniejącego wykonywania
testów. Fragment zakończony powodzeniem uruchamia `scripts/ci/compact-v8-coverage.mjs`, aby
skompresować oryginalne pliki bez generowania pośredniego raportu Istanbul. Końcowe zadanie
Coverage weryfikuje wszystkie dwanaście manifestów względem SHA kandydata, środowiska
uruchomieniowego, katalogu głównego źródeł i skrótów danych, a następnie uruchamia raportery c8
oraz istniejące progi pokrycia. Dane wejściowe zachowują globalną kolejność nazw plików c8;
wstępne scalanie na poziomie fragmentów jest niebezpieczne w przypadku mieszanego pokrycia
funkcji/bloków. Brakujące, nieprawidłowo sformatowane lub niezgodne fragmenty powodują
niepowodzenie dopuszczenia. Fragmenty testów zakończone niepowodzeniem zachowują osobno surowe
diagnostyczne dane pokrycia; nie mogą one wejść do końcowego scalania.

### Potwierdzenia postępu wykonywania testów jednostkowych

Współdzielone polecenie `test:unit:ci:shard` rejestruje fazy `primary`, `dashboard` i `serial`
za pośrednictwem `scripts/ci/unit-progress-reporter.mjs`. Standardowy raport z testów pozostaje
dostępny. Oddzielne potwierdzenie zawierające wyłącznie metadane rejestruje rozpoczęcie i zakończenie
każdego pliku, a 30-sekundowy sygnał aktywności wskazuje pliki, które nadal są aktywne, oraz czas ich
wykonywania. Rejestrowane są wyłącznie metadane wykonania znajdujące się na liście dozwolonych danych;
opisy testów, dane wyjściowe, treści błędów ani pełne środowisko nie są serializowane.

CI zachowuje pliki JSONL jako `unit-progress-ci-<run>-<attempt>-<shard>`. Przekroczenie limitu czasu zadania może uniemożliwić
późniejsze przesłanie plików; wyemitowane wcześniej sygnały aktywności pozostają materiałem
diagnostycznym. Brak sygnałów aktywności może również wskazywać na zablokowany lub zakończony proces
modułu wykonawczego. Te potwierdzenia zachowują dotychczasowy wybór testów, współbieżność, limity czasu
i kod zakończenia; nie stanowią werdyktów dotyczących dopuszczenia kandydata.

### Kolejka scalania

Etykieta `queue` wysyła PR do kolejki Mergify (`.mergify.yml`). Mergify otwiera wersję roboczą PR
w gałęzi `mergify/merge-queue/`, CI uruchamia tam pełny zestaw, a pierwotny PR jest scalany,
gdy kontrole `Gate / CI`, `Gate / Quality` i `Merge integrity (changelog + generated skills)`
zakończą się powodzeniem.

Mergify zapisuje podsumowanie kolejki w opisie wersji roboczej, a inne aplikacje również
mogą go edytować. Zdarzenie `pull_request` `edited` dotyczące takiej wersji roboczej otrzymuje
własną grupę współbieżności (`-queue-edit-<run_id>`), dzięki czemu nie może anulować właściwego
uruchomienia wersji roboczej, a także pomija bramkę i macierz. Nadal uruchamiana jest tylko
kontrola `Merge integrity`. Pominięte zadanie bramki ma inną nazwę kontroli, ponieważ Mergify
interpretuje pominiętą kontrolę `Gate / CI` jako niepowodzenie i usuwa PR z kolejki.

Po usunięciu z kolejki wypchnięcie nie zawsze powoduje ponowne dodanie PR do kolejki.
Dodaj do niego komentarz `@mergifyio queue`.

### Inwentaryzacja skanowania statycznego

Wersjonowany inwentarz aliasów npm i przynależność do skanowania statycznego znajdują się w
`config/quality/gate-manifest.json`. Uruchom `npm run check:gate-manifest`, aby zweryfikować
nazwy skryptów i dokładne polecenia względem `package.json`; dodania, usunięcia i zmiany poleceń
powodują niepowodzenie zarówno lokalnego hooka, jak i zadań klasyfikacji zmian w CI.
Alias nie jest zadaniem przepływu pracy, instancją macierzy ani przypadkiem testowym: tych
liczebności nie wolno przedstawiać jako równoważnych.

Użyj `npm run quality:scan -- --list` lub `npm run quality:scan:fast -- --list`,
aby sprawdzić wybrane aliasy bez ich wykonywania. Runner wywołuje punkt wejścia npm, dzięki czemu
jego środowisko uruchomieniowe (w tym Bun, jeśli zostało skonfigurowane) zostaje zachowane.
Manifest rejestruje aliasy spoza tych profili jako wywoływane oddzielnie, a polecenia
konserwacyjne są zabronione w profilach skanowania tylko do odczytu.

Profile te obejmują wyłącznie skanowanie statyczne. Nie certyfikują testów produktu,
pokrycia, pakowania, kontroli zewnętrznych ani pełnej akceptacji wydania kandydata.
Dopuszczanie przez przepływ pracy używa powiązanych `config/quality/admission-policy.json` oraz
`scripts/quality/admission-verdict.mjs`. Profile obserwatora wydania pozostają oddzielne;
należy niezależnie sprawdzać mające zastosowanie kontrole i potwierdzenia. Polecenia statyczne
pełnego obserwatora są zadeklarowane w `config/quality/release-green-static-profile.json`, w tym
`audit:deps`, wybór testów mutacyjnych i kontrole tłumaczeń. Moduł ładujący weryfikuje polecenia npm
względem package.json oraz modelowanych deklaracji CI/Quality; odrzuca rozbieżności zamiast
wykonywać tokeny powłoki jako argumenty. Wymagane dane wyjściowe skanera SKIP/INCOMPLETE nie mogą
ustanowić PASS. Profil rejestruje swoje wykluczenia zewnętrzne i nie zastępuje hostowanych danych
pokrycia, macierzy testów ani dowodów pakowania lub wdrożenia. Poniższy opisowy inwentarz ma
charakter informacyjny i nie stanowi dowodu, że bramka faktycznie została uruchomiona.

Skrypty znajdują się w `scripts/check/` (bramki polityki) oraz `scripts/quality/` (silnik zapadkowy).
Źródłem prawdy CI jest `.github/workflows/ci.yml`.

### Kondycja opublikowanej dokumentacji bazowej

`.github/workflows/i18n-base-health.yml` monitoruje stan dokumentacji po wybranych przesłaniach do `main` i `release/v*` oraz po ręcznym wysłaniu. Jego filtry obejmują dokumentację, root Markdown, `llm.txt`, tłumaczenie state/configuration i odpowiednie narzędzia i18n. Pojedyncze zadanie `Published base documentation health` korzysta z hostowanego Ubuntu i pięciominutowego terminu. Wykonuje weryfikację tylko do odczytu i zapisuje potwierdzenie diagnostyczne bez instalacji zależności, tłumaczenia lub przyjęcia stanu.

`scripts/i18n/check-base-health.mjs` wymaga zerowych niespójności w zakresie skrótu źródłowego, brakującego celu, skrótu docelowego, nieaktualnego tłumaczenia i niespójności w pamięci podręcznej sekcji. Potwierdza również bieżący podstawowy zakres document/locale i jego udokumentowane pochodzenie. Nieprawidłowy kontekst, niepełne pokrycie lub przerwane sprawdzanie powoduje wygenerowanie `INCOMPLETE`; potwierdzony dryf generuje `FAIL`. Obydwa zwracają status wyjścia zakończonego niepowodzeniem. Potwierdzenie jest powiązane z realizacją transakcji SHA, przepływem pracy, uruchomieniem i próbą i jest zachowywane jako `i18n-base-health-<sha>-<run>-<attempt>`.

Jest to niezależna obserwacja opublikowanej bazy. Nie dodaje zdarzenia PR ani grupy scalającej, wymaganego sprawdzenia PR, aliasu npm ani członka profilu skanowania statycznego. Podstawowy moduł sprawdzający blokuje również wszystkie pięć klas w trybie bezwzględnym. Zwykłe przygotowanie PR pozostaje oddzielone od przyjęcia. Pomyślne przesyłanie nie może zamienić nieudanego wyniku kondycji w PASS.

Zwykły PR używa `--preflight` z raportem bazowym wygenerowanym przez `--baseline-evidence`. Może pozostawić angielskie źródło w oczekiwaniu tylko wtedy, gdy pełny zapis tłumaczenia i rzeczywiste bajty docelowe nie zmienią się w stosunku do tej dokładnej podstawy. Nowe niespójności w celu lub pamięci podręcznej sekcji nadal blokują, a niekompletne dowody nie mogą autoryzować przygotowania. Raport przedstawia oddzielnie `preparationPending` i `mergeReady` : pomyślne przygotowanie nie oznacza, że oczekujące tłumaczenia będą gotowe do połączenia. Odśwież dotknięte lustra u opanowanego kandydata przed przyjęciem. Zaufany kandydat na kolejkę Mergify, `merge_group`, wypychanie gałęzi i ręczne uruchamianie CI korzystają z narzędzia sprawdzania bezwzględnego, bez `--warn` lub wybaczania dziedziczonych błędów. Brakujące skróty docelowe i zakres zmniejszony przez usunięte nagrane pliki podstawowe nie mogą dać pozytywnego absolutnego werdyktu.

### Zwolnij szybką ścieżkę PR (`quality.yml`)

`.github/workflows/quality.yml` uzupełnia CI na main/release PRs, wypycha do `main`, wysyła i łączy grupy. PRs używa szybkich kontroli filtrowanych według ścieżki. Usunięto trwale wyłączoną zduplikowaną kompilację; prawdziwe czeki build/package/boot pozostają w CI. Zestaw jednostek i vitest działają tylko w CI (`Unit Tests (N/8)` i `Vitest`).

| Stanowisko                                       | Zakres                                                                                                                                                                                                                           | Bloking                  |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API dokumenty referencyjne i dokumenty-wszystko                                                                                                                                                                   | Tak                      |
| `Fast Quality Gates`                             | Kod PRs; kontrole statyczne, sprawdzanie typu, sprawdzanie typu pulpitu nawigacyjnego, testy jednostkowe, na które wpływa                                                                                                        | Tak                      |
| `Forgotten sibling tests`                        | Kod PRs; zmienione moduły powiązane ze statycznymi konsumentami i potencjalnymi testami rodzeństwa; ścieżki beczki i importu dynamicznego są zgłaszane jako doradcza diagnostyka, z wyjątkami wymienionymi na liście dozwolonych | **Doradczy**             |
| `No new ESLint warnings`                         | Kod PRs; Osłona chroniąca przed kłaczkami                                                                                                                                                                                        | Tak, łącznie z widelcami |
| `Merge integrity (changelog + generated skills)` | Bez przeciągu PRs; dziennik zmian i wygenerowana synchronizacja umiejętności                                                                                                                                                     | Tak, łącznie z widelcami |

#### Zapomniany raport z testów rodzeństwa

`npm run check:forgotten-sibling-tests` działa jako krok doradczy `Fast Quality Gates` i ponownie wykorzystuje moduł rozpoznawania importu za mapą wpływu testu. Dla każdego zmienionego modułu produkcyjnego raportuje deterministyczne łańcuchy `changed module/symbol -> static consumer -> candidate sibling test`, gdy w różnicowym żądaniu ściągnięcia nie ma testu kandydującego. Podsumowanie Markdown i wynik JSON są zachowywane jako artefakt przepływu pracy `forgotten-sibling-tests` do kalibracji przed jakimkolwiek wdrożeniem blokującym.

Reeksport beczek i import dynamiczny służą wyłącznie do diagnostyki rozdzielczości; nigdy nie powodują ustalenia blokującego. Recenzowane wyjątki żyją w `config/quality/forgotten-sibling-allowlist.json`. Każdy wpis musi zawierać nazwę testu konsumenta i kandydata, podać konkretne uzasadnienie i powiązać problem GitHub lub żądanie ściągnięcia. Źle sformułowane wpisy nie są zamykane. Wyjątki nie mogą pomijać usuniętego testu kandydata ani różnicy, która dodaje `.skip`/`.todo`; osłabienie asercji i inne maskowanie pozostają własnością niezależnie blokującej bramki `check:test-masking`.

### Zadanie: `lint`

Uruchamiane dla każdego PR-u do `main`. W przypadku niepowodzenia blokuje scalenie.

| Skrypt (`npm run ...`)            | Sprawdza                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Blokujący                                    |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Wersja Node.js mieści się w obsługiwanym zakresie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Tak                                          |
| `check:cycles`                    | Cykliczne importy w całych katalogach `src/` i `open-sse/` (na podstawie AST, z uwzględnieniem `paths` z tsconfig). Wariant podstawowy kończy działanie z kodem 1, gdy istnieje jakikolwiek cykl (zasada fail-closed obowiązująca od #15281), i wyświetla listę silnie spójnych składowych (SCC). `check:cycles:ratchet` (uruchamiany w CI) blokuje, gdy liczba przekracza limit `metrics.cycles` w pliku `quality-baseline.json` — obecnie 14, `direction: down`, więc może tylko maleć (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Tak (mechanizm zapadkowy)                    |
| `check:boundary`                  | Sprzężenie `open-sse → src`: unikatowe importy między plikami z silnika do aplikacji (`scripts/quality/measure-boundary.mjs`; lista krawędzi stanowi backlog działań naprawczych związanych z podziałem rdzenia/modułów w wersji v4). Wariant podstawowy = raport doradczy (tak samo jak `quality:boundary`). `check:boundary:ratchet` (uruchamiany w CI, a także w pętli mechanizmu zapadkowego szybkich bramek w `quality.yml`) blokuje, gdy liczba przekracza limit `metrics.boundaryOpenSseToSrc` w pliku `quality-baseline.json` — początkowo ustawiony na zmierzoną wartość 771, `direction: down`; `--update` może go tylko obniżyć; w PR-ach wartość jest ustalana względem gałęzi bazowej (`--base-ref`, patrz niżej)                                                                                                                                                                                                                                                                                                                                                                  | Tak (mechanizm zapadkowy)                    |
| `check:route-validation:t06`      | Obecność schematów Zod we wszystkich trasach (zasady poziomu 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Tak                                          |
| `check:any-budget:t11`            | Liczba `@ts-expect-error // any` nie przekracza budżetu (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Tak                                          |
| `check:provider-consistency`      | Każdy dostawca w `providers.ts` ma odpowiadający mu wpis w `providerRegistry.ts` (i odwrotnie, w ramach listy dozwolonych elementów)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Tak                                          |
| `check:model-lifecycle`           | Trzy ręcznie utrzymywane tabele routingu pozostają zgodne z przechowywaną w repozytorium migawką cyklu życia (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nie przyznaje punktów żadnemu wycofanemu identyfikatorowi, do którego `REGISTRY` może kierować żądania; każdy cel z `BUILT_IN_ALIASES` znajduje się w `REGISTRY` i nie występuje w migawce wycofanych identyfikatorów; każdy wycofany identyfikator nadal obecny w `REGISTRY` jest przekierowywany lub wymieniony w `allowedRetiredInCatalog`; ponadto żadne źródło ani cel z `DEFAULT_DEGRADATION_MAP` nie jest oznaczone jako wycofane w tej migawce. Nie dowodzi to, że model jest obecnie obsługiwany przez aktywną usługę nadrzędną. Działa offline — porównuje z `config/quality/model-lifecycle.json`, odświeżanym ręcznie za pomocą `npm run quality:refresh-model-lifecycle` (wymaga sieci; nie jest podłączone do CI). `allowedRetiredInCatalog` jest zapadką stopniowej redukcji: wpis należy dodawać wyłącznie wraz ze zgłoszeniem śledzącym.                                                                             | Tak                                          |
| `check:fetch-targets`             | Każde `fetch("/api/...")` w kodzie klienckim w `src/` wskazuje na rzeczywisty plik `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Tak                                          |
| `check:deps`                      | Wszystkie zależności możliwe do zainstalowania za pomocą `npm install` ze wszystkich plików `package.json` w repozytorium znajdują się w `dependency-allowlist.json`; nowe pakiety bez przypiętej wersji lub podszywające się pod inne są oznaczane                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Tak                                          |
| `audit:deps`                      | Audyt npm wszystkich pięciu niezależnych plików blokady (głównego, Electron, wtyczek OpenCode v1/v2 oraz dostawcy). Krytyczne ostrzeżenia blokują proces; ostrzeżenia o wysokim poziomie zagrożenia pozostają widoczne. Brakujące lub nieudane audyty mają status INCOMPLETE i blokują proces; skróty plików blokady oraz raporty są zachowywane osobno dla każdego zakresu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Tak                                          |
| `check:lockfile`                  | Integralność `package-lock.json` — rejestr https, skróty integralności, brak nadpisywania hostów                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Tak                                          |
| `check:licenses`                  | Lista dozwolonych licencji SPDX dla zależności produkcyjnych                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Tak                                          |
| `check:tracked-artifacts`         | Brak artefaktów kompilacji / zatwierdzonych dowiązań symbolicznych `node_modules` (uruchamiane również w husky przed zatwierdzeniem; kontrola przed wysłaniem jest celowo uproszczona — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Tak                                          |
| `check:ai-attribution`            | Brak stopki `Co-Authored-By` wskazującej AI/bota ani informacji o wygenerowaniu przez AI w commitach, tytule lub treści PR — twarda reguła nr #16 (w pętli szybkich kontroli `quality.yml` dla PR→`release/**` — odczytuje dane zdarzenia i nie wykonuje żadnej operacji poza PR — oraz w kroku wykonywanym tylko dla PR w kontroli lint w `ci.yml` dla PR→`main`; także hook husky `commit-msg`; współautorzy będący ludźmi są dozwoleni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | Każde wykluczenie Vitest wskazuje zgłoszenie śledzące i znajduje się w `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Tak                                          |
| `check:file-size`                 | Pliki źródłowe (`.ts`/`.tsx` w `src/`, `open-sse/`, `electron/`, `bin/`) nie przekraczają `cap`, a pliki testowe (`*.test.ts(x)`) nie przekraczają `testCap`; pliki zamrożone w `file-size-baseline.json` (`frozen` / `testFrozen`) nie mogą przekroczyć zarejestrowanego rozmiaru                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Tak                                          |
| `check:error-helper`              | Odpowiedzi błędów w executorach/handlerach używają `buildErrorBody()` / `sanitizeErrorMessage()` (Twarda reguła nr #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Tak                                          |
| `check:migration-numbering`       | Pliki SQL migracji są numerowane kolejno, bez luk ani duplikatów                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Tak                                          |
| `check:public-creds`              | Brak literałów OAuth `client_id`/`client_secret` ani kluczy Firebase Web poza `publicCreds.ts` (Twarda reguła nr #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Tak                                          |
| `check:db-rules`                  | Brak surowego SQL poza modułami `src/lib/db/`; brak importów zbiorczych z `localDb.ts` (Twarde reguły nr #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Tak                                          |
| `check:known-symbols`             | Executory dostawców, strategie routingu i translatory zarejestrowane w ich tabelach dyspozytorskich odpowiadają plikom na dysku — bez osieroconych ani niezadeklarowanych symboli                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Tak                                          |
| `check:route-guard-membership`    | Każda trasa uruchamiająca proces potomny jest sklasyfikowana przez `isLocalOnlyPath()` (Twarde reguły nr #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Tak                                          |
| `check:test-discovery`            | Każdy plik `*.test.ts` / `*.spec.ts` w repozytorium jest wykrywany przez co najmniej jeden mechanizm uruchamiania testów (mechanizm zapadkowy: lista osieroconych plików w `test-discovery-baseline.json` może się tylko zmniejszać)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Tak                                          |
| `check:test-tla-order`            | Żaden plik `node:test` w `tests/unit` nie rejestruje testu, napotyka `await` na najwyższym poziomie, a następnie rejestruje kolejne testy (#18045; mechanizm zapadkowy: `test-tla-order-allowlist.json` może się tylko zmniejszać)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Tak                                          |
| `check:agent-skills-sync`         | Wygenerowane artefakty umiejętności agentów są zgodne z katalogiem źródłowym (brak rozbieżności)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | Logo i zasoby dostawców mają zarejestrowany wpis dotyczący pochodzenia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | Pliki konfiguracyjne JSON są poprawnie analizowane i spełniają reguły lintowania repozytorium                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | Kompilacja TypeScript bez błędów (tylko ostrzeżenia informacyjne)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Tak                                          |
| `typecheck:noimplicit:core`       | Ścisłe `noImplicitAny` — rozwiązanie przyszłościowe; wiele istniejących miejsc wywołań nadal wymaga adnotacji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Informacyjne** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograniczony do `src/app/(dashboard)/**` (#7033) — starannie dobrana lista 27 dozwolonych plików w `typecheck:core` nie obejmuje żadnych plików TSX panelu, a `next build` również nigdy nie sprawdza ich typów (`next.config.mjs` ustawia `ignoreBuildErrors: true`), dlatego regresje osieroconych identyfikatorów w tym obszarze (#6625/#6909) były niewidoczne dla CI. Porównuje wyniki z zamrożoną wartością bazową liczby błędów dla każdego pliku i kodu TS (`config/quality/dashboard-typecheck-baseline.json`, ten sam wzorzec wymuszania aktualności co w `check:known-symbols`) — bramkę blokują wyłącznie NOWE błędy ponad liczbę zapisaną w wartości bazowej; gdy istniejący wcześniej błąd zostanie naprawiony, obniż wartość bazową za pomocą `--update`.                                                                                                                                                                                                                                                                                                                   | Tak                                          |
| `check:build-typecheck`           | Sprawdzanie typów całej aplikacji produkcyjnej za pomocą `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), których nie obejmuje powierzchnia 27 plików listy dozwolonych `typecheck:core` ani kontrola dashboardu. Porównuje zmiany z `config/quality/build-typecheck-baseline.json`; nowa lub zwiększona liczba dla pary (plik, kod) powoduje niepowodzenie, a mniejsza liczba prosi o jej zmniejszenie. `--update` odmawia działania, gdy przebieg zawiera nową lub zwiększoną parę, chyba że przekazano `--force-regressions`, oraz odmawia działania dla nowo wyciszonego pliku, chyba że przekazano `--force-nocheck`, dzięki czemu rozszerzenie bazy w celu uzyskania zielonego wyniku i przyznanie trwałego wyciszenia są dwoma odrębnymi, zamierzonymi działaniami. Samo `--force` jest odrzucane. Skanuje również zakres kompilacji pod kątem `@ts-nocheck` względem `config/quality/ts-nocheck-baseline.json`, ponieważ plik, który go używa, nie zgłasza żadnych diagnostyk i w przeciwnym razie byłby niewidoczny dla każdej kontroli. | Tak                                          |

#### Dwa programy sprawdzania typów udzielają różnych odpowiedzi

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) i `check:build-typecheck` kompilują różne programy z użyciem różnych
opcji, a ten sam plik może być czysty w jednym z nich i pełen błędów w drugim.

`tsconfig.build.json` ustawia `"strict": false`, więc `noImplicitAny` jest wyłączone. Konfiguracja
core kompiluje wyselekcjonowaną listę dozwolonych 27 plików z bardziej rygorystycznymi opcjami
i podąża za grafem importów każdego wpisu, dlatego pliki, które nigdy nie pojawiają się w programie
kompilacji, są tam nadal sprawdzane.

Ma to znaczenie przy ocenie, czy plik jest typowany: **zero diagnostyk
w ramach `check:build-typecheck` nie oznacza zera**. Usunięcie `@ts-nocheck` z 26
plików wykazało, że 23 z nich są czyste w programie kompilacji; w szesnastu z nich
w rygorystycznym programie ujawniło się około 120 błędów implicit-any. Sprawdź oba
programy, zanim uznasz plik za czysty.

### Zadanie: `quality-gate`

Uruchamiane po `test-coverage`. W przypadku niepowodzenia blokuje scalanie.

| Skrypt                       | Weryfikuje                                                                                                                                                                | Blokujący                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `quality:collect`            | Generuje `quality-metrics.json` (liczba ostrzeżeń ESLint, pokrycie ze scalonego raportu fragmentów)                                                                       | Tak (przed mechanizmem zapadkowym) |
| `quality:ratchet`            | Żadna metryka w `quality-baseline.json` nie uległa pogorszeniu (ostrzeżenia ESLint ≤ wartość bazowa; pokrycie ≥ wartość bazowa)                                           | Tak                                |
| `check:duplication`          | Duplikacja kodu (jscpd@4) nie przekracza wartości bazowej w `quality-baseline.json`                                                                                       | Tak                                |
| `check:complexity`           | Złożoność cyklomatyczna na poziomie pliku nie przekracza limitu (reguły podstawowego ESLint `complexity` + `max-lines-per-function`)                                      | Tak                                |
| `check:cognitive-complexity` | Mechanizm zapadkowy złożoności poznawczej (`eslint-plugin-sonarjs`) — osobne uruchomienie ESLint; CI wykonuje oba w ramach pojedynczego kroku `check:complexity-ratchets` | Tak                                |
| `check:dead-code`            | Mechanizm zapadkowy nieużywanych eksportów / plików (knip) nie wykazuje regresji względem wartości bazowej                                                                | Tak                                |
| `check:compression-budget`   | Budżet benchmarku kompresji — minimalne progi oszczędności tokenów dla poszczególnych silników nie mogą ulec pogorszeniu                                                  | Tak                                |
| `check:type-coverage`        | Mechanizm zapadkowy procentowego udziału kodu z typami (`type-coverage`) nie wykazuje regresji; w dużej mierze obejmuje `typecheck:noimplicit:core`                       | Tak                                |

### Zadania: `codeql-scan` i `codeql-admission`

`codeql-scan` wytwarza wszystkie skonfigurowane kategorie analiz. Po sukcesie tego zadania `codeql-admission` weryfikuje jego dokładne przesłania oraz ratchet alertów kandydata. Oba są wymaganymi zależnościami `Gate / CI`, również dla kandydatów zmieniających tylko dokumentację. Wymogi aktywacji administracyjnej i próby canary opisano niżej w sekcji „Ratchet CodeQL”.

| Skrypt                 | Weryfikuje                                                                                                                                                                                               | Blokujący |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:codeql-ratchet` | Ref/SHA kandydata i wszystkie skonfigurowane kategorie analiz muszą być aktualne przed ratchetem alertów; brak dowodów blokuje. Globalny inwentarz pozostaje oddzielny — zobacz „Ratchet CodeQL” poniżej | Tak       |

### Zadanie: `quality-extended`

Zadanie blokuje odpowiednich kandydatów. Rozmiar pakietu, wykryte sekrety, wykryte
luki w zabezpieczeniach, wykryte problemy w przepływach pracy oraz zmiany OpenAPI są sprawdzane za pomocą wymaganych mechanizmów zapadkowych.
Diagnostyka zależności cyklicznych pozostaje doradcza. Instalacja skanerów jest wymagana:
`scripts/ci/install-quality-scanners.sh` instaluje przypięte wersje i propaguje
błędy instalacji. Brakujące narzędzia, nieprawidłowe raporty lub brakujące wartości bazowe pozostawiają
wymaganą bramkę skanera w stanie NIEUKOŃCZONYM.

| Skrypt                   | Weryfikuje                                                                                                                                                                                                                                                                 | Blokowanie                                      |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | Brak zależności cyklicznych (dpdm)                                                                                                                                                                                                                                         | **Doradcze**                                    |
| `check:bundle-size`      | Rozmiar pakietu nie przekracza limitu; brak możliwości wykonania pomiaru powoduje niepowodzenie                                                                                                                                                                            | **Blokujące z --ratchet**                       |
| `check:secrets`          | Liczba wykryć Gitleaks nie wzrasta; wymagane skany odrzucają brakujące narzędzia/kod źródłowy/linię bazową, nieudane skany oraz nieprawidłowe raporty                                                                                                                      | **Blokujące z --ratchet**                       |
| `check:vuln-ratchet`     | Liczba luk w zabezpieczeniach zależności nie wzrasta; wymagane skany odrzucają brakujące narzędzia, nieprawidłowe raporty lub brakujące linie bazowe                                                                                                                       | **Blokujące z --ratchet**                       |
| `check:workflows`        | Lint przepływów pracy (actionlint + zizmor); brakujące/uszkodzone skanery, nieprawidłowe raporty lub brakująca linia bazowa mechanizmu ratchet powodują niepowodzenie ze statusem INCOMPLETE. Prawidłowe wykrycia podlegają wybranej polityce strict/advisory/ratchet      | Wykonanie wymagane; ratchet zizmor blokuje w CI |
| `check:openapi-breaking` | Publiczny kontrakt API względem przypiętych commitów zdarzeń (baza scalania PR, stan przed wypchnięciem, baza grupy scalania; dla uruchomień zaplanowanych/ręcznych najpierw pierwszy rodzic bieżącego checkoutu); wymagany pomiar kończy się niepowodzeniem w razie błędu | **Blokujące z --ratchet**                       |

### Stanowisko: `docs-sync-strict`

W przypadku żądań ściągnięcia do `main` lub `release/**` to zadanie jest uruchamiane tylko dla kandydatów spoza wersji roboczej (lub z zaufanej kolejki) sklasyfikowanych jako zmiany w dokumentacji lub kodzie. Bierze także udział w wydarzeniach CI innych niż PR; Wyzwalacz push tego przepływu pracy obejmuje tylko `main`, a nie `release/**`. Krok, który wychodzi z wartości niezerowej, blokuje zadanie; ustalenia zawarte wyłącznie w raporcie i udokumentowane wyjątki poniżej nie.

| Skrypt                         | Weryfikuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Blokowanie                                                                                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-bramka, która kolejno uruchamia 7 poniższych bramek podrzędnych                                                                                                                                                                                                                                                                                                                                                                                                                                                | Tak                                                                                                                                                                    |
| ↳ `check:docs-sync`            | Spójność wersji Package/OpenAPI/CHANGELOG, dokładne kopie lustrzane `llm.txt`, przetłumaczone niezmienniki CHANGELOG section/size i brak zastąpionych duplikatów dokumentów                                                                                                                                                                                                                                                                                                                                         | Tak                                                                                                                                                                    |
| ↳ `check:docs-frontmatter`     | Skompilowane strony dokumentacji zawierają ważne tytuły                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Tak                                                                                                                                                                    |
| ↳ `check:docs-counts`          | Niezmienniki liczby o wysokiej pewności są ścisłe; Heurystyczne sprawdzanie liczby plików ostrzega tylko, chyba że skrypt otrzyma `--strict` (metabrama CI go nie przepuszcza)                                                                                                                                                                                                                                                                                                                                      | Ścisłe blokowanie poziomów; Doradztwo na poziomie miękkim                                                                                                              |
| ↳ `check:env-doc-sync`         | Źródłowe odczyty env, `.env.example` i `docs/reference/ENVIRONMENT.md` zgadzają się po jawnych listach dozwolonych ignorowania, tylko doc i tylko env                                                                                                                                                                                                                                                                                                                                                               | Tak, poza udokumentowanymi listami dozwolonych                                                                                                                         |
| ↳ `check:deprecated-versions`  | Zgłasza potencjalne nieaktualne wersje poza bezpiecznymi kontekstami historycznymi i nieaktualnymi datami aktualizacji, z wyłączeniem zignorowanych dokumentów                                                                                                                                                                                                                                                                                                                                                      | Doradztwo w zakresie aktualnego okablowania CI (`--strict` nie jest przekazywane)                                                                                      |
| ↳ `check:doc-links`            | Wewnętrzne linki do przecen w dokumentach prowadzą do prawdziwych plików (formularz `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                                                             | Tak                                                                                                                                                                    |
| ↳ `check:fabricated-docs`      | Trasy, zmienne env, polecenia CLI, nazwy haków i ścieżki plików cytowane w dokumentach istnieją w bazie kodu. Twarda brama przez `--strict`; soft-fail bez flagi.                                                                                                                                                                                                                                                                                                                                                   | Tak (poprzez `--strict` w CI)                                                                                                                                          |
| `check:cli-i18n`               | Używane klucze CLI `t()` istnieją w `en`; `pt-BR` zachowuje wszystkie sekcje najwyższego poziomu; `zh-CN` i `zh-TW` zawierają wszystkie klucze z `en`                                                                                                                                                                                                                                                                                                                                                               | Tak                                                                                                                                                                    |
| `check:openapi-coverage`       | Specyfikacja OpenAPI obejmuje co najmniej podniesiony mechanizmem ratchet minimalny próg rzeczywistych tras                                                                                                                                                                                                                                                                                                                                                                                                         | Tak                                                                                                                                                                    |
| `check:openapi-security-tiers` | Zadeklarowane adnotacje `x-loopback-only`/`x-always-protected` muszą mieć pokrycie w `routeGuard.ts`; błędy parsera i niezgodności kontroli w przód blokują. Odwrotna kontrola brakujących `x-loopback-only` pod prefiksami tylko lokalnymi ostrzega, a trasy określone wyłącznie wzorcami są wyłączone z tej odwrotnej kontroli.                                                                                                                                                                                   | Parser/kontrole w przód blokują; kontrola odwrotna jest doradcza                                                                                                       |
| `check:openapi-routes`         | Każda ścieżka `/api...` w `openapi.yaml` odpowiada rzeczywistej trasie niezależnie od nazw parametrów po uwzględnieniu uzasadnionej listy wyjątków `KNOWN_STALE_SPEC`; nieaktualne wpisy na tej liście również powodują niepowodzenie                                                                                                                                                                                                                                                                               | Tak                                                                                                                                                                    |
| `check:docs-symbols`           | Wewnętrzne odwołania URL `/api/...` w kanonicznych dokumentach niebędących kopiami tłumaczeń odpowiadają rzeczywistej trasie lub rodzinie tras; odwołania proxy/upstream/placeholder/plikowe i uzasadnione wpisy `KNOWN_STALE_DOC_REFS` są wyłączone, a nieaktualne wpisy na liście wyjątków powodują niepowodzenie                                                                                                                                                                                                 | Tak                                                                                                                                                                    |
| `i18n translation drift`       | Bezwzględne przyjęcie wymaga zerowych niespójności w źródle, brakującym celu, hashu celu, nieaktualnym tłumaczeniu i niespójnościach w pamięci podręcznej sekcji. Zwykłe przygotowanie PR może zachować dokładnie odziedziczone dowody lub oczekującą zmianę tylko w języku angielskim z niezmienionymi pełnymi bajtami stanu i celu; jego raport osobno deklaruje gotowość do fuzji. Brakujące skróty docelowe i niekompletny podstawowy blok dowodów. Brak pamięci podręcznej starszej sekcji nie oznacza awarii. | Wszystkie pięć klas blokuje wstęp queue/base ; zwykłe przygotowanie pozwala tylko na sprawdzoną pracę odziedziczoną lub oczekującą pracę wyłącznie w języku angielskim |

Generowanych jest dwanaście README SVGs w ramach `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regeneruje je wszystkie). Każdy z nich ma test jednostkowy porównania bajtów (`tests/unit/docs/readme-*-svg.test.ts`, zadanie `test-unit`), który kończy się niepowodzeniem, gdy zatwierdzony plik jest nieaktualny, a `check:docs-counts` odczytuje liczby kanoniczne ze swoich węzłów `<text>` — dlatego krok konspektu utrzymuje każdy zarysowany ciąg w pliku jako niewidoczny `<text>`. Kontrola liczb kanonicznych SVG odczytuje pliki wymienione w `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg` plus `public/images/tier-flow-dark.svg` i `tier-flow-light.svg`; roszczenia dotyczące bezpłatnego na zawsze, wpisu do katalogu, puli cyklicznej i czynników scoringowych również brzmią jako `promise-pillars.svg`, `free-tier-budget.svg` i `strategies-grid.svg`. `free-tier-budget.svg` pobiera swoje dane z modułu ładującego katalog na żywo, więc zmiana na `FREE_MODEL_BUDGETS` lub wyświetlaną nazwę dostawcy powoduje zmianę CI do czasu ponownego wygenerowania tego pliku.

### Zadanie: `i18n-ui-coverage`

| Skrypt                            | Sprawdza                                                                                                                                                                                                                                                        | Blokujący     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (inline) | Pokrycie kluczy internacjonalizacji interfejsu użytkownika wynosi ≥ 65%                                                                                                                                                                                         | Tak           |
| `check-ui-value-drift` (inline)   | Przepisana angielska **wartość** nie pozostawia nieaktualnych tłumaczeń                                                                                                                                                                                         | Tak           |
| `check-new-key-coverage` (inline) | **Nowy** angielski klucz jest przetłumaczony we wszystkich ustawieniach regionalnych — znacznik `__MISSING__:` jest odrzucany                                                                                                                                   | Tak           |
| `check-translation-ratio`         | Współczynnik rzeczywistych tłumaczeń dla ustawienia regionalnego (wartości identyczne z angielskimi / symbole zastępcze / brakujące liście spoza listy dozwolonych) nie może przekraczać wartości z `config/quality/i18n-translation-baseline.json` + marginesu | **Blokujące** |

Wymaga `fetch-depth: 0` — mechanizm wykrywania rozbieżności wartości porównuje `en.json` z bazą scalania.

#### `check-ui-value-drift` — bramka wykrywania nieaktualnych tłumaczeń

Wykrywa jedną regresję internacjonalizacji, której pozostałe mechanizmy z przyczyn strukturalnych nie są w stanie zauważyć: angielska wartość
zostaje przepisana, a tłumaczenia utworzone na podstawie _poprzedniej_ wersji angielskiej pozostają bez zmian, przez co
użytkownicy nieanglojęzyczni nadal czytają sformułowany z przekonaniem, ale obecnie błędny tekst.

Taka sytuacja rzeczywiście trafiła do wydania. `oauthModal.googleOAuthWarning` został przepisany po dodaniu
pomocniczego mechanizmu logowania Antigravity (#5203); **39 z 43 ustawień regionalnych** zachowało tekst instruujący operatorów, aby „skopiowali
pełny adres URL i wkleili go poniżej” — tego procesu nie można ukończyć dla tego dostawcy. Problem pozostał
niezauważony aż do #8463, ponieważ:

- `sync-ui-keys` uzupełnia wyłącznie klucze, których **brakuje**, nigdy te, które są **nieaktualne**;
- `check-ui-keys-coverage` zlicza _obecność_ kluczy, więc nieaktualne tłumaczenie jest uznawane za pokryte;
- `check-translation-drift` śledzi kopie dokumentacji `docs/i18n/<locale>/**.md` —
  nigdy nie odczytuje `src/i18n/messages/*.json`. Blokuje w zadaniu `docs-sync-strict` od ponownej
  synchronizacji 2026-09: edycja głównego dokumentu → `npm run i18n:run -- --files=<doc>` (na poziomie sekcji, niski koszt).

**Uwzględnia różnice, nie opiera się na bazie odniesienia.** Porównuje `en.json` z bazy scalania
z drzewem roboczym; dla każdego klucza, którego angielska wartość się zmieniła, każde ustawienie regionalne nadal zawierające
niezmienione tłumaczenie jest nieaktualne. Celowo **zamraża istniejący wcześniej dług** — różnica
nie może ujawnić, z której starej angielskiej wersji pochodzi istniejące od dawna tłumaczenie, dlatego mechanizm ocenia
wyłącznie elementy zmienione przez bieżącą modyfikację. Alternatywa (bazowa lista skrótów dla poszczególnych kluczy) wymagałaby
wygenerowanego pliku o rozmiarze około 600 KB, trzykrotnie większego od największej istniejącej bazy odniesienia, zmieniającego się przy każdym PR dotyczącym internacjonalizacji.

Można spełnić te wymagania na dwa sposoby:

1. zaktualizować odpowiednie tłumaczenia albo
2. ustawić ich wartość na `__MISSING__:<new english>` — środowisko wykonawcze wyświetli wówczas poprawiony tekst angielski
   (`src/i18n/request.ts::deepMergeFallback`, #7258), a klucz trafi do kolejki tłumaczeń.

Jeśli zmieniło się **znaczenie** ciągu, lepiej **zmienić nazwę klucza**: nowy klucz nie może odziedziczyć
nieaktualnego tłumaczenia. Ten wzorzec zastosowano w #8463.

```bash
npm run i18n:check-value-drift          # tryb ścisły (uruchamiany przez CI)
npm run i18n:check-value-drift:warn     # tylko raportowanie
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Bramki dryfu wartości i nowych kluczy współdzielą jedno niezmienne porównanie z
`scripts/i18n/resolve-ui-diff-base.mjs`. Przepływ pracy przekazuje do obu kontroli te same
SHA bazy, końcówki bazy i kandydata. Uruchomienia dla PR/zmiany bazy docelowej, operacji
push i grupy scalania używają kontekstu odpowiedniego zdarzenia. Uruchomienie dla gałęzi
kandydującej wymaga dokładnie odpowiadającego jej otwartego PR albo jawnie podanej wartości
wejściowej `i18n_base_sha`. Uruchomienie ręczne lub zaplanowana obserwacja gałęzi `main`
albo `release/vX.Y.Z` bez tej wartości wejściowej porównuje ostatni commit z jego pierwszym
rodzicem; nie jest to audyt całego odziedziczonego długu tłumaczeniowego. Wywołanie lokalne
wymaga jawnie określonej bazy porównania, na przykład za pomocą powyższego polecenia
`BASE_REF`.

Brakujący lub niejednoznaczny kontekst porównania, niemożliwy do odczytania albo
nieprawidłowy wymagany katalog oraz zmieniony kandydat skutkują wynikiem `INCOMPLETE`
z kodem zakończenia **2**, również w trybie ostrzegania. Katalogi są odczytywane za pomocą
`scripts/i18n/read-ui-catalog.mjs`; błędy odczytu nie są zastępowane pustymi obiektami.
Ani niedostępna baza, ani niekompletne dane wejściowe nie oznaczają wyniku PASS.

### Praca: `i18n`

Pełna macierz walidacji i18n (jedno zadanie na lokalizację). Całość pracy ma charakter doradczy.

| Scenariusz                      | Sprawdza                                             | Bloking                                                |
| ------------------------------- | ---------------------------------------------------- | ------------------------------------------------------ |
| `validate_translation.py quick` | Kompletność tłumaczenia według ustawień regionalnych | **Doradczy** (`continue-on-error: true` na całą pracę) |

### Praca: `pr-test-policy`

Działa tylko na żądanie ściągnięcia.

| Scenariusz             | Sprawdza                                                                                                                               | Bloking |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PRs zmieniające kod produkcyjny w `src/`, `open-sse/`, `electron/` lub `bin/` muszą zawierać lub aktualizować testy (twarda reguła #8) | Tak     |
| `check:test-masking`   | Zmienione pliki testowe nie zmniejszają liczby asercji sieciowych ani nie dodają tautologii `assert.ok(true)`                          | Tak     |
| `check:pr-evidence`    | PR body cytuje dowody test/VPS na zmianę (mechanizuje twardą regułę #18 poprzez grepowanie PR prose — kruchy, zobacz Backlog)          | Tak     |

### Zadanie: `test-vitest`

Wymaga zadania klasyfikacyjnego `changes`. Odpowiednie fragmenty macierzy blokują scalanie w przypadku niepowodzenia.

| Zestaw           | Weryfikuje                                                             | Blokujący                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Serwer MCP (110 narzędzi), autoCombo, pamięć podręczna — runner vitest | Tak                                                                                                                                             |
| `test:vitest:ui` | Testy komponentów UI — runner vitest                                   | **Blokujący** — istniejące wcześniej niepowodzenia są jawnie wykluczone w `vitest.config.ts`; nowe niepowodzenia powodują niepowodzenie zadania |

### Nocne przepływy pracy (zaplanowane, doradcze)

Działają one zgodnie z harmonogramem cron (i `workflow_dispatch`), nigdy na PRs. Wszystkie mają charakter doradczy.

| Przebieg pracy         | Sprawdza                                                                                                                                                                      | Bloking      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | szybkie sprawdzenie testów właściwości z dużą liczbą losowych nasion +                                                                                                        | **Doradczy** |
| `nightly-resilience`   | bramka wzrostu sterty, wstrzykiwanie błędów chaosu, k6 load/soak                                                                                                              | **Doradczy** |
| `nightly-llm-security` | zachęta do wstrzykiwania (tryb blokowy) sondy + garak (pomijane bez klucza tajnego dostawcy)                                                                                  | **Doradczy** |
| `nightly-schemathesis` | Fuzzowanie kontraktu OpenAPI (schemat) w porównaniu z żywym OmniRoute przy użyciu `docs/openapi.yaml` Naruszenia specyfikacji powierzchni — / nieobsługiwane 500 (faza 8 B.4) | **Doradczy** |
| `nightly-mutation`     | Wynik testu mutacji Strykera na szybkiej linii jednostkowej — który przeżył, jest słaby na powierzchni mutantów                                                               | **Doradczy** |
| `nightly-compat`       | Macierz kompatybilności silnika węzła w obsługiwanych zakresach `engines.node`                                                                                                | **Doradczy** |

Wartości bazowe wydajności (sterta, TTFB, czas kompilacji) są rejestrowane, a nie bramkowane: patrz [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Faza szybkości (2026-08-30 → v4.0 LTS): każdy poziom bazowy poluzowany o 20%

Decyzja właściciela (2026-08-30): do czasu modularyzacji w v4.0 szybkość dostarczania jest ważniejsza
niż utrzymywanie długu na stałym poziomie. Każdy **liczbowy** poziom bazowy mechanizmu zapadkowego został poluzowany o 20% w ramach jednej
kontrolowalnej operacji, a faza została zadeklarowana w `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Co się zmieniło                                                                                                                                                                                                                                 | Gdzie                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — liczniki, w których mniej znaczy lepiej, ×1.2; wartości procentowe, w których więcej znaczy lepiej, ÷1.2 (minimalne pokrycie 60 zachowane, `eslintErrors` pozostaje 0, `eslintWarnings` 0 → 20% zamrożonej liczby wyciszeń) | `quality-baseline.json` (notatka `_relax_velocity_2026_08_30` zawiera każdą zmianę przed → po)         |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, każdy limit wierszy `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                        | `file-size-baseline.json`                                                                              |
| liczby dla poszczególnych plików / kodów TS ×1.2                                                                                                                                                                                                | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                             | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` staje się zaleceniem, gdy `_policy.requireTighten === false`                                                                                                                                                                | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| nocne zadanie `bank-ratchet-shrinks` zostaje wstrzymane (utrwaliłoby zmierzone zmniejszenie i zlikwidowało zapas)                                                                                                                               | `.github/workflows/nightly-release-green.yml`                                                          |

Listy dozwolonych wyjątków (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nie** są budżetami i nie zostały zmienione. Bramy zasad typu zaliczone/niezaliczone (sekrety, reguły SQL,
zgodność dokumentacji i środowiska, spójność i18n, testy jednostkowe) pozostają bez zmian — czerwony test nadal jest czerwonym testem.

**Narzędzia**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — jednorazowe
  poluzowanie (`scripts/quality/relax-baselines.mjs`); odmawia ponownego uruchomienia z tą samą
  notatką.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mierzy każdą bramę liczbową w taki sam sposób jak CI i wyświetla pozostały zapas dla każdej bramy
  (`scripts/quality/baseline-headroom.mjs`). Nocne zadanie `baseline-headroom` publikuje
  tabelę w podsumowaniu przebiegu workflow i przesyła raport JSON/Markdown jako
  `baseline-headroom-<run_id>`, przechowywany przez 90 dni. Wiersze z ostrzeżeniami i stanem krytycznym wskazują bramy
  znajdujące się w granicach 10% od limitu lub już go przekraczające. Traktuj te raporty jako wczesne ostrzeżenie
  o wyczerpywaniu budżetów; sprawdzaj notatki `_rebaseline_*` problematycznej bramy. Zadanie
  nie tworzy już ani nie aktualizuje trwałego zgłoszenia; #12149 zachowuje wcześniejszą historię raportów.

**Tryb nowego kodu (Clean-as-You-Code) — od 2026-08-30, tylko szybka ścieżka PR**

Dla zdarzeń `pull_request` plik `quality.yml` przekazuje `--base-ref <PR base SHA>` do `check:file-size`,
`check:complexity-ratchets` i `check:dead-code`. W przypadku `check:complexity-ratchets` oraz
`check:dead-code` brama porównuje HEAD z bazą scalania, **ograniczając porównanie do plików zmodyfikowanych przez PR**
(`scripts/check/newCodeMode.mjs`: baza scalania jest materializowana w jednorazowym
`git worktree`, ESLint/knip są uruchamiane w nim oraz dla HEAD, a liczby dla poszczególnych plików są porównywane):

- **blokujące** — PR dodał naruszenia złożoności cyklomatycznej/poznawczej lub martwe eksporty w zmienionych plikach
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` w dzienniku);
- **informacyjne** — globalna suma względem zamrożonej wartości bazowej. Odziedziany dryf nigdy nie oznacza
  niewinnego PR-a na czerwono; dryf jest śledzony w celu naprawy podczas uzgadniania wydania i monitorowany przez
  zadanie kontroli zapasu.

`check:file-size` korzysta z odwołania bazowego na własnych zasadach (`scripts/check/check-file-size.mjs`, #8522):
sprawdza każdy plik źródłowy i testowy w drzewie, odczytuje liczbę jego wierszy w bazie PR
za pomocą `git show` i zgłasza niepowodzenie dla pliku tylko wtedy, gdy przekroczy on większą z dwóch wartości: własny limit bazowy
(`frozen` / `testFrozen` albo `cap` / `testCap` dla pliku spoza poziomu bazowego) lub rozmiar bazowy.
Dlatego plik, który już odbiegał od normy w bazie, nigdy nie powoduje niepowodzenia niewinnego PR.

`check:boundary:ratchet` stosuje tę samą regułę do swojej pojedynczej wartości liczbowej
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): w przypadku zdarzeń PR zarówno
szybkie bramki w `quality.yml`, jak i zadanie lintowania w `ci.yml` przekazują SHA bazowej wersji PR, bazowy commit jest
mierzony na podstawie eksportu `git archive`, a PR kończy się niepowodzeniem tylko wtedy, gdy liczba jego krawędzi
`open-sse → src` przekracza większą z wartości `metrics.boundaryOpenSseToSrc` i liczby dla wersji bazowej. Odchylenie
wersji bazowej powyżej limitu jest raportowane (`base drift herdado`), ale nigdy nie powoduje niepowodzenia niewinnego PR; push → main
nadal stosuje bezwzględny limit, a niemożliwy do rozpoznania bazowy SHA powoduje powrót do tego limitu z ostrzeżeniem.

Uruchomienia `workflow_dispatch`, pełny przebieg weryfikacji przed wydaniem oraz nocne zadanie kontroli zapasu nie mają wersji bazowej PR
i zachowują bezwzględne (globalne) porównanie. Pokrycie, duplikacja i pokrycie typami pozostają na razie globalne
(ich narzędzia nie generują tanio różnic dla poszczególnych plików) — są kandydatami do takiego samego podejścia.

**Zamknięcie etapu w v4.0 (LTS = bardziej rygorystyczne niż wcześniej, a nie „powrót do normy”)**

1. Na czystym wierzchołku `release/v4.0.0`: dla udokumentowania uruchom `npm run quality:headroom --json`, a następnie
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` oraz `--update` dla każdej
   bramki sprawdzania typów — każda wartość bazowa zostanie obniżona do wartości zmierzonej.
2. Usuń `_policy` z `quality-baseline.json` (ponownie aktywuje `--require-tighten` oraz nocne
   gromadzenie zapasu), przywróć `THRESHOLD = 36` (lub więcej) w `check-openapi-coverage.mjs`.
3. Zaostrz limity poniżej zmierzonych wartości tam, gdzie modularyzacja przyniosła efekty: przywróć `cap` rozmiaru pliku do 1000
   (lub 800), zwiększ minimalne pokrycie o 5, ustaw liczbę nieużywanych eksportów na 0 dla zmodularyzowanych pakietów.

## Bazowy poziom mechanizmu zapadkowego (`quality-baseline.json`)

Mechanizm zapadkowy (`scripts/quality/check-quality-ratchet.mjs`) odczytuje plik `quality-baseline.json`
i porównuje go ze świeżo zebranym plikiem `quality-metrics.json`. Każda metryka, która pogorszy się
o wartość większą niż jej epsilon, powoduje niepowodzenie kompilacji.

Obecnie śledzone metryki:

| Metryka               | Kierunek | Znaczenie                                 |
| --------------------- | -------- | ----------------------------------------- |
| `eslintWarnings`      | `down`   | Liczba ostrzeżeń ESLint nie może wzrosnąć |
| `coverage.statements` | `up`     | Pokrycie instrukcji nie może spaść        |
| `coverage.lines`      | `up`     | Pokrycie wierszy nie może spaść           |
| `coverage.functions`  | `up`     | Pokrycie funkcji nie może spaść           |
| `coverage.branches`   | `up`     | Pokrycie gałęzi nie może spaść            |

Aby zaktualizować poziom bazowy po rzeczywistej poprawie:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Flaga `--update` zapisuje bieżące zmierzone wartości w pliku `quality-baseline.json`.
Zatwierdź ten plik razem ze zmianą, która poprawiła metrykę. PR, który poprawia
metrykę bez aktualizacji poziomu bazowego, zostanie wykryty przez `--require-tighten` (Faza 6A.5,
oczekuje na implementację).

### Mechanizm zapadkowy CodeQL : przyjmowanie kandydatów i inwentaryzacja repozytorium

CI jest właścicielem kandydata na kandydata CodeQL poprzez wyraźny łańcuch zależności: `codeql-scan` wywołuje czterojęzyczną macierz w `codeql.yml`, a następnie `codeql-admission` uruchamia `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` wymaga obu wyników. Jakość zachowuje własne kontrole numeryczne, ale nie wysyła zapytań do skanera, zanim producent nie skończy; Samo `Gate / Quality` nie oznacza pełnego przyjęcia kandydata. CodeQL pozostaje wymagane w przypadku kandydatów posiadających wyłącznie dokumenty.

Polityka w `config/quality/codeql-admission-policy.json` wybiera Akcje, C/C++, JavaScript/TypeScript i Python, domyślny zestaw zapytań, zdalny model zagrożeń i brak trybu kompilacji. Inspekcja wstępna producenta odrzuca oczekujący rekord aktywacji i rozgałęzia się poza jawną listą docelową. Obecne cele to główne, a testy kontraktu release/v3.8.54. porównują tę skończoną listę i wyzwalacz konserwacji z wersją pakietu; następna wersja wymaga przeglądu podczas wdrażania. Istniejący wyzwalacz PR o szerszej wersji CI zostaje zachowany, ale cel, który nie znajduje się na pokładzie, zgłasza HOLD przed ekstrakcją, zamiast uzyskać niezmierzony PASS.

Każde zadanie macierzy rejestruje rzeczywiste SARIF przesłane do ID, język, kategorię, przebieg i próbę, tożsamość przepływu pracy osoby dzwoniącej, zdarzenie ref/head/base/merge SHA i skrót polityki. Zadanie zależne pobiera tylko potwierdzenia tego przebiegu i sprawdza podsumowania artefaktów. Wymaga to wszystkich czterech kategorii, odnoszącego sukcesy producenta i zakończonego przetwarzania każdego dokładnego przesłania. Wykorzystuje filtr sarif_id API, a nie najnowszą analizę znalezioną w gałęzi. Częściowe powtórki mogą ponownie wykorzystywać udane kategorie z wcześniejszej próby tego samego biegu i kandydata, zachowując próbę produkcyjną; Obecny producent, który upadł, nie może ponownie wykorzystać poprzednich zielonych dowodów.

Akcja CodeQL czeka na przetworzenie, ale jej przypięta implementacja może ostrzec i kontynuować po niepowodzeniu odczytu statusu lub wyczerpaniu oczekiwania. Dlatego przyjęcie ponownie weryfikuje przetwarzanie. Brakujące kategorie, oczekujące przetwarzanie, nieudane lub anulowane zadania, nieaktualna tożsamość, niekompletna paginacja lub niedostępne APIs generują HOLD i wychodzą 2. Nie pozostaje żadne stałe oczekiwanie na przepływ pracy niezależnego skanera. Nieprzeskanowany PR nie może przejść, ponieważ zapytanie alertowe zwróciło 0. Zmierzona liczba powyżej wyjść `metrics.codeqlAlerts.value` wynosi 1; linia bazowa nie jest podnoszona w celu wchłonięcia alertów innego oddziału. [Sprawdzanie stanu przesyłania i analizy](https://docs.github.com/en/rest/code-scanning/code-scanning).

Pokwitowanie rejestruje przesyłanie i analizę IDs, kategorie, wersje narzędzi, ref/SHA, numery bazowe i numery alertów. Liczba SARIF identity/result, minimalna liczba reguł i dokładne wystąpienia alertów pozostają obowiązkowe. Tożsamość PR/analysis jest ponownie sprawdzana przed akceptacją. Kontrole te ustalają pokrycie skonfigurowanych kategorii, a nie spis każdego wyodrębnionego pliku źródłowego. Ekstrakcja bez kompilacji C/C++ nie obejmuje kodu wygenerowanego podczas kompilacji projektu. Wykluczenia źródeł nadal wymagają przeglądu, a przypisanie autora wymaga porównywalnych, dokładnych dowodów.

`codeql-maintenance.yml` dostarcza skany push aktywnych wydań i tygodniowy harmonogram bez powielania producentów PR/main. `nightly-codeql-inventory.yml` utrzymuje oddzielną linię bazową dla całego repozytorium, z `--strict-measurement` i awarią, gdy pomiar jest niedostępny. Eleganckie pominięcie lokalnego kolekcjonera spuścizny nie jest wstępem dla kandydata. Dokręcanie pozostaje wyraźnym `--update` po zweryfikowaniu niższej liczby globalnej.

Zaawansowanego przepływu pracy nie można publikować, gdy skonfigurowana jest konfiguracja domyślna: GitHub odrzuca tę kombinację. Jej zasady dotyczące wersji pozostają w toku do czasu ponownego odczytania sprawdzonego przejścia administracyjnego. Przed publikacją operator podpina repozytorium, skróty head/base/tree, policy/patch/rollback i obserwowany stan konfiguracji; `node scripts/quality/codeql-producer.mjs verify-admin-readback` sprawdza dostarczone oczekiwane i rzeczywiste zapisy JSON. Jest to zabezpieczenie techniczne, a nie zatwierdzenie operatora lub zamiennik pobierania nowych odczytów zwrotnych. Token PR nigdy nie żąda dostępu administracyjnego. Wdrożenie i jakakolwiek zmiana skanera wymaga osobnego odczytu oraz rzeczywistego dowodu zgodności PR, rozwidlenia i grupy scalającej.

Forki korzystają z hostowanych modułów biegaczy, realizacji transakcji bez utrwalonych poświadczeń, bez projektu install/build u producenta i bez dziedziczonych sekretów repozytorium. GitHub obsługuje przesyłanie SARIF dla zdarzenia pull_request za pomocą zredukowanego tokena rozwidlenia; Zatwierdzenie wniesienia wkładu po raz pierwszy pozostaje polityką GitHub. Nigdy nie używaj pull_request_target do wykonania niezaufanego kodu. Potwierdź rzeczywiste uprawnienia do tokenu, klucz_analizy i wszystkie środowiska kategorii w kontrolowanym systemie Canary przed uznaniem migracji za zakończoną. [Reguły przesyłania fork](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [sprzeczne tryby konfiguracji](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Zwolnienia są decyzją operatora (twarda zasada #14)** — nigdy nie odrzuca alertu CodeQL bez zapisania uzasadnienia technicznego w komentarzu do zwolnienia: `won't fix` dla wymogu protokołu wyższego szczebla, `used in tests` dla urządzenia testowego, `false positive` dla środka dezynfekującego, CodeQL nie widzi (precedens: `docs/security/ERROR_SANITIZATION.md`).

---

## Zasady ponawiania testów (WS5.4, v3.8.49)

Ponawianie jest konfigurowane osobno dla każdego runnera, nigdy globalnie — globalne ponawianie zamienia rzeczywiste regresje
w niewidoczne niestabilności:

| Runner           | Zasada                                                                                                                                            | Dlaczego                                                                                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Playwright (e2e) | `retries: 1` wyłącznie w CI, z `trace: on-first-retry`                                                                                            | Czas wykonania operacji przeglądarki/sieci jest rzeczywiście niedeterministyczny; jedno ponowienie ze śladem zamienia niestabilność w artefakt możliwy do zdiagnozowania |
| Vitest           | BEZ globalnego ponawiania. Test o potwierdzonej niestabilności otrzymuje jawne ponawianie na poziomie testu (widoczne w diffie i sprawdzane w PR) | Utrzymuje listę kwarantanny w repozytorium, nigdy jako nieprzejrzystą konfigurację                                                                                       |
| node:test (unit) | BEZ ponawiania, bez wyjątków                                                                                                                      | Niestabilny test jednostkowy oznacza błąd w teście — napraw go, zamiast uruchamiać ponownie                                                                              |

Docelowe SLO po wdrożeniu telemetrii niestabilności (WS5.2/5.3): współczynnik niestabilności <1% na test
(próg „napraw teraz”), współczynnik powodzenia ≥95% na potok. Wartości referencyjne z branży —
należy je ponownie skalibrować na podstawie własnych pomiarów.

## Dryf limitów zapadkowych na poziomie wydania (WS5.5, v3.8.49)

Gdy limit zapadkowy (rozmiar pliku, złożoność, ostrzeżenia eslint) ulega regresji na CZYSTYM końcu
gałęzi wydania — tj. regresję spowodowała KOMBINACJA scaleń, a żaden pojedynczy PR nie odtwarza jej
na własnej gałęzi — za poprawkę odpowiada **release captain, jednorazowo, na gałęzi
wydania**: preferuj wydzielenie/refaktoryzację; ponownie ustaw wartość bazową tylko wraz z udokumentowanym
uzasadnieniem. Nigdy nie przenoś dryfu kombinacji na PR kontrybutora i nigdy
nie ustawiaj ponownie wartości bazowej dla każdego PR (ukrywa to rzeczywiste regresje). Najpierw rozstrzygnij przyczynę: odtwórz
błąd na czystym końcu gałęzi w roboczym worktree kontrolnym, zanim uznasz, że spowodował go Twój PR.

## Utrwalanie obniżeń limitów zapadkowych — kierunek w dół (#8584)

Mechanizm zapadkowy jest automatyczny tylko w połowie — i to w niewłaściwej połowie. **Podniesienie** limitu to
ręczna edycja JSON, która zajmuje dziesięć sekund i jest najszybszym sposobem na odblokowanie PR z błędem.
**Obniżenie** limitu wymaga uruchomienia `--update` i zatwierdzenia wyniku przez kogoś — a do czasu
wdrożenia zadania `bank-ratchet-shrinks` żaden workflow tego nie wykonywał. Zmierzony skutek
(2026-07-25): 18 zamrożonych plików miało już nie więcej niż limit 800 wierszy dla nowych plików, przy czym najgorszy
przypadek wynosił 132× (`src/shared/validation/schemas.ts`, 19 wierszy z limitem 2 523); pułap
złożoności wzrósł z `1794 → 2169` w około 37 notatkach o ponownym ustawieniu wartości bazowej, przy dokładnie jednym
obniżeniu (−1); a zapis „zaostrz przez `--update` w następnym cyklu” pojawił się 31 razy i został
zrealizowany raz. Limit, który pozostaje po usunięciu kodu będącego jego przyczyną, po cichu zamienia każdy ukończony
podział kodu w przyzwolenie na jego rozrost dla kolejnej osoby edytującej dany plik.

`nightly-release-green.yml` → zadanie **`bank-ratchet-shrinks`** zamyka tę pętlę:

|              |                                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| Uruchamianie | `schedule` (3× dziennie) + `workflow_dispatch` — celowo **bez** `push`                                                |
| Pomiar       | najwyższa gałąź `release/vX.Y.Z`, z taką samą metodą rozstrzygania i ochroną przed wstrzyknięciem jak `release-green` |
| Zapis        | `check:file-size --update` i `check:complexity-ratchets --update` (oba z założenia mogą wyłącznie obniżać wartości)   |
| Weryfikacja  | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                              |
| Dostarczanie | jeden zawsze aktualny PR kierowany do gałęzi wydania — aktualizowany wymuszeniem, bez tworzenia spamu                 |

Utrwalanie odbywa się partiami, a nie przy każdym pushu, ponieważ nie ma wymagań dotyczących opóźnienia (obniżenie
utrwalone w ciągu 8 godzin jest wystarczające), natomiast uruchamianie po każdym scaleniu wielokrotnie przebudowywałoby gałąź PR
podczas serii scaleń i za każdym razem ponosiłoby koszt pełnego przebiegu ESLint. Wykrywanie nadal odbywa się
przy pushu (`release-green`); partiami wykonywane jest wyłącznie utrwalanie.

### Weryfikator bezpieczeństwa

Zadanie zapisuje zmiany w wartościach bazowych bez nadzoru, dlatego `verify-ratchet-bank.mjs` zapewnia
bezpieczeństwo tego procesu. Porównuje drzewo po wykonaniu `--update` z `HEAD` i **przerywa zadanie
przed utworzeniem jakiegokolwiek commita** — bez otwierania PR — chyba że każda zmiana jest jednym z poniższych przypadków:

- wartość liczbowa `frozen` / `testFrozen` została **obniżona** lub **usunięta**
- `complexity-baseline.json` → `count` została **obniżona**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` została **obniżona**

Wszystko inne powoduje błąd: podniesienie liczby, dodanie wpisu, zmiana `cap`/`testCap` lub
usunięcie/przepisanie notatki `_rebaseline_*` (notatki te stanowią ślad audytowy wyjaśniający, dlaczego każdy
pułap istnieje, i są przechowywane w tym samym obiekcie `frozen` co wpisy plików).
Bot, który mógłby podnieść limit, byłby zdecydowanie gorszy niż obecny stan. Zabezpieczenie przed regresją:
`tests/unit/verify-ratchet-bank.test.ts`.

Zadanie nigdy nie wykonuje pushu do `release/*` — PR scala człowiek, więc błędny pomiar
nie może zostać wdrożony bez przeglądu.

## Zasady listy dozwolonych wyjątków

Każda bramka, która nie może zakończyć się niepowodzeniem z powodu wcześniej istniejących naruszeń, korzysta z zamrożonej listy dozwolonych wyjątków
(np. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Obowiązuje następująca zasada:

**Usuń główną przyczynę; korzystaj z listy dozwolonych wyjątków tylko wtedy, gdy naruszenie istniało wcześniej i
nie można go naprawić w tym samym PR.**

Podczas dodawania wpisu do listy dozwolonych wyjątków:

1. Dodaj komentarz z uzasadnieniem.
2. Dodaj odwołanie do zgłoszenia śledzącego (np. `// #3498 — Phase 2 feature, not yet implemented`).
3. Usuń wpis w tym samym PR, który naprawia naruszenie — nieaktualny wpis, który nie
   tłumi już aktywnego naruszenia, sam w sobie stanowi defekt (po wdrożeniu mechanizm wykrywania
   nieaktualnych reguł 6A.3 spowoduje niepowodzenie bramki w przypadku osieroconego wpisu na liście dozwolonych wyjątków).

**Nie** dodawaj wpisów do listy dozwolonych wyjątków, aby testy przechodziły szybciej. Zielona bramka przy stale rosnącej
liście dozwolonych wyjątków daje fałszywe poczucie jakości.

### Gdy bramka nie powiedzie się dla Twojego PR

1. **Uważnie przeczytaj dane wyjściowe bramki** — wskazują one dokładnie, który plik lub symbol naruszył
   regułę.
2. **Napraw naruszenie** — większość bramek to deterministyczne kontrole systemu plików, które przechodzą, gdy tylko
   kod jest poprawny.
3. **Jeśli naruszenie istniało wcześniej** (tj. nie zostało wprowadzone przez Ciebie, ale bramka teraz
   je obejmuje): dodaj wpis do listy dozwolonych wyjątków wraz z komentarzem uzasadniającym i odwołaniem do zgłoszenia śledzącego.
4. **Jeśli bramka działa na zasadzie zapadki** (pokrycie, ostrzeżenia ESLint, duplikacja, złożoność):
   Twoja zmiana pogorszyła metrykę. Napraw problem źródłowy albo (w rzadkich przypadkach) uruchom
   `npm run quality:ratchet -- --update`, jeśli zmiana jest zamierzona, a pogorszenie
   metryki jest akceptowalne — opisz jednak przyczynę w opisie PR.
5. **Bramki doradcze** (`continue-on-error: true`) mają charakter informacyjny — nie blokują
   scalania, ale pojawiają się w podsumowaniu CI. Mimo to je napraw.

## Dodawanie nowej bramki

1. Utwórz `scripts/check/check-<name>.mjs` (lub `.ts`). Bramki zasad zwracają kod wyjścia 0/1.
   Bramki typu zapadkowego zapisują wskaźnik w `quality-metrics.json` za pośrednictwem `collect-metrics.mjs`.
2. Dodaj `"check:<name>": "node scripts/check/check-<name>.mjs"` do `package.json` oraz
   zsynchronizuj alias i jego dokładne polecenie w `config/quality/gate-manifest.json`.
   Zastosuj taką samą synchronizację podczas zmiany lub usuwania istniejącego aliasu walidacji.
   Uruchom `npm run check:gate-manifest`; hook pre-commit i klasyfikacja zmian w CI
   wymuszają przestrzeganie tej umowy.
3. Podłącz ją w `.github/workflows/ci.yml` w odpowiednim zadaniu
   (zasady → `lint` lub `docs-sync-strict`; zapadka → `quality-gate`).
4. Jeśli korzysta z listy dozwolonych elementów, zastosuj `reportStaleEntries()` z
   `scripts/check/lib/allowlist.mjs`, aby nieaktualne wpisy były wykrywane automatycznie.
5. Napisz test w `tests/unit/build/` obejmujący logikę wykrywania bramki.
6. Zaktualizuj ten dokument (dodaj wiersz do tabeli odpowiedniego zadania).

---

## Narzędzia dla agentów: LSP w pętli (opcjonalne)

Poza bramkami CI OmniRoute udostępnia **opcjonalny** szkielet `agent-lsp`
(plik `.mcp.json` na poziomie projektu, faza 7, zadanie 15). Utwórz `.mcp.json`,
aby udostępnić agentom programistycznym serwer języka TypeScript, dzięki czemu będą rozwiązywać symbole /
diagnostykę **przed** napisaniem kodu — jest to działające według zasady „najpierw kompilacja, potem deklaracja” uzupełnienie
`typecheck:core`, które eliminuje błędy „wymyślonych symboli” u źródła. Celowo
nie jest ładowany automatycznie (to Ty wybierasz i weryfikujesz most MCP↔LSP); nieprawidłowy wpis jedynie rejestruje
błąd połączenia i nigdy nie zakłóca sesji.

---

## Zaległości racjonalizacyjne (przegląd ROI — faza 9, fala 3)

Ten wykaz uzgodniono z `ci.yml` 2026-06-17 (w poprzedniej wersji pominięto
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Przegląd ROI uzgodnionego zestawu
wskazał następujących kandydatów do racjonalizacji. **Scalenia są mechanicznymi zmianami
CI; przełączenia i usunięcia są decyzjami dotyczącymi zasad, zastrzeżonymi dla operatora.** Żadna z poniższych
zmian nie została jeszcze zastosowana.

**Również nieudokumentowane powyżej** (doradcze, słaby sygnał): zadanie `docs-lint` (markdownlint + Vale, całe zadanie z `continue-on-error`) i niezależne workflow skanerów `semgrep.yml` / `scorecard.yml`. CodeQL ma teraz wymagane zadania producenta i dopuszczenia pod `Gate / CI`, z zastrzeżeniem opisanych wyżej wymogów aktywacji. `semgrepFindings: 0` znajduje się w `quality-baseline.json`, lecz nie jest podłączone do blokującego ratchetu w `ci.yml` — metryka jest obecnie osierocona.

### Scalanie / deduplikacja (mechaniczne, niższe ryzyko)

Każdy kandydat został zweryfikowany względem bieżącego stanu bramek 2026-06-17 (ufaj, ale sprawdzaj);
okazało się, że kilka „oczywistych” scaleń ukrywa dług i **nie** stanowi bezproblemowego zamiennika.

- **`check:docs-sync` uruchamia się dwukrotnie** — samodzielnie w zadaniu `lint` i ponownie wewnątrz `check:docs-all` (`docs-sync-strict`) oraz w hooku husky pre-commit. ✅ **GOTOWE** — samodzielne wywołanie w `lint` zostało usunięte.
- **Skanowanie CVE** — ❌ **NIE jest to bezproblemowe scalenie.** `audit:deps` blokuje krytyczne ostrzeżenia i niekompletne audyty we wszystkich pięciu plikach lockfile, natomiast ostrzeżenia o wysokim poziomie ryzyka zgłasza jako ostrzeżenia zgodnie z bieżącymi zasadami; `check:vuln-ratchet` (osv) kończy się niepowodzeniem tylko w przypadku _regresji_ względem zaewidencjonowanej linii bazowej i odrzuca brakujące pomiary, gdy są wymagane. Semantyka jest inna — usunięcie `audit:deps` oznaczałoby utratę bezwzględnej bramki dla poziomu krytycznego oraz niezależnych potwierdzeń audytu pakietów. Należy zachować oba.
- **Wykrywanie cykli** — ✅ **GOTOWE** (#15159 G-01/G-02). Poprzedni tekst określał `check:cycles` jako „zieloną, starannie dobraną” bramkę i uzasadniał pozostawienie jej jako blokującej tym, że `check:circular-deps` (dpdm) zgłaszał 91 cykli. Ten zielony wynik był **fałszywie pozytywny**: `check:cycles` skanował 5 podkatalogów (450 plików), dopasowywał tylko statyczne `import|export … from` i pomijał każdy specyfikator `@/` oraz `@omniroute/open-sse/`, dlatego nie mógł wykryć cykli z dynamicznymi importami i aliasami, które dominowały w repozytorium. Naprawiono: bramka przegląda teraz `src` + `open-sse` (5023 pliki), zbiera specyfikatory z AST TypeScriptu (więc `import("…")` jest uwzględniany, a `typeof import("…")` w pozycji typu — nie) i rozwiązuje `paths` z tsconfig. Wykrywa **14** cykli, a nie 0. Ponieważ 14 istniejących wcześniej cykli nie można naprawić w PR-ze dotyczącym bramki, `check:cycles` jest teraz **mechanizmem zapadkowym** (`--ratchet`, limit `metrics.cycles.value = 14` w `quality-baseline.json`, `direction: down`) — blokuje każdą _regresję_, a liczba może wyłącznie maleć. CI uruchamia `npm run check:cycles:ratchet`. Stopniowa redukcja jest realizowana wraz z **A-01**. `check:circular-deps` (dpdm) pozostaje doradczym, szerszym źródłem dodatkowej oceny.
- **Złożoność** — ✅ **GOTOWE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jedno przejście ESLint, zliczanie według ruleId, dzięki czemu linie bazowe dla złożoności cyklomatycznej + maksymalnej liczby wierszy oraz złożoności poznawczej pozostają niezależne; osobne `check:complexity` / `check:cognitive-complexity` pozostają do lokalnego użycia z `--update`.
- **Mechanizm zapobiegający halucynacjom dla `/api`** — ✅ **GOTOWE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jeden wykaz systemu plików dla `src/app/api`; openapi-routes + docs-symbols nadal raportują niezależnie; osobne mechanizmy pozostają dostępne do uruchomień lokalnych.
- **`check:node-runtime` uruchamia się w 11 zadaniach** — ⚠️ **niski ROI.** Każde działa na osobnym runnerze, a sprawdzenie trwa <1 s; łączna oszczędność wyniosłaby około 10 s kosztem utraty taniego zabezpieczenia dla każdego zadania. Nie warto powodować takich zmian.
- **`typecheck:noimplicit:core` w zadaniu lint CI** — ✅ **usunięto z zadania lint** (było doradcze z `continue-on-error`); blokującą powierzchnię typów zapewniają `typecheck:core` + `check:type-coverage`. Skrypt lokalny został zachowany.

### Przełączenie / decyzja (zasady operatora)

- `check:openapi-security-tiers` (doradcze) — ❌ **NIE można go bezproblemowo przełączyć.** Kończy działanie z kodem 0, ale ostrzega, że kilka tras `traffic-inspector` w ramach `LOCAL_ONLY_API_PREFIXES` nie ma adnotacji `x-loopback-only: true`. Jego egzekwowanie wymaga najpierw dodania tych adnotacji do `openapi.yaml`.
- `typecheck:noimplicit:core` (doradcze) — w dużej mierze zastąpione przez blokujący mechanizm zapadkowy `check:type-coverage`. Należy przełączyć je na mechanizm zapadkowy albo usunąć nadmiarowe drugie przejście `tsc`.
- `test:vitest:ui` (obecnie **blokujące**) — istniejące wcześniej niepowodzenia są jawnie wykluczone w `vitest.config.ts` za pomocą komentarzy śledzących `// #8618`; nowe niepowodzenia powodują niepowodzenie zadania.
- `check:secrets` (gitleaks, blokujący mechanizm zapadkowy) — bieżący limit to `metrics.secretFindings` w `quality-baseline.json`. Każdy wyjątek wymaga uzasadnionego wpisu w `.gitleaks.toml`; niedostępny pomiar ma status INCOMPLETE. Skan uzupełnia natywne skanowanie sekretów w GitHubie oraz `check:public-creds`.
- `check:pr-evidence` (blokujące, przeszukuje tekst opisu PR-a) — wysokie ryzyko wyników fałszywie pozytywnych; jego usunięcie osłabia egzekwowanie bezwzględnej reguły nr #18, więc jest to rzeczywista decyzja dotycząca zasad.
- `semgrep` (doradcze, samodzielne) — pokrywa się z CodeQL w zakresie kategorii OWASP; należy podłączyć jego linię bazową do mechanizmu zapadkowego albo go usunąć.

---

## Powiązana dokumentacja

- Łańcuch dostaw (pochodzenie, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — bramka zgodności zestawu kluczy

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, zadanie `i18n-ui-coverage`).
Porównuje zestaw kluczy-liści każdego pliku `src/i18n/messages/<locale>.json` z `en.json` i zgłasza
błąd w przypadku braku lub nadmiaru dowolnego liścia, niezależnie od tego, kiedy klucz został dodany.
Symbole zastępcze `__MISSING__:` są uznawane za obecne (ich zawartość podlega bramce współczynnika).
Jest to bezwzględne uzupełnienie dwóch bramek opartych na różnicach/wartościach procentowych:
`check-ui-keys-coverage` wymusza próg 80% dla każdego języka (brak 43 kluczy z około 13 000 nadal
daje wynik 99,7%), a `check-new-key-coverage` ocenia wyłącznie klucze dodane przez PR do `en.json`.
Partia lokalizacji jest generowana na podstawie wersji `en.json` z dnia utworzenia jej gałęzi,
a tłumaczenie trwa przez kolejne dni, podczas gdy gałąź bazowa nadal otrzymuje nowe klucze; PR
partii sam nie dodaje żadnego klucza, więc obie siostrzane bramki milczały, gdy partia 1 (#13044)
została scalona z brakującymi 43 kluczami w dziewięciu lokalizacjach, a partia 2 (#13660)
z brakującymi 10 kluczami w ośmiu (2026-09-15). Aby naprawić błąd, użyj
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; liść `extra`
oznacza, że usunięto go ze źródła — usuń go z lokalizacji. `--warn` raportuje problem bez
powodowania niepowodzenia. `--catalog=cli` uruchamia to samo porównanie dla `bin/cli/locales`
(`npm run i18n:check-keys:cli`); oba kroki znajdują się w zadaniu `i18n-ui-coverage`.

#### `check-new-key-coverage` — bramka i18n nowych kluczy

Siostrzana bramka `check-ui-value-drift`. Tamta wykrywa sytuację, w której angielska wartość
została **przepisana**, ale jej tłumaczenia nie zostały zaktualizowane; ta wykrywa sytuację,
w której angielski klucz został **dodany**, ale nie trafił do niektórych lokalizacji.

`check-ui-keys-coverage` nie potrafi wykryć tego rodzaju problemu: wymusza procentowy próg dla
każdej lokalizacji, a brak jedenastu kluczy z około 13 000 pozostawia pokrycie na poziomie 99,9%.
Wartość procentowa dla poszczególnych języków nie jest w stanie wyrazić stanu „ta funkcja została
wydana bez tłumaczenia” — cała funkcja może trafić do nowej lokalizacji bez żadnego tekstu
i w ogóle nie zmienić tej wartości.

Incydent, który odzwierciedla ta bramka: faza 3 Orchestration Canvas przetłumaczyła jedenaście
swoich kluczy na 42 istniejące wówczas lokalizacje. Kilka godzin później partia języków UE
(#13044) zwiększyła liczbę lokalizacji w repozytorium do 51, a dziewięć nowych (`el`, `et`, `ga`,
`hr`, `lt`, `lv`, `mt`, `sl`, `sr`) nigdy ich nie otrzymało. `deepMergeFallback` podstawia
język angielski za brakujący klucz, więc skutkiem był nieprzetłumaczony interfejs, a nie pusty
interfejs — rzeczywisty problem, który z założenia pozostawał niewidoczny.

Podobnie jak siostrzana bramka jest ona **świadoma różnic**: porównuje angielską wersję
z bazy scalania z drzewem roboczym, dzięki czemu istniejące wcześniej braki pozostają zamrożone,
a włączenie bramki nie wymagało migracji.

**Znacznik `__MISSING__:<english>` nie spełnia tego wymagania (od 2026-09-17).** Wcześniej był
udokumentowanym sposobem odroczenia — środowisko uruchomieniowe wraca do poprawnego angielskiego
tekstu — aż osiem PR-ów funkcjonalnych z 2026-09-16 dodało 61 kluczy i wstawiło znacznik do
wszystkich 65 lokalizacji zamiast je przetłumaczyć: ta bramka zaakceptowała wszystkie przypadki,
nic nie zablokowało PR-ów, a blokująca bramka współczynnika rzeczywistych tłumaczeń zawiodła
następnie na końcówce wydania dla wszystkich (pt-BR 3,2% > 2,5% + 0,5). Znacznik jest teraz
traktowany jako brak tłumaczenia. Aby naprawić błąd, użyj
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` albo
przetłumacz równolegle wszystkie lokalizacje za pomocą `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, działa bezpiecznie po odłączeniu, odmawia uruchomienia
bez zmiennych środowiskowych `OMNIROUTE_TRANSLATION_*`). Klucz, który musi pozostać po angielsku
(przypięta nazwa produktu, silnika lub flagi), powinien znaleźć się w
`scripts/i18n/untranslatable-keys.json`, nigdy za znacznikiem. `vi` całkowicie zabrania
znaczników (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — bramka odłożonych testów

Plik na liście `exclude` w `vitest.config.ts` jest testem, który nie jest uruchamiany, a dla osoby
przeglądającej drzewo wygląda jak pokrycie. Za komentarzem
`// #8618 — pre-existing failure; remove this exclusion when fixed` zgromadziły się
sześćdziesiąt dwa pliki. Zgłoszenie #8618 zamknięto 2026-08-11, podczas gdy śledzona przez nie
lista rozrosła się z 45 do 62 pozycji, a każda nowa dziedziczyła komentarz wskazujący na zamknięte
zgłoszenie. Gdy w końcu zmierzono listę plik po pliku (#13204), **51 z 62 testów przechodziło
w bieżącym drzewie bez żadnej zmiany w kodzie źródłowym**.

Bramka wymaga, aby każde wykluczenie wskazujące rzeczywisty plik (a) zawierało numer zgłoszenia
śledzącego oraz (b) figurowało w `config/quality/vitest-exclusions.json` wraz ze zmierzonym stanem,
dzięki czemu dodanie wykluczenia jest różnicą podlegającą przeglądowi w dedykowanym pliku, a nie
kolejnym wierszem w 60-elementowej tablicy. Celowo nie uruchamia ponownie wykluczonych testów —
kosztuje to około 10 minut i powinno należeć do zadania okresowego; inwentarz rejestruje datę
ostatniego pomiaru każdego z nich.
