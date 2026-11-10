# OmniRoute A2A Server Documentation (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — ਇੱਕ ਬੁੱਧੀਮਾਨ ਰੂਟਿੰਗ ਏਜੰਟ ਵਜੋਂ OmniRoute

A2A ਇੰਟਰਫੇਸ ਦੇ ਦੋ ਰੂਪ ਹਨ:

- **JSON-RPC 2.0** `POST /a2a` ਉੱਤੇ (ਮਿਆਰੀ ਪ੍ਰਵੇਸ਼ ਬਿੰਦੂ, ਜੋ `src/app/a2a/route.ts` ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ ਹੈ)।
- **REST** ਡੈਸ਼ਬੋਰਡਾਂ ਅਤੇ ਟੂਲਿੰਗ ਲਈ `/api/a2a/*` ਦੇ ਅਧੀਨ (ਸਥਿਤੀ, ਕਾਰਜ ਸੂਚੀ, ਰੱਦ ਕਰਨਾ)।

ਕਾਰਜਾਂ ਨੂੰ `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, ਮੂਲ 5-ਮਿੰਟ TTL) ਦੁਆਰਾ ਟਰੈਕ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਹੁਨਰਾਂ ਨੂੰ `src/lib/a2a/taskExecution.ts` ਵਿੱਚ ਮੌਜੂਦ `A2A_SKILL_HANDLERS` ਰਾਹੀਂ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ।

## ਏਜੰਟ ਖੋਜ

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute ਦੀਆਂ ਸਮਰੱਥਾਵਾਂ, ਸਕਿੱਲਾਂ ਅਤੇ ਪ੍ਰਮਾਣੀਕਰਨ ਲੋੜਾਂ ਦਾ ਵੇਰਵਾ ਦੇਣ ਵਾਲਾ Agent Card ਵਾਪਸ ਕਰਦਾ ਹੈ।

Agent Card ਦਾ `version` ਫੀਲਡ `process.env.npm_package_version` ਤੋਂ ਲਿਆ ਜਾਂਦਾ ਹੈ (`src/app/.well-known/agent.json/route.ts:13` ਵੇਖੋ), ਇਸ ਲਈ ਇਹ ਹਰ ਰਿਲੀਜ਼ ਉੱਤੇ `package.json` ਨਾਲ ਆਪਣੇ-ਆਪ ਸਮਕਾਲੀ ਰਹਿੰਦਾ ਹੈ।

---

## ਪ੍ਰਮਾਣੀਕਰਨ

ਸਾਰੀਆਂ `/a2a` ਬੇਨਤੀਆਂ ਲਈ `Authorization` ਹੈਡਰ ਰਾਹੀਂ ਇੱਕ API ਕੁੰਜੀ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

ਜੇ ਸਰਵਰ ਉੱਤੇ ਕੋਈ API ਕੁੰਜੀ ਸੰਰਚਿਤ ਨਹੀਂ ਹੈ, ਤਾਂ ਪ੍ਰਮਾਣੀਕਰਨ ਨੂੰ ਬਾਈਪਾਸ ਕਰ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ।

## ਸਮਰੱਥਕਰਨ

A2A ਨੂੰ **Endpoints → A2A** ਟੌਗਲ ਦੁਆਰਾ ਨਿਯੰਤਰਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਇਹ ਡਿਫੌਲਟ ਤੌਰ ਉੱਤੇ ਅਸਮਰੱਥ ਹੁੰਦਾ ਹੈ। ਅਸਮਰੱਥ ਹੋਣ ਉੱਤੇ,
`GET /api/a2a/status` `status: "disabled"` ਅਤੇ `online: false` ਰਿਪੋਰਟ ਕਰਦਾ ਹੈ; `POST /a2a` ਲਈ JSON-RPC ਕਾਲਾਂ
JSON-RPC ਗਲਤੀ ਕੋਡ `-32000` ਨਾਲ HTTP 503 ਵਾਪਸ ਕਰਦੀਆਂ ਹਨ।

---

## JSON-RPC 2.0 ਵਿਧੀਆਂ

### `message/send` — ਸਮਕਾਲੀ ਐਗਜ਼ੀਕਿਊਸ਼ਨ

ਕਿਸੇ ਸਕਿੱਲ ਨੂੰ ਸੁਨੇਹਾ ਭੇਜਦਾ ਹੈ ਅਤੇ ਪੂਰੇ ਜਵਾਬ ਦੀ ਉਡੀਕ ਕਰਦਾ ਹੈ।

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

`smart-routing` ਲਈ, ਗੇਟਵੇ ਬੇਨਤੀ ਵਾਸਤੇ `metadata.combo`, `metadata.model` ਨੂੰ ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ ਓਵਰਰਾਈਡ ਕਰਦਾ ਹੈ; ਇਸਨੂੰ ਅਣਡਿੱਠੇ ਕੀਤੇ `x-combo` JSON ਫੀਲਡ ਵਜੋਂ ਨਹੀਂ, ਸਗੋਂ ਅਸਲ `model` ਵਜੋਂ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ। ਗੇਟਵੇ ਦੀ ਆਮ API-ਕੁੰਜੀ ਅਤੇ ਪ੍ਰਤੀ-ਟਾਰਗੇਟ ਪ੍ਰਮਾਣੀਕਰਨ ਨੀਤੀ ਫਿਰ ਵੀ ਲਾਗੂ ਹੁੰਦੀ ਹੈ। ਅਵੈਧ ਜਾਂ ਖਾਲੀ ਕੌਂਬੋ ਰੱਦ ਕਰ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ।

ਨਤੀਜਾ `requested_combo` (ਕਾਲਰ ਦਾ ਇਰਾਦਾ), `dispatched_model`
(ਅਸਲ ਗੇਟਵੇ ਬੇਨਤੀ), `response_model` (ਗੇਟਵੇ ਜਵਾਬ) ਅਤੇ
`confirmed_combo` ਪ੍ਰਦਰਸ਼ਿਤ ਕਰਦਾ ਹੈ। ਆਖਰੀ ਫੀਲਡ `null` ਰਹਿੰਦੀ ਹੈ, ਜਦੋਂ ਤੱਕ ਗੇਟਵੇ ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ ਕਿਸੇ ਕੌਂਬੋ ਦੀ ਪਛਾਣ ਨਹੀਂ ਕਰਦਾ। A2A ਫ਼ੈਸਲਾ ਲੌਗ ਐਗਜ਼ੀਕਿਊਸ਼ਨ ਨੂੰ ਸਿਰਫ਼ ਪੁਸ਼ਟੀ ਕੀਤੇ ਕੌਂਬੋ ਨਾਲ ਜੋੜਦੇ ਹਨ, ਜਦਕਿ ਅਪੁਸ਼ਟ ਬੇਨਤੀ ਨੂੰ `requestedCombo` ਵਜੋਂ ਬਰਕਰਾਰ ਰੱਖਦੇ ਹਨ।

**ਜਵਾਬ:**

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

### `message/stream` — SSE ਸਟ੍ਰੀਮਿੰਗ

ਇਹ `message/send` ਵਾਂਗ ਹੀ ਹੈ, ਪਰ ਰੀਅਲ-ਟਾਈਮ ਸਟ੍ਰੀਮਿੰਗ ਲਈ Server-Sent Events ਵਾਪਸ ਕਰਦਾ ਹੈ।

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

**SSE ਇਵੈਂਟ:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — ਟਾਸਕ ਦੀ ਸਥਿਤੀ ਪੁੱਛੋ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ਟਾਸਕ ਰੱਦ ਕਰੋ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ਉਪਲਬਧ ਹੁਨਰ

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` ਵਿੱਚ ਵਾਇਰਡ 6 A2A ਹੁਨਰਾਂ ਦਾ ਪਰਦਾਫਾਸ਼ ਕਰਦਾ ਹੈ। ਹਰੇਕ ਹੁਨਰ ਮੋਡੀਊਲ `src/lib/a2a/skills/` ਵਿੱਚ ਰਹਿੰਦਾ ਹੈ।

| ਹੁਨਰ           | ID                   | ਵਰਣਨ                                                                                                                                             | ਟੈਗਸ               | ਉਦਾਹਰਨਾਂ                                  |
| :------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :----------------- | :---------------------------------------- |
| ਸਮਾਰਟ ਰੂਟਿੰਗ   | `smart-routing`      | OmniRoute ਦੇ ਕੰਬੋ ਇੰਜਣ + ਸਕੋਰਿੰਗ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹੋਏ ਅਨੁਕੂਲ provider/combo ਦੁਆਰਾ ਇੱਕ ਪ੍ਰੋਂਪਟ ਨੂੰ ਰੂਟ ਕਰਦਾ ਹੈ                                       | ਰੂਟਿੰਗ, ਪ੍ਰਦਾਤਾ    | "ਇਸ ਪ੍ਰੋਂਪਟ ਨੂੰ ਵਧੀਆ ਮਾਡਲ ਰਾਹੀਂ ਰੂਟ ਕਰੋ"  |
| ਕੋਟਾ ਪ੍ਰਬੰਧਨ   | `quota-management`   | ਪ੍ਰਤੀ-ਪ੍ਰਦਾਤਾ ਕੋਟਾ ਸਥਿਤੀ ਦੀ ਰਿਪੋਰਟ ਕਰਦਾ ਹੈ, ਕਾਲਰਾਂ ਨੂੰ ਇਹ ਫੈਸਲਾ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ ਕਿ throttle/switch ਕਦੋਂ ਕਰਨਾ ਹੈ                             | ਕੋਟਾ, ਪ੍ਰਦਾਤਾ      | "ਐਨਥ੍ਰੋਪਿਕ ਲਈ ਕੋਟੇ ਦੀ ਜਾਂਚ ਕਰੋ"           |
| ਪ੍ਰਦਾਤਾ ਖੋਜ    | `provider-discovery` | ਸਮਰੱਥਾਵਾਂ, ਫ੍ਰੀ-ਟੀਅਰ ਫਲੈਗ, OAuth ਸਥਿਤੀ ਵਾਲੇ ਸਥਾਪਤ ਪ੍ਰਦਾਤਾਵਾਂ ਦੀ ਸੂਚੀ ਬਣਾਓ                                                                        | ਪ੍ਰਦਾਤਾ, ਖੋਜ       | "ਕਿਹੜੇ ਪ੍ਰਦਾਤਾ ਉਪਲਬਧ ਹਨ?"                 |
| ਲਾਗਤ ਵਿਸ਼ਲੇਸ਼ਣ | `cost-analysis`      | ਕੈਟਾਲਾਗ + ਹਾਲੀਆ ਵਰਤੋਂ ਦੇ ਆਧਾਰ 'ਤੇ request/conversation ਦੀ ਲਾਗਤ ਦਾ ਅੰਦਾਜ਼ਾ ਲਗਾਉਂਦਾ ਹੈ                                                             | ਲਾਗਤ, ਵਰਤੋਂ        | "ਇਸ ਗੱਲਬਾਤ ਲਈ ਅਨੁਮਾਨਿਤ ਲਾਗਤ"              |
| ਸਿਹਤ ਰਿਪੋਰਟ    | `health-report`      | ਪ੍ਰਤੀ ਪ੍ਰਦਾਤਾ ਸਰਕਟ ਬ੍ਰੇਕਰ, ਕੂਲਡਾਉਨ, ਤਾਲਾਬੰਦੀ ਸਥਿਤੀ ਨੂੰ ਇਕੱਠਾ ਕਰਦਾ ਹੈ                                                                             | ਸਿਹਤ, ਲਚਕਤਾ        | "ਸਾਰੇ ਪ੍ਰਦਾਤਾਵਾਂ ਦੀ ਸਿਹਤ ਸਥਿਤੀ ਦਿਖਾਓ"     |
| ਸੂਚੀ ਸਮਰੱਥਾਵਾਂ | `list-capabilities`  | ਸੰਦਰਭ ਟੀਕੇ ਲਈ ਕੱਚੇ SKILL.md URLs ਦੇ ਨਾਲ ਇੱਕ ਮਾਰਕਡਾਊਨ ਸਾਰਣੀ ਦੇ ਤੌਰ 'ਤੇ ਪੂਰਾ 45-ਐਂਟਰੀ ਏਜੰਟ ਹੁਨਰ ਕੈਟਾਲਾਗ (23 API + 21 CLI + 1 ਸੰਰਚਨਾ) ਵਾਪਸ ਕਰਦਾ ਹੈ। | ਕੈਟਾਲਾਗ, ਖੋਜ, ਹੁਨਰ | "ਸਾਰੀਆਂ OmniRoute ਸਮਰੱਥਾਵਾਂ ਦੀ ਸੂਚੀ ਬਣਾਓ" |

> ਏਜੰਟ ਕਾਰਡ ਨੂੰ ਲਾਈਵ 386-ਪ੍ਰਦਾਤਾ ਕੈਟਾਲਾਗ ਨਾਲ ਇਕਸਾਰ ਰੱਖਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ; ਪ੍ਰਦਾਤਾ ਗਿਣਤੀ ਅਤੇ free/no-auth ਮੈਟਾਡੇਟਾ ਰਨਟਾਈਮ ਰਜਿਸਟਰੀ ਤੋਂ ਪ੍ਰਾਪਤ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।

### `list-capabilities` ਹੁਨਰ ਵੇਰਵੇ

`list-capabilities` ਹੁਨਰ ਖਾਸ ਤੌਰ 'ਤੇ ਬਾਹਰੀ ਏਜੰਟਾਂ ਲਈ ਲਾਭਦਾਇਕ ਹੈ ਜਿਨ੍ਹਾਂ ਨੂੰ ਇਹ ਖੋਜਣ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ ਕਿ API ਕਾਲਾਂ ਭੇਜਣ ਤੋਂ ਪਹਿਲਾਂ OmniRoute ਕੀ ਪ੍ਰਗਟ ਕਰਦਾ ਹੈ। ਇਹ ਇੱਕ ਸਟ੍ਰਕਚਰਡ ਮਾਰਕਡਾਊਨ ਟੇਬਲ ਆਰਟੀਫੈਕਟ ਵਾਪਸ ਕਰਦਾ ਹੈ:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

ਹਰੇਕ ਕਤਾਰ ਵਿੱਚ `rawUrl` ਕਾਲਮ ਸ਼ਾਮਲ ਹੁੰਦਾ ਹੈ ਤਾਂ ਜੋ ਏਜੰਟ ਤੁਰੰਤ ਪੂਰਾ SKILL.md ਪ੍ਰਾਪਤ ਕਰ ਸਕਣ। `metadata.totalSkills` ਫੀਲਡ ਕੈਟਾਲਾਗ ਆਕਾਰ (45 ਅੱਜ) ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ। ਲਾਗੂ ਕਰਨਾ: `src/lib/a2a/skills/listCapabilities.ts`. [AGENT-SKILLS.md](./AGENT-SKILLS.md) ਵੀ ਦੇਖੋ।

---

## REST API (ਸਹਾਇਕ)

JSON-RPC ਐਂਡਪੁਆਇੰਟ `/a2a` ਕੈਨੋਨੀਕਲ A2A ਐਂਟਰੀ ਪੁਆਇੰਟ ਹੈ। ਹੇਠਾਂ ਦਿੱਤੇ REST ਅੰਤਮ ਬਿੰਦੂ ਡੈਸ਼ਬੋਰਡਾਂ ਅਤੇ ਬਾਹਰੀ ਟੂਲਿੰਗ ਲਈ ਸਹਾਇਕ ਪਹੁੰਚ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਨ:

| ਅੰਤ ਬਿੰਦੂ                    | ਵਿਧੀ | ਵਰਣਨ                                                       | ਪ੍ਰਮਾਣ                                                                                                      |
| :--------------------------- | :--- | :--------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET  | ਸਰਵਰ ਸਥਿਤੀ, ਰਜਿਸਟਰਡ ਹੁਨਰ                                   | (ਜਨਤਕ)                                                                                                      |
| `/api/a2a/tasks`             | GET  | ਫਿਲਟਰਾਂ ਨਾਲ ਕਾਰਜਾਂ ਦੀ ਸੂਚੀ ਬਣਾਓ                            | ਪ੍ਰਬੰਧਨ ਜਾਂ API ਕੁੰਜੀ (ਹੇਠਾਂ ਦੇਖੋ)                                                                          |
| `/api/a2a/tasks/[id]`        | GET  | ID ਦੁਆਰਾ ਕੰਮ ਪ੍ਰਾਪਤ ਕਰੋ                                    | ਪ੍ਰਬੰਧਨ ਜਾਂ API ਕੁੰਜੀ (ਹੇਠਾਂ ਦੇਖੋ)                                                                          |
| `/api/a2a/tasks/[id]/cancel` | POST | ਚੱਲ ਰਹੇ ਕੰਮ ਨੂੰ ਰੱਦ ਕਰੋ                                    | ਪ੍ਰਬੰਧਨ ਜਾਂ API ਕੁੰਜੀ (ਹੇਠਾਂ ਦੇਖੋ)                                                                          |
| `/.well-known/agent.json`    | GET  | ਏਜੰਟ ਕਾਰਡ (A2A ਖੋਜ)                                        | (ਜਨਤਕ, ਕੈਸ਼ੇਡ 3600)                                                                                         |
| `/api/a2a/tasks`             | POST | OmniConductor ਫਲੀਟ ਨੂੰ ਆਉਣ ਵਾਲਾ ਡੈਲੀਗੇਸ਼ਨ (ਕੰਡਕਟਰ PRD RF5) | `GET` ਵਾਂਗ ਹੀ, ਪਲੱਸ `OMNIROUTE_API_KEY` ਜੇਕਰ `REQUIRE_API_KEY` ਬੰਦ ਹੋਣ 'ਤੇ ਸੈੱਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ; `a2aEnabled` |

`/api/a2a/tasks*` ਰੂਟਾਂ ਤੱਕ ਕੌਣ ਪਹੁੰਚਦਾ ਹੈ ਇਹ ਲੌਗਇਨ ਅਤੇ API-ਕੁੰਜੀ ਸੈਟਿੰਗਾਂ 'ਤੇ ਨਿਰਭਰ ਕਰਦਾ ਹੈ:

- `requireLogin=true` (ਡਿਫੌਲਟ): ਮਿਡਲਵੇਅਰ ਸਿਰਫ ਪ੍ਰਬੰਧਨ ਪ੍ਰਮਾਣ ਪੱਤਰਾਂ (ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ, `manage` -scope API ਕੁੰਜੀ, `oma_` ਐਕਸੈਸ ਟੋਕਨ) ਅਤੇ `OMNIROUTE_API_KEY` ਨੂੰ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ। ਇੱਕ ਸਧਾਰਨ ਅਨੁਮਾਨ ਕੁੰਜੀ `403` ਪ੍ਰਾਪਤ ਕਰਦੀ ਹੈ। `Authorization` ਸਿਰਲੇਖ ਵਿੱਚ ਮਿਡਲਵੇਅਰ ਸਿਰਫ਼ `OMNIROUTE_API_KEY` `Bearer <key>` ਵਜੋਂ ਲੈਂਦਾ ਹੈ; `Bearer` `401` ਮਿਲਣ ਤੋਂ ਬਾਅਦ ਇੱਕ ਨੰਗੀ ਕੁੰਜੀ ਜਾਂ ਇੱਕ ਟੈਬ।
- `requireLogin=false`, ਜਾਂ ਆਨਬੋਰਡਿੰਗ ਤੋਂ ਪਹਿਲਾਂ ਲੂਪਬੈਕ ਵਿੰਡੋ: `REQUIRE_API_KEY=true` ਨਾਲ ਕੋਈ ਵੀ ਵੈਧ OmniRoute API ਕੁੰਜੀ ਜਾਂ ਪ੍ਰਬੰਧਨ ਪ੍ਰਮਾਣ ਪੱਤਰ ਸਵੀਕਾਰ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਅਗਿਆਤ ਕਾਲ ਕਰਨ ਵਾਲਿਆਂ ਨੂੰ `401` ਪ੍ਰਾਪਤ ਹੁੰਦਾ ਹੈ; `REQUIRE_API_KEY` ਬੰਦ ਦੇ ਨਾਲ ਰਸਤੇ ਖੁੱਲ੍ਹੇ ਹਨ।
- `POST /api/a2a/tasks` `Authorization` ਸਿਰਲੇਖ ਵਿੱਚ `OMNIROUTE_API_KEY` ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ ਜਦੋਂ ਉਹ ਵੇਰੀਏਬਲ ਸੈੱਟ ਹੁੰਦਾ ਹੈ ਅਤੇ `REQUIRE_API_KEY` ਬੰਦ ਹੁੰਦਾ ਹੈ। ਹੋਰ ਸਿਰਲੇਖ, ਜਿਵੇਂ ਕਿ `x-api-key`, ਉੱਥੇ ਨਹੀਂ ਗਿਣਦੇ ਹਨ। ਲੌਗਇਨ ਬੰਦ ਹੋਣ ਜਾਂ ਆਨਬੋਰਡਿੰਗ ਤੋਂ ਪਹਿਲਾਂ ਕੁੰਜੀ `Bearer` ਅਗੇਤਰ ਦੇ ਨਾਲ ਜਾਂ ਬਿਨਾਂ ਪਾਸ ਹੁੰਦੀ ਹੈ; ਲੌਗਇਨ ਆਨ ਨਾਲ, ਸਿਰਫ `Bearer <key>` ਮਿਡਲਵੇਅਰ ਤੋਂ ਪਾਰ ਹੋ ਜਾਂਦਾ ਹੈ।

ਜਿੱਥੇ ਇੱਕ ਪ੍ਰਮਾਣ ਪੱਤਰ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ, ਇੱਕ `read` -scope `oma_` ਟੋਕਨ ਸਿਰਫ਼ `GET` ਲਈ ਕੰਮ ਕਰਦਾ ਹੈ।

**ਇਨਬਾਉਂਡ ਕੰਡਕਟਰ ਡੈਲੀਗੇਸ਼ਨ (`POST /api/a2a/tasks`):** ਬਾਹਰੀ A2A ਏਜੰਟ OmniRoute ਰਾਹੀਂ OmniConductor ਫਲੀਟ ਨੂੰ ਕੋਡਿੰਗ ਦਾ ਕੰਮ ਸੌਂਪਦੇ ਹਨ। ਬਾਡੀ: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — ਸਿਰਫ਼ ਕੰਡਕਟਰ ਫਲੀਟ ਹੁਨਰ (ਏਜੰਟ ਕਾਰਡ 'ਤੇ ਘੋਸ਼ਿਤ ਕੀਤੇ ਗਏ) ਸੌਂਪਣਯੋਗ ਹਨ; `metadata.conductor.repo.url` ਦੀ ਲੋੜ ਹੈ (ਫਲੀਟ git repos 'ਤੇ ਕੰਮ ਕਰਦਾ ਹੈ)। ਰੂਟ ਸਰਵਰ-ਸਾਈਡ `CONDUCTOR_ORCHESTRATOR_TOKEN` (fallback `CONDUCTOR_HUB_TOKEN`) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਹੱਬ ਦੇ `POST /v1/tasks` ਵਿੱਚ ਅਨੁਵਾਦ ਕਰਦਾ ਹੈ ਅਤੇ `201 { conductor_task_id, state: "submitted" }` ਵਾਪਸ ਕਰਦਾ ਹੈ; ਟਾਸਕ ਸਟੇਟਸ SSE→A2A ਮਿਰਰ (RF1) ਰਾਹੀਂ ਵਾਪਸ ਆਉਂਦੇ ਹਨ ਅਤੇ `GET /api/a2a/tasks?skill=conductor` ਰਾਹੀਂ ਦਿਖਾਈ ਦਿੰਦੇ ਹਨ।

---

## ਇੱਕ ਨਵਾਂ ਹੁਨਰ ਜੋੜਨਾ

1. **ਹੁਨਰ ਫਾਈਲ ਬਣਾਓ:** `src/lib/a2a/skills/<your-skill>.ts`

   ਇੱਕ async ਫੰਕਸ਼ਨ `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>` ਐਕਸਪੋਰਟ ਕਰੋ। ਮੌਜੂਦਾ ਹੁਨਰ ਜਿਵੇਂ ਕਿ `smartRouting.ts` ਦੀ ਸ਼ਕਲ ਦਾ ਪਾਲਣ ਕਰੋ। ਜੇਕਰ ਹੁਨਰ HTTP ਉੱਤੇ OmniRoute ਵਿੱਚ ਵਾਪਸ ਕਾਲ ਕਰਦਾ ਹੈ, ਤਾਂ `src/lib/a2a/selfLoopAuth.ts` ਤੋਂ `buildSelfLoopHeaders(caller)` ਨਾਲ ਹੈਡਰ ਬਣਾਓ ਤਾਂ ਕਿ ਕਾਲ A2A ਕਾਲਰ ਦੀ ਕੁੰਜੀ ਨਾਲ ਚੱਲੇ, `OMNIROUTE_API_KEY` ਨਾਲ ਨਹੀਂ, ਅਤੇ `redirect: "error"` ਨੂੰ `fetch` ਵਿੱਚ ਪਾਸ ਕਰੋ ਤਾਂ ਕਿ ਰੀਡਾਇਰੈਕਟ ਨੂੰ ਕਦੇ ਵੀ ਕੁੰਜੀ ਨਾ ਮਿਲੇ। ਸਹਾਇਕ ਸਿਰਫ਼ ਸਿਰਲੇਖ ਬਣਾਉਂਦਾ ਹੈ; ਹਰੇਕ ਹੁਨਰ ਰੀਡਾਇਰੈਕਟ ਨੀਤੀ ਨੂੰ ਖੁਦ ਸੈੱਟ ਕਰਦਾ ਹੈ। ਇਹ ਇੱਕ ਕੁੰਜੀ ਨੂੰ ਜੋੜਨ ਦੀ ਬਜਾਏ `UnsafeSelfLoopTargetError` ਨੂੰ ਸੁੱਟਦਾ ਹੈ ਜਦੋਂ ਹੱਲ ਕੀਤਾ ਬੇਸ URL ਪ੍ਰਾਈਵੇਟ ਨੈੱਟਵਰਕ (ਲੂਪਬੈਕ, ਇੱਕ ਕੰਟੇਨਰ ਜਾਂ ਸੇਵਾ ਦਾ ਨਾਮ, ਅਤੇ ਨਿੱਜੀ ਪਤੇ ਠੀਕ ਹਨ) ਦੇ ਬਾਹਰ ਸਧਾਰਨ http ਹੁੰਦਾ ਹੈ ਜਾਂ ਪ੍ਰਮਾਣ ਪੱਤਰ ਰੱਖਦਾ ਹੈ, ਇਸਲਈ ਇੱਕ ਹੁਨਰ ਜੋ ਅਸਵੀਕਾਰ ਕੀਤੀਆਂ ਕਾਲਾਂ ਨੂੰ ਨਿਗਲਦਾ ਹੈ ਉਸ ਗਲਤੀ ਨੂੰ ਮੁੜ-ਥਰੂ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ।

2. **ਰਜਿਸਟਰ ਹੈਂਡਲਰ:** `src/lib/a2a/taskExecution.ts` ਵਿੱਚ, `A2A_SKILL_HANDLERS` ਵਿੱਚ ਇੱਕ ਐਂਟਰੀ ਜੋੜੋ:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **ਏਜੰਟ ਕਾਰਡ ਵਿੱਚ ਪ੍ਰਗਟ ਕਰੋ:** `src/lib/a2a/agentCardMetadata.ts` ਵਿੱਚ ( `/.well-known/agent.json` ਅਤੇ `/.well-known/agent-card.json` ਦੁਆਰਾ ਸਾਂਝਾ ਕੀਤਾ ਗਿਆ), `skills` ਐਰੇ ਵਿੱਚ ਜੋੜੋ:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **ਟੈਸਟ ਲਿਖੋ:** `tests/unit/a2a-<your-skill>.test.ts` ਹੈਪੀ ਪਾਥ + ਗਲਤੀ ਮਾਰਗ ਨੂੰ ਕਵਰ ਕਰੋ।

5. **ਦਸਤਾਵੇਜ਼** ਇਸ ਫਾਈਲ ਦੇ `Available Skills` ਟੇਬਲ ਵਿੱਚ ਨਵਾਂ ਹੁਨਰ।

---

## ਟਾਸਕ TTL

ਟਾਸਕ `ttlMinutes` (ਡਿਫੌਲਟ 5 ਮਿੰਟ) ਤੋਂ ਬਾਅਦ ਮਿਆਦ ਪੁੱਗ ਜਾਂਦੇ ਹਨ — ਇਸਨੂੰ `src/lib/a2a/taskManager.ts:82` ਵਿੱਚ `A2ATaskManager` ਕੰਸਟਰਕਟਰ ਵਿੱਚ ਸੰਰਚਿਤ ਕੀਤਾ ਗਿਆ ਹੈ। ਇਸਨੂੰ ਅਨੁਕੂਲਿਤ ਕਰਨ ਲਈ, `A2ATaskManager` ਇੰਸਟੈਂਸ਼ੀਏਸ਼ਨ ਨੂੰ ਫੋਰਕ ਕਰੋ ਅਤੇ ਕੋਈ ਵੱਖਰਾ ਮੁੱਲ ਪਾਸ ਕਰੋ (ਉਦਾਹਰਨ ਲਈ, 15-ਮਿੰਟ ਦੀ TTL ਵਾਸਤੇ `new A2ATaskManager(15)`)। ਇੱਕ ਬੈਕਗ੍ਰਾਊਂਡ ਇੰਟਰਵਲ ਹਰ 60 ਸਕਿੰਟਾਂ ਬਾਅਦ ਮਿਆਦ ਪੁੱਗੇ ਟਾਸਕਾਂ ਨੂੰ ਹਟਾਉਂਦਾ ਹੈ।

---

## ਟਾਸਕ ਜੀਵਨ-ਚੱਕਰ

```
ਸਪੁਰਦ ਕੀਤਾ → ਕਾਰਜਸ਼ੀਲ → ਪੂਰਾ ਹੋਇਆ
                       → ਅਸਫਲ
                       → ਰੱਦ ਕੀਤਾ
```

- ਡਿਫੌਲਟ ਤੌਰ 'ਤੇ ਟਾਸਕਾਂ ਦੀ ਮਿਆਦ 5 ਮਿੰਟਾਂ ਬਾਅਦ ਪੁੱਗ ਜਾਂਦੀ ਹੈ ([ਟਾਸਕ TTL](#task-ttl) ਵੇਖੋ)
- ਅੰਤਿਮ ਸਥਿਤੀਆਂ: `completed`, `failed`, `cancelled`
- ਇਵੈਂਟ ਲੌਗ ਹਰ ਸਥਿਤੀ ਤਬਦੀਲੀ ਨੂੰ ਟਰੈਕ ਕਰਦਾ ਹੈ

---

## ਗਲਤੀ ਕੋਡ

| ਕੋਡ    | ਅਰਥ                              |
| :----- | :------------------------------- |
| -32700 | ਪਾਰਸ ਗਲਤੀ (ਅਵੈਧ JSON)            |
| -32600 | ਅਵੈਧ ਬੇਨਤੀ / ਅਣਅਧਿਕਾਰਤ           |
| -32601 | ਵਿਧੀ ਜਾਂ ਹੁਨਰ ਨਹੀਂ ਮਿਲਿਆ         |
| -32602 | ਅਵੈਧ ਪੈਰਾਮੀਟਰ                    |
| -32603 | ਅੰਦਰੂਨੀ ਗਲਤੀ                     |
| -32000 | A2A ਐਂਡਪੌਇੰਟ ਅਸਮਰੱਥ ਕੀਤਾ ਹੋਇਆ ਹੈ |

---

## ਏਕੀਕਰਣ ਦੀਆਂ ਉਦਾਹਰਨਾਂ

### ਪਾਈਥਨ (ਬੇਨਤੀ)

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

### TypeScript (ਲੈਣ)

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
