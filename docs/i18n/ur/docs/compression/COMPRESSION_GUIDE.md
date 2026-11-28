# 🗜️ Prompt Compression Guide — OmniRoute (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> اہل سیاق پر خودکار طور پر 15-95% بچت کریں۔ مختصر جائزے کے لیے، [README کا Compression سیکشن](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically) دیکھیں۔

## جائزہ

OmniRoute ایک ماڈیولر پرامپٹ کمپریشن پائپ لائن نافذ کرتا ہے جو درخواستوں کے اپ اسٹریم فراہم کنندگان تک پہنچنے سے **پہلے ہی فعال طور پر** چلتی ہے۔ اس کا مطلب ہے کہ آپ کے ٹوکنز کی بچت شفاف انداز میں ہوتی ہے — آپ کے ورک فلو میں کسی تبدیلی کی ضرورت نہیں۔

```
کلائنٹ کی درخواست
  → کمپریشن حکمتِ عملی کا انتخاب کنندہ
    → کومبو اوور رائیڈ؟ → کومبو سیٹنگ استعمال کریں
    → خودکار ٹرگر کی حد؟ → خودکار موڈ استعمال کریں
    → ڈیفالٹ موڈ؟ → عالمی سیٹنگ استعمال کریں
    → بند؟ → کمپریشن چھوڑ دیں
  → منتخب کردہ کمپریشن موڈ
    → بند: کوئی کمپریشن نہیں
    → ہلکا: محفوظ وائٹ اسپیس/فارمیٹنگ کی صفائی (~15%)
    → معیاری: Caveman طرز میں غیر ضروری الفاظ کا اخراج (~30%)
    → جارحانہ: ہسٹری ایجنگ + خلاصہ سازی (~50%)
    → الٹرا: ہیورسٹک چھانٹی + کوڈ بلاکس کو مختصر کرنا (~75%)
    → RTK: کمانڈ سے آگاہ ٹرمینل/ٹول آؤٹ پٹ فلٹرنگ (اپ اسٹریم حد 60-90%)
    → اسٹیکڈ: ترتیب وار ملٹی انجن پائپ لائن، عموماً پہلے RTK پھر Caveman (اہل حد 78-95%)
  → کمپریس شدہ درخواست → فراہم کنندہ
```

---

## کمپریشن موڈز

### بند

کوئی کمپریشن لاگو نہیں کی جاتی۔ تمام پیغامات بغیر تبدیلی کے گزر جاتے ہیں۔

### لائٹ موڈ (~15% بچت، <1ms تاخیر)

سب سے محفوظ موڈ — فارمیٹنگ کی صفائی۔ اس کے ٹول-نتائج کو مختصر کرنا نقصان دہ ہوتا ہے، اس لیے ڈیفالٹ
پاتھ (`allow-lossy`، `engine:lite` یا نامزد کومبو آپٹ اِن کے بغیر) لائٹ موڈ کو
`compressToolResults: false` کے ساتھ چلاتا ہے: پہلے کے ٹول نتائج فراہم کنندہ تک بغیر تبدیلی کے پہنچتے ہیں۔

| تکنیک                    | وضاحت                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | مسلسل خالی سطروں اور اختتامی اسپیسز کو یکجا کرتا ہے                                       |
| `dedupSystemPrompt`      | دہرائے گئے سسٹم پیغامات کو ہٹاتا ہے                                                       |
| `compressToolResults`    | پہلے کے ٹول نتائج کو لائٹ کیپ تک مختصر کرتا ہے (نقصان دہ: صرف درخواست کے آپٹ اِن کے ساتھ) |
| `removeRedundantContent` | دہرائی گئی ہدایات کو ہٹاتا ہے                                                             |
| `replaceImageUrls`       | base64 امیج ڈیٹا URI کو مختصر کرتا ہے                                                     |

**بہترین استعمال:** ہمیشہ فعال استعمال، حفاظتی لحاظ سے اہم ورک فلو۔

### اسٹینڈرڈ موڈ (~30% بچت)

[Caveman](https://github.com/JuliusBrussee/caveman) سے متاثر — مفہوم برقرار رکھتے ہوئے غیر ضروری الفاظ اور طویل عبارت کو ہٹاتا ہے:

- غیر ضروری الفاظ ہٹاتا ہے ("please"، "I think"، "basically"، "actually")
- طویل فقروں کو مختصر کرتا ہے ("in order to" → "to"، "as a result of" → "because")
- مؤدبانہ تردد کو ہٹاتا ہے ("Would you mind..."، "If you could possibly...")
- کوڈنگ پرامپٹس کے لیے بہتر بنائے گئے 30+ ریجیکس اصول

**بہترین استعمال:** روزمرہ کے کوڈنگ ورک فلو، لاگت کے حوالے سے حساس ٹیمیں۔

### ایگریسیو موڈ (~50% بچت)

طویل سیشنز کے لیے اسمارٹ ہسٹری مینجمنٹ:

- **پیغام کی عمر بندی** — پرانے پیغامات کو بتدریج مختصر کیا جاتا ہے
- **ٹول نتائج کی کمپریشن** — طویل ٹول آؤٹ پٹس کو مختصر یا حذف کیا جاتا ہے (پہلی/آخری سطریں،
  میچ-لائن فلٹرنگ، JSON کلیدوں کو مختصر کرنا)
- **ساختی سالمیت کے حفاظتی اقدامات** — یقینی بناتے ہیں کہ `tool_use` + `tool_result` جوڑے مستقل رہیں
- **کانٹیکسٹ ونڈو کی آگاہی** — ہر ماڈل کی ٹوکن حدود کا احترام کرتی ہے

**بہترین استعمال:** طویل ڈیبگنگ سیشنز، بڑے کوڈ بیسز۔

### الٹرا موڈ (~75% بچت)

ٹوکن کے لحاظ سے اہم حالات کے لیے زیادہ سے زیادہ کمپریشن:

- **ہیوریسٹک پرننگ** — نثر کے ٹوکنز کو اسکور کی بنیاد پر ہٹانا
- **ساخت کا تحفظ** — fenced code blocks، inline code، URLs اور identifiers کو لفظ بہ لفظ محفوظ کیا جاتا ہے، کبھی پرن نہیں کیا جاتا
- **اختیاری SLM درجۂ کار** — کنفیگر ہونے پر ایک چھوٹا مقامی ماڈل پرن کو بہتر بنا سکتا ہے
- ایگریسیو موڈ سے آزاد: یہ message aging، tool-result compression یا fallback summarizer نہیں چلاتا (صرف SLM-tier کی ناکامی fallback pass کو aggressive کے ذریعے روٹ کر سکتی ہے)

**بہترین استعمال:** جب آپ کو بار بار کانٹیکسٹ حدود کا سامنا ہو۔

### RTK موڈ (upstream رینج میں 60-90%)

RTK موڈ کو کوڈنگ ایجنٹ سیشنز میں ظاہر ہونے والے طویل ٹول آؤٹ پٹس کے لیے بہتر بنایا گیا ہے:

- `git status`، `git diff`، `git log`، ٹیسٹ رنرز،
  TypeScript/Vite/Webpack builds، ESLint/Biome/Prettier، npm audit/installs، Docker logs، infra
  output، اور عمومی shell output جیسی کمانڈ/آؤٹ پٹ کلاسز کا پتا لگاتا ہے
- `open-sse/services/compression/engines/rtk/filters/` سے JSON فلٹر پیکس لاگو کرتا ہے
- پروجیکٹ یا عالمی `filters.toml` فائلوں سے RTK TOML schema v1 فلٹرز درآمد کرتا ہے، inline-test
  validation اور پروجیکٹ فائلوں کے لیے trust-gating کے ساتھ
- inline verify samples کے ساتھ 56 بلٹ اِن فلٹرز فراہم کرتا ہے
- ANSI کنٹرول سیکوینسز، progress bars، دہرائی گئی سطریں، اور غیر عملی شور ہٹاتا ہے
- failures، errors، warnings، تبدیل شدہ فائلیں، summaries، اور طویل آؤٹ پٹ کا آخری حصہ محفوظ رکھتا ہے
- trust-gated پروجیکٹ فلٹرز، عالمی فلٹرز، اور اختیاری redacted raw-output recovery کو سپورٹ کرتا ہے

**بہترین استعمال:** shell، build، test، git، grep، اور file-output transcripts والے ایجنٹ سیشنز۔

### اسٹیکڈ موڈ (eligible رینج میں 78-95%)

اسٹیکڈ موڈ متعدد کمپریشن انجنز کو ایک متعین ترتیب میں چلاتا ہے۔ ڈیفالٹ پائپ لائن یہ ہے:

```txt
RTK -> Caveman
```

یہ ترتیب پہلے ٹرمینل/ٹول آؤٹ پٹ کو مختصر رکھتی ہے، پھر باقی قدرتی زبان کے پرامپٹ پر Caveman کی معنوی
مختصر کاری لاگو کرتی ہے۔ اسٹیکڈ پائپ لائنز کو عالمی سطح پر یا routing combos کو تفویض کردہ
compression combos کے ذریعے کنفیگر کیا جا سکتا ہے۔

**بہترین استعمال:** بڑے ٹول لاگز کے ساتھ انسانی ہدایات یا اسسٹنٹ خلاصوں پر مشتمل مخلوط کانٹیکسٹ۔

## اپ اسٹریم بچت کا حساب

OmniRoute دو ذرائع سے حاصل ہونے والی کمپریشن کی بچت کو دستاویزی شکل دیتا ہے: اپ اسٹریم پروجیکٹ بینچ مارکس اور
OmniRoute کے اپنے انجنوں کا امتزاج۔

| ماخذ    | یہاں استعمال کیا گیا اپ اسٹریم README کا عدد                                                           |
| ------- | ------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` کم آؤٹ پٹ ٹوکنز، بینچ مارک کی اوسط آؤٹ پٹ بچت `65%`، حد `22-87%`، اور `~46%` اِن پٹ کمپریشن ٹول |
| RTK     | کمانڈ آؤٹ پٹ میں `60-90%` بچت؛ نمونہ سیشن میں `~118,000 -> ~23,900` ٹوکنز، یا `79.7%` بچت (`~80%`)     |

ایک دوسرے سے متجاوز ٹول/کانٹیکسٹ پے لوڈز کے لیے، ڈیفالٹ OmniRoute کومبو انجنوں کو اس ترتیب میں استعمال کرتا ہے:

```txt
RTK -> Caveman
```

مشترکہ بچت ضربی ہوتی ہے، جمعی نہیں:

```txt
combined = 1 - (1 - RTK بچت) * (1 - Caveman اِن پٹ بچت)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

یہ `78-95%` عدد اس وقت لاگو ہوتا ہے جب RTK اور Caveman دونوں ایک ہی اِن پٹ/کانٹیکسٹ پے لوڈ کو کم کر سکیں۔
Caveman کا رسپانس آؤٹ پٹ موڈ الگ ہے: فعال ہونے پر، Caveman کی اپنی آؤٹ پٹ بچت استعمال کریں (اوسط `65%`،
نمایاں عدد `~75%`، حد `22-87%`)۔ بلنگ کی مجموعی بچت آپ کے پرامپٹ/آؤٹ پٹ کے تناسب پر منحصر ہے۔

### دراصل "اہل" ہونے کا کیا مطلب ہے

15-95% کی نمایاں حد حقیقی ہے، لیکن یہ صرف **فالتو یا ضرورت سے زیادہ تفصیلی** مواد پر لاگو ہوتی ہے — بار بار دہرائی گئی
خرابی کی سطریں، ایک ایسا بلڈ لاگ جو ایک ہی انتباہ کو بار بار دکھاتا ہو، یا ضرورت سے بڑا `grep`/فائل ریڈ ڈمپ۔ اس کا
یہ مطلب **نہیں** کہ ہر درخواست میں اتنی بچت ہوگی۔

تجرباتی طور پر تصدیق شدہ (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): 300 یکساں
خرابی کی سطروں پر مشتمل Anthropic ساخت کے `tool_result` بلاک پر چلائے گئے `stacked` (RTK + Caveman) عمل نے
**95.93% ٹوکن بچت / 96.26% کریکٹر بچت** فراہم کی — جو بالکل مشتہر کردہ
حد میں ہے۔ لیکن اسی پائپ لائن کو عام، غیر تکراری ٹول آؤٹ پٹ (ایک صاف `grep` میچ فہرست،
مختصر فائل ریڈ، عام مکالماتی متن) پر چلانے سے درست طور پر **تقریباً صفر بچت** حاصل ہوتی ہے، کیونکہ
ہٹانے کے لیے کوئی تکراری مواد موجود نہیں ہوتا اور `validateCompression()` (`validation.ts`) ایسی
دوبارہ تحریر بھیجنے سے انکار کر دیتا ہے جو کوڈ بلاکس، URLs، سرخیوں، ورژنز، یا تمام بڑے حروف والے مستقل شناخت کنندگان کو حذف یا تبدیل کر دے۔

یہ متوقع اور محفوظ طرزِ عمل ہے، کوئی بگ نہیں: ایک کوڈنگ سیشن جو زیادہ تر صاف فائلوں کو پڑھتا یا ان میں grep کرتا ہے،
مکمل طور پر فعال کمپریشن کے باوجود معمولی مجموعی بچت دکھائے گا، جبکہ ناکام ہونے والے
لوپ یا بہت زیادہ آؤٹ پٹ دینے والے لنٹر کا سامنا کرنے والا سیشن اس ٹریفک پر مکمل 78-95% حد کی بچت دیکھے گا۔ کسی ایک سیشن کی
کم مجموعی بچت کی شرح کو کمپریشن کی غلط کنفیگریشن کا ثبوت نہ سمجھیں — پہلے یہ جانچیں کہ آیا
بنیادی ٹول آؤٹ پٹ واقعی تکراری تھا۔

---

## ٹوکن بچت کی بصری نمائندگی

```
کمپریشن کے بغیر:       LLM کو 47K ٹوکنز بھیجے گئے
Lite کے ساتھ:          40K ٹوکنز بھیجے گئے          (15% بچت — محفوظ، ہمیشہ فعال)
Standard کے ساتھ:      33K ٹوکنز بھیجے گئے          (30% بچت — caveman طرزِ گفتگو کے قواعد)
Aggressive کے ساتھ:    24K ٹوکنز بھیجے گئے          (50% بچت — پرانے مواد کی تخفیف + خلاصہ سازی)
Ultra کے ساتھ:         12K ٹوکنز بھیجے گئے          (75% بچت — تخمینی چھانٹی)
RTK کے ساتھ:           19K-5K ٹوکنز بھیجے گئے       (کمانڈ/ٹول آؤٹ پٹ پر 60-90% بچت)
Stacked کے ساتھ:       10K-2.5K ٹوکنز بھیجے گئے     (اہل RTK+Caveman مواد پر 78-95% حد)
```

---

## ترتیب

### ڈیش بورڈ

`Dashboard → Context & Cache` پر جائیں:

- **Caveman** — موڈ کا انتخاب، لینگویج پیکجز، پیش منظر، اور عالمی ڈیفالٹس
- **RTK** — کمانڈ فلٹر کا پیش منظر، RTK حفاظتی ترتیبات، اور فلٹر کیٹلاگ
- **Compression Combos** — روٹنگ کومبو کو تفویض کردہ نامزد انجن پائپ لائنز
- **Auto-Trigger Threshold** — ٹوکن کی تعداد حد سے تجاوز کرنے پر کمپریشن خودکار طور پر فعال کریں

### فی کومبو اووررائیڈ

`Dashboard → Context & Cache → Compression Combos` میں کسی روٹنگ
کومبو کو کمپریشن کومبو تفویض کریں:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

اس سے آپ مفت/کوڈنگ فراہم کنندگان پر اسٹیک شدہ کمپریشن استعمال کر سکتے ہیں، جبکہ معاوضہ شدہ
سبسکرپشنز پر لائٹ موڈ برقرار رہتا ہے۔

یہ "Per-Combo Override" تفویض، **روٹنگ-کومبو کمپریشن
موڈ** اووررائیڈ (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — فیلڈ کی اسکیمہ
`rtk`، `stacked` اور `omniglyph` کو بھی قبول کرتی ہے) سے ایک مختلف کنٹرول ہے — یہ اووررائیڈ کسی نامزد
کمپریشن-کومبو پائپ لائن کا انتخاب نہیں کرتا؛ یہ صرف `resolveCompressionPlan` کے ذریعے استعمال ہونے
والا `compressionMode` فیلڈ سیٹ کرتا ہے۔ اسے کومبو کارڈ (`Dashboard → Combos`) پر یا، #6760 کے بعد،
`Dashboard → Context & Cache → Compression Combos` کے "Assign to routing" فہرست میں فی روٹنگ کومبو بھی
سیٹ کیا جا سکتا ہے، بالکل اوپر دستاویز کردہ پائپ لائن-تفویض چیک باکس کے ساتھ۔ دونوں سطحیں ایک ہی
`PUT /api/combos/{id}` اینڈپوائنٹ کے ذریعے برقرار رہتی ہیں۔

### فی درخواست اووررائیڈ

کسی ایک درخواست کے لیے کمپریشن پلان اووررائیڈ کرنے کی خاطر `x-omniroute-compression` درخواست ہیڈر
بھیجیں۔ اس کی ترجیح سب سے زیادہ ہے — یہ روٹنگ-کومبو اووررائیڈ، فعال پروفائل، خودکار ٹرگر، اور پینل
کے Default کو بھی اووررائیڈ کرتا ہے۔ نامعلوم اقدار کو نظرانداز کر دیا جاتا ہے (درخواست کبھی مسترد نہیں
کی جاتی) اور عالمی ماسٹر سوئچ بدستور ہر چیز کو کنٹرول کرتا ہے: جب کمپریشن عالمی طور پر بند ہو، تو ہیڈر
اسے فعال نہیں کر سکتا۔ اقدار:

| قدر           | اثر                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| `off`         | اس درخواست کے لیے کوئی کمپریشن نہیں۔                                                                     |
| `default`     | پینل سے حاصل کردہ Default پروفائل (فعال پروفائل کو نظرانداز کرتا ہے)۔ Lossy انجن بند رہتے ہیں۔           |
| `safe`        | ہیڈر نہ بھیجنے کے برابر۔                                                                                 |
| `allow-lossy` | اس درخواست کا آپریٹر پلان برقرار رکھیں، جس میں خلاصے، متعلقہ فلٹرز، اور اسٹائل کی دوبارہ تحریر شامل ہیں۔ |
| `engine:<id>` | فعال ہونے پر ایک واحد انجن، مثلاً `engine:rtk`۔ یہ اس انجن کے لیے فی درخواست opt-in ہے۔                  |
| `<combo>`     | نام سے (case-insensitive) پہلے، پھر id سے مماثل نامزد کومبو۔                                             |

`allow-lossy`، `engine:<id>`، یا کسی نامزد کومبو کے بغیر، lossy انجن لاگو نہیں کیے جاتے۔ جب کسی
lossy Default، خودکار ٹرگر، یا روٹنگ اووررائیڈ کو کم درجے پر لایا جاتا ہے، تو OmniRoute ترتیب شدہ
اسٹیک شدہ پائپ لائن میں سے شناخت شدہ lossless مراحل کو ترتیب کے مطابق برقرار رکھتا ہے۔ یہ صرف اس وقت
`session-dedup → lite` پر واپس آتا ہے جب کوئی ترتیب شدہ lossless مرحلہ باقی نہ بچے۔

Settings پینل کا **Effective pipeline** پیش منظر معمول کے مستقل پلان کو دکھاتا ہے۔ جب خودکار ٹرگر
چل سکتا ہو، تو یہی پیش منظر اس کی مشروط مؤثر پائپ لائن بھی دکھاتا ہے، تاکہ پینل اور ہیڈر کے بغیر
رن ٹائم ریزولوشن ہم آہنگ رہیں۔

لاگو کیا گیا پلان `X-OmniRoute-Compression: <mode>; source=<source>` رسپانس
ہیڈر میں واپس بھیجا جاتا ہے، جہاں `<source>` ان میں سے ایک ہوتا ہے: `request-header`،
`routing-override`، `active-profile`، `auto-trigger`، `default`، یا `off`۔

### API

```bash
# کمپریشن کی ترتیبات حاصل کریں
curl http://localhost:20128/api/settings/compression

# کمپریشن کی ترتیبات اپ ڈیٹ کریں
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# مخصوص RTK/stacked پے لوڈ کا پیش منظر دیکھیں
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK فلٹر پیکس کی فہرست بنائیں
curl http://localhost:20128/api/context/rtk/filters

# اختیاری کمانڈ میٹا ڈیٹا کے ساتھ براہِ راست RTK کی جانچ کریں
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## کیا محفوظ رہتا ہے

کمپریشن انجن **ہمیشہ محفوظ رکھتا ہے:**

- ✅ کوڈ بلاکس (fenced اور inline)
- ✅ URLs اور فائل پاتھس
- ✅ JSON اسٹرکچرز اور ساختہ ڈیٹا
- ✅ identifiers اور محفوظ تکنیکی tokens
- ✅ ریاضیاتی expressions
- ✅ ٹول/function call definitions
- ✅ سسٹم prompts (lite موڈ میں)

RTK کی raw-output recovery کسی بھی چیز کو محفوظ کرنے سے پہلے عام API keys، bearer tokens، Slack tokens، AWS access keys، passwords، tokens، اور secrets کو مخفی کر دیتی ہے۔

---

## کمپریشن کے اعداد و شمار

ہر کمپریس شدہ درخواست کے اعداد و شمار سرور logs میں شامل ہوتے ہیں:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## مراحل کا روڈ میپ

| مرحلہ    | موڈز                                                                                                                                          | حیثیت              |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| مرحلہ 1  | Off, Lite                                                                                                                                     | ✅ جاری کر دیا گیا |
| مرحلہ 2  | Standard, Aggressive, Ultra                                                                                                                   | ✅ جاری کر دیا گیا |
| مرحلہ 3  | RTK, Stacked, Compression Combos                                                                                                              | ✅ جاری کر دیا گیا |
| مرحلہ 4  | Output Styles, SLM-tier Ultra، eval harness                                                                                                   | ✅ جاری کر دیا گیا |
| مرحلہ 4C | Adaptive context-budget ("dial") — compute engine + API (`contextBudget` on `PUT /api/settings/compression`) + dashboard mode/policy controls | ✅ جاری کر دیا گیا |

---

## اعترافات

Standard mode کے کمپریشن قواعد **[JuliusBrussee](https://github.com/JuliusBrussee)** کے **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) سے متاثر ہیں — یہ وائرل "جب کم tokens سے کام ہو جاتا ہے تو زیادہ tokens کیوں استعمال کریں" پروجیکٹ ہے۔ Caveman کے مطابق output tokens میں `~75%` کمی، benchmark میں output کی اوسط `65%` بچت، output کی `22-87%` حد، اور input compression کے لیے ایک `~46%` ٹول حاصل ہوتا ہے۔

RTK mode، **[RTK AI](https://github.com/rtk-ai)** کے **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** سے متاثر ہے — یہ terminal، build، test، git، اور tool-output filtering کے لیے اعلیٰ کارکردگی کا command-output compression پروجیکٹ ہے۔ RTK کے مطابق `60-90%` بچت ہوتی ہے، جبکہ اس کے README میں موجود نمونہ session تقریباً `~80%` بچت دکھاتا ہے۔

---

## اعلی درجے کی کمپریشن سسٹمز

اوپر بیان کردہ 7 طریقوں کے علاوہ (ذریعہ `codex-responses` اور `omniglyph` طریقوں کو بھی قبول کرتا ہے، جن کا یہ گائیڈ احاطہ نہیں کرتا ہے)، ذیل کے حصے ان خصوصیات کا احاطہ کرتے ہیں جو ان طریقوں کے اندر یا اس کے ساتھ کام کرتی ہیں: ٹول رزلٹ کمپریشن اور پروگریسو ایجنگ جارحانہ انجن کے 1 اور 2 مرحلے ہیں (جارحانہ موڈ اور ایک `aggressive` لائن)، اسٹیک اسٹیک، سٹیک پائپ لائن کا مرحلہ کیسے چلتا ہے۔ Cache-Aware Compression `aggressive` اور `ultra` کو کیشنگ فراہم کنندگان کے لیے `standard` میں گھٹا دیتا ہے جب کہ کمپریشن آن ہوتا ہے، اور Caveman آؤٹ پٹ موڈ اور آؤٹ پٹ اسٹائلز آپٹ ان سسٹم پرامپٹ ہدایات ہیں، جو ڈیفالٹ طور پر بند ہیں، جو درخواست کو کمپریس کرنے کے بجائے ماڈل کے آؤٹ پٹ کو شکل دیتی ہیں۔

### کیشے سے آگاہ کمپریشن

کچھ فراہم کنندگان (جیسے Anthropic فوری کیشنگ کے ساتھ) سپورٹ کرتے ہیں۔** فوری کیشنگ** ، جو انہیں لاگت اور تاخیر کو کم کرنے کے لیے پرامپٹ کے حصوں کو کیش کرنے دیتا ہے۔ جب کیشنگ کو فعال کیا جاتا ہے، جارحانہ کمپریشن اصل میں کر سکتا ہے** چوٹ** کارکردگی کیونکہ یہ کیش شدہ ٹوکنز کو تبدیل کرتا ہے، کیشے کو باطل کرتا ہے۔

`cachingAware.ts` ماڈیول اسے حل کرتا ہے۔** کیشنگ سیاق و سباق کا پتہ لگانا** اور** کمپریشن کی حکمت عملی کو ایڈجسٹ کرنا** اس کے مطابق

#### یہ کیسے کام کرتا ہے۔

1. **کیشنگ سیاق و سباق کا پتہ لگائیں۔** — `cache_control` مارکر کے لیے درخواست کے باڈی کو اسکین کرتا ہے۔
2. **کیشنگ فراہم کنندگان کی شناخت کریں۔** — چیک کرتا ہے کہ آیا ہدف فراہم کرنے والا کیشنگ کو سپورٹ کرتا ہے۔
3. **حکمت عملی کو ایڈجسٹ کریں۔** — کیشنگ فراہم کنندگان کے لیے `aggressive`/`ultra` کو `standard` سے نیچے کرتا ہے
4. **سسٹم پرامپٹ کو چھوڑیں۔** — سسٹم پرامپٹس عام طور پر کیش ہوتے ہیں، اس لیے انہیں کمپریس نہ کریں۔

حکمت عملی کا مددگار ایک `deterministicOnly` جھنڈا بھی واپس کرتا ہے، لیکن منصوبہ بنانے والا صرف حکمت عملی — استعمال کرتا ہے جو آج جھنڈے کو نہیں پڑھتا۔

#### کوڈ کی مثال

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### کب استعمال کرنا ہے۔

کیشے سے آگاہ کمپریشن ہے۔** ہمیشہ پر** — کسی ترتیب کی ضرورت نہیں ہے۔ جب بھی کمپریشن آن ہوتا ہے تو یہ شروع ہوتا ہے اور ہدف فراہم کرنے والا فوری کیشنگ (Anthropic، OpenAI، وغیرہ) کو سپورٹ کرتا ہے۔ واضح `cache_control` مارکر کی ضرورت نہیں ہے — ایک کیشنگ فراہم کنندہ تنزلی کو متحرک کرتا ہے، اور اکیلے مارکر کبھی نہیں کرتے (مارکر کا پتہ لگانے سے کیش ٹیلی میٹری فیڈ ہوتی ہے، حکمت عملی کا فیصلہ نہیں)۔

OpenRouter صرف `anthropic/*` ماڈلز کے لیے ایک کیشنگ فراہم کنندہ کے طور پر شمار ہوتا ہے: Claude کوڈ کی درخواستیں اپنے `cache_control` بریک پوائنٹس (زیادہ سے زیادہ 4) رکھتی ہیں اور گارڈ سابقے کی حفاظت کرتا ہے، جبکہ ہر دوسرا OpenRouter خاندان (`openai/`, `google/`, `qwen/`, …) چھین اور غیر محفوظ رہتا ہے۔

### ترقی پسند خستہ

لمبی گفتگو میں پیغام کے کئی موڑ جمع ہوتے ہیں، لیکن پرانے موڑ کم متعلقہ ہو جاتے ہیں۔ `progressiveAging.ts` ماڈیول** باری باری فاصلے سے پیغامات کو کم کرتا ہے۔** (گفتگو کے اختتام سے فاصلہ ماپا گیا)۔ بھیجے گئے ڈیفالٹس کے ساتھ (`verbatim: 2, light: 2, moderate: 3`):

- **آخری 2 موڑ (فاصلہ ≤ 2)** : لفظ بہ لفظ رکھا
- **فاصلہ 3** : کیو مین کمپریشن (فلر ہٹانا)
- **فاصلہ 4 +** : معاون پیغامات کا خلاصہ؛ صارف کے پیغامات کو ان کی پہلی لائن تک کم کر دیا گیا، 120 حروف پر محدود۔ دیگر کردار اچھوتے. سسٹم پرامپٹس، پہلے سے پرانے پیغامات اور صارف کے تازہ ترین پیغامات کو ہمیشہ لفظی طور پر رکھا جاتا ہے قطع نظر دوری کے۔ کچھ بھی سیدھا نہیں چھوڑا جاتا ہے، اور `light` بینڈ بھیجے گئے ڈیفالٹس (`light` equals `verbatim`) کے ساتھ ناقابل رسائی ہے۔

#### کوڈ کی مثال

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### کب استعمال کرنا ہے۔

ترقی پسند عمر رسیدہ ہے۔** ہمیشہ پر** `aggressive` موڈ — کے لیے یہ `compressAggressive()` کا مرحلہ 2 ہے۔ الٹرا موڈ اسے نہیں چلاتا۔ یہ خاص طور پر مؤثر ہے:

- طویل عرصے سے چلنے والے کوڈنگ سیشن
- کئی دن کی گفتگو
- بہت سے ٹول کالز کے ساتھ ایجنٹ ورک فلو

### کیو مین آؤٹ پٹ موڈ

Caveman آؤٹ پٹ موڈ شامل کرتا ہے۔** نظام فوری ہدایات** جو کہ ماڈل سے ہی terse output — کے لیے پوچھتا ہے، `lite` لیول مختصر جوابات کے لیے پوچھتا ہے جو مکمل جملے رکھتے ہیں، `full` اسے "سمارٹ کیو مین کی طرح مختصر جواب دینے" کو کہتا ہے، اور `ultra` ٹیلی گرافک آؤٹ پٹ کے لیے پوچھتا ہے۔ ہدایات صرف پوچھتی ہیں، وہ اس کی ضمانت نہیں دے سکتے۔ درخواستیں انہیں `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) کے ذریعے موصول ہوتی ہیں : `open-sse/handlers/chatCore.ts` سب سے پہلے بیک کمپیٹ شیم (`resolveOutputStyleSelection()` میں `open-sse/services/compression/outputStyles/backCompat.ts`) کے ساتھ انتخاب کو حل کرتا ہے، جو `outputStyles` خالی ہونے پر، `cavemanOutputMode.intensity` پر ایک فعال `cavemanOutputMode` `terse-prose` آؤٹ پٹ سٹائل میں نقش کرتا ہے (ذیل میں Back-compat دیکھیں)؛ ایک غیر خالی `outputStyles` انتخاب جیسا ہے استعمال کیا جاتا ہے، اور `cavemanOutputMode.enabled` اور `intensity` کوئی اثر نہیں ہوتا ہے، جبکہ اس کا `autoClarity` ٹوگل اب بھی لاگو ہوتا ہے۔ `outputMode.ts` انسٹرکشن ٹیکسٹس (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`)، مواد بائی پاس اور پلیسمنٹ ہیلپر رکھتا ہے جو انجیکشن استعمال کرتا ہے۔ اس کے اپنے `applyCavemanOutputMode()` انجیکٹر کا کوئی پروڈکشن کالر نہیں ہے۔

#### یہ کیسے کام کرتا ہے۔

یہ موڈ ان پٹ کو کمپریس نہیں کرتا ہے۔ یہ سسٹم پرامپٹ میں ایک انسٹرکشن بلاک کا اضافہ کرتا ہے (دیکھیں کہ انجیکشن نیچے کیسے کام کرتا ہے)، اور درخواست کے لیے منتخب کیا گیا کوئی بھی ان پٹ کمپریشن موڈ اب بھی اس باڈی پر چلتا ہے جس میں اب بلاک ہوتا ہے۔ مشترکہ حدود کی شق سے پہلے جس کے ساتھ ہر سطح ختم ہوتی ہے، انگریزی `full` لیول پڑھتا ہے:

> "سمارٹ کیو مین کی طرح سخت جواب دیں۔ آرٹیکلز (a/an/the) ، فلر (just/really/basically/actually/simply) ، pleasantries ، ہیجنگ۔ ٹکڑے OK. مختصر مترادفات (بڑا نہیں وسیع ، درست نہیں کرنا)۔ تمام تکنیکی مواد، کوڈ، غلطیاں، URLs, identifier کو رکھیں۔"

یہ خاص طور پر اچھی طرح سے کام کرتا ہے:

- کوڈ جنریشن (ٹرسر آؤٹ پٹ = کم ٹوکن)
- فوری سوال و جواب (تفصیلات کی ضرورت نہیں)
- بیچ پروسیسنگ (زیادہ سے زیادہ تھرو پٹ)

#### کب استعمال کرنا ہے۔

کیو مین آؤٹ پٹ موڈ ہے۔** آپٹ ان** . کمپریشن آن کرنے کے ساتھ (`enabled: true`، کمپریشن سیٹنگز کے صفحے پر ماسٹر ٹوگل)، اسے `cavemanOutputMode.enabled` کے ساتھ آن کریں۔ `intensity` چنتا ہے `lite`، `full` یا `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

ایک کمپریشن کومبو** آؤٹ پٹ موڈ** ٹوگل (`outputMode`, `outputModeIntensity` میں لیول ) ان درخواستوں کے لیے وہی سوئچ سیٹ کرتا ہے جن پر کومبو لاگو ہوتا ہے، اور `omniroute_set_compression_engine` MCP ٹول اسے اپنے بولین `outputMode` دلیل کے ذریعے لکھتا ہے۔ ایک غیر خالی `outputStyles` انتخاب کو اس سوئچ پر فوقیت حاصل ہے۔ ڈیش بورڈ میں، فعال کرنا** مختصر نثر** آؤٹ پٹ اسٹائل ایک ہی بلاک کو انجیکشن دیتا ہے (نیچے آؤٹ پٹ اسٹائلز دیکھیں)۔

### آؤٹ پٹ اسٹائلز (کیٹلاگ)

اوپر کیو مین آؤٹ پٹ موڈ ہے۔** میراثی واحد طرز کا راستہ** . فیز 4 نے اسے کمپوز ایبل آؤٹ پٹ اسٹائل کے کیٹلاگ میں عام کیا: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`۔ ہر طرز ایک نظام کی فوری ہدایت ہے جو خود ماڈل سے سستی پیداوار مانگتی ہے۔ شیلیوں کو ایک ساتھ فعال کیا جا سکتا ہے اور کیٹلاگ ترتیب میں انجکشن کیا جاتا ہے.

| انداز                          | `id`            | یہ کیا کرتا ہے                                                                                                                                                                                                                                       | ہدایات کی زبانیں۔                             |
| ------------------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| مختصر نثر                      | `terse-prose`   | filler/articles/hedging چھوڑ دو تکنیکی مادہ کو درست رکھیں۔ لیگیسی کیو مین آؤٹ پٹ موڈ جیسا متن (حوالہ دیا گیا، دوبارہ ٹائپ نہیں کیا گیا)۔                                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| کم کوڈ                         | `less-code`     | YAGNI سیڑھی: کام کرنے والی سب سے چھوٹی تبدیلی، کوئی غیر درخواست شدہ تجرید نہیں۔                                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| پونی ٹیل (سست سینئر دیو)       | `ponytail`      | "بہترین کوڈ وہ کوڈ ہے جو کبھی نہیں لکھا جاتا ہے": دوبارہ استعمال > دوبارہ لکھنا، بنیادی وجہ > علامت، مختصر ترین کام کرنے والا فرق۔                                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| میرے پاس ADHD ہے (ایکشن-پہلے)  | `i-have-adhd`   | ایکشن پہلے ( نثر سے پہلے command/path/snippet )، نمبر والے پابند مراحل، ONE کنکریٹ اگلا مرحلہ، کوئی preamble/recap/closers. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) سے موافق نہیں ہے۔                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| اینٹی سلپ UI فلٹر              | `antislop-ui`   | ہر بصری تکنیک کے لیے ایک مقصدی امتحان پاس کرنا ضروری ہے (تنظیم، شناخت، پڑھنے کی اہلیت)؛ کوئی ڈیفالٹ gradients/glass/glow، کیپڈ پیلیٹ، کوئی ٹیمپلیٹ لے آؤٹ نہیں۔ دونوں اینٹی سلپ اسٹائل میں کوئی ڈیڈ کنٹرولز / بغیر من گھڑت دعووں کی حد شامل ہوتی ہے۔ | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| اینٹی سلپ کاپی اور انسانی فلٹر | `antislop-copy` | مخصوص کاپی (no em dash، generic CTAs، buzzwords، chatbot closers، invented facts) نیز لوگوں کے اصول: WCAG AA کنٹراسٹ، مرئی فوکس، کی بورڈ ریچ، empty/loading/error اسٹیٹس، موبائل ری فلو۔                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)               | `terse-cjk`     | کلاسیکی چینی میں `full`/`ultra` جواب (文言)؛ `lite` صرف فنکشن کے الفاظ، خوشیوں یا زیبائش کے بغیر مختصر جوابات مانگتا ہے۔                                                                                                                             | zh (مقامی گیٹڈ، نیچے دیکھیں)                  |

ہر سٹائل تین شدت کی سطحیں — `lite`، `full`، `ultra` — بھیجتا ہے اور ہر سطح کا اختتام مشترکہ حدود کی شق ( `outputMode.ts` میں `SHARED_BOUNDARIES` ) کے ساتھ ہوتا ہے، جو کوڈ بلاکس، فائل پاتھ، کمانڈز، ایررز اور URLs کو درست رکھتا ہے۔ `terse-prose` اور `terse-cjk` سطح کے متن اس فہرست میں شناخت کنندگان کو شامل کرتے ہیں۔

`terse-cjk` دو جگہوں پر `zh` کو لوکل گیٹڈ ہے۔ کمپریشن سیٹنگز کا صفحہ اپنی قطار کو صرف اس وقت درج کرتا ہے جب ڈیش بورڈ UI زبان چینی ہو (`zh-CN` یا `zh-TW`)، اور `applyOutputStyles()` اسے صرف اس صورت میں داخل کرتا ہے جب درخواست کی حل شدہ زبان (نیچے زبان کا انتخاب دیکھیں) `zh` ہو۔ قطار کو چھپانے سے محفوظ کردہ `terse-cjk` انتخاب صاف نہیں ہوتا ہے: ترتیبات API کسی بھی اسٹائل آئی ڈی کو قبول کرتی ہے، اور صفحہ پر دیگر اسٹائلز کو محفوظ کرنا اسے برقرار رکھتا ہے۔ درخواست کے وقت، `applyOutputStyles()` زبان کی جانچ واحد لوکل گیٹ ہے۔

#### انجیکشن کیسے کام کرتا ہے۔

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) کیٹلاگ کے خلاف انتخاب کو حل کرتا ہے (نامعلوم آئی ڈیز اور لوکل سے مماثل طرزیں چھوڑ دی جاتی ہیں، کبھی کوئی غلطی نہیں ہوتی؛ ایک انتخاب جو کسی بھی طرز کو حل کرتا ہے وہ باڈی کو تبدیل نہیں کرتا، `no_styles` کے طور پر چھوڑا جاتا ہے)، منتخب ہدایات کو کیٹلاگ ترتیب میں جوڑتا ہے، حدود کی شق کو شامل کرتا ہے۔** ایک بار** (علاوہ حفاظتی شق، `SAFETY_BOUNDARIES` یا اس کا ترجمہ، جب `less-code` یا `ponytail` انتخاب کیا جاتا ہے)، اور بلاک کو ایک واحد آئیڈیمپوٹینسی مارکر (`[OmniRoute Output Styles]`) سے شروع کرتا ہے، اس لیے دوبارہ درخواست دینا ایک نہیں ہے۔ جب حل شدہ زبان (نیچے زبان کا انتخاب دیکھیں) کا ترجمہ ہوتا ہے، تو انگریزی کی بجائے مقامی ہدایات کو انجکشن کیا جاتا ہے۔

غیر خالی `messages` صف والی باڈی پر، آئیڈیمپوٹینسی چیک مواد کو بائی پاس کرنے سے پہلے چلتا ہے: جب `[OmniRoute Output Styles]` مارکر پہلے سے ہی ٹاپ لیول `system` فیلڈ (ایک سٹرنگ یا کنٹینٹ-بلاک اری) یا سٹرنگ مواد والے سسٹم میسج میں ہوتا ہے، باڈی کو `already_applied` کے طور پر کوئی تبدیلی نہیں کی جاتی ہے اور کوئی کلیدی لفظ چیک نہیں چلتا ہے۔ بصورت دیگر مواد کا بائی پاس (`shouldBypassCavemanOutputMode()` in `open-sse/services/compression/outputMode.ts`) آخری تین پیغامات کے متن کو چیک کرتا ہے، خواہ ان کا کوئی بھی کردار ہو، اور جب وہ متن اس کی سیکیورٹی، ناقابل واپسی کارروائی یا وضاحتی کلیدی الفاظ، یا ترتیب کے لحاظ سے حساس ترتیب `deploy` میل کھاتا ہے تو پورے موڑ کے لیے اسلوب کو چھوڑ دیتا ہے: `first`, `then`, `after that` `before` followed 240 حروف کے اندر بذریعہ `delete`، `drop`، `migrate`، `rollback` یا `backup` `release` بائی پاس چلتا ہے جبکہ** آٹو کلیرٹی بائی پاس** ٹوگل (`cavemanOutputMode.autoClarity`، آن ڈیفالٹ) آن ہے؛ ٹوگل کو آف کرنے سے مطلوبہ الفاظ کی جانچ پڑتال ہو جاتی ہے۔

جب بائی پاس سے گزرنے دیتا ہے، `placeSystemInstruction()` (وہی فائل)، جو کبھی بھی نیا `messages[0]` نہیں بناتا، بلاک کو ان میں سے پہلے میں رکھتا ہے:

1. سٹرنگ مواد کے ساتھ ایک اہم سسٹم پیغام: بلاک کو اس کے متن کے بعد جوڑا جاتا ہے۔
2. ٹاپ لیول `system` فیلڈ: بلاک کو سٹرنگ کے ٹیکسٹ کے بعد جوڑ دیا جاتا ہے، یا مواد بلاک کی صف میں نئے ٹیکسٹ بلاک کے طور پر شامل کیا جاتا ہے۔
3. سٹرنگ مواد کے ساتھ پہلا بعد کا سسٹم پیغام: بلاک کو اس کے متن کے بعد جوڑا جاتا ہے۔
4. مندرجہ بالا میں سے کوئی بھی نہیں: بلاک `messages` کے آخر میں ایک نئے سسٹم میسج میں جاتا ہے۔

`messages` صف کے بغیر کسی باڈی پر (یا خالی کے ساتھ)، کوئی مواد بائی پاس نہیں چلتا ہے اور ٹاپ لیول `system` فیلڈ سے مشورہ نہیں کیا جاتا ہے۔ بلاک کو سٹرنگ `instructions` فیلڈ کے ٹیکسٹ کے بعد جوڑ دیا جاتا ہے، جب تک کہ اس فیلڈ میں پہلے سے ہی `[OmniRoute Output Styles]` مارکر موجود نہ ہو، اس صورت میں باڈی کو `already_applied` کے طور پر کوئی تبدیلی نہیں کی جاتی ہے۔ جب باڈی میں کوئی سٹرنگ `instructions` فیلڈ نہیں ہوتی ہے لیکن اس میں `input` (ایک سٹرنگ یا ایک صف) ہوتی ہے، تو بلاک بن جاتا ہے `instructions`، کسی بھی غیر سٹرنگ ویلیو کی جگہ لے لیتا ہے جو اس فیلڈ میں ہے۔ ایک باڈی جس میں نہ تو سٹرنگ `instructions` فیلڈ ہے اور نہ ہی سٹرنگ یا ارے `input` کوئی تبدیلی نہیں کی جاتی ہے اور اسے `no_messages` کے طور پر چھوڑ دیا جاتا ہے۔

#### چالو کرنے کا طریقہ

ڈیش بورڈ میں:** کمپریشن سیاق و → کمپریشن کی ترتیبات** (`/dashboard/context/settings`)، آؤٹ پٹ اسٹائلز سیکشن: on/off ٹوگل اور لیول سلیکٹر کے ساتھ فی اسٹائل ایک قطار۔ اسٹائل انجیکشن لگاتے ہیں جب کمپریشن خود آن ہوتا ہے (صفحہ کا ماسٹر ٹوگل، `enabled`)۔ دی** آٹو کلیرٹی بائی پاس** ٹوگل پر ہے** غار والا** صفحہ (`/dashboard/context/caveman`)، اس میں** آؤٹ پٹ موڈ** کارڈ پروگرام کے لحاظ سے، کمپریشن کنفیگ اس طرح کے انتخاب کو برقرار رکھتا ہے:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

بیک کمپیٹ: جب کہ `outputStyles` خالی ہے، لیگیسی `cavemanOutputMode.enabled` سیٹنگ کے نقشے کو `cavemanOutputMode.intensity` پر `terse-prose` ہے۔ بلاک پھر `[OmniRoute Output Styles]` مارکر سے شروع ہوتا ہے، جہاں لیگیسی `applyCavemanOutputMode()` انجیکٹر نے `[OmniRoute Caveman Output Mode]` لکھا تھا۔ مارکر کے نیچے، متن en,pt-BR, es, de, fr, it, ru, id اور vi میں لیگیسی انجیکشن سے میل کھاتا ہے۔ ja اور zh میں یہ حدود کی شق سے پہلے ایک اضافی جگہ رکھتا ہے۔ `terse-prose` کا ترجمہ pt-BR, es, de, fr, it, ru, zh, ja, id اور vi میں ہوتا ہے، لہذا ایک درخواست جس کی حل شدہ زبان `hu` ہے انگریزی متن حاصل کرتا ہے جہاں لیگیسی انجیکٹر نے اپنا ہنگریئن استعمال کیا تھا۔

Output-style language selection (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): with `languageConfig.enabled` on, `autoDetect` samples the latest user message in the request's `messages` array that has text (string content, or the `text` of its content parts) and runs the Caveman engine's detector (`detectCompressionLanguage()`) on it. The detector returns `zh` for text with Han characters and no kana; otherwise it returns whichever of `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` and `id` has the most hint matches, and `en` when none match — text it cannot classify gets English, never `defaultLanguage`, and `vi` is never detected although the styles ship `vi` text. A Responses API body keeps its turns in `input`, which is not sampled, so it gets `defaultLanguage`, then English. When no user message in `messages` has text, or with `autoDetect` off, `defaultLanguage` applies, then English. With `languageConfig.enabled` off, the language is English — unless a compression combo applies to the request (a combo assigned to the request's routing combo, or the default compression combo chatCore falls back to for the built-in stacked pipeline): applying a combo turns `languageConfig.enabled` on for that request and sets `defaultLanguage` from the combo's language packs (the saved value if it is one of the combo's packs, otherwise the combo's first pack, which defaults to `en`), while the saved `autoDetect` (on by default) still applies. The Caveman input engine picks its rule-pack language differently — per text part and, with auto-detect off, gated on `enabledPacks`.

اسٹائل × لینگویج میٹرکس `tests/unit/compression/output-styles-i18n-matrix.test.ts` کے ذریعہ پن کیا جاتا ہے: ہر کیٹلاگ اسٹائل کو ٹیسٹ کے `BASELINE_LANGUAGES` میں اندراج کی ضرورت ہوتی ہے۔ ایک طرز جو لوکل گیٹڈ نہیں ہے اسے pt-BR ترجمہ بھیجنا چاہیے (locale-gated `terse-cjk` اس اصول سے مستثنیٰ ہے) جب تک کہ یہ `KNOWN_ENGLISH_ONLY` میں درج نہ ہو، جس میں صرف — کے بغیر ترجمہ کے ایسے اسٹائل ہو سکتے ہیں جس کا کوئی بھی ترجمہ ٹیسٹ میں ناکام ہوجاتا ہے۔ اور سٹائل ٹیسٹ میں ناکام ہو جاتا ہے جب وہ ایسی زبان کھو دیتا ہے جو اس کے `BASELINE_LANGUAGES` اندراج کی فہرست میں درج ہے۔ ایک انداز شامل کرنے کے لیے، [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) دیکھیں۔

### ٹول رزلٹ کمپریشن

`open-sse/services/compression/toolResultCompressor.ts` میں `compressToolResult()` ٹول نتیجہ کے متن کو اس کے ساتھ کمپریس کرتا ہے۔** 5 حکمت عملی** . یہ انہیں اس ترتیب میں آزماتا ہے، اور پہلی فعال حکمت عملی جس کا چیک مواد سے میل کھاتا ہے نتیجہ کا فیصلہ کرتا ہے:

1. **`fileContent`** : 3 یا اس سے زیادہ لائنوں کا مواد جس میں کم از کم ایک لائن، معروف حاشیہ کو نظر انداز کرتے ہوئے، `import `، `export `، `function `، `class `، `const `، `let `، `var ` یا `return ` (کلیدی لفظ جمع ایک جگہ) سے شروع ہوتی ہے، یا `if`، `for` یا اس کی پیروی کرتے ہوئے `(` ، ` (` یا `while` کی پیروی کریں۔ پہلی 20 اور آخری 5 لائنیں، جس میں ایلیڈڈ درمیانی نشان لگا ہوا ہے۔
2. **`grepSearch`** : `<path>:<digits>:` فارم کی کم از کم ایک لائن والا مواد، جہاں پہلی بڑی آنت سے پہلے کے متن میں کوئی وائٹ اسپیس نہیں ہے، صرف ان لائنوں کو رکھتا ہے، زیادہ سے زیادہ 30، اس کے بعد مزید میچوں کی گنتی اور مماثل فائلوں کی فہرست؛ ہر دوسری لائن گرا دی گئی ہے۔ حکمت عملی کو متحرک کرنے کے لیے ایسی ہی ایک لائن کافی ہے، اس لیے ٹائم اسٹیمپ جیسے `12:30:45` سے شروع ہونے والی لاگ لائن بھی شمار ہوتی ہے۔
3. **`shellOutput`** : آؤٹ پٹ جس میں ANSI CSI تسلسل ہوتا ہے (`ESC[` پھر ہندسے یا سیمکولنز پھر ایک حرف، جیسا کہ کلر کوڈز میں ہوتا ہے) یا `$` اس کے بعد متن میں کہیں بھی وائٹ اسپیس ہوتا ہے وہ ان ترتیبوں کو کھو دیتا ہے (دیگر فرار، جیسے `ESC[?25l` یا OSC ونڈو ٹائٹل کی ترتیب اور کٹوتی کی ترتیب 5 کو دہرایا جاتا ہے) لائنیں گر گئیں. `$` یہ چیک `json` اور `errorMessage` `shellOutput` پہلے چلتا ہے JSON
4. **`json`** : 2,000 حروف سے زیادہ JSON پے لوڈ جو `{` یا `[` (اختیاری وائٹ اسپیس کے بعد) سے شروع ہوتا ہے اور تجزیہ کا خلاصہ کیا جاتا ہے: 7 سے زیادہ آئٹمز کی ایک صف اپنی پہلی 5 اور آخری 2 آئٹمز اور اس کی کل گنتی رکھتی ہے، اور ایک آبجیکٹ اپنی پہلی 20 کلیدوں کو رکھتا ہے، ہر نیسٹڈ آبجیکٹ یا سرنی کی جگہ `{…N keys}` کے لیے ایک قدر کی جگہ ہوتی ہے۔ لمبائی) اور ایک `_remaining_<N>_keys` مارکر پہلے 20 سے آگے نکل کر چابیاں گنتا ہے۔ اسکیلر ویلیوز پوری طرح کاپی ہو جاتی ہیں، اس لیے 20 کلیدوں یا اس سے کم کا کوئی شے جس میں کوئی نیسٹڈ ویلیوز نہیں ہوتی ہے صرف — دوبارہ انڈینٹ کیا جاتا ہے اور ایک چھوٹے سے حروف حاصل ہوتے ہیں اور کوئی تبدیلی نہیں ہوتی ہے۔
5. **`errorMessage`** : آؤٹ پٹ جس میں کہیں بھی اور کسی بھی حرف کی صورت میں، `error:`، `error ` (اسپیس کے بعد لفظ، جیسا کہ `no error found` میں ہوتا ہے)، `[error]`، `exception:`، `exception `، `[exception]` یا `traceback` اپنی پہلی لائن، اگلی 10 لائنیں اور آخری 3، ان کے درمیان `… [N frames elided] …` مارکر کی جگہ رکھتا ہے۔ مارکر صرف اس وقت ظاہر ہوتا ہے جب 13 سے زیادہ لائنیں پہلی لائن کی پیروی کرتی ہیں، لہذا 14 لائنوں یا اس سے کم کی خرابی کی پیداوار کو چھوٹا نہیں کیا جاتا ہے (12 یا 13 لائنوں پر آخری 3 ریپیٹ لائنیں پہلے ہی رکھی ہوئی ہیں)۔

حکمت عملی کے میچ کے بعد، یہاں تک کہ ایک جو کچھ بھی نہیں بچاتا، بعد کی حکمت عملیوں کو آزمایا نہیں جاتا ہے۔ جب مماثلت کی حکمت عملی کوئی تخمینہ شدہ ٹوکن محفوظ نہیں کرتی ہے (لمبائی ÷ 4، راؤنڈ اپ) — مثال کے طور پر 25 لائنوں یا اس سے کم کی کوڈ جیسی فائل، یا 7 آئٹمز یا اس سے کم — کے ساتھ 2,000 حروف سے زیادہ کا JSON سرنی، جارحانہ انجن اصل ٹول کا نتیجہ برقرار رکھتا ہے: جب کال کرنے والے اور `compressAggressive()` ( `compressAnthropicToolResultBlock()`) دونوں کو `saved` ۔ یا نیچے، جبکہ `compressToolResult()` خود اب بھی اس حکمت عملی کا آؤٹ پٹ واپس کرتا ہے۔ ٹول نتیجہ مرحلہ آخری لفظ نہیں ہے: انجن کا فال بیک سمریزر اب بھی `tool` یا `function` پیغام کو 8,192 حروف سے چھوٹا کر سکتا ہے (`maxTokensPerMessage`, 2,048, times 4)۔

#### کب استعمال کرنا ہے۔

ٹول رزلٹ کمپریشن ایگریسو انجن کا مرحلہ 1 ہے (`compressAggressive()` in `open-sse/services/compression/aggressive.ts`)، اس لیے یہ ایگریسو موڈ میں اور اسٹیک شدہ پائپ لائن کے `aggressive` قدم میں چلتا ہے۔ یہ OpenAI-shape `tool` اور `function` پیغامات اور Anthropic `tool_result` بلاکس کے اندر موجود متن کو کمپریس کرتا ہے۔ `aggressive.toolStrategies` کے تحت ہر حکمت عملی کا اپنا سوئچ ہوتا ہے، یہ سب بذریعہ ڈیفالٹ آن ہوتا ہے۔ ڈیش بورڈ میں، سوئچز Caveman صفحہ میں ہیں۔** اعلی درجے کی** کمپریشن آن ہونے کے دوران دیکھیں اور ڈیفالٹ موڈ جارحانہ ہے۔

### اسٹیک شدہ پائپ لائن

اسٹیکڈ موڈ چلتا ہے۔** ترتیب میں متعدد انجن** — عام طور پر پہلے RTK (ٹول آؤٹ پٹ پر 60-90% بچت)، پھر باقی متن پر Caveman (~ 46% ان پٹ بچت)۔ پر مشتمل، یہ ہے** 78-95% اہل حد** (اوپر اپ اسٹریم بچت ریاضی دیکھیں): `1 - (1 - 0.60..0.90) × (1 - 0.46)` اوسط ≈ 89%۔

#### یہ کیسے کام کرتا ہے۔

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### کب استعمال کرنا ہے۔

اسٹیکڈ موڈ کا استعمال کریں:

- ٹول ہیوی ورک فلوز (ایجنٹک کوڈنگ، تحقیق)
- لاگت کے لحاظ سے حساس بیچ پروسیسنگ
- جب آپ کو ٹوکن کی زیادہ سے زیادہ بچت کی ضرورت ہو۔

اسٹیک شدہ پائپ لائنوں کو عالمی `stackedPipeline` کمپریشن سیٹنگ کے ذریعے ترتیب دیا جاتا ہے، یا کسی روٹنگ کومبو کو تفویض کردہ ایک نامزد کمپریشن کومبو کے ذریعے (اوپر پر کامبو اوور رائیڈ دیکھیں) — آٹو کومبو `modePack` کے ذریعے نہیں (وہ فیلڈ صرف آٹو کومبو ماڈل کے انتخاب کو دوبارہ وزن دیتی ہے، اور `stacked` ایک درست pack نام نہیں ہے)۔

---

## کمپریشن کومبو اوور رائیڈز

آپ مختلف استعمالات کے لیے رویّے کو باریک بینی سے ایڈجسٹ کرنے کی خاطر عالمی کمپریشن موڈ کو **ہر کومبو کے لیے** اوور رائیڈ کر سکتے ہیں:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

یہ درج ذیل صورتوں میں مفید ہے:

- **کوڈنگ کومبوز**: طویل سیشنز کے لیے `aggressive` موڈ استعمال کریں
- **فوری سوال و جواب کے کومبوز**: تیز جوابات کے لیے `lite` موڈ استعمال کریں
- **ٹول پر زیادہ انحصار کرنے والے کومبوز**: زیادہ سے زیادہ بچت کے لیے `stacked` موڈ استعمال کریں
- **پروڈکشن کومبوز**: کیشنگ فراہم کنندگان کے لیے اوور رائیڈ بند رکھیں — ہمیشہ فعال
  کیش سے آگاہ ایڈجسٹمنٹ خودکار طور پر `aggressive`/`ultra` کو `standard` پر ڈاؤن گریڈ کر دیتی ہے
  (`cache-aware` موڈ قابلِ انتخاب نہیں ہے)

---

## مزید دیکھیں

- [انوائرنمنٹ کنفیگ](../reference/ENVIRONMENT.md) — کمپریشن کے انوائرنمنٹ ویری ایبلز
- [آرکیٹیکچر گائیڈ](../architecture/ARCHITECTURE.md) — کمپریشن پائپ لائن کی اندرونی تفصیلات
- [صارف گائیڈ](../guides/USER_GUIDE.md) — کمپریشن کے ساتھ شروعات
- [RTK کمپریشن](./RTK_COMPRESSION.md) — RTK فلٹرز، اعتماد کا ماڈل، تصدیقی گیٹ، خام آؤٹ پٹ کی بازیابی
- [کمپریشن انجنز](./COMPRESSION_ENGINES.md) — Caveman، RTK، stacked، APIs، MCP، ڈیش بورڈ
- [کمپریشن رولز فارمیٹ](./COMPRESSION_RULES_FORMAT.md) — JSON رول پیک فارمیٹ
- [کمپریشن لینگویج پیکس](./COMPRESSION_LANGUAGE_PACKS.md) — زبان سے مخصوص Caveman قواعد
