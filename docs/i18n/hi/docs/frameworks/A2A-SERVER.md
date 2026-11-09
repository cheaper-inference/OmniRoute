# OmniRoute A2A Server Documentation (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — एक बुद्धिमान रूटिंग एजेंट के रूप में OmniRoute

A2A इंटरफ़ेस के दो रूप हैं:

- **JSON-RPC 2.0** के लिए `POST /a2a` (मानक प्रवेश बिंदु, जिसे `src/app/a2a/route.ts` में परिभाषित किया गया है)।
- डैशबोर्ड और टूलिंग (स्थिति, कार्य सूची, रद्दीकरण) के लिए `/api/a2a/*` के अंतर्गत **REST**।

कार्यों को `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, डिफ़ॉल्ट 5-मिनट TTL) द्वारा ट्रैक किया जाता है। कौशलों को `src/lib/a2a/taskExecution.ts` में मौजूद `A2A_SKILL_HANDLERS` के माध्यम से डिस्पैच किया जाता है।

## एजेंट खोज

```bash
curl http://localhost:20128/.well-known/agent.json
```

यह OmniRoute की क्षमताओं, कौशलों और प्रमाणीकरण आवश्यकताओं का वर्णन करने वाला Agent Card लौटाता है।

Agent Card का `version` फ़ील्ड `process.env.npm_package_version` से प्राप्त होता है (`src/app/.well-known/agent.json/route.ts:13` देखें), इसलिए यह प्रत्येक रिलीज़ पर `package.json` के साथ स्वतः सिंक्रनाइज़ रहता है।

---

## प्रमाणीकरण

सभी `/a2a` अनुरोधों के लिए `Authorization` हेडर के माध्यम से API कुंजी आवश्यक है:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

यदि सर्वर पर कोई API कुंजी कॉन्फ़िगर नहीं की गई है, तो प्रमाणीकरण को बायपास कर दिया जाता है।

## सक्षमीकरण

A2A को **Endpoints → A2A** टॉगल द्वारा नियंत्रित किया जाता है और यह डिफ़ॉल्ट रूप से अक्षम रहता है। अक्षम होने पर,
`GET /api/a2a/status`, `status: "disabled"` और `online: false` रिपोर्ट करता है; `POST /a2a` पर JSON-RPC कॉल
JSON-RPC त्रुटि कोड `-32000` के साथ HTTP 503 लौटाती हैं।

---

## JSON-RPC 2.0 विधियाँ

### `message/send` — समकालिक निष्पादन

किसी स्किल को संदेश भेजता है और पूर्ण प्रतिक्रिया की प्रतीक्षा करता है।

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

`smart-routing` के लिए, `metadata.combo` गेटवे अनुरोध में
`metadata.model` को स्पष्ट रूप से ओवरराइड करता है; इसे वास्तविक `model` के रूप में भेजा जाता है,
न कि उपेक्षित `x-combo` JSON फ़ील्ड के रूप में। गेटवे की सामान्य API-कुंजी और
प्रति-लक्ष्य प्राधिकरण नीति अभी भी लागू होती है। अमान्य या खाली कॉम्बो अस्वीकार कर दिया जाता है।

परिणाम `requested_combo` (कॉलर की मंशा), `dispatched_model`
(वास्तविक गेटवे अनुरोध), `response_model` (गेटवे प्रतिक्रिया) और
`confirmed_combo` को प्रदर्शित करता है। अंतिम फ़ील्ड तब तक `null` रहता है, जब तक गेटवे स्पष्ट रूप से
किसी कॉम्बो की पहचान न करे। A2A निर्णय लॉग निष्पादन का श्रेय केवल
पुष्ट कॉम्बो को देते हैं और अपुष्ट अनुरोध को `requestedCombo` के रूप में बनाए रखते हैं।

**प्रतिक्रिया:**

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

### `message/stream` — SSE स्ट्रीमिंग

यह `message/send` के समान है, लेकिन रीयल-टाइम स्ट्रीमिंग के लिए Server-Sent Events लौटाता है।

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

**SSE इवेंट:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — टास्क की स्थिति पूछें

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — टास्क रद्द करें

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## उपलब्ध कौशल

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` में जुड़े 6 A2A कौशल को उजागर करता है। प्रत्येक कौशल मॉड्यूल `src/lib/a2a/skills/` में रहता है।

| कौशल                   | ID                   | विवरण                                                                                                                                                           | टैग                | उदाहरण                                                 |
| :--------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------- | :----------------------------------------------------- |
| स्मार्ट रूटिंग         | `smart-routing`      | OmniRoute के कॉम्बो इंजन + स्कोरिंग का उपयोग करके इष्टतम provider/combo के माध्यम से एक संकेत रूट करता है                                                       | रूटिंग, प्रदाता    | "इस प्रॉम्प्ट को सर्वोत्तम मॉडल के माध्यम से रूट करें" |
| कोटा प्रबंधन           | `quota-management`   | प्रति-प्रदाता कोटा स्थिति की रिपोर्ट, कॉल करने वालों को यह तय करने में मदद करती है कि throttle/switch कब करना है                                                | कोटा, प्रदाता      | "एंथ्रोपिक के लिए कोटा जांचें"                         |
| प्रदाता खोज            | `provider-discovery` | क्षमताओं, फ्री-टियर फ़्लैग, OAuth स्थिति के साथ स्थापित प्रदाताओं की सूची                                                                                       | प्रदाता, खोज       | "कौन से प्रदाता उपलब्ध हैं?"                           |
| लागत विश्लेषण          | `cost-analysis`      | कैटलॉग + हालिया उपयोग को देखते हुए request/conversation की लागत का अनुमान लगाया गया है                                                                          | लागत, उपयोग        | "इस बातचीत की अनुमानित लागत"                           |
| स्वास्थ्य रपट          | `health-report`      | प्रति प्रदाता सर्किट ब्रेकर, कूलडाउन, लॉकआउट स्थिति को एकत्रित करता है                                                                                          | स्वास्थ्य, लचीलापन | "सभी प्रदाताओं की स्वास्थ्य स्थिति दिखाएं"             |
| क्षमताओं की सूची बनाएं | `list-capabilities`  | संदर्भ इंजेक्शन के लिए कच्चे SKILL.md URLs के साथ मार्कडाउन तालिका के रूप में पूर्ण 45-प्रविष्टि एजेंट कौशल कैटलॉग (23 API + 21 CLI + 1 कॉन्फ़िगरेशन) लौटाता है | कैटलॉग, खोज, कौशल  | "सभी OmniRoute क्षमताओं की सूची बनाएं"                 |

> एजेंट कार्ड को लाइव 385-प्रदाता कैटलॉग के साथ संरेखित रखा जाना चाहिए; प्रदाता गणना और free/no-auth मेटाडेटा रनटाइम रजिस्ट्री से प्राप्त किए जाते हैं।

### `list-capabilities` कौशल विवरण

`list-capabilities` कौशल विशेष रूप से बाहरी एजेंटों के लिए उपयोगी है जिन्हें API कॉल भेजने से पहले यह पता लगाना होता है कि OmniRoute क्या उजागर करता है। यह एक संरचित मार्कडाउन तालिका आर्टिफैक्ट लौटाता है:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

प्रत्येक पंक्ति में `rawUrl` कॉलम शामिल होता है ताकि एजेंट तुरंत पूरा SKILL.md प्राप्त कर सकें। `metadata.totalSkills` फ़ील्ड कैटलॉग आकार (आज 45) को प्रतिबिंबित करता है। कार्यान्वयन: `src/lib/a2a/skills/listCapabilities.ts`। यह भी देखें [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (सहायक)

JSON-RPC समापन बिंदु `/a2a` विहित A2A प्रविष्टि बिंदु है। नीचे दिए गए REST एंडपॉइंट डैशबोर्ड और बाहरी टूलींग के लिए सहायक पहुंच प्रदान करते हैं:

| endpoint                     | तरीका | विवरण                                                            | प्रमाणीकरण                                                                                              |
| :--------------------------- | :---- | :--------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| `/api/a2a/status`            | GET   | सर्वर स्थिति, पंजीकृत कौशल                                       | (जनता)                                                                                                  |
| `/api/a2a/tasks`             | GET   | फ़िल्टर के साथ कार्यों की सूची बनाएं                             | प्रबंधन या API कुंजी (नीचे देखें)                                                                       |
| `/api/a2a/tasks/[id]`        | GET   | ID द्वारा कार्य प्राप्त करें                                     | प्रबंधन या API कुंजी (नीचे देखें)                                                                       |
| `/api/a2a/tasks/[id]/cancel` | POST  | चल रहा कार्य रद्द करें                                           | प्रबंधन या API कुंजी (नीचे देखें)                                                                       |
| `/.well-known/agent.json`    | GET   | एजेंट कार्ड (A2A डिस्कवरी)                                       | (सार्वजनिक, कैश्ड 3600)                                                                                 |
| `/api/a2a/tasks`             | POST  | OmniConductor बेड़े में आने वाला प्रतिनिधिमंडल (कंडक्टर PRD RF5) | `GET` के समान, प्लस `OMNIROUTE_API_KEY` यदि `REQUIRE_API_KEY` बंद होने पर सेट किया गया हो; `a2aEnabled` |

`/api/a2a/tasks*` मार्गों तक कौन पहुंचता है यह लॉगिन और एपीआई-कुंजी सेटिंग्स पर निर्भर करता है:

- `requireLogin=true` (डिफ़ॉल्ट): मिडलवेयर केवल प्रबंधन क्रेडेंशियल्स (डैशबोर्ड सत्र, `manage` -scope API कुंजी, `oma_` एक्सेस टोकन) और `OMNIROUTE_API_KEY` को स्वीकार करता है। एक सादा अनुमान कुंजी `403` प्राप्त करती है। `Authorization` हेडर में मिडलवेयर केवल `OMNIROUTE_API_KEY` `Bearer <key>` के रूप में लेता है; `Bearer` के बाद एक खाली कुंजी या टैब `401` हो जाता है।
- `requireLogin=false`, या ऑनबोर्डिंग से पहले लूपबैक विंडो: `REQUIRE_API_KEY=true` के साथ कोई भी वैध OmniRoute API कुंजी या प्रबंधन क्रेडेंशियल स्वीकार किया जाता है और गुमनाम कॉल करने वालों को `401` मिलता है; `REQUIRE_API_KEY` बंद होने से मार्ग खुले हैं।
- `POST /api/a2a/tasks` अतिरिक्त रूप से `Authorization` हेडर में `OMNIROUTE_API_KEY` आवश्यकता होती है जब वह वेरिएबल सेट होता है और `REQUIRE_API_KEY` बंद होता है। अन्य शीर्षलेख, जैसे `x-api-key`, वहां नहीं गिने जाते। लॉगिन बंद होने पर या ऑनबोर्डिंग से पहले कुंजी `Bearer` उपसर्ग के साथ या उसके बिना गुजरती है; लॉगिन करने पर, केवल `Bearer <key>` ही मिडलवेयर से आगे निकल पाता है।

जहां एक क्रेडेंशियल की आवश्यकता होती है, एक `read` -scope `oma_` टोकन केवल `GET` के लिए काम करता है।

**इनबाउंड कंडक्टर डेलिगेशन (`POST /api/a2a/tasks`):** बाहरी A2A एजेंट OmniRoute के माध्यम से OmniConductor बेड़े को कोडिंग कार्य सौंपते हैं। मुख्य भाग: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — केवल कंडक्टर बेड़े कौशल (एजेंट कार्ड पर घोषित) प्रत्यायोजित हैं; `metadata.conductor.repo.url` आवश्यक है (बेड़ा git रेपो पर काम करता है)। रूट सर्वर-साइड `CONDUCTOR_ORCHESTRATOR_TOKEN` (फ़ॉलबैक `CONDUCTOR_HUB_TOKEN`) का उपयोग करके हब के `POST /v1/tasks` में अनुवाद करता है और `201 { conductor_task_id, state: "submitted" }` लौटाता है; कार्य स्थितियाँ SSE→A2A दर्पण (RF1) के माध्यम से वापस प्रवाहित होती हैं और `GET /api/a2a/tasks?skill=conductor` के माध्यम से दृश्यमान होती हैं।

---

## एक नया कौशल जोड़ना

1. **कौशल फ़ाइल बनाएँ:** `src/lib/a2a/skills/<your-skill>.ts`

   एक async फ़ंक्शन `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>` निर्यात करें। मौजूदा कौशल जैसे `smartRouting.ts` के आकार का पालन करें। यदि कौशल HTTP पर OmniRoute में वापस कॉल करता है, तो `src/lib/a2a/selfLoopAuth.ts` से `buildSelfLoopHeaders(caller)` के साथ हेडर बनाएं ताकि कॉल A2A कॉलर की कुंजी के साथ चले, `OMNIROUTE_API_KEY` नहीं, और `redirect: "error"` को `fetch` में पास करें ताकि रीडायरेक्ट को कभी भी कुंजी न मिले। सहायक केवल हेडर बनाता है; प्रत्येक कौशल पुनर्निर्देशन नीति स्वयं निर्धारित करता है। जब हल किया गया आधार URL निजी नेटवर्क (लूपबैक, एक कंटेनर या सेवा का नाम, और निजी पते ठीक हैं) के बाहर सादा http है या क्रेडेंशियल रखता है, तो यह एक कुंजी संलग्न करने के बजाय `UnsafeSelfLoopTargetError` फेंकता है, इसलिए एक कौशल जो अस्वीकृत कॉल को निगलता है उसे उस त्रुटि को फिर से निकालना होगा।

2. **रजिस्टर हैंडलर:** `src/lib/a2a/taskExecution.ts` में, `A2A_SKILL_HANDLERS` में एक प्रविष्टि जोड़ें:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **एजेंट कार्ड में खुलासा:** `src/lib/a2a/agentCardMetadata.ts` में ( `/.well-known/agent.json` और `/.well-known/agent-card.json` द्वारा साझा), `skills` सरणी में जोड़ें:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **परीक्षण लिखें:** `tests/unit/a2a-<your-skill>.test.ts`. खुश पथ + त्रुटि पथ को कवर करें।

5. **दस्तावेज़** इस फ़ाइल की `Available Skills` तालिका में नया कौशल।

---

## टास्क TTL

टास्क `ttlMinutes` (डिफ़ॉल्ट 5 मिनट) के बाद समाप्त हो जाते हैं — इसे `src/lib/a2a/taskManager.ts:82` पर `A2ATaskManager` कंस्ट्रक्टर में कॉन्फ़िगर किया गया है। इसे अनुकूलित करने के लिए, `A2ATaskManager` इंस्टैंशिएशन को फ़ोर्क करें और कोई अलग मान पास करें (उदाहरण के लिए, 15-मिनट के TTL हेतु `new A2ATaskManager(15)`)। एक बैकग्राउंड इंटरवल हर 60 सेकंड में समाप्त हो चुके टास्क हटाता है।

---

## टास्क जीवनचक्र

```
सबमिट किया गया → कार्यरत → पूर्ण
                        → विफल
                        → रद्द
```

- डिफ़ॉल्ट रूप से टास्क 5 मिनट बाद समाप्त हो जाते हैं ([टास्क TTL](#task-ttl) देखें)
- टर्मिनल स्थितियाँ: `completed`, `failed`, `cancelled`
- इवेंट लॉग प्रत्येक स्थिति परिवर्तन को ट्रैक करता है

---

## त्रुटि कोड

| कोड    | अर्थ                       |
| :----- | :------------------------- |
| -32700 | पार्स त्रुटि (अमान्य JSON) |
| -32600 | अमान्य अनुरोध / अनधिकृत    |
| -32601 | मेथड या स्किल नहीं मिली    |
| -32602 | अमान्य पैरामीटर            |
| -32603 | आंतरिक त्रुटि              |
| -32000 | A2A एंडपॉइंट अक्षम है      |

---

## एकीकरण उदाहरण

### पायथन (अनुरोध)

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

### TypeScript (लाएँ)

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
