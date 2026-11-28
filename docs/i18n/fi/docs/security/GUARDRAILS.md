# Guardrails (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Totuuden lähde:** `src/lib/guardrails/`

Suojakaiteet valvovat turvallisuutta, käytäntöjä ja sisältömuutoksia OmniRoute ja ylävirran palveluntarjoajien välisellä rajalla. Jokainen suojakaide voi tarkastaa (ja valinnaisesti hylätä, muuntaa tai merkitä) pyyntöhyötykuormia (`preCall`) ja ylävirran vastauksia (`postCall`).

Järjestelmä on** epäonnistunut** : jos suojakaide heittää suorituksen aikana, rekisteri tallentaa virheen ja jatkaa seuraavalla suojakaiteella pyynnön epäonnistumisen sijaan. Estäminen on selkeä päätös (`block: true`), ei koskaan onnettomuus. Ainoa poikkeus on keskeytetty pyyntö: kun soittajan `signal` keskeytetään, heittävä suojakaide hylkää koukun juoksun sen sijaan, että se ohitettaisiin.

Koukut tekevät** ei** ajaa jokaisella reitillä tai jokaisella vastauksella. Lue [kattavuus ja rajat](#coverage-and-limits) ennen kuin luotat suojakaiteeseen turvatarkastuksena.

## Sisäänrakennetut suojakaiteet

Rekisteri lataa nämä suojakaiteet automaattisesti tärkeysjärjestyksessä tuonnin yhteydessä (katso `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteetti | Nimi                | Vaihe(t)       | Tiedosto                  |
| ------------ | ------------------- | -------------- | ------------------------- |
| `1`          | `agent-guard`       | `preCall`      | `agentGuard/guardrail.ts` |
| `5`          | `vision-bridge`     | `preCall`      | `visionBridge.ts`         |
| `6`          | `audio-bridge`      | `preCall`      | `audioBridge.ts`          |
| `7`          | `video-bridge`      | `preCall`      | `videoBridge.ts`          |
| `10`         | `pii-masker`        | `pre` + `post` | `piiMasker.ts`            |
| `20`         | `prompt-injection`  | `preCall`      | `promptInjection.ts`      |
| `95`         | `credential-masker` | `pre` + `post` | `credentialMasker.ts`     |

Alemman prioriteetin numerot juoksevat** ensimmäinen** .

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 -perusmallilla ja `glm-5.3-{low,high,max}` llä on selkeät `supportsVision:false` registry/spec -metatiedot. GLM 5.3 Flash -versiot pysyvät alkuperäisinä malleina. Claude koodin `/v1/messages` reitti tulee jaettuun `handleChat` -esipuhelun suojakaiteen ketjuun** ennen** Claude-to-OpenAI-käännös; sisäkkäiset `Read` -työkalutuloskuvat on kuvattava tai käsiteltävä ennen kuin käännös nostaa ne OpenAI `image_url` -sisältöön (#17069).

Sieppaa kuvia sisältävät pyynnöt, jotka on kohdistettu** ei-näkemättömät mallit** ja joko reitittää koko pyynnön uudelleen näkökykyiseen malliin tai korvaa kuvaosat konfiguroitavan näkömallin tuottamilla tekstikuvauksilla ennen ylävirran kutsua. Tämän ansiosta vain teksti -palveluntarjoajat voivat käsitellä multimodaalisia hyötykuormia läpinäkyvästi.

Virtaus:

1. Ohita, jos kohdemalli jo tukee näköä (ellei se näy pakkosiltaluettelossa `isVisionBridgeForcedModel`).
2. Pura kuvaosat `extractImageParts(messages)` :n (`visionBridgeHelpers.ts`) kautta, joka delegoituu** yhtenäinen median tunnistin** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — ainoa totuuden lähde, joka jaetaan yhdistelmäyhteensopivuussuodattimen kanssa. Purkaminen on sallittujen muodoissa, jotka `replaceImageParts` voi liittää takaisin (poisto ↔ korvaa sopimuksen): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` ja Vastaukset API `input_image`. Claude Coden `tool_result.content` ja Responses-työkalun tulosteiden sisällä olevat vastaavat kuvat puretaan ja korvataan alkuperäisillä poluilla. vain indikaattoreita sisältävät muodot ovat yhdistelmäsuodatinmateriaalia, eikä niitä poisteta. Ohita, jos yhtään ei löydy.
3. Ratkaise ajonaikaiset asetukset `resolveVisionBridgeRuntimeSettings()` :n (`src/shared/constants/modalityBridgeDefaults.ts`) kautta: uudet `modalityBridge*` asetusnäppäimet voittaa; vanhat `visionBridge*` avaimet säilyvät a** yhden syklin varmistus** (palautusikkuna). Ohita ennen median läpikulkua, kun silta on poistettu käytöstä.
4. Tilavalitsin (`modalityBridgeVisionMode`, katso alla oleva taulukko) päättää uudelleenreitityksen vs. kuvauksen. Reroute palauttaa `modifiedPayload`, jossa vain `model` on vaihdettu, sekä meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Kuvaile polku: rajoita kuvat osoitteessa `maxImages`, kirjoita tehtävätietoinen kehote, katso kuvausvälimuistia, kutsu visiomalli** rinnakkain** (`Promise.allSettled`) ja lisää `[Image N]: <description>` tekstiosat niiden tilalle. Epäonnistunut kuvaus tuottaa `null`: raakakuva säilytetään unknown/vision-capable -kohteille (#4012), mutta** vahvistettu vain teksti -suora kohde** tai zero-vision -yhdistelmä saa eksplisiittisen `(unavailable — no vision-capable provider connected)` -tekstin tynkän jokaiselle kuvaamattomalle kuvalle, mukaan lukien osittaiset viat ja kuvat, jotka ylittävät kuvaus-kutsun rajan (#17069). Olemassa oleva kaikki epäonnistunut yhdistelmä, joka kuvaa palautusta, pysyy paikallaan (#8430).
6. Palauta `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Tilan valitsin (`modalityBridgeVisionMode`)

| tila       | Oletus | Käyttäytyminen                                                                                                                                                                                                                                                                                                                  |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Vanha heuristinen, koskematon (#6640/#7204): ei-kombo-/`auto/` mallit reitittävät uudelleen parhaaseen näkömalliin, ellei alkuperäisessä mallissa ole jo käyttökelpoisia tunnistetietoja (kuvaa sitten); yhdistelmäkohteet kuvaavat aina.                                                                                       |
| `describe` |        | Kuvaa aina — uudelleenreitityslohko ohitetaan kokonaan; käyttäjän valitsema malli vastaa aina.                                                                                                                                                                                                                                  |
| `reroute`  |        | Pakota uudelleenreititys: Säilytä tunnistetiedot -mallin vartija ohitetaan. Uudelleenreititys-** tavoite** Credential Guard käyttää edelleen —, kun käytettävissä ei ole käytettävissä olevaa näkökohdetta, silta estää selkeän virheen sen sijaan, että kuvaisi tai lähettäisi raakakuvia vain tekstiä sisältävään kohteeseen. |

Pakotetut tilat oikosulku** ennen** automaattinen heuristinen ajo; `auto` käyttäytyminen on tavu-identtistä pre-PR-1 suojakaiteen kanssa.

#### API-avaimen laajuus (`visionBridgeKeyScope.ts`)

Kun soittajan API -näppäin rajoittaa `allowedConnections`, kiintiövarastoa (`allowedQuotas`) tai malleja (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), silta valitsee vain uudelleenreitityksen ja kuvailee mallit, joita avain voi käyttää, yhteyksissä, joita avain voi käyttää. Kuvauskutsu kulkee aina OmniRoute itsesilmukan läpi `x-omniroute-self-loop-key-id` otsikon kanssa, joten vastaanottava chat-pyyntö pakottaa uudelleen kyseisen avaimen yhteys- ja mallikäytännön. `enforceApiKeyPolicy()` kunnioittaa tätä otsikkoa vain yhdessä itsesilmukan siirtotien kanssa, joten se voi vain kaventaa pääsyä, ja id, joka ei ratkaise, hylätään.

Jos avaimelle ei sallita näkömallia, a** vahvistettu vain tekstikohde** hylkää kuvapyynnön paikallisesti selkeällä HTTP 400:lla sen sijaan, että se välittäisi kuvatavuja kyvyttömään ylävirtaan (#17069). Kohteissa, joilla on tuntematon tai natiivi visiokyky, kuvauspolku säilyttää aiemman vikasietokäytön (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Pyynnöt ilman avainta ja avaimet ilman näitä rajoituksia toimivat täsmälleen kuten ennenkin.

#### Tehtävätietoinen kuvauskehote (`modalityBridgeVisionTaskAware`)

Oletus** totta** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) liittää tekstin** viimeisin käyttäjäviesti** (katkaistu 500 merkiksi) pohjaan kuvaileva kehote ohjaa kuvausta kohti sitä, mitä käyttäjä todella kysyi (codex-vision-proxy-malli) ja pyytää visiomallia litteroimaan näkyvää tekstiä. Kun lippu ei ole käytössä — tai ei käyttäjätekstiä — peruskehotetta käytetään muuttumattomana.

Kuvailevan itsesilmukan oma OpenAI-yhteensopiva pyyntö (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) pyytää aina `image_url.detail: "high"` — ehdoitta jokaiselle caller/provider, joka ei ole portitettu mihinkään asiakassignaaliin. Vähäyksityiskohtainen näytteenotto heikentää OCR tarkkuutta juuri siinä tekstin transkriptiotehtävässä, jota tämä kehote pyytää, joten itse kuvauskutsu pyytää aina korkeaa yksityiskohtaa riippumatta siitä, mitä yksityiskohtatasoa alkuperäinen saapuva pyyntö käytti. Tämä vaikuttaa vain sisäisen kuvauspyynnön runkoon; se ei muuta sitä, miten OmniRoute välittää soittajan oman `image_url.detail` ensisijaisessa pyynnössä —, että oletusarvoa sovelletaan erikseen ja vain havaituille OpenCode asiakkaille `defaultImageDetail()` :ssa (`open-sse/handlers/chatCore/upstreamBody.ts`). Kuvailevan itsesilmukan Anthropic lankamuotoisessa haarassa ei ole `detail` kenttää, eikä kumpikaan oletus vaikuta siihen.

#### Kuvaile lähtösuojus (`modalityBridgeVisionMaxChars`)

| Avain                          | Oletus | Alue              |
| ------------------------------ | ------ | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` tai 100-50000 |

`0` (oletus) tarkoittaa** ei korkkia** — `callVisionModel()` :n palauttama kuvaus välitetään muokkaamattomana, mikä säilyttää nykyisen käyttäytymisen. Mikä tahansa arvo alueella 100–50 000 katkaisee kuvauksen `…` -liitteellä ennen kuin se jaetaan takaisin muotoon `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`). Nosta tämä yksityiskohtia vaativissa OCR -tehtävissä, joissa loppupään malli tarvitsee täyden transkription; alenna se sidottuun merkkien käyttöön juttelevissa visiomalleissa. Kojelautakenttä sijaitsee Vision-välilehden Advanced-paneelissa (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) ja kiinnittää minkä tahansa arvon välillä 1-99 100 kerrokseen asti jättäen eksplisiittisen `0` koskematta. — `0` on kelvollinen Zod -arvo itsessään (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ei vain oletusarvo "unset".

#### Kuvaile välimuistia (`modalityBridge/bridgeCache.ts`)

Muistissa oleva LRU + TTL -välimuisti kuvaustulosteita varten, jaettu prosessinlaajuisesti. Näppäin = `sha256(imageRef + composedPrompt + configuredBridgeModel)` pituusetuliitekehyksellä (ei kentän rajan törmäyksiä). Mallin komponentti on** määritetty** siltamalli, ei malli, joka todella vastasi — `callVisionModel` saattaa pudota sisäisesti, ja yrityskohtainen näppäily pirstoisi välimuistin. Epäonnistuneita kuvauksia ei koskaan tallenneta välimuistiin. Asetukset:

| Avain                           | Oletus | Alue    |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Kuvan etänormalisointi (itsesilmukka describe/base64 haku)

Kun silta hakee a** kauko-** itse kuva — Anthropic kuvaa itsekutsua ja claude-wire-muotoista base64-muuntoa (`ensureBase64ImagesForClaudeWire`), molemmat `fetchRemoteImageAsDataUri()` kautta `visionBridgeHelpers.ts` — ssä, tuloksena oleva data URI välitetään `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) läpi ennen kuin se upotetaan näkömallipyyntöön. Ylisuuret kuvat pienennetään arvoon a** 2048px pitkä reuna** (vastaa koon rajoitinta OpenAI/Anthropic jo käytä palvelinpuolta), mikä leikkaa bytes/latency -latauksen muuttamatta sitä, mitä visiomalli näkee. Koon muuttaminen käyttää `sharp`, joka ladataan dynaamisen tuonnin kautta: alustalla, jossa sen alkuperäinen binaari ei lataudu, `normalizeDataUri()`** ei koskaan heitä** — se putoaa takaisin alkuperäisten tavujen läpivientiin, joten describe/base64-conversion polku toimii aina. Muut kuin kuvatavut (haku, joka ei palauttanut dekoodattavaa kuvaa) kulkevat myös koskemattomina. Tämä normalisointi on kohdistettu kuviin, jotka silta hakee omaa itsekutsuaan varten — eikä sitä koskaan sovelleta soittajan raakaan läpivientihyötykuormaan, mikä on vain opt-in-only -mutaatioperiaatteen (Hard Rule #20) mukaista.

#### Asetusskeema + migration

Uudet `modalityBridge*` näppäimet on Zod-validoitu `updateSettingsSchema` :ssä (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trio ja Audio Bridgen käyttämä `modalityBridgeAudio*` ryhmä. Siirto `141_modality_bridge_settings.sql` kopioi olemassa olevat vanhat `visionBridge*` -arvot vastaaviin uusiin avaimiin (idempotentti, ei koskaan korvaa operaattorin määrittämää `modalityBridge*` -arvoa); vanhat avaimet hyväksytään lukuvarauksiksi yhden julkaisujakson ajan.

#### Läpinäkyvyysotsikko + stats

Kuvaile-muunnetut vastaukset sisältävät `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (rakennettu `buildModalityBridgeHeader()` :llä `modalityBridge/bridgeStats.ts`:ssä, leimattu `withModalityBridgeHeader()` :llä `src/sse/handlers/chatHelpers.ts`:ssä). Uudelleenreititetyt pyynnöt saavat** ei** header — hyötykuorma jäi koskemattomaksi ja mallinvaihto näkyy jo vastausrungon `model` kentässä.

`GET /api/modality-bridge/stats` (management auth, sama taso kuin `GET /api/settings`) palauttaa muistissa olevat modaliteettikohtaiset laskurit `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` arvoille `vision`, `audio` ja `video`. `averageLatencyMs` käyttää nimittäjänä `latencySamples`, ei kaikkia yrityksiä; operaatio ilman ajoitusta ei muodosta nolla millisekunnin näytettä. `bridged` on edelleen taaksepäin yhteensopiva alias onnistuneille muunnoksille; epäonnistuneet yritykset eivät lisää sitä. Laskurit nollataan prosessin uudelleenkäynnistyksen yhteydessä (telemetria, ei kirjanpito).

#### Kojelaudan määritys

Oma kojelautasivu on `/dashboard/settings/modality-bridge`. Sen URL-osoitteella olevat `Vision`, `Audio` ja `Video` -välilehdet säilyttävät kyselyparametrit vaihtaessaan `tab` -arvoa. Visio-välilehti paljastaa käyttöönoton, tilan, mallin valinnan (mukaan lukien automaattinen oletus), tehtävätietoiset kehotteet, edistyneet timeout/image/description-length/cache rajat, ajonaikaiset laskurit ja suojatun näytepyynnön. Ääni-välilehti on myös käytössä: se paljastaa käyttöönoton, vain STT-mallin valitsimen, jossa on automaattinen, timeout/max-clip rajat, äänilaskurit ja `input_audio` -näytetesti. Video-välilehti on toimiva: se ilmoittaa FFmpeg/ffprobe ajonaikaisen tilan — yhden neljästä eksplisiittisestä UI tilasta (`unknown`, kun anturi on lennossa tai ei voinut suorittaa loppuun, `restricted` ei-palauttavalla kojelautaisännällä, jossa — enable/model/frame/video/timeout asiakaspuolella, `unavailable` kerran tutkittu ja varmistettu puuttuvan, tai `available` versio FFmpeg/ffprobe versiolla) rajoittaa, suodattaa mallinvalitsimen näkökykyisille malleille ja paljastaa videolaskurit.

Entinen Vision Bridge -kortti AI asetuksissa on yhteensopivuuslinkki uudelle sivulle; se ei enää omista toista kopiota lomakkeesta. Mediantarjoajat myös linkittävät kuvasta tekstiksi ja puheen tekstiksi -työnkulkuja vastaaviin Modality Bridge -välilehtiin poistamatta olemassa olevaa puheen tekstiksi -leikkikenttää.

**Omasilmukaisen sisäänpääsyn ohitus:** kun kuvaile puhelu reitit OmniRoute:n oman `/v1` -itsesilmukan (ei-standardi palveluntarjoajan malli #1350 kautta, alipyyntö lähettää `x-omniroute-admission-bypass: internal` ja todennetaan ratkaistuilla itsesilmukan valtuustiedoilla — paikallisessa `sk_omniroute` `REQUIRE_API_KEY=true` tai operaattorin määrittämillä `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` -näppäimellä voidaan kuvata niin edelleen. soittaa. Ohitus myönnetään vain niille tarkalle tunnistetiedolle, joten ulkoiset asiakkaat eivät voi ohittaa sisäänpääsyä otsikon avulla.

Vanhat oletusasetukset elävät `src/shared/constants/visionBridgeDefaults.ts`; uudet mode/task-aware/cache -oletusasetukset ja asetusten ratkaisija ovat `src/shared/constants/modalityBridgeDefaults.ts` ssä. Suojakaide paljastaa `deps` -konstruktorivaihtoehdon, jotta testit voivat lisätä väärennettyjä `getSettings` ja `callVisionModel` -toteutuksia.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Sieppaa ääntä sisältävät chat-pyynnöt ennen kuin ne saavuttavat kohteen, jonka ei tiedetä hyväksyvän äänituloa. Se ei koskaan reititä keskustelupyyntöä uudelleen: ääniosat litteroidaan olemassa olevan OpenAI-yhteensopivan moniosaisen päätepisteen kautta ja valittu chat-malli jatkuu tekstitranskripteillä.

Virtaus:

1. Ratkaise `supportsAudio` `getResolvedModelCapabilities()` kautta. Eksplisiittiset toimittajarekisterin metatiedot voittaa, sitten staattiset mallin metatiedot ja sitten synkronoidut `modalities_input`. Ilmoitettu syöttöluettelo ilman `audio` :tä on `false`; kyvykkyydestä ei ole todisteita `null`. Sekä `false` että `null` aktivoivat konservatiivisen sillan, kun taas `true` ohittaa sen.
2. Ratkaise `modalityBridgeAudio*` -asetukset ja poimi liitettäviä huipputason ääniosia jokaisesta viestistä jaetun `detectMediaParts()` tunnistimen kautta. Tuetut lankamuodot ovat OpenAI `input_audio`, `audio_url` ja `source.media_type: "audio/*"`. Sisäkkäinen ääni havaitaan reititystä varten, mutta liitospolku ei poista sitä. Työn yläraja on `modalityBridgeAudioMaxClips`; myöhemmät osat pysyvät koskemattomina.
3. Kunnioita määritettyä `provider/model` tai anna `selectAudioBridgeModel()` kävellä `AUDIO_TRANSCRIPTION_PROVIDERS` vakaassa luettelojärjestyksessä ja valitse ensimmäinen malli, jossa on käytettävissä olevat aktiiviset toimittajan tunnistetiedot.
4. `callAudioTranscription()` muuntaa base64/data-URI -äänen moniosaiseksi `file` tiedostoksi tai lataa etä- `audio_url` vain julkisen lähtevän suojan kautta, jossa on DNS -kiinnitys ja 25 MB -sidos. Sitten se POSTs tiedoston ja valitun mallin paikalliseen `/v1/audio/transcriptions` -itsesilmukkaan, joka on todennettu `resolveSelfLoopBearer()` lla. Olemassa oleva transkriptioreitti suorittaa normaalin valtuustietojen haun, cooldown/rate-limit -käsittelyn ja palveluntarjoajan lähettämisen.
5. Onnistuneet puhelut korvaavat niiden osat `[Audio N]: <transcript>`. Puhelut suoritetaan `Promise.allSettled` llä: yksittäinen vika säilyttää alkuperäisen ääniosan (#4012 -sopimus). Jos jokainen kutsu epäonnistuu ja kohde on todistettu `supportsAudio === false`, osista tulee `[Audio N]: (unavailable — no STT provider connected)` (#8430 sopimus). Tuntemattomalle kohteelle (`null`) kaikkien epäonnistumisten tulos pysyy koskemattomana. Todistettu teksti-kohde ilman käyttökelpoisia STT tunnistetietoja vastaanottaa saman nimenomaisen tynkän ilman verkkopuhelua.

Onnistuneet transkriptit käyttävät prosessinlaajuista Modality Bridge LRU/TTL -välimuistia. Näppäin yhdistää ääniviitteen, vakaan `audio-transcription` toimintotunnisteen ja valitun STT -mallin; vikoja ei koskaan tallenneta välimuistiin. Ääniyritykset päivittävät jaetut `bridged`, `cacheHits`, `failures` ja `lastUsedAt` -laskurit. Muunnetut vastaukset sisältävät `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; koskemattomat pyynnöt eivät vastaanota Audio Bridge -segmenttiä.

Ajonaikaiset asetukset ovat DB-tukea ja Zod-validoituja:

| Avain                         | Oletus  | Alue            |
| ----------------------------- | ------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —               |
| `modalityBridgeAudioModel`    | `""`    | Auto tai STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10            |

Jaettu välimuisti pysyy `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`:n ja `modalityBridgeCacheMaxEntries` hallinnassa.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Kaappaa huipputason videoosat Chat Completions `messages` ja Responses API `input` -kohdissa ennen kuin kohdetta, jolla ei ole tunnettua alkuperäistä videotukea, kutsutaan. Tuetut muodot ovat `input_video`, `video_url`, `video_source`, HTTPS URLs ja `data:video/*;base64,...` data URIs. Tekstissä olevia tavallisia tiedostonimiä ei käsitellä videona.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) omistaa pyynnön läpikäynnin, capability/policy -tarkistuksen, pyyntökohtaisen koosteen ja vastauksen hyötykuorman. Videokohtainen työ — hankinta, koko tuloksen välimuisti, joka kuvaa kehyssekvenssiä (joka sulattaa minkä tahansa soittajan ilmoittaman äänitranskription) ja yrityskohtainen metrics/abort/cleanup — on piilotettu `processVideoPart` taakse `videoBridgePipeline.ts`, jota kutsutaan kerran `preCall`:n silmukan sisällä olevaa videoosaa kohden. Tämä moduuli määrittää myös eksplisiittiset porttirajat `VideoMediaBrokerPort` (tavujen hankinta ja näytteistettyjen kehysten poimiminen), `VideoAudioTranscriptionPort` (soittajan ilmoittaman äänitranskription yhdistäminen näytteistettyjen kuvatekstien kanssa) ja `VideoDrilldownPort` (vanha raaka-myymälämuoto). Tuotanto STT ja kehyksen säilytys muodostuvat kuvaavan portin ympärille `createVideoSttAdapter` ja `createVideoDrilldownAdapter` kautta; jälkimmäinen käyttää jaettua läpinäkymättömän kahvan elinkaarta.

Julkinen `/v1` -pyyntöpolku ei koskaan tuo tai kutsu aliprosessia. Etävideot ladataan 50 MiB n rajoituksella; inline base64-videoissa on konservatiivinen 36 MiB dekoodattu videokohtainen yläraja, joten model/messages/framing kirjekuori voi pysyä julkisen JSON pyynnön 50 MiB:n sisäänpääsyrajan sisällä. Inline-pituus ja dekoodatun koon arviot tarkistetaan ennen allokointia. HTTPS vaaditaan alkuperäisessä etä- URL ssa ja jokaisessa uudelleenohjauksessa käyttämällä olemassa olevaa vain julkista lähtevää suojausta DNS kiinnityksellä. Tavut ylittävät sitten tarkan sisäisen `POST /api/modality-bridge/video/extract` välittäjärajan. Tämä reitti on sekä `LOCAL_ONLY` että `SPAWN_CAPABLE`, hyväksyy vain prosessikohtaisen autentikoidun, luotetun silmukan paluupyynnön, eikä koskaan hyväksy URL, tiedostojärjestelmän polkua, suoritettavaa tiedostoa tai argumenttiluetteloa. API -rungon kokoinen putkisto ja käsittelijän inkrementaalinen runko-lukija valvovat itsenäisesti 50 MiB välittäjän syöttörajaa. Sen rajattu jono suorittaa yhden purkamisen kerrallaan, sallii neljä odottavaa työtä ja rajoittaa odottavaa syötettä 100 MiB llä.

Välittäjässä `ffprobe` lukee yksityisen paikallisen tiedoston; kiinteän muodon sallittujen luettelo ei sisällä soittolista- ja luettelomuotoja. Sallittujen MOV-perheen säilöjen ulkoiset MOV -tietoviitteet pysyvät oletusarvoisesti poissa käytöstä, eikä kiinteä komento ota niitä käyttöön. Sekä `ffprobe` että `ffmpeg` käyttävät `file` -only -protokollan sallittujen luetteloa, yhtä säiettä, kiinteitä argumenttitaulukoita, ei shelliä ja `PATH` stä ratkaistuja suoritettavia tiedostoja. Liitteenä olevat kansikuvat eivät ole toistettavia ehdokkaita. Kaikkien toistettavien streamien on täytettävä rajat, ja eksplisiittinen oletusvirta on suositeltava ennen determinististä alimman indeksin varoitusta. Videoiden pituus on rajoitettu 600 sekuntiin, 8 192 pikseliä ulottuvuutta kohden ja 33 554 432 lähdepikseliä. FFmpeg ottaa näytteitä 1–16 keskipisteen JPEG kehyksestä, skaalaa pitkän reunan enintään 1 024 pikseliin ilman pienempiä tuloja skaalaamatta, eikä se koskaan vastaanota URL. Näytteenotto on oletuksena `uniform`. Valinnaiset `scene_aware` ja kokeelliset `segment_aware` käytännöt suorittavat yhden kiinteän FFmpeg lisäsiirron jo vahvistetulle paikalliselle virralle, valitsevat rajatut `showinfo` kohtauksen aikaleimat ja palaavat deterministisesti samoihin yhtenäisiin keskipisteisiin ilmaisimen vian, aikakatkaisun, virheellisen lähdön tai tyhjän ehdokasjoukon yhteydessä. Segmenttitietoinen tila allokoi keskipistenäytteet suhteessa vahvistettuihin kohtausväleihin; segmenttitietoinen näyttö ja varakäyttäytyminen on kuvattu alla. Kova 16 kehyksen yläraja on käytössä valinnan jälkeen jokaisessa käytännössä. Kun kohtaustietoisella pyynnöllä on vain yhden ruudun budjetti, se käyttää aktiivisen koko videon tai tarkennusikkunan yhtenäistä keskipistettä ja raportoi `policyEffective: uniform`:n: yksi valittu kohtauskehys ei voi säilyttää molempia ajallisia päitä. Soittaja voi valinnaisesti tarjota rajallisen tarkennusikkunan (`start`/`end` sekuntia); rajat kiinnitetään median kestoon, käänteiset tai ei-äärelliset ikkunat hylätään ja kaikki näytteenottokäytännöt suoritetaan vain normalisoidun aikavälin sisällä. Tuloksena oleva ikkuna sisältyy otannan metatietoihin ja epäluotettavaan kuvausetuliitteeseen, jotta loppupään mallit voivat erottaa kohdistetun otteen koko aikajanasta.

Semanttisen kuvatekstin fokus on erillinen, selkeä asetus. Oletusarvoinen `full` analyysitila säilyttää olemassa olevan kehyskehotteen eikä koskaan välitä pyyntötekstiä kuvatekstimalliin. `focused` tilassa silta lukee vain uusimmat ei-tyhjät käyttäjän kirjoittamat `text`/`input_text` samasta Chat- tai Responses-säiliöstä, normalisoi sen arvoon NFC, tiivistää ohjausmerkit ja välilyönnit ja rajoittaa sen 500 Unicode-koodipisteeseen. Tyhjä tulos palautuu tarkalleen `full` kehotteeseen. Käyttökelpoinen vihje sarjoitetaan muotoon JSON erillisessä epäluotettavan käyttäjän kontekstilohkossa, ja se voi priorisoida vain havaittavissa olevia yksityiskohtia. se ei voi ohittaa erillistä varoitusta tietovälineissä näkyvien tai kuuluvien ohjeiden noudattamisesta. Tekstitarkennus ei koskaan päättele `start`/`end` tai muuta temporaalista näytteistöä.

#### FU-07 rakennesegmentin todisteita

`segment_aware` käyttää yhtä rajoitettua esianalyysia jo validoidun paikallisen videovirran yli. Kiinteä suodinketju skaalautuu ensin enintään 320 pikselin leveyteen, havaitsee kohtauksen muutokset ja jäädytetyt intervallit ja ottaa sitten näytteitä 1 ruudulla sekunnissa sumennus-, keskimääräisen luman ja spatial/temporal tietojen saamiseksi. Pääsy on rajoitettu 600 rakennenäytteeseen, yhteen FFmpeg/filter säikeeseen, samaan `file` -only -protokollaan ja säilön sallittuihin luetteloihin, 1 MiB prosessitulostussidontaan ja enintään 30 sekuntiin välittäjän jaetun abort/deadline. n sisällä. Se ei koskaan hyväksy komentoa, suodatinta, polkua tai URL pyyntöä.

Rakennearvot ovat deterministisiä otantatodisteita, eivät semanttista videon ymmärtämistä. Ne eivät päättele aiheita, toimia, kuvatekstejä, puhetta tai käyttäjän tarkoitusta. Kohtauksen ja jäädytyksen rajat muodostavat segmenttejä; jäädytetty peitto, sumennus, valotus, tilayksityiskohdat ja ajallinen muutos vaikuttavat vain siihen, miten nykyinen 1–16 kuvan budjetti kohdistetaan. Täysin jäädytetty segmentti on rajoitettu yhteen kehykseen, kun taas jäädytetyt segmentit kilpailevat jäljellä olevasta budjetista. Kun rajat ylittävät kehysten lukumäärän, yhtenäinen aikajanan kattavuus säilyy, joten nopeat varhaiset leikkaukset eivät voi piilottaa pitkää perässä olevaa segmenttiä. Kohtauksen rajat 1 sekunnin analyysiresoluutiolla pysäytysrajan sisällä yhdistyvät.

Puuttuvat suodattimet, malformed/empty -todisteet, ilmaisinvirhe tai rajoitettu esianalyysin aikakatkaisu epäonnistuvat täsmälleen yhtenäisen keskipistekäytännön mukaisesti. Soittajan keskeytys tai välittäjän määräaika ei epäonnistu: se lopettaa lennon aikana tapahtuvan aliprosessin, estää myöhemmän kehyksen purkamisen ja yksityinen väliaikainen puu poistetaan `finally` ssä.

`scripts/perf/video-bridge-fu07-eval.ts` tuottaa deterministisiä todellisia FFmpeg valaisimia, jotka säästävät tekstityskutsujen jälkeisiä säästöjä, tiheän liikkeen budjetin allokointia, blur/exposure/SI-TI todisteita, nopeita leikkauksia pitkällä hännän kanssa ja asteittaista haalistumista vääriä positiivisia. Se tallentaa esianalyysin seinän ajan ja, jos `/usr/bin/time` on saatavilla, lapsi- CPU ja huippu- RSS. Sen laatutarkastukset ovat vain rakenteellisia oraakkeleita. Todellinen kuvatekstimallin laatu on edelleen `HOLD`, koska tällä valjaalla ei ole valtuutettua päätepistettä tai jäädytettyä tuomaria. Rahasäästöt pysyvät myös `HOLD`, ellei `--caption-cost-per-call-usd` toimita selkeää positiivista puhelukohtaista arviota; käsikirjoitus ei koskaan valmista kumpaakaan tulosta.

Jokainen kehys on rajoitettu arvoon 4 MiB, kaikki raakakehykset yhdessä 23 MiB iin ja sarjoitetun välittäjän vaste 32 MiB hen. Yksityinen väliaikainen hakemisto poistetaan `finally`. OmniRoute ei niputa FFmpeg eikä hyväksy mukautettua suoritettavaa polkua. Ennen tekstitystä silta käyttää konservatiivista visuaalista duplikointia: jokainen JPEG pienennetään 16 × 16 harmaasävypuskuriin ja sitä verrataan vain viimeiseen säilytettyyn kehykseen. Pyydetylle tekstitysbudjetille, joka ylittää yhden kehyksen, poiminta tarjoaa rajoitetun ehdokasjoukon, joka on jopa kaksinkertainen budjettiin verrattuna, mutta ei koskaan enempää kuin 16 kehystä. Pyydettyä ylärajaa sovelletaan vasta päällekkäisyyksien poistamisen jälkeen, ja ensimmäiset ja viimeiset valitut ehdokkaat säilyvät lopullisessa harvennuksessa, kun budjetti on vähintään kaksi. Versioitu `grayscale-16x16-mean-cells-v2` -käytäntö käyttää suurempaa keskimääräistä luma-deltaa ja pikkukuvasolujen suhdetta, joiden normalisoitu delta on vähintään 0,05. Kopiointikynnys on vakio 0,04, joka on valittu ennustettavuuden vuoksi sen sijaan, että se näkyisi ajonaikaisena asetuksena. Tämä toissijainen korkeakontrastinen signaali säilyttää pienet liikkeet ja näkyvän tekstin muutokset, jotka pelkkä vertailu voi piilottaa. Vertailun tai dekooderin virheet epäonnistuvat ja pitävät peiton. Tulosteen metatiedot erottavat poimitut ehdokkaat, onnistuneesti käytetyt kehykset ja poistetut visuaaliset kaksoiskappaleet.

Eksplisiittisesti merkitty videoosa voi pyytää aikaleimattua yhteystietolomaketta. Silta rakentaa enintään 4-pylväisen, 16-kehyksen JPEG ruudukon. Jokainen 512 pikselin solu polttaa lähteen aikaleiman suuren kontrastin alakaistalle, kun taas samat aikaleimat säilyvät tekstin metadatassa myöhempää yhdistämistä ja tarkastusta varten. Täydellinen JPEG on edelleen rajattu arvoon 32 MiB. Jos `sharp` ei pysty purkamaan tai muodostamaan ruudukkoa, silta palaa yksittäisiin JPEG kehyksiin; asiakkaan keskeytys etenee edelleen taulukkotoiminnon kautta.

Promootiotodistus on tarkoituksella erillään synteettisen koostumuksen mikrovertailuarvosta. `scripts/perf/video-bridge-contact-sheet-eval.ts` määrittelee skeemaversion A/B -valjaat oikeille OpenAI-yhteensopiville näkömalleille. Se mittaa palveluntarjoajan ilmoittamia tunnuksia, päästä päähän seinään ulottuvaa latenssia (mukaan lukien arkin koostumus), mallin puheluiden määrää ja manifestin määrittelemää tosiasian säilyttämistä. Raakamallivastauksia ei kirjoiteta raporttiin; vain SHA-256 tiivistelmät ja täsmäytystieto IDs säilytetään. Valjaat eivät soita verkko- tai maksulliseen malliin, ellei `--execute-real` ole hyväksytty ja `--model`, `OMNIROUTE_BASE_URL` ja `OMNIROUTE_API_KEY` on määritetty. Ilman tätä nimenomaista reaaliajoa sen koneellisesti luettava tuomio pysyy `HOLD`; synteettiset payload/call-count -mittaukset eivät yksin ole edistämistodisteita.

Erillinen `scripts/perf/video-bridge-promotion-eval.ts` kuluttaa FU-07 tai FU-09 -havaintoja. Promootioon pääsy edellyttää kaikki kahdeksan synteettistä skenaariotyyppiä sekä puhtaan todellisen leikkeen, vähintään kolme mitattua toistoa roolia ja tapausta kohden, kaikki kymmenen ilmoitettua mittaria, jäädytettyjä media/prompt/expected-fact/settings koosteita, ainutlaatuista havainnointia IDs ja varmennettua siemennettyä A/B tilausta. Toteutuskuitti sitoo korpuskoosteen, tarkan ehdokas- SHA ja malliversion. Puuttuvat tai virheelliset mittaukset pysyvät `HOLD`, mukaan lukien CPU yli 30 s, huippu RSS yli 512 MiB tai esianalyysi yli 30 s. Nämä ovat todisteiden hyväksymisrajoituksia, eivät uutta suoritusaikaista RSS valvontatakuuta.

FU-07 vaatii vähintään 98 %:n laadun säilymisen ja p95-viiveen enintään 1,2-kertaisen perustason sekä joko 0,05:n absoluuttisen tapauskohtaisen keskimääräisen palautusparannuksen vastaavilla keskimääräisillä tekstityskutsuilla tai vähintään 10 % vähemmän keskimääräisiä tekstityskutsuja. FU-09 edellyttää vähintään 0,85 laatua, 95 %:n säilytystä, 20 %:n mediaanilatenssin vähennystä ja 10 %:n tunnuksen vähennystä. Kriittisen tosiasian menetys, injektioyhteensopivuus tai puuttuva käyttö estävät edistämisen. Yksi suoritus ei voi edistää mitään: `--previous-report` vahvistaa saman policy/model revision/candidate/corpus. :n kaksi erillistä, ei-päällekkäistä, peräkkäin kelvollista suoritusta. Näytteenottokokeilu ei voi vahvistaa kontaktiarkkikoetta.

Keräilijöiden tulee pisteyttää vastaukset muistiin ja tallentaa `responseDigest` plus mittarit ja havaintosidokset, ei koskaan vastata tekstiä. Kuluttaja lukee myös vanhoja raakahavaintoja, mutta ei koskaan kopioi tätä tekstiä raportteihinsa. Jokaiselle havainnolle hyväksytään täsmälleen yksi arvoista `responseDigest` tai `rawResponseText`. Versioitu sallittu luettelo pysyy tyhjänä muuttumattoman `hold` oletuksen kanssa. Hyväksytty merkintä edellyttää todisteen viittausta, käytäntöä, malliversiota, tarkkaa ehdokasta SHA, manifestin tiivistelmää ja kahta erillistä ajoa IDs; ristiriitaiset kontekstit hylätään. Nämä metatiedot ovat tarkastussopimus, eivät todiste siitä, että viitattu tiedosto sisältää aitoja mittauksia. Tarkista todelliset kuitit ennen merkintöjen lisäämistä. Hallintatilastojen päätepiste ja videon hallintapaneeli paljastavat konservatiivisen valmiuden. Pelkästään määritetty mallialias ei määritä sen versiota tai käynnissä olevaa ehdokasta SHA, joten nykyinen kojelauta raportoi `HOLD` sen sijaan, että käytettäisiin kelpoisuutta toisesta suorituskontekstista. Eksplisiittinen kokeellinen valinta pysyy erillään myynninedistämisestä; oletusarvoa ei vaihdeta automaattisesti.

Soittajat voivat liittää valinnaisen `transcript.cues` -ryhmän tuettuun videoosaan, kun heillä on jo kohdistettua tekstiä. Jokaisessa vihjeessä on oltava `text`, rajallinen `start`/`end` -väli koetusajan sisällä ja sallittujen luettelossa oleva `source` (`client`, `embedded` tai `audio-bridge`); `confidence` on oletuksena `1` ja sen on pysyttävä `0` ja `1` välillä. Tarkat päällekkäiset vihjeet tiivistetään. OmniRoute ei koskaan aloita transkriptiota näistä metatiedoista: validoidut vihjeet kopioidaan kuvattuun tulokseen lähteen, luotettavuuden ja aikavälin kanssa, ja ne esitetään epäluotettavina havaintoja kehysten kuvatekstien rinnalla. Virheellinen, alueen ulkopuolella tai alkuperästä vapaa teksti hylätään sen sijaan, että se sekoitetaan kuvatekstivirtaan. Molemmat pyynnön tekstiosan transkriptiokanavat normalisoivat `client` toimitetun alkuperän, mukaan lukien itse vahvistaneet `embedded` tai `audio-bridge` tunnisteet. Vain palvelimen omistama sovitin voi määrittää nämä luotetut tunnisteet vain koodia sisältävän `trustedSource` -argumentin kautta; pyyntö JSON -kenttä ei voi saavuttaa tätä argumenttia. Litteraattiteksti pysyy epäluotettavana mediaperäisenä sisältönä sen alkuperästä riippumatta, eikä se saa koskaan määrittää valtuutusta.

Edistynyt soittaja voi tarjota `audioTranscript` raidan samalle videolle; sitä käsitellään asiakkaan toimittamana tekstinä, ei todisteena palvelimen transkriptiosta. Fuusio-sauma suorittaa visuaalisia ja äänihavaintoja yhden määräajan ja keskeytyssignaalin mukaisesti, tilaa ne yhteiselle aikajanalle, tiivistää tarkat kaksoiskappaleet ja raportoi osittaisen tuloksen, kun vain toinen osapuoli onnistuu. Virheellinen `audioTranscript` muuttuu osittaiseksi tulokseksi — Visuaalinen kuvaus säilytetään ja äänihaara tallentaa puhtaan virhekoodin — koko videon epäonnistumisen sijaan. Haarakohtainen saatavuus, osittainen lippu ja puhtaat vikakoodit säilyvät kuvatussa tuloksessa, suojakaiteen metatiedoissa (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), tulosvälimuistin metatiedoissa ja siltafuusiolaskureissa. Videosillan oletuspolku ei kutsu puheesta tekstiksi tai lataa toista mediakopiota. ilman tätä nimenomaista raitaa se pysyy vain videona.

**Transkription säilyttäminen (#12150 P1).** Tämä pätee automaattisesti aina, kun Video Bridge (itse opt-in) tekee transkriptiomerkinnän — erillistä säilytyslippua ei ole. Kun pyyntö tekee minkä tahansa transkriptiomerkin (soittajan ilmoittaman `transcript` tai sulautetun `audioTranscript`), suojakaide merkitsee sen `videoBridgeObserved` ja tuottaa redaktoidun varjon videokuvauksesta — identtisen renderöinnin, jossa jokaisen vihjeen vapaan tekstin runko korvataan `[redacted-video-transcript]` llä, ennen kuin rakennetaan parannalla kenttään. litistetty teksti, joten mitään vihjeitä sisältö — kilpaileva tai tavallinen, mukaan lukien kappaleet sisältävät `]`, kuten `[inaudible]`/`[music]` — voi selviytyä). Pysyvä puhelulokipyynnön runko vaihtaa jokaisen videosta johdetun tekstiosan kyseiseen redusoituun varjoon, joka vastaa sisällön tasa-arvoa. `fullText` ankkuri luetaan uudelleen valmiista puhelua edeltävästä suojakaiteen hyötykuormasta, joten täsmääminen onnistuu silti, kun myöhemmät ketjusuojakaiteet ( PII ja valtuustietojen maskerit, prioriteetit 10/95) kirjoittavat kuvaustekstin uudelleen paikoilleen ja system-prompt/handoff/memory injektion jälkeen muotoilevat viestiryhmän uudelleen. Malliin vastavirtaan lähetetty runko on muuttumaton. Havaittu pyyntö ei myöskään täytä pysyvää muistia (sekä pyyntö- että vastausperäinen purkaminen ohitetaan), joten mallin oma vastaus ei voi kaikua transkriptiotekstiä muistiin.

**Raakavideokentät (#12430).** Kun silta on käytössä ja natiivivideotuki on tuntematon tai puuttuu, määritetyt `transcript`/`audioTranscript` -kentät aktivoivat myös `videoBridgeObserved`, vaikka kuvaus epäonnistuisi tai `maxVideos` raja olisi asetettu. `null` ja tyhjät merkkijonot laskevat; puuttuvat kentät ja muut kuin videon metatiedot eivät. Säilytetyt kopiot poistavat nämä kentät tai jättävät pyynnön pois, ja caches/Memory ohitetaan.

Näillä varapoluilla kelvollisista soittajan vihjeistä tulee tuettuja `text`/`input_text` -osia ei-standardien tarjoajakenttien sijaan. Molemmat pyynnöstä toimitetut raidat ovat edelleen epäluotettavia `client` havaintoja, ja niissä varoitetaan nimenomaisesti, että videota ei kuvattu eikä aikaleimoja ole tarkistettu mediaa vastaan. Nykyiset 256-cue/64-KiB -kokonais- ja per-cue-budjetit koskevat kaikkia kahta kappaletta yhdessä; aikaleimojen tulee sopia välittäjän 600 sekunnin kattoon ja kaikkiin toimitettuihin tarkennusikkunaan. Virheelliset raidat hylätään, ei välitetä mielivaltaisena tekstinä; kelvollista sisarusta voidaan silti käyttää, ellei heidän yhteisbudjettinsa ylity. Null/empty -kentät eivät lisää tekstiä. Tämä varavaihtoehto ei lisää median hakua tai transkriptiota. Transkriptiolaajennuskentät poistetaan varavideon kantajasta ja sen `video_url`/`source` -objekteista. OpenAI langan sallittu luettelo pysyy tiukkana; tuntemattomat alkuperäiset videovälittäjät pysyvät saatavilla, ja tunnetut tekstikohteet pitävät turvallisia merkkejä. Strukturoidut muokkausvarjot suojaavat liitettyä transkriptiotekstiä, kun taas alkuperäinen soittajan omistama pyyntö pysyy ennallaan. Natiivituetut kohteet ja vammaiset sillat säilyttävät nykyisen ohituskäyttäytymisensä.

Säilytetyt lisäkopiot käyttävät samaa havaitun pyynnön signaalia. Raaka esisuojakaiteen asiakaspyynnön tilannevedos, muistissa odottava pyyntö ja aikaisin hylättyjen pyyntöjen loki korvaavat rakenteellisesti transkriptiokentät videon osissa; liukuhihnan vaiheiden ja kontekstin vaihdon syntetisoimat merkkijonokehotteet redaktoidaan jatkuvan pyynnön rungon nielussa. Pysyvä `video_content_removed` merkki saa `previous_response_id` jatkoa epäonnistumaan sulkeutumaan sen sijaan, että se rekonstruoisi tarkoituksellisesti hylätyn tekstin. Jos havaittu pyyntö menettää osakohtaisen muokkausvarjon ennen lokiin kirjaamista tai jopa yksi useista videovarjoista ei täsmää myöhempien pyyntömutaatioiden jälkeen, säilytetty pyynnön runko jätetään kokonaan pois sen sijaan, että säilytettäisiin osittain muokattu transkriptio.

Havaitun pyynnön tapauksessa mallivastaus voi lainata mitä tahansa transkription osaa ilman strukturoitua vihjerajaa. Sen pysynyt puhelulokin `responseBody` korvataan siksi laiminlyönnillä; yksityiskohtaista liukuhihnan artefaktia (joka voi sisältää upstream/client kappaleita ja stream-kappaleita) ei säilytetä. Semanttinen, idempotenssi ja päättelyn toistovälimuisti ohittavat tämän pyynnön luku- ja kirjoitustoiminnot. Palveluntarjoajan pyyntö ja asiakkaan näkyvä vastaus pysyvät ennallaan. Varhaiset säilytystavut tyhjennetään väliaikaisesta puskurista, kun yksityiskohtainen artefakti jätetään pois. Kiro:n väärin muotoiltu EventStream varoitus ilmoittaa vain hyötykuorman tavumäärän, ei koskaan sen sisältöä tai JSON -jäsentimen raakavirhettä. Tämä ei väitä, että jokainen asiaankuulumaton provider/plugin -diagnostiikka on auditoitu; laajempaa säilytetyn nielun pyyhkäisyä seurataan #11658 muodossa.

Sisäinen `/api/modality-bridge/video/drilldown` elinkaari on erillinen loopback/token-authenticated välimuistisubstraatti. Jokainen operaatio vaatii myös kanonisen opaakin pääperiaatteen ID. Ennen kuin tuotantokutsuja otetaan käyttöön, sen on johdettava tämä ID todennetulta vuokraajalta, eikä se saa koskaan lähettää eteenpäin asiakkaan valitsemaa arvoa. Välimuistiavaimet sitovat tämän pääasiallisen kanoniseen istuntoon ja videoviittaukseen IDs, tallentavat vain niiden SHA-256-derived avaimet ja kattavat sekä lukemisen että poiston samaan pääasialliseen. Välimuisti tallentaa enintään 16 johdettua JPEG kehystä merkintää kohti, vanhenee ne kymmenen minuutin kuluttua ja tukee rajoitettua `start`/`end` -lukua tai eksplisiittistä istunnon poistamista.

Jokainen pääasiallinen on rajoitettu 16 merkintään ja 64 MiB kanonista JPEG dataa. Nämä rajat ovat riippumattomia maailmanlaajuisesta 64-entry/256 MiB -katosta: päämiehen kiintiöpaine häätää vain kyseisen päämiehen vähiten käyttämät merkinnät ennen kuin globaali LRU häätö otetaan huomioon. Vanhentuneet merkinnät pyyhkäistään sekä pääasiallisesta että yleisestä välimuistitoiminnan kirjanpidosta, kun taas peruutus- ja vahvistusvirheet eivät aiheuta osittaista korvaamista.

Välimuisti hylkää ei-kanonisen Base64:n, ylimääräisen täytön, ei-JPEG-median, virheellisen tai katkaistun JPEGs ja JPEGs, jotka tuottavat varoituksen rajoitetun täyden kuvan `sharp` dekoodauksen aikana. Se koodaa jokaisen hyväksytyn kuvan uudelleen kanoniseksi JPEG ksi, saa leveyden ja korkeuden dekoodatuista tavuista sen sijaan, että luottaisi soittajan kenttiin, ja hylkää kaikki jäljessä olevat polyglottitavut sen sijaan, että säilyttäisi ne. Vain rajoitettu kanoninen pakattu puskuri veloitetaan molemmista kiintiöistä. JSON johtorajoitus sisältää Base64-ylimäärän 32 MiB dekoodatun sisääntulon katolle. Jokainen tallennettu johdannainen tallentaa sen validoidun JPEG format/resolution, näytteenottokäytännön, johtamisversion, luontiajan, palvelimen laskeman sisällön hajautusarvon ja tiivistetyn yläviitteen sekä luotetun soittajan yläsisällön tiivisteen. Peruutus tarkistetaan asynkronisten decode/hash vaiheiden välillä ennen atomivälimuistin sitoutumista.

Tuotantotuottaja käyttää uudelleen jo johdettuja välittäjäkehyksiä vasta onnistuneen visuaalisen analyysin jälkeen ilman toista videota download/extraction. Se vaatii operaattorin `modalityBridgeVideoDrilldownEnabled=true`, tiukat osakohtaiset `drilldown: true` ja todennettu API-avaintietue ID. Asiakkaan ilmoittamat principal/session arvot eivät koskaan muodosta omistusta. Ilman kaikkia kolmea ehtoa se ei hajauta, muuta kokoa tai säilytä lisäkehyksiä. Säilytysvirhe säilyttää käyttökelpoisen visuaalisen vasteen. Hyväksytyt pyynnöt ohittavat koko videon tulosten välimuistin, joten välimuistissa olevia tuloksia ei koskaan toisteta.

Onnistuneet JSON ja SSE -vastaukset paljastavat enintään neljä läpinäkymätöntä kahvaa rajoitetussa `x-omniroute-video-drilldown` otsikossa. Valtuutetut selaimen alkuperät voivat lukea tämän otsikon laajentamatta CORS alkuperäkäytäntöä. Uudet kahvat käyttävät `v1.<32-byte random base64url token>`, ja rekisteri säilyttää vain niiden SHA-256 -tiivisteet. reader/header jäsennin hyväksyy myös vanhat 64-heksadesimaaliset tunnukset. Todennettu julkinen kuluttaja on `GET /api/v1/video-bridge/drilldown?handle=...`, jonka `modalityBridgeVideoDrilldownRemoteEnabled=true` aidattaa itsenäisesti. Eksplisiittinen pysynyt false peruuttaa pääsyn, vaikka vanha `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env -varavaraus on käytössä. Tuotannon säilyttämisellä on analoginen perintö `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` varasääntö. Molemmat varavaihtoehdot ovat oletuksena pois päältä.

Kuluttaja saa omistajuuden todennetusta avaimesta ja soveltaa avainkäytäntöä: sekä GET että DELETE kuuluvat `video` päätepisteluokkaan, mukaan lukien `/v1` ja `/api/v1` -aliakset. Avainten, joiden päätepisteiden sallittu luettelo ei ole tyhjä, on sisällettävä `video`; rajoittamattomat avaimet ovat yhteensopivia. Kuluttaja palauttaa saman 404:n tuntemattomasta, vanhentuneesta ja toisen avaimen kahvoista. Se hyväksyy `variant=preview|standard|detail` (maksimi JPEG mitta 320/640/1280, ei koskaan skaalattu), `limit=1..8` (tai vanha `frames` alias, ei koskaan molempia), nollapohjainen `page` ja valinnainen `start`/`end` tarkennussekunti. Päällekkäiset kyselyavaimet ja käänteiset tarkennusikkunat hylätään. Jokaisella palautetulla versiolla on tiiviste sen todellisesta sisällöstä ja todellisesta resoluution metadatasta, joka on linkitetty säilytettyyn lähteeseen. Variantit johdetaan luettaessa sen sijaan, että niitä tallennettaisiin ylimääräisinä säilytettyinä kopioina. JSON -vaste, mukaan lukien Base64/envelope, on rajoitettu arvoon 32 MiB; ylisuuri sivu palauttaa 413 ja asiakkaan on pyydettävä vähemmän kehyksiä. Lukee tarkistuksen peruutuksen jokaisen koon muutoksen ympäriltä ja tarkistaa kahvan voimassaolon ennen palauttamista. `DELETE` omistajan mukaan on idempotentti; poisto tai TTL expiry vapauttaa säilytetyn lähde- ja käyttökirjanpidon.

Jaettu varasto on prosessipaikallinen: kahvat vanhenevat uudelleenkäynnistyksen yhteydessä, eikä niitä voi siirtää itsenäisten OmniRoute prosessien välillä. Hallintatilastot paljastavat tehokkaan säilytys-/etäkäytännön ja vain säilytetyt entries/bytes, eivät koskaan mediaa, viittauksia, pääasiallisia IDs tai kahvoja. Videoasetukset-paneeli näyttää kyseiset arvot ja voi säilyttää molemmat suostumuskytkimet. Tämä toteutusdokumentaatio ei ole reaaliaikainen käyttöönotto- tai promootiotodistus; todellisen mallin hyväksyntää seurataan erikseen.

Kehykset tekstitetään peräkkäin määritetyn videomallin kanssa. Tyhjä videon ohitus perii Vision-asetuksen; Jos molemmat ovat tyhjiä, Vision-automaattinen reititin valitsee tehokkaan näkökykyisen mallin. Onnistuneet kuvatekstit korvaavat alkuperäisen osan vakaalla `[Video description:` etuliitteellä, joka myös merkitsee tekstin epäluotettavaksi mediapohjaiseksi havainnon ja käskee loppupään malleja olemaan noudattamatta tiedotusvälineistä löytyviä ohjeita. Kehystekstityksen välimuistiavaimet sisältävät JPEG -tavut, kehotteen, aikaleiman ja tehokkaan mallin; vain onnistuneet tekstitykset tallennetaan välimuistiin. Välimuistimerkinnät säilyttävät todellisen onnistuneen tuottajamallin, mukaan lukien varamallin; silta ilmoittaa `mixed` kun eri malleilla valmistettiin erilaisia kehyksiä. Välimuistiosuma käyttää uudelleen tuota tuottajaidentiteettiä sen sijaan, että se nimeäisi sen uudelleen pyydetyksi reitityssuunnitelmaksi. Koko videon tulosten välimuisti on näppäilty jokaiseen tuloon, joka muuttaa tulosteen — -kehotetta, tehokasta mallia, näytteenottokäytäntöä, kehysten määrää, semanttista analyysitilaa, normalisoidun tarkennusvihjeen SHA-256 sormenjälkeä, tarkennusikkunaa, `transcript`, `audioTranscript` ja yhteystietoarkin lippua —, joten näiden mittojen muuttaminen ei ole koskaan välimuistin väärinkäyttöä. Visuaalinen dedup-käytännön versio, kynnys ja rajattu ehdokaskehysten määrä ovat myös eksplisiittisiä tulosvälimuistiavaimessa ja metatiedoissa. Käytännön muutos ei siis voi käyttää vanhentunutta koko videon kuvausta uudelleen. Result-cache v4 metadata säilyttää tilan ja sormenjäljen, ei koskaan raakaa käyttäjän tehtävää. Guardrail-metatiedot raportoivat sekä pyydetyt että tehokkaat analyysitilat; pyydetty `focused` -tila ilman käyttökelpoista käyttäjätekstiä raportoidaan tehokkaasti `full`.

Suojakaide poimii jokaisen tuetun videon osan, mutta kuvaa vain `modalityBridgeVideoMaxVideos`. Jos kohteen on todistettu olevan `supportsVideo === false`, epäonnistuneista ja ylirajoista videoista tulee eksplisiittisiä turvallisia tekstimerkkejä, joten mikään raakavideo ei säily. Kun kykyä ei tunneta, nämä osat säilyttävät videotelineensä; mikä tahansa varatranskriptio noudattaa yllä olevaa rajoitetun tekstin muuntamista. Kohteet `supportsVideo === true` llä ohittavat sillan. Asiakaspyynnön keskeytyssignaali etenee latauksen, välittäjäjonon, aliprosessien ja tekstityskutsujen kautta; keskeyttää pysähdyksen videoiden välillä ja koskaan epäonnistua avoin raakamedialle.

Ajonaikaiset asetukset ovat DB-tukea ja Zod-validoituja:

| Avain                               | Oletus      | Alue / käyttäytyminen                                                                                              |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Valinnainen suoritusaika, valinnainen                                                                              |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` säilyttää yleiset tekstitykset; `focused` käyttää rajoitettua, epäluotettavaa uusimman käyttäjän kontekstia |
| `modalityBridgeVideoModel`          | `""`        | Peri Vision Bridge -malli                                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                               |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` tai suhteellinen `segment_aware`; ilmaisimen vika palaa `uniform`:hen                     |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                     |

Vanhat videon aikakatkaisuarvot, jotka ovat yli 120 sekuntia, on kiinnitetty välittäjän määräaikaan; uudet asetukset kirjoittavat tämän rajan yläpuolelle, hylätään. `GET /api/modality-bridge/video/runtime` vaatii luotetun leimatun silmukkapaikan ennen todennusta tai ajonaikaista luokitusta, minkä jälkeen se vaatii hallinnan todennuksen. Se palauttaa vain `available`, puhtaat FFmpeg/ffprobe -versiot ja kiinteän syyn, kun suoritusaika ei ole käytettävissä. Sisäinen purkupäätepiste ei ole julkinen lataus API: jonon kylläisyys palauttaa arvon `503` plus `Retry-After`, soittajan katkaisu palauttaa arvon `499` ja kiinteä välittäjän määräaika palauttaa `504`. Muunnetut vastaukset lisäävät `video->text;model=<visionModel>;parts=<videos>` keskeiseen `x-omniroute-modality-bridge` otsikkoon poistamatta Vision- tai Audio-segmenttejä.

### PII masker (`piiMasker.ts`)

Juoksee eteenpäin** molemmat** vaiheet.

- **`preCall`** kloonaa hyötykuorman, kävelee `system`, `messages`, `input` ja `prompt` (mukaan lukien tavalliset merkkijonokohteet) ja käyttää `processPII()` (kentästä `@/shared/utils/inputSanitizer`) merkkijono `content`/`text` -kenttiin. Kun `PII_REDACTION_ENABLED=true`, havaittu PII redaktoidaan lähtevässä hyötykuormassa. Tämä on riippumaton `INPUT_SANITIZER_MODE` (joka ohjaa vain pikaruiskutuskäytäntöä). Kun editointi on pois päältä, puhelu tallentaa tunnistusmäärät ilman sisällön uudelleenkirjoittamista.
- **`postCall`** syväkloonaa vastauksen, suorittaa `sanitizePIIResponse()` sekä Responses-API-muodon maskerin (`maskResponsesOutput` — kattaa `output_text` ja `output[].content[].text`). Jos muokkaus tapahtuu, muokattu vastaus korvaa alkuperäisen.

Suojakaide ei koskaan tukkeudu; se vain merkitsee (`meta.detections`, `meta.redacted`) tai kirjoittaa uudelleen.

**Käännettävä holvi (`PII_REVERSIBLE_VAULT_ENABLED`, oletus `false`).** Kun sekä `PII_REDACTION_ENABLED` että `PII_REVERSIBLE_VAULT_ENABLED` ovat päällä (DB ohittaa > env > -oletusarvo, luetaan kerran pyyntöä kohti), `handleChat` avaa yhden varaston asiakaspyyntöä kohden (`src/lib/pii/requestTokenVaultScope.ts`) ja välittää sen puhelua edeltävälle passille nimellä `GuardrailContext.tokenVault`. Maski kirjoittaa sitten korvikkeita, kuten `<<PII_EMAIL_QWERTYUI_1>>` `[EMAIL_REDACTED]` sijaan, sekä sisäänrakennetuille, vahvistetuille (GDPR/POPIA) että mukautetuille säännöille. Nonce on 8 satunnaista isoa kirjainta per pyyntö, ja sama arvo saa saman merkin pyynnössä. Ainoastaan naamari lyö: pikaruiskutussuoja ja `/api/guardrails/test` toimivat ilman holvia ja pitävät paikkamerkit.

- Palveluntarjoaja, jokainen yhdistelmäosuus, uudelleenyritys, fuusiopaneelin jäsen ja fuusiotuomari näkevät vain rahakkeet. Tunnisteet palautetaan kerran, 2xx-vasteessa, joka jättää `handleChat`: per kenttä jäsennetyssä SSE ssä (tapahtumiin jaettu tunnus ratkeaa edelleen; työkalukutsuargumentit ovat JSON-suojattuja) tai JSON rungon kenttäkohtaisesti uudelleen lasketulla `Content-Length` llä. Sisältö- ja päättelyteksti ja työkalukutsuargumentit palautetaan. Virhekappaleet (4xx/5xx) pitävät tunnukset.
- Epäonnistukset pysyvät yksityisinä: jos lyöminen epäonnistuu tai varasto hylkää arvon (1000 merkintää, 256 merkkiä arvoa kohden, yhteensä 64 KB ), kirjoitetaan paikkamerkki; merkki, jota varasto ei pysty ratkaisemaan, tai palautus, joka epäonnistuu, pysyy kirjaimellisena ja vain määrä kirjataan. Holvissa ei ole ajastimia eikä globaalia tilaa; se tyhjennetään, kun vastausvirta päättyy, peruutetaan tai tulee virheitä.
- Kun pyyntö lyötiin tunnuksia, muistin purkaminen, idempotenssin tallennus ja molemmat semanttisen välimuistin kirjoitukset ohitetaan, koska mikään myöhempi pyyntö ei voi ratkaista niitä. Puhelulokeissa palveluntarjoajan pyyntö ja vastaus kuljettavat tokeneita; kirjattu asiakaspyynnön runko on edelleen raaka-asiakassyöte, kuten tavallisessa muokkauksessa.
- Tokenit käyttävät pyyntökohtaista satunnaista noncea, joten kehotteen etuliite vaihtuu joka käänteessä: palveluntarjoajan puoleinen kehotteen välimuisti ei osu peitettyihin käännöksiin, ja myöhemmässä vuorossa (esimerkiksi `previous_response_id` kautta) palaava merkki kuuluu vanhaan pyyntöön ja pysyy kirjaimellisena.

#### Tyyppikohtainen valinta, mukautetut kuviot ja tunnistuslaskurit

**Dashboard → Settings → Security → PII masking** valitsee _mitä_ peitetään. Se ei kytke maskausta päälle: se on edelleen `PII_REDACTION_ENABLED` (pyyntö) ja `PII_RESPONSE_SANITIZATION` (vastaus + SSE), molemmat oletuksena pois päältä.

- **Tyyppikohtainen valinta** — sisäänrakennetut tunnukset on lueteltu kohdassa `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Unset tarkoittaa jokaista tyyppiä (käyttäytyminen ennen tätä asetusta). Pyyntömoottorin `ssn_us` -kuvio liittyy muotoon `ssn`. Mallit (minimi, vakio, talous, brasilialainen, USA, GDPR, POPIA, täysi) täyttävät vain UI-valintaruudut.
- **GDPR ja POPIA -tunnisteet** — kaksitoista sisäänrakennettua tunnusta, jotka kattavat EU ja Etelä-Afrikan henkilökohtaiset tunnisteet (taulukko alla). Niiden regexes, validaattorit ja lainkäyttöaluetunnisteet sijaitsevat yhdessä taulukossa, `src/shared/utils/piiPatterns.ts`, jonka sekä vastauspuhdistin (`src/lib/piiSanitizer.ts`) että pyynnön peittäjä (`src/shared/utils/inputSanitizer.ts`) kuluttavat. Osuma poistetaan vain, kun sen vahvistaja hyväksyy sen; pelkkä numerosarja ei koskaan riitä. Operaattori, joka on tallentanut kavennetun valinnan ennen näiden tunnusten olemassaoloa, säilyttää käyttäytymisensä, kunnes uudet tunnukset on valittu.
- **Mukautetut kuviot** — enintään 20 regex- tai jokerimerkkikuviota (`*` = enintään 64 muuta kuin välilyöntimerkkiä, `?` = yksi). Otteluista tulee `[CUSTOM_REDACTED]`. Jokainen kuvio kulkee `compilePiiCustomPattern()` :n (`src/shared/utils/piiCustomPatterns.ts`) kautta: enintään 500 merkkiä, liput rajoitettu `g i m s u` iin, on käännettävä, täytyy läpäistä `safe-regex` (katastrofaalinen backtracking), eikä se saa vastata tyhjää merkkijonoa tai muokkauspaikkamerkkiä. Epäonnistunut malli hylätään, kun se tallennetaan ja testataan, ja tallennettu rivi, joka epäonnistuu, ohitetaan ajon aikana sen sijaan, että se käännetään. Mukautetut kuviot toimivat vain maskauksen ollessa päällä.
- **Havaitsemislaskurit** — per-tyyppi laskee (ei koskaan täsmääviä arvoja), säilytetään muistissa ja nollataan uudelleenkäynnistyksen yhteydessä (`src/lib/pii/piiDetectionStats.ts`). Ne lisääntyvät vain maskin ollessa päällä.

Asetukset ovat `key_value` -taulukossa (nimiavaruus `pii_settings`, `src/lib/db/piiSettings.ts`) ja ne luetaan 1 s välimuistin kautta. API:

| Menetelmä | Polku                    | Tarkoitus                                                                   |
| --------- | ------------------------ | --------------------------------------------------------------------------- |
| `GET`     | `/api/settings/pii`      | Lipputila, `enabledTypes`, `customPatterns`, tunnistuslaskurit              |
| `PUT`     | `/api/settings/pii`      | Korvaa `enabledTypes` (`null` = all) and/or `customPatterns`                |
| `POST`    | `/api/settings/pii/test` | Kuivaajossa yksi kuvio enintään 8 KB näytettä vastaan; mitään ei tallenneta |

Kaikki kolme vaativat hallinnan todennusta ja vahvistavat kehon Zod :lla (`src/shared/validation/schemas/piiSettings.ts`). Kun sisäänkirjautuminen on estetty (`requireLogin=false`), `GET` ja testipäätepiste ovat auki, mutta `PUT` tarvitsee silti kojelautaistunnon, `manage` -scope API -avaimen, `oma_` käyttötunnisteen, jolla on kirjoitusalue tai suurempi, tai CLI tunnuksen tai sisäisen palvelun tunnuksen, joka lähetetään silmukasta.

#### GDPR (EU) ja POPIA (Etelä-Afrikka) -tunnisteet

| Id                  | Tunniste                    | Validointi                                                                                             |
| ------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------ |
| `iban`              | IBAN                        | Tunnettu maa, maan tarkka pituus, ISO 13616 MOD-97-10                                                  |
| `eu_vat`            | EU VAT numero               | Tunnettu jäsenvaltion etuliite ja kyseisen osavaltion numeromuoto (ei VIES hakua)                      |
| `es_dni_nie`        | espanja DNI / NIE           | Kontrollikirjain (arvo mod 23); NIE on `X/Y/Z` + 7 numeroa                                             |
| `it_codice_fiscale` | Italialainen Codice Fiscale | Ohjauskirjain odd/even -paikkataulukoista                                                              |
| `pl_pesel`          | Puolan PESEL                | Painotettu tarkistussumma ja olemassa oleva koodattu syntymäaika                                       |
| `nl_bsn`            | hollantilainen BSN          | 11-varma (painot 9..2, -1)                                                                             |
| `de_steuer_id`      | Saksalainen Steuer-ID       | ISO 7064 Mod 11,10 plus numerorakenteen säännöt (ei 0-alkua)                                           |
| `se_personnummer`   | ruotsalainen henkilömäärä   | Luhn yli kymmenen viimeistä numeroa ja uskottava syntymäaika (10 tai 12 numeroa)                       |
| `za_id`             | Etelä-Afrikan ID numero     | Luhn yli kaikki 13 numeroa, voimassa oleva syntymätunnus month/day, kansalaisuuden numero 0 tai 1      |
| `za_phone`          | Eteläafrikkalainen puhelin  | `+27` / `27` etuliite tai kansallinen `0..` -muoto, joka on kirjoitettu välilyönnillä tai tavuviivalla |
| `za_vat`            | Etelä-Afrikan VAT numero    | 10 numeroa alkaen `4`** ja** "VAT" / "BTW" edellisissä 48 merkissä                                     |
| `za_tax_ref`        | Etelä-Afrikan veroviite     | 10 numeroa alkaen `0`-`3`, Luhn,** ja** "tax" / "SARS" edellisissä 48 merkissä                         |

Koska vain numerot sisältävät muodot törmäävät tilausnumeroihin, koontinumeroihin ja aikaleimoihin, heikoimmat (`za_vat`, `za_tax_ref`) tarvitsevat avainsanan cue, eikä paljaaa kymmennumeroista `0..` -numeroa käsitellä Etelä-Afrikan puhelinnumerona. Välilyöntejä IBANs (`GB29 NWBK ...`) ei täsmää. Suoratoistopolulla vihjettä tarkastellaan vain nykyisen palan sisältä. Tunnukset ovat yleisten puhelinmallien edellä, joten vahvistettu tunniste säilyttää oman paikkamerkkinsä (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` ja `popia` -mallit valitsevat vastaavasti EU ja Etelä-Afrikan tunnukset. Itse peittäminen pysyy valinnaisena (Hard Rule #20): mikään tässä ei muuta ominaisuuden lipun oletusarvoa.

### Pikainjektio (`promptInjection.ts`)

Havaitsee vastakkaiset rakenteet käyttäjien toimittamassa sisällössä ja panee täytäntöön määritetyn käytännön. Käyttäytymistä ohjaavat ympäristömuuttujat ja konstruktorivaihtoehdot:

| Asetus      | Env var                                                                                               | Oletus | Vaikutus                                                                                                                                                                                   |
| ----------- | ----------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Käytössä    | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Kun `false`, suojakaiteen oikosulku.                                                                                                                                                       |
| tila        | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Injektiokäytäntö: `block`, `warn` tai `log`. (`redact` on hyväksytty back-compatille, mutta ei** ei** nauha injektio teksti; PII uudelleenkirjoituspyyntöä ohjaa `PII_REDACTION_ENABLED`.) |
| Estä kynnys | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Vähimmäisvakavuus, joka vaaditaan estoon. Medium on oletuksena vain havainnollinen.                                                                                                        |

**Tilan etusija** (`getMode`): soittaja `options.mode` → `INJECTION_GUARD_MODE`**DB ominaisuuden lipun ohitus** (Kojelauta → Asetukset → Ominaisuusliput) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Kojelaudan ohitus voittaa siis env vars -arvot, joten Feature Flags UI ohjaa käynnissä olevaa vartijaa live-tilassa (ei uudelleenkäynnistystä). DB luku on vikasietoinen: jos se tekee virheitä, vartija palaa env-pohjaiseen toimintaan, ja kun ohitusta ei ole asetettu, käyttäytyminen on identtinen vain env-resoluution kanssa.

Havaintolähteet:

1. `sanitizeRequest()` `@/shared/utils/inputSanitizer` stä (jaettu ilmaisinsarja, jota käytetään muualla liukuhihnassa).
2. Sisäänrakennettu `DEFAULT_GUARD_PATTERNS` (tällä hetkellä `system_override_inline` ja `markdown_system_block`, molemmat `high` vakavuus).
3. Valinnainen `customPatterns` välitetään konstruktoriasetusten (merkkijonojen, regex- tai `{ name, pattern, severity }` tietueiden) kautta.

Kun `mode === "block"`** ja** vähintään yksi havainto täyttää vakavuuskynnyksen, `preCall` palauttaa `{ block: true, message: "Request rejected: suspicious content detected" }`. `warn`/`log` -tiloissa suojakaide kirjautuu lokiin, mutta sallii kutsun. Jaettu apuohjelma `evaluatePromptInjection()` viedään myös soittajille, joiden on arvioitava kehotteet käymättä läpi rekisteriä.

**Skannaus sidottu (v3.8.20):** ilmaisin vain tarkastaa** ensimmäiset 16 KB** liitetyn kehotteen tekstistä — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 tavua) in `src/shared/utils/inputSanitizer.ts`. Sekä `detectInjection()` että `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` ennen kuviosilmukan suorittamista. Injektiodirektiivit sijaitsevat lähellä syötteen yläosaa, joten tämä rajoittaa usean sadan kilotavun hyötykuormien regex CPU/GC heikentämättä havaitsemista (vrt. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Juoksee eteenpäin** molemmat** vaiheet, viimeinen oletusketjussa (prioriteetti `95`). Poistaa tunnetut API-avain/salaisuusmerkkimallit lähtevästä hyötykuormasta (viestin sisältö, työkalukutsuargumentit, työkalun tulokset)** ja** palveluntarjoajan vastaus, joten kehotteeseen liitetty valtuustieto (tai työkalun tuloksen toistama) ei vuoda ylävirran toimittajalle tai takaisin asiakkaalle.

- **Vain osallistuminen** , sama käytäntö kuin PII -muokkaus (Hard Rule #20-vieressä): pois käytöstä, ellei `settings.credentialRedactionEnabled === true`** tai** `CREDENTIAL_REDACTION_ENABLED=true`. Kun se on pois päältä, suojakaide on no-op — se ei koskaan estä eikä kirjoita uudelleen.
- `redactCredentials()` kulkee koko payload/response puun (`walkValue()`, prototyyppi-saasteeton, pyöräilyturvallinen `WeakSet` kautta) ja korvaa osumat `[REDACTED:<type>]` paikkamerkillä, kloonaamalla vain todellisuudessa muuttuneet oksat.
- `CREDENTIAL_PATTERNS` covers LLM provider keys (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokens (GitHub, Slack, Linear, Notion, npm, Postman, Discord), payment keys (Stripe, Square), cloud keys (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs, credential-bearing connection strings (`mongodb://user:pass@...`, etc.), and a generic `Authorization`/`x-api-key`/`api-key`/`apikey` header-value pattern. Header-shaped keys (`authorization`, `x-api-key`, `api-key`, `apikey`) are redacted structurally (value only, scheme prefix like `Bearer `/`Basic ` preserved) rather than via the generic text regex.
- Tunnisteen takana oleva arvo peitetään `auth_token` vaikka siinä ei ole tarjoajan etuliitettä: `DB_PASSWORD=…`, `AWS_SECRET_ACCESS_KEY=…`, `client_secret: …`, `?api_key=…` (tunnisteet: `password`, `passwd`, `secret`, `secret_key`, `secret_access_key`, `api_key`, `access_token`, `refresh_token`, millä tahansa `DB_`-etuliitteellä). Etiketti ja erotin pysyvät ja arvoksi tulee `[REDACTED:secret]`. Arvo vaatii vähintään 12 merkkiä, joten proosa, kuten `password: required` pysyy luettavissa; arvo, joka alkaa kirjaimella `$` tai `%` (muuttujaviittaus), jätetään yksin.
- Suojakaide ei koskaan tukkeudu; se vain kirjoittaa uudelleen (`modifiedPayload` / `modifiedResponse`) ja huomauttaa (`meta.credentialsRedacted`, `meta.count`).

Regressiovartija: `tests/unit/credential-masker-guardrail.test.ts`.

### Agenttivartija (`agentGuard/`)

Agenttivartija luokittelee asiakkaan pyynnön taakse `claude` tai `anthropic` toimittajalle sen otsikoista. `AGENT_GUARD_MODE` ottaa kolme arvoa: `off` (oletus), `monitor` ja `block`. `off`:llä otsikkoa ei lueta eikä mitään kirjata lokiin.

Viralliset edustajat tunnistetaan näistä otsikoista (verrattuna siihen, että kirjainkoolla ei ole merkitystä):

- Claude koodi: `User-Agent` joka alkaa `claude-cli/` tai `claude-code/`, tai `x-app: cli` yhdessä `anthropic-beta` otsikon kanssa tai `User-Agent`, joka sisältää `claude`.
- Anthropic SDKs: `User-Agent` joka alkaa kirjaimilla `Anthropic/`, `AsyncAnthropic/`, `anthropic-typescript/` tai `anthropic-python/`.

Loggerin tuotannon oletustaso (`info`) näyttää molemmat rivit. `APP_LOG_LEVEL=warn` ssä vain tunnetut kolmannen osapuolen linjat jäävät jäljelle.

Lokikentät: `agent`, `thirdParty`, `provider`, `model`, `apiKeyId`, `userAgent`, `xApp`, `anthropicBeta`, `xTitle`, `referer`, `stainless`. Otsikkoarvojen ja mallimerkkijonon enimmäispituus on 200 merkkiä. Viittaus kirjataan lokiin ilman sen kyselymerkkijonoa, fragmenttia ja käyttäjätietoja. API -näppäintä, `Authorization`, `x-api-key` ja evästeitä ei koskaan lueta.

Tiedostot: `src/lib/guardrails/agentGuard/classifier.ts`, `src/lib/guardrails/agentGuard/policy.ts`, `src/lib/guardrails/agentGuard/guardrail.ts`, `src/lib/guardrails/agentGuard/settings.ts`, `src/lib/guardrails/agentGuard/logLine.ts`, `src/lib/guardrails/agentGuard/enforcement.ts`, `src/sse/handlers/chat/agentGuardGate.ts`.

**Luokittelurajat (molemmat tilat):**

- Viralliseen SDK rakennettu agentti, joka ei lähetä `X-Title`, `HTTP-Referer` tai omaa `User-Agent`, näyttää SDK. Pelkät `x-stainless-*` otsikot eivät tee asiakkaasta virallista.
- Kolmannen osapuolen agentit vastaavat koko sanan merkkejä `User-Agent`, `X-Title` ja `HTTP-Referer` (tai `Referer`). Listaamattomat asiakkaat näkyvät nimellä `unknown`.
- Selainpohjaisten asiakkaiden pyynnöissä on selaimen oma `User-Agent` ja ne näkyvät tunnistamattomina, ellei `X-Title` tai viittaaja sisällä tunnettua kolmannen osapuolen tunnusta.
- Yksi lokirivi havaittua pyyntöä kohden: odota äänenvoimakkuutta kiireisissä tapauksissa.

#### Monitor

Kun `AGENT_GUARD_MODE=monitor`, pyynnöt, joiden mallimerkkijono nimeää `claude` tai `anthropic` toimittaja, luokitellaan niiden asiakasotsikoiden mukaan. Kun asiakas ei ole virallinen agentti, kirjoitetaan yksi lokirivi, jossa on `tag: "AGENT_GUARD"`. Se on `warn` tunnetulle kolmannen osapuolen agentille ja `info` tunnistamattomalle asiakkaalle. Priority `1`: suojakaide lukee vain otsikot eikä koskaan muuta hyötykuormaa, joten se kulkee ennen mediasiltaa. `monitor` ei koskaan estä.

**`monitor`:n rajat:**

- Jokainen signaali on asiakkaan ohjaama otsikko. Tämä on tarkkailua, ei kulunvalvontaa.
- Tarjoaja luetaan mallimerkkijonosta ennen mallin ratkaisemista: `provider/model`, palveluntarjoajan alias, kuten `cc/…`, ja quota-share ids (`qtSd/<group>/<provider>/<model>`). Paljaan mallin tunnuksia, mallialiaksia, komboja ja myöhempää reitityksen normalisointia ei noudateta. Näitä pyyntöjä ei noudateta.
- Soittaja voi ohittaa sen pyyntökohtaisesti rekisterin estokanavien kautta (katso [Guardrailsin poistaminen käytöstä per-pyyntö](#disabling-guardrails-per-request) ). Ohitettuja pyyntöjä ei huomioida.
- Se toimii vain siellä, missä `runPreCallHooks` toimii (katso [Kattavuus ja rajat](#coverage-and-limits) ).

#### Lohko

`AGENT_GUARD_MODE=block`:ssa puhelua edeltävä suojakaide ei tee mitään. Chatin käsittelijä tekee sen sijaan päätöksen:

1. Päätös tehdään, kun kohde on lähetetty, palveluntarjoajalle, jolle pyyntö on ratkaistu. Palveluntarjoajan aliakset, paljaat mallitunnukset, kiintiöosuuden tunnukset ja kaikki yhdistelmäkohteet ovat katettuja.
2. Se ei toimi suojakaiteen rekisterissä, joten pyyntökohtaiset estokanavat eivät koske sitä.
3. Tunnettu kolmannen osapuolen edustaja evätään. Tuntematon asiakas kirjataan kuten `monitor` ssa ja hylätään vain `AGENT_GUARD_STRICT=true` llä. Claude -koodia ja virallista Anthropic SDKs :tä ei koskaan evätä.
4. Kieltäytyminen on HTTP 403 ja `error.type` `permission_error` ja `error.code` `client_agent_not_allowed`. Runko on OpenAI-tyylinen virhe. Anthropic-muotoisissa pyynnöissä se sisältää myös `type: "error"` ylimmällä tasolla. `Retry-After` -otsikkoa ei ole, ja hylkäys palautetaan ennen minkään streamin alkamista.
5. Kieltäytyminen ei ole palveluntarjoajan epäonnistuminen. Se ei kosketa palveluntarjoajan katkaisijaa, yhteyden jäähdytystä tai mallin lukituksia.
6. Yhdistelmässä hylätty kohde ohitetaan ja loput kohteet juoksevat. Pyyntö epäonnistuu käytäntövirheen vuoksi, kun vähintään yksi kohde hylättiin eikä mikään kohde päässyt vartijan ohi. Yhdistelmä säilyttää oman virheensä, kun ylätason merkintä nimeää toisen tunnetun palveluntarjoajan etuliitteellä tai vaiheen tarjoajan tunnuksella. Hylätty prioriteettikohde `fallbackOnlyOnQuotaExhaustion` ohitetaan samalla tavalla, eikä se pysäytä yhdistelmää. Varjokohde tarkistetaan ja kirjataan lokiin, mutta sitä ei koskaan lasketa vartijan ohittaneeksi kohteeksi.
7. `fusion` yhdistelmä epäonnistuu ennen paneelin kulkua, kun fuusiopalvelun käyttämä tuomari hylätään. Tuo tuomari tulee yhdistelmän asetuksista tai yleisistä yhdistelmäoletusasetuksista. Sama tarkistus suoritetaan, kun fuusioyhdistelmä saavutetaan turvaverkon uudelleenohjauksen kautta.
8. Yksi lokirivi pyyntöä ja palveluntarjoajaa kohden, `tag: "AGENT_GUARD"`, `warn` kieltäytymiselle ja samat kentät kuin `monitor`.
9. Sisäisen virheen vuoksi suojus ei avaudu. Pyyntö etenee ja yksi `warn` -rivi `agent guard failed open` kirjataan lokiin.

**`block`:n rajat:**

- Jokainen signaali on asiakkaan ohjaama otsikko. Asiakasta, joka lähettää `User-Agent: claude-cli/…`, käsitellään Claude koodina. `block` estää muokkaamattomia kolmannen osapuolen agentteja. Se ei ole kulunvalvonta.
- Välityspalvelin, joka poistaa tunnistavat otsikot, muuttaa minkä tahansa asiakkaan tunnistamattomaksi. Tällaista asiakasta palvellaan ilman `AGENT_GUARD_STRICT` ja evätään sen kanssa. Suorita vartija ilmentymässä, joka on asiakkaita päin. Toinen OmniRoute instanssi ensimmäisen takana näkee ensimmäisen otsikot.
- `AGENT_GUARD_STRICT` kieltäytyy kaikista niiden palveluntarjoajien asiakkaista, jotka eivät ole Claude koodi tai virallinen SDK. Se sisältää selainpohjaiset asiakkaat ja kojelaudan leikkikentän. Kojelaudan yhdistelmätesti on vapautettu, myös turvaverkon uudelleenohjauksen kautta.
- Jotkut ominaisuudet rakentavat oman chat-pyyntönsä asiakkaan pyynnön välittämisen sijaan. Neljä heistä lähettää sen takaisin OmniRoute `/v1/...` -reittien kautta:
  - erätyöt (`src/lib/batches/dispatch.ts`)
  - MCP päättelytyökalut (`open-sse/mcp-server/tools/inferenceTools.ts`)
  - A2A älykäs reititys (`src/lib/a2a/skills/smartRouting.ts`)
  - näkösilta, kun se kuvaa kuvaa OmniRoute :n (`src/lib/guardrails/visionBridgeHelpers.ts`) kautta
- Telegram -chat-välityspalvelin (`src/lib/telegram/chatProxy.ts`) rakentaa pyyntönsä prosessissa ja soittaa suoraan chat-käsittelijälle.
- Nämä sisäiset pyynnöt sisältävät OmniRoute omia otsikoita, eivät ne aloittaneen asiakkaan otsikoita. Vartija luokittelee heidät tuntemattomiksi asiakkaiksi.
- Ilman `AGENT_GUARD_STRICT` nämä sisäiset pyynnöt toimitetaan suojatuille palveluntarjoajille riippumatta siitä, kuka alkuperäinen asiakas oli. Kolmannen osapuolen agenttia, joka saavuttaa Claude heidän kauttaan, ei evätä.
- `AGENT_GUARD_STRICT` avulla nämä sisäiset pyynnöt hylätään suojatuilta palveluntarjoajilta, jotka ovat ne aloittaneet, mukaan lukien Claude koodi.
- Vain chat-käsittelijän kautta kulkevat pyynnöt suojataan. Mallin validointi (`src/lib/modelValidation/runner.ts`) kutsuu pyyntöytimen suoraan, eikä sitä ole portitettu.
- Vain `claude` ja `anthropic` -palveluntarjoajat kattavat. Toisen palveluntarjoajan tarjoamat Claude mallit eivät kuulu, eikä myöskään `claude-web` palveluntarjoaja.
- Jotkut yhdistelmät nimeävät jäljellä olevat kohteet ilman tarjoajan etuliitettä paljaiksi mallitunnuksiksi tai sisäkkäisiksi komboksi. Kun nämä kohteet eivät ole käytettävissä muusta syystä (katkaisin auki, jäähdytys, lukitus), pyyntö epäonnistuu käytäntövirheen vuoksi.
- Ohitettu yhdistelmäkohde tyhjentää kohteen viimeisimmän tunnetun hyvän nastan, kuten mikä tahansa ohitettu kohde.
- Fuusiotuomari, joka on nimetty vartioidulla palveluntarjoajan etuliitteellä, evätään ennen kuin paneeli alkaa. Se kattaa sanat `anthropic/…`, `claude/…`, alias, kuten `cc/…`, kontekstiliite, kuten `[1m]`, ja näiden palveluntarjoajien kiintiön osuusnimet.
- Fuusiotuomari, joka on kirjoitettu paljaana mallitunnuksena tai mallialiaksena, joka ratkaisee vartioidun palveluntarjoajan, hylätään vain, kun se lähetetään. Paneeli on jo toiminut siihen mennessä. Tuomarin nimeäminen sen tarjoajan etuliitteellä välttää tämän. Mikään tuomarin oikeinkirjoitus ei tavoita vartioitua palveluntarjoajaa kieltäytymättä.
- Esitarkastus kieltää määritetyn Claude tuomarin, vaikka fuusiopalvelu luopuisi tuomarista ajon aikana. Palvelu pudottaa tuomarin, jonka operaattori piilotti, ja tuomarin, joka ei voi ottaa pyynnön mediaa. Toinen tapaus kattaa vahvistamattoman näöntuen ja muut tiedotusvälineet, joita tuomari ei hyväksy. Molemmat yhdistelmäpolut käyttäytyvät tällä tavalla.
- Turvaverkon uudelleenohjauksessa yhdistelmäpalvelu vastaanottaa tyhjiä asetuksia. Vain globaaleihin yhdistelmäoletusarvoihin asetettua tuomaria ei koskaan käytetä siellä.
- Kun `block` on päällä, asiakas, jonka vartija kieltäytyisi vartioidusta palveluntarjoajasta, ei käytä sivuvaunun pikapolkua missään mallissa. `AGENT_GUARD_STRICT` n alla on jokainen tunnistamaton asiakas. Välittäjätunnistetarkistuksensa jälkeen `POST /v1/relay/chat/completions/bifrost` vastaa näihin pyyntöihin 503:lla ja `X-Bifrost-Fallback` -otsikolla.
- `POST /v1/messages/count_tokens` antaa paikallisen arvion asiakkaalle, jonka vartija kieltäytyisi palveluntarjoajalta, johon malli päättää.
- Avainkohtaista poikkeusta ei ole.

## Perussopimus (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true oikosulkee ketjun
  message?: string; // näytetään eston yhteydessä
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // preCall palauttaa tämän pyynnön uudelleenkirjoittamiseksi
  modifiedResponse?: TValue; // postCall palauttaa tämän vastauksen uudelleenkirjoittamiseksi
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Guardrail ilmaisee "ei muutosta" palauttamalla joko `void`:n, `{}`:n tai
`{ block: false }`:n. `modifiedPayload`-/`modifiedResponse`-kentän palauttaminen
korvaa ketjussa eteenpäin virtaavan arvon myöhempiä guardraileja varten.
`signal?: AbortSignal` välittää kutsujan elinkaaren guardrailleille. Pyynnön keskeyttäminen (abort) on tarkoituksellinen fail-open-poikkeus: mediasillat lopettavat työn ja siivoavat palauttamatta raakamediaa kohteeseen, joka ei tunnetusti tue sitä.

## Rekisteri (`registry.ts`)

Singleton `guardrailRegistry` paljastaa:

- `register(guardrail)` — lisää (tai korvaa normalisoidulla nimellä) suojakaiteen ja lajittelee uudelleen nousevalla `priority` llä.
- `clear()` / `list()` — hallinnolliset avustajat.
- `runPreCallHooks(payload, context)` — toistaa aktiiviset suojakaiteet, pujottaa hyötykuorman `modifiedPayload` läpi ja pysähtyy ensimmäiseen `block: true`.
- `runPostCallHooks(response, context)` — sama virtaus vastauspuolella.
- `resetGuardrailsForTests({ registerDefaults })` — tyhjentää tilan ja valinnaisesti rekisteröi puhtaan testieristyksen oletusasetukset uudelleen.

Molemmat juoksijat palauttavat `{ blocked, payload|response, results, guardrail?, message? }`, jossa `results` on joukko `GuardrailExecutionResult` -tietueita, jotka sisältävät per-guardrail `blocked`, `skipped`, `modified`, `error` ja `meta` -kentät, jotka ovat hyödyllisiä jäljittämisessä.

### Suojakaiteiden poistaminen käytöstä pyynnöstä

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` kokoaa poistetun luettelon suojakaiteiden nimistä, jotka tulee ohittaa nykyisessä pyynnössä. Kanavia on viisi, luetaan tässä järjestyksessä ja yhdistetään yhdeksi listaksi (ensimmäinen esiintyminen voittaa kopioinnin poistamisen):

1. `apiKeyInfo.disabledGuardrails`
2. Pyydä body `disabledGuardrails` (ylätaso)
3. Pyydä body `metadata.disabledGuardrails` (vain kun `metadata` on objekti)
4. Otsikko `x-omniroute-disabled-guardrails`
5. Vanha otsikko `x-disabled-guardrails`

Kaikki viisi kanavaa yhdistetään, mukaan lukien kaksi otsikkoa: sekä `x-omniroute-disabled-guardrails` että `x-disabled-guardrails` lähettäminen ohittaa niiden luetteloiden yhdistämisen, eikä tyhjä moderni otsikko enää piilota vanhaa ( [#16412](https://github.com/cheaper-inference/OmniRoute/issues/16412), korjattu [#16805](https://github.com/cheaper-inference/OmniRoute/pull/16805) ssä).

Arvot voivat olla merkkijonoja tai pilkuilla erotettuja merkkijonoja; nimet leikataan ja normalisoidaan pienillä kirjaimilla kebab-kirjain (`pii_masker` → `pii-masker`), ja tyhjät merkinnät jätetään pois. Tulos välitetään `context.disabledGuardrails` kautta rekisteriin, joka ohittaa vastaavat suojakaiteet (`skipped: true` in `results`).

Poistoluettelo vaikuttaa vain** rekisteri** . Pikainjektion `block` tila on pakollinen raja: ruiskutussuojan väliohjelmisto (`src/middleware/promptInjectionGuard.ts`) kutsuu `evaluatePromptInjection()` ilman soittajan ohjaamaa estoluetteloa (kuollut `resolveDisabledGuardrails({ body })` -kutsu, jonka se käytti, poistettiin [#16934](https://github.com/cheaper-inference/OmniRoute/pull/16934) ssä), joten `prompt-injection` poistamista poistava pyyntö hylätään edelleen `block` tilassa. Tämä on suunniteltu. Poistokanavat ovat soittajan ohjaamia (pyynnön runko, metatiedot, otsikot), eikä soittaja saa pystyä kytkemään pois päältä operaattorin asettamaa turvaohjausta ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ). [#16412](https://github.com/cheaper-inference/OmniRoute/issues/16412) :n otsikkoliitto muuttaa vain ne rekisterin suojakaiteet, jotka ohitetaan; se ei anna asiakkaan ohittaa väliohjelmistoa. Pakollisia avain- ja ryhmäkohtaisia suojakaiteen käytäntöjä seurataan v4:ssä RFC [#16417](https://github.com/cheaper-inference/OmniRoute/issues/16417). Katso [kattavuus ja rajat](#coverage-and-limits).

## Suoritusjärjestys

Jokaiselle pyynnölle, joka kulkee tiedostojen `src/sse/handlers/chat.ts` ja
`open-sse/handlers/chatCore.ts` kautta (kohdassa
[Coverage and limits](#coverage-and-limits) luetellut chat-perheen reitit):

1. `resolveDisabledGuardrails(...)` muodostaa ohitusluettelon API-avaimen, rungon
   ja otsakkeiden perusteella.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` suorittaa suojakaiteet
   prioriteettijärjestyksessä pienimmästä suurimpaan:
   - Käytöstä poistetut suojakaiteet kirjataan tilaan `skipped`.
   - Kunkin suojakaiteen `preCall` voi kirjoittaa hyötykuorman uudelleen
     `modifiedPayload`-arvon kautta.
   - Ensimmäinen `block: true` keskeyttää ketjun, ja käsittelijä palauttaa
     suojakaiteen hylkäysvastauksen.
3. (Mahdollisesti uudelleenkirjoitettu) hyötykuorma siirtyy yhdistelmäreititykseen
   ja upstream-lähetykseen.
4. **Vain suoratoistamattomassa käsittelyssä:** vastauksen koostamisen jälkeen
   `guardrailRegistry.runPostCallHooks(...)` suorittaa saman ketjun vastaukselle.
   `block: true` tässä vaiheessa hylkää upstream-vastauksen ja palauttaa HTTP 400
   -vastauksen. Suoratoistetut vastaukset ohittavat tämän vaiheen kokonaan.
5. **Vain palautuvassa holvissa:** kun pyyntö loi tokeneita, `handleChat`
   palauttaa ne 2xx-vastaukseen, jonka se palauttaa post-call-kutsujen ja
   suoratoiston PII-muunnoksen jälkeen, joten `PII_RESPONSE_SANITIZATION` näkee
   tokenit ja mallin tuottaman PII-datan, ei koskaan palautettua alkuperäistä.

Poikkeuksen aiheuttavat suojakaiteet kirjataan muodossa `error: <message>` ja
kirjataan lokiin `logger.warn`-kutsulla, mutta ketju jatkuu — toimintatapa on
suunniteltu fail-open-periaatteen mukaisesti.

## Kattavuus ja rajat

Suojakaiteen rekisteri on kytketty vain chat-putkeen. Nämä rajat on asetettu `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` ja `tests/unit/guardrail-pipeline-characterization.test.ts` avulla; päivittää nämä testit tarkoituksella, kun käyttäytyminen muuttuu.

### Missä koukut kulkevat

| Koukku / ohjaus                        | Juoksee eteenpäin                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                      | `handleChat` (`src/sse/handlers/chat.ts`) käsittelemät pyynnöt: `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (ja `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` ja Telegram chat-välityspalvelin. Myös kojelautatestin päätepiste `/api/guardrails/test`. Puhelua edeltävä lohko palauttaa HTTP 400. |
| `runPostCallHooks`                     | **Ei suoratoistoa** vain chat-vastaukset (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Suoratoistovastaukset eivät koskaan saavuta sitä.                                                                                                                                                                                                                                                                                       |
| Suoratoisto PII                        | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), johdetaan `streamingPipeline.ts` ssä, kun `PII_RESPONSE_SANITIZATION` on päällä. Se ei ole suojakaide, joten poistokanavat eivät vaikuta siihen.                                                                                                                                                                                                                           |
| Käännettävä PII holvi                  | Vain `handleChat` käsittelee pyynnöt, kun `PII_REDACTION_ENABLED` ja `PII_REVERSIBLE_VAULT_ENABLED` ovat käytössä. Tokenit lyödään `pii-masker` -esikutsulla ja palautetaan `handleChat` -uloskäynnissä (`src/lib/pii/requestTokenVaultScope.ts`). `pii-masker` poistaminen käytöstä pyynnössä tarkoittaa, että mitään ei lyödä.                                                                                                         |
| Ruiskutussuojan väliohjelmisto (vanha) | Jokainen kehotteen sisältävä `/v1` -reitti, chat-perhe mukaan lukien (katso [reitin kattavuus](#injection-guard-route-coverage--red-team-phase-8--block-d) ). Vain nopea ruiskutus.                                                                                                                                                                                                                                                      |

### Mitä ei kata

- **Media, upotukset ja datareitit** (`/v1/images/*`, `/v1/embeddings`, `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/rerank`, `/v1/search`, `/v1/moderations`) eivät koskaan pääse rekisteriin. Siellä ei kulje PII -naamiointia, valtuustietojen peittämistä tai modaliteettisiltaa. Niiden ainoa tarkistus on vanha ruiskutussuojan väliohjelmisto.
- **Suoratoistetut vastaukset** ei saa puhelun jälkeisiä suojakaiteita: ei `pii-masker` tai `credential-masker` -jälkeispuhelua eikä puhelun jälkeistä estoa. Vain suoratoiston PII -muunnos on käytössä (kun `PII_RESPONSE_SANITIZATION` on päällä). Suoratoistetussa vastauksessa toistettua valtuustietoa ei redusoitu.
- **Kanavien ja väliohjelmiston poistaminen käytöstä (suunnittelun mukaan):** väliohjelmisto arvioi nopean injektion omalla kutsullaan `evaluatePromptInjection()` välittämättä soittajan ohjaamaa estoluetteloa. `block` tila on pakollinen raja, jota soittajan ohjaama esto ei voi ohittaa, myös chat-perhereiteillä ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ). `prompt-injection` poistaminen käytöstä ohittaa vain rekisterin suojakaiteen.

### Mikä näkee vastauksen ennen jälkipuhelua

Ei-suoratoistopolulla järjestys on: muistin purkaminen → sisäänrakennettu työkalun suoritus → puhelun jälkeiset suojakaiteet → puhelun jälkeiset lohkot poistuminen → semanttisen välimuistin varastosta.

- **Muistin purkaminen** ja** työkalun suoritus** katso vastaus ennen kuin puhelun jälkeiset suojakaiteet voivat kirjoittaa sen uudelleen tai estää sen. [#16401](https://github.com/cheaper-inference/OmniRoute/pull/16401) lähtien muistin purkaminen ajaa puretun tekstin `sanitizePII` kautta, kun `PII_RESPONSE_SANITIZATION` on päällä (sekä suoratoistossa että ei-suoratoistossa), mutta vastausta, joka estää puhelun myöhemmin, on edelleen tarjottu muistille ja työkaluille.
- **Semanttinen välimuisti** tallentaa vastauksen puhelun jälkeen, joten se tallentaa uudelleenkirjoitetun vastauksen, eikä estetty vastausta koskaan tallenneta välimuistiin. Välimuistin merkinnät avataan API -näppäimellä.

## Kokoonpano

Sisäänrakennettujen suojakaiteiden lukemat ympäristömuuttujat:

| Muuttuva                              | Käyttänyt                  | Vaikutus                                                                                                                  |
| ------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Aseta `false` poistamaan tunnistus kokonaan käytöstä.                                                                     |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Injektiokäytäntö: `warn`, `block` tai `log`. Vanha arvo `redact` ei kirjoita lisättyä tekstiä uudelleen.                  |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Ruiskutussuojan tila; myös DB -ominaisuus lippu, joka** ohittaa** env vars (DB > ENV).                                    |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Vähimmäisvakavuus, jonka `MODE=block` hylkää: `high` (oletus), `medium` tai `low`.                                        |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | `INPUT_SANITIZER_BLOCK_THRESHOLD` vanha alias.                                                                            |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Kun `true`, pyyntö PII redaktoidaan (injektiotilasta riippumatta).                                                        |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | `PII_REDACTION_ENABLED`:lla lyö käännettävät rahakkeet ja palauta ne 2xx vastauksena.                                     |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (alavirtaan)  | Ohjaa vastauspuolen maskin toimintaa.                                                                                     |
| `AGENT_GUARD_MODE`                    | `agent-guard`              | `off` (oletus), `monitor` tai `block`. Myös DB -ominaisuuslippu (DB > ENV).                                               |
| `AGENT_GUARD_STRICT`                  | `agent-guard`              | `false` (oletus) tai `true`. `block` kieltäytyy myös tunnistamattomista asiakkaista. Myös DB -ominaisuuslippu (DB > ENV). |

Modality Bridge -suojakaiteet lukevat ajonaikaisen konfiguraation DB:n tukemasta asetussäilöstä (`getSettings()`), eivät env varsia. Visionin ensisijaiset avaimet ovat `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ja `modalityBridgeCacheMaxEntries`. Vanhat `visionBridge*` avaimet hyväksytään vain dokumentoiduksi yhden jakson lukuvarasiksi; kojelaudan kirjoitukset käyttävät ensisijaisia avaimia. Oletusarvot ja vararatkaisin elävät `src/shared/constants/modalityBridgeDefaults.ts` ssä , ja vanhat vakiot säilyvät `src/shared/constants/visionBridgeDefaults.ts` ssa .

Ääni käyttää `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout` ja `modalityBridgeAudioMaxClips` sekä jaettuja `modalityBridgeCache*` asetuksia. Äänessä ei ole perinteisiä avaimia, koska nämä avaimet otettiin käyttöön Modality Bridge -skeeman kanssa.

Video käyttää `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` ja `modalityBridgeVideoTimeout` sekä jaettuja `modalityBridgeCache*` -asetuksia. Se on oletuksena poistettu käytöstä, koska FFmpeg/ffprobe ovat valinnaisia toiminnallisia riippuvuuksia ja kehystekstit lisäävät viivettä ja mallin kustannuksia.

## Mukautetut suojaukset

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Vaiheet:

1. Luo tiedosto `src/lib/guardrails/myGuardrail.ts`, joka laajentaa luokkaa `BaseGuardrail`.
2. Toteuta `preCall` ja/tai `postCall`.
3. Rekisteröi joko tuontivaiheessa (lisäämällä `registerDefaultGuardrails`-funktioon) tai
   kutsumalla `guardrailRegistry.register(...)` ajon aikana — rekisteri korvaa
   aiemman suojauksen, jolla on sama normalisoitu nimi.
4. Lisää testit hakemistoon `tests/unit/` (olemassa olevia esimerkkejä:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testaus

Käytä `resetGuardrailsForTests()`-funktiota testien välissä aloittaaksesi tunnetusta tilasta.
Anna `{ registerDefaults: false }` aloittaaksesi tyhjällä rekisterillä ja
rekisteröidäksesi vain testattavat suojaukset. Vision Bridge hyväksyy riippuvuuksien
injektioinnin (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge tarjoaa
vastaavat liittymät asetuksille, ominaisuuksille, STT-mallin valinnalle, tunnistetietojen
tarkistuksille ja transkriptiolle. Testit voivat näin käydä läpi molemmat kulut ilman
tietokanta- tai verkkoyhteyttä.

## Katso myös

- `src/lib/guardrails/` — toteutus
- `src/shared/utils/inputSanitizer.ts` — jaettu tunnistin, joka toimii
  prompt-injektion ja PII-maskauksen pohjana
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridgen oletukset ja
  pakotetun bridgen malliluettelo
- `src/shared/constants/modalityBridgeDefaults.ts` — jaetut Vision/Audio-ajonaikaiset oletukset
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonaalinen kerros (katkaisija, jäähdytysjaksot)
- `docs/reference/ENVIRONMENT.md` — täydellinen ympäristömuuttujien viite

## Ruiskutusvartijan reitin peitto ja punainen joukkue (vaihe 8 · Block D)

Ruiskutussuoja (`createInjectionGuard` / `withInjectionGuard`) kattaa kaikki reitit, jotka hyväksyvät käyttäjän kehotteet. Se kunnioittaa `INJECTION_GUARD_MODE` (vain oletusarvoinen `warn` = log; `block` = palauttaa HTTP 400 `SECURITY_001`).

| Tyyppi            | Reitit                                                                                                                                               | Oletustila |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Teksti (olemassa) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | varoittaa  |
| Generatiivinen    | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | varoittaa  |
| Data              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | varoittaa  |

Tekstin purkaminen (`extractMessageContents`) kattaa `messages`/`input`/`prompt`/`query` + `documents`/`instructions`/`system`.

**Punainen joukkue (iltaisin, `nightly-llm-security.yml`):** promptfoo vahvistaa, että jokainen reitti estää OWASP-LLM-korpuksen `INJECTION_GUARD_MODE=block`:ssä; garak suorittaa luotain (hypii ilman salaisuutta). `moderations` on mukana johdonmukaisuuden vuoksi. Estotila on pakollinen raja: `evaluatePromptInjection()` jättää huomioimatta pyyntökohtaisen poistoluettelon väliohjelmisto välittää sen, joten `disabledGuardrails` tekee sen** ei** vapauttaa reitin siitä ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ).

Yötyönkulussa (`.github/workflows/nightly-llm-security.yml`, cron + manuaalinen lähetys) on kaksi tehtävää:

- **`promptfoo-guard` (esto)** — ajaa `promptfoo eval -c promptfooconfig.yaml` :tä `INJECTION_GUARD_MODE=block` kanssa. Jokainen kontradiktorinen tapaus (esim. "ohita kaikki aikaisemmat ohjeet...", DAN-tyylinen jailbreak) väittää, että vastaus sisältää `error.code === "SECURITY_001"`, eli vartija todella hylkäsi pyynnön.
- **`garak` (neuvoa-antava)** — suorittaa garak `--probes promptinject,dan,leakreplay` paikallista OmniRoute instanssia (`http://localhost:20128/v1`) vastaan. Aidattu palveluntarjoajan salaisuuteen (`PROMPTFOO_PROVIDER_KEY`); ohittaa sulavasti ja on pääte `|| true`, joten se raportoi epäonnistumatta CI.

Suojaapulaisen (`createInjectionGuard` / `withInjectionGuard`) kattavuus kattaa jokaisen kehotteen sisältävän `/v1` reitin; kehoteteksti vedetään kentästä `messages`/`input`/`prompt`/`query` + `documents`/`instructions`/`system` `extractMessageContents()` : lla `src/shared/utils/inputSanitizer.ts`: ssä .
