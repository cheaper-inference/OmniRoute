# OmniRoute A2A Server Documentation (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Protocol Agent-to-Agent v0.3 — OmniRoute ca agent de rutare inteligentă

Interfața A2A are două componente:

- **JSON-RPC 2.0** la `POST /a2a` (punctul de intrare canonic, definit în `src/app/a2a/route.ts`).
- **REST** sub `/api/a2a/*` pentru panouri de control și instrumente (stare, lista sarcinilor, anulare).

Sarcinile sunt gestionate de `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL implicit de 5 minute). Abilitățile sunt direcționate prin `A2A_SKILL_HANDLERS` în `src/lib/a2a/taskExecution.ts`.

## Descoperirea agentului

```bash
curl http://localhost:20128/.well-known/agent.json
```

Returnează Cardul agentului, care descrie capabilitățile, abilitățile și cerințele de autentificare ale OmniRoute.

Câmpul `version` al Cardului agentului este preluat din `process.env.npm_package_version` (consultați `src/app/.well-known/agent.json/route.ts:13`), astfel încât rămâne sincronizat automat cu `package.json` la fiecare versiune lansată.

---

## Autentificare

Toate solicitările către `/a2a` necesită o cheie API transmisă prin antetul `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Dacă pe server nu este configurată nicio cheie API, autentificarea este omisă.

## Activare

A2A este controlat prin comutatorul **Puncte finale → A2A** și este dezactivat în mod implicit. Când este dezactivat,
`GET /api/a2a/status` raportează `status: "disabled"` și `online: false`; apelurile JSON-RPC către
`POST /a2a` returnează HTTP 503 cu codul de eroare JSON-RPC `-32000`.

---

## Metode JSON-RPC 2.0

### `message/send` — Execuție sincronă

Trimite un mesaj către o abilitate și așteaptă răspunsul complet.

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

Pentru `smart-routing`, `metadata.combo` suprascrie în mod explicit
`metadata.model` pentru cererea către gateway; acesta este trimis drept câmpul `model` real,
nu drept un câmp JSON `x-combo` ignorat. Autorizarea obișnuită a gateway-ului, bazată pe cheia API și
specifică fiecărei destinații, se aplică în continuare. Un combo nevalid sau gol este respins.

Rezultatul expune `requested_combo` (intenția apelantului), `dispatched_model`
(cererea efectivă către gateway), `response_model` (răspunsul gateway-ului) și
`confirmed_combo`. Ultimul câmp este `null`, cu excepția cazului în care gateway-ul
identifică în mod explicit un combo. Jurnalele de decizie A2A atribuie execuția numai unui
combo confirmat, păstrând o cerere neconfirmată drept `requestedCombo`.

**Răspuns:**

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

### `message/stream` — Streaming SSE

La fel ca `message/send`, dar returnează evenimente trimise de server pentru streaming în timp real.

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

**Evenimente SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Interogarea stării sarcinii

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Anularea unei sarcini

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Abilități disponibile

OmniRoute expune 6 abilități A2A conectate în `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Fiecare modul de abilități locuiește în `src/lib/a2a/skills/`.

| Îndemânare                | ID                   | Descriere                                                                                                                                                                          | Etichete                         | Exemple                                             |
| :------------------------ | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------- | :-------------------------------------------------- |
| Rutare inteligentă        | `smart-routing`      | Direcționează un prompt prin provider/combo optimă utilizând scorul + al motorului combinat al OmniRoute                                                                           | rutare, furnizori                | „Dirijați acest prompt prin cel mai bun model”      |
| Managementul cotelor      | `quota-management`   | Raportează starea cotei pentru fiecare furnizor, îi ajută pe apelanți să decidă când să throttle/switch                                                                            | cotă, furnizori                  | „Verificați cota pentru antropic”                   |
| Descoperirea furnizorului | `provider-discovery` | Enumeră furnizorii instalați cu capacități, indicatori de nivel gratuit, starea OAuth                                                                                              | furnizori, descoperire           | „Ce furnizori sunt disponibili?”                    |
| Analiza costurilor        | `cost-analysis`      | Estimează costul unui request/conversation având în vedere utilizarea recentă a catalogului +                                                                                      | cost, utilizare                  | „Cost estimat pentru această conversație”           |
| Raport de sănătate        | `health-report`      | Agregă întrerupător, răcire, stare de blocare per furnizor                                                                                                                         | sănătate, rezistență             | „Afișați starea de sănătate a tuturor furnizorilor” |
| Lista de capabilități     | `list-capabilities`  | Returnează catalogul complet de abilități de agent cu 45 de intrări (23 API + 21 CLI + 1 configurație) ca un tabel de reducere cu SKILL.md URLs brut pentru injectarea contextului | catalog, descoperire, aptitudini | „Enumerați toate capabilitățile OmniRoute ”         |

> Cardul de agent trebuie menținut aliniat cu catalogul live 384 de furnizori; numărul furnizorilor și metadatele free/no-auth sunt obținute din registrul de rulare.

### `list-capabilities` Detaliu abilitate

Abilitatea `list-capabilities` este deosebit de utilă pentru agenții externi care trebuie să descopere ce expune OmniRoute înainte de a trimite apeluri API. Returnează un artefact structurat de tabel de reducere:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Fiecare rând include coloana `rawUrl`, astfel încât agenții să poată prelua imediat SKILL.md complet. Câmpul `metadata.totalSkills` reflectă dimensiunea catalogului (45 astăzi). Implementare: `src/lib/a2a/skills/listCapabilities.ts`. Vezi și [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (auxiliar)

Punctul final JSON-RPC `/a2a` este punctul de intrare canonic A2A. Punctele finale REST de mai jos oferă acces auxiliar pentru tablouri de bord și instrumente externe:

| Punct final                  | Metodă | Descriere                                                         | Auth                                                                                                                 |
| :--------------------------- | :----- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET    | Stare server, competențe înregistrate                             | (public)                                                                                                             |
| `/api/a2a/tasks`             | GET    | Listează sarcinile cu filtre                                      | management sau cheie API (vezi mai jos)                                                                              |
| `/api/a2a/tasks/[id]`        | GET    | Obțineți sarcina de la ID                                         | management sau cheie API (vezi mai jos)                                                                              |
| `/api/a2a/tasks/[id]/cancel` | POST   | Anulați sarcina de rulare                                         | management sau cheie API (vezi mai jos)                                                                              |
| `/.well-known/agent.json`    | GET    | Card de agent (A2A discovery)                                     | (public, cache 3600s)                                                                                                |
| `/api/a2a/tasks`             | POST   | Delegare de intrare către flota OmniConductor (Conductor PRD RF5) | la fel ca `GET`, plus `OMNIROUTE_API_KEY` dacă este setat în timp ce `REQUIRE_API_KEY` este dezactivat; `a2aEnabled` |

Cine ajunge la rutele `/api/a2a/tasks*` depinde de setările de conectare și cheie API:

- `requireLogin=true` (implicit): middleware-ul admite doar acreditările de gestionare (sesiune de tablou de bord, cheie `manage` -scope API, token de acces `oma_` ) și `OMNIROUTE_API_KEY`. O cheie de inferență simplă devine `403`. În antetul `Authorization` middleware-ul ia doar `OMNIROUTE_API_KEY` ca `Bearer <key>`; o cheie goală sau o filă după ce `Bearer` devine `401`.
- `requireLogin=false`, sau fereastra de loopback înainte de integrare: cu `REQUIRE_API_KEY=true` orice cheie OmniRoute API validă sau autentificare de gestionare este acceptată și apelanții anonimi primesc `401`; cu `REQUIRE_API_KEY` off rutele sunt deschise.
- `POST /api/a2a/tasks` necesită în plus `OMNIROUTE_API_KEY` în antetul `Authorization` atunci când acea variabilă este setată și `REQUIRE_API_KEY` este dezactivat. Alte anteturi, cum ar fi `x-api-key`, nu sunt luate în considerare acolo. Cu conectarea dezactivată sau înainte de îmbarcare, cheia trece cu sau fără prefix `Bearer` ; cu autentificarea, doar `Bearer <key>` trece de middleware.

Acolo unde este necesară o acreditare, un jeton `read` -scope `oma_` funcționează numai pentru `GET`.

**Delegarea conducătorului de intrare (`POST /api/a2a/tasks`):** agenții externi A2A delegă munca de codificare flotei OmniConductor prin OmniRoute. Corp: numai `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — Abilitățile de flota de dirijor (cele anunțate pe Cardul de agent) sunt delegabile; `metadata.conductor.repo.url` este necesar (flota funcționează pe git repos). Ruta se traduce în `POST /v1/tasks` al hub-ului folosind `CONDUCTOR_ORCHESTRATOR_TOKEN` de pe partea serverului ( `CONDUCTOR_HUB_TOKEN` de rezervă) și returnează `201 { conductor_task_id, state: "submitted" }`; stările sarcinii curg înapoi prin oglinda SSE→A2A (RF1) și sunt vizibile prin `GET /api/a2a/tasks?skill=conductor`.

---

## Adăugarea unei noi abilități

1. **Creați fișierul de abilități:** `src/lib/a2a/skills/<your-skill>.ts`

   Exportați o funcție asincronă `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Urmăriți forma abilităților existente, cum ar fi `smartRouting.ts`. Dacă skill-ul apelează înapoi în OmniRoute peste HTTP, construiți anteturile cu `buildSelfLoopHeaders(caller)` din `src/lib/a2a/selfLoopAuth.ts`, astfel încât apelul să ruleze cu cheia apelantului A2A, nu `OMNIROUTE_API_KEY`, și transmiteți `redirect: "error"` către `fetch` astfel încât o redirecționare să nu primească niciodată cheia. Ajutorul construiește doar anteturi; fiecare abilitate stabilește însăși politica de redirecționare. Aruncă `UnsafeSelfLoopTargetError` mai degrabă decât atașează o cheie atunci când URL de bază rezolvată este simplu http în afara rețelei private (loopback, un nume de container sau serviciu și adresele private sunt în regulă) sau deține acreditări, așa că o abilitate care înghite apelurile respinse trebuie să reintroducă acea eroare.

2. **Înregistrare handler:** în `src/lib/a2a/taskExecution.ts`, adăugați o intrare la `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Expuneți în cardul de agent:** în `src/lib/a2a/agentCardMetadata.ts` (partajat de `/.well-known/agent.json` și `/.well-known/agent-card.json`), adăugați la matricea `skills` :

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Scrie teste:** `tests/unit/a2a-<your-skill>.test.ts`. Acoperiți calea de eroare + fericită.

5. **Document** noua abilitate din tabelul `Available Skills` al acestui fișier.

---

## TTL-ul sarcinilor

Sarcinile expiră după `ttlMinutes` (implicit 5 min) — configurat în constructorul `A2ATaskManager` din `src/lib/a2a/taskManager.ts:82`. Pentru personalizare, creați o variantă proprie a instanțierii `A2ATaskManager` și transmiteți o valoare diferită (de exemplu, `new A2ATaskManager(15)` pentru un TTL de 15 minute). Un interval de fundal elimină sarcinile expirate la fiecare 60 de secunde.

---

## Ciclul de viață al sarcinilor

```
trimisă → în lucru → finalizată
                     → eșuată
                     → anulată
```

- Sarcinile expiră implicit după 5 minute (consultați [TTL-ul sarcinilor](#task-ttl))
- Stări terminale: `completed`, `failed`, `cancelled`
- Jurnalul de evenimente urmărește fiecare tranziție de stare

---

## Coduri de eroare

| Cod    | Semnificație                           |
| :----- | :------------------------------------- |
| -32700 | Eroare de parsare (JSON nevalid)       |
| -32600 | Cerere nevalidă / Neautorizat          |
| -32601 | Metoda sau abilitatea nu a fost găsită |
| -32602 | Parametri nevalizi                     |
| -32603 | Eroare internă                         |
| -32000 | Endpoint-ul A2A este dezactivat        |

---

## Exemple de integrare

### Python (cereri)

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

### TypeScript (preluare)

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
