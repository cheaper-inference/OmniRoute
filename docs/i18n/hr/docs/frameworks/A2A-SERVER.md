# OmniRoute A2A Server Documentation (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute kao inteligentni agent za usmjeravanje

A2A sučelje ima dva oblika:

- **JSON-RPC 2.0** na `POST /a2a` (kanonska ulazna točka, definirana u `src/app/a2a/route.ts`).
- **REST** pod `/api/a2a/*` za nadzorne ploče i alate (status, popis zadataka, otkazivanje).

Zadatke prati `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, zadani TTL od 5 minuta). Vještine se prosljeđuju putem `A2A_SKILL_HANDLERS` u `src/lib/a2a/taskExecution.ts`.

## Otkrivanje Agenta

```bash
curl http://localhost:20128/.well-known/agent.json
```

Vraća Agent Card koji opisuje mogućnosti, vještine i zahtjeve za autentifikaciju OmniRoutea.

Polje `version` u Agent Cardu preuzima se iz `process.env.npm_package_version` (vidi `src/app/.well-known/agent.json/route.ts:13`), što ga drži automatski sinkroniziranim s `package.json` pri svakom izdanju.

---

## Autentifikacija

Svi zahtjevi na `/a2a` zahtijevaju API ključ putem zaglavlja `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Ako na poslužitelju nije konfiguriran API ključ, autentifikacija se preskače.

## Aktivacija

A2A se kontrolira preklopnikom **Endpoints → A2A** i zadano je onemogućen. Kada je onemogućen,
`GET /api/a2a/status` prijavljuje `status: "disabled"` i `online: false`; JSON-RPC pozivi na
`POST /a2a` vraćaju HTTP 503 s JSON-RPC kodom greške `-32000`.

---

## Metode JSON-RPC 2.0

### `message/send` — Sinkrono izvršavanje

Šalje poruku vještini i čeka potpuni odgovor.

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

Za `smart-routing`, `metadata.combo` izričito nadjačava
`metadata.model` za zahtjev prema pristupniku; šalje se kao stvarni `model`,
a ne kao zanemareno JSON polje `x-combo`. I dalje se primjenjuju uobičajeni API ključ
pristupnika i autorizacija za pojedinačno odredište. Nevažeća ili prazna kombinacija odbija se.

Rezultat izlaže `requested_combo` (namjera pozivatelja), `dispatched_model`
(stvarni zahtjev prema pristupniku), `response_model` (odgovor pristupnika) i
`confirmed_combo`. Posljednje polje ima vrijednost `null`, osim ako pristupnik izričito
identificira kombinaciju. A2A zapisnici odluka pripisuju izvršavanje samo
potvrđenoj kombinaciji, zadržavajući nepotvrđeni zahtjev kao `requestedCombo`.

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

### `message/stream` — SSE strujanje

Isto kao `message/send`, ali vraća događaje koje poslužitelj šalje za strujanje u stvarnom vremenu.

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

**SSE događaji:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Dohvaćanje statusa zadatka

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Otkazivanje zadatka

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Dostupne vještine

OmniRoute izlaže 6 A2A vještina povezanih u `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Svaki modul vještine živi u `src/lib/a2a/skills/`.

| Vještina              | ID                   | Opis                                                                                                                                                       | oznake                          | Primjeri                                     |
| :-------------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ | :------------------------------------------- |
| Pametno usmjeravanje  | `smart-routing`      | Usmjerava upit kroz optimalni provider/combo koristeći OmniRoute-ov kombinirani mehanizam + bodovanja                                                      | usmjeravanje, pružatelji usluga | "Usmjeri ovaj upit putem najboljeg modela"   |
| Upravljanje kvotama   | `quota-management`   | Izvještava o stanju kvote po pružatelju, pomaže pozivateljima da odluče kada će throttle/switch                                                            | kvota, pružatelji usluga        | "Provjeri kvotu za anthropic"                |
| Provider Discovery    | `provider-discovery` | Popisuje instalirane pružatelje s mogućnostima, zastavicama besplatnog sloja, OAuth statusom                                                               | pružatelji, otkriće             | "Koji su pružatelji dostupni?"               |
| Analiza troškova      | `cost-analysis`      | Procjenjuje cijenu request/conversation s obzirom na nedavnu upotrebu + kataloga                                                                           | trošak, korištenje              | "Procijeni cijenu za ovaj razgovor"          |
| Zdravstveni izvještaj | `health-report`      | Prekidač strujnog kruga agregata, hlađenje, stanje zaključavanja po pružatelju                                                                             | zdravlje, otpornost             | "Prikaži zdravstveno stanje svih pružatelja" |
| Popis mogućnosti      | `list-capabilities`  | Vraća cijeli katalog s 45 unosa Agent Skills (23 API + 21 CLI + 1 konfiguracija) kao tablicu označavanja s neobrađenim SKILL.md URLs za umetanje konteksta | katalog, otkriće, vještine      | "Popis svih OmniRoute mogućnosti"            |

> Kartica agenta treba biti usklađena s aktivnim katalogom 381 pružatelja; broj pružatelja i free/no-auth metapodaci potječu iz registra vremena izvođenja.

### `list-capabilities` Detalji o vještini

Vještina `list-capabilities` posebno je korisna za vanjske agente koji trebaju otkriti što OmniRoute izlaže prije slanja API poziva. Vraća artefakt strukturirane tablice smanjenja:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Svaki red uključuje stupac `rawUrl` tako da agenti mogu odmah dohvatiti puni SKILL.md. Polje `metadata.totalSkills` odražava veličinu kataloga (45 danas). Implementacija: `src/lib/a2a/skills/listCapabilities.ts`. Vidi također [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (pomoćni)

Krajnja točka JSON-RPC `/a2a` je kanonska ulazna točka A2A. REST krajnje točke u nastavku pružaju pomoćni pristup nadzornim pločama i vanjskim alatima:

| Krajnja točka                | metoda | Opis                                                        | Auth                                                                                                         |
| :--------------------------- | :----- | :---------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET    | Status poslužitelja, registrirane vještine                  | (javnost)                                                                                                    |
| `/api/a2a/tasks`             | GET    | Popis zadataka s filtrima                                   | upravljanje ili API ključ (pogledajte dolje)                                                                 |
| `/api/a2a/tasks/[id]`        | GET    | Dobiti zadatak od ID                                        | upravljanje ili API ključ (pogledajte dolje)                                                                 |
| `/api/a2a/tasks/[id]/cancel` | POST   | Otkaži pokrenuti zadatak                                    | upravljanje ili API ključ (pogledajte dolje)                                                                 |
| `/.well-known/agent.json`    | GET    | Kartica agenta (otkrivanje A2A )                            | (javno, predmemorirano 3600s)                                                                                |
| `/api/a2a/tasks`             | POST   | Dolazna delegacija u OmniConductor flotu (Dirigent PRD RF5) | isto kao `GET`, plus `OMNIROUTE_API_KEY` ako je postavljeno dok je `REQUIRE_API_KEY` isključen; `a2aEnabled` |

Tko će doći do `/api/a2a/tasks*` ruta ovisi o postavkama prijave i API-ključa:

- `requireLogin=true` (zadano): srednji softver priznaje samo vjerodajnice za upravljanje (sesija nadzorne ploče, `manage` -scope API ključ, `oma_` pristupni token) i `OMNIROUTE_API_KEY`. Običan ključ za zaključivanje dobiva `403`. U `Authorization` zaglavlju međuprogram uzima samo `OMNIROUTE_API_KEY` kao `Bearer <key>`; gola tipka ili kartica nakon `Bearer` dobiva `401`.
- `requireLogin=false`, ili prozor povratne petlje prije uključivanja: uz `REQUIRE_API_KEY=true` se prihvaća svaki važeći OmniRoute API ključ ili vjerodajnica za upravljanje, a anonimni pozivatelji dobivaju `401`; sa `REQUIRE_API_KEY` off rute su otvorene.
- `POST /api/a2a/tasks` dodatno zahtijeva `OMNIROUTE_API_KEY` u `Authorization` zaglavlju kada je ta varijabla postavljena, a `REQUIRE_API_KEY` isključen. Ostala zaglavlja, kao što je `x-api-key`, tu se ne računaju. Uz isključenu prijavu ili prije uključivanja, ključ prolazi sa ili bez `Bearer` prefiksa; s uključenom prijavom, samo `Bearer <key>` prolazi kroz srednji softver.

Gdje je potrebna vjerodajnica, `read` -scope `oma_` token radi samo za `GET`.

**Delegiranje ulaznog dirigenta (`POST /api/a2a/tasks`):** vanjski A2A agenti delegiraju posao kodiranja OmniConductor floti kroz OmniRoute. Tijelo: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — mogu se delegirati samo vještine flote dirigenta (one najavljene na kartici agenta); `metadata.conductor.repo.url` je potreban (flota radi na git reposima). Ruta se prevodi u `POST /v1/tasks` čvorišta koristeći `CONDUCTOR_ORCHESTRATOR_TOKEN` na strani poslužitelja (zamjenski `CONDUCTOR_HUB_TOKEN`) i vraća `201 { conductor_task_id, state: "submitted" }`; stanja zadatka teku natrag kroz SSE→A2A zrcalo (RF1) i vidljiva su preko `GET /api/a2a/tasks?skill=conductor`.

---

## Dodavanje nove vještine

1. **Stvorite datoteku s vještinama:** `src/lib/a2a/skills/<your-skill>.ts`

   Izvezite asinkronu funkciju `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Slijedite oblik postojećih vještina kao što je `smartRouting.ts`. Ako vještina poziva natrag u OmniRoute preko HTTP, izgradite zaglavlja sa `buildSelfLoopHeaders(caller)` iz `src/lib/a2a/selfLoopAuth.ts` tako da se poziv izvodi s ključem pozivatelja A2A, a ne `OMNIROUTE_API_KEY`, i proslijedite `redirect: "error"` u `fetch` tako da preusmjeravanje nikad ne dobije ključ. Pomoćnik samo gradi zaglavlja; svaka vještina sama postavlja politiku preusmjeravanja. Izbacuje `UnsafeSelfLoopTargetError` umjesto da prilaže ključ kada je riješeni osnovni URL obični http izvan privatne mreže (povratna petlja, naziv spremnika ili usluge i privatne adrese su u redu) ili drži vjerodajnice, tako da vještina koja guta odbijene pozive mora ponovno izbaciti tu pogrešku.

2. **Rukovatelj registracijom:** u `src/lib/a2a/taskExecution.ts` dodajte unos u `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Izložite u kartici agenta:** u `src/lib/a2a/agentCardMetadata.ts` (dijele `/.well-known/agent.json` i `/.well-known/agent-card.json`), dodajte `skills` nizu:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Napiši testove:** `tests/unit/a2a-<your-skill>.test.ts`. Cover happy path + error path.

5. **Dokument** nova vještina u `Available Skills` tablici ove datoteke.

---

## TTL zadataka

Zadaci istječu nakon `ttlMinutes` (zadano 5 min) — konfigurirano u konstruktoru `A2ATaskManager` na `src/lib/a2a/taskManager.ts:82`. Za prilagodbu, forkajte instancijaciju `A2ATaskManager` i proslijedite drugu vrijednost (npr. `new A2ATaskManager(15)` za TTL od 15 minuta). Pozadinski interval briše istekle zadatke svakih 60 sekundi.

---

## Životni ciklus zadatka

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Zadaci istječu nakon 5 minuta prema zadanim postavkama (pogledajte [TTL zadataka](#ttl-zadataka))
- Terminalna stanja: `completed`, `failed`, `cancelled`
- Evidencija događaja prati svaki prijelaz stanja

---

## Kodovi pogrešaka

| Kod    | Značenje                            |
| :----- | :---------------------------------- |
| -32700 | Greška parsiranja (neispravan JSON) |
| -32600 | Neispravan zahtjev / Neovlašteno    |
| -32601 | Metoda ili vještina nije pronađena  |
| -32602 | Neispravni parametri                |
| -32603 | Interna greška                      |
| -32000 | A2A krajnja točka je onemogućena    |

---

## Primjeri integracije

### Python (zahtjevi)

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

### TypeScript (dohvati)

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
