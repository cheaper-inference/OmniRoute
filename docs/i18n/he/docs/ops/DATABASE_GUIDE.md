# Database Schema & Operations Guide (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **בקצרה**: OmniRoute משתמש ב-**SQLite עם יומן WAL** כמאגר הראשי שלו, עם הצפנת **AES-256-GCM** במנוחה עבור שדות רגישים. מדריך זה עוסק בסכימה, בהעברות גרסה, בגיבוי/שחזור ובנוהלי תפעול.

**מקורות:**

- `src/lib/db/core.ts` — מופע יחיד + SCHEMA_SQL (‏17 טבלאות בסיס)
- `src/lib/db/migrationRunner.ts` — העברות גרסה ממוספרות
- `src/lib/db/migrations/` — 167 קובצי SQL ממוספרים
- `src/lib/db/encryption.ts` — פונקציות עזר להצפנה
- `src/lib/db/backup.ts` — ייצוא/ייבוא גיבויים
- `src/lib/db/healthCheck.ts` — אבחון תקינות

---

## למה SQLite?

OmniRoute בחר ב-SQLite במקום PostgreSQL/MySQL מכמה סיבות:

| גורם            | SQLite                                | PostgreSQL                             |
| --------------- | ------------------------------------- | -------------------------------------- |
| **פריסה**       | מוטמע — ללא שרת נפרד                  | דורש הגדרת שרת                         |
| **הצפנה**       | בשכבת היישום (AES-256-GCM)            | TDE מובנה                              |
| **ביצועים**     | מהיר יותר לעומסי עבודה קטנים/בינוניים | טוב יותר למספר עצום של כתיבות מקביליות |
| **מקביליות**    | מצב WAL מאפשר קריאות מקביליות         | MVCC מלא                               |
| **גיבוי**       | העתקת קובץ יחיד                       | `pg_dump` או תמונת מצב של מערכת הקבצים |
| **תרחיש שימוש** | התקנה לכל משתמש, מוטמע                | SaaS מרובה דיירים                      |

עבור פריסות של **משתמש יחיד ומופע יחיד** (תרחיש השימוש העיקרי של OmniRoute), SQLite פשוט ומהיר יותר.

### יומן WAL

הקובץ `core.ts` פותח את מסד הנתונים ב-**מצב WAL (רישום מקדים של כתיבות)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL מאפשר **קריאות מקביליות** במהלך כתיבות — דבר חשוב ללוח המחוונים, שמבצע שאילתות בזמן שבקשות נרשמות.

גודל המטמון המוגדר כברירת מחדל הוא **65,536 KiB (64 MiB)**. SQLite מפרש ערך שלילי של
`cache_size` כחסם עליון משוער ב-KiB ומקצה דפים לפי דרישה.
האפשרות **הגדרות > מערכת ואחסון > גודל המטמון** מקבלת ערכים שלמים בין **1 ל-
1,000,000 KiB**; שמירת ההגדרה מחילה אותה על החיבור הפעיל למסד הנתונים,
ו-OmniRoute משחזר את הערך השמור בעת ההפעלה.

---

## מיקום מסד הנתונים

קובץ SQLite מאוחסן במיקום הבא:

| מערכת הפעלה | נתיב                                                        |
| ----------- | ----------------------------------------------------------- |
| Linux       | `~/.omniroute/storage.sqlite`                               |
| macOS       | `~/.omniroute/storage.sqlite`                               |
| Windows     | `%USERPROFILE%\.omniroute\storage.sqlite`                   |
| Docker      | `/app/data/storage.sqlite` (ניתן להגדרה באמצעות `DATA_DIR`) |

קבצים נלווים:

- `storage.sqlite-wal` — יומן כתיבה מקדימה
- `storage.sqlite-shm` — קובץ זיכרון משותף
- `call_logs/` — תוצרי נתוני הבקשות (אם האפשרות מופעלת)

**שינוי המיקום:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## ארכיטקטורת מודולי הדומיין

מסד הנתונים של OmniRoute כולל **110 מודולי TypeScript ברמה העליונה** תחת `src/lib/db/`. כל מודול דומיין:

- אחראי על טבלה ייעודית אחת או יותר
- מייצא פונקציות CRUD עם טיפוסים
- לעולם אינו ניגש לטבלאות של מודול אחר
- משתמש ב-`getDbInstance()` מתוך `core.ts` כדי לגשת למסד הנתונים

### 110 מודולי מסד הנתונים ברמה העליונה

ל-OmniRoute יש **110 קובצי TypeScript ברמה העליונה** תחת `src/lib/db/`. להלן מבחר ממודולי הליבה; לרשימה המלאה, עיינו בתוכן הספרייה:

| מודול                   | טבלאות                                                         | אחריות                                                            |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | רישום ספקים ואישורים באמצעות OAuth/API key                        |
| `models.ts`             | `key_value` (נתוני מודלים)                                     | הגדרות מודלים, יכולות ותמחור                                      |
| `combos.ts`             | `combos`                                                       | תצורות ניתוב קומבינציות וסדרן                                     |
| `apiKeys.ts`            | `api_keys`                                                     | מחזור החיים של API key, היקפי הרשאה ומעקב אחר מכסות               |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | תצורת המערכת ומאגר KV משותף                                       |
| `backup.ts`             | —                                                              | פעולות ייצוא/ייבוא של גיבויים                                     |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | תצורות Proxy וכללי ניתוב                                          |
| `prompts.ts`            | `prompt_templates`                                             | תבניות הנחיה לשימוש חוזר וניהול גרסאות                            |
| `webhooks.ts`           | `webhooks`                                                     | מינויים ויומנים של webhook מונחי-אירועים                          |
| `detailedLogs.ts`       | `request_detail_logs`                                          | רישום ביקורת לכל בקשה (אופציונלי, נפח גבוה)                       |
| `domainState.ts`        | `domain_*` (5 טבלאות)                                          | תקציבי דומיין, מפסקי זרם, נעילות, שרשראות חלופה והיסטוריית עלויות |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | מפתחות API מורשים עבור MCP/A2A                                    |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | היסטוריית שימוש במכסות                                            |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | מיפוי מודלים לברירות מחדל של קומבינציות                           |
| `cliToolState.ts`       | `cli_tool_state`                                               | מצב מתמשך הייחודי ל-CLI                                           |
| `encryption.ts`         | —                                                              | כלי עזר להצפנת שדות ולפענוחם                                      |
| `readCache.ts`          | —                                                              | מטמון בזיכרון עבור פעולות עתירות קריאה                            |
| `secrets.ts`            | `key_value` (רשומות מוצפנות)                                   | אחסון סודות מוצפן                                                 |
| `stateReset.ts`         | —                                                              | מחיקה/איפוס של מצב מסד הנתונים לצורך בדיקות                       |
| `contextHandoffs.ts`    | `context_handoffs`                                             | הקשר ההפעלה להעברה בין סוכנים                                     |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | מעקב אחר שימוש                                                    |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | תצורת דחיסה                                                       |

### גבולות בין מודולים

כלל ארכיטקטוני מרכזי: **מודולים אינם ניגשים ישירות לטבלאות של מודולים אחרים**. כדי לעבוד עם נתונים של מודול אחר, יש לייבא את הפונקציה מאותו מודול.

```ts
// ❌ שגוי: SQL ישיר ממודול אחר
db.prepare("SELECT * FROM provider_connections").all();

// ✅ נכון: שימוש בפונקציה של מודול הספקים
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

כלל זה נאכף במסגרת סקירת קוד — אין בדיקה סטטית, אך הפרות מסומנות.

---

## סכמת בסיס (17 טבלאות)

`core.ts` מגדיר את 17 טבלאות הבסיס ב-`SCHEMA_SQL`. הן נוצרות על ידי המיגרציה `001_initial_schema.sql` ומהוות את סכמת הליבה.

### טבלאות ליבה (נוצרות במיגרציה הראשונית)

| טבלה                       | מטרה                          | עמודות מפתח                                                             |
| -------------------------- | ----------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | פרטי גישה לספק (מוצפנים)      | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | מידע ניתוב לצומתי ספק         | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | מאגר KV כללי                  | `namespace`, `key`, `value`                                             |
| `combos`                   | הגדרות שילובי ניתוב           | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | מפתחות API עבור השער          | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | מטא-נתונים של מסד הנתונים     | `key`, `value`                                                          |
| `usage_history`            | רשומות שימוש בבקשות           | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | מטעני בקשות ותגובות           | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | יומני בקשות Proxy             | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | שרשראות ממודל לספק            | `model`, `chain`                                                        |
| `domain_budgets`           | תקציבי הוצאה לכל דומיין       | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | היסטוריית איפוסי תקציב        | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | מעקב עלויות לכל דומיין        | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | מצב הגבלת קצב לדומיין         | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | מצב מפסק זרם לכל דומיין       | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | מטמון תגובות LLM              | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | צילומי מצב היסטוריים של מכסות | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### טבלאות נוספות (נוספו על ידי מיגרציות מאוחרות יותר)

מיגרציות עוקבות מוסיפות טבלאות כגון:

- `cli_tool_state` (מיגרציה 011) — מצב כלי CLI
- טבלאות `mcp_*` — ביקורת שרת MCP
- טבלאות `a2a_*` — מצב משימות A2A
- טבלאות `usage_*` — מעקב שימוש
- טבלאות `plugin_*` — מערכת תוספים
- `skill_executions` — היסטוריית ביצוע מיומנויות
- טבלאות `memory_*` — מערכת זיכרון
- טבלאות `compression_*` — מערכת דחיסה
- טבלאות `webhook_*` — יומן מסירת webhook
- טבלאות `acp_*` — פרוטוקול לקוח סוכן
- טבלאות `oneproxy_*` — זירת המסחר של 1proxy
- `proxy_assignments` — קישורי תחום Proxy
- `detailed_call_artifacts` — מטא-נתונים של ארטיפקטים ביומן שיחות
- `quota_alert_history` — ביקורת התראות מכסה
- `command_code_auth_sessions` — הפעלות OAuth של Command Code

הרשימה המלאה של כ-30+ טבלאות נמצאת ב-`src/lib/db/migrations/`.

---

## הגירות

OmniRoute משתמש** הגירות מנוסחות וחסרות יכולת** ב- `src/lib/db/migrations/`. כל הגירה היא קובץ SQL יחיד. שני פורמטים של שמות מתקיימים במקביל; הגרסה הרשומה ב- `_omniroute_migrations` היא הקידומת המספרית.

### מתן שמות של הגירה

| פוּרמָט                                          | דוּגמָה                              | משמש עבור                                                                                                                |
| ------------------------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `NNN_description.sql` (בדיוק 3 ספרות)            | `241_seen_models.sql`                | הסדרה הישנה `001`–`241`. קפוא כאשר פורמט חותמת הזמן נחת (`240` ו- `241` מוזגו ממש לפניו): אף קובץ חדש לא מקבל מספר רציף. |
| `YYYYMMDDHHMMSS_description.sql` (14 ספרות, UTC) | `20261113120000_add_usage_index.sql` | כל הגירה שנוצרה מ-2026-11-13 ואילך.                                                                                      |

למה השינוי: עם מספרים עוקבים, מקביל PRs בחר את אותו מספר הבא וכל אחד מלבד אחד היה צריך למספר מחדש לפני המיזוג. חותמת UTC נותנת לכל PR גרסה משלו.

כללים עבור פורמט חותמת הזמן (נאכפים על ידי `npm run check:migration-numbering`, משותפים עם המחולל ב- `scripts/check/lib/migrationNaming.mjs`):

- חותמת הזמן היא תאריך ושעה אמיתיים UTC, לא לפני `20261113000000` ולא יותר מ-10 דקות בעתיד.
- התיאור הוא `snake_case` באותיות קטנות שמתחיל באות (`a-z`, `0-9`, `_` בודד בין מילים), לכל היותר 80 תווים.
- שני קבצים עם אותה חותמת זמן הם כפילויות.
- הכלל ללא פערים חל רק על הסדרה הישנה: כל מספר מ- `001` ל- `241` חייב להתקיים, מלבד הפערים הידועים `026`, `055` ו- `121`. מחיקת `241` (או כל קובץ ישן) נכשלת בשער. לא ניתן להוסיף `001` ו- `241` לרשימת ההיתרים `KNOWN_GAPS`. קבצים עם חותמת זמן לעולם אינם יוצרים פער.
- כל ערך ב- `src/lib/db/migrations/` חייב להיות קובץ רגיל עם שם `.sql` תקף באותיות קטנות. ספרייה, קישור סימלי, קובץ `.SQL` או `.sql.bak`, קובץ נסתר או שם עם רווח נכשלים בשער, כי הרץ היה מדלג עליו בשקט או קורס בעת האתחול.

**החל הזמנה.** הרץ ממיין לפי הערך המספרי של הקידומת, לא לפי טקסט: תחילה קבצי `001`–`241` הישנים, לאחר מכן הקבצים עם חותמת הזמן לפי סדר חותמת הזמן, ולאחר מכן כל ספריות ברווחי שמות הרשומים ב- `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (גרסאות כגון `ee-001`). העברה ממתינה היא כל קובץ שהגרסה שלו אינה ב- `_omniroute_migrations`, כך שהעברה מענף ישן יותר שמתמזג לאחר חדש יותר עדיין חל על מסדי נתונים קיימים.

**חותמת הזמן היא סדר יצירה, לא סדר מיזוג.** אם ההעברה שלך תלויה בטבלה או בעמודה שנוצרה על ידי העברה עם א** חדש יותר** חותמת זמן (לדוגמה, אחד מ- PR אחר שהתמזג ראשון), מסד נתונים חדש יריץ את שלך ראשון ויכשל. בזמן שה- PR שלך עדיין פתוח, צור מחדש את שם הקובץ עם `npm run db:new-migration` כך שהוא יקבל חותמת זמן חדשה יותר, או הפוך אותו לבלתי תלוי. `npm run test:migrations:fresh` מחיל כל הגירה על מסד נתונים ריק ותופס את זה.

### הגירה ממוזגת לעולם לא נמחקת או משתנה שם

ברגע שקובץ העברה נמצא על ענף שחרור או `main`, הוא כבר רץ על מסדי נתונים הומולוגיים ומפתחים, על התקנות VPS ובסנכרון Enterprise. מכאן ואילך:

- **לעולם אל תמחק אותו.** התקנות טריות יאבדו את הסכימה שלה בעוד שמסדי נתונים משודרגים ישמרו עליה.
- **לעולם אל תשנה את שמו.** הגרסה ב- `_omniroute_migrations` כבר לא תתאים לקובץ, אז כל מסד נתונים שכבר החיל אותו יריץ אותו שוב. SQL לא אימפוטנטי לאחר מכן משכפל נתונים או מפסיק את האתחול.
- **צריך סכימה אחרת?** צור הגירה חדשה עם `npm run db:new-migration`.

שינוי השם בטוח רק עבור קובץ שעדיין לא מוזג, וזה המקרה שהרמזים של השער מתייחסים אליו. תג שחרור לא משנה דבר כאן: כל דחיפה לסניף `release/v*` מפרסמת את תמונת Docker `:next` ופועלת על התקנות homolog, VPS וסינכרון Enterprise, כך שהעברה ממוזגת רצה על מסדי נתונים אמיתיים לפני שקיים תג `vX.Y.Z` כלשהו. השער נכשל בכל הסרה של קובץ בסיס, מתויג או לא.

- **החזרת העברה ממוזגת.** `git revert` שמוחקת את הקובץ נכשלת בשער. שמור את הקובץ ובטל את הסכימה שלו בהגירה חדשה: `npm run db:new-migration -- <description>`, עם `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` וכן הלאה. מסדי נתונים משודרגים ורעננים אז מסתיימים באותה סכימה.
- **שינוי שם אחד מקובל: ערך תאימות ותוכן זהה.** אם קובץ ממוזג חייב לעבור (לדוגמה, שני קבצים ממוזגים חולקים חותמת זמן והרץ מפסיק עם התנגשות גרסה), שנה את שם הקובץ המאוחר מבלי לגעת SQL שלו והוסף `{ fromVersion, fromName, toVersion, toName }` ל- `RENAMED_MIGRATION_COMPATIBILITY` ב- `src/lib/db/migrationRunner/constants.ts`. מסדי נתונים שהחילו את הגרסה הישנה מזיזים את שורת `_omniroute_migrations` שלהם במקום להפעיל את הקובץ שוב. השער מזהיר על שינוי שם כזה ותמיד מפעיל עליו את בדיקת המעבר, לא משנה מה חותמת הזמן החדשה: התקנות טריות מיישמות את הקובץ במיקום החדש שלו, מסדי נתונים משודרגים לא, אז בחר חותמת זמן חדשה ליד הישן. השער נכשל בשינוי השם אם התוכן השתנה (שינוי סכימה עדיין עובר בהגירה חדשה), או אם קובץ היעד של הערך אינו בדיסק.
- **לעולם אל תשנה את השם באותה חותמת זמן.** שינוי שם ששומר על חותמת הזמן ומשנה רק את התיאור נכשל בשער, עם או בלי כניסה. עם ערך שה- `toVersion` שלו שווה `fromVersion` שלו, הרץ מוחק את שורת `_omniroute_migrations` הישנה ומחיל את הקובץ שוב על כל מסד נתונים שכבר הפעיל אותו. ללא ערך, הרץ עוקב רק אחר הגרסה: הוא מדלג על הקובץ באותם מסדי נתונים (תוכן חדש לעולם אינו פועל שם) ומתעד שגיאת מספור מחדש בכל אתחול. השתמש בחותמת זמן אחרת בתוספת ערך תאימות, או שמור את השם.
- **השער בודק שהקובץ ששמו שונה אינו פועל שוב.** עבור כל שינוי שם מכוסה, השער מעביר את שם הקובץ החדש לבדיקת המעבר עם `--must-not-apply`. הבדיקה מאתחלת את מסד הנתונים המשודרג עם הרץ האמיתי, ואם הרץ מחיל את הקובץ הזה שוב (לדוגמה, בגלל שלערך יש גרסה או שם שגויים, או בגלל שמנתח הטקסט של השער קרא `constants.ts` בצורה שונה מזו של TypeScript), השער נכשל ב- `migration renomeada rodaria de novo` ומבקש ממך לבדוק את הגרסאות והשמות הישנים והחדשים של הערך.

### מה השער בודק מול הבסיס

בבקשת משיכה וריצות תור מיזוג, `npm run check:migration-numbering` משווה `src/lib/db/migrations/` בדיסק עם אותה ספרייה בענף הבסיס. הבסיס הוא, בסדר הזה: `--base-latest-tag`, `--base <ref>`, המשתנה `MIGRATION_BASE_REF`, או, כאשר `GITHUB_EVENT_NAME` הוא `pull_request`, `pull_request_target` או `merge_group`, האב הראשון של commit המיזוג, `merge_group.base_sha` של מטען האירוע, או `git merge-base HEAD origin/$GITHUB_BASE_REF`. בבקשת משיכה או ריצת תור מיזוג ללא בסיס שניתן לפתור, השער נכשל. מחוץ CI ללא `--base` הוא מדפיס `comparação com a base: pulada (sem --base)` ומדלג על הכללים הללו.

`--base-latest-tag` משווה לתג המהדורה החדש ביותר (`vX.Y.Z` לפי סדר semver; תגיות סיומות כגון לילה לא נחשבות) שנמצא בהיסטוריה של `HEAD`, עם אותם כללים כמו `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) מפעיל את השער בצורה זו, מכיוון של push וריצות מתוזמנות אין בסיס בקשת משיכה ומיזוג יכול לנחות ללא ריצת CI חדשה. ללא תג שחרור בהיסטוריה השער נכשל; הרץ `git fetch --tags` (ב- CI, `actions/checkout` עם `fetch-depth: 0` מביא את התגים).

| שנה בבקשת המשיכה                                                                    | תוֹצָאָה                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| שם קובץ שקיים בבסיס שונה, עם ערך `RENAMED_MIGRATION_COMPATIBILITY`                  | **אַזהָרָה** אם התוכן זהה, ובדיקת המעבר פועלת ללא קשר לחותמת הזמן החדשה; זה נכשל אם המיקום החדש משנה את הסכימה הסופית (בטל את השם, או בחר חותמת זמן חדשה אחרת למקום שבו הוא נוסע) או אם הרץ יחיל את הקובץ ששונה שוב על מסד נתונים משודרג.** נכשל** אם התוכן השתנה.     |
| שם קובץ שקיים בבסיס שונה תוך שמירה על חותמת הזמן שלו (רק התיאור משתנה)              | **נכשל** , עם או בלי ערך: הרץ יחיל אותו שוב (עם הערך) או דילג עליו לפי גרסה (ללא אחת). השתמש בחותמת זמן אחרת בתוספת ערך תאימות, או שמור את השם.                                                                                                                        |
| קובץ שקיים בבסיס נמחק, או שונה שם ללא ערך                                           | **נכשל** , בין אם הקובץ נמצא בתג שחרור או לא. כדי לבטל אותו, שחזר את הקובץ באמצעות `git checkout <base> -- src/lib/db/migrations/<file>`; כדי להחזיר את הסכימה שלו, הוסף הגירה חדשה עם `DROP ... IF EXISTS`.                                                           |
| לקובץ שקיים בבסיס יש תוכן שונה                                                      | **אַזהָרָה** (ביאור `::warning` ב- GitHub Actions), ובדיקת ה-commutation פועלת. היא נכשלת אם העריכה משנה את הסכימה הסופית, מכיוון שבסיסי נתונים משודרגים אינם מחילים את הקובץ הערוך שוב: הכנס את השינוי להגירה חדשה. עריכה לא מזיקה (הערה, `IF NOT EXISTS`) רק מזהירה. |
| קובץ עם חותמת זמן נוסף עם חותמת זמן שאינה חדשה מהחדשה ביותר של הבסיס                | מפעיל את בדיקת המעבר, המתואר להלן.                                                                                                                                                                                                                                     |
| קובץ `NNN_` בפורמט ישן נוסף עם מספר מתחת לקובץ החדש ביותר בפורמט הישן של הבסיס      | **נכשל** , גם אם `KNOWN_GAPS` נערך באותה בקשת משיכה: הסדרה הישנה קפואה, צור את ההעברה עם `npm run db:new-migration`. קבצים בפורמט ישן מעל החדש ביותר של הבסיס (בקשת משיכה של `release/v*` ל- `main` ) מתקבלים.                                                         |
| קובץ לא בסדר, ערוך או שונה שם מכיל הצהרות `INSERT`, `UPDATE`, `DELETE` או `REPLACE` | **אַזהָרָה** : בדיקת המעבר לא משווה נתונים, אז בדוק אם הסדר שבו מסדי נתונים משודרגים ורעננים מיישמים אותם משנה את התוצאה.                                                                                                                                              |

הפעלה אחת של בדיקת המעבר מכסה את הקבצים שאינם בסדר, את הקבצים הערוכים ושמות השינויים יחד.

בדיקת המעבר (`scripts/check/migration-commutation.ts`) בונה שני מסדי נתונים זמניים עם נתיב ההתקנה האמיתי: an** משודרג** אחד (אתחול עם ההעברות הבסיסיות, ואז אתחול שוב באותו קובץ עם ההגירות של בקשת המשיכה) ו-** טָרִי** אחד (אתחול אחד עם ההגירות של בקשת המשיכה). הוא משווה את הסכמות המתקבלות: טבלאות ועמודות (התעלמות מסדר העמודות), אילוצי UNIQUE / PRIMARY KEY ו- FOREIGN KEY, טקסט `CREATE TABLE` המנורמל של כל טבלה (המכסה אילוצי CHECK, איסוף, עמודות שנוצרו ואפשרויות טבלה), אינדקסים, טריגרים ותצוגות. לא משווים נתוני שורות. אם הם תואמים, השער מדפיס שהקובץ לא תקין אבל נוסע, ועובר. אם הם שונים, השער נכשל בהבדל ורמז למקרה: עבור קובץ לא בסדר, צור מחדש את שמו עם `npm run db:new-migration`, וזה בטוח כי הקובץ עדיין לא מוזג; עבור קובץ בסיס ערוך, שחזר את תוכן הבסיס והכניס את השינוי להגירה חדשה; עבור קובץ עם שם שונה, בטל את השם או בחר חותמת זמן חדשה אחרת למקום שבו הוא נוסע, לעולם לא אותה חותמת זמן עם שם אחר. אם הצ'ק עצמו לא יכול לרוץ, השער נכשל ב- CI ומתריע רק מקומית. עבור קובץ בסיס ערוך, מסד הנתונים המשודרג נבנה עם תוכן הבסיס של אותו קובץ, והאתחול השני מדלג עליו מכיוון שהגרסה שלו כבר רשומה. עבור קובץ עם שם שונה, מסד הנתונים המשודרג נבנה כשהקובץ תחת שמו הישן, והאתחול השני מעביר את שורת `_omniroute_migrations` שלו דרך ערך התאימות במקום להפעיל אותו שוב; השער מעביר את השם החדש עם `--must-not-apply`, כך שהבדיקה נכשלת אם האתחול השני מחיל אותו. אם הגירה של בקשת משיכה לא מצליחה להחיל על הנתיב המשודרג, כלומר, לאחר כל הגירה של בסיס (בין אם היא נכשלת גם בהתקנה חדשה ובין אם לא), השער מדווח על `migration do PR não aplica` ומבקש ממך לתקן את ה- SQL כנגד הסכימה הנוכחית של הבסיס; אם הקובץ תלוי בהעברת בקשת משיכה אחרת עם חותמת זמן מאוחרת יותר, צור מחדש את שמו עם `npm run db:new-migration`.

כדי להפעיל את אותה השוואה באופן מקומי, העבר את הבסיס במפורש, למשל `npm run check:migration-numbering -- --base origin/<base-branch>`, או `npm run check:migration-numbering -- --base-latest-tag` כדי להשוות עם המהדורה האחרונה.

### המרת העברת `NNN` של PR פתוחה

בקשת משיכה שנפתחה לפני המתג עדיין עשויה לשאת קובץ רציף כגון `242_add_widgets.sql`. מספרים ישנים מעל `241` נדחים, אז המר אותם לפני המיזוג:

1. **שנה את שם הקובץ עם המחולל, תוך שמירה על התיאור.** הפעל `npm run db:new-migration -- <same description>` כדי לקבל את השם החדש, העבר את ה- SQL לתוכו ומחק את קובץ `NNN_` הישן. התיאור חייב להישאר זהה: ערך התאימות למטה תואם עליו.
2. **הוסף ערך תאימות אם מסד נתונים מתמשך הפעיל את המספר הישן.** אם מסד נתונים כלשהו שנשמר (הומולוג, VPS, התקנה של תורם עצמו) הפעיל בנייה של ה- PR עם קובץ `NNN_`, הוסף `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` ל- `RENAMED_MIGRATION_COMPATIBILITY` ב- `src/lib/db/migrationRunner/constants.ts`. זֶהוּ** נדרש עבור `237` ל- `241`** : המשבצות האלו מכילות כעת את ה- `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` ו- `241_seen_models.sql` הקנוניים, וללא הרשומה מסד נתונים כזה מדלג על ההגירה הקנונית לנצח ומריץ שוב את ההמרה. זה עובד גם עבור משבצת שנשארת ריקה, כגון `242`, כאשר היעד הוא חותמת זמן. אם יש ספק, הוסף את הערך. איפה אתה מוסיף את זה במערך לא משנה: כאשר משבצת היעד של ערך עדיין מחזיקה שורה שערך אחר מתרחק ממנה (לדוגמה `237` מחזיק שורה PR בעוד שורת `usage_history_calculated_cost` ישנה יותר מחכה לעבור לתוך `237`), הרץ נותן לערך הזה לחכות עד שהמשבצת פנויה. רק התנגשות אמיתית, כגון משבצת המוחזקת על ידי שורה ללא כניסה זזה, או שני ערכים שמחליפים משבצות, עוצרים את האתחול עם `Cannot reconcile ...`.
3. **שמור על ה- SQL אימפוטנטי** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), מכיוון שההגירה המרה עשויה לפגוש מסד נתונים שבו הסכימה שלו כבר קיימת.
4. **העבר מקרים מיוחדים עם מפתח גרסה.** אם ה- PR הוסיף מקרה עבור המספר הישן שלו ב- `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) או ב- `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), שנה את המפתח לחותמת הזמן החדשה.

`tests/unit/db/codex-fence-migration-rename.test.ts` הוא דוגמה פועלת לבדיקה עבור הגירה עם שמות שונים.

### יציאות חזרה לסניפים לפני המעבר

לעולם אל תבחר דובדבן או העבר קובץ `YYYYMMDDHHMMSS_` לאחור לענף שקדם למעבר (לדוגמה ענף `release/v*` ישן יותר). הרץ שם ממיין שמות קבצים כטקסט, כך שקובץ עם חותמת זמן ירוץ בין `201_` ל- `202_` במסד נתונים טרי, והשער הישן שם לא מבין קידומות של 14 ספרות. על ענף כזה, כתוב את השינוי כקובץ `NNN_` הבא של אותו סניף, idempotent, כך שזה לא הפעלה כאשר הגרסה עם חותמת הזמן מגיעה מאוחר יותר.

### איך ההגירות פועלות

בעת ההפעלה, `migrationRunner.ts`:

1. יוצר טבלת `_omniroute_migrations` אם לא קיימת
2. שאילתות עבור העברות שכבר הוחלו
3. מחיל כל העברות חדשות לפי הסדר, כל אחת בעסקה
4. מתעד כל העברה שהוחלה עם חותמת זמן

```ts
// src/lib/db/migrationRunner.ts (simplified)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### חוסר אונות

הגירות חייבות להיות** אימפוטנטי** — להריץ אותם פעמיים אמור להיות ללא הפעלה:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

השתמש בסעיפים `IF NOT EXISTS`, `IF EXISTS` ו- `OR IGNORE` / `OR REPLACE` באופן חופשי.

### הוספת הגירה חדשה

1. **צור את הקובץ עם המחולל** : `npm run db:new-migration -- <description>` (לדוגמה `npm run db:new-migration -- add combo priority`). הוא כותב `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` עם זמן UTC הנוכחי וכותרת הערה, מתקדם שנייה אחת קדימה אם חותמת הזמן הזו נלקחת, ולעולם לא מחליף קובץ. אל תבחר מספר ביד.
2. **השתמש ב- DDL בטוח** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **מילוי חוזר של נתונים בזהירות** : השתמש `UPDATE ... WHERE ...` כדי לטפל בשורות קיימות
4. **בדוק סדר ושם** : `npm run test:migrations:fresh` (כל ההגירות במסד נתונים ריק) ו- `npm run check:migration-numbering`
5. **מבחן על עותק** : לעולם אל תפעיל העברות לא בדוקות בייצור

דוּגמָה:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **שינויים שאינם תואמים לאחור** (למשל, שחרור עמודות) הם מסובכים. OmniRoute האם NOT תומך בשדרוג לאחור — לאחר החלת הגירה, שינוי הסכימה הוא קבוע. תכננו בהתאם.

---

## הצפנה במנוחה

שדות רגישים (מפתחות API, אסימוני OAuth ומחרוזות חיבור) מוצפנים במנוחה באמצעות **AES-256-GCM**.

### כיצד זה עובד

```ts
// src/lib/db/encryption.ts (גרסה מפושטת)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### היכן נעשה בכך שימוש

- `provider_connections.api_key` — מוצפן ברמת היישום
- `provider_connections.access_token`,‏ `refresh_token`,‏ `id_token` — מוצפנים ברמת היישום
- רשומות `key_value` עם `namespace = "secrets"` — מוצפנות ברמת היישום
- `proxy_registry.auth` — מוצפן ברמת היישום (אם קיים)

### מפתח ההצפנה

מפתח ההצפנה נגזר מ**משפט סיסמה** (שמוגדר באמצעות משתנה הסביבה `STORAGE_ENCRYPTION_KEY`) ומ**מלח** (שמאוחסן במסד הנתונים). שניהם נדרשים כדי לפענח את הנתונים.

```bash
# יצירת משפט סיסמה מאובטח
openssl rand -hex 32

# הגדרה בקובץ .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **קריטי**: אובדן מפתח ההצפנה משמעו אובדן הגישה לכל הנתונים המוצפנים. **גבו את המפתח בנפרד ממסד הנתונים**.

### מה אינו מוצפן

משיקולי ביצועים, הפריטים הבאים מאוחסנים כטקסט גלוי:

- שמות התצוגה של הספקים
- הגדרות מודלים (כבר פומביות)
- כללי ניתוב
- רשומות שימוש (ללא מידע אישי מזהה)

---

## הסתייגויות בנוגע להצפנה (v3.8.16+)

OmniRoute משתמש ב-**`migrateLegacyEncryptedString()`** כדי לטפל בשקיפות בשתי שיטות הצפנה:

- **ישנה** (לפני v3.5.0): "הצפנה" מבוססת XOR (לא הצפנה אמיתית)
- **נוכחית**: AES-256-GCM עם IV ותג אימות תקינים

כלי העזר להעברה מזהה את התבנית הישנה ומצפין אותה מחדש באמצעות השיטה החדשה בקריאה הראשונה. משמעות הדבר היא שניתן לשדרג מסד נתונים ישן מבלי לאבד פרטי גישה.

---

## מטמון קריאה

עבור נתונים שנקראים לעיתים קרובות (מודלים, ספקים, הגדרות), `readCache.ts` מספק **מטמון בזיכרון**:

```ts
// נשמר במטמון בעת ההפעלה, מבוטל בעת כתיבה
const providers = await getCachedProviders(); // מהיר, בזיכרון
const fresh = await listProviders(); // איטי, ניגש למסד הנתונים
```

| ישות במטמון            | מפתח מטמון     | TTL       |
| ---------------------- | -------------- | --------- |
| `models`               | `models:v1`    | עד לכתיבה |
| `provider_connections` | `providers:v1` | עד לכתיבה |
| `settings`             | `settings:v1`  | עד לכתיבה |
| `combos`               | `combos:v1`    | עד לכתיבה |

המטמון מבוטל בכל כתיבה לטבלה המתאימה.

---

## גיבוי ושחזור

### גיבוי ידני

```bash
# השתמשו ב-CLI כדי ליצור גיבוי מקומי
omniroute backup create --name pre-migration

# או דרך ה-API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

קובץ הגיבוי כולל:

- את כל טבלאות מסד הנתונים (שעברו סריאליזציה ל-JSON)
- ארטיפקטים של יומן שיחות (מקודדים ב-base64, אופציונלי)
- הגדרות + סודות (מוצפנים)
- תצורת תוספים

### שחזור

```bash
# דרך ה-CLI
omniroute restore pre-migration

# דרך ה-API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **אזהרה**: השחזור מחליף את מסד הנתונים כולו. עצרו תחילה את כל הלקוחות.

### גיבויים אוטומטיים

```bash
# הפעילו גיבויים יומיים אוטומטיים דרך ה-CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

התזמון מבוצע בצד השרת באמצעות משימת רקע שפועלת כל 30 שניות
(כברירת מחדל) ומעריכה את ביטוי ה-cron לפי הזמן המקומי של השרת.

| משתנה                                       | ברירת מחדל | תיאור                                                                                                                   |
| ------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`    | מרווח הפעימות באלפיות השנייה (מינימום `5000`). עליו להיות קצר מ-60 שניות כדי לפעול באופן מהימן במהלך דקת ה-cron התואמת. |

### גיבוי חם של SQLite

לגיבוי ללא זמן השבתה של מסד נתונים פעיל:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

פעולה זו משתמשת ב-API הגיבוי המקוון של SQLite — ניתן להפעילה בבטחה בזמן ש-OmniRoute פועל.

---

## כוונון ביצועים

### מצב WAL

WAL מופעל כברירת מחדל. עבור עומסי עבודה בכתיבה גבוהה, שקול:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute לא מגדיר `journal_size_limit`. מחסום מעביר מסגרות WAL לתוך הקובץ הראשי, אך קובץ WAL שומר על הגודל המוקצה הגדול ביותר שלו. ה- `OMNIROUTE_WAL_GUARD_MAX_MB` guard רק מזהיר ומפעיל `wal_checkpoint(RESTART)`; זה לא מכסה בגודל דיסק.

### אינדקסים

אינדקסים מרכזיים לביצועים (נוצרים אוטומטית על ידי העברות):

- חיפושי מודל `idx_models_provider` — לפי ספק
- הרחבת יעד משולבת `idx_combo_targets_combo_id` —
- ניתוח שימוש `idx_usage_history_api_key_timestamp` —
- מעקב אחר מכסות `idx_quota_snapshots_api_key_window` —
- שאילתות יומן שיחות `idx_call_logs_timestamp` —

כדי להוסיף אינדקס חדש, צור העברה:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O ממופת זיכרון

עבור מסדי נתונים גדולים מאוד (> 10GB), ניתן להתאים את מיפוי הזיכרון באמצעות SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### דחיסה

מופעי OmniRoute ארוכי טווח נהנים מ- `VACUUM` מדי פעם:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

הפעל מדי חודש במהלך חלונות עם תנועה נמוכה. (מצב WAL מפחית את הצורך, אבל לא מבטל אותו.)

---

## בדיקת תקינות

`src/lib/db/healthCheck.ts` מספק **אבחון תקינות ברמת מסד הנתונים**:

שני הפעלים דורשים אימות (`401` אחרת). `GET` מבצע אבחון בלבד; `POST` מריץ את
אותה בדיקה כאשר `autoRepair` מופעל.

```bash
GET  /api/db/health   # אבחון
POST /api/db/health   # אבחון + תיקון
```

התגובה היא `DbHealthCheckResult` שמופקת על ידי `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "תקציבי דומיינים הפנו למפתחות API שכבר אינם קיימים.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| שדה               | משמעות                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | ערכו `true` כאשר `issues` ריק. `driver` לעולם אינו משפיע עליו.                                                                              |
| `issues[].type`   | אחד מבין `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                   |
| `repairedCount`   | מספר השורות שתוקנו במהלך הרצה זו; תמיד `0` כאשר `autoRepair` הוא false.                                                                     |
| `backupCreated`   | האם נוצר גיבוי לפני התיקון.                                                                                                                 |
| `checkedAt`       | חותמת זמן בתקן ISO המשותפת להרצה ולכל הערת תיקון שהיא כותבת.                                                                                |
| `driver.name`     | מנהל ההתקן של SQLite שמשרת את מסד הנתונים שנבדק.                                                                                            |
| `driver.degraded` | ערכו `true` כאשר הכתיבות אינן מגובות באופן עמיד בקובץ מסד הנתונים — חלופת ה-WASM מסוג `sql.js` (שמירה של הקובץ כולו) או מסד נתונים בזיכרון. |

אותו מטען מוחזר על ידי כלי ה-MCP‏ `omniroute_db_health_check`.

הריצו `PRAGMA integrity_check` כדי לזהות השחתה:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# אמור להדפיס: ok
```

אם מוחזר ערך כלשהו שאינו `ok`, **הפסיקו מיד להשתמש במסד הנתונים** ושחזרו מגיבוי.

---

## התאוששות מאסון

### תרחיש 1: קובץ WAL אבד

הקובץ `-wal` חסר, אך `-shm` ומסד הנתונים הראשי שלמים:

```bash
# מתבצעת התאוששות אוטומטית בפתיחה הבאה
omniroute
```

אם SQLite אינו מצליח לבצע התאוששות אוטומטית:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### תרחיש 2: קובץ מסד הנתונים הראשי נפגם

שחזרו מגיבוי:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` מוריד רק ארכיון `.tar.gz` מלא משרת פעיל
(`GET /api/db-backups/exportAll`, נדרשים פרטי הרשאה של מפעיל); הוא אינו משחזר דבר.

### תרחיש 3: מפתח ההצפנה אבד

**לא ניתן לבצע התאוששות** ללא המפתח. השדות המוצפנים אינם ניתנים לקריאה. הוסיפו מחדש את כל הספקים באופן ידני באמצעות פרטי הרשאה חדשים.

> **צמצום הסיכון**: גבו תמיד את מפתח ההצפנה בנפרד, רצוי במנהל סיסמאות או ב-KMS.

### תרחיש 4: הדיסק מלא

SQLite יחזיר שגיאות `SQLITE_FULL`. פנו שטח בדיסק, ולאחר מכן:

```bash
# בצעו נקודת ביקורת ל-WAL כדי לפנות שטח
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## פעולות נפוצות

### בדיקת טבלה

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### ספירת שורות בכל הטבלאות

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### איפוס (מחיקה) של כל הנתונים

```bash
# עצרו תחילה את OmniRoute
omniroute stop

# מחקו את קובץ מסד הנתונים
rm ~/.omniroute/storage.sqlite*

# הפעילו מחדש (ייווצר מחדש מסד נתונים ריק)
omniroute
```

לאיפוס **סלקטיבי** (שמירת הספקים ומחיקת נתוני השימוש):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### ייצוא טבלה בודדת

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## פתרון בעיות

### "מסד הנתונים נעול"

תהליך אחר מחזיק נעילת כתיבה. ניתן:

- להמתין לסיום התהליך האחר (בדקו באמצעות `lsof | grep storage.sqlite`)
- לסיים את התהליך האחר
- אם הבעיה נמשכת, להפעיל מחדש את OmniRoute

### "אילוץ מפתח זר נכשל"

מודול דומיין מפר את שלמות ההפניות. בדקו:

- שורות יתומות בטבלאות תלויות
- מחיקות מדורגות שלא התפשטו
- מיגרציה שבוצעה לאחרונה ושינתה מפתח זר

הריצו `PRAGMA foreign_key_check;` כדי לאתר הפרות.

### "אין מספיק זיכרון"

קלט/פלט ממופה-זיכרון של SQLite חורג ממגבלת מערכת ההפעלה. הקטינו אותו באמצעות pragma של SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB במקום 256MB
```

לחלופין, השביתו אותו:

```sql
PRAGMA mmap_size = 0;
```

### "המיגרציה נכשלה באמצע"

המיגרציה רצה בתוך טרנזקציה, ולכן השינויים אמורים היו להתבטל. אם לא:

1. **עצרו את OmniRoute** (כדי למנוע ניסיונות נוספים)
2. **בדקו את מצב מסד הנתונים** באמצעות `sqlite3`
3. **תקנו ידנית** את המיגרציה החלקית
4. **הפעילו מחדש** את OmniRoute (המיגרציה תתבצע שוב)

כדי למנוע זאת, בדקו תמיד מיגרציות על עותק תחילה.

---

## ראו גם

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — טבלאות שימוש
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — ניטור תקינות
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — תהליך שחרור
- מקור: `src/lib/db/` (יותר מ-80 קבצים, כ-25K שורות קוד)
