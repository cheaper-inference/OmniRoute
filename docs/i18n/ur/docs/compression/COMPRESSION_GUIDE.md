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

کوئی کمپریشن لاگو نہیں ہوتی۔ تمام پیغامات بغیر کسی تبدیلی کے جوں کے توں گزرتے ہیں۔

### لائٹ موڈ (~15% بچت، <1ms تاخیر)

سب سے محفوظ موڈ — معنی میں صفر تبدیلی، صرف فارمیٹنگ کی صفائی:

| تکنیک                    | تفصیل                                                        |
| ------------------------ | ------------------------------------------------------------ |
| `collapseWhitespace`     | مسلسل خالی سطروں اور سطر کے آخر کی خالی جگہوں کو ملا دیتا ہے |
| `dedupSystemPrompt`      | نقل شدہ (duplicate) سسٹم پیغامات کو ہٹا دیتا ہے              |
| `compressToolResults`    | طویل اور کثیرالکلام ٹول/فنکشن آؤٹ پٹس کو کمپریس کرتا ہے      |
| `removeRedundantContent` | دہرائی گئی ہدایات کو ختم کرتا ہے                             |
| `replaceImageUrls`       | base64 امیج ڈیٹا URI کو مختصر کرتا ہے                        |

**بہترین برائے:** ہمہ وقت چالو استعمال، حفاظت کے لحاظ سے حساس ورک فلوز۔

### اسٹینڈرڈ موڈ (~30% بچت)

[Caveman](https://github.com/JuliusBrussee/caveman) سے متاثر — معنی کو برقرار رکھتے ہوئے فاضل الفاظ اور طویل عبارتیں ہٹاتا ہے:

- فاضل الفاظ ہٹاتا ہے ("please"، "I think"، "basically"، "actually")
- طویل فقروں کو گاڑھا کرتا ہے ("in order to" → "to"، "as a result of" → "because")
- شائستہ ہچکچاہٹ ختم کرتا ہے ("Would you mind..."، "If you could possibly...")
- کوڈنگ پرامپٹس کے لیے ٹیون کیے گئے 30+ regex اصول

**بہترین برائے:** روزمرہ کے کوڈنگ ورک فلوز، لاگت بچانے والی ٹیمیں۔

### ایگریسیو موڈ (~50% بچت)

طویل سیشنز کے لیے ذہین ہسٹری مینجمنٹ:

- **میسج ایجنگ** — پرانے پیغامات بتدریج مزید کمپریس کیے جاتے ہیں
- **ٹول رزلٹ کمپریشن** — طویل ٹول آؤٹ پٹس کاٹ دیئے یا حذف کر دیئے جاتے ہیں (پہلی/آخری سطریں،
  مماثل سطروں کی فلٹرنگ، JSON کلیدوں کی تکثیف)
- **ساختی سالمیت کے محافظ** — یقینی بناتا ہے کہ `tool_use` + `tool_result` کے جوڑے متسق رہیں
- **کانٹیکسٹ ونڈو کی آگاہی** — فی ماڈل ٹوکن حدود کا احترام کرتا ہے

**بہترین برائے:** طویل ڈیبگنگ سیشنز، بڑے کوڈ بیسز۔

### الٹرا موڈ (~75% بچت)

ٹوکن کے لحاظ سے حساس منظرناموں کے لیے زیادہ سے زیادہ کمپریشن:

- **ہیورسٹک پروننگ** — نثر کے ٹوکنز کی اسکور پر مبنی چھٹائی
- **ساخت کی حفاظت** — fenced کوڈ بلاکس، اِن لائن کوڈ، URLs اور identifiers کو tombstone کیا
  جاتا ہے اور حرف بہ حرف دوبارہ جوڑا جاتا ہے، کبھی prune نہیں کیا جاتا
- **اختیاری SLM درجہ** — کنفیگر کیے جانے پر ایک چھوٹا مقامی ماڈل چھٹائی کو مزید نکھار سکتا ہے
- ایگریسیو موڈ سے آزاد: یہ میسج ایجنگ، ٹول رزلٹ کمپریشن یا فال بیک خلاصہ ساز نہیں چلاتا
  (صرف SLM درجے کی ناکامی ہی کسی فال بیک پاس کو aggressive کے ذریعے بھیج سکتی ہے)

**بہترین برائے:** جب آپ بار بار کانٹیکسٹ کی حدود سے ٹکرا رہے ہوں۔

### RTK موڈ (60-90% upstream رینج)

RTK موڈ کوڈنگ ایجنٹ سیشنز میں آنے والے کثیرالکلام ٹول آؤٹ پٹس کے لیے بہتر بنایا گیا ہے:

- کمانڈ/آؤٹ پٹ کلاسز کی شناخت کرتا ہے جیسے `git status`، `git diff`، `git log`، ٹیسٹ رنرز،
  TypeScript/Vite/Webpack بلڈز، ESLint/Biome/Prettier، npm audit/انسٹالز، Docker لاگز، انفراسٹرکچر
  آؤٹ پٹ، اور عمومی شیل آؤٹ پٹ
- `open-sse/services/compression/engines/rtk/filters/` سے JSON فلٹر پیکس لاگو کرتا ہے
- پروجیکٹ یا گلوبل `filters.toml` فائلوں سے RTK TOML schema v1 فلٹرز درآمد کرتا ہے، اِن لائن ٹیسٹ
  کی توثیق اور پروجیکٹ فائلوں کے لیے ٹرسٹ گیٹنگ کے ساتھ
- اِن لائن تصدیقی نمونوں کے ساتھ 56 بلٹ اِن فلٹرز فراہم کرتا ہے
- ANSI کنٹرول سیکوینسز، پروگریس بارز، دہرائی گئی سطریں اور غیر قابلِ عمل شور ہٹاتا ہے
- ناکامیاں، خرابیاں، انتباہات، تبدیل شدہ فائلیں، خلاصے اور طویل آؤٹ پٹ کا آخری حصہ محفوظ رکھتا ہے
- ٹرسٹ گیٹڈ پروجیکٹ فلٹرز، گلوبل فلٹرز اور اختیاری redacted خام آؤٹ پٹ کی بحالی کی سپورٹ کرتا ہے

**بہترین برائے:** شیل، بلڈ، ٹیسٹ، git، grep اور فائل آؤٹ پٹ ٹرانسکرپٹس والے ایجنٹ سیشنز۔

### اسٹیکڈ موڈ (78-95% اہل رینج)

اسٹیکڈ موڈ متعدد کمپریشن انجنوں کو ایک طے شدہ ترتیب میں چلاتا ہے۔ ڈیفالٹ پائپ لائن یہ ہے:

```txt
RTK -> Caveman
```

یہ ترتیب پہلے ٹرمینل/ٹول آؤٹ پٹ کو گاڑھا رکھتی ہے، پھر باقی قدرتی زبان کے پرامپٹ پر Caveman کی
معنوی تکثیف لاگو کرتی ہے۔ اسٹیکڈ پائپ لائنز کو گلوبل طور پر یا روٹنگ کومبوز کو تفویض کردہ
کمپریشن کومبوز کے ذریعے کنفیگر کیا جا سکتا ہے۔

**بہترین برائے:** بڑے ٹول لاگز کے ساتھ انسانی ہدایات یا اسسٹنٹ خلاصوں پر مشتمل ملاجلا کانٹیکسٹ۔

---

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

## کنفیگریشن

### ڈیش بورڈ

`ڈیش بورڈ → کانٹیکسٹ اور کیش` پر جائیں:

- **Caveman** — موڈ کا انتخاب، لینگویج پیکس، پیش منظر، اور عالمی ڈیفالٹس
- **RTK** — کمانڈ فلٹر کا پیش منظر، RTK حفاظتی ترتیبات، اور فلٹر کیٹلاگ
- **کمپریشن کومبوز** — روٹنگ کومبوز کو تفویض کردہ نام والے انجن پائپ لائنز
- **آٹو ٹریگر تھریش ہولڈ** — ٹوکنز کی تعداد تھریش ہولڈ سے تجاوز کرنے پر خودکار طور پر کمپریشن فعال کریں

### فی کومبو اوور رائیڈ

`ڈیش بورڈ → کانٹیکسٹ اور کیش → کمپریشن کومبوز` میں، کسی روٹنگ کومبو کو ایک کمپریشن کومبو تفویض کریں:

```txt
کومبو: "free-tier-fallback"
  کمپریشن کومبو: "coding-agent-stack"
  پائپ لائن: RTK -> Caveman
  اہداف:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

یہ آپ کو مفت/کوڈنگ فراہم کنندگان پر اسٹیکڈ کمپریشن استعمال کرنے کی سہولت دیتا ہے، جبکہ بامعاوضہ
سبسکرپشنز پر لائٹ موڈ برقرار رہتا ہے۔

یہ "فی کومبو اوور رائیڈ" تفویض، **روٹنگ کومبو کمپریشن موڈ** اوور رائیڈ
(Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — فیلڈ کا اسکیما
`rtk`، `stacked` اور `omniglyph` کو بھی قبول کرتا ہے) سے مختلف کنٹرول ہے — وہ اوور رائیڈ کسی نام والے
کمپریشن کومبو پائپ لائن کا انتخاب نہیں کرتا؛ وہ صرف `resolveCompressionPlan` کے زیرِ استعمال
`compressionMode` فیلڈ متعین کرتا ہے۔ اسے کومبو کارڈ (`ڈیش بورڈ → کومبوز`) پر، یا #6760 سے،
`ڈیش بورڈ → کانٹیکسٹ اور کیش → کمپریشن کومبوز` میں "روٹنگ کو تفویض کریں" کی فہرست کے اندر ہر روٹنگ کومبو کے لیے،
اوپر درج پائپ لائن تفویض کے چیک باکس کے عین ساتھ متعین کیا جا سکتا ہے۔ دونوں سطحیں ایک ہی
`PUT /api/combos/{id}` اینڈ پوائنٹ کے ذریعے برقرار رہتی ہیں۔

### فی درخواست اوور رائیڈ

کسی ایک درخواست کے لیے کمپریشن پلان کو اوور رائیڈ کرنے کی خاطر `x-omniroute-compression` درخواست ہیڈر
بھیجیں۔ اسے سب سے زیادہ ترجیح حاصل ہے — یہ روٹنگ کومبو اوور رائیڈ، فعال پروفائل،
آٹو ٹریگر، اور پینل ڈیفالٹ پر فوقیت رکھتا ہے۔ نامعلوم اقدار نظر انداز کر دی جاتی ہیں (درخواست کبھی مسترد نہیں کی جاتی)، اور
عالمی ماسٹر سوئچ بدستور ہر چیز کو کنٹرول کرتا ہے: جب کمپریشن عالمی سطح پر بند ہو تو ہیڈر اسے
فعال نہیں کر سکتا۔ اقدار:

| قدر           | اثر                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| `off`         | اس درخواست کے لیے کوئی کمپریشن نہیں۔                                                                         |
| `default`     | پینل سے اخذ کردہ ڈیفالٹ پروفائل (فعال پروفائل کو نظر انداز کرتا ہے)۔ لاسّی انجن بند رہتے ہیں۔                |
| `safe`        | ہیڈر حذف کرنے جیسا ہی: صرف ڈی ڈپلیکیشن اور وائٹ اسپیس فولڈنگ۔                                                |
| `allow-lossy` | اس درخواست کا آپریٹر پلان برقرار رکھیں، جس میں خلاصے، مطابقت کے فلٹرز، اور اسلوب کی باز تحریر شامل ہیں۔      |
| `engine:<id>` | فعال ہونے کی صورت میں ایک انجن، مثلاً `engine:rtk`۔ یہ اس انجن کے لیے فی درخواست آپٹ اِن ہے۔                 |
| `<combo>`     | ایک نام والا کومبو، جسے پہلے نام (حروف کی بڑی یا چھوٹی صورت سے قطع نظر)، پھر id کی بنیاد پر میچ کیا جاتا ہے۔ |

`allow-lossy`، `engine:<id>`، یا کسی نام والے کومبو کے بغیر، لاسّی انجنز لاگو نہیں کیے جاتے۔
کمپریشن فعال ہونے کی صورت میں درخواست پر پھر بھی سیشن ڈی ڈپلیکیشن اور وائٹ اسپیس فولڈنگ لاگو ہوتی ہے۔

لاگو شدہ پلان کو `X-OmniRoute-Compression: <mode>; source=<source>` رسپانس
ہیڈر میں واپس بھیجا جاتا ہے، جہاں `<source>`، `request-header`، `routing-override`، `active-profile`،
`auto-trigger`، `default`، یا `off` میں سے ایک ہوتا ہے۔

### API

```bash
# کمپریشن کی ترتیبات حاصل کریں
curl http://localhost:20128/api/settings/compression

# کمپریشن کی ترتیبات اپ ڈیٹ کریں
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# کسی مخصوص RTK/stacked پے لوڈ کا پیش منظر دیکھیں
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK فلٹر پیکس کی فہرست حاصل کریں
curl http://localhost:20128/api/context/rtk/filters

# اختیاری کمانڈ میٹا ڈیٹا کے ساتھ براہِ راست RTK ٹیسٹ کریں
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

## جدید کمپریشن سسٹمز

اوپر بیان کردہ 7 موڈز کے علاوہ (سورس `codex-responses` اور
`omniglyph` موڈز بھی قبول کرتا ہے، جن کا احاطہ یہ گائیڈ نہیں کرتی)، ذیل کے حصے ان خصوصیات
کا احاطہ کرتے ہیں جو ان موڈز کے اندر یا ان کے ساتھ کام کرتی ہیں: Tool Result Compression اور Progressive Aging
aggressive انجن کے مراحل 1 اور 2 ہیں (Aggressive موڈ اور stacked pipeline کا ایک `aggressive`
مرحلہ)، Stacked Pipeline وہ طریقہ ہے جس سے Stacked موڈ چلتا ہے، Cache-Aware Compression
کیشنگ فراہم کنندگان کے لیے `aggressive` اور `ultra` کو `standard` پر گھٹا دیتا ہے جب کمپریشن
فعال ہو، جبکہ Caveman Output Mode اور Output Styles اختیاری system-prompt ہدایات ہیں،
جو بطور ڈیفالٹ غیر فعال ہوتی ہیں اور درخواست کو کمپریس کرنے کے بجائے ماڈل کے آؤٹ پٹ کو تشکیل دیتی ہیں۔

### کیش سے آگاہ کمپریشن

کچھ فراہم کنندگان (جیسے prompt caching کے ساتھ Anthropic) **prompt caching** کی معاونت کرتے ہیں،
جو انہیں اخراجات اور تاخیر کم کرنے کے لیے پرامپٹ کے کچھ حصوں کو کیش کرنے کی سہولت دیتی ہے۔ جب
کیشنگ فعال ہو، تو aggressive کمپریشن درحقیقت کارکردگی کو **نقصان** پہنچا سکتی ہے
کیونکہ یہ کیش شدہ ٹوکنز کو تبدیل کر دیتی ہے، جس سے کیش غیر مؤثر ہو جاتا ہے۔

`cachingAware.ts` ماڈیول **کیشنگ سیاق کا پتہ لگا کر** اور
اسی کے مطابق **کمپریشن حکمتِ عملی کو ایڈجسٹ کر کے** یہ مسئلہ حل کرتا ہے۔

#### یہ کیسے کام کرتا ہے

1. **کیشنگ سیاق کا پتہ لگانا** — درخواست کی body میں `cache_control` مارکرز تلاش کرتا ہے
2. **کیشنگ فراہم کنندگان کی شناخت** — جانچتا ہے کہ آیا ہدف فراہم کنندہ کیشنگ کی معاونت کرتا ہے
3. **حکمتِ عملی کو ایڈجسٹ کرنا** — کیشنگ فراہم کنندگان کے لیے `aggressive`/`ultra` کو `standard` پر گھٹا دیتا ہے
4. **سسٹم پرامپٹ کو چھوڑنا** — سسٹم پرامپٹس عموماً کیش ہوتے ہیں، اس لیے انہیں کمپریس نہ کریں

حکمتِ عملی کا معاون ایک `deterministicOnly` فلیگ بھی واپس کرتا ہے، لیکن پلان بلڈر صرف
حکمتِ عملی استعمال کرتا ہے — فی الحال بعد کا کوئی مرحلہ اس فلیگ کو نہیں پڑھتا۔

#### کوڈ کی مثال

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← کیش مارکر
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### کب استعمال کریں

کیش سے آگاہ کمپریشن **ہمیشہ فعال** رہتی ہے — کسی کنفیگریشن کی ضرورت نہیں۔ جب بھی
کمپریشن فعال ہو اور ہدف فراہم کنندہ prompt caching کی معاونت کرتا ہو (Anthropic، OpenAI،
وغیرہ)، یہ عمل میں آ جاتی ہے؛ واضح `cache_control` مارکرز درکار نہیں ہوتے — صرف کیشنگ فراہم کنندہ
ہی تنزلی کو متحرک کر دیتا ہے، جبکہ صرف مارکرز کبھی ایسا نہیں کرتے (مارکر کی شناخت کیش
ٹیلی میٹری کو ڈیٹا فراہم کرتی ہے، حکمتِ عملی کے فیصلے کو نہیں)۔

### تدریجی ایجنگ

طویل گفتگوؤں میں پیغامات کے بہت سے ادوار جمع ہو جاتے ہیں، لیکن پرانے ادوار کی
اہمیت کم ہوتی جاتی ہے۔ `progressiveAging.ts` ماڈیول **ٹرن کے فاصلے کے لحاظ سے پیغامات کو مختصر کرتا ہے**
(فاصلہ گفتگو کے اختتام سے ناپا جاتا ہے)۔ فراہم کردہ ڈیفالٹس
(`verbatim: 2, light: 2, moderate: 3`) کے ساتھ:

- **آخری 2 ٹرنز (فاصلہ ≤ 2)**: من و عن برقرار رکھے جاتے ہیں
- **فاصلہ 3**: Caveman کمپریشن (اضافی الفاظ کا اخراج)
- **فاصلہ 4+**: Assistant پیغامات کا خلاصہ کیا جاتا ہے؛ user پیغامات کو ان کی پہلی
  سطر تک محدود کر دیا جاتا ہے، جس کی حد 120 حروف ہے؛ دیگر roles میں کوئی تبدیلی نہیں ہوتی۔ سسٹم پرامپٹس، پہلے سے aged
  پیغامات اور تازہ ترین user پیغام فاصلے سے قطع نظر ہمیشہ من و عن برقرار رکھے جاتے ہیں۔
  کسی چیز کو مکمل طور پر حذف نہیں کیا جاتا، اور فراہم کردہ ڈیفالٹس کے ساتھ `light`
  بینڈ تک پہنچنا ممکن نہیں (`light`، `verbatim` کے برابر ہے)۔

#### کوڈ کی مثال

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... مزید 50 ٹرنز ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // آخری 3 ٹرنز: من و عن
  light: 8, // فاصلہ <= 8: ہلکی کمپریشن
  moderate: 20, // فاصلہ <= 20: caveman کمپریشن
  fullSummary: 5, // type کے لیے درکار، banding کوڈ اسے نہیں پڑھتا
  // فاصلہ > 20: خلاصہ کیا جاتا ہے (assistant) / پہلی سطر برقرار رکھی جاتی ہے (user)
});

// saved = محفوظ کیے گئے ٹوکنز کی تعداد
```

#### کب استعمال کریں

Progressive aging، `aggressive` موڈ کے لیے **ہمیشہ فعال** ہوتی ہے — یہ
`compressAggressive()` کا مرحلہ 2 ہے۔ Ultra موڈ اسے نہیں چلاتا۔ یہ
خصوصاً درج ذیل کے لیے مؤثر ہے:

- طویل عرصے تک جاری رہنے والے کوڈنگ سیشنز
- کئی دنوں پر محیط گفتگوئیں
- بہت سی ٹول کالز والے ایجنٹک ورک فلو

### Caveman آؤٹ پٹ موڈ

Caveman آؤٹ پٹ موڈ **سسٹم پرامپٹ ہدایات** شامل کرتا ہے جو خود ماڈل سے
مختصر آؤٹ پٹ کی درخواست کرتی ہیں — `lite` لیول مکمل جملے برقرار رکھتے ہوئے مختصر جوابات مانگتا ہے، `full`
اسے "سمجھ دار غار کے انسان کی طرح مختصر جواب دینے" کو کہتا ہے، اور `ultra` ٹیلی گرافک آؤٹ پٹ مانگتا ہے؛
ہدایات صرف درخواست کرتی ہیں، وہ اس کی ضمانت نہیں دے سکتیں۔ درخواستوں کو یہ ہدایات
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) کے ذریعے ملتی ہیں:
`open-sse/handlers/chatCore.ts` پہلے back-compat shim
(`resolveOutputStyleSelection()` جو
`open-sse/services/compression/outputStyles/backCompat.ts` میں ہے) کے ذریعے انتخاب طے کرتا ہے، جو `outputStyles`
خالی ہونے کی صورت میں، فعال `cavemanOutputMode` کو
`cavemanOutputMode.intensity` پر `terse-prose` آؤٹ پٹ اسٹائل سے میپ کرتا ہے (ذیل میں Back-compat دیکھیں)؛ غیر خالی `outputStyles`
انتخاب کو جوں کا توں استعمال کیا جاتا ہے، اور پھر `cavemanOutputMode.enabled` اور `intensity` کا کوئی
اثر نہیں ہوتا، جبکہ اس کا `autoClarity` ٹوگل پھر بھی لاگو رہتا ہے۔ `outputMode.ts` میں
ہدایات کے متن (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`)، مواد کا بائی پاس اور
placement helper موجود ہیں جنہیں injection استعمال کرتا ہے؛ اس کے اپنے `applyCavemanOutputMode()` injector کا کوئی
production caller نہیں ہے۔

#### یہ کیسے کام کرتا ہے

یہ موڈ اِن پٹ کو کمپریس نہیں کرتا۔ یہ سسٹم پرامپٹ میں ایک ہدایتی بلاک شامل کرتا ہے
(ذیل میں انجیکشن کا طریقہ دیکھیں)، اور درخواست کے لیے منتخب کردہ کوئی بھی اِن پٹ کمپریشن موڈ
اس کے بعد بھی اس باڈی پر چلتا ہے جس میں اب یہ بلاک موجود ہوتا ہے۔ مشترکہ
حدود کی شق، جس پر ہر سطح ختم ہوتی ہے، سے پہلے انگریزی `full` سطح یوں ہے:

> "ہوشیار غار انسان کی طرح مختصر جواب دیں۔ حروفِ تعریف (a/an/the)، غیر ضروری الفاظ (just/really/basically/actually/simply)، رسمی کلمات اور تذبذب والے الفاظ حذف کریں۔ نامکمل جملے قابلِ قبول ہیں۔ مختصر مترادفات استعمال کریں (extensive نہیں، big؛ implement نہیں، fix)۔ تمام تکنیکی مواد، code، errors، URLs، identifiers بعینہٖ رکھیں۔"

یہ خصوصاً ان کاموں کے لیے مؤثر ہے:

- کوڈ جنریشن (مختصر آؤٹ پٹ = کم ٹوکنز)
- فوری سوال و جواب (تفصیلی وضاحتوں کی ضرورت نہیں)
- بیچ پروسیسنگ (تھروپٹ زیادہ سے زیادہ کریں)

#### کب استعمال کریں

Caveman آؤٹ پٹ موڈ **اختیاری** ہے۔ کمپریشن آن ہونے کی صورت میں (`enabled: true`، یعنی Compression Settings صفحے کا ماسٹر ٹوگل
آن ہو)، اسے `cavemanOutputMode.enabled` کے ذریعے آن کریں؛ `intensity`
سے `lite`، `full` یا `ultra` منتخب کیا جاتا ہے:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

کمپریشن کومبو کا **Output Mode** ٹوگل (`outputMode`، اور سطح `outputModeIntensity` میں)
ان درخواستوں کے لیے یہی سوئچ سیٹ کرتا ہے جن پر وہ کومبو لاگو ہوتا ہے، اور
`omniroute_set_compression_engine` MCP ٹول اپنے بولین `outputMode`
آرگیومنٹ کے ذریعے اسے لکھتا ہے۔ غیر خالی `outputStyles` انتخاب کو اس سوئچ پر ترجیح حاصل ہے۔ ڈیش بورڈ میں **Terse prose** آؤٹ پٹ اسٹائل فعال کرنے سے یہی بلاک انجیکٹ ہوتا ہے (ذیل میں Output
Styles دیکھیں)۔

### آؤٹ پٹ اسٹائلز (کیٹلاگ)

اوپر بیان کردہ Caveman آؤٹ پٹ موڈ **پرانا سنگل اسٹائل راستہ** ہے۔ Phase 4 نے اسے
قابلِ امتزاج آؤٹ پٹ اسٹائلز کے ایک کیٹلاگ میں عمومی بنا دیا: `OUTPUT_STYLE_CATALOG`، جو
`open-sse/services/compression/outputStyles/catalog.ts` میں ہے۔ ہر اسٹائل سسٹم پرامپٹ کی
ایک ہدایت ہے جو ماڈل سے خود کم لاگت والا آؤٹ پٹ طلب کرتی ہے؛ اسٹائلز کو ایک ساتھ فعال کیا جا سکتا ہے
اور انہیں کیٹلاگ کی ترتیب میں انجیکٹ کیا جاتا ہے۔

| اسٹائل                       | `id`            | اس کا کام                                                                                                                                                                                                                                            | ہدایات کی زبانیں                              |
| ---------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| مختصر نثر                    | `terse-prose`   | غیر ضروری الفاظ/حروفِ تعریف/تذبذب حذف کرتا ہے؛ تکنیکی مواد بعینہٖ رکھتا ہے۔ پرانے Caveman آؤٹ پٹ موڈ جیسا ہی متن (حوالہ دیا گیا ہے، دوبارہ تحریر نہیں کیا گیا)۔                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| کم کوڈ                       | `less-code`     | YAGNI درجہ بندی: سب سے چھوٹی کارآمد تبدیلی، بلاطلب تجریدات نہیں۔                                                                                                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (سست سینئر ڈویلپر)  | `ponytail`      | "بہترین کوڈ وہ ہے جو کبھی لکھا ہی نہ جائے": دوبارہ استعمال > ازسرِنو تحریر، بنیادی وجہ > علامت، مختصر ترین کارآمد diff۔                                                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| مجھے ADHD ہے (عمل پہلے)      | `i-have-adhd`   | عمل پہلے (نثر سے پہلے command/path/snippet)، نمبر شدہ محدود مراحل، ایک ٹھوس اگلا مرحلہ، کوئی تمہید/خلاصہ/اختتامی کلمات نہیں۔ [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) سے ماخوذ۔                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI فلٹر             | `antislop-ui`   | ہر بصری تکنیک کو مقصدی جانچ پر پورا اترنا چاہیے (درجہ بندی، شناخت، قابلِ مطالعہ ہونا)؛ ڈیفالٹ gradients/glass/glow نہیں، محدود پیلیٹ، ٹیمپلیٹ لے آؤٹس نہیں۔ دونوں antislop اسٹائلز بے کار کنٹرولز اور من گھڑت دعوؤں کی ممانعت والی حد شامل کرتے ہیں۔ | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop متن اور انسانی فلٹر | `antislop-copy` | مخصوص متن (کوئی em dash، عمومی CTAs، buzzwords، chatbot اختتامی کلمات یا من گھڑت حقائق نہیں) اور لوگوں سے متعلق اصول: WCAG AA کنٹراسٹ، نمایاں فوکس، کی بورڈ رسائی، خالی/لوڈنگ/خرابی کی حالتیں، موبائل ری فلو۔                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| مختصر CJK (文言)             | `terse-cjk`     | `full`/`ultra` جواب کلاسیکی چینی (文言) میں؛ `lite` صرف مختصر جوابات طلب کرتا ہے، فعلی الفاظ، رسمی کلمات یا آرائش کے بغیر۔                                                                                                                           | zh (لوکیل تک محدود، ذیل میں دیکھیں)           |

ہر اسٹائل کے ساتھ شدت کی تین سطحیں — `lite`، `full`، `ultra` — آتی ہیں، اور ہر سطح
مشترکہ حدود کی شق (`outputMode.ts` میں `SHARED_BOUNDARIES`) پر ختم ہوتی ہے، جو
code blocks، file paths، commands، errors اور URLs کو بعینہٖ رکھتی ہے۔ `terse-prose` اور
`terse-cjk` کی سطحوں کے متن اس فہرست میں identifiers بھی شامل کرتے ہیں۔

`terse-cjk` دو مقامات پر `zh` لوکیل تک محدود ہے۔ Compression Settings صفحہ
اس کی قطار صرف اس وقت دکھاتا ہے جب ڈیش بورڈ UI کی زبان چینی (`zh-CN` یا `zh-TW`) ہو، اور
`applyOutputStyles()` اسے صرف اس وقت انجیکٹ کرتا ہے جب درخواست کی طے شدہ زبان (ذیل میں Language
selection دیکھیں) `zh` ہو۔ قطار چھپانے سے محفوظ شدہ `terse-cjk` انتخاب صاف نہیں ہوتا:
settings API کسی بھی style id کو قبول کرتی ہے، اور صفحے پر دوسرے اسٹائلز محفوظ کرنے سے یہ برقرار رہتا ہے۔ درخواست
کے وقت، `applyOutputStyles()` کی زبان کی جانچ ہی واحد لوکیل گیٹ ہے۔

#### انجیکشن کیسے کام کرتا ہے

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) انتخاب کو
کیٹلاگ کے مطابق حل کرتا ہے (نامعلوم ids اور locale سے غیر مطابقت رکھنے والے styles کو
خارج کر دیا جاتا ہے، یہ کبھی error نہیں بنتے؛ ایسا انتخاب جو کسی style تک حل نہ ہو، body کو
بغیر تبدیلی کے چھوڑ دیتا ہے اور `no_styles` کے طور پر skip ہو جاتا ہے)، منتخب instructions کو
کیٹلاگ کی ترتیب میں یکجا کرتا ہے،
boundaries clause کو **ایک بار** شامل کرتا ہے (نیز safety clause، `SAFETY_BOUNDARIES` یا اس کا
ترجمہ، جب `less-code` یا `ponytail` منتخب ہو)، اور block کو ایک واحد
idempotency marker (`[OmniRoute Output Styles]`) سے شروع کرتا ہے، لہٰذا دوبارہ لاگو کرنا no-op
ہوتا ہے۔ جب حل شدہ زبان (ذیل میں Language selection دیکھیں) کا ترجمہ دستیاب ہو، تو انگریزی کے
بجائے localized instruction شامل کی جاتی ہے۔

ایسی body میں جس کی `messages` array خالی نہ ہو، idempotency check، content bypass سے پہلے
چلتا ہے: جب `[OmniRoute Output Styles]` marker پہلے ہی top-level
`system` field (ایک string یا content-block array) میں، یا string content والے کسی system
message میں موجود ہو، تو body کو `already_applied` کے طور پر بغیر تبدیلی کے چھوڑ دیا جاتا ہے
اور کوئی keyword check نہیں چلتا۔
بصورتِ دیگر، content bypass (`shouldBypassCavemanOutputMode()` جو
`open-sse/services/compression/outputMode.ts` میں ہے) آخری تین
messages کے متن کو، ان کے role سے قطع نظر، چیک کرتا ہے اور جب وہ متن security،
ناقابلِ واپسی action یا clarification keywords، یا ترتیب کے لحاظ سے حساس sequence سے match
کرے تو پورے turn کے لیے styles کو skip کر دیتا ہے: `first`، `then`، `after that`، `before`،
`rollback` یا `backup`، جن کے بعد 240 حروف کے اندر `delete`، `drop`، `migrate`، `deploy` یا
`release` آئے۔ bypass اس وقت چلتا ہے جب **Auto-Clarity Bypass** toggle
(`cavemanOutputMode.autoClarity`، جو بطور ڈیفالٹ on ہوتا ہے) on ہو؛ toggle کو off کرنے سے
keyword check skip ہو جاتا ہے۔

جب bypass turn کو گزرنے دیتا ہے، تو `placeSystemInstruction()` (اسی file میں)، جو کبھی نیا
`messages[0]` نہیں بناتا، block کو درج ذیل میں سے پہلے دستیاب مقام پر رکھتا ہے:

1. شروع میں موجود string content والا system message: block اس کے متن کے بعد append کیا جاتا ہے۔
2. top-level `system` field: block کو string کے متن کے بعد append کیا جاتا ہے، یا
   content-block array میں نئے text block کے طور پر شامل کیا جاتا ہے۔
3. بعد میں آنے والا پہلا string content والا system message: block اس کے
   متن کے بعد append کیا جاتا ہے۔
4. مذکورہ بالا میں سے کوئی نہیں: block کو `messages` کے آخر میں ایک نئے system message میں رکھا جاتا ہے۔

ایسی body میں جس میں `messages` array نہ ہو (یا وہ خالی ہو)، کوئی content bypass نہیں چلتا اور
top-level `system` field سے رجوع نہیں کیا جاتا۔ block کو string
`instructions` field کے متن کے بعد append کیا جاتا ہے، الا یہ کہ اس field میں پہلے ہی
`[OmniRoute Output Styles]` marker موجود ہو؛ ایسی صورت میں body کو
`already_applied` کے طور پر بغیر تبدیلی کے چھوڑ دیا جاتا ہے۔ جب body میں string
`instructions` field نہ ہو لیکن `input` موجود ہو
(ایک string یا array)، تو block، `instructions` بن جاتا ہے اور اس field میں پہلے سے موجود کسی
بھی non-string value کو بدل دیتا ہے۔ ایسی body جس میں نہ string `instructions` field ہو اور
نہ string یا array `input`، اسے بغیر تبدیلی کے چھوڑ دیا جاتا ہے اور `no_messages` کے طور پر
skip کیا جاتا ہے۔

#### فعال کرنے کا طریقہ

dashboard میں: **Compression Context → Compression Settings**
(`/dashboard/context/settings`)، Output styles section: ہر style کے لیے ایک row، جس میں on/off
toggle اور level selector ہوتا ہے۔ styles اس وقت inject ہوتے ہیں جب compression خود on ہو
(page کا master toggle، `enabled`)۔ **Auto-Clarity Bypass** toggle، **Caveman**
page (`/dashboard/context/caveman`) کے **Output Mode** card میں ہے۔ Programmatically،
compression config انتخاب کو یوں persist کرتا ہے:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: جب تک `outputStyles` خالی ہے، legacy `cavemanOutputMode.enabled`
setting، `cavemanOutputMode.intensity` پر `terse-prose` سے map ہوتی ہے۔ اس کے بعد block
`[OmniRoute Output Styles]` marker سے شروع ہوتا ہے، جبکہ legacy `applyCavemanOutputMode()`
injector نے `[OmniRoute Caveman Output Mode]` لکھا تھا۔ marker کے نیچے، متن en، pt-BR، es، de،
fr، it، ru، id اور vi میں legacy injection سے match کرتا ہے؛ ja اور zh میں boundaries clause
سے پہلے ایک اضافی space ہوتا ہے۔ `terse-prose` کا pt-BR، es، de، fr، it، ru، zh، ja، id اور vi
میں ترجمہ ہوتا ہے، لہٰذا ایسا request جس کی resolved language `hu` ہو، انگریزی متن حاصل کرتا
ہے، جبکہ legacy injector اس کا Hungarian متن استعمال کرتا تھا۔

Output-style زبان کا انتخاب (`resolveOutputStyleLanguage()` جو
`outputStyles/apply.ts` میں ہے): جب `languageConfig.enabled` on ہو، تو `autoDetect`،
request کی `messages` array میں موجود تازہ ترین ایسے user message کا sample لیتا ہے جس میں
متن ہو (string content، یا اس کے content parts کا `text`) اور اس پر Caveman engine کا detector
(`detectCompressionLanguage()`) چلاتا ہے۔ detector ایسے متن کے لیے `zh` لوٹاتا ہے جس میں Han
حروف ہوں مگر kana نہ ہو؛ بصورتِ دیگر یہ `it`، `pt-BR`، `es`، `de`، `fr`، `ru`، `ja`، `hu`
اور `id` میں سے اس زبان کو لوٹاتا ہے جس کے hint matches سب سے زیادہ ہوں، اور جب کوئی match نہ
ہو تو `en` لوٹاتا ہے — جس متن کو یہ classify نہ کر سکے اسے English ملتی ہے، کبھی
`defaultLanguage` نہیں، اور `vi` کبھی detect نہیں ہوتا، اگرچہ styles کے ساتھ `vi` متن شامل
ہوتا ہے۔ Responses API body اپنے turns کو `input` میں رکھتی ہے، جس کا sample نہیں لیا جاتا،
لہٰذا اسے پہلے `defaultLanguage`، پھر English ملتی ہے۔ جب `messages` میں کسی user message کے
پاس متن نہ ہو، یا `autoDetect` off ہو، تو `defaultLanguage` لاگو ہوتی ہے، پھر English۔ جب
`languageConfig.enabled` off ہو، تو زبان English ہوتی ہے — الا یہ کہ request پر کوئی
compression combo لاگو ہو (request کے routing combo کو assign کیا گیا combo، یا default
compression combo جس پر chatCore built-in stacked pipeline کے لیے fallback کرتا ہے):
combo لاگو کرنے سے اس request کے لیے `languageConfig.enabled` on ہو جاتا ہے اور
`defaultLanguage`، combo کے language packs سے set ہوتی ہے (saved value، اگر وہ combo کے packs
میں سے ایک ہو، بصورتِ دیگر combo کا پہلا pack، جس کا ڈیفالٹ `en` ہے)، جبکہ saved
`autoDetect` (بطور ڈیفالٹ on) بدستور لاگو رہتا ہے۔ Caveman input engine اپنے rule-pack کی زبان
ایک مختلف طریقے سے منتخب کرتا ہے — ہر text part کے لیے الگ، اور auto-detect off ہونے پر
`enabledPacks` کی شرط کے ساتھ۔

اسٹائل × زبان میٹرکس کو
`tests/unit/compression/output-styles-i18n-matrix.test.ts` کے ذریعے مقرر کیا گیا ہے: ہر کیٹلاگ اسٹائل کے لیے ٹیسٹ کے `BASELINE_LANGUAGES` میں ایک
اندراج ضروری ہے؛ جو اسٹائل locale-gated نہ ہو، اسے لازماً
pt-BR ترجمے کے ساتھ فراہم کیا جانا چاہیے (locale-gated `terse-cjk` اس اصول سے مستثنیٰ ہے)، الا یہ کہ وہ
`KNOWN_ENGLISH_ONLY` میں درج ہو، جس میں صرف ایسے اسٹائل شامل ہو سکتے ہیں جن کے کوئی ترجمے سرے سے موجود نہ ہوں —
اگر کسی درج شدہ اسٹائل کا کوئی بھی ترجمہ موجود ہو تو ٹیسٹ ناکام ہو جاتا ہے؛ اور اگر کوئی اسٹائل
اپنے `BASELINE_LANGUAGES` اندراج میں درج کسی زبان سے محروم ہو جائے تو بھی ٹیسٹ ناکام ہو جاتا ہے۔ اسٹائل شامل کرنے کے لیے،
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) دیکھیں۔

### ٹول نتیجے کی کمپریشن

`open-sse/services/compression/toolResultCompressor.ts` میں موجود `compressToolResult()`
ٹول نتیجے کے متن کو **5 حکمتِ عملیوں** کے ذریعے کمپریس کرتا ہے۔ یہ انہیں اسی ترتیب سے آزماتا ہے، اور
پہلی فعال حکمتِ عملی، جس کی جانچ مواد سے مماثل ہو، نتیجے کا فیصلہ کرتی ہے:

1. **`fileContent`**: 3 یا اس سے زیادہ سطروں پر مشتمل ایسا مواد جس میں کم از کم ایک سطر،
   ابتدائی indentation نظرانداز کرنے کے بعد، `import `، `export `، `function `، `class `،
   `const `، `let `، `var ` یا `return ` (کلیدی لفظ کے ساتھ ایک space) سے، یا `if`،
   `for` یا `while` کے بعد `(` یا ` (` سے شروع ہو، اس کی پہلی 20 اور آخری 5 سطریں برقرار
   رکھی جاتی ہیں، جبکہ حذف شدہ درمیانی حصہ نشان زد ہوتا ہے۔
2. **`grepSearch`**: ایسا مواد جس میں کم از کم ایک سطر `<path>:<digits>:` کی شکل میں ہو،
   جہاں پہلے colon سے قبل متن میں whitespace نہ ہو، صرف انہی سطروں کو برقرار رکھتا ہے،
   زیادہ سے زیادہ 30، پھر مزید مماثلتوں کی تعداد اور مماثل فائلوں کی فہرست شامل کرتا ہے؛
   ہر دوسری سطر حذف کر دی جاتی ہے۔ حکمتِ عملی کو فعال کرنے کے لیے ایسی ایک سطر کافی ہے، لہٰذا
   `12:30:45` جیسے timestamp سے شروع ہونے والی log سطر بھی شمار ہوتی ہے۔
3. **`shellOutput`**: ایسا output جس میں ANSI CSI sequence (`ESC[` کے بعد اعداد یا
   semicolons اور پھر ایک حرف، جیسا کہ color codes میں ہوتا ہے) یا متن میں کہیں بھی `$` کے بعد
   whitespace ہو، ان sequences کو کھو دیتا ہے (دیگر escapes، جیسے `ESC[?25l` یا
   OSC window-title sequence، برقرار رہتے ہیں) اور آخری 50 سطریں رکھتا ہے، جبکہ مسلسل
   دہرائی گئی سطروں کو یکجا کر دیتا ہے۔ چونکہ یہ جانچ `json` اور `errorMessage` سے پہلے چلتی ہے،
   اس لیے ایسا JSON یا error output جس میں اس نوعیت کا `$` ہو، `shellOutput` فعال ہونے کی صورت میں
   کبھی ان تک نہیں پہنچتا۔
4. **`json`**: 2,000 حروف سے بڑا ایسا JSON payload جو اختیاری whitespace کے بعد `{` یا `[`
   سے شروع ہو اور کامیابی سے parse ہو جائے، اس کا خلاصہ بنایا جاتا ہے: 7 سے زیادہ items والی array
   میں پہلی 5 اور آخری 2 items اور کل تعداد برقرار رہتی ہے، جبکہ object میں اس کی پہلی 20
   keys رکھی جاتی ہیں، اور ہر nested object یا array value کو `{…N keys}` placeholder سے
   بدل دیا جاتا ہے (array کے لیے N اس کی length ہوتی ہے) اور پہلے 20 کے بعد حذف ہونے والی keys
   کی تعداد بتانے کے لیے `_remaining_<N>_keys` marker شامل کیا جاتا ہے۔ Scalar values مکمل نقل
   کی جاتی ہیں، اس لیے 20 یا اس سے کم keys اور بغیر nested values والا object صرف دوبارہ indent
   ہوتا ہے — minified object میں حروف بڑھ جاتے ہیں اور وہ غیر تبدیل شدہ رہتا ہے۔
5. **`errorMessage`**: ایسا output جس میں کہیں بھی اور حروف کی کسی بھی صورت میں `error:`،
   `error ` (لفظ کے بعد ایک space، جیسے `no error found` میں)، `[error]`،
   `exception:`، `exception `، `[exception]` یا `traceback` موجود ہو، اس کی پہلی سطر،
   اگلی 10 سطریں اور آخری 3 سطریں برقرار رکھی جاتی ہیں، جبکہ ان کے درمیان کی سطروں کی جگہ
   `… [N frames elided] …` marker آتا ہے۔ Marker صرف اس وقت ظاہر ہوتا ہے جب پہلی سطر کے بعد
   13 سے زیادہ سطریں ہوں، لہٰذا 14 یا اس سے کم سطروں والا error output مختصر نہیں ہوتا
   (12 یا 13 سطروں کی صورت میں آخری 3 سطریں پہلے سے برقرار رکھی گئی سطروں کو دہراتی ہیں)۔

کسی حکمتِ عملی کے مماثل ہونے کے بعد، چاہے وہ کچھ بھی نہ بچائے، بعد کی حکمتِ عملیاں
نہیں آزمائی جاتیں۔ جب مماثل حکمتِ عملی کوئی تخمینی tokens نہ بچائے (length ÷ 4، اوپر کی جانب round کیا ہوا) —
مثلاً 25 یا اس سے کم سطروں والی code-like فائل، یا 2,000 سے زیادہ
حروف والی ایسی JSON array جس میں 7 یا اس سے کم items ہوں — تو aggressive engine اصل tool
result برقرار رکھتا ہے: دونوں callers (`compressAggressive()` اور `compressAnthropicToolResultBlock()`)
اصل کو اس وقت برقرار رکھتے ہیں جب `saved` 0 یا اس سے کم ہو، جبکہ `compressToolResult()` خود پھر بھی
اسی حکمتِ عملی کا output واپس کرتا ہے۔ Tool-result مرحلہ حتمی فیصلہ نہیں ہے:
engine کا fallback summarizer اب بھی 8,192 حروف سے طویل `tool` یا `function` message کو
مختصر کر سکتا ہے (`maxTokensPerMessage`، 2,048، ضرب 4)۔

#### کب استعمال کریں

Tool result compression، aggressive engine کا مرحلہ 1 ہے (`open-sse/services/compression/aggressive.ts` میں
`compressAggressive()`)، اس لیے یہ Aggressive mode میں اور stacked pipeline کے کسی
`aggressive` مرحلے میں چلتی ہے۔ یہ OpenAI-shape کے `tool` اور `function`
messages اور Anthropic کے `tool_result` blocks کے اندر موجود متن کو کمپریس کرتی ہے۔ ہر حکمتِ عملی کا
`aggressive.toolStrategies` کے تحت اپنا switch ہے، اور سب بطور default فعال ہوتے ہیں۔ Dashboard میں،
compression فعال اور default mode، Aggressive ہونے کی صورت میں switches، Caveman صفحے کے
**Advanced** view میں ہوتے ہیں۔

### Stacked Pipeline

Stacked mode میں **متعدد engines یکے بعد دیگرے** چلتے ہیں — عموماً پہلے RTK
(tool output پر 60-90% بچت)، پھر باقی متن پر Caveman (~46% input
بچت)۔ ان دونوں کو ملا کر یہ **78-95% eligible range** بنتی ہے (اوپر Upstream Savings Math
دیکھیں): `1 - (1 - 0.60..0.90) × (1 - 0.46)` کی اوسط ≈89% ہے۔

#### یہ کیسے کام کرتا ہے

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (اضافی مواد کا اخراج) → 108 tokens
  → Output (108 tokens، ~89% بچت)
```

#### کب استعمال کریں

Stacked mode کو درج ذیل کے لیے استعمال کریں:

- Tool-heavy workflows (agentic coding، تحقیق)
- لاگت کے حوالے سے حساس batch processing
- جب آپ کو tokens کی زیادہ سے زیادہ بچت درکار ہو

Stacked pipelines کو global `stackedPipeline` compression
setting کے ذریعے، یا کسی routing combo کو تفویض کیے گئے named compression combo کے ذریعے configure کیا جاتا ہے (اوپر
Per-Combo Override دیکھیں) — auto-combo `modePack` کے ذریعے نہیں (وہ field صرف
auto-combo model selection کے weights دوبارہ متعین کرتی ہے، اور `stacked` کوئی valid pack name نہیں ہے)۔

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
