# Merge Queue & Manual Merge-Train Runbook (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## נחיתה על ענף שחרור

תור הכל שולט בנחיתות לתוך `release/vX.Y.Z`. קרא את ה- `mode` ברמה העליונה ב- `config/merge-queue/config.json` בענף ברירת המחדל לפני הנחיתה של PR. ראה [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** מפעיל אימות ומשאיר את הנחיתה למיזוג ידני. החל `omni-queue` על PR המאושר בראשו הסופי. בדוק זכאות עם `npm run queue -- why <PR>`. חכה לפסק הדין של אותו ראש `npm run queue -- history --base <branch>`. המשך ב- `would-land`. ב- `culprit-found` או `would-dequeue`, החזק את המיזוג ותקן את הסיבה.
- **חריגים בצל.** רכבת עם CI מלאה ירוקה כנגד קצה הבסיס הנוכחי יכולה להמשיך ללא פסק דין נפרד בתור. אותו חריג חל כאשר ראש PR כבר מכיל את קצה הבסיס הנוכחי.
- **`live`** משתמש בתווית `omni-queue` כדי להפעיל נחיתה. התור לבדו מנחית את ה- PR. השאר פקודות מיזוג ודחיפות ישירות לתור.

כל נחיתה מחייבת את אישור הבעלים ואת ההמחאות הנדרשות הרלוונטיות. החל `omni-queue` רק לאחר שהבעלים אישר נחיתה. PRs בתור נגיעה בשבילים מוגנים דורשים גם את החלטת `protected-approved` של הבעלים עבור אותו PR.

ערכת הכללים של "דרוש שערים ירוקים בשחרור הפעיל" דורשת `Gate / CI` ירוקה ו- `Gate / Quality` על הראש. לעולם אל תשתמש `--admin` כדי לעקוף שער אדום. בלוקים להקפאת שחרור מתמזגים לענף הקפוא. ראה [כלל קשיח 21](HARD_RULES_DETAIL.md). לעולם אל תתייג, תמזג או תדחף לבקשת משיכה שהפעלה אחרת פועלת. ראה [כלל קשיח 22](HARD_RULES_DETAIL.md).

## הבקשה למשיכת רכבת

1. התחל סניף רכבת בקצה בסיס השחרור הנוכחי. שלב את ראשי החברים המאושרים המדויקים באמצעות התחייבויות מיזוג. שמרו על היסטוריית המחויבות שלהם על ידי הימנעות מסקווש ו-rebase.
2. פתח בקשת משיכה אחת לסניף הרכבת. אמת את PR עם CI המלא שלו בקצה הבסיס הנוכחי. בדוק שוב את קצה הבסיס ואת ראשי האיברים המאושרים לפני הנחיתה. רענן את הרכבת וה- CI שלה כאשר המועמד המאושר משתנה.
3. נחת את הרכבת PR עם מיזוג commit במצב התור הרלוונטי. במצב חי, שיטת הנחיתה של ה- `merge-ff` של התור משמרת את התחייבויות המיזוג. ניתן להגיע אל ראשי החברים המקוריים מסניף השחרור. GitHub מסמן את החבר PRs כמיזוג וההתחייבויות שומרות על המחברים שלהן.

דוגמה ציבורית היא [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). הוא שילב 18 חברים PRs ונחת עם התחייבות למיזוג ב-2026-11-24.

סנכרון חזרה מ- `main` לסניף השחרור הבא נוחת גם דרך מיזוג. שמירה על אבות `main` נדרשת לסינכרון חוזר מאוחר יותר. ראה [Worktree Isolation](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## אימות הרכבת המיזוג המקומי

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

המאמת מביא את ראשי הבסיס PR ומשלב אותם בעץ עבודה חד פעמי. הוא מריץ את חבילת הזוגיות שלו פעם אחת על העץ שנוצר. התנגשות של אחזור או מיזוג ראש נכשלה מוציאה את ה- PR והסקריפט ממשיך עם ה- PRs הנותר.

- **`--plan`** מדפיס את השלבים של המצב שנבחר ויוצא מבלי ליצור עץ עבודה או ליצור קשר עם השלט. שלב אותו עם `--fast` כדי לבדוק את התוכנית המהירה.
- **`--fast`** מריץ את השערים הסטטיים הנפוצים, קבצי ה- `node:test` שנבחרו תחת `tests/unit/` ו- `npm run test:vitest`. הפעל אימות מקומי מלא לפחות פעם ביום על הטיפ המצטבר בעת שימוש במצב מהיר.
- **מצב מלא** מוסיף את השערים הסטטיים המלאים בלבד ומפעיל `npm run test:unit` ו- `npm run test:vitest`.

שער סטטי כושל מופעל מחדש על הבסיס הבלתי נגוע אם בדיקה הבסיסית זמינה. התסריט מדווח על כשלים שעברו בירושה וממשיך כאשר כל שורת הפרה מזוהה מופיעה גם בבסיס והספירה הכוללת לא גדלה.

| יְצִיאָה | מַשְׁמָעוּת                                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| `0`      | הדפיס את התוכנית או השלים את הסוויטה. סיכום החבילה מפרט את כל הכשלים הסטטיים שעברו בירושה ו- PRs שנפלט.         |
| `1`      | ארגומנטים לא חוקיים, ללא קופה של Git, טיסה מוקדמת שנכשלה, או ללא PR.                                            |
| `2`      | בדיקת חבילה נכשלה ולא הייתה כשירה בתור בירושה. המפעיל יכול לחתוך את האצווה, להוציא את ה- PR הפוגע ולהפעיל מחדש. |

כרטיס אישור מקומי מספק ראיות אבחון לתיק של הבעלים בלבד. כל נחיתה עדיין דורשת הרשאת בעלים, בדיקות נדרשות משלה, ופסק הדין בתור הצל כאשר רלוונטי.

## דרגות

- **לכל PR.** בדיקות CI ו- Quality Select בהתבסס על הנתיבים שהשתנו. Code PRs מפעיל שערים באיכות מהירה ובדיקות מושפעות, עם עבודות יחידות נפרדות ו- Vitest ב- CI.
- **לכל מועמד בתור.** CI ו-Quality מריצים את הפרופיל המלא עבור המועמד המורכב על השופט בתור שלו.
- **לכל טיפ לשחרור.** Release-Green מפעיל שערים קשיחים מהירים בדחיפות התואמות את מסנני הנתיבים שלו. שלוש ריצות מתוכננות ליום משתמשות בסוויפ המלא עבור סניף השחרור.
- **לכל שחרור.** מטריצת CI המלאה כוללת רסיסי E2E, אימות חבילה, עשן מגף tarball ובדיקות כיסוי. עיין [ברשימת השחרורים](RELEASE_CHECKLIST.md).

## תנאים מוקדמים לקופה טרייה עבור `merge-train.sh`

הטיסה המוקדמת פועלת לפני יצירת עצי עבודה. התקן תלות עם `npm ci`. אשר ש- `node_modules/.bin/tsc` הוא בר הפעלה וש- `node_modules/node_modules` נעדר. תבדוק ש `node_modules/.bin/bun --version` מצליח.

אם דילגה על ההתקנה של Bun, הפעל `(cd node_modules/bun && node install.js)`. עקביות הספק ובדיקות סמל ידוע משתמשות Bun. האימות מריץ `npm run check:cycles:ratchet` כשער חוסם. הפקודה `npm run check:cycles` העצמאית היא מייעצת.

## הִיסטוֹרִיָה

תור המיזוג של Mergify הופסק ב-2026-11-19.
