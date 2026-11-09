# OmniRoute A2A Server Documentation (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent протокол v0.3 — OmniRoute као интелигентни агент за рутирање

A2A интерфејс има два облика:

- **JSON-RPC 2.0** на `POST /a2a` (канонска улазна тачка, дефинисана у `src/app/a2a/route.ts`).
- **REST** у оквиру `/api/a2a/*` за контролне табле и алате (статус, листа задатака, отказивање).

Задаци се прате помоћу `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, подразумевани TTL од 5 минута). Вештине се прослеђују путем `A2A_SKILL_HANDLERS` у `src/lib/a2a/taskExecution.ts`.

## Откривање агента

```bash
curl http://localhost:20128/.well-known/agent.json
```

Враћа Agent Card који описује могућности, вештине и захтеве за аутентикацију OmniRoute-а.

Поље `version` у Agent Card-у преузима се из `process.env.npm_package_version` (видети `src/app/.well-known/agent.json/route.ts:13`), тако да остаје аутоматски синхронизовано са `package.json` при сваком издању.

---

## Аутентикација

Сви захтеви на `/a2a` захтевају API кључ преко заглавља `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Ако на серверу није конфигурисан API кључ, аутентикација се заобилази.

## Активирање

A2A се контролише преко прекидача **Endpoints → A2A** и подразумевано је онемогућен. Када је онемогућен,
`GET /api/a2a/status` пријављује `status: "disabled"` и `online: false`; JSON-RPC позиви на
`POST /a2a` враћају HTTP 503 са JSON-RPC грешком кода `-32000`.

---

## JSON-RPC 2.0 методе

### `message/send` — Синхроно извршавање

Шаље поруку вештини и чека потпун одговор.

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

За `smart-routing`, `metadata.combo` представља експлицитно замењивање вредности
`metadata.model` за захтев мрежном пролазу; шаље се као стварни `model`,
а не као игнорисано `x-combo` JSON поље. И даље се примењују уобичајени API кључ
мрежног пролаза и ауторизација по циљу. Неважећа или празна комбинација се одбија.

Резултат садржи `requested_combo` (намера позиваоца), `dispatched_model`
(стварни захтев мрежном пролазу), `response_model` (одговор мрежног пролаза) и
`confirmed_combo`. Последње поље има вредност `null` осим ако мрежни пролаз
експлицитно не идентификује комбинацију. A2A евиденције одлука приписују извршавање
само потврђеној комбинацији, док се непотврђени захтев задржава као `requestedCombo`.

**Одговор:**

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

### `message/stream` — SSE стримовање

Исто као `message/send`, али враћа догађаје које шаље сервер ради стримовања у реалном времену.

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

**SSE догађаји:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Провера статуса задатка

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Отказивање задатка

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Доступне вештине

OmniRoute открива 6 A2A вештина повезаних у `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Сваки модул вештина живи у `src/lib/a2a/skills/`.

| Вештина            | ID                   | Опис                                                                                                                                                                 | Ознаке                    | Примери                                      |
| :----------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------ | :------------------------------------------- |
| Смарт Роутинг      | `smart-routing`      | Усмерава промпт кроз оптимални provider/combo користећи OmniRoute-ов комбиновани механизам + бодовања                                                                | рутирање, провајдери      | „Усмери овај упит преко најбољег модела“     |
| Управљање квотама  | `quota-management`   | Извештава о стању квоте по провајдеру, помаже позиваоцима да одлуче када да throttle/switch                                                                          | квота, провајдери         | „Проверите квоту за антропе“                 |
| Провидер Дисцовери | `provider-discovery` | Наводи инсталиране провајдере са могућностима, заставице слободног нивоа, OAuth статус                                                                               | провајдери, откриће       | „Који су провајдери доступни?“               |
| Анализа трошкова   | `cost-analysis`      | Процењује цену request/conversation с обзиром на недавну употребу каталога +                                                                                         | цена, употреба            | „Процена цене за овај разговор“              |
| Хеалтх Репорт      | `health-report`      | Обједињује прекидач, хлађење, стање закључавања по провајдеру                                                                                                        | здравље, отпорност        | „Прикажи здравствени статус свих провајдера“ |
| Листа могућности   | `list-capabilities`  | Враћа комплетан каталог вештина агената од 45 уноса (23 API + 21 CLI + 1 конфигурација) као табелу смањења вредности са сировим SKILL.md URLs за убацивање контекста | каталог, откриће, вештине | „Наведите све OmniRoute могућности“          |

> Картица агента треба да буде усклађена са активним каталогом 381-провајдера; Број провајдера и метаподаци free/no-auth потичу из регистра времена извршавања.

### `list-capabilities` Детаљи вештине

`list-capabilities` вештина је посебно корисна за спољне агенте који треба да открију шта OmniRoute открива пре него што пошаљу API позиве. Враћа артефакт структуриране табеле марака:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Сваки ред укључује `rawUrl` колону тако да агенти могу одмах да дохвате пун SKILL.md. Поље `metadata.totalSkills` одражава величину каталога (45 данас). Имплементација: `src/lib/a2a/skills/listCapabilities.ts`. Види такође [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (помоћни)

ЈСОН-РПЦ крајња тачка `/a2a` је канонска улазна тачка A2A. REST крајње тачке у наставку пружају помоћни приступ за контролне табле и спољне алате:

| Крајња тачка                 | Метод | Опис                                                         | Аутх                                                                                                       |
| :--------------------------- | :---- | :----------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET   | Статус сервера, регистроване вештине                         | (јавно)                                                                                                    |
| `/api/a2a/tasks`             | GET   | Наведите задатке са филтерима                                | управљање или API кључ (погледајте доле)                                                                   |
| `/api/a2a/tasks/[id]`        | GET   | Добијте задатак од ID                                        | управљање или API кључ (погледајте доле)                                                                   |
| `/api/a2a/tasks/[id]/cancel` | POST  | Откажите покренути задатак                                   | управљање или API кључ (погледајте доле)                                                                   |
| `/.well-known/agent.json`    | GET   | Картица агента (A2A дисцовери)                               | (јавно, кеширано 3600с)                                                                                    |
| `/api/a2a/tasks`             | POST  | Долазна делегација у OmniConductor флоту (кондуктор PRD RF5) | исто као `GET`, плус `OMNIROUTE_API_KEY` ако је постављено док је `REQUIRE_API_KEY` искључен; `a2aEnabled` |

Ко ће проћи до `/api/a2a/tasks*` рута зависи од подешавања за пријаву и АПИ кључ:

- `requireLogin=true` (подразумевано): средњи софтвер прихвата само управљачке акредитиве (сесија контролне табле, `manage` -scope API кључ, `oma_` приступни токен) и `OMNIROUTE_API_KEY`. Обичан кључ за закључивање добија `403`. У `Authorization` заглављу средњи софтвер узима само `OMNIROUTE_API_KEY` као `Bearer <key>`; голи кључ или таб након што `Bearer` добије `401`.
- `requireLogin=false`, или прозор повратне петље пре укључивања: са `REQUIRE_API_KEY=true` сваки важећи OmniRoute API кључ или управљачки акредитиви се прихватају и анонимни позиваоци добијају `401`; са `REQUIRE_API_KEY` офф руте су отворене.
- `POST /api/a2a/tasks` додатно захтева `OMNIROUTE_API_KEY` у `Authorization` заглављу када је та променљива постављена, а `REQUIRE_API_KEY` искључен. Остала заглавља, као што је `x-api-key`, се ту не рачунају. Са одјављивањем или пре укључивања кључ пролази са или без `Bearer` префикса; са укљученим пријављивањем, само `Bearer <key>` пролази кроз средњи софтвер.

Тамо где је потребан акредитив, `read` -scope `oma_` токен ради само за `GET`.

**Делегација улазног кондуктера (`POST /api/a2a/tasks`):** екстерни A2A агенти делегирају посао кодирања OmniConductor флоти преко OmniRoute. Тело: само `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — Вештине диригентске флоте (оне објављене на картици агента) се могу делегирати; `metadata.conductor.repo.url` је обавезан (флота ради на гит репо-овима). Рута се преводи у `POST /v1/tasks` чворишта користећи `CONDUCTOR_ORCHESTRATOR_TOKEN` на страни сервера (резервни `CONDUCTOR_HUB_TOKEN`) и враћа `201 { conductor_task_id, state: "submitted" }`; стања задатака се враћају кроз SSE→A2A огледало (RF1) и видљива су преко `GET /api/a2a/tasks?skill=conductor`.

---

## Додавање нове вештине

1. **Креирајте датотеку вештина:** `src/lib/a2a/skills/<your-skill>.ts`

   Извезите асинхронизовану функцију `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Пратите облик постојећих вештина као што је `smartRouting.ts`. Ако се вештина позива назад у OmniRoute преко HTTP, направите заглавља са `buildSelfLoopHeaders(caller)` из `src/lib/a2a/selfLoopAuth.ts` тако да се позив изводи са кључем A2A позиваоца, а не `OMNIROUTE_API_KEY`, и проследите `redirect: "error"` на `fetch` тако да преусмеравање никада не добије кључ. Помоћник гради само заглавља; свака вештина сама поставља политику преусмеравања. Избацује `UnsafeSelfLoopTargetError` уместо да прилаже кључ када је решени основни URL обичан хттп ван приватне мреже (повратна петља, назив контејнера или услуге и приватне адресе су у реду) или држи акредитиве, тако да вештина која прогута одбијене позиве мора поново да избаци ту грешку.

2. **Руковалац регистром:** у `src/lib/a2a/taskExecution.ts`, додајте унос у `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Изложите на картици агента:** у `src/lib/a2a/agentCardMetadata.ts` (који деле `/.well-known/agent.json` и `/.well-known/agent-card.json`), додајте `skills` низу:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Напишите тестове:** `tests/unit/a2a-<your-skill>.test.ts`. Цовер хаппи патх + еррор патх.

5. **Документ** нова вештина у табели `Available Skills` ове датотеке.

---

## TTL zadatka

Zadaci ističu nakon `ttlMinutes` (podrazumevano 5 min) — konfigurisano u konstruktoru `A2ATaskManager` na `src/lib/a2a/taskManager.ts:82`. Za prilagođavanje, forkujte instanciranje `A2ATaskManager` i prosledite drugu vrednost (npr. `new A2ATaskManager(15)` za TTL od 15 minuta). Interval u pozadini čisti istekle zadatke svakih 60 sekundi.

---

## Životni ciklus zadatka

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Zadaci ističu nakon 5 minuta po podrazumevanim podešavanjima (vidi [TTL zadatka](#task-ttl))
- Terminalna stanja: `completed`, `failed`, `cancelled`
- Evidencija događaja prati svaku promenu stanja

---

## Kodovi grešaka

| Kod    | Značenje                            |
| :----- | :---------------------------------- |
| -32700 | Greška u parsiranju (nevažeći JSON) |
| -32600 | Nevažeći zahtev / Neautorizovano    |
| -32601 | Metoda ili vештina nije pronađena   |
| -32602 | Nevažeći parametri                  |
| -32603 | Interna greška                      |
| -32000 | A2A krajnja tačka je onemogućena    |

---

## Примери интеграције

### Питхон (захтеви)

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

### TypeScript (дохвати)

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
