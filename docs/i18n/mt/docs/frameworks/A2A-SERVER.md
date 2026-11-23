# OmniRoute A2A Server Documentation (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Protokoll Bejn Aġent u Aġent v0.3 — OmniRoute bħala aġent intelliġenti tar-rotot

L-interfaċċa A2A għandha żewġ aspetti:

- **JSON-RPC 2.0** f’`POST /a2a` (il-punt tad-dħul kanoniku, definit f’`src/app/a2a/route.ts`).
- **REST** taħt `/api/a2a/*` għal dashboards u għodod (status, lista tal-kompiti, kanċellazzjoni).

Il-kompiti jiġu ssorveljati minn `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL predefinit ta’ 5 minuti). Il-ħiliet jiġu direzzjonati permezz ta’ `A2A_SKILL_HANDLERS` f’`src/lib/a2a/taskExecution.ts`.

## Skoperta tal-Aġent

```bash
curl http://localhost:20128/.unknown/agent.json
```

Jirritorna l-Kard tal-Aġent li tiddeskrivi l-kapaċitajiet, l-għarfien, u r-rekwiżiti tal-awtentikazzjoni tal-OmniRoute.

Il-qasam `version` tal-Kard tal-Aġent jiġi mill- `process.env.npm_package_version` (ara `src/app/.well-known/agent.json/route.ts:13`), għalhekk jibqa' jiġi sinkronizzat awtomatikament mal-`package.json` f'kull rilaxx.

---

## Awtentikazzjoni

It-talbiet kollha tal-`/a2a` jeħtieġu API key permezz tal-intestatura `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Jekk l-ebda API key mhuwiex konfigurat fis-server, l-awtentikazzjoni tiġi evitata.

## Tattivazzjoni

L-A2A huwa kkontrollat mill-bidla **Endpoints → A2A** u huwa diżattivat b'mod default. Meta diżattivat,
`GET /api/a2a/status` jirrappurtaha `status: "disabled"` u `online: false`; l-appell JSON-RPC lejn
`POST /a2a` jirritorna HTTP 503 mal-kodiċi ta' żball JSON-RPC `-32000`.

---

## Metodi JSON-RPC 2.0

### `message/send` — Eżekuzzjoni Sinniċka

Jibgħat messaġġ lill-għarfien u jistenna r-risposta kompluta.

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

**Risposta:**

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

Identika għal `message/send` imma jirritorna Eventi SSE għal streaming f'ħin reali.

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

**Eventi SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Staqsi l-Status tal-Kompitu

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Kanċella Kompitu

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Ħiliet Disponibbli

OmniRoute jesponi 6 ħiliet A2A konnessi f’`src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Kull modulu ta’ ħila jinsab f’`src/lib/a2a/skills/`.

| Ħila                   | ID                   | Deskrizzjoni                                                                                                                                                                              | Tikketti                  | Eżempji                                      |
| :--------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------ | :------------------------------------------- |
| Rotot Intelliġenti     | `smart-routing`      | Jgħaddi prompt mill-aħjar fornitur/kombinazzjoni bl-użu tal-magna tal-kombinazzjonijiet u l-punteġġi ta’ OmniRoute                                                                        | rotot, fornituri          | "Għaddi dan il-prompt mill-aħjar mudell"     |
| Ġestjoni tal-Kwoti     | `quota-management`   | Jirrapporta l-istat tal-kwota għal kull fornitur u jgħin lil min isejjaħ jiddeċiedi meta jillimita/jaqleb                                                                                 | kwota, fornituri          | "Iċċekkja l-kwota għal anthropic"            |
| Skoperta tal-Fornituri | `provider-discovery` | Jelenka l-fornituri installati bil-kapaċitajiet, l-indikaturi tal-livell bla ħlas u l-istat ta’ OAuth                                                                                     | fornituri, skoperta       | "Liema fornituri huma disponibbli?"          |
| Analiżi tal-Ispejjeż   | `cost-analysis`      | Jistma l-ispiża ta’ talba/konverżazzjoni abbażi tal-katalgu u l-użu reċenti                                                                                                               | spiża, użu                | "Stima l-ispiża għal din il-konverżazzjoni"  |
| Rapport dwar is-Saħħa  | `health-report`      | Jagħmel aggregazzjoni tal-istat tas-circuit breaker, tal-cooldown u tal-lockout għal kull fornitur                                                                                        | saħħa, reżiljenza         | "Uri l-istat tas-saħħa tal-fornituri kollha" |
| Elenka l-Kapaċitajiet  | `list-capabilities`  | Jirritorna l-katalgu sħiħ ta’ 45 entrata ta’ Agent Skills (23 API + 21 CLI + konfigurazzjoni waħda) bħala tabella markdown b’URLs SKILL.md mhux ipproċessati għall-injezzjoni tal-kuntest | katalgu, skoperta, ħiliet | "Elenka l-kapaċitajiet kollha ta’ OmniRoute" |

> L-Agent Card għandha tinżamm allinjata mal-katalgu attiv ta’ 374 fornitur; l-għadd tal-fornituri u l-metadata dwar dawk bla ħlas/mingħajr awtentikazzjoni jinkisbu mir-reġistru waqt it-tħaddim.

### Dettalji tal-Ħila `list-capabilities`

Il-ħila `list-capabilities` hija partikolarment utli għal aġenti esterni li jeħtieġu jiskopru x’jesponi OmniRoute qabel jibagħtu sejħiet API. Hija tirritorna artifact strutturat bħala tabella markdown:

```
| ID | Isem | Kategorija | Qasam | Endpoints/Kmandi | URL Mhux Ipproċessat |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Awtentikazzjoni u Sessjonijiet | api | awtentikazzjoni | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Kull ringiela tinkludi l-kolonna `rawUrl` sabiex l-aġenti jkunu jistgħu minnufih iniżżlu l-SKILL.md sħiħ. Il-qasam `metadata.totalSkills` jirrifletti d-daqs tal-katalgu (45 illum). Implimentazzjoni: `src/lib/a2a/skills/listCapabilities.ts`. Ara wkoll [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (awżiljarju)

Il-punt ta' dħul JSON-RPC `/a2a` huwa l-punt A2A kanoniku. L-estremitajiet REST t'hawn taħt jipprovdu aċċess awżiljarju għal dashboardijiet u għodod esterni:

| Estremità                    | Metodu | Deskrizzjoni                                                          | Awtentikazzjoni                              |
| :--------------------------- | :----- | :-------------------------------------------------------------------- | :------------------------------------------- |
| `/api/a2a/status`            | GET    | Status tas-servers, ħiliet irreġistrati                               | (pubbliku)                                   |
| `/api/a2a/tasks`             | GET    | Lista ta' impjiegi b'filtri                                           | management                                   |
| `/api/a2a/tasks/[id]`        | GET    | Ħu impjieg bl-ID                                                      | management                                   |
| `/api/a2a/tasks/[id]/cancel` | POST   | Ikkanċella impjieg li qed jitħaddem                                   | management                                   |
| `/.well-known/agent.json`    | GET    | Kard tal-Aġent (scoperta A2A)                                         | (pubbliku, cached 3600s)                     |
| `/api/a2a/tasks`             | POST   | Deleġazzjoni inbound lejn il-frotta OmniConductor (Conductor PRD RF5) | Bearer vs `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Deleġazzjoni inbound Conductor (`POST /api/a2a/tasks`):** aġenti A2A esterni jiddelegaw xogħol tal-kodifikazzjoni lill-frotta OmniConductor permezz ta' OmniRoute. Korpus: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — biss il-ħiliet tal-frotta Conductor (dawk imħabbar fil-Kard tal-Aġent) huma delegabbli; `metadata.conductor.repo.url` meħtieġa (il-frotta taħdem fuq repos git). It-traduzzjoni ssir lejn il-`POST /v1/tasks` tal-hub billi juża l-`CONDUCTOR_ORCHESTRATOR_TOKEN` tal-server (fallback `CONDUCTOR_HUB_TOKEN`) u jirritorna `201 { conductor_task_id, state: "submitted" }`; l-istati tal-impjieġ jiġbru lura permezz tal-mirja SSE→A2A (RF1) u huma viżibbli permezz ta' `GET /api/a2a/tasks?skill=conductor`.

---

## Żieda ta' Ħila Ġdida

1. **Ħoloq tal-ħila:** `src/lib/a2a/skills/<ħila-ġdida>.ts`

   Esporta funzjoni asinkrona `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Segwi l-forma ta' ħiliet eżistenti bħal `smartRouting.ts`.

2. **Irreġistra l-handlur:** f'`src/lib/a2a/taskExecution.ts`, żid dħul għal `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...ħiliet eżistenti
     "ħila-ġdida": async (task) => {
       const skillModule = await import("./skills/skillGdida");
       return skillModule.executeSkillGdida(task);
     },
   };
   ```

3. **Agħmilha disponibbli fil-Kard tal-Aġent:** f'`src/app/.well-known/agent.json/route.ts`, appendi għall-kunsinna `skills`:

   ```json
   {
     "id": "ħila-ġdida",
     "name": "Ħila Ġdida",
     "description": "Deskrizzjoni qasira, iffukata l-intenzjoni",
     "tags": ["routing", "quota"],
     "examples": ["Eżempju ta' sejħa bil-lingwa naturali"]
   }
   ```

4. **Ikteb testijiet:** `tests/unit/a2a-<ħila-ġdida>.test.ts`. Ħu ħsieb it-triq ferħana + it-triq tal-żbalji.

5. **Dokumenta** l-ħila ġdida fil-tabella `Available Skills` ta' dan il-fajl.

---

## TTL tal-Kompitu

Il-kompiti jiskadu wara `ttlMinutes` (default 5 min) — ikkonfigurat fil-kostruttur `A2ATaskManager` f'`src/lib/a2a/taskManager.ts:82`. Biex tippersonalizza, iffurka l-istanzjar `A2ATaskManager` u għaddi valur differenti (eż., `new A2ATaskManager(15)` għal TTL ta' 15-il minuta). Intervall fl-isfond jiknes il-kompiti skaduti kull 60 sekonda.

---

## Ċiklu tal-Ħajja tal-Kompitu

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Il-kompiti jiskadu wara 5 minuti b'mod default (ara [TTL tal-Kompitu](#task-ttl))
- Stati terminali: `completed`, `failed`, `cancelled`
- Reġistru tal-avvenimenti jsegwi kull transizzjoni ta' stat

---

## Kodiċijiet ta' Żbalji

| Kodiċi | Tifsira                           |
| :----- | :-------------------------------- |
| -32700 | Żball ta' parsing (JSON invalidu) |
| -32600 | Talba invalida / Mhux awtorizzat  |
| -32601 | Metodu jew ħila ma nstabitx       |
| -32602 | Parametri invalidi                |
| -32603 | Żball intern                      |
| -32000 | Endpoint A2A huwa diżattivat      |

---

## Eżempji ta' Integrazzjoni

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
