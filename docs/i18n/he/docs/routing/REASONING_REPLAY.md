# REASONING_REPLAY (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **מקור האמת:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** עודכן לאחרונה:** 2026-06-28 — v3.8.40

OmniRoute לוכד את עוזר `reasoning_content` המיוצר על ידי מודלים של מצב חשיבה ומציג אותו בשקיפות בבקשות מרובות פניות כאשר הספק במעלה הזרם דורש זאת. זה מבטל את השגיאות HTTP 400 שספקים קפדניים מעלים כאשר היסטוריית השיחות של לקוח חסרה את ההיגיון של התור הקודם.

## למה זה קיים

מספר ספקי מצבי חשיבה דוחים פנייה להמשך אלא אם כן** הודעת עוזר קודמת כוללת את `reasoning_content` המקורי** . ה-upstream מחזיר 400 עם הודעות כמו:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

אבל לקוחות טיפוסיים (Cursor, Cline, Roo Code, OpenAI SDK) מוציאים את `reasoning_content` מההיסטוריה שהם משחזרים. OmniRoute משחזר אותו ממטמון בצד השרת כך שהבקשה שמעלה הזרם רואה עקבית. גיליון מס' #1628 הציג את ההתמדה memory/SQLite ההיברידית כך שהמטמון שורד תהליך הפעלה מחדש.

## אַדְרִיכָלוּת

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), one entry per tool_call.id within the request scope
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(buildToolCallCacheKey(scope, toolCalls[0].id)) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

לכידה מתרחשת ב- `open-sse/handlers/chatCore.ts` (שני אתרים, בשני אתרי הקריאה של `cacheReasoningFromAssistantMessage` ). השידור החוזר מתרחש ב- `open-sse/translator/index.ts` לאחר כפיית הסכמה אך לפני השליחה.

ערכי כלים-קריאה מאוחסנים תחת `buildToolCallCacheKey()`, תקציר של היקף הבקשה ומזהה הקריאה לכלי, כך שאותו מזהה המשמש מפתח API אחר או סשן אחר אינו בוחר את הערך. ההיקף מגיע מ- `buildReasoningCacheScope()`: מזהה מפתח API, בתוספת מפתח ההפעלה כאשר לבקשה יש אחד. עמודת `tool_call_id` ולוח המחוונים מציגים אפוא תקציר זה עבור ערכים אלה.

סיבובי עוזר רגילים (ללא כלים) מקודדים בצורה שונה: `buildAssistantMessageCacheKey()` מעכל את היקף הפגישה בתוספת התמלול המנורמל בפורמט OpenAI עד לאותו תור, מכיוון ש- DeepSeek דורש את ההיגיון של _כל_ תור קודם ברגע `tools` קיים. עבור יעדי Responses-API (לדוגמה `opencode-go/deepseek-v4-flash`, מנותב ל- `/responses`) הגוף במעלה הזרם נושא `input`, לא `messages`, אז `translateRequest()` (`open-sse/translator/index.ts`) מדווח על תמליל הציר שהוא עיכל באמצעות אפשרות התקשרות חוזרת ואתרי הלכידה מעכלים את אותו תמליל. אישור ההשמעה החוזר של Responses פועל על ציר OpenAI עבור כל פורמט מקור, כך שגם לקוחות Anthropic Messages (Claude → OpenAI → Responses) מושמעים מחדש.

## אחסון — זיכרון היברידי + SQLite

הנתיב החם משתמש ב- `Map` בזיכרון (LRU-by-creation) המגובה בטבלת SQLite להתאוששות מהתרסקות ולראות לוח המחוונים.

| שִׁכבָה | יישום                                       | מַטָרָה                                     |
| ------- | ------------------------------------------- | ------------------------------------------- |
| זֵכֶר   | `Map` `open-sse/services/reasoningCache.ts` | חיפושים מהירים, פינוי המבוגר ביותר בגיל 200 |
| DB      | שולחן `reasoning_cache` (`src/lib/db/`)     | נמשך לאורך אתחול מחדש, מניע סטטיסטיקות      |

כותבים הולכים לשניהם. קריאות מתייעצות תחילה בזיכרון, ואז נופלים בחזרה ל- DB (היטים DB מקודמים בחזרה לזיכרון). כשלי DB אינם קטלניים — המטמון בזיכרון ממשיך לשרת את הנתיב החם.

**ברירות מחדל:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- ערכי זיכרון מקסימליים: `200` (`MAX_MEMORY_ENTRIES`)
- פינוי: `createdAt` הראשון

## סכמת מסד נתונים

הגירה: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

אינדקסים: `expires_at`, `provider`, `model`, `created_at`. `expires_at` מאוחסן כשניות עידן יוניקס; שכבת SELECT מנרמלת ערכי טקסט מדור קודם באמצעות `EXPIRES_AT_EPOCH_SQL`.

## זיהוי ספק / דגם

הפעלה חוזרת מופעלת כאשר `requiresReasoningReplay(provider, model)` מחזירה `true`. הפונקציה בודקת שתי רשימות ב- `open-sse/services/reasoningCache.ts`.

**ספק IDs (התאמה מדויקת, לא תלוי רישיות):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**מודלים של דפוסי ביטוי רגולרי (לא תלוי רישיות):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` ו- `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, סיומת `-free` אופציונלית)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

הוספת provider/model קפדנית חדשה פירושה צירוף לאחת מהרשימות הללו וכתיבת מבחן יחידה המבטיח הזרקת משחק חוזר. תיאור PR צריך לצטט את מחרוזת 400 במעלה הזרם שהניעה את השינוי.

## REST API

המטמון חושף שתי נקודות קצה תחת `src/app/api/cache/reasoning/route.ts`. שניהם דורשים אימות ניהול (`isAuthenticated` מ- `@/shared/utils/apiAuth`).

| שִׁיטָה | נקודת קצה                                                 | תֵאוּר                                       |
| ------- | --------------------------------------------------------- | -------------------------------------------- |
| GET     | `/api/cache/reasoning`                                    | סטטיסטיקה + מעומדים                          |
| GET     | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | רישום מסונן (`limit` clamped to `[1, 200]`)  |
| DELETE  | `/api/cache/reasoning`                                    | נקה הכל (זיכרון + DB) ואפס את ספירת hit/miss |
| DELETE  | `/api/cache/reasoning?provider=deepseek`                  | נקה רק ערכים עבור ספק אחד                    |
| DELETE  | `/api/cache/reasoning?toolCallId=call_abc`                | מחק ערך בודד                                 |

**צורת תגובה של GET :**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## הערות תפעוליות

- **ניקוי:** `cleanupReasoningCache()` מנקה ערכי זיכרון שפג תוקפם ומפעיל `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. עובדי בדיקת בריאות מתקשרים לזה מדי פעם.
- **התאוששות מהתרסקות:** לאחר הפעלה מחדש, הזיכרון ריק אך ה- DB עדיין מכיל ערכים שטרם פג. החיפוש הראשון עבור `tool_call_id` נתון הוא פגע DB ; חיפושים הבאים הם להיטי זיכרון.
- **אין נימוקים, אין מטמון:** `cacheReasoningFromAssistantMessage` מחזירה `0` כאשר להודעת המסייע אין שדה `reasoning_content` / `reasoning`, כך שתגובות שאינן חושבות עולות דבר.
- **גם הכתיבה סגורה:** שני אתרי השיחות ב- `chatCore.ts` (לא סטרימינג וסטרימינג) קוראים `cacheReasoningFromAssistantMessage()` רק כאשר `requiresReasoningReplay(provider, model)` הוא `true` — אותו ערך הבדיקה בצד הקריאה. התקנות שלעולם לא נוגעות בספק החוזר מפסיקות לשלם עבור הכתיבה, עדכון האינדקס וה- try/catch על כל תגובה נושאת היגיון.
- **ספקים לא קפדניים:** כאשר `requiresReasoningReplay` הוא `false` ופורמט היעד הוא OpenAI, המתרגם** רצועות** כל שדה `reasoning_content` מהודעות יוצאות — OpenAI השלמת צ'אט אינו מקבל זאת.

## Muse Opaque-Reasoning Ownership

Muse (`muse-code`) מחזירה חשיבה אטומה הקשורה למתקשר (`encrypted_content`). הפעלה חוזרת של זה תחת חשבון אחר או אישור מחדש נכשל במעלה הזרם, ולכן בקשות מקוריות OAuth משתמשות בבעלות ברמת ההפעלה במקום בסיבוב לפי בקשה (`src/sse/services/museSessionOwnership.ts`, נאכף ב- `src/sse/handlers/chat.ts`). חיבורי מפתח API שנבחרו במפורש ותצורות מפתח API בלבד שומרים על הניתוב הקיים שלהם ללא מצב בעלות זה.

- ספק סשן יציב ID בכל סיבוב: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` או `x-codex-session-id`; לחילופין, השתמש `prompt_cache_key`, `session_id`, `conversation_id` או `metadata.session_id` בגוף (בסדר הקדימות הזה). חסר או ריק IDs החזר 400 כאשר שני חשבונות OAuth מקומיים או יותר פעילים; עם חשבון OAuth יחיד אין מה לסובב, אז בקשה כזו ממשיכה ניתוב לא מוצמד. ההיקף כולל את OmniRoute API-key ID של המתקשר.
- הפעלות עצמאיות טריות מסביב לחשבונות OAuth מקוריים פעילים המותרים על פי מדיניות חיבור מפתח API, מסודרים לפי חיבור ID. Round-robin מדלגת על חשבונות בהתקררות חיבור, עם סטטוס טרמינל (`banned`, `expired`, `credits_exhausted`), או נעול דגם עבור הדגם המבוקש; כשלים במעלה הזרם של Muse מתעדים התקררות ומצב מפסק כמו ספקים אחרים. חיבור מאולץ במפורש עוקף סיבוב סיבובי עבור הפעלה חדשה אך אינו יכול לעקוף בעלים קיים.
- עד שהבעלים יגיש תגובה מוצלחת, הפעלה שהבעלים שלה הפך ללא זמין נתבע מחדש לחשבון בריא. לאחר התגובה המוצלחת הראשונה, ההפעלה נשארת מוצמדת לאותו בעלים עד שהיא לא תהיה פעילה במשך 30 יום (`MUSE_SESSION_IDLE_TTL_MS`).
- כל המשך ותפנית תוצאה של הכלי נשארים מוצמדים לבעל ההפעלה: חיבור, זהות חשבון ויצירת אישורי מסקנות, נבדק שוב לפני ניסיונות במעלה הזרם, כולל נסיונות רענון חוזרים של אישורים. התשובות להפניות ל- IDs/item ול-Chat Completions tool-call IDs חייבות להיות מוקלטות עבור הפגישה והדור הזה.
- רשומות SQLite `key_value` במרחב השמות `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) ממשיכות בבעלות וסמן הסיבוב על פני מופעל מחדש. כל תביעה ותגובה שהוגשה מרעננת את חותמת הפעילות של הפגישה; סשן סרק יותר מ- `MUSE_SESSION_IDLE_TTL_MS` נגזם (סיכת הבעלים, הדגל שהוגש ו- opaque/reference hashes מוקלט), לכל היותר אחת ל-10 דקות ובקבוצות מוגבלות, כך ששידור חוזר מאוחר יותר של ההיסטוריה שלו נכשל כבעלים לא ידוע. הרשומות מכילות חיבור IDs ו-hash של זהות חשבון, אישורים, תוכן אטום והפניות להמשך, לא סודות או היסטוריית שיחות. לקוחות חייבים לשמור ולשלוח את ההיסטוריה המלאה והנמקה האטומה שלהם.
- נימוק לא ידוע או זר אטום, בעלים חסר, חשבון בעלים לא זמין, או שינוי דור עם היסטוריה מתועדת כישלונות סגורים עם תקלה מפורשת 4xx/503 —.
- מפתח לאותו חשבון שהוזכר מחדש מאומץ רק כאשר ההפעלה לא תיעדה היסטוריה ניתנת להפעלה חוזרת; הפעלות מוקלטות ממשיכות להיכשל סגורות עד שהן מתחילות מחדש.
- תגובה ריקה במעלה הזרם (`upstream_empty_response` / `empty_response`, שום דבר לא נפלט למתקשר) מנוסה שוב לכל היותר פעמיים על אותו בעלים, לאחר 0.5 שניות ואז 1.5 שניות (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). אם כל הניסיונות ריקים, ה-502 המקורי מוחזר ללא סימון קירור או מפסק, כך שתשובה מתקלפת לעולם לא נועלת את הבעלים.
- כל בקשות `muse-code` עוקפות קריאה וכתיבה של מטמון סמנטי, כולל כתיבת סטרימינג, כך שפלט אטום במטמון לא יכול לרכוש בעל הפעלה אחר.

שומרי רגרסיה: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts`, ו- `tests/unit/chatcore-semantic-cache.test.ts`.

## ראה גם

- מפסקי זרם [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) —, התקררות, נעילות דגמים
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — אבחון במעלה 400s
- מקור: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- הגירה: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- מסלול API : `src/app/api/cache/reasoning/route.ts`
- גיליון מקורי: #1628
