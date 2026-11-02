# Reasoning Replay Cache (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **مستند ماخذ:** `src/lib/db/reasoningCache.ts`، `open-sse/services/reasoningCache.ts`
> **آخری بار اپ ڈیٹ کیا گیا:** 2026-06-28 — v3.8.40

OmniRoute، سوچنے والے موڈ کے ماڈلز کے تیار کردہ اسسٹنٹ `reasoning_content` کو محفوظ کرتا ہے اور متعدد باریوں والی درخواستوں میں اسے شفاف طور پر دوبارہ شامل کرتا ہے، جب اپ اسٹریم فراہم کنندہ اس کا تقاضا کرے۔ اس سے وہ HTTP 400 خرابیاں ختم ہو جاتی ہیں جو سخت فراہم کنندگان اس وقت دیتے ہیں جب کلائنٹ کی گفتگو کی سرگزشت میں پچھلی باری کی استدلالی معلومات موجود نہ ہوں۔

## اس کی ضرورت کیوں ہے

سوچنے والے موڈ کے متعدد فراہم کنندگان اگلی باری کو مسترد کر دیتے ہیں، جب تک کہ **پچھلے اسسٹنٹ پیغام میں اصل `reasoning_content` شامل نہ ہو**۔ اپ اسٹریم اس طرح کے پیغامات کے ساتھ 400 واپس کرتا ہے:

```
Param Incorrect: سوچنے والے موڈ میں reasoning_content کو API کو واپس بھیجنا ضروری ہے۔
```

لیکن عام کلائنٹس (Cursor، Cline، Roo Code، OpenAI SDK) دوبارہ بھیجی جانے والی سرگزشت سے `reasoning_content` ہٹا دیتے ہیں۔ OmniRoute اسے سرور سائیڈ کیش سے بحال کرتا ہے تاکہ اپ اسٹریم کو موصول ہونے والی درخواست ہم آہنگ ہو۔ مسئلہ #1628 میں ہائبرڈ میموری/SQLite استقامت متعارف کرائی گئی، تاکہ پراسیس دوبارہ شروع ہونے کے بعد بھی کیش برقرار رہے۔

## آرکیٹیکچر

```
ٹرن N (اسسٹنٹ تیار کرتا ہے):
  → جواب میں reasoning_content + tool_calls شامل ہوتے ہیں
  → اگر requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      ہر tool_call.id کی کلید کے تحت (میموری + DB) میں لکھتا ہے
  → جواب کلائنٹ کو بھیجتا ہے (جو reasoning کو برقرار رکھ بھی سکتا ہے اور نہیں بھی)

ٹرن N+1 (کلائنٹ فالو اپ بھیجتا ہے):
  → ٹرانسلیٹر پتہ لگاتا ہے: requiresReasoningReplay(provider, model) === true
  → tool_calls رکھنے والے اور reasoning_content سے محروم ہر اسسٹنٹ پیغام کے لیے:
      lookupReasoning(toolCalls[0].id) → میموری → DB
      کامیابی  → msg.reasoning_content = cached; recordReplay()
      ناکامی → msg.reasoning_content = "" (پرانے DeepSeek کے لیے لیگیسی فال بیک)
  → اپ اسٹریم کو مستقل ہسٹری نظر آتی ہے → کوئی 400 نہیں
```

کیپچر `open-sse/handlers/chatCore.ts` میں ہوتا ہے (دو مقامات پر، یعنی `cacheReasoningFromAssistantMessage` کو کال کرنے والے دونوں مقامات پر)۔ ری پلے، اسکیما کوئرشن کے بعد مگر ڈسپیچ سے پہلے، `open-sse/translator/index.ts` میں ہوتا ہے۔

سادہ (بغیر ٹول کال والے) اسسٹنٹ ٹرنز کے لیے کلید مختلف طریقے سے بنائی جاتی ہے: `buildAssistantMessageCacheKey()` سیشن اسکوپ کے ساتھ اس ٹرن تک کے نارملائز کردہ OpenAI-فارمیٹ ٹرانسکرپٹ کا ڈائجسٹ بناتا ہے، کیونکہ `tools` موجود ہونے کی صورت میں DeepSeek کو _ہر_ سابقہ ٹرن کی reasoning درکار ہوتی ہے۔ Responses-API اہداف کے لیے (مثلاً `opencode-go/deepseek-v4-flash`، جسے `/responses` کی طرف روٹ کیا جاتا ہے) اپ اسٹریم باڈی میں `messages` کے بجائے `input` ہوتا ہے، اس لیے `translateRequest()` (`open-sse/translator/index.ts`) کال بیک آپشن کے ذریعے اس پِیوٹ ٹرانسکرپٹ کی اطلاع دیتا ہے جس کا اس نے ڈائجسٹ بنایا تھا، اور کیپچر کے مقامات اسی ٹرانسکرپٹ کا ڈائجسٹ بناتے ہیں۔ Responses کا ری پلے پاس ہر ماخذ فارمیٹ کے لیے OpenAI پِیوٹ پر چلتا ہے، اس لیے Anthropic Messages کلائنٹس (Claude → OpenAI → Responses) بھی ری پلے کیے جاتے ہیں۔

## اسٹوریج — ہائبرڈ میموری + SQLite

ہاٹ پاتھ ایک ان-میموری `Map` (تخلیق کے لحاظ سے LRU) استعمال کرتا ہے، جس کے پس منظر میں کریش سے بازیابی اور ڈیش بورڈ میں مرئیت کے لیے SQLite ٹیبل موجود ہے۔

| تہہ    | نفاذ                                            | مقصد                                                                 |
| ------ | ----------------------------------------------- | -------------------------------------------------------------------- |
| میموری | `open-sse/services/reasoningCache.ts` میں `Map` | تیز تلاش، 200 پر قدیم ترین اندراج نکال دیتا ہے                       |
| DB     | `reasoning_cache` ٹیبل (`src/lib/db/`)          | دوبارہ شروع ہونے کے بعد بھی برقرار رہتا ہے، اعدادوشمار فراہم کرتا ہے |

تحریری کارروائیاں دونوں میں کی جاتی ہیں۔ پڑھنے کی کارروائیاں پہلے میموری دیکھتی ہیں، پھر DB کو فال بیک کے طور پر استعمال کرتی ہیں (DB میں ملنے والے نتائج کو دوبارہ میموری میں منتقل کر دیا جاتا ہے)۔ DB کی ناکامیاں مہلک نہیں ہوتیں — ان-میموری کیش ہاٹ پاتھ کو بدستور خدمات فراہم کرتا رہتا ہے۔

**طے شدہ قدریں:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- میموری میں اندراجات کی زیادہ سے زیادہ تعداد: `200` (`MAX_MEMORY_ENTRIES`)
- اخراج: سب سے پرانا `createdAt` پہلے

## ڈیٹابیس اسکیما

مائیگریشن: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

انڈیکسز: `expires_at`، `provider`، `model`، `created_at`۔ `expires_at` کو Unix epoch سیکنڈز کے طور پر محفوظ کیا جاتا ہے؛ SELECT پرت `EXPIRES_AT_EPOCH_SQL` کے ذریعے پرانی متنی اقدار کو نارملائز کرتی ہے۔

## پرووائیڈر / ماڈل کی شناخت

ری پلے اس وقت فعال ہوتا ہے جب `requiresReasoningReplay(provider, model)` سے `true` واپس آتا ہے۔ یہ فنکشن `open-sse/services/reasoningCache.ts` میں موجود دو فہرستوں کی جانچ کرتا ہے۔

**پرووائیڈر IDs (بالکل یکساں، حروف کی نوعیت سے غیر حساس):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**ماڈل کے regex پیٹرنز (حروف کی نوعیت سے غیر حساس):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` اور `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro، اختیاری `-free` لاحقے کے ساتھ)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

نیا سخت پرووائیڈر/ماڈل شامل کرنے کا مطلب ان فہرستوں میں سے کسی ایک میں اس کا اضافہ کرنا اور ری پلے انجیکشن کی تصدیق کرنے والا یونٹ ٹیسٹ لکھنا ہے۔ PR کی تفصیل میں وہ عین upstream 400 اسٹرنگ درج ہونی چاہیے جس نے اس تبدیلی کی ضرورت پیدا کی۔

## REST API

کیش `src/app/api/cache/reasoning/route.ts` کے تحت دو اینڈ پوائنٹس فراہم کرتا ہے۔ دونوں کو مینجمنٹ توثیق (`@/shared/utils/apiAuth` سے `isAuthenticated`) درکار ہے۔

| طریقہ  | اینڈ پوائنٹ                                               | تفصیل                                                          |
| ------ | --------------------------------------------------------- | -------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | اعداد و شمار + صفحات میں منقسم اندراجات                        |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | فلٹر شدہ فہرست (`limit` کو `[1, 200]` تک محدود کیا جاتا ہے)    |
| DELETE | `/api/cache/reasoning`                                    | سب کچھ صاف کریں (میموری + DB) اور ہٹ/مس شمار ازسرِنو مقرر کریں |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | صرف ایک پرووائیڈر کے اندراجات صاف کریں                         |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | ایک اندراج حذف کریں                                            |

**GET جواب کی ساخت:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## آپریشنل نوٹس

- **صفائی:** `cleanupReasoningCache()` میموری کے زائد المیعاد اندراجات صاف کرتا ہے اور `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` چلاتا ہے۔ ہیلتھ چیک ورکرز اسے وقتاً فوقتاً چلاتے ہیں۔
- **کریش سے بازیابی:** ری اسٹارٹ کے بعد میموری خالی ہوتی ہے، لیکن DB میں غیر زائد المیعاد اندراجات موجود رہتے ہیں۔ کسی مخصوص `tool_call_id` کی پہلی تلاش DB ہٹ ہوتی ہے؛ بعد کی تلاشیں میموری ہٹس ہوتی ہیں۔
- **ریزننگ نہیں، کیش نہیں:** جب اسسٹنٹ پیغام میں `reasoning_content` / `reasoning` فیلڈ موجود نہ ہو تو `cacheReasoningFromAssistantMessage` سے `0` واپس آتا ہے، اس لیے غیر تفکری جوابات پر کوئی لاگت نہیں آتی۔
- **لکھنے کا عمل بھی مشروط ہے:** `chatCore.ts` میں دونوں کال سائٹس (نان اسٹریمنگ اور اسٹریمنگ) صرف اس وقت `cacheReasoningFromAssistantMessage()` کو کال کرتی ہیں جب `requiresReasoningReplay(provider, model)` سے `true` واپس آئے — یہی پریڈیکیٹ پڑھنے والے حصے میں بھی جانچا جاتا ہے۔ وہ انسٹالیشنز جو کبھی کسی ری پلے پرووائیڈر کو استعمال نہیں کرتیں، ہر ریزننگ رکھنے والے جواب پر رائٹ، انڈیکس اپ ڈیٹ، اور try/catch کی لاگت سے بچتی ہیں۔
- **غیر سخت پرووائیڈرز:** جب `requiresReasoningReplay` سے `false` واپس آئے اور ہدفی فارمیٹ OpenAI ہو، تو ٹرانسلیٹر باہر جانے والے پیغامات سے ہر `reasoning_content` فیلڈ **ہٹا دیتا ہے** — OpenAI Chat Completions اسے قبول نہیں کرتا۔

## Muse کے غیر شفاف استدلال کی ملکیت

Muse (`muse-code`) کال کرنے والے سے بندھا غیر شفاف استدلال (`encrypted_content`) لوٹاتا ہے۔ دوسرے اکاؤنٹ یا دوبارہ جاری اسناد کے تحت اسے چلانا اپ اسٹریم میں ناکام ہوتا ہے، اس لیے اصل OAuth درخواستیں ہر درخواست کی گردش کے بجائے سیشن سطح کی ملکیت استعمال کرتی ہیں (`src/sse/services/museSessionOwnership.ts`، نفاذ `src/sse/handlers/chat.ts` میں)۔ واضح منتخب API کلید کنکشن اور صرف API کلید والی ترتیب اس ملکیت کے بغیر اپنی موجودہ روٹنگ رکھتے ہیں۔

- ہر ٹرن میں مستحکم سیشن ID دیں: `x-omniroute-session-id`، `x-omniroute-session`، `x-session-id` یا `x-codex-session-id`؛ یا متن میں `prompt_cache_key`، `session_id`، `conversation_id` یا `metadata.session_id` استعمال کریں (اسی ترجیحی ترتیب سے)۔ دو یا زیادہ اصل OAuth اکاؤنٹ فعال ہوں تو غائب یا خالی IDs، 400 لوٹاتی ہیں؛ ایک OAuth اکاؤنٹ ہو تو گردش کا دوسرا مقصد نہیں، اس لیے ایسی درخواست بغیر پن روٹنگ رکھتی ہے۔ دائرے میں کال کرنے والے کی OmniRoute API کلید کی ID شامل ہے۔
- نئے آزاد سیشن API کلید کی کنکشن پالیسی سے مجاز فعال اصل OAuth اکاؤنٹس میں کنکشن ID کی ترتیب سے باری باری جاتے ہیں۔ یہ گردش کنکشن وقفے میں، حتمی حالت (`banned`، `expired`، `credits_exhausted`) میں، یا مطلوبہ ماڈل کے لیے لاک اکاؤنٹس کو چھوڑتی ہے؛ Muse کی اپ اسٹریم ناکامیاں دوسرے فراہم کنندگان کی طرح وقفہ اور بریکر حالت درج کرتی ہیں۔ واضح زبردستی کنکشن نئے سیشن میں گردش کو چھوڑتا ہے، مگر کامیاب جواب دے چکے مالک کو نہیں بدل سکتا۔
- مالک کے کامیاب جواب تک، جس سیشن کا مالک دستیاب نہ رہے اسے دوبارہ صحت مند اکاؤنٹ دیا جاتا ہے۔ پہلے کامیاب جواب کے بعد سیشن اسی مالک سے پن رہتا ہے، یہاں تک کہ 30 دن غیر فعال گزر جائیں (`MUSE_SESSION_IDLE_TTL_MS`)۔
- ہر تسلسل اور ٹول نتیجے والا ٹرن سیشن کے مالک سے پن رہتا ہے: کنکشن، اکاؤنٹ شناخت اور استدلالی اسناد کی نسل؛ اپ اسٹریم کوششوں سے پہلے یہ دوبارہ جانچے جاتے ہیں، بشمول اسناد ریفریش کے بعد دوبارہ کوششیں۔ Responses کال IDs/آئٹم حوالے اور Chat Completions ٹول کال IDs اسی سیشن اور نسل کے لیے پہلے درج ہونا ضروری ہیں۔
- SQLite کے `key_value` ریکارڈز، `muse_session_ownership` نیم اسپیس میں (`src/lib/db/museSessionOwnership.ts`)، دوبارہ شروع ہونے کے بعد بھی ملکیت اور گردش کا کرسر محفوظ رکھتے ہیں۔ ہر دعویٰ اور دیا ہوا جواب سیشن کی سرگرمی کا وقت تازہ کرتا ہے؛ `MUSE_SESSION_IDLE_TTL_MS` سے زیادہ غیر فعال سیشن کو صاف کیا جاتا ہے (مالک پن، جواب دیے جانے کا پرچم اور محفوظ غیر شفاف/حوالہ ہیش)، زیادہ سے زیادہ ہر 10 منٹ میں ایک بار اور محدود بیچ میں، تاکہ بعد کا ہسٹری ری پلے نامعلوم مالک کے طور پر محفوظ طریقے سے رد ہو۔ ریکارڈز میں کنکشن IDs اور اکاؤنٹ شناخت، اسناد، غیر شفاف مواد اور تسلسل حوالوں کے ہیش ہوتے ہیں، راز یا گفتگو کی تاریخ نہیں۔ کلائنٹس کو اپنی پوری تاریخ اور غیر شفاف استدلال رکھنا اور بھیجنا لازم ہے۔
- نامعلوم یا غیر متعلق غیر شفاف استدلال، غائب مالک، غیر دستیاب مالک اکاؤنٹ، یا محفوظ تاریخ کے ساتھ نسل کی تبدیلی واضح 4xx/503 سے محفوظ طور پر رد ہوتی ہے؛ اکاؤنٹس کے درمیان کبھی خاموش فیل اوور نہیں اور استدلال کبھی حذف نہیں ہوتا۔
- اسی اکاؤنٹ کی دوبارہ جاری کلید صرف تب اختیار ہوتی ہے جب سیشن نے قابلِ ری پلے تاریخ محفوظ نہ کی ہو؛ درج شدہ سیشن تازہ شروع ہونے تک محفوظ طور پر رد ہوتے رہتے ہیں۔
- خالی اپ اسٹریم جواب (`upstream_empty_response` / `empty_response`، کال کرنے والے کو کچھ نہیں بھیجا گیا) اسی مالک پر زیادہ سے زیادہ دو بار، 0.5 s پھر 1.5 s بعد، دوبارہ آزمایا جاتا ہے (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`)۔ سب کوششیں خالی ہوں تو اصل 502 بغیر وقفہ یا بریکر نشان کے واپس آتا ہے، لہٰذا غیر مستحکم جواب مالک کو لاک نہیں کرتا۔
- تمام `muse-code` درخواستیں معنوی کیش کی پڑھائی اور لکھائی، بشمول اسٹریمنگ لکھائی، چھوڑتی ہیں تاکہ کیش شدہ غیر شفاف نتیجہ دوسرے سیشن مالک کو نہ ملے۔

رجعت سے حفاظت: `tests/unit/muse-session-ownership.test.ts`، `tests/unit/muse-session-ownership-retention.test.ts`، `tests/unit/muse-empty-response-retry.test.ts` اور `tests/unit/chatcore-semantic-cache.test.ts`۔

## مزید دیکھیے

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — سرکٹ بریکرز، کول ڈاؤنز، ماڈل لاک آؤٹس
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — اپ اسٹریم 400 خرابیوں کی تشخیص
- ماخذ: `src/lib/db/reasoningCache.ts`، `open-sse/services/reasoningCache.ts`، `open-sse/translator/index.ts`
- مائیگریشن: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API روٹ: `src/app/api/cache/reasoning/route.ts`
- اصل مسئلہ: #1628
