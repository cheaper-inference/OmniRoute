# OmniRoute A2A Server Documentation (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — ಬುದ್ಧಿವಂತ ರೂಟಿಂಗ್ ಏಜೆಂಟ್ ಆಗಿ OmniRoute

A2A ಇಂಟರ್ಫೇಸ್ ಎರಡು ರೂಪಗಳನ್ನು ಹೊಂದಿದೆ:

- **JSON-RPC 2.0** — `POST /a2a` ನಲ್ಲಿ (ಪ್ರಮಾಣಿತ ಪ್ರವೇಶ ಬಿಂದು, `src/app/a2a/route.ts` ನಲ್ಲಿ ವ್ಯಾಖ್ಯಾನಿಸಲಾಗಿದೆ).
- **REST** — ಡ್ಯಾಶ್ಬೋರ್ಡ್ಗಳು ಮತ್ತು ಪರಿಕರಗಳಿಗಾಗಿ `/api/a2a/*` ಅಡಿಯಲ್ಲಿ (ಸ್ಥಿತಿ, ಕಾರ್ಯ ಪಟ್ಟಿ, ರದ್ದುಗೊಳಿಸುವಿಕೆ).

ಕಾರ್ಯಗಳನ್ನು `A2ATaskManager` ಮೂಲಕ ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾಗುತ್ತದೆ (`src/lib/a2a/taskManager.ts`, ಡೀಫಾಲ್ಟ್ 5-ನಿಮಿಷದ TTL). ಕೌಶಲ್ಯಗಳನ್ನು `src/lib/a2a/taskExecution.ts` ನಲ್ಲಿರುವ `A2A_SKILL_HANDLERS` ಮೂಲಕ ರವಾನಿಸಲಾಗುತ್ತದೆ.

## ಏಜೆಂಟ್ ಅನ್ವೇಷಣೆ

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute ನ ಸಾಮರ್ಥ್ಯಗಳು, ಕೌಶಲ್ಯಗಳು ಮತ್ತು ದೃಢೀಕರಣದ ಅಗತ್ಯಗಳನ್ನು ವಿವರಿಸುವ ಏಜೆಂಟ್ ಕಾರ್ಡ್ ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ.

ಏಜೆಂಟ್ ಕಾರ್ಡ್ನ `version` ಕ್ಷೇತ್ರವನ್ನು `process.env.npm_package_version` ನಿಂದ ಪಡೆಯಲಾಗುತ್ತದೆ (`src/app/.well-known/agent.json/route.ts:13` ನೋಡಿ), ಆದ್ದರಿಂದ ಅದು ಪ್ರತಿ ಬಿಡುಗಡೆಯಲ್ಲೂ `package.json` ಜೊತೆಗೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಿಂಕ್ ಆಗಿರುತ್ತದೆ.

---

## ದೃಢೀಕರಣ

ಎಲ್ಲಾ `/a2a` ವಿನಂತಿಗಳಿಗೆ `Authorization` ಹೆಡರ್ ಮೂಲಕ API ಕೀ ಅಗತ್ಯವಿದೆ:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

ಸರ್ವರ್ನಲ್ಲಿ ಯಾವುದೇ API ಕೀ ಕಾನ್ಫಿಗರ್ ಮಾಡದಿದ್ದರೆ, ದೃಢೀಕರಣವನ್ನು ಬೈಪಾಸ್ ಮಾಡಲಾಗುತ್ತದೆ.

## ಸಕ್ರಿಯಗೊಳಿಸುವಿಕೆ

A2A ಅನ್ನು **Endpoints → A2A** ಟಾಗಲ್ ಮೂಲಕ ನಿಯಂತ್ರಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಡೀಫಾಲ್ಟ್ ಆಗಿ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ. ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿದಾಗ,
`GET /api/a2a/status` ಎಂಬುದು `status: "disabled"` ಮತ್ತು `online: false` ಎಂದು ವರದಿ ಮಾಡುತ್ತದೆ; `POST /a2a` ಗೆ ಮಾಡುವ JSON-RPC ಕರೆಗಳು
JSON-RPC ದೋಷ ಕೋಡ್ `-32000` ಜೊತೆಗೆ HTTP 503 ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತವೆ.

---

## JSON-RPC 2.0 ವಿಧಾನಗಳು

### `message/send` — ಸಮಕಾಲೀನ ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ

ಕೌಶಲ್ಯವೊಂದಕ್ಕೆ ಸಂದೇಶವನ್ನು ಕಳುಹಿಸಿ, ಸಂಪೂರ್ಣ ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ ಕಾಯುತ್ತದೆ.

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

`smart-routing` ಗಾಗಿ, ಗೇಟ್ವೇ ವಿನಂತಿಯಲ್ಲಿ `metadata.combo` ಎಂಬುದು
`metadata.model` ಗೆ ಸ್ಪಷ್ಟವಾದ ಅತಿಕ್ರಮಣವಾಗಿದೆ; ಇದನ್ನು ನಿರ್ಲಕ್ಷಿಸಲಾದ `x-combo`
JSON ಕ್ಷೇತ್ರವಾಗಿ ಅಲ್ಲದೆ, ನಿಜವಾದ `model` ಆಗಿ ಕಳುಹಿಸಲಾಗುತ್ತದೆ. ಗೇಟ್ವೇಯ ಸಾಮಾನ್ಯ API-ಕೀ ಮತ್ತು
ಪ್ರತಿ-ಗುರಿಯ ದೃಢೀಕರಣವು ಇನ್ನೂ ಅನ್ವಯಿಸುತ್ತದೆ. ಅಮಾನ್ಯ ಅಥವಾ ಖಾಲಿ ಕಾಂಬೊವನ್ನು ತಿರಸ್ಕರಿಸಲಾಗುತ್ತದೆ.

ಫಲಿತಾಂಶವು `requested_combo` (ಕರೆ ಮಾಡುವವರ ಉದ್ದೇಶ), `dispatched_model`
(ನಿಜವಾದ ಗೇಟ್ವೇ ವಿನಂತಿ), `response_model` (ಗೇಟ್ವೇ ಪ್ರತಿಕ್ರಿಯೆ) ಮತ್ತು
`confirmed_combo` ಅನ್ನು ಬಹಿರಂಗಪಡಿಸುತ್ತದೆ. ಗೇಟ್ವೇ ಸ್ಪಷ್ಟವಾಗಿ ಕಾಂಬೊವನ್ನು
ಗುರುತಿಸದಿದ್ದರೆ ಕೊನೆಯ ಕ್ಷೇತ್ರವು `null` ಆಗಿರುತ್ತದೆ. A2A ನಿರ್ಧಾರ ಲಾಗ್ಗಳು ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆಯನ್ನು
ದೃಢೀಕರಿಸಿದ ಕಾಂಬೊಗೆ ಮಾತ್ರ ಸಂಬಂಧಿಸುತ್ತವೆ ಮತ್ತು ದೃಢೀಕರಿಸದ ವಿನಂತಿಯನ್ನು `requestedCombo` ಆಗಿ ಉಳಿಸಿಕೊಳ್ಳುತ್ತವೆ.

**ಪ್ರತಿಕ್ರಿಯೆ:**

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

### `message/stream` — SSE ಸ್ಟ್ರೀಮಿಂಗ್

`message/send` ನಂತೆಯೇ ಇರುತ್ತದೆ, ಆದರೆ ನೈಜ-ಸಮಯದ ಸ್ಟ್ರೀಮಿಂಗ್ಗಾಗಿ Server-Sent Events ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ.

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

**SSE ಘಟನೆಗಳು:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — ಕಾರ್ಯದ ಸ್ಥಿತಿಯನ್ನು ವಿಚಾರಿಸಿ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ಕಾರ್ಯವನ್ನು ರದ್ದುಗೊಳಿಸಿ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ಲಭ್ಯವಿರುವ ಕೌಶಲ್ಯಗಳು

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` ನಲ್ಲಿ ವೈರ್ಡ್ 6 A2A ಕೌಶಲ್ಯಗಳನ್ನು ಬಹಿರಂಗಪಡಿಸುತ್ತದೆ. ಪ್ರತಿಯೊಂದು ಕೌಶಲ್ಯ ಮಾಡ್ಯೂಲ್ `src/lib/a2a/skills/` ನಲ್ಲಿ ವಾಸಿಸುತ್ತದೆ.

| ಕೌಶಲ್ಯ             | ID                   | ವಿವರಣೆ                                                                                                                                                                     | ಟ್ಯಾಗ್ಗಳು                      | ಉದಾಹರಣೆಗಳು                                          |
| :----------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------- | :-------------------------------------------------- |
| ಸ್ಮಾರ್ಟ್ ರೂಟಿಂಗ್   | `smart-routing`      | OmniRoute ಯ ಕಾಂಬೊ ಎಂಜಿನ್ + ಸ್ಕೋರಿಂಗ್ ಅನ್ನು ಬಳಸಿಕೊಂಡು ಸೂಕ್ತ provider/combo ಮೂಲಕ ಪ್ರಾಂಪ್ಟ್ ಅನ್ನು ರೂಟ್ ಮಾಡುತ್ತದೆ                                                              | ರೂಟಿಂಗ್, ಪೂರೈಕೆದಾರರು           | "ಅತ್ಯುತ್ತಮ ಮಾದರಿಯ ಮೂಲಕ ಈ ಪ್ರಾಂಪ್ಟ್ ಅನ್ನು ರೂಟ್ ಮಾಡಿ" |
| ಕೋಟಾ ನಿರ್ವಹಣೆ      | `quota-management`   | ಪ್ರತಿ ಪೂರೈಕೆದಾರರ ಕೋಟಾ ಸ್ಥಿತಿಯನ್ನು ವರದಿ ಮಾಡುತ್ತದೆ, throttle/switch ಯಾವಾಗ ಎಂದು ನಿರ್ಧರಿಸಲು ಕರೆ ಮಾಡುವವರಿಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ                                                      | ಕೋಟಾ, ಪೂರೈಕೆದಾರರು              | "ಮಾನವಶಾಸ್ತ್ರಕ್ಕಾಗಿ ಕೋಟಾವನ್ನು ಪರಿಶೀಲಿಸಿ"             |
| ಪೂರೈಕೆದಾರ ಡಿಸ್ಕವರಿ | `provider-discovery` | ಸಾಮರ್ಥ್ಯಗಳು, ಉಚಿತ-ಶ್ರೇಣಿಯ ಫ್ಲ್ಯಾಗ್ಗಳು, OAuth ಸ್ಥಿತಿಯೊಂದಿಗೆ ಸ್ಥಾಪಿಸಲಾದ ಪೂರೈಕೆದಾರರನ್ನು ಪಟ್ಟಿ ಮಾಡುತ್ತದೆ                                                                       | ಪೂರೈಕೆದಾರರು, ಅನ್ವೇಷಣೆ          | "ಯಾವ ಪೂರೈಕೆದಾರರು ಲಭ್ಯವಿದೆ?"                         |
| ವೆಚ್ಚ ವಿಶ್ಲೇಷಣೆ    | `cost-analysis`      | + ಇತ್ತೀಚಿನ ಬಳಕೆಯ ಕ್ಯಾಟಲಾಗ್ ಅನ್ನು ನೀಡಿದ request/conversation ಯ ಅಂದಾಜು ವೆಚ್ಚ                                                                                                 | ವೆಚ್ಚ, ಬಳಕೆ                    | "ಈ ಸಂಭಾಷಣೆಗೆ ಅಂದಾಜು ವೆಚ್ಚ"                          |
| ಆರೋಗ್ಯ ವರದಿ        | `health-report`      | ಪ್ರತಿ ಪೂರೈಕೆದಾರರಿಗೆ ಸರ್ಕ್ಯೂಟ್ ಬ್ರೇಕರ್, ಕೂಲ್ಡೌನ್, ಲಾಕ್ಔಟ್ ಸ್ಥಿತಿಯನ್ನು ಒಟ್ಟುಗೂಡಿಸುತ್ತದೆ                                                                                      | ಆರೋಗ್ಯ, ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ        | "ಎಲ್ಲಾ ಪೂರೈಕೆದಾರರ ಆರೋಗ್ಯ ಸ್ಥಿತಿಯನ್ನು ತೋರಿಸಿ"        |
| ಪಟ್ಟಿ ಸಾಮರ್ಥ್ಯಗಳು  | `list-capabilities`  | ಕಾಂಟೆಕ್ಸ್ಟ್ ಇಂಜೆಕ್ಷನ್ಗಾಗಿ ಕಚ್ಚಾ SKILL.md URLs ಜೊತೆಗೆ ಮಾರ್ಕ್ಡೌನ್ ಟೇಬಲ್ನಂತೆ ಪೂರ್ಣ 45-ಎಂಟ್ರಿ ಏಜೆಂಟ್ ಸ್ಕಿಲ್ಸ್ ಕ್ಯಾಟಲಾಗ್ (23 API + 21 CLI + 1 ಕಾನ್ಫಿಗರ್) ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ | ಕ್ಯಾಟಲಾಗ್, ಅನ್ವೇಷಣೆ, ಕೌಶಲ್ಯಗಳು | "ಎಲ್ಲಾ OmniRoute ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ"         |

> ಏಜೆಂಟ್ ಕಾರ್ಡ್ ಅನ್ನು ಲೈವ್ 385-ಪ್ರೊವೈಡರ್ ಕ್ಯಾಟಲಾಗ್ನೊಂದಿಗೆ ಜೋಡಿಸಬೇಕು; ಪೂರೈಕೆದಾರರ ಎಣಿಕೆಗಳು ಮತ್ತು free/no-auth ಮೆಟಾಡೇಟಾವನ್ನು ರನ್ಟೈಮ್ ರಿಜಿಸ್ಟ್ರಿಯಿಂದ ಪಡೆಯಲಾಗಿದೆ.

### `list-capabilities` ಕೌಶಲ್ಯ ವಿವರ

`list-capabilities` ಕೌಶಲ್ಯವು ಬಾಹ್ಯ ಏಜೆಂಟ್ಗಳಿಗೆ ವಿಶೇಷವಾಗಿ ಉಪಯುಕ್ತವಾಗಿದೆ, ಅವರು API ಕರೆಗಳನ್ನು ಕಳುಹಿಸುವ ಮೊದಲು OmniRoute ಏನನ್ನು ಬಹಿರಂಗಪಡಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ಕಂಡುಹಿಡಿಯಬೇಕು. ಇದು ರಚನಾತ್ಮಕ ಮಾರ್ಕ್ಡೌನ್ ಟೇಬಲ್ ಕಲಾಕೃತಿಯನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

ಪ್ರತಿಯೊಂದು ಸಾಲು `rawUrl` ಕಾಲಮ್ ಅನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ ಆದ್ದರಿಂದ ಏಜೆಂಟ್ಗಳು ತಕ್ಷಣವೇ ಪೂರ್ಣ SKILL.md ಪಡೆಯಬಹುದು. `metadata.totalSkills` ಕ್ಷೇತ್ರವು ಕ್ಯಾಟಲಾಗ್ ಗಾತ್ರವನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ (45 ಇಂದು). ಅನುಷ್ಠಾನ: `src/lib/a2a/skills/listCapabilities.ts`. [AGENT-SKILLS.md](./AGENT-SKILLS.md) ಸಹ ನೋಡಿ.

---

## REST API (ಸಹಾಯಕ)

JSON-RPC ಅಂತ್ಯಬಿಂದು `/a2a` ಅಂಗೀಕೃತ A2A ಪ್ರವೇಶ ಬಿಂದುವಾಗಿದೆ. ಕೆಳಗಿನ REST ಅಂತಿಮ ಬಿಂದುಗಳು ಡ್ಯಾಶ್ಬೋರ್ಡ್ಗಳು ಮತ್ತು ಬಾಹ್ಯ ಉಪಕರಣಗಳಿಗೆ ಸಹಾಯಕ ಪ್ರವೇಶವನ್ನು ಒದಗಿಸುತ್ತದೆ:

| ಅಂತ್ಯಬಿಂದು                   | ವಿಧಾನ | ವಿವರಣೆ                                                 | ದೃಢೀಕರಣ                                                                                       |
| :--------------------------- | :---- | :----------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET   | ಸರ್ವರ್ ಸ್ಥಿತಿ, ನೋಂದಾಯಿತ ಕೌಶಲ್ಯಗಳು                      | (ಸಾರ್ವಜನಿಕ)                                                                                   |
| `/api/a2a/tasks`             | GET   | ಫಿಲ್ಟರ್ಗಳೊಂದಿಗೆ ಕಾರ್ಯಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ                 | ನಿರ್ವಹಣೆ ಅಥವಾ API ಕೀ (ಕೆಳಗೆ ನೋಡಿ)                                                             |
| `/api/a2a/tasks/[id]`        | GET   | ID ಮೂಲಕ ಕಾರ್ಯವನ್ನು ಪಡೆಯಿರಿ                             | ನಿರ್ವಹಣೆ ಅಥವಾ API ಕೀ (ಕೆಳಗೆ ನೋಡಿ)                                                             |
| `/api/a2a/tasks/[id]/cancel` | POST  | ಚಾಲನೆಯಲ್ಲಿರುವ ಕಾರ್ಯವನ್ನು ರದ್ದುಗೊಳಿಸಿ                   | ನಿರ್ವಹಣೆ ಅಥವಾ API ಕೀ (ಕೆಳಗೆ ನೋಡಿ)                                                             |
| `/.well-known/agent.json`    | GET   | ಏಜೆಂಟ್ ಕಾರ್ಡ್ (A2A ಡಿಸ್ಕವರಿ)                           | (ಸಾರ್ವಜನಿಕ, ಸಂಗ್ರಹ 3600s)                                                                     |
| `/api/a2a/tasks`             | POST  | OmniConductor ಫ್ಲೀಟ್ಗೆ ಒಳಬರುವ ನಿಯೋಗ (ಕಂಡಕ್ಟರ್ PRD RF5) | ಅದೇ `GET`, ಜೊತೆಗೆ `OMNIROUTE_API_KEY` ಹೊಂದಿಸಿದರೆ `REQUIRE_API_KEY` ಆಫ್ ಆಗಿರುವಾಗ; `a2aEnabled` |

`/api/a2a/tasks*` ಮಾರ್ಗಗಳನ್ನು ಯಾರು ಪಡೆಯುತ್ತಾರೆ ಎಂಬುದು ಲಾಗಿನ್ ಮತ್ತು API-ಕೀ ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು ಅವಲಂಬಿಸಿರುತ್ತದೆ:

- `requireLogin=true` (ಡೀಫಾಲ್ಟ್): ಮಿಡಲ್ವೇರ್ ನಿರ್ವಹಣಾ ರುಜುವಾತುಗಳನ್ನು ಮಾತ್ರ ಒಪ್ಪಿಕೊಳ್ಳುತ್ತದೆ (ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್, `manage` -scope API ಕೀ, `oma_` ಪ್ರವೇಶ ಟೋಕನ್) ಮತ್ತು `OMNIROUTE_API_KEY`. ಒಂದು ಸರಳವಾದ ನಿರ್ಣಯದ ಕೀಲಿಯು `403` ಪಡೆಯುತ್ತದೆ. `Authorization` ಹೆಡರ್ನಲ್ಲಿ ಮಿಡಲ್ವೇರ್ `OMNIROUTE_API_KEY` `Bearer <key>` ಎಂದು ಮಾತ್ರ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ; `Bearer` ನಂತರ ಒಂದು ಬೇರ್ ಕೀ ಅಥವಾ ಟ್ಯಾಬ್ `401` ಪಡೆಯುತ್ತದೆ.
- `requireLogin=false`, ಅಥವಾ ಆನ್ಬೋರ್ಡಿಂಗ್ ಮಾಡುವ ಮೊದಲು ಲೂಪ್ಬ್ಯಾಕ್ ವಿಂಡೋ: `REQUIRE_API_KEY=true` ನೊಂದಿಗೆ ಯಾವುದೇ ಮಾನ್ಯವಾದ OmniRoute API ಕೀ ಅಥವಾ ಮ್ಯಾನೇಜ್ಮೆಂಟ್ ರುಜುವಾತುಗಳನ್ನು ಸ್ವೀಕರಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಅನಾಮಧೇಯ ಕರೆ ಮಾಡುವವರು `401` ಪಡೆಯುತ್ತಾರೆ; `REQUIRE_API_KEY` ಜೊತೆಗೆ ಮಾರ್ಗಗಳು ತೆರೆದಿರುತ್ತವೆ.
- ಆ ವೇರಿಯೇಬಲ್ ಅನ್ನು ಹೊಂದಿಸಿದಾಗ ಮತ್ತು `REQUIRE_API_KEY` ಆಫ್ ಆಗಿರುವಾಗ `POST /api/a2a/tasks` ಹೆಚ್ಚುವರಿಯಾಗಿ `Authorization` ಹೆಡರ್ನಲ್ಲಿ `OMNIROUTE_API_KEY` ಅಗತ್ಯವಿರುತ್ತದೆ. `x-api-key` ನಂತಹ ಇತರ ಹೆಡರ್ಗಳು ಅಲ್ಲಿ ಎಣಿಸುವುದಿಲ್ಲ. ಲಾಗಿನ್ ಆಫ್ನೊಂದಿಗೆ ಅಥವಾ ಆನ್ಬೋರ್ಡಿಂಗ್ ಮಾಡುವ ಮೊದಲು ಕೀಲಿಯು `Bearer` ಪೂರ್ವಪ್ರತ್ಯಯದೊಂದಿಗೆ ಅಥವಾ ಇಲ್ಲದೆ ಹಾದುಹೋಗುತ್ತದೆ; ಲಾಗಿನ್ ಆಗುವುದರೊಂದಿಗೆ, `Bearer <key>` ಮಾತ್ರ ಮಿಡಲ್ವೇರ್ ಅನ್ನು ಮೀರುತ್ತದೆ.

ರುಜುವಾತು ಅಗತ್ಯವಿರುವಲ್ಲಿ, `read` -scope `oma_` ಟೋಕನ್ `GET` ಗಾಗಿ ಮಾತ್ರ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ.

**ಒಳಬರುವ ಕಂಡಕ್ಟರ್ ನಿಯೋಗ (`POST /api/a2a/tasks`):** ಬಾಹ್ಯ A2A ಏಜೆಂಟ್ಗಳು OmniRoute ಮೂಲಕ OmniConductor ಫ್ಲೀಟ್ಗೆ ಕೋಡಿಂಗ್ ಕೆಲಸವನ್ನು ನಿಯೋಜಿಸುತ್ತಾರೆ. ದೇಹ: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — ಮಾತ್ರ ಕಂಡಕ್ಟರ್ ಫ್ಲೀಟ್ ಕೌಶಲ್ಯಗಳು (ಏಜೆಂಟ್ ಕಾರ್ಡ್ನಲ್ಲಿ ಘೋಷಿಸಲಾದವುಗಳು) ನಿಯೋಜಿಸಬಹುದಾಗಿದೆ; `metadata.conductor.repo.url` ಅಗತ್ಯವಿದೆ (ಫ್ಲೀಟ್ ಗಿಟ್ ರೆಪೋಗಳಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ). ಮಾರ್ಗವು ಸರ್ವರ್-ಸೈಡ್ `CONDUCTOR_ORCHESTRATOR_TOKEN` (ಫಾಲ್ಬ್ಯಾಕ್ `CONDUCTOR_HUB_TOKEN`) ಅನ್ನು ಬಳಸಿಕೊಂಡು ಹಬ್ನ `POST /v1/tasks` ಗೆ ಅನುವಾದಿಸುತ್ತದೆ ಮತ್ತು `201 { conductor_task_id, state: "submitted" }` ಹಿಂತಿರುಗಿಸುತ್ತದೆ; ಕಾರ್ಯ ಸ್ಥಿತಿಗಳು SSE→A2A ಮಿರರ್ (RF1) ಮೂಲಕ ಹಿಂತಿರುಗುತ್ತವೆ ಮತ್ತು `GET /api/a2a/tasks?skill=conductor` ಮೂಲಕ ಗೋಚರಿಸುತ್ತವೆ.

---

## ಹೊಸ ಕೌಶಲ್ಯವನ್ನು ಸೇರಿಸಲಾಗುತ್ತಿದೆ

1. **ಕೌಶಲ್ಯ ಫೈಲ್ ರಚಿಸಿ:** `src/lib/a2a/skills/<your-skill>.ts`

   ಅಸಿಂಕ್ ಫಂಕ್ಷನ್ ಅನ್ನು ರಫ್ತು ಮಾಡಿ `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. `smartRouting.ts` ನಂತಹ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಕೌಶಲ್ಯಗಳ ಆಕಾರವನ್ನು ಅನುಸರಿಸಿ. ಕೌಶಲ್ಯವು HTTP ಮೂಲಕ OmniRoute ಗೆ ಮರಳಿ ಕರೆದರೆ, `src/lib/a2a/selfLoopAuth.ts` ನಿಂದ `buildSelfLoopHeaders(caller)` ನೊಂದಿಗೆ ಹೆಡರ್ಗಳನ್ನು ನಿರ್ಮಿಸಿ ಆದ್ದರಿಂದ ಕರೆಯು A2A ಕಾಲರ್ನ ಕೀಯೊಂದಿಗೆ ಚಲಿಸುತ್ತದೆ, `OMNIROUTE_API_KEY` ಅಲ್ಲ, ಮತ್ತು `redirect: "error"` `fetch` ಗೆ ರವಾನಿಸಿ ಆದ್ದರಿಂದ ಮರುನಿರ್ದೇಶನವು ಕೀಯನ್ನು ಎಂದಿಗೂ ಪಡೆಯುವುದಿಲ್ಲ. ಸಹಾಯಕ ಮಾತ್ರ ಹೆಡರ್ಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತಾನೆ; ಪ್ರತಿಯೊಂದು ಕೌಶಲ್ಯವು ಮರುನಿರ್ದೇಶನ ನೀತಿಯನ್ನು ಸ್ವತಃ ಹೊಂದಿಸುತ್ತದೆ. ಪರಿಹರಿಸಲಾದ ಬೇಸ್ URL ಖಾಸಗಿ ನೆಟ್ವರ್ಕ್ನ ಹೊರಗೆ (ಲೂಪ್ಬ್ಯಾಕ್, ಕಂಟೇನರ್ ಅಥವಾ ಸೇವೆಯ ಹೆಸರು, ಮತ್ತು ಖಾಸಗಿ ವಿಳಾಸಗಳು ಉತ್ತಮವಾಗಿವೆ) ಅಥವಾ ರುಜುವಾತುಗಳನ್ನು ಹೊಂದಿರುವಾಗ ಕೀಲಿಯನ್ನು ಲಗತ್ತಿಸುವ ಬದಲು ಅದು `UnsafeSelfLoopTargetError` ಎಸೆಯುತ್ತದೆ, ಆದ್ದರಿಂದ ತಿರಸ್ಕರಿಸಿದ ಕರೆಗಳನ್ನು ನುಂಗುವ ಕೌಶಲ್ಯವು ಆ ದೋಷವನ್ನು ಹಿಂತೆಗೆದುಕೊಳ್ಳಬೇಕು.

2. **ರಿಜಿಸ್ಟರ್ ಹ್ಯಾಂಡ್ಲರ್:** `src/lib/a2a/taskExecution.ts` ನಲ್ಲಿ, `A2A_SKILL_HANDLERS` ಗೆ ನಮೂದನ್ನು ಸೇರಿಸಿ:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **ಏಜೆಂಟ್ ಕಾರ್ಡ್ನಲ್ಲಿ ಬಹಿರಂಗಪಡಿಸಿ:** `src/lib/a2a/agentCardMetadata.ts` ನಲ್ಲಿ ( `/.well-known/agent.json` ಮತ್ತು `/.well-known/agent-card.json` ಯಿಂದ ಹಂಚಿಕೊಳ್ಳಲಾಗಿದೆ), `skills` ಅರೇಗೆ ಸೇರಿಸಿ:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **ಪರೀಕ್ಷೆಗಳನ್ನು ಬರೆಯಿರಿ:** `tests/unit/a2a-<your-skill>.test.ts` ಸಂತೋಷದ ಮಾರ್ಗ + ದೋಷ ಮಾರ್ಗವನ್ನು ಕವರ್ ಮಾಡಿ.

5. **ಡಾಕ್ಯುಮೆಂಟ್** ಈ ಫೈಲ್ನ `Available Skills` ಕೋಷ್ಟಕದಲ್ಲಿ ಹೊಸ ಕೌಶಲ್ಯ.

---

## ಕಾರ್ಯದ TTL

ಕಾರ್ಯಗಳು `ttlMinutes` ನಂತರ (ಡೀಫಾಲ್ಟ್ ಆಗಿ 5 ನಿಮಿಷ) ಅವಧಿ ಮೀರುತ್ತವೆ — ಇದನ್ನು `src/lib/a2a/taskManager.ts:82` ನಲ್ಲಿರುವ `A2ATaskManager` ಕನ್ಸ್ಟ್ರಕ್ಟರ್ನಲ್ಲಿ ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾಗಿದೆ. ಕಸ್ಟಮೈಸ್ ಮಾಡಲು, `A2ATaskManager` ಇನ್ಸ್ಟಾನ್ಷಿಯೇಷನ್ ಅನ್ನು ಫೋರ್ಕ್ ಮಾಡಿ ಮತ್ತು ಬೇರೆ ಮೌಲ್ಯವನ್ನು ಪಾಸ್ ಮಾಡಿ (ಉದಾ., 15 ನಿಮಿಷಗಳ TTL ಗಾಗಿ `new A2ATaskManager(15)`). ಹಿನ್ನೆಲೆ ಇಂಟರ್ವಲ್ ಪ್ರತಿ 60 ಸೆಕೆಂಡುಗಳಿಗೆ ಅವಧಿ ಮೀರಿದ ಕಾರ್ಯಗಳನ್ನು ತೆರವುಗೊಳಿಸುತ್ತದೆ.

---

## ಕಾರ್ಯದ ಜೀವನಚಕ್ರ

```
ಸಲ್ಲಿಸಲಾಗಿದೆ → ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ → ಪೂರ್ಣಗೊಂಡಿದೆ
                                  → ವಿಫಲವಾಗಿದೆ
                                  → ರದ್ದುಗೊಂಡಿದೆ
```

- ಕಾರ್ಯಗಳು ಡೀಫಾಲ್ಟ್ ಆಗಿ 5 ನಿಮಿಷಗಳ ನಂತರ ಅವಧಿ ಮೀರುತ್ತವೆ ([ಕಾರ್ಯದ TTL](#task-ttl) ನೋಡಿ)
- ಅಂತಿಮ ಸ್ಥಿತಿಗಳು: `completed`, `failed`, `cancelled`
- ಈವೆಂಟ್ ಲಾಗ್ ಪ್ರತಿಯೊಂದು ಸ್ಥಿತಿ ಪರಿವರ್ತನೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುತ್ತದೆ

---

## ದೋಷ ಕೋಡ್ಗಳು

| ಕೋಡ್   | ಅರ್ಥ                            |
| :----- | :------------------------------ |
| -32700 | ಪಾರ್ಸ್ ದೋಷ (ಅಮಾನ್ಯ JSON)        |
| -32600 | ಅಮಾನ್ಯ ವಿನಂತಿ / ಅನುಮತಿ ಇಲ್ಲ     |
| -32601 | ವಿಧಾನ ಅಥವಾ ಕೌಶಲ್ಯ ಕಂಡುಬಂದಿಲ್ಲ   |
| -32602 | ಅಮಾನ್ಯ ಪ್ಯಾರಾಮೀಟರ್ಗಳು           |
| -32603 | ಆಂತರಿಕ ದೋಷ                      |
| -32000 | A2A ಎಂಡ್ಪಾಯಿಂಟ್ ನಿಷ್ಕ್ರಿಯವಾಗಿದೆ |

---

## ಏಕೀಕರಣ ಉದಾಹರಣೆಗಳು

### ಪೈಥಾನ್ (ವಿನಂತಿಗಳು)

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

### TypeScript (ತರಲು)

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
