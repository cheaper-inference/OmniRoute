# Custom JSON API provider nodes (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Ang isang custom JSON API node ay nagkokonekta sa isang JSON business endpoint na hindi nagsasalita ng OpenAI o Anthropic protocol. OmniRoute ay pumupuno ng JSON na template ng kahilingan, ipinapadala ito sa kumpletong endpoint URL, binabasa ang tugon mula sa isang path ng pagtugon at ibinalik ito sa kliyente sa sariling format ng kliyente (Mga Pagkumpleto ng Chat, Mga Tugon, Mga Mensahe, ...).

Ito ay isang OpenAI-compatible na node na may `apiType: "custom-json"`; ang id nito ay may anyo na `openai-compatible-custom-json-<suffix>`. Hindi pa available ang form ng dashboard. Gawin at i-edit ang mga node na ito sa pamamagitan ng provider-node API sa ibaba.

## Gumawa ng node

`POST /api/provider-nodes` (pagpapatotoo ng pamamahala):

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

- `baseUrl` ay ang** kumpleto** endpoint URL. Walang idinagdag (walang `/chat/completions`, walang `/models`) at, hindi katulad ng iba pang OpenAI-compatible node, walang default URL. Dapat itong `http(s)`, walang naka-embed na kredensyal o `#fragment`, at pumasa ito sa parehong papalabas URL guard gaya ng bawat node ng provider, parehong kapag na-save ang node at sa bawat kahilingan.
- Ang isang node na nagpapadala ng key ng koneksyon (`authType` `bearer` o `api-key`, kasama ang default) ay dapat gumamit `https://`. Ang payak na `http://` ay tinatanggap lamang para sa isang loopback host (`localhost`, `127.0.0.0/8`, `::1`) o may `authType: "none"`, na hindi nagpapadala ng key. Ang mga pribadong LAN address (`10.x`, `172.16-31.x`, `192.168.x`) ay hindi exempt: sinuman sa network na iyon ay makakabasa ng key. Nabigo ang pag-save ng naturang node sa `400`, at nabigo ang isang node na nakaimbak nang mas maaga sa bawat kahilingan na may parehong mensahe, bago ipadala ang anumang kahilingan. Para sa isang naka-key na endpoint sa isang LAN, ilagay ito sa likod ng TLS (halimbawa isang reverse proxy).
- `customJson` ay napatunayan sa Zod; hindi kilalang mga susi ay tinanggihan. Ang bawat field ay opsyonal:

| Patlang           | Mga halaga                                    | Default                                                |
| ----------------- | --------------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                        | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                   | `bearer`                                               |
| `authHeader`      | pangalan ng header na ginamit kapag `api-key` | `X-API-Key`                                            |
| `requestTemplate` | JSON object (≤ 64 KB, lalim ≤ 32)             | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | field path, o `$` para sa buong katawan       | `choices[0].message.content`                           |

- Ang lihim ay nananatili sa API key ng koneksyon, hindi kailanman sa template. `bearer` ay nagpapadala ng `Authorization: Bearer <key>`; Nagpapadala `api-key` `<authHeader>: <key>`. Ang auth header ay hindi maaaring `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` o isang hop-by-hop header. Sa `none`, ang mga koneksyon ay hindi nangangailangan ng susi.
- Ang mga sobrang static na header ay gumagamit ng regular `customHeaders` ng node (parehong pagpapatunay tulad ng bawat iba pang katugmang node; hindi pinapayagan ang mga auth header doon).

Tinatanggap `PUT /api/provider-nodes/<id>` ang parehong `customJson` at muling isinulat `baseUrl` at ang config sa bawat umiiral na koneksyon ng node. Ang pag-alis ng `customJson` ay nagpapanatili sa nakaimbak na config; Ang paglipat ng `apiType` sa `chat` o `responses` ay nag-aalis nito mula sa node at sa mga koneksyon nito.

Pagkatapos ay magdagdag ng koneksyon sa node gaya ng dati (`POST /api/providers` kasama ang node id) at humiling ng `<prefix>/<model>`, halimbawa `biz/assistant-v1`. Ang endpoint ay hindi nagpapakita ng listahan ng modelo, kaya idagdag ang mga model id sa pamamagitan ng kamay.

## Humiling ng mga template

Ang mga template ay plain JSON. Ang isang string value ay maaaring maglaman ng mga `{{placeholder}}` marker; walang sinusuri o naisakatuparan, at ang mga object key ay hindi kailanman pinapalitan.

| Placeholder          | Halaga                                                                                         |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| `{{prompt}}`         | Teksto ng pinakabagong mensahe ng user (mga bahagi ng teksto na sinamahan ng mga bagong linya) |
| `{{messages}}`       | Ang pag-uusap sa OpenAI chat format                                                            |
| `{{model}}`          | Ang hiniling na model id, nang walang prefix ng provider                                       |
| `{{stream}}`         | Palaging `false` — ang endpoint na mga sagot gamit ang isang JSON na dokumento                 |
| `{{request.<path>}}` | Isang field ng isinalin (OpenAI chat format) na kahilingan                                     |

- Ang isang halaga na eksaktong isang placeholder ay nagpapanatili ng kanyang uri JSON (`"{{messages}}"` ay nagiging isang array); ang isang placeholder sa loob ng mas mahabang string ay ipinapasok bilang text.
- Ang isang placeholder na nagresolba sa wala ay nabigo ang kahilingan na may HTTP 400 sa halip na magpadala ng hindi kumpletong payload.
- Gumagamit ang mga path ng dot notation at numeric index (`data.items[0].text`). `__proto__`, `prototype` at `constructor` ay tinanggihan sa mga susi at landas.

## Mga tugon

Ang halaga sa `responsePath` ay nagiging katulong na tugon: dumaan ang mga string, naka-serialize ang iba pang mga halaga JSON. Ang isang nawawala o `null` na field, o isang body na hindi JSON, ay nagbabalik HTTP 502. Ang mga status ng upstream na error ay ipinapasa. Para sa mga streaming client naghihintay OmniRoute para sa buong tugon JSON at pagkatapos ay ilalabas ito bilang isang tipak ng nilalaman kasama ang tipak ng pagtatapos; hindi ito token streaming. Ang mga tawag sa tool at mga field ng paggamit ay hindi namamapa.

## Never replayed

Ang isang kahilingan sa negosyo ay maaaring magkaroon ng mga side effect kahit na ito ay nabigo. samakatuwid, ipinapadala ito OmniRoute nang isang beses:

- walang transport retry at walang redirect following;
- walang subukang muli sa isa pang koneksyon (account fallback) — ang pagkabigo ay ibinalik sa dati at ang koneksyon ay hindi pinalamig;
- walang fallback sa susunod na combo target, kahit para sa isang walang laman o nabigong tugon.

Ang mga hiwalay na kahilingan ng kliyente, at mga fusion panel na tahasang tumatawag sa ilang mga modelo, ay hiwalay pa ring gumagamit ng endpoint.

## Pagsubok ng isang node

Nagse-save ng koneksyon, ang koneksyon** Pagsubok** Ang mga pagsusuri sa kalusugan ng button at background ay hindi kailanman tumatawag sa endpoint: pinapatunayan lang nila ang nakaimbak na config at iniuulat ang koneksyon bilang hindi nabe-verify.

`POST /api/provider-nodes/validate` na may `"apiType": "custom-json"` at ang mga field ng node (`baseUrl`, `apiKey`, `customJson`, opsyonal `customHeaders` at `modelId`) ay nagpapadala ng eksaktong isang tunay na kahilingan, na may `ping` bilang ang pinakabagong teksto ng user. Sinasagot nito `{ "valid": true }` o ang upstream status (hindi kailanman ang upstream body).

## Imbakan

Ang config ay naka-imbak sa `provider_nodes.custom_json_config_json` (migration `240_provider_node_custom_json_config.sql`) at kinopya sa bawat koneksyon na `providerSpecificData.customJson`.

Pagpapatupad: `open-sse/utils/customJson.ts` (validation at template), `open-sse/executors/customJson.ts` (executor), `open-sse/services/combo/noReplayLatch.ts` at `src/sse/handlers/chat/responsePolicies.ts` (no-replay).
