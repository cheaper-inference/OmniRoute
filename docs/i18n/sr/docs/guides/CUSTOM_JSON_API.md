# Custom JSON API provider nodes (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Прилагођени JSON API чвор повезује JSON пословну крајњу тачку која не говори OpenAI или Anthropic протокол. OmniRoute испуњава JSON шаблон захтева, шаље га до комплетне крајње тачке URL, чита одговор са путање одговора и враћа га клијенту у сопственом формату (завршетак ћаскања, одговори, поруке, ...).

То је ОпенАИ-компатибилни чвор са `apiType: "custom-json"`; његов ид има облик `openai-compatible-custom-json-<suffix>`. Образац контролне табле још није доступан. Креирајте и уредите ове чворове преко провајдерског чвора API испод.

## Креирајте чвор

`POST /api/provider-nodes` (аутор за управљање):

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

- `baseUrl` је** потпуни** крајња тачка URL. Ништа се не додаје (нема `/chat/completions`, нема `/models`) и, за разлику од других чворова компатибилних са ОпенАИ, нема подразумеваног URL. Мора да буде `http(s)`, без уграђених акредитива или `#fragment`, и пролази исти излазни URL чувар као и сваки чвор добављача, и када је чвор сачуван и на сваки захтев.
- Чвор који шаље кључ везе (`authType` `bearer` или `api-key`, укључујући подразумевани) мора да користи `https://`. Обичан `http://` је прихваћен само за хост повратне петље (`localhost`, `127.0.0.0/8`, `::1`) или са `authType: "none"`, који не шаље кључ. Приватне LAN адресе (`10.x`, `172.16-31.x`, `192.168.x`) нису изузете: свако на тој мрежи може да прочита кључ. Чување таквог чвора не успева са `400`, а чвор који је раније ускладиштен не успева да се затвори на сваком захтеву са истом поруком, пре него што се пошаље било који захтев. За крајњу тачку са кључем на LAN, ставите је иза TLS (на пример обрнути прокси).
- `customJson` се потврђује са Zod; непознати кључеви се одбијају. Свако поље је опционо:

| Поље              | Вредности                                   | Подразумевано                                          |
| ----------------- | ------------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                      | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                 | `bearer`                                               |
| `authHeader`      | име заглавља које се користи када `api-key` | `X-API-Key`                                            |
| `requestTemplate` | JSON објекат (≤ 64 KB, дубина ≤ 32)         | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | пољски пут, или `$` за цело тело            | `choices[0].message.content`                           |

- Тајна остаје у API кључу везе, никада у шаблону. `bearer` шаље `Authorization: Bearer <key>`; `api-key` шаље `<authHeader>: <key>`. Аутх заглавље не може бити `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` или хоп-би-хоп заглавље. Са `none`, за везе није потребан кључ.
- Додатна статичка заглавља користе уобичајени `customHeaders` чвора (иста валидација као и сваки други компатибилни чвор; аутх заглавља тамо нису дозвољена).

`PUT /api/provider-nodes/<id>` прихвата исти `customJson` и преписује `baseUrl` и конфигурацију на свакој постојећој вези чвора. Изостављањем `customJson` чува се сачувана конфигурација; пребацивање `apiType` на `chat` или `responses` уклања га из чвора и његових веза.

Затим додајте везу са чвором као и обично (`POST /api/providers` са ИД-ом чвора) и затражите `<prefix>/<model>`, на пример `biz/assistant-v1`. Крајња тачка не излаже листу модела, па додајте ИД-ове модела ручно.

## Захтевајте шаблоне

Шаблони су обични JSON. Вредност стринга може садржати `{{placeholder}}` маркере; ништа се не процењује нити извршава, а кључеви објекта се никада не замењују.

| Чувар места          | Валуе                                                                    |
| -------------------- | ------------------------------------------------------------------------ |
| `{{prompt}}`         | Текст најновије корисничке поруке (делови текста спојени новим редовима) |
| `{{messages}}`       | Разговор у OpenAI цхат формату                                           |
| `{{model}}`          | Тражени ИД модела, без префикса добављача                                |
| `{{stream}}`         | Увек `false` — крајња тачка одговара једним JSON документом              |
| `{{request.<path>}}` | Поље преведеног (OpenAI цхат формат) захтева                             |

- Вредност која је тачно један чувар места задржава свој тип JSON (`"{{messages}}"` постаје низ); чувар места унутар дужег низа се убацује као текст.
- Чувар места који се решава у ништа не успева у захтеву са HTTP 400 уместо да пошаље непотпуно оптерећење.
- Путања користе нотацију тачака и нумеричке индексе (`data.items[0].text`). `__proto__`, `prototype` и `constructor` се одбијају у кључевима и путањама.

## Одговори

Вредност у `responsePath` постаје одговор помоћника: низови пролазе, друге JSON вредности се серијализују. Поље које недостаје или `null`, или тело које није JSON, враћа HTTP 502. Упстреам статуси грешке се прослеђују. За клијенте за стримовање OmniRoute чека цео JSON одговор и затим га емитује као један део садржаја плус завршни комад; ово није стримовање токена. Позиви алата и поља коришћења нису мапирани.

## Никад поновљено

Пословни захтев може имати нежељене ефекте чак и када не успе. OmniRoute стога шаље једном:

- без поновног транспорта и без праћења преусмеравања;
- нема поновног покушаја на другој вези (замена налога) — грешка се враћа онаква каква јесте и веза се не хлади;
- нема повратка на следећу комбиновану мету, чак ни за празан или неуспешан одговор.

Одвојени захтеви клијената и фузиони панели који експлицитно позивају неколико модела и даље независно позивају крајњу тачку.

## Тестирање чвора

Чување везе, везе** Тест** дугме и провере здравља у позадини никада не позивају крајњу тачку: оне само потврђују сачувану конфигурацију и пријављују везу као непроверљиву.

`POST /api/provider-nodes/validate` са `"apiType": "custom-json"` и пољима чвора (`baseUrl`, `apiKey`, `customJson`, опционо `customHeaders` и `modelId`) шаље тачно један прави захтев, са `ping` као најновијим корисничким текстом. Одговара `{ "valid": true }` или статус узводно (никада узводно тело).

## Складиштење

Конфигурација се чува у `provider_nodes.custom_json_config_json` (миграција `240_provider_node_custom_json_config.sql`) и копира се у `providerSpecificData.customJson` сваке везе.

Имплементација: `open-sse/utils/customJson.ts` (валидација и шаблон), `open-sse/executors/customJson.ts` (извршилац), `open-sse/services/combo/noReplayLatch.ts` и `src/sse/handlers/chat/responsePolicies.ts` (без понављања).
