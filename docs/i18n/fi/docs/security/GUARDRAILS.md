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

## Sisäänrakennetut guardrailit

Rekisteri lataa automaattisesti kuusi guardrailia prioriteettijärjestyksessä
tuonnin yhteydessä (ks. `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteetti | Nimi                | Vaihe(et)      | Tiedosto              |
| ------------ | ------------------- | -------------- | --------------------- |
| `5`          | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`          | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`          | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`         | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`         | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`         | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Pienemmät prioriteettinumerot suoritetaan **ensin**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 -perusmallilla ja `glm-5.3-{low,high,max}`-malleilla on eksplisiittinen
`supportsVision:false` -metatieto rekisterissä ja spesifikaatiossa. GLM 5.3
Flash -variantit ovat edelleen natiiveja visiomalleja. Claude Coden
`/v1/messages` -reitti saapuu jaettuun `handleChat`-funktion
pre-call-guardrail-ketjuun **ennen** Claude–OpenAI-käännöstä; `Read`-työkalun
tuloksiin sisäkkäin sijoitetut kuvat on kuvattava tai käsiteltävä ennen kuin
kyseinen käännös nostaa ne OpenAI:n `image_url`-sisällöksi (#17069).

Sieppaa kuvia sisältävät pyynnöt, jotka on suunnattu **malleille ilman
visiotukea**, ja joko ohjaa koko pyynnön uudelleen visiota tukevalle mallille
tai korvaa kuvaosat konfiguroitavan visiomallin tuottamilla tekstikuvauksilla
ennen ylävirran kutsua. Näin pelkkää tekstiä käsittelevät tarjoajat voivat
läpinäkyvästi käsitellä multimodaalisia hyötykuormia.

Toiminta:

1. Ohita, jos kohdemalli tukee jo visiota (ellei se esiinny pakotetun siltauksen
   listalla `isVisionBridgeForcedModel`).
2. Poimi kuvaosat funktiolla `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), joka delegoi **yhtenäiselle mediatunnistimelle**
   `detectMediaParts()` tiedostossa `open-sse/utils/mediaParts.ts` — ainoalle
   totuuden lähteelle, joka on jaettu combo-yhteensopivuussuodattimen kanssa.
   Poiminta on sallittujen listalla vain niille muodoille, jotka
   `replaceImageParts` pystyy liittämään takaisin (extract↔replace-sopimus):
   OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` ja Responses API `input_image`. Täsmäävät kuvat, jotka
   ovat sisäkkäin Claude Coden `tool_result.content`-kentän ja
   Responses-työkalujen tulosteiden sisällä, poimitaan ja korvataan myös
   alkuperäisillä poluillaan; pelkät indikaattorimuodot ovat
   combo-suodattimen aineistoa, eikä niitä poimita.
   Ohita, jos mitään ei löydy.
3. Ratkaise ajonaikainen konfiguraatio funktiolla
   `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): uudet
   `modalityBridge*`-asetusavaimet voittavat; vanhentuneet
   `visionBridge*`-avaimet pysyvät **yhden syklin vararatkaisuna**
   (rollback-ikkuna). Ohita ennen kaikkea medialäpikäyntiä, kun silta on
   poistettu käytöstä.
4. Tilavalitsin (`modalityBridgeVisionMode`, ks. alla oleva taulukko) päättää
   uudelleenohjauksen ja kuvaamisen välillä. Uudelleenohjaus palauttaa
   `modifiedPayload`-olion, jossa vain `model` on vaihdettu, sekä metatiedot
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Kuvauspolku: rajoita kuvien määrä arvoon `maxImages`, muodosta
   tehtävätietoinen kehote, tarkista kuvausten välimuisti, kutsu visiomallia
   **rinnakkain** (`Promise.allSettled`) ja aseta kuvien paikalle
   `[Image N]: <description>` -tekstiosat. Epäonnistunut kuvaus tuottaa
   `null`-arvon: alkuperäinen kuva säilytetään tuntemattomille tai visiota
   tukeville kohteille (#4012), mutta **vahvistettu pelkän tekstin suora
   kohde** tai täysin visioton combo saa eksplisiittisen
   `(unavailable — no vision-capable provider connected)` -tekstipaikkamerkin
   jokaiselle kuvaamattomalle kuvalle — mukaan lukien osittaiset
   epäonnistumiset ja kuvauskutsun enimmäismäärän ylittävät kuvat (#17069).
   Olemassa oleva vararatkaisu tilanteeseen, jossa kaikki combo-kuvaukset
   epäonnistuvat, pysyy voimassa (#8430).
6. Palauta `modifiedPayload` + metatiedot (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Tilavalitsin (`modalityBridgeVisionMode`)

| Tila       | Oletus | Toiminta                                                                                                                                                                                                                                                                                                                                               |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔      | Peritty heuristiikka, muuttumaton (#6640/#7204): ei-yhdistelmä-/`auto/`-mallit ohjataan uudelleen parhaaseen visiomalliin, ellei alkuperäisellä mallilla ole jo käyttökelpoisia tunnistetietoja (jolloin kuvataan); yhdistelmäkohteet kuvaavat aina.                                                                                                   |
| `describe` |        | Kuvaa aina — uudelleenohjauslohko ohitetaan kokonaan; käyttäjän valitsema malli vastaa aina.                                                                                                                                                                                                                                                           |
| `reroute`  |        | Pakota uudelleenohjaus: tunnistetiedoilla varustetun mallin säilyttävä suojaus ohitetaan. Uudelleenohjauksen **kohteen** tunnistetietosuojaus on edelleen voimassa — kun käyttökelpoista visiokohdetta ei ole, silta estää pyynnön selkeällä virheellä sen sijaan, että se kuvaisi tai lähettäisi raakoja kuvia vain tekstiä käsittelevälle kohteelle. |

Pakotetut tilat oikosevat **ennen** kuin auto-heuristiikka suoritetaan; `auto`-tilan
toiminta on tavuittain identtinen PR-1:tä edeltävän suojauksen kanssa.

#### API-avaimen laajuus (`visionBridgeKeyScope.ts`)

Kun kutsujan API-avain rajoittaa yhteyksiä (`allowedConnections`), kiintiöpooleja
(`allowedQuotas`) tai malleja (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), silta valitsee vain
sellaiset uudelleenohjaus- ja kuvausmallit, joita avain saa käyttää, ja sellaisilla
yhteyksillä, joita avain saa käyttää. Kuvauskutsu kulkee sitten aina OmniRouten
itse-silmukan kautta `x-omniroute-self-loop-key-id`-otsakkeen kanssa, joten
vastaanottava chat-pyyntö valvoo kyseisen avaimen yhteys- ja mallikäytäntöä
uudelleen. `enforceApiKeyPolicy()` kunnioittaa tuota otsaketta vain yhdessä
itse-silmukan bearer-tunnisteen kanssa, joten se voi ainoastaan kaventaa pääsyä,
ja tunniste, jota ei ratkaista, hylätään.

Jos avaimelle ei ole sallittu yhtään visiomallia, **vahvistettu vain tekstiä
käsittelevä kohde** hylkää kuvapyynnön paikallisesti selkeällä HTTP 400 -virheellä
sen sijaan, että se välittäisi kuvatavuja kyvyttömälle ylävirralle (#17069).
Kohteilla, joiden visiokyky on tuntematon tai natiivi, kuvauspolku säilyttää
aiemman fail-open-käytöksensä (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Pyynnöt ilman avainta sekä avaimet ilman näitä rajoituksia toimivat täsmälleen
kuten ennenkin.

#### Tehtävätietoinen kuvauskehoite (`modalityBridgeVisionTaskAware`)

Oletus **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) liittää
**viimeisimmän käyttäjäviestin** tekstin (katkaistuna 500 merkkiin)
peruskuvauskehoitteeseen, ohjaten kuvausta siihen, mitä käyttäjä todella kysyi
(codex-vision-proxy-mallia seuraten), ja pyytäen visiomallia litteroimaan näkyvän
tekstin. Kun lippu on pois päältä — tai käyttäjän tekstiä ei ole — peruskehotetta
käytetään muuttumattomana.

Kuvauksen itse-silmukan oma OpenAI-yhteensopiva pyyntö (`callVisionModelSingle()`
tiedostossa `visionBridgeHelpers.ts`) pyytää aina `image_url.detail: "high"` —
ehdottomasti, jokaiselle kutsujalle/tarjoajalle, eikä sitä ehdollisteta
mihinkään asiakassignaaliin. Matalan tarkkuuden näytteistys heikentää
OCR-tarkkuutta juuri tässä kehoitteen pyytämässä tekstin litterointitehtävässä,
joten kuvauskutsu itsessään pyytää aina korkeaa tarkkuutta riippumatta siitä, mitä
tarkkuustasoa alkuperäinen saapuva pyyntö käytti. Tämä vaikuttaa vain sisäisen
kuvauspyynnön runkoon; se ei muuta sitä, miten OmniRoute välittää kutsujan oman
`image_url.detail`-arvon ensisijaisessa pyynnössä — kyseinen oletus otetaan
käyttöön erikseen, ja vain havaituille OpenCode-asiakkaille, funktiossa
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Kuvauksen itse-silmukan Anthropic-lankamuotohaarassa ei ole `detail`-kenttää,
eivätkä kummatkaan oletukset vaikuta siihen.

#### Kuvaustulosteen katto (`modalityBridgeVisionMaxChars`)

| Avain                          | Oletus | Alue              |
| ------------------------------ | ------ | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` tai 100–50000 |

`0` (oletus) tarkoittaa **ei kattoa** — `callVisionModel()`-funktion palauttama
kuvaus välitetään muuttumattomana, mikä säilyttää nykyisen toiminnan. Mikä
tahansa arvo välillä 100–50000 katkaisee kuvauksen `…`-jälkiliitteellä ennen kuin
se liitetään takaisin muodossa `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` tiedostossa `src/lib/guardrails/visionBridge.ts`).
Nosta arvoa yksityiskohtaisissa OCR-tehtävissä, joissa alavirran malli tarvitsee
koko litteroinnin; laske sitä rajoittaaksesi tokenien käyttöä puheliailla
visiomalleilla. Kojelaudan kenttä sijaitsee Vision-välilehden Advanced-paneelissa
(`modality-bridge-max-chars` tiedostossa `ModalityBridgeVisionTab.tsx`) ja nostaa
kaikki välillä 1–99 olevat arvot ylös 100:n alarajaan jättäen eksplisiittisen
`0`-arvon koskemattomaksi — `0` on sinänsä kelvollinen Zod-arvo
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ei pelkkä
"asettamaton" oletus.

#### Kuvausvälimuisti (`modalityBridge/bridgeCache.ts`)

Muistinvarainen LRU + TTL -välimuisti kuvaustulosteille, jaettu koko prosessin
laajuisesti. Avain = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
pituusetuliitteisellä kehystyksellä (ei kenttärajojen törmäyksiä).
Mallikomponentti on **määritetty** siltamalli, ei se malli, joka todella vastasi
— `callVisionModel` saattaa sisäisesti siirtyä varalle, ja avainten muodostaminen
yrityskohtaisesti pirstoisi välimuistin. Epäonnistuneita kuvauksia ei koskaan
tallenneta välimuistiin. Asetukset:

| Avain                           | Oletus | Alue    |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Etäkuvan normalisointi (self-loop describe/base64 -haku)

Kun silta hakee **etä**kuvan itse — Anthropicin describe-itseksutsu ja claude-wire-muodon base64-muunnos (`ensureBase64ImagesForClaudeWire`), molemmat `fetchRemoteImageAsDataUri()`-funktion kautta tiedostossa `visionBridgeHelpers.ts` — syntyvä data-URI ohjataan `normalizeDataUri()`-funktion läpi (`open-sse/utils/imageNormalize.ts`) ennen kuin se upotetaan vision-mallin pyyntöön. Ylisuuret kuvat pienennetään **2048 px:n pitkälle reunalle** (vastaten kokorajaa, jota OpenAI/Anthropic jo soveltavat palvelinpuolella), mikä vähentää lähetettävien tavujen määrää/viivettä muuttamatta sitä, mitä vision-malli näkee. Koon muuttaminen käyttää `sharp`-kirjastoa, joka ladataan dynaamisella importilla: alustalla, jossa sen natiivibinaarin lataus epäonnistuu, `normalizeDataUri()` **ei koskaan heitä poikkeusta** — se palaa alkuperäisten tavujen läpivientiin, joten describe/base64-muunnospolku toimii aina. Muut kuin kuvatavatut (haku, joka ei palauttanut dekoodattavaa kuvaa) ohitetaan myös koskemattomina. Tämä normalisointi kohdistuu vain kuviin, jotka silta hakee omaa itsekutsuaan varten — sitä ei koskaan sovelleta kutsujan raakaläpivientihyötykuormaan, johdonmukaisesti opt-in-only-muutosperiaatteen (Hard Rule #20) kanssa.

#### Asetusskeema + migraatio

Uudet `modalityBridge*`-avaimet Zod-validoidaan kohteessa `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*`-kolmikko ja Audio Bridgen käyttämä `modalityBridgeAudio*`-ryhmä. Migraatio `141_modality_bridge_settings.sql` kopioi olemassa olevat vanhat `visionBridge*`-arvot vastaaviin uusiin avaimiin (idemponentti, ei koskaan korvaa operaattorin asettamaa `modalityBridge*`-arvoa); vanhat avaimet hyväksytään edelleen lukuvaramenettelynä yhden julkaisujakson ajan.

#### Läpinäkyvyysotsikko + tilastot

Describe-muunnetut vastaukset sisältävät otsikon `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (jonka rakentaa `buildModalityBridgeHeader()` tiedostossa `modalityBridge/bridgeStats.ts` ja leimaa `withModalityBridgeHeader()` tiedostossa `src/sse/handlers/chatHelpers.ts`). Uudelleenreititetyt pyynnöt eivät saa otsikkoa **ollenkaan** — hyötykuorma pysyi koskemattomana ja mallin vaihto näkyy jo vastauksen rungon `model`-kentässä.

`GET /api/modality-bridge/stats` (hallintatodennus, sama taso kuin `GET /api/settings`) palauttaa muistissa pidettävät modaliteettikohtaiset laskurit `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` modaliteeteille `vision`, `audio` ja `video`. `averageLatencyMs` käyttää jakajanaan `latencySamples`-arvoa, ei kaikkia yrityksiä; operaatio ilman ajoitusta ei keksi nollamillisekunnin näytettä. `bridged` säilyy taaksepäin yhteensopivana aliaksena onnistuneille muunnoksille; epäonnistuneet yritykset eivät kasvata sitä. Laskurit nollautuvat prosessin uudelleenkäynnistyksessä suunnitellusti (telemetriaa, ei kirjanpitoa).

#### Koontinäytön määritys

Oma koontinäyttösivu on `/dashboard/settings/modality-bridge`. Sen URL-osoitettavat `Vision`-, `Audio`- ja `Video`-välilehdet säilyttävät kyselyparametrit `tab`-arvoa vaihdettaessa. Vision-välilehti tarjoaa käyttöönoton, tilan, mallin valinnan (mukaan lukien automaattinen oletus), tehtävätietoisen kehotuksen, lisäasetusten aikakatkaisu-/kuva-/kuvauspituus-/välimuistirajat, ajonaikaiset laskurit ja suojatun esimerkkipyynnön. Audio-välilehti on myös käytössä: se tarjoaa käyttöönoton, pelkälle STT:lle rajoittuvan mallinvalitsimen Auto-asennolla, aikakatkaisu-/maksimiklippirajat, äänilaskurit ja `input_audio`-esimerkkitestin. Video-välilehti on toiminnallinen: se raportoi FFmpeg/ffprobe-ajonaikaisen tilan — yhden neljästä eksplisiittisestä käyttöliittymätilasta (`unknown` kun testaus on käynnissä tai ei valmistunut, `restricted` muulla kuin loopback-koontinäyttöisännällä, jossa testaus ohitetaan asiakaspuolella, `unavailable` kun testaus on tehty ja puuttuminen vahvistettu, tai `available` FFmpeg/ffprobe-versioiden kanssa) — säilyttää käyttöönotto-/malli-/kehys-/video-/aikakatkaisurajat, suodattaa mallinvalitsimen vision-kelpoisiin malleihin ja näyttää videolaskurit.

AI-asetusten alla oleva entinen Vision Bridge -kortti on yhteensopivuuslinkki uudelle sivulle; se ei enää omista lomakkeen toista kopiota. Media Providers linkittää myös Image-to-Text- ja Speech-to-Text-työnkulut vastaaviin Modality Bridge -välilehtiin poistamatta olemassa olevaa Speech-to-Text-leikkikenttää.

**Self-loop-sisäänpääsyn ohitus:** kun describe-kutsu reitittyy OmniRouten oman `/v1`-self-loopin kautta (ei-standardi palveluntarjoajamalli), alipyyntö lähettää `x-omniroute-admission-bypass: internal` -otsikon ja todennetaan ratkaistulla self-loop-tunnisteella — paikallisella `sk_omniroute`-sentinelillä paikallistilassa tai operaattorin määrittämällä `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` -ympäristöavaimella (#1350), jotta `REQUIRE_API_KEY=true`-käyttöönotot voivat edelleen ajaa describe-kutsun. Ohitus hyväksytään vain näille tarkoille tunnisteille, joten ulkoiset asiakkaat eivät voi käyttää otsikkoa sisäänpääsyn ohittamiseen.

Vanhat oletukset sijaitsevat tiedostossa `src/shared/constants/visionBridgeDefaults.ts`; uudet tila-/tehtävätietoisuus-/välimuistioletukset ja asetusten ratkaisija sijaitsevat tiedostossa `src/shared/constants/modalityBridgeDefaults.ts`. Guardrail tarjoaa `deps`-konstruktorioption, jotta testit voivat injektoida valeset `getSettings`- ja `callVisionModel`-toteutukset.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Nappaa ääntä sisältävät keskustelupyynnöt ennen kuin ne saavuttavat kohteen, jonka ei tiedetä hyväksyvän äänisyötettä. Se ei koskaan reititä keskustelupyyntöä uudelleen: ääniosat litteroidaan olemassa olevan OpenAI-yhteensopivan multipart-päätepisteen kautta ja valittu keskustelumalli jatkaa tekstilitteraateilla.

Kulku:

1. Ratkaise `supportsAudio` funktion `getResolvedModelCapabilities()` kautta. Eksplisiittinen
   provider-registry-metatieto voittaa, sitten staattinen mallin metatieto, sitten synkronoitu
   `modalities_input`. Ilmoitettu syötelista ilman `audio`-arvoa on `false`; puuttuva
   kykyjen näyttö jää arvoksi `null`. Sekä `false` että `null` aktivoivat
   konservatiivisen sillan, kun taas `true` ohittaa sen.
2. Ratkaise `modalityBridgeAudio*`-asetukset ja erota liitettävissä olevat ylätason
   ääniosat jokaisesta viestistä jaetun `detectMediaParts()`-tunnistimen avulla.
   Tuetut liittymämuodot ovat OpenAI:n `input_audio`, `audio_url` ja
   `source.media_type: "audio/*"`. Sisäkkäinen ääni tunnistetaan reititystä varten, mutta
   erotuspolku ei poista sitä. Työ on rajattu asetuksella `modalityBridgeAudioMaxClips`;
   myöhemmät osat jäävät koskemattomiksi.
3. Noudata määritettyä `provider/model`-arvoa tai anna `selectAudioBridgeModel()`-funktion käydä
   läpi `AUDIO_TRANSCRIPTION_PROVIDERS` vakaassa katalogijärjestyksessä ja valita ensimmäinen
   malli, jolla on käyttökelpoinen aktiivinen provider-tunnus.
4. `callAudioTranscription()` muuntaa base64/data-URI-äänen multipart-`file`-muotoon
   tai lataa etäosoitteen `audio_url` vain julkisiin osoitteisiin rajoittuvan lähtevän
   suojauksen kautta DNS-kiinnityksellä ja 25 MB:n rajalla. Se lähettää sitten tiedoston ja valitun
   mallin POST-pyynnönä paikalliseen `/v1/audio/transcriptions`-itsepaluusilmukkaan, autentikoiden
   funktiolla `resolveSelfLoopBearer()`. Olemassa oleva transkriptioreitti suorittaa normaalin
   tunnusten haun, cooldown-/rate-limit-käsittelyn ja provider-lähetyksen.
5. Onnistuneet kutsut korvaavat osansa muodolla `[Audio N]: <transcript>`. Kutsut
   suoritetaan `Promise.allSettled`-menetelmällä: yksittäinen virhe säilyttää kyseisen alkuperäisen
   ääniosan (#4012-sopimus). Jos jokainen kutsu epäonnistuu ja kohde on todistettavasti
   `supportsAudio === false`, osat muuttuvat muotoon
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-sopimus). Jos kohde
   on tuntematon (`null`), täysin epäonnistunut tulos jää koskemattomaksi. Todistetusti
   vain tekstiä tukeva kohde ilman käyttökelpoista STT-tunnusta saa saman eksplisiittisen
   paikkamerkin ilman verkkopyyntöä.

Onnistuneet transkriptiot käyttävät prosessinlaajuista Modality Bridge LRU/TTL -välimuistia. Avain
yhdistää ääniviittauksen, vakaan `audio-transcription`-operaatiotunnisteen ja valitun
STT-mallin; virheitä ei koskaan välimuistiteta. Ääniyritykset päivittävät
jaetut laskurit `bridged`, `cacheHits`, `failures` ja `lastUsedAt`.
Muunnetut vastaukset sisältävät otsikon
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; koskemattomat
pyynnöt eivät saa Audio Bridge -segmenttiä.

Ajonaikaiset asetukset ovat tietokannassa säilytettäviä ja Zod-validoituja:

| Avain                         | Oletus  | Rajat               |
| ----------------------------- | ------- | ------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                   |
| `modalityBridgeAudioModel`    | `""`    | Auto tai STT-tunnus |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000         |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                |

Jaettua välimuistia ohjaavat edelleen asetukset `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` ja `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Kaappaa huipputason videon osat Chat Completions `messages` ja Responses API `input` ennen kuin kohdetta, jolla ei ole tunnettua alkuperäistä videotukea, kutsutaan. Tuetut muodot ovat `input_video`, `video_url`, `video_source`, HTTPS URLs ja `data:video/*;base64,...` data URIs. Tekstissä olevia tavallisia tiedostonimiä ei käsitellä videona.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) omistaa pyynnön läpikäynnin, capability/policy -tarkistuksen, pyyntökohtaisen koosteen ja vastauksen hyötykuorman. Videokohtainen työ — hankinta, koko tuloksen välimuisti, joka kuvaa kehyssekvenssiä (joka sulattaa minkä tahansa soittajan ilmoittaman äänitranskription) ja yrityskohtainen metrics/abort/cleanup — on piilotettu `processVideoPart` taakse `videoBridgePipeline.ts`, jota kutsutaan kerran `preCall`:n silmukan sisällä olevaa videoosaa kohden. Tämä moduuli määrittää myös eksplisiittiset porttirajat `VideoMediaBrokerPort` (tavujen hankinta ja näytteistettyjen kehysten poimiminen), `VideoAudioTranscriptionPort` (soittajan ilmoittaman äänitranskription yhdistäminen näytteistettyjen kuvatekstien kanssa) ja `VideoDrilldownPort` (vanha raaka-myymälämuoto). Tuotanto STT ja rungon säilytys muodostuvat kuvaavan portin ympärille `createVideoSttAdapter` ja `createVideoDrilldownAdapter` kautta; jälkimmäinen käyttää jaettua läpinäkymättömän kahvan elinkaarta.

Julkinen `/v1` -pyyntöpolku ei koskaan tuo tai kutsu aliprosessia. Etävideot ladataan 50 MiB n rajoituksella; inline base64-videoissa on konservatiivinen 36 MiB dekoodattu videokohtainen yläraja, joten model/messages/framing kirjekuori voi pysyä julkisen JSON pyynnön 50 MiB:n sisäänpääsyrajan sisällä. Inline-pituus ja dekoodatun koon arviot tarkistetaan ennen allokointia. HTTPS vaaditaan alkuperäisessä etä- URL ssa ja jokaisessa uudelleenohjauksessa käyttämällä olemassa olevaa vain julkista lähtevää suojausta DNS kiinnityksellä. Tavut ylittävät sitten tarkan sisäisen `POST /api/modality-bridge/video/extract` välittäjärajan. Tämä reitti on sekä `LOCAL_ONLY` että `SPAWN_CAPABLE`, hyväksyy vain prosessikohtaisen autentikoidun, luotetun silmukan paluupyynnön, eikä koskaan hyväksy URL, tiedostojärjestelmän polkua, suoritettavaa tiedostoa tai argumenttiluetteloa. API -runkokokoinen putkisto ja käsittelijän inkrementaalinen runko-lukija valvovat itsenäisesti 50 MiB välittäjän syöttörajaa. Sen rajattu jono suorittaa yhden purkamisen kerrallaan, sallii neljä odottavaa työtä ja rajoittaa odottavaa syötettä 100 MiB llä.

Välittäjässä `ffprobe` lukee yksityisen paikallisen tiedoston; kiinteän muodon sallittujen luettelo ei sisällä soittolista- ja luettelomuotoja. Sallittujen MOV-perheen säilöjen ulkoiset MOV -tietoviitteet pysyvät oletusarvoisesti poissa käytöstä, eikä kiinteä komento ota niitä käyttöön. Sekä `ffprobe` että `ffmpeg` käyttävät `file` -only -protokollan sallittujen luetteloa, yhtä säiettä, kiinteitä argumenttitaulukoita, ei shelliä ja `PATH` stä ratkaistuja suoritettavia tiedostoja. Liitteenä olevat kansikuvat eivät ole toistettavia ehdokkaita. Kaikkien toistettavien streamien on täytettävä rajat, ja eksplisiittinen oletusvirta on suositeltava ennen determinististä alimman indeksin varoitusta. Videoiden pituus on rajoitettu 600 sekuntiin, 8 192 pikseliä ulottuvuutta kohden ja 33 554 432 lähdepikseliä. FFmpeg ottaa näytteitä 1–16 keskipisteen JPEG kehyksestä, skaalaa pitkän reunan enintään 1 024 pikseliin ilman pienempiä tuloja skaalaamatta, eikä se koskaan vastaanota URL. Näytteenotto on oletuksena `uniform`. Valinnaiset `scene_aware` ja kokeelliset `segment_aware` käytännöt suorittavat yhden kiinteän FFmpeg lisäsiirron jo vahvistetulle paikalliselle virralle, valitsevat rajatut `showinfo` kohtauksen aikaleimat ja palaavat deterministisesti samoihin yhtenäisiin keskipisteisiin ilmaisimen vian, aikakatkaisun, virheellisen lähdön tai tyhjän ehdokasjoukon yhteydessä. Segmenttitietoinen tila allokoi keskipistenäytteet suhteessa vahvistettuihin kohtausväleihin; segmenttitietoinen näyttö ja varakäyttäytyminen on kuvattu alla. Kova 16 kehyksen yläraja on käytössä valinnan jälkeen jokaisessa käytännössä. Kun kohtaustietoisella pyynnöllä on vain yhden ruudun budjetti, se käyttää aktiivisen koko videon tai tarkennusikkunan yhtenäistä keskipistettä ja raportoi `policyEffective: uniform`:n: yksi valittu kohtauskehys ei voi säilyttää molempia ajallisia päitä. Soittaja voi valinnaisesti tarjota rajallisen tarkennusikkunan (`start`/`end` sekuntia); rajat kiinnitetään median kestoon, käänteiset tai ei-äärelliset ikkunat hylätään ja kaikki näytteenottokäytännöt suoritetaan vain normalisoidun aikavälin sisällä. Tuloksena oleva ikkuna sisältyy otannan metatietoihin ja epäluotettavaan kuvausetuliitteeseen, jotta loppupään mallit voivat erottaa kohdistetun otteen koko aikajanasta.

Semanttisen kuvatekstin fokus on erillinen, selkeä asetus. Oletusarvoinen `full` analyysitila säilyttää olemassa olevan kehyskehotteen eikä koskaan välitä pyyntötekstiä kuvatekstimalliin. `focused` tilassa silta lukee vain uusimmat ei-tyhjät käyttäjän kirjoittamat `text`/`input_text` samasta Chat- tai Responses-säiliöstä, normalisoi sen arvoon NFC, tiivistää ohjausmerkit ja välilyönnit ja rajoittaa sen 500 Unicode-koodipisteeseen. Tyhjä tulos palautuu tarkalleen `full` kehotteeseen. Käyttökelpoinen vihje sarjoitetaan JSON ksi erillisessä epäluotettavan käyttäjän kontekstilohkossa, ja se voi priorisoida vain havaittavissa olevia yksityiskohtia; se ei voi ohittaa erillistä varoitusta ohjeiden noudattamisesta, jotka näkyvät tai kuuluvat tiedotusvälineissä. Tekstitarkennus ei koskaan päättele `start`/`end` tai muuta temporaalista näytteenottajaa.

#### FU-07 rakennesegmentin todisteita

`segment_aware` käyttää yhtä rajoitettua esianalyysia jo validoidun paikallisen videovirran yli. Kiinteä suodinketju skaalautuu ensin enintään 320 pikselin leveyteen, havaitsee kohtauksen muutokset ja jäädytetyt intervallit ja ottaa sitten näytteitä 1 ruudulla sekunnissa sumennus-, keskimääräisen luman ja spatial/temporal tietojen saamiseksi. Pääsy on rajoitettu 600 rakennenäytteeseen, yhteen FFmpeg/filter säikeeseen, samaan `file` -only -protokollaan ja säilön sallittuihin luetteloihin, 1 MiB prosessitulostussidontaan ja enintään 30 sekuntiin välittäjän jaetun abort/deadline. n sisällä. Se ei koskaan hyväksy komentoa, suodatinta, polkua tai URL pyyntöä.

Rakennearvot ovat deterministisiä otantatodisteita, eivät semanttista videon ymmärtämistä. Ne eivät päättele aiheita, toimia, kuvatekstejä, puhetta tai käyttäjän tarkoitusta. Kohtauksen ja jäädytyksen rajat muodostavat segmenttejä; pysäytyspeitto, sumennus, valotus, tilayksityiskohdat ja ajallinen muutos vaikuttavat vain siihen, miten nykyinen 1–16 kuvan budjetti kohdistetaan. Täysin jäädytetty segmentti on rajoitettu yhteen kehykseen, kun taas jäädytetyt segmentit kilpailevat jäljellä olevasta budjetista. Kun rajoja on enemmän kuin kehyksiä, yhtenäinen aikajanan kattavuus säilyy, joten nopeat varhaiset leikkaukset eivät voi piilottaa pitkää perässä olevaa segmenttiä. Kohtauksen rajat 1 sekunnin analyysiresoluutiolla jäädytysrajan sisällä yhdistyvät.

Puuttuvat suodattimet, malformed/empty -todisteet, ilmaisinvirhe tai rajoitettu esianalyysin aikakatkaisu epäonnistuvat täsmälleen yhtenäisen keskipistekäytännön mukaisesti. Soittajan keskeytys tai välittäjän määräaika ei epäonnistu: se lopettaa lennon aikana tapahtuvan aliprosessin, estää myöhemmän kehyksen purkamisen ja yksityinen väliaikainen puu poistetaan `finally` ssä.

`scripts/perf/video-bridge-fu07-eval.ts` tuottaa deterministisiä todellisia FFmpeg valaisimia, jotka säästävät tekstityskutsujen jälkeisiä säästöjä, tiheän liikkeen budjetin allokointia, blur/exposure/SI-TI todisteita, nopeita leikkauksia pitkällä hännän kanssa ja asteittaista haalistumista vääriä positiivisia. Se tallentaa esianalyysin seinän ajan ja, jos `/usr/bin/time` on saatavilla, lapsi- CPU ja huippu- RSS. Sen laatutarkastukset ovat vain rakenteellisia oraakkeleita. Todellinen kuvatekstimallin laatu on edelleen `HOLD`, koska tällä valjaalla ei ole valtuutettua päätepistettä tai jäädytettyä tuomaria. Rahasäästöt pysyvät myös `HOLD`, ellei `--caption-cost-per-call-usd` toimita selkeää positiivista puhelukohtaista arviota; käsikirjoitus ei koskaan valmista kumpaakaan tulosta.

Jokainen kehys on rajoitettu arvoon 4 MiB, kaikki raakakehykset yhdessä 23 MiB iin ja sarjoitetun välittäjän vaste 32 MiB hen. Yksityinen väliaikainen hakemisto poistetaan `finally`. OmniRoute ei niputa FFmpeg eikä hyväksy mukautettua suoritettavaa polkua. Ennen tekstitystä silta käyttää konservatiivista visuaalista duplikointia: jokainen JPEG pienennetään 16 × 16 harmaasävypuskuriin ja sitä verrataan vain viimeiseen säilytettyyn kehykseen. Pyydetylle tekstitysbudjetille, joka ylittää yhden kehyksen, poiminta tarjoaa rajoitetun ehdokasjoukon, joka on jopa kaksinkertainen budjettiin verrattuna, mutta ei koskaan enempää kuin 16 kehystä. Pyydettyä ylärajaa sovelletaan vasta päällekkäisyyksien poistamisen jälkeen, ja ensimmäiset ja viimeiset valitut ehdokkaat säilyvät lopullisessa harvennuksessa, kun budjetti on vähintään kaksi. Versioitu `grayscale-16x16-mean-cells-v2` -käytäntö käyttää suurempaa keskimääräistä luma-deltaa ja pikkukuvasolujen suhdetta, joiden normalisoitu delta on vähintään 0,05. Kopiointikynnys on vakio 0,04, joka valitaan ennustettavuuden vuoksi sen sijaan, että se olisi näkyvissä ajonaikaisena asetuksena. Tämä toissijainen korkeakontrastinen signaali säilyttää pienet liikkeet ja näkyvän tekstin muutokset, jotka pelkkä vertailu voi piilottaa. Vertailun tai dekooderin virheet epäonnistuvat ja pitävät peiton. Tulosteen metatiedot erottavat poimitut ehdokkaat, onnistuneesti käytetyt kehykset ja poistetut visuaaliset kaksoiskappaleet.

Eksplisiittisesti merkitty videoosa voi pyytää aikaleimattua yhteystietolomaketta. Silta rakentaa enintään 4-pylväisen, 16-kehyksen JPEG ruudukon. Jokainen 512 pikselin solu polttaa lähteen aikaleiman suuren kontrastin alakaistalle, kun taas samat aikaleimat säilyvät tekstin metadatassa myöhempää yhdistämistä ja tarkastusta varten. Täydellinen JPEG on edelleen rajattu arvoon 32 MiB. Jos `sharp` ei pysty purkamaan tai muodostamaan ruudukkoa, silta palaa yksittäisiin JPEG kehyksiin; asiakkaan keskeytys etenee edelleen taulukkotoiminnon kautta.

Promootiotodistus on tarkoituksella erillään synteettisen koostumuksen mikrovertailuarvosta. `scripts/perf/video-bridge-contact-sheet-eval.ts` määrittelee skeemaversion A/B -valjaat oikeille OpenAI-yhteensopiville näkömalleille. Se mittaa palveluntarjoajan ilmoittamia tunnuksia, päästä päähän seinään ulottuvaa latenssia (mukaan lukien arkin koostumus), mallin puheluiden määrää ja manifestin määrittelemää tosiasian säilyttämistä. Raakamallivastauksia ei kirjoiteta raporttiin; vain SHA-256 tiivistelmät ja täsmäytystieto IDs säilytetään. Valjaat eivät soita verkko- tai maksulliseen malliin, ellei `--execute-real` ole hyväksytty ja `--model`, `OMNIROUTE_BASE_URL` ja `OMNIROUTE_API_KEY` on määritetty. Ilman tätä nimenomaista reaaliajoa sen koneellisesti luettava tuomio pysyy `HOLD`; synteettiset payload/call-count -mittaukset eivät yksin ole edistämistodisteita.

Soittajat voivat liittää valinnaisen `transcript.cues` -ryhmän tuettuun videoosaan, kun heillä on jo kohdistettua tekstiä. Jokaisessa vihjeessä on oltava `text`, rajallinen `start`/`end` -väli koetusajan sisällä ja sallittujen luettelossa oleva `source` (`client`, `embedded` tai `audio-bridge`); `confidence` on oletuksena `1` ja sen on pysyttävä `0` ja `1` välillä. Tarkat päällekkäiset vihjeet tiivistetään. OmniRoute ei koskaan aloita transkriptiota näistä metatiedoista: validoidut vihjeet kopioidaan kuvattuun tulokseen lähteen, luotettavuuden ja aikavälin kanssa, ja ne esitetään epäluotettavina havaintoja kehysten kuvatekstien rinnalla. Virheellinen, alueen ulkopuolella tai alkuperästä vapaa teksti hylätään sen sijaan, että se sekoitetaan kuvatekstivirtaan. Molemmat pyynnön tekstiosan transkriptiokanavat normalisoivat `client` toimitetun alkuperän, mukaan lukien itse vahvistaneet `embedded` tai `audio-bridge` tunnisteet. Vain palvelimen omistama sovitin voi määrittää nämä luotetut tunnisteet vain koodia sisältävän `trustedSource` -argumentin kautta; pyyntö JSON -kenttä ei voi saavuttaa tätä argumenttia. Litteraattiteksti pysyy epäluotettavana mediaperäisenä sisältönä sen alkuperästä riippumatta, eikä se saa koskaan määrittää valtuutusta.

Edistynyt soittaja voi tarjota `audioTranscript` raidan samalle videolle; sitä käsitellään asiakkaan toimittamana tekstinä, ei todisteena palvelimen transkriptiosta. Fuusio-sauma suorittaa visuaalisia ja äänihavaintoja yhden määräajan ja keskeytyssignaalin mukaisesti, tilaa ne yhteiselle aikajanalle, tiivistää tarkat kaksoiskappaleet ja raportoi osittaisen tuloksen, kun vain toinen osapuoli onnistuu. Virheellinen `audioTranscript` muuttuu osittaiseksi tulokseksi — Visuaalinen kuvaus säilytetään ja äänihaara tallentaa puhtaan virhekoodin — koko videon epäonnistumisen sijaan. Haarakohtainen saatavuus, osittainen lippu ja puhtaat vikakoodit säilyvät kuvatussa tuloksessa, suojakaiteen metatiedoissa (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), tulosvälimuistin metatiedoissa ja siltafuusiolaskureissa. Videosillan oletuspolku ei kutsu puheesta tekstiksi tai lataa toista mediakopiota. ilman tätä nimenomaista raitaa se pysyy vain videona.

**Transkription säilyttäminen (#12150 P1).** Tämä pätee automaattisesti aina, kun Video Bridge (itse opt-in) tekee transkriptiomerkinnän — erillistä säilytyslippua ei ole. Kun pyyntö tekee minkä tahansa transkriptiomerkin (soittajan ilmoittaman `transcript` tai sulautetun `audioTranscript`), suojakaide merkitsee sen `videoBridgeObserved` ja tuottaa redaktoidun varjon videokuvauksesta — identtisen renderöinnin, jossa jokaisen vihjeen vapaan tekstin runko korvataan `[redacted-video-transcript]` llä, ennen kuin rakennetaan parannalla kenttään. litistetty teksti, joten mitään vihjeitä sisältö — kilpaileva tai tavallinen, mukaan lukien kappaleet sisältävät `]`, kuten `[inaudible]`/`[music]` — voi selviytyä). Pysyvä puhelulokipyynnön runko vaihtaa jokaisen videosta johdetun tekstiosan kyseiseen redusoituun varjoon, joka vastaa sisällön tasa-arvoa. `fullText` ankkuri luetaan uudelleen valmiista puhelua edeltävästä suojakaiteen hyötykuormasta, joten täsmääminen onnistuu silti, kun myöhemmät ketjusuojakaiteet ( PII ja valtuustietojen maskerit, prioriteetit 10/95) kirjoittavat kuvaustekstin uudelleen paikoilleen ja system-prompt/handoff/memory injektion jälkeen muotoilevat viestiryhmän uudelleen. Malliin vastavirtaan lähetetty runko on muuttumaton. Havaittu pyyntö ei myöskään täytä pysyvää muistia (sekä pyyntö- että vastausperäinen purkaminen ohitetaan), joten mallin oma vastaus ei voi kaikua transkriptiotekstiä muistiin.

**Raakavideokentät (#12430).** Kun silta on käytössä ja natiivivideotuki on tuntematon tai puuttuu, määritetyt `transcript`/`audioTranscript` -kentät aktivoivat myös `videoBridgeObserved`, vaikka kuvaus epäonnistuisi tai `maxVideos` raja olisi asetettu. `null` ja tyhjät merkkijonot laskevat; puuttuvat kentät ja muut kuin videon metatiedot eivät. Säilytetyt kopiot poistavat nämä kentät tai jättävät pyynnön pois, ja caches/Memory ohitetaan.

Näillä varapoluilla kelvollisista soittajan vihjeistä tulee tuettuja `text`/`input_text` -osia ei-standardien tarjoajakenttien sijaan. Molemmat pyynnöstä toimitetut raidat ovat edelleen epäluotettavia `client` havaintoja, ja niissä varoitetaan nimenomaisesti, että videota ei kuvattu eikä aikaleimoja ole tarkistettu mediaa vastaan. Nykyiset 256-cue/64-KiB -kokonais- ja per-cue-budjetit koskevat kaikkia kahta kappaletta yhdessä; aikaleimojen tulee sopia välittäjän 600 sekunnin kattoon ja kaikkiin toimitettuihin tarkennusikkunaan. Virheelliset raidat hylätään, ei välitetä mielivaltaisena tekstinä; kelvollista sisarusta voidaan silti käyttää, ellei heidän yhteisbudjettinsa ylity. Null/empty -kentät eivät lisää tekstiä. Tämä varavaihtoehto ei lisää median hakua tai transkriptiota. Transkriptiolaajennuskentät poistetaan varavideon kantajasta ja sen `video_url`/`source` -objekteista. OpenAI langan sallittu luettelo pysyy tiukkana; Tuntemattomat alkuperäiset videovälittäjät ovat edelleen saatavilla, ja tunnetut tekstikohteet pitävät turvallisia merkkejä. Strukturoidut muokkausvarjot suojaavat liitettyä transkriptiotekstiä, kun taas alkuperäinen soittajan omistama pyyntö pysyy ennallaan. Alkuperäiset tuetut kohteet ja vammaiset sillat säilyttävät nykyisen ohituskäyttäytymisensä.

Säilytetyt lisäkopiot käyttävät samaa havaitun pyynnön signaalia. Raaka esisuojakaiteen asiakaspyynnön tilannevedos, muistissa odottava pyyntö ja aikaisin hylättyjen pyyntöjen loki korvaavat rakenteellisesti transkriptiokentät videon osissa; liukuhihnavaiheiden ja kontekstin vaihdon syntetisoimat merkkijonokehotteet redaktoidaan jatkuvan pyynnön rungon nielussa. Pysyvä `video_content_removed` merkki saa `previous_response_id` jatkoa epäonnistumaan sulkeutumaan sen sijaan, että se rekonstruoisi tarkoituksellisesti hylätyn tekstin. Jos havaittu pyyntö menettää osakohtaisen muokkausvarjon ennen lokiin kirjaamista tai jopa yksi useista videovarjoista ei täsmää myöhempien pyyntömutaatioiden jälkeen, säilytetty pyynnön runko jätetään kokonaan pois sen sijaan, että säilytettäisiin osittain muokattu transkriptio.

Havaitun pyynnön tapauksessa mallivastaus voi lainata mitä tahansa transkription osaa ilman strukturoitua vihjerajaa. Sen pysynyt puhelulokin `responseBody` korvataan siksi laiminlyönnillä; yksityiskohtaista liukuhihnan artefaktia (joka voi sisältää upstream/client kappaleita ja stream-kappaleita) ei säilytetä. Semanttinen, idempotenssi ja päättelyn toistovälimuisti ohittavat tämän pyynnön luku- ja kirjoitustoiminnot. Palveluntarjoajan pyyntö ja asiakkaan näkyvä vastaus pysyvät ennallaan. Varhaiset säilytystavut tyhjennetään väliaikaisesta puskurista, kun yksityiskohtainen artefakti jätetään pois. Kiro:n väärin muotoiltu EventStream varoitus ilmoittaa vain hyötykuorman tavumäärän, ei koskaan sen sisältöä tai JSON -jäsentimen raakavirhettä. Tämä ei väitä, että jokainen asiaankuulumaton provider/plugin -diagnostiikka on auditoitu; laajempaa säilytetyn nielun pyyhkäisyä seurataan #11658 muodossa.

Sisäinen `/api/modality-bridge/video/drilldown` elinkaari on erillinen loopback/token-authenticated välimuistisubstraatti. Jokainen operaatio vaatii myös kanonisen opaakin pääperiaatteen ID. Ennen kuin tuotantokutsuja otetaan käyttöön, sen on johdettava tämä ID todennetulta vuokraajalta, eikä se saa koskaan lähettää eteenpäin asiakkaan valitsemaa arvoa. Välimuistiavaimet sitovat tämän pääasiallisen kanoniseen istuntoon ja videoviittaukseen IDs, tallentavat vain niiden SHA-256-derived avaimet ja kattavat sekä lukemisen että poiston samaan pääasialliseen. Välimuisti tallentaa enintään 16 johdettua JPEG kehystä merkintää kohti, vanhenee ne kymmenen minuutin kuluttua ja tukee rajoitettua `start`/`end` -lukua tai eksplisiittistä istunnon poistamista.

Jokainen pääasiallinen on rajoitettu 16 merkintään ja 64 MiB kanonista JPEG dataa. Nämä rajat ovat riippumattomia maailmanlaajuisesta 64-entry/256 MiB -katosta: päämiehen kiintiöpaine häätää vain kyseisen päämiehen vähiten käyttämät merkinnät ennen kuin globaali LRU häätö otetaan huomioon. Vanhentuneet merkinnät pyyhkäistään sekä pääasiallisesta että yleisestä välimuistitoiminnan kirjanpidosta, kun taas peruutus- ja vahvistusvirheet eivät aiheuta osittaista korvaamista.

Välimuisti hylkää ei-kanonisen Base64:n, ylimääräisen täytön, ei-JPEG-median, virheellisen tai katkaistun JPEGs ja JPEGs, jotka tuottavat varoituksen rajoitetun täyden kuvan `sharp` dekoodauksen aikana. Se koodaa jokaisen hyväksytyn kuvan uudelleen kanoniseksi JPEG ksi, saa leveyden ja korkeuden dekoodatuista tavuista sen sijaan, että luottaisi soittajan kenttiin, ja hylkää kaikki jäljessä olevat polyglottitavut sen sijaan, että säilyttäisi ne. Vain rajoitettu kanoninen pakattu puskuri veloitetaan molemmista kiintiöistä. JSON johtorajoitus sisältää Base64-ylimäärän 32 MiB dekoodatun sisääntulon katolle. Jokainen tallennettu johdannainen tallentaa sen validoidun JPEG format/resolution, näytteenottokäytännön, johtamisversion, luontiajan, palvelimen laskeman sisällön hajautusarvon ja tiivistetyn yläviitteen sekä luotetun soittajan yläsisällön tiivisteen. Peruutus tarkistetaan asynkronisten decode/hash vaiheiden välillä ennen atomivälimuistin sitoutumista.

Tuotantotuottaja käyttää uudelleen jo johdettuja välittäjäkehyksiä vasta onnistuneen visuaalisen analyysin jälkeen ilman toista videota download/extraction. Se vaatii operaattorin `modalityBridgeVideoDrilldownEnabled=true`, tiukat osakohtaiset `drilldown: true` ja todennettu API-avaintietue ID. Asiakkaan ilmoittamat principal/session arvot eivät koskaan muodosta omistusta. Ilman kaikkia kolmea ehtoa se ei hajauta, muuta kokoa tai säilytä lisäkehyksiä. Säilytysvirhe säilyttää käyttökelpoisen visuaalisen vasteen. Hyväksytyt pyynnöt ohittavat koko videon tulosten välimuistin, joten välimuistissa olevia tuloksia ei koskaan toisteta.

Onnistuneet JSON ja SSE -vastaukset paljastavat enintään neljä läpinäkymätöntä kahvaa rajoitetussa `x-omniroute-video-drilldown` otsikossa. Valtuutetut selaimen alkuperät voivat lukea tämän otsikon laajentamatta CORS alkuperäkäytäntöä. Uudet kahvat käyttävät `v1.<32-byte random base64url token>`, ja rekisteri säilyttää vain niiden SHA-256 -tiivisteet. reader/header jäsennin hyväksyy myös vanhat 64-heksadesimaaliset tunnukset. Todennettu julkinen kuluttaja on `GET /api/v1/video-bridge/drilldown?handle=...`, jonka `modalityBridgeVideoDrilldownRemoteEnabled=true` aidattaa itsenäisesti. Eksplisiittinen pysynyt false peruuttaa pääsyn, vaikka vanha `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env -varavaraus on käytössä. Tuotannon säilyttämisellä on analoginen perintö `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` varasääntö. Molemmat varavaihtoehdot ovat oletuksena pois päältä.

Kuluttaja saa omistajuuden todennetusta avaimesta ja soveltaa avainkäytäntöä: sekä GET että DELETE kuuluvat `video` päätepisteluokkaan, mukaan lukien `/v1` ja `/api/v1` -aliakset. Avainten, joiden päätepisteiden sallittu luettelo ei ole tyhjä, on sisällettävä `video`; rajoittamattomat avaimet ovat yhteensopivia. Kuluttaja palauttaa saman 404:n tuntemattomasta, vanhentuneesta ja toisen avaimen kahvoista. Se hyväksyy `variant=preview|standard|detail` (maksimi JPEG mitta 320/640/1280, ei koskaan skaalattu), `limit=1..8` (tai vanha `frames` alias, ei koskaan molempia), nollapohjainen `page` ja valinnainen `start`/`end` tarkennussekunti. Päällekkäiset kyselyavaimet ja käänteiset tarkennusikkunat hylätään. Jokaisella palautetulla versiolla on tiiviste sen todellisesta sisällöstä ja todellisesta resoluution metadatasta, joka on linkitetty säilytettyyn lähteeseen. Variantit johdetaan luettaessa sen sijaan, että niitä tallennettaisiin ylimääräisinä säilytettyinä kopioina. JSON -vaste, mukaan lukien Base64/envelope, on rajoitettu arvoon 32 MiB; ylisuuri sivu palauttaa 413 ja asiakkaan on pyydettävä vähemmän kehyksiä. Lukee tarkistuksen peruutuksen jokaisen koon muutoksen ympäriltä ja tarkistaa kahvan voimassaolon ennen palauttamista. `DELETE` omistajan mukaan on idempotentti; poisto tai TTL expiry vapauttaa säilytetyn lähde- ja käyttökirjanpidon.

Jaettu varasto on prosessipaikallinen: kahvat vanhenevat uudelleenkäynnistyksen yhteydessä, eikä niitä voi siirtää itsenäisten OmniRoute prosessien välillä. Hallintatilastot paljastavat tehokkaan säilytys-/etäkäytännön ja vain säilytetyt entries/bytes, eivät koskaan mediaa, viittauksia, pääasiallisia IDs tai kahvoja. Videoasetukset-paneeli näyttää kyseiset arvot ja voi säilyttää molemmat suostumuskytkimet. Tämä toteutusdokumentaatio ei ole reaaliaikainen käyttöönotto- tai promootiotodistus; todellisen mallin hyväksyntää seurataan erikseen.

Kehykset tekstitetään peräkkäin määritetyn videomallin kanssa. Tyhjä videon ohitus perii Vision-asetuksen; Jos molemmat ovat tyhjiä, Vision-automaattinen reititin valitsee tehokkaan näkökykyisen mallin. Onnistuneet kuvatekstit korvaavat alkuperäisen osan vakaalla `[Video description:` etuliitteellä, joka myös merkitsee tekstin epäluotettavaksi mediapohjaiseksi havainnon ja käskee loppupään malleja olemaan noudattamatta tiedotusvälineistä löytyviä ohjeita. Kehystekstityksen välimuistiavaimet sisältävät JPEG -tavut, kehotteen, aikaleiman ja tehokkaan mallin; vain onnistuneet tekstitykset tallennetaan välimuistiin. Välimuistimerkinnät säilyttävät todellisen onnistuneen tuottajamallin, mukaan lukien varamallin; silta ilmoittaa `mixed` kun eri malleilla valmistettiin erilaisia kehyksiä. Välimuistiosuma käyttää uudelleen tuota tuottajaidentiteettiä sen sijaan, että se nimeäisi sen uudelleen pyydetyksi reitityssuunnitelmaksi. Koko videon tulosten välimuisti on näppäilty jokaiseen tuloon, joka muuttaa tulosteen — -kehotetta, tehokasta mallia, näytteenottokäytäntöä, kehysten määrää, semanttista analyysitilaa, normalisoidun tarkennusvihjeen SHA-256 sormenjälkeä, tarkennusikkunaa, `transcript`, `audioTranscript` ja yhteystietoarkin lippua —, joten näiden mittojen muuttaminen ei ole koskaan välimuistin väärinkäyttöä. Visuaalinen dedup-käytännön versio, kynnys ja rajattu ehdokaskehysten määrä ovat myös eksplisiittisiä tulosvälimuistiavaimessa ja metatiedoissa. Käytännön muutos ei siis voi käyttää vanhentunutta koko videon kuvausta uudelleen. Result-cache v4 metadata säilyttää tilan ja sormenjäljen, ei koskaan raakaa käyttäjän tehtävää. Guardrailin metatiedot raportoivat sekä pyydetyt että tehokkaat analyysitilat; pyydetty `focused` -tila ilman käyttökelpoista käyttäjätekstiä raportoidaan tehokkaasti `full`.

Suojakaide poimii jokaisen tuetun videon osan, mutta kuvaa vain `modalityBridgeVideoMaxVideos`. Jos kohteella on osoitettu olevan `supportsVideo === false`, epäonnistuneista ja ylirajoista videoista tulee eksplisiittisiä turvallisia tekstimerkkejä, joten mikään raakavideo ei säily. Kun kykyä ei tunneta, nämä osat säilyttävät videotelineensä; mikä tahansa varatranskriptio noudattaa yllä olevaa rajoitetun tekstin muuntamista. Kohteet `supportsVideo === true` :llä ohittavat sillan. Asiakaspyynnön keskeytyssignaali etenee latauksen, välittäjäjonon, aliprosessien ja tekstityskutsujen kautta; keskeyttää pysähdyksen videoiden välillä ja koskaan epäonnistua avoin raakamedialle.

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

### PII Masker (`piiMasker.ts`)

Juoksee eteenpäin **molemmat** vaiheet.

- **`preCall`** kloonaa hyötykuorman, kulkee `system`, `messages`, `input` ja `prompt` (mukaan lukien pelkät merkkijonokohteet) ja käyttää `processPII()` ( `@/shared/utils/inputSanitizer`) merkkijono- `content`/`text` kenttiin. Kun `PII_REDACTION_ENABLED=true`, havaittu PII poistetaan lähtevästä hyötykuormasta. Tämä on riippumaton `INPUT_SANITIZER_MODE` (joka ohjaa vain pikainjektiokäytäntöä). Kun editointi on pois päältä, puhelu tallentaa tunnistusmäärät ilman sisällön uudelleenkirjoittamista.
- **`postCall`** syväkloonaa vastauksen, suorittaa `sanitizePIIResponse()` ja Responses-API-muodon maskerin (`maskResponsesOutput` — kattaa `output_text` ja `output[].content[].text`). Jos muokkaus tapahtuu, muokattu vastaus korvaa alkuperäisen.

Suojakaide ei koskaan tukkeudu; se vain merkitsee (`meta.detections`, `meta.redacted`) tai kirjoittaa uudelleen.

#### Tyyppikohtainen valinta, mukautetut kuviot ja tunnistuslaskurit

**Dashboard → Settings → Security → PII masking** valitsee _mitä_ peitetään. Se ei kytke maskausta päälle: se on edelleen `PII_REDACTION_ENABLED` (pyyntö) ja `PII_RESPONSE_SANITIZATION` (vastaus + SSE), molemmat oletuksena pois päältä.

- **Tyyppikohtainen valinta** — Sisäänrakennetut tunnukset on lueteltu `src/shared/constants/piiTypes.ts` ssä (`PII_BUILTIN_TYPES`). Unset tarkoittaa jokaista tyyppiä (käyttäytyminen ennen tätä asetusta). Pyyntömoottorin `ssn_us` -kuvio kohdistetaan `ssn`. Mallit (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA, Full) täyttävät vain UI:n valintaruudut.
- **GDPR ja POPIA -tunnisteet** — kaksitoista sisäänrakennettua tunnusta, jotka kattavat EU ja Etelä-Afrikan henkilökohtaiset tunnisteet (taulukko alla). Niiden regexes, validaattorit ja lainkäyttöaluetunnisteet sijaitsevat yhdessä `src/shared/utils/piiPatterns.ts` taulukossa, jonka sekä vastauspuhdistaja (`src/lib/piiSanitizer.ts`) että pyynnön peittäjä (`src/shared/utils/inputSanitizer.ts`) kuluttavat. Osuma poistetaan vain, kun sen vahvistaja hyväksyy sen; pelkkä numerosarja ei koskaan riitä. Operaattori, joka on tallentanut kavennetun valinnan ennen näiden tunnusten olemassaoloa, säilyttää käyttäytymisensä, kunnes uudet tunnukset on valittu.
- **Mukautetut kuviot** — enintään 20 regex- tai jokerimerkkikuviota (`*` = enintään 64 muuta kuin välilyöntimerkkiä, `?` = yksi). Otteluista tulee `[CUSTOM_REDACTED]`. Jokainen kuvio kulkee `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`) läpi: enintään 500 merkkiä, liput on rajoitettu `g i m s u`, on käännettävä, täytyy läpäistä `safe-regex` (katastrofaalinen paluu), eikä se saa vastata tyhjää merkkijonoa tai muokkauspaikkamerkkiä. Epäonnistunut malli hylätään, kun se tallennetaan ja testataan, ja tallennettu rivi, joka epäonnistuu, ohitetaan ajon aikana sen sijaan, että se käännetään. Mukautetut kuviot toimivat vain maskauksen ollessa päällä.
- **Havaitsemislaskurit** — tyyppikohtaiset määrät (ei koskaan täsmääviä arvoja), säilytetään muistissa ja nollataan uudelleenkäynnistyksen yhteydessä (`src/lib/pii/piiDetectionStats.ts`). Ne lisääntyvät vain maskin ollessa päällä.

Asetukset ovat `key_value` taulukossa (nimitila `pii_settings`, `src/lib/db/piiSettings.ts`) ja ne luetaan 1 s välimuistin kautta. API:

| Method | Path                     | Purpose                                                                            |
| ------ | ------------------------ | ---------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Lipun tila, `enabledTypes`, `customPatterns`, havaintolaskurit                     |
| `PUT`  | `/api/settings/pii`      | Korvaa `enabledTypes`-arvon (`null` = kaikki) ja/tai `customPatterns`-arvon        |
| `POST` | `/api/settings/pii/test` | Kuivaharjoittelu yhdelle kaavalle enintään 8 Kt:n näytteellä; mitään ei tallenneta |

Kaikki kolme vaativat hallinnan todennusta ja vahvistavat kehon Zod :lla (`src/shared/validation/schemas/piiSettings.ts`). Kun sisäänkirjautuminen on estetty (`requireLogin=false`), `GET` ja testipäätepiste ovat auki, mutta `PUT` tarvitsee silti kojelautaistunnon, `manage` -scope API -avaimen, `oma_` käyttötunnisteen, jolla on kirjoitusalue tai suurempi, tai CLI tunnuksen tai sisäisen palvelun tunnuksen, joka lähetetään silmukasta.

#### GDPR (EU) ja POPIA (Etelä-Afrikka) tunnisteet

| Tunnus              | Tunniste                    | Validointi                                                                                      |
| ------------------- | --------------------------- | ----------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                        | Tunnettu maa, täsmällinen maakohtainen pituus, ISO 13616 MOD-97-10                              |
| `eu_vat`            | EU:n ALV-numero             | Tunnettu jäsenvaltion etuliite ja kyseisen valtion numeromuoto (ei VIES-hakua)                  |
| `es_dni_nie`        | Espanjan DNI / NIE          | Tarkistuskirjain (arvo mod 23); NIE on `X/Y/Z` + 7 numeroa                                      |
| `it_codice_fiscale` | Italian Codice Fiscale      | Tarkistuskirjain parittomien/parillisten sijaintien taulukoista                                 |
| `pl_pesel`          | Puolan PESEL                | Painotettu tarkistussumma ja koodatun syntymäkuukauden/-päivän mahdolliset arvoalueet           |
| `nl_bsn`            | Alankomaiden BSN            | 11-tarkistus (painot 9..2, -1)                                                                  |
| `de_steuer_id`      | Saksan Steuer-ID            | ISO 7064 Mod 11,10 sekä numerorakenteen säännöt (ei alkunollaa 0)                               |
| `se_personnummer`   | Ruotsin personnummer        | Luhn viimeisille kymmenelle numerolle ja mahdollinen syntymäpäivä (10 tai 12 numeroa)           |
| `za_id`             | Etelä-Afrikan henkilötunnus | Luhn kaikille 13 numerolle, kelvollinen syntymäkuukausi/päivä, kansalaisuusnumero 0 tai 1       |
| `za_phone`          | Etelä-Afrikan puhelinnumero | Etuliite `+27` / `27` tai kansallinen `0..`-muoto välilyönnillä tai yhdysmerkillä kirjoitettuna |
| `za_vat`            | Etelä-Afrikan ALV-numero    | 10 numeroa, joiden alussa on `4`, **ja** "VAT" / "BTW" edeltävissä 48 merkissä                  |
| `za_tax_ref`        | Etelä-Afrikan veroviite     | 10 numeroa, joiden alussa on `0`-`3`, Luhn **ja** "tax" / "SARS" edeltävissä 48 merkissä        |

Koska pelkät numerot sisältävät muodot törmäävät tilausnumeroihin, koontinumeroihin ja aikaleimoihin, heikoimmat (`za_vat`, `za_tax_ref`) tarvitsevat avainsanamerkin, eikä paljaaa kymmennumeroista `0..` -numeroa käsitellä Etelä-Afrikan puhelinnumerona. Välilliset IBANs (`GB29 NWBK ...`) eivät täsmää. Suoratoistopolulla vihjettä tarkastellaan vain nykyisen palan sisältä. Tunnukset ovat yleisten puhelinmallien edellä, joten vahvistettu tunniste säilyttää oman paikkamerkkinsä (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` ja `popia` -mallit valitsevat vastaavasti EU ja Etelä-Afrikan tunnukset. Itse peittäminen pysyy valinnaisena (Hard Rule #20): mikään tässä ei muuta ominaisuuden lipun oletusarvoa.

### Kehoteinjektio (`promptInjection.ts`)

Havaitsee vihamielisiä rakenteita käyttäjän toimittamassa sisällössä ja pakottaa määritetyn käytännön. Käyttäytymistä ohjaavat ympäristömuuttujat ja konstruktorin asetukset:

| Setting    | Env var                                                                                               | Default | Effect                                                                                                                                                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Käytössä   | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Kun `false`, suojaus oikoo.                                                                                                                                                                                                 |
| Tila       | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Injektiokäytäntö: `block`, `warn` tai `log`. (`redact` hyväksytään taaksepäin yhteensopivuuden vuoksi, mutta se **ei** poista injektiotekstiä; pyynnön henkilötietojen uudelleenkirjoitusta ohjaa `PII_REDACTION_ENABLED`.) |
| Estokynnys | `blockThreshold`-asetus / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Estoon vaadittava vähimmäisvakavuus. Medium-taso on oletuksena vain tarkkailua.                                                                                                                                             |

**Tilan prioriteetti** (`getMode`): kutsujan `options.mode` → `INJECTION_GUARD_MODE` **DB-ominaisuuslipun ohitus** (Dashboard → Settings → Feature Flags) → `INJECTION_GUARD_MODE`-ympäristömuuttuja → `INPUT_SANITIZER_MODE`-ympäristömuuttuja → `warn`. Hallintapaneelin ohitus voittaa siis ympäristömuuttujat, joten Feature Flags -käyttöliittymä ohjaa käynnissä olevaa suojausta reaaliajassa (ilman uudelleenkäynnistystä). DB-luku on vikasietoinen: jos se epäonnistuu, suojaus palaa ympäristöpohjaiseen käyttäytymiseen, ja kun ohitusta ei ole asetettu, käyttäytyminen on identtinen pelkän ympäristömuuttujaratkaisun kanssa.

Havaintolähteet:

1. `sanitizeRequest()` moduulista `@/shared/utils/inputSanitizer` (jaettu havaintajoukko, jota käytetään muuallakin putkessa).
2. Sisäänrakennetut `DEFAULT_GUARD_PATTERNS` (tällä hetkellä `system_override_inline` ja `markdown_system_block`, molemmat `high`-vakavuudella).
3. Valinnaiset `customPatterns`, jotka välitetään konstruktorin asetusten kautta (merkkijonoja, säännöllisiä lausekkeita tai `{ name, pattern, severity }`-tietueita).

Kun `mode === "block"` **ja** vähintään yksi tunnistus saavuttaa vakavuuskynnyksen, `preCall` palauttaa `{ block: true, message: "Request rejected: suspicious content detected" }`. `warn`-/`log`-tiloissa guardrail kirjoittaa lokiin, mutta sallii kutsun. Jaettu apufunktio `evaluatePromptInjection()` on myös eksportattu sellaisia kutsujia varten, joiden täytyy arvioida kehotteita ilman rekisterin kautta kulkemista.

**Skannauksen raja (v3.8.20):** tunnistin tutkii vain yhdistetyn kehotetekstin **ensimmäiset 16 kt** — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 tavua) tiedostossa `src/shared/utils/inputSanitizer.ts`. Sekä `detectInjection()` että `evaluatePromptInjection()` suorittavat `slice(0, MAX_INJECTION_SCAN_BYTES)` ennen kuviosilmukan ajamista. Injektio-ohjeet sijoittuvat lähelle syötteen alkua, joten tämä rajoittaa regexin CPU/GC-kuormitusta useiden satojen kilotavujen hyötykuormissa heikentämättä tunnistusta (vrt. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Suoritetaan **molemmissa** vaiheissa, oletusketjun viimeisenä (prioriteetti `95`). Peittää tunnetut API-avain- ja salaisuustunnuskuviot lähtevästä hyötykuormasta (viestien sisältö, työkalukutsujen argumentit, työkalutulokset) **ja** palveluntarjoajan vastauksesta, jotta kehotteeseen liimattu tunnistetieto (tai työkalutuloksen kaikauttama sellainen) ei pääse vuotamaan ylävirran palveluntarjoajalle tai takaisin asiakkaalle.

- **Vain opt-in -periaatteella**, sama käytäntö kuin PII-tietojen peittämisessä (Hard Rule #20 -säännön hengessä): poissa käytöstä, ellei `settings.credentialRedactionEnabled === true` **tai** `CREDENTIAL_REDACTION_ENABLED=true`. Kun se on pois päältä, guardrail on no-op — se ei koskaan estä eikä koskaan kirjoita uudelleen.
- `redactCredentials()` käy läpi koko hyötykuorma-/vastauspuun (`walkValue()`, suojattu prototype pollution -hyökkäyksiltä, sykliturvallinen `WeakSet`-rakenteen avulla) ja korvaa osumat `[REDACTED:<type>]`-paikkamerkillä kloonaten vain ne haarat, jotka todella muuttuivat.
- `CREDENTIAL_PATTERNS` kattaa LLM-palveluntarjoajien avaimet (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS-tunnukset (GitHub, Slack, Linear, Notion, npm, Postman, Discord), maksuavaimet (Stripe, Square), pilviavaimet (AWS access key, Twilio, SendGrid, Mailgun), yksityiset avaimet / JWT:t, tunnistetietoja sisältävät yhteysmerkkijonot (`mongodb://user:pass@...` jne.) sekä yleisen `Authorization`/`x-api-key`/`api-key`/`apikey`-otsakkeen arvokuvion. Otsakemuotoiset avaimet (`authorization`, `x-api-key`, `api-key`, `apikey`) peitetään rakenteellisesti (vain arvo, skeemaetuliite kuten `Bearer `/`Basic ` säilytetään) eikä yleisellä tekstiregexillä.
- Guardrail ei koskaan estä; se vain kirjoittaa uudelleen (`modifiedPayload` / `modifiedResponse`) ja annotoi (`meta.credentialsRedacted`, `meta.count`).

Regressiosuoja: `tests/unit/credential-masker-guardrail.test.ts`.

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
