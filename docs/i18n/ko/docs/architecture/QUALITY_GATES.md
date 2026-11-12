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

각 JSON 영수증은 체크아웃된 SHA, 워크플로 실행 및 시도를 식별합니다. CLI 는 checkout/event SHA 불일치를 거부합니다. 워크플로 테스트는 정책 멤버십을 판정 작업의 `needs` 목록에 바인딩하므로 새 레인이나 제거된 레인이 자동으로 사라지는 일이 없습니다. 영수증에는 게시, 배포 또는 기존 자문 스캐너의 내부가 아닌 자체 작업 흐름이 포함됩니다. 분기 규칙에 필요한 해당 검사를 수행하는 것은 별도의 관리 변경 사항입니다. 자신의 직업을 정의하는 것 자체가 지점을 보호하는 것은 아닙니다.

`API Route Typecheck` 집계된 판정과 로컬 전체 관찰자의 정적 프로필 외부에 있는 독립적인 작업 흐름 검사입니다. 정확한 후보에 대해서는 결과를 별도로 검사하십시오. `.github/workflows/api-route-typecheck.yml` PRs 에서 `main` 또는 `release/**` 로 실행되고 `checks_requested` 유형의 브랜치 제품군, 수동 디스패치 및 `merge_group` 이벤트에 푸시됩니다. 경로 필터가 없습니다. 그룹 병합은 `merge_group.head_sha` 확인하세요. 다른 이벤트는 `github.sha` 확인하세요. 모든 이벤트는 동일한 API 진단 게이트 및 게이트 단위 테스트를 사용합니다. PR 기본 대상 변경은 새로운 확인을 요청합니다. body/title 편집은 관찰 전용 이름인 `Admission not requested / API Route Typecheck` 사용하며 승인 확인을 대체할 수 없습니다.

### 승인 리듀서에 보존된 증거

`scripts/quality/validate-release-acceptance.mjs`는 제공된 계획과 해당 매니페스트를
축약합니다. 계획이 전체 릴리스 파이프라인을 포괄하는지는 입증하지 않습니다.
해당 보고서는 계획이 `VERIFIED`인 경우에도 명시적으로 `releaseAcceptance: false`를
설정합니다. `release-acceptance.yml` 워크플로는 여전히 실제 빌드, 패키지, 부팅 또는
프로모션 영수증이 아닌 섀도 픽스처를 사용합니다.

CLI에서 보존된 증거를 검증하려면 `--evidence-root`가 필요합니다. 파일은
`<evidence-root>/<artifact_id>/<member>` 형식으로 확인되며 SHA-256으로 해시됩니다.
증거가 없는 PASS 레코드, 누락되거나 변경된 파일, 안전하지 않은 경로 또는 심볼릭 링크는
검증을 차단합니다. 누락된 파일은 비어 있지만 성공한 로그와 동일하지 않습니다. 기존
SHA/실행/시도 검사는 독립적으로 유지됩니다. 바이트가 일치해도 오래된 영수증을
복구할 수 없습니다. 파일 무결성은 실행의 진위 또는 아티팩트 프로모션의 증거가 아닙니다.

### DAST는 검증된 CI 빌드를 사용합니다

필수 CI 작업 `dast-smoke`는 `build` 이후 `.github/workflows/dast-smoke.yml`을 호출합니다. 지원되는 fork PR, release 대상 PR, 병합 그룹을 포함하여 빌드와 동일한 코드 변경 및 초안 선택 규칙을 따릅니다. DAST 작업이 없거나, 실패하거나, 취소되거나, 예상과 달리 건너뛰어지면 `Gate / CI`를 차단합니다. 재사용 워크플로에는 독립적인 PR 또는 수동 실행 트리거가 없습니다. 수동 검증은 CI의 수동 실행을 사용하여 빌드와 소비 작업을 같은 실행 안에 유지합니다.

`scripts/ci/next-build-provenance.mjs`는 전체 Next 아티팩트를 tar 다이제스트, 저장소/이벤트/실행, 생산 작업의 시도, head/base/checkout/tree, 워크플로 식별 정보, 잠금 파일, 정확한 Node 버전/ABI, 플랫폼 및 번들러와 함께 봉인합니다. DAST는 `needs.build.outputs`에서 변경 불가능한 아티팩트 ID를 선택하고, 다운로드 다이제스트 검증을 요구합니다. 또한 ZIP의 해시를 독립적으로 계산하여 생산자 다이제스트와 비교한 뒤, `scripts/ci/unpack-ci-build.py`를 통해 허용 목록의 두 구성원을 추출합니다. Next 트리를 추출하기 전에 매니페스트와 tar 아카이브도 독립적인 생산자 출력과 일치해야 합니다. 브랜치의 가장 최근 성공 빌드를 검색하지 않습니다. 부분 재실행은 ID와 모든 입력이 여전히 일치할 때만 동일한 생산 시도를 재사용할 수 있으며, 증빙에는 두 시도를 모두 기록합니다.

소비 작업은 계속 호스팅되는 Linux 러너에서 실행되며, 저장소 읽기 전용 권한만 갖고 저장소 비밀 정보는 갖지 않습니다. 생산자가 사용한 정확한 Node 버전을 설치한 뒤 `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`로 CLI를 조립합니다. `scripts/build/standaloneInput.mjs`는 대체 빌드 전에 독립 실행 서버가 없는 입력을 거부합니다. 일반 로컬 CLI 빌드는 기존 대체 빌드 동작을 유지합니다. 서버 준비 확인, Schemathesis 및 promptfoo는 변경되지 않은 25분 작업 제한 안에 모두 성공해야 합니다. 출처 증빙은 입력의 신원과 바이트를 증명할 뿐, DAST 스캔의 성공을 증명하지 않습니다. 아티팩트 만료, 러너 중단, 스캐너 실패는 여전히 불완전하거나 실패한 증거입니다. 권고 수준의 래퍼를 통해 PASS로 바꿀 수 없습니다.

### UI 실행 용량

CI는 전체 UI 인벤토리를 네 개의 `test-vitest` 매트릭스 샤드로 실행합니다. 각 샤드는
최대 두 개의 워커를 사용하며 기존 15분 작업 제한 시간이 적용됩니다. 첫 번째 샤드는
MCP/autoCombo Vitest 제품군도 실행합니다. 필수 작업 결과는 모든 매트릭스 실행 단위를
포괄합니다. 하나의 샤드라도 실패하거나 취소되면 후보 승인을 입증할 수 없습니다.

야간 옵저버는 MCP 실행을 첫 번째 영수증에 포함하여 각 UI 샤드에 대해 별도의
정확한 후보 영수증을 보존합니다. 네 개의 영수증과 로그, 그리고 일치하는 실행 ID가
모두 필요합니다. 로컬 `npm run test:vitest:ui`는 여전히 전체 제품군을 선택합니다.
단 한 번의 `--shard` 실행은 부분적인 증거일 뿐입니다.

### 단위 테스트 커버리지 수집

12개의 단위 테스트 샤드는 기존 테스트 실행 중에 V8 커버리지를 수집합니다. 성공한
샤드는 중간 Istanbul 보고서를 생성하지 않고 원본 파일을 압축하기 위해
`scripts/ci/compact-v8-coverage.mjs`를 실행합니다. 최종 Coverage 작업은 후보 SHA,
런타임, 소스 루트 및 데이터 해시를 기준으로 12개 매니페스트를 모두 검증한 다음,
c8의 리포터와 기존 커버리지 임계값을 실행합니다. 입력은 c8의 전역 파일 이름 순서를
유지합니다. 함수/블록 커버리지가 혼재한 경우 샤드별 사전 병합은 안전하지 않습니다.
누락되거나 잘못된 형식이거나 호환되지 않는 샤드는 승인을 실패시킵니다.
실패한 테스트 샤드의 원시 진단 커버리지는 별도로 보존되며 최종 병합에 포함될 수 없습니다.

### 유닛 실행 진행 상황 영수증

공유 `test:unit:ci:shard` 명령은 `scripts/ci/unit-progress-reporter.mjs`를 통해 `primary`, `dashboard`, `serial`
단계를 기록합니다. 일반 테스트 보고서는 계속
사용할 수 있습니다. 별도의 메타데이터 전용 영수증은 각 파일의 시작과 완료를 기록하며,
30초 간격의 하트비트에는 아직 활성 상태인 파일과 해당 파일의 경과 시간이 나열됩니다. 허용 목록에 포함된
실행 메타데이터만 기록하며, 테스트 설명, 출력, 오류 본문 및 전체
환경은 직렬화하지 않습니다.

CI는 JSONL 파일을 `unit-progress-ci-<run>-<attempt>-<shard>`로 보관합니다. 작업 시간 초과로 인해 이후 업로드가 수행되지 않을 수 있지만,
이미 전송된 하트비트는 진단 증거로 남습니다. 하트비트가 누락된 경우
러너 프로세스가 차단되었거나 종료되었음을 나타낼 수도 있습니다. 이러한 영수증은 기존 테스트 선택,
동시성, 기한 및 종료 상태를 그대로 유지하며, 후보 승인 여부에 대한 판정은 아닙니다.

### 정적 스캔 인벤토리

버전이 지정된 npm 별칭 인벤토리와 정적 스캔 멤버십은
`config/quality/gate-manifest.json`에 있습니다. `package.json`을 기준으로 스크립트 이름과
정확한 명령을 검증하려면 `npm run check:gate-manifest`를 실행하십시오. 추가, 제거 및
명령 드리프트는 로컬 훅과 CI의 변경 분류 작업을 모두 실패시킵니다.
별칭은 워크플로 작업, 매트릭스 인스턴스 또는 테스트 케이스가 아닙니다. 이러한 개수를
서로 대체 가능한 것처럼 제시해서는 안 됩니다.

선택된 별칭을 실행하지 않고 검사하려면 `npm run quality:scan -- --list` 또는
`npm run quality:scan:fast -- --list`를 사용하십시오. 러너는 npm 진입점을 호출하므로
구성된 경우 Bun을 포함한 해당 런타임이 유지됩니다. 매니페스트는 이러한 프로필 외부의
별칭을 별도 호출 항목으로 기록하며, 읽기 전용 스캔 프로필에서는 유지보수 명령이 금지됩니다.

이러한 프로필은 정적 스캔만 다룹니다. 제품 테스트, 커버리지, 패키징, 외부 검사 또는
후보의 전체 릴리스 승인을 인증하지 않습니다. 워크플로 승인은 연결된
`config/quality/admission-policy.json` 및 `scripts/quality/admission-verdict.mjs`를
사용합니다. 릴리스 옵저버 프로필은 별도로 유지됩니다. 적용 가능한 검사와 영수증을
독립적으로 확인하십시오. 전체 옵저버의 정적 명령은 `audit:deps`, 변이 테스트 선택 및
번역 검사를 포함하여 `config/quality/release-green-static-profile.json`에 선언됩니다.
로더는 package.json과 모델링된 CI/Quality 선언을 기준으로 npm 명령을 검증합니다.
셸 토큰을 인수로 실행하는 대신 드리프트를 거부합니다. 필수 스캐너의 SKIP/INCOMPLETE
출력은 PASS를 입증할 수 없습니다. 이 프로필은 외부 제외 항목을 기록하며 호스팅된
커버리지, 테스트 매트릭스, 패키지 또는 배포 증거를 대체하지 않습니다. 아래의 설명형
인벤토리는 참고 자료일 뿐, 게이트가 실제로 실행되었다는 증거가 아닙니다.

스크립트는 `scripts/check/`(정책 게이트) 및 `scripts/quality/`(래칫 엔진) 아래에 있습니다.
CI의 단일 진실 공급원은 `.github/workflows/ci.yml`입니다.

### 게시된 문서 상태

`.github/workflows/i18n-base-health.yml` `main` 및 `release/v*` 에 대한 선택된 푸시 이후와 수동 디스패치 시 문서 상태를 관찰합니다. 필터에는 문서, 루트 Markdown, `llm.txt`, 번역 state/configuration 및 관련 i18n 도구가 포함됩니다. 단일 `Published base documentation health` 작업에서는 호스팅된 Ubuntu와 5분 기한을 사용합니다. 읽기 전용 유효성 검사를 수행하고 종속성 설치, 변환 또는 상태 채택 없이 진단 영수증을 작성합니다.

`scripts/i18n/check-base-health.mjs` 소스 해시, 누락된 대상, 대상 해시, 오래된 번역 및 섹션 캐시 불일치가 필요하지 않습니다. 또한 현재 핵심 document/locale 범위와 기록된 출처를 검증합니다. 잘못된 컨텍스트, 불완전한 적용 범위 또는 중단된 검사기로 인해 `INCOMPLETE` 생성됩니다. 확인된 드리프트는 `FAIL` 생성합니다. 둘 다 실패한 종료 상태를 반환합니다. 영수증은 SHA 결제, 작업 흐름, 실행 및 시도에 바인딩되며 `i18n-base-health-<sha>-<run>-<attempt>` 로 유지됩니다.

이는 발표된 자료에 대한 독립적인 관찰입니다. PR 또는 병합 그룹 이벤트, 필수 PR 검사, npm 별칭 또는 정적 스캔 프로필 구성원을 추가하지 않습니다. 또한 기본 검사기는 절대 모드에서 5개 클래스를 모두 차단합니다. 일반적인 PR 준비는 입학과 별도로 진행됩니다. 성공적인 업로드는 실패한 건강 결과를 PASS 로 바꿀 수 없습니다.

일반 PR `--baseline-evidence` 에서 생성된 기본 보고서와 함께 `--preflight` 사용합니다. 완전한 번역 기록과 실제 대상 바이트가 정확한 베이스에서 변경되지 않은 경우에만 영어 소스를 보류 상태로 둘 수 있습니다. 새로운 대상 또는 섹션 캐시 불일치가 여전히 차단되고 불완전한 증거가 준비를 승인할 수 없습니다. 보고서는 `preparationPending` 와 `mergeReady` 별도로 표시합니다. 성공적인 준비로 인해 보류 중인 번역을 병합할 준비가 되지는 않습니다. 승인 전에 구성된 후보에서 영향을 받은 미러를 새로 고칩니다. 신뢰할 수 있는 Mergify 큐 후보인 `merge_group`, 분기 푸시 및 수동 CI 실행은 `--warn` 또는 상속된 실패 용서 없이 절대 검사기를 사용합니다. 누락된 대상 해시와 삭제된 기록된 코어 파일로 인해 범위가 축소되면 성공적인 절대 판정을 생성할 수 없습니다.

### PR 빠른 경로(`quality.yml`) 출시

`.github/workflows/quality.yml` main/release PRs 에서 CI 보완하고 `main` 에 푸시하고 그룹을 파견 및 병합합니다. PRs 경로 필터링된 빠른 검사를 사용합니다. 영구적으로 비활성화된 중복 빌드가 제거되었습니다. 실제 build/package/boot 검사는 CI 에 남아 있습니다.

| 직업                                             | 범위                                                                                                                                                 | 블로킹        |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API 문서 참조 및 문서 전체                                                                                                            | 예            |
| `Fast Quality Gates`                             | 코드 PRs; 정적 검사, 유형 검사, 대시보드 유형 검사, 영향을 받는 단위 테스트                                                                          | 예            |
| `Forgotten sibling tests`                        | 코드 PRs; 정적 소비자 및 후보 형제 테스트를 추적하는 변경된 모듈 배럴 및 동적 가져오기 경로는 참조된 허용 목록 예외와 함께 권고 진단으로 보고됩니다. | **자문**      |
| `No new ESLint warnings`                         | 코드 PRs; 억제 인식 린트 가드                                                                                                                        | 예, 포크 포함 |
| `Merge integrity (changelog + generated skills)` | 비초안 PRs; 변경 로그 및 생성된 스킬 동기화                                                                                                          | 예, 포크 포함 |

#### 잊혀진 형제자매 테스트 보고서

`npm run check:forgotten-sibling-tests` 테스트-영향 맵 뒤에 가져오기 확인자를 재사용합니다. 변경된 모든 생산 모듈에 대해 풀 요청 차이에 후보 테스트가 없을 때 결정적 `changed module/symbol -> static consumer -> candidate sibling test` 체인을 보고합니다. 마크다운 요약 및 JSON 결과는 차단 롤아웃 전에 보정을 위한 `forgotten-sibling-tests` 워크플로 아티팩트로 유지됩니다.

배럴 재내보내기 및 동적 수입은 해상도 진단일 뿐입니다. 차단 결과를 생성하지 않습니다. 검토된 예외 사항은 `config/quality/forgotten-sibling-allowlist.json` 에 게시되어 있습니다. 각 항목은 소비자 및 후보 테스트의 이름을 지정하고, 구체적인 근거를 제시하고, GitHub 문제 또는 끌어오기 요청을 연결해야 합니다. 잘못된 항목이 실패하면 닫힙니다. 예외는 삭제된 후보 테스트 또는 `.skip`/`.todo` 추가하는 diff를 억제할 수 없습니다. 어설션 약화 및 기타 마스킹은 독립적으로 차단하는 `check:test-masking` 게이트의 소유로 유지됩니다.

### 작업: `lint`

`main`을 대상으로 하는 모든 PR에서 실행됩니다. 실패 시 병합을 차단합니다.

| 스크립트 (`npm run ...`)          | 검증 항목                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 차단 여부                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| `check:node-runtime`              | Node.js 버전이 지원 범위 내에 있는지                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 예                                   |
| `check:cycles`                    | `src/` + `open-sse/` 전체의 순환 import(AST 기반, tsconfig `paths` 해석). 기본 실행은 순환이 하나라도 존재하면 항상 종료 코드 1을 반환하고(#15281부터 실패 시 차단) SCC 목록을 표시합니다. CI에서 실행하는 `check:cycles:ratchet`은 개수가 `quality-baseline.json`의 `metrics.cycles` 상한을 초과하면 차단합니다. 현재 값은 14이고 `direction: down`이므로 감소만 가능합니다(#15159 G-01/G-02).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 예(래칫)                             |
| `check:boundary`                  | `open-sse → src` 결합도: 엔진에서 앱으로 이어지는 고유한 파일 간 import(`scripts/quality/measure-boundary.mjs`; 엣지 목록은 v4 코어/모듈 분리 개선 백로그). 기본 실행 = 권고용 보고서(`quality:boundary`와 동일). CI에서 실행하며 `quality.yml`의 빠른 게이트 래칫 루프에도 포함되는 `check:boundary:ratchet`은 개수가 `quality-baseline.json`의 `metrics.boundaryOpenSseToSrc` 상한을 초과하면 차단합니다. 상한은 측정값인 771로 초기 설정되었고 `direction: down`이며, `--update`는 상한을 낮추기만 합니다. PR에서는 기준 브랜치 상대 방식(`--base-ref`, 아래 참조)입니다.                                                                                                                                                                                                                                                                                                                                                                           | 예(래칫)                             |
| `check:route-validation:t06`      | 모든 라우트에 Zod 스키마가 존재하는지(Tier 6 정책)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 예                                   |
| `check:any-budget:t11`            | `@ts-expect-error // any` 개수가 예산을 초과하지 않음(Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 예                                   |
| `check:provider-consistency`      | `providers.ts`의 모든 제공자에 `providerRegistry.ts`의 일치하는 항목이 있으며, 그 반대도 동일함(허용 목록 범위 내)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 예                                   |
| `check:model-lifecycle`           | 수동으로 유지 관리되는 세 개의 라우팅 테이블이 체크인된 수명 주기 스냅샷(#11503)과 일관성을 유지함: `FITNESS_TABLE` (`taskFitness.ts`)은 `REGISTRY`가 라우팅할 수 있는 폐기된 ID에 점수를 부여하지 않음. 모든 `BUILT_IN_ALIASES` 대상은 `REGISTRY`에 존재하며 폐기된 ID 스냅샷에는 없음. `REGISTRY`에 여전히 남아 있는 모든 폐기된 ID는 전달되거나 `allowedRetiredInCatalog`에 나열됨. 또한 `DEFAULT_DEGRADATION_MAP`의 소스나 대상 중 해당 스냅샷에서 폐기된 것으로 표시된 것은 없음. 이는 모델이 현재 실제 업스트림에서 제공되고 있음을 입증하지는 않음. 오프라인 — `config/quality/model-lifecycle.json`과 비교하며, `npm run quality:refresh-model-lifecycle`을 사용해 수동으로 갱신함(네트워크 필요, CI에 연결되지 않음). `allowedRetiredInCatalog`는 점진적으로 줄여 나가는 래칫임. 추적 이슈가 있는 경우에만 항목을 추가할 것.                                                                                                                  | 예                                   |
| `check:fetch-targets`             | 클라이언트 측 `src/`의 모든 `fetch("/api/...")`가 실제 `route.ts`로 해석됨                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 예                                   |
| `check:deps`                      | 저장소 내 모든 `package.json`에서 `npm install`로 설치 가능한 모든 종속성이 `dependency-allowlist.json`에 포함됨. 새로 추가된 버전이 고정되지 않은 패키지 또는 슬롭스쿼팅된 패키지는 플래그로 표시됨                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 예                                   |
| `audit:deps`                      | 독립적인 잠금 파일 5개(루트, Electron, OpenCode plugins v1/v2 및 provider)에 대한 npm 감사. 심각도 Critical 권고는 차단하며, 심각도 High 권고는 눈에 띄는 경고로 유지됨. 누락되거나 실패한 감사는 INCOMPLETE로 처리되어 차단되며, 범위별 잠금 해시와 보고서는 보존됨.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 예                                   |
| `check:lockfile`                  | `package-lock.json` 무결성 — https 레지스트리, 무결성 해시, 호스트 재정의 없음                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 예                                   |
| `check:licenses`                  | 프로덕션 종속성을 위한 SPDX 라이선스 허용 목록                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 예                                   |
| `check:tracked-artifacts`         | 빌드 아티팩트 및 커밋된 `node_modules` 심볼릭 링크 없음(husky pre-commit에서도 실행됨; pre-push는 의도적으로 가볍게 유지 — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 예                                   |
| `check:ai-attribution`            | PR 커밋, 제목 또는 본문에 AI/봇 `Co-Authored-By` 트레일러나 AI 생성 푸터 없음 — 엄격한 규칙 #16(`release/**`로 향하는 PR에 대한 `quality.yml`의 빠른 게이트 루프에서 이벤트 페이로드를 읽으며, PR이 아닌 경우 아무 작업도 하지 않음. 또한 `main`으로 향하는 PR에 대한 `ci.yml` 린트의 PR 전용 단계 및 husky `commit-msg` 훅에서도 실행됨. 사람 공동 작성자는 허용됨. #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:vitest-exclusions`         | 모든 Vitest 제외 항목은 추적 이슈를 명시하고 `config/quality/vitest-exclusions.json`에 포함되어야 함(#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 예                                   |
| `check:file-size`                 | 소스 파일(`src/`, `open-sse/`, `electron/`, `bin/`의 `.ts`/`.tsx`)은 `cap` 이내로, 테스트 파일(`*.test.ts(x)`)은 `testCap` 이내로 유지해야 하며, `file-size-baseline.json`에서 동결된 파일(`frozen` / `testFrozen`)은 기록된 크기를 초과하여 커지면 안 됨                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 예                                   |
| `check:error-helper`              | 실행기/핸들러의 오류 응답은 `buildErrorBody()` / `sanitizeErrorMessage()`를 사용함(Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 예                                   |
| `check:migration-numbering`       | 마이그레이션 SQL 파일은 누락되거나 중복된 번호 없이 순차적으로 번호가 지정됨                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 예                                   |
| `check:public-creds`              | `publicCreds.ts` 외부에 리터럴 OAuth `client_id`/`client_secret` 또는 Firebase Web 키가 없음(Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 예                                   |
| `check:db-rules`                  | `src/lib/db/` 모듈 외부에 원시 SQL이 없으며, `localDb.ts`에서 배럴 가져오기를 사용하지 않음(Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 예                                   |
| `check:known-symbols`             | 디스패치 테이블에 등록된 제공자 실행기, 라우팅 전략 및 변환기가 디스크의 파일과 일치하며, 고립되거나 선언되지 않은 심벌이 없음                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 예                                   |
| `check:route-guard-membership`    | 자식 프로세스를 생성하는 모든 라우트가 `isLocalOnlyPath()`로 분류됨(Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 예                                   |
| `check:test-discovery`            | 저장소의 모든 `*.test.ts` / `*.spec.ts` 파일이 하나 이상의 테스트 러너에 의해 수집됨(래칫: `test-discovery-baseline.json`의 고아 목록은 줄어들기만 할 수 있음)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 예                                   |
| `check:test-tla-order`            | `tests/unit` 아래의 어떤 `node:test` 파일도 테스트를 등록한 후 최상위 `await`를 실행하고 다시 테스트를 등록하지 않음(#18045; 래칫: `test-tla-order-allowlist.json`은 줄어들기만 할 수 있음)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 예                                   |
| `check:agent-skills-sync`         | 생성된 agent-skills 아티팩트가 소스 카탈로그와 일치함(드리프트 없음)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | 제공자 로고/애셋에 기록된 출처 항목이 있음                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | JSON 구성 파일이 구문 분석에 성공하고 저장소 린트 규칙을 충족함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | 오류 없는 TypeScript 컴파일(권고 경고만 있음)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 예                                   |
| `typecheck:noimplicit:core`       | 엄격한 `noImplicitAny` — 미래 지향적이며, 기존의 많은 호출 지점에는 여전히 타입 주석이 필요함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **권고** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**`로 범위가 지정된 `tsc` (#7033) — `typecheck:core`의 엄선된 27개 파일 허용 목록에는 대시보드 TSX가 전혀 포함되지 않으며, `next build` 역시 이를 타입 검사하지 않으므로(`next.config.mjs`에서 `ignoreBuildErrors: true` 설정), 해당 영역의 고립된 식별자 회귀(#6625/#6909)가 CI에서 감지되지 않았습니다. 고정된 파일별/TS 코드별 개수 기준선(`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols`와 동일한 오래된 기준선 강제 적용 패턴)과 비교합니다. 기준선 개수를 초과하는 새로운 오류만 게이트를 실패시키며, 기존 오류가 수정되면 `--update`로 기준선을 낮춥니다.                                                                                                                                                                                                                                                                                                                                       | 예                                   |
| `check:build-typecheck`           | `tsconfig.build.json`을 기준으로 전체 애플리케이션의 프로덕션 타입 검사 수행 (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) — `typecheck:core`의 27개 파일 허용 목록과 대시보드 게이트가 다루지 않는 범위임. `config/quality/build-typecheck-baseline.json`과 차이를 비교하며, 파일 및 코드별 개수가 새로 증가하거나 높아지면 실패하고, 개수가 줄어들면 기준을 낮추라는 메시지를 표시함. 실행 결과에 새로 발생했거나 증가한 쌍이 포함되어 있으면 `--force-regressions`를 전달하지 않는 한 `--update`가 거부되며, 새로 진단이 억제된 파일도 `--force-nocheck`를 전달하지 않는 한 거부됨. 따라서 기준을 넓혀 통과시키는 것과 영구적으로 검사를 묵인하는 것은 별도의 의도적인 작업임. 단독 `--force`는 거부됨. 또한 `@ts-nocheck`를 사용하는 파일은 진단을 전혀 보고하지 않으므로 다른 모든 게이트에서 보이지 않게 될 수 있기 때문에, `config/quality/ts-nocheck-baseline.json`을 기준으로 빌드 범위에서 `@ts-nocheck`도 검사함. | 예                                   |

#### 두 타입 검사 프로그램은 서로 다른 방식으로 답함

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`)와 `check:build-typecheck`는 서로 다른 옵션으로 서로 다른
프로그램을 컴파일하므로, 동일한 파일이 한쪽에서는 깨끗하고 다른 쪽에서는
오류로 가득할 수 있음.

`tsconfig.build.json`은 `"strict": false`로 설정되어 있으므로 `noImplicitAny`가
비활성화됨. 코어 구성은 더 엄격한 옵션을 사용하여 선별된 27개 파일 허용 목록을
컴파일하고 각 항목의 import 그래프를 따라가므로, 빌드 프로그램에 전혀 나타나지
않는 파일도 여기에서는 검사됨.

파일이 타입 검사를 통과했는지 판단할 때 이 결과가 중요함: **`check:build-typecheck`에서
진단이 0개라고 해서 0개인 것은 아님**. 26개 파일에서 `@ts-nocheck`를 제거한 결과,
빌드 프로그램에서는 23개가 깨끗했지만, 그중 16개에서는 엄격한 프로그램에서 약
120개의 암시적 any 오류가 나타남. 파일이 깨끗하다고 판단하기 전에 두 검사 모두
확인할 것.

### 작업: `quality-gate`

`test-coverage` 이후에 실행됨. 실패하면 병합을 차단함.

| 스크립트                     | 검증 항목                                                                                                                                      | 차단 여부            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `quality:collect`            | `quality-metrics.json`을 생성합니다(ESLint 경고 개수, 병합된 샤드 보고서의 커버리지).                                                          | 예(래칫의 선행 단계) |
| `quality:ratchet`            | `quality-baseline.json`의 각 메트릭이 회귀하지 않았는지 확인합니다(ESLint 경고 ≤ 기준선, 커버리지 ≥ 기준선).                                   | 예                   |
| `check:duplication`          | 코드 중복(jscpd@4)이 `quality-baseline.json`의 기준선을 초과하지 않는지 확인합니다.                                                            | 예                   |
| `check:complexity`           | 파일 수준 순환 복잡도가 상한을 초과하지 않는지 확인합니다(코어 ESLint `complexity` + `max-lines-per-function`).                                | 예                   |
| `check:cognitive-complexity` | 인지 복잡도 래칫(`eslint-plugin-sonarjs`) — 별도의 ESLint 패스이며, CI에서는 둘을 단일 `check:complexity-ratchets` 단계로 병합하여 실행합니다. | 예                   |
| `check:dead-code`            | 사용되지 않는 내보내기/파일 래칫(knip)이 기준선 대비 회귀하지 않는지 확인합니다.                                                               | 예                   |
| `check:compression-budget`   | 압축 벤치마크 예산 — 엔진별 토큰 절감 하한이 회귀하지 않아야 합니다.                                                                           | 예                   |
| `check:type-coverage`        | 타입 지정 비율 래칫(`type-coverage`)이 회귀하지 않는지 확인하며, `typecheck:noimplicit:core`를 대부분 포괄합니다.                              | 예                   |

### 작업: `codeql-scan` 및 `codeql-admission`

`codeql-scan`은 구성된 모든 분석 범주를 생성합니다. 해당 작업이 성공하면 `codeql-admission`이 정확히 그 업로드와 후보의 경고 래칫을 검증합니다. 문서만 변경하는 후보를 포함해 두 작업 모두 `Gate / CI`의 필수 의존성입니다. 관리 활성화와 카나리 검증 요건은 아래의 “CodeQL 래칫”에 설명되어 있습니다.

| 스크립트               | 검증 대상                                                                                                                                                                      | 차단 여부 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `check:codeql-ratchet` | 경고 래칫을 평가하기 전에 후보의 ref/SHA와 구성된 모든 분석 범주가 최신이어야 합니다. 증거가 없으면 차단합니다. 전역 목록은 별도로 유지됩니다. 아래 “CodeQL 래칫”을 참고하세요 | 예        |

### 작업: `quality-extended`

이 작업은 해당하는 후보를 차단합니다. 번들 크기, 비밀 정보 탐지 결과, 취약점
탐지 결과, 워크플로 탐지 결과 및 OpenAPI 변경 사항은 필수 래칫으로 검사됩니다.
순환 종속성 진단은 계속 권고 사항으로 유지됩니다. 스캐너 설치는 필수입니다.
`scripts/ci/install-quality-scanners.sh`는 고정된 버전을 프로비저닝하고 설치
실패를 전파합니다. 도구 누락, 유효하지 않은 보고서 또는 기준선 누락이 있으면
필수 스캐너 게이트는 미완료(INCOMPLETE) 상태로 남습니다.

| 스크립트                 | 검증 항목                                                                                                                                                                     | 차단 여부                              |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `check:circular-deps`    | 순환 종속성 없음(dpdm)                                                                                                                                                        | **권고**                               |
| `check:bundle-size`      | 번들 크기가 상한을 초과하지 않음. 측정할 수 없는 경우 실패                                                                                                                    | **--ratchet 사용 시 차단**             |
| `check:secrets`          | Gitleaks 탐지 결과가 악화되지 않음. 필수 스캔에서는 도구/소스/기준선 누락, 스캔 실패 및 유효하지 않은 보고서를 거부                                                           | **--ratchet 사용 시 차단**             |
| `check:vuln-ratchet`     | 종속성 취약점이 악화되지 않음. 필수 스캔에서는 도구 누락, 유효하지 않은 보고서 또는 기준선 누락을 거부                                                                        | **--ratchet 사용 시 차단**             |
| `check:workflows`        | 워크플로 린트(actionlint + zizmor). 스캐너 누락/고장, 유효하지 않은 보고서 또는 래칫 기준선 누락 시 INCOMPLETE로 실패. 유효한 탐지 결과에는 선택한 엄격/권고/래칫 정책을 적용 | 실행 필수. CI에서는 zizmor 래칫이 차단 |
| `check:openapi-breaking` | 고정된 이벤트 커밋(PR 병합 기준점, 푸시 이전 커밋, 병합 그룹 기준점, 예약/수동 실행 시 체크아웃의 첫 번째 부모)을 기준으로 공개 API 계약을 검사. 필수 측정 실패 시 차단       | **--ratchet 사용 시 차단**             |

### 직업: `docs-sync-strict`

`main` 또는 `release/**` 에 대한 풀 요청의 경우 이 작업은 문서 또는 코드 변경으로 분류된 초안이 아닌(또는 신뢰할 수 있는 대기열) 후보에 대해서만 실행됩니다. PR이 아닌 CI 이벤트에서도 실행됩니다. 이 워크플로의 푸시 트리거는 `main` 가 아닌 `release/**` 에만 적용됩니다. 0이 아닌 값으로 종료하는 단계는 작업을 차단합니다. 아래의 보고 전용 조사 결과 및 문서화된 예외 사항은 그렇지 않습니다.

| 스크립트                       | 검증 항목                                                                                                                                                                                                                                                                                                                                                                                             | 차단 여부                                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | 아래 7개 하위 게이트를 순차적으로 실행하는 메타 게이트                                                                                                                                                                                                                                                                                                                                                | 예                                                                                                                    |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG 버전 일관성, 정확한 `llm.txt` 미러, 번역된 CHANGELOG section/size 불변성 및 대체된 중복 문서의 부재                                                                                                                                                                                                                                                                         | 예                                                                                                                    |
| ↳ `check:docs-frontmatter`     | 편집된 문서 페이지에는 유효한 머리말 제목이 있습니다.                                                                                                                                                                                                                                                                                                                                                 | 예                                                                                                                    |
| ↳ `check:docs-counts`          | 신뢰도가 높은 개수 불변은 엄격합니다. 경험적 파일 수 검사는 스크립트가 `--strict` 수신하지 않는 한 경고만 합니다( CI 메타 게이트는 이를 통과하지 않습니다).                                                                                                                                                                                                                                           | 엄격한 계층 차단; 소프트 계층 권고                                                                                    |
| ↳ `check:env-doc-sync`         | 소스 환경 읽기, `.env.example` 및 `docs/reference/ENVIRONMENT.md` 명시적인 무시, 문서 전용 및 환경 전용 허용 목록 이후에 동의합니다.                                                                                                                                                                                                                                                                  | 예, 문서화된 허용 목록 외부                                                                                           |
| ↳ `check:deprecated-versions`  | 무시된 문서를 제외하고 안전한 기록 컨텍스트 및 오래된 업데이트 날짜를 벗어난 잠재적인 오래된 버전을 보고합니다.                                                                                                                                                                                                                                                                                       | 현재 CI 배선에 대한 주의 사항(`--strict` 는 통과되지 않음)                                                            |
| ↳ `check:doc-links`            | 문서의 내부 마크다운 링크는 실제 파일(`[text]`/`(path)` 형식)로 해석됩니다.                                                                                                                                                                                                                                                                                                                           | 예                                                                                                                    |
| ↳ `check:fabricated-docs`      | 문서에 인용된 경로, 환경 변수, CLI 명령, 후크 이름 및 파일 경로가 코드베이스에 존재합니다. `--strict` 통한 하드 게이트; 플래그가 없는 소프트 페일.                                                                                                                                                                                                                                                    | 예( CI 의 `--strict` 통해)                                                                                            |
| `check:cli-i18n`               | CLI에서 사용하는 `t()` 키가 `en`에 존재함; `pt-BR`은 모든 최상위 섹션을 유지함; `zh-CN`과 `zh-TW`는 `en`의 모든 키를 포함함                                                                                                                                                                                                                                                                           | 예                                                                                                                    |
| `check:openapi-coverage`       | OpenAPI 명세가 실제 라우트 중 래칫으로 설정된 최소 비율 이상을 포함                                                                                                                                                                                                                                                                                                                                   | 예                                                                                                                    |
| `check:openapi-security-tiers` | 선언된 `x-loopback-only`/`x-always-protected` 주석은 `routeGuard.ts`의 규칙으로 뒷받침되어야 하며, 파서 오류와 정방향 불일치는 차단함. 로컬 전용 접두사 아래에서 누락된 `x-loopback-only`를 찾는 역방향 검사는 경고하며, 패턴으로만 정의된 라우트는 이 역방향 검사에서 제외됨.                                                                                                                        | 파서/정방향 검사는 차단; 역방향 검사는 권고                                                                           |
| `check:openapi-routes`         | 근거가 명시된 `KNOWN_STALE_SPEC` 허용 목록을 적용한 뒤, `openapi.yaml`의 각 `/api...` 경로가 매개변수 차이와 무관하게 실제 라우트와 일치함; 오래되어 더 이상 유효하지 않은 허용 목록 항목도 실패를 유발함                                                                                                                                                                                             | 예                                                                                                                    |
| `check:docs-symbols`           | 미러가 아닌 정본 문서의 내부 `/api/...` URL 참조가 실제 라우트 또는 라우트 계열과 일치함; 프록시/업스트림/자리표시자/파일 참조와 근거가 명시된 `KNOWN_STALE_DOC_REFS` 항목은 제외하며, 오래되어 더 이상 유효하지 않은 허용 목록 항목은 실패를 유발함                                                                                                                                                  | 예                                                                                                                    |
| `i18n translation drift`       | 절대 허용에는 소스 없음, 대상 누락, 대상 해시, 오래된 번역 및 섹션 캐시 불일치가 필요합니다. 일반적인 PR 준비에서는 상속된 정확한 증거 또는 변경되지 않은 전체 상태 및 대상 바이트를 포함하는 영어로만 보류 중인 변경 사항을 유지할 수 있습니다. 보고서에서는 병합 준비 상태를 별도로 선언합니다. 대상 해시가 누락되고 기본 증거 블록이 불완전합니다. 레거시 섹션 캐시가 없다는 것은 실패가 아닙니다. | 5개 클래스 모두 queue/base 입학을 차단합니다. 일반 준비는 입증된 상속 작업 또는 영어로만 진행 중인 작업만 허용합니다. |

`docs/diagrams/` 아래에 12개의 README SVGs 생성됩니다(`scripts/docs/gen-readme-<name>.mjs`, `npm run docs:readme-diagrams` 모두 재생성합니다). 각각에는 커밋된 파일이 오래되었을 때 실패하는 바이트 비교 단위 테스트(`tests/unit/docs/readme-*-svg.test.ts`, 작업 `test-unit`)가 있으며 `check:docs-counts` `<text>` 노드 — 에서 정식 번호를 읽습니다. 이는 개요 단계에서 파일의 모든 윤곽선 문자열을 보이지 않는 `<text>` 로 유지하는 이유입니다. SVG 표준 번호 검사는 `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`)에 나열된 파일( `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg` 및 `tier-flow-light.svg` 을 읽습니다. 영원히 무료, 카탈로그 항목, 반복 풀 및 득점 요인 주장도 `promise-pillars.svg`, `free-tier-budget.svg` 및 `strategies-grid.svg` 로 읽습니다. `free-tier-budget.svg` 라이브 카탈로그 로더에서 수치를 가져오므로 `FREE_MODEL_BUDGETS` 또는 공급자 표시 이름을 변경하면 해당 파일이 재생성될 때까지 CI 빨간색으로 표시됩니다.

### 작업: `i18n-ui-coverage`

| 스크립트                          | 검증 항목                                                                                                                                                                      | 차단 여부 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `check-ui-keys-coverage` (인라인) | UI i18n 키 커버리지가 ≥ 65%인지                                                                                                                                                | 예        |
| `check-ui-value-drift` (인라인)   | 재작성된 영어 **값**으로 인해 오래된 번역이 남지 않는지                                                                                                                        | 예        |
| `check-new-key-coverage` (인라인) | **새로운** 영어 키가 모든 로케일에서 번역되었는지 — `__MISSING__:` 마커는 거부됨                                                                                               | 예        |
| `check-translation-ratio`         | 로케일별 실제 번역 비율(허용 목록에 포함되지 않은 영어와 동일한 값 / 자리표시자 / 누락된 리프)이 `config/quality/i18n-translation-baseline.json` + 여유분을 초과하지 않아야 함 | **차단**  |

`fetch-depth: 0`이 필요합니다. 값 드리프트 게이트가 병합 베이스를 기준으로 `en.json`의 차이를 비교하기 때문입니다.

#### `check-ui-value-drift` — 오래된 번역 게이트

다른 게이트가 구조적으로 감지할 수 없는 i18n 회귀를 포착합니다. 영어 값이
재작성되었지만 _이전_ 영어에서 파생된 번역이 그대로 남아, 비영어권 사용자가
확신에 찬 어조의 잘못된 문구를 계속 읽게 되는 경우입니다.

실제로 배포된 사례가 있습니다. Antigravity 로그인 도우미가 도입되었을 때(#5203)
`oauthModal.googleOAuthWarning`이 재작성되었지만, **43개 로케일 중 39개**에는 운영자에게
"전체 URL을 복사하여 아래에 붙여넣으라"고 안내하는 문구가 그대로 남았습니다. 해당
공급자에서는 완료할 수 없는 흐름입니다. 다음 이유로 #8463까지 발견되지 않았습니다.

- `sync-ui-keys`는 **누락된** 키만 백필하며, **오래된** 키는 절대 백필하지 않습니다.
- `check-ui-keys-coverage`는 키의 _존재 여부_를 세므로 오래된 번역도 커버된 것으로 계산됩니다.
- `check-translation-drift`는 `docs/i18n/<locale>/**.md` 문서 미러를 추적하며,
  `src/i18n/messages/*.json`은 전혀 읽지 않습니다. 2026-09 재동기화 이후 `docs-sync-strict`
  작업에서 차단됩니다. 핵심 문서 편집 → `npm run i18n:run -- --files=<doc>`(섹션 단위로 실행되어 비용이 적음).

**차이 인식 방식이며 기준선 기반이 아닙니다.** 병합 베이스의 `en.json`을 작업 트리와
비교합니다. 영어 값이 변경된 모든 키에 대해, 어떤 로케일이 수정되지 않은 번역을
계속 보유하고 있으면 오래된 것으로 간주합니다. 이는 의도적으로 **기존 부채를 동결**합니다.
차이만으로는 오래된 번역이 과거의 어떤 영어에서 비롯되었는지 알 수 없으므로, 게이트는
현재 변경 사항이 건드린 부분만 판단합니다. 대안인 키별 해시 기준선은 약 600 KB의
생성 파일이 필요하며, 이는 기존 최대 기준선의 3배 크기이고 모든 i18n PR에서 변경됩니다.

다음 두 가지 방법으로 조건을 충족할 수 있습니다.

1. 영향을 받는 번역을 업데이트하거나,
2. `__MISSING__:<new english>`로 설정합니다. 그러면 런타임이 수정된 영어를 제공합니다
   (`src/i18n/request.ts::deepMergeFallback`, #7258). 해당 키는 번역 대기열에 추가됩니다.

문자열의 **의미**가 변경된 경우에는 **키 이름을 변경**하는 것이 좋습니다. 새 키는
오래된 번역을 상속할 수 없습니다. #8463에서 이 패턴을 사용했습니다.

```bash
npm run i18n:check-value-drift          # 엄격 모드(CI에서 실행하는 방식)
npm run i18n:check-value-drift:warn     # 보고만 수행
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

값 드리프트 게이트와 새 키 게이트는 `scripts/i18n/resolve-ui-diff-base.mjs`에서 확인되는 하나의 불변 비교 기준을 공유합니다. 워크플로는 두 검사 모두에 동일한 기준, 기준 팁 및 후보 SHA를 전달합니다. PR/기준 리타기팅, 푸시 및 병합 그룹 실행은 해당 이벤트 컨텍스트를 사용합니다. 후보 브랜치를 디스패치하려면 정확히 일치하는 열린 PR 또는 명시적인 `i18n_base_sha` 입력이 필요합니다. 해당 입력 없이 `main` 또는 `release/vX.Y.Z`를 디스패치하거나 예약 관찰하는 경우 마지막 커밋을 첫 번째 부모와 비교하며, 이는 상속된 모든 번역 부채에 대한 감사가 아닙니다. 로컬 호출에는 명시적인 비교 기준이 필요합니다. 예를 들면 위의 `BASE_REF` 명령을 사용할 수 있습니다.

비교 컨텍스트가 없거나 모호한 경우, 필수 카탈로그를 읽을 수 없거나 유효하지 않은 경우, 또는 후보가 변경된 경우에는 경고 모드에서도 종료 코드 **2**와 함께 `INCOMPLETE`가 생성됩니다. 카탈로그 읽기에는 `scripts/i18n/read-ui-catalog.mjs`를 사용하며, 읽기 실패를 빈 객체로 대체하지 않습니다. 기준을 사용할 수 없거나 입력이 불완전한 경우에는 PASS로 판정되지 않습니다.

### 작업: `i18n`

전체 i18n 검증 매트릭스입니다(로케일당 하나의 작업). 전체 작업은 권고 사항입니다.

| 스크립트                        | 검증 항목            | 차단 여부                                            |
| ------------------------------- | -------------------- | ---------------------------------------------------- |
| `validate_translation.py quick` | 로케일별 번역 완성도 | **권고**(전체 작업에 `continue-on-error: true` 적용) |

### 작업: `pr-test-policy`

풀 리퀘스트에서만 실행됩니다.

| 스크립트               | 검증 항목                                                                                                                      | 차단 여부 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` 또는 `bin/`의 프로덕션 코드를 변경하는 PR은 테스트를 포함하거나 업데이트해야 함(엄격 규칙 #8) | 예        |
| `check:test-masking`   | 변경된 테스트 파일이 순 어설션 수를 줄이거나 `assert.ok(true)` 항진식을 추가하지 않음                                          | 예        |
| `check:pr-evidence`    | PR 본문에 변경 사항에 대한 테스트/VPS 증거를 명시함(PR 본문을 grep하여 엄격 규칙 #18을 자동화 — 취약함, Backlog 참조)          | 예        |

### 작업: `test-vitest`

`changes` 분류 작업이 필요합니다. 해당하는 매트릭스 샤드는 실패 시 병합을 차단합니다.

| 스위트           | 검증 항목                                           | 차단 여부                                                                                               |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP 서버(도구 110개), autoCombo, 캐시 — vitest 러너 | 예                                                                                                      |
| `test:vitest:ui` | UI 컴포넌트 테스트 — vitest 러너                    | **차단** — 기존 실패는 `vitest.config.ts`에서 명시적으로 제외되며, 새로운 실패가 발생하면 작업이 실패함 |

### 야간 워크플로(예약 실행, 권고)

cron 일정에 따라(또한 `workflow_dispatch`로) 실행되며 PR에서는 절대 실행되지 않습니다. 모두 권고 사항입니다.

| 워크플로               | 검증 항목                                                                                                                                                | 차단 여부 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `nightly-property`     | 무작위 시드와 높은 실행 횟수를 사용한 fast-check 속성 테스트                                                                                             | **권고**  |
| `nightly-resilience`   | 힙 증가 게이트, 카오스 장애 주입, k6 부하/장시간 부하 테스트                                                                                             | **권고**  |
| `nightly-llm-security` | promptfoo 인젝션 방어(block 모드) + garak 프로브(프로바이더 시크릿이 없으면 건너뜀)                                                                      | **권고**  |
| `nightly-schemathesis` | `docs/openapi.yaml`을 사용해 실행 중인 OmniRoute를 대상으로 수행하는 OpenAPI 계약 퍼징(schemathesis) — 명세 위반/처리되지 않은 500 오류 식별(Fase 8 B.4) | **권고**  |
| `nightly-mutation`     | 빠른 단위 테스트 레인에 대한 Stryker 변이 테스트 점수 — 살아남은 변이는 취약한 어설션을 드러냄                                                           | **권고**  |
| `nightly-compat`       | 지원되는 `engines.node` 범위 전반의 Node 엔진 호환성 매트릭스                                                                                            | **권고**  |

성능 기준선(힙, TTFB, 빌드 시간)은 기록만 하고 게이트로 적용하지 않습니다. [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md)(`npm run perf:lts-baseline`)를 참조하세요.

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
