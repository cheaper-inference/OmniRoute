# OmniRoute A2A Server Documentation (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Prótacal Gníomhaire le Gníomhaire v0.3 — OmniRoute mar ghníomhaire ródaithe cliste

Tá dhá aghaidh ar dhromchla A2A:

- **JSON-RPC 2.0** ag `POST /a2a` (an pointe iontrála canónach, sainithe in `src/app/a2a/route.ts`).
- **REST** faoi `/api/a2a/*` le haghaidh deaiseanna agus uirlisí (stádas, liosta tascanna, cealú).

Déanann `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL réamhshocraithe 5 nóiméad) tascanna a rianú. Seoltar scileanna trí `A2A_SKILL_HANDLERS` in `src/lib/a2a/taskExecution.ts`.

## Fionnachtain Gníomhairí

```bash
curl http://localhost:20128/.well-known/agent.json
```

Tugtar ar ais an Cárta Gníomhaire ina ndéantar cur síos ar chumais, scileanna agus riachtanais fíordheimhnithe OmniRoute.

Faightear réimse `version` an Chárta Gníomhaire ó `process.env.npm_package_version` (féach `src/app/.well-known/agent.json/route.ts:13`), mar sin fanann sé sioncronaithe go huathoibríoch le `package.json` le gach eisiúint.

---

## Fíordheimhniú

Teastaíonn eochair API ó gach iarratas `/a2a` tríd an gceanntásc `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Mura bhfuil aon eochair API cumraithe ar an bhfreastalaí, seachnaítear an fíordheimhniú.

## Cumasú

Rialaítear A2A leis an scorán **Críochphointí → A2A** agus tá sé díchumasaithe de réir réamhshocraithe. Nuair atá sé díchumasaithe,
tuairiscíonn `GET /api/a2a/status` `status: "disabled"` agus `online: false`; tugann glaonna JSON-RPC chuig
`POST /a2a` HTTP 503 ar ais le cód earráide JSON-RPC `-32000`.

---

## Modhanna JSON-RPC 2.0

### `message/send` — Forghníomhú Sioncronach

Seolann sé teachtaireacht chuig scil agus fanann sé leis an bhfreagra iomlán.

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

I gcás `smart-routing`, is sárú sainráite ar
`metadata.model` é `metadata.combo` don iarratas geata; seoltar é mar an fíor-`model`,
seachas mar réimse JSON `x-combo` a ndéantar neamhaird de. Tá gnáthúdarú na heochrach API agus
an t-údarú de réir sprice ag an ngeata fós i bhfeidhm. Diúltaítear teaglaim neamhbhailí nó folamh.

Nochtann an toradh `requested_combo` (rún an ghlaoiteora), `dispatched_model`
(an t-iarratas geata iarbhír), `response_model` (freagra an gheata) agus
`confirmed_combo`. Is é `null` an réimse deireanach mura sainaithníonn an geata
teaglaim go sainráite. Ní chuireann logaí cinnteoireachta A2A an forghníomhú i leith
teaglaim ach amháin má tá sí deimhnithe, agus coinnítear iarratas neamhdheimhnithe mar `requestedCombo`.

**Freagra:**

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

### `message/stream` — Sruthú SSE

Mar an gcéanna le `message/send`, ach seoltar Imeachtaí arna Seoladh ag an bhFreastalaí ar ais le haghaidh sruthú fíor-ama.

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

**Imeachtaí SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Fiosraigh Stádas Taisc

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Cealaigh Tasc

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Scileanna atá ar Fáil

Nochtann OmniRoute 6 scil A2A sreangaithe i `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Cónaíonn gach modúl scile i `src/lib/a2a/skills/`.

| Scil                   | ID                   | Cur síos                                                                                                                                                                       | Clibeanna                        | Samplaí                                     |
| :--------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------- | :------------------------------------------ |
| Ródú Cliste            | `smart-routing`      | Seol leid tríd an provider/combo optamach ag baint úsáide as scóráil OmniRoute inneall teaglama +                                                                              | ródú, soláthraithe               | "Rótáil an leid seo tríd an múnla is fearr" |
| Bainistíocht Cuóta     | `quota-management`   | Cabhraíonn tuairiscí in aghaidh an tsoláthraí de réir an chuóta, le glaoiteoirí cinneadh a dhéanamh maidir le cén uair is ceart throttle/switch                                | cuóta, soláthraithe              | "Seiceáil cuóta le haghaidh antraipeach"    |
| Fionnachtain Soláthraí | `provider-discovery` | Liostaíonn soláthraithe suiteáilte le cumais, bratacha saorshraith, stádas OAuth                                                                                               | soláthraithe, fionnachtana       | "Cad iad na soláthraithe atá ar fáil?"      |
| Anailís Costas         | `cost-analysis`      | Meastacháin ar chostas request/conversation ag cur san áireamh gur úsáideadh catalóg + le déanaí                                                                               | costas, úsáid                    | "Meastachán ar an gcostas don chomhrá seo"  |
| Tuarascáil Sláinte     | `health-report`      | Comhiomláin scoradáin chiorcaid, fuarú, staid frithdhúnadh in aghaidh an tsoláthraí                                                                                            | sláinte, athléimneacht           | "Taispeáin stádas sláinte gach soláthraí"   |
| Cumais Liosta          | `list-capabilities`  | Seoltar ar ais an chatalóg iomlán Scileanna Gníomhaire 45-iontráil (23 API + 21 CLI + 1 config) mar tábla marcála síos le SKILL.md URLs amh le haghaidh instealladh comhthéacs | catalóg, fionnachtain, scileanna | "Liostaigh gach cumas OmniRoute "           |

> Ba cheart an Cárta Gníomhaire a choinneáil ar chomhréim leis an gcatalóg bheo 386 soláthraí; Faightear comhaireamh soláthraithe agus meiteashonraí free/no-auth ón gclár ama rite.

### `list-capabilities` Scil Sonraigh

Tá an scil `list-capabilities` úsáideach go háirithe do ghníomhairí seachtracha ar gá dóibh a fháil amach cad a nochtar OmniRoute roimh ghlaonna API a sheoladh. Tugann sé déantán tábla marcála síos struchtúrtha ar ais:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Cuimsíonn gach sraith an colún `rawUrl` ionas gur féidir le gníomhairí an SKILL.md iomlán a fháil láithreach. Is ionann an réimse `metadata.totalSkills` agus méid na catalóige (45 inniu). Cur i bhfeidhm: `src/lib/a2a/skills/listCapabilities.ts`. Féach freisin [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (cúnta)

Is é an críochphointe JSON-RPC `/a2a` an pointe iontrála canonical A2A. Soláthraíonn na críochphointí REST thíos rochtain chúnta ar dheais agus ar uirlisí seachtracha:

| Críochphointe                | Modh | Cur síos                                                                  | Údar                                                                                                            |
| :--------------------------- | :--- | :------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET  | Stádas freastalaí, scileanna cláraithe                                    | (poiblí)                                                                                                        |
| `/api/a2a/tasks`             | GET  | Déan liosta de na tascanna le scagairí                                    | eochair bainistíochta nó API (féach thíos)                                                                      |
| `/api/a2a/tasks/[id]`        | GET  | Faigh tasc ag ID                                                          | eochair bainistíochta nó API (féach thíos)                                                                      |
| `/api/a2a/tasks/[id]/cancel` | POST | Cealaigh tasc reatha                                                      | eochair bainistíochta nó API (féach thíos)                                                                      |
| `/.well-known/agent.json`    | GET  | Cárta Gníomhaire (A2A discovery)                                          | (poiblí, i dtaisce 3600í)                                                                                       |
| `/api/a2a/tasks`             | POST | Toscaireacht isteach chuig an gcabhlach OmniConductor ( Seoltóir PRD RF5) | mar an gcéanna le `GET`, móide `OMNIROUTE_API_KEY` má shocraítear é agus `REQUIRE_API_KEY` múchta; `a2aEnabled` |

Braitheann an té a théann tríd na bealaí `/api/a2a/tasks*` ar an logáil isteach agus ar na socruithe eochair-API:

- `requireLogin=true` (réamhshocraithe): ní admhaíonn an middleware ach dintiúir bhainistíochta (seisiún painéal, eochair `manage` -scope API, comhartha rochtana `oma_` ) agus `OMNIROUTE_API_KEY`. Faigheann eochair tátail shimplí `403`. Sa cheanntásc `Authorization` ní thógann an lárearraí ach `OMNIROUTE_API_KEY` mar `Bearer <key>`; eochair lom nó cluaisín tar éis `Bearer` a fháil `401`.
- `requireLogin=false`, nó an fhuinneog loopback roimh dul ar bord: le `REQUIRE_API_KEY=true` glactar le haon eochair OmniRoute API bailí nó le creidiúint bhainistíochta agus faigheann glaoiteoirí gan ainm `401`; le `REQUIRE_API_KEY` amach tá na bealaí oscailte.
- Éilíonn `POST /api/a2a/tasks` freisin `OMNIROUTE_API_KEY` sa cheanntásc `Authorization` nuair a bhíonn an athróg sin socraithe agus `REQUIRE_API_KEY` múchta. Ní áirítear ceanntásca eile, mar shampla `x-api-key`, ann. Nuair a logáil isteach as nó roimh dul ar bord an eochair Gabhann le nó gan réimír `Bearer` ; le logáil isteach, ní théann ach `Bearer <key>` thar na hearraí lár.

I gcás ina bhfuil dintiúr ag teastáil, ní oibríonn comhartha `read` -scope `oma_` ach do `GET`.

**Toscaireacht Seoltóra Isteach (`POST /api/a2a/tasks`) :** Déanann gníomhairí seachtracha A2A obair códaithe a tharmligean chuig an gcabhlach OmniConductor trí OmniRoute. Comhlacht: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — amháin Tá scileanna cabhlaigh seoltóra (na cinn a fógraíodh ar an gCárta Gníomhaire) inchurtha; `metadata.conductor.repo.url` ag teastáil (oibríonn an cabhlach ar git repos). Aistríonn an bealach go `POST /v1/tasks` an mhoil ag baint úsáide as an taobh freastalaí `CONDUCTOR_ORCHESTRATOR_TOKEN` ( fallback `CONDUCTOR_HUB_TOKEN`) agus filleann `201 { conductor_task_id, state: "submitted" }`; Sníonn na tascstáit ar ais tríd an scáthán SSE→A2A (RF1) agus tá siad le feiceáil trí `GET /api/a2a/tasks?skill=conductor`.

---

## Scil Nua a Chur Leis

1. **Cruthaigh comhad scile:** `src/lib/a2a/skills/<your-skill>.ts`

   Easpórtáil feidhm asincréite `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Lean cruth na scileanna atá ann cheana féin mar `smartRouting.ts`. Má ghlaonn an scil ar ais go OmniRoute thar HTTP, tóg na ceanntásca le `buildSelfLoopHeaders(caller)` ó `src/lib/a2a/selfLoopAuth.ts` ionas go n-imíonn an glao le heochair an ghlaoiteora A2A, ní `OMNIROUTE_API_KEY`, agus pas `redirect: "error"` go `fetch` ionas nach bhfaighidh atreorú an eochair riamh. Ní thógann an cúntóir ach ceanntásca; leagann gach scil síos an polasaí atreoraithe féin. Caitheann sé `UnsafeSelfLoopTargetError` seachas eochair a cheangal nuair a bhíonn an bonn réitithe URL soiléir http lasmuigh den líonra príobháideach (lúb siar, ainm coimeádán nó seirbhíse, agus seoltaí príobháideacha go breá) nó nuair a bhíonn dintiúir aige, agus mar sin ní mór do scil a shlogann glaonna diúltaithe an earráid sin a athmhúnlú.

2. **Láimhseálaí clárúcháin:** in `src/lib/a2a/taskExecution.ts`, cuir iontráil le `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Nochtadh i gCárta Gníomhaire:** in `src/lib/a2a/agentCardMetadata.ts` (roinnte ag `/.well-known/agent.json` agus `/.well-known/agent-card.json`), cuir leis an eagar `skills` :

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Scríobh trialacha:** `tests/unit/a2a-<your-skill>.test.ts`. Clúdach cosán sásta conair earráide +.

5. **Doiciméad** an scil nua i dtábla `Available Skills` an chomhaid seo.

---

## TTL an Taisc

Téann tascanna in éag tar éis `ttlMinutes` (5 nóiméad de réir réamhshocraithe) — cumraithe i gcruthaitheoir `A2ATaskManager` ag `src/lib/a2a/taskManager.ts:82`. Chun é seo a shaincheapadh, forcáil tionscnamh `A2ATaskManager` agus cuir luach difriúil ar aghaidh (m.sh., `new A2ATaskManager(15)` le haghaidh TTL 15 nóiméad). Glanann eatramh cúlra na tascanna atá imithe in éag gach 60 soicind.

---

## Saolré an Taisc

```
curtha isteach → ar siúl → críochnaithe
                         → teipthe
                         → curtha ar ceal
```

- Téann tascanna in éag tar éis 5 nóiméad de réir réamhshocraithe (féach [TTL an Taisc](#task-ttl))
- Staideanna deiridh: `completed`, `failed`, `cancelled`
- Rianaíonn loga na dteagmhas gach aistriú staide

---

## Cóid Earráide

| Cód    | Brí                                   |
| :----- | :------------------------------------ |
| -32700 | Earráid pharsála (JSON neamhbhailí)   |
| -32600 | Iarratas neamhbhailí / Neamhúdaraithe |
| -32601 | Modh nó scil gan aimsiú               |
| -32602 | Paraiméadair neamhbhailí              |
| -32603 | Earráid inmheánach                    |
| -32000 | Tá críochphointe A2A díchumasaithe    |

---

## Comhtháthú Samplaí

### Python (iarratais)

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

### TypeScript (faigh)

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
