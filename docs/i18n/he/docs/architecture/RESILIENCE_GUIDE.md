# Resilience Guide (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute יש שלושה מנגנוני חוסן ברורים אך קשורים. לכל אחד יש היקף ומטרה אחרת. שמור אותם בנפרד בעת ניפוי באגים בהתנהגות ניתוב.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> מקור: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **עדיפות Env-vs-Dashboard עבור חילופי חוסן.** חוסן ההצטרפות הופך את ה-seeded מהסביבה — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — לספק רק את _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). בוליאן נמשך ב- `resilienceSettings` (Dashboard →** הגדרות → Resilience** / `PATCH /api/resilience`, מאוחסן ב- `key_value`) מנצח את ערך ה-env: נורמליזציה (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) שומרת על הבולאלי המאוחסן בכל פעם שקיים אחד. הגדרה של env var כזה ל- `true` בפריסה שבה לוח המחוונים כבר שמר את `false` ולכן לא משנה כלום. — הפוך את המתג פנימה** הגדרות → Resilience** (או נקה את השדה המאוחסן) במקום זאת.

## 1. מפסק מעגל ברמת ספק (Provider Circuit Breaker)

**היקף:** ספק שלם (למשל, `glm`, `openai`, `anthropic`).

**מטרה:** להפסיק לשלוח תעבורה לספק שנכשל שוב ושוב ברמת ה-upstream/השירות.

**מימוש:**

- מחלקת ליבה: `src/shared/utils/circuitBreaker.ts`
- חיווט: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- ‏API סטטוס: `GET /api/monitoring/health`
- ‏API איפוס: `POST /api/resilience/reset`
- עטיפות (Wrappers): `open-sse/services/accountFallback.ts`
- טבלת DB: `domain_circuit_breakers`

**מצבים:**

- `CLOSED` — תעבורה רגילה מותרת
- `DEGRADED` — תעבורה עדיין מותרת, אך כשלים מוגברים של הספק נמצאים במעקב; חוזר ל-`CLOSED` לאחר מספיק הצלחות, לאחר בדיקת חיבור תקינה, או לאחר החזקת ה-`OPEN` הארוכה ביותר עבור סוג הכשל האחרון (ערך ה-`cooldownByKind` שלו, אחרת `resetTimeout`, × `maxBackoffMultiplier`, לפחות cooldown אחד) ללא כשל חדש
- `OPEN` — הספק חסום זמנית; ניתוב combo מדלג עליו
- `HALF_OPEN` — הזמן הקצוב לאיפוס חלף; בקשת בדיקה (probe) מותרת

**ברירות מחדל ניתנות להגדרה (`open-sse/config/constants.ts`, חשופות תחת Dashboard → Settings → Resilience):**

| מחלקה   | נכנס ל-DEGRADED לאחר | נפתח (OPEN) לאחר | זמן קצוב לאיפוס |
| ------- | -------------------- | ---------------- | --------------- |
| OAuth   | 5 כשלים              | 8 כשלים          | 60s             |
| API-key | 7 כשלים              | 12 כשלים         | 30s             |
| Local   | נגזר                 | 2 כשלים          | 15s             |

‏`degradationThreshold` שולט מתי ספק נכנס ל-`DEGRADED`; `failureThreshold` שולט מתי הוא נפתח ומדולג עליו. פרופילי ספק מקומיים (Local) עדיין אינם חשופים בעמוד ההגדרות של Resilience.

**קודי שקיעה (Trip):** רק סטטוסים ברמת הספק `[408, 500, 502, 503, 504]`. אין לשקוע עבור שגיאות ברמת החשבון (רוב 401/403/429 — אלה שייכות ל-cooldown או ל-lockout).

**התאוששות עצלה (Lazy):** כשתוקף ה-`OPEN` פג, `getStatus()`, `canExecute()`, `getRetryAfterMs()` מרעננים את המצב ל-`HALF_OPEN`. אותן קריאות (והכשל הבא) מדרדרות `DEGRADED` מיושן חזרה ל-`CLOSED`. אין צורך בטיימר רקע.

---

### ‏Provider Cooldown גלובלי בהצטרפות (opt-in) — שער חלון

שכבה רביעית, **בהצטרפות (opt-in)** (`PROVIDER_COOLDOWN_ENABLED`, ברירת מחדל **כבוי**), שומרת זיכרון חוצה-בקשות של ספקים נכשלים ב-`open-sse/services/providerCooldownTracker.ts`, ופתרון יעדי combo נועץ בה כך שבקשות combo רצופות מפסיקות לחזור ולעבור על ספק שזה עתה נכשל. רשומות ברמת הספק מכבדות את שער החלון של `PROVIDER_PROFILES`:

| פרופיל  | שוקע לאחר (`providerFailureThreshold`) | בתוך (`providerFailureWindowMs`) | מתקרר למשך (`providerCooldownMs`) |
| ------- | -------------------------------------: | -------------------------------: | --------------------------------: |
| OAuth   |                                   `10` |                          `15min` |                            `5min` |
| API key |                                   `15` |                          `30min` |                           `10min` |

מתחת לסף, הספק **לא** נחשב כמתקרר; הצלחה מנקה את החלון. רשומות ברמת החיבור (`provider:connectionId`) שומרות במקום זאת על ה-backoff האקספוננציאלי `minRetryCooldownMs → maxRetryCooldownMs`. עקיפות (Overrides): `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. מנגנון הגנה מפני רגרסיה: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. תקופת צינון של חיבור

**היקף:** חיבור/חשבון/מפתח יחיד של ספק.

**מטרה:** לדלג על מפתח בעייתי אחד, בזמן שחיבורים אחרים של אותו ספק ממשיכים לשרת.

**יישום:**

- סימון כלא זמין: `src/sse/services/auth.ts::markAccountUnavailable()`
- בחירה: `getProviderCredentials*` באותו קובץ
- חישוב תקופת הצינון: `open-sse/services/accountFallback.ts::checkFallbackError()`
- הגדרות: `src/lib/resilience/settings.ts`

**שדות לכל חיבור:**

- `rateLimitedUntil` — חותמת הזמן שבה תקופת הצינון מסתיימת
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — מונה נסיגות מעריכיות

**תקופות צינון המוגדרות כברירת מחדל:**

- בסיס OAuth: 5s
- בסיס למפתח API: 3s
- 429 של מפתח API: מעדיף כותרות `Retry-After`/איפוס במעלה הזרם/טקסט איפוס שניתן לניתוח
- נסיגה: `baseCooldownMs * 2 ** failureIndex`

**השהיית ניסיון חוזר לפי ספק.** בדף פרטי הספק יש תיבת בחירה **Retry delay** (אוטומטי,
15s עד 1h). היא שומרת את
`resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, באמצעות `PATCH /api/resilience`). כאשר שגיאת הגבלת קצב אינה כוללת
רמז לניסיון חוזר במעלה הזרם, ערך זה מחליף את הנסיגה המותאמת לפי קנה מידה עבור הספק ומאפס את
`backoffLevel` ל-0
(`open-sse/services/rotationConfig.ts::overrideFor`). סדר העדיפויות עבור שגיאת הגבלת קצב, מהגבוה לנמוך: רמז לניסיון חוזר במעלה הזרם, לאחר מכן
`providerSpecificData.rotationOverrides.rateLimitResetSeconds` ברמת החיבור,
לאחר מכן השהיית הניסיון החוזר לפי ספק, לאחר מכן
`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, ולאחר מכן
הנסיגה המותאמת לפי קנה מידה. אוטומטי מסיר את השדה. הוא משפיע רק על הסיבה של הגבלת קצב, ולעולם לא על מצבים סופיים.

**הגנה מפני עדר מסתער:** מונעת מכשלים מקבילים להאריך יתר על המידה את תקופת הצינון או להגדיל פעמיים את `backoffLevel`.

**429 של מגבלת מקביליות אינם מטפסים בסולם הנסיגות.** `429` שגוף התגובה שלו מדווח על
מגבלת מקביליות ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) פירושו שהחשבון תקין אך עסוק.
`checkFallbackError()` מחזיר את הסיבה `concurrency_limited`: יש לעבור מיידית לחיבור הבא,
לצנן את החיבור הנוכחי למשך `CONCURRENCY_LIMIT_COOLDOWN_MS` קבוע (1s) או לפי רמז לניסיון חוזר במעלה הזרם,
להשאיר את `backoffLevel` ללא שינוי ולהגדיר את `skipProviderBreaker`.
גוף מפורש של מכסה עדיין גובר, לכן גוף שתואם גם לתבנית מכסה נשאר כפסק דין של מכסה. זיהוי:
`looksLikeConcurrencyLimit()` ב-`src/shared/utils/classify429.ts`;
פסק הדין: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (הערך
`FailureKind` של המפסק) נותר ללא שינוי ועדיין קורא את `rate_limit` עבור גופים אלה.

**עצירות בזרימת התוכן אינן מצננות את החשבון.** כאשר משגיח עצירת התוכן
(`open-sse/utils/streamHandler.ts`) מוותר על זרם שלא שלח פלט של מודל בזמן שהוקצב, `markAccountUnavailable()` מתעד את השגיאה בחיבור אך אינו מגדיר תקופת צינון: העצירה שייכת לבקשה זו, וברוב המקרים נגרמת מתור חשיבה ארוך שטרם הפיק פלט. מפעילים יכולים להצטרף מחדש באופן יזום באמצעות `resilienceSettings.streamStallCooldown.enabled` (ברירת המחדל היא `false`).

**אות השהיה אופציונלי לבחירת חשבון באמצעות `p2c`.** כל ניסיון ששוגר מתעד את הזמן עד לבייט הראשון ואת התוצאה לכל חיבור (ולכל חיבור + מודל) בחלון מתגלגל בזיכרון: 20 הדגימות האחרונות בתוך 15 דקות
(`open-sse/services/connectionLatencyTracker.ts`, מתועדות מ-`safeLogEvents()` ב-
`src/sse/handlers/chatHelpers.ts`). כאשר `resilienceSettings.p2cLatency.weight` גדול מ-
`0`
(הטווח 0-20, ברירת המחדל `0` = כבוי), `compareP2CConnections()` ב-`src/sse/services/auth.ts` מוסיף עד `weight` נקודות לכל מועמד בזוג. מחצית מהן מגיעה מהשהיה ביחס למועמד המהיר יותר (מהירות איטית פי שניים מקבלת את מלוא המחצית) ומחציתן משיעור השגיאות המתגלגל.
המונח חל רק כאשר לשני המועמדים יש לפחות 3 דגימות, כך שחשבונות חדשים אינם נענשים, והתקרה שלו נשארת מתחת לעונשים של חסימת מכסה ומכסה שמוצה. הוא אינו מוסיף מעגל משלו: חשבונות נכשלים עדיין מטופלים בשכבות תקופת הצינון, הנעילה והמפסק. הגדירו אותו באמצעות `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**מסגרות חשיבה מאתחלות את תקציב עצירת התוכן.** מודל חשיבה עשוי לחשוב במשך
דקות לפני האסימון הנראה הראשון שלו: Claude מזרים מסגרות `thinking_delta` שטקסט החשיבה שלהן עשוי להיות ריק, ו-Responses API מזרים פריט חשיבה אחד אחרי השני. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) מזהה מסגרות אלה, והמשגיח מאתחל את התקציב שלו בכל אחת מהן במקום לבטל את התור. הן עדיין אינן פלט של המודל, לכן תור שמסתיים בחשיבה בלבד עדיין מדווח כריק, ותור שמפסיק לחשוב ושולח רק פעימות לב עדיין מפעיל את המשגיח.

מסגרות `reasoningContentEvent` בינאריות של Kiro עם חתימה שאינה ריקה משמרות את פעילות החשיבה דרך המבצע בתור דלתא ריקה של `reasoning_content`. החתימה אינה מועברת. מטא-נתונים, מסגרות חלקיות וחתימות ריקות אינם מאתחלים את תקציב התוכן; פסק הזמן העצמאי של הזרם הפעיל וביטול מצד הלקוח עדיין חלים (`open-sse/executors/kiro/reasoning.ts`).

**מצבים סופיים (לא תקופות צינון):**

- `banned` — מוגדר על ידי זיהוי מילת מפתח אסורה / חסימת חשבון (ראו [BAN_DETECTION](../security/BAN_DETECTION.md)). סירובים במעלה הזרם לכל בקשה (`request_rejected`, למשל OAuth 403 של Anthropic "Request not allowed") לעולם אינם מגדירים אותו: הם נספרים לפי חיבור ומודל ומוציאים את המודל הזה מסבב הבחירה עם תקופת צינון מתארכת המוגבלת ל-`REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), או מצננים את החיבור כאשר לא ידוע מודל — `open-sse/services/requestRejectedStreak.ts`
- `expired` (עובר למצב סופי לאחר מספר ניסיונות חוזרים מוגבל — `EXPIRED_RETRY_MAX = 3` עם נסיגה מעריכית — כדי ששגיאות OAuth זמניות יוכלו להשתקם מעצמן לפני שהחשבון מושבת לצמיתות)
- `credits_exhausted`

אלה נשמרים עד שהפרטים משתנים או שמפעיל מאפס אותם. אין להחליף מצבים סופיים במצב השהיה זמני.

**התאוששות עצלה:** כאשר `rateLimitedUntil` חלף, החיבור הופך שוב לזכאי לשימוש. לאחר שימוש מוצלח, `clearAccountError()` מנקה את כל שדות השגיאה.

### חומת השימוש ב-Claude OAuth: נתיב בעדיפות נמוכה + איפוס מגבלת הסשן

**היקף:** חיבור אחד של מנוי Claude (OAuth). שתי התכונות הן **אופציונליות לכל חיבור** (עריכת חיבור → מקטע Claude → `lowPriorityMode` / `autoLimitReset` בתוך `providerSpecificData`, שתיהן מושבתות כברירת מחדל) ומשקפות את הפקודות `/low-priority` ו-`/limit-reset` של Claude Code (חוזה התקשורת נלכד מ-Claude Code 2.1.263).

**מימוש:**

- מכונת מצבים וסיווג תגובות: `open-sse/services/claudeLowPriority.ts`
- לקוח סטטוס/תביעה לאיפוס: `open-sse/services/claudeLimitReset.ts`
- וו למבצע (הזרקת כותרת + ניסיון חוזר באותו חשבון): `open-sse/executors/base.ts::execute()`
- שמירת ההסכמה: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**הפעלה:** חומת השימוש של 5 השעות — `429` שהכותרות שלו כוללות
`anthropic-ratelimit-unified-status: rejected` וכן, כאשר החשבון זכאי,
`anthropic-ratelimit-unified-slow-offer: treatment`. לא נשלח דבר לפני ה-`429` הראשון של החומה; `429` מתפרץ ללא כותרות מאוחדות עובר בנתיב ההשהיה הרגיל.

**נתיב בעדיפות נמוכה** (`lowPriorityMode`):

- ב-`429` של החומה, המבצע מקבל את ההצעה ומנסה מיד שוב באותו
  חשבון עם `anthropic-usage-limit: slow`; הנתיב נשאר פעיל עד
  `anthropic-ratelimit-unified-reset` שהוכרז (+ חסד של 60 שניות), וכל בקשה
  בחלון הזה כוללת את הכותרת. ה-`429` שיורט לעולם אינו מגיע אל `handleChatCore`, ולכן החיבור
  **אינו** מועבר למצב השהיה ואינו מוחלף.
- `anthropic-ratelimit-unified-slow-status` בתגובות מאוחרות יותר: `active` / `not_needed`
  משאירים את הנתיב פעיל; `slot_busy` (`429`) או `529` ממתינים לערך
  `anthropic-ratelimit-unified-slow-retry-after` של השרת (ברירת מחדל 20 שניות, הגבלה ל-5–600 שניות, עם
  ריצוד של ±30%) ומנסים שוב, בכפוף ל-`anthropic-ratelimit-unified-slow-max-wait` (ברירת מחדל 20 דקות, הגבלה
  מדקה עד 6 שעות) — לאחר מכן הנתיב מסתיים וצינון של 10 דקות חוסם קבלה מחדש. זמן
  ההמתנה מוגבל בנוסף לפי הזמן שנותר עד לתום הזמן הקצוב להתחלת הבקשה מול ספק המקור
  (`resolveFetchStartTimeout`, ברירת מחדל 10 דקות), פחות מרווח של 5 שניות: ללא הגבלה זו, ברירת המחדל של
  20 דקות ל-`max-wait` הייתה חורגת מזמן הבקשה, והשינה הייתה נקטעת באמצע ההמתנה ומציגה
  `TimeoutError` במקום סיום תקין של `max_wait` + צינון.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, התהפכות של חלון 5 השעות, או
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (מה שמסיים אותו כ-`extra_usage`
  בכל סטטוס, מכיוון שחריגה בתשלום מכסה כעת את החומה) מסיימים את הנתיב; לאחר מכן התגובה
  עוברת לנתיב ההשהיה הרגיל. `budget_exhausted` נשמר עד לאיפוס התקציב שהוכרז (עד 8 ימים).
- בדיקת החומה מתבצעת לאחר ניסיונות החזרה הפנימיים של המבצע עצמו, המופעלים בעקבות 400 (עריכת
  הקשר, הגבלות thinking/effort, לימוד אוטומטי של פרמטרים), כך ש-`429` של חומה שמופיע רק באחד
  מהניסיונות החוזרים האלה עדיין ייורט במקום להגיע לנתיב ההשהיה.
- המצב נמצא בזיכרון לכל חיבור (הפעלה מחדש גוררת `429` נוסף של החומה לפני קבלה מחדש).

**איפוס מגבלת הסשן** (`autoLimitReset`, מתבצע לפני הנתיב כאשר שניהם מופעלים):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → בלוק
  `juniper_tide`; כאשר `arm: "reset"` ו-`available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` עם
  `{ "program": "juniper_tide" }` (מזהה הארגון UUID מתוך
  `providerSpecificData.organizationUUID`, עם חלופה מתהליך האתחול).
- `result: reset|not_limited` → הבקשה נשלחת שוב במהירות מלאה (ללא כותרת slow).
  `already_used` / `not_offered` שומרים בזיכרון את `next_available_at` (ברירת מחדל שבוע אחד);
  כל כשל גורם להשהיה של 15 דקות. האיפוס מתבצע פעם בשבוע ועדיין נספר במסגרת המגבלה השבועית.

בדיקות רגרסיה: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### החל אוטומטית איפוסים בנקאיים

**תְחוּם:** חיבורי מנוי Codex ו- Claude (OAuth).**הצטרפות** : הגדרת `bankedResetAutoApply` כבויה ובמצב `dry-run` כברירת מחדל (הגדרות → AI → החלה אוטומטית של איפוסים בנקאיים).

**מַטָרָה:** להוציא איפוסים בנקאיים בעצמם כאשר חשבון פוגע בקיר שימוש, במקום לחכות למפעיל שילחץ על "פדה" בדף מגבלות הספק.

| סוג אשראי (`creditTypes`) | מה נגאל                                     | איפה זה רץ                                               |
| ------------------------- | ------------------------------------------- | -------------------------------------------------------- |
| `codexCredits`            | Codex איפוס קרדיטים                         | עבודת רקע, כל 60 שניות                                   |
| `claudeCredits`           | מענקים בנקאיים של Claude (זיכויים `GRANT` ) | עבודת רקע, כל 60 שניות                                   |
| `claudeSessionReset`      | איפוס מגבלת ההפעלה השבועית Claude (מעל)     | נתיב הבקשה, באמצעות אותה מדיניות כמו החלפת מצב לכל חשבון |

**יישום:**

- החלטה טהורה (חוק אחד נקבע לשני הנתיבים): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- עבודת רקע: `src/lib/services/bankedResetAutoApply.ts` (החל ב- `src/instrumentation-node.ts`)
- שער בקשה-נתיב Claude : `src/lib/usage/claudeSessionResetPolicy.ts`, רשום דרך `setClaudeLimitResetPolicy()` ב- `open-sse/services/claudeLimitReset.ts`
- היסטוריה, מכסים ו-webhook: `src/lib/usage/bankedResetAudit.ts`
- היסטוריה API: `GET /api/settings/banked-reset-auto/history?limit=50` (אישור ניהול)

**צו החלטה** (הכלל הכושל הראשון הוא הסיבה הרשומה):

1. כבוי תכונה, השבתת סוג אשראי או חשבון מחוץ לתחום (`accountScope` `all` / `selected` בתוספת מפת `connections` לכל חשבון).
2. מחוץ ללוח הזמנים האופציונלי UTC (`startHourUtc` > `endHourUtc` חוצה חצות).
3. מכסים במהלך 24 השעות האחרונות: `maxPerAccountPerDay` (1), `maxPerDay` (3) ו- `minSpacingMinutes` (30) בין כל שני מימושים.
4. טריגר: חלון `session` או `weekly` מוקף חומה (קרא מ- `getQuotaWindowStatus().reachedThreshold`, לא `isAccountQuotaExhausted()`, שמדווח רק על חשבון עם כל חלון שהוצא), או זיכוי שיפוג בתוך `expiringCreditHours` (24) בחשבון שהשתמש `expiringCreditMinUsedPercent` לפחות (50).
5. שומר איפוס טבעי: דלג כאשר חלון 5 השעות המוקף חומה מתאפס בתוך `sessionResetGuardMinutes` (90), או החלון השבועי המוקף חומה בתוך `weeklyResetGuardHours` (12).
6. קומה שבועית: דלג על איפוס של 5 שעות כשהנותר השבועי הוא מתחת `weeklyFloorPercent` (10).
7. מצב `last-resort` : דלג בעוד חשבון אחר בהיקף של אותו ספק נשאר לפחות `poolHeadroomPercent` (10) בשני החלונות. מפעילי אשראי שפג תוקפו עוקפים זאת.
8. `dry-run` מקליט שורה ולא פודה דבר; `last-resort` ו- `eager` לפדות.

נתוני מכסה חסרים אף פעם לא פותחים מימוש: זמן איפוס לא ידוע או שימוש שבועי מדלגים.

**איפוס הפעלה Claude :** כשהתכונה כבויה, או `claudeSessionReset` כבויה, החלפת ה- `autoLimitReset` לכל חשבון מחליטה בדיוק כמו קודם. כאשר שניהם מופעלים, התכונה מחליפה את החלפת מצבים לפי חשבון: חשבון בהיקף יכול לתבוע רק כאשר המדיניות מאפשרת זאת, ובמצב `dry-run` לא מוגשת תביעה.

**בְּטִיחוּת:** המשרה מממשת לכל היותר זיכוי אחד לכל סימון, מחליטה לפני רישום זיכויים (חשבון שדילג עליו לעולם לא מופיע ברשימה), משתמשת במפתחות אימפוטנציה `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>`, ומחזירה חשבון למשך שעה אחת לאחר רישום או מימוש שנכשל. כל פדיון, כישלון והחלטה יבשה נכתבת ל- `audit_log` (`action: "bankedReset.redeem"`, ללא אסימונים או מזהי אשראי); המכסים נספרים מהשורות האלה, כך שהם שורדים הפעלה מחדש. מימושים מוצלחים גם מפעילים את ה- `provider.reset_redeemed` webhook.

משמרות רגרסיה: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### זיקה לסשן (#7274)

**היקף:** סשן לקוח אחד (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) מוצמד לחיבור אחד, עבור **כל** ספק.

**מטרה:** להשאיר סוכן רב-תורי (Claude Code, aider, סוכנים מותאמים אישית) באותו חשבון לאורך הבקשות, לצמצום אובדן הקשר בין חשבונות והופעות חוזרות של `429` בזמן אתחול קר אצל ספקים עם מצב סשן לכל חשבון.

**מימוש:**

- פתרון TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- בחירה/יצירה של הצמדה: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- חילוץ כותרת (גנרי, כל ספק): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- טבלת הצמדה שנשמרת: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- הגדרה: `sessionAffinityTtlMs` (TTL גלובלי באלפיות שנייה, `0` משבית) — `src/lib/db/settings.ts`. שונה השם מ-`codexSessionAffinityTtlMs`, שהיה מיועד ל-Codex בלבד, באמצעות ההגירה `124_generic_session_affinity_ttl.sql`, שמעבירה כל TTL של Codex שהוגדר בעבר כברירת המחדל החדשה.

לפני #7274, `resolveSessionAffinityTtlMs()` הפסיקה מיד עם `0` עבור כל ספק שאינו
`codex`, ולכן להגדרת ה-TTL (ולכותרות הסשן) לא הייתה השפעה בשום מקום אחר, אף שמנגנון ההצמדה וחילוץ הכותרות כבר היו בלתי תלויים בספק. התיקון הסיר את ההחזרה המוקדמת; כעת ה-TTL חל באופן אחיד על כל ספק לאחר הגדרה גלובלית לערך גדול מ-`0`.

שלוש כותרות זיקת הסשן לעולם אינן מועברות לספק המקור — המבצעים בונים את כותרות ספק המקור
שלהם מאפס במקום להעביר כותרות לקוח, ולכן זה נשאר מזהה מתאם פנימי בלבד.

### חכירות בלעדיות של חיבורי סשן מנוהלים

**היקף:** לקוח/סשן HTTP מנוהל פעיל אחד מחזיק בחיבור OmniRoute כשיר אחד.

**מטרה:** לספק בעלות בלעדית מתמשכת על חיבור עבור לקוחות הזקוקים לגדר ניתוב קשיחה
בין בקשות. הדבר שונה מזיקה לסשן, שהיא העדפה רכה להמשכיות:
חכירה בלעדית מתמידה את מצב מחזור החיים ב-SQLite, אוכפת ייחודיות גלובלית של בעלים פעילים
ושל חיבורים פעילים, ודוחה דור מיושן לפני שליחה לספק.

התכונה מופעלת לפי מפתח API. למפתח מנוהל חייבת להיות ההרשאה `lease:exclusive` ורשימת
`allowedConnections` מפורשת שאינה ריקה. כל לקוח HTTP יכול להשתמש בנקודת הקצה של מחזור החיים;
אין צורך בשם לקוח, ב-user-agent, בספק, בשיטת OAuth או במודל. החכירה מחזיקה בחיבור,
לא במודל, ולכן שינוי מודל משמר את הקישור כל עוד החיבור נותר כשיר בהתאם לכללים הרגילים.
כללי המודל, המכסה, התקינות, תקופת הצינון ורשימת ההיתרים הרגילים נותרים מוסמכים ועשויים
להעביר את אותו דור לחיבור כשיר פנוי אחר.

מחזור החיים הוא `POST /api/v1/session-leases` עם פעולות JSON מסוג `acquire`, `renew` ו-`release`.
בקשות הסקה מנוהלות מציגות את הערך האטום `X-OmniRoute-Lease-Owner` ואת
`X-OmniRoute-Lease-Generation` המדויק. הבעלים משתמש ב-`vlo_` ואחריו 43 תווים של base64url;
רק גיבוב ה-SHA-256 שלו נשמר. כל גדר שליחה סופית מקשרת גם את מזהה מפתח ה-API המאומת ואת מזהה
החיבור הפעיל. כותרות בקרת החכירה מוסרות מהיומנים, מתצלומי הבקשות הנשמרים ומכותרות
מבצע ה-upstream.

אם לניתוב רגיל יש מועמדים מנוהלים כשירים, אך כל מועמד פנוי תפוס על ידי חכירה פעילה זרה,
OmniRoute מחזיר HTTP `429`, קוד `lease-capacity-unavailable`, מצב
`waiting-for-capacity`, ו-`Retry-After` חסום הנגזר מתום התוקף הרלוונטי המוקדם ביותר.
היעדר זכאות רגיל אינו התמודדות על חכירה ושומר על סמנטיקת שגיאות הניתוב הקיימת.

המנגנונים הקשורים נותרים נפרדים:

- תפוסת סשן OAuth היא הפצה רכה, מקומית לתהליך, עבור חשבונות OAuth.
- סמפורים של חשבונות מעניקים היתרים למקביליות של בקשות ומסתיימים כאשר בקשה מסתיימת.
- חכירות סשן מנוהלות בלעדיות הן בעלות מתמשכת של מחזור החיים עם גדר דור.

## 3. נעילת מודל

**תחום:** השלשה של ספק + חיבור + מודל.

**תחום לפי סטטוס:** הסטטוס שנכשל קובע לאיזה מפתח נעילה נכתבת
(`resolveLockoutScope()` ב־`open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — אות למכסה או לזכאות — נועלים את **משפחת המכסה**:
  עבור codex את כל תחום `codex` / `spark` (כל מודל `gpt-5*` של
  החיבור), ועבור ספקים אחרים את `getQuotaScopedModelForProvider()`.
- `404` נועל את המודל הבסיסי (`getModelLockKey()` מצמצם את `not_found`).
- כל סטטוס אחר — כשלי תעבורה/שרת מסוג `5xx` ו־`502` שה־OmniRoute
  מייצר בעצמו בעקבות אימות איכות — נועל רק את השלשה **המדויקת** של
  ספק/חיבור/מודל. זרם פגום במודל אחד אינו מעיד על מכסת החשבון; לפני כלל זה,
  תגובה ריקה אחת ב־`codex/gpt-5.6-luna` הסירה מניתוב כל מודל `gpt-5*` של
  אותו חיבור למשך 2–30 דקות (בהסלמה), בעוד שהמכסה שלו נותרה ללא שינוי.
- אפשרות `scope` מפורשת של הקורא תמיד גוברת (Antigravity מעביר `"exact"`).

**מטרה:** להימנע מהשבתת חיבור שלם כאשר רק מודל אחד אינו זמין או מוגבל במכסה.

**דוגמאות:**

- ספקי מכסה לכל מודל שמחזירים 429
- ספקים מקומיים שמחזירים 404 עבור מודל חסר אחד
- כשלים בהרשאת מצב/מודל הספציפיים לספק (לדוגמה, מצבי Grok)

**מימוש:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### לוח בקרה לצינון מודלים (v3.8.0)

ממשק משתמש: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

מציג נעילות פעילות עם: ספק, חיבור, מודל, סיבה, expiresAt. מפעילים יכולים להפעיל מחדש מודל באופן ידני מהכרטיס.

**REST API:**

- `GET /api/resilience/model-cooldowns` — הצגת נעילות פעילות
- `DELETE /api/resilience/model-cooldowns` — הפעלה מחדש ידנית. גוף: `{provider, connection, model}`. אימות: management.

### מנהל הצינון

ממשק משתמש: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

דף אחד עבור כל חיבור שאינו מנותב מסיבה זמנית, במקום לפתוח את הדף של כל ספק בנפרד. הוא מציג צינוני חיבורים, נעילות מודלים ומצבים סופיים, מנקה אותם לפי חיבור, עבור בחירה מסוימת או עבור כל החיבורים של ספק, ועורך את כללי הצינון שנעשה בהם השימוש הרב ביותר: `streamStallCooldown.enabled` וצינון הבסיס והשלבים המרביים של הנסיגה האקספוננציאלית עבור `connectionCooldown` של OAuth / API-key (נשמרים באמצעות `PATCH /api/resilience`). מצבים סופיים (`banned`, `expired`, `credits_exhausted`) מוצגים אך לעולם אינם מנוקים כאן.

כרטיס **כללי צינון שגיאות** באותו דף עורך את כללי השגיאות של המפעיל
(`settings.providerErrorRules`) ואת ברירות המחדל הכוללות לכל ספק
(`settings.providerErrorDefaults`) באמצעות `PATCH /api/settings` — ראו
"כללים שהוגדרו על ידי המפעיל" תחת §7 כדי להבין כיצד הם מותאמים. משכי הזמן הם ברירת מחדל (ללא צינון מפורש), 30 דקות, שעה, 5 שעות, 24 שעות או ערך מותאם אישית של 1 עד 43,200 דקות (30 יום).

**REST API** (`src/lib/resilience/cooldownManager.ts`, אימות: management):

- `GET /api/resilience/cooldowns[?provider=]` — חיבורים עם סטטוס, זמן הצינון שנותר, רמת נסיגה, סוג השגיאה האחרון ונעילות מודלים (ללא פרטי התחברות)
- `POST /api/resilience/cooldowns` — גוף `{connectionIds: string[]}` או
  `{all: true, provider?}`; מחזיר `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### ממשק הגדרות לנעילת מודלים + התאוששות באמצעות דעיכת הצלחות (v3.8.23)

נעילת מודלים עברה מהתנהגות קשיחה שתמיד מופעלת ומקודדת ישירות בקוד, לתכונה הניתנת להגדרה מלאה ולהפעלה לפי בחירה, עם כרטיס הגדרות משלה ונתיב התאוששות מתקן-עצמו.

**כרטיס הגדרות:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
הכרטיס הזה **נבדל** מ־`ModelCooldownsCard` לקריאה בלבד שלעיל (שבו רק
_מוצגות_ נעילות פעילות) — הכרטיס החדש _מגדיר את הפרמטרים_. ברירות המחדל נמצאות ב־`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| הגדרה                   | ברירת מחדל                       | משמעות                                                 |
| ----------------------- | -------------------------------- | ------------------------------------------------------ |
| `enabled`               | `false`                          | מתג ראשי — נעילת מודלים **כבויה כברירת מחדל**.         |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | סטטוסים מהמקור שנחשבים לכשל בתחום המודל.               |
| `baseCooldownMs`        | `120_000` (120 s)                | משך הנעילה ההתחלתי עבור הכשל הראשון.                   |
| `maxCooldownMs`         | `1_800_000` (30 min)             | תקרת הצינון לאחר הסלמה.                                |
| `maxBackoffSteps`       | `10`                             | המספר המרבי של שלבי הסלמה בנסיגה אקספוננציאלית.        |
| `useExponentialBackoff` | `true`                           | האם כשלים חוזרים מסלימים את הצינון באופן אקספוננציאלי. |

ההגדרות נשמרות דרך מאגר ההגדרות הרגיל ועוברות אימות באמצעות סכמת הגדרות העמידות; הכרטיס מגביל את `baseCooldownMs`/`maxCooldownMs`
(כאשר `maxCooldownMs ≥ baseCooldownMs`) ואת `maxBackoffSteps`.

**התאוששות באמצעות דעיכת הצלחות:** ההתאוששות אינה מבוססת **רק** על פקיעת טיימר. תגובה תקינה מפחיתה בהדרגה את מונה הכשלים של המודל, כך שמודל שהתאושש באמצע חלון הזמן מפסיק להסלים (והנעילה מתנקה) לפני שהטיימר שלו היה פג. ביעד combo שהצליח, `open-sse/services/combo.ts` קורא ל־`decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), שמחלק **בחצי** את
`failureCount` המאוחסן (`Math.floor(failureCount / 2)`); כאשר הוא מגיע ל־`0`, רשומת הנעילה נמחקת לחלוטין. המקבילה `recordModelLockoutFailure()`
מגדילה את המונה (ומסלימה את הצינון) בכשלים המתרחשים בתוך חלון ההסלמה. דעיכת הצלחות זו מתווספת לפקיעת טיימר רגילה — כל אחד מהמסלולים יכול להפעיל מחדש מודל.

**מצב:** נעילות חסימה נשמרות **בזיכרון** (`Map`s לכל תהליך של
`ModelLockoutEntry`, עם מפתחות לפי `provider:connectionId:model`, ונעילות בהיקף מדויק לפי
`provider:connectionId:exact:model`), ולא נשמרות
במסד הנתונים — הן אובדות בעת הפעלה מחדש. _ההגדרות_ נשמרות; _מצב_ נעילת החסימה הפעילה הוא זמני.

---

## 4. בקרת מקביליות באמצעות מכסת שיתוף (v3.8.36)

חשבונות מנוי (GLM, ‏MiniMax וכו') מקבלים לעיתים קרובות רק כ־1–3
בקשות במקביל; חריגה מכך מפעילה שגיאות 429 וזמני צינון. הדבר חמור במיוחד תחת
צירופי **מכסת שיתוף** (`qtSd/…`), שבהם כמה מפתחות API חולקים
חשבון upstream אחד. שלוש שכבות מונעות הצפה של חשבון משותף.

### מגבלת מקביליות לכל חיבור (`max_concurrent`)

כל חיבור ספק יכול להצהיר על תקרת `max_concurrent`
(`provider_connections.max_concurrent`, המוגדרת בחלון החיבור / ב־API / במסד הנתונים).
השאירו אותה ריקה כדי לא להגדיר מגבלה. זהו המשתנה היחיד שמפעיל את שכבת הסריאליזציה
שלמטה — הגדירו אותו למקביליות בפועל של החשבון (לדוגמה, GLM בערך 1, ‏MiniMax בערך 2).

### מגבלות מקביליות לכל מודל (`modelConcurrency`)

חיבור יכול להצהיר בנוסף על תקרות מקביליות מדויקות לכל מודל
בתוך מפת `rateLimitOverrides` שלו:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

הגדירו זאת בחלון החיבור (**Rate limit overrides → Per-model
concurrency caps**, רשומה אחת של `model=cap` בכל שורה) או באמצעות
`PATCH /api/providers/[id]` עם אותו מבנה JSON. סמנטיקת המפתחות:

- **כלל החיבור לעומת ספציפי למודל:** `maxConcurrent` נשארת התקרה המשותפת
  לכל החיבור. כאשר שתיהן חלות, שני השערים נרכשים באופן אטומי באותו שער מורכב
  (`global → provider → account → model`); ההתנהגות בפועל כפופה למגבלה
  המחמירה יותר מבין המגבלות החלות.
- **התאמה מדויקת למפתח המודל:** המפתח הוא מחרוזת המודל המועברת למבצע
  לאחר השלמת הניתוב — בדרך כלל מזהה המודל הגולמי של ה־upstream
  (`glm-5`), ולא כינוי `provider/model` בצד הלקוח (`zai/glm-5` אינו תואם
  ל־`glm-5`). הערכים הם תקרות חיוביות של מספר בקשות במקביל.
- **תור מקומי, ללא גילוי:** בקשות עודפות ממתינות בתור מקומי בהתאם לסמנטיקת
  התור/פסק הזמן הקיימת (שגיאות קבלה מוקלדות `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute אינו מגלה או מסיק מדיניות upstream — הוא
  אוכף את התקרות המדויקות שהמפעיל הגדיר. שער מודל רווי לעולם אינו משבית את הספק
  ולעולם אינו יוצר חסימה קבועה של מודל; ההתנהגות של 429/צינון/חלופה מצד ה־upstream
  נשארת מנגנון הגיבוי לשגיאות.
- **היקף לכל חיבור ולכל תהליך:** המגבלות חלות לכל חיבור במסד הנתונים ונשמרות
  בזיכרון, ולכן שני חיבורים המשתמשים מחדש באותו מפתח API של upstream אינם
  מתאמים ביניהם.
- **לא מוגדר פירושו ללא שינוי:** השמטת המפה (או השארת שדה לוח הבקרה ריק)
  אינה מוסיפה שער מודל. דוגמה לתצורה שאינה מצהירה על מגבלת ספק אוניברסלית כלשהי:

```text
glm-5=1
glm-4.7=3
```

### סריאליזציה של בקשות במכסת שיתוף

כאשר שיגור של מכסת שיתוף מכוון לחיבור שמצהיר על
`max_concurrent` חיובי, בקשות במקביל לאותו **חשבון** עוברות סריאליזציה
באמצעות סמפור לכל חיבור (מפתח `qsconn:<connectionId>`): בקשות עודפות **ממתינות
בתור** במקום להציף את החשבון. המנגנון הוא **fail-open** — תור רווי או פסק זמן
ממשיכים ללא חריץ, במקום לדחות אי פעם בקשה שניתן לשגר. ניתן להפעיל או להשבית אותו
ב־**Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, מופעל
כברירת מחדל). ללא מגבלת `max_concurrent`, ההתנהגות אינה משתנה.

> שער ניתוב מכסת השיתוף (`selectQuotaShareTarget`, ‏DRR + ‏P2C) הוא בעצמו
> fail-open ורק _מוריד את העדיפות_ של חיבור שהגיע לתקרה — במאגר בעל חיבור יחיד
> הוא אינו יכול להגביל בפועל, ולכן סמפור זה הוא שמכיל את ההצפה בפועל.

### ניסיון חוזר המודע לזמן צינון של צירופים

עבור כל אסטרטגיית צירוף (כאשר היא מופעלת), בקשה שתגבש שגיאת 429
עקב זמן צינון חולף קצר ממתינה עד לסיומו ומשוגרת מחדש במקום להחזיר את
שגיאת 429 — הדבר מכסה חלונות TPM/RPM מסוג Gemini (retry-after של כ־60 שניות)
בצירופים מרובי־מודלים, לדוגמה כאשר שני היעדים בצירוף בן שני מודלים מגיעים
למגבלת קצב לכל מודל. המנגנון מוגבל באמצעות `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) תחת
**Settings → Resilience**. הוא לעולם אינו ממתין עבור `quota_exhausted`
(נעול עד חצות) או עבור סיבות של אימות/משאב שלא נמצא.

צירוף יכול לבחור שלא להשתתף באמצעות `config.comboCooldownWaitEnabled: false`.
רק `false` מילולי משבית את ההמתנות המשותפות האלה (צינון לאחר שיגור והמתנות
לפני שיגור עקב מעגל פתוח/נעילת מודל) ואת הארכת רצפת פסק הזמן של תקציב ההמתנה.
ערך חסר או `true` משמרים את המדיניות הגלובלית; `true` אינו יכול להפעיל
המתנה שהושבתה גלובלית. `targetTimeoutMs` מפורש עדיין גובר. בחירה זו אינה משנה
את ההמתנה הנפרדת לפני שיגור של הצמדת תור native-Codex.

אותו שער מכסה גם את המקרה שלפני השיגור (#16319): כאשר כל יעד בצירוף
נדלג לפני שנעשה ניסיון כלשהו, משום שהמודל שלו נמצא בחסימה חולפת קצרה,
הנתיב ללא ניסיונות ממתין עד להסרת החסימה תחת אותן תקרות ומשגר מחדש,
במקום להשיב `503 ALL_TARGETS_SKIPPED` ללא רמז. כאשר אין אפשרות להמתין
(התקרה, מספר הניסיונות או התקציב מוצו, או שהתכונה מושבתת), תגובת הסיום משתדרגת ל־
`429 rate_limit_error` ונושאת את `retry_after` / `reset_at` ממועד פקיעת
החסימה החולפת המוקדם ביותר; חסימות של מכסה, אימות ומשאב שלא נמצא משמרות את
שגיאת 503 ללא רמז.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. בקרת קבלה לתור הבקשות (v3.8.49 · issue #6593)

**היקף**: תור הגבלת הקצב המקומי לכל צמד ספק+חיבור (`open-sse/services/rateLimitManager.ts`, המבוסס על Bottleneck), שכבה אחת מתחת לשלושת המנגנונים שתוארו לעיל.

**`maxWaitMs` תוחם את ההמתנה בתור; `executionMaxWaitMs` תוחם את הביצוע.**
השניים מופרדים בכוונה, ואף אחד מהם אינו מזין את השני.

`resilienceSettings.requestQueue.maxWaitMs` הוא **תקציב ההמתנה בתור**: הוא מכסה המתנה לחריץ פנוי אצל הספק ולאחר מכן שהייה במצב QUEUED, והטיימר שלו מתנקה ברגע שהמשימה יוצאת מ-QUEUED ומתחילה להתבצע (`rateLimitManager.ts`, `wrappedFn`). בקשה שחורגת ממנו לעולם אינה מגיעה ל-upstream. ברירת המחדל היא 30000ms, מסופקת על ידי `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` ב-`src/lib/resilience/settings.ts` ונעוצה על ידי `tests/unit/ratelimit-admission-control-6593.test.ts`, כך ששינוי שלה הופך את הטסט ההוא לאדום במקום להשאיר את הפסקה הזו מיושנת בשקט.

`resilienceSettings.requestQueue.executionMaxWaitMs` הוא מה ש-Bottleneck מקבל בתור ה-`expiration` של המשימה, שהטיימר שלו מתחיל רק לאחר השיגור (dispatch). הוא רשת ביטחון עבור executors שאין להם timeout משלהם מול ה-upstream, והוא מועלה ל-timeout של תחילת ה-fetch של ה-executor עצמו כאשר זה ארוך יותר, כך שהוא אינו יכול לקטוע תגובה תקינה שכבר בתעופה. ברירת מחדל 600000ms (10 דקות).

הזנת תקציב התור לתוך `expiration` היא מה שנהג לקטול שערים (gateways) לא-אינקרמנטליים באמצע הטיסה — הם רצים באופן לגיטימי במשך דקות לפני הבתים הראשונים — וזו הסיבה ש-expiration מוצג כ-`code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) בעוד שתקציב התור נושא את קוד ה-timeout של התור. ניתן לדרוס כל אחד מהם דרך `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (משתני סביבה) או דרך לוח הבקרה (**Settings → Resilience**). שניהם מוגבלים (clamped) לטווח 1ms–24h בעת הנרמול.

**קדימות, עבור שניהם:** משתנה הסביבה מספק רק את _ברירת המחדל_. ערך שנשמר ב-`resilienceSettings.requestQueue` (לוח בקרה / API patch, מאוחסן ב-`key_value`) גובר עליו, ו-`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` ברמת חיבור בודד גובר על אותו ערך. לכן, הגדרת משתנה הסביבה בפריסה (deployment) שכבר קיים בה ערך שמור אינה משנה דבר — יש במקום זאת לנקות או לעדכן את ההגדרה השמורה.

השהייה בתור תחומה על ידי `maxWaitMs`; `maxQueueDepth` שלמטה תוחם כמה מתקשרים רשאים להיות בתור בו-זמנית.

**ניסיונות חוזרים המצוינים בגוף התגובה: pacing מול lockout.** גוף של 429 יכול לציין זמן המתנה משלו (`RetryInfo.retryDelay` של Gemini, טקסט "retry after Ns"), ש-`updateFromResponseBody` קורא. המתנה שמתאימה ל-`maxWaitMs` של החיבור היא pacing: המגביל מרוקן את המאגר שלו לאותו פרק זמן וקריאות בתור משוגרות כשהוא מתמלא מחדש. המתנה ארוכה מ-`maxWaitMs` אינה משהו שהתור יכול להמתין לו — Gemini משיב על מכסה יומית מוצתה עם `retryDelay: "86399s"`. ה-`Retry-After` המועבר שמצורף ל-429 המשוחזר (#16528) כבר גורם למנוע ה-fallback לנעול את המודל לאותו חלון, אך השהיית המגביל גם בשבילו עדיין תעכב כל קריאה שמגיעה למפתח מוקדם (לאחר איפוס resilience, למשל) למשך כל ה-`maxWaitMs`. כאשר המתנה כזו מגיעה מפרט Google `RetryInfo` מוקלד (מקור ה-`google_rpc_retry_info`) והמגביל של המפתח כבר מוקף (scoped) למודל (ראו `getLimiterKey`), ה-429 הופך במקום זאת לנעילת מודל על אותו חיבור (`lockModelForLongBodyRetry` ב-`open-sse/services/rateLimitManager/bodyRetryPause.ts`, מוגבל ל-24h), והמגביל נותר לא מושהה. בחירת החשבון מדלגת על הנעילה הזו דרך `isModelLocked()`, וכך גם שער ה-pre-dispatch של ה-combo עבור יעדים המוצמדים לחיבור. ב-antigravity, שהמגביל שלו הוא per quota family, הנעילה היא על המודל המדויק, כמו שאר נעילות המכסה שלו. השם שהלקוח ביקש ננעל גם כן כאשר alias זיהה אותו כאותו מודל, מכיוון שהבדיקות האלה משתמשות בשם המבוקש; הוא ננעל בדיוק (`lockExactModel`), כך ש-alias שחוצה משפחת מכסות של antigravity או scope של codex לעולם אינו נועל את שלו. רמז פרוזאי, `retryDelay` לא מוקלד, או מגביל המשותף לכל החיבור — משאירים את ההשהייה. כאשר המגביל שמסלול ה-429 בנה מחדש אכן מושהה, מתקשר שזמן התור הנותר שלו מסתיים לפני שההשהייה מסתיימת נדחה מיד עם קוד ה-timeout של התור (`checkLimiterPause`) במקום להמתין לסיום אותו זמן; הסוף המתועד מעוגן לפני שהמגביל נבנה, בנקודה שבה Bottleneck מתחיל את שעון הרענון שלו, וכל שינוי מאוחר יותר במאגר שוכח אותו. מכוסה על ידי `tests/unit/rate-limit-long-body-retry-lockout.test.ts` ו-`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — תקרת קבלה מסוג opt-in (חדש).** `resilienceSettings.requestQueue.maxQueueDepth` תוחם כמה בקשות רשאות לשבת בתור (עדיין לא משוגרות) עבור צמד ספק+חיבור אחד בו-זמנית. כאשר התור כבר מכיל `maxQueueDepth` בקשות, בקשה חדשה נדחית במהירות עם שגיאה מוקלדת `code: "RATE_LIMIT_QUEUE_FULL"` **לפני** שהיא בכלל מגיעה ל-`limiter.schedule()` — כך שהדחייה זולה ומתרחשת לפני כל עבודת דחיסת-פרומפט / תרגום במורד הזרם עבור אותה בקשה. ברירת מחדל `0` = מושבת, מה שמשמר את התנהגות התור הבלתי-מוגבל הקיימת; תחום ל-0–100000. דריסה דרך `RATE_LIMIT_MAX_QUEUE_DEPTH` (משתנה סביבה) או `resilienceSettings.requestQueue.maxQueueDepth` (לוח בקרה / API patch).

בדיקת הקבלה עצמה היא פונקציה טהורה (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) כך שניתן לבדוק אותה בטסטי יחידה ללא מגביל Bottleneck אמיתי.

> ה-RFC שפתח את #6593 הציע גם דגל `bypassCompressionOnRateLimit`.
> צנרת ה-`open-sse/services/compression/` בריפו זה היא דחיסת
> prompt/context על בקשת ה-LLM היוצאת (`chatCore.ts`, סביב בלוק
> ה-`resolveCompressionSettings`/`selectCompressionStrategy`), ולא דחיסת תגובות
> HTTP על גופי 429 מסונתזים — אין נתיב קוד תואם לדגל bypass מילולי. שלב
> דחיסת ה-prompt הזה גם רץ כיום _לפני_ `withRateLimit()` בצנרת הבקשות,
> ולכן שינוי הסדר כדי לדלג עליו בעת דחייה של תור מלא הוא שינוי נפרד וגדול
> יותר מהיקף הבעיה הזו; הוא בכוונה **לא** יושם כאן ונשאר כ-follow-up אם
> החיסכון ב-CPU שווה את הסיכון הכרוך בשינוי הסדר.

### רשת הביטחון להפעלה אוטומטית של Rate-Limit והגנת חיבורים (`rateLimitProtection`)

**רשת ביטחון להפעלה אוטומטית** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, ברירת מחדל `true`):
כברירת מחדל, OmniRoute מפעיל אוטומטית הגנת תור rate-limit עבור כל חיבורי הספקים הפעילים מסוג API-key (`getProviderCategory(provider) === "apikey"`). זה מבטיח שבקשות נכנסות למפתחות API רגישי-rate ב-upstream יעברו תור וויסות דרך Bottleneck במקום להתפרץ לשגיאות 429 של upstream. ניתן לעקוף את רשת הביטחון באמצעות משתנה הסביבה `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` מכבה, `true`/`1`/`on` מכריח הפעלה), שגובר על ההגדרה השמורה בדשבורד (**הגדרות → שרידות** / `PATCH /api/resilience`).

**סמנטיקה של `rateLimitProtection` לכל חיבור:**
הגנת rate-limit לכל חיבור נעקבת דרך שדה הבוליאני `rateLimitProtection` בחיבורי הספקים (נשמר כ-`rate_limit_protection` ב-SQLite):

- **הפעלה מפורשת (`rateLimitProtection === true`)**: הגנת rate-limit מופעלת במפורש עבור חיבור זה, ללא קשר לקטגוריית הספק או לשאלה אם רשת הביטחון של ההפעלה האוטומטית דולקת.
- **כיבוי מפורש (`rateLimitProtection === false`)**: מכבה הגנה מפורשת, אבל **לא** מוציא חיבור API-key פעיל מרשת הביטחון הגלובלית של ההפעלה האוטומטית. ב-`reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` ו-`undefined` שקולים: רק `rateLimitProtection === true` נחשב לעקיפה מפורשת. אם `rateLimitProtection` הוא `false` (או לא מוגדר), חיבור API-key פעיל עדיין מתאים לתנאי ההפעלה האוטומטית ונשאר מוגן מ-rate-limit.
- **אין opt-out לכל חיבור**: מפעיל לא יכול כיום לבטא "חיבור API-key פעיל בודד זה חייב לרוץ ללא הגנת תור rate-limit" תוך שמירה על ההפעלה האוטומטית פעילה עבור האחרים. כדי להריץ חיבורי API-key ללא תורי rate-limit כלל, יש לכבות את רשת הביטחון גלובלית (`RATE_LIMIT_AUTO_ENABLE=false` או `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**נתיבי כתיבה נתמכים:**

- **`POST /api/rate-limits`**: נתיב הכתיבה הניהולי הנתמך להחלפת מצב `rateLimitProtection` עבור חיבור (`{ connectionId: string, enabled: boolean }`). קריאה עם `enabled: true` מפעילה הגנה מפורשת; קריאה עם `enabled: false` מסירה הגנה מפורשת (אם כי חיבורי API-key פעילים נשארים מכוסים תחת רשת הביטחון הגלובלית אם ההפעלה האוטומטית דולקת).
- **`PUT /api/providers/[id]`**: בכוונה **לא** מקבל או מחליף את `rateLimitProtection` (#11278). עדכון מטא-דאטה של חיבור ספק דרך `PUT /api/providers/[id]` לעולם לא ישנה את מצב הגנת ה-rate-limit השמור.

---

## 6. כלב שמירה על תפוקה אטית (#9709)

ה- `resilienceSettings.streamRecovery.throughputWatchdog` guard האופציונלי מזהה במעלה הזרם שעדיין שולח נתחים אבל מייצר פלט עוזר מתחת לקצב הפלט השימושי שהוגדר. זה נבדל בכוונה מפסק הזמן הבלתי פעיל: פעימות לב ומטא נתונים לא מאפסים אף טיימר ואינם נחשבים כהתקדמות. זה גם נבדל מהדד-ליין של הניסיון הקשה (#9153), שנותר תקרת בטיחות מוחלטת ללא קשר לאיכות הפלט.

כלב השמירה דורש תקופת חימום ולאחריה חלון מתגלגל מלא לפני שהוא יכול להפסיק. הוא סופר דלתות טקסט מאירועי פלט צ'אט של השלמות ותגובות API (פרוקסי שמרני UTF-8 byte), מתעלם מאירועי שימוש בלבד וריקים, ומשהה את השיפוט בזמן שאירועי קריאת הכלים או הנמקה מתקיימים. זה מושבת כברירת מחדל וניתן להפעיל אותו עם `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (ערך ה-env משאיר רק את ברירת המחדל — a saved `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean wins; ראה הערת קדימות env-vs-dashboard בראש מדריך זה); החלון, החימום, הקצב המינימלי והתפוקה המינימלית הניתנת למדידה מוגבלים בשכבת הנורמליזציה של הגדרות החוסן הרגילות.

כאשר מופעל, ביטול כלב שמירה מוחל רק על הניסיון הפעיל במעלה הזרם. לפני כל בתים גלויים ללקוח, נתיב השחזור המוקדם של אותו חשבון עשוי לפתוח מחדש את הניסיון. לאחר commit, הזרם לעולם אינו משוחזר באופן עיוור; רק חוזה המשך אמצע הזרם הבטוח הקיים יכול לתפור סיומת. הגמר נשאר בצילום יחיד, כך שחשבונאות שימוש ושחרור סמפור אינם משוכפלים.

---

## 7. ניסוח מחדש של סטטוס upstream (שגיאות מכסה שדווחו באופן שגוי)

**היקף:** שער upstream אחד שמדווח על מיצוי זמני של המכסה עם סטטוס HTTP שגוי.

**מטרה:** לתקן סטטוס מטעה **לפני** הסיווג, כדי שצרכנים downstream (מנוע ה-fallback, צבירת ה-combo והתשובה המוצגת ללקוח) יראו את אופייה האמיתי של הכשלת הניתנת לניסיון חוזר.

חלק מהשערים מסמנים מיצוי **זמני** של המכסה בסטטוס HTTP שאינו ניתן לניסיון חוזר. `agentrouter.org` מחזיר `403` (ולפעמים `400`) עם גוף בסינית
(`用户额度不足` / `额度不足`) במקום `429` הסטנדרטי. לקוחות כמו Claude
Code מתייחסים אל `403` כשגיאה קבועה ומפסיקים את הסשן, וללא תיקון
מנוע ה-fallback יסווג אותה כ-`AUTH_ERROR` במקום כאירוע מכסה.

**יישום:**

- רישום + matcher: `open-sse/config/upstreamStatusRestatement.ts` — רשימת כללים לכל ספק (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`), עם התאמה באמצעות `applyStatusRestatement()`.
- נקודת הקריאה: בלוק `providerFailure:` בתוך `open-sse/handlers/chatCore.ts`
  (סביב שורה 3654), מיד לאחר ש-`parseUpstreamError()` מנתח תשובת upstream עם סטטוס HTTP של שגיאה (`!providerResponse.ok`), ולפני שרץ סיווג כלשהו, כך שכל צרכן downstream יראה את הסטטוס המתוקן. שגיאות המוטמעות בתוך זרם SSE של `200` עוברות במסלול נפרד ומאוחר יותר של ניתוח הזרם, והן **אינן** מכוסות על ידי ה-hook הזה כיום — מגבלה ידועה שעדיין אינה נדרשת עבור ה-misstatus של agentrouter (שמופיע כסטטוס HTTP של שגיאה).
- זכאות לניסיון חוזר: `429` נמצא ב-`RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), ולכן שגיאה שנוסח הסטטוס שלה מחדש נושאת חלון ניסיון חוזר אמיתי במקום להופיע כ-`403` מת.

- ה-`60s` הסינתטי של `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  הוא רק מה שהתשובה שנוסחה מחדש מציגה ל**לקוח**; הוא אינו משך הצינון/הנעילה הפנימי של החיבור עצמו — משך זה נקבע בנפרד על ידי המנגנון שמטפל בפועל בשגיאה שנוסחה מחדש (ה-backoff ההדרגתי של Connection Cooldown, סעיף 2, עם בסיס של `3s` עבור ספקי API-key; או Model Lockout, סעיף 3, עבור ספקים עם מכסה לכל מודל כמו agentrouter). הנתב יכול להפוך לזכאי לניסיון חוזר פנימי מוקדם יותר מחלון ה-60s שהוא מפרסם ללקוח — זו מרווחת ביטחון מכוונת, לא באג.

שגיאות קבועות (`无权访问模型` של agentrouter — אין גישה למודל זה) **לעולם אינן** עוברות ניסוח מחדש: `excludeMarkers` מבטל את הכלל גם כאשר `textMarkers` תואמים, ולכן השגיאה שומרת על הסטטוס המקורי שלה ושום דבר אינו מנסה אותה שוב לנצח. כלל סיווג הספק התואם
(`agentrouter-model-access-denied` בתוך `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, צינון בסיסי מוצהר של `6h`) נבדק על ידי `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_לפני_ ההחזרה המוקדמת הגנרית של קטגוריית ה-apikey, `FORBIDDEN`, כאשר הדבר מותנה ב-`honorsRuleLockScope(provider)` (#10334 — כיום בלעדי ל-agentrouter באמצעות רשימת ההרשאה `HONORS_RULE_LOCK_SCOPE_PROVIDERS` בתוך
`providerErrorRules.ts`). הצינון המוצהר של 6h של הכלל עובר דרך `fallbackResult.baseCooldownMs`, אך עדיין מזין את מסלול הנעילה הקיים של מכסה לכל מודל (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, ללא שינוי מצד #10334 מלבד מקור הצינון): הוא מוגבל כלפי מטה ל-`mlSettings.maxCooldownMs` של המפעיל (ברירת מחדל `1_800_000ms` / 30 דקות), כמו כל נעילת מודל אחרת, ו_סיבת הנעילה הנשמרת_ נותרת `"forbidden"` המקודדת קשיח בקוד, ולא `"auth_error"` של הכלל — רק משך הצינון מקבל הכרה מקצה לקצה, לא מחרוזת הסיבה. החיבור עצמו נשאר פעיל; מודלים מקבילים באותו חיבור אינם מושפעים.

שגיאות מכסה שנוסחו מחדש (`额度不足`) מגיעות לכלל ספק בסביבת production
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ללא צינון מוצהר משלה — ברירת המחדל של ה-backoff המותאם של שכבת ההתמדה חלה). מאז #10334, השדה `scope` ב-
`ProviderErrorRuleMatch` נצרך מקצה לקצה, אך **רק** עבור ספקים ברשימת ההרשאה `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
כיום רק `"agentrouter"`, באמצעות `honorsRuleLockScope()`). עבור כל ספק אחר, `scope` נותר אינפורמטיבי, בדיוק כפי שהיה לפני #10334.
`checkFallbackError` חושף את ה-scope של הכלל התואם דרך `fallbackResult.ruleScope`; הפונקציה `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) היא השומר המשותף שמאשר כי `ruleScope` אכן בטוח לכיבוד כאות כלל-חיבורי, המתאושש מעצמו (scope `"connection"`, הסיבה `quota_exhausted`, לעולם לא `permanent`, ולעולם לא `creditsExhausted` — הגנה מפני צימוד עתידי של scope `"connection"` עם מצב חשבון קבוע). שני צרכנים קוראים לה:

- **התמדה** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  במקום לעבור לענף הנעילה **לפי-מודל** של ספק passthrough
  (agentrouter הוא `passthroughModels: true` → `hasPerModelQuota()`
  מחזירה `true`), מוחל **צינון זמני של החיבור** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ולעולם לא סטטוס סופי
  (`credits_exhausted`/`banned`/`expired`) — כך שהחיבור מתאושש מעצמו
  לאחר שהצינון פג, במקום לדרוש איפוס ידני של פרטי האימות.
  עבור חיבורים עם `disableCooling: true` (#2997) הצינון מדולג: החרגה זו
  עוברת במקום זאת לנעילה לפי-מודל (פשרה מתועדת —
  ראו את הערת הקוד מעל הענף).
- **ניתוב צירופים באותה בקשה** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): אותו שומר מסמן את
  החיבור בקבוצת `exhaustedConnections` שבזיכרון, שהמפתח שלה הוא
  `${provider}:${connectionId}`. פעולה זו מדלגת רק על יעד שנותר באותה
  בקשה, אשר _הוא עצמו כבר מכיל את אותו `connectionId` בדיוק_ באובייקט
  היעד שלו (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, באמצעות `if (provider &&
connectionId)` לפני החיפוש ב-`exhaustedConnections`) — צירוף רגיל של רשימת
  מודלים, שבו יעדי האחים אינם מכילים `connectionId` מוצמד משל עצמם והוא
  נפתר רק בעת כל dispatch מתוך הכותרת
  `X-OmniRoute-Selected-Connection-Id` של התגובה, לעולם אינו מגיע להתאמת
  מפתח זו. במקרה הנפוץ הזה, ההגנה בפועל מפני שימוש חוזר בחשבון שזה עתה
  מוצה על ידי רגל שנותרה אינה הקבוצה הזו — אלא שכבת ההתמדה שלעיל
  (`rateLimitedUntil` של החיבור נמצא כעת בעתיד), בשילוב עם אותו שומר
  שמדכא את `transientRateLimitedProviders` עבור הכשל (ראו "תכנון
  דו-שלבי" ואת הערת הקוד בענף
  `isAgentrouterConnectionQuotaScope` ב-`targetExhaustion.ts`): מכיוון
  שהקבוצה נותרת ללא סימון, האישור הכפוי של
  `allowRateLimitedConnection` ב-`combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) אינו מופעל עבור
  הרגליים שנותרו של הספק, ולכן מסנן `rateLimitedUntil` של בחירת פרטי
  האימות (`src/sse/services/auth.ts:1238`) נאכף כרגיל, ורגל שנותרה תבחר
  חיבור agentrouter אחר שעדיין כשיר, או תיכשל ללא פרטי אימות זמינים —
  היא אינה מכריחה את דרכה חזרה אל החיבור שענף זה הכניס לצינון.

### תכנון דו-שלבי: ניסוח מחדש של הסטטוס, ולאחר מכן סיווג

ניסוח מחדש של הסטטוס (`upstreamStatusRestatement.ts`) וכללי סיווג הספק
(`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) הם מאגרים נפרדים ששניהם משתמשים במזהה הספק
ובסמני טקסט כמפתחות, אך הם מופעלים במקומות שונים ומשרתים מטרות שונות:
ניסוח מחדש משנה את סטטוס ה-HTTP בשלב מוקדם ב-`chatCore.ts`;
כללי הסיווג בוחרים את `reason` החלופי ונועלים את `scope`
(`model` / `provider` / `connection`) בתוך `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

כללי הסיווג רואים רק את **טקסט** השגיאה המלא (הנדרש להתאמת סמנים בגוף
כמו `额度不足`) עבור ספקים המופיעים ברשימת ההיתרים
`FULL_TEXT_RULE_PROVIDERS` שב-`providerErrorRules.ts` — נכון לעכשיו רק
`"agentrouter"`. עבור כל ספק **מובנה בקטלוג** אחר,
`checkFallbackError` מעביר אל `getProviderErrorRuleMatch` רק את השגיאה
המובנית (`{code, type}`), שמספיקה לכללים המבוססים על כותרות/סטטוס/קוד,
אך אינה יכולה לראות סמני טקסט בגוף. פונקציית העזר
`resolveRuleMatchBody()` מבצעת את הבחירה הזו: טקסט השגיאה המלא עבור
ספקים ברשימת ההיתרים, והשגיאה המובנית אחרת. הוספת ספק **מובנה**
ל-`FULL_TEXT_RULE_PROVIDERS` היא הסכמה מפורשת לכל ספק בנפרד — היא קיימת
כדי שנתיב ברירת המחדל עבור כל ספק שאינו ברשימה יישאר ללא שינוי, בייט
אחר בייט.

ה-`scope` של כלל (`model` / `provider` / `connection`) הוא הסכמה נפרדת
מ-`FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` חושפת אותו רק בתור
`fallbackResult.ruleScope`, וצרכנים במורד הזרם מכבדים אותו כמשהו מעבר
לתווית מידע בלבד עבור ספקים המופיעים ברשימת ההיתרים
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` באותו קובץ (דרך
`honorsRuleLockScope()` — כיום רק `"agentrouter"`). ראו את "שגיאות מכסה
שנוסחו מחדש" לעיל כדי להבין מה התאמה עם `scope: "connection"` עושה
בפועל לאחר שספק נמצא ברשימת ההיתרים הזו.

**#11104 — כללים שהוגדרו על ידי מפעיל עוקפים את שתי רשימות ההיתרים.**
מפעיל יכול להצהיר בזמן ריצה על כלל לכל ספק באמצעות
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
מבלי לערוך את הקובץ הזה. הגבלת כלל של מפעיל באמצעות
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — רשימות
היתרים שנועדו להגן על התנהגות ברירת המחדל של כללי ספקים מובנים בקטלוג —
הייתה הופכת את מנגנון ההגדרות לחסר משמעות עבור כל ספק מלבד אלה שכבר
מופיעים בהן, מכיוון שהצהרת הכלל היא כבר הסכמה מפורשת של המפעיל.
גם `resolveRuleMatchBody()` וגם `honorsRuleLockScope()` בודקות תחילה את
`hasOperatorRuleForProvider()`: ספק עם כלל מפעיל מקבל את טקסט השגיאה
הגולמי, וה-`scope` שהוגדר עבורו מכובד, ללא תלות בשאלה אם הוא מופיע גם
באחת מרשימות ההיתרים.

**כללים שהוגדרו על ידי מפעיל** (`OperatorProviderErrorRule`): לכל כלל
יש `status` אופציונלי ו-`match` אופציונלי (תת-מחרוזת פשוטה, ללא
רגישות לאותיות רישיות, של טקסט השגיאה, ולעולם לא RegExp, כך שאינו יכול
לגרום ל-ReDoS), והוא חייב להגדיר לפחות אחד משני השדות. כאשר שניהם
מוגדרים, הם מחוברים באמצעות AND; שדה שלא הוגדר מתאים לכל דבר, ולכן
`{match: "insufficient_quota"}` מתאים לכל סטטוס שנושא את הקוד הזה. הכלל
הראשון שמתאים הוא זה שנבחר. `cooldownMs` מקבל ערך של עד 30 ימים; לכל
היותר 50 כללים בסך הכול.

**ברירות מחדל כלליות** (`settings.providerErrorDefaults`, בהצטרפות יזומה, מוגדרות באמצעות
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
כאשר `cooldownMs` נע בין דקה אחת ל־30 ימים. ברירת מחדל חלה רק כאשר לא נמצאה
התאמה לכלל מפעיל או לכלל בקטלוג המובנה, ורק עבור שגיאות 402, 403, 408,
429 ושגיאות 5xx. שגיאות במבנה הבקשה (400, 404, 409, 413, 422) ושגיאות 401
ללא פרטים נוספים ממשיכות לקבל את הטיפול הייעודי שלהן. ללא `reason` מפורש,
הסיבה נגזרת מהסטטוס, באותו אופן שבו `classifyError` עושה זאת. הצהרה על ברירת
מחדל נחשבת לכלל מפעיל עבור `hasOperatorRuleForProvider()`, ולכן ה־`scope` שלה
(ברירת המחדל היא `"connection"`) מכובד. זמן ההשהיה האפקטיבי של ברירת מחדל
הוא הארוך מבין `cooldownMs` שלה לבין רמז הניסיון החוזר של הספק עצמו
(`Retry-After`, `x-ratelimit-reset` או רמז לאיפוס בגוף, אותו רמז שהמנוע מכבד
כאשר ההגדרה "use upstream retry hints" של connection-cooldown מופעלת),
כך שברירת מחדל יכולה להאריך רמז קצר מהספק, אך לעולם לא לקצר איפוס אמיתי.
כלל מפעיל מפורש שומר על `cooldownMs` המדויק שלו. לא כלל ולא ברירת מחדל
עוקפים את מגני connection-cooldown ב־`markAccountUnavailable`: זמן השהיה
הפעיל והארוך יותר לעולם אינו מתקצר, וסטטוס סופי לעולם אינו נדרס. גלאי הטקסט
המובנים שרצים מוקדם יותר ב־`checkFallbackError` (מכסת קרדיטים שאזלה, מכסה
יומית, חשבון שהושבת) עדיין מקבלים עדיפות עבור הביטויים הייעודיים שלהם.

**פער ידוע — `providerRuleRegistry` לעולם אינו נבדק עבור HTTP 400.**
הענף `BAD_REQUEST` של `checkFallbackError` מסווג סטטוס 400 לחלוטין באמצעות
מערכי התבניות שלו (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` וכו' ב־`accountFallback.ts`) ומחזיר תוצאה לפני
שמגיעים לענף `configuredRule`/`getProviderErrorRuleMatch` שמופיע מעליו.
כלל קטלוג מובנה (או כלל מפעיל) עם `status: 400` תקין מבחינה תחבירית, אך
לעולם לא יופעל. כיום אין כלל קיים שמכוון ל־400, ולכן דבר בייצור אינו מושפע —
אך כלל 400 עתידי ידרוש קודם שינוי בענף הזה, וזהו שינוי גדול יותר מהוספת כלל
בלבד (הוא מסווג מחדש את 400 עבור כל ספק שכבר מסתמך על התנהגות מערכי
התבניות), ולכן הוא מחוץ לתחום עבור הוספת כלל לספק יחיד.

### הוספת שער חדש שמציג מכסה באופן שגוי

1. רשמו מערך כללים אחד ב־`statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). השאירו את
   `textMarkers` ייחודיים לספק; לעולם אל תשתמשו מחדש בביטויים כלליים באנגלית
   שמתנגשים עם `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. אופציונלית, רשמו כללי סיווג ב־
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) כדי לבחור
   את תחום הנעילה הנכון (`connection` עבור מכסה כללית לחשבון, `model` עבור
   שגיאות ברמת המודל). שלב זה משפיע בייצור רק על ספקים שהכללים שלהם זקוקים
   לטקסט השגיאה המלא (סמני גוף): הוסיפו את מזהה הספק ל־
   `FULL_TEXT_RULE_PROVIDERS` באותו קובץ — אחרת
   `checkFallbackError` מעביר לכלל רק את השגיאה המובנית
   `{code, type}`, וכלל המבוסס על טקסט הגוף לעולם לא יתאים לתעבורה חיה.
   כללים שמתאימים אך ורק לפי `status`/`headers` (כמו אלה של Opencode או
   Minimax) אינם זקוקים להצטרפות זו. בנפרד, אם הכלל מצהיר על
   `scope: "connection"` והכוונה היא לזמן השהיה אמיתי ברמת החיבור, בתוספת
   דילוג על צירוף הפעולות באותה בקשה (ולא רק תווית מידע), הוסיפו את מזהה
   הספק ל־`HONORS_RULE_LOCK_SCOPE_PROVIDERS` באותו קובץ — זהו השער שמפעיל
   צריכה בסגנון `isAgentrouterConnectionQuotaScope()` בתוך
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) וב־
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); בלעדיו,
   `scope` עדיין עובר דרך `fallbackResult.ruleScope`, אך דבר אינו פועל
   לפיו.
3. הוסיפו בדיקות יחידה המשקפות את
   `tests/unit/upstream-status-restatement.test.ts`
   ואת `tests/unit/agentrouter-error-rules.test.ts` (כולל מגני
   not-permanent / not-creditsExhausted, ואם הספק זקוק לרשימת ההיתרים —
   בדיקה המאשרת ש־`resolveRuleMatchBody()` מחזיר את הטקסט המלא רק עבור ספק
   זה).

אין צורך בשינויים ב־`chatCore.ts`, ב־`classifyError` או ב־combo.

#### נעילה לפי דלי יציאה (#10880)

ספקים הנמצאים ב־`EGRESS_BUCKETED_LOCK_PROVIDERS` (משפחת opencode) מטופלים
כספקים במעלה הזרם המקובצים לפי IP (שכבת החינם של opencode מקובצת לפי IP,
ולא לפי חשבון — ראו #9611): סטטוס 429 שסווג כ־`quota_exhausted`
**או** כ־`rate_limit_exceeded` גורם לזמן השהיה עבור כל חיבורי המשפחה
המורשים שה־IP האחרון הידוע של היציאה שלהם תואם לזה של החיבור שנכשל, לפני
שהסבב יכול לנסות אותם
— ובכך נמנעות קריאות N-1 למעלה הזרם שנכשלו בוודאות (באותה תבנית כמו
#10460/#10525). `rate_limit_exceeded` נכלל בכוונה: בנתיב
`markAccountUnavailable` הכללים הייחודיים ל־opencode לעולם אינם תואמים
(לא מועברים כותרות/גוף ל־`checkFallbackError`, ו־opencode אינו נמצא ב־
`FULL_TEXT_RULE_PROVIDERS`), ולכן 429 שגופו מכיל את טקסט מכסת המינוי
("monthly usage limit reached") מסווג כ־`quota_exhausted` על ידי חלופת
טקסט המכסה (`buildSubscriptionQuotaFallback`, `accountFallback.ts`;
זמן השהיה של שעה) לפני שכלל `status_429` נבדק — בעוד ש־429 ללא טקסט מכסה
(הגבלת קצב פשוטה) מסווג דרך כלל `status_429` כ־`rate_limit_exceeded`
ועדיין גורם לזמן השהיה עבור משפחת ה־IP. עבור ספק שנמצא ברשימת ההיתרים,
הגבלת קצב לפי IP היא אותו אות כמו מכסה שאזלה. מגבלות כנות:

- **מאמץ מיטבי**: הנעילה פותרת את `egress_ip` האחרון הידוע של החיבור
  מתוך `proxy_logs` (חלון של 24 שעות, באופן סינכרוני, ללא מטמון). מטמון קר
  (כתובת ה־IP היוצאת מעולם לא נבדקה) או היעדר שורה → החיבור שנכשל עדיין
  מקורר על ידי הענף (ומתועד כמו היום), ורק שאין נעילה של אח מקביל.
- **לעולם לא סופני**: תקופת הצינון היא חלון מכסה מתחדש
  (`testStatus: "unavailable"`); מצב קבוע לעולם אינו נגזר מאות ברמת IP.
  חיבורים עם `disableCooling` מדלגים לחלוטין על הענף.
- **רמת הפירוט של הנעילה משתנה עבור המשפחה שברשימת ההיתרים**: זהו שינוי
  היקף, ולא רק אופטימיזציה של אח מקביל. opencode הוא ספק
  `passthroughModels`, ולכן לפני הענף הזה שגיאת 429 יצרה נעילה לפי MODEL;
  כעת היא יוצרת תקופת צינון לחיבור — כולל עבור מפעיל שמריץ חיבור יחיד
  ללא אח מקביל כלל. זו רמת הפירוט שטבלת הכללים של opencode כבר מצהירה
  כנכונה (`scope: "connection"`,
  `providerErrorRules.ts`), אך עד כה היא מעולם לא כובדה משום ש־opencode
  אינו נמצא ב־`HONORS_RULE_LOCK_SCOPE_PROVIDERS`. הענף כותב בעצמו את תקופת
  הצינון של החיבור שנכשל ואת `backoffLevel`, תוך חיקוי הענף של
  agentrouter ברמת החיבור, ואז חוזר — החסימה לפי מודל והנתיב הגנרי שמתחת
  לעולם אינם מגיעים לביצוע.
- **Combo כלול**: כמו בענף של agentrouter, ההיקף מתעלם במכוון מההנמכה
  של `persistUnavailableState`/`isCombo` שמבצע קורא Combo עבור 429. נעילה
  לפי מודל אינה צורה חלשה יותר של היקף זה, אלא היחידה השגויה: היא אינה
  אומרת דבר על ה־IP שמיצה את המכסה, ולכן הסבב של Combo ימשיך לבזבז קריאה
  אחת שבוודאות תיכשל עבור כל אח מקביל.
- **בטיחות אחים מקבילים**: אח מקביל שכבר נמצא במצב סופי
  (banned/credits_exhausted) או שכבר נמצא בתקופת צינון ארוכה יותר לעולם
  אינו נדרס.
- **רשימת היתרים בלעדית**: הרחבת `EGRESS_BUCKETED_LOCK_PROVIDERS` היא
  החלטה מפורשת של הבעלים; אין חיבור גנרי (תבנית #10334/#10419). שאילתת
  האחים המקבילים מקשרת לאותה רשימת היתרים במקום לחזור עליה כליטרל של SQL,
  כך שהרחבתה נשארת שינוי של שורה אחת.
- **סבב כתובות IP יוצאות, בשני הכיוונים**: חלון החיפוש (24 שעות) רחב
  בהרבה מ־TTL של מטמון כתובת ה־IP היוצאת (5 דקות), ולכן "ה־IP האחרון
  הידוע" הוא היסטוריה, לא המצב הנוכחי. אם ה־proxy של חיבור הסתובב בתוך
  החלון, הנעילה עשויה **להחמיץ** IP משותף באמת (ה־IP שתועד הוא החדש,
  שטרם מיצה את המכסה) — ובאופן סימטרי היא עשויה **לקרר אח מקביל שמאז
  הסתובב הרחק** מה־IP שמיצה את המכסה. המקרה השני עולה לאח המקביל תקופת
  צינון אחת; שני המקרים הם מגבלות מאמץ מיטבי מקובלות של חיפוש המבוסס על
  היסטוריה.
- **עלות**: שתי סריקות מוגבלות של `proxy_logs` (מסוננות לפי חלון באמצעות
  `idx_pl_timestamp`), רק בתדירות של 429. אין אינדקס חדש (מיגרציה 134
  YAGNI). נמדד על עותק DB של תעבורה אמיתית בגודל בינוני; מופע בעל קצב
  עיבוד גבוה מחזיק באופן יחסי יותר שורות באותו חלון.

## תכונות שרידות נוספות

- **20 אסטרטגיות ניתוב** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — ראו [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **ניתוב מודע-איפוס** (v3.8.0) — מתעדף חיבורים לפי זמן איפוס המכסה.
- **ירידת רמה של מצב רקע** — Responses API עם `background: true` מושבת למצב סינכרוני עם אזהרה.
- **זיהוי דינמי של מגבלת כלים** — מסתג מהספקים כשמגיעים למגבלות מספר הכלים.
- **מעבר גיבוי חירום** — נשלט על ידי `OMNIROUTE_EMERGENCY_FALLBACK`; מפעילים יכולים לעקוף אותו מדף דגלי התכונות (Feature Flags) ללא הפעלה מחדש.

---

## ניפוי שגיאות

- קומבו משוקלל (Weighted) משיב `503 all_targets_cooling_down` (`Retry-After` מוגדר, `diagnostics.excluded` מפרט כל יעד עם `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → המאגר מוגדר ומחובר, פשוט כל יעד מוחרג על ידי טיימר שרידות; האזהרה `[COMBO] Weighted selection: every target excluded before dispatch — …` מציינת את הסיבות ואת מספר השניות שנותרו. `404 no_executable_targets` מאותו קומבו פירושו שלא היה מעורב אף טיימר שרידות (אין מה להריץ, או שכל חשבון נכשל בבדיקת הזמינות). נבנה ב-`open-sse/services/combo/pinRecovery.ts` מתוך ההחרגות שנאספו ב-`targetResolution.ts`.
- כל המפתחות של ספק מדולגים → בדקו גם את מצב מפסק המעגל וגם את `rateLimitedUntil`/`testStatus` של כל חיבור.
- ספק מוחרג לצמיתות אחרי חלון האיפוס → קוד שקורא את `state` הגולמי במקום `getStatus()`/`canExecute()`.
- מפתח אחד נכשל, אחרים אמורים לעבוד → העדיפו צינון חיבור (connection cooldown) על פני מפסק מעגל.
- רק מודל אחד נכשל → העדיפו נעילת מודל על פני צינון חיבור.
- מצב שאמור להתאושש מעצמו אך אינו מתאושש → בדקו חותמת זמן עתידית + נתיב קריאה שמרענן מצב שפג תוקפו. סטטוסים קבועים דורשים שינויים ידניים.

---

## מצב זמן ריצה — עזר מהיר לסוכן

> הועבר מילה-במילה מ-`AGENTS.md` ← "Resilience Runtime State" (PR #12743) כדי שמדריך
> הסוכן יישאר מתחת לתקציב ההקשר של 40k. זוהי התצוגה המקוצרת הפונה לסוכן של
> הסעיפים שלמעלה; הסעיפים הממוספרים נותרים ההתייחסות המלאה.

ל-OmniRoute שלושה מנגנוני כשל-זמני קשורים אך נפרדים. שמרו על הפרדת ההיקפים שלהם
בעת ניפוי שגיאות של התנהגות הניתוב. ראו את
[דיאגרמת השרידות בת 3 השכבות](../diagrams/exported/resilience-3layers.svg)
(מקור: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
למפה במבט-על.

### מפסק מעגל ברמת ספק (Provider Circuit Breaker)

**היקף**: הספק כולו, למשל `glm`, `openai`, `anthropic`.

**מטרה**: להפסיק לשלוח תעבורה לספק שנכשל שוב ושוב ברמת ה-upstream/שירות,
כדי שספק לא תקין אחד לא יאט כל בקשה.

**יישום**:

- מחלקת ליבה: `src/shared/utils/circuitBreaker.ts`
- חיווט שער/הרצה של צ'אט: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API של סטטוס זמן ריצה: `src/app/api/monitoring/health/route.ts`
- עטיפות משותפות: `open-sse/services/accountFallback.ts`
- טבלת מצב נשמרת: `domain_circuit_breakers`

**מצבים** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: תעבורה רגילה מורשית.
- `DEGRADED`: רצועת אזהרה מוקדמת — הכשלים חצו את סף הירידה אך עדיין לא את
  סף מפסק המעגל; התעבורה עדיין זורמת, לוחות המחוונים מציגים את האזהרה. בדיקת
  חיבור תקינה או חלון שקט ללא כשל חדש מחזירים אותו ל-`CLOSED`
  (החלון מופיע ב-`docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: הספק חסום זמנית; הקוראים מקבלים תגובת provider-circuit-open
  או שניתוב הקומבו מדלג ליעד אחר.
- `HALF_OPEN`: חלף ה-timeout של האיפוס; מתאפשרת בקשת בדיקה (probe). הצלחה סוגרת
  את המפסק, כשל פותח אותו מחדש.

**ברירות מחדל** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, הנצרכים דרך
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` ב-`src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` ב-`src/sse/handlers/chatHelpers.ts`). מפסק המעגל של
הספק-כולו פועל על `circuitBreakerThreshold` / `circuitBreakerReset`:

| פרופיל  | ירידת רמה ב- | נפתח ב- (`circuitBreakerThreshold`) | איפוס (`circuitBreakerReset`) |
| ------- | -----------: | ----------------------------------: | ----------------------------: |
| OAuth   |          `5` |                                 `8` |                         `60s` |
| API key |          `7` |                                `12` |                         `30s` |
| Local   |       (נגזר) |                                 `2` |                         `15s` |

`PROVIDER_PROFILES` מגדיר גם את `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 דקות) ו-`providerCooldownMs` (5/10/1 דקות): אלה מפעילים את
**שער החלון של צינון הספק הגלובלי האופציונלי (opt-in)** (`PROVIDER_COOLDOWN_ENABLED`,
כבוי כברירת מחדל) — רשומה ברמת ספק ב-`open-sse/services/providerCooldownTracker.ts`
נחשבת כצוננת רק אחרי `providerFailureThreshold` כשלים בתוך `providerFailureWindowMs`, ואז
צוננת למשך `providerCooldownMs`. אלה אינם הספים של מפסק המעגל הפעיל — אל תכווננו אותם
בציפייה להשפיע על התנהגות מפסק המעגל. כל ברירת מחדל ניתנת לעקיפה דרך משתני הסביבה
`OMNIROUTE_PROVIDER_BREAKER_*` ו-`OMNIROUTE_CIRCUIT_BREAKER_*`;
טבלת ההתייחסות המדויקת לזמן ריצה נמצאת ב-`docs/architecture/RESILIENCE_GUIDE.md`.

רק סטטוסי כשל ברמת ספק אמורים להפעיל את מפסק המעגל של הספק:

```ts
(408, 500, 502, 503, 504);
```

אל תפעילו את מפסק המעגל של הספק-כולו עבור שגיאות חשבון/מפתח/מודל רגילות כמו רוב
מקרי `401`, `403` או `429`. אלה בדרך כלל שייכים לצינון חיבור או לנעילת
מודל. `403` של ספק מפתח-API גנרי אמור להיות ניתן להתאוששות, אלא אם הוא מסווג
כשגיאת ספק/חשבון סופנית.

המפסק משתמש בשחזור עצל (lazy), לא בטיימר רקע. כאשר `OPEN` פג תוקף, קריאות כגון
`getStatus()`, `canExecute()`, ו-`getRetryAfterMs()` מרעננות את המצב ל-`HALF_OPEN`,
כך שלוחות מחוונים ובוני מועמדים לקומבו לא ממשיכים להחריג ספק שפג תוקפו לנצח.

### צינון חיבור (Connection Cooldown)

**היקף**: חיבור/חשבון/מפתח ספק אחד.

**מטרה**: לדלג זמנית על מפתח/חשבון בעייתי אחד, תוך מתן אפשרות לחיבורים אחרים של
אותו ספק להמשיך לשרת בקשות.

**יישום**:

- נתיב כתיבה/עדכון: `src/sse/services/auth.ts::markAccountUnavailable()`
- בחירה/סינון חשבונות: `src/sse/services/auth.ts::getProviderCredentials...`
- חישוב צינון: `open-sse/services/accountFallback.ts::checkFallbackError()`
- הגדרות: `src/lib/resilience/settings.ts`

שדות חשובים בחיבורי ספק:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

במהלך בחירת חשבון, מדלגים על חיבור כל עוד:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

גם הצינונים הם עצלים: כאשר `rateLimitedUntil` נמצא בעבר, החיבור הופך שוב לזכאי.
בשימוש מוצלח, `clearAccountError()` מנקה את `testStatus`, את `rateLimitedUntil`,
את שדות השגיאה ואת `backoffLevel`.

התנהגות ברירת המחדל של צינון חיבור:

- צינון בסיס של OAuth: `5s`.
- צינון בסיס של מפתח API: `3s`.
- `429` של מפתח API צריך להעדיף רמזי ניסיון חוזר מה-upstream (`Retry-After`,
  כותרות reset, או טקסט reset הניתן לניתוח) כשהם זמינים.
- כשלונות חוזרים הניתנים לשחזור משתמשים ב-backoff מעריכי:

```ts
baseCooldownMs * 2 ** failureIndex;
```

מנגנון ההגנה מפני thundering herd מונע מכשלונות מקבילים על אותו חיבור
להאריך שוב ושוב את הצינון או להגדיל את `backoffLevel` פעמיים.

מצבים סופניים (terminal) אינם צינונים. `banned`, `expired` (שהופך לסופני רק לאחר
N ניסיונות חוזרים חסומים באמצעות `EXPIRED_RETRY_MAX`), ו-`credits_exhausted`
נועדו להישאר לא זמינים עד שהאישורים/ההגדרות משתנים או שמפעיל מאפס אותם.
אל תדרסו מצבים סופניים במצב צינון חולף.

### נעילת מודל (Model Lockout)

**היקף**: ספק + חיבור + מודל.

**מטרה**: להימנע מהשבתת חיבור שלם כאשר רק מודל אחד אינו זמין או מוגבל במכסה
עבור אותו חיבור.

דוגמאות:

- ספקים עם מכסה לפי מודל שמחזירים `429`.
- ספקים מקומיים שמחזירים `404` עבור מודל אחד חסר.
- כשלי הרשאה של מצב/מודל הספציפיים לספק, כגון מצבי Grok נבחרים.

נעילת המודל נמצאת ב-`open-sse/services/accountFallback.ts` ומאפשרת לאותו
חיבור להמשיך לשרת מודלים אחרים.

### הנחיות לניפוי באגים

- אם כל המפתחות של ספק מדולגים, בדקו הן את מצב מפסק הספק והן את
  `rateLimitedUntil`/`testStatus` של כל חיבור.
- אם ספק נראה מוחרג לצמיתות לאחר חלון האיפוס, בדקו אם הקוד קורא `state` גולמי
  במקום להשתמש ב-`getStatus()`/`canExecute()`.
- אם מפתח ספק אחד נכשל אבל אחרים אמורים לעבוד, העדיפו צינון חיבור על פני
  מפסק ספק.
- אם רק מודל אחד נכשל, העדיפו נעילת מודל על פני צינון חיבור.
- אם מצב אמור להשתקם מעצמו, צריכה להיות לו חותמת זמן עתידית/timeout לאיפוס
  ונתיב קריאה שמרענן מצב שפג תוקפו. סטטוסים קבועים דורשים שינוי ידני של
  אישורים או תצורה.

---

## טביעת אצבע TLS והתגנבות

התגנבות ספציפית לספק (JA3/JA4, CCH, ערפול) מתועדת בנפרד — ראו `docs/security/STEALTH_GUIDE.md` (ב-git; לא מקומפל לתוך `/docs`).

---

## בדיקות חוסן (שלב 8 · בלוק C)

מעבר לבדיקות היחידה עבור לוגיקת החוסן, שלוש בדיקות מאמצות את סביבת הריצה תחת
תנאי עומס/כשל אמיתיים (כולן אינטגרציה/ליליות — אף אחת לא חוסמת PRs):

| בדיקה       | מה                                                                                                                                                                           | הרצה                                   |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | צומת upstream מדומה מזריק latency/reset/timeout/503 אמיתיים; מאמת שמפסק המעגל (circuit breaker) נפתח/מתאושש וש-`checkFallbackError` מסווג 503 כ-fallback שניתן להתאושש ממנו. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | כ-500 זרמים לכל `createSSEStream` תחת `--expose-gc`; נכשל אם ה-heap גדל מעבר לתקרה (מנגנון הגנה מפני OOM #3069).                                                             | `npm run test:heap`                    |
| k6 soak     | עומס מתמשך כנגד `/api/monitoring/health`; ספי p95/שגיאות.                                                                                                                    | `k6 run tests/load/k6-soak.js` (לילית) |

מנוהל על ידי `.github/workflows/nightly-resilience.yml` (cron + dispatch).
ב-`test:integration` ברירת המחדל, בדיקות הכאוס וה-heap מדלגות על עצמן (ללא `RUN_CHAOS_INT`/`--expose-gc`).

---

## ראו גם

- [מדריך הארכיטקטורה](./ARCHITECTURE.md) — ארכיטקטורת המערכת ומבניה הפנימיים
- [מדריך המשתמש](../guides/USER_GUIDE.md) — ספקים, קומבינציות, אינטגרציית CLI
- [מנוע Auto-Combo](../routing/AUTO-COMBO.md) — ניקוד בן 16 גורמים, חבילות מצבים
