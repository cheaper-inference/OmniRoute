# Model Exposure Allow/Deny List (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇦 [bs](../../../bs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Ota käyttöön, oletuksena pois päältä (`modelVisibilityAllowlist`/`modelVisibilityDenylist` molemmat tyhjät jättävät `/v1/models` -luettelon AND jokainen `auto/*` -ehdokasvarastotavu-identtinen). `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) -sisarus operaattoreille, jotka haluavat kuratoidun malliluettelon syistä, joilla ei ole mitään tekemistä kustannusten kanssa.

## Miksi tämä on olemassa

`hidePaidModels` vastaa "onko tämä malli ilmainen?" ja `hideAutoCombos` vastaa: "Pitäisikö `auto/*` -virtuaalitunnuksia mainostaa ollenkaan?" — ei myöskään anna operaattorin valita mielivaltaista mallien osajoukkoa (esim. esittämällä täsmälleen ne mallit, jotka tietyn Claude Code / OpenCode -asiakkaan pitäisi nähdä, hinnoittelusta riippumatta). #11481 lisää sen kahtena itsenäisenä, valinnaisena merkkijonotaulukkoasetuksena.

## Asetukset

| Avain                      | Tyyppi     | Oletus | Merkitys                                                                    |
| -------------------------- | ---------- | ------ | --------------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`   | Hakijaa vastaavat merkinnät piilottavat sen catalog/candidate poolista.     |
| `modelVisibilityAllowlist` | `string[]` | `[]`   | Kun ne eivät ole tyhjiä, ehdokasta vastaavat ONLY merkinnät pysyvät esillä. |

Molemmat hyväksyvät enintään 500 merkintää, joista kukin on enintään 200 merkkiä (Zod-validoitu `src/shared/validation/settingsSchemas.ts`:ssa). Merkintä on joko:

- tarkka luettelotunnus — `"gpt-4o"` (paljaan mallin tunnus) tai `"openai/gpt-4o"` (toimittajan etuliite) tai
- glob-kuvio käyttäen `*`/`?` — esim. `"openai/gpt-4*"` tai `"anthropic/*"` — joka on ratkaistu saman jaetun `globToRegex()` sovittimen (`src/shared/utils/globPattern.ts`) kautta, jota `ModelRoutingSection`:n mallikohtaiset yhdistelmäkuvaukset ja `freeModels.ts::matchesOnlyPaidModels` jo käyttävät.

Ensisijaisuus: estolista tarkistetaan ensin (kielletty merkintä on aina piilotettu, vaikka se vastaisi myös sallittujen luetteloa); kun sallittujen luettelo ei ole tyhjä, vain ne vastaavat merkinnät säilyvät.

## Kaksi rikastuspistettä, ei yksi

Oppitunti numerosta #6512 ( `hidePaidModels` -only -luettelosuodatin antoi silti `auto/*` reitittää maksettuun malliin, koska yhdistelmäehdokkaiden joukko rakennettiin itsenäisesti) pätee tässä samalla tavalla. Vastaava predikaatti `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) kutsutaan BOTH: stä :

- `src/app/api/v1/models/catalog.ts` — itse `/v1/models` listaus, samoilla viidellä lähdekohtaisessa kuristuspisteessä `shouldHidePaid()` jo portteja (staattinen `PROVIDER_MODELS`, synkronoidut palveluntarjoajan rivit, mukautetut rivit, alias-tuetut rivit, hallitut vararivit).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — kutsui `virtualFactory.ts::buildPreparedPool` välittömästi vastaavan `filterPaidOnlyCandidates()` -kutsun jälkeen, joten estettyä mallia ei myöskään voida koskaan valita `auto/*` ehdokaspooliin.

## Mikä on NOT suodatettu

Peilaa `hideAutoCombos` nykyistä käyttäytymistä: mallin tunnus lähetetty** nimenomaisesti** (ei `auto/*` kautta, eikä sitä löydy luettelon kautta) ei ole koskaan estetty lähetyksen yhteydessä. — vain advertisement/candidate-pool jäsenyys suodatetaan. Tämä on riippumaton `hidePaidModels`; operaattori voi haluta kuratoidun joukon syistä, joilla ei ole mitään tekemistä kustannusten kanssa, joten molemmat asetukset muodostavat itsenäisiä AND-ed-suodattimia, kuten `catalog.ts`:n nykyinen usean lipun koostumus.

Asetusten vienti (`GET /api/settings/export-json`) sisältää molemmat taulukot sanatarkasti, kuten kaikki muutkin asetuskentät — toisin kuin `hidePaidModels`:n yhdistelmävaiheinen vientisuodatin, tässä ei ole uudelleenhydraation riskiä: vietyyn yhdistelmävaiheeseen upotettu estetty tunnus on operaattorin oma eksplisiittinen reititysvalinta, ei asia, jota vientirajan on poistettava.

## Vain yhdistelmät -listaus (`exposeCombosOnly`)

Erillinen boolean, oletuksena myös opt-in ja `false` käyttöönotoksille, joissa yhdistelmät ovat julkinen mallipinta ja toimittajat ovat vain taustajärjestelmiä. Kun se on `true`, julkinen listaus (`GET /v1/models`, `GET /v1` ja muut `getUnifiedModelsResponse()` lle rakennetut `/v1` -etsintäreitit ) säilyttää vain rivit `owned_by: "combo"`: user -komboilla sekä sisäänrakennetut `auto/*` -yhdistelmät (ellei `hideAutoCombos` piilota niitä). Se käyttää samaa rivitestiä kuin näppäinkohtainen `catalogScope: "combos"`, ja avaimen omat allow/deny/scope suodattimet ovat edelleen päällä.

Ota se käyttöön** Asetukset → Reititys → Mallit API listaus** , tai `PATCH /api/settings {"exposeCombosOnly": true}` llä.

Kuten yllä olevat luettelot, se muuttaa vain mainoksia:

- eksplisiittinen `provider/model` -tunnus lähettää edelleen, ja `GET /v1/models/{id}` ratkaisee sen edelleen;
- kojelaudan luetteloa (`GET /api/models/catalog`, mallivalitsijoiden käyttämä) ei kavenneta;
- sitä ei peilata `auto/*` ehdokaspooleihin, joten `auto/*` -yhdistelmät säilyttävät täyden altaan.
