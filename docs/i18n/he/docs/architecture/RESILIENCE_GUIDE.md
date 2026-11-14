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

## 2. קירור חיבור

**תְחוּם:** ספק יחיד connection/account/key.

**מַטָרָה:** דלג על מפתח רע אחד בזמן שחיבורים אחרים של אותו ספק ממשיכים לשרת.

**יישום:**

- סימון לא זמין: `src/sse/services/auth.ts::markAccountUnavailable()`
- בחירה: `getProviderCredentials*` באותו קובץ
- צינון calc: `open-sse/services/accountFallback.ts::checkFallbackError()`
- הגדרות: `src/lib/resilience/settings.ts`

**שדות לכל חיבור:**

- חותמת זמן `rateLimitedUntil` — עד שתוקף הקירור יפוג
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — מונה גיבוי אקספוננציאלי

**צינון ברירת מחדל:**

- בסיס OAuth : 5 שניות
- בסיס מפתח API: 3 שניות
- API-key 429: מעדיף טקסט לאיפוס `Retry-After`/reset headers/parseable במעלה הזרם
- גיבוי: `baseCooldownMs * 2 ** failureIndex`

**עיכוב ניסיון חוזר לכל ספק.** בדף הפרטים של הספק יש א** נסה להשהות שוב** בחר (אוטומטי, 15 שניות עד שעה אחת). זה חוסך `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, דרך `PATCH /api/resilience`). כאשר שגיאת מגבלת קצב אינה נושאת רמז לניסיון חוזר במעלה הזרם, ערך זה מחליף את ה-backoff המותאם עבור הספק ומאפס `backoffLevel` ל-0 (`open-sse/services/rotationConfig.ts::overrideFor`). קדימות לשגיאה מוגבלת קצב, הגבוהה ביותר תחילה: רמז לניסיון חוזר במעלה הזרם, לאחר מכן לכל חיבור `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, לאחר מכן עיכוב ניסיון חוזר לכל ספק, ולאחר מכן env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, ולאחר מכן החזרה בקנה מידה. אוטומטית מסירה את השדה. זה משפיע רק על הסיבה להגבלת התעריף, לעולם לא על מצבים סופניים.

**שומר נגד רעמים:** מונע כישלונות במקביל מהארכת יתר של הקירור או הגדלה כפולה `backoffLevel`.

**מגבלת מקבילות 429 אינן מטפסות בסולם האחורי.** `429` שגופו מדווח על מגבלת במקביל ("יותר מדי בקשות במקביל", "מגבלת במקביל", "מגבלת בקשות מקבילות", GLM `并发数过高`) פירושו שהחשבון בריא אך עמוס. `checkFallbackError()` מחזיר סיבה `concurrency_limited`: נכשל כעת לחיבור הבא, מקרר את זה עבור `CONCURRENCY_LIMIT_COOLDOWN_MS` קבוע (1s) או הרמז לניסיון חוזר במעלה הזרם, השאר `backoffLevel` ללא שינוי והגדר `skipProviderBreaker`. גוף מכסה מפורש עדיין מנצח, כך שגוף שתואם גם דפוס מכסה נשאר כפסק מכסה. זיהוי: `looksLikeConcurrencyLimit()` ב `src/shared/utils/classify429.ts`; פסק דין: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` ( `FailureKind` של המפסק) הוא ללא שינוי ועדיין קורא `rate_limit` עבור הגופים הללו.

**דוכני תוכן זרמים לא מצננים את החשבון.** כאשר ה-Content-Stall Watchdog (`open-sse/utils/streamHandler.ts`) מוותר על זרם שלא שלח פלט דגם בזמן, `markAccountUnavailable()` מתעד את השגיאה בחיבור אך לא מגדיר Cooldown: הדוכן שייך לבקשה הזו, לרוב סיבוב חשיבה ארוך ללא פלט עדיין. מפעילים יכולים להצטרף חזרה עם `resilienceSettings.streamStallCooldown.enabled` (ברירת מחדל `false`).

**אות השהיית הסכמה לבחירת חשבון `p2c`.** כל ניסיון שנשלח מתעד את הזמן עד הבית הראשון והתוצאה שלו לכל חיבור (ולכל דגם + של חיבור) בחלון מתגלגל בזיכרון: 20 הדגימות האחרונות תוך 15 דקות (`open-sse/services/connectionLatencyTracker.ts`, מוקלט מ- `safeLogEvents()` ב- `src/sse/handlers/chatHelpers.ts`). כאשר `resilienceSettings.p2cLatency.weight` הוא מעל `0` (טווח 0-20, ברירת המחדל `0` = כבוי), `compareP2CConnections()` ב- `src/sse/services/auth.ts` מוסיף עד `weight` נקודות לכל מועמד של הזוג. חצי מזה מגיע מהשהייה כיחס למועמד המהיר יותר (פי שניים איטי לוקח את החצי המלא) וחצי משיעור השגיאות המתגלגלות. המונח חל רק כאשר לשני המועמדים יש לפחות 3 דגימות, כך שחשבונות חדשים לא ייענשו, והתקרה שלו נשארת מתחת לקנסות החסומים והמכסה. זה לא מוסיף שום מעגל משלו: חשבונות כושלים עדיין מטופלים על ידי שכבות הקירור, הנעילה והמפסק. הגדר אותו עם `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**מסגרות הנמקה מפעילות מחדש את תקציב דוכן התוכן.** מודל חשיבה יכול לחשוב דקות לפני האסימון הגלוי הראשון שלו: Claude מזרים מסגרות `thinking_delta` שטקסט החשיבה שלהן עשוי להיות ריק, וה-Responses API מזרים פריט הגיון אחד אחרי השני. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) מזהה את הפריימים האלה, וכלב השמירה מחדש את התקציב שלו על כל אחד במקום לבטל את התור. הם עדיין לא פלט מודל, כך שסיבוב שמסתיים בהיגיון בלבד עדיין מדווח כריק, וסיבוב שמפסיק להגיב ושולח רק פעימות לב עדיין מעיד על כלב השמירה.

מסגרות `reasoningContentEvent` בינאריות של Kiro עם חתימה לא ריקה משמרות את פעילות ההיגיון הזו דרך המבצע כדלתא `reasoning_content` ריקה. החתימה לא מועברת. מטא נתונים, מסגרות לא שלמות וחתימות ריקות לא מפעילים מחדש את תקציב התוכן; פסק הזמן העצמאי של הזרם הפעיל וביטול הלקוח עדיין חלים (`open-sse/executors/kiro/reasoning.ts`).

**מצבי טרמינל (התקררות NOT ):**

- `banned` — מוגדר על ידי זיהוי של מילת מפתח אסורה / חסימת חשבון (ראה [BAN_DETECTION](../security/BAN_DETECTION.md) ). סירובים לכל בקשה במעלה הזרם (`request_rejected`, למשל Anthropic OAuth 403 "בקשה לא מותרת") אף פעם לא מגדירים את זה: הם נספרים לפי חיבור ודגם ומוציאים את הדגם הזה מסיבוב עם צינון גדל והולך עם מכסת `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), או מצננים את החיבור כאשר אין דגם ידוע — `open-sse/services/requestRejectedStreak.ts`
- `expired` (מעברים לטרמינל לאחר נסיונות חוזרות מוגבלות — `EXPIRED_RETRY_MAX = 3` עם גיבוי אקספוננציאלי — כך שגיאות OAuth חולפות יכולות להחלים מעצמן לפני שהחשבון מבוטל לצמיתות)
- `credits_exhausted`

אלה נמשכים עד שהאישורים משתנים או שמפעיל מאפס אותם. אל תדרוס מצבי קצה עם מצב קירור חולף.

**התאוששות עצלנית:** כאשר `rateLimitedUntil` עבר, החיבור הופך להיות כשיר שוב. בשימוש מוצלח, `clearAccountError()` מנקה את כל שדות השגיאה.

### קיר שימוש Claude OAuth : איפוס מגבלת ההפעלה + הנתיב בעדיפות נמוכה יותר

**תְחוּם:** חיבור אחד של מנוי Claude (OAuth). שתי התכונות הן** הצטרפות לכל חיבור** (ערוך חיבור → Claude section → `lowPriorityMode` / `autoLimitReset` ב- `providerSpecificData`, שניהם כבויים כברירת מחדל) ושיקוף את הפקודות `/low-priority` ו- `/limit-reset` של Claude Code (חוזה חוט שנלכד מקוד Claude 2.1.263).

**יישום:**

- סיווג תגובה של מכונת מצב + : `open-sse/services/claudeLowPriority.ts`
- אפס לקוח status/claim : `open-sse/services/claudeLimitReset.ts`
- הוק לביצוע (הזרקת כותרת + אותו חשבון חוזר): `open-sse/executors/base.ts::execute()`
- התמדה בהצטרפות: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**לְהַפְעִיל:** קיר השימוש של 5 שעות — a `429` שהכותרות שלו נושאות `anthropic-ratelimit-unified-status: rejected` וכאשר החשבון כשיר, `anthropic-ratelimit-unified-slow-offer: treatment`. שום דבר לא נשלח לפני אותו קיר ראשון 429; פרץ 429 ללא כותרות מאוחדות עובר את נתיב ההתקררות הרגיל.

**נתיב בעדיפות נמוכה יותר** (`lowPriorityMode`):

- על הקיר 429 מקבל ההוצאה לפועל את ההצעה ומיד מנסה שוב את** אוֹתוֹ** חשבון עם `anthropic-usage-limit: slow`; הליין נשאר פעיל עד ה- `anthropic-ratelimit-unified-reset` המוכרז (+ 60s grace) וכל בקשה בחלון זה נושאת את הכותרת. ה-429 שיירט אף פעם לא מגיע `handleChatCore`, אז החיבור הוא** לֹא** מכניסים לקירור ואינו מסובב משם.
- `anthropic-ratelimit-unified-slow-status` על תגובות מאוחרות יותר: `active` / `not_needed` לשמור על הנתיב; `slot_busy` (429) או `529` המתן ל- `anthropic-ratelimit-unified-slow-retry-after` של השרת (20s ברירת מחדל, clamp 5-600s, ± 30% jitter) ונסה שוב, מוגבל על-ידי `anthropic-ratelimit-unified-slow-max-wait` (20 דקות ברירת מחדל, clamp 1 דקה-6 h) — לאחר שהנתיב מסתיים וחסימת קירור-reaccept-off של 10 דקות. ההמתנה מוגבלת בנוסף על ידי מה שנותר מזמן הקצוב של הבקשה להתחלה במעלה הזרם (`resolveFetchStartTimeout`, 10 דקות כברירת מחדל) מינוס מרווח של 5 שניות: ללא מכסה זו, ברירת המחדל של 20 דקות ה-max-wait תאריך ימים את הבקשה והשינה תבוטל באמצע ההמתנה, תופיע קצה `TimeoutError` במקום + `max_wait` מגניב חינני.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, גלגול של חלון של 5h, או `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (שמסיים אותו כ- `extra_usage` בכל סטטוס, מכיוון שהעודף בתשלום מכסה כעת את הקיר) מסיים את הנתיב; לאחר מכן התגובה זורמת לנתיב ההתקררות הרגיל. `budget_exhausted` נזכר עד לאיפוס התקציב שהוכרז (≤ 8 ימים).
- בדיקת הקיר פועלת לאחר 400 ניסיונות חוזרים מונעים של המבצע עצמו (עריכת הקשר, מהדקים thinking/effort, למידה אוטומטית של param), כך שקיר 429 שמופיע רק באחת מאותן ניסיונות חוזרים עדיין יורט במקום להגיע לנתיב הקירור.
- המצב הוא בזיכרון לכל חיבור (הפעלה מחדש עולה קיר אחד נוסף 429 כדי לקבל מחדש).

**איפוס מגבלת הפעלה** (`autoLimitReset`, נוסה לפני הנתיב כששניהם פועלים):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` block; כאשר `arm: "reset"` ו- `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` עם `{ "program": "juniper_tide" }` (ארגון UUID מ- `providerSpecificData.organizationUUID`, bootstrap fallback).
- `result: reset|not_limited` → הבקשה נוסתה מחדש במלוא המהירות (ללא כותרת איטית). `already_used` / `not_offered` memoise `next_available_at` (ברירת מחדל לשבוע); כל כשל נסוג 15 דקות. האיפוס מתבצע פעם בשבוע ועדיין נחשב למגבלה השבועית.

שומרי רגרסיה: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### החל אוטומטית איפוסים בנקאיים

**תְחוּם:** חיבורי מנוי Codex ו- Claude (OAuth).** הצטרפות** : הגדרת `bankedResetAutoApply` כבויה ובמצב `dry-run` כברירת מחדל (הגדרות → AI → החלה אוטומטית של איפוסים בנקאיים).

**מַטָרָה:** להוציא איפוסים בנקאיים בעצמם כאשר חשבון פוגע בקיר שימוש, במקום לחכות למפעיל שילחץ על "פדה" בדף מגבלות הספק.

| סוג אשראי (`creditTypes`) | מה נגאל                                     | איפה זה רץ                                               |
| ------------------------- | ------------------------------------------- | -------------------------------------------------------- |
| `codexCredits`            | Codex אפס קרדיטים                           | עבודת רקע, כל 60 שניות                                   |
| `claudeCredits`           | מענקים בנקאיים של Claude (זיכויים `GRANT` ) | עבודת רקע, כל 60 שניות                                   |
| `claudeSessionReset`      | איפוס מגבלת ההפעלה השבועית של Claude (מעל)  | נתיב הבקשה, באמצעות אותה מדיניות כמו החלפת מצב לכל חשבון |

**יישום:**

- החלטה טהורה (חוק אחד נקבע לשני הנתיבים): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- עבודת רקע: `src/lib/services/bankedResetAutoApply.ts` (החל ב- `src/instrumentation-node.ts`)
- Claude request-path gate: `src/lib/usage/claudeSessionResetPolicy.ts`, רשום דרך `setClaudeLimitResetPolicy()` ב- `open-sse/services/claudeLimitReset.ts`
- היסטוריה, קאפות ו-webhook: `src/lib/usage/bankedResetAudit.ts`
- היסטוריה API: `GET /api/settings/banked-reset-auto/history?limit=50` (אישור ניהול)

**צו החלטה** (הכלל הכושל הראשון הוא הסיבה הרשומה):

1. תכונה כבויה, סוג אשראי כבויה או חשבון מחוץ לתחום (`accountScope` `all` / `selected` בתוספת מפת `connections` לכל חשבון).
2. מחוץ ללוח הזמנים האופציונלי UTC (`startHourUtc` > `endHourUtc` חוצה חצות).
3. מכסים במהלך 24 השעות האחרונות: `maxPerAccountPerDay` (1), `maxPerDay` (3) ו- `minSpacingMinutes` (30) בין כל שתי פדיונות.
4. טריגר: חלון `session` או `weekly` עם חומה (לקרוא מ- `getQuotaWindowStatus().reachedThreshold`, לא `isAccountQuotaExhausted()`, שמדווח רק על חשבון עם כל חלון שהוצא), או זיכוי שפג תוקפו של `expiringCreditHours` (24) בחשבון שהשתמש ב- `expiringCreditMinUsedPercent` לפחות (50).
5. שמירה עם איפוס טבעי: דלג כאשר חלון 5 השעות המוקף חומה מתאפס בתוך `sessionResetGuardMinutes` (90), או החלון השבועי המוקף חומה בתוך `weeklyResetGuardHours` (12).
6. קומה שבועית: דלג על איפוס של 5 שעות כשהיתר השבועי הוא מתחת `weeklyFloorPercent` (10).
7. מצב `last-resort` : דלג בעוד חשבון אחר בהיקף של אותו ספק נשאר לפחות `poolHeadroomPercent` (10) בשני החלונות. מפעילי אשראי שפג תוקפו עוקפים זאת.
8. `dry-run` מקליט שורה ולא פודה דבר; `last-resort` ו- `eager` לפדות.

נתוני מכסה חסרים אף פעם לא פותחים מימוש: זמן איפוס לא ידוע או שימוש שבועי מדלגים.

**איפוס הפעלה של Claude :** כאשר התכונה כבויה, או `claudeSessionReset` כבויה, החלפת `autoLimitReset` לכל חשבון מחליטה בדיוק כמו קודם. כאשר שניהם פועלים, התכונה מחליפה את החלפת מצבים לכל חשבון: חשבון בהיקף יכול לתבוע רק כאשר המדיניות מאפשרת זאת, ובמצב `dry-run` לא מוגשת תביעה.

**בְּטִיחוּת:** המשרה מממשת זיכוי אחד לכל סימון לכל היותר, מחליטה לפני רישום זיכויים (חשבון שדילג עליו לעולם לא מופיע ברשימה), משתמשת במפתחות אימפוטנציה `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>`, ומחזירה חשבון למשך שעה אחת לאחר רישום או מימוש שנכשל. כל פדיון, כישלון והחלטה יבשה נכתבת ל- `audit_log` (`action: "bankedReset.redeem"`, ללא אסימונים או מזהי אשראי); המכסים נספרים מהשורות האלה, כך שהם שורדים הפעלה מחדש. פדיונות מוצלחים גם מפטרים את ה- `provider.reset_redeemed` webhook.

שומרי רגרסיה: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### זיקה להפעלה (#7274)

**תְחוּם:** הפעלת לקוח אחת (כותרת `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ) מוצמדת לחיבור אחד, עבור** כֹּל** ספק.

**מַטָרָה:** שמור על סוכן מרובה סיבובים (Claude Code, aider, סוכנים מותאמים אישית) באותו חשבון על פני בקשות, תוך צמצום אובדן הקשר חוצה-חשבונות ו-429s התחלה קרה חוזרת אצל ספקים עם מצב הפעלה לכל חשבון.

**יישום:**

- רזולוציית TTL : `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- סיכה selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- חילוץ כותרות (גנרי, כל ספק): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- טבלת סיכות מתמשכת: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- הגדרה: `sessionAffinityTtlMs` ( TTL גלובלי ב-ms, `0` משבית) — `src/lib/db/settings.ts`. שונה מה- Codex-only `codexSessionAffinityTtlMs` על-ידי הגירה `124_generic_session_affinity_ttl.sql`, אשר מעביר כל Codex TTL שהוגדר בעבר כברירת המחדל החדשה.

לפני #7274, `resolveSessionAffinityTtlMs()` הוטלה ערבות קשה ל- `0` עבור כל ספק מלבד `codex`, כך שלהגדרת TTL (וכותרות הפגישה) לא הייתה השפעה בשום מקום אחר למרות שמנגנון ההצמדה וחילוץ הכותרת כבר היו ספק-אגנוסטיים. התיקון הסיר את ההחזרה המוקדמת הזו; ה- TTL חל כעת באופן אחיד על כל ספק פעם שהוגדר באופן גלובלי מעל `0`.

שלושת הכותרות עם זיקה להפעלה לעולם אינן מועברות במעלה הזרם. מנהלי — בונים כותרות במעלה הזרם משלהם מאפס במקום להעביר כותרות לקוח דרכן, כך שזה נשאר מזהה מתאם פנימי בלבד.

### חכירות בלעדיות לחיבור הפעלה מנוהלת

**תְחוּם:** HTTP client/session מנוהל פעיל אחד הוא הבעלים של חיבור OmniRoute כשיר אחד.

**מַטָרָה:** לספק בעלות חיבור בלעדית עמידה ללקוחות הזקוקים לגדר ניתוב קשה על פני בקשות. זה שונה מזיקה להפעלה, שהיא העדפת המשכיות רכה: חוזה שכירות בלעדי ממשיך במצב מחזור חיים ב- SQLite, אוכף את הייחודיות הגלובלית של בעלים אקטיביים וחיבור אקטיבי, ודוחה הדור מיושן לפני שליחת הספק.

התכונה היא הצטרפות לכל מפתח API. מפתח מנוהל חייב להיות בעל היקף `lease:exclusive` ורשימת `allowedConnections` מפורשת שאינה ריקה. כל לקוח HTTP יכול להשתמש בנקודת הקצה של מחזור החיים; אין צורך בשם לקוח, סוכן משתמש, ספק, שיטת OAuth או דגם. חוזה השכירות הוא הבעלים של חיבור, לא דגם, כך ששינוי דגם שומר על המחייב בעוד שהחיבור נשאר כשיר בדרך כלל. כללי מודל, מכסה, בריאות, צינון ורשימת היתרים רגילים נשארים סמכותיים ועשויים להעביר את אותו דור לחיבור זכאי חינמי אחר.

מחזור החיים הוא `POST /api/v1/session-leases` עם פעולות JSON `acquire`, `renew` ו- `release`. בקשות להסקה מנוהלות מציגות את ערך `X-OmniRoute-Lease-Owner` האטום ואת `X-OmniRoute-Lease-Generation` המדויק. הבעלים משתמש ב- `vlo_` ואחריו 43 תווים base64url; רק SHA-256 hash שלו מאוחסן. כל גדר שיגור סופית מחייבת גם את מפתח API המאומת ID ואת החיבור הפעיל ID. כותרות בקרת החכירה מוסרות מהיומנים, מתמונות הבקשות שמורות ומכותרות המבצעים במעלה הזרם.

אם לניתוב רגיל יש מועמדים מנוהלים כשירים אבל כל מועמד פנוי תפוס על ידי חכירה פעילה זרה, OmniRoute מחזירה HTTP `429`, קוד חכירה-קיבולת-לא זמין, מצב המתנה לקיבולת ו- `Retry-After` מוגבל שנגזר מהפקיעה הרלוונטית המוקדם ביותר. זכאות ריקה רגילה אינה טענה על חכירה ושומרת על סמנטיקה של שגיאות הניתוב הקיימת שלה.

מנגנונים קשורים נשארים נפרדים:

- תפוסת הפעלות OAuth היא הפצה רכה מקומית בתהליך עבור חשבונות OAuth.
- סמפורות חשבונות מעניקות אישורי התאמה לבקשה ומסתיימות כאשר הבקשה מסתיימת.
- חוזי שכירות מנוהלים בלעדיים הם בעלות על מחזור חיים עמיד עם גדר דור.

---

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

## 4. בקרת מקיפות של שיתוף מכסה (v3.8.36)

חשבונות מנוי (GLM, MiniMax וכו') מקבלים לעתים קרובות רק בקשות בו-זמנית ~ 1–3; חריגה מזה מפעילה 429s והתקררות. זה חריף מתחת** חלוקת מכסה** (`qtSd/…`) שילובים, שבהם מספר מפתחות API חולקים חשבון אחד במעלה הזרם. שלוש שכבות מונעות מציף חשבון משותף.

### מכסת מקבילות לכל חיבור (`max_concurrent`)

כל חיבור ספק יכול להכריז על תקרת `max_concurrent` (`provider_connections.max_concurrent`, מוגדר ב-connect modal / API / DB). השאר אותו ריק ללא הגבלה. זהו הכפתור הבודד שמניע את שכבת ההסדרה מתחת ל- — הגדר אותה במקבילות האמיתית של החשבון (למשל GLM ~ 1, MiniMax ~ 2).

### מכסות מקבילות לכל דגם (`modelConcurrency`)

חיבור יכול בנוסף להכריז על תקרות מקבילות מדויקות לכל דגם בתוך מפת `rateLimitOverrides` שלו:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

הגדר אותו במודאל החיבור (** מגבלת התעריף עוקפת מכסות מקבילות → לכל דגם** , `model=cap` אחד לכל שורה) או באמצעות `PATCH /api/providers/[id]` עם אותה צורת JSON. סמנטיקה מרכזית:

- **חיבור רחב לעומת דגם ספציפי:** `maxConcurrent` נותרה התקרה המשותפת לכל החיבורים. כאשר שניהם חלים, שני השערים נרכשים בצורה אטומית באותו שער מורכב (`global → provider → account → model`); ההתנהגות האפקטיבית היא המגבלה החלה המחמירה יותר.
- **התאמה מדויקת של מפתח דגם:** המפתח הוא מחרוזת הדגם המועברת למבצע לאחר ניתוב רזולוציית — בדרך כלל מזהה המודל החשוף במעלה הזרם (`glm-5`), לא כינוי `provider/model` בצד הלקוח (`zai/glm-5` אינו תואם `glm-5`). ערכים הם תקרות בו-זמנית עם מספר שלם חיובי.
- **תור מקומי, ללא גילוי:** עודף בקשות עומד בתור מקומי עם הסמנטיקה הקיימת queue/timeout (שגיאות קבלה מסוג `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` ). OmniRoute אינו מגלה או מסיק מדיניות במעלה הזרם — הוא אוכף את התקרות המדויקות שהמפעיל הגדיר. שער דגם רווי לעולם אינו משבית את הספק ולעולם אינו יוצר נעילת דגם קבועה; התנהגות 429/cooldown/fallback במעלה הזרם נשארת מעצור השגיאה.
- **לכל חיבור, לכל תהליך:** כובעים הם לכל חיבור למסד נתונים ומוחזקים בזיכרון, כך ששני חיבורים המשתמשים באותו מפתח API במעלה הזרם אינם מתואמים זה עם זה.
- **לא מוגדר פירושו ללא שינוי:** השמטת המפה (או השארת שדה לוח המחוונים ריק) לא מוסיפה שער דגם. תצורה לדוגמה מבלי לקבוע מגבלת ספק אוניברסלית כלשהי:

```text
glm-5=1
glm-4.7=3
```

### סידור בקשות לשיתוף מכסה

כאשר שליחת מכסה מכוונת לחיבור שמצהיר על `max_concurrent` חיובי, בקשות במקביל לכך** חֶשְׁבּוֹן** מסודרים באמצעות סמפור לכל חיבור (מפתח `qsconn:<connectionId>`): עודף בקשות** לחכות בתור** במקום להציף את החשבון. זה כן** כשל-פתיחה** — תור רווי או פסק זמן מתמשך ללא משבצת במקום לדחות אי פעם בקשה שניתן לשלוח. התחל פנימה** הגדרות → Resilience → במקביל למכסת שיתוף לכל חיבור** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ברירת מחדל פועלת). ללא כובע `max_concurrent` ההתנהגות ללא שינוי.

> שער ניתוב המכסה (`selectQuotaShareTarget`, DRR + P2C) הוא עצמו פתוח לכשל ורק _מבטל_ סדר העדיפויות של חיבור at-cap — עם מאגר חיבור יחיד שאינו יכול להגביל אותו בצורה קשה, כך שהסמפור הזה הוא מה שבעצם מכיל את המבול.

### ניסיון חוזר עם התקררות משולבת

עבור כל אסטרטגיית משולבת (כאשר היא מופעלת), בקשה שתגבש 429 לקירור חולף של SHORT ממתינה אותה ומשגרת מחדש במקום להחזיר את ה-429 — זה מכסה חלונות TPM/RPM בדרגת Gemini (~ 60s ניסיון חוזר-אחרי) בשילובים מרובי דגמים, למשל שני יעדים של דגם-com. תחום על ידי `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ב** הגדרות → חוסן** . הוא אף פעם לא ממתין לסיבות `quota_exhausted` (נעול עד חצות) או auth/not-found. עם `comboTimeoutMs` מוגדר, המתנה שלא יכולה להסתיים לפני המועד הזה לא מתחילה (#18998): המשולבת עונה בבת אחת עם התגובה הטרמינל שלה במקום `COMBO_TIMEOUT` 504.

שילוב יכול לבטל את ההצטרפות עם `config.comboCooldownWaitEnabled: false`. רק `false` מילולי משבית את ההמתנה המשולבת המשותפת הללו (המתנה לאחר שיגור והמתנה circuit-open/model-lock לפני שליחת) ואת הארכת רצפת הזמן הקצוב של תקציב ההמתנה שלהם. חסר או `true` משמר את המדיניות הגלובלית; `true` לא יכול לאפשר המתנה מושבתת גלובלית. `targetTimeoutMs` מפורש עדיין מנצח. ביטול הסכמה זה אינו משנה את ההמתנה הנפרדת של ה-Codex לפני השליחה עם סיבוב פינים.

אותו שער מכסה את המקרה שלפני השיגור (#16319): כאשר כל מטרה של משולבת מדלגת לפני שנעשה כל ניסיון מכיוון שהדגם שלו יושב בנעילה חולפת קצרה, נתיב אפס נסיונות ממתין לנעילה מתחת לאותן תקרות ומשגר מחדש, במקום לענות על `503 ALL_TARGETS_SKIPPED` חסר רמז. כאשר לא מותרת המתנה (תקרה, ניסיון או תקציב מוצה, או התכונה כבויה), תגובת הטרמינל משתדרגת ל- `429 rate_limit_error` הנושאת `retry_after` / `reset_at` מהתפוגה המוקדם ביותר של הנעילה החולפת; מכסה, אישור ומנעולים שלא נמצאו שומרים על 503 חסרי רמז.

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

## תכונות חוסן אחרות

- **22 אסטרטגיות ניתוב** (עדיפות, משוקלל, round-robin, context-relay, fill-first, p2c, אקראי, פחות בשימוש, אופטימיזציה לעלות, reset-aware, reset-window, expiry-first, headroom, מכסה משוקלל, strict-random, auto, lkgp, context-optimized, cache-optimized, — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) )
- **ניתוב מודע לאיפוס** (v3.8.0) — נותן עדיפות לחיבורים לפי זמן איפוס המכסה.
- **השפלה במצב רקע** תגובות — API `background: true` הושפלו לסנכרון עם אזהרה.
- **זיהוי מגבלת כלים דינמי** — נסוג מספקים כאשר מגבלות ספירת הכלים פוגעות.
- **חזרה לשעת חירום** — נשלט על ידי `OMNIROUTE_EMERGENCY_FALLBACK`; מפעילים יכולים לעקוף אותו מדף דגמי התכונות ללא הפעלה מחדש.

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
