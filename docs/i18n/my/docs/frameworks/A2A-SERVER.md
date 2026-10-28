# OmniRoute A2A Server Documentation (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — အသိဉာဏ်ရှိသော လမ်းကြောင်းရွေးချယ်ရေး agent အဖြစ် OmniRoute

A2A မျက်နှာပြင်တွင် ပုံစံနှစ်မျိုးရှိသည်-

- **JSON-RPC 2.0** ကို `POST /a2a` တွင် အသုံးပြုနိုင်သည် (စံသတ်မှတ်ထားသော အဓိကဝင်ပေါက်ဖြစ်ပြီး `src/app/a2a/route.ts` တွင် သတ်မှတ်ထားသည်)။
- dashboard များနှင့် ကိရိယာများအတွက် **REST** ကို `/api/a2a/*` အောက်တွင် အသုံးပြုနိုင်သည် (အခြေအနေ၊ task စာရင်း၊ ပယ်ဖျက်ခြင်း)။

Task များကို `A2ATaskManager` (`src/lib/a2a/taskManager.ts`၊ မူလသတ်မှတ်ထားသော TTL သည် ၅ မိနစ်) ဖြင့် ခြေရာခံသည်။ Skill များကို `src/lib/a2a/taskExecution.ts` ရှိ `A2A_SKILL_HANDLERS` မှတစ်ဆင့် ဖြန့်ဝေလုပ်ဆောင်သည်။

## အေးဂျင့် ရှာဖွေခြင်း

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute ၏ လုပ်ဆောင်နိုင်စွမ်းများ၊ စွမ်းရည်များနှင့် စစ်မှန်ကြောင်းအတည်ပြုမှု လိုအပ်ချက်များကို ဖော်ပြထားသည့် Agent Card ကို ပြန်ပေးသည်။

Agent Card ၏ `version` အကွက်ကို `process.env.npm_package_version` မှ ရယူသည် (`src/app/.well-known/agent.json/route.ts:13` ကို ကြည့်ပါ)။ ထို့ကြောင့် ထုတ်ဝေမှုတိုင်းတွင် `package.json` နှင့် အလိုအလျောက် တစ်ပြေးညီဖြစ်နေသည်။

---

## စစ်မှန်ကြောင်းအတည်ပြုခြင်း

`/a2a` တောင်းဆိုမှုအားလုံးအတွက် `Authorization` header မှတစ်ဆင့် API key တစ်ခု လိုအပ်သည်-

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

ဆာဗာတွင် API key သတ်မှတ်ထားခြင်းမရှိပါက စစ်မှန်ကြောင်းအတည်ပြုခြင်းကို ကျော်သွားမည်ဖြစ်သည်။

## ဖွင့်ထားမှု

A2A ကို **အဆုံးမှတ်များ → A2A** အဖွင့်အပိတ်ခလုတ်ဖြင့် ထိန်းချုပ်ပြီး မူလအားဖြင့် ပိတ်ထားသည်။ ပိတ်ထားသည့်အခါ
`GET /api/a2a/status` သည် `status: "disabled"` နှင့် `online: false` ဟု အစီရင်ခံသည်။ `POST /a2a` သို့
JSON-RPC ခေါ်ဆိုမှုများသည် JSON-RPC အမှားကုဒ် `-32000` နှင့်အတူ HTTP 503 ကို ပြန်ပေးသည်။

---

## JSON-RPC 2.0 နည်းလမ်းများ

### `message/send` — တစ်ပြိုင်တည်း လုပ်ဆောင်ခြင်း

skill တစ်ခုထံ မက်ဆေ့ချ်ပို့ပြီး ပြည့်စုံသော တုံ့ပြန်ချက်ကို စောင့်ဆိုင်းသည်။

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

`smart-routing` အတွက် `metadata.combo` သည် gateway request အတွက်
`metadata.model` ကို အတိအလင်း အစားထိုးသတ်မှတ်ခြင်းဖြစ်ပြီး၊ လျစ်လျူရှုခံရသော `x-combo`
JSON field အဖြစ်မဟုတ်ဘဲ တကယ့် `model` အဖြစ် ပို့သည်။ Gateway ၏ ပုံမှန် API key နှင့်
target တစ်ခုချင်းစီအလိုက် ခွင့်ပြုချက်သတ်မှတ်မှုများသည် ဆက်လက်သက်ရောက်သည်။ မမှန်ကန်သော သို့မဟုတ် ဗလာဖြစ်သော combo ကို ငြင်းပယ်သည်။

ရလဒ်တွင် `requested_combo` (ခေါ်ဆိုသူ၏ ရည်ရွယ်ချက်)၊ `dispatched_model`
(တကယ်ပို့လိုက်သော gateway request)၊ `response_model` (gateway တုံ့ပြန်ချက်) နှင့်
`confirmed_combo` တို့ကို ဖော်ပြသည်။ Gateway က combo တစ်ခုကို အတိအလင်း
သတ်မှတ်ဖော်ပြခြင်းမရှိပါက နောက်ဆုံး field သည် `null` ဖြစ်သည်။ A2A ဆုံးဖြတ်ချက် log များသည် လုပ်ဆောင်မှုကို
အတည်ပြုပြီးသော combo ထံသာ သတ်မှတ်မှတ်တမ်းတင်ပြီး၊ အတည်မပြုရသေးသော request ကို `requestedCombo` အဖြစ် ဆက်လက်ထိန်းသိမ်းထားသည်။

**တုံ့ပြန်ချက်:**

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

### `message/stream` — SSE ဖြင့် တိုက်ရိုက်ထုတ်လွှင့်ခြင်း

`message/send` နှင့် တူညီသော်လည်း အချိန်နှင့်တစ်ပြေးညီ တိုက်ရိုက်ထုတ်လွှင့်ရန်အတွက် Server-Sent Events ကို ပြန်ပေးသည်။

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

**SSE Event များ:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Task အခြေအနေကို မေးမြန်းခြင်း

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Task တစ်ခုကို ပယ်ဖျက်ခြင်း

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ရနိုင်သောအရည်အချင်းများ

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` တွင်ကြိုးတပ်ထားသော A2A ကျွမ်းကျင်မှု 6 ခုကိုဖော်ထုတ်သည်။ ကျွမ်းကျင်မှု module တစ်ခုစီသည် `src/lib/a2a/skills/` တွင်နေထိုင်သည်။

| ကျွမ်းကျင်မှု                    | ID                   | ဖော်ပြချက်                                                                                                                                                           | တဂ်                                        | ဥပမာများ                                                 |
| :------------------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------- | :------------------------------------------------------- |
| စမတ်လမ်းကြောင်း                  | `smart-routing`      | OmniRoute's combo engine + အမှတ်ပေးခြင်းဖြင့် အကောင်းဆုံး provider/combo မှတဆင့် အချက်ပြပေးသည်                                                                       | လမ်းကြောင်း၊ ပံ့ပိုးပေးသူများ              | "ဤအချက်ပြမှုကို အကောင်းဆုံးပုံစံဖြင့် လမ်းကြောင်းပေးပါ။" |
| Quota စီမံခန့်ခွဲမှု             | `quota-management`   | ဝန်ဆောင်မှုပေးသူအလိုက် ခွဲတမ်းအခြေအနေ၊ အစီရင်ခံစာများသည် ခေါ်ဆိုသူများအား မည်သည့်အချိန်တွင် throttle/switch ဆုံးဖြတ်ရန် ကူညီပေးသည်။                                  | ခွဲတမ်း၊ ပံ့ပိုးပေးသူများ                  | "မနုဿရောဂါအတွက် ခွဲတမ်းကို စစ်ဆေးပါ"                     |
| ပံ့ပိုးသူရှာဖွေတွေ့ရှိမှု        | `provider-discovery` | စွမ်းရည်များ၊ အခမဲ့အဆင့်အလံများ၊ OAuth အခြေအနေဖြင့် ထည့်သွင်းထားသော ဝန်ဆောင်မှုပေးသူများကို စာရင်းပြုစုပါ။                                                           | ပံ့ပိုးပေးသူများ၊ ရှာဖွေတွေ့ရှိမှု         | "မည်သည့်ဝန်ဆောင်မှုပေးသူများ ရနိုင်သနည်း။"               |
| ကုန်ကျစရိတ်ခွဲခြမ်းစိတ်ဖြာခြင်း။ | `cost-analysis`      | မကြာသေးမီက အသုံးပြုမှု ကက်တလောက် + ကိုပေးသော request/conversation ၏ ခန့်မှန်းကုန်ကျစရိတ်                                                                             | ကုန်ကျစရိတ်၊ အသုံးပြုမှု                   | "ဤစကားဝိုင်းအတွက် ခန့်မှန်းကုန်ကျစရိတ်"                  |
| ကျန်းမာရေးအစီရင်ခံစာ             | `health-report`      | ဝန်ဆောင်မှုပေးသူတိုင်းအတွက် circuit breaker၊ cooldown၊ လော့ခ်ချမှုအခြေအနေတို့ကို စုစည်းထားသည်။                                                                       | ကျန်းမာရေး၊ ကြံ့ခိုင်မှု                   | "ဝန်ဆောင်မှုပေးသူအားလုံး၏ ကျန်းမာရေးအခြေအနေကို ပြပါ"     |
| စွမ်းဆောင်ရည်များစာရင်း          | `list-capabilities`  | ထည့်သွင်းမှု 45 ပါ Agent Skills ကတ်တလောက် (23 API + 21 CLI + 1 config) အပြည့်အစုံကို ဆက်စပ်ထိုးသွင်းမှုအတွက် SKILL.md URLs အကြမ်းပါသော အမှတ်အသားဇယားအဖြစ် ပြန်ပေးသည် | ကတ်တလောက်၊ ရှာဖွေတွေ့ရှိမှု၊ ကျွမ်းကျင်မှု | " OmniRoute စွမ်းရည်အားလုံးကို စာရင်းပြုစုပါ"            |

> အေးဂျင့်ကတ်ကို တိုက်ရိုက် 377-ပံ့ပိုးပေးသူကတ်တလောက်နှင့် ချိန်ညှိထားသင့်သည်။ ဝန်ဆောင်မှုပေးသူ အရေအတွက်နှင့် free/no-auth မက်တာဒေတာများကို runtime registry မှ ရင်းမြစ်ဖြစ်သည်။

### `list-capabilities` ကျွမ်းကျင်မှုအသေးစိတ်

`list-capabilities` ကျွမ်းကျင်မှုသည် API ခေါ်ဆိုမှုများကို မပို့မီ OmniRoute ဖော်ထုတ်နေသည်ကို ရှာဖွေတွေ့ရှိရန် လိုအပ်သော ပြင်ပအေးဂျင့်များအတွက် အထူးအသုံးဝင်သည်။ ၎င်းသည် ဖွဲ့စည်းတည်ဆောက်ထားသော အမှတ်အသားပြုဇယားကို ပြန်ပေးသည်-

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

အတန်းတစ်ခုစီတွင် `rawUrl` ကော်လံပါဝင်သဖြင့် အေးဂျင့်များသည် SKILL.md အပြည့်အစုံကို ချက်ချင်းရယူနိုင်သည်။ `metadata.totalSkills` အကွက်သည် ကက်တလောက်အရွယ်အစား (ယနေ့ 45) ကို ထင်ဟပ်စေသည်။ အကောင်အထည်ဖော်ခြင်း- `src/lib/a2a/skills/listCapabilities.ts`[AGENT-SKILLS.md](./AGENT-SKILLS.md) ကိုလည်းကြည့်ပါ။

---

## REST API (အရန်)

JSON-RPC endpoint `/a2a` သည် ပင်မ A2A ဝင်ပေါက်ဖြစ်သည်။ အောက်ပါ REST endpoint များသည် dashboard များနှင့် ပြင်ပကိရိယာများအတွက် အရန်အသုံးပြုခွင့်ကို ပေးသည်-

| Endpoint                     | Method | ဖော်ပြချက်                                                   | အထောက်အထားစိစစ်မှု                              |
| :--------------------------- | :----- | :----------------------------------------------------------- | :---------------------------------------------- |
| `/api/a2a/status`            | GET    | ဆာဗာအခြေအနေနှင့် မှတ်ပုံတင်ထားသော skill များ                 | (အများသုံး)                                     |
| `/api/a2a/tasks`             | GET    | စစ်ထုတ်မှုများဖြင့် task များကို စာရင်းပြုစုရန်              | စီမံခန့်ခွဲမှု                                  |
| `/api/a2a/tasks/[id]`        | GET    | ID ဖြင့် task ကို ရယူရန်                                     | စီမံခန့်ခွဲမှု                                  |
| `/api/a2a/tasks/[id]/cancel` | POST   | လုပ်ဆောင်နေသော task ကို ပယ်ဖျက်ရန်                           | စီမံခန့်ခွဲမှု                                  |
| `/.well-known/agent.json`    | GET    | Agent Card (A2A ရှာဖွေဖော်ထုတ်မှု)                           | (အများသုံး၊ 3600s ကြာ cache လုပ်ထားသည်)         |
| `/api/a2a/tasks`             | POST   | OmniConductor fleet သို့ အဝင် delegation (Conductor PRD RF5) | Bearer နှင့် `OMNIROUTE_API_KEY` + `a2aEnabled` |

**အဝင် Conductor delegation (`POST /api/a2a/tasks`):** ပြင်ပ A2A agent များသည် OmniRoute မှတစ်ဆင့် coding အလုပ်များကို OmniConductor fleet သို့ လွှဲအပ်သည်။ Body: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — Conductor fleet skill များ (Agent Card တွင် ကြေညာထားသည့် skill များ) ကိုသာ လွှဲအပ်နိုင်သည်။ `metadata.conductor.repo.url` ကို မဖြစ်မနေ ထည့်သွင်းရမည် (fleet သည် git repo များပေါ်တွင် အလုပ်လုပ်သည်)။ Route သည် ဆာဗာဘက်ရှိ `CONDUCTOR_ORCHESTRATOR_TOKEN` (`CONDUCTOR_HUB_TOKEN` ကို အရန်အဖြစ် အသုံးပြုသည်) ကို အသုံးပြု၍ hub ၏ `POST /v1/tasks` သို့ ပြောင်းလဲပေးပြီး `201 { conductor_task_id, state: "submitted" }` ကို ပြန်ပေးသည်။ task အခြေအနေများသည် SSE→A2A mirror (RF1) မှတစ်ဆင့် ပြန်လည်စီးဆင်းလာပြီး `GET /api/a2a/tasks?skill=conductor` မှတစ်ဆင့် ကြည့်ရှုနိုင်သည်။

---

## Skill အသစ်တစ်ခု ထည့်သွင်းခြင်း

1. **Skill ဖိုင်ကို ဖန်တီးပါ:** `src/lib/a2a/skills/<your-skill>.ts`

   Async function `(task: A2ATask) => Promise<{ artifacts, metadata }>` ကို export လုပ်ပါ။ `smartRouting.ts` ကဲ့သို့ လက်ရှိ skill များ၏ ပုံစံကို လိုက်နာပါ။

2. **Handler ကို မှတ်ပုံတင်ပါ:** `src/lib/a2a/taskExecution.ts` ရှိ `A2A_SKILL_HANDLERS` တွင် entry တစ်ခု ထည့်ပါ-

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...လက်ရှိ skill များ
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Agent Card တွင် ဖော်ပြပါ:** `src/app/.well-known/agent.json/route.ts` ရှိ `skills` array တွင် ထပ်ဖြည့်ပါ-

   ```json
   {
     "id": "your-skill",
     "name": "သင့် Skill",
     "description": "ရည်ရွယ်ချက်ကို အဓိကထားသော အကျဉ်းချုပ်ဖော်ပြချက်",
     "tags": ["routing", "quota"],
     "examples": ["သဘာဝဘာသာစကားဖြင့် ခေါ်ယူအသုံးပြုသည့် နမူနာ"]
   }
   ```

4. **Test များ ရေးသားပါ:** `tests/unit/a2a-<your-skill>.test.ts`။ အောင်မြင်သည့်လမ်းကြောင်း + အမှားလမ်းကြောင်း နှစ်ခုစလုံးကို လွှမ်းခြုံပါ။

5. **ဤဖိုင်၏ `Available Skills` ဇယားတွင် skill အသစ်ကို မှတ်တမ်းတင်ပါ**။

---

## လုပ်ဆောင်ချက် TTL

လုပ်ဆောင်ချက်များသည် `ttlMinutes` (ပုံသေ 5 မိနစ်) ပြည့်ပြီးနောက် သက်တမ်းကုန်ဆုံးသည် — `src/lib/a2a/taskManager.ts:82` ရှိ `A2ATaskManager` constructor တွင် သတ်မှတ်ထားသည်။ စိတ်ကြိုက်ပြင်ဆင်ရန် `A2ATaskManager` instantiation ကို fork လုပ်ပြီး မတူညီသောတန်ဖိုးတစ်ခု ထည့်ပေးပါ (ဥပမာ၊ 15 မိနစ် TTL အတွက် `new A2ATaskManager(15)`)။ နောက်ခံ interval တစ်ခုသည် သက်တမ်းကုန်ဆုံးသွားသော လုပ်ဆောင်ချက်များကို စက္ကန့် 60 တိုင်း ရှင်းလင်းသည်။

---

## လုပ်ဆောင်ချက် အသက်တာစက်ဝန်း

```
တင်သွင်းပြီး → လုပ်ဆောင်နေသည် → ပြီးစီးသည်
                            → မအောင်မြင်ပါ
                            → ပယ်ဖျက်သည်
```

- လုပ်ဆောင်ချက်များသည် ပုံသေအားဖြင့် 5 မိနစ်အကြာတွင် သက်တမ်းကုန်ဆုံးသည် ([လုပ်ဆောင်ချက် TTL](#task-ttl) ကို ကြည့်ပါ)
- အဆုံးသတ်အခြေအနေများ- `completed`, `failed`, `cancelled`
- ဖြစ်ရပ်မှတ်တမ်းသည် အခြေအနေကူးပြောင်းမှုတိုင်းကို မှတ်တမ်းတင်ထားသည်

---

## အမှားကုဒ်များ

| ကုဒ်   | အဓိပ္ပာယ်                                      |
| :----- | :--------------------------------------------- |
| -32700 | ခွဲခြမ်းစိတ်ဖြာမှုအမှား (မမှန်ကန်သော JSON)     |
| -32600 | မမှန်ကန်သော တောင်းဆိုမှု / ခွင့်ပြုချက်မရှိ    |
| -32601 | နည်းလမ်း သို့မဟုတ် ကျွမ်းကျင်မှုကို ရှာမတွေ့ပါ |
| -32602 | မမှန်ကန်သော parameter များ                     |
| -32603 | အတွင်းပိုင်းအမှား                              |
| -32000 | A2A endpoint ကို ပိတ်ထားသည်                    |

---

## ပေါင်းစည်းခြင်း ဥပမာများ

### Python (တောင်းဆိုမှုများ)

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

### TypeScript (ဆွဲယူ)

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
