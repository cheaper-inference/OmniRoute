# Database Schema & Operations Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **요약**: OmniRoute는 기본 저장소로 **WAL 저널링을 사용하는 SQLite**를 사용하며, 민감한 필드의 저장 데이터에는 **AES-256-GCM** 암호화를 적용합니다. 이 가이드에서는 스키마, 마이그레이션, 백업/복구 및 운영 런북을 다룹니다.

**출처:**

- `src/lib/db/core.ts` — 싱글턴 + SCHEMA_SQL(기본 테이블 17개)
- `src/lib/db/migrationRunner.ts` — 버전별 마이그레이션
- `src/lib/db/migrations/` — 버전별 SQL 파일 167개
- `src/lib/db/encryption.ts` — 암호화 헬퍼
- `src/lib/db/backup.ts` — 백업 내보내기/가져오기
- `src/lib/db/healthCheck.ts` — 상태 진단

---

## SQLite를 사용하는 이유

OmniRoute는 다음과 같은 여러 이유로 PostgreSQL/MySQL 대신 SQLite를 선택했습니다.

| 요소          | SQLite                                | PostgreSQL                        |
| ------------- | ------------------------------------- | --------------------------------- |
| **배포**      | 임베디드 방식 — 별도 서버 불필요      | 서버 설정 필요                    |
| **암호화**    | 애플리케이션 계층(AES-256-GCM)        | TDE 기본 제공                     |
| **성능**      | 소규모/중간 규모 워크로드에서 더 빠름 | 대규모 동시 쓰기에 더 적합        |
| **동시성**    | WAL 모드로 동시 읽기 가능             | 완전한 MVCC                       |
| **백업**      | 단일 파일 복사                        | `pg_dump` 또는 파일 시스템 스냅샷 |
| **사용 사례** | 사용자별 설치, 임베디드 환경          | 멀티 테넌트 SaaS                  |

**단일 사용자, 단일 인스턴스** 배포(OmniRoute의 주요 사용 사례)에서는 SQLite가 더 간단하고 빠릅니다.

### WAL 저널링

`core.ts`는 **WAL(Write-Ahead Logging) 모드**로 데이터베이스를 엽니다.

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL을 사용하면 쓰기 작업 중에도 **동시 읽기**가 가능합니다. 이는 요청이 기록되는 동안 쿼리를 실행하는 대시보드에 중요합니다.

기본 캐시 크기는 **65,536 KiB(64 MiB)**입니다. SQLite는 음수
`cache_size`를 KiB 단위의 대략적인 상한으로 해석하고 필요에 따라 페이지를 할당합니다.
**설정 > 시스템 및 저장소 > 캐시 크기**에는 **1~1,000,000 KiB** 범위의 정수 값을
입력할 수 있습니다. 설정을 저장하면 현재 데이터베이스 연결에 적용되며,
OmniRoute는 시작 시 저장된 값을 복원합니다.

---

## 데이터베이스 위치

SQLite 파일은 다음 위치에 저장됩니다.

| OS      | 경로                                                     |
| ------- | -------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                            |
| macOS   | `~/.omniroute/storage.sqlite`                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR`을 통해 구성 가능) |

관련 파일:

- `storage.sqlite-wal` — 미리 쓰기 로그
- `storage.sqlite-shm` — 공유 메모리 파일
- `call_logs/` — 요청 페이로드 아티팩트(활성화된 경우)

**위치 재정의:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## 도메인 모듈 아키텍처

OmniRoute의 데이터베이스에는 `src/lib/db/`에 **110개의 최상위 TypeScript 모듈**이 있습니다. 각 도메인 모듈은 다음 원칙을 따릅니다.

- 하나 이상의 특정 테이블을 소유합니다
- 타입이 지정된 CRUD 함수를 내보냅니다
- 다른 모듈의 테이블에 절대 접근하지 않습니다
- DB에 접근하기 위해 `core.ts`의 `getDbInstance()`를 사용합니다

### 110개의 최상위 DB 모듈

OmniRoute에는 `src/lib/db/`에 **110개의 최상위 TypeScript 파일**이 있습니다. 다음은 핵심 모듈의 일부 예시이며, 전체 목록은 디렉터리 목록을 참조하세요.

| 모듈                    | 테이블                                                         | 역할                                                 |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API 키 제공자 등록 및 자격 증명 관리           |
| `models.ts`             | `key_value` (모델 데이터)                                      | 모델 정의, 기능, 가격                                |
| `combos.ts`             | `combos`                                                       | 콤보 라우팅 구성 및 순서 지정                        |
| `apiKeys.ts`            | `api_keys`                                                     | API 키 수명 주기, 범위, 할당량 추적                  |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | 시스템 구성 및 공유 KV 저장소                        |
| `backup.ts`             | —                                                              | 백업 내보내기/가져오기 작업                          |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | 프록시 구성 및 라우팅 규칙                           |
| `prompts.ts`            | `prompt_templates`                                             | 재사용 가능한 프롬프트 템플릿 및 버전 관리           |
| `webhooks.ts`           | `webhooks`                                                     | 이벤트 기반 웹훅 구독 및 로그                        |
| `detailedLogs.ts`       | `request_detail_logs`                                          | 요청별 감사 로깅(선택 사항, 대용량)                  |
| `domainState.ts`        | `domain_*` (5개 테이블)                                        | 도메인 예산, 회로 차단기, 잠금, 폴백 체인, 비용 이력 |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A용 허용 목록 API 키                           |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | 과거 할당량 사용량                                   |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | 모델을 기본 콤보에 매핑                              |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI 전용 영구 상태                                   |
| `encryption.ts`         | —                                                              | 필드 암호화/복호화를 위한 헬퍼                       |
| `readCache.ts`          | —                                                              | 읽기 작업이 많은 경우를 위한 인메모리 캐시           |
| `secrets.ts`            | `key_value` (암호화된 항목)                                    | 암호화된 비밀 정보 저장소                            |
| `stateReset.ts`         | —                                                              | 테스트를 위한 DB 상태 삭제/재설정                    |
| `contextHandoffs.ts`    | `context_handoffs`                                             | 에이전트 핸드오프를 위한 세션 컨텍스트               |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | 사용량 추적                                          |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | 압축 구성                                            |

### 모듈 경계

핵심 아키텍처 규칙은 **모듈이 서로의 테이블에 직접 접근하지 않는 것**입니다. 다른 모듈의 데이터를 사용하려면 해당 모듈에서 함수를 가져오세요.

```ts
// ❌ 잘못된 방식: 다른 모듈에서 직접 SQL 실행
db.prepare("SELECT * FROM provider_connections").all();

// ✅ 올바른 방식: providers 모듈 함수 사용
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

이 규칙은 코드 리뷰를 통해 적용됩니다. 정적 검사는 없지만, 위반 사항은 지적됩니다.

---

## 기본 스키마(테이블 17개)

`core.ts`는 `SCHEMA_SQL`에 17개의 기본 테이블을 정의합니다. 이 테이블들은 마이그레이션 `001_initial_schema.sql`에 의해 생성되며 핵심 스키마를 구성합니다.

### 핵심 테이블(초기 마이그레이션에서 생성)

| 테이블                     | 용도                        | 주요 열                                                                 |
| -------------------------- | --------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | 공급자 자격 증명(암호화됨)  | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | 공급자 노드 라우팅 정보     | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | 범용 KV 저장소              | `namespace`, `key`, `value`                                             |
| `combos`                   | 라우팅 조합 정의            | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | 게이트웨이용 API 키         | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | 데이터베이스 메타데이터     | `key`, `value`                                                          |
| `usage_history`            | 요청 사용량 기록            | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | 요청 페이로드 및 응답       | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | 프록시 요청 로그            | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | 모델-공급자 체인            | `model`, `chain`                                                        |
| `domain_budgets`           | 도메인별 지출 예산          | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | 예산 재설정 기록            | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | 도메인별 비용 추적          | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | 도메인 요청 제한 상태       | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | 도메인별 서킷 브레이커 상태 | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM 응답 캐시               | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | 과거 할당량 스냅샷          | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### 추가 테이블(후속 마이그레이션에서 추가)

후속 마이그레이션에서는 다음과 같은 테이블을 추가합니다.

- `cli_tool_state`(마이그레이션 011) — CLI 도구 상태
- `mcp_*` 테이블 — MCP 서버 감사
- `a2a_*` 테이블 — A2A 작업 상태
- `usage_*` 테이블 — 사용량 추적
- `plugin_*` 테이블 — 플러그인 시스템
- `skill_executions` — 스킬 실행 기록
- `memory_*` 테이블 — 메모리 시스템
- `compression_*` 테이블 — 압축 시스템
- `webhook_*` 테이블 — 웹훅 전송 로그
- `acp_*` 테이블 — Agent Client Protocol
- `oneproxy_*` 테이블 — 1proxy 마켓플레이스
- `proxy_assignments` — 프록시 범위 바인딩
- `detailed_call_artifacts` — 호출 로그 아티팩트 메타데이터
- `quota_alert_history` — 할당량 알림 감사
- `command_code_auth_sessions` — Command Code OAuth 세션

약 30개 이상의 전체 테이블 목록은 `src/lib/db/migrations/`에 있습니다.

---

## 마이그레이션

OmniRoute** 버전이 지정된 멱등성 마이그레이션** `src/lib/db/migrations/` 에서 . 각 마이그레이션은 단일 SQL 파일입니다. 두 가지 명명 형식이 공존합니다. `_omniroute_migrations` 에 기록된 버전은 숫자 접두사입니다.

### 마이그레이션 이름 지정

| 체재                                           | 예                                   | 용도                                                                                                                                       |
| ---------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `NNN_description.sql` (정확히 3자리)           | `241_seen_models.sql`                | 이전 시리즈 `001`–`241`. 타임스탬프 형식이 도착했을 때 고정됨(`240` 및 `241` 그 직전에 병합됨): 새 파일에는 순차 번호가 부여되지 않습니다. |
| `YYYYMMDDHHMMSS_description.sql` (14자리, UTC) | `20261113120000_add_usage_index.sql` | 2026년 11월 13일부터 생성된 모든 마이그레이션입니다.                                                                                       |

변경 이유: 순차 번호를 사용하면 병렬 PRs 동일한 다음 번호를 선택했으며 병합하기 전에 하나를 제외한 모든 번호를 다시 지정해야 했습니다. UTC 타임스탬프는 각 PR 에 자체 버전을 제공합니다.

타임스탬프 형식에 대한 규칙( `npm run check:migration-numbering` 에 의해 시행되고 `scripts/check/lib/migrationNaming.mjs` 의 생성기와 공유됨):

- 타임스탬프는 실제 UTC 날짜 및 시간이며, `20261113000000` 보다 빠르지 않고 향후 10분 이내입니다.
- 설명은 문자(`a-z`, `0-9`, 단어 사이의 단일 `_` )로 시작하는 소문자 `snake_case` 이며 최대 80자입니다.
- 타임스탬프가 동일한 두 파일이 중복되었습니다.
- 간격 없음 규칙은 이전 계열에만 적용됩니다. 알려진 간격 `026`, `055` 및 `121` 를 제외하고 `001` 에서 `241` 까지의 모든 숫자가 존재해야 합니다. `241` (또는 이전 파일)를 삭제하면 게이트가 실패합니다. `001` 및 `241` `KNOWN_GAPS` 허용 목록에 추가될 수 없습니다. 타임스탬프가 있는 파일은 간격을 만들지 않습니다.
- `src/lib/db/migrations/` 의 모든 항목은 유효한 소문자 `.sql` 이름을 가진 일반 파일이어야 합니다. 디렉토리, 심볼릭 링크, `.SQL` 또는 `.sql.bak` 파일, 숨겨진 파일 또는 공백이 있는 이름은 실행기가 자동으로 건너뛰거나 부팅 시 충돌하기 때문에 게이트에 실패합니다.

**주문을 적용합니다.** 실행기는 텍스트가 아닌 접두사의 숫자 값을 기준으로 정렬합니다. 이전 `001`–`241` 파일을 먼저 정렬한 다음 타임스탬프 순서대로 타임스탬프가 있는 파일을 정렬한 다음 `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` 에 등록된 모든 네임스페이스 디렉터리( `ee-001` 등의 버전)를 정렬합니다. 보류 중인 마이그레이션은 버전이 `_omniroute_migrations` 에 없는 모든 파일이므로 새 분기 이후에 병합되는 이전 분기의 마이그레이션은 기존 데이터베이스에 계속 적용됩니다.

**타임스탬프는 병합 순서가 아닌 생성 순서입니다.** 마이그레이션이 마이그레이션으로 생성된 테이블이나 열에 의존하는 경우** 최신** 타임스탬프(예: 먼저 병합된 다른 PR 의 데이터베이스)가 있으면 새 데이터베이스가 먼저 실행되고 실패합니다. PR 가 아직 열려 있는 동안 `npm run db:new-migration` 로 파일 이름을 다시 생성하여 최신 타임스탬프를 얻거나 독립적으로 만듭니다. `npm run test:migrations:fresh` 모든 마이그레이션을 빈 데이터베이스에 적용하고 이를 포착합니다.

### 병합된 마이그레이션은 삭제되거나 이름이 변경되지 않습니다.

마이그레이션 파일이 릴리스 브랜치 또는 `main` 에 있으면 이미 동족체 및 개발자 데이터베이스, VPS 설치 및 Enterprise 동기화에서 실행되었습니다. 그때부터:

- **절대 삭제하지 마세요.** 새로 설치하면 스키마가 손실되지만 업그레이드된 데이터베이스에서는 스키마가 유지됩니다.
- **이름을 바꾸지 마십시오.** `_omniroute_migrations` 의 버전은 더 이상 파일과 일치하지 않으므로 이미 해당 버전을 적용한 모든 데이터베이스가 다시 실행됩니다. 그런 다음 비멱등성 SQL 데이터를 복제하거나 부팅을 중지합니다.
- **다른 스키마가 필요합니까?** `npm run db:new-migration` 사용하여 새 마이그레이션을 만듭니다.

이름 바꾸기는 아직 병합되지 않은 파일에 대해서만 안전하며, 이는 게이트의 힌트가 참조하는 경우입니다. 여기서 릴리스 태그는 아무것도 변경하지 않습니다. `release/v*` 지점에 대한 모든 푸시는 Docker `:next` 이미지를 게시하고 동족체, VPS 설치 및 엔터프라이즈 동기화에서 실행되므로 `vX.Y.Z` 태그가 존재하기 전에 병합된 마이그레이션이 실제 데이터베이스에서 실행됩니다. 태그가 지정되었는지 여부에 관계없이 기본 파일을 제거할 때마다 게이트가 실패합니다.

- **병합된 마이그레이션을 되돌리는 중입니다.** 파일을 삭제하는 `git revert` 게이트에 실패합니다. 파일을 유지하고 새 마이그레이션에서 해당 스키마를 실행 취소합니다: `npm run db:new-migration -- <description>`, `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` 등. 업그레이드되고 새로운 데이터베이스는 동일한 스키마로 끝납니다.
- **허용되는 이름 변경: 호환성 항목 및 동일한 콘텐츠.** 병합된 파일을 이동해야 하는 경우(예: 두 개의 병합된 파일이 타임스탬프를 공유하고 실행기가 버전 충돌로 중지되는 경우) SQL 를 건드리지 않고 나중 파일의 이름을 바꾸고 `src/lib/db/migrationRunner/constants.ts` 에서 `RENAMED_MIGRATION_COMPATIBILITY` 에 `{ fromVersion, fromName, toVersion, toName }` 추가합니다. 이전 버전을 적용한 데이터베이스는 파일을 다시 실행하는 대신 `_omniroute_migrations` 행을 이동합니다. 게이트는 이러한 이름 변경에 대해 경고하고 새 타임스탬프에 관계없이 항상 정류 검사를 실행합니다. 새로 설치하면 파일을 새 위치에 적용하지만 업그레이드된 데이터베이스는 그렇지 않으므로 이전 타임스탬프 근처의 새 타임스탬프를 선택합니다. 콘텐츠가 변경되거나(스키마 변경이 여전히 새 마이그레이션에 적용됨) 항목의 대상 파일이 디스크에 없는 경우 게이트 이름 바꾸기가 실패합니다.
- **동일한 타임스탬프 내에서 이름을 바꾸지 마십시오.** 타임스탬프를 유지하고 설명만 변경하는 이름 바꾸기는 항목 유무에 관계없이 게이트에 실패합니다. `toVersion` 가 `fromVersion` 와 동일한 항목을 사용하면 실행기는 이전 `_omniroute_migrations` 행을 삭제하고 이미 실행한 모든 데이터베이스에 파일을 다시 적용합니다. 항목이 없으면 실행기는 버전만 추적합니다. 즉, 해당 데이터베이스의 파일을 건너뛰고(새 콘텐츠는 그곳에서 실행되지 않음) 부팅할 때마다 번호 다시 매기기 오류를 기록합니다. 다른 타임스탬프와 호환성 항목을 사용하거나 이름을 유지하세요.
- **게이트는 이름이 변경된 파일이 다시 실행되지 않는지 확인합니다.** 적용되는 각 이름 변경에 대해 게이트는 새 파일 이름을 `--must-not-apply` 사용한 정류 검사에 전달합니다. 검사는 실제 실행기로 업그레이드된 데이터베이스를 부팅하고 실행기가 해당 파일을 다시 적용하는 경우(예를 들어 항목의 버전이나 이름이 잘못되었거나 게이트의 텍스트 파서가 TypeScript 와 다르게 `constants.ts` 읽었기 때문에) 게이트가 `migration renomeada rodaria de novo` 와 함께 실패하고 항목의 이전 버전과 새 버전 및 이름을 확인하라는 메시지를 표시합니다.

### 게이트가 베이스에 대해 확인하는 사항

풀 요청 및 병합 대기열 실행 시 `npm run check:migration-numbering` 디스크의 `src/lib/db/migrations/` 기본 분기의 동일한 디렉터리와 비교합니다. 기본 순서는 `--base-latest-tag`, `--base <ref>`, `MIGRATION_BASE_REF` 변수 또는 `GITHUB_EVENT_NAME` `pull_request`, `pull_request_target` 또는 `merge_group` 인 경우 병합 커밋의 첫 번째 상위, 이벤트 페이로드의 `merge_group.base_sha` 또는 `git merge-base HEAD origin/$GITHUB_BASE_REF` 입니다. 해결 가능한 기반이 없는 풀 요청 또는 병합 대기열 실행에서는 게이트가 실패합니다. `--base` 없는 CI 외부에서는 `comparação com a base: pulada (sem --base)` 인쇄하고 이러한 규칙을 건너뜁니다.

`--base-latest-tag` `--base` 와 동일한 규칙을 사용하여 `HEAD` 의 기록에 있는 최신 릴리스 태그(semver 순서의 `vX.Y.Z`, nightlies와 같은 접미사가 붙은 태그는 포함되지 않음)와 비교합니다. Release-Green(`scripts/quality/validate-release-green.mjs`)은 이러한 방식으로 게이트를 실행합니다. 푸시 및 예약 실행에는 풀 요청 기반이 없고 새로운 CI 실행 없이 병합이 실행될 수 있기 때문입니다. 기록에 릴리스 태그가 없으면 게이트가 실패합니다. `git fetch --tags` 실행합니다( CI 에서 `fetch-depth: 0` 있는 `actions/checkout` 태그를 가져옵니다).

| 풀 요청 변경                                                                                                              | 결과                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 기본에 존재하는 파일의 이름이 `RENAMED_MIGRATION_COMPATIBILITY` 항목으로 변경됩니다.                                      | **경고** 내용이 동일하고 새로운 타임스탬프에 관계없이 정류 검사가 실행되는 경우; 새 위치가 최종 스키마를 변경하거나(이름 바꾸기를 실행 취소하거나 통근하는 다른 새 타임스탬프 선택) 러너가 이름이 바뀐 파일을 업그레이드된 데이터베이스에 다시 적용하는 경우에는 실패합니다.** 실패** 내용이 변경된 경우. |
| 베이스에 존재하는 파일은 타임스탬프를 유지하면서 이름이 변경됩니다(설명만 변경됨).                                        | **실패** , 항목 유무: 러너는 항목을 다시 적용하거나(항목 포함) 버전별로 건너뜁니다(항목 없음). 다른 타임스탬프와 호환성 항목을 사용하거나 이름을 유지하세요.                                                                                                                                              |
| 베이스에 존재하는 파일이 삭제되거나, 입력 없이 이름이 변경됩니다.                                                         | **실패** , 파일이 릴리스 태그에 있는지 여부. 실행 취소하려면 `git checkout <base> -- src/lib/db/migrations/<file>` 사용하여 파일을 복원하세요. 스키마를 되돌리려면 `DROP ... IF EXISTS` 사용하여 새 마이그레이션을 추가하세요.                                                                            |
| 베이스에 존재하는 파일의 내용이 다릅니다                                                                                  | **경고** ( GitHub Actions의 `::warning` 주석) 정류 검사가 실행됩니다. 업그레이드된 데이터베이스는 편집된 파일을 다시 적용하지 않기 때문에 편집으로 최종 스키마가 변경되면 실패합니다. 변경 사항을 새 마이그레이션에 넣으세요. 무해한 편집(주석, `IF NOT EXISTS`)은 경고만 합니다.                         |
| 타임스탬프가 있는 파일은 기본의 최신 파일보다 최신이 아닌 타임스탬프로 추가됩니다.                                        | 아래 설명된 정류 검사를 실행합니다.                                                                                                                                                                                                                                                                       |
| 이전 형식 `NNN_` 파일은 기본의 최신 이전 형식 파일 아래에 숫자가 추가됩니다.                                              | **실패** , 동일한 풀 요청에서 `KNOWN_GAPS` 편집되더라도: 이전 시리즈가 고정되어 있으면 `npm run db:new-migration` 사용하여 마이그레이션을 생성하세요. 기본의 최신 파일( `release/v*` 에서 `main` 풀 요청) 이상의 이전 형식 파일이 허용됩니다.                                                             |
| 순서가 잘못되었거나 편집되었거나 이름이 변경된 파일에 `INSERT`, `UPDATE`, `DELETE` 또는 `REPLACE` 문이 포함되어 있습니다. | **경고** : 정류 검사는 데이터를 비교하지 않으므로 업그레이드되고 새로운 데이터베이스가 적용되는 순서에 따라 결과가 변경되는지 검토하십시오.                                                                                                                                                               |

정류 검사를 한 번 실행하면 순서가 잘못된 파일, 편집된 파일, 이름이 변경된 파일이 모두 포함됩니다.

정류 검사(`scripts/check/migration-commutation.ts`)는 실제 설치 경로를 사용하여 두 개의 임시 데이터베이스를 구축합니다.** 업그레이드됨** 하나(기본 마이그레이션으로 부팅한 다음 풀 요청 마이그레이션으로 동일한 파일에서 다시 부팅)와** 신선한** 하나(풀 요청 마이그레이션으로 하나의 부팅) 결과 스키마를 비교합니다: 테이블 및 열(열 순서 무시), UNIQUE / PRIMARY KEY 및 FOREIGN KEY 제약 조건, 각 테이블의 정규화된 `CREATE TABLE` 텍스트( CHECK 제약 조건, 데이터 정렬, 생성된 열 및 테이블 옵션 포함), 인덱스, 트리거 및 뷰. 행 데이터는 비교되지 않습니다. 일치하는 경우 게이트는 파일이 잘못되었지만 통근하고 통과한다고 인쇄합니다. 서로 다르면 게이트가 실패하고 해당 사례에 대한 힌트가 제공됩니다. 순서가 잘못된 파일의 경우 `npm run db:new-migration` 로 해당 이름을 다시 생성합니다. 이는 파일이 아직 병합되지 않았기 때문에 안전합니다. 편집된 기본 파일의 경우 기본 콘텐츠를 복원하고 변경 사항을 새 마이그레이션에 넣습니다. 이름이 변경된 파일의 경우 이름 변경을 취소하거나 통근할 때 다른 새 타임스탬프를 선택하세요. 다른 이름의 동일한 타임스탬프는 절대 선택하지 마세요. 검사 자체를 실행할 수 없으면 CI 에서 게이트가 실패하고 로컬에서만 경고합니다. 편집된 기본 파일의 경우 업그레이드된 데이터베이스는 해당 파일의 기본 내용으로 구축되며 해당 버전이 이미 기록되어 있으므로 두 번째 부팅에서는 이를 건너뜁니다. 이름이 변경된 파일의 경우 업그레이드된 데이터베이스는 이전 이름의 파일로 구축되고 두 번째 부팅에서는 다시 실행하는 대신 호환성 항목을 통해 `_omniroute_migrations` 행을 이동합니다. 게이트는 `--must-not-apply` 사용하여 새 이름을 전달하므로 두 번째 부팅에서 이를 적용하면 검사가 실패합니다. 끌어오기 요청 마이그레이션이 업그레이드된 경로에 적용되지 않는 경우, 즉 모든 기본 마이그레이션 후에(새 설치에서도 실패하는지 여부에 관계없이) 게이트는 `migration do PR não aplica` 보고하고 기본의 현재 스키마에 대해 SQL 수정하도록 요청합니다. 파일이 이후 타임스탬프를 사용하는 다른 풀 요청 마이그레이션에 의존하는 경우 `npm run db:new-migration` 사용하여 해당 이름을 다시 생성하세요.

동일한 비교를 로컬에서 실행하려면 기본을 명시적으로 전달합니다(예: `npm run check:migration-numbering -- --base origin/<base-branch>` 또는 `npm run check:migration-numbering -- --base-latest-tag` 사용하여 최신 릴리스와 비교).

### Open PR 의 `NNN` 마이그레이션 변환

스위치 이전에 열린 풀 요청은 여전히 `242_add_widgets.sql` 와 같은 순차 파일을 전달할 수 있습니다. `241` 위의 이전 숫자는 거부되므로 병합하기 전에 변환하세요.

1. **설명을 유지하면서 생성기로 파일 이름을 바꾸십시오.** `npm run db:new-migration -- <same description>` 실행하여 새 이름을 얻고 SQL 를 그 이름으로 옮긴 다음 이전 `NNN_` 파일을 삭제합니다. 설명은 동일하게 유지되어야 합니다. 아래의 호환성 항목이 일치합니다.
2. **영구 데이터베이스가 이전 번호를 실행한 경우 호환성 항목을 추가합니다.** 유지되는 데이터베이스(homolog, VPS, 기여자 자체 설치)가 `NNN_` 파일을 사용하여 PR 빌드를 실행한 경우 `src/lib/db/migrationRunner/constants.ts` 에서 `RENAMED_MIGRATION_COMPATIBILITY` 에 `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` 추가합니다. 이것은** `237` 에서 `241` 로 이동하는 데 필요** : 해당 슬롯은 이제 정식 `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` 및 `241_seen_models.sql` 을 보유하며 항목이 없으면 이러한 데이터베이스는 정식 마이그레이션을 영원히 건너뛰고 변환된 마이그레이션을 다시 실행합니다. 대상이 타임스탬프인 경우 `242` 과 같이 비어 있는 슬롯에도 작동합니다. 의심스러운 경우 항목을 추가하세요. 배열에 추가하는 위치는 중요하지 않습니다. 항목의 대상 슬롯에 다른 항목이 멀리 이동하는 행이 여전히 남아 있는 경우(예를 들어 `237` PR 행을 잡고 이전 `usage_history_calculated_cost` 행이 `237` 로 이동하기를 기다리는 동안) 실행기는 해당 항목이 슬롯이 비어 있을 때까지 기다리도록 합니다. 항목이 이동하지 않는 행에 의해 유지되는 슬롯 또는 슬롯을 교환하는 두 개의 항목과 같은 실제 충돌만이 `Cannot reconcile ...` 사용한 부팅을 중지합니다.
3. **SQL 멱등성으로 유지하세요** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), 변환된 마이그레이션이 해당 스키마가 이미 존재하는 데이터베이스를 충족할 수 있기 때문입니다.
4. **버전이 지정된 특수 사례를 이동합니다.** PR `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) 또는 `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`)에서 이전 번호에 대한 사례를 추가한 경우 키를 새 타임스탬프로 변경하세요.

`tests/unit/db/codex-fence-migration-rename.test.ts` 이름이 변경된 마이그레이션에 대한 테스트의 실제 예입니다.

### 전환 전 지점으로 백포트

`YYYYMMDDHHMMSS_` 파일을 스위치 이전 분기(예: 이전 `release/v*` 분기)로 체리 선택하거나 백포트하지 마세요. 실행자는 파일 이름을 텍스트로 정렬하므로 타임스탬프가 있는 파일은 새로운 데이터베이스에서 `201_` 와 `202_` 사이에서 실행되며 기존 게이트는 14자리 접두사를 이해하지 못합니다. 이러한 분기에서는 변경 사항을 해당 분기 자체의 다음 `NNN_` 파일(멱등성)로 작성하므로 타임스탬프가 지정된 버전이 나중에 도착하면 아무 작업도 하지 않습니다.

### 마이그레이션 실행 방법

시작 시 `migrationRunner.ts`:

1. 존재하지 않는 경우 `_omniroute_migrations` 테이블을 생성합니다.
2. 이미 적용된 마이그레이션에 대한 쿼리
3. 새로운 마이그레이션을 각각의 트랜잭션에 순서대로 적용합니다.
4. 타임스탬프와 함께 적용된 각 마이그레이션을 기록합니다.

```ts
// src/lib/db/migrationRunner.ts (simplified)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### 멱등성

마이그레이션은 다음과 같아야 합니다.** 멱등성** 두 번 실행하는 — 아무 작업도 수행하지 않아야 합니다.

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS` 및 `OR IGNORE` / `OR REPLACE` 절을 자유롭게 사용하세요.

### 새 마이그레이션 추가

1. **생성기를 사용하여 파일 만들기** : `npm run db:new-migration -- <description>` (예: `npm run db:new-migration -- add combo priority`). 현재 UTC 시간과 주석 헤더를 사용하여 `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` 쓰고 해당 타임스탬프가 사용되면 1초 앞으로 이동하며 파일을 덮어쓰지 않습니다. 손으로 번호를 선택하지 마십시오.
2. **안전한 DDL 사용하세요** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **신중하게 데이터 백필** : `UPDATE ... WHERE ...` 사용하여 기존 행 처리
4. **순서와 이름을 확인하세요** : `npm run test:migrations:fresh` (빈 데이터베이스의 모든 마이그레이션) 및 `npm run check:migration-numbering`
5. **복사본 테스트** : 프로덕션 환경에서는 테스트되지 않은 마이그레이션을 실행하지 마세요.

예:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **이전 버전과 호환되지 않는 변경 사항** (예: 열 삭제)은 까다롭습니다. OmniRoute NOT — 다운그레이드를 지원합니다. 일단 마이그레이션이 적용되면 스키마 변경은 영구적입니다. 그에 따라 계획을 세우세요.

---

## 저장 데이터 암호화

민감한 필드(API 키, OAuth 토큰, 연결 문자열)는 **AES-256-GCM**을 사용하여 저장 시 암호화됩니다.

### 작동 방식

```ts
// src/lib/db/encryption.ts (단순화됨)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### 사용 위치

- `provider_connections.api_key` — 애플리케이션 수준에서 암호화됨
- `provider_connections.access_token`, `refresh_token`, `id_token` — 애플리케이션 수준에서 암호화됨
- `namespace = "secrets"`인 `key_value` 항목 — 애플리케이션 수준에서 암호화됨
- `proxy_registry.auth` — 존재하는 경우 애플리케이션 수준에서 암호화됨

### 암호화 키

암호화 키는 **암호 문구**(`STORAGE_ENCRYPTION_KEY` 환경 변수를 통해 설정)와 **솔트**(DB에 저장됨)로부터 파생됩니다. 데이터를 복호화하려면 둘 다 필요합니다.

```bash
# 안전한 암호 문구 생성
openssl rand -hex 32

# .env에 설정
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **중요**: 암호화 키를 분실하면 암호화된 모든 데이터에 접근할 수 없게 됩니다. **키를 데이터베이스와 별도로 백업하세요**.

### 암호화되지 않는 항목

성능상의 이유로 다음 항목은 평문으로 저장됩니다.

- 제공자 표시 이름
- 모델 정의(이미 공개된 정보)
- 라우팅 규칙
- 사용량 기록(PII 없음)

---

## 암호화 관련 주의 사항 (v3.8.16+)

OmniRoute는 두 가지 암호화 방식을 투명하게 처리하기 위해 **`migrateLegacyEncryptedString()`**을 사용합니다.

- **레거시** (v3.5.0 이전): XOR 기반 "암호화"(실제 암호화 기술이 아님)
- **현재**: 적절한 IV 및 인증 태그를 사용하는 AES-256-GCM

마이그레이션 헬퍼는 레거시 형식을 감지하고 처음 읽을 때 새로운 방식으로 다시 암호화합니다. 따라서 자격 증명을 잃지 않고 이전 데이터베이스를 업그레이드할 수 있습니다.

---

## 읽기 캐시

자주 읽는 데이터(모델, 공급자, 설정)를 위해 `readCache.ts`는 **인메모리 캐시**를 제공합니다.

```ts
// 시작 시 캐시되며 쓰기 시 무효화됨
const providers = await getCachedProviders(); // 빠름, 인메모리
const fresh = await listProviders(); // 느림, DB에 접근
```

| 캐시된 엔터티          | 캐시 키        | TTL         |
| ---------------------- | -------------- | ----------- |
| `models`               | `models:v1`    | 쓰기 전까지 |
| `provider_connections` | `providers:v1` | 쓰기 전까지 |
| `settings`             | `settings:v1`  | 쓰기 전까지 |
| `combos`               | `combos:v1`    | 쓰기 전까지 |

해당 테이블에 쓰기가 발생할 때마다 캐시가 무효화됩니다.

---

## 백업 및 복구

### 수동 백업

```bash
# CLI를 사용하여 로컬 백업 생성
omniroute backup create --name pre-migration

# 또는 API를 통해 생성
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

백업 파일에는 다음 항목이 포함됩니다.

- 모든 DB 테이블(JSON으로 직렬화)
- 호출 로그 아티팩트(base64로 인코딩, 선택 사항)
- 설정 + 비밀 정보(암호화됨)
- 플러그인 구성

### 복원

```bash
# CLI를 통해 복원
omniroute restore pre-migration

# API를 통해 복원
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **경고**: 복원하면 전체 DB를 덮어씁니다. 먼저 모든 클라이언트를 중지하세요.

### 자동 백업

```bash
# CLI를 통해 자동 일일 백업 활성화
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

이 일정은 기본적으로 30초마다 실행되는 백그라운드 작업에 의해 서버 측에서 실행되며,
로컬 서버 시간을 기준으로 cron 표현식을 평가합니다.

| 변수                                        | 기본값  | 설명                                                                                                               |
| ------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | 밀리초 단위의 실행 간격(최소 `5000`). cron과 일치하는 분 내에 안정적으로 실행되도록 하려면 60초보다 짧아야 합니다. |

### SQLite 핫 백업

실행 중인 DB를 다운타임 없이 백업하려면 다음 명령을 사용합니다.

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

이 명령은 SQLite의 온라인 백업 API를 사용하므로 OmniRoute가 실행 중인 동안에도 안전하게 실행할 수 있습니다.

---

## 성능 튜닝

### WAL 모드

WAL 는 기본적으로 활성화되어 있습니다. 쓰기 작업량이 많은 경우 다음을 고려하세요.

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute `journal_size_limit` 설정하지 않습니다. 체크포인트는 WAL 프레임을 기본 파일로 이동하지만 WAL 파일은 가장 큰 할당 크기를 유지합니다. `OMNIROUTE_WAL_GUARD_MAX_MB` 가드는 `wal_checkpoint(RESTART)` 만 경고하고 실행합니다. 디스크 크기 캡이 아닙니다.

### 인덱스

성능에 대한 주요 인덱스(마이그레이션으로 자동 생성됨):

- 공급자별 `idx_models_provider` — 모델 조회
- `idx_combo_targets_combo_id` — 콤보 타겟 확장
- `idx_usage_history_api_key_timestamp` — 사용 분석
- `idx_quota_snapshots_api_key_window` — 할당량 추적
- `idx_call_logs_timestamp` — 통화 기록 쿼리

새 색인을 추가하려면 마이그레이션을 생성하세요.

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### 메모리 매핑된 I/O

매우 큰 데이터베이스(> 10GB)의 경우 SQLite pragma를 통해 메모리 매핑을 조정할 수 있습니다.

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### 압축

장기 실행 OmniRoute 인스턴스는 가끔씩 `VACUUM` 활용하면 이점을 얻을 수 있습니다.

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

트래픽이 적은 시간대에 매월 실행합니다. (WAL 모드는 필요성을 줄이지만 제거하지는 않습니다.)

---

## 상태 확인

`src/lib/db/healthCheck.ts`는 **DB 수준의 상태 진단**을 제공합니다.

두 메서드 모두 인증이 필요하며, 인증되지 않으면 `401`을 반환합니다. `GET`은 진단만 수행하고, `POST`는
`autoRepair`가 활성화된 상태로 동일한 검사를 실행합니다.

```bash
GET  /api/db/health   # 진단
POST /api/db/health   # 진단 + 복구
```

응답은 `runDbHealthCheck()`가 생성한 `DbHealthCheckResult`입니다
(`src/lib/db/healthCheck.ts`).

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "도메인 예산이 더 이상 존재하지 않는 API 키를 참조했습니다.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| 필드              | 의미                                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `issues`가 비어 있으면 `true`입니다. `driver`는 이 값에 영향을 주지 않습니다.                                                                                     |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` 중 하나입니다.                                                                    |
| `repairedCount`   | 이번 실행 중 복구된 행의 수입니다. `autoRepair`가 false이면 항상 `0`입니다.                                                                                       |
| `backupCreated`   | 복구 전에 백업이 생성되었는지를 나타냅니다.                                                                                                                       |
| `checkedAt`       | 실행 및 실행 중 작성된 모든 복구 메모에서 공유되는 ISO 타임스탬프입니다.                                                                                          |
| `driver.name`     | 검사된 데이터베이스를 제공하는 SQLite 드라이버입니다.                                                                                                             |
| `driver.degraded` | 쓰기가 데이터베이스 파일에 영구적으로 저장되지 않는 경우 `true`입니다. 즉, `sql.js` WASM 폴백(전체 파일 영속성) 또는 인메모리 데이터베이스를 사용하는 경우입니다. |

`omniroute_db_health_check` MCP 도구에서도 동일한 페이로드가 반환됩니다.

손상을 감지하려면 `PRAGMA integrity_check`를 실행하세요.

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# 다음과 같이 출력되어야 함: ok
```

`ok` 이외의 값이 반환되면 **즉시 데이터베이스 사용을 중단**하고 백업에서 복원하세요.

---

## 재해 복구

### 시나리오 1: WAL 파일 손실

`-wal` 파일이 없지만 `-shm` 파일과 기본 DB는 온전한 경우:

```bash
# 다음 실행 시 자동으로 복구됩니다
omniroute
```

SQLite에서 자동으로 복구할 수 없는 경우:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### 시나리오 2: 기본 DB 파일 손상

백업에서 복원합니다:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]`은 실행 중인 서버에서 전체 `.tar.gz` 아카이브만 다운로드하며
(`GET /api/db-backups/exportAll`, 운영자 자격 증명 필요), 아무것도 복원하지 않습니다.

### 시나리오 3: 암호화 키 손실

키가 없으면 **복구할 수 없습니다**. 암호화된 필드는 읽을 수 없습니다. 새 자격 증명을 사용하여 모든 공급자를 수동으로 다시 추가하세요.

> **완화 조치**: 암호화 키는 항상 별도로 백업하세요. 가급적 암호 관리자나 KMS에 백업하는 것이 좋습니다.

### 시나리오 4: 디스크 가득 참

SQLite에서 `SQLITE_FULL` 오류가 반환됩니다. 디스크 공간을 확보한 후 다음을 실행하세요:

```bash
# 공간을 확보하기 위해 WAL 체크포인트를 수행합니다
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## 일반적인 작업

### 테이블 검사

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### 모든 테이블의 행 개수 계산

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### 모든 데이터 재설정(삭제)

```bash
# Stop OmniRoute first
omniroute stop

# Delete the DB file
rm ~/.omniroute/storage.sqlite*

# Restart (will recreate empty DB)
omniroute
```

에 대한** 선택적** 재설정(공급자 유지, 사용량 삭제):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### 단일 테이블 내보내기

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## 문제 해결

### "데이터베이스가 잠겨 있습니다"

다른 프로세스가 쓰기 잠금을 유지하고 있습니다. 다음 방법 중 하나를 사용하세요:

- 다른 프로세스가 완료될 때까지 기다립니다(`lsof | grep storage.sqlite`로 확인)
- 다른 프로세스를 종료합니다
- 문제가 지속되면 OmniRoute를 다시 시작합니다

### "외래 키 제약 조건을 위반했습니다"

도메인 모듈이 참조 무결성을 위반하고 있습니다. 다음 사항을 확인하세요:

- 종속 테이블의 고아 행
- 전파되지 않은 연쇄 삭제
- 최근 마이그레이션에서 변경된 외래 키

위반 사항을 찾으려면 `PRAGMA foreign_key_check;`를 실행하세요.

### "메모리 부족"

SQLite의 메모리 매핑 I/O가 OS 제한을 초과하고 있습니다. SQLite pragma를 사용하여 크기를 줄이세요:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB 대신 128MB
```

또는 비활성화하세요:

```sql
PRAGMA mmap_size = 0;
```

### "마이그레이션이 도중에 실패했습니다"

마이그레이션은 트랜잭션 내에서 실행되었으므로 롤백되었어야 합니다. 롤백되지 않았다면 다음을 수행하세요:

1. **OmniRoute 중지**(추가 시도 방지)
2. `sqlite3`로 **DB 상태 확인**
3. 부분적으로 적용된 마이그레이션을 **수동으로 수정**
4. OmniRoute를 **다시 실행**(마이그레이션이 재시도됨)

이 문제를 방지하려면 항상 복사본에서 마이그레이션을 먼저 테스트하세요.

---

## 관련 문서

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — 사용량 테이블
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — 상태 모니터링
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — 릴리스 흐름
- 소스: `src/lib/db/` (80개 이상의 파일, 약 25K LOC)
