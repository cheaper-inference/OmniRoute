# OmniRoute A2A Server Documentation (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute-ը՝ որպես խելացի երթուղավորման գործակալ

A2A միջերեսն ունի երկու կողմ․

- **JSON-RPC 2.0**՝ `POST /a2a` հասցեում (հիմնական մուտքի կետը, սահմանված է `src/app/a2a/route.ts`-ում)։
- **REST**՝ `/api/a2a/*`-ի ներքո՝ վահանակների և գործիքակազմի համար (կարգավիճակ, առաջադրանքների ցանկ, չեղարկում)։

Առաջադրանքներին հետևում է `A2ATaskManager`-ը (`src/lib/a2a/taskManager.ts`, լռելյայն 5 րոպե TTL)։ Հմտությունները բաշխվում են `src/lib/a2a/taskExecution.ts`-ում գտնվող `A2A_SKILL_HANDLERS`-ի միջոցով։

## Գործակալի հայտնաբերում

```bash
curl http://localhost:20128/.well-known/agent.json
```

Վերադարձնում է OmniRoute-ի հնարավորությունները, հմտությունները և նույնականացման պահանջները նկարագրող Գործակալի քարտը։

Գործակալի քարտի `version` դաշտը վերցվում է `process.env.npm_package_version`-ից (տե՛ս `src/app/.well-known/agent.json/route.ts:13`), ուստի յուրաքանչյուր թողարկման ժամանակ այն ավտոմատ համաժամեցվում է `package.json`-ի հետ։

---

## Նույնականացում

Բոլոր `/a2a` հարցումները պահանջում են API բանալի՝ `Authorization` վերնագրի միջոցով.

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Եթե սերվերում API բանալի կազմաձևված չէ, նույնականացումը շրջանցվում է։

## Միացում

A2A-ն կառավարվում է **Endpoints → A2A** փոխարկիչով և լռելյայն անջատված է։ Երբ այն անջատված է,
`GET /api/a2a/status`-ը հաղորդում է `status: "disabled"` և `online: false`, իսկ JSON-RPC կանչերը դեպի
`POST /a2a` վերադարձնում են HTTP 503՝ JSON-RPC սխալի `-32000` կոդով։

---

## JSON-RPC 2.0 մեթոդներ

### `message/send` — Համաժամանակյա կատարում

Հաղորդագրություն է ուղարկում հմտությանը և սպասում ամբողջական պատասխանին։

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

`smart-routing`-ի դեպքում `metadata.combo`-ն գեյթվեյի հարցման համար բացահայտ կերպով վերագրում է
`metadata.model`-ը․ այն ուղարկվում է որպես իրական `model`,
այլ ոչ թե որպես անտեսվող `x-combo` JSON դաշտ։ Գեյթվեյի API բանալու և
ըստ թիրախի թույլտվության սովորական կանոնները շարունակում են գործել։ Անվավեր կամ դատարկ համակցությունը մերժվում է։

Արդյունքում հասանելի են `requested_combo` (կանչողի մտադրությունը), `dispatched_model`
(գեյթվեյի իրական հարցումը), `response_model` (գեյթվեյի պատասխանը) և
`confirmed_combo` դաշտերը։ Վերջին դաշտը `null` է, եթե գեյթվեյը հստակորեն
չի նույնականացնում համակցությունը։ A2A որոշումների մատյանները կատարումը վերագրում են միայն
հաստատված համակցությանը՝ չհաստատված հարցումը պահպանելով որպես `requestedCombo`։

**Պատասխան՝**

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

### `message/stream` — SSE հոսքային փոխանցում

Նույնն է, ինչ `message/send`-ը, սակայն իրական ժամանակում հոսքային փոխանցման համար վերադարձնում է սերվերի կողմից ուղարկվող իրադարձություններ։

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

**SSE իրադարձություններ՝**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Առաջադրանքի կարգավիճակի հարցում

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Առաջադրանքի չեղարկում

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Հասանելի հմտություններ

OmniRoute բացահայտում է 6 A2A հմտություններ, որոնք հաղորդված են `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` ում: Յուրաքանչյուր հմտության մոդուլ ապրում է `src/lib/a2a/skills/` ում:

| Հմտություն                 | ID                   | Նկարագրություն                                                                                                                                                          | Պիտակներ                            | Օրինակներ                                        |
| :------------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------- | :----------------------------------------------- |
| Smart Routing              | `smart-routing`      | Ուղղում է հաղորդագրությունը օպտիմալ provider/combo միջոցով՝ օգտագործելով OmniRoute ի համակցված շարժիչը + գնահատումը                                                     | երթուղիներ, պրովայդերներ            | «Ուղղեք այս հուշումը լավագույն մոդելի միջոցով»   |
| Քվոտաների կառավարում       | `quota-management`   | Հաղորդում է յուրաքանչյուր մատակարարի քվոտայի վիճակի մասին, օգնում է զանգահարողներին որոշել, թե երբ պետք է throttle/switch                                               | քվոտա, պրովայդերներ                 | «Ստուգեք քվոտան անթրոպիկի համար»                 |
| Մատակարարի բացահայտում     | `provider-discovery` | Ցուցակում է տեղադրված պրովայդերների հնարավորությունները, ազատ մակարդակի դրոշները, OAuth կարգավիճակը                                                                     | մատակարարներ, բացահայտում           | «Ի՞նչ մատակարարներ են հասանելի»:                 |
| Արժեքի վերլուծություն      | `cost-analysis`      | Գնահատում է request/conversation ի արժեքը՝ հաշվի առնելով + կատալոգի վերջին օգտագործումը                                                                                 | արժեքը, օգտագործումը                | «Գնահատել արժեքը այս խոսակցության համար»         |
| Առողջության հաշվետվություն | `health-report`      | Ագրեգատների անջատիչ, սառեցում, արգելափակման վիճակ յուրաքանչյուր մատակարարի համար                                                                                        | առողջություն, դիմացկունություն      | «Ցույց տալ բոլոր մատակարարների առողջական վիճակը» |
| Ցանկի հնարավորությունները  | `list-capabilities`  | Վերադարձնում է Agent Skills-ի ամբողջական կատալոգը 45 մուտքից (23 API + 21 CLI + 1 կոնֆիգուր) որպես նշման աղյուսակ՝ չմշակված SKILL.md URLs ով համատեքստի ներարկման համար | կատալոգ, բացահայտում, հմտություններ | «Թվարկեք OmniRoute բոլոր հնարավորությունները»    |

> Գործակալի քարտը պետք է համահունչ պահվի 388 մատակարարների կատալոգի հետ. մատակարարների հաշվարկները և free/no-auth մետատվյալները ստացվում են գործարկման ժամանակի գրանցամատյանից:

### `list-capabilities` Հմտություն Մանրամասն

`list-capabilities` հմտությունը հատկապես օգտակար է արտաքին գործակալների համար, ովքեր պետք է պարզեն, թե ինչ է մերկացնում OmniRoute ՝ նախքան API զանգեր ուղարկելը: Այն վերադարձնում է կառուցվածքային նշագրման աղյուսակի արտեֆակտ.

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Յուրաքանչյուր տող ներառում է `rawUrl` սյունակը, որպեսզի գործակալները կարողանան անմիջապես վերցնել ամբողջական SKILL.md: `metadata.totalSkills` դաշտը արտացոլում է կատալոգի չափը (այսօր 45): Իրականացում՝ `src/lib/a2a/skills/listCapabilities.ts`. Տես նաև [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (օժանդակ)

JSON-RPC վերջնակետը `/a2a` կանոնական A2A մուտքի կետն է: Ստորև բերված REST վերջնակետերը օժանդակ մուտք են ապահովում վահանակների և արտաքին գործիքների համար.

| Վերջնակետ                    | Մեթոդ | Նկարագրություն                                                  | Հաստատություն                                                                                                   |
| :--------------------------- | :---- | :-------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET   | Սերվերի կարգավիճակ, գրանցված հմտություններ                      | (հանրային)                                                                                                      |
| `/api/a2a/tasks`             | GET   | Թվարկեք առաջադրանքները զտիչներով                                | կառավարում կամ API բանալին (տես ստորև)                                                                          |
| `/api/a2a/tasks/[id]`        | GET   | Ստացեք առաջադրանք ID կողմից                                     | կառավարում կամ API բանալին (տես ստորև)                                                                          |
| `/api/a2a/tasks/[id]/cancel` | POST  | Չեղարկել առաջադրանքը                                            | կառավարում կամ API բանալին (տես ստորև)                                                                          |
| `/.well-known/agent.json`    | GET   | Գործակալի քարտ (A2A հայտնաբերում)                               | (հանրային, քեշավորված 3600-ականներ)                                                                             |
| `/api/a2a/tasks`             | POST  | Ներգնա պատվիրակություն OmniConductor նավատորմ (դիրիժոր PRD RF5) | նույնը, ինչ `GET`, գումարած `OMNIROUTE_API_KEY` եթե սահմանված է, երբ `REQUIRE_API_KEY` անջատված է; `a2aEnabled` |

Ով կհասնի `/api/a2a/tasks*` երթուղիներին, կախված է մուտքի և API-բանալու կարգավորումներից.

- `requireLogin=true` (կանխադրված). միջին ծրագիրը ընդունում է միայն կառավարման հավատարմագրերը (վահանակի նիստ, `manage` -scope API ստեղն, `oma_` մուտքի նշան) և `OMNIROUTE_API_KEY`: Պարզ եզրակացության բանալին ստանում է `403`: `Authorization` վերնագրում միջին ծրագիրը միայն `OMNIROUTE_API_KEY` ընդունում է որպես `Bearer <key>`; մերկ ստեղնը կամ ներդիրը `Bearer` ից հետո ստանում է `401`:
- `requireLogin=false`, կամ loopback պատուհանը նախքան ներբեռնումը. `REQUIRE_API_KEY=true` հետ ցանկացած վավեր OmniRoute API ստեղն կամ կառավարման հավատարմագիր ընդունվում է, և անանուն զանգողները ստանում են `401`; հետ `REQUIRE_API_KEY` դուրս երթուղիները բաց են.
- `POST /api/a2a/tasks` լրացուցիչ պահանջում է `OMNIROUTE_API_KEY` `Authorization` վերնագրում, երբ այդ փոփոխականը դրված է, իսկ `REQUIRE_API_KEY` անջատված է: Այլ վերնագրեր, ինչպիսիք են `x-api-key`, այնտեղ չեն հաշվվում: Անջատված մուտքի դեպքում կամ մուտքից առաջ բանալին անցնում է `Bearer` նախածանցով կամ առանց դրա; միացված մուտքի դեպքում միայն `Bearer <key>` է անցնում միջնակարգ ծրագրաշարը:

Այնտեղ, որտեղ պահանջվում է հավատարմագիր, `read` -scope `oma_` նշանն աշխատում է միայն `GET` համար:

**Ներգնա դիրիժորի պատվիրակություն (`POST /api/a2a/tasks`):** Արտաքին A2A գործակալները պատվիրակում են կոդավորման աշխատանքը OmniConductor նավատորմի վրա OmniRoute միջոցով: Կազմ. `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — միայն Դիրիժորի նավատորմի հմտությունները (նրանք, որոնք նշված են Գործակալի քարտում) փոխանցելի են. `metadata.conductor.repo.url` անհրաժեշտ է (նավատորմը աշխատում է git repos-ի վրա): Երթուղին թարգմանվում է որպես հանգույցի `POST /v1/tasks` ՝ օգտագործելով սերվերի կողմի `CONDUCTOR_ORCHESTRATOR_TOKEN` (fallback `CONDUCTOR_HUB_TOKEN`) և վերադարձնում `201 { conductor_task_id, state: "submitted" }`; առաջադրանքի վիճակները հետ են հոսում SSE→A2A հայելու միջով (RF1) և տեսանելի են `GET /api/a2a/tasks?skill=conductor` միջոցով:

---

## Նոր հմտության ավելացում

1. **Ստեղծել հմտությունների ֆայլ.** `src/lib/a2a/skills/<your-skill>.ts`

   Արտահանել async ֆունկցիա `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`: Հետևեք գոյություն ունեցող հմտությունների ձևին, ինչպիսին է `smartRouting.ts`: Եթե հմտությունը հետ է կանչում OmniRoute ին HTTP փոխարեն, կառուցեք վերնագրերը `buildSelfLoopHeaders(caller)` ով `src/lib/a2a/selfLoopAuth.ts` ից, որպեսզի զանգը կատարվի A2A զանգահարողի ստեղնով, ոչ թե `OMNIROUTE_API_KEY`, և փոխանցեք `redirect: "error"` `fetch` ին, որպեսզի վերահղումը երբեք ստանա բանալին: Օգնականը կառուցում է միայն վերնագրեր; յուրաքանչյուր հմտություն ինքն է սահմանում վերահղման քաղաքականությունը: Այն նետում է `UnsafeSelfLoopTargetError` քան կցել բանալի, երբ լուծված բազային URL պարզ http է մասնավոր ցանցից դուրս (loopback, կոնտեյների կամ ծառայության անվանումը և մասնավոր հասցեները լավ են) կամ պահպանում է հավատարմագրերը, ուստի մերժված զանգերը կուլ տվող հմտությունը պետք է վերականգնի այդ սխալը:

2. **Գրանցման կառավարիչ.** `src/lib/a2a/taskExecution.ts` ում ավելացրեք մուտք `A2A_SKILL_HANDLERS` ին.

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Բացահայտեք գործակալի քարտում.** `src/lib/a2a/agentCardMetadata.ts` ում (համօգտագործվում է `/.well-known/agent.json` և `/.well-known/agent-card.json` կողմից), ավելացրեք `skills` զանգվածին՝

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Գրեք թեստեր.** `tests/unit/a2a-<your-skill>.test.ts`. Ծածկեք երջանիկ ուղին + սխալի ուղին:

5. **Փաստաթուղթ** նոր հմտություն այս ֆայլի `Available Skills` աղյուսակում:

---

## Առաջադրանքի TTL

Առաջադրանքների ժամկետը լրանում է `ttlMinutes`-ից հետո (կանխադրված՝ 5 րոպե)․ այն կարգավորվում է `A2ATaskManager`-ի կոնստրուկտորում՝ `src/lib/a2a/taskManager.ts:82` հասցեում։ Անհատականացնելու համար ստեղծեք `A2ATaskManager`-ի օրինակը ձեր ճյուղում և փոխանցեք այլ արժեք (օրինակ՝ `new A2ATaskManager(15)`՝ 15 րոպե TTL-ի համար)։ Ֆոնային ինտերվալը յուրաքանչյուր 60 վայրկյանը մեկ մաքրում է ժամկետանց առաջադրանքները։

---

## Առաջադրանքի կենսացիկլը

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Կանխադրված՝ առաջադրանքների ժամկետը լրանում է 5 րոպեից հետո (տե՛ս [Առաջադրանքի TTL](#task-ttl))
- Վերջնական վիճակներն են՝ `completed`, `failed`, `cancelled`
- Իրադարձությունների մատյանը գրանցում է վիճակի յուրաքանչյուր անցում

---

## Սխալի կոդերը

| Կոդ    | Նշանակություն                    |
| :----- | :------------------------------- |
| -32700 | Վերլուծման սխալ (անվավեր JSON)   |
| -32600 | Անվավեր հարցում / Չարտոնված      |
| -32601 | Մեթոդը կամ հմտությունը չի գտնվել |
| -32602 | Անվավեր պարամետրեր               |
| -32603 | Ներքին սխալ                      |
| -32000 | A2A վերջնակետն անջատված է        |

---

## Ինտեգրման օրինակներ

### Python (խնդրանքներ)

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

### TypeScript (բերել)

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
