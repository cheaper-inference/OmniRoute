# Reasoning Replay Cache (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **مصدر الحقيقة:** `src/lib/db/reasoningCache.ts`، `open-sse/services/reasoningCache.ts`
> **آخر تحديث:** 2026-06-28 — v3.8.40

يلتقط OmniRoute محتوى `reasoning_content` الذي ينتجه المساعد في نماذج وضع التفكير، ويعيد تمريره بشفافية في الطلبات متعددة الأدوار عندما يتطلب مزوّد المنبع ذلك. يؤدي هذا إلى التخلص من أخطاء HTTP 400 التي تُرجعها المزوّدات الصارمة عندما يفتقد سجل محادثة العميل إلى استدلال الدور السابق.

## سبب وجود هذه الميزة

ترفض عدة مزوّدات تعمل بوضع التفكير أي دور متابعة ما لم **تتضمن رسالة المساعد السابقة محتوى `reasoning_content` الأصلي**. يُرجع المنبع الخطأ 400 مع رسائل مثل:

```
المعامل غير صحيح: يجب إعادة تمرير reasoning_content في وضع التفكير إلى API.
```

لكن العملاء المعتادين (Cursor وCline وRoo Code وOpenAI SDK) يزيلون `reasoning_content` من السجل الذي يعيدون تمريره. يستعيده OmniRoute من ذاكرة تخزين مؤقت من جانب الخادم بحيث يكون الطلب الذي يراه المنبع متسقًا. قدّمت المشكلة #1628 آلية التخزين الهجينة في الذاكرة/SQLite لكي تظل ذاكرة التخزين المؤقت محفوظة بعد إعادة تشغيل العملية.

## البنية المعمارية

```
الدور N (ينشئ المساعد):
  → تحتوي الاستجابة على reasoning_content + tool_calls
  → إذا كانت requiresReasoningReplay(provider, model): استدعاء cacheReasoningFromAssistantMessage()
      يكتب في (الذاكرة + قاعدة البيانات)، مع الفهرسة حسب كل tool_call.id
  → تمرير الاستجابة إلى العميل (الذي قد يحتفظ بالاستدلال أو لا يحتفظ به)

الدور N+1 (يرسل العميل متابعة):
  → يكتشف المترجم أن: requiresReasoningReplay(provider, model) === true
  → لكل رسالة مساعد تحتوي على tool_calls ولا تحتوي على reasoning_content:
      lookupReasoning(toolCalls[0].id) → الذاكرة → قاعدة البيانات
      إصابة  → msg.reasoning_content = cached; استدعاء recordReplay()
      إخفاق → msg.reasoning_content = "" (خيار رجوع قديم لإصدارات DeepSeek الأقدم)
  → يرى المنبع سجلًا متسقًا → لا يوجد خطأ 400
```

تحدث عملية الالتقاط في `open-sse/handlers/chatCore.ts` (في موضعين، عند موضعي استدعاء `cacheReasoningFromAssistantMessage`). وتحدث إعادة التشغيل في `open-sse/translator/index.ts` بعد تحويل المخطط، ولكن قبل الإرسال.

تُفهرس أدوار المساعد العادية (التي لا تتضمن استدعاءات أدوات) بطريقة مختلفة: تحسب `buildAssistantMessageCacheKey()` ملخصًا لنطاق الجلسة بالإضافة إلى نص المحادثة الموحّد بتنسيق OpenAI حتى ذلك الدور، لأن DeepSeek يتطلب استدلال _كل_ دور سابق بمجرد وجود `tools`. بالنسبة إلى الوجهات التي تستخدم Responses API (مثل `opencode-go/deepseek-v4-flash`، الموجّه إلى `/responses`)، يحمل نص الطلب المرسل إلى المنبع الحقل `input` بدلًا من `messages`، ولذلك تُبلغ `translateRequest()`‏ (`open-sse/translator/index.ts`) عبر خيار رد نداء عن نص المحادثة المحوري الذي حسبت ملخصه، ثم تحسب مواضع الالتقاط ملخص ذلك النص نفسه. تعمل مرحلة إعادة تشغيل Responses على المحور المتوافق مع OpenAI لكل تنسيق مصدر، ولذلك تُعاد أيضًا رسائل عملاء Anthropic Messages ‏(Claude → OpenAI → Responses).

## التخزين — الذاكرة الهجينة + SQLite

يستخدم المسار السريع بنية `Map` داخل الذاكرة (وفق LRU حسب وقت الإنشاء)، تدعمها قاعدة بيانات SQLite للتعافي من الأعطال وإتاحة البيانات في لوحة المعلومات.

| الطبقة         | التنفيذ                                        | الغرض                                        |
| -------------- | ---------------------------------------------- | -------------------------------------------- |
| الذاكرة        | `Map` في `open-sse/services/reasoningCache.ts` | عمليات بحث سريعة، وتزيل الأقدم عند بلوغ 200  |
| قاعدة البيانات | جدول `reasoning_cache` ‏(`src/lib/db/`)        | الاستمرار بعد إعادة التشغيل وتوفير الإحصاءات |

تُنفَّذ عمليات الكتابة في كليهما. تستعلم عمليات القراءة من الذاكرة أولًا، ثم تلجأ إلى قاعدة البيانات (وتُرقّى نتائج قاعدة البيانات إلى الذاكرة مجددًا). أعطال قاعدة البيانات غير فادحة — إذ تستمر ذاكرة التخزين المؤقت داخل الذاكرة في خدمة المسار السريع.

**الإعدادات الافتراضية:**

- مدة البقاء: `2h` ‏(`TTL_MS = 2 * 60 * 60 * 1000`)
- الحد الأقصى للإدخالات في الذاكرة: `200` ‏(`MAX_MEMORY_ENTRIES`)
- الإزالة: الأقدم حسب `createdAt` أولًا

## مخطط قاعدة البيانات

الترحيل: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

الفهارس: `expires_at` و`provider` و`model` و`created_at`. تُخزَّن قيمة `expires_at` بوصفها ثواني حقبة Unix؛ وتعمل طبقة SELECT على توحيد القيم النصية القديمة عبر `EXPIRES_AT_EPOCH_SQL`.

## اكتشاف المزوّد / النموذج

تُفعَّل إعادة التشغيل عندما تُرجع `requiresReasoningReplay(provider, model)` القيمة `true`. تتحقق الدالة من قائمتين في `open-sse/services/reasoningCache.ts`.

**معرّفات المزوّدين (تطابق تام، غير حساس لحالة الأحرف):**

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

**أنماط التعبيرات النمطية للنماذج (غير حساسة لحالة الأحرف):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` و`/deepseek[-/]?v4[-.]pro/i` ‏(V4 Flash / Pro، مع لاحقة `-free` اختيارية)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

تعني إضافة مزوّد/نموذج صارم جديد إلحاقه بإحدى هاتين القائمتين وكتابة اختبار وحدة يؤكد حقن إعادة التشغيل. يجب أن يشير وصف طلب السحب إلى نص الخطأ 400 الوارد حرفيًا من المصدر والذي حفّز التغيير.

## واجهة REST API

توفّر ذاكرة التخزين المؤقت نقطتي نهاية ضمن `src/app/api/cache/reasoning/route.ts`. تتطلب كلتاهما مصادقة إدارية (`isAuthenticated` من `@/shared/utils/apiAuth`).

| الطريقة | نقطة النهاية                                              | الوصف                                                                     |
| ------- | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| GET     | `/api/cache/reasoning`                                    | الإحصاءات + الإدخالات المقسّمة إلى صفحات                                  |
| GET     | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | قائمة مفلترة (تُحصر قيمة `limit` ضمن النطاق `[1, 200]`)                   |
| DELETE  | `/api/cache/reasoning`                                    | مسح كل شيء (الذاكرة + قاعدة البيانات) وإعادة ضبط أعداد الإصابات/الإخفاقات |
| DELETE  | `/api/cache/reasoning?provider=deepseek`                  | مسح إدخالات مزوّد واحد فقط                                                |
| DELETE  | `/api/cache/reasoning?toolCallId=call_abc`                | حذف إدخال واحد                                                            |

**بنية استجابة GET:**

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

## ملاحظات تشغيلية

- **التنظيف:** تزيل `cleanupReasoningCache()` إدخالات الذاكرة منتهية الصلاحية وتنفّذ `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. تستدعي العمليات العاملة لفحص السلامة هذه الدالة دوريًا.
- **الاستعادة بعد التعطل:** بعد إعادة التشغيل، تكون الذاكرة فارغة، لكن قاعدة البيانات تظل محتفظة بالإدخالات غير منتهية الصلاحية. يكون البحث الأول عن `tool_call_id` معيّن إصابة في قاعدة البيانات؛ أما عمليات البحث اللاحقة فتكون إصابات في الذاكرة.
- **لا استدلال، لا تخزين مؤقت:** تُرجع `cacheReasoningFromAssistantMessage` القيمة `0` عندما لا تحتوي رسالة المساعد على حقل `reasoning_content` / `reasoning`، لذا لا تترتب أي تكلفة على الاستجابات غير الاستدلالية.
- **الكتابة مقيّدة أيضًا:** لا يستدعي موضعا الاستدعاء في `chatCore.ts` (غير المتدفق والمتدفق) الدالة `cacheReasoningFromAssistantMessage()` إلا عندما تُرجع `requiresReasoningReplay(provider, model)` القيمة `true` — وهو الشرط نفسه الذي يتحقق منه جانب القراءة. تتوقف عمليات التثبيت التي لا تستخدم أي مزوّد لإعادة التشغيل عن تحمّل تكلفة الكتابة وتحديث الفهرس وكتلة try/catch في كل استجابة تتضمن استدلالًا.
- **المزوّدون غير الصارمين:** عندما تُرجع `requiresReasoningReplay` القيمة `false` ويكون التنسيق المستهدف هو OpenAI، يزيل المترجم **أي حقل `reasoning_content`** من الرسائل الصادرة — إذ لا تقبله واجهة OpenAI Chat Completions.

## ملكية الاستدلال المعتم في Muse

يعيد Muse (`muse-code`) استدلالًا معتمًا مرتبطًا بالمستدعي (`encrypted_content`). تفشل إعادة تشغيله لدى المنبع تحت حساب مختلف أو بيانات اعتماد أُصدرت مجددًا، لذا تستخدم طلبات OAuth الأصلية ملكية على مستوى الجلسة بدل التدوير لكل طلب (`src/sse/services/museSessionOwnership.ts`، وتُفرَض في `src/sse/handlers/chat.ts`). تحتفظ اتصالات مفتاح API المحددة صراحةً والإعدادات التي تستخدم مفاتيح API فقط بتوجيهها الحالي دون نمط الملكية هذا.

- قدّم معرّف جلسة ثابتًا في كل دور: `x-omniroute-session-id` أو `x-omniroute-session` أو `x-session-id` أو `x-codex-session-id`؛ أو استخدم `prompt_cache_key` أو `session_id` أو `conversation_id` أو `metadata.session_id` في المتن (بترتيب الأولوية هذا). تعيد المعرّفات الغائبة أو الفارغة 400 عند نشاط حسابَي OAuth أصليين أو أكثر؛ ومع حساب OAuth واحد لا يوجد حساب آخر للتدوير إليه، فيحتفظ الطلب بتوجيه غير مثبت. يتضمن النطاق معرّف مفتاح OmniRoute API الخاص بالمستدعي.
- تتناوب الجلسات المستقلة الجديدة دوريًا بين حسابات OAuth الأصلية النشطة المسموح بها وفق سياسة اتصالات مفتاح API، مرتبةً حسب معرّف الاتصال. يتجاوز التناوب الحسابات في فترة تهدئة اتصال أو حالة نهائية (`banned` و`expired` و`credits_exhausted`)، أو المحظورة للنموذج المطلوب؛ وتسجل إخفاقات المنبع في Muse حالة التهدئة والقاطع مثل المزوّدين الآخرين. يتجاوز الاتصال المفروض صراحةً التناوب لجلسة جديدة، لكنه لا يستطيع تجاوز مالك بعد أن يقدم استجابة ناجحة.
- إلى أن يقدم المالك استجابة ناجحة، تُعاد المطالبة بجلسة أصبح مالكها غير متاح لحساب سليم. بعد أول استجابة ناجحة، تبقى الجلسة مثبتة لذلك المالك إلى أن تظل خاملة لمدة 30 يومًا (`MUSE_SESSION_IDLE_TTL_MS`).
- تظل كل متابعة وكل دور بنتيجة أداة مثبتة لمالك الجلسة: الاتصال وهوية الحساب وجيل بيانات اعتماد الاستدلال، ويُعاد فحصها قبل محاولات المنبع، بما فيها محاولات إعادة تحديث بيانات الاعتماد. يجب أن تكون معرّفات استدعاءات/مراجع عناصر Responses ومعرّفات استدعاء أدوات Chat Completions مسجلة لتلك الجلسة وذلك الجيل.
- تحفظ سجلات SQLite `key_value` ضمن نطاق الأسماء `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) الملكية ومؤشر التدوير عبر إعادات التشغيل. تجدّد كل مطالبة وكل استجابة مقدمة طابع نشاط الجلسة؛ وتُنقَّح الجلسة الخاملة أكثر من `MUSE_SESSION_IDLE_TTL_MS` (تثبيت المالك وعلامة تقديم الاستجابة وبصمات المحتوى المعتم/المراجع المسجلة)، بحد أقصى مرة كل 10 دقائق وفي دفعات محدودة، فتُرفض إعادة تاريخها لاحقًا رفضًا آمنًا بوصف المالك غير معروف. تحتوي السجلات على معرّفات الاتصال وبصمات هوية الحساب وبيانات الاعتماد والمحتوى المعتم ومراجع المتابعة، لا على أسرار أو تاريخ المحادثة. يجب على العملاء الاحتفاظ بتاريخهم الكامل والاستدلال المعتم وإرسالهما.
- يُرفض الاستدلال المعتم المجهول أو الأجنبي، أو غياب المالك، أو عدم توفر حسابه، أو تغير الجيل مع وجود تاريخ مسجل، رفضًا آمنًا بخطأ صريح 4xx/503؛ ولا يحدث أبدًا انتقال صامت بين الحسابات أو إسقاط للاستدلال.
- لا يُعتمد مفتاح أُصدر مجددًا للحساب نفسه إلا إذا لم تسجل الجلسة تاريخًا قابلًا للإعادة؛ وتظل الجلسات المسجلة تُرفض بأمان إلى أن تبدأ من جديد.
- تُعاد محاولة استجابة المنبع الفارغة (`upstream_empty_response` / `empty_response`، دون إرسال شيء إلى المستدعي) مرتين على الأكثر لدى المالك نفسه، بعد 0.5 s ثم 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). إذا كانت جميع المحاولات فارغة، يُعاد الخطأ 502 الأصلي دون تعليم التهدئة أو القاطع، فلا تؤدي استجابة متقلبة إلى حظر المالك.
- تتجاوز جميع طلبات `muse-code` قراءات ذاكرة التخزين المؤقت الدلالية وكتاباتها، بما فيها الكتابات المتدفقة، فلا يمكن للمخرجات المعتمة المخزنة اكتساب مالك جلسة مختلف.

حواجز الانحدار: `tests/unit/muse-session-ownership.test.ts` و`tests/unit/muse-session-ownership-retention.test.ts` و`tests/unit/muse-empty-response-retry.test.ts` و`tests/unit/chatcore-semantic-cache.test.ts`.

## انظر أيضًا

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — قواطع الدارات، وفترات التهدئة، وعمليات حظر النماذج
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — تشخيص أخطاء 400 الواردة من الخدمات المصدرية
- المصدر: `src/lib/db/reasoningCache.ts`، `open-sse/services/reasoningCache.ts`، `open-sse/translator/index.ts`
- الترحيل: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- مسار API: `src/app/api/cache/reasoning/route.ts`
- المشكلة الأصلية: #1628
