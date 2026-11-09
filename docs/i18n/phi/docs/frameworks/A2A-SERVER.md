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

Para sa `smart-routing`, ang `metadata.combo` ay isang tahasang pag-override sa
`metadata.model` para sa kahilingan sa gateway; ipinapadala ito bilang tunay na `model`,
hindi bilang isang binabalewalang `x-combo` JSON field. Nalalapat pa rin ang karaniwang API-key at
awtorisasyon ng gateway para sa bawat target. Tinatanggihan ang isang hindi wasto o walang-lamang combo.

Inilalantad ng resulta ang `requested_combo` (layunin ng tumatawag), `dispatched_model`
(ang aktuwal na kahilingan sa gateway), `response_model` (tugon ng gateway), at
`confirmed_combo`. Ang huling field ay `null` maliban kung tahasang
tinutukoy ng gateway ang isang combo. Iniuugnay lamang ng mga log ng desisyon ng A2A ang pagpapatupad sa isang
nakumpirmang combo, habang pinananatili ang isang hindi nakumpirmang kahilingan bilang `requestedCombo`.

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

### `message/stream` — Pag-stream gamit ang SSE

Kapareho ng `message/send` ngunit nagbabalik ng mga Server-Sent Event para sa real-time na pag-stream.

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

**Mga Event ng SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Alamin ang Katayuan ng Gawain

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

## Magagamit na Kasanayan

Inilalantad OmniRoute ang 6 na kasanayan A2A na naka-wire sa `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Ang bawat module ng kasanayan ay nakatira sa `src/lib/a2a/skills/`.

| Kasanayan                 | ID                   | Paglalarawan                                                                                                                                                    | Mga tag                        | Mga halimbawa                                                       |
| :------------------------ | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------- | :------------------------------------------------------------------ |
| Smart Routing             | `smart-routing`      | Nagruruta ng prompt sa pinakamainam provider/combo gamit ang combo engine + scoring ng OmniRoute                                                                | pagruruta, mga provider        | "Iruta ang prompt na ito sa pamamagitan ng pinakamahusay na modelo" |
| Pamamahala ng Quota       | `quota-management`   | Ang mga ulat sa estado ng quota ng bawat provider, ay tumutulong sa mga tumatawag na magpasya kung kailan mag throttle/switch                                   | quota, mga provider            | "Suriin ang quota para sa anthropic"                                |
| Pagtuklas ng Provider     | `provider-discovery` | Naglilista ng mga naka-install na provider na may mga kakayahan, free-tier na mga flag, OAuth status                                                            | provider, pagtuklas            | "Anong mga provider ang available?"                                 |
| Pagsusuri ng Gastos       | `cost-analysis`      | Tinatantya ang halaga ng isang request/conversation na ibinigay sa catalog + kamakailang paggamit                                                               | gastos, paggamit               | "Tantyahin ang gastos para sa pag-uusap na ito"                     |
| Ulat sa Kalusugan         | `health-report`      | Pinagsasama-sama ang circuit breaker, cooldown, estado ng lockout bawat provider                                                                                | kalusugan, katatagan           | "Ipakita ang katayuan sa kalusugan ng lahat ng provider"            |
| Listahan ng mga Kakayahan | `list-capabilities`  | Ibinabalik ang buong 45-entry na katalogo ng Agent Skills (23 API + 21 CLI + 1 config) bilang markdown table na may raw SKILL.md URLs para sa context injection | katalogo, pagtuklas, kasanayan | "Ilista ang lahat ng kakayahan OmniRoute "                          |

> Ang Agent Card ay dapat panatilihing nakahanay sa live na 382-provider catalog; Ang mga bilang ng provider at free/no-auth metadata ay mula sa runtime registry.

### `list-capabilities` Detalye ng Kasanayan

Ang kasanayan `list-capabilities` ay partikular na kapaki-pakinabang para sa mga panlabas na ahente na kailangang matuklasan kung ano ang inilalantad ng OmniRoute bago magpadala ng mga tawag API. Nagbabalik ito ng structured markdown table artifact:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Kasama sa bawat row ang column `rawUrl` para makuha agad ng mga ahente ang buong SKILL.md. Sinasalamin ng field `metadata.totalSkills` ang laki ng catalog (45 ngayon). Pagpapatupad: `src/lib/a2a/skills/listCapabilities.ts`. Tingnan din [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (pantulong)

Ang JSON-RPC endpoint `/a2a` ay ang canonical A2A entry point. Ang mga REST endpoint sa ibaba ay nagbibigay ng pantulong na pag-access para sa mga dashboard at panlabas na tooling:

| Endpoint                     | Pamamaraan | Paglalarawan                                                     | Awth                                                                                                           |
| :--------------------------- | :--------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET        | Katayuan ng server, mga nakarehistrong kasanayan                 | (pampubliko)                                                                                                   |
| `/api/a2a/tasks`             | GET        | Maglista ng mga gawain na may mga filter                         | pamamahala o API key (tingnan sa ibaba)                                                                        |
| `/api/a2a/tasks/[id]`        | GET        | Kumuha ng gawain sa pamamagitan ng ID                            | pamamahala o API key (tingnan sa ibaba)                                                                        |
| `/api/a2a/tasks/[id]/cancel` | POST       | Kanselahin ang pagpapatakbo ng gawain                            | pamamahala o API key (tingnan sa ibaba)                                                                        |
| `/.well-known/agent.json`    | GET        | Card ng Ahente ( pagtuklas ng A2A )                              | (pampubliko, naka-cache na 3600s)                                                                              |
| `/api/a2a/tasks`             | POST       | Papasok na delegasyon sa OmniConductor fleet (Conductor PRD RF5) | katulad ng `GET`, plus `OMNIROUTE_API_KEY` kung nakatakda habang naka-off ang `REQUIRE_API_KEY` ; `a2aEnabled` |

Kung sino ang makakarating sa mga ruta `/api/a2a/tasks*` ay nakasalalay sa mga setting ng pag-login at API-key:

- `requireLogin=true` (default): tinatanggap lang ng middleware ang mga kredensyal sa pamamahala (dashboard session, `manage` -scope API key, `oma_` access token) at `OMNIROUTE_API_KEY`. Ang isang simpleng inference key ay nakakakuha ng `403`. Sa `Authorization` header ang middleware ay kumukuha lamang `OMNIROUTE_API_KEY` bilang `Bearer <key>`; isang hubad na key o isang tab pagkatapos `Bearer` ay makakakuha ng `401`.
- `requireLogin=false`, o ang loopback na window bago mag-onboard: sa `REQUIRE_API_KEY=true` ang anumang wastong OmniRoute API key o kredensyal sa pamamahala ay tinatanggap at ang mga hindi kilalang tumatawag ay nakakakuha `401`; may `REQUIRE_API_KEY` off ang mga ruta ay bukas.
- `POST /api/a2a/tasks` ay nangangailangan din ng `OMNIROUTE_API_KEY` sa `Authorization` header kapag nakatakda ang variable na iyon at naka-off `REQUIRE_API_KEY`. Ang ibang mga header, gaya ng `x-api-key`, ay hindi binibilang doon. Kapag naka-off ang pag-log in o bago mag-onboard, pumasa ang key na mayroon o walang prefix `Bearer` ; kapag naka-on ang pag-login, ang `Bearer <key>` lang ang makakalagpas sa middleware.

Kung saan kinakailangan ang kredensyal, gagana lang ang `read` -scope `oma_` token para sa `GET`.

**Delegasyon ng Inbound Conductor (`POST /api/a2a/tasks`):** itinalaga ng mga panlabas na ahente A2A ang coding work sa OmniConductor fleet sa pamamagitan ng OmniRoute. Katawan: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — lamang ang mga kasanayan sa fleet ng konduktor (ang mga inihayag sa Agent Card) ay delegado; `metadata.conductor.repo.url` ay kinakailangan (ang fleet ay gumagana sa git repos). Ang ruta ay isinasalin sa `POST /v1/tasks` ng hub gamit ang server-side `CONDUCTOR_ORCHESTRATOR_TOKEN` (fallback `CONDUCTOR_HUB_TOKEN`) at nagbabalik `201 { conductor_task_id, state: "submitted" }`; Ang mga estado ng gawain ay dumadaloy pabalik sa pamamagitan ng SSE→A2A mirror (RF1) at makikita sa pamamagitan ng `GET /api/a2a/tasks?skill=conductor`.

---

## Pagdaragdag ng Bagong Kasanayan

1. **Gumawa ng skill file:** `src/lib/a2a/skills/<your-skill>.ts`

   Mag-export ng async function `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Sundin ang hugis ng mga umiiral na kasanayan tulad ng `smartRouting.ts`. Kung ang kasanayan ay tumatawag pabalik sa OmniRoute sa ibabaw ng HTTP, buuin ang mga header na may `buildSelfLoopHeaders(caller)` mula sa `src/lib/a2a/selfLoopAuth.ts` para tumakbo ang tawag gamit ang A2A na susi ng tumatawag, hindi `OMNIROUTE_API_KEY`, at ipasa `redirect: "error"` sa `fetch` upang ang isang pag-redirect ay hindi kailanman makakakuha ng susi. Ang katulong ay gumagawa lamang ng mga header; itinatakda ng bawat kasanayan ang mismong patakaran sa pag-redirect. Inihagis nito `UnsafeSelfLoopTargetError` sa halip na mag-attach ng key kapag ang naresolbang base URL ay plain http sa labas ng pribadong network (loopback, isang container o pangalan ng serbisyo, at ang mga pribadong address ay maayos) o may hawak na mga kredensyal, kaya ang isang kasanayang lumulunok sa mga tinanggihang tawag ay dapat ibalik ang error na iyon.

2. **Register handler:** sa `src/lib/a2a/taskExecution.ts`, magdagdag ng entry sa `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Expose sa Agent Card:** sa `src/lib/a2a/agentCardMetadata.ts` (ibinahagi ng `/.well-known/agent.json` at `/.well-known/agent-card.json`), idagdag sa `skills` array:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Sumulat ng mga pagsubok:** `tests/unit/a2a-<your-skill>.test.ts`. Takpan ang happy path + error path.

5. **Dokumento** ang bagong kasanayan sa `Available Skills` table ng file na ito.

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

## Mga Halimbawa ng Pagsasama

### Python (mga kahilingan)

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

### TypeScript (kunin)

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
