# Self-Hosted Runner Box Operations (.113 pool) (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

자체 호스팅 풀은 **.113** 박스(`tomni-proxmox-113`)에서 실행됩니다. 2026-10-18부터 각
OmniRoute 러너에는 **하나의 역할**과 하나의 레이블이 할당되며, 워크로드 측정값에 맞춘 메모리/CPU 예산이
적용됩니다. Turbopack 슬롯에는 빌드에 필요한 만큼의 리소스가 제공되고, 다른 슬롯들은
측정된 최대 사용량에 맞게 할당됩니다. Turbopack 빌드가 Release-Green
webpack 빌드 및 lint 작업과 동시에 실행될 때만 박스가 리소스를 초과 할당합니다. 이때 호스트 스왑(16 GB)이 이를 흡수하며, 풀 리퀘스트 Build는
호스팅 러너에서 실행되므로 Turbopack 슬롯은 대부분 유휴 상태입니다.

| 러너                 | 레이블          | 역할                                                                                                                                      | `MemoryHigh` / `MemoryMax` | `CPUQuota` |
| -------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------- |
| `omniroute-113-5`    | `omni-build`    | Turbopack 빌드: `ci.yml` `Build`(push/dispatch 전용), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, 야간 a11y 빌드 | 56 GB / 60 GB (스왑 0)     | 1600 %     |
| `omniroute-113-6`    | `omni-release`  | Release-Green(`release-green` + `main-green`), webpack 빌드                                                                               | 20 GB / 24 GB (스왑 4 GB)  | 800 %      |
| `omniroute-113-2`    | `omni-light`    | 야간 작업(Schemathesis, promptfoo, garak, k6) 및 `quality.yml` `lint-guard`                                                               | 12 GB / 16 GB (스왑 4 GB)  | 600 %      |
| `omniroute-113`      | `omni-light`    | 위와 동일한 풀                                                                                                                            | 8 GB / 12 GB               | 400 %      |
| OmniHeuris, OmniMind | (각 리포지토리) | Dependabot 전용(각각 최대 155 MB, 2026-10-18)                                                                                             | 4 GB / 6 GB                | 각각 200 % |

2026-10-18 측정 결과:

| 리소스    | 값                      | 스케줄링 측면에서의 의미                                                                                                                                                                                                                                                                                                                                                                                           |
| --------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RAM / CPU | **78 GB / 32코어**      | 제한을 두지 않은 Turbopack 프로덕션 빌드는 최대 49 GB를 사용했습니다(`tests/unit/ci-build-bundler-webpack.test.ts`). Next 16.3.8에서는 컴파일 단계만으로도 약 40 GB를 점유합니다(`next-build`의 RSS 36 GB와 각각 3 GB를 사용하는 로더 워커 17개, 2026-10-18 측정). webpack 빌드는 약 14–16 GB를 사용합니다. Turbopack 빌드 하나와 webpack 빌드 하나는 동시에 실행할 수 있지만, Turbopack 빌드 두 개는 불가능합니다 |
| 스왑      | 16 GB                   | `omniroute-113-5`는 스왑을 비활성화한 상태(`MemorySwapMax=0`)로 실행되므로, 제어 불능 상태의 빌드는 박스 전체를 스왑시키는 대신 설정된 한도에서 중단됩니다                                                                                                                                                                                                                                                         |
| `/tmp`    | **12 GB tmpfs = RAM**   | 여기에 저장되는 모든 것은 메모리를 사용하며, 남은 파일은 3시간 후 정리됩니다                                                                                                                                                                                                                                                                                                                                       |
| CPU       | 32코어에서 부하 60 관측 | 할당량을 적용하기 전에는 Turbopack 빌드 하나(약 1166 % CPU)와 커버리지 스위트가 동일한 박스에서 함께 실행되면서 다른 리스너의 하트비트가 리소스를 받지 못했습니다(`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                             |
| 러너      | **리스너 6개**          | OmniRoute 4개 + OmniHeuris + OmniMind이며, `omniroute-113-3/-4/-7/-8`은 비활성화되어 있습니다(`systemctl enable --now`로 하나를 다시 활성화할 수 있음)                                                                                                                                                                                                                                                             |

제한 설정은 각 유닛의 `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`에
있으며(이전 값은 `override.conf.bak-20261018`로 보관), `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…`를 통해 실시간으로 적용되었습니다. 재시작하지 않았으므로
실행 중인 작업에는 영향을 주지 않았습니다. 레이블 역시 러너 API를 통해
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`) 실시간으로 변경됩니다.

## janitor 설치(최초 1회, 해당 머신에서)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron(root): 30분마다 실행하고 /var/log/runner-janitor.log에 기록
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof`는 필수입니다. janitor는 경로를 제거하기 전에 열린 파일을 한 번
스냅샷으로 확인하여 해당 경로가 유휴 상태임을 검증하며, 이 도구가 없으면 아무것도
제거하지 않고 그 사실을 알립니다(exit 1). 모든 변경 사항은 먼저 `--dry-run`으로
시험하세요. 실제로 수행할 작업을 정확히 출력하며 아무것도 건드리지 않습니다.

매번 실행할 때 수행하는 작업: **tmpfs에서는 3시간**, 디스크의
`_work/_temp`에서는 24시간이 지난 자체 잔여물(`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`)을 정리합니다. 75분보다 오래된 `next-build`를
종료합니다(어떤 작업도 그렇게 오래 실행되지 않습니다. 2026-08-27에는 GitHub가
작업을 유실된 것으로 선언한 후에도 한 작업이 70분 동안 실행되었습니다). 유닛이
**중지된** runner의 48시간 이상 된 체크아웃을 제거합니다. 디스크 사용률 ≥ 85%,
메모리 PSI `full/avg60` ≥ 10%, listener 수가 `MAX_ACTIVE_RUNNERS`보다 많은 경우
경고합니다(omniroute/기타 내역 포함). Exit 1 = 확인이 필요하므로 로그를 읽으세요.

75분 규칙은 GitHub가 이미 포기한 작업의 빌드를 감지하지 못합니다.
`Runner.Listener`가 작업을 갱신할 수 없으면 `_diag/Runner_*.log`에
`POST request to …/renewjob timed out after 100 seconds`가 표시되고, 마지막 갱신 성공
후 약 10분이 지나면 API가 작업을 `completed`(실패)로 보고하지만 `next-build`는
연결된 작업 없이 계속 실행됩니다(2026-10-18: #17066의 Build는 19:43에 실패 처리되었지만,
해당 빌드는 5분 후에도 여전히 40 GB를 점유하고 있었습니다). 최신
`_diag/Worker_*.log`에서 ref를 확인한 다음, PID를 기준으로 빌드 트리만 SIGTERM으로
종료하세요. 대상은 `next-build`, `npm run build`, `build-next-isolated.mjs` 및
`_work` worker입니다. `Runner.Listener`, `RunnerService.js` 또는 `Runner.Worker`는
절대 건드리지 마세요. worker가 작업을 취소된 것으로 보고하면 listener는 자동으로
다시 온라인 상태가 됩니다.

## Runner 유닛: KillMode

runner의 기본 `KillMode=process`는 유닛이 중지되거나 재시작될 때
`Runner.Worker → npm → next-build`를 계속 실행된 상태로 남깁니다. 이 고아 빌드는
연결된 작업 없이 RAM과 CPU를 계속 소모합니다. 모든 OmniRoute 유닛에는
`KillMode=mixed`가 설정된 drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)이
있습니다. 먼저 listener에 SIGTERM을 보내고, `TimeoutStop` 시점에 전체 cgroup에
SIGKILL을 보냅니다. 이 설정은 유닛이 다음에 재시작될 때 적용됩니다. **한 번에
runner 하나만, 유휴 상태일 때에만** 재시작하고, 유휴 상태 확인과 재시작을 동일한
명령에서 수행하세요.

## 운영 규칙

- **한 번에 하나의 Turbopack 빌드만 실행 — 레이블로 강제.** 전체 Turbopack
  `next build`를 실행하는 모든 작업은 `[self-hosted, omni-build]`를 대상으로 하며, 해당
  레이블은 **`omniroute-113-5`**에만 지정되어 있다: `ci.yml`의 `Build`, `npm-publish.yml`의
  `publish`, `nightly-v4-build`, `preview-artifact`, 야간 a11y 빌드(#16853), 그리고
  `docker-publish.yml`의 **amd64**(BuildKit 내부에서는 webpack 사용 — Turbopack이 거기서
  패닉을 일으킴, 실행 33253576569). arm64 Docker 단계는 계속 `ubuntu-24.04-arm`에서 실행된다.
  `docker-publish` amd64는 `ci.yml`의 `Build`와 `heavy-build-main` 동시 실행 그룹을 공유한다
  (`cancel-in-progress: false`). Docker Engine은 `omniroute-113-5`에 있어야 한다. 두 번째
  Turbopack 슬롯은 78 GB에 들어가지 않는다(2 × 33–37 GB에 시스템의 나머지 사용량까지 포함).
  두 번째 슬롯은 webpack 빌드에만 안전하다.
- **풀 리퀘스트 빌드는 호스팅 러너에서 실행(2026-10-18).** `ci.yml`의 `Build`는 `push`와
  `workflow_dispatch`에서만 `omni-build`에 도달한다. 모든 `pull_request`(자체 origin 또는 포크)와
  `merge_group` Build는 webpack을 사용해 `ubuntu-latest`에서 실행된다. 자체 origin PR을 모두
  해당 슬롯으로 라우팅했을 때 Turbopack Build가 슬롯을 29–58분 동안 점유했고, 18개의 Build가
  최대 18시간 동안 대기했으며, 릴리스 라인 자체의 push Build는 40개 작업 중 한 번만 슬롯을
  확보했다. 호스팅 러너에서는 동일한 PR Build가 해당 PR의 다른 작업과 함께 8–12분 만에
  완료된다. `npm-publish`가 배포하는 번들러인 Turbopack은 기본 브랜치의 야간 a11y 빌드
  (04:41 UTC), 슬롯에 도달하는 모든 push 또는 dispatch Build, 그리고 `npm-publish` 자체를
  통해 릴리스 라인에서 계속 검증된다. `tests/unit/build/heavy-build-queue.test.ts`가 이
  네 가지 조건의 게이트를 고정한다.
- **Turbopack 슬롯을 측정된 필요량보다 작게 설정해서는 안 된다.** 2026-10-18 18:06에
  `omni-release`를 위한 공간을 확보하려고 슬롯을 56G/60G에서 40G/44G로 낮췄다. 컴파일 단계는
  실행 내내 `MemoryHigh`에 머물렀고(memory PSI `full` 30–43 %), 동일한 cgroup을 공유하는
  `Runner.Listener`는 작업을 갱신할 수 없었다. 2026-10-17에 소유자가 설정한 56G/60G는 같은 날
  복원되었다. 이 값보다 낮으면 빌드가 실패하는 것이 아니라 스래싱이 발생하고 작업이 유실된다.
- **Release-Green에는 자체 슬롯이 있음(2026-10-18).** 그전까지 두 Release-Green 검증은 모두
  `omni-build`에서 실행되었다. 모든 push(시간당 약 10회, 하루 동안 push 실행 100개 중 97개가
  작업 도중 취소됨)와 하루 세 번의 약 2시간짜리 전체 스윕(05:29 스윕은 슬롯을 6시간 기다림)이
  단일 빌드 슬롯을 용량의 몇 배로 초과 구독했고, 자체 origin PR Build는 수 시간 동안 대기했다.
  이제 `release-green`과 `main-green`은 `OMNIROUTE_USE_TURBOPACK=0`으로 `omni-release`
  (`omniroute-113-6` 전용)를 대상으로 하며, 시작된 실행은 더 새로운 push가 발생해도 더 이상
  취소되지 않는다(대기 슬롯에서는 여전히 폭주 작업이 하나로 축약된다).
  `tests/unit/build/runner-capacity-routing.test.ts`는 라우팅과 webpack 전환을 고정하고,
  `omni-release`에서 Turbopack으로 빌드되는 항목이 없음을 보장한다.
- **경량 풀: `omni-light`.** `omniroute-113`과 `omniroute-113-2`는 백엔드 전용
  `next build`(약 5–6 GB, webpack)가 필요한 야간 작업과 `quality.yml`의 `lint-guard`를
  실행한다. `omniroute-113`은 2026-10-18까지 `MemoryHigh=4G`였다. 그곳에서 promptfoo 빌드는
  54분 동안 메모리를 회수하며 간신히 진행되었고, 8 GB로 설정하면 스로틀링이 사라진다.
- **리스너 수를 의도적으로 줄임.** 2026-08-29에 OmniRoute 유닛 네 개를 비활성화했다. 리스너가
  추가될 때마다 위 메모리 예산을 사용하는 테넌트가 하나씩 늘어나기 때문이다. janitor의 상한은
  6이다(cron의 `MAX_ACTIVE_RUNNERS=6`). 이 값은 서버의 모든 `Runner.Listener`를 세며,
  OmniHeuris와 OmniMind가 네 개의 리스너에 두 개를 추가한다.
- **러너가 하나라도 작업 중일 때는 `/tmp` 또는 `_work`를 절대로 수동으로 정리하지 않는다.**
  검사와 삭제 사이에 간격이 있는 확인 후 삭제 방식 때문에 2026-08-27에 실행 중이던 Build 작업의
  `_work`가 유실되었다. janitor는 확인과 제거를 한 단계로 수행하므로 그대로 맡긴다.
- 작업 도중 러너를 중지하면 작업이 취소된다(실제 환경에서 확인됨). `systemctl stop`은 해당
  리스너에 `Runner.Worker` 자식 프로세스가 없을 때만 실행하며, 반드시 하나의 명령으로 수행한다.
- 워크플로는 아티팩트를 `/tmp`에 두어서는 안 된다(`/tmp`는 RAM이다). `$RUNNER_TEMP`로
  다운로드해야 한다(러너별 디스크 공간). 1.3 GB `next-build` 아티팩트를 tmpfs에 저장하는 데
  27–32분이 걸렸지만, 디스크에서는 업로드하는 데 2분이 걸렸다.
- `.15` VPS는 검증 환경 전용이며 CI 러너를 절대로 실행하지 않는다.

## 호스팅 레인(GitHub 호스팅 러너)

이 계정은 **Pro** 플랜을 사용하며, **동시 호스팅 작업 40개**를 모든 PR 검사,
모든 푸시 트리거 워크플로 및 CodeQL 기본 설정이 공유합니다. 2026-10-18의
병합 캠페인 중(`release/v3.8.52`에서 시간당 약 10회 병합) 측정한 결과, **24시간 동안
2,500개의 워크플로 실행이 생성**되었고, 6시간 동안 해당 브랜치에 44회 푸시되었으며,
PR 검사가 몇 시간 동안 대기하는 사이 **106개의 호스팅 작업이 큐에 쌓였고** 검사 없이
PR이 병합되었습니다. 해당 브랜치에 푸시할 때마다 9개의 워크플로가 실행되었습니다.

| `release/v*`에 대한 푸시당                  | 호스팅 작업 | 폭주 상황에서의 결과                                         | 2026-10-18 이후                                                                    |
| ------------------------------------------- | ----------: | ------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `ci.yml` (전체 매트릭스)                    |   최대 30개 | 다음 푸시로 인해 취소됨, 하루 동안 24개 중 24개              | `release/**` 푸시에서 시작되지 않음(PR 실행 + Release-Green)                       |
| `quality.yml`                               |          ~6 | 취소됨, 23개 중 23개                                         | `release/**` 푸시에서 시작되지 않음                                                |
| `Release-Green` `--quick`                   |           0 | `omni-build`에서 실행, 100개 중 97개 취소                    | `omni-release` 슬롯, 취소되지 않으며 대기 중인 실행은 하나로 통합됨                |
| `Lock released branch`, `OpenSSF Scorecard` |           2 | 푸시당 하나의 실행이 큐에 추가됨                             | ref당 한 번 실행(`tests/unit/build/hosted-lane-concurrency.test.ts`)               |
| `Release acceptance` (섀도 보고서)          |           1 | 푸시당 하나의 호스팅 `npm ci`, 취소되지 않음                 | 변경 없음 — `paths:` 필터 적용 후보                                                |
| `Publish to Docker Hub` → `Deploy to VPS`   |           2 | 푸시마다 취소됨. amd64 단계는 `omni-build`에서 경쟁          | 변경 없음 — 소유자의 배포 채널                                                     |
| CodeQL 기본 설정(`dynamic`)                 |           4 | 푸시당 `javascript-typescript`, `actions`, `c-cpp`, `python` | 변경 없음 — Settings → Code security. 여기서 `c-cpp`/`python`은 검사할 항목이 없음 |

`tests/unit/build/push-storm-diet.test.ts`는 `ci.yml`과 `quality.yml`의 푸시 트리거를
`main` 전용으로 고정합니다. 부작용으로 Codecov는 더 이상 릴리스 푸시마다 기본 업로드를
받지 않습니다(해당 단계는 정보 제공용이며 `continue-on-error`가 설정됨). 저장소 내
커버리지 게이트와 PR 코멘트에는 영향이 없습니다.

**자체 호스팅 용량을 늘려도 호스팅 큐 문제는 해결되지 않습니다.** devbox
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB)는 러너를 호스팅할 수 있지만, 에이전트 세션으로
인해 이미 부하가 20–26으로 유지되고 있고, 에이전트 컨테이너에는 Docker 데몬이 없으며,
포화된 레인은 호스팅 레인입니다. 같은 시점에 `.113` 박스에는 71 GB의 여유 공간이 있었고
부하는 5–8이었습니다. 이 박스의 제약은 CPU가 아니라 위에 설명한 리스너별 메모리
예산(최대 리스너 6개)입니다. 남은 수단은 프로세스 측면의 조치입니다. 캠페인 PR을
Mergify 큐(`label=queue`)를 통해 병합하고, 배치가 PR당 한 번과 푸시당 한 번씩 실행하는
대신 하나의 `merge_group` CI 실행을 공유하도록 하며, CodeQL 기본 설정 언어를 줄이고,
`release-acceptance.yml`이 읽는 파일을 기준으로 필터링해야 합니다.
