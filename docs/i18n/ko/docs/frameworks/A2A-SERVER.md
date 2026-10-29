# OmniRoute A2A Server Documentation (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — 지능형 라우팅 에이전트로서의 OmniRoute

A2A 인터페이스는 두 가지 형태로 제공됩니다:

- `POST /a2a`의 **JSON-RPC 2.0**(표준 진입점, `src/app/a2a/route.ts`에 정의됨).
- 대시보드 및 도구를 위한 `/api/a2a/*` 하위의 **REST**(상태, 작업 목록, 취소).

작업은 `A2ATaskManager`(`src/lib/a2a/taskManager.ts`, 기본 TTL 5분)에서 추적합니다. 스킬은 `src/lib/a2a/taskExecution.ts`의 `A2A_SKILL_HANDLERS`를 통해 디스패치됩니다.

## 에이전트 검색

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute의 기능, 스킬 및 인증 요구 사항을 설명하는 에이전트 카드를 반환합니다.

에이전트 카드의 `version` 필드는 `process.env.npm_package_version`에서 가져오므로(`src/app/.well-known/agent.json/route.ts:13` 참조), 릴리스할 때마다 `package.json`과 자동으로 동기화됩니다.

---

## 인증

모든 `/a2a` 요청에는 `Authorization` 헤더를 통해 API 키를 제공해야 합니다:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

서버에 API 키가 구성되어 있지 않으면 인증을 건너뜁니다.

## 활성화

A2A는 **Endpoints → A2A** 토글로 제어되며 기본적으로 비활성화되어 있습니다. 비활성화된 경우,
`GET /api/a2a/status`는 `status: "disabled"` 및 `online: false`를 보고하며, `POST /a2a`에 대한
JSON-RPC 호출은 JSON-RPC 오류 코드 `-32000`과 함께 HTTP 503을 반환합니다.

---

## JSON-RPC 2.0 메서드

### `message/send` — 동기 실행

스킬에 메시지를 전송하고 전체 응답을 기다립니다.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

`smart-routing`에서 `metadata.combo`는 게이트웨이 요청의
`metadata.model`을 명시적으로 재정의하며, 무시되는 `x-combo` JSON 필드가 아니라 실제 `model`로 전송됩니다.
게이트웨이의 일반적인 API 키 및 대상별 인증은 계속 적용됩니다. 유효하지 않거나 비어 있는 콤보는 거부됩니다.

결과에는 `requested_combo`(호출자 의도), `dispatched_model`
(실제 게이트웨이 요청), `response_model`(게이트웨이 응답) 및
`confirmed_combo`가 표시됩니다. 마지막 필드는 게이트웨이가 콤보를 명시적으로 식별하지 않는 한 `null`입니다.
A2A 결정 로그는 확인된 콤보에만 실행을 귀속하며, 확인되지 않은 요청은 `requestedCombo`로 유지합니다.

**응답:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "requested_combo": "fast-coding",
      "confirmed_combo": null,
      "dispatched_model": "fast-coding",
      "response_model": "claude-sonnet",
      "cost_envelope": { "estimated": 0.005, "actual": 0.003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "within budget and quota limits" }
    }
  }
}
```

### `message/stream` — SSE 스트리밍

`message/send`와 동일하지만 실시간 스트리밍을 위해 Server-Sent Events를 반환합니다.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**SSE 이벤트:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — 작업 상태 조회

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — 작업 취소

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## 사용 가능한 기술

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` 에 연결된 6개의 A2A 기술을 노출합니다. 각 기술 모듈은 `src/lib/a2a/skills/` 에 있습니다.

| 기능          | ID                   | 설명                                                                                                                                             | 태그                 | 예                                               |
| :------------ | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- | :----------------------------------------------- |
| 스마트 라우팅 | `smart-routing`      | OmniRoute 의 콤보 엔진 + 점수를 사용하여 최적의 provider/combo 통해 프롬프트를 라우팅합니다.                                                     | 라우팅, 공급자       | "최고의 모델을 통해 이 프롬프트를 라우팅하세요." |
| 할당량 관리   | `quota-management`   | 공급자별 할당량 상태를 보고하여 호출자가 언제 throttle/switch 수행할지 결정하는 데 도움이 됩니다.                                                | 할당량, 공급자       | "인류 할당량을 확인하세요"                       |
| 공급자 검색   | `provider-discovery` | 기능, 무료 계층 플래그, OAuth 상태와 함께 설치된 공급자를 나열합니다.                                                                            | 공급자, 검색         | "어떤 제공업체를 이용할 수 있나요?"              |
| 비용 분석     | `cost-analysis`      | 카탈로그 + 최근 사용량을 고려하여 request/conversation 의 비용을 추정합니다.                                                                     | 비용, 사용량         | "이 대화에 대한 예상 비용"                       |
| 건강 보고서   | `health-report`      | 공급자별로 회로 차단기, 쿨다운, 잠금 상태를 집계합니다.                                                                                          | 건강, 회복력         | "모든 공급자의 상태 표시"                        |
| 목록 기능     | `list-capabilities`  | 전체 45개 항목 에이전트 기술 카탈로그(23 API + 21 CLI + 1 config)를 컨텍스트 삽입을 위한 원시 SKILL.md URLs 포함된 마크다운 테이블로 반환합니다. | 카탈로그, 발견, 기술 | "모든 OmniRoute 기능 나열"                       |

> 에이전트 카드는 실시간 377 제공업체 카탈로그와 일치하도록 유지되어야 합니다. 공급자 수와 free/no-auth 메타데이터는 런타임 레지스트리에서 제공됩니다.

### `list-capabilities` 스킬 상세

`list-capabilities` 기술은 API 호출을 보내기 전에 OmniRoute 노출하는 내용을 검색해야 하는 외부 에이전트에 특히 유용합니다. 구조화된 마크다운 테이블 아티팩트를 반환합니다.

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

각 행에는 `rawUrl` 열이 포함되어 있으므로 에이전트는 즉시 전체 SKILL.md 가져올 수 있습니다. `metadata.totalSkills` 필드는 카탈로그 크기(현재 45)를 반영합니다. 구현: `src/lib/a2a/skills/listCapabilities.ts`. [AGENT-SKILLS.md](./AGENT-SKILLS.md) 도 참조하세요.

---

## REST API(보조)

JSON-RPC 엔드포인트 `/a2a`는 표준 A2A 진입점입니다. 아래 REST 엔드포인트는 대시보드 및 외부 도구를 위한 보조 액세스를 제공합니다.

| 엔드포인트                   | 메서드 | 설명                                                      | 인증                                             |
| :--------------------------- | :----- | :-------------------------------------------------------- | :----------------------------------------------- |
| `/api/a2a/status`            | GET    | 서버 상태, 등록된 스킬                                    | (공개)                                           |
| `/api/a2a/tasks`             | GET    | 필터를 적용하여 작업 목록 조회                            | 관리                                             |
| `/api/a2a/tasks/[id]`        | GET    | ID로 작업 조회                                            | 관리                                             |
| `/api/a2a/tasks/[id]/cancel` | POST   | 실행 중인 작업 취소                                       | 관리                                             |
| `/.well-known/agent.json`    | GET    | 에이전트 카드(A2A 검색)                                   | (공개, 3600초 동안 캐시됨)                       |
| `/api/a2a/tasks`             | POST   | OmniConductor 플릿으로의 인바운드 위임(Conductor PRD RF5) | Bearer와 `OMNIROUTE_API_KEY` 비교 + `a2aEnabled` |

**인바운드 Conductor 위임(`POST /api/a2a/tasks`):** 외부 A2A 에이전트는 OmniRoute를 통해 코딩 작업을 OmniConductor 플릿에 위임합니다. 본문: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — Conductor 플릿 스킬(에이전트 카드에 명시된 스킬)만 위임할 수 있으며, 플릿이 git 저장소에서 작업하므로 `metadata.conductor.repo.url`은 필수입니다. 이 라우트는 서버 측 `CONDUCTOR_ORCHESTRATOR_TOKEN`(대체 값: `CONDUCTOR_HUB_TOKEN`)을 사용하여 허브의 `POST /v1/tasks`로 변환하고 `201 { conductor_task_id, state: "submitted" }`를 반환합니다. 작업 상태는 SSE→A2A 미러(RF1)를 통해 다시 전달되며 `GET /api/a2a/tasks?skill=conductor`를 통해 확인할 수 있습니다.

---

## 새 스킬 추가하기

1. **스킬 파일 생성:** `src/lib/a2a/skills/<your-skill>.ts`

   `(task: A2ATask) => Promise<{ artifacts, metadata }>` 형태의 비동기 함수를 내보냅니다. `smartRouting.ts`와 같은 기존 스킬의 구조를 따르세요.

2. **핸들러 등록:** `src/lib/a2a/taskExecution.ts`의 `A2A_SKILL_HANDLERS`에 항목을 추가합니다.

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...기존 스킬
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **에이전트 카드에 공개:** `src/app/.well-known/agent.json/route.ts`의 `skills` 배열에 다음을 추가합니다.

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **테스트 작성:** `tests/unit/a2a-<your-skill>.test.ts`. 정상 경로와 오류 경로를 모두 다루세요.

5. 이 파일의 `Available Skills` 표에 새 스킬을 **문서화**하세요.

---

## 작업 TTL

작업은 `ttlMinutes`(기본값 5분) 후 만료됩니다. 이 값은 `src/lib/a2a/taskManager.ts:82`의 `A2ATaskManager` 생성자에서 구성됩니다. 값을 사용자 지정하려면 `A2ATaskManager` 인스턴스 생성을 포크하고 다른 값을 전달하세요(예: TTL을 15분으로 설정하려면 `new A2ATaskManager(15)`). 백그라운드 인터벌은 60초마다 만료된 작업을 정리합니다.

---

## 작업 수명 주기

```
제출됨 → 작업 중 → 완료됨
                 → 실패함
                 → 취소됨
```

- 작업은 기본적으로 5분 후 만료됩니다([작업 TTL](#task-ttl) 참조).
- 종료 상태: `completed`, `failed`, `cancelled`
- 이벤트 로그는 모든 상태 전환을 추적합니다.

---

## 오류 코드

| 코드   | 의미                               |
| :----- | :--------------------------------- |
| -32700 | 구문 분석 오류(유효하지 않은 JSON) |
| -32600 | 유효하지 않은 요청 / 인증되지 않음 |
| -32601 | 메서드 또는 스킬을 찾을 수 없음    |
| -32602 | 유효하지 않은 매개변수             |
| -32603 | 내부 오류                          |
| -32000 | A2A 엔드포인트가 비활성화됨        |

---

## 통합 예

### Python(요청)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (가져오기)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
