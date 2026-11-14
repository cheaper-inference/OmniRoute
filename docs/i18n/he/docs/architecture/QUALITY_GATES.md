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

זרימות העבודה CI ו-Quality Gates מוציאות כל אחת פסק דין יציב: `Gate / CI` ו- `Gate / Quality`. מדיניות הקבלה המנוסחת שלהם מונה כל עבודה במעלה הזרם כנדרש או מייעץ. עבודה נדרשת רלוונטית חייבת להצליח: תוצאות חסרות, בוטלות, דילוג, ממתינות ולא ידועות אינן יכולות להקים PASS. סיווג חוקי של מסמכים בלבד או קטלוג בלבד יכול להפוך את נתיב הקוד לבלתי ישים; טיוטת PR אינה מועמדת מקובלת. תווית `hotfix` לא מוותרת על ראיות.

שני זרימות העבודה מכסות PRs לענפי main/release, דחיפות ל- `main`, שיגור ידני ואירועי מיזוג קבוצות. דחיפה, שלח ומיזוג-קבוצה הפעל את הבחירה המלאה. דחיפות ל- `release/**` לא מפעילות אותן (2026-10-18): כל שינוי כבר הפעיל את המטריצה על PR שלו והשילוב הממוזג הוא התפקיד של Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks וקבוצות מיזוג משתמשים ברצים מתארחים עבור עבודות שאחרות בוחרים ברצים שמתארחים בעצמם; יש לאמת קיבולת מתארחת מספקת לפני ההשקה.

PR רגיל מריץ את הבחירה המהירה. נתיבי ה- `full-code` וה- `full-code-e2e` של מדיניות הקבלה (E2E, אינטגרציה, חפצי חבילה, Electron smoke, Bun SQLite, ecosystem ולקוחות פרוטוקול) פועלים רק על טיוטה של תור Mergify או על ריצה מלאה: `gh workflow run ci.yml --ref <branch>`.

כל קבלה JSON מזהה את SHA שהוצא, את זרימת העבודה ואת הניסיון. ה- CLI דוחה חוסר התאמה של checkout/event SHA. מבחני זרימת עבודה מחייבים את החברות במדיניות לרשימת `needs` של עבודת פסק הדין, כך שמסלול חדש או הוסר לא יכול להיעלם בשקט. הקבלות מכסות את זרימת העבודה שלהן, לא פרסום, פריסה או החלק הפנימי של סורק מייעץ קיים. הפעלת שני שמות הצ'קים בכללי הסניף היא שינוי אדמיניסטרטיבי נפרד; הוספת משרות אלו אינה מגינה בעצמה על סניף.

### מיזוג תור

התווית `queue` שולחת PR לתור Mergify (`.mergify.yml`). Mergify פותחת טיוטת PR על ענף `mergify/merge-queue/`, CI מריץ שם את הבחירה המלאה וה- PR המקורי מתמזג כאשר `Gate / CI`, `Gate / Quality` ו- `Merge integrity (changelog + generated skills)` עוברים.

Mergify כותבת את סיכום התור שלה לתיאור הטיוטה, וגם אפליקציות אחרות יכולות לערוך אותו. אירוע `pull_request` `edited` בדראפט כזה לוקח קבוצת מקבילות משלו (`-queue-edit-<run_id>`) כך שהוא לא יכול לבטל את הריצה האמיתית של הדראפט, והוא מדלג על השער והמטריקס. רק `Merge integrity` עדיין פועל. עבודת השער שדילג נושאת שם צ'ק אחר, מכיוון ש-Mergify קורא `Gate / CI` שדילג עליו כבדיקה שנכשלה ומוציא את ה- PR בתור.

לאחר תור, דחיפה לא תמיד מעמידה את ה- PR בתור. תגיב על זה `@mergifyio queue`.

### ראיות שמורות במפחית הקבלה

`scripts/quality/validate-release-acceptance.mjs` מצמצם תוכנית שסופקה ואת הביטויים שלה; היא אינה קובעת כי התוכנית מכסה את צינור השחרור המלא. הדוחות שלה מגדירים במפורש `releaseAcceptance: false`, גם כאשר התוכנית הזו היא `VERIFIED`. זרימת העבודה `release-acceptance.yml` עדיין משתמשת בגופי צל, לא בקבלות בנייה, חבילה, אתחול או קידום אמיתיות.

ה- CLI דורש `--evidence-root` לאמת ראיות שנשמרו. קבצים נפתרים כ- `<evidence-root>/<artifact_id>/<member>` ו-hash כ- SHA-256. רשומת PASS ללא ראיות, קובץ חסר או שונה, נתיב לא בטוח או סימן קישור מונעים אימות. קבצים חסרים אינם שווים ליומנים ריקים מוצלחים. בדיקות SHA/run/attempt קיימות נשארות בלתי תלויות: בתים תואמים לא יכולים להציל קבלה מיושן. שלמות הקובץ אינה הוכחה לאותנטיות ביצוע או קידום חפצים.

### מלאי סריקה סטטית

מלאי ה-npm-כינוי המנוסח והחברות בסריקה סטטית פעילים ב- `config/quality/gate-manifest.json`. הפעל את `npm run check:gate-manifest` כדי לאמת שמות סקריפט ופקודות מדויקות נגד `package.json`; תוספות, הסרות וסחיפת פקודות נכשלות הן בעבודות ה-hook המקומיות והן בעבודות הסיווג של השינוי ב- CI. כינוי אינו עבודת זרימת עבודה, מופע מטריצה או מקרה מבחן: אין להציג ספירות אלו כניתנות להחלפה.

השתמש `npm run quality:scan -- --list` או `npm run quality:scan:fast -- --list` כדי לבדוק את הכינויים שנבחרו מבלי לבצע אותם. הרץ מפעיל את נקודת הכניסה npm, כך שזמן הריצה שלו (כולל Bun היכן שהוגדר) נשמר. המניפסט רושם כינויים מחוץ לפרופילים הללו כפי שהופעלו בנפרד, ופקודות תחזוקה אסורות בפרופילי סריקה לקריאה בלבד.

פרופילים אלה מכסים את הסריקה הסטטית בלבד. הם אינם מאשרים בדיקות מוצר, כיסוי, אריזה, בדיקות חיצוניות או הסכמה מלאה לשחרור של מועמד. קבלה לזרימת עבודה משתמשת ב- `config/quality/admission-policy.json` ו- `scripts/quality/admission-verdict.mjs` המקושרים. פרופילי צופה לשחרור נשארים נפרדים; לבדוק את ההמחאות והקבלות הרלוונטיות שלהם באופן עצמאי. הפקודות הסטטיות המלאות של הצופה מוצהרות ב- `config/quality/release-green-static-profile.json`, כולל `audit:deps`, בחירת בדיקת מוטציות ובדיקות תרגום. הטוען מאמת פקודות npm כנגד package.json והצהרות CI/Quality מעוצבות; הוא דוחה סחף במקום לבצע אסימוני מעטפת כטיעונים. פלט SKIP/INCOMPLETE של הסורק הנדרש אינו יכול לקבוע PASS. הפרופיל מתעד את ההחרגות החיצוניות שלו ואינו מחליף כיסוי מתארח, מטריצות בדיקה, ראיות חבילה או פריסה. מצאי הפרוזה שלהלן הוא אסמכתא, לא הוכחה לכך ששער אכן רץ.

סקריפטים חיים תחת `scripts/check/` (שערי מדיניות) ו- `scripts/quality/` (מנוע ראצ'ט). מקור האמת CI הוא `.github/workflows/ci.yml`.

### שחרר את הנתיב המהיר PR (`quality.yml`)

`.github/workflows/quality.yml` משלים CI ב- main/release PRs, דוחף ל- `main`, שולח וממזג קבוצות. PRs השתמש בבדיקות מהירות מסוננות נתיב. המבנה הכפול שהושבת לצמיתות הוסר; המחאות build/package/boot האמיתיות נשארות ב- CI. חבילת היחידה וה-vitest פועלים רק ב- CI (`Unit Tests (N/8)` ו- `Vitest`).

| מִשׂרָה                                          | תְחוּם                                                                                                      | חסימה           |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs ו-docs-all                                                                     | כֵּן            |
| `Fast Quality Gates`                             | קוד PRs; בדיקות סטטיות, בדיקת סוג, בדיקת סוג לוח מחוונים, בדיקות יחידות מושפעות, בדיקות אחים נשכחות (ייעוץ) |
| `No new ESLint warnings`                         | קוד PRs; מגן מוך מודע לדיכוי                                                                                | כן, כולל מזלגות |
| `Merge integrity (changelog + generated skills)` | PRs לא טיוטה; יומן שינויים וסנכרון מיומנויות שנוצר                                                          | כן, כולל מזלגות |

#### דוח בדיקות אחים נשכחות

`npm run check:forgotten-sibling-tests` פועל כשלב מייעץ של `Fast Quality Gates` ומשתמש מחדש בפותר הייבוא מאחורי מפת ההשפעה של הבדיקה. עבור כל מודול ייצור שהשתנה, הוא מדווח על שרשראות `changed module/symbol -> static consumer -> candidate sibling test` דטרמיניסטיות כאשר מבחן המועמד נעדר ב-pull-request diff. סיכום Markdown ותוצאת JSON נשמרים כחפץ זרימת העבודה `forgotten-sibling-tests` לכיול לפני כל השקה חוסמת.

ייצוא חוזר של חבית ויבוא דינמי הם אבחון רזולוציה בלבד; הם אף פעם לא יוצרים ממצא חוסם. חריגים שנבדקו חיים ב- `config/quality/forgotten-sibling-allowlist.json`. כל ערך חייב לתת שם למבחן הצרכן והמועמד, לתת רציונל ספציפי ולקשר סוגיית GitHub או בקשת משיכה. ערכים שגויים נכשלו סגור. חריגים אינם יכולים לדכא מבחן מועמד שנמחק או הבדל שמוסיף `.skip`/`.todo`; היחלשות הטענה ומיסוך אחר נותרו בבעלות שער `check:test-masking` החוסם באופן עצמאי.

### עבודה: `lint`

פועל על כל PR to `main`. בלוקים מתמזגים על כישלון.

| סקריפט (`npm run ...`)            | מאמת                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | חסימה                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| `check:node-runtime`              | גרסת Node.js נמצאת בטווח הנתמך                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | כֵּן                                    |
| `check:cycles`                    | יבוא מעגלי על פני כל `src/` + `open-sse/` (מבוסס AST, tsconfig `paths` נפתר). חשוף יוצא 1 בכל פעם שקיים מחזור כלשהו (כישלון-סגור מאז #15281) ומפרט את ה- SCCs. `check:cycles:ratchet` (מה CI רץ) חוסם כאשר הספירה עולה על תקרת `metrics.cycles` ב- `quality-baseline.json` — כרגע 14, `direction: down`, כך שהוא יכול רק ליפול (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                | כן (מחגר)                               |
| `check:boundary`                  | צימוד `open-sse → src` : ייבוא ייחודי של קובץ לקובץ מהמנוע לתוך האפליקציה (`scripts/quality/measure-boundary.mjs`; רשימת הקצה היא צבר התיקון v4 core/module-split ). דוח ייעוץ חשוף = (זהה ל- `quality:boundary`). `check:boundary:ratchet` (מה CI פועל, גם ב- `quality.yml` fast-gates ratchet loop) חוסם כאשר הספירה עולה על תקרת `metrics.boundaryOpenSseToSrc` ב- `quality-baseline.json` — זרעו ב-771 הנמדד, `direction: down`; `--update` רק מוריד את זה; יחסי בסיס על PRs (`--base-ref`, ראה להלן)                                                                                                                                                                                                                                                                                        | כן (מחגר)                               |
| `check:route-validation:t06`      | סכימות Zod קיימות בכל המסלולים (מדיניות שכבה 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | כֵּן                                    |
| `check:any-budget:t11`            | ספירת `@ts-expect-error // any` אינה חורגת מהתקציב (tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | כֵּן                                    |
| `check:provider-consistency`      | לכל ספק ב- `providers.ts` יש ערך תואם ב- `providerRegistry.ts` (ולהיפך, ברשימת ההיתרים)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כֵּן                                    |
| `check:model-lifecycle`           | שלושת טבלאות הניתוב המתוחזקות ביד נשארות עקביות עם תמונת המצב של מחזור החיים שבוצעה הצ'ק-אין (#11503): `FITNESS_TABLE` (`taskFitness.ts`) לא מקבל מזהה פרש ש- `REGISTRY` יכול לנתב; כל מטרת `BUILT_IN_ALIASES` קיימת ב- `REGISTRY` ונעדרת מתמונת המצב של ה-ID בדימוס; כל תעודה מזהה שעדיין ב- `REGISTRY` מועברת או רשומה ב- `allowedRetiredInCatalog`; ושום מקור או מטרה `DEFAULT_DEGRADATION_MAP` לא מופיעים בדימוס באותה תמונת מצב. זה לא מוכיח שדוגמנית מוגשת כעת על ידי זרם בשידור חי. — לא מקוון משווה מול `config/quality/model-lifecycle.json`, רענון ידני עם `npm run quality:refresh-model-lifecycle` (רשת; לא מחובר ל- CI). `allowedRetiredInCatalog` הוא מחגר שרוף: הוסף ערך רק עם בעיית מעקב.                                                                                        | כֵּן                                    |
| `check:fetch-targets`             | כל `fetch("/api/...")` ב- `src/` בצד הלקוח נפתר ל- `route.ts` אמיתי                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | כֵּן                                    |
| `check:deps`                      | כל `npm install` -able deps על פני כל `package.json` בריפו הם ב- `dependency-allowlist.json`; חבילות חדשות לא מוצמדות או משופעות מסומנות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | כֵּן                                    |
| `audit:deps`                      | ביקורת npm של כל חמשת קבצי הנעילה העצמאיים (root, Electron, OpenCode plugins v1/v2 וספק). חסימת ייעוץ קריטי; אזהרות גבוהות נשארות גלויות. ביקורת Missing/failed הן INCOMPLETE ובלוק; הגיבובים והדוחות של נעילה לפי היקף נשמרים.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | כֵּן                                    |
| `check:lockfile`                  | `package-lock.json` integrity — https registry, hashes integrity, אין עקיפות מארח                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | כֵּן                                    |
| `check:licenses`                  | רשימת היתרים SPDX עבור תלות בייצור                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | כֵּן                                    |
| `check:tracked-artifacts`         | אין חפצי בנייה / קישורי `node_modules` מחויבים (פועל גם ב-pre-commit צרוד; Pre-push הוא בכוונה בהיר — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | כֵּן                                    |
| `check:ai-attribution`            | אין טריילר AI/bot `Co-Authored-By` או כותרת תחתונה של דור AI ב- PR commits, title או body — Hard Rule #16 (בלולאת `quality.yml` fast-gates עבור PR→ `release/**` — קורא את עומס האירוע, no-op off PRs — ו-PR-only step in `ci.yml` `commit-msg` → `main` גם עבור PR; מחברים שותפים מותרים #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:vitest-exclusions`         | כל אי הכללת Vitest נותנת שם לבעיית מעקב ומופיעה ב- `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | כֵּן                                    |
| `check:file-size`                 | קבצי מקור (`.ts`/`.tsx` ב- `src/`, `open-sse/`, `electron/`, `bin/`) נשארים בתוך `cap` וקבצי בדיקה (`*.test.ts(x)`) בתוך `testCap`; אסור לקבצים שהוקפאו ב- `file-size-baseline.json` (`frozen` / `testFrozen`) לגדול מעבר לגודלם המתועד                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כֵּן                                    |
| `check:error-helper`              | תגובות שגיאה ב- executors/handlers משתמשות `buildErrorBody()` / `sanitizeErrorMessage()` (חוק קשה #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | כֵּן                                    |
| `check:migration-numbering`       | קבצי SQL של הגירה ממוספרים ברצף, ללא פערים או כפילויות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | כֵּן                                    |
| `check:public-creds`              | אין מפתחות OAuth `client_id`/`client_secret` מילוליים או Firebase Web מחוץ `publicCreds.ts` (כלל קשה #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | כֵּן                                    |
| `check:db-rules`                  | אין SQL גולמי מחוץ ל- `src/lib/db/` מודולים; אין יבוא חבית מ- `localDb.ts` (חוקים קשים #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | כֵּן                                    |
| `check:known-symbols`             | מבצעי ספקים, אסטרטגיות ניתוב ומתרגמים הרשומים בטבלאות השליחה שלהם תואמים לקבצים בדיסק — ללא סמלים יתומים או לא מוכרזים                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | כֵּן                                    |
| `check:route-guard-membership`    | כל מסלול שמוליד תהליך ילד מסווג לפי `isLocalOnlyPath()` (חוקים קשים #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | כֵּן                                    |
| `check:test-discovery`            | כל קובץ `*.test.ts` / `*.spec.ts` ב-repo נאסף על ידי רץ בדיקה אחד לפחות (ראצ'ט: רשימת יתומים ב- `test-discovery-baseline.json` יכולה רק להתכווץ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | כֵּן                                    |
| `check:test-tla-order`            | אף קובץ `node:test` תחת `tests/unit` לא רושם בדיקה, פוגע ב- `await` ברמה העליונה, ואז רושם יותר (#18045; ratchet: `test-tla-order-allowlist.json` יכול רק להתכווץ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | כֵּן                                    |
| `check:agent-skills-sync`         | חפצי כישורי סוכן שנוצרו תואמים לקטלוג המקור שלהם (ללא סחף)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:provider-asset-provenance` | ספק logos/assets נושא ערך מקור מתועד                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | קובצי התצורה של JSON מנתחים ועומדים בחוקי ה-repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | הידור TypeScript ללא שגיאות (אזהרות מייעצות בלבד)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | כֵּן                                    |
| `typecheck:noimplicit:core`       | קפדנית `noImplicitAny` — פני עתיד; אתרי שיחות רבים קיימים עדיין זקוקים להערות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **מְיָעֵץ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` scoped to `src/app/(dashboard)/**` (#7033) — `typecheck:core` רשימת ההיתרים של 27 קבצים לא כוללת שום לוח מחוונים TSX, ו- `next build` אף פעם לא בודק אותו גם (`next.config.mjs` קובע `ignoreBuildErrors: true`), אז רגרסיות של מזהה יתומות שם (#6625/#6909) היו בלתי נראות ל- CI. הבדלים מול קו בסיס של ספירת per-file/per-TS-code קפואה (`config/quality/dashboard-typecheck-baseline.json`, אותו דפוס אכיפה מיושן כמו `check:known-symbols`) — רק שגיאות NEW מעבר לספירת קו הבסיס נכשלות בשער; הורד עם `--update` כאשר שגיאה קיימת מתוקנת.                                                                                                                                                                                                                                               | כֵּן                                    |
| `check:build-typecheck`           | בדיקת סוג ייצור של אפליקציה מלאה על `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), רשימת ההיתרים של 27 הקבצים של השטח `typecheck:core` ושער לוח המחוונים אינם מכסים. הבדלים נגד `config/quality/build-typecheck-baseline.json`; ספירה חדשה או מוגברת ל-(קובץ, קוד) נכשלת, ספירה נמוכה יותר מבקשת ממך לחשוף. `--update` מסרב בזמן שהריצה מכילה זוג חדש או מורם אלא אם כן הועבר `--force-regressions`, ומסרב לקובץ שהושתק לאחרונה אלא אם כן הועבר `--force-nocheck`, כך שהרחבת קו הבסיס כדי להיות ירוק והענקת שתיקה קבועה הן שתי פעולות מכוונות נפרדות. `--force` חשוף נדחה. סורק גם את ה-build scope עבור `@ts-nocheck` כנגד `config/quality/ts-nocheck-baseline.json`, מכיוון שקובץ המשתמש בו מדווח על אבחון כלל וכלל לא יהיה בלתי נראה לכל שער. | כֵּן                                    |

#### שתי תוכנות בדיקת סוג עונות אחרת

`typecheck:core` ו- `check:build-typecheck` מרכיבים תוכניות שונות תחת אפשרויות שונות, ואותו קובץ יכול להיות נקי באחת ומלא שגיאות באחר.

`tsconfig.build.json` מגדיר `"strict": false`, אז `noImplicitAny` כבוי. תצורת הליבה מרכיבה רשימת היתרים של 27 קבצים עם אפשרויות מחמירות יותר ועוקבת אחר גרף הייבוא של כל ערך, כך שקבצים שלעולם אינם מופיעים בתוכנית הבנייה עדיין נבדקים שם.

התוצאה חשובה כאשר שופטים אם קובץ מוקלד:** אפס אבחון תחת `check:build-typecheck` לא אומר אפס** . הסרת `@ts-nocheck` מ-26 קבצים הראתה 23 מהם נקיים בתוכנת ה-build; שישה עשר מאלה עלו על פני כ-120 שגיאות מרומזות כלשהן בשגיאה המחמירה. בדוק את שניהם לפני שתקרא לקובץ נקי.

### עבודה: `quality-gate`

רץ אחרי `test-coverage`. בלוקים מתמזגים על כישלון.

| תַסרִיט                      | מאמת                                                                                                                                  | חסימה                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | פולט `quality-metrics.json` (ספירת אזהרות ESLint, סיקור מדוח רסיס ממוזג)                                                              | כן (במעלה הזרם של הראצ'ט) |
| `quality:ratchet`            | כל מדד ב- `quality-baseline.json` לא נסוג (ESLint warnings ≤ baseline; כיסוי ≥ baseline)                                              | כֵּן                      |
| `check:duplication`          | שכפול קוד (jscpd@4) אינו עולה על קו הבסיס ב- `quality-baseline.json`                                                                  | כֵּן                      |
| `check:complexity`           | המורכבות הציקלומטית ברמת הקובץ אינה חורגת מהמכסה (core ESLint `complexity` + `max-lines-per-function`)                                | כֵּן                      |
| `check:cognitive-complexity` | מורכבות קוגניטיבית מחגר (`eslint-plugin-sonarjs`) — נפרד ESLint pass; CI מריץ את שניהם ממוזגים כשלב `check:complexity-ratchets` היחיד | כֵּן                      |
| `check:dead-code`            | יצוא / קבצים לא בשימוש (knip) אינו נסוג לעומת קו הבסיס                                                                                | כֵּן                      |
| `check:compression-budget`   | רצפות חסכון באסימון דחיסה של תקציב — לכל מנוע אסורות לסגת                                                                             | כֵּן                      |
| `check:type-coverage`        | ראצ'ט שהוקלד באחוזים (`type-coverage`) אינו נסוג; סובלת במידה רבה `typecheck:noimplicit:core`                                         | כֵּן                      |
| `check:codeql-ratchet`       | ספירת ההתראות הפתוחה CodeQL אינה נסוגה (קורא דרך `gh api`; דילוג חינני ללא אסימון) קצב רענון — והדק ידני: ראה "CodeQL ratchet" למטה   | כֵּן                      |

### עבודה: `quality-extended`

כל התפקיד הוא מייעץ (`continue-on-error: true`). הראצ'טים מבוססי npm פועלים באמת; הסורקים החיצוניים מתקינים באמצעות `gh release download` ודילוג עצמי (יציאה 0) כאשר עדיין חסר קובץ בינארי.

| תַסרִיט                  | מאמת                                                                                                                                                                                     | חסימה                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `check:circular-deps`    | אין תלות מעגלית (dpdm)                                                                                                                                                                   | **מְיָעֵץ**                        |
| `check:bundle-size`      | גודל החבילה אינו חורג מהמכסה                                                                                                                                                             | **מְיָעֵץ**                        |
| `check:secrets`          | סריקה סודית (gitleaks) — מדלג אם בינארי נעדר                                                                                                                                             | **מְיָעֵץ**                        |
| `check:vuln-ratchet`     | פרצות תלות (osv-scanner) אינן נסוגות — `--ratchet` נכשל כ- INCOMPLETE (יציאה 2) אם לא נמדדת                                                                                              | **מְיָעֵץ**                        |
| `check:workflows`        | מוך זרימת עבודה (actionlint + zizmor); סורקי missing/broken, דוחות לא חוקיים או קו בסיס מחגר חסר נכשלים כ- INCOMPLETE. ממצאים תקפים פועלים בהתאם למדיניות strict/advisory/ratchet שנבחרה | נדרש ביצוע; חוסם מחגר zizmor ב- CI |
| `check:openapi-breaking` | חוזה API ציבורי נגד התחייבויות אירוע מוצמדות (PR מיזוג-בסיס, push before, merge-group base; scheduled/manual checkout אב ראשון); המדידה הנדרשת נכשלה סגורה                               | **חסימה עם --ratchet**             |

### עבודה: `docs-sync-strict`

פועל על כל PR to `main`. בלוקים מתמזגים על כישלון.

| תַסרִיט                        | מאמת                                                                                                                                 | חסימה                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `check:docs-all`               | מטא-שער שמריץ את 6 שערי המשנה למטה ברצף                                                                                              | כֵּן                      |
| ↳ `check:docs-sync`            | עקביות גרסת CHANGELOG / OpenAPI / llm.txt                                                                                            | כֵּן                      |
| ↳ `check:docs-counts`          | ספירות בפרוזה (ספירת ספקים, ספירת הגירה וכו') נמצאות בתוך חלון המחגר של הספירות האמיתיות                                             | כֵּן                      |
| ↳ `check:env-doc-sync`         | כל env var ב- `.env.example` מתועד בטבלת מסמכים, ולהיפך                                                                              | כֵּן                      |
| ↳ `check:deprecated-versions`  | אין מחרוזות גרסה שהוצאו משימוש במסמכים                                                                                               | כֵּן                      |
| ↳ `check:doc-links`            | קישורי סימון פנימיים במסמכים פותרים לקבצים אמיתיים (טופס `[text]`/`(path)` )                                                         | כֵּן                      |
| ↳ `check:fabricated-docs`      | מסלולים, env vars, פקודות CLI, שמות Hook ונתיבי קבצים המצוטטים במסמכים קיימים בבסיס הקוד. שער קשה דרך `--strict`; soft-fail ללא דגל. | כן (דרך `--strict` ב- CI) |
| `check:cli-i18n`               | מחרוזות הפקודות CLI קיימות בכל קבצי ה-i18n                                                                                           | כֵּן                      |
| `check:openapi-coverage`       | מפרט OpenAPI מכסה לפחות רצפת צר של מסלולים אמיתיים                                                                                   | כֵּן                      |
| `check:openapi-security-tiers` | הערות שכבת אבטחה ב- `openapi.yaml` תואמות לסיווגי `routeGuard.ts`                                                                    | **מְיָעֵץ**               |
| `check:openapi-routes`         | כל נתיב ב- `openapi.yaml` הופך ל- `route.ts` אמיתי (אנטי-הזיה)                                                                       | כֵּן                      |
| `check:docs-symbols`           | כל התייחסות `/api/...` ב- `docs/**/*.md` נפתרת ל- `route.ts` אמיתי (אנטי-הזיה)                                                       | כֵּן                      |
| `i18n translation drift`       | מפתחות לא מתורגמים בקבצי מיקום i18n — warn בלבד                                                                                      | **מְיָעֵץ**               |

נוצרים שנים עשר README SVGs מתחת `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` מחולל את כולם). לכל אחד יש מבחן יחידת השוואת בתים (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) שנכשל כאשר הקובץ המחויב מיושן, ו- `check:docs-counts` קורא מספרים קנוניים מצמתי `<text>` שלהם — וזו הסיבה ששלב המתאר שומר על כל מחרוזת מתוארת בקובץ כ- `<text>` בלתי נראה. הסימון SVG canonical-numbers קורא את הקבצים הרשומים ב- `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, בתוספת `public/images/tier-flow-dark.svg` ו- `tier-flow-light.svg`; הטענות בחינם לנצח, כניסה לקטלוג, מאגר חוזר וגורמי ניקוד קוראים גם `promise-pillars.svg`, `free-tier-budget.svg` ו- `strategies-grid.svg`. `free-tier-budget.svg` שואב את הדמויות שלו ממטען הקטלוגים החי, כך ששינוי ל- `FREE_MODEL_BUDGETS` או לשם התצוגה של הספק הופך את ה- CI עד שהקובץ הזה יופק מחדש.

### עבודה: `i18n-ui-coverage`

| תַסרִיט                          | מאמת                                                                                                                                                     | חסימה       |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (מוטבע) | כיסוי מפתח UI i18n הוא ≥ 65%                                                                                                                             | כֵּן        |
| `check-ui-value-drift` (מוטבע)   | אנגלית משוכתבת** עֵרֶך** לא משאיר אחריו תרגום מעופש                                                                                                      | כֵּן        |
| `check-new-key-coverage` (מוטבע) | א** חָדָשׁ** מפתח אנגלי מתורגם בכל מקום — סמן `__MISSING__:` נדחה                                                                                        | כֵּן        |
| `check-translation-ratio`        | יחס תרגום אמיתי לכל מקום (זהה לאנגלית / מציין מיקום / עלים חסרים מחוץ לרשימת ההיתרים) לא יעלה על רפיון `config/quality/i18n-translation-baseline.json` + | **מְיָעֵץ** |

צריך `fetch-depth: 0` — שער ההיסחפות ערך שונה `en.json` מול בסיס המיזוג.

#### `check-ui-value-drift` — שער תרגום מעופש

תופס את הרגרסיה האחת i18n שהשערים האחרים אינם יכולים לראות מבחינה מבנית: ערך אנגלי נכתב מחדש והתרגומים שנגזרו מהאנגלית _הקודמת_ נשארים מאחור, כך שמשתמשים שאינם אנגלים ממשיכים לקרוא עותק מנוסח בבטחה, כעת שגוי.

זה נשלח באמת. `oauthModal.googleOAuthWarning` נכתב מחדש כאשר עוזר הכניסה Antigravity נחת (#5203);** 39 מתוך 43 מקומות** כל הזמן טקסט שאומר למפעילים "להעתיק את ה- URL המלא ולהדביק אותו למטה" — זרימה שאינה יכולה להשלים עבור אותו ספק. זה לא הבחין עד #8463 כי:

- `sync-ui-keys` רק ממלא מפתחות שהם** נֶעדָר** , אף פעם לא כאלה שכן** לֹא טָרִי** ;
- `check-ui-keys-coverage` סופר את המפתח _נוכחות_, כך שתרגום מעופש מקבל ציון ככוסה;
- `check-translation-drift` עוקב אחר התיעוד של `docs/i18n/<locale>/**.md` מראות — זה אף פעם לא קורא `src/i18n/messages/*.json`. חסימה של job `docs-sync-strict` מאז הסנכרון מחדש של 2026-09: ערוך מסמך ליבה → `npm run i18n:run -- --files=<doc>` (ברמת המדור, זול).

**מודע לשינוי, לא מגובה בקו הבסיס.** הוא משווה `en.json` בבסיס המיזוג מול עץ העבודה; עבור כל מפתח שהערך שלו באנגלית השתנה, כל מקום שעדיין מחזיק בתרגום ללא נגיעה הוא מעופש. זאת בכוונה** מקפיא חוב קיים** — a diff לא יכול לחשוף מאיזו אנגלית ישנה הגיע תרגום ותיק, אז השער שופט רק במה נוגע השינוי הנוכחי. האלטרנטיבה (קו בסיס גיבוב לפי מפתח) תעלה קובץ שנוצר ~ 600 KB, 3 × הקו הבסיסי הגדול ביותר הקיים, שיתבצע על כל i18n PR.

שתי דרכים לספק את זה:

1. לעדכן את התרגומים המושפעים, או
2. הגדר אותם ל- `__MISSING__:<new english>` — זמן הריצה ואז משרת את האנגלית המתוקנת (`src/i18n/request.ts::deepMergeFallback`, #7258) ואת תורי המפתח לתרגום.

אם המחרוזת** מַשְׁמָעוּת** השתנה, מעדיף** שינוי שם המפתח** : מפתח חדש לא יכול לרשת תרגום מיושן. זו התבנית #8463 השתמשו בה.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

יוצא מ-0 עם `SKIP reason=base-unresolved` כאשר לא ניתן לקרוא את קטלוג הבסיס (שכפול רדוד ללא ר"פ הבסיס), שיקוף `check-openapi-breaking`.

### עבודה: `i18n`

מטריצת אימות מלאה של i18n (עבודה אחת לכל מקום). כל התפקיד הוא מייעץ.

| תַסרִיט                         | מאמת                  | חסימה                                                |
| ------------------------------- | --------------------- | ---------------------------------------------------- |
| `validate_translation.py quick` | שלמות התרגום לכל מקום | **מְיָעֵץ** (`continue-on-error: true` על כל העבודה) |

### עבודה: `pr-test-policy`

פועל על בקשות משיכה בלבד.

| תַסרִיט                | מאמת                                                                                                      | חסימה |
| ---------------------- | --------------------------------------------------------------------------------------------------------- | ----- |
| `check:pr-test-policy` | PRs שמשנה קוד ייצור ב- `src/`, `open-sse/`, `electron/` או `bin/` חייב לכלול או לעדכן בדיקות (חוק קשה #8) | כֵּן  |
| `check:test-masking`   | קבצי בדיקה שהשתנו אינם מפחיתים את ספירת הטענות נטו או מוסיפים טאוטולוגיות `assert.ok(true)`               | כֵּן  |
| `check:pr-evidence`    | גוף PR מצטט ראיות test/VPS לשינוי (ממכן את ה-hard Rule #18 על ידי grepping PR prose — שביר, ראה Backlog)  | כֵּן  |

### עבודה: `test-vitest`

רץ אחרי `build`. בלוקים מתמזגים על כישלון.

| סְוִיטָה         | מאמת                                                 | חסימה                                                                                        |
| ---------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `test:vitest`    | שרת MCP (110 כלים), autoCombo, cache — vitest runner | כֵּן                                                                                         |
| `test:vitest:ui` | UI בודק — vitest runner                              | **חסימה** כשלים קיימים — אינם נכללים במפורש ב- `vitest.config.ts`; כשלים חדשים נכשלים בעבודה |

### תהליכי עבודה ליליים (מתוזמנים, מייעצים)

אלה פועלים לפי לוח זמנים של cron (ו- `workflow_dispatch`), אף פעם לא ב- PRs. כולם מייעצים.

| זרימת עבודה            | מאמת                                                                                                                      | חסימה       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | בדיקה מהירה של בדיקות מאפיינים עם ספירת ריצה גבוהה של זרעים +                                                             | **מְיָעֵץ** |
| `nightly-resilience`   | שער גידול ערימה, הזרקת תקלות כאוס, k6 load/soak                                                                           | **מְיָעֵץ** |
| `nightly-llm-security` | promptfoo injection guard (מצב חסימה) בדיקות + garak (דילוג ללא סוד ספק)                                                  | **מְיָעֵץ** |
| `nightly-schemathesis` | חוזה OpenAPI fuzzing (סכמתזה) נגד OmniRoute חי באמצעות הפרות של משטחי `docs/openapi.yaml` — / 500s ללא טיפול (פאזה 8 B.4) | **מְיָעֵץ** |
| `nightly-mutation`     | ציון בדיקת מוטציות של סטרייקר על נתיב היחידה המהירה — ששרדו מוטנטים משטחים טענות חלשות                                    | **מְיָעֵץ** |
| `nightly-compat`       | מטריצת תאימות מנועי צומת על פני טווחי `engines.node` הנתמכים                                                              | **מְיָעֵץ** |

קווי הבסיס של הביצועים (ערימה, TTFB, זמן בנייה) נרשמים, לא מגודרים: ראה [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

## מדיניות רשימת ההיתרים

כל שער שלא יכול להיכשל בהפרות קיימות משתמש ברשימת היתרים קפואה (למשל, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). המדיניות היא:

**תקן את הסיבה העיקרית; השתמש ברשימת ההיתרים רק כאשר ההפרה קיימת מראש ולא ניתן לתקן אותה באותו PR.**

בעת הוספת ערך לרשימת ההיתרים:

1. כלול הערה עם ההצדקה.
2. עיין בבעיית המעקב (למשל, `// #3498 — Phase 2 feature, not yet implemented`).
3. הסר את הערך באותו PR שמתקן את ההפרה — ערך מעופש שאינו מדכא עוד הפרה אקטיבית הוא בעצמו פגם (אכיפה מעופשת 6A.3 תכשל בשער על כניסת רשימת היתרים מיותמת לאחר יישום).

לַעֲשׂוֹת** לֹא** הוסף רשומות ברשימת ההיתרים כדי לגרום למבחנים לעבור מהר יותר. שער ירוק עם רשימת היתרים הולכת וגדלה היא תחושת איכות מזויפת.

### כאשר שער נכשל ב- PR שלך

1. **קרא בעיון את פלט השער** — זה אומר לך בדיוק איזה קובץ או סמל הפרו את הכלל.
2. **תקן את ההפרה** — רוב השערים הם בדיקות מערכת קבצים דטרמיניסטיות שעוברות ברגע שהקוד נכון.
3. **אם ההפרה קיימת מראש** (כלומר, לא הצגת את זה אבל השער מכסה את זה עכשיו): הוסף ערך ברשימת ההיתרים עם הערת הצדקה ובעיית מעקב.
4. **אם השער הוא ראצ'ט** (סיקור, אזהרות ESLint, כפילות, מורכבות): השינוי שלך החמיר את המדד. תקן את הבעיה הבסיסית, או (לעיתים רחוקות) הפעל את `npm run quality:ratchet -- --update` אם השינוי הוא מכוון וההשפלה המטרית מקובלת — אבל תעד למה בתיאור PR.
5. **שערי ייעוץ** (`continue-on-error: true`) הם — מידע הם לא חוסמים מיזוג אלא מופיעים בסיכום CI. תתקן אותם בכל מקרה.

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

## צבר רציונליזציה (ROI review — Fase 9 Onda 3)

מלאי זה תואם ל- `ci.yml` ביום 2026-06-17 (בגרסה הקודמת הושמטו `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). סקירת ROI של הסט המאוחד זיהתה את המועמדים הבאים לרציונליזציה.** המיזוגים הם שינויים מכאניים CI ; ה- flips/drops הן החלטות מדיניות השמורות למפעיל.** שום דבר למטה לא הוחל עדיין.

**גם לא מתועד למעלה** (אות מייעץ, אות נמוך): עבודת `docs-lint` (markdownlint + Vale, כל העבודה `continue-on-error`) וזרימות העבודה של הסורק העצמאי `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` הוא ב- `quality-baseline.json` אך אינו מחובר למחגר חוסם ב- `ci.yml` — המדד יתום כרגע.

### מיזוג / ביטול (מכני, סיכון נמוך יותר)

כל מועמד אושר כנגד מצב השער החי ב-2026-06-17 (אמון-אבל-אמת); כמה מיזוגים "ברורים" התבררו כמסתירים חובות והם** לֹא** דרופ-אין נקי.

- **`check:docs-sync` רץ פעמיים** — עצמאי בעבודת `lint` ושוב בתוך `check:docs-all` (`docs-sync-strict`) וה- husky pre-commit hook. ✅**DONE** `lint` — הוסרה.
- **סריקת CVE** — ❌**NOT מיזוג נקי.** `audit:deps` חוסם ייעוץ קריטי וביקורות חלקיות בכל חמשת קבצי הנעילה, תוך דיווח על ייעוץ גבוה כאזהרה במסגרת המדיניות הנוכחית; `check:vuln-ratchet` (osv) נכשל רק ב-_regression_ לעומת קו הבסיס של הצ'ק-אין ודוחה מדידות חסרות בעת הצורך. סמנטיקה שונה — הפלת `audit:deps` תאבד את השער הקריטי המוחלט ואת קבלות הביקורת העצמאיות של החבילה. שמור על שניהם.
- **זיהוי מחזור** — ✅**DONE** (#15159 G-01/G-02). הטקסט הישן כאן קרא ל- `check:cycles` "השער הירוק, הנאצר" והצדיק את החסימה שלו מכיוון ש- `check:circular-deps` (dpdm) דיווח על 91 מחזורים. הירוק הזה היה א** ירוק מזויף** : `check:cycles` סרק 5 ספריות משנה (450 קבצים), התאים רק `import|export … from` סטטי, והפיל כל מפרט `@/` ו- `@omniroute/open-sse/`, כך שהוא לא יכול היה לראות את מחזורי הכינוי של + ייבוא דינמי ששלטו ב-repo. תוקן: השער הולך כעת `src` + `open-sse` (5023 קבצים), אוסף מפרטים מה- TypeScript AST (כך ש- `import("…")` סופר ו- `typeof import("…")` במיקום סוג לא), ופותר את tsconfig `paths`. זה מוצא** 14** מחזורים, לא 0. מכיוון שלא ניתן לתקן 14 מחזורים קיימים בשער PR, `check:cycles` הוא כעת** מַחגֵר** (`--ratchet`, תקרה `metrics.cycles.value = 14` ב `quality-baseline.json`, `direction: down`) — זה חוסם כל _רגרסיה_ והספירה יכולה רק ליפול. CI מפעיל את `npm run check:cycles:ratchet`. נסיעות שרופה עם**A-01** . `check:circular-deps` (dpdm) נשאר מייעץ בתור הדעה השנייה הרחבה יותר.
- **מוּרכָּבוּת** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): הליכה ESLint אחת, סופרת לפי ruleId כך + max-lines cyclomatic וקווי בסיס קוגניטיביים נשארים עצמאיים; `check:complexity` / `check:cognitive-complexity` בודדים נשארים עבור `--update` מקומיים.
- **`/api` נגד הזיות** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): מלאי FS אחד של `src/app/api`, openapi-routes + docs-symbols עדיין מדווחים באופן עצמאי; בודדים נשארים לריצות מקומיות.
- **`check:node-runtime` פועל ב-11 משרות** — ⚠️** ROI נמוך.** כל אחד מהם הוא רץ נפרד והצ'ק הוא < 1s; חיסכון כולל ~ 10s, נגד אובדן שומר זול לכל עבודה. לא שווה את הנטישה.
- **`typecheck:noimplicit:core` על CI מוך** — ✅** הוסר מעבודת המוך** (היה זק"ע `continue-on-error`); משטח סוג חסימה הוא `typecheck:core` + `check:type-coverage`. התסריט המקומי נשמר.

### להפוך / להחליט (מדיניות המפעיל)

- `check:openapi-security-tiers` (מייעצת) — ❌**NOT מתהפך בצורה נקייה.** זה יוצא מ-0 אבל מזהיר שמספר מסלולי `traffic-inspector` תחת `LOCAL_ONLY_API_PREFIXES` חסרים את הביאור `x-loopback-only: true`. אכיפתו מחייבת הוספת ההערות הללו ל- `openapi.yaml` תחילה.
- `typecheck:noimplicit:core` (מייעצת) — נכלל ברובו על ידי מחגר `check:type-coverage` החוסם. הפוך למחגר או זרוק את מעבר ה- `tsc` השני המיותר.
- `test:vitest:ui` (עכשיו** חסימה** ) כשלים קיימים — אינם נכללים במפורש ב- `vitest.config.ts` עם הערות מעקב `// #8618` ; כשלים חדשים נכשלים בעבודה.
- `check:secrets` (גיטליקים, חסימת ראצ'ט קפוא ב-3 נקודות חיוביות כוזבות מתועדות) — רשום את ה-3 כדי להגיע ל-0, או לרדת בדרגה לייעוץ. חופף GitHub סריקה סודית מקורית + `check:public-creds`.
- `check:pr-evidence` (חסימה, greps PR-body prose) — סיכון חיובי כוזב גבוה; מחלישה את אכיפת ה- Hard Rule #18 אם נפל, כך שזוהי קריאת מדיניות אמיתית.
- `semgrep` (עצמאי מייעץ) — חופף CodeQL עבור משפחות OWASP ; חוט את קו הבסיס שלו למחגר או טיפה.

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
