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

### 후보 승인

CI 및 Quality Gates 워크플로는 각각 안정적인 판정 결과인 `Gate / CI`와
`Gate / Quality`를 생성합니다. 버전이 지정된 승인 정책은 모든 업스트림 작업을
필수 또는 권고 항목으로 열거합니다. 적용 가능한 필수 작업은 반드시 성공해야 합니다.
누락, 취소, 건너뜀, 대기 중 및 알 수 없는 결과로는 PASS를 확정할 수 없습니다. 유효한
문서 전용 또는 카탈로그 전용 분류를 통해 코드 레인을 적용 대상에서 제외할 수 있지만,
초안 PR은 승인된 후보가 아닙니다. `hotfix` 레이블이 증거 요건을 면제하지는 않습니다.

두 워크플로는 main/release 브랜치로 향하는 PR, `main`으로의 푸시, 수동 디스패치
및 병합 그룹 이벤트를 모두 처리합니다. 푸시, 디스패치 및 병합 그룹에서는 전체 선택 항목을 실행합니다.
`release/**`로의 푸시는 이 워크플로를 시작하지 않습니다(2026-10-18). 각 변경 사항은 이미 해당 PR에서
매트릭스를 실행했으며, 병합된 조합은 Release-Green이 담당하기 때문입니다
(`docs/ops/RUNNER_BOX.md` → 호스팅 레인). 포크와 병합 그룹은 원래 자체 호스팅
러너를 선택하는 작업에도 호스팅 러너를 사용합니다. 출시 전에 충분한 호스팅 용량을
검증해야 합니다.

각 JSON 영수증은 체크아웃된 SHA, 워크플로 실행 및 시도를 식별합니다.
CLI는 체크아웃 SHA와 이벤트 SHA가 일치하지 않으면 거부합니다. 워크플로 테스트는 정책 멤버십을
판정 작업의 `needs` 목록에 연결하므로, 레인이 추가되거나 제거되더라도 자동으로 누락될 수 없습니다.
영수증은 자체 워크플로만 다루며, 게시, 배포 또는 기존 권고성
스캐너의 내부 구조는 다루지 않습니다. 브랜치 규칙에서 해당 검사를 필수로 지정하는 것은
별도의 관리 변경 사항이며, 작업을 정의하는 것만으로는 브랜치가 보호되지 않습니다.

`API Route Typecheck`은 두 종합 판정 및 로컬 전체 옵저버의 정적 프로필
모두에 포함되지 않는 독립적인 워크플로 검사입니다. 정확한 후보에 대한 결과를 별도로
검사하십시오. `.github/workflows/api-route-typecheck.yml`은 `main` 또는
`release/**`을 대상으로 하는 PR, 두 브랜치 계열 중 하나에 대한 푸시, 수동 디스패치에서 실행됩니다. 경로 필터는
없습니다. PR 대상 베이스를 변경하면 새 검사가 요청됩니다. 본문/제목 편집에는 관찰 전용 이름
`Admission not requested / API Route Typecheck`이 사용되며 승인 검사를 대체할 수 없습니다.
이 워크플로는 병합 그룹 트리거를 선언하지 않습니다. 이 검사를 요구하는 병합 큐를 도입하려면
먼저 해당 이벤트에 대해 이 검사가 실행되도록 설정해야 합니다.

### UI 실행 용량

CI는 전체 UI 인벤토리를 네 개의 `test-vitest` 매트릭스 샤드로 실행하며, 각 샤드는 최대
두 개의 워커와 기존 15분 작업 제한 시간을 사용합니다. 첫 번째 샤드는
MCP/autoCombo Vitest 스위트도 실행합니다. 필수 작업 결과는 모든 매트릭스 실행 단위를 포함합니다.
샤드 하나라도 실패하거나 취소되면 후보 승인을 확정할 수 없습니다.

야간 옵저버는 각 UI 샤드에 대해 정확한 후보별 영수증을 별도로 유지하며,
첫 번째 영수증에는 MCP 실행도 포함됩니다. 네 개의 영수증, 로그 및 일치하는
실행 ID가 모두 필요합니다. 로컬 `npm run test:vitest:ui`는 여전히
전체 스위트를 선택합니다. 단일 `--shard` 실행은 부분적인 증거에 불과합니다.

### 유닛 커버리지 수집

12개의 유닛 샤드는 기존 테스트 실행 중에 V8 커버리지를 수집합니다. 성공한
샤드는 `scripts/ci/compact-v8-coverage.mjs`를 실행하여 중간 Istanbul 보고서를
생성하지 않고 원본 파일을 압축합니다. 최종 Coverage 작업은 12개 매니페스트 모두를
후보 SHA, 런타임, 소스 루트 및 데이터 해시와 대조하여 검증한 다음, c8 리포터와 기존
커버리지 임계값을 실행합니다. 입력은 c8의 전역 파일 이름 순서를 유지합니다. 함수/블록 커버리지가
혼합된 경우 샤드별 사전 병합은 안전하지 않습니다. 샤드가 누락되거나 형식이 잘못되었거나
호환되지 않으면 승인이 실패합니다. 실패한 테스트 샤드의 원시 진단 커버리지는 별도로
보존되며, 최종 병합에 포함할 수 없습니다.

### 유닛 실행 진행 상황 영수증

공유 `test:unit:ci:shard` 명령은 `scripts/ci/unit-progress-reporter.mjs`를 통해 `primary`, `dashboard`, `serial`
단계를 기록합니다. 일반 테스트 보고서는 계속
사용할 수 있습니다. 별도의 메타데이터 전용 영수증은 각 파일의 시작과 완료를 기록하며,
30초 간격의 하트비트에는 아직 활성 상태인 파일과 해당 파일의 경과 시간이 나열됩니다. 허용 목록에 포함된
실행 메타데이터만 기록하며, 테스트 설명, 출력, 오류 본문 및 전체
환경은 직렬화하지 않습니다.

CI와 Quality는 JSONL 파일을 `unit-progress-ci-<run>-<attempt>-<shard>` 및
`unit-progress-quality-<run>-<attempt>-<shard>`로 보관합니다. 작업 시간 초과로 인해 이후 업로드가 수행되지 않을 수 있지만,
이미 전송된 하트비트는 진단 증거로 남습니다. 하트비트가 누락된 경우
러너 프로세스가 차단되었거나 종료되었음을 나타낼 수도 있습니다. 이러한 영수증은 기존 테스트 선택,
동시성, 기한 및 종료 상태를 그대로 유지하며, 후보 승인 여부에 대한 판정은 아닙니다.

### 승인 결과 집계기의 보관 증거

`scripts/quality/validate-release-acceptance.mjs`는 제공된 계획과 매니페스트를 집계하며, 그 계획이 전체 릴리스 파이프라인을 포괄한다는 사실을 입증하지는 않습니다. 계획이 `VERIFIED`인 경우에도 보고서에는 명시적으로 `releaseAcceptance: false`가 설정됩니다. `release-acceptance.yml` 워크플로는 여전히 섀도 테스트 픽스처를 사용하며 실제 빌드, 패키징, 부팅 또는 승격의 실행 기록을 사용하지 않습니다.

보관된 증거를 검증하려면 CLI에 `--evidence-root`가 필요합니다. 파일은 `<evidence-root>/<artifact_id>/<member>` 경로에서 확인하고 SHA-256 해시를 계산합니다. 증거 없는 PASS 레코드, 누락되거나 변경된 파일, 안전하지 않은 경로 또는 심볼릭 링크는 검증을 막습니다. 누락된 파일은 성공한 실행의 빈 로그와 같지 않습니다. 기존 SHA/run/attempt 검사는 독립적으로 유지됩니다. 바이트가 일치해도 오래된 실행 기록을 유효하게 만들 수는 없습니다. 파일 무결성은 실행의 진위나 아티팩트 승격을 입증하지 않습니다.

### 정적 스캔 인벤토리

버전이 지정된 npm 별칭 인벤토리와 정적 스캔 멤버십은
`config/quality/gate-manifest.json`에 있습니다. `npm run check:gate-manifest`를 실행하여
스크립트 이름과 정확한 명령을 `package.json`과 대조해 검증하십시오. 추가, 제거 및
명령 드리프트는 로컬 훅과 CI의 변경 분류 작업을 모두 실패시킵니다.
별칭은 워크플로 작업, 매트릭스 인스턴스 또는 테스트 케이스가 아닙니다. 이러한 수치를
서로 동등한 것으로 제시해서는 안 됩니다.

선택된 별칭을 실행하지 않고 확인하려면 `npm run quality:scan -- --list` 또는
`npm run quality:scan:fast -- --list`를 사용하십시오. 러너는
npm 진입점을 호출하므로, 구성된 경우 Bun을 포함하여 해당 런타임이 그대로 유지됩니다.
매니페스트는 이러한 프로필 외부의 별칭을 별도 호출 항목으로 기록하며,
읽기 전용 스캔 프로필에서는 유지관리 명령이 금지됩니다.

이러한 프로필은 정적 스캔만 다룹니다. 제품 테스트, 커버리지, 패키징,
외부 검사 또는 후보의 전체 릴리스 승인을 보증하지 않습니다.
워크플로 승인은 연결된 `config/quality/admission-policy.json` 및
`scripts/quality/admission-verdict.mjs`를 사용합니다. 릴리스 옵저버 프로필은 별도로 유지됩니다.
적용 가능한 검사와 영수증을 독립적으로 확인하십시오. 전체 옵저버의 정적
명령은 `config/quality/release-green-static-profile.json`에 선언되어 있으며,
`audit:deps`, 변이 테스트 선택 및 번역 검사를 포함합니다. 로더는 npm
명령을 package.json 및 모델링된 CI/Quality 선언과 대조하여 검증합니다. 셸 토큰을 인수로
실행하는 대신 드리프트를 거부합니다. 필수 스캐너의 SKIP/INCOMPLETE 출력으로는
PASS를 확정할 수 없습니다. 프로필은 외부 제외 항목을 기록하며, 호스팅 커버리지,
테스트 매트릭스, 패키지 또는 배포 증거를 대체하지 않습니다. 아래의 설명형 인벤토리는
참고 자료일 뿐, 게이트가 실제로 실행되었다는 증거가 아닙니다.

스크립트는 `scripts/check/`(정책 게이트) 및 `scripts/quality/`(래칫 엔진) 아래에 있습니다.
CI의 단일 기준 정보원은 `.github/workflows/ci.yml`입니다.

### 게시된 기준 문서 상태

`.github/workflows/i18n-base-health.yml`은 선택된 `main` 및 `release/v*` 브랜치 푸시 후와
수동 디스패치 시 문서 상태를 관찰합니다. 해당 필터는 문서, 루트 Markdown, `llm.txt`,
번역 상태/구성 및 관련 i18n 도구를 포함합니다.
단일 `Published base documentation health` 작업은 호스팅된 Ubuntu를 사용하며 제한 시간은
5분입니다. 이 작업은 읽기 전용 검증을 수행하고, 종속성 설치, 번역 또는 상태 적용 없이
진단 영수증을 기록합니다.

`scripts/i18n/check-base-health.mjs`는 소스 해시 불일치, 대상 누락, 대상 해시 불일치,
오래된 번역 및 섹션 캐시 불일치가 하나도 없어야 합니다. 또한 현재 핵심
문서/로케일 범위와 기록된 출처를 검증합니다. 유효하지 않은 컨텍스트, 불완전한 범위
또는 중단된 검사기는 `INCOMPLETE`를 생성하며, 드리프트가 확인되면 `FAIL`을 생성합니다. 둘 다
실패 종료 상태를 반환합니다. 영수증은 체크아웃 SHA, 워크플로, 실행 및
시도에 연결되며 `i18n-base-health-<sha>-<run>-<attempt>`로 보존됩니다.

이는 게시된 기준 문서에 대한 독립적인 관찰입니다. PR 또는
병합 그룹 이벤트, 필수 PR 검사, npm 별칭 또는 정적 스캔 프로필 구성원을 추가하지 않습니다.
기존의 차등 PR 정책과 기본 검사기의 권고 분류는
서로 별개로 유지됩니다. 업로드에 성공해도 실패한 상태 결과를 PASS로 바꿀 수 없습니다.

### 릴리스 PR 빠른 경로(`quality.yml`)

`.github/workflows/quality.yml`은 main/release PR, `main`으로의 푸시,
디스패치 및 병합 그룹에서 CI를 보완합니다. PR은 경로 필터가 적용된 빠른 검사를 사용합니다.
영구적으로 비활성화되었던 중복 빌드는 제거되었으며, 실제 빌드/패키지/부팅 검사는 CI에 그대로 남아 있습니다.

| 작업                                             | 범위                                                                                                                                            | 차단 여부     |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `Docs Gates (fast-path)`                         | 문서/코드 PR; API 문서 참조 및 docs-all                                                                                                         | 예            |
| `Fast Quality Gates`                             | 코드 PR; 정적 검사, 타입 검사, 대시보드 타입 검사, 영향받는 단위 테스트                                                                         | 예            |
| `Forgotten sibling tests`                        | 코드 PR; 변경된 모듈을 정적 소비자 및 후보 형제 테스트까지 추적; 배럴 및 동적 가져오기 경로는 참조된 허용 목록 예외와 함께 권고 진단으로 보고됨 | **권고**      |
| `Vitest (fast-path)`                             | 코드 PR; 빠른 vitest 스위트                                                                                                                     | 예            |
| `Unit Tests fast-path`                           | 코드 PR; 4개 샤드 단위 테스트 스위트                                                                                                            | 예            |
| `No new ESLint warnings`                         | 코드 PR; 억제 설정을 인식하는 린트 가드                                                                                                         | 예, 포크 포함 |
| `Merge integrity (changelog + generated skills)` | 초안이 아닌 PR; 변경 로그 및 생성된 스킬 동기화                                                                                                 | 예, 포크 포함 |

#### 누락된 형제 테스트 보고서

`npm run check:forgotten-sibling-tests`는 테스트 영향도 맵에서 사용하는 가져오기 해석기를 재사용합니다.
변경된 각 프로덕션 모듈에 대해, 후보 테스트가 풀 리퀘스트 diff에 없으면 결정론적인
`changed module/symbol -> static consumer -> candidate sibling test` 체인을 보고합니다. Markdown 요약과 JSON 결과는
차단 방식으로 전환하기 전의 보정을 위해 `forgotten-sibling-tests` 워크플로 아티팩트로 보관됩니다.

배럴 재내보내기와 동적 가져오기는 해석 진단일 뿐이며, 차단 결과를 생성하지 않습니다.
검토된 예외는 `config/quality/forgotten-sibling-allowlist.json`에 있습니다. 각 항목에는 소비자와 후보
테스트를 명시하고, 구체적인 근거를 제시하며, GitHub 이슈 또는 풀 리퀘스트 링크를 포함해야 합니다. 형식이 잘못된 항목은
폐쇄적으로 실패 처리됩니다. 예외는 삭제된 후보 테스트나 `.skip`/`.todo`를 추가하는 diff를 억제할 수 없습니다.
어설션 약화 및 기타 마스킹은 별도로 차단 기능을 수행하는
`check:test-masking` 게이트에서 계속 담당합니다.

### 작업: `lint`

`main`에 대한 모든 PR에서 실행됩니다. 실패 시 병합을 차단합니다.

| 스크립트 (`npm run ...`)          | 검증 항목                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 차단 여부                            |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `check:node-runtime`              | Node.js 버전이 지원 범위 내에 있는지                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 예                                   |
| `check:test-tla-order`            | `tests/unit` 아래의 `node:test` 파일이 테스트를 등록한 후 최상위 `await`를 실행하고 다시 추가 테스트를 등록하지 않는지 검증합니다(#18045; 래칫: `test-tla-order-allowlist.json`은 축소만 가능)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 예                                   |
| `check:cycles`                    | `src/` + `open-sse/` 전체의 순환 import(AST 기반, tsconfig `paths` 해석). 단독 실행 시 순환이 하나라도 있으면 종료 코드 1을 반환하고(#15281부터 실패 시 차단) SCC를 나열합니다. `check:cycles:ratchet`(CI에서 실행하는 항목)은 순환 수가 `quality-baseline.json`의 `metrics.cycles` 상한을 초과하면 차단합니다. 현재 값은 14이고 `direction: down`이므로 감소만 가능합니다(#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 예(래칫)                             |
| `check:boundary`                  | `open-sse → src` 결합도: 엔진에서 앱으로의 고유한 파일 간 import 수(`scripts/quality/measure-boundary.mjs`; 엣지 목록은 v4 코어/모듈 분할 개선 백로그). 단독 실행 = 권고 보고서(`quality:boundary`와 동일). `check:boundary:ratchet`(CI에서 실행하며 `quality.yml`의 빠른 게이트 래칫 루프에도 포함)은 수치가 `quality-baseline.json`의 `metrics.boundaryOpenSseToSrc` 상한을 초과하면 차단합니다. 상한은 측정값 771로 초기 설정되었고 `direction: down`이며, `--update`는 이 값을 낮추기만 합니다. PR에서는 기준 브랜치 대비로 동작합니다(`--base-ref`, 아래 참조)                                                                                                                                                                                                                                                                           | 예(래칫)                             |
| `check:route-validation:t06`      | 모든 라우트에 Zod 스키마가 있음(Tier 6 정책)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 예                                   |
| `check:any-budget:t11`            | `@ts-expect-error // any` 개수가 예산을 초과하지 않음(Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 예                                   |
| `check:provider-consistency`      | `providers.ts`의 모든 provider에 `providerRegistry.ts`의 일치하는 항목이 있으며, 그 반대도 성립함(allowlist 범위 내)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 예                                   |
| `check:model-lifecycle`           | 수동으로 유지 관리되는 세 개의 라우팅 테이블이 체크인된 수명 주기 스냅샷(#11503)과 일관성을 유지함: `FITNESS_TABLE`(`taskFitness.ts`)은 `REGISTRY`가 라우팅할 수 있는 폐기된 id에 점수를 부여하지 않음. 모든 `BUILT_IN_ALIASES` 대상은 `REGISTRY`에 존재하고 폐기된 id 스냅샷에는 없음. `REGISTRY`에 여전히 존재하는 모든 폐기된 id는 포워딩되거나 `allowedRetiredInCatalog`에 나열됨. 또한 `DEFAULT_DEGRADATION_MAP`의 어떤 소스나 대상도 해당 스냅샷에서 폐기된 것으로 표시되지 않음. 이는 모델이 현재 실제 upstream에서 제공되고 있음을 입증하지는 않음. 오프라인 검사 — `config/quality/model-lifecycle.json`과 비교하며, `npm run quality:refresh-model-lifecycle`을 사용해 수동으로 갱신함(네트워크 필요, CI에는 연결되지 않음). `allowedRetiredInCatalog`는 점진적으로 줄여 나가는 래칫임. 추적 이슈가 있는 경우에만 항목을 추가할 것. | 예                                   |
| `check:fetch-targets`             | 클라이언트 측 `src/`의 모든 `fetch("/api/...")`가 실제 `route.ts`로 해석됨                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 예                                   |
| `check:deps`                      | 저장소 내 모든 `package.json`에서 `npm install`로 설치 가능한 모든 의존성이 `dependency-allowlist.json`에 포함되어 있음. 새로 추가된 버전이 고정되지 않은 패키지 또는 slopsquatting 패키지는 플래그로 표시됨                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 예                                   |
| `audit:deps`                      | 독립된 5개 잠금 파일(루트, Electron, OpenCode 플러그인 v1/v2 및 provider) 전체에 대한 npm 감사. 심각도 Critical 권고 사항은 차단하며, 심각도 High 권고 사항은 표시되는 경고로 유지됩니다. 누락되거나 실패한 감사는 INCOMPLETE로 간주되어 차단되며, 범위별 잠금 해시와 보고서는 보존됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 예                                   |
| `check:lockfile`                  | `package-lock.json` 무결성 — https 레지스트리, 무결성 해시, 호스트 재정의 없음                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 예                                   |
| `check:licenses`                  | 프로덕션 종속성에 대한 SPDX 라이선스 허용 목록                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 예                                   |
| `check:tracked-artifacts`         | 빌드 아티팩트 및 커밋된 `node_modules` 심볼릭 링크 없음(husky pre-commit에서도 실행됨. pre-push는 의도적으로 가볍게 유지 — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 예                                   |
| `check:ai-attribution`            | PR 커밋, 제목 또는 본문에 AI/봇 `Co-Authored-By` 트레일러나 AI 생성 푸터가 없어야 함 — 엄격한 규칙 #16(`quality.yml`의 PR→`release/**`용 빠른 게이트 루프에서 이벤트 페이로드를 읽으며 PR이 아니면 아무 작업도 하지 않음. 또한 `ci.yml` 린트의 PR→`main`용 PR 전용 단계 및 husky `commit-msg` 훅에서도 적용됨. 사람 공동 작성자는 허용됨. #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | 모든 Vitest 제외 항목은 추적 이슈를 명시하고 `config/quality/vitest-exclusions.json`에 포함되어야 함(#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 예                                   |
| `check:file-size`                 | 소스 파일(`src/`, `open-sse/`, `electron/`, `bin/`의 `.ts`/`.tsx`)은 `cap` 이내로, 테스트 파일(`*.test.ts(x)`)은 `testCap` 이내로 유지해야 하며, `file-size-baseline.json`에 고정된 파일(`frozen` / `testFrozen`)은 기록된 크기를 초과해서 증가해서는 안 됨                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 예                                   |
| `check:error-helper`              | 실행기/핸들러의 오류 응답은 `buildErrorBody()` / `sanitizeErrorMessage()`를 사용해야 함(엄격한 규칙 #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 예                                   |
| `check:migration-numbering`       | 마이그레이션 SQL 파일은 누락되거나 중복된 번호 없이 순차적으로 번호가 지정되어야 함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 예                                   |
| `check:public-creds`              | `publicCreds.ts` 외부에는 리터럴 OAuth `client_id`/`client_secret` 또는 Firebase Web 키가 없어야 함(엄격한 규칙 #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 예                                   |
| `check:db-rules`                  | `src/lib/db/` 모듈 외부에는 원시 SQL이 없어야 하며, `localDb.ts`에서 배럴 임포트를 사용해서는 안 됨(엄격한 규칙 #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 예                                   |
| `check:known-symbols`             | 디스패치 테이블에 등록된 공급자 실행기, 라우팅 전략 및 변환기는 디스크의 파일과 일치해야 하며, 고립되거나 선언되지 않은 심벌이 없어야 함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 예                                   |
| `check:route-guard-membership`    | 자식 프로세스를 생성하는 모든 라우트가 `isLocalOnlyPath()`로 분류됨(Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 예                                   |
| `check:test-discovery`            | 저장소의 모든 `*.test.ts` / `*.spec.ts` 파일이 하나 이상의 테스트 러너에 의해 수집됨(래칫: `test-discovery-baseline.json`의 고아 목록은 줄어들기만 할 수 있음)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 예                                   |
| `check:agent-skills-sync`         | 생성된 에이전트 스킬 아티팩트가 원본 카탈로그와 일치함(드리프트 없음)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:provider-asset-provenance` | 제공자 로고/에셋에 기록된 출처 항목이 있음                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | JSON 구성 파일이 정상적으로 파싱되고 저장소 린트 규칙을 충족함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | 오류 없이 TypeScript 컴파일됨(권고 경고만 있음)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 예                                   |
| `typecheck:noimplicit:core`       | 엄격한 `noImplicitAny` — 향후 적용 예정이며, 기존의 많은 호출 지점에 여전히 타입 주석이 필요함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **권고** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**`로 범위가 지정된 `tsc` (#7033) — `typecheck:core`의 선별된 27개 파일 허용 목록에는 대시보드 TSX가 전혀 포함되지 않으며, `next build` 역시 이를 타입 검사하지 않으므로(`next.config.mjs`에서 `ignoreBuildErrors: true` 설정), 해당 위치에서 발생한 고립된 식별자 회귀(#6625/#6909)가 CI에 감지되지 않았습니다. 고정된 파일별/TS 코드별 개수 기준선(`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols`와 동일한 오래된 항목 강제 적용 패턴)과 비교합니다. 기준선의 개수를 초과하는 새로운 오류만 게이트를 실패시키며, 기존 오류가 수정되면 `--update`를 사용하여 기준값을 낮춥니다.                                                                                                                                                                                                              | 예                                   |

### 작업: `quality-gate`

`test-coverage` 이후에 실행됩니다. 실패 시 병합을 차단합니다.

| 스크립트                     | 검증 항목                                                                                                                                                                        | 차단 여부           |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `quality:collect`            | `quality-metrics.json`을 생성합니다(ESLint 경고 수, 병합된 샤드 보고서의 커버리지).                                                                                              | 예(래칫의 업스트림) |
| `quality:ratchet`            | `quality-baseline.json`의 각 메트릭이 회귀하지 않았는지 확인합니다(ESLint 경고 ≤ 기준선, 커버리지 ≥ 기준선).                                                                     | 예                  |
| `check:duplication`          | 코드 중복(jscpd@4)이 `quality-baseline.json`의 기준선을 초과하지 않는지 확인합니다.                                                                                              | 예                  |
| `check:complexity`           | 파일 수준 순환 복잡도가 상한을 초과하지 않는지 확인합니다(핵심 ESLint `complexity` + `max-lines-per-function`).                                                                  | 예                  |
| `check:cognitive-complexity` | 인지 복잡도 래칫(`eslint-plugin-sonarjs`) — 별도의 ESLint 패스이며, CI에서는 두 검사를 하나의 `check:complexity-ratchets` 단계로 병합하여 실행합니다.                            | 예                  |
| `check:dead-code`            | 사용되지 않는 내보내기/파일 래칫(knip)이 기준선 대비 회귀하지 않는지 확인합니다.                                                                                                 | 예                  |
| `check:compression-budget`   | 압축 벤치마크 예산 — 엔진별 토큰 절감 하한이 회귀하지 않아야 합니다.                                                                                                             | 예                  |
| `check:type-coverage`        | 타입 적용 비율 래칫(`type-coverage`)이 회귀하지 않는지 확인합니다. 대체로 `typecheck:noimplicit:core`를 포괄합니다.                                                              | 예                  |
| `check:codeql-ratchet`       | 열린 CodeQL 경고 수가 회귀하지 않는지 확인합니다(`gh api`를 통해 읽으며, 토큰이 없으면 정상적으로 건너뜁니다). 새로 고침 주기와 수동 트리거는 아래의 "CodeQL 래칫"을 참조하세요. | 예                  |

### 작업: `quality-extended`

이 작업은 해당되는 후보를 차단합니다. 번들 크기, 비밀 정보 탐지 결과, 취약점
탐지 결과, 워크플로 탐지 결과 및 OpenAPI 변경 사항은 필수 래칫으로 검사됩니다.
순환 종속성 진단은 계속 권고 사항으로 유지됩니다. 스캐너 설치는 필수입니다.
`scripts/ci/install-quality-scanners.sh`는 고정된 버전을 프로비저닝하고 설치
실패를 전파합니다. 도구 누락, 유효하지 않은 보고서 또는 기준선 누락이 있으면
필수 스캐너 게이트는 INCOMPLETE 상태로 남습니다.

| 스크립트                 | 검증 항목                                                                                                                                                                          | 차단 여부                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `check:circular-deps`    | 순환 종속성이 없음(dpdm)                                                                                                                                                           | **권고**                              |
| `check:bundle-size`      | 번들 크기가 상한을 초과하지 않으며, 측정할 수 없는 경우 실패                                                                                                                       | **--ratchet 사용 시 차단**            |
| `check:secrets`          | Gitleaks 탐지 결과가 악화되지 않으며, 필수 스캔에서는 도구/소스/기준선 누락, 스캔 실패 및 유효하지 않은 보고서를 거부                                                              | **--ratchet 사용 시 차단**            |
| `check:vuln-ratchet`     | 종속성 취약점이 악화되지 않으며, 필수 스캔에서는 도구 누락, 유효하지 않은 보고서 또는 기준선 누락을 거부                                                                           | **--ratchet 사용 시 차단**            |
| `check:workflows`        | 워크플로 린트(actionlint + zizmor); 스캐너 누락/고장, 유효하지 않은 보고서 또는 ratchet 기준선 누락은 INCOMPLETE로 실패. 유효한 탐지 결과에는 선택한 엄격/권고/ratchet 정책을 적용 | 실행 필수; CI에서 zizmor ratchet 차단 |
| `check:openapi-breaking` | 고정된 이벤트 커밋(PR merge-base, push before, merge-group base; 예약/수동 실행은 체크아웃한 첫 번째 부모)을 기준으로 공개 API 계약을 검사하며, 필수 측정 실패 시 차단             | **--ratchet 사용 시 차단**            |

### 작업: `docs-sync-strict`

`main` 또는 `release/**`를 대상으로 하는 풀 리퀘스트에서는 초안이 아닌 후보(또는 신뢰할 수 있는 큐의 후보) 중 문서 또는 코드 변경으로 분류된 경우에만 이 작업이 실행됩니다. PR이 아닌 CI 이벤트에서도 실행되며, 이 워크플로의 push 트리거는 `main`만 포함하고 `release/**`는 포함하지 않습니다. 종료 코드가 0이 아닌 단계는 작업을 차단하지만, 보고만 하는 발견 사항과 아래에 문서화된 예외는 차단하지 않습니다.

| 스크립트                       | 검증 항목                                                                                                                                                                                                                                                                                                                                                                                     | 차단 여부                                                                                                              |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | 아래 7개 하위 게이트를 순차적으로 실행하는 메타 게이트                                                                                                                                                                                                                                                                                                                                        | 예                                                                                                                     |
| ↳ `check:docs-sync`            | 패키지/OpenAPI/CHANGELOG의 버전 일관성, `llm.txt` 미러의 정확한 일치, 번역된 CHANGELOG의 섹션 및 크기 불변 조건, 대체되어 더 이상 유효하지 않은 중복 문서의 부재                                                                                                                                                                                                                              | 예                                                                                                                     |
| ↳ `check:docs-frontmatter`     | 컴파일된 문서 페이지에 유효한 frontmatter 제목이 포함되어 있는지 확인                                                                                                                                                                                                                                                                                                                         | 예                                                                                                                     |
| ↳ `check:docs-counts`          | 신뢰도가 높은 개수 불변 조건은 엄격하게 적용되며, 휴리스틱 파일 수 검사는 스크립트에 `--strict`가 전달되지 않으면 경고만 표시함(CI 메타 게이트는 이 플래그를 전달하지 않음)                                                                                                                                                                                                                   | 엄격한 계층은 차단; 완화된 계층은 권고                                                                                 |
| ↳ `check:env-doc-sync`         | 무시 대상, 문서에만 있는 항목, 환경에만 있는 항목에 대한 명시적 허용 목록을 적용한 뒤, 소스 코드의 환경 변수 읽기와 `.env.example`, `docs/reference/ENVIRONMENT.md`가 일치함                                                                                                                                                                                                                  | 예, 문서화된 허용 목록에 해당하지 않는 경우                                                                            |
| ↳ `check:deprecated-versions`  | 안전한 과거 기록 문맥 밖의 오래되었을 가능성이 있는 버전과 오래된 업데이트 날짜를 보고하며, 무시 대상으로 지정된 문서는 제외함                                                                                                                                                                                                                                                                | 현재 CI 구성에서는 권고(`--strict`가 전달되지 않음)                                                                    |
| ↳ `check:doc-links`            | 문서의 내부 markdown 링크가 실제 파일로 해석되는지 확인(`[text]`/`(path)` 형식)                                                                                                                                                                                                                                                                                                               | 예                                                                                                                     |
| ↳ `check:fabricated-docs`      | 문서에 언급된 라우트, 환경 변수, CLI 명령어, 훅 이름 및 파일 경로가 코드베이스에 존재하는지 확인. `--strict` 사용 시 하드 게이트이며, 플래그가 없으면 소프트 실패.                                                                                                                                                                                                                            | 예(CI에서 `--strict` 사용)                                                                                             |
| `check:cli-i18n`               | CLI에서 사용하는 `t()` 키가 `en`에 존재함; `pt-BR`은 모든 최상위 섹션을 유지함; `zh-CN`과 `zh-TW`는 `en`의 모든 키를 포함함                                                                                                                                                                                                                                                                   | 예                                                                                                                     |
| `check:openapi-coverage`       | OpenAPI 명세가 실제 라우트 중 ratchet으로 설정된 최소 기준 이상을 포함하는지 확인                                                                                                                                                                                                                                                                                                             | 예                                                                                                                     |
| `check:openapi-security-tiers` | 선언된 `x-loopback-only`/`x-always-protected` 주석은 `routeGuard.ts`의 규칙으로 뒷받침되어야 하며, 파서 오류와 정방향 불일치는 차단함. 로컬 전용 접두사 아래에서 누락된 `x-loopback-only`를 찾는 역방향 검사는 경고하며, 패턴으로만 정의된 라우트는 이 역방향 검사에서 제외됨.                                                                                                                | 파서/정방향 검사는 차단; 역방향 검사는 권고                                                                            |
| `check:openapi-routes`         | 근거가 명시된 `KNOWN_STALE_SPEC` 허용 목록을 적용한 뒤, `openapi.yaml`의 각 `/api...` 경로가 매개변수 차이와 무관하게 실제 라우트와 일치함; 오래되어 더 이상 유효하지 않은 허용 목록 항목도 실패를 유발함                                                                                                                                                                                     | 예                                                                                                                     |
| `check:docs-symbols`           | 미러가 아닌 정본 문서의 내부 `/api/...` URL 참조가 실제 라우트 또는 라우트 계열과 일치함; 프록시/업스트림/자리표시자/파일 참조와 근거가 명시된 `KNOWN_STALE_DOC_REFS` 항목은 제외하며, 오래되어 더 이상 유효하지 않은 허용 목록 항목은 실패를 유발함                                                                                                                                          | 예                                                                                                                     |
| `i18n translation drift`       | 핵심 문서의 소스/대상 해시와 번역의 출처를 확인합니다. PR 비교에서는 완전히 동일한 상속된 실패만 허용하며, 소스, 대상 누락, 대상 해시, 오래된 번역 또는 섹션 캐시의 새롭거나 검증되지 않은 불일치는 차단합니다. PR 비교 밖에서는 소스/대상 누락/대상 해시 실패가 차단하고, 오래된 번역과 일관되지 않은 섹션 캐시는 계속 경고만 제공합니다. 이전 형식의 섹션 캐시가 없는 것은 실패가 아닙니다. | 새롭거나 검증되지 않은 PR 편차는 차단; 완전히 동일한 상속된 편차는 경고만 제공; PR 외부 규칙은 실패 유형에 따라 달라짐 |

### 작업: `i18n-ui-coverage`

| 스크립트                          | 검증 항목                                                                                                                                                             | 차단 여부 |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check-ui-keys-coverage` (인라인) | UI i18n 키 커버리지가 ≥ 65%인지                                                                                                                                       | 예        |
| `check-ui-value-drift` (인라인)   | 재작성된 영어 **값**으로 인해 오래된 번역이 남지 않는지                                                                                                               | 예        |
| `check-new-key-coverage` (인라인) | **새로운** 영어 키가 모든 로케일에서 번역되었는지 — `__MISSING__:` 마커는 거부됨                                                                                      | 예        |
| `check-translation-ratio`         | 로케일별 실제 번역 비율(허용 목록 외의 영어와 동일한 값 / 플레이스홀더 / 누락된 리프)이 `config/quality/i18n-translation-baseline.json` + 여유분을 초과하지 않아야 함 | **차단**  |

`fetch-depth: 0`이 필요합니다 — 값 드리프트 게이트는 병합 베이스를 기준으로 `en.json`의 차이를 비교합니다.

#### `check-ui-value-drift` — 오래된 번역 게이트

다른 게이트가 구조적으로 감지할 수 없는 한 가지 i18n 회귀를 포착합니다. 영어 값이
재작성되었지만 _이전_ 영어에서 파생된 번역이 그대로 남아, 비영어권 사용자가
확신에 찬 어조로 작성된, 이제는 잘못된 문구를 계속 읽게 되는 문제입니다.

이 문제는 실제로 릴리스되었습니다. Antigravity 로그인 도우미가 도입되었을 때(#5203)
`oauthModal.googleOAuthWarning`이 재작성되었지만, **43개 로케일 중 39개**에는 운영자에게
"전체 URL을 복사해 아래에 붙여넣으라"고 안내하는 텍스트가 그대로 남았습니다. 해당
제공자에서는 완료할 수 없는 흐름입니다. 다음 이유로 #8463까지 발견되지 않았습니다.

- `sync-ui-keys`는 **없는** 키만 채우며, **오래된** 키는 절대 갱신하지 않습니다.
- `check-ui-keys-coverage`는 키의 _존재 여부_를 계산하므로, 오래된 번역도 적용된 것으로 집계됩니다.
- `check-translation-drift`는 `docs/i18n/<locale>/**.md` 문서 미러를 추적하며,
  `src/i18n/messages/*.json`은 전혀 읽지 않습니다. 2026-09 재동기화 이후
  `docs-sync-strict` 작업에서 차단됩니다. 핵심 문서 편집 → `npm run i18n:run -- --files=<doc>`
  (섹션 수준이며 비용이 적음).

**차이 인식 방식이며 기준선 기반이 아닙니다.** 병합 베이스의 `en.json`과 작업 트리를
비교합니다. 영어 값이 변경된 모든 키에 대해, 어떤 로케일이 수정되지 않은 번역을
그대로 보유하고 있다면 오래된 것으로 간주합니다. 이는 의도적으로 **기존 부채를
동결**합니다. 차이만으로는 오래된 번역이 과거의 어떤 영어에서 유래했는지 알 수
없으므로, 게이트는 현재 변경 사항이 건드린 항목만 판단합니다. 대안인 키별 해시
기준선은 약 600 KB의 생성 파일이 필요하며, 이는 기존 최대 기준선의 3배 크기이고
모든 i18n PR에서 변경됩니다.

이를 충족하는 방법은 두 가지입니다.

1. 영향을 받는 번역을 업데이트하거나
2. 해당 값을 `__MISSING__:<new english>`로 설정합니다. 그러면 런타임이 수정된 영어를
   제공합니다(`src/i18n/request.ts::deepMergeFallback`, #7258). 또한 해당 키는 번역 대기열에 추가됩니다.

문자열의 **의미**가 변경되었다면 **키 이름 변경**을 권장합니다. 새 키는 오래된
번역을 상속할 수 없습니다. #8463에서 사용한 패턴이 바로 이것입니다.

```bash
npm run i18n:check-value-drift          # 엄격 모드(CI에서 실행되는 방식)
npm run i18n:check-value-drift:warn     # 보고만 수행
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

값 드리프트 게이트와 새 키 게이트는 `scripts/i18n/resolve-ui-diff-base.mjs`에서 확인되는 하나의 불변 비교 기준을 공유합니다. 워크플로는 두 검사 모두에 동일한 기준, 기준 팁 및 후보 SHA를 전달합니다. PR/기준 리타기팅, 푸시 및 병합 그룹 실행은 해당 이벤트 컨텍스트를 사용합니다. 후보 브랜치를 디스패치하려면 정확히 일치하는 열린 PR 또는 명시적인 `i18n_base_sha` 입력이 필요합니다. 해당 입력 없이 `main` 또는 `release/vX.Y.Z`를 디스패치하거나 예약 관찰하는 경우 마지막 커밋을 첫 번째 부모와 비교하며, 이는 상속된 모든 번역 부채에 대한 감사가 아닙니다. 로컬 호출에는 명시적인 비교 기준이 필요합니다. 예를 들면 위의 `BASE_REF` 명령을 사용할 수 있습니다.

비교 컨텍스트가 없거나 모호한 경우, 필수 카탈로그를 읽을 수 없거나 유효하지 않은 경우, 또는 후보가 변경된 경우에는 경고 모드에서도 종료 코드 **2**와 함께 `INCOMPLETE`가 생성됩니다. 카탈로그 읽기에는 `scripts/i18n/read-ui-catalog.mjs`를 사용하며, 읽기 실패를 빈 객체로 대체하지 않습니다. 기준을 사용할 수 없거나 입력이 불완전한 경우에는 PASS로 판정되지 않습니다.

### 작업: `i18n`

전체 i18n 검증 매트릭스입니다(로케일당 하나의 작업). 전체 작업은 권고 사항입니다.

| 스크립트                        | 검증 항목            | 차단 여부                                            |
| ------------------------------- | -------------------- | ---------------------------------------------------- |
| `validate_translation.py quick` | 로케일별 번역 완성도 | **권고 사항**(전체 작업에 `continue-on-error: true`) |

### 작업: `pr-test-policy`

풀 리퀘스트에서만 실행됩니다.

| 스크립트               | 검증 항목                                                                                                                          | 차단 여부 |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` 또는 `bin/`의 프로덕션 코드를 변경하는 PR에는 테스트가 포함되거나 업데이트되어야 함(엄격 규칙 #8) | 예        |
| `check:test-masking`   | 변경된 테스트 파일이 순 어설션 수를 줄이거나 `assert.ok(true)` 동어반복을 추가하지 않는지                                          | 예        |
| `check:pr-evidence`    | PR 본문이 변경 사항에 대한 테스트/VPS 근거를 명시하는지(PR 문구를 grep하여 엄격 규칙 #18을 자동화 — 취약함, 백로그 참조)           | 예        |

### 작업: `test-vitest`

`changes` 분류 작업이 필요합니다. 해당하는 매트릭스 샤드는 실패 시 병합을 차단합니다.

| 스위트           | 검증 대상                                           | 차단 여부                                                                                               |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP 서버(도구 110개), autoCombo, 캐시 — vitest 러너 | 예                                                                                                      |
| `test:vitest:ui` | UI 컴포넌트 테스트 — vitest 러너                    | **차단** — 기존 실패는 `vitest.config.ts`에서 명시적으로 제외되며, 새로운 실패가 발생하면 작업이 실패함 |

### 야간 워크플로(예약 실행, 권고용)

이 워크플로는 cron 일정에 따라(그리고 `workflow_dispatch`를 통해) 실행되며, PR에서는 절대 실행되지 않습니다. 모두 권고용입니다.

| 워크플로               | 검증 대상                                                                                                                                                  | 차단 여부  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `nightly-property`     | 무작위 시드와 높은 실행 횟수를 사용하는 fast-check 속성 테스트                                                                                             | **권고용** |
| `nightly-resilience`   | 힙 증가 게이트, 카오스 장애 주입, k6 부하/소크 테스트                                                                                                      | **권고용** |
| `nightly-llm-security` | promptfoo 인젝션 가드(차단 모드) + garak 프로브(프로바이더 시크릿이 없으면 건너뜀)                                                                         | **권고용** |
| `nightly-schemathesis` | `docs/openapi.yaml`을 사용하여 실행 중인 OmniRoute를 대상으로 하는 OpenAPI 계약 퍼징(schemathesis) — 명세 위반/처리되지 않은 500 오류를 드러냄(Fase 8 B.4) | **권고용** |
| `nightly-mutation`     | 빠른 단위 테스트 레인에 대한 Stryker 변이 테스트 점수 — 살아남은 변이는 취약한 어설션을 드러냄                                                             | **권고용** |
| `nightly-compat`       | 지원되는 `engines.node` 범위 전반의 Node 엔진 호환성 매트릭스                                                                                              | **권고용** |

성능 기준선(힙, TTFB, 빌드 시간)은 기록만 하고 게이트로 사용하지 않습니다. [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md)(`npm run perf:lts-baseline`)를 참조하세요.

---

## 속도 우선 단계(2026-08-30 → v4.0 LTS): 모든 기준선 20% 완화

책임자 결정(2026-08-30): v4.0 모듈화 전까지는 기술 부채 한도를 유지하는 것보다
출시 속도가 더 중요합니다. 모든 **수치형** 래칫 기준선을 감사 가능한 단일 작업으로 20%
완화했으며, 해당 단계는 `config/quality/quality-baseline.json`에 선언되어 있습니다.

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| 변경 사항                                                                                                                                                                   | 위치                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — 낮을수록 좋은 개수는 ×1.2, 높을수록 좋은 백분율은 ÷1.2(커버리지 하한 60은 유지, `eslintErrors`는 0 유지, `eslintWarnings`는 0 → 고정된 억제 개수의 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` 메모에 모든 변경 전 → 변경 후 값 나열)           |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                            | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, 모든 `frozen[*]` / `testFrozen[*]` 줄 수 상한 ×1.2                                                                                                        | `file-size-baseline.json`                                                                              |
| 파일별 / TS 코드별 개수 ×1.2                                                                                                                                                | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                         | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false`인 동안 `--require-tighten`은 권고 사항으로 변경                                                                                          | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| 야간 `bank-ratchet-shrinks` 일시 중지(측정된 감소분을 적립해 여유분을 없애기 때문)                                                                                          | `.github/workflows/nightly-release-green.yml`                                                          |

허용 목록(`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…)은 예산이 아니므로 변경하지 않았습니다. 통과/실패 정책 게이트(비밀 정보, SQL 규칙,
문서/환경 계약, i18n 동등성, 단위 테스트)는 변경되지 않았습니다. 즉, 실패하는 테스트는 여전히 실패로 처리됩니다.

**도구**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — 일회성
  완화 작업(`scripts/quality/relax-baselines.mjs`)이며, 동일한 메모로 두 번 실행하는 것을
  거부합니다.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI와 동일한 방식으로 모든 수치형 게이트를 측정하고 게이트별 남은 여유분을 출력합니다
  (`scripts/quality/baseline-headroom.mjs`). 야간 `baseline-headroom` 작업은 워크플로 실행
  요약에 표를 게시하고 JSON/Markdown 보고서를 `baseline-headroom-<run_id>` 이름으로
  업로드하여 90일간 보관합니다. 경고 및 심각 행은 상한의 10% 이내에 도달했거나 이미
  초과한 게이트를 나타냅니다. 예산 소진에 대한 조기 경보로 이 보고서를 검토하고,
  문제가 발생한 게이트의 `_rebaseline_*` 메모를 확인하십시오. 이 작업은 더 이상 영구
  이슈를 생성하거나 업데이트하지 않으며, #12149에 이전 보고서 이력이 보존되어 있습니다.

**신규 코드 모드(Clean-as-You-Code) — 2026-08-30부터, PR 빠른 경로에만 적용**

`pull_request` 이벤트에서 `quality.yml`은 `check:file-size`,
`check:complexity-ratchets`, `check:dead-code`에 `--base-ref <PR base SHA>`를 전달합니다.
`check:complexity-ratchets`와 `check:dead-code`의 경우, 게이트는 HEAD를 병합 기준점과 비교하되
**PR이 변경한 파일로만 제한**합니다(`scripts/check/newCodeMode.mjs`: 병합 기준점은 일회용
`git worktree`에 구체화되고, 해당 위치와 HEAD에서 ESLint/knip을 실행한 뒤 파일별 개수의 차이를 계산합니다).

- **차단** — PR이 변경한 파일에 순환/인지 복잡도 위반 또는 데드 익스포트를 추가한 경우
  (로그의 `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **권고** — 전역 합계와 고정된 기준선의 비교입니다. 상속된 드리프트로 인해 무관한 PR이
  실패 처리되는 일은 없습니다. 드리프트는 릴리스 조정 시 수정할 수 있도록 추적되며
  헤드룸 작업에서 모니터링됩니다.

`check:file-size`는 자체 규칙에 따라 기준 참조를 사용합니다(`scripts/check/check-file-size.mjs`, #8522).
트리의 모든 소스 및 테스트 파일을 검사하고 `git show`를 사용하여 PR 기준점에서 각 파일의 줄 수를
읽은 다음, 기준선 상한(`frozen` / `testFrozen`, 또는 기준선에 없는 파일의 경우 `cap` / `testCap`)과
기준점 크기 중 더 큰 값을 초과할 정도로 파일이 커진 경우에만 실패 처리합니다.
따라서 기준점에서 이미 드리프트가 발생한 파일 때문에 무관한 PR이 실패 처리되는 일은 없습니다.

`check:boundary:ratchet`은 단일 수치에도 동일한 규칙을 적용합니다
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR 이벤트에서는
`quality.yml` 빠른 게이트와 `ci.yml` 린트 작업 모두 PR의 베이스 SHA를 전달하고, 베이스 커밋은
`git archive` 내보내기에서 측정되며, PR의 `open-sse → src` 엣지 수가
`metrics.boundaryOpenSseToSrc`와 베이스의 엣지 수 중 더 큰 값을 초과할 때만 PR이 실패합니다. 상한을
초과하는 베이스 드리프트는 보고되지만(`base drift herdado`) 무관한 PR을 실패시키지는 않습니다. push → main은
절대 상한을 유지하며, 베이스 SHA를 확인할 수 없으면 경고와 함께 절대 상한으로 폴백합니다.

`workflow_dispatch` 실행, 릴리스 그린 스윕 및 야간 헤드룸 작업에는 PR 베이스가 없으므로
절대(전역) 비교를 유지합니다. 커버리지, 중복 및 타입 커버리지는 현재 전역으로 유지됩니다
(해당 도구로는 파일별 차이를 저렴하게 산출할 수 없습니다). 이들 역시 동일한 처리를 적용할 후보입니다.

**v4.0에서 단계 마무리(LTS = 이전보다 더 엄격함, "정상으로 복귀"가 아님)**

1. 순수한 `release/v4.0.0` 팁에서 기록을 위해 `npm run quality:headroom --json`을 실행한 다음,
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` 및 각 타입 검사 게이트의
   `--update`를 실행합니다. 모든 기준선이 측정값으로 낮아집니다.
2. `quality-baseline.json`에서 `_policy`를 삭제하고(`--require-tighten`과 야간
   뱅킹을 다시 활성화), `check-openapi-coverage.mjs`의 `THRESHOLD = 36`(또는 그 이상)을 복원합니다.
3. 모듈화의 효과가 있었던 부분은 측정값보다 더 엄격하게 조정합니다. 파일 크기 `cap`을 다시 1000
   (또는 800)으로 설정하고, 커버리지 하한을 +5 높이며, 모듈화된 패키지의 미사용 내보내기를 0으로 설정합니다.

## 래칫 기준선 (`quality-baseline.json`)

래칫 엔진(`scripts/quality/check-quality-ratchet.mjs`)은 `quality-baseline.json`을 읽고
새로 수집된 `quality-metrics.json`과 비교합니다. 허용 오차를 초과하여 저하된 지표가
하나라도 있으면 빌드가 실패합니다.

현재 추적 중인 지표:

| 지표                  | 방향   | 의미                              |
| --------------------- | ------ | --------------------------------- |
| `eslintWarnings`      | `down` | ESLint 경고 수가 증가해서는 안 됨 |
| `coverage.statements` | `up`   | 구문 커버리지가 감소해서는 안 됨  |
| `coverage.lines`      | `up`   | 라인 커버리지가 감소해서는 안 됨  |
| `coverage.functions`  | `up`   | 함수 커버리지가 감소해서는 안 됨  |
| `coverage.branches`   | `up`   | 분기 커버리지가 감소해서는 안 됨  |

실질적인 개선 후 기준선을 업데이트하려면:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` 플래그는 현재 측정값을 `quality-baseline.json`에 기록합니다.
지표를 개선한 변경 사항과 함께 이 파일을 커밋하세요. 지표를 개선하고도 기준선을
업데이트하지 않은 PR은 `--require-tighten`에서 감지됩니다(Fase 6A.5,
구현 예정).

### CodeQL 래칫: 갱신 주기 및 수동 트리거

`check:codeql-ratchet`은 **PR마다가 아니라 일정에 따라 갱신되는 저장소 상태를 읽습니다.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup`은
`state: configured`, `schedule: weekly`를 보고합니다. 이는 푸시마다 수행되는
분석이 아니라 GitHub의 기본 설정 검사입니다. 따라서 경고를 수정한 PR이 병합된 후에도
다음 예약 검사가 실행될 때까지 래칫은 이전의 더 높은 개수를 계속 읽습니다. 그 결과
검사가 최신 상태로 갱신될 때까지 수정 PR의 후속 PR을 포함한 모든 열린 PR에서
회귀가 보고됩니다.

**수동 갱신**: `gh workflow run codeql.yml --ref release/vX.Y.Z`는 분석을 다시 실행하고
몇 분 이내에 경고를 다시 게시합니다. 먼저 `.github/workflows/codeql.yml`을
읽으세요. 헤더에는 GitHub의 "기본 설정"과 충돌하기 **때문에**
(`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`)
`workflow_dispatch` 전용이라고 설명되어 있습니다. `push`/`pull_request`/
`schedule` 트리거를 복원하려면 먼저 **소유자 작업**이 필요합니다: Settings → Code security →
CodeQL: Default → Advanced. 이 전환 없이 `schedule:` 트리거를 추가하지 마세요.
실패하는 실행만 생성됩니다.

**개수가 감소한 후 기준선을 강화하세요** — `node scripts/check/check-codeql-ratchet.mjs
--update`는 새로 측정된 개수를 `quality-baseline.json` →
`metrics.codeqlAlerts.value`에 기록하여, 래칫이 이전 상한까지의 회귀를 암묵적으로
허용하지 않도록 합니다. 실제 사례(2026-09-02/03): PR #12502에서 실제 경고 7개를
수정했고(측정된 열린 경고 13개 → 6개), PR #12530에서 고정된 기준선을 이에 맞게
11개 → 6개로 강화했으며, 이후 남은 6개는 경고별 근거를 제시하여 해제해 열린 경고를
0개로 줄였습니다.

**해제 여부는 운영자가 결정합니다(엄격한 규칙 #14)** — 해제 코멘트에 기술적 근거를
기록하지 않고 CodeQL 경고를 해제해서는 안 됩니다. 업스트림 프로토콜 요구 사항에는
`won't fix`, 테스트 픽스처에는 `used in tests`, CodeQL이 인식할 수 없는 새니타이저에는
`false positive`를 사용하세요(선례: `docs/security/ERROR_SANITIZATION.md`).

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

기존 위반으로 인해 실패할 수 없는 모든 게이트는 고정된 허용 목록
(예: `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`)을 사용합니다. 정책은 다음과 같습니다.

**근본 원인을 해결하세요. 위반이 기존부터 존재하고 동일한 PR에서 수정할 수 없는 경우에만 허용 목록을 사용하세요.**

허용 목록에 항목을 추가할 때:

1. 근거를 설명하는 주석을 포함하세요.
2. 추적 이슈를 참조하세요(예: `// #3498 — Phase 2 feature, not yet implemented`).
3. 위반을 수정하는 동일한 PR에서 해당 항목을 제거하세요. 더 이상 활성 위반을
   억제하지 않는 오래된 항목은 그 자체로 결함입니다(6A.3 오래된 적용 항목 검사가
   구현되면 고립된 허용 목록 항목으로 인해 게이트가 실패합니다).

테스트를 더 빨리 통과시키기 위해 허용 목록 항목을 추가하지 **마세요**. 허용 목록이
계속 늘어나는 상태에서 게이트가 통과하는 것은 품질에 대한 잘못된 확신을 줍니다.

### PR에서 게이트가 실패하는 경우

1. **게이트 출력을 주의 깊게 읽으세요** — 어떤 파일이나 심볼이 규칙을 위반했는지
   정확히 알려 줍니다.
2. **위반을 수정하세요** — 대부분의 게이트는 코드가 올바르면 즉시 통과하는
   결정론적 파일 시스템 검사입니다.
3. **위반이 기존부터 존재한 경우**(즉, 직접 도입하지 않았지만 이제 게이트의
   검사 대상이 된 경우): 근거를 설명하는 주석 및 추적 이슈와 함께 허용 목록
   항목을 추가하세요.
4. **게이트가 래칫인 경우**(커버리지, ESLint 경고, 중복, 복잡도):
   변경으로 인해 지표가 악화된 것입니다. 근본적인 문제를 수정하거나, 변경이
   의도적이고 지표 저하를 허용할 수 있는 경우에만 드물게
   `npm run quality:ratchet -- --update`를 실행하세요. 단, PR 설명에 그 이유를
   문서화해야 합니다.
5. **권고 게이트**(`continue-on-error: true`)는 정보 제공용입니다. 병합을 차단하지는
   않지만 CI 요약에는 표시됩니다. 그래도 수정하세요.

---

## 새 게이트 추가하기

1. `scripts/check/check-<name>.mjs`(또는 `.ts`)를 생성합니다. 정책 게이트는 0/1로 종료됩니다.
   래칫 방식의 게이트는 `collect-metrics.mjs`를 통해 `quality-metrics.json`에 지표를 출력합니다.
2. `package.json`에 `"check:<name>": "node scripts/check/check-<name>.mjs"`를 추가하고,
   `config/quality/gate-manifest.json`에서 해당 별칭과 정확한 명령을 동기화합니다.
   기존 검증 별칭을 변경하거나 제거할 때도 동일하게 동기화합니다.
   `npm run check:gate-manifest`를 실행합니다. pre-commit 훅과 CI 변경 분류가
   이 규약을 강제합니다.
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

## 합리화 백로그(ROI 검토 — 9단계 웨이브 3)

이 인벤토리는 2026-06-17에 `ci.yml`을 기준으로 대조되었습니다(이전 버전에서는
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`가 누락됨). 대조된 항목에 대한 ROI 검토 결과,
다음과 같은 합리화 후보가 확인되었습니다. **병합은 기계적인 CI 변경이며,
전환/제거는 운영자가 결정해야 하는 정책 사항입니다.** 아래 항목은 아직
적용되지 않았습니다.

**위에 문서화되지 않은 추가 항목**(권고 수준, 낮은 신호): `docs-lint` 작업
(markdownlint + Vale, 전체 작업에 `continue-on-error` 적용)과 독립 실행형 스캐너 워크플로
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`은
`quality-baseline.json`에 있지만 `ci.yml`의 차단형 래칫과 연결되어 있지 않습니다. 즉, 이 메트릭은
현재 고립된 상태입니다.

### 병합 / 중복 제거(기계적 변경, 낮은 위험)

각 후보는 2026-06-17의 실제 게이트 상태를 기준으로 검증되었습니다(신뢰하되 검증).
몇몇 "명백해 보이는" 병합은 실제로 부채를 숨기고 있는 것으로 드러났으며, **깔끔하게 대체할 수 있는
항목이 아닙니다.**

- **`check:docs-sync`가 두 번 실행됨** — `lint` 작업에서 독립적으로 실행되고, `check:docs-all`(`docs-sync-strict`) 및 husky pre-commit 훅 내부에서 다시 실행됩니다. ✅ **완료** — 독립적인 `lint` 호출을 제거했습니다.
- **CVE 스캔** — ❌ **깔끔하게 병합할 수 없습니다.** `audit:deps`는 5개 lockfile 전체에서 치명적 권고 및 불완전한 감사를 차단하는 한편, 현재 정책에 따라 높은 심각도의 권고는 경고로 보고합니다. 반면 `check:vuln-ratchet`(osv)은 체크인된 기준선 대비 _회귀_가 있을 때만 실패하며, 필수 측정값이 누락된 경우 이를 거부합니다. 의미가 서로 다릅니다. `audit:deps`를 제거하면 절대적인 치명적 취약점 게이트와 독립적인 패키지 감사 증빙이 사라집니다. 둘 다 유지합니다.
- **순환 종속성 감지** — ✅ **완료**(#15159 G-01/G-02). 이곳의 이전 설명에서는 `check:cycles`를 "통과 중인 선별된" 게이트라고 표현하고, `check:circular-deps`(dpdm)가 91개의 순환을 보고한다는 이유로 이를 차단형으로 유지해야 한다고 정당화했습니다. 하지만 그 통과 상태는 **거짓 통과**였습니다. `check:cycles`는 5개 하위 디렉터리(450개 파일)만 스캔했고, 정적 `import|export … from`만 일치시켰으며, 모든 `@/` 및 `@omniroute/open-sse/` 지정자를 제외했기 때문에 저장소를 지배하던 동적 import + 별칭 순환을 감지할 수 없었습니다. 수정 결과: 이제 게이트는 `src` + `open-sse`(5023개 파일)를 순회하고 TypeScript AST에서 지정자를 수집하며(`import("…")`는 포함하고 타입 위치의 `typeof import("…")`는 포함하지 않음), tsconfig `paths`를 해석합니다. 0개가 아니라 **14개**의 순환을 발견합니다. 기존 순환 14개는 게이트 PR에서 수정할 수 없으므로 이제 `check:cycles`는 **래칫**입니다(`--ratchet`, `quality-baseline.json`의 상한 `metrics.cycles.value = 14`, `direction: down`). 모든 _회귀_를 차단하며 개수는 감소만 할 수 있습니다. CI는 `npm run check:cycles:ratchet`을 실행합니다. 단계적 해소는 **A-01**과 함께 진행됩니다. `check:circular-deps`(dpdm)는 더 광범위한 보조 검증 수단으로 권고 수준을 유지합니다.
- **복잡도** — ✅ **완료**(`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ESLint를 한 번 순회하고 ruleId별로 집계하므로 순환 복잡도+최대 줄 수 기준선과 인지 복잡도 기준선이 서로 독립적으로 유지됩니다. 개별 `check:complexity` / `check:cognitive-complexity`는 로컬 `--update`를 위해 유지됩니다.
- **`/api` 환각 방지** — ✅ **완료**(`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`에 대한 파일 시스템 인벤토리를 한 번 수행하며, openapi-routes + docs-symbols는 여전히 독립적으로 보고합니다. 개별 항목은 로컬 실행을 위해 유지됩니다.
- **`check:node-runtime`이 11개 작업에서 실행됨** — ⚠️ **낮은 ROI.** 각각 별도 러너이며 검사는 1초 미만입니다. 저렴한 작업별 가드 하나를 잃는 대신 얻는 총 절감 시간은 약 10초입니다. 변경에 따른 혼란을 감수할 가치가 없습니다.
- **CI lint의 `typecheck:noimplicit:core`** — ✅ **lint 작업에서 제거됨**(이전에는 권고 수준의 `continue-on-error`). 차단형 타입 표면은 `typecheck:core` + `check:type-coverage`입니다. 로컬 스크립트는 유지됩니다.

### 전환 / 결정(운영자 정책)

- `check:openapi-security-tiers`(권고 수준) — ❌ **깔끔하게 전환할 수 없습니다.** 종료 코드는 0이지만 `LOCAL_ONLY_API_PREFIXES` 아래의 여러 `traffic-inspector` 라우트에 `x-loopback-only: true` 주석이 없다고 경고합니다. 이를 강제하려면 먼저 해당 주석을 `openapi.yaml`에 추가해야 합니다.
- `typecheck:noimplicit:core`(권고 수준) — 차단형 `check:type-coverage` 래칫이 대부분 대체합니다. 래칫으로 전환하거나 중복되는 두 번째 `tsc` 패스를 제거합니다.
- `test:vitest:ui`(현재 **차단형**) — 기존 실패는 `vitest.config.ts`에서 `// #8618` 추적 주석과 함께 명시적으로 제외되어 있습니다. 새로운 실패가 발생하면 작업이 실패합니다.
- `check:secrets`(gitleaks, 차단형 래칫) — 현재 상한은 `quality-baseline.json`의 `metrics.secretFindings`입니다. 예외에는 정당한 근거가 있는 `.gitleaks.toml` 항목이 필요하며, 측정값을 사용할 수 없는 경우 INCOMPLETE로 처리됩니다. 이 스캔은 GitHub의 네이티브 비밀 정보 스캔 및 `check:public-creds`를 보완합니다.
- `check:pr-evidence`(차단형, PR 본문 텍스트에 grep 적용) — 오탐 위험이 높습니다. 제거하면 엄격 규칙 #18의 집행력이 약화되므로 이는 실질적인 정책 결정 사항입니다.
- `semgrep`(독립 실행형, 권고 수준) — OWASP 계열에서 CodeQL과 중복됩니다. 기준선을 래칫에 연결하거나 제거합니다.

---

## 관련 문서

- 공급망(출처, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — 키 집합 동등성 게이트

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, 작업 `i18n-ui-coverage`).
모든 `src/i18n/messages/<locale>.json`의 리프 키 집합을 `en.json`과 비교하며,
키가 추가된 시점과 관계없이 누락되거나 추가된 리프가 하나라도 있으면 실패합니다. `__MISSING__:`
자리표시자는 존재하는 것으로 간주됩니다(그 내용은 비율 게이트가 다룰 사항입니다). 이는 두 가지
diff 기반/백분율 게이트를 절대적으로 보완합니다. `check-ui-keys-coverage`는 로케일별로 80 %의
하한을 적용하지만(약 13,000개 중 43개 키가 누락되어도 여전히 99.7 %로 표시됨),
`check-new-key-coverage`는 PR이 `en.json`에 추가하는 키만 판정합니다. 로케일 배치는
브랜치가 분기된 날의 `en.json`에서 생성되고 베이스에 키가 계속 추가되는 동안 며칠에 걸쳐
번역됩니다. 배치 PR 자체는 키를 추가하지 않으므로, 배치 1(#13044)이 9개 로케일에서 43개 키가
누락된 채 병합되고 배치 2(#13660)가 8개 로케일에서 10개 키가 누락된 채 병합되었을 때
두 형제 게이트 모두 아무 경고도 내지 않았습니다(2026-09-15). 실패를 수정하려면
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`를 사용하세요. `extra` 리프는
소스에서 해당 키가 삭제되었다는 의미이므로 로케일에서도 삭제하세요. `--warn`은 실패 처리 없이
보고만 합니다. `--catalog=cli`는 `bin/cli/locales`에서 동일한 비교를 실행합니다
(`npm run i18n:check-keys:cli`). 두 단계 모두 작업 `i18n-ui-coverage`에 포함됩니다.

#### `check-new-key-coverage` — 새 키 i18n 게이트

`check-ui-value-drift`의 형제 게이트입니다. 후자는 영어 값이 **다시 작성되었지만**
번역은 갱신되지 않은 경우를 탐지하고, 이 게이트는 영어 키가 **추가되었지만**
일부 로케일에 해당 키가 전혀 추가되지 않은 경우를 탐지합니다.

`check-ui-keys-coverage`는 이 유형을 탐지할 수 없습니다. 이 게이트는 로케일별 백분율 하한을
적용하며, 약 13,000개 중 11개 키가 누락되어도 커버리지는 99.9%로 유지됩니다. 언어별
백분율로는 "이 기능이 번역되지 않은 채 출시되었다"는 사실을 표현할 수 없습니다. 새로운
로케일에서 기능 전체에 텍스트가 없어도 수치는 전혀 변하지 않을 수 있습니다.

이 게이트가 방지하도록 설계된 사고는 다음과 같습니다. Orchestration Canvas의 Phase 3에서는
당시 존재했던 42개 로케일 전체에 11개 키를 번역했습니다. 몇 시간 후 EU 언어 배치(#13044)로
저장소의 로케일이 51개로 늘었지만, 새로 추가된 9개 로케일(`el`, `et`, `ga`, `hr`, `lt`, `lv`,
`mt`, `sl`, `sr`)에는 해당 키가 전혀 추가되지 않았습니다. `deepMergeFallback`은 키가 없으면
영어로 대체하므로 장애 형태는 빈 UI가 아니라 번역되지 않은 UI였습니다. 이는 실제 문제였으며,
설계상 아무 경고 없이 발생했습니다.

형제 게이트와 마찬가지로 이 게이트도 **diff를 인식**하여 병합 베이스의 영어와 작업 트리를
비교하므로, 기존 격차는 그대로 유지되며 게이트를 활성화하기 위한 마이그레이션이 필요하지
않았습니다.

**`__MISSING__:<english>` 마커는 이를 충족하지 않습니다(2026-09-17부터).** 이전에는 런타임이
올바른 영어로 폴백하므로 이 마커가 문서화된 연기 방법이었습니다. 그러나 2026-09-16에 8개의
기능 PR이 61개 키를 추가하면서 번역 대신 65개 로케일 모두에 이 마커를 찍었습니다. 이 게이트는
모두 통과시켰고 PR을 차단한 것은 아무것도 없었으며, 이후 차단 방식의 실제 번역 비율 게이트가
릴리스 팁에서 모든 사람에게 실패했습니다(pt-BR 3.2 % > 2.5 % + 0.5). 이제 마커는 번역이
없는 것으로 판정됩니다. 실패를 수정하려면
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`을 사용하거나,
`npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, 분리 실행에 안전하며
`OMNIROUTE_TRANSLATION_*` 환경 변수가 없으면 시작을 거부함)를 사용해 모든 로케일을 병렬로
처리하세요. 영어로 유지해야 하는 키(고정된 제품/엔진/플래그 이름)는 마커 뒤에 두지 말고
`scripts/i18n/untranslatable-keys.json`에 넣어야 합니다. `vi`는 마커를 전면 금지합니다
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — 보류된 테스트 게이트

`vitest.config.ts`의 `exclude` 목록에 있는 파일은 실행되지 않는 테스트이며, 트리를 읽는
사람에게는 커버리지처럼 보입니다. 62개 파일이
`// #8618 — pre-existing failure; remove this exclusion when fixed` 주석 뒤에 누적되었습니다.
이슈 #8618은 2026-08-11에 종료되었지만, 이 이슈가 추적하던 목록은 45개 항목에서 62개로
늘어났고 새 항목마다 종료된 이슈를 가리키는 주석을 그대로 물려받았습니다. 마침내 파일별로
목록을 측정했을 때(#13204), **62개 중 51개가 소스 변경 없이 현재 트리에서 통과했습니다**.

이 게이트는 실제 파일로 확인되는 모든 제외 항목이 (a) 추적 이슈를 명시하고 (b) 측정된 상태와
함께 `config/quality/vitest-exclusions.json`에 나타나도록 요구합니다. 따라서 제외 항목을
추가하는 작업은 60개 항목 배열에 한 줄을 더하는 대신 전용 파일에서 검토 가능한 diff가 됩니다.
이 게이트는 의도적으로 제외된 테스트를 다시 실행하지 않습니다. 그렇게 하면 약 10분이 걸리며
주기적 작업에서 수행하는 것이 적절하기 때문입니다. 인벤토리에는 각 항목을 마지막으로 측정한
시점이 기록됩니다.
