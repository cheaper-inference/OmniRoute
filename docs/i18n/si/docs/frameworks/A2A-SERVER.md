# OmniRoute A2A Server Documentation (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — බුද්ධිමත් මාර්ගගත කිරීමේ නියෝජිතයෙකු ලෙස OmniRoute

A2A අතුරුමුහුණතට ආකාර දෙකක් ඇත:

- **JSON-RPC 2.0** `POST /a2a` හි (සම්මත පිවිසුම් ස්ථානය, `src/app/a2a/route.ts` හි අර්ථ දක්වා ඇත).
- උපකරණ පුවරු සහ මෙවලම් සඳහා `/api/a2a/*` යටතේ **REST** (තත්ත්වය, කාර්ය ලැයිස්තුව, අවලංගු කිරීම).

කාර්යයන් `A2ATaskManager` මඟින් නිරීක්ෂණය කෙරේ (`src/lib/a2a/taskManager.ts`, පෙරනිමි මිනිත්තු 5ක TTL). කුසලතා `src/lib/a2a/taskExecution.ts` හි `A2A_SKILL_HANDLERS` හරහා යොමු කෙරේ.

## නියෝජිත සොයාගැනීම

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute හි හැකියාවන්, කුසලතා සහ සත්යාපන අවශ්යතා විස්තර කරන නියෝජිත කාඩ්පත ආපසු ලබා දෙයි.

නියෝජිත කාඩ්පතේ `version` ක්ෂේත්රය `process.env.npm_package_version` වෙතින් ලබා ගනී (`src/app/.well-known/agent.json/route.ts:13` බලන්න), එම නිසා සෑම නිකුතුවකදීම එය `package.json` සමඟ ස්වයංක්රීයව සමමුහුර්තව පවතී.

---

## සත්යාපනය

සියලුම `/a2a` ඉල්ලීම් සඳහා `Authorization` ශීර්ෂකය හරහා API යතුරක් අවශ්ය වේ:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

සේවාදායකයේ API යතුරක් වින්යාස කර නොමැති නම්, සත්යාපනය මඟ හරිනු ලැබේ.

## සක්රීය කිරීම

A2A, **Endpoints → A2A** මාරු බොත්තම මඟින් පාලනය වන අතර පෙරනිමියෙන් අක්රීය කර ඇත. එය අක්රීය කර ඇති විට,
`GET /api/a2a/status` විසින් `status: "disabled"` සහ `online: false` වාර්තා කරයි; `POST /a2a` වෙත කරන JSON-RPC ඇමතුම්
JSON-RPC දෝෂ කේතය `-32000` සමඟ HTTP 503 ආපසු ලබා දෙයි.

---

## JSON-RPC 2.0 ක්රම

### `message/send` — සමමුහුර්ත ක්රියාත්මක කිරීම

කුසලතාවකට පණිවිඩයක් යවා සම්පූර්ණ ප්රතිචාරය ලැබෙන තෙක් රැඳී සිටියි.

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

`smart-routing` සඳහා, `metadata.combo` යනු ද්වාර ඉල්ලීම සඳහා
`metadata.model` පැහැදිලිව අතික්රමණය කිරීමකි; එය නොසලකා හරින ලද `x-combo`
JSON ක්ෂේත්රයක් ලෙස නොව, සැබෑ `model` ලෙස යවනු ලැබේ. ද්වාරයේ සාමාන්ය API යතුරු සහ
එක් එක් ඉලක්කයට අදාළ අවසර දීම තවමත් ක්රියාත්මක වේ. වලංගු නොවන හෝ හිස් combo එකක් ප්රතික්ෂේප කෙරේ.

ප්රතිඵලය මඟින් `requested_combo` (අමතන්නාගේ අභිප්රාය), `dispatched_model`
(සැබෑ ද්වාර ඉල්ලීම), `response_model` (ද්වාර ප්රතිචාරය) සහ
`confirmed_combo` අනාවරණය කරයි. ද්වාරය combo එකක් පැහැදිලිව හඳුනා නොගන්නේ නම් අවසාන ක්ෂේත්රය `null` වේ.
A2A තීරණ ලොග් මඟින් ක්රියාත්මක කිරීම ආරෝපණය කරන්නේ තහවුරු කළ combo එකකට පමණක් වන අතර,
තහවුරු නොකළ ඉල්ලීමක් `requestedCombo` ලෙස රඳවා ගනියි.

**ප්රතිචාරය:**

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

### `message/stream` — SSE ප්රවාහකරණය

`message/send` හා සමාන නමුත් තත්ය කාලීන ප්රවාහකරණය සඳහා සර්වර්-යැවූ සිදුවීම් ආපසු ලබා දෙයි.

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

**SSE සිදුවීම්:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — කාර්ය තත්ත්වය විමසීම

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — කාර්යයක් අවලංගු කිරීම

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ලබා ගත හැකි කුසලතා

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` හි රැහැන්ගත A2A කුසලතා 6ක් හෙළි කරයි. සෑම කුසලතා මොඩියුලයක්ම `src/lib/a2a/skills/` හි ජීවත් වේ.

| දක්ෂතාවය                   | ID                   | විස්තරය                                                                                                                                                               | ටැග්                         | උදාහරණ                                         |
| :------------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- | :--------------------------------------------- |
| Smart Routing              | `smart-routing`      | OmniRoute හි සංයුක්ත එන්ජිම + ලකුණු කිරීම භාවිතයෙන් ප්‍රශස්ත provider/combo හරහා ප්‍රේරකයක් යොමු කරයි                                                                 | මාර්ගගත කිරීම, සපයන්නන්      | "හොඳම මාදිලිය හරහා මෙම විමසුම මෙහෙයවන්න"       |
| කෝටා කළමනාකරණය             | `quota-management`   | එක් සැපයුම්කරුවෙකුගේ කෝටා තත්ත්වය වාර්තා කරයි, throttle/switch කළ යුත්තේ කවදාදැයි තීරණය කිරීමට ඇමතුම්කරුවන්ට උදවු කරයි                                                | කෝටාව, සපයන්නන්              | "මානව සඳහා කෝටාව පරීක්ෂා කරන්න"                |
| සැපයුම්කරු සොයාගැනීම       | `provider-discovery` | හැකියාවන්, නිදහස් ස්ථර ධජ, OAuth තත්ත්වය සහිත ස්ථාපිත සැපයුම්කරුවන් ලැයිස්තුගත කරයි                                                                                   | සපයන්නන්, සොයා ගැනීම         | "ලබා ගත හැකි සැපයුම්කරුවන් මොනවාද?"            |
| පිරිවැය විශ්ලේෂණය          | `cost-analysis`      | + මෑත භාවිතයේ නාමාවලිය ලබා දී request/conversation හි පිරිවැය ඇස්තමේන්තු කරයි                                                                                         | පිරිවැය, භාවිතය              | "මෙම සංවාදය සඳහා ඇස්තමේන්තුගත පිරිවැය"         |
| සෞඛ්ය වාර්තාව              | `health-report`      | එක් සැපයුම්කරුවෙකු සඳහා පරිපථ කඩනය, සිසිල් කිරීම, අගුලු දැමීමේ තත්වය එකතු කරයි                                                                                        | සෞඛ්යය, ඔරොත්තු දීමේ හැකියාව | "සියලු සැපයුම්කරුවන්ගේ සෞඛ්ය තත්ත්වය පෙන්වන්න" |
| හැකියාවන් ලැයිස්තුගත කරන්න | `list-capabilities`  | සන්දර්භය එන්නත් කිරීම සඳහා raw SKILL.md URLs සමඟ ලකුණු සටහන් වගුවක් ලෙස සම්පූර්ණ ඇතුළත් කිරීම් 45 නියෝජිත නිපුණතා නාමාවලිය (23 API + 21 CLI + 1 config) ආපසු ලබා දෙයි | නාමාවලිය, සොයාගැනීම්, කුසලතා | "සියලු OmniRoute හැකියාවන් ලැයිස්තුගත කරන්න"   |

> නියෝජිත කාඩ්පත සජීවී 388 සපයන්නන්ගේ නාමාවලිය සමඟ පෙළගස්වා තිබිය යුතුය; සපයන්නන්ගේ ගණන් සහ free/no-auth පාර-දත්ත ධාවන කාල රෙජිස්ට්‍රියෙන් ලබා ගනී.

### `list-capabilities` කුසලතා විස්තර

API ඇමතුම් යැවීමට පෙර OmniRoute නිරාවරණය කරන දේ සොයා ගැනීමට අවශ්‍ය බාහිර නියෝජිතයන් සඳහා `list-capabilities` කුසලතාව විශේෂයෙන් ප්‍රයෝජනවත් වේ. එය ව්‍යුහගත සලකුණු වගු පුරාවස්තුවක් ලබා දෙයි:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

සෑම පේළියකටම `rawUrl` තීරුව ඇතුළත් වන බැවින් නියෝජිතයින්ට වහාම සම්පූර්ණ SKILL.md ලබා ගත හැක. `metadata.totalSkills` ක්ෂේත්‍රය නාමාවලි ප්‍රමාණය පිළිබිඹු කරයි (අද 45). ක්රියාත්මක කිරීම: `src/lib/a2a/skills/listCapabilities.ts`. [AGENT-SKILLS.md](./AGENT-SKILLS.md) ද බලන්න.

---

## REST API (සහායක)

JSON-RPC අන්ත ලක්ෂ්‍යය `/a2a` යනු කැනොනිකල් A2A ඇතුල්වීමේ ස්ථානයයි. පහත REST අන්ත ලක්ෂ්‍ය උපකරණ පුවරු සහ බාහිර මෙවලම් සඳහා සහායක ප්‍රවේශය සපයයි:

| අන්ත ලක්ෂ්‍යය                | ක්රමය | විස්තරය                                                            | Aut                                                                                                                 |
| :--------------------------- | :---- | :----------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `/api/a2a/status`            | GET   | සේවාදායක තත්ත්වය, ලියාපදිංචි කුසලතා                                | (පොදු)                                                                                                              |
| `/api/a2a/tasks`             | GET   | පෙරහන් සමඟ කාර්යයන් ලැයිස්තුගත කරන්න                               | කළමනාකරණය හෝ API යතුර (පහත බලන්න)                                                                                   |
| `/api/a2a/tasks/[id]`        | GET   | ID මගින් කාර්යය ලබා ගන්න                                           | කළමනාකරණය හෝ API යතුර (පහත බලන්න)                                                                                   |
| `/api/a2a/tasks/[id]/cancel` | POST  | ධාවන කාර්යය අවලංගු කරන්න                                           | කළමනාකරණය හෝ API යතුර (පහත බලන්න)                                                                                   |
| `/.well-known/agent.json`    | GET   | නියෝජිත කාඩ්පත (A2A සොයාගැනීම)                                     | (පොදු, හැඹිලිගත තත් 3600)                                                                                           |
| `/api/a2a/tasks`             | POST  | OmniConductor බලඇණියට පැමිණෙන නියෝජිත කණ්ඩායම (කොන්දොස්තර PRD RF5) | `GET` ට සමාන වේ, `REQUIRE_API_KEY` ක්‍රියා විරහිතව තිබියදී සකසන්නේ නම් `OMNIROUTE_API_KEY` එකතු කරන්න; `a2aEnabled` |

`/api/a2a/tasks*` මාර්ග වෙත පිවිසෙන්නේ කවුද යන්න පිවිසුම් සහ API-යතුරු සැකසුම් මත රඳා පවතී:

- `requireLogin=true` (පෙරනිමිය): මිඩ්ල්වෙයාර් කළමනාකරණ අක්තපත්‍ර පමණක් පිළිගනී (උපකරණ පුවරු සැසිය, `manage` -scope API යතුර, `oma_` ප්‍රවේශ ටෝකනය) සහ `OMNIROUTE_API_KEY`. සරල අනුමාන යතුරක් `403` ලබා ගනී. `Authorization` ශීර්ෂයේ මිඩ්ල්වෙයාර් `OMNIROUTE_API_KEY` `Bearer <key>` ලෙස පමණක් ගනී; හිස් යතුරක් හෝ `Bearer` ට පසු ටැබ් එකක් `401` ලබා ගනී.
- `requireLogin=false`, හෝ ඇතුල් වීමට පෙර loopback කවුළුව: `REQUIRE_API_KEY=true` සමඟ ඕනෑම වලංගු OmniRoute API යතුරක් හෝ කළමනාකරණ අක්තපත්‍රයක් පිළිගනු ලබන අතර නිර්නාමික ඇමතුම්කරුවන්ට `401` ලැබේ ; `REQUIRE_API_KEY` සමඟ මාර්ග විවෘතව ඇත.
- එම විචල්‍යය සකසා `REQUIRE_API_KEY` අක්‍රිය වූ විට `POST /api/a2a/tasks` හට `Authorization` ශීර්ෂයේ `OMNIROUTE_API_KEY` අවශ්‍ය වේ. `x-api-key` වැනි අනෙකුත් ශීර්ෂයන් එහි ගණන් නොගනී. ප්‍රවිෂ්ට වීමත් සමඟ හෝ ඇතුල් වීමට පෙර යතුර `Bearer` උපසර්ගයක් සහිතව හෝ රහිතව ගමන් කරයි; පුරනය වීමත් සමග, `Bearer <key>` පමණක් මිඩ්ල්වෙයාර් ඉක්මවා යයි.

අක්තපත්‍රයක් අවශ්‍ය නම්, `read` -scope `oma_` ටෝකනයක් ක්‍රියා කරන්නේ `GET` සඳහා පමණි.

**පැමිණෙන සන්නායක නියෝජිත කණ්ඩායම (`POST /api/a2a/tasks`):** බාහිර A2A නියෝජිතයන් OmniRoute හරහා OmniConductor බලඇණියට කේතීකරණ කටයුතු පවරයි. ශරීරය: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — පමණක් කොන්දොස්තර යාත්‍රා කුසලතා (නියෝජිත කාඩ්පතේ ප්‍රකාශ කර ඇති ඒවා) පැවරිය හැකිය; `metadata.conductor.repo.url` අවශ්‍ය වේ (ඇණිය git repo මත ක්‍රියා කරයි). මාර්ගය සේවාදායක පැත්තේ `CONDUCTOR_ORCHESTRATOR_TOKEN` (Fallback `CONDUCTOR_HUB_TOKEN`) භාවිතයෙන් hub හි `POST /v1/tasks` වෙත පරිවර්තනය කර `201 { conductor_task_id, state: "submitted" }` ආපසු ලබා දෙයි ; කාර්ය තත්වයන් SSE→A2A දර්පණය (RF1) හරහා ආපසු ගලා යන අතර `GET /api/a2a/tasks?skill=conductor` හරහා දෘශ්‍යමාන වේ.

---

## නව කුසලතා එකතු කිරීම

1. **කුසලතා ගොනුවක් සාදන්න:** `src/lib/a2a/skills/<your-skill>.ts`

   async ශ්‍රිතයක් අපනයනය කරන්න `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. `smartRouting.ts` වැනි පවතින කුසලතා වල හැඩය අනුගමනය කරන්න. කුසලතාව HTTP හරහා OmniRoute වෙත ආපසු කැඳවන්නේ නම්, `src/lib/a2a/selfLoopAuth.ts` වෙතින් `buildSelfLoopHeaders(caller)` සමඟ ශීර්ෂ ගොඩනඟන්න, එවිට ඇමතුම `OMNIROUTE_API_KEY` නොව A2A ඇමතුම්කරුගේ යතුර සමඟින් ක්‍රියාත්මක වන අතර යළි-යොමුවීමක් කිසිදා යතුර ලබා නොගන්නා ලෙස `redirect: "error"` `fetch` වෙත යවන්න. සහායකයා ශීර්ෂයන් පමණක් ගොඩනඟයි; එක් එක් කුසලතා යළි-යොමු ප්‍රතිපත්තියම සකසයි. විසඳන ලද URL පුද්ගලික ජාලයෙන් පිටත සරල http (ලූප්බැක්, බහාලුමක් හෝ සේවා නමක් සහ පුද්ගලික ලිපින හොඳයි) හෝ අක්තපත්‍ර ඇති විට යතුරක් අමුණනවාට වඩා එය `UnsafeSelfLoopTargetError` විසි කරයි, එබැවින් ප්‍රතික්ෂේප වූ ඇමතුම් ගිල දමන කුසලතාවයක් එම දෝෂය නැවත ඉවත් කළ යුතුය.

2. **ලියාපදිංචි හසුරුවන්නා:** `src/lib/a2a/taskExecution.ts` හි, `A2A_SKILL_HANDLERS` වෙත ප්‍රවේශයක් එක් කරන්න:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **නියෝජිත කාඩ්පත තුළ නිරාවරණය කරන්න:** `src/lib/a2a/agentCardMetadata.ts` හි ( `/.well-known/agent.json` සහ `/.well-known/agent-card.json` විසින් බෙදා ගන්නා ලද), `skills` අරාවට එකතු කරන්න:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **පරීක්ෂණ ලියන්න:** `tests/unit/a2a-<your-skill>.test.ts` සතුටු මාර්ගය + දෝෂ මාර්ගය ආවරණය කරන්න.

5. **ලේඛනය** මෙම ගොනුවේ `Available Skills` වගුවේ නව කුසලතාව.

---

## කාර්ය TTL

කාර්ය `ttlMinutes` කාලයෙන් පසු කල් ඉකුත් වේ (පෙරනිමියෙන් මිනිත්තු 5කි) — මෙය `src/lib/a2a/taskManager.ts:82` හි ඇති `A2ATaskManager` constructor එක තුළ වින්යාස කර ඇත. අභිරුචිකරණය කිරීමට, `A2ATaskManager` නිදර්ශනය fork කර වෙනත් අගයක් ලබා දෙන්න (උදා., මිනිත්තු 15ක TTL එකක් සඳහා `new A2ATaskManager(15)`). පසුබිම් interval එකක් සෑම තත්පර 60කට වරක් කල් ඉකුත් වූ කාර්ය ඉවත් කරයි.

---

## කාර්ය ජීවන චක්රය

```
ඉදිරිපත් කළා → ක්රියාත්මක වෙමින් → සම්පූර්ණයි
                                 → අසාර්ථකයි
                                 → අවලංගුයි
```

- පෙරනිමියෙන් කාර්ය මිනිත්තු 5කට පසු කල් ඉකුත් වේ ([කාර්ය TTL](#task-ttl) බලන්න)
- අවසාන තත්ත්ව: `completed`, `failed`, `cancelled`
- සිදුවීම් ලොගය සෑම තත්ත්ව සංක්රාන්තියක්ම වාර්තා කරයි

---

## දෝෂ කේත

| කේතය   | අර්ථය                                  |
| :----- | :------------------------------------- |
| -32700 | විග්රහ කිරීමේ දෝෂයකි (වලංගු නොවන JSON) |
| -32600 | වලංගු නොවන ඉල්ලීමක් / අවසර නොලැබීම     |
| -32601 | ක්රමය හෝ කුසලතාව හමු නොවීය             |
| -32602 | වලංගු නොවන පරාමිති                     |
| -32603 | අභ්යන්තර දෝෂයකි                        |
| -32000 | A2A endpoint එක අක්රිය කර ඇත           |

---

## ඒකාබද්ධ කිරීමේ උදාහරණ

### පයිතන් (ඉල්ලීම්)

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

### TypeScript (ගෙන එන්න)

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
