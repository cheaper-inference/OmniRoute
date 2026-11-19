# Custom JSON API provider nodes (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Een aangepast JSON API knooppunt verbindt een JSON bedrijfseindpunt dat het OpenAI of Anthropic protocol niet spreekt. OmniRoute vult een JSON -verzoeksjabloon in, stuurt deze naar het volledige eindpunt URL, leest het antwoord van een antwoordpad en stuurt het terug naar de klant in het eigen formaat van de klant (chatvoltooiingen, antwoorden, berichten, ...).

Het is een OpenAI-compatibel knooppunt met `apiType: "custom-json"`; zijn id heeft de vorm `openai-compatible-custom-json-<suffix>`. Het dashboardformulier is nog niet beschikbaar. Maak en bewerk deze knooppunten via de onderstaande provider-node API.

## Maak een knooppunt

`POST /api/provider-nodes` (beheerauthenticatie):

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

- `baseUrl` is de** compleet** eindpunt URL. Er wordt niets toegevoegd (geen `/chat/completions`, geen `/models`) en, in tegenstelling tot andere OpenAI-compatibele knooppunten, is er geen standaard URL. Het moet `http(s)` zijn, zonder ingebedde referenties of een `#fragment`, en het passeert dezelfde uitgaande URL bewaking als elk knooppunt van de provider, zowel wanneer het knooppunt wordt opgeslagen als bij elk verzoek.
- Een knooppunt dat de verbindingssleutel verzendt (`authType` `bearer` of `api-key`, inclusief de standaard) moet `https://` gebruiken. Gewone `http://` wordt alleen geaccepteerd voor een loopback-host (`localhost`, `127.0.0.0/8`, `::1`) of met `authType: "none"`, die geen sleutel verzendt. Privé LAN -adressen (`10.x`, `172.16-31.x`, `192.168.x`) zijn niet uitgezonderd: iedereen op dat netwerk kan de sleutel lezen. Het opslaan van een dergelijk knooppunt mislukt met `400`, en een eerder opgeslagen knooppunt mislukt bij elk verzoek met hetzelfde bericht, voordat een verzoek wordt verzonden. Voor een ingetoetst eindpunt op een LAN plaats je het achter TLS (bijvoorbeeld een reverse proxy).
- `customJson` wordt gevalideerd met Zod; onbekende sleutels worden afgewezen. Elk veld is optioneel:

| Veld              | Waarden                               | Standaard                                              |
| ----------------- | ------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`           | `bearer`                                               |
| `authHeader`      | headernaam gebruikt wanneer `api-key` | `X-API-Key`                                            |
| `requestTemplate` | JSON object (≤ 64 KB, diepte ≤ 32)    | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | veldpad, of `$` voor het hele lichaam | `choices[0].message.content`                           |

- Het geheim blijft in de API sleutel van de verbinding, nooit in de sjabloon. `bearer` verzendt `Authorization: Bearer <key>`; `api-key` verzendt `<authHeader>: <key>`. De auth-header kan niet `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` of een hop-by-hop header zijn. Met `none` hebben verbindingen geen sleutel nodig.
- Extra statische headers gebruiken de reguliere `customHeaders` van het knooppunt (dezelfde validatie als elk ander compatibel knooppunt; auth-headers zijn daar niet toegestaan).

`PUT /api/provider-nodes/<id>` accepteert dezelfde `customJson` en herschrijft `baseUrl` en de configuratie op elke bestaande verbinding van het knooppunt. Als `customJson` weglaat, blijft de opgeslagen configuratie behouden; het overschakelen `apiType` naar `chat` of `responses` verwijdert het van het knooppunt en zijn verbindingen.

Voeg vervolgens zoals gewoonlijk een verbinding met het knooppunt toe (`POST /api/providers` met het knooppunt-ID) en vraag `<prefix>/<model>` aan, bijvoorbeeld `biz/assistant-v1`. Het eindpunt geeft geen modellijst weer, dus voeg de model-ID's met de hand toe.

## Sjablonen aanvragen

Sjablonen zijn gewoon JSON. Een tekenreekswaarde kan `{{placeholder}}` markeringen bevatten; er wordt niets geëvalueerd of uitgevoerd, en objectsleutels worden nooit vervangen.

| Tijdelijke aanduiding | Waarde                                                                              |
| --------------------- | ----------------------------------------------------------------------------------- |
| `{{prompt}}`          | Tekst van het laatste gebruikersbericht (tekstdelen samengevoegd met nieuwe regels) |
| `{{messages}}`        | Het gesprek in OpenAI chatformaat                                                   |
| `{{model}}`           | De aangevraagde model-ID, zonder het providervoorvoegsel                            |
| `{{stream}}`          | Altijd `false` — antwoordt het eindpunt met één JSON -document                      |
| `{{request.<path>}}`  | Een veld van het vertaalde verzoek (OpenAI chatformaat).                            |

- Een waarde die precies één tijdelijke aanduiding is, behoudt zijn JSON type (`"{{messages}}"` wordt een array); een tijdelijke aanduiding in een langere tekenreeks wordt als tekst ingevoegd.
- Een tijdelijke aanduiding die niets oplevert, mislukt het verzoek met HTTP 400 in plaats van een onvolledige payload te verzenden.
- Paden gebruiken puntnotatie en numerieke indexen (`data.items[0].text`). `__proto__`, `prototype` en `constructor` worden afgewezen in sleutels en paden.

## Reacties

De waarde bij `responsePath` wordt het assistent-antwoord: tekenreeksen gaan door, andere JSON waarden worden geserialiseerd. Een ontbrekend veld of `null` veld, of een hoofdtekst die niet JSON is, retourneert HTTP 502. Stroomopwaartse foutstatussen worden doorgegeven. Voor streaming-clients wacht OmniRoute op het hele JSON -antwoord en zendt het vervolgens uit als één inhoudsstuk plus het eindstuk; dit is geen tokenstreaming. Gereedschapsoproepen en gebruiksvelden worden niet in kaart gebracht.

## Nooit herhaald

Een zakelijk verzoek kan bijwerkingen hebben, zelfs als het mislukt. OmniRoute stuurt het daarom één keer:

- geen nieuwe transportpoging en geen omleiding;
- geen nieuwe poging op een andere verbinding (fallback account) — de fout wordt geretourneerd zoals hij is en de verbinding wordt niet afgekoeld;
- geen terugval naar het volgende combodoel, zelfs niet voor een leeg of mislukt antwoord.

Afzonderlijke klantverzoeken en fusiepanels die expliciet verschillende modellen aanroepen, roepen het eindpunt nog steeds onafhankelijk aan.

## Een knooppunt testen

Een verbinding opslaan, de verbinding** Test** knop- en achtergrondgezondheidscontroles roepen nooit het eindpunt aan: ze valideren alleen de opgeslagen configuratie en rapporteren dat de verbinding niet verifieerbaar is.

`POST /api/provider-nodes/validate` met `"apiType": "custom-json"` en de knooppuntvelden (`baseUrl`, `apiKey`, `customJson`, optioneel `customHeaders` en `modelId`) verzendt precies één echt verzoek, met `ping` als de laatste gebruikerstekst. Het beantwoordt `{ "valid": true }` of de stroomopwaartse status (nooit het stroomopwaartse lichaam).

## Opslag

De configuratie wordt opgeslagen in `provider_nodes.custom_json_config_json` (migratie `240_provider_node_custom_json_config.sql`) en gekopieerd naar de `providerSpecificData.customJson` van elke verbinding.

Implementatie: `open-sse/utils/customJson.ts` (validatie en template), `open-sse/executors/customJson.ts` (uitvoerder), `open-sse/services/combo/noReplayLatch.ts` en `src/sse/handlers/chat/responsePolicies.ts` (no-replay).
