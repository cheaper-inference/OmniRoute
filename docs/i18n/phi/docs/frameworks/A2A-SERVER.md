# OmniRoute A2A Server Documentation (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute bilang isang matalinong ahente sa pagruruta

May dalawang anyo ang A2A surface:

- **JSON-RPC 2.0** sa `POST /a2a` (pangunahing entry point, na tinukoy sa `src/app/a2a/route.ts`).
- **REST** sa ilalim ng `/api/a2a/*` para sa mga dashboard at tooling (status, listahan ng gawain, pagkansela).

Sinusubaybayan ang mga gawain ng `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, default na 5 minutong TTL). Ipinapadala ang mga skill sa pamamagitan ng `A2A_SKILL_HANDLERS` sa `src/lib/a2a/taskExecution.ts`.

## Pagtuklas sa Ahente

```bash
curl http://localhost:20128/.well-known/agent.json
```

Ibinabalik nito ang Agent Card na naglalarawan sa mga kakayahan, skill, at kinakailangan sa pagpapatotoo ng OmniRoute.

Ang field na `version` ng Agent Card ay kinukuha mula sa `process.env.npm_package_version` (tingnan ang `src/app/.well-known/agent.json/route.ts:13`), kaya awtomatiko itong nananatiling naka-sync sa `package.json` sa bawat release.

---

## Pagpapatotoo

Nangangailangan ang lahat ng kahilingan sa `/a2a` ng API key sa pamamagitan ng header na `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Kung walang API key na naka-configure sa server, nilalaktawan ang pagpapatotoo.

## Pagpapagana

Kinokontrol ang A2A ng toggle na **Endpoints → A2A** at naka-disable ito bilang default. Kapag naka-disable,
iniuulat ng `GET /api/a2a/status` ang `status: "disabled"` at `online: false`; ang mga JSON-RPC call sa
`POST /a2a` ay nagbabalik ng HTTP 503 na may JSON-RPC error code na `-32000`.

---

## Mga Pamamaraan ng JSON-RPC 2.0

### `message/send` — Sabayang Pagpapatupad

Nagpapadala ng mensahe sa isang skill at naghihintay sa kumpletong tugon.

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

**Tugon:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": {
        "estimated": 0.005,
        "actual": 0.003,
        "currency": "USD"
      },
      "resilience_trace": [
        {
          "event": "primary_selected",
          "provider": "anthropic",
          "timestamp": "..."
        }
      ],
      "policy_verdict": {
        "allowed": true,
        "reason": "within budget and quota limits"
      }
    }
  }
}
```

### `message/stream` — SSE Streaming

Kapareho ito ng `message/send`, ngunit nagbabalik ng Server-Sent Events para sa real-time streaming.

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

**Mga SSE Event:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Suriin ang Status ng Gawain

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Kanselahin ang isang Gawain

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Mga Available na Skill

Nag-eexpose ang OmniRoute ng 6 A2A skill na nakakabit sa `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Ang bawat skill module ay matatagpuan sa `src/lib/a2a/skills/`.

| Skill              | ID                   | Paglalarawan                                                                                                                                                  | Tags                       | Mga Halimbawa                          |
| :----------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------- | :------------------------------------- |
| Smart Routing      | `smart-routing`      | Nagre-route ng prompt sa pamamagitan ng optimal na provider/combo gamit ang combo engine + scoring ng OmniRoute                                               | routing, providers         | "Route this prompt via the best model" |
| Quota Management   | `quota-management`   | Nag-uulat ng quota state ng bawat provider, tumutulong sa mga caller na magpasya kung kailan mag-throttle/mag-switch                                          | quota, providers           | "Check quota for anthropic"            |
| Provider Discovery | `provider-discovery` | Nagli-lista ng mga naka-install na provider kasama ang mga capability, free-tier flag, at OAuth status                                                        | providers, discovery       | "What providers are available?"        |
| Cost Analysis      | `cost-analysis`      | Nag-eestimate ng gastos ng isang request/kombensasyon batay sa catalog + kamakailang usage                                                                    | cost, usage                | "Estimate cost for this conversation"  |
| Health Report      | `health-report`      | Nag-a-aggregate ng circuit breaker, cooldown, at lockout state ng bawat provider                                                                              | health, resilience         | "Show health status of all providers"  |
| List Capabilities  | `list-capabilities`  | Nagbabalik ng buong 45-entry na Agent Skills catalog (23 API + 21 CLI + 1 config) bilang markdown table na may mga raw SKILL.md URL para sa context injection | catalog, discovery, skills | "List all OmniRoute capabilities"      |

> Ang Agent Card ay dapat panatilihing naka-align sa live na 375-provider catalog; ang mga bilang ng provider at free/no-auth metadata ay mula sa runtime registry.

### Detalye ng `list-capabilities` Skill

Ang `list-capabilities` skill ay partikular na kapaki-pakinabang para sa mga external agent na kailangang tuklasin kung ano ang ine-expose ng OmniRoute bago magpadala ng mga API call. Nagbabalik ito ng structured markdown table artifact:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Ang bawat row ay may kasamang `rawUrl` column para agad makuha ng mga agent ang buong SKILL.md. Ang `metadata.totalSkills` field ay sumasalamin sa laki ng catalog (45 sa ngayon). Implementasyon: `src/lib/a2a/skills/listCapabilities.ts`. Tingnan din ang [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (pantulong)

Ang JSON-RPC endpoint na `/a2a` ang kanonikal na A2A entry point. Nagbibigay ang mga REST endpoint sa ibaba ng pantulong na access para sa mga dashboard at panlabas na tooling:

| Endpoint                     | Pamamaraan | Paglalarawan                                                     | Awtorisasyon                                 |
| :--------------------------- | :--------- | :--------------------------------------------------------------- | :------------------------------------------- |
| `/api/a2a/status`            | GET        | Katayuan ng server, mga nakarehistrong skill                     | (pampubliko)                                 |
| `/api/a2a/tasks`             | GET        | Ilista ang mga task gamit ang mga filter                         | pamamahala                                   |
| `/api/a2a/tasks/[id]`        | GET        | Kunin ang task ayon sa ID                                        | pamamahala                                   |
| `/api/a2a/tasks/[id]/cancel` | POST       | Kanselahin ang tumatakbong task                                  | pamamahala                                   |
| `/.well-known/agent.json`    | GET        | Agent Card (A2A discovery)                                       | (pampubliko, naka-cache nang 3600s)          |
| `/api/a2a/tasks`             | POST       | Papasok na delegasyon sa OmniConductor fleet (Conductor PRD RF5) | Bearer vs `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Papasok na delegasyon ng Conductor (`POST /api/a2a/tasks`):** idinedelega ng mga panlabas na A2A agent ang gawaing coding sa OmniConductor fleet sa pamamagitan ng OmniRoute. Body: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — tanging mga skill ng Conductor fleet (ang mga inanunsyo sa Agent Card) ang maaaring delegahan; kinakailangan ang `metadata.conductor.repo.url` (gumagana ang fleet sa mga git repo). Isinasalin ng route ito sa `POST /v1/tasks` ng hub gamit ang server-side na `CONDUCTOR_ORCHESTRATOR_TOKEN` (fallback na `CONDUCTOR_HUB_TOKEN`) at nagbabalik ng `201 { conductor_task_id, state: "submitted" }`; dumadaloy pabalik ang mga katayuan ng task sa pamamagitan ng SSE→A2A mirror (RF1) at makikita ang mga ito sa pamamagitan ng `GET /api/a2a/tasks?skill=conductor`.

---

## Pagdaragdag ng Bagong Skill

1. **Gumawa ng skill file:** `src/lib/a2a/skills/<your-skill>.ts`

   Mag-export ng async function na `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Sundin ang anyo ng mga kasalukuyang skill gaya ng `smartRouting.ts`.

2. **Irehistro ang handler:** sa `src/lib/a2a/taskExecution.ts`, magdagdag ng entry sa `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...mga kasalukuyang skill
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Ilantad sa Agent Card:** sa `src/app/.well-known/agent.json/route.ts`, idagdag sa dulo ng `skills` array:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Sumulat ng mga test:** `tests/unit/a2a-<your-skill>.test.ts`. Saklawin ang matagumpay na path + error path.

5. **Idokumento** ang bagong skill sa talahanayang `Available Skills` ng file na ito.

---

## TTL ng Gawain

Mag-e-expire ang mga gawain pagkalipas ng `ttlMinutes` (default na 5 min) — kino-configure sa constructor ng `A2ATaskManager` sa `src/lib/a2a/taskManager.ts:82`. Para i-customize ito, i-fork ang instantiation ng `A2ATaskManager` at magpasa ng ibang value (hal., `new A2ATaskManager(15)` para sa 15 minutong TTL). Nililinis ng isang background interval ang mga nag-expire na gawain kada 60 segundo.

---

## Lifecycle ng Gawain

```
naisumite → ginagawa → nakumpleto
                     → nabigo
                     → kinansela
```

- Nag-e-expire ang mga gawain pagkalipas ng 5 minuto bilang default (tingnan ang [TTL ng Gawain](#task-ttl))
- Mga terminal state: `completed`, `failed`, `cancelled`
- Itinatala ng event log ang bawat transition ng state

---

## Mga Error Code

| Code   | Kahulugan                             |
| :----- | :------------------------------------ |
| -32700 | Error sa pag-parse (invalid na JSON)  |
| -32600 | Invalid na request / Hindi awtorisado |
| -32601 | Hindi nahanap ang method o skill      |
| -32602 | Invalid na mga parameter              |
| -32603 | Internal na error                     |
| -32000 | Naka-disable ang A2A endpoint         |

---

## Mga Halimbawa ng Integrasyon

### Python (requests)

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

### TypeScript (fetch)

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
