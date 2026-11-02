# Reasoning Replay Cache (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **신뢰할 수 있는 원본:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **마지막 업데이트:** 2026-06-28 — v3.8.40

OmniRoute는 사고 모드 모델이 생성한 어시스턴트의 `reasoning_content`를 캡처하고, 업스트림 제공자가 이를 요구하는 경우 다중 턴 요청에서 투명하게 재생합니다. 이를 통해 클라이언트의 대화 기록에 이전 턴의 추론이 누락되었을 때 엄격한 제공자가 반환하는 HTTP 400 오류를 방지합니다.

## 이 기능이 필요한 이유

일부 사고 모드 제공자는 **이전 어시스턴트 메시지에 원래의 `reasoning_content`가 포함되어 있지 않으면** 후속 턴을 거부합니다. 업스트림은 다음과 같은 메시지와 함께 400을 반환합니다.

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

그러나 일반적인 클라이언트(Cursor, Cline, Roo Code, OpenAI SDK)는 다시 전송하는 기록에서 `reasoning_content`를 제거합니다. OmniRoute는 서버 측 캐시에서 이를 복원하여 업스트림이 받는 요청의 일관성을 유지합니다. 이슈 #1628에서 하이브리드 메모리/SQLite 영속성이 도입되어 프로세스가 다시 시작된 후에도 캐시가 유지됩니다.

## 아키텍처

```
턴 N(어시스턴트가 생성):
  → 응답에 reasoning_content + tool_calls가 포함됨
  → requiresReasoningReplay(provider, model)인 경우: cacheReasoningFromAssistantMessage()
      모든 tool_call.id를 키로 하여 (메모리 + DB)에 기록
  → 응답을 클라이언트로 전달(클라이언트가 reasoning을 유지할 수도 있고 유지하지 않을 수도 있음)

턴 N+1(클라이언트가 후속 요청 전송):
  → 트랜슬레이터가 다음을 감지: requiresReasoningReplay(provider, model) === true
  → tool_calls가 있고 reasoning_content가 없는 각 어시스턴트 메시지에 대해:
      lookupReasoning(toolCalls[0].id) → 메모리 → DB
      적중  → msg.reasoning_content = cached; recordReplay()
      실패 → msg.reasoning_content = "" (이전 DeepSeek 버전을 위한 레거시 폴백)
  → 업스트림이 일관된 기록을 확인 → 400 오류 없음
```

캡처는 `open-sse/handlers/chatCore.ts`에서 수행됩니다(`cacheReasoningFromAssistantMessage` 호출 지점 두 곳). 재생은 스키마 강제 변환 후 디스패치 전에 `open-sse/translator/index.ts`에서 수행됩니다.

일반적인(도구 호출이 없는) 어시스턴트 턴은 다른 방식으로 키가 지정됩니다. `tools`가 존재하면 DeepSeek는 _모든_ 이전 턴의 추론을 요구하므로, `buildAssistantMessageCacheKey()`는 세션 범위와 해당 턴까지 정규화된 OpenAI 형식의 트랜스크립트를 함께 다이제스트합니다. Responses API 대상(예: `/responses`로 라우팅되는 `opencode-go/deepseek-v4-flash`)의 경우 업스트림 본문에는 `messages`가 아니라 `input`이 포함되므로, `translateRequest()`(`open-sse/translator/index.ts`)는 콜백 옵션을 통해 자신이 다이제스트한 피벗 트랜스크립트를 보고하고, 캡처 지점에서도 동일한 트랜스크립트를 다이제스트합니다. Responses 재생 단계는 모든 소스 형식에 대해 OpenAI 피벗에서 실행되므로 Anthropic Messages 클라이언트(Claude → OpenAI → Responses)도 재생됩니다.

## 스토리지 — 하이브리드 메모리 + SQLite

핫 패스는 충돌 복구 및 대시보드 표시를 위해 SQLite 테이블이 뒷받침하는 인메모리 `Map`(생성 순서 기반 LRU)을 사용합니다.

| 계층   | 구현                                          | 목적                                           |
| ------ | --------------------------------------------- | ---------------------------------------------- |
| 메모리 | `open-sse/services/reasoningCache.ts`의 `Map` | 빠른 조회, 200개 초과 시 가장 오래된 항목 제거 |
| DB     | `reasoning_cache` 테이블(`src/lib/db/`)       | 재시작 후에도 유지되며 통계의 기반으로 사용    |

쓰기는 양쪽 모두에 수행됩니다. 읽기는 먼저 메모리를 조회한 후 DB로 폴백합니다(DB에서 적중한 항목은 다시 메모리로 승격됨). DB 오류는 치명적이지 않으며, 인메모리 캐시는 계속해서 핫 패스를 처리합니다.

**기본값:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- 최대 메모리 항목 수: `200` (`MAX_MEMORY_ENTRIES`)
- 제거 방식: 가장 오래된 `createdAt`부터 제거

## 데이터베이스 스키마

마이그레이션: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

인덱스: `expires_at`, `provider`, `model`, `created_at`. `expires_at`은 Unix epoch 초 단위로 저장되며, SELECT 계층은 `EXPIRES_AT_EPOCH_SQL`을 통해 레거시 텍스트 값을 정규화합니다.

## 제공자 / 모델 감지

`requiresReasoningReplay(provider, model)`이 `true`를 반환하면 재생이 활성화됩니다. 이 함수는 `open-sse/services/reasoningCache.ts`에 있는 두 목록을 확인합니다.

**제공자 ID(대소문자를 구분하지 않는 정확한 일치):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**모델 정규식 패턴(대소문자 구분 없음):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` 및 `/deepseek[-/]?v4[-.]pro/i`(V4 Flash / Pro, 선택적 `-free` 접미사)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

새로운 엄격한 제공자/모델을 추가하려면 이 목록 중 하나에 항목을 추가하고 재생 주입을 검증하는 단위 테스트를 작성해야 합니다. PR 설명에는 변경의 계기가 된 정확한 업스트림 400 문자열을 명시해야 합니다.

## REST API

캐시는 `src/app/api/cache/reasoning/route.ts` 아래에 두 개의 엔드포인트를 제공합니다. 둘 다 관리 인증(`@/shared/utils/apiAuth`의 `isAuthenticated`)이 필요합니다.

| 메서드 | 엔드포인트                                                | 설명                                              |
| ------ | --------------------------------------------------------- | ------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | 통계 + 페이지가 매겨진 항목                       |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | 필터링된 목록(`limit`는 `[1, 200]` 범위로 제한됨) |
| DELETE | `/api/cache/reasoning`                                    | 모두 지우고(메모리 + DB) 적중/미스 횟수 재설정    |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | 한 제공자의 항목만 지우기                         |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | 단일 항목 삭제                                    |

**GET 응답 형태:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## 운영 참고 사항

- **정리:** `cleanupReasoningCache()`는 만료된 메모리 항목을 제거하고 `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`를 실행합니다. 상태 확인 워커가 이를 주기적으로 호출합니다.
- **충돌 복구:** 재시작 후 메모리는 비어 있지만 DB에는 만료되지 않은 항목이 계속 남아 있습니다. 특정 `tool_call_id`에 대한 첫 번째 조회는 DB 적중이며, 이후 조회는 메모리 적중입니다.
- **추론이 없으면 캐시도 없음:** 어시스턴트 메시지에 `reasoning_content` / `reasoning` 필드가 없으면 `cacheReasoningFromAssistantMessage`는 `0`을 반환하므로, 비사고 응답에는 비용이 발생하지 않습니다.
- **쓰기에도 게이트 적용:** `chatCore.ts`의 두 호출 지점(비스트리밍 및 스트리밍)은 `requiresReasoningReplay(provider, model)`이 `true`일 때만 `cacheReasoningFromAssistantMessage()`를 호출합니다. 이는 읽기 측에서 확인하는 것과 동일한 조건자입니다. 재생 제공자를 전혀 사용하지 않는 설치 환경에서는 추론이 포함된 모든 응답에 대한 쓰기, 인덱스 업데이트 및 try/catch 비용이 더 이상 발생하지 않습니다.
- **비엄격 제공자:** `requiresReasoningReplay`가 `false`이고 대상 형식이 OpenAI인 경우, 변환기는 발신 메시지에서 모든 `reasoning_content` 필드를 **제거합니다**. OpenAI Chat Completions는 이 필드를 허용하지 않습니다.

## Muse 불투명 추론의 소유권

Muse(`muse-code`)는 호출자에 연결된 불투명 추론(`encrypted_content`)을 반환합니다. 이를 다른 계정이나 재발급한 자격 증명으로 재전송하면 업스트림에서 실패하므로, 네이티브 OAuth 요청은 요청별 로테이션 대신 세션 단위 소유권을 사용합니다(`src/sse/services/museSessionOwnership.ts`, 적용 위치 `src/sse/handlers/chat.ts`). 명시적으로 선택한 API 키 연결과 API 키 전용 구성은 이 소유권 모드 없이 기존 라우팅을 유지합니다.

- 매 턴에 안정적인 세션 ID를 제공하세요. `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id`, `x-codex-session-id`를 쓰거나 본문에서 `prompt_cache_key`, `session_id`, `conversation_id`, `metadata.session_id`를 사용하세요(우선순위는 이 순서). 네이티브 OAuth 계정이 둘 이상 활성화되어 있을 때 ID가 없거나 공백이면 400을 반환합니다. OAuth 계정이 하나뿐이면 로테이션할 대상이 없으므로 해당 요청은 고정되지 않은 라우팅을 유지합니다. 범위에는 호출자의 OmniRoute API 키 ID가 포함됩니다.
- 새 독립 세션은 API 키 연결 정책이 허용하는 활성 네이티브 OAuth 계정 사이에서 연결 ID 순서로 라운드로빈 배정됩니다. 라운드로빈은 연결 쿨다운 중이거나 최종 상태(`banned`, `expired`, `credits_exhausted`)이거나 요청한 모델에 대해 잠긴 계정을 건너뜁니다. Muse 업스트림 실패도 다른 제공자처럼 쿨다운과 브레이커 상태를 기록합니다. 명시적으로 강제한 연결은 새 세션에서 라운드로빈을 우회하지만, 소유자가 성공 응답을 제공한 후에는 그 소유자를 덮어쓸 수 없습니다.
- 소유자가 성공 응답을 제공하기 전까지, 소유자를 사용할 수 없게 된 세션은 정상 계정에 다시 확보됩니다. 첫 성공 응답 이후에는 세션이 30일 동안 유휴 상태가 될 때까지 해당 소유자에 고정됩니다(`MUSE_SESSION_IDLE_TTL_MS`).
- 모든 이어지는 요청과 도구 결과 턴은 세션 소유자에 고정됩니다. 연결, 계정 식별 정보, 추론 자격 증명의 세대를 자격 증명 갱신 후 재시도를 포함한 업스트림 시도 전에 다시 확인합니다. Responses 호출 ID/항목 참조와 Chat Completions 도구 호출 ID는 해당 세션과 세대에 대해 기록되어 있어야 합니다.
- `muse_session_ownership` 네임스페이스의 SQLite `key_value` 레코드(`src/lib/db/museSessionOwnership.ts`)는 재시작 후에도 소유권과 로테이션 커서를 유지합니다. 매 확보 및 응답 제공 시 세션의 활동 시각을 갱신합니다. `MUSE_SESSION_IDLE_TTL_MS`보다 오래 유휴 상태인 세션은 최대 10분에 한 번, 크기가 제한된 배치로 정리됩니다(소유자 고정, 응답 제공 플래그, 기록된 불투명 내용/참조 해시). 따라서 이후 그 이력을 재전송하면 알 수 없는 소유자로 판단하여 안전하게 거부합니다. 레코드에는 연결 ID와 계정 식별 정보, 자격 증명, 불투명 내용, 연속 요청 참조의 해시가 들어가며, 비밀 정보나 대화 이력은 들어가지 않습니다. 클라이언트는 전체 이력과 불투명 추론을 보관하고 전송해야 합니다.
- 알 수 없거나 다른 소유자의 불투명 추론, 누락된 소유자, 사용할 수 없는 소유자 계정, 또는 기록된 이력이 있는 상태에서의 세대 변경은 명시적 4xx/503으로 안전하게 거부됩니다. 다른 계정으로 조용히 장애 조치하거나 추론을 버리지 않습니다.
- 동일한 계정에서 재발급한 키는 세션에 재전송 가능한 이력이 기록되지 않은 경우에만 채택됩니다. 기록된 세션은 새로 시작할 때까지 계속 안전하게 거부됩니다.
- 빈 업스트림 응답(`upstream_empty_response` / `empty_response`, 호출자에게 아무것도 출력되지 않음)은 동일한 소유자에서 최대 두 번 재시도하며, 각각 0.5초와 1.5초 후에 수행합니다(`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). 모든 시도가 비어 있으면 쿨다운이나 브레이커 표시 없이 원래 502를 반환하므로, 일시적으로 불안정한 응답이 소유자를 잠그지 않습니다.
- 모든 `muse-code` 요청은 스트리밍 쓰기를 포함하여 의미 기반 캐시의 읽기와 쓰기를 우회하므로, 캐시된 불투명 출력에 다른 세션 소유자가 지정될 수 없습니다.

회귀 방지 테스트: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` 및 `tests/unit/chatcore-semantic-cache.test.ts`.

## 참고 자료

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — 회로 차단기, 쿨다운, 모델 잠금
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — 업스트림 400 오류 진단
- 소스: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- 마이그레이션: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API 경로: `src/app/api/cache/reasoning/route.ts`
- 원본 이슈: #1628
