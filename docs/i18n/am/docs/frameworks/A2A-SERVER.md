# OmniRoute A2A Server Documentation (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute እንደ ብልህ የማዘዋወሪያ ወኪል

የA2A በይነገጽ ሁለት ገጽታዎች አሉት፦

- **JSON-RPC 2.0** በ`POST /a2a` (ዋናው መግቢያ ነጥብ፣ በ`src/app/a2a/route.ts` የተገለጸ)።
- **REST** በ`/api/a2a/*` ስር፣ ለዳሽቦርዶች እና መሣሪያዎች (ሁኔታ፣ የተግባር ዝርዝር፣ ስረዛ)።

ተግባራት በ`A2ATaskManager` (`src/lib/a2a/taskManager.ts`፣ ነባሪ የ5 ደቂቃ TTL) ይከታተላሉ። ክህሎቶች በ`src/lib/a2a/taskExecution.ts` ውስጥ ባለው `A2A_SKILL_HANDLERS` በኩል ይመደባሉ።

## የኤጀንት ፍለጋ

```bash
curl http://localhost:20128/.well-known/agent.json
```

የOmniRouteን ችሎታዎች፣ ክህሎቶች እና የማረጋገጫ መስፈርቶች የሚገልጸውን የኤጀንት ካርድ ይመልሳል።

የኤጀንት ካርዱ `version` መስክ ከ`process.env.npm_package_version` የሚወሰድ በመሆኑ (`src/app/.well-known/agent.json/route.ts:13`ን ይመልከቱ)፣ በእያንዳንዱ ልቀት ከ`package.json` ጋር በራስ-ሰር ተመሳስሎ ይቆያል።

---

## ማረጋገጫ

ሁሉም የ`/a2a` ጥያቄዎች በ`Authorization` ራስጌ በኩል API ቁልፍ ይፈልጋሉ፦

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

በአገልጋዩ ላይ ምንም API ቁልፍ ካልተዋቀረ፣ ማረጋገጫው ይታለፋል።

## ማንቃት

A2A በ**Endpoints → A2A** መቀያየሪያ የሚቆጣጠር ሲሆን በነባሪነት የተሰናከለ ነው። ሲሰናከል፣
`GET /api/a2a/status` `status: "disabled"` እና `online: false` እንደሆነ ሪፖርት ያደርጋል፤ ወደ
`POST /a2a` የሚደረጉ የJSON-RPC ጥሪዎች HTTP 503ን ከJSON-RPC ስህተት ኮድ `-32000` ጋር ይመልሳሉ።

---

## JSON-RPC 2.0 ዘዴዎች

### `message/send` - የተመሳሰለ አፈፃፀም

ወደ ችሎታ መልእክት ይልካል እና የተሟላውን ምላሽ ይጠብቃል።

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

ለ `smart-routing`፣ `metadata.combo` ለበረንዳ ጥያቄ የ `metadata.model` ግልጽ መሻር ነው። የተላከው እንደ እውነተኛው `model` ነው እንጂ እንደ ተረሳ `x-combo` JSON መስክ አይደለም። የመተላለፊያ መንገዱ መደበኛ ኤፒአይ-ቁልፍ እና በየዒላማው ፈቃድ አሁንም ተፈጻሚ ነው። ልክ ያልሆነ ወይም ባዶ ጥምር ውድቅ ተደርጓል።

ውጤቱ `requested_combo` (የደዋይ ሐሳብ)፣ `dispatched_model` (ትክክለኛው የመግቢያ ጥያቄ)፣ `response_model` (የበረንዳ ምላሽ) እና `confirmed_combo` ያጋልጣል። የመግቢያ መንገዱ ጥምርን በግልፅ ካልለየ በስተቀር የመጨረሻው መስክ `null` ነው። A2A ውሳኔ የባህሪ አፈፃፀምን በተረጋገጠ ጥምር ላይ ብቻ ይመዘግባል፣ ያልተረጋገጠ ጥያቄን እንደ `requestedCombo` ይይዛል።

**ምላሽ፡-**

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

### `message/stream` - SSE ዥረት

ልክ እንደ `message/send` ተመሳሳይ ነገር ግን በአገልጋይ የተላኩ ክስተቶችን ለእውነተኛ ጊዜ ዥረት ይመልሳል።

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

**SSE ክስተቶች**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` - የጥያቄ ተግባር ሁኔታ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` - አንድ ተግባር ሰርዝ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## የሚገኙ ችሎታዎች

OmniRoute የሚያጋልጥ 6 A2A ችሎታዎች በ `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` ውስጥ ሽቦ . እያንዳንዱ የክህሎት ሞጁል በ `src/lib/a2a/skills/` ውስጥ ይኖራል።

| ችሎታ         | ID                   | መግለጫ                                                                                                        | መለያዎች            | ምሳሌዎች                        |
| :---------- | :------------------- | :---------------------------------------------------------------------------------------------------------- | :--------------- | :--------------------------- |
| ብልጥ ማዘዋወር   | `smart-routing`      | OmniRoute ጥምር ሞተር + ነጥብን በመጠቀም መጠየቂያውን በጥሩ provider/combo በኩል ያዞራል።                                         | ማዞሪያ, አቅራቢዎች     | "ይህን መጠየቂያ በምርጥ ሞዴል ያዙሩ"     |
| የኮታ አስተዳደር  | `quota-management`   | ሪፖርቶች በአቅራቢው ኮታ ሁኔታ፣ ደዋዮች መቼ throttle/switch እንዳለባቸው እንዲወስኑ ይረዳል                                            | ኮታ, አቅራቢዎች       | "ለአንትሮፖክቲክ ኮታ ያረጋግጡ"         |
| የአቅራቢ ግኝት   | `provider-discovery` | የተጫኑ አቅራቢዎችን በችሎታ፣በነጻ ደረጃ ባንዲራዎች፣ OAuth ሁኔታ ይዘረዝራል።                                                         | አቅራቢዎች, ግኝት      | "ምን አቅራቢዎች ይገኛሉ?"            |
| ወጪ ትንተና     | `cost-analysis`      | በቅርብ ጊዜ ጥቅም ላይ የዋለው + ካታሎግ የተሰጠው የአንድ request/conversation ዋጋ ይገምታል።                                        | ወጪ, አጠቃቀም        | "የዚህ ውይይት ወጪ ይገምቱ"           |
| የጤና ሪፖርት    | `health-report`      | የወረዳ የሚላተም ድምር, cooldown, መቆለፊያ ሁኔታ በአንድ አቅራቢ                                                               | ጤና, የመቋቋም ችሎታ    | "የሁሉም አቅራቢዎች የጤና ሁኔታን አሳይ"   |
| የዝርዝር ችሎታዎች | `list-capabilities`  | ሙሉውን ባለ 45-የግቤት ወኪል ችሎታ ካታሎግ (23 API + 21 CLI + 1 ውቅር) እንደ ማርክ ማድረጊያ ሠንጠረዥ ከጥሬ SKILL.md URLs ለአውድ መርፌ ይመልሳል | ካታሎግ, ግኝት, ክህሎቶች | "ሁሉንም OmniRoute ችሎታዎች ይዘርዝሩ" |

> የኤጀንት ካርዱ ከቀጥታ 377 አቅራቢዎች ካታሎግ ጋር ተስተካክሎ መቀመጥ አለበት። የአቅራቢ ቆጠራዎች እና free/no-auth ሜታዳታ የሚመነጩት ከአሂድ ጊዜ መዝገብ ነው።

### `list-capabilities` የክህሎት ዝርዝር

`list-capabilities` ክህሎት በተለይ OmniRoute ጥሪዎችን API በፊት ምን እንደሚያጋልጥ ማወቅ ለሚፈልጉ ውጫዊ ወኪሎች ጠቃሚ ነው። የተዋቀረ የማርክ ማድረጊያ ሰንጠረዥ ቅርስ ይመልሳል፡-

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

እያንዳንዱ ረድፍ `rawUrl` አምድ ያካትታል ስለዚህ ወኪሎች ወዲያውኑ ሙሉውን SKILL.md ማምጣት ይችላሉ። የ `metadata.totalSkills` መስክ የካታሎግ መጠኑን ያንጸባርቃል (ዛሬ 45)። ትግበራ `src/lib/a2a/skills/listCapabilities.ts`. በተጨማሪም [AGENT-SKILLS.md](./AGENT-SKILLS.md) ተመልከት.

---

## REST API (ረዳት)

የJSON-RPC መገናኛ ነጥብ `/a2a` መደበኛው የA2A መግቢያ ነጥብ ነው። ከታች ያሉት የREST መገናኛ ነጥቦች ለዳሽቦርዶች እና ለውጫዊ መሣሪያዎች ረዳት መዳረሻ ይሰጣሉ፦

| መገናኛ ነጥብ                     | ዘዴ   | መግለጫ                                               | ማረጋገጫ                                         |
| :--------------------------- | :--- | :------------------------------------------------- | :-------------------------------------------- |
| `/api/a2a/status`            | GET  | የአገልጋይ ሁኔታ፣ የተመዘገቡ ክህሎቶች                           | (ይፋዊ)                                         |
| `/api/a2a/tasks`             | GET  | ተግባራትን ከማጣሪያዎች ጋር ዘርዝር                             | አስተዳደር                                        |
| `/api/a2a/tasks/[id]`        | GET  | ተግባርን በID አግኝ                                      | አስተዳደር                                        |
| `/api/a2a/tasks/[id]/cancel` | POST | እየተከናወነ ያለን ተግባር ሰርዝ                               | አስተዳደር                                        |
| `/.well-known/agent.json`    | GET  | የወኪል ካርድ (የA2A ግኝት)                                | (ይፋዊ፣ ለ3600s የተሸጎጠ)                           |
| `/api/a2a/tasks`             | POST | ወደ OmniConductor ቡድን የሚገባ ውክልና (Conductor PRD RF5) | Bearer ከ`OMNIROUTE_API_KEY` + `a2aEnabled` ጋር |

**ወደ Conductor የሚገባ ውክልና (`POST /api/a2a/tasks`)፦** ውጫዊ የA2A ወኪሎች በOmniRoute በኩል የኮድ ሥራን ለOmniConductor ቡድን ይወክላሉ። የጥያቄ አካል፦ `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — ውክልና ሊሰጥባቸው የሚችሉት የConductor ቡድን ክህሎቶች ብቻ ናቸው (በወኪል ካርዱ ላይ የታወጁት)፤ `metadata.conductor.repo.url` ያስፈልጋል (ቡድኑ በgit repos ላይ ይሠራል)። መንገዱ በአገልጋይ በኩል ያለውን `CONDUCTOR_ORCHESTRATOR_TOKEN` (ተተኪ፦ `CONDUCTOR_HUB_TOKEN`) በመጠቀም ወደ hub `POST /v1/tasks` ይተረጉማል እና `201 { conductor_task_id, state: "submitted" }` ይመልሳል፤ የተግባር ሁኔታዎች በSSE→A2A መስታወት (RF1) በኩል ወደኋላ ይፈሳሉ፣ እንዲሁም በ`GET /api/a2a/tasks?skill=conductor` በኩል ሊታዩ ይችላሉ።

---

## አዲስ ክህሎት ማከል

1. **የክህሎት ፋይል ይፍጠሩ፦** `src/lib/a2a/skills/<your-skill>.ts`

   async function `(task: A2ATask) => Promise<{ artifacts, metadata }>` ወደ ውጭ ይላኩ። እንደ `smartRouting.ts` ያሉ ነባር ክህሎቶችን ቅርጽ ይከተሉ።

2. **መቆጣጠሪያውን ይመዝግቡ፦** በ`src/lib/a2a/taskExecution.ts` ውስጥ ወደ `A2A_SKILL_HANDLERS` ግቤት ያክሉ፦

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...ነባር ክህሎቶች
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **በወኪል ካርድ ላይ ያጋልጡ፦** በ`src/app/.well-known/agent.json/route.ts` ውስጥ ወደ `skills` ድርድር ያክሉ፦

   ```json
   {
     "id": "your-skill",
     "name": "የእርስዎ ክህሎት",
     "description": "አጭር፣ በዓላማ ላይ ያተኮረ መግለጫ",
     "tags": ["routing", "quota"],
     "examples": ["የተፈጥሮ ቋንቋ ጥሪ ምሳሌ"]
   }
   ```

4. **ሙከራዎችን ይጻፉ፦** `tests/unit/a2a-<your-skill>.test.ts`። የተሳካ መንገድን + የስህተት መንገድን ይሸፍኑ።

5. አዲሱን ክህሎት በዚህ ፋይል `Available Skills` ሰንጠረዥ ውስጥ **ይመዝግቡ**።

---

## የተግባር TTL

ተግባራት ከ`ttlMinutes` በኋላ (ነባሪው 5 ደቂቃ) ጊዜያቸው ያልፋል — ይህም በ`src/lib/a2a/taskManager.ts:82` ላይ ባለው የ`A2ATaskManager` constructor ውስጥ ተዋቅሯል። ለማበጀት የ`A2ATaskManager` instantiationን fork በማድረግ የተለየ እሴት ያስተላልፉ (ለምሳሌ፣ ለ15 ደቂቃ TTL `new A2ATaskManager(15)`)። አንድ የጀርባ interval በየ60 ሰከንዱ ጊዜያቸው ያለፉ ተግባራትን ያጸዳል።

---

## የተግባር የሕይወት ዑደት

```
ገብቷል → በሂደት ላይ → ተጠናቋል
                       → አልተሳካም
                       → ተሰርዟል
```

- ተግባራት በነባሪ ከ5 ደቂቃ በኋላ ጊዜያቸው ያልፋል ([የተግባር TTL](#task-ttl)ን ይመልከቱ)
- የመጨረሻ ሁኔታዎች፦ `completed`፣ `failed`፣ `cancelled`
- የክስተት መዝገቡ እያንዳንዱን የሁኔታ ሽግግር ይከታተላል

---

## የስህተት ኮዶች

| ኮድ     | ትርጉም                       |
| :----- | :------------------------- |
| -32700 | የመተንተን ስህተት (ልክ ያልሆነ JSON) |
| -32600 | ልክ ያልሆነ ጥያቄ / ያልተፈቀደ       |
| -32601 | ዘዴው ወይም ክህሎቱ አልተገኘም        |
| -32602 | ልክ ያልሆኑ መለኪያዎች             |
| -32603 | ውስጣዊ ስህተት                  |
| -32000 | የA2A endpoint ተሰናክሏል       |

---

## የውህደት ምሳሌዎች

### Python (ጥያቄዎች)

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

### TypeScript (አምጣ)

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
