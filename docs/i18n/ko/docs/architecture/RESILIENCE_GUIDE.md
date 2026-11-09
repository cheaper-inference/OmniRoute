# Resilience Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute 에는 서로 다르지만 관련된 세 가지 탄력성 메커니즘이 있습니다. 각각은 범위와 목적이 다릅니다. 라우팅 동작을 디버깅할 때 별도로 유지하십시오.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> 출처: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **복원력 토글에 대한 Env-vs-dashboard 우선 순위입니다.** — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — 환경에서 시드된 옵트인 복원력 토글은 _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`)만 제공합니다. `resilienceSettings` 에 부울이 지속되었습니다(대시보드 →** 설정 → 탄력성** / `PATCH /api/resilience`, `key_value` 에 저장됨)은 env 값보다 우선합니다. 정규화(`toBoolean`, `src/lib/resilience/settings/normalize.ts`)는 저장된 부울이 존재할 때마다 이를 유지합니다. 대시보드가 이미 `false` 저장한 배포에서 이러한 환경 변수를 `true` 로 설정하면 아무것도 변경되지 않습니다. — 토글을 뒤집습니다.** 설정 → 탄력성** (또는 저장된 필드를 지우는 것) 대신.

## 1. 프로바이더 서킷 브레이커

**범위:** 프로바이더 전체(예: `glm`, `openai`, `anthropic`).

**목적:** 업스트림/서비스 수준에서 반복적으로 실패하는 프로바이더로의 트래픽 전송을 중단합니다.

**구현:**

- 핵심 클래스: `src/shared/utils/circuitBreaker.ts`
- 연결 지점: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- 상태 API: `GET /api/monitoring/health`
- 리셋 API: `POST /api/resilience/reset`
- 래퍼: `open-sse/services/accountFallback.ts`
- DB 테이블: `domain_circuit_breakers`

**상태:**

- `CLOSED` — 정상 트래픽 허용
- `DEGRADED` — 트래픽은 여전히 허용되지만, 프로바이더 실패 증가가 추적되고 있는 상태. 충분한 성공이 누적되거나, 유효한 연결 테스트가 통과되거나, 마지막 실패 유형에 대한 가장 긴 `OPEN` 유지 시간(해당 `cooldownByKind` 값, 없으면 `resetTimeout`에 `maxBackoffMultiplier`를 곱한 값, 최소 한 번의 쿨다운) 동안 새로운 실패 없이 경과하면 `CLOSED`로 복귀
- `OPEN` — 프로바이더가 일시적으로 차단됨. 콤보 라우팅에서 건너뜀
- `HALF_OPEN` — 리셋 타임아웃이 경과됨. 프로브 요청 허용

**설정 가능한 기본값(`open-sse/config/constants.ts`, Dashboard → Settings → Resilience에서 노출됨):**

| 클래스  | Degraded 진입 | Open 진입 | 리셋 타임아웃 |
| ------- | ------------- | --------- | ------------- |
| OAuth   | 5회 실패      | 8회 실패  | 60초          |
| API-key | 7회 실패      | 12회 실패 | 30초          |
| Local   | 파생됨        | 2회 실패  | 15초          |

`degradationThreshold`는 프로바이더가 `DEGRADED`로 진입하는 시점을 제어하고, `failureThreshold`는 프로바이더가 열리고(open) 건너뛰어지는 시점을 제어합니다. Local 프로바이더 프로필은 아직 Resilience 설정 페이지에 노출되지 않습니다.

**트립 코드:** 프로바이더 수준 상태 코드 `[408, 500, 502, 503, 504]`에서만 트립됩니다. 계정 수준 오류(대부분의 401/403/429 — 이들은 쿨다운 또는 잠금에 해당)에서는 트립되지 **않습니다**.

**지연 복구(lazy recovery):** `OPEN` 상태가 만료되면 `getStatus()`, `canExecute()`, `getRetryAfterMs()` 호출이 상태를 `HALF_OPEN`으로 갱신합니다. 동일한 읽기 호출(그리고 다음 실패)은 오래된 `DEGRADED` 상태를 `CLOSED`로 감쇠시킵니다. 백그라운드 타이머가 필요 없습니다.

---

### 옵트인 전역 프로바이더 쿨다운 (윈도우 게이트)

네 번째 **옵트인** 계층(`PROVIDER_COOLDOWN_ENABLED`, 기본값 **off**)은 실패한 프로바이더에 대한 요청 간 메모리를 `open-sse/services/providerCooldownTracker.ts`에 유지하며, 콤보 대상 결정(combo target resolution)에서 참조되어 연속적인 콤보 요청이 방금 실패한 프로바이더를 다시 탐색하지 않도록 합니다. 프로바이더 수준 항목은 `PROVIDER_PROFILES` 윈도우 게이트를 따릅니다:

| 프로필  | 트립 조건 (`providerFailureThreshold`) | 윈도우 (`providerFailureWindowMs`) | 쿨다운 (`providerCooldownMs`) |
| ------- | -------------------------------------: | ---------------------------------: | ----------------------------: |
| OAuth   |                                   `10` |                            `15min` |                        `5min` |
| API key |                                   `15` |                            `30min` |                       `10min` |

임계값 미만에서는 프로바이더가 쿨다운 중으로 간주되지 **않으며**, 성공하면 윈도우가 초기화됩니다. 연결 수준 항목(`provider:connectionId`)은 대신 지수적 `minRetryCooldownMs → maxRetryCooldownMs` 백오프를 유지합니다. 재정의: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
회귀 방지 테스트: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. 연결 쿨다운

**범위:** 단일 공급자 연결/계정/키.

**목적:** 동일한 공급자의 다른 연결은 계속 서비스를 제공하는 동안 문제가 있는 키 하나를 건너뜁니다.

**구현:**

- 사용 불가로 표시: `src/sse/services/auth.ts::markAccountUnavailable()`
- 선택: 동일한 파일의 `getProviderCredentials*`
- 쿨다운 계산: `open-sse/services/accountFallback.ts::checkFallbackError()`
- 설정: `src/lib/resilience/settings.ts`

**연결별 필드:**

- `rateLimitedUntil` — 쿨다운이 만료되는 시점의 타임스탬프
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — 지수 백오프 카운터

**기본 쿨다운:**

- OAuth 기본값: 5초
- API 키 기본값: 3초
- API 키 429: 업스트림 `Retry-After`/재설정 헤더/파싱 가능한 재설정 텍스트를 우선 사용
- 백오프: `baseCooldownMs * 2 ** failureIndex`

**공급자별 재시도 지연.** 공급자 세부 정보 페이지에는 **재시도 지연** 선택 메뉴가 있습니다(자동,
15초부터 1시간까지). 이 값은
`resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`에 저장됩니다
(1–21600, `PATCH /api/resilience`를 통해). 비율 제한 오류에 업스트림 재시도 힌트가 없는 경우, 이 값이
해당 공급자의 조정된 백오프를 대체하고 `backoffLevel`을 0으로 재설정합니다
(`open-sse/services/rotationConfig.ts::overrideFor`). 비율 제한 오류의 우선순위는 다음과 같습니다(높은 순서부터):
업스트림 재시도 힌트, 연결별 `providerSpecificData.rotationOverrides.rateLimitResetSeconds`,
공급자별 재시도 지연, 환경 변수 `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, 조정된 백오프 순입니다.
자동을 선택하면 해당 필드가 제거됩니다. 이는 비율 제한 사유에만 영향을 주며, terminal 상태에는 영향을 주지 않습니다.

**동시 폭주 방지 보호:** 동시 오류로 인해 쿨다운이 과도하게 연장되거나 `backoffLevel`이 두 번 증가하는 것을 방지합니다.

**동시성 제한 429는 백오프 단계를 증가시키지 않습니다.** 본문에 동시성 제한을 나타내는 문구
("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`)가 포함된 `429`는 계정이 정상 상태이지만 사용 중임을 의미합니다.
`checkFallbackError()`는 `concurrency_limited` 사유를 반환합니다. 즉시 다음 연결로 장애 조치하고,
이 연결은 고정된 `CONCURRENCY_LIMIT_COOLDOWN_MS`(1초) 또는 업스트림 재시도 힌트만큼 쿨다운하며,
`backoffLevel`은 변경하지 않고 `skipProviderBreaker`를 설정합니다.
명시적인 할당량 본문이 있으면 그것이 우선하므로, 할당량 패턴에도 일치하는 본문은 할당량 판정을 유지합니다.
감지: `src/shared/utils/classify429.ts`의 `looksLikeConcurrencyLimit()`;
판정: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()`(브레이커의
`FailureKind`)는 변경되지 않으며 이러한 본문에 대해서도 여전히 `rate_limit`을 읽습니다.

**스트림 콘텐츠 정지는 계정을 쿨다운하지 않습니다.** 콘텐츠 정지 감시자
(`open-sse/utils/streamHandler.ts`)가 정해진 시간 내에 모델 출력을 전혀 보내지 않은 스트림을
포기할 때, `markAccountUnavailable()`은 연결에 오류를 기록하지만 쿨다운은 설정하지 않습니다.
이 정지는 해당 요청에 속하며, 대부분 아직 출력이 없는 긴 추론 단계에서 발생합니다.
운영자는 `resilienceSettings.streamStallCooldown.enabled`를 통해 다시 활성화할 수 있습니다
(기본값 `false`).

**`p2c` 계정 선택을 위한 선택적 지연 시간 신호.** 디스패치된 각 시도는 연결별(및 연결 + 모델별)로
첫 바이트까지 걸린 시간과 결과를 메모리 내 롤링 윈도우에 기록합니다. 윈도우에는 15분 이내의
최근 20개 샘플이 포함됩니다
(`open-sse/services/connectionLatencyTracker.ts`, `src/sse/handlers/chatHelpers.ts`의
`safeLogEvents()`에서 기록). `resilienceSettings.p2cLatency.weight`가 `0`보다 큰 경우
(범위 0-20, 기본값 `0` = 비활성), `src/sse/services/auth.ts`의
`compareP2CConnections()`는 쌍의 각 후보에 최대 `weight`점까지 추가합니다. 절반은 더 빠른 후보 대비
지연 시간 비율에서 나오며(두 배 느리면 전체 절반을 받음), 나머지 절반은 롤링 오류율에서 나옵니다.
이 항은 두 후보 모두 최소 3개의 샘플을 가진 경우에만 적용되므로 새 계정에는 불이익이 없으며,
상한은 할당량 차단 및 할당량 소진 패널티보다 낮게 유지됩니다. 자체 회로 차단기를 추가하지는 않습니다.
실패하는 계정은 여전히 쿨다운, 잠금 및 브레이커 계층에서 처리됩니다.
`PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`으로 설정합니다.

**추론 프레임은 콘텐츠 정지 예산을 다시 시작합니다.** 추론 모델은 첫 번째 표시 토큰을 보내기 전에
몇 분 동안 사고할 수 있습니다. Claude는 사고 텍스트가 비어 있을 수 있는 `thinking_delta` 프레임을
스트리밍하고, Responses API는 하나의 추론 항목 다음에 또 다른 추론 항목을 스트리밍합니다.
`isReasoningProgressFrame()`(`open-sse/utils/streamReadiness.ts`)는 이러한 프레임을 인식하며,
감시자는 턴을 취소하는 대신 각 프레임에서 예산을 다시 시작합니다. 이러한 프레임은 여전히 모델
출력이 아니므로 추론만으로 종료되는 턴은 여전히 빈 결과로 보고되며, 추론을 중단하고 하트비트만
보내는 턴은 여전히 감시자를 작동시킵니다.

서명이 비어 있지 않은 Kiro의 바이너리 `reasoningContentEvent` 프레임은 실행기를 거치는 동안
빈 `reasoning_content` 델타로 이 추론 활동을 보존합니다. 서명은 전달되지 않습니다. 메타데이터,
불완전한 프레임 및 빈 서명은 콘텐츠 예산을 다시 시작하지 않습니다. 독립적인 활성 스트림 타임아웃과
클라이언트 취소는 여전히 적용됩니다(`open-sse/executors/kiro/reasoning.ts`).

**최종 상태(쿨다운이 아님):**

- `banned` — 금지된 키워드 / 계정 차단 감지에 의해 설정됩니다([BAN_DETECTION](../security/BAN_DETECTION.md) 참조). 업스트림의 요청별 거부(`request_rejected`, 예: Anthropic OAuth 403 "Request not allowed")는 이를 설정하지 않습니다. 이러한 거부는 연결 및 모델별로 집계되며, 해당 모델을 점진적으로 증가하는 쿨다운(최대 `REQUEST_REJECTED_MAX_COOLDOWN_MS`(1시간))과 함께 로테이션에서 제외합니다. 모델을 알 수 없는 경우에는 연결을 쿨다운합니다 — `open-sse/services/requestRejectedStreak.ts`
- `expired` (제한된 재시도 후 최종 상태로 전환 — 지수 백오프를 사용하는 `EXPIRED_RETRY_MAX = 3` — 하므로 일시적인 OAuth 오류가 발생해도 계정이 영구적으로 비활성화되기 전에 자체적으로 복구할 수 있음)
- `credits_exhausted`

이 상태는 자격 증명이 변경되거나 운영자가 재설정할 때까지 유지됩니다. 일시적인 쿨다운 상태로 종료 상태를 덮어쓰지 마세요.

**지연 복구:** `rateLimitedUntil`이 경과하면 연결을 다시 사용할 수 있습니다. 성공적으로 사용되면 `clearAccountError()`가 모든 오류 필드를 지웁니다.

### Claude OAuth 사용량 한도: 낮은 우선순위 레인 + 세션 한도 재설정

**범위:** 하나의 Claude 구독(OAuth) 연결입니다. 두 기능 모두 **연결별 옵트인** 방식입니다
(연결 편집 → Claude 섹션 → `providerSpecificData`의
`lowPriorityMode` / `autoLimitReset`, 둘 다 기본적으로 꺼짐). 또한 Claude Code의 `/low-priority` 및 `/limit-reset` 명령을
그대로 반영합니다(Claude Code 2.1.263에서 캡처한 와이어 계약).

**구현:**

- 상태 머신 + 응답 분류: `open-sse/services/claudeLowPriority.ts`
- 재설정 상태/클레임 클라이언트: `open-sse/services/claudeLimitReset.ts`
- 실행기 훅(헤더 주입 + 동일 계정 재시도): `open-sse/executors/base.ts::execute()`
- 옵트인 영속화: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**트리거:** 5시간 사용량 한도 — 헤더에
`anthropic-ratelimit-unified-status: rejected`가 있고, 계정이 대상인 경우
`anthropic-ratelimit-unified-slow-offer: treatment`도 포함된 `429`입니다. 첫 번째 한도 초과
429가 발생하기 전에는 아무것도 전송하지 않습니다. 통합 헤더가 없는 버스트 429는 일반 쿨다운 경로로
처리됩니다.

**낮은 우선순위 레인** (`lowPriorityMode`):

- 한도 초과 429가 발생하면 실행기는 제안을 수락하고 동일한 계정에
  `anthropic-usage-limit: slow`를 사용해 즉시 재시도합니다. 레인은 공지된
  `anthropic-ratelimit-unified-reset` 시점(+60초의 유예)까지 활성 상태로 유지되며, 해당 기간의 모든 요청에는 이
  헤더가 포함됩니다. 가로챈 429는 `handleChatCore`에 도달하지 않으므로 연결은
  쿨다운 상태가 되지 않고 다른 연결로 교체되지도 않습니다.
- 이후 응답의 `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`는 레인을
  유지합니다. `slot_busy`(429) 또는 `529`가 발생하면 서버의
  `anthropic-ratelimit-unified-slow-retry-after`를 기다린 후(기본 20초, 5–600초로 제한, ±30% 지터)
  재시도합니다. 대기 시간은 `anthropic-ratelimit-unified-slow-max-wait`(기본 20분, 1분–6시간으로
  제한)를 초과하지 않으며, 초과하면 레인이 종료되고 10분간의 쿨오프가 재수락을 차단합니다. 이
  대기 시간은 요청 자체의 업스트림 시작 타임아웃(`resolveFetchStartTimeout`, 기본 10분)에서
  5초의 여유를 뺀 남은 시간으로도 제한됩니다. 이 제한이 없으면 기본 최대 대기 시간인
  20분이 요청 시간을 초과하게 되어 대기 중 sleep이 중단되고, 정상적인
  `max_wait` 종료 + 쿨오프 대신 `TimeoutError`가 표시됩니다.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5시간 창 롤오버 또는
  `anthropic-ratelimit-unified-overage-in-use: true`가 포함된 `ineligible`(유료 초과 사용이
  이제 한도 초과를 충당하므로 모든 상태에서 `extra_usage`로 종료)는 레인을 종료합니다. 이후
  응답은 일반 쿨다운 경로로 전달됩니다. `budget_exhausted`는 공지된 예산 재설정 시점(최대
  8일)까지 기억됩니다.
- 한도 초과 확인은 실행기 자체의 400 기반 시도 내 재시도(컨텍스트 편집, 사고/추론 강도 제한,
  매개변수 자동 학습) 이후에 실행됩니다. 따라서 이러한 재시도 중 하나에서만 한도 초과 429가
  표면화되더라도 쿨다운 경로에 도달하지 않고 계속 가로채집니다.
- 상태는 연결별 메모리에 저장됩니다(재시작하면 한도 초과 429가 한 번 더 발생해야 다시 수락됨).

**세션 한도 재설정** (`autoLimitReset`, 두 기능이 모두 켜져 있으면 레인보다 먼저 시도):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  블록을 확인합니다. `arm: "reset"`이고 `available: true`인 경우,
  `providerSpecificData.organizationUUID`의 조직 UUID(부트스트랩 폴백)를 사용해
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`를 호출하고
  `{ "program": "juniper_tide" }`를 전송합니다.
- `result: reset|not_limited`이면 요청을 최고 속도로 재시도합니다(느린 헤더 없음).
  `already_used` / `not_offered`는 `next_available_at`(기본 1주)을 메모이즈하며, 실패할 때마다
  15분 동안 백오프합니다. 재설정은 주 1회 수행되며 주간 한도에도 포함됩니다.

회귀 방지 테스트: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### 은행 재설정 자동 적용

**범위:** Codex 및 Claude 구독(OAuth) 연결.**선택** : `bankedResetAutoApply` 설정은 꺼져 있고 기본적으로 `dry-run` 모드입니다(설정 → AI → 자동 적용 뱅크 재설정).

**목적:** 운영자가 공급자 한도 페이지에서 "사용"을 누를 때까지 기다리지 않고 계정이 사용 한계에 도달할 때 자체적으로 은행 재설정을 소비합니다.

| 신용 유형(`creditTypes`) | 무엇이 구속되었는가                | 실행되는 곳                                |
| ------------------------ | ---------------------------------- | ------------------------------------------ |
| `codexCredits`           | Codex 재설정 크레딧                | 백그라운드 작업, 60초마다                  |
| `claudeCredits`          | Claude 은행 보조금(`GRANT` 크레딧) | 백그라운드 작업, 60초마다                  |
| `claudeSessionReset`     | Claude 주간 세션 제한 재설정(위)   | 계정별 토글과 동일한 정책을 통해 요청 경로 |

**구현:**

- 순수 결정(두 경로 모두에 대해 하나의 규칙 세트): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- 백그라운드 작업: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts` 에서 시작됨)
- Claude 요청 경로 게이트: `src/lib/usage/claudeSessionResetPolicy.ts`, `open-sse/services/claudeLimitReset.ts` 에서 `setClaudeLimitResetPolicy()` 통해 등록됨
- 역사, 캡, 웹훅: `src/lib/usage/bankedResetAudit.ts`
- 연혁 API: `GET /api/settings/banked-reset-auto/history?limit=50` (관리인증)

**결정 순서** (첫 번째 실패한 규칙은 기록된 이유입니다):

1. 기능 해제, 신용 유형 해제 또는 범위를 벗어난 계정(`accountScope` `all` / `selected` 및 계정별 `connections` 맵)
2. 선택적 UTC 일정 외부(`startHourUtc` > `endHourUtc` 자정을 넘음).
3. 지난 24시간 동안의 한도: 두 상환 사이의 `maxPerAccountPerDay` (1), `maxPerDay` (3) 및 `minSpacingMinutes` (30).
4. 트리거: 벽으로 둘러싸인 `session` 또는 `weekly` 창( `isAccountQuotaExhausted()` 아닌 `getQuotaWindowStatus().reachedThreshold` 에서 읽음) 또는 최소 `expiringCreditMinUsedPercent` (50)를 사용한 계정의 `expiringCreditHours` (24) 내에서 만료되는 크레딧.
5. 자연 재설정 가드: `sessionResetGuardMinutes` (90) 내에서 벽으로 둘러싸인 5시간 창이 재설정되거나 `weeklyResetGuardHours` (12) 내에서 벽으로 둘러싸인 주간 창이 재설정되면 건너뜁니다.
6. 주간 하한: 주간 남은 금액이 `weeklyFloorPercent` (10) 미만인 경우 5시간 재설정을 건너뜁니다.
7. `last-resort` 모드: 동일한 공급자의 다른 범위 내 계정에 두 창 모두에 최소 `poolHeadroomPercent` (10)가 남아 있는 동안 건너뜁니다. 만료되는 크레딧 트리거는 이를 우회합니다.
8. `dry-run` 행을 기록하고 아무것도 상환하지 않습니다. `last-resort` 및 `eager` 사용됩니다.

할당량 데이터가 누락되어도 상환이 잠금 해제되지 않습니다. 재설정 시간을 알 수 없거나 주간 사용량이 건너뛰기 때문입니다.

**Claude 세션 재설정:** 기능을 끄거나 `claudeSessionReset` 끄면 계정별 `autoLimitReset` 토글이 이전과 똑같이 결정됩니다. 두 가지 기능을 모두 활성화하면 이 기능은 계정별 토글을 대체합니다. 범위 내 계정은 정책에서 허용하는 경우에만 청구할 수 있으며 `dry-run` 모드에서는 청구가 이루어지지 않습니다.

**안전:** 작업은 틱당 최대 1개의 크레딧을 상환하고, 크레딧을 나열하기 전에 결정하고(건너뛴 계정은 나열되지 않음), 멱등성 키 `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` 사용하고, 나열 또는 상환 실패 후 1시간 동안 계정을 백업합니다. 모든 상환, 실패 및 시험 실행 결정은 `audit_log` (`action: "bankedReset.redeem"`, 토큰 또는 신용 ID 없음)에 기록됩니다. 한도는 해당 행에서 계산되므로 다시 시작해도 유지됩니다. 성공적인 상환은 `provider.reset_redeemed` 웹훅도 실행합니다.

회귀 가드: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### 세션 고정 (#7274)

**범위:** 하나의 클라이언트 세션(`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` 헤더)을
모든 프로바이더에 대해 하나의 연결에 고정합니다.

**목적:** 다중 턴 에이전트(Claude Code, aider, 사용자 지정 에이전트)가 요청 간 동일한 계정을
사용하도록 유지하여, 계정 간 컨텍스트 손실과 계정별 세션 상태가 있는 프로바이더에서 반복적으로
발생하는 콜드 스타트 429를 줄입니다.

**구현:**

- TTL 확인: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- 고정 연결 선택/생성: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- 헤더 추출(모든 프로바이더에 일반 적용): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- 영속화된 고정 테이블: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- 설정: `sessionAffinityTtlMs`(전역 TTL(ms), `0`이면 비활성화) — `src/lib/db/settings.ts`.
  Codex 전용 `codexSessionAffinityTtlMs`에서 마이그레이션 `124_generic_session_affinity_ttl.sql`을
  통해 이름이 변경되었으며, 이전에 구성된 Codex TTL은 새 기본값으로 이어집니다.

#7274 이전에는 `resolveSessionAffinityTtlMs()`가 `codex` 이외의 모든 프로바이더에 대해
무조건 `0`을 반환했으므로, 고정 메커니즘과 헤더 추출은 이미 프로바이더에 구애받지 않는
방식이었음에도 TTL 설정(및 세션 헤더)이 다른 곳에서는 아무런 효과가 없었습니다. 이 수정으로
해당 조기 반환이 제거되었으며, 이제 전역에서 TTL을 `0`보다 크게 설정하면 모든 프로바이더에
동일하게 적용됩니다.

세 가지 세션 고정 헤더는 업스트림으로 절대 전달되지 않습니다. 실행기는 클라이언트 헤더를
그대로 전달하지 않고 자체 업스트림 헤더를 처음부터 구성하므로, 이 값은 내부 상관 관계 ID로만
사용됩니다.

### 독점 관리 세션 연결 리스租

**범위:** 하나의 활성 관리형 HTTP 클라이언트/세션이 하나의 적격 OmniRoute 연결을 소유합니다.

**목적:** 요청 전반에 걸쳐 강력한 라우팅 경계를 필요로 하는 클라이언트를 위해 지속 가능한 독점 연결 소유권을 제공합니다. 이는 소프트 연속성 선호 사항인 세션 어피니티와 다릅니다. 독점 리스는 수명 주기 상태를 SQLite에 지속하고, 전역 활성 소유자 및 활성 연결의 고유성을 강제하며, 제공자 디스패치 전에 오래된 세대를 거부합니다.

이 기능은 API 키별로 옵트인됩니다. 관리형 키에는 `lease:exclusive` 스코프와 명시적인 비어 있지 않은 `allowedConnections` 목록이 있어야 합니다. 모든 HTTP 클라이언트가 수명 주기 엔드포인트를 사용할 수 있으며, 클라이언트 이름, 사용자 에이전트, 제공자, OAuth 방식 또는 모델은 필요하지 않습니다. 리스는 모델이 아니라 연결을 소유하므로, 연결이 일반적인 적격 상태를 유지하는 동안 모델을 변경해도 바인딩은 유지됩니다. 일반 모델, 할당량, 상태, 쿨다운 및 허용 목록 규칙은 계속해서 우선 적용되며, 동일한 세대를 다른 사용 가능한 적격 연결로 전환할 수 있습니다.

수명 주기는 JSON 작업 `acquire`, `renew`, `release`를 사용하는 `POST /api/v1/session-leases`입니다. 관리형 추론 요청에는 불투명한 `X-OmniRoute-Lease-Owner` 값과 정확한 `X-OmniRoute-Lease-Generation`이 포함됩니다. 소유자는 `vlo_` 뒤에 43개의 base64url 문자가 이어지는 형식을 사용하며, 해당 값의 SHA-256 해시만 저장됩니다. 모든 최종 디스패치 경계는 인증된 API 키 ID와 활성 연결 ID도 함께 바인딩합니다. 리스 제어 헤더는 로그, 보존된 요청 스냅샷 및 업스트림 실행기 헤더에서 제거됩니다.

일반 라우팅에 적격한 관리형 후보가 있지만 사용 가능한 모든 후보가 다른 활성 리스에 의해 점유된 경우, OmniRoute는 HTTP `429`, lease-capacity-unavailable 코드, waiting-for-capacity 상태 및 가장 이른 관련 만료 시점으로부터 산출된 제한된 `Retry-After`를 반환합니다. 일반적인 적격 후보 없음은 리스 경합이 아니며 기존 라우팅 오류 의미를 유지합니다.

관련 메커니즘은 계속 별도로 유지됩니다.

- OAuth 세션 점유는 OAuth 계정에 대한 프로세스 로컬 소프트 분배입니다.
- 계정 세마포어는 요청 동시성 권한을 부여하며 요청이 완료되면 종료됩니다.
- 독점 관리형 세션 리스는 세대 경계가 적용되는 지속 가능한 수명 주기 소유권입니다.

## 3. 모델 잠금

**범위:** provider + connection + model 트리플.

**상태별 주요 범위:** 실패한 상태에 따라 잠금이 기록되는 키가 결정됩니다
(`open-sse/services/accountFallback/exactModelLock.ts`의 `resolveLockoutScope()`):

- `429` / `403` / `402` — quota 또는 entitlement 신호 — **quota family**를 잠급니다.
  codex의 경우 전체 `codex` / `spark` 범위(해당 연결의 모든 `gpt-5*` 모델)를 잠그고,
  다른 provider의 경우 `getQuotaScopedModelForProvider()`를 사용합니다.
- `404`는 기본 model을 잠급니다(`getModelLockKey()`가 `not_found`를 좁힙니다).
- 그 외 모든 상태 — `5xx` 전송/서버 오류와 품질 검증에서 OmniRoute가 자체적으로
  생성한 `502` — 는 **정확한** provider/connection/model 튜플만 잠급니다.
  한 모델의 잘못된 스트림은 계정 quota에 대한 근거가 아닙니다. 이 규칙이 도입되기 전에는
  `codex/gpt-5.6-luna`에서 빈 응답 하나가 발생하면 quota에는 아무 영향이 없는데도
  해당 연결의 모든 `gpt-5*` 모델이 2–30분 동안(점진적으로 증가) 라우팅에서 제외되었습니다.
- 호출자가 명시한 `scope` 옵션은 항상 우선합니다(`"exact"`를 전달하는 Antigravity의 경우).

**목적:** 한 모델만 사용할 수 없거나 quota 제한을 받은 경우 전체 연결을 비활성화하지 않도록 합니다.

**예시:**

- 429를 반환하는 모델별 quota provider
- 누락된 특정 모델에 대해 404를 반환하는 로컬 provider
- provider별 모드/모델 권한 오류(예: Grok 모드)

**구현:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### 모델 쿨다운 대시보드 (v3.8.0)

UI: 설정 → 모델 쿨다운 (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

활성 잠금을 provider, connection, model, reason, expiresAt과 함께 나열합니다. 운영자는 카드에서 모델을 수동으로 다시 활성화할 수 있습니다.

**REST API:**

- `GET /api/resilience/model-cooldowns` — 활성 잠금 나열
- `DELETE /api/resilience/model-cooldowns` — 수동 재활성화. 본문: `{provider, connection, model}`. 인증: management.

### 쿨다운 관리자

UI: 모니터링 → 쿨다운 관리자 (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

일시적인 이유로 라우팅에서 제외된 모든 연결을 위한 단일 페이지입니다. 각 provider 페이지를
열 필요가 없습니다. 연결 쿨다운, 모델 잠금 및 terminal 상태를 나열하고, 연결별, 선택 항목별
또는 provider의 모든 연결에 대해 이를 해제하며, 가장 자주 조정되는 쿨다운 규칙인
`streamStallCooldown.enabled` 및 OAuth / API-key `connectionCooldown` 기본 쿨다운과
최대 backoff 단계 수를 편집합니다(`PATCH /api/resilience`를 통해 저장).
terminal 상태(`banned`, `expired`, `credits_exhausted`)는 나열되지만 여기서는 절대 해제되지 않습니다.

같은 페이지의 **오류 쿨다운 규칙** 카드는 `PATCH /api/settings`를 통해 운영자 오류 규칙
(`settings.providerErrorRules`)과 provider별 포괄 기본값
(`settings.providerErrorDefaults`)을 편집합니다 — 규칙이 어떻게 일치하는지는 §7의
"운영자 선언 규칙"을 참조하세요. 기간은 기본값(명시적 쿨다운 없음), 30분, 1시간,
5시간, 24시간 또는 1~43,200분(30일)의 사용자 지정 값 중에서 선택할 수 있습니다.

**REST API** (`src/lib/resilience/cooldownManager.ts`, 인증: management):

- `GET /api/resilience/cooldowns[?provider=]` — 상태, 남은 쿨다운, backoff 수준,
  마지막 오류 유형 및 모델 잠금이 포함된 연결(자격 증명 제외)
- `POST /api/resilience/cooldowns` — 본문 `{connectionIds: string[]}` 또는
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` 반환

### 잠금 설정 UI + 성공 감쇠 복구 (v3.8.23)

모델 잠금은 항상 활성화된 하드코딩 동작에서, 자체 설정 카드와 자가 복구 경로를 갖춘
완전히 구성 가능한 opt-in 기능으로 변경되었습니다.

**설정 카드:** 설정 → 모델 잠금
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
이는 위의 읽기 전용 `ModelCooldownsCard`와 **구별됩니다**(`ModelCooldownsCard`는 활성 잠금만
_나열_함) — 새 카드는 매개변수를 _구성_합니다. 기본값은
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`)에 있습니다.

| 설정                    | 기본값                           | 의미                                                     |
| ----------------------- | -------------------------------- | -------------------------------------------------------- |
| `enabled`               | `false`                          | 마스터 토글 — 모델 잠금은 기본적으로 **꺼져 있습니다**.  |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | 모델 범위 실패로 간주되는 upstream 상태입니다.           |
| `baseCooldownMs`        | `120_000` (120 s)                | 첫 번째 실패에 대한 초기 잠금 기간입니다.                |
| `maxCooldownMs`         | `1_800_000` (30 min)             | 증가된 쿨다운의 상한입니다.                              |
| `maxBackoffSteps`       | `10`                             | 지수 backoff 증가의 최대 단계 수입니다.                  |
| `useExponentialBackoff` | `true`                           | 반복된 실패가 쿨다운을 지수적으로 증가시킬지 여부입니다. |

설정은 일반 설정 저장소를 통해 유지되며 resilience 설정 스키마를 통해 검증됩니다. 카드는
`baseCooldownMs`/`maxCooldownMs`(`maxCooldownMs ≥ baseCooldownMs` 조건)와
`maxBackoffSteps`를 제한합니다.

**성공 감쇠 복구:** 복구는 **단순한 타이머 만료만으로 이루어지지 않습니다**. 정상 응답은
모델의 실패 횟수를 감소시켜, 기간 중간에 복구된 모델이 계속 증가하지 않고 타이머가 만료되기
전에 잠금이 해제되도록 합니다. 정상적인 combo 대상에서 `open-sse/services/combo.ts`는
`decayModelFailureCount()`를 호출하고(`open-sse/services/accountFallback.ts`),
이 함수는 저장된 `failureCount`를 절반으로 줄입니다
(`Math.floor(failureCount / 2)`). 값이 `0`에 도달하면 잠금 항목이 완전히 삭제됩니다.
이에 대응하는 `recordModelLockoutFailure()`는 증가 기간 내 실패가 발생할 때 횟수를 증가시키고
쿨다운을 확장합니다. 이 성공 감쇠는 일반적인 타이머 만료에 추가로 적용되며 — 두 경로 중
어느 쪽으로든 모델을 다시 활성화할 수 있습니다.

**상태:** 잠금은 **메모리 내에서** 유지됩니다(`provider:connectionId:model`을 키로 사용하는 프로세스별 `Map`의
`ModelLockoutEntry` 및 `provider:connectionId:exact:model`을 키로 사용하는 정확한 범위 잠금). DB에는
저장되지 않으므로 재시작하면 사라집니다. _설정_은 저장되지만 활성 잠금 _상태_는 임시적입니다.

---

## 4. 쿼터 공유 동시성 제어 (v3.8.36)

구독 계정(GLM, MiniMax 등)은 대개 동시 요청을 약 1~3개만
허용하며, 이를 초과하면 429와 쿨다운이 발생합니다. 여러 API 키가 하나의
업스트림 계정을 공유하는 **쿼터 공유**(`qtSd/…`) 조합에서는 이 문제가 특히
심각합니다. 공유 계정이 과도한 요청으로 넘쳐나지 않도록 세 가지 계층이
사용됩니다.

### 연결별 동시성 상한 (`max_concurrent`)

각 공급자 연결은 `max_concurrent` 상한을 선언할 수 있습니다
(`provider_connections.max_concurrent`, 연결 모달 / API / DB에서 설정).
제한을 적용하지 않으려면 비워 두십시오. 이 값은 아래 직렬화 계층을
구동하는 단일 설정입니다. 계정의 실제 동시성에 맞게 설정하십시오
(예: GLM은 약 1, MiniMax는 약 2).

### 모델별 동시성 상한 (`modelConcurrency`)

연결의 `rateLimitOverrides` 맵에 모델별 정확한 동시성 상한을 추가로
선언할 수 있습니다.

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

연결 모달(**Rate limit overrides → Per-model
concurrency caps**, 한 줄에 `model=cap` 하나) 또는 동일한 JSON 구조를
사용하는
`PATCH /api/providers/[id]`를 통해 설정할 수 있습니다. 주요 의미는 다음과
같습니다.

- **연결 전체 및 모델별:** `maxConcurrent`는 연결 전체에 공유되는 상한으로
  유지됩니다. 두 제한이 모두 적용되는 경우 동일한 복합 게이트
  (`global → provider → account → model`)에서 두 게이트를 원자적으로
  획득합니다. 실제 동작은 적용 가능한 제한 중 더 엄격한 쪽을 따릅니다.
- **모델 키 정확히 일치:** 키는 라우팅 확인 후 실행기에 전달되는 모델 문자열입니다. 일반적으로
  클라이언트 측 `provider/model` 별칭(`zai/glm-5`는 `glm-5`와 일치하지 않음)이
  아닌, 업스트림의 원래 모델 ID(`glm-5`)입니다. 값은 동시 요청 수를 나타내는
  양의 정수 상한이어야 합니다.
- **로컬 대기열, 검색 없음:** 초과 요청은 기존 대기열/시간 제한 의미 체계에 따라
  로컬에서 대기합니다(형식화된 `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` 승인 오류). OmniRoute는 업스트림 정책을 검색하거나
  추론하지 않으며, 운영자가 구성한 정확한 상한을 적용합니다. 포화된 모델
  게이트는 공급자를 비활성화하지 않으며 영구적인 모델 차단도 생성하지
  않습니다. 업스트림 429/쿨다운/폴백 동작은 계속해서 오류에 대한 최후의
  안전장치로 작동합니다.
- **연결별, 프로세스별 범위:** 상한은 DB 연결별로 적용되며 메모리에
  유지됩니다. 따라서 동일한 업스트림 API 키를 재사용하는 두 연결은
  서로 조정하지 않습니다.
- **구성하지 않으면 변경 없음:** 맵을 생략하거나 대시보드 필드를 비워 두면
  모델 게이트가 추가되지 않습니다. 공급자 전체에 보편적인 제한을
  적용한다고 가정하지 않는 구성 예시는 다음과 같습니다.

```text
glm-5=1
glm-4.7=3
```

### 쿼터 공유 요청 직렬화

쿼터 공유 디스패치가 양수 `max_concurrent`를 선언한 연결을 대상으로 할 때,
해당 **계정**에 대한 동시 요청은 연결별 세마포어(키
`qsconn:<connectionId>`)를 통해 직렬화됩니다. 초과 요청은 계정을
과부하시키는 대신 **대기열에서 대기**합니다. 이는 **fail-open** 방식입니다.
즉, 포화된 대기열이나 시간 초과가 발생해도 슬롯 없이 계속 진행하며,
디스패치 가능한 요청을 거부하지는 않습니다. **Settings → Resilience →
Quota-share per-connection
concurrency**에서 전환할 수 있습니다
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, 기본값 on).
`max_concurrent` 상한이 없으면 동작은 변경되지 않습니다.

> 쿼터 공유 라우팅 게이트(`selectQuotaShareTarget`, DRR + P2C) 자체도
> fail-open이며, 상한에 도달한 연결의 우선순위만 **낮춥니다**. 연결이 하나뿐인
> 풀에서는 이를 강제로 제한할 수 없으므로, 실제로 과도한 요청을 억제하는
> 것은 이 세마포어입니다.

### 조합 쿨다운 인식 재시도

모든 조합 전략에서(활성화된 경우), 요청이 SHORT 일시적 쿨다운에 대한 429를
확정적으로 발생시킬 상황이면 429를 반환하는 대신 해당 쿨다운이 끝날 때까지
대기한 후 다시 디스패치합니다. 이는 다중 모델 조합에서 Gemini 계열의 TPM/RPM
윈도우(약 60초의 retry-after)를 처리합니다. 예를 들어 2개 모델 조합의 두
대상이 모두 모델별 속도 제한에 걸린 경우가 이에 해당합니다.
대기는 **Settings → Resilience**의 `comboCooldownWait`(`enabled`,
`maxWaitMs`, `maxAttempts`, `budgetMs`)로 제한됩니다. `quota_exhausted`
(자정까지 잠김) 또는 인증/찾을 수 없음 사유에 대해서는 대기하지 않습니다.

조합은 `config.comboCooldownWaitEnabled: false`로 이 기능을 사용하지 않도록
설정할 수 있습니다. 리터럴 `false`만 이러한 공유 조합 대기(디스패치 후
쿨다운 대기 및 디스패치 전 회로 열림/모델 잠금 대기)와 대기 예산의 시간 제한
하한 확장을 비활성화합니다. 값이 없거나 `true`이면 전역 정책을 유지하며,
`true`로 전역적으로 비활성화된 대기를 활성화할 수는 없습니다. 명시적인
`targetTimeoutMs`가 있으면 항상 이를 우선합니다. 이 비활성화 설정은 별도의
네이티브 Codex 턴 고정 디스패치 전 대기에는 영향을 주지 않습니다.

동일한 게이트는 디스패치 전 상황(#16319)에도 적용됩니다. 조합의 모든 대상이
시도되기 전에 해당 모델이 짧은 일시적 잠금 상태이므로 건너뛰어지는 경우,
시도가 0회인 경로는 동일한 상한 아래에서 잠금이 풀릴 때까지 대기한 후 다시
디스패치합니다. 그 결과 힌트가 없는 `503 ALL_TARGETS_SKIPPED`로 응답하지
않습니다. 대기가 허용되지 않는 경우(상한, 시도 횟수 또는 예산 소진, 혹은
기능 비활성화) 최종 응답은 가장 이른 일시적 잠금 만료 시점의
`retry_after` / `reset_at`을 포함하는 `429 rate_limit_error`로
상향됩니다. 쿼터, 인증 및 찾을 수 없음 잠금은 힌트 없는 503을 유지합니다.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. 요청 큐 어드미션 제어 (v3.8.49 · issue #6593)

**범위**: 로컬 프로바이더+커넥션별 레이트 리밋 큐(`open-sse/services/rateLimitManager.ts`,
Bottleneck 기반)이며, 위의 세 가지 메커니즘보다 한 단계 아래 계층이다.

**`maxWaitMs`는 큐 대기 시간을 제한하고, `executionMaxWaitMs`는 실행 시간을 제한한다.**
이 둘은 의도적으로 분리되어 있으며, 서로에게 영향을 주지 않는다.

`resilienceSettings.requestQueue.maxWaitMs`는 **큐 대기 예산**이다. 이는
프로바이더 슬롯을 기다리는 시간과 그 후 QUEUED 상태로 대기하는 시간을 포함하며,
작업이 QUEUED 상태를 벗어나 실행을 시작하는 순간 타이머가 해제된다
(`rateLimitManager.ts`, `wrappedFn`). 이 시간을 초과한 요청은 업스트림에 도달하지
못한다. 기본값은 30000ms이며, `src/lib/resilience/settings.ts`의
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`에서 제공되고
`tests/unit/ratelimit-admission-control-6593.test.ts`에서 고정(pinned)되므로,
이 값을 변경하면 이 문단이 조용히 오래된 상태로 남는 대신 해당 테스트가 실패하게 된다.

`resilienceSettings.requestQueue.executionMaxWaitMs`는 Bottleneck이 작업
`expiration`으로 받는 값이며, 이 타이머는 디스패치 후에만 시작된다. 자체적인
업스트림 타임아웃이 없는 executor를 위한 안전장치(backstop)이며, executor 자체의
fetch 시작 타임아웃이 더 길면 그 값으로 올라가므로, 정상적으로 진행 중인 응답을
끊을 수 없다. 기본값은 600000ms(10분)이다.

큐 예산을 `expiration`에 넣는 것이 과거에 비증분(non-incremental) 게이트웨이를
전송 중간에 죽이던 원인이었다 — 이들은 첫 바이트가 오기 전에 몇 분씩 정상적으로
실행된다 — 그리고 이것이 expiration이 `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"`(HTTP 504)로 표면화되는 반면 큐 예산은
큐 타임아웃 코드를 갖는 이유이다. 둘 중 하나든 `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS`(환경 변수) 또는 대시보드
(**Settings → Resilience**)를 통해 재정의할 수 있다. 둘 다 정규화 시 1ms~24시간으로
클램프된다.

**둘 모두의 우선순위:** 환경 변수는 _기본값_만 제공한다.
`resilienceSettings.requestQueue`에 저장된 값(대시보드 / API patch로 설정,
`key_value`에 저장)이 그것보다 우선하고, 커넥션별
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs`가 그보다 더 우선한다.
따라서 이미 저장된 값이 있는 배포 환경에서 환경 변수를 설정해도 아무것도 바뀌지
않는다 — 대신 저장된 설정을 지우거나 업데이트해야 한다.

큐 체류 시간은 `maxWaitMs`로 제한되며, 아래의 `maxQueueDepth`는 동시에 큐에
들어갈 수 있는 호출자 수를 제한한다.

**본문에 명시된 재시도: 페이싱 vs 잠금.** 429 응답 본문은 자체적인 대기 시간을
지정할 수 있으며(Gemini `RetryInfo.retryDelay`, "retry after Ns" 텍스트),
`updateFromResponseBody`가 이를 읽는다. 커넥션의 `maxWaitMs` 안에 들어오는
대기 시간은 페이싱이다: 리미터가 그 시간 동안 리저버를 비우고, 다시 채워지면
큐에 있던 호출이 디스패치된다. `maxWaitMs`보다 긴 대기는 큐가 버텨낼 수 있는
것이 아니다 — Gemini는 소진된 일일 쿼터에 대해 `retryDelay: "86399s"`로
응답한다. 재구성된 429에 전달되는 `Retry-After`(#16528)가 이미 폴백 엔진으로
하여금 해당 기간 동안 모델을 잠그게 하지만, 리미터까지 그 기간 동안 일시정지하면
키에 일찍 도달하는 모든 호출(예: resilience 리셋 이후)이 `maxWaitMs` 전체 동안
멈추게 된다. 이러한 대기가 타입이 지정된 Google `RetryInfo`
detail(`google_rpc_retry_info` 출처)에서 오고 키의 리미터가 이미 모델 단위로
스코프되어 있는 경우(`getLimiterKey` 참조), 429는 대신 해당 커넥션에서의 모델
잠금이 되고(`open-sse/services/rateLimitManager/bodyRetryPause.ts`의
`lockModelForLongBodyRetry`, 최대 24시간), 리미터는 일시정지되지 않은 상태로
남는다. 계정 선택은 `isModelLocked()`를 통해 해당 잠금을 건너뛰며, 해당
커넥션에 고정된 타겟에 대한 콤보 사전 디스패치 게이트도 마찬가지이다. 쿼터
패밀리 단위 리미터를 사용하는 antigravity에서는 잠금이 정확한 모델 단위로
적용되며, 이는 다른 쿼터 잠금과 동일하다. 별칭(alias)이 해당 모델로 해석된
경우 클라이언트가 요청한 이름도 잠기는데, 이는 이러한 검사들이 요청된 이름을
사용하기 때문이다. 잠금은 정확히 일치하는 이름에만 적용되므로(`lockExactModel`),
antigravity 쿼터 패밀리나 codex 스코프를 넘나드는 별칭은 자기 자신의 이름을
잠그지 않는다. 산문 힌트, 타입이 없는 `retryDelay`, 또는 전체 커넥션이 공유하는
리미터의 경우에는 일시정지가 유지된다. 429 경로가 방금 재구성한 리미터가
일시정지되는 경우, 남은 큐 시간이 일시정지보다 먼저 끝나는 호출자는 그 시간을
기다리지 않고 즉시 큐 타임아웃 코드로 거부된다(`checkLimiterPause`). 기록된
종료 시각은 리미터가 빌드되기 전 — Bottleneck이 갱신 시계를 시작하는 지점 — 에
고정되며, 이후 리저버에 대한 변경은 이를 잊는다.
`tests/unit/rate-limit-long-body-retry-lockout.test.ts`와
`tests/unit/rate-limit-body-retry-pause.test.ts`에서 다룬다.

**`maxQueueDepth` — 옵트인 어드미션 상한 (신규).** `resilienceSettings.requestQueue.maxQueueDepth`는
하나의 프로바이더+커넥션에 대해 동시에 큐에 대기할 수 있는(아직 디스패치되지
않은) 요청 수를 제한한다. 큐에 이미 `maxQueueDepth`개의 요청이 있는 경우,
새 요청은 `limiter.schedule()`에 도달하기 **전에** 타입이 지정된
`code: "RATE_LIMIT_QUEUE_FULL"` 오류로 빠르게 거부된다 — 따라서 거부 비용이
저렴하며 해당 요청에 대한 다운스트림 프롬프트 압축 / 변환 작업이 일어나기
전에 발생한다. 기본값 `0` = 비활성화로, 기존의 무제한 큐 동작을 유지하며,
0–100000 범위로 제한된다. `RATE_LIMIT_MAX_QUEUE_DEPTH`(환경 변수) 또는
`resilienceSettings.requestQueue.maxQueueDepth`(대시보드/API patch)로
재정의할 수 있다.

어드미션 검사 자체는 순수 함수이다
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`).
따라서 실제 Bottleneck 리미터 없이도 단위 테스트가 가능하다.

> #6593을 연 RFC는 `bypassCompressionOnRateLimit` 플래그도 함께 제안했습니다.
> 이 저장소의 `open-sse/services/compression/` 파이프라인은 아웃바운드 LLM
> 요청(`chatCore.ts`의 `resolveCompressionSettings`/`selectCompressionStrategy`
> 블록 부근)에 대한 프롬프트/컨텍스트 압축이지, 합성된 429 본문에 대한 HTTP
> 응답 압축이 아닙니다. 따라서 문자 그대로의 바이패스 플래그에 대응하는 코드
> 경로는 존재하지 않습니다. 또한 이 프롬프트 압축 단계는 현재 요청 파이프라인에서
> `withRateLimit()` _보다 먼저_ 실행되므로, 큐가 가득 찬 상태의 거부 시 이를
> 건너뛰도록 순서를 변경하는 작업은 이 이슈의 범위를 넘어서는 별도의 더 큰
> 변경 사항입니다. 여기서는 의도적으로 구현하지 **않았으며**, CPU 절감 효과가
> 순서 변경에 따른 위험을 감수할 만큼 크다고 판단될 경우 후속 작업으로
> 남겨두었습니다.

### 레이트 리밋 자동 활성화 안전망 및 연결 보호 (`rateLimitProtection`)

**자동 활성화 안전망** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, 기본값 `true`):
기본적으로 OmniRoute는 모든 활성 API 키 프로바이더 연결(`getProviderCategory(provider) === "apikey"`)에 대해 레이트 리밋 큐 보호를 자동으로 활성화합니다. 이를 통해 레이트에 민감한 업스트림 API 키로 들어오는 요청이 업스트림 429 오류로 폭주하는 대신 Bottleneck을 통해 큐에 쌓이고 스로틀링되도록 보장합니다. 이 안전망은 `RATE_LIMIT_AUTO_ENABLE` 환경 변수로 재정의할 수 있으며(`false`/`0`/`off`는 비활성화, `true`/`1`/`on`은 강제 활성화), 환경 변수가 대시보드에 저장된 설정(**설정 → 복원력** / `PATCH /api/resilience`)보다 우선합니다.

**연결별 `rateLimitProtection`의 의미:**
연결별 레이트 리밋 보호는 프로바이더 연결의 `rateLimitProtection` 불리언 필드로 추적됩니다(SQLite에는 `rate_limit_protection`으로 저장됨):

- **명시적 켜짐 (`rateLimitProtection === true`)**: 프로바이더 카테고리나 자동 활성화 안전망의 켜짐 여부와 관계없이, 이 연결에 대해 레이트 리밋 보호가 명시적으로 활성화됩니다.
- **명시적 꺼짐 (`rateLimitProtection === false`)**: 명시적 보호를 비활성화하지만, 활성 API 키 연결을 전역 자동 활성화 안전망에서 제외하지는 **않습니다**. `reconcileEnabledConnections`(`open-sse/services/rateLimitManager.ts`)에서 `false`와 `undefined`는 동일하게 취급됩니다. 즉, `rateLimitProtection === true`만 명시적 재정의로 처리됩니다. `rateLimitProtection`이 `false`(또는 미설정)이면 활성 API 키 연결은 여전히 자동 활성화 조건에 해당하며 레이트 리밋 보호 상태가 유지됩니다.
- **연결별 옵트아웃 불가**: 운영자는 현재 다른 연결들에는 자동 활성화를 유지하면서 "이 특정 활성 API 키 연결 하나만은 레이트 리밋 큐 보호 없이 실행해야 한다"고 표현할 수 없습니다. API 키 연결을 레이트 리밋 큐 없이 완전히 실행하려면 안전망을 전역적으로 꺼야 합니다(`RATE_LIMIT_AUTO_ENABLE=false` 또는 `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**지원되는 쓰기 경로:**

- **`POST /api/rate-limits`**: 연결의 `rateLimitProtection`을 전환하기 위한 지원되는 관리용 쓰기 경로입니다(`{ connectionId: string, enabled: boolean }`). `enabled: true`로 호출하면 명시적 보호가 켜지고, `enabled: false`로 호출하면 명시적 보호가 해제됩니다(단, 자동 활성화가 켜져 있는 경우 활성 API 키 연결은 전역 안전망에 의해 계속 보호됩니다).
- **`PUT /api/providers/[id]`**: 의도적으로 `rateLimitProtection`을 받아들이거나 변경하지 **않습니다**(#11278). `PUT /api/providers/[id]`로 프로바이더 연결 메타데이터를 업데이트해도 저장된 레이트 리밋 보호 상태는 절대 변경되지 않습니다.

---

## 6. 느린 스트림 처리량 감시(#9709)

선택적 `resilienceSettings.streamRecovery.throughputWatchdog` 가드는 여전히 청크를 전송하지만 구성된 유용한 출력 속도보다 낮은 보조 출력을 생성하는 업스트림을 감지합니다. 유휴 시간 초과와는 의도적으로 다릅니다. 하트비트 및 메타데이터는 타이머를 재설정하지 않으며 진행률로 계산되지 않습니다. 또한 출력 품질에 관계없이 절대적인 안전 한도를 유지하는 하드 시도 기한(#9153)과도 다릅니다.

워치독은 워밍업 기간과 완전한 롤링 기간을 거쳐야 중단될 수 있습니다. 채팅 완료 및 응답 API 출력 이벤트(보수적인 UTF-8 바이트 프록시)에서 텍스트 델타를 계산하고, 사용 전용 및 빈 이벤트를 무시하고, 도구 호출 또는 추론 이벤트가 진행 중인 동안 판단을 일시 중지합니다. 이는 기본적으로 비활성화되어 있으며 `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` 로 활성화할 수 있습니다(env 값은 저장된 `resilienceSettings.streamRecovery.throughputWatchdog.enabled` 부울이 승리하는 기본 — 만 시드합니다. 이 가이드 상단의 env-vs-dashboard 우선 순위 참고 사항을 참조하세요). 창, 워밍업, 최소 속도 및 최소 측정 가능한 출력은 일반 복원력 설정 정규화 계층으로 제한됩니다.

활성화되면 감시 중단은 활성 업스트림 시도에만 적용됩니다. 클라이언트에 표시되는 바이트 전에 기존 동일한 계정의 조기 복구 경로가 시도를 다시 열 수 있습니다. 커밋 후에는 스트림이 맹목적으로 재생되지 않습니다. 기존의 안전한 미드스트림 연속 계약만이 접미사를 꿰맬 수 있습니다. 마무리는 단일 샷으로 유지되므로 사용량 계산 및 세마포어 릴리스가 중복되지 않습니다.

---

## 7. 업스트림 상태 재진술 (잘못 보고된 할당량 오류)

**범위:** 일시적인 할당량 소진을 잘못된 HTTP 상태로 보고하는 하나의 업스트림 게이트웨이.

**목적:** 분류 전에 오해를 유발하는 상태를 수정하여, 다운스트림 소비자(폴백 엔진, 콤보 집계, 클라이언트에 반환되는 응답)가 실패의 실제 재시도 가능 특성을 확인하도록 합니다.

일부 게이트웨이는 일시적인 할당량 소진을 재시도할 수 없는 HTTP
상태로 알립니다. `agentrouter.org`는 표준 `429` 대신 중국어 본문
(`用户额度不足` / `额度不足`)과 함께 `403`(때로는 `400`)을 반환합니다. Claude
Code와 같은 클라이언트는 `403`을 영구적인 오류로 처리하고 세션을 중단하며, 수정하지
않으면 폴백 엔진은 이를 할당량 이벤트가 아닌 `AUTH_ERROR`로 분류합니다.

**구현:**

- 레지스트리 + 매처: `open-sse/config/upstreamStatusRestatement.ts` — 제공자별 규칙
  목록(`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`)이며,
  `applyStatusRestatement()`를 통해 매칭됩니다.
- 호출 지점: `open-sse/handlers/chatCore.ts`의 `providerFailure:` 블록
  (약 3654번째 줄)에서, `parseUpstreamError()`가 오류 HTTP 상태를 가진 업스트림
  응답(`!providerResponse.ok`)을 파싱한 직후이자 모든 분류가 실행되기 전에 호출됩니다.
  따라서 모든 다운스트림 소비자가 수정된 상태를 확인합니다. `200` SSE 스트림 내부에
  포함된 오류는 별도의 이후 스트림 파싱 경로를 따르므로 오늘날 이 훅의 적용 대상이
  아닙니다 — 이는 알려진 제한 사항이며, 현재는 오류 HTTP 상태로 나타나는
  agentrouter의 잘못된 상태에는 필요하지 않습니다.
- 재시도 가능 여부: `429`는
  `open-sse/services/combo/unavailableRetryGate.ts`의
  `RETRY_AFTER_ELIGIBLE_STATUSES`에 포함되어 있으므로, 상태가 재진술된 오류는
  무효한 `403`으로 노출되는 대신 실제 재시도 가능 시간을 전달합니다.
- 합성된 `60s` `defaultRetryAfterMs`(`upstreamStatusRestatement.ts`)는 재진술된
  응답이 **클라이언트**에 알려 주는 값일 뿐입니다. 이는 연결의 내부 쿨다운/차단
  기간 자체가 아닙니다 — 해당 기간은 재진술된 오류를 실제로 처리하는 메커니즘에
  따라 별도로 결정됩니다(연결 쿨다운의 점진적 백오프, §2, API 키 제공자의 기본
  `3s`; 또는 agentrouter와 같은 모델별 할당량 제공자의 모델 차단, §3). 라우터는
  클라이언트에 알린 60초 기간보다 더 빨리 내부적으로 재시도 가능한 상태가 될 수
  있습니다 — 이는 의도적인 여유이며 버그가 아닙니다.

영구적인 오류(agentrouter의 `无权访问模型` — 이 모델에 대한 액세스 권한 없음)는
절대로 재진술되지 않습니다. `excludeMarkers`가 `textMarkers`에 일치하더라도
규칙을 무효화하므로, 오류는 원래 상태를 유지하고 아무것도 영원히 재시도하지
않습니다. 일치하는 제공자 분류 규칙
(`open-sse/config/providerErrorRules.ts`의
`agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, 선언된 기본 쿨다운 `6h`)은
`checkFallbackError`(`open-sse/services/accountFallback.ts`)가 일반적인
apikey 카테고리 `FORBIDDEN` 조기 반환보다 _먼저_ 참조합니다. 이는
`honorsRuleLockScope(provider)`에 의해 제한됩니다(`#10334` — 현재
`providerErrorRules.ts`의 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 허용 목록을 통해
agentrouter에만 적용됨). 규칙에 선언된 6시간 쿨다운은
`fallbackResult.baseCooldownMs`로 전달되지만, 기존의 모델별 할당량 차단 경로
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`)로 계속 전달됩니다(`#10334`로 변경된 것은
쿨다운의 출처뿐임). 이 값은 다른 모든 모델 차단과 마찬가지로 운영자의
`mlSettings.maxCooldownMs`(기본값 `1_800_000ms` / 30분)까지 낮춰집니다.
또한 _지속되는 차단 사유_는 규칙의 `"auth_error"`가 아니라 기존에 하드코딩된
`"forbidden"`으로 유지됩니다 — 전체 경로에서 적용되는 것은 쿨다운 기간뿐이며
사유 문자열은 적용되지 않습니다. 연결 자체는 활성 상태로 유지되며, 동일한 연결의
다른 모델에는 영향이 없습니다.

재진술된 할당량 오류(`额度不足`)는 프로덕션에서 제공자 규칙에 도달합니다
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, 자체적으로 선언된 쿨다운 없음 — 지속성 계층의 조정된 백오프
기본값이 적용됨). `#10334` 이후 `ProviderErrorRuleMatch`의 `scope`는
처음부터 끝까지 실제로 사용되지만, `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
허용 목록에 포함된 제공자에 대해서만 적용됩니다(`providerErrorRules.ts` —
현재는 `"agentrouter"`만 해당하며 `honorsRuleLockScope()`를 통해 제한됨).
다른 모든 제공자에서 `scope`는 `#10334` 이전과 정확히 마찬가지로 정보 제공용으로
남습니다. `checkFallbackError`는 일치한 규칙의 scope를
`fallbackResult.ruleScope`로 노출합니다. `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`)는 `ruleScope`가 연결 전체에 적용 가능하고
자동 복구되는 신호로서 실제로 안전한지 확인하는 공용 가드입니다
(scope가 `"connection"`이고, reason이 `quota_exhausted`이며, `permanent`가
아니고 `creditsExhausted`도 아님 — 향후 규칙에서 scope `"connection"`과
영구적인 계정 상태를 조합하는 것을 방지하기 위한 방어책). 이를 호출하는 소비자는
두 곳입니다:

- **영속성** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider의 **모델별** 잠금 분기(agentrouter는 `passthroughModels: true`이므로 `hasPerModelQuota()`가 `true`를 반환)로 넘어가는 대신, **임시 연결 쿨다운**을 적용한다 —
  `testStatus: "unavailable"` + `rateLimitedUntil`을 설정하며, 최종 상태
  (`credits_exhausted`/`banned`/`expired`)로 설정하지 않는다 — 따라서 수동 자격 증명 재설정이
  필요하지 않고 쿨다운이 만료되면 연결이 자체적으로 복구된다.
  `disableCooling: true`인 연결에서는 건너뛴다 (#2997): 이 옵트아웃은 대신 모델별 잠금으로 넘어간다(문서화된 트레이드오프 — 분기 위의 코드 주석 참조).
- **동일 요청 콤보 라우팅** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): 동일한 가드가 연결을
  `${provider}:${connectionId}`를 키로 사용하는 메모리 내 `exhaustedConnections` 세트에 추가한다. 이는 남아 있는 동일 요청 대상 중 _자체 target 객체에 이미 정확히 해당 `connectionId`를 포함하는_ 대상만 건너뛴다
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections` 조회 전에 있는 `if (provider &&
connectionId)`) — 일반적인 모델 목록 콤보에서는 형제 대상에 자체적으로 고정된 `connectionId`가 없고, 각 대상은 디스패치마다 응답의 `X-OmniRoute-Selected-Connection-Id` 헤더를 통해서만 확인되므로 이 키 일치가 절대 발생하지 않는다. 이 일반적인 경우, 남아 있는 대상이 방금 소진된 계정을 재사용하지 못하도록 실제로 보호하는 것은 이 Set이 아니다 — 위의 영속성 계층(연결의 `rateLimitedUntil`이 현재 시점보다 미래로 설정됨)과, 이 동일한 가드가 해당 실패에 대한 `transientRateLimitedProviders`를 억제하는 동작의 결합이다(`targetExhaustion.ts`의 "Two-stage design" 및 `isAgentrouterConnectionQuotaScope` 분기의 코드 주석 참조): Set을 표시하지 않은 상태에서는 `combo.ts`의 `allowRateLimitedConnection` 강제 허용
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`)이 provider의 남은 대상에 대해 작동하지 않으므로, 자격 증명 선택의
  `rateLimitedUntil` 필터(`src/sse/services/auth.ts:1238`)가 정상적으로 적용된다. 따라서 남은 대상은 서로 다르고 여전히 사용 가능한 agentrouter 연결을 선택하거나 자격 증명을 사용할 수 없어 실패하며 — 이 분기가 방금 쿨다운한 연결로 강제로 되돌아가지 않는다.

### 2단계 설계: 상태 재진술 후 분류

상태 재진술(`upstreamStatusRestatement.ts`)과 provider
분류 규칙(`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`)은 모두 provider id와 텍스트 마커를 기준으로 하는 별도의 레지스트리이지만, 서로 다른 위치에서 실행되며 목적도 다르다. 재진술은 `chatCore.ts`에서 HTTP 상태를 일찍 다시 작성하고,
분류 규칙은 `checkFallbackError()` 내부에서 대체 `reason`과 잠금
`scope` (`model` / `provider` / `connection`)를 결정한다
(`open-sse/services/accountFallback.ts`).

분류 규칙은 `providerErrorRules.ts`의
`FULL_TEXT_RULE_PROVIDERS` 허용 목록에 포함된 provider에 대해서만 전체 오류 **텍스트**를 확인한다(본문 마커 `额度不足` 등을 일치시키는 데 필요함) — 현재는 `"agentrouter"`만 포함되어 있다. 그 외 모든 **기본 제공 카탈로그** provider에 대해 `checkFallbackError`는 `getProviderErrorRuleMatch`에 구조화된 오류(`{code, type}`)만 전달한다. 이는 헤더/상태/코드 기반 규칙에는 충분하지만 본문 텍스트 마커는 확인할 수 없다.
헬퍼 `resolveRuleMatchBody()`가 이 선택을 수행한다. 허용 목록에 있는 provider에는 전체 오류 텍스트를 사용하고, 그 외에는 구조화된 오류를 사용한다. **기본 제공** provider를 `FULL_TEXT_RULE_PROVIDERS`에 추가하는 것은 provider별 명시적 옵트인이다 — 이 목록에 없는 모든 provider의 기본 경로를 바이트 단위로 변경 없이 유지하기 위해 존재한다.

규칙의 `scope` (`model` / `provider` / `connection`)는
`FULL_TEXT_RULE_PROVIDERS`와 별개의 옵트인이다. `checkFallbackError`는 이를 `fallbackResult.ruleScope`로만 노출하며, 다운스트림 소비자는 동일 파일의
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` 허용 목록에 있는 provider에 대해서만 이를 정보성 레이블 이상의 의미로 적용한다(`honorsRuleLockScope()`를 통해 제한됨 — 현재는 `"agentrouter"`만 해당). provider가 해당 허용 목록에 포함된 후 `scope: "connection"` 일치가 실제로 수행하는 작업은 위의 "재진술된 할당량 오류"를 참조한다.

**#11104 — 운영자가 선언한 규칙은 두 허용 목록을 모두 우회한다.** 운영자는 이 파일을 수정하지 않고 런타임에 `settings.providerErrorRules`를 통해 provider별 규칙을 선언할 수 있다
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`).
운영자 규칙을 `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`로 제한하면 — 기본 제공 카탈로그 규칙의 **기본** 동작을 보호하기 위한 허용 목록이므로 — 규칙 선언 자체가 운영자의 명시적 옵트인임에도 이미 해당 목록에 있는 provider를 제외한 모든 provider에서 설정 메커니즘이 무효화된다. `resolveRuleMatchBody()`와 `honorsRuleLockScope()`는 모두 먼저 `hasOperatorRuleForProvider()`를 확인한다. 따라서 운영자 규칙이 있는 provider는 어느 허용 목록에 포함되어 있는지와 관계없이 원시 오류 텍스트를 사용하고 선언된 `scope`가 적용된다.

**운영자가 선언한 규칙** (`OperatorProviderErrorRule`): 각 규칙에는 선택적 `status`와 선택적 `match`(오류 텍스트에 대한 단순한 대소문자 구분 없는 부분 문자열이며, ReDoS를 유발할 수 없도록 RegExp가 아님)가 있으며, 둘 중 하나 이상을 반드시 설정해야 한다. 둘 다 설정하면 AND 조건으로 결합된다. 생략된 필드는 무엇이든 일치하므로 `{match: "insufficient_quota"}`는 해당 코드를 포함하는 모든 상태와 일치한다. 처음 일치하는 규칙이 적용된다. `cooldownMs`는 최대 30일까지 허용되며, 전체 규칙 수는 최대 50개이다.

**포괄 기본값** (`settings.providerErrorDefaults`, 옵트인, `setOperatorProviderErrorDefaults`를 통해 설정): `{[provider]: {cooldownMs, scope?, reason?}}`
`cooldownMs`는 1분에서 30일까지입니다. 기본값은 operator 규칙과 기본 제공 카탈로그 규칙이 모두 일치하지 않은 경우에만 적용되며, 402, 403, 408, 429 및 5xx 오류에만 적용됩니다. 요청 형태 오류(400, 404, 409, 413, 422)와 단독 401은 기존 처리를 유지합니다. 명시적인 `reason`이 없으면 `classifyError`와 동일한 방식으로 상태 코드에서 reason이 결정됩니다. 기본값을 선언하면 `hasOperatorRuleForProvider()`에서 operator 규칙으로 간주되므로 해당 `scope`(기본값 `"connection"`)가 적용됩니다. 기본값의 유효 cooldown은 `cooldownMs`와 provider 자체의 재시도 힌트(`Retry-After`, `x-ratelimit-reset` 또는 본문의 reset 힌트, connection-cooldown 설정에서 "use upstream retry hints"가 켜져 있을 때 엔진이 적용하는 것과 동일한 힌트) 중 더 긴 값입니다. 따라서 기본값은 짧은 upstream 힌트를 늘릴 수 있지만 실제 reset 시간을 절대로 단축하지는 않습니다. 명시적인 operator 규칙은 지정된 `cooldownMs`를 그대로 유지합니다. 규칙이나 기본값 어느 것도 `markAccountUnavailable`의 connection-cooldown 보호를 우회하지 않습니다. 즉, 활성 상태인 더 긴 cooldown은 절대로 단축되지 않으며 terminal status도 덮어쓰지 않습니다. `checkFallbackError`에서 더 먼저 실행되는 기본 제공 텍스트 감지기(credits exhausted, daily quota, account deactivated)는 해당 자체 문구에 대해 계속 우선 적용됩니다.

**알려진 공백 — `providerRuleRegistry`는 HTTP 400에 대해 조회되지 않습니다.**
`checkFallbackError`의 `BAD_REQUEST` 분기는 자체 패턴 배열(`accountFallback.ts`의 `MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` 등)을 통해 상태 400을 전적으로 분류하고, 그 위에 있는 `configuredRule`/`getProviderErrorRuleMatch` 분기에 도달하기 전에 반환합니다. `status: 400`인 기본 제공 카탈로그 규칙(또는 operator 규칙)은 문법상 유효하지만 절대로 실행되지 않습니다. 현재 400을 대상으로 하는 기존 규칙은 없으므로 프로덕션에는 영향이 없습니다. 하지만 향후 400 규칙을 추가하려면 먼저 이 분기를 수정해야 합니다. 이는 규칙을 추가하는 것보다 큰 변경이며, 이미 패턴 배열 동작에 의존하는 모든 provider에 대한 400 재분류가 발생하므로 단일 provider 규칙 추가의 범위를 벗어납니다.

### 새로운 quota-misstating gateway 추가

1. `statusRestatementRegistry`에 하나의 규칙 배열을 등록합니다
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers`는 provider별로 유지하고, `CREDITS_EXHAUSTED_SIGNALS`(`open-sse/services/accountFallback.ts`)와 충돌하는 일반적인 영어 문구는 재사용하지 않습니다.
2. 필요에 따라 `open-sse/config/providerErrorRules.ts`(`providerRuleRegistry`)에 분류 규칙을 등록하여 올바른 lock scope를 선택합니다(account 전체 quota에는 `connection`, 모델별 오류에는 `model`). 이 단계는 전체 오류 텍스트가 필요한 규칙(body markers)을 사용하는 provider에 대해서만 프로덕션에서 적용됩니다. 같은 파일의 `FULL_TEXT_RULE_PROVIDERS`에 provider id를 추가해야 합니다. 그렇지 않으면 `checkFallbackError`는 구조화된 `{code, type}` 오류만 규칙에 전달하며 body-text 규칙은 실제 트래픽에서 절대로 일치하지 않습니다. `status`/`headers`만으로 일치하는 규칙(Opencode 또는 Minimax의 규칙 등)에는 이 옵트인이 필요하지 않습니다. 이와 별도로 규칙이 `scope: "connection"`을 선언하고 실제 connection-wide cooldown과 동일 요청 combo skip을 적용하려는 경우(단순한 정보성 레이블이 아닌 경우) 같은 파일의 `HONORS_RULE_LOCK_SCOPE_PROVIDERS`에 provider id를 추가합니다. 이는 `markAccountUnavailable()`(`src/sse/services/auth.ts`)의 `isAgentrouterConnectionQuotaScope()` 방식 소비와 `applyComboTargetExhaustion()`(`open-sse/services/combo/targetExhaustion.ts`)을 활성화하는 게이트입니다. 이를 추가하지 않으면 `scope`는 여전히 `fallbackResult.ruleScope`를 통해 전달되지만 아무 동작도 일어나지 않습니다.
3. `tests/unit/upstream-status-restatement.test.ts` 및 `tests/unit/agentrouter-error-rules.test.ts`를 본뜬 단위 테스트를 추가합니다(`not-permanent` / `not-creditsExhausted` 보호 조건 포함). provider에 allowlist가 필요한 경우에는 `resolveRuleMatchBody()`가 해당 provider에 대해서만 전체 텍스트를 반환하는지 검증하는 테스트도 추가합니다.

`chatCore.ts`, `classifyError` 또는 combo는 변경할 필요가 없습니다.

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`에 포함된 provider(opencode 계열)는 IP-bucketed upstream으로 처리됩니다(opencode 무료 요금제는 account-bucketed가 아니라 IP-bucketed입니다 — #9611 참조). 상태 429가 `quota_exhausted` **또는** `rate_limit_exceeded`로 분류되면, rotation이 해당 연결을 시도하기 전에 실패한 연결의 마지막으로 확인된 egress IP와 일치하는 모든 allowlisted-family 연결을 cooldown합니다
— 이를 통해 N-1개의 실패가 보장된 upstream 호출을 방지합니다(#10460/#10525와 동일한 형태). `rate_limit_exceeded`가 의도적으로 포함된 이유는 다음과 같습니다. `markAccountUnavailable` 경로에서는 opencode별 규칙이 절대로 일치하지 않습니다(`checkFallbackError`에 headers/body가 전달되지 않고, opencode는 `FULL_TEXT_RULE_PROVIDERS`에 포함되지 않음). 따라서 subscription-quota 텍스트("monthly usage limit reached")를 포함한 429는 `status_429` 규칙에 도달하기 전에 quota-text fallback(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1시간 cooldown)을 통해 `quota_exhausted`로 분류됩니다. 반면 quota-text가 없는 429(일반 rate limiting)는 `status_429` 규칙을 통해 `rate_limit_exceeded`로 분류되며 IP 계열 전체를 계속 cooldown합니다. allowlisted provider에서 IP-bucketed rate limit은 quota 소진과 동일한 신호입니다. 정직한 제한 사항은 다음과 같습니다.

- **최선의 노력**: 이 잠금은 `proxy_logs`에서 연결의 마지막으로 알려진 `egress_ip`를
  조회해 연결합니다(24시간 범위, 동기식, 캐시 없음). 콜드 캐시(egress
  IP가 한 번도 조회되지 않음) 또는 행이 없는 경우 → 실패한 연결은 여전히
  분기에 의해 쿨다운되지만(현재와 같이 기록됨), 형제 연결은 잠기지 않습니다.
- **절대 종료 상태가 아님**: 쿨다운은 갱신되는 할당량 창입니다
  (`testStatus: "unavailable"`). IP 수준 신호에서 영구 상태를 도출하지 않습니다.
  `disableCooling` 연결은 분기를 완전히 건너뜁니다.
- **허용 목록에 있는 제품군의 잠금 세분성이 변경됨**: 이는 단순한 형제 최적화가
  아니라 범위 변경입니다. opencode는 `passthroughModels` 제공자이므로 이 분기
  전에는 429가 모델별 잠금을 발생시켰지만, 이제는 형제 연결이 전혀 없는 단일
  연결만 운영하는 경우를 포함해 연결 쿨다운을 발생시킵니다. 이것이 opencode 규칙
  테이블(`scope: "connection"`, `providerErrorRules.ts`)에서 이미 올바르다고 선언한
  세분성이며, 지금까지는 opencode가
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`에 포함되지 않았기 때문에 적용되지 않았습니다.
  이 분기는 연결 범위의 agentrouter 분기를 그대로 본떠 실패한 연결의 쿨다운과
  `backoffLevel`을 직접 기록한 후 반환합니다 — 따라서 모델별 차단과 아래의 일반
  경로에는 절대 도달하지 않습니다.
- **콤보 포함**: agentrouter 분기와 마찬가지로, 이 범위는 콤보 호출자가 429에
  적용하는 `persistUnavailableState`/`isCombo` 다운그레이드를 의도적으로 무시합니다.
  모델별 잠금은 이 범위의 약한 형태가 아니라 잘못된 단위입니다. 소진된 IP에 대해
  아무것도 말해 주지 않으므로, 콤보 순환은 형제별로 실패가 보장된 호출을 하나씩
  계속 소모하게 됩니다.
- **형제 안전성**: 이미 종료 상태(banned/credits_exhausted)이거나 이미 더 긴
  쿨다운 상태인 형제 연결은 절대 덮어쓰지 않습니다.
- **배타적 허용 목록**: `EGRESS_BUCKETED_LOCK_PROVIDERS`를 확장하는 것은
  명시적인 소유자 결정입니다. 일반적인 연결은 없습니다(패턴 #10334/#10419).
  형제 조회는 동일한 허용 목록을 바인딩하므로 SQL 리터럴로 반복하지 않습니다.
  따라서 이를 확장하는 작업은 한 줄 변경으로 유지됩니다.
- **양방향 egress IP 순환**: 조회 범위(24시간)는 egress-IP 캐시 TTL(5분)보다
  훨씬 넓으므로 "마지막으로 알려진 IP"는 현재 상태가 아니라 이력입니다. 연결의
  프록시가 범위 내에서 순환된 경우 잠금이 실제로 공유된 IP를 **놓칠** 수 있습니다
  (기록된 IP는 새 IP이며 아직 소진되지 않음) — 반대로 소진된 IP에서 이미
  순환되어 벗어난 형제 연결을 **쿨다운**할 수도 있습니다. 두 번째 경우에는 해당
  형제 연결이 쿨다운 창 하나를 비용으로 부담합니다. 두 경우 모두 이력 기반
  조회에서 발생하는 최선의 노력 수준의 한계로 허용됩니다.
- **비용**: 429가 발생한 경우에만 `proxy_logs`를 두 번 제한적으로 스캔합니다
  (`idx_pl_timestamp`를 통해 범위 필터링). 새 인덱스는 없습니다(마이그레이션 134
  YAGNI). 중간 규모의 실제 트래픽 DB 복사본에서 측정했으며, 처리량이 높은
  인스턴스는 동일한 범위에 비례해 더 많은 행을 보유합니다.

## 기타 복원력 기능

- **20가지 라우팅 전략** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) 참조.
- **리셋 인식 라우팅** (v3.8.0) — 할당량 리셋 시간을 기준으로 연결의 우선순위를 지정합니다.
- **백그라운드 모드 저하** — Responses API의 `background: true`가 경고와 함께 동기 방식으로 저하됩니다.
- **동적 도구 제한 감지** — 도구 개수 제한에 도달하면 프로바이더를 백오프합니다.
- **긴급 폴백** — `OMNIROUTE_EMERGENCY_FALLBACK`으로 제어되며, 운영자는 재시작 없이 Feature Flags 페이지에서 재정의할 수 있습니다.

---

## 디버깅

- Weighted 콤보가 `503 all_targets_cooling_down`을 반환하는 경우 (`Retry-After`가 설정되고, `diagnostics.excluded`에 모든 대상이 `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`로 나열됨) → 풀은 구성되고 연결되어 있으며, 모든 대상이 복원력 타이머에 의해 제외된 것뿐입니다. `[COMBO] Weighted selection: every target excluded before dispatch — …` 경고에 이유와 남은 초가 표시됩니다. 같은 콤보에서 `404 no_executable_targets`는 복원력 타이머가 관여하지 않았음을 의미합니다 (실행할 대상이 없거나 모든 계정이 가용성 프로브에 실패한 경우). `targetResolution.ts`에서 수집된 제외 항목을 바탕으로 `open-sse/services/combo/pinRecovery.ts`에 구축되었습니다.
- 프로바이더의 모든 키가 건너뛰어짐 → 서킷 브레이커 상태와 각 연결의 `rateLimitedUntil`/`testStatus`를 모두 확인하세요.
- 리셋 윈도우 이후 프로바이더가 영구적으로 제외됨 → `getStatus()`/`canExecute()` 대신 원시 `state`를 읽는 코드가 있는 경우입니다.
- 하나의 키가 실패하고 다른 키들은 작동해야 하는 경우 → 서킷 브레이커보다 연결 쿨다운을 우선적으로 확인하세요.
- 하나의 모델만 실패하는 경우 → 연결 쿨다운보다 모델 락아웃을 우선적으로 확인하세요.
- 상태가 자동으로 복구되어야 하는데 복구되지 않음 → 미래 타임스탬프와 만료된 상태를 갱신하는 읽기 경로를 확인하세요. 영구 상태는 수동 변경이 필요합니다.

---

## 런타임 상태 — 에이전트 빠른 참조

> 에이전트 가이드가 40k 컨텍스트 예산을 넘지 않도록 `AGENTS.md` → "Resilience Runtime State"에서 그대로 이동되었습니다 (PR #12743). 이것은 위 섹션들을 압축한 에이전트용 뷰이며, 번호가 매겨진 섹션들이 전체 참조로 남아 있습니다.

OmniRoute에는 서로 관련되어 있지만 구분되는 세 가지 일시적 장애 메커니즘이 있습니다. 라우팅 동작을 디버깅할 때 이들의 범위를 구분해서 다루세요. 한눈에 파악할 수 있는 맵은 [3계층 복원력 다이어그램](../diagrams/exported/resilience-3layers.svg) (소스: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))을 참조하세요.

### 프로바이더 서킷 브레이커

**범위**: 전체 프로바이더, 예: `glm`, `openai`, `anthropic`.

**목적**: 업스트림/서비스 수준에서 반복적으로 실패하는 프로바이더로 트래픽 전송을 중단하여, 하나의 비정상 프로바이더가 모든 요청을 느려지게 하지 않도록 합니다.

**구현**:

- 핵심 클래스: `src/shared/utils/circuitBreaker.ts`
- 채팅 게이트/실행 배선: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- 런타임 상태 API: `src/app/api/monitoring/health/route.ts`
- 공유 래퍼: `open-sse/services/accountFallback.ts`
- 영속 상태 테이블: `domain_circuit_breakers`

**상태** (4개 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: 정상 트래픽이 허용됩니다.
- `DEGRADED`: 조기 경고 구간 — 실패가 저하 임계값을 넘었지만 아직 브레이커 임계값에는 도달하지 않은 상태입니다. 트래픽은 계속 흐르고 대시보드에 경고가 표시됩니다. 유효한 연결 테스트가 성공하거나 새로운 실패가 없는 조용한 윈도우가 지나면 `CLOSED`로 돌아갑니다 (윈도우는 `docs/architecture/RESILIENCE_GUIDE.md`에 있음).
- `OPEN`: 프로바이더가 일시적으로 차단됩니다. 호출자는 프로바이더 서킷 오픈 응답을 받거나, 콤보 라우팅이 다른 대상으로 건너뜁니다.
- `HALF_OPEN`: 리셋 타임아웃이 경과했습니다. 프로브 요청을 허용합니다. 성공하면 브레이커가 닫히고, 실패하면 다시 열립니다.

**기본값** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, `src/lib/resilience/settings.ts`의 `DEFAULT_RESILIENCE_SETTINGS.providerBreaker`를 통해 소비됨 → `src/sse/handlers/chatHelpers.ts`의 `getCircuitBreaker(provider, …)`). 전체 프로바이더 브레이커는 `circuitBreakerThreshold` / `circuitBreakerReset`으로 동작합니다:

| 프로필 | 저하 시점 | 개방 시점 (`circuitBreakerThreshold`) | 리셋 (`circuitBreakerReset`) |
| ------ | --------: | ------------------------------------: | ---------------------------: |
| OAuth  |       `5` |                                   `8` |                        `60s` |
| API 키 |       `7` |                                  `12` |                        `30s` |
| 로컬   |  (파생됨) |                                   `2` |                        `15s` |

`PROVIDER_PROFILES`는 `providerFailureThreshold` (10/15/2), `providerFailureWindowMs` (15/30/5분), `providerCooldownMs` (5/10/1분)도 정의합니다. 이들은 **옵트인 전역 Provider Cooldown의 윈도우 게이트**(`PROVIDER_COOLDOWN_ENABLED`, 기본값 꺼짐)를 구동합니다. `open-sse/services/providerCooldownTracker.ts`의 프로바이더 수준 항목은 `providerFailureWindowMs` 안에서 `providerFailureThreshold`회 실패한 후에야 쿨링 중으로 계산되며, 그 후 `providerCooldownMs` 동안 쿨링됩니다. 이들은 라이브 브레이커의 임계값이 아닙니다 — 브레이커 동작을 기대하며 이 값들을 튜닝하지 마세요. 모든 기본값은 `OMNIROUTE_PROVIDER_BREAKER_*` 및 `OMNIROUTE_CIRCUIT_BREAKER_*` 환경 변수로 재정의할 수 있으며, 런타임 기준으로 정확한 참조 표는 `docs/architecture/RESILIENCE_GUIDE.md`에 있습니다.

프로바이더 수준의 실패 상태만 프로바이더 브레이커를 트립해야 합니다:

```ts
(408, 500, 502, 503, 504);
```

대부분의 `401`, `403`, `429`와 같은 일반적인 계정/키/모델 오류에 대해서는 전체 프로바이더 브레이커를 트립하지 마세요. 이러한 오류는 일반적으로 연결 쿨다운 또는 모델 락아웃에 해당합니다. 일반적인 API 키 프로바이더의 `403`은 종결적인(terminal) 프로바이더/계정 오류로 분류되지 않는 한 복구 가능해야 합니다.

브레이커는 백그라운드 타이머가 아닌 지연 복구(lazy recovery)를 사용합니다. `OPEN` 상태가 만료되면 `getStatus()`, `canExecute()`, `getRetryAfterMs()` 같은 읽기 작업이 상태를 `HALF_OPEN`으로 갱신하므로, 대시보드와 콤보 후보 빌더가 만료된 프로바이더를 계속 제외하지 않습니다.

### 연결 쿨다운

**범위**: 프로바이더 연결/계정/키 하나.

**목적**: 문제가 있는 키/계정 하나를 일시적으로 건너뛰면서, 동일한 프로바이더의 다른 연결은 계속 요청을 처리할 수 있게 합니다.

**구현**:

- 쓰기/업데이트 경로: `src/sse/services/auth.ts::markAccountUnavailable()`
- 계정 선택/필터링: `src/sse/services/auth.ts::getProviderCredentials...`
- 쿨다운 계산: `open-sse/services/accountFallback.ts::checkFallbackError()`
- 설정: `src/lib/resilience/settings.ts`

프로바이더 연결의 중요 필드:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

계정 선택 중에는 다음 조건일 때 연결이 건너뛰어집니다:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

쿨다운도 지연 방식입니다: `rateLimitedUntil`이 과거가 되면 연결은 다시 사용 가능해집니다. 성공적으로 사용되면 `clearAccountError()`가 `testStatus`, `rateLimitedUntil`, 오류 필드, `backoffLevel`을 지웁니다.

기본 연결 쿨다운 동작:

- OAuth 기본 쿨다운: `5s`.
- API 키 기본 쿨다운: `3s`.
- API 키 `429`는 가능한 경우 업스트림 재시도 힌트(`Retry-After`, 리셋 헤더, 또는 파싱 가능한 리셋 텍스트)를 우선해야 합니다.
- 반복되는 복구 가능한 실패는 지수 백오프를 사용합니다:

```ts
baseCooldownMs * 2 ** failureIndex;
```

썬더링 허드(thundering herd) 방지 가드는 동일한 연결에서의 동시 실패가 쿨다운을 반복적으로 연장하거나 `backoffLevel`을 이중으로 증가시키는 것을 방지합니다.

터미널 상태는 쿨다운이 아닙니다. `banned`, `expired`(`EXPIRED_RETRY_MAX`를 통해 N회의 제한된 재시도 후에만 터미널 상태가 됨), `credits_exhausted`는 자격 증명/설정이 변경되거나 운영자가 재설정할 때까지 사용 불가 상태로 유지되도록 의도된 것입니다. 터미널 상태를 일시적인 쿨다운 상태로 덮어쓰지 마세요.

### 모델 락아웃

**범위**: 프로바이더 + 연결 + 모델.

**목적**: 하나의 모델만 사용 불가능하거나 해당 연결에 대해 할당량 제한이 있는 경우 전체 연결을 비활성화하는 것을 방지합니다.

예시:

- 모델별 할당량 프로바이더가 `429`를 반환하는 경우.
- 로컬 프로바이더가 누락된 모델 하나에 대해 `404`를 반환하는 경우.
- 선택된 Grok 모드와 같은 프로바이더별 모드/모델 권한 실패.

모델 락아웃은 `open-sse/services/accountFallback.ts`에 있으며, 동일한 연결이 다른 모델을 계속 제공할 수 있게 합니다.

### 디버깅 가이드

- 프로바이더의 모든 키가 건너뛰어지는 경우, 프로바이더 브레이커 상태와 각 연결의 `rateLimitedUntil`/`testStatus`를 모두 확인하세요.
- 리셋 윈도우 이후에도 프로바이더가 영구적으로 제외된 것처럼 보이면, 코드가 `getStatus()`/`canExecute()`를 사용하는 대신 원시 `state`를 읽고 있는지 확인하세요.
- 프로바이더 키 하나가 실패하지만 다른 키는 작동해야 하는 경우, 프로바이더 브레이커보다 연결 쿨다운을 우선하세요.
- 하나의 모델만 실패하는 경우, 연결 쿨다운보다 모델 락아웃을 우선하세요.
- 상태가 자체 복구되어야 한다면, 미래 타임스탬프/리셋 타임아웃과 만료된 상태를 갱신하는 읽기 경로가 있어야 합니다. 영구 상태는 수동으로 자격 증명 또는 설정을 변경해야 합니다.

---

## TLS 지문 및 스텔스

프로바이더별 스텔스(JA3/JA4, CCH, 난독화)는 별도 문서로 제공됩니다 — `docs/security/STEALTH_GUIDE.md` 참조 (git에만 존재; `/docs`에 컴파일되지 않음).

---

## 복원력 테스트 (Phase 8 · Block C)

복원력 로직에 대한 단위 테스트 외에도, 세 가지 테스트가 실제 스트레스/장애 조건에서 런타임을 검증합니다 (모두 통합/나이틀리 테스트이며 PR을 차단하지 않음):

| 테스트      | 내용                                                                                                                                                        | 실행                                      |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Chaos       | 가짜 업스트림 노드가 실제 지연/리셋/타임아웃/503을 주입; 서킷 브레이커가 열리고 복구되며 `checkFallbackError`가 503을 복구 가능한 폴백으로 분류하는지 검증. | `RUN_CHAOS_INT=1 npm run test:chaos`      |
| Heap-growth | `--expose-gc` 하에서 `createSSEStream`당 약 500개의 스트림; 힙이 상한을 초과해 증가하면 실패 (OOM 가드 #3069).                                              | `npm run test:heap`                       |
| k6 soak     | `/api/monitoring/health`에 대한 지속적 부하; p95/오류 임계값.                                                                                               | `k6 run tests/load/k6-soak.js` (나이틀리) |

`.github/workflows/nightly-resilience.yml`에서 오케스트레이션됨 (cron + dispatch). 기본 `test:integration`에서는 chaos와 heap 테스트가 (`RUN_CHAOS_INT`/`--expose-gc` 없이) 자동으로 스킵됩니다.

---

## 참고

- [아키텍처 가이드](./ARCHITECTURE.md) — 시스템 아키텍처 및 내부 구조
- [사용자 가이드](../guides/USER_GUIDE.md) — 프로바이더, 콤보, CLI 통합
- [Auto-Combo 엔진](../routing/AUTO-COMBO.md) — 16요소 스코어링, 모드 팩
