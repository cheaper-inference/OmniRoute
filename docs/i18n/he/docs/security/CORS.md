# CORS Configuration & Security (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute שולט באיזה **מקורות הדפדפן** יכול לקרוא תגובות צולבות מרשימת היתרים אחת ומרוכזת. הדגם הוא **כישלון סגור כברירת מחדל** : אין מוצא מותר עד שתבחר אחד. דף זה מתעד כיצד רשימת ההיתרים פותרת, מה `CORS_ALLOW_ALL=true` בעצם חושף (וחשוב מכך, מה הוא עושה **לֹא** ), כיצד להגדיר את הפיתוח לעומת ייצור בצורה בטוחה, ואזהרת זמן הריצה שבלוח המחוונים מציגה כאשר תו כללי פעיל.

**מקור האמת:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). רשימת ההיתרים מוחלת פעם אחת, בתוכנת הביניים (`src/server/authz/pipeline.ts`) מטפלי — לכל מסלול אינם מגדירים `Access-Control-Allow-Origin` בעצמם.

## איך מוצאים פותרים

עבור כל בקשה תוכנת הביניים מחשבת את ערך `Access-Control-Allow-Origin` בסדר הזה:

1. **`CORS_ALLOW_ALL=true`** (או ה- `CORS_ORIGIN=*` מדור קודם) → מהדהד את `Origin` של המתקשר (או `*` כאשר אין כותרת `Origin` ), עם `Vary: Origin` כך שהמטמונים יישארו נכונים. אותה נקודת חנק `applyCorsHeaders()` גם מצרף `Vary: Accept-Encoding` לכל תגובה של 2xx-עם-גוף על משטח ה- `/v1*`/`/v1beta*` המאומת עם האסימון (`relaxForTokenAuth`, RFC 9110 §12.5.5, בעיה #6737), כך שמטמוני downstream/shared יכולים להבחין נכון בין גרסאות דחוסות לעומת לא דחוסות.
2. אחרת, הבקשה `Origin` מנורמלת (באותיות נמוכות, לוכסן נגרר) ומותאמת ל-**רשימת ההיתרים הממוזגת** :
   - env **`CORS_ALLOWED_ORIGINS`** רשימה מופרדת בפסיקים —, ו
   - זמן הריצה **`corsOrigins`** הגדרה (Dashboard → Security → _CORS Allowed Origins_), המוזרקת דרך `setRuntimeAllowedOrigins()` מ- `src/lib/config/runtimeSettings.ts`.
3. אין התאמה →**לא נפלטת כותרת `Access-Control-Allow-Origin`** . הדפדפן חוסם את הקריאה בין המקורות. זוהי ברירת המחדל המיועדת לכשל סגור.

| Env var                | מַשְׁמָעוּת                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | CSV ממקור מדויק לאפשר (מומלץ).                                           |
| `CORS_ALLOW_ALL`       | `true`/`1` → הד בכל מקור (תו כללי). Dev בלבד.                            |
| `CORS_ORIGIN`          | מוֹרֶשֶׁת. `*` מתנהג כמו `CORS_ALLOW_ALL`; ערך בודד נוסף לרשימת ההיתרים. |

## מודל האיום — מה ש- `CORS_ALLOW_ALL=true` באמת חושף

אזהרת OWASP הגנרית ("Wildcard CORS = שכל אתר יכול לקרוא ל- API שלך") שווה להתייחס ברצינות, אבל החשיפה של OmniRoute היא **צר יותר מהמקרה הגנרי** , בגלל עובדת יישום קונקרטית אחת:

> **ה- `applyCorsHeaders()` המרכזי לעולם אינו פולט `Access-Control-Allow-Credentials`.** דפדפן לא יחשוף תגובה צולבת מקור _credentialed_ (נושאת עוגיות), אלא אם השרת ישלח `Access-Control-Allow-Credentials: true`. נתיב CORS המשותף של OmniRoute אף פעם לא עושה זאת.

מה זה אומר לכל משטח, אפילו עם `CORS_ALLOW_ALL=true`:

| מִשׁטָח                                | מנגנון אישור              | השפעת תו כללי CORS                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| לוח מחוונים / MANAGEMENT `/api/*`      | הפעלת קובצי Cookie        | מקור הוא הד, אבל **ללא `Allow-Credentials`** הדפדפן **בלוקים** הקריאה המוסמכת. אתר זדוני חוצה מקורות **לא יכול לקרוא** תגובות לוח המחוונים המאומתות שלך, וקובץ ה-cookie של ההפעלה אינו חשוף.                                                                                                                                                                                                                                        |
| לקוח API `/v1/*`, `/v1beta/*`          | כותרת נושאת / `x-api-key` | כבר מתירנית **לפי עיצוב** (`relaxForTokenAuth`): דפדפנים לעולם אינם מצמידים אוטומטית `Authorization`/`x-api-key`, כך שדף של תוקף לא יכול לספק את המפתח שלך. ההד הרגוע דורש נושא מאומת (מפתח API מאומת או הפעלה של לוח המחוונים), לא רק כותרת אישור, ולעולם לא כולל `Access-Control-Allow-Credentials`. תגובות אנונימיות (`REQUIRE_API_KEY=false`) משתמשות ברשימת ההיתרים של המקור המוגדרת, כולל הסכמה מפורשת `CORS_ALLOW_ALL=true`. |
| לקריאה ציבורית בלבד (`/api/health`, …) | אַף לֹא אֶחָד             | לא רגיש; תו כללי אינו מזיק.                                                                                                                                                                                                                                                                                                                                                                                                         |

אז ה **שְׂרִידִי** החשיפה של `CORS_ALLOW_ALL=true` מוגבלת ל: (א) מקור צולב ללא אישור **קורא** של נתונים שכבר לא מאומתים, ו-(ב) מתן אפשרות CORS**כרטיס טרום טיסה** על מסלולי ניהול — שעדיין דורשים אישור שדף חוצה מוצא לא יכול לספק. זה כן **לֹא** וקטור חטיפת הפעלה או גניבת אישורים בנתיב ה- CORS המשותף.

### חריג אחד אמיתי — `/api/v1/agents/`

מסלולי Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) קובעים את שלהם **שֶׁלוֹ** כותרות CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ו **לַעֲשׂוֹת** פולט `Access-Control-Allow-Origin: <origin>|*` יחד עם `Access-Control-Allow-Credentials: true`. זהו המשטח הבודד שבו הד מקור ואישורים מתקיימים במקביל, וזהו **בלתי תלוי ב- `CORS_ALLOW_ALL`** . מסלולים אלו מאומתים בניהול (`requireManagementAuth`); מפעילים שחושפים את לוח המחוונים מחוץ למארח צריכים להיות מודעים לכך שזה המקום היחיד שבו מותרת קריאה של אישורים צולבים בכותרות התגובה. הידוק זה לרשימת הרשאות מפורשת מתבצע בנפרד מהנחיית CORS זו.

## רשימת תיוג ייצור

- **לעולם אל תגדיר `CORS_ALLOW_ALL=true` לייצור.** השאר אותו לא מוגדר.
- הגדר an **מְפוֹרָשׁ** רשימת מקור — או ה-env var או השדה Security-tab:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- אם OmniRoute פועל מאחורי פרוקסי/מנהרה הפוכה (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS הוא **לֹא** השליטה היחידה שלך — ה-Loopback Route Guard עדיין מגן על מסלולים בעלי יכולת שרצים (ראה [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). אל תזייף `X-Forwarded-For: 127.0.0.1` כדי "לתקן" 403; שפותחת מחדש את כיתת RCE שומר המסלול נסגר.
- אשר את מצב זמן הריצה: לוח המחוונים מציג א **באנר ענבר מתמשך** תחת לוח המחוונים → Security מלאי הרשאות → בכל פעם ש- `CORS_ALLOW_ALL=true` פעיל, ו- `/api/settings/authz-inventory` מחזיר כלי ניטור של מעטפת `cors: { allowAll, allowedOrigins }` שיכולים לסקר.

## נוחות פיתוח — מאפשרת מקורות מקומיים ספציפיים

לעתים רחוקות אתה צריך את התו הכללי אפילו ב-dev. אפשר רק את שרתי הפיתוח שבהם אתה משתמש:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

המקורות מותאמים ללא רגישות לאותיות גדולות עם האלכסון הנגרר, כך `http://localhost:3000` ו- `http://localhost:3000/` שווים. ניתן להגדיר את אותו CSV בזמן ריצה ב **לוח מחוונים → Security → CORS מקורים מותרים** ללא הפעלה מחדש.

## מפתחות API לעומת הפעלות של עוגיות

- **נושא / `x-api-key` (ה `/v1/*` משטח מסקנות):** דפדפנים לעולם לא מצמידים אותם באופן אוטומטי. CORS אינו מחסום משמעותי כאן — את API המפתח הוא המחסום — וזו הסיבה שהמשטח הזה מתיר בכוונה אז דפדפן ו Electron לקוחות יכולים לקרוא תגובות שהם כבר זכאים להן. ההד הרגוע דורש נושא מאומת (אומת API הפעלת מפתח או לוח המחוונים), לא רק כותרת של אישורים, ולעולם לא כוללת `Access-Control-Allow-Credentials`. תגובות אנונימיות (`REQUIRE_API_KEY=false`) השתמש ברשימת ההיתרים של המקור שהוגדרה, כולל מפורש `CORS_ALLOW_ALL=true` הצטרפות. דחיות אימות (401) נשארות קריאות כך שלקוחות יוכלו להציג מפתח שבוטל או שגוי (#5242): ה-401 של הצינור עצמו שומר על ההד, ומסלול שמסרב את המפתח עצמו לאחר שהצינור שימש אותו כאנונימי (`/v1/models` ו `/v1beta/models` עם אישור ניהול מוגדר, בעל היקף `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` ומסלולי מועמדים משולבים אוטומטיים) מוסיף את ההד לאותו 401 דרך `credentialRejectionHeaders()`. ההד נכתב על הבקשה הנושאת כותרת אישור (`Authorization`, `x-api-key`, `x-goog-api-key` או את `auth_token` cookie), לא באיזה מהם המסלול נבדק, ולעולם לא משויך אליו `Access-Control-Allow-Credentials`; הגוף הוא מעטפת שגיאה קבועה. מסלולי ניהול תחת `/api/v1/` נשמר על ידי `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) אל תשתמש בחריג זה של דחיית אישורים: עם `REQUIRE_API_KEY=false`, שלהם 401/403 התגובות עוקבות אחר ההגדרות המוגדרות CORS מדיניות מקור.
- **הפעלת קובצי Cookie (לוח המחוונים):** מוגן על ידי ברירת המחדל של fail-closed **ו** בהיעדר `Access-Control-Allow-Credentials` בנתיב המשותף. שמור על מקורות management/dashboard מחוץ לכל תצורה מתירנית; הם חייבים להישאר בדיוק סגורים לכשלים.

## לחיצות ידיים WebSocket (`/v1/responses`, `/v1/ws`)

דפדפנים לא מיישמים CORS ל- WebSocket, כך שהמשלוחים WebSocket שמחזירים פלט מסקנות בודקים את לחיצת היד `Origin` עצמם (`src/server/origin/wsOrigin.ts`): התגובות WebSocket (`/v1/responses`) וכאשר OmniRoute עובר דרך `npm start` / `npm run dev`, גשר `/v1/ws` ו- `/api/v1/ws`, שמזרים `/v1/chat/completions`, `/v1/messages` ו- `/v1/responses`. הגשר מבקש מ- `/api/v1/ws?handshake=1` את פסק הדין ומסרב לשדרג אלא אם כן המסלול הזה עשה את הבדיקה. דרישות האימות עדיין חלות בנפרד. בדיקת המקור עוברת כאשר:

- אין לו כותרת `Origin` (Codex CLI, SDKs ולקוחות אחרים שאינם דפדפנים);
- ה- `Origin` מתקבל על ידי רשימת ההיתרים לעיל (`CORS_ALLOWED_ORIGINS`, הגדרת `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- ה- `Origin` הוא אחד מהמקורות הציבוריים של OmniRoute עצמו (הבסיס הציבורי המוגדר URL, המקור המועבר של פרוקסי מהימן, או מארח loopback/LAN ישיר שניתן כ- IP ליטרלי או `localhost` — באותם מועמדים שבדיקת המוטציות בלוח המחוונים משתמשת בו); אוֹ
- הוא נושא מפתח API חוקי, כמו על משטח HTTP `/v1/*`.

כל דבר אחר מקבל `403 ws_origin_forbidden`. קובץ Cookie של הפעלה של לוח המחוונים אינו פוטר `Origin` זר, מכיוון שהדפדפן מצרף אותו לשקע של כל עמוד. `localhost` ביציאה אחרת אינה מטופלת כמקור זהה; הוסף מקורות מפתח כאלה ל- `CORS_ALLOWED_ORIGINS`.

## דוגמה: פרוקסי הפוך מול OmniRoute

CORS נאכף על ידי OmniRoute עצמו, כך שהפרוקסי בדרך כלל צריך **לֹא** הוסף או שכתוב כותרות `Access-Control-*` (כותרות כפולות שוברות דפדפנים). הפסק את TLS והעבר קדימה את — תן ל- OmniRoute לענות על טיסה מוקדמת:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

הגדר את מקורות הדפדפן המותרים ב- OmniRoute (`CORS_ALLOWED_ORIGINS` או בכרטיסייה אבטחה), לא בפרוקסי.

## קבצי מקור

| דְאָגָה                                     | קוֹבֶץ                                                               |
| ------------------------------------------- | -------------------------------------------------------------------- |
| רזולוציית רשימת ההיתרים + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| יישום תוכנת אמצעית (מקור יחיד של אמת)       | `src/server/authz/pipeline.ts`                                       |
| הגדרות → מקור הזרקת זמן ריצה                | `src/lib/config/runtimeSettings.ts`                                  |
| מצב זמן ריצה עבור לוח המחוונים              | `src/app/api/settings/authz-inventory/route.ts`                      |
| באנר אזהרה של לוח המחוונים                  | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| שדה CORS Allowed Origins                    | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent לכל מסלול CORS (החריג)          | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket לחיצת יד בדיקת `Origin`           | `src/server/origin/wsOrigin.ts`                                      |

## ראה גם

- אכיפת לולאה של מסלולים [ב-Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — עבור מסלולים בעלי יכולת שרצים (בקרה נפרדת משלימה).
- [מדריך ההרשאות](../architecture/AUTHZ_GUIDE.md) — צינור ההסמכה המלא.
