# Release-Green: candidate validation and evidence (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green은 특정 커밋을 관찰하고 해당 검증 결과를 보고합니다. [Quality Gates 참조는](../architecture/QUALITY_GATES.md) 현재 CI 프로필, 필수 점검 및 승인 정책을 정의합니다. 버전이 지정된 [허용 정책](../../config/quality/admission-policy.json) 은 `Gate / CI` 및 `Gate / Quality` 에 대해 실행 가능한 계약입니다.

## CI 및 관찰자 범위

`ci.yml` 와 `quality.yml` 메인 및 릴리스 브랜치에 대한 풀 요청을 처리합니다. 선택한 프로필에 따라 적용되는 작업이 결정됩니다. 전체 CI 일반 풀 요청이 실행되지 않는 레인도 포함됩니다. 빠른 관찰자 결과는 해당 작업을 대체할 수 없으며, 완료된 워크플로 래퍼는 해당 영수증을 대체할 수 없습니다.

프로덕션 빌드는 CI 에 속합니다. `quality.yml` 에는 중복된 권고 빌드가 없습니다. 누락된 아티팩트, 취소된 작업 및 불완전한 측정으로 인해 성공적인 필수 검사가 이루어지지 않습니다. 결과를 수락하기 전에 현재 베이스, 헤드 및 결합 후보를 확인하세요.

## 로컬 검증

종속성을 준비한 후 소유된 작업 트리에서 관찰자를 실행합니다. 철저한 검증 전에 [작업 트리 및 리소스 프로토콜을](WORKTREE_ISOLATION.md) 사용하십시오.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

빠른 프로필은 부분적입니다. 전체 프로필은 모델링된 요구 사항을 확인하고 명령 수신을 보존합니다. 배포를 인증하거나 해당 호스팅 검사를 대체하지 않습니다. 보고서는 실행 실패와 메트릭 드리프트를 구별합니다. 필수 래칫은 선택한 정책에 따라 차단 상태를 유지합니다. 단지 합격 결과를 얻기 위해 기준선을 높이지 마십시오.

## 야간 및 수동 청소

야간 릴리스 및 호환성 확인자는 정식 릴리스 분기를 선택합니다. 해당 선택은 워크플로를 트리거한 분기와 일치해야 하며 제품군은 이벤트의 불변 SHA 사용합니다. 수동 실행의 경우 `release_branch` 에서 원하는 릴리스를 선택하고 동일한 참조로 디스패치합니다.

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

선택한 코드를 실행하기 전에 교차 지점 디스패치가 거부됩니다. 호스팅된 기본 제품군은 `main` 체크아웃하고 설치 전에 해당 SHA 해결된 대상과 여전히 일치하는지 확인합니다. 해결 중에 기본 이동이 발생하면 새 커밋에서 불완전한 스윕을 다시 실행하세요. 서로 다른 후보자의 영수증을 합치지 마십시오.

## 실패 분류 및 복구

인시던트를 진단 지표로 사용한 후 정확한 실행, 시도, 실패한 단계 및 아티팩트를 검사합니다. 실패를 기여자의 탓으로 돌리기 전에 동등한 기반과 후보 증거를 비교하십시오. 인프라 오류, 상속된 결함, 후보 회귀 및 보류 중인 승인에는 다양한 해결 방법이 필요합니다.

`/green-prs`, `/sweep-reds`, `/validate-release-green` 및 `/babysit` 기술은 증거를 수집하고 문서화된 범위 내에서 수정 사항을 준비합니다. 기여자의 신용을 유지하고, 격리된 수리 지점을 사용하고, 승인된 병합 전에 필요한 모든 확인 사항을 확인하세요. 합격한 현재 후보자를 대체하는 자동 기준 재설정 또는 사고 종결은 없습니다.
