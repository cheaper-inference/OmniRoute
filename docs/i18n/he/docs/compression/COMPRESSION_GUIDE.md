# 🗜️ Prompt Compression Guide — OmniRoute (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> חסכו 15%-95% מההקשר המתאים באופן אוטומטי. לסקירה מהירה, ראו את [סעיף הדחיסה ב-README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## סקירה כללית

OmniRoute מממשת צינור מודולרי לדחיסת פרומפטים, שפועל **באופן יזום** לפני שהבקשות מגיעות לספקים במעלה הזרם. פירוש הדבר שהחיסכון בטוקנים מתרחש בשקיפות — ללא צורך בשינויים בתהליך העבודה שלכם.

```
בקשת לקוח
  → בורר אסטרטגיית דחיסה
    → יש דריסה של שילוב? → שימוש בהגדרת השילוב
    → סף הפעלה אוטומטית? → שימוש במצב אוטומטי
    → מצב ברירת מחדל? → שימוש בהגדרה הגלובלית
    → כבוי? → דילוג על הדחיסה
  → מצב הדחיסה שנבחר
    → כבוי: ללא דחיסה
    → קל: ניקוי בטוח של רווחים/עיצוב (~15%)
    → רגיל: הסרת מילות מילוי בסגנון דיבור טלגרפי (~30%)
    → אגרסיבי: יישון היסטוריה + סיכום (~50%)
    → אולטרה: גיזום היוריסטי + דילול בלוקי קוד (~75%)
    → RTK: סינון פלט מסוף/כלים עם מודעות לפקודות (טווח של 60%-90% במעלה הזרם)
    → מוערם: צינור רב-מנועי מסודר, בדרך כלל RTK ואז Caveman (טווח של 78%-95% מהתוכן המתאים)
  → בקשה דחוסה → ספק
```

---

## מצבי דחיסה

### כבוי

לא מוחלת דחיסה. כל ההודעות עוברות ללא שינוי.

### מצב Lite (חיסכון של כ־15%, זמן השהיה של פחות מ־1ms)

המצב הבטוח ביותר — ניקוי עיצוב. קיטוע תוצאות הכלים במצב זה מאבד מידע, לכן נתיב ברירת המחדל
(ללא `allow-lossy`, `engine:lite` או הרשאה מפורשת לשילוב בעל שם) מפעיל את Lite עם
`compressToolResults: false`: תוצאות כלים קודמות מגיעות לספק ללא שינוי.

| Technique                | Description                                                                   |
| ------------------------ | ----------------------------------------------------------------------------- |
| `collapseWhitespace`     | מיזוג שורות ריקות עוקבות ורווחים בסוף שורה                                    |
| `dedupSystemPrompt`      | הסרת הודעות מערכת כפולות                                                      |
| `compressToolResults`    | קיטוע תוצאות כלים קודמות עד למגבלת Lite (מאבד מידע: רק עם הרשאה מפורשת בבקשה) |
| `removeRedundantContent` | הסרת הוראות חוזרות                                                            |
| `replaceImageUrls`       | קיצור URI של נתוני תמונות מסוג base64                                         |

**מומלץ עבור:** שימוש מתמיד, תהליכי עבודה קריטיים לבטיחות.

### מצב Standard (חיסכון של כ־30%)

בהשראת [Caveman](https://github.com/JuliusBrussee/caveman) — מסיר מילות מילוי וניסוחים ארוכים תוך שמירה על המשמעות:

- הסרת מילות מילוי ("please", "I think", "basically", "actually")
- קיצור ביטויים ארוכים ("in order to" → "to", "as a result of" → "because")
- הסרת הסתייגויות מנומסות ("Would you mind...", "If you could possibly...")
- יותר מ־30 כללי regex המותאמים לבקשות תכנות

**מומלץ עבור:** תהליכי עבודה יומיומיים של תכנות, צוותים מודעי עלויות.

### מצב Aggressive (חיסכון של כ־50%)

ניהול חכם של ההיסטוריה עבור הפעלות ארוכות:

- **יישון הודעות** — הודעות ישנות עוברות דחיסה הדרגתית
- **דחיסת תוצאות כלים** — פלטים ארוכים עוברים קיטוע או השמטה (שורות ראשונות/אחרונות,
  סינון לפי שורות תואמות, כיווץ מפתחות JSON)
- **הגנות על שלמות מבנית** — מבטיחות שזוגות `tool_use` + `tool_result` יישארו עקביים
- **מודעות לחלון ההקשר** — מתחשבת במגבלות האסימונים של כל מודל

**מומלץ עבור:** הפעלות ניפוי באגים ממושכות, בסיסי קוד גדולים.

### מצב Ultra (חיסכון של כ־75%)

דחיסה מרבית לתרחישים שבהם האסימונים קריטיים:

- **גיזום היוריסטי** — גיזום אסימונים מבוסס־ניקוד של פרוזה
- **שימור מבנה** — בלוקי קוד מגודרים, קוד מוטבע, כתובות URL ומזהים מסומנים ומשוחזרים
  ללא שינוי, ולעולם אינם נגזמים
- **שכבת SLM אופציונלית** — מודל מקומי קטן יכול לשפר את הגיזום כאשר הוא מוגדר
- בלתי תלוי במצב Aggressive: הוא אינו מפעיל יישון הודעות, דחיסת תוצאות כלים
  או מסכם חלופי (רק כשל בשכבת SLM יכול לנתב מעבר חלופי דרך Aggressive)

**מומלץ עבור:** מצבים שבהם נתקלים שוב ושוב במגבלות הקשר.

### מצב RTK (טווח upstream של 60–90%)

מצב RTK מותאם לפלטים מילוליים של כלים המופיעים בהפעלות של סוכני תכנות:

- מזהה מחלקות של פקודות/פלט כגון `git status`, `git diff`, `git log`, מריצי בדיקות,
  בניות של TypeScript/Vite/Webpack, ‏ESLint/Biome/Prettier, ביקורות והתקנות של npm, יומני Docker, פלט תשתיות
  ופלט shell כללי
- מחיל חבילות סינון JSON מתוך `open-sse/services/compression/engines/rtk/filters/`
- מייבא מסנני סכימת TOML v1 של RTK מקובצי `filters.toml` של הפרויקט או הגלובליים, עם אימות
  בדיקות מוטבעות ובקרת אמון לקובצי פרויקט
- כולל 56 מסננים מובנים עם דוגמאות אימות מוטבעות
- מסיר רצפי בקרה של ANSI, פסי התקדמות, שורות חוזרות ורעשים שאינם ניתנים לפעולה
- משמר כשלים, שגיאות, אזהרות, קבצים שהשתנו, סיכומים ואת סוף הפלטים הארוכים
- תומך במסנני פרויקט הכפופים לבקרת אמון, במסננים גלובליים ובשחזור אופציונלי של פלט גולמי מושחר

**מומלץ עבור:** הפעלות של סוכנים הכוללות shell, build, test, git, grep ותמלילי פלט של קבצים.

### מצב Stacked (טווח רלוונטי של 78–95%)

מצב Stacked מפעיל מספר מנועי דחיסה בסדר דטרמיניסטי. צינור ברירת המחדל הוא:

```txt
RTK -> Caveman
```

סדר זה שומר תחילה על פלט מסוף/כלים קומפקטי, ולאחר מכן מחיל כיווץ סמנטי בסגנון Caveman על
הפרומפט בשפה טבעית שנותר. ניתן להגדיר צינורות Stacked באופן גלובלי או באמצעות שילובי דחיסה
המוקצים לשילובי ניתוב.

**מומלץ עבור:** הקשר מעורב הכולל יומני כלים גדולים לצד הוראות אנושיות או סיכומי עוזר.

## חישוב החיסכון ממקורות במעלה הזרם

OmniRoute מתעד את החיסכון באמצעות דחיסה משני מקורות: מדדי ביצועים של פרויקטים במעלה הזרם והרכב המנועים של
OmniRoute עצמו.

| מקור    | הנתון מה-README במעלה הזרם שבו נעשה שימוש כאן                                                                       |
| ------- | ------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` פחות טוקני פלט, חיסכון ממוצע של `65%` בפלט במדדי ביצועים, טווח של `22-87%`, וכלי לדחיסת קלט בשיעור של `~46%` |
| RTK     | חיסכון של `60-90%` בפלט פקודות; הפעלה לדוגמה של `~118,000 -> ~23,900` טוקנים, או חיסכון של `79.7%` (`~80%`)         |

עבור מטענים חופפים של כלים/הקשר, שילוב ברירת המחדל של OmniRoute מערים את המנועים:

```txt
RTK -> Caveman
```

החיסכון המשולב הוא כופלי, לא חיבורי:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

הנתון `78-95%` חל כאשר גם RTK וגם Caveman יכולים לצמצם את אותו מטען קלט/הקשר.
מצב פלט התשובה של Caveman הוא נפרד: כאשר הוא מופעל, יש להשתמש בחיסכון הפלט של Caveman עצמו (`65%`
בממוצע, נתון מוביל של `~75%`, טווח של `22-87%`). החיסכון הכולל בחיוב תלוי בתמהיל הפרומפטים/הפלט שלכם.

### מה המשמעות בפועל של "כשיר"

הטווח המוביל של 15-95% הוא אמיתי, אך הוא חל רק על תוכן **מיותר או מילולי מדי** — שורות
שגיאה חוזרות, יומן בנייה שמציף שוב ושוב את אותה אזהרה, פלט גדול מדי של `grep`/קריאת קובץ. אין
פירוש הדבר שכל בקשה תחסוך בשיעור כזה.

אומת באופן אמפירי (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): הפעלת
`stacked` (RTK + Caveman) על בלוק `tool_result` במבנה של Anthropic, המכיל 300 שורות
שגיאה זהות, הניבה **חיסכון של 95.93% בטוקנים / חיסכון של 96.26% בתווים** — בדיוק בתוך הטווח
המפורסם. אולם הפעלת אותו צינור עיבוד על פלט כלי רגיל שאינו מיותר (רשימת התאמות נקייה של `grep`,
קריאת קובץ קצרה, טקסט שיחה רגיל) מניבה, כצפוי, **חיסכון הקרוב לאפס**, מכיוון
שאין תוכן חוזר להסרה ו-`validateCompression()` (`validation.ts`) מסרבת לשלוח
שכתוב שעלול להסיר או לשנות בלוקי קוד, כתובות URL, כותרות, גרסאות או מזהי קבועים באותיות רישיות בלבד.

זוהי התנהגות צפויה ובטוחה, ולא באג: סשן תכנות שבעיקר קורא קבצים נקיים או מחפש בהם באמצעות grep
יציג חיסכון כולל מתון גם כשהדחיסה מופעלת במלואה, בעוד שסשן שנתקל בלולאה כושלת
או ב-linter פטפטן יציג את מלוא הטווח של 78-95% עבור תעבורה זו. אל תשתמשו באחוז
חיסכון מצטבר נמוך של סשן יחיד כהוכחה לכך שהדחיסה מוגדרת באופן שגוי — בדקו תחילה אם
פלט הכלי הבסיסי אכן היה מיותר.

---

## המחשה חזותית של החיסכון בטוקנים

```
ללא דחיסה:          47K טוקנים נשלחו ל-LLM
עם Lite:            40K טוקנים נשלחו          (חיסכון של 15% — בטוח, מופעל תמיד)
עם Standard:        33K טוקנים נשלחו          (חיסכון של 30% — כללי דיבור בסגנון Caveman)
עם Aggressive:      24K טוקנים נשלחו          (חיסכון של 50% — התיישנות + סיכום)
עם Ultra:           12K טוקנים נשלחו          (חיסכון של 75% — גיזום היוריסטי)
עם RTK:             19K-5K טוקנים נשלחו       (חיסכון של 60-90% בפלט פקודות/כלים)
עם Stacked:         10K-2.5K טוקנים נשלחו     (טווח כשיר של 78-95% עבור RTK+Caveman)
```

---

## תצורה

### לוח המחוונים

נווט אל `Dashboard → Context & Cache`:

- **Caveman** — בחירת מצב, חבילות שפה, תצוגה מקדימה וברירות מחדל כלליות
- **RTK** — תצוגה מקדימה של סינון פקודות, הגדרות בטיחות של RTK וקטלוג מסננים
- **Compression Combos** — צינורות מנועים בעלי שמות, המוקצים לצירופי ניתוב
- **Auto-Trigger Threshold** — הפעלה אוטומטית של דחיסה כאשר ספירת האסימונים חורגת מהסף

### עקיפה לכל צירוף

ב־`Dashboard → Context & Cache → Compression Combos`, הקצה צירוף דחיסה לצירוף
ניתוב:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

כך ניתן להשתמש בדחיסה מוערמת אצל ספקים חינמיים/למשימות קוד, תוך שמירה על מצב lite במינויים
בתשלום.

הקצאת **Per-Combo Override** הזו היא אמצעי בקרה שונה מעקיפת **מצב הדחיסה של צירוף
הניתוב** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — הסכמה של השדה מקבלת
גם `rtk`, `stacked` ו־`omniglyph`) — עקיפה זו אינה בוחרת צינור בעל שם של צירוף דחיסה; היא רק
מגדירה את השדה `compressionMode`, שבו מתבצעת התייעצות באמצעות
`resolveCompressionPlan`. ניתן להגדיר אותה בכרטיס הצירוף (`Dashboard → Combos`) או, החל מ־
#6760, לכל צירוף ניתוב ברשימה "Assign to routing" שב־
`Dashboard → Context & Cache → Compression Combos`, ממש לצד תיבת הסימון להקצאת הצינור
שתועדה לעיל. שני הממשקים נשמרים דרך אותה נקודת קצה `PUT /api/combos/{id}`.

### עקיפה לכל בקשה

שלח את כותרת הבקשה `x-omniroute-compression` כדי לעקוף את תוכנית הדחיסה עבור בקשה יחידה.
לעקיפה זו העדיפות הגבוהה ביותר — היא גוברת על עקיפת צירוף הניתוב, הפרופיל הפעיל,
ההפעלה האוטומטית וברירת המחדל של החלונית. ערכים לא מוכרים מתעלמים (הבקשה לעולם אינה נדחית),
ומתג ההפעלה הראשי הגלובלי עדיין שולט בכול: כאשר הדחיסה כבויה גלובלית, הכותרת אינה יכולה
להפעיל אותה. הערכים:

| Value         | Effect                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------ |
| `off`         | ללא דחיסה עבור בקשה זו.                                                                    |
| `default`     | פרופיל ברירת המחדל הנגזר מהחלונית (מתעלם מהפרופיל הפעיל). מנועים מאבדי מידע נשארים כבויים. |
| `safe`        | זהה להשמטת הכותרת.                                                                         |
| `allow-lossy` | שמירת תוכנית האופרטור של בקשה זו, כולל סיכומים, מסנני רלוונטיות ושכתוב סגנון.              |
| `engine:<id>` | מנוע יחיד כאשר הוא מופעל, לדוגמה `engine:rtk`. זוהי הסכמה מפורשת לכל בקשה עבור אותו מנוע.  |
| `<combo>`     | צירוף בעל שם, המותאם תחילה לפי השם (ללא תלות ברישיות), ולאחר מכן לפי המזהה.                |

ללא `allow-lossy`, `engine:<id>` או צירוף בעל שם, מנועים מאבדי מידע אינם מוחלים. כאשר ברירת
מחדל, הפעלה אוטומטית או עקיפת ניתוב מאבדות מידע ומונמכות, OmniRoute שומר על שלבי הדחיסה
ללא אובדן שזוהו מתוך הצינור המוערם שהוגדר, לפי הסדר שהוגדר. הוא חוזר אל
`session-dedup → lite` רק כאשר לא נותר אף שלב מוגדר ללא אובדן.

התצוגה המקדימה **Effective pipeline** בחלונית ההגדרות מציגה את התוכנית הרגילה במצב מנוחה.
כאשר ניתן להפעיל הפעלה אוטומטית, אותה תצוגה מקדימה מציגה גם את צינור העיבוד האפקטיבי
המותנה שלה, כך שהחלונית והרזולוציה בזמן ריצה ללא כותרת יישארו מסונכרנות.

התוכנית שהוחלה מוחזרת בכותרת התגובה
`X-OmniRoute-Compression: <mode>; source=<source>`, כאשר `<source>` הוא אחד מבין
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` או `off`.

### API

```bash
# קבלת הגדרות דחיסה
curl http://localhost:20128/api/settings/compression

# עדכון הגדרות דחיסה
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# תצוגה מקדימה של מטען RTK/stacked מסוים
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# הצגת חבילות מסנני RTK
curl http://localhost:20128/api/context/rtk/filters

# בדיקת RTK ישירות עם מטא־נתונים אופציונליים של פקודה
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## מה מוגן

מנוע הדחיסה **תמיד משמר:**

- ✅ בלוקי קוד (מגודרים ובתוך השורה)
- ✅ כתובות URL ונתיבי קבצים
- ✅ מבני JSON ונתונים מובְנים
- ✅ מזהים ואסימונים טכניים מוגנים
- ✅ ביטויים מתמטיים
- ✅ הגדרות של קריאות לכלים/פונקציות
- ✅ הנחיות מערכת (במצב Lite)

שחזור הפלט הגולמי של RTK משחיר מפתחות API נפוצים, אסימוני bearer, אסימוני Slack, מפתחות גישה של AWS,
סיסמאות, אסימונים וסודות לפני שמשהו נשמר.

---

## סטטיסטיקות דחיסה

כל בקשה דחוסה כוללת נתונים סטטיסטיים ביומני השרת:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## מפת הדרכים לפי שלבים

| שלב    | מצבים                                                                                                                            | סטטוס   |
| ------ | -------------------------------------------------------------------------------------------------------------------------------- | ------- |
| שלב 1  | Off, Lite                                                                                                                        | ✅ הושק |
| שלב 2  | Standard, Aggressive, Ultra                                                                                                      | ✅ הושק |
| שלב 3  | RTK, Stacked, Compression Combos                                                                                                 | ✅ הושק |
| שלב 4  | Output Styles, SLM-tier Ultra, ערכת הערכה                                                                                        | ✅ הושק |
| שלב 4C | תקציב הקשר אדפטיבי ("חוגה") — מנוע חישוב + API (`contextBudget` ב-`PUT /api/settings/compression`) + פקדי מצב/מדיניות בלוח הבקרה | ✅ הושק |

---

## תודות

כללי הדחיסה של מצב Standard נוצרו בהשראת **[Caveman](https://github.com/JuliusBrussee/caveman)** מאת **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — הפרויקט הוויראלי "למה להשתמש בהרבה אסימונים כשמעט אסימונים עושים את העבודה". Caveman מדווח על `~75%` פחות אסימוני פלט, חיסכון ממוצע של `65%` בפלט במדדי ביצועים, טווח חיסכון בפלט של `22-87%` וכלי לדחיסת קלט בהיקף של `~46%`.

מצב RTK נוצר בהשראת **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** מאת **[RTK AI](https://github.com/rtk-ai)** — פרויקט עתיר ביצועים לדחיסת פלט פקודות עבור מסוף, בנייה, בדיקות, git וסינון פלט של כלים. RTK מדווח על חיסכון של `60-90%`, כאשר הפעלת הדוגמה ב-README שלו מציגה חיסכון של `~80%`.

---

## מערכות דחיסה מתקדמות

מעבר ל-7 המצבים שתוארו לעיל (המקור מקבל גם מצבי `codex-responses` ו- `omniglyph`, שמדריך זה אינו מכסה), הסעיפים שלהלן מכסים תכונות שפועלות בתוך או לצד אותם מצבים: דחיסה של תוצאת הכלים והזדקנות מתקדמת הם שלבים 1 ו-2 של המנוע האגרסיבי (מצב אגרסיבי ושלב `aggressive` של מצב צינור מוערם), ה-Stacked-Pippeline הוא ה-Stacked-Pippeline. `aggressive` ו- `ultra` ל- `standard` עבור ספקי שמירה במטמון בזמן שהדחיסה מופעלת, וסגנונות פלט Caveman וסגנונות פלט הם הוראות ניתנות למערכת, כבויות כברירת מחדל, שמעצבות את הפלט של הדגם במקום לדחוס את הבקשה.

### דחיסה מודעת למטמון

ספקים מסוימים (כמו Anthropic עם אחסון מהיר במטמון) תומכים** שמירה מהירה במטמון** , המאפשר להם לשמור חלקים מההנחיה במטמון כדי להפחית עלויות והשהייה. כאשר אחסון במטמון מופעל, דחיסה אגרסיבית יכולה למעשה** פְּגִיעָה** ביצועים מכיוון שהוא משנה את האסימונים המאוחסנים במטמון, ומבטל את תוקף המטמון.

מודול `cachingAware.ts` פותר את זה על ידי** זיהוי הקשר מטמון** ו** התאמת אסטרטגיית הדחיסה** לְפִיכָך.

#### איך זה עובד

1. **זיהוי הקשר מטמון** — סורק את גוף הבקשה עבור סמני `cache_control`
2. **זהה ספקי מטמון** — בודק אם ספק היעד תומך במטמון
3. **התאם אסטרטגיה** — משדרג לאחור `aggressive`/`ultra` ל- `standard` עבור ספקי שמירה במטמון
4. **דלג על הודעת המערכת** הנחיות מערכת — נשמרות בדרך כלל במטמון, אז אל תדחס אותן

עוזר האסטרטגיה גם מחזיר דגל `deterministicOnly`, אבל בונה התוכנית צורך רק את האסטרטגיה — שום דבר במורד הזרם לא קורא את הדגל היום.

#### דוגמה לקוד

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### מתי להשתמש

דחיסה מודעת למטמון היא** תמיד פועל** — אין צורך בתצורה. זה נכנס לפעולה בכל פעם שדחיסה מופעלת וספק היעד תומך במטמון מהיר (Anthropic, OpenAI וכו'); סמני `cache_control` מפורשים אינם נדרשים. — מטמון לבדו מפעיל את השדרוג לאחור, וסמנים לבד לעולם אינם עושים זאת (זיהוי סמן מזין טלמטריה של מטמון, לא החלטת האסטרטגיה).

OpenRouter נחשב כספק מטמון רק עבור דגמי `anthropic/*` : בקשות קוד Claude שומרות על נקודות השבירה `cache_control` שלהן (4 לכל היותר) והשומר מגן על הקידומת, בעוד שכל משפחת OpenRouter אחרת (`openai/`, `google/`, `qwen/`, ...) נשארת מופשטת וללא שמירה.

### הזדקנות מתקדמת

שיחות ארוכות צוברות תפניות רבות של מסרים, אך פניות ישנות הופכות לפחות רלוונטיות. `progressiveAging.ts`** משפיל הודעות לפי מרחק פנייה** (מרחק נמדד מסוף השיחה). עם ברירות המחדל הנשלחות (`verbatim: 2, light: 2, moderate: 3`):

- **2 פניות אחרונות (מרחק ≤ 2)** : נשמר מילה במילה
- **מרחק 3** : דחיסה של איש מערות (הסרת מילוי)
- **מרחק 4 +** : הודעות עוזר מסוכמות; הודעות משתמש מופחתות לשורה הראשונה שלהן, מוגבלת ל-120 תווים; תפקידים אחרים ללא פגע. הנחיות מערכת, הודעות שכבר ישנו והודעת המשתמש העדכנית נשמרות תמיד מילה במילה ללא קשר למרחק. שום דבר לא נשמט לחלוטין, ולא ניתן להגיע לרצועת `light` עם ברירות המחדל שנשלחו (`light` שווה `verbatim`).

#### דוגמה לקוד

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### מתי להשתמש

הזדקנות מתקדמת היא** תמיד פועל** עבור `aggressive` mode — זה שלב 2 של `compressAggressive()`. מצב אולטרה לא מפעיל אותו. זה יעיל במיוחד עבור:

- הפעלות קידוד ארוכות טווח
- שיחות מרובות ימים
- זרימות עבודה סוכניות עם שיחות כלים רבות

### מצב פלט איש מערות

Caveman output mode adds **system prompt instructions** that ask the model itself for terse output — the `lite` level asks for concise answers that keep full sentences, `full` asks it to "respond terse like smart caveman", and `ultra` asks for telegraphic output; instructions only ask, they cannot guarantee it. Requests receive them through `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` first resolves the selection with the back-compat shim (`resolveOutputStyleSelection()` in `open-sse/services/compression/outputStyles/backCompat.ts`), which, while `outputStyles` is empty, maps an enabled `cavemanOutputMode` to the `terse-prose` output style at `cavemanOutputMode.intensity` (see Back-compat below); a non-empty `outputStyles` selection is used as is, and `cavemanOutputMode.enabled` and `intensity` then have no effect, while its `autoClarity` toggle still applies. `outputMode.ts` holds the instruction texts (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), the content bypass and the placement helper that injection uses; its own `applyCavemanOutputMode()` injector has no production caller.

#### איך זה עובד

מצב זה אינו דוחס את הקלט. הוא מוסיף בלוק הוראות להנחיית המערכת (ראה כיצד פועלת ההזרקה להלן), וכל מצב דחיסת קלט שנבחר לבקשה עדיין פועל לאחר מכן, על הגוף שנושא כעת את הבלוק. לפני סעיף הגבולות המשותפים שכל רמה מסתיימת בו, רמת `full` האנגלית אומרת:

> "תגיב בקצרה כמו איש מערות חכם. זרוק מאמרים (a/an/the), מילוי (just/really/basically/actually/simply), נעימות, גידור. שברים OK. מילים נרדפות קצרות (גדול לא נרחב, תקן לא ליישם). שמור על כל החומר הטכני, הקוד, השגיאות, URLs, המזהים מדויקים."

זה עובד טוב במיוחד עבור:

- יצירת קוד (טרסר פלט = פחות אסימונים)
- שאלות ותשובות מהירות (אין צורך בהסברים מורחבים)
- עיבוד אצווה (מקסם את התפוקה)

#### מתי להשתמש

מצב פלט איש מערות הוא** הצטרפות** . עם דחיסה מופעלת (`enabled: true`, החלפת מאסטר בדף הגדרות דחיסה), הפעל אותו עם `cavemanOutputMode.enabled`; `intensity` בוחר את `lite`, `full` או `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

שילוב של דחיסה** מצב פלט** toggle (`outputMode`, level in `outputModeIntensity`) מגדיר את אותו מתג עבור הבקשות שהקומבו חל עליהן, והכלי `omniroute_set_compression_engine` MCP כותב את זה דרך הארגומנט ה-boolean `outputMode` שלו. בחירת `outputStyles` לא ריקה עדיפה על המתג הזה. בלוח המחוונים, הפעלת ה** פרוזה טרסה** סגנון פלט מזריק את אותו בלוק (ראה סגנונות פלט להלן).

### סגנונות פלט (קטלוג)

מצב הפלט של איש המערות למעלה הוא** נתיב מדור קודם בסגנון יחיד** . שלב 4 הכליל אותו לקטלוג של סגנונות פלט הניתנים להרכבה: `OUTPUT_STYLE_CATALOG` ב- `open-sse/services/compression/outputStyles/catalog.ts`. כל סגנון הוא הוראה המבקשת מהדגם עצמו פלט זול יותר; ניתן להפעיל סגנונות יחד ומוזרקים בסדר קטלוגי.

| סִגְנוֹן                    | `id`            | מה זה עושה                                                                                                                                                                                                | שפות הדרכה                                    |
| --------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| פרוזה טרסה                  | `terse-prose`   | זרוק filler/articles/hedging; לשמור על חומר טכני מדויק. אותו טקסט כמו מצב הפלט של איש המערות מדור קודם (מוזכר, לא הוקלד מחדש).                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| פחות קוד                    | `less-code`     | סולם YAGNI : שינוי העבודה הקטן ביותר, ללא הפשטות לא רצויות.                                                                                                                                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| קוקו (מפתח בכיר עצלן)       | `ponytail`      | "הקוד הטוב ביותר הוא הקוד שמעולם לא נכתב": שימוש חוזר בשכתוב >, סימפטום שורש >, הפרש העבודה הקצר ביותר.                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| יש לי ADHD (פעולה ראשונה)   | `i-have-adhd`   | פעולה תחילה (command/path/snippet לפני פרוזה), מדרגות מוגבלות ממוספרות, צעד בטון ONE הבא, אין preamble/recap/closers. מותאם [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| מסנן UI נגד סלופ            | `antislop-ui`   | כל טכניקה ויזואלית חייבת לעבור מבחן מטרה (היררכיה, זהות, קריאה); ללא gradients/glass/glow ברירת מחדל, פלטת גג, ללא פריסות תבניות. שני סגנונות האנטי-סלופ מוסיפים גבול ללא-מתים-בקרות / ללא-תביעות-תביעות. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| עותק אנטי סלופ ופילטר אנושי | `antislop-copy` | עותק ספציפי (ללא מקף em, CTAs גנרי, buzzwords, סגירת צ'אטבוטים, עובדות מומצאות) בתוספת כללי אנשים: ניגודיות WCAG AA, מיקוד גלוי, טווח הגעה למקלדת, מצבי empty/loading/error, זרימה חוזרת לנייד.           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)            | `terse-cjk`     | תשובה `full`/`ultra` בסינית קלאסית (文言); `lite` מבקש רק תשובות קצרות ללא מילות פונקציה, נעימות או קישוטים.                                                                                              | zh (מגודר מקומי, ראה להלן)                    |

כל סגנון שולח שלוש רמות עוצמה — `lite`, `full`, `ultra` — וכל רמה מסתיימת בסעיף הגבולות המשותפים (`SHARED_BOUNDARIES` in `outputMode.ts`), ששומר על בלוקי קוד, נתיבי קבצים, פקודות, שגיאות ו- URLs מדויקים. הטקסטים ברמת `terse-prose` ו- `terse-cjk` מוסיפים מזהים לרשימה זו.

`terse-cjk` מגודר ל- `zh` בשני מקומות. הדף הגדרות דחיסה מפרט את השורה שלו רק כאשר שפת UI של לוח המחוונים היא סינית (`zh-CN` או `zh-TW`), ו- `applyOutputStyles()` מזרימה אותה רק כאשר השפה שנפתרה של הבקשה (ראה בחירת שפה להלן) היא `zh`. הסתרת השורה לא מנקה בחירת `terse-cjk` שנשמרה: ההגדרות API מקבלות כל מזהה סגנון, ושמירת סגנונות אחרים בעמוד שומרת אותו. בזמן בקשה, בדיקת השפה `applyOutputStyles()` היא שער המקום היחיד.

#### כיצד פועלת ההזרקה

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) פותרת את הבחירה מול הקטלוג (מזהים לא ידועים וסגנונות לא תואמים לאזור נשמטים, אף פעם לא שגיאה; בחירה שפותרת ללא סגנון משאירה את הגוף ללא שינוי, מדלגת כ- `no_styles`), משרשרת את ההוראות שנבחרו בסדר הקטלוגי, מצרף את פסקת הגבולות** פַּעַם** (בתוספת סעיף הבטיחות, `SAFETY_BOUNDARIES` או התרגום שלו, כאשר `less-code` או `ponytail` נבחרים), ומתחיל את הבלוק עם סמן אימפוטנציה בודד (`[OmniRoute Output Styles]`), כך שהחלה מחדש היא לא-אופ. כאשר לשפה שנפתרה (ראה בחירת שפה למטה) יש תרגום, ההוראה המקומית מוזרקת במקום אנגלית.

On a body with a non-empty `messages` array, the idempotency check runs before the content bypass: when the `[OmniRoute Output Styles]` marker is already in the top-level `system` field (a string or a content-block array) or in a system message with string content, the body is left unchanged as `already_applied` and no keyword check runs. Otherwise a content bypass (`shouldBypassCavemanOutputMode()` in `open-sse/services/compression/outputMode.ts`) checks the text of the last three messages, whatever their role, and skips the styles for the whole turn when that text matches its security, irreversible-action or clarification keywords, or an order-sensitive sequence: `first`, `then`, `after that`, `before`, `rollback` or `backup` followed within 240 characters by `delete`, `drop`, `migrate`, `deploy` or `release`. The bypass runs while the **Auto-Clarity Bypass** toggle (`cavemanOutputMode.autoClarity`, on by default) is on; turning the toggle off skips the keyword check.

כאשר המעקף נותן לפנייה לעבור, `placeSystemInstruction()` (אותו קובץ), שלעולם לא יוצר `messages[0]` חדש, ממקם את הבלוק בראשון שבהם הוא מוצא:

1. הודעת מערכת מובילה עם תוכן מחרוזת: הבלוק מצורף אחרי הטקסט שלו.
2. שדה `system` ברמה העליונה: הבלוק מצורף אחרי הטקסט של מחרוזת, או מתווסף כגוש טקסט חדש למערך בלוק תוכן.
3. הודעת המערכת הראשונה מאוחרת יותר עם תוכן מחרוזת: הבלוק מצורף אחרי הטקסט שלו.
4. אף אחד מהאמור לעיל: הבלוק נכנס להודעת מערכת חדשה בסוף `messages`.

בגוף ללא מערך `messages` (או עם מערך ריק), לא פועל מעקף תוכן ולא מתייעצים עם שדה `system` ברמה העליונה. הבלוק מצורף אחרי הטקסט של שדה `instructions` מחרוזת, אלא אם השדה הזה כבר מכיל את הסמן `[OmniRoute Output Styles]`, ובמקרה זה הגוף נשאר ללא שינוי כ- `already_applied`. כאשר לגוף אין שדה `instructions` של מחרוזת אבל נושא `input` (מחרוזת או מערך), הבלוק הופך ל- `instructions`, ומחליף כל ערך שאינו מחרוזת שהשדה החזיק בו. גוף ללא שדה `instructions` של מחרוזת ולא מחרוזת או מערך `input` נותר ללא שינוי ומדלג כ- `no_messages`.

#### כיצד להפעיל

בלוח המחוונים:** דחיסה הקשר → הגדרות דחיסה** (`/dashboard/context/settings`), קטע סגנונות פלט: שורה אחת לכל סגנון עם מתג on/off ובורר רמות. סגנונות מזריקים בזמן שהדחיסה עצמה פועלת (החלפת מאסטר של הדף, `enabled`). ה** מעקף בהירות אוטומטית** מתג נמצא על** איש מערות** דף (`/dashboard/context/caveman`), בתוכו** מצב פלט** כַּרְטִיס. מבחינה תכנותית, תצורת הדחיסה ממשיכה את הבחירה כ:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: בעוד `outputStyles` ריק, הגדרת `cavemanOutputMode.enabled` מדור קודם ממפה ל- `terse-prose` ב- `cavemanOutputMode.intensity`. לאחר מכן הבלוק מתחיל עם הסמן `[OmniRoute Output Styles]`, כאשר מזרק `applyCavemanOutputMode()` מדור קודם כתב `[OmniRoute Caveman Output Mode]`. מתחת לסמן, הטקסט תואם את ההזרקה מדור קודם ב-en, pt-BR, es, de, fr, it, ru, id ו-vi; ב-ja ו-zh זה נושא רווח אחד נוסף לפני סעיף הגבולות. `terse-prose` מתורגם ל-pt-BR, es, de, fr, it, ru, zh, ja, id ו-vi, כך שבקשה שהשפה הפתורה שלה היא `hu` מקבלת את הטקסט האנגלי שבו המזרק מדור קודם השתמש בהונגרית.

בחירת שפה בסגנון פלט (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): כאשר `languageConfig.enabled` פועל, `autoDetect` דוגמת את הודעת המשתמש העדכנית ביותר במערך `messages` של הבקשה הכוללת טקסט (תוכן מחרוזת, או `text` של חלקי התוכן שלה) ומפעילה עליו את גלאי מנוע המערות (`detectCompressionLanguage()`). הגלאי מחזיר `zh` עבור טקסט עם תווי האן וללא קאנה; אחרת הוא מחזיר את מה מבין `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` ו- `id` שיש לו הכי הרבה רמזים, ו- `en` כאשר אף אחד לא תואם — טקסט שהוא לא יכול לסווג מקבל אנגלית, לעולם לא `defaultLanguage`, ו- `vi` לעולם לא מזוהה למרות שהטקסטים נשלחים `vi`. גוף Responses API שומר את התורות שלו ב- `input`, שאינו נדגם, אז הוא מקבל `defaultLanguage`, ולאחר מכן אנגלית. כאשר לאף הודעת משתמש ב- `messages` אין טקסט, או עם `autoDetect` כבוי, `defaultLanguage` חל, ולאחר מכן אנגלית. עם `languageConfig.enabled` כבוי, השפה היא — באנגלית אלא אם משולבת דחיסה חלה על הבקשה (משולבת שהוקצתה למשולבת הניתוב של הבקשה, או ששילוב ברירת המחדל של הדחיסה chatCore נופל בחזרה עבור הצינור המובנה המוערם): החלת משולבת מפעילה את `languageConfig.enabled` עבור הבקשה הזו ומגדירה `defaultLanguage` מה-pack את השפה שלו (scom't is it. מהחבילות של המשולבת, אחרת החבילה הראשונה של המשולבת, שברירת המחדל היא `en`), בעוד שה- `autoDetect` השמור (מופעל כברירת מחדל) עדיין תקף. מנוע הקלט של Caveman בוחר את שפת חבילת החוקים שלו באופן שונה — לכל חלק טקסט, וכאשר הזיהוי האוטומטי כבוי, מוגדר ב- `enabledPacks`.

מטריצת שפת הסגנון × מוצמדת על ידי `tests/unit/compression/output-styles-i18n-matrix.test.ts`: כל סגנון קטלוגי צריך ערך ב- `BASELINE_LANGUAGES` של המבחן; סגנון שאינו מוגבל ל-loce חייב לשלוח תרגום pt-BR ( `terse-cjk` עם locale-gated פטור מכלל זה) אלא אם כן הוא רשום ב- `KNOWN_ENGLISH_ONLY`, אשר עשוי להחזיק רק סגנונות ללא תרגומים כלל — סגנון רשום שיש לו תרגום כלשהו נכשל במבחן; וסגנון נכשל במבחן כאשר הוא מאבד שפה שהערך שלו ב- `BASELINE_LANGUAGES` מפרט. להוספת סגנון, ראה [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### דחיסת תוצאות הכלי

`compressToolResult()` ב- `open-sse/services/compression/toolResultCompressor.ts` דוחס טקסט של תוצאה של כלי עם** 5 אסטרטגיות** . הוא מנסה אותם בסדר הזה, והאסטרטגיה המאופשרת הראשונה שהבדיקה שלה תואמת את התוכן מחליטה את התוצאה:

1. **`fileContent`**: content of 3 or more lines in which at least one line, ignoring leading indentation, starts with `import `, `export `, `function `, `class `, `const `, `let `, `var ` or `return ` (the keyword plus a space), or with `if`, `for` or `while` followed by `(` or ` (`, keeps its first 20 and last 5 lines, with the elided middle marked.
2. **`grepSearch`** : תוכן בשורה אחת לפחות מהצורה `<path>:<digits>:`, שבה לטקסט שלפני הנקודתיים הראשון אין רווח לבן, שומר רק את השורות הללו, לכל היותר 30, ואחריהן ספירה של התאמות נוספות ורשימת הקבצים התואמים; כל שורה אחרת נשמטת. שורה אחת כזו מספיקה כדי להפעיל את האסטרטגיה, אז שורת יומן שמתחילה בחותמת זמן כמו `12:30:45` נחשבת גם כן.
3. **`shellOutput`** : פלט שמכיל רצף ANSI CSI (`ESC[` ואז ספרות או נקודות פסיק ואז אות, כמו בקודי צבע) או `$` ואחריו רווח לבן בכל מקום בטקסט מאבד את הרצפים הללו (הרחקות אחרות, כגון `ESC[?25l` או רצף כותרת חלון OSC, נשמרים) ושומר על 50 השורות הקולקטיביות האחרונות שלהן חוזרות על עצמן, עם קונסקצ'יק. מכיוון שהבדיקה הזו פועלת לפני `json` ו- `errorMessage`, JSON או פלט שגיאה שמכיל `$` כזה לעולם לא מגיע אליהם בזמן ש- `shellOutput` פועל.
4. **`json`** : מטען של JSON מעל 2,000 תווים שמתחיל ב- `{` או `[` (אחרי רווח לבן אופציונלי) ומנתחים מסוכמים: מערך של יותר מ-7 פריטים שומר על 5 ו-2 הפריטים האחרונים שלו ואת הספירה הכוללת שלו, ואובייקט שומר על 20 המפתחות הראשונים שלו, כאשר כל אובייקט מקונן או ערך אורך של מערך מוחלף על ידי `{…N keys}` (עבור ערך zq earray שלו) סמן `_remaining_<N>_keys` סופר את המפתחות שירד מעבר ל-20 הראשונים. ערכים סקלאריים מועתקים בשלמותם, כך שאובייקט של 20 מפתחות או פחות ללא ערכים מקוננים מוכנס רק מחדש —.
5. **`errorMessage`** : פלט שמכיל, בכל מקום ובכל אות, `error:`, `error ` (המילה שלאחריה רווח, כמו ב- `no error found`), `[error]`, `exception:`, `exception `, `[exception]` או `traceback` שומר על השורה הראשונה שלו, 10 השורות הבאות ו-3 האחרונות, עם סמן `… [N frames elided] …` במקום הקווים ביניהם. הסמן מופיע רק כאשר יותר מ-13 שורות עוקבות אחרי השורה הראשונה, ולכן פלט שגיאה של 14 שורות או פחות אינו מתקצר (ב-12 או 13 שורות כבר נשמרו 3 השורות החוזרות האחרונות).

לאחר התאמה של אסטרטגיה, אפילו כזו שלא חוסכת כלום, האסטרטגיות המאוחרות יותר לא מנוסים. כאשר אסטרטגיית ההתאמה לא שומרת אסימונים משוערים (אורך ÷ 4, מעוגל כלפי מעלה) — למשל קובץ דמוי קוד של 25 שורות או פחות, או מערך JSON מעל 2,000 תווים עם 7 פריטים או פחות — המנוע האגרסיבי שומר על תוצאת הכלי המקורית: שני המתקשרים (`compressAggressive()` ו- `compressAnthropicToolResultBlock()` עצמו נשארים `saved` 0 או מתחת ל- `compressToolResult()` עצמו) מחזיר את התפוקה של האסטרטגיה הזו. שלב התוצאה של הכלי אינו המילה האחרונה: סיכום ה-fallback של המנוע עדיין יכול לקצר הודעת `tool` או `function` ליותר מ-8,192 תווים (`maxTokensPerMessage`, 2,048, פעמים 4).

#### מתי להשתמש

דחיסת תוצאת הכלים היא שלב 1 של המנוע האגרסיבי (`compressAggressive()` in `open-sse/services/compression/aggressive.ts`), כך שהוא פועל במצב אגרסיבי ובשלב `aggressive` של צינור מוערם. הוא דוחס הודעות `tool` ו- `function` בצורת OpenAI ואת הטקסט בתוך בלוקים Anthropic `tool_result`. לכל אסטרטגיה יש מתג משלה תחת `aggressive.toolStrategies`, הכל פועל כברירת מחדל. בלוח המחוונים, המתגים נמצאים בדף איש המערות** מִתקַדֵם** הצג בזמן שהדחיסה מופעלת ומצב ברירת המחדל הוא אגרסיבי.

### צינור מוערם

מצב מוערם פועל** מספר מנועים ברצף** — בדרך כלל תחילה RTK (חיסכון של 60-90% בפלט הכלי), ואז Caveman על הטקסט הנותר (~ 46% חיסכון בקלט). מורכב, זה ה** טווח כשיר של 78-95%.** (ראה מתמטיקה של חיסכון במעלה הזרם למעלה): `1 - (1 - 0.60..0.90) × (1 - 0.46)` הוא ממוצע של ≈ 89%.

#### איך זה עובד

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### מתי להשתמש

השתמש במצב מוערם עבור:

- זרימות עבודה עמוסות בכלים (קידוד אנטי, מחקר)
- עיבוד אצווה רגיש לעלות
- כאשר אתה צריך חיסכון אסימון מקסימלי

צינורות מוערמים מוגדרים באמצעות הגדרת הדחיסה הגלובלית `stackedPipeline`, או באמצעות משולבת דחיסה עם שם המוקצה לשילוב של ניתוב (ראה Per-Combo Override למעלה) — לא דרך auto-combo `modePack` (שדה זה רק משקלל מחדש את בחירת הדגם האוטו-קומבו, ו- `stacked` אינו שם חבילה חוקי).

---

## דריסות דחיסה לשילובים

ניתן לדרוס את מצב הדחיסה הגלובלי **עבור כל שילוב בנפרד** כדי לכוונן את ההתנהגות
למקרי שימוש שונים:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

אפשרות זו שימושית עבור:

- **שילובי קידוד**: השתמשו במצב `aggressive` להפעלות ארוכות
- **שילובי שאלות ותשובות מהירות**: השתמשו במצב `lite` לתגובות מהירות
- **שילובים עתירי כלים**: השתמשו במצב `stacked` לחיסכון מרבי
- **שילובי ייצור**: השאירו את הדריסה כבויה עבור ספקים המשתמשים במטמון — ההתאמה
  המודעת למטמון, שפועלת תמיד, משנמכת את `aggressive`/`ultra` ל-`standard` באופן אוטומטי
  (אין מצב `cache-aware` שניתן לבחור בו)

---

## ראו גם

- [תצורת סביבה](../reference/ENVIRONMENT.md) — משתני סביבה של דחיסה
- [מדריך ארכיטקטורה](../architecture/ARCHITECTURE.md) — הרכיבים הפנימיים של צינור עיבוד הדחיסה
- [מדריך למשתמש](../guides/USER_GUIDE.md) — תחילת העבודה עם דחיסה
- [דחיסת RTK](./RTK_COMPRESSION.md) — מסנני RTK, מודל אמון, שער אימות ושחזור פלט גולמי
- [מנועי דחיסה](./COMPRESSION_ENGINES.md) — Caveman,‏ RTK,‏ stacked, ממשקי API,‏ MCP ולוח מחוונים
- [תבנית כללי דחיסה](./COMPRESSION_RULES_FORMAT.md) — תבנית חבילת כללים ב-JSON
- [חבילות שפה לדחיסה](./COMPRESSION_LANGUAGE_PACKS.md) — כללי Caveman ייעודיים לשפה
