# Merge Queue & Manual Merge-Train Runbook (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## 릴리스 브랜치에 착륙하기

옴니 큐는 `release/vX.Y.Z` 로의 착륙을 관리합니다. PR 시작하기 전에 기본 분기의 `config/merge-queue/config.json` 에서 최상위 `mode` 읽으십시오. [옴니큐를](OMNI_QUEUE.md) 참조하세요.

- **`shadow`** 유효성 검사를 실행하고 랜딩을 수동 병합으로 둡니다. 최종 헤드에서 승인된 PR 에 `omni-queue` 적용합니다. `npm run queue -- why <PR>` 로 적격성을 확인하세요. `npm run queue -- history --base <branch>` 에서 해당 헤드에 대한 평결을 기다립니다. `would-land` 로 진행하세요. `culprit-found` 또는 `would-dequeue` 에서 병합을 보류하고 원인을 수정하세요.
- **그림자 예외.** 현재 베이스 팁에 대해 녹색 풀 CI 있는 열차는 별도의 대기열 판정 없이 진행할 수 있습니다. PR 헤드에 이미 현재 베이스 팁이 포함되어 있는 경우에도 동일한 예외가 적용됩니다.
- **`live`** `omni-queue` 레이블을 사용하여 착륙을 트리거합니다. 대기열만으로도 PR 도착합니다. 병합 명령을 그대로 두고 큐에 직접 푸시합니다.

모든 착륙에는 소유자의 승인과 해당 필수 점검이 필요합니다. 소유자가 착륙을 승인한 후에만 `omni-queue` 적용하십시오. 대기열에 있는 PRs 보호된 경로에 접근하려면 해당 PR 에 대한 소유자의 `protected-approved` 결정도 필요합니다.

"활성 릴리스에 녹색 게이트 필요" 규칙 세트에는 헤드에 녹색 `Gate / CI` 및 `Gate / Quality` 필요합니다. 레드 게이트를 우회하기 위해 `--admin` 사용하지 마십시오. 릴리스 동결 블록은 동결된 분기로 병합됩니다. [엄격한 규칙 21을](HARD_RULES_DETAIL.md) 참조하십시오. 다른 세션이 작동 중인 풀 요청에 레이블을 지정하거나 병합하거나 푸시하지 마세요. [엄격한 규칙 22를](HARD_RULES_DETAIL.md) 참조하십시오.

## 기차 풀 요청

1. 현재 릴리스 베이스 팁에서 열차 분기를 시작합니다. 병합 커밋을 사용하여 승인된 정확한 회원 헤드를 통합합니다. 스쿼시 및 리베이스를 방지하여 커밋 기록을 보존합니다.
2. train 분기에 대해 하나의 풀 요청을 엽니다. 현재 기본 팁에서 자체 전체 CI 로 해당 PR 검증합니다. 착륙하기 전에 베이스 팁과 승인된 멤버 헤드를 다시 확인하십시오. 검증된 후보가 변경되면 열차와 해당 CI 새로 고칩니다.
3. 적용 가능한 대기열 모드에서 병합 커밋으로 기차 PR 착륙시킵니다. 라이브 모드에서 대기열의 `merge-ff` 랜딩 방법은 병합 커밋을 유지합니다. 원래 멤버 헤드는 릴리스 분기에서 연결할 수 있게 됩니다. GitHub PRs 멤버를 병합된 것으로 표시하고 커밋은 해당 작성자를 유지합니다.

공개 예는 [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071) 입니다. 18명의 멤버 PRs 결합하고 2026년 11월 24일에 병합 커밋에 도달했습니다.

`main` 에서 다음 릴리스 분기로의 동기화도 병합 커밋을 통해 이루어집니다. 나중에 동기화하려면 `main` 조상을 보존해야 합니다. [작업 트리 격리를](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash) 참조하십시오.

## 로컬 병합 열차 유효성 검사기

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

유효성 검사기는 기본 및 PR 헤드를 가져와 일회용 작업 트리에 결합합니다. 결과 트리에서 패리티 스위트를 한 번 실행합니다. 실패한 헤드 가져오기 또는 병합 충돌로 인해 해당 PR 제거되고 스크립트는 나머지 PRs 계속 사용합니다.

- **`--plan`** 작업 트리를 생성하거나 리모컨에 접속하지 않고 선택한 모드의 단계를 인쇄하고 종료합니다. 이를 `--fast` 와 결합하여 빠른 계획을 검사합니다.
- **`--fast`** 공통 정적 게이트, `tests/unit/` 아래에서 선택된 변경된 `node:test` 파일 및 `npm run test:vitest` 를 실행합니다. 고속 모드를 사용할 때 누적된 팁에 대해 하루에 한 번 이상 전체 로컬 검증을 실행하십시오.
- **전체 모드** 전체 전용 정적 게이트를 추가하고 `npm run test:unit` 및 `npm run test:vitest` 실행합니다.

기본 프로브를 사용할 수 있는 경우 실패한 정적 게이트가 손대지 않은 베이스에서 다시 실행됩니다. 스크립트는 상속된 실패를 보고하고 인식된 모든 위반 줄도 베이스에 나타나고 총 개수가 증가하지 않은 경우 계속됩니다.

| 출구 | 의미                                                                                                                    |
| ---- | ----------------------------------------------------------------------------------------------------------------------- |
| `0`  | 계획을 인쇄하거나 제품군을 완료했습니다. 제품군 요약에는 상속된 정적 오류 및 제거된 PRs 나열됩니다.                     |
| `1`  | 잘못된 인수, Git 체크아웃 없음, 실행 전 실패 또는 PR 탑승 없음.                                                         |
| `2`  | 제품군 확인에 실패하여 상속 자격이 없습니다. 운영자는 배치를 양분하고 문제가 있는 PR 배출한 후 다시 실행할 수 있습니다. |

현지 패스는 소유자의 서류에 대해서만 진단 증거를 제공합니다. 각 착륙에는 여전히 소유자 승인, 자체 필수 확인 및 적용 가능한 경우 섀도우 큐 판정이 필요합니다.

## 계층화

- **당 PR.** CI 및 품질 선택은 변경된 경로를 기반으로 확인합니다. 코드 PRs CI 에서 별도의 단위 및 Vitest 작업을 사용하여 빠른 품질 게이트와 영향을 받는 테스트를 실행합니다.
- **큐당 후보.** CI 및 Quality는 대기열 참조에서 구성된 후보에 대한 전체 프로필을 실행합니다.
- **릴리스별 팁.** Release-Green은 경로 필터와 일치하는 푸시에 대해 빠른 하드 게이트를 실행합니다. 하루에 세 번 예약된 실행은 릴리스 분기에 대한 전체 스윕을 사용합니다.
- **릴리스별로.** 전체 CI 매트릭스에는 E2E 샤드, 패키지 검증, 타르볼 부트 스모크 및 적용 범위 검사가 포함됩니다. [릴리스 체크리스트 를](RELEASE_CHECKLIST.md) 참조하십시오.

## `merge-train.sh` 에 대한 새로 체크아웃 전제조건

프리플라이트는 작업 트리를 만들기 전에 실행됩니다. `npm ci` 로 종속성을 설치합니다. `node_modules/.bin/tsc` 실행 가능하고 `node_modules/node_modules` 없는지 확인하십시오. `node_modules/.bin/bun --version` 가 성공하는지 확인하세요.

Bun 사후 설치를 건너뛴 경우 `(cd node_modules/bun && node install.js)` 실행하십시오. 공급자 일관성 및 알려진 기호 검사에서는 Bun 사용합니다. 유효성 검사기는 `npm run check:cycles:ratchet` 차단 게이트로 실행합니다. 독립형 `npm run check:cycles` 명령은 권장 사항입니다.

## 역사

Mergify 병합 대기열은 2026년 11월 19일에 사용 중지되었습니다.
