# Custom JSON API provider nodes (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

En brugerdefineret JSON API node forbinder et JSON virksomhedsslutpunkt, der ikke taler OpenAI eller Anthropic protokollen. OmniRoute udfylder en JSON -anmodningsskabelon, sender den til det komplette slutpunkt URL, læser svaret fra en svarsti og returnerer det til klienten i klientens eget format (chatafslutninger, svar, meddelelser, ...).

Det er en OpenAI-kompatibel node med `apiType: "custom-json"`; dens id har formen `openai-compatible-custom-json-<suffix>`. Dashboardformularen er ikke tilgængelig endnu. Opret og rediger disse noder gennem provider-noden API nedenfor.

## Opret en node

`POST /api/provider-nodes` (administrationsgodkendelse):

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

- `baseUrl` er** komplet** endepunkt URL. Intet er tilføjet (ingen `/chat/completions`, ingen `/models`), og i modsætning til andre OpenAI-kompatible noder er der ingen standard URL. Det skal være `http(s)`, uden indlejrede legitimationsoplysninger eller en `#fragment`, og det passerer den samme udgående URL vagt som hver udbyderknude, både når noden gemmes og ved hver anmodning.
- En node, der sender forbindelsesnøglen (`authType` `bearer` eller `api-key`, inklusive standard), skal bruge `https://`. Almindelig `http://` accepteres kun for en loopback-vært (`localhost`, `127.0.0.0/8`, `::1`) eller med `authType: "none"`, som ikke sender nogen nøgle. Private LAN adresser (`10.x`, `172.16-31.x`, `192.168.x`) er ikke undtaget: alle på det netværk kunne læse nøglen. At gemme en sådan node mislykkes med `400`, og en node, der er gemt tidligere, lukkes ikke ved hver anmodning med den samme besked, før en anmodning sendes. For et nøgleslutpunkt på en LAN skal du sætte det bag TLS (for eksempel en omvendt proxy).
- `customJson` er valideret med Zod; ukendte nøgler afvises. Hvert felt er valgfrit:

| Felt              | Værdier                            | Misligholdelse                                         |
| ----------------- | ---------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`             | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`        | `bearer`                                               |
| `authHeader`      | headernavn brugt når `api-key`     | `X-API-Key`                                            |
| `requestTemplate` | JSON objekt (≤ 64 KB, dybde ≤ 32)  | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | feltsti eller `$` for hele kroppen | `choices[0].message.content`                           |

- Hemmeligheden forbliver i forbindelsens API nøgle, aldrig i skabelonen. `bearer` sender `Authorization: Bearer <key>`; `api-key` sender `<authHeader>: <key>`. Auth-headeren kan ikke være `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` eller en hop-by-hop header. Med `none` behøver forbindelser ingen nøgle.
- Ekstra statiske headere bruger nodens almindelige `customHeaders` (samme validering som alle andre kompatible noder; godkendelsesheadere er ikke tilladt der).

`PUT /api/provider-nodes/<id>` accepterer den samme `customJson` og omskriver `baseUrl` og config på hver eksisterende forbindelse af noden. Udeladelse af `customJson` beholder den lagrede konfiguration; skifter `apiType` til `chat` eller `responses` fjerner det fra noden og dens forbindelser.

Tilføj derefter en forbindelse til noden som normalt (`POST /api/providers` med node-id) og anmod om `<prefix>/<model>`, for eksempel `biz/assistant-v1`. Slutpunktet viser ingen modelliste, så tilføj model-id'erne manuelt.

## Anmod om skabeloner

Skabeloner er almindelige JSON. En strengværdi kan indeholde `{{placeholder}}` markører; intet evalueres eller udføres, og objektnøgler erstattes aldrig.

| Pladsholder          | Værdi                                                                       |
| -------------------- | --------------------------------------------------------------------------- |
| `{{prompt}}`         | Tekst i den seneste brugermeddelelse (tekstdele sammenføjet med nye linjer) |
| `{{messages}}`       | Samtalen i OpenAI chat-format                                               |
| `{{model}}`          | Det anmodede model-id uden udbyderpræfikset                                 |
| `{{stream}}`         | `false` — altid endepunktet svarer med ét JSON dokument                     |
| `{{request.<path>}}` | Et felt med den oversatte (OpenAI chat-format) anmodning                    |

- En værdi, der er præcis én pladsholder, beholder sin JSON type (`"{{messages}}"` bliver en matrix); en pladsholder inde i en længere streng indsættes som tekst.
- En pladsholder, der løser sig til ingenting, mislykkes anmodningen med HTTP 400 i stedet for at sende en ufuldstændig nyttelast.
- Stier bruger punktnotation og numeriske indekser (`data.items[0].text`). `__proto__`, `prototype` og `constructor` afvises i nøgler og stier.

## Svar

Værdien ved `responsePath` bliver assistentsvaret: strenge passerer igennem, andre JSON værdier serialiseres. Et manglende felt eller `null` felt, eller en krop, der ikke er JSON, returnerer HTTP 502. Opstrøms fejlstatusser sendes igennem. For streamingklienter venter OmniRoute på hele JSON -svaret og udsender det derefter som én indholdsdel plus slutdelen; dette er ikke token-streaming. Værktøjsopkald og brugsfelter er ikke kortlagt.

## Aldrig afspillet

En forretningsanmodning kan have bivirkninger, selv når den mislykkes. OmniRoute sender det derfor én gang:

- ingen genforsøg og ingen omdirigering;
- intet forsøg på en anden forbindelse (konto fallback) — fejlen returneres som den er, og forbindelsen er ikke kølet ned;
- ingen tilbagevenden til det næste kombinationsmål, selv for et tomt eller mislykket svar.

Separate klientanmodninger og fusionspaneler, der eksplicit kalder flere modeller, kalder stadig slutpunktet uafhængigt.

## Test af en node

Gemmer en forbindelse, forbindelsen** Prøve** knap- og baggrundssundhedstjek kalder aldrig slutpunktet: de validerer kun den lagrede konfiguration og rapporterer forbindelsen som ikke verificerbar.

`POST /api/provider-nodes/validate` med `"apiType": "custom-json"` og nodefelterne (`baseUrl`, `apiKey`, `customJson`, valgfri `customHeaders` og `modelId`) sender præcis én reel anmodning med `ping` som den seneste brugertekst. Den besvarer `{ "valid": true }` eller upstream-status (aldrig upstream-kroppen).

## Opbevaring

Konfigurationen gemmes i `provider_nodes.custom_json_config_json` (migrering `240_provider_node_custom_json_config.sql`) og kopieres ind i hver forbindelses `providerSpecificData.customJson`.

Implementering: `open-sse/utils/customJson.ts` (validering og skabelon), `open-sse/executors/customJson.ts` (executor), `open-sse/services/combo/noReplayLatch.ts` og `src/sse/handlers/chat/responsePolicies.ts` (ingen genafspilning).
