# Custom JSON API provider nodes (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Спеціальний вузол JSON API підключає кінцеву точку бізнесу JSON, яка не розмовляє протоколом OpenAI або Anthropic. OmniRoute заповнює шаблон запиту JSON, надсилає його до повної кінцевої точки URL, читає відповідь із шляху відповіді та повертає її клієнту у власному форматі клієнта (завершення чату, відповіді, повідомлення тощо).

Це OpenAI-сумісний вузол із `apiType: "custom-json"`; його ідентифікатор має форму `openai-compatible-custom-json-<suffix>`. Форма інформаційної панелі ще не доступна. Створюйте та редагуйте ці вузли за допомогою вузла провайдера API нижче.

## Створіть вузол

`POST /api/provider-nodes` (автентифікація керування):

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

- `baseUrl` це** повний** кінцева точка URL. Нічого не додається (ні `/chat/completions`, ні `/models`), і, на відміну від інших OpenAI-сумісних вузлів, немає URL за замовчуванням. Це має бути `http(s)`, без вбудованих облікових даних або `#fragment`, і він пропускає той самий вихідний захист URL, що й кожен вузол постачальника, як під час збереження вузла, так і під час кожного запиту.
- Вузол, який надсилає ключ з’єднання (`authType` `bearer` або `api-key`, включаючи стандартний), повинен використовувати `https://`. Звичайний `http://` приймається лише для вузла петлі (`localhost`, `127.0.0.0/8`, `::1`) або з `authType: "none"`, який не надсилає ключ. Приватні адреси LAN (`10.x`, `172.16-31.x`, `192.168.x`) не є винятком: будь-хто в цій мережі може прочитати ключ. Збереження такого вузла не вдається за допомогою `400`, а вузол, збережений раніше, не закривається на кожному запиті з тим самим повідомленням, перш ніж будь-який запит буде надіслано. Для ключової кінцевої точки на LAN розмістіть її за TLS (наприклад, зворотний проксі).
- `customJson` перевіряється за допомогою Zod; невідомі ключі відхиляються. Кожне поле необов’язкове:

| Поле              | Цінності                                             | За замовчуванням                                       |
| ----------------- | ---------------------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                               | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                          | `bearer`                                               |
| `authHeader`      | назва заголовка, що використовується, коли `api-key` | `X-API-Key`                                            |
| `requestTemplate` | об'єкт JSON (≤ 64 KB, глибина ≤ 32)                  | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | польовий шлях, або `$` для всього тіла               | `choices[0].message.content`                           |

- Секрет залишається в ключі API підключення, а не в шаблоні. `bearer` надсилає `Authorization: Bearer <key>`; `api-key` надсилає `<authHeader>: <key>`. Заголовок auth не може бути `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` або заголовок hop-by-hop. З `none` підключення не потребують ключа.
- Додаткові статичні заголовки використовують звичайний `customHeaders` вузла (така ж перевірка, що й будь-який інший сумісний вузол; заголовки auth там не дозволені).

`PUT /api/provider-nodes/<id>` приймає той самий `customJson` і переписує `baseUrl` і конфігурацію для кожного існуючого підключення вузла. Пропуск `customJson` зберігає збережену конфігурацію; перемикання `apiType` на `chat` або `responses` видаляє його з вузла та його з’єднань.

Потім додайте підключення до вузла, як зазвичай (`POST /api/providers` з ідентифікатором вузла) і надішліть запит `<prefix>/<model>`, наприклад `biz/assistant-v1`. Кінцева точка не відкриває список моделей, тому додайте ідентифікатори моделей вручну.

## Шаблони запитів

Шаблони звичайні JSON. Рядкове значення може містити маркери `{{placeholder}}` ; нічого не оцінюється і не виконується, а ключі об’єктів ніколи не замінюються.

| Заповнювач           | Значення                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `{{prompt}}`         | Текст останнього повідомлення користувача (частини тексту, з’єднані символом нового рядка) |
| `{{messages}}`       | Розмова у форматі чату OpenAI                                                              |
| `{{model}}`          | Запитаний ідентифікатор моделі без префікса постачальника                                  |
| `{{stream}}`         | Завжди `false` — кінцева точка відповідає одним документом JSON                            |
| `{{request.<path>}}` | Поле перекладеного (формат чату OpenAI ) запиту                                            |

- Значення, яке є точно одним заповнювачем, зберігає свій тип JSON (`"{{messages}}"` стає масивом); покажчик місця заповнення всередині довшого рядка вставляється як текст.
- Заповнювач, який вирішується як нуль, не виконує запит із HTTP 400 замість того, щоб надсилати неповне корисне навантаження.
- Шляхи використовують крапкову нотацію та числові індекси (`data.items[0].text`). `__proto__`, `prototype` і `constructor` відхиляються в ключах і шляхах.

## Відповіді

Значення в `responsePath` стає відповіддю помічника: рядки проходять, інші значення JSON серіалізуються. Відсутнє поле або поле `null`, або тіло, яке не є JSON, повертає HTTP 502. Статуси помилок висхідного потоку передаються. Для потокових клієнтів OmniRoute чекає на всю відповідь JSON, а потім видає її як один фрагмент вмісту плюс кінцевий фрагмент; це не потокове передавання токенів. Виклики інструментів і поля використання не зіставляються.

## Ніколи не повторювався

Бізнес-запит може мати побічні ефекти, навіть якщо він не виконується. тому OmniRoute надсилає його один раз:

- відсутність повторних спроб транспортування та перенаправлення;
- відсутність повторної спроби для іншого з’єднання (запасний обліковий запис) — помилка повертається як є, і з’єднання не охолоджується;
- відсутність повернення до наступної комбінованої цілі, навіть якщо відповідь порожня або невдала.

Окремі клієнтські запити та панелі злиття, які явно викликають кілька моделей, все ще викликають кінцеву точку незалежно.

## Тестування вузла

Збереження з'єднання, з'єднання** Тест** кнопки та фонові перевірки працездатності ніколи не викликають кінцеву точку: вони лише перевіряють збережену конфігурацію та повідомляють, що з’єднання не піддається перевірці.

`POST /api/provider-nodes/validate` з `"apiType": "custom-json"` і полями вузла (`baseUrl`, `apiKey`, `customJson`, необов’язково `customHeaders` і `modelId`) надсилає рівно один справжній запит, із `ping` як останнім текстом користувача. Він відповідає `{ "valid": true }` або висхідний статус (ніколи не на вищестояще тіло).

## Зберігання

Конфігурація зберігається в `provider_nodes.custom_json_config_json` (міграція `240_provider_node_custom_json_config.sql`) і копіюється в `providerSpecificData.customJson` кожного підключення.

Реалізація: `open-sse/utils/customJson.ts` (перевірка та створення шаблонів), `open-sse/executors/customJson.ts` (виконавець), `open-sse/services/combo/noReplayLatch.ts` і `src/sse/handlers/chat/responsePolicies.ts` (без повторного відтворення).
