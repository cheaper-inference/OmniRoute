# Custom JSON API provider nodes (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

یک گره JSON API سفارشی یک نقطه پایانی کسب و کار JSON که پروتکل OpenAI یا Anthropic را صحبت نمی کند، متصل می کند. OmniRoute یک الگوی درخواست JSON را پر میکند، آن را به نقطه پایانی کامل URL ارسال میکند، پاسخ را از مسیر پاسخ میخواند و آن را در قالب خود مشتری (تکمیلهای چت، پاسخها، پیامها، ...) به مشتری برمیگرداند.

این یک گره سازگار با OpenAI با `apiType: "custom-json"` است. شناسه آن به شکل `openai-compatible-custom-json-<suffix>` است. فرم داشبورد هنوز در دسترس نیست. این گره ها را از طریق provider-node API زیر ایجاد و ویرایش کنید.

## یک گره ایجاد کنید

`POST /api/provider-nodes` (مدیریت اعتبار):

```json
{
  "type": "openai-compatible",
  "apiType": "custom-json",
  "name": "Business API",
  "prefix": "biz",
  "baseUrl": "https://api.example.com/v1/answer",
  "customHeaders": { "X-Tenant": "demo" },
  "customJson": {
    "method": "POST",
    "authType": "api-key",
    "authHeader": "X-Service-Key",
    "requestTemplate": {
      "project_id": "demo-project",
      "question": "{{prompt}}",
      "history": "{{messages}}"
    },
    "responsePath": "data.answer"
  }
}
```

- `baseUrl` است** کامل** نقطه پایان URL. هیچ چیزی اضافه نشده است (بدون `/chat/completions`، بدون `/models`) و بر خلاف سایر گره های سازگار با OpenAI، URL پیش فرض وجود ندارد. باید `http(s)` باشد، بدون اعتبارنامههای تعبیهشده یا `#fragment`، و از همان گارد URL خروجی مانند هر گره ارائهدهنده عبور میکند، هم وقتی گره ذخیره میشود و هم در هر درخواست.
- گره ای که کلید اتصال را ارسال می کند (`authType` `bearer` یا `api-key`، از جمله پیش فرض) باید `https://` استفاده کند. `http://` ساده فقط برای یک میزبان حلقه بک (`localhost`، `127.0.0.0/8`، `::1`) یا با `authType: "none"`، که هیچ کلیدی ارسال نمیکند، پذیرفته میشود. آدرسهای LAN خصوصی (`10.x`، `172.16-31.x`، `192.168.x`) مستثنی نیستند: هر کسی در آن شبکه میتواند کلید را بخواند. ذخیره چنین گره ای با `400` با شکست مواجه می شود و گره ای که قبلاً ذخیره شده بود در هر درخواست با همان پیام بسته نمی شود، قبل از ارسال هر درخواستی. برای یک نقطه پایانی کلید شده در LAN، آن را پشت TLS قرار دهید (مثلاً یک پراکسی معکوس).
- `customJson` با Zod تأیید می شود. کلیدهای ناشناخته رد می شوند. هر فیلد اختیاری است:

| میدان             | ارزش ها                                      | پیش فرض                                                |
| ----------------- | -------------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                       | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                  | `bearer`                                               |
| `authHeader`      | نام سرصفحه زمانی که `api-key` استفاده می شود | `X-API-Key`                                            |
| `requestTemplate` | JSON (≤ 64 KB، عمق ≤ 32)                     | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | مسیر میدانی یا `$` برای کل بدن               | `choices[0].message.content`                           |

- راز در کلید API اتصال باقی می ماند، هرگز در قالب. `bearer` `Authorization: Bearer <key>` را ارسال می کند. `api-key` می فرستد `<authHeader>: <key>`. سرصفحه auth نمی تواند `Host`، `Content-Type`، `Content-Length`، `Connection`، `Transfer-Encoding`، `Authorization`، `Cookie` یا هدر hop-by-hop باشد. با `none`، اتصالات نیازی به کلید ندارند.
- هدرهای ثابت اضافی از `customHeaders` معمولی گره استفاده می کنند (همان اعتبارسنجی هر گره سازگار دیگر؛ هدرهای تأیید در آنجا مجاز نیستند).

`PUT /api/provider-nodes/<id>` همان `customJson` می پذیرد و `baseUrl` و پیکربندی را روی هر اتصال موجود گره بازنویسی می کند. حذف `customJson` پیکربندی ذخیره شده را حفظ می کند. تغییر `apiType` به `chat` یا `responses` آن را از گره و اتصالات آن حذف می کند.

سپس طبق معمول یک اتصال به گره اضافه کنید (`POST /api/providers` با شناسه گره) و `<prefix>/<model>` را درخواست کنید، برای مثال `biz/assistant-v1`. نقطه پایانی هیچ لیست مدلی را نشان نمی دهد، بنابراین شناسه های مدل را با دست اضافه کنید.

## درخواست قالب

الگوها JSON ساده هستند. یک مقدار رشته ممکن است حاوی نشانگرهای `{{placeholder}}` باشد. هیچ چیز ارزیابی یا اجرا نمی شود و کلیدهای شی هرگز جایگزین نمی شوند.

| جای جای              | ارزش                                                         |
| -------------------- | ------------------------------------------------------------ |
| `{{prompt}}`         | متن آخرین پیام کاربر (قطعات متنی با خطوط جدید پیوست شده است) |
| `{{messages}}`       | گفتگو در قالب چت OpenAI                                      |
| `{{model}}`          | شناسه مدل درخواستی، بدون پیشوند ارائه دهنده                  |
| `{{stream}}`         | همیشه `false` — نقطه پایانی با یک سند JSON پاسخ می دهد       |
| `{{request.<path>}}` | فیلدی از درخواست ترجمه شده (قالب چت OpenAI ).                |

- مقداری که دقیقاً یک مکان نگهدار است نوع JSON خود را حفظ می کند (`"{{messages}}"` به یک آرایه تبدیل می شود). یک مکان نگهدار در یک رشته طولانی تر به عنوان متن درج می شود.
- مکان نگهداری که به هیچوجه پاسخ نمیدهد، بهجای ارسال یک بار ناقص، درخواست را با HTTP 400 رد میکند.
- مسیرها از نشانه گذاری نقطه و شاخص های عددی (`data.items[0].text`) استفاده می کنند. `__proto__`، `prototype` و `constructor` در کلیدها و مسیرها رد می شوند.

## پاسخ ها

مقدار `responsePath` به پاسخ دستیار تبدیل می شود: رشته ها عبور می کنند، سایر مقادیر JSON سریال می شوند. یک فیلد مفقود یا `null` ، یا بدنهای که JSON نیست، HTTP 502 را برمیگرداند. وضعیتهای خطای بالادستی از آن عبور میکنند. برای مشتریان استریم، OmniRoute منتظر کل پاسخ JSON میماند و سپس آن را بهعنوان یک قطعه محتوا به اضافه قسمت پایانی منتشر میکند. این جریان رمزی نیست. تماس های ابزار و فیلدهای استفاده نگاشت نشده اند.

## هرگز دوباره پخش نشد

یک درخواست تجاری می تواند عوارض جانبی داشته باشد حتی زمانی که شکست بخورد. بنابراین OmniRoute آن را یک بار ارسال می کند:

- بدون تلاش مجدد حمل و نقل و بدون تغییر مسیر زیر.
- بدون تلاش مجدد روی یک اتصال دیگر (بازگشت حساب) — شکست همانطور که هست برگردانده می شود و اتصال خنک نمی شود.
- بدون بازگشت به هدف ترکیبی بعدی، حتی برای یک پاسخ خالی یا ناموفق.

درخواستهای مشتری مجزا، و پنلهای ترکیبی که به صراحت چندین مدل را فراخوانی میکنند، هنوز نقطه پایانی را به طور مستقل فراخوانی میکنند.

## تست یک گره

ذخیره اتصال، اتصال** تست کنید** دکمهها و بررسیهای سلامت پسزمینه هرگز با نقطه پایانی تماس نمیگیرند: آنها فقط پیکربندی ذخیرهشده را تأیید میکنند و اتصال را غیرقابل تأیید گزارش میکنند.

`POST /api/provider-nodes/validate` با `"apiType": "custom-json"` و فیلدهای گره (`baseUrl`، `apiKey`، `customJson`، `customHeaders` اختیاری و `modelId`) دقیقاً یک درخواست واقعی را با `ping` به عنوان آخرین متن کاربر ارسال میکند. به `{ "valid": true }` یا وضعیت بالادست (هرگز بدنه بالادست) پاسخ می دهد.

## ذخیره سازی

پیکربندی در `provider_nodes.custom_json_config_json` (مهاجرت `240_provider_node_custom_json_config.sql`) ذخیره میشود و در `providerSpecificData.customJson` هر اتصال کپی میشود.

پیاده سازی: `open-sse/utils/customJson.ts` (اعتبار و قالب)، `open-sse/executors/customJson.ts` (مجری)، `open-sse/services/combo/noReplayLatch.ts` و `src/sse/handlers/chat/responsePolicies.ts` (بدون تکرار).
