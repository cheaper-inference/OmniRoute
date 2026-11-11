# OmniRoute A2A Server Documentation (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — એક બુદ્ધિશાળી રૂટિંગ એજન્ટ તરીકે OmniRoute

A2A સપાટીના બે સ્વરૂપો છે:

- `POST /a2a` પર **JSON-RPC 2.0** (પ્રમાણભૂત પ્રવેશ બિંદુ, `src/app/a2a/route.ts`માં વ્યાખ્યાયિત).
- ડૅશબોર્ડ અને ટૂલિંગ માટે `/api/a2a/*` હેઠળ **REST** (સ્થિતિ, ટાસ્ક સૂચિ, રદ કરવું).

ટાસ્કને `A2ATaskManager` દ્વારા ટ્રૅક કરવામાં આવે છે (`src/lib/a2a/taskManager.ts`, ડિફૉલ્ટ 5-મિનિટ TTL). કૌશલ્યોને `src/lib/a2a/taskExecution.ts`માં રહેલા `A2A_SKILL_HANDLERS` દ્વારા ડિસ્પૅચ કરવામાં આવે છે.

## એજન્ટ શોધ

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRouteની ક્ષમતાઓ, કૌશલ્યો અને પ્રમાણીકરણ જરૂરિયાતોનું વર્ણન કરતું Agent Card પરત કરે છે.

Agent Cardનું `version` ફીલ્ડ `process.env.npm_package_version`માંથી મેળવવામાં આવે છે (`src/app/.well-known/agent.json/route.ts:13` જુઓ), તેથી તે દરેક રિલીઝ વખતે `package.json` સાથે આપમેળે સિંક રહે છે.

---

## પ્રમાણીકરણ

બધી `/a2a` વિનંતીઓ માટે `Authorization` હેડર મારફતે API કી જરૂરી છે:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

જો સર્વર પર કોઈ API કી ગોઠવેલી ન હોય, તો પ્રમાણીકરણને બાયપાસ કરવામાં આવે છે.

## સક્ષમીકરણ

A2Aને **Endpoints → A2A** ટૉગલ દ્વારા નિયંત્રિત કરવામાં આવે છે અને તે ડિફૉલ્ટ રૂપે અક્ષમ હોય છે. અક્ષમ હોય ત્યારે,
`GET /api/a2a/status` દ્વારા `status: "disabled"` અને `online: false` રિપોર્ટ કરવામાં આવે છે; `POST /a2a` પરના JSON-RPC કૉલ્સ JSON-RPC ભૂલ કોડ `-32000` સાથે HTTP 503 પરત કરે છે.

---

## JSON-RPC 2.0 પદ્ધતિઓ

### `message/send` — સમકાલીન અમલીકરણ

કોઈ સ્કિલને સંદેશ મોકલે છે અને સંપૂર્ણ પ્રતિસાદની રાહ જુએ છે.

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

`smart-routing` માટે, ગેટવે વિનંતીમાં `metadata.combo` એ
`metadata.model`નું સ્પષ્ટ ઓવરરાઇડ છે; તેને અવગણવામાં આવતા `x-combo` JSON ફીલ્ડ તરીકે નહીં,
પરંતુ વાસ્તવિક `model` તરીકે મોકલવામાં આવે છે. ગેટવેની સામાન્ય API-કી અને
દરેક ટાર્ગેટ માટેની અધિકૃતતા હજુ પણ લાગુ પડે છે. અમાન્ય અથવા ખાલી કોમ્બો નકારવામાં આવે છે.

પરિણામ `requested_combo` (કૉલરનો આશય), `dispatched_model`
(વાસ્તવિક ગેટવે વિનંતી), `response_model` (ગેટવે પ્રતિસાદ) અને
`confirmed_combo` દર્શાવે છે. ગેટવે સ્પષ્ટપણે કોઈ કોમ્બોને ઓળખાવે નહીં ત્યાં સુધી છેલ્લું ફીલ્ડ `null`
રહે છે. A2A નિર્ણય લૉગ્સ અમલીકરણને માત્ર પુષ્ટિ થયેલા
કોમ્બો સાથે સાંકળે છે અને અપુષ્ટ વિનંતીને `requestedCombo` તરીકે જાળવી રાખે છે.

**પ્રતિસાદ:**

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

### `message/stream` — SSE સ્ટ્રીમિંગ

`message/send` જેવું જ છે, પરંતુ રીઅલ-ટાઇમ સ્ટ્રીમિંગ માટે Server-Sent Events પરત કરે છે.

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

**SSE ઇવેન્ટ્સ:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — ટાસ્કની સ્થિતિ જાણો

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ટાસ્ક રદ કરો

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ઉપલબ્ધ કૌશલ્યો

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` માં વાયર્ડ 6 A2A કૌશલ્યોનો પર્દાફાશ કરે છે. દરેક કૌશલ્ય મોડ્યુલ `src/lib/a2a/skills/` માં રહે છે.

| કૌશલ્ય            | ID                   | વર્ણન                                                                                                                                                | ટૅગ્સ                  | ઉદાહરણો                                      |
| :---------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------- | :------------------------------------------- |
| સ્માર્ટ રૂટીંગ    | `smart-routing`      | OmniRoute ના કોમ્બો એન્જિન + સ્કોરિંગનો ઉપયોગ કરીને શ્રેષ્ઠ provider/combo દ્વારા પ્રોમ્પ્ટને રૂટ કરે છે                                             | રૂટીંગ, પ્રદાતાઓ       | "શ્રેષ્ઠ મોડેલ દ્વારા આ પ્રોમ્પ્ટને રૂટ કરો" |
| ક્વોટા મેનેજમેન્ટ | `quota-management`   | પ્રતિ-પ્રદાતા ક્વોટા રાજ્યની જાણ કરે છે, કોલર્સને ક્યારે throttle/switch કરવું તે નક્કી કરવામાં મદદ કરે છે                                           | ક્વોટા, પ્રદાતાઓ       | "એન્થ્રોપિક માટે ક્વોટા તપાસો"               |
| પ્રદાતા ડિસ્કવરી  | `provider-discovery` | ક્ષમતાઓ, ફ્રી-ટાયર ફ્લેગ્સ, OAuth સ્ટેટસ સાથે સ્થાપિત પ્રદાતાઓની સૂચિ બનાવે છે                                                                       | પ્રદાતાઓ, શોધ          | "કયા પ્રદાતાઓ ઉપલબ્ધ છે?"                    |
| ખર્ચ વિશ્લેષણ     | `cost-analysis`      | કેટલોગ + તાજેતરના વપરાશને જોતાં request/conversation ની કિંમતનો અંદાજ કાઢે છે                                                                        | ખર્ચ, વપરાશ            | "આ વાર્તાલાપ માટે અંદાજિત ખર્ચ"              |
| આરોગ્ય અહેવાલ     | `health-report`      | પ્રદાતા દીઠ એકંદર સર્કિટ બ્રેકર, કૂલડાઉન, લોકઆઉટ સ્થિતિ                                                                                              | આરોગ્ય, સ્થિતિસ્થાપકતા | "તમામ પ્રદાતાઓની આરોગ્ય સ્થિતિ બતાવો"        |
| સૂચિ ક્ષમતાઓ      | `list-capabilities`  | સંદર્ભ ઇન્જેક્શન માટે કાચા SKILL.md URLs સાથે માર્કડાઉન ટેબલ તરીકે સંપૂર્ણ 45-એન્ટ્રી એજન્ટ સ્કિલ્સ કૅટેલોગ (23 API + 21 CLI + 1 રૂપરેખા) પરત કરે છે | સૂચિ, શોધ, કુશળતા      | "બધી OmniRoute ક્ષમતાઓની સૂચિ બનાવો"         |

> એજન્ટ કાર્ડને લાઇવ 382-પ્રદાતા કેટેલોગ સાથે સંરેખિત રાખવું જોઈએ; પ્રદાતાની ગણતરીઓ અને free/no-auth મેટાડેટા રનટાઇમ રજિસ્ટ્રીમાંથી મેળવવામાં આવે છે.

### `list-capabilities` કૌશલ્ય વિગતો

`list-capabilities` કૌશલ્ય ખાસ કરીને બાહ્ય એજન્ટો માટે ઉપયોગી છે જેમને API કૉલ્સ મોકલતા પહેલા OmniRoute શું બહાર પાડે છે તે શોધવાની જરૂર છે. તે સ્ટ્રક્ચર્ડ માર્કડાઉન ટેબલ આર્ટિફેક્ટ પરત કરે છે:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

દરેક પંક્તિમાં `rawUrl` કૉલમનો સમાવેશ થાય છે જેથી એજન્ટો તરત જ સંપૂર્ણ SKILL.md મેળવી શકે. `metadata.totalSkills` ફીલ્ડ કેટલોગના કદને પ્રતિબિંબિત કરે છે (45 આજે). અમલીકરણ: `src/lib/a2a/skills/listCapabilities.ts`. [AGENT-SKILLS.md](./AGENT-SKILLS.md) પણ જુઓ.

---

## REST API (સહાયક)

JSON-RPC એન્ડપોઇન્ટ `/a2a` એ કેનોનિકલ A2A એન્ટ્રી પોઇન્ટ છે. નીચે આપેલા REST એન્ડપોઇન્ટ્સ ડેશબોર્ડ્સ અને બાહ્ય ટૂલિંગ માટે સહાયક ઍક્સેસ પ્રદાન કરે છે:

| અંતિમ બિંદુ                  | પદ્ધતિ | વર્ણન                                                       | ઓથ                                                                                                 |
| :--------------------------- | :----- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET    | સર્વર સ્થિતિ, નોંધાયેલ કુશળતા                               | (જાહેર)                                                                                            |
| `/api/a2a/tasks`             | GET    | ફિલ્ટર્સ સાથે કાર્યોની સૂચિ બનાવો                           | મેનેજમેન્ટ અથવા API કી (નીચે જુઓ)                                                                  |
| `/api/a2a/tasks/[id]`        | GET    | ID દ્વારા કાર્ય મેળવો                                       | મેનેજમેન્ટ અથવા API કી (નીચે જુઓ)                                                                  |
| `/api/a2a/tasks/[id]/cancel` | POST   | ચાલી રહેલ કાર્ય રદ કરો                                      | મેનેજમેન્ટ અથવા API કી (નીચે જુઓ)                                                                  |
| `/.well-known/agent.json`    | GET    | એજન્ટ કાર્ડ (A2A શોધ)                                       | (સાર્વજનિક, કેશ્ડ 3600)                                                                            |
| `/api/a2a/tasks`             | POST   | OmniConductor ફ્લીટમાં ઇનબાઉન્ડ ડેલિગેશન (કન્ડક્ટર PRD RF5) | `GET`, વત્તા `OMNIROUTE_API_KEY` જો સેટ કરેલ હોય તો જ્યારે `REQUIRE_API_KEY` બંધ હોય; `a2aEnabled` |

`/api/a2a/tasks*` રૂટ પર કોણ પહોંચે છે તે લોગિન અને API-કી સેટિંગ્સ પર આધાર રાખે છે:

- `requireLogin=true` (ડિફૉલ્ટ): મિડલવેર માત્ર મેનેજમેન્ટ ઓળખપત્રો (ડૅશબોર્ડ સત્ર, `manage` -scope API કી, `oma_` ઍક્સેસ ટોકન) અને `OMNIROUTE_API_KEY` સ્વીકારે છે. સાદી અનુમાન કીને `403` મળે છે. `Authorization` હેડરમાં મિડલવેર માત્ર `OMNIROUTE_API_KEY` `Bearer <key>` તરીકે લે છે; `Bearer` `401` મળ્યા પછી એકદમ કી અથવા ટેબ.
- `requireLogin=false`, અથવા ઓનબોર્ડિંગ પહેલાં લૂપબેક વિન્ડો: `REQUIRE_API_KEY=true` સાથે કોઈપણ માન્ય OmniRoute API કી અથવા મેનેજમેન્ટ ઓળખપત્ર સ્વીકારવામાં આવે છે અને અનામી કૉલર્સને `401` મળે છે; `REQUIRE_API_KEY` બંધ સાથે માર્ગો ખુલ્લા છે.
- `POST /api/a2a/tasks` વધુમાં `Authorization` હેડરમાં `OMNIROUTE_API_KEY` જરૂર પડે છે જ્યારે તે ચલ સેટ હોય અને `REQUIRE_API_KEY` બંધ હોય. અન્ય હેડરો, જેમ કે `x-api-key`, ત્યાં ગણતરી કરતા નથી. લોગિન ઓફ સાથે અથવા ઓનબોર્ડિંગ પહેલાં કી `Bearer` ઉપસર્ગ સાથે અથવા વગર પસાર થાય છે; લૉગિન ઑન સાથે, માત્ર `Bearer <key>` જ મિડલવેરમાંથી પસાર થાય છે.

જ્યાં ઓળખપત્રની આવશ્યકતા હોય, ત્યાં `read` -scope `oma_` ટોકન માત્ર `GET` માટે જ કામ કરે છે.

**ઇનબાઉન્ડ કંડક્ટર પ્રતિનિધિમંડળ (`POST /api/a2a/tasks`):** બાહ્ય A2A એજન્ટો OmniRoute દ્વારા OmniConductor ફ્લીટને કોડિંગ કાર્ય સોંપે છે. મુખ્ય ભાગ: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — માત્ર કંડક્ટર ફ્લીટ કૌશલ્યો (જે એજન્ટ કાર્ડ પર જાહેર કરવામાં આવ્યા છે) સોંપી શકાય તેવા છે; `metadata.conductor.repo.url` જરૂરી છે (કાફલો git repos પર કામ કરે છે). રૂટ સર્વર-સાઇડ `CONDUCTOR_ORCHESTRATOR_TOKEN` (fallback `CONDUCTOR_HUB_TOKEN`) નો ઉપયોગ કરીને હબના `POST /v1/tasks` માં અનુવાદ કરે છે અને `201 { conductor_task_id, state: "submitted" }` પરત કરે છે; કાર્ય સ્થિતિઓ SSE→A2A મિરર (RF1) દ્વારા પાછા વહે છે અને `GET /api/a2a/tasks?skill=conductor` દ્વારા દૃશ્યમાન છે.

---

## નવું કૌશલ્ય ઉમેરવું

1. **કુશળતા ફાઇલ બનાવો:** `src/lib/a2a/skills/<your-skill>.ts`

   async ફંક્શન `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>` નિકાસ કરો. `smartRouting.ts` જેવી હાલની કુશળતાના આકારને અનુસરો. જો કૌશલ્ય પાછા HTTP પર OmniRoute માં કૉલ કરે છે, તો `src/lib/a2a/selfLoopAuth.ts` થી `buildSelfLoopHeaders(caller)` સાથે હેડર બનાવો જેથી કૉલ `OMNIROUTE_API_KEY` નહીં, A2A કૉલરની કી વડે ચાલે અને `redirect: "error"` ને `fetch` માં પાસ કરો જેથી રીડાયરેક્ટને ક્યારેય કી ન મળે. સહાયક ફક્ત હેડરો બનાવે છે; દરેક કૌશલ્ય રીડાયરેક્ટ પોલિસી પોતે સેટ કરે છે. જ્યારે ઉકેલાયેલ આધાર URL ખાનગી નેટવર્કની બહાર સાદો HTTP હોય (લૂપબેક, કન્ટેનર અથવા સેવાનું નામ અને ખાનગી સરનામાં સારા હોય) અથવા ઓળખપત્રો ધરાવે છે ત્યારે તે કી જોડવાને બદલે `UnsafeSelfLoopTargetError` ફેંકે છે, તેથી એક કૌશલ્ય કે જે નકારેલા કૉલ્સને ગળી જાય છે તેણે તે ભૂલને પુનઃથ્રોવી જોઈએ.

2. **નોંધણી હેન્ડલર:** `src/lib/a2a/taskExecution.ts` માં, `A2A_SKILL_HANDLERS` માં એન્ટ્રી ઉમેરો:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **એજન્ટ કાર્ડમાં એક્સપોઝ કરો:** `src/lib/a2a/agentCardMetadata.ts` માં ( `/.well-known/agent.json` અને `/.well-known/agent-card.json` દ્વારા વહેંચાયેલ), `skills` એરેમાં જોડો:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **પરીક્ષણો લખો:** `tests/unit/a2a-<your-skill>.test.ts` કવર હેપી પાથ + એરર પાથ.

5. **દસ્તાવેજ** આ ફાઇલના `Available Skills` ટેબલમાં નવી કુશળતા.

---

## ટાસ્ક TTL

ટાસ્ક `ttlMinutes` પછી સમાપ્ત થાય છે (ડિફૉલ્ટ 5 મિનિટ) — જે `src/lib/a2a/taskManager.ts:82` પરના `A2ATaskManager` કન્સ્ટ્રક્ટરમાં કૉન્ફિગર કરેલ છે. કસ્ટમાઇઝ કરવા માટે, `A2ATaskManager` ઇન્સ્ટેન્શિએશનને ફોર્ક કરો અને અલગ મૂલ્ય પાસ કરો (દા.ત., 15-મિનિટના TTL માટે `new A2ATaskManager(15)`). બૅકગ્રાઉન્ડ ઇન્ટરવલ દર 60 સેકન્ડે સમાપ્ત થયેલા ટાસ્ક દૂર કરે છે.

---

## ટાસ્ક જીવનચક્ર

```
સબમિટ થયેલ → કાર્યરત → પૂર્ણ
                      → નિષ્ફળ
                      → રદ
```

- ટાસ્ક ડિફૉલ્ટ રૂપે 5 મિનિટ પછી સમાપ્ત થાય છે ([ટાસ્ક TTL](#task-ttl) જુઓ)
- અંતિમ સ્થિતિઓ: `completed`, `failed`, `cancelled`
- ઇવેન્ટ લૉગ દરેક સ્થિતિ પરિવર્તનને ટ્રૅક કરે છે

---

## ભૂલ કોડ

| કોડ    | અર્થ                      |
| :----- | :------------------------ |
| -32700 | પાર્સ ભૂલ (અમાન્ય JSON)   |
| -32600 | અમાન્ય વિનંતી / અનધિકૃત   |
| -32601 | પદ્ધતિ અથવા સ્કિલ મળી નથી |
| -32602 | અમાન્ય પેરામીટર્સ         |
| -32603 | આંતરિક ભૂલ                |
| -32000 | A2A એન્ડપૉઇન્ટ અક્ષમ છે   |

---

## એકીકરણ ઉદાહરણો

### પાયથોન (વિનંતીઓ)

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

### TypeScript (આવવું)

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
