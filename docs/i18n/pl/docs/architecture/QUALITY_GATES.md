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

### Dopuszczanie kandydatów

Przepływy pracy CI i Quality Gates generują stabilne werdykty: `Gate / CI` oraz
`Gate / Quality`. Ich wersjonowana polityka dopuszczania określa każde nadrzędne zadanie
jako wymagane lub doradcze. Każde mające zastosowanie wymagane zadanie musi zakończyć się
powodzeniem: brakujące, anulowane, pominięte, oczekujące i nieznane wyniki nie mogą
potwierdzić statusu PASS. Prawidłowa klasyfikacja obejmująca wyłącznie dokumentację lub
wyłącznie katalog może sprawić, że ścieżka kodu nie będzie miała zastosowania;
wersja robocza PR nie jest akceptowanym kandydatem. Etykieta `hotfix` nie zwalnia
z obowiązku przedstawienia dowodów.

Oba przepływy pracy obejmują PR-y kierowane do gałęzi main/release, wypchnięcia do `main`,
ręczne uruchomienia i zdarzenia grup scalania. Wypchnięcia, ręczne uruchomienia i grupy
scalania wykonują pełny zestaw. Wypchnięcia do `release/**` ich nie uruchamiają (2026-10-18):
każda zmiana wykonała już macierz w swoim PR, a za scaloną kombinację odpowiada Release-Green
(`docs/ops/RUNNER_BOX.md` → ścieżka hostowana). Forki i grupy scalania używają hostowanych
runnerów dla zadań, które w przeciwnym razie wybrałyby runnery self-hosted;
przed wdrożeniem należy zweryfikować wystarczającą pojemność zasobów hostowanych.

Zwykły PR wykonuje szybki zestaw. Ścieżki `full-code` i `full-code-e2e` polityki
dopuszczania (E2E, integracja, artefakt pakietu, test dymny Electron, Bun SQLite, ekosystem
i klienci protokołu) są uruchamiane wyłącznie dla wersji roboczej kolejki Mergify lub
podczas pełnego uruchomienia:
`gh workflow run ci.yml --ref <branch>`.

Każde potwierdzenie JSON identyfikuje SHA pobranego kodu, uruchomienie przepływu pracy
i próbę. CLI odrzuca niezgodność SHA między pobranym kodem a zdarzeniem. Testy przepływu
pracy wiążą członkostwo w polityce z listą `needs` zadania werdyktu, aby nowa lub usunięta
ścieżka nie mogła zniknąć bez ostrzeżenia. Potwierdzenia obejmują własny przepływ pracy,
a nie publikację, wdrożenie ani wewnętrzne działanie istniejącego skanera doradczego.
Aktywowanie obu nazw kontroli w regułach gałęzi jest oddzielną zmianą administracyjną;
samo dodanie tych zadań nie chroni gałęzi.

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

### Inwentarz skanowania statycznego

Wersjonowany inwentarz aliasów npm oraz członkostwo w skanowaniu statycznym znajdują się
w `config/quality/gate-manifest.json`. Uruchom `npm run check:gate-manifest`, aby zweryfikować
nazwy skryptów i dokładne polecenia względem `package.json`; dodania, usunięcia i zmiany
poleceń powodują niepowodzenie zarówno lokalnego hooka, jak i zadań klasyfikacji zmian
w CI. Alias nie jest zadaniem przepływu pracy, instancją macierzy ani przypadkiem testowym:
tych wartości nie wolno przedstawiać jako zamiennych.

Użyj `npm run quality:scan -- --list` lub `npm run quality:scan:fast -- --list`,
aby sprawdzić wybrane aliasy bez ich wykonywania. Runner wywołuje punkt wejścia npm,
dzięki czemu jego środowisko wykonawcze (w tym Bun, jeśli zostało skonfigurowane) zostaje
zachowane. Manifest rejestruje aliasy spoza tych profili jako wywoływane oddzielnie,
a polecenia konserwacyjne są zabronione w profilach skanowania tylko do odczytu.

Profile te obejmują wyłącznie skanowanie statyczne. Nie poświadczają testów produktu,
pokrycia, pakowania, kontroli zewnętrznych ani pełnej akceptacji kandydata do wydania.
Dopuszczanie w przepływie pracy korzysta z powiązanych plików
`config/quality/admission-policy.json` i `scripts/quality/admission-verdict.mjs`.
Profile obserwatora wydań pozostają oddzielne; ich mające zastosowanie kontrole
i potwierdzenia należy sprawdzać niezależnie. Poniższy opisowy inwentarz stanowi
materiał referencyjny, a nie dowód faktycznego uruchomienia bramki.

Skrypty znajdują się w `scripts/check/` (bramki polityki) oraz `scripts/quality/`
(mechanizm ratchet). Źródłem prawdy dla CI jest `.github/workflows/ci.yml`.

### Szybka ścieżka PR wydania (`quality.yml`)

`.github/workflows/quality.yml` uzupełnia CI dla PR-ów kierowanych do gałęzi main/release,
wypchnięć do `main`, ręcznych uruchomień i grup scalania. PR-y używają szybkich kontroli
filtrowanych według ścieżek. Trwale wyłączony, zduplikowany proces budowania został usunięty;
rzeczywiste kontrole budowania, pakowania i uruchamiania pozostają w CI.
Zestaw testów jednostkowych i vitest działają wyłącznie w CI (`Unit Tests (N/8)` i `Vitest`).

| Zadanie                                          | Zakres                                                                                                                                | Blokujące        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `Docs Gates (fast-path)`                         | PR-y dokumentacji/kodu; odwołania do dokumentacji API i docs-all                                                                      | Tak              |
| `Fast Quality Gates`                             | PR-y kodu; kontrole statyczne, typecheck, typecheck panelu, testy jednostkowe objęte zmianami, zapomniane testy siostrzane (doradcze) |
| `No new ESLint warnings`                         | PR-y kodu; kontrola lint uwzględniająca wyłączenia                                                                                    | Tak, w tym forki |
| `Merge integrity (changelog + generated skills)` | PR-y niebędące wersjami roboczymi; synchronizacja changelogu i wygenerowanych umiejętności                                            | Tak, w tym forki |

#### Raport zapomnianych testów siostrzanych

`npm run check:forgotten-sibling-tests` jest uruchamiane jako krok doradczy w ramach `Fast Quality Gates` i ponownie wykorzystuje
mechanizm rozwiązywania importów stojący za mapą wpływu testów.
Dla każdego zmienionego modułu produkcyjnego raportuje deterministyczne łańcuchy
`changed module/symbol -> static consumer -> candidate sibling test`, gdy test kandydujący
nie występuje w różnicach żądania ściągnięcia. Podsumowanie Markdown i wynik JSON są zachowywane jako
artefakt przepływu pracy `forgotten-sibling-tests` na potrzeby kalibracji przed jakimkolwiek wdrożeniem blokującym.

Ponowne eksporty z plików zbiorczych i importy dynamiczne służą wyłącznie do diagnostyki rozwiązywania; nigdy nie tworzą
blokującego wyniku. Zweryfikowane wyjątki znajdują się w
`config/quality/forgotten-sibling-allowlist.json`. Każdy wpis musi wskazywać konsumenta i test kandydujący,
zawierać konkretne uzasadnienie oraz link do zgłoszenia lub żądania ściągnięcia w GitHubie. Nieprawidłowe wpisy
powodują niepowodzenie w trybie bezpiecznym. Wyjątki nie mogą pomijać usuniętego testu kandydującego ani różnic dodających `.skip`/`.todo`;
osłabianie asercji i inne formy maskowania pozostają w gestii niezależnie blokującej
bramki `check:test-masking`.

### Zadanie: `lint`

Uruchamiane dla każdego żądania ściągnięcia do `main`. W przypadku niepowodzenia blokuje scalanie.

| Skrypt (`npm run ...`)            | Sprawdza                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Blokujący                                |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Wersja Node.js mieści się w obsługiwanym zakresie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Tak                                      |
| `check:cycles`                    | Importy cykliczne w całych `src/` + `open-sse/` (na podstawie AST, z rozwiązanymi `paths` z tsconfig). Wariant podstawowy kończy działanie z kodem 1, gdy istnieje jakikolwiek cykl (fail-closed od #15281), i wyświetla listę SCC. `check:cycles:ratchet` (uruchamiany przez CI) blokuje, gdy liczba przekracza limit `metrics.cycles` w `quality-baseline.json` — obecnie 14, `direction: down`, więc może tylko maleć (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Tak (ratchet)                            |
| `check:boundary`                  | Powiązanie `open-sse → src`: unikatowe importy między plikami z silnika do aplikacji (`scripts/quality/measure-boundary.mjs`; lista krawędzi stanowi backlog działań naprawczych związanych z podziałem rdzenia/modułów v4). Wariant podstawowy = raport doradczy (tak samo jak `quality:boundary`). `check:boundary:ratchet` (uruchamiany przez CI, również w pętli ratchet szybkich bramek w `quality.yml`) blokuje, gdy liczba przekracza limit `metrics.boundaryOpenSseToSrc` w `quality-baseline.json` — początkowo ustawiony na zmierzoną wartość 771, `direction: down`; `--update` może go tylko obniżyć; na PR-ach wartość jest względna względem gałęzi bazowej (`--base-ref`, patrz poniżej)                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Tak (ratchet)                            |
| `check:route-validation:t06`      | Schematy Zod są obecne we wszystkich trasach (zasady poziomu 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Tak                                      |
| `check:any-budget:t11`            | Liczba wystąpień `@ts-expect-error // any` nie przekracza budżetu (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Tak                                      |
| `check:provider-consistency`      | Każdy dostawca w `providers.ts` ma odpowiadający mu wpis w `providerRegistry.ts` (i odwrotnie, w granicach listy dozwolonych elementów)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Tak                                      |
| `check:model-lifecycle`           | Trzy ręcznie utrzymywane tabele routingu pozostają spójne z zatwierdzoną w repozytorium migawką cyklu życia (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nie ocenia żadnego wycofanego identyfikatora, do którego `REGISTRY` może kierować; każdy cel z `BUILT_IN_ALIASES` jest obecny w `REGISTRY` i nie występuje w migawce wycofanych identyfikatorów; każdy wycofany identyfikator nadal obecny w `REGISTRY` jest przekierowywany lub wymieniony w `allowedRetiredInCatalog`; a żadne źródło ani cel z `DEFAULT_DEGRADATION_MAP` nie jest oznaczone w tej migawce jako wycofane. Nie dowodzi to, że model jest obecnie udostępniany przez działającą usługę nadrzędną. W trybie offline — porównuje z `config/quality/model-lifecycle.json`, odświeżanym ręcznie za pomocą `npm run quality:refresh-model-lifecycle` (wymaga sieci; nie jest podłączone do CI). `allowedRetiredInCatalog` jest mechanizmem zapadkowym stopniowego wygaszania: wpis należy dodawać wyłącznie wraz ze zgłoszeniem umożliwiającym śledzenie.                                                                                                                             | Tak                                      |
| `check:fetch-targets`             | Każde `fetch("/api/...")` w kodzie klienckim w `src/` wskazuje na rzeczywisty plik `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Tak                                      |
| `check:deps`                      | Wszystkie zależności możliwe do zainstalowania za pomocą `npm install` ze wszystkich plików `package.json` w repozytorium znajdują się w `dependency-allowlist.json`; nowe pakiety bez przypiętej wersji lub wykorzystujące slopsquatting są oznaczane                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Tak                                      |
| `audit:deps`                      | `npm audit` (katalog główny + Electron) — brak ostrzeżeń o wysokim lub krytycznym poziomie ważności (częściowo pokrywa się z kontrolą OSV `check:vuln-ratchet`; zobacz zaległości dotyczące racjonalizacji)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Tak                                      |
| `check:lockfile`                  | Integralność `package-lock.json` — rejestr https, skróty integralności, brak nadpisań hosta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Tak                                      |
| `check:licenses`                  | Lista dozwolonych licencji SPDX dla zależności produkcyjnych                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Tak                                      |
| `check:tracked-artifacts`         | Brak artefaktów kompilacji / zatwierdzonych dowiązań symbolicznych `node_modules` (uruchamiane również w husky pre-commit; pre-push jest celowo uproszczony — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Tak                                      |
| `check:ai-attribution`            | Brak stopki AI/bota `Co-Authored-By` ani stopki informującej o wygenerowaniu przez AI w commitach, tytule lub treści PR — Twarda reguła #16 (w pętli szybkich bramek `quality.yml` dla PR→`release/**` — odczytuje dane zdarzenia, nie wykonuje żadnej operacji poza PR — oraz jako krok tylko dla PR w procesie lint pliku `ci.yml` dla PR→`main`; również hak husky `commit-msg`; współautorzy będący ludźmi są dozwoleni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:vitest-exclusions`         | Każde wykluczenie Vitest wskazuje zgłoszenie śledzące i znajduje się w `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Tak                                      |
| `check:file-size`                 | Pliki źródłowe (`.ts`/`.tsx` w `src/`, `open-sse/`, `electron/`, `bin/`) mieszczą się w limicie `cap`, a pliki testowe (`*.test.ts(x)`) w limicie `testCap`; pliki zamrożone w `file-size-baseline.json` (`frozen` / `testFrozen`) nie mogą przekroczyć zarejestrowanego rozmiaru                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Tak                                      |
| `check:error-helper`              | Odpowiedzi błędów w executorach/handlerach używają `buildErrorBody()` / `sanitizeErrorMessage()` (Twarda reguła #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Tak                                      |
| `check:migration-numbering`       | Pliki SQL migracji są numerowane sekwencyjnie, bez luk ani duplikatów                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Tak                                      |
| `check:public-creds`              | Brak literałów OAuth `client_id`/`client_secret` ani kluczy Firebase Web poza `publicCreds.ts` (Twarda reguła #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Tak                                      |
| `check:db-rules`                  | Brak surowego SQL poza modułami `src/lib/db/`; brak importów zbiorczych z `localDb.ts` (Twarde reguły #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Tak                                      |
| `check:known-symbols`             | Executory dostawców, strategie routingu i translatory zarejestrowane w swoich tabelach dyspozytorskich są zgodne z plikami na dysku — brak osieroconych lub niezadeklarowanych symboli                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Tak                                      |
| `check:route-guard-membership`    | Każda trasa uruchamiająca proces potomny jest klasyfikowana przez `isLocalOnlyPath()` (Twarde reguły #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Tak                                      |
| `check:test-discovery`            | Każdy plik `*.test.ts` / `*.spec.ts` w repozytorium jest wykrywany przez co najmniej jeden moduł uruchamiający testy (mechanizm zapadkowy: lista osieroconych plików w `test-discovery-baseline.json` może się tylko skracać)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Tak                                      |
| `check:test-tla-order`            | Żaden plik `node:test` w katalogu `tests/unit` nie rejestruje testu, napotyka `await` najwyższego poziomu, a następnie rejestruje kolejnych testów (#18045; mechanizm zapadkowy: `test-tla-order-allowlist.json` może się tylko skracać)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Tak                                      |
| `check:agent-skills-sync`         | Wygenerowane artefakty umiejętności agenta są zgodne z ich katalogiem źródłowym (bez rozbieżności)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:provider-asset-provenance` | Logo/zasoby dostawców mają zarejestrowany wpis dotyczący pochodzenia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | Pliki konfiguracyjne JSON są prawidłowo analizowane i spełniają reguły lintowania repozytorium                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | Kompilacja TypeScript bez błędów (tylko ostrzeżenia informacyjne)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Tak                                      |
| `typecheck:noimplicit:core`       | Rygorystyczne `noImplicitAny` — z myślą o przyszłości; wiele istniejących miejsc wywołań nadal wymaga adnotacji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **Doradcze** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograniczony do `src/app/(dashboard)/**` (#7033) — starannie dobrana lista 27 plików w `typecheck:core` nie obejmuje żadnego pliku TSX panelu, a `next build` również nigdy nie sprawdza tam typów (`next.config.mjs` ustawia `ignoreBuildErrors: true`), przez co regresje związane z osieroconymi identyfikatorami (#6625/#6909) były niewidoczne dla CI. Porównuje wyniki z zamrożoną wartością bazową liczby błędów według pliku i kodu TS (`config/quality/dashboard-typecheck-baseline.json`, ten sam wzorzec wymuszania aktualności co w `check:known-symbols`) — tylko NOWE błędy ponad liczbę bazową powodują niepowodzenie bramki; po naprawieniu istniejącego wcześniej błędu należy obniżyć wartość bazową za pomocą `--update`.                                                                                                                                                                                                                                                                                                                                                                                                         | Tak                                      |
| `check:build-typecheck`           | Sprawdzanie typów całej aplikacji produkcyjnej za pomocą `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), obejmujące obszar, którego nie pokrywają lista 27 dozwolonych plików w `typecheck:core` ani bramka panelu. Porównuje wyniki z `config/quality/build-typecheck-baseline.json`; nowa lub zwiększona liczba dla pary (plik, kod) powoduje niepowodzenie, a niższa liczba wymaga obniżenia wartości bazowej. `--update` odmawia działania, jeśli uruchomienie zawiera nową lub zwiększoną parę, chyba że przekazano `--force-regressions`, a także odmawia działania w przypadku nowo wyciszonego pliku, chyba że przekazano `--force-nocheck`, dzięki czemu rozszerzenie wartości bazowej w celu uzyskania poprawnego wyniku i przyznanie trwałego wyciszenia są dwoma odrębnymi, świadomymi działaniami. Samo `--force` jest odrzucane. Skanuje również zakres kompilacji pod kątem `@ts-nocheck`, porównując z `config/quality/ts-nocheck-baseline.json`, ponieważ plik, który go używa, nie zgłasza żadnych komunikatów diagnostycznych i w przeciwnym razie byłby niewidoczny dla każdej bramki. | Tak                                      |

#### Dwa programy sprawdzania typów udzielają różnych odpowiedzi

`typecheck:core` i `check:build-typecheck` kompilują różne programy przy użyciu różnych
opcji, a ten sam plik może nie zgłaszać błędów w jednym z nich i zawierać ich wiele w drugim.

`tsconfig.build.json` ustawia `"strict": false`, więc `noImplicitAny` jest wyłączone. Konfiguracja
podstawowa kompiluje starannie dobraną listę 27 plików z bardziej rygorystycznymi opcjami i analizuje graf importów każdego
wpisu, dlatego pliki, które nigdy nie pojawiają się w programie kompilacji, są tam mimo to
sprawdzane.

Ma to znaczenie przy ocenie, czy plik ma poprawnie określone typy: **brak komunikatów diagnostycznych
w `check:build-typecheck` nie oznacza braku błędów**. Usunięcie `@ts-nocheck` z 26
plików wykazało, że 23 z nich nie zgłaszały błędów w programie kompilacji; szesnaście z nich ujawniło około
120 błędów niejawnego typu `any` w programie rygorystycznym. Przed uznaniem pliku za poprawny należy sprawdzić oba programy.

### Zadanie: `quality-gate`

Uruchamia się po `test-coverage`. W przypadku niepowodzenia blokuje scalanie.

| Skrypt                       | Sprawdza                                                                                                                                                                                                | Blokujący                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `quality:collect`            | Generuje `quality-metrics.json` (liczba ostrzeżeń ESLint, pokrycie ze scalonego raportu fragmentów)                                                                                                     | Tak (przed mechanizmem zapadkowym) |
| `quality:ratchet`            | Żadna metryka w `quality-baseline.json` nie uległa regresji (ostrzeżenia ESLint ≤ wartość bazowa; pokrycie ≥ wartość bazowa)                                                                            | Tak                                |
| `check:duplication`          | Duplikacja kodu (jscpd@4) nie przekracza wartości bazowej w `quality-baseline.json`                                                                                                                     | Tak                                |
| `check:complexity`           | Złożoność cyklomatyczna na poziomie pliku nie przekracza limitu (podstawowe reguły ESLint `complexity` + `max-lines-per-function`)                                                                      | Tak                                |
| `check:cognitive-complexity` | Mechanizm zapadkowy złożoności poznawczej (`eslint-plugin-sonarjs`) — osobne uruchomienie ESLint; CI wykonuje oba testy scalone w pojedynczym kroku `check:complexity-ratchets`                         | Tak                                |
| `check:dead-code`            | Mechanizm zapadkowy nieużywanych eksportów / plików (knip) nie uległ regresji względem wartości bazowej                                                                                                 | Tak                                |
| `check:compression-budget`   | Budżet testu porównawczego kompresji — minimalne oszczędności tokenów dla każdego silnika nie mogą ulec regresji                                                                                        | Tak                                |
| `check:type-coverage`        | Mechanizm zapadkowy procentowego pokrycia typami (`type-coverage`) nie uległ regresji; w dużej mierze zastępuje `typecheck:noimplicit:core`                                                             | Tak                                |
| `check:codeql-ratchet`       | Liczba otwartych alertów CodeQL nie uległa regresji (odczyt przez `gh api`; łagodne pominięcie bez tokenu) — częstotliwość odświeżania i ręczne wyzwalanie: zobacz „Mechanizm zapadkowy CodeQL” poniżej | Tak                                |

### Zadanie: `quality-extended`

Całe zadanie ma charakter doradczy (`continue-on-error: true`). Mechanizmy zapadkowe oparte na npm są uruchamiane
rzeczywiście; zewnętrzne skanery są instalowane za pomocą `gh release download` i samoczynnie pomijają działanie (kod wyjścia 0),
gdy plik binarny jest nadal niedostępny.

| Skrypt                   | Sprawdza                                                                                                                                                                                                                                                                    | Blokujący                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `check:circular-deps`    | Brak zależności cyklicznych (dpdm)                                                                                                                                                                                                                                          | **Doradczy**                                                |
| `check:bundle-size`      | Rozmiar pakietu nie przekracza limitu                                                                                                                                                                                                                                       | **Doradczy**                                                |
| `check:secrets`          | Skanowanie pod kątem sekretów (gitleaks) — pomijane, jeśli brak pliku binarnego                                                                                                                                                                                             | **Doradczy**                                                |
| `check:vuln-ratchet`     | Luki w zabezpieczeniach zależności (osv-scanner) nie uległy regresji — pomijane, jeśli brak pliku binarnego                                                                                                                                                                 | **Doradczy**                                                |
| `check:workflows`        | Lintowanie przepływów pracy (actionlint + zizmor); brakujące/uszkodzone skanery, nieprawidłowe raporty lub brak bazowej wartości mechanizmu zapadkowego powodują błąd INCOMPLETE. Prawidłowe ustalenia podlegają wybranej polityce ścisłej/doradczej/mechanizmu zapadkowego | Wykonanie wymagane; mechanizm zapadkowy zizmor blokuje w CI |
| `check:openapi-breaking` | Zmiany niezgodne wstecznie w publicznym kontrakcie API (`openapi.yaml`) względem gałęzi bazowej (oasdiff) — generuje `openapiBreaking=N`; pomijane, jeśli brak oasdiff lub nie można rozpoznać specyfikacji bazowej                                                         | **Doradczy**                                                |

### Zadanie: `docs-sync-strict`

Uruchamiane przy każdym PR do `main`. W przypadku niepowodzenia blokuje scalanie.

| Skrypt                         | Weryfikuje                                                                                                                                                                                          | Blokujący                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | Metabrama uruchamiająca kolejno 6 poniższych bram podrzędnych                                                                                                                                       | Tak                         |
| ↳ `check:docs-sync`            | Spójność wersji w CHANGELOG / OpenAPI / llm.txt                                                                                                                                                     | Tak                         |
| ↳ `check:docs-counts`          | Liczby w tekście (liczba dostawców, liczba migracji itd.) mieszczą się w przedziale zapadkowym względem rzeczywistych wartości                                                                      | Tak                         |
| ↳ `check:env-doc-sync`         | Każda zmienna środowiskowa z `.env.example` jest udokumentowana w tabeli dokumentacji i odwrotnie                                                                                                   | Tak                         |
| ↳ `check:deprecated-versions`  | Brak ciągów znaków oznaczających przestarzałe wersje w dokumentacji                                                                                                                                 | Tak                         |
| ↳ `check:doc-links`            | Wewnętrzne linki markdown w dokumentacji wskazują na istniejące pliki (format `[text]`/`(path)`)                                                                                                    | Tak                         |
| ↳ `check:fabricated-docs`      | Trasy, zmienne środowiskowe, polecenia CLI, nazwy hooków i ścieżki plików przywołane w dokumentacji istnieją w bazie kodu. Twarda brama przez `--strict`; bez tej flagi niepowodzenie jest miękkie. | Tak (przez `--strict` w CI) |
| `check:cli-i18n`               | Ciągi znaków poleceń CLI są obecne we wszystkich plikach ustawień regionalnych i18n                                                                                                                 | Tak                         |
| `check:openapi-coverage`       | Specyfikacja OpenAPI obejmuje co najmniej ustalony zapadkowo minimalny poziom rzeczywistych tras                                                                                                    | Tak                         |
| `check:openapi-security-tiers` | Adnotacje poziomów zabezpieczeń w `openapi.yaml` są zgodne z klasyfikacjami w `routeGuard.ts`                                                                                                       | **Doradczy**                |
| `check:openapi-routes`         | Każda ścieżka w `openapi.yaml` odpowiada rzeczywistemu plikowi `route.ts` (ochrona przed halucynacjami)                                                                                             | Tak                         |
| `check:docs-symbols`           | Każde odwołanie `/api/...` w `docs/**/*.md` odpowiada rzeczywistemu plikowi `route.ts` (ochrona przed halucynacjami)                                                                                | Tak                         |
| `i18n translation drift`       | Nieprzetłumaczone klucze w plikach ustawień regionalnych i18n — tylko ostrzeżenie                                                                                                                   | **Doradczy**                |

Dwanaście plików SVG README w katalogu `docs/diagrams/` jest generowanych (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` generuje je wszystkie ponownie). Każdy z nich ma test jednostkowy porównujący bajty
(`tests/unit/docs/readme-*-svg.test.ts`, zadanie `test-unit`), który kończy się niepowodzeniem, gdy zatwierdzony plik jest
nieaktualny, a `check:docs-counts` odczytuje kanoniczne liczby z ich węzłów `<text>` — dlatego etap
zamiany tekstu na obrysy zachowuje każdy przekształcony ciąg znaków w pliku jako niewidoczny element `<text>`. Kontrola kanonicznych liczb w plikach SVG odczytuje pliki wymienione w
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, a także `public/images/tier-flow-dark.svg` i `tier-flow-light.svg`; deklaracje dotyczące
bezterminowej bezpłatności, wpisu katalogowego, puli cyklicznej i czynników punktacji odczytują również
`promise-pillars.svg`, `free-tier-budget.svg` i `strategies-grid.svg`. `free-tier-budget.svg`
pobiera swoje wartości z aktywnego modułu ładującego katalog, więc zmiana `FREE_MODEL_BUDGETS` albo
nazwy wyświetlanej dostawcy powoduje, że CI pozostaje czerwone do czasu ponownego wygenerowania tego pliku.

### Zadanie: `i18n-ui-coverage`

| Skrypt                               | Weryfikuje                                                                                                                                                                                                                                          | Blokujący    |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (wbudowany) | Pokrycie kluczy i18n interfejsu użytkownika wynosi ≥ 65%                                                                                                                                                                                            | Tak          |
| `check-ui-value-drift` (wbudowany)   | Przepisana angielska **wartość** nie pozostawia żadnego nieaktualnego tłumaczenia                                                                                                                                                                   | Tak          |
| `check-new-key-coverage` (wbudowany) | **Nowy** angielski klucz jest przetłumaczony w każdym języku — znacznik `__MISSING__:` jest odrzucany                                                                                                                                               | Tak          |
| `check-translation-ratio`            | Współczynnik rzeczywistych tłumaczeń dla każdego języka (wartości identyczne z angielskimi / symbole zastępcze / brakujące liście spoza listy dozwolonych wyjątków) nie może przekraczać `config/quality/i18n-translation-baseline.json` + margines | **Doradczy** |

Wymaga `fetch-depth: 0` — brama wykrywająca rozbieżności wartości porównuje `en.json` z bazą scalenia.

#### `check-ui-value-drift` — brama nieaktualnych tłumaczeń

Łapie tę regresję i18n, której inne bramki strukturalnie nie widzą: angielska wartość jest przepisana, a tłumaczenia wywodzące się z _poprzedniego_ angielskiego pozostają w tyle, więc użytkownicy nieanglojęzyczni nadal czytają pewnie sformułowaną, teraz błędną kopię.

To zostało wysłane naprawdę. `oauthModal.googleOAuthWarning` zostało przepisane po wylądowaniu pomocnika logowania Antigravity (#5203);** 39 z 43 lokalizacji** zachował tekst informujący operatorów, aby „skopiowali pełny URL i wkleili go poniżej” — przepływ, którego nie można ukończyć dla tego dostawcy. Pozostało to niezauważone aż do #8463 ponieważ:

- `sync-ui-keys` uzupełnia tylko klucze, które są** nieobecny** , nigdy takie, które są** nieświeży** ;
- `check-ui-keys-coverage` zlicza klucz _obecność_, więc nieaktualne tłumaczenie jest uznawane za uwzględnione;
- `check-translation-drift` śledzi dokumentację `docs/i18n/<locale>/**.md` odzwierciedlającą — nigdy nie czyta `src/i18n/messages/*.json`. Blokowanie w zadaniu `docs-sync-strict` od ponownej synchronizacji 2026-09: edytuj podstawowy dokument → `npm run i18n:run -- --files=<doc>` (na poziomie sekcji, tanio).

**Świadomość różnic, a nie wsparcie bazowe.** Porównuje `en.json` w bazie scalania z drzewem roboczym; dla każdego klucza, którego angielska wartość uległa zmianie, każde ustawienie regionalne, w którym nadal znajduje się nietknięte tłumaczenie, jest nieaktualne. To celowo** zamraża istniejące zadłużenie** — a diff nie może ujawnić, z jakiego staroangielskiego pochodzi dane tłumaczenie, więc bramka ocenia tylko to, czego dotyka bieżąca zmiana. Alternatywa (linia bazowa skrótu dla każdego klucza) kosztowałaby wygenerowany plik ~ 600 KB, 3 × największej istniejącej linii bazowej, zmieniającej się przy każdym i18n PR.

Zaspokoić to można na dwa sposoby:

1. zaktualizować tłumaczenia, których to dotyczy, lub
2. ustaw je na `__MISSING__:<new english>` — środowisko wykonawcze obsługuje następnie poprawiony język angielski (`src/i18n/request.ts::deepMergeFallback`, #7258) i kluczowe kolejki do tłumaczenia.

Jeśli ciąg znaków** oznaczający** zmienione, wolę** zmiana nazwy klucza** : nowy klucz nie może odziedziczyć nieaktualnego tłumaczenia. To jest wzór, którego użyto #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Wychodzi 0 z `SKIP reason=base-unresolved` gdy nie można odczytać katalogu podstawowego (płytki klon bez podstawowego ref), kopiując `check-openapi-breaking`.

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

### Praca: `test-vitest`

Biegnie za `build`. Bloki łączą się w przypadku niepowodzenia.

| Apartament       | Sprawdza                                                               | Bloking                                                                                                                         |
| ---------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | serwer MCP (110 narzędzi), autoCombo, pamięć podręczna — vitest runner | Tak                                                                                                                             |
| `test:vitest:ui` | testy komponentów UI — vitest runner                                   | **Bloking** — istniejące wcześniej awarie są wyraźnie wykluczone w `vitest.config.ts`; nowe niepowodzenia nie spełniają zadania |

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
- **doradcze** — globalna suma względem zamrożonego poziomu bazowego. Odziedziczone odchylenie nigdy nie powoduje
  niepowodzenia niewinnego PR; odchylenie jest ponownie zamrażane podczas uzgadniania wydania i monitorowane przez zadanie sprawdzające zapas.

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

## Zasady listy dozwolonych elementów

Każda bramka, która nie może zakończyć się niepowodzeniem z powodu wcześniej istniejących naruszeń, korzysta z zamrożonej listy dozwolonych elementów
(np. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Obowiązuje następująca zasada:

**Napraw główną przyczynę; używaj listy dozwolonych elementów tylko wtedy, gdy naruszenie istniało wcześniej i
nie można go naprawić w tym samym PR.**

Podczas dodawania wpisu do listy dozwolonych elementów:

1. Dołącz komentarz z uzasadnieniem.
2. Podaj odwołanie do zgłoszenia śledzącego (np. `// #3498 — Funkcja z fazy 2, jeszcze niezaimplementowana`).
3. Usuń wpis w tym samym PR, który naprawia naruszenie — nieaktualny wpis, który nie
   wycisza już aktywnego naruszenia, sam jest defektem (mechanizm wykrywania nieaktualnych reguł 6A.3
   spowoduje niepowodzenie bramki z powodu osieroconego wpisu na liście dozwolonych elementów, gdy zostanie zaimplementowany).

**Nie** dodawaj wpisów do listy dozwolonych elementów po to, aby testy przechodziły szybciej. Zielona bramka przy rosnącej
liście dozwolonych elementów daje fałszywe poczucie jakości.

### Gdy bramka nie przechodzi dla Twojego PR

1. **Uważnie przeczytaj dane wyjściowe bramki** — wskazują one dokładnie, który plik lub symbol naruszył
   regułę.
2. **Napraw naruszenie** — większość bramek to deterministyczne kontrole systemu plików, które przechodzą, gdy tylko
   kod jest poprawny.
3. **Jeśli naruszenie istniało wcześniej** (tj. nie zostało wprowadzone przez Ciebie, ale bramka zaczęła je teraz
   obejmować): dodaj wpis do listy dozwolonych elementów wraz z komentarzem uzasadniającym i odwołaniem do zgłoszenia śledzącego.
4. **Jeśli bramka działa jako mechanizm zapadkowy** (pokrycie, ostrzeżenia ESLint, duplikacja, złożoność):
   Twoja zmiana pogorszyła wskaźnik. Napraw problem będący jego przyczyną albo (w rzadkich przypadkach) uruchom
   `npm run quality:ratchet -- --update`, jeśli zmiana jest celowa, a pogorszenie
   wskaźnika jest akceptowalne — wyjaśnij jednak przyczynę w opisie PR.
5. **Bramki doradcze** (`continue-on-error: true`) mają charakter informacyjny — nie blokują
   scalania, ale pojawiają się w podsumowaniu CI. Mimo to je napraw.

---

## Dodawanie nowej bramki

1. Utwórz `scripts/check/check-<name>.mjs` (lub `.ts`). Bramki zasad zwracają kod wyjścia 0/1.
   Bramki typu zapadkowego zapisują wskaźnik w `quality-metrics.json` za pośrednictwem `collect-metrics.mjs`.
2. Dodaj `"check:<name>": "node scripts/check/check-<name>.mjs"` do `package.json`.
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

## Rejestr racjonalizacji (przegląd ROI — etap 9, fala 3)

Ten wykaz uzgodniono z `ci.yml` 2026-06-17 (w poprzedniej wersji pominięto
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Przegląd ROI uzgodnionego zestawu
wskazał następujących kandydatów do racjonalizacji. **Scalenia są mechanicznymi zmianami
CI; przełączenia/usunięcia to decyzje dotyczące zasad, zastrzeżone dla operatora.** Żadna
z poniższych zmian nie została jeszcze zastosowana.

**Powyżej nie udokumentowano również** (tryb doradczy, słaby sygnał): zadania `docs-lint`
(markdownlint + Vale, całe zadanie z `continue-on-error`) oraz samodzielnych przepływów pracy skanerów
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. Wartość `semgrepFindings: 0` znajduje się w
`quality-baseline.json`, ale nie jest podłączona do blokującej zapadki w `ci.yml` — ta metryka
jest obecnie osierocona.

### Scalanie / deduplikacja (mechaniczne, niższe ryzyko)

Każdego kandydata zweryfikowano względem bieżącego stanu bramek 2026-06-17 (ufaj, ale sprawdzaj);
okazało się, że kilka „oczywistych” scaleń ukrywa dług i **nie** stanowi bezproblemowych zamienników.

- **`check:docs-sync` uruchamia się dwukrotnie** — samodzielnie w zadaniu `lint` oraz ponownie wewnątrz `check:docs-all` (`docs-sync-strict`) i w hooku pre-commit husky. ✅ **GOTOWE** — samodzielne wywołanie w `lint` zostało usunięte.
- **Skanowanie CVE** — ❌ **NIE jest to bezproblemowe scalenie.** `audit:deps` kończy się twardym błędem przy dowolnej luce CVE o wysokiej/krytycznej wadze; `check:vuln-ratchet` (osv) kończy się błędem tylko przy _regresji_ względem wartości bazowej (obecnie 1 MODERATE). Inna semantyka — usunięcie `audit:deps` oznaczałoby utratę bezwzględnej bramki dla luk o wysokiej/krytycznej wadze. Należy zachować oba.
- **Wykrywanie cykli** — ✅ **GOTOWE** (#15159 G-01/G-02). Poprzedni tekst określał `check:cycles` jako „zieloną, starannie dobraną” bramkę i uzasadniał utrzymanie jej w trybie blokującym tym, że `check:circular-deps` (dpdm) zgłaszało 91 cykli. Ten zielony wynik był **fałszywie pozytywny**: `check:cycles` skanował 5 podkatalogów (450 plików), dopasowywał tylko statyczne `import|export … from` i odrzucał każdy specyfikator `@/` oraz `@omniroute/open-sse/`, przez co nie mógł wykryć cykli dynamicznego importu i aliasów, które dominowały w repozytorium. Naprawiono: bramka przeszukuje teraz `src` + `open-sse` (5023 pliki), zbiera specyfikatory z AST TypeScriptu (dzięki czemu `import("…")` jest uwzględniany, a `typeof import("…")` w pozycji typu — nie) i rozwiązuje `paths` z tsconfig. Wykrywa **14** cykli, a nie 0. Ponieważ 14 istniejących wcześniej cykli nie można naprawić w PR-ze dotyczącym bramki, `check:cycles` działa teraz jako **zapadka** (`--ratchet`, limit `metrics.cycles.value = 14` w `quality-baseline.json`, `direction: down`) — blokuje każdą _regresję_, a liczba może wyłącznie maleć. CI uruchamia `npm run check:cycles:ratchet`. Redukcja długu odbywa się w ramach **A-01**. `check:circular-deps` (dpdm) pozostaje doradczą, szerszą drugą opinią.
- **Złożoność** — ✅ **GOTOWE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jedno przejście ESLint, zliczanie według ruleId, dzięki czemu wartości bazowe dla złożoności cyklomatycznej + maksymalnej liczby wierszy oraz złożoności poznawczej pozostają niezależne; poszczególne `check:complexity` / `check:cognitive-complexity` pozostają dostępne dla lokalnego `--update`.
- **Ochrona `/api` przed halucynacjami** — ✅ **GOTOWE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jeden wykaz FS katalogu `src/app/api`; openapi-routes + docs-symbols nadal raportują niezależnie; poszczególne polecenia pozostają dostępne do uruchamiania lokalnego.
- **`check:node-runtime` uruchamia się w 11 zadaniach** — ⚠️ **niski ROI.** Każde korzysta z osobnego runnera, a sprawdzenie trwa <1 s; łączna oszczędność wyniosłaby ~10 s, kosztem utraty taniego zabezpieczenia dla każdego zadania. Nie warto wprowadzać takiej zmiany.
- **`typecheck:noimplicit:core` w zadaniu lint CI** — ✅ **usunięto z zadania lint** (wcześniej działało doradczo z `continue-on-error`); blokującą powierzchnię typów zapewniają `typecheck:core` + `check:type-coverage`. Skrypt lokalny zachowano.

### Przełączenie / decyzja (zasady operatora)

- `check:openapi-security-tiers` (doradcze) — ❌ **NIE można go bezproblemowo przełączyć.** Kończy działanie z kodem 0, ale ostrzega, że w kilku trasach `traffic-inspector` w ramach `LOCAL_ONLY_API_PREFIXES` brakuje adnotacji `x-loopback-only: true`. Wymuszenie tej kontroli wymaga najpierw dodania tych adnotacji do `openapi.yaml`.
- `typecheck:noimplicit:core` (doradcze) — w dużej mierze zastąpione przez blokującą zapadkę `check:type-coverage`. Należy przełączyć je na zapadkę albo usunąć nadmiarowe drugie przejście `tsc`.
- `test:vitest:ui` (obecnie **blokujące**) — istniejące wcześniej błędy są jawnie wykluczone w `vitest.config.ts` za pomocą komentarzy śledzących `// #8618`; nowe błędy powodują niepowodzenie zadania.
- `check:secrets` (gitleaks, blokująca zapadka zamrożona na 3 udokumentowanych wynikach fałszywie pozytywnych) — należy dodać te 3 przypadki do listy dozwolonych, aby osiągnąć 0, albo zdegradować kontrolę do trybu doradczego. Nakłada się na natywne skanowanie sekretów GitHub + `check:public-creds`.
- `check:pr-evidence` (blokujące, przeszukuje tekst opisu PR) — wysokie ryzyko wyników fałszywie pozytywnych; usunięcie osłabi egzekwowanie Hard Rule #18, więc jest to rzeczywista decyzja dotycząca zasad.
- `semgrep` (samodzielne, doradcze) — nakłada się na CodeQL w zakresie rodzin OWASP; należy podłączyć jego wartość bazową do zapadki albo go usunąć.

---

## Powiązana dokumentacja

- Łańcuch dostaw (pochodzenie, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — bramka zgodności zestawów kluczy

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, zadanie `i18n-ui-coverage`).
Porównuje zestaw kluczy-liści każdego pliku `src/i18n/messages/<locale>.json` z `en.json` i zgłasza
błąd w przypadku każdego brakującego lub nadmiarowego liścia, niezależnie od tego, kiedy klucz został dodany. Symbole zastępcze
`__MISSING__:` liczą się jako obecne (ich zawartość należy do zakresu odpowiedzialności bramki proporcji). Jest to bezwzględne uzupełnienie
dwóch bramek opartych na różnicach/procentach: `check-ui-keys-coverage` wymusza próg 80% dla każdej
lokalizacji (43 brakujące klucze spośród ~13 000 nadal daje wynik 99,7%), a `check-new-key-coverage` ocenia
wyłącznie klucze dodane przez PR do `en.json`. Partia lokalizacji jest generowana na podstawie `en.json` z dnia
utworzenia jej gałęzi i tłumaczona przez wiele dni, podczas gdy baza nadal otrzymuje nowe klucze; PR z partią sam
nie dodaje żadnego klucza, dlatego obie siostrzane bramki milczały, gdy partia 1 (#13044) została scalona z niedoborem 43 kluczy w dziewięciu
lokalizacjach, a partia 2 (#13660) z niedoborem 10 kluczy w ośmiu (2026-09-15). Błąd bramki można naprawić za pomocą
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; liść `extra`
oznacza, że usunięto go ze źródła — należy usunąć go również z lokalizacji. `--warn` raportuje bez zgłaszania błędu.
`--catalog=cli` wykonuje to samo porównanie dla `bin/cli/locales` (`npm run i18n:check-keys:cli`);
oba kroki znajdują się w zadaniu `i18n-ui-coverage`.

#### `check-new-key-coverage` — bramka i18n dla nowych kluczy

Siostrzana bramka `check-ui-value-drift`. Tamta wykrywa angielską wartość, która została **przepisana**,
podczas gdy jej tłumaczenia pozostawiono bez zmian; ta wykrywa angielski klucz, który został **dodany**,
ale nigdy nie trafił do niektórych lokalizacji.

`check-ui-keys-coverage` nie potrafi wykryć tej klasy problemów: wymusza próg procentowy dla każdej lokalizacji, a
jedenaście brakujących kluczy spośród ~13 000 pozostawia pokrycie na poziomie 99,9%. Procent dla danego języka nie może
wyrazić stwierdzenia „ta funkcja została wydana bez tłumaczenia” — cała funkcja może trafić do nowej lokalizacji bez żadnego
tekstu i nigdy nie zmienić tej wartości.

Incydent, który koduje ta bramka: faza 3 Orchestration Canvas przetłumaczyła jedenaście swoich kluczy na
42 lokalizacje, które istniały w tamtym czasie. Kilka godzin później partia języków UE (#13044) zwiększyła liczbę lokalizacji
w repozytorium do 51, a dziewięć nowych (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) nigdy
ich nie otrzymało. `deepMergeFallback` zastępuje brakujący klucz tekstem angielskim, więc efektem był
nieprzetłumaczony interfejs, a nie pusty interfejs — rzeczywisty problem, z założenia niewidoczny.

Podobnie jak siostrzana bramka jest ona **świadoma różnic** i porównuje angielską wersję w bazie scalania z drzewem
roboczym, dzięki czemu istniejące wcześniej braki pozostają zamrożone, a włączenie bramki nie wymagało migracji.

**Znacznik `__MISSING__:<english>` nie spełnia wymagań tej bramki (od 2026-09-17).** Wcześniej stanowił on
udokumentowany sposób odroczenia — środowisko wykonawcze używa prawidłowego tekstu angielskiego jako wartości zastępczej — dopóki osiem PR-ów z funkcjami z
2026-09-16 nie dodało 61 kluczy i nie umieściło znacznika we wszystkich 65 lokalizacjach zamiast ich przetłumaczenia: ta
bramka zaakceptowała każdy z nich, nic nie blokowało PR-ów, a blokująca bramka proporcji rzeczywistych tłumaczeń
zaczęła następnie zgłaszać błąd na końcu gałęzi wydania dla wszystkich (pt-BR 3,2% > 2,5% + 0,5). Znacznik jest teraz traktowany
jak brakujące tłumaczenie. Błąd bramki można naprawić za pomocą
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` albo
dla wszystkich lokalizacji równolegle za pomocą `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
bezpieczny po odłączeniu, odmawia uruchomienia bez zmiennych środowiskowych `OMNIROUTE_TRANSLATION_*`). Klucz, który musi pozostać
w języku angielskim (przypięta nazwa produktu/silnika/flagi), powinien znaleźć się w `scripts/i18n/untranslatable-keys.json`,
nigdy za znacznikiem. `vi` całkowicie zabrania znaczników (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — bramka odłożonych testów

Plik znajdujący się na liście `exclude` w `vitest.config.ts` jest testem, który nie jest uruchamiany, a dla osoby
przeglądającej drzewo wygląda jak element pokrycia. Za komentarzem
`// #8618 — istniejący wcześniej błąd; usuń to wykluczenie po jego naprawieniu` zgromadziły się sześćdziesiąt dwa pliki. Zgłoszenie #8618 zamknięto
2026-08-11, podczas gdy śledzona przez nie lista rozrosła się z 45 do 62 wpisów, z których każdy nowy dziedziczył komentarz
wskazujący na nieaktywne zgłoszenie. Gdy w końcu sprawdzono listę plik po pliku (#13204), **51 z 62
przechodziło pomyślnie względem bieżącego drzewa bez żadnych zmian w kodzie źródłowym**.

Bramka wymaga, aby każde wykluczenie wskazujące na rzeczywisty plik (a) wymieniało zgłoszenie śledzące oraz
(b) znajdowało się w `config/quality/vitest-exclusions.json` wraz ze zmierzonym stanem, dzięki czemu dodanie takiego wpisu jest
różnicą podlegającą przeglądowi w dedykowanym pliku, a nie kolejnym wierszem w tablicy zawierającej 60 wpisów. Bramka celowo
nie uruchamia ponownie wykluczonych testów — kosztuje to ~10 minut i należy do zadania okresowego;
inwentarz rejestruje datę ostatniego pomiaru każdego z nich.
