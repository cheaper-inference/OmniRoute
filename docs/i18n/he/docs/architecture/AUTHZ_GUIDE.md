# Authorization Guide (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **מקור האמת:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **עודכן לאחרונה:** 2026-09-22 — מרחבי שמות של סקופים מצביעים על MCP-SERVER.md

ל-OmniRoute יש צינור הרשאות מודע-לנתיבים שחוסם כל בקשת API. הסיווג הוא **דטרמיניסטי** ו**סגור-בכישלון** — כל דבר שלא ניתן לסווגו מסתיים כ-`MANAGEMENT` ודורש סשן או אסימון ברמת ניהול. עמוד זה מסביר את המודל למהנדסים המתחזקים נתיבים או מתכננים נקודות קצה חדשות.

![צינור AuthZ (3 מחלקות נתיבים + הערכת מדיניות)](../diagrams/exported/authz-pipeline.svg)

> מקור: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## שני מצבי אימות

### 1. מפתח API (Bearer)

משמש עבור ממשקי ה-API של הלקוחות התואמים ל-OpenAI/Anthropic/Gemini ולכמה מסלולי ניהול, כאשר למפתח יש את ההיקף `manage`.

```
Authorization: Bearer <api-key>
```

נבדק על ידי `isValidApiKey()` / `extractApiKey()` ב-`src/sse/services/auth.ts` ומיוצא מחדש דרך `src/shared/utils/apiAuth.ts`. המאמת מקבל גם את משתני הסביבה `OMNIROUTE_API_KEY` ו-`ROUTER_API_KEY` כמפתחות מעבר קבועים (issue #1350).

### 2. סשן לוח הבקרה (עוגיית auth_token)

עבור דפי לוח הבקרה ופעולות ניהול.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

העוגייה היא סשן רק כאשר ה-JWT שלה מאומת **וגם** נושא `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). כל צרכן של העוגייה — שומר המסלולים של לוח הבקרה (`isDashboardSessionAuthenticated()`), צינור רענון האימות, לחיצת היד של WebSocket, השרת החי, `/api/settings/require-login` ו-`/api/auth/status` — עובר דרך העזר הזה.
קיימים גם JWT-ים אחרים החתומים עם `JWT_SECRET` — למשל, ה-Cursor CLI passthrough מנפיק לבעלי מפתחות אסימונים עם `iss "omniroute" / aud "cursor-cli"`, והם לעולם אינם סשנים (#13298).

הסשן מאומת על ידי `isDashboardSessionAuthenticated()` ב-`src/shared/utils/apiAuth.ts`. הצינור מרענן את ה-JWT אוטומטית כאשר נותרו לו פחות מ-7 ימים מתוך חיי ה-30 יום שלו.

סשן עשוי להסתיים לפני שחלפו 30 ימיו, מכיוון שכל מנפיק עובר דרך `mintDashboardSessionToken` (וכולל זמן הנפקה `iat` ומזהה `jti`), והמאמת בודק שתי הגדרות: `sessionsValidAfter`, שמוגדרת על ידי שינוי סיסמה כך שכל סשן שהונפק לפניה מפסיק להתאמת (הדפדפן ששינה את הסיסמה מקבל עוגייה חדשה), ו-`revokedDashboardSessions`, שאליה `POST /api/auth/logout` מוסיף את ה-`jti` של הסשן שנותק. לסשנים שהונפקו על ידי גרסה ישנה אין אף אחת משתי התביעות, והם נשארים תקפים עד השינוי הראשון של הסיסמה. אם לא ניתן לקרוא את ההגדרות, הסשן אינו נאמן.

חלק ממסלולי הניהול מקבלים **אחד משני** המצבים: עוגייה או `Bearer <key>` כאשר למפתח יש את ההיקף `manage` (או `admin`). זה מה שמאפשר את זרימת העבודה "ניתנת להגדרה באמצעות קריאות API" שנוספה בגרסה v3.8.

#### שער כניסה OIDC אופציונלי (#6973)

כניסת מנהל לוח הבקרה תומכת גם בזרם OIDC (OpenID Connect) **אופציונלי** לצד כניסת הסיסמה ברירת המחדל — כניסת הסיסמה לעולם אינה מוסרת, אלא רק משלימה:

- מושבת אלא אם `settings.oidcEnabled === true` **וגם** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` מוגדרים כולם (הגדרות ← אימות). `GET /api/auth/oidc/login` מחזיר `400` אחרת.
- `GET /api/auth/oidc/login` מאתר את `authorization_endpoint` מתוך `/.well-known/openid-configuration` של ה-issuer (ונופל ל-`<issuer>/authorize` אם צריך), בונה את ה-redirect URI מתוך הבקשה הנכנסת (עם תמיכה ב-`x-forwarded-proto`), ומפנה לספק הזהות עם `state` אקראי השמור בעוגיית `oidc_state` עם `httpOnly`.
- `GET /api/auth/oidc/callback` מאמת את `state`, מחליף את קוד ההרשאה (authorization code), ומאמת את החתימה של ה-ID token דרך ה-JWKS של ה-issuer (`createRemoteJWKSet` של `jose`, עם מטמון לכל כתובת JWKS) עם בדיקות `issuer` ו-`audience`. רשימת ההיתר `oidcAllowedSubjects` חובה: היא מתאימה לתביעה `sub` של הטוקן או לתביעה `email`, והתביעה `email` נלקחת בחשבון רק כאשר `email_verified === true`, כך שכתובת דוא"ל לא מאומתת אצל ספק הזהות לעולם לא תעבור את השער. עם רשימה ריקה, ה-callback דוחה כל כניסה (`not_configured`).
- בהצלחה הוא מנפיק **את אותה** עוגיית `auth_token` מסוג JWT לתקופה של 30 ימים שכניסת הסיסמה מנפיקה (`src/app/api/auth/login/route.ts`), כך ששאר צינור הסשן של לוח הבקרה (רענון אוטומטי, דגלי עוגייה) נשאר ללא שינוי — OIDC משנה רק את האופן שבו העוגייה נוצרת, לא את מה שהיא מעניקה.
- כל הגדרות ה-`oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) נמצאות ב-`SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings` עונה `400 PASSWORD_REQUIRED` אלא אם הגוף נושא את סיסמת הניהול כ-`currentPassword` (`401 PASSWORD_MISMATCH` כאשר היא שגויה). `oidcDisablePasswordLogin` אוסר _כניסה_ בסיסמה (`POST /api/auth/login`) אך שומר על hash הסיסמה, ואימות ה-re-auth עדיין בודק את `currentPassword` מולו.
- גם `corsOrigins` ו-`bruteForceProtection` נמצאים ב-`SECURITY_IMPACTING_SETTINGS_KEYS`: הרחבת אחד מהם מחלישה את הגנות הכניסה, ולכן הם דורשים את אותו re-auth עם `currentPassword` (לשונית האבטחה מבקשת אותו), וייבוא ה-JSON מסיר אותם.
- כל מפתח מדיניות אבטחה — ערכי `SECURITY_IMPACTING_SETTINGS_KEYS`, כל מפתח `oidc*` ומצב הסשן של לוח הבקרה — הוא **למפעיל בלבד** ב-`PATCH /api/settings`: מפתח API בהיקף `manage` או טוקן גישה `oma_` נדחים עם `403` גם כשהם שולחים `currentPassword` נכון, והדחייה נרשמת כ-`settings.update_failed` עם `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` ב-`src/lib/api/operatorCredential.ts`). הגדרות רגילות (ערכת נושא והעדפות תצוגה) נשארות ניתנות לכתיבה עבור מפתח `manage` או טוקן גישה `admin`. כל שינוי של `/api/settings` עצמו (וגם של `/api/settings/require-login`) דורש גם את היקף טוקן הגישה `admin` (`ADMIN_MUTATION_EXACT_PATHS` ב-`src/server/authz/accessScopes.ts`, התאמה מדויקת של הנתיב); `GET` נשאר `read`, ותתי-המסלולים האחרים של `/api/settings/*` (פרוקסים, ברירות מחדל של שילובים, כינויי מודלים, דחיסה, מחיקות...) שומרים על היקף `write` שמוסק משיטת הבקשה.
- `POST /api/settings/import-json` מדלג על ה-re-auth הזה, לכן הוא מסיר לפני הכתיבה כל מפתח ב-`IMPORT_STRIPPED_SETTINGS_KEYS` (באותו קובץ): הסיסמה ו-`currentPassword`, כל ערך ב-`SECURITY_IMPACTING_SETTINGS_KEYS`, ומצב הסשן של לוח הבקרה (`sessionsValidAfter`, `revokedDashboardSessions`). לכן ייבוא גיבוי ישן לא יכול להחיות סשן שמשינוי סיסמה או מהתנתקות כבר הסתיים.

## מחלקות נתיבים

`src/server/authz/types.ts` מגדיר שלוש מחלקות; כל נתיב שאי אפשר לסווג באופן דטרמיניסטי נופל ל-`MANAGEMENT`.

| Class        | Description                                                                                                                                          | Auth required                                             |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `PUBLIC`     | נתיבים בטוחים במפורש — כניסה, יציאה, סטטוס, אתחול, בריאות ואתחול ההטמעה הראשוני.                                                                     | אין                                                       |
| `CLIENT_API` | נקודות קצה להגשת מודלים — `/api/v1/*`, `/api/v1beta/*`, וכן הכינויים `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | מפתח Bearer כאשר דגל התכונה `REQUIRE_API_KEY` הפעיל מופעל |
| `MANAGEMENT` | דפי לוח הבקרה, הגדרות, ספקים, מפתחות, נקודות קצה של ניהול ואבחון.                                                                                    | סשן לוח הבקרה **או** Bearer עם היקף `manage`              |

כמה פעולות של `MANAGEMENT` הן **למפעיל בלבד**: מפתח `manage` אינו מספיק. ייצוא של אישורים שמורים (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), שחזור גיבוי על גבי הנתונים החיים (`POST /api/db-backups/import` כולל `dryRun=true`, `POST /api/db-backups` לשחזור לפי מזהה, `POST /api/settings/import-json`), והשמדת נקודות שחזור (ניקוי `DELETE /api/db-backups`, וגם `PATCH /api/db-backups` מכיוון שהשמירה שהוא מתמיד בה מניעה את הגיזום האוטומטי אחרי כל גיבוי) — כולן דורשות סשן לוח הבקרה, נושא ה-CLI המקומי, או כניסה מושבתת. הנפקת טוקן סנכרון (`POST /api/sync/tokens`) וטביעת טוקן גישה CLI מסוג `admin` (`POST /api/cli/tokens`) דורשים סשן לוח הבקרה או נושא ה-CLI המקומי בכל מצב כניסה. מפתחות API מכל היקף וטוקני גישה `oma_` אינם אישורי מפעיל: הם מקבלים `403` בכל פעם שנדרש אחד מהם. הבדיקה נמצאת ב-`src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). שינוי הגדרות הכניסה מוגבל למפעיל אף הוא: `POST /api/settings/require-login` (הגדרת סיסמת הניהול / החלפת `requireLogin`) מקבל רק את האישורים האלה לאחר שקיימת סיסמה — חלון האתחול הראשוני בהפעלה הראשונה (עוד אין סיסמה) נשאר כפי שהוא, וסשן לוח הבקרה חייב לשלוח `currentPassword` כדי להחליף את הסיסמה (`403` כשהוא חסר או שגוי, ונרשם כ-`settings.update_failed`). ה-CLI המקומי ומופע עם כניסה מושבתת שומרים על מסלול ההתאוששות, ויכולים להגדיר סיסמה בלעדיו, מכיוון ששניהם קשורים למארח שבבעלותו תיקיית הנתונים.

## צינור העיבוד

```
בקשה נכנסת → src/proxy.ts
  → runAuthzPipeline() בתוך src/server/authz/pipeline.ts
    1. הסרת כותרות פנימיות מהימנות (x-omniroute-auth-*, x-omniroute-route-class)
    2. יצירת מזהה בקשה, סיווג הנתיב באמצעות classifyRoute()
    3. אם pathname == "/" → הפניה אל /dashboard
    4. אם המערכת בתהליך ריקון (כיבוי הדרגתי) והנתיב הוא /api/* → 503
    5. אם זו בקשה שאינה GET אל /api/* → הפעלת מנגנון ההגנה checkBodySize()
    6. אם OPTIONS → קדם-בדיקת CORS עם 204
    7. אם options.enforce == false → העברה ללא שינוי עם כותרות מחלקת הנתיב
    8. אחרת: POLICIES[routeClass].evaluate(ctx)
       - אישור  → החתמת x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - דחייה → שגיאת JSON עם correlation_id (דפי לוח הבקרה → 302 /login)
```

כותרות פנימיות מהימנות (המוגדרות ב-`src/server/authz/headers.ts`) **מוסרות מבקשות נכנסות** לפני הסיווג — לקוחות אינם יכולים לאכלס מראש את `x-omniroute-auth-*` כדי להתחזות לזהות אחרת.

### חוזי מדיניות

לכל מחלקת נתיבים יש מדיניות תחת `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — תמיד מחזירה `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — מחלצת Bearer ומאמתת אותו באמצעות `validateApiKey()`. עוברת לגישה אנונימית רק כאשר דגל היכולת האפקטיבי `REQUIRE_API_KEY` מושבת. הדגל האפקטיבי נקבע באמצעות `isRequireApiKeyEnabled()` (`עקיפת דגל יכולת במסד הנתונים > process.env.REQUIRE_API_KEY > ברירת מחדל`), כך שדגלי היכולת בלוח הבקרה ומשתני הסביבה שולטים באופן עקבי ב-`/api/v1/*`, ב-`/api/v1beta/*` ובכינויים; כשל בפותר מוביל לדחייה. מאפשרת בקשות עם הפעלת לוח בקרה בנתיבי API של לקוח (כולל `/api/v1/models`, המשמש את קטלוג המודלים של לוח הבקרה).
- **`managementPolicy`** (`policies/management.ts`) — מקבלת הפעלת לוח בקרה, בקשות פנימיות לסנכרון מודלים (המותאמות מול `/api/providers/[name]/(sync-models|models)`), או מדלגת לחלוטין אם `isAuthRequired()` מחזירה false. מחזירה 403 (`AUTH_001`) כאשר קיים אסימון Bearer אך הוא אינו תקין, ו-401 בכל מקרה אחר. בנוסף, היא אוכפת את רמות ההגנה על נתיבים (LOCAL_ONLY / ALWAYS_PROTECTED) לפני כל ענף אימות — ראו [רמות הגנה על נתיבים](../security/ROUTE_GUARD_TIERS.md). ניתן לגשת לנתיבי LOCAL_ONLY תחת `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (כיום: `/api/mcp/`) מכתובת שאינה loopback כאשר מפתח ה-Bearer כולל את תחום ההרשאה `manage`; כל שאר נתיבי LOCAL_ONLY נותרים מוגבלים בקפדנות ל-loopback, ללא תלות בתחום ההרשאה.

מדיניות שהצליחה מחזירה `AuthSubject` עם `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. מטפלים בהמשך השרשרת יכולים לקרוא אותו באמצעות `assertAuth(request, "CLIENT_API")` מתוך `src/server/authz/assertAuth.ts`, במקום להריץ מחדש את לוגיקת האימות.

## רשימת נתיבים ציבוריים

`src/shared/constants/publicApiRoutes.ts` היא רשימת ההיתרים המפורשת:

הרשימה מחולקת לפי **מבנה**, והחלוקה חיונית לאבטחה (GHSA-74g9-q8f6-793h): קידומת מותאמת באמצעות `startsWith()`, ולכן היא מתאימה גם לכל נתיב סמוך שחולק את התווים הפותחים שלה.
השימוש ב-`/api/usage/om-usage` כקידומת סימן את `/api/usage/om-usage<anything>` כציבורי, ו-Next מנתב זאת אל `/api/usage/[connectionId]` — מטפל ללא אימות משלו.

```ts
// תתי-עצים אמיתיים. כל רשומה חייבת להסתיים ב-"/" (נבדק באמצעות בדיקת יחידה).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // מטופל כ-CLIENT_API ב-classify, ולא כציבורי "ללא אימות"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// נתיבים יחידים, המותאמים באופן מדויק (עם או בלי לוכסן מסיים).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// נתיבים יחידים לקריאה בלבד, שמקבלים גם את ההקלה על מקור CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// נתיב יחיד לקריאה בלבד ללא ההקלה על CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

נתיבים לקריאה בלבד הם ציבוריים **רק** עבור שיטות בטוחות. שימו לב: `classifyRoute()` מחריגה את `/api/v1/*` ואת `/api/v1beta/*` מברירת המחדל של PUBLIC — הם תמיד `CLIENT_API`, כך שמדיניות מפתח ה-Bearer עדיין חלה.

## הוספת נתיב חדש

### תבנית 1 — נקודת קצה ציבורית של API ללקוח (אימות Bearer)

נתיבים תחת `/api/v1/` ו-`/api/v1beta/` מסווגים אוטומטית כ-`CLIENT_API`. שכבת התווך אוכפת את בדיקת ה-Bearer; מטפלי הנתיבים אינם צריכים לבצע אותה מחדש, אך יכולים לקרוא את הזהות אם הדבר שימושי.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... לוגיקת המטפל
}
```

### תבנית 2 — נקודת קצה לניהול (הפעלה או Bearer + הרשאת ניהול)

השתמשו ב-`requireManagementAuth()` מתוך `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... לוגיקת המטפל
}
```

`requireManagementAuth()` מחזירה `null` במקרה של הצלחה, או `Response` עם שגיאת JSON:

- 401 `AUTH_001` "נדרש אימות" — אין פרטי אימות כלל
- 403 — Bearer לא תקין **או** Bearer קיים, אך למפתח חסר ההיקף `manage` / `admin`

`hasManageScope(scopes)` מחזירה true עבור `"manage"` או `"admin"`.

### תבנית 3 — הוספה לרשימת ההיתרים הציבורית

בחרו את הקבוצה לפי המבנה, ולא לפי הנוחות. נתיב יחיד נכנס ל-`PUBLIC_API_ROUTES_EXACT` (או ל-`PUBLIC_READONLY_CORS_API_ROUTES` אם הוא מיועד ל-GET בלבד); רק תת-עץ אמיתי נכנס ל-`PUBLIC_API_ROUTE_PREFIXES`, והוא **חייב להסתיים ב-`/`**. הוספת נתיב יחיד לרשימת הקידומות הופכת לציבורי גם כל נתיב סמוך שחולק את התווים הפותחים שלו — כולל נתיבים אחים בעלי מקטע דינמי שיתווספו בהמשך (GHSA-74g9-q8f6-793h). עדכנו את בדיקות היחידה ב-`tests/unit/public-api-routes.test.ts`, ב-`tests/unit/authz/public-route-exact-match.test.ts` וב-`tests/unit/authz/classify.test.ts`.

## היקפים

שלושה מרחבי שמות. כל בודק קורא רק את המחרוזות שלו. ההשוואה זה לצד זה,
כולל מדוע `manage` נכשל ב-`scopeMatches` עבור `read:compression` ומדוע אסימון גישה מסוג
`read` אינו יכול לבצע `PATCH /api/keys/{id}`, נמצאת ב-[שלושה מרחבי שמות של היקפים](../frameworks/MCP-SERVER.md#three-scope-namespaces).

מפתחות API נושאים מערך `scopes` (המאוחסן כ-JSON ב-`api_keys.scopes`, ראה `src/lib/db/apiKeys.ts`).

### היקף ניהול

- `manage` / `admin` — `hasManageScope`. גישת Bearer לניתובים של API הניהול.
- `mcp:connect`, `self:usage`, `self:account-quota`, ו-
  `policy:bypass-provider-quota` הם היקפים תוספתיים של התאמה מדויקת. הם נמצאים
  מחוץ ל-`MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` פותח רק את
  החריץ הלא-לולאתי `/api/mcp/`.

### היקפי כלי MCP

קטלוג וכללי התאמה (מחרוזת זהה, או היקף מוענק המסיים ב-`*`):
[היקפי כלי MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` ב-`src/shared/constants/mcpScopes.ts` הוא תת-הקבוצה המקלידה המקורית,
לא הקטלוג המלא הזה. האכיפה מתבצעת ב-
`open-sse/mcp-server/scopeEnforcement.ts` לאחר ש-`resolveCallerScopeContext()`
פותר היקפים מפרטי אימות MCP, מטא-נתונים של בקשה, או `OMNIROUTE_MCP_SCOPES`.
הוא נשאר כבוי אלא אם כן `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### היקפי אסימוני גישה

`read` / `write` / `admin` על אסימוני `oma_live_…`, מדורגים לפי `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). דירוג זה חל על אישור אסימון הגישה בלבד.
ראה [אימות ניהול](../guides/MANAGEMENT-AUTH.md).

## מתג דרישת אימות

`isAuthRequired()` ב-`src/shared/utils/apiAuth.ts` קובעת אם נאכף **כל** אימות על בקשה:

- `settings.requireLogin === false` ← האימות מושבת גלובלית, למעט הרמה המוגנת תמיד (ראו [שכבות מגן המסלולים](../security/ROUTE_GUARD_TIERS.md)) והקריאות שמנפיקות אישור שהמערכת מקבלת, והן דורשות את אותו אישור כמו כשהכניסה פעילה: הנפקת טוקני סנכרון, טביעת טוקני גישה CLI בכל היקף, יצירת מפתח API בהיקף `manage`/`admin`, מתן ההיקף הזה למפתח, או יצירה מחדש או חשיפה של מפתח כזה (`requireCredentialForManagementScopedKey()` ב-`src/lib/api/requireManagementAuth.ts`). מפתחות לצורכי הסקה בלבד נשארים פתוחים.
- לא הוגדרה סיסמה **וגם** אין משתנה הסביבה `INITIAL_PASSWORD` ← מצב האתחול מאפשר את אשף ההטמעה ובקשות מקומיות (loopback), אך בקשות רשת חשופות עדיין דורשות אישורים.
- כל שגיאה במסד הנתונים ← נכשל בסגירה (secure-by-default).

אכיפת מפתח API של הלקוח משתמשת ב-`isRequireApiKeyEnabled()` ב-`src/shared/utils/featureFlags.ts`, ולא בקריאה ישירה של `process.env.REQUIRE_API_KEY`. זה חשוב לפריסות: החלפת `REQUIRE_API_KEY` בלוח הבקרה ← דגלי תכונות שומרת עקיפה במסד הנתונים ומשפיעה מיד על `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` ועל בדיקות האימות האחרות של ה-API ללקוח שחולקות את העזר הזה. אם לא ניתן לקרוא את מאגר דגלי התכונות, אימות ה-API של הלקוח נכשל בסגירה ודורש מפתח.

## שינוי שובר תאימות — v3.8.0

נקודות הקצה `/api/v1/agents/tasks/*` ו-`/api/resilience/model-cooldowns` **דורשות כעת אימות ניהול** (commit `588a0333`). לקוחות ששלחו בעבר מפתח API רגיל ללא היקף ההרשאה `manage` מקבלים `403`. מיגרציה: יש להעניק למפתח את היקף ההרשאה `manage` בלוח הבקרה API Keys, או להשתמש בהפעלת Dashboard שבה המשתמש מחובר.

## שינוי התנהגות — v3.8.2

`/api/mcp/*` (שרת ה-MCP המרוחק) עדיין מוגדר כברירת מחדל כ-LOCAL_ONLY, אך כעת מקבל בקשות שאינן loopback כאשר הכותרת `Authorization: Bearer <api-key>` מכילה את היקף ההרשאה `manage`. החריגה נשלטת במפורש עבור כל נתיב באמצעות `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` שב-`src/server/authz/routeGuard.ts`; בכוונה לא ניתן לעקוף את תחילית ה-LOCAL_ONLY המקבילה `/api/cli-tools/runtime/*`, משום שהיא יכולה להפעיל תהליכי משנה שרירותיים. בקשות אנונימיות אל `/api/mcp/*` שאינן מ-loopback ממשיכות להחזיר `403 LOCAL_ONLY` — ברירת המחדל עבור כל נתיב LOCAL_ONLY חדש נותרת loopback בלבד באופן מחמיר. ראו [רמות הגנת נתיבים](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## בדיקות

- בדיקות יחידה: `tests/unit/authz/` — `classify.test.ts`,‏ `pipeline.test.ts`,‏ `client-api-policy.test.ts`,‏ `management-policy.test.ts`,‏ `public-policy.test.ts`.
- רשימת ההיתרים הציבורית: `tests/unit/public-api-routes.test.ts`.
- הרצה ממוקדת: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## איתור באגים

צינור העיבוד תמיד מוסיף לחותמת התגובות את הכותרות הבאות:

```
x-request-id:               <מזהה מתאם, מוחזר גם בגופי שגיאה>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

עבור בקשות מאומתות, כותרות הבקשה המועברות לשירות שבמעלה הזרם (בצד המטפל) כוללות גם:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<4 הספרות האחרונות> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (אופציונלי)
x-omniroute-auth-scopes:    רשימה מופרדת בפסיקים
```

השתמשו ב-`assertAuth(req, expectedClass)` בתוך מטפלים — היא זורקת `AuthzAssertionError` עם הקוד `AUTHZ_NOT_INITIALIZED` אם תוכנת התווך נעקפה (שימושי לזיהוי נסיגות תצורה בבדיקות).

## ראו גם

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — סמן אימות לכל נקודת קצה
- [COMPLIANCE.md](../security/COMPLIANCE.md) — יומן ביקורת לאירועי אימות
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — שלושה מרחבי שמות של היקפים וקטלוג היקף-כלי של MCP
- מקור: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
