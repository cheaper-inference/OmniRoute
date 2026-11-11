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

CI 및 Quality Gates 워크플로는 각각 `Gate / CI` 및 `Gate / Quality` 라는 안정적인 판정을 내립니다. 버전이 지정된 승인 정책은 필요 또는 권고에 따라 모든 업스트림 작업을 열거합니다. 적용 가능한 필수 작업은 성공해야 합니다. 누락, 취소, 건너뛰기, 보류 중 및 알 수 없는 결과는 PASS 설정할 수 없습니다. 유효한 문서 전용 또는 카탈로그 전용 분류로 인해 코드 레인이 적용되지 않을 수 있습니다. 일반 초안 PR 승인된 후보가 아닙니다. `hotfix` 라벨은 증거를 포기하지 않습니다.

두 워크플로 모두 PRs main/release 분기로 처리하고, `main` 로 푸시하고, 수동 디스패치 및 그룹 병합 이벤트를 처리합니다. 푸시, 디스패치 및 병합 그룹은 전체 선택을 실행합니다. 신뢰할 수 있는 Mergify 대기열 초안은 적용 가능한 `full-code`/`full-code-e2e` 작업도 실행합니다. 일반 PRs 는 건너뜁니다. 수동 병합 전에 정확한 후보에 대해 전체 디스패치를 실행하세요. `release/**` 로 푸시해도 이러한 워크플로가 시작되지 않습니다. Release-Green은 병합된 베이스(`docs/ops/RUNNER_BOX.md` → 호스팅 레인)를 별도로 관찰합니다. 포크 및 병합 그룹은 자체 호스팅 실행기를 선택하는 작업에 대해 호스팅 실행기를 사용합니다. 출시하기 전에 호스팅 용량이 충분한지 확인해야 합니다.

일반 PR 빠른 선택을 실행합니다. 허용 정책의 `full-code` 및 `full-code-e2e` 레인(E2E, 통합, 패키지 아티팩트, Electron 스모크, Bun SQLite, 생태계 및 프로토콜 클라이언트)은 Mergify 대기열 드래프트 또는 전체 실행( `gh workflow run ci.yml --ref <branch>` 에서만 실행됩니다.

각 JSON 영수증은 체크아웃된 SHA, 워크플로 실행 및 시도를 식별합니다. CLI 는 checkout/event SHA 불일치를 거부합니다. 워크플로 테스트는 정책 멤버십을 판정 작업의 `needs` 목록에 바인딩하므로 새 레인이나 제거된 레인이 자동으로 사라지는 일이 없습니다. 영수증에는 게시, 배포 또는 기존 자문 스캐너의 내부가 아닌 자체 작업 흐름이 포함됩니다. 분기 규칙에 필요한 해당 검사를 수행하는 것은 별도의 관리 변경 사항입니다. 자신의 직업을 정의하는 것 자체가 지점을 보호하는 것은 아닙니다.

`API Route Typecheck` 집계된 판정과 로컬 전체 관찰자의 정적 프로필 외부에 있는 독립적인 작업 흐름 검사입니다. 정확한 후보에 대해서는 결과를 별도로 검사하십시오. `.github/workflows/api-route-typecheck.yml` PRs 에서 `main` 또는 `release/**` 로 실행되고 `checks_requested` 유형의 브랜치 제품군, 수동 디스패치 및 `merge_group` 이벤트에 푸시됩니다. 경로 필터가 없습니다. 그룹 병합은 `merge_group.head_sha` 확인하세요. 다른 이벤트는 `github.sha` 확인하세요. 모든 이벤트는 동일한 API 진단 게이트 및 게이트 단위 테스트를 사용합니다. PR 기본 대상 변경은 새로운 확인을 요청합니다. body/title 편집은 관찰 전용 이름인 `Admission not requested / API Route Typecheck` 사용하며 승인 확인을 대체할 수 없습니다.

### 수용 감소기에 보관된 증거

`scripts/quality/validate-release-acceptance.mjs` 제공된 계획과 그 목록을 줄입니다. 계획이 전체 릴리스 파이프라인을 포괄한다는 사실은 확립되지 않았습니다. 해당 계획이 `VERIFIED` 인 경우에도 보고서에서는 명시적으로 `releaseAcceptance: false` 설정합니다. `release-acceptance.yml` 워크플로우는 실제 빌드, 패키지, 부팅 또는 프로모션 영수증이 아닌 섀도우 픽스처를 계속 사용합니다.

CLI `--evidence-root` 보유 증거를 검증하도록 요구합니다. 파일은 `<evidence-root>/<artifact_id>/<member>` 로 확인되고 SHA-256 로 해시됩니다. 증거가 없는 PASS 레코드, 누락되거나 변경된 파일, 안전하지 않은 경로 또는 심볼릭 링크로 인해 확인이 불가능합니다. 누락된 파일은 빈 성공 로그와 동일하지 않습니다. 기존 SHA/run/attempt 검사는 독립적으로 유지됩니다. 일치하는 바이트는 오래된 영수증을 복구할 수 없습니다. 파일 무결성은 실행 신뢰성이나 아티팩트 승격을 증명하지 않습니다.

### DAST 검증된 CI 빌드를 사용합니다.

필수 `dast-smoke` CI 작업은 `build` 이후에 `.github/workflows/dast-smoke.yml` 호출합니다. 지원되는 포크 PRs, 릴리스 대상 PRs 및 병합 그룹을 포함하여 빌드와 동일한 code/draft 선택을 따릅니다. 누락, 실패, 취소 또는 예기치 않게 건너뛴 DAST 작업은 `Gate / CI` 차단합니다. 재사용 가능한 작업 흐름에는 독립적인 PR/dispatch 트리거가 없습니다. 수동 검증은 CI 의 디스패치를 사용하므로 빌드와 소비자가 한 번에 실행됩니다.

`scripts/ci/next-build-provenance.mjs` tar 다이제스트, repository/event/run, 생산자 시도, head/base/checkout/tree, 워크플로 ID, 잠금 파일, 정확한 노드 version/ABI, 플랫폼 및 번들러를 사용하여 전체 Next 아티팩트를 봉인합니다. DAST `needs.build.outputs` 에서 불변 아티팩트 ID 선택하고 다운로드 다이제스트 확인을 요구하며 `scripts/ci/unpack-ci-build.py` 통해 허용 목록에 있는 두 멤버를 추출하기 전에 생산자 다이제스트에 대해 ZIP 독립적으로 해시합니다. 매니페스트와 tar 아카이브는 Next 트리가 추출되기 전에 독립 생산자 출력과도 일치해야 합니다. 최근에 성공한 분기 빌드를 검색하지 않습니다. 부분 재실행은 ID 와 모든 입력이 여전히 일치할 때 동일한 생산자 시도를 재사용할 수 있습니다. 영수증에는 두 가지 시도가 모두 기록됩니다.

소비자는 읽기 전용 저장소 권한이 있고 저장소 비밀이 없는 호스팅된 Linux 실행기에 유지됩니다. 생산자의 정확한 Node 버전을 설치한 다음 `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1` 사용하여 CLI 어셈블합니다. `scripts/build/standaloneInput.mjs` 대체 빌드 전에 누락된 독립형 서버를 거부합니다. 일반 로컬 CLI 빌드는 기존 대체를 유지합니다. 서버 준비, 스키마세시스 및 프롬프트foo는 변경되지 않은 25분 작업 제한 내에서 모두 성공해야 합니다. 출처 영수증은 성공적인 DAST 스캔이 아니라 입력 ID와 바이트를 증명합니다. 아티팩트 만료, 러너 중단 또는 실패한 스캐너는 불완전하거나 실패한 증거로 남아 있습니다. 자문 래퍼를 통해 PASS 될 수 없습니다.

### UI 실행 능력

CI 전체 UI 인벤토리를 4개의 `test-vitest` 매트릭스 샤드로 실행합니다. 각 샤드에는 샤드당 최대 2명의 작업자가 있으며 기존 작업 기한은 15분입니다. 첫 번째 샤드는 MCP/autoCombo Vitest 제품군도 실행합니다. 필요한 작업 결과는 모든 매트릭스 구간을 포괄합니다. 하나의 샤드가 실패하거나 취소되면 후보자 승인이 설정될 수 없습니다.

야간 관찰자는 첫 번째 영수증의 MCP 실행을 포함하여 각 UI 샤드에 대해 별도의 정확한 후보 영수증을 보관합니다. 4개의 영수증, 로그 및 일치하는 실행 ID가 모두 필요합니다. 로컬 `npm run test:vitest:ui` 여전히 전체 제품군을 선택합니다. 한 번의 `--shard` 실행은 부분적인 증거일 뿐입니다.

### 단위 적용 범위 수집

12개의 유닛 샤드는 기존 테스트 실행 중에 V8 적용 범위를 수집합니다. 성공적인 샤드는 중간 이스탄불 보고서를 생성하지 않고 원본 파일을 압축하기 위해 `scripts/ci/compact-v8-coverage.mjs` 실행합니다. 최종 적용 범위 작업은 후보 SHA, 런타임, 소스 루트 및 데이터 해시에 대해 12개의 매니페스트를 모두 확인한 다음 c8의 보고자 및 기존 적용 범위 임계값을 실행합니다. 입력은 c8의 전역 파일 이름 순서를 유지합니다. 샤드별 사전 병합은 혼합 function/block 적용 범위에 안전하지 않습니다. 누락되었거나, 형식이 잘못되었거나, 호환되지 않는 샤드는 승인에 실패합니다. 실패한 테스트 샤드는 원시 진단 적용 범위를 별도로 유지합니다. 최종 병합에 들어갈 수 없습니다.

### 단위 실행 진행 영수증

공유 `test:unit:ci:shard` 명령은 `scripts/ci/unit-progress-reporter.mjs` 통해 `primary`, `dashboard` 및 `serial` 단계를 기록합니다. 일반 테스트 보고서는 계속 사용할 수 있습니다. 별도의 메타데이터 전용 영수증에는 각 파일의 시작과 완료가 기록되며, 30초 하트비트에는 아직 활성 상태인 파일과 경과 시간이 나열됩니다. 허용 목록에 있는 실행 메타데이터만 기록합니다. 테스트 설명, 출력, 오류 본문 및 전체 환경은 직렬화되지 않습니다.

CI JSONL 파일을 `unit-progress-ci-<run>-<attempt>-<shard>` 로 유지합니다. 작업 시간 초과로 인해 나중에 업로드되지 않을 수 있습니다. 이미 방출된 심장 박동은 진단 증거로 남아 있습니다. 누락된 하트비트는 차단되거나 종료된 실행기 프로세스를 반영할 수도 있습니다. 이러한 영수증은 기존 테스트 선택, 동시성, 마감일 및 종료 상태를 유지합니다. 그것은 후보자 입학 평결이 아닙니다.

### 병합 대기열

`queue` 레이블은 PR Mergify 대기열(`.mergify.yml`)로 보냅니다. Mergify는 `mergify/merge-queue/` 분기에서 초안 PR 열고, CI 그곳에서 전체 선택을 실행하며, `Gate / CI`, `Gate / Quality` 및 `Merge integrity (changelog + generated skills)` 통과하면 원본 PR 병합됩니다.

Mergify는 초안 설명에 대기열 요약을 기록합니다. Body/title-only `pull_request` `edited` 이벤트는 실행별 동시성 그룹을 사용하며 분류, 테스트 행렬, 병합 무결성 또는 승인 판정을 다시 실행하지 않습니다. 관찰 전용 검사 이름은 `Gate / CI` 또는 `Gate / Quality` 대체할 수 없습니다. 대상 기반을 변경하는 편집은 새로운 후보 검증을 요청합니다.

대기열에서 제거한 후 푸시가 항상 PR 다시 대기열에 추가하는 것은 아닙니다. 그것에 `@mergifyio queue` 언급하십시오.

### 정적 스캔 인벤토리

버전이 지정된 npm-alias 인벤토리 및 정적 스캔 멤버십은 `config/quality/gate-manifest.json` 에 있습니다. `npm run check:gate-manifest` 실행하여 `package.json` 에 대한 스크립트 이름과 정확한 명령을 확인합니다. 추가, 제거 및 명령 드리프트는 로컬 후크와 CI 의 분류 변경 작업 모두에 실패합니다. 별칭은 워크플로 작업, 매트릭스 인스턴스 또는 테스트 사례가 아닙니다. 이러한 개수는 상호 교환 가능한 것으로 표시되어서는 안 됩니다.

`npm run quality:scan -- --list` 또는 `npm run quality:scan:fast -- --list` 사용하면 선택한 별칭을 실행하지 않고 검사할 수 있습니다. 실행기는 npm 진입점을 호출하므로 해당 런타임(구성된 경우 Bun 포함)이 보존됩니다. 매니페스트는 별도로 호출될 때 해당 프로필 외부의 별칭을 기록하며 읽기 전용 스캔 프로필에서는 유지 관리 명령이 금지됩니다.

이러한 프로필은 정적 스캔에만 적용됩니다. 제품 테스트, 적용 범위, 포장, 외부 점검 또는 후보자의 전체 릴리스 승인을 인증하지 않습니다. 워크플로 승인은 연결된 `config/quality/admission-policy.json` 및 `scripts/quality/admission-verdict.mjs` 사용합니다. 릴리스 관찰자 프로필은 별도로 유지됩니다. 해당 수표와 영수증을 독립적으로 검사합니다. `audit:deps`, 돌연변이 테스트 선택 및 번역 확인을 포함하여 전체 관찰자의 정적 명령은 `config/quality/release-green-static-profile.json` 에서 선언됩니다. 로더는 package.json 및 모델링된 CI/Quality 선언에 대해 npm 명령의 유효성을 검사합니다. 쉘 토큰을 인수로 실행하는 대신 드리프트를 거부합니다. 필수 스캐너 SKIP/INCOMPLETE 출력은 PASS 설정할 수 없습니다. 프로필은 외부 제외 사항을 기록하며 호스팅된 적용 범위, 테스트 매트릭스, 패키지 또는 배포 증거를 대체하지 않습니다. 아래의 산문 목록은 참고용일 뿐 게이트가 실제로 실행되었다는 증거는 아닙니다.

스크립트는 `scripts/check/` (정책 게이트) 및 `scripts/quality/` (래칫 엔진) 아래에 있습니다. CI 정보 소스는 `.github/workflows/ci.yml` 입니다.

### 게시된 문서 상태

`.github/workflows/i18n-base-health.yml` `main` 및 `release/v*` 에 대한 선택된 푸시 이후와 수동 디스패치 시 문서 상태를 관찰합니다. 필터에는 문서, 루트 Markdown, `llm.txt`, 번역 state/configuration 및 관련 i18n 도구가 포함됩니다. 단일 `Published base documentation health` 작업에서는 호스팅된 Ubuntu와 5분 기한을 사용합니다. 읽기 전용 유효성 검사를 수행하고 종속성 설치, 변환 또는 상태 채택 없이 진단 영수증을 작성합니다.

`scripts/i18n/check-base-health.mjs` 소스 해시, 누락된 대상, 대상 해시, 오래된 번역 및 섹션 캐시 불일치가 필요하지 않습니다. 또한 현재 핵심 document/locale 범위와 기록된 출처를 검증합니다. 잘못된 컨텍스트, 불완전한 적용 범위 또는 중단된 검사기로 인해 `INCOMPLETE` 생성됩니다. 확인된 드리프트는 `FAIL` 생성합니다. 둘 다 실패한 종료 상태를 반환합니다. 영수증은 SHA 결제, 작업 흐름, 실행 및 시도에 바인딩되며 `i18n-base-health-<sha>-<run>-<attempt>` 로 유지됩니다.

이는 발표된 자료에 대한 독립적인 관찰입니다. PR 또는 병합 그룹 이벤트, 필수 PR 검사, npm 별칭 또는 정적 스캔 프로필 구성원을 추가하지 않습니다. 또한 기본 검사기는 절대 모드에서 5개 클래스를 모두 차단합니다. 일반적인 PR 준비는 입학과 별도로 진행됩니다. 성공적인 업로드는 실패한 건강 결과를 PASS 로 바꿀 수 없습니다.

일반 PR `--baseline-evidence` 에서 생성된 기본 보고서와 함께 `--preflight` 사용합니다. 완전한 번역 기록과 실제 대상 바이트가 정확한 베이스에서 변경되지 않은 경우에만 영어 소스를 보류 상태로 둘 수 있습니다. 새로운 대상 또는 섹션 캐시 불일치가 여전히 차단되고 불완전한 증거가 준비를 승인할 수 없습니다. 보고서는 `preparationPending` 와 `mergeReady` 별도로 표시합니다. 성공적인 준비로 인해 보류 중인 번역을 병합할 준비가 되지는 않습니다. 승인 전에 구성된 후보에서 영향을 받은 미러를 새로 고칩니다. 신뢰할 수 있는 Mergify 큐 후보인 `merge_group`, 분기 푸시 및 수동 CI 실행은 `--warn` 또는 상속된 실패 용서 없이 절대 검사기를 사용합니다. 누락된 대상 해시와 삭제된 기록된 코어 파일로 인해 범위가 축소되면 성공적인 절대 판정을 생성할 수 없습니다.

### PR 빠른 경로(`quality.yml`) 출시

`.github/workflows/quality.yml` main/release PRs 에서 CI 보완하고 `main` 에 푸시하고 그룹을 파견 및 병합합니다. PRs 경로 필터링된 빠른 검사를 사용합니다. 영구적으로 비활성화된 중복 빌드가 제거되었습니다. 실제 build/package/boot 검사는 CI 에 남아 있습니다. 단위 제품군과 vitest는 CI (`Unit Tests (N/12)` 및 `Vitest`)에서만 실행됩니다.

| 직업                                             | 범위                                                                                                                                                 | 블로킹        |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API 문서 참조 및 문서 전체                                                                                                            | 예            |
| `Fast Quality Gates`                             | 코드 PRs; 정적 검사, 유형 검사, 대시보드 유형 검사, 영향을 받는 단위 테스트                                                                          | 예            |
| `Forgotten sibling tests`                        | 코드 PRs; 정적 소비자 및 후보 형제 테스트를 추적하는 변경된 모듈 배럴 및 동적 가져오기 경로는 참조된 허용 목록 예외와 함께 권고 진단으로 보고됩니다. | **자문**      |
| `No new ESLint warnings`                         | 코드 PRs; 억제 인식 린트 가드                                                                                                                        | 예, 포크 포함 |
| `Merge integrity (changelog + generated skills)` | 비초안 PRs; 변경 로그 및 생성된 스킬 동기화                                                                                                          | 예, 포크 포함 |

#### 잊혀진 형제자매 테스트 보고서

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` 의 자문 단계로 실행되며 테스트 영향 맵 뒤에 가져오기 해결 프로그램을 재사용합니다. 변경된 모든 생산 모듈에 대해 풀 요청 차이에 후보 테스트가 없을 때 결정적 `changed module/symbol -> static consumer -> candidate sibling test` 체인을 보고합니다. 마크다운 요약 및 JSON 결과는 차단 롤아웃 전에 보정을 위한 `forgotten-sibling-tests` 워크플로 아티팩트로 유지됩니다.

배럴 재내보내기 및 동적 수입은 해상도 진단일 뿐입니다. 차단 결과를 생성하지 않습니다. 검토된 예외 사항은 `config/quality/forgotten-sibling-allowlist.json` 에 게시되어 있습니다. 각 항목은 소비자 및 후보 테스트의 이름을 지정하고, 구체적인 근거를 제시하고, GitHub 문제 또는 끌어오기 요청을 연결해야 합니다. 잘못된 항목이 실패하면 닫힙니다. 예외는 삭제된 후보 테스트 또는 `.skip`/`.todo` 추가하는 diff를 억제할 수 없습니다. 어설션 약화 및 기타 마스킹은 독립적으로 차단하는 `check:test-masking` 게이트의 소유로 유지됩니다.

### 직업: `lint`

모든 PR 에서 `main` 까지 실행됩니다. 실패 시 블록이 병합됩니다.

| 스크립트(`npm run ...`)           | 검증                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 블로킹                               |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `check:node-runtime`              | Node.js 버전이 지원 범위 내에 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 예                                   |
| `check:cycles`                    | 모든 `src/` + `open-sse/` (AST 기반, tsconfig `paths` 해결) 전체에서 순환 가져오기를 수행합니다. Bare는 사이클이 존재할 때마다 1로 종료하고( #15281 이후 페일클로즈됨) SCCs 를 나열합니다. `check:cycles:ratchet` ( CI 실행하는 것)는 `quality-baseline.json` — 현재 14, `direction: down` 에서 개수가 `metrics.cycles` 상한선을 초과하면 차단되므로 떨어질 수만 있습니다(#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 예(래칫)                             |
| `check:boundary`                  | `open-sse → src` 결합: 엔진에서 앱으로 고유한 파일 간 가져오기(`scripts/quality/measure-boundary.mjs`, 에지 목록은 v4 core/module-split 수정 백로그입니다). 순수 = 자문 보고서( `quality:boundary` 와 동일) `check:boundary:ratchet` ( `quality.yml` 고속 게이트 래칫 루프에서도 CI 실행하는 것)는 카운트가 측정된 771, `direction: down` 에 시드된 `quality-baseline.json` — 의 `metrics.boundaryOpenSseToSrc` 한도를 초과할 때 차단됩니다. `--update` 이를 낮출 뿐입니다. PRs 의 기준 기준(`--base-ref`, 아래 참조)                                                                                                                                                                                                                                                                                                                                                                  | 예(래칫)                             |
| `check:route-validation:t06`      | 모든 경로에 존재하는 Zod 스키마(Tier 6 정책)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 예                                   |
| `check:any-budget:t11`            | `@ts-expect-error // any` 수는 예산을 초과하지 않습니다(Tier 11 catraca).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 예                                   |
| `check:provider-consistency`      | `providers.ts` 의 모든 제공업체에는 `providerRegistry.ts` 에 일치하는 항목이 있습니다(그 반대의 경우도 허용 목록 내에서).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 예                                   |
| `check:model-lifecycle`           | 직접 관리하는 세 개의 라우팅 테이블은 체크인된 수명 주기 스냅샷(#11503)과 일관성을 유지합니다. `FITNESS_TABLE` (`taskFitness.ts`)는 `REGISTRY` 라우팅할 수 있는 만료된 ID를 점수로 매기지 않습니다. 모든 `BUILT_IN_ALIASES` 대상은 `REGISTRY` 에 존재하며 은퇴 ID 스냅샷에는 없습니다. 아직 `REGISTRY` 에 있는 모든 폐기된 ID는 `allowedRetiredInCatalog` 에 전달되거나 나열됩니다. 해당 스냅샷에는 `DEFAULT_DEGRADATION_MAP` 소스나 대상이 폐기된 것으로 나타나지 않습니다. 이는 모델이 현재 라이브 업스트림에서 제공되고 있음을 증명하지 않습니다. 오프라인 — `npm run quality:refresh-model-lifecycle` (네트워크, CI 에 연결되지 않음)을 사용하여 직접 새로 고친 `config/quality/model-lifecycle.json` 와 비교됩니다. `allowedRetiredInCatalog` 은 번다운 래칫입니다. 추적 문제가 있는 경우에만 항목을 추가하세요.                                                                  | 예                                   |
| `check:fetch-targets`             | 클라이언트 측 `src/` 의 모든 `fetch("/api/...")` 실제 `route.ts` 로 확인됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 예                                   |
| `check:deps`                      | 리포지토리의 모든 `package.json` 에 있는 모든 `npm install` -able deps는 `dependency-allowlist.json` 에 있습니다. 고정되지 않았거나 부주의한 새 패키지에 플래그가 지정됨                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 예                                   |
| `audit:deps`                      | 5개의 독립적인 잠금 파일(루트, Electron, OpenCode 플러그인 v1/v2 및 공급자) 모두에 대한 npm 감사입니다. 중요한 권고사항 차단; 높은 주의보는 눈에 보이는 경고로 남아 있습니다. Missing/failed 감사는 INCOMPLETE 및 블록입니다. 범위별 잠금 해시 및 보고서가 유지됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 예                                   |
| `check:lockfile`                  | `package-lock.json` 무결성 — https 레지스트리, 무결성 해시, 호스트 재정의 없음                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 예                                   |
| `check:licenses`                  | 프로덕션 종속성을 위한 SPDX 라이선스 허용 목록                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 예                                   |
| `check:tracked-artifacts`         | 빌드 아티팩트 없음/커밋된 `node_modules` 심볼릭 링크(허스키 사전 커밋에서도 실행됨, 사전 푸시는 의도적으로 가벼운 — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 예                                   |
| `check:ai-attribution`            | PR 커밋, 제목 또는 본문에 AI/bot `Co-Authored-By` 트레일러 또는 AI 생성 바닥글이 없습니다. — 하드 규칙 #16 ( PR→ `release/**` — 의 `quality.yml` 패스트 게이트 루프에서 이벤트 페이로드를 읽습니다. PRs — 및 PR→ `main` 에 대한 `ci.yml` 린트의 PR 전용 단계, 또한 허스키 `commit-msg` 후크, 인간 공동 작성자 허용, #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | 모든 Vitest 제외에는 추적 문제의 이름이 지정되고 `config/quality/vitest-exclusions.json` (#13204)에 표시됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 예                                   |
| `check:file-size`                 | 소스 파일( `src/`, `open-sse/`, `electron/`, `bin/` 의 `.ts`/`.tsx` )은 `cap` 내에 있고 테스트 파일(`*.test.ts(x)`)은 `testCap` 내에 있습니다. `file-size-baseline.json` (`frozen` / `testFrozen`)에 고정된 파일은 기록된 크기를 초과하여 커지면 안 됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 예                                   |
| `check:error-helper`              | executors/handlers 의 오류 응답은 `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)를 사용합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 예                                   |
| `check:migration-numbering`       | 마이그레이션 SQL 파일은 순차적으로 번호가 지정되며 간격이나 중복이 없습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 예                                   |
| `check:public-creds`              | `publicCreds.ts` 외부에는 리터럴 OAuth `client_id`/`client_secret` 또는 Firebase 웹 키가 없습니다(엄격한 규칙 #11).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 예                                   |
| `check:db-rules`                  | `src/lib/db/` 모듈 외부에는 원시 SQL 없습니다. `localDb.ts` 에서 배럴 수입 금지(엄격한 규정 #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 예                                   |
| `check:known-symbols`             | 디스패치 테이블에 등록된 제공자 실행자, 라우팅 전략 및 번역자는 디스크 — 의 파일과 일치합니다. 분리되거나 선언되지 않은 기호는 없습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 예                                   |
| `check:route-guard-membership`    | 하위 프로세스를 생성하는 모든 경로는 `isLocalOnlyPath()` (Hard Rules #15/#17)로 분류됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 예                                   |
| `check:test-discovery`            | 저장소의 모든 `*.test.ts` / `*.spec.ts` 파일은 적어도 하나의 테스트 실행기에 의해 수집됩니다(래칫: `test-discovery-baseline.json` 의 고아 목록은 축소만 가능)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 예                                   |
| `check:test-tla-order`            | `tests/unit` 아래의 `node:test` 파일은 테스트를 등록하고 최상위 `await` 에 도달한 다음 더 많은 것을 등록합니다(#18045, 래칫: `test-tla-order-allowlist.json` 축소만 가능).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 예                                   |
| `check:agent-skills-sync`         | 생성된 에이전트 기술 아티팩트가 소스 카탈로그와 일치합니다(드리프트 없음).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | 공급자 logos/assets 기록된 출처 항목을 가지고 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | JSON 구성 파일은 repo lint 규칙을 구문 분석하고 충족합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | 오류 없는 TypeScript 컴파일(권고 경고만)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 예                                   |
| `typecheck:noimplicit:core`       | 엄격한 `noImplicitAny` — 미래지향적; 기존의 많은 호출 사이트에는 여전히 주석이 필요합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **자문** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` `src/app/(dashboard)/**` (#7033) — 로 범위가 지정되었습니다. `typecheck:core` 의 엄선된 27개 파일 허용 목록에는 대시보드 TSX 포함되어 있지 않으며 `next build` 대시보드 ZQF를 절대 유형 확인하지 않으므로(`next.config.mjs` `ignoreBuildErrors: true` 설정함) 거기에서 분리된 식별자 회귀(#6625/#6909)는 CI 에 표시되지 않았습니다. 고정된 per-file/per-TS-code 카운트 기준(`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` 와 동일한 오래된 적용 패턴)과 비교합니다. — 만 기준 카운트를 초과하는 NEW 오류는 게이트에 실패합니다. 기존 오류가 수정되면 `--update` 사용하여 속도를 늦추세요.                                                                                                                                                                                                                                                            | 예                                   |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`)에 대한 전체 앱 제작 유형 확인, 표면 `typecheck:core` 의 27개 파일 허용 목록 및 대시보드 게이트는 포함되지 않습니다. `config/quality/build-typecheck-baseline.json` 와의 차이점; 새로운 또는 증가된 (파일, 코드)별 개수가 실패하면 더 낮은 개수로 래칫을 요청합니다. `--update` `--force-regressions` 전달되지 않는 한 실행에 새 쌍이나 제기된 쌍이 포함되어 있는 동안 거부하고, `--force-nocheck` 전달되지 않는 한 새로 침묵된 파일을 거부하므로 녹색이 되도록 기준선을 확대하는 것과 영구적인 침묵을 부여하는 것은 두 가지 별도의 고의적 행위입니다. 순수 `--force` 은 거부됩니다. 또한 `config/quality/ts-nocheck-baseline.json` 에 대해 `@ts-nocheck` 의 빌드 범위를 검색합니다. 이를 사용하는 파일은 진단을 전혀 보고하지 않고 그렇지 않으면 모든 게이트에 표시되지 않기 때문입니다. | 예                                   |

#### 두 가지 유형 검사 프로그램이 다르게 대답합니다.

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) 및 `check:build-typecheck` 서로 다른 옵션으로 서로 다른 프로그램을 컴파일하며 동일한 파일이 하나에서는 깨끗하고 다른 하나에서는 오류로 가득 차 있을 수 있습니다.

`tsconfig.build.json` `"strict": false` 설정하므로 `noImplicitAny` 는 꺼집니다. 핵심 구성은 더 엄격한 옵션을 사용하여 선별된 27개 파일 허용 목록을 컴파일하고 각 항목의 가져오기 그래프를 따르므로 빌드 프로그램에 표시되지 않는 파일은 계속 확인됩니다.

파일이 입력되었는지 여부를 판단할 때 결과가 중요합니다.**`check:build-typecheck` 에 따른 제로 진단은 제로를 의미하지 않습니다.** . 26개 파일에서 `@ts-nocheck` 제거하면 그 중 23개 파일이 빌드 프로그램에서 깨끗해졌습니다. 그 중 16개는 약 120개의 암묵적인 오류(엄격한 오류)를 드러냈습니다. 파일 정리를 호출하기 전에 두 가지를 모두 확인하십시오.

### 직업: `quality-gate`

`test-coverage` 이후에 실행됩니다. 실패 시 블록이 병합됩니다.

| 스크립트                     | 검증                                                                                                                          | 블로킹        |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `quality:collect`            | `quality-metrics.json` 방출(ESLint 경고 수, 병합된 샤드 보고서의 적용 범위)                                                   | 예(래칫 상류) |
| `quality:ratchet`            | `quality-baseline.json` 의 각 지표는 회귀되지 않았습니다(ESLint 경고 ≤ 기준, 적용 범위 ≥ 기준).                               | 예            |
| `check:duplication`          | 코드 중복(jscpd@4)은 `quality-baseline.json` 의 기준선을 초과하지 않습니다.                                                   | 예            |
| `check:complexity`           | 파일 수준 순환 복잡도는 한도를 초과하지 않습니다(core ESLint `complexity` + `max-lines-per-function`).                        | 예            |
| `check:cognitive-complexity` | 인지 복잡성 래칫(`eslint-plugin-sonarjs`) — 별도 ESLint 패스; CI 단일 `check:complexity-ratchets` 단계로 병합되어 실행됩니다. | 예            |
| `check:dead-code`            | 사용되지 않은 내보내기/파일 래칫(knip)이 기준선에 비해 회귀하지 않습니다.                                                     | 예            |
| `check:compression-budget`   | 압축 벤치마크 예산 — 엔진당 토큰 절감 하한선은 회귀해서는 안 됩니다.                                                          | 예            |
| `check:type-coverage`        | 백분율 유형의 래칫(`type-coverage`)은 회귀하지 않습니다. 주로 `typecheck:noimplicit:core` 포함합니다.                         | 예            |

### 직업: `codeql-scan` 및 `codeql-admission`

`codeql-scan` 구성된 모든 분석 카테고리를 생성합니다. 해당 작업이 성공한 후 `codeql-admission` 정확한 업로드와 후보 경고 래칫의 유효성을 검사합니다. 둘 다 문서 전용 후보를 포함하여 `Gate / CI` 의 필수 종속성입니다. 관리 활성화 및 카나리아 요구 사항은 아래 "CodeQL 래칫"에 설명되어 있습니다.

| 스크립트               | 검증                                                                                                                                                                     | 블로킹 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| `check:codeql-ratchet` | 후보 ref/SHA 및 구성된 모든 분석 범주는 경고 래칫 이전에 최신 상태여야 합니다. 증거 블록이 누락되었습니다. 글로벌 재고는 별도의 — 로 유지됩니다. 아래 "CodeQL 래칫" 참조 | 예     |

### 직업: `quality-extended`

해당 직무는 해당 후보자를 차단합니다. 번들 크기, 비밀 조사 결과, 취약성 조사 결과, 작업 흐름 조사 결과 및 OpenAPI 변경 사항은 필수 래칫을 통해 확인됩니다. 순환 종속성 진단은 여전히 권고 사항입니다. 스캐너 설치가 필요합니다. `scripts/ci/install-quality-scanners.sh` 고정된 버전을 프로비저닝하고 설치 실패를 전파합니다. 누락된 도구, 유효하지 않은 보고서 또는 누락된 기준선은 필수 스캐너 게이트 INCOMPLETE 떠납니다.

| 스크립트                 | 검증                                                                                                                                                                                    | 블로킹                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:circular-deps`    | 순환 종속성 없음(dpdm)                                                                                                                                                                  | **자문**                                  |
| `check:bundle-size`      | 번들 크기는 한도를 초과하지 않습니다. 사용할 수 없는 측정이 실패함                                                                                                                      | **--ratchet 로 차단**                     |
| `check:secrets`          | Gitleaks 조사 결과는 회귀되지 않습니다. 필수 스캔은 누락된 tools/source/baseline, 실패한 스캔 및 유효하지 않은 보고서를 거부합니다.                                                     | **--ratchet 로 차단**                     |
| `check:vuln-ratchet`     | 종속성 취약점은 재발되지 않습니다. 필수 스캔은 누락된 도구, 유효하지 않은 보고서 또는 누락된 기준선을 거부합니다.                                                                       | **--ratchet 로 차단**                     |
| `check:workflows`        | 워크플로 린트(actionlint + zizmor) missing/broken 스캐너, 유효하지 않은 보고서 또는 래칫 기준 누락은 INCOMPLETE 로 실패합니다. 선택한 strict/advisory/ratchet 정책을 따르는 유효한 결과 | 실행이 필요합니다. CI 의 zizmor 래칫 차단 |
| `check:openapi-breaking` | 고정된 이벤트 커밋에 대한 공개 API 계약(PR 병합 기반, 이전 푸시, 병합 그룹 기반, scheduled/manual 체크아웃 첫 번째 상위) 필수 측정 실패 종료                                            | **--ratchet 로 차단**                     |

### 직업: `docs-sync-strict`

`main` 또는 `release/**` 에 대한 풀 요청의 경우 이 작업은 문서 또는 코드 변경으로 분류된 초안이 아닌(또는 신뢰할 수 있는 대기열) 후보에 대해서만 실행됩니다. PR이 아닌 CI 이벤트에서도 실행됩니다. 이 워크플로의 푸시 트리거는 `main` 가 아닌 `release/**` 에만 적용됩니다. 0이 아닌 값으로 종료하는 단계는 작업을 차단합니다. 아래의 보고 전용 조사 결과 및 문서화된 예외 사항은 그렇지 않습니다.

| 스크립트                       | 검증                                                                                                                                                                                                                                                                                                                                                                                                  | 블로킹                                                                                                                |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | 아래 7개의 서브게이트를 순차적으로 실행하는 메타게이트                                                                                                                                                                                                                                                                                                                                                | 예                                                                                                                    |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG 버전 일관성, 정확한 `llm.txt` 미러, 번역된 CHANGELOG section/size 불변성 및 대체된 중복 문서의 부재                                                                                                                                                                                                                                                                         | 예                                                                                                                    |
| ↳ `check:docs-frontmatter`     | 컴파일된 문서 페이지에는 유효한 머리말 제목이 있습니다.                                                                                                                                                                                                                                                                                                                                               | 예                                                                                                                    |
| ↳ `check:docs-counts`          | 신뢰도가 높은 개수 불변은 엄격합니다. 경험적 파일 수 검사는 스크립트가 `--strict` 수신하지 않는 한 경고만 합니다( CI 메타 게이트는 이를 통과하지 않습니다).                                                                                                                                                                                                                                           | 엄격한 계층 차단; 소프트 계층 권고                                                                                    |
| ↳ `check:env-doc-sync`         | 소스 환경 읽기, `.env.example` 및 `docs/reference/ENVIRONMENT.md` 명시적인 무시, 문서 전용 및 환경 전용 허용 목록 이후에 동의합니다.                                                                                                                                                                                                                                                                  | 예, 문서화된 허용 목록 외부                                                                                           |
| ↳ `check:deprecated-versions`  | 무시된 문서를 제외하고 안전한 기록 컨텍스트 및 오래된 업데이트 날짜를 벗어난 잠재적인 오래된 버전을 보고합니다.                                                                                                                                                                                                                                                                                       | 현재 CI 배선에 대한 주의 사항(`--strict` 는 통과되지 않음)                                                            |
| ↳ `check:doc-links`            | 문서의 내부 마크다운 링크는 실제 파일(`[text]`/`(path)` 형식)로 해석됩니다.                                                                                                                                                                                                                                                                                                                           | 예                                                                                                                    |
| ↳ `check:fabricated-docs`      | 문서에 인용된 경로, 환경 변수, CLI 명령, 후크 이름 및 파일 경로가 코드베이스에 존재합니다. `--strict` 통한 하드 게이트; 플래그가 없는 소프트 페일.                                                                                                                                                                                                                                                    | 예( CI 의 `--strict` 통해)                                                                                            |
| `check:cli-i18n`               | 사용된 CLI `t()` 키는 `en` 에 존재합니다. `pt-BR` 모든 최상위 섹션을 유지합니다. `zh-CN` 및 `zh-TW` 에는 `en` 의 모든 키가 포함되어 있습니다.                                                                                                                                                                                                                                                         | 예                                                                                                                    |
| `check:openapi-coverage`       | OpenAPI 사양은 최소한 실제 경로의 톱니바퀴 바닥을 포함합니다.                                                                                                                                                                                                                                                                                                                                         | 예                                                                                                                    |
| `check:openapi-security-tiers` | 선언된 `x-loopback-only`/`x-always-protected` 주석은 `routeGuard.ts` 의 지원을 받아야 합니다. 파서 및 전달 불일치 블록. 로컬 전용 접두사 아래에 누락된 `x-loopback-only` 있는지 역방향으로 확인하면 경고가 표시되고 패턴 전용 경로는 해당 역방향 전달에서 제외됩니다.                                                                                                                                 | Parser/forward 차단을 확인합니다. 리버스 체크 주의보                                                                  |
| `check:openapi-routes`         | `openapi.yaml` 의 각 `/api...` 경로는 매개변수를 무시하고 정당한 `KNOWN_STALE_SPEC` 허용 목록 이후의 실제 경로를 확인합니다. 오래된 허용 목록 항목도 실패합니다.                                                                                                                                                                                                                                      | 예                                                                                                                    |
| `check:docs-symbols`           | 정식 비미러 문서의 내부 `/api/...` URL 참조는 실제 경로 또는 경로군으로 확인됩니다. proxy/upstream/placeholder/file 참조 및 정당화된 `KNOWN_STALE_DOC_REFS` 항목은 제외되고 오래된 허용 목록 항목은 실패합니다.                                                                                                                                                                                       | 예                                                                                                                    |
| `i18n translation drift`       | 절대 허용에는 소스 없음, 대상 누락, 대상 해시, 오래된 번역 및 섹션 캐시 불일치가 필요합니다. 일반적인 PR 준비에서는 상속된 정확한 증거 또는 변경되지 않은 전체 상태 및 대상 바이트를 포함하는 영어로만 보류 중인 변경 사항을 유지할 수 있습니다. 보고서에서는 병합 준비 상태를 별도로 선언합니다. 대상 해시가 누락되고 기본 증거 블록이 불완전합니다. 레거시 섹션 캐시가 없다는 것은 실패가 아닙니다. | 5개 클래스 모두 queue/base 입학을 차단합니다. 일반 준비는 입증된 상속 작업 또는 영어로만 진행 중인 작업만 허용합니다. |

`docs/diagrams/` 아래에 12개의 README SVGs 생성됩니다(`scripts/docs/gen-readme-<name>.mjs`, `npm run docs:readme-diagrams` 모두 재생성합니다). 각각에는 커밋된 파일이 오래되었을 때 실패하는 바이트 비교 단위 테스트(`tests/unit/docs/readme-*-svg.test.ts`, 작업 `test-unit`)가 있으며 `check:docs-counts` `<text>` 노드 — 에서 정식 번호를 읽습니다. 이는 개요 단계에서 파일의 모든 윤곽선 문자열을 보이지 않는 `<text>` 로 유지하는 이유입니다. SVG 표준 번호 검사는 `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`)에 나열된 파일( `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg` 및 `tier-flow-light.svg` 을 읽습니다. 영원히 무료, 카탈로그 항목, 반복 풀 및 득점 요인 주장도 `promise-pillars.svg`, `free-tier-budget.svg` 및 `strategies-grid.svg` 로 읽습니다. `free-tier-budget.svg` 라이브 카탈로그 로더에서 수치를 가져오므로 `FREE_MODEL_BUDGETS` 또는 공급자 표시 이름을 변경하면 해당 파일이 재생성될 때까지 CI 빨간색으로 표시됩니다.

### 직업: `i18n-ui-coverage`

| 스크립트                          | 검증                                                                                                                                                     | 블로킹     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check-ui-keys-coverage` (인라인) | UI i18n 키 커버리지는 ≥ 65%입니다.                                                                                                                       | 예         |
| `check-ui-value-drift` (인라인)   | 다시 쓴 영어 **값** 오래된 번역을 남기지 않습니다                                                                                                        | 예         |
| `check-new-key-coverage` (인라인) | 에이 **새로운** 영어 키는 모든 로케일에서 번역됩니다. — `__MISSING__:` 마커는 거부됩니다.                                                                | 예         |
| `check-translation-ratio`         | 로캘별 실제 번역 비율(영어와 동일/자리 표시자/허용 목록 외부 누락된 잎)은 `config/quality/i18n-translation-baseline.json` + 여유를 초과해서는 안 됩니다. | **블로킹** |

`fetch-depth: 0` — 가 필요합니다. 가치 드리프트 게이트는 `en.json` 병합 기반과 비교합니다.

#### `check-ui-value-drift` — 오래된 변환 게이트

다른 게이트가 구조적으로 볼 수 없는 하나의 i18n 회귀를 포착합니다. 즉, 영어 값이 다시 작성되고 _이전_ 영어에서 파생된 번역이 그대로 유지되므로 영어가 아닌 사용자는 자신 있게 표현된 현재 잘못된 사본을 계속 읽습니다.

이건 진짜로 배송됐어요. Antigravity 로그인 도우미가 도착했을 때 `oauthModal.googleOAuthWarning` 다시 작성되었습니다(#5203).**43개 로케일 중 39개** 운영자에게 "전체 URL 복사하여 아래에 붙여넣으십시오"라고 알리는 텍스트가 유지되었습니다. — 해당 공급자에 대해 완료할 수 없는 흐름입니다. 다음과 같은 이유로 #8463 까지는 눈에 띄지 않았습니다.

- `sync-ui-keys` 다음과 같은 키만 백필합니다.**결석한** , 절대 그렇지 않습니다 **탁한** ;
- `check-ui-keys-coverage` 키를 _presence_로 계산하므로 오래된 번역은 포함된 것으로 간주됩니다.
- `check-translation-drift` `docs/i18n/<locale>/**.md` 문서를 추적하며 — 미러링하며 `src/i18n/messages/*.json` 읽지 않습니다. 2026-09년 재동기화 이후 작업 `docs-sync-strict` 에서 차단: 핵심 문서 → `npm run i18n:run -- --files=<doc>` (섹션 수준, 저렴한)를 편집합니다.

**기준선 지원이 아닌 차이점을 인식합니다.** 병합 베이스의 `en.json` 작업 트리와 비교합니다. 영어 값이 변경된 모든 키에 대해 아직 손대지 않은 번역이 남아 있는 로케일은 오래되었습니다. 이건 고의로 **기존 부채를 동결합니다** — 오랜 번역이 어떤 고대 영어에서 왔는지를 밝힐 수 없으므로 게이트는 현재 변경 사항이 무엇에 영향을 미치는지만 판단합니다. 대안(키별 해시 기준)은 ~ 600 KB 생성 파일의 비용이 들며, 기존 기준 중 가장 큰 3 × i18n PR 마다 휘젓습니다.

그것을 만족시키는 두 가지 방법:

1. 영향을 받은 번역을 업데이트하거나
2. 이를 `__MISSING__:<new english>` — 로 설정하면 런타임은 수정된 영어(`src/i18n/request.ts::deepMergeFallback`, #7258)와 번역을 위한 주요 대기열을 제공합니다.

문자열의 경우 **의미** 바뀌었다, 선호하다 **키 이름 바꾸기** : 새 키는 오래된 번역을 상속받을 수 없습니다. 이것이 #8463 사용하는 패턴입니다.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

가치 드리프트 및 새 키 게이트는 `scripts/i18n/resolve-ui-diff-base.mjs` 의 불변 비교를 공유합니다. 워크플로는 동일한 베이스, 베이스 팁 및 후보 SHAs 두 검사에 모두 전달합니다. PR/base-retarget, 푸시 및 병합 그룹 실행은 해당 이벤트 컨텍스트를 사용합니다. 후보 브랜치를 디스패치하려면 정확한 공개 PR 또는 명시적인 `i18n_base_sha` 입력이 필요합니다. 해당 입력이 없는 `main` 또는 `release/vX.Y.Z` 의 디스패치 또는 예약된 관찰은 마지막 커밋을 첫 번째 상위 커밋과 비교합니다. 상속받은 모든 번역채무를 감사하는 것은 아닙니다. 로컬 호출에는 위의 `BASE_REF` 명령과 같은 명시적인 비교 기준이 필요합니다.

누락되거나 모호한 비교 컨텍스트, 읽을 수 없거나 유효하지 않은 필수 카탈로그, 변경된 후보가 종료 코드와 함께 `INCOMPLETE` 생성합니다.**2** , 경고 모드 포함. 카탈로그 읽기는 `scripts/i18n/read-ui-catalog.mjs` 사용합니다. 읽기 실패는 빈 개체로 대체되지 않습니다. 사용할 수 없는 염기나 불완전한 입력 모두 PASS 설정하지 않습니다.

### 직업: `i18n`

전체 i18n 검증 매트릭스(로케일당 하나의 작업) 직업 전체가 자문입니다.

| 스크립트                        | 검증                 | 블로킹                                                 |
| ------------------------------- | -------------------- | ------------------------------------------------------ |
| `validate_translation.py quick` | 로케일별 번역 완성도 | **자문** (전체 작업에 대한 `continue-on-error: true` ) |

### 직업: `pr-test-policy`

풀 요청에서만 실행됩니다.

| 스크립트               | 검증                                                                                                                                  | 블로킹 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` 또는 `bin/` 에서 생산 코드를 변경하는 PRs 는 테스트를 포함하거나 업데이트해야 합니다(엄격한 규칙 #8) | 예     |
| `check:test-masking`   | 변경된 테스트 파일은 순 어설션 수를 줄이거나 `assert.ok(true)` 동어반복을 추가하지 않습니다.                                          | 예     |
| `check:pr-evidence`    | PR 본문은 변경에 대한 test/VPS 증거를 인용합니다( PR 산문 — 취약성을 파악하여 엄격한 규칙 #18 기계화합니다. 백로그 참조).             | 예     |

### 직업: `test-vitest`

`changes` 분류 작업이 필요합니다. 적용 가능한 매트릭스 샤드는 실패 시 병합을 차단합니다.

| 모음곡           | 검증                                                  | 블로킹                                                                                                   |
| ---------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP 서버(110개 도구), autoCombo, 캐시 — vitest 실행자 | 예                                                                                                       |
| `test:vitest:ui` | UI 구성 요소 테스트 — vitest 실행자                   | **블로킹** — 기존 오류는 `vitest.config.ts` 에서 명시적으로 제외됩니다. 새로운 실패로 인해 작업이 실패함 |

### 야간 워크플로(예약, 자문)

이는 크론 일정(및 `workflow_dispatch`)에 따라 실행되며 PRs 에서는 실행되지 않습니다. 모두 자문입니다.

| 작업 흐름              | 검증                                                                                                                           | 블로킹   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `nightly-property`     | 무작위 시드 + 높은 실행 횟수를 사용한 빠른 확인 속성 테스트                                                                    | **자문** |
| `nightly-resilience`   | 힙 성장 게이트, 카오스 결함 주입, k6 load/soak                                                                                 | **자문** |
| `nightly-llm-security` | Promptfoo 주입 가드(블록 모드) + 가락 프로브(공급자 비밀 없이 건너뛰기)                                                        | **자문** |
| `nightly-schemathesis` | `docs/openapi.yaml` — 표면 사양 위반/처리되지 않은 500을 사용하여 라이브 OmniRoute 에 대한 OpenAPI 계약 퍼징(도식)(Fase 8 B.4) | **자문** |
| `nightly-mutation`     | 빠른 단위 레인에 대한 Stryker 돌연변이 테스트 점수 — 생존 돌연변이 표면 약한 주장                                              | **자문** |
| `nightly-compat`       | 지원되는 `engines.node` 범위 전체의 노드 엔진 호환성 매트릭스                                                                  | **자문** |

성능 기준(힙, TTFB, 빌드 시간)은 제한되지 않고 기록됩니다. [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)를 참조하세요.

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

### CodeQL 래칫: 후보자 승인 및 저장소 목록

CI 명시적인 종속성 체인을 통해 후보 CodeQL 승인을 소유합니다. `codeql-scan` `codeql.yml` 에서 4개 언어 매트릭스를 호출한 다음 `codeql-admission` `node scripts/check/check-codeql-ratchet.mjs --candidate` 실행합니다. `Gate / CI` 두 가지 결과가 모두 필요합니다. 품질은 자체 수치 검사를 유지하지만 생산자가 작업을 완료하기 전에 스캐너에 쿼리하지 않습니다. `Gate / Quality` 만으로는 완전한 후보자 입학이 불가능합니다. 문서 전용 후보자에게는 CodeQL 계속 필요합니다.

`config/quality/codeql-admission-policy.json` 의 정책은 작업, C/C++, JavaScript/TypeScript 및 Python, 쿼리 제품군 기본값, 원격 위협 모델 및 빌드 모드 없음을 선택합니다. 생산자 프리플라이트는 보류 중인 활성화 레코드를 거부하고 명시적인 대상 목록 외부로 분기합니다. 현재 대상은 기본이며 release/v3.8.54. 계약 테스트는 이 유한 목록과 유지 관리 푸시 트리거를 패키지 버전과 비교합니다. 다음 릴리스에서는 온보딩을 검토해야 합니다. CI 의 기존 광범위한 릴리스 PR 트리거는 유지되지만, 탑재되지 않은 대상은 측정되지 않은 PASS 획득하는 대신 추출 전에 HOLD 보고합니다.

각 매트릭스 작업은 실제 SARIF 업로드 ID, 언어, 범주, 실행 및 시도, 호출자 워크플로 ID, 이벤트 ref/head/base/merge SHA 및 정책 해시를 기록합니다. 종속 작업은 이 실행의 영수증만 다운로드하고 아티팩트 다이제스트의 유효성을 검사합니다. 이를 위해서는 네 가지 범주가 모두 필요하며, 성공적인 제작자와 각각의 정확한 업로드 처리가 완료되어야 합니다. 이는 지점에서 발견된 최신 분석이 아닌 API 의 sarif_id 필터를 사용합니다. 부분 재실행은 동일한 실행 및 후보의 이전 시도에서 성공한 카테고리를 재사용하여 제작 시도를 보존할 수 있습니다. 실패한 현재 생산자는 이전의 친환경 증거를 재사용할 수 없습니다.

CodeQL 작업은 처리를 기다리지만 고정된 구현은 상태 읽기 실패 또는 대기 소진 후에 경고하고 계속할 수 있습니다. 따라서 입학 허가는 처리 과정을 다시 확인합니다. 누락된 범주, 보류 중인 처리, 실패하거나 취소된 작업, 오래된 ID, 불완전한 페이지 매김 또는 사용할 수 없는 APIs HOLD 생성하고 2를 종료합니다. 독립적인 스캐너 작업 흐름에 대한 고정된 대기는 남아 있지 않습니다. 경고 쿼리가 0을 반환했기 때문에 스캔되지 않은 PR 통과할 수 없습니다. `metrics.codeqlAlerts.value` 초과하는 측정된 개수는 1을 종료합니다. 다른 지점의 경고를 흡수하기 위해 기준선이 올라가지 않습니다. [업로드 상태 및 분석 조회](https://docs.github.com/en/rest/code-scanning/code-scanning).

영수증 기록은 IDs, 카테고리, 도구 버전, ref/SHA, 기준선 및 경고 번호를 업로드하고 분석합니다. SARIF identity/result 수, 최소 규칙 수 및 정확한 경고 인스턴스는 여전히 필수입니다. 수락하기 전에 PR/analysis 신원을 다시 확인합니다. 이러한 검사는 추출된 모든 소스 파일의 인벤토리가 아닌 구성된 범주 적용 범위를 설정합니다. C/C++ 비빌드 추출에는 프로젝트 빌드 중에 생성된 코드가 포함되지 않습니다. 소스 제외에는 여전히 검토가 필요하며, 기여자 귀속에는 비교 가능한 정확한 근거 증거가 필요합니다.

`codeql-maintenance.yml` PR/main 생산자를 복제하지 않고 활성 릴리스 푸시 스캔과 주간 일정을 제공합니다. `nightly-codeql-inventory.yml` `--strict-measurement` 와 함께 저장소 전체 기준을 별도로 유지하며 측정을 사용할 수 없는 경우 오류를 발생시킵니다. 로컬 레거시 수집가의 우아한 건너뛰기는 후보자 승인이 아닙니다. 글로벌 수치가 낮아진 것으로 확인된 후에도 조임은 명시적인 `--update` 로 유지됩니다.

기본 설정이 구성된 동안에는 고급 작업 흐름을 게시하면 안 됩니다. GitHub 해당 조합을 거부합니다. 버전이 지정된 정책은 검토된 관리 전환을 다시 읽을 때까지 보류 상태로 유지됩니다. 게시하기 전에 운영자는 저장소, head/base/tree, policy/patch/rollback 해시를 고정하고 설정 상태를 관찰합니다. `node scripts/quality/codeql-producer.mjs verify-admin-readback` 제공된 예상 및 실제 JSON 레코드를 확인합니다. 이는 운영자 승인이나 새로운 리드백을 가져오기 위한 대체가 아닌 기술 보호입니다. PR 토큰은 관리 액세스를 요청하지 않습니다. 롤아웃 및 모든 스캐너 변경에는 별도의 리드백과 실제 PR, 포크 및 병합 그룹 호환성 증거가 필요합니다.

포크는 호스팅된 실행기를 사용하고, 지속 자격 증명 없이 결제하고, 생산자에 프로젝트 install/build 없고, 상속된 저장소 비밀이 없습니다. GitHub 축소된 포크 토큰을 사용하여 pull_request 이벤트에 대한 SARIF 업로드를 지원합니다. 최초 기여 실행 승인은 GitHub 정책으로 유지됩니다. 신뢰할 수 없는 코드를 실행하기 위해 pull_request_target을 사용하지 마십시오. 마이그레이션 완료를 고려하기 전에 제어된 카나리아의 실제 토큰 권한, analyze_key 및 모든 카테고리 환경을 확인하세요. [포크 업로드 규칙](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [설정 모드 충돌](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**해고는 교환원의 요청입니다(엄격한 규칙 #14).** — 해제 의견에 기술적인 정당성을 기록하지 않고 CodeQL 경고를 해제하지 않습니다. 업스트림 프로토콜 요구 사항에 대한 `won't fix`, 테스트 설비에 대한 `used in tests`, 소독제에 대한 `false positive` CodeQL 볼 수 없습니다(선례: `docs/security/ERROR_SANITIZATION.md`).

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

**위에서 다루지 않은 항목**(권고 수준, 약한 신호): `docs-lint` 작업(markdownlint + Vale, 전체 작업에 `continue-on-error` 적용)과 독립적인 스캐너 워크플로 `semgrep.yml` / `scorecard.yml`입니다. 이제 CodeQL은 `Gate / CI` 아래에 필수 생산 및 승인 작업을 가지며, 앞서 설명한 활성화 요건을 따릅니다. `semgrepFindings: 0`은 `quality-baseline.json`에 있지만 `ci.yml`의 차단 래칫에는 연결되어 있지 않습니다. 이 메트릭은 현재 실행 검사에서 분리되어 있습니다.

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
