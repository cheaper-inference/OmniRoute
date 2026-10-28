# OmniRoute A2A Server Documentation (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

# Dokumentacija OmniRoute A2A servera

> Agent-to-Agent protokol v0.3 — OmniRoute kao inteligentni agent za rutiranje

A2A površina ima dva aspekta:

- **JSON-RPC 2.0** na `POST /a2a` (kanonična ulazna tačka, definisana u `src/app/a2a/route.ts`).
- **REST** na `/api/a2a/*` za nadzorne ploče i alate (status, lista zadataka, otkazivanje).

Zadaci se prate pomoću `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, podrazumevano 5-minutni TTL). Vještine se šalju putem `A2A_SKILL_HANDLERS` u `src/lib/a2a/taskExecution.ts`.

## Otkrivanje agenta

```bash
curl http://localhost:20128/.well-known/agent.json
```

Vraća Agent Card koji opisuje mogućnosti OmniRoute-a, njegove vještine i zahtjeve za autentifikaciju.

Polje `version` u Agent Card-u se uzima iz `process.env.npm_package_version` (vidi `src/app/.well-known/agent.json/route.ts:13`), tako da je automatski sinhronizovano sa `package.json` pri svakom izdanju.

---

## Autentifikacija

Svi zahtjevi na `/a2a` zahtijevaju API ključ putem `Authorization` headera:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Ako API ključ nije konfigurisan na serveru, autentifikacija se zaobilazi.

## Omogućavanje

A2A je kontrolisan prekozogtača **Endpoints → A2A** i je onemogućen podrazumevano. Kada je onemogućen,
`GET /api/a2a/status` raportira `status: "disabled"` i `online: false`; JSON-RPC pozivi na
`POST /a2a` vraćaju HTTP 503 sa JSON-RPC error kodom `-32000`.

---

## JSON-RPC 2.0 metode

### `message/send` — Sinhrono izvršavanje

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

Za `smart-routing`, `metadata.combo` predstavlja eksplicitno nadjačavanje vrijednosti
`metadata.model` za zahtjev prema mrežnom prolazu; šalje se kao stvarni `model`,
a ne kao zanemareno JSON polje `x-combo`. Uobičajena autorizacija mrežnog prolaza putem API ključa i
autorizacija po ciljnom sistemu i dalje se primjenjuju. Nevažeća ili prazna kombinacija se odbija.

Rezultat izlaže `requested_combo` (namjera pozivaoca), `dispatched_model`
(stvarni zahtjev prema mrežnom prolazu), `response_model` (odgovor mrežnog prolaza) i
`confirmed_combo`. Posljednje polje je `null` osim ako mrežni prolaz eksplicitno
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

### `message/stream` — SSE prijenos

Isto kao `message/send`, ali vraća događaje koje šalje server radi prijenosa u stvarnom vremenu.

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

### `tasks/get` — Provjera statusa zadatka

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

OmniRoute otkriva 6 A2A vještina povezanih u `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Svaki modul vještina živi u `src/lib/a2a/skills/`.

| Vještina            | ID                   | Opis                                                                                                                                               | Oznake                     | Primjeri                                           |
| :------------------ | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :------------------------------------------------- |
| Smart Routing       | `smart-routing`      | Usmjerava prompt kroz optimalni provider/combo koristeći OmniRoute combo engine + bodovanje                                                        | rutiranje, provajderi      | "Usmjerite ovaj upit preko najboljeg modela"       |
| Upravljanje kvotama | `quota-management`   | Izvještava o stanju kvote po provajderu, pomaže pozivaocima da odluče kada da throttle/switch                                                      | kvota, provajderi          | "Provjerite kvotu za antropske životinje"          |
| Provider Discovery  | `provider-discovery` | Popisuje instalirane provajdere sa mogućnostima, free-tier flags, OAuth status                                                                     | provajderi, otkriće        | "Koji su provajderi dostupni?"                     |
| Analiza troškova    | `cost-analysis`      | Procjenjuje cijenu request/conversation s obzirom na nedavnu upotrebu kataloga +                                                                   | trošak, upotreba           | "Procjena cijene za ovaj razgovor"                 |
| Health Report       | `health-report`      | Zbirni prekidač, hlađenje, stanje zaključavanja po dobavljaču                                                                                      | zdravlje, otpornost        | "Prikaži zdravstveno stanje svih pružalaca usluga" |
| Navedite mogućnosti | `list-capabilities`  | Vraća puni katalog vještina agenta od 45 unosa (23 API + 21 CLI + 1 konfig) kao tablicu smanjenja sa sirovim SKILL.md URLs za ubacivanje konteksta | katalog, otkriće, vještine | "Popis svih OmniRoute mogućnosti"                  |

> Kartica agenta treba da bude usklađena sa aktivnim katalogom 377 provajdera; Broj provajdera i free/no-auth metapodaci su izvorni iz registra vremena izvršavanja.

### `list-capabilities` Detalji vještine

Vještina `list-capabilities` je posebno korisna za vanjske agente koji trebaju otkriti šta OmniRoute otkriva prije slanja API poziva. Vraća strukturirani artefakt tabele maraka:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Svaki red uključuje `rawUrl` kolonu tako da agenti mogu odmah dohvatiti puni SKILL.md. Polje `metadata.totalSkills` odražava veličinu kataloga (45 danas). Implementacija: `src/lib/a2a/skills/listCapabilities.ts`. Vidi također [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (pomoćni)

JSON-RPC endpoint `/a2a` je kanonični A2A ulazni punkt. Ispod navedeni REST endpointi pružaju pomoćni pristup za kontrolne ploče (dashboards) i vanjske alate:

| Endpoint                     | Metoda | Opis                                                       | Auth                                         |
| :--------------------------- | :----- | :--------------------------------------------------------- | :------------------------------------------- |
| `/api/a2a/status`            | GET    | Status servera, registrovane vještine (skills)             | (javno)                                      |
| `/api/a2a/tasks`             | GET    | Lista zadataka sa filterima                                | management                                   |
| `/api/a2a/tasks/[id]`        | GET    | Dohvati zadatak prema ID-u                                 | management                                   |
| `/api/a2a/tasks/[id]/cancel` | POST   | Otkaži pokrenuti zadatak                                   | management                                   |
| `/.well-known/agent.json`    | GET    | Agent Card (A2A otkrivanje)                                | (javno, keširano 3600s)                      |
| `/api/a2a/tasks`             | POST   | Inbound delegacija OmniConductor floti (Conductor PRD RF5) | Bearer vs `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Inbound Conductor delegacija (`POST /api/a2a/tasks`):** vanjski A2A agenti delegiraju programerski rad OmniConductor floti putem OmniRoute-a. Body: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — samo vještine Conductor flote (one koje su objavljene na Agent Card-u) su delegabilne; `metadata.conductor.repo.url` je obavezan ( flota radi na git repozitorijima). Ruta se prevodi u `POST /v1/tasks` hub-a koristeći serverski `CONDUCTOR_ORCHESTRATOR_TOKEN` (fallback `CONDUCTOR_HUB_TOKEN`) i vraća `201 { conductor_task_id, state: "submitted" }`; statusi zadataka se vraćaju putem SSE→A2A ogledala (RF1) i vidljivi su putem `GET /api/a2a/tasks?skill=conductor`.

---

## Dodavanje nove vještine (Skill)

1. **Kreirajte datoteku vještine:** `src/lib/a2a/skills/<your-skill>.ts`

   Izvezite async funkciju `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Pratite strukturu postojećih vještina kao što je `smartRouting.ts`.

2. **Registrujte handler:** u `src/lib/a2a/taskExecution.ts`, dodajte unos u `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...postojeće vještine
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Izložite u Agent Card-u:** u `src/app/.well-known/agent.json/route.ts`, dodajte u `skills` niz:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Kratak opis fokusiran na namjeru",
     "tags": ["routing", "quota"],
     "examples": ["Primjer poziva u prirodnom jeziku"]
   }
   ```

4. **Napišite testove:** `tests/unit/a2a-<your-skill>.test.ts`. Pokrijte uspješan put (happy path) + put greške (error path).

5. **Dokumentujte** novu vještinu u tabeli `Available Skills` unutar ove datoteke.

---

## TTL zadataka

Zadaci istekuju nakon `ttlMinutes` (podrazumijevano 5 min) — konfigurirano u konstruktoru `A2ATaskManager` na `src/lib/a2a/taskManager.ts:82`. Za prilagođavanje, forkaj instancijalizaciju `A2ATaskManager` i proslijedi drugačiju vrijednost (npr. `new A2ATaskManager(15)` za TTL od 15 minuta). Pozadinski interval čisti istekle zadatke svakih 60 sekundi.

---

## Ciklus života zadataka

```
predano → u radu → završeno
                    → neuspješno
                    → otkazano
```

- Zadaci istekuju nakon 5 minuta podrazumijevo (vidi [TTL zadataka](#ttl-zadataka))
- Terminalni statusi: `completed`, `failed`, `cancelled`
- Dnevnik događaja prati svaki prijelaz stanja

---

## Kodovi grešaka

| Kod    | Značenje                           |
| :----- | :--------------------------------- |
| -32700 | Greška parsiranja (nevažeći JSON)  |
| -32600 | Nevažeći zahtjev / Neautoriziran   |
| -32601 | Metoda ili vještina nije pronađena |
| -32602 | Nevažeći parametri                 |
| -32603 | Interna greška                     |
| -32000 | A2A endpoint je onemogućen         |

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

### TypeScript (dohvatiti)

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
