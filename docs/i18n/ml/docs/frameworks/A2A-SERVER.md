# OmniRoute A2A Server Documentation (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — ബുദ്ധിപരമായ റൂട്ടിംഗ് ഏജന്റായി OmniRoute

A2A ഇന്റർഫേസിന് രണ്ട് രൂപങ്ങളുണ്ട്:

- **JSON-RPC 2.0** `POST /a2a`-ൽ (പ്രാമാണിക എൻട്രി പോയിന്റ്, `src/app/a2a/route.ts`-ൽ നിർവചിച്ചിരിക്കുന്നു).
- ഡാഷ്ബോർഡുകൾക്കും ടൂളിംഗിനുമായി `/api/a2a/*`-ന് കീഴിലുള്ള **REST** (സ്റ്റാറ്റസ്, ടാസ്ക് ലിസ്റ്റ്, റദ്ദാക്കൽ).

ടാസ്കുകൾ `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, ഡിഫോൾട്ട് 5-മിനിറ്റ് TTL) ഉപയോഗിച്ച് ട്രാക്ക് ചെയ്യപ്പെടുന്നു. `src/lib/a2a/taskExecution.ts`-ലെ `A2A_SKILL_HANDLERS` വഴി സ്കില്ലുകൾ ഡിസ്പാച്ച് ചെയ്യപ്പെടുന്നു.

## ഏജന്റ് കണ്ടെത്തൽ

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute-ന്റെ ശേഷികൾ, സ്കില്ലുകൾ, ഓതന്റിക്കേഷൻ ആവശ്യകതകൾ എന്നിവ വിവരിക്കുന്ന Agent Card തിരികെ നൽകുന്നു.

Agent Card-ലെ `version` ഫീൽഡ് `process.env.npm_package_version`-ൽ നിന്നാണ് ലഭിക്കുന്നത് (`src/app/.well-known/agent.json/route.ts:13` കാണുക), അതിനാൽ ഓരോ റിലീസിലും അത് `package.json`-മായി സ്വയമേവ സമന്വയിപ്പിക്കപ്പെടുന്നു.

---

## ഓതന്റിക്കേഷൻ

എല്ലാ `/a2a` അഭ്യർത്ഥനകൾക്കും `Authorization` ഹെഡർ വഴി ഒരു API കീ ആവശ്യമാണ്:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

സെർവറിൽ API കീ കോൺഫിഗർ ചെയ്തിട്ടില്ലെങ്കിൽ, ഓതന്റിക്കേഷൻ ഒഴിവാക്കപ്പെടും.

## പ്രവർത്തനക്ഷമമാക്കൽ

A2A-യെ **Endpoints → A2A** ടോഗിൾ നിയന്ത്രിക്കുന്നു; ഡിഫോൾട്ടായി ഇത് പ്രവർത്തനരഹിതമാണ്. പ്രവർത്തനരഹിതമായിരിക്കുമ്പോൾ,
`GET /api/a2a/status` എന്നത് `status: "disabled"`, `online: false` എന്നിവ റിപ്പോർട്ട് ചെയ്യുന്നു; `POST /a2a`-ലേക്കുള്ള
JSON-RPC കോളുകൾ JSON-RPC പിശക് കോഡ് `-32000` സഹിതം HTTP 503 തിരികെ നൽകുന്നു.

---

## JSON-RPC 2.0 രീതികൾ

### `message/send` — സമകാലിക നിർവഹണം

ഒരു സ്കില്ലിലേക്ക് സന്ദേശം അയച്ച് പൂർണ്ണമായ പ്രതികരണത്തിനായി കാത്തിരിക്കുന്നു.

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

`smart-routing`-ന്, ഗേറ്റ്വേ അഭ്യർത്ഥനയ്ക്കായി `metadata.combo`, `metadata.model`-നെ വ്യക്തമായി മറികടക്കുന്നു; അവഗണിക്കപ്പെടുന്ന ഒരു `x-combo` JSON ഫീൽഡായല്ല, യഥാർഥ `model` ആയാണ് അത് അയയ്ക്കപ്പെടുന്നത്. ഗേറ്റ്വേയുടെ സാധാരണ API കീയും ഓരോ ലക്ഷ്യത്തിനുമുള്ള അംഗീകാരവും തുടർന്നും ബാധകമാണ്. അസാധുവായതോ ശൂന്യമായതോ ആയ കോംബോ നിരസിക്കപ്പെടും.

ഫലം `requested_combo` (കോളറുടെ ഉദ്ദേശ്യം), `dispatched_model` (യഥാർഥ ഗേറ്റ്വേ അഭ്യർത്ഥന), `response_model` (ഗേറ്റ്വേ പ്രതികരണം), `confirmed_combo` എന്നിവ വെളിപ്പെടുത്തുന്നു. ഗേറ്റ്വേ ഒരു കോംബോയെ വ്യക്തമായി തിരിച്ചറിയാത്തപക്ഷം അവസാനത്തെ ഫീൽഡ് `null` ആയിരിക്കും. സ്ഥിരീകരിക്കാത്ത ഒരു അഭ്യർത്ഥനയെ `requestedCombo` ആയി നിലനിർത്തിക്കൊണ്ട്, A2A തീരുമാന ലോഗുകൾ നിർവഹണം സ്ഥിരീകരിച്ച ഒരു കോംബോയ്ക്ക് മാത്രമാണ് ആട്രിബ്യൂട്ട് ചെയ്യുന്നത്.

**പ്രതികരണം:**

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

### `message/stream` — SSE സ്ട്രീമിങ്

`message/send` പോലെത്തന്നെയാണെങ്കിലും, തത്സമയ സ്ട്രീമിങ്ങിനായി Server-Sent Events തിരികെ നൽകുന്നു.

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

**SSE ഇവന്റുകൾ:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — ടാസ്കിന്റെ നില അന്വേഷിക്കുക

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ഒരു ടാസ്ക് റദ്ദാക്കുക

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ലഭ്യമായ കഴിവുകൾ

`src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` യിൽ വയർ ചെയ്ത 6 A2A കഴിവുകൾ OmniRoute തുറന്നുകാട്ടുന്നു. ഓരോ നൈപുണ്യ മൊഡ്യൂളും `src/lib/a2a/skills/` ൽ താമസിക്കുന്നു.

| വൈദഗ്ധ്യം            | ID                   | വിവരണം                                                                                                                                    | ടാഗുകൾ                        | ഉദാഹരണങ്ങൾ                                   |
| :------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------- | :------------------------------------------- |
| സ്മാർട്ട് റൂട്ടിംഗ്  | `smart-routing`      | OmniRoute യുടെ കോംബോ എഞ്ചിൻ + സ്കോറിംഗ് ഉപയോഗിച്ച് ഒപ്റ്റിമൽ provider/combo യിലൂടെ ഒരു പ്രോംപ്റ്റ് റൂട്ട് ചെയ്യുന്നു                      | റൂട്ടിംഗ്, ദാതാക്കൾ           | "മികച്ച മോഡൽ വഴി ഈ നിർദ്ദേശം റൂട്ട് ചെയ്യുക" |
| ക്വാട്ട മാനേജ്മെൻ്റ് | `quota-management`   | ഓരോ പ്രൊവൈഡർ ക്വാട്ട നിലയും റിപ്പോർട്ടുചെയ്യുന്നു, throttle/switch എപ്പോൾ എന്ന് തീരുമാനിക്കാൻ വിളിക്കുന്നവരെ സഹായിക്കുന്നു                | ക്വാട്ട, ദാതാക്കൾ             | "ആന്ത്രോപ്പിക്ക് ക്വാട്ട പരിശോധിക്കുക"       |
| ദാതാവ് കണ്ടെത്തൽ     | `provider-discovery` | കഴിവുകൾ, ഫ്രീ-ടയർ ഫ്ലാഗുകൾ, OAuth സ്റ്റാറ്റസ് എന്നിവയുള്ള ഇൻസ്റ്റാൾ ചെയ്ത ദാതാക്കളെ ലിസ്റ്റുചെയ്യുന്നു                                    | ദാതാക്കൾ, കണ്ടെത്തൽ           | "ഏത് ദാതാക്കൾ ലഭ്യമാണ്?"                     |
| ചെലവ് വിശകലനം        | `cost-analysis`      | + സമീപകാല ഉപയോഗത്തിൻ്റെ കാറ്റലോഗ് നൽകിയിരിക്കുന്ന ഒരു request/conversation യുടെ ചെലവ് കണക്കാക്കുന്നു                                      | ചെലവ്, ഉപയോഗം                 | "ഈ സംഭാഷണത്തിനുള്ള ചെലവ് കണക്കാക്കുക"        |
| ആരോഗ്യ റിപ്പോർട്ട്   | `health-report`      | ഓരോ ദാതാവിനും സർക്യൂട്ട് ബ്രേക്കർ, കൂൾഡൗൺ, ലോക്കൗട്ട് അവസ്ഥ എന്നിവയുടെ സംഗ്രഹം                                                            | ആരോഗ്യം, പ്രതിരോധശേഷി         | "എല്ലാ ദാതാക്കളുടെയും ആരോഗ്യ നില കാണിക്കുക"  |
| ലിസ്റ്റ് കഴിവുകൾ     | `list-capabilities`  | സന്ദർഭ ഇൻജക്ഷനായി റോ SKILL.md URLs ഉള്ള ഒരു മാർക്ക്ഡൗൺ ടേബിളായി 45-എൻട്രി ഏജൻ്റ് സ്കിൽസ് കാറ്റലോഗ് (23 API + 21 CLI + 1 കോൺഫിഗർ) നൽകുന്നു | കാറ്റലോഗ്, കണ്ടെത്തൽ, കഴിവുകൾ | "എല്ലാ OmniRoute കഴിവുകളും ലിസ്റ്റുചെയ്യുക"  |

> ഏജൻ്റ് കാർഡ് തത്സമയ 386-ദാതാക്കളുടെ കാറ്റലോഗുമായി വിന്യസിച്ചിരിക്കണം; ദാതാവിൻ്റെ എണ്ണവും free/no-auth മെറ്റാഡാറ്റയും റൺടൈം രജിസ്ട്രിയിൽ നിന്നാണ്.

### `list-capabilities` നൈപുണ്യ വിശദാംശങ്ങൾ

API കോളുകൾ അയയ്ക്കുന്നതിന് മുമ്പ് OmniRoute എന്താണ് വെളിപ്പെടുത്തുന്നതെന്ന് കണ്ടെത്തേണ്ട ബാഹ്യ ഏജൻ്റുമാർക്ക് `list-capabilities` വൈദഗ്ദ്ധ്യം പ്രത്യേകിച്ചും ഉപയോഗപ്രദമാണ്. ഇത് ഘടനാപരമായ മാർക്ക്ഡൗൺ ടേബിൾ ആർട്ടിഫാക്റ്റ് നൽകുന്നു:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

ഓരോ വരിയിലും `rawUrl` കോളം ഉൾപ്പെടുന്നു, അതിനാൽ ഏജൻ്റുമാർക്ക് ഉടനടി മുഴുവൻ SKILL.md ലഭിക്കും. `metadata.totalSkills` ഫീൽഡ് കാറ്റലോഗ് വലുപ്പത്തെ പ്രതിഫലിപ്പിക്കുന്നു (ഇന്ന് 45). നടപ്പിലാക്കൽ: `src/lib/a2a/skills/listCapabilities.ts`. ഇതും കാണുക [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (ഓക്സിലറി)

JSON-RPC എൻഡ്പോയിൻ്റ് `/a2a` കാനോനിക്കൽ A2A എൻട്രി പോയിൻ്റാണ്. ചുവടെയുള്ള REST എൻഡ്പോയിൻ്റുകൾ ഡാഷ്ബോർഡുകൾക്കും ബാഹ്യ ടൂളിംഗിനും സഹായ ആക്സസ് നൽകുന്നു:

| അവസാന പോയിൻ്റ്               | രീതി | വിവരണം                                                               | ഓത്ത്                                                                                                      |
| :--------------------------- | :--- | :------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET  | സെർവർ നില, രജിസ്റ്റർ ചെയ്ത കഴിവുകൾ                                   | (പൊതു)                                                                                                     |
| `/api/a2a/tasks`             | GET  | ഫിൽട്ടറുകൾ ഉപയോഗിച്ച് ജോലികൾ ലിസ്റ്റ് ചെയ്യുക                        | മാനേജ്മെൻ്റ് അല്ലെങ്കിൽ API കീ (ചുവടെ കാണുക)                                                               |
| `/api/a2a/tasks/[id]`        | GET  | ID വഴി ചുമതല നേടുക                                                   | മാനേജ്മെൻ്റ് അല്ലെങ്കിൽ API കീ (ചുവടെ കാണുക)                                                               |
| `/api/a2a/tasks/[id]/cancel` | POST | പ്രവർത്തിക്കുന്ന ടാസ്ക് റദ്ദാക്കുക                                   | മാനേജ്മെൻ്റ് അല്ലെങ്കിൽ API കീ (ചുവടെ കാണുക)                                                               |
| `/.well-known/agent.json`    | GET  | ഏജൻ്റ് കാർഡ് (A2A കണ്ടെത്തൽ)                                         | (പബ്ലിക്, കാഷെ ചെയ്ത 3600സെ)                                                                               |
| `/api/a2a/tasks`             | POST | OmniConductor ഫ്ലീറ്റിലേക്കുള്ള ഇൻബൗണ്ട് ഡെലിഗേഷൻ (കണ്ടക്ടർ PRD RF5) | `GET` പോലെ തന്നെ, `REQUIRE_API_KEY` ഓഫായിരിക്കുമ്പോൾ സജ്ജീകരിച്ചാൽ `OMNIROUTE_API_KEY` പ്ലസ്; `a2aEnabled` |

ആരാണ് `/api/a2a/tasks*` റൂട്ടുകളിൽ പ്രവേശിക്കുന്നത് എന്നത് ലോഗിൻ, API-കീ ക്രമീകരണങ്ങൾ എന്നിവയെ ആശ്രയിച്ചിരിക്കുന്നു:

- `requireLogin=true` (സ്ഥിരസ്ഥിതി): മാനേജ്മെൻ്റ് ക്രെഡൻഷ്യലുകൾ (ഡാഷ്ബോർഡ് സെഷൻ, `manage` -scope API കീ, `oma_` ആക്സസ് ടോക്കൺ), `OMNIROUTE_API_KEY` എന്നിവ മാത്രമേ മിഡിൽവെയർ അംഗീകരിക്കുകയുള്ളൂ. ഒരു പ്ലെയിൻ അനുമാന കീ `403` ലഭിക്കുന്നു. `Authorization` തലക്കെട്ടിൽ മിഡിൽവെയർ `OMNIROUTE_API_KEY` `Bearer <key>` ആയി മാത്രമേ എടുക്കൂ; `Bearer` `401` ലഭിച്ചതിന് ശേഷം ഒരു വെറും കീ അല്ലെങ്കിൽ ഒരു ടാബ്.
- `requireLogin=false`, അല്ലെങ്കിൽ ഓൺബോർഡിംഗിന് മുമ്പുള്ള ലൂപ്പ്ബാക്ക് വിൻഡോ: `REQUIRE_API_KEY=true` ഉപയോഗിച്ച് ഏതെങ്കിലും സാധുവായ OmniRoute API കീ അല്ലെങ്കിൽ മാനേജ്മെൻ്റ് ക്രെഡൻഷ്യൽ സ്വീകരിക്കുകയും അജ്ഞാതമായി വിളിക്കുന്നവർക്ക് `401` ലഭിക്കുകയും ചെയ്യും; `REQUIRE_API_KEY` ഓഫ് വഴികൾ തുറന്നിരിക്കുന്നു.
- ആ വേരിയബിൾ സജ്ജീകരിക്കുകയും `REQUIRE_API_KEY` ഓഫായിരിക്കുകയും ചെയ്യുമ്പോൾ `POST /api/a2a/tasks` `Authorization` തലക്കെട്ടിൽ `OMNIROUTE_API_KEY` ആവശ്യമാണ്. `x-api-key` പോലുള്ള മറ്റ് തലക്കെട്ടുകൾ അവിടെ കണക്കാക്കില്ല. ലോഗിൻ ഓഫ് ചെയ്തോ ഓൺബോർഡ് ചെയ്യുന്നതിന് മുമ്പോ കീ ഒരു `Bearer` പ്രിഫിക്സ് ഉപയോഗിച്ചോ അല്ലാതെയോ പോകുന്നു; ലോഗിൻ ചെയ്യുമ്പോൾ, `Bearer <key>` മാത്രമേ മിഡിൽവെയറിനെ മറികടക്കുകയുള്ളൂ.

ഒരു ക്രെഡൻഷ്യൽ ആവശ്യമുള്ളിടത്ത്, ഒരു `read` -scope `oma_` ടോക്കൺ `GET` ന് മാത്രമേ പ്രവർത്തിക്കൂ.

**ഇൻബൗണ്ട് കണ്ടക്ടർ ഡെലിഗേഷൻ (`POST /api/a2a/tasks`):** ബാഹ്യ A2A ഏജൻ്റുമാർ OmniRoute വഴി കോഡിംഗ് ജോലികൾ OmniConductor ഫ്ലീറ്റിലേക്ക് നിയോഗിക്കുന്നു. ബോഡി: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — മാത്രം കണ്ടക്ടർ ഫ്ലീറ്റ് കഴിവുകൾ (ഏജൻ്റ് കാർഡിൽ പ്രഖ്യാപിച്ചവ) ഡെലിഗബിൾ ആണ്; `metadata.conductor.repo.url` ആവശ്യമാണ് (ജിറ്റ് റിപ്പോകളിൽ ഫ്ലീറ്റ് പ്രവർത്തിക്കുന്നു). സെർവർ സൈഡ് `CONDUCTOR_ORCHESTRATOR_TOKEN` (ഫാൾബാക്ക് `CONDUCTOR_HUB_TOKEN`) ഉപയോഗിച്ച് റൂട്ട് ഹബിൻ്റെ `POST /v1/tasks` ലേക്ക് വിവർത്തനം ചെയ്യുകയും `201 { conductor_task_id, state: "submitted" }` തിരികെ നൽകുകയും ചെയ്യുന്നു; ടാസ്ക് സ്റ്റേറ്റുകൾ SSE→A2A മിററിലൂടെ (RF1) തിരികെ ഒഴുകുകയും `GET /api/a2a/tasks?skill=conductor` വഴി ദൃശ്യമാവുകയും ചെയ്യുന്നു.

---

## ഒരു പുതിയ കഴിവ് ചേർക്കുന്നു

1. **നൈപുണ്യ ഫയൽ സൃഷ്ടിക്കുക:** `src/lib/a2a/skills/<your-skill>.ts`

   ഒരു async ഫംഗ്ഷൻ `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>` കയറ്റുമതി ചെയ്യുക. `smartRouting.ts` പോലുള്ള നിലവിലുള്ള കഴിവുകളുടെ ആകൃതി പിന്തുടരുക. വൈദഗ്ധ്യം HTTP ൽ നിന്ന് OmniRoute യിലേക്ക് തിരികെ വിളിക്കുകയാണെങ്കിൽ, `src/lib/a2a/selfLoopAuth.ts` ൽ നിന്ന് `buildSelfLoopHeaders(caller)` ഉപയോഗിച്ച് ഹെഡറുകൾ നിർമ്മിക്കുക, അങ്ങനെ A2A കോളറിൻ്റെ കീ ഉപയോഗിച്ച് കോൾ പ്രവർത്തിക്കുന്നു, `OMNIROUTE_API_KEY` അല്ല, കൂടാതെ `redirect: "error"` `fetch` ലേക്ക് കടത്തിവിടുക, അങ്ങനെ ഒരു റീഡയറക്ട് കീ ഒരിക്കലും ലഭിക്കില്ല. സഹായി തലക്കെട്ടുകൾ മാത്രം നിർമ്മിക്കുന്നു; ഓരോ നൈപുണ്യവും റീഡയറക്ട് നയം തന്നെ സജ്ജമാക്കുന്നു. പരിഹരിച്ച അടിസ്ഥാന URL സ്വകാര്യ നെറ്റ്വർക്കിന് പുറത്ത് പ്ലെയിൻ http ആയിരിക്കുമ്പോൾ (ലൂപ്പ്ബാക്ക്, ഒരു കണ്ടെയ്നർ അല്ലെങ്കിൽ സേവന നാമം, സ്വകാര്യ വിലാസങ്ങൾ മികച്ചതാണ്) അല്ലെങ്കിൽ ക്രെഡൻഷ്യലുകൾ കൈവശം വയ്ക്കുമ്പോൾ ഒരു കീ അറ്റാച്ചുചെയ്യുന്നതിന് പകരം ഇത് `UnsafeSelfLoopTargetError` എറിയുന്നു, അതിനാൽ നിരസിച്ച കോളുകൾ വിഴുങ്ങുന്ന ഒരു വൈദഗ്ദ്ധ്യം ആ പിശക് വീണ്ടെടുക്കണം.

2. **രജിസ്റ്റർ ഹാൻഡ്ലർ:** `src/lib/a2a/taskExecution.ts` യിൽ, `A2A_SKILL_HANDLERS` ലേക്ക് ഒരു എൻട്രി ചേർക്കുക:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **ഏജൻ്റ് കാർഡിൽ വെളിപ്പെടുത്തുക:** `src/lib/a2a/agentCardMetadata.ts` യിൽ ( `/.well-known/agent.json` ഉം `/.well-known/agent-card.json` ഉം പങ്കിട്ടത്), `skills` അറേയിലേക്ക് കൂട്ടിച്ചേർക്കുക:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **ടെസ്റ്റുകൾ എഴുതുക:** `tests/unit/a2a-<your-skill>.test.ts`. കവർ ഹാപ്പി പാത്ത് + പിശക് പാത.

5. **പ്രമാണം** ഈ ഫയലിൻ്റെ `Available Skills` പട്ടികയിലെ പുതിയ വൈദഗ്ദ്ധ്യം.

---

## ടാസ്ക് TTL

ടാസ്കുകൾ `ttlMinutes` കഴിഞ്ഞാൽ കാലഹരണപ്പെടും (ഡിഫോൾട്ട് 5 മിനിറ്റ്) — ഇത് `src/lib/a2a/taskManager.ts:82`-ലെ `A2ATaskManager` കൺസ്ട്രക്ടറിൽ കോൺഫിഗർ ചെയ്തിരിക്കുന്നു. ഇഷ്ടാനുസൃതമാക്കാൻ, `A2ATaskManager` ഇൻസ്റ്റൻഷ്യേഷൻ ഫോർക്ക് ചെയ്ത് മറ്റൊരു മൂല്യം നൽകുക (ഉദാ., 15 മിനിറ്റ് TTL-നായി `new A2ATaskManager(15)`). ഒരു പശ്ചാത്തല ഇന്റർവൽ ഓരോ 60 സെക്കൻഡിലും കാലഹരണപ്പെട്ട ടാസ്കുകൾ നീക്കംചെയ്യുന്നു.

---

## ടാസ്ക് ജീവിതചക്രം

```
submitted → working → completed
                    → failed
                    → cancelled
```

- ഡിഫോൾട്ടായി ടാസ്കുകൾ 5 മിനിറ്റിന് ശേഷം കാലഹരണപ്പെടും ([ടാസ്ക് TTL](#task-ttl) കാണുക)
- അന്തിമാവസ്ഥകൾ: `completed`, `failed`, `cancelled`
- ഓരോ അവസ്ഥാ പരിവർത്തനവും ഇവന്റ് ലോഗ് രേഖപ്പെടുത്തുന്നു

---

## പിശക് കോഡുകൾ

| കോഡ്   | അർത്ഥം                                  |
| :----- | :-------------------------------------- |
| -32700 | പാർസ് പിശക് (അസാധുവായ JSON)             |
| -32600 | അസാധുവായ അഭ്യർത്ഥന / അനധികൃതം           |
| -32601 | മെത്തഡ് അല്ലെങ്കിൽ സ്കിൽ കണ്ടെത്തിയില്ല |
| -32602 | അസാധുവായ പാരാമീറ്ററുകൾ                  |
| -32603 | ആന്തരിക പിശക്                           |
| -32000 | A2A എൻഡ്പോയിന്റ് പ്രവർത്തനരഹിതമാണ്      |

---

## സംയോജന ഉദാഹരണങ്ങൾ

### പൈത്തൺ (അഭ്യർത്ഥനകൾ)

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

### TypeScript (എടുക്കുക)

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
