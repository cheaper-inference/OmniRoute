# Self-Hosted Runner Box Operations (.113 pool) (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Pula self-hostowana działa na maszynie **.113** (`tomni-proxmox-113`). Od 2026-10-18 każdy
runner OmniRoute ma **jedną rolę**, jedną etykietę oraz budżet pamięci/CPU dostosowany do zmierzonego
obciążenia. Slot Turbopack otrzymuje zasoby wymagane przez kompilację, a pozostałe sloty są dostosowane
do zmierzonych wartości szczytowych. Nadmiarowe przydzielenie zasobów na maszynie występuje tylko wtedy,
gdy kompilacja Turbopack zbiega się z kompilacją webpack Release-Green oraz zadaniem lintowania; swap
hosta (16 GB) przejmuje wtedy nadmiar, a ponieważ kompilacje dla pull requestów działają na runnerach
hostowanych, slot Turbopack przez większość czasu pozostaje bezczynny:

| runner               | etykieta          | rola                                                                                                                                                     | `MemoryHigh` / `MemoryMax` | `CPUQuota`  |
| -------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ----------- |
| `omniroute-113-5`    | `omni-build`      | kompilacje Turbopack: `ci.yml` `Build` (tylko push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, nocna kompilacja a11y | 56 GB / 60 GB (swap 0)     | 1600 %      |
| `omniroute-113-6`    | `omni-release`    | Release-Green (`release-green` + `main-green`), kompilacja webpack                                                                                       | 20 GB / 24 GB (swap 4 GB)  | 800 %       |
| `omniroute-113-2`    | `omni-light`      | zadania nocne (Schemathesis, promptfoo, garak, k6) oraz `quality.yml` `lint-guard`                                                                       | 12 GB / 16 GB (swap 4 GB)  | 600 %       |
| `omniroute-113`      | `omni-light`      | ta sama pula co powyżej                                                                                                                                  | 8 GB / 12 GB               | 400 %       |
| OmniHeuris, OmniMind | (ich repozytoria) | tylko Dependabot (wartość szczytowa 155 MB dla każdego, 2026-10-18)                                                                                      | 4 GB / 6 GB                | 200 % każdy |

Pomiary z 2026-10-18:

| zasób     | wartość                                       | znaczenie dla planowania                                                                                                                                                                                                                                                                                                                                                                                       |
| --------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 rdzenie**                        | produkcyjna kompilacja Turbopack osiągnęła bez limitu wartość szczytową 49 GB (`tests/unit/ci-build-bundler-webpack.test.ts`); w Next 16.3.8 sama faza kompilacji zajmuje ~40 GB (36 GB RSS w `next-build` oraz 17 procesów loadera po 3 GB, pomiar z 2026-10-18); kompilacja webpack zajmuje ~14–16 GB. Jedna kompilacja Turbopack i jedna webpack mogą działać jednocześnie; dwie kompilacje Turbopack — nie |
| swap      | 16 GB                                         | `omniroute-113-5` działa z wyłączonym swapem (`MemorySwapMax=0`), dzięki czemu niekontrolowana kompilacja jest zatrzymywana po osiągnięciu limitu zamiast powodować użycie swapu przez maszynę                                                                                                                                                                                                                 |
| `/tmp`    | **12 GB tmpfs = RAM**                         | wszystko, co jest tam przechowywane, zajmuje pamięć; pozostałości są usuwane po 3 h                                                                                                                                                                                                                                                                                                                            |
| CPU       | zaobserwowano obciążenie 60 przy 32 rdzeniach | przed wprowadzeniem limitów jedna kompilacja Turbopack (~1166 % CPU) wraz z zestawem testów pokrycia uruchomionym na tej samej maszynie blokowały sygnały heartbeat pozostałych listenerów (`The self-hosted runner lost communication`, #16853)                                                                                                                                                               |
| runnery   | **6 listenerów**                              | 4 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-3/-4/-7/-8` są wyłączone (`systemctl enable --now` ponownie uruchamia jeden z nich)                                                                                                                                                                                                                                                                        |

Limity znajdują się w pliku `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
każdej jednostki (poprzednie wartości zachowano jako `override.conf.bak-20261018`) i zostały zastosowane
na działającym systemie za pomocą
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — bez restartu, więc żadne
uruchomione zadanie nie zostało przerwane. Etykiety są zmieniane za pośrednictwem API runnerów
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), również na działającym systemie.

## Instalacja skryptu czyszczącego (jednorazowo, na serwerze)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): co 30 min, zapisuj log do /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` jest wymagany: przed usunięciem skrypt czyszczący potwierdza, że ścieżka jest
bezczynna, wykonując pojedynczy zrzut otwartych plików. Bez tego narzędzia niczego
nie usuwa i informuje o tym (kod wyjścia 1). Każdą zmianę należy najpierw wypróbować
z opcją `--dry-run` — skrypt wypisze dokładnie, co by zrobił, nie wprowadzając żadnych zmian.

Co robi przy każdym uruchomieniu: usuwa nasze pozostałości (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) po **3 godz. na tmpfs** i po 24 godz. na dysku
w `_work/_temp`; kończy proces `next-build` starszy niż 75 min (żadne zadanie nie działa
tak długo — 2026-08-27 jedno działało przez 70 min po tym, jak GitHub uznał jego zadanie
za utracone); usuwa starsze niż 48 godz. katalogi robocze runnerów, których jednostka jest
**zatrzymana**; alarmuje przy wykorzystaniu dysku ≥ 85%, wartości pamięci PSI
`full/avg60` ≥ 10% oraz liczbie procesów nasłuchujących większej niż `MAX_ACTIVE_RUNNERS`
(z podziałem na omniroute/inne). Kod wyjścia 1 = wymagana interwencja; przeczytaj log.

Reguła 75 minut nie wykrywa kompilacji, której zadanie GitHub już porzucił. Gdy
`Runner.Listener` nie może odnowić zadania, w `_diag/Runner_*.log` pojawia się
`POST request to …/renewjob timed out after 100 seconds`, API zgłasza zadanie jako `completed`
(niepowodzenie) około dziesięciu minut po ostatnim udanym odnowieniu, a `next-build` nadal działa
bez przypisanego zadania (2026-10-18: kompilacja #17066 została oznaczona jako nieudana o 19:43,
a jej proces kompilacji pięć minut później nadal zajmował 40 GB). Potwierdź ref w najnowszym
`_diag/Worker_*.log`, a następnie wyślij SIGTERM wyłącznie do drzewa procesów kompilacji według
PID — `next-build`, `npm run build`, `build-next-isolated.mjs` oraz procesów roboczych `_work`.
Nigdy nie ingeruj w `Runner.Listener`, `RunnerService.js` ani `Runner.Worker`: proces roboczy
zgłosi zadanie jako anulowane, a listener sam wróci do trybu online.

## Jednostki runnerów: KillMode

Domyślne ustawienie runnera `KillMode=process` pozostawia procesy
`Runner.Worker → npm → next-build` uruchomione po zatrzymaniu lub ponownym uruchomieniu
jednostki — osierocona kompilacja nadal zużywa pamięć RAM i CPU bez przypisanego zadania.
Każda jednostka OmniRoute ma konfigurację uzupełniającą
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
z ustawieniem `KillMode=mixed`: najpierw SIGTERM do listenera, a po upływie
`TimeoutStop` SIGKILL do całej grupy cgroup. Ustawienie zacznie obowiązywać przy następnym
ponownym uruchomieniu jednostki — uruchamiaj ponownie **po jednym runnerze naraz,
wyłącznie gdy jest bezczynny**, wykonując sprawdzenie bezczynności i ponowne uruchomienie
w tym samym poleceniu.

## Zasady eksploatacji

- **Jedna kompilacja Turbopack naraz — wymuszane przez etykietę.** Każde zadanie wykonujące pełne
  `next build` za pomocą Turbopack jest kierowane do `[self-hosted, omni-build]`, a tylko
  **`omniroute-113-5`** ma tę etykietę: `ci.yml` `Build`, `npm-publish.yml` `publish`,
  `nightly-v4-build`, `preview-artifact`, nocna kompilacja a11y (#16853) oraz
  **amd64** w `docker-publish.yml` (webpack wewnątrz BuildKit — Turbopack uległ tam awarii,
  uruchomienie 33253576569). Etap Docker dla arm64 pozostaje na `ubuntu-24.04-arm`.
  `docker-publish` dla amd64 współdzieli grupę współbieżności `heavy-build-main` z `Build`
  w `ci.yml` (`cancel-in-progress: false`). Docker Engine musi znajdować się na
  `omniroute-113-5`. Drugie miejsce dla Turbopack nie mieści się w 78 GB (2 × 33–37 GB plus
  pozostałe procesy na maszynie); drugie miejsce jest bezpieczne wyłącznie dla kompilacji webpack.
- **Kompilacje pull requestów działają na hostowanych runnerach (2026-10-18).** `Build` w `ci.yml`
  trafia do `omni-build` wyłącznie dla `push` i `workflow_dispatch`; każda kompilacja
  `pull_request` (z własnego repozytorium lub forka) oraz `merge_group` działa na
  `ubuntu-latest` z webpack. Gdy każdy PR z własnego repozytorium był kierowany do tego miejsca,
  kompilacja Turbopack zajmowała je przez 29–58 min, 18 kompilacji czekało w kolejce nawet 18 h,
  a kompilacja push własnej gałęzi wydaniowej uzyskała to miejsce raz na 40 zadań. Na hostowanym
  runnerze ta sama kompilacja PR trwa 8–12 min równolegle z pozostałymi zadaniami PR. Turbopack,
  czyli bundler dostarczany przez `npm-publish`, pozostaje testowany na gałęzi wydaniowej przez
  nocną kompilację a11y domyślnej gałęzi (04:41 UTC), przez każdą kompilację push lub dispatch,
  która trafi do tego miejsca, oraz przez sam `npm-publish`.
  `tests/unit/build/heavy-build-queue.test.ts` utrwala czteroczęściowy warunek.
- **Nigdy nie przydzielaj miejscu dla Turbopack mniej zasobów niż wynosi zmierzone zapotrzebowanie.**
  2026-10-18 o 18:06 limity miejsca obniżono z 56G/60G do 40G/44G, aby zrobić miejsce dla
  `omni-release`. Faza kompilacji przez cały czas utrzymywała się na poziomie `MemoryHigh`
  (memory PSI `full` 30–43%), a współdzielący cgroup proces `Runner.Listener` nie był w stanie
  odnowić zadania. Wartości 56G/60G ustawione przez właściciela 2026-10-17 przywrócono tego samego
  dnia. Poniżej tej wartości kompilacja nie kończy się błędem; zaczyna intensywnie przerzucać
  pamięć, a zadanie zostaje utracone.
- **Release-Green ma własne miejsce (2026-10-18).** Do tego czasu obie walidacje Release-Green
  działały na `omni-build`: przy każdym pushu (~10/godz., 97 ze 100 uruchomień push anulowano
  w trakcie pracy jednego dnia) oraz podczas trzech pełnych przebiegów po ~2 h dziennie
  (przebieg o 05:29 czekał na miejsce 6 h) — pojedyncze miejsce na kompilację było przeciążone
  kilkukrotnie ponad swoją przepustowość, a kompilacje PR z własnego repozytorium czekały godzinami.
  `release-green` i `main-green` są teraz kierowane do `omni-release` (wyłącznie
  `omniroute-113-6`) z `OMNIROUTE_USE_TURBOPACK=0`, a rozpoczęte uruchomienie nie jest już
  anulowane przez nowszy push (oczekujące miejsce nadal scala lawinę uruchomień).
  `tests/unit/build/runner-capacity-routing.test.ts` utrwala trasowanie, przełączenie na webpack
  oraz gwarancję, że nic na `omni-release` nie jest kompilowane za pomocą Turbopack.
- **Lekka pula: `omni-light`.** `omniroute-113` i `omniroute-113-2` wykonują nocne zadania
  wymagające wyłącznie backendowego `next build` (~5–6 GB; webpack) oraz `lint-guard` z
  `quality.yml`. `omniroute-113` miał `MemoryHigh=4G` do 2026-10-18 — kompilacja promptfoo
  przez 54 min odzyskiwała tam pamięć, aby kontynuować pracę; 8 GB eliminuje ograniczanie
  wydajności.
- **Celowo mniej procesów nasłuchujących.** Cztery jednostki OmniRoute wyłączono 2026-08-29 —
  każdy dodatkowy proces nasłuchujący jest kolejnym użytkownikiem opisanego powyżej budżetu
  pamięci. Limit janitora wynosi 6 (`MAX_ACTIVE_RUNNERS=6` w cron): zlicza on każdy proces
  `Runner.Listener` na maszynie, a OmniHeuris + OmniMind dodają dwa do naszych czterech.
- **Nigdy nie czyść ręcznie `/tmp` ani `_work`, gdy jakikolwiek runner jest zajęty.**
  Sprawdzenie, a następnie usunięcie po pewnej przerwie sprawiło, że aktywne zadanie Build
  utraciło swój katalog `_work` 2026-08-27. Janitor wykonuje sprawdzenie i usunięcie w jednym
  kroku; pozwól mu to zrobić.
- Zatrzymanie runnera w trakcie zadania anuluje je (zaobserwowano na żywo): używaj
  `systemctl stop` tylko wtedy, gdy jego proces nasłuchujący nie ma procesu potomnego
  `Runner.Worker` — i wykonuj to jednym poleceniem.
- Workflow nie mogą umieszczać artefaktów w `/tmp` (to pamięć RAM). Pobieraj je do
  `$RUNNER_TEMP` (na dysku, osobno dla każdego runnera) — zapisanie artefaktu `next-build`
  o rozmiarze 1,3 GB w tmpfs zajęło 27–32 min, a przesłanie go z dysku 2 min.
- VPS `.15` służy wyłącznie do homologacji — nigdy nie uruchamia runnerów CI.

## Ścieżka hostowana (run­nerzy hostowani przez GitHub)

Konto jest w planie **Pro**: **40 równoczesnych zadań hostowanych**, współdzielonych przez wszystkie kontrole PR,
wszystkie przepływy pracy wyzwalane przez wypchnięcie zmian oraz domyślną konfigurację CodeQL. Pomiar wykonany 2026-10-18 podczas
kampanii scalania (~10 scaleń/godz. na `release/v3.8.52`): **2 500 uruchomień przepływów pracy utworzonych w ciągu
24 godz.**, 44 wypchnięcia zmian do gałęzi w ciągu 6 godz., **106 zadań hostowanych w kolejce**, podczas gdy kontrole PR czekały
godzinami, a PR-y scalano bez nich. Dziewięć przepływów pracy uruchamiało się przy każdym wypchnięciu zmian do gałęzi:

| przy każdym wypchnięciu do `release/v*`     | zadania hostowane | rezultat podczas przeciążenia                                              | od 2026-10-18                                                                           |
| ------------------------------------------- | ----------------: | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `ci.yml` (pełna macierz)                    |             do 30 | anulowane przez następne wypchnięcie, 24 z 24 w ciągu dnia                 | nie uruchamia się przy wypchnięciach do `release/**` (uruchomienie PR + Release-Green)  |
| `quality.yml`                               |                ~6 | anulowane, 23 z 23                                                         | nie uruchamia się przy wypchnięciach do `release/**`                                    |
| `Release-Green` `--quick`                   |                 0 | działało na `omni-build`, anulowano 97 ze 100                              | slot `omni-release`, nigdy nie jest anulowany, oczekujące uruchomienia są konsolidowane |
| `Lock released branch`, `OpenSSF Scorecard` |                 2 | jedno uruchomienie w kolejce na każde wypchnięcie                          | jedno uruchomienie na ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)          |
| `Release acceptance` (raport równoległy)    |                 1 | jedno hostowane `npm ci` na każde wypchnięcie, nigdy nieanulowane          | bez zmian — kandydat do filtra `paths:`                                                 |
| `Publish to Docker Hub` → `Deploy to VPS`   |                 2 | anulowane przy każdym wypchnięciu; etap amd64 konkuruje o `omni-build`     | bez zmian — kanał wdrożeniowy właściciela                                               |
| Domyślna konfiguracja CodeQL (`dynamic`)    |                 4 | `javascript-typescript`, `actions`, `c-cpp`, `python` na każde wypchnięcie | bez zmian — Settings → Code security; `c-cpp`/`python` niczego tutaj nie skanują        |

`tests/unit/build/push-storm-diet.test.ts` wymusza wyzwalanie `ci.yml` i
`quality.yml` przy wypchnięciu wyłącznie do `main`. Efekt uboczny: Codecov nie otrzymuje już bazowego przesłania danych przy każdym wypchnięciu do gałęzi wydania (ten
krok ma charakter informacyjny i używa `continue-on-error`); bramka pokrycia w repozytorium oraz komentarz w PR
pozostają bez zmian.

**Większa pojemność infrastruktury self-hosted nie rozwiązuje problemu kolejki hostowanej.** Maszyna deweloperska
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) mogłaby obsługiwać runner, ale sesje agentów już
utrzymują jej obciążenie na poziomie 20–26, kontener agenta nie ma demona Docker, a przeciążona jest
ścieżka hostowana. Maszyna `.113` miała w tym samym momencie 71 GB wolnego miejsca i obciążenie 5–8; jej ograniczeniem
jest podany wyżej budżet pamięci na proces nasłuchujący (limit 6 procesów), a nie CPU. Pozostałe możliwości
mają charakter procesowy: scalać PR-y kampanii za pośrednictwem kolejki Mergify (`label=queue`; partie współdzielą
jedno uruchomienie CI `merge_group` zamiast jednego uruchomienia na PR i jednego na wypchnięcie), ograniczyć języki
w domyślnej konfiguracji CodeQL oraz filtrować `release-acceptance.yml` według plików, które odczytuje.
