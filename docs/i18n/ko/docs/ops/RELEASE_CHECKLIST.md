# Release Checklist (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **최종 업데이트:** 2026-08-28 — v3.8.51
> 자동화를 위해 Claude Code 스킬을 활용하는 간소화된 릴리스 흐름입니다.
>
> **릴리스 간 큐/브랜치를 green 상태로 유지:** [RELEASE_GREEN.md](./RELEASE_GREEN.md) 참조
> (`/green-prs` 제품군 + `npm run check:release-green` + `/babysit` + nightly). 이를 주기적으로 실행하면 — 특히 **이 체크리스트 전에** 실행하면 — 릴리스 PR이 green 상태로 시작합니다.

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

## npm Trusted Publishing (v3.8.51부터 기본값) — 요청 시 staged, 대체 수단으로 direct

`npm-publish.yml`은 기본적으로 **npm Trusted Publishing (OIDC)** 을 통해 게시합니다.
`stage-npm` 작업(github-hosted)은 실행마다 GitHub의 id-token을 단기 npm
자격 증명으로 교환합니다. 저장소 시크릿에 장기 npm 토큰이 필요하지 않고, 2FA 프롬프트도 없으며, provenance가 연결됩니다.
이는 2FA를 건너뛰는 토큰이 폐기되는 현재 npm 제재를 우회하는 방법입니다.
또한 토큰이 유출되어도 단독으로 게시할 수 없다는 WS1.3 보장을 유지하면서,
v3.8.48까지 프로젝트가 사용하던 완전 자동화 흐름을 복원합니다.

**일회성 설정(소유자):** npmjs.com → 패키지 `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(environment: none). 이 설정이 존재할 때까지 자동 단계는 `ENEEDAUTH`와 함께 실패합니다.
`publish_mode=staged`(아래 참조) 또는 `direct`로 다시 디스패치하세요.

### Staged 게시 (요청 시 — `publish_mode=staged`)

npm-publish 워크플로는 더 이상 직접 게시하지 않습니다. 패키징된 tarball을
부팅(`check:pack-boot`)한 다음 `npm stage publish`를 실행합니다. 정확한 바이트가
레지스트리에 보관되지만 **소유자가 승인하기 전에는 설치할 수 없습니다.**
사람의 2FA 게이트는 이전이 아니라 증명 이후로 이동했습니다.

**워크플로가 green 상태가 된 후 소유자가 수행할 흐름:**

1. `npm stage list omniroute` — stage id를 찾습니다(워크플로 요약에도 출력됨).
2. 스테이징된 바이트를 확인합니다(권장): `npm stage download <id>`를 실행한 다음,
   다운로드한 tarball을 임시 prefix에 설치하고 부팅합니다(`npm run check:pack-boot`가
   CI에서 동일한 pack→install→boot 판정을 자동화함).
3. `npm stage approve <id>` — 2FA 프롬프트가 곧 게시입니다. `npm stage reject <id>`는 폐기합니다.
4. 게시 후 네트워크 확인: (v3.8.49 계획의 WS1.4인) 게시 후 검증기가
   공개 레지스트리에서 게시된 버전을 깨끗한 컨테이너에 설치하고 부팅합니다.

**긴급 대체 수단:** `workflow_dispatch`에서 `publish_mode=direct`를 사용하면
기존의 즉시 `npm publish`가 복원됩니다(스테이징 자체에 문제가 있을 때만 사용하고, 이유를 기록하세요).

**일회성 강화(소유자, npmjs.com):** `omniroute`의 Trusted Publisher를
stage-only 모드로 구성하여 유출된 장기 토큰으로 어디서든 `npm publish`를 직접
실행할 수 없도록 하세요 — CI는 스테이징만 할 수 있고, 소유자의 2FA만 릴리스를 수행합니다.

**손상된 아티팩트 대응 절차(변경 없음):** 기본 대응으로
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"`를 사용하세요
(수 분 내 처리 가능하며 되돌릴 수 있음). `npm unpublish`는 72시간/종속 항목 없음
조건 내에서만 사용하고, 첫 조치로는 절대 사용하지 마세요. Docker에서는 버전 태그를
다시 작성하지 마세요 — 롤백은 `latest`를 마지막 정상 digest로 다시 가리키는 것입니다.

**Docker Hub `latest` (모든 안정 SemVer 게시에 필수):**
`docker-publish` 워크플로는 **`X.Y.Z`와, `should-promote-latest.sh`가 이것이
가장 높은 안정 SemVer라고 판단하는 경우 `:latest`도 모두 태그해야 하며**, 두 태그는
동일한 digest를 사용해야 합니다. 작업 후 Hub의 `latest` digest는 새 SemVer digest와
같아야 하고 `last_updated`도 변경되어야 합니다. 릴리스 노트에서 git에만 존재하는
수정 사항을 언급하면서 `:latest`를 이전 빌드에 그대로 두지 마세요.
Compose 빠른 시작은 `:latest`를 사용하고, GitOps에서는 계속 `X.Y.Z`를 고정해야 합니다.
[Docker 릴리스 채널](../guides/DOCKER_GUIDE.md#release-channels) 및 #10317을 참조하세요.

**Docker Hub 조직 저장소(`cheaperinference/omniroute`):** Docker Hub는
저장소를 네임스페이스 간에 이동할 수 없으므로 `diegosouzapw/omniroute`는 pull 기록과
모든 릴리스를 유지합니다. `docker-publish`의 `mirror-org-dockerhub` 작업은
릴리스된 각 버전(및 승격된 경우 `:latest`)을 `ghcr.io/cheaper-inference/omniroute`에서
조직 저장소로 복사합니다. 이 작업에는 `DOCKERHUB_ORG_USERNAME` /
`DOCKERHUB_ORG_TOKEN` 시크릿이 필요합니다. 시크릿이 없으면 작업은
"Docker Hub org mirror skipped" 경고와 함께 green 상태를 유지하며 다른 레지스트리는
정상적으로 게시됩니다. 이후 릴리스된 버전을 그곳에 게시하려면 **Actions → Mirror Docker image to the Docker Hub org → Run
workflow**를 `version=X.Y.Z`와 함께 실행하세요(가장 높은 안정 버전인 경우
`promote_latest`도 지정). 기존 이미지를 복사할 뿐 다시 빌드하지 않습니다.

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

### 릴리스 전

- [ ] 이 릴리스 대상으로 지정된 모든 PR이 `release/vX.Y.0`에 병합됨
- [ ] 이 버전에 대한 모든 미해결 Linear/이슈 항목이 종료되었거나 다음 마일스톤으로 이관됨
- [ ] `release/vX.Y.0` 브랜치의 CI가 통과함
- [ ] 코드에 `TODO(release)` 마커가 없음: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker 기본 이미지가 최신 상태임 (현재 `node:24.15.0-trixie-slim`)

### 버전 및 변경 로그

- [ ] `/version-bump-cc <patch|minor|major>` 실행 (Claude Code 스킬)
  - `package.json`, `electron/package.json`의 버전을 올림
  - 마지막 태그 이후의 git 커밋으로부터 `CHANGELOG.md`를 재생성함
  - README.md 배지를 업데이트함
- [ ] `CHANGELOG.md`를 수동으로 검토하고 필요한 경우 커밋 메시지를 정리함
- [ ] `CHANGELOG.md`의 최신 semver 섹션이 `package.json` 버전과 일치함
- [ ] 향후 작업을 위해 `## [Unreleased]`를 변경 로그의 첫 번째 섹션으로 유지함
- [ ] `docs/openapi.yaml` → `info.version`이 `package.json` 버전과 일치해야 함

### 코드 품질

- [ ] `npm run lint` — 오류 0개 (경고는 기존 항목)
- [ ] `npm run typecheck:core` — 문제 없음
- [ ] `npm run typecheck:noimplicit:core` — 문제 없음 (엄격 모드)
- [ ] `npm run check:cycles:ratchet` — 고정된 `metrics.cycles` 상한 이내
      (일반 `check:cycles`는 사이클이 하나라도 있으면 종료 코드 1 반환, #15281)
- [ ] `npm run check:any-budget:t11` — 예산 이내
- [ ] `npm run check:route-validation:t06` — 문제 없음
- [ ] `npm run check:node-runtime` — 지원 런타임 하한 충족
      (`src/shared/utils/nodeRuntimeSupport.ts`의 `SUPPORTED_NODE_RANGE`에 따라
      `>=22.22.2 <23`, `>=24.0.0 <27`; `package.json`의 `engines`와 일치)

### 테스트

- [ ] `npm run test:unit` — 통과
- [ ] `npm run test:vitest` — 통과 (MCP 서버, autoCombo, 캐시)
- [ ] `npm run test:coverage` — 게이트 60/60/60/60 충족 (문장/라인/함수/분기)
- [ ] `npm run test:integration` — 통과 (변경 사항이 DB/핸들러에 영향을 주는 경우)
- [ ] `npm run test:combo:matrix` — 통과 (콤보 전략 매트릭스: 공개 라우팅 전략 22개의 선택 결정을
      결정론적으로 검증함; 콤보 라우팅, 전략 확인 또는 폴백 로직을 변경할 때 실행)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **선택 사항/수동 실행**
      (게이트된 실제 업스트림 스모크 테스트; VPS `root@192.168.0.15`에서 읽기 전용 DB 스냅샷을 가져옴;
      실제 제공자를 호출하고 크레딧이 소요됨; CI에서는 실행되지 않음; 게이트 없이 정상적으로 건너뜀)
- [ ] `npm run test:combo:live:vps` — **선택 사항/수동 실행**
      (3단계 VPS 실시간 스모크 테스트: 일반 Node ESM을 통해 실시간 `.15` 서버에 대한 HTTP 시나리오 7개;
      `ssh root@192.168.0.15` 필요; `__live_test__*` 콤보만 생성/삭제함; 실제 제공자를 호출함; CI에서는 실행되지 않음)
- [ ] `npm run test:e2e` — 통과 (UI 변경)
- [ ] `npm run test:protocols:e2e` — 통과 (MCP/A2A 변경)
- [ ] `npm run test:ecosystem` — 통과

### 훅 (Husky 검증)

Husky 훅은 `.husky/`에 있으며 git 작업 시 자동으로 실행됩니다.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** 빠른 결정론적 게이트 — `npm run check:any-budget:t11 && npm run check:tracked-artifacts`
  (2026-06-13에 활성화됨). 의도적으로 `test:unit`을 제외함 (느림; CI의 `test-unit` 작업에서 처리됨).
  - 릴리스 브랜치에 푸시하기 전에 `npm run test:unit`을 수동으로 실행하세요.

훅이 실패하면 `--no-verify`로 우회하지 말고 근본 원인을 수정하세요.

### Conventional Commits

릴리스 대상인 모든 커밋은 `type(scope): subject` 형식을 따라야 합니다.

**유효한 유형:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**유효한 범위:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

호환성이 깨지는 변경: `BREAKING CHANGE:` 푸터를 추가하거나 범위 뒤에 `!`를 추가합니다
(예: `feat(api)!: drop /v0`).

### 문서

- [ ] `npm run check:docs-sync` 통과 (pre-commit에 의해 자동 실행)
- [ ] `npm run check:docs-all` 통과 (통합 검사: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync`가 0으로 종료 — 코드 ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` 환경 변수 계약이 유지됨
- [ ] `npm run check:doc-links`가 0으로 종료 — 구조 변경 후 끊어진 내부 마크다운 참조 없음
- [ ] `docs/architecture/ARCHITECTURE.md`에서 스토리지/런타임 불일치 검토
- [ ] `docs/guides/TROUBLESHOOTING.md`에서 환경 변수 및 운영 불일치 검토
- [ ] `.env.example`이 변경된 경우: `docs/reference/ENVIRONMENT.md` 업데이트
- [ ] 새 기능에 UI가 있는 경우: `docs/guides/USER_GUIDE.md`에 해당 기능 언급
- [ ] 새 기능에 API가 있는 경우: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` 업데이트
- [ ] 새 기능이 모듈인 경우: 전용 `docs/<MODULE>.md` 존재
- [ ] 호환성이 깨지는 변경인 경우: `docs/guides/TROUBLESHOOTING.md`에 마이그레이션 참고 사항 추가

### i18n

- [ ] `npm run i18n:check`가 0으로 종료 — 번역 상태(`.i18n-state.json`)가 원본 문서와 동기화됨 (엄격 모드에서 변경 이력이 남은 원본 없음; 경고 모드의 안내는 마감 직전 문서 수정에 허용되지만, 태그 생성 전에는 0이어야 함)
- [ ] `npm run i18n:check-ui-coverage`가 0으로 종료 — 모든 UI 로케일의 커버리지가 80% 기준 이상
- [ ] `npm run i18n:sync-ui:dry`가 대상 로케일 66개 전체에서 누락된 키 0개를 보고 (원본인 `en`을 제외한 모든 로케일)
- [ ] 원본 영어 문서가 변경된 경우, 태그 생성 전에 `npm run i18n:run` 실행 (`.env`에 `OMNIROUTE_TRANSLATION_API_KEY` 필요)
- [ ] 번역 기여가 사소한 변경인 경우 다음 릴리스로 미룰 수 있음 (CHANGELOG에 기록)

### 데이터베이스 마이그레이션

- [ ] `src/lib/db/migrations/`에 새 파일이 있는 경우:
  - [ ] 각 마이그레이션은 멱등적이어야 함 (`CREATE TABLE IF NOT EXISTS` 등)
  - [ ] 마이그레이션은 트랜잭션으로 래핑
  - [ ] 올바르게 번호가 지정됨 (시퀀스에 누락 없음)
- [ ] 새로 설치한 환경에서 테스트: `~/.omniroute/omniroute.db`를 삭제하고 `npm run dev` 실행
- [ ] 기존 설치 환경에서 테스트: DB를 백업하고 마이그레이션을 실행한 후 스키마 확인
- [ ] 마이그레이션에서 테이블을 다시 작성하는 경우 WAL 파일(`-wal`, `-shm`)이 올바르게 처리됨

### 프로바이더 카탈로그 (Zod 검증)

- [ ] `src/shared/constants/providers.ts` Zod 스키마가 로드 시 유효함
  - [ ] 모든 프로바이더에 필수 필드(`id`, `label`, `kind` 등)가 있음
  - [ ] 새 무료 프로바이더에 `freeNote`가 제공됨
  - [ ] OAuth 프로바이더에 `src/lib/oauth/constants/oauth.ts`에 등록된 `oauthConfig`가 있음
- [ ] 새 프로바이더를 추가한 경우: `open-sse/executors/`에 해당 실행기 추가
- [ ] OpenAI 형식이 아닌 경우: `open-sse/translator/`에 변환기 추가
- [ ] `open-sse/config/providerRegistry.ts`에 모델 등록
- [ ] `tests/unit/`의 단위 테스트에서 프로바이더 분류 및 라우팅을 다룸

### 데스크톱 (Electron)

`electron/`이 변경된 경우:

- [ ] `npm run electron:smoke:packaged` 통과
- [ ] `:win`, `:mac`, `:linux` 중 하나 이상에 대해 빌드 테스트
- [ ] 코드 서명 인증서가 만료되지 않음 (서명하는 경우)
- [ ] `electron/package.json` 버전이 루트 `package.json`과 일치
- [ ] `stable`로 릴리스하는 경우 자동 업데이트 채널 포인터 업데이트

### 빌드 레이아웃

저장소는 서로 구분되는 세 개의 출력 디렉터리를 사용합니다 — 절대 혼동하지 마세요:

| 디렉터리  | 용도                                               | 추적 여부           |
| --------- | -------------------------------------------------- | ------------------- |
| `src/`    | 애플리케이션 소스 (TypeScript / TSX)               | 예                  |
| `.build/` | 빌드 중간 산출물 — `next build` 출력 (`distDir`)   | 아니요 (gitignored) |
| `dist/`   | 배포 가능한 npm 번들 — `assembleStandalone`이 조립 | 아니요 (gitignored) |

> **운영자 참고:** 원격 VPS 이미지 디렉터리는 계속 `/usr/lib/node_modules/omniroute/app/`입니다.
> 변경된 것은 **저장소 내부** 빌드 출력뿐입니다 (`app/` → `dist/`). 배포 스킬은
> `dist/` 콘텐츠를 원격 `app/` 디렉터리로 rsync하므로 VPS 경로를 변경할 필요가 없습니다.

**단일 빌드 흐름:**

```
npm run build:release
  └─ rm -rf .build dist          (정리)
  └─ next build → .build/next/   (중간 산출물)
  └─ assembleStandalone          (standalone + static + public + natives를 dist/로 복사)
  └─ dist/BUILD_SHA 작성         (HEAD 센티널)
```

배포를 위해 `npm run build` 후 별도로 `npm run build:cli`를 실행하지 마세요 — 한 번의 명령으로 정리된 재빌드와 센티널을 수행하는 `npm run build:release`를 사용하세요.

### 산출물 검증

- [ ] `npm run build:release` 성공 및 `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact`가 깨끗함 — `app.__qa_backup`, `scripts/scratch`, `package-lock.json` 또는 기타 로컬 잔여물 없음
- [ ] 빌드 후 `dist/server.js` 존재
- [ ] 선택적 로컬 패키징 런타임 스모크: `npm run dev:candidate -- build` 후 `npm run dev:candidate -- validate` 실행 시 격리된 `DATA_DIR`에서 패키징된 tarball을 부팅하고 `/api/health` + `/v1/models` 확인 ([Contribution Golden Path](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) 참조)

### 태그 생성 및 릴리스

- [ ] `/generate-release-cc` 실행 (Claude Code 스킬):
  - 태그 `vX.Y.Z` 생성
  - 태그 및 브랜치 푸시
  - 변경 로그 본문과 함께 GitHub Release 열기
  - Electron 설치 프로그램 첨부 (빌드된 경우)
- [ ] 또는 수동으로:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### 배포

배포 스킬은 가벼운 rsync 흐름을 사용합니다 — `npm pack`도, `npm i -g`도 사용하지 않습니다:

- [ ] 대상에 맞는 배포 스킬을 사용합니다:
  - `/deploy-vps-local-cc` — 로컬 VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — 둘 다
- [ ] 배포 전에 `dist/BUILD_SHA` == `git rev-parse --short HEAD`인지 확인합니다.
- [ ] `node_modules`가 실제 디렉터리인 환경에서 빌드해야 합니다(메인 체크아웃 또는 `npm ci`를 실행한 worktree — 심볼릭 링크된 worktree는 사용하지 않음).
- [ ] 배포된 인스턴스의 스모크 테스트:
  - `/dashboard/health` 열기 → 버전 문자열이 릴리스와 일치하는지 확인
  - 알려진 공급자를 대상으로 `/v1/chat/completions` 요청 실행
  - `/api/monitoring/health`가 `CLOSED` 회로 차단기를 반환하는지 확인
  - MCP 전송이 응답하는지 확인(`/mcp` HTTP, `/mcp-sse` SSE)

### 릴리스 후

- [ ] `/capture-release-evidences-cc` 실행(Claude Code 스킬)
  - 새 기능의 WebP 스크린샷/녹화 캡처
  - 릴리스 노트/블로그 게시물에 첨부
- [ ] 릴리스 공지로 GitHub Discussions / Discord 업데이트
- [ ] 다음 버전의 마일스톤 생성
- [ ] 긴급한 경우: 토론을 고정하거나 앱 내 배너를 위해 `news.json`에 게시

### Radar 공개 출시 게이트

Radar 공지는 의도적으로 `active: false` 상태로 커밋되어 있습니다. 아래 모든 항목에 대한 증거가 확보된 후 별도의 변경을 통해 활성화합니다.

- [ ] 모든 Radar 스택 PR이 병합되고 릴리스 기준 CI가 통과함
- [ ] `RADAR_ENABLED`를 기본적으로 계속 비활성화한 상태에서 OSS Radar 라우트를 배포하고 스모크 테스트
- [ ] 지정된 Radar 호스트에서 `GET /planos`, `/termos`, `/privacidade`, `/reembolso` 스모크 테스트
- [ ] 운영자 신원/연락처/주소와 소유자가 승인한 법률 검토를 비공개 서비스에 기록
- [ ] 테스트 모드에서만 Stripe Checkout 및 서명된 웹훅 실행
- [ ] 승인된 발신자/도메인을 사용해 암호화된 트랜잭션 이메일을 한 건 전송
- [ ] 백업 복원을 입증하고 감독하에 예산 한도를 설정한 연구 실행을 한 번 수행
- [ ] 기부 증거를 수락하기 전에 BRL/PIX 검토 정책 승인
- [ ] 앞선 게이트를 통과한 후에만 공개 Checkout을 활성화하고, 새로운 `news.json` ID 활성화
- [ ] Home 배너가 현지화된 문구를 사용하며, 이전 ID를 해제한 후 새로운 ID가 다시 표시되는지 확인

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
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
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
