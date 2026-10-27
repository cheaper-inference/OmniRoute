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

Saa kiinni ylätason video-osat Chat Completions -pyyntöjen `messages`-kentästä ja Responses
API:n `input`-kentästä ennen kohteen kutsumista, kun kohteelta ei tunneta natiivia videotukea.
Tuetut muodot ovat `input_video`, `video_url`, `video_source`, HTTPS-URL-osoitteet
ja `data:video/*;base64,...`-data-URI:t. Pelkkiä tiedostonimiä tekstissä ei käsitellä
videona.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) omistaa pyyntöjen läpikäynnin,
kyky-/käytäntötarkistuksen, pyyntökohtaisen kokoamisen ja vastausdatan.
Videokohtainen työ — hankinta, kokonaistuloksen välimuisti, ruutusekvenssin kuvaaminen
(joka yhdistää mahdollisen kutsujan ilmoittaman äänitranskription) sekä yrityskohtaiset
mittarit/keskeytykset/siivous — on piilotettu `videoBridgePipeline.ts`-tiedoston
`processVideoPart`-funktion taakse, jota kutsutaan kerran per video-osa `preCall`-metodin
silmukassa. Kyseinen moduuli määrittelee myös eksplisiittiset porttirajat `VideoMediaBrokerPort`
(tavujen hankinta ja näytteistettyjen ruutujen erottaminen), `VideoAudioTranscriptionPort`
(kutsujan ilmoittaman äänitranskription yhdistäminen näytteistettyihin kuvateksteihin) ja
`VideoDrilldownPort` (ruutukohtaisen syventävän analyysin pysyvyystraja; ei vielä kytketty
`processVideoPart`-funktioon — vain erillinen `/api/modality-bridge/video/drilldown`-reitti
kirjoittaa drill-down-merkintöjä tällä hetkellä).

Julkinen `/v1`-pyyntöpolku ei koskaan tuo tai kutsu aliprosessia. Etävideot
ladataan 50 MiB:n rajalla; sisäisillä base64-videoilla on konservatiivinen 36 MiB:n
purettu videokohtainen kattoraja, jotta malli/viestit/kehystyskirjekuori pysyy julkisen
JSON-pyyntöjen hyväksymisrajan 50 MiB sisällä. Sisäinen pituus ja puretun koon
arviot tarkistetaan ennen allokointia. HTTPS vaaditaan alkuperäiselle etä-URL-osoitteelle
ja jokaiselle uudelleenohjaukselle, käyttäen olemassa olevaa vain julkisiin osoitteisiin
rajoittuvaa lähtevää suojausta DNS-kiinnityksellä. Tavut kulkevat sitten tarkan sisäisen
`POST /api/modality-bridge/video/extract`-välitysrajan yli. Tämä reitti on sekä
`LOCAL_ONLY` että `SPAWN_CAPABLE`, hyväksyy vain prosessikohtaisesti autentikoidun
luotetun loopback-pyynnön, eikä koskaan hyväksy URL-osoitetta, tiedostopolkua, ajettavaa
tiedostoa tai argumenttilistaa. API:n body-kokoputki ja käsittelijän inkrementaalinen
body-lukija valvovat itsenäisesti 50 MiB:n välityssyöterajaa. Sen rajallinen jono ajaa
yhden erotuksen kerrallaan, sallii neljä odottavaa työtä ja rajoittaa odottavan syötteen
kokonaismäärän 100 MiB:iin.

Välittäjän sisällä `ffprobe` lukee yksityisen paikallisen tiedoston; kiinteä sallittujen muotojen luettelo sulkee pois soittolista- ja manifestimuodot. Sallituissa MOV-tuoteperheen säilöissä ulkoiset MOV-dataviittaukset ovat oletusarvoisesti poissa käytöstä, eikä kiinteä komento ota niitä käyttöön. Sekä `ffprobe` että `ffmpeg` käyttävät vain `file`-protokollan sallivaa luetteloa, yhtä säiettä ja kiinteitä argumenttitaulukoita ilman komentotulkkia, ja suoritettavat ohjelmat etsitään muuttujan `PATH` kautta. Liitettyjä kansikuvia sisältävät kuvavirrat eivät kelpaa toistettaviksi ehdokkaiksi. Kaikkien toistettavien virtojen on täytettävä rajoitukset, ja eksplisiittinen oletusvirta valitaan ensisijaisesti ennen determinististä pienimmän indeksin varavalintaa. Videoiden enimmäiskesto on 600 sekuntia, enimmäiskoko 8 192 pikseliä ulottuvuutta kohden ja lähdekuvan enimmäiskoko 33 554 432 pikseliä. FFmpeg poimii 1–16 JPEG-kuvaa aikavälien keskipisteistä, pienentää pitkän sivun enintään 1 024 pikseliin suurentamatta pienempiä syötteitä eikä koskaan vastaanota URL-osoitetta. Näytteenoton oletuskäytäntö on `uniform`. Valinnaiset `scene_aware`- ja kokeelliset `segment_aware`-käytännöt suorittavat yhden kiinteän FFmpeg-lisäajon jo validoidulle paikalliselle virralle, valitsevat rajatut `showinfo`-kohtausten aikaleimat ja palaavat deterministisesti samoihin tasaisesti jaettujen aikavälien keskipisteisiin, jos tunnistus epäonnistuu tai aikakatkaistaan, tuloste on virheellinen tai ehdokasjoukko on tyhjä. Segmenttitietoinen tila jakaa keskipistenäytteet suhteessa validoituihin kohtausväleihin; segmenttitietoinen näyttö ja varatoiminta kuvataan jäljempänä. Kiinteää 16 kuvan enimmäisrajaa sovelletaan valinnan jälkeen kaikissa käytännöissä. Kun kohtaustietoisella pyynnöllä on vain yhden kuvan budjetti, se käyttää aktiivisen koko videon tai kohdistusikkunan tasaisesti määritettyä keskipistettä ja ilmoittaa `policyEffective: uniform`: yksi valittu kohtauskuva ei voi säilyttää aikajanan molempia päitä. Kutsuja voi halutessaan antaa äärellisen kohdistusikkunan (`start`/`end` sekunteina); rajat sovitetaan median kestoon, käänteiset tai ei-äärelliset ikkunat hylätään ja kaikki näytteenottokäytännöt suoritetaan vain normalisoidun aikavälin sisällä. Tuloksena saatava ikkuna sisällytetään näytteenoton metatietoihin ja epäluotetun kuvauksen etuliitteeseen, jotta myöhemmät mallit voivat erottaa kohdistetun otteen koko aikajanasta.

Semanttinen kuvatekstin kohdistus on erillinen, eksplisiittinen asetus. Oletusarvoinen `full`-analyysitila säilyttää nykyisen kuvakehotteen eikä koskaan välitä pyyntötekstiä kuvatekstimallille. `focused`-tilassa silta lukee vain uusimman ei-tyhjän käyttäjän laatiman `text`/`input_text`-sisällön samasta Chat- tai Responses-säilöstä, normalisoi sen NFC-muotoon, tiivistää ohjausmerkit ja tyhjämerkit sekä rajoittaa sen 500 Unicode-koodipisteeseen. Tyhjä tulos käyttää varavaihtoehtona täsmälleen `full`-kehotetta. Käyttökelpoinen vihje sarjallistetaan JSON-muotoon erilliseen epäluotetun käyttäjäkontekstin lohkoon, ja se saa vain priorisoida havaittavia yksityiskohtia; se ei voi ohittaa erillistä varoitusta siitä, ettei mediassa näkyviä tai kuuluvia ohjeita pidä noudattaa. Tekstuaalinen kohdistus ei koskaan päättele arvoja `start`/`end` eikä muuta ajallista näytteenotinta.

#### FU-07:n rakenteellinen segmenttinäyttö

`segment_aware` käyttää yhden rajatun esianalyysiajon jo validoidulle paikalliselle videovirralle. Kiinteä suodatinketju pienentää ensin leveyden enintään 320 pikseliin, tunnistaa kohtausten vaihdokset ja pysähtyneet aikavälit ja ottaa sitten yhden näytekuvan sekunnissa epäterävyyden, keskimääräisen luminanssin sekä spatiaalisen ja ajallisen informaation analysointia varten. Ajo on rajoitettu 600 rakenteelliseen näytteeseen, yhteen FFmpeg-/suodatinsäikeeseen, samoihin vain `file`-protokollan salliviin protokolla- ja säilöluetteloihin, 1 MiB:n prosessitulosterajaan ja enintään 30 sekuntiin välittäjän yhteisen keskeytys-/määräaikarajan sisällä. Se ei koskaan hyväksy pyynnöstä komentoa, suodatinta, polkua tai URL-osoitetta.

Rakenteelliset arvot ovat determinististä näytteenottotodistusaineistoa, eivät videon semanttista ymmärtämistä. Niiden perusteella ei päätellä kohteita, toimintoja, kuvatekstejä, puhetta tai käyttäjän aikomuksia. Kohtaus- ja pysähtymisrajat muodostavat segmentit; pysähtymisen kattavuus, epäterävyys, valotus, spatiaalinen yksityiskohtaisuus ja ajallinen muutos vaikuttavat vain siihen, miten nykyinen 1–16 kuvan budjetti jaetaan. Täysin pysähtynyt segmentti rajataan yhteen kuvaan, kun taas pysähtymättömät segmentit kilpailevat jäljellä olevasta budjetista. Kun rajoja on enemmän kuin kuvia, aikajanan tasainen kattavuus säilytetään, jotta nopeat leikkaukset videon alussa eivät voi peittää pitkää loppusegmenttiä. Kohtausrajat, jotka ovat yhden sekunnin analyysitarkkuuden sisällä pysähtymisrajasta, yhdistetään.

Puuttuvat suodattimet, virheellinen tai tyhjä näyttö, tunnistusvirhe tai rajatun esianalyysin aikakatkaisu johtavat hallitusti täsmälleen tasaisesti jaettujen aikavälien keskipisteitä käyttävään käytäntöön. Kutsujan tekemä keskeytys tai välittäjän määräaika ei johda tällaiseen varatoimintaan: se lopettaa käynnissä olevan aliprosessin, estää myöhemmän kuvien poiminnan ja poistaa yksityisen väliaikaisen hakemistopuun `finally`-lohkossa.

`scripts/perf/video-bridge-fu07-eval.ts` luo deterministisiä, aidolla FFmpegillä tuotettuja testiaineistoja deduplikoinnin jälkeisten kuvatekstimallikutsujen säästöille, tiheän liikkeen budjetinjaolle, epäterävyys-, valotus- ja SI-TI-näytölle, nopeille leikkauksille ja pitkälle loppuosuudelle sekä asteittaisten häivytysten väärille positiivisille tuloksille. Se tallentaa esianalyysin seinäkelloajan sekä, jos `/usr/bin/time` on käytettävissä, aliprosessin suoritinajan ja RSS-muistin huippukäytön. Sen laatutarkistukset ovat vain rakenteellisia oraakkeleita. Todellisen kuvatekstimallin laatu pysyy tilassa `HOLD`, koska tällä testikehyksellä ei ole valtuutettua päätepistettä tai jäädytettyä arvioijaa. Myös rahalliset säästöt pysyvät tilassa `HOLD`, ellei `--caption-cost-per-call-usd` anna eksplisiittistä positiivista kutsukohtaista kustannusarviota; komentosarja ei koskaan sepitä kumpaakaan tulosta.

Kunkin kehyksen koko on rajoitettu 4 MiB:iin, kaikkien raakamuotoisten kehysten
yhteiskoko 23 MiB:iin ja serialisoidun välittäjän vastauksen koko 32 MiB:iin.
Yksityinen tilapäishakemisto poistetaan `finally`-lohkossa. OmniRoute ei sisällä
FFmpeg:iä eikä hyväksy mukautettua suoritettavan tiedoston polkua. Ennen
kuvatekstien muodostamista silta suorittaa varovaisen visuaalisen
duplikaattien poistovaiheen: kukin JPEG pienennetään 16×16-kokoiseksi
harmaasävypuskuriksi ja sitä verrataan vain viimeisimpään säilytettyyn kehykseen.
Kun pyydetty kuvatekstibudjetti on suurempi kuin yksi kehys, poiminta tuottaa
rajatun ehdokasjoukon, jonka koko on enintään kaksi kertaa budjetti eikä koskaan
yli 16 kehystä. Pyydettyä enimmäismäärää sovelletaan vasta duplikaattien
poistamisen jälkeen, ja ensimmäinen sekä viimeinen valittu ehdokas säilytetään
lopullisessa harvennuksessa, kun budjetti on vähintään kaksi. Versioitu
`grayscale-16x16-mean-cells-v2`-käytäntö käyttää suurempaa seuraavista: luminanssin
keskimääräinen muutos tai niiden pienoiskuvan solujen osuus, joiden normalisoitu
muutos on vähintään 0,05. Duplikaattikynnys on vakio 0,04, joka on valittu
ennustettavuuden vuoksi sen sijaan, että se tarjottaisiin ajonaikaisena
asetuksena. Tämä toissijainen suuren kontrastin signaali säilyttää pienet liikkeet
ja näkyvän tekstin muutokset, jotka pelkkään keskiarvoon perustuva vertailu voi
piilottaa. Vertailu- tai dekoodausvirheissä toiminta jatkuu sallivasti kattavuuden
säilyttämiseksi. Tulosteen metadata erottaa poimitut ehdokkaat, onnistuneesti
käytetyt kehykset ja pois jätetyt visuaaliset duplikaatit.

Nimenomaisesti merkitty video-osa voi pyytää aikaleimoilla varustettua
kontaktikopiota. Silta muodostaa enintään 4 sarakkeen ja 16 kehyksen JPEG-ruudukon.
Jokainen 512 pikselin solu upottaa lähteensä aikaleiman suurikontrastiseen
alapalkkiin, ja samat aikaleimat säilyvät tekstimuotoisessa metadatassa myöhempää
yhdistämistä ja auditointia varten. Koko JPEG-tiedoston koko on edelleen rajoitettu
32 MiB:iin. Jos `sharp` ei pysty dekoodaamaan tai koostamaan ruudukkoa, silta
palaa käyttämään yksittäisiä JPEG-kehyksiä; asiakkaan tekemä keskeytys välittyy
silti kontaktikopion käsittelyyn.

Tuotantoon siirtämistä tukeva näyttö pidetään tarkoituksellisesti erillään
synteettisestä koostamisen mikrosuorituskykytestistä.
`scripts/perf/video-bridge-contact-sheet-eval.ts` määrittää skeemaversioidun
A/B-testikehyksen todellisille OpenAI-yhteensopiville konenäkömalleille. Se mittaa
palveluntarjoajan ilmoittamat tokenit, päästä päähän -viiveen (mukaan lukien
kontaktikopion koostaminen), mallikutsujen määrän ja manifestissa määritettyjen
faktojen säilymisen. Mallien raakavastauksia ei kirjoiteta raporttiin; vain
SHA-256-tiivisteet ja täsmänneiden faktojen tunnisteet säilytetään.
Testikehys ei tee verkko- tai maksullista mallikutsua, ellei `--execute-real`
ole annettu ja `--model`, `OMNIROUTE_BASE_URL` sekä `OMNIROUTE_API_KEY` ole
määritetty. Ilman tällaista nimenomaista todellista ajoa sen koneluettava päätös
pysyy arvossa `HOLD`; pelkät synteettiset hyötykuorman ja kutsumäärän mittaukset
eivät kelpaa tuotantoon siirtämistä tukevaksi näytöksi.

Kutsujat voivat liittää valinnaisen `transcript.cues`-taulukon tuettuun
video-osaan, jos niillä on jo ajallisesti kohdistettu teksti. Jokaisessa vihjeessä
on oltava `text`, äärellinen `start`/`end`-aikaväli tarkistetun keston sisällä
sekä sallittujen arvojen luetteloon kuuluva `source` (`client`, `embedded` tai
`audio-bridge`); `confidence`-arvon oletus on `1`, ja sen on pysyttävä välillä
`0`–`1`. Täsmälleen samat vihjeet yhdistetään. OmniRoute ei koskaan käynnistä
litterointia tämän metadatan perusteella: validoidut vihjeet kopioidaan kuvattuun
tulokseen yhdessä lähteen, luottamustason ja aikavälin kanssa, ja ne esitetään
epäluotettuina havaintoina kehysten kuvatekstien rinnalla. Virheellinen,
sallitun alueen ulkopuolinen tai alkuperätiedoton teksti hylätään sen sijaan,
että se sekoitettaisiin kuvatekstivirtaan. Molemmat pyyntörungon litterointikanavat
normalisoivat annetun alkuperän arvoksi `client`, mukaan lukien itse ilmoitetut
`embedded`- tai `audio-bridge`-merkinnät. Vain palvelimen hallitsema sovitin voi
määrittää nämä luotetut merkinnät vain koodista käytettävän `trustedSource`-argumentin
kautta; pyynnön JSON-kenttä ei voi välittyä tähän argumenttiin. Litterointiteksti
on alkuperästään riippumatta epäluotettua, mediasta johdettua sisältöä, eikä se
saa koskaan määrittää valtuutusta.

Edistynyt kutsuja voi antaa samalle videolle `audioTranscript`-raidan; sitä
käsitellään asiakkaan toimittamana tekstinä, ei todisteena palvelimen tekemästä
litteroinnista. Yhdistämisrajapinta käsittelee visuaaliset ja äänihavainnot
yhden määräajan ja keskeytyssignaalin alaisina, järjestää ne yhteiselle
aikajanalle, yhdistää täsmälleen samat havainnot ja raportoi osittaisen tuloksen,
kun vain toinen puoli onnistuu. Virheellinen `audioTranscript` tuottaa tämän
osittaisen tuloksen — visuaalinen kuvaus säilytetään ja äänihaara kirjaa
sanitoidun virhekoodin — koko videon käsittelyn epäonnistumisen sijaan.
Haarakohtainen saatavuus, osittaisuuden ilmaisin ja sanitoidut virhekoodit
säilytetään kuvatussa tuloksessa, suojakaidemetatiedoissa
(`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), tulosvälimuistin metatiedoissa ja sillan
yhdistämislaskureissa. Video Bridgen oletuspolku ei käynnistä puheen muuntamista
tekstiksi eikä lataa toista mediakopiota; ilman nimenomaisesti annettua raitaa
se käsittelee edelleen vain videota.

**Transkriptien säilytys (#12150 P1).** Tätä sovelletaan automaattisesti aina, kun
Video Bridge (joka on itsessään valinnainen) hahmontaa transkriptivihjeen — erillistä
säilytyslippua ei ole. Kun pyyntö hahmontaa minkä tahansa transkriptivihjeen (kutsujan ilmoittaman
`transcript`-kentän tai yhdistetyn `audioTranscript`-kentän), suojamekanismi merkitsee sen
`videoBridgeObserved`-tilaan ja tuottaa videokuvauksesta peitetyn varjokopion —
identtisen hahmonnuksen, jossa jokaisen vihjeen vapaamuotoinen tekstisisältö korvataan arvolla
`[redacted-video-transcript]`. Tämä tehdään korvaamalla rakenteinen vihjekenttä
ennen merkkijonon koostamista (ei koskaan jäsentämällä litistettyä tekstiä, joten mikään vihjeen
sisältö — haitallinen tai tavallinen, mukaan lukien merkkejä `]` sisältävät tekstit, kuten
`[inaudible]`/`[music]` — ei voi säilyä). Tallennetun kutsulokin pyyntörungossa
jokainen videosta johdettu tekstiosa vaihdetaan tähän peitettyyn varjokopioon sisällön
yhtäsuuruuden perusteella; `fullText`-ankkuri luetaan uudelleen valmiista kutsua edeltävästä
suojamekanismin hyötykuormasta, joten täsmäytys onnistuu edelleen sen jälkeen, kun ketjun myöhemmät
suojamekanismit (henkilötieto- ja tunnistetietopeittimet, prioriteetit 10/95) ovat muokanneet
kuvaustekstiä paikallaan, sekä sen jälkeen, kun järjestelmäkehotteen, luovutuksen tai Muistin
lisäys on muotoillut viestitaulukon uudelleen. Mallille ylävirtaan lähetettävä runko ei muutu.
Havaittu pyyntö ei myöskään lisää mitään pysyvään Muistiin (sekä pyynnöstä että vastauksesta
johdettu poiminta ohitetaan), joten mallin oma vastaus ei voi kaiuttaa transkriptitekstiä Muistiin.

**Raakavideokentät (#12430).** Kun silta on käytössä ja natiivi videotuki on tuntematon tai puuttuu, määritetyt `transcript`-/`audioTranscript`-kentät aktivoivat myös `videoBridgeObserved`-tilan, vaikka kuvauksen muodostaminen olisi epäonnistunut tai `maxVideos`-raja ylittynyt. `null` ja tyhjät merkkijonot huomioidaan; puuttuvia kenttiä ja muuhun kuin videoon liittyviä metatietoja ei huomioida. Säilytetyistä kopioista nämä kentät peitetään tai pyyntö jätetään pois, ja välimuistit sekä Muisti ohitetaan.

Näillä varapoluilla kutsujan kelvollisista vihjeistä tulee tuettuja `text`-/`input_text`-
osia epästandardien palveluntarjoajakenttien sijaan. Molemmat pyynnössä toimitetut raidat
säilyvät epäluotettuina `client`-havaintoina, ja niihin liitetään nimenomainen varoitus siitä, ettei videota
kuvailtu eikä aikaleimoja vahvistettu mediaa vasten. Nykyisiä 256 vihjeen / 64 KiB:n kokonais-
ja vihjekohtaisia budjetteja sovelletaan kahteen raitaan yhdessä;
aikaleimojen on mahduttava välittäjän 600 sekunnin enimmäisrajaan ja mahdolliseen annettuun kohdistus-
ikkunaan. Virheelliset raidat hylätään eikä niitä välitetä mielivaltaisena tekstinä; kelvollista
rinnakkaisraitaa voidaan silti käyttää, ellei niiden yhteinen budjetti ylity. Null-arvoiset tai tyhjät
kentät eivät lisää tekstiä. Tämä varamenettely ei lisää median noutoa eikä transkriptiota.
Transkription laajennuskentät poistetaan varapolun videokantajasta ja sen
`video_url`-/`source`-objekteista. OpenAI-siirtomuodon sallittujen kenttien luettelo pysyy tiukkana; tuntemattoman natiivituen
videokantajat pysyvät käytettävissä, ja tunnetut vain tekstiä tukevat kohteet säilyttävät turvalliset merkinnät.
Rakenteiset peitetyt varjokopiot suojaavat lisättyä transkriptitekstiä, kun taas
kutsujan omistama alkuperäinen pyyntö säilyy muuttumattomana. Natiivia tukea tarjoavat kohteet ja
käytöstä poistetut sillat säilyttävät nykyisen ohitustoimintansa.

Säilytettävät lisäkopiot käyttävät samaa havaitun pyynnön signaalia. Raaka
suojamekanismeja edeltävä asiakaspyynnön tilannevedos, muistissa oleva odottava pyyntö ja aikainen
hylätyn pyynnön loki korvaavat videon osien transkriptiokentät rakenteisesti;
putkiston vaiheiden ja kontekstin luovutuksen muodostamat merkkijonokehotteet peitetään
tallennetun pyyntörungon vastaanottopisteessä. Tallennettu `video_content_removed`-merkintä
saa `previous_response_id`-jatkamisen epäonnistumaan turvallisesti sen sijaan, että tarkoituksella
hylätty teksti muodostettaisiin uudelleen. Jos havaitun pyynnön osakohtainen
peitetty varjokopio katoaa ennen lokitusta tai yksikin useista videon varjokopioista
ei täsmää pyynnön myöhempien muutosten jälkeen, säilytettävä pyyntörunko
jätetään kokonaan pois osittain peitetyn transkriptin säilyttämisen sijaan.

Havaitun pyynnön tapauksessa mallin vastaus voi lainata mitä tahansa transkriptin osaa
ilman rakenteista vihjerajaa. Siksi sen kutsulokiin tallennettava
`responseBody` korvataan poisjättömerkinnällä; yksityiskohtaista
putkistoartefaktia (joka voi sisältää ylävirran ja asiakkaan rungot sekä suoratoiston osat)
ei säilytetä. Semanttiset, idempotenssi- ja päättelyn toistovälimuistit ohittavat
sekä luvut että kirjoitukset kyseisen pyynnön osalta. Palveluntarjoajapyyntö ja asiakkaalle näkyvä
vastaus säilyvät muuttumattomina. Varhaiset yhteyden ylläpitotavut poistetaan väliaikaisesta
puskurista, kun yksityiskohtainen artefakti jätetään pois. Kiron virheellistä EventStream-muotoa koskeva
varoitus ilmoittaa vain hyötykuorman tavumäärän, ei koskaan sen sisältöä tai JSON-
jäsentimen raakaa virhettä.
Tämä ei tarkoita, että kaikki asiaan liittymättömät palveluntarjoajien tai liitännäisten diagnostiikat olisi
auditoitu; säilyttävien vastaanottopisteiden laajemman tarkistuksen etenemistä seurataan kohdassa #11658.

Sisäinen `/api/modality-bridge/video/drilldown`-elinkaari on erillinen,
loopback-/tunnistetodennettu välimuistialusta. Jokainen toiminto edellyttää myös
kanonista läpinäkymätöntä toimijatunnusta. Ennen tuotantokutsujan käyttöönottoa sen on
johdettava tämä tunnus todennetusta vuokraajasta, eikä se saa koskaan välittää
asiakkaan valitsemaa arvoa. Välimuistiavaimet sitovat kyseisen toimijan kanonisiin istunto- ja
videoviitetunnuksiin, tallentavat vain niiden SHA-256-johdetut avaimet ja rajaavat sekä luvut
että poistot samaan toimijaan. Välimuisti tallentaa enintään 16 johdettua JPEG-
kuvaruutua merkintää kohden, vanhentaa ne kymmenen minuutin kuluttua ja tukee rajattuja
`start`-/`end`-lukuja tai istunnon nimenomaista poistamista.

Kullakin toimijalla voi olla enintään 16 merkintää ja 64 MiB kanonista JPEG-dataa. Nämä
rajat ovat riippumattomia yleisestä 64 merkinnän / 256 MiB:n enimmäisrajasta: toimijakohtaisen kiintiön
paine poistaa vain kyseisen toimijan vähiten äskettäin käytetyt merkinnät ennen kuin yleistä
LRU-poistoa harkitaan. Vanhentuneet merkinnät poistetaan sekä toimijakohtaisesta että
yleisestä kirjanpidosta välimuistitoiminnan yhteydessä, kun taas peruutus ja validoinnin epäonnistuminen eivät
tallenna osittaista korvausta.

Välimuisti hylkää ei-kanonisen Base64-datan, ylimääräisen täytteen, muun kuin JPEG-median, virheelliset tai
katkenneet JPEG-kuvat sekä JPEG-kuvat, jotka aiheuttavat varoituksen rajatun koko kuvan `sharp`-purun
aikana. Se uudelleenkoodaa jokaisen hyväksytyn kuvan kanoniseksi JPEG-kuvaksi, määrittää leveyden ja korkeuden
puretuista tavuista sen sijaan, että luottaisi kutsujan kenttiin, ja hylkää kaikki lopussa olevat
polyglottitavut niiden säilyttämisen sijaan. Vain rajattu kanoninen pakattu puskuri
lasketaan mukaan kumpaankin kiintiöön. JSON-siirtoraja sisältää Base64-yleiskulun 32 MiB:n
puretun syötteen enimmäismäärälle. Jokainen
tallennettu johdannainen sisältää validoidun JPEG-muotonsa ja -resoluutionsa, näytteenottokäytännön,
johdannaisversion, luontiajan, palvelimen laskeman sisältötiivisteen sekä tiivistetyn viittauksen
ylätason kohteeseen ja luotetun kutsujan antaman ylätason sisältötiivisteen. Peruutus tarkistetaan
asynkronisten purku- ja tiivistevaiheiden välissä ennen atomista välimuistiin tallennusta.

Tämä vaihekokonaisuus ei vielä yhdistä tuotantokäyttöön tarkoitettua tuottajaa reittiin eikä
tarjoa moniresoluutioisten varianttien valintaa. Läpinäkyvä Video Bridge -pyyntöpolku
ei siksi aiheuta lisätyötä, kun taas vuokralaiseen sidotun toimijan johtaminen ja
koko FU-08-moniresoluutioelinkaari ovat edelleen nimenomaisia jatkotoimia sen sijaan,
että ne dokumentoitaisiin valmiiksi toiminnallisuudeksi.

Kehykset tekstitetään järjestyksessä määritetyllä Video-mallilla. Tyhjä
Video-ohitus perii Vision-asetuksen; jos kumpikin on tyhjä, Visionin
automaattinen reititin valitsee käytettävän näkökykyisen mallin. Onnistuneet kuvatekstit
korvaavat alkuperäisen osan vakaalla `[Video description:`-etuliitteellä, joka myös
merkitsee tekstin epäluotetuksi, mediasta johdetuksi havainnoksi ja ohjeistaa myöhempiä
malleja olemaan noudattamatta mediasta löytyviä ohjeita. Kehyskuvatekstien välimuistiavaimet
sisältävät JPEG-tavut, kehotteen, aikaleiman ja käytettävän mallin; vain onnistuneet
kuvatekstit tallennetaan välimuistiin. Välimuistimerkinnät säilyttävät toteutuneen onnistuneen tuottajamallin,
myös varamallin; silta ilmoittaa arvon `mixed`, kun eri kehykset
ovat eri mallien tuottamia. Välimuistiosuma käyttää uudelleen kyseistä tuottajaidentiteettiä
sen sijaan, että se nimettäisiin uudelleen pyydetyn reitityssuunnitelman mukaiseksi. Koko videon tuloksen
välimuistiavain muodostetaan jokaisesta tulosta muuttavasta syötteestä — kehotteesta, käytettävästä
mallista, näytteenottokäytännöstä, kehysten määrästä, semanttisen analyysin tilasta, normalisoidun
tarkennusvihjeen SHA-256-sormenjäljestä, tarkennusikkunasta, `transcript`-arvosta,
`audioTranscript`-arvosta ja yhteystaulukkokuvan lipusta — joten minkä tahansa näistä
ulottuvuuksista muuttaminen aiheuttaa välimuistiohituksen eikä koskaan vanhentuneen tuloksen uudelleenkäyttöä.
Visuaalisen duplikaattien poiston käytäntöversio, kynnysarvo ja rajattu ehdokaskehysten määrä
sisältyvät myös nimenomaisesti tulosvälimuistin avaimeen ja metatietoihin; käytännön muutos ei
siten voi käyttää uudelleen vanhentunutta koko videon kuvausta. Tulosvälimuistin v4-metatiedot
säilyttävät tilan ja sormenjäljen, eivät koskaan raakaa käyttäjän tehtävää. Suojakaiteiden metatiedot
ilmoittavat sekä pyydetyn että käytettävän analyysitilan; pyydetty `focused`-tila ilman
käyttökelpoista käyttäjätekstiä ilmoitetaan käytännössä `full`-tilaksi.

Suojakaide poimii kaikki tuetut video-osat, mutta kuvailee enintään
`modalityBridgeVideoMaxVideos` videota. Jos kohteen on todistettu käyttävän asetusta
`supportsVideo === false`, epäonnistuneet ja rajan ylittävät videot muutetaan nimenomaisiksi turvallisiksi
tekstimerkinnöiksi, jotta raakavideota ei säily. Kun suorituskykyä ei tunneta, kyseiset osat
säilyttävät videosäiliönsä; mahdollinen varatranskriptio noudattaa edellä kuvattua rajattua
tekstimuunnosta. Kohteet, joilla on `supportsVideo === true`, ohittavat sillan.
Asiakaspyynnön keskeytyssignaali välittyy latauksen, välittäjäjonon,
aliprosessien ja kuvatekstikutsujen läpi; keskeytykset pysäyttävät käsittelyn videoiden välissä eivätkä koskaan
jätä raakaa mediaa avoimeksi käsittelyn epäonnistuessa.

Ajoaikaiset asetukset tallennetaan tietokantaan ja validoidaan Zodilla:

| Avain                               | Oletusarvo  | Alue / toiminta                                                                                             |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Valinnainen ajoaikainen toiminto, erikseen käyttöön otettava                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` säilyttää yleiset kuvatekstit; `focused` käyttää rajattua, epäluotettua uusinta käyttäjäkontekstia   |
| `modalityBridgeVideoModel`          | `""`        | Perii Vision Bridge -mallin                                                                                 |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` tai suhteellinen `segment_aware`; tunnistimen virhe käyttää varana arvoa `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                              |

Vanhat tallennetut Video-aikakatkaisuarvot, jotka ylittävät 120 sekuntia, rajataan
välittäjän määräaikaan; uudet tämän rajan ylittävät asetusmuutokset hylätään.
`GET /api/modality-bridge/video/runtime` edellyttää luotettavasti leimattua loopback-paikallisuutta
ennen todennusta tai ajoaikaisen ympäristön tutkimista ja sen jälkeen hallintatason
todennusta. Se palauttaa vain kentät `available`, siistityt FFmpeg/ffprobe-versiot ja kiinteän
syyn silloin, kun ajoaikainen ympäristö ei ole käytettävissä. Sisäinen poimintapäätepiste ei ole
julkinen latausrajapinta: jonon täyttyminen palauttaa arvon `503` ja `Retry-After`-otsakkeen, kutsujan
yhteyden katkeaminen palauttaa arvon `499`, ja välittäjän kiinteä määräaika palauttaa arvon `504`. Muunnetut vastaukset lisäävät
arvon `video->text;model=<visionModel>;parts=<videos>` keskitettyyn
`x-omniroute-modality-bridge`-otsakkeeseen poistamatta Vision- tai Audio-segmenttejä.

### PII-maskaus (`piiMasker.ts`)

Suoritetaan **molemmissa** vaiheissa.

- **`preCall`** kloonaa hyötykuorman, käy läpi kentät `system`, `messages`, `input` ja `prompt` (mukaan lukien pelkät merkkijonoalkiot) ja soveltaa `processPII()`-funktiota (moduulista `@/shared/utils/inputSanitizer`) merkkijonotyyppisiin `content`/`text`-kenttiin. Kun `PII_REDACTION_ENABLED=true`, havaitut henkilötiedot peitetään lähtevässä hyötykuormassa. Tämä on riippumaton asetuksesta `INPUT_SANITIZER_MODE` (joka ohjaa vain kehoteinjektion käytäntöä). Kun peittäminen on pois päältä, kutsu kirjaa havaintolukumäärät kirjoittamatta sisältöä uudelleen.
- **`postCall`** syväkloonaa vastauksen ja suorittaa `sanitizePIIResponse()`-funktion sekä Responses-API-muodon peittäjän (`maskResponsesOutput` — kattaa kentät `output_text` ja `output[].content[].text`). Jos peittoja tapahtuu, muokattu vastaus korvaa alkuperäisen.

Suojaus ei koskaan estä; se ainoastaan merkitsee (`meta.detections`, `meta.redacted`) tai kirjoittaa uudelleen.

#### Tyypikohtainen valinta, mukautetut kaavat ja havaintolaskurit

**Dashboard → Settings → Security → PII masking** valitsee _mitä_ peitetään. Se ei kytke peittoa päälle: se tapahtuu edelleen asetuksilla `PII_REDACTION_ENABLED` (pyyntö) ja `PII_RESPONSE_SANITIZATION` (vastaus + SSE), jotka molemmat ovat oletuksena pois päältä.

- **Tyypikohtainen valinta** — sisäänrakennetut tunnisteet on lueteltu tiedostossa `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Asettamaton arvo tarkoittaa kaikkia tyyppejä (käyttäytyminen ennen tämän asetuksen olemassaoloa). Pyyntömoottorin `ssn_us`-kaava vastaa tyyppiä `ssn`. Mallipohjat (Minimal, Standard, Financial, Brazilian, USA, Full) vain täyttävät valintaruudut käyttöliittymässä.
- **Mukautetut kaavat** — enintään 20 säännöllisen lausekkeen tai jokerimerkin kaavaa (`*` = enintään 64 muuta kuin tyhjämerkkiä, `?` = yksi). Osumista tulee `[CUSTOM_REDACTED]`. Jokainen kaava käy läpi `compilePiiCustomPattern()`-funktion (`src/shared/utils/piiCustomPatterns.ts`): enintään 500 merkkiä, liput rajoitettu arvoihin `g i m s u`, täytyy kääntyä, täytyy läpäistä `safe-regex`-tarkistus (katastrofaalinen takaisinperäytyminen) eikä se saa täsmätä tyhjään merkkijonoon tai peittämismerkkiin. Epäonnistuva kaava hylätään tallennettaessa ja testattaessa, ja tallennettu rivi, joka epäonnistuu, ohitetaan ajonaikaisesti sen sijaan että se käännettäisiin. Mukautetut kaavat suoritetaan vain peiton ollessa päällä.
- **Havaintolaskurit** — tyypikohtaiset lukumäärät (ei koskaan täsmänneitä arvoja), pidetään muistissa ja nollataan uudelleenkäynnistyksessä (`src/lib/pii/piiDetectionStats.ts`). Ne kasvavat vain peiton ollessa päällä.

Asetukset sijaitsevat `key_value`-taulussa (nimiavaruus `pii_settings`, `src/lib/db/piiSettings.ts`) ja niitä luetaan 1 s:n välimuistin kautta. API:

| Method | Path                     | Purpose                                                                            |
| ------ | ------------------------ | ---------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Lipun tila, `enabledTypes`, `customPatterns`, havaintolaskurit                     |
| `PUT`  | `/api/settings/pii`      | Korvaa `enabledTypes`-arvon (`null` = kaikki) ja/tai `customPatterns`-arvon        |
| `POST` | `/api/settings/pii/test` | Kuivaharjoittelu yhdelle kaavalle enintään 8 Kt:n näytteellä; mitään ei tallenneta |

Kaikki kolme vaativat hallintatodennuksen ja validoivat rungon Zod:lla (`src/shared/validation/schemas/piiSettings.ts`).

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
