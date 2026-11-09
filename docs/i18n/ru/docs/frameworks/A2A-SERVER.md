# OmniRoute A2A Server Documentation (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Протокол Agent-to-Agent v0.3 — OmniRoute как интеллектуальный агент маршрутизации

Интерфейс A2A представлен в двух вариантах:

- **JSON-RPC 2.0** по адресу `POST /a2a` (каноническая точка входа, определённая в `src/app/a2a/route.ts`).
- **REST** по адресам `/api/a2a/*` для панелей мониторинга и инструментов (состояние, список задач, отмена).

Задачи отслеживаются с помощью `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL по умолчанию — 5 минут). Навыки направляются соответствующим обработчикам через `A2A_SKILL_HANDLERS` в `src/lib/a2a/taskExecution.ts`.

## Обнаружение агента

```bash
curl http://localhost:20128/.well-known/agent.json
```

Возвращает карточку агента с описанием возможностей, навыков и требований к аутентификации OmniRoute.

Поле `version` карточки агента берётся из `process.env.npm_package_version` (см. `src/app/.well-known/agent.json/route.ts:13`), поэтому при каждом выпуске оно автоматически синхронизируется с `package.json`.

---

## Аутентификация

Для всех запросов к `/a2a` требуется API-ключ, передаваемый через заголовок `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Если на сервере не настроен API-ключ, аутентификация пропускается.

## Включение

A2A управляется переключателем **Endpoints → A2A** и по умолчанию отключён. Когда A2A отключён,
`GET /api/a2a/status` сообщает `status: "disabled"` и `online: false`; вызовы JSON-RPC к
`POST /a2a` возвращают HTTP 503 с кодом ошибки JSON-RPC `-32000`.

---

## Методы JSON-RPC 2.0

### `message/send` — Синхронное выполнение

Отправляет сообщение навыку и ожидает полный ответ.

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

Для `smart-routing` значение `metadata.combo` явно переопределяет
`metadata.model` в запросе к шлюзу; оно отправляется как фактическое значение `model`,
а не как игнорируемое JSON-поле `x-combo`. Стандартная проверка API-ключа шлюза и
авторизация для каждой целевой системы по-прежнему применяются. Недопустимое или пустое комбо отклоняется.

Результат содержит `requested_combo` (намерение вызывающей стороны), `dispatched_model`
(фактический запрос к шлюзу), `response_model` (ответ шлюза) и
`confirmed_combo`. Последнее поле имеет значение `null`, если шлюз явно
не идентифицирует комбо. Журналы решений A2A связывают выполнение только с
подтверждённым комбо, сохраняя неподтверждённый запрос как `requestedCombo`.

**Ответ:**

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

### `message/stream` — Потоковая передача SSE

Аналогичен `message/send`, но возвращает события Server-Sent Events для потоковой передачи в реальном времени.

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

**События SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Запрос статуса задачи

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Отмена задачи

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Доступные навыки

OmniRoute раскрывает 6 навыков A2A, встроенных в `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Каждый модуль навыков находится в `src/lib/a2a/skills/`.

| Навык                      | ID                   | Описание                                                                                                                                                                | Теги                      | Примеры                                         |
| :------------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------ | :---------------------------------------------- |
| Умная маршрутизация        | `smart-routing`      | Направляет подсказку через оптимальный provider/combo с использованием комбинированного механизма оценки + OmniRoute                                                    | маршрутизация, провайдеры | «Направьте это приглашение через лучшую модель» |
| Управление квотами         | `quota-management`   | Сообщает о состоянии квот каждого провайдера, помогает звонящим решить, когда следует выполнить throttle/switch                                                         | квота, провайдеры         | "Проверить квоту на антропность"                |
| Обнаружение поставщика     | `provider-discovery` | Перечисляет установленных поставщиков с возможностями, флагами бесплатного уровня и статусом OAuth                                                                      | провайдеры, открытие      | «Какие провайдеры доступны?»                    |
| Анализ затрат              | `cost-analysis`      | Оценивает стоимость request/conversation с учетом недавнего использования каталога +                                                                                    | стоимость, использование  | «Оцените стоимость этого разговора»             |
| Отчет о состоянии здоровья | `health-report`      | Агрегатный автоматический выключатель, время восстановления, состояние блокировки для каждого поставщика                                                                | здоровье, устойчивость    | «Показать состояние здоровья всех поставщиков»  |
| Список возможностей        | `list-capabilities`  | Возвращает полный каталог навыков агента из 45 записей (конфигурация 23 API + 21 CLI + 1) в виде таблицы уценки с необработанным SKILL.md URLs для внедрения контекста. | каталог, открытие, навыки | «Перечислить все возможности OmniRoute »        |

> Карточка агента должна соответствовать актуальному каталогу 384 поставщиков; Количество поставщиков и метаданные free/no-auth берутся из реестра среды выполнения.

### Подробности о навыках `list-capabilities`

Навык `list-capabilities` особенно полезен для внешних агентов, которым необходимо выяснить, что предоставляет OmniRoute прежде чем отправлять вызовы API. Он возвращает структурированный артефакт таблицы уценок:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Каждая строка включает столбец `rawUrl`, поэтому агенты могут немедленно получить полный SKILL.md. Поле `metadata.totalSkills` отражает размер каталога (сегодня 45). Реализация: `src/lib/a2a/skills/listCapabilities.ts`. См. также [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (вспомогательный)

Конечная точка JSON-RPC `/a2a` является канонической точкой входа A2A. Конечные точки REST, представленные ниже, обеспечивают вспомогательный доступ к панелям мониторинга и внешним инструментам:

| Конечная точка               | Метод | Описание                                                        | Авторизация                                                                                                   |
| :--------------------------- | :---- | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| `/api/a2a/status`            | GET   | Статус сервера, зарегистрированные навыки                       | (публичный)                                                                                                   |
| `/api/a2a/tasks`             | GET   | Список задач с фильтрами                                        | управление или ключ API (см. ниже)                                                                            |
| `/api/a2a/tasks/[id]`        | GET   | Получить задание от ID                                          | управление или ключ API (см. ниже)                                                                            |
| `/api/a2a/tasks/[id]/cancel` | POST  | Отменить выполнение задачи                                      | управление или ключ API (см. ниже)                                                                            |
| `/.well-known/agent.json`    | GET   | Карта агента (A2A Discovery)                                    | (публичный, кэшированный, 3600 с)                                                                             |
| `/api/a2a/tasks`             | POST  | Входящее делегирование в парк OmniConductor (проводник PRD RF5) | то же, что и `GET`, плюс `OMNIROUTE_API_KEY` если установлено, когда `REQUIRE_API_KEY` выключен; `a2aEnabled` |

Кто дозванивается до маршрутов `/api/a2a/tasks*`, зависит от настроек логина и API-ключа:

- `requireLogin=true` (по умолчанию): промежуточное программное обеспечение допускает только учетные данные управления (сеанс информационной панели, ключ `manage` -scope API, токен доступа `oma_` ) и `OMNIROUTE_API_KEY`. Простой ключ вывода получает `403`. В заголовке `Authorization` промежуточное программное обеспечение принимает `OMNIROUTE_API_KEY` только как `Bearer <key>`; голая клавиша или вкладка после того, как `Bearer` получит `401`.
- `requireLogin=false` или окно обратной связи перед подключением: с помощью `REQUIRE_API_KEY=true` принимается любой действительный ключ OmniRoute API или учетные данные управления, и анонимные вызывающие абоненты получают `401`; при отключении `REQUIRE_API_KEY` маршруты открыты.
- `POST /api/a2a/tasks` дополнительно требует `OMNIROUTE_API_KEY` в заголовке `Authorization`, когда эта переменная установлена, а `REQUIRE_API_KEY` выключен. Другие заголовки, такие как `x-api-key`, здесь не учитываются. При выключенном входе в систему или перед подключением ключ передается с префиксом `Bearer` или без него; при включенном входе в систему только `Bearer <key>` проходит мимо промежуточного программного обеспечения.

Если требуются учетные данные, токен `read` -scope `oma_` работает только для `GET`.

**Делегирование входящего проводника (`POST /api/a2a/tasks`):** внешние агенты A2A делегируют работу по кодированию группе OmniConductor через OmniRoute. Тело: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — можно делегировать только навыки флота проводников (те, которые указаны на карточке агента); `metadata.conductor.repo.url` требуется (флот работает с репозиториями git). Маршрут преобразуется в `POST /v1/tasks` концентратора с использованием `CONDUCTOR_ORCHESTRATOR_TOKEN` на стороне сервера (резервный `CONDUCTOR_HUB_TOKEN`) и возвращает `201 { conductor_task_id, state: "submitted" }`; Состояния задачи возвращаются через зеркало SSE→A2A (RF1) и видны через `GET /api/a2a/tasks?skill=conductor`.

---

## Добавление нового навыка

1. **Создать файл навыков:** `src/lib/a2a/skills/<your-skill>.ts`

   Экспортируйте асинхронную функцию `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Следуйте форме существующих навыков, таких как `smartRouting.ts`. Если навык вызывает обратный вызов в OmniRoute через HTTP, создайте заголовки с `buildSelfLoopHeaders(caller)` из `src/lib/a2a/selfLoopAuth.ts`, чтобы вызов выполнялся с ключом вызывающего объекта A2A, а не `OMNIROUTE_API_KEY`, и передайте `redirect: "error"` в `fetch`, чтобы перенаправление никогда не получало ключ. Помощник строит только заголовки; каждый навык сам устанавливает политику перенаправления. Он выдает `UnsafeSelfLoopTargetError` а не прикрепляет ключ, когда разрешенный базовый URL представляет собой простой http вне частной сети (петля, имя контейнера или службы и частные адреса подходят) или содержит учетные данные, поэтому навык, который поглощает отклоненные вызовы, должен повторно выдать эту ошибку.

2. **Обработчик регистрации:** в `src/lib/a2a/taskExecution.ts` добавьте запись в `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Разместить в карточке агента:** в `src/lib/a2a/agentCardMetadata.ts` (совместно используемом `/.well-known/agent.json` и `/.well-known/agent-card.json`) добавьте к массиву `skills` :

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Напишите тесты:** `tests/unit/a2a-<your-skill>.test.ts`. Обложка счастливого пути. Путь ошибки +.

5. **Документ** новый навык в таблице `Available Skills` этого файла.

---

## TTL задачи

Срок действия задач истекает через `ttlMinutes` (по умолчанию 5 минут) — этот параметр задаётся в конструкторе `A2ATaskManager` в `src/lib/a2a/taskManager.ts:82`. Чтобы изменить его, создайте собственный экземпляр `A2ATaskManager` и передайте другое значение (например, `new A2ATaskManager(15)` для TTL длительностью 15 минут). Фоновый процесс удаляет задачи с истёкшим сроком действия каждые 60 секунд.

---

## Жизненный цикл задачи

```
отправлена → выполняется → завершена
                        → завершена с ошибкой
                        → отменена
```

- По умолчанию срок действия задач истекает через 5 минут (см. [TTL задачи](#task-ttl))
- Терминальные состояния: `completed`, `failed`, `cancelled`
- Журнал событий отслеживает каждый переход между состояниями

---

## Коды ошибок

| Код    | Значение                              |
| :----- | :------------------------------------ |
| -32700 | Ошибка разбора (недопустимый JSON)    |
| -32600 | Недопустимый запрос / Нет авторизации |
| -32601 | Метод или навык не найден             |
| -32602 | Недопустимые параметры                |
| -32603 | Внутренняя ошибка                     |
| -32000 | Конечная точка A2A отключена          |

---

## Примеры интеграции

### Питон (запросы)

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

### TypeScript (принести)

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
