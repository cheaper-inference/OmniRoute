# OmniRoute A2A Server Documentation (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute dịka onye nnọchi anya nwere ọgụgụ isi maka ịhọrọ ụzọ

Ụdị njikọ A2A nwere akụkụ abụọ:

- **JSON-RPC 2.0** na `POST /a2a` (ebe ntinye izizi, nke akọwapụtara na `src/app/a2a/route.ts`).
- **REST** n'okpuru `/api/a2a/*` maka dashboard na ngwa ọrụ (ọnọdụ, ndepụta ọrụ, ịkagbu).

A na-eji `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL ndabara nke nkeji 5) esochi ọrụ. A na-ezigara nka ndị njikwa kwesịrị ekwesị site na `A2A_SKILL_HANDLERS` dị na `src/lib/a2a/taskExecution.ts`.

## Ịchọpụta Onye Nnọchi Anya

```bash
curl http://localhost:20128/.well-known/agent.json
```

Ọ na-eweghachi Kaadị Onye Nnọchi Anya nke na-akọwa ikike, nka, na ihe nyocha njirimara OmniRoute chọrọ.

A na-enweta mpaghara `version` nke Kaadị Onye Nnọchi Anya site na `process.env.npm_package_version` (lee `src/app/.well-known/agent.json/route.ts:13`), ya mere ọ na-emekọrịta onwe ya na `package.json` mgbe ọ bụla e wepụtara ụdị ọhụrụ.

---

## Nnyocha Njirimara

Arịrịọ `/a2a` niile chọrọ igodo API site na nkụnyeisi `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Ọ bụrụ na ahazighị igodo API ọ bụla na sava ahụ, a ga-agafe nyocha njirimara.

## Ịgbalite

A na-achịkwa A2A site na mgba ọkụ **Endpoints → A2A**, ma agbanyụrụ ya na ndabara. Mgbe agbanyụrụ ya,
`GET /api/a2a/status` na-akọ `status: "disabled"` na `online: false`; oku JSON-RPC gaa na
`POST /a2a` na-eweghachi HTTP 503 tinyere koodu njehie JSON-RPC `-32000`.

---

## Usoro JSON-RPC 2.0

### `message/send` — Mmezu Mekọrịta Ozugbo

Na-eziga ozi na nka ma chere maka nzaghachi zuru ezu.

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

Maka `smart-routing`, `metadata.combo` bụ mgbanwe doro anya nke na-akagbu
`metadata.model` maka arịrịọ gateway ahụ; a na-eziga ya dịka ezigbo `model`,
ọ bụghị dịka oghere JSON `x-combo` nke a na-eleghara anya. Igodo API nkịtị nke gateway na
ikike nnweta maka ebe ọ bụla ka na-emetụta. A na-ajụ combo na-adịghị irè ma ọ bụ nke tọgbọ chakoo.

Nsonaazụ ahụ na-egosi `requested_combo` (ebumnuche onye kpọrọ ya), `dispatched_model`
(ezigbo arịrịọ gateway), `response_model` (nzaghachi gateway) na
`confirmed_combo`. Oghere ikpeazụ ahụ ga-abụ `null` ma ọ bụrụ na gateway akọwaghị
combo kpọmkwem. Ndekọ mkpebi A2A na-ejikọta mmezu naanị na
combo akwadoro, ma na-edobe arịrịọ a na-akwadoghị dịka `requestedCombo`.

**Nzaghachi:**

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

### `message/stream` — Nkwanye SSE Na-aga n'Ihu

Ọ bụ otu ihe ahụ dịka `message/send`, mana ọ na-eweghachi Server-Sent Events maka nkwanye ozugbo.

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

**Ihe Omume SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Nyochaa Ọnọdụ Ọrụ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Kagbuo Ọrụ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Ọrụ Ndị Dị Ugbu A

OmniRoute na-ekpughe ọrụ A2A 6 ndị e jikọrọ na `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Modul ọrụ ọ bụla bi na `src/lib/a2a/skills/`.

| Ọrụ                | ID                   | Nkọwa                                                                                                                                                             | Mkpado                     | Ọmụmaatụ                                 |
| :----------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :--------------------------------------- |
| Smart Routing      | `smart-routing`      | Na-ebufe prompt site na provider/combo kacha mma site na iji combo engine nke OmniRoute + scoring                                                                 | routing, providers         | "Bufee prompt a site na model kacha mma" |
| Quota Management   | `quota-management`   | Na-akọ ọnọdụ quota nke provider ọ bụla, na-enyere ndị na-akpọ aka ịkpebi mgbe ha ga-achịkwa ọsọ/gbanwee                                                           | quota, providers           | "Lelee quota maka anthropic"             |
| Provider Discovery | `provider-discovery` | Na-edepụta providers arụnyere na ikike ha, flags free-tier, ọnọdụ OAuth                                                                                           | providers, discovery       | "Kedu providers ndị dị?"                 |
| Cost Analysis      | `cost-analysis`      | Na-atụle ọnụ ego nke request/mkparịta ụka site na catalog + ojiji nke na-adịbeghị anya                                                                            | cost, usage                | "Tụlee ọnụ ego maka mkparịta ụka a"      |
| Health Report      | `health-report`      | Na-akọkọta ọnọdụ circuit breaker, cooldown, na lockout nke provider ọ bụla                                                                                        | health, resilience         | "Gosi ọnọdụ ahụ ike nke providers niile" |
| List Capabilities  | `list-capabilities`  | Na-alọghachi catalog Agent Skills zuru ezu nke ihe ndenye 45 (23 API + 21 CLI + 1 config) dị ka tebulu markdown nwere URL SKILL.md gburugburu maka ịtinye context | catalog, discovery, skills | "Depụta ikike OmniRoute niile"           |

> A ga-edebe Agent Card ka ọ kwekọrọ na catalog ndị provider 376 dị ugbu a; a na-enweta ọnụ ọgụgụ provider na metadata free/no-auth site na registry oge ọrụ.

### Nkọwa Zuru Ezu nke Ọrụ `list-capabilities`

Ọrụ `list-capabilities` bara nnukwu uru maka ndị agent mpụga chọrọ ịchọpụta ihe OmniRoute na-ekpughe tupu ha iziga API calls. Ọ na-alọghachi artifact tebulu markdown haziri ahazi:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Ahịrị ọ bụla gụnyere kọlụm `rawUrl` ka ndị agent wee nwee ike ibudata SKILL.md zuru ezu ozugbo. Ubi `metadata.totalSkills` na-egosipụta nha catalog (45 taa). Nhọpụta: `src/lib/a2a/skills/listCapabilities.ts`. Lee kwa [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (ihe enyemaka)

Ebe njedebe JSON-RPC `/a2a` bụ ebe ntinye A2A izizi. Ebe njedebe REST ndị dị n'okpuru na-enye ohere enyemaka maka dashboard na ngwa mpụga:

| Ebe njedebe                  | Usoro | Nkọwa                                                       | Nkwenye                                          |
| :--------------------------- | :---- | :---------------------------------------------------------- | :----------------------------------------------- |
| `/api/a2a/status`            | GET   | Ọnọdụ sava, nkà ndị edebanyere aha                          | (ọha)                                            |
| `/api/a2a/tasks`             | GET   | Depụta ọrụ site na nzacha                                   | njikwa                                           |
| `/api/a2a/tasks/[id]`        | GET   | Nweta ọrụ site na ID                                        | njikwa                                           |
| `/api/a2a/tasks/[id]/cancel` | POST  | Kagbuo ọrụ na-aga n'ihu                                     | njikwa                                           |
| `/.well-known/agent.json`    | GET   | Kaadị Agent (nchọpụta A2A)                                  | (ọha, echekwara 3600s)                           |
| `/api/a2a/tasks`             | POST  | Nnyefe ọrụ mbata nye ìgwè OmniConductor (Conductor PRD RF5) | Bearer megide `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Nnyefe ọrụ Conductor mbata (`POST /api/a2a/tasks`):** ndị agent A2A mpụga na-enyefe ọrụ ide koodu nye ìgwè OmniConductor site na OmniRoute. Ahụ: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — naanị nkà nke ìgwè Conductor (ndị ekwuputara na Kaadị Agent) ka enwere ike inyefe ọrụ; `metadata.conductor.repo.url` dị mkpa (ìgwè ahụ na-arụ ọrụ na repo git). Ụzọ ahụ na-atụgharị gaa na `POST /v1/tasks` nke hub site n'iji `CONDUCTOR_ORCHESTRATOR_TOKEN` dị n'akụkụ sava (ọ bụrụ na nke ahụ adịghị, `CONDUCTOR_HUB_TOKEN`) ma weghachite `201 { conductor_task_id, state: "submitted" }`; ọnọdụ ọrụ na-alaghachi site na enyo SSE→A2A (RF1), a pụkwara ịhụ ha site na `GET /api/a2a/tasks?skill=conductor`.

---

## Ịgbakwunye Nkà Ọhụrụ

1. **Mepụta faịlụ nkà:** `src/lib/a2a/skills/<your-skill>.ts`

   Bupụ function async `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Soro nhazi nke nkà ndị dị ugbu a dịka `smartRouting.ts`.

2. **Debanye handler aha:** n'ime `src/lib/a2a/taskExecution.ts`, tinye ntinye na `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...nkà ndị dị ugbu a
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Gosipụta ya na Kaadị Agent:** n'ime `src/app/.well-known/agent.json/route.ts`, gbakwunye na njedebe array `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Nkà Gị",
     "description": "Nkọwa dị nkenke nke lekwasịrị anya na ebumnuche",
     "tags": ["routing", "quota"],
     "examples": ["Ihe atụ nke ịkpọ ya n'asụsụ mmadụ"]
   }
   ```

4. **Dee ule:** `tests/unit/a2a-<your-skill>.test.ts`. Kpuchie ụzọ ihe si aga nke ọma + ụzọ njehie.

5. **Detuo nkọwa** nke nkà ọhụrụ ahụ na tebụl `Available Skills` nke faịlụ a.

---

## TTL nke Ọrụ

Ọrụ na-ekubi ume mgbe `ttlMinutes` gachara (ndabara bụ nkeji 5) — a na-ahazi nke a n'ime constructor `A2ATaskManager` dị na `src/lib/a2a/taskManager.ts:82`. Iji hazie ya dịka ịchọrọ, mee fork nke instantiation `A2ATaskManager` ma nyefee uru ọzọ (dịka ọmụmaatụ, `new A2ATaskManager(15)` maka TTL nke nkeji 15). Interval na-arụ ọrụ n'azụ na-ekpochapụ ọrụ ndị kubiela ume kwa sekọnd 60.

---

## Usoro Ndụ Ọrụ

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Ọrụ na-ekubi ume mgbe nkeji 5 gachara na ndabara (lee [TTL nke Ọrụ](#task-ttl))
- Ọnọdụ ikpeazụ: `completed`, `failed`, `cancelled`
- Ndekọ ihe omume na-edekọ mgbanwe ọnọdụ ọ bụla

---

## Koodu Njehie

| Koodu  | Ihe ọ pụtara                         |
| :----- | :----------------------------------- |
| -32700 | Njehie parsing (JSON na-adịghị irè)  |
| -32600 | Arịrịọ na-adịghị irè / Enweghị ikike |
| -32601 | Ahụghị method ma ọ bụ skill          |
| -32602 | Params na-adịghị irè                 |
| -32603 | Njehie dị n'ime                      |
| -32000 | Agbanyụrụ endpoint A2A               |

---

## Ọmụmaatụ Njikọ

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
