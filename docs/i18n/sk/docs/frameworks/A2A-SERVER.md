# OmniRoute A2A Server Documentation (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute ako inteligentný smerovací agent

Rozhranie A2A má dve podoby:

- **JSON-RPC 2.0** na `POST /a2a` (kanonický vstupný bod definovaný v `src/app/a2a/route.ts`).
- **REST** pod `/api/a2a/*` pre ovládacie panely a nástroje (stav, zoznam úloh, zrušenie).

Úlohy sleduje `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, predvolená hodnota TTL je 5 minút). Zručnosti sú odovzdávané prostredníctvom `A2A_SKILL_HANDLERS` v `src/lib/a2a/taskExecution.ts`.

## Zisťovanie agenta

```bash
curl http://localhost:20128/.well-known/agent.json
```

Vráti kartu agenta opisujúcu schopnosti a zručnosti OmniRoute a požiadavky na autentifikáciu.

Pole `version` karty agenta získava hodnotu z `process.env.npm_package_version` (pozri `src/app/.well-known/agent.json/route.ts:13`), takže pri každom vydaní zostáva automaticky synchronizované so súborom `package.json`.

---

## Autentifikácia

Všetky požiadavky na `/a2a` vyžadujú kľúč API prostredníctvom hlavičky `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Ak na serveri nie je nakonfigurovaný žiadny kľúč API, autentifikácia sa obíde.

## Povolenie

A2A sa ovláda prepínačom **Endpoints → A2A** a predvolene je zakázané. Keď je zakázané,
`GET /api/a2a/status` hlási `status: "disabled"` a `online: false`; volania JSON-RPC na
`POST /a2a` vrátia HTTP 503 s kódom chyby JSON-RPC `-32000`.

---

## Metódy JSON-RPC 2.0

### `message/send` — Synchrónne vykonanie

Odošle správu zručnosti a počká na úplnú odpoveď.

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

Pre `smart-routing` predstavuje `metadata.combo` explicitné prepísanie hodnoty
`metadata.model` v požiadavke na bránu; odosiela sa ako skutočný `model`,
nie ako ignorované pole JSON `x-combo`. Naďalej sa uplatňuje bežný kľúč API brány a
autorizácia pre jednotlivé ciele. Neplatná alebo prázdna kombinácia je odmietnutá.

Výsledok sprístupňuje `requested_combo` (zámer volajúceho), `dispatched_model`
(skutočná požiadavka na bránu), `response_model` (odpoveď brány) a
`confirmed_combo`. Posledné pole má hodnotu `null`, pokiaľ brána explicitne
neidentifikuje kombináciu. Protokoly rozhodnutí A2A pripisujú vykonanie iba
potvrdenej kombinácii, pričom nepotvrdenú požiadavku uchovávajú ako `requestedCombo`.

**Odpoveď:**

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

### `message/stream` — Streamovanie SSE

Funguje rovnako ako `message/send`, ale vracia udalosti Server-Sent Events na streamovanie v reálnom čase.

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

**Udalosti SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Zistenie stavu úlohy

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Zrušenie úlohy

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Dostupné zručnosti

OmniRoute odhaľuje 6 zručností A2A zapojených v `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Každý modul zručností žije v `src/lib/a2a/skills/`.

| Zručnosť                | ID                   | Popis                                                                                                                                                          | Tagy                       | Príklady                                          |
| :---------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :------------------------------------------------ |
| Inteligentné smerovanie | `smart-routing`      | Smeruje výzvu cez optimálne provider/combo pomocou kombinovaného enginu + OmniRoute                                                                            | smerovanie, poskytovatelia | "Nasmerovať túto výzvu cez najlepší model"        |
| Správa kvót             | `quota-management`   | Hlási stav kvóty podľa poskytovateľa, pomáha volajúcim rozhodnúť sa, kedy throttle/switch                                                                      | kvóta, poskytovatelia      | "Skontrolujte kvótu pre antropické"               |
| Objav poskytovateľa     | `provider-discovery` | Uvádza zoznam nainštalovaných poskytovateľov so schopnosťami, príznakmi voľnej úrovne, stavom OAuth                                                            | poskytovatelia, objav      | "Ktorí poskytovatelia sú k dispozícii?"           |
| Analýza nákladov        | `cost-analysis`      | Odhaduje náklady na request/conversation vzhľadom na nedávne používanie katalógu +                                                                             | náklady, použitie          | "Odhad nákladov na túto konverzáciu"              |
| Správa o zdraví         | `health-report`      | Súhrnný istič, chladenie, stav blokovania podľa poskytovateľa                                                                                                  | zdravie, odolnosť          | "Zobraziť zdravotný stav všetkých poskytovateľov" |
| Zoznam schopností       | `list-capabilities`  | Vráti úplný katalóg zručností agenta so 45 položkami (konfigurácia 23 API + 21 CLI + 1) ako tabuľka značiek s nespracovaným SKILL.md URLs na vloženie kontextu | katalóg, objav, zručnosti  | "Uveďte všetky možnosti OmniRoute "               |

> Karta agenta by mala byť zarovnaná s aktuálnym katalógom poskytovateľa 382; počty poskytovateľov a metadáta free/no-auth sa získavajú z registra runtime.

### `list-capabilities` Detail zručnosti

Zručnosť `list-capabilities` je užitočná najmä pre externých agentov, ktorí potrebujú zistiť, čo OmniRoute odhaľuje pred odoslaním volaní API. Vracia štruktúrovaný artefakt tabuľky markdown:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Každý riadok obsahuje stĺpec `rawUrl`, takže agenti môžu okamžite získať celý SKILL.md. Pole `metadata.totalSkills` odzrkadľuje veľkosť katalógu (dnes 45). Implementácia: `src/lib/a2a/skills/listCapabilities.ts`. Pozri tiež [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (pomocný)

Koncový bod JSON-RPC `/a2a` je kanonický vstupný bod A2A. Nižšie uvedené koncové body REST poskytujú pomocný prístup k ovládacím panelom a externým nástrojom:

| Koncový bod                  | Metóda | Popis                                                            | Auth                                                                                                        |
| :--------------------------- | :----- | :--------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET    | Stav servera, registrované zručnosti                             | (verejné)                                                                                                   |
| `/api/a2a/tasks`             | GET    | Zoznam úloh s filtrami                                           | manažment alebo kľúč API (pozri nižšie)                                                                     |
| `/api/a2a/tasks/[id]`        | GET    | Získajte úlohu podľa ID                                          | manažment alebo kľúč API (pozri nižšie)                                                                     |
| `/api/a2a/tasks/[id]/cancel` | POST   | Zrušiť spustenú úlohu                                            | manažment alebo kľúč API (pozri nižšie)                                                                     |
| `/.well-known/agent.json`    | GET    | Karta agenta (objavenie A2A )                                    | (verejné, vo vyrovnávacej pamäti 3600s)                                                                     |
| `/api/a2a/tasks`             | POST   | Prichádzajúca delegácia do flotily OmniConductor (vodič PRD RF5) | rovnaké ako `GET`, plus `OMNIROUTE_API_KEY` ak je nastavené, keď je `REQUIRE_API_KEY` vypnuté; `a2aEnabled` |

Kto sa dostane k trasám `/api/a2a/tasks*` závisí od prihlásenia a nastavení kľúča API:

- `requireLogin=true` (predvolené): middleware pripúšťa iba poverenia na správu (reláciu dashboardu, kľúč `manage` -scope API, prístupový token `oma_` ) a `OMNIROUTE_API_KEY`. Jednoduchý inferenčný kľúč dostane `403`. V hlavičke `Authorization` middleware berie iba `OMNIROUTE_API_KEY` ako `Bearer <key>`; holý kľúč alebo tabulátor po `Bearer` získa `401`.
- `requireLogin=false` alebo okno spätnej slučky pred prihlásením: so `REQUIRE_API_KEY=true` sa akceptuje akýkoľvek platný kľúč OmniRoute API alebo poverenie správy a anonymní volajúci dostanú `401`; so `REQUIRE_API_KEY` mimo cesty sú otvorené.
- `POST /api/a2a/tasks` navyše vyžaduje `OMNIROUTE_API_KEY` v hlavičke `Authorization` keď je táto premenná nastavená a `REQUIRE_API_KEY` je vypnuté. Ostatné hlavičky, ako napríklad `x-api-key`, sa tam nepočítajú. Pri odhlásení alebo pred zaradením kľúč prechádza s predponou `Bearer` alebo bez nej; so zapnutým prihlásením sa cez middleware dostane iba `Bearer <key>`.

Ak sa vyžaduje poverenie, token `read` -scope `oma_` funguje iba pre `GET`.

**Delegovanie prichádzajúceho dirigenta (`POST /api/a2a/tasks`):** externí agenti A2A delegujú prácu kódovania na flotilu OmniConductor prostredníctvom OmniRoute. Telo: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — len zručnosti flotily vodiča (tie uvedené na karte agenta) sú delegovateľné; Vyžaduje sa `metadata.conductor.repo.url` (flotila funguje na git repo). Trasa sa preloží do `POST /v1/tasks` rozbočovača pomocou `CONDUCTOR_ORCHESTRATOR_TOKEN` na strane servera (záložné `CONDUCTOR_HUB_TOKEN`) a vráti `201 { conductor_task_id, state: "submitted" }`; stavy úloh prúdia späť cez zrkadlo SSE→A2A (RF1) a sú viditeľné cez `GET /api/a2a/tasks?skill=conductor`.

---

## Pridanie novej zručnosti

1. **Vytvorte súbor zručností:** `src/lib/a2a/skills/<your-skill>.ts`

   Exportujte asynchrónnu funkciu `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Postupujte podľa tvaru existujúcich zručností, ako je `smartRouting.ts`. Ak zručnosť volá späť do OmniRoute cez HTTP, vytvorte hlavičky so `buildSelfLoopHeaders(caller)` z `src/lib/a2a/selfLoopAuth.ts`, aby sa volanie spustilo s kľúčom volajúceho A2A, nie `OMNIROUTE_API_KEY`, a odovzdajte `redirect: "error"` do `fetch`, aby presmerovanie nikdy nezískalo kľúč. Pomocník vytvára iba hlavičky; každá zručnosť si sama nastavuje politiku presmerovania. Vyhodí `UnsafeSelfLoopTargetError` namiesto toho, aby pripojil kľúč, keď je vyriešený základný URL obyčajný http mimo privátnej siete (spätná slučka, názov kontajnera alebo služby a súkromné adresy sú v poriadku) alebo obsahuje poverenia, takže zručnosť, ktorá prehltne odmietnuté hovory, musí túto chybu zopakovať.

2. **Spracovateľ registrácie:** v `src/lib/a2a/taskExecution.ts` pridajte záznam do `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Vystaviť na karte agenta:** v `src/lib/a2a/agentCardMetadata.ts` (zdieľané `/.well-known/agent.json` a `/.well-known/agent-card.json`), pripojte do poľa `skills` :

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Napíšte testy:** `tests/unit/a2a-<your-skill>.test.ts`. Pokryť šťastnú cestu + chybová cesta.

5. **Dokument** nová zručnosť v tabuľke `Available Skills` tohto súboru.

---

## TTL úlohy

Platnosť úloh vyprší po `ttlMinutes` (predvolene 5 minútach) — nastavené v konštruktore `A2ATaskManager` v súbore `src/lib/a2a/taskManager.ts:82`. Ak chcete túto hodnotu prispôsobiť, vytvorte fork inštancie `A2ATaskManager` a odovzdajte inú hodnotu (napr. `new A2ATaskManager(15)` pre 15-minútovú TTL). Interval na pozadí odstraňuje úlohy s vypršanou platnosťou každých 60 sekúnd.

---

## Životný cyklus úlohy

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Platnosť úloh predvolene vyprší po 5 minútach (pozrite si [TTL úlohy](#task-ttl))
- Koncové stavy: `completed`, `failed`, `cancelled`
- Denník udalostí zaznamenáva každý prechod medzi stavmi

---

## Chybové kódy

| Kód    | Význam                               |
| :----- | :----------------------------------- |
| -32700 | Chyba analýzy (neplatný JSON)        |
| -32600 | Neplatná požiadavka / Neautorizované |
| -32601 | Metóda alebo zručnosť sa nenašla     |
| -32602 | Neplatné parametre                   |
| -32603 | Interná chyba                        |
| -32000 | Koncový bod A2A je zakázaný          |

---

## Príklady integrácie

### Python (žiadosti)

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

### TypeScript (načítanie)

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
