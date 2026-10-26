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

## מלאי השערים ופרופילי ההרצה

### קליטת מועמדים

זרימות העבודה CI ו-Quality Gates מפיקות כל אחת פסק-דין יציב: `Gate / CI` ו-`Gate / Quality`. מדיניות הקליטה המנוהלת בגרסאות שלהן מונה כל עבודת upstream כנדרשת או כייעוצית. עבודה נדרשת רלוונטית חייבת להצליח: תוצאות missing, cancelled, skipped, pending ו-unknown אינן יכולות להקנות PASS. סיווג תקף של docs-only או catalog-only יכול להפוך נתיב קוד ללא רלוונטי; PR בטיוטה (draft) אינו מועמד מתקבל. תווית `hotfix` אינה פוטרת מהצגת ראיות.

שתי זרימות העבודה מכסות PRs לענפי main/release, דחיפות ל-`main`, הפעלה ידנית (dispatch) ואירועי merge-group. Push, dispatch ו-merge-group מריצים את מלוא קבוצת הבדיקות. דחיפות ל-`release/**` אינן מפעילות אותן (2026-10-18): כל שינוי כבר הריץ את המטריצה ב-PR שלו, והשילוב הממוזג הוא אחריותו של Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks ו-merge groups משתמשים ברנרים מתארחים (hosted) עבור עבודות שאחרת היו בוחרות רנרים עצמאיים (self-hosted); יש לוודא קיבולת hosted מספקת לפני ההשקה.

כל קבלת JSON מזהה את ה-SHA שעליו בוצע checkout, את ריצת זרימת העבודה ואת הניסיון (attempt). ה-CLI דוחה אי-התאמה בין ה-SHA של ה-checkout לזה של האירוע. בדיקות זרימת העבודה קושרות את חברות המדיניות לרשימת ה-`needs` של עבודת פסק-הדין, כך שנתיב חדש או מוסר לא יכול להיעלם בשתיקה. הקבלות מכסות את זרימת העבודה שלהן בלבד, ולא פרסום, פריסה (deployment), או את הרכיבים הפנימיים של סורק ייעוצי קיים. הפעלת שני שמות הבדיקות בכללי הענף היא שינוי ניהולי נפרד; הוספת עבודות אלה אינה מגנה על ענף כשלעצמה.

### מלאי הסריקה הסטטית

מלאי כינויי ה-npm המנוהל בגרסאות וחברות הסריקה הסטטית נמצאים ב-`config/quality/gate-manifest.json`. הריצו `npm run check:gate-manifest` כדי לאמת שמות סקריפטים ופקודות מדויקות מול `package.json`; הוספות, הסרות וסטיית פקודות (drift) מכשילות הן את ה-hook המקומי והן את עבודות סיווג-השינויים ב-CI. כינוי (alias) אינו עבודת זרימת-עבודה, מופע מטריצה או מקרה-בדיקה: אין להציג את הספירות הללו כניתנות להחלפה זו בזו.

השתמשו ב-`npm run quality:scan -- --list` או ב-`npm run quality:scan:fast -- --list` כדי לבדוק את הכינויים הנבחרים מבלי להריצם. ה-runner מפעיל את נקודת הכניסה של npm, כך שסביבת הריצה שלו (כולל Bun היכן שמוגדר) נשמרת. המניפסט מתעד כינויים מחוץ לפרופילים אלה כמופעלים בנפרד, ופקודות תחזוקה אסורות בפרופילי סריקה לקריאה-בלבד.

פרופילים אלה מכסים את הסריקה הסטטית בלבד. הם אינם מאשרים בדיקות מוצר, כיסוי, אריזה, בדיקות חיצוניות או את אישור השחרור המלא של מועמד. קליטת זרימת-העבודה משתמשת ב-`config/quality/admission-policy.json` המקושר וב-`scripts/quality/admission-verdict.mjs`. פרופילי Release-observer נשארים נפרדים; בדקו את הבדיקות והקבלות החלות עליהם באופן עצמאי. רשימת הפרוזה שלהלן היא חומר עיון, ולא הוכחה ששער אכן רץ.

הסקריפטים שוכנים תחת `scripts/check/` (שערי מדיניות) ו-`scripts/quality/` (מנוע ה-ratchet). מקור האמת של ה-CI הוא `.github/workflows/ci.yml`.

### נתיב מהיר ל-PR של שחרור (`quality.yml`)

`.github/workflows/quality.yml` משלים את ה-CI עבור PRs של main/release, דחיפות ל-`main`, dispatch ו-merge groups. PRs משתמשים בבדיקות מהירות המסוננות לפי נתיב. הבנייה הכפולה שהושבתה לצמיתות הוסרה; בדיקות הבנייה/האריזה/האתחול האמיתיות נשארות ב-CI.

| עבודה                                            | היקף                                                                                                                                                                    | חוסם           |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | PRs של תיעוד/קוד; הפניות לתיעוד API ו-docs-all                                                                                                                          | כן             |
| `Fast Quality Gates`                             | PRs של קוד; בדיקות סטטיות, typecheck, typecheck של לוח המחוונים, בדיקות יחידה מושפעות                                                                                   | כן             |
| `Forgotten sibling tests`                        | PRs של קוד; מודולים ששונו ממופים לצרכנים סטטיים ולבדיקות-אחים מועמדות; נתיבי barrel ו-dynamic-import מדווחים כאבחון ייעוצי, עם חריגים מרשימת ההתרות (allowlist) המצוטטת | **ייעוצי**     |
| `Vitest (fast-path)`                             | PRs של קוד; סוויטת vitest מהירה                                                                                                                                         | כן             |
| `Unit Tests fast-path`                           | PRs של קוד; סוויטת יחידה ב-4 shards                                                                                                                                     | כן             |
| `No new ESLint warnings`                         | PRs של קוד; שומר lint המודע ל-suppressions                                                                                                                              | כן, כולל forks |
| `Merge integrity (changelog + generated skills)` | PRs שאינם טיוטה; סנכרון changelog ו-skills מיוצרים                                                                                                                      | כן, כולל forks |

#### דוח בדיקות האחים הנשכחות (Forgotten sibling tests)

`npm run check:forgotten-sibling-tests` משתמש מחדש ברכיב פתרון הייבוא (import resolver) שמאחורי מפת ההשפעה של הבדיקות.
עבור כל מודול ייצור שהשתנה, הוא מדווח על שרשראות דטרמיניסטיות של
`changed module/symbol -> static consumer -> candidate sibling test` כאשר הבדיקה המועמדת
אינה מופיעה ב-diff של ה-pull request. סיכום ה-Markdown ותוצאת ה-JSON נשמרים כ-workflow
artifact בשם `forgotten-sibling-tests` לצורך כיול לפני כל השקה חוסמת.

Barrel re-exports וייבוא דינמי הם אבחוני פתרון בלבד; הם לעולם אינם יוצרים ממצא
חוסם. חריגים שאושרו בסקירה נמצאים ב-`config/quality/forgotten-sibling-allowlist.json`.
כל רשומה חייבת לציין את הצרכן (consumer) ואת הבדיקה המועמדת, לתת נימוק ספציפי, ולקשר
ל-GitHub issue או pull request. רשומות פגומות נכשלות באופן מחמיר (fail closed).
חריגים אינם יכולים להסתיר בדיקה מועמדת שנמחקה או diff שמוסיף `.skip`/`.todo`;
החלשת assertion-ים ומסיכה מסוגים אחרים נותרים באחריות שער ה-`check:test-masking`
החוסם באופן עצמאי.

### משימה: `lint`

רצה על כל PR אל `main`. חוסמת מיזוג במקרה של כשל.

| סקריפט (`npm run ...`)            | מה מאומת                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | חוסם                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `check:node-runtime`              | גרסת Node.js נמצאת בטווח הנתמך                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | כן                                    |
| `check:cycles`                    | ייבואים מעגליים (circular imports) בכל `src/` + `open-sse/` (מבוסס AST, עם פענוח `paths` מ-tsconfig). ההרצה הישירה (bare) יוצאת עם קוד 1 בכל פעם שקיים מעגל כלשהו (fail-closed מאז #15281) ומציגה את רשימת ה-SCCs. ‏`check:cycles:ratchet` (מה ש-CI מריץ) חוסם כאשר הספירה חורגת מהתקרה `metrics.cycles` ב-`quality-baseline.json` — כרגע 14, `direction: down`, כך שהיא יכולה רק לרדת (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                  | כן (ratchet)                          |
| `check:boundary`                  | צימוד `open-sse → src`: ייבואים ייחודיים מקובץ-לקובץ מהמנוע אל האפליקציה (`scripts/quality/measure-boundary.mjs`; רשימת הקשתות היא מלאי התיקונים (backlog) של פיצול core/module ב-v4). הרצה ישירה (bare) = דוח ייעוצי (זהה ל-`quality:boundary`). ‏`check:boundary:ratchet` (מה ש-CI מריץ, וגם בלולאת ה-ratchet של fast-gates ב-`quality.yml`) חוסם כאשר הספירה חורגת מהתקרה `metrics.boundaryOpenSseToSrc` ב-`quality-baseline.json` — אותחלה על הערך הנמדד 771, `direction: down`; ‏`--update` רק מוריד אותה; יחסי ל-base ב-PRs (`--base-ref`, ראו להלן)                                                                                                                                                                                                                 | כן (ratchet)                          |
| `check:route-validation:t06`      | סכימות Zod קיימות בכל הנתיבים (מדיניות Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | כן                                    |
| `check:any-budget:t11`            | ספירת `@ts-expect-error // any` אינה חורגת מהתקציב (רתחן Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כן                                    |
| `check:provider-consistency`      | לכל ספק ב-`providers.ts` יש רשומה תואמת ב-`providerRegistry.ts` (ולהיפך, בתוך רשימת ההיתרים)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | כן                                    |
| `check:model-lifecycle`           | שלוש טבלאות הניתוב המתוחזקות ידנית נשארות עקביות עם תמונת מצב מחזור-החיים המופקדת במאגר (#11503): `FITNESS_TABLE` (`taskFitness.ts`) אינה מעניקה ציון לאף מזהה שהוצא משימוש ש-`REGISTRY` יכול לנתב אליו; כל יעד של `BUILT_IN_ALIASES` קיים ב-`REGISTRY` ונעדר מתמונת המצב של המזהים שהוצאו משימוש; כל מזהה שהוצא משימוש שעדיין נמצא ב-`REGISTRY` מופנה הלאה או רשום ב-`allowedRetiredInCatalog`; ואף מקור או יעד ב-`DEFAULT_DEGRADATION_MAP` אינו מופיע כמוצא משימוש בתמונת מצב זו. אין בכך ראיה לכך שמודל מוגש כרגע על ידי upstream חי. לא-מקוון — מושווה מול `config/quality/model-lifecycle.json`, שמתרעננת ידנית באמצעות `npm run quality:refresh-model-lifecycle` (רשת; לא מחובר ל-CI). `allowedRetiredInCatalog` הוא רתחן צמצום: מוסיפים רשומה רק יחד עם issue מעקב. | כן                                    |
| `check:fetch-targets`             | כל `fetch("/api/...")` ב-`src/` בצד הלקוח מתאים ל-`route.ts` אמיתי                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | כן                                    |
| `check:deps`                      | כל התלויות הניתנות להתקנה באמצעות `npm install` בכל `package.json` במאגר נמצאות ב-`dependency-allowlist.json`; חבילות חדשות שאינן נעוצות או חבילות slopsquatted מסומנות בדגל                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | כן                                    |
| `audit:deps`                      | `npm audit` (root + electron) — ללא אזהרות בדרגת high/critical (חופף ל-`check:vuln-ratchet` של osv; ראו Backlog הרציונליזציה)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | כן                                    |
| `check:lockfile`                  | שלמות `package-lock.json` — רג'יסטרי https, גיבובי שלמות, ללא דריסות host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | כן                                    |
| `check:licenses`                  | רשימת רשיונות SPDX מותרים עבור תלויות production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | כן                                    |
| `check:tracked-artifacts`         | אין ארטיפקטי build / קישורים סימבוליים (symlinks) של `node_modules` שנשמרו ב-commit (רץ גם ב-pre-commit של husky; ה-pre-push קל במכוון — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | כן                                    |
| `check:ai-attribution`            | ללא trailer מסוג `Co-Authored-By` של AI/בוט, או כותרת תחתונה של תוכן שנוצר על-ידי AI, בקומיטים של PR, בכותרת או בגוף — כלל קשיח #16 (בלולאת ה-fast-gates של `quality.yml` עבור PR→`release/**` — קורא את ה-event payload, לא פועל מחוץ ל-PR — וגם שלב ייעודי ל-PR בלבד ב-lint של `ci.yml` עבור PR→`main`; וגם ההוק `commit-msg` של husky; שותפי-כתיבה אנושיים מותרים; #14436)                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | כל החרגה של Vitest מציינת issue למעקב ומופיעה ב-`config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | כן                                    |
| `check:file-size`                 | קבצי מקור (`.ts`/`.tsx` בתוך `src/`, `open-sse/`, `electron/`, `bin/`) נשארים בגבול `cap`, וקבצי בדיקות (`*.test.ts(x)`) בגבול `testCap`; קבצים הקפואים ב-`file-size-baseline.json` (`frozen` / `testFrozen`) אסור שיגדלו מעבר לגודל המתועד שלהם                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | כן                                    |
| `check:error-helper`              | תגובות שגיאה ב-executors/handlers משתמשות ב-`buildErrorBody()` / `sanitizeErrorMessage()` (כלל קשיח #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | כן                                    |
| `check:migration-numbering`       | קבצי SQL של מיגרציות ממוספרים ברצף, ללא פערים או כפילויות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | כן                                    |
| `check:public-creds`              | אין `client_id`/`client_secret` מפורשים של OAuth או מפתחות Firebase Web מחוץ ל-`publicCreds.ts` (כלל קשיח #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | כן                                    |
| `check:db-rules`                  | אין SQL גולמי מחוץ למודולים תחת `src/lib/db/`; אין barrel-imports מ-`localDb.ts` (כללים קשיחים #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | כן                                    |
| `check:known-symbols`             | executors של ספקים, אסטרטגיות ניתוב ומתרגמים (translators) הרשומים בטבלאות ה-dispatch שלהם תואמים לקבצים על הדיסק — אין סמלים יתומים או לא מוצהרים                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | כן                                    |
| `check:route-guard-membership`    | כל route שמפעיל child process מסווג על ידי `isLocalOnlyPath()` (כללים קשיחים #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | כן                                    |
| `check:test-discovery`            | כל קובץ `*.test.ts` / `*.spec.ts` במאגר נאסף על ידי רץ בדיקות אחד לפחות (מנגנון ratchet: רשימת היתומים ב-`test-discovery-baseline.json` יכולה רק לקטון)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | כן                                    |
| `check:agent-skills-sync`         | ארטיפקטים מופקים של agent-skills תואמים לקטלוג המקור שלהם (ללא סטייה)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | לוגואים/נכסים של ספקים נושאים רשומת מקור (provenance) מתועדת                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `lint:json`                       | קובצי תצורה של JSON מפוענחים כראוי ועומדים בכללי ה-lint של המאגר                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | הידור TypeScript ללא שגיאות (אזהרות מייעצות בלבד)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כן                                    |
| `typecheck:noimplicit:core`       | `noImplicitAny` מחמיר — מכוון לעתיד; נקודות קריאה רבות קיימות עדיין זקוקות לאנוטציות טיפוסים                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **מייעץ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` מצומצם לטווח `src/app/(dashboard)/**` (#7033) — רשימת ההיתרים הנבחרת בת 27 הקבצים של `typecheck:core` אינה כוללת אף קובץ TSX של הדשבורד, וגם `next build` לעולם אינו מבצע עליו בדיקת טיפוסים (`next.config.mjs` מגדיר `ignoreBuildErrors: true`), כך שרגרסיות של מזהים יתומים שם (#6625/#6909) לא היו נראות ל-CI. הבדיקה מבצעת diff מול בסיס מוקפא של ספירת שגיאות לפי קובץ/לפי קוד TS (`config/quality/dashboard-typecheck-baseline.json`, אותו דפוס אכיפת-בסיס-ישן כמו ב-`check:known-symbols`) — רק שגיאות חדשות מעבר לספירה שבבסיס מפילות את השער; יש להוריד את המחגר עם `--update` כאשר מתקנים שגיאה קיימת מראש.                                                                                                                                                | כן                                    |

### משימה: `quality-gate`

רץ אחרי `test-coverage`. חוסם מיזוג במקרה של כישלון.

| סקריפט                       | מאמת                                                                                                                                          | חוסם                      |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | מפיק את `quality-metrics.json` (ספירת אזהרות ESLint, כיסוי מדוח ה-shard הממוזג)                                                               | כן (מעלה הזרם מה-ratchet) |
| `quality:ratchet`            | כל מדד ב-`quality-baseline.json` לא נסוג לאחור (אזהרות ESLint ≤ baseline; כיסוי ≥ baseline)                                                   | כן                        |
| `check:duplication`          | שכפול קוד (jscpd@4) אינו חורג מה-baseline ב-`quality-baseline.json`                                                                           | כן                        |
| `check:complexity`           | מורכבות ציקלומטית ברמת הקובץ אינה חורגת מהתקרה (`complexity` של ליבת ESLint + `max-lines-per-function`)                                       | כן                        |
| `check:cognitive-complexity` | ratchet של מורכבות קוגניטיבית (`eslint-plugin-sonarjs`) — מעבר ESLint נפרד; CI מריץ את שניהם ממוזגים כצעד `check:complexity-ratchets` היחיד   | כן                        |
| `check:dead-code`            | ratchet של exports / קבצים שאינם בשימוש (knip) אינו נסוג לאחור מול ה-baseline                                                                 | כן                        |
| `check:compression-budget`   | תקציב בנצ'מרק הדחיסה — רצפות החיסכון בטוקנים לכל מנוע אינן רשאיות לסגת לאחור                                                                  | כן                        |
| `check:type-coverage`        | ratchet של אחוז הטיפוסים (`type-coverage`) אינו נסוג לאחור; במידה רבה מכיל את `typecheck:noimplicit:core`                                     | כן                        |
| `check:codeql-ratchet`       | ספירת התראות CodeQL הפתוחות אינה נסוגה לאחור (קורא דרך `gh api`; דילוג חינני ללא טוקן) — תדירות רענון והפעלה ידנית: ראה "CodeQL ratchet" למטה | כן                        |

### משימה: `quality-extended`

המשימה כולה היא מייעצת (`continue-on-error: true`). ה-ratchets מבוססי ה-npm רצים
באמת; הסורקים החיצוניים מותקנים דרך `gh release download` ומדלגים על עצמם (exit 0)
כאשר הבינארי עדיין חסר.

| סקריפט                   | מאמת                                                                                                                                                                                         | חוסם                                      |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:circular-deps`    | אין תלויות מעגליות (dpdm)                                                                                                                                                                    | **מייעץ**                                 |
| `check:bundle-size`      | גודל הבנדל אינו חורג מהתקרה                                                                                                                                                                  | **מייעץ**                                 |
| `check:secrets`          | סריקת סודות (gitleaks) — מדלג אם הבינארי חסר                                                                                                                                                 | **מייעץ**                                 |
| `check:vuln-ratchet`     | פגיעויות בתלויות (osv-scanner) אינן נסוגות לאחור — מדלג אם הבינארי חסר                                                                                                                       | **מייעץ**                                 |
| `check:workflows`        | lint של workflows (actionlint + zizmor); סורקים חסרים/שבורים, דוחות לא תקינים או ratchet baseline חסר נכשלים כ-INCOMPLETE. ממצאים תקפים מתנהלים לפי מדיניות ה-strict/advisory/ratchet הנבחרת | נדרשת הרצה; ה-ratchet של zizmor חוסם ב-CI |
| `check:openapi-breaking` | שינויים שוברים בחוזה ה-API הציבורי (`openapi.yaml`) מול ענף הבסיס (oasdiff) — מפיק `openapiBreaking=N`; מדלג אם oasdiff חסר או שה-spec הבסיסי אינו ניתן לזיהוי                               | **מייעץ**                                 |

### משימה: `docs-sync-strict`

רץ בכל PR אל `main`. חוסם מיזוג במקרה של כישלון.

| סקריפט                         | מאמת                                                                                                                                         | חוסם                         |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | שער-על (meta-gate) שמריץ את 6 תתי-השערים שלמטה ברצף                                                                                          | כן                           |
| ↳ `check:docs-sync`            | עקביות גרסאות בין CHANGELOG / OpenAPI / llm.txt                                                                                              | כן                           |
| ↳ `check:docs-counts`          | מספרים בפרוזה (מספר ספקים, מספר מיגרציות וכו') נמצאים בתוך חלון ה-ratchet של המספרים האמיתיים                                                | כן                           |
| ↳ `check:env-doc-sync`         | כל משתנה סביבה ב-`.env.example` מתועד בטבלת תיעוד, ולהיפך                                                                                    | כן                           |
| ↳ `check:deprecated-versions`  | אין מחרוזות גרסה מיושנות בתיעוד                                                                                                              | כן                           |
| ↳ `check:doc-links`            | קישורי markdown פנימיים בתיעוד מצביעים על קבצים אמיתיים (בצורת `[text]`/`(path)`)                                                            | כן                           |
| ↳ `check:fabricated-docs`      | נתיבים (routes), משתני סביבה, פקודות CLI, שמות hooks ונתיבי קבצים המצוטטים בתיעוד קיימים בקוד. שער קשיח באמצעות `--strict`; כשל רך ללא הדגל. | כן (באמצעות `--strict` ב-CI) |
| `check:cli-i18n`               | מחרוזות פקודות CLI נמצאות בכל קובצי ה-locale של ה-i18n                                                                                       | כן                           |
| `check:openapi-coverage`       | מפרט OpenAPI מכסה לפחות רף מינימלי מסוג ratchet של נתיבים אמיתיים                                                                            | כן                           |
| `check:openapi-security-tiers` | הערות דרגות האבטחה ב-`openapi.yaml` עקביות עם הסיווגים ב-`routeGuard.ts`                                                                     | **מייעץ**                    |
| `check:openapi-routes`         | כל path ב-`openapi.yaml` מצביע על `route.ts` אמיתי (אנטי-הלוסינציה)                                                                          | כן                           |
| `check:docs-symbols`           | כל הפניה ל-`/api/...` ב-`docs/**/*.md` מצביעה על `route.ts` אמיתי (אנטי-הלוסינציה)                                                           | כן                           |
| `i18n translation drift`       | מפתחות לא מתורגמים בקובצי ה-locale של ה-i18n — אזהרה בלבד                                                                                    | **מייעץ**                    |

### משימה: `i18n-ui-coverage`

| סקריפט                            | מאמת                                                                                                                                                               | חוסם      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `check-ui-keys-coverage` (inline) | כיסוי מפתחות ה-i18n של ממשק המשתמש הוא ≥ 65%                                                                                                                       | כן        |
| `check-ui-value-drift` (inline)   | **ערך** אנגלי שנכתב מחדש אינו משאיר מאחוריו תרגום מיושן                                                                                                            | כן        |
| `check-new-key-coverage` (inline) | מפתח אנגלי **חדש** מתורגם בכל locale — סמן `__MISSING__:` נדחה                                                                                                     | כן        |
| `check-translation-ratio`         | יחס התרגומים האמיתיים לכל locale (עלים הזהים לאנגלית / placeholder / חסרים מחוץ לרשימת ההיתרים) לא יעלה על `config/quality/i18n-translation-baseline.json` + מרווח | **מייעץ** |

דורש `fetch-depth: 0` — שער הסטייה בערכים (value-drift) מבצע diff של `en.json` מול ה-merge base.

#### `check-ui-value-drift` — שער תרגומים מיושנים

תופס את רגרסיית ה-i18n האחת ששאר השערים, מבחינה מבנית, אינם יכולים לראות: ערך אנגלי
נכתב מחדש, והתרגומים שנגזרו מהאנגלית _הקודמת_ נשארים מאחור, כך שמשתמשים שאינם דוברי
אנגלית ממשיכים לקרוא טקסט שנוסח בביטחון אך כעת שגוי.

זה קרה בפועל. `oauthModal.googleOAuthWarning` נכתב מחדש כשכלי העזר להתחברות של Antigravity
שולב (#5203); **39 מתוך 43 ה-locales** שמרו על טקסט שמורה למפעילים "copy the
full URL and paste it below" — זרימה שלא יכולה להסתיים עבור ספק זה. זה לא זוהה
עד #8463 כי:

- `sync-ui-keys` משלים רק מפתחות **חסרים**, לעולם לא כאלה **מיושנים**;
- `check-ui-keys-coverage` סופר _נוכחות_ של מפתחות, ולכן תרגום מיושן נספר כמכוסה;
- `check-translation-drift` עוקב אחר מראות התיעוד `docs/i18n/<locale>/**.md` —
  הוא אף פעם לא קורא את `src/i18n/messages/*.json`. חוסם במשימת `docs-sync-strict` מאז
  הסנכרון מחדש של 2026-09: עורכים מסמך ליבה → `npm run i18n:run -- --files=<doc>` (ברמת סעיף, זול).

**מודע ל-diff, לא מגובה קו בסיס.** הוא משווה את `en.json` ב-merge base מול עץ העבודה; לכל מפתח שהערך האנגלי שלו השתנה, כל locale שעדיין מחזיק תרגום שלא נגעו בו נחשב מיושן. זה **מקפיא בכוונה חוב קיים מראש** — diff לא יכול לחשוף מאיזו אנגלית ישנה נגזר תרגום ותיק, ולכן השער שופט רק את מה שהשינוי הנוכחי נוגע בו. האלטרנטיבה (קו בסיס של hash לכל מפתח) הייתה עולה קובץ מחולל של ~600 KB, פי 3 מקו הבסיס הגדול ביותר הקיים, ומשתנה בכל PR של i18n.

שתי דרכים לספק אותו:

1. לעדכן את התרגומים המושפעים, או
2. להגדיר אותם ל-`__MISSING__:<new english>` — ה-runtime משרת אז את האנגלית המתוקנת
   (`src/i18n/request.ts::deepMergeFallback`, #7258) והמפתח נכנס לתור לתרגום.

אם **המשמעות** של המחרוזת השתנתה, עדיף **לשנות את שם המפתח**: מפתח חדש לא יכול לרשת
תרגום מיושן. זה הדפוס שבו #8463 השתמש.

```bash
npm run i18n:check-value-drift          # מחמיר (מה ש-CI מריץ)
npm run i18n:check-value-drift:warn     # דיווח בלבד
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

יוצא עם 0 ועם `SKIP reason=base-unresolved` כאשר לא ניתן לקרוא את קטלוג הבסיס (shallow
clone ללא ה-base ref), בדומה ל-`check-openapi-breaking`.

### משימה: `i18n`

מטריצת ולידציית i18n מלאה (משימה אחת לכל locale). כל המשימה היא ייעוצית.

| סקריפט                          | מאמת                   | חוסם                                                |
| ------------------------------- | ---------------------- | --------------------------------------------------- |
| `validate_translation.py quick` | שלמות תרגום לכל locale | **ייעוצי** (`continue-on-error: true` על כל המשימה) |

### משימה: `pr-test-policy`

רץ על pull requests בלבד.

| סקריפט                 | מאמת                                                                                                            | חוסם |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- | ---- |
| `check:pr-test-policy` | PRs שמשנים קוד פרודקשן ב-`src/`, `open-sse/`, `electron/`, או `bin/` חייבים לכלול או לעדכן בדיקות (כלל קשיח #8) | כן   |
| `check:test-masking`   | קבצי בדיקות שהשתנו אינם מפחיתים את ספירת ה-asserts נטו ואינם מוסיפים טאוטולוגיות `assert.ok(true)`              | כן   |
| `check:pr-evidence`    | גוף ה-PR מצטט ראיות מבדיקות/VPS לשינוי (ממכן את כלל קשיח #18 על ידי grepping של פרוזת ה-PR — שביר, ראה Backlog) | כן   |

### משימה: `test-vitest`

רץ אחרי `build`. חוסם merge בכשלון.

| סוויטה           | מאמת                                             | חוסם                                                                                          |
| ---------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `test:vitest`    | שרת MCP (110 כלים), autoCombo, cache — רץ vitest | כן                                                                                            |
| `test:vitest:ui` | בדיקות רכיבי UI — רץ vitest                      | **חוסם** — כשלונות קיימים מוחרגים במפורש ב-`vitest.config.ts`; כשלונות חדשים מפילים את המשימה |

### תהליכי עבודה ליליים (מתוזמנים, ייעוציים)

אלה רצים על לוח זמנים של cron (ו-`workflow_dispatch`), אף פעם לא על PRs. כולם ייעוציים.

| תהליך עבודה            | מאמת                                                                                                                                       | חוסם       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `nightly-property`     | בדיקות property של fast-check עם seed אקראי + מספר ריצות גבוה                                                                              | **ייעוצי** |
| `nightly-resilience`   | שער heap-growth, הזרקת תקלות chaos, עומס/soak של k6                                                                                        | **ייעוצי** |
| `nightly-llm-security` | שומר הזרקה של promptfoo (מצב חסימה) + בדיקות garak (מדולג ללא סוד ספק)                                                                     | **ייעוצי** |
| `nightly-schemathesis` | fuzzing של חוזה OpenAPI (schemathesis) מול OmniRoute חי באמצעות `docs/openapi.yaml` — חושף הפרות spec / שגיאות 500 לא מטופלות (Fase 8 B.4) | **ייעוצי** |
| `nightly-mutation`     | ציון mutation-testing של Stryker על נתיב הבדיקות המהיר — מוטנטים שורדים חושפים asserts חלשים                                               | **ייעוצי** |
| `nightly-compat`       | מטריצת תאימות מנוע Node על פני טווחי `engines.node` הנתמכים                                                                                | **ייעוצי** |

קווי בסיס לביצועים (heap, TTFB, זמן build) נרשמים, לא נבדקים בשער: ראה [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
