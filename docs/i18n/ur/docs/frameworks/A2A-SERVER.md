# OmniRoute A2A Server Documentation (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute بطور ایک ذہین روٹنگ ایجنٹ

A2A سطح کے دو رُخ ہیں:

- **JSON-RPC 2.0**، `POST /a2a` پر (بنیادی داخلہ نقطہ، جس کی تعریف `src/app/a2a/route.ts` میں ہے)۔
- **REST**، ڈیش بورڈز اور ٹولنگ کے لیے `/api/a2a/*` کے تحت (اسٹیٹس، ٹاسک کی فہرست، منسوخی)۔

ٹاسکس کو `A2ATaskManager` (`src/lib/a2a/taskManager.ts`، ڈیفالٹ 5 منٹ کا TTL) کے ذریعے ٹریک کیا جاتا ہے۔ اسکلز کو `src/lib/a2a/taskExecution.ts` میں موجود `A2A_SKILL_HANDLERS` کے ذریعے ڈسپیچ کیا جاتا ہے۔

## ایجنٹ کی دریافت

```bash
curl http://localhost:20128/.well-known/agent.json
```

یہ Agent Card واپس کرتا ہے، جو OmniRoute کی صلاحیتوں، اسکلز، اور تصدیقی تقاضوں کی وضاحت کرتا ہے۔

Agent Card کی `version` فیلڈ `process.env.npm_package_version` سے حاصل کی جاتی ہے (`src/app/.well-known/agent.json/route.ts:13` دیکھیں)، اس لیے یہ ہر ریلیز پر `package.json` کے ساتھ خودکار طور پر ہم وقت رہتی ہے۔

---

## تصدیق

تمام `/a2a` درخواستوں کے لیے `Authorization` ہیڈر کے ذریعے API کلید درکار ہے:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

اگر سرور پر کوئی API کلید کنفیگر نہ کی گئی ہو تو تصدیق کو نظر انداز کر دیا جاتا ہے۔

## فعال کرنا

A2A کو **Endpoints → A2A** ٹوگل کے ذریعے کنٹرول کیا جاتا ہے اور یہ ڈیفالٹ طور پر غیر فعال ہوتا ہے۔ غیر فعال ہونے پر،
`GET /api/a2a/status`، `status: "disabled"` اور `online: false` رپورٹ کرتا ہے؛
`POST /a2a` کے لیے JSON-RPC کالز، JSON-RPC ایرر کوڈ `-32000` کے ساتھ HTTP 503 واپس کرتی ہیں۔

---

## JSON-RPC 2.0 طریقے

### `message/send` — ہم وقت اجرا

کسی اسکل کو پیغام بھیجتا ہے اور مکمل جواب کا انتظار کرتا ہے۔

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

`smart-routing` کے لیے، `metadata.combo` گیٹ وے کی درخواست میں
`metadata.model` کو واضح طور پر اوور رائیڈ کرتا ہے؛ اسے نظر انداز کردہ `x-combo`
JSON فیلڈ کے بجائے حقیقی `model` کے طور پر بھیجا جاتا ہے۔ گیٹ وے کی معمول کی API کلید اور
فی ہدف اجازت بدستور لاگو ہوتی ہے۔ نامعتبر یا خالی combo مسترد کر دیا جاتا ہے۔

نتیجہ `requested_combo` (کالر کا ارادہ)، `dispatched_model`
(گیٹ وے کی اصل درخواست)، `response_model` (گیٹ وے کا جواب) اور
`confirmed_combo` ظاہر کرتا ہے۔ آخری فیلڈ اس وقت تک `null` رہتی ہے جب تک گیٹ وے واضح طور پر
کسی combo کی شناخت نہ کرے۔ A2A فیصلے کے لاگز اجرا کو صرف تصدیق شدہ
combo سے منسوب کرتے ہیں، جبکہ غیر تصدیق شدہ درخواست کو `requestedCombo` کے طور پر برقرار رکھتے ہیں۔

**جواب:**

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

### `message/stream` — SSE اسٹریمنگ

`message/send` جیسا ہی ہے، لیکن حقیقی وقت کی اسٹریمنگ کے لیے Server-Sent Events واپس کرتا ہے۔

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

**SSE ایونٹس:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — ٹاسک کی حیثیت دریافت کریں

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ٹاسک منسوخ کریں

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## دستیاب ہنر

OmniRoute نے `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` میں وائرڈ 6 A2A مہارتوں کو اجاگر کیا۔ ہر مہارت کا ماڈیول `src/lib/a2a/skills/` میں رہتا ہے۔

| ہنر                   | ID                   | تفصیل                                                                                                                                                  | ٹیگز                    | مثالیں                                       |
| :-------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------- | :------------------------------------------- |
| اسمارٹ روٹنگ          | `smart-routing`      | OmniRoute کے کومبو انجن + اسکورنگ کا استعمال کرتے ہوئے بہترین provider/combo کے ذریعے پرامپٹ کو روٹ کرتا ہے                                            | روٹنگ، فراہم کرنے والے  | "اس پرامپٹ کو بہترین ماڈل کے ذریعے روٹ کریں" |
| کوٹہ مینجمنٹ          | `quota-management`   | رپورٹ فی فراہم کنندہ کوٹہ ریاست، کال کرنے والوں کو یہ فیصلہ کرنے میں مدد کرتا ہے کہ throttle/switch کب کرنا ہے۔                                        | کوٹہ، فراہم کنندگان     | "انسانیت کے لیے کوٹہ چیک کریں"               |
| فراہم کنندہ کی دریافت | `provider-discovery` | انسٹال کردہ فراہم کنندگان کی فہرست بنائیں جن میں صلاحیتیں ہیں، آزاد درجے کے جھنڈے، OAuth سٹیٹس                                                         | فراہم کرنے والے، دریافت | "کون سے فراہم کنندگان دستیاب ہیں؟"           |
| لاگت کا تجزیہ         | `cost-analysis`      | کیٹلاگ + کے حالیہ استعمال کے پیش نظر request/conversation کی لاگت کا تخمینہ لگاتا ہے۔                                                                  | لاگت، استعمال           | "اس گفتگو کے لیے تخمینہ لاگت"                |
| صحت کی رپورٹ          | `health-report`      | مجموعی طور پر سرکٹ بریکر، کولڈاؤن، لاک آؤٹ اسٹیٹ فی فراہم کنندہ                                                                                        | صحت، لچک                | "تمام فراہم کنندگان کی صحت کی حیثیت دکھائیں" |
| فہرست کی صلاحیتیں     | `list-capabilities`  | سیاق و سباق کے انجیکشن کے لیے خام SKILL.md URLs کے ساتھ مارک ڈاؤن ٹیبل کے بطور مکمل 45-انٹری ایجنٹ سکلز کیٹلاگ (23 API + 21 CLI + 1 config) لوٹاتا ہے۔ | کیٹلاگ، دریافت، مہارت   | "تمام OmniRoute صلاحیتوں کی فہرست بنائیں"    |

> ایجنٹ کارڈ کو لائیو 377 فراہم کرنے والے کیٹلاگ کے ساتھ منسلک رکھا جانا چاہیے۔ فراہم کنندہ شمار اور free/no-auth میٹا ڈیٹا رن ٹائم رجسٹری سے حاصل کیا جاتا ہے۔

### `list-capabilities` مہارت کی تفصیل

`list-capabilities` مہارت خاص طور پر بیرونی ایجنٹوں کے لیے مفید ہے جنہیں یہ دریافت کرنے کی ضرورت ہے کہ API کالز بھیجنے سے پہلے OmniRoute کیا ظاہر کرتا ہے۔ یہ ایک منظم مارک ڈاون ٹیبل آرٹفیکٹ واپس کرتا ہے:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

ہر قطار میں `rawUrl` کالم شامل ہوتا ہے تاکہ ایجنٹ فوری طور پر مکمل SKILL.md حاصل کر سکیں۔ `metadata.totalSkills` فیلڈ کیٹلاگ کے سائز (45 آج) کا آئینہ دار ہے۔ نفاذ: `src/lib/a2a/skills/listCapabilities.ts`۔ [AGENT-SKILLS.md](./AGENT-SKILLS.md) بھی دیکھیں۔

---

## REST API (معاون)

JSON-RPC اینڈ پوائنٹ `/a2a` مستند A2A نقطۂ داخلہ ہے۔ ذیل کے REST اینڈ پوائنٹس ڈیش بورڈز اور بیرونی ٹولنگ کے لیے معاون رسائی فراہم کرتے ہیں:

| اینڈ پوائنٹ                  | طریقہ | تفصیل                                                    | توثیق                                             |
| :--------------------------- | :---- | :------------------------------------------------------- | :------------------------------------------------ |
| `/api/a2a/status`            | GET   | سرور کی حالت، رجسٹر شدہ مہارتیں                          | (عوامی)                                           |
| `/api/a2a/tasks`             | GET   | فلٹرز کے ساتھ ٹاسکس کی فہرست                             | انتظامی                                           |
| `/api/a2a/tasks/[id]`        | GET   | ID کے ذریعے ٹاسک حاصل کریں                               | انتظامی                                           |
| `/api/a2a/tasks/[id]/cancel` | POST  | زیرِ عمل ٹاسک منسوخ کریں                                 | انتظامی                                           |
| `/.well-known/agent.json`    | GET   | ایجنٹ کارڈ (A2A دریافت)                                  | (عوامی، 3600s تک کیش شدہ)                         |
| `/api/a2a/tasks`             | POST  | OmniConductor فلیٹ کو آنے والی تفویض (Conductor PRD RF5) | Bearer بمقابلہ `OMNIROUTE_API_KEY` + `a2aEnabled` |

**آنے والی Conductor تفویض (`POST /api/a2a/tasks`):** بیرونی A2A ایجنٹس OmniRoute کے ذریعے کوڈنگ کا کام OmniConductor فلیٹ کو تفویض کرتے ہیں۔ باڈی: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — صرف Conductor فلیٹ کی مہارتیں (جو ایجنٹ کارڈ پر مشتہر کی گئی ہیں) تفویض کی جا سکتی ہیں؛ `metadata.conductor.repo.url` درکار ہے (فلیٹ git ریپوز پر کام کرتا ہے)۔ روٹ، سرور سائیڈ `CONDUCTOR_ORCHESTRATOR_TOKEN` (متبادل `CONDUCTOR_HUB_TOKEN`) استعمال کرتے ہوئے، اسے ہب کے `POST /v1/tasks` میں تبدیل کرتا ہے اور `201 { conductor_task_id, state: "submitted" }` واپس کرتا ہے؛ ٹاسک کی حالتیں SSE→A2A مرر (RF1) کے ذریعے واپس منتقل ہوتی ہیں اور `GET /api/a2a/tasks?skill=conductor` کے ذریعے دیکھی جا سکتی ہیں۔

---

## نئی مہارت شامل کرنا

1. **مہارت کی فائل بنائیں:** `src/lib/a2a/skills/<your-skill>.ts`

   ایک async فنکشن `(task: A2ATask) => Promise<{ artifacts, metadata }>` ایکسپورٹ کریں۔ `smartRouting.ts` جیسی موجودہ مہارتوں کی ساخت پر عمل کریں۔

2. **ہینڈلر رجسٹر کریں:** `src/lib/a2a/taskExecution.ts` میں، `A2A_SKILL_HANDLERS` میں ایک اندراج شامل کریں:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...موجودہ مہارتیں
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **ایجنٹ کارڈ میں ظاہر کریں:** `src/app/.well-known/agent.json/route.ts` میں، `skills` ارے میں شامل کریں:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **ٹیسٹس لکھیں:** `tests/unit/a2a-<your-skill>.test.ts`۔ کامیاب راستے + خرابی کے راستے کا احاطہ کریں۔

5. اس فائل کے `Available Skills` ٹیبل میں نئی مہارت کو **دستاویزی شکل دیں**۔

---

## ٹاسک TTL

ٹاسکس `ttlMinutes` (ڈیفالٹ 5 منٹ) کے بعد ختم ہو جاتے ہیں — اسے `src/lib/a2a/taskManager.ts:82` پر موجود `A2ATaskManager` کنسٹرکٹر میں کنفیگر کیا گیا ہے۔ حسبِ ضرورت تبدیل کرنے کے لیے، `A2ATaskManager` کی انسٹینشی ایشن کو فورک کریں اور ایک مختلف ویلیو پاس کریں (مثلاً، 15 منٹ کے TTL کے لیے `new A2ATaskManager(15)`)۔ ایک بیک گراؤنڈ انٹرول ہر 60 سیکنڈ بعد ختم شدہ ٹاسکس کو صاف کرتا ہے۔

---

## ٹاسک لائف سائیکل

```
جمع شدہ → زیرِ عمل → مکمل
                    → ناکام
                    → منسوخ
```

- ٹاسکس ڈیفالٹ طور پر 5 منٹ بعد ختم ہو جاتے ہیں ([ٹاسک TTL](#task-ttl) دیکھیں)
- حتمی حالتیں: `completed`، `failed`، `cancelled`
- ایونٹ لاگ ہر حالت کی تبدیلی کو ٹریک کرتا ہے

---

## ایرر کوڈز

| کوڈ    | مطلب                        |
| :----- | :-------------------------- |
| -32700 | پارس ایرر (غلط JSON)        |
| -32600 | غلط ریکویسٹ / غیر مجاز      |
| -32601 | میتھڈ یا اسکل نہیں ملی      |
| -32602 | غلط پیرامیٹرز               |
| -32603 | اندرونی ایرر                |
| -32000 | A2A اینڈ پوائنٹ غیر فعال ہے |

---

## انضمام کی مثالیں۔

### ازگر (درخواستیں)

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

### TypeScript (لانے)

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
