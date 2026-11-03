# Guardrails (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Totuuden lähde:** `src/lib/guardrails/`
> **Viimeksi päivitetty:** 2026-10-17 — v3.8.52 (lisätty [Kattavuus ja rajoitukset](#coverage-and-limits):
> mitkä reitit ja vastauspolut hookit saavuttavat, yhdistetyt käytöstäpoisto-otsakkeet (#16412),
> injektion estotila pakollisena rajana (#16413) ja mikä näkee vastauksen ennen post-call-vaihetta)

Guardrailit toteuttavat turvallisuus-, käytäntö- ja sisältömuunnoksia OmniRouten
ja ylävirran palveluntarjoajien välisellä rajalla. Jokainen guardrail voi
tarkastaa (ja halutessaan hylätä, muuntaa tai merkitä) pyyntöjen hyötykuormia
(`preCall`) ja ylävirran vastauksia (`postCall`).

Järjestelmä toimii **fail-open**-periaatteella: jos guardrail heittää
poikkeuksen suorituksen aikana, rekisteri kirjaa virheen ja jatkaa seuraavaan
guardrailiin sen sijaan, että pyyntö epäonnistuisi. Estäminen on eksplisiittinen
päätös (`block: true`), ei koskaan vahinko. Ainoa poikkeus on keskeytetty
pyyntö: kun kutsujan `signal` keskeytetään, poikkeuksen heittävä guardrail
hylkää hook-ajon sen sijaan, että se ohitettaisiin.

Hookeja **ei** suoriteta jokaisella reitillä eikä jokaiselle vastaukselle. Lue
[Kattavuus ja rajoitukset](#coverage-and-limits) ennen kuin luotat guardrailiin
turvallisuuskontrollina.

## Sisäänrakennetut suojakaiteet

Rekisteri lataa automaattisesti kuusi suojakaitetta prioriteettijärjestyksessä tuonnin yhteydessä (katso `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteetti | Nimi                | Vaihe(t)       | Tiedosto              |
| ------------ | ------------------- | -------------- | --------------------- |
| `5`          | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`          | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`          | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`         | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`         | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`         | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Alemman prioriteetin numerot juoksevat** ensimmäinen** .

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 -perusmallilla ja `glm-5.3-{low,high,max}` llä on selkeät `supportsVision:false` registry/spec -metatiedot. GLM 5.3 Flash -versiot pysyvät alkuperäisinä malleina. Claude koodin `/v1/messages` reitti tulee jaettuun `handleChat` -esipuhelun suojakaiteen ketjuun** ennen** Claude-to-OpenAI-käännös; sisäkkäiset `Read` -työkalutuloskuvat on kuvattava tai käsiteltävä ennen kuin käännös nostaa ne OpenAI `image_url` -sisältöön (#17069).

Sieppaa kuvia sisältävät pyynnöt, jotka on kohdistettu** ei-näkemättömät mallit** ja joko reitittää koko pyynnön uudelleen näkökykyiseen malliin tai korvaa kuvaosat konfiguroitavan näkömallin tuottamilla tekstikuvauksilla ennen ylävirran kutsua. Tämän ansiosta vain teksti -palveluntarjoajat voivat käsitellä multimodaalisia hyötykuormia läpinäkyvästi.

Virtaus:

1. Ohita, jos kohdemalli jo tukee näköä (ellei se näy pakkosiltaluettelossa `isVisionBridgeForcedModel`).
2. Pura kuvaosat `extractImageParts(messages)` :n (`visionBridgeHelpers.ts`) kautta, joka delegoituu** yhtenäinen mediatunnistin** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — ainoa totuuden lähde, joka jaetaan yhdistelmäyhteensopivuussuodattimen kanssa. Purkaminen on sallittujen muodoissa, jotka `replaceImageParts` voi liittää takaisin (poisto ↔ korvaa sopimuksen): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` ja Vastaukset API `input_image`. Claude -koodin `tool_result.content` ja Responses-työkalun tulosteiden sisällä olevat vastaavat kuvat puretaan ja korvataan alkuperäisillä poluilla. Vain indikaattoreita sisältävät muodot ovat yhdistelmäsuodatinmateriaalia, eikä niitä poisteta. Ohita, jos yhtään ei löydy.
3. Ratkaise ajonaikaiset asetukset `resolveVisionBridgeRuntimeSettings()` :n (`src/shared/constants/modalityBridgeDefaults.ts`) kautta: uudet `modalityBridge*` asetusnäppäimet voittaa; vanhat `visionBridge*` avaimet säilyvät a** yhden syklin varmistus** (palautusikkuna). Ohita ennen median läpikulkua, kun silta on poistettu käytöstä.
4. Tilavalitsin (`modalityBridgeVisionMode`, katso alla oleva taulukko) päättää uudelleenreitityksen vs. kuvauksen. Reroute palauttaa `modifiedPayload`, jossa vain `model` on vaihdettu, sekä meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Kuvaile polku: rajoita kuvat osoitteessa `maxImages`, kirjoita tehtävätietoinen kehote, katso kuvausvälimuistia, kutsu visiomalli** rinnakkain** (`Promise.allSettled`) ja lisää `[Image N]: <description>` tekstiosat niiden tilalle. Epäonnistunut kuvaus tuottaa `null`:n: raakakuva säilyy unknown/vision-capable -kohteille (#4012), mutta** vahvistettu vain teksti -suora kohde** tai zero-vision -yhdistelmä saa eksplisiittisen `(unavailable — no vision-capable provider connected)` -tekstin tynkän jokaiselle kuvaamattomalle kuvalle, mukaan lukien osittaiset viat ja kuvat, jotka ylittävät kuvaus-kutsun rajan (#17069). Nykyinen kaikki epäonnistunut yhdistelmäkuvausvaraus pysyy ennallaan (#8430).
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

Oletus** totta** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) liittää tekstin** viimeinen käyttäjäviesti** (katkaistu 500 merkiksi) pohjaan kuvaileva kehote ohjaa kuvausta kohti sitä, mitä käyttäjä todella kysyi (codex-vision-proxy-malli) ja pyytää visiomallia litteroimaan näkyvää tekstiä. Kun lippu ei ole käytössä — tai ei käyttäjätekstiä — peruskehotetta käytetään muuttumattomana.

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

Kun silta hakee a** kauko-** itse kuva — Anthropic kuvaa itsekutsua ja claude-wire-muotoista base64-muuntoa (`ensureBase64ImagesForClaudeWire`), molemmat `fetchRemoteImageAsDataUri()` kautta `visionBridgeHelpers.ts` — ssä, tuloksena oleva data URI välitetään `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) läpi ennen kuin se upotetaan näkömallipyyntöön. Ylisuuret kuvat pienennetään arvoon a** 2048px pitkä reuna** (vastaa koon rajoitinta OpenAI/Anthropic jo käytä palvelinpuolta), mikä leikkaa bytes/latency -latauksen muuttamatta sitä, mitä visiomalli näkee. Koon muuttaminen käyttää `sharp`, joka ladataan dynaamisen tuonnin kautta: alustalla, jossa sen alkuperäinen binaari ei lataudu, `normalizeDataUri()`** ei koskaan heitä** — se putoaa takaisin alkuperäisten tavujen läpivientiin, joten describe/base64-conversion polku toimii aina. Muut kuin kuvatavut (haku, joka ei palauttanut dekoodattavaa kuvaa) kulkevat myös koskemattomina. Tämä normalisointi kohdistuu kuviin, jotka silta hakee omaa itsekutsuaan varten — sitä ei koskaan sovelleta soittajan raakaläpivientihyötykuormaan, mikä on vain opt-in-only -mutaatioperiaatteen mukainen (kova sääntö 20).

#### Asetusskeema + migration

Uudet `modalityBridge*` näppäimet on Zod-validoitu `updateSettingsSchema` :ssä (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trio ja Audio Bridgen käyttämä `modalityBridgeAudio*` ryhmä. Siirto `141_modality_bridge_settings.sql` kopioi olemassa olevat vanhat `visionBridge*` -arvot vastaaviin uusiin avaimiin (idempotentti, ei koskaan korvaa operaattorin määrittämää `modalityBridge*` -arvoa); vanhat avaimet hyväksytään lukuvarauksiksi yhden julkaisujakson ajan.

#### Läpinäkyvyysotsikko + stats

Kuvaile-muunnetut vastaukset sisältävät `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (rakennettu `buildModalityBridgeHeader()` :llä `modalityBridge/bridgeStats.ts`:ssä, leimattu `withModalityBridgeHeader()` :llä `src/sse/handlers/chatHelpers.ts`:ssä). Uudelleenreititetyt pyynnöt saavat** ei** header — hyötykuorma jäi koskemattomaksi ja mallinvaihto näkyy jo vastausrungon `model` kentässä.

`GET /api/modality-bridge/stats` (management auth, sama taso kuin `GET /api/settings`) palauttaa muistissa olevat modaliteettikohtaiset laskurit `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` arvoille `vision`, `audio` ja `video`. `averageLatencyMs` käyttää nimittäjänä `latencySamples`, ei kaikkia yrityksiä; operaatio ilman ajoitusta ei muodosta nolla millisekunnin näytettä. `bridged` on edelleen taaksepäin yhteensopiva alias onnistuneille muunnoksille; epäonnistuneet yritykset eivät lisää sitä. Laskurit nollataan prosessin uudelleenkäynnistyksen yhteydessä (telemetria, ei kirjanpito).

#### Kojelaudan määritys

Oma kojelautasivu on `/dashboard/settings/modality-bridge`. Sen URL-osoitteella olevat `Vision`, `Audio` ja `Video` -välilehdet säilyttävät kyselyparametrit vaihtaessaan `tab` -arvoa. Visio-välilehti paljastaa käyttöönoton, tilan, mallin valinnan (mukaan lukien automaattinen oletus), tehtävätietoiset kehotteet, edistyneet timeout/image/description-length/cache rajat, ajonaikaiset laskurit ja suojatun näytepyynnön. Ääni-välilehti on myös käytössä: se paljastaa käyttöönoton, vain STT-mallin valitsimen, jossa on automaattinen, timeout/max-clip rajat, äänilaskurit ja `input_audio` -näytetesti. Video-välilehti on toimiva: se ilmoittaa FFmpeg/ffprobe ajonaikaisen tilan — yhden neljästä eksplisiittisestä UI tilasta (`unknown`, kun anturi on lennossa tai ei voinut suorittaa loppuun, `restricted` ei-palauttavalla kojelautaisännällä, jossa — enable/model/frame/video/timeout asiakaspuolella, `unavailable` kerran tutkittu ja varmistettu puuttuvan, tai `available` versio FFmpeg/ffprobe versiolla) rajoittaa, suodattaa mallinvalitsimen näkökykyisille malleille ja paljastaa videolaskurit.

Entinen Vision Bridge -kortti AI asetuksissa on yhteensopivuuslinkki uudelle sivulle; se ei enää omista toista kopiota lomakkeesta. Mediantarjoajat myös linkittävät kuvasta tekstiksi ja puheen tekstiksi -työnkulkuja vastaaviin Modality Bridge -välilehtiin poistamatta olemassa olevaa puheen tekstiksi -leikkikenttää.

**Omasilmukaisen sisäänpääsyn ohitus:** kun kuvaus puhelu reitittää OmniRoute:n oman `/v1` -itsesilmukan (ei-standardi palveluntarjoajan malli) kautta, alipyyntö lähettää `x-omniroute-admission-bypass: internal` ja todennetaan ratkaistulla itsesilmukan valtuustiedolla — paikallisella `sk_omniroute` sentinelillä paikallisessa tilassa tai `REQUIRE_API_KEY=true` määrittämä `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env -näppäin voi vielä kuvata (#13qh5) soittaa. Ohitus myönnetään vain niille tarkalle tunnistetiedolle, joten ulkoiset asiakkaat eivät voi ohittaa sisäänpääsyä otsikon avulla. (#1350)

Vanhat oletusasetukset elävät `src/shared/constants/visionBridgeDefaults.ts`; uudet mode/task-aware/cache -oletusasetukset ja asetusten ratkaisija elävät `src/shared/constants/modalityBridgeDefaults.ts` ssä. Suojakaide paljastaa `deps` -konstruktorivaihtoehdon, jotta testit voivat lisätä väärennettyjä `getSettings` ja `callVisionModel` -toteutuksia.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Kaappaa ääntä sisältävät chat-pyynnöt ennen kuin ne saavuttavat kohteen, jonka ei tiedetä hyväksyvän äänituloa. Se ei koskaan reititä chat-pyyntöä uudelleen: ääniosat transkriptoidaan olemassa olevan OpenAI-yhteensopivan moniosaisen päätepisteen kautta ja valittu chat-malli jatkuu tekstitranskripteillä.

Virtaus:

1. Ratkaise `supportsAudio` `getResolvedModelCapabilities()` kautta. Eksplisiittiset toimittajarekisterin metatiedot voittaa, sitten staattiset mallin metatiedot ja sitten synkronoidut `modalities_input`. Ilmoitettu syöttöluettelo ilman `audio` :tä on `false`; kyvykkyydestä ei ole todisteita `null`. Sekä `false` että `null` aktivoivat konservatiivisen sillan, kun taas `true` ohittaa sen.
2. Ratkaise `modalityBridgeAudio*` -asetukset ja poimi liitettäviä huipputason ääniosia jokaisesta viestistä jaetun `detectMediaParts()` tunnistimen kautta. Tuetut lankamuodot ovat OpenAI `input_audio`, `audio_url` ja `source.media_type: "audio/*"`. Sisäkkäinen ääni havaitaan reititystä varten, mutta liitospolku ei poista sitä. Työn yläraja on `modalityBridgeAudioMaxClips`; myöhemmät osat pysyvät koskemattomina.
3. Kunnioita määritettyä `provider/model` tai anna `selectAudioBridgeModel()` kävellä `AUDIO_TRANSCRIPTION_PROVIDERS` vakaassa luettelojärjestyksessä ja valitse ensimmäinen malli, jossa on käytettävissä olevat aktiiviset toimittajan tunnistetiedot.
4. `callAudioTranscription()` muuntaa base64/data-URI -äänen moniosaiseksi `file` tiedostoksi tai lataa etä- `audio_url` vain julkisen lähtevän suojan kautta, jossa on DNS -kiinnitys ja 25 MB -sidos. Sitten se POSTs tiedoston ja valitun mallin paikalliseen `/v1/audio/transcriptions` -itsesilmukkaan, joka on todennettu `resolveSelfLoopBearer()` lla. Olemassa oleva transkriptioreitti suorittaa normaalin valtuustietojen haun, cooldown/rate-limit -käsittelyn ja palveluntarjoajan lähettämisen.
5. Onnistuneet puhelut korvaavat niiden osat `[Audio N]: <transcript>`. Puhelut suoritetaan `Promise.allSettled`:llä: yksittäinen vika säilyttää alkuperäisen ääniosan (#4012 sopimus). Jos jokainen puhelu epäonnistuu ja kohde on todistettu `supportsAudio === false`, osista tulee `[Audio N]: (unavailable — no STT provider connected)` (#8430 sopimus). Tuntemattomalle kohteelle (`null`) kaikkien epäonnistumisten tulos pysyy koskemattomana. Todistettu teksti-kohde ilman käyttökelpoisia STT tunnistetietoja vastaanottaa saman nimenomaisen tynkän ilman verkkopuhelua.

Onnistuneet transkriptit käyttävät prosessinlaajuista Modality Bridge LRU/TTL -välimuistia. Näppäin yhdistää ääniviitteen, vakaan `audio-transcription` toimintotunnisteen ja valitun STT -mallin; vikoja ei koskaan tallenneta välimuistiin. Ääniyritykset päivittävät jaetut `bridged`, `cacheHits`, `failures` ja `lastUsedAt` laskurit. Muunnetut vastaukset sisältävät `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; koskemattomat pyynnöt eivät vastaanota Audio Bridge -segmenttiä.

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

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) omistaa pyynnön läpikäynnin, capability/policy -tarkistuksen, pyyntökohtaisen koosteen ja vastauksen hyötykuorman. Videokohtainen työ — hankinta, koko tuloksen välimuisti, joka kuvaa kehyssekvenssiä (joka sulattaa minkä tahansa soittajan ilmoittaman äänitranskription) ja yrityskohtainen metrics/abort/cleanup — on piilotettu `processVideoPart` taakse `videoBridgePipeline.ts`, jota kutsutaan kerran `preCall`:n silmukan sisällä olevaa videoosaa kohden. Tämä moduuli määrittelee myös eksplisiittiset porttirajat `VideoMediaBrokerPort` (tavujen hankinta ja näytteistettyjen kehysten purkaminen), `VideoAudioTranscriptionPort` (soittajan ilmoittaman äänitranskription yhdistäminen näytteitetyillä kuvateksteillä) ja `VideoDrilldownPort` (kehyksen poraamisen pysyvyysraja; ei vielä johdotettu `processVideoPart` iin — reitittää vain erilliset merkinnät `/api/modality-bridge/video/drilldown` ).

Julkinen `/v1` -pyyntöpolku ei koskaan tuo tai kutsu aliprosessia. Etävideot ladataan 50 MiB n rajoituksella; inline base64-videoissa on konservatiivinen 36 MiB dekoodattu videokohtainen yläraja, joten model/messages/framing kirjekuori voi pysyä julkisen JSON pyynnön 50 MiB:n sisäänpääsyrajan sisällä. Inline-pituus ja dekoodatun koon arviot tarkistetaan ennen allokointia. HTTPS vaaditaan alkuperäisessä etä- URL ssa ja jokaisessa uudelleenohjauksessa käyttämällä olemassa olevaa vain julkista lähtevää suojausta DNS kiinnityksellä. Tavut ylittävät sitten tarkan sisäisen `POST /api/modality-bridge/video/extract` välittäjärajan. Tämä reitti on sekä `LOCAL_ONLY` että `SPAWN_CAPABLE`, hyväksyy vain prosessikohtaisen autentikoidun, luotetun silmukan paluupyynnön, eikä koskaan hyväksy URL, tiedostojärjestelmän polkua, suoritettavaa tiedostoa tai argumenttiluetteloa. API -rungon kokoinen putkisto ja käsittelijän inkrementaalinen runko-lukija valvovat itsenäisesti 50 MiB välittäjän syöttörajaa. Sen rajattu jono suorittaa yhden purkamisen kerrallaan, sallii neljä odottavaa työtä ja rajoittaa odottavaa syötettä 100 MiB llä.

Välittäjässä `ffprobe` lukee yksityisen paikallisen tiedoston; kiinteän muodon sallittujen luettelo ei sisällä soittolista- ja luettelomuotoja. Sallittujen MOV-perheen säilöjen ulkoiset MOV -tietoviitteet pysyvät oletusarvoisesti poissa käytöstä, eikä kiinteä komento ota niitä käyttöön. Sekä `ffprobe` että `ffmpeg` käyttävät `file` -only -protokollan sallittujen luetteloa, yhtä säiettä, kiinteitä argumenttitaulukoita, ei shelliä ja `PATH` stä ratkaistuja suoritettavia tiedostoja. Liitteenä olevat kansikuvat eivät ole toistettavia ehdokkaita. Kaikkien toistettavien streamien on täytettävä rajat, ja eksplisiittinen oletusvirta on suositeltava ennen determinististä alimman indeksin varoitusta. Videoiden pituus on rajoitettu 600 sekuntiin, 8 192 pikseliä ulottuvuutta kohden ja 33 554 432 lähdepikseliä. FFmpeg ottaa näytteitä 1–16 keskipisteen JPEG kehyksestä, skaalaa pitkän reunan enintään 1 024 pikseliin ilman pienempiä tuloja skaalaamatta, eikä se koskaan vastaanota URL. Näytteenotto on oletuksena `uniform`. Valinnaiset `scene_aware` ja kokeelliset `segment_aware` käytännöt suorittavat yhden kiinteän FFmpeg lisäsiirron jo vahvistetulle paikalliselle virralle, valitsevat rajatut `showinfo` kohtauksen aikaleimat ja palaavat deterministisesti samoihin yhtenäisiin keskipisteisiin ilmaisimen vian, aikakatkaisun, virheellisen lähdön tai tyhjän ehdokasjoukon yhteydessä. Segmenttitietoinen tila allokoi keskipistenäytteet suhteessa vahvistettuihin kohtausväleihin; segmenttitietoinen näyttö ja varakäyttäytyminen on kuvattu alla. Kova 16 kehyksen yläraja on käytössä valinnan jälkeen jokaisessa käytännössä. Kun kohtaustietoisella pyynnöllä on vain yhden ruudun budjetti, se käyttää aktiivisen koko videon tai tarkennusikkunan yhtenäistä keskipistettä ja raportoi `policyEffective: uniform`:n: yksi valittu kohtauskehys ei voi säilyttää molempia ajallisia päitä. Soittaja voi valinnaisesti tarjota rajallisen tarkennusikkunan (`start`/`end` sekuntia); rajat kiinnitetään median kestoon, käänteiset tai ei-äärelliset ikkunat hylätään ja kaikki näytteenottokäytännöt suoritetaan vain normalisoidun aikavälin sisällä. Tuloksena oleva ikkuna sisältyy otannan metatietoihin ja epäluotettavaan kuvausetuliitteeseen, jotta loppupään mallit voivat erottaa kohdistetun otteen koko aikajanasta.

Semanttisen kuvatekstin fokus on erillinen, selkeä asetus. Oletusarvoinen `full` analyysitila säilyttää olemassa olevan kehyskehotteen eikä koskaan välitä pyyntötekstiä kuvatekstimalliin. `focused` tilassa silta lukee vain uusimmat ei-tyhjät käyttäjän kirjoittamat `text`/`input_text` samasta Chat- tai Responses-säiliöstä, normalisoi sen arvoon NFC, tiivistää ohjausmerkit ja välilyönnit ja rajoittaa sen 500 Unicode-koodipisteeseen. Tyhjä tulos palautuu tarkalleen `full` kehotteeseen. Käyttökelpoinen vihje sarjoitetaan JSON ksi erillisessä epäluotettavan käyttäjän kontekstilohkossa, ja se voi priorisoida vain havaittavissa olevia yksityiskohtia; se ei voi ohittaa erillistä varoitusta ohjeiden noudattamisesta, jotka näkyvät tai kuuluvat tiedotusvälineissä. Tekstitarkennus ei koskaan päättele `start`/`end` tai muuta temporaalista näytteenottajaa.

#### FU-07 rakennesegmentin näyttöä

`segment_aware` käyttää yhtä rajoitettua esianalyysia jo validoidun paikallisen videovirran yli. Kiinteä suodinketju skaalautuu ensin enintään 320 pikselin leveyteen, havaitsee kohtauksen muutokset ja jäädytetyt intervallit ja ottaa sitten näytteitä 1 ruudulla sekunnissa sumennus-, keskimääräisen luman ja spatial/temporal tietojen saamiseksi. Pääsy on rajoitettu 600 rakennenäytteeseen, yhteen FFmpeg/filter säikeeseen, samaan `file` -only -protokollaan ja säilön sallittuihin luetteloihin, 1 MiB prosessitulostussidontaan ja enintään 30 sekuntiin välittäjän jaetun abort/deadline. n sisällä. Se ei koskaan hyväksy komentoa, suodatinta, polkua tai URL pyyntöä.

Rakennearvot ovat deterministisiä otantatodisteita, eivät semanttista videon ymmärtämistä. Ne eivät päättele aiheita, toimia, kuvatekstejä, puhetta tai käyttäjän tarkoitusta. Kohtauksen ja jäädytyksen rajat muodostavat segmenttejä; pysäytyspeitto, sumennus, valotus, tilayksityiskohdat ja ajallinen muutos vaikuttavat vain siihen, miten nykyinen 1–16 kuvan budjetti kohdistetaan. Täysin jäädytetty segmentti on rajoitettu yhteen kehykseen, kun taas jäädytetyt segmentit kilpailevat jäljellä olevasta budjetista. Kun rajoja on enemmän kuin kehyksiä, yhtenäinen aikajanan kattavuus säilyy, joten nopeat varhaiset leikkaukset eivät voi piilottaa pitkää perässä olevaa segmenttiä. Kohtauksen rajat 1 sekunnin analyysiresoluutiolla jäädytysrajan sisällä yhdistyvät.

Puuttuvat suodattimet, malformed/empty -todisteet, ilmaisinvirhe tai rajoitettu esianalyysin aikakatkaisu epäonnistuvat täsmälleen yhtenäisen keskipistekäytännön mukaisesti. Soittajan keskeytys tai välittäjän määräaika ei epäonnistu: se lopettaa lennon aikana tapahtuvan aliprosessin, estää myöhemmän kehyksen purkamisen ja yksityinen väliaikainen puu poistetaan `finally` ssä.

`scripts/perf/video-bridge-fu07-eval.ts` tuottaa deterministisiä todellisia FFmpeg valaisimia, jotka säästävät tekstityskutsujen jälkeisiä säästöjä, tiheän liikkeen budjetin allokointia, blur/exposure/SI-TI todisteita, nopeita leikkauksia pitkällä hännän kanssa ja asteittaista haalistumista vääriä positiivisia. Se tallentaa esianalyysin seinän ajan ja, jos `/usr/bin/time` on saatavilla, lapsi- CPU ja huippu- RSS. Sen laatutarkastukset ovat vain rakenteellisia oraakkeleita. Todellinen kuvatekstimallin laatu on edelleen `HOLD`, koska tällä valjaalla ei ole valtuutettua päätepistettä tai jäädytettyä tuomaria. Rahasäästöt pysyvät myös `HOLD`, ellei `--caption-cost-per-call-usd` toimita selkeää positiivista puhelukohtaista arviota; käsikirjoitus ei koskaan valmista kumpaakaan tulosta.

Jokainen kehys on rajoitettu arvoon 4 MiB, kaikki raakakehykset yhdessä 23 MiB iin ja sarjoitetun välittäjän vaste 32 MiB hen. Yksityinen väliaikainen hakemisto poistetaan `finally`. OmniRoute ei niputa FFmpeg eikä hyväksy mukautettua suoritettavaa polkua. Ennen tekstitystä silta käyttää konservatiivista visuaalista duplikointia: jokainen JPEG pienennetään 16 × 16 harmaasävypuskuriin ja sitä verrataan vain viimeiseen säilytettyyn kehykseen. Pyydetylle tekstitysbudjetille, joka ylittää yhden kehyksen, poiminta tarjoaa rajoitetun ehdokasjoukon, joka on jopa kaksinkertainen budjettiin verrattuna, mutta ei koskaan enempää kuin 16 kehystä. Pyydettyä ylärajaa sovelletaan vasta päällekkäisyyksien poistamisen jälkeen, ja ensimmäiset ja viimeiset valitut ehdokkaat säilyvät lopullisessa harvennuksessa, kun budjetti on vähintään kaksi. Versioitu `grayscale-16x16-mean-cells-v2` -käytäntö käyttää suurempaa keskimääräistä luma-deltaa ja pikkukuvasolujen suhdetta, joiden normalisoitu delta on vähintään 0,05. Kopiointikynnys on vakio 0,04, joka valitaan ennustettavuuden vuoksi sen sijaan, että se olisi näkyvissä ajonaikaisena asetuksena. Tämä toissijainen korkeakontrastinen signaali säilyttää pienet liikkeet ja näkyvän tekstin muutokset, jotka pelkkä vertailu voi piilottaa. Vertailun tai dekooderin virheet epäonnistuvat ja pitävät peiton. Tulosteen metatiedot erottavat poimitut ehdokkaat, onnistuneesti käytetyt kehykset ja poistetut visuaaliset kaksoiskappaleet.

Eksplisiittisesti merkitty videoosa voi pyytää aikaleimattua yhteystietolomaketta. Silta rakentaa enintään 4-pylväisen, 16-kehyksen JPEG ruudukon. Jokainen 512 pikselin solu polttaa lähteen aikaleiman suuren kontrastin alakaistalle, kun taas samat aikaleimat säilyvät tekstin metadatassa myöhempää yhdistämistä ja tarkastusta varten. Täydellinen JPEG on edelleen rajattu arvoon 32 MiB. Jos `sharp` ei pysty purkamaan tai muodostamaan ruudukkoa, silta palaa yksittäisiin JPEG kehyksiin; asiakkaan keskeytys etenee edelleen taulukkotoiminnon kautta.

Promootiotodistus on tarkoituksella erillään synteettisen koostumuksen mikrovertailuarvosta. `scripts/perf/video-bridge-contact-sheet-eval.ts` määrittelee skeemaversion A/B -valjaat oikeille OpenAI-yhteensopiville näkömalleille. Se mittaa palveluntarjoajan ilmoittamia tunnuksia, päästä päähän seinään ulottuvaa latenssia (mukaan lukien arkin koostumus), mallin puheluiden määrää ja manifestin määrittelemää tosiasian säilyttämistä. Raakamallivastauksia ei kirjoiteta raporttiin; vain SHA-256 tiivistelmät ja täsmäytystieto IDs säilytetään. Valjaat eivät soita verkko- tai maksulliseen malliin, ellei `--execute-real` ole hyväksytty ja `--model`, `OMNIROUTE_BASE_URL` ja `OMNIROUTE_API_KEY` on määritetty. Ilman tätä nimenomaista reaaliajoa sen koneellisesti luettava tuomio pysyy `HOLD`; synteettiset payload/call-count -mittaukset eivät yksin ole edistämistodisteita.

Soittajat voivat liittää valinnaisen `transcript.cues` -ryhmän tuettuun videoosaan, kun heillä on jo kohdistettua tekstiä. Jokaisessa vihjeessä on oltava `text`, rajallinen `start`/`end` -väli koetusajan sisällä ja sallittujen luettelossa oleva `source` (`client`, `embedded` tai `audio-bridge`); `confidence` on oletuksena `1` ja sen on pysyttävä `0` ja `1` välillä. Tarkat päällekkäiset vihjeet tiivistetään. OmniRoute ei koskaan aloita transkriptiota näistä metatiedoista: validoidut vihjeet kopioidaan kuvattuun tulokseen lähteen, luotettavuuden ja aikavälin kanssa, ja ne esitetään epäluotettavina havaintoja kehysten kuvatekstien rinnalla. Virheellinen, alueen ulkopuolella tai alkuperästä vapaa teksti hylätään sen sijaan, että se sekoitetaan kuvatekstivirtaan. Molemmat pyynnön tekstiosan transkriptiokanavat normalisoivat `client` toimitetun alkuperän, mukaan lukien itse vahvistaneet `embedded` tai `audio-bridge` tunnisteet. Vain palvelimen omistama sovitin voi määrittää nämä luotetut tunnisteet vain koodia sisältävän `trustedSource` -argumentin kautta; pyyntö JSON -kenttä ei voi saavuttaa tätä argumenttia. Litteraattiteksti pysyy epäluotettavana mediaperäisenä sisältönä sen alkuperästä riippumatta, eikä se saa koskaan määrittää valtuutusta.

Edistynyt soittaja voi tarjota `audioTranscript` raidan samalle videolle; sitä käsitellään asiakkaan toimittamana tekstinä, ei todisteena palvelimen transkriptiosta. Fuusio-sauma suorittaa visuaalisia ja äänihavaintoja yhden määräajan ja keskeytyssignaalin mukaisesti, tilaa ne yhteiselle aikajanalle, tiivistää tarkat kaksoiskappaleet ja raportoi osittaisen tuloksen, kun vain toinen osapuoli onnistuu. Virheellinen `audioTranscript` muuttuu osittaiseksi tulokseksi — Visuaalinen kuvaus säilytetään ja äänihaara tallentaa puhtaan virhekoodin — koko videon epäonnistumisen sijaan. Haarakohtainen saatavuus, osittainen lippu ja puhtaat vikakoodit säilyvät kuvatussa tuloksessa, suojakaiteen metatiedoissa (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), tulosvälimuistin metatiedoissa ja siltafuusiolaskureissa. Videosillan oletuspolku ei kutsu puheesta tekstiksi tai lataa toista mediakopiota. ilman tätä nimenomaista raitaa se pysyy vain videona.

**Transkription säilyttäminen (#12150 P1).** Tämä pätee automaattisesti aina, kun Video Bridge (itse opt-in) tekee transkription cue — ei ole erillistä säilytyslippua. Kun pyyntö tuottaa minkä tahansa transkriptiomerkin (soittajan ilmoittama `transcript` tai yhdistetty `audioTranscript`), suojakaide merkitsee sen `videoBridgeObserved` ja tuottaa redaktoidun varjon videon kuvauksesta — identtisen renderöinnin, jossa jokaisen vihjeen vapaan tekstin runko korvataan `[redacted-video-transcript]` llä, joka rakennetaan ennen striikin yhdistämistä. litistetty teksti, joten mikään vihje sisältö — vastakkainen tai tavallinen, mukaan lukien kappaleet sisältävät `]`, kuten `[inaudible]`/`[music]` — voi selviytyä). Pysyvä puhelulokipyynnön runko vaihtaa jokaisen videosta johdetun tekstiosan kyseiseen redusoituun varjoon, joka vastaa sisällön tasa-arvoa. `fullText` ankkuri luetaan uudelleen valmiista puhelua edeltävästä suojakaiteen hyötykuormasta, joten täsmääminen onnistuu silti, kun myöhemmät ketjusuojakaiteet ( PII ja valtuustietojen maskerit, prioriteetit 10/95) kirjoittavat kuvaustekstin uudelleen paikoilleen ja system-prompt/handoff/memory injektion jälkeen muotoilevat viestiryhmän uudelleen. Malliin vastavirtaan lähetetty runko on muuttumaton. Havaittu pyyntö ei myöskään täytä pysyvää muistia (sekä pyyntö- että vastausperäinen purkaminen ohitetaan), joten mallin oma vastaus ei voi kaikua transkriptiotekstiä muistiin.

**Raakavideokentät (#12430).** Kun silta on käytössä ja natiivivideotuki on tuntematon tai puuttuu, määritetyt `transcript`/`audioTranscript` -kentät aktivoivat myös `videoBridgeObserved`, vaikka kuvaus epäonnistuu tai `maxVideos` raja on asetettu. `null` ja tyhjät merkkijonot laskevat; puuttuvat kentät ja muut kuin videon metatiedot eivät. Säilytetyt kopiot poistavat nämä kentät tai jättävät pyynnön pois, ja caches/Memory ohitetaan.

Näillä varapoluilla kelvollisista soittajan vihjeistä tulee tuettuja `text`/`input_text` -osia ei-standardien tarjoajakenttien sijaan. Molemmat pyynnöstä toimitetut raidat ovat edelleen epäluotettavia `client` havaintoja, ja niissä varoitetaan nimenomaisesti, että videota ei kuvattu eikä aikaleimoja ole tarkistettu mediaa vastaan. Nykyiset 256-cue/64-KiB -kokonais- ja per-cue-budjetit koskevat kaikkia kahta kappaletta yhdessä; aikaleimojen tulee sopia välittäjän 600 sekunnin kattoon ja kaikkiin toimitettuihin tarkennusikkunaan. Virheelliset raidat hylätään, ei välitetä mielivaltaisena tekstinä; kelvollista sisarusta voidaan silti käyttää, ellei heidän yhteisbudjettinsa ylity. Null/empty -kentät eivät lisää tekstiä. Tämä varavaihtoehto ei lisää median hakua tai transkriptiota. Transkriptiolaajennuskentät poistetaan varavideon kantajasta ja sen `video_url`/`source` -objekteista. OpenAI langan sallittu luettelo pysyy tiukkana; Tuntemattomat alkuperäiset videovälittäjät ovat edelleen saatavilla, ja tunnetut tekstikohteet pitävät turvallisia merkkejä. Strukturoidut muokkausvarjot suojaavat liitettyä transkriptiotekstiä, kun taas alkuperäinen soittajan omistama pyyntö pysyy ennallaan. Alkuperäiset tuetut kohteet ja vammaiset sillat säilyttävät nykyisen ohituskäyttäytymisensä.

Säilytetyt lisäkopiot käyttävät samaa havaitun pyynnön signaalia. Raaka esisuojakaiteen asiakaspyynnön tilannevedos, muistissa odottava pyyntö ja aikaisin hylättyjen pyyntöjen loki korvaavat rakenteellisesti transkriptiokentät videon osissa; liukuhihnan vaiheiden ja kontekstin vaihdon syntetisoimat merkkijonokehotteet redaktoidaan jatkuvan pyynnön rungon nielussa. Pysyvä `video_content_removed` merkki saa `previous_response_id` jatkoa epäonnistumaan sulkeutumaan sen sijaan, että se rekonstruoisi tarkoituksellisesti hylätyn tekstin. Jos havaittu pyyntö menettää osakohtaisen muokkausvarjon ennen lokiin kirjaamista tai jopa yksi useista videovarjoista ei täsmää myöhempien pyyntömutaatioiden jälkeen, säilytetty pyynnön runko jätetään kokonaan pois sen sijaan, että säilytettäisiin osittain muokattu transkriptio.

Havaitun pyynnön tapauksessa mallivastaus voi lainata mitä tahansa transkription osaa ilman strukturoitua vihjerajaa. Sen pysynyt puhelulokin `responseBody` korvataan siksi laiminlyönnillä; yksityiskohtaista liukuhihnan artefaktia (joka voi sisältää upstream/client kappaleita ja stream-kappaleita) ei säilytetä. Semanttinen, idempotenssi ja päättelyn toistovälimuisti ohittavat tämän pyynnön luku- ja kirjoitustoiminnot. Palveluntarjoajan pyyntö ja asiakkaan näkyvä vastaus pysyvät ennallaan. Varhaiset säilytystavut tyhjennetään väliaikaisesta puskurista, kun yksityiskohtainen artefakti jätetään pois. Kiro:n väärin muotoiltu EventStream varoitus ilmoittaa vain hyötykuorman tavumäärän, ei koskaan sen sisältöä tai JSON -jäsentimen raakavirhettä. Tämä ei väitä, että jokainen asiaankuulumaton provider/plugin -diagnostiikka on auditoitu; laajempaa säilytetyn altaan pyyhkäisyä seurataan numerossa 11658. (#11658)

Sisäinen `/api/modality-bridge/video/drilldown` elinkaari on erillinen loopback/token-authenticated välimuistisubstraatti. Jokainen operaatio vaatii myös kanonisen opaakin pääperiaatteen ID. Ennen kuin tuotantokutsuja otetaan käyttöön, sen on johdettava tämä ID todennetulta vuokraajalta, eikä se saa koskaan lähettää eteenpäin asiakkaan valitsemaa arvoa. Välimuistiavaimet sitovat tämän pääasiallisen kanoniseen istuntoon ja videoviittaukseen IDs, tallentavat vain niiden SHA-256-derived avaimet ja kattavat sekä lukemisen että poiston samaan pääasialliseen. Välimuisti tallentaa enintään 16 johdettua JPEG kehystä merkintää kohti, vanhenee ne kymmenen minuutin kuluttua ja tukee rajoitettua `start`/`end` -lukua tai eksplisiittistä istunnon poistamista.

Jokainen pääasiallinen on rajoitettu 16 merkintään ja 64 MiB kanonista JPEG dataa. Nämä rajat ovat riippumattomia maailmanlaajuisesta 64-entry/256 MiB -katosta: päämiehen kiintiöpaine häätää vain kyseisen päämiehen vähiten käyttämät merkinnät ennen kuin globaali LRU häätö otetaan huomioon. Vanhentuneet merkinnät pyyhkäistään sekä pääasiallisesta että yleisestä välimuistitoiminnan kirjanpidosta, kun taas peruutus- ja vahvistusvirheet eivät aiheuta osittaista korvaamista.

Välimuisti hylkää ei-kanonisen Base64:n, ylimääräisen täytön, ei-JPEG-median, virheellisen tai katkaistun JPEGs ja JPEGs, jotka tuottavat varoituksen rajoitetun täyden kuvan `sharp` dekoodauksen aikana. Se koodaa jokaisen hyväksytyn kuvan uudelleen kanoniseksi JPEG ksi, saa leveyden ja korkeuden dekoodatuista tavuista sen sijaan, että luottaisi soittajan kenttiin, ja hylkää kaikki jäljessä olevat polyglottitavut sen sijaan, että säilyttäisi ne. Vain rajoitettu kanoninen pakattu puskuri veloitetaan molemmista kiintiöistä. JSON johtorajoitus sisältää Base64-ylimäärän 32 MiB dekoodatun sisääntulon katolle. Jokainen tallennettu johdannainen tallentaa sen validoidun JPEG format/resolution, näytteenottokäytännön, johtamisversion, luontiajan, palvelimen laskeman sisällön hajautusarvon ja tiivistetyn yläviitteen sekä luotetun soittajan yläsisällön tiivisteen. Peruutus tarkistetaan asynkronisten decode/hash vaiheiden välillä ennen atomivälimuistin sitoutumista.

Tämä erä ei vielä yhdistä tuotantotuottajaa reitille eikä tarjoa moniresoluutioista vaihtoehtojen valintaa. Läpinäkyvä Video Bridge -pyyntöpolku ei siis aiheuta lisätyötä, kun taas vuokralaiseen sidottu pääjohtaminen ja moniresoluutioinen FU-08 -elinkaari pysyvät nimenomaisena seurantatyönä eikä dokumentoituna täydellisenä toimintana.

Kehykset tekstitetään peräkkäin määritetyn videomallin kanssa. Tyhjä videon ohitus perii Vision-asetuksen; Jos molemmat ovat tyhjiä, Vision-automaattinen reititin valitsee tehokkaan näkökykyisen mallin. Onnistuneet kuvatekstit korvaavat alkuperäisen osan vakaalla `[Video description:` etuliitteellä, joka myös merkitsee tekstin epäluotettavaksi mediapohjaiseksi havainnon ja käskee loppupään malleja olemaan noudattamatta tiedotusvälineistä löytyviä ohjeita. Kehystekstityksen välimuistiavaimet sisältävät JPEG -tavut, kehotteen, aikaleiman ja tehokkaan mallin; vain onnistuneet tekstitykset tallennetaan välimuistiin. Välimuistimerkinnät säilyttävät todellisen onnistuneen tuottajamallin, mukaan lukien varamallin; silta ilmoittaa `mixed` kun eri malleilla valmistettiin erilaisia kehyksiä. Välimuistiosuma käyttää uudelleen tuota tuottajaidentiteettiä sen sijaan, että se nimeäisi sen uudelleen pyydetyksi reitityssuunnitelmaksi. Koko videon tulosten välimuisti on näppäilty jokaiseen tuloon, joka muuttaa tulosteen — -kehotetta, tehokasta mallia, näytteenottokäytäntöä, kehysten määrää, semanttista analyysitilaa, normalisoidun tarkennusvihjeen SHA-256 sormenjälkeä, tarkennusikkunaa, `transcript`, `audioTranscript` ja yhteystietoarkin lippua —, joten näiden mittojen muuttaminen ei ole koskaan välimuistin väärinkäyttöä. Visuaalinen dedup-käytännön versio, kynnys ja rajattu ehdokaskehysten määrä ovat myös eksplisiittisiä tulosvälimuistiavaimessa ja metatiedoissa. Käytännön muutos ei siis voi käyttää vanhentunutta koko videon kuvausta uudelleen. Result-cache v4 metadata säilyttää tilan ja sormenjäljen, ei koskaan raakaa käyttäjän tehtävää. Guardrailin metatiedot raportoivat sekä pyydetyt että tehokkaat analyysitilat; pyydetty `focused` -tila ilman käyttökelpoista käyttäjätekstiä raportoidaan tehokkaasti `full`.

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

Kaikki kolme vaativat hallinnan todennusta ja vahvistavat kehon Zod :lla (`src/shared/validation/schemas/piiSettings.ts`).

#### GDPR (EU) ja POPIA (Etelä-Afrikka) -tunnisteet

| Id                  | Tunniste                    | Validointi                                                                                              |
| ------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                        | Tunnettu maa, maan tarkka pituus, ISO 13616 MOD-97-10                                                   |
| `eu_vat`            | EU VAT numero               | Tunnettu jäsenvaltion etuliite ja kyseisen osavaltion numeromuoto (ei VIES hakua)                       |
| `es_dni_nie`        | espanja DNI / NIE           | Kontrollikirjain (arvo mod 23); NIE on `X/Y/Z` + 7 numeroa                                              |
| `it_codice_fiscale` | Italialainen Codice Fiscale | Ohjauskirjain odd/even -paikkataulukoista                                                               |
| `pl_pesel`          | Puolan PESEL                | Painotettu tarkistussumma ja olemassa oleva koodattu syntymäaika                                        |
| `nl_bsn`            | hollantilainen BSN          | 11-varma (painot 9..2, -1)                                                                              |
| `de_steuer_id`      | Saksalainen Steuer-ID       | ISO 7064 Mod 11,10 plus numerorakennesäännöt (ei alkunuolia)                                            |
| `se_personnummer`   | ruotsalainen henkilömäärä   | Luhn yli kymmenen viimeistä numeroa ja uskottava syntymäaika (10 tai 12 numeroa)                        |
| `za_id`             | Etelä-Afrikan ID numero     | Luhn yli kaikki 13 numeroa, voimassa oleva syntymätunnus month/day, kansalaisuuden numero 0 tai 1       |
| `za_phone`          | Eteläafrikkalainen puhelin  | `+27` / `27` -etuliite tai kansallinen `0..` -muoto, joka on kirjoitettu välilyönnillä tai tavuviivalla |
| `za_vat`            | Etelä-Afrikan VAT numero    | 10 numeroa alkaen `4`** ja** "VAT" / "BTW" edellisissä 48 merkissä                                      |
| `za_tax_ref`        | Etelä-Afrikan veroviite     | 10 numeroa alkaen `0`-`3`, Luhn,** ja** "tax" / "SARS" edellisissä 48 merkissä                          |

Koska vain numerot sisältävät muodot törmäävät tilausnumeroihin, koontinumeroihin ja aikaleimoihin, heikoimmat (`za_vat`, `za_tax_ref`) tarvitsevat avainsanan cue, eikä paljaaa kymmennumeroista `0..` -numeroa käsitellä Etelä-Afrikan puhelinnumerona. Välilyöntejä IBANs (`GB29 NWBK ...`) ei täsmää. Suoratoistopolulla vihjettä tarkastellaan vain nykyisen palan sisältä. Tunnukset ovat yleisten puhelinmallien edellä, joten vahvistettu tunniste säilyttää oman paikkamerkkinsä (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` ja `popia` -mallit valitsevat vastaavasti EU ja Etelä-Afrikan tunnukset. Itse peittäminen pysyy valinnaisena (kova sääntö 20): mikään tässä ei muuta ominaisuuden lipun oletusarvoa.

### Pikainjektio (`promptInjection.ts`)

Havaitsee vastakkaiset rakenteet käyttäjien toimittamassa sisällössä ja panee täytäntöön määritetyn käytännön. Käyttäytymistä ohjaavat ympäristömuuttujat ja konstruktorivaihtoehdot:

| Asetus      | Env var                                                                                               | Oletus | Vaikutus                                                                                                                                                                                   |
| ----------- | ----------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Käytössä    | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Kun `false`, suojakaiteen oikosulku.                                                                                                                                                       |
| tila        | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Injektiokäytäntö: `block`, `warn` tai `log`. (`redact` on hyväksytty back-compatille, mutta ei** ei** nauha injektio teksti; PII uudelleenkirjoituspyyntöä ohjaa `PII_REDACTION_ENABLED`.) |
| Estä kynnys | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Vähimmäisvakavuus, joka vaaditaan estoon. Medium on oletuksena vain havainnollinen.                                                                                                        |

**Tilan etusija** (`getMode`): soittaja `options.mode` → `INJECTION_GUARD_MODE`**DB ominaisuuden lipun ohitus** (Kojelauta → Asetukset → Ominaisuusliput) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Kojelaudan ohitus voittaa siten env vars -arvot, joten Feature Flags UI ohjaa käynnissä olevaa vartijaa live-tilassa (ei uudelleenkäynnistystä). DB luku on vikasietoinen: jos se tekee virheitä, vartija palaa env-pohjaiseen toimintaan, ja kun ohitusta ei ole asetettu, käyttäytyminen on identtinen vain env-resoluution kanssa.

Havaintolähteet:

1. `sanitizeRequest()` `@/shared/utils/inputSanitizer` stä (jaettu ilmaisinsarja, jota käytetään muualla liukuhihnassa).
2. Sisäänrakennettu `DEFAULT_GUARD_PATTERNS` (tällä hetkellä `system_override_inline` ja `markdown_system_block`, molemmat `high` vakavuus).
3. Valinnainen `customPatterns` välitetään konstruktoriasetusten (merkkijonojen, regex- tai `{ name, pattern, severity }` tietueiden) kautta.

Kun `mode === "block"`** ja** vähintään yksi havainto täyttää vakavuuskynnyksen, `preCall` palauttaa `{ block: true, message: "Request rejected: suspicious content detected" }`. `warn`/`log` -tiloissa suojakaide kirjautuu lokiin, mutta sallii kutsun. Jaettu apuohjelma `evaluatePromptInjection()` viedään myös soittajille, joiden on arvioitava kehotteet käymättä läpi rekisteriä.

**Skannaus sidottu (v3.8.20):** ilmaisin vain tarkastaa** ensimmäiset 16 KB** liitetyn kehotteen tekstistä — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 tavua) in `src/shared/utils/inputSanitizer.ts`. Sekä `detectInjection()` että `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` ennen kuviosilmukan suorittamista. Injektiokäskyt sijaitsevat lähellä syötteen yläosaa, joten tämä rajoittaa usean sadan kilotavun hyötykuormien regex CPU/GC -arvoa heikentämättä havaitsemista (vrt. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Juoksee eteenpäin** molemmat** vaiheet, viimeinen oletusketjussa (prioriteetti `95`). Poistaa tunnetut API-avain/salaisuusmerkkimallit lähtevästä hyötykuormasta (viestin sisältö, työkalukutsuargumentit, työkalun tulokset)** ja** palveluntarjoajan vastaus, joten kehotteeseen liitetty valtuustieto (tai työkalun tuloksen toistama) ei vuoda ylävirran toimittajalle tai takaisin asiakkaalle.

- **Vain osallistuminen** , sama käytäntö kuin PII -muokkaus (kova sääntö #20 vierekkäin): pois käytöstä, ellei `settings.credentialRedactionEnabled === true`** tai** `CREDENTIAL_REDACTION_ENABLED=true`. Kun se on pois päältä, suojakaide on no-op — jota se ei koskaan estä eikä kirjoita uudelleen.
- `redactCredentials()` kulkee koko payload/response puun (`walkValue()`, prototyyppi-saasteeton, pyöräilyturvallinen `WeakSet` kautta) ja korvaa osumat `[REDACTED:<type>]` paikkamerkillä, kloonaamalla vain todellisuudessa muuttuneet oksat.
- `CREDENTIAL_PATTERNS` covers LLM provider keys (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokens (GitHub, Slack, Linear, Notion, npm, Postman, Discord), payment keys (Stripe, Square), cloud keys (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs, credential-bearing connection strings (`mongodb://user:pass@...`, etc.), and a generic `Authorization`/`x-api-key`/`api-key`/`apikey` header-value pattern. Header-shaped keys (`authorization`, `x-api-key`, `api-key`, `apikey`) are redacted structurally (value only, scheme prefix like `Bearer `/`Basic ` preserved) rather than via the generic text regex.
- Suojakaide ei koskaan tukkeudu; se vain kirjoittaa uudelleen (`modifiedPayload` / `modifiedResponse`) ja huomauttaa (`meta.credentialsRedacted`, `meta.count`).

Regressiovartija: `tests/unit/credential-masker-guardrail.test.ts`.

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

Singleton-`guardrailRegistry` tarjoaa:

- `register(guardrail)` — lisää guardrailin (tai korvaa sen normalisoidun nimen
  perusteella) ja lajittelee listan uudelleen nousevan `priority`-arvon mukaan.
- `clear()` / `list()` — ylläpidon apumetodit.
- `runPreCallHooks(payload, context)` — käy läpi aktiiviset guardrailit, ketjuttaa
  payloadin `modifiedPayload`-kenttien kautta ja pysähtyy ensimmäiseen `block: true` -tulokseen.
- `runPostCallHooks(response, context)` — sama kulku vastauspuolella.
- `resetGuardrailsForTests({ registerDefaults })` — tyhjentää tilan ja rekisteröi
  haluttaessa oletukset uudelleen puhdasta testieristystä varten.

Molemmat suoritusmetodit palauttavat `{ blocked, payload|response, results, guardrail?, message? }`,
jossa `results` on `GuardrailExecutionResult`-tietueiden taulukko, jotka sisältävät
guardrail-kohtaiset `blocked`-, `skipped`-, `modified`-, `error`- ja `meta`-kentät —
hyödyllisiä jäljityksessä.

### Guardrailien poistaminen käytöstä pyyntökohtaisesti

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` kokoaa deduplikoidun
listan guardrail-nimistä, jotka ohitetaan nykyisessä pyynnössä. Kanavia on viisi,
ne luetaan tässä järjestyksessä ja yhdistetään yhdeksi listaksi (deduplikoinnissa
ensimmäinen esiintymä voittaa):

1. `apiKeyInfo.disabledGuardrails`
2. Pyynnön rungon `disabledGuardrails` (ylätasolla)
3. Pyynnön rungon `metadata.disabledGuardrails` (vain kun `metadata` on objekti)
4. Otsake `x-omniroute-disabled-guardrails`
5. Legacy-otsake `x-disabled-guardrails`

Kaikki viisi kanavaa yhdistetään, molemmat otsakkeet mukaan lukien: sekä
`x-omniroute-disabled-guardrails`- että `x-disabled-guardrails`-otsakkeen lähettäminen
ohittaa niiden listojen unionin, eikä tyhjä nykyaikainen otsake enää peitä
legacy-otsaketta
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), korjattu
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805):ssä).

Arvot voivat olla merkkijonotaulukoita tai pilkuin erotettu merkkijono; nimistä
poistetaan ympäröivät välilyönnit ja ne normalisoidaan pienaakkosiseen
kebab-case-muotoon (`pii_masker` → `pii-masker`), ja tyhjät alkiot hylätään.
Tulos välitetään `context.disabledGuardrails`-kentän kautta rekisterille, joka
ohittaa täsmäävät guardrailit (`skipped: true` `results`-taulukossa).

Poistamislista vaikuttaa vain **rekisteriin**. Prompt-injektion `block`-tila on
pakollinen raja: injektiosuojan middleware
(`src/middleware/promptInjectionGuard.ts`) kutsuu `evaluatePromptInjection()`-funktiota
ilman mitään kutsujan hallitsemaa poistamislistaa (sen aiemmin tekemä kuollut
`resolveDisabledGuardrails({ body })`-kutsu poistettiin
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934):ssä), joten pyyntö,
joka poistaa käytöstä `prompt-injection`-guardrailin, hylätään silti `block`-tilassa.
Tämä on tarkoituksellista. Poistamiskanavat ovat kutsujan hallittavissa (pyynnön
runko, metadata, otsakkeet), eikä kutsujan saa voida kytkeä pois päältä
tietoturvakontrollia, jonka operaattori on asettanut
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
[#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412):n otsakeunioni
muuttaa vain sitä, mitkä rekisterin guardrailit ohitetaan; se ei anna asiakkaan
ohittaa middlewareä. Pakollisia avain- ja ryhmäkohtaisia guardrail-käytäntöjä
seurataan v4-RFC:ssä [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Katso [Kattavuus ja rajoitukset](#coverage-and-limits).

## Suoritusjärjestys

Jokaiselle pyynnölle, joka virtaa tiedostojen `src/sse/handlers/chat.ts` ja
`open-sse/handlers/chatCore.ts` kautta (chat-perheen reitit on lueteltu kohdassa
[Kattavuus ja rajoitukset](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` rakentaa ohituslistan API-avaimen, pyynnön
   rungon ja otsikoiden perusteella.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` suorittaa suojaukset
   nousevassa prioriteettijärjestyksessä:
   - Käytöstä poistetut suojaukset kirjataan tilaksi `skipped`.
   - Kunkin suojauksen `preCall` voi kirjoittaa hyötykuorman uudelleen
     `modifiedPayload`-kentän kautta.
   - Ensimmäinen `block: true` katkaisee ketjun, ja käsittelijä palauttaa
     suojauksen hylkäysvastauksen.
3. (Mahdollisesti uudelleenkirjoitettu) hyötykuorma siirtyy combo-reititykseen
   ja välitykseen upstream-palvelulle.
4. **Vain ei-striimattavat:** kun vastaus on koottu,
   `guardrailRegistry.runPostCallHooks(...)` suorittaa saman ketjun
   vastaukselle. Tässä `block: true` hylkää upstream-vastauksen ja palauttaa
   HTTP 400:n. Striimatut vastaukset ohittavat tämän vaiheen kokonaan.

Poikkeuksen heittävät suojaukset kirjataan muodossa `error: <message>` ja
lokitetaan `logger.warn`-kutsulla, mutta ketju jatkuu — fail-open on
tarkoituksellinen suunnitteluvalinta.

## Kattavuus ja rajoitukset

Suojausrekisteri on kytketty vain chat-putkeen. Nämä rajoitukset on lukittu
testeissä `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` ja
`tests/unit/guardrail-pipeline-characterization.test.ts`; päivitä kyseiset
testit harkitusti, kun toiminta muuttuu.

### Missä koukut suoritetaan

| Koukku / ohjaus                     | Missä se suoritetaan                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | `handleChat`-funktion (`src/sse/handlers/chat.ts`) käsittelemät pyynnöt: `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (ja `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` sekä Telegram-chat-välityspalvelu. Lisäksi hallintapaneelin testipäätepiste `/api/guardrails/test`. Pre-call-esto palauttaa HTTP 400:n. |
| `runPostCallHooks`                  | Vain **ei-striimattavat** chat-vastaukset (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Striimatut vastaukset eivät koskaan saavuta sitä.                                                                                                                                                                                                                                                                                                  |
| Striimaava PII                      | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), putkitettuna tiedostossa `streamingPipeline.ts`, kun `PII_RESPONSE_SANITIZATION` on käytössä. Se ei ole suojaus, joten käytöstäpoistokanavat eivät vaikuta siihen.                                                                                                                                                                                                                     |
| Injection-guard-middleware (legacy) | Jokainen kehotetta sisältävä `/v1`-reitti, chat-perhe mukaan lukien (ks. [reittikattavuus](#injection-guard-route-coverage--red-team-phase-8--block-d)). Vain kehoteinjektio.                                                                                                                                                                                                                                                                        |

### Mitä ei ole katettu

- **Media-, embeddings- ja datareitit** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) eivät koskaan saavuta
  rekisteriä. Niissä ei suoriteta PII-maskausta, tunnistetietojen maskausta
  tai modality bridge -toimintoa. Niiden ainoa tarkistus on
  legacy-injection-guard-middleware.
- **Striimatut vastaukset** eivät saa post-call-suojauksia: ei `pii-masker`-
  tai `credential-masker`-post-call-suojausta eikä post-call-estoa. Vain
  striimaava PII-muunnos pätee (kun `PII_RESPONSE_SANITIZATION` on käytössä).
  Striimatussa vastauksessa takaisin toistuvaa tunnistetietoa ei peitetä.
- **Käytöstäpoistokanavat vs. middleware (suunniteltu näin):** middleware
  arvioi kehoteinjektion omalla `evaluatePromptInjection()`-kutsullaan
  välittämättä mitään kutsujan hallitsemaa poistolistaa. `block`-tila on
  pakollinen raja, jota kutsujan hallitsemat käytöstäpoistot eivät voi ohittaa,
  myöskään chat-perheen reiteillä
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
  `prompt-injection`-suojauksen poistaminen käytöstä ohittaa vain rekisterin
  suojauksen.

### Mikä näkee vastauksen ennen post-call-vaihetta

Ei-striimattavalla polulla järjestys on: muistin poiminta → sisäänrakennettujen
työkalujen suoritus → post-call-suojaukset → post-call-estosta poistuminen →
tallennus semanttiseen välimuistiin.

- **Muistin poiminta** ja **työkalujen suoritus** näkevät vastauksen ennen
  kuin pyynnön jälkeiset suojaukset voivat kirjoittaa sen uudelleen tai
  estää sen. Muutoksen
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) jälkeen
  muistin poiminta ajaa poimitun tekstin `sanitizePII`-funktion läpi, kun
  `PII_RESPONSE_SANITIZATION` on käytössä (sekä streamatessa että ilman
  streamausta), mutta vastaus, jonka pyynnön jälkeinen käsittely myöhemmin
  estää, on silti jo tarjottu muistille ja työkaluille.
- **Semanttinen välimuisti** tallentaa vastauksen pyynnön jälkeisen
  käsittelyn jälkeen, joten se tallentaa uudelleenkirjoitetun vastauksen,
  eikä estettyä vastausta koskaan välimuistiteta. Välimuistimerkintöjen
  avaimet ovat API-avainkohtaisia.

## Määritys

Sisäänrakennettujen suojausten lukemat ympäristömuuttujat:

| Muuttuja                              | Komponentti                | Vaikutus                                                                                                      |
| ------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Arvo `false` poistaa tunnistuksen kokonaan käytöstä.                                                          |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Injektiokäytäntö: `warn`, `block` tai `log`. Vanhentunut arvo `redact` ei kirjoita injektiotekstiä uudelleen. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Injektiosuojan tila; myös tietokannan ominaisuuslippu, joka **ohittaa** ympäristömuuttujat (DB > ENV).        |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Pienin vakavuustaso, jonka `MODE=block` hylkää: `high` (oletus), `medium` tai `low`.                          |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Vanhentunut alias muuttujalle `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                              |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Kun arvo on `true`, pyynnön PII-tiedot peitetään (riippumatta injektiotilasta).                               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (alavirrassa) | Ohjaa vastauspuolen peittotoiminnon käyttäytymistä.                                                           |

Modality Bridge -suojaukset lukevat ajonaikaiset asetukset tietokantapohjaisesta
asetusvarastosta (`getSettings()`), eivät ympäristömuuttujista. Visionin
ensisijaiset avaimet ovat `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` ja `modalityBridgeCacheMaxEntries`. Vanhentuneet
`visionBridge*`-avaimet hyväksytään vain dokumentoituna, yhden syklin kestävänä
lukemisen varamekanismina; hallintapaneelin kirjoitukset käyttävät
ensisijaisia avaimia. Oletusarvot ja vararatkaisija sijaitsevat tiedostossa
`src/shared/constants/modalityBridgeDefaults.ts`, ja vanhentuneet vakiot on
säilytetty tiedostossa `src/shared/constants/visionBridgeDefaults.ts`.

Audio käyttää avaimia `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` ja `modalityBridgeAudioMaxClips` sekä yhteisiä
`modalityBridgeCache*`-asetuksia. Audiolla ei ole vanhentuneiden avainten
varamekanismia, koska nämä avaimet otettiin käyttöön Modality Bridge -skeeman
yhteydessä.

Video käyttää avaimia `modalityBridgeVideoEnabled`,
`modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` ja `modalityBridgeVideoTimeout` sekä yhteisiä
`modalityBridgeCache*`-asetuksia. Se on oletusarvoisesti pois käytöstä, koska
FFmpeg/ffprobe ovat valinnaisia käyttöriippuvuuksia ja ruutujen kuvausten
luonti lisää viivettä ja mallikustannuksia.

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

## Injektiosuojauksen reittikattavuus ja red team (vaihe 8 · lohko D)

Injektiosuojaus (`createInjectionGuard` / `withInjectionGuard`) kattaa kaikki reitit,
jotka hyväksyvät käyttäjän kehotteita. Se noudattaa `INJECTION_GUARD_MODE`-asetusta
(oletus `warn` = vain lokiin; `block` = palauttaa HTTP 400 `SECURITY_001`).

| Tyyppi            | Reitit                                                                                                                                               | Oletustila |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Teksti (olemassa) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn       |
| Generatiivinen    | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn       |
| Data              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn       |

Tekstin purku (`extractMessageContents`) kattaa kentät `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red team (yöajossa, `nightly-llm-security.yml`):** promptfoo vahvistaa, että jokainen
reitti estää OWASP-LLM-korpuksen tilassa `INJECTION_GUARD_MODE=block`; garak ajaa
koettimia (ohittuu ilman salaisuutta). `moderations` on mukana johdonmukaisuuden vuoksi.
Block-tila on pakollinen raja: `evaluatePromptInjection()` ohittaa middlewaren sille
välittämän pyyntökohtaisen poistolistaksi, joten `disabledGuardrails` **ei** vapauta
reittiä siitä ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Yöajossa suoritettavassa työnkulussa (`.github/workflows/nightly-llm-security.yml`, cron +
manuaalinen käynnistys) on kaksi työtä:

- **`promptfoo-guard` (estävä)** — ajaa komennon `promptfoo eval -c promptfooconfig.yaml`
  asetuksella `INJECTION_GUARD_MODE=block`. Jokainen adversariaalinen tapaus (esim. "ignore all
  previous instructions…", DAN-tyyliset jailbreakit) varmistaa, että vastauksessa on
  `error.code === "SECURITY_001"`, eli suojaus todella hylkäsi pyynnön.
- **`garak` (neuvoa-antava)** — ajaa garak-työkalun `--probes promptinject,dan,leakreplay`
  paikallista OmniRoute-instanssia vastaan (`http://localhost:20128/v1`). Ehdollinen
  palveluntarjoajan salaisuuteen (`PROMPTFOO_PROVIDER_KEY`); ohittuu hallitusti ja sen
  perässä on `|| true`, joten se raportoi kaatamatta CI:tä.

Suojausapimen (`createInjectionGuard` / `withInjectionGuard`) kattavuus ulottuu jokaiseen
kehotetta käsittelevään `/v1`-reittiin; kehoteteksti poimitaan kentistä
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` funktiolla
`extractMessageContents()` tiedostossa `src/shared/utils/inputSanitizer.ts`.
