# REASONING_REPLAY (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **진실의 출처:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** 마지막 업데이트:** 2026-06-28 — v3.8.40

OmniRoute 사고 모드 모델에서 생성된 보조 `reasoning_content` 캡처하고 업스트림 공급자가 요구할 때 다중 턴 요청에서 이를 투명하게 재생합니다. 이는 클라이언트의 대화 기록에 이전 차례의 추론이 누락된 경우 엄격한 공급자가 발생시키는 HTTP 400 오류를 제거합니다.

## 이것이 존재하는 이유

몇몇 사고 모드 제공자는 다음과 같은 경우가 아니면 후속 조치를 거부합니다.** 이전 보조 메시지에는 원본 `reasoning_content` 포함되어 있습니다.** . 업스트림은 다음과 같은 메시지와 함께 400을 반환합니다.

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

그러나 일반적인 클라이언트(Cursor, Cline, Roo Code, OpenAI SDK)는 재생 기록에서 `reasoning_content` 제거합니다. OmniRoute 서버 측 캐시에서 이를 복원하므로 업스트림에서 보는 요청은 일관됩니다. 문제 #1628에서는 캐시가 프로세스를 다시 시작해도 유지되도록 하이브리드 memory/SQLite 지속성을 도입했습니다.

## 건축학

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), one entry per tool_call.id within the request scope
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(buildToolCallCacheKey(scope, toolCalls[0].id)) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

캡처는 `open-sse/handlers/chatCore.ts` (두 개의 사이트, 두 개의 `cacheReasoningFromAssistantMessage` 호출 사이트)에서 발생합니다. 재생은 스키마 강제 변환 후 디스패치 전에 `open-sse/translator/index.ts` 에서 발생합니다.

도구 호출 항목은 요청 범위의 다이제스트 및 도구 호출 ID인 `buildToolCallCacheKey()` 아래에 저장되므로 다른 API 키 또는 세션에서 사용하는 동일한 ID는 항목을 선택하지 않습니다. 범위는 `buildReasoningCacheScope()` 에서 나옵니다: API 키 ID와 요청에 세션 키가 있는 경우 세션 키입니다. 따라서 `tool_call_id` 열과 대시보드에는 해당 항목에 대한 이 다이제스트가 표시됩니다.

일반(툴 호출이 아닌) 어시스턴트 턴은 다르게 입력됩니다. `buildAssistantMessageCacheKey()` 세션 범위와 해당 턴까지 정규화된 OpenAI 형식 기록을 소화합니다. 왜냐하면 DeepSeek `tools` 존재하면 _모든_ 이전 턴의 추론을 요구하기 때문입니다. Responses-API 대상(예: `/responses` 로 라우팅된 `opencode-go/deepseek-v4-flash`)의 경우 업스트림 본문은 `messages` 아닌 `input` 전달하므로 `translateRequest()` (`open-sse/translator/index.ts`)는 콜백 옵션을 통해 소화한 피벗 기록을 보고하고 캡처 사이트는 동일한 기록을 소화합니다. 응답 재생 패스는 모든 소스 형식에 대해 OpenAI 피벗에서 실행되므로 Anthropic 메시지 클라이언트(Claude → OpenAI → 응답)도 재생됩니다.

## 스토리지 — 하이브리드 메모리 + SQLite

핫 경로는 충돌 복구 및 대시보드 가시성을 위해 SQLite 테이블이 지원하는 메모리 내 `Map` (LRU-by-creation)를 사용합니다.

| 층     | 구현                                           | 목적                                      |
| ------ | ---------------------------------------------- | ----------------------------------------- |
| 메모리 | `open-sse/services/reasoningCache.ts` 의 `Map` | 빠른 조회, 200세의 가장 오래된 항목 제거  |
| DB     | `reasoning_cache` 테이블(`src/lib/db/`)        | 다시 시작해도 지속되고 통계를 구동합니다. |

쓰기는 둘 다에 전달됩니다. 먼저 메모리를 참조한 다음 DB 로 폴백합니다(DB 적중은 다시 메모리로 승격됩니다). DB 실패는 치명적이지 않습니다. — 메모리 내 캐시는 계속해서 핫 경로를 제공합니다.

**기본값:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- 최대 메모리 항목: `200` (`MAX_MEMORY_ENTRIES`)
- 퇴거: 가장 오래된 `createdAt` 부터

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

인덱스: `expires_at`, `provider`, `model`, `created_at`. `expires_at` 는 Unix epoch 초로 저장됩니다. SELECT 레이어는 `EXPIRES_AT_EPOCH_SQL` 통해 레거시 텍스트 값을 정규화합니다.

## 제공자/모델 감지

`requiresReasoningReplay(provider, model)` `true` 반환하면 재생이 활성화됩니다. 이 함수는 `open-sse/services/reasoningCache.ts` 의 두 목록을 확인합니다.

**공급자 IDs (정확히 일치, 대소문자 구분 없음):**

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

**모델 정규식 패턴(대소문자 구분):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` 및 `/deepseek[-/]?v4[-.]pro/i` (V4 Flash/Pro, 선택적 `-free` 접미사)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

새로운 엄격한 provider/model 추가한다는 것은 이러한 목록 중 하나에 추가하고 재생 주입을 주장하는 단위 테스트를 작성하는 것을 의미합니다. PR 설명에는 변경 동기를 부여한 정확한 업스트림 400 문자열을 인용해야 합니다.

## REST API

캐시는 `src/app/api/cache/reasoning/route.ts` 아래에 두 개의 엔드포인트를 노출합니다. 둘 다 관리 인증( `@/shared/utils/apiAuth` 의 `isAuthenticated` )이 필요합니다.

| 방법   | 엔드포인트                                                | 설명                                                          |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | 통계 + 페이지가 매겨진 항목                                   |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | 필터링된 목록(`limit` 가 `[1, 200]` 로 고정됨)                |
| DELETE | `/api/cache/reasoning`                                    | 모든 것을 지우고(메모리 + DB) hit/miss 카운트를 재설정합니다. |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | 한 제공업체에 대한 항목만 지우기                              |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | 단일 항목 삭제                                                |

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

- **대청소:** `cleanupReasoningCache()` 만료된 메모리 항목을 제거하고 `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` 실행합니다. 상태 확인 담당자가 정기적으로 전화합니다.
- **충돌 복구:** 다시 시작한 후 메모리는 비어 있지만 DB 여전히 만료되지 않은 항목을 보유하고 있습니다. 특정 `tool_call_id` 에 대한 첫 번째 조회는 DB 히트입니다. 후속 조회는 메모리 적중입니다.
- **추론도 없고 캐시도 없습니다.** 보조 메시지에 `reasoning_content` / `reasoning` 필드가 없으면 `cacheReasoningFromAssistantMessage` `0` 반환하므로 생각하지 않는 응답에는 비용이 들지 않습니다.
- **쓰기도 제한됩니다.** `chatCore.ts` 의 두 호출 사이트(비스트리밍 및 스트리밍)는 `requiresReasoningReplay(provider, model)` 가 `true` — 인 경우에만 `cacheReasoningFromAssistantMessage()` 호출합니다. 이는 읽기 측 검사와 동일한 조건자입니다. 재생 공급자를 건드리지 않는 설치는 모든 추론 기반 응답에 대한 쓰기, 인덱스 업데이트 및 try/catch 비용 지불을 중단합니다.
- **엄격하지 않은 공급자:** `requiresReasoningReplay` 가 `false` 이고 대상 형식이 OpenAI 인 경우 변환기는** 스트립** 나가는 메시지 — OpenAI Chat Completions의 모든 `reasoning_content` 필드는 이를 허용하지 않습니다.

## Muse 불투명 추론 소유권

Muse(`muse-code`)는 호출자 경계 불투명 추론(`encrypted_content`)을 반환합니다. 다른 계정 또는 재민 자격 증명으로 재생하면 업스트림이 실패하므로 기본 OAuth 요청은 요청별 회전(`src/sse/services/museSessionOwnership.ts`, `src/sse/handlers/chat.ts` 에서 시행) 대신 세션 수준 소유권을 사용합니다. 명시적으로 선택된 API 키 연결 및 API 키 전용 구성은 이 소유권 모드 없이 기존 라우팅을 유지합니다.

- 매 턴마다 안정적인 세션 ID 제공: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` 또는 `x-codex-session-id`; 또는 본문에 `prompt_cache_key`, `session_id`, `conversation_id` 또는 `metadata.session_id` (우선순위로) 사용하세요. 두 개 이상의 기본 OAuth 계정이 활성화된 경우 누락되거나 비어 있는 IDs 400을 반환합니다. 단일 OAuth 계정에는 회전할 항목이 없으므로 이러한 요청은 고정되지 않은 라우팅을 유지합니다. 범위에는 호출자의 OmniRoute API 키 ID 포함됩니다.
- 연결 ID 에 따라 정렬된 API 키 연결 정책에 의해 허용되는 활성 기본 OAuth 계정 전체에서 새로운 독립 세션 라운드 로빈이 수행됩니다. 라운드 로빈은 요청된 모델에 대해 터미널 상태(`banned`, `expired`, `credits_exhausted`) 또는 모델 잠금 상태인 연결 휴지 상태에서 계정을 건너뜁니다. Muse 업스트림 오류는 다른 공급자와 마찬가지로 휴지 및 차단기 상태를 기록합니다. 명시적으로 강제 연결은 새 세션에 대한 라운드 로빈을 우회하지만 기존 소유자를 재정의할 수는 없습니다.
- 소유자가 성공적인 응답을 제공할 때까지 소유자를 사용할 수 없게 된 세션은 정상 계정에서 다시 요청됩니다. 첫 번째 성공적인 응답 후 세션은 30일(`MUSE_SESSION_IDLE_TTL_MS`) 동안 유휴 상태가 될 때까지 해당 소유자에게 고정된 상태로 유지됩니다.
- 모든 연속 및 도구 결과 회전은 세션 소유자에게 고정된 상태로 유지됩니다. 연결, 계정 ID 및 추론 자격 증명 생성은 자격 증명 새로 고침 재시도를 포함하여 업스트림 시도 전에 다시 확인됩니다. 응답 호출 IDs/item 참조 및 채팅 완료 도구 호출 IDs 해당 세션 및 생성에 대해 기록되어야 합니다.
- SQLite `muse_session_ownership` 네임스페이스(`src/lib/db/museSessionOwnership.ts`)의 `key_value` 레코드는 다시 시작해도 소유권과 회전 커서를 유지합니다. 각 클레임과 제공된 응답은 세션의 활동 스탬프를 새로 고칩니다. `MUSE_SESSION_IDLE_TTL_MS` 보다 오랫동안 유휴 상태인 세션은 최대 10분마다 한 번씩 제한된 배치로 정리되므로(소유자 핀, 제공된 플래그 및 기록된 opaque/reference 해시) 나중에 해당 기록 재생이 실패하고 알 수 없는 소유자로 닫힙니다. 기록에는 비밀이나 대화 기록이 아닌 연결 IDs 와 계정 ID의 해시, 자격 증명, 불투명 콘텐츠 및 연속 참조가 포함됩니다. 고객은 전체 기록과 불투명한 추론을 유지하고 보내야 합니다.
- 알 수 없거나 외부의 불투명한 추론, 누락된 소유자, 사용할 수 없는 소유자 계정 또는 기록된 기록이 있는 세대 변경은 명시적인 4xx/503 — 절대 자동 교차 계정 장애 조치 및 삭제되지 않는 추론으로 종료되지 않습니다.
- 리마인트된 동일 계정 키는 세션이 재생 가능한 기록을 기록하지 않은 경우에만 채택됩니다. 기록된 세션은 새로 시작될 때까지 계속 실패하여 닫힙니다.
- 빈 업스트림 응답(`upstream_empty_response` / `empty_response`, 호출자에게 아무 것도 내보내지 않음)은 동일한 소유자에 대해 최대 두 번(0.5초 후, 1.5초 후(`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`)) 재시도됩니다. 모든 시도가 비어 있으면 쿨다운이나 차단기 표시 없이 원래 502가 반환되므로 불안정한 응답으로 인해 소유자가 잠기지 않습니다.
- 모든 `muse-code` 요청은 스트리밍 쓰기를 포함하여 의미론적 캐시 읽기 및 쓰기를 우회하므로 캐시된 불투명 출력은 다른 세션 소유자를 얻을 수 없습니다.

회귀 가드: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` 및 `tests/unit/chatcore-semantic-cache.test.ts`.

## 참조

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — 회로 차단기, 쿨다운, 모델 잠금
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — 업스트림 400을 진단하는 중
- 소스: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- 마이그레이션: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API 경로: `src/app/api/cache/reasoning/route.ts`
- 원본: #1628
