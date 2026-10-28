# Self-Hosted Runner Box Operations (.113 pool) (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Самостално хостован скуп ради на серверу **.113** (`tomni-proxmox-113`). Од 2026-10-18 сваки
OmniRoute извршилац има **једну улогу**, једну ознаку и буџет меморије/процесора прилагођен
измереним потребама свог радног оптерећења. Turbopack слот добија ресурсе потребне за изградњу;
остали слотови су димензионисани према својим измереним вршним вредностима. Сервер прекомерно
додељује ресурсе само када се Turbopack изградња поклопи са Release-Green webpack изградњом и
lint послом; swap простор хоста (16 GB) то апсорбује, а пошто се Build послови за захтеве за
спајање извршавају на хостованим извршиоцима, Turbopack слот је неактиван већину времена:

| извршилац            | ознака             | улога                                                                                                                                               | `MemoryHigh` / `MemoryMax` | `CPUQuota` |
| -------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------- |
| `omniroute-113-5`    | `omni-build`       | Turbopack изградње: `ci.yml` `Build` (само push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, ноћна a11y изградња | 56 GB / 60 GB (swap 0)     | 1600 %     |
| `omniroute-113-6`    | `omni-release`     | Release-Green (`release-green` + `main-green`), webpack изградња                                                                                    | 20 GB / 24 GB (swap 4 GB)  | 800 %      |
| `omniroute-113-2`    | `omni-light`       | ноћни послови (Schemathesis, promptfoo, garak, k6) и `quality.yml` `lint-guard`                                                                     | 12 GB / 16 GB (swap 4 GB)  | 600 %      |
| `omniroute-113`      | `omni-light`       | исти скуп као изнад                                                                                                                                 | 8 GB / 12 GB               | 400 %      |
| OmniHeuris, OmniMind | (њихова складишта) | само Dependabot (вршна вредност по 155 MB, 2026-10-18)                                                                                              | 4 GB / 6 GB                | по 200 %   |

Измерено 2026-10-18:

| ресурс    | вредност                              | значај за распоређивање                                                                                                                                                                                                                                                                                                                                                                              |
| --------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 језгра**                 | Turbopack продукциона изградња достигла је вршних 49 GB без ограничења (`tests/unit/ci-build-bundler-webpack.test.ts`); на Next 16.3.8 само фаза компилације заузима ~40 GB (36 GB RSS у `next-build` плус 17 loader извршилаца на 3 GB, измерено 2026-10-18); webpack изградња заузима ~14–16 GB. Једна Turbopack и једна webpack изградња могу да раде истовремено; две Turbopack изградње не могу |
| swap      | 16 GB                                 | `omniroute-113-5` ради са искљученим swap простором (`MemorySwapMax=0`), тако да се неконтролисана изградња прекида када достигне ограничење уместо да примора сервер да користи swap                                                                                                                                                                                                                |
| `/tmp`    | **12 GB tmpfs = RAM**                 | све што се тамо смести заузима меморију; преостале датотеке се уклањају након 3 h                                                                                                                                                                                                                                                                                                                    |
| CPU       | забележено оптерећење 60 на 32 језгра | пре увођења квота, једна Turbopack изградња (~1166 % CPU) уз пакет тестова покривености на истом серверу ускратила је ресурсе сигналима одржавања везе осталих слушалаца (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                       |
| извршиоци | **7 слушалаца** (2026-10-28)          | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-7` носи и `omni-build`; `omniroute-113-3/-4/-8` обрисани су из репозиторијума (2026-10-28)                                                                                                                                                                                                                                                       |

Ограничења се налазе у `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` сваке
јединице (претходне вредности су сачуване као `override.conf.bak-20261018`) и примењена су уживо
помоћу `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — без поновног
покретања, тако да ниједан активан посао није прекинут. Ознаке се мењају преко API-ја за извршиоце (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), такође уживо.

## Инсталирајте чистач (једнократно, на серверу)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): сваких 30 минута, уписује дневник у /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` је обавезан: чистач потврђује да је путања неактивна помоћу једног снимка отворених
датотека пре него што је уклони, а без овог алата не уклања ништа и то пријављује
(излазни код 1). Сваку измену најпре испробајте помоћу `--dry-run` — исписује тачно шта би
урадио и не мења ништа.

Шта ради при сваком покретању: чисти наше преостале датотеке (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) након **3 сата на tmpfs-у** и 24 сата на диску у
`_work/_temp`; зауставља `next-build` старији од 75 минута (ниједан посао не траје толико —
2026-08-27 један је радио 70 минута након што је GitHub прогласио његов посао изгубљеним);
уклања радне копије старије од 48 сати за покретаче чија је јединица **заустављена**;
пријављује упозорење када је попуњеност диска ≥ 85 %, меморијски PSI
`full/avg60` ≥ 10 % и када има више ослушкивача него што задаје `MAX_ACTIVE_RUNNERS` (са
приказом броја omniroute/осталих). Излазни код 1 = потребна је пажња; прочитајте дневник.

Правило од 75 минута не открива изградњу од чијег је посла GitHub већ одустао. Када
`Runner.Listener` не може да обнови свој посао, `_diag/Runner_*.log` приказује
`POST request to …/renewjob timed out after 100 seconds`, API пријављује посао као `completed`
(неуспешан) око десет минута након последњег успешног обнављања, а `next-build` наставља да ради
без придруженог посла (2026-10-18: изградња за #17066 проглашена је неуспешном у 19:43, а њен
процес изградње је и пет минута касније и даље заузимао 40 GB). Потврдите ref у најновијем
`_diag/Worker_*.log`, а затим по PID-у пошаљите SIGTERM само стаблу процеса изградње —
`next-build`, `npm run build`, `build-next-isolated.mjs` и `_work` радницима. Никада не дирајте
`Runner.Listener`, `RunnerService.js` или `Runner.Worker`: радник пријављује посао као отказан,
а ослушкивач се сам враћа на мрежу.

## Јединице покретача: KillMode

Подразумевани `KillMode=process` покретача оставља `Runner.Worker → npm → next-build`
активним када се јединица заустави или поново покрене — напуштена изградња наставља да троши RAM и
CPU без придруженог посла. Свака OmniRoute јединица има додатну конфигурацију
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
са `KillMode=mixed`: прво шаље SIGTERM ослушкивачу, а затим SIGKILL целој cgroup групи када истекне
`TimeoutStop`. Конфигурација ступа на снагу при следећем поновном покретању јединице — поново покрећите
**један по један покретач, само када је неактиван**, при чему провера неактивности и поновно покретање
морају бити у истој команди.

## Правила рада

- **Само један Turbopack build истовремено — обезбеђено ознаком.** Сваки посао који покреће потпуни Turbopack
  `next build` циља `[self-hosted, omni-build]`, а само **`omniroute-113-5`** носи ту
  ознаку: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`, `preview-artifact`,
  ноћни a11y build (#16853) и `docker-publish.yml` **amd64** (webpack унутар BuildKit-а —
  Turbopack се ту срушио, покретање 33253576569). Docker деоница за arm64 остаје на `ubuntu-24.04-arm`.
  `docker-publish` за amd64 дели concurrency групу `heavy-build-main` са `ci.yml` `Build`
  (`cancel-in-progress: false`). Docker Engine мора бити на `omniroute-113-5`. Други Turbopack
  слот не може да стане у 78 GB (2 × 33–37 GB плус остатак система); други слот је безбедан само за
  webpack build-ове.
- **Build-ови за pull request покрећу се на хостованим runner-има (2026-10-18).** `ci.yml` `Build` стиже до `omni-build` само за
  `push` и `workflow_dispatch`; сваки `pull_request` (из сопственог репозиторијума или fork-а) и `merge_group` Build
  покреће се на `ubuntu-latest` уз webpack. Када је сваки PR из сопственог репозиторијума био усмераван на тај слот, Turbopack
  Build га је држао 29–58 минута, 18 Build-ова је чекало у реду и до 18 сати, а сопствени push Build
  release гране добио је слот једном у 40 послова. На хостованом runner-у исти PR Build траје 8–12 минута упоредо са осталим
  пословима тог PR-а. Turbopack, bundler који испоручује `npm-publish`, и даље се тестира на release грани путем
  ноћног a11y build-а подразумеване гране (04:41 UTC), сваког push или dispatch Build-а који
  стигне до слота и самог `npm-publish`. `tests/unit/build/heavy-build-queue.test.ts`
  фиксира услов од четири клаузуле.
- **Никада не постављајте Turbopack слот испод измерених потреба.** Дана 2026-10-18 у 18:06 слот је
  смањен са 56G/60G на 40G/44G како би се направило места за `omni-release`. Фаза компајлирања била је на
  граници `MemoryHigh` током целог покретања (memory PSI `full` 30–43 %), а `Runner.Listener`, који
  дели cgroup, није могао да обнови свој посао. Власникове вредности 56G/60G од 2026-10-17 враћене су
  истог дана. Испод те вредности build се не прекида грешком; он непрестано пребацује меморију, а посао се губи.
- **Release-Green има сопствени слот (2026-10-18).** До тада су се обе Release-Green провере покретале
  на `omni-build`: при сваком push-у (~10/сат, 97 од 100 push покретања отказано је усред рада за један дан)
  и током три потпуна пролаза од ~2 h дневно (пролаз у 05:29 чекао је 6 h на слот) — једини build
  слот био је вишеструко преоптерећен, а PR Build-ови из сопственог репозиторијума чекали су сатима.
  `release-green` и `main-green` сада циљају `omni-release` (само `omniroute-113-6`) уз
  `OMNIROUTE_USE_TURBOPACK=0`, а започето покретање више не отказује новији push (слот на чекању и даље сажима
  налет). `tests/unit/build/runner-capacity-routing.test.ts`
  фиксира усмеравање, прелазак на webpack и услов да ништа на `omni-release` не користи Turbopack за build.
- **Лаки pool: `omni-light`.** `omniroute-113` и `omniroute-113-2` покрећу ноћне послове којима је
  потребан само backend `next build` (~5–6 GB; webpack) и `quality.yml` `lint-guard`. `omniroute-113`
  је имао `MemoryHigh=4G` до 2026-10-18 — promptfoo build је тамо провео 54 минута стално ослобађајући
  меморију; 8 GB уклања ограничавање.
- **Намерно мање listener-а.** Четири OmniRoute јединице онемогућене су 2026-08-29 — сваки додатни
  listener још је један корисник горенаведеног меморијског буџета. Горња граница чистача је 8 (`MAX_ACTIVE_RUNNERS=8` у cron-у): он броји
  сваки `Runner.Listener` на машини, а OmniHeuris + OmniMind додају још два на наших пет.
- **Unit и Vitest послови остају хостовани.** `ci.yml` шаље своје unit шардове и Vitest посао на `[self-hosted, omni-ci]` само када је променљива репозиторијума `vars.USE_VPS_TEST_RUNNER` постављена на `true`, и тада само за `pull_request` извршавања из истог репозиторијума; форкови, `merge_group` и прослеђивања измена остају на `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). Променљива је `false`. Дана 2026-10-28 три `omni-ci` listener-а са по 4 језгра трошила су 250–270 s на `npm ci`, а сваки unit шард достигао је ограничење посла од 30 минута, наспрам ~634 s за хостовани шард, уз оптерећење машине од 17–24. Ти listener-и су обрисани. Не укључујте поново променљиву без listener-а димензионисаних за unit шард.
- **Никада ручно не чистите `/tmp` или `_work` док је било који runner заузет.**
  Провера па брисање, са паузом између та два корака, довели су до тога да активни Build посао изгуби свој
  `_work` 2026-08-27. Чистач обавља проверу и уклањање у једном кораку;
  препустите му то.
- Заустављање runner-а усред посла отказује тај посао (потврђено уживо): користите `systemctl stop` само
  када његов listener нема `Runner.Worker` child процес — и урадите то једном командом.
- Workflow-и не смеју да смештају артефакте у `/tmp` (он је у RAM-у). Преузимајте их у
  `$RUNNER_TEMP` (на диску, засебно за сваки runner) — артефакту `next-build` од 1.3 GB требало је 27–32
  минута да стигне на tmpfs, а 2 минута да се отпреми са диска.
- VPS `.15` служи само за хомологацију — никада не покреће CI runner-е.

## Хостована трака (извршиоци које хостује GitHub)

Репозиторијум припада организацији `cheaper-inference`, на **Team** плану: **60 истовремених хостованих послова**, које деле сви репозиторијуми у организацији, све провере PR-ова, сви токови рада покренути прослеђивањем измена и подразумевано подешавање CodeQL-а. Бројке у наставку измерене су на **Pro** плану (40 истовремених хостованих послова). Измерено 2026-10-18 током
кампање спајања (~10 спајања на сат на `release/v3.8.52`): **2.500 извршавања токова рада направљено је за
24 h**, 44 прослеђивања измена на грану за 6 h, **106 хостованих послова било је у реду** док су провере PR-ова чекале
сатима, а PR-ови су спајани без њих. Девет токова рада покретало се при сваком прослеђивању измена на грану:

| по прослеђивању измена на `release/v*`        | хостовани послови | исход током навале                                                    | од 2026-10-18                                                                      |
| --------------------------------------------- | ----------------: | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `ci.yml` (пуна матрица)                       |             до 30 | отказано наредним прослеђивањем, 24 од 24 у једном дану               | не покреће се за прослеђивања на `release/**` (PR извршавање + Release-Green)      |
| `quality.yml`                                 |                ~6 | отказано, 23 од 23                                                    | не покреће се за прослеђивања на `release/**`                                      |
| `Release-Green` `--quick`                     |                 0 | извршавало се на `omni-build`, отказано 97 од 100                     | слот `omni-release`, никада се не отказује, извршавања на чекању се обједињују     |
| `Lock released branch`, `OpenSSF Scorecard`   |                 2 | једно извршавање у реду по прослеђивању измена                        | једно извршавање по референци (`tests/unit/build/hosted-lane-concurrency.test.ts`) |
| `Release acceptance` (извештај у сенци)       |                 1 | један хостовани `npm ci` по прослеђивању, никада није отказан         | непромењено — кандидат за `paths:` филтер                                          |
| `Publish to Docker Hub` → `Deploy to VPS`     |                 2 | отказано по прослеђивању; amd64 део се надмеће на `omni-build`        | непромењено — власников канал за примену                                           |
| подразумевано подешавање CodeQL-а (`dynamic`) |                 4 | `javascript-typescript`, `actions`, `c-cpp`, `python` по прослеђивању | непромењено — Settings → Code security; `c-cpp`/`python` овде ништа не скенирају   |

`tests/unit/build/push-storm-diet.test.ts` фиксира окидач `ci.yml` и
`quality.yml` при прослеђивању измена искључиво на `main`. Споредни ефекат: Codecov више не добија основно отпремање за свако прослеђивање на release грану (тај
корак је информативан и има `continue-on-error`); провера покривености у репозиторијуму и коментар на PR-у
нису промењени.

**Већи сопствени капацитет не решава ред хостованих послова.** Развојна машина
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) могла би да хостује извршиоца, али сесије агента већ
одржавају њено оптерећење на 20–26, контејнер агента нема Docker демон, а засићена је
хостована трака. Машина `.113` је у истом тренутку имала 71 GB слободног простора и оптерећење 5–8; њено ограничење
је претходно наведени меморијски буџет по слушаоцу (највише 6 слушалаца), а не CPU. Преостале могућности
односе се на процес: спајати PR-ове кампање преко Mergify реда (`label=queue`, групе деле
једно `merge_group` CI извршавање уместо по једног извршавања за сваки PR и по једног за свако прослеђивање измена), смањити број језика у
подразумеваном подешавању CodeQL-а и филтрирати `release-acceptance.yml` према датотекама које чита.
