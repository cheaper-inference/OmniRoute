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

## מלאי שער ופרופילי ביצוע

### קבלת מועמד

זרימות העבודה של CI ו-Quality Gates מוציאות כל אחת פסק דין יציב: `Gate / CI` ו- `Gate / Quality`. מדיניות הקבלה המנוסחת שלהם מונה כל עבודה במעלה הזרם כנדרש או מייעץ. משרה נדרשת רלוונטית חייבת להצליח: תוצאות חסרות, בוטלות, דילוג, ממתינות ולא ידועות אינן יכולות להקים PASS. סיווג חוקי של מסמכים בלבד או קטלוג בלבד יכול להפוך את נתיב הקוד לבלתי ישים; טיוטת PR רגילה אינה מועמדת מקובלת. תווית `hotfix` אינה מוותרת על ראיות.

שני זרימות העבודה מכסות PRs לענפי main/release, דחיפות ל- `main`, שיגור ידני ואירועי מיזוג קבוצות. דחיפה, שלח ומיזוג-קבוצה הפעל את הבחירה המלאה. טיוטה מהימנה של תור Mergify מפעילה גם עבודות `full-code`/`full-code-e2e` רלוונטיות; PRs רגיל לדלג עליהם. לפני מיזוג ידני, הפעל שיגור מלא על המועמד המדויק. דחיפות ל- `release/**` אינן מתחילות את זרימות העבודה הללו; Release-Green צופה בנפרד בבסיס הממוזג (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks וקבוצות מיזוג משתמשים ברצים מתארחים עבור עבודות שאחרות בוחרים ברצים שמתארחים בעצמם; יש לאמת קיבולת מתארחת מספקת לפני ההשקה.

PR רגיל מפעיל את הבחירה המהירה. מסלולי ה- `full-code` וה- `full-code-e2e` של מדיניות הקבלה (E2E, אינטגרציה, חפצי חבילה, Electron smoke, Bun SQLite, לקוחות אקולוגיים ופרוטוקול) פועלים רק על טיוטה של תור Mergify או על ריצה מלאה: `gh workflow run ci.yml --ref <branch>`.

כל קבלה JSON מזהה את SHA שהוצא, את זרימת העבודה ואת הניסיון. ה- CLI דוחה חוסר התאמה של checkout/event SHA. מבחני זרימת עבודה קושרים את החברות במדיניות לרשימת ה- `needs` של עבודת פסק הדין, כך שמסלול חדש או הוסר לא יכול להיעלם בשקט. הקבלות מכסות את זרימת העבודה שלהן, לא פרסום, פריסה או החלק הפנימי של סורק מייעץ קיים. ביצוע הבדיקות הרלוונטיות הנדרשות בכללי הסניף הוא שינוי מנהלי נפרד; הגדרת עבודתם אינה מגינה בעצמה על סניף.

`API Route Typecheck` הוא בדיקת זרימת עבודה עצמאית, מחוץ הן לפסיקות המצטברות והן לפרופיל הסטטי של הצופה המלא המקומי. בדוק את התוצאה שלה בנפרד עבור המועמד המדויק. `.github/workflows/api-route-typecheck.yml` פועל על PRs לתוך `main` או `release/**`, דוחף למשפחת סניפים, שיגור ידני ואירועי `merge_group` מסוג `checks_requested`. אין לו מסנן נתיבים. מיזוג קבוצות בדוק `merge_group.head_sha`; אירועים אחרים בדוק את `github.sha`. כל האירועים משתמשים באותם בדיקות שער אבחון ויחידות שער API. יעדי בסיס מחדש PR מבקשים צ'ק חדש; עריכות body/title משתמשות בשם `Admission not requested / API Route Typecheck` לתצפית בלבד ואינן יכולות להחליף את בדיקת הקבלה.

### ראיות שמורות במפחית הקבלה

`scripts/quality/validate-release-acceptance.mjs` מצמצם תוכנית שסופקה וביטוייה; היא אינה קובעת כי התוכנית מכסה את צינור השחרור המלא. הדוחות שלה מגדירים במפורש `releaseAcceptance: false`, גם כאשר התוכנית הזו היא `VERIFIED`. זרימת העבודה `release-acceptance.yml` עדיין משתמשת בגופי צל, לא בקבלות בנייה, חבילה, אתחול או קידום אמיתיות.

ה- CLI דורש `--evidence-root` לאמת ראיות שנשמרו. קבצים נפתרים כ- `<evidence-root>/<artifact_id>/<member>` ומגובשים כ- SHA-256. רשומת PASS ללא ראיות, קובץ חסר או שונה, נתיב לא בטוח או סימן קישור מונעים אימות. קבצים חסרים אינם שווים ליומנים ריקים מוצלחים. בדיקות SHA/run/attempt קיימות נשארות בלתי תלויות: בתים תואמים לא יכולים להציל קבלה מעופשת. שלמות הקובץ אינה הוכחה לאותנטיות ביצוע או קידום חפצים.

### DAST צורכת את ה- CI המאומת

העבודה הנדרשת `dast-smoke` CI קוראת `.github/workflows/dast-smoke.yml` לאחר `build`. הוא עוקב אחר אותה בחירת code/draft כמו המבנה, כולל מזלג PRs נתמך, PRs לשחרור יעד וקבוצות מיזוג. עבודת DAST חסרה, נכשלה, בוטלה או דילגה באופן בלתי צפוי חוסמת `Gate / CI`. לזרימת העבודה הניתנת לשימוש חוזר אין טריגר PR/dispatch עצמאי; אימות ידני משתמש במשלוח של CI כך שהמבנה והצרכן נשארים בהפעלה אחת.

`scripts/ci/next-build-provenance.mjs` אוטמת את החפץ הבא במלואו עם זפת, repository/event/run, ניסיון מפיק, head/base/checkout/tree, זהויות זרימת עבודה, קובץ נעילה, צומת version/ABI מדויק, פלטפורמה ומצרף. DAST בוחר את החפץ הבלתי ניתן לשינוי ID מ- `needs.build.outputs`, דורש אימות תקציר הורדה, ומאגד באופן עצמאי את ה- ZIP מול תקציר המפיק לפני חילוץ שני החברים הרשומים שלו דרך `scripts/ci/unpack-ci-build.py`. ארכיון המניפסט והזפת חייבים להתאים גם לפלטים של יצרן עצמאי לפני חילוץ העץ הבא. הוא אף פעם לא מחפש את בניית הסניף המוצלחת האחרונה. שידור חוזר חלקי עשוי לעשות שימוש חוזר באותו ניסיון מפיק כאשר ID שלו וכל התשומות עדיין תואמים; הקבלה מתעדת את שני הניסיונות.

הצרכן נשאר על רץ Linux מתארח עם הרשאת מאגר לקריאה בלבד וללא סודות מאגר. הוא מתקין את גרסת ה-Node המדויקת של המפיק, ואז מרכיב את ה- CLI עם `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` דוחה שרת עצמאי חסר לפני כל בניית מיתון; מבני CLI מקומיים רגילים שומרים על החזרה הקיימת שלהם. מוכנות השרת, Schemathesis ו-promptfoo חייבים כולם להצליח בתוך מגבלת העבודה של 25 דקות ללא שינוי. אישור מקור מוכיח את זהות הקלט והבתים, לא סריקת DAST מוצלחת. תפוגה של חפץ, הפרעה לרץ או סורק כושל נותרו ראיות חלקיות או נכשלות; זה לא יכול להפוך PASS באמצעות מעטפת ייעוץ.

### יכולת ביצוע UI

CI מפעיל את מלאי ה- UI המלא כארבעה רסיסי מטריצת `test-vitest`, בכל אחד מהם לכל היותר שני עובדים לכל רסיס ותאריך היעד הקיים של 15 דקות לעבודה. הרסיס הראשון מריץ גם את חבילת MCP/autoCombo Vitest. תוצאת העבודה הנדרשת מכסה כל רגל מטריקס; כישלון או ביטול של רסיס אחד אינם יכולים לבסס קבלת מועמד.

הצופה הלילי שומר קבלה נפרדת של מועמד מדויק עבור כל רסיס UI, כולל ביצוע MCP בקבלה הראשונה. נדרשים כל ארבע הקבלות, היומנים וזהויות הביצוע התואמות. `npm run test:vitest:ui` מקומי עדיין בוחר את החבילה השלמה; ריצת `--shard` אחת היא ראיה חלקית בלבד.

### איסוף כיסוי יחידה

12 רסיסי היחידות אוספים כיסוי V8 במהלך ביצוע הבדיקה הקיימת שלהם. רסיס מוצלח מריץ `scripts/ci/compact-v8-coverage.mjs` כדי לדחוס את הקבצים המקוריים מבלי ליצור דוח ביניים של איסטנבול. עבודת הכיסוי הסופית מאמתת את כל 12 המניפסטים מול המועמד SHA, זמן ריצה, שורש מקור ונתונים, ולאחר מכן מפעילה את הכתבים של c8 ואת ספי הכיסוי הקיימים. כניסות שומרות על סדר שמות הקובץ הגלובלי של c8; מיזוג מראש לכל רסיס אינו בטוח עבור כיסוי function/block מעורב. רסיסים חסרים, פגומים או לא תואמים נכשלים בכניסה. רסיסי בדיקה שנכשלו שומרים על כיסוי אבחון גולמי בנפרד; הוא לא יכול להיכנס למיזוג הסופי.

### קבלות על התקדמות ביצוע יחידה

פקודת `test:unit:ci:shard` המשותפת מתעדת את שלבי `primary`, `dashboard` ו- `serial` דרך `scripts/ci/unit-progress-reporter.mjs`. דוח הבדיקה הרגיל נשאר זמין. קבלה נפרדת של מטא נתונים בלבד מתעדת את ההתחלה וההשלמה של כל קובץ, ודופק של 30 שניות מפרט את הקבצים שעדיין פעילים ואת הזמן שחלף. הוא מתעד רק מטא נתונים של ביצוע ברשימת ההיתרים; תיאורי בדיקה, פלט, גופי שגיאה והסביבה המלאה אינם מסודרים.

CI שומר על קבצי JSONL בתור `unit-progress-ci-<run>-<attempt>-<shard>`. פסק זמן לעבודה יכול למנוע העלאה מאוחרת יותר; פעימות הלב שכבר נפלטו נותרות עדות אבחנתית. פעימות לב חסרות יכולות גם לשקף תהליך רץ חסום או שהופסק. קבלות אלו משמרות את בחירת הבדיקה הקיימת, במקביל, מועדים וסטטוס יציאה; הם אינם פסקי דין קבלה של מועמדים.

### מיזוג תור

תווית `queue` שולחת PR לתור Mergify (`.mergify.yml`). Mergify פותחת טיוטת PR על סניף `mergify/merge-queue/`, CI מריץ את הבחירה המלאה שם, וה- PR המקורי מתמזג כאשר `Gate / CI`, `Gate / Quality` ו- `Merge integrity (changelog + generated skills)` עוברים.

Mergify כותבת את סיכום התור שלה בתיאור הטיוטה. אירועי Body/title-only `pull_request` `edited` משתמשים בקבוצת מקבילות ספציפית להרצה ואינם מריצים סיווג חוזר, מטריצות בדיקות, מיזוג שלמות או פסק דין הקבלה. שמות בדיקות לתצפית בלבד אינם יכולים להחליף `Gate / CI` או `Gate / Quality`. עריכה שמשנה את בסיס היעד מבקשת אימות מועמד חדש.

לאחר עמידה בתור, דחיפה לא תמיד מעמידה את ה- PR בתור. תגובה `@mergifyio queue` על זה.

### מלאי סריקה סטטית

מלאי ה-npm-כינוי המנוסח והחברות בסריקה סטטית פעילים ב- `config/quality/gate-manifest.json`. הפעל `npm run check:gate-manifest` כדי לאמת שמות סקריפט ופקודות מדויקות מול `package.json`; תוספות, הסרות וסחיפת פקודות נכשלות הן בעבודות ה-hook המקומיות והן בעבודות הסיווג של השינוי ב- CI. כינוי אינו עבודת זרימת עבודה, מופע מטריצה או מקרה בדיקה: אין להציג ספירות אלו כניתנות להחלפה.

השתמש ב- `npm run quality:scan -- --list` או `npm run quality:scan:fast -- --list` כדי לבדוק את הכינויים שנבחרו מבלי לבצע אותם. הרץ מפעיל את נקודת הכניסה npm, כך שזמן הריצה שלו (כולל Bun היכן שהוגדר) נשמר. המניפסט רושם כינויים מחוץ לפרופילים הללו כפי שהופעלו בנפרד, ופקודות תחזוקה אסורות בפרופילי סריקה לקריאה בלבד.

פרופילים אלה מכסים את הסריקה הסטטית בלבד. הם אינם מאשרים בדיקות מוצר, כיסוי, אריזה, בדיקות חיצוניות או הסכמה מלאה לשחרור של מועמד. קבלה לזרימת עבודה משתמשת ב- `config/quality/admission-policy.json` וב- `scripts/quality/admission-verdict.mjs` המקושרים. פרופילי צופה לשחרור נשארים נפרדים; לבדוק את ההמחאות והקבלות הרלוונטיות שלהם באופן עצמאי. הפקודות הסטטיות המלאות של הצופה מוצהרות ב- `config/quality/release-green-static-profile.json`, כולל `audit:deps`, בחירת בדיקת מוטציות ובדיקות תרגום. המטען מאמת פקודות npm כנגד package.json והצהרות CI/Quality מעוצבות; הוא דוחה סחף במקום לבצע אסימוני מעטפת כטיעונים. פלט SKIP/INCOMPLETE של הסורק הנדרש אינו יכול לבסס PASS. הפרופיל מתעד את ההחרגות החיצוניות שלו ואינו מחליף כיסוי מתארח, מטריצות בדיקה, ראיות חבילה או פריסה. מצאי הפרוזה שלהלן הוא אסמכתא, לא הוכחה לכך ששער אכן רץ.

סקריפטים חיים תחת `scripts/check/` (שערי מדיניות) ו- `scripts/quality/` (מנוע ראצ'ט). מקור האמת של CI הוא `.github/workflows/ci.yml`.

### תקינות תיעוד בסיס שפורסם

`.github/workflows/i18n-base-health.yml` צופה בתקינות התיעוד לאחר דחיפות נבחרות ל- `main` ו- `release/v*`, ובמשלוח ידני. המסננים שלו מכסים תיעוד, שורש Markdown, `llm.txt`, תרגום state/configuration וכלי i18n הרלוונטיים. עבודת `Published base documentation health` היחידה משתמשת באובונטו המתארחת ובדד-ליין של חמש דקות. הוא מבצע אימות לקריאה בלבד וכותב קבלה לאבחון ללא התקנת תלות, תרגום או אימוץ מדינה.

`scripts/i18n/check-base-health.mjs` דורש אפס חוסר עקביות של מקור-hash, חסר יעד, יעד-hash, תרגום מעופש וקטע-מטמון. זה גם מאמת את היקף הליבה הנוכחי document/locale ואת מקורו המתועדים. הקשר לא חוקי, כיסוי לא שלם או בודק שנקטע מייצר `INCOMPLETE`; סחיפה מאושרת מייצרת `FAIL`. שניהם מחזירים סטטוס יציאה נכשל. הקבלה מחויבת לתשלום SHA, זרימת עבודה, הפעלה וניסיון, והיא נשמרת כ- `i18n-base-health-<sha>-<run>-<attempt>`.

זוהי תצפית עצמאית על הבסיס שפורסם. זה לא מוסיף אירוע PR או מיזוג קבוצה, בדיקת PR נדרשת, כינוי npm או חבר פרופיל סריקה סטטית. הבודק הבסיסי גם חוסם את כל חמשת המחלקות במצב אבסולוטי. הכנת PR רגילה נשארת נפרדת מהקבלה. העלאה מוצלחת אינה יכולה להפוך תוצאת בריאות כושלת ל- PASS.

PR רגיל משתמש ב- `--preflight` עם דוח בסיס שנוצר על ידי `--baseline-evidence`. זה עשוי להשאיר מקור באנגלית בהמתנה רק כאשר רשומת התרגום המלאה ובתי היעד בפועל לא משתנים מאותו בסיס בדיוק. חוסר עקביות של יעדים חדשים או קטע-מטמון עדיין חוסמים, וראיות לא שלמות לא יכולות לאשר הכנה. הדוח חושף `preparationPending` ו- `mergeReady` בנפרד: הכנה מוצלחת אינה הופכת תרגומים ממתינים למוכנים למיזוג. רענן את המראות המושפעות במועמד המורכב לפני הקבלה. המועמד המהימן לתור Mergify, `merge_group`, דחיפות סניפים והרצות CI ידניות משתמשים בבודק המוחלט, ללא `--warn` או סליחה על כישלון בירושה. גיבוב יעד חסר והיקף מופחת על ידי קבצי ליבה מוקלטים שנמחקו אינם יכולים להפיק פסק דין מוחלט מוצלח.

### שחרר את הנתיב המהיר PR (`quality.yml`)

`.github/workflows/quality.yml` משלים CI ב- main/release PRs, דוחף ל- `main`, שולח וממזג קבוצות. PRs משתמש בבדיקות מהירות מסוננות נתיב. המבנה הכפול שהושבת לצמיתות הוסר; המחאות build/package/boot האמיתיות נשארות ב- CI. חבילת היחידה וה-Vitest פועלים רק ב- CI (`Unit Tests (N/12)` ו- `Vitest`).

| מִשׂרָה                                          | תְחוּם                                                                                                                               | חסימה           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API Docs refs ו-docs-all                                                                                              | כֵּן            |
| `Fast Quality Gates`                             | קוד PRs; בדיקות סטטיות, בדיקת סוג, בדיקת סוג לוח מחוונים, בדיקות יחידות מושפעות                                                      | כֵּן            |
| `Forgotten sibling tests`                        | קוד PRs; מודולים השתנו לצרכנים סטטיים ולמבחני אחים מועמדים; נתיב חביות וייבוא דינמי מדווחים כאבחון מייעץ, עם חריגים של רשימת ההיתרים | **מְיָעֵץ**     |
| `No new ESLint warnings`                         | קוד PRs; מגן מוך מודע לדיכוי                                                                                                         | כן, כולל מזלגות |
| `Merge integrity (changelog + generated skills)` | ללא גיוס PRs; יומן שינויים וסנכרון מיומנויות שנוצר                                                                                   | כן, כולל מזלגות |

#### דוח בדיקות אחים נשכחות

`npm run check:forgotten-sibling-tests` פועל כשלב מייעץ של `Fast Quality Gates` ועושה שימוש חוזר בפותר היבוא שמאחורי מפת ההשפעה של הבדיקה. עבור כל מודול ייצור שהשתנה, הוא מדווח על שרשראות `changed module/symbol -> static consumer -> candidate sibling test` דטרמיניסטיות כאשר מבחן המועמד נעדר מההבדל של בקשת המשיכה. סיכום Markdown ותוצאת JSON נשמרים כחפץ זרימת העבודה `forgotten-sibling-tests` לכיול לפני כל השקה חוסמת.

ייצוא חוזר של חבית ויבוא דינמי הם אבחון רזולוציה בלבד; הם אף פעם לא יוצרים ממצא חוסם. חריגים שנבדקו בשידור חי ב- `config/quality/forgotten-sibling-allowlist.json`. כל ערך חייב לתת שם למבחן הצרכן והמועמד, לתת רציונל ספציפי ולקשר סוגיית GitHub או בקשת משיכה. ערכים שגויים נכשלו סגור. חריגים אינם יכולים לדכא מבחן מועמד שנמחק או הבדל שמוסיף `.skip`/`.todo`; היחלשות הטענה ומיסוך אחר נותרו בבעלות שער `check:test-masking` החוסם באופן עצמאי.

### תפקיד: `lint`

פועל על כל PR עד `main`. בלוקים מתמזגים על כישלון.

| סקריפט (`npm run ...`)            | מאמת                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | חסימה                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | גרסת Node.js נמצאת בטווח הנתמך                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | כֵּן                                    |
| `check:cycles`                    | יבוא מעגלי על פני כל `src/` + `open-sse/` (מבוסס AST, tsconfig `paths` נפתר). יציאה חשופה 1 בכל פעם שקיים מחזור כלשהו (כישלון סגור מאז #15281) ומפרטת את ה- SCCs. `check:cycles:ratchet` (מה ש- CI מריץ) חוסם כאשר הספירה חורגת מתקרת `metrics.cycles` ב- `quality-baseline.json` — כרגע 14, `direction: down`, כך שהוא יכול רק ליפול (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                              | כן (מחגר)                               |
| `check:boundary`                  | צימוד `open-sse → src` : ייבוא ייחודי של קובץ לקובץ מהמנוע לתוך האפליקציה (`scripts/quality/measure-boundary.mjs`; רשימת הקצה היא צבר התיקון v4 core/module-split ). דוח ייעוץ חשוף = (זהה ל- `quality:boundary`). `check:boundary:ratchet` (מה ש- CI מריץ, גם בלולאת המחגר המהירה `quality.yml` ) חוסמת כאשר הספירה חורגת מתקרת `metrics.boundaryOpenSseToSrc` ב- `quality-baseline.json` — שנמדדה ב-771, `direction: down` הנמדדת; `--update` רק מוריד אותו; בסיס-יחסי על PRs (`--base-ref`, ראה להלן)                                                                                                                                                                                                                                                                              | כן (מחגר)                               |
| `check:route-validation:t06`      | סכימות Zod קיימות בכל המסלולים (מדיניות שכבה 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | כֵּן                                    |
| `check:any-budget:t11`            | ספירת `@ts-expect-error // any` אינה חורגת מהתקציב (דרגה 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | כֵּן                                    |
| `check:provider-consistency`      | לכל ספק ב- `providers.ts` יש ערך תואם ב- `providerRegistry.ts` (ולהיפך, ברשימת ההיתרים)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | כֵּן                                    |
| `check:model-lifecycle`           | שלושת טבלאות הניתוב המתוחזקות ביד נשארות עקביות עם תמונת המצב של מחזור החיים שבוצעה הצ'ק-אין (#11503): `FITNESS_TABLE` (`taskFitness.ts`) לא מקבל זיהוי פרש ש- `REGISTRY` יכול לנתב; כל יעד `BUILT_IN_ALIASES` קיים ב- `REGISTRY` ונעדר מתמונת המצב של זיהוי פרש; כל תעודה מזהה שעדיין ב- `REGISTRY` מועברת או רשומה ב- `allowedRetiredInCatalog`; ושום מקור או מטרה `DEFAULT_DEGRADATION_MAP` לא נראים מנותקים בתמונת המצב הזו. זה לא מוכיח שדוגמנית מוגשת כעת על ידי זרם בשידור חי. — לא מקוון משווה ל- `config/quality/model-lifecycle.json`, רענון ידני עם `npm run quality:refresh-model-lifecycle` (רשת; לא מחובר ל- CI). `allowedRetiredInCatalog` הוא מחגר שרוף: הוסף ערך רק עם בעיית מעקב.                                                                                   | כֵּן                                    |
| `check:fetch-targets`             | כל `fetch("/api/...")` ב- `src/` בצד הלקוח הופך ל- `route.ts` אמיתי                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | כֵּן                                    |
| `check:deps`                      | כל מחלקות `npm install` -able בכל `package.json` בריפו נמצאים ב- `dependency-allowlist.json`; חבילות חדשות לא מוצמדות או משופעות מסומנות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | כֵּן                                    |
| `audit:deps`                      | ביקורת npm של כל חמשת קבצי הנעילה העצמאיים (root, Electron, OpenCode plugins v1/v2 וספק). חסימת ייעוץ קריטי; אזהרות גבוהות נשארות גלויות. ביקורת Missing/failed הן INCOMPLETE וחסימה; הגיבובים והדוחות של נעילה לפי היקף נשמרים.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | כֵּן                                    |
| `check:lockfile`                  | שלמות `package-lock.json` רישום — https, גיבוב של שלמות, אין עקיפות מארח                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | כֵּן                                    |
| `check:licenses`                  | רשימת רישיון SPDX עבור תלות בייצור                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | כֵּן                                    |
| `check:tracked-artifacts`         | אין חפצי בנייה / סימלי `node_modules` מחויבים (פועל גם ב-pre-commit צרוד; Pre-push הוא — #6716 קל בכוונה)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | כֵּן                                    |
| `check:ai-attribution`            | אין טריילר AI/bot `Co-Authored-By` או כותרת תחתונה מדור AI ב- PR מתחייבים, כותרת או גוף — Hard Rule #16 (בלולאת `quality.yml` fast-gates עבור PR→ `release/**` — קורא את מטען האירוע, ללא הפעלה של PRs — וצעד רק ל-PR ב- `ci.yml` lint PR hook `main` → Human גם `commit-msg` #14436; מחברים משותפים מותרים;                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | כל אי הכללת Vitest נותנת שם לבעיית מעקב ומופיעה ב- `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | כֵּן                                    |
| `check:file-size`                 | קבצי מקור (`.ts`/`.tsx` ב- `src/`, `open-sse/`, `electron/`, `bin/`) נשארים בתוך `cap` וקבצי בדיקה (`*.test.ts(x)`) בתוך `testCap`; אסור לקבצים שהוקפאו ב- `file-size-baseline.json` (`frozen` / `testFrozen`) לגדול מעבר לגודלם המתועד                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | כֵּן                                    |
| `check:error-helper`              | תגובות שגיאה ב- executors/handlers משתמשות ב- `buildErrorBody()` / `sanitizeErrorMessage()` (חוק קשה #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | כֵּן                                    |
| `check:migration-numbering`       | קובצי הגירה SQL ממוספרים ברצף, ללא פערים או כפילויות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | כֵּן                                    |
| `check:public-creds`              | אין מפתחות OAuth `client_id`/`client_secret` מילוליים או Firebase Web מחוץ ל- `publicCreds.ts` (כלל קשה #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כֵּן                                    |
| `check:db-rules`                  | אין SQL גולמי מחוץ למודולי `src/lib/db/` ; אין יבוא חבית מ- `localDb.ts` (חוקים קשים #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | כֵּן                                    |
| `check:known-symbols`             | מבצעי ספקים, אסטרטגיות ניתוב ומתרגמים הרשומים בטבלאות השליחה שלהם תואמים לקבצים בדיסק — ללא סמלים יתומים או לא מוכרזים                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | כֵּן                                    |
| `check:route-guard-membership`    | כל מסלול שמוליד תהליך ילד מסווג לפי `isLocalOnlyPath()` (הכללים הקשים #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | כֵּן                                    |
| `check:test-discovery`            | כל קובץ `*.test.ts` / `*.spec.ts` ב-repo נאסף על ידי לפחות רץ בדיקה אחד (ראצ'ט: רשימת יתומים ב- `test-discovery-baseline.json` יכולה רק להתכווץ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | כֵּן                                    |
| `check:test-tla-order`            | שום קובץ `node:test` תחת `tests/unit` לא רושם בדיקה, פוגע ב- `await` ברמה העליונה, ואז רושם יותר (#18045; מחד: `test-tla-order-allowlist.json` יכול רק להתכווץ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | כֵּן                                    |
| `check:agent-skills-sync`         | חפצי כישורי סוכן שנוצרו תואמים לקטלוג המקור שלהם (ללא סחף)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | ספק logos/assets נושא ערך מקור מתועד                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | קובצי התצורה JSON מנתחים ועומדים בחוקי ה-repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | הידור TypeScript ללא שגיאות (אזהרות מייעצות בלבד)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | כֵּן                                    |
| `typecheck:noimplicit:core`       | קפדנית `noImplicitAny` — צופה פני עתיד; אתרי שיחות רבים קיימים עדיין זקוקים להערות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **מְיָעֵץ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` בטווח של `src/app/(dashboard)/**` (#7033) — רשימת ההיתרים של `typecheck:core` של 27 קבצים אינה כוללת שום לוח מחוונים TSX, וגם `next build` אף פעם לא בודק אותו (`next.config.mjs` קובע `ignoreBuildErrors: true`), כך שרגרסיות של מזהים יתומים שם (#6625/#6909) היו בלתי נראות ל- CI. הבדלים מול קו בסיס של ספירת per-file/per-TS-code קפואה (`config/quality/dashboard-typecheck-baseline.json`, אותו דפוס אכיפה מעופש כמו `check:known-symbols`) שגיאות NEW בלבד — מעבר לספירת הבסיס נכשלות בשער; הורד עם `--update` כאשר שגיאה קיימת מתוקנת.                                                                                                                                                                                                                                 | כֵּן                                    |
| `check:build-typecheck`           | בדיקת סוג ייצור של אפליקציה שלמה על `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), רשימת ההיתרים בת 27 קבצים של פני השטח ושער לוח `typecheck:core` אינם מכסים. הבדלים נגד `config/quality/build-typecheck-baseline.json`; ספירה חדשה או מוגברת ל-(קובץ, קוד) נכשלת, ספירה נמוכה יותר מבקשת ממך לחשוף. `--update` מסרב בזמן שהריצה מכילה זוג חדש או מוגבה אלא אם הועבר `--force-regressions`, ומסרב לקובץ שהושתק לאחרונה אלא אם כן הועבר `--force-nocheck`, כך שהרחבת קו הבסיס כדי להיות ירוק והענקת שתיקה קבועה הן שתי פעולות מכוונות נפרדות. `--force` חשוף נדחה. סורק גם את היקף הבנייה עבור `@ts-nocheck` מול `config/quality/ts-nocheck-baseline.json`, מכיוון שקובץ המשתמש בו מדווח על אבחון כלל וכלל לא יהיה בלתי נראה לכל שער. | כֵּן                                    |

#### שתי תוכנות בדיקת סוג עונות אחרת

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) ו- `check:build-typecheck` קומפלו תוכניות שונות תחת אפשרויות שונות, ואותו קובץ יכול להיות נקי באחת ומלא שגיאות באחר.

`tsconfig.build.json` מגדיר `"strict": false`, אז `noImplicitAny` כבוי. תצורת הליבה מרכיבה רשימת היתרים של 27 קבצים עם אפשרויות מחמירות יותר ועוקבת אחר גרף הייבוא של כל ערך, כך שקבצים שלעולם אינם מופיעים בתוכנית הבנייה עדיין נבדקים שם.

התוצאה חשובה כאשר שופטים אם קובץ מוקלד:**אפס אבחון תחת `check:build-typecheck` לא אומר אפס** . הסרת `@ts-nocheck` מ-26 קבצים הראתה 23 מהם נקיים בתוכנת הבנייה; שישה עשר מאלה עלו על פני כ-120 שגיאות מרומזות כלשהן בשגיאה המחמירה. בדוק את שניהם לפני שתקרא לקובץ נקי.

### תפקיד: `quality-gate`

רץ אחרי `test-coverage`. בלוקים מתמזגים על כישלון.

| תַסרִיט                      | מאמת                                                                                                                               | חסימה                     |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | פולט `quality-metrics.json` (ספירת אזהרות ESLint, כיסוי מדוח רסיס ממוזג)                                                           | כן (במעלה הזרם של הראצ'ט) |
| `quality:ratchet`            | כל מדד ב- `quality-baseline.json` לא נסגר (ESLint אזהרות ≤ baseline; כיסוי ≥ baseline)                                             | כֵּן                      |
| `check:duplication`          | שכפול קוד (jscpd@4) אינו חורג מהבסיס ב- `quality-baseline.json`                                                                    | כֵּן                      |
| `check:complexity`           | המורכבות הציקלומטית ברמת הקובץ אינה חורגת מהמכסה (הליבה ESLint `complexity` + `max-lines-per-function`)                            | כֵּן                      |
| `check:cognitive-complexity` | מחגר למורכבות קוגניטיבית (`eslint-plugin-sonarjs`) — מעבר ESLint נפרד; CI פועל שניהם ממוזגים כשלב `check:complexity-ratchets` יחיד | כֵּן                      |
| `check:dead-code`            | יצוא / קבצים לא בשימוש (knip) אינו נסוג לעומת קו הבסיס                                                                             | כֵּן                      |
| `check:compression-budget`   | רצפות חסכון באסימונים של תקציב — לכל מנוע אסורות לסגת                                                                              | כֵּן                      |
| `check:type-coverage`        | ראצ'ט מוקלד באחוזים (`type-coverage`) אינו נסוג; מסתכמת במידה רבה `typecheck:noimplicit:core`                                      | כֵּן                      |

### משרות: `codeql-scan` ו- `codeql-admission`

`codeql-scan` מייצרת את כל קטגוריות הניתוח המוגדרות. לאחר שהעבודה תצליח, `codeql-admission` מאמתת את ההעלאות המדויקות שלה ואת מחגר ההתראה של המועמד. שניהם הם תלות נדרשת של `Gate / CI`, כולל מועמדים למסמכים בלבד. הדרישות הניהוליות והקנריות מתוארות תחת "מחגר CodeQL " להלן.

| תַסרִיט                | מאמת                                                                                                                                                     | חסימה |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| `check:codeql-ratchet` | המועמד ref/SHA וכל קטגוריות הניתוח המוגדרות חייבות להיות עדכניות לפני מחגר ההתראה; חסימות ראיות חסרות. המלאי הגלובלי נשאר נפרד — ראה "מחגר CodeQL " להלן | כֵּן  |

### תפקיד: `quality-extended`

המשרה חוסמת מועמדים רלוונטיים. גודל החבילה, ממצאים סודיים, ממצאי פגיעות, ממצאי זרימת עבודה ושינויים OpenAPI נבדקים באמצעות ראצ'ים נדרשים. אבחון תלות מעגלי נשאר מייעץ. נדרשת התקנת סורק: `scripts/ci/install-quality-scanners.sh` מספק גרסאות מוצמדות ומפיץ כשלי התקנה. כלים חסרים, דוחות לא חוקיים או קווי בסיס חסרים עוזבים את שער הסורק הנדרש INCOMPLETE.

| תַסרִיט                  | מאמת                                                                                                                                                                                     | חסימה                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `check:circular-deps`    | אין תלות מעגלית (dpdm)                                                                                                                                                                   | **מְיָעֵץ**                          |
| `check:bundle-size`      | גודל החבילה אינו חורג מהמכסה; מדידה לא זמינה נכשלת                                                                                                                                       | **חסימה עם --ratchet**               |
| `check:secrets`          | ממצאי Gitleaks אינם נסוגים; סריקות נדרשות דוחות tools/source/baseline חסר, סריקות כושלות ודוחות לא חוקיים                                                                                | **חסימה עם --ratchet**               |
| `check:vuln-ratchet`     | נקודות תורפה של תלות אינן נסוגות; סריקות נדרשות דוחות כלים חסרים, דוחות לא חוקיים או קווי בסיס חסרים                                                                                     | **חסימה עם --ratchet**               |
| `check:workflows`        | מוך זרימת עבודה (actionlint + zizmor); סורקי missing/broken, דוחות לא חוקיים או קו בסיס מחגר חסר נכשלים כ- INCOMPLETE. ממצאים תקפים פועלים בהתאם למדיניות strict/advisory/ratchet שנבחרה | נדרש ביצוע; חסימת ראצ'ט zizmor ב- CI |
| `check:openapi-breaking` | חוזה API ציבורי נגד התחייבויות אירוע מוצמדות (בסיס מיזוג PR, דחיפה לפני, בסיס מיזוג קבוצה; אב ראשון לקופה scheduled/manual ); המדידה הנדרשת נכשלה סגורה                                  | **חסימה עם --ratchet**               |

### תפקיד: `docs-sync-strict`

עבור בקשות משיכה ל- `main` או `release/**`, עבודה זו פועלת רק עבור מועמדים שאינם טיוטה (או תור מהימן) המסווגים כתיעוד או שינויים בקוד. הוא פועל גם באירועי CI שאינם PR; הדק הדחיפה של זרימת העבודה הזו מכסה רק `main`, לא `release/**`. צעד שיוצא ללא אפס חוסם את העבודה; ממצאי דיווח בלבד ופטורים מתועדים להלן אינם.

| תַסרִיט                        | מאמת                                                                                                                                                                                                                                                                                                             | חסימה                                                                                                      |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | מטא-שער שמריץ את 7 שערי המשנה למטה ברצף                                                                                                                                                                                                                                                                          | כֵּן                                                                                                       |
| ↳ `check:docs-sync`            | עקביות גרסת Package/OpenAPI/CHANGELOG, מראות `llm.txt` מדויקות, אינוריאנטים מתורגמים של CHANGELOG section/size והעדר מסמכים כפולים מוחלפים                                                                                                                                                                       | כֵּן                                                                                                       |
| ↳ `check:docs-frontmatter`     | דפי תיעוד מלוקטים נושאים כותרות תקפות של frontmatter                                                                                                                                                                                                                                                             | כֵּן                                                                                                       |
| ↳ `check:docs-counts`          | אינוריאנטים של ספירת ביטחון גבוהה הם קפדניים; בדיקות היוריסטיות של ספירת קבצים מזהירות רק אלא אם כן הסקריפט מקבל `--strict` (המטא-שער CI לא עובר אותו)                                                                                                                                                           | חסימת שכבות קפדנית; ייעוץ שכבה רכה                                                                         |
| ↳ `check:env-doc-sync`         | מקור env reads, `.env.example` ו- `docs/reference/ENVIRONMENT.md` מסכימים לאחר רשימת ההתעלמות המפורשת, מסמכים בלבד ו-env בלבד                                                                                                                                                                                    | כן, מחוץ לרשימות ההיתרים המתועדות                                                                          |
| ↳ `check:deprecated-versions`  | מדווח על גרסאות מיושנות פוטנציאליות מחוץ להקשרים היסטוריים בטוחים ותאריכי עדכון מיושנים, לא כולל מסמכים שהתעלמו מהם                                                                                                                                                                                              | ייעוץ בחיווט CI נוכחי (`--strict` לא עבר)                                                                  |
| ↳ `check:doc-links`            | קישורי סימון פנימיים במסמכים פותרים לקבצים אמיתיים (טופס `[text]`/`(path)` )                                                                                                                                                                                                                                     | כֵּן                                                                                                       |
| ↳ `check:fabricated-docs`      | מסלולים, env vars, פקודות CLI, שמות Hook ונתיבי קבצים המצוטטים במסמכים קיימים בבסיס הקוד. שער קשה דרך `--strict`; soft-fail ללא דגל.                                                                                                                                                                             | כן (דרך `--strict` ב- CI)                                                                                  |
| `check:cli-i18n`               | מפתחות CLI `t()` משומשים קיימים ב- `en`; `pt-BR` שומר על כל חלק ברמה העליונה; `zh-CN` ו- `zh-TW` מכילים כל מפתח מ- `en`                                                                                                                                                                                          | כֵּן                                                                                                       |
| `check:openapi-coverage`       | מפרט OpenAPI מכסה לפחות רצפת צר של מסלולים אמיתיים                                                                                                                                                                                                                                                               | כֵּן                                                                                                       |
| `check:openapi-security-tiers` | הערות `x-loopback-only`/`x-always-protected` המוצהרות חייבות להיות מגובות על ידי `routeGuard.ts`; בלוק אי התאמה של מנתח והעברה. הבדיקה ההפוכה של `x-loopback-only` חסר תחת קידומות מקומיות בלבד מזהירה, ומסלולים עם דפוס בלבד אינם נכללים מאותו מעבר הפוך.                                                       | Parser/forward בודקת חסימת המחאות; ייעוץ בדיקה הפוכה                                                       |
| `check:openapi-routes`         | כל נתיב `/api...` ב- `openapi.yaml` פותר ללא רגישות פרמטרים למסלול אמיתי לאחר רשימת ההיתרים המוצדקת `KNOWN_STALE_SPEC` ; גם רשומות רשומות מיושנות נכשלות                                                                                                                                                         | כֵּן                                                                                                       |
| `check:docs-symbols`           | הפניות פנימיות `/api/...` URL במסמכים קנוניים שאינם מראה פותרות למסלול אמיתי או למשפחת מסלולים; הפניות proxy/upstream/placeholder/file וערכים מוצדקים `KNOWN_STALE_DOC_REFS` אינם נכללים, והרשומות מיושנות של רשימת ההיתרים נכשלות                                                                               | כֵּן                                                                                                       |
| `i18n translation drift`       | קבלה מוחלטת דורשת אפס חוסר עקביות של מקור, יעד חסר, יעד-hash, תרגום מעופש וקטע-מטמון. הכנה רגילה PR עשויה לשמור ראיות בירושה מדויקות או שינוי ממתין באנגלית בלבד עם מצב מלא ללא שינוי ובייטים יעד; הדו"ח שלו מכריז בנפרד על מוכנות למיזוג. גיבוב יעד חסר וחסום ראיות בסיס לא שלם. מטמון מדור מדור קודם אינו כשל. | כל חמשת השיעורים חוסמים קבלה queue/base ; אישורי הכנה רגילים שהוכחו רק בתורשה או עבודה ממתינה באנגלית בלבד |

שנים עשר README SVGs תחת `docs/diagrams/` נוצרים (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` מחדש את כולם). לכל אחד יש מבחן יחידת השוואת בתים (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) שנכשל כאשר הקובץ המחויב מיושן, ו- `check:docs-counts` קורא מספרים קנוניים מצמתי `<text>` שלהם — וזו הסיבה ששלב המתאר שומר על כל מחרוזת מתוארת בקובץ כ- `<text>` בלתי נראה. בדיקת המספרים הקנוניים SVG קוראת את הקבצים הרשומים ב- `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, בתוספת `public/images/tier-flow-dark.svg` ו- `tier-flow-light.svg`; הטענות בחינם לנצח, כניסה לקטלוג, מאגר חוזר וגורמי ניקוד קוראים גם `promise-pillars.svg`, `free-tier-budget.svg` ו- `strategies-grid.svg`. `free-tier-budget.svg` שואבת את הנתונים שלו ממטען הקטלוגים החי, כך ששינוי ל- `FREE_MODEL_BUDGETS` או לשם תצוגה של ספק הופך CI לאדום עד שהקובץ הזה יופק מחדש.

### תפקיד: `i18n-ui-coverage`

| תַסרִיט                          | מאמת                                                                                                                                                     | חסימה     |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check-ui-keys-coverage` (מוטבע) | כיסוי מפתח UI i18n הוא ≥ 65%                                                                                                                             | כֵּן      |
| `check-ui-value-drift` (מוטבע)   | אנגלית משוכתבת **עֵרֶך** לא משאיר אחריו תרגום מעופש                                                                                                      | כֵּן      |
| `check-new-key-coverage` (מוטבע) | א **חָדָשׁ** מפתח אנגלי מתורגם בכל מקום — סמן `__MISSING__:` נדחה                                                                                        | כֵּן      |
| `check-translation-ratio`        | יחס תרגום אמיתי לכל מקום (זהה לאנגלית / מציין מיקום / עלים חסרים מחוץ לרשימת ההיתרים) לא יעלה על רפיון `config/quality/i18n-translation-baseline.json` + | **חסימה** |

צריך `fetch-depth: 0` — שער סחיפת הערך מבדל `en.json` מול בסיס המיזוג.

#### שער תרגום `check-ui-value-drift` — מעופש

תופס את הרגרסיה האחת i18n שהשערים האחרים אינם יכולים לראות מבחינה מבנית: ערך אנגלי נכתב מחדש והתרגומים שנגזרו מהאנגלית _הקודמת_ נשארים מאחור, כך שמשתמשים שאינם אנגלים ממשיכים לקרוא עותק מנוסח בבטחה, כעת שגוי.

זה נשלח באמת. `oauthModal.googleOAuthWarning` נכתב מחדש כאשר נחת עוזר הכניסה Antigravity (#5203);**39 מתוך 43 מקומות** כל הזמן טקסט שאומר למפעילים "להעתיק את ה- URL המלא ולהדביק אותו למטה" — זרימה שאינה יכולה להשלים עבור אותו ספק. זה לא הבחין עד #8463 כי:

- `sync-ui-keys` ממלא רק מפתחות שכן **נֶעדָר** , אף פעם לא כאלה שכן **לֹא טָרִי** ;
- `check-ui-keys-coverage` סופר את _נוכחות_ המפתח, כך שתרגום מעופש מקבל ציון כמקורו;
- `check-translation-drift` עוקב אחר התיעוד `docs/i18n/<locale>/**.md` משקף — שהוא אף פעם לא קורא `src/i18n/messages/*.json`. חסימת עבודה `docs-sync-strict` מאז הסנכרון מחדש 2026-09: ערוך מסמך ליבה → `npm run i18n:run -- --files=<doc>` (ברמת המדור, זול).

**מודע לשינוי, לא מגובה בקו הבסיס.** הוא משווה `en.json` בבסיס המיזוג מול עץ העבודה; עבור כל מפתח שהערך שלו באנגלית השתנה, כל מקום שעדיין מחזיק בתרגום שלא נגוע הוא מעופש. זאת בכוונה **מקפיא חוב קיים** — a diff לא יכול לחשוף מאיזו אנגלית ישנה הגיע תרגום ותיק, ולכן השער שופט רק במה נוגע השינוי הנוכחי. האלטרנטיבה (קו בסיס גיבוב לכל מפתח) תעלה קובץ שנוצר ב- ~ 600 KB, 3 × הקו הבסיסי הגדול ביותר הקיים, שיתבצע בכל i18n PR.

שתי דרכים לספק את זה:

1. לעדכן את התרגומים המושפעים, או
2. הגדר אותם ל- `__MISSING__:<new english>` — זמן הריצה ולאחר מכן משרת את האנגלית המתוקנת (`src/i18n/request.ts::deepMergeFallback`, #7258) ואת תורי המפתח לתרגום.

אם המחרוזת **מַשְׁמָעוּת** השתנה, מעדיף **שינוי שם המפתח** : מפתח חדש לא יכול לרשת תרגום מיושן. זה התבנית שבה השתמש #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

שערי היסחפות הערך והשערים החדשים חולקים השוואה אחת בלתי משתנה מ- `scripts/i18n/resolve-ui-diff-base.mjs`. זרימת העבודה מעבירה את אותו בסיס, טיפ בסיס ומועמד SHAs לשני המחאות. ריצות PR/base-retarget, דחיפה ומיזוג קבוצות משתמשות בהקשר האירועים שלהן. שליחת סניף מועמד דורשת את PR הפתוח המדויק שלו או את קלט `i18n_base_sha` המפורש. שיגור או תצפית מתוזמנת של `main` או `release/vX.Y.Z` ללא קלט זה משווה את ההתחייבות האחרונה עם ההורה הראשון שלה; זה לא ביקורת של כל חוב התרגום שעבר בירושה. הפעלה מקומית דורשת בסיס השוואה מפורש, למשל פקודת `BASE_REF` למעלה.

הקשר השוואה חסר או מעורפל, קטלוג נדרש בלתי קריא או לא חוקי ומועמד שהשתנה מייצרים `INCOMPLETE` עם קוד יציאה **2** , כולל במצב התרעה. קריאות קטלוג משתמשות `scripts/i18n/read-ui-catalog.mjs`; כשלי קריאה אינם מוחלפים באובייקטים ריקים. לא בסיס לא זמין ולא קלט לא שלם מבססים PASS.

### תפקיד: `i18n`

מטריצת אימות מלאה של i18n (עבודה אחת לכל מקום). כל התפקיד הוא מייעץ.

| תַסרִיט                         | מאמת                  | חסימה                                                |
| ------------------------------- | --------------------- | ---------------------------------------------------- |
| `validate_translation.py quick` | שלמות התרגום לכל מקום | **מְיָעֵץ** (`continue-on-error: true` על כל העבודה) |

### תפקיד: `pr-test-policy`

פועל על בקשות משיכה בלבד.

| תַסרִיט                | מאמת                                                                                                      | חסימה |
| ---------------------- | --------------------------------------------------------------------------------------------------------- | ----- |
| `check:pr-test-policy` | PRs שמשנה קוד ייצור ב- `src/`, `open-sse/`, `electron/` או `bin/` חייב לכלול או לעדכן בדיקות (חוק קשה #8) | כֵּן  |
| `check:test-masking`   | קבצי בדיקה שהשתנו אינם מפחיתים את ספירת הטענות נטו או מוסיפים טאוטולוגיות `assert.ok(true)`               | כֵּן  |
| `check:pr-evidence`    | גוף PR מצטט הוכחות test/VPS לשינוי (ממכן את הכלל הקשה #18 על ידי חיטוי פרוזה PR — שביר, ראה Backlog)      | כֵּן  |

### תפקיד: `test-vitest`

זקוק לעבודת סיווג `changes`. רסיסי מטריצה ישימים חוסמים מיזוג בכשל.

| סְוִיטָה         | מאמת                                                 | חסימה                                                                                        |
| ---------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `test:vitest`    | שרת MCP (110 כלים), autoCombo, מטמון — vitest runner | כֵּן                                                                                         |
| `test:vitest:ui` | רכיב UI בודק את — vitest runner                      | **חסימה** כשלים קיימים — אינם נכללים במפורש ב- `vitest.config.ts`; כשלים חדשים נכשלים בעבודה |

### תהליכי עבודה ליליים (מתוזמנים, מייעצים)

אלה פועלים על פי לוח זמנים של קרון (ו- `workflow_dispatch`), לעולם לא על PRs. כולם מייעצים.

| זרימת עבודה            | מאמת                                                                                                                     | חסימה       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `nightly-property`     | בדיקת מאפיינים מהירה עם ספירת ריצה גבוהה + זרע אקראית                                                                    | **מְיָעֵץ** |
| `nightly-resilience`   | שער גידול ערימה, הזרקת תקלות כאוס, k6 load/soak                                                                          | **מְיָעֵץ** |
| `nightly-llm-security` | מגן הזרקת promptfoo (מצב חסימה) בדיקות + garak (דילוג ללא סוד ספק)                                                       | **מְיָעֵץ** |
| `nightly-schemathesis` | חוזה OpenAPI fuzzing (סכמתזה) נגד OmniRoute חי באמצעות הפרות של משטחי `docs/openapi.yaml` — / 500 לא מטופלים (שלב 8 B.4) | **מְיָעֵץ** |
| `nightly-mutation`     | ציון בדיקת מוטציות של סטרייקר על נתיב היחידה המהירה — שורדים מוטנטים משטחים טענות חלשות                                  | **מְיָעֵץ** |
| `nightly-compat`       | מטריצת תאימות מנועי צומת על פני טווחי ה- `engines.node` הנתמכים                                                          | **מְיָעֵץ** |

קווי בסיס של ביצועים (ערימה, TTFB, זמן בנייה) נרשמים, לא מגודרים: ראה [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
