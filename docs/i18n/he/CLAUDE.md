# CLAUDE.md (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**כל חוקי הפרויקט חיים ב- [`AGENTS.md`](AGENTS.md)** — המקור היחיד של האמת עבור כל עוזר AI ; הייבוא למעלה כבר טוען אותו. אל תוסיף שוב את כללי הפרויקט כאן. כל מה להלן חל על ONLY — Claude תפעוליים של כללים שכבר הוגדרו ב- `AGENTS.md`.

## בידוד עצי עבודה — Claude קוד ספציפי

- אשר את הסניף הבסיסי עם המפעיל באמצעות `AskUserQuestion` (חוק קשה #19) אלא אם הם כבר אמרו לך.
- צור את עץ העבודה עם `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (הוא נוחת תחת `.claude/worktrees/`, מקשרים קשיחים `node_modules` ומעתיקים `.husky/_`), ואז קרא `EnterWorktree` עם `path` שלו. תמיד עוברים את הבסיס: בלעדיו הסקריפט בוחר את ה- `release/*` הגבוה ביותר, שאולי לא זה שהמפעיל אישר. לעץ עבודה ש- `EnterWorktree` יוצר מעצמו אין לא את הקישורים הקשיחים ולא את הווים, כך ששום שער מראש לא פועל בו.

## סוכני משנה ו-git

כל סוכן משנה שנוגע ב-git (כלי סוכן או סקריפט של זרימת עבודה) מקבל את `git stash` ban של Hard Rule #22 a מילה במילה בהנחיית — הישנות המתועדת של תקרית ה-stash הגיעה דרך סוכן משנה.

## חפצי תכנון — מעצמות העל נתיב עוקף

כישורי מעצמות העל מכריזים על ברירת מחדל תחת `docs/superpowers/plans/`, `docs/superpowers/specs/` ו- `docs/research/`. כתוב מחדש כל אחד למקבילה שלו ב- `_tasks/` ב- `AGENTS.md` → "Artifacts Planning & Research" לפני הכתיבה, ובצע אותו עם `git -C _tasks …`, לעולם לא ב-repo הראשי.

## קבצי שריטה — `_artifacts/`, לא `/tmp`

פרויקט זה עוקף את לוח הגירוד של הרתמה (`/tmp/claude-*/…`). כתוב קבצים זמניים יצוא —, zips שנוצר, פלטי ביניים חד פעמיים — to `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: נתיב שורש `_*` עם gitignored, כך שהמפעיל מוצא ומוחק את כל ה-sratch במקום אחד. תכניות עמידות, מפרטים, מחקרים ומסירות עוברים ל- `_tasks/` במקום זאת (Hard Rule #23).

## בסיס אדום

כדי לנקז מצב אדום מצטבר (קצה הבסיס + red PRs), השתמש במיומנות `/sweep-reds`.
