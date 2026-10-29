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

### ویڈیو برج (`videoBridge.ts`, `videoBridgePipeline.ts`)

اس ہدف کو پکارنے سے پہلے جس کی مقامی ویڈیو معاونت معلوم نہ ہو، Chat Completions کے `messages` اور Responses API کے `input` میں اعلیٰ درجے کے ویڈیو پرزوں کو روکتا ہے۔ تعاون یافتہ شکلیں `input_video`، `video_url`، `video_source`، HTTPS URLs، اور `data:video/*;base64,...` data URIs ہیں۔ متن میں موجود سادہ فائل ناموں کو ویڈیو نہیں سمجھا جاتا۔

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) درخواست کی traversal، صلاحیت/پالیسی جانچ، فی-درخواست aggregation، اور جوابی payload کی ذمہ داری رکھتا ہے۔ فی-ویڈیو کام — بائٹس کا حصول، مکمل نتیجے کی کیشے، فریم ترتیب کی تفصیل (جو کالر کی اعلان کردہ کسی بھی آڈیو ٹرانسکرپٹ کو ضم کرتی ہے)، اور فی-کوشش metrics/abort/cleanup — `videoBridgePipeline.ts` میں موجود `processVideoPart` کے پیچھے پنہاں ہے، جسے `preCall` کے لوپ کے اندر ہر ویڈیو پرزے کے لیے ایک بار پکارا جاتا ہے۔ وہی ماڈیول واضح پورٹ سرحدیں بھی متعین کرتا ہے: `VideoMediaBrokerPort` (بائٹس کا حصول اور نمونہ شدہ فریمز کی extraction)، `VideoAudioTranscriptionPort` (کالر کی اعلان کردہ آڈیو ٹرانسکرپٹ کو نمونہ شدہ کیپشنز کے ساتھ ضم کرنا)، اور `VideoDrilldownPort` (فریم drill-down کی persistence سرحد؛ ابھی تک `processVideoPart` میں مربوط نہیں — فی الحال صرف الگ `/api/modality-bridge/video/drilldown` روٹ drill-down اندراجات لکھتا ہے)۔

عوامی `/v1` درخواست کا راستہ کبھی بھی subprocess درآمد یا invoke نہیں کرتا۔ remote ویڈیوز 50 MiB کی حد کے تحت ڈاؤن لوڈ ہوتی ہیں؛ inline base64 ویڈیوز کے لیے فی-ویڈیو decoded حجم کی محتاط 36 MiB حد ہے تاکہ ماڈل/پیغامات/framing envelope عوامی JSON درخواست کی داخلے کی حد 50 MiB کے اندر رہ سکے۔ inline لمبائی اور decoded-size کے تخمینے allocation سے پہلے جانچے جاتے ہیں۔ ابتدائی remote URL اور ہر redirect پر HTTPS لازمی ہے، اور موجودہ صرف-عوامی outbound گارڈ کو DNS pinning کے ساتھ استعمال کیا جاتا ہے۔ اس کے بعد بائٹس عین اندرونی `POST /api/modality-bridge/video/extract` broker سرحد کو عبور کرتے ہیں۔ وہ روٹ `LOCAL_ONLY` اور `SPAWN_CAPABLE` دونوں ہے، صرف فی-عمل تصدیق شدہ، قابلِ اعتماد loopback درخواست قبول کرتا ہے، اور کبھی بھی URL، فائل سسٹم راستہ، executable، یا argument فہرست قبول نہیں کرتا۔ API body-size پائپ لائن اور ہینڈلر کا incremental body reader آزادانہ طور پر 50 MiB کی broker ان پٹ حد نافذ کرتے ہیں۔ اس کی محدود قطار ایک وقت میں صرف ایک extraction چلاتی ہے، چار زیرِ التوا کاموں کی اجازت دیتی ہے، اور زیرِ التوا ان پٹ کو 100 MiB پر محدود رکھتی ہے۔

بروکر کے اندر، `ffprobe` ایک نجی مقامی فائل پڑھتا ہے؛ مقررہ فارمیٹ کی اجازت فہرست پلے لسٹ اور مینی فیسٹ فارمیٹس کو مستثنیٰ رکھتی ہے۔ اجازت یافتہ MOV-خاندان کے کنٹینروں کے لیے، بیرونی MOV ڈیٹا حوالے بطور ڈیفالٹ غیر فعال رہتے ہیں، اور مقررہ کمانڈ انہیں اختیار نہیں کرتی۔ `ffprobe` اور `ffmpeg` دونوں صرف-`file` پروٹوکول کی سفید فہرست، ایک تھریڈ، مقررہ آرگیومنٹ ارےز، بغیر کسی شیل کے، اور `PATH` سے حل کیے گئے ایگزیکیوٹیبلز استعمال کرتے ہیں۔ منسلک تصویر والی کور اسٹریمز قابلِ پلے امیدوار نہیں ہوتیں۔ تمام قابلِ پلے اسٹریمز کو حدود پوری کرنا ضروری ہے، اور قطعی کمترین-انڈیکس فال بیک سے پہلے واضح ڈیفالٹ اسٹریم کو ترجیح دی جاتی ہے۔ ویڈیوز 600 سیکنڈ، فی جہت 8,192 پکسلز، اور 33,554,432 سورس پکسلز تک محدود ہیں۔ FFmpeg 1–16 وسطی JPEG فریموں کا نمونہ لیتا ہے، لمبے کنارے کو زیادہ سے زیادہ 1,024 پکسلز تک گھٹاتا ہے، چھوٹے اِن پٹس کو بڑا نہیں کرتا، اور اسے کبھی کوئی URL موصول نہیں ہوتا۔ نمونہ بندی بطور ڈیفالٹ `uniform` ہوتی ہے۔ اختیاری `scene_aware` اور تجرباتی `segment_aware` پالیسیاں پہلے سے تصدیق شدہ مقامی اسٹریم پر ایک اضافی مقررہ FFmpeg پاس چلاتی ہیں، محدود `showinfo` سین ٹائم اسٹیمپس منتخب کرتی ہیں، اور ڈیٹیکٹر کی ناکامی، ٹائم آؤٹ، بگڑی ہوئی آؤٹ پٹ، یا خالی امیدوار سیٹ پر قطعی طور پر انھی یکساں وسطی نکتوں پر واپس آ جاتی ہیں۔ سیگمنٹ-اویر موڈ وسطی نمونے تصدیق شدہ سین وقفوں کے تناسب سے تقسیم کرتا ہے؛ سیگمنٹ-اویر شواہد اور فال بیک رویّے کی تفصیل ذیل میں درج ہے۔ سخت 16-فریم حد ہر پالیسی میں انتخاب کے بعد لاگو ہوتی ہے۔ جب کسی سین-اویر درخواست کا بجٹ صرف ایک فریم ہو، تو وہ فعال مکمل-ویڈیو یا فوکس ونڈو کا یکساں وسطی نقطہ استعمال کرتی ہے اور `policyEffective: uniform` رپورٹ کرتی ہے: ایک تنہا منتخب سین فریم دونوں زمانی سروں کو محفوظ نہیں رکھ سکتا۔ کالر اختیاری طور پر ایک محدود فوکس ونڈو (`start`/`end` سیکنڈ) فراہم کر سکتا ہے؛ حدیں میڈیا دورانیے پر کلپ کی جاتی ہیں، الٹی یا غیر محدود ونڈوز مسترد کر دی جاتی ہیں، اور تمام نمونہ بندی پالیسیاں صرف نارملائز شدہ وقفے کے اندر انجام پاتی ہیں۔ نتیجہ میں بننے والی ونڈو نمونہ بندی میٹا ڈیٹا اور غیر قابلِ اعتماد وضاحتی سابقے میں شامل ہوتی ہے تاکہ ڈاؤن اسٹریم ماڈلز فوکس شدہ اقتباس کو پوری ٹائم لائن سے الگ پہچان سکیں۔

معنوی کیپشن فوکس ایک الگ، واضح ترتیب ہے۔ ڈیفالٹ `full` تجزیہ موڈ موجودہ فریم پرامپٹ کو جوں کا توں رکھتا ہے اور درخواست کا متن کبھی کیپشن ماڈل کو نہیں بھیجتا۔ `focused` موڈ میں، برج اسی Chat یا Responses کنٹینر سے صرف تازہ ترین غیر خالی، صارف کے لکھے ہوئے `text`/`input_text` کو پڑھتا ہے، اسے NFC میں نارملائز کرتا ہے، کنٹرول حروف اور خالی جگہوں کو سمیٹ دیتا ہے، اور اسے 500 یونیکوڈ کوڈ پوائنٹس تک محدود رکھتا ہے۔ خالی نتیجہ بالکل اصل `full` پرامپٹ پر واپس چلا جاتا ہے۔ قابلِ استعمال اشارے کو ایک مخصوص غیر قابلِ اعتماد-صارف-سیاق بلاک میں JSON کے طور پر سیریلائز کیا جاتا ہے اور وہ صرف قابلِ مشاہدہ تفصیلات کو ترجیح دے سکتا ہے؛ یہ میڈیا میں نظر آنے والی یا سنائی دینے والی ہدایات کی پیروی سے روکنے والی الگ تنبیہ کو کالعدم نہیں کر سکتا۔ متنی فوکس کبھی `start`/`end` اخذ نہیں کرتا اور نہ زمانی سیمپلر کو بدلتا ہے۔

#### FU-07 ساختی سیگمنٹ شواہد

`segment_aware` پہلے سے تصدیق شدہ مقامی ویڈیو اسٹریم پر ایک محدود پیشگی تجزیہ پاس استعمال کرتا ہے۔ مقررہ فلٹر چین پہلے زیادہ سے زیادہ 320 پکسلز چوڑائی تک اسکیل کرتی ہے، سین کی تبدیلیوں اور منجمد وقفوں کا پتہ لگاتی ہے، پھر دھندلاہٹ، اوسط چمک، اور فضائی/زمانی معلومات کے لیے 1 فریم فی سیکنڈ کے حساب سے نمونہ لیتی ہے۔ یہ پاس 600 ساختی نمونوں، ایک FFmpeg/فلٹر تھریڈ، وہی صرف-`file` پروٹوکول اور کنٹینر اجازت فہرستوں، 1 MiB پراسیس-آؤٹ پٹ حد، اور بروکر کی مشترکہ منسوخی/ڈیڈ لائن کے اندر زیادہ سے زیادہ 30 سیکنڈ تک محدود ہے۔ یہ درخواست سے کبھی کوئی کمانڈ، فلٹر، پاتھ، یا URL قبول نہیں کرتی۔

ساختی اقدار قطعی نمونہ بندی کے شواہد ہیں، نہ کہ ویڈیو کی معنوی سمجھ۔ یہ موضوعات، اعمال، کیپشنز، تقریر، یا صارف کے ارادے اخذ نہیں کرتیں۔ سین اور منجمد حدیں مل کر سیگمنٹس بناتی ہیں؛ منجمد کوریج، دھندلاہٹ، ایکسپوژر، فضائی تفصیل، اور زمانی تبدیلی صرف اس پر اثر ڈالتی ہیں کہ موجودہ 1–16 فریم بجٹ کیسے تقسیم ہو۔ مکمل طور پر منجمد سیگمنٹ ایک فریم پر بند ہے، جبکہ غیر منجمد سیگمنٹس باقی بجٹ کے حصول کے لیے مقابلہ کرتے ہیں۔ جب حدیں فریموں سے زیادہ ہو جائیں، تو یکساں ٹائم لائن کوریج برقرار رکھی جاتی ہے تاکہ تیز ابتدائی کٹس کسی لمبے آخری سیگمنٹ کو چھپا نہ سکیں۔ کسی منجمد حد کے 1-سیکنڈ تجزیاتی ریزولوشن کے اندر آنے والی سین حدوں کو ملا دیا جاتا ہے۔

غائب فلٹرز، بگڑے/خالی شواہد، ڈیٹیکٹر کی خرابی، یا محدود پیشگی تجزیہ ٹائم آؤٹ — سب بالکل اسی یکساں وسطی نقطہ پالیسی پر فیل اوپن کرتے ہیں۔ کالر کی منسوخی یا بروکر کی ڈیڈ لائن فیل اوپن نہیں کرتی: یہ جاری سب پروسیس کو ختم کرتی ہے، بعد میں فریم نکالنے سے روکتی ہے، اور نجی عارضی درخت `finally` میں ہٹا دیا جاتا ہے۔

`scripts/perf/video-bridge-fu07-eval.ts` ڈیڈپ کے بعد کیپشن-کال بچت، گھنی حرکت کے بجٹ کی تقسیم، دھندلاہٹ/ایکسپوژر/SI-TI شواہد، لمبی آخری پونچھ کے ساتھ تیز کٹس، اور بتدریج فیڈ کے جھوٹے مثبت نتائج کے لیے قطعی، حقیقی FFmpeg فکسچرز بناتی ہے۔ یہ پیشگی تجزیے کا وال ٹائم ریکارڈ کرتی ہے اور، جہاں `/usr/bin/time` دستیاب ہو، چائلڈ CPU اور بلند ترین RSS بھی۔ اس کے معیار کے چیکز صرف ساختی اوریکلز ہیں۔ حقیقی کیپشن-ماڈل کا معیار `HOLD` پر رہتا ہے کیونکہ اس ہارنیس کے پاس کوئی مجاز اینڈ پوائنٹ یا منجمد جج نہیں۔ مالی بچت بھی `HOLD` پر رہتی ہے جب تک `--caption-cost-per-call-usd` کوئی واضح، مثبت فی-کال تخمینہ فراہم نہ کرے؛ اسکرپٹ دونوں میں سے کوئی بھی نتیجہ کبھی گھڑتی نہیں۔

ہر فریم 4 MiB تک محدود ہے، تمام خام فریم مجموعی طور پر 23 MiB تک، اور سیریلائز شدہ بروکر جواب 32 MiB تک۔ ایک نجی عارضی ڈائریکٹری `finally` میں ہٹا دی جاتی ہے۔ OmniRoute، FFmpeg کو بنڈل نہیں کرتا اور نہ ہی کوئی حسبِ منشا executable path قبول کرتا ہے۔ کیپشننگ سے پہلے، برج ایک محتاط بصری ڈی ڈپلیکیشن پاس لاگو کرتا ہے: ہر JPEG کو 16×16 گرے اسکیل بفر تک گھٹا دیا جاتا ہے اور اس کا موازنہ صرف آخری محفوظ شدہ فریم سے کیا جاتا ہے۔ ایک فریم سے زیادہ مطلوبہ کیپشن بجٹ کے لیے، ایکسٹریکشن اس بجٹ کے زیادہ سے زیادہ دو گنا تک محدود امیدوار پول فراہم کرتی ہے جو کبھی بھی 16 فریم سے تجاوز نہیں کرتا۔ مطلوبہ حد صرف ڈی ڈپلیکیشن کے بعد لاگو کی جاتی ہے، اور جب بجٹ کم از کم دو ہو تو حتمی چھنٹائی کے دوران پہلا اور آخری منتخب امیدوار محفوظ رکھے جاتے ہیں۔ ورژن شدہ `grayscale-16x16-mean-cells-v2` پالیسی اوسط لوما ڈیلٹا اور اُن تھمب نیل سیلز کے تناسب میں سے جو بھی بڑا ہو استعمال کرتی ہے جن کا نارملائزڈ ڈیلٹا کم از کم 0.05 ہو۔ ڈپلیکیٹ کی حد مستقل 0.04 ہے، جو رن ٹائم سیٹنگ کے طور پر ظاہر کرنے کے بجائے پیشگوئی کی قابلیت کے لیے چنی گئی ہے۔ یہ ثانوی ہائی کنٹراسٹ سگنل چھوٹی حرکت اور نظر آنے والے متن کی تبدیلیوں کو محفوظ رکھتا ہے جنہیں صرف-اوسط موازنہ چھپا سکتا ہے۔ کمپیریٹر یا ڈیکوڈر کی خرابیاں فیل-اوپن ہوتی ہیں اور کوریج برقرار رکھتی ہیں۔ آؤٹ پٹ میٹا ڈیٹا نکالے گئے امیدواروں، کامیابی سے استعمال شدہ فریموں، اور گرائے گئے بصری ڈپلیکیٹس کو الگ الگ کرتا ہے۔

واضح طور پر نشان زد کیا ہوا ویڈیو حصہ ٹائم اسٹیمپ شدہ کانٹیکٹ شیٹ کی درخواست کر سکتا ہے۔ برج زیادہ سے زیادہ 4 کالم اور 16 فریم پر مشتمل JPEG گرڈ بناتا ہے۔ ہر 512 پکسل سیل اپنے ماخذ کا ٹائم اسٹیمپ ہائی کنٹراسٹ نچلی پٹی میں مستقل طور پر درج کر دیتا ہے، جبکہ وہی ٹائم اسٹیمپ ڈاؤن اسٹریم وابستگی اور آڈٹ کے لیے متنی میٹا ڈیٹا میں بھی برقرار رہتے ہیں۔ مکمل JPEG 32 MiB پر محدود رہتی ہے۔ اگر `sharp` گرڈ کو ڈیکوڈ یا کمپوز نہیں کر سکتا، تو برج انفرادی JPEG فریموں پر فال بیک کرتا ہے؛ کلائنٹ ایبارٹ اس کے باوجود شیٹ آپریشن سے ہو کر آگے منتقل ہوتا ہے۔

پروموشن ثبوت جان بوجھ کر مصنوعی کمپوزیشن مائیکرو بینچ مارک سے الگ رکھا گیا ہے۔ `scripts/perf/video-bridge-contact-sheet-eval.ts` حقیقی OpenAI-متوافق وژن ماڈلز کے لیے اسکیما-ورژن شدہ A/B ہارنیس کی تعریف کرتی ہے۔ یہ provider کی رپورٹ کردہ ٹوکنز، اینڈ ٹو اینڈ وال لیٹنسی (بشمول شیٹ کمپوزیشن)، ماڈل کال کی تعداد، اور مینی فیسٹ میں متعین کردہ حقائق کی برقراری کی پیمائش کرتی ہے۔ خام ماڈل جوابات رپورٹ میں نہیں لکھے جاتے؛ صرف SHA-256 ڈائجیسٹ اور مماثل fact IDs محفوظ کیے جاتے ہیں۔ ہارنیس کوئی نیٹ ورک یا ادائیگی والی ماڈل کال نہیں کرتی جب تک `--execute-real` پاس نہ کیا جائے اور `--model`، `OMNIROUTE_BASE_URL` اور `OMNIROUTE_API_KEY` کنفیگر نہ کیے گئے ہوں۔ اس واضح حقیقی رن کے بغیر، اس کا مشین کے پڑھنے کے قابل فیصلہ `HOLD` ہی رہتا ہے؛ صرف مصنوعی payload/call-count پیمائشیں پروموشن ثبوت نہیں بنتیں۔

کالر کسی تعاون یافتہ ویڈیو حصے کے ساتھ اختیاری `transcript.cues` ارے منسلک کر سکتے ہیں جب ان کے پاس پہلے سے وقت کے ساتھ ہم آہنگ متن موجود ہو۔ ہر کیو میں `text`، پروب شدہ دورانیے کے اندر ایک محدود `start`/`end` وقفہ، اور whitelist میں شامل `source` (`client`، `embedded`، یا `audio-bridge`) ہونا لازمی ہے؛ `confidence` کی پہلے سے طے شدہ قیمت `1` ہے اور اسے `0` اور `1` کے درمیان رہنا چاہیے۔ بالکل مماثل کیوز ضم کر دیے جاتے ہیں۔ OmniRoute اس میٹا ڈیٹا سے کبھی بھی ٹرانسکرپشن شروع نہیں کرتا: توثیق شدہ کیوز source، confidence اور وقفے کے ساتھ بیان شدہ نتیجے میں نقل کیے جاتے ہیں اور فریم کیپشنز کے شانہ بشانہ غیر قابلِ اعتماد مشاہدات کے طور پر پیش کیے جاتے ہیں۔ غلط، حد سے باہر، یا منشأ سے عاری متن کو کیپشن اسٹریم میں ملانے کے بجائے مسترد کر دیا جاتا ہے۔ request-body کے دونوں ٹرانسکرپٹ چینلز فراہم کردہ منشأ کو `client` پر نارملائز کرتے ہیں، بشمول خود سے لگائے گئے `embedded` یا `audio-bridge` لیبلز۔ ان قابلِ اعتماد لیبلز کو صرف سرور کی ملکیت والا اڈاپٹر ہی صرف-کوڈ `trustedSource` آرگیومنٹ کے ذریعے تفویض کر سکتا ہے؛ request کی JSON فیلڈ اس آرگیومنٹ تک پہنچ ہی نہیں سکتی۔ ٹرانسکرپٹ متن اپنے منشأ سے قطع نظر غیر قابلِ اعتماد، میڈیا سے ماخوذ مواد ہی رہتا ہے اور اسے کبھی بھی authorization کا تعین نہیں کرنا چاہیے۔

کوئی اعلیٰ درجے کا کالر اسی ویڈیو کے لیے `audioTranscript` ٹریک بھی فراہم کر سکتا ہے؛ اسے کلائنٹ کی فراہم کردہ متن سمجھا جاتا ہے، نہ کہ سرور ٹرانسکرپشن کا ثبوت۔ فیوژن سیم بصری اور آڈیو مشاہدات کو ایک ہی ڈیڈ لائن اور abort سگنل کے تحت چلاتی ہے، انہیں ایک مشترکہ ٹائم لائن پر ترتیب دیتی ہے، بالکل مماثل ڈپلیکیٹس ضم کرتی ہے، اور جب صرف ایک طرف کامیاب ہو تو جزوی نتیجہ رپورٹ کرتی ہے۔ غلط `audioTranscript` پوری ویڈیو کو ناکام کرنے کے بجائے اسی جزوی نتیجے پر اتر آتا ہے — بصری بیان برقرار رکھا جاتا ہے اور آڈیو برانچ ایک سینیٹائزڈ ناکامی کوڈ درج کرتی ہے۔ فی-برانچ دستیابی، پارشل فلیگ، اور سینیٹائزڈ ناکامی کوڈز بیان شدہ نتیجے میں، گارڈریل میٹا ڈیٹا میں (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`)، رزلٹ کیش میٹا ڈیٹا میں، اور برج فیوژن کاؤنٹرز میں محفوظ کیے جاتے ہیں۔ پہلے سے طے شدہ Video Bridge راستہ speech-to-text کو کال نہیں کرتا اور نہ ہی میڈیا کی دوسری کاپی ڈاؤن لوڈ کرتا ہے؛ اس واضح ٹریک کے بغیر یہ صرف-ویڈیو ہی رہتا ہے۔

**ٹرانسکرپٹ برقرار رکھنا (#12150 P1).** یہ خودکار طور پر اس وقت لاگو ہوتا ہے جب بھی Video Bridge (جو خود opt-in ہے) کوئی ٹرانسکرپٹ cue رینڈر کرتا ہے — اس کے لیے کوئی الگ برقراری فلیگ موجود نہیں ہے۔ جب کوئی درخواست کوئی ٹرانسکرپٹ cue رینڈر کرتی ہے (کالر کی طرف سے متعین کردہ `transcript` یا مدغم `audioTranscript`)، تو گارڈریل اسے `videoBridgeObserved` کے طور پر نشان زد کرتا ہے اور ویڈیو تفصیل کا ایک حذف شدہ (redacted) سایہ تیار کرتا ہے — ایک بالکل ایک جیسی رینڈرنگ جس میں ہر cue کے آزاد متن والے حصے کو `[redacted-video-transcript]` سے بدل دیا جاتا ہے، جو سٹرنگ جمع ہونے سے پہلے ساختہ cue فیلڈ کو تبدیل کر کے بنایا جاتا ہے (کبھی بھی چپٹے متن کے تجزیے سے نہیں، تاکہ کوئی بھی cue مواد — مخالفانہ ہو یا عام، بشمول وہ bodies جن میں `]` ہو جیسے `[inaudible]`/`[music]` — باقی نہ رہ سکے)۔ محفوظ شدہ کال-لاگ درخواست body ہر ویڈیو سے ماخوذ متن والے حصے کو اس حذف شدہ سایے سے بدل دیتی ہے، جس کا ملاپ مواد کی مساوات سے ہوتا ہے؛ `fullText` اینکر مکمل شدہ pre-call گارڈریل payload سے دوبارہ پڑھا جاتا ہے، اس لیے ملاپ اس وقت بھی کامیاب رہتا ہے جب بعد کی چین گارڈریلز (PII اور اسناد چھپانے والے، ترجیحات 10/95) تفصیلی متن کو اپنی جگہ پر دوبارہ لکھ دیتے ہیں اور جب system-prompt/handoff/memory انجیکشن پیغام کی صف کو نئی شکل دے دیتا ہے۔ ماڈل کو اپ اسٹریم بھیجی جانے والی body غیر تبدیل شدہ رہتی ہے۔ ایک observed درخواست کوئی پائیدار Memory بھی پُر نہیں کرتی (درخواست اور جواب دونوں سے ماخوذ استخراج چھوڑ دیے جاتے ہیں)، تاکہ ماڈل کا اپنا جواب ٹرانسکرپٹ متن کی گونج Memory میں نہ ڈال سکے۔

**خام ویڈیو فیلڈز (#12430).** جب برج فعال ہو اور مقامی (native) ویڈیو سپورٹ نامعلوم یا غیر موجود ہو، تو متعین کردہ `transcript`/`audioTranscript` فیلڈز بھی `videoBridgeObserved` کو متحرک کرتی ہیں، یہاں تک کہ تفصیل کی ناکامی یا `maxVideos` حد کے بعد بھی۔ `null` اور خالی سٹرنگز شمار ہوتی ہیں؛ غیر موجود فیلڈز اور غیر ویڈیو میٹاڈیٹا شمار نہیں ہوتے۔ محفوظ شدہ کاپیاں ان فیلڈز کو حذف کرتی ہیں یا درخواست کو خارج کر دیتی ہیں، اور caches/Memory کو bypass کیا جاتا ہے۔

ان fallback راستوں پر، درست کالر cues غیر معیاری provider فیلڈز کے بجائے معاونت یافتہ `text`/`input_text` حصے بن جاتے ہیں۔ درخواست سے فراہم کردہ دونوں ٹریکس غیر قابلِ اعتماد `client` مشاہدات ہی رہتے ہیں، ساتھ میں واضح انتباہ کہ ویڈیو کی تفصیل نہیں کی گئی اور ٹائم اسٹیمپس کی میڈیا کے مقابلے میں تصدیق نہیں کی گئی۔ موجودہ 256-cue/64-KiB مجموعی اور فی-cue بجٹ دونوں ٹریکس پر مل کر لاگو ہوتے ہیں؛ ٹائم اسٹیمپس بروکر کی 600 سیکنڈ کی حد اور کسی بھی فراہم کردہ فوکس ونڈو میں سما جانے چاہییں۔ غلط ٹریکس کو ضائع کر دیا جاتا ہے، انہیں من پسند متن کے طور پر آگے نہیں بھیجا جاتا؛ درست ساتھی (sibling) پھر بھی استعمال ہو سکتا ہے جب تک ان کا مشترکہ بجٹ تجاوز نہ ہو جائے۔ Null/خالی فیلڈز کوئی متن نہیں جوڑتیں۔ یہ fallback کوئی میڈیا fetch یا ٹرانسکرپشن شامل نہیں کرتا۔ ٹرانسکرپٹ توسیعی فیلڈز fallback ویڈیو کیریئر اور اس کے `video_url`/`source` آبجیکٹس سے ہٹا دی جاتی ہیں۔ OpenAI کی wire allowlist سخت رہتی ہے؛ نامعلوم-مقامی ویڈیو کیریئرز دستیاب رہتے ہیں اور معلوم صرف-متن اہداف محفوظ مارکرز رکھتے ہیں۔ ساختہ redaction سایے ملحقہ ٹرانسکرپٹ متن کی حفاظت کرتے ہیں، جبکہ اصل کالر کی ملکیت والی درخواست غیر تبدیل شدہ رہتی ہے۔ مقامی سپورٹ والے اہداف اور غیر فعال برجز اپنے موجودہ bypass رویّے کو برقرار رکھتے ہیں۔

اضافی محفوظ شدہ کاپیاں وہی observed-request سگنل استعمال کرتی ہیں۔ خام pre-guardrail کلائنٹ-درخواست snapshot، اندرونِ میموری زیرِ التوا درخواست، اور ابتدائی مسترد درخواست لاگ، ویڈیو حصوں میں ٹرانسکرپٹ فیلڈز کو ساختی طور پر بدل دیتے ہیں؛ پائپ لائن مراحل اور context handoff سے تیار کردہ سٹرنگ پرامپٹس کو persisted-request-body sink پر حذف کر دیا جاتا ہے۔ محفوظ شدہ `video_content_removed` مارکر `previous_response_id` تسلسل کو fail-closed کر دیتا ہے بجائے اس کے کہ وہ متن دوبارہ بنائے جو جان بوجھ کر ضائع کیا گیا تھا۔ اگر کوئی observed درخواست لاگنگ سے پہلے اپنا فی-حصہ redaction سایہ کھو دے، یا بعد کی درخواست تبدیلیوں کے بعد کئی ویڈیو سایوں میں سے ایک بھی ملاپ میں ناکام ہو جائے، تو جزوی طور پر حذف شدہ ٹرانسکرپٹ رکھنے کے بجائے محفوظ شدہ درخواست body مکمل طور پر خارج کر دی جاتی ہے۔

کسی observed درخواست کے لیے، ماڈل کا جواب ٹرانسکرپٹ کے کسی بھی حصے کو بغیر کسی ساختہ cue حد کے نقل کر سکتا ہے۔ اس لیے اس کی محفوظ شدہ کال-لاگ `responseBody` کو خارج کردگی (omission) مارکر سے بدل دیا جاتا ہے؛ تفصیلی پائپ لائن artifact (جس میں upstream/client bodies اور stream chunks شامل ہو سکتے ہیں) محفوظ نہیں کیا جاتا۔ Semantic، idempotency، اور reasoning-replay کیشز اس درخواست کے لیے پڑھنے اور لکھنے دونوں کو bypass کرتی ہیں۔ provider درخواست اور کلائنٹ کو نظر آنے والا جواب غیر تبدیل شدہ رہتے ہیں۔ جب تفصیلی artifact خارج کیا جاتا ہے تو ابتدائی keepalive بائٹس عارضی بفر سے نکال دیے جاتے ہیں۔ Kiro کی خراب EventStream انتباہ صرف payload بائٹ کی تعداد بتاتی ہے، کبھی اس کا مواد یا JSON parser کی خام خرابی نہیں۔
یہ دعویٰ نہیں کرتا کہ ہر غیر متعلقہ provider/plugin تشخیصی معلومات کا آڈٹ کیا گیا ہے؛ وسیع تر retained-sink جائزے کی پیروی #11658 میں کی جا رہی ہے۔

اندرونی `/api/modality-bridge/video/drilldown` لائف سائیکل ایک الگ، loopback/ٹوکن-تصدیق شدہ کیش بنیادی ڈھانچہ ہے۔ ہر آپریشن کے لیے ایک مستند غیر شفاف (opaque) principal ID بھی درکار ہے۔ پروڈکشن کالر کو فعال کرنے سے پہلے، اسے وہ ID تصدیق شدہ tenant سے اخذ کرنا چاہیے اور کبھی بھی کلائنٹ کی منتخب کردہ قدر آگے نہیں بھیجنی چاہیے۔ کیش کیز اس principal کو مستند session اور video-reference IDs سے باندھتی ہیں، صرف ان کی SHA-256 سے اخذ شدہ کیز محفوظ کرتی ہیں، اور پڑھنے اور حذف کرنے دونوں کو اسی principal تک محدود رکھتی ہیں۔ کیش فی اندراج زیادہ سے زیادہ 16 اخذ شدہ JPEG فریم محفوظ کرتی ہے، انہیں دس منٹ بعد ختم کر دیتی ہے، اور محدود `start`/`end` پڑھنے یا واضح session حذف کرنے کی حمایت کرتی ہے۔

ہر principal کی حد 16 اندراجات اور 64 MiB مستند JPEG ڈیٹا ہے۔ یہ حدود عالمی 64-اندراج/256 MiB حد سے آزاد ہیں: principal کوٹہ دباؤ عالمی LRU بے دخلی پر غور کرنے سے پہلے صرف اسی principal کے سب سے کم حال ہی میں استعمال شدہ اندراجات کو بے دخل کرتا ہے۔ ختم شدہ اندراجات کیش سرگرمی پر principal اور عالمی دونوں حساب کتاب سے صاف کر دیے جاتے ہیں، جبکہ منسوخی اور توثیق کی ناکامی جزوی تبدیلی کو نافذ نہیں کرتی۔

کیش غیر معیاری Base64، اضافی پیڈنگ، غیر JPEG میڈیا، خراب یا کٹے ہوئے JPEGs، اور ایسے JPEGs کو مسترد کر دیتی ہے جو محدود مکمل تصویری `sharp` ڈیکوڈ کے دوران انتباہ پیدا کرتے ہیں۔ یہ ہر قبول شدہ تصویر کو معیاری JPEG کے طور پر دوبارہ انکوڈ کرتی ہے، کالر فیلڈز پر بھروسا کرنے کے بجائے ڈیکوڈ شدہ بائٹس سے چوڑائی اور اونچائی اخذ کرتی ہے، اور کسی بھی زائد پولی گلوٹ بائٹس کو برقرار رکھنے کے بجائے مسترد کر دیتی ہے۔ صرف محدود معیاری کمپریسڈ بفر کو دونوں کوٹوں میں شمار کیا جاتا ہے۔ JSON وائر لمیٹ میں 32 MiB ڈیکوڈ شدہ ان پٹ کی حد کے لیے Base64 اوورہیڈ شامل ہے۔ ہر محفوظ شدہ ڈیریویشن اپنے تصدیق شدہ JPEG فارمیٹ/ریزولوشن، سیمپلنگ پالیسی، ڈیریویشن ورژن، تخلیق کا وقت، سرور سے شمار شدہ مواد ہیش، اور ہیش شدہ پیرنٹ حوالے کے علاوہ قابلِ اعتماد کالر کے پیرنٹ مواد ہیش کو ریکارڈ کرتی ہے۔ ایٹمک کیش کمیٹ سے پہلے غیر متزامن ڈیکوڈ/ہیش مراحل کے درمیان منسوخی کی جانچ کی جاتی ہے۔

یہ قسط ابھی تک روٹ سے پروڈکشن پروڈیوسر کو منسلک نہیں کرتی اور نہ ملٹی ریزولوشن ویریئنٹ سلیکشن فراہم کرتی ہے۔ لہٰذا شفاف Video Bridge ریکوئسٹ پاتھ میں کوئی اضافی کام شامل نہیں ہوتا، جبکہ ٹیننٹ سے جُڑی پرنسپل ڈیریویشن اور مکمل FU-08 ملٹی ریزولوشن لائف سائیکل مکمل رویے کے طور پر دستاویز کیے جانے کے بجائے واضح متعاقب کام کے طور پر رہتے ہیں۔

فریمز کو کنفیگر شدہ Video ماڈل کے ساتھ ترتیب وار کیپشن دیا جاتا ہے۔ خالی Video اوورائیڈ Vision سیٹنگ وراثت میں پاتا ہے؛ اگر دونوں خالی ہوں تو Vision آٹو روٹر مؤثر ویژن کے قابل ماڈل کا انتخاب کرتا ہے۔ کامیاب کیپشنز اصل حصے کو ایک مستحکم `[Video description:` سابقے سے بدل دیتے ہیں جو متن کو غیر قابلِ اعتماد میڈیا سے ماخوذ مشاہدے کے طور پر بھی نشان زد کرتا ہے اور بعد کے ماڈلز کو میڈیا میں پائی جانے والی ہدایات پر عمل نہ کرنے کی ہدایت دیتا ہے۔ فریم کیپشن کیش کلیدوں میں JPEG بائٹس، پرامپٹ، ٹائم اسٹیمپ، اور مؤثر ماڈل شامل ہیں؛ صرف کامیاب کیپشنز کیش کیے جاتے ہیں۔ کیش اندراجات اصل کامیاب پروڈیوسر ماڈل کو برقرار رکھتے ہیں، بشمول فال بیک ماڈل کے؛ برج `mixed` رپورٹ کرتا ہے جب مختلف فریمز مختلف ماڈلز سے تیار کیے گئے ہوں۔ کیش ہٹ اس پروڈیوسر شناخت کو دوبارہ استعمال کرتی ہے بجائے اسے درخواست شدہ روٹنگ پلان کے طور پر نیا لیبل دینے کے۔ مکمل ویڈیو رزلٹ کیش ہر اس ان پٹ پر کلید بندی کی گئی ہے جو آؤٹ پٹ کو بدلتی ہے — پرامپٹ، مؤثر ماڈل، سیمپلنگ پالیسی، فریم کی تعداد، سیمینٹک تجزیہ موڈ، نارملائز شدہ فوکس ہنٹ کا SHA-256 فنگر پرنٹ، فوکس ونڈو، `transcript`، `audioTranscript`، اور کانٹیکٹ شیٹ فلیگ — لہٰذا ان میں سے کسی بھی جہت کو بدلنا کیش مس ہے، کبھی بھی باسی دوبارہ استعمال نہیں۔ ویژول ڈی ڈپ پالیسی ورژن، تھریشولڈ، اور محدود امیدوار فریم کی تعداد بھی رزلٹ کیش کلید اور میٹا ڈیٹا میں واضح ہیں؛ لہٰذا پالیسی کی تبدیلی باسی مکمل ویڈیو تفصیل کو دوبارہ استعمال نہیں کر سکتی۔ رزلٹ کیش v4 میٹا ڈیٹا موڈ اور فنگر پرنٹ رکھتا ہے، کبھی بھی خام صارف ٹاسک نہیں۔ گارڈ ریل میٹا ڈیٹا درخواست شدہ اور مؤثر دونوں تجزیہ موڈز رپورٹ کرتا ہے؛ قابلِ استعمال صارف متن کے بغیر درخواست شدہ `focused` موڈ کو مؤثر طور پر `full` رپورٹ کیا جاتا ہے۔

گارڈ ریل ہر تعاون یافتہ ویڈیو حصہ نکالتا ہے لیکن `modalityBridgeVideoMaxVideos` سے زیادہ کی تفصیل نہیں دیتا۔ ایسے ہدف کے لیے جس کا ثابت ہو چکا ہو کہ `supportsVideo === false` ہے، ناکام اور حد سے تجاوز کرنے والی ویڈیوز واضح محفوظ متن مارکرز بن جاتی ہیں تاکہ کوئی خام ویڈیو باقی نہ رہے۔ جب صلاحیت نامعلوم ہو، وہ حصے اپنے ویڈیو کیریئر کو برقرار رکھتے ہیں؛ کوئی بھی فال بیک ٹرانسکرپٹ اوپر بیان کردہ محدود متن تبدیلی کی پیروی کرتا ہے۔ `supportsVideo === true` والے اہداف برج کو بائی پاس کرتے ہیں۔ کلائنٹ ریکوئسٹ ایبارٹ سگنل ڈاؤن لوڈ، بروکر قطار، سب پروسیسز، اور کیپشن کالز میں منتقل ہوتا ہے؛ ایبارٹس ویڈیوز کے درمیان رکتے ہیں اور کبھی بھی خام میڈیا کی طرف فیل اوپن نہیں ہوتے۔

رن ٹائم سیٹنگز DB پر مبنی اور Zod سے تصدیق شدہ ہیں:

| کلید                                | ڈیفالٹ      | حد / رویہ                                                                                                  |
| ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | اختیاری رن ٹائم، آپٹ اِن                                                                                   |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` عمومی کیپشنز برقرار رکھتا ہے؛ `focused` محدود، غیر قابلِ اعتماد تازہ ترین صارف سیاق استعمال کرتا ہے |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge ماڈل وراثت میں لیتا ہے                                                                       |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                       |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`، `scene_aware`، یا متناسب `segment_aware`؛ ڈیٹیکٹر کی ناکامی `uniform` پر واپس گرتی ہے           |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                        |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                             |

120 سیکنڈ سے زیادہ پرانی محفوظ شدہ Video ٹائم آؤٹ اقدار بروکر ڈیڈ لائن تک محدود کر دی جاتی ہیں؛ اس حد سے اوپر نئی سیٹنگز کی تحریریں مسترد کر دی جاتی ہیں۔
`GET /api/modality-bridge/video/runtime` تصدیق یا رن ٹائم جانچ سے پہلے قابلِ اعتماد مہر شدہ لوپ بیک لوکیلٹی کا تقاضا کرتا ہے، پھر مینجمنٹ آتھ کا تقاضا کرتا ہے۔ یہ صرف `available`، صاف شدہ FFmpeg/ffprobe ورژنز، اور رن ٹائم دستیاب نہ ہونے کی صورت میں ایک مقررہ وجہ واپس کرتا ہے۔ اندرونی ایکسٹریکشن اینڈ پوائنٹ کوئی عوامی اپلوڈ API نہیں ہے: قطار کی سیچوریشن `503` کے ساتھ `Retry-After` واپس کرتی ہے، کالر ڈس کنیکٹ `499` واپس کرتا ہے، اور مقررہ بروکر ڈیڈ لائن `504` واپس کرتی ہے۔ تبدیل شدہ جوابات مرکزی `x-omniroute-modality-bridge` ہیڈر میں Vision یا Audio سیگمنٹس کو ہٹائے بغیر `video->text;model=<visionModel>;parts=<videos>` شامل کرتے ہیں۔

### PII Masker (`piiMasker.ts`)

**دونوں** مراحل پر چلتا ہے۔

- **`preCall`** پے لوڈ کی نقل (clone) بناتا ہے، `system`، `messages`، `input` اور
  `prompt` (بشمول سادہ اسٹرنگ آئٹمز) پر گزرتا ہے، اور اسٹرنگ `content`/`text`
  فیلڈز پر `processPII()` (جو `@/shared/utils/inputSanitizer` سے ہے) لاگو کرتا
  ہے۔ جب `PII_REDACTION_ENABLED=true` ہو تو شناخت شدہ PII آؤٹ باؤنڈ پے لوڈ میں
  حذف کر دی جاتی ہے۔ یہ `INPUT_SANITIZER_MODE` سے آزاد ہے (جو صرف پرامپٹ
  انجیکشن پالیسی کنٹرول کرتا ہے)۔ جب حذف کاری بند ہو تو یہ کال مواد کو دوبارہ
  لکھے بغیر صرف شناخت کی گنتیاں ریکارڈ کرتی ہے۔
- **`postCall`** جواب کی گہری نقل (deep clone) بناتا ہے، `sanitizePIIResponse()`
  کے ساتھ ساتھ Responses-API-shape ماسکر (`maskResponsesOutput` — جو
  `output_text` اور `output[].content[].text` کو محیط ہے) چلاتا ہے۔ اگر کوئی
  حذف کاری ہو تو ترمیم شدہ جواب اصل کی جگہ لے لیتا ہے۔

یہ گارڈ ریل کبھی بلاک نہیں کرتا؛ یہ صرف حاشیہ لگاتا ہے (`meta.detections`،
`meta.redacted`) یا دوبارہ لکھتا ہے۔

#### فی-قسم انتخاب، حسبِ منشا پیٹرن اور شناختی کاؤنٹرز

**ڈیش بورڈ → ترتیبات → سیکیورٹی → PII ماسکنگ** یہ منتخب کرتا ہے کہ _کیا_ ماسک
ہوگا۔ یہ ماسکنگ کو آن نہیں کرتا: وہ کام اب بھی `PII_REDACTION_ENABLED` (درخواست)
اور `PII_RESPONSE_SANITIZATION` (جواب + SSE) کا ہے، دونوں پہلے سے طے شدہ طور پر
بند ہیں۔

- **فی-قسم انتخاب** — بلٹ اِن ids `src/shared/constants/piiTypes.ts`
  (`PII_BUILTIN_TYPES`) میں درج ہیں۔ غیر مقرر (unset) کا مطلب ہے ہر قسم (وہی
  رویہ جو اس ترتیب کے وجود سے پہلے تھا)۔ درخواست انجن کا `ssn_us` پیٹرن `ssn`
  سے منسوب ہوتا ہے۔ ٹیمپلیٹس (Minimal، Standard، Financial، Brazilian، USA،
  Full) صرف UI میں چیک باکس بھرتے ہیں۔
- **حسبِ منشا پیٹرن** — زیادہ سے زیادہ 20 ریجیکس یا وائلڈ کارڈ پیٹرن (`*` =
  زیادہ سے زیادہ 64 غیر-وائیٹ اسپیس حروف، `?` = ایک)۔ میل `[CUSTOM_REDACTED]`
  بن جاتے ہیں۔ ہر پیٹرن `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`) سے گزرتا ہے: زیادہ سے زیادہ 500
  حروف، فلیگز صرف `g i m s u` تک محدود، لازماً کمپائل ہو، لازماً `safe-regex`
  (تباہ کن بیک ٹریکنگ) پاس کرے، اور خالی اسٹرنگ یا کسی حذف کاری پلیس ہولڈر سے
  میل نہ کھائے۔ جو پیٹرن ناکام ہو اسے محفوظ کرتے وقت اور جانچتے وقت مسترد کر
  دیا جاتا ہے، اور محفوظ شدہ ناکام قطار کو رن ٹائم پر کمپائل کرنے کے بجائے
  نظرانداز کر دیا جاتا ہے۔ حسبِ منشا پیٹرن صرف ماسکنگ آن ہونے پر چلتے ہیں۔
- **شناختی کاؤنٹرز** — فی-قسم گنتیاں (کبھی بھی میل کھائی گئی قدریں نہیں)،
  میموری میں رکھی جاتی ہیں اور دوبارہ آغاز پر ری سیٹ ہو جاتی ہیں
  (`src/lib/pii/piiDetectionStats.ts`)۔ یہ صرف ماسکنگ آن ہونے پر بڑھتی ہیں۔

یہ ترتیبات `key_value` ٹیبل میں رہتی ہیں (namespace `pii_settings`،
`src/lib/db/piiSettings.ts`) اور 1 سیکنڈ کی کیش کے ذریعے پڑھی جاتی ہیں۔ API:

| طریقہ  | راستہ                    | مقصد                                                                            |
| ------ | ------------------------ | ------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | فلیگ کی حالت، `enabledTypes`، `customPatterns`، شناختی کاؤنٹرز                  |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = تمام) اور/یا `customPatterns` کو تبدیل کرنا            |
| `POST` | `/api/settings/pii/test` | زیادہ سے زیادہ 8 KB کے نمونے کے خلاف ایک پیٹرن کا ڈرائی رن؛ کچھ محفوظ نہیں ہوتا |

تینوں کے لیے انتظامی تصدیق (management auth) درکار ہے اور یہ باڈی کی توثیق Zod
سے کرتے ہیں (`src/shared/validation/schemas/piiSettings.ts`)۔

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
