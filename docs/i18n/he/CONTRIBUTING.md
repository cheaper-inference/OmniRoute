# Contributing to OmniRoute (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## הגדרת סביבת פיתוח

### דרישות מוקדמות

- **Node.js** `>=22.22.2 <23`, או `>=24.0.0 <27` (מומלץ: 24 LTS)
- **npm** 10+

> **Windows עם Node 24:** השתמשו בגרסת התיקון הנוכחית של 24 LTS (לפחות 24.20.0).
> גרסאות קודמות עלולות להפסיק לאחר בדיקות שהסתיימו בהצלחה, כאשר `--test-force-exit` סוגר את
> התהליך. [התיקון של libuv ל-Windows](https://github.com/nodejs/node/pull/61999) של Node מטפל
> בקריסת זמן הריצה הזו; השאירו את טענות הבדיקה ובדיקות היציאה של המריץ מופעלות.

> **משתמשי npm v11+ (Node 24+):** לאחר `npm install`, ודאו שמודולים מקומיים הותקנו:
> `node -e "require('better-sqlite3')"`. אם הפעולה נכשלת עם `MODULE_NOT_FOUND`,
> הריצו `npm approve-scripts better-sqlite3 && npm install`. ראו
> [פתרון בעיות](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### שכפול והתקנה

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### משתני סביבה

```bash
# צרו את .env שלכם מתבנית
cp .env.example .env

# צרו סודות נדרשים
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

משתנים מרכזיים לפיתוח:

| משתנה                  | ברירת מחדל בפיתוח        | תיאור                  |
| ---------------------- | ------------------------ | ---------------------- |
| `PORT`                 | `20128`                  | יציאת השרת             |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | כתובת URL בסיסית לחזית |
| `JWT_SECRET`           | (נוצר לעיל)              | סוד חתימת JWT          |
| `INITIAL_PASSWORD`     | `CHANGEME`               | סיסמת ההתחברות הראשונה |
| `APP_LOG_LEVEL`        | `info`                   | רמת פירוט יומן         |

### הגדרות לוח המחוונים

לוח המחוונים מספק מתגים בממשק המשתמש עבור תכונות שניתן להגדיר גם באמצעות משתני סביבה:

| מיקום ההגדרה        | מתג                | תיאור                               |
| ------------------- | ------------------ | ----------------------------------- |
| Settings → Advanced | Debug Mode         | הפעלת יומני בקשות לניפוי באגים (UI) |
| Settings → General  | Sidebar Visibility | הצגה/הסתרה של מקטעי סרגל הצד        |

הגדרות אלה מאוחסנות במסד הנתונים ונשמרות לאחר הפעלות מחדש, תוך עקיפת ברירות המחדל של משתני הסביבה כאשר הן מוגדרות.

### הפעלה מקומית

```bash
# מצב פיתוח (טעינה מחדש אוטומטית)
npm run dev

# בניית ייצור
npm run build    # next build → .build/next/ ולאחר מכן assembleStandalone → dist/

npm run start

# הידור מהיר של ה-backend/API בלבד לשינויים של תורמים
npm run build:contributor

# בניית גרסה (בנייה מחדש נקייה + סמן HEAD — נדרש לפריסה)
npm run build:release   # rm -rf .build dist ולאחר מכן build + כתיבת dist/BUILD_SHA

# הגדרת יציאה נפוצה
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

בניית התורמים מבצעת אימות הכולל הידור בלבד: היא אינה מרכיבה את ההפצה העצמאית
ואינה בונה נכסי אריזה מקומיים אופציונליים. השתמשו בבניית הייצור הרגילה כאשר
עליכם לאמת את החבילה המוכנה להפצה.

### מבנה פלט הבנייה

| ספרייה    | תוכן                                                                     | במעקב |
| --------- | ------------------------------------------------------------------------ | ----- |
| `src/`    | קוד המקור של היישום (TypeScript / TSX)                                   | כן    |
| `.build/` | קבצים זמניים — פלט `next build` (מתעלמים ב-git, `distDir = .build/next`) | לא    |
| `dist/`   | חבילה מוכנה להפצה — מורכבת באמצעות `assembleStandalone` (מתעלמים ב-git)  | לא    |

צינור הבנייה הוא מעבר יחיד:

```
npm run build
  └─ next build → .build/next/standalone  (פלט Next.js)
  └─ assembleStandalone()                 (העתקת standalone + static + public + נכסים מקומיים)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` מנקה בנוסף את שתי הספריות תחילה וכותב
את `dist/BUILD_SHA` (= `git rev-parse --short HEAD`) כסמן לשלמות הפריסה.

`npm run build:contributor` משתמש בפרופיל בנייה של backend בלבד. הוא מחליף זמנית קובצי
ממשק משתמש של לוח המחוונים בקבצי דמה במהלך הבנייה, שומר על מנהלי נתיבי API,
ומשחזר את הקבצים המקוריים לאחר הבנייה. השתמשו ב-`npm run build` עבור שינויים
המשפיעים על ממשק המשתמש של לוח המחוונים או לצורך אימות מלא של גרסה; פרופיל התורמים
אינו תחליף לבניית הגרסה.

> **הערת פריסה ל-VPS:** ספריית התמונות המרוחקת `/usr/lib/node_modules/omniroute/app/`
> אינה משתנה. כישורי הפריסה מסנכרנים באמצעות rsync את התוכן של `dist/` לתוכה.
> רק נתיב פלט הבנייה בתוך המאגר השתנה (`app/` → `dist/`).

כתובות URL ברירת מחדל:

- **לוח המחוונים**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## תהליך עבודה עם Git

> ⚠️ **לעולם אין לבצע commit ישירות אל `main`.** יש להשתמש תמיד בענפי פיתוח.
>
> **בסיס ה-PR:** יש לבחור כיעד את הענף הפעיל `release/vX.Y.Z` (ולא את `main`). ראו
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) למידע על
> המודל של גרסה לכל ענף + תג בעת ההפצה.

```bash
# יצירת ענף מקצה הגרסה הפעילה (לדוגמה: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... ביצוע שינויים ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# פתיחת Pull Request עם base = release/v3.8.49
```

### מתן שמות לענפים

| קידומת      | מטרה                     |
| ----------- | ------------------------ |
| `feat/`     | תכונות חדשות             |
| `fix/`      | תיקוני באגים             |
| `refactor/` | ארגון מחדש של הקוד       |
| `docs/`     | שינויים בתיעוד           |
| `test/`     | הוספות/תיקונים של בדיקות |
| `chore/`    | כלי פיתוח, CI, תלויות    |

### הודעות Commit

יש לפעול לפי [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

תחומים (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## הרצת בדיקות

```bash
# כל הבדיקות (יחידה + vitest + אקוסיסטם + e2e)
npm run test:all

# קובץ בדיקה יחיד (מריץ הבדיקות המובנה של Node.js — רוב הבדיקות משתמשות בו)
node --import tsx/esm --test tests/unit/your-file.test.ts

# רק בדיקות היחידה המושפעות מהשינוי שלכם (אותו בורר TIA כמו בשער ה-CI, #8084)
npm run test:scoped            # שינויים ב-commit האחרון (או בעץ העבודה)
npm run test:scoped:staged     # שינויים שנוספו ל-staging בלבד — משתלב היטב בהרצה לפני commit
npm run test:scoped:full       # בנייה מחדש של מפת גרף הייבוא תחילה (לאחר הוספה/העברה של קבצים)
# קוד יציאה 1 + "הריצו את כל החבילה" פירושם שקובץ מרכזי (tsconfig, package.json, …) או קובץ מקור
# שאינו ממופה השתנה — הבורר נכשל באופן בטוח ולעולם אינו מדלג ללא הודעה.

# Vitest (שרת MCP,‏ autoCombo, מטמון)
npm run test:vitest

# בדיקות E2E (דורשות Playwright)
npm run test:e2e

# בדיקות E2E של לקוחות פרוטוקול (תעבורות MCP,‏ A2A)
npm run test:protocols:e2e

# בדיקות תאימות לאקוסיסטם
npm run test:ecosystem

# שער כיסוי: 60% מההצהרות/שורות/פונקציות/הסתעפויות
npm run test:coverage
npm run coverage:report

# בדיקת lint + עיצוב
npm run lint
npm run check

# בדיקת smoke מוגנת של שילוב מול upstream אמיתי (דורשת גישה ל-VPS + קרדיטים אמיתיים אצל ספקים)
# פונה לספקים אמיתיים — כרוך בעלות קטנה. לעולם אינה רצה ב-CI. מדולגת באופן תקין ללא השער.
# דורש: גישת ssh root@192.168.0.15 (טוען תמונת מצב לקריאה בלבד של מסד הנתונים מה-VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# בדיקת smoke חיה משלב 3 ב-VPS — סקריפטים רגילים של Node ESM, הפונים ישירות לשרת .15 החי.
# דורש: גישת ssh root@192.168.0.15 (צירופים נוצרים ומפורקים באמצעות SSH sqlite).
# פונה לספקים אמיתיים (עלות קטנה). יוצר/מוחק רק צירופי __live_test__*. לעולם אינו רץ ב-CI.
# ב-.15 מוגדר REQUIRE_API_KEY=false, ולכן אין צורך במפתח API, אך נעשה שימוש ב-COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY אם הוגדרו.
npm run test:combo:live:vps              # 7 תרחישי HTTP (עדיפות/סבב/משוקלל/עלות/מיזוג/אוטומטי + תקינות)
npm run test:combo:live:vps:failover     # מוסיף תרחיש מעבר לגיבוי אמיתי בין ספקים (8 בסך הכול)
```

הערות לגבי כיסוי:

- `npm run test:coverage` מודד את כיסוי קוד המקור עבור חבילת בדיקות היחידה הראשית, מחריג את `tests/**` וכולל את `open-sse/**`
- בקשות משיכה חייבות לשמור על שער כיסוי של **60%+** מההצהרות/שורות/פונקציות/הסתעפויות
- אם PR משנה קוד ייצור ב-`src/`,‏ `open-sse/`,‏ `electron/` או `bin/`, עליו להוסיף או לעדכן בדיקות אוטומטיות באותו PR
- `npm run coverage:report` מדפיס דוח מפורט לפי קובץ מהרצת הכיסוי האחרונה
- `npm run test:coverage:legacy` משמר את המדד הישן לצורך השוואה היסטורית
- ראו `docs/ops/COVERAGE_PLAN.md` למפת הדרכים המדורגת לשיפור הכיסוי

### דרישות לבקשת משיכה

לפני פתיחת PR, השתמשו ב-
[נתיב הזהב לתרומה](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) כדי להריץ את הלולאה הממוקדת עבור
מה ששיניתם. חבילת בדיקות היחידה המלאה (4 פלחי CI),‏ Vitest, שער הכיסוי של **60%+**
ובניית הייצור הם באחריות ה-CI — הרצתם באופן מקומי אינה מוסיפה מידע שבדיקות ה-PR
לא יספקו ממילא, ובמחשבים חלשים יותר היא עלולה להעמיס על המארח (#8084):

- הריצו את קובצי הבדיקה המכסים את השינוי שלכם: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- הריצו את `npm run lint`
- הוסיפו או עדכנו בדיקות אוטומטיות באותו PR בכל פעם שקוד הייצור משתנה
- בקובצי `node:test`, מקמו כל `await` ברמה העליונה (כגון `await import(...)`) לפני ה-`test()` / `describe()` הראשון: תחת `--test-force-exit`, בדיקות שנרשמו אחריו עלולות לא לרוץ כלל ללא הודעה (#18045; נאכף באמצעות `npm run check:test-tla-order`)
- כאשר קוד הייצור השתנה, כללו בתיאור ה-PR את קובצי הבדיקה ששונו או נוספו
- בדקו את תוצאת SonarQube ב-PR כאשר סודות הפרויקט מוגדרים ב-CI

מצב הבדיקות הנוכחי: **122 קובצי בדיקות יחידה** המכסים:

- מתרגמי ספקים והמרת פורמטים
- הגבלת קצב, מפסק זרם ועמידות
- מטמון סמנטי, אידמפוטנטיות ומעקב אחר התקדמות
- פעולות מסד נתונים וסכימה (21 מודולי DB)
- תהליכי OAuth ואימות
- אימות נקודות קצה של API ‏(Zod v4)
- כלי שרת MCP ואכיפת תחום הרשאות
- מערכות זיכרון ומיומנויות

---

## סגנון קוד

- **ESLint** — יש להריץ `npm run lint` לפני ביצוע commit
- **Prettier** — העיצוב מתבצע אוטומטית באמצעות `lint-staged` בעת ביצוע commit (2 רווחים, נקודה-פסיק, מירכאות כפולות, רוחב של 100 תווים, פסיקים סופיים בסגנון es5)
- **TypeScript** — כל הקוד תחת `src/` משתמש ב-`.ts`/`.tsx`;‏ `open-sse/` משתמש ב-`.ts`/`.js`; יש לתעד באמצעות TSDoc (`@param`, `@returns`, `@throws`)
- **ללא `eval()`** — ‏ESLint אוכף את `no-eval`,‏ `no-implied-eval`,‏ `no-new-func`
- **אימות באמצעות Zod** — יש להשתמש בסכמות Zod v4 לכל אימות הקלט של ה-API
- **מתן שמות**: קבצים = camelCase/kebab-case, רכיבים = PascalCase, קבועים = UPPER_SNAKE

### טיפול בשגיאות / בלוקי catch ריקים

לעולם אין להשאיר `catch` ללא הסבר. יש לסווג אותו לאחת משתי קטגוריות (כך מיושם
הכלל הנוקשה "לעולם אין לבלוע שגיאות בשקט בזרמי SSE"):

- **מכוון (ניקוי/טלמטריה מסוג best-effort שלנו)** — כשל כאן הוא צפוי
  ואינו מזיק; יש להוסיף הערת נימוק בת שורה אחת, ללא רישום לוגים (רישום לוג בכל בקשה הוא
  הרעש שמוסכמה זו נועדה למנוע).

  ```ts
  } catch {} // סגירה של controller שכבר נסגר לאחר ניתוק הלקוח היא צפויה
  ```

- **יש לתעד בלוג (קוד חיצוני/קוד שסופק על ידי הקורא, או כאשר הבליעה משנה את זרימת הבקרה)** — יש להשאיר
  את ה-catch (לעולם אין לאפשר לו לשבש את הזרם), אך להפיק `console.debug`/`warn` עם הקשר כדי
  שניתן יהיה לגלות את הכשל.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

לדוגמאות יישומיות, ראו `open-sse/utils/stream.ts` ו-`open-sse/utils/streamHandler.ts`.

---

## מבנה הפרויקט

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite domain modules + 130 migrations
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, 22 routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 150 executor modules (executor classes + per-provider helpers)
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (110 unique tools, 3 transports, 33 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (1,574 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/
├── adr/                     # Architecture Decision Records
├── architecture/            # System architecture & resilience
├── comparison/              # OmniRoute vs alternatives
├── compression/             # Compression guides & rules
├── dev/                     # Development guides
├── diagrams/                # Architecture diagrams
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # User guide, Docker, setup, troubleshooting
├── i18n/                    # Internationalized README translations
├── marketing/               # Marketing materials
├── ops/                     # Deployment, proxy, coverage, releases
├── providers/               # Provider-specific docs
├── reference/               # API reference, env vars, CLI tools, free tiers
├── releases/                # Release notes
├── routing/                 # Auto-combo engine, reasoning replay
├── screenshots/             # Dashboard screenshots
├── security/                # Guardrails, compliance, stealth, tokens
└── specs/                   # Design specs
```

---

## הוספת ספק חדש

### שלב 1: רישום קבועי הספק

הוסיפו אותם אל `src/shared/constants/providers.ts` — עם אימות Zod בעת טעינת המודול.

### שלב 2: הוספת מבצע (אם נדרשת לוגיקה מותאמת אישית)

צרו מבצע ב-`open-sse/executors/your-provider.ts` שמרחיב את המבצע הבסיסי.

### שלב 3: הוספת מתרגם (אם הפורמט אינו OpenAI)

צרו מתרגמי בקשה/תגובה ב-`open-sse/translator/`.

### שלב 4: הוספת תצורת OAuth (אם מבוסס OAuth)

הוסיפו אישורי OAuth ב-`src/lib/oauth/constants/oauth.ts` ושירות ב-`src/lib/oauth/services/`.

אם הספק במעלה הזרם מפיץ `client_id`/סוד OAuth ציבורי או מפתח Firebase Web API בתוך ה-CLI הציבורי שלו / חבילת הדפדפן שלו, **אל** תטמיעו אותו כליטרל מחרוזת. השתמשו ב-`resolvePublicCred()` מתוך `open-sse/utils/publicCreds.ts` והוסיפו רשומת בתים ממוסכת אל `EMBEDDED_DEFAULTS`. תהליך העבודה המחייב המלא מתועד ב-[`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

בתוך מטפלים/מבצעים, הודעות שגיאה המגיעות ללקוח חייבות לעבור דרך `buildErrorBody()` / `sanitizeErrorMessage()` מתוך `open-sse/utils/error.ts` — לעולם אל תכניסו `err.stack` או `err.message` גולמיים לגוף Response. ראו [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### שלב 5: רישום מודלים

הוסיפו הגדרות מודלים ב-`open-sse/config/providerRegistry.ts`.

### שלב 6: הוספת בדיקות

כתבו בדיקות יחידה ב-`tests/unit/` המכסות לכל הפחות:

- רישום ספק
- תרגום בקשה/תגובה
- טיפול בשגיאות

---

## משוך את רשימת הבקשות

- [ ] מבחנים עוברים (`npm test`)
- [ ] מעברי מוך (`npm run lint`)
- [ ] לבנות מצליח (`npm run build`)
- [ ] סוגי TypeScript נוספו עבור פונקציות וממשקים ציבוריים חדשים
- [ ] אין סודות מקודדים או ערכי נפילה
- [ ] אישורים ציבוריים במעלה הזרם מוטמעים באמצעות `resolvePublicCred()` (ראה [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ), לעולם לא כפשוטם
- [ ] תגובות שגיאה מנותבות דרך `buildErrorBody()` / `sanitizeErrorMessage()` — ללא עקבות מחסנית גולמית בגופי תגובה (ראה [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) )
- [ ] פקודות מעטפת (`exec` / `spawn`) מעבירות ערכי זמן ריצה דרך `env`, לא באמצעות אינטרפולציה של מחרוזת
- [ ] כל הקלטים מאומתים עם סכימות Zod
- [ ] יומן שינויים** קֶטַע** נוסף תחת `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` לשינויים הפונים למשתמש (ראה [`changelog.d/README.md`](./changelog.d/README.md) ) — do** לֹא** ערוך את `CHANGELOG.md` ישירות; פרגמנטים מצטברים בזמן השחרור ולעולם אינם מתנגשים בין PRs
- [ ] התיעוד עודכן (אם רלוונטי)
- [ ] לא נפתחו התראות חדשות CodeQL / סריקה סודית, או שכל אחת מהן נדחתה עם הצדקה טכנית תוך הפניה למסמך `docs/security/` הרלוונטי
- [ ] מסלולים שמולידים תהליכי צאצא (`/api/mcp/`, `/api/cli-tools/runtime/`) המסווגים כ- `isLocalOnlyPath()` ב- `src/server/authz/routeGuard.ts` — ראה [כלל קשה #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] אין קדימונים AI/bot `Co-authored-by` בהודעות commit (Hard Rule #16) משתפי פעולה אנושיים של — שהעבודה שלהם נמצאת בשימוש חוזר זוכים לקרדיטים סטנדרטיים `Co-authored-by: Name <email>`

---

## פרסום גרסאות

פרסום גרסאות מנוהל באמצעות תהליך העבודה `/generate-release`. כאשר נוצרת גרסה חדשה ב-GitHub, החבילה **מתפרסמת אוטומטית ב-npm** באמצעות GitHub Actions.

לפריסות ב-VPS, השתמשו ב-`npm run build:release` (ולא ב-`npm run build`) — הפקודה מבצעת
בנייה מחדש ונקייה, מרכיבה את החבילה בתוך `dist/` וכותבת את קובץ הסמן `dist/BUILD_SHA`.
לאחר מכן, השתמשו במיומנויות `/deploy-vps-*-cc`, המסנכרנות באמצעות rsync את `dist/` עם הספרייה המרוחקת `app/`.

---

## קבלת עזרה

- **ארכיטקטורה**: ראו [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **תיעוד API**: ראו [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **מסמכי אבטחה**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **מסמכי תפעול**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **בעיות**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
