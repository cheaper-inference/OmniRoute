# Self-Hosted Runner Box Operations (.113 pool) (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Ang self-hosted pool ay tumatakbo sa **.113** kahon (`tomni-proxmox-113`). Mula noong 2026-10-18 bawat OmniRoute runner ay mayroon **isang papel** , isang label, at isang memory/CPU na badyet na sukat sa kung ano ang sinukat ng workload nito. Nakukuha ng Turbopack slot ang kailangan ng build; ang iba pang mga puwang ay may sukat sa kanilang nasusukat na mga taluktok. Ang kahon ay nag-overcommit lamang kapag ang isang Turbopack build ay nag-tutugma sa isang Release-Green webpack build at isang lint job; na-absorb iyon ng host swap (16 GB), at dahil naka-host ang pull-request Builds, ang slot Turbopack ay madalas na walang ginagawa:

| mananakbo            | label                           | papel                                                                                                                                                   | `MemoryHigh` / `MemoryMax`       | `CPUQuota`     |
| -------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | -------------- |
| `omniroute-113-5`    | `omni-build`, `omni-build-60gb` | Turbopack build: `ci.yml` `Build` (push/dispatch lang), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, ang gabi-gabing a11y build | 56 GB / 60 GB (swap 0)           | 1600 %         |
| `omniroute-113-6`    | `omni-release`                  | Release-Green (`release-green` + `main-green`), webpack build                                                                                           | 20 GB / 24 GB (magpalit ng 4 GB) | 800 %          |
| `omniroute-113-2`    | `omni-light`                    | nightlies (Schemathesis, promptfoo, garak, k6) at `quality.yml` `lint-guard`                                                                            | 12 GB / 16 GB (magpalit ng 4 GB) | 600 %          |
| `omniroute-113`      | `omni-light`                    | parehong pool tulad ng nasa itaas                                                                                                                       | 8 GB / 12 GB                     | 400 %          |
| OmniHeuris, OmniMind | (kanilang mga repo)             | Dependabot lang (peak 155 MB bawat isa, 2026-10-18)                                                                                                     | 4 GB / 6 GB                      | 200% bawat isa |

Sinukat noong 2026-10-18:

| mapagkukunan  | halaga                                 | ano ang ibig sabihin ng pag-iiskedyul                                                                                                                                                                                                                                                                                                                                                            |
| ------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RAM / CPU     | **78 GB / 32 core**                    | ang isang Turbopack production build ay umabot sa 49 GB na walang takip (`tests/unit/ci-build-bundler-webpack.test.ts`); sa Susunod na 16.3.8 ang compile phase lamang ay mayroong ~ 40 GB (36 GB RSS sa `next-build` plus 17 loader worker sa 3 GB, sinusukat 2026-10-18); isang webpack build sa ~ 14–16 GB. Isang Turbopack + isang webpack build magkasya; dalawang Turbopack build ay hindi |
| magpalit      | 16 GB                                  | Tumatakbo `omniroute-113-5` nang may swap off (`MemorySwapMax=0`) kaya ang isang runaway build ay pinutol sa cap nito sa halip na palitan ang kahon                                                                                                                                                                                                                                              |
| `/tmp`        | **12 GB tmpfs = RAM**                  | anumang nakaparada doon ay alaala; Ang mga natira ay winalis pagkatapos ng 3 oras                                                                                                                                                                                                                                                                                                                |
| CPU           | nag-load ng 60 sa 32 core na sinusunod | bago ang mga quota, isang Turbopack build (~ 1166 % CPU) at isang coverage suite sa parehong kahon ang nagpagutom sa tibok ng puso ng ibang mga tagapakinig (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                |
| mga mananakbo | **7 tagapakinig** (2026-10-28)         | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-5` ay nagdadala din ng `omni-build-60gb`; `omniroute-113-3/-4/-8` ay tinanggal mula sa repo (2026-10-28)                                                                                                                                                                                                                                     |

Ang mga limitasyon ay nakatira sa `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` ng bawat unit (mga dating value na pinanatili bilang `override.conf.bak-20261018`) at nailapat nang live nang walang pag-restart `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` —, kaya walang gumaganang trabaho ang nahawakan. Binago ang mga label sa pamamagitan ng mga runner na API (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` / `gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), live din.

## I-install ang janitor (isang beses, sa kahon)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): every 30 min, log to /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

Kinakailangan ang `lsof` : pinatutunayan ng janitor na ang isang landas ay idle na may isang snapshot ng mga bukas na file bago ito alisin, at kung wala ang tool ay wala itong inaalis at sinabi ito (exit 1). Subukan ang anumang pagbabago sa `--dry-run` muna — ito ay nagpi-print nang eksakto kung ano ang gagawin nito at wala itong hinawakan.

Ano ang ginagawa nito sa bawat pagtakbo: winalis ang sarili nating mga tira (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) pagkatapos **3 h sa tmpfs** at 24 h sa disk `_work/_temp`; mga alerto sa isang `next-build` na mas matanda sa 75 min at pinapanatili itong tumatakbo; prunes 48 h-old checkout ng mga runner na ang unit ay **huminto** ; mga alerto sa disk ≥ 85 %, memory PSI `full/avg60` ≥ 10 %, at mas maraming tagapakinig kaysa sa `MAX_ACTIVE_RUNNERS` (na may omniroute/other breakdown). Exit 1 = pansin kailangan; basahin ang log.

Ang lumipas na oras lamang ay hindi nagpapatunay na ang isang proseso ay naulila. Ang janitor ay hindi kailanman nagpapadala ng mga senyales batay sa edad. Ang mga kasalukuyang pangalan ng kapaligiran `ZOMBIE_BUILD_MAX_MIN` at `ZOMBIE_BUILD_COMM` ay nananatiling suportado para sa mga pagsasaayos ng cron. Bago linisin ang isang pinaghihinalaang ulila, kumpirmahin na ang eksaktong GitHub na trabaho nito ay terminal at tukuyin ang mga prosesong kabilang sa trabahong iyon. Kapag hindi na-renew ng `Runner.Listener` ang trabaho nito, ipinapakita ng `_diag/Runner_*.log` ang `POST request to …/renewjob timed out after 100 seconds`, iniuulat ng API ang trabahong `completed` (failure) humigit-kumulang sampung minuto pagkatapos ng huling matagumpay na pag-renew, at patuloy na tumatakbo `next-build` nang walang kalakip na trabaho (2026-10-18: nabigo ang Build of #17066 noong 19:43 at ang build nito ay GB pa rin ang nakalipas). Kumpirmahin ang ref sa pinakabagong `_diag/Worker_*.log`, pagkatapos ay SIGTERM lang ang build tree ng PID — `next-build`, `npm run build`, `build-next-isolated.mjs` at ang mga manggagawa `_work`. Huwag kailanman hawakan ang `Runner.Listener`, `RunnerService.js` o `Runner.Worker`: iniuulat ng manggagawa ang trabaho bilang nakansela at ang nakikinig ay babalik online nang mag-isa.

## Mga unit ng runner: KillMode

Iniiwang buhay ng default na `KillMode=process` ng runner ang `Runner.Worker → npm → next-build`
kapag itinigil o ni-restart ang isang unit — patuloy na kumakain ng RAM at
CPU ang isang naulilang build kahit walang nakakabit na job. May drop-in ang bawat OmniRoute unit
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
na may `KillMode=mixed`: SIGTERM muna sa listener, pagkatapos ay SIGKILL sa buong cgroup sa
`TimeoutStop`. Magkakabisa ito sa susunod na restart ng unit — mag-restart ng **isang runner lamang sa
bawat pagkakataon, at kapag idle lamang**, na nasa iisang command ang pag-check kung idle at ang restart.

## Mga panuntunan sa pagpapatakbo

- **Isang Turbopack build lamang sa bawat pagkakataon — ipinapatupad sa pamamagitan ng label.** Ang bawat job na nagpapatakbo ng buong Turbopack
  `next build` ay tina-target ang `[self-hosted, omni-build, omni-build-60gb]`, at **`omniroute-113-5`** lamang ang may taglay ng
  label na iyon: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`, `preview-artifact`,
  ang nightly a11y build (#16853), at ang **amd64** ng `docker-publish.yml` (webpack sa loob ng BuildKit —
  nag-panic doon ang Turbopack, run 33253576569). Nananatili sa `ubuntu-24.04-arm` ang arm64 Docker leg.
  Magkapareho ang concurrency group na `heavy-build-main` ng amd64 ng `docker-publish` at ng `ci.yml` `Build`
  (`cancel-in-progress: false`). Kailangang nasa `omniroute-113-5` ang Docker Engine. Hindi kasya sa
  78 GB ang pangalawang Turbopack slot (2 × 33–37 GB kasama ang natitirang ginagamit ng makina); ligtas
  lamang ang pangalawang slot para sa mga webpack build.
- **Tumatakbo sa hosted runner ang mga Build ng pull request (2026-10-18).** Naaabot lamang ng `ci.yml`
  `Build` ang `omni-build` para sa `push` at `workflow_dispatch`; ang bawat `pull_request` (mula man sa
  sariling pinagmulan o fork) at `merge_group` Build ay tumatakbo sa `ubuntu-latest` gamit ang webpack.
  Noong bawat PR mula sa sariling pinagmulan ay ipinapadaan sa slot, inokupa ito ng isang Turbopack
  Build nang 29–58 min, pumila ang 18 Build nang hanggang 18 h, at isang beses lamang sa 40 job nakuha
  ng sariling push Build ng release line ang slot. Sa hosted runner, inaabot ng 8–12 min ang parehong
  PR Build kasabay ng iba pang job ng PR. Ang Turbopack, ang bundler na ipinapadala ng `npm-publish`,
  ay patuloy na sinusubukan sa release line sa pamamagitan ng nightly a11y build ng default branch
  (04:41 UTC), ng bawat push o dispatch Build na nakaaabot sa slot, at ng `npm-publish` mismo.
  Itinatakda ng `tests/unit/build/heavy-build-queue.test.ts` ang apat-na-kondisyong gate.
- **Huwag kailanman paliitin ang Turbopack slot nang mas mababa sa nasukat na pangangailangan nito.**
  Noong 2026-10-18, 18:06, ibinaba ang slot mula 56G/60G patungong 40G/44G upang magkaroon ng puwang
  para sa `omni-release`. Nanatili ang compile phase sa `MemoryHigh` sa buong pagtakbo nito (memory PSI
  `full` na 30–43 %), at hindi ma-renew ng `Runner.Listener`, na kabahagi ng cgroup, ang job nito.
  Ibinalik sa araw ding iyon ang 56G/60G na itinakda ng may-ari noong 2026-10-17. Kapag mas mababa sa
  halagang iyon, hindi nabibigo ang build; nagta-thrash ito, at nawawala ang job.
- **May sariling slot ang Release-Green (2026-10-18).** Bago nito, parehong tumatakbo sa `omni-build`
  ang mga validation ng Release-Green: sa bawat push (~10/oras, 97 sa 100 push run ang nakansela habang
  gumagana sa loob ng isang araw) at tatlong ~2 h na buong sweep bawat araw (naghintay nang 6 h ang
  05:29 sweep para sa slot) — ilang ulit na lumabis sa kapasidad ang paggamit sa nag-iisang build slot,
  at naghintay nang ilang oras ang mga PR Build mula sa sariling pinagmulan. Tina-target na ngayon ng
  `release-green` at `main-green` ang `omni-release` (`omniroute-113-6` lamang) gamit ang
  `OMNIROUTE_USE_TURBOPACK=0`, at hindi na kinakansela ng mas bagong push ang nasimulang run (pinagsasama
  pa rin ng pending slot ang dagsa). Itinatakda ng `tests/unit/build/runner-capacity-routing.test.ts`
  ang routing, ang paglipat sa webpack, at ang kundisyong walang anumang nasa `omni-release` ang
  bumubuo gamit ang Turbopack.
- **Magaan na pool: `omni-light`.** Pinapatakbo ng `omniroute-113` at `omniroute-113-2` ang mga nightly
  na nangangailangan ng backend-only na `next build` (~5–6 GB; webpack) at ang `quality.yml`
  `lint-guard`. May `MemoryHigh=4G` ang `omniroute-113` hanggang 2026-10-18 — gumugol doon ang promptfoo
  build ng 54 minuto sa paulit-ulit na pagre-reclaim ng memory; inaalis ng 8 GB ang throttling.
- **Sadyang mas kaunti ang mga listener.** Apat na OmniRoute unit ang na-disable noong 2026-08-29 —
  ang bawat karagdagang listener ay isa pang gumagamit ng memory budget sa itaas. Ang limitasyon ng
  janitor ay 8 (`MAX_ACTIVE_RUNNERS=8` sa cron): binibilang nito ang bawat `Runner.Listener` sa makina,
  at nagdaragdag ang OmniHeuris + OmniMind ng dalawa sa aming lima.
- **Nananatiling naka-host ang mga job ng Unit at Vitest.** Ipinapadala lang ng `ci.yml` ang mga unit shard nito at
  ang Vitest job sa `[self-hosted, omni-ci]` kapag ang repository variable na `vars.USE_VPS_TEST_RUNNER` ay
  `true`, at para lang sa mga `pull_request` run mula sa parehong repository; nananatili ang mga fork, `merge_group`
  at mga push sa `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). Ang variable ay
  `false`. Noong 2026-10-28, inabot ng 250–270 s ang `npm ci` sa tatlong 4-core na `omni-ci` listener at umabot ang bawat
  unit shard sa 30-minutong limitasyon ng job, kumpara sa ~634 s para sa isang naka-host na shard, habang nasa load
  17–24 ang makina. Binura ang mga listener. Huwag muling i-on ang variable nang walang mga listener na sapat ang
  laki para sa isang unit shard.
- **Huwag kailanman linisin nang manu-mano ang `/tmp` o `_work` habang abala ang alinmang runner.**
  Isang check-then-delete na may pagitan sa dalawang hakbang ang dahilan kung bakit nawala ang `_work`
  ng isang aktibong Build job noong 2026-08-27. Isinasagawa ng janitor ang pagsusuri at pag-aalis sa
  iisang hakbang; hayaan itong gawin iyon.
- Kinakansela ng paghinto sa runner habang tumatakbo ang job ang job na iyon (aktuwal na naobserbahan):
  gamitin lamang ang `systemctl stop` kapag walang `Runner.Worker` child ang listener nito — at gawin
  iyon sa iisang command.
- Hindi dapat maglagay ang mga workflow ng mga artifact sa `/tmp` (nasa RAM ito). Mag-download sa
  `$RUNNER_TEMP` (nasa disk, hiwalay para sa bawat runner) — umabot nang 27–32 minuto bago mapunta sa
  tmpfs ang 1.3 GB na `next-build` artifact, at 2 minuto upang i-upload mula sa disk.
- Para lamang sa homologation ang `.15` VPS — hindi ito kailanman nagpapatakbo ng mga CI runner.

## Naka-host na lane (mga runner na naka-host sa GitHub)

Ang repository ay pag-aari ng organisasyong `cheaper-inference`, na nasa **Team** plan: **60
magkakasabay na naka-host na job**, na pinagsasaluhan ng bawat repository sa organisasyon, bawat pagsusuri sa PR,
bawat workflow na nati-trigger ng push, at ng default setup ng CodeQL. Ang mga numero sa ibaba ay sinukat noong nasa
**Pro** plan pa (40 magkakasabay na naka-host na job). Sinukat noong 2026-10-18 habang may
merge campaign (~10 merge/oras sa `release/v3.8.52`): **2,500 workflow run ang ginawa sa loob ng
24 oras**, 44 push sa branch sa loob ng 6 na oras, **106 naka-host na job ang nakapila** habang naghintay nang
ilang oras ang mga pagsusuri sa PR at na-merge ang mga PR nang wala ang mga ito. Siyam na workflow ang tumakbo sa bawat push sa branch:

| kada push sa `release/v*`                   | mga naka-host na job | kinalabasan sa panahon ng dagsa                                     | mula 2026-10-18                                                                        |
| ------------------------------------------- | -------------------: | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `ci.yml` (buong matrix)                     |          hanggang 30 | kinansela ng susunod na push, 24 sa 24 sa isang araw                | hindi sinisimulan sa mga push sa `release/**` (PR run + Release-Green)                 |
| `quality.yml`                               |                   ~6 | kinansela, 23 sa 23                                                 | hindi sinisimulan sa mga push sa `release/**`                                          |
| `Release-Green` `--quick`                   |                    0 | tumakbo sa `omni-build`, kinansela ang 97 sa 100                    | `omni-release` slot, hindi kailanman kinakansela, pinagsasama ang nakabinbing run      |
| `Lock released branch`, `OpenSSF Scorecard` |                    2 | isang nakapilang run kada push                                      | isang run kada ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)                |
| `Release acceptance` (shadow report)        |                    1 | isang naka-host na `npm ci` kada push, hindi kailanman kinansela    | walang pagbabago — kandidato para sa `paths:` filter                                   |
| `Publish to Docker Hub` → `Deploy to VPS`   |                    2 | kinansela kada push; nakikipag-agawan ang amd64 leg sa `omni-build` | walang pagbabago — deployment channel ng may-ari                                       |
| CodeQL default setup (`dynamic`)            |                    4 | `javascript-typescript`, `actions`, `c-cpp`, `python` kada push     | walang pagbabago — Settings → Code security; walang nasusuri rito ang `c-cpp`/`python` |

Tinitiyak ng `tests/unit/build/push-storm-diet.test.ts` na para lang sa `main` ang push trigger ng `ci.yml` at
`quality.yml`. Side effect: hindi na nakakatanggap ang Codecov ng batayang upload kada release push (ang
step ay para lamang sa impormasyon at may `continue-on-error`); hindi naaapektuhan ang coverage gate sa repo at ang komento sa PR.

**Hindi maaayos ng mas malaking self-hosted capacity ang pila ng mga naka-host na job.** Ang devbox
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) ay maaaring mag-host ng runner, ngunit pinananatili na ng mga agent session
ang load nito sa 20–26, walang Docker daemon ang agent container, at ang naka-host na lane ang
punô. Ang `.113` box ay may 71 GB na libreng espasyo at load na 5–8 sa parehong sandali; ang limitasyon nito
ay ang badyet sa memory kada listener na nasa itaas (hanggang 6 na listener), hindi ang CPU. Ang natitirang mga opsyon
ay nasa proseso: i-merge ang mga PR ng campaign sa pamamagitan ng Mergify queue (`label=queue`, nagsasalo ang
mga batch sa isang `merge_group` CI run sa halip na tig-isang run kada PR at isa pa kada push), bawasan ang mga
wika sa default setup ng CodeQL, at i-filter ang `release-acceptance.yml` ayon sa mga file na binabasa nito.
