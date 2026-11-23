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

תהליכי העבודה CI ו-Quality Gates מפיקים כל אחד תוצאה יציבה: `Gate / CI` ו-
`Gate / Quality`. מדיניות הקבלה מנוהלת-הגרסאות שלהם מונה כל משימת upstream
כנדרשת או כמייעצת. משימה נדרשת ורלוונטית חייבת להצליח: תוצאות חסרות,
מבוטלות, מדולגות, ממתינות ולא ידועות אינן יכולות לקבוע PASS. סיווג תקף
של תיעוד בלבד או קטלוג בלבד עשוי להפוך נתיב קוד ללא רלוונטי;
טיוטת PR אינה מועמדת קבילה. תווית `hotfix` אינה פוטרת מהצגת ראיות.

שני תהליכי העבודה מכסים בקשות משיכה ודחיפות לענפי main/release, הפעלה ידנית
ואירועי merge-group. דחיפה, הפעלה ידנית ו-merge-group מריצים את הבחירה המלאה. מזלגות
וקבוצות מיזוג משתמשים ב-hosted runners עבור משימות שאחרת בוחרות ב-self-hosted
runners; יש לוודא קיבולת hosted מספקת לפני הפריסה.

כל קבלת JSON מזהה את ה-SHA שנמשך, את הרצת תהליך העבודה ואת ניסיון ההרצה.
ה-CLI דוחה אי-התאמה בין ה-SHA של ה-checkout לזה של האירוע. בדיקות תהליך העבודה קושרות את החברות במדיניות
לרשימת `needs` של משימת התוצאה, כך שנתיב חדש או נתיב שהוסר לא יוכל להיעלם בשקט.
הקבלות מכסות את תהליך העבודה שלהן עצמן, ולא פרסום, פריסה או את המנגנונים הפנימיים
של סורק מייעץ קיים. הפעלת שני שמות הבדיקה בכללי הענף היא
שינוי מנהלי נפרד; הוספת המשימות האלה אינה מגינה כשלעצמה על ענף.

### מלאי הסריקה הסטטית

מלאי כינויי ה-npm מנוהל-הגרסאות והחברות בסריקה הסטטית נמצאים ב-
`config/quality/gate-manifest.json`. הריצו `npm run check:gate-manifest` כדי לאמת
שמות סקריפטים ופקודות מדויקות מול `package.json`; הוספות, הסרות
ושינויים בפקודות מכשילים הן את ה-hook המקומי והן את משימות סיווג השינויים ב-CI.
כינוי אינו משימת תהליך עבודה, מופע מטריצה או מקרה בדיקה: אין
להציג ספירות אלה כבנות-החלפה.

השתמשו ב-`npm run quality:scan -- --list` או ב-`npm run quality:scan:fast -- --list`
כדי לבדוק את הכינויים שנבחרו מבלי להריץ אותם. ה-runner מפעיל את
נקודת הכניסה של npm, ולכן סביבת זמן הריצה שלה (כולל Bun כאשר הוגדר) נשמרת.
המניפסט מתעד כינויים שמחוץ לפרופילים אלה כמופעלים בנפרד, ופקודות
תחזוקה אסורות בפרופילי סריקה לקריאה בלבד.

פרופילים אלה מכסים את הסריקה הסטטית בלבד. הם אינם מאשרים בדיקות מוצר,
כיסוי, אריזה, בדיקות חיצוניות או את הקבלה המלאה של מועמד להפצה.
קבלת תהליך העבודה משתמשת ב-`config/quality/admission-policy.json` המקושר וב-
`scripts/quality/admission-verdict.mjs`. פרופילי release-observer נותרים נפרדים;
בדקו את הבדיקות והקבלות הרלוונטיות שלהם באופן עצמאי. מלאי הטקסט
שלהלן הוא אסמכתה, ולא הוכחה לכך ששער אכן הופעל.

הסקריפטים נמצאים תחת `scripts/check/` (שערי מדיניות) ו-`scripts/quality/` (מנוע ratchet).
מקור האמת של CI הוא `.github/workflows/ci.yml`.

### מסלול מהיר ל-PR של הפצה (`quality.yml`)

`.github/workflows/quality.yml` משלים את CI בבקשות משיכה לענפי main/release, בדחיפות
לענפים מוגנים, בהפעלה ידנית ובקבוצות מיזוג. בקשות משיכה משתמשות בבדיקות מהירות המסוננות לפי נתיב. בניית
הכפילות שהושבתה לצמיתות הוסרה; בדיקות הבנייה/האריזה/האתחול האמיתיות נשארות ב-CI.

| משימה                                            | היקף                                                                                                                                                                       | חוסמת           |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | בקשות משיכה של תיעוד/קוד; הפניות לתיעוד API ו-docs-all                                                                                                                     | כן              |
| `Fast Quality Gates`                             | בקשות משיכה של קוד; בדיקות סטטיות, בדיקת טיפוסים, בדיקת טיפוסים של לוח המחוונים, בדיקות יחידה מושפעות                                                                      | כן              |
| `Forgotten sibling tests`                        | בקשות משיכה של קוד; מודולים ששונו ונעקבים אל צרכנים סטטיים ובדיקות אחיות מועמדות; נתיבי barrel ו-dynamic-import מדווחים כאבחונים מייעצים, עם חריגים מאושרים ברשימת ההיתרים | **מייעצת**      |
| `Vitest (fast-path)`                             | בקשות משיכה של קוד; חבילת vitest מהירה                                                                                                                                     | כן              |
| `Unit Tests fast-path`                           | בקשות משיכה של קוד; חבילת בדיקות יחידה ב-4 רסיסים                                                                                                                          | כן              |
| `No new ESLint warnings`                         | בקשות משיכה של קוד; מגן lint המודע להשׁתקות                                                                                                                                | כן, כולל מזלגות |
| `Merge integrity (changelog + generated skills)` | בקשות משיכה שאינן טיוטה; סנכרון יומן שינויים ומיומנויות שנוצרו                                                                                                             | כן, כולל מזלגות |

#### דוח בדיקות אחיות שנשכחו

`npm run check:forgotten-sibling-tests` עושה שימוש חוזר בפותר הייבואים שמאחורי מפת השפעת הבדיקות.
עבור כל מודול ייצור שהשתנה, הוא מדווח על שרשראות דטרמיניסטיות
`מודול/סמל שהשתנה -> צרכן סטטי -> בדיקת אחות מועמדת` כאשר הבדיקה המועמדת
אינה נכללת ב-diff של בקשת המשיכה. סיכום ה-Markdown ותוצאת ה-JSON נשמרים כארטיפקט תהליך העבודה
`forgotten-sibling-tests` לצורך כיול לפני כל פריסה חוסמת.

ייצואים מחדש מסוג Barrel וייבואים דינמיים משמשים לאבחון רזולוציה בלבד; הם לעולם אינם יוצרים
ממצא חוסם. חריגים שנבדקו נמצאים ב־
`config/quality/forgotten-sibling-allowlist.json`. כל רשומה חייבת לציין את בדיקת הצרכן ואת הבדיקה
המועמדת, לספק נימוק ספציפי ולקשר לבעיה או לבקשת משיכה ב־GitHub. רשומות פגומות נכשלות
במצב סגור. חריגים אינם יכולים להסתיר בדיקה מועמדת שנמחקה או הבדל שמוסיף `.skip`/`.todo`;
החלשת טענות ושיטות הסתרה אחרות נותרות באחריות שער
`check:test-masking`, שחוסם באופן עצמאי.

### משימה: `lint`

רצה בכל בקשת משיכה אל `main`. חוסמת מיזוג במקרה של כשל.

| סקריפט (`npm run ...`)            | מה הוא מאמת                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | חוסם                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `check:node-runtime`              | גרסת Node.js נמצאת בטווח הנתמך                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | כן                                    |
| `check:cycles`                    | ייבואים מעגליים בכל `src/` + `open-sse/` (מבוסס AST, עם רזולוציה של `paths` מתוך tsconfig). הרצה ישירה מחזירה קוד יציאה 1 בכל פעם שקיים מחזור כלשהו (כשל במצב סגור מאז #15281) ומציגה את רכיבי הקשירות החזקה. `check:cycles:ratchet` (שמופעל ב־CI) חוסם כאשר הכמות חורגת מהתקרה `metrics.cycles` שב־`quality-baseline.json` — כעת 14, עם `direction: down`, ולכן היא יכולה רק לרדת (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                             | כן (מחגר)                             |
| `check:boundary`                  | הצימוד `open-sse → src`: ייבואים ייחודיים מקובץ לקובץ מהמנוע אל היישום (`scripts/quality/measure-boundary.mjs`; רשימת הקשתות היא צבר משימות התיקון של פיצול הליבה/המודולים ב־v4). הרצה ישירה = דוח מייעץ (זהה ל־`quality:boundary`). `check:boundary:ratchet` (שמופעל ב־CI וגם בלולאת המחגר של השערים המהירים ב־`quality.yml`) חוסם כאשר הכמות חורגת מהתקרה `metrics.boundaryOpenSseToSrc` שב־`quality-baseline.json` — אותחלה לערך 771 שנמדד, עם `direction: down`; האפשרות `--update` רק מורידה אותה; ביחס לבסיס בבקשות משיכה (`--base-ref`, ראו להלן)                                                                                                                                                                                                                                                          | כן (מחגר)                             |
| `check:route-validation:t06`      | קיימות סכמות Zod בכל הנתיבים (מדיניות שכבה 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | כן                                    |
| `check:any-budget:t11`            | מספר המופעים של `@ts-expect-error // any` אינו חורג מהתקציב (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | כן                                    |
| `check:provider-consistency`      | לכל ספק ב-`providers.ts` יש רשומה תואמת ב-`providerRegistry.ts` (ולהפך, במסגרת רשימת ההיתרים)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | כן                                    |
| `check:model-lifecycle`           | שלוש טבלאות הניתוב המתוחזקות ידנית נשארות עקביות עם תמונת המצב של מחזור החיים שנשמרה במאגר (#11503): ‏`FITNESS_TABLE` ‏(`taskFitness.ts`) אינה מעניקה ציון למזהה שיצא משימוש וש-`REGISTRY` יכולה לנתב; כל יעד של `BUILT_IN_ALIASES` קיים ב-`REGISTRY` ואינו נמצא בתמונת המצב של המזהים שיצאו משימוש; כל מזהה שיצא משימוש ועדיין נמצא ב-`REGISTRY` מועבר הלאה או מופיע ב-`allowedRetiredInCatalog`; ואף מקור או יעד של `DEFAULT_DEGRADATION_MAP` אינו מופיע בתמונת מצב זו ככזה שיצא משימוש. בדיקה זו אינה מוכיחה שמודל מסופק כעת על ידי שירות פעיל במעלה הזרם. לא מקוון — משווה מול `config/quality/model-lifecycle.json`, שמתעדכן ידנית באמצעות `npm run quality:refresh-model-lifecycle` (דורש רשת; אינו משולב ב-CI). ‏`allowedRetiredInCatalog` הוא מנגנון צמצום הדרגתי: יש להוסיף רשומה רק בצירוף סוגיית מעקב. | כן                                    |
| `check:fetch-targets`             | כל `fetch("/api/...")` בצד הלקוח תחת `src/` מפנה לקובץ `route.ts` אמיתי                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | כן                                    |
| `check:deps`                      | כל יחסי התלות הניתנים להתקנה באמצעות `npm install`, בכל קובץ `package.json` במאגר, נמצאים ב-`dependency-allowlist.json`; חבילות חדשות שאינן מקובעות לגרסה או החשודות ב-slopsquatting מסומנות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | כן                                    |
| `audit:deps`                      | `npm audit` (שורש + electron) — אין התראות בדרגת חומרה גבוהה/קריטית (חופף ל-`check:vuln-ratchet` של osv; ראו Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | כן                                    |
| `check:lockfile`                  | תקינות `package-lock.json` — רישום https, גיבובי תקינות, ללא דריסות מארח                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כן                                    |
| `check:licenses`                  | רשימת היתרים של רישיונות SPDX עבור תלויות ייצור                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | כן                                    |
| `check:tracked-artifacts`         | ללא תוצרי בנייה / קישורי `node_modules` שבוצע להם commit (רץ גם ב־pre-commit של husky; ‏pre-push קל במכוון — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | כן                                    |
| `check:ai-attribution`            | ללא שורת סיום `Co-Authored-By` של בינה מלאכותית/בוט או כותרת תחתונה המציינת יצירה באמצעות בינה מלאכותית ב־commits, בכותרת או בגוף של PR — כלל מחייב #16 (בלולאת הבדיקות המהירות של `quality.yml` עבור PR→`release/**` — קורא את מטען האירוע ואינו מבצע דבר מחוץ ל־PR — וכן בשלב המיועד ל־PR בלבד בבדיקת lint של `ci.yml` עבור PR→`main`; גם ב־hook מסוג `commit-msg` של husky; מחברים־שותפים אנושיים מותרים; #14436)                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | כל החרגת Vitest מציינת issue למעקב ומופיעה ב־`config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | כן                                    |
| `check:file-size`                 | קובצי מקור (`.ts`/`.tsx` בתוך `src/`, ‏`open-sse/`, ‏`electron/`, ‏`bin/`) נשארים בגבולות `cap`, וקובצי בדיקות (`*.test.ts(x)`) בגבולות `testCap`; קבצים שהוקפאו ב־`file-size-baseline.json`‏ (`frozen` / `testFrozen`) אינם רשאים לגדול מעבר לגודל המתועד שלהם                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | כן                                    |
| `check:error-helper`              | תגובות שגיאה ב-executors/handlers משתמשות ב-`buildErrorBody()` / `sanitizeErrorMessage()` (כלל קשיח #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כן                                    |
| `check:migration-numbering`       | קובצי SQL של מיגרציות ממוספרים ברצף, ללא פערים או כפילויות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | כן                                    |
| `check:public-creds`              | אין ערכי OAuth מילוליים של `client_id`/`client_secret` או מפתחות Firebase Web מחוץ ל-`publicCreds.ts` (כלל קשיח #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | כן                                    |
| `check:db-rules`                  | אין SQL גולמי מחוץ למודולים שב-`src/lib/db/`; אין ייבואי barrel מתוך `localDb.ts` (כללים קשיחים #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | כן                                    |
| `check:known-symbols`             | ה-executors של הספקים, אסטרטגיות הניתוב והמתרגמים הרשומים בטבלאות הניתוב שלהם תואמים לקבצים בדיסק — ללא סמלים יתומים או סמלים שלא הוצהרו                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כן                                    |
| `check:route-guard-membership`    | כל נתיב שמפעיל תהליך-צאצא מסווג על ידי `isLocalOnlyPath()` (כללים קשיחים #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | כן                                    |
| `check:test-discovery`            | כל קובץ `*.test.ts` / `*.spec.ts` במאגר נאסף על ידי מריץ בדיקות אחד לפחות (מנגנון הידוק: רשימת הקבצים היתומים ב-`test-discovery-baseline.json` יכולה רק להצטמצם)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | כן                                    |
| `check:agent-skills-sync`         | תוצרי agent-skills שנוצרו תואמים לקטלוג המקור שלהם (ללא סטייה)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | לסמלי לוגו/נכסים של ספקים יש רשומת מקור מתועדת                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | קובצי תצורת JSON מנותחים בהצלחה ועומדים בכללי ה-lint של המאגר                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | הידור TypeScript ללא שגיאות (אזהרות מייעצות בלבד)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | כן                                    |
| `typecheck:noimplicit:core`       | `noImplicitAny` מחמיר — מיועד לעתיד; אתרי קריאה קיימים רבים עדיין זקוקים להערות טיפוסים                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **מייעץ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` המוגבל ל-`src/app/(dashboard)/**` (#7033) — רשימת ההיתרים המצומצמת בת 27 הקבצים של `typecheck:core` אינה כוללת אף קובץ TSX של לוח המחוונים, וגם `next build` לעולם אינו בודק שם טיפוסים (`next.config.mjs` מגדיר `ignoreBuildErrors: true`), ולכן רגרסיות של מזהים יתומים שם (#6625/#6909) לא היו גלויות ל-CI. השוואה מול קו בסיס קפוא של ספירה לפי קובץ ולפי קוד TS (`config/quality/dashboard-typecheck-baseline.json`, אותו דפוס אכיפה נגד התיישנות כמו `check:known-symbols`) — רק שגיאות חדשות מעבר לספירה שבקו הבסיס מכשילות את שער האיכות; יש להדק כלפי מטה באמצעות `--update` כאשר שגיאה קיימת מתוקנת.                                                                                                                                                                                              | כן                                    |

### משימה: `quality-gate`

רץ לאחר `test-coverage`. חוסם מיזוג במקרה של כשל.

| סקריפט                       | מה הוא מאמת                                                                                                                                      | חוסם                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `quality:collect`            | מפיק את `quality-metrics.json` (מספר אזהרות ESLint, כיסוי מתוך דוח ה-shards הממוזג)                                                              | כן (לפני ה-ratchet) |
| `quality:ratchet`            | כל מדד ב-`quality-baseline.json` לא נסוג (אזהרות ESLint ≤ קו הבסיס; כיסוי ≥ קו הבסיס)                                                            | כן                  |
| `check:duplication`          | שכפול קוד (jscpd@4) אינו חורג מקו הבסיס שב-`quality-baseline.json`                                                                               | כן                  |
| `check:complexity`           | המורכבות הציקלומטית ברמת הקובץ אינה חורגת מהתקרה (`complexity` של ESLint הליבה + `max-lines-per-function`)                                       | כן                  |
| `check:cognitive-complexity` | מנגנון ratchet למורכבות קוגניטיבית (`eslint-plugin-sonarjs`) — הרצת ESLint נפרדת; CI מריץ את שתיהן במאוחד כשלב היחיד `check:complexity-ratchets` | כן                  |
| `check:dead-code`            | מנגנון ratchet לייצואים / קבצים שאינם בשימוש (knip) אינו נסוג ביחס לקו הבסיס                                                                     | כן                  |
| `check:compression-budget`   | תקציב benchmark לדחיסה — ספי המינימום לחיסכון בטוקנים לכל מנוע אינם יכולים לסגת                                                                  | כן                  |
| `check:type-coverage`        | מנגנון ratchet לאחוז הקוד המוקלד (`type-coverage`) אינו נסוג; מחליף במידה רבה את `typecheck:noimplicit:core`                                     | כן                  |
| `check:codeql-ratchet`       | מספר התראות CodeQL הפתוחות אינו נסוג (נקרא באמצעות `gh api`; דילוג מסודר ללא token) — לתדירות הרענון ולהפעלה ידנית: ראו "CodeQL ratchet" להלן    | כן                  |

### משימה: `quality-extended`

המשימה כולה היא בגדר המלצה (`continue-on-error: true`). מנגנוני ה-ratchet מבוססי npm רצים
בפועל; הסורקים החיצוניים מותקנים באמצעות `gh release download` ומדלגים על עצמם (exit 0)
כאשר קובץ בינארי עדיין חסר.

| סקריפט                   | מה הוא מאמת                                                                                                                                                                                    | חוסם                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:circular-deps`    | אין תלויות מעגליות (dpdm)                                                                                                                                                                      | **בגדר המלצה**                            |
| `check:bundle-size`      | גודל ה-bundle אינו חורג מהתקרה                                                                                                                                                                 | **בגדר המלצה**                            |
| `check:secrets`          | סריקת סודות (gitleaks) — מדלג אם הקובץ הבינארי חסר                                                                                                                                             | **בגדר המלצה**                            |
| `check:vuln-ratchet`     | חולשות בתלויות (osv-scanner) אינן נסוגות — מדלג אם הקובץ הבינארי חסר                                                                                                                           | **בגדר המלצה**                            |
| `check:workflows`        | lint של תהליכי עבודה (actionlint + zizmor); סורקים חסרים/תקולים, דוחות לא תקינים או קו בסיס חסר ל-ratchet נכשלים כ-INCOMPLETE. ממצאים תקינים פועלים לפי מדיניות strict/advisory/ratchet שנבחרה | נדרשת הרצה; ה-ratchet של zizmor חוסם ב-CI |
| `check:openapi-breaking` | שינויים שוברים בחוזה ה-API הציבורי (`openapi.yaml`) לעומת ענף הבסיס (oasdiff) — מפיק `openapiBreaking=N`; מדלג אם oasdiff חסר או אם לא ניתן לפתור את מפרט הבסיס                                | **בגדר המלצה**                            |

### משימה: `docs-sync-strict`

רץ בכל PR אל `main`. חוסם מיזוג במקרה של כשל.

| סקריפט                         | מה הוא מאמת                                                                                                                                | חוסם                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `check:docs-all`               | שער־על שמריץ ברצף את 6 שערי המשנה שלהלן                                                                                                    | כן                           |
| ↳ `check:docs-sync`            | עקביות גרסאות בין CHANGELOG / OpenAPI / llm.txt                                                                                            | כן                           |
| ↳ `check:docs-counts`          | ספירות המופיעות בטקסט (מספר ספקים, מספר מיגרציות וכו׳) נמצאות בתוך חלון ההידוק של הספירות בפועל                                            | כן                           |
| ↳ `check:env-doc-sync`         | כל משתנה סביבה ב-`.env.example` מתועד בטבלה במסמכים, ולהפך                                                                                 | כן                           |
| ↳ `check:deprecated-versions`  | אין מחרוזות גרסה שהוצאו משימוש במסמכים                                                                                                     | כן                           |
| ↳ `check:doc-links`            | קישורי markdown פנימיים במסמכים מפנים לקבצים קיימים (בתבנית `[text]`/`(path)`)                                                             | כן                           |
| ↳ `check:fabricated-docs`      | נתיבים, משתני סביבה, פקודות CLI, שמות hooks ונתיבי קבצים המוזכרים במסמכים קיימים בבסיס הקוד. שער קשיח באמצעות `--strict`; כשל רך ללא הדגל. | כן (באמצעות `--strict` ב-CI) |
| `check:cli-i18n`               | מחרוזות פקודות CLI קיימות בכל קובצי אזורי ה-i18n                                                                                           | כן                           |
| `check:openapi-coverage`       | מפרט OpenAPI מכסה לפחות סף מינימלי מהודק של נתיבים אמיתיים                                                                                 | כן                           |
| `check:openapi-security-tiers` | הערות רמות האבטחה ב-`openapi.yaml` תואמות לסיווגים ב-`routeGuard.ts`                                                                       | **מייעץ**                    |
| `check:openapi-routes`         | כל נתיב ב-`openapi.yaml` מפנה אל `route.ts` אמיתי (מניעת הזיות)                                                                            | כן                           |
| `check:docs-symbols`           | כל הפניה אל `/api/...` בתוך `docs/**/*.md` מפנה אל `route.ts` אמיתי (מניעת הזיות)                                                          | כן                           |
| `i18n translation drift`       | מפתחות שלא תורגמו בקובצי אזורי ה-i18n — אזהרה בלבד                                                                                         | **מייעץ**                    |

### משימה: `i18n-ui-coverage`

| סקריפט                           | מה הוא מאמת                                                                                                                                                                      | חוסם      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check-ui-keys-coverage` (מוטבע) | כיסוי מפתחות i18n של ממשק המשתמש הוא ≥ 65%                                                                                                                                       | כן        |
| `check-ui-value-drift` (מוטבע)   | **ערך** אנגלי שנכתב מחדש אינו משאיר אחריו תרגום מיושן                                                                                                                            | כן        |
| `check-new-key-coverage` (מוטבע) | מפתח אנגלי **חדש** מתורגם בכל אזור — סמן `__MISSING__:` נדחה                                                                                                                     | כן        |
| `check-translation-ratio`        | יחס התרגום האמיתי לכל אזור (ערכים הזהים לאנגלית / מצייני מקום / ערכים חסרים שאינם ברשימת ההחרגות) אינו רשאי לחרוג מ-`config/quality/i18n-translation-baseline.json` בתוספת מרווח | **מייעץ** |

נדרש `fetch-depth: 0` — שער סטיית הערכים משווה את `en.json` מול בסיס המיזוג.

#### `check-ui-value-drift` — שער תרגומים מיושנים

לוכד את רגרסיית ה-i18n היחידה ששאר השערים אינם יכולים לזהות מבחינה מבנית: ערך באנגלית
נכתב מחדש, והתרגומים שנגזרו מהאנגלית _הקודמת_ נשארים במקומם, כך
שמשתמשים שאינם דוברי אנגלית ממשיכים לקרוא נוסח שנשמע בטוח בעצמו אך כעת הוא שגוי.

זה אכן הגיע לגרסה שפורסמה. `oauthModal.googleOAuthWarning` נכתב מחדש כאשר כלי העזר להתחברות
של Antigravity נוסף (#5203); ב-**39 מתוך 43 אזורים** נשאר טקסט שהורה למפעילים "להעתיק את
כתובת ה-URL המלאה ולהדביק אותה למטה" — תהליך שלא ניתן להשלים עבור אותו ספק. הדבר
לא התגלה עד #8463, משום ש:

- `sync-ui-keys` משלים רק מפתחות ש**חסרים**, ולעולם לא מפתחות ש**התיישנו**;
- `check-ui-keys-coverage` סופר את _נוכחות_ המפתח, ולכן תרגום מיושן נחשב כמכוסה;
- `check-translation-drift` עוקב אחר עותקי התיעוד ב-`docs/i18n/<locale>/**.md` —
  הוא לעולם אינו קורא את `src/i18n/messages/*.json`. חוסם במשימה `docs-sync-strict` מאז
  הסנכרון מחדש של 2026-09: עריכת מסמך ליבה → `npm run i18n:run -- --files=<doc>` (ברמת המקטע, זול).

**מודע להבדלים, ללא הסתמכות על קו בסיס.** הוא משווה את `en.json` בבסיס המיזוג לעץ
העבודה; עבור כל מפתח שהערך שלו באנגלית השתנה, כל שפה שעדיין מחזיקה בתרגום
שלא השתנה נחשבת למיושנת. הדבר **מקפיא במכוון חוב קיים** — הבדל אינו יכול
לחשוף מאיזה נוסח אנגלי ישן הגיע תרגום ותיק, ולכן הבדיקה שופטת רק את מה
שהשינוי הנוכחי נוגע בו. החלופה (קו בסיס של גיבוב לכל מפתח) הייתה כרוכה בקובץ
מיוצר בגודל של כ־600 KB, פי 3 מקו הבסיס הקיים הגדול ביותר, שהיה משתנה בכל בקשת משיכה של i18n.

יש שתי דרכים לעמוד בדרישה:

1. לעדכן את התרגומים המושפעים, או
2. להגדיר אותם כ־`__MISSING__:<new english>` — בזמן הריצה יוצג אז הנוסח המתוקן באנגלית
   (`src/i18n/request.ts::deepMergeFallback`, #7258), והמפתח ייכנס לתור לתרגום.

אם **המשמעות** של המחרוזת השתנתה, עדיף **לשנות את שם המפתח**: מפתח חדש אינו יכול לרשת
תרגום מיושן. זהו הדפוס שבו השתמש #8463.

```bash
npm run i18n:check-value-drift          # מצב מחמיר (זה מה שמופעל ב-CI)
npm run i18n:check-value-drift:warn     # דיווח בלבד
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

יוצא עם קוד 0 ועם `SKIP reason=base-unresolved` כאשר לא ניתן לקרוא את קטלוג הבסיס (שכפול
רדוד ללא הפניית הבסיס), בדומה ל־`check-openapi-breaking`.

### משימה: `i18n`

מטריצת אימות מלאה של i18n (משימה אחת לכל שפה). המשימה כולה היא בגדר המלצה.

| סקריפט                          | מה הוא מאמת          | חוסם                                                 |
| ------------------------------- | -------------------- | ---------------------------------------------------- |
| `validate_translation.py quick` | שלמות התרגום בכל שפה | **המלצה** (`continue-on-error: true` על המשימה כולה) |

### משימה: `pr-test-policy`

מופעלת בבקשות משיכה בלבד.

| סקריפט                 | מה הוא מאמת                                                                                                                          | חוסם |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| `check:pr-test-policy` | בקשות משיכה שמשנות קוד ייצור ב־`src/`, ב־`open-sse/`, ב־`electron/` או ב־`bin/` חייבות לכלול בדיקות או לעדכן אותן (כלל מחייב מס' 8)  | כן   |
| `check:test-masking`   | קובצי בדיקות שהשתנו אינם מפחיתים את המספר הכולל של הטענות ואינם מוסיפים טאוטולוגיות מסוג `assert.ok(true)`                           | כן   |
| `check:pr-evidence`    | גוף בקשת המשיכה מציין ראיות מבדיקות/VPS עבור השינוי (ממכן את כלל מחייב מס' 18 באמצעות חיפוש בטקסט בקשת המשיכה — שברירי, ראו Backlog) | כן   |

### משימה: `test-vitest`

מופעלת לאחר `build`. כשל חוסם את המיזוג.

| חבילת בדיקות     | מה היא מאמתת                                        | חוסם                                                                                       |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `test:vitest`    | שרת MCP‏ (110 כלים), autoCombo, מטמון — מריץ vitest | כן                                                                                         |
| `test:vitest:ui` | בדיקות רכיבי ממשק משתמש — מריץ vitest               | **חוסם** — כשלים קיימים מוחרגים במפורש ב־`vitest.config.ts`; כשלים חדשים מכשילים את המשימה |

### תהליכי עבודה ליליים (מתוזמנים, בגדר המלצה)

אלה מופעלים לפי תזמון cron (וכן באמצעות `workflow_dispatch`), ולעולם לא בבקשות משיכה. כולם בגדר המלצה.

| תהליך עבודה            | מה הוא מאמת                                                                                                                                          | חוסם      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `nightly-property`     | בדיקות מבוססות־מאפיינים של fast-check עם seed אקראי ומספר הרצות גבוה                                                                                 | **המלצה** |
| `nightly-resilience`   | סף גידול ערימה, הזרקת תקלות כאוטית, בדיקות עומס/מאמץ מתמשך של k6                                                                                     | **המלצה** |
| `nightly-llm-security` | הגנה מפני הזרקות של promptfoo (מצב חסימה) ובדיקות garak (מדולגות ללא סוד של ספק)                                                                     | **המלצה** |
| `nightly-schemathesis` | בדיקות fuzzing של חוזה OpenAPI‏ (schemathesis) מול OmniRoute פעיל באמצעות `docs/openapi.yaml` — חושפות הפרות מפרט / שגיאות 500 שלא טופלו (שלב 8 B.4) | **המלצה** |
| `nightly-mutation`     | ציון בדיקות מוטציה של Stryker במסלול בדיקות היחידה המהיר — מוטנטים ששרדו חושפים טענות חלשות                                                          | **המלצה** |
| `nightly-compat`       | מטריצת תאימות למנוע Node בכל טווחי `engines.node` הנתמכים                                                                                            | **המלצה** |

קווי בסיס לביצועים (ערימה, TTFB, זמן בנייה) מתועדים ואינם משמשים כסף חסימה: ראו [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
- **להמלצה** — הסך הכול הגלובלי לעומת קו הבסיס המוקפא. סטייה בירושה לעולם אינה מאדימה
  PR שאינו אשם; הסטייה מוקפאת מחדש בעת התאמת הגרסה ונמצאת במעקב של משימת מרווח הביטחון.

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
(למשל, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). המדיניות היא:

**תקנו את שורש הבעיה; השתמשו ברשימת ההיתרים רק כאשר ההפרה קיימת מראש ולא
ניתן לתקנה באותו PR.**

בעת הוספת רשומה לרשימת היתרים:

1. כללו הערה עם ההצדקה.
2. הפנו לסוגיית המעקב (למשל, `// #3498 — תכונה של שלב 2, טרם מומשה`).
3. הסירו את הרשומה באותו PR שמתקן את ההפרה — רשומה מיושנת שכבר אינה
   מדכאת הפרה פעילה היא כשלעצמה פגם (אכיפת הרשומות המיושנות של 6A.3
   תכשיל את השער בגלל רשומה יתומה ברשימת ההיתרים לאחר שתמומש).

**אל** תוסיפו רשומות לרשימת ההיתרים כדי לגרום לבדיקות לעבור מהר יותר. שער ירוק לצד רשימת
היתרים שהולכת וגדלה יוצר תחושת איכות כוזבת.

### כאשר שער נכשל ב-PR שלכם

1. **קראו בעיון את פלט השער** — הוא מציין בדיוק איזה קובץ או סמל הפר
   את הכלל.
2. **תקנו את ההפרה** — רוב השערים הם בדיקות דטרמיניסטיות של מערכת הקבצים, שעוברות ברגע
   שהקוד תקין.
3. **אם ההפרה קיימת מראש** (כלומר, לא אתם יצרתם אותה, אך השער מכסה
   אותה כעת): הוסיפו רשומה לרשימת ההיתרים עם הערת הצדקה וסוגיית מעקב.
4. **אם השער הוא מחגר** (כיסוי, אזהרות ESLint, כפילות, מורכבות):
   השינוי שלכם הרע את המדד. תקנו את הבעיה הבסיסית, או (לעיתים נדירות) הריצו
   `npm run quality:ratchet -- --update` אם השינוי מכוון והפגיעה במדד
   מקובלת — אך תעדו את הסיבה בתיאור ה-PR.
5. **שערי ייעוץ** (`continue-on-error: true`) מיועדים למידע — הם אינם חוסמים
   מיזוג, אך מופיעים בסיכום ה-CI. תקנו אותם בכל זאת.

---

## הוספת שער חדש

1. צרו את `scripts/check/check-<name>.mjs` (או `.ts`). שערי מדיניות מסתיימים בקוד 0/1.
   שערים בסגנון מחגר פולטים מדד אל `quality-metrics.json` באמצעות `collect-metrics.mjs`.
2. הוסיפו את `"check:<name>": "node scripts/check/check-<name>.mjs"` אל `package.json`.
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

מצאי זה הותאם מול `ci.yml` ב-2026-06-17 (הגרסה הקודמת השמיטה את
`audit:deps`,‏ `check:tracked-artifacts`,‏ `check:lockfile`,‏ `check:licenses`,
`check:dead-code`,‏ `check:cognitive-complexity`,‏ `check:type-coverage`,
`check:codeql-ratchet`,‏ `check:pr-evidence`). סקירת ROI של הקבוצה המותאמת
זיהתה את המועמדים הבאים לרציונליזציה. **המיזוגים הם שינויי CI מכניים;
השינויים/ההסרות הם החלטות מדיניות השמורות למפעיל.** דבר מהמפורט להלן
טרם יושם.

**גם אלה אינם מתועדים לעיל** (מייעצים, אות חלש): משימת `docs-lint`
(markdownlint + Vale, כאשר `continue-on-error` חל על המשימה כולה) ותהליכי העבודה העצמאיים של הסורקים
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. הערך `semgrepFindings: 0` נמצא
ב-`quality-baseline.json`, אך אינו מחובר למנגנון מחגר חוסם ב-`ci.yml` — המדד
יתום כרגע.

### מיזוג / הסרת כפילויות (מכני, סיכון נמוך יותר)

כל מועמד אומת מול מצב שערי הבקרה הפעיל ב-2026-06-17 (לתת אמון אך לאמת);
כמה מיזוגים "ברורים מאליהם" התגלו כמסתירים חוב, ולכן **אינם** תחליפים ישירים ונקיים.

- **`check:docs-sync` מופעל פעמיים** — באופן עצמאי במשימת `lint` ושוב בתוך `check:docs-all` (`docs-sync-strict`) וב-hook של husky לפני commit. ✅ **בוצע** — ההפעלה העצמאית ב-`lint` הוסרה.
- **סריקת CVE** — ❌ **אינה מיזוג נקי.** `audit:deps` נכשל באופן קשיח בכל CVE ברמת high/critical;‏ `check:vuln-ratchet` (osv) נכשל רק במקרה של _נסיגה_ ביחס לקו הבסיס (כרגע 1 MODERATE). הסמנטיקה שונה — הסרת `audit:deps` תבטל את השער המוחלט לרמות high/critical. יש להשאיר את שניהם.
- **זיהוי מחזורים** — ✅ **בוצע** (#15159 G-01/G-02). הנוסח הישן כאן כינה את `check:cycles` שער "ירוק ואצור", והצדיק את השארתו כחוסם משום ש-`check:circular-deps` (dpdm) דיווח על 91 מחזורים. המצב הירוק הזה היה **ירוק כוזב**: `check:cycles` סרק 5 תתי-ספריות (450 קבצים), התאים רק ל-`import|export … from` סטטיים, והשמיט כל specifier מסוג `@/` ו-`@omniroute/open-sse/`, כך שלא היה יכול לזהות את מחזורי הייבוא הדינמי וה-alias ששלטו במאגר. תוקן: השער עובר כעת על `src` + `open-sse` (5023 קבצים), אוסף specifiers מתוך ה-AST של TypeScript (כך ש-`import("…")` נספר, אך `typeof import("…")` במיקום של טיפוס אינו נספר), ופותר את `paths` של tsconfig. הוא מוצא **14** מחזורים, ולא 0. מכיוון שלא ניתן לתקן 14 מחזורים קיימים מראש במסגרת PR של שער בקרה, `check:cycles` הוא כעת **מחגר** (`--ratchet`, תקרה `metrics.cycles.value = 14` בתוך `quality-baseline.json`,‏ `direction: down`) — הוא חוסם כל _נסיגה_, והספירה יכולה רק לרדת. CI מפעיל את `npm run check:cycles:ratchet`. צמצום החוב מתבצע במסגרת **A-01**. `check:circular-deps` (dpdm) נשאר מייעץ כחוות דעת שנייה רחבה יותר.
- **מורכבות** — ✅ **בוצע** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): מעבר ESLint יחיד, עם ספירה לפי ruleId כדי שקווי הבסיס של cyclomatic+max-lines ושל cognitive יישארו בלתי תלויים; `check:complexity` / `check:cognitive-complexity` הנפרדים נשארים לצורך `--update` מקומי.
- **מניעת הזיות עבור `/api`** — ✅ **בוצע** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): מצאי FS יחיד של `src/app/api`;‏ openapi-routes ו-docs-symbols עדיין מדווחים בנפרד; הבדיקות הנפרדות נשארות לצורך הרצות מקומיות.
- **`check:node-runtime` מופעל ב-11 משימות** — ⚠️ **ROI נמוך.** כל אחת מהן משתמשת ב-runner נפרד והבדיקה אורכת פחות משנייה; החיסכון הכולל הוא כ-10 שניות, במחיר אובדן אמצעי הגנה זול לכל משימה. לא שווה את הטלטלה.
- **`typecheck:noimplicit:core` ב-lint של CI** — ✅ **הוסר ממשימת lint** (היה מייעץ עם `continue-on-error`); משטח הטיפוסים החוסם הוא `typecheck:core` + `check:type-coverage`. הסקריפט המקומי נשמר.

### שינוי / החלטה (מדיניות המפעיל)

- `check:openapi-security-tiers` (מייעץ) — ❌ **לא ניתן להפוך אותו לחוסם באופן נקי.** הוא מסיים עם קוד 0, אך מזהיר שכמה נתיבי `traffic-inspector` תחת `LOCAL_ONLY_API_PREFIXES` חסרים את ההערה `x-loopback-only: true`. אכיפתו מחייבת להוסיף תחילה את ההערות האלה ל-`openapi.yaml`.
- `typecheck:noimplicit:core` (מייעץ) — נכלל ברובו במחגר החוסם `check:type-coverage`. יש להפוך אותו למחגר או להסיר את מעבר ה-`tsc` השני והמיותר.
- `test:vitest:ui` (כעת **חוסם**) — כשלים קיימים מראש מוחרגים במפורש ב-`vitest.config.ts` באמצעות הערות מעקב `// #8618`; כשלים חדשים מכשילים את המשימה.
- `check:secrets` (gitleaks, מחגר חוסם המקובע על 3 זיהויים חיוביים כוזבים מתועדים) — יש להוסיף את השלושה לרשימת ההיתרים כדי להגיע ל-0, או להורידו למעמד מייעץ. קיימת חפיפה עם סריקת הסודות המובנית של GitHub ועם `check:public-creds`.
- `check:pr-evidence` (חוסם, מבצע grep על הטקסט החופשי בגוף ה-PR) — סיכון גבוה לזיהויים חיוביים כוזבים; הסרתו תחליש את האכיפה של כלל קשיח מס' 18, ולכן זו החלטת מדיניות אמיתית.
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
