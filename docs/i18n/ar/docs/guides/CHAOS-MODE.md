# Chaos Mode (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **لوحة التحكم:** **وضع الفوضى** (الشريط الجانبي) → `/dashboard/chaos`  
> **واجهة API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (جلسة لوحة التحكم) · `POST /api/skills/collect/chaos` (مفتاح API)  
> **المصدر:** `src/lib/chaos/chaosExecutor.ts`، `src/lib/chaos/chaosConfig.ts`

يرسل وضع الفوضى **مهمة واحدة إلى عدة مزوّدين في الوقت نفسه** — يساهم كل مزوّد مشارك
بمثيل واحد من نموذج، وتحصل على جميع الإجابات جنبًا إلى جنب (أو على نحو متسلسل مترابط). وهو
واجهة تنفيذ متعددة النماذج، وليس استراتيجية توجيه: لا تتأثر به مطلقًا حركة مرور
`/v1/chat/completions` العادية لديك.

**توضيح — هناك ثلاثة أشياء مختلفة تحمل كلمة "chaos" في أسمائها:**

| الشيء              | ماهيته                                                                                                                                                                | موضع توثيقه                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **وضع الفوضى**     | صفحة لوحة التحكم + واجهة API الموصوفتان هنا: توزيع مهمة واحدة على عدة مزوّدين (بالتوازي أو بصورة تعاونية).                                                            | هذا الدليل                                   |
| `auto/chaos`       | معرّف نموذج Auto-Combo: توزيع متوازٍ، نموذج واحد لكل مزوّد، واستدعاء واحد لكل مزوّد إلى الخدمة المصدرية. ليس حقنًا للأعطال ([التفاصيل](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| إعداد مجموعة Chaos | مجموعة محفوظة ذات `config.chaos.enabled` توزّع الطلب بالطريقة نفسها (عبر API فقط)؛ يختار `judgeModel` الإجابة النهائية فحسب، من دون استدعاء توليف.                    | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: توزيع متوازٍ

`auto/chaos` **ليس** خيارًا لحقن الأعطال أو اختبار المرونة. يؤدي طلب
`model: "auto/chaos"` على `/v1/chat/completions` إلى ما يلي:

1. إنشاء لجنة من **نموذج واحد لكل مزوّد**: المرشح الأول لكل
   مزوّد متصل، وفق ترتيب مجموعة المرشحين، وبحد أقصى 5 أعضاء
   (`OMNIROUTE_CHAOS_MAX_PANEL`، وبسقف أقصى قدره 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). لا تفعل حزمة أوزان `chaos-mode`
   سوى تعيين `weight` لكل عضو؛ ولا تقرأها عملية التوزيع.
2. إرسال الطلب نفسه إلى كل عضو في اللجنة **بالتوازي**، ولذلك يكلّف الطلب الواحد
   استدعاءً واحدًا للخدمة المصدرية لكل عضو في اللجنة
   (`open-sse/services/autoCombo/chaosEngine.ts`، ويُرسَل من
   `open-sse/services/combo.ts`).
3. بث سطر حالة واحد لكل عضو في اللجنة عند وصول نتيجته: تعليق SSE
   (`: chaos <index> ok|fail <model>`) افتراضيًا، بالإضافة إلى حدث `omni-chaos-part`
   (`model`، `index`، `ok`، `error`) عندما يعيّن الطلب
   `stream_options.include_chaos_parts: true`. ولا تحمل هذه العناصر أي نص من الإجابة.
4. إرسال إجابة **واحدة** من اللجنة بوصفها مقطعًا نهائيًا بنمط OpenAI: إجابة أول عضو
   في اللجنة (يعيّنه `auto/chaos` بوصفه `judgeModel`) عند نجاحه، وإلا فإجابة
   آخر عضو ناجح. لا تُعاد إجابات أعضاء اللجنة الآخرين، ولذلك تدفع تكلفة N من الاستدعاءات وتتلقى إجابة مكتملة واحدة.

## يثبت

1. يفتح** لوحة القيادة → وضع الفوضى** (`/dashboard/chaos`).
2. اقلبها** على** — Chaos Mode** معطل بشكل افتراضي** (`enabled: false` في `src/lib/chaos/chaosConfig.ts`). أثناء تعطيله، يجيب `POST /api/chaos/run` على `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. اختر المشاركين والإعدادات الافتراضية (مستمرة لكل مثيل عبر متجر الإعدادات):

   | مجال                | معنى                                                         | الافتراضي / الحدود                |
   | ------------------- | ------------------------------------------------------------ | --------------------------------- |
   | `enabled`           | التبديل الرئيسي                                              | `false`                           |
   | `defaultMode`       | `parallel` أو `collaborative` (انظر أدناه)                   | `parallel`                        |
   | `providerOverrides` | مشاركة كل مزود (`providerId`, `modelId` اختياري , `enabled`) | أفرغ = لكل مزود نشط، بحد أقصى 200 |
   | `systemPrompt`      | تجاوز موجه نظام الفوضى المدمج                                | اختياري، بحد أقصى 10000 حرف       |
   | `timeoutMs`         | الحد الأقصى للوقت لكل مكالمة نموذجية                         | `120000` (5 000–600 000)          |
   | `maxTokens`         | `max_tokens` لكل مكالمة نموذجية                              | `4096` (256–128 000)              |

4. امنح كل مقدم خدمة مشارك أ** نموذج** . نموذج الموفر هو `modelId` للتجاوز الممكّن على صفحة Chaos Mode (يفوز)، وإلا فإن** النموذج الافتراضي** من اتصالها. لا يتم استخدام معرف الموفر مطلقًا كاسم نموذج. مزود مع لا هو** لم يتم استدعاؤه** : يظهر في النتائج كـ `status: "error"` مع الرسالة _"لم يتم تعيين نموذج لهذا الموفر. قم بتعيين نموذج له في صفحة Chaos Mode أو نموذج افتراضي على الاتصال."_ و `modelId` فارغ، بينما يعمل الموفرون الآخرون بشكل طبيعي. إذا لم يكن لدى أي موفر محدد نموذج، فسيفشل التشغيل قبل أي طلب أولي مع _"ليس لدى أي موفر مجموعة نماذج. ..."_ (HTTP 500 على كلا نقطتي النهاية).
5. تشغيل أ** اختبار من الصفحة نفسها** — تعرض لوحة النتائج إجابة كل مزود وحالته ومدته.

## أوضاع التنفيذ

- **`parallel`** — يتلقى كل نموذج المهمة نفسها في الوقت ذاته؛ وتتلقى جميع الإجابات
  بصورة مستقلة.
- **`collaborative`** — تعمل النماذج **في سلسلة**: يرى كل نموذج مخرجات النموذج السابق
  ويُطلب منه تنقيحها أو توسيعها أو نقدها أو تقديم بديل. يدمج حقل `summary` في الاستجابة
  المخرجات الناجحة وفق ترتيب السلسلة (لا تحتوي عمليات التشغيل المتوازية على `summary`).

## API

### جلسة لوحة القيادة `POST /api/chaos/run` —

مصادقة ملفات تعريف الارتباط (جلسة الإدارة — راجع [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) )؛ المستخدمة من قبل صفحة لوحة القيادة.

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

### مفتاح `POST /api/skills/collect/chaos` — API

متغير الرمز المميز للمتصلين الخارجيين. يجب أن يحمل المفتاح** إذن وضع الفوضى** (`chaosModeEnabled`) وهو** إيقاف بشكل افتراضي** — تمكينه لكل مفتاح في** لوحة القيادة → API Manager → مفتاح التحرير أذونات → → وضع الفوضى** . نفس الجسم المذكور أعلاه.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

كلا نقطتي النهاية ترجع نفس الشكل:

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

## استكشاف الأخطاء وإصلاحها

- **`400 Chaos Mode is not enabled`** — 2 أعلاه: المفتاح العام متوقف عن التشغيل.
- **يتم رفض مفتاح API على `/api/skills/collect/chaos`** — يفتقر المفتاح إلى إذن `chaosModeEnabled` لكل مفتاح (متوقف بشكل افتراضي؛ وهذا إعداد وليس خطأ).
- **يظهر مقدم `No model set for this provider`** قام — بتعيين نموذجه على صفحة Chaos Mode أو نموذج افتراضي على اتصاله (راجع الإعداد، الخطوة 4).
- **الموفر الذي توقعته مفقود من النتائج** — تحقق من `providerOverrides` في صفحة Chaos Mode (يستبعده التجاوز المعطل) وما إذا كان اتصال الموفر نشطًا.
