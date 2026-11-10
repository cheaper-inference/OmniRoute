# OmniRoute A2A Server Documentation (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> פרוטוקול Agent-to-Agent גרסה v0.3 — ‏OmniRoute כסוכן ניתוב חכם

לממשק A2A יש שני פנים:

- **JSON-RPC 2.0** בכתובת `POST /a2a` (נקודת הכניסה הקנונית, המוגדרת ב־`src/app/a2a/route.ts`).
- **REST** תחת `/api/a2a/*` עבור לוחות מחוונים וכלי עזר (סטטוס, רשימת משימות, ביטול).

המעקב אחר משימות מתבצע באמצעות `A2ATaskManager` ‏(`src/lib/a2a/taskManager.ts`, ברירת המחדל של TTL היא 5 דקות). מיומנויות מועברות לטיפול באמצעות `A2A_SKILL_HANDLERS` בקובץ `src/lib/a2a/taskExecution.ts`.

## גילוי הסוכן

```bash
curl http://localhost:20128/.well-known/agent.json
```

מחזירה את כרטיס הסוכן המתאר את היכולות, המיומנויות ודרישות האימות של OmniRoute.

השדה `version` בכרטיס הסוכן נלקח מתוך `process.env.npm_package_version` (ראו `src/app/.well-known/agent.json/route.ts:13`), ולכן הוא נשאר מסונכרן אוטומטית עם `package.json` בכל גרסה חדשה.

---

## אימות

כל הבקשות אל `/a2a` דורשות מפתח API דרך הכותרת `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

אם לא מוגדר מפתח API בשרת, האימות נעקף.

## הפעלה

A2A נשלט באמצעות המתג **נקודות קצה → A2A** ומושבת כברירת מחדל. כאשר הוא מושבת,
`GET /api/a2a/status` מדווח על `status: "disabled"` ועל `online: false`; קריאות JSON-RPC אל
`POST /a2a` מחזירות HTTP 503 עם קוד השגיאה `-32000` של JSON-RPC.

---

## שיטות JSON-RPC 2.0

### `message/send` — ביצוע סינכרוני

שולחת הודעה למיומנות וממתינה לתגובה המלאה.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

עבור `smart-routing`, הערך `metadata.combo` הוא דריסה מפורשת של
`metadata.model` עבור בקשת השער; הוא נשלח בתור `model` בפועל,
ולא כשדה JSON מסוג `x-combo` שמתעלמים ממנו. אימות מפתח ה-API הרגיל של השער
וההרשאה לכל יעד עדיין חלים. שילוב לא תקין או ריק נדחה.

התוצאה חושפת את `requested_combo` (כוונת הקורא), את `dispatched_model`
(בקשת השער בפועל), את `response_model` (תגובת השער) ואת
`confirmed_combo`. השדה האחרון הוא `null`, אלא אם השער מזהה שילוב
באופן מפורש. יומני ההחלטות של A2A מייחסים את הביצוע רק לשילוב
שאושר, תוך שמירת בקשה שלא אושרה בתור `requestedCombo`.

**תגובה:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "requested_combo": "fast-coding",
      "confirmed_combo": null,
      "dispatched_model": "fast-coding",
      "response_model": "claude-sonnet",
      "cost_envelope": { "estimated": 0.005, "actual": 0.003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "within budget and quota limits" }
    }
  }
}
```

### `message/stream` — הזרמת SSE

זהה ל-`message/send`, אך מחזירה אירועים שנשלחים מהשרת לצורך הזרמה בזמן אמת.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**אירועי SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — שאילתת מצב משימה

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ביטול משימה

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## מיומנויות זמינות

OmniRoute חושף 6 מיומנויות A2A מחווטות ב- `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. כל מודול מיומנות חי ב- `src/lib/a2a/skills/`.

| מְיוּמָנוּת     | ID                   | תֵאוּר                                                                                                                       | תגים                    | דוגמאות                                |
| :-------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :---------------------- | :------------------------------------- |
| ניתוב חכם       | `smart-routing`      | מנתב הנחיה דרך ה- provider/combo האופטימלי באמצעות מנוע המשולב של OmniRoute+ ניקוד                                           | ניתוב, ספקים            | "נתב הודעה זו באמצעות הדגם הטוב ביותר" |
| ניהול מכסות     | `quota-management`   | מדווח על מצב מכסה לכל ספק, עוזר למתקשרים להחליט מתי ל- throttle/switch                                                       | מכסה, ספקים             | "בדוק מכסה לאנתרופית"                  |
| גילוי ספק       | `provider-discovery` | מפרט ספקים מותקנים עם יכולות, דגלים ברמה חופשית, סטטוס OAuth                                                                 | ספקים, גילוי            | "אילו ספקים זמינים?"                   |
| ניתוח עלויות    | `cost-analysis`      | מעריך את העלות של request/conversation בהתחשב בקטלוג + השימוש האחרון                                                         | עלות, שימוש             | "הערכת עלות לשיחה זו"                  |
| דו"ח בריאות     | `health-report`      | מצטבר מפסק זרם, קירור, מצב נעילה לכל ספק                                                                                     | בריאות, חוסן            | "הצג מצב בריאותי של כל הספקים"         |
| רשימה של יכולות | `list-capabilities`  | מחזירה את הקטלוג המלא של 45 ערכים של כישורי סוכן (23 API + 21 CLI + 1 config) כטבלת סימון עם SKILL.md URLs גולמי להזרקת הקשר | קטלוג, גילוי, מיומנויות | "רשום את כל יכולות OmniRoute "         |

> יש לשמור על כרטיס הסוכן מיושר עם הקטלוג החי של ספקי 387; ספירת ספקים ומטא נתונים free/no-auth מקורם ברישום זמן הריצה.

### פרט מיומנות `list-capabilities`

מיומנות `list-capabilities` שימושית במיוחד עבור סוכנים חיצוניים שצריכים לגלות מה OmniRoute חושף לפני שליחת קריאות API. זה מחזיר חפץ טבלת סימון מובנה:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

כל שורה כוללת את עמודת `rawUrl` כך שסוכנים יכולים להביא מיד את ה- SKILL.md המלא. שדה `metadata.totalSkills` משקף את גודל הקטלוג (45 היום). יישום: `src/lib/a2a/skills/listCapabilities.ts`. ראה גם [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (עזר)

נקודת הקצה של JSON-RPC `/a2a` היא נקודת הכניסה הקנונית A2A. נקודות הקצה REST להלן מספקות גישה עזר ללוחות מחוונים וכלים חיצוניים:

| נקודת קצה                    | שִׁיטָה | תֵאוּר                                            | Auth                                                                                      |
| :--------------------------- | :------ | :------------------------------------------------ | :---------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET     | מצב שרת, כישורים רשומים                           | (פּוּמְבֵּי)                                                                              |
| `/api/a2a/tasks`             | GET     | רשימת משימות עם מסננים                            | ניהול או מפתח API (ראה להלן)                                                              |
| `/api/a2a/tasks/[id]`        | GET     | קבל משימה מאת ID                                  | ניהול או מפתח API (ראה להלן)                                                              |
| `/api/a2a/tasks/[id]/cancel` | POST    | בטל משימת הפעלה                                   | ניהול או מפתח API (ראה להלן)                                                              |
| `/.well-known/agent.json`    | GET     | כרטיס סוכן (גילוי A2A )                           | (ציבורי, שמור 3600s)                                                                      |
| `/api/a2a/tasks`             | POST    | משלחת נכנסת לצי OmniConductor (Conductor PRD RF5) | זהה ל- `GET`, פלוס `OMNIROUTE_API_KEY` אם מוגדר בזמן `REQUIRE_API_KEY` כבוי; `a2aEnabled` |

מי שיעבור למסלולי `/api/a2a/tasks*` תלוי בהגדרות הכניסה ומפתח ה-API:

- `requireLogin=true` (ברירת מחדל): תוכנת האמצע מקבלת רק אישורי ניהול (הפעלה של לוח המחוונים, מקש `manage` -scope API, אסימון גישה `oma_` ) ו- `OMNIROUTE_API_KEY`. מפתח היסק רגיל מקבל `403`. בכותרת `Authorization` התווך לוקח `OMNIROUTE_API_KEY` רק כ- `Bearer <key>`; מפתח חשוף או טאב אחרי `Bearer` מקבל `401`.
- `requireLogin=false`, או חלון הלולאה לפני הכניסה: עם `REQUIRE_API_KEY=true` כל מפתח OmniRoute API חוקי או אישור ניהול מתקבל ומתקשרים אנונימיים מקבלים `401`; עם `REQUIRE_API_KEY` מחוץ המסלולים פתוחים.
- `POST /api/a2a/tasks` דורש בנוסף `OMNIROUTE_API_KEY` בכותרת `Authorization` כאשר המשתנה הזה מוגדר ו- `REQUIRE_API_KEY` כבוי. כותרות אחרות, כגון `x-api-key`, אינן נחשבות שם. עם כיבוי כניסה או לפני הכניסה, המפתח עובר עם או בלי קידומת `Bearer` ; עם התחברות, רק `Bearer <key>` עובר את תוכנת האמצע.

כאשר נדרש אישור, אסימון `read` -scope `oma_` עובד רק עבור `GET`.

**משלחת מנצח נכנס (`POST /api/a2a/tasks`):** סוכני A2A חיצוניים מאצילים עבודת קידוד לצי OmniConductor דרך OmniRoute. גוף: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — רק כישורי צי המנצח (אלה שהוכרזו בכרטיס הסוכן) ניתנים להאצלה; נדרש `metadata.conductor.repo.url` (הצי עובד על git repos). המסלול מתורגם ל- `POST /v1/tasks` של הרכזת באמצעות `CONDUCTOR_ORCHESTRATOR_TOKEN` בצד השרת (fallback `CONDUCTOR_HUB_TOKEN`) ומחזיר `201 { conductor_task_id, state: "submitted" }`; מצבי משימה זורמים בחזרה דרך המראה של SSE→A2A (RF1) והם גלויים דרך `GET /api/a2a/tasks?skill=conductor`.

---

## הוספת מיומנות חדשה

1. **צור קובץ מיומנות:** `src/lib/a2a/skills/<your-skill>.ts`

   ייצא פונקציית אסינכרון `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. עקוב אחר הצורה של מיומנויות קיימות כגון `smartRouting.ts`. אם המיומנות מתקשרת חזרה ל- OmniRoute על HTTP, בנה את הכותרות עם `buildSelfLoopHeaders(caller)` מ- `src/lib/a2a/selfLoopAuth.ts` כך שהקריאה תרוץ עם המפתח של ה- A2A המתקשר, לא `OMNIROUTE_API_KEY`, והעביר `redirect: "error"` ל- `fetch` כך שהפניה לא תקבל את המפתח. העוזר בונה רק כותרות; כל מיומנות קובעת את מדיניות ההפניה מחדש בעצמה. הוא זורק `UnsafeSelfLoopTargetError` במקום לצרף מפתח כאשר ה- URL הבסיסי שנפתר הוא http רגיל מחוץ לרשת הפרטית (לולאהבק, שם קונטיינר או שירות וכתובות פרטיות בסדר) או מחזיק באישורים, כך שמיומנות שבולעת שיחות שנדחו חייבת להחזיר את השגיאה הזו.

2. **מטפל ברישום:** ב- `src/lib/a2a/taskExecution.ts`, הוסף ערך ל- `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **חשיפה בכרטיס סוכן:** ב- `src/lib/a2a/agentCardMetadata.ts` (משותף ל- `/.well-known/agent.json` ו- `/.well-known/agent-card.json`), הוסף למערך `skills` :

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **כתוב מבחנים:** `tests/unit/a2a-<your-skill>.test.ts`. לכסות את נתיב השגיאה +.

5. **מִסְמָך** המיומנות החדשה בטבלת `Available Skills` של קובץ זה.

---

## זמן חיות של משימה (TTL)

תוקף המשימות פג לאחר `ttlMinutes` (ברירת המחדל היא 5 דקות) — מוגדר בבנאי `A2ATaskManager` שבקובץ `src/lib/a2a/taskManager.ts:82`. להתאמה אישית, צרו פיצול של יצירת המופע `A2ATaskManager` והעבירו ערך אחר (למשל, `new A2ATaskManager(15)` עבור TTL של 15 דקות). תהליך רקע סורק משימות שתוקפן פג מדי 60 שניות.

---

## מחזור חיי משימה

```
הוגשה → בעבודה → הושלמה
                 → נכשלה
                 → בוטלה
```

- תוקף המשימות פג לאחר 5 דקות כברירת מחדל (ראו [זמן חיות של משימה (TTL)](#task-ttl))
- מצבים סופיים: `completed`, `failed`, `cancelled`
- יומן האירועים עוקב אחר כל מעבר בין מצבים

---

## קודי שגיאה

| קוד    | משמעות                     |
| :----- | :------------------------- |
| -32700 | שגיאת ניתוח (JSON לא תקין) |
| -32600 | בקשה לא תקינה / ללא הרשאה  |
| -32601 | השיטה או המיומנות לא נמצאו |
| -32602 | פרמטרים לא תקינים          |
| -32603 | שגיאה פנימית               |
| -32000 | נקודת הקצה של A2A מושבתת   |

---

## דוגמאות אינטגרציה

### פייתון (בקשות)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (להביא)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
