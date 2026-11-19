# Custom JSON API provider nodes (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Pielāgots JSON API mezgls savieno JSON biznesa galapunktu, kas nerunā OpenAI vai Anthropic protokolā. OmniRoute aizpilda JSON pieprasījuma veidni, nosūta to uz pilnu galapunktu URL, nolasa atbildi no atbildes ceļa un atdod to klientam klienta paša formātā (tērzēšanas pabeigšana, atbildes, ziņojumi utt.).

Tas ir ar OpenAI saderīgs mezgls ar `apiType: "custom-json"`; tā id ir formā `openai-compatible-custom-json-<suffix>`. Informācijas paneļa veidlapa vēl nav pieejama. Izveidojiet un rediģējiet šos mezglus, izmantojot tālāk norādīto pakalpojumu sniedzēja mezglu API.

## Izveidojiet mezglu

`POST /api/provider-nodes` (pārvaldības autentifikācija):

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

- `baseUrl` ir** pabeigt** galapunkts URL. Nekas nav pievienots (nav `/chat/completions`, nav `/models`), un atšķirībā no citiem ar OpenAI saderīgiem mezgliem nav noklusējuma URL. Tam ir jābūt `http(s)`, bez iegultiem akreditācijas datiem vai `#fragment`, un tas iztur to pašu izejošo URL aizsardzību kā katrs nodrošinātāja mezgls gan tad, kad mezgls tiek saglabāts, gan pēc katra pieprasījuma.
- Mezglam, kas nosūta savienojuma atslēgu (`authType` `bearer` vai `api-key`, ieskaitot noklusējuma), ir jāizmanto `https://`. Vienkāršs `http://` tiek pieņemts tikai cilpas saimniekdatoram (`localhost`, `127.0.0.0/8`, `::1`) vai ar `authType: "none"`, kas nenosūta atslēgu. Privātās LAN adreses (`10.x`, `172.16-31.x`, `192.168.x`) nav atbrīvotas: ikviens šajā tīklā var lasīt atslēgu. Šāda mezgla saglabāšana neizdodas, izmantojot `400`, un iepriekš saglabātais mezgls tiek aizvērts pēc katra pieprasījuma ar to pašu ziņojumu, pirms tiek nosūtīts pieprasījums. Atslēgtam galapunktam LAN, novietojiet to aiz TLS (piemēram, apgrieztā starpniekservera).
- `customJson` ir apstiprināts ar Zod; nezināmas atslēgas tiek noraidītas. Katrs lauks ir neobligāts:

| Lauks             | Vērtības                                      | Noklusējums                                            |
| ----------------- | --------------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                        | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                   | `bearer`                                               |
| `authHeader`      | galvenes nosaukums, ko izmanto, kad `api-key` | `X-API-Key`                                            |
| `requestTemplate` | JSON objekts (≤ 64 KB, dziļums ≤ 32)          | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | lauka ceļš, jeb `$` visam ķermenim            | `choices[0].message.content`                           |

- Noslēpums paliek savienojuma API atslēgā, nevis veidnē. `bearer` nosūta `Authorization: Bearer <key>`; `api-key` nosūta `<authHeader>: <key>`. Auth galvene nevar būt `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` vai hop-by-hop galvene. Izmantojot `none`, savienojumiem nav nepieciešama atslēga.
- Papildu statiskās galvenes izmanto mezgla parasto `customHeaders` (tāda pati validācija kā jebkuram citam saderīgam mezglam; autentifikācijas galvenes tur nav atļautas).

`PUT /api/provider-nodes/<id>` pieņem to pašu `customJson` un pārraksta `baseUrl` un konfigurāciju visos esošajos mezgla savienojumos. Izlaižot `customJson` tiek saglabāta saglabātā konfigurācija; pārslēdzot `apiType` uz `chat` vai `responses` tas tiek noņemts no mezgla un tā savienojumiem.

Pēc tam pievienojiet savienojumu mezglam kā parasti (`POST /api/providers` ar mezgla ID) un pieprasiet `<prefix>/<model>`, piemēram `biz/assistant-v1`. Galapunkts neparāda modeļu sarakstu, tāpēc pievienojiet modeļu ID ar roku.

## Pieprasīt veidnes

Veidnes ir vienkāršas JSON. Virknes vērtība var saturēt `{{placeholder}}` marķierus; nekas netiek novērtēts vai izpildīts, un objektu atslēgas nekad netiek aizstātas.

| Vietturis            | Vērtība                                                                       |
| -------------------- | ----------------------------------------------------------------------------- |
| `{{prompt}}`         | Pēdējā lietotāja ziņojuma teksts (teksta daļas apvienotas ar jaunām rindiņām) |
| `{{messages}}`       | Saruna OpenAI tērzēšanas formātā                                              |
| `{{model}}`          | Pieprasītais modeļa ID bez nodrošinātāja prefiksa                             |
| `{{stream}}`         | Vienmēr `false` — galapunkta atbildes ar vienu JSON dokumentu                 |
| `{{request.<path>}}` | Tulkotā (OpenAI tērzēšanas formāts) pieprasījuma lauks                        |

- Vērtība, kas ir tieši viens vietturis, saglabā savu JSON veidu (`"{{messages}}"` kļūst par masīvu); kā teksts tiek ievietots vietturis garākas virknes iekšpusē.
- Vietturis, kas atrisina neko, neizpilda pieprasījumu ar HTTP 400, nevis nosūta nepilnīgu lietderīgo slodzi.
- Ceļi izmanto punktu apzīmējumu un ciparu indeksus (`data.items[0].text`). Atslēgās un ceļos tiek noraidīti `__proto__`, `prototype` un `constructor`.

## Atbildes

Vērtība `responsePath` kļūst par palīga atbildi: virknes iet cauri, citas JSON vērtības tiek serializētas. Trūkstošais lauks vai `null` lauks vai pamatteksts, kas nav JSON, atgriež HTTP 502. Augšupējo kļūdu statusi tiek nodoti cauri. Straumēšanas klientiem OmniRoute sagaida visu JSON atbildi un pēc tam izstaro to kā vienu satura daļu un gala daļu; šī nav marķiera straumēšana. Rīku izsaukumi un lietošanas lauki nav kartēti.

## Nekad nav atskaņots

Biznesa pieprasījumam var būt blakusparādības pat tad, ja tas neizdodas. Tāpēc OmniRoute to nosūta vienreiz:

- nav transportēšanas atkārtota mēģinājuma un nav pāradresācijas sekošanas;
- nav atkārtota mēģinājuma ar citu savienojumu (konta atkāpšanās) — kļūme tiek atgriezta tāda, kāda tā ir, un savienojums netiek atdzisis;
- nav atkāpšanās uz nākamo kombinēto mērķi, pat ja atbilde ir tukša vai neizdevās.

Atsevišķi klientu pieprasījumi un saplūšanas paneļi, kas skaidri izsauc vairākus modeļus, galapunktu joprojām izsauc neatkarīgi.

## Mezgla pārbaude

Savienojuma saglabāšana, savienojums** Pārbaude** poga un fona veselības pārbaudes nekad neizsauc galapunktu: tās tikai apstiprina saglabāto konfigurāciju un ziņo par savienojumu kā nepārbaudāmu.

`POST /api/provider-nodes/validate` ar `"apiType": "custom-json"` un mezglu laukiem (`baseUrl`, `apiKey`, `customJson`, neobligāti `customHeaders` un `modelId`) nosūta tieši vienu reālu pieprasījumu ar `ping` kā jaunāko lietotāja tekstu. Tas atbild `{ "valid": true }` vai augšteces statusu (nekad augšpus korpusam).

## Uzglabāšana

Konfigurācija tiek saglabāta `provider_nodes.custom_json_config_json` (migrācijas `240_provider_node_custom_json_config.sql`) un kopēta katra savienojuma `providerSpecificData.customJson`.

Īstenošana: `open-sse/utils/customJson.ts` (validācija un veidņu veidošana), `open-sse/executors/customJson.ts` (izpildītājs), `open-sse/services/combo/noReplayLatch.ts` un `src/sse/handlers/chat/responsePolicies.ts` (bez atkārtošanas).
