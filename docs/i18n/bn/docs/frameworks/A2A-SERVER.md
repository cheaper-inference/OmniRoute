# OmniRoute A2A Server Documentation (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — একটি বুদ্ধিমান রাউটিং এজেন্ট হিসেবে OmniRoute

A2A সারফেসের দুটি দিক রয়েছে:

- **JSON-RPC 2.0** হলো `POST /a2a`-এ (প্রামাণ্য এন্ট্রি পয়েন্ট, `src/app/a2a/route.ts`-এ সংজ্ঞায়িত)।
- **REST** হলো ড্যাশবোর্ড ও টুলিংয়ের জন্য `/api/a2a/*`-এর অধীনে (স্ট্যাটাস, টাস্কের তালিকা, বাতিলকরণ)।

টাস্কগুলো `A2ATaskManager` দ্বারা ট্র্যাক করা হয় (`src/lib/a2a/taskManager.ts`, ডিফল্ট TTL ৫ মিনিট)। `src/lib/a2a/taskExecution.ts`-এর `A2A_SKILL_HANDLERS`-এর মাধ্যমে স্কিলগুলো ডিসপ্যাচ করা হয়।

## এজেন্ট আবিষ্কার

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute-এর সক্ষমতা, স্কিল এবং প্রমাণীকরণের প্রয়োজনীয়তা বর্ণনাকারী Agent Card ফেরত দেয়।

Agent Card-এর `version` ফিল্ডটি `process.env.npm_package_version` থেকে নেওয়া হয় (`src/app/.well-known/agent.json/route.ts:13` দেখুন), তাই প্রতিটি রিলিজে এটি `package.json`-এর সঙ্গে স্বয়ংক্রিয়ভাবে সিঙ্ক থাকে।

---

## প্রমাণীকরণ

সব `/a2a` অনুরোধের জন্য `Authorization` হেডারের মাধ্যমে একটি API কী প্রয়োজন:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

সার্ভারে কোনো API কী কনফিগার করা না থাকলে প্রমাণীকরণ এড়িয়ে যাওয়া হয়।

## সক্রিয়করণ

A2A **Endpoints → A2A** টগলের মাধ্যমে নিয়ন্ত্রিত হয় এবং ডিফল্টভাবে নিষ্ক্রিয় থাকে। নিষ্ক্রিয় থাকলে,
`GET /api/a2a/status` থেকে `status: "disabled"` এবং `online: false` রিপোর্ট করা হয়; `POST /a2a`-এ
JSON-RPC কলগুলো JSON-RPC ত্রুটি কোড `-32000`-সহ HTTP 503 ফেরত দেয়।

---

## JSON-RPC 2.0 মেথডসমূহ

### `message/send` — সিঙ্ক্রোনাস এক্সিকিউশন

কোনো স্কিলে একটি বার্তা পাঠায় এবং সম্পূর্ণ প্রতিক্রিয়ার জন্য অপেক্ষা করে।

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

`smart-routing`-এর ক্ষেত্রে, গেটওয়ে অনুরোধের জন্য `metadata.combo` হলো
`metadata.model`-এর একটি সুস্পষ্ট ওভাররাইড; এটি উপেক্ষিত `x-combo` JSON ফিল্ড হিসেবে নয়,
প্রকৃত `model` হিসেবে পাঠানো হয়। গেটওয়ের স্বাভাবিক API-কী এবং
লক্ষ্যভিত্তিক অনুমোদন এখনও প্রযোজ্য। কোনো অবৈধ বা খালি কম্বো প্রত্যাখ্যান করা হয়।

ফলাফলে `requested_combo` (কলকারীর অভিপ্রায়), `dispatched_model`
(প্রকৃত গেটওয়ে অনুরোধ), `response_model` (গেটওয়ে প্রতিক্রিয়া) এবং
`confirmed_combo` প্রকাশ করা হয়। গেটওয়ে স্পষ্টভাবে কোনো কম্বো শনাক্ত না করলে শেষ ফিল্ডটি `null`
থাকে। A2A সিদ্ধান্তের লগ কেবল নিশ্চিত করা কম্বোর সঙ্গেই এক্সিকিউশনকে সংযুক্ত করে এবং অনিশ্চিত অনুরোধকে `requestedCombo` হিসেবে ধরে রাখে।

**প্রতিক্রিয়া:**

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

### `message/stream` — SSE স্ট্রিমিং

`message/send`-এর মতোই, তবে রিয়েল-টাইম স্ট্রিমিংয়ের জন্য Server-Sent Events প্রদান করে।

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

**SSE ইভেন্টসমূহ:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — টাস্কের স্থিতি অনুসন্ধান

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — একটি টাস্ক বাতিল করা

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## উপলব্ধ দক্ষতা

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` তে তারযুক্ত 6 A2A দক্ষতা প্রকাশ করে। প্রতিটি দক্ষতা মডিউল `src/lib/a2a/skills/` তে থাকে।

| দক্ষতা              | ID                   | বর্ণনা                                                                                                                                                     | ট্যাগ                      | উদাহরণ                                       |
| :------------------ | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :------------------------------------------- |
| স্মার্ট রাউটিং      | `smart-routing`      | OmniRoute এর কম্বো ইঞ্জিন + স্কোরিং ব্যবহার করে সর্বোত্তম provider/combo এর মাধ্যমে একটি প্রম্পট রুট করে                                                   | রাউটিং, প্রদানকারী         | "সেরা মডেলের মাধ্যমে এই প্রম্পটটি রুট করুন"  |
| কোটা ব্যবস্থাপনা    | `quota-management`   | প্রতি-প্রোভাইডার কোটা স্টেট রিপোর্ট করে, কখন throttle/switch করতে হবে তা কলকারীদের সিদ্ধান্ত নিতে সাহায্য করে                                              | কোটা, প্রদানকারী           | "নৃবিজ্ঞানের জন্য কোটা পরীক্ষা করুন"         |
| প্রদানকারী আবিষ্কার | `provider-discovery` | সক্ষমতা, মুক্ত-স্তরের পতাকা, OAuth স্থিতি সহ ইনস্টল করা প্রদানকারীদের তালিকা করে                                                                           | প্রদানকারী, আবিষ্কার       | "কি প্রদানকারী পাওয়া যায়?"                 |
| খরচ বিশ্লেষণ        | `cost-analysis`      | ক্যাটালগ + সাম্প্রতিক ব্যবহার অনুযায়ী একটি request/conversation এর আনুমানিক খরচ                                                                           | খরচ, ব্যবহার               | "এই কথোপকথনের জন্য আনুমানিক খরচ"             |
| স্বাস্থ্য রিপোর্ট   | `health-report`      | সার্কিট ব্রেকার, কুলডাউন, প্রদানকারী প্রতি লকআউট অবস্থা                                                                                                    | স্বাস্থ্য, স্থিতিস্থাপকতা  | "সমস্ত প্রদানকারীর স্বাস্থ্যের অবস্থা দেখান" |
| তালিকা ক্ষমতা       | `list-capabilities`  | প্রসঙ্গ ইনজেকশনের জন্য কাঁচা SKILL.md URLs সহ একটি মার্কডাউন টেবিল হিসাবে সম্পূর্ণ 45-এন্ট্রি এজেন্ট দক্ষতা ক্যাটালগ (23 API + 21 CLI + 1 কনফিগ) ফেরত দেয় | ক্যাটালগ, আবিষ্কার, দক্ষতা | "সমস্ত OmniRoute ক্ষমতা তালিকাভুক্ত করুন"    |

> এজেন্ট কার্ডটি লাইভ 386-প্রোভাইডার ক্যাটালগের সাথে সারিবদ্ধ রাখা উচিত; প্রদানকারীর সংখ্যা এবং free/no-auth মেটাডেটা রানটাইম রেজিস্ট্রি থেকে নেওয়া হয়।

### `list-capabilities` দক্ষতা বিস্তারিত

`list-capabilities` দক্ষতা বিশেষত বহিরাগত এজেন্টদের জন্য উপযোগী যাদের API কল পাঠানোর আগে OmniRoute কী প্রকাশ করে তা আবিষ্কার করতে হবে। এটি একটি কাঠামোগত মার্কডাউন টেবিল আর্টিফ্যাক্ট প্রদান করে:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

প্রতিটি সারিতে `rawUrl` কলাম থাকে যাতে এজেন্টরা অবিলম্বে সম্পূর্ণ SKILL.md আনতে পারে। `metadata.totalSkills` ক্ষেত্রটি ক্যাটালগের আকারকে প্রতিফলিত করে (45 আজ)। বাস্তবায়ন: `src/lib/a2a/skills/listCapabilities.ts`। এছাড়াও [AGENT-SKILLS.md](./AGENT-SKILLS.md) দেখুন।

---

## REST API (সহায়ক)

JSON-RPC এন্ডপয়েন্ট `/a2a` হল ক্যানোনিকাল A2A এন্ট্রি পয়েন্ট। নীচের REST শেষ পয়েন্টগুলি ড্যাশবোর্ড এবং বাহ্যিক টুলিংয়ের জন্য সহায়ক অ্যাক্সেস প্রদান করে:

| শেষবিন্দু                    | পদ্ধতি | বর্ণনা                                                         | প্রমাণ                                                                                           |
| :--------------------------- | :----- | :------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET    | সার্ভারের অবস্থা, নিবন্ধিত দক্ষতা                              | (পাবলিক)                                                                                         |
| `/api/a2a/tasks`             | GET    | ফিল্টার সহ কাজের তালিকা করুন                                   | ব্যবস্থাপনা বা API কী (নীচে দেখুন)                                                               |
| `/api/a2a/tasks/[id]`        | GET    | ID দ্বারা কাজ পান                                              | ব্যবস্থাপনা বা API কী (নীচে দেখুন)                                                               |
| `/api/a2a/tasks/[id]/cancel` | POST   | চলমান টাস্ক বাতিল করুন                                         | ব্যবস্থাপনা বা API কী (নীচে দেখুন)                                                               |
| `/.well-known/agent.json`    | GET    | এজেন্ট কার্ড (A2A আবিষ্কার)                                    | (সর্বজনীন, ক্যাশে 3600s)                                                                         |
| `/api/a2a/tasks`             | POST   | OmniConductor বহরে অন্তর্মুখী প্রতিনিধি দল (কন্ডাক্টর PRD RF5) | same as `GET`, প্লাস `OMNIROUTE_API_KEY` সেট করা থাকলে `REQUIRE_API_KEY` বন্ধ থাকে; `a2aEnabled` |

কে `/api/a2a/tasks*` রুটে যায় তা নির্ভর করে লগইন এবং API-কী সেটিংসের উপর:

- `requireLogin=true` (ডিফল্ট): মিডলওয়্যার শুধুমাত্র ব্যবস্থাপনা শংসাপত্র (ড্যাশবোর্ড সেশন, `manage` -scope API কী, `oma_` অ্যাক্সেস টোকেন) এবং `OMNIROUTE_API_KEY` স্বীকার করে। একটি সাধারণ অনুমান কী `403` পায়। `Authorization` হেডারে মিডলওয়্যার শুধুমাত্র `OMNIROUTE_API_KEY` `Bearer <key>` হিসাবে নেয়; `Bearer` `401` পাওয়ার পর একটি বেয়ার কী বা একটি ট্যাব।
- `requireLogin=false`, অথবা অনবোর্ডিং করার আগে লুপব্যাক উইন্ডো: `REQUIRE_API_KEY=true` সাথে যেকোনো বৈধ OmniRoute API কী বা ম্যানেজমেন্ট শংসাপত্র গ্রহণ করা হয় এবং বেনামী কলকারীরা `401` পায়; সঙ্গে `REQUIRE_API_KEY` বন্ধ রুট খোলা আছে.
- `POST /api/a2a/tasks` অতিরিক্তভাবে `Authorization` হেডারে `OMNIROUTE_API_KEY` প্রয়োজন যখন সেই ভেরিয়েবল সেট করা থাকে এবং `REQUIRE_API_KEY` বন্ধ থাকে। অন্যান্য হেডার, যেমন `x-api-key`, সেখানে গণনা করা হয় না। লগইন অফ হলে বা অনবোর্ডিং করার আগে `Bearer` উপসর্গ সহ বা ছাড়াই কী পাস হয়; লগইন করার সাথে সাথে, শুধুমাত্র `Bearer <key>` মিডলওয়্যার অতিক্রম করে।

যেখানে একটি প্রমাণপত্রের প্রয়োজন হয়, একটি `read` -scope `oma_` টোকেন শুধুমাত্র `GET` জন্য কাজ করে।

**ইনবাউন্ড কন্ডাক্টর প্রতিনিধি দল (`POST /api/a2a/tasks`):** বহিরাগত A2A এজেন্টরা OmniRoute এর মাধ্যমে OmniConductor ফ্লীটে কোডিং কাজ অর্পণ করে। মূল অংশ: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — শুধুমাত্র কন্ডাক্টর ফ্লিট দক্ষতা (এজেন্ট কার্ডে ঘোষিত) হস্তান্তরযোগ্য; `metadata.conductor.repo.url` প্রয়োজন (বহরটি গিট রেপোতে কাজ করে)। রুটটি সার্ভার-সাইড `CONDUCTOR_ORCHESTRATOR_TOKEN` (fallback `CONDUCTOR_HUB_TOKEN`) ব্যবহার করে হাবের `POST /v1/tasks` এ অনুবাদ করে এবং `201 { conductor_task_id, state: "submitted" }` ফেরত দেয়; টাস্ক স্টেটগুলি SSE→A2A মিরর (RF1) এর মাধ্যমে প্রবাহিত হয় এবং `GET /api/a2a/tasks?skill=conductor` এর মাধ্যমে দৃশ্যমান হয়।

---

## একটি নতুন দক্ষতা যোগ করা হচ্ছে

1. **দক্ষতা ফাইল তৈরি করুন:** `src/lib/a2a/skills/<your-skill>.ts`

   একটি async ফাংশন `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>` রপ্তানি করুন। বিদ্যমান দক্ষতা যেমন `smartRouting.ts` এর আকার অনুসরণ করুন। যদি দক্ষতা HTTP এ OmniRoute এ ফিরে আসে, তাহলে `src/lib/a2a/selfLoopAuth.ts` থেকে `buildSelfLoopHeaders(caller)` দিয়ে হেডার তৈরি করুন যাতে কলটি `OMNIROUTE_API_KEY` নয়, A2A কলার কী দিয়ে চলে এবং `redirect: "error"` এ `fetch` এ পাস করুন যাতে কোনও পুনঃনির্দেশ কখনই কী পায় না। সাহায্যকারী শুধুমাত্র হেডার তৈরি করে; প্রতিটি দক্ষতা পুনঃনির্দেশ নীতি নিজেই সেট করে। এটি একটি কী সংযুক্ত করার পরিবর্তে `UnsafeSelfLoopTargetError` ছুঁড়ে দেয় যখন সমাধান করা বেস URL প্রাইভেট নেটওয়ার্কের বাইরে প্লেইন http হয় (লুপব্যাক, একটি ধারক বা পরিষেবার নাম এবং ব্যক্তিগত ঠিকানাগুলি ভাল) বা শংসাপত্রগুলি ধারণ করে, তাই একটি দক্ষতা যা প্রত্যাখ্যান করা কলগুলিকে গ্রাস করে সেই ত্রুটিটিকে অবশ্যই পুনরায় থ্রো করতে হবে৷

2. **রেজিস্টার হ্যান্ডলার:** `src/lib/a2a/taskExecution.ts` তে, `A2A_SKILL_HANDLERS` এ একটি এন্ট্রি যোগ করুন:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **এজেন্ট কার্ডে প্রকাশ করুন:** `src/lib/a2a/agentCardMetadata.ts` ( `/.well-known/agent.json` এবং `/.well-known/agent-card.json` দ্বারা ভাগ করা হয়েছে), `skills` অ্যারেতে যুক্ত করুন:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **পরীক্ষা লিখুন:** `tests/unit/a2a-<your-skill>.test.ts` সুখী পথ + ত্রুটি পথ কভার করুন।

5. **দলিল** এই ফাইলের `Available Skills` টেবিলে নতুন দক্ষতা।

---

## টাস্ক TTL

টাস্কগুলো `ttlMinutes` পরে মেয়াদোত্তীর্ণ হয় (ডিফল্ট 5 মিনিট) — এটি `src/lib/a2a/taskManager.ts:82`-এ `A2ATaskManager` কনস্ট্রাক্টরে কনফিগার করা আছে। কাস্টমাইজ করতে, `A2ATaskManager` ইনস্ট্যানশনের একটি ফর্ক তৈরি করুন এবং ভিন্ন একটি মান পাস করুন (যেমন, 15 মিনিটের TTL-এর জন্য `new A2ATaskManager(15)`)। একটি ব্যাকগ্রাউন্ড ইন্টারভ্যাল প্রতি 60 সেকেন্ডে মেয়াদোত্তীর্ণ টাস্কগুলো সরিয়ে দেয়।

---

## টাস্কের জীবনচক্র

```
জমা দেওয়া → প্রক্রিয়াধীন → সম্পন্ন
                         → ব্যর্থ
                         → বাতিল
```

- ডিফল্টভাবে টাস্কগুলো 5 মিনিট পরে মেয়াদোত্তীর্ণ হয় ([টাস্ক TTL](#task-ttl) দেখুন)
- চূড়ান্ত স্টেটসমূহ: `completed`, `failed`, `cancelled`
- ইভেন্ট লগ প্রতিটি স্টেট ট্রানজিশন ট্র্যাক করে

---

## ত্রুটি কোড

| কোড    | অর্থ                        |
| :----- | :-------------------------- |
| -32700 | পার্স ত্রুটি (অবৈধ JSON)    |
| -32600 | অবৈধ অনুরোধ / অননুমোদিত     |
| -32601 | মেথড বা স্কিল পাওয়া যায়নি |
| -32602 | অবৈধ প্যারামিটার            |
| -32603 | অভ্যন্তরীণ ত্রুটি           |
| -32000 | A2A এন্ডপয়েন্ট নিষ্ক্রিয়  |

---

## ইন্টিগ্রেশন উদাহরণ

### পাইথন (অনুরোধ)

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

### TypeScript (আনয়ন)

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
