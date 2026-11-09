# OmniRoute A2A Server Documentation (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Protokol Agent-to-Agent v0.3 — OmniRoute kot inteligentni usmerjevalni agent

Vmesnik A2A ima dve podobi:

- **JSON-RPC 2.0** na `POST /a2a` (kanonična vstopna točka, opredeljena v `src/app/a2a/route.ts`).
- **REST** pod `/api/a2a/*` za nadzorne plošče in orodja (stanje, seznam opravil, preklic).

Opravilom sledi `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, privzeti TTL je 5 minut). Veščine se posredujejo prek `A2A_SKILL_HANDLERS` v `src/lib/a2a/taskExecution.ts`.

## Odkrivanje agenta

```bash
curl http://localhost:20128/.well-known/agent.json
```

Vrne kartico agenta, ki opisuje zmožnosti, veščine in zahteve za preverjanje pristnosti sistema OmniRoute.

Polje `version` v kartici agenta se pridobi iz `process.env.npm_package_version` (glejte `src/app/.well-known/agent.json/route.ts:13`), zato se ob vsaki izdaji samodejno sinhronizira z datoteko `package.json`.

---

## Preverjanje pristnosti

Vse zahteve za `/a2a` zahtevajo ključ API prek glave `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Če na strežniku ni konfiguriran noben ključ API, se preverjanje pristnosti preskoči.

## Omogočanje

A2A se upravlja s preklopnim stikalom **Endpoints → A2A** in je privzeto onemogočen. Ko je onemogočen,
`GET /api/a2a/status` sporoči `status: "disabled"` in `online: false`; klici JSON-RPC na
`POST /a2a` vrnejo HTTP 503 s kodo napake JSON-RPC `-32000`.

---

## Metode JSON-RPC 2.0

### `message/send` — Sinhrono izvajanje

Pošlje sporočilo veščini in počaka na celoten odgovor.

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

Za `smart-routing` je `metadata.combo` izrecna preglasitev vrednosti
`metadata.model` za zahtevo prehodu; poslana je kot dejanski `model`,
ne kot prezrto polje JSON `x-combo`. Še vedno veljajo običajni ključ API prehoda in
pooblastila za posamezen cilj. Neveljavna ali prazna kombinacija je zavrnjena.

Rezultat vsebuje `requested_combo` (namen klicatelja), `dispatched_model`
(dejansko zahtevo prehodu), `response_model` (odgovor prehoda) in
`confirmed_combo`. Zadnje polje je `null`, razen če prehod izrecno
identificira kombinacijo. Dnevniki odločitev A2A pripišejo izvajanje samo
potrjeni kombinaciji, nepotrjeno zahtevo pa ohranijo kot `requestedCombo`.

**Odgovor:**

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

### `message/stream` — Pretakanje SSE

Enako kot `message/send`, vendar vrača dogodke, ki jih pošilja strežnik, za pretakanje v realnem času.

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

**Dogodki SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Poizvedba o stanju opravila

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Preklic opravila

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Razpoložljive spretnosti

OmniRoute razkriva 6 veščin A2A, povezanih z `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Vsak modul spretnosti živi v `src/lib/a2a/skills/`.

| Spretnost            | ID                   | Opis                                                                                                                                                              | Oznake                     | Primeri                                     |
| :------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :------------------------------------------ |
| Pametno usmerjanje   | `smart-routing`      | Usmeri poziv skozi optimalni provider/combo z uporabo OmniRoute-jevega kombiniranega mehanizma + točkovanja                                                       | usmerjanje, ponudniki      | "Usmeri ta poziv prek najboljšega modela"   |
| Upravljanje kvot     | `quota-management`   | Poroča o stanju kvote posameznega ponudnika, klicateljem pomaga pri odločitvi, kdaj naj throttle/switch                                                           | kvota, ponudniki           | "Preveri kvoto za anthropic"                |
| Odkritje ponudnika   | `provider-discovery` | Navaja nameščene ponudnike z zmožnostmi, zastavicami brezplačne ravni in statusom OAuth                                                                           | ponudniki, odkrivanje      | "Kateri ponudniki so na voljo?"             |
| Analiza stroškov     | `cost-analysis`      | Ocenjuje stroške request/conversation glede na nedavno uporabo + v katalogu                                                                                       | stroški, uporaba           | "Ocena stroškov za ta pogovor"              |
| Zdravstveno poročilo | `health-report`      | Odklopnik agregatov, ohlajanje, stanje zaklepanja na ponudnika                                                                                                    | zdravje, odpornost         | "Pokaži zdravstveno stanje vseh ponudnikov" |
| Seznam zmogljivosti  | `list-capabilities`  | Vrne celoten katalog spretnosti agenta s 45 vnosi (konfiguracija 23 API + 21 CLI + 1) kot tabelo označevanja z neobdelanim SKILL.md URLs za vstavljanje konteksta | katalog, odkritje, veščine | "Seznam vseh zmogljivosti OmniRoute "       |

> Kartica agenta mora biti usklajena s katalogom ponudnikov 381 v živo; število ponudnikov in metapodatki free/no-auth izvirajo iz registra izvajalnega okolja.

### `list-capabilities` podrobnosti spretnosti

Veščina `list-capabilities` je še posebej uporabna za zunanje agente, ki morajo odkriti, kaj razkrije OmniRoute preden pošljejo klice API. Vrne artefakt strukturirane tabele označevanja:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Vsaka vrstica vključuje stolpec `rawUrl` tako da lahko agenti takoj pridobijo celoten SKILL.md. Polje `metadata.totalSkills` odraža velikost kataloga (45 danes). Izvedba: `src/lib/a2a/skills/listCapabilities.ts`. Glej tudi [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (pomožni)

Končna točka JSON-RPC `/a2a` je kanonična vstopna točka A2A. Spodnje končne točke REST zagotavljajo pomožni dostop za nadzorne plošče in zunanja orodja:

| Končna točka                 | Metoda | Opis                                                       | Auth                                                                                                         |
| :--------------------------- | :----- | :--------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET    | Stanje strežnika, registrirane veščine                     | (javno)                                                                                                      |
| `/api/a2a/tasks`             | GET    | Seznam opravil s filtri                                    | upravljanje ali ključ API (glejte spodaj)                                                                    |
| `/api/a2a/tasks/[id]`        | GET    | Pridobite nalogo z ID                                      | upravljanje ali ključ API (glejte spodaj)                                                                    |
| `/api/a2a/tasks/[id]/cancel` | POST   | Prekliči tekoče opravilo                                   | upravljanje ali ključ API (glejte spodaj)                                                                    |
| `/.well-known/agent.json`    | GET    | Kartica agenta (odkritje A2A )                             | (javno, predpomnjeno 3600s)                                                                                  |
| `/api/a2a/tasks`             | POST   | Dohodno delegiranje floti OmniConductor (dirigent PRD RF5) | enako kot `GET`, plus `OMNIROUTE_API_KEY` če je nastavljen, ko je `REQUIRE_API_KEY` izklopljen; `a2aEnabled` |

Kdo pride do poti `/api/a2a/tasks*` je odvisno od prijave in nastavitev ključa API:

- `requireLogin=true` (privzeto): vmesna programska oprema priznava samo poverilnice za upravljanje (sejo nadzorne plošče, ključ `manage` -scope API, žeton dostopa `oma_` ) in `OMNIROUTE_API_KEY`. Navadni sklepni ključ dobi `403`. V glavi `Authorization` vmesna programska oprema sprejme samo `OMNIROUTE_API_KEY` kot `Bearer <key>`; gola tipka ali zavihek po `Bearer` dobi `401`.
- `requireLogin=false` ali okno povratne zanke pred vkrcanjem: z `REQUIRE_API_KEY=true` je sprejet vsak veljaven ključ OmniRoute API ali poverilnica za upravljanje in anonimni klicatelji prejmejo `401`; z izklopom `REQUIRE_API_KEY` so poti odprte.
- `POST /api/a2a/tasks` dodatno zahteva `OMNIROUTE_API_KEY` v glavi `Authorization`, ko je ta spremenljivka nastavljena in je `REQUIRE_API_KEY` izklopljen. Druge glave, kot je `x-api-key`, tam ne štejejo. Ko je prijava izključena ali pred vkrcanjem, ključ prehaja s predpono `Bearer` ali brez nje; z vključeno prijavo samo `Bearer <key>` preide vmesno programsko opremo.

Če je zahtevana poverilnica, žeton `read` -scope `oma_` deluje samo za `GET`.

**Delegiranje vhodnega dirigenta (`POST /api/a2a/tasks`):** zunanji agenti A2A prenesejo delo kodiranja na floto OmniConductor prek OmniRoute. Telo: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — samo spretnosti voznega parka dirigenta (tiste, ki so objavljene na kartici agenta) so prenosljive; potreben je `metadata.conductor.repo.url` (flota deluje na git repos). Pot se prevede v `POST /v1/tasks` vozlišča z uporabo `CONDUCTOR_ORCHESTRATOR_TOKEN` na strani strežnika (nadomestni `CONDUCTOR_HUB_TOKEN`) in vrne `201 { conductor_task_id, state: "submitted" }`; stanja nalog tečejo nazaj skozi ogledalo SSE→A2A (RF1) in so vidna prek `GET /api/a2a/tasks?skill=conductor`.

---

## Dodajanje nove spretnosti

1. **Ustvari datoteko spretnosti:** `src/lib/a2a/skills/<your-skill>.ts`

   Izvozi asinhrono funkcijo `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Sledite obliki obstoječih spretnosti, kot je `smartRouting.ts`. Če spretnost pokliče nazaj v OmniRoute prek HTTP, zgradite glave z `buildSelfLoopHeaders(caller)` iz `src/lib/a2a/selfLoopAuth.ts`, tako da klic teče s ključem klicatelja A2A, ne `OMNIROUTE_API_KEY`, in posredujte `redirect: "error"` v `fetch` tako da preusmeritev nikoli ne dobi ključa. Pomočnik gradi samo glave; vsaka veščina sama nastavi politiko preusmeritve. Namesto da bi priložil ključ vrže `UnsafeSelfLoopTargetError`, ko je razrešen osnovni URL navaden http zunaj zasebnega omrežja (povratna zanka, vsebnik ali ime storitve in zasebni naslovi so v redu) ali ima poverilnice, tako da mora spretnost, ki pogoltne zavrnjene klice, znova vrniti to napako.

2. **Upravljavec registra:** v `src/lib/a2a/taskExecution.ts` dodajte vnos v `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Razkrij v agentski kartici:** v `src/lib/a2a/agentCardMetadata.ts` (v skupni rabi z `/.well-known/agent.json` in `/.well-known/agent-card.json`), dodajte v polje `skills` :

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Napišite teste:** `tests/unit/a2a-<your-skill>.test.ts`. Cover happy path + error path.

5. **Dokument** nova spretnost v tabeli `Available Skills` te datoteke.

---

## Čas veljavnosti opravila

Opravila potečejo po `ttlMinutes` (privzeto 5 min) — nastavljeno v konstruktorju `A2ATaskManager` v `src/lib/a2a/taskManager.ts:82`. Če želite to prilagoditi, ustvarite svojo različico inicializacije `A2ATaskManager` in posredujte drugačno vrednost (npr. `new A2ATaskManager(15)` za 15-minutni čas veljavnosti). Interval v ozadju vsakih 60 sekund odstrani potekla opravila.

---

## Življenjski cikel opravila

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Opravila privzeto potečejo po 5 minutah (glejte [Čas veljavnosti opravila](#task-ttl))
- Končna stanja: `completed`, `failed`, `cancelled`
- Dnevnik dogodkov beleži vsak prehod stanja

---

## Kode napak

| Koda   | Pomen                                   |
| :----- | :-------------------------------------- |
| -32700 | Napaka razčlenjevanja (neveljaven JSON) |
| -32600 | Neveljavna zahteva / Nepooblaščeno      |
| -32601 | Metoda ali veščina ni bila najdena      |
| -32602 | Neveljavni parametri                    |
| -32603 | Notranja napaka                         |
| -32000 | Končna točka A2A je onemogočena         |

---

## Primeri integracije

### Python (zahteve)

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

### TypeScript (pridobi)

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
