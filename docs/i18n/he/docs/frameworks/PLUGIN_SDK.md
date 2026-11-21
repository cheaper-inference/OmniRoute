# OmniRoute Plugin SDK (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## התחלה מהירה

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "my-plugin",
  priority: 50,
  onRequest: async (ctx) => {
    console.log(`Request ${ctx.requestId} for ${ctx.model}`);
  },
  onResponse: async (ctx, response) => {
    console.log(`Response for ${ctx.requestId}`);
    return response;
  },
  onError: async (ctx, error) => {
    console.error(`Error: ${error.message}`);
  },
});
```

## API

### `definePlugin(def: PluginDefinition): Plugin`

פונקציית מפעל שיוצרת אובייקט פלאגין עם ברירות מחדל.

**פרמטרים:**

- `name` (מחרוזת, חובה) — שם תוסף ב-kebab-case
- `priority` (מספר, אופציונלי, ברירת מחדל: 100) — Lower פועל ראשון
- `enabled` (בוליאנית, אופציונלי, ברירת מחדל: אמיתי) — התחל מופעלת?
- `onRequest` (פונקציה, אופציונלי) — פועל לפני המטפל בצ'אט
- `onResponse` (פונקציה, אופציונלי) — פועל לאחר מטפל בצ'אט
- `onError` (פונקציה, אופציונלי) — פועל על שגיאת מטפל

### `blockRequest(response?): BlockingHookResult`

חסום את הבקשה ואפשר להחזיר תגובה מותאמת אישית.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

שנה את גוף הבקשה לפני שהוא מגיע לספק.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

צרף מטא נתונים להקשר הבקשה.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## ההקשר של הפלאגין (`PluginContext`)

| שָׂדֶה       | סוּג                      | תֵאוּר                            |
| ------------ | ------------------------- | --------------------------------- |
| `requestId`  | `string`                  | מזהה בקשה ייחודי                  |
| `model`      | `string`                  | שם הדגם המבוקש                    |
| `provider`   | `string`                  | ספק היעד ID                       |
| `body`       | `Record<string, unknown>` | גוף הבקשה                         |
| `headers`    | `Record<string, string>`  | כותרות בקשה (ראה הערה)            |
| `metadata`   | `Record<string, unknown>` | מטא נתונים ניתנים לשינוי          |
| `timestamp`  | `number`                  | בקש חותמת זמן                     |
| `apiKeyInfo` | `object` (אופציונלי)      | מטא נתונים של מפתח API (ראה הערה) |

ההקשר לעולם לא נושא את האישורים של הלקוח: הכותרות `authorization`, `x-api-key`, `proxy-authorization` ו- `cookie` מוסרות (כל עט), ו- `apiKeyInfo` שומר על המטא-נתונים של המפתח (כגון `id`, `name` ו- `scopes`) אך לא את ערך המפתח או טביעת האצבע שלו (`redactPluginContext()` in `src/lib/plugins/hooks.ts`). זה חל על `onRequest`, `onResponse` ו- `onError`.

## מניפסט (`plugin.json`)

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "A sample plugin",
  "author": "your-name",
  "main": "index.js",
  "hooks": {
    "onRequest": { "enabled": true, "priority": 50 },
    "onResponse": true,
    "onError": false
  },
  "requires": {
    "permissions": ["network", "file-read"]
  },
  "enabledByDefault": false,
  "configSchema": {
    "apiKey": {
      "type": "string",
      "description": "API key for external service"
    },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

### עדיפות Hooks

ניתן להגדיר Hooks עם עדיפות (ערך נמוך יותר = מופעל ראשון):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

או כערכים בוליאניים פשוטים (עדיפות ברירת מחדל 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## מערכת הרשאות

כברירת מחדל תוספים הם** לא בארגז חול** . כל תוסף פעיל פועל כתהליך צאצא נפרד, רגיל של Node.js (`loadPlugin()` ב- `src/lib/plugins/loader.ts`) תחת אותו משתמש מערכת הפעלה כמו OmniRoute, ללא הקשר VM וללא דגלי הרשאות Node.js. קוד הפלאגין יכול להשתמש `node:fs`, `node:child_process`, `fetch` ובכל Node.js API אחר: הוא יכול לקרוא ולכתוב כל קובץ שמשתמש OmniRoute יכול (כולל ספריית הנתונים), להפעיל תוכניות ולהגיע לרשת.

`requires.permissions` של המניפסט מקבל `network`, `file-read`, `file-write`, `env` ו- `exec`. עם הגדרות ברירת המחדל רק `env` יש השפעה בזמן ריצה.

### מודל הרשאת הצטרפות (`PLUGIN_PERMISSION_MODEL_ENABLED`)

דגל התכונה `PLUGIN_PERMISSION_MODEL_ENABLED` (קטגוריה `security`,** כבוי כברירת מחדל** ) מתחיל כל תהליך תוסף עם [מודל ההרשאות Node.js](https://nodejs.org/api/permissions.html) (`--permission`, מקובל על כל קו Node.js נתמך: 22.22 +, 24 ו- 26). הדגלים בנויים מהמניפסט על ידי `buildPermissionModelArgs()` ב- `src/lib/plugins/permissionModel.ts`. הדגל נקרא כאשר תוסף מופעל, כך שהוא חל על תוספים שהופעלו לאחר השינוי; השבת והפעל תוסף פועל כדי להחיל אותו.

ספריית הנתונים של הפלאגין היא `plugin-data/<plugin-name>` ליד שורש הפלאגין (`~/.omniroute/plugin-data/<plugin-name>` כברירת מחדל, `getPluginDataDir()`). כשהדגל דולק, הנתיב שלו מועבר לפלאגין כ- `PLUGIN_DATA_DIR`.

| רְשׁוּת         | סמן כבוי (ברירת מחדל)                                                                                                                                                                                               | דגל דולק                                                                                                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (אַף לֹא אֶחָד) | הרשאות מלאות של משתמש OmniRoute.                                                                                                                                                                                    | הקובץ נקרא רק בתוך ספריית הפלאגין. אין כתיבת קובץ, אין תהליכי צאצא, אין שרשורי עובדים, אין תוספות מקוריות, אין WASI.                                                                                       |
| `env`           | תהליך הפלאגין מקבל גם `PORT`, `HOSTNAME`, `TZ` ו- `TMPDIR`. בלעדיו, הוא מקבל רק `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` ו- `PLUGIN_NAME` (בתוספת `SystemRoot` ו- `windir` על Windows). | אותו דבר כמו עם הדגל כבוי.                                                                                                                                                                                 |
| `file-read`     | אין (הצהרה בלבד).                                                                                                                                                                                                   | גם ספריית הנתונים של הפלאגין הופכת לקריאה (היא נוצרת אם היא חסרה).                                                                                                                                         |
| `file-write`    | אין (הצהרה בלבד).                                                                                                                                                                                                   | ספריית הנתונים של הפלאגין הופכת לקריאה ולכתיבה (`--allow-fs-write`). שום דבר אחר לא ניתן לכתיבה.                                                                                                           |
| `exec`          | אין (הצהרה בלבד).                                                                                                                                                                                                   | מותרים תהליכי ילד (`--allow-child-process`). Node.js מעבירה את דגלי ההרשאה לתהליכי Node.js צאצאים דרך `NODE_OPTIONS`, אך כל תוכנית אחרת פועלת ללא הגבלות, כך ש- `exec` למעשה מסירה את מגבלות מערכת הקבצים. |
| `network`       | אין (הצהרה בלבד).                                                                                                                                                                                                   | אַף לֹא אֶחָד. מודל ההרשאות Node.js אינו מגביל גישה לרשת יוצאת, כך ש- `network` נשאר בהצהרה ולעולם לא נאכף.                                                                                                |

הפעלת הדגל פוגעת בתוספים שקוראים קבצים מחוץ לספרייה שלהם (לדוגמה מודול שנפתר מ- `node_modules` אב), כותבים בכל מקום מלבד ספריית הנתונים שלהם, או מעוררים תהליכים מבלי להכריז על `exec`. אפילו עם הדגל על הפלאגין שומר על גישה לרשת ופועל כמשתמש OmniRoute, אז התקן רק תוספים שאתה סומך על המקור שלהם.

## סכמת תצורה

הגדירו הגדרות הניתנות להתאמה ב-`configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "מפתח API חיצוני" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

סוגי שדות: `string`, `number`, `boolean`, `select`

אפשרויות שדה: `default`, `min`, `max`, `enum`, `description`

ערכי התצורה נשמרים במסד הנתונים ונגישים דרך דף התצורה בלוח הבקרה.

## אירועים מובנים

| אירוע             | מתי                                 | מטען                          |
| ----------------- | ----------------------------------- | ----------------------------- |
| `onRequest`       | לפני מטפל הצ'אט                     | הקשר הבקשה                    |
| `onResponse`      | לאחר מטפל הצ'אט                     | נתוני התגובה                  |
| `onError`         | כאשר מתרחשת שגיאה במטפל             | אובייקט השגיאה                |
| `onModelSelect`   | כאשר נבחר מודל לניתוב               | פרטי המודל                    |
| `onComboResolve`  | כאשר ניתוב משולב נפתר               | יעדי השילוב                   |
| `onRateLimit`     | כאשר מגיעים למגבלת הקצב             | פרטי המגבלה                   |
| `onQuotaExhaust`  | כאשר המכסה מוצתה                    | פרטי המכסה                    |
| `onProviderError` | כאשר הספק מחזיר שגיאה               | פרטי השגיאה                   |
| `onStreamStart`   | כאשר מתחיל זרם SSE                  | פרטי הזרם                     |
| `onStreamEnd`     | כאשר זרם SSE מסתיים                 | סטטיסטיקות הזרם               |
| `onInstall`       | כאשר התוסף מותקן                    | `{ name, version, manifest }` |
| `onActivate`      | כאשר התוסף מופעל                    | `{ name, version, manifest }` |
| `onDeactivate`    | כאשר התוסף מושבת                    | `{ name, version, manifest }` |
| `onUninstall`     | כאשר התוסף מוסר (לפני מחיקת הקבצים) | `{ name, version, manifest }` |

## דוגמאות

### בקש לוגר

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### מגביל שיעור

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.apiKeyInfo?.id || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 minute
    const maxRequests = 100;

    const timestamps = (requests.get(key) || []).filter((t) => t > now - window);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return blockRequest({ error: "Rate limit exceeded", status: 429 });
    }
  },
});
```

### שנאי תגובה

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "response-transformer",
  onResponse: async (ctx, response) => {
    if (response.choices) {
      response.choices = response.choices.map((c: any) => ({
        ...c,
        message: { ...c.message, content: c.message.content.trim() },
      }));
    }
    return response;
  },
});
```
