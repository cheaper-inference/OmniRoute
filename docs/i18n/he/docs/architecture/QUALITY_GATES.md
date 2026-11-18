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

Mergify כותבת את תקציר התור שלה לתיאור הטיוטה, וגם אפליקציות אחרות יכולות לערוך אותו. אירוע `pull_request` `edited` בדראפט כזה לוקח קבוצת מקבילות משלו (`-queue-edit-<run_id>`) כך שהוא לא יכול לבטל את הריצה האמיתית של הדראפט, והוא מדלג על השער והמטריקס. רק `Merge integrity` עדיין פועל. עבודת השער שדילג נושאת שם צ'ק אחר, מכיוון ש-Mergify קורא `Gate / CI` שדילג עליו כבדיקה שנכשלה ומוציא את ה- PR בתור.

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

| תסריט (`npm run ...`)             | מאמת                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | חסימה                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| `check:node-runtime`              | גרסת Node.js נמצאת בטווח הנתמך                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | כֵּן                                    |
| `check:cycles`                    | יבוא מעגלי על פני כל `src/` + `open-sse/` (מבוסס AST, tsconfig `paths` נפתר). חשוף יוצא 1 בכל פעם שקיים מחזור כלשהו (כישלון-סגור מאז #15281) ומפרט את ה- SCCs. `check:cycles:ratchet` (מה CI רץ) חוסם כאשר הספירה עולה על תקרת `metrics.cycles` ב- `quality-baseline.json` — כרגע 14, `direction: down`, כך שהוא יכול רק ליפול (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                | כן (מחגר)                               |
| `check:boundary`                  | צימוד `open-sse → src` : ייבוא ייחודי של קובץ לקובץ מהמנוע לתוך האפליקציה (`scripts/quality/measure-boundary.mjs`; רשימת הקצה היא צבר התיקון v4 core/module-split ). דוח ייעוץ חשוף = (זהה ל- `quality:boundary`). `check:boundary:ratchet` (מה CI פועל, גם ב- `quality.yml` fast-gates ratchet loop) חוסם כאשר הספירה עולה על תקרת `metrics.boundaryOpenSseToSrc` ב- `quality-baseline.json` — זרעו ב-771 הנמדד, `direction: down`; `--update` רק מוריד את זה; בסיס-יחסי על PRs (`--base-ref`, ראה להלן)                                                                                                                                                                                                                                                                                        | כן (מחגר)                               |
| `check:route-validation:t06`      | סכימות Zod קיימות בכל המסלולים (מדיניות שכבה 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | כֵּן                                    |
| `check:any-budget:t11`            | ספירת `@ts-expect-error // any` אינה חורגת מהתקציב (tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | כֵּן                                    |
| `check:provider-consistency`      | לכל ספק ב- `providers.ts` יש ערך תואם ב- `providerRegistry.ts` (ולהיפך, ברשימת ההיתרים)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כֵּן                                    |
| `check:model-lifecycle`           | שלושת טבלאות הניתוב המנוהלות ביד נשארות עקביות עם תמונת המצב של מחזור החיים שבוצעה הצ'ק-אין (#11503): `FITNESS_TABLE` (`taskFitness.ts`) לא מקבל מזהה ש- `REGISTRY` יכול לנתב; כל מטרת `BUILT_IN_ALIASES` קיימת ב- `REGISTRY` ונעדרת מתמונת המצב של ה-ID בדימוס; כל תעודה מזהה שעדיין ב- `REGISTRY` מועברת או רשומה ב- `allowedRetiredInCatalog`; ושום מקור או מטרה `DEFAULT_DEGRADATION_MAP` לא מופיעים בדימוס באותה תמונת מצב. זה לא מוכיח שדוגמנית מוגשת כעת על ידי זרם בשידור חי. — לא מקוון משווה ל- `config/quality/model-lifecycle.json`, רענון ידני עם `npm run quality:refresh-model-lifecycle` (רשת; לא מחובר ל- CI). `allowedRetiredInCatalog` הוא מחגר שרוף: הוסף ערך רק עם בעיית מעקב.                                                                                              | כֵּן                                    |
| `check:fetch-targets`             | כל `fetch("/api/...")` ב- `src/` בצד הלקוח נפתר ל- `route.ts` אמיתי                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | כֵּן                                    |
| `check:deps`                      | כל deps `npm install` -able על פני כל `package.json` בריפו הם ב- `dependency-allowlist.json`; חבילות חדשות לא מוצמדות או משופעות מסומנות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | כֵּן                                    |
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
| `check:known-symbols`             | מבצעי ספקים, אסטרטגיות ניתוב ומתרגמים הרשומים בטבלאות השליחה שלהם תואמים לקבצים בדיסק — ללא סמלים מיותמים או לא מוכרזים                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כֵּן                                    |
| `check:route-guard-membership`    | כל מסלול שמוליד תהליך ילד מסווג לפי `isLocalOnlyPath()` (חוקים קשים #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | כֵּן                                    |
| `check:test-discovery`            | כל קובץ `*.test.ts` / `*.spec.ts` ב-repo נאסף על ידי רץ בדיקה אחד לפחות (ראצ'ט: רשימת יתומים ב- `test-discovery-baseline.json` יכולה רק להתכווץ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | כֵּן                                    |
| `check:test-tla-order`            | אף קובץ `node:test` תחת `tests/unit` לא רושם בדיקה, פוגע ב- `await` ברמה העליונה, ואז רושם יותר (#18045; ratchet: `test-tla-order-allowlist.json` יכול רק להתכווץ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | כֵּן                                    |
| `check:agent-skills-sync`         | חפצי כישורי סוכן שנוצרו תואמים לקטלוג המקור שלהם (ללא סחף). מצב שחרור בודק כל מיומנות; תכונה PR (מצב `pr` ) בודק רק את הכישורים שאת הטקסט שנוצר הוא עורך — ראה [קבצים שנוצרו וקווי בסיס נגזרים](#generated-files-and-derived-baselines-written-at-release)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
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

| תַסרִיט                      | מאמת                                                                                                                                          | חסימה                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | פולט `quality-metrics.json` (ספירת אזהרות ESLint, סיקור מדוח רסיס ממוזג)                                                                      | כן (במעלה הזרם של הראצ'ט) |
| `quality:ratchet`            | כל מדד ב- `quality-baseline.json` לא נסוג (ESLint warnings ≤ baseline; כיסוי ≥ baseline)                                                      | כֵּן                      |
| `check:duplication`          | שכפול קוד (jscpd@4) אינו עולה על קו הבסיס ב- `quality-baseline.json`                                                                          | כֵּן                      |
| `check:complexity`           | המורכבות הציקלומטית ברמת הקובץ אינה חורגת מהמכסה (core ESLint `complexity` + `max-lines-per-function`)                                        | כֵּן                      |
| `check:cognitive-complexity` | מורכבות קוגניטיבית מחגר (`eslint-plugin-sonarjs`) — נפרד ESLint pass; CI מריץ את שניהם ממוזגים כשלב `check:complexity-ratchets` היחיד         | כֵּן                      |
| `check:dead-code`            | יצוא / קבצים לא בשימוש (knip) אינו נסוג לעומת קו הבסיס                                                                                        | כֵּן                      |
| `check:compression-budget`   | רצפות חסכון באסימון דחיסה של תקציב — לכל מנוע אסורות לסגת                                                                                     | כֵּן                      |
| `check:type-coverage`        | ראצ'ט שהוקלד באחוזים (`type-coverage`) אינו נסוג; סובלת במידה רבה `typecheck:noimplicit:core`                                                 | כֵּן                      |
| `check:codeql-ratchet`       | ספירת ההתראות הפתוחה CodeQL אינה נסוגה (קורא דרך `gh api`; דילוג חינני ללא אסימון) קצב רענון — והדק ידני: ראה "CodeQL ratchet" למטה           | כֵּן                      |
| `check:type-scale-ratchet`   | סולם סוג ערכה: גדלים מתחת ל-12 פיקסלים ו- `font-bold` ב- `src/` רק יורדים (`typeScaleSubFloorSizes`, `typeScaleFontBold`); גם ב-pre-commit וו | כֵּן                      |

### עבודה: `quality-extended`

עבודה מעורבת, ללא `continue-on-error` ברמת עבודה: צעד שעובר את `--ratchet` נכשל בעבודה ברגרסיה מדודה לעומת `quality-baseline.json`. רק `check:circular-deps` ושלב התקנת הסורק הם ייעוץ ( `continue-on-error: true` ברמת צעד). הסורקים החיצוניים מתקינים באמצעות `gh release download`; `check:secrets` דילוג עצמי (יציאה 0) כאשר gitleaks נעדר, בעוד `check:vuln-ratchet`, `check:workflows` ו- `check:openapi-breaking` נכשלים סגורים כאשר המדידה שלהם חסרה.

| תַסרִיט                  | מאמת                                                                                                                                                                                     | חסימה                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `check:circular-deps`    | אין תלות מעגלית (dpdm)                                                                                                                                                                   | **מְיָעֵץ**                        |
| `check:bundle-size`      | גודל החבילה אינו חורג מהמכסה; גם גודל בלתי מדיד נכשל                                                                                                                                     | **חסימה עם --ratchet**             |
| `check:secrets`          | סריקה סודית (gitleaks) — מדלג אם בינארי נעדר                                                                                                                                             | **חסימה עם --ratchet**             |
| `check:vuln-ratchet`     | פרצות תלות (osv-scanner) אינן נסוגות — `--ratchet` נכשל כ- INCOMPLETE (יציאה 2) אם לא נמדדת                                                                                              | **חסימה עם --ratchet**             |
| `check:workflows`        | מוך זרימת עבודה (actionlint + zizmor); סורקי missing/broken, דוחות לא חוקיים או קו בסיס מחגר חסר נכשלים כ- INCOMPLETE. ממצאים תקפים פועלים בהתאם למדיניות strict/advisory/ratchet שנבחרה | נדרש ביצוע; חוסם מחגר zizmor ב- CI |
| `check:openapi-breaking` | חוזה API ציבורי נגד התחייבויות אירוע מוצמדות (PR מיזוג-בסיס, push before, merge-group base; scheduled/manual checkout אב ראשון); המדידה הנדרשת נכשלה סגורה                               | **חסימה עם --ratchet**             |

### עבודה: `docs-sync-strict`

פועל על כל PR to `main`. בלוקים מתמזגים על כישלון.

| תַסרִיט                        | מאמת                                                                                                                                 | חסימה                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `check:docs-all`               | מטא-שער שמריץ את 6 שערי המשנה למטה ברצף                                                                                              | כֵּן                      |
| ↳ `check:docs-sync`            | עקביות גרסת CHANGELOG / OpenAPI ; מצב שחרור גם 66 מראות `llm.txt` וקטעי CHANGELOG מתורגמים (מצב PR : מראות מסכימים)                  | כֵּן                      |
| ↳ `check:docs-counts`          | ספירות בפרוזה (ספירת ספקים, ספירת הגירה וכו'). שני מצבים: `pr` on feature PRs, `release` במקום אחר — ראה "ערכים נגזרים" למטה         | כֵּן                      |
| ↳ `check:env-doc-sync`         | כל env var ב- `.env.example` מתועד בטבלת מסמכים, ולהיפך                                                                              | כֵּן                      |
| ↳ `check:deprecated-versions`  | אין מחרוזות גרסה שהוצאו משימוש במסמכים                                                                                               | כֵּן                      |
| ↳ `check:doc-links`            | קישורי סימון פנימיים במסמכים פותרים לקבצים אמיתיים (טופס `[text]`/`(path)` )                                                         | כֵּן                      |
| ↳ `check:fabricated-docs`      | מסלולים, env vars, פקודות CLI, שמות Hook ונתיבי קבצים המצוטטים במסמכים קיימים בבסיס הקוד. שער קשה דרך `--strict`; soft-fail ללא דגל. | כן (דרך `--strict` ב- CI) |
| `check:cli-i18n`               | מקשי CLI `t()` קיימים ב- `bin/cli/locales/en.json` (שני המצבים); זוגיות pt-BR / zh-CN / zh-TW עם `en.json` במצב שחרור בלבד           | כֵּן                      |
| `check:openapi-coverage`       | מפרט OpenAPI מכסה לפחות רצפת רצועה של מסלולים אמיתיים                                                                                | כֵּן                      |
| `check:openapi-security-tiers` | הערות שכבת אבטחה ב- `openapi.yaml` תואמות לסיווגי `routeGuard.ts`                                                                    | **מְיָעֵץ**               |
| `check:openapi-routes`         | כל נתיב ב- `openapi.yaml` הופך ל- `route.ts` אמיתי (אנטי-הזיה)                                                                       | כֵּן                      |
| `check:docs-symbols`           | כל התייחסות `/api/...` ב- `docs/**/*.md` נפתרת ל- `route.ts` אמיתי (אנטי-הזיה)                                                       | כֵּן                      |
| `i18n translation drift`       | מראות `docs/i18n/**` vs `.i18n-state.json` — ייעוץ על PRs (המראות מתרעננות על ידי גל התרגום), קפדני על דחיפה ולילה                   | **מְיָעֵץ** על PRs        |

#### מראות תרגום הם קבצים נגזרים (מצב PR לעומת מצב שחרור)

A feature PR עורך רק מקורות באנגלית. מראות `docs/i18n/<locale>/**` (כולל 66 עותקי `llm.txt` וקבצי `CHANGELOG.md` המתורגמים) ו- `.i18n-state.json` נכתבים מחדש בשלב אחד על ידי גל התרגום (ענפי `docs/i18n-*` / `chore/i18n-*`, `i18n-mirror-refresh.yml` המתוכנן) ועל ידי השחרור (`npm run release:sync-changelog-i18n`). לכן שערי המראה פועלים בשני מצבים, שנפתרו על ידי `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`, ואז `OMNIROUTE_GATE_MODE`, ואז אירוע הפעולות; ריצה מקומית היא `release`):

- מצב שחרור `check:docs-sync` — מפעיל כל בדיקה. מצב PR שומר על גרסת package.json/OpenAPI, כותרות השורש CHANGELOG והשומר המוחלף-docs, ומדפיס `SKIP reason=pr-mode` עבור עותקי המראה של `llm.txt` וקטעי CHANGELOG המתורגמים — אלא אם כן ה- PR כותב מראות: ענף ראש שהוכרז ככותב של משפחת `docs/i18n/**` ב- `config/quality/derived-paths/*.json` מפעיל את ה-dsol, כאשר הבסיס עצמו, משנה את ה-dsol. diff עריכות `docs/i18n/<locale>/llm.txt` או `CHANGELOG.md` פועלות שבודקות בקפדנות. בסיס ה-diff לא נפתר ב- depth-1 checkout (עבודת `docs-sync-strict` ), אז מצב PR מפעיל גם בדיקה אחת שאינה זקוקה לבסיס: כל מראה `llm.txt` חייבת להתקיים, לשמור על מפריד `---` שלה ולשאת או את גוף השורש או את הגוף שרוב המראות חולקות. בסיס שזז מותיר את כל המראות מעופשים באותה מידה ועובר; עריכה ידנית במראה אחת נכשלת. לקבצי `CHANGELOG.md` המתורגמים אין צ'ק כזה בקופה depth-1 PR.
- הוק לפני התחייבות רץ `check-docs-sync.mjs --mode=pr`: התחייבות נשפטת על מה שהיא עושה. ללא הדגל, ריצה מקומית היא מצב שחרור, ו- PR אחד שעורך את השורש `llm.txt` יחסום כל commit מאוחר יותר על הבסיס הזה עד שהגל ירוץ. אותו כלל תקף עבור כל שער מודע למצב שהוק האסקי רץ: הוק עובר `--mode=pr`, והפסק הדין הקפדני נשאר עם ריצות מצב השחרור (השחרור PR, דוחף ל- `main`, ריצה מקומית פשוטה).
- בדיקות יחידת תוכן מראה (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`, `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`, `docs/*-locales`) מצב שחרור — קובע כל מקום. מצב PR קובע רק את המראות שעדכניות עם המקור האנגלי לפי `.i18n-state.json` (hash של קובץ שלם, או ה-hash של הקטע המוקלט של הקטע שסיכות הבדיקה) ומדלג על אלה המעופשים עם סיבה. בדיקות המקור `target_hash` פועלות עבור כל אזור בשני המצבים. הטריות היא לכל קטע `## `, יחידת `run-translation.mjs` hashes; קטע ארוך (מלאי השער של הקובץ הזה הוא בערך חצי ממנו) פירושו שכל עריכה בו משאירה את המראות האלה מעופשות, והקביעות שלהם במצב PR מדלגות עד לגל הבא. עוגן שהמקור האנגלי כבר לא מכיל נופל חזרה להשוואת הקובץ כולו.
- `i18n translation drift` — ייעוץ על PRs, קפדני על דחיפה, מדי לילה וחיתוך השחרור, כך שמראה מעופש לא יכולה לשלוח בשחרור.

`scripts/i18n/sync-llm-mirrors.mjs` (מיוצא גם כ- `syncLlmMirrors()`, עם `--dry-run`) משכתב את מראות `llm.txt` ; רענון השחרור, גל התרגום וה- `i18n-mirror-refresh.yml` המתוכנן מריצים אותו (הרענון מזהה מראות `llm.txt` מעופשות עם ריצה יבשה, מכיוון שדוח הסחיפה אינו מפרט אותן, ומסנכרן אותן לפני `check:docs-all`).

נוצרים שנים עשר README SVGs מתחת `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` מחולל את כולם). לכל אחד יש מבחן יחידת השוואת בתים (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) שנכשל כאשר הקובץ המחויב מיושן במצב שחרור; ב- PR, `check:generated-artifacts` שופט את SVG את PR עורך והסחף של הבסיס נותר לרענון השחרור (ראה [קבצים שנוצרו וקווי בסיס נגזרים](#generated-files-and-derived-baselines-written-at-release) ) — ו- `check:docs-counts` קוראים מספרים קנוניים מצמתי `<text>` שלהם — וזו הסיבה ששלב המתאר שומר על כל מחרוזת המתוארת בקובץ כבלתי נראית `<text>`. הסימון SVG canonical-numbers קורא את הקבצים הרשומים ב- `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, פלוס `public/images/tier-flow-dark.svg` ו- `tier-flow-light.svg`; הטענות בחינם לנצח, כניסה לקטלוג, מאגר חוזר וגורמי ניקוד קוראים גם `promise-pillars.svg`, `free-tier-budget.svg` ו- `strategies-grid.svg`. הספירות שהגנרטורים הללו מציירים (סה"כ ספקים, כלי MCP, אסטרטגיות ניתוב, ספקי חינם לנצח, ...) מגיעות מתמונת העובדות `docs/reference/derived-facts.json` עד `scripts/docs/readmeFacts.mjs`, לא מילוליות, כך שיצירת דיאגרמה בכל ענף משחזרת את הקובץ המחויב. `free-tier-budget.svg` שואב את השורות שלו מאותה תמונת מצב (`code.freeTierBudget`, תקציר הקטלוג של בדיקת העובדות), כך ששינוי ל- `FREE_MODEL_BUDGETS` מגיע לכרטיס ברענון הבא במקום להפוך CI לאדום.

### ערכים נגזרים: מצבי השער `pr` ו- `release`

תכונה PR אף פעם לא כותבת ערך שתלוי במצב הבסיס שלה: ספק, הגירה, ספירת כלי MCP ואסטרטגיה, מספרי README SVG, תמונת מצב של עובדות. צעד אחד מחשב מחדש את כולם, `npm run release:refresh-derived`, המופעלים על ידי השחרור ועל ידי הרענון הנגזר הלילי PR. כָּך** בין מהדורות הבסיס עומד מאחורי הקוד החי לפי עיצובו** , ושער או בדיקה שהשוו את העץ לקוד החי יהיה אדום בכל PR לאחר שאח הוסיף ספק. לכן השערים השופטים ערכים נגזרים פועלים באחד משני מצבים, שנפתרו על ידי `scripts/check/lib/gateMode.mjs` (מנצח במשחק הראשון):

1. `--mode=pr|release` בשורת הפקודה;
2. משתנה הסביבה `OMNIROUTE_GATE_MODE` (`pr` או `release`);
3. אוטומטי, מאירוע GitHub Actions: `pull_request` שראשו אינו `release/v*`, a `merge_group`, או push to `omni-queue/**` → `pr`; כל השאר (דחיפה, לוח זמנים, שיגור, השחרור PR `release/v* → main`, כל ריצה מקומית) → `release`.

מה `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) נכשל בכל מצב:

| מצב       | נכשל                                                                                                                                                                                                                                                                                                                            | צריך את העובדות החיות |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `release` | כל בדיקה, שוויון קפדני מול העובדות שנאספו מהעץ (ההתנהגות שהייתה לשער תמיד): ספירה מעופשת, גרסה, רצפת כיסוי או מספר SVG היא סחיפה STRICT                                                                                                                                                                                         | כֵּן                  |
| `pr`      | רק מה שהשינוי עשה, הבדל מול בסיס PR עם אותם מחלצי תביעה: (1) ערך מנוהל שלא היה קיים בבסיס עבור אותו המחאה והקובץ ("PR edited a managed number — restore the line to the base text"); (2) תביעה נדרשת שהבסיס נשא והראש איבד. אינוריאנטי תוכן שאינם זקוקים לעובדות פועלים כמו במצב שחרור; בדיקות לשחרור בלבד רשומות ומדלגות עליהן | לֹא                   |

קבצי הוראות הסוכן נושאים** לֹא** ספירה נגזרת בכלל: `AGENTS.md`, `llm.txt` (ועותקי `docs/i18n/*/llm.txt` שלו), bs `AGENTS.md` fork, `open-sse/services/AGENTS.md`, `src/shared/constants/agentSkills.ts`, `skills/README.md` וכל `skills/*/SKILL.md` מצביעים על המקור (למשל `ROUTING_STRATEGY_VALUES` ב- `src/shared/constants/routingStrategies.ts`) ואל `npm run facts` במקום. המשתנה "ללא ספירות נגזרות (קובץ הוראות סוכן...)" נכשל בספירה שם (ספקים, העברות, כלים והיקפים של MCP, אסטרטגיות ניתוב, גורמי ניקוד, ערכות מצבים) בשני המצבים, כך שלרענון השחרור לעולם לא יהיה צורך לשכתב קובץ הוראות.

במצב `pr` ענפי הכותבים עשויים לערוך ערכים מנוהלים: `chore/derived-*` (הרענון הלילי PR), `release/v*` וגלי התרגום `docs/i18n-*` ו- `chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`). קבוצות תור (`merge_group`, Mergify drafts, `omni-queue/**`) לא נשפטות שוב: הן מסכמות PRs את השער שכבר נשפט בזה אחר זה.

קודי יציאה: `0` clean · `1` STRICT drift (או soft drive עם `--strict`) או הפרת ערך מנוהל · `2` infrastructure — לא ניתן לאסוף את עובדות הקוד (הבדיקה של tsx נכשלה או פג הזמן הקצוב; הזמן הקצוב הוא `OMNIROUTE_FACTS_TIMEOUT_MS`, ברירת המחדל 600000 mss) או, ב- CIPR dsol. יציאה 2 היא אף פעם לא סתירה בתיעוד: הפעל מחדש את העבודה או תקן את הסביבה.

היכן פועל כל מצב:

| אֵיפֹה                                                                                   | מצב                                                                                                                                                                                            |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| תכונה PR — `ci.yml` job `docs-sync-strict`, שלב `quality.yml` "דיוק מסמכים"              | `pr` (אוטומטי); העבודה מעבירה את הבסיס כ- `BASE_SHA` ומבצעת צ'ק אאוט עם `fetch-depth: 2`                                                                                                       |
| `merge_group`, `omni-queue/**` מועמדים, רשימת השערים המלאה של רכבת המיזוג                | `pr`                                                                                                                                                                                           |
| שחרר PR (`release/v* → main`), דחיפות, ריצות מתוזמנות וידניות                            | `release`                                                                                                                                                                                      |
| שחרור-ירוק (`scripts/quality/validate-release-green.mjs`)                                | פריטי HARD פועלים עם `OMNIROUTE_GATE_MODE=pr` ("האם הבסיס נשבר?"); פריט DRIFT `derived-refresh` מפעיל את `npm run release:refresh-derived -- --check` (תצוגה קפדנית, אף פעם לא פותח בסיס-אדום) |
| שחרור (`/generate-release` שלבים 0a ו-1; חיווט המיומנות הוא שינוי נפרד מאושר בעלים)      | `npm run release:refresh-derived` כותב את הקבצים הנגזרים; הבדיקות של השחרור של PR עצמו לאחר מכן פועלות במצב `release`                                                                          |
| `nightly-derived-refresh.yml` (יומי, `release/vX.Y.Z` הגבוה ביותר, דילג תחת הקפאת שחרור) | `npm run release:refresh-derived -- --profile=nightly`; ב-diff הוא שומר ONE PR פתוח מ- `chore/derived-refresh`; לעולם לא מתמזג                                                                 |

הפקודות מאחוריו:

- `npm run facts` מדפיס כל מספר נגזר כ- JSON (`scripts/release/facts.mjs`). `--key=code.mcpTools` מדפיס ערך אחד, `--snapshot` קורא את תמונת המצב המחויבת במקום את העץ החי. יציאה 2 כאשר לא ניתן לאסוף את העובדות.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) recomputes the derived files in one pass, in this order (step ids for `--only=`): `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (the snapshot), `numbers` (the counts gate's rewrite plan applied to the docs, then carried to their `docs/i18n/` mirrors), `readme-diagrams`, `skills` (generated `SKILL.md`), `e2e-timings` (skipped until the tree ships `syncE2eTimings`), `ui-keys` (prunes keys `en.json` dropped and, with `--rewritten-since=<ref>` — default `origin/main` — re-queues English values rewritten since the last release), `llm-mirrors` and `verify-generated` (after a write, `check:generated-artifacts` and `check:agent-skills-sync` in release mode must pass; skipped in `--check` and when `--only` leaves it out; a failure is exit 2). The `changelog` step is opt-in (`--with-changelog`, release profile only). `--profile=nightly` never touches a version claim. With `-- --check` it writes nothing and exits 1 when any file would change or a managed value needs a manual edit (listing both); exit 2 on an infrastructure failure. `--json` prints the result as JSON.
- `docs/reference/derived-facts.json` הוא תמונת המצב של העובדות שבה השתמש הרענון האחרון. רק הרענון כותב את זה. מחוללי README SVG קוראים אותו, ומבחני יחידת זמן PR משווים את המסמכים המחויבים והקבצים שנוצרו איתו — אף פעם לא עם הקוד החי. ההשוואה החיה ליחיד של הסוויטה היא "רענון השחרור סוגר את המחזור" ב- `tests/unit/check-docs-counts-sync.test.ts`: עם העובדות החיות, תוכנית השכתוב של הרענון המיושמת בזיכרון לא משאירה שום סחיפה STRICT שהיא לא מדווחת, ותכנון מחדש לא משנה דבר.

כדי לשכפל באופן מקומי (ריצה מקומית כברירת מחדל היא `release`):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

ללא בסיס בר פתרון (ללא `BASE_SHA`/`BASE_REF`, ללא `origin/release/v<version>` מקומי) הפעלת `pr` מקומית מדפיסה אזהרה ומדלגת על ה-diff במקום להיכשל.

### עבודה: `i18n-ui-coverage`

| תַסרִיט                          | מאמת                                                                                                                                                     | חסימה               |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `check-ui-keys-coverage` (מוטבע) | כיסוי מפתח UI i18n הוא ≥ 65%                                                                                                                             | כן (שני המצבים)     |
| `check:ui-icu`                   | כל הודעה של כל קטלוג UI מתחבר עם `IntlMessageFormat`                                                                                                     | כן (שני המצבים)     |
| `check-ui-value-drift` (מוטבע)   | אנגלית משוכתבת** עֵרֶך** לא משאיר אחריו תרגום מעופש                                                                                                      | כן (מצב שחרור בלבד) |
| `check-new-key-coverage` (מוטבע) | א** חָדָשׁ** מפתח אנגלי מתורגם בכל מקום — סמן `__MISSING__:` נדחה                                                                                        | כן (מצב שחרור בלבד) |
| `check-key-completeness` (מוטבע) | כל קטלוג UI (ועם `--catalog=cli`, כל קטלוג CLI ) נושא בדיוק את סט המפתחות של `en.json` שלו; במצב `pr`, כל קטלוג שה- PR השתנה מול עצמו בבסיס המיזוג       | כן (שני המצבים)     |
| `check-translation-ratio`        | יחס תרגום אמיתי לכל מקום (זהה לאנגלית / מציין מיקום / עלים חסרים מחוץ לרשימת ההיתרים) לא יעלה על רפיון `config/quality/i18n-translation-baseline.json` + | כן (מצב שחרור בלבד) |

צריך `fetch-depth: 0` — שער ההיסחפות ערך שונה `en.json` מול בסיס המיזוג.

**שני מצבים (מאז 2026-11-13).** תכונה PR מוסיפה או משכתבת מפתחות ב- `en.json` (ו- `bin/cli/locales/en.json`) ולא נוגעת במקום אחר; `check:pr-derived-paths` (job `pr-test-policy`, family `config/quality/derived-paths/translation.json`) נכשל בתכונה PR שעושה זאת. המקומות האחרים מושלמים פעם אחת בכל מהדורה על ידי `release:refresh-derived`, שקוראת `syncUiKeys()` ב- `scripts/i18n/sync-ui-keys.mjs` (הוסף מפתחות חסרים, קטום מפתחות שנשמטו, סמן תרגומים של אנגלית משוכתבת עם `rewrittenSinceRef`, תרגם), או על ידי גל תרגום. השערים קוראים את המצב מ- `scripts/check/lib/gateMode.mjs`: במצב `pr` (תכונה PRs, `merge_group`, `omni-queue/**`) שערי מצב השחרור מעל מדפיסים `SKIP reason=pr-mode` ויוצאים מ-0; במצב `release` (השחרור PR, דוחף ל- `main`, `workflow_dispatch`, ריצות מקומיות) הם קפדניים כמו קודם, ובשחרור PR המודעים ל-diff מקבלים `BASE_REF=origin/main`, אז הם שופטים כל מפתח שהמחזור הוסיף או כתב מחדש. הצג תצוגה מקדימה של פסק הדין של תכונה-PR באופן מקומי עם `--mode=pr`.

לא מדלגים על PR שעדיין משנה קטלוגים מקומיים במצב `pr` (גל תרגום, רענון השחרור, תיקון לתרגום בלבד) לא מדלגים: `check-key-completeness` שופט כל קטלוג שהוא שינה מול אותו קטלוג בבסיס המיזוג (`scripts/i18n/lib/touched-catalogs.mjs`) ונכשל במפתח שהקטלוג איבד, מפתח שחסר ל- `en.json`, תרגום אמיתי הופך לערך של placeholders/tags יותר של `__MISSING__:` או סמן באנגלית. מיתר אנגלי שה- PR לא נגע בו. קטלוג חדש ב- PR חייב לשאת את כל סט מפתחות `en.json`. זה מכסה, עבור הקטלוגים ש- PR נוגע, מה יראו שער היחס וה-CLI-parity.

מבחני יחידת השוויון המקומי (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) עוקבים אחר אותם מצבים עד `tests/_helpers/localeParityMode.ts`: במצב `pr` הם מדלגים על קביעות שווי-מפתח ומשאירים לשחרור רענון שוויון המיקום של מפתחות שהאנגלית שלהם השתנתה מאז בסיס המיזוג (כל מפתח כאשר משימת בדיקת היחידה לא יכולה לקרוא אותה רדודה). העוזר הזה הוא** רַק** דילוג על מצב מותנה באישור: `check:test-masking` סופר `.skip(` ו- `{ skip: true }` אך לא את ה- `{ skip: "<reason>" }` המחושב שהוא מחזיר, אז `tests/unit/locale-parity-mode.test.ts` מצמיד את רשימת הבדיקות המותרות להשתמש בו — הוספת אחד היא עריכה בדוקה לרשימה זו.

#### `check-ui-value-drift` — שער תרגום מעופש

תופס את הרגרסיה האחת i18n שהשערים האחרים אינם יכולים לראות מבחינה מבנית: ערך אנגלי נכתב מחדש והתרגומים שנגזרו מהאנגלית _הקודמת_ נשארים מאחור, כך שמשתמשים שאינם אנגלים ממשיכים לקרוא עותק מנוסח בבטחה, כעת שגוי.

זה נשלח באמת. `oauthModal.googleOAuthWarning` נכתב מחדש כאשר עוזר הכניסה Antigravity נחת (#5203);** 39 מתוך 43 מקומות** כל הזמן טקסט שאומר למפעילים "להעתיק את ה- URL המלא ולהדביק אותו למטה" — זרימה שאינה יכולה להשלים עבור אותו ספק. זה לא הבחין עד #8463 כי:

- `sync-ui-keys` רק ממלא מפתחות שהם** נֶעדָר** , אף פעם לא כאלה שכן** לֹא טָרִי** ;
- `check-ui-keys-coverage` סופר את המפתח _נוכחות_, כך שתרגום מעופש מקבל ציון ככוסה;
- `check-translation-drift` עוקב אחר התיעוד של `docs/i18n/<locale>/**.md` מראות — זה אף פעם לא קורא `src/i18n/messages/*.json`. זה פועל ב-job `docs-sync-strict`: מייעץ ב- PRs, קפדני בדחיפה ולילה; גל התרגום מרענן את המראות, לא את התכונה PR.

**מודע לשינוי, לא מגובה בקו הבסיס.** הוא משווה `en.json` בבסיס המיזוג מול עץ העבודה; עבור כל מפתח שהערך שלו באנגלית השתנה, כל מקום שעדיין מחזיק בתרגום ללא נגיעה הוא מעופש. זאת בכוונה** מקפיא חוב קיים** — a diff לא יכול לחשוף מאיזו אנגלית ישנה הגיע תרגום ותיק, ולכן השער שופט רק במה נוגע השינוי הנוכחי. האלטרנטיבה (קו בסיס גיבוב לפי מפתח) תעלה קובץ שנוצר ~ 600 KB, 3 × הקו הבסיסי הגדול ביותר הקיים, שיתבצע על כל i18n PR.

שתי דרכים לספק את זה:

1. לעדכן את התרגומים המושפעים, או
2. הגדר אותם ל- `__MISSING__:<new english>` — זמן הריצה ואז משרת את האנגלית המתוקנת (`src/i18n/request.ts::deepMergeFallback`, #7258) ואת תורי המפתח לתרגום.

אם המחרוזת** מַשְׁמָעוּת** השתנה, מעדיף** שינוי שם המפתח** : מפתח חדש לא יכול לרשת תרגום מיושן. זו התבנית #8463 השתמשו בה.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

יוצא מ-0 עם `SKIP reason=base-unresolved` כאשר לא ניתן לקרוא את קטלוג הבסיס (שכפול רדוד ללא ה-base ref), שיקוף `check-openapi-breaking`. מצב שחרור בלבד: תכונה PR משכתבת את האנגלית ועוצרת שם; רענון השחרור מסמן את התרגומים שהוא השאיר אחריו (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, same `findStaleTranslations`).

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

אלה פועלים לפי לוח זמנים של קרון (ו- `workflow_dispatch`), אף פעם לא ב- PRs. כולם מייעצים.

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

## שלב המהירות (2026-08-30 → v4.0 LTS): כל קו בסיס השתחרר ב-20%

החלטת הבעלים (30-08-2026): עד למודולריזציה של v4.0, מהירות המשלוח חשובה יותר מאשר להחזיק בקו החוב. כֹּל** מספרי** קו הבסיס של המחגר שוחרר ב-20% במעבר אחד שניתן לביקורת, והשלב מוצהר ב- `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| מה השתנה                                                                                                                                                                      | אֵיפֹה                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — נמוך יותר-טוב יותר סופר × 1.2, אחוז גבוה יותר-טוב יותר ÷ 1.2 (רצפת כיסוי 60 נשמרת, `eslintErrors` נשארת 0, `eslintWarnings` 0 → 20% מספירת הדיכוי הקפואה) | `quality-baseline.json` (רשימות הערות `_relax_velocity_2026_08_30` כל לפני → אחרי)                     |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                              | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, כל `frozen[*]` / `testFrozen[*]` line cap × 1.2                                                                                                             | `file-size-baseline.json`                                                                              |
| לכל קובץ / לכל קוד TS × 1.2                                                                                                                                                   | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                           | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` הופך לייעץ בעוד `_policy.requireTighten === false`                                                                                                        | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| הפסקות `bank-ratchet-shrinks` ליליות (זה יגרום להתכווצות הנמדדת ותבטל את מרווח הראש)                                                                                          | `.github/workflows/nightly-release-green.yml`                                                          |

רשימות ההיתרים (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`, ...) הן** לֹא** תקציבים ולא נגעו בהם. שערי מדיניות Pass/fail (סודות, כללי SQL, חוזה docs/env, parity i18n, בדיקות יחידה) ללא שינוי — מבחן אדום הוא עדיין מבחן אדום.

**כלי עבודה**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — הרפיה חד-שוט (`scripts/quality/relax-baselines.mjs`); מסרב לרוץ פעמיים עם אותו פתק.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — מודד כל שער מספרי כפי ש- CI עושה ומדפיס את מרווח הראש הנותר לכל שער (`scripts/quality/baseline-headroom.mjs`). עבודת `baseline-headroom` הלילית מפרסמת את הטבלה בסיכום ריצת זרימת העבודה ומעלה את דוח JSON/Markdown שלה כ- `baseline-headroom-<run_id>`, נשמר למשך 90 יום. אזהרה ושורות קריטיות מזהות שערים בטווח של 10% מהמכסה או כבר מעליו. סקור דוחות אלה כאזהרה המוקדמת לתקציבים הנצרכים; בדוק את פתקי `_rebaseline_*` של השער הפוגע. המשרה כבר לא יוצרת או מעדכנת בעיה קבועה; #12149 משמר את היסטוריית הדוחות הקודמת.

**מצב קוד חדש (נקה-כפי-קוד) — מאז 2026-08-30, נתיב מהיר PR בלבד**

באירועי `pull_request` `quality.yml` מעביר `--base-ref <PR base SHA>` ל- `check:file-size`, `check:complexity-ratchets` ו- `check:dead-code`. עבור `check:complexity-ratchets` ו- `check:dead-code` השער משווה HEAD עם בסיס המיזוג** מוגבל לקבצים שבהם נגע PR** (`scripts/check/newCodeMode.mjs`: בסיס המיזוג מתממש ב- `git worktree` לזרוק, ESLint/knip רץ שם וב- HEAD, הספירות לכל קובץ שונות):

- **חסימה** — ה- PR הוסיף הפרות cyclomatic/cognitive או יצוא מת בקבצים ששינה (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` ביומן);
- **מְיָעֵץ** — הסכום הגלובלי לעומת קו הבסיס הקפוא. סחף בירושה לעולם לא אדום PR; הסחף מוקפא מחדש בעת פיוס השחרור ונצפה על ידי עבודת מרווח הראש.

`check:file-size` משתמש ב-base ref על פי התנאים שלו (`scripts/check/check-file-size.mjs`, #8522): הוא בודק כל מקור וקובץ בדיקה בעץ, קורא את ספירת השורות של כל אחד בבסיס PR עם `git show`, ונכשל בקובץ רק כאשר הוא עובר את תקרת הבסיס שלו (`frozen` / `testFrozen`, או `cap` / `testCap` ) ומחוץ לקו הבסיס שלו. קובץ שכבר נסחף על הבסיס, לכן אף פעם לא גורם ל- PR תמים.

`check:boundary:ratchet` מחיל את אותו כלל על המספר הבודד שלו (`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): באירועי PR גם `quality.yml` fast-gates וגם `ci.yml` lint job עוברים את ה- PR base SHA, ה-base commit נמדד מיצוא `git archive`, וה- PR נכשל רק כאשר ספירת הקצוות `open-sse → src` שלו עולה על הגדול של `metrics.boundaryOpenSseToSrc` והספירה על הבסיס. סחיפת בסיס מעל התקרה מדווחת (`base drift herdado`) אך לעולם אינה אדומה PR תמים; push → main שומר על התקרה המוחלטת, ובסיס SHA בלתי ניתן לפתרון נופל אליו עם אזהרה.

מועמד לתור-כל (דחיפה ל- `omni-queue/**`, ראה [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md) ) מקבל את אותו הטיפול כמו בקשת משיכה: שני זרימות העבודה עוברות את בסיס המועמדים (`needs.changes.outputs.candidateBase`) כ- `--base-ref`, וגם `check:ts7-diagnostics-ratchet` פועל נגדו. עבור שני שערי הקוד החדש, בסיס ההשוואה הוא ש- SHA עצמו, לא האב הראשון של התחייבות המיזוג העליונה, כך שכל בקשת משיכה של האצווה נשפטת.

`workflow_dispatch` פועל, ל-release-green swiep ולעבודת מרווח הראש הלילי אין בסיס PR ושומרים על ההשוואה המוחלטת (גלובלית). כיסוי, שכפול וכיסוי סוג נשארים גלובליים לעת עתה (הכלים שלהם אינם מייצרים הבדל לכל קובץ בזול) מועמדי — לאותו טיפול.

**סגירת השלב ב-v4.0 (LTS = צמוד יותר מבעבר, לא "חזרה לשגרה")**

1. על הטיפ הטהור `release/v4.0.0` : `npm run quality:headroom --json` לרשומה, ואז `npm run quality:ratchet -- --update`, `check:file-size --update`, `check:complexity-ratchets --update`, `check:dead-code --update`, כל שער בדיקת סוג של `--update` — כל קו בסיס יורד לערך הנמדד.
2. מחק `_policy` מ- `quality-baseline.json` (חיזק את `--require-tighten` ואת הבנקאות הלילית), שחזר `THRESHOLD = 36` (או יותר) ב- `check-openapi-coverage.mjs`.
3. הידוק מעבר למדוד היכן שהמודולריזציה השתלמה: גודל קובץ `cap` חזרה ל-1000 (או 800), קומות כיסוי + 5, יצוא מת 0 עבור החבילות המודולריות.

## Ratchet Baseline (`quality-baseline.json`)

מנוע הראצ'ט (`scripts/quality/check-quality-ratchet.mjs`) קורא `quality-baseline.json` ומשווה אותו מול `quality-metrics.json` שזה עתה נאסף. כל מדד שנסוג מעבר לאפסילון שלו נכשל בבנייה.

מדדים נוכחיים במעקב:

| מֶטרִי                | כיוון  | מַשְׁמָעוּת                    |
| --------------------- | ------ | ------------------------------ |
| `eslintWarnings`      | `down` | אסור לספור אזהרות ESLint לגדול |
| `coverage.statements` | `up`   | כיסוי הצהרות אסור ליפול        |
| `coverage.lines`      | `up`   | אסור ליפול כיסוי קו            |
| `coverage.functions`  | `up`   | כיסוי הפונקציה אסור ליפול      |
| `coverage.branches`   | `up`   | כיסוי הסניף אסור ליפול         |

כדי לעדכן את קו הבסיס לאחר שיפור אמיתי:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

דגל `--update` כותב את הערכים הנמדדים הנוכחיים לתוך `quality-baseline.json`. בנקאות שיפור היא עבודת release/nightly, לא תכונה של PR: `--require-tighten` (Fase 6A.5) נכשלת בשיפור לא-בנקאי רק במצב שחרור (דחיפה, לוח זמנים, השחרור PR, ריצות מקומיות). בתכונה PR (מצב שער `pr` ) הוא מדפיס את השיפור כמידע ומעביר; רגרסיה נכשלת בשני המצבים. במהלך שלב המהירות הוא מייעץ בכל מקום (`_policy.requireTighten: false`). ראה [קבצים שנוצרו וקווי בסיס נגזרים](#generated-files-and-derived-baselines-written-at-release).

### ראצ'ט CodeQL : רענון קצב והדק ידני

`check:codeql-ratchet` קורא** מצב ריפו, רענן בלוח זמנים — לא לכל PR.** `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` מדווח על `state: configured`, `schedule: weekly`: סריקת ברירת המחדל של GitHub, לא ניתוח לפי דחיפה. תוצאה: לאחר ש- PR שמתריע FIXES מתמזג, הראצ'ט ממשיך לקרוא את הספירה הישנה והגבוהה יותר עד שהסריקה המתוזמנת הבאה מפעילה — כך שהוא מדווח על רגרסיה על כל PR פתוח, כולל המעקבים של PR המתקן עצמו, עד שהסריקה תופסת.

**רענון ידני** : `gh workflow run codeql.yml --ref release/vX.Y.Z` מריץ מחדש את הניתוח ומפרסם מחדש התראות תוך דקות. קרא `.github/workflows/codeql.yml` תחילה — הכותרת שלו מסבירה שזה `workflow_dispatch` -only** מכיוון שהוא מתנגש עם "הגדרת ברירת המחדל" של GitHub** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`). שחזור הטריגרים `push`/`pull_request`/ `schedule` דורש** פעולת הבעלים תחילה** : הגדרות → אבטחת קוד → CodeQL: ברירת מחדל → מתקדם. אל תוסיף טריגר `schedule:` בלי המתג הזה — זה יפיק רק ריצות כושלות.

**הדקו את קו הבסיס לאחר שהספירה יורדת** — `node scripts/check/check-codeql-ratchet.mjs --update` כותב את הספירה הנמדדת החדשה לתוך `quality-baseline.json` → `metrics.codeqlAlerts.value`, כך שהמחגר לא מאפשר בשקט רגרסיה חזרה עד לתקרה הישנה. דוגמה עבדה (2026-09-02/03): PR #12502 תיקנו 7 התראות אמיתיות (13 → 6 נמדדו פתוחות); PR #12530 הידק את קו הבסיס הקפוא 11 → 6 כדי להתאים; 6 הנותרים נדחו לאחר מכן עם הצדקה לכל התראה עד ל-0 פתוח.

**פיטורים הם שיחת המפעיל (Hard Rule #14)** — לעולם לא תבטל התראת CodeQL מבלי לרשום את ההצדקה הטכנית בהערת ההדחה: `won't fix` עבור דרישת פרוטוקול במעלה הזרם, `used in tests` עבור מתקן בדיקה, `false positive` עבור חיטוי CodeQL לא יכול לראות (תקדים: `docs/security/ERROR_SANITIZATION.md`).

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

## קבצים שנוצרו וקווי בסיס נגזרים (נכתבו עם השחרור)

תוכנית 2026-11-13 ("מספרים נגזרים וטקסטים נפתרו רק בשחרור"): תכונה PR משנה את** מָקוֹר** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, קטלוג הכישורים, קטלוג השכבה החופשית, מפרט e2e חדש. הוא אינו מייצר מחדש את הקבצים המחושבים מאותו מקור, ואינו מביא שיפור מדוד לקו הבסיס. קבצים אלה נכתבים פעם אחת, על ידי רענון השחרור (`release:refresh-derived`) או על ידי רענון לילי PR. לפני כן, כל ז"ק PR נשא עותק מחודש משלו והתנגש עם המיזוג הבא (2026-11-13: 30 מתוך 321 PRs פתוחים כתבו מחדש `PROVIDER_REFERENCE.md`, 26-28 כתבו מחדש את דיאגרמות README ).

**השומר.** `check:pr-derived-paths` (job `pr-test-policy`) נכשל בתכונה PR שנוגעת בקובץ של משפחה ב- `config/quality/derived-paths/`:

| מִשׁפָּחָה  | קבצים                                                                                                                                                                       | נכתב מחדש על ידי                                                                                                          |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; שנים עשר יצרו README SVGs; `skills/*/references/**`; קבצי `SKILL.md` שאין להם בלוק מותאם אישית | `release:refresh-derived` (עובדות), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                           | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                      |

סופרים (`release/v*`, `chore/derived-*` ו- `chore/bank-ratchet-*` עבור קווי בסיס) פטורים; כך גם PR שמשנה רק משפחה אחת פלוס הנלווים שלו (עבור `generated`: הסקריפטים המחוללים, המבחנים שלהם, כניסות המיומנות של הסוכן — `src/shared/constants/agentSkills.ts`, ה- `skills/**` docs בכתב יד, `docs/openapi.yaml` — ו- `changelog.d/**`), למשל שינוי פריסת גיבור עם SVG המחודש שלו, או בדק קובץ `SKILL.md` regener. `SKILL.md` עם בלוק `<!-- skill:custom-start -->` בכתב יד אינו במשפחה: הבלוק המותאם אישית שלו נשאר ניתן לעריכה ליד תכונה.

**הצ'קים, לפי מצב שער** (`scripts/check/lib/gateMode.mjs`; עוזר `scripts/check/lib/derivedArtifactScope.mjs`):

| לִבדוֹק                                                                | `release` (דחיפה, לוח זמנים, שחרור PR, מקומי)      | `pr` (תכונה PR, אצווה בתור)                                                                                                                                                           |
| ---------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                              | כל מיומנות חייבת להיות שווה לתפוקת המחולל          | רק הכישורים שהטקסט שנוצר (מחוץ לבלוק המותאם אישית) או `references/` את PR עורך; אחרת `SKIP reason=pr-mode`                                                                            |
| `check:generated-artifacts` (README SVGs + e2e; צריך היסטוריה מלאה)    | כל SVG שווה את המחולל שלו; לכל מפרט יש ערך תזמונים | רק את החפצים שה- PR עורך; השאר `SKIP reason=pr-mode`; ללא הבדל בסיס → כל חפץ נשפט (כשל-סגור)                                                                                          |
| בדיקות השוואת בתים README SVG (`tests/unit/docs/readme-*-svg.test.ts`) | כל SVG                                             | רק SVG ה- PR עורך, כאשר הבסיס נפתר; לתשלום PR הרדוד של `test-unit` אין בסיס, אז שם הבדיקה מדלגת עם `SKIP reason=base-unresolved` ו- `check:generated-artifacts` הוא הבעלים של ההשוואה |
| השלמות תזמונים e2e (`tests/unit/balance-e2e-shards.test.ts`)           | לכל מפרט יש ערך                                    | אותו כלל כמו בדיקות SVG (מפרט חדש פועל עם המשקל החציוני)                                                                                                                              |
| `check-quality-ratchet.mjs --require-tighten`                          | שיפור ללא בנק נכשל (אלא אם כן `_policy`)           | שיפור שדווח, אף פעם לא כישלון; רגרסיה עדיין נכשלת                                                                                                                                     |

מצב שחרור שומר את פסקי הדין, קודי היציאה וההודעות שהיו לבדיקות הללו לפני הפיצול; לכל היותר מתווספת שורה אחת, ונותנת שם למצב שנפתר (`[agent-skills-sync] mode=release (auto: local run)`). הבדיקות מדלגות דרך אפשרות `{ skip: releaseOnlyUnlessTouched(...) }` של node:test, ש- `check:test-masking` מפרטת בבלוק לדוח בלבד (זה לא `.skip(` ולא `{ skip: true }`, אז זה לא נחשב כדילוג קשה). `check:generated-artifacts` פועל היכן שהבסיס ניתן לפתרון: job `lint` (`fetch-depth: 0`), מיד אחרי `check:agent-skills-sync`. באופן מקומי, `npm run check:generated-artifacts -- --mode=pr` מראה מה הצעד הזה שופט על PR. בדיקת ההצלבה הכוללת של הספק של `check:docs-counts` ("סך ההתייחסות לספק (doc vs live modules)") היא חלק משער הספירות ועוקבת אחר המצבים של אותו שער עצמו.

לא במשפחה, בכוונה: קבצי מדיניות שנקבעו על ידי אנשים (`gate-manifest.json`, the allowlists, `admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`) ותקרות שאולי תכונה PR תצטרך לערוך יחד עם קוד (ערכים של `quality-baseline.json`, קווי הבסיס של typecheck/file-size/complexity, `eslint-suppressions.json` — שנגזמו על ידי התקנת ESLint קדם-commit מופעלת כאשר הפרת PR מופעלת). `src/i18n/routeNamespaces.generated.json` נוצר גם הוא אך נשאר בתכונה PRs: האפליקציה מייבאת אותו בזמן ריצה, כך שהיא לא יכולה לחכות לרענון.

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
- **זיהוי מחזור** — ✅**DONE** (#15159 G-01/G-02). הטקסט הישן כאן קרא ל- `check:cycles` "השער הירוק, הנאצר" והצדיק את החסימה שלו מכיוון ש- `check:circular-deps` (dpdm) דיווח על 91 מחזורים. הירוק הזה היה א** ירוק מזויף** : `check:cycles` סרק 5 ספריות משנה (450 קבצים), התאים רק `import|export … from` סטטי, והפיל כל מפרט `@/` ו- `@omniroute/open-sse/`, כך שהוא לא יכול היה לראות את מחזורי הכינוי של + ייבוא דינמי ששלטו ב-repo. תוקן: השער הולך כעת `src` + `open-sse` (5023 קבצים), אוסף מפרטים מה- TypeScript AST (כך ש- `import("…")` סופר ו- `typeof import("…")` במיקום סוג לא), ופותר את tsconfig `paths`. זה מוצא** 14** מחזורים, לא 0. מכיוון שלא ניתן לתקן 14 מחזורים קיימים בשער PR, `check:cycles` הוא כעת** מַחגֵר** (`--ratchet`, תקרה `metrics.cycles.value = 14` ב `quality-baseline.json`, `direction: down`) — זה חוסם כל _רגרסיה_ והספירה יכולה רק ליפול. CI מריץ את `npm run check:cycles:ratchet`. נסיעות שרופה עם**A-01** . `check:circular-deps` (dpdm) נשאר מייעץ בתור הדעה השנייה הרחבה יותר.
- **מוּרכָּבוּת** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): הליכה ESLint אחת, סופרת לפי ruleId כך + max-lines cyclomatic וקווי בסיס קוגניטיביים נשארים עצמאיים; `check:complexity` / `check:cognitive-complexity` בודד נשארים עבור `--update` מקומי.
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

#### שער זוגיות `check-key-completeness` — מפתח-סט

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`). משווה את קבוצת מפתחות העלים של כל `src/i18n/messages/<locale>.json` עם `en.json` ונכשלת בכל עלה נעדר או נוסף, ללא קשר למועד הוספת המפתח. מצייני מיקום `__MISSING__:` נחשבים כנוכחים (התוכן שלהם הוא העסק של שער היחס). זהו ההשלמה המוחלטת של שני השערים diff-based/percentage : `check-ui-keys-coverage` אוכף קומה של 80% לכל מקום (43 מפתחות נעדרים מתוך ~ 13,000 עדיין קוראים 99.7%) ו- `check-new-key-coverage` שופט רק את המפתחות ש- PR מוסיף ל- `en.json`. אצווה מקומית נוצרת מה- `en.json` של היום שבו הסניף שלו נחתך ומתורגם במשך ימים בזמן שהבסיס ממשיך להוסיף מפתחות; אצווה PR לא מוסיפה מפתח בעצמו, כך ששני האחים נשארו בשקט כאשר אצווה 1 (#13044) נחתה 43 מפתחות בתשעה מקומות ואצווה 2 (#13660) 10 מפתחות קצרה בשמונה (2026-09-15). תקן אדום עם `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; עלה של `extra` פירושו שהמקור הפיל אותו — `sync-ui-keys` מוריד אותו (`--prune-extra`, ברירת המחדל). `--warn` מדווח מבלי להיכשל. `--catalog=cli` מריץ את אותה השוואה על `bin/cli/locales` (`npm run i18n:check-keys:cli`); שני השלבים חיים בעבודה `i18n-ui-coverage`. הבדיקה המוחלטת היא מצב שחרור בלבד: תכונה PR רואה `SKIP reason=pr-mode` והתיקון פועל ברענון השחרור או גל תרגום, לעולם לא בתכונה PR; PR שמשנה קטלוגים מקומיים שופט כל אחד מהם על פי בסיס המיזוג במקום זאת (ראה "שני מצבים" תחת job `i18n-ui-coverage`).

#### `check-new-key-coverage` — new-key i18n gate

אח של `check-ui-value-drift`. זה תופס ערך אנגלי שהיה** נכתב מחדש** בעוד שתרגומיו נותרו מאחור; זה תופס מפתח אנגלי שהיה** הוסיף** בעוד שבאזורים מסוימים מעולם לא קיבלו אותו.

`check-ui-keys-coverage` לא יכול לראות את המחלקה הזו: היא אוכפת אחוז קומה לכל מקום, ואחד עשר מפתחות נעדרים מתוך ~ 13,000 משאירים כיסוי של 99.9%. אחוז לכל שפה לא יכול לבטא "התכונה הזו נשלחה לא מתורגמת" — תכונה שלמה יכולה לנחות במקום חדש ללא טקסט ולעולם לא להזיז את המספר.

האירוע שהוא צופן בו: שלב 3 של בד התזמורת תרגם את אחד עשר המפתחות שלו ב-42 המקומות שהיו קיימים באותה תקופה. שעות לאחר מכן, אצווה שפת האיחוד האירופי (#13044) לקחה את הריפו ל-51 מקומות, ותשע העולים החדשים (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) מעולם לא קיבלו אותם. `deepMergeFallback` מחליף את האנגלית במפתח נעדר, כך שמצב הכשל היה UI לא מתורגם ולא UI — ריק אמיתי, ושקט לפי בנייה.

כמו אח שלו זה** מודע להבדיל** , השוואת אנגלית בבסיס המיזוג מול עץ העבודה, כך שהפערים הקיימים נשארים קפואים והשער לא נזקק להגירה כדי להידלק.

**סמן `__MISSING__:<english>` אינו מספק אותו (מאז 2026-09-17).** פעם זה היה הדחיה המתועדת — זמן הריצה חוזר לתקן — באנגלית עד שמונה תכונות PRs ב-2026-09-16 הוסיפו 61 מפתחות והטביעו את הסמן לכל 65 המקומות במקום לתרגם: השער הזה קיבל כל אחד, שום דבר לא חסם את PRs, והחסימה האמיתית-תרגום נכשל בשער השחרור של כל תרגום zq. 2.5% > + ). סמן נשפט כעת כתרגום נעדר. מצב שחרור רק מאז 2026-11-13: תכונה PR רואה `SKIP reason=pr-mode`, ובשחרור PR (`BASE_REF=origin/main`) השער שופט כל מפתח שהמחזור הוסיף. תקן אדום ברענון השחרור או גל תרגום עם `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, או את כל המקומות במקביל ל- `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, detached-safe, מסרב להתחיל ללא `OMNIROUTE_TRANSLATION_*` env). מפתח שחייב להישאר אנגלי (שם product/engine/flag מוצמד) שייך ל- `scripts/i18n/untranslatable-keys.json`, לעולם לא מאחורי סמן. `vi` אוסר סמנים על הסף (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — שער מבחן חונה

קובץ ברשימת `exclude` של `vitest.config.ts` הוא בדיקה שלא פועלת, וזה נראה כמו כיסוי למי שקורא את העץ. שישים ושניים קבצים הצטברו מאחורי ההערה `// #8618 — pre-existing failure; remove this exclusion when fixed`. גיליון #8618 נסגר ב-2026-08-11 בעוד הרשימה שאחריה מעקב גדלה מ-45 ערכים ל-62, כל אחד חדש יורש הערה המצביעה על נושא מת. כאשר הרשימה נמדדה לבסוף קובץ אחר קובץ (#13204),** 51 מתוך 62 עברו נגד העץ הנוכחי ללא שינוי במקור** .

השער מחייב כל אי הכללה שפותרת לקובץ אמיתי כדי (א) לתת שם לבעיית מעקב ו-(ב) להופיע ב- `config/quality/vitest-exclusions.json` עם הסטטוס הנמדד שלו, כך שהוספת אחת היא הבדל בר סקירה בקובץ ייעודי ולא שורה אחת נוספת במערך של 60 כניסות. זה בכוונה לא מריץ מחדש את הבדיקות שלא נכללות — שעולה ~ 10 דקות ושייך לעבודה תקופתית; רישומי המלאי מתי כל אחד מהם נמדד לאחרונה.
