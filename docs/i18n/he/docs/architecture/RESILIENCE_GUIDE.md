# Resilience Guide (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

ל-OmniRoute יש שלושה מנגנוני עמידות נפרדים אך קשורים. לכל אחד מהם תחום פעולה ומטרה שונים. יש להתייחס אליהם בנפרד בעת ניפוי שגיאות בהתנהגות הניתוב.

![מודל עמידות בן 3 שכבות](../diagrams/exported/resilience-3layers.svg)

> מקור: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. מפסק מעגל של ספק

**תחולה:** ספק שלם (למשל, `glm`, `openai`, `anthropic`).

**מטרה:** להפסיק לשלוח תעבורה לספק שנכשל שוב ושוב ברמת השירות או המערכת החיצונית.

**מימוש:**

- מחלקת ליבה: `src/shared/utils/circuitBreaker.ts`
- חיווט: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API לבדיקת מצב: `GET /api/monitoring/health`
- API לאיפוס: `POST /api/resilience/reset`
- מעטפות: `open-sse/services/accountFallback.ts`
- טבלת מסד נתונים: `domain_circuit_breakers`

**מצבים:**

- `CLOSED` — תעבורה רגילה מותרת
- `DEGRADED` — התעבורה עדיין מותרת, אך מתבצע מעקב אחר שיעור מוגבר של כשלי ספק; חוזר ל-`CLOSED` לאחר מספיק הצלחות, בעקבות בדיקת חיבור תקינה, או לאחר שחלפה תקופת ההשהיה הארוכה ביותר של `OPEN` עבור סוג הכשל האחרון (ערך ה-`cooldownByKind` שלו, או לחלופין `resetTimeout`, כפול `maxBackoffMultiplier`, ולפחות תקופת צינון אחת) ללא כשל חדש
- `OPEN` — הספק חסום זמנית; ניתוב משולב מדלג עליו
- `HALF_OPEN` — פג זמן ההמתנה לאיפוס; בקשת בדיקה מותרת

**ערכי ברירת מחדל הניתנים להגדרה (`open-sse/config/constants.ts`, זמינים דרך לוח הבקרה ← הגדרות ← עמידות):**

| מחלקה    | מעבר למצב ירוד לאחר | פתיחה לאחר | זמן המתנה לאיפוס |
| -------- | ------------------- | ---------- | ---------------- |
| OAuth    | 5 כשלים             | 8 כשלים    | 60 שניות         |
| מפתח API | 7 כשלים             | 12 כשלים   | 30 שניות         |
| מקומי    | נגזר                | 2 כשלים    | 15 שניות         |

`degradationThreshold` קובע מתי ספק נכנס למצב `DEGRADED`;‏ `failureThreshold` קובע מתי הוא נפתח והמערכת מדלגת עליו. פרופילים של ספקים מקומיים עדיין אינם מוצגים בדף הגדרות העמידות.

**קודי הפעלה:** רק סטטוסים ברמת הספק `[408, 500, 502, 503, 504]`. אין להפעיל את המפסק בעקבות שגיאות ברמת החשבון (רוב שגיאות 401/403/429 — אלה שייכות לצינון או לנעילה).

**התאוששות עצלה:** כאשר תוקף `OPEN` פג, `getStatus()`,‏ `canExecute()`,‏ `getRetryAfterMs()` מעדכנים את המצב ל-`HALF_OPEN`. אותן פעולות קריאה (וכן הכשל הבא) מחזירות בהדרגה מצב `DEGRADED` מיושן ל-`CLOSED`. אין צורך בטיימר רקע.

---

### צינון ספק גלובלי אופציונלי (שער חלון)

שכבה רביעית, **אופציונלית** (`PROVIDER_COOLDOWN_ENABLED`,‏ **כבויה** כברירת מחדל), שומרת
זיכרון חוצה-בקשות של ספקים שנכשלו בתוך
`open-sse/services/providerCooldownTracker.ts`, ונבדקת בעת פתרון יעדים משולבים,
כך שבקשות משולבות עוקבות מפסיקות לנסות שוב ספק שזה עתה נכשל. רשומות ברמת הספק
מצייתות לשער החלון `PROVIDER_PROFILES`:

| פרופיל   | מופעל לאחר (`providerFailureThreshold`) | בתוך (`providerFailureWindowMs`) | צינון למשך (`providerCooldownMs`) |
| -------- | --------------------------------------: | -------------------------------: | --------------------------------: |
| OAuth    |                                    `10` |                          `15min` |                            `5min` |
| מפתח API |                                    `15` |                          `30min` |                           `10min` |

מתחת לסף, הספק **אינו** נחשב כנמצא בצינון; הצלחה מנקה
את החלון. רשומות ברמת החיבור (`provider:connectionId`) ממשיכות להשתמש
בנסיגה המעריכית `minRetryCooldownMs → maxRetryCooldownMs`. דריסות:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
הגנה מפני רגרסיה: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. תקופת צינון לחיבור

**תחולה:** חיבור/חשבון/מפתח יחיד של ספק.

**מטרה:** לדלג על מפתח לא תקין אחד, בזמן שחיבורים אחרים של אותו ספק ממשיכים לספק שירות.

**מימוש:**

- סימון כלא זמין: `src/sse/services/auth.ts::markAccountUnavailable()`
- בחירה: `getProviderCredentials*` באותו קובץ
- חישוב תקופת הצינון: `open-sse/services/accountFallback.ts::checkFallbackError()`
- הגדרות: `src/lib/resilience/settings.ts`

**שדות לכל חיבור:**

- `rateLimitedUntil` — חותמת זמן שעד אליה נמשכת תקופת הצינון
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — מונה השהיה מעריכית

**תקופות צינון כברירת מחדל:**

- בסיס OAuth:‏ 5 שניות
- בסיס מפתח API:‏ 3 שניות
- 429 של מפתח API: מעדיף כותרות `Retry-After`/איפוס ממקור upstream/טקסט איפוס שניתן לניתוח
- השהיה: `baseCooldownMs * 2 ** failureIndex`

**הגנה מפני עדר רועם:** מונעת מכשלים מקביליים להאריך יתר על המידה את תקופת הצינון או להגדיל את `backoffLevel` פעמיים.

**שגיאות 429 של מגבלת מקביליות אינן מטפסות בסולם ההשהיה.** שגיאת `429` שהגוף שלה מדווח על
מגבלת מקביליות ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) פירושה שהחשבון תקין אך עמוס.
`checkFallbackError()` מחזירה את הסיבה `concurrency_limited`: יש לעבור כעת לחיבור
הבא, לצנן חיבור זה למשך `CONCURRENCY_LIMIT_COOLDOWN_MS` קבוע (שנייה אחת) או בהתאם
להנחיית הניסיון החוזר ממקור upstream, להשאיר את `backoffLevel` ללא שינוי ולהגדיר `skipProviderBreaker`.
גוף שמציין במפורש מכסה עדיין גובר, ולכן גוף שתואם גם לדפוס מכסה נשאר מסווג
כמכסה. זיהוי: `looksLikeConcurrencyLimit()` בתוך `src/shared/utils/classify429.ts`;
הכרעה: `open-sse/services/accountFallback/concurrencyLimit429.ts`. הפונקציה `classify429()` (ה־
`FailureKind` של המפסק) נשארת ללא שינוי ועדיין מחזירה `rate_limit` עבור גופים אלה.

**תקיעות בתוכן הזרם אינן מצננות את החשבון.** כאשר מנגנון המעקב אחר תקיעות תוכן
(`open-sse/utils/streamHandler.ts`) מוותר על זרם שלא שלח פלט מודל
בזמן, `markAccountUnavailable()` מתעדת את השגיאה בחיבור אך אינה מגדירה
תקופת צינון: התקיעות שייכת לבקשה זו, וברוב המקרים מדובר בסבב הסקה ארוך שטרם הפיק
פלט. מפעילים יכולים להצטרף מחדש באמצעות `resilienceSettings.streamStallCooldown.enabled`
(ברירת המחדל היא `false`).

**מסגרות הסקה מאתחלות מחדש את תקציב הזמן לתקיעות תוכן.** מודל הסקה יכול לחשוב במשך
דקות לפני האסימון הגלוי הראשון שלו: Claude מזרים מסגרות `thinking_delta` שטקסט
החשיבה שלהן עשוי להיות ריק, ו־Responses API מזרים פריט הסקה אחד אחרי
השני. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) מזהה
מסגרות אלה, ומנגנון המעקב מאתחל מחדש את התקציב שלו בכל אחת מהן במקום לבטל את
הסבב. הן עדיין אינן פלט מודל, ולכן סבב שמסתיים בהסקה בלבד עדיין
מדווח כריק, וסבב שמפסיק להסיק ושולח רק אותות פעימות לב עדיין מפעיל
את מנגנון המעקב.

מסגרות `reasoningContentEvent` הבינאריות של Kiro בעלות חתימה שאינה ריקה משמרות את
פעילות ההסקה הזו דרך המבצע כדלתא ריקה של `reasoning_content`. החתימה
אינה מועברת הלאה. מטא־נתונים, מסגרות חלקיות וחתימות ריקות אינם מאתחלים מחדש את
תקציב התוכן; מגבלת הזמן העצמאית של הזרם הפעיל וביטול מצד הלקוח עדיין
חלים (`open-sse/executors/kiro/reasoning.ts`).

**מצבים סופיים (אינם תקופות צינון):**

- `banned` — מוגדר בעקבות זיהוי מילת מפתח חסומה / חסימת חשבון (ראו [BAN_DETECTION](../security/BAN_DETECTION.md)), וכן בעקבות שלושה סירובים רצופים ממקור upstream ברמת הבקשה (`request_rejected`, לדוגמה Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); סירוב יחיד רק מצנן את החיבור
- `expired` (עובר למצב סופי לאחר מספר מוגבל של ניסיונות חוזרים — `EXPIRED_RETRY_MAX = 3` עם השהיה מעריכית — כדי ששגיאות OAuth זמניות יוכלו להתאושש מעצמן לפני שהחשבון מושבת לצמיתות)
- `credits_exhausted`

מצבים אלה נשמרים עד שפרטי ההזדהות משתנים או שמפעיל מאפס אותם. אין לדרוס מצבים סופיים במצב צינון זמני.

**התאוששות עצלה:** לאחר ש־`rateLimitedUntil` חלף, החיבור נעשה כשיר שוב. לאחר שימוש מוצלח, `clearAccountError()` מנקה את כל שדות השגיאה.

### חומת השימוש של Claude OAuth: נתיב בעדיפות נמוכה יותר + איפוס מגבלת ההפעלה

**תחולה:** חיבור אחד של מינוי Claude‏ (OAuth). שתי התכונות הן **בהצטרפות יזומה לכל
חיבור** (עריכת חיבור → המקטע Claude →‏ `lowPriorityMode` /‏ `autoLimitReset` בתוך
`providerSpecificData`, שתיהן כבויות כברירת מחדל) ומשקפות את הפקודות `/low-priority` ו־
`/limit-reset` של Claude Code (חוזה התקשורת תועד מ־Claude Code 2.1.263).

**מימוש:**

- מכונת מצבים + סיווג תגובות: `open-sse/services/claudeLowPriority.ts`
- לקוח לבדיקת מצב האיפוס/תביעתו: `open-sse/services/claudeLimitReset.ts`
- נקודת חיבור במבצע (הזרקת כותרת + ניסיון חוזר באותו חשבון): `open-sse/executors/base.ts::execute()`
- שמירת ההצטרפות היזומה: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**גורם מפעיל:** חומת השימוש של 5 שעות — שגיאת `429` שהכותרות שלה מכילות
`anthropic-ratelimit-unified-status: rejected`, וכאשר החשבון כשיר,
`anthropic-ratelimit-unified-slow-offer: treatment`. דבר אינו נשלח לפני שגיאת 429 הראשונה של החומה;
שגיאת 429 עקב התפרצות ללא כותרות מאוחדות עוברת במסלול הצינון הרגיל.

**נתיב בעדיפות נמוכה יותר** (`lowPriorityMode`):

- ב-429 של החומה, המבצע מקבל את ההצעה ומנסה מיד שוב עם **אותו**
  חשבון ועם `anthropic-usage-limit: slow`; הנתיב נשאר פעיל עד
  `anthropic-ratelimit-unified-reset` שהוכרז (+60 שניות חסד), וכל בקשה בחלון זמן זה נושאת
  את הכותרת. ה-429 שיורט לעולם אינו מגיע אל `handleChatCore`, ולכן החיבור
  **אינו** מועבר להשהיה ואינו מוחלף.
- `anthropic-ratelimit-unified-slow-status` בתגובות מאוחרות יותר: `active` / `not_needed`
  משאירים את הנתיב; `slot_busy` (429) או `529` ממתינים למשך
  `anthropic-ratelimit-unified-slow-retry-after` של השרת (ברירת מחדל 20 שניות, תחימה ל-5–600 שניות, ריצוד של ±30%)
  ומנסים שוב, בכפוף ל-`anthropic-ratelimit-unified-slow-max-wait` (ברירת מחדל 20 דקות, תחימה
  לדקה אחת–6 שעות) — לאחר מכן הנתיב מסתיים וצינון של 10 דקות חוסם קבלה מחדש. בנוסף,
  ההמתנה מוגבלת לפי הזמן שנותר עד לפקיעת זמן ההתחלה מול המקור של הבקשה עצמה
  (`resolveFetchStartTimeout`, ברירת מחדל 10 דקות), פחות מרווח של 5 שניות: ללא מגבלה זו,
  ברירת המחדל של 20 דקות להמתנה מרבית הייתה נמשכת מעבר לחיי הבקשה, והשינה הייתה מתבטלת
  באמצע ההמתנה, תוך הצפת `TimeoutError` במקום סיום תקין מסוג `max_wait` + צינון.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, התחלפות חלון של 5 שעות, או
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (שמסיים אותו בתור
  `extra_usage` בכל סטטוס, משום שחריגה בתשלום מכסה כעת את החומה) מסיימים את הנתיב;
  לאחר מכן התגובה ממשיכה למסלול הצינון הרגיל. `budget_exhausted` נשמר עד
  לאיפוס התקציב שהוכרז (≤ 8 ימים).
- בדיקת החומה מתבצעת לאחר הניסיונות החוזרים בתוך אותו ניסיון של המבצע עצמו, שמונעים משגיאת 400 (עריכת
  הקשר, תחימת חשיבה/מאמץ, למידה אוטומטית של פרמטרים), כך ש-429 של החומה שמופיע רק
  באחד מהניסיונות החוזרים האלה עדיין מיורט במקום להגיע למסלול הצינון.
- המצב נשמר בזיכרון לכל חיבור (הפעלה מחדש עולה ב-429 נוסף אחד של החומה לצורך קבלה מחדש).

**איפוס מגבלת הפעלה** (`autoLimitReset`, מתבצע לפני הנתיב כאשר שניהם מופעלים):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` ← הבלוק `juniper_tide`;
  כאשר `arm: "reset"` וגם `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` עם
  `{ "program": "juniper_tide" }` (מזהה UUID של הארגון מתוך
  `providerSpecificData.organizationUUID`, עם נסיגה לאתחול).
- `result: reset|not_limited` ← הבקשה מנוסה שוב במהירות מלאה (ללא כותרת האטה).
  `already_used` / `not_offered` שומרים בזיכרון את `next_available_at` (ברירת מחדל שבוע אחד);
  כל כשל גורר השהיה מעריכית של 15 דקות. האיפוס מתבצע פעם בשבוע ועדיין נספר במסגרת
  המגבלה השבועית.

מגני רגרסיה: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### שיוך הפעלה (#7274)

**תחולה:** הפעלת לקוח אחת (כותרת `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) מוצמדת לחיבור אחד, עבור **כל** ספק.

**מטרה:** להשאיר סוכן מרובה-תורות (Claude Code, aider, סוכנים מותאמים אישית) באותו חשבון בין בקשות, ובכך לצמצם אובדן הקשר בין חשבונות ושגיאות 429 חוזרות של התחלה קרה אצל ספקים בעלי מצב הפעלה נפרד לכל חשבון.

**מימוש:**

- קביעת TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- בחירת/יצירת הצמדה: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- חילוץ כותרת (כללי, לכל ספק): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- טבלת הצמדות מתמידה: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- הגדרה: `sessionAffinityTtlMs` (TTL גלובלי באלפיות שנייה, `0` משבית) — `src/lib/db/settings.ts`. השם שונה מ-`codexSessionAffinityTtlMs`, שהיה ייחודי ל-Codex, באמצעות המיגרציה `124_generic_session_affinity_ttl.sql`, שמעבירה כל TTL של Codex שהוגדר קודם לכן כברירת המחדל החדשה.

לפני #7274, הפונקציה `resolveSessionAffinityTtlMs()` החזירה מיד `0` עבור כל ספק מלבד `codex`, ולכן להגדרת ה-TTL (ולכותרות ההפעלה) לא הייתה השפעה בשום מקום אחר, אף על פי שמנגנון ההצמדה וחילוץ הכותרות כבר היו בלתי תלויים בספק. התיקון הסיר את ההחזרה המוקדמת הזו; כעת ה-TTL חל באופן אחיד על כל ספק לאחר שהוא מוגדר גלובלית לערך הגדול מ-`0`.

שלוש כותרות שיוך ההפעלה לעולם אינן מועברות למקור — המבצעים בונים את כותרות המקור שלהם מאפס במקום להעביר את כותרות הלקוח, ולכן זה נשאר מזהה מתאם פנימי בלבד.

### חכירות בלעדיות של חיבורי הפעלה מנוהלים

**תחולה:** לקוח/הפעלת HTTP מנוהלים ופעילים יחידים מחזיקים בחיבור OmniRoute כשיר אחד.

**מטרה:** לספק בעלות בלעדית ועמידה על חיבור עבור לקוחות שזקוקים לגבול ניתוב קשיח
בין בקשות. הדבר שונה משיוך הפעלה, שהוא העדפה רכה להמשכיות:
חכירה בלעדית שומרת מצב מחזור חיים ב-SQLite, אוכפת ייחודיות גלובלית של בעלים פעילים ושל
חיבור פעיל, ודוחה דור מיושן לפני הניתוב לספק.

התכונה היא אופציונלית לכל מפתח API. מפתח מנוהל חייב לכלול את ההרשאה `lease:exclusive` ורשימת
`allowedConnections` מפורשת שאינה ריקה. כל לקוח HTTP יכול להשתמש בנקודת הקצה של מחזור החיים; אין
צורך בשם לקוח, בסוכן משתמש, בספק, בשיטת OAuth או במודל. החכירה מחזיקה בחיבור,
לא במודל, ולכן שינוי מודל שומר על הקישור כל עוד החיבור ממשיך להיות כשיר
באופן רגיל. כללי המודל, המכסה, התקינות, הצינון ורשימת ההיתרים הרגילים נותרים הסמכות הקובעת, ועשויים
להעביר את אותו דור לחיבור כשיר ופנוי אחר.

מחזור החיים הוא `POST /api/v1/session-leases` עם פעולות JSON מסוג `acquire`,‏ `renew` ו-`release`.
בקשות הסקה מנוהלות מציגות את הערך האטום `X-OmniRoute-Lease-Owner` ואת הערך המדויק
`X-OmniRoute-Lease-Generation`. הבעלים משתמש ב-`vlo_` ואחריו 43 תווי base64url; רק גיבוב
SHA-256 שלו נשמר. כל גדר שיגור סופית נקשרת גם למזהה מפתח ה-API המאומת ולמזהה
החיבור הפעיל. כותרות בקרת החכירה מוסרות מיומני הרישום, מתצלומי הבקשות שנשמרו ומכותרות
מבצע ההרצה במעלה הזרם.

אם לניתוב רגיל יש מועמדים מנוהלים כשירים, אך כל מועמד פנוי תפוס בידי חכירה פעילה
זרה, OmniRoute מחזיר HTTP `429`, קוד lease-capacity-unavailable, מצב
waiting-for-capacity ו-`Retry-After` מוגבל הנגזר ממועד התפוגה הרלוונטי המוקדם ביותר.
היעדר כשירות רגיל אינו תחרות על חכירה, והוא שומר על סמנטיקת שגיאות הניתוב הקיימת שלו.

מנגנונים קשורים נותרים נפרדים:

- תפוסת הפעלות OAuth היא חלוקה רכה מקומית לתהליך עבור חשבונות OAuth.
- סמפורים של חשבונות מעניקים היתרי מקביליות לבקשות ומסתיימים כאשר בקשה מושלמת.
- חכירוֹת בלעדיות של הפעלות מנוהלות הן בעלות מתמשכת לאורך מחזור החיים, עם גדר דור.

---

## 3. נעילת מודל

**תחולה:** שלשה של ספק + חיבור + מודל.

**תחולת המפתח לפי סטטוס:** הסטטוס שנכשל קובע לאיזה מפתח תיכתב נעילה
(`resolveLockoutScope()` בקובץ `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — אות למכסה או לזכאות — נועלים את **משפחת המכסה**:
  עבור codex, את כל תחולת `codex` / `spark` (כל מודל `gpt-5*` של
  החיבור); עבור ספקים אחרים, `getQuotaScopedModelForProvider()`.
- `404` נועל את המודל עצמו (`getModelLockKey()` מצמצם את `not_found`).
- כל סטטוס אחר — כשלי תעבורה/שרת מסוג `5xx` וכן `502` ש-OmniRoute עצמו
  מייצר מאימות איכות — נועל רק את שלשת
  הספק/חיבור/מודל **המדויקת**. זרם פגום במודל אחד אינו ראיה
  לגבי מכסת החשבון; לפני כלל זה, תגובה ריקה אחת מ-
  `codex/gpt-5.6-luna` הסירה מהניתוב כל מודל `gpt-5*` של אותו חיבור
  למשך 2–30 דקות (עם הסלמה), אף שהמכסה שלו לא נפגעה.
- האפשרות המפורשת `scope` של הקורא תמיד גוברת (Antigravity מעביר `"exact"`).

**מטרה:** למנוע השבתה של חיבור שלם כאשר רק מודל אחד אינו זמין או מוגבל במכסה.

**דוגמאות:**

- ספקים עם מכסה לכל מודל שמחזירים 429
- ספקים מקומיים שמחזירים 404 עבור מודל חסר אחד
- כשלי הרשאה למצב/מודל הייחודיים לספק (למשל מצבי Grok)

**מימוש:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### לוח בקרה לצינוני מודלים (v3.8.0)

ממשק משתמש: הגדרות → צינוני מודלים (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

מציג נעילות פעילות עם: ספק, חיבור, מודל, סיבה, `expiresAt`. מפעילים יכולים להפעיל מחדש מודל באופן ידני מהכרטיס.

**REST API:**

- `GET /api/resilience/model-cooldowns` — הצגת נעילות פעילות
- `DELETE /api/resilience/model-cooldowns` — הפעלה מחדש ידנית. גוף: `{provider, connection, model}`. אימות: ניהול.

### מנהל הצינון

ממשק משתמש: ניטור → מנהל הצינון (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

עמוד אחד לכל חיבור שהוצא מהניתוב מסיבה זמנית, במקום
לפתוח את העמוד של כל ספק. הוא מציג צינוני חיבורים, נעילות מודלים ומצבים
סופיים; מנקה אותם לפי חיבור, עבור בחירה או עבור כל החיבורים של ספק;
ועורך את כללי הצינון שעוברים את מירב הכוונון: `streamStallCooldown.enabled` וכן את צינון הבסיס
של `connectionCooldown` עבור OAuth / מפתח API ואת מספר צעדי ההשהיה החוזרת המרבי (נשמרים באמצעות
`PATCH /api/resilience`). מצבים סופיים (`banned`, `expired`, `credits_exhausted`)
מוצגים, אך לעולם אינם מנוקים כאן.

**REST API** (`src/lib/resilience/cooldownManager.ts`, אימות: ניהול):

- `GET /api/resilience/cooldowns[?provider=]` — חיבורים עם סטטוס, זמן צינון שנותר,
  רמת השהיה חוזרת, סוג השגיאה האחרון ונעילות מודלים (ללא פרטי גישה)
- `POST /api/resilience/cooldowns` — גוף `{connectionIds: string[]}` או
  `{all: true, provider?}`; מחזיר `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### ממשק הגדרות נעילה + התאוששות באמצעות דעיכה בעקבות הצלחה (v3.8.23)

נעילת מודל השתנתה מהתנהגות מקודדת קשיחה ופעילה תמיד לתכונה הניתנת להגדרה מלאה,
שיש להפעילה במפורש, עם כרטיס הגדרות משלה ונתיב התאוששות שמתקן את עצמו.

**כרטיס הגדרות:** הגדרות → נעילת מודל
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
כרטיס זה **נפרד** מ-`ModelCooldownsCard` לקריאה בלבד שמופיע לעיל (שרק
_מציג_ נעילות פעילות) — הכרטיס החדש _מגדיר את הפרמטרים_. ערכי ברירת המחדל
נמצאים ב-`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| הגדרה                   | ברירת מחדל                       | משמעות                                           |
| ----------------------- | -------------------------------- | ------------------------------------------------ |
| `enabled`               | `false`                          | מתג ראשי — נעילת מודל **כבויה כברירת מחדל**.     |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | סטטוסים ממקור חיצוני שנחשבים לכשל בתחולת מודל.   |
| `baseCooldownMs`        | `120_000` (120 שניות)            | משך הנעילה הראשוני עבור הכשל הראשון.             |
| `maxCooldownMs`         | `1_800_000` (30 דקות)            | הגבול העליון לצינון לאחר הסלמה.                  |
| `maxBackoffSteps`       | `10`                             | המספר המרבי של צעדי הסלמה בהשהיה חוזרת מעריכית.  |
| `useExponentialBackoff` | `true`                           | האם כשלים חוזרים מסלימים את הצינון באופן מעריכי. |

ההגדרות נשמרות באמצעות מאגר ההגדרות הרגיל ומאומתות דרך סכמת
הגדרות העמידות; הכרטיס מגביל את `baseCooldownMs`/`maxCooldownMs`
(כאשר `maxCooldownMs ≥ baseCooldownMs`) ואת `maxBackoffSteps`.

**התאוששות באמצעות דעיכה בעקבות הצלחה:** ההתאוששות **אינה** מבוססת אך ורק על פקיעת הטיימר. תגובה
תקינה מפחיתה בהדרגה את מונה הכשלים של המודל, כך שמודל שהתאושש
באמצע החלון מפסיק להסלים (והנעילה מתאפסת) לפני מועד פקיעת הטיימר. כאשר יעד
משולב מצליח, `open-sse/services/combo.ts` קורא ל-`decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), אשר **חוצה** את
`failureCount` השמור (`Math.floor(failureCount / 2)`); כשהוא מגיע ל-`0`, רשומת
הנעילה נמחקת לחלוטין. הפעולה המקבילה `recordModelLockoutFailure()`
מגדילה את המונה (ומסלימה את הצינון) עבור כשלים בתוך
חלון ההסלמה. דעיכה זו בעקבות הצלחה מתווספת לפקיעת הטיימר הרגילה —
כל אחד מהנתיבים יכול להפעיל מחדש מודל.

**מצב:** הנעילות נשמרות **בזיכרון** (`Map`-ים לכל תהליך של
`ModelLockoutEntry`, עם מפתחות בתבנית `provider:connectionId:model`, ונעילות בתחולה מדויקת עם מפתחות בתבנית
`provider:connectionId:exact:model`), ואינן נשמרות
במסד הנתונים — הן אובדות בהפעלה מחדש. _ההגדרות_ נשמרות; _מצב_ הנעילה
הפעיל הוא זמני.

---

## 4. בקרת מקביליות בשיתוף מכסה (v3.8.36)

חשבונות מנוי (GLM, MiniMax וכו׳) מקבלים לעיתים קרובות רק כ־1–3 בקשות
מקבילות; חריגה מכך גורמת לשגיאות 429 ולתקופות צינון. מצב זה חמור במיוחד
בשילובי **שיתוף מכסה** (`qtSd/…`), שבהם כמה מפתחות API חולקים חשבון
מקור אחד. שלוש שכבות מונעות הצפה של חשבון משותף.

### מגבלת מקביליות לכל חיבור (`max_concurrent`)

כל חיבור לספק יכול להגדיר תקרה של `max_concurrent`
(`provider_connections.max_concurrent`, המוגדרת בחלונית החיבור / API / מסד הנתונים).
השאירו אותה ריקה כדי שלא תהיה מגבלה. זוהי ההגדרה היחידה שמניעה את שכבת הסריאליזציה
שלהלן — הגדירו אותה בהתאם למקביליות האמיתית של החשבון (למשל GLM כ־1, MiniMax כ־2).

### מגבלות מקביליות לכל מודל (`modelConcurrency`)

חיבור יכול להגדיר בנוסף תקרות מקביליות מדויקות לכל מודל
בתוך מפת `rateLimitOverrides` שלו:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

הגדירו זאת בחלונית החיבור (**עקיפות מגבלת קצב → תקרות מקביליות
לכל מודל**, ערך `model=cap` אחד בכל שורה) או באמצעות
`PATCH /api/providers/[id]` עם אותו מבנה JSON. משמעות המפתחות:

- **לכל החיבור לעומת מודל מסוים:** `maxConcurrent` נשאר התקרה המשותפת
  לכל החיבור. כאשר שתי המגבלות חלות, שני השערים נרכשים
  באופן אטומי באותו שער מורכב
  (`global → provider → account → model`); בפועל חלה
  המגבלה המחמירה יותר.
- **התאמה מדויקת של מפתח המודל:** המפתח הוא מחרוזת המודל שמועברת
  למבצע לאחר פתרון הניתוב — בדרך כלל מזהה מודל המקור ללא קידומת
  (`glm-5`), ולא כינוי `provider/model` בצד הלקוח (`zai/glm-5` אינו
  תואם ל־`glm-5`). הערכים הם תקרות של מספר חיובי ושלם לבקשות מקבילות.
- **תור מקומי, ללא גילוי:** בקשות עודפות ממתינות בתור המקומי בהתאם
  לסמנטיקת התור/זמן הקצוב הקיימת (שגיאות קבלה מטיפוס `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute אינו מגלה או מסיק את מדיניות
  המקור — הוא אוכף את התקרות המדויקות שהוגדרו בידי המפעיל.
  שער מודל רווי לעולם אינו משבית את הספק ולעולם אינו יוצר נעילה קבועה
  של מודל; התנהגות 429/צינון/מעבר חלופי של המקור נשארת מנגנון הגיבוי לטיפול בשגיאות.
- **תחולה לכל חיבור ולכל תהליך:** המגבלות חלות על כל חיבור במסד הנתונים
  ונשמרות בזיכרון, ולכן שני חיבורים המשתמשים מחדש באותו מפתח API של המקור
  אינם מתואמים זה עם זה.
- **ללא הגדרה פירושו ללא שינוי:** השמטת המפה (או השארת השדה
  בלוח הבקרה ריק) אינה מוסיפה שער מודל. דוגמת תצורה שאינה
  קובעת מגבלה אוניברסלית כלשהי לספק:

```text
glm-5=1
glm-4.7=3
```

### סריאליזציה של בקשות בשיתוף מכסה

כאשר שיגור בשיתוף מכסה מכוון לחיבור שמגדיר
`max_concurrent` חיובי, בקשות מקבילות אל **החשבון** עוברות סריאליזציה דרך
סמפור לכל חיבור (מפתח `qsconn:<connectionId>`): בקשות עודפות **ממתינות
בתור** במקום להציף את החשבון. המנגנון הוא **fail-open** — תור רווי
או זמן קצוב שהסתיים מאפשרים להמשיך ללא משבצת, במקום לדחות אי פעם בקשה
שניתן לשגר. החליפו את המצב דרך **הגדרות → עמידות → מקביליות לכל חיבור
בשיתוף מכסה** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, מופעל
כברירת מחדל). ללא מגבלת `max_concurrent`, ההתנהגות אינה משתנה.

> שער הניתוב של שיתוף המכסה (`selectQuotaShareTarget`, ‏DRR + P2C) הוא עצמו
> fail-open ורק מעניק _עדיפות נמוכה יותר_ לחיבור שהגיע למגבלה — במאגר
> הכולל חיבור יחיד הוא אינו יכול לאכוף מגבלה קשיחה, ולכן הסמפור הזה הוא שמרסן
> בפועל את ההצפה.

### ניסיון חוזר מודע לצינון בשילובים

בכל אסטרטגיית שילוב (כאשר היא מופעלת), בקשה שהייתה מקבעת שגיאת 429
בשל צינון זמני וקצר ממתינה לסיומו ומשוגרת מחדש במקום
להחזיר את שגיאת 429 — הדבר מכסה חלונות TPM/RPM מסוג Gemini (כ־60 שניות
של retry-after) בשילובים מרובי מודלים, למשל כאשר שני היעדים בשילוב של שני מודלים
נתקלים במגבלת קצב לכל מודל. ההתנהגות מוגבלת באמצעות `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) תחת **הגדרות → עמידות**.
היא לעולם אינה ממתינה במקרה של `quota_exhausted` (נעול עד חצות) או מסיבות
אימות/לא נמצא.

אותו שער מכסה גם את המקרה שלפני השיגור (#16319): כאשר מדלגים על כל יעד
בשילוב לפני שמתבצע ניסיון כלשהו מפני שהמודל שלו נמצא בנעילה זמנית קצרה,
הנתיב ללא ניסיונות ממתין לסיום הנעילה תחת אותן תקרות ומשגר מחדש, במקום
להשיב `503 ALL_TARGETS_SKIPPED` ללא רמז. כאשר המתנה אינה מותרת (התקרה,
מספר הניסיונות או התקציב מוצו, או שהתכונה כבויה), התגובה הסופית משתדרגת
ל־`429 rate_limit_error` וכוללת `retry_after` / `reset_at` ממועד הפקיעה
המוקדם ביותר של נעילה זמנית; נעילות מכסה, אימות ולא נמצא ממשיכות להחזיר 503 ללא רמז.

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

## 5. בקרת קבלה לתור הבקשות (v3.8.49 · בעיה #6593)

**תחום**: תור הגבלת הקצב המקומי לכל ספק+חיבור (`open-sse/services/rateLimitManager.ts`,
המבוסס על Bottleneck), שכבה אחת מתחת לשלושת המנגנונים שלעיל.

**`maxWaitMs` מגביל את ההמתנה בתור; `executionMaxWaitMs` מגביל את הביצוע.**
השניים נפרדים במכוון, ואף אחד מהם אינו משפיע על האחר.

`resilienceSettings.requestQueue.maxWaitMs` הוא **תקציב ההמתנה בתור**: הוא
כולל המתנה למשבצת אצל הספק ולאחר מכן שהייה במצב QUEUED, והטיימר שלו
מתאפס ברגע שהמשימה יוצאת מ-QUEUED ומתחילה להתבצע
(`rateLimitManager.ts`, `wrappedFn`). בקשה שחורגת ממנו לעולם אינה מגיעה
לשירות במעלה הזרם. ברירת המחדל היא 30000ms, והיא מסופקת על ידי `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
ב-`src/lib/resilience/settings.ts` ומעוגנת על ידי
`tests/unit/ratelimit-admission-control-6593.test.ts`, כך ששינוי שלה יכשיל
את הבדיקה במקום להשאיר את הפסקה הזאת מיושנת ללא התרעה.

`resilienceSettings.requestQueue.executionMaxWaitMs` הוא הערך ש-Bottleneck
מקבל בתור `expiration` של המשימה, והטיימר שלו מתחיל רק לאחר השיגור. הוא משמש
כרשת ביטחון עבור מבצעים שאין להם זמן קצוב משלהם מול השירות במעלה הזרם, והוא
מוגדל לזמן הקצוב של תחילת ה-fetch של המבצע עצמו כאשר זמן זה ארוך יותר, כך שהוא
אינו יכול לקטוע תגובה תקינה שכבר נמצאת בתהליך. ברירת המחדל היא 600000ms (10 דקות).

הזנת תקציב התור אל `expiration` היא שגרמה בעבר להפסקת שערים לא-אינקרמנטליים
באמצע הפעולה — הם פועלים באופן לגיטימי במשך דקות לפני הגעת הבתים הראשונים —
וזו הסיבה שתפוגה נחשפת בתור `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), בעוד תקציב התור נושא את קוד
הזמן הקצוב של התור. ניתן לדרוס כל אחד מהם באמצעות `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (משתני סביבה) או דרך לוח הבקרה
(**הגדרות ← שרידות**). שניהם מוגבלים לטווח 1ms–24h במהלך הנרמול.

**סדר קדימויות, עבור שניהם:** משתנה הסביבה מספק רק את _ברירת המחדל_. ערך
שנשמר ב-`resilienceSettings.requestQueue` (דרך לוח הבקרה / תיקון API, ונשמר
ב-`key_value`) גובר עליו, ו-`rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` ברמת החיבור גובר עליו. לכן, הגדרת משתנה הסביבה בפריסה
שכבר כוללת ערך שמור אינה משנה דבר — במקום זאת, יש לנקות או לעדכן את ההגדרה השמורה.

משך השהייה בתור מוגבל על ידי `maxWaitMs`; הערך `maxQueueDepth` שלהלן מגביל את
מספר הפונים שיכולים להמתין בתור בו-זמנית.

**ניסיונות חוזרים המצוינים בגוף: ויסות לעומת נעילה.** גוף 429 יכול לציין זמן המתנה
משלו (`RetryInfo.retryDelay` של Gemini, טקסט מסוג "retry after Ns"), שאותו
`updateFromResponseBody` קורא. המתנה שנכנסת בגבולות `maxWaitMs` של החיבור
משמשת לוויסות: המגביל מרוקן את המאגר שלו למשך פרק זמן זה, והקריאות שבתור
משוגרות כאשר הוא מתמלא מחדש. המתנה ארוכה מ-`maxWaitMs` אינה דבר שהתור
יכול להמתין עד לסיומו — Gemini משיב על מיצוי מכסה יומית באמצעות
`retryDelay: "86399s"`. הכותרת `Retry-After` המועברת ב-429 שנבנה מחדש (#16528)
כבר גורמת למנוע החלופי לנעול את המודל למשך חלון זמן זה, אך השהיית המגביל
למשך הזמן הזה הייתה עדיין מעכבת כל קריאה שמגיעה למפתח מוקדם
(למשל לאחר איפוס שרידות) למשך כל `maxWaitMs`. כאשר המתנה כזאת מגיעה מפרט Google `RetryInfo`
מטיפוס מוגדר (עם מקור `google_rpc_retry_info`) והמגביל של המפתח כבר
מוגדר ברמת המודל (ראו `getLimiterKey`), ה-429 הופך במקום זאת לנעילת מודל
בחיבור זה (`lockModelForLongBodyRetry` ב-
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, מוגבל ל-24h), והמגביל
אינו מושהה. בחירת החשבון מדלגת בעקבות נעילה זו באמצעות
`isModelLocked()`, וכך גם שער טרום-השיגור המשולב עבור יעדים המוצמדים
לחיבור. ב-antigravity, שבו המגביל מוגדר לכל משפחת מכסה, הנעילה חלה
על המודל המדויק, כמו נעילות המכסה האחרות שלו. גם השם שהלקוח ביקש
ננעל כאשר כינוי הפנה אותו למודל זה, משום שהבדיקות האלה משתמשות בשם
המבוקש; הוא ננעל במדויק (`lockExactModel`), ולכן כינוי שחוצה משפחת מכסה
של antigravity או תחום codex לעולם אינו נועל את עצמו. רמז טקסטואלי, `retryDelay`
ללא טיפוס מוגדר, או מגביל המשותף לחיבור כולו משאירים את ההשהיה על כנה.
כאשר המגביל שנתיב ה-429 בנה מחדש זה עתה אכן מושהה, פונה שזמן התור הנותר
שלו מסתיים לפני תום ההשהיה נדחה מיד עם קוד הזמן הקצוב של התור
(`checkLimiterPause`), במקום להמתין עד שזמן זה יחלוף; זמן הסיום המתועד
מעוגן לפני בניית המגביל, בנקודה שבה Bottleneck מפעיל את שעון הרענון שלו,
וכל שינוי מאוחר יותר במאגר מוחק אותו. התנהגות זו מכוסה על ידי
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` וכן
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — מגבלת קבלה אופציונלית (חדש).** `resilienceSettings.requestQueue.maxQueueDepth`
מגביל את מספר הבקשות שיכולות להמתין בתור (ועדיין לא שוגרו) עבור
ספק+חיבור אחד בו-זמנית. כאשר התור כבר מכיל `maxQueueDepth`
בקשות, בקשה חדשה נדחית במהירות עם שגיאה מטיפוס מוגדר
`code: "RATE_LIMIT_QUEUE_FULL"` **לפני** שהיא מגיעה אי פעם אל `limiter.schedule()`
— כך שהדחייה זולה ומתרחשת לפני כל עבודת דחיסת הנחיה / תרגום במורד הזרם
עבור אותה בקשה. ברירת המחדל `0` = מושבת, תוך שימור ההתנהגות הקיימת של תור
ללא הגבלה; הטווח מוגבל ל-0–100000.
ניתן לדרוס באמצעות `RATE_LIMIT_MAX_QUEUE_DEPTH` (משתנה סביבה) או
`resilienceSettings.requestQueue.maxQueueDepth` (תיקון דרך לוח הבקרה/API).

בדיקת הקבלה עצמה היא פונקציה טהורה
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), כך
שניתן לבדוק אותה בבדיקת יחידה ללא מגביל Bottleneck אמיתי.

> ה-RFC שפתח את #6593 הציע גם דגל `bypassCompressionOnRateLimit`.
> צינור העיבוד `open-sse/services/compression/` במאגר זה מיועד לדחיסת
> prompt/context בבקשת ה-LLM היוצאת (`chatCore.ts`, בסביבות הבלוק
> `resolveCompressionSettings`/`selectCompressionStrategy`), ולא לדחיסת תגובת
> HTTP של גופי 429 שנוצרו — אין נתיב קוד תואם עבור דגל עקיפה מילולי. שלב דחיסת
> ה-prompt הזה גם פועל כעת _לפני_ `withRateLimit()` בצינור עיבוד הבקשות, ולכן
> שינוי הסדר כדי לדלג עליו במקרה של דחייה עקב תור מלא הוא שינוי נפרד וגדול יותר
> מהיקף הבעיה הנוכחית; הוא **לא** מומש כאן בכוונה, ונותר להמשך אם החיסכון במשאבי
> CPU מצדיק את הסיכון הכרוך בשינוי הסדר.

### רשת ביטחון להפעלה אוטומטית של הגבלת קצב והגנה על חיבורים (`rateLimitProtection`)

**רשת ביטחון להפעלה אוטומטית** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, ברירת המחדל `true`):
כברירת מחדל, OmniRoute מפעיל באופן אוטומטי הגנת תור להגבלת קצב עבור כל חיבורי הספקים הפעילים המבוססים על מפתח API‏ (`getProviderCategory(provider) === "apikey"`). כך מובטח שבקשות נכנסות אל מפתחות API של שירותים במעלה הזרם, הרגישים לקצב, יוכנסו לתור ויוגבלו באמצעות Bottleneck במקום להישלח בפרצים ולגרום לשגיאות 429 במעלה הזרם. ניתן לעקוף את רשת הביטחון באמצעות משתנה הסביבה `RATE_LIMIT_AUTO_ENABLE` ‏(`false`/`0`/`off` משבית, `true`/`1`/`on` כופה הפעלה), שמקבל עדיפות על פני ההגדרה המתמידה מלוח הבקרה (**הגדרות → שרידות** / `PATCH /api/resilience`).

**הסמנטיקה של `rateLimitProtection` לכל חיבור:**
הגנת הגבלת הקצב לכל חיבור מנוהלת באמצעות השדה הבוליאני `rateLimitProtection` בחיבורי ספקים (נשמר כ-`rate_limit_protection` ב-SQLite):

- **הפעלה מפורשת (`rateLimitProtection === true`)**: הגנת הגבלת הקצב מופעלת במפורש עבור חיבור זה, ללא תלות בקטגוריית הספק או בשאלה אם רשת הביטחון להפעלה אוטומטית מופעלת.
- **השבתה מפורשת (`rateLimitProtection === false`)**: משביתה הגנה מפורשת, אך **אינה** מחריגה חיבור פעיל המבוסס על מפתח API מרשת הביטחון הגלובלית להפעלה אוטומטית. ב-`reconcileEnabledConnections` ‏(`open-sse/services/rateLimitManager.ts`), הערכים `false` ו-`undefined` שקולים: רק `rateLimitProtection === true` נחשב לדריסה מפורשת. אם `rateLimitProtection` הוא `false` (או אינו מוגדר), חיבור פעיל המבוסס על מפתח API עדיין תואם לתנאי ההפעלה האוטומטית ונותר מוגן באמצעות הגבלת קצב.
- **אין אפשרות החרגה לכל חיבור**: מפעיל המערכת אינו יכול כרגע להגדיר ש"חיבור פעיל יחיד זה המבוסס על מפתח API חייב לפעול ללא הגנת תור להגבלת קצב", תוך שמירה על ההפעלה האוטומטית עבור שאר החיבורים. כדי להפעיל חיבורים המבוססים על מפתחות API ללא תורי הגבלת קצב כלל, יש להשבית את רשת הביטחון באופן גלובלי (`RATE_LIMIT_AUTO_ENABLE=false` או `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**נתיבי כתיבה נתמכים:**

- **`POST /api/rate-limits`**: נתיב הכתיבה הנתמך לניהול, המשמש להחלפת מצב `rateLimitProtection` עבור חיבור (`{ connectionId: string, enabled: boolean }`). קריאה אליו עם `enabled: true` מפעילה הגנה מפורשת; קריאה אליו עם `enabled: false` מסירה הגנה מפורשת (אף שחיבורים פעילים המבוססים על מפתחות API נותרים מכוסים על ידי רשת הביטחון הגלובלית אם ההפעלה האוטומטית פעילה).
- **`PUT /api/providers/[id]`**: בכוונה **אינו** מקבל או משנה את `rateLimitProtection` ‏(#11278). עדכון המטא-נתונים של חיבור ספק באמצעות `PUT /api/providers/[id]` לעולם לא ישנה את מצב הגנת הגבלת הקצב המתמיד.

---

## 6. מנגנון מעקב אחר תפוקה בזרם איטי (#9709)

מנגנון ההגנה האופציונלי `resilienceSettings.streamRecovery.throughputWatchdog` מזהה
מקור במעלה הזרם שעדיין שולח מקטעים, אך מפיק פלט עוזר בקצב הנמוך מקצב הפלט
השימושי שהוגדר. הוא נבדל במכוון מפסק הזמן בשל חוסר פעילות:
פעימות לב ומטא-נתונים אינם מאפסים אף אחד משני הטיימרים ואינם נחשבים להתקדמות. הוא גם
נבדל מהמועד האחרון הקשיח לניסיון (#9153), שנותר תקרת בטיחות מוחלטת
ללא קשר לאיכות הפלט.

מנגנון המעקב דורש תקופת חימום ואחריה חלון מתגלגל מלא לפני
שיוכל לבטל. הוא סופר הפרשי טקסט מאירועי הפלט של Chat Completions ושל Responses API
(אומדן שמרני של בתים ב-UTF-8), מתעלם מאירועים ריקים ומאירועים הכוללים שימוש בלבד,
ומשהה את ההערכה בזמן שאירועי קריאת כלים או הסקת מסקנות נמצאים בתהליך. הוא מושבת
כברירת מחדל וניתן להפעילו באמצעות `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
החלון, תקופת החימום, הקצב המינימלי וכמות הפלט המדידה המינימלית מוגבלים על ידי
שכבת הנרמול הרגילה של הגדרות העמידות.

כאשר הוא מופעל, ביטול על ידי מנגנון המעקב חל רק על הניסיון הפעיל מול המקור במעלה הזרם. לפני
שבתים כלשהם גלויים ללקוח, נתיב ההתאוששות המוקדמת הקיים באותו חשבון עשוי לפתוח מחדש
את הניסיון. לאחר האישור, הזרם לעולם אינו מופעל מחדש באופן עיוור; רק חוזה ההמשך
הבטוח הקיים באמצע הזרם יכול לחבר סיומת. הסיום נותר
חד-פעמי, כך שחשבונאות השימוש ושחרור הסמפור אינם מתבצעים פעמיים.

---

## 7. הצהרה מחדש על סטטוס המקור במעלה הזרם (שגיאות מכסה שדווחו באופן שגוי)

**תחום:** שער יחיד במעלה הזרם שמדווח על מיצוי זמני של המכסה באמצעות סטטוס HTTP שגוי.

**מטרה:** לתקן סטטוס מטעה לפני הסיווג, כדי שצרכנים במורד הזרם (מנוע הגיבוי, צבירת הקומבינציה והתגובה המוצגת ללקוח) יראו את אופיו האמיתי של הכשל, המאפשר ניסיון חוזר.

שערים מסוימים מאותתים על מיצוי זמני של המכסה באמצעות סטטוס HTTP
שאינו מאפשר ניסיון חוזר. `agentrouter.org` מחזיר `403` (ולעיתים `400`) עם גוף בסינית
(`用户额度不足` / `额度不足`) במקום `429` התקני. לקוחות כמו Claude
Code מתייחסים ל-`403` כאל שגיאה קבועה ומבטלים את ההפעלה, וללא התיקון
מנוע הגיבוי היה מסווג אותה כ-`AUTH_ERROR` במקום כאירוע
מכסה.

**מימוש:**

- מאגר + מתאם: `open-sse/config/upstreamStatusRestatement.ts` — רשימת
  כללים לכל ספק (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), המותאמים באמצעות `applyStatusRestatement()`.
- נקודת קריאה: הבלוק `providerFailure:` בתוך `open-sse/handlers/chatCore.ts`
  (בסביבות שורה 3654), מיד לאחר ש-`parseUpstreamError()` מנתח תגובה מהמקור במעלה הזרם
  עם סטטוס שגיאת HTTP (`!providerResponse.ok`), ולפני הרצת סיווג
  כלשהו, כך שכל צרכן במורד הזרם רואה את הסטטוס
  המתוקן. שגיאות המוטמעות בתוך זרם SSE עם `200` עוברות בנתיב נפרד
  ומאוחר יותר לניתוח הזרם, ו**אינן** מכוסות כיום על ידי נקודת החיבור הזו — זוהי
  מגבלה ידועה שעדיין אינה נחוצה עבור הסטטוס השגוי של agentrouter (שמופיע
  כסטטוס שגיאת HTTP).
- זכאות לניסיון חוזר: `429` נכלל בתוך `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), ולכן שגיאה שהסטטוס שלה הוצהר מחדש
  נושאת חלון ניסיון חוזר ממשי במקום להופיע כ-`403` חסר תועלת.
- הערך הסינתטי `60s` של `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  הוא רק מה שהתגובה שהסטטוס שלה הוצהר מחדש מודיעה ל**לקוח**; הוא אינו
  משך זמן הצינון/הנעילה הפנימי של החיבור עצמו — זה מנוהל
  בנפרד על ידי המנגנון שמטפל בפועל בשגיאה שהסטטוס שלה הוצהר מחדש
  (השהיה מדורגת של Connection Cooldown, סעיף 2, עם בסיס של `3s` עבור ספקים
  מבוססי מפתח API; או Model Lockout, סעיף 3, עבור ספקים עם מכסה לכל מודל כמו
  agentrouter). הנתב עשוי להיות זכאי לניסיון חוזר פנימי מוקדם יותר
  מחלון 60 השניות שהוא מפרסם ללקוח — זהו מרווח ביטחון מכוון,
  ולא באג.

שגיאות קבועות (`无权访问模型` של agentrouter — אין גישה למודל זה)
לעולם אינן עוברות הצהרת סטטוס מחדש: `excludeMarkers` מבטל את הכלל גם כאשר יש התאמה ל-`textMarkers`,
כך שהשגיאה שומרת על הסטטוס המקורי שלה ושום דבר אינו מנסה אותה שוב לנצח. כלל
הסיווג התואם של הספק
(`agentrouter-model-access-denied` בתוך `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, זמן צינון בסיסי מוצהר של `6h`) נבדק
על ידי `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_לפני_ ההחזרה המוקדמת הגנרית `FORBIDDEN` של קטגוריית apikey, בכפוף ל-
`honorsRuleLockScope(provider)` (#10334 — נכון לעכשיו בלעדי ל-agentrouter באמצעות
רשימת ההיתרים `HONORS_RULE_LOCK_SCOPE_PROVIDERS` בתוך
`providerErrorRules.ts`). זמן הצינון המוצהר של 6h בכלל מועבר בתור
`fallbackResult.baseCooldownMs`, אך הוא עדיין מוזן לנתיב הנעילה הקיים
עבור מכסה לכל מודל (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, שלא השתנה בעקבות #10334 מלבד מקור זמן הצינון):
הוא מוגבל כלפי מטה לערך `mlSettings.maxCooldownMs` של המפעיל
(ברירת המחדל היא `1_800_000ms` / 30 דקות), כמו כל נעילת מודל אחרת, ו-
_סיבת הנעילה הנשמרת_ נשארת הערך הקשיח הקיים `"forbidden"`,
ולא `"auth_error"` של הכלל — רק משך זמן הצינון מכובד
מקצה לקצה, ולא מחרוזת הסיבה. החיבור עצמו נשאר פעיל;
מודלים מקבילים באותו חיבור אינם מושפעים.

שגיאות מכסה שנוסחו מחדש (`额度不足`) מגיעות לכלל ספק בסביבת הייצור
(`agentrouter-user-quota-exhausted`:‏ `reason: "quota_exhausted"`,‏ `scope:
"connection"`, ללא תקופת צינון מוצהרת משלו — לכן ברירת המחדל של ההשהיה
המדורגת בשכבת ההתמדה חלה). מאז #10334, הערך `scope` של
`ProviderErrorRuleMatch` אכן נצרך מקצה לקצה, אך **רק** עבור ספקים הנמצאים
ברשימת ההיתרים `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
כיום רק `"agentrouter"`, מותנה באמצעות `honorsRuleLockScope()`). עבור כל
ספק אחר, `scope` נשאר מידע בלבד, בדיוק כפי שהיה לפני #10334.
`checkFallbackError` חושף את תחום הכלל שהותאם בתור
`fallbackResult.ruleScope`;‏ `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) הוא מנגנון הבדיקה המשותף שמאשר כי
`ruleScope` אכן בטוח לכיבוד כאות ברמת החיבור, המתאושש מעצמו
(scope‏ `"connection"`, סיבה `quota_exhausted`, לעולם לא `permanent`,
ולעולם לא `creditsExhausted` — הגנה מפני כלל עתידי שישייך את scope
`"connection"` למצב חשבון קבוע). שני צרכנים קוראים לו:

- **התמדה** (`markAccountUnavailable()`,‏ `src/sse/services/auth.ts`):
  במקום להיכנס לענף הנעילה **לפי מודל** של ספק passthrough
  ‏(agentrouter הוא `passthroughModels: true` ← ‏`hasPerModelQuota()`
  מחזיר `true`), הוא מחיל **תקופת צינון זמנית על החיבור** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ולעולם לא מצב סופי
  (`credits_exhausted`/`banned`/`expired`) — כך שהחיבור מתאושש מעצמו
  לאחר שתקופת הצינון מסתיימת, במקום לדרוש איפוס ידני של פרטי האימות.
  הפעולה מדולגת עבור חיבורים עם `disableCooling: true` (#2997): ביטול זה
  גורם למעבר לענף הנעילה לפי מודל במקום זאת (פשרה מתועדת —
  ראו את הערת הקוד שמעל לענף).
- **ניתוב משולב באותה בקשה** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): אותו מנגנון בדיקה מסמן את
  החיבור בקבוצת `exhaustedConnections` שבזיכרון, עם המפתח
  `${provider}:${connectionId}`. הדבר מדלג רק על יעד שנותר **באותה בקשה**
  ושכבר נושא בעצמו את אותו `connectionId` בדיוק באובייקט היעד שלו
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`,‏ `if (provider &&
connectionId)` לפני החיפוש ב-`exhaustedConnections`) — שילוב רגיל של
  רשימת מודלים, שבו היעדים המקבילים אינם נושאים `connectionId` מקובע משלהם
  והוא נפתר רק בכל שיגור מתוך הכותרת
  `X-OmniRoute-Selected-Connection-Id` של התגובה, לעולם אינו מגיע להתאמה
  למפתח הזה. במקרה הנפוץ הזה, ההגנה האמיתית מפני שימוש חוזר של מקטע שנותר
  בחשבון שזה עתה מוצה אינה ה-Set הזה — אלא שכבת ההתמדה שלעיל
  (`rateLimitedUntil` של החיבור נמצא כעת בעתיד), בשילוב עם דיכוי
  `transientRateLimitedProviders` עבור הכשל באמצעות אותו מנגנון בדיקה
  (ראו "תכנון דו-שלבי" ואת הערת הקוד בענף
  `isAgentrouterConnectionQuotaScope` בתוך `targetExhaustion.ts`): כאשר
  אותו Set נותר לא מסומן, האפשור הכפוי `allowRateLimitedConnection` של
  `combo.ts` ‏(`open-sse/services/combo.ts:1005-1013`,‏ `:2734-2738`) **אינו**
  מופעל עבור המקטעים הנותרים של הספק, ולכן מסנן `rateLimitedUntil` של
  בחירת פרטי האימות (`src/sse/services/auth.ts:1238`) מכובד כרגיל, ומקטע
  שנותר בוחר חיבור agentrouter אחר שעדיין כשיר, או נכשל משום שאין פרטי
  אימות זמינים — הוא אינו כופה את דרכו בחזרה אל החיבור שענף זה הכניס זה
  עתה לתקופת צינון.

### תכנון דו-שלבי: ניסוח מחדש של הסטטוס, ולאחר מכן סיווג

ניסוח מחדש של הסטטוס (`upstreamStatusRestatement.ts`) וכללי סיווג הספקים
(`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) הם מאגרים נפרדים ששניהם משתמשים במזהה הספק
ובסמני טקסט כמפתחות, אך הם פועלים במקומות שונים ומשרתים מטרות שונות:
הניסוח מחדש משכתב את סטטוס ה-HTTP בשלב מוקדם בתוך `chatCore.ts`;
כללי הסיווג בוחרים את `reason` של מנגנון החלופה ואת `scope` של הנעילה
(`model` / `provider` / `connection`) בתוך `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

כללי הסיווג רואים את **טקסט** השגיאה המלא (הנדרש להתאמת סמנים בגוף
כמו `额度不足`) רק עבור ספקים המופיעים ברשימת ההיתרים
`FULL_TEXT_RULE_PROVIDERS` בתוך `providerErrorRules.ts` — כיום רק
`"agentrouter"`. עבור כל ספק **מקטלוג מובנה** אחר, `checkFallbackError`
מעביר אל `getProviderErrorRuleMatch` רק את השגיאה המובנית
(`{code, type}`), שמספיקה לכללים המבוססים על כותרת/סטטוס/קוד, אך אינה
יכולה לזהות סמני טקסט בגוף. פונקציית העזר `resolveRuleMatchBody()` מבצעת
בחירה זו: טקסט השגיאה המלא עבור ספקים שברשימת ההיתרים, והשגיאה המובנית
עבור כל השאר. הוספת ספק **מובנה** אל `FULL_TEXT_RULE_PROVIDERS` היא
הצטרפות מפורשת לכל ספק בנפרד — היא קיימת כדי שנתיב ברירת המחדל עבור כל
ספק שאינו ברשימה יישאר זהה בית אחר בית.

ה-`scope` של כלל (`model` / `provider` / `connection`) הוא מנגנון הצטרפות
נפרד מ-`FULL_TEXT_RULE_PROVIDERS`:‏ `checkFallbackError` רק חושף אותו בתור
`fallbackResult.ruleScope`, וצרכנים בהמשך מכבדים אותו כמשהו שאינו תווית
מידע רק עבור ספקים ברשימת ההיתרים
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` שבאותו קובץ (מותנה באמצעות
`honorsRuleLockScope()` — כיום רק `"agentrouter"`). ראו "שגיאות מכסה
שנוסחו מחדש" לעיל כדי להבין מה התאמה של `scope: "connection"` עושה בפועל
לאחר שספק נמצא ברשימת ההיתרים הזו.

**#11104 — כללים המוצהרים על־ידי המפעיל עוקפים את שתי רשימות ההיתרים.** מפעיל יכול
להצהיר בזמן ריצה על כלל ייעודי לספק באמצעות `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
מבלי לערוך קובץ זה. הכפפת כלל של מפעיל ל־
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — רשימות היתרים
שנועדו להגן על התנהגות **ברירת המחדל** של כללי הקטלוג המובנים — הייתה
הופכת את מנגנון ההגדרות לחסר השפעה עבור כל ספק מלבד אלה שכבר
מופיעים בהן, שכן עצם ההצהרה על הכלל היא כבר הסכמה מפורשת
של המפעיל. `resolveRuleMatchBody()` ו־`honorsRuleLockScope()` בודקות שתיהן
תחילה את `hasOperatorRuleForProvider()`: ספק עם כלל של מפעיל מקבל
את טקסט השגיאה הגולמי, וה־`scope` המוצהר שלו מכובד, ללא תלות
בשאלה אם הוא מופיע גם באחת מרשימות ההיתרים.

**פער ידוע — לעולם אין פנייה אל `providerRuleRegistry` עבור HTTP 400.**
הענף `BAD_REQUEST` של `checkFallbackError` מסווג את הסטטוס 400 במלואו
באמצעות מערכי התבניות שלו (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` וכו' ב־`accountFallback.ts`) ומחזיר תוצאה לפני
שמגיעים לענף `configuredRule`/`getProviderErrorRuleMatch` שמעליו.
כלל קטלוג מובנה (או כלל של מפעיל) עם `status: 400` הוא
תקין תחבירית, אך לעולם לא יופעל. כיום אין שום כלל קיים שמכוון ל־400,
כך ששום דבר בפרודקשן אינו מושפע — אך כלל 400 עתידי מחייב
לטפל תחילה בענף הזה, וזהו שינוי גדול יותר מהוספת כלל (הוא
מסווג מחדש את 400 עבור כל ספק שכבר מסתמך על ההתנהגות של
מערכי התבניות), ולכן הוא מחוץ להיקף של הוספת כלל עבור ספק יחיד.

### הוספת שער חדש שמציג מכסה באופן שגוי

1. רשמו מערך כללים אחד ב־`statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). שמרו את `textMarkers`
   ייחודיים לספק; לעולם אל תשתמשו מחדש בביטויים כלליים באנגלית שמתנגשים עם
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. לחלופין, רשמו כללי סיווג ב־
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) כדי לבחור
   את תחום הנעילה המתאים (`connection` עבור מכסה כלל־חשבונית, `model` עבור
   שגיאות לפי מודל). שלב זה משפיע בפרודקשן רק עבור
   ספקים שהכללים שלהם זקוקים לטקסט השגיאה המלא (סמני גוף): הוסיפו את
   מזהה הספק אל `FULL_TEXT_RULE_PROVIDERS` באותו קובץ — אחרת
   `checkFallbackError` מעבירה לכלל רק את השגיאה המובנית
   `{code, type}`, וכלל המבוסס על טקסט גוף לעולם לא יתאים לתעבורה בפועל.
   כללים שמתאימים אך ורק לפי `status`/`headers` (כמו אלה של Opencode או
   Minimax) אינם זקוקים להסכמה מפורשת זו. בנפרד, אם הכלל מצהיר
   `scope: "connection"` והכוונה היא לתקופת צינון ממשית לכל החיבור
   יחד עם דילוג על הצירוף באותה בקשה (ולא רק תווית מידע), הוסיפו את
   מזהה הספק אל `HONORS_RULE_LOCK_SCOPE_PROVIDERS` באותו קובץ — זהו
   המנגנון שמאפשר שימוש בסגנון `isAgentrouterConnectionQuotaScope()` בתוך
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) ובתוך
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); בלעדיו, `scope`
   עדיין מועבר דרך `fallbackResult.ruleScope`, אך שום דבר אינו פועל לפיו.
3. הוסיפו בדיקות יחידה המקבילות ל־`tests/unit/upstream-status-restatement.test.ts`
   ול־`tests/unit/agentrouter-error-rules.test.ts` (כולל ההגנות
   not-permanent / not-creditsExhausted, ואם הספק זקוק
   לרשימת ההיתרים — בדיקה שמוודאת כי `resolveRuleMatchBody()` מחזירה את
   הטקסט המלא רק עבור אותו ספק).

אין צורך בשינויים ב־`chatCore.ts`, ב־`classifyError` או ב־combo.

#### נעילה המחולקת לדליים לפי תעבורה יוצאת (#10880)

ספקים ב־`EGRESS_BUCKETED_LOCK_PROVIDERS` (משפחת opencode) מטופלים
כשירות upstream המחולק לדליים לפי IP (הרובד החינמי של opencode מחולק לפי IP, ולא
לפי חשבון — ראו #9611): סטטוס 429 המסווג כ־`quota_exhausted`
**או** כ־`rate_limit_exceeded` מכניס לתקופת צינון כל חיבור ממשפחת הספקים
שברשימת ההיתרים, שכתובת ה־IP האחרונה הידועה שלו לתעבורה יוצאת תואמת לזו של החיבור שנכשל, לפני
שהרוטציה יכולה לנסות אותם
— וכך נמנעות N-1 קריאות upstream שמובטח שייכשלו (באותה מתכונת כמו #10460/#10525).
`rate_limit_exceeded` נכלל במכוון: בנתיב `markAccountUnavailable`
הכללים הייעודיים ל־opencode לעולם אינם מתאימים (לא מועברים headers/body אל
`checkFallbackError`, ו־opencode אינו נמצא ב־`FULL_TEXT_RULE_PROVIDERS`), ולכן 429
שהגוף שלו מכיל את טקסט מכסת המינוי ("monthly usage limit
reached") מסווג כ־`quota_exhausted` באמצעות נסיגת טקסט המכסה
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; תקופת צינון של שעה) לפני
שמגיעים בכלל אל הכלל `status_429` — בעוד ש־429 ללא טקסט מכסה (הגבלת
קצב רגילה) מסווג באמצעות הכלל `status_429` כ־`rate_limit_exceeded`
ועדיין מכניס את משפחת ה־IP לתקופת צינון. עבור ספק ברשימת ההיתרים, הגבלת קצב
המחולקת לדליים לפי IP היא אותו אות כמו מכסה שמוצתה. מגבלות ידועות:

- **מאמץ מיטבי**: הנעילה מאתרת את ה-`egress_ip` האחרון הידוע של החיבור
  מתוך `proxy_logs` (חלון של 24 שעות, סינכרוני, ללא מטמון). מטמון קר (כתובת
  ה-IP היוצאת מעולם לא נבדקה) או היעדר שורה → החיבור שנכשל עדיין נכנס לצינון
  על ידי הענף (ונרשם כמו היום), אך אף חיבור אח לא ננעל.
- **לעולם לא סופי**: הצינון הוא חלון מכסה מתחדש
  (`testStatus: "unavailable"`); מצב קבוע לעולם אינו נגזר מאות ברמת ה-IP.
  חיבורים עם `disableCooling` מדלגים לחלוטין על הענף.
- **רזולוציית הנעילה משתנה עבור משפחת רשימת ההיתרים**: זהו שינוי תחום,
  ולא רק מיטוב עבור חיבורים אחים. opencode הוא ספק `passthroughModels`,
  ולכן לפני ענף זה, שגיאת 429 יצרה נעילה לכל MODEL בנפרד; כעת היא יוצרת
  צינון לחיבור — לרבות עבור מפעיל שמריץ חיבור יחיד ללא שום חיבור אח. זו
  הרזולוציה שטבלת הכללים של opencode כבר מגדירה כנכונה
  (`scope: "connection"`,‏ `providerErrorRules.ts`), אך עד כה מעולם לא כובדה
  משום ש-opencode אינו נמצא ב-`HONORS_RULE_LOCK_SCOPE_PROVIDERS`. הענף כותב
  בעצמו את הצינון + `backoffLevel` של החיבור שנכשל, בדומה לענף של
  agentrouter בעל תחום החיבור, וחוזר — החסימה לכל מודל והנתיב הגנרי שלמטה
  לעולם אינם מופעלים.
- **כולל Combo**: בדומה לענף של agentrouter, התחום מתעלם במכוון מההנמכה של
  `persistUnavailableState`/`isCombo` שמבצע קורא Combo בתגובה לשגיאת 429.
  נעילה לכל מודל אינה גרסה חלשה יותר של תחום זה, אלא היחידה הלא נכונה: היא
  אינה אומרת דבר על ה-IP שמכסתו מוצתה, ולכן הסבב של ה-Combo ימשיך לבזבז
  קריאה אחת שמובטח כי תיכשל עבור כל חיבור אח.
- **בטיחות חיבורים אחים**: חיבור אח שכבר נמצא במצב סופי
  (banned/credits_exhausted) או שכבר נמצא בצינון ארוך יותר לעולם אינו נדרס.
- **רשימת היתרים בלעדית**: הרחבת `EGRESS_BUCKETED_LOCK_PROVIDERS` היא החלטה
  מפורשת של הבעלים; אין חיווט גנרי (תבנית #10334/#10419). שאילתת החיבורים
  האחים מקשרת את אותה רשימת היתרים במקום לחזור עליה כליטרל SQL, כך שהרחבתה
  נשארת שינוי של שורה אחת.
- **סבב כתובות IP יוצאות, בשני הכיוונים**: חלון החיפוש (24 שעות) רחב בהרבה
  מה-TTL של מטמון ה-IP היוצא (5 דקות), ולכן "כתובת ה-IP האחרונה הידועה" היא
  היסטוריה, לא המצב הנוכחי. אם ה-proxy של חיבור הוחלף במהלך החלון, הנעילה
  עלולה **להחמיץ** כתובת IP משותפת בפועל (כתובת ה-IP הרשומה היא החדשה,
  שמכסתה לא מוצתה) — ובאופן סימטרי, היא עלולה **לצנן חיבור אח שמאז הועבר**
  מכתובת ה-IP שמכסתה מוצתה. המקרה השני עולה לאותו חיבור אח חלון צינון אחד;
  שניהם מתקבלים כמגבלות של מאמץ מיטבי הנובעות מחיפוש המבוסס על היסטוריה.
- **עלות**: שתי סריקות מוגבלות של `proxy_logs` (מסוננות לפי חלון באמצעות
  `idx_pl_timestamp`), ורק בתדירות של שגיאות 429. אין אינדקס חדש (מיגרציה
  134, YAGNI). נמדד על עותק של מסד נתונים מתעבורה אמיתית ובגודל בינוני;
  מופע בעל תפוקה גבוהה מחזיק מספר גדול יותר של שורות באופן יחסי באותו חלון.

---

## תכונות עמידות נוספות

- **20 אסטרטגיות ניתוב** (עדיפות, משוקלל, סבב מחזורי, העברת הקשר, מילוי תחילה, p2c, אקראי, הכי פחות בשימוש, מיטוב עלויות, מודע לאיפוס, חלון איפוס, מרווח פנוי, משוקלל לפי מכסה, אקראי קפדני, אוטומטי, lkgp, ממוטב להקשר, ממוטב למטמון, מיזוג, צינור עיבוד) — ראו [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **ניתוב מודע לאיפוס** (v3.8.0) — מתעדף חיבורים לפי מועד איפוס המכסה.
- **הורדת רמה של מצב רקע** — `background: true` של Responses API עובר למצב סינכרוני עם אזהרה.
- **זיהוי דינמי של מגבלת כלים** — נסוג מספקים כאשר מגיעים למגבלת מספר הכלים.
- **חלופת חירום** — נשלטת באמצעות `OMNIROUTE_EMERGENCY_FALLBACK`; מפעילים יכולים לעקוף אותה מדף דגלי התכונות ללא הפעלה מחדש.

---

## ניפוי שגיאות

- קומבינציה משוקללת מחזירה `503 all_targets_cooling_down` (הכותרת `Retry-After` מוגדרת, ו-`diagnostics.excluded` מפרט כל יעד עם `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → המאגר מוגדר ומחובר, אך כל יעד מוחרג על ידי טיימר עמידות; האזהרה `[COMBO] Weighted selection: every target excluded before dispatch — …` מציינת את הסיבות ואת מספר השניות שנותרו. תגובת `404 no_executable_targets` מאותה קומבינציה פירושה שלא היה מעורב טיימר עמידות (אין דבר שניתן להריץ, או שבדיקת הזמינות נכשלה עבור כל חשבון). המנגנון ממומש ב-`open-sse/services/combo/pinRecovery.ts` על סמך ההחרגות שנאספו ב-`targetResolution.ts`.
- כל המפתחות של ספק דולגו → בדקו גם את מצב מפסק הזרם וגם את `rateLimitedUntil`/`testStatus` של כל חיבור.
- ספק מוחרג לצמיתות לאחר חלון האיפוס → הקוד קורא את `state` הגולמי במקום את `getStatus()`/`canExecute()`.
- מפתח אחד נכשל, אך האחרים אמורים לעבוד → העדיפו תקופת צינון של החיבור על פני מפסק זרם.
- רק מודל אחד נכשל → העדיפו נעילת מודל על פני תקופת צינון של החיבור.
- המצב אמור להתאושש מעצמו אך אינו עושה זאת → בדקו אם קיימת חותמת זמן עתידית ונתיב קריאה שמרענן מצב שפג תוקפו. מצבים קבועים דורשים שינויים ידניים.

---

## טביעת אצבע של TLS והסוואה

הסוואה ייעודית לספק (JA3/JA4, CCH, ערפול) מתועדת בנפרד — ראו `docs/security/STEALTH_GUIDE.md` (ב-git; אינה עוברת הידור לתוך `/docs`).

---

## בדיקות עמידות (שלב 8 · מקטע C)

מעבר לבדיקות יחידה של לוגיקת העמידות, שלוש בדיקות מפעילות את סביבת הריצה תחת
תנאי עומס/כשל אמיתיים (כולן בדיקות אינטגרציה/ליליות — אף אחת אינה חוסמת בקשות מיזוג):

| בדיקה       | מה נבדק                                                                                                                                                | הרצה                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| כאוס        | צומת מדומה במעלה הזרם מזריק השהיה/איפוס/תום זמן/503 אמיתיים; מוודא שמפסק הזרם נפתח/מתאושש וש-`checkFallbackError` מסווג 503 כחלופה שניתן להתאושש ממנה. | `RUN_CHAOS_INT=1 npm run test:chaos`  |
| גידול ערימה | כ-500 זרמים לכל `createSSEStream` תחת `--expose-gc`; נכשל אם הערימה גדלה מעבר לתקרה (הגנת OOM מס' 3069).                                               | `npm run test:heap`                   |
| השריית k6   | עומס מתמשך מול `/api/monitoring/health`; ספי p95/שגיאות.                                                                                               | `k6 run tests/load/k6-soak.js` (לילי) |

התזמור מתבצע באמצעות `.github/workflows/nightly-resilience.yml` (cron + הפעלה ידנית). ב-
`test:integration` המוגדר כברירת מחדל, בדיקות הכאוס והערימה מדלגות על עצמן (ללא `RUN_CHAOS_INT`/`--expose-gc`).

---

## ראו גם

- [מדריך ארכיטקטורה](./ARCHITECTURE.md) — ארכיטקטורת המערכת והמנגנונים הפנימיים
- [מדריך למשתמש](../guides/USER_GUIDE.md) — ספקים, שילובים, שילוב עם CLI
- [מנוע השילובים האוטומטי](../routing/AUTO-COMBO.md) — ניקוד המבוסס על 16 גורמים, חבילות מצבים
