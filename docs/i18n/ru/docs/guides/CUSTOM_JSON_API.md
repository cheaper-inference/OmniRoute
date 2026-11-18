# Custom JSON API provider nodes (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Пользовательский узел JSON API подключает конечную бизнес-точку JSON, которая не поддерживает протокол OpenAI или Anthropic. OmniRoute заполняет шаблон запроса JSON, отправляет его в полную конечную точку URL, считывает ответ из пути ответа и возвращает его клиенту в собственном формате клиента (завершения чата, ответы, сообщения, ...).

Это OpenAI-совместимый узел с `apiType: "custom-json"`; его идентификатор имеет форму `openai-compatible-custom-json-<suffix>`. Форма панели управления пока недоступна. Создайте и отредактируйте эти узлы с помощью узла-провайдера API указанного ниже.

## Создать узел

`POST /api/provider-nodes` (аутентификация управления):

```json
{
  "type": "openai-compatible",
  "apiType": "custom-json",
  "name": "Business API",
  "prefix": "biz",
  "baseUrl": "https://api.example.com/v1/answer",
  "customHeaders": { "X-Tenant": "demo" },
  "customJson": {
    "method": "POST",
    "authType": "api-key",
    "authHeader": "X-Service-Key",
    "requestTemplate": {
      "project_id": "demo-project",
      "question": "{{prompt}}",
      "history": "{{messages}}"
    },
    "responsePath": "data.answer"
  }
}
```

- `baseUrl` - это** полный** конечная точка URL. Ничего не добавляется (ни `/chat/completions`, ни `/models`), и, в отличие от других узлов, совместимых с OpenAI, здесь нет URL по умолчанию. Это должен быть `http(s)` без встроенных учетных данных или `#fragment`, и он передает ту же исходящую защиту URL что и каждый узел поставщика, как при сохранении узла, так и при каждом запросе.
- Узел, который отправляет ключ подключения (`authType` `bearer` или `api-key`, включая значение по умолчанию), должен использовать `https://`. Обычный `http://` принимается только для хоста обратной связи (`localhost`, `127.0.0.0/8`, `::1`) или с `authType: "none"`, который не отправляет ключ. Частные адреса LAN (`10.x`, `172.16-31.x`, `192.168.x`) не являются исключением: любой в этой сети может прочитать ключ. Сохранение такого узла не выполняется с помощью `400`, а узел, сохраненный ранее, не закрывается при каждом запросе с тем же сообщением до отправки любого запроса. Для конечной точки с ключом на LAN поместите ее за TLS (например, обратный прокси-сервер).
- `customJson` проверяется с помощью Zod; неизвестные ключи отклоняются. Каждое поле является необязательным:

| Поле              | Ценности                                  | По умолчанию                                           |
| ----------------- | ----------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                    | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`               | `bearer`                                               |
| `authHeader`      | имя заголовка, используемое при `api-key` | `X-API-Key`                                            |
| `requestTemplate` | объект JSON (≤ 64 KB, глубина ≤ 32)       | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | путь поля, или `$` для всего тела         | `choices[0].message.content`                           |

- Секрет остается в ключе API соединения, а не в шаблоне. `bearer` отправляет `Authorization: Bearer <key>`; `api-key` отправляет `<authHeader>: <key>`. Заголовок аутентификации не может быть `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` или заголовком шаг за шагом. При использовании `none` соединениям не нужен ключ.
- Дополнительные статические заголовки используют обычный `customHeaders` узла (такая же проверка, как и для любого другого совместимого узла; заголовки аутентификации здесь не разрешены).

`PUT /api/provider-nodes/<id>` принимает тот же `customJson` и перезаписывает `baseUrl` и конфигурацию для каждого существующего соединения узла. Если пропустить `customJson` сохранится сохраненная конфигурация; переключение `apiType` на `chat` или `responses` удаляет его из узла и его соединений.

Затем добавьте соединение к узлу как обычно (`POST /api/providers` с идентификатором узла) и запросите `<prefix>/<model>`, например `biz/assistant-v1`. Конечная точка не предоставляет список моделей, поэтому добавьте идентификаторы моделей вручную.

## Шаблоны запросов

Шаблоны — это простой JSON. Строковое значение может содержать маркеры `{{placeholder}}` ; ничего не оценивается и не выполняется, а ключи объекта никогда не заменяются.

| Заполнитель          | Ценить                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `{{prompt}}`         | Текст последнего сообщения пользователя (части текста, соединенные символами новой строки) |
| `{{messages}}`       | Разговор в формате чата OpenAI                                                             |
| `{{model}}`          | Запрошенный идентификатор модели без префикса поставщика.                                  |
| `{{stream}}`         | Всегда `false` — конечная точка отвечает одним документом JSON                             |
| `{{request.<path>}}` | Поле переведенного (формат чата OpenAI ) запроса                                           |

- Значение, состоящее ровно из одного заполнителя, сохраняет свой тип JSON (`"{{messages}}"` становится массивом); заполнитель внутри более длинной строки вставляется как текст.
- Заполнитель, который ничего не разрешает, отклоняет запрос с HTTP 400 вместо отправки неполных полезных данных.
- Пути используют точечную запись и числовые индексы (`data.items[0].text`). `__proto__`, `prototype` и `constructor` отклоняются в ключах и путях.

## Ответы

Значение `responsePath` становится ответом помощника: строки проходят, другие значения JSON сериализуются. Отсутствующее поле или поле `null` или тело, отличное от JSON, возвращает HTTP 502. Состояния ошибок восходящего потока передаются. Для клиентов потоковой передачи OmniRoute ожидает весь ответ JSON, а затем отправляет его как один фрагмент контента плюс завершающий фрагмент; это не потоковая передача токенов. Вызовы инструментов и поля использования не отображаются.

## Никогда не воспроизводился

Бизнес-запрос может иметь побочные эффекты, даже если он не выполнен. Поэтому OmniRoute отправляет его один раз:

- никаких повторных попыток транспорта и последующего перенаправления;
- никаких повторных попыток другого соединения (резервный аккаунт) — ошибка возвращается как есть, и соединение не охлаждается;
- нет возврата к следующей цели комбо, даже в случае пустого или неудачного ответа.

Отдельные клиентские запросы и объединенные панели, которые явно вызывают несколько моделей, по-прежнему вызывают конечную точку независимо.

## Тестирование узла

Сохранение соединения, соединение** Тест** Кнопочные и фоновые проверки работоспособности никогда не вызывают конечную точку: они только проверяют сохраненную конфигурацию и сообщают, что соединение не подлежит проверке.

`POST /api/provider-nodes/validate` с `"apiType": "custom-json"` и полями узла (`baseUrl`, `apiKey`, `customJson`, необязательные `customHeaders` и `modelId`) отправляет ровно один реальный запрос с `ping` в качестве последнего пользовательского текста. Он отвечает `{ "valid": true }` или статус восходящего потока (никогда не тело восходящего потока).

## Хранилище

Конфигурация хранится в `provider_nodes.custom_json_config_json` (миграция `240_provider_node_custom_json_config.sql`) и копируется в `providerSpecificData.customJson` каждого соединения.

Реализация: `open-sse/utils/customJson.ts` (проверка и шаблонизация), `open-sse/executors/customJson.ts` (исполнитель), `open-sse/services/combo/noReplayLatch.ts` и `src/sse/handlers/chat/responsePolicies.ts` (без повтора).
