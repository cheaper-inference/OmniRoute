# Quality Gates Reference (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

מסמך זה הוא המקור המוסמך לכל שערי האיכות של CI ב-OmniRoute.
הוא מתאר כל שער, מה הוא מאמת, באיזו משימת CI הוא פועל, האם הוא משתמש
בקו בסיס מסוג ratchet או במדיניות עובר/נכשל, והאם הוא חוסם את הבנייה או משמש כהמלצה בלבד.

לסיכום קצר ולמדיניות רשימת ההיתרים, ראו את הסעיף "שערי איכות ו-Ratchets"
ב-`AGENTS.md`. להערכה הביקורתית, לסיווג הבשלות ולתוכנית השכפול שאינה תלויה בכלי
של אותה המערכת, ראו את
[מדריך שערי האיכות](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## מלאי שערים ופרופילי הרצה

### קבלת מועמדים

תהליכי העבודה CI ו-Quality Gates מפיקים כל אחד הכרעה יציבה: `Gate / CI` ו-`Gate / Quality`. מדיניות הקבלה שלהם, המנוהלת לפי גרסאות, מגדירה כל משימה במעלה הזרם כנדרשת או כמייעצת. משימה נדרשת ורלוונטית חייבת להצליח: תוצאות חסרות, מבוטלות, שדולגו, ממתינות או לא ידועות אינן יכולות לקבוע PASS. סיווג תקף של שינויי תיעוד בלבד או קטלוג בלבד עשוי להפוך נתיב קוד ללא רלוונטי; PR במצב טיוטה אינו מועמד קביל. התווית `hotfix` אינה פוטרת מהצגת ראיות.

שני תהליכי העבודה מכסים PR-ים לענפי main/release, דחיפות אל `main`, הפעלה ידנית ואירועי merge-group. דחיפה, הפעלה ידנית ו-merge-group מריצים את הבחירה המלאה. דחיפות אל `release/**` אינן מפעילות אותם (2026-10-18): כל שינוי כבר הריץ את המטריצה ב-PR שלו, והשילוב לאחר המיזוג הוא באחריות Release-Green (`docs/ops/RUNNER_BOX.md` ← נתיב מתארח). Fork-ים וקבוצות מיזוג משתמשים ב-runners מתארחים עבור משימות שבמצבים אחרים בוחרות ב-runners באירוח עצמי; יש לוודא קיבולת מספקת בסביבה המתארחת לפני הפריסה.

כל קבלת JSON מזהה את ה-SHA שנמשך, את הרצת תהליך העבודה ואת ניסיון ההרצה. ה-CLI דוחה אי-התאמה בין ה-SHA של ה-checkout לבין זה של האירוע. בדיקות תהליך העבודה קושרות את החברות במדיניות לרשימת `needs` של משימת ההכרעה, כך שנתיב חדש או נתיב שהוסר לא יוכל להיעלם ללא התרעה. האישורים מכסים את תהליך העבודה שלהם עצמם, ולא פרסום, פריסה או את המימוש הפנימי
של סורק מייעץ קיים. הגדרת הבדיקות הרלוונטיות כנדרשות בכללי הענף
היא שינוי מנהלי נפרד; עצם הגדרת המשימות שלהן אינה מגינה על ענף.

`API Route Typecheck` היא בדיקת תהליך עבודה עצמאית, מחוץ לשתי ההכרעות המצטברות
ולפרופיל הסטטי של הצופה המקומי המלא. יש לבדוק את התוצאה שלה בנפרד עבור
המועמד המדויק. `.github/workflows/api-route-typecheck.yml` מופעל בבקשות משיכה אל `main` או
`release/**`, בדחיפות לכל אחת ממשפחות הענפים, ובהפעלה ידנית. אין לו מסנן נתיבים.
שינוי ענף הבסיס של בקשת משיכה מבקש בדיקה חדשה; עריכות בגוף/בכותרת משתמשות בשם לתצפית בלבד
`Admission not requested / API Route Typecheck` ואינן יכולות להחליף את בדיקת הקבלה.
תהליך העבודה אינו מגדיר גורם מפעיל של קבוצת מיזוג. כל השקה של תור מיזוגים המחייבת
בדיקה זו חייבת לקבוע תחילה את הפעלתה עבור אירוע זה.

### קיבולת הרצת ממשק המשתמש

CI מריץ את מלאי ממשק המשתמש המלא כארבעה shards במטריצת `test-vitest`, עם שני workers לכל היותר בכל shard ומגבלת הזמן הקיימת של 15 דקות למשימה. ה-shard הראשון מריץ גם את חבילת Vitest של MCP/autoCombo. תוצאת המשימה הנדרשת מכסה כל חלק במטריצה; כשל או ביטול של shard אחד אינם יכולים לקבוע קבלת מועמד.

ה-observer הלילי שומר קבלה נפרדת ומדויקת למועמד עבור כל shard של ממשק המשתמש, לרבות הרצת MCP בקבלה הראשונה. כל ארבע הקבלות, הלוגים וזהויות ההרצה התואמות נדרשים. הפעלה מקומית של `npm run test:vitest:ui` עדיין בוחרת את החבילה המלאה; הרצה אחת עם `--shard` היא ראיה חלקית בלבד.

### איסוף כיסוי של בדיקות יחידה

שנים-עשר ה-shards של בדיקות היחידה אוספים כיסוי V8 במהלך הרצת הבדיקות הקיימת שלהם. shard שהצליח מריץ את `scripts/ci/compact-v8-coverage.mjs` כדי לדחוס את הקבצים המקוריים בלי ליצור דוח ביניים של Istanbul. משימת Coverage הסופית מאמתת את כל שנים-עשר המניפסטים מול ה-SHA של המועמד, סביבת הריצה, שורש המקור וגיבובי הנתונים, ולאחר מכן מריצה את מחוללי הדוחות של c8 ואת ספי הכיסוי הקיימים. הקלטים שומרים על סדר שמות הקבצים הגלובלי של c8; מיזוג מוקדם לכל shard אינו בטוח עבור כיסוי משולב של פונקציות ובלוקים. shards חסרים, פגומים או לא תואמים מכשילים את הקבלה. shards של בדיקות שנכשלו שומרים בנפרד כיסוי אבחוני גולמי; הוא אינו יכול להיכלל במיזוג הסופי.

### אישורי התקדמות של הרצת בדיקות יחידה

הפקודה המשותפת `test:unit:ci:shard` מתעדת את השלבים `primary`,‏ `dashboard` ו-`serial`
באמצעות `scripts/ci/unit-progress-reporter.mjs`. דוח הבדיקות הרגיל נשאר
זמין. אישור נפרד המכיל מטא-נתונים בלבד מתעד את ההתחלה וההשלמה של כל קובץ,
ופעימת לב אחת ל-30 שניות מפרטת את הקבצים שעדיין פעילים ואת הזמן שחלף עבורם. הוא מתעד
רק מטא-נתוני הרצה שברשימת ההיתרים; תיאורי בדיקות, פלט, גופי שגיאות והסביבה
המלאה אינם עוברים סריאליזציה.

מערכות ה-CI והאיכות שומרות את קובצי ה-JSONL בשם `unit-progress-ci-<run>-<attempt>-<shard>` ובשם
`unit-progress-quality-<run>-<attempt>-<shard>`. פסק זמן של משימה עלול למנוע את ההעלאה המאוחרת;
פעימות לב שכבר נשלחו נשארות כראיות אבחוניות. היעדר פעימות לב עשוי גם להעיד
שתהליך ה-runner חסום או הופסק. אישורים אלה משמרים את בחירת הבדיקות,
המקביליות, מועדי הסיום וסטטוס היציאה הקיימים; הם אינם הכרעות לגבי קבלת מועמדים.

### ראיות שמורות במודול איחוד תוצאות הקבלה

`scripts/quality/validate-release-acceptance.mjs` מאחד תוכנית שסופקה ואת המניפסטים שלה; הוא אינו מוכיח שהתוכנית מכסה את כל צינור השחרור. הדוחות שלו מגדירים במפורש `releaseAcceptance: false`, גם כאשר התוכנית היא `VERIFIED`. תהליך העבודה `release-acceptance.yml` עדיין משתמש בנתוני בדיקה במצב shadow, ולא באישורים אמיתיים של בנייה, אריזה, אתחול או קידום.

ה-CLI דורש `--evidence-root` כדי לאמת ראיות שמורות. הקבצים נפתרים לפי `<evidence-root>/<artifact_id>/<member>` ומחושב עבורם גיבוב SHA-256. רשומת PASS ללא ראיות, קובץ חסר או ששונה, נתיב לא בטוח או קישור סמלי מונעים אימות. קבצים חסרים אינם שקולים ליומנים ריקים של הרצות מוצלחות. בדיקות SHA/run/attempt הקיימות נשארות עצמאיות: בתים תואמים אינם יכולים להפוך אישור מיושן לתקף. שלמות הקובץ אינה הוכחה לאותנטיות ההרצה או לקידום התוצר.

### מלאי סריקה סטטית

מלאי כינויי npm המנוהל לפי גרסאות והחברות בסריקה הסטטית נמצאים ב-`config/quality/gate-manifest.json`. הריצו את `npm run check:gate-manifest` כדי לאמת את שמות הסקריפטים ואת הפקודות המדויקות מול `package.json`; הוספות, הסרות וסטייה בפקודות מכשילות הן את ה-hook המקומי והן את משימות סיווג השינויים ב-CI. כינוי אינו משימת תהליך עבודה, מופע מטריצה או מקרה בדיקה: אין להציג ספירות אלה כבנות-החלפה.

השתמשו ב-`npm run quality:scan -- --list` או ב-`npm run quality:scan:fast -- --list` כדי לבחון את הכינויים שנבחרו בלי להריץ אותם. ה-runner מפעיל את נקודת הכניסה של npm, ולכן סביבת הריצה שלה נשמרת, כולל Bun במקומות שבהם הוא מוגדר. המניפסט מתעד כינויים שמחוץ לפרופילים אלה כמופעלים בנפרד, ופקודות תחזוקה אסורות בפרופילי סריקה לקריאה בלבד.

פרופילים אלה מכסים את הסריקה הסטטית בלבד. הם אינם מאשרים בדיקות מוצר, כיסוי, אריזה, בדיקות חיצוניות או קבלת הפצה מלאה של מועמד. קבלה בתהליך העבודה משתמשת ב-`config/quality/admission-policy.json` המקושר וב-`scripts/quality/admission-verdict.mjs`. פרופילי release-observer נשארים נפרדים; בדקו באופן עצמאי את הבדיקות והקבלות הרלוונטיות שלהם. הפקודות הסטטיות של ה-observer המלא מוגדרות ב-`config/quality/release-green-static-profile.json`, לרבות `audit:deps`, בחירת בדיקות מוטציה ובדיקות תרגום. ה-loader מאמת פקודות npm מול package.json והצהרות CI/Quality שמודלו; הוא דוחה סטייה במקום להריץ אסימוני shell כארגומנטים. פלט SKIP/INCOMPLETE מסורק נדרש אינו יכול לקבוע PASS. הפרופיל מתעד את ההחרגות החיצוניות שלו ואינו מחליף ראיות לכיסוי בסביבה מתארחת, למטריצות בדיקה, לחבילה או לפריסה. מלאי הטקסט שלהלן משמש כהפניה, ולא כהוכחה לכך ששער אכן הופעל.

הסקריפטים נמצאים תחת `scripts/check/` (שערי מדיניות) ו-`scripts/quality/` (מנוע ratchet). מקור האמת של CI הוא `.github/workflows/ci.yml`.

### תקינות תיעוד הבסיס שפורסם

`.github/workflows/i18n-base-health.yml` עוקב אחר תקינות התיעוד לאחר דחיפות נבחרות
אל `main` ואל `release/v*`, וכן בהפעלה ידנית. המסננים שלו מכסים תיעוד,
קובצי Markdown בתיקיית השורש, `llm.txt`, מצב/תצורת התרגום וכלי ה-i18n הרלוונטיים.
המשימה היחידה, `Published base documentation health`, משתמשת ב-Ubuntu מתארח ומוגבלת
לחמש דקות. היא מבצעת אימות לקריאה בלבד וכותבת אישור אבחון, ללא
התקנת תלויות, תרגום או אימוץ מצב.

`scripts/i18n/check-base-health.mjs` דורש אפס אי-עקביויות מסוג source-hash, missing-target, target-hash,
stale-translation ו-section-cache. הוא גם מאמת את היקף מסמכי הליבה
והשפות הנוכחי ואת המקור המתועד שלו. הקשר לא תקין, כיסוי חלקי
או בודק שהופסק מפיקים `INCOMPLETE`; סטייה מאומתת מפיקה `FAIL`. שני המצבים
מחזירים סטטוס יציאה המעיד על כישלון. האישור מקושר ל-SHA של ה-checkout, לתהליך העבודה, להרצה
ולניסיון, ונשמר בשם `i18n-base-health-<sha>-<run>-<attempt>`.

זוהי תצפית עצמאית על הבסיס שפורסם. היא אינה מוסיפה אירוע PR או
merge-group, בדיקת PR נדרשת, כינוי npm או חבר בפרופיל סריקה סטטית.
מדיניות ה-PR הדיפרנציאלית הקיימת וסיווגי הייעוץ של הבודק הבסיסי
נותרים נפרדים. העלאה מוצלחת אינה יכולה להפוך תוצאת תקינות שנכשלה ל-PASS.

### נתיב מהיר ל-PR של הפצה (`quality.yml`)

הקובץ `.github/workflows/quality.yml` משלים את CI עבור PR-ים של main/release, דחיפות אל `main`, הפעלה ידנית וקבוצות מיזוג. PR-ים משתמשים בבדיקות מהירות המסוננות לפי נתיבים. בניית הכפילויות שהושבתה לצמיתות הוסרה; בדיקות הבנייה, האריזה והאתחול האמיתיות נשארות ב-CI.

| משימה                                            | תחום                                                                                                                                                                                  | חוסמת          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | בקשות משיכה של תיעוד/קוד; הפניות לתיעוד API ו-docs-all                                                                                                                                | כן             |
| `Fast Quality Gates`                             | בקשות משיכה של קוד; בדיקות סטטיות, בדיקת טיפוסים, בדיקת טיפוסים של לוח המחוונים ובדיקות יחידה מושפעות                                                                                 | כן             |
| `Forgotten sibling tests`                        | בקשות משיכה של קוד; מתבצע מעקב ממודולים ששונו אל צרכנים סטטיים ואל בדיקות אחיות מועמדות; נתיבי barrel וייבוא דינמי מדווחים כאבחונים מייעצים, עם חריגים מרשימת ההיתרים שאליהם יש הפניה | **מייעצת**     |
| `Vitest (fast-path)`                             | בקשות משיכה של קוד; חבילת בדיקות vitest מהירה                                                                                                                                         | כן             |
| `Unit Tests fast-path`                           | בקשות משיכה של קוד; חבילת בדיקות יחידה המחולקת ל-4 פלחים                                                                                                                              | כן             |
| `No new ESLint warnings`                         | בקשות משיכה של קוד; שומר lint המתחשב בהשתקות                                                                                                                                          | כן, כולל forks |
| `Merge integrity (changelog + generated skills)` | בקשות משיכה שאינן טיוטה; סנכרון יומן השינויים והמיומנויות שנוצרו                                                                                                                      | כן, כולל forks |

#### דוח בדיקות אחיות שנשכחו

`npm run check:forgotten-sibling-tests` עושה שימוש חוזר בפותר הייבואים שמאחורי מפת השפעת הבדיקות.
עבור כל מודול ייצור שהשתנה, הוא מדווח על שרשראות דטרמיניסטיות של
`changed module/symbol -> static consumer -> candidate sibling test` כאשר הבדיקה המועמדת
אינה נכללת בהבדלים של בקשת המשיכה. סיכום ה-Markdown ותוצאת ה-JSON נשמרים כתוצר של תהליך העבודה
`forgotten-sibling-tests` לצורך כיול לפני הפעלה חוסמת כלשהי.

ייצואים מחדש דרך barrel וייבואים דינמיים הם אבחוני פתרון בלבד; הם לעולם אינם יוצרים
ממצא חוסם. חריגים שנבדקו נמצאים ב-
`config/quality/forgotten-sibling-allowlist.json`. בכל רשומה יש לציין את הצרכן ואת הבדיקה
המועמדת, לספק נימוק ספציפי ולקשר לבעיה או לבקשת משיכה ב-GitHub. רשומות פגומות גורמות
לכשל כברירת מחדל. חריגים אינם יכולים להסתיר בדיקה מועמדת שנמחקה או הבדל שמוסיף `.skip`/`.todo`;
החלשת טענות אימות והסוואות אחרות נשארות באחריות שער
`check:test-masking`, שחוסם באופן עצמאי.

### משימה: `lint`

מופעלת בכל בקשת משיכה אל `main`. כשל חוסם את המיזוג.

| סקריפט (`npm run ...`)            | מה נבדק                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | חוסם                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `check:node-runtime`              | גרסת Node.js נמצאת בטווח הנתמך                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | כן                                    |
| `check:test-tla-order`            | אף קובץ `node:test` תחת `tests/unit` אינו רושם בדיקה, מגיע ל־`await` ברמה העליונה ולאחר מכן רושם בדיקות נוספות (#18045; מנגנון הידוק: `test-tla-order-allowlist.json` יכול רק להצטמצם)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | כן                                    |
| `check:cycles`                    | ייבואים מעגליים בכל `src/` + `open-sse/` (מבוסס AST, עם פתרון של `paths` מתוך tsconfig). הרצה ישירה מסתיימת עם קוד 1 בכל פעם שקיים מחזור כלשהו (כשל כברירת מחדל מאז #15281) ומציגה את רכיבי הקשירות החזקה (SCC). הפקודה `check:cycles:ratchet` (שמופעלת ב־CI) חוסמת כאשר הכמות חורגת מהתקרה `metrics.cycles` שב־`quality-baseline.json` — כרגע 14, עם `direction: down`, ולכן היא יכולה רק לרדת (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                        | כן (מנגנון הידוק)                     |
| `check:boundary`                  | הצימוד `open-sse → src`: ייבואים ייחודיים מקובץ לקובץ מהמנוע אל היישום (`scripts/quality/measure-boundary.mjs`; רשימת הקשתות היא צבר משימות התיקון להפרדת הליבה/המודולים של v4). הרצה ישירה = דוח מייעץ (זהה ל־`quality:boundary`). הפקודה `check:boundary:ratchet` (שמופעלת ב־CI וגם בלולאת מנגנון ההידוק של שערי הבדיקה המהירים ב־`quality.yml`) חוסמת כאשר הכמות חורגת מהתקרה `metrics.boundaryOpenSseToSrc` שב־`quality-baseline.json` — אותחלה לערך שנמדד, 771, עם `direction: down`; האפשרות `--update` רק מפחיתה אותה; ביחס לבסיס בבקשות משיכה (`--base-ref`, ראו להלן)                                                                                                                                                                                                                                            | כן (מנגנון הידוק)                     |
| `check:route-validation:t06`      | סכמות Zod קיימות בכל הנתיבים (מדיניות שכבה 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | כן                                    |
| `check:any-budget:t11`            | מספר המופעים של `@ts-expect-error // any` אינו חורג מהמכסה (מחסום שכבה 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | כן                                    |
| `check:provider-consistency`      | לכל ספק ב-`providers.ts` קיימת רשומה תואמת ב-`providerRegistry.ts` (ולהפך, במסגרת רשימת ההיתרים)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כן                                    |
| `check:model-lifecycle`           | שלוש טבלאות הניתוב המתוחזקות ידנית נשארות עקביות עם תמונת המצב של מחזור החיים שנשמרה במאגר (#11503):‏ `FITNESS_TABLE` ‏(`taskFitness.ts`) אינה מעניקה ניקוד לשום מזהה שיצא משימוש וש-`REGISTRY` יכולה לנתב; כל יעד של `BUILT_IN_ALIASES` קיים ב-`REGISTRY` ואינו מופיע בתמונת המצב של המזהים שיצאו משימוש; כל מזהה שיצא משימוש ועדיין נמצא ב-`REGISTRY` מועבר הלאה או רשום ב-`allowedRetiredInCatalog`; ואף מקור או יעד של `DEFAULT_DEGRADATION_MAP` אינו מופיע בתמונת מצב זו כמזהה שיצא משימוש. בדיקה זו אינה מוכיחה שמודל מסופק כעת על ידי שירות חי במעלה הזרם. לא מקוונת — משווה מול `config/quality/model-lifecycle.json`, שמתעדכן ידנית באמצעות `npm run quality:refresh-model-lifecycle` (דורש רשת; אינו משולב ב-CI).‏ `allowedRetiredInCatalog` הוא מנגנון צמצום חד-כיווני: יש להוסיף רשומה רק בצירוף סוגיית מעקב. | כן                                    |
| `check:fetch-targets`             | כל `fetch("/api/...")` בצד הלקוח תחת `src/` מפנה אל `route.ts` אמיתי                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | כן                                    |
| `check:deps`                      | כל יחסי התלות שניתנים להתקנה באמצעות `npm install`, בכל קובץ `package.json` במאגר, נמצאים ב-`dependency-allowlist.json`; חבילות חדשות שאינן מוצמדות לגרסה או ששמן מתחזה לחבילה אחרת מסומנות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | כן                                    |
| `audit:deps`                      | npm audit של כל חמשת קובצי הנעילה העצמאיים (השורש, Electron, תוספי OpenCode בגרסאות v1/v2 והספק). התראות קריטיות חוסמות; התראות ברמת חומרה גבוהה נותרות כאזהרות גלויות. ביקורות חסרות/שנכשלו מסומנות כלא שלמות וחוסמות; גיבובי הנעילה והדוחות נשמרים עבור כל תחום.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | כן                                    |
| `check:lockfile`                  | תקינות `package-lock.json` — רישום https, גיבובי תקינות, ללא דריסות מארח                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | כן                                    |
| `check:licenses`                  | רשימת היתרים של רישיונות SPDX עבור תלויות ייצור                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | כן                                    |
| `check:tracked-artifacts`         | ללא תוצרי בנייה / קישורי `node_modules` שנשמרו במאגר (רץ גם ב-husky pre-commit; ה-pre-push קל במכוון — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | כן                                    |
| `check:ai-attribution`            | ללא שורת סיום `Co-Authored-By` של AI/בוט או כותרת תחתונה המעידה על יצירת AI ב-commits, בכותרת או בגוף של PR — כלל מחייב #16 (בלולאת השערים המהירים של `quality.yml` עבור PR→`release/**` — קורא את מטען האירוע ואינו מבצע פעולה מחוץ ל-PR — ובשלב המיועד ל-PR בלבד בבדיקת lint של `ci.yml` עבור PR→`main`; וכן ב-hook מסוג `commit-msg` של husky; מחברים-שותפים אנושיים מותרים; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | כל החרגה של Vitest מציינת סוגיית מעקב ומופיעה ב-`config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כן                                    |
| `check:file-size`                 | קובצי המקור (`.ts`/`.tsx` תחת `src/`, `open-sse/`, `electron/`, `bin/`) נשארים בגבולות `cap`, וקובצי הבדיקה (`*.test.ts(x)`) בגבולות `testCap`; קבצים שהוקפאו ב־`file-size-baseline.json` (`frozen` / `testFrozen`) אינם רשאים לגדול מעבר לגודל המתועד שלהם                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | כן                                    |
| `check:error-helper`              | תגובות שגיאה במבצעים/מטפלים משתמשות ב־`buildErrorBody()` / `sanitizeErrorMessage()` (כלל מחייב #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | כן                                    |
| `check:migration-numbering`       | קובצי SQL של מיגרציות ממוספרים ברצף, ללא פערים או כפילויות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | כן                                    |
| `check:public-creds`              | אין ערכי OAuth מילוליים של `client_id`/`client_secret` או מפתחות Firebase Web מחוץ ל־`publicCreds.ts` (כלל מחייב #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | כן                                    |
| `check:db-rules`                  | אין SQL גולמי מחוץ למודולים של `src/lib/db/`; אין ייבואי barrel מ־`localDb.ts` (כללים מחייבים #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | כן                                    |
| `check:known-symbols`             | מבצעי ספקים, אסטרטגיות ניתוב ומתרגמים הרשומים בטבלאות הניתוב שלהם תואמים לקבצים בדיסק — ללא סמלים יתומים או לא מוצהרים                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | כן                                    |
| `check:route-guard-membership`    | כל נתיב שיוצר תהליך בן מסווג על־ידי `isLocalOnlyPath()` (כללים מחייבים #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | כן                                    |
| `check:test-discovery`            | כל קובץ `*.test.ts` / `*.spec.ts` במאגר נאסף על־ידי לפחות מריץ בדיקות אחד (מנגנון הידוק: רשימת הקבצים היתומים ב־`test-discovery-baseline.json` יכולה רק להצטמצם)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כן                                    |
| `check:agent-skills-sync`         | תוצרי agent-skills שנוצרו תואמים לקטלוג המקור שלהם (ללא סטייה)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | לסמלי לוגו/נכסים של ספקים קיימת רשומת מקור מתועדת                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | קובצי תצורה מסוג JSON עוברים ניתוח תחבירי ועומדים בכללי ה־lint של המאגר                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | הידור TypeScript ללא שגיאות (אזהרות מייעצות בלבד)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | כן                                    |
| `typecheck:noimplicit:core`       | `noImplicitAny` מחמיר — מכוון לעתיד; אתרי קריאה רבים שקיימים מראש עדיין זקוקים להערות טיפוסים                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **מייעץ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` המוגבל ל-`src/app/(dashboard)/**` (#7033) — רשימת ההיתרים המצומצמת של `typecheck:core`, הכוללת 27 קבצים, אינה כוללת אף קובץ TSX של לוח המחוונים, וגם `next build` לעולם אינו מבצע עבורו בדיקת טיפוסים (`next.config.mjs` מגדיר `ignoreBuildErrors: true`), ולכן נסיגות של מזהים יתומים שם (#6625/#6909) לא היו גלויות ל-CI. מבצע השוואה מול קו בסיס קפוא של ספירת שגיאות לפי קובץ ולפי קוד TS (`config/quality/dashboard-typecheck-baseline.json`, לפי אותו דפוס אכיפת התיישנות כמו `check:known-symbols`) — רק שגיאות חדשות מעבר לכמות שבקו הבסיס מכשילות את השער; כאשר שגיאה קיימת מתוקנת, יש להנמיך את הסף באמצעות `--update`.                                                                                                                                                                                   | כן                                    |

### משימה: `quality-gate`

פועלת לאחר `test-coverage`. כשל חוסם מיזוג.

| סקריפט                       | מה נבדק                                                                                                                                                | חוסם                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| `quality:collect`            | מפיק את `quality-metrics.json` (מספר אזהרות ESLint, כיסוי מתוך דוח רסיסים ממוזג)                                                                       | כן (במעלה הזרם של מנגנון ההידוק) |
| `quality:ratchet`            | אף מדד ב-`quality-baseline.json` לא נסוג (אזהרות ESLint ≤ קו הבסיס; כיסוי ≥ קו הבסיס)                                                                  | כן                               |
| `check:duplication`          | שכפול קוד (jscpd@4) אינו חורג מקו הבסיס שב-`quality-baseline.json`                                                                                     | כן                               |
| `check:complexity`           | המורכבות הציקלומטית ברמת הקובץ אינה חורגת מהתקרה (`complexity` של ESLint הבסיסי + `max-lines-per-function`)                                            | כן                               |
| `check:cognitive-complexity` | מנגנון הידוק למורכבות קוגניטיבית (`eslint-plugin-sonarjs`) — הרצת ESLint נפרדת; CI מריץ את שתיהן במאוחד כשלב היחיד `check:complexity-ratchets`         | כן                               |
| `check:dead-code`            | מנגנון ההידוק לייצואים / קבצים שאינם בשימוש (knip) אינו נסוג ביחס לקו הבסיס                                                                            | כן                               |
| `check:compression-budget`   | תקציב מדד השוואת דחיסה — ספי המינימום לחיסכון באסימונים לכל מנוע אינם רשאים לסגת                                                                       | כן                               |
| `check:type-coverage`        | מנגנון ההידוק לאחוז הקוד בעל הטיפוסים (`type-coverage`) אינו נסוג; מחליף במידה רבה את `typecheck:noimplicit:core`                                      | כן                               |
| `check:codeql-ratchet`       | מספר התראות CodeQL הפתוחות אינו נסוג (נקרא באמצעות `gh api`; דילוג תקין ללא אסימון) — לתדירות הרענון ולהפעלה ידנית: ראו "מנגנון ההידוק של CodeQL" להלן | כן                               |

### משימה: `quality-extended`

המשימה חוסמת מועמדים רלוונטיים. גודל החבילה, ממצאי סודות, ממצאי חולשות,
ממצאי תהליכי עבודה ושינויי OpenAPI נבדקים באמצעות מנגנוני הידוק נדרשים.
אבחוני תלויות מעגליות נשארים בגדר המלצה. התקנת הסורקים נדרשת:
`scripts/ci/install-quality-scanners.sh` מתקין גרסאות מקובעות ומעביר הלאה
כשלי התקנה. כלים חסרים, דוחות לא תקינים או קווי בסיס חסרים משאירים
את שער הסורק הנדרש במצב לא הושלם.

| סקריפט                   | מאמת                                                                                                                                                                                                                  | חסימה                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:circular-deps`    | אין תלויות מעגליות (dpdm)                                                                                                                                                                                             | **המלצה בלבד**                          |
| `check:bundle-size`      | גודל החבילה אינו חורג מהתקרה; מדידה שאינה זמינה גורמת לכישלון                                                                                                                                                         | **חוסם עם --ratchet**                   |
| `check:secrets`          | ממצאי Gitleaks אינם נסוגים; סריקות נדרשות דוחות כלים/מקור/קו בסיס חסרים, סריקות שנכשלו ודוחות לא תקינים                                                                                                               | **חוסם עם --ratchet**                   |
| `check:vuln-ratchet`     | חולשות בתלויות אינן נסוגות; סריקות נדרשות דוחות כלים חסרים, דוחות לא תקינים או קווי בסיס חסרים                                                                                                                        | **חוסם עם --ratchet**                   |
| `check:workflows`        | בדיקת תקינות של תהליכי עבודה (actionlint + zizmor); סורקים חסרים/תקולים, דוחות לא תקינים או קו בסיס חסר של ratchet גורמים לכישלון במצב INCOMPLETE. ממצאים תקינים פועלים בהתאם למדיניות strict/advisory/ratchet שנבחרה | נדרשת הרצה; ratchet של zizmor חוסם ב-CI |
| `check:openapi-breaking` | חוזה ה-API הציבורי מול מהדורות אירועים מוצמדות (בסיס המיזוג של PR, המצב שלפני push, בסיס קבוצת המיזוג; בהרצה מתוזמנת/ידנית נבדק תחילה ההורה הראשון); מדידה נדרשת נכשלת באופן סגור                                     | **חוסם עם --ratchet**                   |

### משימה: `docs-sync-strict`

עבור בקשות משיכה אל `main` או `release/**`, משימה זו רצה רק עבור מועמדים שאינם טיוטה (או נמצאים בתור מהימן) ומסווגים כשינויי תיעוד או קוד. היא רצה גם באירועי CI שאינם PR; טריגר ה-push של תהליך עבודה זה מכסה רק את `main`, ולא את `release/**`. שלב שמסתיים בקוד יציאה שאינו אפס חוסם את המשימה; ממצאים לדיווח בלבד והחריגים המתועדים להלן אינם חוסמים אותה.

| סקריפט                         | מאמת                                                                                                                                                                                                                                                                                                                                                                                             | חסימה                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | שער-על שמריץ ברצף את 7 שערי-המשנה שלהלן                                                                                                                                                                                                                                                                                                                                                          | כן                                                                                                        |
| ↳ `check:docs-sync`            | עקביות גרסאות החבילה/OpenAPI/CHANGELOG, עותקי מראה מדויקים של `llm.txt`, אינווריאנטים של סעיפים וגודל ב-CHANGELOG המתורגם והיעדר מסמכים כפולים שכבר הוחלפו                                                                                                                                                                                                                                       | כן                                                                                                        |
| ↳ `check:docs-frontmatter`     | דפי תיעוד שעברו הידור כוללים כותרות frontmatter תקינות                                                                                                                                                                                                                                                                                                                                           | כן                                                                                                        |
| ↳ `check:docs-counts`          | אינווריאנטים של ספירה ברמת ביטחון גבוהה נאכפים בקפדנות; בדיקות היוריסטיות של מספר הקבצים רק מזהירות, אלא אם הסקריפט מקבל `--strict` (שער-העל של CI אינו מעביר אותו)                                                                                                                                                                                                                              | הרמה הקפדנית חוסמת; הרמה הרכה מייעצת בלבד                                                                 |
| ↳ `check:env-doc-sync`         | קריאות של משתני סביבה בקוד המקור, `.env.example` ו-`docs/reference/ENVIRONMENT.md` תואמים לאחר החלת רשימות החריגים המפורשות לפריטים שמתעלמים מהם, לפריטים בתיעוד בלבד ולפריטים בסביבה בלבד                                                                                                                                                                                                       | כן, מחוץ לרשימות החריגים המתועדות                                                                         |
| ↳ `check:deprecated-versions`  | מדווח על גרסאות שעלולות להיות מיושנות מחוץ להקשרים היסטוריים בטוחים ועל תאריכי עדכון מיושנים, למעט מסמכים שמתעלמים מהם                                                                                                                                                                                                                                                                           | מייעץ בלבד בתצורת CI הנוכחית (`--strict` אינו מועבר)                                                      |
| ↳ `check:doc-links`            | קישורי markdown פנימיים בתיעוד מפנים לקבצים קיימים (בתבנית `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                    | כן                                                                                                        |
| ↳ `check:fabricated-docs`      | נתיבים, משתני סביבה, פקודות CLI, שמות hooks ונתיבי קבצים שמוזכרים בתיעוד קיימים בבסיס הקוד. שער קשיח באמצעות `--strict`; כישלון רך ללא הדגל.                                                                                                                                                                                                                                                     | כן (באמצעות `--strict` ב-CI)                                                                              |
| `check:cli-i18n`               | מפתחות `t()` שה-CLI משתמש בהם קיימים ב-`en`; ‏`pt-BR` שומר על כל הסעיפים ברמה העליונה; `zh-CN` ו-`zh-TW` מכילים את כל המפתחות של `en`                                                                                                                                                                                                                                                            | כן                                                                                                        |
| `check:openapi-coverage`       | מפרט OpenAPI מכסה לפחות סף שעבר ratchet של הנתיבים בפועל                                                                                                                                                                                                                                                                                                                                         | כן                                                                                                        |
| `check:openapi-security-tiers` | ההערות המוצהרות `x-loopback-only`/`x-always-protected` חייבות להיות מגובות ב-`routeGuard.ts`; שגיאות מנתח ואי-התאמות בבדיקה קדימה חוסמות. הבדיקה ההפוכה של `x-loopback-only` חסר תחת קידומות לגישה מקומית בלבד מזהירה, ונתיבים שמוגדרים רק באמצעות תבנית מוחרגים מהמעבר ההפוך הזה.                                                                                                               | בדיקות המנתח והבדיקות קדימה חוסמות; הבדיקה ההפוכה מייעצת בלבד                                             |
| `check:openapi-routes`         | כל נתיב `/api...` ב-`openapi.yaml` מתאים לנתיב אמיתי ללא תלות בפרמטרים, לאחר החלת רשימת החריגים המנומקת `KNOWN_STALE_SPEC`; גם רשומות מיושנות ברשימת החריגים גורמות לכישלון                                                                                                                                                                                                                      | כן                                                                                                        |
| `check:docs-symbols`           | הפניות URL פנימיות מסוג `/api/...` בתיעוד הקנוני שאינו עותק מראה מתאימות לנתיב אמיתי או למשפחת נתיבים; הפניות לפרוקסי/למקור במעלה הזרם/למצייני מקום/לקבצים ורשומות מנומקות ב-`KNOWN_STALE_DOC_REFS` מוחרגות, ורשומות מיושנות ברשימת החריגים גורמות לכישלון                                                                                                                                       | כן                                                                                                        |
| `i18n translation drift`       | בודק את ערכי הגיבוב של המקור/היעד במסמכי הליבה ואת מקור התרגום. השוואת PR מתירה רק כשלים שעברו בירושה וזהים לחלוטין; אי־התאמות חדשות או שלא אומתו במקור, ביעד חסר, בגיבוב היעד, בתרגום מיושן או במטמון המקטעים חוסמות. מחוץ להשוואת PR, כשלים במקור/ביעד חסר/בגיבוב היעד חוסמים, ואילו תרגומים מיושנים ומטמוני מקטעים לא עקביים נשארים בגדר אזהרה בלבד. היעדר מטמון מקטעים בפורמט הישן אינו כשל. | סטייה חדשה/שלא אומתה ב־PR חוסמת; סטייה זהה שעברה בירושה היא אזהרה בלבד; הכללים מחוץ ל־PR תלויים בסוג הכשל |

### משימה: `i18n-ui-coverage`

| סקריפט                           | מאמת                                                                                                                                                                           | חוסם     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `check-ui-keys-coverage` (מוטמע) | כיסוי מפתחות i18n של ממשק המשתמש הוא ≥ 65%                                                                                                                                     | כן       |
| `check-ui-value-drift` (מוטמע)   | **ערך** באנגלית שנכתב מחדש אינו מותיר אחריו תרגום מיושן                                                                                                                        | כן       |
| `check-new-key-coverage` (מוטמע) | מפתח אנגלי **חדש** מתורגם בכל אזור — סמן `__MISSING__:` נדחה                                                                                                                   | כן       |
| `check-translation-ratio`        | שיעור התרגומים האמיתיים בכל אזור (זהים לאנגלית / מצייני מקום / ערכים חסרים מחוץ לרשימת ההחרגות) אינו יכול לחרוג מ־`config/quality/i18n-translation-baseline.json` בתוספת מרווח | **חוסם** |

נדרש `fetch-depth: 0` — שער סטיית הערכים משווה את `en.json` מול בסיס המיזוג.

#### `check-ui-value-drift` — שער תרגומים מיושנים

מזהה את רגרסיית ה־i18n היחידה שהשערים האחרים אינם מסוגלים לזהות מבחינה מבנית: ערך באנגלית
נכתב מחדש, והתרגומים שנגזרו מהאנגלית _הקודמת_ נשארים במקומם, כך
שמשתמשים שאינם דוברי אנגלית ממשיכים לקרוא בביטחון נוסח שכעת הוא שגוי.

המקרה הזה הגיע בפועל לגרסה שפורסמה. `oauthModal.googleOAuthWarning` נכתב מחדש כאשר כלי העזר להתחברות
של Antigravity נוסף (#5203); ב־**39 מתוך 43 אזורים** נשאר טקסט שהנחה מפעילים "להעתיק את
כתובת ה־URL המלאה ולהדביק אותה למטה" — תהליך שלא ניתן להשלים עבור ספק זה. הדבר
לא התגלה עד #8463, משום ש:

- `sync-ui-keys` משלים רק מפתחות ש**חסרים**, ולעולם לא מפתחות ש**מיושנים**;
- `check-ui-keys-coverage` סופר את _נוכחות_ המפתח, ולכן תרגום מיושן נחשב מכוסה;
- `check-translation-drift` עוקב אחר עותקי התיעוד ב־`docs/i18n/<locale>/**.md` —
  הוא לעולם אינו קורא את `src/i18n/messages/*.json`. חוסם במשימה `docs-sync-strict` מאז
  הסנכרון מחדש של 2026-09: עריכת מסמך ליבה → `npm run i18n:run -- --files=<doc>` (ברמת המקטע, זול).

**מודע להבדלים, ללא הסתמכות על קו בסיס.** הוא משווה את `en.json` שבבסיס המיזוג מול
עץ העבודה; עבור כל מפתח שהערך שלו באנגלית השתנה, כל אזור שעדיין מחזיק בתרגום
שלא השתנה נחשב מיושן. כך **מוקפא במכוון החוב הקיים** — הבדל
אינו יכול לחשוף מאיזו גרסה ישנה באנגלית נגזר תרגום ותיק, ולכן השער בוחן
רק את מה שהשינוי הנוכחי נוגע בו. החלופה (קו בסיס של גיבובים לכל מפתח) הייתה מוסיפה
קובץ מיוצר בגודל של כ־600 KB, פי 3 מקו הבסיס הקיים הגדול ביותר, שהיה משתנה בכל PR של i18n.

יש שתי דרכים לעמוד בדרישותיו:

1. לעדכן את התרגומים המושפעים, או
2. להגדיר אותם כ־`__MISSING__:<new english>` — לאחר מכן, בזמן הריצה, תוצג האנגלית המתוקנת
   (`src/i18n/request.ts::deepMergeFallback`, #7258) והמפתח ייכנס לתור לתרגום.

אם **משמעות** המחרוזת השתנתה, עדיף **לשנות את שם המפתח**: מפתח חדש אינו יכול לרשת
תרגום מיושן. זהו הדפוס שבו השתמש #8463.

```bash
npm run i18n:check-value-drift          # מחמיר (זה מה שמופעל ב-CI)
npm run i18n:check-value-drift:warn     # דיווח בלבד
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

שערי היסחפות-הערכים והמפתחות-החדשים חולקים השוואה בלתי ניתנת לשינוי אחת מתוך
`scripts/i18n/resolve-ui-diff-base.mjs`. תהליך העבודה מעביר לשתי הבדיקות את אותם ערכי SHA של הבסיס, קצה-הבסיס
והמועמד. הרצות של PR או שינוי בסיס ה-PR, ‏push ו-merge-group משתמשות בהקשר האירוע שלהן.
הפעלת ענף מועמד מחייבת את ה-PR הפתוח המדויק שלו או את הקלט המפורש
`i18n_base_sha`. הפעלה ידנית או תצפית מתוזמנת על `main` או על `release/vX.Y.Z`
ללא קלט זה משווה את ה-commit האחרון להורה הראשון שלו; אין זו ביקורת של
כל חוב התרגום שעבר בירושה. הפעלה מקומית מחייבת בסיס השוואה מפורש,
לדוגמה פקודת `BASE_REF` שלעיל.

הקשר השוואה חסר או דו-משמעי, קטלוג נדרש שאינו קריא או אינו תקין,
ומועמד שהשתנה מפיקים `INCOMPLETE` עם קוד יציאה **2**, גם במצב אזהרה.
קריאת קטלוגים משתמשת ב-`scripts/i18n/read-ui-catalog.mjs`; כשלים בקריאה אינם מוחלפים
באובייקטים ריקים. בסיס שאינו זמין או קלט חלקי אינם קובעים תוצאת PASS.

### משימה: `i18n`

מטריצת אימות i18n מלאה (משימה אחת לכל אזור). המשימה כולה היא לייעוץ בלבד.

| סקריפט                          | מאמת                  | חוסם                                                   |
| ------------------------------- | --------------------- | ------------------------------------------------------ |
| `validate_translation.py quick` | שלמות התרגום בכל אזור | **לייעוץ בלבד** (`continue-on-error: true` בכל המשימה) |

### משימה: `pr-test-policy`

מופעלת בבקשות משיכה בלבד.

| סקריפט                 | מאמת                                                                                                                             | חוסם |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `check:pr-test-policy` | בקשות משיכה שמשנות קוד ייצור ב־`src/`, ב־`open-sse/`, ב־`electron/` או ב־`bin/` חייבות לכלול או לעדכן בדיקות (כלל קשיח #8)       | כן   |
| `check:test-masking`   | קובצי בדיקות שהשתנו אינם מפחיתים את מספר הטענות נטו ואינם מוסיפים טאוטולוגיות מסוג `assert.ok(true)`                             | כן   |
| `check:pr-evidence`    | גוף בקשת המשיכה מצטט ראיות מבדיקות/VPS עבור השינוי (ממכן את כלל קשיח #18 באמצעות חיפוש בטקסט בקשת המשיכה — שביר, ראו צבר משימות) | כן   |

### משימה: `test-vitest`

דורש את משימת הסיווג `changes`. פלחי המטריצה הרלוונטיים חוסמים מיזוג במקרה של כשל.

| חבילה            | מה היא מאמתת                                        | חוסמת                                                                                       |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `test:vitest`    | שרת MCP‏ (110 כלים), autoCombo, מטמון — מריץ vitest | כן                                                                                          |
| `test:vitest:ui` | בדיקות רכיבי ממשק משתמש — מריץ vitest               | **חוסמת** — כשלים קיימים מוחרגים במפורש ב-`vitest.config.ts`; כשלים חדשים מכשילים את המשימה |

### תהליכי עבודה ליליים (מתוזמנים, לייעוץ בלבד)

אלה מופעלים לפי לוח זמנים של cron (וכן באמצעות `workflow_dispatch`), ולעולם לא בבקשות משיכה. כולם לייעוץ בלבד.

| תהליך עבודה            | מה הוא מאמת                                                                                                                                             | חוסם            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | בדיקות מאפיינים של fast-check עם seed אקראי ומספר הרצות גבוה                                                                                            | **לייעוץ בלבד** |
| `nightly-resilience`   | סף גידול heap, הזרקת תקלות כאוטית, בדיקות עומס/שהייה ממושכת של k6                                                                                       | **לייעוץ בלבד** |
| `nightly-llm-security` | מגן הזרקות של promptfoo (מצב חסימה) + גששי garak (מדולגים ללא סוד של ספק)                                                                               | **לייעוץ בלבד** |
| `nightly-schemathesis` | בדיקות fuzzing לחוזה OpenAPI‏ (schemathesis) מול מופע OmniRoute פעיל באמצעות `docs/openapi.yaml` — חושפות הפרות מפרט / שגיאות 500 שלא טופלו (שלב 8 B.4) | **לייעוץ בלבד** |
| `nightly-mutation`     | ציון בדיקות מוטציה של Stryker עבור מסלול בדיקות היחידה המהיר — מוטנטים ששורדים חושפים אסרטים חלשים                                                      | **לייעוץ בלבד** |
| `nightly-compat`       | מטריצת תאימות למנוע Node בכל טווחי `engines.node` הנתמכים                                                                                               | **לייעוץ בלבד** |

נתוני הבסיס של הביצועים (heap,‏ TTFB, זמן בנייה) מתועדים, אך אינם משמשים כתנאי סף: ראו [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## שלב המהירות (2026-08-30 → v4.0 LTS): כל קו בסיס הוקל ב-20%

החלטת הבעלים (2026-08-30): עד למודולריזציה של v4.0, מהירות ההפצה חשובה יותר
משמירה על רמת החוב. כל קו בסיס **מספרי** של מנגנון ההידוק הוקל ב-20% במהלך
אחד הניתן לביקורת, והשלב מוצהר ב-`config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| מה השתנה                                                                                                                                                                             | היכן                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — ספירות שבהן נמוך יותר עדיף ×1.2, אחוזים שבהם גבוה יותר עדיף ÷1.2 (רצפת הכיסוי נשארה 60, ‏`eslintErrors` נשאר 0, ‏`eslintWarnings`‏ 0 → 20% ממספר ההשתקות המוקפא) | `quality-baseline.json` (הערת `_relax_velocity_2026_08_30` מפרטת כל ערך לפני → אחרי)                   |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                     | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, כל תקרת שורות של `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                | `file-size-baseline.json`                                                                              |
| ספירות לכל קובץ / לכל קוד TS ×1.2                                                                                                                                                    | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD`‏ 36 → 30                                                                                                                                                                 | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` הופך להמלצה כל עוד `_policy.requireTighten === false`                                                                                                            | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| הרצת `bank-ratchet-shrinks` הלילית מושהית (היא הייתה מקבעת את הצמצום שנמדד ומבטלת את מרווח הביטחון)                                                                                  | `.github/workflows/nightly-release-green.yml`                                                          |

רשימות ההיתרים (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **אינן** תקציבים ולא שונו. שערי המדיניות מסוג עובר/נכשל (סודות, כללי SQL,
חוזה תיעוד/סביבה, תאימות i18n, בדיקות יחידה) לא השתנו — בדיקה אדומה עדיין נשארת אדומה.

**כלים**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ההקלה
  החד-פעמית (`scripts/quality/relax-baselines.mjs`); מסרב לפעול פעמיים עם אותה
  הערה.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  מודד כל שער מספרי באותו אופן שבו CI עושה זאת ומציג את מרווח הביטחון שנותר לכל שער
  (`scripts/quality/baseline-headroom.mjs`). משימת `baseline-headroom` הלילית מפרסמת
  את הטבלה בסיכום הרצת תהליך העבודה ומעלה את דוח ה-JSON/Markdown שלה בשם
  `baseline-headroom-<run_id>`, הנשמר למשך 90 יום. שורות אזהרה ושורות קריטיות מזהות שערים
  שנמצאים בטווח של 10% מהתקרה שלהם או שכבר חרגו ממנה. יש לסקור דוחות אלה כהתרעה מוקדמת לכך
  שהתקציבים מנוצלים; יש לבדוק את הערות `_rebaseline_*` של השער הבעייתי. המשימה כבר אינה
  יוצרת או מעדכנת סוגיה קבועה; #12149 משמרת את היסטוריית הדוחות הקודמת.

**מצב קוד חדש (Clean-as-You-Code) — מאז 2026-08-30, במסלול המהיר של PR בלבד**

באירועי `pull_request`, הקובץ `quality.yml` מעביר את `--base-ref <PR base SHA>` אל `check:file-size`,
‏`check:complexity-ratchets` ו-`check:dead-code`. עבור `check:complexity-ratchets` ו-
`check:dead-code`, השער משווה את HEAD מול בסיס המיזוג, **מוגבל לקבצים שבהם ה-PR
נגע** (`scripts/check/newCodeMode.mjs`: בסיס המיזוג ממומש בתוך
`git worktree` זמני, ESLint/knip מורצים שם ועל HEAD, והספירות לכל קובץ מושוות):

- **חוסם** — ה-PR הוסיף הפרות של מורכבות ציקלומטית/קוגניטיבית או ייצואים מתים בקבצים ששינה
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` ביומן);
- **ייעוץ** — הסכום הכולל הגלובלי לעומת קו הבסיס המוקפא. סטייה שעברה בירושה לעולם אינה מכשילה
  PR חף מפשע; הסטייה מתועדת לתיקון במהלך התאמת הגרסה ונמצאת במעקב של
  משימת מרווח הביטחון.

`check:file-size` משתמש בהפניית הבסיס לפי הכללים שלו (`scripts/check/check-file-size.mjs`, #8522):
הוא בודק כל קובץ מקור ובדיקה בעץ, קורא את מספר השורות של כל אחד מהם בבסיס ה-PR
באמצעות `git show`, ומכשיל קובץ רק כאשר הוא גדל מעבר לערך הגבוה מבין תקרת קו הבסיס שלו
(`frozen` / `testFrozen`, או `cap` / `testCap` עבור קובץ שמחוץ לקו הבסיס) לבין גודלו
בבסיס. לכן, קובץ שכבר סטה בבסיס לעולם אינו מאדימ PR שאינו אשם.

`check:boundary:ratchet` מחיל את אותו כלל על המספר היחיד שלו
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): באירועי PR, גם שערי הבדיקה המהירים של
`quality.yml` וגם משימת ה-lint של `ci.yml` מעבירים את ה-SHA של בסיס ה-PR, קומיט הבסיס
נמדד מייצוא של `git archive`, וה-PR נכשל רק כאשר מספר הקשתות מסוג `open-sse → src`
עולה על הגבוה מבין `metrics.boundaryOpenSseToSrc` לבין המספר בבסיס. סטייה של הבסיס
מעל לתקרה מדווחת (`base drift herdado`), אך לעולם אינה מכשילה PR תקין; push → main
ממשיך להשתמש בתקרה המוחלטת, ו-SHA בסיס שאינו ניתן לפענוח חוזר אליה עם אזהרה.

הרצות `workflow_dispatch`, סריקת ה-release-green ומשימת מרווח הביטחון הלילית אינן כוללות בסיס PR
וממשיכות להשתמש בהשוואה המוחלטת (הגלובלית). כיסוי, כפילויות וכיסוי טיפוסים נשארים גלובליים
לעת עתה (הכלים שלהם אינם מפיקים diff לפי קובץ בעלות נמוכה) — מועמדים לאותו טיפול.

**סגירת השלב ב-v4.0‏ (LTS = מחמיר יותר מבעבר, לא "חזרה לשגרה")**

1. בקצה הנקי של `release/v4.0.0`: הפעילו `npm run quality:headroom --json` לצורך התיעוד, ולאחר מכן
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, ואת
   `--update` של כל שער typecheck — כל ערכי הבסיס יורדים לערך שנמדד.
2. מחקו את `_policy` מתוך `quality-baseline.json` (מפעיל מחדש את `--require-tighten` ואת צבירת
   מרווח הביטחון הלילית), והחזירו את `THRESHOLD = 36` (או יותר) בתוך `check-openapi-coverage.mjs`.
3. החמירו מעבר לערך שנמדד במקומות שבהם המודולריזציה השתלמה: החזירו את `cap` של גודל הקובץ ל-1000
   (או 800), העלו את ספי הכיסוי ב-5, והגדירו 0 ייצואים מתים עבור החבילות שעברו מודולריזציה.

## קו בסיס מתקדם (`quality-baseline.json`)

מנוע הקו המתקדם (`scripts/quality/check-quality-ratchet.mjs`) קורא את `quality-baseline.json`
ומשווה אותו מול `quality-metrics.json` שנאסף זה עתה. כל מדד שנסוג
מעבר לאפסילון שלו מכשיל את הבנייה.

המדדים הנעקבים כעת:

| מדד                   | כיוון  | משמעות                        |
| --------------------- | ------ | ----------------------------- |
| `eslintWarnings`      | `down` | אסור שמספר אזהרות ESLint יגדל |
| `coverage.statements` | `up`   | אסור שכיסוי המשפטים יפחת      |
| `coverage.lines`      | `up`   | אסור שכיסוי השורות יפחת       |
| `coverage.functions`  | `up`   | אסור שכיסוי הפונקציות יפחת    |
| `coverage.branches`   | `up`   | אסור שכיסוי הענפים יפחת       |

כדי לעדכן את קו הבסיס לאחר שיפור אמיתי:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

הדגל `--update` כותב את הערכים הנוכחיים שנמדדו אל `quality-baseline.json`.
יש לבצע commit לקובץ זה לצד השינוי ששיפר את המדד. PR שמשפר
מדד בלי לעדכן את קו הבסיס ייתפס על ידי `--require-tighten` (שלב 6A.5,
בהמתנה למימוש).

### הקו המתקדם של CodeQL: תדירות הרענון והפעלה ידנית

`check:codeql-ratchet` קורא **את מצב המאגר, שמתעדכן לפי לוח זמנים — ולא עבור כל PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` מדווח
`state: configured`, `schedule: weekly`: זוהי סריקת ברירת המחדל של GitHub, ולא ניתוח בכל push.
כתוצאה מכך, לאחר מיזוג PR שמתקן התראות, הקו המתקדם ממשיך לקרוא
את הספירה הישנה והגבוהה יותר עד להפעלת הסריקה המתוזמנת הבאה — ולכן הוא מדווח על נסיגה
בכל PR פתוח, לרבות PR-המשך של ה-PR המתקן עצמו, עד שהסריקה משלימה את הפער.

**רענון ידני**: `gh workflow run codeql.yml --ref release/vX.Y.Z` מריץ מחדש את
הניתוח ומפרסם מחדש את ההתראות בתוך דקות. יש לקרוא תחילה את `.github/workflows/codeql.yml`
— הכותרת שלו מסבירה שהוא מיועד ל-`workflow_dispatch` בלבד **מפני שהוא מתנגש עם
"הגדרת ברירת המחדל" של GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). שחזור הטריגרים `push`/`pull_request`/
`schedule` מחייב תחילה **פעולה של הבעלים**: הגדרות → אבטחת קוד →
CodeQL: ברירת מחדל → מתקדם. אין להוסיף טריגר `schedule:` ללא המעבר הזה — הוא
רק ייצור הרצות כושלות.

**יש להדק את קו הבסיס לאחר שהספירה יורדת** — `node scripts/check/check-codeql-ratchet.mjs
--update` כותב את הספירה החדשה שנמדדה אל `quality-baseline.json` →
`metrics.codeqlAlerts.value`, כדי שהקו המתקדם לא יאפשר בשקט נסיגה חזרה
אל התקרה הישנה. דוגמה מעשית (2026-09-02/03): PR #12502 תיקן 7 התראות אמיתיות
(13 → 6 פתוחות לפי המדידה); PR #12530 הידק את קו הבסיס הקפוא מ-11 → 6 כדי שיתאים; לאחר מכן
6 ההתראות הנותרות נדחו, עם הנמקה לכל התראה, עד ל-0 פתוחות.

**דחיות נתונות להחלטת המפעיל (כלל קשיח #14)** — לעולם אין לדחות התראת CodeQL
מבלי לתעד את ההצדקה הטכנית בהערת הדחייה: `won't fix` עבור
דרישה של פרוטוקול חיצוני, `used in tests` עבור רכיב בדיקות, `false positive`
עבור מנגנון טיהור ש-CodeQL אינו יכול לזהות (תקדים: `docs/security/ERROR_SANITIZATION.md`).

---

## מדיניות ניסיונות חוזרים לבדיקות (WS5.4, v3.8.49)

הניסיון החוזר מוגדר לכל runner בנפרד, ולעולם אינו מדיניות גורפת כללית — מדיניות גורפת של ניסיונות חוזרים הופכת רגרסיות אמיתיות
לתקלות אקראיות בלתי נראות:

| Runner           | מדיניות                                                                                                        | מדוע                                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` ב-CI בלבד, עם `trace: on-first-retry`                                                             | תזמון הדפדפן/הרשת הוא באמת לא דטרמיניסטי; ניסיון חוזר אחד עם trace הופך תקלה אקראית לארטיפקט שניתן לאבחן |
| Vitest           | ללא ניסיון חוזר גלובלי. בדיקה שהוכח כי היא אקראית מקבלת ניסיון חוזר מפורש ברמת הבדיקה (גלוי ב-diff ונבדק ב-PR) | משאיר את רשימת ההסגר ב-repo, ולעולם לא אטומה                                                             |
| node:test (unit) | ללא ניסיון חוזר, אף פעם                                                                                        | בדיקת יחידה אקראית היא באג בבדיקה — תקנו אותה, אל תטילו את הקוביות מחדש                                  |

יעדי ה-SLO לאחר שטלמטריית התקלות האקראיות תושק (WS5.2/5.3): שיעור תקלות אקראיות של <1% לכל בדיקה
(סף "לתקן עכשיו"), שיעור הצלחה של ≥95% לכל pipeline. ערכי ייחוס מהתעשייה —
יש לכייל מחדש לפי המדידות שלנו.

## סטיית Ratchet ברמת ה-Release (WS5.5, v3.8.49)

כאשר ratchet (גודל קובץ, מורכבות, אזהרות eslint) עובר רגרסיה בקצה ה-PURE של ה-release
— כלומר, ה-COMBINATION של המיזוגים גרם לרגרסיה, ואף PR יחיד אינו משחזר את
הרגרסיה בענף שלו — התיקון באחריות **אחראי ה-release, פעם אחת, בענף
ה-release**: יש להעדיף חילוץ/refactor; יש לקבוע baseline מחדש רק בצירוף רשומת
הצדקה מתועדת. לעולם אין להעביר סטיית שילוב ל-PR של תורם, ולעולם אין
לקבוע baseline מחדש לכל PR (הדבר מסתיר רגרסיות אמיתיות). תחילה יש להבחין בין המצבים: שחזרו את
המצב האדום מול הקצה הטהור ב-probe worktree לפני שתניחו שה-PR שלכם גרם לו.

## הפקדת הקטנות Ratchet — הכיוון כלפי מטה (#8584)

ה-ratchet אוטומטי רק למחצה, ודווקא המחצית הלא נכונה. **העלאת** תקרה היא
עריכת JSON ידנית שאורכת עשר שניות, והיא הדרך המהירה ביותר לשחרר PR אדום.
**הנמכת** תקרה דורשת שמישהו יריץ `--update` ויבצע commit לתוצאה — ועד
שה-job בשם `bank-ratchet-shrinks` הושק, אף workflow לא הריץ זאת. התוצאה שנמדדה
(2026-07-25): 18 קבצים מוקפאים כבר נמצאים בתקרת 800 השורות לקובץ חדש או מתחתיה, והמקרה הגרוע ביותר
הוא פי 132 (`src/shared/validation/schemas.ts`, עם 19 שורות ותקרה של 2,523); תקרת
המורכבות עלתה מ-`1794 → 2169` לאורך כ-37 הערות rebaseline, עם ירידה אחת בדיוק
(−1); וההנחיה "להדק באמצעות `--update` במחזור הבא" נכתבה 31 פעמים וקוימה
פעם אחת. תקרה שממשיכה להתקיים לאחר הקוד שבגינו נוצרה ממירה בשקט כל
פירוק שהושלם למכסת צמיחה עבור מי שיערוך את הקובץ בהמשך.

`nightly-release-green.yml` → ה-job בשם **`bank-ratchet-shrinks`** סוגר את המעגל:

|        |                                                                                                        |
| ------ | ------------------------------------------------------------------------------------------------------ |
| רץ בעת | `schedule` (3 פעמים ביום) + `workflow_dispatch` — בכוונה **לא** בעת `push`                             |
| מודד   | את `release/vX.Y.Z` הגבוה ביותר, עם אותה רזולוציה ואותו injection guard כמו `release-green`            |
| כותב   | `check:file-size --update` ו-`check:complexity-ratchets --update` (שניהם מאפשרים רק הקטנה מעצם הגדרתם) |
| מאמת   | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                               |
| מספק   | PR יחיד ועדכני תמיד מול ענף ה-release — מתעדכן בכפייה ולעולם אינו יוצר ספאם                            |

ההפקדה מתבצעת באצווה ולא בכל push, משום שאין לה דרישת השהיה (הפקדת הקטנה
בתוך 8 שעות היא מספקת), בעוד שהרצה בכל merge הייתה בונה מחדש את ענף ה-PR שוב ושוב
במהלך מסעות מיזוג ומשלמת בכל פעם את העלות של מעבר ESLint מלא. הזיהוי נשאר בעת
push (`release-green`); רק ההפקדה מתבצעת באצווה.

### מאמת הבטיחות

ה-job כותב ל-baselines ללא השגחה, ולכן `verify-ratchet-bank.mjs` הוא שהופך
זאת לקביל. הוא משווה את עץ הקבצים לאחר `--update` מול `HEAD` ו**מבטל את ה-job
לפני שקיים commit כלשהו** — מבלי לפתוח PR — אלא אם כל שינוי הוא אחד מאלה:

- ערך מספרי של `frozen` / `testFrozen` ש**הונמך** או **הוסר**
- `complexity-baseline.json` → `count` ש**הונמך**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` ש**הונמך**

כל דבר אחר נכשל: העלאת מספר, הוספת רשומה, שינוי `cap`/`testCap`, או
מחיקה/שכתוב של הערת `_rebaseline_*` (הערות אלה הן נתיב הביקורת המסביר מדוע כל
תקרה קיימת, והן נשמרות בתוך אותו אובייקט `frozen` שבו נמצאות רשומות הקבצים).
bot שיכול להעלות תקרה יהיה גרוע משמעותית מהמצב הקיים. הגנת רגרסיה:
`tests/unit/verify-ratchet-bank.test.ts`.

ה-job לעולם אינו מבצע push אל `release/*` — אדם ממזג את ה-PR, כך שמדידה שגויה
אינה יכולה להיכנס ללא בדיקה.

## מדיניות רשימת היתרים

כל שער שאינו יכול להיכשל עקב הפרות קיימות מראש משתמש ברשימת היתרים קפואה
(לדוגמה, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). המדיניות היא:

**תקנו את גורם השורש; השתמשו ברשימת ההיתרים רק כאשר ההפרה הייתה קיימת מראש
ולא ניתן לתקנה באותו PR.**

בעת הוספת רשומה לרשימת היתרים:

1. כללו הערה עם ההצדקה.
2. הפנו לבעיית המעקב (לדוגמה, `// #3498 — Phase 2 feature, not yet implemented`).
3. הסירו את הרשומה באותו PR שמתקן את ההפרה — רשומה מיושנת שכבר אינה
   מדכאת הפרה פעילה היא כשלעצמה פגם (אכיפת הרשומות המיושנות של 6A.3
   תכשיל את השער עקב רשומה מיותמת ברשימת ההיתרים לאחר שתמומש).

**אל** תוסיפו רשומות לרשימת ההיתרים כדי לגרום לבדיקות לעבור מהר יותר. שער ירוק לצד רשימת
היתרים שהולכת וגדלה יוצר תחושת איכות כוזבת.

### כאשר שער נכשל ב-PR שלכם

1. **קראו היטב את פלט השער** — הוא מציין בדיוק איזה קובץ או סמל הפר
   את הכלל.
2. **תקנו את ההפרה** — רוב השערים הם בדיקות דטרמיניסטיות של מערכת הקבצים, שעוברות ברגע
   שהקוד תקין.
3. **אם ההפרה הייתה קיימת מראש** (כלומר, אתם לא יצרתם אותה, אך כעת השער
   מכסה אותה): הוסיפו רשומה לרשימת ההיתרים עם הערת הצדקה והפניה לבעיית מעקב.
4. **אם השער הוא מחגר** (כיסוי, אזהרות ESLint, כפילויות, מורכבות):
   השינוי שלכם הרע את המדד. תקנו את הבעיה הבסיסית, או (לעיתים נדירות) הריצו
   `npm run quality:ratchet -- --update` אם השינוי מכוון וההרעה במדד
   מקובלת — אך תעדו את הסיבה בתיאור ה-PR.
5. **שערי ייעוץ** (`continue-on-error: true`) נועדו למידע — הם אינם חוסמים
   מיזוג, אך מופיעים בסיכום ה-CI. תקנו אותם בכל זאת.

---

## הוספת שער חדש

1. צרו את `scripts/check/check-<name>.mjs` (או `.ts`). שערי מדיניות מסתיימים בקוד 0/1.
   שערים בסגנון מחגר פולטים מדד אל `quality-metrics.json` באמצעות `collect-metrics.mjs`.
2. הוסיפו את `"check:<name>": "node scripts/check/check-<name>.mjs"` אל `package.json`, וכן
   סנכרנו את הכינוי ואת הפקודה המדויקת שלו ב־`config/quality/gate-manifest.json`.
   בצעו את אותו סנכרון בעת שינוי או הסרה של כינוי אימות קיים.
   הריצו את `npm run check:gate-manifest`; ה־hook של pre-commit וסיווג השינויים ב־CI
   אוכפים חוזה זה.
3. חברו אותו ב-`.github/workflows/ci.yml` תחת המשימה המתאימה
   (מדיניות → `lint` או `docs-sync-strict`; מחגר → `quality-gate`).
4. אם יש לו רשימת היתרים, החילו את `reportStaleEntries()` מתוך
   `scripts/check/lib/allowlist.mjs` כדי שרשומות מיושנות יזוהו אוטומטית.
5. כתבו בדיקה ב-`tests/unit/build/` המכסה את לוגיקת הזיהוי של השער.
6. עדכנו מסמך זה (הוסיפו שורה לטבלת המשימות הרלוונטית).

---

## כלי סוכנים: LSP בתוך הלולאה (הצטרפות לפי בחירה)

מעבר לשערי ה-CI, ‏OmniRoute מספקת תשתית `agent-lsp` **אופציונלית**
(`.mcp.json` ברמת הפרויקט, שלב 7 משימה 15). צרו את `.mcp.json`
כדי לחשוף שרת שפה של TypeScript לסוכני קידוד, כך שהם יפתרו סמלים /
אבחונים **לפני** כתיבת קוד — רכיב משלים ל-`typecheck:core`, בגישת הידור לפני הצהרה,
המצמצם שגיאות של "סמלים מומצאים" במקור. בכוונה הוא אינו נטען
אוטומטית (אתם בוחרים ומאמתים את גשר ה-MCP↔LSP); רשומה פגומה רק מתעדת
שגיאת חיבור ולעולם אינה משבשת הפעלות.

---

## צבר משימות לרציונליזציה (סקירת ROI — שלב 9 גל 3)

מצאי זה הותאם מול `ci.yml` ב-2026-06-17 (בגרסה הקודמת הושמטו
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). סקירת ROI של הרשימה המותאמת
זיהתה את המועמדים הבאים לרציונליזציה. **המיזוגים הם שינויי CI מכניים;
שינויי המצב/ההסרות הם החלטות מדיניות השמורות למפעיל.** דבר מהמתואר להלן
טרם יושם.

**גם הפריטים הבאים אינם מתועדים לעיל** (מייעצים, אות חלש): משימת `docs-lint`
(markdownlint + Vale, כל המשימה עם `continue-on-error`) ותהליכי העבודה העצמאיים של הסורקים
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. הערך `semgrepFindings: 0` נמצא
ב-`quality-baseline.json`, אך אינו מחובר למחגר חוסם ב-`ci.yml` — המדד
יתום כעת.

### מיזוג / הסרת כפילויות (מכני, סיכון נמוך יותר)

כל מועמד אומת מול מצב השערים הפעיל ב-2026-06-17 (אמון תוך אימות);
התברר שכמה מיזוגים "ברורים מאליהם" מסתירים חוב, ולכן הם **אינם** תחליפים ישירים ונקיים.

- **`check:docs-sync` רץ פעמיים** — באופן עצמאי במשימת `lint` ושוב בתוך `check:docs-all` (`docs-sync-strict`) וב-hook של husky לפני commit. ✅ **בוצע** — ההפעלה העצמאית ב-`lint` הוסרה.
- **סריקת CVE** — ❌ **לא מדובר במיזוג נקי.** `audit:deps` חוסם התראות קריטיות וביקורות לא שלמות בכל חמשת קובצי הנעילה, ובהתאם למדיניות הנוכחית מדווח על התראות ברמת חומרה גבוהה כאזהרות; `check:vuln-ratchet` (osv) נכשל רק במקרה של _נסיגה_ ביחס לקו הבסיס שהוכנס למאגר, ודוחה מדידות חסרות כאשר הן נדרשות. הסמנטיקה שונה — הסרת `audit:deps` תבטל את השער הקריטי המוחלט ואת אישורי ביקורת החבילות העצמאיים. יש להשאיר את שניהם.
- **זיהוי מחזורים** — ✅ **בוצע** (#15159 G-01/G-02). הטקסט הישן כאן תיאר את `check:cycles` כשער "הירוק והאצור", והצדיק את השארתו כחוסם משום ש-`check:circular-deps` (dpdm) דיווח על 91 מחזורים. הירוק הזה היה **ירוק כוזב**: `check:cycles` סרק 5 תתי-ספריות (450 קבצים), התאים רק ל-`import|export … from` סטטיים, והשמיט כל מציין `@/` ו-`@omniroute/open-sse/`, כך שלא היה מסוגל לזהות את מחזורי הייבוא הדינמי והכינויים ששלטו במאגר. תוקן: השער עובר כעת על `src` + `open-sse` (5023 קבצים), אוסף מציינים מה-AST של TypeScript (כך ש-`import("…")` נספר ואילו `typeof import("…")` במיקום של טיפוס אינו נספר), ופותר `paths` של tsconfig. הוא מוצא **14** מחזורים, לא 0. מכיוון שלא ניתן לתקן 14 מחזורים קיימים מראש במסגרת PR של שער, `check:cycles` הוא כעת **מחגר** (`--ratchet`, תקרה `metrics.cycles.value = 14` ב-`quality-baseline.json`,‏ `direction: down`) — הוא חוסם כל _נסיגה_, והספירה יכולה רק לרדת. ב-CI מופעל `npm run check:cycles:ratchet`. צמצום החוב מתבצע במסגרת **A-01**. `check:circular-deps` (dpdm) נשאר מייעץ כחוות דעת שנייה ורחבה יותר.
- **מורכבות** — ✅ **בוצע** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): מעבר ESLint אחד, עם ספירה לפי ruleId כך שקווי הבסיס של מורכבות ציקלומטית + מספר שורות מרבי ושל מורכבות קוגניטיבית נשארים עצמאיים; `check:complexity` / `check:cognitive-complexity` הנפרדים נשארים לצורך `--update` מקומי.
- **מניעת הזיות ב-`/api`** — ✅ **בוצע** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): מצאי FS יחיד של `src/app/api`; ‏openapi-routes + docs-symbols עדיין מדווחים בנפרד; הבדיקות הנפרדות נשארות להרצות מקומיות.
- **`check:node-runtime` רץ ב-11 משימות** — ⚠️ **ROI נמוך.** כל אחת מהן משתמשת ב-runner נפרד והבדיקה אורכת פחות משנייה; החיסכון הכולל הוא כ-10 שניות, במחיר אובדן מנגנון הגנה זול לכל משימה. לא שווה את הטלטלה.
- **`typecheck:noimplicit:core` ב-lint של CI** — ✅ **הוסר ממשימת lint** (היה מייעץ עם `continue-on-error`); משטח הטיפוסים החוסם הוא `typecheck:core` + `check:type-coverage`. הסקריפט המקומי נשמר.

### שינוי מצב / החלטה (מדיניות מפעיל)

- `check:openapi-security-tiers` (מייעץ) — ❌ **לא ניתן להפוך אותו לנאכף באופן נקי.** הוא מסיים עם 0, אך מזהיר שכמה נתיבי `traffic-inspector` תחת `LOCAL_ONLY_API_PREFIXES` חסרים את ההערה `x-loopback-only: true`. אכיפתו מחייבת תחילה להוסיף את ההערות האלה ל-`openapi.yaml`.
- `typecheck:noimplicit:core` (מייעץ) — נכלל ברובו במחגר החוסם `check:type-coverage`. יש להפוך אותו למחגר או להסיר את מעבר ה-`tsc` השני והמיותר.
- `test:vitest:ui` (כעת **חוסם**) — כשלים קיימים מראש מוחרגים במפורש ב-`vitest.config.ts` באמצעות הערות המעקב `// #8618`; כשלים חדשים מכשילים את המשימה.
- `check:secrets` (gitleaks, מחגר חוסם) — התקרה הנוכחית היא `metrics.secretFindings` ב-`quality-baseline.json`. כל חריגה מחייבת רשומה מוצדקת ב-`.gitleaks.toml`; מדידה שאינה זמינה היא INCOMPLETE. הסריקה משלימה את סריקת הסודות המובנית של GitHub ואת `check:public-creds`.
- `check:pr-evidence` (חוסם, מבצע grep בטקסט החופשי של גוף ה-PR) — סיכון גבוה לחיוביים כוזבים; הסרתו מחלישה את האכיפה של כלל קשיח מס' 18, ולכן זו החלטת מדיניות אמיתית.
- `semgrep` (עצמאי ומייעץ) — חופף ל-CodeQL במשפחות OWASP; יש לחבר את קו הבסיס שלו למחגר או להסירו.

---

## תיעוד קשור

- שרשרת אספקה (מקור, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — שער שוויון בין קבוצות מפתחות

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, משימה `i18n-ui-coverage`).
משווה את קבוצת מפתחות העלה של כל `src/i18n/messages/<locale>.json` לזו של `en.json` ונכשל
אם חסר מפתח עלה כלשהו או קיים מפתח עודף, ללא תלות במועד שבו המפתח נוסף. מצייני המיקום
`__MISSING__:` נחשבים קיימים (התוכן שלהם הוא עניינו של שער היחס). זהו המשלים המוחלט
של שני השערים מבוססי ההבדלים/האחוזים: `check-ui-keys-coverage` אוכף סף מינימום של 80 % לכל
שפה (גם כשחסרים 43 מפתחות מתוך כ־13,000, עדיין מתקבלת קריאה של 99.7 %), ו־`check-new-key-coverage` בוחן
רק את המפתחות ש־PR מוסיף ל־`en.json`. אצוות שפות נוצרת מ־`en.json` כפי שהיה ביום
שבו נוצר הענף שלה, וממשיכה בתרגום במשך ימים בזמן שבענף הבסיס ממשיכים להוסיף מפתחות; ה־PR של האצווה אינו מוסיף
אף מפתח בעצמו, ולכן שני השערים המקבילים נותרו שקטים כאשר אצווה 1 (#13044) מוזגה עם חוסר של 43 מפתחות בתשע
שפות, ואצווה 2 (#13660) עם חוסר של 10 מפתחות בשמונה שפות (2026-09-15). כדי לתקן כשל, הפעילו
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; מפתח עלה המסומן `extra`
מציין שהמקור הסיר אותו — יש למחוק אותו מהשפה. `--warn` מדווח בלי להיכשל.
`--catalog=cli` מפעיל את אותה השוואה על `bin/cli/locales` (`npm run i18n:check-keys:cli`);
שני השלבים נמצאים במשימה `i18n-ui-coverage`.

#### `check-new-key-coverage` — שער i18n למפתחות חדשים

שער מקביל ל־`check-ui-value-drift`. האחרון מזהה ערך באנגלית ש**נכתב מחדש**
בעוד שתרגומיו נותרו ללא שינוי; שער זה מזהה מפתח באנגלית ש**נוסף**
בעוד שחלק מהשפות מעולם לא קיבלו אותו.

`check-ui-keys-coverage` אינו יכול לזהות מקרה מסוג זה: הוא אוכף סף אחוזי לכל שפה, וכאשר
חסרים אחד־עשר מפתחות מתוך כ־13,000, הכיסוי נשאר 99.9%. אחוז לכל שפה אינו יכול
לבטא את העובדה ש"התכונה הזו שוחררה ללא תרגום" — תכונה שלמה יכולה להתווסף לשפה חדשה ללא
טקסט ולא לשנות את הנתון כלל.

התקרית שהוא מקודד: שלב 3 של Orchestration Canvas תרגם את אחד־עשר המפתחות שלו בכל
42 השפות שהיו קיימות באותו זמן. שעות לאחר מכן, אצוות שפות האיחוד האירופי (#13044) הגדילה את המאגר
ל־51 שפות, ותשע השפות החדשות (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) מעולם לא
קיבלו אותם. `deepMergeFallback` מחליף מפתח חסר באנגלית, ולכן מצב הכשל היה
ממשק משתמש לא מתורגם ולא ממשק משתמש ריק — כשל אמיתי, ושקט מעצם התכנון.

בדומה לשער המקביל שלו, הוא **מודע להבדלים**, ומשווה את האנגלית בבסיס המיזוג לעץ העבודה,
כך שפערים קיימים נשארים מוקפאים ולא נדרשה הסבה כדי להפעיל את השער.

**מציין `__MISSING__:<english>` אינו עומד בדרישה (מאז 2026-09-17).** בעבר זו הייתה
דרך הדחייה המתועדת — בזמן ריצה המערכת חוזרת לאנגלית תקינה — עד ששמונה יחידות PR של תכונות
ב־2026-09-16 הוסיפו 61 מפתחות והטביעו את המציין בכל 65 השפות במקום לתרגם: שער זה
אישר את כולן, דבר לא חסם את יחידות ה־PR, ולאחר מכן שער היחס החוסם לתרגומים אמיתיים
נכשל בקצה ענף השחרור עבור כולם (pt-BR 3.2 % > 2.5 % + 0.5). מציין נחשב כעת
לתרגום חסר. כדי לתקן כשל, הפעילו
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, או
את כל השפות במקביל באמצעות `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
בטוח להפעלה מנותקת, ומסרב להתחיל ללא משתני הסביבה `OMNIROUTE_TRANSLATION_*`). מפתח שחייב להישאר
באנגלית (שם מקובע של מוצר/מנוע/דגל) צריך להופיע ב־`scripts/i18n/untranslatable-keys.json`,
ולעולם לא מאחורי מציין. `vi` אוסר מציינים לחלוטין (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — שער בדיקות שהושבתו

קובץ ברשימת `exclude` של `vitest.config.ts` הוא בדיקה שאינה רצה, והוא נראה כמו
כיסוי בדיקות למי שקורא את העץ. שישים ושניים קבצים הצטברו מאחורי ההערה
`// #8618 — pre-existing failure; remove this exclusion when fixed`. תקלה #8618 נסגרה
ב־2026-08-11 בזמן שהרשימה שאחריה עקבה גדלה מ־45 רשומות ל־62, כאשר כל רשומה חדשה ירשה הערה
שהפנתה לתקלה סגורה. כאשר הרשימה נמדדה לבסוף קובץ אחר קובץ (#13204), **51 מתוך 62
עברו מול העץ הנוכחי ללא כל שינוי בקוד המקור**.

השער דורש שכל החרגה שנפתרת לקובץ אמיתי (א) תציין תקלה למעקב וכן
(ב) תופיע ב־`config/quality/vitest-exclusions.json` עם הסטטוס שנמדד עבורה, כך שהוספת החרגה היא
הבדל שניתן לסקירה בקובץ ייעודי, במקום שורה נוספת במערך בן 60 רשומות. בכוונה
הוא אינו מריץ מחדש את הבדיקות שהוחרגו — הדבר אורך כ־10 דקות ושייך למשימה תקופתית;
המצאי מתעד מתי כל אחת מהן נמדדה לאחרונה.
