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

CI 및 Quality Gates 워크플로는 각각 안정적인 결과인 `Gate / CI` 및 `Gate / Quality` 내보냅니다. 버전이 지정된 승인 정책은 필요에 따라 모든 업스트림 작업을 열거하거나 권고합니다. 적용 가능한 필수 작업은 성공해야 합니다. 누락, 취소, 건너뛰기, 보류 중 및 알 수 없는 결과는 PASS 설정할 수 없습니다. 유효한 문서 전용 또는 카탈로그 전용 분류로 인해 코드 레인이 적용되지 않을 수 있습니다. 초안 PR 승인된 후보가 아닙니다. `hotfix` 라벨은 증거를 포기하지 않습니다.

두 워크플로 모두 PRs main/release 분기로 처리하고, `main` 로 푸시하고, 수동 디스패치 및 병합 그룹 이벤트를 처리합니다. 푸시, 디스패치 및 병합 그룹은 전체 선택을 실행합니다. `release/**` 로 푸시하면 시작되지 않습니다(2026-10-18). 각 변경 사항은 이미 해당 PR 에서 매트릭스를 실행했으며 병합된 조합은 Release-Green의 작업(`docs/ops/RUNNER_BOX.md` → 호스팅 레인)입니다. 포크 및 병합 그룹은 자체 호스팅 실행기를 선택하는 작업에 대해 호스팅 실행기를 사용합니다. 출시하기 전에 충분한 호스팅 용량을 확인해야 합니다.

일반 PR 빠른 선택을 실행합니다. 허용 정책의 `full-code` 및 `full-code-e2e` 레인(E2E, 통합, 패키지 아티팩트, Electron smoke, Bun SQLite, 생태계 및 프로토콜 클라이언트)은 Mergify 대기열 드래프트 또는 전체 실행( `gh workflow run ci.yml --ref <branch>` 에서만 실행됩니다.

각 JSON 영수증은 체크아웃된 SHA, 워크플로 실행 및 시도를 식별합니다. CLI checkout/event SHA 불일치를 거부합니다. 워크플로 테스트는 정책 멤버십을 판정 작업의 `needs` 목록에 바인딩하므로 새 레인이나 제거된 레인이 자동으로 사라지는 일이 없습니다. 영수증에는 게시, 배포 또는 기존 자문 스캐너의 내부가 아닌 자체 작업 흐름이 포함됩니다. 분기 규칙에서 두 검사 이름을 모두 활성화하는 것은 별도의 관리 변경입니다. 이러한 작업을 추가한다고 해서 그 자체로 지점이 보호되는 것은 아닙니다.

### 병합 대기열

`queue` 레이블은 PR Mergify 대기열(`.mergify.yml`)로 보냅니다. Mergify는 `mergify/merge-queue/` 분기에서 PR 초안을 열고, CI 그곳에서 전체 선택을 실행하며, `Gate / CI`, `Gate / Quality` 및 `Merge integrity (changelog + generated skills)` 통과하면 원본 PR 병합됩니다.

Mergify는 초안 설명에 대기열 요약을 기록하고 다른 앱도 이를 편집할 수 있습니다. 이러한 초안의 `pull_request` `edited` 이벤트는 자체 동시성 그룹(`-queue-edit-<run_id>`)을 사용하므로 초안의 실제 실행을 취소할 수 없으며 게이트와 매트릭스를 건너뜁니다. `Merge integrity` 만 계속 실행됩니다. 건너뛴 게이트 작업은 다른 확인 이름을 갖습니다. Mergify가 건너뛴 `Gate / CI` 실패한 확인으로 읽고 PR 대기열에서 제거하기 때문입니다.

대기열에서 제거한 후 푸시가 항상 PR 다시 대기열에 추가하는 것은 아닙니다. 그것에 대해 `@mergifyio queue` 언급하십시오.

### 수용 감소기에 보관된 증거

`scripts/quality/validate-release-acceptance.mjs` 제공된 계획과 그 매니페스트를 줄입니다. 계획이 전체 릴리스 파이프라인을 포괄한다는 사실은 확립되지 않았습니다. 해당 계획이 `VERIFIED` 인 경우에도 해당 보고서는 명시적으로 `releaseAcceptance: false` 설정합니다. `release-acceptance.yml` 워크플로우는 실제 빌드, 패키지, 부팅 또는 프로모션 영수증이 아닌 섀도우 픽스처를 여전히 사용합니다.

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

| 스크립트(`npm run ...`)           | 검증                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 블로킹                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| `check:node-runtime`              | Node.js 버전이 지원되는 범위 내에 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 예                                   |
| `check:cycles`                    | 모든 `src/` + `open-sse/` 에서 순환 가져오기(AST 기반, tsconfig `paths` 확인). Bare는 사이클이 존재할 때마다 1로 종료하고( #15281 이후 실패 종료됨) SCCs 를 나열합니다. `check:cycles:ratchet` ( CI 실행하는 것)는 개수가 `quality-baseline.json` — 현재 14, `direction: down` 의 `metrics.cycles` 한도를 초과할 때 차단되므로 떨어질 수만 있습니다(#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 예(래칫)                             |
| `check:boundary`                  | `open-sse → src` 결합: 엔진에서 앱으로 고유한 파일 간 가져오기(`scripts/quality/measure-boundary.mjs`; 에지 목록은 v4 core/module-split 수정 백로그입니다). 베어 = 자문 보고서( `quality:boundary` 와 동일) `check:boundary:ratchet` ( CI 실행하는 것, `quality.yml` 고속 게이트 래칫 루프에서도 실행됨) — 측정된 771에 시드된 `quality-baseline.json` 의 `metrics.boundaryOpenSseToSrc` 천장을 카운트가 초과할 때 차단됩니다. `direction: down`; `--update` 이를 낮추기만 합니다. PRs 의 기준 상대(`--base-ref`, 아래 참조)                                                                                                                                                                                                                                                                                                                                                               | 예(래칫)                             |
| `check:route-validation:t06`      | 모든 경로에 존재하는 Zod 스키마(Tier 6 정책)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 예                                   |
| `check:any-budget:t11`            | `@ts-expect-error // any` 수가 예산을 초과하지 않습니다(Tier 11 catraca).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 예                                   |
| `check:provider-consistency`      | `providers.ts` 의 모든 공급자는 `providerRegistry.ts` 에 일치하는 항목을 가지고 있습니다(그 반대의 경우도 허용 목록 내에서).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 예                                   |
| `check:model-lifecycle`           | 직접 관리하는 세 개의 라우팅 테이블은 체크인된 수명 주기 스냅샷(#11503)과 일관성을 유지합니다. `FITNESS_TABLE` (`taskFitness.ts`)는 `REGISTRY` 라우팅할 수 있는 만료된 ID를 점수로 얻지 않습니다. 모든 `BUILT_IN_ALIASES` 대상은 `REGISTRY` 에 존재하며 은퇴 ID 스냅샷에는 없습니다. 아직 `REGISTRY` 에 있는 모든 폐기된 ID는 `allowedRetiredInCatalog` 에 전달되거나 나열됩니다. 해당 스냅샷에는 `DEFAULT_DEGRADATION_MAP` 소스나 대상이 폐기된 것으로 나타나지 않습니다. 이는 모델이 현재 라이브 업스트림에서 제공되고 있음을 증명하지 않습니다. 오프라인 — `config/quality/model-lifecycle.json` 와 비교되며 `npm run quality:refresh-model-lifecycle` 사용하여 직접 새로 고칩니다(네트워크, CI 에 연결되지 않음). `allowedRetiredInCatalog` 은 번다운 래칫입니다. 추적 문제가 있는 경우에만 항목을 추가하세요.                                                                         | 예                                   |
| `check:fetch-targets`             | 클라이언트 측 `src/` 의 모든 `fetch("/api/...")` 실제 `route.ts` 로 확인됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 예                                   |
| `check:deps`                      | 저장소의 모든 `package.json` 에 대한 모든 `npm install` -able deps는 `dependency-allowlist.json` 에 있습니다. 고정되지 않았거나 부주의한 새 패키지에 플래그가 지정됨                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 예                                   |
| `audit:deps`                      | 다섯 개의 독립적인 잠금 파일(루트, Electron, OpenCode 플러그인 v1/v2 및 공급자) 모두에 대한 npm 감사입니다. 중요한 권고사항 차단; 높은 주의보는 눈에 보이는 경고로 남아 있습니다. Missing/failed 감사는 INCOMPLETE 및 block입니다. 범위별 잠금 해시 및 보고서가 유지됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 예                                   |
| `check:lockfile`                  | `package-lock.json` 무결성 — https 레지스트리, 무결성 해시, 호스트 재정의 없음                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 예                                   |
| `check:licenses`                  | 프로덕션 종속성에 대한 SPDX 라이센스 허용 목록                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 예                                   |
| `check:tracked-artifacts`         | 빌드 아티팩트 없음/커밋된 `node_modules` 심볼릭 링크(허스키 사전 커밋에서도 실행됨, 사전 푸시는 의도적으로 가벼운 — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 예                                   |
| `check:ai-attribution`            | PR 커밋, 제목 또는 본문에 AI/bot `Co-Authored-By` 예고편이나 AI 생성 바닥글이 없습니다. — 하드 규칙 #16 ( PR 에 대한 `quality.yml` fast-gates 루프에서 → `release/**` — 이벤트 페이로드를 읽습니다. PRs — 에서 작동하지 않고 PR→ `main` 에 대한 `ci.yml` lint의 PR 전용 단계도 있습니다. 허스키 `commit-msg` 후크도 있습니다. 인간 공동 작성자가 허용됩니다. #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | 모든 Vitest 제외는 추적 문제의 이름을 지정하고 `config/quality/vitest-exclusions.json` (#13204)에 나타납니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 예                                   |
| `check:file-size`                 | 소스 파일( `src/`, `open-sse/`, `electron/`, `bin/` 의 `.ts`/`.tsx` )은 `cap` 내에 있고 테스트 파일(`*.test.ts(x)`)은 `testCap` 내에 있습니다. `file-size-baseline.json` (`frozen` / `testFrozen`)에 고정된 파일은 기록된 크기를 초과해서는 안 됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 예                                   |
| `check:error-helper`              | executors/handlers 의 오류 응답은 `buildErrorBody()` / `sanitizeErrorMessage()` 사용합니다(엄격한 규칙 #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 예                                   |
| `check:migration-numbering`       | 마이그레이션 SQL 파일은 순차적으로 번호가 지정되며 간격이나 중복이 없습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 예                                   |
| `check:public-creds`              | `publicCreds.ts` 외부에는 리터럴 OAuth `client_id`/`client_secret` 또는 Firebase 웹 키가 없습니다(엄격한 규칙 #11).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 예                                   |
| `check:db-rules`                  | `src/lib/db/` 모듈 외부에는 원시 SQL 없습니다. `localDb.ts` 에서 배럴 가져오기 없음(엄격한 규칙 #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 예                                   |
| `check:known-symbols`             | 디스패치 테이블에 등록된 공급자 실행자, 라우팅 전략 및 변환기는 디스크 — 의 파일과 일치합니다. 분리되거나 선언되지 않은 기호는 없습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 예                                   |
| `check:route-guard-membership`    | 하위 프로세스를 생성하는 모든 경로는 `isLocalOnlyPath()` 로 분류됩니다(엄격한 규칙 #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 예                                   |
| `check:test-discovery`            | 저장소의 모든 `*.test.ts` / `*.spec.ts` 파일은 적어도 하나의 테스트 실행기에 의해 수집됩니다(래칫: `test-discovery-baseline.json` 의 고아 목록은 축소만 가능함)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 예                                   |
| `check:test-tla-order`            | `tests/unit` 아래의 `node:test` 파일은 테스트를 등록하고 최상위 `await` 에 도달한 다음 더 많은 것을 등록합니다(#18045; 래칫: `test-tla-order-allowlist.json` 축소만 가능)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 예                                   |
| `check:agent-skills-sync`         | 생성된 에이전트 기술 아티팩트가 소스 카탈로그와 일치합니다(드리프트 없음).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | 공급자 logos/assets 기록된 출처 항목을 가지고 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | JSON 구성 파일은 repo lint 규칙을 구문 분석하고 충족합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | 오류 없는 TypeScript 컴파일(권고 경고만)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 예                                   |
| `typecheck:noimplicit:core`       | 엄격한 `noImplicitAny` — 미래지향적; 기존의 많은 호출 사이트에는 여전히 주석이 필요합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **자문** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` 범위가 `src/app/(dashboard)/**` (#7033)로 지정됨 — `typecheck:core` 의 큐레이트된 27개 파일 허용 목록에는 대시보드 TSX 포함되어 있지 않으며 `next build` 대시보드도 유형 확인하지 않으므로(`next.config.mjs` `ignoreBuildErrors: true` 설정함) 거기에서 고아 식별자 회귀(#6625/#6909)는 CI 에 표시되지 않았습니다. 고정된 per-file/per-TS-code 수 기준(`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` 와 동일한 오래된 적용 패턴)과 비교합니다. NEW — 만 게이트에 실패합니다. 기존 오류가 수정되면 `--update` 사용하여 래칫을 조정하세요.                                                                                                                                                                                                                                                                                                                 | 예                                   |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`)에 대한 전체 앱 제작 유형 확인, 표면 `typecheck:core` 의 27개 파일 허용 목록 및 대시보드 게이트는 다루지 않습니다. `config/quality/build-typecheck-baseline.json` 와 차이점이 있습니다. 새로운 또는 증가된 (파일, 코드)별 개수가 실패하면 더 낮은 개수로 래칫을 요청합니다. `--update` `--force-regressions` 전달되지 않는 한 실행에 새 쌍이나 제기된 쌍이 포함되어 있는 동안 거부하고, `--force-nocheck` 전달되지 않는 한 새로 침묵된 파일을 거부하므로 녹색이 되도록 기준선을 확대하는 것과 영구적인 침묵을 부여하는 것은 두 가지 별도의 고의적 행위입니다. 베어 `--force` 거부됩니다. 또한 `config/quality/ts-nocheck-baseline.json` 에 대해 `@ts-nocheck` 의 빌드 범위를 스캔합니다. 이를 사용하는 파일은 진단을 전혀 보고하지 않고 그렇지 않으면 모든 게이트에 표시되지 않기 때문입니다. | 예                                   |

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

### 직업 : `quality-extended`

전체 작업은 자문입니다(`continue-on-error: true`). npm 기반 래칫은 실제로 실행됩니다. 외부 스캐너는 바이너리가 아직 없을 때 `gh release download` 및 자체 건너뛰기(종료 0)를 통해 설치됩니다.

| 스크립트                 | 검증                                                                                                                                                                                         | 블로킹                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:circular-deps`    | 순환 종속성 없음(dpdm)                                                                                                                                                                       | **자문**                                      |
| `check:bundle-size`      | 번들 크기는 한도를 초과하지 않습니다.                                                                                                                                                        | **자문**                                      |
| `check:secrets`          | 바이너리가 없으면 비밀 스캐닝(gitleaks) — 건너뜁니다.                                                                                                                                        | **자문**                                      |
| `check:vuln-ratchet`     | 종속성 취약성(osv-scanner)은 — 회귀하지 않습니다. 측정되지 않은 경우 `--ratchet` INCOMPLETE (종료 2)로 실패합니다.                                                                           | **자문**                                      |
| `check:workflows`        | 워크플로 린트(actionlint + zizmor) missing/broken 스캐너, 유효하지 않은 보고서 또는 래칫 기준 누락이 INCOMPLETE 로 실패합니다. 유효한 결과는 선택한 strict/advisory/ratchet 정책을 따릅니다. | 실행이 필요합니다. CI 의 지즈모어 래칫 블로킹 |
| `check:openapi-breaking` | 고정된 이벤트 커밋에 대한 공개 API 계약(PR merge-base, push before, merge-group base; scheduled/manual checkout 첫 번째 상위) 필수 측정 실패 종료                                            | **--ratchet 로 차단**                         |

### 직업 : `docs-sync-strict`

모든 PR 에서 `main` 까지 실행됩니다. 실패 시 블록이 병합됩니다.

| 스크립트                       | 검증                                                                                                                                               | 블로킹                     |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | 아래 6개의 서브게이트를 순차적으로 실행하는 메타게이트                                                                                             | 예                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt 버전 일관성                                                                                                          | 예                         |
| ↳ `check:docs-counts`          | 산문의 수(공급자 수, 마이그레이션 수 등)는 실제 수의 래칫 창 내에 있습니다.                                                                        | 예                         |
| ↳ `check:env-doc-sync`         | `.env.example` 의 모든 환경 변수는 문서 테이블에 문서화되어 있으며 그 반대도 마찬가지입니다.                                                       | 예                         |
| ↳ `check:deprecated-versions`  | 문서에 더 이상 사용되지 않는 버전 문자열이 없습니다.                                                                                               | 예                         |
| ↳ `check:doc-links`            | 문서의 내부 마크다운 링크는 실제 파일(`[text]`/`(path)` 형식)로 해석됩니다.                                                                        | 예                         |
| ↳ `check:fabricated-docs`      | 문서에 인용된 경로, 환경 변수, CLI 명령, 후크 이름 및 파일 경로가 코드베이스에 존재합니다. `--strict` 통한 하드 게이트; 플래그가 없는 소프트 페일. | 예( CI 의 `--strict` 통해) |
| `check:cli-i18n`               | CLI 명령 문자열은 모든 i18n 로케일 파일에 있습니다.                                                                                                | 예                         |
| `check:openapi-coverage`       | OpenAPI 사양은 적어도 실제 경로의 래칫 바닥을 다룹니다.                                                                                            | 예                         |
| `check:openapi-security-tiers` | `openapi.yaml` 의 보안 계층 주석은 `routeGuard.ts` 분류와 일치합니다.                                                                              | **자문**                   |
| `check:openapi-routes`         | `openapi.yaml` 의 모든 경로는 실제 `route.ts` (환각 방지)로 확인됩니다.                                                                            | 예                         |
| `check:docs-symbols`           | `docs/**/*.md` 의 모든 `/api/...` 참조는 실제 `route.ts` (환각 방지)로 확인됩니다.                                                                 | 예                         |
| `i18n translation drift`       | i18n 로케일 파일의 번역되지 않은 키 — 경고만 표시                                                                                                  | **자문**                   |

`docs/diagrams/` 아래에 12개의 README SVGs 생성됩니다(`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` 모두 재생성합니다). 각각에는 커밋된 파일이 오래되었을 때 실패하는 바이트 비교 단위 테스트(`tests/unit/docs/readme-*-svg.test.ts`, 작업 `test-unit`)가 있으며, `check:docs-counts` `<text>` 노드 — 에서 정식 번호를 읽습니다. 이는 개요 단계에서 파일의 모든 윤곽선 문자열을 보이지 않는 `<text>` 로 유지하는 이유입니다. SVG 표준 번호 검사는 `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`)에 나열된 파일을 읽습니다: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg` 및 `tier-flow-light.svg`; 영원히 무료, 카탈로그 항목, 반복 풀 및 득점 요인 주장도 `promise-pillars.svg`, `free-tier-budget.svg` 및 `strategies-grid.svg` 로 읽습니다. `free-tier-budget.svg` 라이브 카탈로그 로더에서 수치를 가져오므로 `FREE_MODEL_BUDGETS` 또는 공급자 표시 이름을 변경하면 해당 파일이 재생성될 때까지 CI 빨간색으로 표시됩니다.

### 직업 : `i18n-ui-coverage`

| 스크립트                          | 검증                                                                                                                                                    | 블로킹   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check-ui-keys-coverage` (인라인) | UI i18n 키 적용 범위는 ≥ 65%입니다.                                                                                                                     | 예       |
| `check-ui-value-drift` (인라인)   | 다시 쓴 영어** 값** 오래된 번역을 남기지 않습니다                                                                                                       | 예       |
| `check-new-key-coverage` (인라인) | 에이** 새로운** 영어 키는 모든 로케일 — 에서 번역되며 `__MISSING__:` 마커는 거부됩니다.                                                                 | 예       |
| `check-translation-ratio`         | 로캘별 실제 번역 비율(영어와 동일/자리 표시자/허용 목록 외부 누락된 잎) `config/quality/i18n-translation-baseline.json` + slack을 초과해서는 안 됩니다. | **자문** |

`fetch-depth: 0` — 필요합니다. 가치 드리프트 게이트는 `en.json` 병합 기반과 비교합니다.

#### `check-ui-value-drift` — 오래된 번역 게이트

다른 게이트가 구조적으로 볼 수 없는 하나의 i18n 회귀를 포착합니다. 즉, 영어 값이 다시 작성되고 _이전_ 영어에서 파생된 번역이 그대로 유지되므로 영어가 아닌 사용자는 자신 있게 표현된 현재 잘못된 사본을 계속 읽습니다.

이건 진짜로 배송됐어요. Antigravity 로그인 도우미가 도착했을 때 `oauthModal.googleOAuthWarning` 다시 작성되었습니다(#5203).** 43개 로케일 중 39개** 운영자에게 해당 공급자에 대해 완료할 수 없는 흐름 — "전체 URL 복사하여 아래에 붙여넣으십시오"라고 지시하는 텍스트를 유지했습니다. 다음과 같은 이유로 #8463 까지는 눈에 띄지 않았습니다.

- `sync-ui-keys` 다음과 같은 키만 백필합니다.** 결석한** , 절대 그렇지 않습니다** 탁한** ;
- `check-ui-keys-coverage` _presence_ 키를 계산하므로 오래된 번역은 포함된 것으로 점수를 매깁니다.
- `check-translation-drift` `docs/i18n/<locale>/**.md` 문서 미러 zqc를 추적하며 — `src/i18n/messages/*.json` 읽지 않습니다. 2026-09년 재동기화 이후 작업 `docs-sync-strict` 에서 차단: 핵심 문서 → `npm run i18n:run -- --files=<doc>` (섹션 수준, 저렴한)를 편집합니다.

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

기본 카탈로그를 읽을 수 없으면(기본 참조가 없는 얕은 복제) `check-openapi-breaking` 미러링하여 `SKIP reason=base-unresolved` 로 0을 종료합니다.

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
- **권고** — 고정된 기준선과 비교한 전역 총계. 상속된 드리프트 때문에 무관한 PR이
  실패 처리되는 일은 없습니다. 해당 드리프트는 릴리스 조정 시 다시 고정되며 여유분 작업에서 감시합니다.

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
3. **위반사항이 이미 존재하는 경우** (즉, 소개하지 않았지만 이제 게이트에서 다룹니다.): 근거 설명 및 추적 문제가 포함된 허용 목록 항목을 추가합니다.
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
- **사이클 감지** — ✅**DONE** (#15159 G-01/G-02). 여기의 오래된 텍스트는 `check:cycles` "녹색, 선별된" 게이트라고 부르고 `check:circular-deps` (dpdm)가 91사이클을 보고했기 때문에 이를 차단하는 것을 정당화했습니다. 그 녹색은** 가짜 녹색** : `check:cycles` 5개의 하위 디렉터리(450개 파일)를 스캔하고 정적 `import|export … from` 만 일치했으며 모든 `@/` 및 `@omniroute/open-sse/` 지정자를 삭제했으므로 저장소를 지배하는 동적 가져오기 + 별칭 주기를 볼 수 없습니다. 수정됨: 이제 게이트가 `src` + `open-sse` (5023개 파일)를 탐색하고, TypeScript AST 에서 지정자를 수집하고(따라서 `import("…")` 계산하고 유형 위치 `typeof import("…")` 계산하지 않음) tsconfig `paths` 해결합니다. 그것은 발견한다** 14** 0이 아닌 사이클. 기존의 14개 사이클은 게이트 PR 에 고정될 수 없기 때문에 이제 `check:cycles` 는** 래칫 휠 장치** (`--ratchet`, `quality-baseline.json`, `direction: down` 의 천장 `metrics.cycles.value = 14` ) — 모든 _회귀_를 차단하고 개수는 감소할 수만 있습니다. CI `npm run check:cycles:ratchet` 실행합니다. Burn-down 라이드와 함께**A-01** . `check:circular-deps` (dpdm)는 더 넓은 2차 의견으로 자문을 유지합니다.
- **복잡성** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): 한 번의 ESLint 걷기, ruleId 로 계산되므로 순환적 + 최대 라인과 인지 기준선은 독립적으로 유지됩니다. 개별 `check:complexity` / `check:cognitive-complexity` 로컬 `--update` 로 유지됩니다.
- **`/api` 환각 방지** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` 의 하나의 FS 인벤토리, openapi-routes + docs-symbols는 여전히 독립적으로 보고합니다. 개인은 지역 실행 중를 위해 남아 있습니다.
- **`check:node-runtime` 11개의 작업에서 실행됩니다.** — ⚠️** 낮은 ROI.** 각각은 별도의 러너이며 수표는 < 1s입니다. 저렴한 직업당 가드를 잃는 것에 대비해 총 절감액은 ~ 10s입니다. 이탈할 가치가 없습니다.
- **CI 린트의 `typecheck:noimplicit:core`** — ✅** 린트 작업에서 제거됨** (자문 `continue-on-error` 였습니다); 차단 유형 표면은 `typecheck:core` + `check:type-coverage` 입니다. 로컬 스크립트가 유지됩니다.

### 뒤집기 / 결정 (운영자 정책)

- `check:openapi-security-tiers` (권고) — ❌**NOT 깔끔하게 뒤집힐 수 있습니다.** 0으로 종료되지만 `LOCAL_ONLY_API_PREFIXES` 아래의 여러 `traffic-inspector` 경로에 `x-loopback-only: true` 주석이 부족하다는 경고가 표시됩니다. 이를 시행하려면 먼저 해당 주석을 `openapi.yaml` 에 추가해야 합니다.
- `typecheck:noimplicit:core` (권고) — 대부분 차단 `check:type-coverage` 래칫에 포함됩니다. 래칫으로 뒤집거나 중복된 두 번째 `tsc` 패스를 삭제합니다.
- `test:vitest:ui` (현재** 블로킹** ) — 기존 오류는 `// #8618` 추적 주석을 사용하여 `vitest.config.ts` 에서 명시적으로 제외됩니다. 새로운 실패로 인해 작업이 실패합니다.
- `check:secrets` (gitleaks, 3개의 문서화된 오탐지에서 래칫 동결 차단) — 3개를 허용 목록에 추가하여 0에 도달하거나 권고로 강등합니다. GitHub 기본 비밀 검색 + `check:public-creds` 와 겹칩니다.
- `check:pr-evidence` (차단, grep PR-body 산문) — 높은 위양성 위험; 삭제되면 엄격한 규칙 #18 시행이 약화되므로 이는 진정한 정책 호출입니다.
- `semgrep` (권고 독립 실행형) — OWASP 제품군에 대해 CodeQL 와 겹칩니다. 기준선을 래칫이나 드롭에 연결합니다.

---

## 관련 문서

- 공급망(출처, SBOM, Trivy, 스코어카드): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — 키 세트 패리티 게이트

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, 작업 `i18n-ui-coverage`). 모든 `src/i18n/messages/<locale>.json` 의 리프 키 세트를 `en.json` 와 비교하고 키가 추가된 시점에 관계없이 리프가 없거나 추가되면 실패합니다. `__MISSING__:` 자리 표시자는 존재하는 것으로 간주됩니다(그 내용은 비율 게이트의 업무입니다). 이는 두 개의 diff-based/percentage 게이트를 완전히 보완한 것입니다. `check-ui-keys-coverage` 로케일당 80% 플로어를 적용하고( ~ 13,000개 중 43개의 부재 키는 여전히 99.7%를 읽음) `check-new-key-coverage` PR 가 `en.json` 에 추가한 키만 판단합니다. 로케일 배치는 분기가 잘린 날의 `en.json` 에서 생성되고 베이스가 키를 계속 추가하는 동안 며칠 동안 변환됩니다. 배치 PR 자체적으로 키를 추가하지 않으므로 배치 1(#13044)이 9개 로케일에서 43개의 키가 부족하고 배치 2(#13660)가 8개(2026-09-15)에서 10개의 키가 부족할 때 두 형제 모두 침묵을 지켰습니다. `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` 로 빨간색을 수정합니다. `extra` 리프는 소스 — 로케일에서 삭제했다는 의미입니다. `--warn` 실패 없이 보고합니다. `--catalog=cli` `bin/cli/locales` (`npm run i18n:check-keys:cli`)에 대해 동일한 비교를 실행합니다. 두 단계 모두 작업 `i18n-ui-coverage` 에 있습니다.

#### `check-new-key-coverage` — 새 키 i18n 게이트

`check-ui-value-drift` 의 형제. 그것은 영어 값을 포착합니다.** 다시 쓴** 번역은 남겨졌지만; 이건 영어 키를 잡아요.** 추가됨** 일부 로케일에서는 수신되지 않았습니다.

`check-ui-keys-coverage` 이 클래스를 볼 수 없습니다. 로케일당 백분율 바닥을 적용하고 ~ 13,000개 중 11개의 키가 없으면 적용 범위는 99.9%로 유지됩니다. 언어당 백분율은 "이 기능은 번역되지 않은 상태로 배송됨"을 표현할 수 없습니다. — 전체 기능은 텍스트 없이 새 로케일에 제공될 수 있으며 숫자를 절대 이동할 수 없습니다.

인코딩된 사건: 오케스트레이션 캔버스의 3단계에서는 당시 존재했던 42개 로케일에 걸쳐 11개의 키를 번역했습니다. 몇 시간 후 EU 언어 배치(#13044)는 저장소를 51개 로케일로 가져갔고 9명의 신규 사용자(`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`)는 이를 받지 못했습니다. `deepMergeFallback` 키가 없는 것을 영어로 대체하므로 실패 모드는 공백 UI — real이 아닌 번역되지 않은 UI 이었으며 구성에 따라 침묵했습니다.

그 형제처럼** 차이점 인식** , 병합 기반의 영어를 작업 트리와 비교하므로 기존 간격은 동결된 상태로 유지되며 게이트를 켜기 위해 마이그레이션이 필요하지 않습니다.

**`__MISSING__:<english>` 마커는 이를 만족하지 않습니다(2026-09-17 이후).** 2026년 9월 16일의 8개 기능 PRs 61개의 키를 추가하고 번역하는 대신 65개의 로케일 모두에 마커를 스탬프할 때까지 런타임은 영어 — 수정하기 위해 문서화된 지연 — 였습니다. 이 게이트는 모든 키를 허용하고 아무것도 PRs 를 차단하지 않았으며 차단 실제 번역 비율 게이트는 모든 사람을 위한 릴리스 팁에서 실패했습니다(pt-BR 3.2% > 2.5% + 0.5). 이제 마커는 번역이 없는 것으로 판단됩니다. `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` 또는 `npm run i18n:translate-new-keys` 와 병렬로 모든 로케일을 사용하여 빨간색을 수정합니다(`scripts/i18n/translate-new-keys.sh`, 분리 안전, `OMNIROUTE_TRANSLATION_*` env 없이 시작을 거부함). 영어로 유지되어야 하는 키(고정된 product/engine/flag 이름)는 `scripts/i18n/untranslatable-keys.json` 에 속하며 결코 마커 뒤에 속하지 않습니다. `vi` 마커를 완전히 금지합니다(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — 주차 테스트 게이트

`vitest.config.ts` 의 `exclude` 목록에 있는 파일은 실행되지 않는 테스트이며 트리를 읽는 사람에게는 적용되는 것처럼 보입니다. `// #8618 — pre-existing failure; remove this exclusion when fixed` 댓글 뒤에는 62개의 파일이 축적되어 있습니다. 문제 #8618 2026년 8월 11일에 종료되었으며 추적한 목록은 45개 항목에서 62개 항목으로 늘어났으며 각각의 새로운 항목은 죽은 문제를 가리키는 주석을 상속했습니다. 최종적으로 파일별로 목록을 측정했을 때(#13204),** 62개 중 51개가 소스 변경 없이 현재 트리에 대해 전달되었습니다.** .

게이트에는 (a) 추적 문제의 이름을 지정하고 (b) 측정된 상태와 함께 `config/quality/vitest-exclusions.json` 에 표시하기 위해 실제 파일로 확인되는 모든 제외가 필요하므로 하나를 추가하는 것은 60개 항목 배열에서 한 줄을 더 추가하는 것이 아니라 전용 파일에서 검토 가능한 diff입니다. ~ 10분의 비용이 들고 정기적인 작업에 속하는 제외된 테스트 — 의도적으로 다시 실행하지 않습니다. 재고는 각각이 마지막으로 측정된 시기를 기록합니다.
