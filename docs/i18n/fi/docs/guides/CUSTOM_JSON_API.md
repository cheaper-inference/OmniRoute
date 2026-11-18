# Custom JSON API provider nodes (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Mukautettu JSON API -solmu yhdistää JSON liiketoiminnan päätepisteen, joka ei puhu OpenAI tai Anthropic protokollaa. OmniRoute täyttää JSON -pyyntömallin, lähettää sen täydelliseen päätepisteeseen URL, lukee vastauksen vastauspolusta ja palauttaa sen asiakkaalle asiakkaan omassa muodossa (Chat Completions, Responses, Messages, ...).

Se on OpenAI-yhteensopiva solmu, jossa on `apiType: "custom-json"`; sen id on muotoa `openai-compatible-custom-json-<suffix>`. Kojelautalomake ei ole vielä saatavilla. Luo ja muokkaa näitä solmuja alla olevan palveluntarjoajan solmun API kautta.

## Luo solmu

`POST /api/provider-nodes` (hallinnon todennus):

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

- `baseUrl` on** täydellinen** päätepiste URL. Mitään ei ole liitetty (ei `/chat/completions`, ei `/models`), ja toisin kuin muissa OpenAI-yhteensopivissa solmuissa, oletusarvoista URL ei ole. Sen on oltava `http(s)`, ilman upotettuja valtuustietoja tai `#fragment`, ja se läpäisee saman lähtevän URL suojan kuin jokainen toimittajasolmu, sekä solmu tallennettaessa että jokaisessa pyynnöstä.
- Yhteysavaimen lähettävän solmun (`authType` `bearer` tai `api-key`, mukaan lukien oletusarvo) on käytettävä `https://`. Pelkkä `http://` hyväksytään vain loopback-isäntälle (`localhost`, `127.0.0.0/8`, `::1`) tai `authType: "none"` kanssa, joka ei lähetä avainta. Yksityiset LAN -osoitteet (`10.x`, `172.16-31.x`, `192.168.x`) eivät ole vapautettuja: kuka tahansa kyseisessä verkossa voi lukea avaimen. Tällaisen solmun tallentaminen epäonnistuu komennolla `400`, ja aiemmin tallennettu solmu epäonnistuu sulkeutumaan jokaisella samalla sanomalla tehdyllä pyynnöllä, ennen kuin pyyntöä lähetetään. Jos haluat avata LAN päätepisteen, aseta se TLS taakse (esimerkiksi käänteinen välityspalvelin).
- `customJson` on validoitu Zod:llä; tuntemattomat avaimet hylätään. Jokainen kenttä on valinnainen:

| Ala               | Arvot                                      | Oletus                                                 |
| ----------------- | ------------------------------------------ | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                     | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                | `bearer`                                               |
| `authHeader`      | otsikon nimi, jota käytetään kun `api-key` | `X-API-Key`                                            |
| `requestTemplate` | JSON objekti (≤ 64 KB, syvyys ≤ 32)        | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | kenttäpolku tai `$` koko keholle           | `choices[0].message.content`                           |

- Salaisuus pysyy yhteyden API avaimessa, ei koskaan mallissa. `bearer` lähettää `Authorization: Bearer <key>`:n; `api-key` lähettää `<authHeader>: <key>`. Auth-otsikko ei voi olla `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` tai hyppy-hyppy-otsikko. `none`:llä liitännät eivät tarvitse avainta.
- Ylimääräiset staattiset otsikot käyttävät solmun tavallista `customHeaders` (sama validointi kuin kaikki muut yhteensopivat solmut; todennusotsikot eivät ole sallittuja siellä).

`PUT /api/provider-nodes/<id>` hyväksyy saman `customJson` ja kirjoittaa uudelleen `baseUrl` ja konfiguraation jokaiselle solmun olemassa olevalle yhteydelle. Jos `customJson` jätetään pois, tallennetut asetukset säilyvät; `apiType` vaihtaminen `chat` ksi tai `responses` poistaa sen solmusta ja sen liitännöistä.

Lisää sitten yhteys solmuun tavalliseen tapaan (`POST /api/providers` solmutunnuksella) ja pyydä `<prefix>/<model>`, esimerkiksi `biz/assistant-v1`. Päätepiste ei paljasta malliluetteloa, joten lisää mallien tunnukset käsin.

## Pyydä malleja

Mallit ovat tavallisia JSON. Merkkijonoarvo voi sisältää `{{placeholder}}` -merkkejä; mitään ei arvioida tai suoriteta, eikä objektiavaimia koskaan korvata.

| Paikkamerkki         | Arvo                                                                        |
| -------------------- | --------------------------------------------------------------------------- |
| `{{prompt}}`         | Viimeisimmän käyttäjäviestin teksti (tekstiosat yhdistetty uusilla rivillä) |
| `{{messages}}`       | Keskustelu OpenAI chat-muodossa                                             |
| `{{model}}`          | Pyydetyn mallin tunnus ilman toimittajan etuliitettä                        |
| `{{stream}}`         | Aina `false` — päätepiste vastaa yhdellä JSON -asiakirjalla                 |
| `{{request.<path>}}` | Käännetyn (OpenAI chat -muodon) pyynnön kenttä                              |

- Arvo, joka on täsmälleen yksi paikkamerkki, säilyttää JSON tyyppinsä (`"{{messages}}"` tulee taulukko); pidemmän merkkijonon sisällä oleva paikkamerkki lisätään tekstinä.
- Paikkamerkki, joka ei ratkaise mitään, epäonnistuu pyynnössä HTTP 400:lla sen sijaan, että se lähettäisi epätäydellisen hyötykuorman.
- Polut käyttävät pistemerkintää ja numeerisia indeksejä (`data.items[0].text`). `__proto__`, `prototype` ja `constructor` hylätään avaimissa ja poluissa.

## Vastaukset

Arvosta `responsePath` tulee apuvastaus: merkkijonot kulkevat läpi, muut JSON arvot sarjoidaan. Puuttuva kenttä tai `null` kenttä tai runko, joka ei ole JSON, palauttaa arvon HTTP 502. Ylävirran virhetilat välitetään. Striimausasiakkaille OmniRoute odottaa koko JSON -vastauksen ja lähettää sen sitten yhtenä sisältöpalana plus loppuosana; tämä ei ole token-suoratoistoa. Työkalukutsuja ja käyttökenttiä ei ole kartoitettu.

## Ei koskaan toistettu

Liiketoimintapyynnöllä voi olla sivuvaikutuksia, vaikka se epäonnistuisi. Siksi OmniRoute lähettää sen kerran:

- ei siirron uudelleenyritystä eikä uudelleenohjausta;
- ei uudelleenyritystä toisella yhteydellä (account backback) — vika palautetaan sellaisenaan eikä yhteyttä jäähdytetä;
- ei paluuta seuraavaan yhdistelmäkohteeseen, vaikka vastaus olisi tyhjä tai epäonnistunut.

Erilliset asiakaspyynnöt ja fuusiopaneelit, jotka nimenomaisesti kutsuvat useita malleja, kutsuvat päätepisteen silti itsenäisesti.

## Solmun testaus

Yhteyden tallentaminen, yhteys** Testata** -painiketta ja taustan kuntotarkistukset eivät koskaan kutsu päätepistettä: ne vain vahvistavat tallennetun konfiguraation ja raportoivat yhteyden olevan ei-todennettavissa.

`POST /api/provider-nodes/validate` jossa on `"apiType": "custom-json"` ja solmukentät (`baseUrl`, `apiKey`, `customJson`, valinnainen `customHeaders` ja `modelId`) lähettää täsmälleen yhden todellisen pyynnön, jossa `ping` on viimeisin käyttäjäteksti. Se vastaa `{ "valid": true }` tai ylävirran tilaan (ei koskaan ylävirran runkoon).

## Varastointi

Asetukset tallennetaan `provider_nodes.custom_json_config_json` (migration `240_provider_node_custom_json_config.sql`) ja kopioidaan kunkin yhteyden `providerSpecificData.customJson`.

Toteutus: `open-sse/utils/customJson.ts` (validointi ja mallinnus), `open-sse/executors/customJson.ts` (suorituskyky), `open-sse/services/combo/noReplayLatch.ts` ja `src/sse/handlers/chat/responsePolicies.ts` (ei toistoa).
