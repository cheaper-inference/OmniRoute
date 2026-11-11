# OmniRoute A2A Server Documentation (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> پروتکل Agent-to-Agent نسخه 0.3 — OmniRoute بهعنوان یک عامل مسیریابی هوشمند

سطح A2A دو رابط دارد:

- **JSON-RPC 2.0** در `POST /a2a` (نقطه ورود استاندارد که در `src/app/a2a/route.ts` تعریف شده است).
- **REST** در مسیر `/api/a2a/*` برای داشبوردها و ابزارها (وضعیت، فهرست وظایف و لغو).

وظایف توسط `A2ATaskManager` مدیریت میشوند (`src/lib/a2a/taskManager.ts`، با TTL پیشفرض ۵ دقیقه). مهارتها از طریق `A2A_SKILL_HANDLERS` در `src/lib/a2a/taskExecution.ts` هدایت میشوند.

## کشف عامل

```bash
curl http://localhost:20128/.well-known/agent.json
```

کارت عامل را برمیگرداند که قابلیتها، مهارتها و الزامات احراز هویت OmniRoute را توصیف میکند.

فیلد `version` در کارت عامل از `process.env.npm_package_version` گرفته میشود (نگاه کنید به `src/app/.well-known/agent.json/route.ts:13`)؛ بنابراین در هر انتشار، بهطور خودکار با `package.json` همگام باقی میماند.

---

## احراز هویت

تمام درخواستهای `/a2a` به یک کلید API از طریق هدر `Authorization` نیاز دارند:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

اگر هیچ کلید API روی سرور پیکربندی نشده باشد، احراز هویت نادیده گرفته میشود.

## فعالسازی

A2A از طریق کلید **Endpoints → A2A** کنترل میشود و بهطور پیشفرض غیرفعال است. هنگامی که غیرفعال باشد،
`GET /api/a2a/status` مقادیر `status: "disabled"` و `online: false` را گزارش میکند؛ فراخوانیهای JSON-RPC به
`POST /a2a` نیز HTTP 503 را همراه با کد خطای JSON-RPC برابر با `-32000` برمیگردانند.

---

## متدهای JSON-RPC 2.0

### `message/send` — اجرای همگام

پیامی را به یک مهارت ارسال میکند و تا دریافت پاسخ کامل منتظر میماند.

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

برای `smart-routing`، مقدار `metadata.combo` یک بازنویسی صریح برای
`metadata.model` در درخواست درگاه است؛ این مقدار بهعنوان `model` واقعی ارسال میشود،
نه بهعنوان یک فیلد JSON نادیدهگرفتهشدهی `x-combo`. احراز هویت معمول درگاه بر اساس کلید API و
مجوزدهی بهازای هر مقصد همچنان اعمال میشود. یک combo نامعتبر یا خالی رد میشود.

نتیجه شامل `requested_combo` (قصد فراخواننده)، `dispatched_model`
(درخواست واقعی درگاه)، `response_model` (پاسخ درگاه) و
`confirmed_combo` است. فیلد آخر `null` خواهد بود، مگر اینکه درگاه صراحتاً
یک combo را مشخص کند. گزارشهای تصمیمگیری A2A اجرا را فقط به یک
combo تأییدشده نسبت میدهند و درخواست تأییدنشده را بهصورت `requestedCombo` نگه میدارند.

**پاسخ:**

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

### `message/stream` — استریم SSE

مانند `message/send` است، اما برای استریم بلادرنگ، رویدادهای ارسالشده از سرور را برمیگرداند.

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

**رویدادهای SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — استعلام وضعیت وظیفه

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — لغو یک وظیفه

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## مهارت های موجود

OmniRoute 6 مهارت A2A را در `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` به نمایش می گذارد. هر ماژول مهارت در `src/lib/a2a/skills/` زندگی می کند.

| مهارت               | ID                   | توضیحات                                                                                                                                         | برچسب ها                | نمونه ها                                          |
| :------------------ | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------- | :------------------------------------------------ |
| مسیریابی هوشمند     | `smart-routing`      | با استفاده از امتیازدهی + موتور ترکیبی OmniRoute، یک درخواست را از طریق provider/combo بهینه هدایت می کند.                                      | مسیریابی، ارائه دهندگان | "این درخواست را از طریق بهترین مدل مسیریابی کنید" |
| مدیریت سهمیه        | `quota-management`   | وضعیت سهمیه هر ارائه دهنده را گزارش می دهد، به تماس گیرندگان کمک می کند تصمیم بگیرند که چه زمانی throttle/switch را انجام دهند                  | سهمیه، ارائه دهندگان    | "بررسی سهمیه برای انسان"                          |
| کشف ارائه دهنده     | `provider-discovery` | ارائه دهندگان نصب شده با قابلیت ها، پرچم های سطح آزاد، وضعیت OAuth را فهرست می کند                                                              | ارائه دهندگان، کشف      | "چه ارائه دهندگان در دسترس هستند؟"                |
| تجزیه و تحلیل هزینه | `cost-analysis`      | برآورد هزینه یک request/conversation با توجه به کاتالوگ + که اخیراً استفاده شده است                                                             | هزینه، استفاده          | "تخمین هزینه برای این گفتگو"                      |
| گزارش سلامت         | `health-report`      | قطع کننده مدار، خنک کننده، حالت قفل در هر ارائه دهنده                                                                                           | سلامتی، تاب آوری        | "نمایش وضعیت سلامت همه ارائه دهندگان"             |
| لیست قابلیت ها      | `list-capabilities`  | کاتالوگ کامل 45 ورودی Agent Skills (23 API + 21 CLI + 1 config) را به عنوان جدول نشانه گذاری با SKILL.md URLs خام برای تزریق زمینه برمی گرداند. | کاتالوگ، کشف، مهارت     | "لیست تمام قابلیت های OmniRoute "                 |

> کارت نماینده باید با کاتالوگ 388 ارائهدهنده زنده همسو باشد. تعداد ارائه دهندگان و ابرداده free/no-auth از رجیستری زمان اجرا منبع می شوند.

### جزئیات مهارت `list-capabilities`

مهارت `list-capabilities` مخصوصاً برای عوامل خارجی مفید است که باید قبل از ارسال تماسهای API کشف کنند که OmniRoute چه چیزی را آشکار میکند. یک آرتیفکت جدول نشانه گذاری ساختاریافته را برمی گرداند:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

هر سطر شامل ستون `rawUrl` است تا عوامل بتوانند فورا SKILL.md کامل را واکشی کنند. میدان `metadata.totalSkills` منعکس کننده اندازه کاتالوگ است (امروزه 45). پیاده سازی: `src/lib/a2a/skills/listCapabilities.ts`. به [AGENT-SKILLS.md](./AGENT-SKILLS.md) نیز مراجعه کنید.

---

## REST API (کمکی)

نقطه پایانی JSON-RPC `/a2a` نقطه ورود متعارف A2A است. نقاط انتهایی REST زیر دسترسی کمکی را برای داشبوردها و ابزارهای خارجی فراهم میکنند:

| نقطه پایانی                  | روش  | توضیحات                                            | احراز هویت                                                                                                  |
| :--------------------------- | :--- | :------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET  | وضعیت سرور، مهارت های ثبت شده                      | (عمومی)                                                                                                     |
| `/api/a2a/tasks`             | GET  | لیست وظایف با فیلتر                                | مدیریت یا کلید API (به زیر مراجعه کنید)                                                                     |
| `/api/a2a/tasks/[id]`        | GET  | دریافت وظیفه توسط ID                               | مدیریت یا کلید API (به زیر مراجعه کنید)                                                                     |
| `/api/a2a/tasks/[id]/cancel` | POST | لغو کار در حال اجرا                                | مدیریت یا کلید API (به زیر مراجعه کنید)                                                                     |
| `/.well-known/agent.json`    | GET  | کارت مامور (کشف A2A )                              | (عمومی، حافظه پنهان 3600s)                                                                                  |
| `/api/a2a/tasks`             | POST | هیئت ورودی به ناوگان OmniConductor (رهبری PRD RF5) | همان `GET`، به علاوه `OMNIROUTE_API_KEY` اگر تنظیم شود در حالی که `REQUIRE_API_KEY` خاموش است. `a2aEnabled` |

اینکه چه کسی به مسیرهای `/api/a2a/tasks*` میرود به تنظیمات لاگین و کلید API بستگی دارد:

- `requireLogin=true` (پیشفرض): میانافزار فقط اعتبار مدیریت (جلسه داشبورد، کلید `manage` -scope API ، رمز دسترسی `oma_` ) و `OMNIROUTE_API_KEY` را میپذیرد. یک کلید استنتاج ساده `403` دریافت می کند. در هدر `Authorization` میان افزار فقط `OMNIROUTE_API_KEY` به عنوان `Bearer <key>` می گیرد. یک کلید خالی یا یک برگه بعد از `Bearer` `401` را دریافت می کند.
- `requireLogin=false` یا پنجره حلقه بک قبل از ورود: با `REQUIRE_API_KEY=true` هر کلید OmniRoute API معتبر یا اعتبار مدیریتی پذیرفته می شود و تماس گیرندگان ناشناس `401` دریافت می کنند. با `REQUIRE_API_KEY` خارج مسیرها باز است.
- زمانی که آن متغیر تنظیم شده و `REQUIRE_API_KEY` خاموش است،`POST /api/a2a/tasks` علاوه بر این، `OMNIROUTE_API_KEY` در هدر `Authorization` نیاز دارد. سرصفحه های دیگر، مانند `x-api-key`، در آنجا به حساب نمی آیند. با ورود به سیستم خاموش یا قبل از ورود، کلید با یا بدون پیشوند `Bearer` عبور می کند. با ورود به سیستم، فقط `Bearer <key>` از میان افزار عبور می کند.

در مواردی که اعتبار مورد نیاز است، یک توکن `read` -scope `oma_` فقط برای `GET` کار می کند.

**هیئت هادی ورودی (`POST /api/a2a/tasks`):** عوامل خارجی A2A کار کدگذاری را از طریق OmniRoute به ناوگان OmniConductor واگذار می کنند. Body: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — only مهارت های ناوگان هادی (آنهایی که در کارت نماینده اعلام شده است) قابل واگذاری هستند. `metadata.conductor.repo.url` مورد نیاز است (ناوگان روی مخازن git کار می کند). این مسیر با استفاده از `CONDUCTOR_ORCHESTRATOR_TOKEN` سمت سرور (fallback `CONDUCTOR_HUB_TOKEN`) به `POST /v1/tasks` هاب ترجمه میشود و `201 { conductor_task_id, state: "submitted" }` را برمیگرداند. حالات وظیفه از طریق آینه SSE→A2A (RF1) برگشت میکنند و از طریق `GET /api/a2a/tasks?skill=conductor` قابل مشاهده هستند.

---

## افزودن یک مهارت جدید

1. **ایجاد فایل مهارت:** `src/lib/a2a/skills/<your-skill>.ts`

   یک تابع async `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>` را صادر کنید. شکل مهارت های موجود مانند `smartRouting.ts` را دنبال کنید. اگر مهارت از طریق OmniRoute HTTP، سرصفحهها را با `buildSelfLoopHeaders(caller)` از `src/lib/a2a/selfLoopAuth.ts` بسازید تا تماس با کلید تماسگیرنده A2A اجرا شود، نه `OMNIROUTE_API_KEY`، و `redirect: "error"` را به `fetch` ارسال کنید تا تغییر مسیر هرگز کلید را دریافت نکند. کمک کننده فقط هدرها را می سازد. هر مهارت خود خط مشی تغییر مسیر را تعیین می کند. هنگامی که URL پایه حلوفصل شده http در خارج از شبکه خصوصی است (Loopback، نام کانتینر یا سرویس و آدرسهای خصوصی خوب هستند) یا دارای اعتبار هستند، بهجای اتصال کلید، `UnsafeSelfLoopTargetError` پرتاب میکند، بنابراین مهارتی که تماسهای رد شده را میبلعد، باید آن خطا را بازگرداند.

2. **کنترل کننده ثبت نام:** در `src/lib/a2a/taskExecution.ts`، یک ورودی به `A2A_SKILL_HANDLERS` اضافه کنید:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **نمایش در کارت نماینده:** در `src/lib/a2a/agentCardMetadata.ts` (به اشتراک گذاشته شده توسط `/.well-known/agent.json` و `/.well-known/agent-card.json`)، به آرایه `skills` اضافه کنید:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **تست ها را بنویسید:** `tests/unit/a2a-<your-skill>.test.ts`. مسیر خطای + را پوشش دهید.

5. **سند** مهارت جدید در جدول `Available Skills` این فایل.

---

## TTL وظیفه

وظایف پس از `ttlMinutes` (بهطور پیشفرض ۵ دقیقه) منقضی میشوند — این مقدار در سازندهٔ `A2ATaskManager` در `src/lib/a2a/taskManager.ts:82` پیکربندی شده است. برای سفارشیسازی، نمونهسازی `A2ATaskManager` را فورک کنید و مقدار متفاوتی به آن بدهید (برای مثال، `new A2ATaskManager(15)` برای TTL پانزدهدقیقهای). یک بازهٔ زمانی پسزمینه هر ۶۰ ثانیه وظایف منقضیشده را پاکسازی میکند.

---

## چرخهٔ حیات وظیفه

```
ارسالشده → در حال انجام → تکمیلشده
                         → ناموفق
                         → لغوشده
```

- وظایف بهطور پیشفرض پس از ۵ دقیقه منقضی میشوند (به [TTL وظیفه](#task-ttl) مراجعه کنید)
- وضعیتهای پایانی: `completed`، `failed`، `cancelled`
- گزارش رویدادها همهٔ انتقالهای وضعیت را ثبت میکند

---

## کدهای خطا

| کد     | معنی                              |
| :----- | :-------------------------------- |
| -32700 | خطای تجزیه (JSON نامعتبر)         |
| -32600 | درخواست نامعتبر / احراز هویت نشده |
| -32601 | متد یا مهارت یافت نشد             |
| -32602 | پارامترهای نامعتبر                |
| -32603 | خطای داخلی                        |
| -32000 | نقطهٔ پایانی A2A غیرفعال است      |

---

## نمونههای یکپارچهسازی

### پایتون (requests)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "سلام"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### تایپاسکریپت (fetch)

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
      messages: [{ role: "user", content: "سلام" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
