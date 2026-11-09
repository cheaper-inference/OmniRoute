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

### קבלת מועמד

זרימות העבודה CI ו-Quality Gates כל אחת מוציאות פסק דין יציב: `Gate / CI` ו- `Gate / Quality`. מדיניות הקבלה המנוסחת שלהם מונה כל עבודה במעלה הזרם כנדרש או מייעץ. עבודה נדרשת רלוונטית חייבת להצליח: תוצאות חסרות, בוטלות, דילוג, ממתינות ולא ידועות אינן יכולות להקים PASS. סיווג חוקי של מסמכים בלבד או קטלוג בלבד יכול להפוך את נתיב הקוד לבלתי ישים; טיוטה רגילה אינה PR מקובלת. תווית `hotfix` לא מוותרת על ראיות.

שני זרימות העבודה מכסות PRs לענפי main/release, דחיפות ל- `main`, שיגור ידני ואירועי מיזוג קבוצות. דחיפה, שלח ומיזוג-קבוצה הפעל את הבחירה המלאה. טיוטה מהימנה של תור Mergify מפעילה גם משימות `full-code`/`full-code-e2e` הרלוונטיות; PRs רגיל לדלג עליהם. לפני מיזוג ידני, הפעל שיגור מלא על המועמד המדויק. דחיפות ל- `release/**` אינן מפעילות את זרימות העבודה הללו; שחרור-גרין צופה בבסיס הממוזג בנפרד (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks וקבוצות מיזוג משתמשים ברצים מתארחים עבור עבודות שאחרות בוחרים ברצים שמתארחים בעצמם; יש לאמת קיבולת מתארחת מספקת לפני ההשקה.

PR רגיל מריץ את הבחירה המהירה. נתיבי ה- `full-code` וה- `full-code-e2e` של מדיניות הקבלה (E2E, אינטגרציה, חפצי חבילה, Electron smoke, Bun SQLite, ecosystem ולקוחות פרוטוקול) פועלים רק על טיוטה של תור Mergify או על ריצה מלאה: `gh workflow run ci.yml --ref <branch>`.

כל קבלה JSON מזהה את SHA שהוצא, את זרימת העבודה ואת הניסיון. ה- CLI דוחה חוסר התאמה של checkout/event SHA. מבחני זרימת עבודה מחייבים את החברות במדיניות לרשימת `needs` של עבודת פסק הדין, כך שמסלול חדש או הוסר לא יכול להיעלם בשקט. הקבלות מכסות את זרימת העבודה שלהן, לא פרסום, פריסה או החלק הפנימי של סורק מייעץ קיים. ביצוע הבדיקות הרלוונטיות הנדרשות בכללי הסניף הוא שינוי מנהלי נפרד; הגדרת עבודתם אינה מגינה בעצמה על סניף.

`API Route Typecheck` הוא בדיקת זרימת עבודה עצמאית, מחוץ הן לפסיקות המצטברות והן לפרופיל הסטטי של הצופה המלא המקומי. בדוק את התוצאה שלה בנפרד עבור המועמד המדויק. `.github/workflows/api-route-typecheck.yml` פועל על PRs לתוך `main` או `release/**`, דוחף לכל משפחת ענפים, שיגור ידני ואירועי `merge_group` מסוג `checks_requested`. אין לו מסנן נתיבים. מיזוג קבוצות בדוק את `merge_group.head_sha`; אירועים אחרים בדוק את `github.sha`. כל האירועים משתמשים באותם בדיקות שער אבחנה ויחידות שער API. PR base retargets מבקשים צ'ק חדש; עריכות body/title משתמשות בשם התצפית בלבד `Admission not requested / API Route Typecheck` ואינן יכולות להחליף את בדיקת הקבלה.

### ראיות שמורות במצמצם הקבלה

`scripts/quality/validate-release-acceptance.mjs` מצמצם תוכנית שסופקה ואת
המניפסטים שלה; הוא אינו קובע שהתוכנית מכסה את צינור השחרור המלא.
הדוחות שלו מגדירים במפורש `releaseAcceptance: false`, גם כאשר התוכנית היא
`VERIFIED`. תהליך העבודה `release-acceptance.yml` עדיין משתמש בקיבועי צל, ולא
בקבלות אמיתיות של בנייה, אריזה, אתחול או קידום.

ה-CLI דורש `--evidence-root` כדי לאמת ראיות שמורות. קבצים נפתרים
בתבנית `<evidence-root>/<artifact_id>/<member>` ונגזרים באמצעות SHA-256. רשומת PASS
ללא ראיות, קובץ חסר או שהשתנה, נתיב לא בטוח או קישור סמלי מונעים
אימות. קבצים חסרים אינם שקולים ליומני הצלחה ריקים. בדיקות
SHA/הרצה/ניסיון קיימות נשארות עצמאיות: בתים תואמים אינם יכולים להציל
קבלה מיושנת. תקינות קבצים אינה הוכחה לאותנטיות ההרצה או לקידום ארטיפקטים.

### DAST צורך את תוצר הבנייה המאומת של CI

משימת CI הנדרשת `dast-smoke` קוראת ל־`.github/workflows/dast-smoke.yml` אחרי `build`. היא פועלת לפי אותה בחירה של שינויי קוד וטיוטות כמו הבנייה, לרבות PR נתמכים מפורקים, PR שמכוונים לענף שחרור וקבוצות מיזוג. משימת DAST חסרה, שנכשלה, בוטלה או דולגה באופן בלתי צפוי חוסמת את `Gate / CI`. לתהליך העבודה לשימוש חוזר אין טריגר PR או dispatch עצמאי; אימות ידני משתמש ב־dispatch של CI, כך שהבנייה והצרכן נשארים באותה הרצה.

`scripts/ci/next-build-provenance.mjs` חותם את ארטיפקט Next המלא באמצעות תקציר הגיבוב של tar, המאגר/האירוע/ההרצה, ניסיון המפיק, head/base/checkout/tree, זהויות תהליכי העבודה, lockfile, גרסת Node המדויקת ו־ABI, הפלטפורמה ואורז החבילה. DAST בוחר את מזהה הארטיפקט שאינו ניתן לשינוי מתוך `needs.build.outputs`, דורש אימות תקציר גיבוב של ההורדה ומחשב עצמאית את הגיבוב של ZIP מול תקציר המפיק לפני חילוץ שני הפריטים המותרים באמצעות `scripts/ci/unpack-ci-build.py`. גם המניפסט וארכיון tar חייבים להתאים לפלטים עצמאיים של המפיק לפני חילוץ עץ Next. הוא לעולם אינו מחפש את הבנייה המוצלחת האחרונה של הענף. הרצה חוזרת חלקית יכולה להשתמש שוב באותו ניסיון מפיק כאשר המזהה וכל הקלטים עדיין תואמים; רשומת האסמכתה מתעדת את שני הניסיונות.

הצרכן נשאר על runner מתארח של Linux, עם הרשאת קריאה בלבד למאגר וללא סודות המאגר. הוא מתקין את גרסת Node המדויקת של המפיק ואז מרכיב את CLI באמצעות `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. ‏`scripts/build/standaloneInput.mjs` דוחה שרת standalone חסר לפני כל בנייה חלופית; בניות CLI מקומיות רגילות שומרות על מנגנון החלופה הקיים שלהן. מוכנות השרת, Schemathesis ו־promptfoo חייבים כולם להצליח בתוך מגבלת המשימה שלא השתנתה, 25 דקות. אסמכתת המקור מוכיחה את זהות הקלטים והבתים שלהם, ולא סריקת DAST מוצלחת. פקיעת ארטיפקט, הפרעה ל־runner או סורק שנכשל נשארים ראיות חסרות או כושלות; מעטפת advisory אינה יכולה להפוך אותן ל־PASS.

### קיבולת הרצת ממשק המשתמש

CI מריץ את מלאי ממשק המשתמש המלא כארבעה פלחי מטריצה של `test-vitest`, עם לכל היותר
שני workers בכל פלח ותקרת הזמן הקיימת של 15 דקות למשימה. הפלח הראשון מריץ גם את
חבילת Vitest של MCP/autoCombo. תוצאת המשימה הנדרשת מכסה כל זרוע במטריצה; כשל
או ביטול של פלח אחד אינם יכולים לקבוע קבלת מועמד.

הצופה הלילי שומר קבלה נפרדת של המועמד המדויק עבור כל פלח של ממשק המשתמש,
כולל הרצת MCP בקבלה הראשונה. כל ארבע הקבלות, היומנים וזהויות
ההרצה התואמות נדרשים. `npm run test:vitest:ui` מקומי עדיין בוחר את
החבילה המלאה; הרצה אחת עם `--shard` היא ראיה חלקית בלבד.

### איסוף כיסוי של בדיקות יחידה

שנים-עשר פלחי בדיקות היחידה אוספים כיסוי V8 במהלך הרצת הבדיקות הקיימת שלהם. פלח
שהצליח מריץ את `scripts/ci/compact-v8-coverage.mjs` כדי לדחוס את הקבצים המקוריים בלי ליצור
דוח Istanbul מתווך. משימת Coverage הסופית מאמתת את כל שנים-עשר המניפסטים מול
ה-SHA של המועמד, סביבת הריצה, שורש המקור וגיבובי הנתונים, ואז מריצה את המדווחים של c8 ואת
ספי הכיסוי הקיימים. הקלטים שומרים על סדר שמות הקבצים הגלובלי של c8; מיזוג מקדים לכל פלח אינו בטוח
עבור כיסוי מעורב של פונקציות/בלוקים. פלחים חסרים, פגומים או בלתי תואמים מכשילים את הקבלה.
פלחי בדיקה שנכשלו שומרים בנפרד כיסוי אבחוני גולמי; הוא אינו יכול להיכלל במיזוג הסופי.

### אישורי התקדמות של הרצת בדיקות יחידה

הפקודה המשותפת `test:unit:ci:shard` מתעדת את השלבים `primary`,‏ `dashboard` ו-`serial`
באמצעות `scripts/ci/unit-progress-reporter.mjs`. דוח הבדיקות הרגיל נשאר
זמין. אישור נפרד המכיל מטא-נתונים בלבד מתעד את ההתחלה וההשלמה של כל קובץ,
ופעימת לב אחת ל-30 שניות מפרטת את הקבצים שעדיין פעילים ואת הזמן שחלף עבורם. הוא מתעד
רק מטא-נתוני הרצה שברשימת ההיתרים; תיאורי בדיקות, פלט, גופי שגיאות והסביבה
המלאה אינם עוברים סריאליזציה.

מערכת ה-CI שומרת את קובצי ה-JSONL בשם `unit-progress-ci-<run>-<attempt>-<shard>`. פסק זמן של משימה עלול למנוע את ההעלאה המאוחרת;
פעימות לב שכבר נשלחו נשארות כראיות אבחוניות. היעדר פעימות לב עשוי גם להעיד
שתהליך ה-runner חסום או הופסק. אישורים אלה משמרים את בחירת הבדיקות,
המקביליות, מועדי הסיום וסטטוס היציאה הקיימים; הם אינם הכרעות לגבי קבלת מועמדים.

### תור מיזוג

התווית `queue` שולחת PR לתור Mergify (`.mergify.yml`). ‏Mergify פותח PR במצב טיוטה בענף
`mergify/merge-queue/`, ‏CI מריץ שם את הבחירה המלאה, וה-PR המקורי מתמזג
כאשר `Gate / CI`, ‏`Gate / Quality` ו-`Merge integrity (changelog + generated skills)` עוברים בהצלחה.

Mergify כותב את סיכום התור שלו בתיאור הטיוטה, וגם יישומים אחרים יכולים לערוך אותו.
אירוע `pull_request` מסוג `edited` בטיוטה כזו מקבל קבוצת מקביליות משלו
(`-queue-edit-<run_id>`), כך שאינו יכול לבטל את ההרצה האמיתית של הטיוטה, והוא מדלג על השער ועל
המטריצה. רק `Merge integrity` עדיין רץ. למשימת השער שעליה דולג יש שם בדיקה שונה,
מכיוון ש-Mergify מפרש `Gate / CI` שדולג עליו כבדיקה שנכשלה ומוציא את ה-PR מהתור.

לאחר הוצאה מהתור, דחיפה לא תמיד מחזירה את ה-PR לתור. הוסיפו בו את התגובה `@mergifyio queue`.

### מלאי הסריקה הסטטית

מלאי כינויי npm המנוהל בגרסאות והחברות בסריקה הסטטית נמצאים ב-
`config/quality/gate-manifest.json`. הריצו `npm run check:gate-manifest` כדי לאמת
שמות סקריפטים ופקודות מדויקות מול `package.json`; הוספות, הסרות
ושינויים בפקודות מכשילים הן את ה-hook המקומי והן את משימות סיווג השינויים ב-CI.
כינוי אינו משימת תהליך עבודה, מופע מטריצה או מקרה בדיקה: אין
להציג ספירות אלה כאילו הן ניתנות להחלפה זו בזו.

השתמשו ב-`npm run quality:scan -- --list` או ב-`npm run quality:scan:fast -- --list`
כדי לבדוק את הכינויים שנבחרו בלי להריץ אותם. הרץ מפעיל את
נקודת הכניסה של npm, ולכן סביבת הריצה שלה (כולל Bun כאשר הוגדר) נשמרת.
המניפסט מתעד כינויים שמחוץ לפרופילים האלה כמופעלים בנפרד, ופקודות
תחזוקה אסורות בפרופילי סריקה לקריאה בלבד.

פרופילים אלה מכסים את הסריקה הסטטית בלבד. הם אינם מאשרים בדיקות מוצר,
כיסוי, אריזה, בדיקות חיצוניות או את קבלת השחרור המלאה של מועמד.
קבלה בתהליך העבודה משתמשת ב-`config/quality/admission-policy.json` המקושר וב-
`scripts/quality/admission-verdict.mjs`. פרופילי צופה השחרור נשארים נפרדים;
יש לבדוק את הבדיקות והקבלות הרלוונטיות שלהם באופן עצמאי. הפקודות הסטטיות של הצופה המלא
מוצהרות ב-`config/quality/release-green-static-profile.json`, לרבות
`audit:deps`, בחירת בדיקות מוטציה ובדיקות תרגום. הטוען מאמת פקודות npm
מול package.json והצהרות CI/Quality ממודלות; הוא דוחה סטיות
במקום להריץ אסימוני מעטפת כארגומנטים. פלט SKIP/INCOMPLETE של סורק נדרש
אינו יכול לקבוע PASS. הפרופיל מתעד את ההחרגות החיצוניות שלו ואינו מחליף
כיסוי מתארח, מטריצות בדיקה, ראיות אריזה או ראיות פריסה. המלאי המילולי שלהלן
הוא חומר עזר, ולא הוכחה לכך ששער אכן הופעל.

הסקריפטים נמצאים תחת `scripts/check/` (שערי מדיניות) ו-`scripts/quality/` (מנוע ratchet).
מקור האמת של CI הוא `.github/workflows/ci.yml`.

### תקינות תיעוד בסיס שפורסם

`.github/workflows/i18n-base-health.yml` צופה בתקינות התיעוד לאחר דחיפות נבחרות ל- `main` ו- `release/v*`, ובמשלוח ידני. המסננים שלו מכסים תיעוד, שורש Markdown, `llm.txt`, תרגום state/configuration וכלי i18n הרלוונטיים. עבודת `Published base documentation health` היחידה משתמשת באובונטו המתארחת ובדד-ליין של חמש דקות. הוא מבצע אימות לקריאה בלבד וכותב קבלה לאבחון ללא התקנת תלות, תרגום או אימוץ מדינה.

`scripts/i18n/check-base-health.mjs` דורש אפס חוסר עקביות של מקור-hash, חסר יעד, יעד-hash, תרגום מעופש וקטע-מטמון. זה גם מאמת את היקף הליבה הנוכחי document/locale ואת מקורו המתועדים. הקשר לא חוקי, כיסוי לא שלם או בודק שנקטע מייצר `INCOMPLETE`; סחיפה מאושרת מייצרת `FAIL`. שניהם מחזירים סטטוס יציאה נכשל. הקבלה מחויבת לתשלום SHA, זרימת עבודה, הפעלה וניסיון, והיא נשמרת כ- `i18n-base-health-<sha>-<run>-<attempt>`.

זוהי תצפית עצמאית על הבסיס שפורסם. זה לא מוסיף אירוע PR או מיזוג קבוצה, בדיקת PR נדרשת, כינוי npm או חבר פרופיל סריקה סטטית. הבודק הבסיסי גם חוסם את כל חמשת המחלקות במצב אבסולוטי. הכנת PR רגילה נשארת נפרדת מהקבלה. העלאה מוצלחת אינה יכולה להפוך תוצאת בריאות כושלת ל- PASS.

PR רגיל משתמש ב- `--preflight` עם דוח בסיס שנוצר על ידי `--baseline-evidence`. זה עשוי להשאיר מקור באנגלית בהמתנה רק כאשר רשומת התרגום המלאה ובתי היעד בפועל לא משתנים מאותו בסיס בדיוק. חוסר עקביות של יעדים חדשים או קטע-מטמון עדיין חוסמים, וראיות לא שלמות לא יכולות לאשר הכנה. הדוח חושף `preparationPending` ו- `mergeReady` בנפרד: הכנה מוצלחת אינה הופכת תרגומים ממתינים למוכנים למיזוג. רענן את המראות המושפעות במועמד המורכב לפני הקבלה. המועמד המהימן לתור Mergify, `merge_group`, דחיפות סניפים והרצות CI ידניות משתמשים בבודק המוחלט, ללא `--warn` או סליחה על כישלון בירושה. גיבוב יעד חסר והיקף מופחת על ידי קבצי ליבה מוקלטים שנמחקו אינם יכולים להפיק פסק דין מוחלט מוצלח.

### שחרר את הנתיב המהיר PR (`quality.yml`)

`.github/workflows/quality.yml` משלים CI ב- main/release PRs, דוחף ל- `main`, שולח וממזג קבוצות. PRs השתמש בבדיקות מהירות מסוננות נתיב. המבנה הכפול שהושבת לצמיתות הוסר; המחאות build/package/boot האמיתיות נשארות ב- CI. חבילת היחידה וה-vitest פועלים רק ב- CI (`Unit Tests (N/8)` ו- `Vitest`).

| מִשׂרָה                                          | תְחוּם                                                                                                                               | חסימה           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs ו-docs-all                                                                                              | כֵּן            |
| `Fast Quality Gates`                             | קוד PRs; בדיקות סטטיות, בדיקת סוג, בדיקת סוג לוח מחוונים, בדיקות יחידות מושפעות                                                      | כֵּן            |
| `Forgotten sibling tests`                        | קוד PRs; מודולים השתנו לצרכנים סטטיים ולמבחני אחים מועמדים; נתיב חביות וייבוא דינמי מדווחים כאבחון מייעץ, עם חריגים של רשימת ההיתרים | **מְיָעֵץ**     |
| `No new ESLint warnings`                         | קוד PRs; מגן מוך מודע לדיכוי                                                                                                         | כן, כולל מזלגות |
| `Merge integrity (changelog + generated skills)` | PRs לא טיוטה; יומן שינויים וסנכרון מיומנויות שנוצר                                                                                   | כן, כולל מזלגות |

#### דוח בדיקות אחים נשכחות

`npm run check:forgotten-sibling-tests` פועל כשלב מייעץ של `Fast Quality Gates` ומשתמש מחדש בפותר הייבוא מאחורי מפת ההשפעה של הבדיקה. עבור כל מודול ייצור שהשתנה, הוא מדווח על שרשראות `changed module/symbol -> static consumer -> candidate sibling test` דטרמיניסטיות כאשר מבחן המועמד נעדר ב-pull-request diff. סיכום Markdown ותוצאת JSON נשמרים כחפץ זרימת העבודה `forgotten-sibling-tests` לכיול לפני כל השקה חוסמת.

ייצוא חוזר של חבית ויבוא דינמי הם אבחון רזולוציה בלבד; הם אף פעם לא יוצרים ממצא חוסם. חריגים שנבדקו חיים ב- `config/quality/forgotten-sibling-allowlist.json`. כל ערך חייב לתת שם למבחן הצרכן והמועמד, לתת רציונל ספציפי ולקשר סוגיית GitHub או בקשת משיכה. ערכים שגויים נכשלו סגור. חריגים אינם יכולים לדכא מבחן מועמד שנמחק או הבדל שמוסיף `.skip`/`.todo`; היחלשות הטענה ומיסוך אחר נותרו בבעלות שער `check:test-masking` החוסם באופן עצמאי.

### משימה: `lint`

פועלת בכל בקשת משיכה אל `main`. חוסמת מיזוג במקרה של כשל.

| סקריפט (`npm run ...`)            | מאמת                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | חוסם                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `check:node-runtime`              | גרסת Node.js נמצאת בטווח הנתמך                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | כן                                    |
| `check:cycles`                    | ייבואים מעגליים בכל `src/` + `open-sse/` (מבוסס AST, עם פתרון של `paths` מ-tsconfig). ההרצה הבסיסית מסתיימת בקוד 1 בכל פעם שקיים מחזור כלשהו (כשל סגור מאז #15281) ומציגה את רכיבי הקשירות החזקה (SCC). הפקודה `check:cycles:ratchet` (שמופעלת ב-CI) חוסמת כאשר המספר חורג מהתקרה `metrics.cycles` שב-`quality-baseline.json` — כרגע 14, `direction: down`, ולכן הוא יכול רק לרדת (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | כן (מחגר)                             |
| `check:boundary`                  | צימוד `open-sse → src`: ייבואים ייחודיים מקובץ לקובץ מהמנוע אל היישום (`scripts/quality/measure-boundary.mjs`; רשימת הקשתות היא צבר משימות התיקון של פיצול הליבה/המודולים בגרסה 4). ההרצה הבסיסית = דוח מייעץ (זהה ל-`quality:boundary`). הפקודה `check:boundary:ratchet` (שמופעלת ב-CI וגם בלולאת המחגר של השערים המהירים ב-`quality.yml`) חוסמת כאשר המספר חורג מהתקרה `metrics.boundaryOpenSseToSrc` שב-`quality-baseline.json` — אותחלה לערך הנמדד 771, `direction: down`; האפשרות `--update` רק מנמיכה אותה; ביחס לענף הבסיס בבקשות משיכה (`--base-ref`, ראו להלן)                                                                                                                                                                                                                                                                                                              | כן (מחגר)                             |
| `check:route-validation:t06`      | סכמות Zod קיימות בכל הנתיבים (מדיניות שכבה 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | כן                                    |
| `check:any-budget:t11`            | מספר המופעים של `@ts-expect-error // any` אינו חורג מהתקציב (שכבה 11, catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | כן                                    |
| `check:provider-consistency`      | לכל ספק ב-`providers.ts` יש רשומה תואמת ב-`providerRegistry.ts` (ולהפך, במסגרת רשימת ההיתרים)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | כן                                    |
| `check:model-lifecycle`           | שלוש טבלאות הניתוב המתוחזקות ידנית נשארות עקביות עם תמונת המצב של מחזור החיים הנשמרת במאגר (#11503): ‏`FITNESS_TABLE` ‏(`taskFitness.ts`) אינה מעניקה ציון למזהה שיצא משימוש וש-`REGISTRY` יכולה לנתב; כל יעד של `BUILT_IN_ALIASES` קיים ב-`REGISTRY` ואינו מופיע בתמונת המצב של המזהים שיצאו משימוש; כל מזהה שיצא משימוש ועדיין נמצא ב-`REGISTRY` מועבר הלאה או רשום ב-`allowedRetiredInCatalog`; ואף מקור או יעד של `DEFAULT_DEGRADATION_MAP` אינו מופיע בתמונת מצב זו כמזהה שיצא משימוש. בדיקה זו אינה מוכיחה שמודל מסופק כעת על ידי שירות פעיל במעלה הזרם. לא מקוון — מתבצעת השוואה מול `config/quality/model-lifecycle.json`, שמתעדכן ידנית באמצעות `npm run quality:refresh-model-lifecycle` (דורש רשת; אינו משולב ב-CI). ‏`allowedRetiredInCatalog` הוא מנגנון צמצום חד-כיווני: יש להוסיף רשומה רק בצירוף סוגיית מעקב.                                                        | כן                                    |
| `check:fetch-targets`             | כל `fetch("/api/...")` בצד הלקוח תחת `src/` מפוענח לקובץ `route.ts` אמיתי                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | כן                                    |
| `check:deps`                      | כל התלויות שניתן להתקין באמצעות `npm install`, בכל קובצי `package.json` במאגר, נמצאות ב-`dependency-allowlist.json`; חבילות חדשות ללא גרסה מקובעת או חבילות החשודות ב-slopsquatting מסומנות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כן                                    |
| `audit:deps`                      | ביקורת npm לכל חמשת קובצי הנעילה העצמאיים (השורש, Electron, תוספי OpenCode בגרסאות v1/v2 והספק). אזהרות קריטיות חוסמות; אזהרות בחומרה גבוהה נשארות כאזהרות גלויות. ביקורות חסרות או שנכשלו מסומנות כ-INCOMPLETE וחוסמות; גיבובי קובצי הנעילה והדוחות נשמרים לכל תחום.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | כן                                    |
| `check:lockfile`                  | תקינות `package-lock.json` — מאגר https, גיבובי תקינות, ללא דריסות מארח                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | כן                                    |
| `check:licenses`                  | רשימת היתרים של רישיונות SPDX עבור תלויות ייצור                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | כן                                    |
| `check:tracked-artifacts`         | ללא תוצרי בנייה / קישורי `node_modules` מחויבים (רץ גם ב־pre-commit של husky; ‏pre-push קל במכוון — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | כן                                    |
| `check:ai-attribution`            | ללא שורת סיום `Co-Authored-By` של AI/בוט או כותרת תחתונה המעידה על יצירה באמצעות AI ב־commits, בכותרת או בגוף של PR — כלל קשיח #16 (בלולאת השערים המהירים של `quality.yml` עבור PR→`release/**` — קורא את מטען האירוע, ואינו מבצע פעולה מחוץ ל־PRs — וכן שלב ייעודי ל־PR ב־lint של `ci.yml` עבור PR→`main`; גם ה־hook מסוג `commit-msg` של husky; מחברים־שותפים אנושיים מותרים; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | כל החרגת Vitest מציינת סוגיית מעקב ומופיעה ב־`config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | כן                                    |
| `check:file-size`                 | קובצי מקור (`.ts`/`.tsx` תחת `src/`, `open-sse/`, `electron/`, `bin/`) נשארים בגבולות `cap`, וקובצי בדיקה (`*.test.ts(x)`) בגבולות `testCap`; קבצים שהוקפאו ב־`file-size-baseline.json` (`frozen` / `testFrozen`) אינם רשאים לגדול מעבר לגודל המתועד שלהם                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | כן                                    |
| `check:error-helper`              | תגובות שגיאה במבצעים/מטפלים משתמשות ב-`buildErrorBody()` / `sanitizeErrorMessage()` (כלל מחייב מס' #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | כן                                    |
| `check:migration-numbering`       | קובצי SQL של מיגרציות ממוספרים ברצף, ללא פערים או כפילויות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | כן                                    |
| `check:public-creds`              | אין ערכי OAuth מילוליים מסוג `client_id`/`client_secret` או מפתחות Firebase Web מחוץ ל-`publicCreds.ts` (כלל מחייב מס' #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כן                                    |
| `check:db-rules`                  | אין SQL גולמי מחוץ למודולים של `src/lib/db/`; אין ייבואי barrel מתוך `localDb.ts` (כללים מחייבים מס' #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כן                                    |
| `check:known-symbols`             | מבצעי ספקים, אסטרטגיות ניתוב ומתרגמים הרשומים בטבלאות הניתוב שלהם תואמים לקבצים שבדיסק — ללא סמלים יתומים או לא מוצהרים                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | כן                                    |
| `check:route-guard-membership`    | כל נתיב שמפעיל תהליך בן מסווג על ידי `isLocalOnlyPath()` (כללים מחייבים מס' #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | כן                                    |
| `check:test-discovery`            | כל קובץ `*.test.ts` / `*.spec.ts` במאגר נאסף על ידי מריץ בדיקות אחד לפחות (ratchet: רשימת הקבצים היתומים ב-`test-discovery-baseline.json` יכולה רק להצטמצם)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כן                                    |
| `check:test-tla-order`            | אף קובץ `node:test` תחת `tests/unit` אינו רושם בדיקה, מגיע ל-`await` ברמה העליונה, ואז רושם בדיקות נוספות (#18045; ratchet: `test-tla-order-allowlist.json` יכולה רק להצטמצם)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | כן                                    |
| `check:agent-skills-sync`         | ארטיפקטים שנוצרו עבור כישורי סוכן תואמים לקטלוג המקור שלהם (ללא סטייה)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | לסמלי לוגו/נכסים של ספקים קיימת רשומת מקור מתועדת                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | קובצי תצורה בפורמט JSON עוברים ניתוח תחבירי ועומדים בכללי ה-lint של המאגר                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | הידור TypeScript ללא שגיאות (אזהרות מייעצות בלבד)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | כן                                    |
| `typecheck:noimplicit:core`       | `noImplicitAny` מחמיר — מיועד לעתיד; אתרי קריאה קיימים רבים עדיין דורשים הערות טיפוסים                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **מייעץ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` המוגבל ל-`src/app/(dashboard)/**` (#7033) — רשימת ההיתרים המתוחזקת של `typecheck:core`, הכוללת 27 קבצים, אינה כוללת אף קובץ TSX של לוח המחוונים, וגם `next build` לעולם אינו בודק שם טיפוסים (`next.config.mjs` מגדיר `ignoreBuildErrors: true`), ולכן רגרסיות של מזהים יתומים שם (#6625/#6909) לא היו גלויות ל-CI. מבצע השוואה מול קו בסיס קפוא של ספירת שגיאות לפי קובץ ולפי קוד TS (`config/quality/dashboard-typecheck-baseline.json`, באותו דפוס אכיפה נגד התיישנות כמו `check:known-symbols`) — רק שגיאות חדשות מעבר לספירה שבקו הבסיס מכשילות את שער הבדיקה; יש להנמיך את הסף באמצעות `--update` כאשר שגיאה קיימת מתוקנת.                                                                                                                                                                                                                                               | כן                                    |
| `check:build-typecheck`           | בדיקת טיפוסים של קוד הייצור באפליקציה כולה על בסיס `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), שאינה מכוסה על ידי רשימת ההיתרים בת 27 הקבצים של `typecheck:core` או על ידי שער ה־dashboard. מבצע השוואה מול `config/quality/build-typecheck-baseline.json`; ספירה חדשה או מוגדלת לפי (קובץ, קוד) מכשילה, וספירה נמוכה יותר מבקשת מכם להקטין את ה־baseline. `--update` מסרב לפעול כאשר ההרצה כוללת זוג חדש או מוגדל, אלא אם הועבר `--force-regressions`, ומסרב לקובץ שהושתק לאחרונה אלא אם הועבר `--force-nocheck`, כך שהרחבת ה־baseline כדי לקבל תוצאה ירוקה והענקת השתקה קבועה הן שתי פעולות מכוונות ונפרדות. `--force` ללא ארגומנטים נדחה. בנוסף, סורק את תחום הבנייה לאיתור `@ts-nocheck` מול `config/quality/ts-nocheck-baseline.json`, משום שקובץ המשתמש בו אינו מדווח כלל על אבחונים, ולולא בדיקה זו היה בלתי נראה לכל שער. | כן                                    |

#### שתי תוכניות בדיקת טיפוסים מספקות תשובות שונות

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) ו־`check:build-typecheck` מהדרות תוכניות שונות תחת אפשרויות שונות,
ואותו קובץ יכול להיות נקי באחת ומלא בשגיאות באחרת.

`tsconfig.build.json` מגדיר `"strict": false`, ולכן `noImplicitAny` כבוי. תצורת
הליבה מהדרת רשימת היתרים אצורה בת 27 קבצים עם אפשרויות מחמירות יותר ועוקבת אחר
גרף הייבוא של כל רשומה, כך שגם קבצים שאינם מופיעים כלל בתוכנית הבנייה עדיין
נבדקים שם.

לתוצאה הזו יש חשיבות כאשר מעריכים אם קובץ מוקלד: **אפס אבחונים תחת
`check:build-typecheck` אינו אומר אפס**. הסרת `@ts-nocheck` מ־26 קבצים הראתה ש־23
מהם נקיים בתוכנית הבנייה; שישה עשר מתוכם חשפו כ־120 שגיאות implicit-any בתוכנית
המחמירה. יש לבדוק את שניהם לפני שמכריזים שקובץ נקי.

### משימה: `quality-gate`

פועלת לאחר `test-coverage`. חוסמת מיזוג במקרה של כשל.

| סקריפט                       | מה נבדק                                                                                                                                           | חוסם                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `quality:collect`            | מפיק את `quality-metrics.json` (מספר אזהרות ESLint, כיסוי מתוך דוח הרסיסים הממוזג)                                                                | כן (במעלה הזרם של מנגנון הסף) |
| `quality:ratchet`            | כל מדד ב-`quality-baseline.json` לא נסוג (אזהרות ESLint ≤ קו הבסיס; כיסוי ≥ קו הבסיס)                                                             | כן                            |
| `check:duplication`          | שכפול קוד (jscpd@4) אינו חורג מקו הבסיס שב-`quality-baseline.json`                                                                                | כן                            |
| `check:complexity`           | המורכבות הציקלומטית ברמת הקובץ אינה חורגת מהתקרה (`complexity` הליבתי של ESLint + `max-lines-per-function`)                                       | כן                            |
| `check:cognitive-complexity` | מנגנון סף למורכבות קוגניטיבית (`eslint-plugin-sonarjs`) — הרצת ESLint נפרדת; CI מריץ את שתיהן כשהן ממוזגות לשלב היחיד `check:complexity-ratchets` | כן                            |
| `check:dead-code`            | מנגנון הסף של ייצואים / קבצים שאינם בשימוש (knip) אינו נסוג ביחס לקו הבסיס                                                                        | כן                            |
| `check:compression-budget`   | תקציב מדד השוואת הדחיסה — ערכי הסף המינימליים לחיסכון באסימונים עבור כל מנוע אינם רשאים לסגת                                                      | כן                            |
| `check:type-coverage`        | מנגנון הסף של אחוז הקוד בעל הטיפוסים (`type-coverage`) אינו נסוג; מחליף במידה רבה את `typecheck:noimplicit:core`                                  | כן                            |

### משימות: `codeql-scan` ו־`codeql-admission`

`codeql-scan` מפיק את כל קטגוריות הניתוח שהוגדרו. לאחר שהמשימה מצליחה, `codeql-admission` מאמת את ההעלאות המדויקות שלה ואת מנגנון מניעת העלייה בהתראות המועמד. שתיהן תלויות חובה של `Gate / CI`, גם עבור מועמדים שמשנים תיעוד בלבד. דרישות ההפעלה המנהלית וה־canary מתוארות להלן בסעיף ״מנגנון מניעת העלייה של CodeQL״.

| סקריפט                 | מה מאומת                                                                                                                                                                                     | חוסם |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `check:codeql-ratchet` | ה־ref/SHA של המועמד וכל קטגוריות הניתוח שהוגדרו חייבים להיות עדכניים לפני בדיקת מניעת העלייה בהתראות; ראיות חסרות חוסמות. המלאי הגלובלי נשאר נפרד — ראו להלן ״מנגנון מניעת העלייה של CodeQL״ | כן   |

### משימה: `quality-extended`

המשימה חוסמת מועמדים רלוונטיים. גודל החבילה, ממצאי סודות, ממצאי
פגיעויות, ממצאי תהליכי עבודה ושינויים ב-OpenAPI נבדקים באמצעות מנגנוני סף נדרשים.
אבחוני תלויות מעגליות נותרים בגדר המלצה. התקנת הסורקים נדרשת:
`scripts/ci/install-quality-scanners.sh` מתקין גרסאות מקובעות ומפיץ
כשלים בהתקנה. כלים חסרים, דוחות לא תקינים או קווי בסיס חסרים משאירים
את שער הסורק הנדרש במצב INCOMPLETE.

| סקריפט                   | מאמת                                                                                                                                                                                                      | חסימה                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:circular-deps`    | אין תלויות מעגליות (dpdm)                                                                                                                                                                                 | **מייעץ**                               |
| `check:bundle-size`      | גודל החבילה אינו חורג מהמגבלה; חוסר אפשרות לבצע מדידה גורם לכשל                                                                                                                                           | **חוסם עם --ratchet**                   |
| `check:secrets`          | אין נסיגה בממצאי Gitleaks; סריקות נדרשות דוחות כלים/קוד מקור/קו בסיס חסרים, סריקות שנכשלו ודוחות לא תקינים                                                                                                | **חוסם עם --ratchet**                   |
| `check:vuln-ratchet`     | אין נסיגה בפגיעויות של תלויות; סריקות נדרשות דוחות כלים חסרים, דוחות לא תקינים או קווי בסיס חסרים                                                                                                         | **חוסם עם --ratchet**                   |
| `check:workflows`        | בדיקת תקינות של תהליכי עבודה (actionlint + zizmor); סורקים חסרים/תקולים, דוחות לא תקינים או קו בסיס ratchet חסר גורמים לכשל במצב INCOMPLETE. ממצאים תקינים כפופים למדיניות המחמירה/המייעצת/ratchet שנבחרה | נדרשת הרצה; ratchet של zizmor חוסם ב-CI |
| `check:openapi-breaking` | חוזה ה-API הציבורי מול גרסאות אירועים מוצמדות (בסיס המיזוג של PR, המצב שלפני push, בסיס קבוצת המיזוג; בהרצה מתוזמנת/ידנית מתבצעת תחילה משיכה של ההורה הראשון); כשל במדידה נדרשת גורם לחסימה               | **חוסם עם --ratchet**                   |

### תפקיד: `docs-sync-strict`

עבור בקשות משיכה ל- `main` או `release/**`, עבודה זו פועלת רק עבור מועמדים שאינם טיוטה (או תור מהימן) המסווגים כתיעוד או שינויים בקוד. הוא פועל גם באירועי CI שאינם PR; הדק הדחיפה של זרימת העבודה הזו מכסה רק `main`, לא `release/**`. צעד שיוצא ללא אפס חוסם את העבודה; ממצאי דיווח בלבד ופטורים מתועדים להלן אינם.

| סקריפט                         | מאמת                                                                                                                                                                                                                                                                                                             | חסימה                                                                                                      |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | שער-על שמריץ ברצף את 7 שערי-המשנה שלהלן                                                                                                                                                                                                                                                                          | כן                                                                                                         |
| ↳ `check:docs-sync`            | עקביות גרסת Package/OpenAPI/CHANGELOG, מראות `llm.txt` מדויקות, אינוריאנטים מתורגמים של CHANGELOG section/size והעדר מסמכים כפולים מוחלפים                                                                                                                                                                       | כֵּן                                                                                                       |
| ↳ `check:docs-frontmatter`     | דפי תיעוד מלוקטים נושאים כותרות תקפות של frontmatter                                                                                                                                                                                                                                                             | כֵּן                                                                                                       |
| ↳ `check:docs-counts`          | אינוריאנטים של ספירת ביטחון גבוהה הם קפדניים; בדיקות היוריסטיות של ספירת קבצים מזהירות רק אלא אם כן הסקריפט מקבל `--strict` (המטא-שער CI לא עובר אותו)                                                                                                                                                           | חסימת שכבות קפדנית; ייעוץ שכבה רכה                                                                         |
| ↳ `check:env-doc-sync`         | מקור env reads, `.env.example` ו- `docs/reference/ENVIRONMENT.md` מסכימים לאחר רשימת ההתעלמות המפורשת, מסמכים בלבד ו-env בלבד                                                                                                                                                                                    | כן, מחוץ לרשימות ההיתרים המתועדות                                                                          |
| ↳ `check:deprecated-versions`  | מדווח על גרסאות מיושנות פוטנציאליות מחוץ להקשרים היסטוריים בטוחים ותאריכי עדכון מיושנים, לא כולל מסמכים שהתעלמו מהם                                                                                                                                                                                              | ייעוץ בחיווט CI נוכחי (`--strict` לא עבר)                                                                  |
| ↳ `check:doc-links`            | קישורי סימון פנימיים במסמכים פותרים לקבצים אמיתיים (טופס `[text]`/`(path)` )                                                                                                                                                                                                                                     | כֵּן                                                                                                       |
| ↳ `check:fabricated-docs`      | מסלולים, env vars, פקודות CLI, שמות Hook ונתיבי קבצים המצוטטים במסמכים קיימים בבסיס הקוד. שער קשה דרך `--strict`; soft-fail ללא דגל.                                                                                                                                                                             | כן (דרך `--strict` ב- CI)                                                                                  |
| `check:cli-i18n`               | מפתחות `t()` שה-CLI משתמש בהם קיימים ב-`en`; ‏`pt-BR` שומר על כל הסעיפים ברמה העליונה; `zh-CN` ו-`zh-TW` מכילים את כל המפתחות של `en`                                                                                                                                                                            | כן                                                                                                         |
| `check:openapi-coverage`       | מפרט OpenAPI מכסה לפחות סף שעוגן באמצעות ratchet של הנתיבים האמיתיים                                                                                                                                                                                                                                             | כן                                                                                                         |
| `check:openapi-security-tiers` | ההערות המוצהרות `x-loopback-only`/`x-always-protected` חייבות להיות מגובות ב-`routeGuard.ts`; שגיאות מנתח ואי-התאמות בבדיקה קדימה חוסמות. הבדיקה ההפוכה של `x-loopback-only` חסר תחת קידומות לגישה מקומית בלבד מזהירה, ונתיבים שמוגדרים רק באמצעות תבנית מוחרגים מהמעבר ההפוך הזה.                               | בדיקות המנתח והבדיקות קדימה חוסמות; הבדיקה ההפוכה מייעצת בלבד                                              |
| `check:openapi-routes`         | כל נתיב `/api...` ב-`openapi.yaml` מתאים לנתיב אמיתי ללא תלות בפרמטרים, לאחר החלת רשימת החריגים המנומקת `KNOWN_STALE_SPEC`; גם רשומות מיושנות ברשימת החריגים גורמות לכישלון                                                                                                                                      | כן                                                                                                         |
| `check:docs-symbols`           | הפניות URL פנימיות מסוג `/api/...` בתיעוד הקנוני שאינו עותק מראה מתאימות לנתיב אמיתי או למשפחת נתיבים; הפניות לפרוקסי/למקור במעלה הזרם/למצייני מקום/לקבצים ורשומות מנומקות ב-`KNOWN_STALE_DOC_REFS` מוחרגות, ורשומות מיושנות ברשימת החריגים גורמות לכישלון                                                       | כן                                                                                                         |
| `i18n translation drift`       | קבלה מוחלטת דורשת אפס חוסר עקביות של מקור, יעד חסר, יעד-hash, תרגום מעופש וקטע-מטמון. הכנה רגילה PR עשויה לשמור ראיות בירושה מדויקות או שינוי ממתין באנגלית בלבד עם מצב מלא ללא שינוי ובייטים יעד; הדו"ח שלו מכריז בנפרד על מוכנות למיזוג. גיבוב יעד חסר וחסום ראיות בסיס לא שלם. מטמון מדור מדור קודם אינו כשל. | כל חמשת השיעורים חוסמים קבלה queue/base ; אישורי הכנה רגילים שהוכחו רק בתורשה או עבודה ממתינה באנגלית בלבד |

שנים עשר README SVGs תחת `docs/diagrams/` נוצרים (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` מחדש את כולם). לכל אחד יש מבחן יחידת השוואת בתים (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) שנכשל כאשר הקובץ המחויב מיושן, ו- `check:docs-counts` קורא מספרים קנוניים מצמתי `<text>` שלהם — וזו הסיבה ששלב המתאר שומר על כל מחרוזת מתוארת בקובץ כ- `<text>` בלתי נראה. בדיקת המספרים הקנוניים SVG קוראת את הקבצים הרשומים ב- `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, בתוספת `public/images/tier-flow-dark.svg` ו- `tier-flow-light.svg`; הטענות בחינם לנצח, כניסה לקטלוג, מאגר חוזר וגורמי ניקוד קוראים גם `promise-pillars.svg`, `free-tier-budget.svg` ו- `strategies-grid.svg`. `free-tier-budget.svg` שואבת את הנתונים שלו ממטען הקטלוגים החי, כך ששינוי ל- `FREE_MODEL_BUDGETS` או לשם תצוגה של ספק הופך CI לאדום עד שהקובץ הזה יופק מחדש.

### משימה: `i18n-ui-coverage`

| סקריפט                           | מה הוא מאמת                                                                                                                                                                 | חוסם     |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check-ui-keys-coverage` (מוטבע) | כיסוי מפתחות ה-i18n של ממשק המשתמש הוא ≥ 65%                                                                                                                                | כן       |
| `check-ui-value-drift` (מוטבע)   | **ערך** אנגלי ששוכתב אינו משאיר מאחוריו תרגום מיושן                                                                                                                         | כן       |
| `check-new-key-coverage` (מוטבע) | מפתח אנגלי **חדש** מתורגם בכל אזור ושפה — סמן `__MISSING__:` נדחה                                                                                                           | כן       |
| `check-translation-ratio`        | יחס התרגום האמיתי לכל אזור ושפה (זהה לאנגלית / מציין מקום / ערכים חסרים מחוץ לרשימת ההיתרים) אינו יכול לחרוג מ-`config/quality/i18n-translation-baseline.json` בתוספת מרווח | **חוסם** |

נדרש `fetch-depth: 0` — שער סטיית הערכים משווה את `en.json` מול בסיס המיזוג.

#### `check-ui-value-drift` — שער התרגומים המיושנים

מזהה את נסיגת ה-i18n היחידה שהשערים האחרים אינם מסוגלים לזהות מבחינה מבנית: ערך אנגלי
משוכתב, והתרגומים שנגזרו מהאנגלית _הקודמת_ נשארים במקומם, כך שמשתמשים שאינם דוברי אנגלית
ממשיכים לקרוא טקסט המנוסח בביטחון אך כעת שגוי.

זה אכן שוחרר בפועל. `oauthModal.googleOAuthWarning` שוכתב כאשר מסייע ההתחברות של Antigravity
נוסף (#5203); ב-**39 מתוך 43 אזורים ושפות** נשאר טקסט שהורה למפעילים "להעתיק את
כתובת ה-URL המלאה ולהדביק אותה למטה" — תהליך שלא ניתן להשלים עבור ספק זה. הבעיה לא
הבחינה עד #8463, משום ש:

- `sync-ui-keys` משלים רק מפתחות ש**חסרים**, ולעולם לא מפתחות ש**התיישנו**;
- `check-ui-keys-coverage` סופר את _קיומם_ של מפתחות, ולכן תרגום מיושן נחשב כמכוסה;
- `check-translation-drift` עוקב אחר עותקי התיעוד `docs/i18n/<locale>/**.md` —
  הוא לעולם אינו קורא את `src/i18n/messages/*.json`. חוסם במשימה `docs-sync-strict` מאז
  הסנכרון מחדש של 2026-09: עריכת מסמך ליבה → `npm run i18n:run -- --files=<doc>` (ברמת המקטע, זול).

**מודע להבדלים, ולא מבוסס על קו בסיס.** הוא משווה את `en.json` שבבסיס המיזוג לעץ
העבודה; עבור כל מפתח שהערך האנגלי שלו השתנה, כל אזור ושפה שעדיין מחזיקים בתרגום
שלא השתנה נחשבים למיושנים. הדבר **מקפיא במכוון חוב קיים** — הבדל אינו יכול לחשוף
מאיזה נוסח אנגלי ישן נגזר תרגום ותיק, ולכן השער בוחן רק את מה שהשינוי הנוכחי נוגע בו.
החלופה (קו בסיס של גיבובים לכל מפתח) הייתה דורשת קובץ שנוצר אוטומטית בגודל של כ-600 KB,
פי 3 מקו הבסיס הקיים הגדול ביותר, שהיה משתנה בכל PR של i18n.

יש שתי דרכים לעמוד בדרישה:

1. לעדכן את התרגומים המושפעים, או
2. להגדיר אותם כ-`__MISSING__:<new english>` — בזמן הריצה תוצג אז האנגלית המתוקנת
   (`src/i18n/request.ts::deepMergeFallback`, #7258), והמפתח ייכנס לתור לתרגום.

אם **המשמעות** של המחרוזת השתנתה, עדיף **לשנות את שם המפתח**: מפתח חדש אינו יכול לרשת
תרגום מיושן. זהו הדפוס שבו השתמש #8463.

```bash
npm run i18n:check-value-drift          # מצב מחמיר (זה מה ש-CI מריץ)
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

מטריצת אימות i18n מלאה (משימה אחת לכל אזור). המשימה כולה היא בגדר המלצה.

| סקריפט                          | מה מאומת              | חוסם                                                      |
| ------------------------------- | --------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | שלמות התרגום בכל אזור | **המלצה בלבד** (`continue-on-error: true` על המשימה כולה) |

### משימה: `pr-test-policy`

מורצת בבקשות משיכה בלבד.

| סקריפט                 | מה מאומת                                                                                                                            | חוסם |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `check:pr-test-policy` | בקשות משיכה שמשנות קוד ייצור ב-`src/`, ב-`open-sse/`, ב-`electron/` או ב-`bin/` חייבות לכלול בדיקות או לעדכן אותן (כלל מחייב #8)    | כן   |
| `check:test-masking`   | קובצי בדיקה שהשתנו אינם מפחיתים את המספר הכולל נטו של טענות אימות ואינם מוסיפים טאוטולוגיות `assert.ok(true)`                       | כן   |
| `check:pr-evidence`    | גוף בקשת המשיכה מצטט ראיות מבדיקות/VPS עבור השינוי (ממכן את כלל מחייב #18 באמצעות חיפוש בטקסט של בקשת המשיכה — שברירי, ראו Backlog) | כן   |

### משימה: `test-vitest`

דורש את משימת הסיווג `changes`. פלחי המטריצה הרלוונטיים חוסמים מיזוג במקרה של כשל.

| חבילת בדיקות     | מאמתת                                               | חוסמת                                                                                       |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `test:vitest`    | שרת MCP‏ (110 כלים), autoCombo, מטמון — מריץ vitest | כן                                                                                          |
| `test:vitest:ui` | בדיקות רכיבי ממשק משתמש — מריץ vitest               | **חוסמת** — כשלים קיימים מוחרגים במפורש ב-`vitest.config.ts`; כשלים חדשים מכשילים את המשימה |

### תהליכי עבודה ליליים (מתוזמנים, בגדר המלצה)

אלה מורצים לפי לוח זמנים של cron (וגם באמצעות `workflow_dispatch`), ולעולם לא בבקשות משיכה. כולם בגדר המלצה.

| תהליך עבודה            | מאמת                                                                                                                                                           | חוסם      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `nightly-property`     | בדיקות מאפיינים של fast-check עם seed אקראי ומספר הרצות גבוה                                                                                                   | **מייעץ** |
| `nightly-resilience`   | שער גידול heap, הזרקת תקלות כאוס, בדיקות עומס/שהייה ממושכת באמצעות k6                                                                                          | **מייעץ** |
| `nightly-llm-security` | הגנה מפני הזרקות של promptfoo (מצב חסימה) + בדיקות garak (מדולגות ללא סוד של ספק)                                                                              | **מייעץ** |
| `nightly-schemathesis` | בדיקות fuzzing לחוזה OpenAPI (באמצעות schemathesis) מול OmniRoute פעיל, תוך שימוש ב-`docs/openapi.yaml` — חושפות הפרות מפרט / שגיאות 500 שלא טופלו (שלב 8 B.4) | **מייעץ** |
| `nightly-mutation`     | ציון בדיקות מוטציה של Stryker במסלול בדיקות היחידה המהיר — מוטנטים ששורדים חושפים טענות אימות חלשות                                                            | **מייעץ** |
| `nightly-compat`       | מטריצת תאימות למנוע Node על פני טווחי `engines.node` הנתמכים                                                                                                   | **מייעץ** |

מדדי בסיס לביצועים (heap,‏ TTFB, זמן build) נרשמים, אך אינם משמשים כשער: ראו [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### ראצ'ט CodeQL : קבלה של מועמדים ומלאי מאגר

CI מחזיקה בקבלת מועמד CodeQL דרך שרשרת תלות מפורשת: `codeql-scan` קורא למטריצת ארבע השפות ב- `codeql.yml`, ואז `codeql-admission` מפעיל `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` דורש את שתי התוצאות. איכות שומרת על בדיקות מספריות משלה, אך אינה מבצעת שאילתה בסורק לפני שהמפיק מסיים; `Gate / Quality` לבדה אינה קבלה מלאה של מועמדים. CodeQL נשאר נדרש על מועמדים למסמכים בלבד.

המדיניות ב- `config/quality/codeql-admission-policy.json` בוחרת בפעולות, C/C++, JavaScript/TypeScript ו-Python, ברירת מחדל של חבילת שאילתות, מודל איום מרחוק ומצב בנייה ללא. טיסה מוקדמת של המפיק דוחה רשומת הפעלה ממתינה ומסתעפת מחוץ לרשימת היעד המפורשת. היעדים הנוכחיים הם מבחני חוזה ראשיים ו- release/v3.8.54. משווים את הרשימה הסופית הזו ואת הדק הדחיפה לתחזוקה עם גרסת החבילה; המהדורה הבאה צריכה לעבור בדיקה. ההדק הקיים של CI בשחרור רחב יותר PR נשמר, אך יעד לא מוכנס מדווח על HOLD לפני החילוץ במקום להשיג PASS לא מדוד.

כל עבודת מטריצה מתעדת את ההעלאה בפועל של SARIF ID, שפה, קטגוריה, הפעלה וניסיון, זהות זרימת העבודה של המתקשר, ref/head/base/merge SHA של אירוע ו-hash של מדיניות. העבודה התלויה מורידה רק את הקבלות של הריצה הזו ומאמתת תקצירים של חפצים. זה דורש את כל ארבע הקטגוריות, מפיק מוצלח ועיבוד מושלם של כל העלאה מדויקת. הוא משתמש במסנן sarif_id של API, לא בניתוח האחרון שנמצא על ענף. שידורים חוזרים חלקיים עשויים לעשות שימוש חוזר בקטגוריות מוצלחות מניסיון קודם של אותה ריצה ומועמד, תוך שמירה על ניסיון ההפקה; מפיק נוכחי כושל לא יכול לעשות שימוש חוזר בראיות ירוקות קודמות.

פעולת CodeQL ממתינה לעיבוד, אך היישום המוצמד שלה יכול להזהיר ולהמשיך לאחר כשל בקריאה של סטטוס או המתנה מותשת. לכן הקבלה מאמתת שוב את העיבוד. קטגוריות חסרות, עיבוד ממתין, עבודות שנכשלו או בוטלו, זהות מעופשת, עימוד לא שלם או APIs לא זמין מייצרים HOLD ויציאה 2. לא נשארת המתנה קבועה לזרימת עבודה עצמאית של סורק. PR לא סרוק לא יכול לעבור כי שאילתת התראה החזירה 0. ספירה מדודה מעל `metrics.codeqlAlerts.value` יוצאת מ-1; קו הבסיס אינו מורם כדי לספוג התראות של סניף אחר. [העלאת מצב ובדיקת ניתוח](https://docs.github.com/en/rest/code-scanning/code-scanning).

רשומות הקבלה מעלה וניתוח IDs, קטגוריות, גרסאות כלי, ref/SHA, מספרי בסיס ומספרי התראות. ספירת SARIF identity/result, ספירת כללים מינימלית ומופעי התראות מדויקים נשארים חובה. זהויות PR/analysis נבדקות מחדש לפני קבלתן. בדיקות אלה קובעות כיסוי קטגוריות מוגדר, לא מלאי של כל קובץ מקור שחולץ. חילוץ C/C++ ללא בנייה אינו כולל קוד שנוצר במהלך בניית פרויקט. אי-הכללות של מקורות עדיין מצריכות בדיקה, וייחוס תורמים מצריך ראיות בסיס מדויקות דומות.

`codeql-maintenance.yml` מספקת סריקות דחיפה בשחרור אקטיבי ואת לוח הזמנים השבועי מבלי לשכפל מפיקי PR/main. `nightly-codeql-inventory.yml` שומר על קו הבסיס של המאגר נפרד, עם `--strict-measurement` וכשל כאשר המדידה אינה זמינה. הדילוג החינני של אספן המורשת המקומי אינו קבלת מועמדים. הידוק נותר `--update` מפורש לאחר ספירה גלובלית נמוכה יותר מאומתת.

אסור לפרסם את זרימת העבודה המתקדמת בזמן הגדרת ברירת המחדל: GitHub דוחה את השילוב הזה. המדיניות המנוסחת שלה נשארת בהמתנה עד שהמעבר המנהלי שנבדק יוקרא בחזרה. לפני הפרסום, מפעיל מצמיד מאגר, head/base/tree, גיבוב policy/patch/rollback ומצב הגדרה נצפה; `node scripts/quality/codeql-producer.mjs verify-admin-readback` בודק את רשומות ה- JSON הצפויות והממשיות שסופקו. זהו שומר טכני, לא אישור מפעיל או תחליף להחזרת החזרות חדשות. אסימון PR לעולם לא מבקש גישת ניהול. השקה וכל שינוי בסורק דורשים חזרה נפרדת זו בתוספת הוכחה אמיתית PR, מזלג ותאימות קבוצת מיזוג.

Forks משתמש ברצים מתארחים, קופה ללא אישורים מתמשכים, ללא פרויקט install/build במפיק וללא סודות מאגר שעברו בירושה. GitHub תומך בהעלאת SARIF עבור אירוע pull_request עם אסימון המזלג המופחת שלו; אישור ביצוע תרומה בפעם הראשונה נשאר מדיניות GitHub. לעולם אל תשתמש ב-pull_request_target כדי להפעיל קוד לא מהימן. אשר הרשאות אסימון בפועל, אנליזה_מפתח וכל סביבות הקטגוריה בקנרית הנשלטת לפני ששקולים את ההעברה שהושלמה. [כללי העלאת מזלג](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [מצבי הגדרה סותרים](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**פיטורים הם שיחת המפעיל (Hard Rule #14)** — לעולם לא מבטל התראת CodeQL מבלי לרשום את ההצדקה הטכנית בהערת ההדחה: `won't fix` עבור דרישת פרוטוקול במעלה הזרם, `used in tests` עבור מתקן בדיקה, `false positive` עבור חיטוי CodeQL לא יכול לראות (תקדים: `docs/security/ERROR_SANITIZATION.md`).

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

**גם אלה אינם מתועדים לעיל** (advisory, אות חלש): משימת `docs-lint` ‏(markdownlint + Vale, המשימה כולה עם `continue-on-error`) ותהליכי הסריקה העצמאיים `semgrep.yml` / `scorecard.yml`. ל־CodeQL יש כעת משימות מפיק וקבלה נדרשות תחת `Gate / CI`, בכפוף לדרישות ההפעלה שתוארו לעיל. `semgrepFindings: 0` נמצא ב־`quality-baseline.json`, אך אינו מחובר למנגנון מניעת עלייה חוסם ב־`ci.yml` — המדד כרגע מנותק מהאכיפה.

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
- `check:pr-evidence` (חוסם, מבצע grep בטקסט החופשי של גוף ה-PR) — סיכון גבוה לחיוביים כוזבים; הסרתו מחלישה את האכיפה של כלל קשיח מס' #18, ולכן זו החלטת מדיניות אמיתית.
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
