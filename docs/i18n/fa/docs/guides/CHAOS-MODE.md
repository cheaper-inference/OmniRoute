# Chaos Mode (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **داشبورد:** **حالت Chaos** (نوار کناری) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (نشست داشبورد) · `POST /api/skills/collect/chaos` (کلید API)  
> **منبع:** `src/lib/chaos/chaosExecutor.ts`، `src/lib/chaos/chaosConfig.ts`

حالت Chaos **یک وظیفه را بهطور همزمان برای چندین ارائهدهنده ارسال میکند** — هر ارائهدهندهٔ مشارکتکننده
یک نمونهٔ مدل ارائه میدهد و شما همهٔ پاسخها را در کنار یکدیگر (یا بهصورت زنجیرهای) دریافت میکنید. این یک
سطح اجرای چندمدلی است، نه یک راهبرد مسیریابی: ترافیک عادی `/v1/chat/completions`
شما هرگز تحت تأثیر آن قرار نمیگیرد.

**رفع ابهام — سه قابلیت متفاوت با نام «chaos» عرضه میشوند:**

| مورد                  | چیستی آن                                                                                                                                                                          | محل مستندات                                  |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **حالت Chaos**        | صفحهٔ داشبورد + API شرحدادهشده در اینجا: ارسال گستردهٔ یک وظیفه به چندین ارائهدهنده (بهصورت موازی یا مشارکتی).                                                                    | این راهنما                                   |
| `auto/chaos`          | شناسهٔ مدل Auto-Combo: ارسال گستردهٔ موازی، یک مدل بهازای هر ارائهدهنده و یک فراخوانی بالادستی برای هرکدام. تزریق خطا نیست ([جزئیات](#autochaos-parallel-fan-out)).               | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| پیکربندی ترکیبی Chaos | یک ترکیب ذخیرهشده با `config.chaos.enabled` به همان شیوه ارسال گسترده انجام میدهد (فقط از طریق API)؛ `judgeModel` فقط پاسخ نهایی را انتخاب میکند و فراخوانی ترکیبسازی وجود ندارد. | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: ارسال گستردهٔ موازی

`auto/chaos` یک گزینه برای تزریق خطا یا آزمون تابآوری **نیست**. درخواست
`model: "auto/chaos"` در `/v1/chat/completions`:

1. پنلی متشکل از **یک مدل بهازای هر ارائهدهنده** میسازد: نخستین گزینهٔ هر
   ارائهدهندهٔ متصل، بهترتیب مخزن گزینهها، تا سقف 5 عضو
   (`OMNIROUTE_CHAOS_MAX_PANEL`، با حداکثر مقدار 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). بستهٔ وزن `chaos-mode`
   فقط `weight` هر عضو را تنظیم میکند؛ ارسال گسترده آن را نمیخواند.
2. درخواست یکسان را **بهصورت موازی** برای همهٔ اعضای پنل ارسال میکند؛ بنابراین هر درخواست
   بهازای هر عضو پنل، هزینهٔ یک فراخوانی بالادستی را دارد
   (`open-sse/services/autoCombo/chaosEngine.ts`، ارسالشده از
   `open-sse/services/combo.ts`).
3. با دریافت نتیجهٔ هر عضو پنل، یک خط وضعیت برای آن استریم میکند: بهطور پیشفرض یک توضیح SSE
   (`: chaos <index> ok|fail <model>`)، بهعلاوهٔ یک رویداد `omni-chaos-part`
   (`model`، `index`، `ok`، `error`) هنگامی که درخواست
   `stream_options.include_chaos_parts: true` را تنظیم کرده باشد. این موارد هیچ متن پاسخی در بر ندارند.
4. **یک** پاسخ پنل را بهعنوان قطعهٔ نهایی به سبک OpenAI ارسال میکند: پاسخ نخستین
   عضو پنل (`auto/chaos` آن را بهعنوان `judgeModel` تنظیم میکند)، در صورت موفقیت؛ وگرنه
   پاسخ آخرین عضو موفق. سایر پاسخهای پنل بازگردانده نمیشوند؛ بنابراین
   هزینهٔ N فراخوانی را میپردازید و یک تکمیل دریافت میکنید.

## راه اندازی

1. باز کنید** حالت آشوب داشبورد →** (`/dashboard/chaos`).
2. آن را بچرخانید** در** کشتی های حالت آشوب —** به طور پیش فرض غیرفعال است** (`enabled: false` در `src/lib/chaos/chaosConfig.ts`). در حالی که غیرفعال است، `POST /api/chaos/run` `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` پاسخ می دهد.
3. شرکتکنندگان و پیشفرضها را انتخاب کنید (برای نمونه از طریق فروشگاه تنظیمات ادامه مییابد):

   | میدان               | معنی                                                               | پیش فرض / محدودیت ها                        |
   | ------------------- | ------------------------------------------------------------------ | ------------------------------------------- |
   | `enabled`           | سوئیچ اصلی                                                         | `false`                                     |
   | `defaultMode`       | `parallel` یا `collaborative` (به زیر مراجعه کنید)                 | `parallel`                                  |
   | `providerOverrides` | مشارکت هر ارائه دهنده (`providerId`، `modelId` اختیاری، `enabled`) | هر ارائه دهنده فعال = خالی کنید، حداکثر 200 |
   | `systemPrompt`      | لغو برای اعلان سیستم Chaos داخلی                                   | اختیاری، حداکثر 10000 کاراکتر               |
   | `timeoutMs`         | حداکثر زمان برای هر تماس مدل                                       | `120000` (5 000–600 000)                    |
   | `maxTokens`         | `max_tokens` در هر تماس مدل                                        | `4096` (256–128 000)                        |

4. به هر ارائهدهنده شرکتکننده یک پاسخ بدهید** مدل** . مدل ارائهدهنده `modelId` لغو فعالشده آن در صفحه Chaos Mode است (برنده میشود)، در غیر این صورت** مدل پیش فرض** از اتصال آن شناسه ارائه دهنده هرگز به عنوان نام مدل استفاده نمی شود. ارائه دهنده ای که هیچ کدام را ندارد** نامیده نمی شود** : در نتایج به صورت `status: "error"` با پیغام _"هیچ مدلی برای این ارائه دهنده تنظیم نشده است. یک مدل برای آن در صفحه Chaos Mode یا یک مدل پیش فرض در اتصال تنظیم کنید."_ و یک `modelId` خالی نشان داده می شود، در حالی که سایر ارائه دهندگان به طور معمول کار می کنند. اگر هیچ ارائهدهنده انتخابی مدلی نداشته باشد، اجرا قبل از هر درخواست بالادستی با _"هیچ ارائهدهنده مدل مجموعهای ندارد. …"_ (HTTP 500 در هر دو نقطه پایانی) با شکست مواجه میشود.
5. اجرا کنید** از خود صفحه تست کنید** — پانل نتایج پاسخ، وضعیت و مدت زمان هر ارائه دهنده را نشان می دهد.

## حالتهای اجرا

- **`parallel`** — همهٔ مدلها یک وظیفهٔ یکسان را بهطور همزمان دریافت میکنند؛ همهٔ پاسخها را
  بهصورت مستقل دریافت میکنید.
- **`collaborative`** — مدلها **بهصورت زنجیرهای** اجرا میشوند: هر مدل خروجی مدل قبلی را میبیند و
  از آن خواسته میشود آن را اصلاح یا تکمیل کند، نقد کند یا جایگزینی ارائه دهد. فیلد `summary` در پاسخ،
  خروجیهای موفق را بهترتیب زنجیره به یکدیگر متصل میکند (اجراهای موازی `summary` ندارند).

## API

### جلسه داشبورد `POST /api/chaos/run` —

احراز هویت کوکی (جلسه مدیریت — به [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) مراجعه کنید). توسط صفحه داشبورد استفاده می شود.

```jsonc
// body
{
  "task": "Compare approaches to X", // required
  "providers": ["glm", "kimi"], // optional filter
  "mode": "parallel", // optional — overrides defaultMode
  "systemPrompt": "…", // optional override
  "maxTokens": 4096, // optional override
}
```

### کلید `POST /api/skills/collect/chaos` — API

نوع حامل توکن برای تماس گیرندگان خارجی. کلید باید حمل کند** مجوز حالت آشوب** (`chaosModeEnabled`) که است** به طور پیش فرض خاموش است** — آن را در هر کلید فعال کنید** داشبورد → API مدیر → ویرایش کلید مجوز → → حالت آشوب** . همان بدنه بالا

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

هر دو نقطه پایانی یک شکل را برمیگردانند:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborative mode only
}
```

## عیب یابی

- **`400 Chaos Mode is not enabled`** — مرحله 2 بالا: کلید جهانی خاموش است.
- **کلید API در `/api/skills/collect/chaos` رد می شود** کلید — فاقد مجوز `chaosModeEnabled` برای هر کلید است (به طور پیشفرض خاموش است؛ این یک تنظیم است، نه یک خطا).
- **یک ارائه دهنده `No model set for this provider` را نشان می دهد** — مدل خود را در صفحه Chaos Mode یا یک مدل پیش فرض در اتصال خود تنظیم می کند (به راه اندازی، مرحله 4 مراجعه کنید).
- **ارائه دهنده ای که انتظار داشتید در نتایج وجود ندارد** — `providerOverrides` در صفحه Chaos Mode بررسی کنید (یک لغو غیرفعال آن را حذف می کند) و اینکه آیا اتصال ارائه دهنده فعال است یا خیر.
