# Custom JSON API provider nodes (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Персонализиран JSON API възел свързва JSON бизнес крайна точка, която не говори OpenAI или Anthropic протокола. OmniRoute попълва JSON шаблон на заявка, изпраща го до пълната крайна точка URL, чете отговора от пътя на отговора и го връща на клиента в собствения формат на клиента (завършвания на чат, отговори, съобщения, ...).

Това е OpenAI-съвместим възел с `apiType: "custom-json"`; неговият id има формата `openai-compatible-custom-json-<suffix>`. Формулярът на таблото все още не е наличен. Създайте и редактирайте тези възли чрез API на доставчика по-долу.

## Създайте възел

`POST /api/provider-nodes` (удостоверяване на управление):

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

- `baseUrl` е** пълен** крайна точка URL. Нищо не се добавя (няма `/chat/completions`, нито `/models`) и, за разлика от други възли, съвместими с OpenAI, няма URL по подразбиране. Трябва да бъде `http(s)`, без вградени идентификационни данни или `#fragment`, и преминава същия изходящ URL предпазител като всеки възел на доставчик, както когато възелът е запазен, така и при всяка заявка.
- Възел, който изпраща ключа за връзка (`authType` `bearer` или `api-key`, включително по подразбиране), трябва да използва `https://`. Обикновеният `http://` се приема само за loopback хост (`localhost`, `127.0.0.0/8`, `::1`) или с `authType: "none"`, който не изпраща ключ. Частните LAN адреси (`10.x`, `172.16-31.x`, `192.168.x`) не са освободени: всеки в тази мрежа може да прочете ключа. Записването на такъв възел е неуспешно с `400`, а възел, съхранен по-рано, не се затваря при всяка заявка със същото съобщение, преди да бъде изпратена каквато и да е заявка. За крайна точка с ключ на LAN, поставете я зад TLS (например обратен прокси).
- `customJson` се валидира с Zod; неизвестните ключове се отхвърлят. Всяко поле не е задължително:

| Поле              | Ценности                                      | По подразбиране                                        |
| ----------------- | --------------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                        | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                   | `bearer`                                               |
| `authHeader`      | име на заглавка, използвано, когато `api-key` | `X-API-Key`                                            |
| `requestTemplate` | JSON обект (≤ 64 KB, дълбочина ≤ 32)          | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | полеви път, или `$` за цялото тяло            | `choices[0].message.content`                           |

- Тайната остава в API ключа на връзката, никога в шаблона. `bearer` изпраща `Authorization: Bearer <key>`; `api-key` изпраща `<authHeader>: <key>`. Заглавката за удостоверяване не може да бъде `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` или заглавка hop-by-hop. С `none` връзките не се нуждаят от ключ.
- Допълнителните статични заглавки използват обикновения `customHeaders` на възела (същото валидиране като всеки друг съвместим възел; заглавките за удостоверяване не са разрешени там).

`PUT /api/provider-nodes/<id>` приема същия `customJson` и пренаписва `baseUrl` и конфигурацията на всяка съществуваща връзка на възела. Пропускането на `customJson` запазва съхранената конфигурация; превключването `apiType` към `chat` или `responses` го премахва от възела и неговите връзки.

След това добавете връзка към възела както обикновено (`POST /api/providers` с идентификатора на възела) и поискайте `<prefix>/<model>`, например `biz/assistant-v1`. Крайната точка не показва списък с модели, така че добавете идентификаторите на модела на ръка.

## Поискайте шаблони

Шаблоните са обикновени JSON. Низова стойност може да съдържа `{{placeholder}}` маркери; нищо не се оценява или изпълнява и ключовете на обектите никога не се заместват.

| Заместител           | Стойност                                                                           |
| -------------------- | ---------------------------------------------------------------------------------- |
| `{{prompt}}`         | Текст на последното потребителско съобщение (части от текста, съединени с нов ред) |
| `{{messages}}`       | Разговорът в OpenAI чат формат                                                     |
| `{{model}}`          | Идентификационният номер на искания модел, без префикса на доставчика              |
| `{{stream}}`         | Винаги `false` — крайната точка отговаря с един JSON документ                      |
| `{{request.<path>}}` | Поле на преведената (OpenAI чат формат) заявка                                     |

- Стойност, която е точно един заместител, запазва своя тип JSON (`"{{messages}}"` става масив); контейнер в по-дълъг низ се вмъква като текст.
- Заместител, който се разрешава до нищо, проваля заявката с HTTP 400, вместо да изпрати непълен полезен товар.
- Пътищата използват нотация с точки и цифрови индекси (`data.items[0].text`). `__proto__`, `prototype` и `constructor` се отхвърлят в ключове и пътища.

## Отговори

Стойността в `responsePath` се превръща в отговор на асистента: низовете преминават, други стойности JSON се сериализират. Липсващо поле или поле `null`, или тяло, което не е JSON, връща HTTP 502. Състоянията на грешки нагоре се предават. За стрийминг клиенти OmniRoute изчаква целия отговор JSON и след това го излъчва като едно съдържание плюс крайното парче; това не е стрийминг на токени. Извикванията на инструменти и полетата за използване не са картографирани.

## Никога не е преиграван

Една бизнес заявка може да има странични ефекти дори когато е неуспешна. следователно OmniRoute го изпраща веднъж:

- без повторен опит за транспортиране и без следване на пренасочване;
- без повторен опит за друга връзка (резервен акаунт) — грешката се връща такава, каквато е и връзката не се охлажда;
- без резервно връщане към следващата комбинирана цел, дори за празен или неуспешен отговор.

Отделните клиентски заявки и панелите за синтез, които изрично извикват няколко модела, все още извикват крайната точка независимо.

## Тестване на възел

Запазване на връзка, връзката** Тест** бутоните и фоновите проверки на здравето никога не извикват крайната точка: те само валидират съхранената конфигурация и докладват връзката като непроверима.

`POST /api/provider-nodes/validate` с `"apiType": "custom-json"` и полетата на възела (`baseUrl`, `apiKey`, `customJson`, по избор `customHeaders` и `modelId`) изпраща точно една реална заявка, като `ping` е последният потребителски текст. Той отговаря `{ "valid": true }` или състоянието нагоре по веригата (никога на тялото нагоре по веригата).

## Съхранение

Конфигурацията се съхранява в `provider_nodes.custom_json_config_json` (миграция `240_provider_node_custom_json_config.sql`) и се копира в `providerSpecificData.customJson` на всяка връзка.

Внедряване: `open-sse/utils/customJson.ts` (валидиране и шаблониране), `open-sse/executors/customJson.ts` (изпълнител), `open-sse/services/combo/noReplayLatch.ts` и `src/sse/handlers/chat/responsePolicies.ts` (без повторение).
