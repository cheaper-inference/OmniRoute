# Release-Green: candidate validation and evidence (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green צופה בהתחייבות ספציפית ומדווח על תוצאות האימות שלה. [ההפניה לשערי איכות](../architecture/QUALITY_GATES.md) מגדירה את פרופילי ה- CI הנוכחיים, הבדיקות הנדרשות ומדיניות הקבלה. מדיניות הקבלה המנוסחת ב- `config/quality/admission-policy.json` היא החוזה הניתן לביצוע עבור `Gate / CI` ו- `Gate / Quality`.

## CI והיקף משקיף

`ci.yml` ו- `quality.yml` מכסים בקשות למשוך לסניפים ראשיים ושחרורים. הפרופיל הנבחר קובע אילו משרות חלות. CI מלא כולל גם נתיבים שבקשת משיכה רגילה לא מבצעת. תוצאת צופה מהירה אינה יכולה להחליף את המשימות הללו, ועטיפה שהושלמה של זרימת עבודה אינה יכולה להחליף את הקבלות שלה.

בניית הייצור שייכת ל- CI. אין בניית ייעוץ כפול ב- `quality.yml`. חפצים חסרים, עבודה שבוטלה ומדידות לא שלמות אינם מבססים בדיקה נדרשת מוצלחת. אשר את הבסיס הנוכחי, הראש והמועמד המשולב לפני קבלת התוצאות.

## אימות מקומי

הפעל את הצופה בעץ עבודה בבעלות לאחר הכנת התלות שלו. עקוב אחר פרוטוקול עץ העבודה והמשאבים ב- `docs/ops/WORKTREE_ISOLATION.md` לפני אימות כבד.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

הפרופיל המהיר הוא חלקי. הפרופיל המלא בודק את דרישות המודל שלו ושומר על קבלות פקודות; היא אינה מאשרת פריסה או תחליף לבדיקות מתארחות רלוונטיות. הדוח מבחין בין כשל בביצוע לבין סחיפה מדדית. המחגרות הנדרשות נשארות חסומות בהתאם למדיניות שנבחרה. אין להעלות קו בסיס רק כדי להשיג תוצאה חולפת.

## ניקוי לילה וידני

פותרי השחרור וההתאמה הליליים בוחרים בענף שחרור קנוני. הבחירה הזו חייבת להתאים לסניף שהפעיל את זרימת העבודה, והסוויטות משתמשות SHA הבלתי משתנה של האירוע. לביצוע ידני, בחר את המהדורה המיועדת ב- `release_branch` ושלח על אותו ref:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

שיגור חוצה סניפים נדחה לפני ביצוע הקוד שנבחר. סוויטות ראשיות מתארחות בודקים `main` ומוודאים שה- SHA שלה עדיין תואם את היעד שנפתר לפני ההתקנה. אם המהלכים העיקריים במהלך הרזולוציה, הפעל מחדש את הסוויפ הלא שלם ב-commit החדש. אין לשלב קבלות על סוויטות ממועמדים שונים.

## מבחן כישלון והתאוששות

השתמש בתקרית כאינדקס אבחון, ולאחר מכן בדוק את הריצה המדויקת, הניסיון, הצעד הכושל והחפץ. השווה ראיות בסיס ומועמדות מקבילות לפני ייחוס כישלון לתורם. שגיאות תשתית, פגמים בירושה, רגרסיות מועמדים ואישורים ממתינים דורשים תרופות שונות.

מיומנויות ה- `/green-prs`, `/sweep-reds`, `/validate-release-green` ו- `/babysit` אוספות ראיות ומכינות תיקונים בהיקף המתועד שלהן. שמור על אשראי תורם, השתמש בסניפי תיקון מבודדים, ואמת את כל הבדיקות הנדרשות לפני מיזוג מורשה. אין קו בסיס אוטומטי או סגירת תקרית תחליף למועמד הנוכחי שעובר.
