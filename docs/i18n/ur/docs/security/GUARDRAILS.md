# Guardrails (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **مستند ماخذ:** `src/lib/guardrails/`
> **آخری تازہ کاری:** 2026-08-29 — v3.8.51 (Video Bridge ٹرانسکرپٹ کا ماخذ کالر کی جانب سے بیان کیا جاتا ہے،
> ابھی سرور سے تصدیق شدہ نہیں — #11661 کے مطابق وضاحت کی گئی)

Guardrails، OmniRoute اور اپ اسٹریم فراہم کنندگان کے درمیان حد پر حفاظت، پالیسی، اور مواد کی تبدیلیوں کو نافذ کرتے ہیں۔ ہر guardrail درخواست کے پے لوڈز (`preCall`) اور
اپ اسٹریم جوابات (`postCall`) کا معائنہ کر سکتا ہے (اور اختیاری طور پر انہیں مسترد، تبدیل، یا تشریح شدہ کر سکتا ہے)۔

سسٹم **fail-open** ہے: اگر عمل درآمد کے دوران کوئی guardrail استثنا پیدا کرے، تو رجسٹری
خرابی ریکارڈ کرتی ہے اور درخواست کو ناکام کرنے کے بجائے اگلے guardrail کے ساتھ جاری رہتی ہے۔
بلاک کرنا ایک واضح فیصلہ (`block: true`) ہے، کبھی بھی اتفاقی نتیجہ نہیں۔

## بلٹ اِن حفاظتی رکاوٹیں

رجسٹری امپورٹ ہوتے ہی ترجیحی ترتیب میں چھ حفاظتی رکاوٹیں خودکار طور پر لوڈ کرتی ہے
(`registry.ts` → `registerDefaultGuardrails()` دیکھیں):

| ترجیح | نام                 | مرحلہ/مراحل    | فائل                  |
| ----- | ------------------- | -------------- | --------------------- |
| `5`   | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`   | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`   | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`  | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`  | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`  | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

کم ترجیحی نمبر **پہلے** چلتے ہیں۔

### وژن برج (`visionBridge.ts`) — موڈیلٹی برج PR-1

**غیر وژن ماڈلز** کو بھیجی جانے والی، تصاویر پر مشتمل درخواستوں کو روکتا ہے اور یا تو
پوری درخواست کو وژن کی صلاحیت رکھنے والے ماڈل کی طرف دوبارہ روٹ کرتا ہے، یا upstream
کال سے پہلے تصویر والے حصوں کو ایک قابلِ ترتیب وژن ماڈل کی تیار کردہ متنی وضاحتوں سے
بدل دیتا ہے۔ اس سے صرف متن فراہم کرنے والے providers شفاف انداز میں
multimodal payloads سنبھال سکتے ہیں۔

بہاؤ:

1. اگر ہدف ماڈل پہلے ہی وژن کی معاونت کرتا ہے تو چھوڑ دیں (سوائے اس صورت کے کہ وہ
   جبری برج فہرست `isVisionBridgeForcedModel` میں موجود ہو)۔
2. `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`) کے ذریعے تصویر والے حصے اخذ کریں، جو
   `open-sse/utils/mediaParts.ts` میں موجود **متحدہ میڈیا
   ڈیٹیکٹر** `detectMediaParts()` کو کام سونپتا ہے — یہی combo compatibility filter
   کے ساتھ مشترک، واحد مستند ماخذ ہے۔
   اخذ کرنے کا عمل صرف ان اعلیٰ سطحی حصوں کی شکلوں تک allowlist کیا گیا ہے جنہیں
   `replaceImageParts` واپس جوڑ سکتا ہے (extract↔replace معاہدہ): OpenAI
   `image_url`، Anthropic base64 `source.type:"base64"`، Anthropic URL
   `source.type:"url"`، اور Responses API `input_image`۔ Nested نتائج اور
   صرف indicator والی شکلیں combo-filter کا مواد ہیں اور کبھی اخذ نہیں کی جاتیں۔
   اگر کچھ نہ ملے تو چھوڑ دیں۔
3. `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) کے ذریعے runtime config حل کریں:
   نئی `modalityBridge*` settings keys کو ترجیح حاصل ہے؛ پرانی `visionBridge*` keys
   **ایک سائیکل کے fallback** (rollback window) کے طور پر برقرار رہتی ہیں۔
   برج غیر فعال ہونے کی صورت میں کسی بھی میڈیا traversal سے پہلے چھوڑ دیں۔
4. موڈ selector (`modalityBridgeVisionMode`، نیچے جدول دیکھیں) reroute یا describe کا
   فیصلہ کرتا ہے۔ Reroute صرف `model` تبدیل کرکے `modifiedPayload` واپس کرتا ہے،
   نیز meta `{ rerouted, fromModel, toModel, imagesKept }` بھی دیتا ہے۔
5. Describe راستہ: تصاویر کو `maxImages` تک محدود کریں، کام سے آگاہ prompt مرتب کریں،
   describe cache سے رجوع کریں، وژن ماڈل کو **متوازی طور پر**
   (`Promise.allSettled`) کال کریں، اور ان کی جگہ `[Image N]: <description>` متنی
   حصے داخل کریں۔ ناکام describe سے `null` حاصل ہوتا ہے اور اصل تصویر والا حصہ
   **محفوظ** رہتا ہے (#4012) — سوائے combo describe راستے کے، جب تمام
   describe ناکام ہوں؛ اس صورت میں تصدیق شدہ غیر وژن upstream کو
   `(دستیاب نہیں — وژن کی صلاحیت رکھنے والا کوئی provider منسلک نہیں ہے)` stub دیا جاتا ہے (#8430)۔
6. `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) واپس کریں۔

#### موڈ selector (`modalityBridgeVisionMode`)

| موڈ        | ڈیفالٹ | طرزِ عمل                                                                                                                                                                                                                                                                             |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔      | پرانا heuristic، بغیر تبدیلی کے (#6640/#7204): non-combo/`auto/` ماڈلز کو بہترین وژن ماڈل کی طرف reroute کیا جاتا ہے، سوائے اس صورت کے کہ اصل ماڈل کے پاس پہلے ہی قابلِ استعمال credentials ہوں (تب describe کیا جاتا ہے)؛ combo اہداف کو ہمیشہ describe کیا جاتا ہے۔                |
| `describe` |        | ہمیشہ describe کریں — reroute بلاک مکمل طور پر چھوڑ دیا جاتا ہے؛ صارف کا منتخب کردہ ماڈل ہمیشہ جواب دیتا ہے۔                                                                                                                                                                         |
| `reroute`  |        | جبری reroute: keep-credentialed-model guard کو نظرانداز کیا جاتا ہے۔ reroute کے **ہدف** کا credential guard پھر بھی لاگو ہوتا ہے — جب کوئی قابلِ استعمال وژن ہدف موجود نہ ہو تو درخواست describe پر منتقل ہو جاتی ہے تاکہ خام تصاویر کبھی صرف متن والے backend تک نہ پہنچیں (#8430)۔ |

جبری موڈز، auto heuristic چلنے سے **پہلے** ہی عمل مختصر کر دیتے ہیں؛ `auto` کا طرزِ عمل
PR-1 سے پہلے والی حفاظتی رکاوٹ سے byte-identical ہے۔

#### API-key کا دائرۂ کار (`visionBridgeKeyScope.ts`)

جب کال کرنے والے کی API key، `allowedConnections`، quota pools
(`allowedQuotas`) یا ماڈلز (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) کو محدود کرتی ہے، تو برج
reroute اور describe کے لیے صرف وہی ماڈلز اور connections منتخب کرتا ہے جن کے استعمال
کی key کو اجازت ہو۔ اس کے بعد describe کال ہمیشہ
`x-omniroute-self-loop-key-id` header کے ساتھ OmniRoute self-loop کے ذریعے جاتی ہے،
تاکہ وصول کرنے والی chat درخواست اس key کی connection اور model policy کو دوبارہ
نافذ کرے۔ `enforceApiKeyPolicy()` صرف self-loop bearer کے ساتھ مل کر ہی اس header
کا لحاظ کرتا ہے، اس لیے یہ صرف رسائی کو مزید محدود کر سکتا ہے، اور ایسا id جو resolve
نہ ہو مسترد کر دیا جاتا ہے۔

اگر key کے لیے کسی وژن ماڈل کی اجازت نہ ہو تو describe راستہ ایک طرف ہو جاتا ہے اور
درخواست بغیر تبدیلی کے گزر جاتی ہے، جو غیر فعال حفاظتی رکاوٹ جیسے fail-open طرزِ عمل
کے مساوی ہے (meta `{ skipped: true, reason: "no_permitted_vision_model" }`)۔
key کے بغیر درخواستیں، اور ایسی keys جن پر یہ پابندیاں نہ ہوں، بالکل پہلے کی طرح
عمل کرتی ہیں۔

#### کام سے آگاہ describe prompt (`modalityBridgeVisionTaskAware`)

ڈیفالٹ **true** ہے۔ `composeVisionPrompt()` (`visionBridgeHelpers.ts`) بنیادی
وضاحتی پرامپٹ کے ساتھ **آخری صارف کے پیغام** کا متن (500 حروف تک محدود) شامل
کرتا ہے، جس سے وضاحت اس جانب مرکوز ہوتی ہے جو صارف نے حقیقتاً پوچھا تھا
(codex-vision-proxy طرز)، اور ویژن ماڈل سے نظر آنے والے متن کو نقل کرنے کا کہتا
ہے۔ فلیگ بند ہونے — یا صارف کا متن موجود نہ ہونے — کی صورت میں بنیادی پرامپٹ
بغیر تبدیلی کے استعمال ہوتا ہے۔

وضاحتی سیلف لوپ کی اپنی OpenAI-مطابق درخواست (`callVisionModelSingle()`
در `visionBridgeHelpers.ts`) ہمیشہ `image_url.detail: "high"` کی درخواست کرتی
ہے — غیر مشروط طور پر، ہر کالر/فراہم کنندہ کے لیے، اور کسی کلائنٹ سگنل سے مشروط
نہیں۔ کم تفصیل کی سیمپلنگ عین اسی متن نقل کرنے کے کام کے لیے OCR کی درستگی کو
کم کرتی ہے جس کا یہ پرامپٹ تقاضا کرتا ہے، اس لیے وضاحتی کال خود ہمیشہ زیادہ
تفصیل طلب کرتی ہے، خواہ اصل آنے والی درخواست میں کوئی بھی تفصیلی سطح استعمال
کی گئی ہو۔ یہ صرف اندرونی وضاحتی درخواست کی باڈی کو متاثر کرتا ہے؛ یہ اس طریقے
کو تبدیل نہیں کرتا جس سے OmniRoute بنیادی درخواست پر کالر کی اپنی
`image_url.detail` کو فارورڈ کرتا ہے — وہ ڈیفالٹ الگ سے لاگو ہوتا ہے، اور صرف
شناخت شدہ OpenCode کلائنٹس کے لیے، `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`) میں۔ وضاحتی سیلف لوپ کی Anthropic
وائر-فارمیٹ شاخ میں کوئی `detail` فیلڈ نہیں ہے اور دونوں ڈیفالٹس میں سے کسی سے
متاثر نہیں ہوتی۔

#### وضاحتی آؤٹ پٹ کی حد (`modalityBridgeVisionMaxChars`)

| کلید                           | ڈیفالٹ | حد               |
| ------------------------------ | ------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` یا 100–50000 |

`0` (ڈیفالٹ) کا مطلب **کوئی حد نہیں** ہے — `callVisionModel()` کی واپس کردہ
وضاحت بغیر ترمیم کے آگے بھیج دی جاتی ہے، جس سے موجودہ رویہ برقرار رہتا ہے۔
100–50000 کی حد میں کوئی بھی قدر وضاحت کو واپس
`[Image N]: <description>` کے طور پر شامل کیے جانے سے پہلے `…` لاحقے کے ساتھ
مختصر کر دیتی ہے (`VisionBridgeGuardrail.preCall()` در
`src/lib/guardrails/visionBridge.ts`)۔ تفصیل سے بھرپور OCR کاموں کے لیے، جہاں
بعد کے ماڈل کو مکمل نقل درکار ہو، اسے بڑھائیں؛ زیادہ گفتگو کرنے والے ویژن ماڈلز
پر ٹوکن کے استعمال کو محدود رکھنے کے لیے اسے کم کریں۔ ڈیش بورڈ فیلڈ Vision ٹیب
کے Advanced پینل میں موجود ہے (`modality-bridge-max-chars` در
`ModalityBridgeVisionTab.tsx`) اور 1 سے 99 کے درمیان کسی بھی قدر کو کم از کم
100 تک بڑھا دیتا ہے، جبکہ واضح `0` کو بغیر تبدیلی کے چھوڑتا ہے — `0` بذات خود
ایک درست Zod قدر ہے
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`)، محض "غیر
متعین" ڈیفالٹ نہیں۔

#### وضاحتی کیش (`modalityBridge/bridgeCache.ts`)

وضاحتی آؤٹ پٹس کے لیے اِن-میموری LRU + TTL کیش، جو پورے پراسیس میں مشترک ہے۔
کلید = `sha256(imageRef + composedPrompt + configuredBridgeModel)`، جس میں
لمبائی-سابقہ فریمنگ استعمال ہوتی ہے (فیلڈ کی حدود کے تصادم کے بغیر)۔ ماڈل کا
جزو **کنفیگر کردہ** برج ماڈل ہے، نہ کہ وہ ماڈل جس نے حقیقتاً جواب دیا —
`callVisionModel` اندرونی طور پر متبادل ماڈل استعمال کر سکتا ہے، اور ہر کوشش
کے لحاظ سے کلید بندی کیش کو منتشر کر دے گی۔ ناکام وضاحتیں کبھی کیش نہیں کی
جاتیں۔ ترتیبات:

| کلید                            | ڈیفالٹ | حد      |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### ریموٹ تصویر کی نارملائزیشن (سیلف لوپ وضاحت/base64 بازیافت)

جب برج خود کوئی **ریموٹ** تصویر حاصل کرتا ہے — Anthropic وضاحتی سیلف کال اور
claude-wire-format کی base64 تبدیلی (`ensureBase64ImagesForClaudeWire`)، دونوں
`visionBridgeHelpers.ts` میں `fetchRemoteImageAsDataUri()` کے ذریعے — تو نتیجے
میں ملنے والی ڈیٹا URI کو ویژن ماڈل کی درخواست میں شامل کیے جانے سے پہلے
`normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) سے گزارا جاتا ہے۔
حد سے بڑی تصاویر کو **2048px طویل کنارے** تک گھٹا دیا جاتا ہے (اس ری سائز حد
سے مطابقت رکھتے ہوئے جو OpenAI/Anthropic پہلے ہی سرور کی جانب لاگو کرتے ہیں)،
جس سے ویژن ماڈل کو نظر آنے والی چیز بدلے بغیر اپ لوڈ بائٹس/تاخیر کم ہوتی ہے۔
ری سائزنگ `sharp` استعمال کرتی ہے، جسے ڈائنامک امپورٹ کے ذریعے لوڈ کیا جاتا ہے:
کسی ایسے پلیٹ فارم پر جہاں اس کی مقامی بائنری لوڈ ہونے میں ناکام ہو،
`normalizeDataUri()` **کبھی خرابی نہیں پھینکتا** — یہ اصل بائٹس کو جوں کا توں
آگے بھیجنے پر واپس آ جاتا ہے، لہٰذا وضاحتی/base64-تبدیلی کا راستہ ہمیشہ کام
کرتا رہتا ہے۔ غیر تصویری بائٹس (ایسی بازیافت جس نے قابل ڈی کوڈ تصویر واپس نہ
کی ہو) بھی بغیر تبدیلی کے آگے بھیج دی جاتی ہیں۔ یہ نارملائزیشن صرف ان تصاویر
تک محدود ہے جنہیں برج اپنی سیلف کال کے لیے حاصل کرتا ہے — اسے کالر کے خام
پاس تھرو پے لوڈ پر کبھی لاگو نہیں کیا جاتا، جو صرف واضح رضامندی پر تبدیلی کے
اصول (سخت اصول #20) سے مطابقت رکھتا ہے۔

#### ترتیبات کا اسکیما + منتقلی

نئی `modalityBridge*` کلیدیں `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) میں Zod کے ذریعے توثیق شدہ ہیں:
`modalityBridgeVisionEnabled`، `modalityBridgeVisionMode`،
`modalityBridgeVisionModel`، `modalityBridgeVisionTaskAware`،
`modalityBridgeVisionPrompt`، `modalityBridgeVisionTimeout`،
`modalityBridgeVisionMaxImages`، `modalityBridgeVisionMaxChars`،
`modalityBridgeCache*` کی تینوں کلیدیں، اور Audio Bridge کا استعمال کردہ
`modalityBridgeAudio*` گروپ۔ منتقلی `141_modality_bridge_settings.sql` موجودہ
لیگیسی `visionBridge*` اقدار کو متعلقہ نئی کلیدوں میں نقل کرتی ہے (آئیڈیم پوٹنٹ
ہے، اور آپریٹر کی مقرر کردہ `modalityBridge*` قدر کو کبھی اوور رائٹ نہیں کرتی)؛
لیگیسی کلیدیں ایک ریلیز سائیکل تک پڑھنے کے متبادل کے طور پر قبول کی جاتی ہیں۔

#### شفافیت کا ہیڈر + اعداد و شمار

وضاحت کے ذریعے تبدیل شدہ جوابات میں
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
شامل ہوتا ہے (`modalityBridge/bridgeStats.ts` میں
`buildModalityBridgeHeader()` کے ذریعے بنایا گیا، اور
`src/sse/handlers/chatHelpers.ts` میں `withModalityBridgeHeader()` کے ذریعے
ثبت کیا گیا)۔ دوبارہ روٹ کی گئی درخواستوں کو **کوئی** ہیڈر نہیں ملتا — پے لوڈ
بغیر تبدیلی کے تھا اور ماڈل کی تبدیلی پہلے ہی جوابی باڈی کے `model` فیلڈ میں
نظر آتی ہے۔

`GET /api/modality-bridge/stats` (انتظامی توثیق، وہی درجہ جو
`GET /api/settings` کا ہے) ہر modality کے لیے اِن میموری کاؤنٹرز
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` کو `vision`، `audio`، اور
`video` کے لیے واپس کرتا ہے۔ `averageLatencyMs` اپنے مخرج کے طور پر تمام کوششوں
کے بجائے `latencySamples` استعمال کرتا ہے؛ بغیر وقت کی پیمائش والا آپریشن صفر
ملی سیکنڈ کا فرضی نمونہ نہیں بناتا۔ `bridged` کامیاب تبدیلیوں کے لیے پس ماندہ
مطابقت رکھنے والا عرف ہی رہتا ہے؛ ناکام کوششیں اس میں اضافہ نہیں کرتیں۔
ڈیزائن کے مطابق، پراسیس دوبارہ شروع ہونے پر کاؤنٹرز ری سیٹ ہو جاتے ہیں
(یہ ٹیلی میٹری ہے، حساب کتاب نہیں)۔

#### ڈیش بورڈ کی تشکیل

مختص ڈیش بورڈ صفحہ
`/dashboard/settings/modality-bridge` ہے۔ اس کے URL کے ذریعے قابلِ رسائی `Vision`، `Audio`،
اور `Video` ٹیبز، `tab` کی قدر تبدیل کرتے ہوئے query parameters برقرار رکھتے ہیں۔
Vision ٹیب فعال کاری، موڈ، ماڈل کا انتخاب (بشمول خودکار
ڈیفالٹ)، ٹاسک سے آگاہ prompting، timeout/image/description-length/cache کی جدید
حدود، رن ٹائم
کاؤنٹرز، اور guard شدہ نمونہ درخواست فراہم کرتا ہے۔ Audio ٹیب بھی فعال ہے: یہ
فعال کاری، Auto کے ساتھ صرف STT ماڈل منتخب کنندہ، timeout/max-clip کی حدود، آڈیو
کاؤنٹرز، اور ایک `input_audio` نمونہ ٹیسٹ فراہم کرتا ہے۔ Video ٹیب فعال ہے: یہ
FFmpeg/ffprobe کی رن ٹائم حالت رپورٹ کرتا ہے — چار واضح UI حالتوں میں سے ایک (`unknown` جب
probe جاری ہو یا مکمل نہ ہو سکا ہو، غیر loopback
ڈیش بورڈ ہوسٹ پر `restricted` جہاں probe کو کلائنٹ سائیڈ پر چھوڑ دیا جاتا ہے، probe کیے جانے
اور عدم دستیابی کی تصدیق کے بعد `unavailable`، یا FFmpeg/ffprobe ورژنز کے ساتھ `available`) — فعال کاری/ماڈل/frame/video/timeout کی حدود
محفوظ رکھتا ہے، ماڈل منتخب کنندہ کو vision-capable
ماڈلز تک محدود کرتا ہے، اور ویڈیو کاؤنٹرز فراہم کرتا ہے۔

AI settings کے تحت سابقہ Vision Bridge کارڈ اب نئے صفحے کا ایک compatibility لنک
ہے؛ اب یہ فارم کی دوسری نقل کا مالک نہیں ہے۔ Media Providers بھی موجودہ
Speech-to-Text playground کو ہٹائے بغیر Image-to-Text اور Speech-to-Text workflows کو متعلقہ Modality
Bridge ٹیبز سے منسلک کرتا ہے۔

**Self-loop admission bypass:** جب describe کال OmniRoute کے
اپنے `/v1` self-loop (غیر معیاری provider model) کے ذریعے route ہوتی ہے، تو ذیلی درخواست
`x-omniroute-admission-bypass: internal` بھیجتی ہے اور resolved
self-loop credential کے ساتھ authenticate ہوتی ہے — local mode میں مقامی `sk_omniroute` sentinel، یا
آپریٹر کی تشکیل کردہ `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env key (#1350)، تاکہ
`REQUIRE_API_KEY=true` deployments بھی describe کال چلا سکیں۔ bypass
صرف انہی عین credentials کے لیے قبول کیا جاتا ہے، اس لیے بیرونی clients admission کو
چھوڑنے کے لیے header استعمال نہیں کر سکتے۔

Legacy defaults، `src/shared/constants/visionBridgeDefaults.ts` میں موجود ہیں؛
نئے mode/task-aware/cache defaults اور settings resolver
`src/shared/constants/modalityBridgeDefaults.ts` میں موجود ہیں۔ guardrail ایک
`deps` constructor option فراہم کرتا ہے تاکہ tests جعلی `getSettings` اور
`callVisionModel` implementations داخل کر سکیں۔

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

آڈیو رکھنے والی chat requests کو ایسے target تک پہنچنے سے پہلے روک لیتا ہے جو
آڈیو input قبول کرنے کے لیے معروف نہیں۔ یہ chat request کو کبھی دوبارہ route نہیں کرتا: آڈیو حصوں
کو موجودہ OpenAI-compatible multipart endpoint کے ذریعے transcribe کیا جاتا ہے اور
منتخب کردہ chat model متنی transcripts کے ساتھ جاری رہتا ہے۔

عمل:

1. `getResolvedModelCapabilities()` کے ذریعے `supportsAudio` resolve کریں۔ واضح
   provider-registry metadata کو ترجیح حاصل ہے، پھر static model metadata، پھر synced
   `modalities_input` کو۔ `audio` کے بغیر اعلان کردہ input list، `false` ہے؛ capability
   کا کوئی ثبوت نہ ہونے پر قدر `null` رہتی ہے۔ `false` اور `null` دونوں محتاط
   bridge کو فعال کرتے ہیں، جبکہ `true` اسے bypass کرتا ہے۔
2. `modalityBridgeAudio*` settings کو resolve کریں اور مشترکہ `detectMediaParts()`
   detector کے ذریعے ہر message سے splice کیے جا سکنے والے top-level
   audio parts نکالیں۔ معاون wire shapes میں OpenAI `input_audio`، `audio_url`، اور
   `source.media_type: "audio/*"` شامل ہیں۔ Nested audio کو routing کے لیے شناخت کیا جاتا ہے لیکن
   splice path اسے نہیں ہٹاتا۔ کام کو `modalityBridgeAudioMaxClips` محدود کرتا ہے؛
   بعد کے حصے جوں کے توں رہتے ہیں۔
3. تشکیل کردہ `provider/model` کا احترام کریں، یا `selectAudioBridgeModel()` کو
   `AUDIO_TRANSCRIPTION_PROVIDERS` میں مستحکم catalog order کے مطابق چلنے دیں اور قابلِ استعمال
   active provider credential والا پہلا model منتخب کرنے دیں۔
4. `callAudioTranscription()`، base64/data-URI audio کو multipart
   `file` میں تبدیل کرتا ہے، یا DNS pinning اور 25 MB کی حد کے ساتھ public-only outbound
   guard کے ذریعے remote `audio_url` download کرتا ہے۔ پھر یہ file اور منتخب کردہ
   model کو مقامی `/v1/audio/transcriptions` self-loop پر POST کرتا ہے، جس کی توثیق
   `resolveSelfLoopBearer()` کے ذریعے ہوتی ہے۔ موجودہ transcription route معمول کے مطابق
   credential lookup، cooldown/rate-limit handling، اور provider dispatch انجام دیتا ہے۔
5. کامیاب calls اپنے parts کو `[Audio N]: <transcript>` سے بدل دیتی ہیں۔ Calls
   `Promise.allSettled` کے ساتھ چلتی ہیں: انفرادی ناکامی اصل
   audio part کو برقرار رکھتی ہے (#4012 contract)۔ اگر ہر call ناکام ہو اور target کے بارے میں ثابت ہو کہ
   `supportsAudio === false` ہے، تو parts
   `[Audio N]: (unavailable — no STT provider connected)` بن جاتے ہیں (#8430 contract)۔ کسی
   نامعلوم target (`null`) کے لیے، سب کی ناکامی کا نتیجہ جوں کا توں رہتا ہے۔ ایسا ثابت شدہ
   text-only target جس کے پاس قابلِ استعمال STT credential نہ ہو، network call کیے بغیر
   یہی واضح stub وصول کرتا ہے۔

کامیاب transcripts پورے process میں مشترک Modality Bridge LRU/TTL cache استعمال کرتے ہیں۔
key میں audio reference، مستحکم `audio-transcription` operation
label، اور منتخب کردہ STT model یکجا ہوتے ہیں؛ ناکامیاں کبھی cache نہیں کی جاتیں۔ Audio attempts مشترکہ
`bridged`، `cacheHits`، `failures`، اور `lastUsedAt` counters اپ ڈیٹ کرتی ہیں۔
تبدیل شدہ responses میں
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` شامل ہوتا ہے؛ جوں کی توں
requests کو Audio Bridge segment موصول نہیں ہوتا۔

رن ٹائم settings DB-backed اور Zod-validated ہیں:

| کلید                          | ڈیفالٹ  | حد               |
| ----------------------------- | ------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                |
| `modalityBridgeAudioModel`    | `""`    | خودکار یا STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10             |

مشترکہ کیش اب بھی `modalityBridgeCacheEnabled`،
`modalityBridgeCacheTtlMinutes`، اور `modalityBridgeCacheMaxEntries` کے ذریعے کنٹرول ہوتا ہے۔

### ویڈیو برج (`videoBridge.ts`، `videoBridgePipeline.ts`)

ایسے ہدف کو کال کرنے سے پہلے، جس کے بارے میں مقامی ویڈیو معاونت معلوم نہ ہو، Chat Completions کے `messages` اور Responses API کے `input` میں اعلیٰ سطح کے ویڈیو حصوں کو روک لیتا ہے۔
معاونت یافتہ ساختیں `input_video`، `video_url`، `video_source`، HTTPS URLs،
اور `data:video/*;base64,...` ڈیٹا URIs ہیں۔ متن میں موجود سادہ فائل ناموں کو
ویڈیو نہیں سمجھا جاتا۔

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) درخواست میں گزرنے، صلاحیت/پالیسی کی جانچ، فی درخواست تجمیع، اور جوابی پے لوڈ کا ذمہ دار ہے۔
ہر ویڈیو سے متعلق کام — حصول، مکمل نتیجے کا کیش، فریموں کی ترتیب کی وضاحت (جو کالر کی جانب سے فراہم کردہ آڈیو ٹرانسکرپٹ کو ضم کرتی ہے)، اور فی کوشش میٹرکس/منسوخی/صفائی — `videoBridgePipeline.ts` میں `processVideoPart` کے پیچھے پوشیدہ ہے، جسے `preCall` کے لوپ کے اندر ہر ویڈیو حصے کے لیے ایک مرتبہ کال کیا جاتا ہے۔
یہ ماڈیول واضح پورٹ حدود `VideoMediaBrokerPort`
(بائٹس حاصل کرنا اور نمونہ شدہ فریم نکالنا)، `VideoAudioTranscriptionPort`
(کالر کی جانب سے فراہم کردہ آڈیو ٹرانسکرپٹ کو نمونہ شدہ کیپشنز کے ساتھ ضم کرنا)، اور
`VideoDrilldownPort` (فریم ڈرل ڈاؤن کی استقامت کی حد؛ ابھی تک
`processVideoPart` کے ساتھ منسلک نہیں — فی الحال صرف علیحدہ `/api/modality-bridge/video/drilldown`
روٹ ڈرل ڈاؤن اندراجات لکھتا ہے) بھی متعین کرتا ہے۔

عوامی `/v1` درخواست کا راستہ کبھی کسی ذیلی عمل کو درآمد یا طلب نہیں کرتا۔
دور دراز ویڈیوز 50 MiB کی حد کے تحت ڈاؤن لوڈ کی جاتی ہیں؛ ان لائن base64 ویڈیوز کے لیے فی ویڈیو ڈی کوڈ شدہ حجم کی محتاط حد 36 MiB ہے، تاکہ ماڈل/پیغامات/فریمنگ کا مجموعی خول 50 MiB کی عوامی JSON درخواست کی قبولیت کی حد کے اندر رہ سکے۔
مختص کرنے سے پہلے ان لائن طوالت اور ڈی کوڈ شدہ حجم کے تخمینے جانچے جاتے ہیں۔
ابتدائی دور دراز URL اور ہر ری ڈائریکٹ پر HTTPS درکار ہے، جس کے لیے DNS پننگ کے ساتھ موجودہ صرف-عوامی آؤٹ باؤنڈ محافظ استعمال ہوتا ہے۔
اس کے بعد بائٹس عین داخلی `POST /api/modality-bridge/video/extract` بروکر حد سے گزرتی ہیں۔
یہ روٹ `LOCAL_ONLY` اور `SPAWN_CAPABLE` دونوں ہے، صرف فی عمل تصدیق شدہ، قابل اعتماد لوپ بیک درخواست قبول کرتا ہے، اور کبھی URL، فائل سسٹم پاتھ، قابلِ عمل فائل، یا آرگومنٹ فہرست قبول نہیں کرتا۔
API کے باڈی سائز کی پائپ لائن اور ہینڈلر کا تدریجی باڈی ریڈر، دونوں آزادانہ طور پر بروکر ان پٹ کی 50 MiB حد نافذ کرتے ہیں۔
اس کی محدود قطار ایک وقت میں ایک استخراج چلاتی ہے، چار زیرِ التوا کاموں کی اجازت دیتی ہے، اور زیرِ التوا ان پٹ کو 100 MiB تک محدود رکھتی ہے۔

بروکر کے اندر، `ffprobe` ایک نجی مقامی فائل پڑھتا ہے؛ مقررہ فارمیٹ کی اجازت فہرست میں پلے لسٹ اور مینی فیسٹ فارمیٹس شامل نہیں ہیں۔
اجازت یافتہ MOV-خاندان کے کنٹینرز کے لیے، بیرونی MOV ڈیٹا حوالہ جات ڈیفالٹ طور پر غیر فعال رہتے ہیں، اور مقررہ کمانڈ انہیں فعال کرنے کا انتخاب نہیں کرتی۔
`ffprobe` اور `ffmpeg` دونوں صرف `file` پروٹوکول کی اجازت فہرست، ایک تھریڈ، مقررہ آرگومنٹ ایریز، بغیر شیل، اور `PATH` سے حل کردہ قابلِ عمل فائلیں استعمال کرتے ہیں۔
منسلک تصویری کور اسٹریمز قابلِ پلے امیدوار نہیں ہیں۔
تمام قابلِ پلے اسٹریمز کو حدود پوری کرنا ضروری ہے، اور متعین ڈیفالٹ اسٹریم کو قطعی کم ترین انڈیکس والے فال بیک پر ترجیح دی جاتی ہے۔
ویڈیوز 600 سیکنڈ، فی بُعد 8,192 پکسلز، اور 33,554,432 ماخذ پکسلز تک محدود ہیں۔
FFmpeg وسطی نقطوں پر 1–16 JPEG فریموں کے نمونے لیتا ہے، چھوٹے ان پٹس کو بڑا کیے بغیر طویل کنارے کو زیادہ سے زیادہ 1,024 پکسلز تک گھٹاتا ہے، اور اسے کبھی URL نہیں دیا جاتا۔
ڈیفالٹ طور پر نمونہ کاری `uniform` ہے۔
اختیاری `scene_aware` اور تجرباتی `segment_aware` پالیسیاں پہلے سے توثیق شدہ مقامی اسٹریم پر ایک اضافی مقررہ FFmpeg پاس انجام دیتی ہیں، محدود `showinfo` منظر ٹائم اسٹیمپس منتخب کرتی ہیں، اور ڈیٹیکٹر کی ناکامی، ٹائم آؤٹ، ناقص آؤٹ پٹ، یا خالی امیدوار مجموعے کی صورت میں قطعی طور پر انہی یکساں وسطی نقطوں پر واپس آ جاتی ہیں۔
سیگمنٹ سے آگاہ موڈ توثیق شدہ منظر وقفوں کے تناسب سے وسطی نقطے کے نمونے مختص کرتا ہے؛ سیگمنٹ سے آگاہ شواہد اور فال بیک رویے کی تفصیل ذیل میں دی گئی ہے۔
ہر پالیسی میں انتخاب کے بعد 16 فریموں کی سخت حد لاگو کی جاتی ہے۔
جب منظر سے آگاہ درخواست کے پاس صرف ایک فریم کا بجٹ ہو، تو یہ فعال مکمل ویڈیو یا فوکس ونڈو کا یکساں وسطی نقطہ استعمال کرتی ہے اور `policyEffective: uniform` رپورٹ کرتی ہے: ایک منتخب منظر فریم دونوں زمانی سروں کو محفوظ نہیں رکھ سکتا۔
کالر اختیاری طور پر محدود فوکس ونڈو (`start`/`end` سیکنڈز) فراہم کر سکتا ہے؛ حدود کو میڈیا کے دورانیے تک محدود کیا جاتا ہے، الٹی یا غیر محدود ونڈوز مسترد کر دی جاتی ہیں، اور نمونہ کاری کی تمام پالیسیاں صرف معمول پر لائے گئے وقفے کے اندر انجام دی جاتی ہیں۔
نتیجے میں حاصل ہونے والی ونڈو کو نمونہ کاری کے میٹا ڈیٹا اور ناقابلِ اعتماد وضاحتی سابقے میں شامل کیا جاتا ہے، تاکہ بعد کے ماڈلز مرکوز اقتباس کو مکمل ٹائم لائن سے ممتاز کر سکیں۔

معنوی کیپشن فوکس ایک علیحدہ، واضح ترتیب ہے۔
ڈیفالٹ `full` تجزیاتی موڈ موجودہ فریم پرامپٹ کو برقرار رکھتا ہے اور کبھی درخواست کا متن کیپشن ماڈل کو نہیں بھیجتا۔
`focused` موڈ میں، برج اسی Chat یا Responses کنٹینر سے صرف صارف کا لکھا ہوا تازہ ترین غیر خالی `text`/`input_text` پڑھتا ہے، اسے NFC کے مطابق معمول پر لاتا ہے، کنٹرول حروف اور سفید خالی جگہ کو سمیٹتا ہے، اور اسے 500 Unicode کوڈ پوائنٹس تک محدود کرتا ہے۔
خالی نتیجہ عین `full` پرامپٹ پر واپس آ جاتا ہے۔
قابلِ استعمال اشارے کو ایک مخصوص ناقابلِ اعتماد صارف سیاق بلاک میں JSON کی صورت میں سیریلائز کیا جاتا ہے اور وہ صرف قابلِ مشاہدہ تفصیلات کو ترجیح دے سکتا ہے؛ وہ میڈیا میں دکھائی یا سنائی دینے والی ہدایات پر عمل نہ کرنے کی علیحدہ تنبیہ کو منسوخ نہیں کر سکتا۔
متنی فوکس کبھی `start`/`end` اخذ نہیں کرتا اور نہ ہی زمانی سیمپلر کو تبدیل کرتا ہے۔

#### FU-07 ساختی سیگمنٹ شواہد

`segment_aware` پہلے سے توثیق شدہ مقامی ویڈیو اسٹریم پر ایک محدود پیشگی تجزیاتی مرحلہ استعمال کرتا ہے۔ مقررہ فلٹر چین پہلے چوڑائی کو زیادہ سے زیادہ 320 پکسل تک اسکیل کرتی ہے، منظر کی تبدیلیوں اور منجمد وقفوں کا پتا لگاتی ہے، پھر دھندلاپن، اوسط لیوما، اور مکانی/وقتی معلومات کے لیے فی سیکنڈ 1 فریم کا نمونہ لیتی ہے۔ یہ مرحلہ 600 ساختی نمونوں، ایک FFmpeg/فلٹر تھریڈ، انہی صرف-`file` پروٹوکول اور کنٹینر کی اجازت یافتہ فہرستوں، 1 MiB پراسیس آؤٹ پٹ کی حد، اور بروکر کے مشترکہ منسوخی/ڈیڈ لائن کے اندر زیادہ سے زیادہ 30 سیکنڈ تک محدود ہے۔ یہ درخواست سے کبھی کوئی کمانڈ، فلٹر، پاتھ، یا URL قبول نہیں کرتا۔

ساختی اقدار قطعی نمونہ جاتی شواہد ہیں، ویڈیو کی معنوی تفہیم نہیں۔ یہ موضوعات، افعال، کیپشنز، گفتگو، یا صارف کے ارادے کا استنباط نہیں کرتیں۔ منظر اور انجماد کی حدود سیگمنٹس بناتی ہیں؛ انجماد کی کوریج، دھندلاپن، ایکسپوژر، مکانی تفصیل، اور وقتی تبدیلی صرف اس بات پر اثر انداز ہوتے ہیں کہ موجودہ 1–16 فریم بجٹ کیسے مختص کیا جائے۔ مکمل طور پر منجمد سیگمنٹ کو زیادہ سے زیادہ ایک فریم دیا جاتا ہے، جبکہ غیر منجمد سیگمنٹس باقی بجٹ کے لیے مقابلہ کرتے ہیں۔ جب حدود کی تعداد فریموں سے زیادہ ہو، تو ٹائم لائن کی یکساں کوریج برقرار رکھی جاتی ہے تاکہ ابتدائی تیز کٹس کسی طویل آخری سیگمنٹ کو چھپا نہ سکیں۔ انجماد کی حد کے 1 سیکنڈ کے تجزیاتی ریزولیوشن کے اندر آنے والی منظر کی حدود کو یکجا کر دیا جاتا ہے۔

غائب فلٹرز، بدہیئت/خالی شواہد، ڈیٹیکٹر کی خرابی، یا محدود پیشگی تجزیے کا ٹائم آؤٹ عین یکساں وسطی نقطہ پالیسی پر کھلے انداز میں ناکام ہوتے ہیں۔ کالر کی منسوخی یا بروکر کی ڈیڈ لائن کھلے انداز میں ناکام نہیں ہوتی: یہ زیرِ عمل ذیلی پراسیس کو ختم کرتی ہے، بعد میں فریم نکالنے کو روکتی ہے، اور نجی عارضی ٹری کو `finally` میں ہٹا دیا جاتا ہے۔

`scripts/perf/video-bridge-fu07-eval.ts` ڈی ڈپلیکیشن کے بعد کیپشن کالز میں بچت، کثیف حرکت کے بجٹ کی تخصیص، دھندلاپن/ایکسپوژر/SI-TI شواہد، طویل آخری حصے والی تیز کٹس، اور تدریجی فیڈ کے غلط مثبت نتائج کے لیے قطعی حقیقی FFmpeg فکسچرز بناتا ہے۔ یہ پیشگی تجزیے کا وال ٹائم ریکارڈ کرتا ہے اور، جہاں `/usr/bin/time` دستیاب ہو، چائلڈ CPU اور چوٹی RSS بھی ریکارڈ کرتا ہے۔ اس کے معیار کے جائزے صرف ساختی اوریکلز ہیں۔ حقیقی کیپشن ماڈل کا معیار `HOLD` ہی رہتا ہے کیونکہ اس ہارنس کے پاس کوئی مجاز اینڈ پوائنٹ یا منجمد جج موجود نہیں۔ مالی بچت بھی `HOLD` ہی رہتی ہے، جب تک `--caption-cost-per-call-usd` فی کال لاگت کا کوئی واضح مثبت تخمینہ فراہم نہ کرے؛ اسکرپٹ کبھی بھی کسی نتیجے کو خود سے وضع نہیں کرتا۔

ہر فریم 4 MiB تک، تمام خام فریم مجموعی طور پر 23 MiB تک، اور سیریلائز شدہ بروکر جواب 32 MiB تک محدود ہے۔ ایک نجی عارضی ڈائریکٹری کو `finally` میں ہٹا دیا جاتا ہے۔ OmniRoute اپنے ساتھ FFmpeg شامل نہیں کرتا اور حسبِ ضرورت ایگزیکیوٹیبل پاتھ قبول نہیں کرتا۔ کیپشننگ سے پہلے، برج ایک محتاط بصری ڈی ڈپلیکیشن مرحلہ لاگو کرتا ہے: ہر JPEG کو 16×16 گرے اسکیل بفر تک گھٹایا جاتا ہے اور اس کا موازنہ صرف آخری برقرار رکھے گئے فریم سے کیا جاتا ہے۔ ایک فریم سے زیادہ کے مطلوبہ کیپشن بجٹ کے لیے، اخذ کرنے کا عمل اس بجٹ کے زیادہ سے زیادہ دو گنا اور کبھی بھی 16 فریموں سے زیادہ نہ ہونے والا محدود امیدوار پول فراہم کرتا ہے۔ مطلوبہ حد صرف ڈی ڈپلیکیشن کے بعد لاگو ہوتی ہے، اور جب بجٹ کم از کم دو ہو تو آخری تخفیف کے دوران پہلے اور آخری منتخب امیدوار برقرار رکھے جاتے ہیں۔ ورژن شدہ `grayscale-16x16-mean-cells-v2` پالیسی اوسط لیوما ڈیلٹا اور ان تھمب نیل سیلز کے تناسب میں سے بڑی قدر استعمال کرتی ہے جن کا نارملائزڈ ڈیلٹا کم از کم 0.05 ہو۔ ڈپلیکیٹ تھریش ہولڈ مستقل 0.04 ہے، جسے رن ٹائم سیٹنگ کے طور پر ظاہر کرنے کے بجائے قابلِ پیش گوئی ہونے کی خاطر منتخب کیا گیا ہے۔ یہ ثانوی زیادہ کنٹراسٹ والا سگنل معمولی حرکت اور نظر آنے والے متن کی ان تبدیلیوں کو محفوظ رکھتا ہے جنہیں صرف اوسط پر مبنی موازنہ چھپا سکتا ہے۔ کمپیریٹر یا ڈیکوڈر کی خرابیاں کھلے انداز میں ناکام ہوتی ہیں اور کوریج برقرار رکھتی ہیں۔ آؤٹ پٹ میٹا ڈیٹا اخذ کردہ امیدواروں، کامیابی سے استعمال شدہ فریموں، اور خارج کیے گئے بصری ڈپلیکیٹس کو الگ الگ ظاہر کرتا ہے۔

واضح طور پر نشان زد ویڈیو پارٹ ٹائم اسٹیمپ والی کانٹیکٹ شیٹ کی درخواست کر سکتا ہے۔ برج زیادہ سے زیادہ 4 کالم اور 16 فریموں پر مشتمل JPEG گرڈ بناتا ہے۔ ہر 512 پکسل سیل اپنے ماخذ کا ٹائم اسٹیمپ ایک زیادہ کنٹراسٹ والی نچلی پٹی پر ثبت کرتا ہے، جبکہ یہی ٹائم اسٹیمپس بعد کی وابستگی اور آڈٹ کے لیے متنی میٹا ڈیٹا میں بھی موجود رہتے ہیں۔ مکمل JPEG بدستور 32 MiB تک محدود رہتا ہے۔ اگر `sharp` گرڈ کو ڈی کوڈ یا کمپوز نہ کر سکے، تو برج انفرادی JPEG فریموں پر واپس آ جاتا ہے؛ کلائنٹ کی منسوخی پھر بھی شیٹ آپریشن میں منتقل ہوتی ہے۔

پروموشن کے شواہد کو مصنوعی کمپوزیشن مائیکرو بینچ مارک سے جان بوجھ کر الگ رکھا گیا ہے۔ `scripts/perf/video-bridge-contact-sheet-eval.ts` حقیقی OpenAI سے مطابقت رکھنے والے وژن ماڈلز کے لیے اسکیما ورژن شدہ A/B ہارنس کی وضاحت کرتا ہے۔ یہ فراہم کنندہ کی رپورٹ کردہ ٹوکنز، ابتدا سے انتہا تک وال لیٹنسی (بشمول شیٹ کمپوزیشن)، ماڈل کالز کی تعداد، اور مینی فیسٹ میں متعین حقائق کے برقرار رہنے کی پیمائش کرتا ہے۔ ماڈل کے خام جوابات رپورٹ میں نہیں لکھے جاتے؛ صرف SHA-256 ڈائجسٹس اور مماثل فیکٹ IDs محفوظ رکھے جاتے ہیں۔ ہارنس کوئی نیٹ ورک یا بامعاوضہ ماڈل کال نہیں کرتا، جب تک `--execute-real` پاس نہ کیا جائے اور `--model`، `OMNIROUTE_BASE_URL`، اور `OMNIROUTE_API_KEY` کنفیگر نہ ہوں۔ اس واضح حقیقی رن کے بغیر، اس کا مشین کے قابلِ مطالعہ فیصلہ `HOLD` ہی رہتا ہے؛ صرف مصنوعی پے لوڈ/کال کی تعداد کی پیمائشیں پروموشن کے شواہد نہیں ہیں۔

کالرز کسی معاونت یافتہ ویڈیو پارٹ کے ساتھ اختیاری `transcript.cues` ارے منسلک کر سکتے ہیں، جب ان کے پاس پہلے سے ہم وقت متن موجود ہو۔ ہر کیو میں `text`، جانچی گئی مدت کے اندر ایک محدود `start`/`end` وقفہ، اور اجازت یافتہ فہرست میں شامل `source` (`client`، `embedded`، یا `audio-bridge`) ہونا ضروری ہے؛ `confidence` کی طے شدہ قدر `1` ہے اور اسے `0` اور `1` کے درمیان رہنا چاہیے۔ بالکل یکساں کیوز کو یکجا کر دیا جاتا ہے۔ OmniRoute اس میٹا ڈیٹا سے کبھی ٹرانسکرپشن شروع نہیں کرتا: توثیق شدہ کیوز کو ماخذ، اعتماد، اور وقفے سمیت بیان کردہ نتیجے میں نقل کیا جاتا ہے، اور فریم کیپشنز کے ساتھ ناقابلِ اعتماد مشاہدات کے طور پر پیش کیا جاتا ہے۔ نامعتبر، حد سے باہر، یا ماخذی ثبوت سے محروم متن کو کیپشن اسٹریم میں ملانے کے بجائے مسترد کر دیا جاتا ہے۔ درخواست باڈی کے دونوں ٹرانسکرپٹ چینلز فراہم کردہ ماخذی ثبوت کو `client` میں نارملائز کرتے ہیں، جس میں خود سے منسوب کردہ `embedded` یا `audio-bridge` لیبلز بھی شامل ہیں۔ صرف سرور کی ملکیت والا اڈاپٹر کوڈ-صرف `trustedSource` آرگیومنٹ کے ذریعے یہ قابلِ اعتماد لیبلز تفویض کر سکتا ہے؛ درخواست کا JSON فیلڈ اس آرگیومنٹ تک نہیں پہنچ سکتا۔ ٹرانسکرپٹ متن اپنے ماخذی ثبوت سے قطع نظر ناقابلِ اعتماد، میڈیا سے اخذ کردہ مواد ہی رہتا ہے، اور اسے کبھی بھی اجازت کا تعین نہیں کرنا چاہیے۔

ایک ماہر کالر اسی ویڈیو کے لیے ایک `audioTranscript` ٹریک فراہم کر سکتا ہے؛
اسے کلائنٹ کی فراہم کردہ تحریر سمجھا جاتا ہے، سرور ٹرانسکرپشن کا ثبوت نہیں۔
فیوژن سیَم بصری اور صوتی مشاہدات کو ایک ہی ڈیڈ لائن اور abort سگنل کے تحت
چلاتا ہے، انہیں ایک مشترکہ ٹائم لائن پر ترتیب دیتا ہے، بالکل یکساں نقول کو یکجا
کرتا ہے، اور جب صرف ایک جانب کامیاب ہو تو جزوی نتیجہ رپورٹ کرتا ہے۔
ایک نامعتبر `audioTranscript` اسی جزوی نتیجے تک تنزلی کا باعث بنتا ہے — بصری
تفصیل برقرار رکھی جاتی ہے اور آڈیو برانچ ایک صاف کیا گیا ناکامی کوڈ درج کرتی ہے —
بجائے اس کے کہ پوری ویڈیو ناکام ہو جائے۔ ہر برانچ کی دستیابی، جزوی فلیگ،
اور صاف کیے گئے ناکامی کوڈز بیان کردہ نتیجے، guardrail میٹاڈیٹا (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`)، نتیجہ-cache میٹاڈیٹا، اور bridge
فیوژن کاؤنٹرز میں محفوظ رہتے ہیں۔ ڈیفالٹ Video Bridge راستہ speech-to-text
کو طلب نہیں کرتا اور نہ ہی میڈیا کی دوسری نقل ڈاؤن لوڈ کرتا ہے؛ اس واضح ٹریک
کے بغیر، یہ صرف ویڈیو ہی رہتا ہے۔

**ٹرانسکرپٹ برقرار رکھنا (#12150 P1)۔** یہ اس وقت خودکار طور پر لاگو ہوتا ہے جب بھی
Video Bridge (جو خود opt-in ہے) کوئی ٹرانسکرپٹ cue رینڈر کرتا ہے — برقرار رکھنے کا
کوئی الگ فلیگ نہیں ہے۔ جب کوئی درخواست کسی بھی ٹرانسکرپٹ cue (کالر کی جانب سے متعین
`transcript` یا فیوز شدہ `audioTranscript`) کو رینڈر کرتی ہے، تو guardrail اسے
`videoBridgeObserved` کے طور پر نشان زد کرتا ہے اور ویڈیو کی تفصیل کا ایک مخفی shadow بناتا ہے —
ایک ایسا یکساں رینڈر جس میں ہر cue کی آزاد متن والی باڈی کو
`[redacted-video-transcript]` سے بدل دیا جاتا ہے، اور یہ تبدیلی string بنائے جانے سے
پہلے structured cue فیلڈ کو بدل کر کی جاتی ہے (flattened متن کو کبھی parse نہیں کیا
جاتا، اس لیے cue کا کوئی بھی مواد — خواہ معاندانہ ہو یا معمول کا، بشمول `]` رکھنے والی
باڈیز جیسے `[inaudible]`/`[music]` — باقی نہیں رہ سکتا)۔ محفوظ شدہ call-log درخواست کی باڈی
ہر ویڈیو سے اخذ شدہ متنی حصے کو مواد کی برابری سے مماثل اس مخفی shadow سے بدل دیتی ہے؛
`fullText` اینکر کو مکمل شدہ pre-call guardrail payload سے دوبارہ پڑھا جاتا ہے، تاکہ
بعد کے chain guardrails (PII اور credential maskers، ترجیحات 10/95) تفصیل کے متن کو
اسی جگہ دوبارہ لکھ دیں، اور system-prompt/handoff/memory injection پیغامات کی array
کو نئی شکل دے، تب بھی مماثلت کامیاب رہے۔ ماڈل کو upstream بھیجی جانے والی باڈی
بغیر تبدیلی کے رہتی ہے۔ ایک مشاہدہ شدہ درخواست کسی durable Memory کو بھی آباد نہیں کرتی
(درخواست اور جواب، دونوں سے اخذ شدہ extraction چھوڑ دی جاتی ہے)، اس لیے ماڈل کا اپنا
جواب ٹرانسکرپٹ متن کو Memory میں واپس نقل نہیں کر سکتا۔

**خام ویڈیو فیلڈز (#12430)۔** جب bridge فعال ہو اور native ویڈیو سپورٹ نامعلوم یا غیر موجود ہو، تو متعین `transcript`/`audioTranscript` فیلڈز بھی `videoBridgeObserved` کو فعال کرتی ہیں، حتیٰ کہ تفصیل کی ناکامی یا `maxVideos` حد کے بعد بھی۔ `null` اور خالی strings شمار ہوتی ہیں؛ غیر موجود فیلڈز اور غیر ویڈیو میٹاڈیٹا شمار نہیں ہوتے۔ برقرار رکھی گئی نقول ان فیلڈز کو مخفی کرتی ہیں یا درخواست کو حذف کر دیتی ہیں، اور caches/Memory کو bypass کیا جاتا ہے۔

ان fallback راستوں پر، کالر کے درست cues غیر معیاری provider فیلڈز کے بجائے معاونت یافتہ `text`/`input_text`
حصوں میں تبدیل ہو جاتے ہیں۔ درخواست کے ساتھ فراہم کردہ دونوں ٹریک غیر معتبر `client`
مشاہدات رہتے ہیں، اور ان کے ساتھ واضح تنبیہ ہوتی ہے کہ ویڈیو کی تفصیل بیان نہیں کی گئی
اور timestamps کی میڈیا کے مقابلے میں توثیق نہیں کی گئی۔ موجودہ
256-cue/64-KiB مجموعی اور فی cue بجٹ دونوں ٹریکس پر مشترکہ طور پر لاگو ہوتے ہیں؛
timestamps کو broker کی 600-second حد اور فراہم کردہ کسی بھی focus
window کے اندر ہونا چاہیے۔ نامعتبر ٹریکس کو ضائع کر دیا جاتا ہے، انہیں من مانے متن کے
طور پر آگے نہیں بھیجا جاتا؛ کوئی درست sibling پھر بھی استعمال کیا جا سکتا ہے، جب تک
ان کا مشترکہ بجٹ تجاوز نہ کرے۔ Null/empty فیلڈز کوئی متن شامل نہیں کرتیں۔ اس fallback
کے ذریعے کوئی media fetch یا transcription شامل نہیں کی جاتی۔
Transcript extension فیلڈز کو fallback ویڈیو carrier اور اس کے
`video_url`/`source` آبجیکٹس سے ہٹا دیا جاتا ہے۔ OpenAI wire allowlist سخت رہتی ہے؛ unknown-native
ویڈیو carriers دستیاب رہتے ہیں اور معلوم text-only اہداف محفوظ markers برقرار رکھتے ہیں۔
Structured redaction shadows شامل کردہ ٹرانسکرپٹ متن کی حفاظت کرتے ہیں، جبکہ
کالر کی ملکیت والی اصل درخواست غیر تبدیل شدہ رہتی ہے۔ Native-supported اہداف اور
غیر فعال bridges اپنا موجودہ bypass رویہ برقرار رکھتے ہیں۔

اضافی برقرار رکھی گئی نقول بھی یہی observed-request سگنل استعمال کرتی ہیں۔ خام
pre-guardrail client-request snapshot، in-memory pending درخواست، اور ابتدائی
rejected-request لاگ ویڈیو حصوں میں ٹرانسکرپٹ فیلڈز کو ساختی طور پر بدل دیتے ہیں؛
pipeline مراحل اور context handoff کے ذریعے بنائے گئے string prompts کو
persisted-request-body sink پر مخفی کیا جاتا ہے۔ محفوظ شدہ `video_content_removed` marker
کی وجہ سے `previous_response_id` continuation، جان بوجھ کر ضائع کیے گئے متن کو دوبارہ
تشکیل دینے کے بجائے fail closed ہو جاتا ہے۔ اگر ایک observed درخواست logging سے پہلے
اپنا per-part redaction shadow کھو دے، یا بعد کی درخواست کی تبدیلیوں کے بعد متعدد
ویڈیو shadows میں سے حتیٰ کہ ایک بھی مماثل نہ ہو سکے، تو جزوی طور پر مخفی ٹرانسکرپٹ
محفوظ کرنے کے بجائے برقرار رکھی جانے والی درخواست کی باڈی مکمل طور پر حذف کر دی جاتی ہے۔

ایک observed درخواست کے لیے، ماڈل کا جواب structured cue boundary کے بغیر
ٹرانسکرپٹ کے کسی بھی حصے کا اقتباس دے سکتا ہے۔ اس لیے اس کی محفوظ شدہ call-log
`responseBody` کو ایک omission marker سے بدل دیا جاتا ہے؛ تفصیلی
pipeline artifact (جس میں upstream/client باڈیز اور stream chunks شامل ہو سکتے ہیں)
محفوظ نہیں رکھا جاتا۔ Semantic، idempotency، اور reasoning-replay caches اس درخواست
کے لیے reads اور writes کو bypass کرتے ہیں۔ provider درخواست اور کلائنٹ کو نظر آنے والا
جواب غیر تبدیل شدہ رہتے ہیں۔ جب تفصیلی artifact حذف کیا جاتا ہے تو ابتدائی keepalive
bytes کو عارضی buffer سے نکال دیا جاتا ہے۔ Kiro کی malformed EventStream
تنبیہ صرف payload byte count رپورٹ کرتی ہے، کبھی اس کا مواد یا JSON
parser کی خام error نہیں۔
یہ دعویٰ نہیں کیا جاتا کہ ہر غیر متعلقہ provider/plugin diagnostic کا
آڈٹ کیا جا چکا ہے؛ زیادہ وسیع retained-sink جائزے کو #11658 میں ٹریک کیا گیا ہے۔

داخلی `/api/modality-bridge/video/drilldown` لائف سائیکل ایک علیحدہ،
لوپ بیک/ٹوکن سے تصدیق شدہ کیش سبسٹریٹ ہے۔ ہر آپریشن کے لیے ایک
کینونیکل مبہم پرنسپل ID بھی درکار ہوتی ہے۔ کسی پروڈکشن کالر کو فعال کرنے سے پہلے، اسے
تصدیق شدہ ٹیننٹ سے وہ ID اخذ کرنی چاہیے اور کبھی بھی
کلائنٹ کی منتخب کردہ قدر آگے نہیں بھیجنی چاہیے۔ کیش کیز اس پرنسپل کو کینونیکل سیشن اور
ویڈیو-ریفرنس IDs سے منسلک کرتی ہیں، صرف ان کی SHA-256 سے اخذ کردہ کیز محفوظ کرتی ہیں، اور پڑھنے
اور حذف کرنے، دونوں کو اسی پرنسپل تک محدود رکھتی ہیں۔ کیش فی اندراج زیادہ سے زیادہ 16 اخذ کردہ JPEG
فریمز محفوظ کرتی ہے، انہیں دس منٹ بعد زائد المیعاد کر دیتی ہے، اور محدود
`start`/`end` ریڈز یا واضح سیشن حذف کرنے کی سہولت دیتی ہے۔

ہر پرنسپل کو 16 اندراجات اور 64 MiB کینونیکل JPEG ڈیٹا تک محدود رکھا گیا ہے۔ یہ
حدود عالمی 64-اندراج/256 MiB حد سے آزاد ہیں: پرنسپل کوٹے کا
دباؤ عالمی LRU اخراج پر غور کیے جانے سے پہلے صرف اسی پرنسپل کے سب سے کم حالیہ استعمال شدہ
اندراجات کو خارج کرتا ہے۔ کیش سرگرمی کے دوران زائد المیعاد اندراجات کو پرنسپل اور
عالمی اکاؤنٹنگ، دونوں سے صاف کر دیا جاتا ہے، جبکہ منسوخی اور توثیق کی ناکامی
جزوی متبادل کو کمٹ نہیں کرتیں۔

کیش غیر کینونیکل Base64، ضرورت سے زیادہ پیڈنگ، غیر JPEG میڈیا، ناقص یا
نامکمل JPEGs، اور ایسے JPEGs کو مسترد کرتی ہے جو محدود مکمل-تصویر `sharp`
ڈی کوڈ کے دوران تنبیہ پیدا کریں۔ یہ ہر قبول شدہ تصویر کو کینونیکل JPEG کے طور پر دوبارہ انکوڈ کرتی ہے،
کالر کی فیلڈز پر بھروسا کرنے کے بجائے ڈی کوڈ شدہ بائٹس سے چوڑائی اور اونچائی اخذ کرتی ہے،
اور کسی بھی اختتامی پولی گلاٹ بائٹس کو برقرار رکھنے کے بجائے ضائع کر دیتی ہے۔ دونوں کوٹوں میں صرف
محدود کینونیکل کمپریسڈ بفر شمار کیا جاتا ہے۔ JSON وائر حد میں 32 MiB
ڈی کوڈ شدہ-ان پٹ حد کے لیے Base64 اوورہیڈ شامل ہے۔ ہر
محفوظ شدہ اخذ میں اس کا توثیق شدہ JPEG فارمیٹ/ریزولیوشن، سیمپلنگ پالیسی،
اخذ کا ورژن، تخلیق کا وقت، سرور سے شمار کردہ مواد ہیش، اور ہیش شدہ پیرنٹ
ریفرنس کے ساتھ قابلِ اعتماد کالر کا پیرنٹ-مواد ہیش ریکارڈ ہوتا ہے۔ ایٹمی کیش کمٹ سے پہلے
غیر ہم وقت ڈی کوڈ/ہیش مراحل کے درمیان منسوخی کی جانچ کی جاتی ہے۔

یہ مرحلہ ابھی تک کسی پروڈکشن پروڈیوسر کو روٹ سے منسلک نہیں کرتا اور
ملٹی-ریزولیوشن ویریئنٹ انتخاب فراہم نہیں کرتا۔ اس لیے شفاف Video Bridge درخواست
راستے پر کوئی اضافی کام عائد نہیں ہوتا، جبکہ ٹیننٹ سے منسلک پرنسپل اخذ اور
مکمل FU-08 ملٹی-ریزولیوشن لائف سائیکل کو مکمل رویے کے طور پر دستاویزی شکل دینے کے بجائے
واضح آئندہ کام کے طور پر برقرار رکھا گیا ہے۔

کنفیگر کردہ Video ماڈل کے ذریعے فریمز کے کیپشن سلسلہ وار بنائے جاتے ہیں۔ ایک خالی
Video اوور رائیڈ Vision سیٹنگ وراثت میں لیتا ہے؛ اگر دونوں خالی ہوں تو Vision
آٹو-راؤٹر مؤثر، بصارت کی صلاحیت رکھنے والا ماڈل منتخب کرتا ہے۔ کامیاب کیپشنز
اصل حصے کو ایک مستقل `[Video description:` پریفکس سے بدل دیتے ہیں، جو متن کو
غیر قابلِ اعتماد، میڈیا سے اخذ کردہ مشاہدے کے طور پر بھی نشان زد کرتا ہے اور ڈاؤن اسٹریم
ماڈلز کو میڈیا میں پائی جانے والی ہدایات پر عمل نہ کرنے کا کہتا ہے۔ فریم-کیپشن کیش کیز میں
JPEG بائٹس، پرامپٹ، ٹائم اسٹیمپ، اور مؤثر ماڈل شامل ہوتے ہیں؛ صرف کامیاب
کیپشنز کیش کیے جاتے ہیں۔ کیش اندراجات اصل کامیاب پروڈیوسر ماڈل کو برقرار رکھتے ہیں،
جس میں فال بیک ماڈل بھی شامل ہے؛ جب مختلف فریمز مختلف ماڈلز نے
تیار کیے ہوں تو برج `mixed` رپورٹ کرتا ہے۔ کیش ہٹ اس پروڈیوسر شناخت کو
درخواست کردہ راؤٹنگ پلان کے نام سے دوبارہ لیبل کرنے کے بجائے دوبارہ استعمال کرتی ہے۔ مکمل-ویڈیو نتیجے
کی کیش کی کلید ہر ایسے ان پٹ پر مبنی ہوتی ہے جو آؤٹ پٹ کو تبدیل کرتا ہے — پرامپٹ، مؤثر
ماڈل، سیمپلنگ پالیسی، فریم کی تعداد، سیمینٹک تجزیہ موڈ، نارملائز کردہ فوکس ہنٹ کا SHA-256
فنگر پرنٹ، فوکس ونڈو، `transcript`،
`audioTranscript`، اور کانٹیکٹ-شیٹ فلیگ — لہٰذا ان
جہتوں میں سے کسی کو تبدیل کرنا کیش مِس ہوتا ہے، کبھی بھی پرانے نتیجے کا دوبارہ استعمال نہیں۔ بصری ڈی ڈپ پالیسی
ورژن، تھریش ہولڈ، اور محدود امیدوار-فریم تعداد بھی نتیجہ-کیش کی
کلید اور میٹا ڈیٹا میں واضح ہیں؛ اس لیے پالیسی میں تبدیلی کسی پرانی
مکمل-ویڈیو تفصیل کو دوبارہ استعمال نہیں کر سکتی۔ نتیجہ-کیش v4 میٹا ڈیٹا موڈ اور
فنگر پرنٹ محفوظ رکھتا ہے، مگر کبھی بھی خام صارف ٹاسک نہیں۔ گارڈ ریل میٹا ڈیٹا درخواست کردہ
اور مؤثر، دونوں تجزیہ موڈز رپورٹ کرتا ہے؛ قابلِ استعمال صارف متن کے بغیر درخواست کردہ `focused`
موڈ کو مؤثر طور پر `full` رپورٹ کیا جاتا ہے۔

گارڈ ریل ہر معاونت یافتہ ویڈیو حصے کو نکالتا ہے، مگر
`modalityBridgeVideoMaxVideos` سے زیادہ کی وضاحت نہیں کرتا۔ ایسے ہدف کے لیے جس کے بارے میں ثابت ہو کہ
`supportsVideo === false`، ناکام اور حد سے زائد ویڈیوز واضح محفوظ
متنی مارکرز بن جاتی ہیں تاکہ کوئی خام ویڈیو باقی نہ رہے۔ جب صلاحیت نامعلوم ہو تو وہ حصے
اپنا ویڈیو کیریئر برقرار رکھتے ہیں؛ کوئی بھی فال بیک ٹرانسکرپٹ مذکورہ بالا محدود متن
تبدیلی کی پیروی کرتا ہے۔ `supportsVideo === true` والے اہداف برج کو بائی پاس کرتے ہیں۔
کلائنٹ درخواست کا ابورٹ سگنل ڈاؤن لوڈ، بروکر قطار،
ذیلی پراسیسز، اور کیپشن کالز تک منتقل ہوتا ہے؛ ابورٹس ویڈیوز کے درمیان رک جاتے ہیں اور کبھی بھی خام
میڈیا کی جانب فیل اوپن نہیں ہوتے۔

رن ٹائم سیٹنگز DB کی پشت پناہی رکھتی اور Zod سے توثیق شدہ ہیں:

| کلید                                | ڈیفالٹ      | حد / طرزِ عمل                                                                                           |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | اختیاری رن ٹائم، صریح انتخاب کے ذریعے فعال                                                              |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` عمومی کیپشنز محفوظ رکھتا ہے؛ `focused` محدود، ناقابلِ اعتماد تازہ ترین صارف سیاق استعمال کرتا ہے |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge ماڈل وراثت میں لیتا ہے                                                                    |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                    |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`، `scene_aware`، یا متناسب `segment_aware`؛ ڈیٹیکٹر کی ناکامی پر `uniform` استعمال ہوتا ہے     |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                     |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                          |

120 سیکنڈ سے زیادہ کی پہلے سے محفوظ شدہ Legacy Video ٹائم آؤٹ اقدار کو
بروکر کی آخری مہلت تک محدود کر دیا جاتا ہے؛ اس حد سے زیادہ نئی ترتیبات محفوظ کرنے کی کوششیں مسترد کر دی جاتی ہیں۔
`GET /api/modality-bridge/video/runtime` کو توثیق یا رن ٹائم کی جانچ سے پہلے قابلِ اعتماد، مہر شدہ loopback
مقامیت درکار ہوتی ہے، اور پھر management
auth درکار ہوتی ہے۔ یہ صرف `available`، صاف کردہ FFmpeg/ffprobe ورژنز، اور رن ٹائم دستیاب نہ ہونے پر ایک مقررہ
وجہ واپس کرتا ہے۔ اندرونی extraction endpoint کوئی
عوامی upload API نہیں ہے: queue کی گنجائش پوری ہونے پر `503` کے ساتھ `Retry-After`، کالر کے
منقطع ہونے پر `499`، اور بروکر کی مقررہ آخری مہلت پر `504` واپس ہوتا ہے۔ تبدیل شدہ responses مرکزی
`x-omniroute-modality-bridge` header میں
`video->text;model=<visionModel>;parts=<videos>` شامل کرتے ہیں، Vision یا Audio segments کو ہٹائے بغیر۔

### PII ماسکر (`piiMasker.ts`)

**دونوں** مراحل میں چلتا ہے۔

- **`preCall`** payload کو clone کرتا ہے، `system`، `messages`، `input`، اور
  `prompt` (سادہ string آئٹمز سمیت) سے گزرتا ہے، اور string `content`/`text` فیلڈز پر
  `processPII()` (`@/shared/utils/inputSanitizer` سے) لاگو کرتا ہے۔ جب
  `PII_REDACTION_ENABLED=true` ہو، تو شناخت شدہ PII کو outbound
  payload میں مخفی کر دیا جاتا ہے۔ یہ `INPUT_SANITIZER_MODE` سے آزاد ہے (جو صرف
  prompt-injection پالیسی کو کنٹرول کرتا ہے)۔ جب مخفی کرنا بند ہو، تو کال مواد کو دوبارہ لکھے بغیر شناخت کی
  تعداد ریکارڈ کرتی ہے۔
- **`postCall`** response کو deep-clone کرتا ہے، `sanitizePIIResponse()` کے ساتھ
  Responses-API-shape ماسکر (`maskResponsesOutput` — جو
  `output_text` اور `output[].content[].text` کا احاطہ کرتا ہے) چلاتا ہے۔ اگر کوئی مخفی کاری ہو، تو
  ترمیم شدہ response اصل کی جگہ لے لیتا ہے۔

guardrail کبھی بلاک نہیں کرتا؛ یہ صرف تشریحات (`meta.detections`،
`meta.redacted`) شامل کرتا ہے یا مواد دوبارہ لکھتا ہے۔

#### فی قسم انتخاب، حسبِ ضرورت patterns اور شناختی counters

**Dashboard → Settings → Security → PII masking** یہ منتخب کرتا ہے کہ _کیا_ مخفی کیا جائے۔ یہ
masking کو فعال نہیں کرتا: اس کے لیے اب بھی `PII_REDACTION_ENABLED` (request) اور
`PII_RESPONSE_SANITIZATION` (response + SSE) استعمال ہوتے ہیں، اور دونوں ڈیفالٹ طور پر بند ہیں۔

- **فی قسم انتخاب** — built-in ids کی فہرست
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) میں ہے۔ غیر متعین ہونے کا مطلب ہر
  قسم ہے (اس ترتیب کے موجود ہونے سے پہلے والا طرزِ عمل)۔ request engine کا
  `ssn_us` pattern، `ssn` سے map ہوتا ہے۔ Templates (Minimal، Standard، Financial،
  Brazilian، USA، Full) صرف UI میں checkboxes پُر کرتے ہیں۔
- **حسبِ ضرورت patterns** — زیادہ سے زیادہ 20 regex یا wildcard patterns (`*` = زیادہ سے زیادہ 64
  non-whitespace حروف، `?` = ایک)۔ مماثلتیں `[CUSTOM_REDACTED]` بن جاتی ہیں۔
  ہر pattern، `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`) سے گزرتا ہے: زیادہ سے زیادہ 500 حروف، flags صرف
  `g i m s u` تک محدود، لازماً compile ہو، `safe-regex` (تباہ کن
  backtracking) سے پاس ہو، اور خالی string یا redaction placeholder سے مماثل نہ ہو۔
  ناکام ہونے والا pattern محفوظ یا آزماتے وقت مسترد کر دیا جاتا ہے، اور محفوظ شدہ row
  ناکام ہو تو runtime پر compile ہونے کے بجائے چھوڑ دی جاتی ہے۔ حسبِ ضرورت patterns صرف
  masking فعال ہونے پر چلتے ہیں۔
- **شناختی counters** — فی قسم تعداد (کبھی بھی مماثل values نہیں)، memory میں رکھی جاتی ہے
  اور restart پر reset ہوتی ہے (`src/lib/pii/piiDetectionStats.ts`)۔ یہ صرف
  masking فعال ہونے پر بڑھتی ہے۔

ترتیبات `key_value` table (namespace `pii_settings`،
`src/lib/db/piiSettings.ts`) میں محفوظ ہوتی ہیں اور 1 s cache کے ذریعے پڑھی جاتی ہیں۔ API:

| طریقہ  | راستہ                    | مقصد                                                                            |
| ------ | ------------------------ | ------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flag کی حالت، `enabledTypes`، `customPatterns`، شناختی counters                 |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = تمام) اور/یا `customPatterns` کو تبدیل کرنا            |
| `POST` | `/api/settings/pii/test` | زیادہ سے زیادہ 8 KB کے نمونے پر ایک pattern کا dry-run؛ کچھ بھی محفوظ نہیں ہوتا |

تینوں کے لیے management auth درکار ہے اور body کی توثیق Zod
(`src/shared/validation/schemas/piiSettings.ts`) کے ذریعے کی جاتی ہے۔

### Prompt Injection (`promptInjection.ts`)

صارف کے فراہم کردہ مواد میں مخالفانہ ساختوں کا پتہ لگاتا ہے اور
ترتیب شدہ پالیسی نافذ کرتا ہے۔ طرزِ عمل environment variables اور constructor
options کے ذریعے چلایا جاتا ہے:

| ترتیب      | ماحولیاتی متغیر                                                                                   | طے شدہ | اثر                                                                                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| فعال       | `INPUT_SANITIZER_ENABLED`                                                                         | `true` | جب `false` ہو تو گارڈ ریل فوراً آگے کی کارروائی روک دیتی ہے۔                                                                                                                                                     |
| موڈ        | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                   | `warn` | انجیکشن پالیسی: `block`، `warn`، یا `log`۔ (`redact` کو سابقہ مطابقت کے لیے قبول کیا جاتا ہے، لیکن یہ انجیکشن متن کو **نہیں** ہٹاتا؛ درخواست میں PII کی دوبارہ تحریر کو `PII_REDACTION_ENABLED` کنٹرول کرتا ہے۔) |
| بلاک کی حد | `blockThreshold` آپشن / `INPUT_SANITIZER_BLOCK_THRESHOLD` (عرف `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | بلاک کرنے کے لیے درکار کم از کم شدت۔ طے شدہ ترتیب میں درمیانی شدت صرف مشاہدے کے لیے ہے۔                                                                                                                          |

**موڈ کی ترجیح** (`getMode`): کالر کا `options.mode` →
`INJECTION_GUARD_MODE` **DB فیچر فلیگ اوور رائیڈ** (ڈیش بورڈ → ترتیبات →
فیچر فلیگز) → `INJECTION_GUARD_MODE` ماحولیاتی متغیر → `INPUT_SANITIZER_MODE` ماحولیاتی متغیر →
`warn`۔ لہٰذا ڈیش بورڈ اوور رائیڈ کو ماحولیاتی متغیرات پر ترجیح حاصل ہوتی ہے، اس لیے فیچر
فلیگز UI چلتے ہوئے گارڈ کو براہ راست کنٹرول کرتا ہے (دوبارہ شروع کرنے کی ضرورت نہیں)۔ DB ریڈ ناکامی سے محفوظ ہے:
اگر اس میں خرابی آئے تو گارڈ ماحولیاتی متغیر پر مبنی طرزِ عمل پر واپس آ جاتا ہے، اور جب کوئی
اوور رائیڈ مقرر نہ ہو تو طرزِ عمل صرف ماحولیاتی متغیرات والی ریزولیوشن کے عین مطابق ہوتا ہے۔

کھوج کے ذرائع:

1. `@/shared/utils/inputSanitizer` سے `sanitizeRequest()` (پائپ لائن میں
   دیگر جگہوں پر استعمال ہونے والا مشترکہ ڈیٹیکٹر سیٹ)۔
2. پہلے سے موجود `DEFAULT_GUARD_PATTERNS` (فی الحال `system_override_inline` اور
   `markdown_system_block`، دونوں کی شدت `high` ہے)۔
3. اختیاری `customPatterns` جو کنسٹرکٹر آپشنز کے ذریعے دیے جائیں (اسٹرنگز، ریجیکس،
   یا `{ name, pattern, severity }` ریکارڈز)۔

جب `mode === "block"` ہو **اور** کم از کم ایک کھوج شدت کی
حد پوری کرتی ہو، تو `preCall` یہ واپس کرتا ہے: `{ block: true, message: "Request rejected:
suspicious content detected" }`۔ `warn`/`log` موڈز میں گارڈ ریل لاگ کرتی ہے لیکن
کال کی اجازت دیتی ہے۔ مشترکہ ہیلپر `evaluatePromptInjection()` بھی ایکسپورٹ کیا جاتا ہے
تاکہ وہ کالرز جو رجسٹری سے گزرے بغیر پرامپٹس کا جائزہ لینا چاہتے ہیں، اسے استعمال کر سکیں۔

**اسکین کی حد (v3.8.20):** ڈیٹیکٹر جوڑے گئے پرامپٹ متن کے صرف **پہلے 16 KB** کا
معائنہ کرتا ہے — `src/shared/utils/inputSanitizer.ts` میں
`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 بائٹس)۔ پیٹرن لوپ چلانے سے پہلے
`detectInjection()` اور `evaluatePromptInjection()` دونوں
`slice(0, MAX_INJECTION_SCAN_BYTES)` استعمال کرتے ہیں۔ انجیکشن ہدایات ان پٹ کے آغاز کے قریب ہوتی ہیں، اس لیے یہ
کئی سو KB کے پے لوڈز پر ریجیکس CPU/GC کو محدود کرتا ہے، جبکہ کھوج کمزور نہیں ہوتی (ملاحظہ کریں
#3932، #4041)۔

### اسناد چھپانے والا (`credentialMasker.ts`)

**دونوں** مراحل پر چلتا ہے، اور طے شدہ چین میں آخری ہوتا ہے (ترجیح `95`)۔ آؤٹ باؤنڈ پے لوڈ
(پیغام کا مواد، ٹول کال کے آرگومنٹس، ٹول کے نتائج) **اور** فراہم کنندہ کے جواب سے
معروف API کلید / خفیہ ٹوکن پیٹرنز کو حذف و مخفی کرتا ہے، تاکہ پرامپٹ میں پیسٹ کی گئی سند
(یا ٹول کے نتیجے میں دوبارہ ظاہر ہونے والی سند) اپ اسٹریم فراہم کنندہ یا واپس کلائنٹ تک
افشا نہ ہو۔

- **صرف واضح رضامندی پر فعال**، PII ریڈیکشن کے اصول ہی کی طرح (ہارڈ رول #20 سے ملحق):
  اس وقت تک غیر فعال رہتا ہے جب تک `settings.credentialRedactionEnabled === true` **یا**
  `CREDENTIAL_REDACTION_ENABLED=true` نہ ہو۔ غیر فعال ہونے پر گارڈ ریل کوئی کارروائی نہیں کرتی —
  یہ نہ کبھی بلاک کرتی ہے اور نہ کبھی دوبارہ تحریر۔
- `redactCredentials()` مکمل پے لوڈ/جواب ٹری میں چلتا ہے (`walkValue()`،
  پروٹوٹائپ پولوشن سے محفوظ، اور `WeakSet` کے ذریعے سائیکل سے محفوظ) اور مماثلتوں کو
  `[REDACTED:<type>]` پلیس ہولڈر سے بدلتا ہے، جبکہ صرف ان شاخوں کو کلون کرتا ہے جو واقعی
  تبدیل ہوئی ہوں۔
- `CREDENTIAL_PATTERNS` میں LLM فراہم کنندگان کی کلیدیں (OpenAI، OpenAI-proj،
  Anthropic، Google، Hugging Face، Replicate)، VCS/SaaS ٹوکنز (GitHub، Slack،
  Linear، Notion، npm، Postman، Discord)، ادائیگی کی کلیدیں (Stripe، Square)، کلاؤڈ
  کلیدیں (AWS ایکسیس کلید، Twilio، SendGrid، Mailgun)، نجی کلیدیں / JWTs،
  اسناد پر مشتمل کنکشن اسٹرنگز (`mongodb://user:pass@...`، وغیرہ)، اور
  ایک عمومی `Authorization`/`x-api-key`/`api-key`/`apikey` ہیڈر ویلیو
  پیٹرن شامل ہیں۔ ہیڈر جیسی ساخت رکھنے والی کلیدیں (`authorization`، `x-api-key`، `api-key`،
  `apikey`) عمومی ٹیکسٹ ریجیکس کے بجائے ساختی طور پر حذف و مخفی کی جاتی ہیں (صرف ویلیو؛
  `Bearer `/`Basic ` جیسے اسکیم پری فکس محفوظ رکھے جاتے ہیں)۔
- گارڈ ریل کبھی بلاک نہیں کرتی؛ یہ صرف دوبارہ تحریر (`modifiedPayload` /
  `modifiedResponse`) اور تشریح (`meta.credentialsRedacted`، `meta.count`) کرتی ہے۔

ریگریشن گارڈ: `tests/unit/credential-masker-guardrail.test.ts`۔

## بنیادی کنٹریکٹ (`base.ts`)

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
  block?: boolean; // true چین کو فوری طور پر روک دیتا ہے
  message?: string; // بلاک ہونے پر ظاہر کیا جاتا ہے
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // درخواست کو دوبارہ لکھنے کے لیے preCall کے ذریعے واپس کیا جاتا ہے
  modifiedResponse?: TValue; // جواب کو دوبارہ لکھنے کے لیے postCall کے ذریعے واپس کیا جاتا ہے
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

ایک گارڈ ریل `void`، `{}`، یا `{ block: false }` واپس کرکے "کوئی تبدیلی نہیں" کا اشارہ دیتی ہے۔ `modifiedPayload`/`modifiedResponse` واپس کرنے سے چین میں آگے آنے والی گارڈ ریلز تک پہنچنے والی قدر تبدیل ہو جاتی ہے۔
`signal?: AbortSignal` کالر کے لائف سائیکل کو گارڈ ریلز تک پہنچاتا ہے۔ درخواست کا منسوخ ہونا دانستہ fail-open استثنا ہے: میڈیا برجز کام روک دیتے ہیں اور صفائی کرتے ہیں، مگر خام میڈیا کو ایسے ہدف کے لیے بحال نہیں کرتے جس کے بارے میں معلوم ہو کہ وہ اسے سپورٹ نہیں کرتا۔

## رجسٹری (`registry.ts`)

سنگلٹن `guardrailRegistry` درج ذیل سہولیات فراہم کرتی ہے:

- `register(guardrail)` — ایک گارڈ ریل شامل کرتی ہے (یا نارملائزڈ نام کے لحاظ سے تبدیل کرتی ہے) اور
  صعودی `priority` کے مطابق دوبارہ ترتیب دیتی ہے۔
- `clear()` / `list()` — انتظامی معاون فنکشنز۔
- `runPreCallHooks(payload, context)` — فعال گارڈ ریلز پر تکرار کرتی ہے، پے لوڈ کو
  `modifiedPayload` کے ذریعے آگے بڑھاتی ہے، اور پہلے `block: true` پر رک جاتی ہے۔
- `runPostCallHooks(response, context)` — جواب کی جانب بھی یہی بہاؤ استعمال کرتی ہے۔
- `resetGuardrailsForTests({ registerDefaults })` — حالت صاف کرتی ہے اور صاف ستھری ٹیسٹ علیحدگی کے لیے، اختیاری طور پر
  ڈیفالٹس کو دوبارہ رجسٹر کرتی ہے۔

دونوں رنرز `{ blocked, payload|response, results, guardrail?, message? }`
واپس کرتے ہیں، جہاں `results`، `GuardrailExecutionResult` ریکارڈز کی ایک ارے ہے جس میں
ہر گارڈ ریل کے `blocked`، `skipped`، `modified`، `error`، اور `meta` فیلڈز شامل ہوتے ہیں،
جو ٹریسنگ کے لیے مفید ہیں۔

### ہر درخواست کے لیے گارڈ ریلز کو غیر فعال کرنا

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` گارڈ ریل ناموں کی ایک
نقل سے پاک فہرست یکجا کرتا ہے جنہیں موجودہ درخواست کے لیے چھوڑ دینا چاہیے۔
ذرائع (سب اختیاری، سب ضم کیے جاتے ہیں):

- `apiKeyInfo.disabledGuardrails`
- درخواست کی باڈی کا `disabledGuardrails` (اعلیٰ سطح پر)
- درخواست کی باڈی کا `metadata.disabledGuardrails`
- ہیڈر `x-omniroute-disabled-guardrails` (یا قدیمی
  `x-disabled-guardrails`)

اقدار اسٹرنگز کی ارے یا کوما سے جدا کی گئی اسٹرنگ ہو سکتی ہیں؛ ناموں کو
لوئرکیس kebab-case میں نارملائز کیا جاتا ہے (`pii_masker` → `pii-masker`)۔ نتیجہ
`context.disabledGuardrails` کے ذریعے رجسٹری کو دیا جاتا ہے، جو مماثل
گارڈ ریلز کو چھوڑ دیتی ہے (`results` میں `skipped: true`)۔

## عمل درآمد کی ترتیب

`src/sse/handlers/chat.ts` اور `open-sse/handlers/chatCore.ts` سے گزرنے والی ہر درخواست کے لیے:

1. `resolveDisabledGuardrails(...)`، API کلید، باڈی، اور ہیڈرز سے نظر انداز کیے جانے والے عناصر کی فہرست بناتا ہے۔
2. `guardrailRegistry.runPreCallHooks(body, ctx)` ترجیح کی صعودی ترتیب میں گارڈ ریلز چلاتا ہے:
   - غیر فعال گارڈ ریلز کو `skipped` کے طور پر ریکارڈ کیا جاتا ہے۔
   - ہر گارڈ ریل کا `preCall`، `modifiedPayload` کے ذریعے پے لوڈ دوبارہ لکھ سکتا ہے۔
   - پہلا `block: true` سلسلے کو فوری طور پر روک دیتا ہے اور ہینڈلر گارڈ ریل کی جانب سے مسترد کیے جانے کا جواب واپس کرتا ہے۔
3. (ممکنہ طور پر دوبارہ لکھا گیا) پے لوڈ کومبو روٹنگ اور اپ اسٹریم ڈسپیچ میں جاتا ہے۔
4. جواب تیار ہونے کے بعد، `guardrailRegistry.runPostCallHooks(...)` جواب پر یہی سلسلہ چلاتا ہے۔ یہاں `block: true` اپ اسٹریم جواب کو خارج کر دیتا ہے۔

خرابی پیدا کرنے والی گارڈ ریلز کو `error: <message>` کے ساتھ ریکارڈ کیا جاتا ہے اور `logger.warn` کے ذریعے لاگ کیا جاتا ہے، لیکن سلسلہ جاری رہتا ہے — یہ ڈیزائن کے لحاظ سے فیل-اوپن ہے۔

## کنفیگریشن

بلٹ اِن گارڈ ریلز کے ذریعے پڑھے جانے والے ماحولیاتی متغیرات:

| متغیر                                 | استعمال کنندہ              | اثر                                                                                                    |
| ------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | تشخیص کو مکمل طور پر غیر فعال کرنے کے لیے `false` مقرر کریں۔                                           |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | انجیکشن پالیسی: `warn`، `block`، یا `log`۔ پرانی قدر `redact` انجیکشن متن کو دوبارہ نہیں لکھتی۔        |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | انجیکشن گارڈ کا موڈ؛ یہ DB فیچر فلیگ بھی ہے جو ماحولیاتی متغیرات کو **اوور رائیڈ** کرتا ہے (DB > ENV)۔ |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | کم از کم شدت جسے `MODE=block` مسترد کرتا ہے: `high` (ڈیفالٹ)، `medium`، یا `low`۔                      |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | `INPUT_SANITIZER_BLOCK_THRESHOLD` کا پرانا عرف۔                                                        |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | `true` ہونے پر، درخواست کا PII حذف کر دیا جاتا ہے (انجیکشن موڈ سے آزاد)۔                               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (ڈاؤن اسٹریم) | جواب کی جانب ماسکر کے رویے کو کنٹرول کرتا ہے۔                                                          |

Modality Bridge گارڈ ریلز ماحولیاتی متغیرات کے بجائے DB کی معاونت والے سیٹنگز اسٹور (`getSettings()`) سے رن ٹائم کنفیگریشن پڑھتی ہیں۔ Vision کی بنیادی کلیدیں `modalityBridgeVisionEnabled`، `modalityBridgeVisionMode`، `modalityBridgeVisionModel`، `modalityBridgeVisionTaskAware`، `modalityBridgeVisionPrompt`، `modalityBridgeVisionTimeout`، `modalityBridgeVisionMaxImages`، `modalityBridgeVisionMaxChars`، `modalityBridgeCacheEnabled`، `modalityBridgeCacheTtlMinutes`، اور `modalityBridgeCacheMaxEntries` ہیں۔ پرانی `visionBridge*` کلیدیں صرف دستاویزی، ایک سائیکل کے ریڈ فال بیک کے طور پر قبول کی جاتی ہیں؛ ڈیش بورڈ رائٹس بنیادی کلیدیں استعمال کرتی ہیں۔ ڈیفالٹس اور فال بیک ریزالور `src/shared/constants/modalityBridgeDefaults.ts` میں موجود ہیں، جبکہ پرانے کانسٹنٹس `src/shared/constants/visionBridgeDefaults.ts` میں برقرار رکھے گئے ہیں۔

Audio، `modalityBridgeAudioEnabled`، `modalityBridgeAudioModel`، `modalityBridgeAudioTimeout`، اور `modalityBridgeAudioMaxClips` کے ساتھ مشترکہ `modalityBridgeCache*` سیٹنگز استعمال کرتا ہے۔ Audio کے لیے پرانی کلیدوں کا کوئی فال بیک نہیں ہے کیونکہ یہ کلیدیں Modality Bridge اسکیما کے ساتھ متعارف کرائی گئی تھیں۔

Video، `modalityBridgeVideoEnabled`، `modalityBridgeVideoAnalysisMode`، `modalityBridgeVideoModel`، `modalityBridgeVideoFrameCount`، `modalityBridgeVideoSamplingPolicy`، `modalityBridgeVideoMaxVideos`، اور `modalityBridgeVideoTimeout` کے ساتھ مشترکہ `modalityBridgeCache*` سیٹنگز استعمال کرتا ہے۔ یہ ڈیفالٹ طور پر غیر فعال ہے کیونکہ FFmpeg/ffprobe اختیاری آپریشنل انحصارات ہیں اور فریم کیپشننگ تاخیر اور ماڈل کی لاگت میں اضافہ کرتی ہے۔

## حسبِ ضرورت Guardrails

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

1. `BaseGuardrail` کو توسیع دیتے ہوئے `src/lib/guardrails/myGuardrail.ts` بنائیں۔
2. `preCall` اور/یا `postCall` نافذ کریں۔
3. یا تو import کے وقت رجسٹر کریں (`registerDefaultGuardrails` سے push کریں) یا
   runtime پر `guardrailRegistry.register(...)` کو کال کریں — registry اسی normalized نام والے
   کسی بھی سابقہ guardrail کو بدل دیتی ہے۔
4. `tests/unit/` کے تحت ٹیسٹ شامل کریں (موجودہ مثالیں:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`)۔

## ٹیسٹنگ

معلوم حالت سے آغاز کرنے کے لیے ٹیسٹس کے درمیان `resetGuardrailsForTests()` استعمال کریں۔
خالی registry سے آغاز کرنے اور صرف زیرِ ٹیسٹ guardrails رجسٹر کرنے کے لیے
`{ registerDefaults: false }` پاس کریں۔ Vision Bridge dependency
injection (`deps.getSettings`, `deps.callVisionModel`) قبول کرتا ہے؛ Audio Bridge
settings، capabilities، STT model کے انتخاب، credential
کی جانچ، اور transcription کے لیے مساوی seams فراہم کرتا ہے۔ اس طرح ٹیسٹس DB
یا network تک رسائی کے بغیر دونوں flows کو آزما سکتے ہیں۔

## مزید دیکھیے

- `src/lib/guardrails/` — نفاذ
- `src/shared/utils/inputSanitizer.ts` — مشترکہ detector جو
  prompt-injection اور PII masking کو تقویت دیتا ہے
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge کی defaults اور
  forced-bridge model کی فہرست
- `src/shared/constants/modalityBridgeDefaults.ts` — مشترکہ Vision/Audio runtime defaults
- `docs/architecture/RESILIENCE_GUIDE.md` — متعامد layer (circuit breaker، cooldowns)
- `docs/reference/ENVIRONMENT.md` — env vars کا مکمل حوالہ

## Injection-guard route coverage اور red-team (مرحلہ 8 · بلاک D)

injection-guard (`createInjectionGuard` / `withInjectionGuard`) ان تمام routes کا احاطہ کرتا ہے
جو user prompts قبول کرتے ہیں۔ یہ `INJECTION_GUARD_MODE` کا احترام کرتا ہے (default `warn` = صرف log؛
`block` = HTTP 400 `SECURITY_001` واپس کرتا ہے)۔

| قسم          | Routes                                                                                                                                               | Default mode |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| متن (موجودہ) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn         |
| تخلیقی       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn         |
| ڈیٹا         | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn         |

متن اخذ کرنا (`extractMessageContents`) `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` کا احاطہ کرتا ہے۔

**Red-team (ہر شب، `nightly-llm-security.yml`):** promptfoo تصدیق کرتا ہے کہ ہر route
`INJECTION_GUARD_MODE=block` میں OWASP-LLM corpus کو block کرتا ہے؛ garak probes چلاتا ہے (secret نہ ہونے پر چھوڑ دیتا ہے)۔
`moderations` کو یکسانیت کے لیے شامل کیا گیا ہے — block-mode میں operators اسے
`resolveDisabledGuardrails` کے ذریعے مستثنیٰ کر سکتے ہیں۔

ہر شب چلنے والے workflow (`.github/workflows/nightly-llm-security.yml`، cron + دستی
dispatch) میں دو jobs ہیں:

- **`promptfoo-guard` (blocking)** — `INJECTION_GUARD_MODE=block` کے ساتھ
  `promptfoo eval -c promptfooconfig.yaml` چلاتا ہے۔ ہر مخالفانہ case (مثلاً "ignore all
  previous instructions…"، DAN-style jailbreaks) تصدیق کرتا ہے کہ response میں
  `error.code === "SECURITY_001"` موجود ہے، یعنی guard نے واقعی request مسترد کی۔
- **`garak` (مشاورتی)** — مقامی OmniRoute instance (`http://localhost:20128/v1`) کے خلاف
  garak کو `--probes promptinject,dan,leakreplay` کے ساتھ چلاتا ہے۔ اسے provider
  secret (`PROMPTFOO_PROVIDER_KEY`) کے ذریعے مشروط کیا گیا ہے؛ یہ مؤدبانہ طور پر چھوڑ دیتا ہے اور اس کے آخر میں
  `|| true` شامل ہے، لہٰذا یہ CI کو ناکام کیے بغیر رپورٹ کرتا ہے۔

guard helper (`createInjectionGuard` / `withInjectionGuard`) کی coverage
ہر prompt رکھنے والے `/v1` route تک پھیلی ہوئی ہے؛ prompt کا متن
`src/shared/utils/inputSanitizer.ts` میں موجود `extractMessageContents()` کے ذریعے
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` سے حاصل کیا جاتا ہے۔
