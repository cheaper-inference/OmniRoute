# Custom JSON API provider nodes (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

En anpassad JSON API nod ansluter en JSON affärsändpunkt som inte talar OpenAI eller Anthropic protokollet. OmniRoute fyller en JSON -begärandemall, skickar den till den fullständiga slutpunkten URL, läser svaret från en svarsväg och returnerar det till klienten i klientens eget format (chatkompletteringar, svar, meddelanden, ...).

Det är en OpenAI-kompatibel nod med `apiType: "custom-json"`; dess id har formen `openai-compatible-custom-json-<suffix>`. Instrumentpanelsformuläret är inte tillgängligt ännu. Skapa och redigera dessa noder genom leverantörsnoden API nedan.

## Skapa en nod

`POST /api/provider-nodes` (hanteringsbehörighet):

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

- `baseUrl` är** komplett** slutpunkt URL. Ingenting läggs till (ingen `/chat/completions`, ingen `/models`) och till skillnad från andra OpenAI-kompatibla noder finns det ingen standard URL. Den måste vara `http(s)`, utan inbäddade referenser eller en `#fragment`, och den passerar samma utgående URL vakt som varje leverantörsnod, både när noden sparas och vid varje begäran.
- En nod som skickar anslutningsnyckeln (`authType` `bearer` eller `api-key`, inklusive standard) måste använda `https://`. Vanlig `http://` accepteras endast för en loopback-värd (`localhost`, `127.0.0.0/8`, `::1`) eller med `authType: "none"`, som inte skickar någon nyckel. Privata LAN -adresser (`10.x`, `172.16-31.x`, `192.168.x`) är inte undantagna: vem som helst i det nätverket kunde läsa nyckeln. Att spara en sådan nod misslyckas med `400`, och en nod som lagrats tidigare misslyckas vid varje begäran med samma meddelande, innan någon begäran skickas. För en nyckelad slutpunkt på en LAN, lägg den bakom TLS (till exempel en omvänd proxy).
- `customJson` valideras med Zod; okända nycklar avvisas. Varje fält är valfritt:

| Fält              | Värderingar                            | Standard                                               |
| ----------------- | -------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                 | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`            | `bearer`                                               |
| `authHeader`      | rubriknamn används när `api-key`       | `X-API-Key`                                            |
| `requestTemplate` | JSON objekt (≤ 64 KB, djup ≤ 32)       | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | field path, eller `$` för hela kroppen | `choices[0].message.content`                           |

- Hemligheten stannar i anslutningens API nyckel, aldrig i mallen. `bearer` skickar `Authorization: Bearer <key>`; `api-key` skickar `<authHeader>: <key>`. Auth-huvudet kan inte vara `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` eller ett hop-by-hop-huvud. Med `none` behöver anslutningar ingen nyckel.
- Extra statiska rubriker använder nodens vanliga `customHeaders` (samma validering som alla andra kompatibla noder; auth-huvuden är inte tillåtna där).

`PUT /api/provider-nodes/<id>` accepterar samma `customJson` och skriver om `baseUrl` och config på varje befintlig anslutning av noden. Att utelämna `customJson` behåller den lagrade konfigurationen; om du byter `apiType` till `chat` eller `responses` tas den bort från noden och dess anslutningar.

Lägg sedan till en anslutning till noden som vanligt (`POST /api/providers` med nod-id) och begär `<prefix>/<model>`, till exempel `biz/assistant-v1`. Slutpunkten visar ingen modelllista, så lägg till modell-id:n för hand.

## Begär mallar

Mallarna är vanliga JSON. Ett strängvärde kan innehålla `{{placeholder}}` markörer; ingenting utvärderas eller exekveras, och objektnycklar ersätts aldrig.

| Platshållare         | Värde                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| `{{prompt}}`         | Text för det senaste användarmeddelandet (textdelar sammanfogade med nyrader) |
| `{{messages}}`       | Konversationen i OpenAI chattformat                                           |
| `{{model}}`          | Det begärda modell-id:t, utan leverantörsprefixet                             |
| `{{stream}}`         | `false` — alltid slutpunkten svarar med ett JSON -dokument                    |
| `{{request.<path>}}` | Ett fält med den översatta (OpenAI chat-format) begäran                       |

- Ett värde som är exakt en platshållare behåller sin JSON -typ (`"{{messages}}"` blir en array); en platshållare inuti en längre sträng infogas som text.
- En platshållare som löser sig till ingenting misslyckas begäran med HTTP 400 istället för att skicka en ofullständig nyttolast.
- Sökvägar använder punktnotation och numeriska index (`data.items[0].text`). `__proto__`, `prototype` och `constructor` avvisas i nycklar och sökvägar.

## Svar

Värdet vid `responsePath` blir assistentsvaret: strängar passerar igenom, andra JSON värden serialiseras. Ett saknat eller `null` fält, eller en kropp som inte är JSON, returnerar HTTP 502. Uppströms felstatusar skickas igenom. För strömmande klienter väntar OmniRoute på hela JSON -svaret och skickar det sedan som en innehållsbit plus slutklumpen; detta är inte tokenstreaming. Verktygsanrop och användningsfält mappas inte.

## Spelas aldrig om

En affärsförfrågan kan få biverkningar även när den misslyckas. OmniRoute skickar det därför en gång:

- inget nytt försök och ingen omdirigering;
- inget nytt försök på en annan anslutning (kontofallback) — felet returneras som det är och anslutningen kyls inte ned;
- ingen återgång till nästa kombinationsmål, även för ett tomt eller misslyckat svar.

Separata klientförfrågningar och fusionspaneler som uttryckligen anropar flera modeller, anropar fortfarande slutpunkten oberoende.

## Testar en nod

Spara en anslutning, anslutningen** Testa** knapp- och bakgrundshälsokontroller anropar aldrig slutpunkten: de validerar bara den lagrade konfigurationen och rapporterar anslutningen som inte verifierbar.

`POST /api/provider-nodes/validate` med `"apiType": "custom-json"` och nodfälten (`baseUrl`, `apiKey`, `customJson`, optional `customHeaders` och `modelId`) skickar exakt en riktig begäran, med `ping` som den senaste användartexten. Den svarar på `{ "valid": true }` eller uppströmsstatusen (aldrig uppströmskroppen).

## Lagring

Konfigurationen lagras i `provider_nodes.custom_json_config_json` (migrering `240_provider_node_custom_json_config.sql`) och kopieras till varje anslutnings `providerSpecificData.customJson`.

Implementering: `open-sse/utils/customJson.ts` (validering och mall), `open-sse/executors/customJson.ts` (executor), `open-sse/services/combo/noReplayLatch.ts` och `src/sse/handlers/chat/responsePolicies.ts` (ingen repris).
