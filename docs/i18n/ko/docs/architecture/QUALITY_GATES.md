# Quality Gates Reference (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

이 문서는 OmniRoute의 모든 CI 품질 게이트에 대한 공식 참조 문서입니다.
각 게이트의 설명, 검증 대상, 실행되는 CI 작업, 래칫 기준선 또는 통과/실패 정책의 사용 여부,
빌드 차단 여부 또는 권고 사항인지 여부를 설명합니다.

간략한 요약과 허용 목록 정책은 `AGENTS.md`의 "Quality Gates & Ratchets" 섹션을
참조하세요. 동일한 시스템에 대한 중요도 평가, 성숙도 분류 및 도구에 구애받지 않는
복제 계획은 [Quality Gate Playbook](../ops/QUALITY_GATE_PLAYBOOK.md)을 참조하세요.

---

## 게이트 인벤토리 및 실행 프로필

### 후보자 입학

CI 및 Quality Gates 워크플로는 각각 안정적인 결과인 `Gate / CI` 및 `Gate / Quality` 내보냅니다. 버전이 지정된 승인 정책은 필요 또는 권고에 따라 모든 업스트림 작업을 열거합니다. 적용 가능한 필수 작업은 성공해야 합니다. 누락, 취소, 건너뛰기, 보류 중 및 알 수 없는 결과는 PASS 설정할 수 없습니다. 유효한 문서 전용 또는 카탈로그 전용 분류로 인해 코드 레인이 적용되지 않을 수 있습니다. 초안 PR 승인된 후보가 아닙니다. `hotfix` 라벨은 증거를 포기하지 않습니다.

두 워크플로 모두 PRs main/release 분기로 처리하고, `main` 로 푸시하고, 수동 디스패치 및 병합 그룹 이벤트를 처리합니다. 푸시, 디스패치 및 병합 그룹은 전체 선택을 실행합니다. `release/**` 로 푸시하면 시작되지 않습니다(2026-10-18). 각 변경 사항은 이미 해당 PR 에서 매트릭스를 실행했으며 병합된 조합은 Release-Green의 작업(`docs/ops/RUNNER_BOX.md` → 호스팅 레인)입니다. 포크 및 병합 그룹은 자체 호스팅 실행기를 선택하는 작업에 대해 호스팅 실행기를 사용합니다. 출시하기 전에 충분한 호스팅 용량을 확인해야 합니다.

일반 PR 빠른 선택을 실행합니다. 허용 정책의 `full-code` 및 `full-code-e2e` 레인(E2E, 통합, 패키지 아티팩트, Electron smoke, Bun SQLite, 생태계 및 프로토콜 클라이언트)은 Mergify 대기열 드래프트 또는 전체 실행( `gh workflow run ci.yml --ref <branch>` 에서만 실행됩니다.

각 JSON 영수증은 체크아웃된 SHA, 워크플로 실행 및 시도를 식별합니다. CLI checkout/event SHA 불일치를 거부합니다. 워크플로 테스트는 정책 멤버십을 판정 작업의 `needs` 목록에 바인딩하므로 새 레인이나 제거된 레인이 자동으로 사라지는 일이 없습니다. 영수증에는 게시, 배포 또는 기존 자문 스캐너의 내부가 아닌 자체 작업 흐름이 포함됩니다. 분기 규칙에서 두 수표 이름을 모두 활성화하는 것은 별도의 관리 변경입니다. 이러한 작업을 추가한다고 해서 그 자체로 지점이 보호되는 것은 아닙니다.

### 병합 대기열

> **2026년 11월 19일: Mergify 병합 대기열이 만료됩니다.** (주인의 결정). `.mergify.yml` 더 이상 대기열을 정의하지 않으며 풀 요청을 병합하거나 다시 작성하는 Mergify 명령을 거부합니다. 릴리스 PRs omni-queue가 라이브 모드에서 실행될 때까지 "활성 릴리스에 녹색 게이트 필요" 저장소 규칙 세트(`Gate / CI` + `Gate / Quality`) 하에 수동으로 병합되고 그 이후에는 omni-queue를 통해( [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md) ) 병합됩니다. 아래에 설명된 Mergify 초안의 작업 흐름 처리는 여전히 `ci.yml` 및 `quality.yml` 에 있지만 더 이상 Mergify 초안이 열리지 않습니다.

`queue` 레이블은 PR Mergify 대기열(`.mergify.yml`)로 보냅니다. Mergify는 `mergify/merge-queue/` 분기에서 PR 초안을 열고, CI 그곳에서 전체 선택을 실행하며, `Gate / CI`, `Gate / Quality` 및 `Merge integrity (changelog + generated skills)` 통과하면 원본 PR 병합됩니다.

Mergify는 초안 설명에 대기열 요약을 기록하고 다른 앱도 이를 편집할 수 있습니다. 이러한 초안의 `pull_request` `edited` 이벤트는 자체 동시성 그룹(`-queue-edit-<run_id>`)을 사용하므로 초안의 실제 실행을 취소할 수 없으며 게이트와 매트릭스를 건너뜁니다. `Merge integrity` 만 계속 실행됩니다. Mergify가 건너뛴 `Gate / CI` 실패한 검사로 읽고 PR 대기열에서 제거하기 때문에 건너뛴 게이트 작업은 다른 검사 이름을 갖습니다.

대기열에서 제거한 후 푸시가 항상 PR 다시 대기열에 추가하는 것은 아닙니다. 그것에 대해 `@mergifyio queue` 언급하십시오.

### 수용 감소기에 보관된 증거

`scripts/quality/validate-release-acceptance.mjs` 제공된 계획과 그 매니페스트를 줄입니다. 계획이 전체 릴리스 파이프라인을 포괄한다는 사실은 확립되지 않았습니다. 해당 계획이 `VERIFIED` 인 경우에도 해당 보고서는 명시적으로 `releaseAcceptance: false` 설정합니다. `release-acceptance.yml` 워크플로우는 실제 빌드, 패키지, 부팅 또는 프로모션 영수증이 아닌 섀도우 픽스처를 계속 사용합니다.

CLI 보유된 증거를 확인하기 위해 `--evidence-root` 요구합니다. 파일은 `<evidence-root>/<artifact_id>/<member>` 로 확인되고 SHA-256 로 해시됩니다. 증거가 없는 PASS 레코드, 누락되거나 변경된 파일, 안전하지 않은 경로 또는 심볼릭 링크로 인해 확인이 불가능합니다. 누락된 파일은 빈 성공 로그와 동일하지 않습니다. 기존 SHA/run/attempt 검사는 독립적으로 유지됩니다. 일치하는 바이트는 오래된 영수증을 복구할 수 없습니다. 파일 무결성은 실행 신뢰성이나 아티팩트 승격을 증명하지 않습니다.

### 정적 스캔 인벤토리

버전이 지정된 npm-alias 인벤토리 및 정적 스캔 멤버십은 `config/quality/gate-manifest.json` 에 있습니다. `npm run check:gate-manifest` 실행하여 `package.json` 에 대한 스크립트 이름과 정확한 명령을 확인합니다. 추가, 제거 및 명령 드리프트는 로컬 후크와 CI 의 분류 변경 작업 모두에 실패합니다. 별칭은 워크플로 작업, 매트릭스 인스턴스 또는 테스트 사례가 아닙니다. 이러한 개수는 상호 교환 가능한 것으로 표시되어서는 안 됩니다.

선택한 별칭을 실행하지 않고 검사하려면 `npm run quality:scan -- --list` 또는 `npm run quality:scan:fast -- --list` 사용하세요. 실행기는 npm 진입점을 호출하므로 해당 런타임(구성된 경우 Bun 포함)이 보존됩니다. 매니페스트는 별도로 호출될 때 해당 프로필 외부의 별칭을 기록하며 읽기 전용 스캔 프로필에서는 유지 관리 명령이 금지됩니다.

이러한 프로필은 정적 스캔에만 적용됩니다. 제품 테스트, 적용 범위, 포장, 외부 점검 또는 후보자의 전체 릴리스 승인을 인증하지 않습니다. 워크플로 승인은 연결된 `config/quality/admission-policy.json` 및 `scripts/quality/admission-verdict.mjs` 사용합니다. 릴리스 관찰자 프로필은 별도로 유지됩니다. 해당 수표와 영수증을 독립적으로 검사합니다. 전체 관찰자의 정적 명령은 `audit:deps`, 돌연변이 테스트 선택 및 번역 확인을 포함하여 `config/quality/release-green-static-profile.json` 에서 선언됩니다. 로더는 package.json 및 모델링된 CI/Quality 선언에 대해 npm 명령의 유효성을 검사합니다. 쉘 토큰을 인수로 실행하는 대신 드리프트를 거부합니다. 필수 스캐너 SKIP/INCOMPLETE 출력은 PASS 설정할 수 없습니다. 프로필은 외부 제외 사항을 기록하며 호스팅된 적용 범위, 테스트 매트릭스, 패키지 또는 배포 증거를 대체하지 않습니다. 아래의 산문 목록은 참고용일 뿐 게이트가 실제로 실행되었다는 증거는 아닙니다.

스크립트는 `scripts/check/` (정책 게이트) 및 `scripts/quality/` (래칫 엔진) 아래에 있습니다. CI 정보 소스는 `.github/workflows/ci.yml` 입니다.

### PR 빠른 경로 출시(`quality.yml`)

`.github/workflows/quality.yml` main/release PRs 의 CI 보완하고, `main` 로 푸시하고, 그룹을 디스패치하고 병합합니다. PRs 경로 필터링된 빠른 검사를 사용합니다. 영구적으로 비활성화된 중복 빌드가 제거되었습니다. 실제 build/package/boot 검사는 CI 에 남아 있습니다. 유닛 스위트와 vitest는 CI (`Unit Tests (N/8)` 및 `Vitest`)에서만 실행됩니다.

| 직업                                             | 범위                                                                                                    | 블로킹        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | ------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API 문서 참조 및 문서 전체                                                               | 예            |
| `Fast Quality Gates`                             | 코드 PRs; 정적 검사, 유형 검사, 대시보드 유형 검사, 영향을 받는 단위 테스트, 잊어버린 형제 테스트(권고) |
| `No new ESLint warnings`                         | 코드 PRs; 억제 인식 린트 가드                                                                           | 예, 포크 포함 |
| `Merge integrity (changelog + generated skills)` | 비초안 PRs; 변경 로그 및 생성된 스킬 동기화                                                             | 예, 포크 포함 |

#### 잊혀진 형제자매 테스트 보고서

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` 의 자문 단계로 실행되며 테스트-영향 맵 뒤에 가져오기 확인자를 재사용합니다. 변경된 모든 생산 모듈에 대해 풀 요청 차이에 후보 테스트가 없을 때 결정적 `changed module/symbol -> static consumer -> candidate sibling test` 체인을 보고합니다. Markdown 요약 및 JSON 결과는 차단 롤아웃 전에 보정을 위한 `forgotten-sibling-tests` 워크플로 아티팩트로 유지됩니다.

배럴 재내보내기 및 동적 수입은 해상도 진단일 뿐입니다. 차단 결과를 생성하지 않습니다. 검토된 예외는 `config/quality/forgotten-sibling-allowlist.json` 에 있습니다. 각 항목은 소비자 및 후보 테스트의 이름을 지정하고, 구체적인 근거를 제시하고, GitHub 문제 또는 끌어오기 요청을 연결해야 합니다. 잘못된 항목이 실패하면 닫힙니다. 예외는 삭제된 후보 테스트나 `.skip`/`.todo` 추가하는 diff를 억제할 수 없습니다. 어설션 약화 및 기타 마스킹은 독립적으로 차단하는 `check:test-masking` 게이트의 소유로 유지됩니다.

### 직업 : `lint`

모든 PR 에서 `main` 까지 실행됩니다. 실패 시 블록이 병합됩니다.

| 스크립트(`npm run ...`)           | 검증                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 블로킹                               |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `check:node-runtime`              | Node.js 버전이 지원되는 범위 내에 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 예                                   |
| `check:cycles`                    | 모든 `src/` + `open-sse/` 에서 순환 가져오기(AST 기반, tsconfig `paths` 확인). Bare는 사이클이 존재할 때마다 1로 종료하고( #15281 이후 실패 종료됨) SCCs 를 나열합니다. `check:cycles:ratchet` ( CI 실행하는 것)는 개수가 `quality-baseline.json` — 현재 14, `direction: down` 의 `metrics.cycles` 한도를 초과할 때 차단되므로 떨어질 수만 있습니다(#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 예(래칫)                             |
| `check:boundary`                  | `open-sse → src` 결합: 엔진에서 앱으로 고유한 파일 간 가져오기(`scripts/quality/measure-boundary.mjs`; 에지 목록은 v4 core/module-split 수정 백로그입니다). 베어 = 자문 보고서( `quality:boundary` 와 동일) `check:boundary:ratchet` ( CI 실행하는 것, `quality.yml` 고속 게이트 래칫 루프에서도 실행됨) — 측정된 771에 시드된 `quality-baseline.json` 의 `metrics.boundaryOpenSseToSrc` 천장을 카운트가 초과할 때 차단됩니다. `direction: down`; `--update` 이를 낮추기만 합니다. PRs 의 기준 상대(`--base-ref`, 아래 참조)                                                                                                                                                                                                                                                                                                                                                                   | 예(래칫)                             |
| `check:route-validation:t06`      | 모든 경로에 존재하는 Zod 스키마(Tier 6 정책)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 예                                   |
| `check:any-budget:t11`            | `@ts-expect-error // any` 수가 예산을 초과하지 않습니다(Tier 11 catraca).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 예                                   |
| `check:provider-consistency`      | `providers.ts` 의 모든 공급자는 `providerRegistry.ts` 에 일치하는 항목을 가지고 있습니다(그 반대의 경우도 허용 목록 내에서).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 예                                   |
| `check:model-lifecycle`           | 직접 관리하는 세 개의 라우팅 테이블은 체크인된 수명 주기 스냅샷(#11503)과 일관성을 유지합니다. `FITNESS_TABLE` (`taskFitness.ts`)는 `REGISTRY` 라우팅할 수 있는 폐기된 ID를 점수로 매기지 않습니다. 모든 `BUILT_IN_ALIASES` 대상은 `REGISTRY` 에 존재하며 은퇴 ID 스냅샷에는 없습니다. 아직 `REGISTRY` 에 있는 모든 폐기된 ID는 `allowedRetiredInCatalog` 에 전달되거나 나열됩니다. 해당 스냅샷에는 `DEFAULT_DEGRADATION_MAP` 소스나 대상이 폐기된 것으로 나타나지 않습니다. 이는 모델이 현재 라이브 업스트림에서 제공되고 있음을 증명하지 않습니다. 오프라인 — `config/quality/model-lifecycle.json` 와 비교되며 `npm run quality:refresh-model-lifecycle` 사용하여 직접 새로 고칩니다(네트워크, CI 에 연결되지 않음). `allowedRetiredInCatalog` 은 번다운 래칫입니다. 추적 문제가 있는 경우에만 항목을 추가하세요.                                                                           | 예                                   |
| `check:fetch-targets`             | 클라이언트 측 `src/` 의 모든 `fetch("/api/...")` 실제 `route.ts` 로 확인됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 예                                   |
| `check:deps`                      | 저장소의 모든 `package.json` 에 대한 모든 `npm install` -able deps는 `dependency-allowlist.json` 에 있습니다. 고정되지 않았거나 부주의한 새 패키지에 플래그가 지정됨                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 예                                   |
| `audit:deps`                      | 다섯 개의 독립적인 잠금 파일(루트, Electron, OpenCode 플러그인 v1/v2 및 공급자) 모두에 대한 npm 감사입니다. 중요한 권고사항 차단; 높은 주의보는 눈에 보이는 경고로 남아 있습니다. Missing/failed 감사는 INCOMPLETE 및 block입니다. 범위별 잠금 해시 및 보고서가 유지됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 예                                   |
| `check:lockfile`                  | `package-lock.json` 무결성 — https 레지스트리, 무결성 해시, 호스트 재정의 없음                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 예                                   |
| `check:licenses`                  | 프로덕션 종속성에 대한 SPDX 라이센스 허용 목록                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 예                                   |
| `check:tracked-artifacts`         | 빌드 아티팩트 없음/커밋된 `node_modules` 심볼릭 링크(허스키 사전 커밋에서도 실행됨, 사전 푸시는 의도적으로 가벼운 — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 예                                   |
| `check:ai-attribution`            | PR 커밋, 제목 또는 본문에 AI/bot `Co-Authored-By` 예고편이나 AI 생성 바닥글이 없습니다 — 하드 규칙 #16 ( PR 에 대한 `quality.yml` fast-gates 루프에서 → `release/**` — 이벤트 페이로드를 읽습니다. PRs — 에서 작동하지 않고 PR→ `main` 에 대한 `ci.yml` lint의 PR 전용 단계도 있습니다. 허스키 `commit-msg` 후크도 있습니다. 인간 공동 작성자가 허용됩니다. #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | 모든 Vitest 제외는 추적 문제의 이름을 지정하고 `config/quality/vitest-exclusions.json` (#13204)에 나타납니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 예                                   |
| `check:file-size`                 | 소스 파일( `src/`, `open-sse/`, `electron/`, `bin/` 의 `.ts`/`.tsx` )은 `cap` 내에 있고 테스트 파일(`*.test.ts(x)`)은 `testCap` 내에 있습니다. `file-size-baseline.json` (`frozen` / `testFrozen`)에 고정된 파일은 기록된 크기를 초과해서는 안 됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 예                                   |
| `check:error-helper`              | executors/handlers 의 오류 응답은 `buildErrorBody()` / `sanitizeErrorMessage()` 사용합니다(엄격한 규칙 #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 예                                   |
| `check:migration-numbering`       | 마이그레이션 파일 이름: 이전 `001`–`241` 시리즈는 동결되고 새 파일은 `YYYYMMDDHHMMSS_<description>.sql` 입니다. PR 기반에 대해 제거된 마이그레이션, 호환성 항목 없이 이름이 바뀐 마이그레이션, 최종 스키마가 이동하지 않는 순서가 잘못되었거나 편집된 마이그레이션을 거부합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:public-creds`              | `publicCreds.ts` 외부에는 리터럴 OAuth `client_id`/`client_secret` 또는 Firebase 웹 키가 없습니다(엄격한 규칙 #11).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 예                                   |
| `check:db-rules`                  | `src/lib/db/` 모듈 외부에는 원시 SQL 없습니다. `localDb.ts` 에서 배럴 가져오기 없음(엄격한 규칙 #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 예                                   |
| `check:known-symbols`             | 디스패치 테이블에 등록된 공급자 실행자, 라우팅 전략 및 번역자는 디스크의 파일과 일치합니다 — 고아 또는 선언되지 않은 기호 없음                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 예                                   |
| `check:route-guard-membership`    | 하위 프로세스를 생성하는 모든 경로는 `isLocalOnlyPath()` 로 분류됩니다(엄격한 규칙 #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 예                                   |
| `check:test-discovery`            | 저장소의 모든 `*.test.ts` / `*.spec.ts` 파일은 적어도 하나의 테스트 실행기에 의해 수집됩니다(래칫: `test-discovery-baseline.json` 의 고아 목록은 축소만 가능함)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 예                                   |
| `check:test-tla-order`            | `tests/unit` 아래의 `node:test` 파일은 테스트를 등록하고 최상위 `await` 에 도달한 다음 더 많은 것을 등록합니다(#18045; 래칫: `test-tla-order-allowlist.json` 축소만 가능)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 예                                   |
| `check:agent-skills-sync`         | 생성된 상담원 기술 아티팩트는 소스 카탈로그와 일치합니다(드리프트 없음). 릴리스 모드는 모든 기술을 확인합니다. 기능 PR (`pr` 모드)는 생성된 텍스트가 편집되는 기술만 확인합니다. — [생성된 파일 및 파생 기준선](#generated-files-and-derived-baselines-written-at-release) 참조                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | 공급자 logos/assets 기록된 출처 항목을 가지고 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | JSON 구성 파일은 repo lint 규칙을 구문 분석하고 충족합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | 오류 없는 TypeScript 컴파일(권고 경고만)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 예                                   |
| `typecheck:noimplicit:core`       | 엄격한 `noImplicitAny` — 미래지향적; 기존의 많은 호출 사이트에는 여전히 주석이 필요합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **자문** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` 범위가 `src/app/(dashboard)/**` (#7033)로 지정됨 — `typecheck:core` 의 큐레이트된 27개 파일 허용 목록에는 대시보드 TSX 포함되어 있지 않으며 `next build` 대시보드도 유형 확인하지 않으므로(`next.config.mjs` `ignoreBuildErrors: true` 설정함) 거기에서 고아 식별자 회귀(#6625/#6909)는 CI 에 표시되지 않았습니다. 고정된 per-file/per-TS-code 수 기준(`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` 와 동일한 오래된 적용 패턴)과 비교합니다. NEW — 만 게이트에 실패합니다. 기존 오류가 수정되면 `--update` 사용하여 래칫을 조정하세요.                                                                                                                                                                                                                                                                                                                     | 예                                   |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`)에 대한 전체 앱 제작 유형 확인, 표면 `typecheck:core` 의 27개 파일 허용 목록 및 대시보드 게이트는 다루지 않습니다. `config/quality/build-typecheck-baseline.json` 와 차이점이 있습니다. 새로운 또는 증가된 (파일, 코드)별 카운트가 실패하면 더 낮은 카운트가 래칫을 요청합니다. `--update` `--force-regressions` 전달되지 않는 한 실행에 새 쌍이나 제기된 쌍이 포함되어 있는 동안 거부하고, `--force-nocheck` 전달되지 않는 한 새로 침묵된 파일을 거부하므로 녹색이 되도록 기준선을 확대하는 것과 영구적인 침묵을 부여하는 것은 두 가지 별도의 고의적 행위입니다. 베어 `--force` 거부됩니다. 또한 `config/quality/ts-nocheck-baseline.json` 에 대해 `@ts-nocheck` 의 빌드 범위를 스캔합니다. 이를 사용하는 파일은 진단을 전혀 보고하지 않고 그렇지 않으면 모든 게이트에 표시되지 않기 때문입니다. | 예                                   |

#### 두 가지 유형 검사 프로그램이 다르게 응답합니다.

`typecheck:core` 와 `check:build-typecheck` 서로 다른 옵션으로 서로 다른 프로그램을 컴파일하며 동일한 파일이 하나에서는 깨끗하고 다른 하나에서는 오류로 가득 차 있을 수 있습니다.

`tsconfig.build.json` `"strict": false` 설정하므로 `noImplicitAny` 는 꺼집니다. 핵심 구성은 더 엄격한 옵션을 사용하여 선별된 27개 파일 허용 목록을 컴파일하고 각 항목의 가져오기 그래프를 따르므로 빌드 프로그램에 표시되지 않는 파일은 계속 확인됩니다.

파일이 입력되었는지 여부를 판단할 때 결과가 중요합니다.** `check:build-typecheck` 에서 제로 진단은 0을 의미하지 않습니다.** . 26개 파일에서 `@ts-nocheck` 제거하면 빌드 프로그램에서 그 중 23개가 깨끗해졌습니다. 그 중 16개는 약 120개의 암묵적인 오류(엄격한 오류)를 드러냈습니다. 파일 정리를 호출하기 전에 두 가지를 모두 확인하십시오.

### 직업 : `quality-gate`

`test-coverage` 이후에 실행됩니다. 실패 시 블록이 병합됩니다.

| 스크립트                     | 검증                                                                                                                                                  | 블로킹        |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `quality:collect`            | `quality-metrics.json` 방출(ESLint 경고 수, 병합된 샤드 보고서의 적용 범위)                                                                           | 예(래칫 상류) |
| `quality:ratchet`            | `quality-baseline.json` 의 각 측정항목은 회귀되지 않았습니다(ESLint 경고 ≤ 기준선, 적용 범위 ≥ 기준선).                                               | 예            |
| `check:duplication`          | 코드 중복(jscpd@4)은 `quality-baseline.json` 의 기준선을 초과하지 않습니다.                                                                           | 예            |
| `check:complexity`           | 파일 수준 순환 복잡도는 한도를 초과하지 않습니다(core ESLint `complexity` + `max-lines-per-function`).                                                | 예            |
| `check:cognitive-complexity` | 인지 복잡도 래칫(`eslint-plugin-sonarjs`) — 별도의 ESLint 패스; CI 둘 다 단일 `check:complexity-ratchets` 단계로 병합되어 실행됩니다.                 | 예            |
| `check:dead-code`            | 사용되지 않은 내보내기/파일 래칫(knip)이 기준선에 비해 회귀하지 않습니다.                                                                             | 예            |
| `check:compression-budget`   | 압축 벤치마크 예산 — 엔진당 토큰 절감 하한선은 회귀해서는 안 됩니다.                                                                                  | 예            |
| `check:type-coverage`        | 백분율 유형의 래칫(`type-coverage`)은 회귀하지 않습니다. 주로 `typecheck:noimplicit:core` 포함합니다.                                                 | 예            |
| `check:codeql-ratchet`       | 개방형 CodeQL 경고 횟수가 회귀되지 않습니다( `gh api` 통해 읽음, 토큰 없이 우아한 건너뛰기). — 새로 고침 주기 및 수동 트리거: 아래 "CodeQL 래칫" 참조 | 예            |
| `check:type-scale-ratchet`   | 키트 유형 스케일: 12px 미만의 크기와 `src/` 의 `font-bold` 만 감소합니다(`typeScaleSubFloorSizes`, `typeScaleFontBold`). 또한 사전 커밋 후크에서도    | 예            |

### 직업 : `quality-extended`

작업 수준 `continue-on-error` 없는 혼합 작업: `--ratchet` 통과하는 단계는 `quality-baseline.json` 에 대한 측정된 회귀에서 작업에 실패합니다. `check:circular-deps` 및 스캐너 설치 단계만 권고 사항입니다(단계 수준 `continue-on-error: true`). 외부 스캐너는 `gh release download` 통해 설치됩니다. `check:secrets` gitleaks가 없으면 자체 건너뛰고(종료 0), `check:vuln-ratchet`, `check:workflows` 및 `check:openapi-breaking` 는 측정이 누락되면 실패하여 닫힙니다.

| 스크립트                 | 검증                                                                                                                                                                                         | 블로킹                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:circular-deps`    | 순환 종속성 없음(dpdm)                                                                                                                                                                       | **자문**                                      |
| `check:bundle-size`      | 번들 크기는 한도를 초과하지 않습니다. 측정할 수 없는 크기도 실패                                                                                                                             | **--ratchet 로 차단**                         |
| `check:secrets`          | 바이너리가 없으면 비밀 스캐닝(gitleaks) — 건너뜁니다.                                                                                                                                        | **--ratchet 로 차단**                         |
| `check:vuln-ratchet`     | 종속성 취약성(osv-scanner)은 — 회귀하지 않습니다. 측정되지 않은 경우 `--ratchet` INCOMPLETE (종료 2)로 실패합니다.                                                                           | **--ratchet 로 차단**                         |
| `check:workflows`        | 워크플로 린트(actionlint + zizmor) missing/broken 스캐너, 유효하지 않은 보고서 또는 래칫 기준 누락이 INCOMPLETE 로 실패합니다. 유효한 결과는 선택한 strict/advisory/ratchet 정책을 따릅니다. | 실행이 필요합니다. CI 의 지즈모어 래칫 블로킹 |
| `check:openapi-breaking` | 고정된 이벤트 커밋에 대한 공개 API 계약(PR merge-base, push before, merge-group base; scheduled/manual checkout 첫 번째 상위) 필수 측정 실패 종료                                            | **--ratchet 로 차단**                         |

### 직업 : `docs-sync-strict`

모든 PR 에서 `main` 까지 실행됩니다. 실패 시 블록이 병합됩니다.

| 스크립트                       | 검증                                                                                                                                               | 블로킹                     |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | 아래 6개의 서브게이트를 순차적으로 실행하는 메타게이트                                                                                             | 예                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI 버전 일관성; 릴리스 모드에는 66개의 `llm.txt` 미러 및 번역된 CHANGELOG 섹션도 있습니다(PR 모드: 미러가 동의함).                | 예                         |
| ↳ `check:docs-counts`          | 산문으로 계산됩니다(공급자 수, 마이그레이션 수 등). 두 가지 모드: PRs 기능의 `pr`, 다른 곳의 `release` — 아래 "파생 값" 참조                       | 예                         |
| ↳ `check:env-doc-sync`         | `.env.example` 의 모든 환경 변수는 문서 테이블에 문서화되어 있으며 그 반대도 마찬가지입니다.                                                       | 예                         |
| ↳ `check:deprecated-versions`  | 문서에 더 이상 사용되지 않는 버전 문자열이 없습니다.                                                                                               | 예                         |
| ↳ `check:doc-links`            | 문서의 내부 마크다운 링크는 실제 파일(`[text]`/`(path)` 형식)로 해석됩니다.                                                                        | 예                         |
| ↳ `check:fabricated-docs`      | 문서에 인용된 경로, 환경 변수, CLI 명령, 후크 이름 및 파일 경로가 코드베이스에 존재합니다. `--strict` 통한 하드 게이트; 플래그가 없는 소프트 페일. | 예( CI 의 `--strict` 통해) |
| `check:cli-i18n`               | CLI `t()` 키는 `bin/cli/locales/en.json` 에 존재합니다(두 모드 모두). 릴리스 모드에서만 `en.json` 사용한 pt-BR / zh-CN / zh-TW 패리티              | 예                         |
| `check:openapi-coverage`       | OpenAPI 사양은 적어도 실제 경로의 래칫 바닥을 다룹니다.                                                                                            | 예                         |
| `check:openapi-security-tiers` | `openapi.yaml` 의 보안 계층 주석은 `routeGuard.ts` 분류와 일치합니다.                                                                              | **자문**                   |
| `check:openapi-routes`         | `openapi.yaml` 의 모든 경로는 실제 `route.ts` (환각 방지)로 확인됩니다.                                                                            | 예                         |
| `check:docs-symbols`           | `docs/**/*.md` 의 모든 `/api/...` 참조는 실제 `route.ts` (환각 방지)로 확인됩니다.                                                                 | 예                         |
| `i18n translation drift`       | `docs/i18n/**` 미러 대 `.i18n-state.json` PRs 에 대한 — 권고(미러는 변환 웨이브에 의해 새로 고쳐짐), push 및 nightly에 엄격함                      | **자문** PRs 에서          |

#### 번역 미러는 파생된 파일입니다(PR 모드 대 릴리스 모드).

PR 기능은 영어 소스만 편집합니다. `docs/i18n/<locale>/**` 미러(66개 `llm.txt` 복사본 및 변환된 `CHANGELOG.md` 파일 포함)와 `.i18n-state.json` 변환 웨이브(`docs/i18n-*` / `chore/i18n-*` 분기, 예약된 `i18n-mirror-refresh.yml`) 및 릴리스(`npm run release:sync-changelog-i18n`)에 의해 한 단계로 다시 작성됩니다. 따라서 미러 게이트는 `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`, `OMNIROUTE_GATE_MODE`, Actions 이벤트, 로컬 실행은 `release`)에 의해 해결되는 두 가지 모드로 실행됩니다.

- `check:docs-sync` — 릴리스 모드는 모든 검사를 실행합니다. PR 모드는 package.json/OpenAPI 버전, 루트 CHANGELOG 제목 및 대체 문서 가드를 유지하고 zqj가 미러를 작성하지 않는 한 `llm.txt` 미러 사본 및 번역된 CHANGELOG 섹션 — 에 대해 `SKIP reason=pr-mode` 인쇄합니다. PR 에서 `docs/i18n/**` 계열의 작성자로 선언된 헤드 `config/quality/derived-paths/*.json` 는 두 검사를 엄격하게 실행하고 diff 기반이 해결되면 자체 diff 편집 `docs/i18n/<locale>/llm.txt` 또는 `CHANGELOG.md` 해당 검사를 엄격하게 실행합니다. diff 베이스는 depth-1 체크아웃( `docs-sync-strict` 작업)에서 해결되지 않으므로 PR 모드는 베이스가 필요 없는 하나의 검사도 실행합니다. 모든 `llm.txt` 미러는 존재해야 하며 `---` 구분 기호를 유지하고 루트 본문이나 대부분의 미러가 공유하는 본문을 전달해야 합니다. 움직이는 베이스는 모든 거울을 똑같이 낡고 지나가게 합니다. 하나의 미러에 대한 수동 편집이 실패합니다. 번역된 `CHANGELOG.md` 파일에는 depth-1 PR 체크아웃에 그러한 검사가 없습니다.
- 사전 커밋 후크는 `check-docs-sync.mjs --mode=pr` 실행합니다. 커밋은 수행하는 작업에 따라 판단됩니다. 플래그가 없으면 로컬 실행은 릴리스 모드이고, 루트 `llm.txt` 편집하는 하나의 병합된 PR 웨이브가 실행될 때까지 해당 베이스에 대한 모든 이후 커밋을 차단합니다. Husky 후크가 실행하는 모든 모드 인식 게이트에 대해 동일한 규칙이 적용됩니다. 후크는 `--mode=pr` 통과하고 엄격한 판정은 릴리스 모드 실행에 유지됩니다(릴리스 PR 일반 로컬 실행인 `main` 로 푸시됩니다).
- 미러 콘텐츠 단위 테스트(`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`, `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`, `docs/*-locales`) — 릴리스 모드는 모든 로케일을 확인합니다. PR 모드는 `.i18n-state.json` (전체 파일 해시 또는 테스트 핀 섹션의 기록된 섹션 해시)에 따라 영어 소스에 현재 있는 미러만 어설션하고 이유가 있는 오래된 미러를 건너뜁니다. `target_hash` 출처 확인은 두 모드 모두에서 모든 로케일에 대해 실행됩니다. 신선도는 `## ` 섹션당, `run-translation.mjs` 해시 단위입니다. 긴 섹션(이 파일의 게이트 인벤토리는 절반 정도임)은 편집 내용이 미러를 오래 유지하고 PR 모드 어설션이 다음 웨이브까지 건너뛴다는 것을 의미합니다. 영어 소스에 더 이상 포함되지 않는 앵커는 전체 파일 비교로 대체됩니다.
- `i18n translation drift` PRs 에 대한 — 권고, 푸시, 야간 및 릴리스 컷에 엄격하므로 오래된 미러는 릴리스로 제공될 수 없습니다.

`scripts/i18n/sync-llm-mirrors.mjs` ( `syncLlmMirrors()` 사용하여 `--dry-run` 로도 내보냄)는 `llm.txt` 미러를 다시 작성합니다. 릴리스 새로 고침, 번역 웨이브 및 예약된 `i18n-mirror-refresh.yml` 이를 실행합니다(새로 고침은 드리프트 보고서에 나열되지 않기 때문에 오래된 `llm.txt` 미러를 연습 실행으로 감지하고 `check:docs-all` 전에 동기화합니다).

`docs/diagrams/` 아래에 12개의 README SVGs 생성됩니다(`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` 모두 재생성합니다). 각각에는 커밋된 파일이 릴리스 모드에서 오래되면 실패하는 바이트 비교 단위 테스트(`tests/unit/docs/readme-*-svg.test.ts`, 작업 `test-unit`)가 있습니다. PR 에서 `check:generated-artifacts` PR 편집을 SVG 판단하고 베이스의 드리프트는 릴리스 새로 고침에 남습니다( [생성된 파일 및 파생 기준선](#generated-files-and-derived-baselines-written-at-release) 참조) — 및 `check:docs-counts` `<text>` 노드 — 에서 표준 번호를 읽습니다. 이는 개요 단계에서 파일의 모든 윤곽선 문자열을 보이지 않는 `<text>` 로 유지하는 이유입니다. SVG 표준 번호 검사는 `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`)에 나열된 파일을 읽습니다: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg` 및 `tier-flow-light.svg`; 영원히 무료, 카탈로그 항목, 반복 풀 및 득점 요인 주장도 `promise-pillars.svg`, `free-tier-budget.svg` 및 `strategies-grid.svg` 로 읽습니다. 이러한 생성기가 그리는 수(공급자 총계, MCP 도구, 라우팅 전략, 영구 무료 공급자 등)는 리터럴이 아닌 `docs/reference/derived-facts.json` 부터 `scripts/docs/readmeFacts.mjs` 까지의 사실 스냅샷에서 나오므로 모든 분기에서 다이어그램을 재생성하면 커밋된 파일이 재생산됩니다. `free-tier-budget.svg` 동일한 스냅샷(`code.freeTierBudget`, 사실 프로브 기록의 카탈로그 요약)에서 행을 가져오므로 `FREE_MODEL_BUDGETS` 에 대한 변경 사항은 CI 빨간색으로 바꾸는 대신 다음 새로 고침 시 카드에 도달합니다.

### 파생된 값: `pr` 및 `release` 게이트 모드

PR 기능은 공급자, 마이그레이션, MCP 도구 및 전략 수, README SVG 번호, 사실 스냅샷 등 기본 상태에 따라 달라지는 값을 절대 쓰지 않습니다. 한 단계는 릴리스와 야간 파생 새로 고침 PR 에 의해 실행되는 모든 `npm run release:refresh-derived` 를 다시 계산합니다. 그래서** 릴리스 사이에 기본은 설계상 라이브 코드 뒤에 있습니다.** , 트리를 라이브 코드와 비교하는 게이트 또는 테스트는 형제가 공급자를 추가한 후 모든 PR 에서 빨간색으로 표시됩니다. 따라서 파생된 값을 판단하는 게이트는 `scripts/check/lib/gateMode.mjs` 에 의해 해결되는 두 가지 모드 중 하나로 실행됩니다(첫 번째 일치 항목이 승리함).

1. 명령줄에서 `--mode=pr|release` ;
2. `OMNIROUTE_GATE_MODE` 환경 변수(`pr` 또는 `release`)
3. automatic, from the GitHub Actions event: a `pull_request` whose head is not `release/v*`, a `merge_group`, or a push to `omni-queue/**` → `pr`; everything else (push, schedule, dispatch, the release PR `release/v* → main`, any local run) → `release`.

각 모드에서 `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`)가 실패하는 것은 무엇입니까?

| 방법      | 실패                                                                                                                                                                                                                                                                                                                                                               | 생생한 사실이 필요합니다 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `release` | 모든 확인, 트리에서 수집된 사실에 대한 엄격한 동일성(게이트가 항상 가졌던 동작): 오래된 개수, 버전, 적용 범위 또는 SVG 번호는 STRICT 드리프트입니다.                                                                                                                                                                                                               | 예                       |
| `pr`      | 변경 사항만 동일한 클레임 추출기를 사용하여 PR 베이스와 다릅니다. (1) 해당 수표 및 파일에 대한 베이스에 존재하지 않는 관리 값("PR 관리되는 번호를 편집하고 — 해당 행을 베이스 텍스트로 복원합니다"); (2) 기본이 수행되고 머리가 손실된 필수 청구입니다. 사실이 필요하지 않은 내용 불변성은 릴리스 모드에서처럼 실행됩니다. 릴리스 전용 검사가 나열되고 건너뜁니다. | 아니요                   |

에이전트 지침 파일은** 아니요** 파생된 개수: `AGENTS.md`, `llm.txt` (및 해당 `docs/i18n/*/llm.txt` 복사본), bs `AGENTS.md` 분기, `open-sse/services/AGENTS.md`, `src/shared/constants/agentSkills.ts`, `skills/README.md` 및 모든 `skills/*/SKILL.md` 는 소스(예: `src/shared/constants/routingStrategies.ts` 의 `ROUTING_STRATEGY_VALUES` ) 및 대신 `npm run facts` 가리킵니다. 불변 "파생 개수 없음(에이전트 지침 파일 …)"은 두 모드 모두에서 개수(공급자, 마이그레이션, MCP 도구 및 범위, 라우팅 전략, 채점 요소, 모드 팩)에 실패하므로 릴리스 새로 고침 시 지침 파일을 다시 작성할 필요가 없습니다.

`pr` 모드에서 작성자 분기는 관리되는 값인 `chore/derived-*` (야간 새로 고침 PR), `release/v*` 및 변환 웨이브 `docs/i18n-*` 및 `chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`)를 편집할 수 있습니다. 대기열 배치(`merge_group`, Mergifydrafts, `omni-queue/**`)는 다시 평가되지 않습니다. 이미 평가된 게이트의 PRs 하나씩 합산합니다.

종료 코드: `0` clean · `1` STRICT 드리프트(또는 `--strict` 사용한 소프트 드리프트) 또는 관리 값 위반 · `2` 인프라 — 코드 사실을 수집할 수 없습니다(tsx 프로브가 실패하거나 시간 초과되었습니다. 시간 초과는 `OMNIROUTE_FACTS_TIMEOUT_MS`, 기본값은 600000ms입니다). 또는 CI 에서 PR diff 기반을 확인할 수 없습니다. 종료 2는 문서의 차이가 아닙니다. 작업을 다시 실행하거나 환경을 수정합니다.

각 모드가 실행되는 위치:

| 어디                                                                                 | 방법                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 기능 PR — `ci.yml` 작업 `docs-sync-strict`, `quality.yml` 단계 "문서 정확도"         | `pr` (자동); 작업은 기본을 `BASE_SHA` 로 전달하고 `fetch-depth: 2` 로 체크아웃합니다.                                                                                                                         |
| `merge_group`, `omni-queue/**` 후보, 병합 열차의 전체 게이트 목록                    | `pr`                                                                                                                                                                                                          |
| PR (`release/v* → main`), 푸시, 예약 및 수동 실행 해제                               | `release`                                                                                                                                                                                                     |
| 릴리스-그린(`scripts/quality/validate-release-green.mjs`)                            | HARD 항목은 `OMNIROUTE_GATE_MODE=pr` 와 함께 실행됩니다("기본이 중단되었습니까?"). DRIFT 항목 `derived-refresh` `npm run release:refresh-derived -- --check` 실행합니다(엄격한 보기, 기본 빨간색을 열지 않음) |
| 릴리스(`/generate-release` 단계 0a 및 1, 기술 배선은 별도의 소유자 승인 변경입니다.) | `npm run release:refresh-derived` 파생된 파일을 작성합니다. 릴리스 PR 의 자체 검사는 `release` 모드에서 실행됩니다.                                                                                           |
| `nightly-derived-refresh.yml` (일일, 최고 `release/vX.Y.Z`, 릴리스-동결 시 생략)     | `npm run release:refresh-derived -- --profile=nightly`; diff에서는 ONE PR `chore/derived-refresh` 에서 열린 상태로 유지됩니다. 절대 병합하지 않음                                                             |

그 뒤에 있는 명령은 다음과 같습니다.

- `npm run facts` 파생된 모든 숫자를 JSON (`scripts/release/facts.mjs`)로 인쇄합니다. `--key=code.mcpTools` 하나의 값을 인쇄하고, `--snapshot` 라이브 트리 대신 커밋된 스냅샷을 읽습니다. 사실을 수집할 수 없는 경우 2번 출구로 나갑니다.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`)는 한 패스에서 파생된 파일을 다음 순서로 다시 계산합니다( `--only=` 의 단계 ID): `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (스냅샷), `numbers` (카운트 게이트의 재작성 계획이 문서에 적용된 후 해당 `docs/i18n/` 미러로 전달됨), `readme-diagrams`, `skills` ( `SKILL.md` 생성), `e2e-timings` (트리가 `syncE2eTimings` 할 때까지 건너뛰기) `ui-keys` ( `en.json` 삭제한 키를 정리하고 `--rewritten-since=<ref>` — 기본값을 사용하여 `origin/main` — 마지막 릴리스 이후 다시 작성된 영어 값을 다시 대기열에 넣습니다. 값은 환경이나 `.env` (`OMNIROUTE_TRANSLATION_*`, 해당 키만 읽음) 또는 Google 엔진에 구성된 백엔드에 의해 동일한 실행으로 변환됩니다. 백엔드가 없으면 `__MISSING__` 마커를 쓰지 않습니다. 릴리스 프로필이 실패하고 야간에 키를 건너뛰고 `--allow-untranslated` 키를 씁니다. 목적), `llm-mirrors` 및 `verify-generated` (쓰기 후 릴리스 모드의 `check:generated-artifacts` 및 `check:agent-skills-sync` 통과해야 합니다. `--check` 에서는 건너뛰고 `--only` 이를 생략하면 실패는 종료 2입니다). `changelog` 단계는 선택 사항입니다(`--with-changelog`, 릴리스 프로필에만 해당). `--profile=nightly` 버전 주장을 절대 건드리지 않습니다. `-- --check` 사용하면 파일이 변경되거나 관리되는 값을 수동으로 편집해야 할 때(둘 다 나열) 아무것도 쓰지 않고 1로 종료됩니다. 인프라 장애 시 2번 출구로 나갑니다. `--json` 결과를 JSON 로 인쇄합니다.
- `docs/reference/derived-facts.json` 는 마지막 새로 고침에 사용된 사실의 스냅샷입니다. 새로고침만 씁니다. README SVG 생성기는 이를 읽고 PR 시간 단위 테스트는 커밋된 문서와 생성된 파일을 — 와 절대 라이브 코드와 비교합니다. 제품군의 단일 라이브 비교는 `tests/unit/check-docs-counts-sync.test.ts` 의 "릴리스 새로 고침이 주기를 닫습니다"입니다. 라이브 사실을 통해 메모리에 적용된 새로 고침의 재작성 계획은 보고하지 않는 STRICT 드리프트를 남기지 않으며 재계획은 아무것도 변경하지 않습니다.

로컬로 재현하려면(로컬 실행의 기본값은 `release` 입니다):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

해결 가능한 기반이 없으면( `BASE_SHA`/`BASE_REF` 없음, 로컬 `origin/release/v<version>` 없음) 로컬 `pr` 실행은 경고를 인쇄하고 실패하는 대신 diff를 건너뜁니다.

### 직업 : `i18n-ui-coverage`

| 스크립트                          | 검증                                                                                                                                                                                    | 블로킹                   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `check-ui-keys-coverage` (인라인) | UI i18n 키 적용 범위는 ≥ 65%입니다.                                                                                                                                                     | 예(두 모드 모두)         |
| `check:ui-icu`                    | 모든 UI 카탈로그의 모든 메시지는 `IntlMessageFormat` 로 컴파일됩니다.                                                                                                                   | 예(두 모드 모두)         |
| `check-ui-value-drift` (인라인)   | 다시 쓴 영어** 값** 오래된 번역을 남기지 않습니다                                                                                                                                       | 예(릴리스 모드에만 해당) |
| `check-new-key-coverage` (인라인) | 에이** 새로운** 영어 키는 모든 로케일 — 에서 번역되며 `__MISSING__:` 마커는 거부됩니다.                                                                                                 | 예(릴리스 모드에만 해당) |
| `check-key-completeness` (인라인) | 모든 UI 카탈로그(및 `--catalog=cli` 사용하는 모든 CLI 카탈로그)는 `en.json` 의 키 세트를 정확하게 전달합니다. `pr` 모드에서 각 카탈로그는 PR 병합 베이스에서 자체적으로 변경되었습니다. | 예(두 모드 모두)         |
| `check-translation-ratio`         | 로캘별 실제 번역 비율(영어와 동일/자리 표시자/허용 목록 외부 누락된 잎) `config/quality/i18n-translation-baseline.json` + slack을 초과해서는 안 됩니다.                                 | 예(릴리스 모드에만 해당) |

`fetch-depth: 0` — 필요합니다. 가치 드리프트 게이트는 `en.json` 병합 기반과 비교합니다.

**두 가지 모드(2026-11-13 이후).** PR 기능은 `en.json` (및 `bin/cli/locales/en.json`)의 키를 추가하거나 다시 작성하며 다른 로케일에는 영향을 주지 않습니다. `check:pr-derived-paths` (작업 `pr-test-policy`, 제품군 `config/quality/derived-paths/translation.json`)는 PR 기능이 실패합니다. 다른 로케일은 `scripts/i18n/sync-ui-keys.mjs` 에서 `syncUiKeys()` 호출하는 `release:refresh-derived`(누락된 키 추가, 삭제된 키 제거, `rewrittenSinceRef` 로 다시 작성된 영어 번역 표시, 번역) 또는 번역 웨이브에 의해 릴리스당 한 번씩 완료됩니다. 게이트는 `scripts/check/lib/gateMode.mjs` 에서 모드를 읽습니다. `pr` 모드( PRs, `merge_group`, `omni-queue/**` 기능)에서 릴리스 모드 게이트는 print `SKIP reason=pr-mode` 및 0을 종료합니다. `release` 모드(릴리스 PR, `main`, `workflow_dispatch`, 로컬 실행으로 푸시)에서는 이전처럼 엄격하며, PR 릴리스에서는 diff 인식 모드에서 `BASE_REF=origin/main` 얻으므로 사이클이 추가되거나 다시 작성된 모든 키를 판단합니다. `--mode=pr` 사용하여 로컬에서 기능 PR 결과를 미리 봅니다.

`pr` 모드(번역 웨이브, 릴리스 새로 고침, 번역 전용 수정)에서 여전히 로케일 카탈로그를 변경하는 PR 건너뛰지 않습니다. `check-key-completeness` 병합 기반(`scripts/i18n/lib/touched-catalogs.mjs`)의 동일한 카탈로그에 대해 변경된 각 카탈로그를 판단하고 카탈로그에서 손실된 키, `en.json` 에 부족한 키, 실제 번역이 `__MISSING__:` 마커 또는 영어 텍스트로 바뀌거나 PR 건드리지 않은 영어 문자열의 placeholders/tags 더 이상 보간하지 않는 값에 대해 실패합니다. PR 의 새로운 카탈로그는 전체 `en.json` 키 세트를 전달해야 합니다. 이는 PR 가 다루는 카탈로그의 경우 비율 및 CLI 패리티 게이트가 볼 수 있는 내용을 다룹니다.

로케일 패리티 단위 테스트(`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`)는 `tests/_helpers/localeParityMode.ts` 통해 동일한 모드를 따릅니다. `pr` 모드에서는 키 패리티 어설션을 건너뛰고 릴리스에서 병합 기반 이후 영어가 변경된 키의 자리 표시자 패리티를 새로 고칩니다(단위 테스트 작업의 얕은 체크아웃에서 읽을 수 없는 모든 키). 그 도우미는 바로** 오직** 승인된 모드 조건 건너뛰기: `check:test-masking` `.skip(` 및 `{ skip: true }` 계산하지만 반환되는 계산된 `{ skip: "<reason>" }` 는 계산하지 않으므로 `tests/unit/locale-parity-mode.test.ts` 이를 사용하도록 허용된 테스트 목록을 고정합니다. — 추가는 해당 목록에 대한 검토된 편집입니다.

#### `check-ui-value-drift` — 오래된 번역 게이트

다른 게이트가 구조적으로 볼 수 없는 하나의 i18n 회귀를 포착합니다. 즉, 영어 값이 다시 작성되고 _이전_ 영어에서 파생된 번역이 그대로 유지되므로 영어가 아닌 사용자는 자신 있게 표현된 현재 잘못된 사본을 계속 읽습니다.

이건 진짜로 배송됐어요. Antigravity 로그인 도우미가 도착했을 때 `oauthModal.googleOAuthWarning` 다시 작성되었습니다(#5203).** 43개 로케일 중 39개** 운영자에게 해당 공급자에 대해 완료할 수 없는 흐름 — "전체 URL 복사하여 아래에 붙여넣으십시오"라고 지시하는 텍스트를 유지했습니다. 다음과 같은 이유로 #8463 까지는 눈에 띄지 않았습니다.

- `sync-ui-keys` 다음과 같은 키만 백필합니다.** 결석한** , 절대 그렇지 않습니다** 탁한** ;
- `check-ui-keys-coverage` _presence_ 키를 계산하므로 오래된 번역은 포함된 것으로 점수를 매깁니다.
- `check-translation-drift` `docs/i18n/<locale>/**.md` 문서 미러 zqc를 추적하며 — `src/i18n/messages/*.json` 읽지 않습니다. 작업 `docs-sync-strict` 에서 실행됩니다. PRs 에 대한 권고, 푸시 및 야간에 엄격합니다. 변환 웨이브는 PR 기능이 아닌 미러를 새로 고칩니다.

**기준선 지원이 아닌 차이점을 인식합니다.** 병합 베이스의 `en.json` 작업 트리와 비교합니다. 영어 값이 변경된 모든 키에 대해 아직 손대지 않은 번역이 남아 있는 로케일은 오래되었습니다. 이건 고의로** 기존 부채를 동결합니다** — a diff는 오랜 번역이 어떤 고대 영어에서 왔는지 밝힐 수 없으므로 게이트는 현재 변경 사항이 무엇에 영향을 미치는지 판단합니다. 대안(키별 해시 기준)은 ~ 600 KB 생성 파일의 비용이 들며, 기존 기준 중 가장 큰 것인 3 × i18n PR 마다 휘젓습니다.

그것을 만족시키는 두 가지 방법:

1. 영향을 받은 번역을 업데이트하거나
2. 이를 `__MISSING__:<new english>` — 로 설정하면 런타임이 수정된 영어(`src/i18n/request.ts::deepMergeFallback`, #7258)와 번역을 위한 주요 대기열을 제공합니다.

문자열의 경우** 의미** 바뀌었다, 선호하다** 키 이름 바꾸기** : 새 키는 오래된 번역을 상속받을 수 없습니다. 이것이 #8463 사용하는 패턴입니다.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

기본 카탈로그를 읽을 수 없으면(기본 참조가 없는 얕은 복제) `check-openapi-breaking` 미러링하여 `SKIP reason=base-unresolved` 로 0을 종료합니다. 릴리스 모드 전용: PR 기능은 영어를 다시 작성하고 거기서 중지합니다. 릴리스 새로 고침은 뒤에 남겨진 번역을 표시합니다(`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, 동일한 `findStaleTranslations`).

### 직업 : `i18n`

전체 i18n 검증 매트릭스(로케일당 하나의 작업) 직업 전체가 자문입니다.

| 스크립트                        | 검증                 | 블로킹                                            |
| ------------------------------- | -------------------- | ------------------------------------------------- |
| `validate_translation.py quick` | 로케일별 번역 완성도 | **자문** (전체 작업의 `continue-on-error: true` ) |

### 직업 : `pr-test-policy`

풀 요청에서만 실행됩니다.

| 스크립트               | 검증                                                                                                                                      | 블로킹 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` 또는 `bin/` 에서 프로덕션 코드를 변경하는 PRs 는 테스트를 포함하거나 업데이트해야 합니다(엄격한 규칙 #8) | 예     |
| `check:test-masking`   | 변경된 테스트 파일은 순 어설션 수를 줄이거나 `assert.ok(true)` 동어반복을 추가하지 않습니다.                                              | 예     |
| `check:pr-evidence`    | PR 본문은 변경에 대한 test/VPS 증거를 인용합니다( PR 산문 — 취약성을 파악하여 엄격한 규칙 #18 기계화합니다. 백로그 참조).                 | 예     |

### 직업 : `test-vitest`

`build` 이후에 실행됩니다. 실패 시 블록이 병합됩니다.

| 모음곡           | 검증                                                  | 블로킹                                                                                                   |
| ---------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP 서버(110개 도구), autoCombo, 캐시 — vitest 실행자 | 예                                                                                                       |
| `test:vitest:ui` | UI 구성요소 테스트 — vitest runer                     | **블로킹** — 기존 오류는 `vitest.config.ts` 에서 명시적으로 제외됩니다. 새로운 실패로 인해 작업이 실패함 |

### 야간 워크플로(예약, 자문)

이는 cron 일정(및 `workflow_dispatch`)에 따라 실행되며 PRs 에서는 실행되지 않습니다. 모두 자문입니다.

| 작업 흐름              | 검증                                                                                                                            | 블로킹   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `nightly-property`     | 무작위 시드 + 높은 실행 횟수를 사용한 빠른 확인 속성 테스트                                                                     | **자문** |
| `nightly-resilience`   | 힙 성장 게이트, 카오스 결함 주입, k6 load/soak                                                                                  | **자문** |
| `nightly-llm-security` | Promptfoo 주입 가드(블록 모드) + garak 프로브(공급자 비밀 없이 건너뛰기)                                                        | **자문** |
| `nightly-schemathesis` | `docs/openapi.yaml` — 표면 사양 위반/처리되지 않은 500s(Fase 8 B.4)를 사용하여 라이브 OmniRoute 에 대한 OpenAPI 계약 퍼징(도식) | **자문** |
| `nightly-mutation`     | 빠른 단위 차선 — 생존 돌연변이 표면에 대한 Stryker 돌연변이 테스트 점수 약한 주장                                               | **자문** |
| `nightly-compat`       | 지원되는 `engines.node` 범위 전체의 노드 엔진 호환성 매트릭스                                                                   | **자문** |

성능 기준(힙, TTFB, 빌드 시간)은 제한되지 않고 기록됩니다. [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)를 참조하세요.

---

## 속도 단계(2026-08-30 → v4.0 LTS): 모든 기준선이 20% 느슨해짐

소유자 결정(2026-08-30): v4.0 모듈화까지는 부채 한도를 유지하는 것보다 배송 속도가 더 중요합니다. 모든** 숫자** 래칫 기준선은 한 번의 감사 가능한 통과에서 20% 느슨해졌으며 단계는 `config/quality/quality-baseline.json` 에 선언되었습니다.

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| 무엇이 바뀌었나                                                                                                                                                        | 어디                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — 낮을수록 좋음 카운트 × 1.2, 높을수록 좋음 백분율 ÷ 1.2 (커버리지 하한 60 유지, `eslintErrors` 유지 0, `eslintWarnings` 0 → 동결 억제 카운트의 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` 참고는 → 이후의 모든 내용을 나열합니다)          |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                       | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, 모든 `frozen[*]` / `testFrozen[*]` 라인 캡 × 1.2                                                                                                     | `file-size-baseline.json`                                                                              |
| 파일별/TS 코드별 수는 × 1.2입니다.                                                                                                                                     | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                    | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` 자문이 되고 `_policy.requireTighten === false` 는 자문이 됩니다.                                                                                   | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| 야간 `bank-ratchet-shrinks` 일시 중지(측정된 축소를 저장하고 헤드룸을 취소함)                                                                                          | `.github/workflows/nightly-release-green.yml`                                                          |

허용 목록(`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`, ...)은 다음과 같습니다.** ~ 아니다** 예산은 건드리지 않았습니다. Pass/fail 정책 게이트(비밀, SQL 규칙, docs/env 계약, i18n 패리티, 단위 테스트)는 변경되지 않습니다. — 빨간색 테스트는 여전히 빨간색 테스트입니다.

**압형**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — 원샷 이완(`scripts/quality/relax-baselines.mjs`); 같은 메모로 두 번 실행하는 것을 거부합니다.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — 는 CI 와 같은 방식으로 모든 숫자 게이트를 측정하고 게이트당 남은 헤드룸(`scripts/quality/baseline-headroom.mjs`)을 인쇄합니다. 야간 `baseline-headroom` 작업은 워크플로 실행 요약에 테이블을 게시하고 해당 JSON/Markdown 보고서를 `baseline-headroom-<run_id>` 로 업로드하여 90일 동안 보관합니다. 경고 및 위험 행은 한도의 10% 이내이거나 이미 초과한 게이트를 식별합니다. 예산 소모에 대한 조기 경고로 이 보고서를 검토하세요. 문제가 있는 게이트의 `_rebaseline_*` 노트를 검사합니다. 해당 작업은 더 이상 영구적인 문제를 생성하거나 업데이트하지 않습니다. #12149 이전 보고서 기록을 보존합니다.

**2026년 8월 30일 이후 새 코드 모드(Clean-as-You-Code) —, PR 빠른 경로만 해당**

`pull_request` 이벤트에서 `quality.yml` `--base-ref <PR base SHA>` `check:file-size`, `check:complexity-ratchets` 및 `check:dead-code` 로 전달합니다. `check:complexity-ratchets` 및 `check:dead-code` 의 경우 게이트는 HEAD 병합 기반과 비교합니다.** PR 가 건드린 파일로 제한됨** (`scripts/check/newCodeMode.mjs`: 병합 기반은 일회용 `git worktree` 에서 구체화되고 ESLint/knip 그곳에서 실행되며 HEAD 에서는 파일별 수가 다릅니다.)

- **블로킹** — PR 는 변경된 파일(로그의 `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` )에 cyclomatic/cognitive 위반 또는 데드 내보내기를 추가했습니다.
- **자문** — 전체 합계와 고정된 기준선 비교. 상속된 드리프트는 결코 무고한 PR 빨간색으로 만들지 않습니다. 릴리스 조정 시 드리프트가 다시 동결되고 헤드룸 작업에서 감시됩니다.

`check:file-size` 자체 용어(`scripts/check/check-file-size.mjs`, #8522)에 따라 기본 참조를 사용합니다. 트리의 모든 소스 및 테스트 파일을 확인하고 `git show` 사용하여 PR 기본에서 각 줄 수를 읽으며 파일이 기본 한도(기준선 외부에 있는 파일의 경우 `frozen` / `testFrozen` 또는 `cap` / `testCap` )와 기본 크기를 초과하는 경우에만 파일이 실패합니다. 따라서 이미 베이스에 표류한 파일은 무고한 PR 레드화하지 않습니다.

`check:boundary:ratchet` 단일 숫자(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`)에 동일한 규칙을 적용합니다. PR 이벤트에서 `quality.yml` fast-gates와 `ci.yml` lint 작업은 모두 PR 베이스 SHA 를 전달하고 기본 커밋은 `git archive` 내보내기에서 측정되며 `open-sse → src` 에지 개수가 `metrics.boundaryOpenSseToSrc` 및 기본 개수보다 큰 경우에만 PR 실패합니다. 천장 위의 베이스 드리프트가 보고되지만(`base drift herdado`) 무고한 PR 은 빨간색으로 표시되지 않습니다. push → main은 절대 상한선을 유지하고, 확인할 수 없는 기본 SHA 경고와 함께 다시 그 상한선으로 돌아갑니다.

옴니 큐 후보( `omni-queue/**` 에 대한 푸시, [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md) 참조)는 풀 요청과 동일한 처리를 받습니다. 두 워크플로 모두 후보 기반(`needs.changes.outputs.candidateBase`)을 `--base-ref` 로 전달하고 `check:ts7-diagnostics-ratchet` 도 이에 대해 실행됩니다. 두 개의 새로운 코드 게이트의 경우 비교 기준은 상위 병합 커밋의 첫 번째 상위가 아닌 SHA 자체이므로 배치의 모든 풀 요청이 판단됩니다.

`workflow_dispatch` 실행, 릴리스-그린 스윕 및 야간 헤드룸 작업에는 PR 기반이 없으며 절대(글로벌) 비교를 유지합니다. 적용 범위, 복제 및 유형 적용 범위는 현재 전 세계적으로 유지됩니다(그들의 도구는 파일별 diff를 저렴하게 생성하지 않음). 동일한 처리에 대한 — 후보입니다.

**v4.0에서 단계 종료(LTS = "정상으로 돌아가지" 않고 이전보다 더 엄격해짐)**

1. 순수한 `release/v4.0.0` 팁: 기록을 위한 `npm run quality:headroom --json`, 그런 다음 `npm run quality:ratchet -- --update`, `check:file-size --update`, `check:complexity-ratchets --update`, `check:dead-code --update`, 각 유형 검사 게이트의 `--update` — 모든 기준선은 측정된 값으로 떨어집니다.
2. `quality-baseline.json` 에서 `_policy` 삭제하고( `--require-tighten` 및 야간 뱅킹을 다시 준비), `check-openapi-coverage.mjs` 에서 `THRESHOLD = 36` (또는 그 이상)를 복원합니다.
3. 모듈화가 성과를 거둔 측정 범위 이상으로 강화합니다. 파일 크기 `cap` 1000(또는 800)으로 되돌리고, 적용 범위는 + 5, 모듈화된 패키지에 대한 데드 익스포트는 0입니다.

## 래칫 기준선(`quality-baseline.json`)

래칫 엔진(`scripts/quality/check-quality-ratchet.mjs`)은 `quality-baseline.json` 읽고 이를 새로 수집된 `quality-metrics.json` 와 비교합니다. 엡실론 이상으로 회귀하는 측정항목은 빌드에 실패합니다.

현재 추적된 측정항목:

| 미터법                | 방향   | 의미                                     |
| --------------------- | ------ | ---------------------------------------- |
| `eslintWarnings`      | `down` | ESLint 경고 횟수가 늘어나서는 안 됩니다. |
| `coverage.statements` | `up`   | 명세서 적용 범위가 떨어지면 안 됩니다.   |
| `coverage.lines`      | `up`   | 라인 커버리지가 떨어지면 안 됩니다.      |
| `coverage.functions`  | `up`   | 기능 범위가 떨어지면 안 됩니다.          |
| `coverage.branches`   | `up`   | 지점 적용 범위가 떨어지면 안 됩니다.     |

진정한 개선 후 기준을 업데이트하려면 다음을 수행하십시오.

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` 플래그는 현재 측정된 값을 `quality-baseline.json` 에 씁니다. 개선 사항을 뱅킹하는 것은 release/nightly 기능이 아닌 PR 작업입니다. `--require-tighten` (Fase 6A.5)는 릴리스 모드(푸시, 일정, 릴리스 PR, 로컬 실행)에서만 뱅킹되지 않은 개선에 실패합니다. 기능 PR (`pr` 게이트 모드)에서는 개선 사항을 정보로 인쇄하고 통과합니다. 두 모드 모두에서 회귀가 실패합니다. 속도 단계에서는 모든 곳에서 권장됩니다(`_policy.requireTighten: false`). [생성된 파일 및 파생 기준선을](#generated-files-and-derived-baselines-written-at-release) 참조하십시오.

### CodeQL 래칫: 케이던스 새로 고침 및 수동 트리거

`check:codeql-ratchet` 읽기** repo 상태는 — 아닌 PR 일정에 따라 새로 고쳐집니다.** `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` 는 `state: configured`, `schedule: weekly`: 푸시별 분석이 아닌 GitHub 의 기본 설정 스캔을 보고합니다. 결과: FIXES 경고하는 PR 병합된 후 래칫은 다음 예약된 스캔이 — 실행할 때까지 이전의 더 높은 카운트를 계속 읽으므로 스캔이 따라잡을 때까지 PR 의 자체 후속 작업 수정을 포함하여 열려 있는 모든 PR 에 대한 회귀를 보고합니다.

**수동 새로고침** : `gh workflow run codeql.yml --ref release/vX.Y.Z` 분석을 다시 실행하고 몇 분 내에 알림을 다시 게시합니다. `.github/workflows/codeql.yml` 먼저 읽으십시오 — 의 헤더는 그것이 `workflow_dispatch` -only 설명합니다.** GitHub 의 "기본 설정"과 충돌하기 때문입니다.** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`). `push`/`pull_request`/ `schedule` 트리거를 복원하려면** 소유자 조치 먼저** : 설정 → 코드 보안 → CodeQL: 기본값 → Advanced. — 스위치 없이 `schedule:` 트리거를 추가하지 마십시오. 그러면 실행 실패만 생성됩니다.

**카운트가 떨어진 후 기준선을 강화하세요.** — `node scripts/check/check-codeql-ratchet.mjs --update` 새로 측정된 개수를 `quality-baseline.json` → `metrics.codeqlAlerts.value` 에 기록하므로 래칫은 자동으로 이전 천장까지 회귀를 허용하지 않습니다. 실제 사례(2026-09-02/03): PR #12502 고정 7개 실제 경고(13개 → 6개 개방 측정); PR #12530 일치하도록 고정된 기준선 11 → 6을 강화했습니다. 그런 다음 나머지 6개는 경고별로 정당화되어 0개 열림으로 축소되었습니다.

**해고는 교환원의 요청입니다(엄격한 규칙 #14)** — 해제 주석에 기술적인 정당성을 기록하지 않고 CodeQL 경고를 해제하지 않습니다. 업스트림 프로토콜 요구 사항에 대한 `won't fix`, 테스트 픽스처에 대한 `used in tests`, 살균제에 대한 `false positive` CodeQL 볼 수 없습니다(선례: `docs/security/ERROR_SANITIZATION.md`).

---

## 테스트 재시도 정책 (WS5.4, v3.8.49)

재시도는 러너별로 적용하며, 절대로 전역적으로 일괄 적용하지 않습니다. 일괄 재시도는 실제 회귀를
보이지 않는 플레이크로 바꿉니다.

| 러너             | 정책                                                                                                        | 이유                                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | CI에서만 `retries: 1`, `trace: on-first-retry` 사용                                                         | 브라우저/네트워크 타이밍은 실제로 비결정적일 수 있습니다. 트레이스를 포함한 한 번의 재시도로 플레이크를 진단 가능한 아티팩트로 전환합니다 |
| Vitest           | 전역 재시도 없음. 플레이크로 확인된 테스트에만 명시적인 테스트별 재시도 적용(diff에 표시되고 PR에서 검토됨) | 격리 목록을 불투명하게 숨기지 않고 저장소에 유지합니다                                                                                    |
| node:test (단위) | 어떤 경우에도 재시도 없음                                                                                   | 불안정한 단위 테스트는 테스트의 버그입니다. 다시 돌리지 말고 수정해야 합니다                                                              |

플레이크 텔레메트리가 적용된 후의 목표 SLO(WS5.2/5.3): 테스트별 플레이크율 <1%
("즉시 수정" 임계값), 파이프라인별 통과율 ≥95%. 업계 참조값이며,
자체 측정값에 맞춰 재조정합니다.

## 릴리스 수준 래칫 드리프트 (WS5.5, v3.8.49)

래칫(파일 크기, 복잡도, eslint 경고)이 순수 릴리스 팁에서 회귀한 경우,
즉 병합의 조합으로 인해 회귀가 발생했지만 개별 PR 브랜치에서는 어느 것도
단독으로 회귀를 재현하지 못하는 경우, 수정 책임은 **릴리스 캡틴에게 있으며, 릴리스 브랜치에서 한 번만**
수행합니다. 추출/리팩터링을 우선하고, 문서화된 근거 항목이 있을 때만 기준선을 재설정합니다.
조합 드리프트를 기여자의 PR에 전가하지 말고, PR별로 기준선을 재설정하지 마십시오
(그렇게 하면 실제 회귀가 숨겨집니다). 먼저 구분하십시오. 자신의 PR이 원인이라고 가정하기 전에
프로브 worktree에서 순수 팁을 기준으로 실패를 재현해야 합니다.

## 생성된 파일 및 파생된 기준선(릴리스 시 작성됨)

계획 2026-11-13("파생 숫자 및 텍스트는 릴리스 시에만 해결됨"): PR 기능이** 원천** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, 기술 카탈로그, 무료 계층 카탈로그, 새로운 e2e 사양. 해당 소스에서 계산된 파일을 재생성하지 않으며 측정된 개선 사항을 기준에 반영하지 않습니다. 이러한 파일은 릴리스 새로 고침(`release:refresh-derived`) 또는 야간 새로 고침 PR 에 의해 한 번 다시 작성됩니다. 이전에는 모든 형제 PR 자체적으로 재생성된 복사본을 가지고 있었고 다음 병합과 충돌했습니다(2026-11-13: 30/321 open PRs rewrite `PROVIDER_REFERENCE.md`, 26–28 rewrite the README Diagrams).

**경비원.** `check:pr-derived-paths` (작업 `pr-test-policy`)는 `config/quality/derived-paths/` 의 계열 파일에 접근하는 기능 PR 에 실패합니다.

| 가족        | 파일                                                                                                                                                                      | 재작성자:                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; 12개의 생성된 README SVGs; `skills/*/references/**`; 사용자 정의 블록이 없는 `SKILL.md` 파일 | `release:refresh-derived` (사실), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                         | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                    |

작성자(기준선의 경우 `release/v*`, `chore/derived-*` 및 `chore/bank-ratchet-*` )는 면제됩니다. 하나의 패밀리와 그 컴패니언( `generated` 의 경우: 생성기 스크립트, 해당 테스트, 에이전트 기술 입력 — `src/shared/constants/agentSkills.ts`, 손으로 작성한 `skills/**` 문서, `docs/openapi.yaml` — 및 `changelog.d/**`)만 변경하는 PR 도 마찬가지입니다. 예를 들어 재생성된 SVG 사용한 영웅 레이아웃 변경 또는 재생성된 `SKILL.md` 파일을 읽는 테스트의 기술 수정입니다. 손으로 작성한 `<!-- skill:custom-start -->` 블록이 있는 `SKILL.md` 은 제품군에 속하지 않습니다. 해당 사용자 정의 블록은 기능 옆에서 편집 가능한 상태로 유지됩니다.

고아 정리는 패밀리에 의해 판단되지 않습니다. 병합 베이스에 해당 미러가 있고 `<doc>` 더 이상 PR 의 헤드에 존재하지 않으면 PR `docs/i18n/<locale>/<doc>` 삭제할 수 있으며 `sources` 에서 그러한 문서를 삭제하기 위해 `.i18n-state.json` 편집할 수 있습니다. 경비원은 해당 파일을 `orphan-cleanup` 아래에 나열합니다. 여전히 존재하는 문서의 미러를 삭제하면 위반이 유지됩니다. 다른 파이프라인에서는 해당 상태를 추적하지 않으며 `llm.txt` 및 `CHANGELOG.md` 미러에는 자체 작성자가 있습니다.

**게이트 모드별 수표** (`scripts/check/lib/gateMode.mjs`; 도우미 `scripts/check/lib/derivedArtifactScope.mjs`):

| 확인하다                                                               | `release` (푸시, 예약, 릴리스 PR, 로컬)                              | `pr` ( PR 기능, 대기열 배치)                                                                                                                                                                    |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                              | 모든 기술은 발전기 출력과 동일해야 합니다.                           | 생성된 텍스트(사용자 정의 블록 외부) 또는 `references/` PR 를 편집하는 기술만; 그렇지 않으면 `SKIP reason=pr-mode`                                                                              |
| `check:generated-artifacts` (README SVGs + e2e 타이밍, 전체 기록 필요) | 모든 SVG 는 생성기와 같습니다. 모든 사양에는 타이밍 항목이 있습니다. | PR 편집하는 인공물만; 나머지 `SKIP reason=pr-mode`; 차이 없음 기본 → 판단된 모든 아티팩트(페일클로즈)                                                                                           |
| README SVG 바이트 비교 테스트(`tests/unit/docs/readme-*-svg.test.ts`)  | 모든 SVG                                                             | 기본이 해결될 때 PR 는 SVG 만 편집합니다. `test-unit` 의 얕은 PR 체크아웃에는 기반이 없으므로 테스트는 `SKIP reason=base-unresolved` 로 건너뛰고 `check:generated-artifacts` 비교를 소유합니다. |
| e2e 타이밍 완전성(`tests/unit/balance-e2e-shards.test.ts`)             | 모든 사양에는 항목이 있습니다.                                       | SVG 테스트와 동일한 규칙(새 사양은 중앙값 가중치로 실행됨)                                                                                                                                      |
| `check-quality-ratchet.mjs --require-tighten`                          | 뱅킹되지 않은 개선 실패( `_policy` 제외)                             | 개선이 보고되었으며 결코 실패하지 않았습니다. 회귀는 여전히 실패                                                                                                                                |

릴리스 모드는 분할 이전에 이러한 검사가 가졌던 판정, 종료 코드 및 메시지를 유지합니다. 최대 한 줄이 추가되어 해결 모드의 이름을 지정합니다(`[agent-skills-sync] mode=release (auto: local run)`). 테스트는 `check:test-masking` 보고 전용 블록에 나열하는 node:test의 `{ skip: releaseOnlyUnlessTouched(...) }` 옵션을 건너뜁니다( `.skip(` 도 아니고 `{ skip: true }` 도 아니므로 하드 건너뛰기로 간주되지 않습니다). `check:generated-artifacts` 기본이 해결 가능한 곳에서 실행됩니다: 작업 `lint` (`fetch-depth: 0`), `check:agent-skills-sync` 바로 다음에. 로컬에서 `npm run check:generated-artifacts -- --mode=pr` 해당 단계가 PR 에서 판단하는 내용을 보여줍니다. `check:docs-counts` 의 공급자 전체 교차 검사("공급자 참조 합계(문서 vs 라이브 모듈)")는 카운트 게이트의 일부이며 해당 게이트의 자체 모드를 따릅니다.

의도적으로 제품군에 포함되지 않음: 사람들이 결정한 정책 파일(`gate-manifest.json`, 허용 목록, `admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`) 및 PR 기능의 한도는 코드(`quality-baseline.json` 메트릭 항목, typecheck/file-size/complexity 기준선, PR 동결된 위반을 수정할 때 사전 커밋 ESLint 실행에 의해 정리된 `eslint-suppressions.json` — )와 함께 편집해야 할 수 있습니다. `src/i18n/routeNamespaces.generated.json` 도 생성되지만 PRs 기능을 유지합니다. 앱은 런타임에 zql을 가져오므로 새로 고침을 기다릴 수 없습니다.

## 래칫 축소분 반영 — 하향 방향 (#8584)

래칫은 절반만 자동화되어 있으며, 그것도 잘못된 절반입니다. 상한을 **높이는** 것은
10초면 끝나는 수동 JSON 편집이며, 실패한 PR의 차단을 해제하는 가장 빠른 방법입니다.
상한을 **낮추려면** 누군가 `--update`를 실행하고 결과를 커밋해야 합니다. 하지만
`bank-ratchet-shrinks` 작업이 추가되기 전까지 이를 실행하는 워크플로는 없었습니다.
측정된 결과(2026-07-25): 800줄 신규 파일 상한 이하인 동결 파일이 이미 18개였고, 최악은
132배였습니다(`src/shared/validation/schemas.ts`, 19줄 파일에 2,523 상한 적용).
복잡도 상한은 약 37개의 기준선 재설정 메모에 걸쳐 `1794 → 2169`로 증가했으며,
감소는 정확히 한 번(−1)이었습니다. 또한 "다음 주기에 `--update`로 강화"한다는 문구는
31번 작성되었지만 실제로 이행된 것은 한 번뿐이었습니다. 상한이 그 상한을 발생시킨
코드보다 오래 남으면, 완료된 모든 분해 작업이 해당 파일을 다음에 편집하는 사람을 위한
증가 허용량으로 조용히 바뀝니다.

`nightly-release-green.yml` → **`bank-ratchet-shrinks`** 작업이 이 루프를 닫습니다.

|           |                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------- |
| 실행 조건 | `schedule`(하루 3회) + `workflow_dispatch` — 의도적으로 `push`에서는 실행하지 않음             |
| 측정 대상 | 가장 높은 `release/vX.Y.Z`, `release-green`과 동일한 해석 방식 및 주입 방지 장치 적용          |
| 기록 내용 | `check:file-size --update` 및 `check:complexity-ratchets --update`(둘 다 설계상 축소만 가능)   |
| 검증 방법 | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                       |
| 제공 방식 | 릴리스 브랜치를 대상으로 항상 최신 상태인 PR 하나 — 강제 업데이트하며, 중복 PR을 생성하지 않음 |

축소분 반영은 지연 시간 요구사항이 없으므로 푸시별이 아니라 일괄 처리합니다
(8시간 이내에 축소분이 반영되면 충분합니다). 반면 병합별 실행은 병합 작업이 집중되는 동안
PR 브랜치를 반복해서 다시 빌드하고 매번 전체 ESLint 순회 비용을 발생시킵니다.
감지는 계속 푸시 시점(`release-green`)에 수행하며, 반영만 일괄 처리합니다.

### 안전성 검증기

이 작업은 사람의 개입 없이 기준선에 기록하므로, 이를 안전하게 만드는 것은
`verify-ratchet-bank.mjs`입니다. 이 스크립트는 `--update` 실행 후의 트리를 `HEAD`와
비교하며, 모든 변경이 다음 중 하나에 해당하지 않으면 **커밋이 생성되기 전에 작업을 중단**하여
PR도 열지 않습니다.

- `frozen` / `testFrozen` 숫자 항목의 값이 **낮아지거나** 항목이 **제거됨**
- `complexity-baseline.json` → `count`가 **낮아짐**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value`가 **낮아짐**

그 밖의 모든 변경은 실패합니다. 숫자를 높이거나, 항목을 추가하거나, `cap`/`testCap`을 변경하거나,
`_rebaseline_*` 메모를 삭제/재작성하는 경우가 이에 해당합니다. 이러한 메모는 각 상한이 존재하는
이유를 보여 주는 감사 추적 기록이며, 파일 항목과 동일한 `frozen` 객체 안에 저장됩니다.
상한을 높일 수 있는 봇은 현 상태보다 명백히 더 나쁩니다. 회귀 방지 테스트:
`tests/unit/verify-ratchet-bank.test.ts`.

이 작업은 절대로 `release/*`에 푸시하지 않습니다. PR은 사람이 병합하므로,
잘못된 측정값이 검토 없이 반영될 수 없습니다.

## 허용 목록 정책

기존 위반에 대해 실패할 수 없는 모든 게이트는 고정된 허용 목록(예: `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`)을 사용합니다. 정책은 다음과 같습니다.

**근본 원인을 수정하세요. 위반 사항이 이미 존재하고 동일한 PR 에서 수정할 수 없는 경우에만 허용 목록을 사용하세요.**

허용 목록에 항목을 추가하는 경우:

1. 이유와 함께 설명을 포함하세요.
2. 추적 문제를 참조하세요(예: `// #3498 — Phase 2 feature, not yet implemented`).
3. 위반을 수정하는 동일한 PR 에서 항목을 제거합니다. — 더 이상 활성 위반을 억제하지 않는 오래된 항목은 그 자체로 결함입니다(6A.3 오래된 시행은 일단 구현되면 고아 허용 목록 항목에 대한 게이트를 실패하게 됩니다).

하다** ~ 아니다** 테스트를 더 빠르게 통과하려면 허용 목록 항목을 추가하세요. 허용 목록이 늘어나는 녹색 게이트는 품질에 대한 잘못된 인식입니다.

### PR 의 게이트가 실패하는 경우

1. **게이트 출력을 주의 깊게 읽으십시오.** — 어떤 파일이나 기호가 규칙을 위반했는지 정확하게 알려줍니다.
2. **위반 사항을 수정하세요.** 대부분의 — 는 코드가 정확하자마자 통과하는 결정론적 파일 시스템 검사입니다.
3. **위반사항이 이미 존재하는 경우** (즉, 소개하지 않았지만 이제 게이트에서 다룹니다.): 근거 설명과 추적 문제가 포함된 허용 목록 항목을 추가합니다.
4. **게이트가 래칫인 경우** (적용 범위, ESLint 경고, 중복, 복잡성): 변경으로 인해 측정항목이 더 나빠졌습니다. 근본적인 문제를 해결하거나, 변경이 의도적이며 메트릭 성능 저하가 허용되는 경우 `npm run quality:ratchet -- --update` (드물게) 실행합니다. — 하지만 PR 설명에 그 이유를 문서화하세요.
5. **자문 게이트** (`continue-on-error: true`)는 정보용 — 이며 병합을 차단하지 않지만 CI 요약에 나타납니다. 어쨌든 문제를 해결하세요.

---

## 새 게이트 추가하기

1. `scripts/check/check-<name>.mjs`(또는 `.ts`)를 생성합니다. 정책 게이트는 0/1로 종료됩니다.
   래칫 방식의 게이트는 `collect-metrics.mjs`를 통해 `quality-metrics.json`에 지표를 출력합니다.
2. `package.json`에 `"check:<name>": "node scripts/check/check-<name>.mjs"`를 추가합니다.
3. `.github/workflows/ci.yml`의 적절한 작업 아래에 연결합니다
   (정책 → `lint` 또는 `docs-sync-strict`, 래칫 → `quality-gate`).
4. 허용 목록이 있는 경우 오래된 항목이 자동으로 감지되도록
   `scripts/check/lib/allowlist.mjs`의 `reportStaleEntries()`를 적용합니다.
5. 게이트의 감지 로직을 다루는 테스트를 `tests/unit/build/`에 작성합니다.
6. 이 문서를 업데이트합니다(관련 작업 표에 행을 추가합니다).

---

## 에이전트 도구: LSP-in-the-loop(선택 사항)

CI 게이트 외에도 OmniRoute는 **선택 사항**인 `agent-lsp` 스캐폴드
(프로젝트 수준의 `.mcp.json`, 7단계 작업 15)를 제공합니다. `.mcp.json`을 생성하여
코딩 에이전트에 TypeScript 언어 서버를 노출하면, 에이전트가 코드를 작성하기 **전에** 심볼과
진단을 확인할 수 있습니다. 이는 `typecheck:core`를 보완하는 사전 컴파일 방식으로,
"존재하지 않는 심볼을 지어내는" 오류를 원천적으로 줄여 줍니다. 의도적으로 자동 로드되지 않으며
(MCP↔LSP 브리지는 직접 선택하고 검증해야 함), 잘못된 항목이 있더라도 연결 오류만 기록될 뿐
세션이 중단되지는 않습니다.

---

## 합리화 백로그(ROI review — Fase 9 Onda 3)

이 인벤토리는 2026년 6월 17일에 `ci.yml` 에 대해 조정되었습니다(이전 버전에서는 `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence` 생략됨). 조정된 세트에 대한 ROI 검토를 통해 다음과 같은 합리화 후보가 식별되었습니다.** 병합은 기계적 CI 변경입니다. flips/drops 운영자를 위해 예약된 정책 결정입니다.** 아래에는 아직 적용된 항목이 없습니다.

**또한 위에 문서화되지 않은** (권고, 낮은 신호): `docs-lint` 작업(markdownlint + Vale, 전체 작업 `continue-on-error`) 및 독립형 스캐너 워크플로 `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` 는 `quality-baseline.json` 에 있지만 `ci.yml` — 의 차단 래칫에 연결되어 있지 않습니다. 메트릭은 현재 고아입니다.

### 병합/중복 제거(기계적, 위험 감소)

각 후보는 2026년 6월 17일 라이브 게이트 상태에 대해 검증되었습니다(신뢰하되 검증). 여러 가지 "명백한" 합병이 부채를 숨기기 위한 것으로 드러났고** ~ 아니다** 깨끗한 드롭 인.

- **`check:docs-sync` 두 번 실행됩니다.** `lint` 작업의 — 독립 실행형 및 다시 `check:docs-all` (`docs-sync-strict`) 및 허스키 사전 커밋 후크 내부. ✅**DONE** — 독립형 `lint` 호출이 제거되었습니다.
- **CVE 스캐닝** — ❌**NOT 깨끗한 병합.** `audit:deps` 5개 잠금 파일 모두에서 중요한 권고와 불완전한 감사를 차단하는 동시에 현재 정책에 따라 높은 권고를 경고로 보고합니다. `check:vuln-ratchet` (osv)는 체크인된 기준선에 대한 _회귀_에서만 실패하고 필요한 경우 누락된 측정을 거부합니다. 다른 의미론 — `audit:deps` 삭제하면 절대 중요 게이트와 독립 패키지 감사 영수증이 손실됩니다. 둘 다 유지하세요.
- **사이클 감지** — ✅**DONE** (#15159 G-01/G-02). 여기의 오래된 텍스트는 `check:cycles` "녹색, 선별된" 게이트라고 부르고 `check:circular-deps` (dpdm)가 91사이클을 보고했기 때문에 이를 차단하는 것을 정당화했습니다. 그 녹색은** 가짜 녹색** : `check:cycles` 5개의 하위 디렉터리(450개 파일)를 스캔하고 정적 `import|export … from` 만 일치했으며 모든 `@/` 및 `@omniroute/open-sse/` 지정자를 삭제했으므로 저장소를 지배하는 동적 가져오기 + 별칭 주기를 볼 수 없습니다. 수정됨: 이제 게이트가 `src` + `open-sse` (5023개 파일)를 탐색하고, TypeScript AST 에서 지정자를 수집하고(따라서 `import("…")` 계산하고 유형 위치 `typeof import("…")` 계산하지 않음) tsconfig `paths` 해결합니다. 그것은 발견한다** 14** 사이클은 0이 아닙니다. 기존의 14개 사이클은 게이트 PR 에 고정될 수 없기 때문에 이제 `check:cycles` 는** 래칫 휠 장치** (`--ratchet`, `quality-baseline.json`, `direction: down` 의 천장 `metrics.cycles.value = 14` ) — 모든 _회귀_를 차단하고 개수는 감소할 수만 있습니다. CI `npm run check:cycles:ratchet` 실행합니다. Burn-down 라이드와 함께**A-01** . `check:circular-deps` (dpdm)는 더 넓은 2차 의견으로 자문을 유지합니다.
- **복잡성** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): 한 번의 ESLint 걷기, ruleId 로 계산되므로 순환적 + 최대 라인과 인지 기준선은 독립적으로 유지됩니다. 개별 `check:complexity` / `check:cognitive-complexity` 로컬 `--update` 로 유지됩니다.
- **`/api` 환각 방지** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` 의 하나의 FS 인벤토리, openapi-routes + docs-symbols는 여전히 독립적으로 보고합니다. 개인은 지역 실행 중를 위해 남아 있습니다.
- **`check:node-runtime` 11개의 작업에서 실행됩니다.** — ⚠️** 낮은 ROI.** 각각은 별도의 러너이며 수표는 < 1s입니다. 저렴한 작업당 가드를 잃는 것에 대비하여 총 절감액은 ~ 10s입니다. 이탈할 가치가 없습니다.
- **CI 린트의 `typecheck:noimplicit:core`** — ✅** 린트 작업에서 제거됨** (자문 `continue-on-error` 였습니다); 차단 유형 표면은 `typecheck:core` + `check:type-coverage` 입니다. 로컬 스크립트가 유지됩니다.

### 뒤집기 / 결정 (운영자 정책)

- `check:openapi-security-tiers` (권고) — ❌**NOT 깔끔하게 뒤집힐 수 있습니다.** 0으로 종료되지만 `LOCAL_ONLY_API_PREFIXES` 아래의 여러 `traffic-inspector` 경로에 `x-loopback-only: true` 주석이 부족하다는 경고가 표시됩니다. 이를 시행하려면 먼저 해당 주석을 `openapi.yaml` 에 추가해야 합니다.
- `typecheck:noimplicit:core` (권고) — 대부분 차단 `check:type-coverage` 래칫에 포함됩니다. 래칫으로 뒤집거나 중복된 두 번째 `tsc` 패스를 삭제합니다.
- `test:vitest:ui` (현재** 블로킹** ) — 기존 오류는 `// #8618` 추적 주석을 사용하여 `vitest.config.ts` 에서 명시적으로 제외됩니다. 새로운 실패로 인해 작업이 실패합니다.
- `check:secrets` (gitleaks, 3개의 문서화된 오탐지에서 래칫 동결 차단) — 3개를 허용 목록에 추가하여 0에 도달하거나 권고로 강등합니다. GitHub 기본 비밀 검색 + `check:public-creds` 와 겹칩니다.
- `check:pr-evidence` (차단, grep PR-body 산문) — 높은 위양성 위험; 삭제되면 엄격한 규칙 #18 시행이 약화되므로 이는 진정한 정책 호출입니다.
- `semgrep` (자립형 권고) — OWASP 제품군에 대해 CodeQL 와 겹칩니다. 기준선을 래칫이나 드롭에 연결합니다.

---

## 관련 문서

- 공급망(출처, SBOM, Trivy, 스코어카드): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — 키 세트 패리티 게이트

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, 작업 `i18n-ui-coverage`). 모든 `src/i18n/messages/<locale>.json` 의 리프 키 세트를 `en.json` 와 비교하고 키가 추가된 시점에 관계없이 리프가 없거나 추가된 리프에서는 실패합니다. `__MISSING__:` 자리 표시자는 존재하는 것으로 간주됩니다(그 내용은 비율 게이트의 업무입니다). 이는 두 개의 diff-based/percentage 게이트를 완전히 보완한 것입니다. `check-ui-keys-coverage` 로케일당 80% 플로어를 적용하고( ~ 13,000개 중 43개의 부재 키는 여전히 99.7%를 읽음) `check-new-key-coverage` PR 가 `en.json` 에 추가한 키만 판단합니다. 로케일 배치는 분기가 잘린 날의 `en.json` 에서 생성되고 베이스가 키를 계속 추가하는 동안 며칠 동안 변환됩니다. 배치 PR 키 자체를 추가하지 않으므로 배치 1(#13044)이 9개 로케일에서 43개의 키가 부족하고 배치 2(#13660)가 8개(2026-09-15)에서 10개의 키가 부족할 때 두 형제 모두 침묵을 지켰습니다. `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` 로 빨간색을 수정합니다. `extra` 리프는 소스가 그것을 떨어뜨렸다는 것을 의미합니다. — `sync-ui-keys` 그것을 떨어뜨렸습니다(`--prune-extra`, 기본값). `--warn` 실패 없이 보고합니다. `--catalog=cli` `bin/cli/locales` (`npm run i18n:check-keys:cli`)에 대해 동일한 비교를 실행합니다. 두 단계 모두 작업 `i18n-ui-coverage` 에 있습니다. 절대 검사는 릴리스 모드에만 해당됩니다. PR 기능은 `SKIP reason=pr-mode` 확인하고 수정 사항은 릴리스 새로 고침 또는 번역 웨이브에서 실행되며 PR 기능에서는 실행되지 않습니다. 로케일 카탈로그를 변경하는 PR 는 대신 병합 기반에 대해 각각을 판단합니다(작업 `i18n-ui-coverage` 아래의 "두 가지 모드" 참조).

#### `check-new-key-coverage` — 새 키 i18n 게이트

`check-ui-value-drift` 의 형제. 그것은 영어 값을 포착합니다.** 다시 쓴** 번역은 남겨졌지만; 이건 영어 키를 잡아요.** 추가됨** 일부 로케일에서는 수신되지 않았습니다.

`check-ui-keys-coverage` 이 클래스를 볼 수 없습니다. 로케일별로 바닥 백분율을 적용하고 ~ 13,000개 중 11개의 키가 없으면 적용 범위가 99.9%로 유지됩니다. 언어당 백분율은 "이 기능은 번역되지 않은 상태로 배송됨"을 표현할 수 없습니다. — 전체 기능은 텍스트 없이 새 로케일에 제공될 수 있으며 숫자를 절대 이동할 수 없습니다.

인코딩된 사건: 오케스트레이션 캔버스의 3단계에서는 당시 존재했던 42개 로케일에 걸쳐 11개의 키를 번역했습니다. 몇 시간 후 EU 언어 배치(#13044)는 저장소를 51개 로케일로 가져갔고 9명의 신규 사용자(`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`)는 이를 받지 못했습니다. `deepMergeFallback` 키가 없는 것을 영어로 대체하므로 실패 모드는 공백 UI — real이 아닌 번역되지 않은 UI 이었으며 구성에 따라 침묵했습니다.

그 형제처럼** 차이점 인식** , 병합 기반의 영어를 작업 트리와 비교하므로 기존 간격은 동결된 상태로 유지되며 게이트를 켜기 위해 마이그레이션이 필요하지 않습니다.

**`__MISSING__:<english>` 마커는 이를 만족하지 않습니다(2026-09-17 이후).** 2026년 9월 16일의 8개 기능 PRs 61개의 키를 추가하고 번역하는 대신 65개의 로케일 모두에 마커를 스탬프할 때까지 런타임은 영어 — 수정하기 위해 문서화된 지연 — 였습니다. 이 게이트는 모든 키를 허용하고 아무것도 PRs 를 차단하지 않았으며 차단 실제 번역 비율 게이트는 모든 사람을 위한 릴리스 팁에서 실패했습니다(pt-BR 3.2% > 2.5% + 0.5). 이제 마커는 번역이 없는 것으로 판단됩니다. 2026년 11월 13일 이후에만 릴리스 모드: PR 기능은 `SKIP reason=pr-mode` 확인하고 릴리스 PR (`BASE_REF=origin/main`)에서는 게이트가 사이클에 추가된 모든 키를 판단합니다. 릴리스 새로 고침 또는 `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` 사용한 변환 웨이브 또는 `npm run i18n:translate-new-keys` 과 병렬로 모든 로케일의 빨간색을 수정합니다(`scripts/i18n/translate-new-keys.sh`, 분리 안전, `OMNIROUTE_TRANSLATION_*` env 없이 시작을 거부함). 영어로 유지되어야 하는 키(고정된 product/engine/flag 이름)는 `scripts/i18n/untranslatable-keys.json` 에 속하며 결코 마커 뒤에 속하지 않습니다. `vi` 마커를 완전히 금지합니다(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — 주차 테스트 게이트

`vitest.config.ts` 의 `exclude` 목록에 있는 파일은 실행되지 않는 테스트이며 트리를 읽는 사람에게는 적용되는 것처럼 보입니다. `// #8618 — pre-existing failure; remove this exclusion when fixed` 댓글 뒤에는 62개의 파일이 축적되어 있습니다. 문제 #8618 2026년 8월 11일에 종료되었으며 추적한 목록은 45개 항목에서 62개 항목으로 늘어났으며 각각의 새로운 항목은 죽은 문제를 가리키는 주석을 상속했습니다. 최종적으로 파일별로 목록을 측정했을 때(#13204),** 62개 중 51개가 소스 변경 없이 현재 트리에 대해 전달되었습니다.** .

게이트에는 (a) 추적 문제의 이름을 지정하고 (b) 측정된 상태와 함께 `config/quality/vitest-exclusions.json` 에 표시하기 위해 실제 파일로 확인되는 모든 제외가 필요하므로 하나를 추가하는 것은 60개 항목 배열에서 한 줄을 더 추가하는 것이 아니라 전용 파일에서 검토 가능한 diff입니다. ~ 10분의 비용이 들고 정기적인 작업에 속하는 제외된 테스트 — 의도적으로 다시 실행하지 않습니다. 재고는 각각이 마지막으로 측정된 시기를 기록합니다.
