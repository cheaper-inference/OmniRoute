# OmniRoute A2A Server Documentation (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — ଏକ ବୁଦ୍ଧିମାନ ରାଉଟିଂ ଏଜେଣ୍ଟ ଭାବରେ OmniRoute

A2A ପୃଷ୍ଠର ଦୁଇଟି ରୂପ ଅଛି:

- **JSON-RPC 2.0** `POST /a2a` ଠାରେ (ପ୍ରାମାଣିକ ପ୍ରବେଶ ବିନ୍ଦୁ, `src/app/a2a/route.ts` ରେ ପରିଭାଷିତ)।
- **REST** ଡ୍ୟାଶବୋର୍ଡ ଏବଂ ଟୁଲିଂ ପାଇଁ `/api/a2a/*` ଅଧୀନରେ (ସ୍ଥିତି, କାର୍ଯ୍ୟ ତାଲିକା, ବାତିଲ୍)।

କାର୍ଯ୍ୟଗୁଡ଼ିକୁ `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, ଡିଫଲ୍ଟ 5-ମିନିଟ୍ TTL) ଦ୍ୱାରା ଟ୍ରାକ୍ କରାଯାଏ। ଦକ୍ଷତାଗୁଡ଼ିକୁ `src/lib/a2a/taskExecution.ts` ରେ ଥିବା `A2A_SKILL_HANDLERS` ମାଧ୍ୟମରେ ପ୍ରେରଣ କରାଯାଏ।

## ଏଜେଣ୍ଟ ଆବିଷ୍କାର

```bash
curl http://localhost:20128/.well-known/agent.json
```

ଏହା OmniRouteର କ୍ଷମତା, ଦକ୍ଷତା ଏବଂ ପ୍ରମାଣୀକରଣ ଆବଶ୍ୟକତା ବର୍ଣ୍ଣନା କରୁଥିବା ଏଜେଣ୍ଟ କାର୍ଡ ଫେରାଏ।

ଏଜେଣ୍ଟ କାର୍ଡର `version` ଫିଲ୍ଡ `process.env.npm_package_version` ରୁ ନିଆଯାଏ (`src/app/.well-known/agent.json/route.ts:13` ଦେଖନ୍ତୁ), ତେଣୁ ପ୍ରତ୍ୟେକ ରିଲିଜ୍ରେ ଏହା `package.json` ସହିତ ସ୍ୱୟଂଚାଳିତ ଭାବରେ ସିଙ୍କ୍ ହୋଇ ରହେ।

---

## ପ୍ରମାଣୀକରଣ

ସମସ୍ତ `/a2a` ଅନୁରୋଧ ପାଇଁ `Authorization` ହେଡର୍ ମାଧ୍ୟମରେ ଏକ API କୀ ଆବଶ୍ୟକ:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

ଯଦି ସର୍ଭରରେ କୌଣସି API କୀ ବିନ୍ୟାସ କରାଯାଇନାହିଁ, ତେବେ ପ୍ରମାଣୀକରଣକୁ ଏଡ଼ାଇ ଦିଆଯାଏ।

## ସକ୍ଷମକରଣ

A2A **Endpoints → A2A** ଟଗଲ୍ ଦ୍ୱାରା ନିୟନ୍ତ୍ରିତ ହୁଏ ଏବଂ ଡିଫଲ୍ଟ ଭାବରେ ଅକ୍ଷମ ଥାଏ। ଅକ୍ଷମ ଥିବାବେଳେ,
`GET /api/a2a/status` ଦ୍ୱାରା `status: "disabled"` ଏବଂ `online: false` ରିପୋର୍ଟ କରାଯାଏ; `POST /a2a` ପ୍ରତି JSON-RPC କଲ୍ଗୁଡ଼ିକ JSON-RPC ତ୍ରୁଟି କୋଡ୍ `-32000` ସହିତ HTTP 503 ଫେରାନ୍ତି।

---

## JSON-RPC 2.0 ପଦ୍ଧତିଗୁଡ଼ିକ

### `message/send` — ସମକାଳୀନ ନିଷ୍ପାଦନ

ଏକ ସ୍କିଲ୍କୁ ସନ୍ଦେଶ ପଠାଏ ଏବଂ ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରତିକ୍ରିୟା ପାଇଁ ଅପେକ୍ଷା କରେ।

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

`smart-routing` ପାଇଁ, `metadata.combo` ହେଉଛି ଗେଟୱେ ଅନୁରୋଧ ନିମନ୍ତେ
`metadata.model`-ର ଏକ ସ୍ପଷ୍ଟ ଓଭରରାଇଡ୍; ଏହାକୁ ଅଣଦେଖା କରାଯାଇଥିବା `x-combo`
JSON ଫିଲ୍ଡ ଭାବରେ ନୁହେଁ, ପ୍ରକୃତ `model` ଭାବରେ ପଠାଯାଏ। ଗେଟୱେର ସାଧାରଣ API କି ଏବଂ
ପ୍ରତ୍ୟେକ ଟାର୍ଗେଟ୍ ପାଇଁ ପ୍ରାଧିକରଣ ତଥାପି ପ୍ରଯୁଜ୍ୟ ହୁଏ। ଏକ ଅବୈଧ କିମ୍ବା ଖାଲି କମ୍ବୋକୁ ପ୍ରତ୍ୟାଖ୍ୟାନ କରାଯାଏ।

ଫଳାଫଳରେ `requested_combo` (କଲ୍କାରୀଙ୍କ ଉଦ୍ଦେଶ୍ୟ), `dispatched_model`
(ପ୍ରକୃତ ଗେଟୱେ ଅନୁରୋଧ), `response_model` (ଗେଟୱେ ପ୍ରତିକ୍ରିୟା) ଏବଂ
`confirmed_combo` ପ୍ରକାଶିତ ହୁଏ। ଗେଟୱେ ସ୍ପଷ୍ଟ ଭାବରେ କୌଣସି କମ୍ବୋ ଚିହ୍ନଟ ନକଲେ ଶେଷ ଫିଲ୍ଡଟି `null`
ରହେ। A2A ନିଷ୍ପତ୍ତି ଲଗ୍ଗୁଡ଼ିକ କେବଳ ଏକ
ନିଶ୍ଚିତ କମ୍ବୋକୁ ନିଷ୍ପାଦନର ଶ୍ରେୟ ଦିଅନ୍ତି, ଏବଂ ଏକ ଅନିଶ୍ଚିତ ଅନୁରୋଧକୁ `requestedCombo` ଭାବରେ ରଖନ୍ତି।

**ପ୍ରତିକ୍ରିୟା:**

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

### `message/stream` — SSE ଷ୍ଟ୍ରିମିଂ

`message/send` ସହ ସମାନ, କିନ୍ତୁ ରିଅଲ୍-ଟାଇମ୍ ଷ୍ଟ୍ରିମିଂ ପାଇଁ ସର୍ଭର୍-ସେଣ୍ଟ୍ ଇଭେଣ୍ଟ୍ଗୁଡ଼ିକ ଫେରାଏ।

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

**SSE ଇଭେଣ୍ଟ୍ଗୁଡ଼ିକ:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — ଟାସ୍କ ସ୍ଥିତି ପଚାରନ୍ତୁ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ଏକ ଟାସ୍କ ବାତିଲ୍ କରନ୍ତୁ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ଉପଲବ୍ଧ କ ills ଶଳ।

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` ରେ ତାରଯୁକ୍ତ 6 A2A skills ଶଳ ପ୍ରକାଶ କରେ। ପ୍ରତ୍ୟେକ ସ୍କିଲ୍ ମଡ୍ୟୁଲ୍ `src/lib/a2a/skills/` ରେ ରୁହେ।

| ଦକ୍ଷତା।              | ID                   | ବର୍ଣ୍ଣନା                                                                                                                                                        | ଟ୍ୟାଗ୍ସ                         | ଉଦାହରଣଗୁଡିକ                                           |
| :------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ | :---------------------------------------------------- |
| ସ୍ମାର୍ଟ ରାଉଟିଙ୍ଗ୍।   | `smart-routing`      | OmniRoute ର କମ୍ବୋ ଇଞ୍ଜିନ୍ + ସ୍କୋରିଂ ବ୍ୟବହାର କରି ଉତ୍କୃଷ୍ଟ provider/combo ମାଧ୍ୟମରେ ଏକ ପ୍ରମ୍ପ୍ଟକୁ ମାର୍ଗ ଦିଏ।                                                       | ମାର୍ଗ, ପ୍ରଦାନକାରୀ।              | ସର୍ବୋତ୍ତମ ମଡେଲ ମାଧ୍ୟମରେ ଏହି ପ୍ରମ୍ପ୍ଟକୁ ମାର୍ଗ ଦିଅନ୍ତୁ। |
| କୋଟା ପରିଚାଳନା        | `quota-management`   | ପ୍ରତି-ପ୍ରଦାନକାରୀ କୋଟା ସ୍ଥିତିର ରିପୋର୍ଟ, କଲ୍ କରୁଥିବା ବ୍ୟକ୍ତିଙ୍କୁ throttle/switch ସ୍ଥିର କରିବାରେ ସାହାଯ୍ୟ କରେ।                                                       | କୋଟା, ପ୍ରଦାନକାରୀ।               | "ଆନ୍ଥ୍ରୋପିକ୍ ପାଇଁ କୋଟା ଯାଞ୍ଚ କରନ୍ତୁ"                  |
| ପ୍ରଦାନକାରୀ ଆବିଷ୍କାର। | `provider-discovery` | ସାମର୍ଥ୍ୟ, ମାଗଣା ସ୍ତରୀୟ ପତାକା, OAuth ସ୍ଥିତି ସହିତ ସଂସ୍ଥାପିତ ପ୍ରଦାନକାରୀ ତାଲିକା।                                                                                    | ପ୍ରଦାନକାରୀ, ଆବିଷ୍କାର।           | "କେଉଁ ପ୍ରଦାନକାରୀ ଉପଲବ୍ଧ?"                             |
| ମୂଲ୍ୟ ବିଶ୍ଳେଷଣ।      | `cost-analysis`      | ସମ୍ପ୍ରତି + କାଟାଲଗ୍ ଦିଆଯାଇଥିବା request/conversation ର ମୂଲ୍ୟ ଆକଳନ କରେ।                                                                                            | ମୂଲ୍ୟ, ବ୍ୟବହାର                  | "ଏହି ବାର୍ତ୍ତାଳାପ ପାଇଁ ଆନୁମାନିକ ମୂଲ୍ୟ"                 |
| ସ୍ୱାସ୍ଥ୍ୟ ରିପୋର୍ଟ    | `health-report`      | ଏଗ୍ରିଗେଟ୍ ସର୍କିଟ ବ୍ରେକର୍, କୁଲଡାଉନ୍, ପ୍ରତି ପ୍ରଦାନକାରୀଙ୍କ ପାଇଁ ଲକଆଉଟ୍ ସ୍ଥିତି।                                                                                     | ସ୍ୱାସ୍ଥ୍ୟ, ସ୍ଥିରତା।             | "ସମସ୍ତ ପ୍ରଦାନକାରୀଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ସ୍ଥିତି ଦେଖାନ୍ତୁ"       |
| ତାଲିକା ତାଲିକା।       | `list-capabilities`  | ପ୍ରସଙ୍ଗ ଇଞ୍ଜେକ୍ସନ୍ ପାଇଁ କଞ୍ଚା SKILL.md URLs ସହିତ ମାର୍କଡାଉନ୍ ଟେବୁଲ୍ ଭାବରେ ସମ୍ପୂର୍ଣ୍ଣ 45-ଏଣ୍ଟ୍ରି ଏଜେଣ୍ଟ ସ୍କିଲ୍ସ କାଟାଲଗ୍ (23 API + 21 CLI + 1 ବିନ୍ୟାସ) ଫେରସ୍ତ କରେ। | କାଟାଲଗ୍, ଆବିଷ୍କାର, କ skills ଶଳ। | "ସମସ୍ତ OmniRoute କ୍ଷମତା ତାଲିକା କର"                    |

> ଏଜେଣ୍ଟ କାର୍ଡକୁ ଲାଇଭ 394-ପ୍ରଦାନକାରୀ କାଟାଲଗ୍ ସହିତ ସମାନ ରଖିବା ଉଚିତ୍; ପ୍ରଦାନକାରୀ ଗଣନା ଏବଂ free/no-auth ମେଟାଡାଟା ଚାଲିବା ସମୟ ରେଜିଷ୍ଟ୍ରିରୁ ସୋର୍ସ କରାଯାଏ।

### `list-capabilities` ଦକ୍ଷତା ବିବରଣୀ।

`list-capabilities` ill ଶଳ ବାହ୍ୟ ଏଜେଣ୍ଟମାନଙ୍କ ପାଇଁ ବିଶେଷ ଉପଯୋଗୀ ଅଟେ ଯାହାକି API କଲ୍ ପଠାଇବା ପୂର୍ବରୁ OmniRoute କ’ଣ ପ୍ରକାଶ କରେ ତାହା ଆବିଷ୍କାର କରିବା ଆବଶ୍ୟକ। ଏହା ଏକ ସଂରକ୍ଷିତ ମାର୍କଡାଉନ୍ ଟେବୁଲ୍ କଳାକୃତି ଫେରସ୍ତ କରେ:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

ପ୍ରତ୍ୟେକ ଧାଡିରେ `rawUrl` ସ୍ତମ୍ଭ ଅନ୍ତର୍ଭୂକ୍ତ ହୋଇଛି ତେଣୁ ଏଜେଣ୍ଟମାନେ ତୁରନ୍ତ ସମ୍ପୂର୍ଣ୍ଣ SKILL.md ଆଣିପାରିବେ। `metadata.totalSkills` ଫିଲ୍ଡ କାଟାଲଗ୍ ଆକାରକୁ ପ୍ରତିଫଳିତ କରେ (ଆଜି 45)। କାର୍ଯ୍ୟାନ୍ୱୟନ: `src/lib/a2a/skills/listCapabilities.ts`[AGENT-SKILLS.md](./AGENT-SKILLS.md) ମଧ୍ୟ ଦେଖନ୍ତୁ।

---

## REST API (ସହାୟକକାରୀ)

JSON-RPC ଶେଷ ପଏଣ୍ଟ `/a2a` ହେଉଛି କାନୋନିକାଲ୍ A2A ପ୍ରବେଶ ବିନ୍ଦୁ। ନିମ୍ନରେ ଥିବା REST ଶେଷ ପଏଣ୍ଟଗୁଡ଼ିକ ଡ୍ୟାସବୋର୍ଡ ଏବଂ ବାହ୍ୟ ସାଧନ ପାଇଁ ସହାୟକ ଆକ୍ସେସ୍ ପ୍ରଦାନ କରେ:

| ଶେଷ ପଏଣ୍ଟ।                   | ପଦ୍ଧତି | ବର୍ଣ୍ଣନା                                | Auth                                                                                        |
| :--------------------------- | :----- | :-------------------------------------- | :------------------------------------------------------------------------------------------ |
| `/api/a2a/status`            | GET    | ସର୍ଭର ସ୍ଥିତି, ପଞ୍ଜୀକୃତ କ skills ଶଳ।     | (ଜନସାଧାରଣ)                                                                                  |
| `/api/a2a/tasks`             | GET    | ଫିଲ୍ଟର୍ ସହିତ କାର୍ଯ୍ୟ ତାଲିକା କର।         | ପରିଚାଳନା କିମ୍ବା API କି (ନିମ୍ନରେ ଦେଖନ୍ତୁ)                                                    |
| `/api/a2a/tasks/[id]`        | GET    | ID ଦ୍ୱାରା ଟାସ୍କ ପାଆନ୍ତୁ।                | ପରିଚାଳନା କିମ୍ବା API କି (ନିମ୍ନରେ ଦେଖନ୍ତୁ)                                                    |
| `/api/a2a/tasks/[id]/cancel` | POST   | ଚାଲିବା କାର୍ଯ୍ୟ ବାତିଲ କରନ୍ତୁ।            | ପରିଚାଳନା କିମ୍ବା API କି (ନିମ୍ନରେ ଦେଖନ୍ତୁ)                                                    |
| `/.well-known/agent.json`    | GET    | ଏଜେଣ୍ଟ କାର୍ଡ (A2A ଆବିଷ୍କାର)             | (ଜନସାଧାରଣ, 3600s କ୍ୟାଚ୍)                                                                    |
| `/api/a2a/tasks`             | POST   | OmniConductor ଜାହାଜକୁ କଣ୍ଡକ୍ଟର PRD RF5) | `GET` ସହିତ ସମାନ, `OMNIROUTE_API_KEY` ବନ୍ଦ ହେଲେ `REQUIRE_API_KEY` ଯଦି ସେଟ୍ ହୁଏ; `a2aEnabled` |

`/api/a2a/tasks*` ରୁଟକୁ କିଏ ପ୍ରବେଶ କରେ ଲଗଇନ୍ ଏବଂ API- କି ସେଟିଙ୍ଗ ଉପରେ ନିର୍ଭର କରେ:

- `requireLogin=true` (ଡିଫଲ୍ଟ): ମଧ୍ୟମ ସଫ୍ଟୱେର୍ କେବଳ ପରିଚାଳନା ପ୍ରମାଣପତ୍ର (ଡ୍ୟାସବୋର୍ଡ ଅଧିବେଶନ, `manage` -scope API କି, `oma_` ପ୍ରବେଶ ଟୋକେନ୍) ଏବଂ `OMNIROUTE_API_KEY` ସ୍ୱୀକାର କରେ। ଏକ ସାଦା ଇନଫେରେନ୍ସ କୀ `403` ପାଇଥାଏ। `Authorization` ହେଡର୍ ରେ ମଧ୍ୟମ ସଫ୍ଟୱେର୍ କେବଳ `OMNIROUTE_API_KEY` `Bearer <key>` ଭାବରେ ନେଇଥାଏ। `Bearer` ପାଇବା ପରେ ଏକ ଖାଲି ଚାବି କିମ୍ବା ଏକ ଟ୍ୟାବ୍ `401`
- `requireLogin=false`, କିମ୍ବା ଅନ୍ବୋର୍ଡିଂ ପୂର୍ବରୁ ଲୁପ୍ ବ୍ୟାକ୍ ୱିଣ୍ଡୋ: `REQUIRE_API_KEY=true` ସହିତ ଯେକ valid ଣସି ବ valid OmniRoute API କି କିମ୍ବା ପରିଚାଳନା ପ୍ରମାଣପତ୍ର ଗ୍ରହଣ କରାଯାଏ ଏବଂ ଅଜ୍ onymous ାତ କଲର୍ମାନେ `401` ପାଆନ୍ତି; `REQUIRE_API_KEY` ସହିତ ରୁଟଗୁଡିକ ଖୋଲା ଅଛି।
- `POST /api/a2a/tasks` ଅତିରିକ୍ତ ଭାବରେ `Authorization` ହେଡର୍ ରେ `OMNIROUTE_API_KEY` ଆବଶ୍ୟକ କରେ ଯେତେବେଳେ ସେହି ଭେରିଏବଲ୍ ସେଟ୍ ହୋଇଯାଏ ଏବଂ `REQUIRE_API_KEY` ବନ୍ଦ ଥାଏ। ଅନ୍ୟାନ୍ୟ ହେଡର୍, ଯେପରିକି `x-api-key`, ସେଠାରେ ଗଣନା କରନ୍ତି ନାହିଁ। ଲଗଇନ୍ ଅଫ୍ କିମ୍ବା ଅନ୍ବୋର୍ଡିଂ ପୂର୍ବରୁ ଚାବି `Bearer` ଉପସର୍ଗ ସହିତ କିମ୍ବା ବିନା ପାସ୍ କରେ। ଲଗଇନ୍ ସହିତ, କେବଳ `Bearer <key>` ମଧ୍ୟମ ସଫ୍ଟୱେର୍ ଅତିକ୍ରମ କରେ।

ଯେଉଁଠାରେ ଏକ ପ୍ରମାଣପତ୍ର ଆବଶ୍ୟକ, ଏକ `read` -scope `oma_` ଟୋକନ୍ କେବଳ `GET` ପାଇଁ କାମ କରେ।

**ଇନବାଉଣ୍ଡ କଣ୍ଡକ୍ଟର ପ୍ରତିନିଧୀ (`POST /api/a2a/tasks`):** ବାହ୍ୟ A2A ଏଜେଣ୍ଟଗୁଡିକ OmniRoute ମାଧ୍ୟମରେ OmniConductor ଜାହାଜରେ କୋଡିଂ କାର୍ଯ୍ୟକୁ ପ୍ରତିନିଧିତ୍ୱ କରନ୍ତି। ଶରୀର: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — କେବଳ କଣ୍ଡକ୍ଟର ଫ୍ଲାଟ କ skills ଶଳ (ଏଜେଣ୍ଟ କାର୍ଡରେ ଘୋଷିତ) ପ୍ରତିନିଧୀ; `metadata.conductor.repo.url` ଆବଶ୍ୟକ (ଜାହାଜ git ରେପୋରେ କାମ କରେ)। ମାର୍ଗଟି ସର୍ଭର-ସାଇଡ୍ `CONDUCTOR_ORCHESTRATOR_TOKEN` (ଫଲବ୍ୟାକ୍ `CONDUCTOR_HUB_TOKEN`) ବ୍ୟବହାର କରି ହବ୍ ର `POST /v1/tasks` କୁ ଅନୁବାଦ କରେ ଏବଂ `201 { conductor_task_id, state: "submitted" }` ଫେରସ୍ତ କରେ। ଟାସ୍କ ଅବସ୍ଥା SSE→A2A ଦର୍ପଣ (RF1) ଦେଇ ଫେରିଥାଏ ଏବଂ `GET /api/a2a/tasks?skill=conductor` ମାଧ୍ୟମରେ ଦୃଶ୍ୟମାନ ହୁଏ।

---

## ଏକ ନୂତନ ଦକ୍ଷତା ଯୋଗ କରିବା।

1. **ସ୍କିଲ୍ ଫାଇଲ୍ ସୃଷ୍ଟି କରନ୍ତୁ:** `src/lib/a2a/skills/<your-skill>.ts`

   ଏକ async ଫଙ୍କସନ୍ `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>` ରପ୍ତାନି କରନ୍ତୁ। `smartRouting.ts` ପରି ବିଦ୍ୟମାନ କ skills ଶଳର ଆକୃତି ଅନୁସରଣ କରନ୍ତୁ। ଯଦି କ z ଶଳ HTTP ଉପରେ OmniRoute କୁ ପୁନର୍ବାର କଲ୍ କରେ, `src/lib/a2a/selfLoopAuth.ts` ରୁ `buildSelfLoopHeaders(caller)` ସହିତ ହେଡର୍ ଗଠନ କର ତେଣୁ କଲ A2A କଲର ଚାବି ସହିତ ଚାଲିବ, `OMNIROUTE_API_KEY` ନୁହେଁ, ଏବଂ `redirect: "error"` କୁ `fetch` କୁ ପଠାଇବ ତେଣୁ ପୁନ ir ନିର୍ଦ୍ଦେଶ କେବେବି ଚାବି ପାଇବ ନାହିଁ। ସହାୟକ କେବଳ ହେଡର୍ ଗଠନ କରେ; ପ୍ରତ୍ୟେକ ଦକ୍ଷତା ପୁନ red ନିର୍ଦ୍ଦେଶ ନୀତି ସ୍ଥିର କରେ। ଏହା ଏକ ଚାବି ସଂଲଗ୍ନ କରିବା ପରିବର୍ତ୍ତେ `UnsafeSelfLoopTargetError` ଫୋପାଡିଥାଏ ଯେତେବେଳେ ସମାଧାନ ହୋଇଥିବା ଆଧାର URL ବ୍ୟକ୍ତିଗତ ନେଟୱାର୍କ ବାହାରେ ସାଦା http (ଲୁପବ୍ୟାକ୍, ଏକ ପାତ୍ର କିମ୍ବା ସେବା ନାମ, ଏବଂ ବ୍ୟକ୍ତିଗତ ଠିକଣା ଠିକ ଅଛି) କିମ୍ବା ପ୍ରମାଣପତ୍ର ଧାରଣ କରିଥାଏ, ତେଣୁ ପ୍ରତ୍ୟାଖ୍ୟାନ କଲକୁ ଗ୍ରାସ କରୁଥିବା ଏକ ଦକ୍ଷତା ସେହି ତ୍ରୁଟିକୁ ପୁନ r ଥ୍ରୋ କରିବା ଆବଶ୍ୟକ।

2. **ପଞ୍ଜିକରଣ ନିୟନ୍ତ୍ରକ:** `src/lib/a2a/taskExecution.ts` ରେ, `A2A_SKILL_HANDLERS` ରେ ଏକ ଏଣ୍ଟ୍ରି ଯୋଡନ୍ତୁ:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **ଏଜେଣ୍ଟ କାର୍ଡରେ ପ୍ରକାଶ କରନ୍ତୁ:** `src/lib/a2a/agentCardMetadata.ts` ରେ ( `/.well-known/agent.json` ଏବଂ `/.well-known/agent-card.json` ଦ୍ୱାରା ଅଂଶୀଦାର), `skills` ଆରେ ସହିତ ଯୋଡନ୍ତୁ:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **ପରୀକ୍ଷା ଲେଖ:** `tests/unit/a2a-<your-skill>.test.ts` ଖୁସି ପଥ + ତ୍ରୁଟି ପଥକୁ ଆଚ୍ଛାଦନ କରନ୍ତୁ।

5. **ଡକ୍ୟୁମେଣ୍ଟ୍** ଏହି ଫାଇଲ୍ ର `Available Skills` ସାରଣୀରେ ନୂତନ କ ill ଶଳ।

---

## କାର୍ଯ୍ୟ TTL

କାର୍ଯ୍ୟଗୁଡ଼ିକ `ttlMinutes` ପରେ (ଡିଫଲ୍ଟ ଭାବେ 5 ମିନିଟ୍) ମିଆଦ ଶେଷ ହୁଏ — ଏହା `src/lib/a2a/taskManager.ts:82` ରେ ଥିବା `A2ATaskManager` କନ୍ଷ୍ଟ୍ରକ୍ଟର୍ରେ ବିନ୍ୟାସ କରାଯାଇଛି। କଷ୍ଟମାଇଜ୍ କରିବା ପାଇଁ, `A2ATaskManager` ଇନ୍ଷ୍ଟାନ୍ସିଏସନ୍କୁ ଫୋର୍କ କରନ୍ତୁ ଏବଂ ଏକ ଭିନ୍ନ ମୂଲ୍ୟ ପାସ୍ କରନ୍ତୁ (ଯଥା, 15-ମିନିଟ୍ TTL ପାଇଁ `new A2ATaskManager(15)`)। ଏକ ପୃଷ୍ଠଭୂମି ଇଣ୍ଟରଭାଲ୍ ପ୍ରତି 60 ସେକେଣ୍ଡରେ ମିଆଦ ଶେଷ ହୋଇଥିବା କାର୍ଯ୍ୟଗୁଡ଼ିକୁ ସଫା କରେ।

---

## କାର୍ଯ୍ୟ ଜୀବନଚକ୍ର

```
ଦାଖଲ ହୋଇଛି → କାର୍ଯ୍ୟରତ → ସମ୍ପୂର୍ଣ୍ଣ
                         → ବିଫଳ
                         → ବାତିଲ
```

- କାର୍ଯ୍ୟଗୁଡ଼ିକ ଡିଫଲ୍ଟ ଭାବେ 5 ମିନିଟ୍ ପରେ ମିଆଦ ଶେଷ ହୁଏ ([କାର୍ଯ୍ୟ TTL](#task-ttl) ଦେଖନ୍ତୁ)
- ଅନ୍ତିମ ଅବସ୍ଥାଗୁଡ଼ିକ: `completed`, `failed`, `cancelled`
- ଇଭେଣ୍ଟ ଲଗ୍ ପ୍ରତ୍ୟେକ ଅବସ୍ଥା ପରିବର୍ତ୍ତନକୁ ଟ୍ରାକ୍ କରେ

---

## ତ୍ରୁଟି କୋଡ୍ଗୁଡ଼ିକ

| କୋଡ୍   | ଅର୍ଥ                            |
| :----- | :------------------------------ |
| -32700 | ପାର୍ସ ତ୍ରୁଟି (ଅବୈଧ JSON)        |
| -32600 | ଅବୈଧ ଅନୁରୋଧ / ଅନଧିକୃତ           |
| -32601 | ପଦ୍ଧତି କିମ୍ବା କୌଶଳ ମିଳିଲା ନାହିଁ |
| -32602 | ଅବୈଧ ପାରାମିଟର୍ଗୁଡ଼ିକ            |
| -32603 | ଆଭ୍ୟନ୍ତରୀଣ ତ୍ରୁଟି               |
| -32000 | A2A ଏଣ୍ଡପଏଣ୍ଟ ଅକ୍ଷମ ଅଛି         |

---

## ଏକୀକରଣ ଉଦାହରଣ।

### ପାଇଥନ୍ (ଅନୁରୋଧ)

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

### TypeScript (ଆଣ)

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
