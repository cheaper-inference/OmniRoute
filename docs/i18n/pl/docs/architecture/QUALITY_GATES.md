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

## Inwentaryzacja bramek i profile wykonania

### Dopuszczanie kandydatów

Przepływy pracy CI i Quality Gates emitują stabilne werdykty: `Gate / CI` oraz
`Gate / Quality`. Ich wersjonowana polityka dopuszczania wyszczególnia każde zadanie nadrzędne
jako wymagane lub doradcze. Każde mające zastosowanie zadanie wymagane musi zakończyć się powodzeniem:
brakujące, anulowane, pominięte, oczekujące i nieznane wyniki nie mogą stanowić podstawy do uznania wyniku PASS. Prawidłowa
klasyfikacja jako zmiana dotycząca wyłącznie dokumentacji lub katalogu może sprawić, że ścieżka kodu nie ma zastosowania;
wersja robocza PR nie jest akceptowanym kandydatem. Etykieta `hotfix` nie zwalnia z obowiązku przedstawienia dowodów.

Oba przepływy pracy obejmują PR-y kierowane do gałęzi main/release, wypchnięcia do `main`, ręczne uruchomienia
oraz zdarzenia grup scalania. Wypchnięcie, ręczne uruchomienie i grupa scalania uruchamiają pełny zestaw. Wypchnięcia do
`release/**` nie uruchamiają ich (2026-10-18): każda zmiana przeszła już macierz w swoim PR-ze,
a za scaloną kombinację odpowiada Release-Green (`docs/ops/RUNNER_BOX.md` → ścieżka hostowana). Forki
i grupy scalania używają hostowanych runnerów dla zadań, które w przeciwnym razie wybrałyby
runnery samodzielnie hostowane; przed wdrożeniem należy zweryfikować wystarczającą pojemność środowiska hostowanego.

Każde poświadczenie JSON identyfikuje SHA pobranego kodu, uruchomienie przepływu pracy i próbę.
CLI odrzuca niezgodność między SHA pobranego kodu a SHA zdarzenia. Testy przepływu pracy wiążą przynależność do polityki
z listą `needs` zadania werdyktu, aby nowa lub usunięta ścieżka nie mogła zniknąć bez ostrzeżenia.
Poświadczenia obejmują własny przepływ pracy, a nie publikację, wdrażanie ani wewnętrzne mechanizmy istniejącego skanera doradczego. Ustawienie odpowiednich kontroli jako wymaganych w regułach gałęzi jest osobną zmianą administracyjną; samo zdefiniowanie ich zadań nie chroni gałęzi.

`API Route Typecheck` jest niezależną kontrolą przepływu pracy, nieuwzględnioną ani w obu zagregowanych werdyktach, ani w statycznym profilu lokalnego pełnego obserwatora. Sprawdź jej wynik osobno dla konkretnego kandydata. `.github/workflows/api-route-typecheck.yml` jest uruchamiany dla PR-ów kierowanych do `main` lub `release/**`, wypchnięć do dowolnej z tych rodzin gałęzi oraz wywołań ręcznych. Nie ma filtra ścieżek. Zmiana gałęzi docelowej PR-a powoduje żądanie nowej kontroli; edycje treści lub tytułu używają nazwy przeznaczonej wyłącznie do obserwacji `Admission not requested / API Route Typecheck` i nie mogą zastąpić kontroli dopuszczenia. Przepływ pracy nie deklaruje wyzwalacza dla grupy scaleń. Każde wdrożenie kolejki scaleń, które wymaga tej kontroli, musi najpierw zapewnić jej wykonywanie dla tego zdarzenia.

### Wydajność wykonania interfejsu użytkownika

CI uruchamia pełny zestaw testów interfejsu użytkownika jako cztery fragmenty macierzy `test-vitest`, każdy z maksymalnie
dwoma workerami i istniejącym limitem czasu zadania wynoszącym 15 minut. Pierwszy fragment uruchamia również
zestaw Vitest dla MCP/autoCombo. Wynik wymaganego zadania obejmuje każdy element macierzy; awaria
lub anulowanie jednego fragmentu nie może stanowić podstawy do dopuszczenia kandydata.

Nocny obserwator zachowuje osobne poświadczenie dokładnego kandydata dla każdego fragmentu interfejsu użytkownika,
w tym wykonania MCP w pierwszym poświadczeniu. Wymagane są wszystkie cztery poświadczenia, logi i zgodne
tożsamości wykonań. Lokalne `npm run test:vitest:ui` nadal wybiera
kompletny zestaw; pojedyncze uruchomienie `--shard` stanowi tylko częściowy dowód.

### Zbieranie pokrycia testami jednostkowymi

Dwanaście fragmentów testów jednostkowych zbiera dane pokrycia V8 podczas istniejącego wykonania testów. Fragment zakończony powodzeniem
uruchamia `scripts/ci/compact-v8-coverage.mjs`, aby skompresować oryginalne pliki bez generowania
pośredniego raportu Istanbul. Końcowe zadanie Coverage weryfikuje wszystkie dwanaście manifestów względem
SHA kandydata, środowiska uruchomieniowego, katalogu głównego źródeł i skrótów danych, a następnie uruchamia raportery c8 i istniejące
progi pokrycia. Dane wejściowe zachowują globalną kolejność nazw plików c8; wstępne scalanie poszczególnych fragmentów jest niebezpieczne
w przypadku mieszanego pokrycia funkcji/bloków. Brakujące, zniekształcone lub niezgodne fragmenty powodują odmowę dopuszczenia.
Fragmenty testów zakończone niepowodzeniem zachowują nieprzetworzone diagnostyczne dane pokrycia osobno; nie mogą one zostać uwzględnione w końcowym scaleniu.

### Potwierdzenia postępu wykonywania testów jednostkowych

Współdzielone polecenie `test:unit:ci:shard` rejestruje fazy `primary`, `dashboard` i `serial`
za pośrednictwem `scripts/ci/unit-progress-reporter.mjs`. Standardowy raport z testów pozostaje
dostępny. Oddzielne potwierdzenie zawierające wyłącznie metadane rejestruje rozpoczęcie i zakończenie
każdego pliku, a 30-sekundowy sygnał aktywności wskazuje pliki, które nadal są aktywne, oraz czas ich
wykonywania. Rejestrowane są wyłącznie metadane wykonania znajdujące się na liście dozwolonych danych;
opisy testów, dane wyjściowe, treści błędów ani pełne środowisko nie są serializowane.

Procesy CI i Quality przechowują pliki JSONL jako `unit-progress-ci-<run>-<attempt>-<shard>` oraz
`unit-progress-quality-<run>-<attempt>-<shard>`. Przekroczenie limitu czasu zadania może uniemożliwić
późniejsze przesłanie plików; wyemitowane wcześniej sygnały aktywności pozostają materiałem
diagnostycznym. Brak sygnałów aktywności może również wskazywać na zablokowany lub zakończony proces
modułu wykonawczego. Te potwierdzenia zachowują dotychczasowy wybór testów, współbieżność, limity czasu
i kod zakończenia; nie stanowią werdyktów dotyczących dopuszczenia kandydata.

### Zachowane dowody w module agregującym wyniki akceptacji

`scripts/quality/validate-release-acceptance.mjs` agreguje dostarczony plan i jego manifesty; nie dowodzi, że plan obejmuje cały proces wydania. Jego raporty jawnie ustawiają `releaseAcceptance: false`, nawet gdy plan ma status `VERIFIED`. Workflow `release-acceptance.yml` nadal używa danych testowych w trybie shadow, a nie rzeczywistych potwierdzeń budowania, pakowania, uruchamiania lub promocji.

CLI wymaga `--evidence-root` do weryfikacji zachowanych dowodów. Pliki są odnajdywane pod ścieżką `<evidence-root>/<artifact_id>/<member>` i haszowane algorytmem SHA-256. Rekord PASS bez dowodów, brakujący lub zmieniony plik, niebezpieczna ścieżka albo dowiązanie symboliczne uniemożliwia potwierdzenie. Brakujące pliki nie są równoważne pustym logom udanych uruchomień. Istniejące kontrole SHA/run/attempt pozostają niezależne: zgodne bajty nie mogą uczynić nieaktualnego potwierdzenia ważnym. Integralność pliku nie dowodzi autentyczności wykonania ani promocji artefaktu.

### Inwentaryzacja skanowania statycznego

Wersjonowana inwentaryzacja aliasów npm i przynależność do skanowania statycznego znajdują się w
`config/quality/gate-manifest.json`. Uruchom `npm run check:gate-manifest`, aby zweryfikować
nazwy skryptów i dokładne polecenia względem `package.json`; dodania, usunięcia i
zmiany poleceń powodują niepowodzenie zarówno lokalnego hooka, jak i zadań klasyfikacji zmian w CI.
Alias nie jest zadaniem przepływu pracy, instancją macierzy ani przypadkiem testowym: tych wartości
nie wolno przedstawiać jako równoważnych.

Użyj `npm run quality:scan -- --list` lub `npm run quality:scan:fast -- --list`,
aby sprawdzić wybrane aliasy bez ich wykonywania. Runner wywołuje
punkt wejścia npm, dzięki czemu jego środowisko uruchomieniowe (w tym Bun, jeśli został skonfigurowany) zostaje zachowane.
Manifest rejestruje aliasy spoza tych profili jako wywoływane osobno, a
polecenia konserwacyjne są zabronione w profilach skanowania tylko do odczytu.

Profile te obejmują wyłącznie skanowanie statyczne. Nie poświadczają testów produktu,
pokrycia, pakowania, kontroli zewnętrznych ani pełnej akceptacji kandydata do wydania.
Dopuszczanie przez przepływ pracy wykorzystuje powiązane pliki `config/quality/admission-policy.json` oraz
`scripts/quality/admission-verdict.mjs`. Profile obserwatora wydania pozostają oddzielne;
należy niezależnie sprawdzać mające zastosowanie kontrole i poświadczenia. Polecenia statyczne pełnego obserwatora
są zadeklarowane w `config/quality/release-green-static-profile.json`, w tym
`audit:deps`, wybór testów mutacyjnych i kontrole tłumaczeń. Loader weryfikuje polecenia npm
względem package.json oraz modelowanych deklaracji CI/Quality; odrzuca rozbieżności,
zamiast wykonywać tokeny powłoki jako argumenty. Wymagane wyniki skanera SKIP/INCOMPLETE
nie mogą stanowić podstawy do uznania wyniku PASS. Profil rejestruje swoje wyłączenia zewnętrzne i nie zastępuje
hostowanych danych pokrycia, macierzy testów ani dowodów dotyczących pakietu lub wdrożenia. Poniższa inwentaryzacja opisowa
stanowi materiał referencyjny, a nie dowód faktycznego uruchomienia bramki.

Skrypty znajdują się w `scripts/check/` (bramki polityk) i `scripts/quality/` (silnik ratchet).
Źródłem prawdy dla CI jest `.github/workflows/ci.yml`.

### Stan opublikowanej dokumentacji bazowej

`.github/workflows/i18n-base-health.yml` monitoruje stan dokumentacji po wybranych
wypchnięciach do gałęzi `main` i `release/v*` oraz po ręcznym uruchomieniu. Jego filtry obejmują dokumentację,
główne pliki Markdown, `llm.txt`, stan i konfigurację tłumaczeń oraz odpowiednie narzędzia i18n.
Pojedyncze zadanie `Published base documentation health` korzysta z hostowanego środowiska Ubuntu i ma pięciominutowy
limit czasu. Przeprowadza walidację tylko do odczytu i zapisuje potwierdzenie diagnostyczne bez
instalowania zależności, tłumaczenia ani przyjmowania stanu.

`scripts/i18n/check-base-health.mjs` wymaga braku niespójności dotyczących skrótów źródłowych, brakujących plików docelowych, skrótów plików docelowych,
nieaktualnych tłumaczeń oraz pamięci podręcznej sekcji. Weryfikuje również bieżący zakres podstawowych
dokumentów i ustawień regionalnych oraz zarejestrowane pochodzenie tego zakresu. Nieprawidłowy kontekst, niepełne pokrycie
lub przerwane działanie narzędzia sprawdzającego powoduje ustawienie wyniku `INCOMPLETE`; potwierdzone rozbieżności powodują ustawienie wyniku `FAIL`. Oba
zwracają kod zakończenia oznaczający niepowodzenie. Potwierdzenie jest powiązane z SHA wersji checkout, przepływem pracy, uruchomieniem i
próbą oraz jest przechowywane jako `i18n-base-health-<sha>-<run>-<attempt>`.

Jest to niezależna obserwacja opublikowanej bazy. Nie dodaje zdarzenia PR ani
grupy scalania, wymaganego sprawdzenia PR, aliasu npm ani elementu profilu skanowania statycznego.
Istniejąca różnicowa polityka PR oraz bazowe klasyfikacje doradcze narzędzia sprawdzającego
pozostają odrębne. Pomyślne przesłanie nie może zmienić nieudanego wyniku kontroli stanu na PASS.

### Szybka ścieżka PR-a wydania (`quality.yml`)

`.github/workflows/quality.yml` uzupełnia CI dla PR-ów main/release, wypchnięć do `main`,
ręcznych uruchomień i grup scalania. PR-y używają szybkich kontroli filtrowanych według ścieżek. Trwale
wyłączony zduplikowany build został usunięty; rzeczywiste kontrole kompilacji/pakowania/uruchamiania pozostają w CI.

| Zadanie                                          | Zakres                                                                                                                                                                                                                                                          | Blokujące             |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `Docs Gates (fast-path)`                         | PR-y dotyczące dokumentacji/kodu; odwołania do dokumentacji API i docs-all                                                                                                                                                                                      | Tak                   |
| `Fast Quality Gates`                             | PR-y dotyczące kodu; kontrole statyczne, sprawdzanie typów, sprawdzanie typów panelu, testy jednostkowe objęte zmianami                                                                                                                                         | Tak                   |
| `Forgotten sibling tests`                        | PR-y dotyczące kodu; śledzenie zmienionych modułów do statycznych konsumentów i potencjalnych testów równoległych; ścieżki przez moduły zbiorcze i importy dynamiczne są raportowane jako diagnostyka doradcza, z odwołaniami do wyjątków na liście dozwolonych | **Doradcze**          |
| `Vitest (fast-path)`                             | PR-y dotyczące kodu; szybki zestaw testów vitest                                                                                                                                                                                                                | Tak                   |
| `Unit Tests fast-path`                           | PR-y dotyczące kodu; zestaw testów jednostkowych podzielony na 4 fragmenty                                                                                                                                                                                      | Tak                   |
| `No new ESLint warnings`                         | PR-y dotyczące kodu; mechanizm ochronny lint uwzględniający wyciszenia                                                                                                                                                                                          | Tak, także dla forków |
| `Merge integrity (changelog + generated skills)` | PR-y niebędące wersjami roboczymi; synchronizacja dziennika zmian i wygenerowanych umiejętności                                                                                                                                                                 | Tak, także dla forków |

#### Raport dotyczący pominiętych testów równoległych

`npm run check:forgotten-sibling-tests` ponownie wykorzystuje mechanizm rozwiązywania importów używany przez mapę wpływu na testy.
Dla każdego zmienionego modułu produkcyjnego raportuje deterministyczne łańcuchy
`changed module/symbol -> static consumer -> candidate sibling test`, gdy potencjalny
test nie występuje w różnicach żądania ściągnięcia. Podsumowanie w formacie Markdown i wynik JSON są zachowywane jako
artefakt przepływu pracy `forgotten-sibling-tests` na potrzeby kalibracji przed wdrożeniem mechanizmu blokującego.

Ponowne eksporty przez moduły zbiorcze i importy dynamiczne stanowią jedynie diagnostykę rozwiązywania; nigdy nie powodują
wyniku blokującego. Zatwierdzone wyjątki znajdują się w pliku
`config/quality/forgotten-sibling-allowlist.json`. Każdy wpis musi wskazywać konsumenta i potencjalny
test, zawierać konkretne uzasadnienie oraz łącze do zgłoszenia lub żądania ściągnięcia w serwisie GitHub. Nieprawidłowo sformułowane wpisy powodują
błąd w trybie zamkniętym. Wyjątki nie mogą wyciszyć usuniętego potencjalnego testu ani różnic dodających `.skip`/`.todo`;
osłabianie asercji i inne formy maskowania pozostają obsługiwane przez niezależnie blokującą
bramę `check:test-masking`.

### Zadanie: `lint`

Uruchamiane dla każdego PR-a do `main`. W przypadku niepowodzenia blokuje scalenie.

| Skrypt (`npm run ...`)            | Sprawdza                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Blokujący                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `check:node-runtime`              | Wersja Node.js mieści się w obsługiwanym zakresie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Tak                                          |
| `check:test-tla-order`            | Żaden plik `node:test` w katalogu `tests/unit` nie rejestruje testu, nie wykonuje `await` na najwyższym poziomie, a następnie nie rejestruje kolejnych testów (#18045; mechanizm zapadkowy: `test-tla-order-allowlist.json` może się tylko zmniejszać)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Tak                                          |
| `check:cycles`                    | Importy cykliczne w całych katalogach `src/` + `open-sse/` (na podstawie AST, z rozwiązywaniem `paths` z tsconfig). Wariant podstawowy kończy działanie z kodem 1, gdy istnieje jakikolwiek cykl (zasada fail-closed od #15281), i wyświetla listę SCC. `check:cycles:ratchet` (uruchamiany przez CI) blokuje, gdy liczba przekracza limit `metrics.cycles` w pliku `quality-baseline.json` — obecnie 14, `direction: down`, więc może ona tylko maleć (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Tak (mechanizm zapadkowy)                    |
| `check:boundary`                  | Powiązania `open-sse → src`: unikatowe importy między plikami z silnika do aplikacji (`scripts/quality/measure-boundary.mjs`; lista krawędzi stanowi rejestr zadań naprawczych dotyczących rozdzielenia rdzenia/modułów w wersji v4). Wariant podstawowy = raport doradczy (tak samo jak `quality:boundary`). `check:boundary:ratchet` (uruchamiany przez CI, a także w pętli mechanizmu zapadkowego szybkich bramek w `quality.yml`) blokuje, gdy liczba przekracza limit `metrics.boundaryOpenSseToSrc` w pliku `quality-baseline.json` — początkowo ustawiony na zmierzoną wartość 771, `direction: down`; `--update` może go tylko obniżyć; na PR-ach jest obliczany względem gałęzi bazowej (`--base-ref`, zob. poniżej)                                                                                                                                                                                                                                                                                            | Tak (mechanizm zapadkowy)                    |
| `check:route-validation:t06`      | Schematy Zod są obecne na wszystkich trasach (polityka poziomu 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Tak                                          |
| `check:any-budget:t11`            | Liczba wystąpień `@ts-expect-error // any` nie przekracza limitu (bramka poziomu 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Tak                                          |
| `check:provider-consistency`      | Każdy dostawca w `providers.ts` ma odpowiadający mu wpis w `providerRegistry.ts` (i odwrotnie, w ramach listy dozwolonych elementów)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Tak                                          |
| `check:model-lifecycle`           | Trzy ręcznie utrzymywane tabele routingu pozostają spójne z zatwierdzonym w repozytorium snapshotem cyklu życia (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nie przypisuje punktacji żadnemu wycofanemu identyfikatorowi, do którego `REGISTRY` może kierować ruch; każdy cel z `BUILT_IN_ALIASES` występuje w `REGISTRY` i nie występuje w snapshocie wycofanych identyfikatorów; każdy wycofany identyfikator nadal obecny w `REGISTRY` jest przekierowywany lub wymieniony w `allowedRetiredInCatalog`; a żadne źródło ani cel z `DEFAULT_DEGRADATION_MAP` nie widnieje w tym snapshocie jako wycofane. Nie dowodzi to, że model jest obecnie obsługiwany przez aktywnego dostawcę nadrzędnego. Działa offline — porównuje z `config/quality/model-lifecycle.json`, odświeżanym ręcznie za pomocą `npm run quality:refresh-model-lifecycle` (wymaga sieci; nie jest podłączone do CI). `allowedRetiredInCatalog` to mechanizm stopniowego ograniczania: wpis należy dodawać wyłącznie wraz ze zgłoszeniem śledzącym. | Tak                                          |
| `check:fetch-targets`             | Każde `fetch("/api/...")` w klienckiej części `src/` wskazuje na rzeczywisty plik `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Tak                                          |
| `check:deps`                      | Wszystkie zależności możliwe do zainstalowania za pomocą `npm install` ze wszystkich plików `package.json` w repozytorium znajdują się w `dependency-allowlist.json`; nowe pakiety bez przypiętej wersji lub podszywające się nazwą są oznaczane                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Tak                                          |
| `audit:deps`                      | Audyt npm wszystkich pięciu niezależnych plików blokady (głównego, Electron, wtyczek OpenCode v1/v2 i dostawcy). Krytyczne ostrzeżenia blokują; ostrzeżenia o wysokim poziomie zagrożenia pozostają widocznymi ostrzeżeniami. Brakujące/nieudane audyty mają status INCOMPLETE i blokują; skróty plików blokady oraz raporty są zachowywane dla każdego zakresu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Tak                                          |
| `check:lockfile`                  | Integralność `package-lock.json` — rejestr https, skróty integralności, brak nadpisań hosta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Tak                                          |
| `check:licenses`                  | Lista dozwolonych licencji SPDX dla zależności produkcyjnych                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Tak                                          |
| `check:tracked-artifacts`         | Brak artefaktów kompilacji / zatwierdzonych dowiązań symbolicznych `node_modules` (uruchamiane także w hooku pre-commit husky; pre-push jest celowo lekki — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Tak                                          |
| `check:ai-attribution`            | Brak stopki `Co-Authored-By` wskazującej na AI/bota ani stopki informującej o wygenerowaniu przez AI w commitach, tytule lub treści PR — Twarda reguła nr 16 (w pętli szybkich kontroli `quality.yml` dla PR→`release/**` — odczytuje dane zdarzenia i nie wykonuje żadnych działań poza PR — oraz krok tylko dla PR w kontroli lint pliku `ci.yml` dla PR→`main`; także hook `commit-msg` husky; współautorzy będący ludźmi są dozwoleni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Każde wykluczenie Vitest wskazuje zgłoszenie śledzące i występuje w `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Tak                                          |
| `check:file-size`                 | Pliki źródłowe (`.ts`/`.tsx` w `src/`, `open-sse/`, `electron/`, `bin/`) mieszczą się w limicie `cap`, a pliki testowe (`*.test.ts(x)`) w limicie `testCap`; pliki zamrożone w `file-size-baseline.json` (`frozen` / `testFrozen`) nie mogą przekroczyć zarejestrowanego rozmiaru                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Tak                                          |
| `check:error-helper`              | Odpowiedzi błędów w executorach/handlerach używają `buildErrorBody()` / `sanitizeErrorMessage()` (Reguła bezwzględna nr 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Tak                                          |
| `check:migration-numbering`       | Pliki SQL migracji są ponumerowane sekwencyjnie, bez luk ani duplikatów                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Tak                                          |
| `check:public-creds`              | Brak literałów OAuth `client_id`/`client_secret` lub kluczy Firebase Web poza `publicCreds.ts` (Reguła bezwzględna nr 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Tak                                          |
| `check:db-rules`                  | Brak surowego SQL poza modułami `src/lib/db/`; brak importów zbiorczych z `localDb.ts` (Reguły bezwzględne nr 2/5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Tak                                          |
| `check:known-symbols`             | Executory dostawców, strategie routingu i translatory zarejestrowane w odpowiednich tabelach dyspozytorskich są zgodne z plikami na dysku — brak osieroconych lub niezadeklarowanych symboli                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Tak                                          |
| `check:route-guard-membership`    | Każda trasa uruchamiająca proces podrzędny jest klasyfikowana przez `isLocalOnlyPath()` (Twarde reguły #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Tak                                          |
| `check:test-discovery`            | Każdy plik `*.test.ts` / `*.spec.ts` w repozytorium jest wykrywany przez co najmniej jeden moduł uruchamiający testy (mechanizm zapadkowy: lista osieroconych plików w `test-discovery-baseline.json` może się tylko zmniejszać)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Tak                                          |
| `check:agent-skills-sync`         | Wygenerowane artefakty umiejętności agentów są zgodne z katalogiem źródłowym (brak rozbieżności)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:provider-asset-provenance` | Logo/zasoby dostawców mają zarejestrowany wpis dotyczący pochodzenia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `lint:json`                       | Pliki konfiguracyjne JSON są poprawnie analizowane i spełniają reguły lintowania repozytorium                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | Kompilacja TypeScript bez błędów (tylko ostrzeżenia informacyjne)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Tak                                          |
| `typecheck:noimplicit:core`       | Ścisłe `noImplicitAny` — rozwiązanie zorientowane na przyszłość; wiele istniejących miejsc wywołań nadal wymaga adnotacji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Informacyjne** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograniczony do `src/app/(dashboard)/**` (#7033) — starannie dobrana lista 27 dozwolonych plików w `typecheck:core` nie obejmuje żadnego pliku TSX panelu, a `next build` również nigdy nie sprawdza jego typów (`next.config.mjs` ustawia `ignoreBuildErrors: true`), dlatego regresje związane z osieroconymi identyfikatorami (#6625/#6909) były niewidoczne dla CI. Porównuje wyniki z zamrożoną wartością bazową liczby błędów według pliku i kodu TS (`config/quality/dashboard-typecheck-baseline.json`, ten sam wzorzec wymuszania aktualności co w `check:known-symbols`) — tylko NOWE błędy wykraczające poza bazową liczbę powodują niepowodzenie bramki; gdy istniejący wcześniej błąd zostanie naprawiony, obniż wartość bazową za pomocą `--update`.                                                                                                                                                                                                                                                  | Tak                                          |

### Zadanie: `quality-gate`

Uruchamiane po `test-coverage`. W przypadku niepowodzenia blokuje scalenie.

| Skrypt                       | Sprawdza                                                                                                                                                                                          | Blokujący                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `quality:collect`            | Generuje `quality-metrics.json` (liczba ostrzeżeń ESLint, pokrycie ze scalonego raportu fragmentów)                                                                                               | Tak (przed mechanizmem zapadkowym) |
| `quality:ratchet`            | Żadna metryka w `quality-baseline.json` nie uległa pogorszeniu (ostrzeżenia ESLint ≤ wartość bazowa; pokrycie ≥ wartość bazowa)                                                                   | Tak                                |
| `check:duplication`          | Duplikacja kodu (jscpd@4) nie przekracza wartości bazowej w `quality-baseline.json`                                                                                                               | Tak                                |
| `check:complexity`           | Złożoność cyklomatyczna na poziomie pliku nie przekracza limitu (reguły podstawowego ESLint `complexity` + `max-lines-per-function`)                                                              | Tak                                |
| `check:cognitive-complexity` | Mechanizm zapadkowy złożoności poznawczej (`eslint-plugin-sonarjs`) — osobne uruchomienie ESLint; CI uruchamia oba razem jako pojedynczy krok `check:complexity-ratchets`                         | Tak                                |
| `check:dead-code`            | Mechanizm zapadkowy nieużywanych eksportów/plików (knip) nie wykazuje pogorszenia względem wartości bazowej                                                                                       | Tak                                |
| `check:compression-budget`   | Budżet testu wydajności kompresji — minimalne oszczędności tokenów dla poszczególnych silników nie mogą się pogorszyć                                                                             | Tak                                |
| `check:type-coverage`        | Mechanizm zapadkowy odsetka kodu z typami (`type-coverage`) nie wykazuje pogorszenia; w dużej mierze zastępuje `typecheck:noimplicit:core`                                                        | Tak                                |
| `check:codeql-ratchet`       | Liczba otwartych alertów CodeQL nie wzrasta (odczyt przez `gh api`; łagodne pominięcie bez tokenu) — częstotliwość odświeżania i ręczne uruchamianie: zobacz „Mechanizm zapadkowy CodeQL” poniżej | Tak                                |

### Zadanie: `quality-extended`

Zadanie blokuje kwalifikujących się kandydatów. Rozmiar pakietu, wykryte sekrety, wykryte
podatności, wykryte problemy w przepływach pracy oraz zmiany OpenAPI są sprawdzane za pomocą wymaganych mechanizmów zapadkowych.
Diagnostyka zależności cyklicznych pozostaje doradcza. Instalacja skanerów jest wymagana:
`scripts/ci/install-quality-scanners.sh` instaluje przypięte wersje i propaguje
błędy instalacji. Brakujące narzędzia, nieprawidłowe raporty lub brakujące wartości bazowe pozostawiają
wymaganą bramkę skanera w stanie INCOMPLETE.

| Skrypt                   | Sprawdza                                                                                                                                                                                                                                                                        | Blokowanie                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `check:circular-deps`    | Brak zależności cyklicznych (dpdm)                                                                                                                                                                                                                                              | **Doradcze**                                              |
| `check:bundle-size`      | Rozmiar pakietu nie przekracza limitu; niedostępny pomiar powoduje niepowodzenie                                                                                                                                                                                                | **Blokujące z --ratchet**                                 |
| `check:secrets`          | Liczba znalezisk Gitleaks nie wzrasta; wymagane skanowania odrzucają brakujące narzędzia, źródła lub punkt odniesienia, nieudane skanowania oraz nieprawidłowe raporty                                                                                                          | **Blokujące z --ratchet**                                 |
| `check:vuln-ratchet`     | Liczba luk w zależnościach nie wzrasta; wymagane skanowania odrzucają brakujące narzędzia, nieprawidłowe raporty lub brakujące punkty odniesienia                                                                                                                               | **Blokujące z --ratchet**                                 |
| `check:workflows`        | Lint przepływów pracy (actionlint + zizmor); brakujące lub niesprawne skanery, nieprawidłowe raporty albo brakujący punkt odniesienia mechanizmu ratchet powodują niepowodzenie ze stanem INCOMPLETE. Prawidłowe znaleziska podlegają wybranej polityce strict/advisory/ratchet | Wykonanie wymagane; mechanizm ratchet zizmor blokuje w CI |
| `check:openapi-breaking` | Publiczny kontrakt API względem przypiętych commitów zdarzeń (baza scalania PR, stan sprzed push, baza grupy scalania; w przypadku uruchomienia harmonogramowego/ręcznego — pierwszy rodzic checkoutu); niepowodzenie wymaganego pomiaru skutkuje blokadą                       | **Blokujące z --ratchet**                                 |

### Zadanie: `docs-sync-strict`

Dla pull requestów do `main` lub `release/**` to zadanie uruchamia się wyłącznie dla kandydatów, którzy nie są szkicami (lub należą do zaufanej kolejki) i zostali sklasyfikowani jako zmiany dokumentacji lub kodu. Uruchamia się również dla zdarzeń CI innych niż PR; wyzwalacz push tego workflow obejmuje tylko `main`, a nie `release/**`. Krok kończący się niezerowym kodem wyjścia blokuje zadanie; poniższe ustalenia raportowane jedynie informacyjnie i udokumentowane wyjątki go nie blokują.

| Skrypt                         | Sprawdza                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Blokowanie                                                                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-bramka, która kolejno uruchamia 7 poniższych bramek podrzędnych                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Tak                                                                                                                                                  |
| ↳ `check:docs-sync`            | Spójność wersji pakietu/OpenAPI/CHANGELOG, dokładne kopie `llm.txt`, niezmienniki sekcji/rozmiaru przetłumaczonego CHANGELOG oraz brak zastąpionych duplikatów dokumentów                                                                                                                                                                                                                                                                                                                                                               | Tak                                                                                                                                                  |
| ↳ `check:docs-frontmatter`     | Skompilowane strony dokumentacji zawierają prawidłowe tytuły w metadanych frontmatter                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Tak                                                                                                                                                  |
| ↳ `check:docs-counts`          | Niezmienniki liczności o wysokiej wiarygodności są rygorystyczne; heurystyczne kontrole liczby plików jedynie ostrzegają, chyba że skrypt otrzyma `--strict` (meta-bramka CI nie przekazuje tej flagi)                                                                                                                                                                                                                                                                                                                                  | Warstwa rygorystyczna blokuje; miękka jest doradcza                                                                                                  |
| ↳ `check:env-doc-sync`         | Odczyty zmiennych środowiskowych w kodzie źródłowym, `.env.example` i `docs/reference/ENVIRONMENT.md` są zgodne po zastosowaniu jawnych list wyjątków ignore, doc-only i env-only                                                                                                                                                                                                                                                                                                                                                       | Tak, poza udokumentowanymi listami wyjątków                                                                                                          |
| ↳ `check:deprecated-versions`  | Raportuje potencjalnie nieaktualne wersje poza bezpiecznymi kontekstami historycznymi oraz stare daty aktualizacji, z wyłączeniem ignorowanych dokumentów                                                                                                                                                                                                                                                                                                                                                                               | Doradcze w obecnej konfiguracji CI (`--strict` nie jest przekazywane)                                                                                |
| ↳ `check:doc-links`            | Wewnętrzne linki Markdown w dokumentacji wskazują na istniejące pliki (format `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                                                                                                        | Tak                                                                                                                                                  |
| ↳ `check:fabricated-docs`      | Trasy, zmienne środowiskowe, polecenia CLI, nazwy hooków i ścieżki plików przywołane w dokumentacji istnieją w bazie kodu. Twarda bramka z `--strict`; bez tej flagi niepowodzenie jest miękkie.                                                                                                                                                                                                                                                                                                                                        | Tak (przez `--strict` w CI)                                                                                                                          |
| `check:cli-i18n`               | Używane klucze CLI `t()` istnieją w `en`; `pt-BR` zachowuje wszystkie sekcje najwyższego poziomu; `zh-CN` i `zh-TW` zawierają wszystkie klucze z `en`                                                                                                                                                                                                                                                                                                                                                                                   | Tak                                                                                                                                                  |
| `check:openapi-coverage`       | Specyfikacja OpenAPI obejmuje co najmniej ustalony przez mechanizm ratchet minimalny odsetek rzeczywistych tras                                                                                                                                                                                                                                                                                                                                                                                                                         | Tak                                                                                                                                                  |
| `check:openapi-security-tiers` | Zadeklarowane adnotacje `x-loopback-only`/`x-always-protected` muszą mieć pokrycie w `routeGuard.ts`; błędy parsera i niezgodności kontroli w przód blokują. Odwrotna kontrola brakujących `x-loopback-only` pod prefiksami tylko lokalnymi ostrzega, a trasy określone wyłącznie wzorcami są wyłączone z tej odwrotnej kontroli.                                                                                                                                                                                                       | Parser/kontrole w przód blokują; kontrola odwrotna jest doradcza                                                                                     |
| `check:openapi-routes`         | Każda ścieżka `/api...` w `openapi.yaml` odpowiada rzeczywistej trasie niezależnie od nazw parametrów po uwzględnieniu uzasadnionej listy wyjątków `KNOWN_STALE_SPEC`; nieaktualne wpisy na tej liście również powodują niepowodzenie                                                                                                                                                                                                                                                                                                   | Tak                                                                                                                                                  |
| `check:docs-symbols`           | Wewnętrzne odwołania URL `/api/...` w kanonicznych dokumentach niebędących kopiami tłumaczeń odpowiadają rzeczywistej trasie lub rodzinie tras; odwołania proxy/upstream/placeholder/plikowe i uzasadnione wpisy `KNOWN_STALE_DOC_REFS` są wyłączone, a nieaktualne wpisy na liście wyjątków powodują niepowodzenie                                                                                                                                                                                                                     | Tak                                                                                                                                                  |
| `i18n translation drift`       | Sprawdza hashe źródła/celu podstawowych dokumentów i pochodzenie tłumaczenia. Porównanie PR dopuszcza tylko identyczne odziedziczone błędy; nowe lub niezweryfikowane niespójności źródła, brakującego celu, hasha celu, nieaktualnego tłumaczenia lub pamięci podręcznej sekcji blokują. Poza porównaniem PR błędy źródła/brakującego celu/hasha celu blokują, natomiast nieaktualne tłumaczenia i niespójne pamięci podręczne sekcji pozostają tylko ostrzeżeniami. Brak pamięci podręcznej sekcji w starym formacie nie jest błędem. | Nowa/niezweryfikowana rozbieżność w PR blokuje; identyczna odziedziczona rozbieżność jest tylko ostrzeżeniem; reguły poza PR zależą od rodzaju błędu |

### Zadanie: `i18n-ui-coverage`

| Skrypt                            | Sprawdza                                                                                                                                                                                                                                                 | Blokujący     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (inline) | Pokrycie kluczy i18n interfejsu użytkownika wynosi ≥ 65%                                                                                                                                                                                                 | Tak           |
| `check-ui-value-drift` (inline)   | Zmieniona angielska **wartość** nie pozostawia nieaktualnych tłumaczeń                                                                                                                                                                                   | Tak           |
| `check-new-key-coverage` (inline) | **Nowy** angielski klucz jest przetłumaczony w każdym języku — znacznik `__MISSING__:` jest odrzucany                                                                                                                                                    | Tak           |
| `check-translation-ratio`         | Współczynnik rzeczywistych tłumaczeń dla każdego języka (wartości identyczne z angielskimi / symbole zastępcze / brakujące elementy spoza listy dozwolonych) nie może przekraczać wartości z `config/quality/i18n-translation-baseline.json` + marginesu | **Blokujące** |

Wymaga `fetch-depth: 0` — bramka wykrywania zmian wartości porównuje `en.json` z bazą scalania.

#### `check-ui-value-drift` — bramka nieaktualnych tłumaczeń

Wykrywa ten jeden typ regresji i18n, którego pozostałe bramki z założenia nie mogą zauważyć: angielska wartość
zostaje zmieniona, a tłumaczenia utworzone na podstawie _poprzedniej_ angielskiej wersji pozostają bez zmian, przez co
użytkownicy innych języków nadal widzą sformułowany z pełnym przekonaniem, lecz obecnie błędny tekst.

Taki problem rzeczywiście trafił do wydania. `oauthModal.googleOAuthWarning` został zmieniony po dodaniu
pomocnika logowania Antigravity (#5203); w **39 z 43 języków** pozostał tekst instruujący operatorów, aby „skopiowali
pełny adres URL i wkleili go poniżej” — w przypadku tego dostawcy taki proces nie może się zakończyć. Problem
pozostał niezauważony aż do #8463, ponieważ:

- `sync-ui-keys` uzupełnia tylko klucze, których **brakuje**, nigdy tych, które są **nieaktualne**;
- `check-ui-keys-coverage` zlicza _obecność_ kluczy, więc nieaktualne tłumaczenie jest uznawane za pokryte;
- `check-translation-drift` śledzi kopie dokumentacji `docs/i18n/<locale>/**.md` —
  nigdy nie odczytuje `src/i18n/messages/*.json`. Blokuje w zadaniu `docs-sync-strict` od ponownej
  synchronizacji z 2026-09: edycja głównego dokumentu → `npm run i18n:run -- --files=<doc>` (na poziomie sekcji, niewielki koszt).

**Uwzględnia różnice, nie korzysta z bazowej wartości odniesienia.** Porównuje `en.json` z bazy scalania
z drzewem roboczym; dla każdego klucza, którego angielska wartość uległa zmianie, każde tłumaczenie nadal zawierające
niezmienioną wersję jest nieaktualne. Celowo **zamraża istniejący dług** — na podstawie różnicy
nie da się ustalić, z której starej angielskiej wersji pochodzi istniejące od dawna tłumaczenie, dlatego bramka ocenia
wyłącznie elementy zmienione przez bieżącą modyfikację. Alternatywa (bazowa wartość skrótu dla każdego klucza) wymagałaby
wygenerowanego pliku o rozmiarze około 600 KB, trzykrotnie większego od największej istniejącej bazy, zmieniającego się przy każdym PR dotyczącym i18n.

Można spełnić wymagania na dwa sposoby:

1. zaktualizować odpowiednie tłumaczenia albo
2. ustawić je na `__MISSING__:<new english>` — środowisko uruchomieniowe wyświetli wtedy poprawiony tekst angielski
   (`src/i18n/request.ts::deepMergeFallback`, #7258), a klucz trafi do kolejki tłumaczeń.

Jeśli zmieniło się **znaczenie** tekstu, lepiej **zmienić nazwę klucza**: nowy klucz nie może odziedziczyć
nieaktualnego tłumaczenia. Takie rozwiązanie zastosowano w #8463.

```bash
npm run i18n:check-value-drift          # tryb rygorystyczny (uruchamiany przez CI)
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

### Zadanie: `i18n`

Pełna macierz walidacji i18n (jedno zadanie na język). Całe zadanie ma charakter doradczy.

| Skrypt                          | Sprawdza                                   | Blokujący                                                   |
| ------------------------------- | ------------------------------------------ | ----------------------------------------------------------- |
| `validate_translation.py quick` | Kompletność tłumaczenia dla każdego języka | **Doradczy** (`continue-on-error: true` dla całego zadania) |

### Zadanie: `pr-test-policy`

Uruchamiane tylko dla pull requestów.

| Skrypt                 | Sprawdza                                                                                                                                                                      | Blokujący |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR-y zmieniające kod produkcyjny w `src/`, `open-sse/`, `electron/` lub `bin/` muszą zawierać nowe lub zaktualizowane testy (Twarda reguła nr 8)                              | Tak       |
| `check:test-masking`   | Zmienione pliki testowe nie zmniejszają łącznej liczby asercji ani nie dodają tautologii `assert.ok(true)`                                                                    | Tak       |
| `check:pr-evidence`    | Treść PR-a zawiera odniesienia do dowodów z testów/VPS dla danej zmiany (automatyzuje Twardą regułę nr 18 przez przeszukiwanie opisu PR-a — rozwiązanie kruche, zob. Backlog) | Tak       |

### Zadanie: `test-vitest`

Wymaga zadania klasyfikacyjnego `changes`. Odpowiednie fragmenty macierzy blokują scalanie w przypadku niepowodzenia.

| Zestaw           | Weryfikuje                                                             | Blokujący                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Serwer MCP (110 narzędzi), autoCombo, pamięć podręczna — runner vitest | Tak                                                                                                                             |
| `test:vitest:ui` | Testy komponentów interfejsu użytkownika — runner vitest               | **Blokujący** — istniejące wcześniej błędy są jawnie wykluczone w `vitest.config.ts`; nowe błędy powodują niepowodzenie zadania |

### Nocne przepływy pracy (zaplanowane, doradcze)

Są one uruchamiane zgodnie z harmonogramem cron (oraz przez `workflow_dispatch`), nigdy dla PR-ów. Wszystkie mają charakter doradczy.

| Przepływ pracy         | Weryfikuje                                                                                                                                                                                        | Blokujący    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | Testy właściwości fast-check z losowym ziarnem i dużą liczbą uruchomień                                                                                                                           | **Doradczy** |
| `nightly-resilience`   | Próg wzrostu sterty, wstrzykiwanie błędów chaos engineering, testy obciążeniowe/długotrwałe k6                                                                                                    | **Doradczy** |
| `nightly-llm-security` | Ochrona przed wstrzyknięciami promptfoo (tryb blokowania) oraz sondy garak (pomijane bez sekretu dostawcy)                                                                                        | **Doradczy** |
| `nightly-schemathesis` | Testy fuzzingowe kontraktu OpenAPI (schemathesis) względem działającej usługi OmniRoute przy użyciu `docs/openapi.yaml` — ujawniają naruszenia specyfikacji / nieobsłużone błędy 500 (Faza 8 B.4) | **Doradczy** |
| `nightly-mutation`     | Wynik testów mutacyjnych Stryker dla szybkiej ścieżki testów jednostkowych — mutanci, które przetrwały, wskazują słabe asercje                                                                    | **Doradczy** |
| `nightly-compat`       | Macierz zgodności silnika Node dla obsługiwanych zakresów `engines.node`                                                                                                                          | **Doradczy** |

Bazowe wartości wydajności (sterta, TTFB, czas kompilacji) są rejestrowane, ale nie stanowią kryterium blokującego: zobacz [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### Mechanizm zapadkowy CodeQL: częstotliwość odświeżania i ręczne wyzwalanie

`check:codeql-ratchet` odczytuje **stan repozytorium, odświeżany zgodnie z harmonogramem — nie dla każdego PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` raportuje
`state: configured`, `schedule: weekly`: jest to skan domyślnej konfiguracji GitHub, a nie analiza
wykonywana przy każdym wysłaniu zmian. Konsekwencja: po scaleniu PR, który NAPRAWIA alerty, mechanizm zapadkowy nadal odczytuje
starą, wyższą liczbę aż do uruchomienia następnego zaplanowanego skanowania — dlatego raportuje regresję
dla każdego otwartego PR, w tym dla kolejnych zmian dotyczących naprawiającego PR, dopóki wyniki skanowania nie zostaną zaktualizowane.

**Ręczne odświeżenie**: `gh workflow run codeql.yml --ref release/vX.Y.Z` ponownie uruchamia
analizę i w ciągu kilku minut ponownie publikuje alerty. Najpierw przeczytaj `.github/workflows/codeql.yml`
— jego nagłówek wyjaśnia, że używa wyłącznie `workflow_dispatch` **ponieważ powoduje konflikt z
„konfiguracją domyślną” GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Przywrócenie wyzwalaczy `push`/`pull_request`/
`schedule` wymaga najpierw **działania właściciela**: Settings → Code security →
CodeQL: Default → Advanced. Nie dodawaj wyzwalacza `schedule:` bez tego przełączenia — będzie
on jedynie powodował nieudane uruchomienia.

**Zaostrz poziom bazowy po spadku liczby** — `node scripts/check/check-codeql-ratchet.mjs
--update` zapisuje nową zmierzoną liczbę w `quality-baseline.json` →
`metrics.codeqlAlerts.value`, dzięki czemu mechanizm zapadkowy nie dopuści po cichu do regresji z powrotem
do starego limitu. Przykład (2026-09-02/03): PR #12502 naprawił 7 rzeczywistych alertów
(13 → 6 zmierzonych otwartych alertów); PR #12530 zaostrzył zamrożony poziom bazowy z 11 → 6, aby był zgodny z wynikiem; pozostałe
6 alertów zostało następnie odrzuconych z indywidualnym uzasadnieniem, co zmniejszyło ich liczbę do 0 otwartych alertów.

**Decyzja o odrzuceniu alertów należy do operatora (Twarda reguła #14)** — nigdy nie odrzucaj alertu CodeQL
bez zapisania technicznego uzasadnienia w komentarzu odrzucenia: `won't fix` w przypadku
wymagania protokołu nadrzędnego, `used in tests` w przypadku danych testowych, `false positive`
w przypadku mechanizmu oczyszczania danych, którego CodeQL nie potrafi wykryć (precedens: `docs/security/ERROR_SANITIZATION.md`).

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

**Powyżej nie udokumentowano również** (doradcze, słaby sygnał): zadania `docs-lint`
(markdownlint + Vale, całe zadanie z `continue-on-error`) oraz samodzielnych przepływów pracy skanerów
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. Wartość `semgrepFindings: 0` znajduje się w
`quality-baseline.json`, ale nie jest podłączona do blokującego mechanizmu zapadkowego w `ci.yml` — ta metryka jest
obecnie osierocona.

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
- `check:pr-evidence` (blokujące, przeszukuje tekst opisu PR-a) — wysokie ryzyko wyników fałszywie pozytywnych; jego usunięcie osłabia egzekwowanie bezwzględnej reguły nr 18, więc jest to rzeczywista decyzja dotycząca zasad.
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
