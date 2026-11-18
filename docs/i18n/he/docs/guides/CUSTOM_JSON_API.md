# Custom JSON API provider nodes (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

צומת JSON API מותאם אישית מחבר נקודת קצה עסקית JSON שאינה מדברת בפרוטוקול OpenAI או Anthropic. OmniRoute ממלא תבנית בקשה של JSON, שולח אותה לנקודת הקצה המלאה URL, קורא את התשובה מנתיב תגובה ומחזיר אותה ללקוח בפורמט של הלקוח עצמו (השלמות צ'אט, תגובות, הודעות,...).

זהו צומת תואם OpenAI עם `apiType: "custom-json"`; המזהה שלו הוא בצורת `openai-compatible-custom-json-<suffix>`. טופס לוח המחוונים אינו זמין עדיין. צור וערוך את הצמתים האלה דרך ה-provider-node API למטה.

## צור צומת

`POST /api/provider-nodes` (אישור ניהול):

```json
{
  "type": "openai-compatible",
  "apiType": "custom-json",
  "name": "Business API",
  "prefix": "biz",
  "baseUrl": "https://api.example.com/v1/answer",
  "customHeaders": { "X-Tenant": "demo" },
  "customJson": {
    "method": "POST",
    "authType": "api-key",
    "authHeader": "X-Service-Key",
    "requestTemplate": {
      "project_id": "demo-project",
      "question": "{{prompt}}",
      "history": "{{messages}}"
    },
    "responsePath": "data.answer"
  }
}
```

- `baseUrl` הוא ה** לְהַשְׁלִים** נקודת קצה URL. שום דבר לא מצורף (ללא `/chat/completions`, ללא `/models`) ובניגוד לצמתים אחרים התואמים OpenAI, אין URL ברירת מחדל. זה חייב להיות `http(s)`, ללא אישורים משובצים או `#fragment`, והוא עובר את אותו URL guard יוצא כמו כל צומת ספק, גם כאשר הצומת נשמר וגם בכל בקשה.
- צומת ששולח את מפתח החיבור (`authType` `bearer` או `api-key`, כולל ברירת המחדל) חייב להשתמש `https://`. `http://` רגיל מתקבל רק עבור מארח loopback (`localhost`, `127.0.0.0/8`, `::1`) או עם `authType: "none"`, שאינו שולח מפתח. כתובות LAN פרטיות (`10.x`, `172.16-31.x`, `192.168.x`) אינן פטורות: כל אחד ברשת זו יכול לקרוא את המפתח. שמירת צומת כזה נכשלת עם `400`, וצומת שנשמר קודם לכן נכשל סגור בכל בקשה עם אותה הודעה, לפני שליחת בקשה כלשהי. עבור נקודת קצה עם מפתח ב- LAN, הצב אותה מאחורי TLS (לדוגמה פרוקסי הפוך).
- `customJson` מאומת עם Zod; מפתחות לא ידועים נדחים. כל שדה הוא אופציונלי:

| שָׂדֶה            | ערכים                             | בְּרִירַת מֶחדָל                                       |
| ----------------- | --------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`            | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`       | `bearer`                                               |
| `authHeader`      | שם הכותרת בשימוש כאשר `api-key`   | `X-API-Key`                                            |
| `requestTemplate` | אובייקט JSON (≤ 64 KB, עומק ≤ 32) | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | נתיב שדה, או `$` לכל הגוף         | `choices[0].message.content`                           |

- הסוד נשאר במפתח API של החיבור, לעולם לא בתבנית. `bearer` שולח `Authorization: Bearer <key>`; `api-key` שולח `<authHeader>: <key>`. כותרת ההסמכה אינה יכולה להיות `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` או כותרת הופ אחר הופ. עם `none`, חיבורים לא צריכים מפתח.
- כותרות סטטיות נוספות משתמשות ב- `customHeaders` הרגיל של הצומת (אותה אימות כמו כל צומת תואם אחר; כותרות אימות אינן מותרות שם).

`PUT /api/provider-nodes/<id>` מקבל את אותו `customJson` ומשכתב `baseUrl` ואת התצורה בכל חיבור קיים של הצומת. השמטת `customJson` שומרת את התצורה המאוחסנת; החלפת `apiType` ל- `chat` או `responses` מסירה אותו מהצומת ומהחיבורים שלו.

לאחר מכן הוסף חיבור לצומת כרגיל (`POST /api/providers` עם ה-node id) ובקש `<prefix>/<model>`, למשל `biz/assistant-v1`. נקודת הקצה לא חושפת רשימת דגמים, אז הוסף את מזהי המודל ביד.

## בקש תבניות

התבניות הן JSON רגילות. ערך מחרוזת עשוי להכיל סמני `{{placeholder}}` ; שום דבר לא מוערך או מבוצע, ומפתחות אובייקט לעולם אינם מוחלפים.

| מציין מקום           | עֵרֶך                                                           |
| -------------------- | --------------------------------------------------------------- |
| `{{prompt}}`         | טקסט של הודעת המשתמש האחרונה (חלקי טקסט שהצטרפו עם שורות חדשות) |
| `{{messages}}`       | השיחה בפורמט צ'אט OpenAI                                        |
| `{{model}}`          | מזהה הדגם המבוקש, ללא קידומת הספק                               |
| `{{stream}}`         | תמיד `false` — נקודת הקצה עונה עם מסמך JSON אחד                 |
| `{{request.<path>}}` | שדה של הבקשה המתורגמת (פורמט צ'אט OpenAI ).                     |

- ערך שהוא בדיוק מציין מיקום אחד שומר על סוג JSON שלו (`"{{messages}}"` הופך למערך); מציין מיקום בתוך מחרוזת ארוכה יותר מוכנס כטקסט.
- מציין מיקום שלא פותר כלום, נכשל בבקשה עם HTTP 400 במקום לשלוח מטען לא שלם.
- נתיבים משתמשים בסימון נקודות ובאינדקסים מספריים (`data.items[0].text`). `__proto__`, `prototype` ו- `constructor` נדחים במפתחות ובנתיבים.

## תגובות

הערך ב- `responsePath` הופך לתשובת העוזר: מחרוזות עוברות, ערכי JSON אחרים מסודרים. שדה חסר או `null`, או גוף שאינו JSON, מחזיר HTTP 502. מצבי שגיאה במעלה הזרם עוברים. עבור לקוחות סטרימינג OmniRoute ממתין לתגובת JSON כולה ואז פולט אותה כנתח תוכן אחד פלוס נתח הסיום; זו לא הזרמת אסימונים. קריאות לכלים ושדות שימוש אינם ממופים.

## מעולם לא שוחק מחדש

לבקשה עסקית יכולות להיות תופעות לוואי גם כשהן נכשלות. לכן OmniRoute שולח את זה פעם אחת:

- ללא ניסיון חוזר של תחבורה וללא מעקב אחר הפניה מחדש;
- אין ניסיון חוזר בחיבור אחר (חשבון fallback) — הכשל מוחזר כפי שהוא והחיבור לא מתקרר;
- אין נפילה ליעד המשולב הבא, אפילו עבור תשובה ריקה או כושלת.

בקשות נפרדות של לקוח, ופאנלים היתוכים הקוראים במפורש לכמה מודלים, עדיין מפעילים את נקודת הקצה באופן עצמאי.

## בדיקת צומת

שמירת חיבור, החיבור** מִבְחָן** בדיקות תקינות הכפתורים והרקע לעולם אינן מתקשרות לנקודת הקצה: הן רק מאמתות את התצורה המאוחסנת ומדווחות על החיבור כלא ניתן לאימות.

`POST /api/provider-nodes/validate` עם `"apiType": "custom-json"` ושדות הצומת (`baseUrl`, `apiKey`, `customJson`, אופציונלי `customHeaders` ו- `modelId`) שולחים בדיוק בקשה אמיתית אחת, עם `ping` כטקסט המשתמש האחרון. זה עונה על `{ "valid": true }` או על המצב במעלה הזרם (לעולם לא הגוף במעלה הזרם).

## אִחסוּן

התצורה מאוחסנת ב- `provider_nodes.custom_json_config_json` (הגירה `240_provider_node_custom_json_config.sql`) ומועתקת ל- `providerSpecificData.customJson` של כל חיבור.

יישום: `open-sse/utils/customJson.ts` (תיקוף ותבנית), `open-sse/executors/customJson.ts` (executor), `open-sse/services/combo/noReplayLatch.ts` ו- `src/sse/handlers/chat/responsePolicies.ts` (ללא שידור חוזר).
