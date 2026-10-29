# OmniRoute A2A Server Documentation (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute a matsayin wakilin sarrafa hanya mai basira

Mahadar A2A tana da fuskoki biyu:

- **JSON-RPC 2.0** a `POST /a2a` (babbar hanyar shiga, wadda aka ayyana a `src/app/a2a/route.ts`).
- **REST** a ƙarƙashin `/api/a2a/*` don dashboard da kayan aiki (matsayi, jerin ayyuka, sokewa).

Ana bibiyar ayyuka ta hanyar `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, tsohon TTL na mintuna 5). Ana tura ƙwarewa ta hanyar `A2A_SKILL_HANDLERS` a cikin `src/lib/a2a/taskExecution.ts`.

## Gano Wakili

```bash
curl http://localhost:20128/.well-known/agent.json
```

Yana dawo da Katin Wakili wanda ke bayyana iyawa, ƙwarewa, da buƙatun tantancewa na OmniRoute.

Ana samo filin `version` na Katin Wakili daga `process.env.npm_package_version` (duba `src/app/.well-known/agent.json/route.ts:13`), don haka yana ci gaba da daidaituwa ta atomatik da `package.json` a kowace fitarwa.

---

## Tantancewa

Duk buƙatun `/a2a` suna buƙatar maɓallin API ta kanun `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Idan ba a saita maɓallin API a sabar ba, za a tsallake tantancewa.

## Kunna Aiki

Ana sarrafa A2A ta maɓallin kunnawa na **Endpoints → A2A**, kuma a tsohuwa a kashe yake. Lokacin da aka kashe,
`GET /api/a2a/status` yana bayar da rahoton `status: "disabled"` da `online: false`; kiraye-kirayen JSON-RPC zuwa
`POST /a2a` suna dawo da HTTP 503 tare da lambar kuskuren JSON-RPC `-32000`.

---

## Hanyoyin JSON-RPC 2.0

### `message/send` — Aiwatarwa Mai Jira

Yana aika saƙo zuwa wata ƙwarewa kuma yana jiran cikakkiyar amsa.

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

Ga `smart-routing`, `metadata.combo` takamaiman maye ne na
`metadata.model` don buƙatar gateway; ana aika shi a matsayin ainihin `model`,
ba a matsayin filin JSON na `x-combo` da ake yin watsi da shi ba. Har yanzu ana
aiwatar da ƙa'idar maɓallin API ta gateway da izini ga kowane manufa. Ana ƙin combo mara inganci ko wanda babu komai a cikinsa.

Sakamakon yana bayyana `requested_combo` (niyyar mai kira), `dispatched_model`
(ainihin buƙatar gateway), `response_model` (amsar gateway) da
`confirmed_combo`. Filin ƙarshe yana zama `null` sai idan gateway ya bayyana
combo a sarari. Bayanai na shawarar A2A suna danganta aiwatarwa ne kawai ga
combo da aka tabbatar, tare da riƙe buƙatar da ba a tabbatar ba a matsayin `requestedCombo`.

**Amsa:**

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

### `message/stream` — Yawo ta SSE

Daidai yake da `message/send`, amma yana mayar da Server-Sent Events don yawo a ainihin lokaci.

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

**Abubuwan da Suka Faru na SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Duba Matsayin Aiki

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Soke Aiki

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Dabarun Dabaru

OmniRoute ta fallasa ƙwarewar A2A guda 6 da aka haɗa cikin `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Kowane ƙirar fasaha yana rayuwa a cikin `src/lib/a2a/skills/`.

| Ƙwarewa          | ID                   | Bayani                                                                                                                                                    | Tags                    | Misalai                                                      |
| :--------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------- | :----------------------------------------------------------- |
| Smart Routing    | `smart-routing`      | Yana tafiyar da hanzari ta hanyar mafi kyawun provider/combo ta amfani da OmniRoute's combo engine +                                                      | hanya, masu bayarwa     | "Tabbatar da wannan tambayar ta hanyar mafi kyawun samfurin" |
| Gudanar da ƙima  | `quota-management`   | Rahoton kowane mai bayarwa jihar keɓe, yana taimaka wa masu kira su yanke shawarar lokacin throttle/switch                                                | rabo, masu bayarwa      | "Duba adadin don ɗan adam"                                   |
| Gano Mai bayarwa | `provider-discovery` | Lissafin shigar da masu samarwa tare da iyawa, tutoci masu kyauta, matsayin OAuth                                                                         | masu bayarwa, ganowa    | "Waɗanne masu samarwa suke samuwa?"                          |
| Tattalin Arziki  | `cost-analysis`      | Ƙididdiga farashin request/conversation da aka ba da kasidar + amfanin kwanan nan                                                                         | kudin, amfani           | "Kimanin farashin wannan zance"                              |
| Rahoton Lafiya   | `health-report`      | Haɗa mai watsewar kewayawa, sanyi, yanayin kulle kowane mai bayarwa                                                                                       | lafiya, juriya          | "Nuna halin kiwon lafiya na duk masu bayarwa"                |
| Ƙarfin Lissafi   | `list-capabilities`  | Yana dawo da cikakken katalogin Ƙwararrun Agent 45 (23 API + 21 CLI + 1 config) azaman tebur mai alamar tare da danyen SKILL.md URLs don allurar mahallin | catalog, ganowa, basira | "Jera duk damar OmniRoute "                                  |

> Katin Wakilin ya kamata a kiyaye shi daidai da kundin mai ba da 377 mai rai; Ƙididdigar masu badawa da free/no-auth metadata an samo su daga wurin yin rajistar lokacin aiki.

### `list-capabilities` Skill Detail

Ƙwarewar `list-capabilities` tana da amfani musamman ga wakilai na waje waɗanda ke buƙatar gano abin da OmniRoute ke fallasa kafin aika kiran API. Yana dawo da ingantaccen kayan aikin tebur mai alamar alama:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Kowane jere ya ƙunshi ginshiƙin `rawUrl` don haka nan da nan wakilai za su iya ɗauko cikakken SKILL.md. Filin `metadata.totalSkills` yana nuna girman katalogin (45 a yau). Aiki: `src/lib/a2a/skills/listCapabilities.ts`. Duba kuma [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (na taimako)

Matsayar JSON-RPC ta `/a2a` ita ce babbar mashigar A2A. Matsayoyin REST da ke ƙasa suna samar da damar taimako ga allunan sa ido da kayan aikin waje:

| Matsaya                      | Hanya | Bayani                                                                | Tantancewa                                   |
| :--------------------------- | :---- | :-------------------------------------------------------------------- | :------------------------------------------- |
| `/api/a2a/status`            | GET   | Matsayin sabar, ƙwarewar da aka yi wa rajista                         | (na jama'a)                                  |
| `/api/a2a/tasks`             | GET   | Jera ayyuka tare da matatu                                            | gudanarwa                                    |
| `/api/a2a/tasks/[id]`        | GET   | Samo aiki ta ID                                                       | gudanarwa                                    |
| `/api/a2a/tasks/[id]/cancel` | POST  | Soke aikin da ke gudana                                               | gudanarwa                                    |
| `/.well-known/agent.json`    | GET   | Katin Wakili (gano A2A)                                               | (na jama'a, an adana na 3600s)               |
| `/api/a2a/tasks`             | POST  | Miƙa aiki mai shigowa zuwa rundunar OmniConductor (Conductor PRD RF5) | Bearer da `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Miƙa aiki mai shigowa na Conductor (`POST /api/a2a/tasks`):** wakilan A2A na waje suna miƙa aikin rubuta lamba ga rundunar OmniConductor ta hanyar OmniRoute. Jiki: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — ƙwarewar rundunar Conductor kaɗai (waɗanda aka sanar a Katin Wakili) ake iya miƙa wa aiki; ana buƙatar `metadata.conductor.repo.url` (rundunar tana aiki a kan ma'ajin git). Hanyar tana fassara buƙatar zuwa `POST /v1/tasks` na hub ta amfani da `CONDUCTOR_ORCHESTRATOR_TOKEN` na gefen sabar (madadinsa `CONDUCTOR_HUB_TOKEN`) sannan ta mayar da `201 { conductor_task_id, state: "submitted" }`; matsayin ayyuka yana komawa ta madubin SSE→A2A (RF1), kuma ana iya ganinsa ta `GET /api/a2a/tasks?skill=conductor`.

---

## Ƙara Sabuwar Ƙwarewa

1. **Ƙirƙiri fayil ɗin ƙwarewa:** `src/lib/a2a/skills/<your-skill>.ts`

   Fitar da aikin async mai sigar `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Bi tsarin ƙwarewar da ake da su kamar `smartRouting.ts`.

2. **Yi rajistar mai sarrafawa:** a cikin `src/lib/a2a/taskExecution.ts`, ƙara shigarwa zuwa `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...ƙwarewar da ake da su
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Bayyana a cikin Katin Wakili:** a cikin `src/lib/a2a/agentCardMetadata.ts` (wanda `/.well-known/agent.json` da `/.well-known/agent-card.json` suke amfani da shi tare), ƙara zuwa jerin `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Ƙwarewarku",
     "description": "Taƙaitaccen bayani mai mayar da hankali kan manufa",
     "tags": ["routing", "quota"],
     "examples": ["Misalin kiran umarni ta harshen ɗan Adam"]
   }
   ```

4. **Rubuta gwaje-gwaje:** `tests/unit/a2a-<your-skill>.test.ts`. Gwada yanayin nasara + yanayin kuskure.

5. **Rubuta bayanin** sabuwar ƙwarewar a cikin jadawalin `Available Skills` na wannan fayil.

---

## TTL na Aiki

Ayyuka suna ƙarewa bayan `ttlMinutes` (tsoho mintuna 5) — an saita shi a cikin constructor na `A2ATaskManager` da ke `src/lib/a2a/taskManager.ts:82`. Don keɓancewa, yi fork na ƙirƙirar `A2ATaskManager` sannan ka tura wata ƙima dabam (misali, `new A2ATaskManager(15)` don TTL na mintuna 15). Wani interval da ke gudana a bango yana share ayyukan da suka ƙare a kowane sakan 60.

---

## Zagayowar Rayuwar Aiki

```
an gabatar → ana aiki → an kammala
                       → ya gaza
                       → an soke
```

- Ayyuka suna ƙarewa bayan mintuna 5 ta tsohuwa (duba [TTL na Aiki](#task-ttl))
- Matakan ƙarshe: `completed`, `failed`, `cancelled`
- Rajistar events tana bin diddigin kowane sauyin matsayi

---

## Lambobin Kuskure

| Lamba  | Ma'ana                                 |
| :----- | :------------------------------------- |
| -32700 | Kuskuren parse (JSON mara inganci)     |
| -32600 | Buƙata mara inganci / Ba a ba izini ba |
| -32601 | Ba a sami method ko skill ba           |
| -32602 | Params marasa inganci                  |
| -32603 | Kuskuren cikin gida                    |
| -32000 | An kashe endpoint na A2A               |

---

## Misalan Haɗawa

### Python (buƙatun)

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

### TypeScript (kawo)

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
