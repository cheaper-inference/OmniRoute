# OmniRoute A2A Server Documentation (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Protocol Agent-to-Agent v0.3 — OmniRoute gẹ́gẹ́ bí aṣojú ìdarí-ọ̀nà ọlọ́gbọ́n

Ojú ìfarahàn A2A ní apá méjì:

- **JSON-RPC 2.0** ní `POST /a2a` (ibi ìwọlé àkọ́kọ́, tí a ṣàlàyé rẹ̀ nínú `src/app/a2a/route.ts`).
- **REST** lábẹ́ `/api/a2a/*` fún àwọn pánẹ́ẹ̀lì ìṣàkóso àti irinṣẹ́ (ipò, àkójọ iṣẹ́, ìfagilé).

`A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL ìṣètò àkọ́kọ́ ti ìṣẹ́jú márùn-ún) ló ń tọpinpin àwọn iṣẹ́. A ń pín àwọn ọgbọ́n-iṣẹ́ nípasẹ̀ `A2A_SKILL_HANDLERS` nínú `src/lib/a2a/taskExecution.ts`.

## Ìṣàwárí Aṣojú

```bash
curl http://localhost:20128/.well-known/agent.json
```

Ó máa ń dá Káàdì Aṣojú padà, èyí tí ó ṣàpèjúwe àwọn agbára OmniRoute, àwọn ọgbọ́n iṣẹ́, àti àwọn ìbéèrè ìfàṣẹsí rẹ̀.

A ń gba ààyè `version` Káàdì Aṣojú láti inú `process.env.npm_package_version` (wo `src/app/.well-known/agent.json/route.ts:13`), nítorí náà ó máa ń ṣe àfikún-ṣiṣẹpọ̀ láìfọwọ́ṣe pẹ̀lú `package.json` ní gbogbo ìtújáde.

---

## Ìfàṣẹsí

Gbogbo ìbéèrè `/a2a` nílò kọ́kọ́rọ́ API nípasẹ̀ àkọlé `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Tí kò bá sí kọ́kọ́rọ́ API tí a ṣètò lórí olùpèsè náà, a ó fo ìfàṣẹsí kọjá.

## Ìmúṣiṣẹ́

Yíyípadà **Endpoints → A2A** ló ń ṣàkóso A2A, a sì pa á ní àìṣe. Nígbà tí a bá pa á,
`GET /api/a2a/status` máa ń jábọ̀ `status: "disabled"` àti `online: false`; àwọn ìpè JSON-RPC sí
`POST /a2a` máa ń dá HTTP 503 padà pẹ̀lú kóòdù àṣìṣe JSON-RPC `-32000`.

---

## Àwọn Ọ̀nà JSON-RPC 2.0

### `message/send` — Ìmúṣẹ Amúṣiṣẹ́pọ̀

Ó fi ìfiranṣẹ́ ránṣẹ́ sí ọgbọ́n kan, ó sì dúró de èsì tó pé.

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

Fún `smart-routing`, `metadata.combo` jẹ́ ìṣàkóso-pàtó lórí
`metadata.model` fún ìbéèrè gateway; a máa ń fi í ránṣẹ́ gẹ́gẹ́ bí `model` gidi,
kì í ṣe gẹ́gẹ́ bí pápá JSON `x-combo` tí a kò fiyè sí. Ìfàṣẹsí API-key déédéé ti gateway àti
ìfàṣẹsí fún ibi-ìfojúsùn kọ̀ọ̀kan ṣì wúlò. A ó kọ combo tí kò tọ́ tàbí tí ó ṣófo.

Àbájáde náà ṣàfihàn `requested_combo` (èrò olùpè), `dispatched_model`
(ìbéèrè gateway gangan), `response_model` (èsì gateway) àti
`confirmed_combo`. Pápá tó gbẹ̀yìn yìí jẹ́ `null` àyàfi tí gateway bá
ṣàdámọ̀ combo kan ní kedere. Àwọn àkọọ́lẹ̀ ìpinnu A2A máa ń fi ìmúṣẹ kan mọ́
combo tí a ti fìdí rẹ̀ múlẹ̀ nìkan, tí wọ́n sì ń pa ìbéèrè tí a kò tíì fìdí rẹ̀ múlẹ̀ mọ́ gẹ́gẹ́ bí `requestedCombo`.

**Èsì:**

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

### `message/stream` — Ṣíṣàn SSE

Ó jẹ́ bákan náà pẹ̀lú `message/send`, ṣùgbọ́n ó máa ń dá àwọn Server-Sent Events padà fún ṣíṣàn ní àkókò gidi.

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

**Àwọn Ìṣẹ̀lẹ̀ SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Ṣàyẹ̀wò Ipò Iṣẹ́

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Fagilé Iṣẹ́ Kan

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Àwọn Ìmọ̀-Ìṣẹ́ Tó Wà

OmniRoute ń ṣàfihàn àwọn ìmọ̀-ìṣẹ́ A2A mẹ́fà tí a sopọ̀ nínú `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Modúlì ìmọ̀-ìṣẹ́ kọ̀ọ̀kan wà nínú `src/lib/a2a/skills/`.

| Ìmọ̀-Ìṣẹ́            | ID                   | Àpèjúwe                                                                                                                                                    | Àwọn Àmì                   | Àwọn Àpẹẹrẹ                                |
| :----------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :----------------------------------------- |
| Smart Routing      | `smart-routing`      | Ń darí ìbéèrè kan kọjá olùpèsè/combo tó yẹ jùlọ nílò ẹ̀rọ combo ti OmniRoute + ìdímejì (scoring)                                                            | routing, providers         | "Darí ìbéèrè yìí kọjá àpẹẹrẹ tó dára jùlọ" |
| Quota Management   | `quota-management`   | Ń ṣe ìròyìn ipò quota fún olùpèsè kọ̀ọ̀kan, ó sì ń ràn àwọn olùpè lọ́wọ́ láti pinnu ìgbà tí wọ́n yóò dínkù/ṣàyípadà                                             | quota, providers           | "Ṣàyẹ̀wò quota fún anthropic"               |
| Provider Discovery | `provider-discovery` | Ń ṣàkójọ àwọn olùpèsè tí a fi sọ́rọ̀ pẹ̀lú àwọn agbára wọn, àwọn àmì free-tier, àti ipò OAuth                                                                 | providers, discovery       | "Àwọn olùpèsè wo ni wọ́n wà?"               |
| Cost Analysis      | `cost-analysis`      | Ń ṣe ìṣirò iye owó ìbéèrè/ìjíròrò kan ní gbígbá kàtálógì + lílò láìpẹ́ yìí sínú rò                                                                          | cost, usage                | "Ṣe ìṣirò iye owó ìjíròrò yìí"             |
| Health Report      | `health-report`      | Ń ṣàkópọ̀ ipò circuit breaker, cooldown, àti lockout fún olùpèsè kọ̀ọ̀kan                                                                                     | health, resilience         | "Fi ipò èròjà gbogbo àwọn olùpèsè hàn"     |
| List Capabilities  | `list-capabilities`  | Ń dá kàtálógì Agent Skills kíkún pẹ̀lú ẹ̀yà 45 (23 API + 21 CLI + 1 config) padà gẹ́gẹ́ bí tábìlì markdown pẹ̀lú àwọn URL SKILL.md gangan fún context injection | catalog, discovery, skills | "Ṣàkójọ gbogbo àwọn agbára OmniRoute"      |

> Ó yẹ kí wọ́n máa mú kí Agent Card bá kàtálógì olùpèsè 376 tó ń ṣiṣẹ́ lọ́wọ́ mu; àwọn iye olùpèsè àti metadata free/no-auth ń wá láti inú runtime registry.

### Ẹ̀kúnrẹ́rẹ́ Ìmọ̀-Ìṣẹ́ `list-capabilities`

Ìmọ̀-ìṣẹ́ `list-capabilities` wúlò pàtó fún àwọn agent òde tí wọ́n nílò láti ṣàwárí ohun tí OmniRoute ń ṣàfihàn kí wọ́n tó fi àwọn ìpè API ránṣẹ́. Ó ń dá ohun-èlò tábìlì markdown tó ní ìlànà padà:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Ọ̀nà kọ̀ọ̀kan ní ọ̀wọ́n `rawUrl` nínú kí àwọn agent lè gba SKILL.md kíkún lẹ́sẹ̀kẹsẹ̀. Pàápàá `metadata.totalSkills` ń ṣe àfihàn ìtóbi kàtálógì (45 lónìí). Ìmúṣe: `src/lib/a2a/skills/listCapabilities.ts`. Tún wo [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (àfikún)

Ojú-ọ̀nà JSON-RPC `/a2a` ni ibi ìwọlé A2A àkọ́kọ́. Àwọn ojú-ọ̀nà REST tó wà nísàlẹ̀ ń pèsè ààyè ìráyè àfikún fún àwọn pátákó ìṣàkóso àti irinṣẹ́ ìta:

| Ojú-ọ̀nà                      | Ọ̀nà  | Àpèjúwe                                                     | Ìfàṣẹsí                                        |
| :--------------------------- | :--- | :---------------------------------------------------------- | :--------------------------------------------- |
| `/api/a2a/status`            | GET  | Ipò olupin, àwọn ọgbọ́n tí a forúkọsílẹ̀                      | (gbangba)                                      |
| `/api/a2a/tasks`             | GET  | Ṣàkójọ àwọn iṣẹ́ pẹ̀lú àwọn àsẹ                               | ìṣàkóso                                        |
| `/api/a2a/tasks/[id]`        | GET  | Gba iṣẹ́ nípasẹ̀ ID                                           | ìṣàkóso                                        |
| `/api/a2a/tasks/[id]/cancel` | POST | Fagilé iṣẹ́ tó ń lọ lọ́wọ́                                     | ìṣàkóso                                        |
| `/.well-known/agent.json`    | GET  | Káàdì Aṣojú (àwárí A2A)                                     | (gbangba, a pa á mọ́ fún 3600s)                 |
| `/api/a2a/tasks`             | POST | Ìfúnniṣẹ́ tó ń wọlé sí ikọ̀ OmniConductor (Conductor PRD RF5) | Bearer pẹ̀lú `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Ìfúnniṣẹ́ Conductor tó ń wọlé (`POST /api/a2a/tasks`):** àwọn aṣojú A2A ìta ń fi iṣẹ́ kíkọ kóòdù lé ikọ̀ OmniConductor lọ́wọ́ nípasẹ̀ OmniRoute. Ara: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — àwọn ọgbọ́n ikọ̀ Conductor nìkan (àwọn tí a kéde lórí Káàdì Aṣojú) ni a lè fi iṣẹ́ lé lọ́wọ́; `metadata.conductor.repo.url` jẹ́ dandan (ikọ̀ náà ń ṣiṣẹ́ lórí àwọn ibi ìpamọ́ git). Ojú-ọ̀nà náà ń yí ìbéèrè padà sí `POST /v1/tasks` ti hub nípa lílo `CONDUCTOR_ORCHESTRATOR_TOKEN` ní ẹ̀gbẹ́ olupin (àṣàyàn ìgbàkugbà `CONDUCTOR_HUB_TOKEN`) ó sì ń dá `201 { conductor_task_id, state: "submitted" }` padà; àwọn ipò iṣẹ́ ń padà wá nípasẹ̀ àwòrán SSE→A2A (RF1), a sì lè rí wọn nípasẹ̀ `GET /api/a2a/tasks?skill=conductor`.

---

## Fífi Ọgbọ́n Tuntun Kún Un

1. **Ṣẹ̀dá fáìlì ọgbọ́n:** `src/lib/a2a/skills/<your-skill>.ts`

   Gbé iṣẹ́ async kan jáde `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Tẹ̀lé ìrísí àwọn ọgbọ́n tó ti wà bíi `smartRouting.ts`.

2. **Forúkọsílẹ̀ olùtọ́jú:** nínú `src/lib/a2a/taskExecution.ts`, fi àkọsílẹ̀ kan kún `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...àwọn ọgbọ́n tó ti wà
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Ṣàfihàn rẹ̀ nínú Káàdì Aṣojú:** nínú `src/app/.well-known/agent.json/route.ts`, fi kún àkójọpọ̀ `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Kọ àwọn ìdánwò:** `tests/unit/a2a-<your-skill>.test.ts`. Ṣe àyẹ̀wò ipa ọ̀nà àṣeyọrí + ipa ọ̀nà àṣìṣe.

5. **Ṣàkọsílẹ̀** ọgbọ́n tuntun náà sínú tábìlì `Available Skills` ti fáìlì yìí.

---

## Àkókò Ìparí Iṣẹ́ (TTL)

Àwọn iṣẹ́ máa ń parí lẹ́yìn `ttlMinutes` (ìṣètò àkọ́kọ́ jẹ́ ìṣẹ́jú 5) — èyí ni a ṣètò nínú olùdásílẹ̀ `A2ATaskManager` ní `src/lib/a2a/taskManager.ts:82`. Láti ṣe àtúnṣe rẹ̀, ṣe ẹ̀ka tuntun láti inú ìpilẹ̀ṣẹ̀ `A2ATaskManager`, kí o sì fi iye mìíràn ránṣẹ́ (fún àpẹẹrẹ, `new A2ATaskManager(15)` fún TTL ìṣẹ́jú 15). Àárín-àkókò abẹ́lẹ̀ kan máa ń yọ àwọn iṣẹ́ tí ó ti parí kúrò ní gbogbo ìṣẹ́jú-àáyá 60.

---

## Ìgbésí-ayé Iṣẹ́

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Àwọn iṣẹ́ máa ń parí lẹ́yìn ìṣẹ́jú 5 ní ìṣètò àkọ́kọ́ (wo [Àkókò Ìparí Iṣẹ́ (TTL)](#task-ttl))
- Àwọn ipò ìkẹyìn: `completed`, `failed`, `cancelled`
- Àkọsílẹ̀ ìṣẹ̀lẹ̀ máa ń tọpa gbogbo ìyípadà ipò

---

## Àwọn Kóòdù Àṣìṣe

| Kóòdù  | Ìtumọ̀                               |
| :----- | :---------------------------------- |
| -32700 | Àṣìṣe ìtúpalẹ̀ (JSON tí kò bófin mu) |
| -32600 | Ìbéèrè tí kò bófin mu / Kò ní àṣẹ   |
| -32601 | Ọ̀nà tàbí ọgbọ́n kò rí                |
| -32602 | Àwọn paramita tí kò bófin mu        |
| -32603 | Àṣìṣe inú                           |
| -32000 | A ti pa ojú-ọ̀nà A2A                 |

---

## Àwọn Àpẹẹrẹ Ìṣọ̀kan

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
