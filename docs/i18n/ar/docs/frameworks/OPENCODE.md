# OpenCode Integration (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **حالة:** متاح بشكل عام.** جمهور:** يقوم المشغلون بتوصيل OpenCode إلى نشر OmniRoute.** مصدر الحقيقة (مخطط التكوين):** `src/shared/services/opencodeConfig.ts`** حزم npm الموصى بها:** `@omniroute/opencode-plugin/` (OpenCode v1، تم تثبيته بواسطة `omniroute setup opencode`) و `@omniroute/opencode-plugin-v2/` (OpenCode v2). حزمة `@omniroute/opencode-provider/` الأقدم هي** مهمل** (انظر المسار 2).

[OpenCode](https://opencode.ai) هو عميل CLI/desktop AI الوكيل. يقرأ كتالوج الموفر الخاص به من `~/.config/opencode/opencode.json` (أو `opencode.jsonc`) ويتبع المخطط الموجود في `https://opencode.ai/config.json`. يعرض OmniRoute نفسه لـ OpenCode كواحد من هؤلاء المزودين — يتدفق كل طلب من خلال سطح `/v1` القياسي المتوافق مع OpenAI لـ OmniRoute، لذلك يستفيد OpenCode تلقائيًا من توجيه التحرير والسرد التلقائي، وقواطع الدائرة، والسياسات الرئيسية، وإمكانية المراقبة، وما إلى ذلك.

توثق هذه الصفحة مساري التكوين الثابت أدناه؛ كلاهما يولد نفس التكوين. للحصول على قائمة النماذج التي تتبع الكتالوج المباشر الخاص بك، استخدم المكون الإضافي بدلاً من ذلك: `omniroute setup opencode` يقوم بتثبيت `@omniroute/opencode-plugin` (OpenCode v1)، ويستهدف `@omniroute/opencode-plugin-v2` OpenCode v2 (راجع [عمليات تكامل CLI](../guides/CLI-INTEGRATIONS.md) [ودليل البرنامج الإضافي OpenCode v2](../guides/OPENCODE-V2-PLUGIN.md) ).

---

## المسار 1 — مولّد CLI (من دون تثبيت npm)

موصى به للمستخدمين النهائيين. يأتي مع OmniRoute. ويكتب `opencode.json` في موقعه.

```bash
# بعد تثبيت OmniRoute (npm i -g @omniroute/cli أو نسخة محلية مستنسخة)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

خلف الكواليس، يستدعي CLI الدالة `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`)، ولذلك يحتفظ ملف `opencode.json` الموجود بموفّريه الآخرين وتعليقاته. ويُضاف إدخال OmniRoute أو يُستبدل بشكل ذري.

الملف الناتج (كتالوج النماذج الافتراضي):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<مفتاحك>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## المسار 2 — npm `@omniroute/opencode-provider` (مهملة)

> **مهمل.** تكتب الحزمة قائمة نماذج ثابتة تنجرف وراء كتالوج OmniRoute المباشر الخاص بك. يوصي README الخاص به بالانتقال إلى `@omniroute/opencode-plugin` (أو `@omniroute/opencode-plugin-v2` على OpenCode v2). يتم الاحتفاظ بـ API الموجود أدناه للنصوص البرمجية الموجودة فقط.

يُستخدم عند برمجة التكوين من Node/TS (خطوط أنابيب CI ، monorepos، تدفقات المثبت المخصص).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Optional: override the model catalog exposed to OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

لإجراء دمج غير مدمر مع ملف موجود، قم بنسخ `mergeOpenCodeConfigText()` من `opencodeConfig.ts` أو اتصل بمولد CLI.

راجع [الحزمة README](../../@omniroute/opencode-provider/README.md) للحصول على API الكامل.

---

## ما تفعله بيئة التشغيل فعليًا

ينتج كلا المسارين القيمة نفسها `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. في وقت التشغيل، يحمّل OpenCode الحزمة `@ai-sdk/openai-compatible` (وهي بالفعل تبعية انتقالية لـ OpenCode) ويضبطها باستخدام `baseURL` + `apiKey`. ومن هناك:

```
واجهة مستخدم/وكيل OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (واجهة OmniRoute المتوافقة مع OpenAI)
         → معالج OmniRoute للمسار /v1/chat/completions     (open-sse/handlers/chatCore.ts)
            → توجيه المجموعات / Auto-Combo / المنفّذ
               → الموفّر الرئيسي
```

لا تتعامل الإضافة مطلقًا مع HTTP. فهي لا تفعل سوى إصدار الإعداد.

---

## الإعدادات الافتراضية لكتالوج النماذج

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

يمكنك تجاوزها عبر `models: [...]`. الإضافات الموصى بها:

- `"auto"` — يُظهر موجّه [Auto-Combo](../routing/AUTO-COMBO.md) من OmniRoute الذي لا يتطلب إعدادًا. يتيح لـ OpenCode اختيار «أفضل نموذج متاح» دون الحاجة إلى ترميز الكتالوج بشكل ثابت.
- `"<combo-name>"` — أي مجموعة عرّفتها في لوحة المعلومات؛ يتولى OmniRoute حلّها بشفافية.

---

## تسوية عناوين URL

تقبل الأداة المساعدة كلا الشكلين وتُنتج `/v1` واحدة فقط:

| الإدخال                        | الإخراج (`options.baseURL`) |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

إزالة التكرار هذه هي **أكثر أسباب الأعطال شيوعًا** في الإعدادات القديمة. إذا كان لديك ملف `opencode.json` من إصدار يسبق v3.8.0 ويشير إلى `/v1/v1/...`، فأعِد تشغيل المولّد أو استدعِ `createOmniRouteProvider` مرة أخرى.

---

## أوضاع المصادقة

| إعداد OmniRoute                            | قيمة `apiKey` الموصى بها                                       |
| ------------------------------------------ | -------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (الافتراضي محليًا) | `sk_omniroute` (عنصر نائب حرفي)                                |
| `REQUIRE_API_KEY=true`                     | مفتاح API حقيقي خاص بكل مستخدم من لوحة المعلومات ← مفاتيح API. |

بالنسبة إلى العملاء المتوافقين مع نمط Anthropic الذين يرسلون `x-api-key` مع `anthropic-version`، تحترم دالة `extractApiKey` في OmniRoute أيضًا المفتاح الوارد من `x-api-key`. يستخدم OpenCode واجهة OpenAI، ولذلك سيرسل دائمًا `Authorization: Bearer ${apiKey}` — ولا تنطبق هنا أي معالجة خاصة بـ Anthropic.

---

## استكشاف الأخطاء وإصلاحها

| العَرَض                                                | السبب                                                                        | الإصلاح                                                                                              |
| ------------------------------------------------------ | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| ظهور `404` في كل طلب يحتوي عنوان URL فيه على `/v1/v1/` | إعداد قديم من مكوّن إضافي يسبق v3.8 وكان يضيف اللاحقة `/v1` مرتين.           | أعِد التوليد عبر المسار 1 أو 2.                                                                      |
| `401 Invalid API key`                                  | يتضمن OmniRoute الإعداد `REQUIRE_API_KEY=true` والمفتاح غير معروف.           | أنشئ المفتاح في لوحة المعلومات، أو عيّن `REQUIRE_API_KEY=false` (محليًا فقط) واستخدم `sk_omniroute`. |
| قائمة النماذج فارغة في واجهة OpenCode                  | جميع النماذج الافتراضية الأربعة مخفية ضمن إعدادات ظهور المزوّد في OmniRoute. | مرّر `models: ["auto", ...]` لإظهار النماذج التي فعّلتها.                                            |
| خطأ 500 في OpenCode مع `cannot read property 'models'` | لم تكن الإصدارات الأقدم من OpenCode (< 0.1.x) تقبل `models` المضمّنة.        | رقِّ OpenCode إلى إصدار يتبع مخطط v1 (`opencode.ai/config.json`).                                    |

---

## أنظر أيضا

- [API مرجع](../reference/API_REFERENCE.md) — كامل OmniRoute REST السطح
- [Auto-Combo](../routing/AUTO-COMBO.md) — ماذا يعني `model: "auto"`
- [`@omniroute/opencode-plugin` README](../../@omniroute/opencode-plugin/README.md) (مستحسن)
- [`@omniroute/opencode-plugin-v2` README](../../@omniroute/opencode-plugin-v2/README.md)
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md) (مهجور)
- المصدر: `src/shared/services/opencodeConfig.ts`، `src/lib/cli-helper/config-generator/opencode.ts`، `@omniroute/opencode-provider/src/index.ts`
