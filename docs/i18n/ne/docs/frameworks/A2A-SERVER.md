# OmniRoute A2A Server Documentation (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — एक बुद्धिमान राउटिङ एजेन्टको रूपमा OmniRoute

A2A सतहका दुई पक्ष छन्:

- **JSON-RPC 2.0** `POST /a2a` मा (प्रामाणिक प्रवेश बिन्दु, `src/app/a2a/route.ts` मा परिभाषित)।
- **REST** ड्यासबोर्ड र उपकरणहरूका लागि `/api/a2a/*` अन्तर्गत (स्थिति, कार्य सूची, रद्द गर्ने)।

कार्यहरू `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, पूर्वनिर्धारित ५-मिनेट TTL) द्वारा ट्र्याक गरिन्छन्। सीपहरू `src/lib/a2a/taskExecution.ts` मा रहेको `A2A_SKILL_HANDLERS` मार्फत डिस्प्याच गरिन्छन्।

## एजेन्ट अन्वेषण

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute का क्षमताहरू, स्किलहरू र प्रमाणीकरण आवश्यकताहरू वर्णन गर्ने Agent Card फर्काउँछ।

Agent Card को `version` फिल्ड `process.env.npm_package_version` बाट लिइन्छ (`src/app/.well-known/agent.json/route.ts:13` हेर्नुहोस्), त्यसैले यो प्रत्येक रिलिजमा `package.json` सँग स्वतः समक्रमित रहन्छ।

---

## प्रमाणीकरण

सबै `/a2a` अनुरोधहरूलाई `Authorization` हेडरमार्फत API कुञ्जी आवश्यक पर्छ:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

सर्भरमा कुनै API कुञ्जी कन्फिगर गरिएको छैन भने प्रमाणीकरण बाइपास गरिन्छ।

## सक्रियता

A2A लाई **Endpoints → A2A** टगलद्वारा नियन्त्रण गरिन्छ र यो पूर्वनिर्धारित रूपमा निष्क्रिय हुन्छ। निष्क्रिय हुँदा,
`GET /api/a2a/status` ले `status: "disabled"` र `online: false` रिपोर्ट गर्छ; `POST /a2a` मा गरिएका JSON-RPC कलहरूले
JSON-RPC त्रुटि कोड `-32000` सहित HTTP 503 फर्काउँछन्।

---

## JSON-RPC 2.0 विधिहरू

### `message/send` — समकालिक कार्यान्वयन

कुनै स्किलमा सन्देश पठाउँछ र पूर्ण प्रतिक्रियाको प्रतीक्षा गर्छ।

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

`smart-routing` का लागि, `metadata.combo` गेटवे अनुरोधमा `metadata.model` को स्पष्ट ओभरराइड हो; यसलाई बेवास्ता गरिएको `x-combo` JSON फिल्डका रूपमा नभई वास्तविक `model` का रूपमा पठाइन्छ। गेटवेको सामान्य API-key र प्रत्येक लक्ष्यानुसारको प्रमाणीकरण अझै पनि लागू हुन्छ। अमान्य वा खाली कम्बो अस्वीकार गरिन्छ।

नतिजाले `requested_combo` (कलरको अभिप्राय), `dispatched_model` (वास्तविक गेटवे अनुरोध), `response_model` (गेटवे प्रतिक्रिया) र `confirmed_combo` देखाउँछ। गेटवेले कुनै कम्बोलाई स्पष्ट रूपमा पहिचान नगरेसम्म अन्तिम फिल्ड `null` हुन्छ। A2A निर्णय लगहरूले कार्यान्वयनलाई पुष्टि गरिएको कम्बोसँग मात्र सम्बद्ध गर्छन् र पुष्टि नभएको अनुरोधलाई `requestedCombo` का रूपमा कायम राख्छन्।

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

### `message/stream` — SSE स्ट्रिमिङ

`message/send` जस्तै हो, तर वास्तविक-समय स्ट्रिमिङका लागि Server-Sent Events फर्काउँछ।

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

**SSE इभेन्टहरू:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — टास्कको स्थिति सोध्नुहोस्

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — टास्क रद्द गर्नुहोस्

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## उपलब्ध सीपहरू

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` मा तार भएको 6 A2A कौशलहरू उजागर गर्दछ। प्रत्येक कौशल मोड्युल `src/lib/a2a/skills/` मा रहन्छ।

| सीप               | ID                   | विवरण                                                                                                                                                                | ट्यागहरू          | उदाहरणहरू                                       |
| :---------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- | :---------------------------------------------- |
| स्मार्ट रूटिङ     | `smart-routing`      | OmniRoute को कम्बो इन्जिन + स्कोरिङ प्रयोग गरेर इष्टतम provider/combo मार्फत प्रम्प्टलाई रुट गर्दछ                                                                   | मार्ग, प्रदायकहरू | "उत्तम मोडेल मार्फत यो प्रम्प्ट रुट गर्नुहोस्"  |
| कोटा व्यवस्थापन   | `quota-management`   | प्रति-प्रदायक कोटा स्थिति रिपोर्ट गर्दछ, कलरहरूलाई कहिले throttle/switch गर्ने निर्णय गर्न मद्दत गर्दछ                                                               | कोटा, प्रदायकहरू  | "एन्थ्रोपिक कोटा जाँच गर्नुहोस्"                |
| प्रदायक खोज       | `provider-discovery` | क्षमताहरू, फ्री-टियर झण्डाहरू, OAuth स्थितिको साथ स्थापित प्रदायकहरू सूचीबद्ध गर्नुहोस्                                                                              | प्रदायक, खोज      | "कस्ता प्रदायकहरू उपलब्ध छन्?"                  |
| लागत विश्लेषण     | `cost-analysis`      | क्याटलग + भर्खरको प्रयोगको आधारमा request/conversation को अनुमानित लागत                                                                                              | लागत, उपयोग       | "यो कुराकानीको लागि अनुमानित लागत"              |
| स्वास्थ्य रिपोर्ट | `health-report`      | कुल सर्किट ब्रेकर, कूलडाउन, प्रति प्रदायक लकआउट स्थिति                                                                                                               | स्वास्थ्य, लचकता  | "सबै प्रदायकहरूको स्वास्थ्य स्थिति देखाउनुहोस्" |
| सूची क्षमताहरू    | `list-capabilities`  | कन्टेक्स्ट इन्जेक्सनको लागि कच्चा SKILL.md URLs सहितको मार्कडाउन तालिकाको रूपमा पूर्ण ४५-प्रविष्टि एजेन्ट स्किल्स क्याटलग (२३ API + 21 CLI + 1 कन्फिगरेसन) फर्काउँछ। | सूची, खोज, कौशल   | "सबै OmniRoute क्षमताहरू सूचीबद्ध गर्नुहोस्"    |

> एजेन्ट कार्डलाई प्रत्यक्ष 382-प्रदायक सूचीसँग पङ्क्तिबद्ध राख्नुपर्छ; प्रदायक गणना र free/no-auth मेटाडेटा रनटाइम रजिस्ट्रीबाट प्राप्त गरिन्छ।

### `list-capabilities` कौशल विवरण

`list-capabilities` सीप विशेष गरी बाह्य एजेन्टहरूका लागि उपयोगी छ जसले API कलहरू पठाउनु अघि OmniRoute के खुलासा गर्छ भनेर पत्ता लगाउन आवश्यक छ। यसले संरचित मार्कडाउन तालिका कलाकृति फर्काउँछ:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

प्रत्येक पङ्क्तिमा `rawUrl` स्तम्भ समावेश हुन्छ ताकि एजेन्टहरूले तुरुन्तै पूर्ण SKILL.md ल्याउन सक्छन्। `metadata.totalSkills` फिल्डले क्याटलग साइज (45 आज) लाई मिरर गर्छ। कार्यान्वयन: `src/lib/a2a/skills/listCapabilities.ts`। [AGENT-SKILLS.md](./AGENT-SKILLS.md) पनि हेर्नुहोस्।

---

## REST API (सहायक)

JSON-RPC अन्तिम बिन्दु `/a2a` क्यानोनिकल A2A प्रविष्टि बिन्दु हो। तलका REST अन्त्य बिन्दुहरूले ड्यासबोर्डहरू र बाह्य उपकरणहरूको लागि सहायक पहुँच प्रदान गर्दछ:

| अन्तिम बिन्दु                | विधि | विवरण                                                            | प्रमाण                                                                                           |
| :--------------------------- | :--- | :--------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET  | सर्भर स्थिति, दर्ता कौशल                                         | (सार्वजनिक)                                                                                      |
| `/api/a2a/tasks`             | GET  | फिल्टरहरूसँग कार्यहरू सूचीबद्ध गर्नुहोस्                         | व्यवस्थापन वा API कुञ्जी (तल हेर्नुहोस्)                                                         |
| `/api/a2a/tasks/[id]`        | GET  | ID द्वारा कार्य प्राप्त गर्नुहोस्                                | व्यवस्थापन वा API कुञ्जी (तल हेर्नुहोस्)                                                         |
| `/api/a2a/tasks/[id]/cancel` | POST | चलिरहेको कार्य रद्द गर्नुहोस्                                    | व्यवस्थापन वा API कुञ्जी (तल हेर्नुहोस्)                                                         |
| `/.well-known/agent.json`    | GET  | एजेन्ट कार्ड (A2A खोज)                                           | (सार्वजनिक, क्यास 3600s)                                                                         |
| `/api/a2a/tasks`             | POST | OmniConductor फ्लीटमा इनबाउन्ड प्रतिनिधिमण्डल (कन्डक्टर PRD RF5) | `GET` जस्तै, थप `OMNIROUTE_API_KEY` यदि `REQUIRE_API_KEY` बन्द हुँदा सेट गरियो भने; `a2aEnabled` |

`/api/a2a/tasks*` मार्गहरूमा कसले पुग्छ लगइन र API-कुञ्जी सेटिङहरूमा निर्भर गर्दछ:

- `requireLogin=true` (पूर्वनिर्धारित): मिडलवेयरले मात्र व्यवस्थापन प्रमाणहरू स्वीकार गर्दछ (ड्यासबोर्ड सत्र, `manage` -scope API कुञ्जी, `oma_` पहुँच टोकन) र `OMNIROUTE_API_KEY`। एक सादा अनुमान कुञ्जीले `403` प्राप्त गर्दछ। `Authorization` हेडरमा मिडलवेयरले `OMNIROUTE_API_KEY` `Bearer <key>` को रूपमा मात्र लिन्छ; `Bearer` ले `401` प्राप्त गरेपछि एउटा खाली कुञ्जी वा ट्याब।
- `requireLogin=false`, वा अनबोर्डिङ अघि लुपब्याक विन्डो: `REQUIRE_API_KEY=true` सँग कुनै पनि मान्य OmniRoute API कुञ्जी वा व्यवस्थापन प्रमाणहरू स्वीकार गरिन्छ र बेनामी कल गर्नेहरूले `401` प्राप्त गर्छन्; `REQUIRE_API_KEY` बन्द मार्गहरू खुला छन्।
- `POST /api/a2a/tasks` `Authorization` हेडरमा `OMNIROUTE_API_KEY` चाहिन्छ जब त्यो चर सेट हुन्छ र `REQUIRE_API_KEY` बन्द हुन्छ। अन्य हेडरहरू, जस्तै `x-api-key`, त्यहाँ गणना गर्दैन। लगइन अफ हुँदा वा अनबोर्डिङ अघि कुञ्जी `Bearer` उपसर्गको साथ वा बिना पास हुन्छ; लगइन अन गर्दा, `Bearer <key>` मात्र मिडलवेयरबाट बाहिर जान्छ।

जहाँ एक प्रमाण आवश्यक छ, `read` -scope `oma_` टोकनले `GET` को लागि मात्र काम गर्दछ।

**इनबाउन्ड कन्डक्टर प्रतिनिधिमण्डल (`POST /api/a2a/tasks`):** बाह्य A2A एजेन्टहरूले OmniRoute मार्फत OmniConductor फ्लीटमा कोडिङ कार्य प्रत्यायोजन गर्छन्। मुख्य भाग: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — मात्र कन्डक्टर फ्लीट सीपहरू (एजेन्ट कार्डमा घोषणा गरिएको) प्रतिनिधि योग्य छन्; `metadata.conductor.repo.url` आवश्यक छ (फ्लीट git repos मा काम गर्दछ)। मार्गले सर्भर-साइड `CONDUCTOR_ORCHESTRATOR_TOKEN` (fallback `CONDUCTOR_HUB_TOKEN`) प्रयोग गरेर हबको `POST /v1/tasks` मा अनुवाद गर्छ र `201 { conductor_task_id, state: "submitted" }` फर्काउँछ; कार्य अवस्थाहरू SSE→A2A मिरर (RF1) मार्फत फर्किन्छन् र `GET /api/a2a/tasks?skill=conductor` मार्फत देखिने छन्।

---

## नयाँ कौशल थप्दै

1. **कौशल फाइल सिर्जना गर्नुहोस्:** `src/lib/a2a/skills/<your-skill>.ts`

   async प्रकार्य `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>` निर्यात गर्नुहोस्। `smartRouting.ts` जस्ता अवस्थित कौशलहरूको आकार पछ्याउनुहोस्। यदि कौशलले HTTP मा OmniRoute मा फिर्ता कल गर्छ भने, हेडरहरू `src/lib/a2a/selfLoopAuth.ts` बाट `buildSelfLoopHeaders(caller)` बनाउनुहोस् ताकि कल `OMNIROUTE_API_KEY` होइन, A2A कलरको कुञ्जीले चल्छ, र `redirect: "error"` लाई `fetch` मा पास गर्नुहोस् ताकि रिडिरेक्टले कहिले पनि कुञ्जी प्राप्त गर्दैन। सहायकले हेडर मात्र बनाउँछ; प्रत्येक कौशलले पुनर्निर्देशित नीति आफै सेट गर्दछ। जब समाधान गरिएको आधार URL निजी नेटवर्क बाहिर सादा http हुन्छ (लूपब्याक, कन्टेनर वा सेवाको नाम, र निजी ठेगानाहरू ठीक छन्) वा प्रमाणहरू राख्छ भने यसले कुञ्जी संलग्न गर्नुको सट्टा `UnsafeSelfLoopTargetError` फ्याँक्छ, त्यसैले अस्वीकृत कलहरू निल्ने सीपले त्यो त्रुटिलाई पुन: थ्रु गर्नुपर्छ।

2. **दर्ता ह्यान्डलर:** `src/lib/a2a/taskExecution.ts` मा, `A2A_SKILL_HANDLERS` मा प्रविष्टि थप्नुहोस्:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **एजेन्ट कार्डमा खुलासा गर्नुहोस्:** `src/lib/a2a/agentCardMetadata.ts` मा ( `/.well-known/agent.json` र `/.well-known/agent-card.json` द्वारा साझा गरिएको), `skills` array मा जोड्नुहोस्:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **परीक्षणहरू लेख्नुहोस्:** `tests/unit/a2a-<your-skill>.test.ts` खुशी मार्ग + त्रुटि मार्ग कभर गर्नुहोस्।

5. **कागजात** यस फाइलको `Available Skills` तालिकामा नयाँ कौशल।

---

## कार्य TTL

कार्यहरूको म्याद `ttlMinutes` पछि समाप्त हुन्छ (पूर्वनिर्धारित 5 मिनेट) — यसलाई `src/lib/a2a/taskManager.ts:82` मा रहेको `A2ATaskManager` कन्स्ट्रक्टरमा कन्फिगर गरिएको छ। अनुकूलित गर्न, `A2ATaskManager` को इन्स्ट्यान्सिएसन फोर्क गर्नुहोस् र फरक मान पास गर्नुहोस् (उदाहरणका लागि, 15-मिनेटको TTL का लागि `new A2ATaskManager(15)`)। पृष्ठभूमिमा चल्ने इन्टरभलले प्रत्येक 60 सेकेन्डमा म्याद सकिएका कार्यहरू हटाउँछ।

---

## कार्यको जीवनचक्र

```
पेश गरिएको → कार्यरत → सम्पन्न
                    → असफल
                    → रद्द गरिएको
```

- कार्यहरूको म्याद पूर्वनिर्धारित रूपमा 5 मिनेटपछि समाप्त हुन्छ ([कार्य TTL](#task-ttl) हेर्नुहोस्)
- अन्तिम अवस्थाहरू: `completed`, `failed`, `cancelled`
- घटना लगले हरेक अवस्था परिवर्तन ट्र्याक गर्छ

---

## त्रुटि कोडहरू

| कोड    | अर्थ                       |
| :----- | :------------------------- |
| -32700 | पार्स त्रुटि (अमान्य JSON) |
| -32600 | अमान्य अनुरोध / अनधिकृत    |
| -32601 | विधि वा सीप फेला परेन      |
| -32602 | अमान्य प्यारामिटरहरू       |
| -32603 | आन्तरिक त्रुटि             |
| -32000 | A2A एन्डपोइन्ट निष्क्रिय छ |

---

## एकीकरण उदाहरणहरू

### पाइथन (अनुरोधहरू)

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

### TypeScript (फेच)

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
