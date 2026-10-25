# OmniRoute A2A Server Documentation (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-til-agent-protokol v0.3 — OmniRoute som en intelligent routingagent

A2A-grænsefladen har to sider:

- **JSON-RPC 2.0** på `POST /a2a` (kanonisk indgangspunkt, defineret i `src/app/a2a/route.ts`).
- **REST** under `/api/a2a/*` til dashboards og værktøjer (status, opgaveliste, annullering).

Opgaver spores af `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, som standard 5 minutters TTL). Færdigheder videresendes via `A2A_SKILL_HANDLERS` i `src/lib/a2a/taskExecution.ts`.

## Agentregistrering

```bash
curl http://localhost:20128/.well-known/agent.json
```

Returnerer agentkortet, der beskriver OmniRoutes funktioner, færdigheder og godkendelseskrav.

Agentkortets `version`-felt hentes fra `process.env.npm_package_version` (se `src/app/.well-known/agent.json/route.ts:13`), så det automatisk holdes synkroniseret med `package.json` ved hver udgivelse.

---

## Godkendelse

Alle anmodninger til `/a2a` kræver en API-nøgle via `Authorization`-headeren:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Hvis der ikke er konfigureret en API-nøgle på serveren, omgås godkendelsen.

## Aktivering

A2A styres af indstillingen **Endpoints → A2A** og er som standard deaktiveret. Når den er deaktiveret,
rapporterer `GET /api/a2a/status` `status: "disabled"` og `online: false`; JSON-RPC-kald til
`POST /a2a` returnerer HTTP 503 med JSON-RPC-fejlkoden `-32000`.

---

## JSON-RPC 2.0-metoder

### `message/send` — Synkron udførelse

Sender en meddelelse til en skill og venter på det fuldstændige svar.

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

For `smart-routing` er `metadata.combo` en eksplicit tilsidesættelse af
`metadata.model` for gateway-anmodningen. Den sendes som den faktiske `model`,
ikke som et ignoreret `x-combo`-JSON-felt. Gatewayens normale API-nøgle og
godkendelse pr. destination gælder stadig. En ugyldig eller tom combo afvises.

Resultatet indeholder `requested_combo` (kalderens hensigt), `dispatched_model`
(den faktiske gateway-anmodning), `response_model` (gateway-svaret) og
`confirmed_combo`. Det sidste felt er `null`, medmindre gatewayen udtrykkeligt
identificerer en combo. A2A-beslutningslogfiler tilskriver kun udførelsen til en
bekræftet combo og bevarer en ubekræftet anmodning som `requestedCombo`.

**Svar:**

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

### `message/stream` — SSE-streaming

Samme som `message/send`, men returnerer Server-Sent Events til streaming i realtid.

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

**SSE-hændelser:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Forespørg på opgavestatus

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Annuller en opgave

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Tilgængelige færdigheder

OmniRoute eksponerer 6 A2A-færdigheder, der er konfigureret i `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Hvert færdighedsmodul ligger i `src/lib/a2a/skills/`.

| Færdighed          | ID                   | Beskrivelse                                                                                                                                          | Tags                       | Eksempler                                   |
| :----------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :------------------------------------------ |
| Smart Routing      | `smart-routing`      | Dirigerer en prompt gennem den optimale udbyder/kombination ved hjælp af OmniRoutes combo-motor + scoring                                            | routing, providers         | "Dirigér denne prompt via den bedste model" |
| Quota Management   | `quota-management`   | Rapporterer kvotetilstand pr. udbyder og hjælper kaldere med at beslutte, hvornår der skal begrænses/skiftes                                         | quota, providers           | "Tjek kvoten for anthropic"                 |
| Provider Discovery | `provider-discovery` | Viser installerede udbydere med funktioner, free-tier-flag og OAuth-status                                                                           | providers, discovery       | "Hvilke udbydere er tilgængelige?"          |
| Cost Analysis      | `cost-analysis`      | Estimerer omkostningerne ved en forespørgsel/samtale ud fra kataloget + det seneste forbrug                                                          | cost, usage                | "Estimér omkostningerne for denne samtale"  |
| Health Report      | `health-report`      | Samler circuit breaker-, cooldown- og lockout-tilstand pr. udbyder                                                                                   | health, resilience         | "Vis sundhedsstatus for alle udbydere"      |
| List Capabilities  | `list-capabilities`  | Returnerer hele Agent Skills-kataloget med 45 poster (23 API + 21 CLI + 1 config) som en markdown-tabel med rå SKILL.md-URL'er til kontekstinjektion | catalog, discovery, skills | "List alle OmniRoute-funktioner"            |

> Agent Card bør holdes ajour med det aktuelle katalog over 375 udbydere; udbyderantal og free/no-auth-metadata hentes fra runtime-registret.

### Detaljer om `list-capabilities`-færdigheden

`list-capabilities`-færdigheden er særligt nyttig for eksterne agenter, der har brug for at opdage, hvad OmniRoute eksponerer, før de sender API-kald. Den returnerer en struktureret markdown-tabel som artefakt:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Hver række indeholder kolonnen `rawUrl`, så agenter straks kan hente hele SKILL.md. Feltet `metadata.totalSkills` afspejler katalogstørrelsen (45 i dag). Implementering: `src/lib/a2a/skills/listCapabilities.ts`. Se også [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (supplerende)

JSON-RPC-slutpunktet `/a2a` er det kanoniske A2A-indgangspunkt. REST-slutpunkterne nedenfor giver supplerende adgang til dashboards og eksterne værktøjer:

| Slutpunkt                    | Metode | Beskrivelse                                                       | Godkendelse                                   |
| :--------------------------- | :----- | :---------------------------------------------------------------- | :-------------------------------------------- |
| `/api/a2a/status`            | GET    | Serverstatus, registrerede færdigheder                            | (offentlig)                                   |
| `/api/a2a/tasks`             | GET    | Vis opgaver med filtre                                            | administration                                |
| `/api/a2a/tasks/[id]`        | GET    | Hent opgave efter ID                                              | administration                                |
| `/api/a2a/tasks/[id]/cancel` | POST   | Annuller igangværende opgave                                      | administration                                |
| `/.well-known/agent.json`    | GET    | Agentkort (A2A-registrering)                                      | (offentlig, cachelagret i 3600s)              |
| `/api/a2a/tasks`             | POST   | Indgående delegering til OmniConductor-flåden (Conductor PRD RF5) | Bearer mod `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Indgående Conductor-delegering (`POST /api/a2a/tasks`):** Eksterne A2A-agenter delegerer programmeringsarbejde til OmniConductor-flåden gennem OmniRoute. Brødtekst: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — kun Conductor-flådens færdigheder (dem, der annonceres på agentkortet) kan delegeres; `metadata.conductor.repo.url` er påkrævet (flåden arbejder på git-repositorier). Ruten oversættes til hubbens `POST /v1/tasks` ved hjælp af `CONDUCTOR_ORCHESTRATOR_TOKEN` på serversiden (med `CONDUCTOR_HUB_TOKEN` som reserve) og returnerer `201 { conductor_task_id, state: "submitted" }`; opgavetilstande sendes tilbage gennem SSE→A2A-spejlingen (RF1) og kan ses via `GET /api/a2a/tasks?skill=conductor`.

---

## Tilføjelse af en ny færdighed

1. **Opret færdighedsfil:** `src/lib/a2a/skills/<your-skill>.ts`

   Eksportér en asynkron funktion `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Følg strukturen i eksisterende færdigheder såsom `smartRouting.ts`.

2. **Registrer handler:** Tilføj en post til `A2A_SKILL_HANDLERS` i `src/lib/a2a/taskExecution.ts`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...eksisterende færdigheder
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Eksponér på agentkortet:** Tilføj følgende til `skills`-arrayet i `src/app/.well-known/agent.json/route.ts`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Skriv tests:** `tests/unit/a2a-<your-skill>.test.ts`. Dæk det vellykkede forløb samt fejlforløbet.

5. **Dokumentér** den nye færdighed i tabellen `Available Skills` i denne fil.

---

## Opgavens TTL

Opgaver udløber efter `ttlMinutes` (standard er 5 min.) — konfigureret i `A2ATaskManager`-konstruktøren i `src/lib/a2a/taskManager.ts:82`. For at tilpasse dette skal du forgrene instantieringen af `A2ATaskManager` og angive en anden værdi (f.eks. `new A2ATaskManager(15)` for en TTL på 15 minutter). Et baggrundsinterval rydder udløbne opgaver hvert 60. sekund.

---

## Opgavens livscyklus

```
indsendt → under behandling → fuldført
                            → mislykket
                            → annulleret
```

- Opgaver udløber som standard efter 5 minutter (se [Opgavens TTL](#task-ttl))
- Sluttilstande: `completed`, `failed`, `cancelled`
- Hændelsesloggen registrerer hver tilstandsovergang

---

## Fejlkoder

| Kode   | Betydning                          |
| :----- | :--------------------------------- |
| -32700 | Fortolkningsfejl (ugyldig JSON)    |
| -32600 | Ugyldig anmodning/ikke godkendt    |
| -32601 | Metode eller færdighed ikke fundet |
| -32602 | Ugyldige parametre                 |
| -32603 | Intern fejl                        |
| -32000 | A2A-slutpunktet er deaktiveret     |

---

## Integrationseksempler

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
