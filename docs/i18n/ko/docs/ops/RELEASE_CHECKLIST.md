# Release Checklist (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> 자동화를 위해 Claude 코드 기술을 활용하는 간소화된 릴리스 흐름.
>
> **릴리스 사이에 queue/branch 녹색으로 유지하십시오.** [RELEASE_GREEN.md](./RELEASE_GREEN.md) (`/green-prs` family + `npm run check:release-green` + `/babysit` + nightly)를 참조하세요. 주기적으로 — 실행하고 특히** ~ 전에** 이 체크리스트 — 릴리스 PR 시작을 녹색으로 만듭니다.

## TL;DR

```bash
# 1. 버전 업데이트 + CHANGELOG 생성 (스킬)
/version-bump-cc patch    # 또는 minor/major

# 2. 로컬에서 품질 게이트 실행
npm run check              # 린트 + 테스트
npm run test:coverage      # 전체 커버리지 게이트 (60/60/60/60)

# 3. 빌드 및 스모크 테스트
npm run build
npm run test:e2e           # 선택 사항이지만 권장

# 4. 릴리스 생성 (스킬)
/generate-release-cc

# 5. 배포 (스킬)
/deploy-vps-both-cc        # 또는 akamai-cc / local-cc

# 6. 릴리스 증거 수집 (스킬)
/capture-release-evidences-cc
```

## npm Trusted Publishing(v3.8.51 이후 기본값) 요청 시 — 준비, 폴백으로 직접 설정

`npm-publish.yml` 다음을 통해 게시합니다.** npm 신뢰할 수 있는 게시(OIDC)** 기본적으로 `stage-npm` 작업(github 호스팅)은 GitHub 의 id-token을 해당 실행에 대한 단기 npm 자격 증명으로 교환합니다. — 저장소 비밀에 장기 npm 토큰이 없고 2FA 프롬프트가 없으며 출처가 첨부되어 있습니다. 이는 이제 2FA를 건너뛰는 토큰이 폐기됨에 따라 npm 제재를 우회하는 것입니다. 이는 WS1.3 보장을 유지하면서 프로젝트가 최대 v3.8.48까지 가졌던 완전 자동 흐름을 복원합니다(유출된 토큰은 — 토큰 없이 단독으로 게시할 수 없습니다).

**일회성 설정(소유자):** npmjs.com → 패키지 `omniroute` → 설정 → _Trusted Publisher_ → GitHub: 소유자 `diegosouzapw`, repo `OmniRoute`, 워크플로 `npm-publish.yml` (환경: 없음). 그것이 존재할 때까지 자동 단계는 `ENEEDAUTH` 로 실패합니다: `publish_mode=staged` (아래) 또는 `direct` 로 다시 디스패치합니다.

### 단계적 게시(요청 시 — `publish_mode=staged`)

npm-publish 워크플로는 더 이상 직접 게시하지 않습니다. 압축된 tarball(`check:pack-boot`)을 부팅한 다음 `npm stage publish` — 실행합니다. 정확한 바이트는 레지스트리에 저장됩니다.** 설치할 수 없음** 주인이 승인할 때까지. 인간 2FA 게이트는 이전이 아닌 증거를 AFTER 로 이동했습니다.

**워크플로가 녹색으로 전환된 후 소유자 흐름:**

1. `npm stage list omniroute` — 단계 ID를 찾습니다(워크플로 요약에도 인쇄되어 있음).
2. 준비된 바이트를 확인합니다(권장): `npm stage download <id>`. 그런 다음 다운로드한 tarball을 임시 접두사에 설치하고 부팅합니다(`npm run check:pack-boot` CI 에서 동일한 팩 → install → 부팅 판정을 자동화합니다).
3. `npm stage approve <id>` — 2FA 프롬프트 IS 게시. `npm stage reject <id>` 폐기합니다.
4. 사후 게시 넷: 사후 게시 검증자(v3.8.49 계획의 WS1.4)는 공개 레지스트리의 게시된 버전을 깨끗한 컨테이너에 설치하고 부팅합니다.

**긴급 폴백:** `workflow_dispatch` 와 `publish_mode=direct` 는 레거시 즉각적인 `npm publish` 복원합니다(스테이징 자체가 오작동하는 경우에만 사용하고 이유를 기록하십시오).

**일회성 강화(소유자, npmjs.com):** 유출된 장기 토큰이 어디에서든 직접 `npm publish` 할 수 없도록 스테이지 전용 모드에서 `omniroute` 에 대해 신뢰할 수 있는 게시자를 구성합니다. — CI 스테이지만 할 수 있습니다. 소유자의 2FA 릴리스만 가능합니다.

**손상된 아티팩트 플레이북(변경되지 않음):** 기본 반사로 `npm deprecate omniroute@<bad> "<reason> — use <fixed>"` (분, 가역성); `npm unpublish` 72h/no-dependents 창 내부에서만 가능하며 결코 첫 번째 이동으로 사용되지 않습니다. Docker: 버전 태그를 다시 작성하지 않습니다. — 롤백은 `latest` 마지막 양호한 다이제스트로 다시 지정합니다.

**Docker Hub `latest` (모든 안정적인 SemVer 게시에 필요함):** `docker-publish` 작업 흐름은 태그를 지정해야 합니다.** 둘 다** `X.Y.Z` 그리고 `should-promote-latest.sh` 동의하면 이것이 가장 안정적인 SemVer 이며 `:latest` 는** 동일한 다이제스트** . 작업 후: Hub `latest` 다이제스트는 새로운 SemVer 다이제스트와 동일하며 `last_updated` 이동되었습니다. 릴리스 노트에서 git에만 존재하는 수정 사항에 대해 설명하는 동안 `:latest` 이전 빌드에 두지 마십시오. Compose 빠른 시작에서는 `:latest` 사용합니다. GitOps `X.Y.Z` 계속 고정해야 합니다. [Docker 릴리스 채널](../guides/DOCKER_GUIDE.md#release-channels) 및 #10317 를 참조하세요.

**Docker 허브 조직 저장소(`cheaperinference/omniroute`):** Docker Hub는 네임스페이스 간에 저장소를 이동할 수 없으므로 `diegosouzapw/omniroute` 풀 기록과 모든 릴리스를 유지하며 `docker-publish` 의 `mirror-org-dockerhub` 작업은 릴리스된 각 버전(및 승격된 경우 `:latest` )을 `ghcr.io/cheaper-inference/omniroute` 에서 조직 저장소로 복사합니다. `DOCKERHUB_ORG_USERNAME` / `DOCKERHUB_ORG_TOKEN` 비밀이 필요합니다. 그것들이 없으면 작업은 "Docker Hub org 미러 건너뛰기" 경고와 함께 녹색으로 유지되고 다른 레지스트리는 정상적으로 게시됩니다. 나중에 릴리스된 버전을 게시하려면 다음을 실행하세요.** 조치 → Docker 이미지를 Docker Hub 조직으로 미러링 → 워크플로우 실행** `version=X.Y.Z` 사용(그리고 가장 안정적인 버전의 경우 `promote_latest` ): 재구축 없이 기존 이미지를 복사합니다. 해당 저장소의 Docker Hub 개요는 수동으로 설정됩니다. 이를 편집하는 API 는 조직 액세스 토큰을 거부합니다.

또한 동일한 워크플로는 2027년 6월 30일까지 모든 릴리스를 레거시 GHCR 패키지 `ghcr.io/diegosouzapw/omniroute` 에 복사하므로 고정된 설치는 계속 업데이트됩니다. 해당 인덱스에는 " `ghcr.io/cheaper-inference/omniroute` 로 이동됨" 설명이 포함되어 있습니다. `GHCR_LEGACY_TOKEN` 비밀( `write:packages` 가 포함된 `diegosouzapw` 의 고전적인 개인 액세스 토큰)이 필요합니다. 이것이 없으면 해당 작업은 "레거시 GHCR 미러 건너뛰기" 경고와 함께 건너뜁니다.

## 핫픽스 패스트 레인 (레이블 `hotfix`)

`hotfix` 레이블이 지정된 PR은 대규모 CI 매트릭스(9-샤드 E2E, 커버리지 래칫,
품질 게이트, 확장 품질)를 건너뛰고 빠르고 신호가 높은 게이트인 빌드,
단위 테스트 샤드, 통합 테스트, vitest, 린트/타입 검사, docs-sync, `check:pack-artifact`
및 tarball 부트 스모크(`check:pack-boot`)를 유지합니다. 목표는 약 33분 대신
15분 이내에 통과 상태가 되는 것입니다.

**진입 정책 — 네 가지 모두 필수 (Chromium/VS Code/Node 비상 레인을 모델로 함):**

1. **심각도**: 프로덕션이 중단된 상태여야 합니다 — 게시된 아티팩트가 부팅 시 충돌하거나,
   보안 수정이거나, 릴리스의 모든 사용자가 영향을 받는 경우입니다. "중요함"은 "중단됨"을 의미하지 않습니다.
2. **권한**: 저장소 소유자만 `hotfix` 레이블을 적용합니다. 레이블 자체가 승인입니다 — 캠페인 PR에서
   절대로 직접 적용하지 마세요.
3. **증거**: PR 본문에 이전의 완전히 통과한 대규모 실행(건너뛴 작업이 다시 검증할 스위트)과
   수정 사항 자체의 실패 후 통과 테스트 링크를 포함해야 합니다.
4. **범위**: 체리픽 전용 — 최소한의 수정만 허용하며, 리팩터링이나 부수적인 변경은 포함하지 않습니다.

건너뛴 커버리지/래칫 영역은 릴리스 브랜치에서 다음 전체 실행(지속적인 릴리스 그린)을 통해
다시 검증됩니다 — 이 레인은 대기만 건너뛸 뿐, 검증을 건너뛰는 것이 아닙니다.
테스트만 변경된 diff(`tests/` 아래의 모든 파일이며 `tests/e2e/` 아래는 없음)는 레이블 없이도
E2E 매트릭스를 자동으로 건너뜁니다.

## 세부 체크리스트

### 시험판

- [ ] 이 릴리스를 대상으로 하는 모든 PRs `release/vX.Y.0` 로 병합됩니다.
- [ ] 이 버전에 대해 열려 있는 모든 Linear/issue 항목이 닫히거나 다음 마일스톤으로 푸시됩니다.
- [ ] `release/vX.Y.0` 지점의 CI 녹색
- [ ] 코드에 `TODO(release)` 마커가 없습니다: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker 기본 이미지가 최신 상태입니다(현재 `node:24.15.0-trixie-slim`).

### 버전 및 변경 내역

- [ ] `/version-bump-cc <patch|minor|major>` 실행(Claude 코드 스킬)
  - 범프 `package.json`, `electron/package.json`
  - 마지막 태그 이후 git 커밋에서 `CHANGELOG.md` 재생성합니다.
  - README.md 배지 업데이트
- [ ] CHANGELOG.md 수동으로 검토하고 필요한 경우 커밋 메시지를 정리합니다.
- [ ] `CHANGELOG.md` 의 최신 semver 섹션이 `package.json` 버전과 동일한지 확인하세요.
- [ ] `## [Unreleased]` 향후 작업의 첫 번째 변경 로그 섹션으로 유지
- [ ] `docs/openapi.yaml` → `info.version` 업데이트는 `package.json` 버전과 동일해야 합니다.

### 코드 품질

- [ ] `npm run lint` — 0 오류(경고가 이미 존재함)
- [ ] `npm run typecheck:core` — 청소
- [ ] `npm run typecheck:noimplicit:core` — 정리(엄격)
- [ ] 고정된 `metrics.cycles` 천장 내의 `npm run check:cycles:ratchet` — (베어 `check:cycles` 모든 사이클에서 1을 종료합니다, #15281)
- [ ] 예산 내에서 `npm run check:any-budget:t11` —
- [ ] `npm run check:route-validation:t06` — 청소
- [ ] `npm run check:node-runtime` — 지원 런타임 층 충족(`>=22.22.2 <23`, `>=24.0.0 <27`, `src/shared/utils/nodeRuntimeSupport.ts` 의 `SUPPORTED_NODE_RANGE` 당, `package.json` `engines` 와 정렬됨)

### 테스트

- [ ] `npm run test:unit` — 패스
- [ ] `npm run test:vitest` — 패스(MCP 서버, autoCombo, 캐시)
- [ ] `npm run test:coverage` — 게이트 60/60/60/60 만족 (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass (변경 사항이 DB / 핸들러를 터치하는 경우)
- [ ] `npm run test:combo:matrix` — pass(콤보 전략 매트릭스: 22개 공용 라우팅 전략의 선택 결정을 모두 결정론적으로 증명합니다. 콤보 라우팅, 전략 해결 또는 폴백 로직을 터치할 때 실행)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (게이트 실제 업스트림 연기; VPS `root@192.168.0.15` 에서 읽기 전용 DB 스냅샷 소스; 실제 제공자 조회, 크레딧 비용; CI 에서 실행되지 않음; 게이트 없이 깔끔하게 건너뛰기)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS 라이브 연기: 일반 노드 ESM 통해 라이브 `.15` 서버에 대한 7개의 HTTP 시나리오, `ssh root@192.168.0.15` 필요, creates/deletes `__live_test__*` 콤보만 필요, 실제 공급자에 도달, CI 에서는 실행되지 않음)
- [ ] `npm run test:e2e` — 패스(UI 변경)
- [ ] `npm run test:protocols:e2e` — 패스(MCP/A2A 변경)
- [ ] `npm run test:ecosystem` — 패스

### 후크(허스키 검증됨)

Husky 후크는 `.husky/` 에 있으며 git 작업 시 자동으로 실행됩니다.

- **사전 커밋:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **사전 푸시:** 빠른 결정론적 게이트 — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (2026년 6월 13일에 활성화됨). 의도적으로 `test:unit` 제외합니다(느림, CI `test-unit` 작업으로 처리됨).
  - 릴리스 브랜치를 푸시하기 전에 `npm run test:unit` 수동으로 실행하세요.

후크가 실패하는 경우: 근본적인 문제를 해결하고 `--no-verify` 로 우회하지 마세요.

### 기존 커밋

모든 릴리스 바인딩 커밋은 `type(scope): subject` 형식을 따라야 합니다.

**유효한 유형:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**유효한 범위:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

주요 변경 사항: 범위 뒤에 `BREAKING CHANGE:` 바닥글 또는 `!` 추가합니다(예: `feat(api)!: drop /v0`).

### 선적 서류 비치

- [ ] `npm run check:docs-sync` 통과(사전 커밋으로 자동 실행)
- [ ] `npm run check:docs-all` 패스. 해당 권고 `check:deprecated-versions` OmniRoute (3.6.x 및 이전)에 명시적으로 귀속된 버전에 플래그를 지정하고 날짜를 무시합니다.
- [ ] `npm run check:env-doc-sync` 0을 종료합니다. — 코드 ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env 계약은 그대로 유지됩니다.
- [ ] `npm run check:doc-links` 0을 종료합니다. — 구조 조정 후 깨진 내부 마크다운 참조가 없습니다.
- [ ] storage/runtime 드리프트에 대해 검토된 `docs/architecture/ARCHITECTURE.md`
- [ ] 환경 변수 및 운영 드리프트에 대해 `docs/guides/TROUBLESHOOTING.md` 검토되었습니다.
- [ ] `.env.example` 변경된 경우: `docs/reference/ENVIRONMENT.md` 업데이트되었습니다.
- [ ] 새로운 기능에 UI 있는 경우: `docs/guides/USER_GUIDE.md` 이를 언급합니다.
- [ ] 새로운 기능에 API 있는 경우: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` 업데이트되었습니다.
- [ ] 새로운 기능이 모듈인 경우: 전용 `docs/<MODULE>.md` 존재합니다.
- [ ] 주요 변경 사항인 경우: `docs/guides/TROUBLESHOOTING.md` 에 마이그레이션 메모가 있습니다.

### i18n

- [ ] `npm run i18n:check` 소스 문서와 동기화되어 0 — 번역 상태(`.i18n-state.json`)를 종료합니다(엄격 모드에서는 드리프트된 소스가 없습니다. 경고 모드 권고는 마지막 순간의 문서 수정에는 허용되지만 태그를 지정하기 전에는 0이어야 합니다).
- [ ] `npm run i18n:check-ui-coverage` 80% 커버리지 층 이상에서 모든 UI 로케일마다 0 — 종료합니다.
- [ ] `npm run i18n:sync-ui:dry` 66개 대상 로케일 전체( `en` 소스를 제외한 모든 로케일)에서 누락된 키가 0개라고 보고합니다.
- [ ] 원본 영어 문서가 변경된 경우 태그를 지정하기 전에 `npm run i18n:run` ( `.env` 에서 `OMNIROUTE_TRANSLATION_API_KEY` 필요)를 실행하세요.
- [ ] 사소한 경우 번역 기여를 다음 릴리스로 연기할 수 있습니다( CHANGELOG 에서 추적).

### 데이터베이스 마이그레이션

- [ ] `src/lib/db/migrations/` 새 파일이 있는 경우:
  - [ ] 각 마이그레이션은 멱등성을 갖습니다(`CREATE TABLE IF NOT EXISTS` 등).
  - [ ] 트랜잭션으로 래핑된 마이그레이션
  - [ ] 번호가 올바르게 지정됨(순서에 공백 없음)
- [ ] 새로 설치 시 테스트: `~/.omniroute/omniroute.db` 삭제하고 `npm run dev` 실행합니다.
- [ ] 기존 설치 테스트: DB 백업, 마이그레이션 실행, 스키마 확인
- [ ] 마이그레이션이 테이블을 다시 쓰는 경우 WAL 파일(`-wal`, `-shm`)이 올바르게 처리됨

### 공급자 카탈로그(Zod 검증)

- [ ] 로드 시 유효한 `src/shared/constants/providers.ts` Zod 스키마
  - [ ] 모든 공급자에는 필수 필드(`id`, `label`, `kind` 등)가 있습니다.
  - [ ] 새로운 무료 제공업체에 `freeNote` 제공
  - [ ] OAuth 공급자는 `src/lib/oauth/constants/oauth.ts` 에 `oauthConfig` 등록했습니다.
- [ ] 새로운 공급자가 추가된 경우: `open-sse/executors/` 의 해당 실행자
- [ ] OpenAI 형식이 아닌 경우: `open-sse/translator/` 번역기
- [ ] `open-sse/config/providerRegistry.ts` 에 등록된 모델
- [ ] `tests/unit/` 커버 공급자 분류 및 라우팅의 단위 테스트

### 데스크탑(Electron)

`electron/` 변경된 경우:

- [ ] `npm run electron:smoke:packaged` 패스
- [ ] `:win`, `:mac`, `:linux` 중 하나 이상에 대해 테스트된 빌드
- [ ] 코드 서명 인증서가 만료되지 않음(서명하는 경우)
- [ ] `electron/package.json` 버전이 루트 `package.json` 와 일치함
- [ ] `stable` 로 출시되면 자동 업데이트 채널 포인터가 업데이트됩니다.

### 레이아웃 구축

저장소는 세 개의 서로 다른 출력 디렉토리를 사용합니다. — 절대 혼동하지 않습니다.

| 예배 규칙서 | 목적                                                  | 추적되었나요?  |
| ----------- | ----------------------------------------------------- | -------------- |
| `src/`      | 애플리케이션 소스(TypeScript / TSX)                   | 예             |
| `.build/`   | 중간체 — `next build` 출력 빌드(`distDir`)            | 아니요(무시됨) |
| `dist/`     | `assembleStandalone` 로 조립된 배송 가능한 npm 번들 — | 아니요(무시됨) |

> **운영자 참고사항:** 원격 VPS 이미지 디렉토리는 `/usr/lib/node_modules/omniroute/app/` 유지됩니다. 오직** 저장소 내** 빌드 출력이 이동되었습니다(`app/` → `dist/`). 배포 기술 rsync `dist/` 콘텐츠를 원격 `app/` dir — 로 VPS 경로 변경이 필요하지 않습니다.

**단일 빌드 흐름:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

NOT run `npm run build` 실행하고 — 배포를 위해 별도의 `npm run build:cli` 실행하세요. `npm run build:release` 는 하나의 명령으로 + sentinel을 완전히 재구축합니다.

### 아티팩트 검증

- [ ] `npm run build:release` 가 성공하고 `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` clean — no `app.__qa_backup`, `scripts/scratch`, `package-lock.json` 또는 기타 로컬 잔여물
- [ ] `dist/server.js` 빌드 후에 존재합니다.
- [ ] 선택적 로컬 패키지 런타임 연기: `npm run dev:candidate -- build` 이후 `npm run dev:candidate -- validate` 격리된 `DATA_DIR` 에서 압축된 타르볼을 부팅하고 `/api/health` + `/v1/models` 확인합니다( [기여 골든 경로](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) 참조).

### 태그 지정 및 릴리스

- [ ] `/generate-release-cc` 실행(Claude 코드 기술):
  - `vX.Y.Z` 태그를 생성합니다.
  - 태그 및 분기를 푸시합니다.
  - 변경 로그 본문을 사용하여 GitHub 릴리스를 엽니다.
  - Electron 설치 프로그램 첨부(빌드된 경우)
- [ ] 또는 수동으로:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### 배포

기술 배포는 가벼운 rsync 흐름 — no `npm pack`, no `npm i -g` 사용합니다.

- [ ] 대상과 일치하는 배포 기술을 사용하십시오.
  - `/deploy-vps-local-cc` — 로컬 VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — 둘 다
- [ ] 배포하기 전에 `dist/BUILD_SHA` == `git rev-parse --short HEAD` 확인하세요.
- [ ] 빌드는 `node_modules` 실제인 곳에서 실행되어야 합니다(기본 체크아웃 또는 `npm ci`'d 작업 트리 — NOT 심볼릭 링크된 작업 트리).
- [ ] 연기 테스트 배포 인스턴스:
  - `/dashboard/health` → 확인 버전 문자열이 릴리스와 일치하는지 확인하세요.
  - 알려진 공급자에 대해 `/v1/chat/completions` 요청 실행
  - `/api/monitoring/health` `CLOSED` 회로 차단기를 반환하는지 확인하세요.
  - MCP 전송 응답 확인(`/mcp` HTTP, `/mcp-sse` SSE)

### 출시 후

- [ ] `/capture-release-evidences-cc` 실행(Claude 코드 스킬)
  - 새로운 기능의 WebP screenshots/recordings 캡처
  - 릴리스 노트/블로그 게시물에 첨부
- [ ] 릴리스 발표로 GitHub 토론/ Discord 업데이트
- [ ] 다음 버전의 공개 마일스톤
- [ ] 중요한 경우: 토론을 고정하거나 인앱 배너용 `news.json` 에 게시하세요.

### 레이더 공개 발사 게이트

Radar 발표는 의도적으로 `active: false` 사용하여 커밋됩니다. 활성화는 아래의 모든 항목이 입증된 후 별도의 변경입니다.

- [ ] 스택된 모든 Radar PRs 병합되고 릴리스 팁 CI 녹색입니다.
- [ ] 기본적으로 `RADAR_ENABLED` 여전히 꺼져 있는 상태에서 OSS Radar 경로를 배포하고 연기합니다.
- [ ] 명명된 Radar 호스트에서 `GET /planos`, `/termos`, `/privacidade` 및 `/reembolso` 연기
- [ ] 개인 서비스에서 기록 운영자 identity/contact/address 및 소유자 승인 법적 검토
- [ ] 테스트 모드에서만 Stripe Checkout 및 서명된 웹훅을 연습합니다.
- [ ] 승인된 sender/domain 사용하여 암호화된 거래 이메일 전달을 실행하세요.
- [ ] 백업 복원 및 예산 한도 내에서 감독된 연구 실행 1회 입증
- [ ] 기부 증거를 수락하기 전에 BRL/PIX 검토 정책을 승인하세요.
- [ ] 이전 게이트 이후에만 공개 결제를 활성화한 다음 새 `news.json` ID 활성화하세요.
- [ ] 홈 배너가 현지화된 사본을 사용하고 이전 ID 닫힌 후 새 ID 다시 나타나는지 확인하십시오.

## 임베디드 서비스 스모크 테스트 (v3.8.4+)

임베디드 서비스 변경 사항이 포함된 릴리스를 배포하기 전에 다음을 확인하세요.

### 새 DB 부팅 (마이그레이션 충돌 감지 — v3.8.4 핫픽스 이후 추가됨)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — 부팅을 위해 10초 대기
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'`이 `"9router"`를 반환하는지 확인 (`404` 및 `500`이 아님). 마이그레이션 `071_services.sql`이 적용되고 행이 시드되었는지 확인합니다.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"`가 3개의 행을 반환하는지 확인합니다.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"`가 2개의 행을 반환하는지 확인합니다 (`070_webhooks_kind_metadata.sql`이 적용되었는지 검증).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts`가 통과하는지 확인 — 향후 충돌을 방지합니다.

### 9Router

- [ ] `POST /api/services/9router/install`이 2분 이내에 `installedVersion`과 함께 200을 반환하는지 확인
- [ ] `POST /api/services/9router/start`가 30초 이내에 200과 `state: "running"`을 반환하는지 확인
- [ ] `GET /api/services/9router/status`가 `health: "healthy"`를 보고하는지 확인
- [ ] `"model": "9router/auto/..."`를 사용한 `POST /v1/chat/completions`가 200을 반환하는지 확인 (9Router를 통한 엔드투엔드 라우팅)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard`가 프록시 내부에 9Router 네이티브 UI를 렌더링하는지 확인 (직접적인 `127.0.0.1:port` iframe이 아님)
- [ ] `POST /api/services/9router/rotate-key`가 `{ keyRotated: true }`를 반환하고 서비스가 정상적으로 재시작되는지 확인
- [ ] `POST /api/services/9router/stop`이 200과 `state: "stopped"`를 반환하는지 확인
- [ ] `GET /api/services/9router/logs?tail=50`이 최근 줄을 포함한 `snapshot` 이벤트와 함께 SSE 스트림을 반환하는지 확인
- [ ] `npm`이 PATH에 없는 환경에서 설치할 경우 스택 트레이스가 아닌 친화적인 오류 메시지와 함께 500을 반환하는지 확인

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install`이 2분 이내에 200을 반환하는지 확인
- [ ] `POST /api/services/cliproxy/start`가 30초 이내에 200과 `state: "running"`을 반환하는지 확인
- [ ] `GET /api/services/cliproxy/status`가 `health: "healthy"`를 보고하는지 확인
- [ ] `POST /api/services/cliproxy/stop`이 200과 `state: "stopped"`를 반환하는지 확인
- [ ] `GET /api/services/cliproxy/logs?tail=50`이 SSE 스트림을 반환하는지 확인

### 보안 회귀

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start`가 `403 LOCAL_ONLY`를 반환하는지 확인
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start`가 `403 LOCAL_ONLY`를 반환하는지 확인
- [ ] `/api/services/*`의 오류 응답에 `err.stack` 또는 절대 파일 경로가 포함되지 않는지 확인

## v3.8.0+ 확인 항목

v3.8.x 릴리스를 배포하기 전에 다음 추가 항목을 확인하세요.

- [ ] `omniroute --tray`가 macOS에서 부팅되는지 확인 (`systray2`가 `~/.omniroute/runtime/`에 설치됨)
- [ ] `omniroute --tray`가 Linux에서 부팅되는지 확인 (DISPLAY 필요; 설정되지 않은 경우 정상적으로 오류 처리)
- [ ] `omniroute --tray`가 Windows에서 부팅되는지 확인 (PowerShell NotifyIcon, 추가 바이너리 없음)
- [ ] `omniroute config tray enable`이 자동 시작 항목을 생성하고, disable이 이를 제거하는지 확인
- [ ] `npm install -g omniroute@<this-version>`이 치명적인 종료 없이 postinstall을 실행하는지 확인
- [ ] 업데이트 경로가 선택적 의존성을 유지하는지 확인: `omniroute update --apply`와 자동 업데이트 프로그램이
      `npm install -g … --include=optional`을 실행하여 `optionalDependencies` (`better-sqlite3`,
      `keytar`, `tls-client`, 그리고 llmlingua SLM 스택인 `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`)가 업데이트 후에도 유지되는지 확인합니다. ultra `modelPath` SLM 계층에는
      tinybert 모델도 필요하며, 최초 사용 시 `${DATA_DIR}/models/llmlingua`에 자동으로 다운로드됩니다. Postinstall
      (`scripts/build/colocateOptionals.mjs`)은 이후 SLM 선택적 의존성 클로저를
      `dist/node_modules`에 함께 배치하여 워커가 단일 `@huggingface/transformers` ^4.2.0
      인스턴스를 확인하도록 합니다 — 독립형 트레이스 번들은 transformers만 포함하고 동적으로 임포트되는
      선택적 의존성은 포함하지 않으므로, 이 과정이 없으면 워커가 루트의 transformers에 대해 llmlingua-2를
      로드하게 되고 SLM 계층이 자동으로 조용히 fail-open됩니다.
- [ ] `.env` 없이도 `omniroute status`가 작동하는지 확인 (CLI 토큰 경로, 루프백 전용)
- [ ] `curl http://localhost:20128/api/shutdown`이 401을 반환하는지 확인 (항상 보호되는 라우트)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse`가 401을 반환하는지 확인 (루프백 가드)
- [ ] 최초 실행 시 SQLite 런타임이 `bundled`로 확인되는지 확인 (플랫폼에 맞는 번들이 포함된 바이너리)
- [ ] `node_modules/better-sqlite3`가 삭제되었을 때 SQLite 런타임이 `runtime`으로 대체되는지 확인
- [ ] Smart MCP 필터가 실제 `playwright-mcp browser_snapshot` 출력을 압축하는지 확인 (50% 이상 감소)
- [ ] `skills/omniroute*/SKILL.md` 파일 10개 모두 raw GitHub URL을 통해 공개적으로 가져올 수 있는지 확인
- [ ] 온보딩 마법사가 새로 설정할 때 "How It Works" 계층 둘러보기 단계를 표시하는지 확인
- [ ] 홈 대시보드 계층 적용 범위 위젯에 구성됨/활성 개수가 표시되는지 확인

---

## 3.9.0 LTS 컷(3.8.58에서 리허설됨)

v3.8.59 이후의 다음 버전은 3.9.0이며 그 팁은 `stable/v3` (v3 LTS 라인, npm `latest`) 및 `develop` (v4, 4.0.0으로 변경, npm `nightly`)라는 두 개의 수명이 긴 분기가 됩니다. branch/channel 모델, 전달 포트 및 레이블은 [RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md) 에 있습니다. 계획은 [ROADMAP](../../ROADMAP.md) (3단계)에 있습니다. 컷은 한 번 실행됩니다. 3.8.58은 포크에서 끝까지 연습하고 3.8.59는 [GO/NO-GO 체크리스트](./LTS_GO_NO_GO.md) 로 마무리됩니다.

### 테스트 실행(읽기 전용, 언제든지 안전함)

```bash
npm run release:dry-run-lts-cut                       # the real cut: 3.9.0 from HEAD, previous tag v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # pin the source commit
```

`scripts/release/dry-run-lts-cut.mjs` executes nothing: it reads git and `gh` and prints the whole sequence — preconditions (source resolves, the source repository has full history — a shallow clone cannot push `stable/v3`, the receiving side rejects the pack at the first grafted parent, so cut from a full clone or `git fetch --unshallow origin` first — previous tag exists, `package.json` is the target version, a `release-freeze` issue is open, no open `Release branch not green` issue on an existing release branch — a branch that does not exist reports `?` unknown, never green — omni-queue lands the release PRs (G11: `config/merge-queue/config.json` valid, its `bases` manage the release branch, `mode` `live`, its label exists), the `release/*` ruleset still blocks deletion and force-push, and `stable/v3` and `develop` do not exist yet), the two branch steps, which dormant-workflow triggers and `if:` conditions turn true (and which stay gated by a repository variable or pinned to the canonical repository), the expected dist-tags (`latest` → 3.9.0, `next` and `nightly` empty) and the rollback. Exit `0` = `RESULT: READY`, `1` = a blocking precondition failed (`✗`), `2` = usage error. `--advisory <id,...>` downgrades a check to a warning (`!`) without hiding it.

3.9.0 릴리스 동결이 아직 열려 있는 동안 실제 컷의 테스트 실행을 실행하세요. — 태그 이후 그리고 12c단계가 동결을 해제하기 전에 분기가 생성됩니다.

### 3.8.58 리허설(포크만)

```bash
# 1. Dry-run on the current tip with rehearsal parameters
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Execute against a FORK remote (origin, or any remote whose URL is the canonical
#    repository, is refused; every step asks for confirmation on the terminal)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Exercise the dormant workflows in the fork (workflow_dispatch where the dry-run
#    reports a canonical-repository pin), then roll back
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

개발 범프 커밋은 git 배관(작업 트리는 건드리지 않음)으로 구축되었으며 주기 열기 커밋과 동일한 5개 파일( `package.json`, `open-sse/package.json`, `electron/package.json`, `package-lock.json` 및 `docs/openapi.yaml` 을 범프합니다. `[4.0.0]` CHANGELOG 섹션과 해당 i18n 미러는 첫 번째 PR 이전에 `develop` 에서 열립니다. 스크립트는 npm dist-tags — 를 절대 변경하지 않으며 스크래치 패키지의 내용을 연습합니다.

### PR 미리보기 아티팩트(한 번 빌드하면 동일한 바이트 승격)

`.github/workflows/preview-artifact.yml` PR 헤드에서 하나의 프로덕션 타르볼을 빌드하고 정확한 빌드(#8084 슬라이스 (a))를 검증합니다. 동일한 저장소 PRs 에만 해당. 아무것도 게시되지 않습니다.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # or add the `preview-artifact` label
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo cheaper-inference/OmniRoute
npm install -g ./omniroute-*.tgz                          # preview install
```

실행은 `npm ci`, `npm run build:release`, `npm run check:pack-artifact` 수행하고 tarball을 압축하고 `npm run check:pack-boot` (가짜 비밀, 임시 데이터 디렉터리)를 실행하고 다시 압축하고 다이제스트가 동일하지 않으면 실패합니다. 그런 다음 `artifact-identity.json` (head SHA, base SHA, lockfile hash, platform, arch, node ABI, Bundler, Build Policy — `scripts/release/artifact-identity.mjs`)를 기록하고 별도의 작업에서 tarball을 증명합니다. 미리보기를 승격한다는 것은 해당 tarball을 설치하는 것을 의미합니다. 소스에서 다시 빌드하지 마십시오.

### 컷(3.9.0, GO 이후)

1. [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md) 에 기록된 GO.
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` `RESULT: READY` 인쇄합니다.
3. dry-run 인쇄 — 명령을 사용하여 `origin` 에 직접 분기를 생성합니다. 스크립트는 `origin` 에 대한 푸시를 거부합니다. 검토된 개발 커밋을 재사용하려면 먼저 포크에 대해 3.9.0 팁에서 `--execute` 리허설을 실행하세요. SHAs 모두 인쇄하고 동일한 커밋을 푸시할 수 있습니다.

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. 첫 번째 PR 도착하기 전에 `stable/v3` 및 `develop` ( + 병합 대기열 규칙 세트)를 보호합니다.
5. 휴면 워크플로는 분기 존재에 따라 켜집니다. `forward-port.yml` ( `stable/v3` 로 푸시), `validate-stable-pr.yml` (PRs 에서 `stable/v3` 로) 및 `nightly-v4-build.yml` ( `develop` 빌드). 실행하기 전에 `secrets.FORWARD_PORT_TOKEN` 저장소 비밀을 설정하십시오(따라서 CI 전달 포트 PRs 에서 실행됩니다). 소유자가 저장소 변수 `vars.NIGHTLY_PUBLISH` `true` 로 설정하고 npm Trusted Publishing이 `nightly-v4-build.yml` 승인할 때까지 야간 게시는 중단됩니다. 채널 해상도는 `scripts/release/dist-tag.mjs` 이며, `npm-publish.yml` 사용하는 것과 동일한 리졸버입니다.
6. 채널 확인: `npm view omniroute dist-tags --json` v4가 게시될 때까지 `latest` = 3.9.0을 표시하고 `next` / `nightly` 표시하지 않습니다.
7. 필요한 경우 롤백: `git push origin --delete refs/heads/stable/v3 refs/heads/develop` 및 `npm dist-tag add omniroute@3.8.59 latest`.

---

## 롤백

릴리스에 심각한 문제가 있는 경우:

1. `gh release edit vX.Y.Z --prerelease` (최신 릴리스가 아닌 것으로 표시)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (아직 사용자가 채택하지 않은 경우에만)
3. 또는 `release/vX.Y.0`에서 핫픽스 → 패치 릴리스 `vX.Y.(Z+1)`
4. 즉시 GitHub Discussions와 Discord에서 공지

## 엄격한 규칙

- `main`에 직접 커밋하지 마세요.
- `main` 또는 `release/*` 브랜치에 `git push --force`를 사용하지 마세요.
- Husky 훅을 건너뛰지 마세요(`--no-verify`).
- 비밀 정보, 자격 증명 또는 `.env` 파일을 커밋하지 마세요.
- 커버리지는 ≥60/60/60/60(문장/라인/함수/브랜치)을 유지해야 합니다.
- `src/`, `open-sse/`, `electron/` 또는 `bin/`의 프로덕션 코드를 변경할 때는 항상 테스트를 추가하거나 업데이트하세요.

## 자동 동기화 검사

PR을 열기 전에 로컬에서 문서 동기화 가드를 실행하세요.

```bash
npm run check:docs-sync
```

CI에서도 `.github/workflows/ci.yml`의 lint 작업에서 이 검사를 실행합니다.
