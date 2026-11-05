# OmniRoute A2A Server Documentation (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute, როგორც ინტელექტუალური მარშრუტიზაციის აგენტი

A2A ინტერფეისს ორი მხარე აქვს:

- **JSON-RPC 2.0** მისამართზე `POST /a2a` (კანონიკური შესვლის წერტილი, განსაზღვრულია `src/app/a2a/route.ts`-ში).
- **REST** მისამართის `/api/a2a/*` ქვეშ, მართვის პანელებისა და ინსტრუმენტებისთვის (სტატუსი, დავალებების სია, გაუქმება).

დავალებების აღრიცხვას ახორციელებს `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, ნაგულისხმევი TTL — 5 წუთი). უნარების დისპეტჩერიზაცია ხორციელდება `A2A_SKILL_HANDLERS`-ის მეშვეობით, ფაილში `src/lib/a2a/taskExecution.ts`.

## აგენტის აღმოჩენა

```bash
curl http://localhost:20128/.well-known/agent.json
```

აბრუნებს აგენტის ბარათს, რომელიც აღწერს OmniRoute-ის შესაძლებლობებს, უნარებსა და ავთენტიფიკაციის მოთხოვნებს.

აგენტის ბარათის `version` ველი მიიღება `process.env.npm_package_version`-იდან (იხილეთ `src/app/.well-known/agent.json/route.ts:13`), ამიტომ ყოველი გამოშვებისას ის ავტომატურად სინქრონიზდება `package.json`-თან.

---

## ავთენტიფიკაცია

ყველა `/a2a` მოთხოვნა საჭიროებს API გასაღებს `Authorization` სათაურის მეშვეობით:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

თუ სერვერზე API გასაღები კონფიგურირებული არ არის, ავთენტიფიკაცია გამოიტოვება.

## ჩართვა

A2A იმართება **Endpoints → A2A** გადამრთველით და ნაგულისხმევად გამორთულია. როდესაც ის გამორთულია,
`GET /api/a2a/status` აბრუნებს `status: "disabled"` და `online: false`; JSON-RPC გამოძახებები
`POST /a2a`-ზე აბრუნებს HTTP 503-ს JSON-RPC შეცდომის კოდით `-32000`.

---

## JSON-RPC 2.0 მეთოდები

### `message/send` — სინქრონული შესრულება

აგზავნის შეტყობინებას უნართან და ელოდება სრულ პასუხს.

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

**პასუხი:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": {
        "estimated": 0.005,
        "actual": 0.003,
        "currency": "USD"
      },
      "resilience_trace": [
        {
          "event": "primary_selected",
          "provider": "anthropic",
          "timestamp": "..."
        }
      ],
      "policy_verdict": {
        "allowed": true,
        "reason": "within budget and quota limits"
      }
    }
  }
}
```

### `message/stream` — SSE ნაკადური გადაცემა

იგივეა, რაც `message/send`, მაგრამ რეალურ დროში ნაკადური გადაცემისთვის აბრუნებს სერვერის მიერ გამოგზავნილ მოვლენებს.

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

**SSE მოვლენები:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — ამოცანის სტატუსის მოთხოვნა

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ამოცანის გაუქმება

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ხელმისაწვდომი უნარები

OmniRoute ამჟღავნებს 6 A2A უნარს, რომლებიც მიბმულია `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`-ში. თითოეული უნარის მოდული მდებარეობს `src/lib/a2a/skills/` საქაღალდეში.

| უნარი                       | ID                   | აღწერა                                                                                                                                                          | Tags                       | მაგალითები                             |
| :-------------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :------------------------------------- |
| ჭკვიანი მარშრუტიზაცია       | `smart-routing`      | მისამართავს პრომპტს ოპტიმალური პროვაიდერის/კომბოს გავლით OmniRoute-ის კომბო ძრავისა და სკორინგის გამოყენებით                                                    | routing, providers         | "Route this prompt via the best model" |
| კვოტის მართვა               | `quota-management`   | ანგარიშობს თითოეული პროვაიდერის კვოტის მდგომარეობას, ეხმარება გამომძახებლებს გადაწყვიტონ, როდის შეზღუდონ ან გადართონ                                            | quota, providers           | "Check quota for anthropic"            |
| პროვაიდერების აღმოჩენა      | `provider-discovery` | აჩვენებს დაყენებული პროვაიდერების სიას შესაძლებლობებით, უფასო დონის ფლაგებითა და OAuth სტატუსით                                                                 | providers, discovery       | "What providers are available?"        |
| ღირებულების ანალიზი         | `cost-analysis`      | აფასებს მოთხოვნის/საუბრის ღირებულებას კატალოგისა და ბოლო გამოყენების მონაცემების საფუძველზე                                                                     | cost, usage                | "Estimate cost for this conversation"  |
| ჯანმრთელობის ანგარიში       | `health-report`      | აერთიანებს circuit breaker, cooldown და lockout მდგომარეობებს თითოეული პროვაიდერისთვის                                                                          | health, resilience         | "Show health status of all providers"  |
| შესაძლებლობების ჩამონათვალი | `list-capabilities`  | აბრუნებს Agent Skills-ის სრულ 45-ჩანაწერიან კატალოგს (23 API + 21 CLI + 1 კონფიგურაცია) markdown ცხრილის სახით, უმუშავი SKILL.md URL-ებით კონტექსტის ჩასასმელად | catalog, discovery, skills | "List all OmniRoute capabilities"      |

> Agent Card უნდა შეესაბამებოდეს მოქმედ 375-პროვაიდერიან კატალოგს; პროვაიდერების რაოდენობა და უფასო/ავტორიზაციის გარეშე მეტამონაცემები მოწოდებულია სამუშაო (runtime) რეესტრიდან.

### `list-capabilities` უნარის დეტალები

`list-capabilities` უნარი განსაკუთრებით სასარგებლოა გარე აგენტებისთვის, რომლებსაც API გამოძახებების გაგზავნამდე სჭირდებათ გაარკვიონ, რას ამჟღავნებს OmniRoute. ის აბრუნებს სტრუქტურირებული markdown ცხრილის არტეფაქტს:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

თითოეული რიგი შეიცავს `rawUrl` სვეტს, რათა აგენტებმა მაშინვე მოიძიონ სრული SKILL.md. `metadata.totalSkills` ველი ასახავს კატალოგის ზომას (დღეს 45). იმპლემენტაცია: `src/lib/a2a/skills/listCapabilities.ts`. ასევე იხილეთ [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (დამხმარე)

JSON-RPC საბოლოო წერტილი `/a2a` არის A2A-ის კანონიკური შესასვლელი წერტილი. ქვემოთ მოცემული REST საბოლოო წერტილები უზრუნველყოფს დამხმარე წვდომას საინფორმაციო პანელებისა და გარე ინსტრუმენტებისთვის:

| საბოლოო წერტილი              | მეთოდი | აღწერა                                                                | ავტორიზაცია                                              |
| :--------------------------- | :----- | :-------------------------------------------------------------------- | :------------------------------------------------------- |
| `/api/a2a/status`            | GET    | სერვერის სტატუსი, რეგისტრირებული უნარები                              | (საჯარო)                                                 |
| `/api/a2a/tasks`             | GET    | ამოცანების სია ფილტრებით                                              | მართვის                                                  |
| `/api/a2a/tasks/[id]`        | GET    | ამოცანის მიღება ID-ის მიხედვით                                        | მართვის                                                  |
| `/api/a2a/tasks/[id]/cancel` | POST   | მიმდინარე ამოცანის გაუქმება                                           | მართვის                                                  |
| `/.well-known/agent.json`    | GET    | აგენტის ბარათი (A2A აღმოჩენა)                                         | (საჯარო, კეშირებული 3600s-ით)                            |
| `/api/a2a/tasks`             | POST   | შემომავალი დელეგირება OmniConductor-ის ფლოტისთვის (Conductor PRD RF5) | Bearer შედარებული `OMNIROUTE_API_KEY`-თან + `a2aEnabled` |

**შემომავალი Conductor-ის დელეგირება (`POST /api/a2a/tasks`):** გარე A2A აგენტები OmniRoute-ის მეშვეობით კოდირების სამუშაოს OmniConductor-ის ფლოტს გადასცემენ. მოთხოვნის სხეული: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — დელეგირება შესაძლებელია მხოლოდ Conductor-ის ფლოტის უნარებზე (რომლებიც აგენტის ბარათზეა გამოცხადებული); `metadata.conductor.repo.url` სავალდებულოა (ფლოტი git რეპოზიტორიებზე მუშაობს). მარშრუტი გარდაიქმნება ჰაბის `POST /v1/tasks` მოთხოვნად, სერვერის მხარის `CONDUCTOR_ORCHESTRATOR_TOKEN`-ის გამოყენებით (სარეზერვო ვარიანტი: `CONDUCTOR_HUB_TOKEN`) და აბრუნებს `201 { conductor_task_id, state: "submitted" }`; ამოცანების მდგომარეობები უკან გადაიცემა SSE→A2A სარკის (RF1) მეშვეობით და ხილულია `GET /api/a2a/tasks?skill=conductor` მოთხოვნით.

---

## ახალი უნარის დამატება

1. **შექმენით უნარის ფაილი:** `src/lib/a2a/skills/<your-skill>.ts`

   გაიტანეთ async ფუნქცია `(task: A2ATask) => Promise<{ artifacts, metadata }>`. მიჰყევით არსებული უნარების სტრუქტურას, მაგალითად `smartRouting.ts`.

2. **დაარეგისტრირეთ დამმუშავებელი:** ფაილში `src/lib/a2a/taskExecution.ts` დაამატეთ ჩანაწერი `A2A_SKILL_HANDLERS`-ში:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...არსებული უნარები
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **გამოაჩინეთ აგენტის ბარათზე:** ფაილში `src/app/.well-known/agent.json/route.ts` დაამატეთ `skills` მასივს:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **დაწერეთ ტესტები:** `tests/unit/a2a-<your-skill>.test.ts`. დაფარეთ წარმატებული სცენარი + შეცდომის სცენარი.

5. **დაადოკუმენტირეთ** ახალი უნარი ამ ფაილის `Available Skills` ცხრილში.

---

## დავალების TTL

დავალებებს ვადა ეწურებათ `ttlMinutes`-ის შემდეგ (ნაგულისხმევად 5 წუთი) — ეს კონფიგურირდება `A2ATaskManager`-ის კონსტრუქტორში, მისამართზე `src/lib/a2a/taskManager.ts:82`. შესაცვლელად შექმენით `A2ATaskManager`-ის ინიციალიზაციის განშტოება და გადასცით განსხვავებული მნიშვნელობა (მაგ., `new A2ATaskManager(15)` 15-წუთიანი TTL-ისთვის). ფონური ინტერვალი ვადაგასულ დავალებებს ყოველ 60 წამში ასუფთავებს.

---

## დავალების სასიცოცხლო ციკლი

```
submitted → working → completed
                    → failed
                    → cancelled
```

- დავალებებს ნაგულისხმევად 5 წუთის შემდეგ ეწურებათ ვადა (იხილეთ [დავალების TTL](#task-ttl))
- საბოლოო მდგომარეობებია: `completed`, `failed`, `cancelled`
- მოვლენების ჟურნალი მდგომარეობის თითოეულ ცვლილებას აღრიცხავს

---

## შეცდომის კოდები

| კოდი   | მნიშვნელობა                                     |
| :----- | :---------------------------------------------- |
| -32700 | გარჩევის შეცდომა (არასწორი JSON)                |
| -32600 | არასწორი მოთხოვნა / ავტორიზაცია არ არის გავლილი |
| -32601 | მეთოდი ან უნარი ვერ მოიძებნა                    |
| -32602 | არასწორი პარამეტრები                            |
| -32603 | შიდა შეცდომა                                    |
| -32000 | A2A საბოლოო წერტილი გამორთულია                  |

---

## ინტეგრაციის მაგალითები

### Python (requests)

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

### TypeScript (fetch)

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
