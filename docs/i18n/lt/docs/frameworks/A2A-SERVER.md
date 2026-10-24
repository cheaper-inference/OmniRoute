# OmniRoute A2A Server Documentation (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agentų tarpusavio protokolas v0.3 — „OmniRoute“ kaip išmanusis maršruto parinkimo agentas

A2A sąsaja turi dvi formas:

- **JSON-RPC 2.0** per `POST /a2a` (pagrindinis įėjimo taškas, apibrėžtas faile `src/app/a2a/route.ts`).
- **REST** po `/api/a2a/*`, skirta suvestinėms ir įrankiams (būsena, užduočių sąrašas, atšaukimas).

Užduotis stebi `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, numatytasis 5 minučių TTL). Įgūdžiai paskirstomi naudojant `A2A_SKILL_HANDLERS`, esantį faile `src/lib/a2a/taskExecution.ts`.

## Agento aptikimas

```bash
curl http://localhost:20128/.well-known/agent.json
```

Grąžinama agento kortelė, aprašanti OmniRoute galimybes, įgūdžius ir autentifikavimo reikalavimus.

Agento kortelės lauko `version` reikšmė gaunama iš `process.env.npm_package_version` (žr. `src/app/.well-known/agent.json/route.ts:13`), todėl kiekvieno leidimo metu ji automatiškai sinchronizuojama su `package.json`.

---

## Autentifikavimas

Visoms `/a2a` užklausoms reikalingas API raktas, perduodamas per `Authorization` antraštę:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Jei serveryje nesukonfigūruotas joks API raktas, autentifikavimas praleidžiamas.

## Įjungimas

A2A valdoma jungikliu **Endpoints → A2A** ir pagal numatytuosius nustatymus yra išjungta. Kai ji išjungta,
`GET /api/a2a/status` pateikia `status: "disabled"` ir `online: false`; JSON-RPC iškvietimai į
`POST /a2a` grąžina HTTP 503 su JSON-RPC klaidos kodu `-32000`.

---

## JSON-RPC 2.0 metodai

### `message/send` — sinchroninis vykdymas

Siunčia pranešimą įgūdžiui ir laukia viso atsakymo.

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

Naudojant `smart-routing`, `metadata.combo` yra aiškiai nurodytas
`metadata.model` perrašymas šliuzo užklausai; jis siunčiamas kaip tikrasis `model`,
o ne kaip ignoruojamas `x-combo` JSON laukas. Įprastas šliuzo API rakto ir
konkretaus tikslo autorizavimas vis tiek taikomas. Netinkamas arba tuščias derinys atmetamas.

Rezultate pateikiami `requested_combo` (kvietėjo ketinimas), `dispatched_model`
(faktinė šliuzo užklausa), `response_model` (šliuzo atsakymas) ir
`confirmed_combo`. Paskutinis laukas yra `null`, nebent šliuzas aiškiai
nurodo derinį. A2A sprendimų žurnaluose vykdymas priskiriamas tik
patvirtintam deriniui, o nepatvirtinta užklausa išsaugoma kaip `requestedCombo`.

**Atsakymas:**

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

### `message/stream` — SSE srautinis perdavimas

Veikia taip pat kaip `message/send`, tačiau grąžina „Server-Sent Events“, kad duomenys būtų perduodami srautu realiuoju laiku.

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

**SSE įvykiai:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — užduoties būsenos užklausa

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — užduoties atšaukimas

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Prieinami įgūdžiai

OmniRoute atveria 6 A2A įgūdžius, prijungtus `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Kiekvieno įgūdžio modulis yra `src/lib/a2a/skills/`.

| Įgūdis                  | ID                   | Aprašymas                                                                                                                                                       | Žymos                      | Pavyzdžiai                                      |
| :---------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :---------------------------------------------- |
| Išmanusis maršrutavimas | `smart-routing`      | Nukreipia užklausą per optimaliausią teikėją/kombinaciją, naudojant OmniRoute kombinacijų variklį + vertinimą balais                                            | routing, providers         | „Nukreipkite šią užklausą per geriausią modelį“ |
| Kvotų valdymas          | `quota-management`   | Praneša apie kiekvieno teikėjo kvotų būseną, padeda kvietėjams nuspręsti, kada riboti srautą arba persijungti                                                   | quota, providers           | „Patikrinkite anthropic kvotą“                  |
| Teikėjų aptikimas       | `provider-discovery` | Išvardija įdiegtus teikėjus su jų galimybėmis, nemokamo plano žymėmis ir OAuth būsena                                                                           | providers, discovery       | „Kokie teikėjai prieinami?“                     |
| Išlaidų analizė         | `cost-analysis`      | Įvertina užklausos/pokalbio kainą pagal katalogą + naujausią naudojimą                                                                                          | cost, usage                | „Įvertinkite šio pokalbio kainą“                |
| Būklės ataskaita        | `health-report`      | Apibendrina grandinės pertraukiklio (circuit breaker), atvėsimo (cooldown) ir blokavimo (lockout) būsenas kiekvienam teikėjui                                   | health, resilience         | „Rodykite visų teikėjų būklę“                   |
| Galimybių sąrašas       | `list-capabilities`  | Grąžina visą 45 įrašų agentų įgūdžių katalogą (23 API + 21 CLI + 1 konfigūraciją) kaip markdown lentelę su neapdorotomis (raw) SKILL.md URL konteksto įterpimui | catalog, discovery, skills | „Išvardykite visas OmniRoute galimybes“         |

> Agent Card turėtų būti nuolat suderinama su tiesioginiu 375 teikėjų katalogu; teikėjų skaičiai bei metaduomenys apie nemokamą prieigą / prieigą be autentifikacijos gaunami iš vykdymo laiko registro.

### `list-capabilities` įgūdžio detalės

`list-capabilities` įgūdis ypač naudingas išoriniams agentams, kuriems prieš siunčiant API užklausas reikia sužinoti, ką atveria OmniRoute. Jis grąžina struktūrizuotą markdown lentelės artefaktą:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Kiekviena eilutė apima `rawUrl` stulpelį, kad agentai galėtų iškart gauti visą SKILL.md. Laukas `metadata.totalSkills` atspindi katalogo dydį (šiandien – 45). Įgyvendinimas: `src/lib/a2a/skills/listCapabilities.ts`. Taip pat žr. [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (pagalbinė)

JSON-RPC galinis taškas `/a2a` yra pagrindinis A2A įvesties taškas. Toliau pateikti REST galiniai taškai suteikia pagalbinę prieigą suvestinėms ir išoriniams įrankiams:

| Galinis taškas               | Metodas | Aprašymas                                                               | Autentifikavimas                             |
| :--------------------------- | :------ | :---------------------------------------------------------------------- | :------------------------------------------- |
| `/api/a2a/status`            | GET     | Serverio būsena, užregistruoti įgūdžiai                                 | (vieša)                                      |
| `/api/a2a/tasks`             | GET     | Užduočių sąrašas su filtrais                                            | valdymas                                     |
| `/api/a2a/tasks/[id]`        | GET     | Gauti užduotį pagal ID                                                  | valdymas                                     |
| `/api/a2a/tasks/[id]/cancel` | POST    | Atšaukti vykdomą užduotį                                                | valdymas                                     |
| `/.well-known/agent.json`    | GET     | Agento kortelė (A2A aptikimas)                                          | (vieša, podėlyje laikoma 3600s)              |
| `/api/a2a/tasks`             | POST    | Gaunamų užduočių delegavimas „OmniConductor“ grupei (Conductor PRD RF5) | Bearer su `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Gaunamas „Conductor“ delegavimas (`POST /api/a2a/tasks`):** išoriniai A2A agentai per „OmniRoute“ deleguoja programavimo darbus „OmniConductor“ grupei. Turinys: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — deleguoti galima tik „Conductor“ grupės įgūdžius (paskelbtus Agento kortelėje); `metadata.conductor.repo.url` yra privalomas (grupė dirba su git saugyklomis). Maršrutas transformuojamas į centro `POST /v1/tasks`, naudojant serverio pusės `CONDUCTOR_ORCHESTRATOR_TOKEN` (atsarginis variantas – `CONDUCTOR_HUB_TOKEN`), ir grąžina `201 { conductor_task_id, state: "submitted" }`; užduočių būsenos perduodamos atgal per SSE→A2A atspindį (RF1) ir yra matomos naudojant `GET /api/a2a/tasks?skill=conductor`.

---

## Naujo įgūdžio pridėjimas

1. **Sukurkite įgūdžio failą:** `src/lib/a2a/skills/<your-skill>.ts`

   Eksportuokite asinchroninę funkciją `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Vadovaukitės esamų įgūdžių, pvz., `smartRouting.ts`, struktūra.

2. **Užregistruokite apdorojimo funkciją:** faile `src/lib/a2a/taskExecution.ts` pridėkite įrašą į `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...esami įgūdžiai
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Paskelbkite Agento kortelėje:** faile `src/app/.well-known/agent.json/route.ts` papildykite `skills` masyvą:

   ```json
   {
     "id": "your-skill",
     "name": "Jūsų įgūdis",
     "description": "Trumpas, į tikslą orientuotas aprašymas",
     "tags": ["routing", "quota"],
     "examples": ["Natūraliosios kalbos iškvietimo pavyzdys"]
   }
   ```

4. **Parašykite testus:** `tests/unit/a2a-<your-skill>.test.ts`. Apimkite sėkmingą scenarijų ir klaidos scenarijų.

5. **Dokumentuokite** naują įgūdį šio failo lentelėje `Available Skills`.

---

## Užduoties TTL

Užduotys nustoja galioti po `ttlMinutes` (numatytoji reikšmė – 5 min.) — tai sukonfigūruota `A2ATaskManager` konstruktoriuje, esančiame `src/lib/a2a/taskManager.ts:82`. Norėdami pakeisti šią reikšmę, sukurkite atskirą `A2ATaskManager` egzemplioriaus kūrimo realizaciją ir perduokite kitą reikšmę (pvz., `new A2ATaskManager(15)`, jei TTL turi būti 15 minučių). Foninis intervalinis procesas kas 60 sekundžių pašalina nebegaliojančias užduotis.

---

## Užduoties gyvavimo ciklas

```
pateikta → vykdoma → užbaigta
                  → nepavyko
                  → atšaukta
```

- Pagal numatytąsias nuostatas užduotys nustoja galioti po 5 minučių (žr. [Užduoties TTL](#task-ttl))
- Galutinės būsenos: `completed`, `failed`, `cancelled`
- Įvykių žurnale registruojamas kiekvienas būsenos pasikeitimas

---

## Klaidų kodai

| Kodas  | Reikšmė                            |
| :----- | :--------------------------------- |
| -32700 | Analizės klaida (netinkamas JSON)  |
| -32600 | Netinkama užklausa / Nėra prieigos |
| -32601 | Metodas arba gebėjimas nerastas    |
| -32602 | Netinkami parametrai               |
| -32603 | Vidinė klaida                      |
| -32000 | A2A galinis taškas išjungtas       |

---

## Integravimo pavyzdžiai

### Python (`requests`)

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

### TypeScript (`fetch`)

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
