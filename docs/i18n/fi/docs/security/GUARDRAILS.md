# Guardrails (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Totuuden lähde:** `src/lib/guardrails/`
> **Päivitetty viimeksi:** 2026-08-29 — v3.8.51 (Video Bridgen transkription alkuperän ilmoittaa kutsuja,
> eikä palvelin vielä varmista sitä — selvennetty kohdan #11661 mukaisesti)

Suojaukset toteuttavat turvallisuus-, käytäntö- ja sisältömuunnokset OmniRouten
ja ylävirran palveluntarjoajien välisellä rajalla. Kukin suojaus voi tarkastaa
(ja valinnaisesti hylätä, muuntaa tai annotoida) pyyntöjen hyötykuormia
(`preCall`) ja ylävirran vastauksia (`postCall`).

Järjestelmä on **häiriötilanteessa salliva**: jos suojaus aiheuttaa poikkeuksen
suorituksen aikana, rekisteri kirjaa virheen ja jatkaa seuraavaan suojaukseen
sen sijaan, että pyyntö epäonnistuisi. Estäminen on aina nimenomainen päätös
(`block: true`), ei koskaan vahinko.

## Sisäänrakennetut suojaukset

Rekisteri lataa tuonnin yhteydessä automaattisesti kuusi suojausta prioriteettijärjestyksessä
(katso `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteetti | Nimi                | Vaihe(et)      | Tiedosto              |
| ------------ | ------------------- | -------------- | --------------------- |
| `5`          | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`          | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`          | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`         | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`         | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`         | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Pienemmän prioriteettiluvun suojaukset suoritetaan **ensin**.

### Näkökykysilta (`visionBridge.ts`) — Modaliteettisilta PR-1

Sieppaa kuvia sisältävät pyynnöt, jotka on suunnattu **malleille ilman näkökykyä**, ja joko
reitittää koko pyynnön uudelleen näkökykyä tukevalle mallille tai korvaa kuvia
sisältävät osat määritettävällä näkökykymallilla tuotetuilla tekstikuvauksilla ennen
ylävirran kutsua. Näin vain tekstiä tukevat palveluntarjoajat voivat käsitellä
multimodaalisia hyötykuormia läpinäkyvästi.

Kulku:

1. Ohita, jos kohdemalli tukee jo näkökykyä (ellei se ole
   pakkosiltauksen luettelossa `isVisionBridgeForcedModel`).
2. Poimi kuvaosat funktiolla `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), joka delegoi ne **yhtenäiselle median
   tunnistimelle** `detectMediaParts()` tiedostossa `open-sse/utils/mediaParts.ts` — tämä on
   yhdistelmäyhteensopivuussuodattimen kanssa jaettu ainoa totuuden lähde.
   Poiminta on sallittujen luettelolla rajattu ylimmän tason osiin, joiden muodot
   `replaceImageParts` voi liittää takaisin (poiminta↔korvaus-sopimus): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` ja Responses API `input_image`. Sisäkkäisiä osumia ja
   vain ilmaisimen sisältäviä muotoja käsittelee yhdistelmäsuodatin, eikä niitä koskaan poimita.
   Ohita, jos niitä ei löydy.
3. Selvitä ajonaikainen määritys funktiolla `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): uudet `modalityBridge*`-
   asetusavaimet ovat ensisijaisia; vanhat `visionBridge*`-avaimet säilyvät
   **yhden syklin varavaihtoehtona** (palautusikkuna). Ohita ennen median läpikäyntiä,
   jos silta on poistettu käytöstä.
4. Tilan valitsin (`modalityBridgeVisionMode`, katso alla oleva taulukko) päättää
   uudelleenreitityksen ja kuvailun välillä. Uudelleenreititys palauttaa `modifiedPayload`-arvon,
   jossa vain `model` on vaihdettu, sekä metatiedot `{ rerouted, fromModel, toModel, imagesKept }`.
5. Kuvailupolku: rajoita kuvien määrä arvoon `maxImages`, muodosta tehtävän huomioiva kehote,
   tarkista kuvailuvälimuisti, kutsu näkökykymallia **rinnakkain**
   (`Promise.allSettled`) ja lisää kuvien tilalle `[Image N]: <description>`-tekstiosat.
   Epäonnistunut kuvailu tuottaa arvon `null`, ja alkuperäinen kuvaosa
   **säilytetään** (#4012) — paitsi yhdistelmän kuvailupolulla, kun kaikki
   kuvailut epäonnistuivat. Tällöin vahvistetusti näkökyvytön ylävirta saa sen sijaan
   paikkamerkin `(unavailable — no vision-capable provider connected)` (#8430).
6. Palauta `modifiedPayload` + metatiedot (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Tilan valitsin (`modalityBridgeVisionMode`)

| Tila       | Oletus | Toiminta                                                                                                                                                                                                                                                                                                                                    |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Vanha heuristiikka muuttamattomana (#6640/#7204): muut kuin yhdistelmä- ja `auto/`-mallit reititetään uudelleen parhaalle näkökykymallille, ellei alkuperäisellä mallilla jo ole käyttökelpoisia tunnistetietoja (jolloin käytetään kuvailua); yhdistelmäkohteet kuvaillaan aina.                                                           |
| `describe` |        | Kuvaile aina — uudelleenreitityslohko ohitetaan kokonaan; käyttäjän valitsema malli vastaa aina.                                                                                                                                                                                                                                            |
| `reroute`  |        | Pakota uudelleenreititys: tunnistetiedoilla varustetun mallin säilyttävä tarkistus ohitetaan. Uudelleenreitityksen **kohteen** tunnistetietotarkistus on edelleen voimassa — kun käyttökelpoista näkökykykohdetta ei ole, pyyntö siirtyy kuvailuun, jotta raakakuvat eivät koskaan päädy vain tekstiä tukevaan taustajärjestelmään (#8430). |

Pakotetut tilat oikosulkevat suorituksen **ennen** automaattisen heuristiikan suorittamista; `auto`-toiminta
on tavutasolla identtinen PR-1:tä edeltävän suojauksen kanssa.

#### API-avaimen laajuus (`visionBridgeKeyScope.ts`)

Kun kutsujan API-avain rajoittaa `allowedConnections`-yhteyksiä, kiintiöpooleja
(`allowedQuotas`) tai malleja (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), silta valitsee
uudelleenreititys- ja kuvailumalleiksi vain malleja, joita avain saa käyttää,
ja vain yhteyksissä, joita avain saa käyttää. Kuvailukutsu kulkee tämän jälkeen aina
OmniRoute-itsepalautussilmukan kautta `x-omniroute-self-loop-key-id`-otsakkeella,
jotta vastaanottava chat-pyyntö pakottaa kyseisen avaimen yhteys- ja mallikäytännön
uudelleen käyttöön. `enforceApiKeyPolicy()` huomioi kyseisen otsakkeen vain yhdessä
itsepalautussilmukan bearer-tunnisteen kanssa, joten se voi ainoastaan kaventaa
käyttöoikeuksia, ja tunniste, jota ei pystytä selvittämään, hylätään.

Jos avaimelle ei ole sallittu yhtään näkökykymallia, kuvailupolku väistyy ja
pyyntö välitetään muuttamattomana. Tämä on sama avoimeksi jättävä toiminta kuin käytöstä
poistetulla suojauksella (metatiedot `{ skipped: true, reason: "no_permitted_vision_model" }`).
Pyynnöt ilman avainta ja avaimet, joilla ei ole näitä rajoituksia, toimivat täsmälleen
kuten ennenkin.

#### Tehtävän huomioiva kuvailukehote (`modalityBridgeVisionTaskAware`)

Oletus on **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) lisää
peruskuvauskehotteeseen **viimeisimmän käyttäjäviestin** tekstin (katkaistuna 500 merkkiin),
jolloin kuvaus kohdistuu siihen, mitä käyttäjä todella pyysi
(codex-vision-proxy-malli), ja pyytää näkömallia litteroimaan näkyvän
tekstin. Kun asetus on pois käytöstä — tai käyttäjätekstiä ei ole — peruskehotetta käytetään muuttamattomana.

Kuvauksen itsesilmukan oma OpenAI-yhteensopiva pyyntö (`callVisionModelSingle()`
tiedostossa `visionBridgeHelpers.ts`) pyytää aina asetusta `image_url.detail: "high"` —
ehdoitta jokaiselle kutsujalle ja palveluntarjoajalle eikä minkään asiakassignaalin perusteella.
Alhaisen tarkkuuden otanta heikentää OCR-tarkkuutta juuri siinä tekstinlitterointitehtävässä,
jota tämä kehote pyytää, joten itse kuvauskutsu pyytää aina korkeaa
tarkkuutta riippumatta alkuperäisessä saapuvassa pyynnössä käytetystä tarkkuustasosta. Tämä
vaikuttaa vain sisäisen kuvauspyynnön runkoon; se ei muuta tapaa, jolla
OmniRoute välittää kutsujan oman `image_url.detail`-arvon ensisijaisessa pyynnössä —
kyseinen oletus asetetaan erikseen ja vain tunnistetuille OpenCode-asiakkaille
funktiossa `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Kuvausten
itsesilmukan Anthropic-siirtomuotohaarassa ei ole `detail`-kenttää,
eikä kumpikaan oletus vaikuta siihen.

#### Kuvauksen tulosteen enimmäispituus (`modalityBridgeVisionMaxChars`)

| Avain                          | Oletus | Alue              |
| ------------------------------ | ------ | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` tai 100–50000 |

`0` (oletus) tarkoittaa, että **enimmäispituutta ei ole** — funktion
`callVisionModel()` palauttama kuvaus välitetään muuttamattomana, mikä säilyttää nykyisen
toiminnan. Mikä tahansa arvo välillä 100–50000 katkaisee kuvauksen ja lisää loppuun
`…`-merkin ennen kuin kuvaus liitetään takaisin muodossa `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` tiedostossa `src/lib/guardrails/visionBridge.ts`).
Suurenna tätä yksityiskohtaisissa OCR-tehtävissä, joissa jatkokäsittelevä malli tarvitsee
koko litteroinnin; pienennä sitä rajoittaaksesi sanallisesti runsaiden näkömallien tokenien käyttöä.
Hallintapaneelin kenttä sijaitsee Vision-välilehden Advanced-paneelissa
(`modality-bridge-max-chars` tiedostossa `ModalityBridgeVisionTab.tsx`) ja nostaa kaikki
arvot väliltä 1–99 vähimmäisarvoon 100 jättäen eksplisiittisen arvon `0`
koskemattomaksi — `0` on itsenäisesti kelvollinen Zod-arvo
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ei pelkästään
asettamattoman arvon oletus.

#### Kuvausvälimuisti (`modalityBridge/bridgeCache.ts`)

Prosessinlaajuisesti jaettu muistissa oleva LRU- ja TTL-välimuisti kuvausten tulosteille.
Avain = `sha256(imageRef + composedPrompt + configuredBridgeModel)`, jossa käytetään
pituusetuliitekehystystä (ei kenttien rajojen törmäyksiä). Mallikomponentti on
**määritetty** siltamalli, ei tosiasiassa vastannut malli —
`callVisionModel` voi käyttää sisäisesti varamallia, ja avaintaminen yrityskohtaisesti
pirstaloisi välimuistin. Epäonnistuneita kuvauksia ei koskaan tallenneta välimuistiin. Asetukset:

| Avain                           | Oletus | Alue    |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Etäkuvien normalisointi (itsesilmukan kuvaus/base64-nouto)

Kun silta noutaa itse **etäkuvan** — Anthropic-kuvauksen
itsekutsua ja claude-siirtomuotoista base64-muunnosta
(`ensureBase64ImagesForClaudeWire`) varten, molemmat funktion
`fetchRemoteImageAsDataUri()` kautta tiedostossa `visionBridgeHelpers.ts` — tuloksena saatu data-URI
välitetään funktion `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) kautta ennen sen upottamista näkömallin
pyyntöön. Ylisuuret kuvat pienennetään siten, että **pitkä sivu on 2048px** (vastaten
koonmuutosrajaa, jota OpenAI/Anthropic jo käyttävät palvelinpuolella), mikä vähentää
lähetettävien tavujen määrää ja viivettä muuttamatta sitä, mitä näkömalli näkee. Koonmuutokseen
käytetään pakettia `sharp`, joka ladataan dynaamisella tuonnilla: alustalla, jolla sen natiivi
binääri ei lataudu, `normalizeDataUri()` **ei koskaan heitä poikkeusta** — se
välittää alkuperäiset tavut sellaisinaan, joten kuvaus-/base64-muunnospolku
toimii aina. Myös muut kuin kuvatavut (nouto, joka ei palauttanut
dekoodattavaa kuvaa) välitetään koskemattomina. Tämä normalisointi koskee vain kuvia,
jotka silta noutaa omaa itsekutsuaan varten — sitä ei koskaan sovelleta
kutsujan sellaisenaan välitettävään raakahyötykuormaan, mikä noudattaa
vain erikseen käyttöön otettavien muutosten periaatetta (Hard Rule #20).

#### Asetusskeema + migraatio

Uudet `modalityBridge*`-avaimet validoidaan Zodilla skeemassa `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*`-kolmikko sekä
Audio Bridgen käyttämä `modalityBridgeAudio*`-ryhmä. Migraatio
`141_modality_bridge_settings.sql` kopioi nykyiset vanhat
`visionBridge*`-arvot vastaaviin uusiin avaimiin (idempotentisti eikä koskaan korvaa
operaattorin asettamaa `modalityBridge*`-arvoa); vanhat avaimet hyväksytään edelleen
lukemisen varavaihtoehtona yhden julkaisusyklin ajan.

#### Läpinäkyvyysotsake + tilastot

Kuvauksella muunnetut vastaukset sisältävät otsakkeen
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(jonka muodostaa `buildModalityBridgeHeader()` tiedostossa `modalityBridge/bridgeStats.ts`
ja jonka lisää `withModalityBridgeHeader()` tiedostossa `src/sse/handlers/chatHelpers.ts`).
Uudelleenreititetyt pyynnöt **eivät** saa otsaketta — hyötykuorma säilyi koskemattomana ja mallin
vaihto näkyy jo vastauksen rungon `model`-kentässä.

`GET /api/modality-bridge/stats` (hallinnan todennus, sama taso kuin
`GET /api/settings`) palauttaa muistissa olevat modaliteettikohtaiset laskurit
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` modaliteeteille `vision`, `audio` ja
`video`. `averageLatencyMs` käyttää nimittäjänään arvoa `latencySamples`, ei kaikkia
yrityksiä; operaatio, jolle ei ole ajoitusta, ei luo keinotekoista nollan millisekunnin
näytettä. `bridged` säilyy taaksepäin yhteensopivana aliaksena onnistuneille
muunnoksille; epäonnistuneet yritykset eivät kasvata sitä.
Laskurit nollautuvat tarkoituksellisesti prosessin uudelleenkäynnistyksen yhteydessä
(telemetriaa, ei kirjanpitoa).

#### Hallintapaneelin määritys

Erillinen hallintapaneelisivu on
`/dashboard/settings/modality-bridge`. Sen URL-osoitettavat `Vision`-, `Audio`-
ja `Video`-välilehdet säilyttävät kyselyparametrit vaihtaessaan `tab`-arvoa.
Vision-välilehti tarjoaa käyttöönoton, tilan, mallin valinnan (mukaan lukien automaattinen
oletusvalinta), tehtävät huomioivan kehotteen muodostamisen, aikakatkaisun sekä kuvan,
kuvauksen pituuden ja välimuistin lisärajat, ajonaikaiset
laskurit ja suojatun esimerkkipyynnön. Myös Audio-välilehti on toiminnassa: se tarjoaa
käyttöönoton, vain STT-malleja sisältävän mallivalitsimen Auto-vaihtoehdolla,
aikakatkaisun ja leikkeen enimmäispituuden rajat, äänilaskurit sekä `input_audio`-esimerkkitestin.
Video-välilehti on toiminnallinen: se ilmoittaa
FFmpeg/ffprobe-ajonaikaisen tilan — yhden neljästä eksplisiittisestä käyttöliittymätilasta (`unknown`, kun
tarkistus on käynnissä tai sitä ei voitu suorittaa loppuun, `restricted`, kun hallintapaneelin
isäntä ei ole loopback-osoite ja tarkistus ohitetaan asiakaspuolella, `unavailable`, kun tarkistus
on tehty ja puuttuminen vahvistettu, tai `available` yhdessä FFmpeg/ffprobe-versioiden kanssa) — tallentaa
käyttöönoton sekä malli-, kuva-, video- ja aikakatkaisurajat, suodattaa mallivalitsimeen vain
näköominaisuuksia tukevat mallit ja näyttää videolaskurit.

AI-asetusten aiempi Vision Bridge -kortti on yhteensopivuuslinkki
uudelle sivulle; se ei enää ylläpidä lomakkeen toista kopiota. Media Providers
linkittää myös Image-to-Text- ja Speech-to-Text-työnkulut vastaaviin Modality
Bridge -välilehtiin poistamatta nykyistä Speech-to-Text-kokeiluympäristöä.

**Itseensä kohdistuvan silmukan pääsynvalvonnan ohitus:** kun kuvauspyyntö reititetään OmniRouten
oman `/v1`-silmukan kautta (epästandardi palveluntarjoajamalli), alipyyntö lähettää
`x-omniroute-admission-bypass: internal`-otsakkeen ja todennetaan selvitetyn
itseensä kohdistuvan silmukan tunnistetiedolla — paikallisessa tilassa paikallisella
`sk_omniroute`-sentineliarvolla tai operaattorin määrittämällä
`OMNIROUTE_API_KEY`- / `ROUTER_API_KEY`-ympäristömuuttujan avaimella (#1350), jotta
`REQUIRE_API_KEY=true`-käyttöönotot voivat edelleen suorittaa kuvauspyynnön. Ohitus
hyväksytään vain näillä täsmällisillä tunnistetiedoilla, joten ulkoiset asiakkaat eivät voi käyttää
otsaketta pääsynvalvonnan ohittamiseen.

Vanhat oletusarvot sijaitsevat tiedostossa `src/shared/constants/visionBridgeDefaults.ts`;
uudet tilan, tehtävät huomioivan toiminnan ja välimuistin oletusarvot sekä asetusten selvitystoiminto sijaitsevat tiedostossa
`src/shared/constants/modalityBridgeDefaults.ts`. Suojamekanismi tarjoaa
`deps`-konstruktorivalinnan, jotta testeihin voidaan injektoida keinotekoiset `getSettings`- ja
`callVisionModel`-toteutukset.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Sieppaa ääntä sisältävät keskustelupyynnöt ennen kuin ne saavuttavat kohteen, jonka
ei tiedetä hyväksyvän äänisyötettä. Se ei koskaan reititä keskustelupyyntöä uudelleen: ääniosat
litteroidaan nykyisen OpenAI-yhteensopivan multipart-päätepisteen kautta, ja
valittu keskustelumalli jatkaa tekstilitteraatioilla.

Kulku:

1. Selvitä `supportsAudio` funktion `getResolvedModelCapabilities()` avulla. Eksplisiittiset
   palveluntarjoajarekisterin metatiedot ovat etusijalla, sitten staattiset mallin metatiedot ja lopuksi synkronoitu
   `modalities_input`. Määritetty syöteluettelo ilman `audio`-arvoa on `false`;
   jos ominaisuudesta ei ole näyttöä, arvoksi jää `null`. Sekä `false` että `null` aktivoivat
   konservatiivisen sillan, kun taas `true` ohittaa sen.
2. Selvitä `modalityBridgeAudio*`-asetukset ja poimi liitettävissä olevat ylimmän tason
   ääniosat jokaisesta viestistä jaetulla `detectMediaParts()`-
   tunnistimella. Tuettuja siirtomuotoja ovat OpenAI:n `input_audio`, `audio_url` ja
   `source.media_type: "audio/*"`. Sisäkkäinen ääni tunnistetaan reititystä varten, mutta sitä ei
   poisteta liitospolulla. Työmäärää rajoittaa `modalityBridgeAudioMaxClips`;
   myöhemmät osat jätetään koskemattomiksi.
3. Käytä määritettyä `provider/model`-arvoa tai anna funktion `selectAudioBridgeModel()` käydä
   `AUDIO_TRANSCRIPTION_PROVIDERS` läpi vakaassa luettelojärjestyksessä ja valita ensimmäinen
   malli, jolla on käyttökelpoinen aktiivisen palveluntarjoajan tunnistetieto.
4. `callAudioTranscription()` muuntaa base64-/data-URI-äänen multipart-
   `file`-tiedostoksi tai lataa etäresurssin `audio_url` vain julkiset osoitteet sallivan lähtevän liikenteen
   suojauksen kautta käyttäen DNS-kiinnitystä ja 25 MB:n rajaa. Sen jälkeen se lähettää tiedoston ja valitun
   mallin POST-pyynnöllä paikalliseen `/v1/audio/transcriptions`-itseensä kohdistuvaan silmukkaan, joka todennetaan
   funktion `resolveSelfLoopBearer()` avulla. Nykyinen litterointireitti suorittaa normaalin
   tunnistetietojen haun, jäähdytys- ja nopeusrajoitusten käsittelyn sekä palveluntarjoajalle välityksen.
5. Onnistuneet kutsut korvaavat osansa muodolla `[Audio N]: <transcript>`. Kutsut
   suoritetaan käyttäen `Promise.allSettled`-metodia: yksittäinen virhe säilyttää kyseisen alkuperäisen
   ääniosan (#4012-sopimus). Jos kaikki kutsut epäonnistuvat ja kohteen on todistettu olevan
   `supportsAudio === false`, osien arvoksi tulee
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-sopimus). Jos
   kohde on tuntematon (`null`), kaikkien kutsujen epäonnistuessa sisältö jätetään koskemattomaksi. Todistetusti
   vain tekstiä tukeva kohde, jolla ei ole käyttökelpoista STT-tunnistetietoa, saa saman eksplisiittisen
   paikkamerkin ilman verkkokutsua.

Onnistuneet litteraatiot käyttävät prosessinlaajuista Modality Bridge -LRU/TTL-välimuistia. Avain
yhdistää ääniviitteen, vakaan `audio-transcription`-operaatiotunnisteen
ja valitun STT-mallin; virheitä ei koskaan tallenneta välimuistiin. Ääniyritykset päivittävät
jaetut `bridged`-, `cacheHits`-, `failures`- ja `lastUsedAt`-laskurit.
Muunnetut vastaukset sisältävät
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`-otsakkeen; koskemattomat
pyynnöt eivät saa Audio Bridge -osiota.

Ajonaikaiset asetukset tallennetaan tietokantaan ja validoidaan Zodilla:

| Avain                         | Oletusarvo | Alue            |
| ----------------------------- | ---------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`     | —               |
| `modalityBridgeAudioModel`    | `""`       | Auto tai STT ID |
| `modalityBridgeAudioTimeout`  | `60000`    | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`        | 1–10            |

Jaettua välimuistia hallitaan edelleen asetuksilla `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` ja `modalityBridgeCacheMaxEntries`.

### Videosilta (`videoBridge.ts`, `videoBridgePipeline.ts`)

Sieppaa Chat Completions -rajapinnan `messages`-kentän ja Responses
API -rajapinnan `input`-kentän ylimmän tason video-osat ennen sellaisen kohteen
kutsumista, jolla ei tiedetä olevan natiivia videotukea.
Tuettuja muotoja ovat `input_video`, `video_url`, `video_source`, HTTPS-URL-osoitteet
ja `data:video/*;base64,...`-data-URI:t. Tekstissä esiintyviä pelkkiä tiedostonimiä
ei käsitellä videoina.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) vastaa pyynnön läpikäynnistä,
ominaisuus- ja käytäntötarkistuksesta, pyyntökohtaisesta koostamisesta sekä
vastaushyötykuormasta. Videokohtainen työ — hankinta, koko tuloksen välimuisti,
kuvasarjan kuvailu (jossa yhdistetään mahdollinen kutsujan ilmoittama
äänitranskriptio) sekä yrityskohtaiset mittarit, keskeytys ja siivous — on
piilotettu `videoBridgePipeline.ts`-tiedoston `processVideoPart`-toiminnon taakse.
Sitä kutsutaan kerran kutakin video-osaa kohti `preCall`-silmukassa.
Moduuli määrittää myös eksplisiittiset porttirajat `VideoMediaBrokerPort`
(tavujen hankinta ja näytteistettyjen kuvien poiminta), `VideoAudioTranscriptionPort`
(kutsujan ilmoittaman äänitranskription yhdistäminen näytteistettyjen kuvien
kuvateksteihin) ja `VideoDrilldownPort` (kuvien tarkempien tietojen pysyvyysraja;
sitä ei ole vielä kytketty `processVideoPart`-toimintoon — nykyisin vain erillinen
`/api/modality-bridge/video/drilldown`-reitti kirjoittaa tarkempien tietojen
merkintöjä).

Julkinen `/v1`-pyyntöpolku ei koskaan tuo tai käynnistä aliprosessia.
Etävideot ladataan 50 MiB:n rajoissa. Sisäisillä base64-videoilla on
konservatiivinen 36 MiB:n puretun datan videokohtainen enimmäiskoko, jotta
mallin, viestien ja kehystyksen muodostama kokonaisuus pysyy julkisten
JSON-pyyntöjen 50 MiB:n hyväksymisrajan sisällä. Sisäisen datan pituus ja
arvioitu purettu koko tarkistetaan ennen muistin varaamista. Alkuperäisen
etä-URL-osoitteen ja jokaisen uudelleenohjauksen on käytettävä HTTPS:ää, ja
tarkistuksessa käytetään olemassa olevaa vain julkiset osoitteet sallivaa
lähtevän liikenteen suojausta DNS-kiinnityksellä. Tämän jälkeen tavut ylittävät
täsmällisen sisäisen `POST /api/modality-bridge/video/extract`-välittäjärajan.
Kyseinen reitti on sekä `LOCAL_ONLY` että `SPAWN_CAPABLE`, hyväksyy vain
prosessikohtaisesti todennetun, luotetusta takaisinkytkentäosoitteesta tulevan
pyynnön eikä koskaan hyväksy URL-osoitetta, tiedostojärjestelmäpolkua,
suoritettavaa tiedostoa tai argumenttiluetteloa. API:n rungon kokoputki ja
käsittelijän inkrementaalinen rungon lukija valvovat toisistaan riippumatta
välittäjän 50 MiB:n syöterajaa. Sen rajattu jono suorittaa yhden poiminnan
kerrallaan, sallii neljä odottavaa työtä ja rajoittaa odottavan syötteen
100 MiB:uun.

Välittäjän sisällä `ffprobe` lukee yksityistä paikallista tiedostoa. Kiinteä
muotojen sallittujen luettelo sulkee pois soittolista- ja manifestimuodot.
Sallituissa MOV-perheen säilöissä ulkoiset MOV-dataviittaukset ovat oletusarvoisesti
poissa käytöstä, eikä kiinteä komento ota niitä käyttöön. Sekä `ffprobe` että
`ffmpeg` käyttävät vain `file`-protokollan sallivaa luetteloa, yhtä säiettä,
kiinteitä argumenttitaulukoita ja eivät lainkaan komentotulkkia, ja suoritettavat
tiedostot ratkaistaan `PATH`-muuttujasta. Liitettyjen kansikuvien kuvavirrat
eivät ole toistettavia ehdokkaita. Kaikkien toistettavien virtojen on täytettävä
rajat, ja eksplisiittistä oletusvirtaa suositaan ennen determinististä
pienimmän indeksin varavaihtoehtoa. Videoiden enimmäiskesto on 600 sekuntia,
enimmäiskoko 8 192 pikseliä ulottuvuutta kohti ja lähdepikselien enimmäismäärä
33 554 432. FFmpeg ottaa 1–16 JPEG-näytekuvaa aikavälien keskipisteistä, pienentää
pitkän sivun enintään 1 024 pikseliin suurentamatta pienempiä syötteitä eikä
koskaan vastaanota URL-osoitetta. Näytteistyksen oletusarvo on `uniform`.
Valinnaiset `scene_aware`- ja kokeelliset `segment_aware`-käytännöt suorittavat
yhden kiinteän FFmpeg-lisäajon jo validoidulle paikalliselle virralle, valitsevat
rajatun määrän `showinfo`-kohtausaikaleimoja ja palaavat deterministisesti samoihin
tasavälisiin keskipisteisiin, jos tunnistus epäonnistuu tai aikakatkaistaan,
tuloste on virheellinen tai ehdokasjoukko on tyhjä. Segmenttitietoinen tila
jakaa keskipistenäytteet suhteessa validoituihin kohtausväleihin;
segmenttitietoinen todistusaineisto ja varatoiminta kuvataan tarkemmin jäljempänä.
Kaikissa käytännöissä valinnan jälkeen sovelletaan ehdotonta 16 kuvan rajaa.
Kun kohtaustietoisen pyynnön budjetti on vain yksi kuva, se käyttää aktiivisen
koko videon tai kohdistusikkunan tasavälistä keskipistettä ja ilmoittaa
`policyEffective: uniform`: yksi valittu kohtauskuva ei voi säilyttää ajallisen
välin molempia päitä. Kutsuja voi valinnaisesti määrittää äärellisen
kohdistusikkunan (`start`/`end` sekunteina). Rajat sovitetaan median kestoon,
käänteiset tai ei-äärelliset ikkunat hylätään, ja kaikkia näytteistyskäytäntöjä
sovelletaan vain normalisoidulla aikavälillä. Tuloksena saatu ikkuna sisällytetään
näytteistyksen metatietoihin ja epäluotettavan kuvauksen etuliitteeseen, jotta
myöhemmät mallit voivat erottaa kohdistetun otteen koko aikajanalta.

Semanttinen kuvatekstin kohdistus on erillinen, eksplisiittinen asetus.
Oletusarvoinen `full`-analyysitila säilyttää nykyisen kuvakehotteen eikä koskaan
välitä pyyntötekstiä kuvatekstimallille. `focused`-tilassa silta lukee vain
uusimman ei-tyhjän käyttäjän kirjoittaman `text`/`input_text`-sisällön samasta
Chat- tai Responses-säilöstä, normalisoi sen NFC-muotoon, tiivistää ohjausmerkit
ja tyhjemerkit sekä rajoittaa sen 500 Unicode-koodipisteeseen. Tyhjä tulos
palautuu täsmälleen `full`-kehotteeseen. Käyttökelpoinen vihje sarjallistetaan
JSON-muodossa erilliseen epäluotetun käyttäjäkontekstin lohkoon, ja se saa
ainoastaan priorisoida havaittavia yksityiskohtia. Se ei voi ohittaa erillistä
varoitusta siitä, ettei mediassa näkyviä tai kuuluvia ohjeita saa noudattaa.
Tekstuaalinen kohdistus ei koskaan päättele `start`/`end`-arvoja eikä muuta
ajallista näytteistintä.

#### FU-07:n rakenteellinen segmenttitodistusaineisto

`segment_aware` käyttää yhden rajatun esianalyysikierroksen jo validoidulle
paikalliselle videovirralle. Kiinteä suodatinketju skaalaa videon ensin enintään
320 pikselin levyiseksi, tunnistaa kohtausvaihdokset ja pysähtyneet jaksot sekä
ottaa sitten yhden kuvan sekunnissa epäterävyyden, keskimääräisen luminanssin ja
tila-/aikainformaation analysointia varten. Kierros on rajattu 600 rakenteelliseen
näytteeseen, yhteen FFmpeg-/suodatinsäikeeseen, samoihin vain `file`-protokollan
ja säilömuotojen sallittujen luetteloihin, 1 MiB:n prosessitulostusrajaan sekä
enintään 30 sekuntiin välittäjän yhteisen keskeytys-/määräajan sisällä. Se ei
koskaan hyväksy pyynnöstä komentoa, suodatinta, polkua tai URL-osoitetta.

Rakenteelliset arvot ovat determinististä otantaan perustuvaa näyttöä, eivät
videon semanttista ymmärtämistä. Niistä ei päätellä kohteita, toimintoja,
tekstityksiä, puhetta tai käyttäjän tarkoitusta. Kohtaus- ja pysähtymisrajat
muodostavat segmentit; pysähtyneen kuvan osuus, epäterävyys, valotus,
tilallinen yksityiskohtaisuus ja ajallinen muutos vaikuttavat ainoastaan siihen,
miten nykyinen 1–16 kuvan budjetti jaetaan. Kokonaan pysähtynyt segmentti
rajoitetaan yhteen kuvaan, kun taas pysähtymättömät segmentit kilpailevat
jäljellä olevasta budjetista. Kun rajoja on enemmän kuin kuvia, aikajanan
tasainen kattavuus säilytetään, jotta nopeat leikkaukset videon alussa eivät voi
peittää pitkää loppusegmenttiä. Kohtausrajat, jotka ovat pysähtymisrajasta
yhden sekunnin analyysiresoluution sisällä, yhdistetään.

Puuttuvat suodattimet, virheellinen tai tyhjä näyttö, tunnistimen virhe tai
rajatun esianalyysin aikakatkaisu palautuvat täsmälleen tasaisten keskipisteiden
käytäntöön. Kutsujan keskeytys tai välittäjän määräaika ei kuitenkaan palaudu
siihen: se lopettaa käynnissä olevan aliprosessin, estää myöhemmän kuvien
poiminnan, ja yksityinen väliaikainen hakemistopuu poistetaan `finally`-lohkossa.

`scripts/perf/video-bridge-fu07-eval.ts` tuottaa deterministisiä, aitoja
FFmpeg-testiaineistoja deduplikoinnin jälkeisten kuvatekstikutsujen säästöjen,
tiheän liikkeen budjetinjaon, epäterävyys-/valotus-/SI-TI-näytön, nopeiden
leikkausten ja pitkän loppuosan sekä asteittaisten häivytysten väärien
positiivisten tulosten arviointiin. Se tallentaa esianalyysin seinäkelloajan
sekä, kun `/usr/bin/time` on käytettävissä, aliprosessin suoritinajan ja RSS:n
huippuarvon. Sen laatutarkistukset ovat vain rakenteellisia oraakkeleita. Aidon
kuvatekstimallin laadun tila on edelleen `HOLD`, koska tällä testikehyksellä ei
ole valtuutettua päätepistettä tai jäädytettyä arvioijaa. Myös rahallisten
säästöjen tila pysyy arvossa `HOLD`, ellei
`--caption-cost-per-call-usd` anna nimenomaista positiivista kutsukohtaista
kustannusarviota; skripti ei koskaan keksi kumpaakaan tulosta.

Kunkin kuvan koko on rajattu 4 MiB:uun, kaikkien raakakuvien yhteiskoko
23 MiB:uun ja välittäjän sarjoitettu vastaus 32 MiB:uun. Yksityinen väliaikainen
hakemisto poistetaan `finally`-lohkossa. OmniRoute ei sisällä FFmpeg:iä eikä
hyväksy mukautettua suoritettavan tiedoston polkua. Ennen kuvatekstien luontia
silta suorittaa varovaisen visuaalisen deduplikointikierroksen: jokainen JPEG
pienennetään 16×16-kokoiseksi harmaasävypuskuriksi ja sitä verrataan ainoastaan
viimeiseen säilytettyyn kuvaan. Kun pyydetty kuvatekstibudjetti on suurempi kuin
yksi kuva, poiminta tuottaa rajatun ehdokasjoukon, jonka koko on enintään
kaksinkertainen budjettiin nähden ja aina enintään 16 kuvaa. Pyydettyä rajaa
sovelletaan vasta deduplikoinnin jälkeen, ja ensimmäinen sekä viimeinen valittu
ehdokas säilytetään lopullisessa harvennuksessa, kun budjetti on vähintään kaksi.
Versioitu `grayscale-16x16-mean-cells-v2`-käytäntö käyttää suurempaa arvoa
keskimääräisen luminanssin muutoksesta ja niiden pikkukuvan solujen osuudesta,
joiden normalisoitu muutos on vähintään 0.05. Kaksoiskappaleen kynnysarvo on
vakio 0.04, joka on valittu ennakoitavuuden vuoksi sen sijaan, että se olisi
tarjolla ajonaikaisena asetuksena. Tämä toissijainen suuren kontrastin signaali
säilyttää pienet liikkeet ja näkyvän tekstin muutokset, jotka pelkkään
keskiarvoon perustuva vertailu voi piilottaa. Vertailijan tai dekooderin
virhetilanteessa käsittely jatkuu avoimesti ja kattavuus säilytetään.
Tulosteen metatiedoissa erotellaan poimitut ehdokkaat, onnistuneesti käytetyt
kuvat ja poistetut visuaaliset kaksoiskappaleet.

Nimenomaisesti videoksi merkitty osa voi pyytää aikaleimallisen kontaktikartan.
Silta rakentaa enintään 4 sarakkeen ja 16 kuvan JPEG-ruudukon. Jokainen
512 pikselin solu polttaa lähteensä aikaleiman suuren kontrastin alapalkkiin,
ja samat aikaleimat säilyvät tekstimuotoisissa metatiedoissa myöhempää
yhdistämistä ja auditointia varten. Koko JPEG on edelleen rajattu 32 MiB:uun.
Jos `sharp` ei pysty dekoodaamaan tai koostamaan ruudukkoa, silta palaa
yksittäisiin JPEG-kuviin; asiakkaan keskeytys välittyy silti kontaktikartan
käsittelyyn.

Tuotantoon siirtämistä tukeva näyttö pidetään tarkoituksella erillään
synteettisestä koostamisen mikrosuorituskykytestistä.
`scripts/perf/video-bridge-contact-sheet-eval.ts` määrittää skeemaversioidun
A/B-testikehyksen todellisille OpenAI-yhteensopiville konenäkömalleille. Se
mittaa palveluntarjoajan ilmoittamat tokenit, päästä päähän -seinäkelloviiveen
(kontaktikartan koostaminen mukaan lukien), mallikutsujen määrän ja manifestissa
määritellyn faktojen säilymisen. Mallien raakavastauksia ei kirjoiteta
raporttiin; vain SHA-256-tiivisteet ja täsmänneiden faktojen tunnisteet
säilytetään. Testikehys ei tee verkko- tai maksullista mallikutsua, ellei
`--execute-real`-valitsinta anneta ja arvoja `--model`, `OMNIROUTE_BASE_URL`
ja `OMNIROUTE_API_KEY` ole määritetty. Ilman tätä nimenomaista todellista ajoa
sen koneluettavan arvion tila pysyy arvossa `HOLD`; synteettiset hyötykuorman
tai kutsumäärän mittaukset eivät yksinään ole näyttöä tuotantoon siirtämisen
puolesta.

Kutsujat voivat liittää valinnaisen `transcript.cues`-taulukon tuettuun
video-osaan, kun heillä on jo käytettävissään ajallisesti kohdistettu teksti.
Jokaisen vihjeen tulee sisältää `text`, äärellinen `start`/`end`-aikaväli
tunnistetun keston sisällä sekä sallittujen luetteloon kuuluva `source`
(`client`, `embedded` tai `audio-bridge`); kohteen `confidence` oletusarvo on
`1`, ja sen tulee pysyä välillä `0`–`1`. Täsmälleen samat vihjeet yhdistetään.
OmniRoute ei koskaan käynnistä litterointia näiden metatietojen perusteella:
validoidut vihjeet kopioidaan kuvattuun tulokseen lähteen, luottamusarvon ja
aikavälin kanssa, ja ne esitetään epäluotettuina havaintoina kuvatekstien
rinnalla. Virheellinen, sallitun aikavälin ulkopuolinen tai alkuperätiedoton
teksti hylätään sen sijaan, että se sekoitettaisiin kuvatekstivirtaan. Molemmat
pyynnön rungon litterointikanavat normalisoivat annetun alkuperän arvoksi
`client`, myös itse ilmoitetut `embedded`- tai `audio-bridge`-tunnisteet.
Vain palvelimen hallinnoima sovitin voi määrittää nämä luotetut tunnisteet
ainoastaan koodissa käytettävän `trustedSource`-argumentin kautta; pyynnön
JSON-kenttä ei voi välittyä tähän argumenttiin. Litteroinnin teksti on
alkuperästään riippumatta epäluotettua, mediasisällöstä johdettua sisältöä,
eikä se saa koskaan määrittää valtuutusta.

Edistynyt kutsuja voi antaa samalle videolle `audioTranscript`-raidan;
sitä käsitellään asiakkaan toimittamana tekstinä, ei todisteena palvelimen tekemästä litteroinnista.
Yhdistämiskohta suorittaa visuaaliset ja äänihavainnot saman
määräajan ja keskeytyssignaalin alaisina, järjestää ne yhteiselle aikajanalle, yhdistää
täsmälleen identtiset kaksoiskappaleet ja raportoi osittaisen tuloksen, kun vain toinen haara onnistuu.
Virheellinen `audioTranscript` johtaa tähän osittaiseen tulokseen — visuaalinen
kuvaus säilytetään ja äänihaaraan kirjataan puhdistettu virhekoodi —
sen sijaan, että koko videon käsittely epäonnistuisi. Haarakohtainen saatavuus, osittaisuuden ilmaisin
ja puhdistetut virhekoodit säilytetään kuvaillussa tuloksessa,
suojakaiteen metatiedoissa (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), tulosvälimuistin metatiedoissa ja sillan
yhdistämislaskureissa. Video Bridgen oletuspolku ei käynnistä puheen muuntamista tekstiksi
eikä lataa mediasta toista kopiota; ilman nimenomaisesti annettua raitaa se pysyy
vain videota käsittelevänä.

**Litterointien säilytys (#12150 P1).** Tätä sovelletaan automaattisesti aina, kun
Video Bridge (joka itsessään on erikseen käyttöönotettava) hahmontaa litterointivihjeen — erillistä
säilytysvalitsinta ei ole. Kun pyyntö hahmontaa minkä tahansa litterointivihjeen (kutsujan ilmoittaman
`transcript`-kentän tai yhdistetyn `audioTranscript`-kentän), suojakaide merkitsee sen
`videoBridgeObserved`-arvolla ja tuottaa videokuvauksesta peitetyn varjokopion —
identtisen hahmonnoksen, jossa jokaisen vihjeen vapaamuotoinen tekstirunko korvataan arvolla
`[redacted-video-transcript]`. Tämä tehdään korvaamalla jäsennelty vihjekenttä
ennen merkkijonon kokoamista (ei koskaan jäsentämällä litistettyä tekstiä, joten mikään vihjeen
sisältö — haitallinen tai tavallinen, mukaan lukien merkkiä `]` sisältävät rungot, kuten
`[inaudible]`/`[music]` — ei voi säilyä). Tallennetun kutsulokin pyyntörungossa
jokainen videosta johdettu tekstiosa vaihdetaan tähän peitettyyn varjokopioon sisällön
täsmällisen vastaavuuden perusteella; `fullText`-ankkuri luetaan uudelleen valmiista kutsua edeltävästä suojakaidehyötykuormasta,
joten vastaavuus löytyy edelleen senkin jälkeen, kun ketjun myöhemmät suojakaiteet (henkilötieto- ja
tunnistetietopeittimet, prioriteetit 10/95) ovat kirjoittaneet kuvaustekstin uudelleen paikallaan,
sekä sen jälkeen, kun järjestelmäkehotteen, siirron tai Muistin lisääminen on muokannut viestitaulukon rakennetta.
Mallille lähetettävä runko säilyy muuttumattomana. Havaittu pyyntö ei myöskään tallenna
mitään pysyvään Muistiin (sekä pyynnöstä että vastauksesta johdettava poiminta ohitetaan),
joten mallin oma vastaus ei voi kaiuttaa litterointitekstiä Muistiin.

**Videon raakakentät (#12430).** Kun silta on käytössä ja natiivi videotuki on tuntematon tai puuttuu, määritetyt `transcript`-/`audioTranscript`-kentät aktivoivat myös `videoBridgeObserved`-arvon, jopa kuvauksen epäonnistumisen tai `maxVideos`-rajoituksen jälkeen. `null` ja tyhjät merkkijonot lasketaan mukaan; puuttuvia kenttiä ja muita kuin videon metatietoja ei lasketa. Säilytetyissä kopioissa nämä kentät peitetään tai pyyntö jätetään pois, ja välimuistit/Muisti ohitetaan.

Näillä varapoluilla kutsujan kelvollisista vihjeistä tulee tuettuja `text`-/`input_text`-
osia epästandardien palveluntarjoajakenttien sijaan. Molemmat pyynnössä annetut raidat
pysyvät epäluotettuina `client`-havaintoina, ja mukana on nimenomainen varoitus siitä, ettei videota
kuvailtu eikä aikaleimoja varmennettu mediaa vasten. Nykyisiä
256 vihjeen / 64 KiB:n kokonaisrajoja ja vihjekohtaisia rajoja sovelletaan molempiin raitoihin yhteensä;
aikaleimojen on mahduttava välittäjän 600 sekunnin enimmäisrajaan ja mahdolliseen annettuun kohdistusikkunaan.
Virheelliset raidat hylätään, eikä niitä välitetä mielivaltaisena tekstinä; kelvollista
sisarraitaa voidaan silti käyttää, ellei niiden yhteisraja ylity. Null-arvoiset tai tyhjät
kentät eivät lisää tekstiä. Tämä varamenettely ei lisää median noutamista tai litterointia.
Litterointilaajennuksen kentät poistetaan varapolun videokantajasta ja sen
`video_url`-/`source`-objekteista. OpenAI-siirtoformaatin sallittujen kenttien luettelo pysyy tiukkana; natiiviltaan
tuntemattomat videokantajat säilyvät käytettävissä ja tunnetut vain tekstiä tukevat kohteet säilyttävät turvalliset merkinnät.
Jäsennellyt peitetyt varjokopiot suojaavat lisättyä litterointitekstiä, kun taas
kutsujan omistama alkuperäinen pyyntö pysyy muuttumattomana. Natiivisti tuetut kohteet ja
käytöstä poistetut sillat säilyttävät nykyisen ohituskäyttäytymisensä.

Muut säilytetyt kopiot käyttävät samaa havaitun pyynnön signaalia. Suojakaiteita edeltävä
asiakaspyynnön raaka tilannevedos, muistissa oleva odottava pyyntö ja varhaisen
hylätyn pyynnön loki korvaavat rakenteellisesti video-osien litterointikentät;
putkiston vaiheiden ja kontekstinsiirron tuottamat merkkijonokehotteet peitetään
tallennetun pyyntörungon vastaanottopisteessä. Tallennettu `video_content_removed`-merkintä
saa `previous_response_id`-jatkamisen epäonnistumaan turvallisesti sen sijaan, että se rakentaisi uudelleen
tahallisesti hylätyn tekstin. Jos havaittu pyyntö menettää
osakohtaisen peitetyn varjokopionsa ennen lokitusta tai jos yksikin useista videon varjokopioista
ei enää vastaa myöhempien pyyntömuutosten jälkeen, säilytettävä pyyntörunko
jätetään kokonaan pois sen sijaan, että osittain peitetty litterointi säilytettäisiin.

Havaitun pyynnön tapauksessa mallin vastaus voi lainata mitä tahansa litteroinnin osaa
ilman jäsenneltyä vihjerajaa. Sen vuoksi kutsulokiin tallennettava
`responseBody` korvataan poisjättömerkinnällä; yksityiskohtaista
putkistoartefaktia (joka voi sisältää palveluntarjoajan ja asiakkaan rungot sekä suoratoiston osat)
ei säilytetä. Semanttiset, idempotenssi- ja päättelyn toistovälimuistit
ohittavat tämän pyynnön luku- ja kirjoitusoperaatiot. Palveluntarjoajalle lähetettävä pyyntö ja asiakkaalle näkyvä
vastaus säilyvät muuttumattomina. Varhaiset keepalive-tavut tyhjennetään tilapäisestä
puskurista, kun yksityiskohtainen artefakti jätetään pois. Kiron virheellistä EventStream-muotoa koskeva
varoitus ilmoittaa vain hyötykuorman tavumäärän, ei koskaan sen sisältöä tai JSON-
jäsentimen raakaa virhettä.
Tämä ei tarkoita, että kaikki asiaan liittymättömät palveluntarjoajien tai liitännäisten diagnostiikat olisi
tarkastettu; laajempaa säilytettävien vastaanottopisteiden läpikäyntiä seurataan kohdassa #11658.

Sisäinen `/api/modality-bridge/video/drilldown`-elinkaari on erillinen,
loopback-/token-todennettu välimuistialusta. Jokainen toiminto edellyttää myös
kanonista läpinäkymätöntä pääkäyttäjätunnusta. Ennen tuotantokutsujan käyttöönottoa sen on
johdettava kyseinen tunnus todennetusta tenantista, eikä se saa koskaan välittää
asiakkaan valitsemaa arvoa. Välimuistiavaimet sitovat kyseisen pääkäyttäjän kanonisiin istunto- ja
videoviitetunnuksiin, tallentavat niistä vain SHA-256-johdetut avaimet ja rajaavat sekä luvut
että poistot samaan pääkäyttäjään. Välimuisti tallentaa kuhunkin merkintään enintään 16 johdettua JPEG-
kehystä, vanhentaa ne kymmenen minuutin kuluttua ja tukee rajattuja
`start`/`end`-lukuja tai istunnon eksplisiittistä poistamista.

Kukin pääkäyttäjä on rajoitettu 16 merkintään ja 64 MiB:uun kanonista JPEG-dataa. Nämä
rajat ovat riippumattomia globaalista 64 merkinnän / 256 MiB:n enimmäisrajasta: pääkäyttäjän kiintiön
ylittyessä poistetaan ensin vain kyseisen pääkäyttäjän vähiten äskettäin käytettyjä merkintöjä, ennen kuin globaalia
LRU-poistoa harkitaan. Vanhentuneet merkinnät poistetaan sekä pääkäyttäjäkohtaisesta että
globaalista kirjanpidosta välimuistitoiminnan yhteydessä, kun taas peruutus ja validointivirhe eivät
tallenna osittaista korvausta.

Välimuisti hylkää ei-kanonisen Base64:n, ylimääräisen täytteen, muun kuin JPEG-median, virheelliset tai
katkaistut JPEG-kuvat sekä JPEG-kuvat, jotka tuottavat varoituksen rajatun koko kuvan `sharp`-
dekoodauksen aikana. Jokainen hyväksytty kuva koodataan uudelleen kanoniseksi JPEG-kuvaksi, leveys ja korkeus
johdetaan dekoodatuista tavuista kutsujan kenttiin luottamisen sijaan, ja kaikki loppuun liitetyt
polyglottitavut hylätään niiden säilyttämisen sijaan. Vain rajattu kanoninen pakattu puskuri
lasketaan kumpaankin kiintiöön. JSON-siirtoraja sisältää Base64-lisäkuorman 32 MiB:n
dekoodatun syötteen enimmäisrajaa varten. Jokainen
tallennettu johdos kirjaa validoidun JPEG-muodon/-resoluution, näytteenottokäytännön,
johdosversion, luontiajan, palvelimen laskeman sisältötiivisteen ja hajautetun ylätason
viitteen sekä luotetun kutsujan ylätason sisältötiivisteen. Peruutus tarkistetaan
asynkronisten dekoodaus-/tiivistevaiheiden välillä ennen atomista välimuistiin tallennusta.

Tämä toimituserä ei vielä yhdistä tuotantotuottajaa reittiin eikä tarjoa
moniresoluutioista variantin valintaa. Läpinäkyvä Video Bridge -pyyntöpolku
ei siksi aiheuta lisätyötä, ja tenanttiin sidotun pääkäyttäjän johtaminen sekä
täysi FU-08-moniresoluutioelinkaari ovat edelleen eksplisiittisiä jatkotöitä sen sijaan,
että ne olisi dokumentoitu valmiiksi toiminnallisuudeksi.

Kehyksille luodaan kuvatekstit peräkkäin määritetyllä Video-mallilla. Tyhjä
Video-ohitus perii Vision-asetuksen; jos molemmat ovat tyhjiä, Vision-
automaattireititin valitsee käytettävän näkökykyisen mallin. Onnistuneet kuvatekstit
korvaavat alkuperäisen osan vakaalla `[Video description:`-etuliitteellä, joka myös
merkitsee tekstin epäluotetuksi mediasta johdetuksi havainnoksi ja ohjeistaa myöhempiä
malleja olemaan noudattamatta mediasta löytyviä ohjeita. Kehysten kuvatekstien välimuistiavaimet
sisältävät JPEG-tavut, kehotteen, aikaleiman ja käytettävän mallin; vain onnistuneet
kuvatekstit tallennetaan välimuistiin. Välimuistimerkinnät säilyttävät todellisen onnistuneen tuottajamallin,
myös varamallin; silta raportoi arvon `mixed`, kun eri kehykset
on tuotettu eri malleilla. Välimuistiosuma käyttää kyseistä tuottajan identiteettiä uudelleen
sen sijaan, että se nimettäisiin uudelleen pyydetyn reitityssuunnitelman mukaiseksi. Koko videon tulosvälimuisti
avaintetaan jokaisella tulosta muuttavalla syötteellä — kehote, käytettävä
malli, näytteenottokäytäntö, kehysten määrä, semanttisen analyysin tila, normalisoidun kohdistusvihjeen
SHA-256-sormenjälki, kohdistusikkuna, `transcript`,
`audioTranscript` ja kontaktikuvataulukon lippu — joten minkä tahansa näistä
ulottuvuuksista muuttaminen aiheuttaa välimuistihudin eikä koskaan vanhentuneen tuloksen uudelleenkäyttöä. Visuaalisen duplikaattien poiston käytännön
versio, kynnysarvo ja rajattu ehdokaskehysten määrä sisältyvät myös eksplisiittisesti
tulosvälimuistin avaimeen ja metatietoihin; käytännön muutos ei siksi voi käyttää uudelleen vanhentunutta
koko videon kuvausta. Tulosvälimuistin v4-metatiedot säilyttävät tilan ja
sormenjäljen, eivät koskaan käyttäjän raakaa tehtävää. Suojakaiteiden metatiedot raportoivat sekä
pyydetyn että käytetyn analyysitilan; pyydetty `focused`-tila ilman
käyttökelpoista käyttäjätekstiä raportoidaan käytännössä tilana `full`.

Suojakaide poimii kaikki tuetut video-osat, mutta kuvailee enintään
`modalityBridgeVideoMaxVideos` videota. Kohteelle, jonka on osoitettu täyttävän ehdon
`supportsVideo === false`, epäonnistuneet ja rajan ylittävät videot muutetaan eksplisiittisiksi turvallisiksi
tekstimerkinnöiksi, jotta raakaa videota ei säily. Kun kyvykkyyttä ei tunneta, kyseiset osat
säilyttävät videosäiliönsä; mahdollinen varatranskriptio noudattaa yllä olevaa rajattua tekstiksi
muunnosta. Kohteet, joilla `supportsVideo === true`, ohittavat sillan.
Asiakaspyynnön keskeytyssignaali välittyy latauksen, välittäjäjonon,
aliprosessien ja kuvatekstikutsujen läpi; keskeytykset pysäyttävät käsittelyn videoiden välillä eivätkä koskaan virhetilanteessa päästä
raakaa mediaa läpi.

Ajonaikaiset asetukset ovat tietokantataustaisia ja Zod-validoituja:

| Avain                               | Oletus      | Alue / toiminta                                                                                                    |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Valinnainen suoritusympäristö, erikseen käyttöön otettava                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` säilyttää yleiset kuvatekstit; `focused` käyttää rajattua, epäluotettavaa viimeisimmän käyttäjän kontekstia |
| `modalityBridgeVideoModel`          | `""`        | Perii Vision Bridgen mallin                                                                                        |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                               |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` tai suhteellinen `segment_aware`; tunnistimen virhe palauttaa käytännöksi `uniform`       |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                     |

Aiemmin tallennetut, yli 120 sekunnin videon aikakatkaisuarvot rajataan
välittäjän määräaikaan; tämän rajan ylittävät uusien asetusten tallennukset hylätään.
`GET /api/modality-bridge/video/runtime` edellyttää luotettavasti merkittyä loopback-
paikallisuutta ennen todennusta tai suoritusympäristön tutkimista ja sen jälkeen hallinnan
todennusta. Se palauttaa vain arvon `available`, puhdistetut FFmpeg/ffprobe-versiot ja kiinteän
syyn, kun suoritusympäristö ei ole käytettävissä. Sisäinen poimintapäätepiste ei ole
julkinen latausrajapinta: jonon ylikuormitus palauttaa `503` sekä `Retry-After`-otsakkeen, kutsujan
yhteyden katkeaminen palauttaa `499` ja välittäjän kiinteän määräajan ylittyminen palauttaa `504`. Muunnetut vastaukset lisäävät
arvon `video->text;model=<visionModel>;parts=<videos>` keskitettyyn
`x-omniroute-modality-bridge`-otsakkeeseen poistamatta Vision- tai Audio-osuuksia.

### PII-peittäjä (`piiMasker.ts`)

Suoritetaan **molemmissa** vaiheissa.

- **`preCall`** kloonaa hyötykuorman, käy läpi kentät `system`, `messages`, `input` ja
  `prompt` (mukaan lukien tavalliset merkkijonoalkiot) ja soveltaa `processPII()`-funktiota
  (`@/shared/utils/inputSanitizer`) merkkijonomuotoisiin `content`/`text`-kenttiin. Kun
  `PII_REDACTION_ENABLED=true`, havaittu PII peitetään lähtevässä
  hyötykuormassa. Tämä on riippumaton asetuksesta `INPUT_SANITIZER_MODE` (joka hallitsee vain
  kehotesyötteiden manipuloinnin käytäntöä). Kun peittäminen ei ole käytössä, kutsu tallentaa havaintojen
  määrät kirjoittamatta sisältöä uudelleen.
- **`postCall`** syväkloonaa vastauksen, suorittaa `sanitizePIIResponse()`-funktion sekä
  Responses API -muodon peittäjän (`maskResponsesOutput` — kattaa kentät
  `output_text` ja `output[].content[].text`). Jos peittämistä tapahtuu,
  muokattu vastaus korvaa alkuperäisen.

Suojakaide ei koskaan estä toimintaa; se vain lisää merkintöjä (`meta.detections`,
`meta.redacted`) tai kirjoittaa sisällön uudelleen.

#### Tyyppikohtainen valinta, mukautetut mallit ja havaintolaskurit

**Koontinäyttö → Asetukset → Tietoturva → PII:n peittäminen** määrittää, _mitä_ peitetään. Se
ei ota peittämistä käyttöön: sitä hallitsevat edelleen `PII_REDACTION_ENABLED` (pyyntö) ja
`PII_RESPONSE_SANITIZATION` (vastaus + SSE), jotka molemmat ovat oletusarvoisesti poissa käytöstä.

- **Tyyppikohtainen valinta** — sisäänrakennetut tunnisteet on lueteltu tiedostossa
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Määrittämätön arvo tarkoittaa kaikkia
  tyyppejä (toimintatapa ennen tämän asetuksen lisäämistä). Pyyntömoottorin
  `ssn_us`-malli vastaa tyyppiä `ssn`. Mallipohjat (Minimal, Standard, Financial,
  Brazilian, USA, Full) täyttävät vain käyttöliittymän valintaruudut.
- **Mukautetut mallit** — enintään 20 säännöllistä lauseketta tai jokerimerkkimallia (`*` = enintään 64
  muuta kuin tyhjemerkkiä, `?` = yksi merkki). Osumat korvataan arvolla `[CUSTOM_REDACTED]`.
  Jokainen malli käsitellään `compilePiiCustomPattern()`-funktiolla
  (`src/shared/utils/piiCustomPatterns.ts`): enintään 500 merkkiä, lipuista sallitaan vain
  `g i m s u`, mallin on käännyttävä, läpäistävä `safe-regex`-tarkistus (katastrofaalinen
  takaisinkelaus), eikä se saa vastata tyhjää merkkijonoa tai peittämisen paikkamerkkiä.
  Epäonnistunut malli hylätään tallennettaessa ja testattaessa, ja epäonnistunut tallennettu rivi
  ohitetaan suorituksen aikana sen sijaan, että se käännettäisiin. Mukautetut mallit suoritetaan vain,
  kun peittäminen on käytössä.
- **Havaintolaskurit** — tyyppikohtaiset määrät (eivät koskaan löytyneitä arvoja), joita säilytetään
  muistissa ja jotka nollataan uudelleenkäynnistyksen yhteydessä (`src/lib/pii/piiDetectionStats.ts`). Ne kasvavat vain,
  kun peittäminen on käytössä.

Asetukset sijaitsevat `key_value`-taulussa (nimiavaruus `pii_settings`,
`src/lib/db/piiSettings.ts`), ja ne luetaan 1 s:n välimuistin kautta. API:

| Menetelmä | Polku                    | Tarkoitus                                                              |
| --------- | ------------------------ | ---------------------------------------------------------------------- |
| `GET`     | `/api/settings/pii`      | Lippujen tila, `enabledTypes`, `customPatterns`, havaintolaskurit      |
| `PUT`     | `/api/settings/pii`      | Korvaa `enabledTypes`- (`null` = kaikki) ja/tai `customPatterns`-arvot |
| `POST`    | `/api/settings/pii/test` | Testaa yksi malli tallentamatta sitä enintään 8 KB:n näytettä vasten   |

Kaikki kolme edellyttävät hallinnan todennusta ja validoivat rungon Zodilla
(`src/shared/validation/schemas/piiSettings.ts`).

### Kehotesyötteiden manipulointi (`promptInjection.ts`)

Tunnistaa käyttäjän toimittaman sisällön vihamieliset rakenteet ja pakottaa
määritetyn käytännön käyttöön. Toimintaa ohjaavat ympäristömuuttujat ja konstruktorin
valinnat:

| Asetus     | Ympäristömuuttuja                                                                                     | Oletus | Vaikutus                                                                                                                                                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Käytössä   | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Kun arvo on `false`, suojakaide ohitetaan.                                                                                                                                                                                      |
| Tila       | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Injektiokäytäntö: `block`, `warn` tai `log`. (`redact` hyväksytään taaksepäin yhteensopivuuden vuoksi, mutta se **ei** poista injektiotekstiä; pyynnön PII-uudelleenkirjoitusta hallitaan asetuksella `PII_REDACTION_ENABLED`.) |
| Estokynnys | `blockThreshold`-asetus / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Estämiseen vaadittava vähimmäisvakavuus. Oletusarvoisesti keskitasoa vain tarkkaillaan.                                                                                                                                         |

**Tilan ensisijaisuusjärjestys** (`getMode`): kutsujan `options.mode` →
`INJECTION_GUARD_MODE`-arvon **tietokannan ominaisuuslipun ohitus** (Hallintapaneeli → Asetukset →
Ominaisuusliput) → `INJECTION_GUARD_MODE`-ympäristömuuttuja → `INPUT_SANITIZER_MODE`-ympäristömuuttuja →
`warn`. Hallintapaneelin ohitus on siten ensisijainen ympäristömuuttujiin nähden, joten Ominaisuusliput-käyttöliittymä
ohjaa käynnissä olevaa suojakaidetta reaaliaikaisesti (uudelleenkäynnistystä ei tarvita). Tietokantaluku on vikasietoinen:
jos siinä tapahtuu virhe, suojakaide palaa ympäristömuuttujiin perustuvaan toimintaan, ja jos
ohitusta ei ole asetettu, toiminta vastaa täysin pelkkiin ympäristömuuttujiin perustuvaa ratkaisua.

Tunnistuslähteet:

1. `sanitizeRequest()` moduulista `@/shared/utils/inputSanitizer` (muuallakin
   käsittelyketjussa käytetty yhteinen tunnistinjoukko).
2. Sisäänrakennetut `DEFAULT_GUARD_PATTERNS`-mallit (tällä hetkellä `system_override_inline` ja
   `markdown_system_block`, molempien vakavuus `high`).
3. Valinnaiset konstruktoriasetusten kautta välitetyt `customPatterns`-mallit (merkkijonoja, säännöllisiä lausekkeita
   tai `{ name, pattern, severity }`-tietueita).

Kun `mode === "block"` **ja** vähintään yksi tunnistus saavuttaa vakavuus-
kynnyksen, `preCall` palauttaa arvon `{ block: true, message: "Request rejected:
suspicious content detected" }`. `warn`-/`log`-tiloissa suojakaide kirjaa tapahtuman mutta
sallii kutsun. Myös yhteinen apufunktio `evaluatePromptInjection()` viedään
kutsujille, joiden on arvioitava kehotteita käyttämättä rekisteriä.

**Tarkistuksen raja (v3.8.20):** tunnistin tarkistaa vain yhdistetyn
kehotetekstin **ensimmäiset 16 KB** — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 tavua) tiedostossa
`src/shared/utils/inputSanitizer.ts`. Sekä `detectInjection()` että
`evaluatePromptInjection()` suorittavat `slice(0, MAX_INJECTION_SCAN_BYTES)`-kutsun ennen
mallisilmukan suorittamista. Injektio-ohjeet sijaitsevat syötteen alkupäässä, joten tämä
rajoittaa säännöllisten lausekkeiden suoritin- ja roskienkeräyskuormaa satojen kilotavujen hyötykuormissa heikentämättä tunnistusta (vrt.
#3932, #4041).

### Tunnistetietojen peittäjä (`credentialMasker.ts`)

Suoritetaan **molemmissa** vaiheissa, oletusketjun viimeisenä (prioriteetti `95`). Peittää
tunnetut API-avainten ja salaisten tunnusten mallit lähtevästä hyötykuormasta (viestien
sisältö, työkalukutsujen argumentit ja työkalujen tulokset) **sekä** palveluntarjoajan vastauksesta, jotta
kehotteeseen liitetty tunnistetieto (tai työkalun tuloksessa toistettu tunnistetieto) ei vuoda
palveluntarjoajalle tai takaisin asiakkaalle.

- **Vain erikseen käyttöön otettava**, sama käytäntö kuin PII-peittämisessä (lähellä kovaa sääntöä #20):
  poistettu käytöstä, ellei `settings.credentialRedactionEnabled === true` **tai**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kun se on pois käytöstä, suojakaide ei tee mitään —
  se ei koskaan estä eikä kirjoita sisältöä uudelleen.
- `redactCredentials()` käy läpi koko hyötykuorma-/vastauspuun (`walkValue()`,
  suojattu prototyyppisaastutukselta, suojattu sykleiltä `WeakSet`-joukon avulla) ja korvaa osumat
  `[REDACTED:<type>]`-paikkamerkillä kloonaten vain ne haarat, jotka todella
  muuttuivat.
- `CREDENTIAL_PATTERNS` kattaa LLM-palveluntarjoajien avaimet (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-tunnukset (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), maksuavaimet (Stripe, Square), pilvipalveluiden
  avaimet (AWS-käyttöavain, Twilio, SendGrid, Mailgun), yksityiset avaimet / JWT:t,
  tunnistetietoja sisältävät yhteysmerkkijonot (`mongodb://user:pass@...` jne.) sekä
  yleisen `Authorization`-/`x-api-key`-/`api-key`-/`apikey`-otsakearvon
  mallin. Otsakkeen muotoiset avaimet (`authorization`, `x-api-key`, `api-key`,
  `apikey`) peitetään rakenteellisesti (vain arvo; skeeman etuliite, kuten
  `Bearer `/`Basic `, säilytetään) yleisen tekstin säännöllisen lausekkeen sijaan.
- Suojakaide ei koskaan estä; se vain kirjoittaa uudelleen (`modifiedPayload` /
  `modifiedResponse`) ja lisää metatiedot (`meta.credentialsRedacted`, `meta.count`).

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
  block?: boolean; // true katkaisee ketjun välittömästi
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

Suojakaide ilmaisee, ettei muutoksia ole, palauttamalla joko arvon `void`, `{}` tai
`{ block: false }`. Arvon `modifiedPayload`/`modifiedResponse` palauttaminen korvaa
ketjussa eteenpäin myöhemmille suojakaiteille välitettävän arvon.
`signal?: AbortSignal` välittää kutsujan elinkaaren suojakaiteille. Pyynnön keskeytys on tarkoituksellinen avoimeksi jättävä poikkeus: mediasillat lopettavat työn ja siivoavat palauttamatta käsittelemätöntä mediaa kohteelle, jonka tiedetään, ettei se tue sitä.

## Rekisteri (`registry.ts`)

Singleton-olio `guardrailRegistry` tarjoaa seuraavat toiminnot:

- `register(guardrail)` — lisää suojakaiteen (tai korvaa sen normalisoidun nimen perusteella) ja
  järjestää suojakaiteet uudelleen `priority`-arvon mukaiseen nousevaan järjestykseen.
- `clear()` / `list()` — hallinnollisia aputoimintoja.
- `runPreCallHooks(payload, context)` — käy aktiiviset suojakaiteet läpi, välittää
  hyötykuorman `modifiedPayload`-arvojen kautta ja pysähtyy ensimmäiseen `block: true` -tulokseen.
- `runPostCallHooks(response, context)` — sama käsittely vastauksen puolella.
- `resetGuardrailsForTests({ registerDefaults })` — tyhjentää tilan ja valinnaisesti
  rekisteröi oletukset uudelleen testien puhdasta eristämistä varten.

Molemmat suorittimet palauttavat arvon `{ blocked, payload|response, results, guardrail?, message? }`,
jossa `results` on `GuardrailExecutionResult`-tietueiden taulukko. Tietueet sisältävät
kunkin suojakaiteen `blocked`-, `skipped`-, `modified`-, `error`- ja `meta`-kentät,
joista on hyötyä jäljityksessä.

### Suojakaiteiden poistaminen käytöstä pyyntökohtaisesti

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` kokoaa
duplikaateista puhdistetun luettelon suojakaiteiden nimistä, jotka tulee ohittaa nykyisessä
pyynnössä. Lähteet (kaikki valinnaisia ja yhdistetään):

- `apiKeyInfo.disabledGuardrails`
- Pyynnön rungon `disabledGuardrails` (ylimmällä tasolla)
- Pyynnön rungon `metadata.disabledGuardrails`
- Otsake `x-omniroute-disabled-guardrails` (tai vanha
  `x-disabled-guardrails`)

Arvot voivat olla merkkijonotaulukoita tai pilkuilla eroteltu merkkijono; nimet
normalisoidaan pienikirjaimisiksi kebab-case-muotoon (`pii_masker` → `pii-masker`). Tulos
välitetään rekisterille `context.disabledGuardrails`-arvon kautta, jolloin rekisteri ohittaa
vastaavat suojakaiteet (`skipped: true` kohteessa `results`).

## Suoritusjärjestys

Jokaiselle pyynnölle, joka kulkee tiedostojen `src/sse/handlers/chat.ts` ja
`open-sse/handlers/chatCore.ts` kautta:

1. `resolveDisabledGuardrails(...)` muodostaa ohitusluettelon API-avaimen, pyynnön rungon
   ja otsakkeiden perusteella.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` suorittaa suojamekanismit nousevassa
   prioriteettijärjestyksessä:
   - Käytöstä poistetut suojamekanismit kirjataan tilaan `skipped`.
   - Kunkin suojamekanismin `preCall` voi kirjoittaa hyötykuorman uudelleen `modifiedPayload`-arvon avulla.
   - Ensimmäinen `block: true` keskeyttää ketjun, ja käsittelijä palauttaa
     suojamekanismin hylkäysvastauksen.
3. Mahdollisesti uudelleenkirjoitettu hyötykuorma siirtyy yhdistelmäreititykseen ja edelleen
   ylävirran käsittelyyn.
4. Kun vastaus on koottu, `guardrailRegistry.runPostCallHooks(...)`
   suorittaa saman ketjun vastaukselle. Tässä vaiheessa `block: true` hylkää ylävirran
   vastauksen.

Poikkeuksen aiheuttaneet suojamekanismit kirjataan muodossa `error: <message>` ja lokitetaan
`logger.warn`-kutsulla, mutta ketjun suoritus jatkuu — suunnitellusti salliva virhetilanteissa.

## Määritykset

Sisäänrakennettujen suojamekanismien lukemat ympäristömuuttujat:

| Muuttuja                              | Käyttäjä                | Vaikutus                                                                                                |
| ------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`      | Aseta arvoksi `false`, jos haluat poistaa tunnistuksen kokonaan käytöstä.                               |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`      | Injektiokäytäntö: `warn`, `block` tai `log`. Vanha arvo `redact` ei kirjoita injektiotekstiä uudelleen. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`      | Injektiosuojan tila; myös tietokannan ominaisuuslippu, joka **ohittaa** ympäristömuuttujat (DB > ENV).  |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`      | Vähimmäisvakavuus, jonka `MODE=block` hylkää: `high` (oletus), `medium` tai `low`.                      |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`      | Vanha alias muuttujalle `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                              |
| `PII_REDACTION_ENABLED`               | `pii-masker`            | Kun arvo on `true`, pyynnön henkilötiedot peitetään (injektiotilasta riippumatta).                      |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (alavirta) | Hallitsee vastauksen peittimen toimintaa.                                                               |

Modality Bridge -suojamekanismit lukevat ajonaikaiset määritykset tietokantapohjaisesta asetussäilöstä
(`getSettings()`), eivät ympäristömuuttujista. Kuvankäsittelyn ensisijaiset avaimet ovat
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ja
`modalityBridgeCacheMaxEntries`. Vanhoja
`visionBridge*`-avaimia tuetaan vain dokumentoituna yhden julkaisusyklin lukemisen
vararatkaisuna; hallintapaneelin kirjoitukset käyttävät ensisijaisia avaimia. Oletusarvot ja vararatkaisun
selvitystoiminto sijaitsevat tiedostossa `src/shared/constants/modalityBridgeDefaults.ts`, ja vanhat
vakiot säilytetään tiedostossa `src/shared/constants/visionBridgeDefaults.ts`.

Ääni käyttää asetuksia `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` ja `modalityBridgeAudioMaxClips` sekä jaettuja
`modalityBridgeCache*`-asetuksia. Äänelle ei ole vanhojen avainten vararatkaisua, koska nämä
avaimet otettiin käyttöön Modality Bridge -skeeman yhteydessä.

Video käyttää asetuksia `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` ja
`modalityBridgeVideoTimeout` sekä jaettuja `modalityBridgeCache*`-asetuksia.
Se on oletusarvoisesti poissa käytöstä, koska FFmpeg/ffprobe ovat valinnaisia operatiivisia
riippuvuuksia ja kuvatekstien tuottaminen videoruuduille lisää viivettä ja mallin käyttökustannuksia.

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

1. Luo `src/lib/guardrails/myGuardrail.ts`, joka laajentaa `BaseGuardrail`-luokkaa.
2. Toteuta `preCall` ja/tai `postCall`.
3. Rekisteröi joko tuonnin yhteydessä (lisää `registerDefaultGuardrails`-funktiosta) tai
   kutsu `guardrailRegistry.register(...)` suorituksen aikana — rekisteri korvaa
   kaikki aiemmat suojaukset, joilla on sama normalisoitu nimi.
4. Lisää testit hakemistoon `tests/unit/` (olemassa olevia esimerkkejä:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testaus

Käytä `resetGuardrailsForTests()`-funktiota testien välissä, jotta jokainen testi alkaa tunnetusta tilasta.
Anna `{ registerDefaults: false }`, jos haluat aloittaa tyhjällä rekisterillä ja
rekisteröidä vain testattavat suojaukset. Vision Bridge hyväksyy riippuvuuksien
injektoinnin (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge tarjoaa
vastaavat liityntäkohdat asetuksille, ominaisuuksille, STT-mallin valinnalle, tunnistetietojen
tarkistuksille ja litteroinnille. Testeillä voidaan siten testata kumpaakin työnkulkua ilman
tietokanta- tai verkkoyhteyttä.

## Katso myös

- `src/lib/guardrails/` — toteutus
- `src/shared/utils/inputSanitizer.ts` — jaettu tunnistin, jota käytetään
  kehoteinjektioiden havaitsemiseen ja henkilökohtaisten tunnistetietojen peittämiseen
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridgen oletusarvot ja
  pakotetun siltauksen malliluettelo
- `src/shared/constants/modalityBridgeDefaults.ts` — Vision/Audio-ajonaikaiset jaetut oletusarvot
- `docs/architecture/RESILIENCE_GUIDE.md` — erillinen kerros (piirikatkaisin, jäähdytysajat)
- `docs/reference/ENVIRONMENT.md` — täydellinen ympäristömuuttujien viite

## Injektiosuojauksen reittikattavuus ja red-team-testaus (vaihe 8 · lohko D)

Injektiosuojaus (`createInjectionGuard` / `withInjectionGuard`) kattaa kaikki reitit,
jotka hyväksyvät käyttäjän kehotteita. Se noudattaa `INJECTION_GUARD_MODE`-asetusta (oletus `warn` = vain kirjaus;
`block` = palauttaa HTTP 400 `SECURITY_001`).

| Tyyppi            | Reitit                                                                                                                                               | Oletustila |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Teksti (nykyinen) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn       |
| Generatiivinen    | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn       |
| Data              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn       |

Tekstin poiminta (`extractMessageContents`) kattaa kentät `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team-testaus (öisin, `nightly-llm-security.yml`):** promptfoo varmistaa, että kukin reitti estää
OWASP-LLM-aineiston tilassa `INJECTION_GUARD_MODE=block`; garak suorittaa testit (ohitetaan ilman salaisuutta).
`moderations` sisältyy yhdenmukaisuuden vuoksi — estotilaa käyttävät ylläpitäjät voivat vapauttaa sen
`resolveDisabledGuardrails`-toiminnolla.

Öisin suoritettavassa työnkulussa (`.github/workflows/nightly-llm-security.yml`, cron + manuaalinen
käynnistys) on kaksi työtä:

- **`promptfoo-guard` (estävä)** — suorittaa komennon `promptfoo eval -c promptfooconfig.yaml`
  asetuksella `INJECTION_GUARD_MODE=block`. Kukin vihamielinen tapaus (esim. "ohita kaikki
  aiemmat ohjeet…", DAN-tyyliset suojauksen ohitukset) varmistaa, että vastaus sisältää
  arvon `error.code === "SECURITY_001"` eli että suojaus todella hylkäsi pyynnön.
- **`garak` (neuvoa-antava)** — suorittaa garakin asetuksella `--probes promptinject,dan,leakreplay`
  paikallista OmniRoute-instanssia (`http://localhost:20128/v1`) vasten. Suoritus riippuu
  palveluntarjoajan salaisuudesta (`PROMPTFOO_PROVIDER_KEY`); ilman sitä testi ohitetaan hallitusti, ja
  komentoon on lisätty loppuliite `|| true`, joten se raportoi tulokset aiheuttamatta CI-ajon epäonnistumista.

Suojausaputoiminnon (`createInjectionGuard` / `withInjectionGuard`)
kattavuus ulottuu kaikkiin kehotteita vastaanottaviin `/v1`-reitteihin; kehoteteksti poimitaan
kentistä `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`
`src/shared/utils/inputSanitizer.ts`-tiedoston `extractMessageContents()`-funktiolla.
