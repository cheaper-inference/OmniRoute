# Chaos Mode (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **ڈیش بورڈ:** **Chaos Mode** (سائیڈ بار) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (ڈیش بورڈ سیشن) · `POST /api/skills/collect/chaos` (API کلید)  
> **ماخذ:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **ایک ہی کام بیک وقت متعدد فراہم کنندگان کو بھیجتا ہے** — ہر شریک فراہم کنندہ
ایک ماڈل انسٹینس فراہم کرتا ہے، اور آپ کو تمام جوابات ساتھ ساتھ (یا زنجیر کی صورت میں) ملتے ہیں۔ یہ
ایک کثیر ماڈل عمل درآمد کی سطح ہے، روٹنگ کی حکمت عملی نہیں: آپ کی معمول کی `/v1/chat/completions`
ٹریفک اس سے کبھی متاثر نہیں ہوتی۔

**وضاحت — "chaos" نام کے ساتھ تین مختلف چیزیں فراہم کی جاتی ہیں:**

| چیز                | یہ کیا ہے                                                                                                                                                        | دستاویز کہاں موجود ہے                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**     | یہاں بیان کردہ ڈیش بورڈ صفحہ + API: ایک کام کو متعدد فراہم کنندگان تک پھیلانا (متوازی یا اشتراکی انداز میں)۔                                                     | یہ رہنما                                     |
| `auto/chaos`       | Auto-Combo ماڈل id: متوازی پھیلاؤ، فی فراہم کنندہ ایک ماڈل، ہر ایک کے لیے ایک upstream کال۔ یہ fault injection نہیں ہے ([تفصیلات](#autochaos-parallel-fan-out))۔ | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo config | `config.chaos.enabled` کے ساتھ محفوظ شدہ combo اسی طرح پھیلاؤ کرتا ہے (صرف API)؛ `judgeModel` صرف حتمی جواب منتخب کرتا ہے، کوئی synthesis کال نہیں ہوتی۔         | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: متوازی پھیلاؤ

`auto/chaos`، fault-injection یا resilience-testing کا کنٹرول **نہیں** ہے۔
`/v1/chat/completions` پر `model: "auto/chaos"` کی درخواست کرنے سے:

1. **فی فراہم کنندہ ایک ماڈل** پر مشتمل پینل بنایا جاتا ہے: ہر منسلک
   فراہم کنندہ کا پہلا امیدوار، candidate-pool کی ترتیب میں، زیادہ سے زیادہ 5 اراکین تک
   (`OMNIROUTE_CHAOS_MAX_PANEL`، جس کی بالائی حد 10 ہے)
   (`open-sse/services/autoCombo/virtualFactory.ts`)۔ `chaos-mode` ویٹ
   پیک صرف ہر رکن کا `weight` مقرر کرتا ہے؛ پھیلاؤ اسے نہیں پڑھتا۔
2. ایک ہی درخواست پینل کے ہر رکن کو **متوازی طور پر** بھیجی جاتی ہے، اس لیے ایک درخواست
   پر پینل کے ہر رکن کے لیے ایک upstream کال کی لاگت آتی ہے
   (`open-sse/services/autoCombo/chaosEngine.ts`، جسے
   `open-sse/services/combo.ts` سے dispatch کیا جاتا ہے)۔
3. پینل کے ہر رکن کا نتیجہ موصول ہوتے ہی اس کے لیے ایک اسٹیٹس لائن stream کی جاتی ہے: بطور ڈیفالٹ ایک SSE تبصرہ
   (`: chaos <index> ok|fail <model>`)، اور جب درخواست
   `stream_options.include_chaos_parts: true` مقرر کرے تو اس کے ساتھ ایک `omni-chaos-part`
   event (`model`, `index`, `ok`, `error`) بھی آتا ہے۔ ان میں جواب کا کوئی متن شامل نہیں ہوتا۔
4. OpenAI طرز کے حتمی chunk کے طور پر پینل کا **ایک** جواب بھیجا جاتا ہے: اگر پینل کا پہلا
   رکن کامیاب ہو تو اسی کا (`auto/chaos` اسے `judgeModel` کے طور پر مقرر کرتا ہے)، بصورت دیگر
   آخری کامیاب رکن کا۔ پینل کے دیگر جوابات واپس نہیں کیے جاتے، لہٰذا آپ N کالز کی قیمت
   ادا کرتے ہیں اور ایک completion وصول کرتے ہیں۔

## سیٹ اپ

1. کھولیں۔** ڈیش بورڈ → افراتفری کا موڈ** (`/dashboard/chaos`)
2. اسے موڑ دیں۔** پر** — کیوس موڈ جہاز** ڈیفالٹ کی طرف سے غیر فعال** (`enabled: false` in `src/lib/chaos/chaosConfig.ts`) غیر فعال ہونے پر، `POST /api/chaos/run` جواب دیتا ہے `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`۔
3. شرکاء اور ڈیفالٹس کو منتخب کریں (ترتیبات اسٹور کے ذریعے فی مثال برقرار):

   | میدان               | مطلب                                                                | طے شدہ / حدود                                      |
   | ------------------- | ------------------------------------------------------------------- | -------------------------------------------------- |
   | `enabled`           | ماسٹر سوئچ                                                          | `false`                                            |
   | `defaultMode`       | `parallel` یا `collaborative` (نیچے ملاحظہ کریں)                    | `parallel`                                         |
   | `providerOverrides` | فی فراہم کنندہ کی شرکت (`providerId`، اختیاری `modelId`، `enabled`) | ہر فعال فراہم کنندہ کو خالی = ، زیادہ سے زیادہ 200 |
   | `systemPrompt`      | بلٹ ان کیوس سسٹم پرامپٹ کے لیے اوور رائڈ کریں۔                      | اختیاری، زیادہ سے زیادہ 10 000 حروف                |
   | `timeoutMs`         | فی ماڈل کال زیادہ سے زیادہ وقت                                      | `120000` (5 000–600 000)                           |
   | `maxTokens`         | `max_tokens` فی ماڈل کال                                            | `4096` (256–128 000)                               |

4. ہر حصہ لینے والے فراہم کنندہ کو دیں۔** ماڈل** . فراہم کنندہ کا ماڈل Chaos Mode صفحہ پر اس کے فعال شدہ اوور رائیڈ کا `modelId` ہوتا ہے (یہ جیت جاتا ہے)، بصورت دیگر** پہلے سے طے شدہ ماڈل** اس کے کنکشن کے. فراہم کنندہ کی شناخت کبھی بھی ماڈل نام کے طور پر استعمال نہیں ہوتی ہے۔ ایک فراہم کنندہ جس میں کوئی بھی نہیں ہے۔** نہیں بلایا** : یہ نتائج میں اس پیغام کے ساتھ `status: "error"` کے طور پر ظاہر ہوتا ہے _"اس فراہم کنندہ کے لیے کوئی ماڈل سیٹ نہیں ہے۔ Chaos Mode صفحہ پر اس کے لیے ایک ماڈل سیٹ کریں یا کنکشن پر ایک ڈیفالٹ ماڈل۔"_ اور ایک خالی `modelId`، جب کہ دوسرے فراہم کنندہ عام طور پر چلتے ہیں۔ اگر کسی منتخب فراہم کنندہ کے پاس ماڈل نہیں ہے تو، _"کوئی فراہم کنندہ کے پاس ماڈل سیٹ نہیں ہے۔ …"_ (دونوں اینڈ پوائنٹس پر HTTP 500) کے ساتھ کسی بھی اپ اسٹریم درخواست سے پہلے رن ناکام ہوجاتا ہے۔
5. چلائیں a** صفحہ سے ہی ٹیسٹ کریں۔** — نتائج کا پینل ہر فراہم کنندہ کا جواب، حیثیت اور مدت دکھاتا ہے۔

## عمل درآمد کے طریقے

- **`parallel`** — ہر ماڈل کو ایک ہی کام بیک وقت ملتا ہے؛ آپ کو تمام جوابات
  ایک دوسرے سے آزاد طور پر موصول ہوتے ہیں۔
- **`collaborative`** — ماڈلز **زنجیر میں** چلتے ہیں: ہر ماڈل پچھلے ماڈل کا آؤٹ پٹ دیکھتا ہے اور
  اس سے اسے بہتر بنانے، وسعت دینے، تنقید کرنے یا متبادل پیش کرنے کے لیے کہا جاتا ہے۔ جواب کا `summary`
  فیلڈ کامیاب آؤٹ پٹس کو زنجیر کی ترتیب میں یکجا کرتا ہے (متوازی رنز میں `summary` نہیں ہوتا)۔

## API

### `POST /api/chaos/run` — ڈیش بورڈ سیشن

کوکی سے تصدیق شدہ (منیجمنٹ سیشن — [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) دیکھیں)؛ ڈیش بورڈ صفحہ کے ذریعہ استعمال کیا جاتا ہے۔

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

### `POST /api/skills/collect/chaos` — API کلید

بیرونی کال کرنے والوں کے لیے بیئرر ٹوکن ویرینٹ۔ چابی کو لے جانا چاہیے۔** افراتفری کے موڈ کی اجازت** (`chaosModeEnabled`)، جو ہے۔** ڈیفالٹ کی طرف سے بند** — اسے فی کلید میں فعال کریں۔** ڈیش بورڈ → API مینیجر → ترمیم کلید → اجازتیں → افراتفری موڈ** . اوپر کی طرح ایک ہی جسم۔

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

دونوں اختتامی نقطے ایک ہی شکل لوٹتے ہیں:

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

## خرابی کا سراغ لگانا

- **`400 Chaos Mode is not enabled`** اوپر — مرحلہ 2: عالمی سوئچ آف ہے۔
- **API کلید `/api/skills/collect/chaos` پر مسترد ہو جاتی ہے۔** — کلید میں فی کلید `chaosModeEnabled` کی اجازت نہیں ہے (بذریعہ ڈیفالٹ؛ یہ ایک ترتیب ہے، غلطی نہیں)۔
- **ایک فراہم کنندہ `No model set for this provider` دکھاتا ہے۔** — نے اپنا ماڈل Chaos Mode صفحہ پر سیٹ کیا یا اس کے کنکشن پر ڈیفالٹ ماڈل (دیکھیں سیٹ اپ، مرحلہ 4)۔
- **ایک فراہم کنندہ جس کی آپ کو توقع تھی نتائج سے غائب ہے۔** — کیوس موڈ صفحہ پر `providerOverrides` چیک کریں (ایک غیر فعال اوور رائڈ اس کو خارج نہیں کرتا ہے) اور آیا فراہم کنندہ کنکشن فعال ہے۔
