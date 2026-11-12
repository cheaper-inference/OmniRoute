# Guardrails (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **حقیقت کا ماخذ:** `src/lib/guardrails/`
> **آخری تازہ کاری:** 2026-10-17 — v3.8.52 ([کوریج اور حدود](#coverage-and-limits) کا اضافہ:
> کن روٹس اور رسپانس پاتھس تک ہکس پہنچتے ہیں، ضم شدہ غیر فعال ہیڈرز (#16412)، انجیکشن
> بلاک موڈ بطور لازمی حد بندی (#16413)، اور post-call سے پہلے رسپانس کو کون کون دیکھتا ہے)

گارڈریلز OmniRoute اور اپ اسٹریم فراہم کنندگان کے درمیان حد بندی پر حفاظت، پالیسی، اور
مواد کی تبدیلیوں کو نافذ کرتے ہیں۔ ہر گارڈریل درخواست کے پے لوڈز (`preCall`) اور
اپ اسٹریم جوابات (`postCall`) کا معائنہ کر سکتا ہے (اور اختیاری طور پر انہیں مسترد،
تبدیل، یا تشریح بھی کر سکتا ہے)۔

یہ نظام **fail-open** ہے: اگر کوئی گارڈریل عمل کے دوران خرابی پھینکتا ہے، تو رجسٹری
اس خرابی کو ریکارڈ کرتی ہے اور درخواست کو ناکام بنانے کے بجائے اگلے گارڈریل کے ساتھ
جاری رکھتی ہے۔ بلاک کرنا ایک واضح فیصلہ ہے (`block: true`)، کبھی کوئی حادثہ نہیں۔
واحد استثنا منسوخ شدہ درخواست ہے: جب کالر کا `signal` منسوخ ہو جاتا ہے، تو خرابی
پھینکنے والا گارڈریل ہک رن کو نظرانداز کیے جانے کے بجائے مسترد کر دیتا ہے۔

یہ ہکس ہر روٹ یا ہر جواب پر **نہیں** چلتے۔ کسی گارڈریل پر بطور سیکیورٹی کنٹرول انحصار
کرنے سے پہلے [کوریج اور حدود](#coverage-and-limits) ضرور پڑھیں۔

## بلٹ اِن گارڈریلز

رجسٹری امپورٹ کے وقت چھ گارڈریلز ترجیحی ترتیب میں خودکار طور پر لوڈ کرتی ہے
(دیکھیں `registry.ts` → `registerDefaultGuardrails()`):

| ترجیح | نام                 | مراحل          | فائل                  |
| ----- | ------------------- | -------------- | --------------------- |
| `5`   | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`   | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`   | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`  | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`  | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`  | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

کم ترجیح والے نمبر **پہلے** چلتے ہیں۔

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 بیس ماڈل اور `glm-5.3-{low,high,max}` میں واضح `supportsVision:false`
رجسٹری/اسپییک میٹا ڈیٹا موجود ہے۔ GLM 5.3 Flash ویریئنٹس نیٹو ویژن ماڈلز ہی رہتے
ہیں۔ Claude Code کا `/v1/messages` روٹ، Claude-to-OpenAI ترجمے سے **پہلے** مشترکہ
`handleChat` پری کال گارڈریل چین میں داخل ہوتا ہے؛ نیسٹڈ `Read` ٹول رزلٹ امیجز کو
اس سے پہلے بیان یا ہینڈل کیا جانا ضروری ہے کہ وہ ترجمہ انہیں OpenAI `image_url`
مواد میں منتقل کر دے (#17069)۔

یہ **غیر ویژن ماڈلز** کی طرف بھیجی گئی امیج والی درخواستوں کو روکتا ہے اور یا تو پوری
درخواست کو کسی ویژن قابل ماڈل کی طرف دوبارہ روٹ کرتا ہے، یا اپ اسٹریم کال سے پہلے
امیج پارٹس کو قابلِ ترتیب ویژن ماڈل کے تیار کردہ متنی تفصیلات سے بدل دیتا ہے۔ اس سے
صرف متن والے فراہم کنندگان ملٹی موڈل پے لوڈز کو شفاف طور پر ہینڈل کر سکتے ہیں۔

فلو:

1. اگر ہدف ماڈل پہلے سے ویژن سپورٹ کرتا ہے تو اسکپ کریں (سوائے اس صورت کے کہ وہ
   مجبوری برج فہرست `isVisionBridgeForcedModel` میں موجود ہو)۔
2. امیج پارٹس `extractImageParts(messages)` (`visionBridgeHelpers.ts`) کے ذریعے
   نکالیں، جو کام **یونیفائیڈ میڈیا ڈیٹیکٹر** `detectMediaParts()` کو
   `open-sse/utils/mediaParts.ts` میں سونپتا ہے — کومبو مطابقت فلٹر کے ساتھ مشترکہ
   واحد حقیقت کا ماخذ۔ نکالنا صرف ان شکلوں تک محدود (allowlisted) ہے جنہیں
   `replaceImageParts` واپس splice کر سکتا ہے (extract↔replace معاہدہ): OpenAI
   `image_url`، Anthropic base64 `source.type:"base64"`، Anthropic URL
   `source.type:"url"`، اور Responses API `input_image`۔ Claude Code
   `tool_result.content` اور Responses ٹول آؤٹ پٹس کے اندر نیسٹڈ مماثل امیجز بھی
   نکالے جاتے ہیں اور اپنے اصل راستوں پر تبدیل کیے جاتے ہیں؛ صرف اشاریہ والی
   شکلیں کومبو فلٹر کا مواد ہیں اور نکالی نہیں جاتیں۔ اگر کچھ نہ ملے تو اسکپ
   کریں۔
3. رن ٹائم کنفیگریشن `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) کے ذریعے حل کریں: نئی
   `modalityBridge*` سیٹنگز کلیدیں غالب آتی ہیں؛ پرانی `visionBridge*` کلیدیں
   **ایک سائیکل فال بیک** رہتی ہیں (رول بیک ونڈو)۔ جب برج غیر فعال ہو تو کسی بھی
   میڈیا ٹراورسل سے پہلے اسکپ کریں۔
4. موڈ سلیکٹر (`modalityBridgeVisionMode`، نیچے جدول دیکھیں) reroute بمقابلہ
   describe کا فیصلہ کرتا ہے۔ Reroute صرف `model` بدلے ہوئے `modifiedPayload`
   واپس کرتا ہے، ساتھ ہی میٹا `{ rerouted, fromModel, toModel, imagesKept }`۔
5. Describe راستہ: امیجز کو `maxImages` پر محدود کریں، ٹاسک آگاہ پرامپٹ تیار کریں،
   describe کیشے سے رجوع کریں، ویژن ماڈل کو **متوازی طور پر** کال کریں
   (`Promise.allSettled`)، اور ان کی جگہ `[Image N]: <description>` ٹیکسٹ پارٹس
   داخل کریں۔ ناکام describe `null` دیتا ہے: خام امیج نامعلوم/ویژن قابل اہداف کے
   لیے محفوظ رہتا ہے (#4012)، لیکن **تصدیق شدہ صرف متن والا براہ راست ہدف** یا
   زیرو ویژن کومبو ہر غیر بیان شدہ امیج کے لیے واضح
   `(unavailable — no vision-capable provider connected)` ٹیکسٹ اسٹب حاصل کرتا
   ہے، بشمول جزوی ناکامیوں اور describe کال کی حد سے باہر کی امیجز (#17069)۔
   موجودہ تمام ناکام کومبو describe فال بیک اپنی جگہ برقرار رہتا ہے (#8430)۔
6. `modifiedPayload` + میٹا (`imagesProcessed`، `descriptions`،
   `processingTimeMs`، `visionModel`) واپس کریں۔

#### موڈ سلیکٹر (`modalityBridgeVisionMode`)

| موڈ        | ڈیفالٹ | رویّہ                                                                                                                                                                                                                                                                                               |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | قدیم ہیورسٹک، بغیر کسی تبدیلی کے (#6640/#7204): non-combo/`auto/` ماڈلز بہترین ویژن ماڈل کی طرف ری روٹ ہو جاتے ہیں، جب تک کہ اصل ماڈل کے پاس پہلے سے قابلِ استعمال کریڈینشلز موجود ہوں (پھر ڈسکرائب)؛ کومبو ٹارگٹس ہمیشہ ڈسکرائب کرتے ہیں۔                                                          |
| `describe` |        | ہمیشہ ڈسکرائب — ری روٹ بلاک مکمل طور پر نظرانداز کر دیا جاتا ہے؛ صارف کا منتخب کردہ ماڈل ہمیشہ جواب دیتا ہے۔                                                                                                                                                                                        |
| `reroute`  |        | جبری ری روٹ: کریڈینشل یافتہ ماڈل کو برقرار رکھنے والا گارڈ نظرانداز کر دیا جاتا ہے۔ ری روٹ-**ٹارگٹ** کریڈینشل گارڈ پھر بھی لاگو رہتا ہے — جب کوئی قابلِ استعمال ویژن ٹارگٹ موجود نہ ہو تو برج واضح خرابی کے ساتھ بلاک کر دیتا ہے، بجائے ڈسکرائب کرنے یا خام تصاویر صرف-متن والے ٹارگٹ کو بھیجنے کے۔ |

جبری موڈز auto ہیورسٹک چلنے سے **پہلے** شارٹ سرکٹ ہو جاتے ہیں؛ `auto` کا رویّہ
pre-PR-1 گارڈریل سے بائٹ بہ بائٹ مکمل مماثل ہے۔

#### API-key اسکوپ (`visionBridgeKeyScope.ts`)

جب کال کرنے والے کی API key `allowedConnections`، کوٹہ پولز
(`allowedQuotas`) یا ماڈلز (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) پر پابندی لگاتی ہے، تو برج صرف وہی
ری روٹ اور ڈسکرائب ماڈلز منتخب کرتا ہے جنہیں وہ key استعمال کر سکتی ہے، اور صرف انہی کنیکشنز
پر جنہیں وہ key استعمال کر سکتی ہے۔ اس کے بعد ڈسکرائب کال ہمیشہ
`x-omniroute-self-loop-key-id` ہیڈر کے ساتھ OmniRoute self-loop سے گزرتی ہے، تاکہ وصول ہونے والی chat request
اس key کی کنیکشن اور ماڈل پالیسی کو دوبارہ نافذ کرے۔ `enforceApiKeyPolicy()`
اس ہیڈر کو صرف self-loop bearer کے ساتھ مل کر تسلیم کرتی ہے، لہٰذا یہ صرف رسائی کو مزید
محدود ہی کر سکتی ہے، اور ایسی id جو resolve نہ ہو سکے مسترد کر دی جاتی ہے۔

اگر key کے لیے کوئی ویژن ماڈل مجاز نہ ہو تو، ایک **تصدیق شدہ صرف-متن
ٹارگٹ** امیج request کو مقامی طور پر واضح HTTP 400 کے ساتھ مسترد کر دیتا ہے،
بجائے امیج bytes کو نااہل اپ اسٹریم کو بھیجنے کے (#17069)۔ نامعلوم یا native
ویژن صلاحیت والے ٹارگٹس کے لیے، ڈسکرائب پاتھ اپنا سابقہ
fail-open رویّہ برقرار رکھتا ہے (meta `{ skipped: true, reason: "no_permitted_vision_model" }`)۔
بغیر key والی requests، اور وہ keys جن پر یہ پابندیاں نہیں ہیں، بالکل
پہلے جیسا برتاؤ کرتی ہیں۔

#### ٹاسک آگاہی والا ڈسکرائب پرامپٹ (`modalityBridgeVisionTaskAware`)

ڈیفالٹ **true**۔ `composeVisionPrompt()` (`visionBridgeHelpers.ts`) بنیادی
ڈسکرائب پرامپٹ میں **آخری صارف پیغام** کا متن (500 حروف تک کاٹا ہوا) شامل
کرتا ہے، جس سے تفصیل کی سمت اسی چیز کی طرف مائل ہوتی ہے جو صارف نے اصل میں
پوچھی (codex-vision-proxy پیٹرن)، اور ویژن ماڈل سے نظر آنے والے متن کی
نقل تحریر کرنے کو کہا جاتا ہے۔ فلیگ بند ہونے پر — یا صارف کے متن کی عدم موجودگی میں —
بنیادی پرامپٹ بغیر تبدیلی کے استعمال ہوتا ہے۔

ڈسکرائب self-loop کی اپنی OpenAI-compatible request (`visionBridgeHelpers.ts` میں
`callVisionModelSingle()`) ہمیشہ `image_url.detail: "high"` کی درخواست کرتی ہے —
بالکل غیر مشروط طور پر، ہر کالر/پرووائیڈر کے لیے، کسی بھی client سگنل سے مشروط کیے
بغیر۔ کم detail والی sampling بالکل اسی متن-نقل کام کے لیے OCR کی درستگی گرا
دیتی ہے جو یہ پرامپٹ مانگتا ہے، لہٰذا ڈسکرائب کال خود ہمیشہ high
detail مانگتی ہے، قطع نظر اس کے کہ اصل inbound request میں کون سا detail لیول
استعمال ہوا تھا۔ یہ صرف اندرونی ڈسکرائب request body کو متاثر کرتا ہے؛ یہ اس بات کو
تبدیل نہیں کرتا کہ OmniRoute primary request پر کالر کے اپنے `image_url.detail` کو
کیسے آگے بھیجتا ہے — وہ ڈیفالٹ الگ سے، اور صرف detect شدہ OpenCode clients
کے لیے، `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) میں لاگو ہوتا
ہے۔ ڈسکرائب self-loop کی Anthropic wire-format برانچ میں کوئی `detail` فیلڈ
نہیں ہے اور وہ دونوں میں سے کسی بھی ڈیفالٹ سے متاثر نہیں ہوتی۔

#### ڈسکرائب آؤٹ پٹ کی حد (`modalityBridgeVisionMaxChars`)

| کلید                           | ڈیفالٹ | حد               |
| ------------------------------ | ------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` یا 100–50000 |

`0` (ڈیفالٹ) کا مطلب **کوئی حد نہیں** ہے — `callVisionModel()` کی لوٹائی
گئی تفصیل بغیر تبدیلی آگے بڑھائی جاتی ہے، جس سے موجودہ رویّہ
برقرار رہتا ہے۔ 100–50000 کی رینج میں کوئی بھی قدر تفصیل کو
`…` سفکس کے ساتھ کاٹ دیتی ہے اس سے پہلے کہ اسے `[Image N]: <description>` کے
طور پر واپس شامل کیا جائے (`src/lib/guardrails/visionBridge.ts` میں
`VisionBridgeGuardrail.preCall()`)۔ تفصیل سے بھرپور OCR کاموں کے لیے اسے بڑھائیں
جہاں ڈاؤن اسٹریم ماڈل کو مکمل نقل درکار ہو؛ باتونی ویژن ماڈلز پر
token کے استعمال کو محدود رکھنے کے لیے اسے کم کریں۔ ڈیش بورڈ فیلڈ Vision ٹیب کے
Advanced پینل پر موجود ہے (`ModalityBridgeVisionTab.tsx` میں
`modality-bridge-max-chars`) اور 1 سے 99 کے درمیان ہر قدر کو 100 کی کم از کم
سطح تک clamp کر دیتا ہے، جبکہ واضح `0` کو ہاتھ لگائے بغیر چھوڑ دیتا ہے — `0` اپنے
حق میں ایک درست Zod قدر ہے (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`)،
صرف "unset" ڈیفالٹ نہیں۔

#### ڈسکرائب کیش (`modalityBridge/bridgeCache.ts`)

ڈسکرائب آؤٹ پٹس کے لیے اندرونِ میموری LRU + TTL کیش، پورے process میں مشترک۔
Key = `sha256(imageRef + composedPrompt + configuredBridgeModel)` مع
length-prefix framing (field-boundary collisions کا کوئی خطرہ نہیں)۔ ماڈل والا جزو
**کنفیگر شدہ** برج ماڈل ہے، نہ کہ وہ ماڈل جس نے اصل میں جواب دیا —
`callVisionModel` اندرونی طور پر fallback کر سکتا ہے، اور فی کوشش keying کیش کو
بکھیر دے گی۔ ناکام ڈسکرائب کبھی کیش نہیں ہوتے۔ ترتیبات:

| کلید                            | ڈیفالٹ | حد      |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### ریموٹ امیج نارملائزیشن (self-loop describe/base64 fetch)

جب bridge خود کوئی **ریموٹ** امیج fetch کرتا ہے — Anthropic describe
self-call اور claude-wire-format base64 conversion
(`ensureBase64ImagesForClaudeWire`)، دونوں `visionBridgeHelpers.ts` میں موجود
`fetchRemoteImageAsDataUri()` کے ذریعے — تو حاصل شدہ data URI کو vision-model
request میں شامل کرنے سے پہلے `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) سے گزارا جاتا ہے۔ حد سے بڑی امیجز کو
**2048px طویل کنارے** تک resize کر دیا جاتا ہے (یہ وہی resize حد ہے جو
OpenAI/Anthropic پہلے سے server-side لاگو کرتے ہیں)، جس سے upload
bytes/latency کم ہو جاتی ہے جبکہ vision model کے دیکھنے میں کوئی فرق نہیں
پڑتا۔ Resizing کے لیے `sharp` استعمال ہوتا ہے، جو dynamic import کے ذریعے
لوڈ کیا جاتا ہے: کسی ایسے platform پر جہاں اس کی native binary لوڈ ہونے میں
ناکام ہو جائے، `normalizeDataUri()` **کبھی throw نہیں کرتا** — یہ اصل bytes کی
passthrough پر واپس چلا جاتا ہے، تاکہ describe/base64-conversion path ہمیشہ
کام کرتا رہے۔ غیر امیج bytes (ایسی fetch جس نے کوئی decodable امیج واپس
نہیں کی) بھی بغیر کسی تبدیلی کے آگے بھیج دی جاتی ہیں۔ یہ normalization صرف
ان امیجز تک محدود ہے جو bridge اپنی self-call کے لیے fetch کرتا ہے — caller کے
خام passthrough payload پر اسے کبھی لاگو نہیں کیا جاتا، جو opt-in-only
mutation اصول (Hard Rule #20) سے مطابقت رکھتا ہے۔

#### ترتیبات schema + migration

نئی `modalityBridge*` keys کی Zod توثیق `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) میں ہوتی ہے:
`modalityBridgeVisionEnabled`، `modalityBridgeVisionMode`،
`modalityBridgeVisionModel`، `modalityBridgeVisionTaskAware`،
`modalityBridgeVisionPrompt`، `modalityBridgeVisionTimeout`،
`modalityBridgeVisionMaxImages`، `modalityBridgeVisionMaxChars`،
`modalityBridgeCache*` کی تین keys، اور Audio Bridge کے استعمال میں آنے والا
`modalityBridgeAudio*` گروپ۔ Migration
`141_modality_bridge_settings.sql` موجودہ legacy
`visionBridge*` ویلیوز کو مماثل نئی keys میں کاپی کرتی ہے (idempotent، کبھی بھی
operator-set `modalityBridge*` ویلیو کو overwrite نہیں کرتی)؛ legacy keys
ایک release cycle تک read fallback کے طور پر قبول کی جاتی رہتی ہیں۔

#### شفافیت header + اعداد و شمار

Describe سے تبدیل شدہ responses کے ساتھ
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
ہوتا ہے (جسے `modalityBridge/bridgeStats.ts` میں `buildModalityBridgeHeader()`
بناتا ہے اور `src/sse/handlers/chatHelpers.ts` میں `withModalityBridgeHeader()`
stamp کرتا ہے)۔ Rerouted requests کو **کوئی header نہیں** ملتا — payload کو
چھوا نہیں گیا اور model swap پہلے سے response body کے `model` فیلڈ میں ظاہر
ہو رہا ہوتا ہے۔

`GET /api/modality-bridge/stats` (management auth، `GET /api/settings`
جیسی ہی سطح) `vision`، `audio`، اور `video` کے لیے in-memory فی-modality
counters
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }`
واپس کرتا ہے۔ `averageLatencyMs` اپنے denominator کے لیے تمام attempts کے
بجائے `latencySamples` استعمال کرتا ہے؛ بغیر timing والی کوئی operation
صفر-ملی سیکنڈ کا sample مصنوعی طور پر نہیں بناتی۔ `bridged` کامیاب
conversions کے لیے backward-compatible alias رہتا ہے؛ ناکام attempts اس میں
اضافہ نہیں کرتیں۔ Counters process restart پر ڈیزائن کے مطابق reset ہو جاتے
ہیں (یہ telemetry ہے، accounting نہیں)۔

#### ڈیش بورڈ کنفیگریشن

مخصوص ڈیش بورڈ صفحہ `/dashboard/settings/modality-bridge` ہے۔ اس کے
URL-addressable `Vision`، `Audio`، اور `Video` tabs `tab` ویلیو بدلتے وقت
query parameters برقرار رکھتے ہیں۔ Vision tab فعالیت (enablement)، mode،
model selection (خودکار default سمیت)، task-aware prompting، جدید
timeout/image/description-length/cache حدود، runtime
counters، اور ایک guarded sample request پیش کرتا ہے۔ Audio tab بھی لائیو
ہے: یہ enablement، Auto کے ساتھ STT-only model picker، timeout/max-clip
حدود، audio counters، اور ایک `input_audio` sample test فراہم کرتا ہے۔ Video
tab فعال ہے: یہ FFmpeg/ffprobe runtime state رپورٹ کرتا ہے — چار واضح UI
حالتوں میں سے ایک (`unknown` جب probe جاری ہو یا مکمل نہ ہو سکے،
`restricted` کسی غیر-loopback ڈیش بورڈ host پر جہاں probe client-side نظر
انداز کر دیا جاتا ہے، `unavailable` جب probe کے بعد نہ ہونے کی تصدیق ہو جائے،
یا `available` مع FFmpeg/ffprobe versions) — یہ enable/model/frame/video/timeout
حدود persist کرتا ہے، model picker کو vision-capable models تک فلٹر کرتا ہے،
اور video counters دکھاتا ہے۔

AI settings کے تحت سابقہ Vision Bridge card اب نئے صفحے کے لیے compatibility
link ہے؛ یہ اب فارم کی دوسری کاپی نہیں رکھتا۔ Media Providers بھی
Image-to-Text اور Speech-to-Text workflows کو متعلقہ Modality Bridge tabs
سے لنک کرتا ہے، موجودہ Speech-to-Text playground کو ہٹائے بغیر۔

**Self-loop admission bypass:** جب describe call OmniRoute کے اپنے `/v1`
self-loop سے گزرتی ہے (غیر-معیاری provider model)، تو sub-request
`x-omniroute-admission-bypass: internal` بھیجتی ہے اور resolved self-loop
credential سے authenticate ہوتی ہے — local mode میں مقامی `sk_omniroute`
sentinel، یا operator-configured `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env
key (#1350) — تاکہ `REQUIRE_API_KEY=true` deployments بھی describe call چلا
سکیں۔ یہ bypass صرف انھی مخصوص credentials کے لیے قبول کیا جاتا ہے، لہٰذا
بیرونی clients اس header کو admission سے بچنے کے لیے استعمال نہیں کر سکتے۔

Legacy defaults `src/shared/constants/visionBridgeDefaults.ts` میں موجود ہیں؛
نئے mode/task-aware/cache defaults اور settings resolver
`src/shared/constants/modalityBridgeDefaults.ts` میں ہیں۔ Guardrail ایک
`deps` constructor option فراہم کرتا ہے تاکہ tests جعلی (fake) `getSettings`
اور `callVisionModel` implementations inject کر سکیں۔

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

آڈیو پر مشتمل chat requests کو اس سے پہلے intercept کرتا ہے کہ وہ کسی ایسے
target تک پہنچیں جس کے بارے میں معلوم نہ ہو کہ وہ audio input قبول کرتا ہے۔
یہ chat request کو کبھی reroute نہیں کرتا: audio parts موجودہ
OpenAI-compatible multipart endpoint کے ذریعے transcribe کیے جاتے ہیں اور
منتخب شدہ chat model متنی transcripts کے ساتھ جاری رہتا ہے۔

طریق کار:

1. `getResolvedModelCapabilities()` کے ذریعے `supportsAudio` کا تعین کریں۔ واضح provider-registry میٹاڈیٹا کو اولیت حاصل ہے، پھر static ماڈل میٹاڈیٹا، پھر sync شدہ `modalities_input`۔ `audio` کے بغیر اعلان کردہ ان پٹ فہرست `false` قرار پاتی ہے؛ صلاحیت کے کسی ثبوت کی عدم موجودگی `null` رہتی ہے۔ `false` اور `null` دونوں محتاط برج کو فعال کرتے ہیں، جبکہ `true` اسے bypass کر دیتا ہے۔
2. `modalityBridgeAudio*` ترتیبات کا تعین کریں اور مشترک `detectMediaParts()` ڈیٹیکٹر کے ذریعے ہر پیغام سے splice کے قابل اعلیٰ درجے کے آڈیو پرزے اخذ کریں۔ تعاون یافتہ wire شکلیں OpenAI کی `input_audio`، `audio_url`، اور `source.media_type: "audio/*"` ہیں۔ nested آڈیو کا پتہ routing کے لیے لگایا جاتا ہے لیکن splice راستے سے نہیں ہٹایا جاتا۔ کام `modalityBridgeAudioMaxClips` سے محدود ہے؛ بعد والے پرزے بغیر تبدیلی کے رہتے ہیں۔
3. ترتیب کردہ `provider/model` کی پاسداری کریں، یا `selectAudioBridgeModel()` کو مستحکم catalog ترتیب میں `AUDIO_TRANSCRIPTION_PROVIDERS` پر چلنے دیں اور وہ پہلا ماڈل منتخب کرنے دیں جس کے پاس قابلِ استعمال فعال provider اسناد موجود ہوں۔
4. `callAudioTranscription()` base64/data-URI آڈیو کو multipart `file` میں تبدیل کرتا ہے، یا صرف-عوامی outbound گارڈ کے ذریعے DNS pinning اور 25 MB کی حد کے ساتھ remote `audio_url` ڈاؤن لوڈ کرتا ہے۔ پھر یہ فائل اور منتخب کردہ ماڈل کو مقامی `/v1/audio/transcriptions` self-loop پر POST کرتا ہے، جس کی تصدیق `resolveSelfLoopBearer()` سے ہوتی ہے۔ موجودہ transcription روٹ معمول کے مطابق اسناد کی تلاش، cooldown/rate-limit ہینڈلنگ، اور provider dispatch انجام دیتا ہے۔
5. کامیاب کالیں اپنے پرزوں کو `[Audio N]: <transcript>` سے بدل دیتی ہیں۔ کالیں `Promise.allSettled` کے ساتھ چلتی ہیں: انفرادی ناکامی اس اصل آڈیو پرزے کو جوں کا توں محفوظ رکھتی ہے (#4012 contract)۔ اگر ہر کال ناکام ہو جائے اور ہدف کا `supportsAudio === false` ہونا ثابت ہو، تو پرزے `[Audio N]: (unavailable — no STT provider connected)` بن جاتے ہیں (#8430 contract)۔ نامعلوم ہدف (`null`) کے لیے مکمل ناکامی کا نتیجہ بغیر چھوڑے رہتا ہے۔ قابلِ استعمال STT اسناد کے بغیر ثابت شدہ صرف-متن ہدف کو نیٹ ورک کال کیے بغیر وہی واضح stub موصول ہوتا ہے۔

کامیاب ٹرانسکرپٹس process-wide Modality Bridge LRU/TTL کیشے استعمال کرتے ہیں۔ کلید آڈیو حوالے، مستحکم `audio-transcription` آپریشن لیبل، اور منتخب STT ماڈل کو یکجا کرتی ہے؛ ناکامیاں کبھی کیش نہیں ہوتیں۔ آڈیو کی کوششیں مشترک `bridged`، `cacheHits`، `failures`، اور `lastUsedAt` کاؤنٹرز کو اپڈیٹ کرتی ہیں۔ تبدیل شدہ جوابات میں `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` شامل ہوتا ہے؛ غیر تبدیل شدہ درخواستوں کو Audio Bridge کا کوئی حصہ نہیں ملتا۔

رن ٹائم ترتیبات ڈیٹابیس پر مبنی اور Zod سے توثیق شدہ ہیں:

| کلید                          | طے شدہ  | دائرہ               |
| ----------------------------- | ------- | ------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                   |
| `modalityBridgeAudioModel`    | `""`    | خودکار یا STT شناخت |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000         |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                |

مشترک کیشے `modalityBridgeCacheEnabled`، `modalityBridgeCacheTtlMinutes`، اور `modalityBridgeCacheMaxEntries` کے ذریعے کنٹرول رہتی ہے۔

### ویڈیو پل (`videoBridge.ts`, `videoBridgePipeline.ts`)

چیٹ کی تکمیل `messages` میں ٹاپ لیول ویڈیو پارٹس کو روکتا ہے اور API `input` کو جواب دیتا ہے اس سے پہلے کہ معلوم مقامی ویڈیو سپورٹ کو بلایا جائے۔ تعاون یافتہ شکلیں ہیں `input_video`, `video_url`, `video_source`, HTTPS URLs, اور `data:video/*;base64,...` ڈیٹا URIs۔ متن میں سادہ فائل ناموں کو ویڈیو کے طور پر نہیں سمجھا جاتا ہے۔

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) درخواست ٹراورسل، capability/policy چیک، فی درخواست جمع، اور رسپانس پے لوڈ کا مالک ہے۔ فی ویڈیو ورک — حصول، مکمل نتیجہ کیش، ایک فریم ترتیب کو بیان کرتا ہے (جو کسی بھی کالر کے ذریعے اعلان کردہ آڈیو ٹرانسکرپٹ کو فیوز کرتا ہے) اور فی کوشش metrics/abort/cleanup — `videoBridgePipeline.ts` میں `processVideoPart` کے پیچھے چھپا ہوا ہے، جسے `preCall` کے لوپ کے اندر ایک بار فی ویڈیو حصہ کہا جاتا ہے۔ وہ ماڈیول واضح بندرگاہ کی حدود `VideoMediaBrokerPort` (بائٹس حاصل کرنا اور نمونے والے فریموں کو نکالنا)، `VideoAudioTranscriptionPort` (سیمپلڈ کیپشنز کے ساتھ کالر کے ذریعے اعلان کردہ آڈیو ٹرانسکرپٹ کو فیوز کرنا) اور `VideoDrilldownPort` (لیگیسی را اسٹور شکل) کی بھی وضاحت کرتا ہے۔ پیداوار STT اور فریم کی برقراری `createVideoSttAdapter` اور `createVideoDrilldownAdapter` کے ذریعے بیان کرنے والی بندرگاہ کے ارد گرد بنائی گئی ہے۔ مؤخر الذکر مشترکہ مبہم ہینڈل لائف سائیکل کا استعمال کرتا ہے۔

The public `/v1` request path never imports or invokes a subprocess. Remote videos are downloaded under a 50 MiB bound; inline base64 videos have a conservative 36 MiB decoded per-video cap so the model/messages/framing envelope can remain inside the public JSON request admission limit of 50 MiB. Inline length and decoded-size estimates are checked before allocation. HTTPS is required on the initial remote URL and every redirect, using the existing public-only outbound guard with DNS pinning. The bytes then cross the exact internal `POST /api/modality-bridge/video/extract` broker boundary. That route is both `LOCAL_ONLY` and `SPAWN_CAPABLE`, accepts only a per-process authenticated, trusted-loopback request, and never accepts a URL, filesystem path, executable, or argument list. The API body-size pipeline and the handler's incremental body reader independently enforce a 50 MiB broker input cap. Its bounded queue runs one extraction at a time, allows four pending jobs, and caps pending input at 100 MiB.

بروکر کے اندر، `ffprobe` ایک نجی مقامی فائل پڑھتا ہے۔ مقررہ فارمیٹ کی اجازت دینے والی فہرست میں پلے لسٹ اور مینی فیسٹ فارمیٹس شامل نہیں ہیں۔ اجازت یافتہ MOV-فیملی کنٹینرز کے لیے، بیرونی MOV ڈیٹا حوالہ جات بطور ڈیفالٹ غیر فعال رہتے ہیں، اور فکسڈ کمانڈ ان میں آپٹ ان نہیں کرتی ہے۔ `ffprobe` اور `ffmpeg` دونوں `file` -only پروٹوکول وائٹ لسٹ، ایک تھریڈ، فکسڈ آرگیومینٹ اری، کوئی شیل نہیں، اور `PATH` سے حل شدہ ایگزیکیوٹیبل استعمال کرتے ہیں۔ منسلک تصویری کور اسٹریمز چلانے کے قابل امیدوار نہیں ہیں۔ تمام پلے ایبل اسٹریمز کو حدود کو پورا کرنا چاہیے، اور ایک واضح ڈیفالٹ اسٹریم کو ڈیٹرمنسٹک لوسٹ انڈیکس فال بیک سے پہلے ترجیح دی جاتی ہے۔ ویڈیوز 600 سیکنڈز، 8,192 پکسلز فی ڈائمینشن، اور 33,554,432 سورس پکسلز تک محدود ہیں۔ FFmpeg نمونے 1-16 مڈپوائنٹ JPEG فریموں، چھوٹے ان پٹ کو بڑھائے بغیر لمبے کنارے کو زیادہ سے زیادہ 1,024 پکسلز تک سکیل کرتا ہے، اور کبھی بھی URL وصول نہیں کرتا ہے۔ سیمپلنگ ڈیفالٹ کے طور پر `uniform` ہے۔ اختیاری `scene_aware` اور تجرباتی `segment_aware` پالیسیاں پہلے سے توثیق شدہ مقامی سٹریم پر ایک اضافی فکسڈ FFmpeg پاس کرتی ہیں، باؤنڈڈ `showinfo` منظر کے ٹائم سٹیمپ کو منتخب کرتی ہیں، اور ڈیٹیکٹر کی ناکامی، ٹائم آؤٹ، خراب آؤٹ پٹ، یا خالی امیدوار سیٹ پر اسی یکساں مڈ پوائنٹس پر متعین طور پر واپس آتی ہیں۔ سیگمنٹ آگاہی موڈ مڈ پوائنٹ کے نمونوں کو توثیق شدہ منظر کے وقفوں کے تناسب سے مختص کرتا ہے۔ طبقہ سے آگاہ ثبوت اور فال بیک رویے کی تفصیل ذیل میں دی گئی ہے۔ ہارڈ 16 فریم کیپ ہر پالیسی میں انتخاب کے بعد لاگو ہوتی ہے۔ جب منظر سے آگاہی کی درخواست کا صرف ایک فریم بجٹ ہوتا ہے، تو یہ فعال مکمل ویڈیو یا فوکس ونڈو کے یکساں مڈ پوائنٹ کا استعمال کرتا ہے اور `policyEffective: uniform` کی رپورٹ کرتا ہے: ایک منتخب منظر کا فریم دونوں وقتی سروں کو محفوظ نہیں رکھ سکتا۔ کال کرنے والا اختیاری طور پر ایک محدود فوکس ونڈو فراہم کر سکتا ہے (`start`/`end` سیکنڈز)؛ باؤنڈز کو میڈیا کے دورانیے کے ساتھ بند کیا جاتا ہے، الٹ یا غیر محدود ونڈوز کو مسترد کر دیا جاتا ہے، اور تمام نمونے لینے کی پالیسیاں صرف معمول کے وقفے کے اندر انجام دی جاتی ہیں۔ نتیجے میں آنے والی ونڈو کو نمونے لینے والے میٹا ڈیٹا میں اور ناقابل بھروسہ وضاحت کے سابقہ میں شامل کیا جاتا ہے تاکہ نیچے دھارے والے ماڈل مکمل ٹائم لائن سے مرکوز اقتباس کو الگ کر سکیں۔

سیمنٹک کیپشن فوکس ایک الگ، واضح ترتیب ہے۔ پہلے سے طے شدہ `full` تجزیہ موڈ موجودہ فریم پرامپٹ کو محفوظ رکھتا ہے اور کبھی بھی درخواست کے متن کو کیپشن ماڈل میں آگے نہیں بھیجتا ہے۔ `focused` موڈ میں، پل ایک ہی چیٹ یا رسپانس کنٹینر سے صرف تازہ ترین غیر خالی صارف کے تصنیف کردہ `text`/`input_text` کو پڑھتا ہے، اسے NFC پر معمول بناتا ہے، کنٹرول کریکٹرز اور وائٹ اسپیس کو ختم کرتا ہے، اور اسے 500 یونی کوڈ کوڈ پوائنٹس تک محدود کرتا ہے۔ ایک خالی نتیجہ عین `full` پرامپٹ پر واپس آتا ہے۔ قابل استعمال اشارے کو JSON کے بطور ایک وقف شدہ ناقابل اعتماد صارف سیاق و سباق بلاک میں ترتیب دیا جاتا ہے اور یہ صرف قابل مشاہدہ تفصیلات کو ترجیح دے سکتا ہے۔ یہ میڈیا میں دکھائی دینے والی یا سنائی دینے والی مندرجہ ذیل ہدایات کے خلاف علیحدہ وارننگ کو اوور رائیڈ نہیں کر سکتا۔ متنی فوکس کبھی بھی `start`/`end` کا اندازہ نہیں لگاتا اور نہ ہی وقتی نمونے کو تبدیل کرتا ہے۔

#### FU-07 ساختی طبقہ ثبوت

`segment_aware` پہلے سے توثیق شدہ مقامی ویڈیو سٹریم پر ایک پابند پری تجزیہ پاس استعمال کرتا ہے۔ فکسڈ فلٹر چین سب سے پہلے زیادہ سے زیادہ 320 پکسلز چوڑا ہوتا ہے، منظر میں ہونے والی تبدیلیوں اور منجمد وقفوں کا پتہ لگاتا ہے، پھر بلر، اوسط لوما، اور spatial/temporal معلومات کے لیے 1 فریم فی سیکنڈ پر نمونے لیتا ہے۔ پاس 600 ساختی نمونوں، ایک FFmpeg/filter دھاگے، ایک ہی `file` -only پروٹوکول اور کنٹینر کی اجازت دینے والی فہرستوں، 1 MiB پراسیس آؤٹ پٹ باؤنڈ، اور بروکر کے مشترکہ abort/deadline. کے اندر زیادہ سے زیادہ 30 سیکنڈ تک محدود ہے یہ کبھی بھی کوئی کمانڈ، فلٹر، راستہ، یا URL کی درخواست کو قبول نہیں کرتا ہے۔

ساختی اقدار تعییناتی نمونے لینے کے ثبوت ہیں، سیمینٹک ویڈیو تفہیم نہیں۔ وہ مضامین، اعمال، عنوانات، تقریر، یا صارف کے ارادے کا اندازہ نہیں لگاتے ہیں۔ منظر اور منجمد حدود طبقات بناتے ہیں؛ منجمد کوریج، دھندلاپن، نمائش، مقامی تفصیل، اور وقتی تبدیلی صرف اس بات پر اثر انداز ہوتی ہے کہ موجودہ 1-16 فریم بجٹ کو کیسے مختص کیا جاتا ہے۔ ایک مکمل طور پر منجمد طبقہ ایک فریم میں بند ہوتا ہے، جبکہ غیر منجمد طبقہ باقی بجٹ کے لیے مقابلہ کرتے ہیں۔ جب حدیں فریموں سے زیادہ ہو جاتی ہیں تو یکساں ٹائم لائن کوریج کو برقرار رکھا جاتا ہے تاکہ تیزی سے ابتدائی کٹوتیاں لمبے پچھلے حصے کو نہیں چھپا سکتیں۔ منجمد باؤنڈری کے 1 سیکنڈ کے تجزیہ کی قرارداد کے اندر منظر کی حدود کو یکجا کیا جاتا ہے۔

غائب فلٹرز، malformed/empty شواہد، ایک پتہ لگانے والے کی خرابی، یا باؤنڈڈ پری اینالیسس ٹائم آؤٹ بالکل یکساں مڈ پوائنٹ پالیسی کے لیے کھلے ہوئے ناکام رہتے ہیں۔ کالر اسقاط یا بروکر کی آخری تاریخ کھلنے میں ناکام نہیں ہوتی ہے: یہ ان فلائٹ ذیلی عمل کو ختم کرتا ہے، بعد میں فریم نکالنے سے روکتا ہے، اور نجی عارضی درخت کو `finally` میں ہٹا دیا جاتا ہے۔

`scripts/perf/video-bridge-fu07-eval.ts` پوسٹ ڈیڈ اپ کیپشن کال سیونگز، ڈینس موشن بجٹ ایلوکیشن، blur/exposure/SI-TI شواہد، لمبی دم کے ساتھ تیزی سے کٹوتیوں، اور بتدریج دھندلا ہونے والے جھوٹے مثبتات کے لیے حقیقی FFmpeg فکسچر تیار کرتا ہے۔ یہ پری تجزیہ وال ٹائم اور جہاں `/usr/bin/time` دستیاب ہے، چائلڈ CPU اور peak RSS ریکارڈ کرتا ہے۔ اس کے معیار کی جانچ صرف ساختی اوریکلز ہیں۔ اصلی کیپشن-ماڈل کا معیار `HOLD` رہتا ہے کیونکہ اس استعمال کا کوئی مجاز اختتامی نقطہ یا منجمد جج نہیں ہے۔ زری بچت بھی `HOLD` رہتی ہے جب تک کہ `--caption-cost-per-call-usd` ایک واضح مثبت فی کال تخمینہ فراہم نہ کرے۔ اسکرپٹ کبھی بھی نتیجہ نہیں بناتا۔

ہر فریم 4 MiB تک محدود ہے، تمام خام فریم ایک ساتھ 23 MiB، اور سیریلائزڈ بروکر کا جواب 32 MiB تک ہے۔ ایک نجی عارضی ڈائریکٹری `finally` میں ہٹا دی گئی ہے۔ OmniRoute FFmpeg کو بنڈل نہیں کرتا ہے اور اپنی مرضی کے مطابق قابل عمل راستے کو قبول نہیں کرتا ہے۔ کیپشن دینے سے پہلے، پل ایک قدامت پسند بصری ڈیڈپلیکیشن پاس کا اطلاق کرتا ہے: ہر JPEG 16 × 16 گرے اسکیل بفر تک کم کر دیا جاتا ہے اور اس کا موازنہ صرف آخری فریم کے ساتھ کیا جاتا ہے۔ ایک فریم کے اوپر درخواست کردہ کیپشن بجٹ کے لیے، نکالنے والے امیدواروں کا پول اس بجٹ سے دوگنا تک فراہم کرتا ہے اور کبھی بھی 16 فریموں سے زیادہ نہیں۔ درخواست کی گئی ٹوپی صرف ڈپلیکیشن کے بعد لاگو ہوتی ہے، پہلے اور آخری منتخب امیدواروں کو حتمی پتلا کرنے کے دوران محفوظ کیا جاتا ہے جب بجٹ کم از کم دو ہو۔ ورژن شدہ `grayscale-16x16-mean-cells-v2` پالیسی میں لوما ڈیلٹا کے بڑے اور تھمب نیل سیلز کا تناسب استعمال کیا گیا ہے جن کا نارمل ڈیلٹا کم از کم 0.05 ہے۔ ڈپلیکیٹ تھریشولڈ مستقل 0.04 ہے، جسے رن ٹائم ترتیب کے طور پر ظاہر کرنے کے بجائے پیشین گوئی کے لیے منتخب کیا گیا ہے۔ یہ ثانوی ہائی کنٹراسٹ سگنل چھوٹی حرکت اور مرئی متن کی تبدیلیوں کو محفوظ رکھتا ہے جسے صرف اوسط موازنہ چھپا سکتا ہے۔ کمپیریٹر یا ڈیکوڈر کی غلطیاں کھلی ہوئی ہیں اور کوریج کو برقرار رکھتی ہیں۔ آؤٹ پٹ میٹا ڈیٹا نکالے گئے امیدواروں کو الگ کرتا ہے، کامیابی سے استعمال کیے گئے فریم، اور بصری ڈپلیکیٹس چھوڑے جاتے ہیں۔

واضح طور پر نشان زد ویڈیو کا حصہ ٹائم اسٹیمپڈ رابطہ شیٹ کی درخواست کر سکتا ہے۔ پل زیادہ سے زیادہ 4 کالم، 16 فریم JPEG گرڈ بناتا ہے۔ ہر 512-پکسل سیل اپنے سورس ٹائم اسٹیمپ کو ہائی کنٹراسٹ باٹم بینڈ میں جلاتا ہے، جبکہ وہی ٹائم اسٹیمپ ڈاون اسٹریم ایسوسی ایشن اور آڈٹ کے لیے ٹیکسٹول میٹا ڈیٹا میں رہتا ہے۔ مکمل JPEG 32 MiB پر محدود رہتا ہے۔ اگر `sharp` گرڈ کو ڈی کوڈ یا کمپوز نہیں کر سکتا تو پل واپس انفرادی JPEG فریموں پر آ جاتا ہے۔ ایک کلائنٹ اسقاط اب بھی شیٹ آپریشن کے ذریعے پھیلتا ہے۔

پروموشن شواہد جان بوجھ کر مصنوعی مرکب مائکرو بینچ مارک سے الگ ہیں۔ `scripts/perf/video-bridge-contact-sheet-eval.ts` حقیقی OpenAI سے ہم آہنگ وژن ماڈلز کے لیے اسکیما ورژن والے A/B استعمال کی وضاحت کرتا ہے۔ یہ فراہم کنندہ کی اطلاع کردہ ٹوکنز، دیوار کے آخر سے آخر تک تاخیر (بشمول شیٹ کمپوزیشن)، ماڈل کال کی گنتی، اور مینی فیسٹ سے متعین حقائق کو برقرار رکھنے کی پیمائش کرتا ہے۔ خام ماڈل کے جوابات رپورٹ میں نہیں لکھے جاتے ہیں۔ صرف SHA-256 ہضم ہوتا ہے اور مماثل حقیقت IDs برقرار رکھا جاتا ہے۔ کنٹرول کوئی نیٹ ورک یا ادا شدہ ماڈل کال نہیں کرتا جب تک کہ `--execute-real` پاس نہ ہو جائے اور `--model`، `OMNIROUTE_BASE_URL`، اور `OMNIROUTE_API_KEY` کو کنفیگر نہ کیا جائے۔ اس واضح حقیقی رن کے بغیر، اس کا مشین پڑھنے کے قابل فیصلہ `HOLD` رہتا ہے؛ اکیلے مصنوعی payload/call-count پیمائش فروغ دینے کا ثبوت نہیں ہیں۔

کال کرنے والے ایک اختیاری `transcript.cues` اری کو ایک معاون ویڈیو حصے کے ساتھ منسلک کر سکتے ہیں جب ان کے پاس پہلے سے منسلک متن موجود ہو۔ ہر ایک کیو میں `text`، جانچ کی مدت کے اندر ایک محدود `start`/`end` وقفہ، اور ایک وائٹ لسٹ شدہ `source` (`client`، `embedded`، یا `audio-bridge`) ہونا ضروری ہے۔ `confidence` `1` پر ڈیفالٹ ہے اور `0` اور `1` کے درمیان رہنا چاہیے۔ عین نقلی اشارے منہدم ہو گئے ہیں۔ OmniRoute کبھی بھی اس میٹا ڈیٹا سے ٹرانسکرپشن شروع نہیں کرتا: توثیق شدہ اشارے بیان کردہ نتیجے میں ماخذ، اعتماد اور وقفہ کے ساتھ کاپی کیے جاتے ہیں، اور فریم کیپشن کے ساتھ ساتھ ناقابل اعتماد مشاہدات کے طور پر پیش کیے جاتے ہیں۔ کیپشن سٹریم میں گھل مل جانے کے بجائے غلط، حد سے باہر، یا پرووینس سے پاک متن کو مسترد کر دیا جاتا ہے۔ دونوں درخواست-باڈی ٹرانسکرپٹ چینلز `client` کو سپلائی کی جانے والی حقیقت کو معمول پر لاتے ہیں، بشمول خود دعویٰ کردہ `embedded` یا `audio-bridge` لیبل۔ صرف سرور کی ملکیت والا اڈاپٹر ہی کوڈ صرف `trustedSource` دلیل کے ذریعے ان قابل اعتماد لیبلز کو تفویض کر سکتا ہے۔ ایک درخواست JSON فیلڈ اس دلیل تک نہیں پہنچ سکتی۔ ٹرانسکرپٹ ٹیکسٹ میڈیا سے ماخوذ غیر بھروسہ مند مواد رہتا ہے، چاہے اس کی اصلیت کچھ بھی ہو، اور اسے کبھی بھی اجازت کا تعین نہیں کرنا چاہیے۔

ایک اعلی درجے کا کالر اسی ویڈیو کے لیے `audioTranscript` ٹریک فراہم کر سکتا ہے۔ اسے کلائنٹ کے فراہم کردہ متن کے طور پر سمجھا جاتا ہے، سرور کی نقل کا ثبوت نہیں۔ فیوژن سیون بصری اور آڈیو مشاہدات کو ایک ڈیڈ لائن اور اسقاط سگنل کے تحت چلاتا ہے، انہیں ایک عام ٹائم لائن پر آرڈر کرتا ہے، صحیح ڈپلیکیٹ کو ختم کرتا ہے، اور جب صرف ایک طرف کامیاب ہوتا ہے تو جزوی نتیجہ کی اطلاع دیتا ہے۔ ایک غلط `audioTranscript` اس جزوی نتیجے میں کمی کرتا ہے — بصری تفصیل رکھی جاتی ہے اور آڈیو برانچ پوری ویڈیو کو ناکام کرنے کے بجائے ایک سینیٹائزڈ ناکامی کوڈ — ریکارڈ کرتی ہے۔ فی برانچ کی دستیابی، جزوی جھنڈا، اور سینیٹائزڈ ناکامی کوڈز بیان کردہ نتیجے میں، گارڈریل میٹا ڈیٹا (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`)، رزلٹ کیش میٹا ڈیٹا میں، اور برج فیوژن کاؤنٹرز میں محفوظ ہیں۔ پہلے سے طے شدہ ویڈیو برج کا راستہ اسپیچ ٹو ٹیکسٹ کی درخواست نہیں کرتا ہے یا دوسری میڈیا کاپی ڈاؤن لوڈ نہیں کرتا ہے۔ اس واضح ٹریک کے بغیر، یہ صرف ویڈیو رہتا ہے۔

**ٹرانسکرپٹ برقرار رکھنا (#12150 P1)۔** جب بھی ویڈیو برج (خود آپٹ ان) ٹرانسکرپٹ کیو — پیش کرتا ہے تو یہ خود بخود لاگو ہوتا ہے کوئی علیحدہ برقرار رکھنے والا جھنڈا نہیں ہوتا ہے۔ جب کوئی درخواست کوئی ٹرانسکرپٹ کیو پیش کرتی ہے (ایک کالر کے ذریعہ اعلان کردہ `transcript` یا ایک fused `audioTranscript`)، گارڈریل اسے `videoBridgeObserved` نشان لگاتا ہے اور ویڈیو کی تفصیل — کا ایک ترمیم شدہ شیڈو تیار کرتا ہے ایک جیسی رینڈرنگ جس میں ہر کیو کے فری ٹیکسٹ باڈی کو `[redacted-video-transcript]` سے تبدیل کیا جاتا ہے، strings سے پہلے stringst فیلڈ کو ذیلی ساخت کے طور پر بنایا جاتا ہے۔ (چپٹا متن کو پارس کرکے کبھی نہیں، لہذا کوئی بھی کیو مواد — مخالف یا عام نہیں، بشمول `]` پر مشتمل جسم جیسے `[inaudible]`/`[music]` — زندہ نہیں رہ سکتا)۔ مسلسل کال لاگ ریکوئسٹ باڈی اس ترمیم شدہ شیڈو کے لیے ہر ویڈیو سے اخذ کردہ ٹیکسٹ حصے کو تبدیل کرتی ہے، جو مواد کی مساوات سے مماثل ہے۔ `fullText` اینکر کو تیار شدہ پری کال گارڈریل پے لوڈ سے دوبارہ پڑھا جاتا ہے، لہذا میچ پھر بھی کامیاب ہوتا ہے جب بعد میں چین کے گارڈریلز ( PII اور کریڈینشل ماسکرز، ترجیحات 10/95) تفصیل کے متن کو جگہ پر دوبارہ لکھتے ہیں اور system-prompt/handoff/memory انجیکشن کے بعد میسج کی صف کو دوبارہ شکل دیتے ہیں۔ ماڈل کو اوپر کی طرف بھیجا گیا جسم کوئی تبدیلی نہیں ہے۔ ایک مشاہدہ شدہ درخواست میں کوئی پائیدار میموری بھی نہیں ہوتی ہے (درخواست- اور جواب سے ماخوذ نکالنے دونوں کو چھوڑ دیا جاتا ہے)، لہذا ماڈل کا اپنا جواب میموری میں ٹرانسکرپٹ ٹیکسٹ کی بازگشت نہیں کر سکتا۔

**خام ویڈیو فیلڈز (#12430)** جب پل کو فعال کیا جاتا ہے اور مقامی ویڈیو سپورٹ نامعلوم یا غیر حاضر ہے، وضاحت شدہ `transcript`/`audioTranscript` فیلڈز بھی `videoBridgeObserved` چالو کرتے ہیں، یہاں تک کہ وضاحت کی ناکامی یا `maxVideos` حد کے بعد بھی۔ `null` اور خالی تاروں کی گنتی؛ غیر حاضر فیلڈز اور غیر ویڈیو میٹا ڈیٹا ایسا نہیں کرتے ہیں۔ برقرار رکھی ہوئی کاپیاں ان فیلڈز کو رد کر دیتی ہیں یا درخواست کو چھوڑ دیتی ہیں، اور caches/Memory نظرانداز کر دیا جاتا ہے۔

ان فال بیک راستوں پر، کال کرنے والے درست اشارے غیر معیاری فراہم کنندہ فیلڈز کے بجائے `text`/`input_text` حصے بن جاتے ہیں۔ درخواست کے ذریعہ فراہم کردہ دونوں ٹریک غیر بھروسہ شدہ `client` مشاہدات بنتے ہیں، ایک واضح انتباہ کے ساتھ کہ ویڈیو کو بیان نہیں کیا گیا تھا اور میڈیا کے خلاف ٹائم اسٹیمپ کی تصدیق نہیں کی گئی تھی۔ موجودہ 256-cue/64-KiB کل اور فی کیو بجٹ دونوں ٹریکس پر ایک ساتھ لاگو ہوتے ہیں۔ ٹائم اسٹیمپ کو بروکر کی 600 سیکنڈ کی چھت اور فراہم کردہ فوکس ونڈو کے مطابق ہونا چاہیے۔ غلط ٹریکس کو مسترد کر دیا جاتا ہے، صوابدیدی متن کے طور پر فارورڈ نہیں کیا جاتا ہے۔ ایک درست بہن بھائی کو تب بھی استعمال کیا جا سکتا ہے جب تک کہ ان کے مشترکہ بجٹ سے زیادہ نہ ہو۔ Null/empty فیلڈز میں کوئی متن شامل نہیں ہوتا ہے۔ اس فال بیک کے ذریعہ کوئی میڈیا بازیافت یا نقل شامل نہیں کیا گیا ہے۔ ٹرانسکرپٹ ایکسٹینشن فیلڈز کو فال بیک ویڈیو کیریئر اور اس کے `video_url`/`source` آبجیکٹ سے ہٹا دیا جاتا ہے۔ OpenAI تار کی اجازت دینے والی فہرست سخت رہتی ہے۔ نامعلوم مقامی ویڈیو کیریئرز دستیاب رہتے ہیں اور معلوم صرف متن والے اہداف محفوظ مارکر رکھتے ہیں۔ سٹرکچرڈ ریڈیکشن شیڈو منسلک ٹرانسکرپٹ ٹیکسٹ کی حفاظت کرتے ہیں، جبکہ اصل کالر کی ملکیت والی درخواست میں کوئی تبدیلی نہیں ہوتی۔ مقامی حمایت یافتہ اہداف اور غیر فعال پل اپنا موجودہ بائی پاس سلوک برقرار رکھتے ہیں۔

اضافی برقرار رکھی ہوئی کاپیاں اسی مشاہدہ شدہ درخواست کے سگنل کا استعمال کرتی ہیں۔ خام پری گارڈریل کلائنٹ کی درخواست کا سنیپ شاٹ، میموری میں زیر التواء درخواست، اور ابتدائی مسترد شدہ درخواست کا لاگ ساختی طور پر ویڈیو حصوں میں ٹرانسکرپٹ فیلڈز کو تبدیل کرتا ہے۔ پائپ لائن کے مراحل اور سیاق و سباق کے ہینڈ آف کے ذریعہ ترکیب شدہ سٹرنگ پرامپٹس کو مستقل-درخواست-باڈی سنک پر دوبارہ ترتیب دیا جاتا ہے۔ مسلسل `video_content_removed` مارکر `previous_response_id` تسلسل کو ناکام بناتا ہے بجائے اس کے کہ جان بوجھ کر ضائع کیے گئے متن کو دوبارہ تشکیل دیا جائے۔ اگر ایک مشاہدہ شدہ درخواست لاگ ان کرنے سے پہلے اپنا فی پارٹ ریڈیکشن شیڈو کھو دیتی ہے، یا بعد میں درخواست کی تبدیلیوں کے بعد کئی ویڈیو شیڈو میں سے ایک بھی میچ کرنے میں ناکام ہو جاتا ہے، تو برقرار رکھی گئی درخواست کا حصہ جزوی طور پر ترمیم شدہ ٹرانسکرپٹ کو برقرار رکھنے کے بجائے مکمل طور پر خارج کر دیا جاتا ہے۔

ایک مشاہدہ شدہ درخواست کے لیے، ایک ماڈل کا جواب نقل کے کسی بھی حصے کو بغیر ساختی کیو باؤنڈری کے حوالہ دے سکتا ہے۔ اس کے مستقل کال لاگ `responseBody` کی جگہ ایک اوشن مارکر ہے۔ تفصیلی پائپ لائن آرٹفیکٹ (جس میں upstream/client باڈیز اور اسٹریم چنکس شامل ہو سکتے ہیں) کو برقرار نہیں رکھا گیا ہے۔ اس درخواست کے لیے سیمنٹک، آئیڈیمپوٹینسی، اور ریجننگ ری پلے کیشز کو بائی پاس پڑھتا اور لکھتا ہے۔ فراہم کنندہ کی درخواست اور کلائنٹ کے نظر آنے والے جواب میں کوئی تبدیلی نہیں ہوئی ہے۔ ابتدائی کیپ لائیو بائٹس کو عارضی بفر سے نکال دیا جاتا ہے جب تفصیلی آرٹفیکٹ کو چھوڑ دیا جاتا ہے۔ Kiro کی خراب شکل والی EventStream وارننگ صرف پے لوڈ بائٹ کی گنتی کی اطلاع دیتی ہے، کبھی بھی اس کے مواد یا JSON پارسر کی خام غلطی نہیں ہوتی۔ یہ دعویٰ نہیں کرتا کہ ہر غیر متعلقہ provider/plugin تشخیص کا آڈٹ کیا گیا ہے۔ وسیع تر ریٹینڈ سنک سویپ کو #11658 میں ٹریک کیا جاتا ہے۔

اندرونی `/api/modality-bridge/video/drilldown` لائف سائیکل ایک الگ، loopback/token-authenticated کیشے سبسٹریٹ ہے۔ ہر آپریشن کے لیے کینونیکل اوپیک پرنسپل ID کی بھی ضرورت ہوتی ہے۔ پروڈکشن کالر کو فعال کرنے سے پہلے، اسے ID کو مستند کرایہ دار سے اخذ کرنا چاہیے اور اسے کلائنٹ کے ذریعے منتخب کردہ قدر کو کبھی بھی آگے نہیں بھیجنا چاہیے۔ کیش کیز اس پرنسپل کو کیننیکل سیشن اور ویڈیو ریفرنس IDs سے منسلک کرتی ہیں، صرف ان کی SHA-256-derived کیز کو اسٹور کرتی ہیں، اور اسی پرنسپل کو پڑھنے اور حذف کرنے دونوں کا دائرہ کار رکھتی ہیں۔ کیش زیادہ سے زیادہ 16 ماخوذ JPEG فریمز فی اندراج ذخیرہ کرتا ہے، دس منٹ کے بعد ان کی میعاد ختم ہو جاتی ہے، اور باؤنڈڈ `start`/`end` ریڈز یا واضح سیشن کو حذف کرنے کی حمایت کرتا ہے۔

ہر پرنسپل 16 اندراجات اور 64 MiB کینونیکل JPEG ڈیٹا تک محدود ہے۔ وہ حدود عالمی 64-entry/256 MiB حد سے آزاد ہیں: پرنسپل کوٹہ کا دباؤ صرف اس پرنسپل کی کم از کم استعمال شدہ اندراجات کو خارج کرتا ہے جو عالمی LRU بے دخلی پر غور کیا جاتا ہے۔ میعاد ختم ہونے والی اندراجات کو کیش سرگرمی پر پرنسپل اور عالمی اکاؤنٹنگ دونوں سے ہٹا دیا جاتا ہے، جب کہ منسوخی اور توثیق کی ناکامی جزوی متبادل کا ارتکاب نہیں کرتی ہے۔

کیشے غیر کینونیکل Base64، اضافی پیڈنگ، نان JPEG میڈیا، خراب یا کٹے ہوئے JPEGs، اور JPEGs کو مسترد کرتا ہے جو باؤنڈڈ فل امیج `sharp` ڈی کوڈ کے دوران انتباہ پیدا کرتا ہے۔ یہ ہر ایک قبول شدہ تصویر کو کیننیکل JPEG کے طور پر دوبارہ انکوڈ کرتا ہے، کالر فیلڈز پر بھروسہ کرنے کے بجائے ڈی کوڈ شدہ بائٹس سے چوڑائی اور اونچائی حاصل کرتا ہے، اور کسی بھی ٹریلنگ پولی گلوٹ بائٹس کو برقرار رکھنے کے بجائے مسترد کر دیتا ہے۔ دونوں کوٹوں سے صرف باؤنڈڈ کیننیکل کمپریسڈ بفر چارج کیا جاتا ہے۔ JSON وائر کی حد میں 32 MiB ڈی کوڈ ان پٹ سیلنگ کے لیے Base64 اوور ہیڈ شامل ہے۔ ہر ذخیرہ شدہ اخذ اس کی توثیق شدہ JPEG format/resolution، نمونے لینے کی پالیسی، اخذ کرنے والا ورژن، تخلیق کا وقت، سرور کے حساب سے مواد کا ہیش، اور ہیش شدہ پیرنٹ ریفرنس کے علاوہ قابل بھروسہ کالر کے والدین کے مواد کا ہیش ریکارڈ کرتا ہے۔ ایٹمک کیش کمٹ سے پہلے غیر مطابقت پذیر decode/hash مراحل کے درمیان منسوخی کی جانچ پڑتال کی جاتی ہے۔

پروڈکشن پروڈیوسر کامیاب بصری تجزیہ کے بعد ہی پہلے سے حاصل کردہ بروکر فریموں کو دوبارہ استعمال کرتا ہے، بغیر کوئی ویڈیو download/extraction. اس کے لیے آپریٹر `modalityBridgeVideoDrilldownEnabled=true`، سخت فی پارٹ `drilldown: true`، اور ایک توثیق شدہ API- کلید ریکارڈ ID کی ضرورت ہوتی ہے۔ کلائنٹ کے ذریعہ اعلان کردہ principal/session اقدار کبھی بھی ملکیت قائم نہیں کرتی ہیں۔ تینوں شرائط کے بغیر یہ اضافی فریموں کو ہیش، سائز تبدیل یا برقرار نہیں رکھتا ہے۔ برقرار رکھنے میں ناکامی قابل استعمال بصری ردعمل کو محفوظ رکھتی ہے۔ منظور شدہ درخواستیں پورے ویڈیو رزلٹ کیشے کو نظرانداز کرتی ہیں اس لیے کیش شدہ نتائج کبھی بھی ہینڈلز کو دوبارہ نہیں چلاتے۔

JSON اور SSE کامیاب جوابات باؤنڈڈ `x-omniroute-video-drilldown` ہیڈر میں زیادہ سے زیادہ چار مبہم ہینڈلز کو ظاہر کرتے ہیں۔ مجاز براؤزر کی اصل CORS اصل پالیسی کو وسیع کیے بغیر اس ہیڈر کو پڑھ سکتی ہے۔ نئے ہینڈلز `v1.<32-byte random base64url token>` استعمال کرتے ہیں، اور رجسٹری صرف اپنی SHA-256 ہیشز کو برقرار رکھتی ہے۔ reader/header تجزیہ کار میراثی 64-ہیکس ٹوکنز کو بھی قبول کرتا ہے۔ مستند عوامی صارف `GET /api/v1/video-bridge/drilldown?handle=...` ہے، آزادانہ طور پر `modalityBridgeVideoDrilldownRemoteEnabled=true` کے ذریعے گیٹ کیا گیا ہے۔ وراثت `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env فال بیک کے فعال ہونے پر بھی واضح طور پر برقرار جھوٹی رسائی کو منسوخ کر دیتی ہے۔ پروڈکشن برقرار رکھنے میں یکساں لیگیسی `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` فال بیک ہے۔ دونوں فال بیکس ڈیفالٹ آف ہیں۔

صارف تصدیق شدہ کلید سے ملکیت حاصل کرتا ہے اور کلیدی پالیسی کا اطلاق کرتا ہے: GET اور DELETE دونوں کا تعلق `video` اینڈ پوائنٹ کے زمرے سے ہے، بشمول `/v1` اور `/api/v1` عرفی نام۔ بغیر خالی اختتامی نقطہ کی اجازت کی فہرست والی کلیدوں میں `video` شامل ہونا ضروری ہے۔ غیر محدود چابیاں مطابقت رکھتی ہیں۔ صارف وہی 404 واپس کرتا ہے جو نامعلوم، ایکسپائرڈ اور کسی اور کلید کے ہینڈلز کے لیے ہے۔ `page` `variant=preview|standard|detail` `start` `frames` 320/640/1280 `limit=1..8` JPEG `end` ڈپلیکیٹ استفسار کیز اور ریورس فوکس ونڈوز کو مسترد کر دیا گیا ہے۔ واپس آنے والے ہر ویریئنٹ میں اس کے اصل مواد اور اصل ریزولوشن میٹا ڈیٹا کی ایک ہیش ہوتی ہے، جو برقرار رکھے ہوئے ذریعہ سے منسلک ہوتی ہے۔ متغیرات اضافی برقرار کاپیوں کے طور پر ذخیرہ کرنے کے بجائے پڑھنے پر اخذ کیے جاتے ہیں۔ JSON جواب، بشمول Base64/envelope، 32 MiB پر محدود ہے؛ ایک بڑا صفحہ 413 لوٹاتا ہے اور کلائنٹ کو کم فریموں کی درخواست کرنی ہوگی۔ ہر ایک کے سائز کے ارد گرد چیک منسوخی پڑھتا ہے اور واپس آنے سے پہلے ہینڈل کی درستگی کو دوبارہ چیک کرتا ہے۔ مالک کی طرف سے `DELETE` بے ضمیر ہے؛ حذف کرنے یا TTL میعاد ختم ہونے سے برقرار رکھا ذریعہ اور استعمال کا حساب کتاب جاری ہوتا ہے۔

مشترکہ اسٹور پروسیس لوکل ہے: ہینڈلز دوبارہ شروع ہونے پر ختم ہوجاتے ہیں اور آزاد OmniRoute عمل کے درمیان منتقلی کے قابل نہیں ہوتے ہیں۔ انتظامی اعدادوشمار مؤثر برقرار رکھنے/ دور دراز کی پالیسی کو ظاہر کرتے ہیں اور صرف entries/bytes کو جمع کرتے ہیں، کبھی بھی میڈیا، حوالہ جات، پرنسپل IDs یا ہینڈلز نہیں۔ ویڈیو کی ترتیبات کا پینل ان اقدار کو دکھاتا ہے اور رضامندی کے دونوں سوئچز کو برقرار رکھ سکتا ہے۔ یہ عمل درآمد دستاویز لائیو تعیناتی یا پروموشن ثبوت نہیں ہے۔ اصلی ماڈل کی قبولیت کو الگ سے ٹریک کیا جاتا ہے۔

ترتیب شدہ ویڈیو ماڈل کے ساتھ فریموں کو ترتیب وار عنوان دیا گیا ہے۔ ایک خالی ویڈیو اوور رائیڈ وژن کی ترتیب کو وراثت میں دیتی ہے۔ اگر دونوں خالی ہیں، تو ویژن آٹو راؤٹر مؤثر وژن کے قابل ماڈل کا انتخاب کرتا ہے۔ کامیاب کیپشن اصل حصے کو ایک مستحکم `[Video description:` سابقہ سے بدل دیتے ہیں جو متن کو میڈیا سے حاصل کردہ ناقابل اعتماد مشاہدے کے طور پر بھی نشان زد کرتا ہے اور نیچے دھارے کے ماڈلز سے کہتا ہے کہ میڈیا میں پائی جانے والی ہدایات پر عمل نہ کریں۔ فریم کیپشن کیشے کیز میں JPEG بائٹس، پرامپٹ، ٹائم اسٹیمپ، اور موثر ماڈل شامل ہیں۔ صرف کامیاب سرخیوں کو کیش کیا جاتا ہے۔ کیش اندراجات حقیقی کامیاب پروڈیوسر ماڈل کو برقرار رکھتی ہیں، بشمول فال بیک ماڈل؛ پل `mixed` کی رپورٹ کرتا ہے جب مختلف ماڈلز کے ذریعہ مختلف فریم تیار کیے گئے تھے۔ ایک کیش ہٹ اس پروڈیوسر کی شناخت کو درخواست کردہ روٹنگ پلان کے طور پر ری لیبل کرنے کے بجائے دوبارہ استعمال کرتا ہے۔ پورے ویڈیو رزلٹ کیش کو ہر ان پٹ پر کلید کیا جاتا ہے جو آؤٹ پٹ — پرامپٹ، موثر ماڈل، نمونے لینے کی پالیسی، فریم کاؤنٹ، سیمنٹک تجزیہ موڈ، نارملائزڈ فوکس اشارے کا SHA-256 فنگر پرنٹ، فوکس ونڈو، `transcript`، `audioTranscript` اور کانٹیکٹ شیٹ فلیگ — کو تبدیل کرتا ہے، اس لیے ان میں سے کسی بھی کیچ کو تبدیل کرنے سے کبھی بھی کمی محسوس نہیں ہوتی۔ بصری ڈیڈ اپ پالیسی ورژن، حد، اور باؤنڈڈ امیدوار کے فریم کی گنتی نتیجہ کیش کلید اور میٹا ڈیٹا میں بھی واضح ہیں۔ اس لیے پالیسی میں تبدیلی ایک باسی پوری ویڈیو کی تفصیل کو دوبارہ استعمال نہیں کر سکتی۔ رزلٹ کیش v4 میٹا ڈیٹا موڈ اور فنگر پرنٹ کو برقرار رکھتا ہے، کبھی بھی خام صارف کا کام نہیں۔ گارڈریل میٹا ڈیٹا درخواست کردہ اور مؤثر تجزیہ طریقوں دونوں کی رپورٹ کرتا ہے۔ قابل استعمال صارف متن کے بغیر درخواست کردہ `focused` موڈ کو مؤثر طریقے سے `full` کے طور پر رپورٹ کیا جاتا ہے۔

گارڈریل ہر تعاون یافتہ ویڈیو حصے کو نکالتا ہے لیکن `modalityBridgeVideoMaxVideos` سے زیادہ کی وضاحت نہیں کرتا ہے۔ `supportsVideo === false` ثابت شدہ ہدف کے لیے، ناکام اور حد سے زیادہ ویڈیوز واضح محفوظ ٹیکسٹ مارکر بن جاتے ہیں تاکہ کوئی خام ویڈیو باقی نہ رہے۔ جب صلاحیت نامعلوم ہے، وہ حصے اپنے ویڈیو کیریئر کو برقرار رکھتے ہیں۔ کوئی بھی فال بیک ٹرانسکرپٹ اوپر باؤنڈڈ ٹیکسٹ کنورژن کی پیروی کرتا ہے۔ `supportsVideo === true` کے ساتھ اہداف پل کو بائی پاس کرتے ہیں۔ کلائنٹ کی درخواست اسقاط کا سگنل ڈاؤن لوڈ، بروکر کیو، سب پروسیس، اور کیپشن کالز کے ذریعے پھیلتا ہے۔ ابارٹس ویڈیوز کے درمیان رک جاتے ہیں اور خام میڈیا کے لیے کبھی بھی ناکام نہیں ہوتے۔

رن ٹائم کی ترتیبات ڈی بی کی حمایت یافتہ اور زوڈ کی توثیق شدہ ہیں:

| چابی                                | طے شدہ      | رینج/رویہ                                                                                                       |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | اختیاری رن ٹائم، آپٹ ان                                                                                         |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` عام کیپشنز کو محفوظ رکھتا ہے۔ `focused` پابند، ناقابل اعتماد تازہ ترین صارف سیاق و سباق استعمال کرتا ہے۔ |
| `modalityBridgeVideoModel`          | `""`        | وژن برج ماڈل کو وراثت میں حاصل کریں۔                                                                            |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                            |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, یا متناسب `segment_aware`; ڈیٹیکٹر کی ناکامی واپس `uniform` پر آتی ہے۔                |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                             |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                  |

120 سیکنڈ سے اوپر کی ویڈیو ٹائم آؤٹ ویلیوز کو بروکر کی ڈیڈ لائن میں بند کر دیا گیا ہے۔ نئی ترتیبات اس حد سے اوپر لکھتی ہیں مسترد کر دی جاتی ہیں۔ `GET /api/modality-bridge/video/runtime` تصدیق یا رن ٹائم پروبنگ سے پہلے بھروسہ مند اسٹیمپڈ لوپ بیک لوکلٹی کی ضرورت ہوتی ہے، پھر انتظامی تصدیق کی ضرورت ہوتی ہے۔ یہ صرف `available`، سینیٹائزڈ FFmpeg/ffprobe ورژن، اور رن ٹائم دستیاب نہ ہونے پر ایک مقررہ وجہ واپس کرتا ہے۔ اندرونی نکالنے کا اختتامی نقطہ عوامی اپ لوڈ API نہیں ہے: قطار سیچوریشن `503` پلس `Retry-After` واپس کرتا ہے، ایک کالر منقطع `499` واپس کرتا ہے، اور مقررہ بروکر کی آخری تاریخ `504` واپس کرتی ہے۔ تبدیل شدہ جوابات ویژن یا آڈیو سیگمنٹس کو ہٹائے بغیر `video->text;model=<visionModel>;parts=<videos>` کو مرکزی `x-omniroute-modality-bridge` ہیڈر میں شامل کرتے ہیں۔

### PII Masker (`piiMasker.ts`)

پر چلتا ہے۔**دونوں** مراحل

- **`preCall`** پے لوڈ کو کلون کرتا ہے، `system`، `messages`، `input`، اور `prompt` (بشمول سادہ سٹرنگ آئٹمز) کو چلتا ہے، اور `content`/`text` فیلڈز پر `processPII()` ( `@/shared/utils/inputSanitizer` سے) کا اطلاق کرتا ہے۔ جب `PII_REDACTION_ENABLED=true`، پتہ چلا PII آؤٹ باؤنڈ پے لوڈ میں درست کیا جاتا ہے۔ یہ `INPUT_SANITIZER_MODE` سے آزاد ہے (جو صرف فوری انجیکشن پالیسی کو کنٹرول کرتا ہے)۔ جب ریڈیکشن آف ہوتا ہے، کال ریکارڈ کا پتہ لگانے کی گنتی مواد کو دوبارہ لکھے بغیر۔
- **`postCall`** جواب کو گہرا کلون کرتا ہے، `sanitizePIIResponse()` کے علاوہ Responses-API-شکل ماسکر چلاتا ہے (`maskResponsesOutput` — `output_text` اور `output[].content[].text` کا احاطہ کرتا ہے)۔ اگر کوئی رد عمل ہوتا ہے تو، ترمیم شدہ جواب اصل کی جگہ لے لیتا ہے۔

ریل کبھی نہیں روکتی۔ یہ صرف تشریح کرتا ہے (`meta.detections`, `meta.redacted`) یا دوبارہ لکھتا ہے۔

#### فی قسم کا انتخاب، حسب ضرورت پیٹرن اور پتہ لگانے والے کاؤنٹر

**ڈیش بورڈ → سیٹنگز → سیکیورٹی → PII ماسکنگ** منتخب کرتا ہے _what_ نقاب پوش ہے۔ یہ ماسکنگ کو آن نہیں کرتا ہے: یہ اب بھی `PII_REDACTION_ENABLED` (درخواست) اور `PII_RESPONSE_SANITIZATION` (جواب + SSE) ہے، دونوں بذریعہ ڈیفالٹ آف ہیں۔

- **فی قسم کا انتخاب** — بلٹ ان آئی ڈیز `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) میں درج ہیں۔ غیر سیٹ کا مطلب ہے ہر قسم (اس ترتیب سے پہلے کا برتاؤ موجود تھا)۔ درخواست کے انجن کا `ssn_us` پیٹرن `ssn` پر نقشہ بناتا ہے۔ ٹیمپلیٹس (کم سے کم، معیاری، مالیاتی، برازیلین، USA، GDPR، POPIA، مکمل) صرف UI میں چیک باکسز کو بھرتے ہیں۔
- **GDPR اور POPIA شناخت کنندگان** — بارہ بلٹ ان آئی ڈیز EU اور جنوبی افریقی ذاتی شناخت کنندگان کا احاطہ کرتی ہیں (نیچے جدول)۔ ان کے ریجیکس، توثیق کرنے والے اور دائرہ اختیار کے ٹیگز ایک ٹیبل، `src/shared/utils/piiPatterns.ts` میں رہتے ہیں، جسے ریسپانس سینیٹائزر (`src/lib/piiSanitizer.ts`) اور درخواست ماسکر (`src/shared/utils/inputSanitizer.ts`) دونوں استعمال کرتے ہیں۔ ایک میچ کو تب ہی درست کیا جاتا ہے جب اس کا توثیق کنندہ اسے قبول کرتا ہے۔ ہندسوں کی ایک ننگی رن کبھی بھی کافی نہیں ہوتی ہے۔ ایک آپریٹر جس نے ان ids کے موجود ہونے سے پہلے ایک تنگ انتخاب کو محفوظ کیا تھا وہ اس طرز عمل کو برقرار رکھتا ہے جب تک کہ نئی ids پر ٹک نہ لگ جائے۔
- **اپنی مرضی کے پیٹرن** — 20 ریجیکس یا وائلڈ کارڈ پیٹرن تک (`*` = 64 غیر وائٹ اسپیس حروف تک، `?` = ایک)۔ میچز `[CUSTOM_REDACTED]` بن جاتے ہیں۔ ہر پیٹرن `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`) سے گزرتا ہے: زیادہ سے زیادہ 500 حروف، `g i m s u` تک محدود جھنڈوں کو مرتب کرنا چاہیے، `safe-regex` پاس کرنا چاہیے (تباہ کن بیک ٹریکنگ)، اور کسی خالی سٹرنگ یا ریڈیکشن پلیس ہولڈر سے مماثل نہیں ہونا چاہیے۔ ایک پیٹرن جو ناکام ہوجاتا ہے اسے محفوظ کرنے اور جانچنے پر انکار کردیا جاتا ہے، اور ایک ذخیرہ شدہ قطار جو ناکام ہوجاتی ہے اسے مرتب کرنے کے بجائے رن ٹائم پر چھوڑ دیا جاتا ہے۔ اپنی مرضی کے پیٹرن صرف اس وقت چلتے ہیں جب ماسکنگ آن ہو۔
- **پتہ لگانے والے کاؤنٹر** — فی قسم کی گنتی (کبھی مماثل اقدار)، میموری میں رکھی گئی اور دوبارہ شروع کرنے پر دوبارہ ترتیب دیں (`src/lib/pii/piiDetectionStats.ts`)۔ وہ صرف اس وقت بڑھتے ہیں جب ماسکنگ آن ہو۔

سیٹنگز `key_value` ٹیبل (نیم اسپیس `pii_settings`، `src/lib/db/piiSettings.ts`) میں رہتی ہیں اور 1 s کیشے کے ذریعے پڑھی جاتی ہیں۔ API:

| طریقہ  | راستہ                    | مقصد                                                                            |
| ------ | ------------------------ | ------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | فلیگ کی حالت، `enabledTypes`، `customPatterns`، شناختی کاؤنٹرز                  |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = تمام) اور/یا `customPatterns` کو تبدیل کرنا            |
| `POST` | `/api/settings/pii/test` | زیادہ سے زیادہ 8 KB کے نمونے کے خلاف ایک پیٹرن کا ڈرائی رن؛ کچھ محفوظ نہیں ہوتا |

تینوں کو انتظامی تصدیق کی ضرورت ہوتی ہے اور Zod (`src/shared/validation/schemas/piiSettings.ts`) کے ساتھ باڈی کی توثیق کرتے ہیں۔ لاگ ان کے غیر فعال ہونے کے ساتھ (`requireLogin=false`) `GET` اور ٹیسٹ اینڈ پوائنٹ کھلا ہوا ہے، لیکن `PUT` کو ابھی بھی ڈیش بورڈ سیشن، `manage` -scope API کلید، لکھنے کی گنجائش یا اس سے زیادہ کے ساتھ `oma_` رسائی ٹوکن، یا CLI ٹوکن یا لوپ بیک سے بھیجے گئے اندرونی سروس ٹوکن کی ضرورت ہے۔

#### GDPR (EU) اور POPIA (جنوبی افریقہ) شناخت کنندگان

| ID                  | شناخت کنندہ              | جانچ                                                                     |
| ------------------- | ------------------------ | ------------------------------------------------------------------------ |
| `iban`              | IBAN                     | معلوم ملک، اس ملک کی عین لمبائی، ISO 13616 MOD-97-10                     |
| `eu_vat`            | یورپی VAT نمبر           | معلوم رکن ملک کا سابقہ اور اسی ملک کا عددی نمونہ (VIES تلاش نہیں)        |
| `es_dni_nie`        | ہسپانوی DNI / NIE        | کنٹرول حرف (قدر mod 23)؛ NIE، `X/Y/Z` + 7 ہندسے ہے                       |
| `it_codice_fiscale` | اطالوی Codice Fiscale    | طاق/جفت مقامات کے جدول سے کنٹرول حرف                                     |
| `pl_pesel`          | پولش PESEL               | وزن دار چیک سم اور مرموز پیدائشی ماہ/دن کی معقول حدود                    |
| `nl_bsn`            | ڈچ BSN                   | 11-proof جانچ (وزن 9..2, -1)                                             |
| `de_steuer_id`      | جرمن Steuer-ID           | ISO 7064 Mod 11,10 اور ہندسوں کی ساخت کے قواعد (ابتدا میں 0 نہیں)        |
| `se_personnummer`   | سویڈش personnummer       | آخری دس ہندسوں پر Luhn اور معقول تاریخ پیدائش (10 یا 12 ہندسے)           |
| `za_id`             | جنوبی افریقی شناختی نمبر | تمام 13 ہندسوں پر Luhn، درست پیدائشی ماہ/دن، شہریت کا ہندسہ 0 یا 1       |
| `za_phone`          | جنوبی افریقی فون         | `+27` / `27` سابقہ، یا قومی `0..` شکل میں اسپیس یا ہائفن                 |
| `za_vat`            | جنوبی افریقی VAT نمبر    | `4` سے شروع 10 ہندسے **اور** پچھلے 48 حروف میں "VAT" / "BTW"             |
| `za_tax_ref`        | جنوبی افریقی ٹیکس حوالہ  | `0`-`3` سے شروع 10 ہندسے، Luhn، **اور** پچھلے 48 حروف میں "tax" / "SARS" |

چونکہ صرف ہندسوں کے فارمیٹس آرڈر نمبرز، بلڈ نمبرز اور ٹائم اسٹیمپ سے ٹکرا جاتے ہیں، اس لیے کمزور ترین (`za_vat`, `za_tax_ref`) کو کلیدی لفظ کی ضرورت ہوتی ہے، اور ایک ننگے دس ہندسوں والے `0..` نمبر کو جنوبی افریقی فون نمبر کے طور پر نہیں مانا جاتا ہے۔ فاصلہ والا IBANs (`GB29 NWBK ...`) مماثل نہیں ہے۔ اسٹریمنگ پاتھ پر کیو کو صرف موجودہ حصے کے اندر دیکھا جاتا ہے۔ آئی ڈیز فون کے عمومی نمونوں سے آگے ہوتی ہیں، اس لیے ایک توثیق شدہ شناخت کنندہ اپنا پلیس ہولڈر (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...) رکھتا ہے۔ `gdpr` اور `popia` ٹیمپلیٹس بالترتیب EU اور جنوبی افریقی آئی ڈیز کا انتخاب کرتے ہیں۔ ماسکنگ خود آپٹ ان رہتی ہے (ہارڈ رول #20): یہاں کوئی بھی چیز فیچر فلیگ ڈیفالٹ کو تبدیل نہیں کرتی ہے۔

### پرامپٹ انجیکشن (`promptInjection.ts`)

صارف کے فراہم کردہ مواد میں دشمنانہ ڈھانچوں کی شناخت کرتا ہے اور ترتیب شدہ
پالیسی نافذ کرتا ہے۔ رویہ ماحول متغیرات اور کناسٹرکٹر اختیارات سے کنٹرول ہوتا ہے:

| ترتیب      | ماحول متغیر                                                                                       | پہلے سے طے شدہ | اثر                                                                                                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| فعال       | `INPUT_SANITIZER_ENABLED`                                                                         | `true`         | جب `false` ہو تو گارڈ ریل فوری بائی پاس (short-circuit) ہو جاتا ہے۔                                                                                                                                     |
| موڈ        | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                   | `warn`         | انجیکشن پالیسی: `block`، `warn`، یا `log`۔ (`redact` پچھلی مطابقت کے لیے قبول کیا جاتا ہے مگر انجیکشن متن کو ہٹاتا **نہیں**؛ درخواست کی PII از سرِ نو تحریر `PII_REDACTION_ENABLED` سے کنٹرول ہوتی ہے۔) |
| بلاک کی حد | `blockThreshold` آپشن / `INPUT_SANITIZER_BLOCK_THRESHOLD` (عرف `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`         | بلاک کے لیے درکار کم از کم شدت۔ پہلے سے طے شدہ پر Medium صرف مشاہدے کے لیے ہوتی ہے۔                                                                                                                     |

**موڈ کی ترجیح** (`getMode`): کال کرنے والے کا `options.mode` →
`INJECTION_GUARD_MODE` **DB فیچر فلیگ اوور رائیڈ** (ڈیش بورڈ → ترتیبات → فیچر
فلیگز) → `INJECTION_GUARD_MODE` ماحول متغیر → `INPUT_SANITIZER_MODE` ماحول متغیر
→ `warn`۔ لہٰذا ڈیش بورڈ اوور رائیڈ ماحول متغیرات پر غالب آتا ہے، یعنی فیچر
فلیگز UI چلتے ہوئے گارڈ کو براہِ راست کنٹرول کرتا ہے (دوبارہ آغاز کے بغیر)۔ DB
پڑھائی فیل سیف ہے: اگر اس میں خرابی آئے تو گارڈ ماحول متغیر پر مبنی رویے کی طرف
واپس چلا جاتا ہے، اور جب کوئی اوور رائیڈ مقرر نہ ہو تو رویہ صرف ماحول متغیر والے
حل کے عین مطابق ہوتا ہے۔

شناخت کے ذرائع:

1. `sanitizeRequest()` جو `@/shared/utils/inputSanitizer` سے (وہی مشترکہ ڈیٹیکٹر
   سیٹ جو پائپ لائن میں دیگر مقامات پر بھی استعمال ہوتا ہے)۔
2. بلٹ اِن `DEFAULT_GUARD_PATTERNS` (فی الحال `system_override_inline` اور
   `markdown_system_block`، دونوں `high` شدت والے)۔
3. اختیاری `customPatterns` جو کناسٹرکٹر اختیارات کے ذریعے دیے جاتے ہیں
   (اسٹرنگز، ریجیکس، یا `{ name, pattern, severity }` ریکارڈز)۔

جب `mode === "block"` ہو **اور** کم از کم ایک detection شدت کے threshold کو پورا کرتی ہو، تو `preCall` یہ واپس کرتا ہے `{ block: true, message: "Request rejected: suspicious content detected" }`۔ `warn`/`log` موڈز میں guardrail صرف log کرتا ہے لیکن call کو اجازت دیتا ہے۔ مشترکہ helper `evaluatePromptInjection()` بھی export کیا گیا ہے ان callers کے لیے جنہیں registry سے گزرے بغیر prompts کا جائزہ لینا ہو۔

**Scan bound (v3.8.20):** detector صرف جوڑے گئے prompt text کے **پہلے 16 KB** کا معائنہ کرتا ہے — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) جو `src/shared/utils/inputSanitizer.ts` میں ہے۔ `detectInjection()` اور `evaluatePromptInjection()` دونوں pattern loop چلانے سے پہلے `slice(0, MAX_INJECTION_SCAN_BYTES)` کرتے ہیں۔ Injection ہدایات عموماً input کے اوپری حصے میں ہوتی ہیں، لہٰذا یہ کئی سو KB والے payloads پر regex CPU/GC کی حد مقرر کرتا ہے بغیر detection کو کمزور کیے (دیکھیں #3932، #4041)۔

### Credential Masker (`credentialMasker.ts`)

**دونوں** مراحل پر چلتا ہے، default chain میں آخری (priority `95`)۔ outbound payload (message کا مواد، tool-call arguments، tool results) **اور** provider response سے معروف API-key / secret-token patterns کو redact کرتا ہے، تاکہ prompt میں چسپاں کی گئی کوئی credential (یا tool result کی طرف سے واپس آنے والی) upstream provider یا client کو leak نہ ہو۔

- **صرف opt-in**، وہی طریقہ جو PII redaction کا ہے (Hard Rule #20 سے ملتا جلتا): غیر فعال رہتا ہے جب تک `settings.credentialRedactionEnabled === true` نہ ہو **یا** `CREDENTIAL_REDACTION_ENABLED=true`۔ بند ہونے کی صورت میں guardrail ایک no-op ہے — یہ کبھی block نہیں کرتا اور کبھی rewrite نہیں کرتا۔
- `redactCredentials()` پورے payload/response tree کو traverse کرتا ہے (`walkValue()`، prototype-pollution سے محفوظ، `WeakSet` کے ذریعے cycle-safe) اور matches کو `[REDACTED:<type>]` placeholder سے بدل دیتا ہے، اور صرف ان branches کی clone بناتا ہے جو واقعی تبدیل ہوئی ہوں۔
- `CREDENTIAL_PATTERNS` میں LLM provider keys (OpenAI، OpenAI-proj، Anthropic، Google، Hugging Face، Replicate)، VCS/SaaS tokens (GitHub، Slack، Linear، Notion، npm، Postman، Discord)، payment keys (Stripe، Square)، cloud keys (AWS access key، Twilio، SendGrid، Mailgun)، private keys / JWTs، credentials والی connection strings (`mongodb://user:pass@...` وغیرہ)، اور ایک عمومی `Authorization`/`x-api-key`/`api-key`/`apikey` header-value pattern شامل ہیں۔ header کی شکل والے keys (`authorization`، `x-api-key`، `api-key`، `apikey`) ساختی طور پر redact کیے جاتے ہیں (صرف value، scheme prefix جیسے `Bearer `/`Basic ` محفوظ رہتا ہے) بجائے عمومی text regex کے۔
- guardrail کبھی block نہیں کرتا؛ یہ صرف rewrite کرتا ہے (`modifiedPayload` / `modifiedResponse`) اور annotation فراہم کرتا ہے (`meta.credentialsRedacted`، `meta.count`)۔

ریگریشن گارڈ: `tests/unit/credential-masker-guardrail.test.ts`۔

## بنیادی معاہدہ (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true زنجیر کو شارٹ سرکٹ کر دیتا ہے
  message?: string; // بلاک کرنے کی صورت میں ظاہر کیا جاتا ہے
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // درخواست کو از سر نو لکھنے کے لیے preCall کی جانب سے لوٹایا جاتا ہے
  modifiedResponse?: TValue; // جواب کو از سر نو لکھنے کے لیے postCall کی جانب سے لوٹایا جاتا ہے
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

گارڈریل `void`، `{}`، یا `{ block: false }` میں سے کوئی بھی لوٹا کر "کوئی تبدیلی نہیں" کا اشارہ دیتا ہے۔ `modifiedPayload`/`modifiedResponse` لوٹانے سے زنجیر میں بہتی ہوئی قدر کو آگے کے گارڈریلز کے لیے بدل دیا جاتا ہے۔
`signal?: AbortSignal` کال کرنے والے کے لائف سائیکل کو گارڈریلز تک پہنچاتا ہے۔ درخواست کا abort جان بوجھ کر رکھی گئی fail-open استثنا ہے: میڈیا برجز کام روک کر صفائی کر دیتے ہیں، اور خام میڈیا کو ایسے ہدف پر بحال نہیں کرتے جس کے بارے میں معلوم ہو کہ وہ اسے سپورٹ نہیں کرتا۔

## رجسٹری (`registry.ts`)

سنگلٹن `guardrailRegistry` درج ذیل فراہم کرتا ہے:

- `register(guardrail)` — ایک گارڈریل شامل کرتا ہے (یا نارملائز شدہ نام کی بنیاد پر تبدیل کر دیتا ہے) اور `priority` کی صعودی ترتیب کے مطابق دوبارہ ترتیب دیتا ہے۔
- `clear()` / `list()` — انتظامی معاون فنکشنز۔
- `runPreCallHooks(payload, context)` — فعال گارڈریلز پر چلتا ہے، پے لوڈ کو `modifiedPayload` کے ذریعے آگے منتقل کرتا ہے، اور پہلے `block: true` پر رک جاتا ہے۔
- `runPostCallHooks(response, context)` — جواب کی طرف بھی وہی بہاؤ۔
- `resetGuardrailsForTests({ registerDefaults })` — حالت صاف کرتا ہے اور اختیاری طور پر ڈیفالٹس کو دوبارہ رجسٹر کرتا ہے تاکہ ٹیسٹ کی صاف ستھری علیحدگی حاصل ہو۔

دونوں رنرز `{ blocked, payload|response, results, guardrail?, message? }` لوٹاتے ہیں، جہاں `results` `GuardrailExecutionResult` ریکارڈز کی ایک صف ہے جس میں فی-گارڈریل `blocked`، `skipped`، `modified`، `error`، اور `meta` فیلڈز شامل ہیں، جو ٹریسنگ کے لیے مفید ہیں۔

### فی-درخواست گارڈریلز کو غیر فعال کرنا

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` ان گارڈریل ناموں کی ڈی-ڈپلیکیٹ شدہ فہرست مرتب کرتا ہے جنہیں موجودہ درخواست کے لیے چھوڑنا چاہیے۔ پانچ چینلز ہیں، جو اسی ترتیب سے پڑھے جاتے ہیں اور ایک ہی فہرست میں ملائے جاتے ہیں (ڈی-ڈپلیکیٹ کرتے وقت پہلا وقوع جیتتا ہے):

1. `apiKeyInfo.disabledGuardrails`
2. درخواست باڈی `disabledGuardrails` (ٹاپ لیول)
3. درخواست باڈی `metadata.disabledGuardrails` (صرف جب `metadata` ایک آبجیکٹ ہو)
4. ہیڈر `x-omniroute-disabled-guardrails`
5. میراثی (legacy) ہیڈر `x-disabled-guardrails`

پانچوں چینلز ملائے جاتے ہیں، دونوں ہیڈرز بھی شامل ہیں: `x-omniroute-disabled-guardrails` اور `x-disabled-guardrails` دونوں بھیجنے سے ان کی فہرستوں کے یونین کو چھوڑ دیا جاتا ہے، اور ایک خالی جدید ہیڈر اب میراثی والے کو نہیں چھپاتا
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)، جسے
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805) میں درست کیا گیا)۔

قدریں اسٹرنگز کی صفیں یا کاما سے الگ شدہ اسٹرنگ ہو سکتی ہیں؛ ناموں کو trim کیا جاتا ہے اور چھوٹے حروف کے kebab-case میں نارملائز کیا جاتا ہے (`pii_masker` → `pii-masker`)، اور خالی اندراجات ہٹا دیے جاتے ہیں۔ نتیجہ `context.disabledGuardrails` کے ذریعے رجسٹری کو پہنچایا جاتا ہے، جو مماثل گارڈریلز کو چھوڑ دیتا ہے (`results` میں `skipped: true`)۔

غیر فعال کرنے والی فہرست صرف **رجسٹری** پر اثر ڈالتی ہے۔ پرامپٹ-انجیکشن `block` موڈ ایک لازمی حد بندی ہے: انجیکشن-گارڈ مڈل ویئر
(`src/middleware/promptInjectionGuard.ts`) `evaluatePromptInjection()` کو کسی بھی کالر کنٹرول شدہ غیر فعال فہرست کے بغیر بلاتا ہے (وہ مردہ
`resolveDisabledGuardrails({ body })` کال جو یہ پہلے کیا کرتا تھا،
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934) میں ہٹا دی گئی تھی)، لہٰذا وہ درخواست جو `prompt-injection` کو غیر فعال کرتی ہے، `block` موڈ میں پھر بھی مسترد کر دی جاتی ہے۔ یہ عمداً ایسا ہی ڈیزائن کیا گیا ہے۔ غیر فعال چینلز کالر کے کنٹرول میں ہوتے ہیں (درخواست باڈی، میٹا ڈیٹا، ہیڈرز)، اور کالر کو کسی ایسے سیکیورٹی کنٹرول کو بند کرنے کی اجازت نہیں ہونی چاہیے جو آپریٹر نے مقرر کیا ہو
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413))۔ [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412) کا ہیڈر یونین صرف یہ بدلتا ہے کہ کون سے رجسٹری گارڈریلز چھوڑے جاتے ہیں؛ یہ کلائنٹ کو مڈل ویئر سے بچ کر نکلنے نہیں دیتا۔ فی-کلید اور فی-گروپ لازمی گارڈریل پالیسیاں v4 RFC [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417) میں ٹریک کی جا رہی ہیں۔
دیکھیے [کوریج اور حدود](#coverage-and-limits)۔

## اجرا کی ترتیب

ہر اس درخواست کے لیے جو `src/sse/handlers/chat.ts` اور `open-sse/handlers/chatCore.ts` سے گزرتی ہے (چیٹ فیملی روٹس جو [کوریج اور حدود](#coverage-and-limits) کے تحت درج ہیں):

1. `resolveDisabledGuardrails(...)` API کلید، باڈی اور ہیڈرز سے نظرانداز کرنے کی فہرست بناتا ہے۔
2. `guardrailRegistry.runPreCallHooks(body, ctx)` گارڈریلز کو بڑھتی ہوئی ترجیحی ترتیب میں چلاتا ہے:
   - غیر فعال گارڈریلز `skipped` کے طور پر ریکارڈ کیے جاتے ہیں۔
   - ہر گارڈریل کا `preCall` `modifiedPayload` کے ذریعے پے لوڈ کو دوبارہ لکھ سکتا ہے۔
   - پہلا `block: true` چین کو شارٹ سرکٹ کر دیتا ہے اور ہینڈلر گارڈریل کی مستردگی کا جواب واپس کرتا ہے۔
3. (ممکنہ طور پر دوبارہ لکھی گئی) پے لوڈ کومبو روٹنگ اور اپ اسٹریم ڈسپیچ میں بہتی ہے۔
4. **صرف نان سٹریمنگ:** جواب مکمل ہونے کے بعد، `guardrailRegistry.runPostCallHooks(...)` جواب پر وہی چین چلاتا ہے۔ یہاں `block: true` اپ اسٹریم جواب کو خارج کر دیتا ہے اور HTTP 400 واپس کرتا ہے۔ سٹریم شدہ جوابات اس مرحلے کو مکمل طور پر نظرانداز کرتے ہیں۔

جو گارڈریلز exception پھینکتے ہیں وہ `error: <message>` کے ساتھ ریکارڈ کیے جاتے ہیں اور `logger.warn` کے ذریعے لاگ کیے جاتے ہیں، لیکن چین جاری رہتی ہے — ڈیزائن کے مطابق فیل اوپن۔

## کوریج اور حدود

گارڈریل رجسٹری صرف چیٹ پائپ لائن میں جڑی ہوئی ہے۔ یہ حدود `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` اور `tests/unit/guardrail-pipeline-characterization.test.ts` کے ذریعے مقرر کی گئی ہیں؛ جب رویہ تبدیل ہو تو ان ٹیسٹوں کو شعوری طور پر اپڈیٹ کریں۔

### ہکس کہاں چلتے ہیں

| ہک / کنٹرول                  | کن پر چلتا ہے                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `runPreCallHooks`            | وہ درخواستیں جنہیں `handleChat` ہینڈل کرتا ہے (`src/sse/handlers/chat.ts`): `/v1/chat/completions`، `/v1/completions`، `/v1/messages`، `/v1/responses` (اور `/v1/responses/*`)، `/v1/relay/chat/completions`، `/v1/providers/{provider}/chat/completions`، `/v1/api/chat`، `/v1/antigravity`، `/v1beta/models/*`، اور ٹیلیگرام چیٹ پراکسی۔ نیز ڈیش بورڈ ٹیسٹ اینڈ پوائنٹ `/api/guardrails/test`۔ پری کال بلاک HTTP 400 واپس کرتا ہے۔ |
| `runPostCallHooks`           | صرف **نان سٹریمنگ** چیٹ جوابات (`open-sse/handlers/chatCore/nonStreamingResponse.ts`)۔ سٹریم شدہ جوابات کبھی اس تک نہیں پہنچتے۔                                                                                                                                                                                                                                                                                                      |
| سٹریمنگ PII                  | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`)، جب `PII_RESPONSE_SANITIZATION` فعال ہو تو `streamingPipeline.ts` میں پائپ کی جاتی ہے۔ یہ گارڈریل نہیں ہے، اس لیے غیر فعال چینلز اس پر اثر انداز نہیں ہوتے۔                                                                                                                                                                                                             |
| انجیکشن گارڈ مڈل ویئر (قدیم) | ہر پرامپٹ رکھنے والا `/v1` روٹ، بشمول چیٹ فیملی (دیکھیں [روٹ کوریج](#injection-guard-route-coverage--red-team-phase-8--block-d))۔ صرف پرامپٹ انجیکشن۔                                                                                                                                                                                                                                                                                |

### کیا کور نہیں ہوتا

- **میڈیا، ایمبیڈنگز اور ڈیٹا روٹس** (`/v1/images/*`، `/v1/embeddings`، `/v1/audio/*`، `/v1/videos/generations`، `/v1/music/generations`، `/v1/rerank`، `/v1/search`، `/v1/moderations`) کبھی رجسٹری تک نہیں پہنچتے۔ وہاں کوئی PII ماسکنگ، کریڈینشل ماسکنگ یا موڈالٹی برج نہیں چلتا۔ ان کی واحد جانچ قدیم انجیکشن گارڈ مڈل ویئر ہے۔
- **سٹریم شدہ جوابات** کو کوئی پوسٹ کال گارڈریلز نہیں ملتے: نہ `pii-masker` یا `credential-masker` پوسٹ کال، اور نہ ہی پوسٹ کال بلاک۔ صرف سٹریمنگ PII ٹرانسفارم لاگو ہوتا ہے (جب `PII_RESPONSE_SANITIZATION` فعال ہو)۔ سٹریم شدہ جواب میں واپس آئی ہوئی کریڈینشل کو مسخ نہیں کیا جاتا۔
- **غیر فعال چینلز بمقابلہ مڈل ویئر (ڈیزائن کے مطابق):** مڈل ویئر `evaluatePromptInjection()` کی اپنی کال کے ذریعے پرامپٹ انجیکشن کا جائزہ لیتا ہے، بغیر کوئی کالر کنٹرولڈ غیر فعال فہرست دیے۔ `block` موڈ ایک لازمی حد بندی ہے جسے کالر کنٹرولڈ غیر فعالیاں بائی پاس نہیں کر سکتیں، چیٹ فیملی روٹس پر بھی ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413))۔ `prompt-injection` کو غیر فعال کرنا صرف رجسٹری گارڈریل کو نظرانداز کرتا ہے۔

### پوسٹ کال سے پہلے جواب کو کیا دیکھتا ہے

نان سٹریمنگ راستے پر ترتیب یہ ہے: میموری ایکسٹریکشن → بلٹ اِن ٹول کا اجرا → پوسٹ کال گارڈریلز → پوسٹ کال بلاک ایگزٹ → سیمینٹک کیش اسٹور۔

- **میموری ایکسٹریکشن** اور **ٹول کا اجراء** جواب کو اس سے پہلے دیکھ لیتے ہیں کہ پوسٹ-کال گارڈریلز اسے دوبارہ لکھ سکیں یا بلاک کر سکیں۔
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) کے بعد سے، میموری
  ایکسٹریکشن نکالے گئے متن کو `sanitizePII` سے گزارتی ہے جب
  `PII_RESPONSE_SANITIZATION` فعال ہو (دونوں اسٹریمنگ اور غیر اسٹریمنگ صورتوں میں)، لیکن وہ جواب جسے پوسٹ-کال بعد میں بلاک کر دے، وہ اس وقت تک میموری اور
  ٹولز کو پیش کیا جا چکا ہوتا ہے۔
- **سیمینٹک کیشے** جواب کو پوسٹ-کال کے بعد محفوظ کرتا ہے، اس لیے یہ دوبارہ لکھا گیا جواب محفوظ کرتا ہے، اور بلاک شدہ جواب کبھی کیشے نہیں ہوتا۔ کیشے اندراجات فی API key کے لحاظ سے کلیدی (keyed) ہوتے ہیں۔

## کنفیگریشن

بلٹ-ان گارڈ ریلز کے ذریعے پڑھے جانے والے ماحول کے متغیرات:

| متغیر                                 | استعمال کرنے والا          | اثر                                                                                                  |
| ------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | شناخت کو مکمل طور پر غیر فعال کرنے کے لیے `false` سیٹ کریں۔                                          |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | انجیکشن پالیسی: `warn`، `block`، یا `log`۔ پرانی قدر `redact` انجیکشن متن کو دوبارہ نہیں لکھتی۔      |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | انجیکشن گارڈ کے لیے موڈ؛ یہ ایک DB فیچر فلیگ بھی ہے جو env vars کو **اووررائیڈ** کرتا ہے (DB > ENV)۔ |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | کم از کم شدت جسے `MODE=block` مسترد کرتا ہے: `high` (طے شدہ)، `medium`، یا `low`۔                    |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | `INPUT_SANITIZER_BLOCK_THRESHOLD` کا پرانا متبادل نام۔                                               |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | جب `true` ہو، تو درخواست کی PII حذف کر دی جاتی ہے (انجیکشن موڈ سے آزاد)۔                             |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (ڈاؤن اسٹریم) | جواب کی جانب والے ماسکر کے رویے کو کنٹرول کرتا ہے۔                                                   |

Modality Bridge گارڈ ریلز رن ٹائم کنفیگریشن DB پر مبنی سیٹنگز اسٹور (`getSettings()`) سے پڑھتے ہیں، نہ کہ env vars سے۔ Vision کی بنیادی کلیدیں یہ ہیں: `modalityBridgeVisionEnabled`، `modalityBridgeVisionMode`، `modalityBridgeVisionModel`، `modalityBridgeVisionTaskAware`، `modalityBridgeVisionPrompt`، `modalityBridgeVisionTimeout`، `modalityBridgeVisionMaxImages`، `modalityBridgeVisionMaxChars`، `modalityBridgeCacheEnabled`، `modalityBridgeCacheTtlMinutes`، اور `modalityBridgeCacheMaxEntries`۔ پرانی `visionBridge*` کلیدیں صرف دستاویزی ایک سائیکل ریڈ فال بیک کے طور پر قبول کی جاتی ہیں؛ ڈیش بورڈ کی تحریریں بنیادی کلیدیں استعمال کرتی ہیں۔ طے شدہ اقدار اور فال بیک ریزالور `src/shared/constants/modalityBridgeDefaults.ts` میں موجود ہیں، جبکہ پرانی مستقلات `src/shared/constants/visionBridgeDefaults.ts` میں برقرار رکھی گئی ہیں۔

Audio یہ کلیدیں استعمال کرتا ہے: `modalityBridgeAudioEnabled`، `modalityBridgeAudioModel`، `modalityBridgeAudioTimeout`، اور `modalityBridgeAudioMaxClips`، اس کے علاوہ مشترک `modalityBridgeCache*` سیٹنگز بھی۔ Audio کے لیے کوئی پرانی کلید فال بیک موجود نہیں ہے کیونکہ یہ کلیدیں Modality Bridge اسکیما کے ساتھ متعارف کرائی گئی تھیں۔

Video یہ کلیدیں استعمال کرتا ہے: `modalityBridgeVideoEnabled`، `modalityBridgeVideoAnalysisMode`، `modalityBridgeVideoModel`، `modalityBridgeVideoFrameCount`، `modalityBridgeVideoSamplingPolicy`، `modalityBridgeVideoMaxVideos`، اور `modalityBridgeVideoTimeout`، اس کے علاوہ مشترک `modalityBridgeCache*` سیٹنگز بھی۔ یہ طے شدہ طور پر غیر فعال ہے کیونکہ FFmpeg/ffprobe اختیاری آپریشنل انحصار ہیں اور فریم کیپشننگ تاخیر اور ماڈل لاگت میں اضافہ کرتی ہے۔

## حسبِ منشا گارڈریلز

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

مراحل:

1. `BaseGuardrail` کو extend کرتے ہوئے `src/lib/guardrails/myGuardrail.ts` بنائیں۔
2. `preCall` اور/یا `postCall` implement کریں۔
3. یا تو import کے وقت رجسٹر کریں (`registerDefaultGuardrails` سے push کر کے) یا
   runtime پر `guardrailRegistry.register(...)` کو call کریں — رجسٹری
   اسی normalized نام والے کسی بھی سابقہ گارڈریل کو بدل دیتی ہے۔
4. `tests/unit/` کے تحت ٹیسٹ شامل کریں (موجودہ مثالیں:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`)۔

## ٹیسٹنگ

معروف حالت سے آغاز کے لیے ٹیسٹس کے درمیان `resetGuardrailsForTests()` استعمال کریں۔
خالی رجسٹری سے آغاز کے لیے `{ registerDefaults: false }` پاس کریں اور صرف وہی
گارڈریلز رجسٹر کریں جو زیرِ آزمائش ہوں۔ Vision Bridge dependency injection قبول کرتا ہے
(`deps.getSettings`، `deps.callVisionModel`)؛ Audio Bridge بھی settings، capabilities، STT ماڈل
انتخاب، credential چیکس اور transcription کے لیے مساوی seams فراہم کرتا ہے۔ لہٰذا ٹیسٹس
دونوں flows کو DB یا نیٹ ورک رسائی کے بغیر آزما سکتے ہیں۔

## مزید دیکھیے

- `src/lib/guardrails/` — implementation
- `src/shared/utils/inputSanitizer.ts` — مشترکہ detector جو prompt-injection اور
  PII masking کو طاقت دیتا ہے
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge کی defaults اور
  forced-bridge ماڈل فہرست
- `src/shared/constants/modalityBridgeDefaults.ts` — مشترکہ Vision/Audio runtime defaults
- `docs/architecture/RESILIENCE_GUIDE.md` — متوازی layer (circuit breaker، cooldowns)
- `docs/reference/ENVIRONMENT.md` — مکمل env var حوالہ

## Injection-guard روٹ کوریج اور red-team (Phase 8 · Block D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) ان تمام روٹس کو
احاطہ کرتا ہے جو صارف کے prompts قبول کرتے ہیں۔ یہ `INJECTION_GUARD_MODE` کا احترام کرتا ہے
(پہلے سے طے شدہ `warn` = صرف لاگ؛ `block` = HTTP 400 `SECURITY_001` لوٹاتا ہے)۔

| قسم           | روٹس                                                                                                                                                 | پہلے سے طے شدہ mode |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Text (موجودہ) | `/v1/chat/completions`، `/v1/completions`، `/v1/relay/chat/completions`                                                                              | warn                |
| Generative    | `/v1/messages`، `/v1/responses`، `/v1/images/generations`، `/v1/images/edits`، `/v1/videos/generations`، `/v1/music/generations`، `/v1/audio/speech` | warn                |
| Data          | `/v1/embeddings`، `/v1/rerank`، `/v1/search`، `/v1/moderations`                                                                                      | warn                |

Text extraction (`extractMessageContents`) `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` کو احاطہ کرتی ہے۔

**Red-team (راتوں رات، `nightly-llm-security.yml`):** promptfoo تصدیق کرتا ہے کہ ہر روٹ
`INJECTION_GUARD_MODE=block` میں OWASP-LLM corpus کو روکتا ہے؛ garak probes چلاتا ہے
(secret کے بغیر skip کر دیتا ہے)۔ `moderations` کو یکسانی کے لیے شامل کیا گیا ہے۔ Block mode
ایک لازمی حد بندی ہے: `evaluatePromptInjection()` اس per-request disable فہرست کو نظرانداز
کرتا ہے جو middleware اسے پاس کرتا ہے، لہٰذا `disabledGuardrails` کسی روٹ کو اس سے
**مستثنیٰ نہیں** کرتا ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413))۔

راتوں رات چلنے والا workflow (`.github/workflows/nightly-llm-security.yml`، cron + manual
dispatch) کے دو jobs ہیں:

- **`promptfoo-guard` (روکنے والا)** — `INJECTION_GUARD_MODE=block` کے ساتھ
  `promptfoo eval -c promptfooconfig.yaml` چلاتا ہے۔ ہر adversarial case (مثلاً "ignore all
  previous instructions…"، DAN طرز کے jailbreaks) اس بات کا اثبات کرتا ہے کہ جواب میں
  `error.code === "SECURITY_001"` موجود ہے، یعنی گارڈ نے واقعی درخواست مسترد کر دی۔
- **`garak` (مشاورتی)** — مقامی OmniRoute instance (`http://localhost:20128/v1`) کے خلاف
  garak `--probes promptinject,dan,leakreplay` چلاتا ہے۔ یہ provider secret
  (`PROMPTFOO_PROVIDER_KEY`) پر مشروط ہے؛ شائستگی سے skip کرتا ہے اور اس کے ساتھ
  `|| true` لگا ہوتا ہے، لہٰذا یہ CI کو fail کیے بغیر رپورٹ کرتا ہے۔

گارڈ helper (`createInjectionGuard` / `withInjectionGuard`) کی کوریج ہر prompt رکھنے والے
`/v1` روٹ پر پھیلی ہوئی ہے؛ prompt کا متن `src/shared/utils/inputSanitizer.ts` میں موجود
`extractMessageContents()` کے ذریعے
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` سے نکالا جاتا ہے۔
