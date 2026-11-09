# OmniRoute A2A Server Documentation (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agentidevaheline protokoll v0.3 — OmniRoute intelligentse marsruutimisagendina

A2A-liidesel on kaks tahku:

- **JSON-RPC 2.0** aadressil `POST /a2a` (kanooniline sisenemispunkt, mis on määratletud failis `src/app/a2a/route.ts`).
- **REST** teekonna `/api/a2a/*` all juhtpaneelide ja tööriistade jaoks (olek, ülesannete loend, tühistamine).

Ülesandeid jälgib `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, vaikimisi 5-minutiline TTL). Oskused suunatakse `A2A_SKILL_HANDLERS` kaudu failis `src/lib/a2a/taskExecution.ts`.

## Agentide Avastamine

```bash
curl http://localhost:20128/.well-known/agent.json
```

Tagastab Agent Card'i, mis kirjeldab OmniRoute'i võimeid, oskusi ja autentimisnõudeid.

Agent Card'i `version` väärtus pärineb `process.env.npm_package_version` (vt `src/app/.well-known/agent.json/route.ts:13`), nii et see sünkroonitakse automaatselt `package.json`-iga igal väljalaskel.

---

## Autentimine

Kõikidele `/a2a` päringutele on vajalik API võti päises `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Kui serveril ei ole API võtit seadistatud, autentimine vahele jäetakse.

## Lubamine

A2A-d kontrollib **Endpoints → A2A** lüliti ja see on vaikimisi keelatud. Keelamise korral
tagastab `GET /api/a2a/status` väärtused `status: "disabled"` ja `online: false`; JSON-RPC kutsed
aadressile `POST /a2a` annavad HTTP 503 koos JSON-RPC veakoodiga `-32000`.

---

## JSON-RPC 2.0 meetodid

### `message/send` — sünkroonne täitmine

Saadab oskusele sõnumi ja ootab täielikku vastust.

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

`smart-routing`-u puhul alistab `metadata.combo` lüüsipäringus sõnaselgelt
`metadata.model`-i; see saadetakse tegeliku `model`-ina, mitte eiratava
`x-combo` JSON-väljana. Lüüsis kehtivad endiselt tavapärased API-võtme ja
sihtkohapõhised autoriseerimisreeglid. Sobimatu või tühi kombinatsioon lükatakse tagasi.

Tulemus sisaldab välju `requested_combo` (kutsuja kavatsus), `dispatched_model`
(tegelik lüüsipäring), `response_model` (lüüsi vastus) ja
`confirmed_combo`. Viimane väli on `null`, välja arvatud juhul, kui lüüs
tuvastab kombinatsiooni sõnaselgelt. A2A otsustuslogid omistavad täitmise ainult
kinnitatud kombinatsioonile, säilitades kinnitamata päringu väljana `requestedCombo`.

**Vastus:**

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

### `message/stream` — SSE voogedastus

Sama mis `message/send`, kuid tagastab reaalajas voogedastuseks Server-Sent Events sündmused.

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

**SSE sündmused:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — ülesande oleku pärimine

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ülesande tühistamine

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Olemasolevad oskused

OmniRoute paljastab 6 A2A oskust, mis on ühendatud `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Iga oskuste moodul asub `src/lib/a2a/skills/`.

| Oskus                 | ID                   | Kirjeldus                                                                                                                                                                            | Sildid                     | Näited                                          |
| :-------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :---------------------------------------------- |
| Nutikas marsruutimine | `smart-routing`      | Suunab viipa läbi optimaalse provider/combo, kasutades OmniRoute kombineeritud mootori + hindamist                                                                                   | marsruutimine, pakkujad    | "Route this prompt through the best model"      |
| Kvoodi haldamine      | `quota-management`   | Teatab teenusepakkuja kvoodi olekust, aitab helistajatel otsustada, millal throttle/switch                                                                                           | kvoot, pakkujad            | "Check quot for anthropic"                      |
| Pakkuja avastamine    | `provider-discovery` | Loetleb installitud pakkujad, millel on võimalused, vaba taseme lipud ja OAuth olek                                                                                                  | pakkujad, avastus          | "Millised pakkujad on saadaval?"                |
| Kulude analüüs        | `cost-analysis`      | Hinnanguline request/conversation maksumus, võttes arvesse kataloogi + hiljutist kasutamist                                                                                          | kulu, kasutus              | "Selle vestluse hinnanguline maksumus"          |
| Tervisearuanne        | `health-report`      | Agregeerib kaitselülitit, jahtumist, lukustuse olekut pakkuja kohta                                                                                                                  | tervis, vastupidavus       | "Kuva kõigi teenuseosutajate tervislik seisund" |
| Loetlege võimalused   | `list-capabilities`  | Tagastab täieliku 45 kirjest koosneva agendioskuste kataloogi (23 API + 21 CLI + 1 konfiguratsioon) allahindluste tabelina koos töötlemata SKILL.md URLs iga konteksti sisestamiseks | kataloog, avastus, oskused | "Loetlege kõik OmniRoute võimalused"            |

> Agendikaarti tuleks hoida vastavuses reaalajas 381-pakkujakataloogiga; pakkujate arv ja free/no-auth metaandmed pärinevad käitusaja registrist.

### `list-capabilities` oskuste üksikasjad

`list-capabilities` oskus on eriti kasulik välisagentidele, kes peavad enne API -kõnede saatmist avastama, mida OmniRoute paljastab. See tagastab struktureeritud allahindluste tabeli artefakti:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Iga rida sisaldab veergu `rawUrl`, et agendid saaksid kohe kogu SKILL.md laadida. `metadata.totalSkills` väli peegeldab kataloogi suurust (täna 45). Rakendamine: `src/lib/a2a/skills/listCapabilities.ts`. Vaata ka [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (abi)

JSON-RPC lõpp-punkt `/a2a` on kanooniline A2A sisendpunkt. Allolevad REST lõpp-punktid pakuvad lisajuurdepääsu armatuurlaudadele ja välistele tööriistadele.

| Lõpp-punkt                   | meetod | Kirjeldus                                                             | Aut                                                                                                                   |
| :--------------------------- | :----- | :-------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET    | Serveri staatus, registreeritud oskused                               | (avalik)                                                                                                              |
| `/api/a2a/tasks`             | GET    | Loetlege ülesanded filtritega                                         | juhtimine või API klahv (vt allpool)                                                                                  |
| `/api/a2a/tasks/[id]`        | GET    | Hangi ülesanne ID kaudu                                               | juhtimine või API klahv (vt allpool)                                                                                  |
| `/api/a2a/tasks/[id]/cancel` | POST   | Tühista tööülesanne                                                   | juhtimine või API klahv (vt allpool)                                                                                  |
| `/.well-known/agent.json`    | GET    | Agendikaart (A2A discovery)                                           | (avalik, vahemällu salvestatud 3600)                                                                                  |
| `/api/a2a/tasks`             | POST   | Sissetulev delegatsioon OmniConductor laevastikule (dirigent PRD RF5) | sama mis `GET`, pluss `OMNIROUTE_API_KEY` kui see on määratud, kui `REQUIRE_API_KEY` on välja lülitatud; `a2aEnabled` |

Kes pääseb `/api/a2a/tasks*` marsruutidele, sõltub sisselogimise ja API-võtme seadetest:

- `requireLogin=true` (vaikimisi): vahevara lubab ainult haldusmandaate (armatuurlaua seanss, `manage` -scope API võti, `oma_` juurdepääsuluba) ja `OMNIROUTE_API_KEY`. Lihtne järeldusvõti saab `403`. `Authorization` päises võtab vahevara ainult `OMNIROUTE_API_KEY` kui `Bearer <key>`; tühi klahv või tabeldusmärk pärast `Bearer` saab `401`.
- `requireLogin=false` või loopback aken enne liitumist: `REQUIRE_API_KEY=true` ga aktsepteeritakse mis tahes kehtivat OmniRoute API -võtit või haldusmandaati ja anonüümsed helistajad saavad `401`; `REQUIRE_API_KEY` ga väljas marsruudid on avatud.
- `POST /api/a2a/tasks` nõuab lisaks `OMNIROUTE_API_KEY` `Authorization` päises, kui see muutuja on määratud ja `REQUIRE_API_KEY` on välja lülitatud. Muud päised, näiteks `x-api-key`, ei lähe sinna arvesse. Kui sisselogimine on välja lülitatud või enne pardale sisenemist, läheb võti `Bearer` -prefiksiga või ilma; sisselogimisel pääseb vahevarast mööda ainult `Bearer <key>`.

Kui mandaati on vaja, töötab `read` -scope `oma_` luba ainult `GET` puhul.

**Sissetulevate juhtide delegatsioon (`POST /api/a2a/tasks`):** välised A2A agendid delegeerivad kodeerimistööd OmniConductor laevastikule OmniRoute kaudu. Keha: ainult `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — Dirigendipargi oskused (need, mis on märgitud agendikaardil) on delegeeritavad; `metadata.conductor.repo.url` on nõutav (parkett töötab git repos). Marsruut teisendub jaoturi `POST /v1/tasks`, kasutades serveripoolset `CONDUCTOR_ORCHESTRATOR_TOKEN` (varumine `CONDUCTOR_HUB_TOKEN`) ja tagastab `201 { conductor_task_id, state: "submitted" }`; ülesande olekud voolavad tagasi läbi SSE→A2A peegli (RF1) ja on nähtavad `GET /api/a2a/tasks?skill=conductor` kaudu .

---

## Uue oskuse lisamine

1. **Loo oskuste fail:** `src/lib/a2a/skills/<your-skill>.ts`

   Eksportige asünkroonimisfunktsioon `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Järgige olemasolevate oskuste, näiteks `smartRouting.ts` kuju. Kui oskus kutsub tagasi OmniRoute -sse HTTP kaudu, looge päised `buildSelfLoopHeaders(caller)` -ga `src/lib/a2a/selfLoopAuth.ts` -st, nii et kõne käiks A2A -helistaja võtmega, mitte `OMNIROUTE_API_KEY`, ja edastage `redirect: "error"` `fetch` -le, nii et ümbersuunamine ei saaks kunagi võtit. Abimees koostab ainult päised; iga oskus määrab ümbersuunamispoliitika ise. Kui lahendatud põhi- URL on väljaspool privaatvõrku tavaline http (loopback, konteineri või teenuse nimi ja privaatsed aadressid on korras) viskab pigem `UnsafeSelfLoopTargetError` kui lisab võtme, kui tal on volitused, nii et tagasilükatud kõnesid neelav oskus peab selle vea uuesti viskama.

2. **Registrihaldur:** `src/lib/a2a/taskExecution.ts` s lisage `A2A_SKILL_HANDLERS`-sse kirje:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Esitage agendikaardil:** `src/lib/a2a/agentCardMetadata.ts` (jagavad `/.well-known/agent.json` ja `/.well-known/agent-card.json`) lisage `skills` massiivi:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Kirjutage teste:** `tests/unit/a2a-<your-skill>.test.ts`. Cover happy path + error path.

5. **Dokument** uus oskus selle faili `Available Skills` tabelis.

---

## Ülesande TTL

Ülesanded aeguvad pärast `ttlMinutes` (vaikimisi 5 minutit) — konfigureeritud `A2ATaskManager` konstruktoris failis `src/lib/a2a/taskManager.ts:82`. Kohandamiseks eraldage `A2ATaskManager` instants ja edastage erinev väärtus (nt `new A2ATaskManager(15)` 15-minutilise TTL jaoks). Taustaintervall puhastab aegunud ülesanded iga 60 sekundi tagant.

---

## Ülesande elutsükkel

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Ülesanded aeguvad vaikimisi 5 minuti pärast (vt [Ülesanne TTL](#task-ttl) )
- Terminali olekud: `completed`, `failed`, `cancelled`
- Sündmuste logi jälgib iga oleku üleminekut

---

## Vea koodid

| Kood   | Tähendus                   |
| :----- | :------------------------- |
| -32700 | Parse error (vigane JSON)  |
| -32600 | Vigane päring / volitamata |
| -32601 | Meetod või oskus leitud    |
| -32602 | Vigased parameetrid        |
| -32603 | Sisemine viga              |
| -32000 | A2A otspunkt on keelatud   |

---

## Integratsiooni näited

### Python (päringud)

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

### TypeScript (tooma)

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
