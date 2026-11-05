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

## Profile inwentaryzacji i wykonania bramy

### Przyjęcie kandydata

Przepływy pracy CI i Quality Gates wydają stabilny werdykt: `Gate / CI` i `Gate / Quality`. Ich wersjonowane zasady przyjmowania wyliczają każde stanowisko wyższego szczebla jako wymagane lub doradcze. Odpowiednie wymagane zadanie musi zakończyć się pomyślnie: brakujące, anulowane, pominięte, oczekujące i nieznane wyniki nie mogą ustalić PASS. Ważna klasyfikacja obejmująca tylko dokumenty lub tylko katalog może spowodować, że pas kodowy nie będzie miał zastosowania; projekt PR nie jest zaakceptowanym kandydatem. Etykieta `hotfix` nie zrzeka się dowodów.

Obydwa przepływy pracy obejmują PRs do gałęzi main/release, wypychanie do `main`, ręczne wysyłanie i zdarzenia łączenia grup. Wypychanie, wysyłanie i łączenie grup uruchamiają pełny wybór. Naciski na `release/**` nie uruchamiają ich (2026-10-18): każda zmiana uruchomiła już macierz na swoim PR, a połączona kombinacja jest zadaniem Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forki i grupy scalone wykorzystują hostowane moduły uruchamiające do zadań, które w innym przypadku wybierałyby samodzielnie hostowane moduły uruchamiające; przed wdrożeniem należy sprawdzić wystarczającą pojemność hosta.

Zwykły PR uruchamia szybką selekcję. Ścieżki `full-code` i `full-code-e2e` polityki dostępu (E2E, integracja, artefakt pakietu, Electron smoke, Bun SQLite, klienci ekosystemu i protokołu) działają tylko w wersji roboczej kolejki Mergify lub przy pełnym uruchomieniu: `gh workflow run ci.yml --ref <branch>`.

### Połącz kolejkę

Etykieta `queue` wysyła PR do kolejki Mergify (`.mergify.yml`). Mergify otwiera wersję roboczą PR w gałęzi `mergify/merge-queue/`, CI uruchamia tam pełny wybór, a oryginalny PR łączy się, gdy przechodzą `Gate / CI`, `Gate / Quality` i `Merge integrity (changelog + generated skills)`.

Mergify zapisuje podsumowanie swojej kolejki w opisie wersji roboczej, a inne aplikacje również mogą je edytować. Zdarzenie `pull_request` `edited` w takiej wersji roboczej przyjmuje własną grupę współbieżności (`-queue-edit-<run_id>`), więc nie może anulować rzeczywistego przebiegu wersji roboczej i pomija bramkę i macierz. Tylko `Merge integrity` nadal działa. Pominięte zadanie bramki nosi inną nazwę czeku, ponieważ Mergify odczytuje pominięte `Gate / CI` jako czek zakończony niepowodzeniem i usuwa z PR.

Po usunięciu z kolejki push nie zawsze powoduje ponowne kolejkowanie PR. Skomentuj to `@mergifyio queue`.

Każdy paragon JSON identyfikuje wyewidencjonowane SHA, przebieg przepływu pracy i próbę. CLI odrzuca niedopasowanie checkout/event SHA. Testy przepływu pracy wiążą członkostwo w zasadach z listą `needs` zadania werdyktowego, dzięki czemu nowy lub usunięty pas nie może po cichu zniknąć. Potwierdzenia obejmują własny przepływ pracy, a nie publikację, wdrożenie lub elementy wewnętrzne istniejącego skanera doradczego. Aktywacja obu nazw czeków w regułach oddziałów jest osobną zmianą administracyjną; dodanie tych zadań samo w sobie nie chroni gałęzi.

### Inwentaryzacja skanowania statycznego

Wersjonowany inwentarz npm-alias i członkostwo w trybie static-scan są dostępne w `config/quality/gate-manifest.json`. Uruchom `npm run check:gate-manifest`, aby sprawdzić nazwy skryptów i dokładne polecenia względem `package.json`; dodawanie, usuwanie i dryf poleceń kończą się niepowodzeniem zarówno w przypadku lokalnego przechwytywania, jak i zadań klasyfikacji zmian w CI. Alias nie jest zadaniem przepływu pracy, instancją macierzy ani przypadkiem testowym: liczby te nie mogą być przedstawiane jako zamienne.

Użyj `npm run quality:scan -- --list` lub `npm run quality:scan:fast -- --list`, aby sprawdzić wybrane aliasy bez ich wykonywania. Moduł uruchamiający wywołuje punkt wejściowy npm, więc jego czas działania (w tym Bun jeśli jest skonfigurowany) zostaje zachowany. Manifest rejestruje aliasy poza tymi profilami, które są wywoływane oddzielnie, a polecenia konserwacji są zabronione w profilach skanowania tylko do odczytu.

Profile te obejmują tylko skanowanie statyczne. Nie poświadczają testów produktów, zakresu, opakowania, kontroli zewnętrznych ani pełnej akceptacji kandydata na wydanie. Przyjmowanie przepływu pracy wykorzystuje połączone `config/quality/admission-policy.json` i `scripts/quality/admission-verdict.mjs`. Profile obserwatorów wydania pozostają oddzielne; niezależnie sprawdzają obowiązujące czeki i pokwitowania. Poniższy spis prozy jest odniesieniem, a nie dowodem na to, że brama rzeczywiście działała.

Skrypty działają w ramach `scripts/check/` (bramy polityk) i `scripts/quality/` (silnik zapadkowy). Źródłem prawdy CI jest `.github/workflows/ci.yml`.

### Zwolnij szybką ścieżkę PR (`quality.yml`)

`.github/workflows/quality.yml` uzupełnia CI na main/release PRs, wypycha do `main`, wysyła i łączy grupy. PRs używa szybkich kontroli filtrowanych według ścieżki. Usunięto trwale wyłączoną zduplikowaną kompilację; prawdziwe czeki build/package/boot pozostają w CI. Zestaw jednostek i vitest działają tylko w CI (`Unit Tests (N/8)` i `Vitest`).

| Stanowisko                                       | Zakres                                                                                                                                                      | Bloking                  |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API dokumenty referencyjne i dokumenty-wszystko                                                                                              | Tak                      |
| `Fast Quality Gates`                             | Kod PRs; kontrole statyczne, sprawdzanie typu, sprawdzanie typu dashboardu, testy jednostkowe, na które ma to wpływ, zapomniane testy rodzeństwa (doradcze) |
| `No new ESLint warnings`                         | Kod PRs; Osłona chroniąca przed kłaczkami                                                                                                                   | Tak, łącznie z widelcami |
| `Merge integrity (changelog + generated skills)` | Bez przeciągu PRs; dziennik zmian i wygenerowana synchronizacja umiejętności                                                                                | Tak, łącznie z widelcami |

#### Zapomniany raport z testów rodzeństwa

`npm run check:forgotten-sibling-tests` działa jako krok doradczy `Fast Quality Gates` i ponownie wykorzystuje moduł rozpoznawania importu za mapą wpływu testu. Dla każdego zmienionego modułu produkcyjnego raportuje deterministyczne łańcuchy `changed module/symbol -> static consumer -> candidate sibling test`, gdy w różnicowym żądaniu ściągnięcia nie ma testu kandydującego. Podsumowanie Markdown i wynik JSON są zachowywane jako artefakt przepływu pracy `forgotten-sibling-tests` do kalibracji przed jakimkolwiek wdrożeniem blokującym.

Reeksport beczek i import dynamiczny służą wyłącznie do diagnostyki rozdzielczości; nigdy nie powodują ustalenia blokującego. Recenzowane wyjątki żyją w `config/quality/forgotten-sibling-allowlist.json`. Każdy wpis musi zawierać nazwę testu konsumenta i kandydata, podać konkretne uzasadnienie i powiązać problem GitHub lub żądanie ściągnięcia. Źle sformułowane wpisy nie są zamykane. Wyjątki nie mogą pomijać usuniętego testu kandydata ani różnicy, która dodaje `.skip`/`.todo`; osłabienie asercji i inne maskowanie pozostają własnością niezależnie blokującej bramki `check:test-masking`.

### Praca: `lint`

Działa na każdym PR do `main`. Bloki łączą się w przypadku niepowodzenia.

| Skrypt (`npm run ...`)            | Sprawdza                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Bloking                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Wersja Node.js mieści się w obsługiwanym zakresie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Tak                                      |
| `check:cycles`                    | Import cykliczny we wszystkich `src/` + `open-sse/` (oparty na AST, rozwiązany tsconfig `paths` ). Bare wychodzi z 1 za każdym razem, gdy istnieje jakikolwiek cykl (zamknięty w trybie awaryjnym od #15281) i wyświetla listę SCCs. `check:cycles:ratchet` (co działa CI ) blokuje się, gdy liczba przekracza pułap `metrics.cycles` w `quality-baseline.json` — obecnie 14, `direction: down`, więc może tylko spaść (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Tak (zapadkowy)                          |
| `check:boundary`                  | sprzęganie `open-sse → src` : unikalny import plików do plików z silnika do aplikacji (`scripts/quality/measure-boundary.mjs`; lista brzegowa to zaległości w zakresie napraw core/module-split w wersji 4). Bare raport doradczy = (taki sam jak `quality:boundary`). `check:boundary:ratchet` (co działa CI, także w pętli zapadkowej szybkich bramek `quality.yml` ) blokuje, gdy liczba przekracza pułap `metrics.boundaryOpenSseToSrc` w `quality-baseline.json` — wystawiona na zmierzonym 771, `direction: down`; `--update` tylko go obniża; względem podstawy na PRs (`--base-ref`, patrz poniżej)                                                                                                                                                                                                                                                                                                                                                                                                                            | Tak (zapadkowy)                          |
| `check:route-validation:t06`      | schematy Zod obecne na wszystkich trasach (polityka poziomu 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Tak                                      |
| `check:any-budget:t11`            | liczba `@ts-expect-error // any` nie przekracza budżetu (catraca poziomu 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Tak                                      |
| `check:provider-consistency`      | Każdy dostawca w `providers.ts` ma pasujący wpis w `providerRegistry.ts` (i odwrotnie, na liście dozwolonych)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Tak                                      |
| `check:model-lifecycle`           | Trzy ręcznie utrzymywane tablice routingu pozostają spójne z migawką cyklu życia (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nie otrzymuje wycofanego identyfikatora, który `REGISTRY` może trasować; każdy cel `BUILT_IN_ALIASES` jest obecny w `REGISTRY` i nie ma go w migawce wycofanego identyfikatora; każdy emerytowany identyfikator nadal w `REGISTRY` jest przekazywany lub wymieniony w `allowedRetiredInCatalog`; i żadne źródło ani cel `DEFAULT_DEGRADATION_MAP` nie wydaje się być wycofane w tej migawce. Nie oznacza to, że model jest obecnie obsługiwany przez źródło na żywo. Offline — porównuje się z `config/quality/model-lifecycle.json`, odświeżanym ręcznie za pomocą `npm run quality:refresh-model-lifecycle` (sieć; nie podłączona do CI). `allowedRetiredInCatalog` to grzechotka wypalająca: dodaj wpis tylko z problemem śledzenia.                                                                                                                                                                  | Tak                                      |
| `check:fetch-targets`             | Każde `fetch("/api/...")` w `src/` po stronie klienta jest przekształcane w prawdziwe `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Tak                                      |
| `check:deps`                      | Wszystkie poziomy `npm install` -able w każdym `package.json` w repozytorium są w `dependency-allowlist.json`; nowe, nieprzypięte lub niechlujnie oznaczone pakiety                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Tak                                      |
| `audit:deps`                      | `npm audit` (korzeń + elektron) — brak porad high/critical (nakłada się na osv `check:vuln-ratchet`; patrz Rejestr racjonalizacji)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Tak                                      |
| `check:lockfile`                  | `package-lock.json` integralność — rejestr https, skróty integralności, brak przesłonięć hosta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Tak                                      |
| `check:licenses`                  | lista dozwolonych licencji SPDX dla zależności produkcyjnych                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Tak                                      |
| `check:tracked-artifacts`         | Brak artefaktów kompilacji/zatwierdzonych dowiązań symbolicznych `node_modules` (działa również w husky przed zatwierdzeniem; pre-push jest celowo lekki — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Tak                                      |
| `check:ai-attribution`            | Brak zwiastuna AI/bot `Co-Authored-By` lub stopki generowania AI w PR, tytule lub treści — Twarda reguła #16 (w pętli szybkich bramek `quality.yml` dla PR→ `release/**` — odczytuje ładunek zdarzenia, no-op off PRs — i krok tylko PR w `ci.yml` lint dla PR→ `main`; także hak husky `commit-msg` ; współautorzy ludzcy dozwoleni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | Każde wykluczenie Vitest oznacza problem ze śledzeniem i pojawia się w `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Tak                                      |
| `check:file-size`                 | Pliki źródłowe (`.ts`/`.tsx` w `src/`, `open-sse/`, `electron/`, `bin/`) pozostają w `cap`, a pliki testowe (`*.test.ts(x)`) w `testCap`; pliki zamrożone w `file-size-baseline.json` (`frozen` / `testFrozen`) nie mogą przekraczać zapisanego rozmiaru                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Tak                                      |
| `check:error-helper`              | Odpowiedzi na błędy w executors/handlers używają `buildErrorBody()` / `sanitizeErrorMessage()` (twarda reguła #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Tak                                      |
| `check:migration-numbering`       | Pliki migracyjne SQL są numerowane sekwencyjnie, bez przerw i duplikatów                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Tak                                      |
| `check:public-creds`              | Brak dosłownych kluczy OAuth `client_id`/`client_secret` lub Firebase Web poza `publicCreds.ts` (twarda reguła #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Tak                                      |
| `check:db-rules`                  | Brak surowego SQL poza modułami `src/lib/db/` ; brak importu beczek z `localDb.ts` (Twarde zasady #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Tak                                      |
| `check:known-symbols`             | Wykonawcy dostawcy, strategie routingu i tłumacze zarejestrowani w ich tabelach wysyłkowych dopasowują pliki na dysku — bez osieroconych lub niezadeklarowanych symboli                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Tak                                      |
| `check:route-guard-membership`    | Każda trasa, która powoduje utworzenie procesu potomnego, jest klasyfikowana przez `isLocalOnlyPath()` (Twarde reguły #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Tak                                      |
| `check:test-discovery`            | Każdy plik `*.test.ts` / `*.spec.ts` w repozytorium jest zbierany przez co najmniej jednego uruchamiającego test (zapadka: lista sierot w `test-discovery-baseline.json` może się tylko zmniejszać)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Tak                                      |
| `check:test-tla-order`            | Żaden plik `node:test` w obszarze `tests/unit` nie rejestruje testu, trafia do najwyższego poziomu `await`, a następnie rejestruje więcej (#18045; ratchet: `test-tla-order-allowlist.json` może się tylko zmniejszać)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Tak                                      |
| `check:agent-skills-sync`         | Wygenerowane artefakty umiejętności agentów odpowiadają ich katalogowi źródłowemu (bez dryftu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:provider-asset-provenance` | Dostawca logos/assets posiada zarejestrowany wpis pochodzenia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | Pliki konfiguracyjne JSON analizują i spełniają reguły repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | Kompilacja TypeScript bez błędów (tylko ostrzeżenia doradcze)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Tak                                      |
| `typecheck:noimplicit:core`       | Ścisłe `noImplicitAny` — wybiegające w przyszłość; wiele istniejących wcześniej witryn połączeń nadal wymaga adnotacji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **Doradczy** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograniczony do `src/app/(dashboard)/**` (#7033) — 27-plikowa lista dozwolonych `typecheck:core` nie zawiera żadnego panelu TSX, a `next build` nigdy jej nie sprawdza (`next.config.mjs` ustawia `ignoreBuildErrors: true`), więc regresje osieroconych identyfikatorów (#6625/#6909) były niewidoczne dla CI. Różnice względem zamrożonej linii bazowej per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, ten sam wzorzec egzekwowania nieaktualnych co `check:known-symbols`) — Tylko błędy NEW wykraczające poza liczbę bazową nie spełniają bramki; zmniejszaj za pomocą `--update` gdy wcześniej istniejący błąd zostanie naprawiony.                                                                                                                                                                                                                                                                                                                                                               | Tak                                      |
| `check:build-typecheck`           | Kontrola typu produkcji całej aplikacji na `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), 27-plikowa lista dozwolonych powierzchni `typecheck:core` i brama pulpitu nawigacyjnego nie obejmują. Różni się od `config/quality/build-typecheck-baseline.json`; nowa lub zwiększona liczba na (plik, kod) kończy się niepowodzeniem, niższa liczba wymaga zapadnięcia. `--update` odmawia, gdy przebieg zawiera nową lub podniesioną parę, chyba że `--force-regressions` zostanie przekazane, i odrzuca nowo wyciszony plik, chyba że zostanie przekazany `--force-nocheck`, więc poszerzenie linii bazowej w celu uzyskania zielonego koloru i przyznanie trwałego wyciszenia to dwa odrębne, celowe działania. Goły `--force` jest odrzucany. Skanuje również zakres kompilacji pod kątem `@ts-nocheck` względem `config/quality/ts-nocheck-baseline.json`, ponieważ plik korzystający z niego nie zgłasza żadnej diagnostyki i w przeciwnym razie byłby niewidoczny dla każdej bramy. | Tak                                      |

#### Dwa programy sprawdzające typ odpowiadają inaczej

`typecheck:core` i `check:build-typecheck` kompilują różne programy w ramach różnych opcji, a ten sam plik może być czysty w jednym i pełen błędów w drugim.

`tsconfig.build.json` ustawia `"strict": false`, więc `noImplicitAny` jest wyłączone. Podstawowa konfiguracja kompiluje wyselekcjonowaną listę dozwolonych 27 plików z bardziej rygorystycznymi opcjami i podąża za wykresem importu każdego wpisu, więc pliki, które nigdy nie pojawiają się w programie kompilacji, są nadal tam sprawdzane.

Konsekwencja ma znaczenie przy ocenie, czy plik jest wpisany:** zerowa diagnostyka pod `check:build-typecheck` nie oznacza zera** . Usunięcie `@ts-nocheck` z 26 plików wykazało, że 23 z nich były czyste w programie budującym; szesnaście z nich ujawniło około 120 ukrytych błędów w ścisłym. Sprawdź oba przed wywołaniem czyszczenia pliku.

### Praca: `quality-gate`

Biegnie za `test-coverage`. Bloki łączą się w przypadku niepowodzenia.

| Scenariusz                   | Sprawdza                                                                                                                                                                                | Bloking                |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | Emituje `quality-metrics.json` (liczba ostrzeżeń ESLint, zasięg z połączonego raportu fragmentu)                                                                                        | Tak (przed grzechotką) |
| `quality:ratchet`            | Żadna metryka w `quality-baseline.json` nie uległa regresji (ostrzeżenia ESLint ≤ linia bazowa; zasięg ≥ linia bazowa)                                                                  | Tak                    |
| `check:duplication`          | Powielanie kodu (jscpd@4) nie przekracza poziomu bazowego w `quality-baseline.json`                                                                                                     | Tak                    |
| `check:complexity`           | Złożoność cyklomatyczna na poziomie pliku nie przekracza limitu (rdzeń ESLint `complexity` + `max-lines-per-function`)                                                                  | Tak                    |
| `check:cognitive-complexity` | Mechanizm zapadkowy złożoności poznawczej (`eslint-plugin-sonarjs`) — oddzielne przejście ESLint ; CI uruchamia oba połączone jako pojedynczy krok `check:complexity-ratchets`          | Tak                    |
| `check:dead-code`            | Niewykorzystany eksport/pliki zapadkowy (knip) nie cofa się w stosunku do wartości bazowej                                                                                              | Tak                    |
| `check:compression-budget`   | Budżet referencyjny kompresji — na silnik, dolny próg oszczędności tokenów nie może ulec regresowi                                                                                      | Tak                    |
| `check:type-coverage`        | Grzechotka procentowa (`type-coverage`) nie cofa się; w dużej mierze obejmuje `typecheck:noimplicit:core`                                                                               | Tak                    |
| `check:codeql-ratchet`       | Liczba alertów otwartego CodeQL nie zmniejsza się (odczyt przez `gh api`; płynne pomijanie bez tokena) Częstotliwość odświeżania — i ręczne wyzwalanie: patrz „zapadka CodeQL ” poniżej | Tak                    |

### Praca: `quality-extended`

Cała praca ma charakter doradczy (`continue-on-error: true`). Grzechotki oparte na npm działają naprawdę; zewnętrzne skanery instalują się poprzez `gh release download` i automatycznie pomijają (wyjście 0), gdy nadal nie ma pliku binarnego.

| Scenariusz               | Sprawdza                                                                                                                                                                                                                                  | Bloking                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `check:circular-deps`    | Brak zależności cyklicznych (dpdm)                                                                                                                                                                                                        | **Doradczy**                                       |
| `check:bundle-size`      | Rozmiar pakietu nie przekracza limitu                                                                                                                                                                                                     | **Doradczy**                                       |
| `check:secrets`          | Tajne skanowanie (gitleaks) — pomija, jeśli nie ma pliku binarnego                                                                                                                                                                        | **Doradczy**                                       |
| `check:vuln-ratchet`     | Luki w zabezpieczeniach (osv-scanner) nie regresują przeskoków — jeśli nie ma pliku binarnego                                                                                                                                             | **Doradczy**                                       |
| `check:workflows`        | Lint przepływu pracy (actionlint + zizmor); skanery missing/broken, nieprawidłowe raporty lub brakująca linia bazowa zapadki nie działają, ponieważ INCOMPLETE. Prawidłowe ustalenia są zgodne z wybraną polityką strict/advisory/ratchet | Wymagane wykonanie; Blokada grzechotki Zizmor w CI |
| `check:openapi-breaking` | Przełomowe zmiany w publicznym kontrakcie API (`openapi.yaml`) vs oddział podstawowy (oasdiff) — emituje `openapiBreaking=N`; pomija, jeśli nie ma oasdiff lub nie można rozwiązać specyfikacji podstawowej                               | **Doradczy**                                       |

### Praca: `docs-sync-strict`

Działa na każdym PR do `main`. Bloki łączą się w przypadku niepowodzenia.

| Scenariusz                     | Sprawdza                                                                                                                                                          | Bloking                     |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | Metabrama, która uruchamia sekwencyjnie 6 podbram poniżej                                                                                                         | Tak                         |
| ↳ `check:docs-sync`            | Spójność wersji CHANGELOG / OpenAPI / llm.txt                                                                                                                     | Tak                         |
| ↳ `check:docs-counts`          | Liczby w prozie (liczba dostawców, liczba migracji itp.) mieszczą się w oknie zapadkowym rzeczywistych zliczeń                                                    | Tak                         |
| ↳ `check:env-doc-sync`         | Każde env var w `.env.example` jest udokumentowane w tabeli dokumentów i odwrotnie                                                                                | Tak                         |
| ↳ `check:deprecated-versions`  | Brak przestarzałych ciągów wersji w dokumentach                                                                                                                   | Tak                         |
| ↳ `check:doc-links`            | Wewnętrzne linki do przecen w dokumentach prowadzą do prawdziwych plików (formularz `[text]`/`(path)` )                                                           | Tak                         |
| ↳ `check:fabricated-docs`      | Trasy, zmienne env, polecenia CLI, nazwy haków i ścieżki plików cytowane w dokumentach istnieją w bazie kodu. Twarda brama przez `--strict`; soft-fail bez flagi. | Tak (przez `--strict` w CI) |
| `check:cli-i18n`               | Ciągi poleceń CLI są obecne we wszystkich plikach ustawień regionalnych i18n                                                                                      | Tak                         |
| `check:openapi-coverage`       | Specyfikacja OpenAPI obejmuje przynajmniej część rzeczywistych tras                                                                                               | Tak                         |
| `check:openapi-security-tiers` | Adnotacje poziomu zabezpieczeń w `openapi.yaml` są zgodne z klasyfikacją `routeGuard.ts`                                                                          | **Doradczy**                |
| `check:openapi-routes`         | Każda ścieżka w `openapi.yaml` prowadzi do prawdziwego `route.ts` (antyhalucynacja)                                                                               | Tak                         |
| `check:docs-symbols`           | Każde odniesienie do `/api/...` w `docs/**/*.md` sprowadza się do prawdziwego `route.ts` (antyhalucynacja)                                                        | Tak                         |
| `i18n translation drift`       | Nieprzetłumaczone klucze w plikach ustawień regionalnych i18n — tylko ostrzegane                                                                                  | **Doradczy**                |

Generowanych jest dwanaście README SVGs pod `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regeneruje je wszystkie). Każdy z nich ma test jednostkowy porównania bajtów (`tests/unit/docs/readme-*-svg.test.ts`, zadanie `test-unit`), który kończy się niepowodzeniem, gdy zatwierdzony plik jest nieaktualny, a `check:docs-counts` odczytuje liczby kanoniczne ze swoich węzłów `<text>` — dlatego krok konspektu sprawia, że każdy zarysowany ciąg znaków w pliku jest niewidoczny `<text>`. Kontrola liczb kanonicznych SVG odczytuje pliki wymienione w `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` i `tier-flow-light.svg`; twierdzenia dotyczące bezpłatnego na zawsze, wpisu do katalogu, puli cyklicznej i czynników scoringowych brzmią również jako `promise-pillars.svg`, `free-tier-budget.svg` i `strategies-grid.svg`. `free-tier-budget.svg` pobiera swoje dane z modułu ładującego katalog na żywo, więc zmiana na `FREE_MODEL_BUDGETS` lub na wyświetlaną nazwę dostawcy powoduje uszkodzenie CI do czasu ponownego wygenerowania tego pliku.

### Praca: `i18n-ui-coverage`

| Scenariusz                           | Sprawdza                                                                                                                                                                                                              | Bloking      |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (wbudowane) | Zasięg klucza UI i18n wynosi 65% ≥                                                                                                                                                                                    | Tak          |
| `check-ui-value-drift` (wbudowane)   | Przepisany angielski** wartość** nie pozostawia po sobie żadnego przestarzałego tłumaczenia                                                                                                                           | Tak          |
| `check-new-key-coverage` (wbudowane) | A** nowy** Klucz angielski jest tłumaczony w każdej lokalizacji. —, znacznik `__MISSING__:` jest odrzucany                                                                                                            | Tak          |
| `check-translation-ratio`            | Rzeczywisty współczynnik tłumaczeń na lokalizację (identyczne z angielskim / symbol zastępczy / brakujące liście poza listą dozwolonych) nie może przekraczać `config/quality/i18n-translation-baseline.json` + slack | **Doradczy** |

Potrzebuje `fetch-depth: 0` — bramka dryfu wartości różnicuje `en.json` w stosunku do podstawy scalania.

#### `check-ui-value-drift` — bramka do nieaktualnych tłumaczeń

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
