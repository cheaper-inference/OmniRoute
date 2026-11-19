# Custom JSON API provider nodes (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

En tilpasset JSON API node kobler til et JSON forretningsendepunkt som ikke snakker OpenAI eller Anthropic protokollen. OmniRoute fyller en JSON -forespørselsmal, sender den til det komplette endepunktet URL, leser svaret fra en svarbane og returnerer det til klienten i klientens eget format (chatfullføringer, svar, meldinger, ...).

Det er en OpenAI-kompatibel node med `apiType: "custom-json"`; dens id har formen `openai-compatible-custom-json-<suffix>`. Dashboardskjemaet er ikke tilgjengelig ennå. Opprett og rediger disse nodene gjennom leverandørnoden API nedenfor.

## Lag en node

`POST /api/provider-nodes` (administrasjonsautorisasjon):

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

- `baseUrl` er** fullstendig** endepunkt URL. Ingenting er lagt til (ingen `/chat/completions`, ingen `/models`) og, i motsetning til andre OpenAI-kompatible noder, er det ingen standard URL. Den må være `http(s)`, uten innebygd legitimasjon eller en `#fragment`, og den passerer den samme utgående URL vakten som hver leverandørnode, både når noden er lagret og ved hver forespørsel.
- En node som sender tilkoblingsnøkkelen (`authType` `bearer` eller `api-key`, inkludert standard) må bruke `https://`. Vanlig `http://` aksepteres bare for en loopback-vert (`localhost`, `127.0.0.0/8`, `::1`) eller med `authType: "none"`, som ikke sender noen nøkkel. Private LAN -adresser (`10.x`, `172.16-31.x`, `192.168.x`) er ikke unntatt: alle på det nettverket kan lese nøkkelen. Lagring av en slik node mislykkes med `400`, og en node lagret tidligere mislykkes ved hver forespørsel med samme melding, før en forespørsel sendes. For et nøkkelende endepunkt på en LAN, sett det bak TLS (for eksempel en omvendt proxy).
- `customJson` er validert med Zod; ukjente nøkler avvises. Hvert felt er valgfritt:

| Felt              | Verdier                              | Misligholde                                            |
| ----------------- | ------------------------------------ | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`               | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`          | `bearer`                                               |
| `authHeader`      | headernavn brukt når `api-key`       | `X-API-Key`                                            |
| `requestTemplate` | JSON objekt (≤ 64 KB, dybde ≤ 32)    | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | feltbane, eller `$` for hele kroppen | `choices[0].message.content`                           |

- Hemmeligheten forblir i forbindelsens API nøkkel, aldri i malen. `bearer` sender `Authorization: Bearer <key>`; `api-key` sender `<authHeader>: <key>`. Auth-headeren kan ikke være `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` eller en hop-by-hop-header. Med `none` trenger tilkoblinger ingen nøkkel.
- Ekstra statiske overskrifter bruker nodens vanlige `customHeaders` (samme validering som alle andre kompatible noder; auth-hoder er ikke tillatt der).

`PUT /api/provider-nodes/<id>` aksepterer den samme `customJson` og omskriver `baseUrl` og konfigurasjonen på hver eksisterende tilkobling av noden. Å utelate `customJson` beholder den lagrede konfigurasjonen; å bytte `apiType` til `chat` eller `responses` fjerner den fra noden og dens tilkoblinger.

Legg deretter til en tilkobling til noden som vanlig (`POST /api/providers` med node-ID) og be om `<prefix>/<model>`, for eksempel `biz/assistant-v1`. Endepunktet viser ingen modellliste, så legg til modell-ID-ene for hånd.

## Be om maler

Malene er vanlige JSON. En strengverdi kan inneholde `{{placeholder}}` markører; ingenting blir evaluert eller utført, og objektnøkler erstattes aldri.

| Plassholder          | Verdi                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `{{prompt}}`         | Tekst til den siste brukermeldingen (tekstdeler sammen med nye linjer) |
| `{{messages}}`       | Samtalen i OpenAI chat-format                                          |
| `{{model}}`          | Den forespurte modell-ID-en, uten leverandørprefikset                  |
| `{{stream}}`         | `false` — alltid endepunktet svarer med ett JSON -dokument             |
| `{{request.<path>}}` | Et felt med den oversatte forespørselen (OpenAI chat-format).          |

- En verdi som er nøyaktig én plassholder beholder sin JSON type (`"{{messages}}"` blir en matrise); en plassholder inne i en lengre streng settes inn som tekst.
- En plassholder som løser seg til ingenting, mislykkes forespørselen med HTTP 400 i stedet for å sende en ufullstendig nyttelast.
- Baner bruker punktnotasjon og numeriske indekser (`data.items[0].text`). `__proto__`, `prototype` og `constructor` avvises i nøkler og baner.

## Svar

Verdien ved `responsePath` blir assistentsvaret: strenger går gjennom, andre JSON verdier serialiseres. Et manglende eller `null` felt, eller en kropp som ikke er JSON, returnerer HTTP 502. Oppstrøms feilstatuser sendes gjennom. For streaming-klienter venter OmniRoute på hele JSON -svaret og sender det ut som én innholdsdel pluss sluttdelen; dette er ikke token-streaming. Verktøyanrop og bruksfelt er ikke kartlagt.

## Aldri spilt på nytt

En forretningsforespørsel kan ha bivirkninger selv når den mislykkes. OmniRoute sender det derfor én gang:

- ingen transport på nytt og ingen omdirigering følgende;
- ingen forsøk på en annen tilkobling (kontofallback) — feilen returneres som den er og tilkoblingen er ikke avkjølt;
- ingen fallback til neste kombinasjonsmål, selv for et tomt eller mislykket svar.

Separate klientforespørsler og fusjonspaneler som eksplisitt kaller flere modeller, påkaller fortsatt endepunktet uavhengig.

## Tester en node

Lagre en tilkobling, tilkoblingen** Test** knapp- og bakgrunnshelsesjekker kaller aldri endepunktet: de validerer bare den lagrede konfigurasjonen og rapporterer tilkoblingen som ikke verifiserbar.

`POST /api/provider-nodes/validate` med `"apiType": "custom-json"` og nodefeltene (`baseUrl`, `apiKey`, `customJson`, valgfri `customHeaders` og `modelId`) sender nøyaktig én reell forespørsel, med `ping` som siste brukertekst. Den svarer på `{ "valid": true }` eller oppstrømsstatusen (aldri oppstrømskroppen).

## Lagring

Konfigurasjonen lagres i `provider_nodes.custom_json_config_json` (migrering `240_provider_node_custom_json_config.sql`) og kopieres inn i hver tilkoblings `providerSpecificData.customJson`.

Implementering: `open-sse/utils/customJson.ts` (validering og maling), `open-sse/executors/customJson.ts` (executor), `open-sse/services/combo/noReplayLatch.ts` og `src/sse/handlers/chat/responsePolicies.ts` (ingen replay).
