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

### `message/send` — የተመሳሰለ አፈጻጸም

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

ለ `smart-routing`፣ `metadata.combo` ለበረንዳ ጥያቄ የ `metadata.model` ግልጽ መሻር ነው። የተላከው እንደ እውነተኛው `model` ነው እንጂ እንደ ተረሳ `x-combo` JSON መስክ አይደለም። የመግቢያ መንገዱ መደበኛ ኤፒአይ-ቁልፍ እና በየዒላማው ፈቃድ አሁንም ተፈጻሚ ነው። ልክ ያልሆነ ወይም ባዶ ጥምር ውድቅ ተደርጓል።

ውጤቱ `requested_combo` (የደዋይ ሐሳብ)፣ `dispatched_model` (ትክክለኛው የመግቢያ ጥያቄ)፣ `response_model` (የበረንዳ ምላሽ) እና `confirmed_combo` ያጋልጣል። የመግቢያ መንገዱ ጥምርን በግልፅ ካልለየ በስተቀር የመጨረሻው መስክ `null` ነው። A2A ውሳኔ የባህሪ አፈፃፀምን በተረጋገጠ ጥምር ብቻ ይመዘግባል፣ ያልተረጋገጠ ጥያቄን እንደ `requestedCombo` ይይዛል።

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

### `message/stream` — SSE ዥረት

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

### `tasks/get` — የመጠይቅ ተግባር ሁኔታ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — አንድ ተግባር ሰርዝ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## የሚገኙ ችሎታዎች

OmniRoute በ `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` ውስጥ የተጣመሩ 6 A2A ችሎታዎችን አጋልጧል። እያንዳንዱ የክህሎት ሞጁል በ `src/lib/a2a/skills/` ውስጥ ይኖራል።

| ችሎታ         | ID                   | መግለጫ                                                                                                     | መለያዎች            | ምሳሌዎች                        |
| :---------- | :------------------- | :------------------------------------------------------------------------------------------------------- | :--------------- | :--------------------------- |
| ብልጥ ማዘዋወር   | `smart-routing`      | የ OmniRoute ጥምር ሞተር + ውጤትን በመጠቀም መጠየቂያውን በጥሩ provider/combo በኩል ያዞራል።                                    | ማዞሪያ, አቅራቢዎች     | "ይህን መጠየቂያ በምርጥ ሞዴል ያዙሩ"     |
| የኮታ አስተዳደር  | `quota-management`   | በአንድ አቅራቢ የኮታ ሁኔታ ሪፖርቶች፣ ደዋዮች መቼ ወደ throttle/switch እንደሚሄዱ እንዲወስኑ ያግዛል።                                  | ኮታ, አቅራቢዎች       | "ለአንትሮፖክቲክ ኮታ ያረጋግጡ"         |
| የአቅራቢ ግኝት   | `provider-discovery` | የተጫኑ አቅራቢዎችን አቅም፣ የነጻ ደረጃ ባንዲራዎችን፣ OAuth ሁኔታን ይዘረዝራል።                                                    | አቅራቢዎች, ግኝት      | "ምን አቅራቢዎች ይገኛሉ?"            |
| ወጪ ትንተና     | `cost-analysis`      | በቅርብ ጊዜ ጥቅም ላይ የዋለው የ + ካታሎግ የተሰጠው የ request/conversation ወጪ ይገምታል።                                      | ወጪ, አጠቃቀም        | "የዚህ ውይይት ወጪ ይገምቱ"           |
| የጤና ሪፖርት    | `health-report`      | የወረዳ የሚላተም ድምር, cooldown, መቆለፊያ ሁኔታ በአንድ አቅራቢ                                                            | ጤና, የመቋቋም ችሎታ    | "የሁሉም አቅራቢዎች የጤና ሁኔታን አሳይ"   |
| የዝርዝር ችሎታዎች | `list-capabilities`  | ሙሉውን ባለ 45-የግቤት ወኪል ችሎታ ካታሎግ (23 API + 21 CLI + 1 ውቅር) እንደ ማርክ ሠንጠረዥ ከጥሬ SKILL.md URLs ጋር ለአውድ መርፌ ይመልሳል | ካታሎግ, ግኝት, ክህሎቶች | "ሁሉንም OmniRoute ችሎታዎች ይዘርዝሩ" |

> የኤጀንት ካርዱ ከቀጥታ 385 አቅራቢ ካታሎግ ጋር ተስተካክሎ መቀመጥ አለበት። የአቅራቢ ቆጠራ እና free/no-auth ሜታዳታ የሚመነጩት ከአሂድ ጊዜ መዝገብ ነው።

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

የJSON-RPC የመጨረሻ ነጥብ `/a2a` ቀኖናዊ A2A መግቢያ ነጥብ ነው። ከታች ያሉት የ REST የመጨረሻ ነጥቦች ለዳሽቦርዶች እና ለውጫዊ መሳሪያዎች ረዳት መዳረሻ ይሰጣሉ፡-

| የመጨረሻ ነጥብ                    | ዘዴ   | መግለጫ                                              | እውነት                                                                        |
| :--------------------------- | :--- | :------------------------------------------------ | :-------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET  | የአገልጋይ ሁኔታ, የተመዘገቡ ክህሎቶች                          | (የህዝብ)                                                                      |
| `/api/a2a/tasks`             | GET  | ስራዎችን ከማጣሪያዎች ጋር ይዘርዝሩ                            | አስተዳደር ወይም API ቁልፍ (ከዚህ በታች ይመልከቱ)                                          |
| `/api/a2a/tasks/[id]`        | GET  | ተግባር በ ID ያግኙ                                     | አስተዳደር ወይም API ቁልፍ (ከዚህ በታች ይመልከቱ)                                          |
| `/api/a2a/tasks/[id]/cancel` | POST | የማሄድ ተግባር ሰርዝ                                     | አስተዳደር ወይም API ቁልፍ (ከዚህ በታች ይመልከቱ)                                          |
| `/.well-known/agent.json`    | GET  | ወኪል ካርድ (A2A ግኝት)                                 | (የወል፣ የተሸጎጡ 3600ዎች)                                                         |
| `/api/a2a/tasks`             | POST | ወደ OmniConductor መርከቦች የሚገቡ ውክልና (አስተዳዳሪ PRD RF5) | `GET` `REQUIRE_API_KEY` ሳለ ከተዋቀረ `OMNIROUTE_API_KEY` ጋር ተመሳሳይ፣ `a2aEnabled` |

ወደ `/api/a2a/tasks*` መንገዶች የሚሄደው በመግቢያ እና በኤፒአይ-ቁልፍ ቅንጅቶች ላይ ነው፡-

- `requireLogin=true` (ነባሪ)፡ መካከለኛው ዌር የአስተዳደር ምስክርነቶችን ብቻ ይቀበላል (ዳሽቦርድ ክፍለ ጊዜ፣ `manage` -scope API ቁልፍ፣ `oma_` መዳረሻ ቶከን) እና `OMNIROUTE_API_KEY`። ግልጽ የሆነ የማመሳከሪያ ቁልፍ `403` ያገኛል። በ `Authorization` ራስጌ መካከለኛ ዌር `OMNIROUTE_API_KEY` እንደ `Bearer <key>` ብቻ ነው የሚወስደው; `Bearer` `401` ካገኘ በኋላ ባዶ ቁልፍ ወይም ትር።
- `requireLogin=false`፣ ወይም ከመሳፈሩ በፊት የ loopback መስኮት: በ `REQUIRE_API_KEY=true` ማንኛውም ትክክለኛ OmniRoute API ቁልፍ ወይም የአስተዳደር ምስክርነት ተቀባይነት አለው እና ማንነታቸው ያልታወቁ ደዋዮች `401` ያገኛሉ። በ `REQUIRE_API_KEY` ከመንገዶቹ ውጭ ክፍት ናቸው።
- `POST /api/a2a/tasks` በተጨማሪ በ `Authorization` ራስጌ ላይ ያ ተለዋዋጭ ሲዘጋጅ እና `REQUIRE_API_KEY` ሲጠፋ `OMNIROUTE_API_KEY` ያስፈልገዋል። እንደ `x-api-key` ያሉ ሌሎች ራስጌዎች እዚያ አይቆጠሩም። ከመግባትዎ በፊት ወይም ከመሳፈርዎ በፊት ቁልፉ በ `Bearer` ቅድመ ቅጥያ ወይም ያለሱ ያልፋል። ከመግባት ጋር፣ `Bearer <key>` ብቻ ነው መካከለኛውን የሚያልፈው።

ምስክርነት በሚያስፈልግበት ጊዜ፣ `read` -scope `oma_` token ለ `GET` ብቻ ይሰራል።

**ወደ ውስጥ የመግባት መሪ ልዑካን (`POST /api/a2a/tasks`):** የውጭ A2A ወኪሎች የኮድ ሥራን በ OmniRoute በኩል ወደ OmniConductor መርከቦች ይወክላሉ። አካል `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — ብቻ የመምራት ችሎታ (በወኪሉ ካርድ ላይ የተገለጹት) ውክልና ያላቸው ናቸው። `metadata.conductor.repo.url` ያስፈልጋል (መርከቦቹ በ git repos ላይ ይሰራሉ)። መንገዱ በአገልጋዩ በኩል `CONDUCTOR_ORCHESTRATOR_TOKEN` (fallback `CONDUCTOR_HUB_TOKEN`) በመጠቀም ወደ hub's `POST /v1/tasks` ይተረጎማል እና `201 { conductor_task_id, state: "submitted" }` ይመለሳል። የተግባር ሁኔታዎች በ SSE→A2A መስታወት (RF1) በኩል ይመለሳሉ እና በ `GET /api/a2a/tasks?skill=conductor` በኩል ይታያሉ።

---

## አዲስ ችሎታ መጨመር

1. **የክህሎት ፋይል ይፍጠሩ፡** `src/lib/a2a/skills/<your-skill>.ts`

   ያልተመሳሰለ ተግባር `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>` ወደ ውጪ ላክ። እንደ `smartRouting.ts` ያሉ የነባር ክህሎቶችን ቅርፅ ይከተሉ። ክህሎቱ ወደ OmniRoute በ HTTP ላይ ከደወለ፣ ራስጌዎቹን በ `buildSelfLoopHeaders(caller)` ከ `src/lib/a2a/selfLoopAuth.ts` ይገንቡ ስለዚህ ጥሪው በ A2A ደዋይ ቁልፍ እንጂ `OMNIROUTE_API_KEY` አይደለም፣ እና `redirect: "error"` ወደ `fetch` ያስተላልፉ ስለዚህ ማዘዋወር ቁልፉን በጭራሽ አያገኝም። ረዳቱ ራስጌዎችን ብቻ ይገነባል; እያንዳንዱ ክህሎት የማዘዋወር ፖሊሲውን ራሱ ያዘጋጃል። ከግል አውታረመረብ ውጭ የተፈታው ቤዝ URL ግልጽ በሆነ http (loopback፣container or service name እና የግል አድራሻዎች ጥሩ ናቸው) ወይም ምስክርነቶችን ሲይዝ ቁልፍ ከማያያዝ ይልቅ `UnsafeSelfLoopTargetError` ይጥላል፣ስለዚህ ውድቅ የተደረገ ጥሪን የሚውጥ ክህሎት ያንን ስህተት መሻር አለበት።

2. **መመዝገቢያ ተቆጣጣሪ፡-** `src/lib/a2a/taskExecution.ts` ውስጥ፣ ወደ `A2A_SKILL_HANDLERS` ግቤት ያክሉ፡-

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **በወኪል ካርድ ውስጥ መጋለጥ;** በ `src/lib/a2a/agentCardMetadata.ts` (በ `/.well-known/agent.json` እና `/.well-known/agent-card.json` የተጋራ)፣ ከ `skills` አደራደር ጋር አባሪ፡-

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **ፈተናዎችን ይፃፉ;** `tests/unit/a2a-<your-skill>.test.ts`. የደስታ መንገድን ይሸፍኑ + የስህተት መንገድ።

5. **ሰነድ** በዚህ ፋይል `Available Skills` ሰንጠረዥ ውስጥ ያለው አዲሱ ችሎታ።

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
