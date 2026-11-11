# OmniRoute A2A Server Documentation (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute als intelligente routeringsagent

Het A2A-oppervlak heeft twee interfaces:

- **JSON-RPC 2.0** via `POST /a2a` (canoniek toegangspunt, gedefinieerd in `src/app/a2a/route.ts`).
- **REST** onder `/api/a2a/*` voor dashboards en tooling (status, takenlijst, annuleren).

Taken worden bijgehouden door `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, standaard-TTL van 5 minuten). Skills worden uitgevoerd via `A2A_SKILL_HANDLERS` in `src/lib/a2a/taskExecution.ts`.

## Agentdetectie

```bash
curl http://localhost:20128/.well-known/agent.json
```

Retourneert de Agent Card die de mogelijkheden, skills en authenticatievereisten van OmniRoute beschrijft.

Het veld `version` van de Agent Card wordt opgehaald uit `process.env.npm_package_version` (zie `src/app/.well-known/agent.json/route.ts:13`), zodat dit bij elke release automatisch gesynchroniseerd blijft met `package.json`.

---

## Authenticatie

Voor alle `/a2a`-verzoeken is een API-sleutel via de header `Authorization` vereist:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Als er op de server geen API-sleutel is geconfigureerd, wordt authenticatie overgeslagen.

## Activering

A2A wordt beheerd via de schakelaar **Endpoints → A2A** en is standaard uitgeschakeld. Wanneer A2A is uitgeschakeld,
rapporteert `GET /api/a2a/status` `status: "disabled"` en `online: false`; JSON-RPC-aanroepen naar
`POST /a2a` retourneren HTTP 503 met JSON-RPC-foutcode `-32000`.

---

## JSON-RPC 2.0-methoden

### `message/send` — Synchrone uitvoering

Stuurt een bericht naar een skill en wacht op het volledige antwoord.

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

Voor `smart-routing` is `metadata.combo` een expliciete overschrijving van
`metadata.model` voor de gatewayaanvraag; deze wordt verzonden als het daadwerkelijke `model`,
niet als een genegeerd JSON-veld `x-combo`. De normale API-sleutel- en
autorisatiecontroles per doel van de gateway blijven van toepassing. Een ongeldige of lege combo wordt geweigerd.

Het resultaat bevat `requested_combo` (intentie van de aanroeper), `dispatched_model`
(de daadwerkelijke gatewayaanvraag), `response_model` (gatewayantwoord) en
`confirmed_combo`. Het laatste veld is `null`, tenzij de gateway expliciet
een combo identificeert. A2A-beslissingslogboeken schrijven uitvoering alleen toe aan een
bevestigde combo en behouden een onbevestigde aanvraag als `requestedCombo`.

**Antwoord:**

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

Hetzelfde als `message/send`, maar retourneert Server-Sent Events voor realtime streaming.

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

**SSE-gebeurtenissen:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Taakstatus opvragen

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Een taak annuleren

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Beschikbare vaardigheden

OmniRoute onthult 6 A2A vaardigheden die zijn vastgelegd in `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Elke vaardigheidsmodule bevindt zich in `src/lib/a2a/skills/`.

| Vaardigheid                      | ID                   | Beschrijving                                                                                                                                                                          | Labels                              | Voorbeelden                                     |
| :------------------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------- | :---------------------------------------------- |
| Slimme routering                 | `smart-routing`      | Leidt een prompt door de optimale provider/combo met behulp van OmniRoute's combo-engine + -scores                                                                                    | routering, aanbieders               | "Route deze prompt via het beste model"         |
| Quotumbeheer                     | `quota-management`   | Rapporteert de quotastatus per provider, zodat bellers kunnen beslissen wanneer ze throttle/switch moeten gebruiken                                                                   | quota, leveranciers                 | "Controleer quota voor antropisch"              |
| Ontdekking van aanbieders        | `provider-discovery` | Geeft een overzicht van geïnstalleerde providers met mogelijkheden, free-tier-vlaggen en OAuth status                                                                                 | aanbieders, ontdekking              | "Welke providers zijn beschikbaar?"             |
| Kostenanalyse                    | `cost-analysis`      | Schat de kosten van een request/conversation op basis van het recente gebruik van de catalogus +                                                                                      | kosten, gebruik                     | 'Schat de kosten voor dit gesprek'              |
| Gezondheidsrapport               | `health-report`      | Verzamelt de stroomonderbreker, cooldown en lock-outstatus per provider                                                                                                               | gezondheid, veerkracht              | "Toon gezondheidsstatus van alle zorgverleners" |
| Maak een lijst van mogelijkheden | `list-capabilities`  | Retourneert de volledige Agent Skills-catalogus met 45 vermeldingen (23 API + 21 CLI + 1-configuratie) als een prijsverlagingstabel met onbewerkte SKILL.md URLs voor contextinjectie | catalogus, ontdekking, vaardigheden | "Laat alle OmniRoute mogelijkheden zien"        |

> De Agent Card moet in lijn blijven met de live 388-providercatalogus; providertellingen en free/no-auth metagegevens zijn afkomstig uit het runtime-register.

### `list-capabilities` -vaardigheidsdetail

De `list-capabilities` vaardigheid is vooral handig voor externe agenten die moeten ontdekken wat OmniRoute blootlegt voordat ze API aanroepen verzenden. Het retourneert een gestructureerd markdown-tabelartefact:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Elke rij bevat de `rawUrl` kolom, zodat agenten onmiddellijk de volledige SKILL.md kunnen ophalen. Het `metadata.totalSkills` veld weerspiegelt de catalogusgrootte (45 vandaag). Implementatie: `src/lib/a2a/skills/listCapabilities.ts`. Zie ook [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (hulp)

Het JSON-RPC-eindpunt `/a2a` is het canonieke A2A ingangspunt. De onderstaande REST eindpunten bieden aanvullende toegang voor dashboards en externe tools:

| Eindpunt                     | Methode | Beschrijving                                                       | Aut                                                                                                                     |
| :--------------------------- | :------ | :----------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET     | Serverstatus, geregistreerde vaardigheden                          | (openbaar)                                                                                                              |
| `/api/a2a/tasks`             | GET     | Maak een lijst van taken met filters                               | beheer- of API sleutel (zie hieronder)                                                                                  |
| `/api/a2a/tasks/[id]`        | GET     | Taak ophalen door ID                                               | beheer- of API sleutel (zie hieronder)                                                                                  |
| `/api/a2a/tasks/[id]/cancel` | POST    | Annuleer lopende taak                                              | beheer- of API sleutel (zie hieronder)                                                                                  |
| `/.well-known/agent.json`    | GET     | Agentkaart (A2A -ontdekking)                                       | (openbaar, 3600's in cache)                                                                                             |
| `/api/a2a/tasks`             | POST    | Inkomende delegatie naar de OmniConductor vloot (dirigent PRD RF5) | hetzelfde als `GET`, plus `OMNIROUTE_API_KEY` indien ingesteld terwijl `REQUIRE_API_KEY` is uitgeschakeld; `a2aEnabled` |

Wie toegang krijgt tot de `/api/a2a/tasks*` routes is afhankelijk van de login- en API-key-instellingen:

- `requireLogin=true` (standaard): de middleware laat alleen beheerreferenties toe (dashboardsessie, `manage` -scope API sleutel, `oma_` -toegangstoken) en `OMNIROUTE_API_KEY`. Een gewone inferentiesleutel krijgt `403`. In de `Authorization` header neemt de middleware alleen `OMNIROUTE_API_KEY` als `Bearer <key>`; een blote sleutel of een tabblad na `Bearer` krijgt `401`.
- `requireLogin=false`, of het loopback-venster vóór onboarding: met `REQUIRE_API_KEY=true` wordt elke geldige OmniRoute API sleutel of managementreferentie geaccepteerd en krijgen anonieme bellers `401`; met `REQUIRE_API_KEY` uit zijn de routes open.
- `POST /api/a2a/tasks` vereist bovendien `OMNIROUTE_API_KEY` in de `Authorization` header wanneer die variabele is ingesteld en `REQUIRE_API_KEY` is uitgeschakeld. Andere headers, zoals `x-api-key`, tellen daar niet mee. Bij het uitloggen of vóór het onboarden worden de sleutelpassen met of zonder `Bearer` -voorvoegsel; als je inlogt, komt alleen `Bearer <key>` voorbij de middleware.

Wanneer een referentie vereist is, werkt een `read` -scope `oma_` token alleen voor `GET`.

**Delegatie van inkomende dirigenten (`POST /api/a2a/tasks`):** externe A2A agenten delegeren codeerwerk aan de OmniConductor vloot via OmniRoute. Lichaam: alleen `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — Vaardigheden van de conducteursvloot (die aangekondigd op de agentenkaart) zijn delegeerbaar; `metadata.conductor.repo.url` is vereist (de vloot werkt op git repo's). De route vertaalt zich naar de `POST /v1/tasks` van de hub met behulp van de `CONDUCTOR_ORCHESTRATOR_TOKEN` aan de serverzijde (fallback `CONDUCTOR_HUB_TOKEN`) en retourneert `201 { conductor_task_id, state: "submitted" }`; taakstatussen vloeien terug via de SSE→A2A spiegel (RF1) en zijn zichtbaar via `GET /api/a2a/tasks?skill=conductor`.

---

## Een nieuwe vaardigheid toevoegen

1. **Vaardigheidsbestand maken:** `src/lib/a2a/skills/<your-skill>.ts`

   Exporteer een asynchrone functie `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Volg de vorm van bestaande vaardigheden zoals `smartRouting.ts`. Als de vaardigheid terugroept naar OmniRoute via HTTP, bouw dan de headers met `buildSelfLoopHeaders(caller)` vanaf `src/lib/a2a/selfLoopAuth.ts` zodat de oproep wordt uitgevoerd met de sleutel van de A2A beller, niet met `OMNIROUTE_API_KEY`, en geef `redirect: "error"` door aan `fetch` zodat een omleiding nooit de sleutel krijgt. De helper bouwt alleen headers; elke vaardigheid stelt zelf het omleidingsbeleid in. Het gooit `UnsafeSelfLoopTargetError` in plaats van een sleutel toe te voegen wanneer de opgeloste basis- URL gewoon http buiten het privénetwerk is (loopback, een container- of servicenaam en privéadressen zijn prima) of inloggegevens bevat, dus een vaardigheid die afgewezen oproepen slikt, moet die fout opnieuw genereren.

2. **Registerbehandelaar:** Voeg in `src/lib/a2a/taskExecution.ts` een vermelding toe aan `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Blootstellen op agentkaart:** in `src/lib/a2a/agentCardMetadata.ts` (gedeeld door `/.well-known/agent.json` en `/.well-known/agent-card.json`), voeg toe aan de `skills` array:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Schrijf testen:** `tests/unit/a2a-<your-skill>.test.ts`. Bedek het gelukkige pad + foutpad.

5. **Document** de nieuwe vaardigheid in de `Available Skills` tabel van dit bestand.

---

## TTL van taken

Taken verlopen na `ttlMinutes` (standaard 5 min.) — geconfigureerd in de constructor van `A2ATaskManager` op `src/lib/a2a/taskManager.ts:82`. Om dit aan te passen, maakt u een fork van de instantiëring van `A2ATaskManager` en geeft u een andere waarde door (bijv. `new A2ATaskManager(15)` voor een TTL van 15 minuten). Een achtergrondinterval verwijdert elke 60 seconden verlopen taken.

---

## Levenscyclus van taken

```
ingediend → in uitvoering → voltooid
                          → mislukt
                          → geannuleerd
```

- Taken verlopen standaard na 5 minuten (zie [TTL van taken](#task-ttl))
- Eindstatussen: `completed`, `failed`, `cancelled`
- Het gebeurtenislogboek registreert elke statusovergang

---

## Foutcodes

| Code   | Betekenis                             |
| :----- | :------------------------------------ |
| -32700 | Parseerfout (ongeldige JSON)          |
| -32600 | Ongeldig verzoek / Niet geautoriseerd |
| -32601 | Methode of skill niet gevonden        |
| -32602 | Ongeldige parameters                  |
| -32603 | Interne fout                          |
| -32000 | A2A-endpoint is uitgeschakeld         |

---

## Integratie voorbeelden

### Python (verzoeken)

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

### TypeScript (halen)

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
