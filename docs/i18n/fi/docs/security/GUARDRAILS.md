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

## Sisäänrakennetut suojaukset

Rekisteri lataa tuonnin yhteydessä automaattisesti kuusi suojausta tärkeysjärjestyksessä
(katso `registry.ts` → `registerDefaultGuardrails()`):

| Tärkeys | Nimi                | Vaihe(et)      | Tiedosto              |
| ------- | ------------------- | -------------- | --------------------- |
| `5`     | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`     | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`     | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`    | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`    | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`    | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Pienemmät tärkeysnumerot suoritetaan **ensin**.

### Näkösilta (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 -perusmallilla ja malleilla `glm-5.3-{low,high,max}` on rekisteri-/määritystiedoissa
nimenomaisesti `supportsVision:false`. GLM 5.3 Flash -versiot ovat edelleen natiivisti
näköä tukevia malleja. Claude Coden `/v1/messages`-reitti siirtyy jaettuun `handleChat`-kutsua edeltävään
suojausketjuun **ennen** Claude–OpenAI-käännöstä; sisäkkäisten `Read`-työkalutulosten kuvat on kuvailtava
tai käsiteltävä ennen kuin käännös nostaa ne OpenAI:n `image_url`-sisällöksi (#17069).

Sieppaa kuvia sisältävät pyynnöt, jotka kohdistuvat **näköä tukemattomiin malleihin**, ja joko
uudelleenreitittää koko pyynnön näköä tukevaan malliin tai korvaa kuvaosat muokattavan näkömallin
tuottamilla tekstikuvauksilla ennen ylemmän tason kutsua. Näin pelkkää tekstiä käsittelevät
palveluntarjoajat voivat käsitellä multimodaalisia hyötykuormia läpinäkyvästi.

Kulku:

1. Ohitetaan, jos kohdemalli tukee jo näköä (ellei se esiinny pakotettujen siltojen luettelossa
   `isVisionBridgeForcedModel`).
2. Kuvaosat poimitaan kutsulla `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), joka delegoi **yhdistetylle mediatunnistimelle**
   `detectMediaParts()` tiedostossa `open-sse/utils/mediaParts.ts` — se on ainoa totuuden lähde,
   jota jaettu combo-yhteensopivuussuodatin käyttää.
   Poiminta sallii vain muodot, jotka `replaceImageParts` voi sijoittaa takaisin
   (poiminta↔korvaus-sopimus): OpenAI:n `image_url`, Anthropicin base64-muoto
   `source.type:"base64"`, Anthropicin URL-muoto `source.type:"url"` sekä Responses API:n
   `input_image`. Claude Coden `tool_result.content`-sisältöön ja Responses-työkalujen tulosteisiin
   sisäkkäin sijoitetut vastaavat kuvat poimitaan ja korvataan myös alkuperäisissä poluissaan;
   pelkkiä ilmaisimia sisältävät muodot ovat combo-suodattimen materiaalia, eikä niitä poimita.
   Ohitetaan, jos yhtään kuvaa ei löydy.
3. Ajon aikainen määritys ratkaistaan kutsulla `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): uudet `modalityBridge*`-asetusavaimet
   ohittavat aiemmat; vanhat `visionBridge*`-avaimet säilyvät **yhden kierroksen varalla**
   (palautusikkuna). Ohitetaan ennen mediatietojen läpikäyntiä, jos silta on poistettu käytöstä.
4. Tilavalitsin (`modalityBridgeVisionMode`, katso alla oleva taulukko) päättää uudelleenreitityksen
   ja kuvauksen välillä. Uudelleenreititys palauttaa `modifiedPayload`-arvon, jossa vain `model`
   on vaihdettu, sekä metatiedot `{ rerouted, fromModel, toModel, imagesKept }`.
5. Kuvauspolku: kuvien määrä rajoitetaan arvoon `maxImages`, tehtävän huomioiva kehote
   muodostetaan, kuvausvälimuistia käytetään, näkömallia kutsutaan **rinnakkain**
   (`Promise.allSettled`), ja niiden paikalle lisätään tekstiosat muodossa
   `[Image N]: <description>`. Epäonnistunut kuvaus tuottaa arvon `null`: raakakuva säilytetään
   tuntemattomille tai näköä tukeville kohteille (#4012), mutta **vahvistetulle pelkkää tekstiä
   käsittelevälle suoralle kohteelle** tai nollanäköiselle combolle lisätään jokaiselle kuvaamatta
   jääneelle kuvalle eksplisiittinen
   `(unavailable — no vision-capable provider connected)` -tekstisijainen, mukaan lukien
   osittaiset epäonnistumiset ja kuvaukseen tehtävien kutsujen enimmäismäärän ylittävät kuvat
   (#17069). Nykyinen kaikkien kuvausten epäonnistumisen combo-varakuvaus säilyy ennallaan (#8430).
6. Palautetaan `modifiedPayload` sekä metatiedot (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Tilavalitsin (`modalityBridgeVisionMode`)

| Tila       | Oletus | Toiminta                                                                                                                                                                                                                                                                                                                                                  |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Vanha heuristiikka, muuttumattomana (#6640/#7204): ei-combo- ja `auto/`-mallit uudelleenreititetään parhaaseen näkömalliin, ellei alkuperäisellä mallilla ole jo käyttökelpoisia tunnistetietoja (jolloin käytetään kuvausta); combo-kohteille käytetään aina kuvausta.                                                                                   |
| `describe` |        | Kuvataan aina — uudelleenreitityslohko ohitetaan kokonaan; käyttäjän valitsema malli antaa aina vastauksen.                                                                                                                                                                                                                                               |
| `reroute`  |        | Pakota uudelleenreititys: tunnistetiedot säilyttävän mallin suojaus ohitetaan. Uudelleenreitityksen **kohteen** tunnistetietosuojaus on edelleen voimassa — kun käyttökelpoista näköä tukevaa kohdetta ei ole, silta estää pyynnön selkeällä virheellä sen sijaan, että kuvaisi kuvat tai lähettäisi raakakuvat pelkkää tekstiä käsittelevälle kohteelle. |

Pakotetut tilat ohittavat automaattisen heuristiikan kokonaan; `auto`-tila toimii tavutasolla
samoin kuin ennen PR-1-suojauksen käyttöönottoa.

#### API-avaimen laajuus (`visionBridgeKeyScope.ts`)

Kun kutsujan API-avain rajoittaa kohteita `allowedConnections`, kiintiöpooleja
(`allowedQuotas`) tai malleja (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), silta valitsee
uudelleenreititys- ja kuvailumalleiksi vain mallit, joita avain saa käyttää, ja
vain yhteyksistä, joita avain saa käyttää. Kuvailukutsu kulkee tällöin aina
OmniRouten self-loopin kautta `x-omniroute-self-loop-key-id`-otsakkeen kanssa,
joten vastaanottava chat-pyyntö valvoo kyseisen avaimen yhteys- ja
mallikäytäntöä uudelleen. `enforceApiKeyPolicy()` ottaa kyseisen otsakkeen
huomioon vain yhdessä self-loop bearer -tunnisteen kanssa, joten se voi
ainoastaan rajata käyttöoikeuksia, ja tunniste, jota ei voida ratkaista,
hylätään.

Jos avaimelle ei ole sallittu yhtään näkömallia, **vahvistettu
vain tekstiä tukeva kohde** hylkää kuvapyynnön paikallisesti selkeällä HTTP
400 -virheellä sen sijaan, että välittäisi kuvatiedostot kyvyttömälle
ylävirralle (#17069). Kohteissa, joiden näköominaisuus on tuntematon tai
natiivi, kuvailupolku säilyttää aiemman fail-open-toimintansa (meta
`{ skipped: true, reason: "no_permitted_vision_model" }`).
Pyynnöt ilman avainta sekä avaimet, joihin nämä rajoitukset eivät vaikuta,
toimivat täsmälleen kuten aiemmin.

#### Tehtävätietoinen kuvailukehote (`modalityBridgeVisionTaskAware`)

Oletusarvo on **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
liittää peruskuvailukehotteeseen **viimeisen käyttäjäviestin** tekstin
(enintään 500 merkkiä), mikä ohjaa kuvailua siihen, mitä käyttäjä todella
pyysi (codex-vision-proxy-malli), ja pyytää näkömallia litteroimaan näkyvän
tekstin. Kun lippu on pois käytöstä — tai käyttäjän tekstiä ei ole — käytetään
muuttamatonta peruskehotetta.

Kuvailun self-loopin oma OpenAI-yhteensopiva pyyntö
(`callVisionModelSingle()` tiedostossa `visionBridgeHelpers.ts`) pyytää aina
`image_url.detail: "high"` — ehdoitta, jokaiselle kutsujalle ja tarjoajalle,
eikä sitä ohjata millään asiakkaan ilmoittamalla signaalilla.
Matalan tarkkuuden näytteenotto heikentää OCR-tarkkuutta juuri siinä tekstin
litterointitehtävässä, johon tämä kehote pyytää mallia, joten kuvailukutsu
pyytää itse aina korkeaa tarkkuutta riippumatta alkuperäisen saapuvan pyynnön
käyttämästä tarkkuustasosta. Tämä vaikuttaa vain sisäisen kuvailupyynnön
runkoon; se ei muuta sitä, miten OmniRoute välittää kutsujan oman
`image_url.detail`-arvon ensisijaisessa pyynnössä — kyseinen oletusarvo
asetetaan erikseen ja vain tunnistetuille OpenCode-asiakkaille
`defaultImageDetail()`-funktiossa
(`open-sse/handlers/chatCore/upstreamBody.ts`). Kuvailun self-loopin
Anthropic-johtomuotoharassa ei ole `detail`-kenttää, joten kumpikaan oletusarvo
ei vaikuta siihen.

#### Kuvailun tulosrajoitus (`modalityBridgeVisionMaxChars`)

| Avain                          | Oletusarvo | Alue              |
| ------------------------------ | ---------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`        | `0` tai 100–50000 |

`0` (oletusarvo) tarkoittaa **ei rajoitusta** — `callVisionModel()`-funktion
palauttama kuvaus välitetään muuttamattomana, mikä säilyttää nykyisen
toiminnan. Mikä tahansa arvo alueella 100–50000 katkaisee kuvauksen
`…`-päätteellä ennen kuin se sijoitetaan takaisin muodossa
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` tiedostossa
`src/lib/guardrails/visionBridge.ts`). Suurenna tätä arvoa
yksityiskohtaisissa OCR-tehtävissä, joissa alavirran malli tarvitsee koko
litteroinnin; pienennä sitä rajoittaaksesi puheliaiden näkömallien
tunnusmerkkien käyttöä. Koontinäytön kenttä sijaitsee Vision-välilehden
Advanced-paneelissa (`modality-bridge-max-chars` tiedostossa
`ModalityBridgeVisionTab.tsx`), ja se pyöristää kaikki arvot väliltä 1–99
ylöspäin arvoon 100 jättäen eksplisiittisen `0`:n ennalleen — `0` on itsessään
kelvollinen Zod-arvo
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ei
ainoastaan ”asettamaton”-oletusarvo.

#### Kuvailuvälimuisti (`modalityBridge/bridgeCache.ts`)

Prosessinlaajuinen muistissa toimiva LRU- ja TTL-välimuisti kuvailutuloksille.
Avain = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
pituusetuliitteiseen kehystykseen perustuen (kenttärajojen törmäyksiä ei synny).
Mallikomponentti on **määritetty** siltamalli, ei mallin tosiasiallisesti
käyttämä vastausmalli — `callVisionModel` voi vaihtaa sisäisesti
varamalliin, ja yrityskohtainen avain muuttaisi välimuistin pirstaleiseksi.
Epäonnistuneita kuvailuja ei koskaan tallenneta välimuistiin. Asetukset:

| Avain                           | Oletusarvo | Alue    |
| ------------------------------- | ---------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`     | —       |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000 |

#### Etäkuvien normalisointi (self-loop-kuvailu/base64-haku)

Kun silta hakee **etäkuvan** itse — Anthropic-kuvailun self-kutsu ja
claude-wire-format-muunnos base64-muotoon
(`ensureBase64ImagesForClaudeWire`), molemmat `fetchRemoteImageAsDataUri()`-
funktion kautta tiedostossa `visionBridgeHelpers.ts` — tuloksena syntyvä data
URI välitetään `normalizeDataUri()`-funktion
(`open-sse/utils/imageNormalize.ts`) läpi ennen sen upottamista
näkömallipyyntöön. Liian suuret kuvat skaalataan **2048 pikselin
pitkään reunaan** (vastaa OpenAI:n ja Anthropicin jo palvelinpuolella
soveltamaa koonrajoitusta), mikä pienentää siirrettävien tavujen määrää ja
viivettä muuttamatta sitä, mitä näkömalli näkee. Skaalaus käyttää
`sharp`-kirjastoa, joka ladataan dynaamisella tuonnilla: jos sen
natiivibinaarin lataaminen epäonnistuu jollakin alustalla,
`normalizeDataUri()` **ei koskaan heitä poikkeusta** — se palauttaa alkuperäiset
tavut sellaisenaan, joten kuvailu- ja base64-muunnospolku toimivat aina.
Myös muut kuin kuvatavut (haku, joka ei palauttanut dekoodattavaa kuvaa)
välitetään muuttamattomina. Tämä normalisointi koskee vain kuvia, jotka silta
hakee omaa self-kutsuaan varten — sitä ei koskaan sovelleta kutsujan
rajoituksetta välitettävään hyötykuormaan, mikä on opt-in-periaatteen mukaista
(Hard Rule #20).

#### Asetusskeema + migraatio

Uudet `modalityBridge*`-avaimet validoidaan Zodilla skeemassa `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*`-kolmikko sekä
Audio Bridgen käyttämä `modalityBridgeAudio*`-ryhmä. Migraatio
`141_modality_bridge_settings.sql` kopioi olemassa olevat vanhat
`visionBridge*`-arvot vastaaviin uusiin avaimiin (idempotentisti eikä koskaan
ylikirjoita operaattorin asettamaa `modalityBridge*`-arvoa); vanhat avaimet
hyväksytään edelleen lukemisen varana yhden julkaisusyklin ajan.

#### Läpinäkyvyyttä ilmaiseva otsake ja tilastot

Kuvailevat vastaukset sisältävät
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
-otsakkeen (jonka rakentaa `buildModalityBridgeHeader()` tiedostossa
`modalityBridge/bridgeStats.ts` ja jonka lisää
`withModalityBridgeHeader()` tiedostossa `src/sse/handlers/chatHelpers.ts`).
Uudelleenreititetyt pyynnöt eivät saa otsaketta — hyötykuormaa ei muutettu, ja
mallin vaihto näkyy jo vastauksen rungon `model`-kentässä.

`GET /api/modality-bridge/stats` (hallinnan todennus, sama taso kuin
`GET /api/settings`) palauttaa muistissa olevat modality-kohtaiset laskurit
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` kohteille `vision`, `audio` ja
`video`. `averageLatencyMs` käyttää nimittäjänä arvoa `latencySamples`, ei
kaikkia yrityksiä; operaatio, josta ei ole ajoitustietoa, ei luo keinotekoista
nollamillisekuntista otosta. `bridged` säilyy taaksepäin yhteensopivana
onnistuneiden muunnosten aliaksena; epäonnistuneet yritykset eivät kasvata sitä.
Laskurit nollautuvat prosessin uudelleenkäynnistyksen yhteydessä tarkoituksella
(telemetriaa, ei kirjanpitoa).

#### Koontinäytön määritys

Erillinen koontinäyttösivu on
`/dashboard/settings/modality-bridge`. Sen URL-osoitteelliset `Vision`, `Audio`
ja `Video`-välilehdet säilyttävät kyselyparametrit vaihtaessaan `tab`-arvoa.
Vision-välilehti tarjoaa käyttöönottokytkimen, tilan, mallin valinnan (mukaan
lukien automaattisen oletusarvon), tehtävätietoisen kehotteen, edistyneet
aikakatkaisu-, kuva- ja kuvauksen pituusrajoitukset sekä välimuistin rajoitukset,
ajonaikaiset laskurit ja suojatun esimerkkipyynnön. Audio-välilehti on myös
käytettävissä: se tarjoaa käyttöönottokytkimen, vain STT:lle tarkoitetun
mallinvalitsimen sekä Auto-vaihtoehdon, aikakatkaisu- ja äänileikkeen
enimmäisrajoitukset, äänilaskurit ja `input_audio`-esimerkkitestin.
Video-välilehti on toiminnallinen: se ilmoittaa FFmpeg/ffprobe-ajonaikaisen
tilan — yhden neljästä yksiselitteisestä käyttöliittymätilasta (`unknown`, kun
tarkistus on käynnissä tai sitä ei voitu suorittaa loppuun, `restricted`,
kun tarkistus ohitetaan asiakaspuolella muussa kuin loopback-koontinäytön
isännässä, `unavailable`, kun tarkistus on suoritettu ja puuttuminen vahvistettu,
tai `available`, kun FFmpeg/ffprobe-versiot ovat saatavilla) — tallentaa
käyttöönotto-, malli-, kuva- ja video- sekä aikakatkaisurajoitukset, suodattaa
mallinvalitsimen näkökykyisiin malleihin ja tarjoaa videolaskurit.

AI-asetusten aiempi Vision Bridge -kortti on yhteensopivuuslinkki uudelle
sivulle; se ei enää omista lomakkeen toista kopiota. Media Providers linkittää
Image-to-Text- ja Speech-to-Text-työnkulut myös vastaaviin Modality Bridge
-välilehtiin poistamatta nykyistä Speech-to-Text-leikkikenttää.

**Itselenkin hyväksynnän ohitus:** kun kuvaileva kutsu reititetään OmniRouten
omaan `/v1`-itselinkkiin (epästandardi toimittajan malli), alikutsu lähettää
otsakkeen `x-omniroute-admission-bypass: internal` ja todennetaan ratkaistulla
itselinkin tunnistetiedolla — paikallisen tilan `sk_omniroute`-sentinelillä tai
operaattorin määrittämällä `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`
-ympäristöavaimella (#1350), jotta `REQUIRE_API_KEY=true`-käyttöönotot voivat
edelleen suorittaa kuvailevan kutsun. Ohitus hyväksytään vain täsmälleen näillä
tunnistetiedoilla, joten ulkoiset asiakkaat eivät voi käyttää otsaketta
hyväksynnän ohittamiseen.

Vanhat oletusarvot sijaitsevat tiedostossa
`src/shared/constants/visionBridgeDefaults.ts`; uudet tila-, tehtävätietoisuus-
ja välimuistioletusarvot sekä asetusten ratkaisin sijaitsevat tiedostossa
`src/shared/constants/modalityBridgeDefaults.ts`. Suojamekanismi tarjoaa
`deps`-konstruktorivaihtoehdon, jotta testit voivat injektoida keinotekoiset
`getSettings`- ja `callVisionModel`-toteutukset.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Sieppaa ääntä sisältävät chat-pyynnöt ennen kuin ne saavuttavat kohteen, jonka
ei tiedetä hyväksyvän äänisyötettä. Se ei koskaan reititä chat-pyyntöä
uudelleen: äänisisällöt litteroidaan olemassa olevan OpenAI-yhteensopivan
multipart-päätepisteen kautta, ja valittu chat-malli jatkaa
tekstimuotoisilla litteroinneilla.

Kulku:

1. Selvitä `supportsAudio` kutsulla `getResolvedModelCapabilities()`. Nimenomaiset provider-rekisterin metatiedot ovat etusijalla, seuraavaksi staattiset mallin metatiedot ja sitten synkronoitu `modalities_input`. Ilmoitettu syöteluettelo, joka ei sisällä `audio`-arvoa, tarkoittaa `false`-arvoa; jos kyvykkyydestä ei ole näyttöä, arvo on `null`. Sekä `false` että `null` aktivoivat varovaisen sillan, kun taas `true` ohittaa sen.
2. Selvitä `modalityBridgeAudio*`-asetukset ja poimi jaettavat ylätason äänisisällöt jokaisesta viestistä jaetun `detectMediaParts()`-tunnistimen kautta. Tuetut johtomuodot ovat OpenAI:n `input_audio`, `audio_url` ja `source.media_type: "audio/*"`. Sisäkkäinen ääni tunnistetaan reititystä varten, mutta splice-polku ei poista sitä. Työmäärä rajoitetaan asetuksella `modalityBridgeAudioMaxClips`; myöhemmät osat jätetään muuttamatta.
3. Noudata määritettyä `provider/model`-arvoa tai anna `selectAudioBridgeModel()`-funktion käydä `AUDIO_TRANSCRIPTION_PROVIDERS`-luettelo läpi vakaassa katalogijärjestyksessä ja valita ensimmäinen malli, jolla on käyttökelpoinen aktiivisen palveluntarjoajan tunnistetieto.
4. `callAudioTranscription()` muuntaa base64-/data-URI-äänen multipart-`file`-tiedostoksi tai lataa etäisen `audio_url`-osoitteen vain julkisille kohteille tarkoitetun ulospäin suuntautuvan liikenteen suojauksen kautta käyttäen DNS-kiinnitystä ja 25 Mt:n rajaa. Tämän jälkeen se lähettää tiedoston ja valitun mallin POST-pyynnöllä paikalliseen `/v1/audio/transcriptions`-self-loopiin, joka todennetaan kutsulla `resolveSelfLoopBearer()`. Olemassa oleva transkriptioreitti suorittaa normaalin tunnistetietojen haun, jäähdytys-/nopeusrajoitusten käsittelyn ja palveluntarjoajalle välityksen.
5. Onnistuneet kutsut korvaavat osansa muodolla `[Audio N]: <transcript>`. Kutsut suoritetaan `Promise.allSettled`-toiminnolla: yksittäisen kutsun epäonnistuminen säilyttää alkuperäisen äänisisällön (#4012-sopimus). Jos kaikki kutsut epäonnistuvat ja kohteen on todistettu olevan `supportsAudio === false`, osat muutetaan muotoon
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-sopimus). Tuntemattoman kohteen (`null`) tapauksessa kaikkien kutsujen epäonnistuminen jättää sisällön muuttamatta. Todistetusti vain tekstiä tukeva kohde, jolla ei ole käyttökelpoista STT-tunnistetietoa, saa saman nimenomaisen sijaissisällön ilman verkkokutsua.

Onnistuneet transkriptiot käyttävät prosessin laajuista Modality Bridge LRU/TTL -välimuistia. Avain yhdistää ääniviitteen, vakaan `audio-transcription`-operaatiotunnisteen ja valitun STT-mallin; epäonnistumisia ei koskaan tallenneta välimuistiin. Äänikutsut päivittävät jaetut `bridged`-, `cacheHits`-, `failures`- ja `lastUsedAt`-laskurit. Muunnetut vastaukset sisältävät otsakkeen
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; muuttamattomat pyynnöt eivät saa Audio Bridge -osuutta.

Ajon aikaiset asetukset tallennetaan tietokantaan ja validoidaan Zodilla:

| Avain                         | Oletus  | Alue                  |
| ----------------------------- | ------- | --------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                     |
| `modalityBridgeAudioModel`    | `""`    | Auto tai STT-tunniste |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000           |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                  |

Jaetun välimuistin asetuksia hallitaan edelleen määrityksillä
`modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` ja `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Sieppaa Chat Completions -rajapinnan `messages`- ja Responses API:n `input`-kenttien ylätason videosisällöt ennen kuin kutsutaan kohdetta, jonka natiivista videotuen kyvykkyydestä ei ole tietoa. Tuettuja muotoja ovat `input_video`, `video_url`, `video_source`, HTTPS-osoitteet ja `data:video/*;base64,...`-data-URI:t. Tekstissä olevia tavallisia tiedostonimiä ei käsitellä videoina.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) vastaa pyynnön läpikäynnistä, kyvykkyys-/käytäntötarkistuksesta, pyyntökohtaisesta aggregoinnista ja vastauskuormasta. Videokohtainen työ — hankinta, koko tuloksen välimuisti, kuvasekvenssin kuvaaminen (jossa yhdistetään kutsujan ilmoittama äänitranskriptio) sekä yrityskohtaiset mittarit, keskeytys ja siivous — on piilotettu `videoBridgePipeline.ts`-tiedoston `processVideoPart`-funktioon, jota kutsutaan kerran kutakin videosisältöä kohti `preCall`-funktion silmukassa. Moduuli määrittelee myös eksplisiittiset rajapintarajat `VideoMediaBrokerPort` (tavujen hankinta ja näytteistettyjen kuvakehysten poiminta), `VideoAudioTranscriptionPort` (kutsujan ilmoittaman äänitranskription yhdistäminen näytteistettyihin kuvateksteihin) ja `VideoDrilldownPort` (vanha raakavaraston muoto). Tuotannon STT ja kuvakehysten säilytys kootaan kuvausrajapinnan ympärille funktioilla `createVideoSttAdapter` ja `createVideoDrilldownAdapter`; jälkimmäinen käyttää jaettua läpinäkymättömän kahvan elinkaarta.

Julkinen `/v1`-pyyntöpolku ei koskaan tuo aliprosessia moduuliin eikä kutsu sitä. Etävideot ladataan enintään 50 MiB:n rajalla; upotettujen base64-videoiden dekoodattu koko rajoitetaan varovaisesti 36 MiB:iin, jotta malli-, viesti- ja kehystyskuorma pysyvät julkisen JSON-pyynnön 50 MiB:n vastaanottorajan sisällä. Upotetun sisällön pituus ja dekoodatun koon arviot tarkistetaan ennen varausta. HTTPS vaaditaan alkuperäisessä etäosoitteessa ja jokaisessa uudelleenohjauksessa käyttäen olemassa olevaa vain julkisille kohteille tarkoitettua ulospäin suuntautuvan liikenteen suojausta ja DNS-kiinnitystä. Tavujen on tämän jälkeen kuljettava täsmällisen sisäisen `POST /api/modality-bridge/video/extract`-välittäjärajan kautta. Reitti on sekä `LOCAL_ONLY` että `SPAWN_CAPABLE`, hyväksyy ainoastaan prosessikohtaisen todennetun ja luotetun loopback-pyynnön eikä koskaan hyväksy URL-osoitetta, tiedostopolkua, suoritettavaa tiedostoa tai argumenttiluetteloa. API:n rungon koon käsittelyputki ja käsittelijän vaiheittainen rungonlukija valvovat kumpikin erikseen välittäjän 50 MiB:n syöterajaa. Sen rajattu jono suorittaa yhden poiminnan kerrallaan, sallii neljä odottavaa työtä ja rajoittaa odottavan syötteen koon 100 MiB:iin.

Välittäjän sisällä `ffprobe` lukee yksityistä paikallista tiedostoa; kiinteä muotojen
sallimislista sulkee pois soittolista- ja manifestimuodot. Sallituissa MOV-perheen
säiliöissä ulkoiset MOV-dataviittaukset pysyvät oletusarvoisesti poissa käytöstä,
eikä kiinteä komento ota niitä käyttöön. Sekä `ffprobe` että `ffmpeg` käyttävät
vain `file`-protokollan sallimislistaa, yhtä säiettä, kiinteitä argumenttitaulukoita,
ei komentotulkkia, ja suoritettavat tiedostot ratkaistaan kohteesta `PATH`.
Liitetyt kansikuvavirrat eivät ole toistettavia ehdokkaita. Kaikkien toistettavien
virtojen on täytettävä rajoitukset, ja eksplisiittistä oletusvirtaa suositaan ennen
determinististä pienimmän indeksin varavaihtoehtoa. Videoiden enimmäiskesto on
600 sekuntia, 8 192 pikseliä kummassakin mitassa ja 33 554 432 lähdepikseliä.
FFmpeg ottaa 1–16 keskipisteen JPEG-kuvaa, skaalaa pitkän reunan enintään
1 024 pikseliin suurentamatta pienempiä syötteitä eikä koskaan saa URL-osoitetta.
Näytteenotto on oletusarvoisesti `uniform`. Valinnaiset `scene_aware`- ja
kokeelliset `segment_aware`-käytännöt suorittavat yhden ylimääräisen kiinteän
FFmpeg-ajon jo validoidun paikallisen virran yli, valitsevat rajattuja
`showinfo`-kohtauksen aikaleimoja ja palaavat deterministisesti samoihin
tasaisesti jaettuihin keskipisteisiin tunnistimen virheen, aikakatkaisun,
virheellisen tulosteen tai tyhjän ehdokasjoukon yhteydessä. Segmenttitietoinen
tila jakaa keskipistenäytteet validoitujen kohtausvälien kesken suhteellisesti;
segmenttitietoinen näyttö ja varatoiminta kuvataan jäljempänä. Kova 16 kuvan
rajoitus otetaan käyttöön valinnan jälkeen kaikissa käytännöissä. Kun
kohtauspohjaisessa pyynnössä on vain yhden kuvan budjetti, se käyttää aktiivisen
koko videon tai kohdeikkunan tasaista keskipistettä ja ilmoittaa
`policyEffective: uniform`: yksi valittu kohtauskuva ei voi säilyttää ajallisesti
molempia päitä. Kutsuja voi valinnaisesti antaa äärellisen kohdeikkunan
(`start`/`end` sekunteina); rajat rajoitetaan median kestoon, käänteiset tai
äärellisyydeltään rajoittamattomat ikkunat hylätään, ja kaikki näytteenottokäytännöt
suoritetaan vain normalisoidun välin sisällä. Tuloksena oleva ikkuna sisällytetään
näytteenoton metatietoihin ja epäluotettavan kuvauksen etuliitteeseen, jotta
myöhemmät mallit voivat erottaa kohdistetun otteen koko aikajanasta.

Semanttinen kuvatekstin kohdistus on erillinen, eksplisiittinen asetus. Oletusarvoinen
`full`-analyysitila säilyttää nykyisen kuvakehotteen eikä koskaan välitä pyynnön
tekstiä kuvatekstimallille. `focused`-tilassa silta lukee vain saman Chat- tai
Responses-säilön uusimman käyttäjän kirjoittaman, ei-tyhjän `text`/`input_text`-
sisällön, normalisoi sen NFC-muotoon, tiivistää ohjausmerkit ja tyhjemerkit sekä
rajoittaa sen 500 Unicode-koodipisteeseen. Tyhjä tulos palautuu täsmälleen
`full`-kehotteeseen. Käyttökelpoinen vihje sarjallistetaan JSON-muodossa
erilliseen epäluotettavan käyttäjäkontekstin lohkoon, ja se voi ainoastaan
asettaa havaittavien yksityiskohtien prioriteetin; se ei voi ohittaa erillistä
varoitusta olla seuraamatta mediassa näkyviä tai kuuluvia ohjeita. Tekstikohdistus
ei koskaan päättele arvoja `start`/`end` eikä muuta ajallista näytteenotinta.

#### FU-07 rakenteellinen segmenttinäyttö

`segment_aware` käyttää yhtä rajattua esianalyysiajoa jo validoidun paikallisen
videovirran yli. Kiinteä suodatinketju skaalaa ensin enintään 320 pikseliä
leveäksi, tunnistaa kohtausvaihdokset ja pysähtyneet välit, ja ottaa sen jälkeen
näytteitä nopeudella 1 kuva sekunnissa sumentuneisuuden, keskimääräisen luminanssin
sekä tila- ja aikatiedon määrittämistä varten. Ajo rajoitetaan 600 rakenteelliseen
näytteeseen, yhteen FFmpeg-/suodatinsäikeeseen, samaan vain `file`-protokollan ja
säiliöiden sallimislistaan, 1 MiB:n prosessitulosteen ylärajaan sekä enintään
30 sekuntiin välittäjän jaetun keskeytyksen/määräajan sisällä. Se ei koskaan
hyväksy pyynnöstä komentoa, suodatinta, polkua tai URL-osoitetta.

Rakenteelliset arvot ovat determinististä näytteenottonäyttöä, eivät semanttista
videon ymmärtämistä. Niistä ei päätellä kohteita, toimintoja, kuvatekstejä,
puhetta tai käyttäjän tarkoitusta. Kohtaus- ja pysähtyneisyysrajat muodostavat
segmentit; pysähtyneisyyden kattavuus, sumentuneisuus, valotus, tilallinen
yksityiskohtaisuus ja ajallinen muutos vaikuttavat vain siihen, miten olemassa
oleva 1–16 kuvan budjetti jaetaan. Täysin pysähtynyt segmentti rajoitetaan yhteen
kuvaan, kun taas muut kuin pysähtyneet segmentit kilpailevat jäljelle jäävästä
budjetista. Kun rajoja on enemmän kuin kuvia, aikajanan tasainen kattavuus
säilytetään, jotta nopeat alkuvaiheen leikkaukset eivät voi peittää pitkää
loppusegmenttiä. Yhden sekunnin analyysiresoluution sisällä olevat kohtausrajat
yhdistetään pysähtyneisyysrajaan.

Puuttuvat suodattimet, virheellinen tai tyhjä näyttö, tunnistimen virhe tai
rajattu esianalyysin aikakatkaisu johtavat täsmälleen tasaisten keskipisteiden
käytännön avoimeen varatoimintaan. Kutsujan keskeytys tai välittäjän määräaika
ei johda avoimeen varatoimintaan: se lopettaa käynnissä olevan aliohjelman,
estää myöhemmän kuvien poiminnan ja poistaa yksityisen väliaikaisen puun
`finally`-lohkossa.

`scripts/perf/video-bridge-fu07-eval.ts` luo deterministisiä todellisia FFmpeg-
testitiedostoja deduplikoinnin jälkeisten kuvatekstikutsujen säästöjen,
tiheän liikkeen budjetinjaon, sumentuneisuuden/valotuksen/SI-TI-näytön, pitkän
hännän sisältävien nopeiden leikkausten sekä asteittaisen häivytyksen
väärien positiivisten tulosten arviointia varten. Se tallentaa esianalyysin
seinäaikaa ja, kun `/usr/bin/time` on käytettävissä, lapsiprosessin suorittimen
käyttöajan sekä huippu-RSS:n. Sen laatutarkistukset ovat vain rakenteellisia
oraakkeleita. Todellisen kuvatekstimallin laatu pysyy tilassa `HOLD`, koska tällä
testikehyksellä ei ole valtuutettua päätepistettä tai jäädytettyä arvioijaa.
Myös rahalliset säästöt pysyvät tilassa `HOLD`, ellei
`--caption-cost-per-call-usd` anna eksplisiittistä positiivista kutsukohtaista
arviota; komentosarja ei koskaan keksi kumpaakaan tulosta.

Kunkin kehyksen koko on rajoitettu 4 MiB:iin, kaikkien raakakehysten yhteiskoko 23 MiB:iin ja sarjallistetun välittäjävastauksen koko 32 MiB:iin. Yksityinen väliaikaishakemisto poistetaan kohdassa `finally`. OmniRoute ei sisällä FFmpegiä eikä hyväksy mukautettua suoritettavan tiedoston polkua. Ennen kuvatekstien luontia silta suorittaa konservatiivisen visuaalisen kaksoiskappaleiden poistovaiheen: kukin JPEG pienennetään 16×16-harmaasävy­puskuriksi ja sitä verrataan vain viimeksi säilytettyyn kehykseen. Jos pyydetty kuvatekstibudjetti on suurempi kuin yksi kehys, poiminta tuottaa rajatun ehdokasjoukon, jonka koko on enintään kaksi kertaa budjetti ja joka sisältää enintään 16 kehystä. Pyydetty yläraja otetaan käyttöön vasta kaksoiskappaleiden poiston jälkeen, ja kun budjetti on vähintään kaksi, ensimmäinen ja viimeinen valittu ehdokas säilytetään lopullisen harvennuksen aikana. Versioitu
`grayscale-16x16-mean-cells-v2`-käytäntö käyttää suurempaa arvoa seuraavista: keskimääräinen luminanssiero tai niiden pikkukuvan solujen suhde, joiden normalisoitu ero on vähintään 0.05. Kaksoiskappaleiden kynnysarvo on vakio 0.04, joka on valittu ennakoitavuuden vuoksi eikä sitä ole määritetty ajonaikaiseksi asetukseksi. Tämä toissijainen
suurikontrastinen signaali säilyttää pienen liikkeen ja näkyvän tekstin muutokset, jotka pelkkään keskiarvoon perustuva vertailu voi peittää. Vertailu- tai dekoodausvirheet sallivat käsittelyn jatkumisen ja säilyttävät kattavuuden. Tulosten metatiedoissa erotetaan poimitut ehdokkaat, onnistuneesti käytetyt kehykset ja poistetut visuaaliset kaksoiskappaleet.

Nimenomaisesti merkitty videon osa voi pyytää aikaleimallista yhteystietoruudukkoa. Silta muodostaa enintään 4 sarakkeen ja 16 kehyksen JPEG-ruudukon. Jokainen 512 pikselin solu sisältää lähteen aikaleiman suurikontrastisessa alareunakaistassa, ja samat aikaleimat säilyvät tekstimuotoisissa metatiedoissa myöhempää yhdistämistä ja auditointia varten. Koko JPEG-tiedoston koko on rajoitettu 32 MiB:iin. Jos `sharp` ei pysty dekoodaamaan tai koostamaan ruudukkoa, silta palautuu yksittäisiin JPEG-kehyksiin; asiakkaan keskeytys välitetään edelleen ruudukkotoiminnon kautta.

Promootionäyttö on tarkoituksella erillinen synteettisen koostamisen mikrobenchmarkista. `scripts/perf/video-bridge-contact-sheet-eval.ts` määrittelee skeemaversioidun A/B-testikehyksen todellisille OpenAI-yhteensopiville näkömalleille. Se mittaa palveluntarjoajan ilmoittamat tokenit, päästä päähän mitatun seinäkelloajan (mukaan lukien ruudukon koostaminen), mallikutsujen määrän ja manifestissa määritettyjen tosiasioiden säilymisen. Raakamallivastauksia ei kirjoiteta raporttiin; säilytettäviksi jäävät vain SHA-256-tiivisteet ja täsmäävien tosiasioiden tunnisteet. Testikehys ei tee verkkokutsua eikä maksullista mallikutsua, ellei parametria `--execute-real` ole välitetty ja ellei `--model`, `OMNIROUTE_BASE_URL` ja `OMNIROUTE_API_KEY` ole määritetty. Ilman tätä nimenomaista todellista ajoa sen koneellisesti luettava päätös pysyy tilassa `HOLD`; pelkät synteettiset hyötykuorma- ja kutsumäärämittaukset eivät ole promootionäyttöä.

Erillinen `scripts/perf/video-bridge-promotion-eval.ts` käyttää FU-07- tai
FU-09-havaintoja. Promootion hyväksyntä edellyttää kaikkia kahdeksaa synteettistä skenaariotyyppiä sekä puhdistettua oikeaa leikettä, vähintään kolmea mitattua toistoa roolia ja tapausta kohden, kaikkia kymmentä ilmoitettua metriikkaa, jäädytettyjä median, kehotteen, odotettujen tosiasioiden ja asetusten tiivisteitä, yksilöllisiä havaintotunnuksia sekä varmennettua siemenperusteista A/B-järjestystä. Suorituksen kuitti sitoo yhteen aineiston tiivisteen, tarkan ehdokkaan SHA:n ja mallin revision. Puuttuvat tai virheelliset mittaukset säilyvät tilassa `HOLD`, mukaan lukien yli 30 sekunnin suorittimen käyttö, yli 512 MiB:n huippu-RSS tai yli 30 sekunnin esianalyysi. Nämä ovat näyttöön hyväksymisen rajoja eivätkä uusi ajonaikainen RSS-valvonnan takuu.

FU-07 edellyttää vähintään 98 prosentin laadun säilymistä ja p95-viivettä, joka on enintään 1,2-kertainen perustasoon nähden, sekä jompaakumpaa seuraavista: tapaustasapainotetun keskimääräisen recall-arvon absoluuttinen parannus 0,05 samalla keskimääräisellä kuvatekstikutsujen määrällä tai vähintään 10 prosentin vähennys kaksoiskappaleiden poiston jälkeisten kuvatekstikutsujen keskimääräisessä määrässä. FU-09 edellyttää vähintään 0,85:n laatua, 95 prosentin säilymistä, 20 prosentin vähennystä mediaaniviiveessä ja 10 prosentin vähennystä tokenien määrässä. Kriittisen tosiasian menettäminen, injektioiden noudattaminen tai puuttuva käyttö estää promootion. Yksi suoritus ei voi edistää mitään: `--previous-report` vahvistaa saman käytännön, mallirevision, ehdokkaan ja aineiston kaksi erillistä, toisistaan riippumatonta ja peräkkäin hyväksyttyä suoritusta. Otanta­kokeella ei voi vahvistaa yhteystietoruudukkokoetta.

Kerääjien tulee arvioida vastaukset muistissa ja tallentaa `responseDigest` sekä metriikat ja havaintojen sidokset, ei koskaan vastaustekstiä. Kuluttaja lukee myös vanhat raakaaineistohavainnot, mutta ei koskaan kopioi niiden tekstiä raportteihin. Kunkin havainnon osalta hyväksytään täsmälleen toinen seuraavista: `responseDigest` tai `rawResponseText`. Versioitu sallittujen luettelo pysyy tyhjänä, ja muuttumaton oletusarvo on `hold`. Hyväksyttävä tietue edellyttää näyttöviitettä, käytäntöä, mallirevisiota, tarkan ehdokkaan SHA:ta, manifestin tiivistettä ja kahta erillistä suoritus-ID:tä; ristiriitaiset kontekstit hylätään. Nämä metatiedot ovat auditointisopimus, eivät todiste siitä, että viitattu tiedosto sisältää aitoja mittauksia. Tarkista varsinaiset kuitit ennen minkään tietueen lisäämistä. Hallinnan tilastopäätepiste ja Videon hallintapaneeli näyttävät konservatiivisen valmiustilan. Pelkkä määritetty mallialias ei vahvista sen revisiota tai käynnissä olevan ehdokkaan SHA:ta, joten nykyinen hallintapaneeli ilmoittaa tilan `HOLD` sen sijaan, että se käyttäisi uudelleen toisen suoritus­kontekstin kelpoisuutta. Nimenomainen kokeellinen valinta pysyy erillään promootiosta; oletusarvoa ei muuteta automaattisesti.

Kutsujat voivat liittää tuettuun video-osaan valinnaisen `transcript.cues`-taulukon, kun niillä on jo kohdistettu teksti. Jokaisen vihjeen on sisällettävä `text`, äärellinen `start`/`end`-väli tutkittavan keston sisällä sekä sallittu `source` (`client`, `embedded` tai `audio-bridge`); `confidence`-oletusarvo on
`1`, ja sen on pysyttävä välillä `0`–`1`. Täsmälleen päällekkäiset vihjeet yhdistetään. OmniRoute ei koskaan käynnistä transkriptiota näiden metatietojen perusteella: vahvistetut vihjeet kopioidaan kuvattuun tulokseen lähteen, luottamuksen ja aikavälin kanssa, ja ne esitetään epäluotettavina havaintoina kuvatekstien rinnalla. Virheelliset, alueen ulkopuoliset tai alkuperätiedottomat tekstit hylätään sen sijaan, että ne sekoitettaisiin kuvatekstivirtaan. Molemmat pyynnön rungon transkriptio-kanavat normalisoivat annetun alkuperän arvoksi `client`, mukaan lukien itse ilmoitetut `embedded`- tai `audio-bridge`-tunnisteet. Ainoastaan palvelimen hallinnoima sovitin voi määrittää kyseiset luotetut tunnisteet koodivain `trustedSource`-argumentin kautta; pyynnön JSON-kenttä ei voi välittää arvoa tähän argumenttiin. Transkription teksti säilyy epäluotettavana mediasta johdettuna sisältönä alkuperästään riippumatta, eikä se saa koskaan määrittää käyttöoikeuksia.

Edistynyt kutsuja voi antaa samalle videolle `audioTranscript`-raidan; sitä käsitellään asiakkaan toimittamana tekstinä, ei todisteena palvelimen tekemästä transkriptiosta. Yhdistämisrajapinta suorittaa visuaaliset ja äänestä saadut havainnot yhden aikarajan ja keskeytyssignaalin alaisina, järjestää ne yhteiselle aikajanalle, yhdistää täsmälleen päällekkäiset havainnot ja ilmoittaa osittaisesta tuloksesta, jos vain toinen puoli onnistuu. Virheellinen `audioTranscript` palautuu osittaiseksi tulokseksi — visuaalinen kuvaus säilytetään ja äänihaara kirjaa puhdistetun virhekoodin — sen sijaan, että koko video epäonnistuisi. Haarakohtainen saatavuus, osittaisuuslippu ja puhdistetut virhekoodit säilytetään kuvatussa tuloksessa, suojauksen metatiedoissa (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), tulosvälimuistin metatiedoissa ja sillan yhdistämislaskureissa. Video Bridgen oletuspolku ei kutsu puheentunnistusta eikä lataa toista mediakopiota; ilman kyseistä nimenomaista raitaa se käsittelee edelleen vain videota.

**Transkription säilytys (#12150 P1).** Tätä sovelletaan automaattisesti aina, kun Video Bridge (joka on itsessään valinnainen) renderöi transkription vihjeen — erillistä säilytyslippua ei ole. Kun pyyntö renderöi minkä tahansa transkription vihjeen (kutsujan ilmoittaman `transcript`-raidan tai yhdistetyn `audioTranscript`-raidan), suojaus merkitsee sen `videoBridgeObserved`-tunnisteella ja tuottaa videokuvauksesta peitetyn varjon — identtisen esityksen, jossa jokaisen vihjeen vapaatekstirunko korvataan arvolla `[redacted-video-transcript]`. Tämä rakennetaan korvaamalla rakenteinen vihjekenttä ennen merkkijonon kokoamista (ei jäsentelemällä litistettyä tekstiä, joten mikään vihjeen sisältö — vastakkainen tai tavallinen, mukaan lukien merkin `]` sisältävät rungot, kuten `[inaudible]`/`[music]` — ei voi säilyä). Pysyvä puhelokirjan pyynnön runko vaihtaa jokaisen videosta johdetun tekstiosan kyseiseen peitettyyn varjoon sisältöyhtäläisyyden perusteella; `fullText`-ankkuri luetaan uudelleen valmiista ennen kutsua muodostetusta suojauksen hyötykuormasta, joten osuma onnistuu edelleen myöhempien ketjun suojausten (PII- ja tunnistetietojen peittäjät, prioriteetit 10/95) kirjoittaessa kuvaustekstin paikalleen sekä järjestelmäkehotteen/luovutuksen/muistin injektion muokatessa viestitaulukkoa. Mallille upstreamiin lähetettävä runko säilyy muuttumattomana. Havaittu pyyntö ei myöskään täytä pysyvää Memory-muistia (sekä pyynnöstä että vastauksesta johdettu poiminta ohitetaan), joten mallin oma vastaus ei voi kaikuttaa transkription tekstiä Memory-muistiin.

**Raakavideokentät (#12430).** Kun silta on käytössä ja natiivi videotuki on tuntematon tai puuttuu, määritellyt `transcript`/`audioTranscript`-kentät aktivoivat myös `videoBridgeObserved`-tunnisteen, vaikka kuvauksen muodostaminen epäonnistuisi tai `maxVideos`-raja ylittyisi. `null` ja tyhjät merkkijonot lasketaan mukaan; puuttuvia kenttiä ja muuta kuin videota koskevia metatietoja ei lasketa. Säilytetyissä kopioissa nämä kentät peitetään tai pyyntö jätetään pois, ja välimuistit/Memory ohitetaan.

Näillä varapoluilla kelvollisista kutsujan vihjeistä tulee tuettuja `text`/`input_text`-osia epästandardien palveluntarjoajakenttien sijaan. Molemmat pyynnön mukana toimitetut raidat säilyvät epäluotettavina `client`-havaintoina, ja mukana on nimenomainen varoitus siitä, ettei videota kuvattu eikä aikaleimoja vahvistettu mediaa vasten. Olemassa olevat 256 vihjeen/64 KiB:n kokonais- ja vihjekohtaiset budjetit koskevat kahta raitaa yhdessä; aikaleimojen on mahduttava välittäjän 600 sekunnin enimmäisrajaan ja mahdolliseen annettuun kohdistusikkunaan. Virheelliset raidat hylätään eikä niitä välitetä mielivaltaisena tekstinä; kelvollista sisarraidetta voidaan silti käyttää, ellei niiden yhteenlaskettu budjetti ylity. Null-/tyhjät kentät eivät lisää tekstiä. Tämä varamenettely ei lisää median hakua tai transkriptiota. Transkription laajennuskentät poistetaan varamenettelyn videokantajasta sekä sen `video_url`/`source`-objekteista. OpenAI:n siirtomuodon sallittujen kenttien luettelo pysyy tiukkana; tuntemattomat natiivivideokantajat ovat edelleen käytettävissä ja tunnetut vain tekstiä tukevat kohteet säilyttävät turvalliset merkinnät. Rakenteiset peitevarjot suojaavat lisättyä transkriptiotekstiä, mutta alkuperäinen kutsujan omistama pyyntö säilyy muuttumattomana. Natiivisti tuetut kohteet ja käytöstä poistetut sillat säilyttävät nykyisen ohituskäyttäytymisensä.

Muut säilytettävät kopiot käyttävät samaa havaitun pyynnön signaalia. Raaka ennen suojausta otettu asiakaspyynnön tilannevedos, muistissa oleva odottava pyyntö ja aikainen hylättyjen pyyntöjen loki korvaavat videon osien transkriptiokentät rakenteisesti; putkivaiheiden ja kontekstin luovutuksen syntetisoimat merkkijonokehotteet peitetään pysyvän pyynnön rungon kohteessa. Pysyvä `video_content_removed`-merkintä saa `previous_response_id`-jatkamisen epäonnistumaan suljetusti sen sijaan, että tahallisesti hylätty teksti rekonstruoitaisiin. Jos havaittu pyyntö menettää osakohtaisen peitevarjonsa ennen lokiin kirjaamista tai edes yksi useista videovarjoista ei täsmää myöhempien pyynnön muutosten jälkeen, säilytettävä pyyntörunko jätetään kokonaan pois sen sijaan, että osittain peitetty transkriptio säilytettäisiin.

Havaitun pyynnön yhteydessä mallin vastaus voi lainata mitä tahansa osaa
litterasta ilman jäsenneltyä vihjerajaa. Sen pysyvässä puhelokissa oleva
`responseBody` korvataan puuttumismerkinnällä; yksityiskohtaista
putkistoartefaktia (joka voi sisältää upstream-/asiakasrunkoja ja
suoratoistopalasia) ei säilytetä. Semanttiset, idempotenssi- ja
päättelyn toistovälimuistit ohittavat tämän pyynnön luku- ja kirjoitustoiminnot.
Palveluntarjoajalle lähtevä pyyntö ja asiakkaalle näkyvä vastaus säilyvät
muuttumattomina. Varhaiset keepalive-tavut tyhjennetään väliaikaisesta puskurista,
kun yksityiskohtainen artefakti jätetään pois. Kiro-virheellisen EventStreamin
varoitus ilmoittaa vain hyötykuorman tavumäärän, ei koskaan sen sisältöä tai
JSON-jäsentimen raakaa virhettä.
Tämä ei tarkoita, että kaikki toisistaan riippumattomat palveluntarjoajan/laajennuksen
diagnostiikat olisi tarkastettu; laajempi säilyvien kohteiden läpikäyntiä seurataan
tunnisteella #11658.

Sisäinen `/api/modality-bridge/video/drilldown`-elinkaari on erillinen,
loopback-/token-autentikoitu välimuistokerros. Jokainen toiminto edellyttää myös
kanonista läpinäkymätöntä principal-tunnistetta. Ennen kuin tuotantokutsuja
otetaan käyttöön, tunniste on johdettava todennetusta tenantista, eikä
asiakkaan valitsemaa arvoa saa koskaan välittää eteenpäin. Välimuistiavaimet
sitovat kyseisen principalin kanonisiin istunto- ja videoviitetunnisteisiin,
tallentavat vain niiden SHA-256-pohjaiset avaimet ja rajaavat sekä luvut että
poistot samaan principaliin. Välimuistiin tallennetaan enintään 16 johdettua
JPEG-kuvaa merkintää kohden, ne vanhenevat kymmenen minuutin kuluttua, ja
tuettuina ovat rajatut `start`/`end`-luvut tai istunnon nimenomainen poisto.

Kullekin principalille sallitaan enintään 16 merkintää ja 64 MiB kanonista
JPEG-dataa. Nämä rajat ovat erillisiä globaalista 64 merkinnän/256 MiB:n
ylärajasta: principalin kiintiöpaine poistaa ensin vain kyseisen principalin
vähiten äskettäin käytetyt merkinnät, ennen kuin globaalia LRU-poistoa harkitaan.
Vanhentuneet merkinnät siivotaan sekä principal- että globaalista kirjanpidosta
välimuistin toiminnan yhteydessä, kun taas peruutus ja kelpoisuuden tarkistuksen
epäonnistuminen eivät vahvista osittaista korvausta.

Välimuisti hylkää ei-kanonisen Base64:n, ylimääräisen täytön, muun kuin JPEG-median,
virheelliset tai katkaistut JPEG-kuvat sekä JPEG-kuvat, jotka tuottavat varoituksen
rajatussa täyden kuvan `sharp`-dekoodauksessa. Se koodaa jokaisen hyväksytyn kuvan
uudelleen kanoniseksi JPEG-kuvaksi, johtaa leveyden ja korkeuden dekoodatuista tavuista
sen sijaan, että luottaisi kutsujan kenttiin, ja hylkää mahdolliset polyglottien
lopputavut niiden säilyttämisen sijaan. Kiintiöihin lasketaan vain rajattu kanoninen
pakattu puskuri. JSON-johtoraja sisältää Base64-ylikustannuksen 32 MiB:n
dekoodatun syötteen ylärajassa. Jokainen
tallennettu johdannainen sisältää vahvistetun JPEG-muodon/resoluution,
näytteenottokäytännön, johdannaisversion, luontiajan, palvelimen laskeman
sisältötiivisteen sekä tiivistetyn emoviitteen ja luotetun kutsujan emosisällön
tiivisteen. Peruutus tarkistetaan asynkronisten dekoodaus-/tiivistevaiheiden välillä
ennen atomista välimuistivahvistusta.

Tuotantotuottaja käyttää jo johdettuja välittäjän kehyksiä uudelleen vasta
onnistuneen visuaalisen analyysin jälkeen, eikä lataa tai pura videota toistamiseen.
Se edellyttää operaattorin asetusta
`modalityBridgeVideoDrilldownEnabled=true`, osakohtaista tiukkaa ehtoa
`drilldown: true` ja todennetun API-avaintietueen tunnistetta. Asiakkaan
ilmoittamat principal-/istuntoarvot eivät koskaan vahvista omistajuutta. Ilman
kaikkia kolmea ehtoa se ei tiivistä, muuta kokoa tai säilytä lisäkehyksiä.
Säilytyksen epäonnistuminen säilyttää käyttökelpoisen visuaalisen vastauksen.
Suostumuksen antaneet pyynnöt ohittavat koko videon tulosvälimuistin, joten
välimuistoidut tulokset eivät koskaan toista kahvoja.

Onnistuneet JSON- ja SSE-vastaukset paljastavat enintään neljä läpinäkymätöntä
kahvaa rajatussa
`x-omniroute-video-drilldown`-otsakkeessa. Valtuutetut selainalkuperät voivat
lukea kyseisen otsakkeen laajentamatta CORS-alkuperäkäytäntöä. Uudet kahvat
käyttävät muotoa `v1.<32-byte random base64url
token>`, ja rekisteri säilyttää vain niiden SHA-256-tiivisteet.
Lukija-/otsakejäsennin hyväksyy myös vanhat 64 heksadesimaalin tunnukset.
Todennettu julkinen kuluttaja on
`GET /api/v1/video-bridge/drilldown?handle=...`, ja sen käyttö on erikseen
rajattu asetuksella
`modalityBridgeVideoDrilldownRemoteEnabled=true`. Nimenomaisesti tallennettu arvo
false kumoaa käytön, vaikka vanha
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED`-ympäristövarmistus olisi
käytössä. Tuotannon säilytyksellä on vastaava vanha varmistus
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Molemmat varmistukset ovat oletusarvoisesti
poissa käytöstä.

Kuluttaja johtaa omistajuuden todennetusta avaimesta ja soveltaa avainkäytäntöä:
sekä GET että DELETE kuuluvat `video`-päätepisteluokkaan, mukaan lukien `/v1`-
ja `/api/v1`-aliakset. Avainten, joiden päätepisteiden sallittujen luettelo ei ole
tyhjä, on sisällettävä `video`; rajoittamattomat avaimet pysyvät yhteensopivina.
Kuluttaja palauttaa saman 404-vastauksen tuntemattomille, vanhentuneille ja
toisen avaimen kahvoille. Se hyväksyy
`variant=preview|standard|detail`-arvot (JPEG-kuvan enimmäismitat 320/640/1280,
ei koskaan suurenneta), `limit=1..8`-arvon (tai vanhan `frames`-aliaksen, ei koskaan
molempia), nollapohjaisen `page`-arvon sekä valinnaiset `start`/`end`-kohdistussekunnit.
Kaksinkertaiset kyselyavaimet ja käänteiset kohdistusikkunat hylätään. Jokaisella
palautetulla variantilla on sen todellisen sisällön tiiviste ja todellisen
resoluution metatiedot, jotka on linkitetty säilytettyyn lähteeseen. Variantit
johdetaan lukemisen yhteydessä sen sijaan, että ne tallennettaisiin ylimääräisinä
säilytettävinä kopioina. JSON-vastauksen, Base64- ja päällysterakenteet mukaan
lukien, enimmäiskoko on 32 MiB; liian suuri sivu palauttaa 413:n, ja asiakkaan on
pyydettävä vähemmän kehyksiä. Luvut tarkistavat peruutuksen jokaisen koonmuutoksen
ympärillä ja tarkistavat kahvan kelvollisuuden uudelleen ennen palautusta.
Omistajan tekemä `DELETE` on idempotentti; poisto tai TTL:n vanheneminen vapauttaa
säilytetyn lähteen ja käyttökirjanpidon.

Jaettu säilö on prosessikohtainen: kahvat vanhenevat uudelleenkäynnistyksen
yhteydessä, eikä niitä voi siirtää itsenäisten OmniRoute-prosessien välillä.
Hallintotilastot paljastavat voimassa olevan säilytys-/etäkäytännön ja säilytettyjen
merkintöjen/tavujen yhteenlasketut määrät, mutta eivät koskaan mediaa, viitteitä,
principal-tunnisteita tai kahvoja. Video-asetuspaneeli näyttää nämä arvot ja voi
tallentaa molemmat suostumusvalinnat. Tämä toteutusdokumentaatio ei ole tuotantoon
asentamisen tai käyttöönoton näyttöä; todellisen mallin hyväksyntää seurataan
erikseen.

Kehykset kuvataan peräkkäin määritetyllä Video-mallilla. Tyhjä
Video-ohitus perii Vision-asetuksen; jos molemmat ovat tyhjiä, Visionin
automaattinen reititin valitsee tehokkaan näkökykyisen mallin. Onnistuneet
kuvaukset korvaavat alkuperäisen osan vakaalla `[Video description:`-etuliitteellä,
joka myös merkitsee tekstin epäluotettavaksi mediasta johdetuksi havainnoksi ja
ohjeistaa seuraavia malleja olemaan noudattamatta mediasta löytyviä ohjeita.
Kehyskuvausten välimuistiavaimet sisältävät JPEG-tavut, kehotteen, aikaleiman ja
tehokkaan mallin; vain onnistuneet kuvaukset tallennetaan välimuistiin.
Välimuistimerkinnät säilyttävät todellisen onnistuneen tuottajamallin, mukaan
lukien varamallin; silta ilmoittaa arvon `mixed`, kun eri kehykset on tuotettu
eri malleilla. Välimuistiosuma käyttää uudelleen kyseisen tuottajan identiteettiä
sen sijaan, että se nimeäisi sen uudelleen pyydetyksi reitityssuunnitelmaksi.
Koko videon tulosvälimuistin avain muodostetaan kaikista tulokseen vaikuttavista
syötteistä — kehotteesta, tehokkaasta mallista, otantakäytännöstä, kehysten
määrästä, semanttisesta analyysitilasta, normalisoidun tarkennusvihjeen
SHA-256-sormenjäljestä, tarkennusikkunasta, kentistä `transcript`,
`audioTranscript` ja yhteystietoruudukon lipusta — joten minkä tahansa näistä
ulottuvuuksista muuttaminen aiheuttaa välimuistihudin eikä koskaan vanhan
tuloksen virheellistä uudelleenkäyttöä. Visuaalisen deduplikointikäytännön
versio, kynnysarvo ja rajattu ehdokaskehysten määrä ovat myös eksplisiittisiä
tulosvälimuistin avaimessa ja metatiedoissa; käytännön muutos ei siksi voi
käyttää uudelleen vanhentunutta koko videon kuvausta. Tulosvälimuistin v4-metatiedot
säilyttävät tilan ja sormenjäljen, eivät koskaan raakaa käyttäjän tehtävää.
Suojauksen metatiedot ilmoittavat sekä pyydetyn että tehokkaan analyysitilan;
pyydetty `focused`-tila ilman käyttökelpoista käyttäjätekstiä ilmoitetaan
tehokkaasti `full`-tilana.

Suojaus poimii jokaisen tuetun video-osan, mutta kuvaa enintään
`modalityBridgeVideoMaxVideos` videota. Jos kohteella todistetusti on
`supportsVideo === false`, epäonnistuneet ja enimmäismäärän ylittävät videot
muutetaan eksplisiittisiksi turvallisiksi tekstimerkinnöiksi, jotta raakaa
videota ei säily. Kun ominaisuus on tuntematon, kyseiset osat säilyttävät
videokantajansa; mahdollinen varatekstitys noudattaa edellä kuvattua rajattua
tekstimuunnosta. Kohteet, joilla on `supportsVideo === true`, ohittavat sillan.
Asiakaspyynnön keskeytyssignaali välittyy latauksen, välittäjäjonon,
aliprosessien ja kuvauspyyntöjen läpi; keskeytykset pysäyttävät käsittelyn
videoiden välillä eivätkä koskaan salli raakamediaan putoamista.

Ajoaikaiset asetukset tallennetaan tietokantaan ja validoidaan Zodilla:

| Avain                               | Oletusarvo  | Alue / toiminta                                                                                                     |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Valinnainen ajoaikainen asetus, käyttöönotto erikseen                                                               |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` säilyttää yleiset kuvaukset; `focused` käyttää rajattua, epäluotettavaa viimeisintä käyttäjäkontekstia       |
| `modalityBridgeVideoModel`          | `""`        | Perii Vision Bridge -mallin                                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` tai suhteellinen `segment_aware`; tunnistimen epäonnistuessa käytetään `uniform`-käytäntöä |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                      |

Vanhat, pysyvästi tallennetut yli 120 sekunnin Video-aikakatkaisuarvot
rajoitetaan välittäjän määräaikaan; uudet asetuskirjoitukset tämän rajan yli
hylätään. `GET /api/modality-bridge/video/runtime` edellyttää luotettua,
leimattua loopback-paikallisuutta ennen todennusta tai ajoaikaisia tarkistuksia,
minkä jälkeen se edellyttää hallintotodennusta. Se palauttaa vain kentät
`available`, puhdistetut FFmpeg/ffprobe-versiot sekä kiinteän syyn, kun ajoaika
ei ole käytettävissä. Sisäinen poiminnan päätepiste ei ole julkinen
lähetys-API: jonon täyttyminen palauttaa arvon `503` ja `Retry-After`-otsakkeen,
soittajan yhteyden katkeaminen palauttaa arvon `499`, ja kiinteä välittäjän
määräaika palauttaa arvon `504`. Muunnetut vastaukset lisäävät keskitettyyn
`x-omniroute-modality-bridge`-otsakkeeseen arvon
`video->text;model=<visionModel>;parts=<videos>` poistamatta Vision- tai
Audio-osuuksia.

### PII-peitin (`piiMasker.ts`)

Suoritetaan **molemmissa** vaiheissa.

- **`preCall`** kloonaa hyötykuorman, käy läpi kentät `system`, `messages`, `input` ja
  `prompt` (mukaan lukien tavalliset merkkijonokohteet) ja käyttää
  `processPII()`-funktiota (osoitteesta `@/shared/utils/inputSanitizer`)
  merkkijonoarvoisiin `content`- ja `text`-kenttiin. Kun
  `PII_REDACTION_ENABLED=true`, havaittu henkilötieto peitetään lähtevän
  hyötykuorman sisällöstä. Tämä on riippumatonta asetuksesta
  `INPUT_SANITIZER_MODE` (joka hallitsee vain kehoteinjektioiden käytäntöä).
  Kun peittäminen ei ole käytössä, kutsu tallentaa havaintomäärät muuttamatta
  sisältöä.
- **`postCall`** kloonaa vastauksen syväkopiona, suorittaa
  `sanitizePIIResponse()`-funktion sekä Responses-API-muodon peittimen
  (`maskResponsesOutput` — kattaa kentät `output_text` ja
  `output[].content[].text`). Jos peittämistä tapahtuu, muokattu vastaus
  korvaa alkuperäisen.

Suojaus ei koskaan estä; se ainoastaan lisää merkintöjä
(`meta.detections`, `meta.redacted`) tai kirjoittaa sisältöä uudelleen.

**Palautettava holvi (`PII_REVERSIBLE_VAULT_ENABLED`, oletusarvo `false`).** Kun sekä
`PII_REDACTION_ENABLED` että `PII_REVERSIBLE_VAULT_ENABLED` ovat käytössä (DB-ohitus >
ympäristömuuttuja > oletusarvo, luetaan kerran pyyntöä kohden), `handleChat` avaa yhden holvin
asiakaspyyntöä kohden (`src/lib/pii/requestTokenVaultScope.ts`) ja välittää sen
esikutsuvaiheelle muodossa `GuardrailContext.tokenVault`. Peitekirjoitin kirjoittaa tällöin
esimerkiksi korvaavia tunnisteita `<<PII_EMAIL_QWERTYUI_1>>` merkkijonon `[EMAIL_REDACTED]`
sijaan sekä sisäänrakennettujen, validoitujen (GDPR/POPIA) että mukautettujen sääntöjen kohdalla.
Nonce on pyyntökohtaisesti 8 satunnaista isoa kirjainta, ja sama arvo saa saman tunnisteen
pyynnön aikana. Vain peitekirjoitin luo tunnisteita: injektiohyökkäysten suojaus ja
`/api/guardrails/test` toimivat ilman holvia ja säilyttävät paikkamerkit.

- Palveluntarjoaja, jokainen yhdistelmän osa, uudelleenyritys, fuusiopaneelin jäsen ja fuusiotuomari
  näkevät vain tunnisteet. Tunnisteet palautetaan kerran, `handleChat`-kutsusta poistuvassa 2xx-vastauksessa:
  jäsennetyn SSE:n kenttäkohtaisesti (myös tapahtumien välillä jaettu tunniste ratkaistaan;
  työkalukutsujen argumentit ovat JSON-escapettuja) tai JSON-rungon kenttäkohtaisesti, ja
  `Content-Length` lasketaan uudelleen. Sisältö- ja päättelyteksti sekä työkalukutsujen argumentit
  palautetaan. Virherungot (4xx/5xx) säilyttävät tunnisteet.
- Virheet pysyvät yksityisinä: jos tunnisteen luonti epäonnistuu tai holvi kieltäytyy arvosta
  (1 000 merkintää, 256 merkkiä arvoa kohden, yhteensä 64 kt), sen sijaan kirjoitetaan
  paikkamerkki; tunniste, jota holvi ei pysty ratkaisemaan, tai epäonnistunut palautus säilyy
  sellaisenaan ja vain lukumäärä kirjataan lokiin. Holvissa ei ole ajastimia eikä globaalia tilaa;
  se tyhjennetään, kun vastausvirta päättyy, peruutetaan tai kohtaa virheen.
- Kun pyyntö on luonut tunnisteita, muistin poiminta, idempotenssitallennus ja molemmat
  semanttisen välimuistin kirjoitukset ohitetaan, koska mikään myöhempi pyyntö ei voisi ratkaista
  kyseisiä tunnisteita. Kutsulokeissa palveluntarjoajan pyyntö ja vastaus sisältävät tunnisteet;
  lokiin kirjattu asiakaspyynnön runko sisältää edelleen raakasyötteen, kuten tavallisessa
  peitossa.
- Tunnisteet käyttävät pyyntökohtaista satunnaista noncea, joten kehotteen etuliite muuttuu joka
  vuorolla: palveluntarjoajan puolen kehotteiden välimuisti ei osu peitettyihin vuoroihin, ja
  myöhemmällä vuorolla (esimerkiksi `previous_response_id`-arvon kautta) palautuva tunniste kuuluu
  vanhaan pyyntöön ja säilyy sellaisenaan.

#### Tyypeittäin valinta, mukautetut mallit ja tunnistuksen laskurit

**Hallintapaneeli → Asetukset → Tietoturva → PII-peittäminen** määrittää, _mitä_ peitetään. Se
ei ota peittämistä käyttöön: siitä vastaavat edelleen `PII_REDACTION_ENABLED` (pyyntö) ja
`PII_RESPONSE_SANITIZATION` (vastaus + SSE), jotka ovat oletusarvoisesti poissa käytöstä.

- **Tyypeittäin valinta** — sisäänrakennetut tunnukset on lueteltu tiedostossa
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Määrittämätön tarkoittaa kaikkia
  tyyppejä (toiminta ennen tämän asetuksen olemassaoloa). Pyyntömoottorin `ssn_us`-malli
  yhdistyy tyyppiin `ssn`. Mallit (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA,
  Full) täyttävät käyttöliittymässä vain valintaruudut.
- **GDPR- ja POPIA-tunnisteet** — kaksitoista sisäänrakennettua tunnusta, jotka kattavat EU:n
  ja Etelä-Afrikan henkilötunnisteet (taulukko alla). Niiden säännölliset lausekkeet,
  validoijat ja lainkäyttöaluetunnisteet sijaitsevat yhdessä taulukossa,
  `src/shared/utils/piiPatterns.ts`, jota sekä vastauksen puhdistaja
  (`src/lib/piiSanitizer.ts`) että pyynnön peitekirjoitin
  (`src/shared/utils/inputSanitizer.ts`) käyttävät. Osuma peitetään vain, kun sen validoija
  hyväksyy sen; pelkkä numerosarja ei koskaan riitä. Operaattori, joka tallensi suppeamman
  valinnan ennen näiden tunnusten olemassaoloa, säilyttää aiemman toiminnan, kunnes uudet
  tunnukset valitaan.
- **Mukautetut mallit** — enintään 20 säännöllistä lauseketta tai jokerimerkkimallia
  (`*` = enintään 64 välilyönnitöntä merkkiä, `?` = yksi). Osumat muuttuvat muotoon
  `[CUSTOM_REDACTED]`. Jokainen malli käsitellään
  `compilePiiCustomPattern()`-funktion kautta
  (`src/shared/utils/piiCustomPatterns.ts`): enintään 500 merkkiä, liput rajattu joukkoon
  `g i m s u`, käännöksen on onnistuttava, mallin on läpäistävä `safe-regex`-tarkistus
  (katastrofaalinen takaisinkelaus), eikä se saa osua tyhjään merkkijonoon tai peittämisen
  paikkamerkkiin. Hylätty malli torjutaan tallennuksen ja testauksen yhteydessä, ja
  ajonaikana tallennettu rivi, joka ei läpäise tarkistusta, ohitetaan sen sijaan, että se
  käännettäisiin. Mukautetut mallit toimivat vain, kun peittäminen on käytössä.
- **Tunnistuksen laskurit** — tyyppikohtaiset määrät (koskaan ei osuneita arvoja), joita
  säilytetään muistissa ja jotka nollataan uudelleenkäynnistyksen yhteydessä
  (`src/lib/pii/piiDetectionStats.ts`). Niitä kasvatetaan vain, kun peittäminen on käytössä.

Asetukset sijaitsevat `key_value`-taulussa (nimiavaruus `pii_settings`,
`src/lib/db/piiSettings.ts`), ja ne luetaan 1 sekunnin välimuistin kautta. API:

| Menetelmä | Polku                    | Tarkoitus                                                                               |
| --------- | ------------------------ | --------------------------------------------------------------------------------------- |
| `GET`     | `/api/settings/pii`      | Lipun tila, `enabledTypes`, `customPatterns`, tunnistuksen laskurit                     |
| `PUT`     | `/api/settings/pii`      | Korvaa `enabledTypes`-arvon (`null` = kaikki) ja/tai `customPatterns`-arvon             |
| `POST`    | `/api/settings/pii/test` | Testaa yhden mallin kuivaharjoitteluna enintään 8 kt:n näytteellä; mitään ei tallenneta |

Kaikki kolme edellyttävät hallinnan todennusta, ja rungon kelpoisuus tarkistetaan Zodilla
(`src/shared/validation/schemas/piiSettings.ts`). Kun kirjautuminen on poistettu käytöstä
(`requireLogin=false`), `GET` ja testipäätepiste ovat avoimia, mutta `PUT` edellyttää edelleen
hallintapaneelin istuntoa, `manage`-laajuuden API-avainta, vähintään kirjoituslaajuuden
`oma_`-käyttöoikeustunnusta tai komentorivin tunnusta tai sisäisen palvelun tunnusta, joka
lähetetään loopback-osoitteesta.

#### GDPR (EU) - ja POPIA (Etelä-Afrikka) -tunnisteet

| Tunnus              | Tunniste                    | Validointi                                                                                                            |
| ------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                        | Tunnettu maa, kyseisen maan tarkka pituus, ISO 13616 MOD-97-10                                                        |
| `eu_vat`            | EU:n ALV-numero             | Tunnettu jäsenvaltion etuliite ja kyseisen valtion numeromuoto (ei VIES-hakua)                                        |
| `es_dni_nie`        | Espanjan DNI / NIE          | Tarkistuskirjain (arvo mod 23); NIE on `X/Y/Z` + 7 numeroa                                                            |
| `it_codice_fiscale` | Italian Codice Fiscale      | Tarkistuskirjain parittomien/parillisten sijaintien taulukoista                                                       |
| `pl_pesel`          | Puolan PESEL                | Painotettu tarkistussumma ja koodattu olemassa oleva syntymäaika                                                      |
| `nl_bsn`            | Alankomaiden BSN            | 11-tarkistus (painot 9..2, -1)                                                                                        |
| `de_steuer_id`      | Saksan Steuer-ID            | ISO 7064 Mod 11,10 sekä numerorakenteen säännöt (ei alussa olevaa nollaa)                                             |
| `se_personnummer`   | Ruotsin personnummer        | Luhn-tarkistus kymmenelle viimeiselle numerolle ja kelvollinen syntymäaika (10 tai 12 numeroa)                        |
| `za_id`             | Etelä-Afrikan henkilötunnus | Luhn-tarkistus kaikille 13 numerolle, kelvollinen syntymäkuukausi/-päivä, kansalaisuuden numero 0 tai 1               |
| `za_phone`          | Etelä-Afrikan puhelinnumero | Etuliite `+27` / `27` tai kansallinen `0..`-muoto välilyönnillä tai yhdysmerkillä                                     |
| `za_vat`            | Etelä-Afrikan ALV-numero    | 10 numeroa, jotka alkavat numerolla `4`, **ja** merkkijono "VAT" / "BTW" edeltävissä 48 merkissä                      |
| `za_tax_ref`        | Etelä-Afrikan veroviite     | 10 numeroa, jotka alkavat numerolla `0`–`3`, Luhn-tarkistus, **ja** merkkijono "tax" / "SARS" edeltävissä 48 merkissä |

Koska pelkistä numeroista koostuvat muodot sekoittuvat tilausnumeroihin,
koontiversionumeroihin ja aikaleimoihin, heikoimmat tunnisteet (`za_vat`,
`za_tax_ref`) tarvitsevat avainsanan, eikä paljasta kymmennumeroista `0..`-numeroa
käsitellä eteläafrikkalaisena puhelinnumerona. Välilyönneillä kirjoitettuja IBAN-numeroita
(`GB29 NWBK ...`) ei tunnisteta. Suoratoistopolulla vihjettä etsitään vain nykyisestä
palasta. Tunnisteet ovat yleisten puhelinnumeromallien edellä, joten validoitu tunniste
säilyttää oman paikkamerkkinsä
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr`- ja `popia`-mallit
valitsevat vastaavasti EU:n ja Etelä-Afrikan tunnisteet. Peittäminen on edelleen
valinnaista (Hard Rule #20): mikään tässä ei muuta ominaisuuslipun oletusarvoa.

### Kehotteen injektointi (`promptInjection.ts`)

Tunnistaa käyttäjän toimittaman sisällön vastakkainasettelurakenteet ja noudattaa
määritettyä käytäntöä. Toimintaa ohjataan ympäristömuuttujilla ja konstruktorin
asetuksilla:

| Asetus     | Ympäristömuuttuja                                                                                     | Oletusarvo | Vaikutus                                                                                                                                                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Käytössä   | `INPUT_SANITIZER_ENABLED`                                                                             | `true`     | Kun arvo on `false`, suojamekanismi ohittaa käsittelyn.                                                                                                                                                                         |
| Tila       | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`     | Injektiokäytäntö: `block`, `warn` tai `log`. (`redact` hyväksytään taaksepäin yhteensopivuutta varten, mutta se **ei** poista injektoitua tekstiä; pyynnön henkilötietojen uudelleenkirjoitusta ohjaa `PII_REDACTION_ENABLED`.) |
| Estokynnys | `blockThreshold`-asetus / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | Estämiseen vaadittava vähimmäisvakavuus. Oletusarvolla keskitaso on vain seurattava.                                                                                                                                            |

**Tilojen ensisijaisuusjärjestys** (`getMode`): kutsujan `options.mode` →
`INJECTION_GUARD_MODE` **tietokannan ominaisuuslipun ohitus** (Hallintapaneeli → Asetukset →
Ominaisuusliput) → `INJECTION_GUARD_MODE`-ympäristömuuttuja →
`INPUT_SANITIZER_MODE`-ympäristömuuttuja → `warn`. Hallintapaneelin ohitus voittaa
siksi ympäristömuuttujat, joten Ominaisuusliput-käyttöliittymä ohjaa käynnissä olevaa
suojamekanismia reaaliaikaisesti (uudelleenkäynnistystä ei tarvita). Tietokantaluku on
vikaturvallinen: jos se epäonnistuu, suojamekanismi palaa ympäristömuuttujiin
perustuvaan toimintaan, ja kun ohitusta ei ole asetettu, toiminta on sama kuin
vain ympäristömuuttujiin perustuvassa ratkaisussa.

Tunnistuslähteet:

1. `sanitizeRequest()` paketista `@/shared/utils/inputSanitizer` (jaettu tunnistusjoukko,
   jota käytetään muualla käsittelyputkessa).
2. Sisäänrakennetut `DEFAULT_GUARD_PATTERNS`-mallit (tällä hetkellä `system_override_inline` ja
   `markdown_system_block`, molemmat vakavuudeltaan `high`).
3. Konstruktorin asetuksilla välitettävät valinnaiset `customPatterns`-mallit (merkkijonot, säännölliset lausekkeet
   tai `{ name, pattern, severity }`-tietueet).

Kun `mode === "block"` **ja** vähintään yksi tunnistus saavuttaa vakavuuskynnyksen,
`preCall` palauttaa `{ block: true, message: "Request rejected:
suspicious content detected" }`. `warn`- ja `log`-tiloissa suojamekanismi kirjaa
tapahtuman mutta sallii kutsun. Jaettu apufunktio `evaluatePromptInjection()` viedään
myös vientiin kutsujille, jotka tarvitsevat kehotteiden arviointia ilman rekisterin kautta kulkemista.

**Skannauksen raja (v3.8.20):** tunnistin tarkastaa vain yhdistetyn
kehotetekstin **ensimmäiset 16 KB** — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 tavua)
tiedostossa `src/shared/utils/inputSanitizer.ts`. Sekä
`detectInjection()` että `evaluatePromptInjection()` suorittavat
`slice(0, MAX_INJECTION_SCAN_BYTES)` ennen kuviokierroksen suorittamista.
Injektio-ohjeet sijaitsevat syötteen lähellä alkua, joten tämä rajoittaa
satojen kilotavujen hyötykuormien regex-suorittimen ja GC:n kuormitusta
heikentämättä tunnistusta (vrt. #3932, #4041).

### Tunnistetietojen peittäjä (`credentialMasker.ts`)

Suoritetaan **molemmissa** vaiheissa, oletusketjun viimeisenä (prioriteetti
`95`). Poistaa yleisesti tunnettujen API-avainten / salaisuustunnisteiden
mallit lähtevästä hyötykuormasta (viestin sisältö, työkalukutsujen argumentit,
työkalujen tulokset) **ja palveluntarjoajan vastauksesta**, jotta kehotteeseen
liitetty tunnistetieto (tai työkalun tuloksen takaisin palauttama tunnistetieto)
ei vuoda ylävirran palveluntarjoajalle tai takaisin asiakkaalle.

- **Vain erikseen käyttöön otettava**, sama käytäntö kuin henkilötietojen
  poistossa (Hard Rule #20:n tapaan): poissa käytöstä, ellei
  `settings.credentialRedactionEnabled === true` **tai**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kun se on poistettu käytöstä, suojakaide
  ei tee mitään — se ei koskaan estä eikä kirjoita mitään uudelleen.
- `redactCredentials()` käy läpi koko hyötykuorma-/vastauspuun
  (`walkValue()`; prototyyppisaastumiselta suojattu ja syklitön `WeakSet`-joukon
  avulla) ja korvaa osumat `[REDACTED:<type>]`-paikkamerkillä kloonaten vain
  ne haarat, joissa tapahtui muutos.
- `CREDENTIAL_PATTERNS` kattaa LLM-palveluntarjoajien avaimet (OpenAI,
  OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS-tunnisteet
  (GitHub, Slack, Linear, Notion, npm, Postman, Discord), maksupalvelujen
  avaimet (Stripe, Square), pilvipalveluavaimet (AWS access key, Twilio,
  SendGrid, Mailgun), yksityisavaimet / JWT:t, tunnistetietoja sisältävät
  yhteysmerkkijonot (`mongodb://user:pass@...` jne.) sekä yleisen
  `Authorization`-/`x-api-key`-/`api-key`-/`apikey`-otsikkoarvon
  tunnistusmallin. Otsikon muotoiset avaimet (`authorization`, `x-api-key`,
  `api-key`, `apikey`) poistetaan rakenteellisesti (vain arvo; skeeman etuliite,
  kuten `Bearer `/`Basic `, säilytetään) yleisen tekstiregexin sijaan.
- Suojakaide ei koskaan estä; se ainoastaan kirjoittaa uudelleen
  (`modifiedPayload` / `modifiedResponse`) ja lisää merkinnät
  (`meta.credentialsRedacted`, `meta.count`).

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

## Kattavuus ja rajoitukset

Suojarekisteri on kytketty vain chat-putkeen. Nämä rajoitukset on vahvistettu testeillä
`tests/unit/guardrail-pipeline-wiring-characterization.test.ts` ja
`tests/unit/guardrail-pipeline-characterization.test.ts`; päivitä kyseisiä testejä
tarkoituksella, kun toiminta muuttuu.

### Missä hookit suoritetaan

| Hook / ohjaus                        | Suoritetaan                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                    | `handleChat`-käsittelijän käsittelemille pyynnöille (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (ja `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` ja Telegram-chat-välityspalvelin. Lisäksi koontinäytön testipäätepisteelle `/api/guardrails/test`. Pre-call-esto palauttaa HTTP 400 -vastauksen. |
| `runPostCallHooks`                   | Vain **ei-suoratoistettaville** chat-vastauksille (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Suoratoistetut vastaukset eivät koskaan saavuta sitä.                                                                                                                                                                                                                                                                                                        |
| Suoratoiston PII                     | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), joka liitetään `streamingPipeline.ts`-putkeen, kun `PII_RESPONSE_SANITIZATION` on käytössä. Se ei ole suojakaide, joten käytöstäpoistokanavat eivät vaikuta siihen.                                                                                                                                                                                                                                      |
| PII:n palautettava holvi             | Vain `handleChat`-käsittelijän käsittelemille pyynnöille, kun `PII_REDACTION_ENABLED` ja `PII_REVERSIBLE_VAULT_ENABLED` ovat käytössä. Tunnisteet luo `pii-masker`-pre-call ja palauttaa `handleChat`-käsittelijän lopetus (`src/lib/pii/requestTokenVaultScope.ts`). Pyynnön `pii-masker`-toiminnon käytöstä poistaminen tarkoittaa, ettei mitään luoda.                                                                                                              |
| Injektiovalvonnan middleware (vanha) | Jokaiselle promptin sisältävälle `/v1`-reitille, chat-perhe mukaan lukien (katso [reittikattavuus](#injection-guard-route-coverage--red-team-phase-8--block-d)). Vain prompt-injektiot.                                                                                                                                                                                                                                                                                |

### Mitä ei kateta

- **Media-, upotukset- ja datareitit** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) eivät koskaan saavuta rekisteriä. Ei
  PII-peittämistä, tunnistetietojen peittämistä tai modaliteettisillan suoritusta
  tapahdu siellä. Niiden ainoa tarkistus on vanha injektiovalvonnan middleware.
- **Suoratoistetut vastaukset** eivät saa post-call-suojakaiteita: ei
  `pii-masker`- tai `credential-masker`-post-call-käsittelyä eikä post-call-estoa. Vain suoratoiston PII-
  muunnos koskee niitä (kun `PII_RESPONSE_SANITIZATION` on käytössä). Suoratoistetussa vastauksessa
  takaisin toistettua tunnistetietoa ei peitetä.
- **Käytöstäpoistokanavat suhteessa middlewareen (suunniteltu toiminta):** middleware arvioi prompt-injektion omalla `evaluatePromptInjection()`-kutsullaan välittämättä mitään kutsujan hallitsemaa käytöstäpoistolistaa. `block`-tila on pakollinen rajapinta, jota kutsujan hallitsemat käytöstäpoistot eivät voi ohittaa, myöskään chat-perheen reiteillä
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). `prompt-injection`-toiminnon käytöstä poistaminen ohittaa vain rekisterin suojakaiteen.

### Mitä näkee vastauksen ennen post-call-käsittelyä

Ei-suoratoistopolulla järjestys on: muistin poiminta → sisäänrakennettu työkalun
suoritus → post-call-suojakaiteet → post-call-eston lopetus → semanttisen välimuistin tallennus.

- **Muistin poiminta** ja **työkalun suoritus** näkevät vastauksen ennen kuin post-call-suojakaiteet
  voivat muuttaa tai estää sitä. [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401)-muutoksen jälkeen muistin
  poiminta suorittaa poimitun tekstin `sanitizePII`-käsittelyn läpi, kun
  `PII_RESPONSE_SANITIZATION` on käytössä (sekä suoratoistossa että ei-suoratoistossa), mutta
  vastaus, jonka post-call-käsittely myöhemmin estää, on silti jo tarjottu muistille ja työkaluille.
- **Semanttinen välimuisti** tallentaa vastauksen post-call-käsittelyn jälkeen, joten se tallentaa
  muutetun vastauksen, eikä estettyä vastausta koskaan tallenneta välimuistiin. Välimuistimerkinnät
  yksilöidään API-avaimen mukaan.

## Kokoonpano

Sisäänrakennettujen suojamekanismien lukemat ympäristömuuttujat:

| Muuttuja                              | Käytössä                   | Vaikutus                                                                                                                      |
| ------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Aseta arvoksi `false`, jos haluat poistaa tunnistuksen kokonaan käytöstä.                                                     |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Injektiokäytäntö: `warn`, `block` tai `log`. Vanha arvo `redact` ei kirjoita injektiotekstiä uudelleen.                       |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Injektiosuojan tila; toimii myös tietokannan ominaisuuslippuna, joka **ohittaa** ympäristömuuttujat (DB > ENV).               |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Vähimmäisvakavuus, jonka `MODE=block` hylkää: `high` (oletus), `medium` tai `low`.                                            |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Vanha alias muuttujalle `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                    |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Kun arvo on `true`, pyynnön PII peitetään injektiotilasta riippumatta.                                                        |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Kun `PII_REDACTION_ENABLED` on käytössä, luodaan palautettavat tunnisteet ja palautetaan alkuperäiset arvot 2xx-vastauksissa. |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream)  | Ohjaa vastauspuolen peittimen toimintaa.                                                                                      |

Modality Bridge -suojamekanismit lukevat suorituksenaikaisen kokoonpanon tietokantapohjaisesta asetussäilöstä
(`getSettings()`), eivät ympäristömuuttujista. Visionin ensisijaiset avaimet ovat
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ja
`modalityBridgeCacheMaxEntries`. Vanhat
`visionBridge*`-avaimet hyväksytään vain dokumentoituna yhden jakson lukufallbackina;
hallintapaneelin kirjoitukset käyttävät ensisijaisia avaimia. Oletusarvot ja fallback-ratkaisin
sijaitsevat tiedostossa `src/shared/constants/modalityBridgeDefaults.ts`, ja vanhat
vakiot säilytetään tiedostossa `src/shared/constants/visionBridgeDefaults.ts`.

Audio käyttää avaimia `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` ja `modalityBridgeAudioMaxClips` sekä jaettuja
`modalityBridgeCache*`-asetuksia. Audiolla ei ole vanhojen avainten fallbackia, koska nämä
avaimet otettiin käyttöön Modality Bridge -skeeman yhteydessä.

Video käyttää avaimia `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` ja
`modalityBridgeVideoTimeout` sekä jaettuja `modalityBridgeCache*`-asetuksia.
Se ei ole oletusarvoisesti käytössä, koska FFmpeg/ffprobe ovat valinnaisia käyttöriippuvuuksia
ja kehysten kuvailutekstien luominen lisää viivettä ja mallikustannuksia.

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
