# OmniRoute A2A Server Documentation (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — Az OmniRoute mint intelligens útválasztó ügynök

Az A2A felületnek két oldala van:

- **JSON-RPC 2.0** a `POST /a2a` címen (kanonikus belépési pont, meghatározva a `src/app/a2a/route.ts` fájlban).
- **REST** az `/api/a2a/*` alatt, irányítópultokhoz és eszközökhöz (állapot, feladatlista, megszakítás).

A feladatokat az `A2ATaskManager` követi nyomon (`src/lib/a2a/taskManager.ts`, alapértelmezetten 5 perces TTL). A készségek kiosztása a `src/lib/a2a/taskExecution.ts` fájlban található `A2A_SKILL_HANDLERS` segítségével történik.

## Ügynökfelderítés

```bash
curl http://localhost:20128/.well-known/agent.json
```

Visszaadja az OmniRoute képességeit, készségeit és hitelesítési követelményeit leíró Ügynökkártyát.

Az Ügynökkártya `version` mezőjének forrása a `process.env.npm_package_version` (lásd: `src/app/.well-known/agent.json/route.ts:13`), így minden kiadáskor automatikusan szinkronban marad a `package.json` fájllal.

---

## Hitelesítés

Minden `/a2a` kéréshez API-kulcs szükséges az `Authorization` fejlécben:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Ha nincs API-kulcs konfigurálva a kiszolgálón, a hitelesítés kihagyásra kerül.

## Engedélyezés

Az A2A az **Endpoints → A2A** kapcsolóval vezérelhető, és alapértelmezetten le van tiltva. Letiltott állapotban a
`GET /api/a2a/status` válasza `status: "disabled"` és `online: false`; a `POST /a2a` címre küldött JSON-RPC hívások
HTTP 503 választ adnak a `-32000` JSON-RPC hibakóddal.

---

## JSON-RPC 2.0 metódusok

### `message/send` — Szinkron végrehajtás

Üzenetet küld egy képességnek, és megvárja a teljes választ.

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

A `smart-routing` esetében a `metadata.combo` a `metadata.model` explicit felülbírálása az átjárókérésben; a rendszer a tényleges `model` értékeként küldi el, nem pedig figyelmen kívül hagyott `x-combo` JSON-mezőként. Az átjáró szokásos API-kulcsos és célpontonkénti engedélyezése továbbra is érvényes. Az érvénytelen vagy üres kombinációt a rendszer elutasítja.

Az eredmény tartalmazza a `requested_combo` (a hívó szándéka), a `dispatched_model` (az átjárónak ténylegesen küldött kérés), a `response_model` (az átjáró válasza) és a `confirmed_combo` mezőket. Az utolsó mező értéke `null`, kivéve, ha az átjáró kifejezetten azonosít egy kombinációt. Az A2A döntési naplók csak megerősített kombinációhoz rendelik hozzá a végrehajtást, a meg nem erősített kérést pedig `requestedCombo` értékként őrzik meg.

**Válasz:**

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

### `message/stream` — SSE-adatfolyam

Ugyanaz, mint a `message/send`, de valós idejű adatfolyamhoz Server-Sent Events eseményeket ad vissza.

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

**SSE-események:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Feladat állapotának lekérdezése

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Feladat megszakítása

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Rendelkezésre álló készségek

OmniRoute 6 A2A képességet tesz elérhetővé `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` ben. Minden készségmodul `src/lib/a2a/skills/` ben található.

| Ügyesség                | ID                   | Leírás                                                                                                                                                                             | Címkék                           | Példák                                                   |
| :---------------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------- | :------------------------------------------------------- |
| Intelligens útválasztás | `smart-routing`      | A prompt az optimális provider/combo keresztül irányítja OmniRoute kombinált motorjának + pontozását                                                                               | útválasztás, szolgáltatók        | "Route this prompt via the best model"                   |
| Kvótakezelés            | `quota-management`   | Szolgáltatónkénti kvótaállapotot jelent, segít a hívóknak eldönteni, hogy mikor kell throttle/switch kérni                                                                         | kvóta, szolgáltatók              | "Check quot for anthropic"                               |
| Szolgáltató felfedezése | `provider-discovery` | Felsorolja a telepített szolgáltatókat képességekkel, szabadszintű jelzőkkel és OAuth állapottal                                                                                   | szolgáltatók, felfedezés         | – Milyen szolgáltatók érhetők el?                        |
| Költségelemzés          | `cost-analysis`      | A request/conversation becsült költsége, figyelembe véve a + katalógus legutóbbi használatát                                                                                       | költség, használat               | "A beszélgetés becsült költsége"                         |
| Egészségügyi jelentés   | `health-report`      | Aggregálja a megszakítót, a lehűlést, a lezárási állapotot szolgáltatónként                                                                                                        | egészség, rugalmasság            | "Minden szolgáltató egészségi állapotának megjelenítése" |
| Képességek listázása    | `list-capabilities`  | Visszaadja a teljes, 45 bejegyzésből álló Agent Skills katalógust (23 API + 21 CLI + 1 konfiguráció) leértékelési táblázatként nyers SKILL.md URLs fel a kontextus beillesztéséhez | katalógus, felfedezés, készségek | "List all OmniRoute képességek"                          |

> Az ügynökkártyát összhangban kell tartani az élő 387-es szolgáltatókatalógussal; A szolgáltatók száma és free/no-auth metaadatok a futásidejű nyilvántartásból származnak.

### `list-capabilities` Skill Detail

A `list-capabilities` készség különösen hasznos a külső ügynökök számára, akiknek fel kell fedezniük, hogy OmniRoute mit tesz közzé API hívások küldése előtt. Strukturált leértékelési táblázatot ad vissza:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Minden sor tartalmazza a `rawUrl` oszlopot, így az ügynökök azonnal lekérhetik a teljes SKILL.md. A `metadata.totalSkills` mező tükrözi a katalógus méretet (ma 45). Megvalósítás: `src/lib/a2a/skills/listCapabilities.ts`. Lásd még: [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (kiegészítő)

A `/a2a` JSON-RPC végpont a kanonikus A2A belépési pont. Az alábbi REST végpontok kiegészítő hozzáférést biztosítanak a műszerfalakhoz és a külső szerszámokhoz:

| Végpont                      | Módszer | Leírás                                                         | Auth                                                                                                                   |
| :--------------------------- | :------ | :------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET     | Szerver állapot, regisztrált készségek                         | (nyilvános)                                                                                                            |
| `/api/a2a/tasks`             | GET     | Feladatok listázása szűrőkkel                                  | menedzsment vagy API kulcs (lásd lent)                                                                                 |
| `/api/a2a/tasks/[id]`        | GET     | Feladat letöltése ID-val                                       | menedzsment vagy API kulcs (lásd lent)                                                                                 |
| `/api/a2a/tasks/[id]/cancel` | POST    | Futó feladat megszakítása                                      | menedzsment vagy API kulcs (lásd lent)                                                                                 |
| `/.well-known/agent.json`    | GET     | Ügynökkártya (A2A Discovery)                                   | (nyilvános, gyorsítótárazott 3600-as évek)                                                                             |
| `/api/a2a/tasks`             | POST    | Bejövő delegáció a OmniConductor flottához (Conductor PRD RF5) | ugyanaz, mint `GET`, plusz `OMNIROUTE_API_KEY` ha `REQUIRE_API_KEY` kikapcsolt állapotában van beállítva; `a2aEnabled` |

Az, hogy ki jut el a `/api/a2a/tasks*` útvonalakra, a bejelentkezési és az API-kulcs beállításaitól függ:

- `requireLogin=true` (alapértelmezett): a köztes szoftver csak a felügyeleti hitelesítő adatokat (műszerfali munkamenet, `manage` -scope API kulcs, `oma_` hozzáférési jogkivonat) és `OMNIROUTE_API_KEY` engedélyezi. Egy egyszerű következtetési kulcs `403` kap. A `Authorization` fejlécben a köztes szoftver csak `OMNIROUTE_API_KEY` `Bearer <key>` ként veszi fel; egy csupasz billentyű vagy egy tabulátor `Bearer` után `401` kap.
- `requireLogin=false`, vagy a visszacsatolási ablak a csatlakozás előtt: `REQUIRE_API_KEY=true` vel bármely érvényes OmniRoute API kulcs vagy felügyeleti hitelesítő adat elfogadásra kerül, és a névtelen hívók megkapják `401`; `REQUIRE_API_KEY` off az útvonalak nyitva.
- `POST /api/a2a/tasks` emellett megköveteli `OMNIROUTE_API_KEY` a `Authorization` fejlécben, ha ez a változó be van állítva, és `REQUIRE_API_KEY` ki van kapcsolva. Más fejlécek, mint például `x-api-key`, nem számítanak oda. Kijelentkezéskor vagy belépés előtt a kulcs `Bearer` előtaggal vagy anélkül; bejelentkezéskor csak `Bearer <key>` jut túl a köztes szoftveren.

Ahol hitelesítő adatokra van szükség, a `read` -scope `oma_` token csak `GET` esetén működik.

**Bejövő karmester-delegáció (`POST /api/a2a/tasks`):** külső A2A ügynökök OmniRoute keresztül delegálják a kódolási munkát a OmniConductor flottára. Test: csak `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — A karmesteri flotta készségek (az ügynökkártyán feltüntetettek) átruházhatók; `metadata.conductor.repo.url` szükséges (a flotta git repokon működik). Az útvonal lefordítja a hub `POST /v1/tasks` ját a kiszolgálóoldali `CONDUCTOR_ORCHESTRATOR_TOKEN` (tartalék `CONDUCTOR_HUB_TOKEN`) használatával, és `201 { conductor_task_id, state: "submitted" }` értéket adja vissza; A feladatállapotok a SSE→A2A tükörön (RF1) keresztül áramlanak vissza, és `GET /api/a2a/tasks?skill=conductor` keresztül láthatók.

---

## Új készség hozzáadása

1. **Készségfájl létrehozása:** `src/lib/a2a/skills/<your-skill>.ts`

   `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>` aszinkron függvény exportálása. Kövesse a meglévő készségek, például `smartRouting.ts` alakját. Ha a készség visszahívja OmniRoute -t HTTP keresztül, a fejléceket `buildSelfLoopHeaders(caller)` vel állítsa össze `src/lib/a2a/selfLoopAuth.ts` ből, így a hívás a A2A hívó kulcsával fut, nem pedig `OMNIROUTE_API_KEY`, és adja át `redirect: "error"` `fetch` -nek, így az átirányítás soha nem kapja meg a kulcsot. A segítő csak fejléceket készít; minden képesség magát az átirányítási szabályzatot állítja be. Kulcs csatolása helyett `UnsafeSelfLoopTargetError` dob, ha a feloldott alap- URL sima http a magánhálózaton kívül (visszacsatolás, egy konténer vagy szolgáltatásnév, és a privát címek rendben vannak), vagy rendelkezik hitelesítő adatokkal, tehát az elutasított hívásokat lenyelő képességnek újra el kell dobnia ezt a hibát.

2. **Regisztrációs kezelő:** `src/lib/a2a/taskExecution.ts` nyelven adjon hozzá egy bejegyzést `A2A_SKILL_HANDLERS` hez:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Tedd ki az ügynökkártyán:** `src/lib/a2a/agentCardMetadata.ts` ban ( `/.well-known/agent.json` és `/.well-known/agent-card.json` osztja meg), fűzze hozzá a `skills` tömbhöz:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Írj teszteket:** `tests/unit/a2a-<your-skill>.test.ts`. Borító boldog út + hibaútvonal.

5. **Dokumentum** az új készség ennek a fájlnak `Available Skills` táblázatában.

---

## Feladatok élettartama (TTL)

A feladatok a `ttlMinutes` elteltével járnak le (alapértelmezés szerint 5 perc) — ez az `A2ATaskManager` konstruktorában konfigurálható a `src/lib/a2a/taskManager.ts:82` helyen. A testreszabáshoz módosítsa az `A2ATaskManager` példányosítását, és adjon át egy másik értéket (például `new A2ATaskManager(15)` a 15 perces TTL-hez). Egy háttérben futó időzítő 60 másodpercenként eltávolítja a lejárt feladatokat.

---

## Feladatok életciklusa

```
beküldve → folyamatban → befejezve
                       → sikertelen
                       → megszakítva
```

- A feladatok alapértelmezés szerint 5 perc után járnak le (lásd: [Feladatok élettartama (TTL)](#task-ttl))
- Végállapotok: `completed`, `failed`, `cancelled`
- Az eseménynapló minden állapotátmenetet rögzít

---

## Hibakódok

| Kód    | Jelentés                              |
| :----- | :------------------------------------ |
| -32700 | Feldolgozási hiba (érvénytelen JSON)  |
| -32600 | Érvénytelen kérés / Nincs jogosultság |
| -32601 | A metódus vagy képesség nem található |
| -32602 | Érvénytelen paraméterek               |
| -32603 | Belső hiba                            |
| -32000 | Az A2A-végpont le van tiltva          |

---

## Integrációs példák

### Python (kérések)

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

### TypeScript (elhozni)

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
