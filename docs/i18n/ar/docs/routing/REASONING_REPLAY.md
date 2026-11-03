# REASONING_REPLAY (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **مصدر الحقيقة:** `src/lib/db/reasoningCache.ts`، `open-sse/services/reasoningCache.ts`** آخر تحديث:** 2026-06-28 — v3.8.40

يلتقط OmniRoute المساعد `reasoning_content` الذي تنتجه نماذج وضع التفكير ويعيد تشغيله بشفافية عند طلبات متعددة المنعطفات عندما يطلبه الموفر الرئيسي. يؤدي هذا إلى التخلص من أخطاء HTTP 400 التي يثيرها مقدمو الخدمة الصارمون عندما يفتقد سجل محادثة العميل أسباب الدور السابق.

## لماذا هذا موجود

يرفض العديد من موفري وضع التفكير دورة المتابعة ما لم** تتضمن رسالة المساعد السابقة `reasoning_content` الأصلية** . يُرجع المنبع 400 برسائل مثل:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

لكن العملاء النموذجيين (Cursor، Cline، Roo Code، OpenAI SDK) يجردون `reasoning_content` من السجل الذي يعيدون تشغيله. يقوم OmniRoute باستعادته من ذاكرة التخزين المؤقت من جانب الخادم بحيث يكون الطلب الذي يراه المنبع متسقًا. قدم الإصدار رقم #1628 استمرارية memory/SQLite المختلطة حتى تنجو ذاكرة التخزين المؤقت من إعادة تشغيل العملية.

## بنيان

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), keyed by every tool_call.id
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

يحدث الالتقاط في `open-sse/handlers/chatCore.ts` (موقعان، في موقعي اتصال `cacheReasoningFromAssistantMessage` ). تحدث إعادة التشغيل في `open-sse/translator/index.ts` بعد فرض المخطط ولكن قبل الإرسال.

يتم تحديد مفاتيح المنعطفات المساعدة البسيطة (بدون استدعاء الأدوات) بشكل مختلف: يستوعب `buildAssistantMessageCacheKey()` نطاق الجلسة بالإضافة إلى نسخة تنسيق OpenAI المقيسة حتى ذلك المنعطف، لأن DeepSeek يتطلب منطق _every_ السابق بمجرد وجود `tools`. بالنسبة لأهداف واجهة API للاستجابات (على سبيل المثال `opencode-go/deepseek-v4-flash`، الموجهة إلى `/responses`) يحمل النص الأساسي `input`، وليس `messages`، لذا `translateRequest()` (`open-sse/translator/index.ts`) يُبلغ عن النص المحوري الذي استوعبه من خلال خيار رد الاتصال وتقوم مواقع الالتقاط بامتصاص نفس النص. يتم تشغيل ممر إعادة تشغيل الاستجابات على المحور OpenAI لكل تنسيق مصدر، لذلك تتم إعادة تشغيل عملاء رسائل Anthropic (استجابات Claude → OpenAI → ) أيضًا.

## تخزين — ذاكرة هجينة + SQLite

يستخدم المسار السريع `Map` في الذاكرة (LRU-by-creation) مدعومًا بجدول SQLite لاستعادة الأعطال ورؤية لوحة المعلومات.

| طبقة  | تطبيق                                          | غاية                                             |
| ----- | ---------------------------------------------- | ------------------------------------------------ |
| ذاكرة | `Map` في `open-sse/services/reasoningCache.ts` | عمليات بحث سريعة، إخلاء الأقدم في 200            |
| DB    | جدول `reasoning_cache` (`src/lib/db/`)         | يستمر عبر عمليات إعادة التشغيل، ويحرك الإحصائيات |

يكتب تذهب إلى كليهما. يقرأ استشارة الذاكرة أولاً، ثم يتراجع إلى DB (تتم ترقية زيارات DB مرة أخرى إلى الذاكرة). تعتبر حالات فشل DB غير مميتة — تستمر ذاكرة التخزين المؤقت في الذاكرة في خدمة المسار السريع.

**الافتراضيات:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- الحد الأقصى لإدخالات الذاكرة: `200` (`MAX_MEMORY_ENTRIES`)
- الإخلاء : أقدم `createdAt` أولا

## مخطط قاعدة البيانات

الهجرة : `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

الفهارس: `expires_at`، `provider`، `model`، `created_at`. يتم تخزين `expires_at` كثواني عصر Unix؛ تقوم طبقة SELECT بتطبيع القيم النصية القديمة عبر `EXPIRES_AT_EPOCH_SQL`.

## كشف المزود/النموذج

يتم تمكين إعادة التشغيل عندما يقوم `requiresReasoningReplay(provider, model)` بإرجاع `true`. تقوم الوظيفة بفحص قائمتين في `open-sse/services/reasoningCache.ts`.

**الموفر IDs (مطابقة تامة، غير حساس لحالة الأحرف):**

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

**أنماط التعبير العادي النموذجية (غير حساسة لحالة الأحرف):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` و `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro، لاحقة `-free` اختيارية)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

إن إضافة provider/model صارم جديد يعني الإلحاق بإحدى هذه القوائم وكتابة اختبار وحدة لتأكيد حقن إعادة التشغيل. يجب أن يستشهد وصف PR بسلسلة 400 الأولية الدقيقة التي حفزت التغيير.

## REST API

تعرض ذاكرة التخزين المؤقت نقطتي نهاية ضمن `src/app/api/cache/reasoning/route.ts`. كلاهما يتطلب مصادقة الإدارة (`isAuthenticated` من `@/shared/utils/apiAuth`).

| طريقة  | نقطة النهاية                                              | وصف                                                |
| ------ | --------------------------------------------------------- | -------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | احصائيات + مداخل مرقّمة                            |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | القائمة المصفاة (`limit` مثبتة على `[1, 200]`)     |
| DELETE | `/api/cache/reasoning`                                    | امسح كل شيء (الذاكرة + DB) وأعد ضبط أعداد hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | مسح الإدخالات لموفر واحد فقط                       |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | حذف إدخال واحد                                     |

**شكل استجابة GET :**

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

## الملاحظات التشغيلية

- **تنظيف:** يقوم `cleanupReasoningCache()` بتطهير إدخالات الذاكرة منتهية الصلاحية وتشغيل `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. يتصل عمال الفحص الصحي بهذا بشكل دوري.
- **التعافي من الأعطال:** بعد إعادة التشغيل، تكون الذاكرة فارغة ولكن DB لا تزال تحتوي على إدخالات غير منتهية الصلاحية. البحث الأول عن `tool_call_id` معين هو نتيجة DB ؛ عمليات البحث اللاحقة هي ضربات الذاكرة.
- **لا يوجد تفكير ولا ذاكرة تخزين مؤقت:** تقوم `cacheReasoningFromAssistantMessage` بإرجاع `0` عندما لا تحتوي الرسالة المساعدة على حقل `reasoning_content` / `reasoning` ، لذا فإن الاستجابات غير المفكرة لا تكلف شيئًا.
- **الكتابة مسورة أيضًا:** كلا موقعي الاتصال في `chatCore.ts` (غير المتدفق والمتدفق) يتصلان فقط بـ `cacheReasoningFromAssistantMessage()` عندما يكون `requiresReasoningReplay(provider, model)` هو `true` — وهو نفس المسند لعمليات التحقق من جانب القراءة. تتوقف عمليات التثبيت التي لا تمس موفر إعادة التشغيل مطلقًا عن الدفع مقابل الكتابة وتحديث الفهرس و try/catch في كل استجابة تحمل المنطق.
- **مقدمو الخدمات غير الصارمين:** عندما يكون `requiresReasoningReplay` هو `false` والتنسيق المستهدف هو OpenAI، فإن المترجم** شرائط** أي حقل `reasoning_content` من الرسائل الصادرة — OpenAI لا يقبله إكمال الدردشة.

## ملكية التفكير المبهم

Muse (`muse-code`) يُرجع المنطق المبهم المرتبط بالمتصل (`encrypted_content`). تفشل إعادة تشغيله ضمن حساب مختلف أو بيانات اعتماد تم تذكيرها في المنبع، لذلك تستخدم طلبات OAuth الأصلية ملكية على مستوى الجلسة بدلاً من التناوب لكل طلب (`src/sse/services/museSessionOwnership.ts`، الذي يتم فرضه في `src/sse/handlers/chat.ts`). تحتفظ اتصالات مفتاح API المحددة بشكل صريح وتكوينات مفتاح API فقط بالتوجيه الحالي بدون وضع الملكية هذا.

- توفير جلسة مستقرة ID في كل منعطف: `x-omniroute-session-id` أو `x-omniroute-session` أو `x-session-id` أو `x-codex-session-id`؛ بدلاً من ذلك، استخدم `prompt_cache_key` أو `session_id` أو `conversation_id` أو `metadata.session_id` في النص (بترتيب الأسبقية هذا). يُرجع IDs المفقود أو الفارغ 400 عندما يكون حسابان OAuth أصليان أو أكثر نشطين؛ مع حساب OAuth واحد، لا يوجد شيء للتدوير عليه، لذلك يحافظ مثل هذا الطلب على التوجيه غير المثبت. يتضمن النطاق مفتاح OmniRoute API-key ID الخاص بالمتصل.
- جلسات مستقلة جديدة تتم عبر حسابات OAuth الأصلية النشطة التي تسمح بها سياسة اتصال مفتاح واجهة برمجة التطبيقات (API)، مرتبة حسب الاتصال ID. يتخطى Round robin الحسابات في فترة تهدئة الاتصال، مع حالة المحطة الطرفية (`banned`, `expired`, `credits_exhausted`)، أو مقفل على النموذج للنموذج المطلوب؛ تسجل حالات فشل المنبع حالة التهدئة والكسر مثل مقدمي الخدمات الآخرين. يتجاوز الاتصال القسري بشكل صريح عملية Round robin لجلسة جديدة ولكن لا يمكنه تجاوز المالك الحالي.
- وإلى أن يقدم المالك استجابة ناجحة، تتم إعادة المطالبة بالجلسة التي أصبح مالكها غير متاح في حساب سليم. بعد الاستجابة الناجحة الأولى، تظل الجلسة مثبتة لذلك المالك حتى تصبح خاملة لمدة 30 يومًا (`MUSE_SESSION_IDLE_TTL_MS`).
- تظل كل استمرارية ودورة نتيجة للأداة مثبتة بمالك الجلسة: الاتصال وهوية الحساب وإنشاء بيانات اعتماد الاستدلال، ويتم فحصها مرة أخرى قبل محاولات المنبع، بما في ذلك إعادة محاولات تحديث بيانات الاعتماد. تستدعي الردود مراجع IDs/item ويجب أن يتم تسجيل استدعاء أداة إكمال الدردشة IDs لتلك الجلسة والجيل.
- تستمر سجلات SQLite `key_value` في مساحة الاسم `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) في الملكية ومؤشر التدوير عبر عمليات إعادة التشغيل. تقوم كل مطالبة واستجابة مقدمة بتحديث ختم نشاط الجلسة؛ يتم تقليم الجلسة الخاملة الأطول من `MUSE_SESSION_IDLE_TTL_MS` (رقم التعريف الشخصي للمالك والعلم المقدم وتجزئة opaque/reference المسجلة)، مرة واحدة على الأكثر كل 10 دقائق وعلى دفعات محدودة، لذلك تفشل إعادة التشغيل اللاحقة لسجلها كمالك غير معروف. تحتوي السجلات على اتصال IDs وتجزئة هوية الحساب وبيانات الاعتماد والمحتوى غير الشفاف ومراجع الاستمرار، وليس الأسرار أو سجل المحادثات. يجب على العملاء الاحتفاظ بسجلهم الكامل والمنطق المبهم وإرساله.
- فشل المنطق غير الواضح أو الأجنبي غير الشفاف، أو مالك مفقود، أو حساب مالك غير متاح، أو تغيير جيل مع تاريخ مسجل، في الإغلاق بـ 4xx/503 — الصريح، وعدم تجاوز الفشل عبر الحسابات مطلقًا، ولم يتم إسقاط المنطق مطلقًا. (#1628)
- يتم اعتماد مفتاح الحساب نفسه المُعاد إرساله فقط عندما لا تسجل الجلسة أي سجل قابل لإعادة التشغيل؛ تظل الجلسات المسجلة مغلقة حتى تبدأ من جديد.
- تتم إعادة محاولة الاستجابة الأولية الفارغة (`upstream_empty_response` / `empty_response`، لا شيء ينبعث للمتصل) مرتين على الأكثر على نفس المالك، بعد 0.5 ثانية ثم 1.5 ثانية (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). إذا كانت جميع المحاولات فارغة، فسيتم إرجاع 502 الأصلي بدون وضع علامات تباطؤ أو فاصل، لذا فإن الرد غير المستقر لا يمنع المالك أبدًا.
- تتجاوز جميع طلبات `muse-code` عمليات القراءة والكتابة في ذاكرة التخزين المؤقت الدلالية، بما في ذلك عمليات الكتابة المتدفقة، لذلك لا يمكن للمخرجات المعتمة المخزنة مؤقتًا الحصول على مالك جلسة مختلف.

حراس الانحدار: `tests/unit/muse-session-ownership.test.ts` و `tests/unit/muse-session-ownership-retention.test.ts` و `tests/unit/muse-empty-response-retry.test.ts` و `tests/unit/chatcore-semantic-cache.test.ts`.

## انظر أيضا

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — قواطع الدائرة، فترات التهدئة، عمليات تأمين النموذج
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — تشخيص المنبع 400s
- المصدر: `src/lib/db/reasoningCache.ts`، `open-sse/services/reasoningCache.ts`، `open-sse/translator/index.ts`
- الهجرة : `src/lib/db/migrations/033_create_reasoning_cache.sql`
- طريق API : `src/app/api/cache/reasoning/route.ts`
- العدد الأصلي: رقم #1628
