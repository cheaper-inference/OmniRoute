# Custom JSON API provider nodes (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

ایک حسب ضرورت JSON API نوڈ ایک JSON بزنس اینڈ پوائنٹ کو جوڑتا ہے جو OpenAI یا Anthropic پروٹوکول نہیں بولتا ہے۔ OmniRoute ایک JSON درخواست ٹیمپلیٹ کو بھرتا ہے، اسے مکمل اختتامی نقطہ URL پر بھیجتا ہے، جوابی راستے سے جواب پڑھتا ہے اور اسے کلائنٹ کے اپنے فارمیٹ (چیٹ کی تکمیل، جوابات، پیغامات، ...) میں واپس کرتا ہے۔

یہ `apiType: "custom-json"` کے ساتھ ایک OpenAI کے موافق نوڈ ہے؛ اس کی id کی شکل `openai-compatible-custom-json-<suffix>` ہے۔ ڈیش بورڈ فارم ابھی تک دستیاب نہیں ہے۔ ذیل میں فراہم کنندہ نوڈ API کے ذریعے ان نوڈس کو بنائیں اور ان میں ترمیم کریں۔

## ایک نوڈ بنائیں

`POST /api/provider-nodes` (انتظام کی تصدیق):

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

- `baseUrl` ہے** مکمل** اختتامی نقطہ URL کچھ بھی شامل نہیں کیا گیا ہے (no `/chat/completions`، no `/models`) اور، دیگر OpenAI- ہم آہنگ نوڈس کے برعکس، کوئی ڈیفالٹ URL نہیں ہے۔ یہ `http(s)` ہونا چاہیے، بغیر ایمبیڈڈ اسناد یا `#fragment`، اور یہ ہر پرووائیڈر نوڈ کی طرح آؤٹ باؤنڈ URL گارڈ کو پاس کرتا ہے، جب نوڈ کو محفوظ کیا جاتا ہے اور ہر درخواست پر۔
- ایک نوڈ جو کنکشن کلید بھیجتا ہے (`authType` `bearer` یا `api-key`، بشمول ڈیفالٹ) `https://` استعمال کرنا چاہیے۔ سادہ `http://` صرف لوپ بیک ہوسٹ (`localhost`, `127.0.0.0/8`, `::1`) یا `authType: "none"` کے ساتھ قبول کیا جاتا ہے، جو کوئی کلید نہیں بھیجتا ہے۔ نجی LAN ایڈریس (`10.x`, `172.16-31.x`, `192.168.x`) مستثنیٰ نہیں ہیں: اس نیٹ ورک پر کوئی بھی کلید پڑھ سکتا ہے۔ اس طرح کے نوڈ کو محفوظ کرنا `400` کے ساتھ ناکام ہو جاتا ہے، اور پہلے ذخیرہ شدہ نوڈ ہر درخواست پر ایک ہی پیغام کے ساتھ بند ہو جاتا ہے، اس سے پہلے کہ کوئی درخواست بھیجی جائے۔ LAN پر کلیدی اختتامی نقطہ کے لیے، اسے TLS کے پیچھے رکھیں (مثال کے طور پر ریورس پراکسی)۔
- `customJson` کی توثیق Zod کے ساتھ کی جاتی ہے۔ نامعلوم چابیاں مسترد کر دی گئی ہیں۔ ہر فیلڈ اختیاری ہے:

| میدان             | اقدار                                        | طے شدہ                                                 |
| ----------------- | -------------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                       | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                  | `bearer`                                               |
| `authHeader`      | ہیڈر کا نام استعمال کیا جاتا ہے جب `api-key` | `X-API-Key`                                            |
| `requestTemplate` | JSON آبجیکٹ (≤ 64 KB, depth ≤ 32)            | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | فیلڈ پاتھ، یا پورے جسم کے لیے `$`            | `choices[0].message.content`                           |

- راز کنکشن کی API کلید میں رہتا ہے، کبھی ٹیمپلیٹ میں نہیں۔ `bearer` `Authorization: Bearer <key>` بھیجتا ہے؛ `api-key` `<authHeader>: <key>` بھیجتا ہے۔ auth ہیڈر `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` یا ہاپ بائی ہاپ ہیڈر نہیں ہو سکتا۔ `none` کے ساتھ، کنکشن کو کلید کی ضرورت نہیں ہے۔
- اضافی جامد ہیڈر نوڈ کے باقاعدہ `customHeaders` استعمال کرتے ہیں (ہر دوسرے ہم آہنگ نوڈ کی طرح ایک ہی توثیق؛ auth ہیڈرز کی وہاں اجازت نہیں ہے)۔

`PUT /api/provider-nodes/<id>` اسی `customJson` قبول کرتا ہے اور نوڈ کے ہر موجودہ کنکشن پر `baseUrl` اور config کو دوبارہ لکھتا ہے۔ `customJson` چھوڑنے سے ذخیرہ شدہ ترتیب برقرار رہتی ہے۔ `apiType` کو `chat` یا `responses` میں تبدیل کرنا اسے نوڈ اور اس کے کنکشن سے ہٹا دیتا ہے۔

پھر معمول کے مطابق نوڈ سے کنکشن شامل کریں ( نوڈ آئی ڈی کے ساتھ `POST /api/providers` ) اور `<prefix>/<model>` کی درخواست کریں، مثال کے طور پر `biz/assistant-v1`۔ اختتامی نقطہ کسی ماڈل کی فہرست کو ظاہر نہیں کرتا ہے، لہذا ماڈل آئی ڈیز کو ہاتھ سے شامل کریں۔

## ٹیمپلیٹس کی درخواست کریں۔

ٹیمپلیٹس سادہ JSON ہیں۔ سٹرنگ ویلیو میں `{{placeholder}}` مارکر ہو سکتے ہیں۔ کسی بھی چیز کا اندازہ یا عملدرآمد نہیں کیا جاتا ہے، اور آبجیکٹ کیز کو کبھی بھی تبدیل نہیں کیا جاتا ہے۔

| پلیس ہولڈر           | قدر                                                                       |
| -------------------- | ------------------------------------------------------------------------- |
| `{{prompt}}`         | تازہ ترین صارف کے پیغام کا متن (ٹیکسٹ پارٹس نئی لائنوں کے ساتھ شامل ہوئے) |
| `{{messages}}`       | OpenAI چیٹ فارمیٹ میں گفتگو                                               |
| `{{model}}`          | درخواست کردہ ماڈل id، فراہم کنندہ کے سابقہ کے بغیر                        |
| `{{stream}}`         | ہمیشہ `false` — اینڈ پوائنٹ کے جوابات ایک JSON دستاویز کے ساتھ دیں۔       |
| `{{request.<path>}}` | ترجمہ شدہ (OpenAI چیٹ فارمیٹ) کی درخواست کا ایک فیلڈ                      |

- ایک قدر جو بالکل ایک پلیس ہولڈر ہے اپنی JSON قسم کو برقرار رکھتی ہے (`"{{messages}}"` ایک صف بن جاتی ہے)؛ ایک لمبی تار کے اندر ایک پلیس ہولڈر متن کے طور پر داخل کیا جاتا ہے۔
- ایک پلیس ہولڈر جو کچھ بھی نہیں حل کرتا ہے وہ نامکمل پے لوڈ بھیجنے کے بجائے HTTP 400 کے ساتھ درخواست کو ناکام بنا دیتا ہے۔
- راستے ڈاٹ اشارے اور عددی اشاریہ جات (`data.items[0].text`) استعمال کرتے ہیں۔ `__proto__`، `prototype` اور `constructor` کلیدوں اور راستوں میں مسترد کر دیا گیا ہے۔

## جوابات

`responsePath` کی قدر اسسٹنٹ جواب بن جاتی ہے: سٹرنگز گزرتی ہیں، دیگر JSON ویلیوز کو سیریلائز کیا جاتا ہے۔ ایک غائب یا `null` فیلڈ، یا ایک باڈی جو JSON نہیں ہے، HTTP 502 لوٹاتا ہے۔ سٹریمنگ کلائنٹس کے لیے OmniRoute پورے JSON جواب کا انتظار کرتا ہے اور پھر اسے ایک مواد کے حصے کے علاوہ فنش چنک کے طور پر خارج کرتا ہے۔ یہ ٹوکن اسٹریمنگ نہیں ہے۔ ٹول کالز اور استعمال کے فیلڈز میپ نہیں کیے گئے ہیں۔

## کبھی دوبارہ نہیں چلایا

کاروباری درخواست کے ناکام ہونے پر بھی ضمنی اثرات ہو سکتے ہیں۔ لہذا OmniRoute اسے ایک بار بھیجتا ہے:

- نقل و حمل کی دوبارہ کوشش نہیں کی گئی اور نہ ہی کوئی ری ڈائریکٹ مندرجہ ذیل ہے۔
- کسی دوسرے کنکشن پر دوبارہ کوشش نہ کریں (اکاؤنٹ فال بیک) — ناکامی جیسا ہے اسی طرح لوٹا دی جاتی ہے اور کنکشن ٹھنڈا نہیں ہوتا ہے۔
- اگلے کومبو ہدف پر کوئی فال بیک نہیں، یہاں تک کہ خالی یا ناکام جواب کے لیے۔

الگ الگ کلائنٹ کی درخواستیں، اور فیوژن پینل جو واضح طور پر کئی ماڈلز کو کال کرتے ہیں، پھر بھی اختتامی نقطہ کو آزادانہ طور پر پکارتے ہیں۔

## نوڈ کی جانچ کرنا

کنکشن محفوظ کرنا، کنکشن** ٹیسٹ** بٹن اور بیک گراؤنڈ ہیلتھ چیکس کبھی بھی اینڈ پوائنٹ کو کال نہیں کرتے ہیں: وہ صرف ذخیرہ شدہ کنفیگریشن کی توثیق کرتے ہیں اور کنکشن کو قابل تصدیق نہیں ہونے کی اطلاع دیتے ہیں۔

`POST /api/provider-nodes/validate` `"apiType": "custom-json"` کے ساتھ اور نوڈ فیلڈز (`baseUrl`, `apiKey`, `customJson`, اختیاری `customHeaders` اور `modelId`) بالکل ایک حقیقی درخواست بھیجتا ہے، `ping` کے ساتھ تازہ ترین صارف متن کے طور پر۔ یہ `{ "valid": true }` یا upstream کی حیثیت کا جواب دیتا ہے (کبھی اپ اسٹریم باڈی نہیں)۔

## ذخیرہ

کنفیگریشن `provider_nodes.custom_json_config_json` (migration `240_provider_node_custom_json_config.sql`) میں محفوظ ہے اور ہر کنکشن کے `providerSpecificData.customJson` میں کاپی کی جاتی ہے۔

عمل درآمد: `open-sse/utils/customJson.ts` (توثیق اور ٹیمپلیٹنگ)، `open-sse/executors/customJson.ts` (Executor)، `open-sse/services/combo/noReplayLatch.ts` اور `src/sse/handlers/chat/responsePolicies.ts` (no-replay)۔
