# OmniRoute A2A Server Documentation (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute jako inteligentní směrovací agent

Rozhraní A2A má dvě podoby:

- **JSON-RPC 2.0** na `POST /a2a` (kanonický vstupní bod definovaný v `src/app/a2a/route.ts`).
- **REST** pod `/api/a2a/*` pro řídicí panely a nástroje (stav, seznam úloh, zrušení).

Úlohy spravuje `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, výchozí TTL je 5 minut). Dovednosti jsou předávány prostřednictvím `A2A_SKILL_HANDLERS` v `src/lib/a2a/taskExecution.ts`.

## Vyhledání agenta

```bash
curl http://localhost:20128/.well-known/agent.json
```

Vrací kartu agenta popisující možnosti, dovednosti a požadavky na ověřování OmniRoute.

Pole `version` v kartě agenta se načítá z `process.env.npm_package_version` (viz `src/app/.well-known/agent.json/route.ts:13`), takže při každém vydání zůstává automaticky synchronizované se souborem `package.json`.

---

## Ověřování

Všechny požadavky na `/a2a` vyžadují klíč API prostřednictvím hlavičky `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Pokud na serveru není nakonfigurován žádný klíč API, ověřování se přeskočí.

## Povolení

A2A se ovládá přepínačem **Endpoints → A2A** a ve výchozím nastavení je zakázáno. Když je zakázáno,
`GET /api/a2a/status` hlásí `status: "disabled"` a `online: false`; volání JSON-RPC na
`POST /a2a` vracejí HTTP 503 s kódem chyby JSON-RPC `-32000`.

---

## Metody JSON-RPC 2.0

### `message/send` — Synchronní provádění

Odešle zprávu dovednosti a počká na úplnou odpověď.

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

Pro `smart-routing` představuje `metadata.combo` explicitní přepsání hodnoty
`metadata.model` pro požadavek brány; odesílá se jako skutečný `model`,
nikoli jako ignorované pole JSON `x-combo`. Nadále se uplatňuje běžný klíč API brány
a autorizace pro jednotlivé cíle. Neplatná nebo prázdná kombinace je odmítnuta.

Výsledek obsahuje `requested_combo` (záměr volajícího), `dispatched_model`
(skutečný požadavek brány), `response_model` (odpověď brány) a
`confirmed_combo`. Poslední pole má hodnotu `null`, pokud brána kombinaci
výslovně neidentifikuje. Protokoly rozhodování A2A přiřazují spuštění pouze
potvrzené kombinaci a nepotvrzený požadavek uchovávají jako `requestedCombo`.

**Odpověď:**

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

### `message/stream` — Streamování SSE

Funguje stejně jako `message/send`, ale vrací události Server-Sent Events pro streamování v reálném čase.

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

**Události SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Dotaz na stav úlohy

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Zrušení úlohy

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Dostupné dovednosti

OmniRoute odhaluje 6 dovedností A2A zapojených v `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Každý modul dovedností žije ve `src/lib/a2a/skills/`.

| Dovednost                | ID                   | Popis                                                                                                                                                             | Tagy                       | Příklady                                      |
| :----------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :-------------------------------------------- |
| Inteligentní směrování   | `smart-routing`      | Směruje výzvu přes optimální provider/combo pomocí bodování kombinovaného enginu + OmniRoute                                                                      | směrování, poskytovatelé   | "Směrovat tuto výzvu přes nejlepší model"     |
| Správa kvót              | `quota-management`   | Hlásí stav kvóty podle poskytovatele, pomáhá volajícím rozhodnout se, kdy throttle/switch                                                                         | kvóta, poskytovatelé       | "Zkontrolujte kvótu pro antropické"           |
| Objevování poskytovatele | `provider-discovery` | Vypisuje nainstalované poskytovatele se schopnostmi, příznaky volné vrstvy, stav OAuth                                                                            | poskytovatelé, objev       | "Kteří poskytovatelé jsou k dispozici?"       |
| Analýza nákladů          | `cost-analysis`      | Odhaduje náklady na request/conversation s ohledem na nedávné použití katalogu +                                                                                  | náklady, použití           | "Odhad nákladů na tuto konverzaci"            |
| Zpráva o zdraví          | `health-report`      | Jistič agregátů, cooldown, stav uzamčení podle poskytovatele                                                                                                      | zdraví, odolnost           | "Zobrazit zdravotní stav všech poskytovatelů" |
| Seznam schopností        | `list-capabilities`  | Vrátí úplný katalog dovedností agenta se 45 položkami (konfigurace 23 API + 21 CLI + 1) jako tabulku markdown s nezpracovaným SKILL.md URLs pro vkládání kontextu | katalog, objev, dovednosti | "Seznam všech schopností OmniRoute "          |

> Karta agenta by měla být zarovnána s aktuálním katalogem poskytovatelů 377; počty poskytovatelů a metadata free/no-auth jsou získávány z runtime registru.

### Detail dovednosti `list-capabilities`

Dovednost `list-capabilities` je zvláště užitečná pro externí agenty, kteří potřebují zjistit, co OmniRoute odhaluje před odesláním volání API. Vrací artefakt strukturované tabulky markdown:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Každý řádek obsahuje sloupec `rawUrl`, takže agenti mohou okamžitě načíst celý SKILL.md. Pole `metadata.totalSkills` odráží velikost katalogu (dnes 45). Realizace: `src/lib/a2a/skills/listCapabilities.ts`. Viz také [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (pomocné)

Koncový bod JSON-RPC `/a2a` je kanonickým vstupním bodem A2A. Níže uvedené koncové body REST poskytují pomocný přístup pro řídicí panely a externí nástroje:

| Koncový bod                  | Metoda | Popis                                                            | Autorizace                                     |
| :--------------------------- | :----- | :--------------------------------------------------------------- | :--------------------------------------------- |
| `/api/a2a/status`            | GET    | Stav serveru, registrované dovednosti                            | (veřejné)                                      |
| `/api/a2a/tasks`             | GET    | Seznam úloh s filtry                                             | správa                                         |
| `/api/a2a/tasks/[id]`        | GET    | Získání úlohy podle ID                                           | správa                                         |
| `/api/a2a/tasks/[id]/cancel` | POST   | Zrušení probíhající úlohy                                        | správa                                         |
| `/.well-known/agent.json`    | GET    | Karta agenta (zjišťování A2A)                                    | (veřejné, ukládáno do mezipaměti po 3600 s)    |
| `/api/a2a/tasks`             | POST   | Příchozí delegování do flotily OmniConductor (Conductor PRD RF5) | Bearer vůči `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Příchozí delegování Conductor (`POST /api/a2a/tasks`):** externí agenti A2A delegují programátorskou práci flotile OmniConductor prostřednictvím OmniRoute. Tělo: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — delegovat lze pouze dovednosti flotily Conductor (ty, které jsou uvedeny na kartě agenta); `metadata.conductor.repo.url` je povinné (flotila pracuje s repozitáři git). Trasa se převede na `POST /v1/tasks` centra pomocí serverového tokenu `CONDUCTOR_ORCHESTRATOR_TOKEN` (záložně `CONDUCTOR_HUB_TOKEN`) a vrátí `201 { conductor_task_id, state: "submitted" }`; stavy úloh jsou zpětně přenášeny prostřednictvím zrcadlení SSE→A2A (RF1) a jsou viditelné přes `GET /api/a2a/tasks?skill=conductor`.

---

## Přidání nové dovednosti

1. **Vytvořte soubor dovednosti:** `src/lib/a2a/skills/<your-skill>.ts`

   Exportujte asynchronní funkci `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Dodržujte strukturu existujících dovedností, například `smartRouting.ts`.

2. **Zaregistrujte obslužnou funkci:** v souboru `src/lib/a2a/taskExecution.ts` přidejte položku do `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existující dovednosti
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Zveřejněte ji na kartě agenta:** v souboru `src/app/.well-known/agent.json/route.ts` ji přidejte do pole `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Napište testy:** `tests/unit/a2a-<your-skill>.test.ts`. Pokryjte úspěšný průchod i chybový scénář.

5. **Zdokumentujte** novou dovednost v tabulce `Available Skills` v tomto souboru.

---

## TTL úlohy

Platnost úloh vyprší po uplynutí `ttlMinutes` (výchozí hodnota je 5 min) — konfiguruje se v konstruktoru `A2ATaskManager` v souboru `src/lib/a2a/taskManager.ts:82`. Chcete-li tuto hodnotu přizpůsobit, upravte vytvoření instance `A2ATaskManager` a předejte jinou hodnotu (např. `new A2ATaskManager(15)` pro TTL v délce 15 minut). Interval spuštěný na pozadí odstraňuje úlohy s vypršenou platností každých 60 sekund.

---

## Životní cyklus úlohy

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Platnost úloh ve výchozím nastavení vyprší po 5 minutách (viz [TTL úlohy](#task-ttl))
- Koncové stavy: `completed`, `failed`, `cancelled`
- Protokol událostí zaznamenává každý přechod mezi stavy

---

## Chybové kódy

| Kód    | Význam                                |
| :----- | :------------------------------------ |
| -32700 | Chyba analýzy (neplatný JSON)         |
| -32600 | Neplatný požadavek / Neautorizováno   |
| -32601 | Metoda nebo dovednost nebyla nalezena |
| -32602 | Neplatné parametry                    |
| -32603 | Interní chyba                         |
| -32000 | Koncový bod A2A je zakázán            |

---

## Příklady integrace

### Python (požadavky)

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

### TypeScript (aport)

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
