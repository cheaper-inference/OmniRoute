# OmniRoute A2A Server Documentation (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute ជាភ្នាក់ងារកំណត់ផ្លូវឆ្លាតវៃ

ផ្ទៃប្រើប្រាស់ A2A មានពីរទម្រង់៖

- **JSON-RPC 2.0** នៅ `POST /a2a` (ចំណុចចូលចម្បង ដែលបានកំណត់នៅក្នុង `src/app/a2a/route.ts`)។
- **REST** នៅក្រោម `/api/a2a/*` សម្រាប់ផ្ទាំងគ្រប់គ្រង និងឧបករណ៍នានា (ស្ថានភាព បញ្ជីកិច្ចការ ការបោះបង់)។

កិច្ចការត្រូវបានតាមដានដោយ `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL លំនាំដើមរយៈពេល 5 នាទី)។ ជំនាញត្រូវបានបញ្ជូនទៅដំណើរការតាមរយៈ `A2A_SKILL_HANDLERS` នៅក្នុង `src/lib/a2a/taskExecution.ts`។

## ការស្វែងរក Agent

```bash
curl http://localhost:20128/.well-known/agent.json
```

ត្រឡប់ Agent Card ដែលពិពណ៌នាអំពីសមត្ថភាព skills និងតម្រូវការផ្ទៀងផ្ទាត់អត្តសញ្ញាណរបស់ OmniRoute។

វាល `version` របស់ Agent Card ត្រូវបានយកពី `process.env.npm_package_version` (សូមមើល `src/app/.well-known/agent.json/route.ts:13`) ដូច្នេះវានឹងធ្វើសមកាលកម្មដោយស្វ័យប្រវត្តិជាមួយ `package.json` នៅរាល់ការចេញផ្សាយនីមួយៗ។

---

## ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ

រាល់សំណើ `/a2a` ទាំងអស់តម្រូវឱ្យមាន API key តាមរយៈ header `Authorization`៖

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

ប្រសិនបើមិនមាន API key ត្រូវបានកំណត់នៅលើម៉ាស៊ីនមេទេ ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណនឹងត្រូវបានរំលង។

## ការបើកដំណើរការ

A2A ត្រូវបានគ្រប់គ្រងដោយប៊ូតុងបិទបើក **Endpoints → A2A** ហើយត្រូវបានបិទតាមលំនាំដើម។ នៅពេលបិទ
`GET /api/a2a/status` រាយការណ៍ `status: "disabled"` និង `online: false`; ការហៅ JSON-RPC ទៅកាន់
`POST /a2a` ត្រឡប់ HTTP 503 ជាមួយលេខកូដកំហុស JSON-RPC `-32000`។

---

## វិធីសាស្ត្រ JSON-RPC 2.0

### `message/send` — ការប្រតិបត្តិបែបសមកាលកម្ម

ផ្ញើសារទៅជំនាញមួយ ហើយរង់ចាំការឆ្លើយតបពេញលេញ។

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

សម្រាប់ `smart-routing` នោះ `metadata.combo` គឺជាការកំណត់ជាន់លើ `metadata.model` ដោយច្បាស់លាស់សម្រាប់សំណើទៅកាន់ gateway។ វាត្រូវបានផ្ញើជា `model` ពិតប្រាកដ មិនមែនជាវាល JSON `x-combo` ដែលត្រូវបានមិនអើពើនោះទេ។ ការផ្ទៀងផ្ទាត់ API key ធម្មតារបស់ gateway និងការផ្តល់សិទ្ធិតាមគោលដៅនីមួយៗនៅតែត្រូវបានអនុវត្ត។ combo ដែលមិនត្រឹមត្រូវ ឬទទេ នឹងត្រូវបានបដិសេធ។

លទ្ធផលបង្ហាញ `requested_combo` (បំណងរបស់អ្នកហៅ), `dispatched_model` (សំណើជាក់ស្តែងទៅកាន់ gateway), `response_model` (ការឆ្លើយតបរបស់ gateway) និង `confirmed_combo`។ វាលចុងក្រោយនឹងមានតម្លៃ `null` លុះត្រាតែ gateway កំណត់អត្តសញ្ញាណ combo មួយយ៉ាងច្បាស់លាស់។ កំណត់ហេតុនៃការសម្រេចចិត្ត A2A កំណត់ការប្រតិបត្តិទៅឱ្យតែ combo ដែលបានបញ្ជាក់ប៉ុណ្ណោះ ដោយរក្សាទុកសំណើដែលមិនបានបញ្ជាក់ជា `requestedCombo`។

**ការឆ្លើយតប៖**

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

### `message/stream` — ការផ្សាយបន្តផ្ទាល់តាម SSE

ដូចគ្នានឹង `message/send` ដែរ ប៉ុន្តែវាត្រឡប់ព្រឹត្តិការណ៍ដែលផ្ញើពីម៉ាស៊ីនមេ សម្រាប់ការផ្សាយបន្តផ្ទាល់តាមពេលវេលាជាក់ស្តែង។

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

**ព្រឹត្តិការណ៍ SSE៖**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — សាកសួរស្ថានភាពកិច្ចការ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — បោះបង់កិច្ចការ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ជំនាញដែលមាន

OmniRoute ផ្តល់ជំនាញ A2A ចំនួន 6 ដែលត្រូវបានភ្ជាប់នៅក្នុង `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`។ ម៉ូឌុលជំនាញនីមួយៗស្ថិតនៅក្នុង `src/lib/a2a/skills/`។

| ជំនាញ              | ID                   | ការពិពណ៌នា                                                                                                                                    | ស្លាក                      | ឧទាហរណ៍                                   |
| :----------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :---------------------------------------- |
| Smart Routing      | `smart-routing`      | ផ្តល់ផ្លូវ prompt តាម provider/combo ដែលល្អបំផុត ដោយប្រើ combo engine របស់ OmniRoute រួមជាមួយការវាយពិន្ទុ                                     | routing, providers         | "ផ្តល់ផ្លូវ prompt នេះតាមម៉ូដែលល្អបំផុត"  |
| Quota Management   | `quota-management`   | រាយការណ៍ស្ថានភាព quota តាម provider នីមួយៗ និងជួយអ្នកហៅសម្រេចចិត្តពេលណាត្រូវ throttle/ប្តូរ                                                   | quota, providers           | "ពិនិត្យ quota សម្រាប់ anthropic"         |
| Provider Discovery | `provider-discovery` | រាយបញ្ជី provider ដែលបានដំឡើង ជាមួយសមត្ថភាព ទង់ free-tier និងស្ថានភាព OAuth                                                                   | providers, discovery       | "តើមាន provider អ្វីខ្លះដែលអាចប្រើបាន?"   |
| Cost Analysis      | `cost-analysis`      | ប៉ាន់ស្មានថ្លៃដើមនៃសំណើ/ការសន្ទនា ដោយផ្អែកលើកាតាឡុក និងការប្រើប្រាស់ថ្មីៗ                                                                     | cost, usage                | "ប៉ាន់ស្មានថ្លៃដើមសម្រាប់ការសន្ទនានេះ"    |
| Health Report      | `health-report`      | បូកបញ្ចូលស្ថានភាព circuit breaker, cooldown និង lockout តាម provider នីមួយៗ                                                                   | health, resilience         | "បង្ហាញស្ថានភាពសុខភាពនៃ provider ទាំងអស់" |
| List Capabilities  | `list-capabilities`  | ត្រឡប់កាតាឡុក Agent Skills ពេញលេញចំនួន 45 ធាតុ (23 API + 21 CLI + 1 config) ជាតារាង markdown ដែលមាន URL ឆៅរបស់ SKILL.md សម្រាប់ការបញ្ចូលបរិបទ | catalog, discovery, skills | "រាយបញ្ជីសមត្ថភាពទាំងអស់របស់ OmniRoute"   |

> Agent Card គួរតែត្រូវបានរក្សាឱ្យស្របគ្នាជាមួយកាតាឡុក provider ចំនួន 376 ដែលកំពុងដំណើរការ។ ចំនួន provider និង metadata អំពី free/no-auth ត្រូវបានយកមកពី runtime registry។

### ព័ត៌មានលម្អិតអំពីជំនាញ `list-capabilities`

ជំនាញ `list-capabilities` មានប្រយោជន៍ជាពិសេសសម្រាប់ agent ខាងក្រៅដែលត្រូវការស្វែងរកអ្វីដែល OmniRoute ផ្តល់ជូន មុនពេលផ្ញើការហៅ API។ វាត្រឡប់ artifact ជាតារាង markdown ដែលមានរចនាសម្ព័ន្ធ៖

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

ជួរដេកនីមួយៗរួមមានជួរឈរ `rawUrl` ដើម្បីឱ្យ agent អាចទាញយក SKILL.md ពេញលេញបានភ្លាមៗ។ វាល `metadata.totalSkills` ឆ្លុះបញ្ចាំងទំហំកាតាឡុក (45 នាពេលបច្ចុប្បន្ន)។ ការអនុវត្ត៖ `src/lib/a2a/skills/listCapabilities.ts`។ សូមមើលផងដែរ [AGENT-SKILLS.md](./AGENT-SKILLS.md)។

---

## REST API (ជំនួយបន្ថែម)

ចំណុចបញ្ចប់ JSON-RPC `/a2a` គឺជាចំណុចចូល A2A ផ្លូវការ។ ចំណុចបញ្ចប់ REST ខាងក្រោមផ្តល់នូវការចូលប្រើបន្ថែមសម្រាប់ផ្ទាំងគ្រប់គ្រង និងឧបករណ៍ខាងក្រៅ៖

| ចំណុចបញ្ចប់                  | វិធីសាស្ត្រ | ការពិពណ៌នា                                                      | ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ                         |
| :--------------------------- | :---------- | :-------------------------------------------------------------- | :----------------------------------------------- |
| `/api/a2a/status`            | GET         | ស្ថានភាពម៉ាស៊ីនមេ និងជំនាញដែលបានចុះឈ្មោះ                        | (សាធារណៈ)                                        |
| `/api/a2a/tasks`             | GET         | រាយបញ្ជីកិច្ចការជាមួយតម្រង                                      | ការគ្រប់គ្រង                                     |
| `/api/a2a/tasks/[id]`        | GET         | ទាញយកកិច្ចការតាម ID                                             | ការគ្រប់គ្រង                                     |
| `/api/a2a/tasks/[id]/cancel` | POST        | បោះបង់កិច្ចការដែលកំពុងដំណើរការ                                  | ការគ្រប់គ្រង                                     |
| `/.well-known/agent.json`    | GET         | កាតភ្នាក់ងារ (ការស្វែងរក A2A)                                   | (សាធារណៈ, រក្សាទុកក្នុងឃ្លាំងសម្ងាត់ 3600s)      |
| `/api/a2a/tasks`             | POST        | ការប្រគល់ការងារចូលទៅកាន់ក្រុម OmniConductor (Conductor PRD RF5) | Bearer ធៀបនឹង `OMNIROUTE_API_KEY` + `a2aEnabled` |

**ការប្រគល់ការងារចូលពី Conductor (`POST /api/a2a/tasks`):** ភ្នាក់ងារ A2A ខាងក្រៅប្រគល់ការងារសរសេរកូដទៅក្រុម OmniConductor តាមរយៈ OmniRoute។ ខ្លឹមសារសំណើ៖ `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — មានតែជំនាញរបស់ក្រុម Conductor ប៉ុណ្ណោះ (ជំនាញដែលបានប្រកាសនៅលើកាតភ្នាក់ងារ) ដែលអាចត្រូវបានប្រគល់ការងារ; `metadata.conductor.repo.url` ត្រូវតែមាន (ក្រុមនេះធ្វើការលើ git repos)។ ផ្លូវនេះបម្លែងទៅជា `POST /v1/tasks` របស់ hub ដោយប្រើ `CONDUCTOR_ORCHESTRATOR_TOKEN` នៅផ្នែកម៉ាស៊ីនមេ (ប្រើ `CONDUCTOR_HUB_TOKEN` ជាជម្រើសបម្រុង) ហើយត្រឡប់ `201 { conductor_task_id, state: "submitted" }`; ស្ថានភាពកិច្ចការត្រូវបានបញ្ជូនត្រឡប់តាមរយៈកញ្ចក់ SSE→A2A (RF1) ហើយអាចមើលឃើញតាមរយៈ `GET /api/a2a/tasks?skill=conductor`។

---

## ការបន្ថែមជំនាញថ្មី

1. **បង្កើតឯកសារជំនាញ៖** `src/lib/a2a/skills/<your-skill>.ts`

   Export អនុគមន៍ async `(task: A2ATask) => Promise<{ artifacts, metadata }>`។ អនុវត្តតាមទម្រង់របស់ជំនាញដែលមានស្រាប់ដូចជា `smartRouting.ts`។

2. **ចុះឈ្មោះ handler៖** នៅក្នុង `src/lib/a2a/taskExecution.ts` បន្ថែមធាតុមួយទៅ `A2A_SKILL_HANDLERS`៖

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...ជំនាញដែលមានស្រាប់
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **បង្ហាញក្នុងកាតភ្នាក់ងារ៖** នៅក្នុង `src/app/.well-known/agent.json/route.ts` បន្ថែមទៅខាងចុងនៃ array `skills`៖

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **សរសេរការធ្វើតេស្ត៖** `tests/unit/a2a-<your-skill>.test.ts`។ គ្របដណ្តប់ទាំងករណីជោគជ័យ + ករណីមានកំហុស។

5. **ចងក្រងឯកសារ** សម្រាប់ជំនាញថ្មីនៅក្នុងតារាង `Available Skills` របស់ឯកសារនេះ។

---

## TTL របស់កិច្ចការ

កិច្ចការផុតកំណត់បន្ទាប់ពី `ttlMinutes` (តម្លៃលំនាំដើម 5 នាទី) — ដែលត្រូវបានកំណត់នៅក្នុង constructor របស់ `A2ATaskManager` នៅ `src/lib/a2a/taskManager.ts:82`។ ដើម្បីកំណត់តាមបំណង សូម fork ការបង្កើត instance របស់ `A2ATaskManager` ហើយបញ្ជូនតម្លៃផ្សេងមួយ (ឧទាហរណ៍ `new A2ATaskManager(15)` សម្រាប់ TTL រយៈពេល 15 នាទី)។ interval ដែលដំណើរការនៅផ្ទៃខាងក្រោយនឹងសម្អាតកិច្ចការដែលផុតកំណត់រៀងរាល់ 60 វិនាទី។

---

## វដ្តជីវិតរបស់កិច្ចការ

```
បានដាក់ស្នើ → កំពុងដំណើរការ → បានបញ្ចប់
                              → បានបរាជ័យ
                              → បានបោះបង់
```

- កិច្ចការផុតកំណត់បន្ទាប់ពី 5 នាទីតាមលំនាំដើម (សូមមើល [TTL របស់កិច្ចការ](#task-ttl))
- ស្ថានភាពបញ្ចប់៖ `completed`, `failed`, `cancelled`
- កំណត់ហេតុព្រឹត្តិការណ៍តាមដានរាល់ការផ្លាស់ប្តូរស្ថានភាព

---

## កូដកំហុស

| កូដ    | អត្ថន័យ                               |
| :----- | :------------------------------------ |
| -32700 | កំហុសក្នុងការញែក (JSON មិនត្រឹមត្រូវ) |
| -32600 | សំណើមិនត្រឹមត្រូវ / មិនមានការអនុញ្ញាត |
| -32601 | រកមិនឃើញ method ឬ skill               |
| -32602 | params មិនត្រឹមត្រូវ                  |
| -32603 | កំហុសខាងក្នុង                         |
| -32000 | A2A endpoint ត្រូវបានបិទ              |

---

## ឧទាហរណ៍នៃការរួមបញ្ចូល

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
