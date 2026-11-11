# OmniRoute A2A Server Documentation (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — बुद्धिमान रूटिंग एजंट म्हणून OmniRoute

A2A पृष्ठभागाचे दोन भाग आहेत:

- **JSON-RPC 2.0** येथे: `POST /a2a` (अधिकृत प्रवेशबिंदू, `src/app/a2a/route.ts` मध्ये परिभाषित).
- डॅशबोर्ड आणि साधनांसाठी `/api/a2a/*` अंतर्गत **REST** (स्थिती, कार्य सूची, रद्द करणे).

कार्यांचा मागोवा `A2ATaskManager` द्वारे घेतला जातो (`src/lib/a2a/taskManager.ts`, डीफॉल्ट 5-मिनिटांची TTL). कौशल्ये `src/lib/a2a/taskExecution.ts` मधील `A2A_SKILL_HANDLERS` द्वारे पाठवली जातात.

## एजंट शोध

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute च्या क्षमता, कौशल्ये आणि प्रमाणीकरण आवश्यकता यांचे वर्णन करणारे Agent Card परत करते.

Agent Card मधील `version` फील्ड `process.env.npm_package_version` मधून घेतले जाते (`src/app/.well-known/agent.json/route.ts:13` पहा), त्यामुळे प्रत्येक प्रकाशनावेळी ते `package.json` सोबत आपोआप समक्रमित राहते.

---

## प्रमाणीकरण

सर्व `/a2a` विनंत्यांसाठी `Authorization` हेडरद्वारे API की आवश्यक आहे:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

सर्व्हरवर कोणतीही API की कॉन्फिगर केलेली नसल्यास प्रमाणीकरण वगळले जाते.

## सक्षम करणे

A2A हे **Endpoints → A2A** टॉगलद्वारे नियंत्रित केले जाते आणि डीफॉल्टनुसार अक्षम असते. अक्षम असताना,
`GET /api/a2a/status` हे `status: "disabled"` आणि `online: false` नोंदवते; `POST /a2a` वरील JSON-RPC कॉल
JSON-RPC त्रुटी कोड `-32000` सह HTTP 503 परत करतात.

---

## JSON-RPC 2.0 पद्धती

### `message/send` — समकालिक अंमलबजावणी

कौशल्याला संदेश पाठवते आणि संपूर्ण प्रतिसादाची प्रतीक्षा करते.

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

`smart-routing` साठी, गेटवे विनंतीकरिता `metadata.combo` हे
`metadata.model` चे स्पष्ट अधिलिखित मूल्य आहे; दुर्लक्षित `x-combo` JSON फील्ड म्हणून नव्हे, तर प्रत्यक्ष `model` म्हणून ते पाठवले जाते.
गेटवेची नेहमीची API-की आणि प्रत्येक लक्ष्यावरील अधिकृतता तरीही लागू होते. अवैध किंवा रिक्त कॉम्बो नाकारला जातो.

निकालामध्ये `requested_combo` (कॉलरचा उद्देश), `dispatched_model`
(प्रत्यक्ष गेटवे विनंती), `response_model` (गेटवे प्रतिसाद) आणि
`confirmed_combo` उपलब्ध होतात. गेटवेने कॉम्बो स्पष्टपणे ओळखल्याशिवाय शेवटचे फील्ड `null` असते.
A2A निर्णय लॉग अंमलबजावणीचे श्रेय केवळ पुष्टी केलेल्या कॉम्बोलाच देतात आणि पुष्टी न केलेली विनंती `requestedCombo` म्हणून जतन करतात.

**प्रतिसाद:**

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

### `message/stream` — SSE प्रवाह

`message/send` प्रमाणेच, परंतु रिअल-टाइम प्रवाहासाठी Server-Sent Events परत करते.

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

**SSE इव्हेंट्स:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — कार्याची स्थिती तपासा

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — कार्य रद्द करा

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## उपलब्ध कौशल्ये

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` मध्ये वायर्ड असलेली 6 A2A कौशल्ये उघड करते. प्रत्येक कौशल्य मॉड्यूल `src/lib/a2a/skills/` मध्ये राहतो.

| कौशल्य             | ID                   | वर्णन                                                                                                                                          | टॅग्ज                | उदाहरणे                                        |
| :----------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- | :--------------------------------------------- |
| स्मार्ट राउटिंग    | `smart-routing`      | OmniRoute चे कॉम्बो इंजिन + स्कोअरिंग वापरून इष्टतम provider/combo द्वारे प्रॉम्प्टला रूट करते                                                 | राउटिंग, प्रदाते     | "सर्वोत्तम मॉडेलद्वारे या प्रॉम्प्टला रूट करा" |
| कोटा व्यवस्थापन    | `quota-management`   | प्रति-प्रदाता कोटा स्थितीचा अहवाल, कॉलरला throttle/switch कधी करायचे हे ठरविण्यात मदत करते                                                     | कोटा, प्रदाते        | "मानवशास्त्रासाठी कोटा तपासा"                  |
| प्रदाता शोध        | `provider-discovery` | क्षमता, मुक्त-स्तरीय ध्वज, OAuth स्थिती असलेले स्थापित प्रदाते सूचीबद्ध करतात                                                                  | प्रदाता, शोध         | "कोणते प्रदाता उपलब्ध आहेत?"                   |
| खर्च विश्लेषण      | `cost-analysis`      | + अलीकडील वापराच्या कॅटलॉगनुसार request/conversation ची अंदाजे किंमत                                                                           | खर्च, वापर           | "या संभाषणासाठी अंदाजे खर्च"                   |
| आरोग्य अहवाल       | `health-report`      | प्रति प्रदाता एकत्रित सर्किट ब्रेकर, कूलडाउन, लॉकआउट स्थिती                                                                                    | आरोग्य, लवचिकता      | "सर्व प्रदात्यांचे आरोग्य स्थिती दर्शवा"       |
| क्षमतांची यादी करा | `list-capabilities`  | संदर्भ इंजेक्शनसाठी रॉ SKILL.md URLs सह मार्कडाउन टेबल म्हणून संपूर्ण 45-एंट्री एजंट स्किल्स कॅटलॉग (23 API + 21 CLI + 1 कॉन्फिगरेशन) परत करते | कॅटलॉग, शोध, कौशल्ये | "सर्व OmniRoute क्षमतांची यादी करा"            |

> एजंट कार्ड थेट 388-प्रदाता कॅटलॉगसह संरेखित ठेवले पाहिजे; प्रदाता संख्या आणि free/no-auth मेटाडेटा रनटाइम रेजिस्ट्रीमधून प्राप्त केला जातो.

### `list-capabilities` कौशल्य तपशील

`list-capabilities` कौशल्य विशेषतः बाह्य एजंटसाठी उपयुक्त आहे ज्यांना API कॉल पाठवण्यापूर्वी OmniRoute काय उघड करते हे शोधणे आवश्यक आहे. हे संरचित मार्कडाउन टेबल आर्टिफॅक्ट परत करते:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

प्रत्येक पंक्तीमध्ये `rawUrl` स्तंभ समाविष्ट असतो त्यामुळे एजंट ताबडतोब पूर्ण SKILL.md आणू शकतात. `metadata.totalSkills` फील्ड कॅटलॉग आकार (45 आज) प्रतिबिंबित करते. अंमलबजावणी: `src/lib/a2a/skills/listCapabilities.ts`. [AGENT-SKILLS.md](./AGENT-SKILLS.md) देखील पहा.

---

## REST API (सहायक)

JSON-RPC एंडपॉइंट `/a2a` हा कॅनॉनिकल A2A एंट्री पॉइंट आहे. खाली दिलेले REST एंडपॉइंट्स डॅशबोर्ड आणि बाह्य टूलिंगसाठी सहाय्यक प्रवेश प्रदान करतात:

| शेवटचा बिंदू                 | पद्धत | वर्णन                                                    | प्रमाण                                                                                           |
| :--------------------------- | :---- | :------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET   | सर्व्हर स्थिती, नोंदणीकृत कौशल्ये                        | (सार्वजनिक)                                                                                      |
| `/api/a2a/tasks`             | GET   | फिल्टरसह कार्यांची यादी करा                              | व्यवस्थापन किंवा API की (खाली पहा)                                                               |
| `/api/a2a/tasks/[id]`        | GET   | ID द्वारे कार्य मिळवा                                    | व्यवस्थापन किंवा API की (खाली पहा)                                                               |
| `/api/a2a/tasks/[id]/cancel` | POST  | चालू असलेले कार्य रद्द करा                               | व्यवस्थापन किंवा API की (खाली पहा)                                                               |
| `/.well-known/agent.json`    | GET   | एजंट कार्ड (A2A शोध)                                     | (सार्वजनिक, कॅशे केलेले 3600)                                                                    |
| `/api/a2a/tasks`             | POST  | OmniConductor फ्लीटला येणारे शिष्टमंडळ (कंडक्टर PRD RF5) | `GET` प्रमाणेच, `REQUIRE_API_KEY` बंद असताना सेट केल्यास अधिक `OMNIROUTE_API_KEY` ; `a2aEnabled` |

`/api/a2a/tasks*` मार्गांवर कोण पोहोचेल हे लॉगिन आणि API-की सेटिंग्जवर अवलंबून आहे:

- `requireLogin=true` (डिफॉल्ट): मिडलवेअर फक्त व्यवस्थापन क्रेडेन्शियल्स (डॅशबोर्ड सत्र, `manage` -scope API की, `oma_` प्रवेश टोकन) आणि `OMNIROUTE_API_KEY` स्वीकारतो. साध्या अनुमान की ला `403` मिळते. `Authorization` हेडरमध्ये मिडलवेअर फक्त `OMNIROUTE_API_KEY` `Bearer <key>` म्हणून घेते; `Bearer` ला `401` मिळाल्यानंतर एक बेअर की किंवा टॅब.
- `requireLogin=false`, किंवा ऑनबोर्डिंग करण्यापूर्वी लूपबॅक विंडो: `REQUIRE_API_KEY=true` सह कोणतीही वैध OmniRoute API की किंवा व्यवस्थापन क्रेडेन्शियल स्वीकारले जाते आणि निनावी कॉलरना `401` मिळते; `REQUIRE_API_KEY` बंद असल्याने मार्ग खुले आहेत.
- `POST /api/a2a/tasks` `Authorization` हेडरमध्ये `OMNIROUTE_API_KEY` आवश्यकता असते जेव्हा ते व्हेरिएबल सेट केले जाते आणि `REQUIRE_API_KEY` बंद असते. इतर शीर्षलेख, जसे की `x-api-key`, तेथे मोजले जात नाहीत. लॉगिन ऑफ किंवा ऑनबोर्डिंग करण्यापूर्वी की `Bearer` उपसर्गासह किंवा त्याशिवाय पास होते; लॉग इन केल्यावर, फक्त `Bearer <key>` मिडलवेअरच्या पुढे जाईल.

जेथे क्रेडेन्शियल आवश्यक आहे, तेथे `read` -scope `oma_` टोकन फक्त `GET` साठी कार्य करते.

**इनबाउंड कंडक्टर डेलिगेशन (`POST /api/a2a/tasks`):** बाह्य A2A एजंट OmniRoute द्वारे OmniConductor फ्लीटला कोडिंग कार्य सोपवतात. मुख्य भाग: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — फक्त कंडक्टर फ्लीट कौशल्ये (एजंट कार्डवर घोषित केलेली) सुपूर्द करण्यायोग्य आहेत; `metadata.conductor.repo.url` आवश्यक आहे (फ्लीट git repos वर कार्य करते). मार्ग सर्व्हर-साइड `CONDUCTOR_ORCHESTRATOR_TOKEN` (fallback `CONDUCTOR_HUB_TOKEN`) वापरून हबच्या `POST /v1/tasks` मध्ये अनुवादित करतो आणि `201 { conductor_task_id, state: "submitted" }` परत करतो; टास्क स्टेटस SSE→A2A मिरर (RF1) मधून परत येतात आणि `GET /api/a2a/tasks?skill=conductor` द्वारे दृश्यमान असतात.

---

## नवीन कौशल्य जोडणे

1. **कौशल्य फाइल तयार करा:** `src/lib/a2a/skills/<your-skill>.ts`

   async फंक्शन `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>` निर्यात करा. `smartRouting.ts` सारख्या विद्यमान कौशल्यांच्या आकाराचे अनुसरण करा. जर कौशल्याने HTTP वर OmniRoute मध्ये परत कॉल केले तर, हेडर `src/lib/a2a/selfLoopAuth.ts` वरून `buildSelfLoopHeaders(caller)` सह तयार करा जेणेकरून कॉल `OMNIROUTE_API_KEY` नाही तर A2A कॉलरच्या कीने चालेल आणि `fetch` कडे `redirect: "error"` पास करा जेणेकरून रीडायरेक्ट कधीही की मिळणार नाही. मदतनीस फक्त शीर्षलेख तयार करतो; प्रत्येक कौशल्य पुनर्निर्देशन धोरण स्वतः सेट करते. जेव्हा सोडवलेला बेस URL खाजगी नेटवर्कच्या बाहेर साधा http असतो (लूपबॅक, कंटेनर किंवा सेवेचे नाव आणि खाजगी पत्ते ठीक असतात) किंवा क्रेडेन्शियल्स धारण करतो तेव्हा की संलग्न करण्याऐवजी ते `UnsafeSelfLoopTargetError` फेकते, म्हणून नाकारलेले कॉल गिळणाऱ्या कौशल्याने ती त्रुटी पुन्हा फेकली पाहिजे.

2. **नोंदणी हँडलर:** `src/lib/a2a/taskExecution.ts` मध्ये, `A2A_SKILL_HANDLERS` मध्ये एंट्री जोडा:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **एजंट कार्डमध्ये उघड करा:** `src/lib/a2a/agentCardMetadata.ts` मध्ये ( `/.well-known/agent.json` आणि `/.well-known/agent-card.json` द्वारे सामायिक केलेले), `skills` ॲरेमध्ये संलग्न करा:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **चाचण्या लिहा:** `tests/unit/a2a-<your-skill>.test.ts` आनंदी मार्ग + त्रुटी मार्ग कव्हर करा.

5. **दस्तऐवज** या फाइलच्या `Available Skills` टेबलमधील नवीन कौशल्य.

---

## कार्याचा TTL

कार्ये `ttlMinutes` नंतर कालबाह्य होतात (डीफॉल्ट 5 मिनिटे) — हे `src/lib/a2a/taskManager.ts:82` येथे `A2ATaskManager` कन्स्ट्रक्टरमध्ये कॉन्फिगर केलेले आहे. सानुकूलित करण्यासाठी, `A2ATaskManager` इन्स्टन्सिएशन फोर्क करा आणि वेगळे मूल्य द्या (उदा., 15-मिनिटांच्या TTL साठी `new A2ATaskManager(15)`). पार्श्वभूमीतील इंटरव्हल दर 60 सेकंदांनी कालबाह्य झालेली कार्ये हटवतो.

---

## कार्याचे जीवनचक्र

```
सबमिट केले → प्रगतीपथावर → पूर्ण झाले
                          → अयशस्वी झाले
                          → रद्द झाले
```

- कार्ये डीफॉल्टनुसार 5 मिनिटांनंतर कालबाह्य होतात ([कार्याचा TTL](#task-ttl) पहा)
- अंतिम स्थिती: `completed`, `failed`, `cancelled`
- इव्हेंट लॉग प्रत्येक स्थितीतील संक्रमणाची नोंद ठेवतो

---

## त्रुटी कोड

| कोड    | अर्थ                           |
| :----- | :----------------------------- |
| -32700 | पार्स त्रुटी (अवैध JSON)       |
| -32600 | अवैध विनंती / अनधिकृत          |
| -32601 | पद्धत किंवा कौशल्य सापडले नाही |
| -32602 | अवैध पॅरामीटर्स                |
| -32603 | अंतर्गत त्रुटी                 |
| -32000 | A2A एंडपॉइंट अक्षम केला आहे    |

---

## एकत्रीकरण उदाहरणे

### पायथन (विनंती)

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

### TypeScript (आणणे)

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
