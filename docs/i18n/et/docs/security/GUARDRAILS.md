# Guardrails (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Tõesallikas:** `src/lib/guardrails/`
> **Viimati uuendatud:** 2026-10-17 — v3.8.52 (lisatud [Katvus ja piirangud](#coverage-and-limits):
> milliste marsruutide ja vastuseteedeni hook'id ulatuvad, liidetud keelamise päised (#16412),
> injektsiooni blokeerimisrežiim kohustusliku piirina (#16413) ja mis näeb vastust enne post-call'i)

Guardrail'id jõustavad turva-, poliitika- ja sisuteisendusi OmniRoute'i ja
ülesvoo pakkujate vahelisel piiril. Iga guardrail saab kontrollida (ja soovi
korral tagasi lükata, teisendada või annoteerida) päringute sisu (`preCall`)
ja ülesvoo vastuseid (`postCall`).

Süsteem on **fail-open**: kui guardrail viskab täitmise ajal vea, salvestab
register vea ja jätkab järgmise guardrailiga, selle asemel et päring
ebaõnnestada. Blokeerimine on alati selgesõnaline otsus (`block: true`),
mitte kunagi juhus. Ainus erand on katkestatud päring: kui väljakutsuja
`signal` katkestatakse, lükkab vea viskav guardrail hook'i käivituse tagasi,
selle asemel et vahele jääda.

Hook'id **ei** käivitu igal marsruudil ega iga vastuse puhul. Enne
guardrail'ile turvamehhanismina toetumist loe jaotist
[Katvus ja piirangud](#coverage-and-limits).

## Sisseehitatud guardrail'id

Register laadib importimisel automaatselt kuus guardrail'i
prioriteedijärjekorras (vt `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteet | Nimi                | Etapp(id)      | Fail                  |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Madalamad prioriteedinumbrid käivituvad **esimesena**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 põhimudelil ja variantidel `glm-5.3-{low,high,max}` on
registri/spetsifikatsiooni metaandmetes selgesõnaliselt märgitud
`supportsVision:false`. GLM 5.3 Flash variandid on endiselt natiivse
visiooniga mudelid. Claude Code'i marsruut `/v1/messages` siseneb jagatud
`handleChat` pre-call guardrail-ahelasse **enne** Claude–OpenAI tõlget;
pesastatud `Read` tööriistatulemuste pildid tuleb kirjeldada või käsitleda
enne, kui see tõlge need OpenAI `image_url` sisusse tõstab (#17069).

Püüab kinni pilte sisaldavad päringud, mis on suunatud **visioonita
mudelitele**, ja suunab kas kogu päringu ümber visioonivõimelisse mudelisse
või asendab pildiosad seadistatava visioonimudeli toodetud
tekstikirjeldustega enne ülesvoo väljakutset. See võimaldab ainult-teksti
pakkujatel multimodaalseid sissekandeid läbipaistvalt käsitleda.

Töövoog:

1. Jäta vahele, kui sihtmudel toetab juba visiooni (välja arvatud juhul, kui
   see esineb sundsildamise loendis `isVisionBridgeForcedModel`).
2. Eralda pildiosad funktsiooniga `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), mis delegeerib töö **ühendatud
   meediumidetektorile** `detectMediaParts()` failis
   `open-sse/utils/mediaParts.ts` — ainus tõeallikas, mida jagatakse kombo
   ühilduvusfiltriga. Eraldamine on lubatud loendi kaudu piiratud kujudega,
   mille `replaceImageParts` suudab tagasi liita (extract↔replace leping):
   OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic
   URL `source.type:"url"` ja Responses API `input_image`. Sobivad pildid,
   mis on pesastatud Claude Code'i `tool_result.content`-i ja Responses'i
   tööriistaväljundite sisse, samuti eraldatakse ja asendatakse nende
   algsetel teedel; ainult-indikaatorit sisaldavad kujud on kombofiltri
   materjal ja neid ei eraldata. Kui ühtegi ei leita, jäta vahele.
3. Lahenda käitusaegne seadistus funktsiooniga
   `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): uued `modalityBridge*`
   seadistusvõtmed võidavad; pärandvõtmed `visionBridge*` jäävad **ühe
   tsükli varulahenduseks** (tagasipööramise aken). Kui sild on keelatud,
   jäta vahele enne igasugust meedia läbimist.
4. Režiimivalija (`modalityBridgeVisionMode`, vt allolevat tabelit)
   otsustab ümbersuunamise ja kirjeldamise vahel. Ümbersuunamine tagastab
   `modifiedPayload`, kus on vahetatud ainult `model`, pluss meta
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Kirjeldamise tee: piira piltide arv väärtusega `maxImages`, koosta
   ülesandest teadlik prompt, konsulteeri kirjelduste vahemäluga, kutsu
   visioonimudel **paralleelselt** (`Promise.allSettled`) ja süsti nende
   asemele tekstiosad `[Image N]: <description>`. Ebaõnnestunud kirjeldus
   annab `null`: algne pilt säilitatakse tundmatute või visioonivõimeliste
   sihtmudelite jaoks (#4012), kuid **kinnitatud ainult-teksti otsene
   sihtmudel** või null-visiooniga kombo saab iga kirjeldamata pildi jaoks
   selgesõnalise tekstikohatäite
   `(unavailable — no vision-capable provider connected)`, sealhulgas
   osaliste tõrgete ja kirjelduskõnede ülempiirilt välja jäävate piltide
   korral (#17069). Olemasolev kõigi-katkestuste korral rakenduv kombo
   kirjeldamise varulahendus jääb paika (#8430).
6. Tagasta `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Režiimivalija (`modalityBridgeVisionMode`)

| Režiim     | Vaikimisi | Käitumine                                                                                                                                                                                                                                                                                      |
| ---------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔         | Pärandheuristika, puutumata (#6640/#7204): mitte-kombo/`auto/` mudelid suunatakse ümber parimale visioonimudelile, välja arvatud juhul, kui algsel mudelil on juba kasutatavad mandaadid (siis luuakse kirjeldus); kombosihtkohad loovad alati kirjelduse.                                     |
| `describe` |           | Alati kirjeldus — ümbersuunamisplokk jäetakse täielikult vahele; kasutaja valitud mudel vastab alati.                                                                                                                                                                                          |
| `reroute`  |           | Sunnitud ümbersuunamine: mandaadiga mudeli säilitamise kaitsest möödatakse. Ümbersuunamis-**sihtkoha** mandaadikaitse kehtib endiselt — kui kasutatavat visioonisihtkohta pole, blokeerib sild selge veateatega, selle asemel et kirjeldust luua või saata toorpildid ainult-teksti sihtkohta. |

Sunnitud režiimid lühistuvad **enne** automaatse heuristika käivitumist; `auto`
käitumine on baitide haaval identne PR-1-eelse kaitsemehhanismiga.

#### API-võtme ulatus (`visionBridgeKeyScope.ts`)

Kui helistaja API-võti piirab `allowedConnections`, kvoodikogumeid
(`allowedQuotas`) või mudeleid (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), valib sild ainult
sellised ümbersuunamis- ja kirjeldusmudeleid, mida võti tohib kasutada, ja
ühendustel, mida võti tohib kasutada. Kirjeldusepäring läbib seejärel alati
OmniRoute'i enesetsükli päisega `x-omniroute-self-loop-key-id`, nii et
vastuvõttev vestluspäring jõustab selle võtme ühenduse- ja mudelipoliitika
uuesti. `enforceApiKeyPolicy()` arvestab seda päist ainult koos enesetsükli
kanduriga (bearer), seega saab see juurdepääsu ainult kitsendada, ja id, mis ei
lahene, lükatakse tagasi.

Kui võtme jaoks pole ühtegi visioonimudelit lubatud, lükkab **kinnitatud
ainult-teksti sihtkoht** pildipäringu kohapeal tagasi selge HTTP 400-ga, selle
asemel et edastada pildibaite võimetule ülemvoolupakkujale (#17069). Tundmatu
või sisemise visioonivõimekusega sihtkohtade puhul säilitab kirjeldustee oma
varasema fail-open käitumise (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Päringud ilma võtmeta ja võtmed ilma nende piiranguteta käituvad täpselt nii
nagu varem.

#### Ülesandeteadlik kirjeldusprompt (`modalityBridgeVisionTaskAware`)

Vaikimisi **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) lisab
põhilisele kirjelduspromptile **viimase kasutaja sõnumi** teksti (kärbituna 500
märgini), suunates kirjelduse sellele, mida kasutaja tegelikult küsis
(codex-vision-proxy muster), ja palub visioonimudelil nähtava teksti
transkribeerida. Kui lipp on välja lülitatud — või kasutajateksti pole —
kasutatakse põhiprompti muutmata kujul.

Kirjelduse enesetsükli enda OpenAI-ühilduv päring (`callVisionModelSingle()`
failis `visionBridgeHelpers.ts`) nõuab alati `image_url.detail: "high"` —
tingimusteta, iga helistaja/pakkuji puhul, ilma et see sõltuks ühestki
kliendisignaalist. Madala detailsusega töötlemine halvendab OCR-i täpsust just
selle teksti-transkribeerimisülesande puhul, mida see prompt nõuab, seega
nõuab kirjelduspäring ise alati kõrget detailsust, olenemata sellest, millist
detailsustaset algne sissetulev päring kasutas. See mõjutab ainult sisemise
kirjelduspäringu keha; see ei muuda, kuidas OmniRoute edastab helistaja enda
`image_url.detail` väärtust esmasel päringul — seda vaikimisi rakendatakse
eraldi ja ainult tuvastatud OpenCode'i klientide puhul, funktsioonis
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Kirjelduse enesetsükli Anthropic'i ülekandevormingu harul pole `detail` välja
ja kumbki vaikimisi seda ei mõjuta.

#### Kirjelduse väljundi ülempiir (`modalityBridgeVisionMaxChars`)

| Võti                           | Vaikimisi | Vahemik           |
| ------------------------------ | --------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`       | `0` või 100–50000 |

`0` (vaikimisi) tähendab **ülempiiri puudumist** — `callVisionModel()`
tagastatud kirjeldus antakse muutmata kujul edasi, säilitades olemasoleva
käitumise. Iga väärtus vahemikus 100–50000 kärpib kirjeldust `…` järelliitega,
enne kui see liidetakse tagasi kujul `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` failis `src/lib/guardrails/visionBridge.ts`).
Suurendage seda detailirohkete OCR-ülesannete korral, kus allavoolu mudel vajab
täielikku transkriptsiooni; vähendage seda, et piirata tokenikasutust sõnakate
visioonimudelite puhul. Armatuurlaua väli asub Visiooni vahekaardi täpsemate
sätete paneelil (`modality-bridge-max-chars` failis `ModalityBridgeVisionTab.tsx`)
ja tõstab iga väärtuse vahemikus 1–99 kuni 100 alampiirini, jättes samas
selgesõnalise `0` puutumata — `0` on omaette kehtiv Zod-i väärtus
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), mitte pelgalt
"määramata" vaikeväärtus.

#### Kirjelduse vahemälu (`modalityBridge/bridgeCache.ts`)

Mälusisene LRU + TTL vahemälu kirjeldusväljundite jaoks, jagatud kogu protsessi
ulatuses. Võti = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
pikkusprefiksi raamistusega (väljapiiride kollisioone ei teki). Mudelikomponent
on **konfigureeritud** sillamudel, mitte tegelikult vastanud mudel —
`callVisionModel` võib sisemiselt varule lülituda ja katsekaupa võtmestamine
killustaks vahemälu. Ebaõnnestunud kirjeldusi ei hoita kunagi vahemällu. Sätted:

| Võti                            | Vaikimisi | Vahemik |
| ------------------------------- | --------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`    | —       |
| `modalityBridgeCacheTtlMinutes` | `60`      | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`     | 10–5000 |

#### Kaugpildi normaliseerimine (self-loop describe/base64 fetch)

Kui sild hangib **kaugpildi** ise — Anthropic'i describe-isekõne ja
claude-wire-vormingu base64-teisenduse
(`ensureBase64ImagesForClaudeWire`), mõlemad läbi
`fetchRemoteImageAsDataUri()` failis `visionBridgeHelpers.ts` — juhitakse
saadud data URI enne visioonimudeli päringusse manustamist läbi
`normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`). Ülisuured pildid
vähendatakse **2048px pikema servani** (vastab suurusepiirangule, mida
OpenAI/Anthropic juba serveripoolel rakendavad), mis kärpib üleslaadimise
baitide hulka/latentsust muutmata seda, mida visioonimudel näeb. Suuruse
muutmiseks kasutatakse `sharp`-i, mis laaditakse dünaamilise impordi kaudu:
platvormil, kus selle natiivbinaari laadimine ebaõnnestub, **ei viska**
`normalizeDataUri()` **kunagi viga** — see lülitub tagasi algsete baitide
läbilaskmisele, nii et describe/base64-teisenduse tee töötab alati edasi.
Mittepildibaidid (fetch, mis ei tagastanud dekodeeritavat pilti) lastakse
samuti puutumatult läbi. See normaliseerimine piirdub piltidega, mille sild
hangib omaenda isekõne jaoks — seda ei rakendata kunagi kutsuja toorele
läbilaske-payloadile, kooskõlas ainult-opt-in mutatsiooniprintsiibiga
(karm reegel nr 20).

#### Seadete skeem + migratsioon

Uued `modalityBridge*`-võtmed valideeritakse Zodiga `updateSettingsSchema`-s
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*`-kolmik ja Audio
Bridge'i poolt kasutatav `modalityBridgeAudio*`-grupp. Migratsioon
`141_modality_bridge_settings.sql` kopeerib olemasolevad pärand-
`visionBridge*`-väärtused vastavatesse uutesse võtmetesse (idempotentne, ei
k kirjuta kunagi üle operaatori seatud `modalityBridge*`-väärtust);
pärandvõtmed jäävad aktsepteerituks lugemis-tagasivaruna üheks
väljalasketsükliks.

#### Läbipaistvuspäis + statistika

Describe-teisendatud vastused kannavad päist
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(ehitab `buildModalityBridgeHeader()` failis `modalityBridge/bridgeStats.ts`,
lisab `withModalityBridgeHeader()` failis `src/sse/handlers/chatHelpers.ts`).
Ümbersuunatud päringud **ei saa** päist — payload jäi puutumata ja mudeli
vahetus on juba nähtav vastuse keha `model`-väljal.

`GET /api/modality-bridge/stats` (haldusautentimine, sama tase kui
`GET /api/settings`) tagastab mälusisensed modaalsusepõhised loendurid
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` modaalsuste `vision`, `audio`
ja `video` jaoks. `averageLatencyMs` kasutab nimetajana `latencySamples`-i,
mitte kõiki katseid; ilma ajastuseta operatsioon ei fabritseeri
nullmillisekundilist näidist. `bridged` jääb edukate teisenduste
tagasiühilduvaks aliaseks; ebaõnnestunud katsed seda ei suurenda. Loendurid
lähtestuvad protsessi taaskäivitusel tahtlikult (telemeetria, mitte
arvestus).

#### Armatuurlaua konfiguratsioon

Spetsiaalne armatuurlaua leht on `/dashboard/settings/modality-bridge`. Selle
URL-aadresseeritavad vahekaardid `Vision`, `Audio` ja `Video` säilitavad
päringuparameetrid `tab`-väärtuse vahetamisel. Vision-vahekaart paljastab
lubamise, režiimi, mudeli valiku (sh automaatse vaikeväärtuse),
ülesandeteadliku promptimise, täiustatud
timeouti/pildi/kirjelduse-pikkuse/vahemälu piirangud, käitusaja loendurid ja
kaitstud näidispäringu. Audio-vahekaart on samuti aktiivne: see paljastab
lubamise, ainult-STT mudelivalija koos Auto-valikuga, timeouti/max-klipi
piirangud, heli loendurid ja `input_audio` näidistesti. Video-vahekaart on
funktsionaalne: see teavitab FFmpeg/ffprobe'i käitusaja olekust — üks
neljast selgesõnalisest UI-olekust (`unknown`, kui sondeerimine on käimas
või ei saanud lõpule viidud, `restricted` mitte-loopback armatuurlaua
hostil, kus sondeerimine jäetakse kliendipoolel vahele, `unavailable`, kui
on sondeeritud ja puudumine kinnitatud, või `available` koos FFmpeg/ffprobe'i
versioonidega) — salvestab enable/model/frame/video/timeout piirangud,
filtreerib mudelivalija visioonivõimelistele mudelitele ja paljastab video
loendurid.

Endine Vision Bridge'i kaart AI-seadete all on ühilduvuslink uuele lehele;
see ei oma enam vormi teist koopiat. Media Providers lingib ka Image-to-Text
ja Speech-to-Text töövood vastavate Modality Bridge'i vahekaartidega,
eemaldamata olemasolevat Speech-to-Text mänguväljakut.

**Self-loop'i sissepääsu möödapääs:** kui describe-kõne suunatakse läbi
OmniRoute'i enda `/v1` self-loop'i (mitte-standardne pakkujamudel), saadab
alampäring `x-omniroute-admission-bypass: internal` ja autenditakse
lahendatud self-loop'i mandaadiga — kohalik `sk_omniroute` sentinel
kohalikus režiimis või operaatori konfigureeritud `OMNIROUTE_API_KEY` /
`ROUTER_API_KEY` keskkonnavõti (#1350), et `REQUIRE_API_KEY=true` juurutused
saaksid endiselt describe-kõnet käivitada. Möödapääsu austatakse ainult
nende täpsete mandaatide puhul, nii et välised kliendid ei saa päist
sissepääsu vahelejätmiseks kasutada.

Pärandvaikeväärtused asuvad failis `src/shared/constants/visionBridgeDefaults.ts`;
uued režiimi/ülesandeteadlikkuse/vahemälu vaikeväärtused ja seadete lahendaja
asuvad failis `src/shared/constants/modalityBridgeDefaults.ts`. Guardrail
pakub `deps` konstruktorivalikut, et testid saaksid süstida võltsitud
`getSettings` ja `callVisionModel` implementatsioone.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Peab kinni helisisendit sisaldavad vestluspäringud enne, kui need jõuavad
sihtmärgini, mille kohta pole teada, et see helisisendit aktsepteerib. See ei
suuna vestluspäringut kunagi ümber: heliosad transkribeeritakse olemasoleva
OpenAI-ühilduva multipart-lõpp-punkti kaudu ja valitud vestlusmudel jätkab
teksti-transkriptsioonidega.

Voog:

1. Tuvastage `supportsAudio` funktsiooni `getResolvedModelCapabilities()` kaudu. Esmajärjekorras kasutatakse teenusepakkujate registri otseseid metaandmeid, seejärel mudeli staatilisi metaandmeid ja lõpuks sünkroonitud välja `modalities_input`. Deklareeritud sisendiloendi väärtus ilma elemendita `audio` on `false`; kui võimekuse kohta puuduvad tõendid, jääb väärtuseks `null`. Nii `false` kui ka `null` aktiveerivad konservatiivse silla, samas kui `true` jätab selle vahele.
2. Tuvastage `modalityBridgeAudio*` sätted ja eraldage kõigist sõnumitest ühise detektori `detectMediaParts()` abil asendatavad tipptaseme heliosad. Toetatud edastusvormingud on OpenAI `input_audio`, `audio_url` ja `source.media_type: "audio/*"`. Pesastatud heli tuvastatakse marsruutimiseks, kuid asendustee seda ei eemalda. Tööd piirab `modalityBridgeAudioMaxClips`; hilisemad osad jäävad puutumata.
3. Kasutage seadistatud väärtust `provider/model` või laske funktsioonil `selectAudioBridgeModel()` läbida `AUDIO_TRANSCRIPTION_PROVIDERS` kataloogi stabiilses järjekorras ja valida esimene mudel, mille jaoks on olemas kasutatav aktiivne teenusepakkuja autentimistunnus.
4. `callAudioTranscription()` teisendab base64-/andme-URI-vormingus heli mitmeosalise vormingu väljaks `file` või laadib kaugviite `audio_url` kaudu alla, kasutades ainult avalikke aadresse lubavat väljaminevate ühenduste kaitset koos DNS-i sidumise ja 25 MB piiranguga. Seejärel saadab see faili ja valitud mudeli POST-päringuga kohalikku iseringluse lõpp-punkti `/v1/audio/transcriptions`, autentides päringu funktsiooniga `resolveSelfLoopBearer()`. Olemasolev transkriptsioonimarsruut teeb tavapärase autentimistunnuste otsingu, haldab ooteaegu ja kiirusepiiranguid ning suunab päringu teenusepakkujale.
5. Edukate kutsete korral asendatakse vastavad osad tekstiga `[Audio N]: <transcript>`. Kutsed käivitatakse meetodiga `Promise.allSettled`: üksiku kutse nurjumisel säilitatakse algne heliosa (lepingu #4012 nõue). Kui kõik kutsed nurjuvad ja sihtmudeli puhul on tõendatud `supportsAudio === false`, asendatakse osad tekstiga `[Audio N]: (unavailable — no STT provider connected)` (lepingu #8430 nõue). Tundmatu sihtmudeli (`null`) puhul jääb tulemus kõigi kutsete nurjumisel puutumata. Tõendatult ainult teksti toetav sihtmudel, mille jaoks pole kasutatavat STT-autentimistunnust, saab sama selgesõnalise asendusteksti ilma võrgukutset tegemata.

Edukate transkriptsioonide jaoks kasutatakse protsessiülest modaliteedisilla LRU-/TTL-vahemälu. Võti ühendab heliviite, stabiilse toimingusildi `audio-transcription` ja valitud STT-mudeli; nurjumisi ei salvestata kunagi vahemällu. Helitöötluskatsed värskendavad ühiseid loendureid `bridged`, `cacheHits`, `failures` ja `lastUsedAt`. Teisendatud vastused sisaldavad päist `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; puutumata päringutele audiosilla segmenti ei lisata.

Käituskeskkonna sätted talletatakse andmebaasis ja valideeritakse Zodiga:

| Võti                          | Vaikeväärtus | Vahemik               |
| ----------------------------- | ------------ | --------------------- |
| `modalityBridgeAudioEnabled`  | `true`       | —                     |
| `modalityBridgeAudioModel`    | `""`         | Automaatne või STT ID |
| `modalityBridgeAudioTimeout`  | `60000`      | 1000–300000           |
| `modalityBridgeAudioMaxClips` | `3`          | 1–10                  |

Ühist vahemälu juhivad endiselt `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ja `modalityBridgeCacheMaxEntries`.

### Videosild (`videoBridge.ts`, `videoBridgePipeline.ts`)

Püüab enne teadaoleva loomuliku videotoeta sihtmudeli kutsumist kinni Chat Completionsi `messages` ja Responses API `input` tipptaseme videoosad. Toetatud vormingud on `input_video`, `video_url`, `video_source`, HTTPS-URL-id ja `data:video/*;base64,...` andme-URI-d. Tekstis olevaid lihtsaid failinimesid ei käsitleta videona.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) vastutab päringu läbimise, võimekuse ja reeglite kontrolli, päringupõhise agregeerimise ning vastuse sisu eest. Iga video töötlemine — hankimine, terviktulemuse vahemälu, kaadrijada kirjeldamine (mis ühendab ka kutsuja deklareeritud helitranskriptsiooni) ning katsepõhised mõõdikud, katkestamine ja puhastamine — on peidetud funktsiooni `processVideoPart` taha failis `videoBridgePipeline.ts`; seda kutsutakse tsükli `preCall` sees üks kord iga videoosa kohta. See moodul määratleb ka selgesõnalised pordipiirid `VideoMediaBrokerPort` (baitide hankimine ja valimisse kuuluvate kaadrite eraldamine), `VideoAudioTranscriptionPort` (kutsuja deklareeritud helitranskriptsiooni ühendamine valimisse kuuluvate kaadrite kirjeldustega) ja `VideoDrilldownPort` (kaadrite süvaanalüüsi püsivuse piir; pole veel funktsiooniga `processVideoPart` ühendatud — praegu kirjutab süvaanalüüsi kirjeid ainult eraldi marsruut `/api/modality-bridge/video/drilldown`).

Avalik `/v1` päringutee ei impordi ega käivita kunagi alamprotsessi. Kaugvideod laaditakse alla 50 MiB piiranguga; tekstisisesel base64-videol on konservatiivne 36 MiB dekodeeritud mahu piir video kohta, et mudeli, sõnumite ja raaminduse ümbris jääks avalike JSON-päringute 50 MiB vastuvõtupiiri sisse. Tekstisisest pikkust ja dekodeeritud mahu hinnangut kontrollitakse enne mälu eraldamist. HTTPS on nõutav nii algse kaug-URL-i kui ka iga ümbersuunamise korral ning kasutatakse olemasolevat ainult avalikke aadresse lubavat väljaminevate ühenduste kaitset koos DNS-i sidumisega. Seejärel liiguvad baidid üle täpselt määratud sisemise vahenduspiiri `POST /api/modality-bridge/video/extract`. See marsruut on ühtaegu `LOCAL_ONLY` ja `SPAWN_CAPABLE`, võtab vastu ainult protsessipõhiselt autenditud usaldusväärse tagasisideaadressi kaudu saabunud päringuid ega aktsepteeri kunagi URL-i, failisüsteemi teed, käivitatavat faili ega argumentide loendit. API päringukeha mahu töötlemisahel ja töötleja inkrementaalne päringukeha lugeja jõustavad teineteisest sõltumatult vahendussisendi 50 MiB piirangu. Selle piiratud järjekord töötleb korraga üht eraldustoimingut, lubab nelja ootel tööd ja piirab ootel sisendi kogumahu 100 MiB-ni.

Brokeri sees loeb `ffprobe` privaatset kohalikku faili; fikseeritud vormingute lubatud-loend välistab esitusloendi- ja manifestivormingud. Lubatud MOV-perekonna konteinerite puhul jäävad välised MOV-andmeviited vaikimisi keelatuks ja fikseeritud käsk ei lülita neid sisse. Nii `ffprobe` kui ka `ffmpeg` kasutavad ainult `file`-protokolli lubatud-loendit, ühte lõime, fikseeritud argumentide massiive, ilma shellita ning käivitatavaid faile, mis lahendatakse `PATH`-ist. Attached-picture-tüüpi kaanevood ei ole esituskandidaadid. Kõik esitatavad vood peavad vastama piirangutele ning selgesõnalist vaikevoogu eelistatakse enne deterministlikku madalaima indeksiga tagasilangemist. Videod on piiratud 600 sekundi, 8 192 piksli mõõtme kohta ja 33 554 432 lähtepiksliga. FFmpeg võtab 1–16 keskpunkti JPEG-kaadrit, vähendab pikema serva kuni 1 024 pikslini ilma väiksemaid sisendeid suurendamata ega saa kunagi URL-i. Diskreetimine on vaikimisi `uniform`. Valikuline `scene_aware` ja eksperimentaalne `segment_aware` poliitika teevad ühe täiendava fikseeritud FFmpeg-läbimise juba valideeritud kohaliku voo üle, valivad piiratud `showinfo` stseeni-ajatemplid ning langevad detektori tõrke, ajalõpu, vigase väljundi või tühja kandidaatide hulga korral deterministlikult tagasi samade ühtlaste keskpunktide juurde. Segmenditeadlik režiim jaotab keskpunkti näidised proportsionaalselt valideeritud stseeniintervallidega; segmenditeadlikke tõendeid ja tagasilangemise käitumist kirjeldatakse allpool. Range 16 kaadri ülempiir rakendatakse igas poliitikas pärast valikut. Kui stseeniteadlikul päringul on vaid ühe kaadri eelarve, kasutatakse aktiivse kogu video või fookusakna ühtlast keskpunkti ja teatatakse `policyEffective: uniform`: üks valitud stseenikaader ei suuda säilitada mõlemat ajalist otsa. Kutsuja võib soovi korral esitada lõpliku fookusakna (`start`/`end` sekundites); piirid kinnitatakse meedia kestusele, ümberpööratud või mittelõplikud aknad lükatakse tagasi ning kõiki diskreetimispoliitikaid rakendatakse ainult normaliseeritud intervallis. Saadud aken kaasatakse diskreetimise metaandmetesse ja ebausaldusväärse kirjelduse eesliitesse, et allavoolu mudelid saaksid eristada fokuseeritud katkendit kogu ajajoonest.

Semantiline kirjeldusfookus on eraldi, selgesõnaline seadistus. Vaikimisi `full` analüüsirežiim säilitab olemasoleva kaadri-prompti ega edasta päringuteksti kunagi kirjeldusmudelile. Režiimis `focused` loeb sild ainult sama Chat- või Responses-konteineri viimast mittetühja kasutaja loodud `text`/`input_text` väärtust, normaliseerib selle NFC-ks, koondab juhtmärgid ja tühikud ning piirab selle 500 Unicode'i koodipunktiga. Tühi tulemus langeb tagasi täpse `full`-prompti juurde. Kasutatav vihje seerianakse JSON-ina spetsiaalses ebausaldusväärse kasutajakonteksti blokis ja see võib ainult prioriseerida jälgitavaid detaile; see ei saa tühistada eraldi hoiatust meedias nähtavate või kuuldavate juhiste järgimise vastu. Tekstiline fookus ei tuleta kunagi `start`/`end` väärtusi ega muuda ajalist diskreetijat.

#### FU-07 struktuursed segmenditõendid

`segment_aware` kasutab ühte piiratud eelanalüüsi läbimist juba valideeritud kohaliku videovoo üle. Fikseeritud filtriaahel skaleerib esmalt laiuse kuni 320 pikslini, tuvastab stseenimuudatused ja külmunud intervallid, seejärel võtab 1 kaader sekundis näidiseid udususe, keskmise heleduse (luma) ning ruumilise ja ajalise teabe kohta. Läbimine on piiratud 600 struktuurse näidisega, ühe FFmpeg/filtri lõimega, sama ainult `file`-protokolli ja konteinerite lubatud-loendiga, 1 MiB protsessi-väljundi piiriga ning kuni 30 sekundiga brokeri ühise katkestuse/tähtaja piires. See ei võta päringust kunagi vastu käsku, filtrit, teed ega URL-i.

Struktuursed väärtused on deterministlikud diskreetimistõendid, mitte semantiline videomõistmine. Need ei tuleta subjekte, tegevusi, kirjeldusi, kõnet ega kasutaja kavatsust. Stseeni- ja külmumispiirid moodustavad segmendid; külmutuse ulatus, udusus, säritus, ruumiline detail ja ajaline muutus mõjutavad ainult seda, kuidas olemasolev 1–16 kaadri eelarve jaotatakse. Täielikult külmunud segmendi ülempiir on üks kaader, samas kui külmutamata segmendid konkureerivad ülejäänud eelarve pärast. Kui piire on rohkem kui kaadreid, säilitatakse ühtlane ajajoone katvus, nii et kiired varajased lõiked ei saa varjata pikka lõpusegmenti. Stseenipiirid, mis jäävad külmumispiiri 1-sekundilise analüüsieraldusvõime piiresse, liidetakse.

Puuduvad filtrid, vigane või tühi tõendusmaterjal, detektori viga või piiratud eelanalüüsi ajalõpp viivad avatud tagasilangemiseni täpse ühtlase keskpunkti poliitika juurde. Kutsuja katkestus või brokeri tähtaeg ei lange avatult tagasi: see lõpetab käimasoleva alamprotsessi, takistab hilisemat kaadrite eraldamist ning privaatne ajutine kataloogipuu eemaldatakse `finally`-plokis.

`scripts/perf/video-bridge-fu07-eval.ts` genereerib deterministlikud tegelikud FFmpeg-testandmestikud deduplikatsioonijärgse kirjelduskutsete kokkuhoiu, tiheda liikumise eelarvejaotuse, udususe/särituse/SI-TI tõendite, pika sabaga kiirete lõigete ning järkjärgulise hajumise valepositiivsete jaoks. See salvestab eelanalüüsi reaalaja ning kui `/usr/bin/time` on saadaval, ka alamprotsessi CPU aja ja tipp-RSS-i. Selle kvaliteedikontrollid on ainult struktuursed oraaklid. Tegeliku kirjeldusmudeli kvaliteet jääb olekusse `HOLD`, kuna sellel testiraamistikul pole volitatud lõpp-punkti ega fikseeritud hindajat. Rahaline kokkuhoid jääb samuti olekusse `HOLD`, kui `--caption-cost-per-call-usd` ei anna selgesõnalist positiivset hinnangut kõne kohta; skript ei fabritseeri kunagi kumbagi tulemust.

Iga kaader on piiratud 4 MiB-ga, kõik töötlemata kaadrid kokku 23 MiB-ga ja serialiseeritud vahendaja vastus 32 MiB-ga. Privaatne ajutine kataloog eemaldatakse `finally`-plokis. OmniRoute ei sisalda komplektis FFmpeg'i ega võta vastu kohandatud käivitusfaili teed. Enne kirjelduste loomist rakendab sild konservatiivse visuaalse deduplikatsiooni etapi: iga JPEG vähendatakse 16×16 halltoonipuhvriks ja seda võrreldakse ainult viimati säilitatud kaadriga. Kui soovitud kirjelduste eelarve on suurem kui üks kaader, annab ekstraheerimine piiratud kandidaatide kogumi, mis on kuni kaks korda suurem sellest eelarvest ega ületa kunagi 16 kaadrit. Soovitud ülempiir rakendatakse alles pärast deduplikatsiooni, kusjuures lõpliku harvendamise ajal säilitatakse esimene ja viimane valitud kandidaat, kui eelarve on vähemalt kaks. Versiooniga `grayscale-16x16-mean-cells-v2` poliitika kasutab suuremat kahest väärtusest: keskmise heleduse delta või nende pisipildirakkude osakaalu, mille normaliseeritud delta on vähemalt 0,05. Duplikaadi lävi on konstant 0,04, mis on valitud ennustatavuse nimel, mitte käitusaegse seadistusena. See sekundaarne kõrgkontrastiline signaal säilitab väikesed liikumised ja nähtava teksti muutused, mida pelgalt keskmisel põhinev võrdlus võib varjata. Võrdleja- või dekoodrivead jätavad tee avatuks (fail open) ja katvus säilib. Väljundi metaandmed eraldavad ekstraheeritud kandidaadid, edukalt kasutatud kaadrid ja välja jäetud visuaalsed duplikaadid.

Selgesõnaliselt märgistatud videoosa võib taotleda ajatempliga kontaktlehte. Sild koostab kuni 4-veerulise ja 16-kaadrilise JPEG-võrgustiku. Iga 512-piksline ruut põletab oma lähteajatempli kõrgkontrastilisse alumisse ribasse, samal ajal kui samad ajatemplid jäävad tekstimetaandmetesse allavoolu seostamiseks ja auditeerimiseks. Valmis JPEG jääb 32 MiB piiri alla. Kui `sharp` ei suuda võrgustikku dekodeerida ega koostada, naaseb sild üksikute JPEG-kaadrite juurde; kliendi katkestus levib siiski läbi leheoperatsiooni.

Edendamise tõendid on tahtlikult eraldatud sünteetilisest koostamise mikrobenchmarkist. `scripts/perf/video-bridge-contact-sheet-eval.ts` määratleb skeemiversiooniga A/B-testiraamistiku tegelike OpenAI-ühilduvate visioonimudelite jaoks. See mõõdab pakkuja teatatud tokeneid, otsast lõpuni mõõdetud seinakella latentsust (sealhulgas lehe koostamist), mudelikõnede arvu ja manifestis määratletud faktide säilimist. Mudelite töötlemata vastuseid aruandesse ei kirjutata; säilitatakse ainult SHA-256 räsid ja sobitatud faktide ID-d. Testiraamistik ei tee võrgu- ega tasulisi mudelikõnesid, kui pole antud `--execute-real` lippu ning seadistatud `--model`, `OMNIROUTE_BASE_URL` ja `OMNIROUTE_API_KEY`. Ilma selle selgesõnalise tegeliku käivituseta jääb selle masinloetavaks otsuseks `HOLD`; sünteetilised koormuse ja kõnedearvu mõõtmised üksi ei ole edendamise tõendid.

Kutsuja võib toetatud videoosale lisada valikulise `transcript.cues` massiivi, kui tal on juba olemas joondatud tekst. Iga vihje peab sisaldama välja `text`, lõplikku `start`/`end`-intervalli sonditud kestuse piires ning lubatud loendis olevat välja `source` (`client`, `embedded` või `audio-bridge`); `confidence` vaikeväärtus on `1` ja see peab jääma `0` ja `1` vahele. Täpsed duplikaatvihjed liidetakse kokku. OmniRoute ei käivita kunagi transkribeerimist nende metaandmete põhjal: valideeritud vihjed kopeeritakse kirjeldatud tulemusse koos allika, usaldusväärsuse ja intervalliga ning need renderdatakse ebausaldusväärsete vaatlustena koos kaadrite kirjeldustega. Kehtetu, vahemikust väljas olev või päritoluta tekst lükatakse tagasi, seda ei segata kirjeldusvoogu. Mõlemad päringukeha transkriptsioonikanalid normaliseerivad esitatud päritolu väärtusele `client`, sealhulgas isedeklareeritud `embedded`- või `audio-bridge`-siltide puhul. Neid usaldusväärseid silte saab määrata ainult serverile kuuluv adapter ainult koodis kasutatava `trustedSource`-argumendi kaudu; päringu JSON-väli ei jõua selle argumendini. Transkriptsioonitekst jääb olenemata oma päritolust ebausaldusväärseks meediast tuletatud sisuks ega tohi kunagi olla autoriseerimise aluseks.

Edasijõudnud kutsuja võib sama video jaoks esitada `audioTranscript`-raja; seda käsitletakse kliendi esitatud tekstina, mitte serveripoolse transkribeerimise tõendina. Fusiooniliides käitab visuaalseid ja helivaatlusi ühe tähtaja ja katkestussignaali all, järjestab need ühisel ajajoonel, liidab täpsed duplikaadid kokku ja teatab osalise tulemuse, kui õnnestub vaid üks pool. Kehtetu `audioTranscript` degradeerub samaks osaliseks tulemuseks — visuaalne kirjeldus säilib ja heliharu salvestab puhastatud tõrkekoodi — selle asemel et kogu video nurjata. Harudepõhine kättesaadavus, osalise tulemuse lipp ja puhastatud tõrkekoodid säilitatakse kirjeldatud tulemuses, turvapiirete metaandmetes (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), tulemusvahemälu metaandmetes ja silla fusiooniloendurites. Vaikimisi Video Bridge'i tee ei kasuta kõne tekstiks teisendamist ega lae alla teist meediakoopiat; ilma selle selgesõnalise rajata jääb see ainult videotöötluseks.

**Transkriptsioonide säilitamine (#12150 P1).** See rakendub automaatselt alati, kui
eraldi lubatav videosild renderdab transkriptsioonilõigu — eraldi
säilitamislippu pole. Kui päring renderdab mis tahes transkriptsioonilõigu (kutsuja määratud
`transcript` või ühendatud `audioTranscript`), märgib kaitsepiire selle
`videoBridgeObserved`-iks ja loob videokirjelduse redigeeritud varikoopia —
identse renderduse, milles iga lõigu vabatekstiline sisu asendatakse tekstiga
`[redacted-video-transcript]`. See luuakse struktureeritud lõiguvälja asendamisega
enne stringi koostamist (mitte kunagi lamendatud teksti sõeludes, mistõttu ei saa
säilida mingi lõigu sisu — ei pahatahtlik ega tavapärane, sealhulgas märki `]`
sisaldavad tekstid, nagu `[inaudible]`/`[music]`). Säilitatavas väljakutselogi
päringukehas asendatakse iga videost tuletatud tekstiosa selle redigeeritud
varikoopiaga, kasutades sisu võrdsuse alusel sobitamist; ankur `fullText` loetakse
uuesti lõpetatud väljakutseeelse kaitsepiirde lastist, mistõttu õnnestub sobitamine
ka pärast seda, kui kaitsepiirdeahela hilisemad kaitsepiirded (isikuandmete ja
mandaatide maskeerijad prioriteetidega 10/95) on kirjeldusteksti kohapeal ümber
kirjutanud ning süsteemiviiba, üleandmise või mälu lisamine on sõnumimassiivi
ümber kujundanud. Mudelile ülesvoolu saadetav keha jääb muutmata. Vaadeldud päring
ei lisa ka püsivasse Memorysse midagi (vahele jäetakse nii päringust kui ka
vastusest tuletatud eraldamine), mistõttu ei saa mudeli enda vastus
transkriptsiooniteksti Memorysse tagasi kajastada.

**Video toorväljad (#12430).** Kui sild on lubatud ja natiivse videotoe olemasolu
pole teada või see puudub, aktiveerivad määratletud väljad `transcript`/`audioTranscript`
samuti `videoBridgeObserved`, isegi pärast kirjelduse loomise nurjumist või
`maxVideos` piirangu rakendumist. `null` ja tühjad stringid lähevad arvesse;
puuduvad väljad ja videoga mitteseotud metaandmed mitte. Säilitatavates koopiates
need väljad redigeeritakse või jäetakse päring välja ning vahemäludest/Memoryst
minnakse mööda.

Neil varuteedel teisendatakse kutsuja kehtivad lõigud toetatud `text`/`input_text`
osadeks, mitte ebastandardseteks teenusepakkuja väljadeks. Mõlemad päringuga
kaasa antud rajad jäävad ebausaldusväärseteks `client`-vaatlusteks koos selgesõnalise
hoiatusega, et videole ei koostatud kirjeldust ja ajatempleid ei kontrollitud
meediumi suhtes. Olemasolevad 256 lõigu / 64 KiB kogupiirangud ja lõigupõhised
piirangud rakenduvad mõlemale rajale ühiselt; ajatemplid peavad mahtuma vahendaja
600-sekundilise ülempiiri ja mis tahes määratud fookusakna sisse. Vigased rajad
hüljatakse ning neid ei edastata suvalise tekstina; kehtivat paarisrada võib
endiselt kasutada, kui nende ühine piirang pole ületatud. Null- ja tühjad väljad
teksti ei lisa. See varumehhanism ei lisa meediumi hankimist ega transkribeerimist.
Transkriptsiooni laiendusväljad eemaldatakse varumehhanismi videokandjast ja selle
`video_url`/`source` objektidest. OpenAI edastusvormingu lubatud loend jääb
rangeks; videokandjad, mille natiivtugi pole teada, jäävad saadavale ning teadaolevad
ainult teksti toetavad sihtkohad säilitavad turvalised markerid. Struktureeritud
redigeerimisvarjud kaitsevad lisatud transkriptsiooniteksti, samas kui kutsujale
kuuluv algne päring jääb muutmata. Natiivse toega sihtkohad ja keelatud sillad
säilitavad oma senise möödaviigukäitumise.

Täiendavad säilitatavad koopiad kasutavad sama vaadeldud päringu signaali.
Kaitsepiirde-eelne kliendipäringu töötlemata hetktõmmis, mälus olev ootel päring
ja varakult tagasilükatud päringu logi asendavad videote osades olevad
transkriptsiooniväljad struktuurselt; konveieri etappide ja konteksti üleandmise
poolt sünteesitud stringiviibad redigeeritakse säilitatava päringukeha
talletuskohas. Säilitatud marker `video_content_removed` paneb
`previous_response_id` abil jätkamise turvaliselt nurjuma, selle asemel et
taastada tahtlikult kõrvaldatud tekst. Kui vaadeldud päring kaotab enne logimist
mõne osapõhise redigeerimisvarju või kui mitmest videovarjust kas või ühe
sobitamine pärast päringu hilisemaid muudatusi nurjub, jäetakse säilitatav
päringukeha tervenisti välja, selle asemel et säilitada osaliselt redigeeritud
transkriptsioon.

Vaadeldud päringu puhul võib mudeli vastus tsiteerida transkriptsiooni mis tahes
osa ilma struktureeritud lõigupiirita. Seetõttu asendatakse selle säilitatava
väljakutselogi `responseBody` väljajätmismarkeriga; üksikasjalikku
konveieriartefakti (mis võib sisaldada ülesvoolu- ja kliendikehi ning voogedastuse
tükke) ei säilitata. Semantiliste, idempotentsuse ja põhjenduskorduse vahemälude
lugemistest ja kirjutamistest minnakse selle päringu puhul mööda. Teenusepakkuja
päring ja kliendile nähtav vastus jäävad muutmata. Varased ühenduse elushoidmise
baidid eemaldatakse ajutisest puhvrist, kui üksikasjalik artefakt välja jäetakse.
Kiro vigase EventStreami hoiatus esitab ainult lasti baitide arvu, mitte kunagi
selle sisu ega JSON-i parseri töötlemata viga.
See ei väida, et auditeeritud on kõik mitteseotud teenusepakkuja või pistikprogrammi
diagnostikad; säilitatavate talletuskohtade laiem kontroll on jälgitav ülesandes
#11658.

Sisemise `/api/modality-bridge/video/drilldown` elutsükkel on eraldiseisev
tagasisideaadressi ja loaga autenditud vahemälu alamsüsteem. Iga toiming nõuab
ka kanoonilist läbipaistmatut turvasubjekti ID-d. Enne tootmiskutsuja lubamist
peab see tuletama ID autenditud rentnikust ega tohi kunagi edastada kliendi
valitud väärtust. Vahemäluvõtmed seovad selle turvasubjekti kanooniliste seansi-
ja videoviite ID-dega, talletavad ainult nende SHA-256 põhjal tuletatud võtmeid
ning piiravad nii lugemise kui ka kustutamise sama turvasubjektiga. Vahemälu
talletab iga kirje kohta kuni 16 tuletatud JPEG-kaadrit, aegub need kümne minuti
pärast ning toetab piiratud `start`/`end` lugemisi või seansi selgesõnalist
kustutamist.

Iga turvasubjekt on piiratud 16 kirje ja 64 MiB kanooniliste JPEG-andmetega. Need
piirangud on sõltumatud globaalsest 64 kirje / 256 MiB ülempiirist: turvasubjekti
kvoodisurve eemaldab enne globaalse LRU-väljatõstmise kaalumist ainult selle
turvasubjekti kõige kauem kasutamata kirjed. Aegunud kirjed eemaldatakse vahemälu
kasutamisel nii turvasubjekti kui ka globaalsest arvestusest, samas kui tühistamine
ja valideerimise nurjumine ei kinnita osalist asendust.

Vahemälu lükkab tagasi mittekanoonilise Base64, liigse täidise, mitte-JPEG meedia, vigased või
kärpitud JPEG-id ning JPEG-id, mis tekitavad hoiatuse piiratud täispildi `sharp`-dekodeerimise
käigus. See kodeerib iga aktsepteeritud pildi ümber kanooniliseks JPEG-iks, tuletab laiuse ja
kõrguse dekodeeritud baitidest, selle asemel et usaldada väljakutsuja välju, ning viskab ära
kõik lõpus olevad polüglot-baidid, selle asemel et neid säilitada. Mõlema kvoodi arvele
läheb ainult piiratud kanooniline tihendatud puhver. JSON-i ülekandelimiit arvestab
32 MiB dekodeeritud sisendi ülempiiri puhul ka Base64 üldkulusid. Iga
salvestatud tuletis registreerib oma valideeritud JPEG-vormingu/-eraldusvõime, valimipoliitika,
tuletise versiooni, loomisaja, serveris arvutatud sisuräsi ja räsitud vanemviite koos
usaldusväärse väljakutsuja vanem-sisu räsiga. Tühistamist kontrollitakse
asünkroonsete dekodeerimis-/räsimisfaaside vahel enne aatomilist vahemällu kinnitamist.

See osa ei ühenda veel tootmisprodutsenti marsruudiga ega paku mitme eraldusvõimega
variantide valikut. Läbipaistva Video Bridge'i päringuteed ei koorma seetõttu lisatöö,
samas kui rentnikuga seotud põhisubjekti tuletamine ja kogu FU-08 mitme eraldusvõimega
elutsükkel jäävad selgesõnaliseks järeltegevuseks, mitte valmiskäitumisena
dokumenteerituks.

Kaadrid kirjeldatakse järjestikku konfigureeritud Video-mudeliga. Tühi
Video-alistus pärib Visioni seade; kui mõlemad on tühjad, valib Visioni
automaatruter efektiivse nägemisvõimelise mudeli. Edukad kirjeldused
asendavad algse osa stabiilse `[Video description:` eesliitega, mis samal ajal
märgib teksti ebausaldusväärse meediast tuletatud vaatlusena ja käsib allavoolu
mudelitel mitte järgida meediast leitud juhiseid. Kaadrikirjelduse vahemälu võtmed
sisaldavad JPEG-baitide, viiba, ajatemplit ja efektiivset mudelit; vahemällu salvestatakse
ainult edukaid kirjeldusi. Vahemälu kirjed säilitavad tegeliku eduka produtsendi mudeli,
sealhulgas varumudeli; sild teatab `mixed`, kui erinevad kaadrid on toodetud erinevate
mudelitega. Vahemälu tabamus taaskasutab seda produtsendi identiteeti, selle asemel et
seda ümber märgistada soovitud marsruutimiskavaks. Kogu video tulemusvahemälu võtmeks
on iga sisend, mis muudab väljundit — viip, efektiivne mudel, valimipoliitika,
kaadrite arv, semantilise analüüsi režiim, normaliseeritud fookusvihje SHA-256
sõrmejälg, fookusaken, `transcript`, `audioTranscript` ja kontaktlehe lipp — nii et
nende dimensioonide muutmine on vahemälu möödalask, mitte kunagi aegunud taaskasutus.
Visuaalse deduplikatsiooni poliitika versioon, lävi ja piiratud kandidaatkaadrite arv
on samuti selgesõnaliselt tulemusvahemälu võtmes ja metaandmetes; poliitika muudatus
ei saa seetõttu taaskasutada aegunud kogu video kirjeldust. Tulemusvahemälu v4
metaandmed säilitavad režiimi ja sõrmejälje, mitte kunagi toorest kasutajaülesannet.
Kaitsepiirde metaandmed teatavad nii soovitud kui ka efektiivse analüüsirežiimi;
soovitud `focused`-režiim ilma kasutatava kasutajatekstita teatatakse tegelikult
kui `full`.

Kaitsepiire eraldab iga toetatud videoosa, kuid ei kirjelda rohkem kui
`modalityBridgeVideoMaxVideos`. Sihtmärgi puhul, mille kohta on tõestatud
`supportsVideo === false`, muutuvad ebaõnnestunud ja limiiti ületanud videod
selgesõnalisteks ohututeks tekstimärkideks, nii et ükski toores video ei jää alles.
Kui võimekus on teadmata, säilitavad need osad oma videokandja; iga varutranskriptsioon
järgib ülaltoodud piiratud tekstiteisendust. Sihtmärgid, mille puhul
`supportsVideo === true`, mööduvad sillast. Kliendi päringu katkestussignaal levib läbi
allalaadimise, maaklerjärjekorra, alamprotsesside ja kirjelduskutsete; katkestused
peatuvad videote vahel ega lase kunagi tõrke korral toormeediat läbi.

Käitusaegsed seaded on andmebaasipõhised ja Zod-valideeritud:

| Võti                                | Vaikimisi   | Vahemik / käitumine                                                                                                |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Valikuline käitusaegne, opt-in põhimõttel                                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` säilitab üldised kirjeldused; `focused` kasutab piiratud, ebausaldusväärset viimase kasutaja konteksti      |
| `modalityBridgeVideoModel`          | `""`        | Pärib Vision Bridge'i mudeli                                                                                       |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                               |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` või proportsionaalne `segment_aware`; detektori tõrke korral lülitub tagasi `uniform`-ile |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                     |

Pärandis säilinud Video ajalõpu väärtused üle 120 sekundi piiratakse
maakleri tähtajani; uued seadete kirjutamised üle selle piiri lükatakse tagasi.
`GET /api/modality-bridge/video/runtime` nõuab enne autentimist või käituseaja
sondeerimist usaldusväärset tempeldatud loopback-päritolu, seejärel nõuab haldusautentimist.
See tagastab ainult `available`, puhastatud FFmpeg/ffprobe versioonid ja fikseeritud
põhjuse, kui käitusaeg pole saadaval. Sisemine ekstraktsiooni lõpp-punkt ei ole
avalik üleslaadimise API: järjekorra küllastumine tagastab `503` koos `Retry-After`-iga,
väljakutsuja ühenduse katkemine tagastab `499` ja fikseeritud maakleri tähtaeg tagastab `504`.
Teisendatud vastused lisavad kesksele `x-omniroute-modality-bridge` päisele
`video->text;model=<visionModel>;parts=<videos>` ilma Vision- või Audio-segmente eemaldamata.

### PII Masker (`piiMasker.ts`)

Töötab **mõlemas** etapis.

- **`preCall`** kloonib kasuliku koormuse, käib läbi väljad `system`, `messages`, `input` ja `prompt` (kaasa arvatud lihtsad stringi-elemendid) ning rakendab string-tüüpi `content`/`text` väljadele funktsiooni `processPII()` (moodulist `@/shared/utils/inputSanitizer`). Kui `PII_REDACTION_ENABLED=true`, varjatakse tuvastatud PII väljuvas kasulikus koormuses. See ei sõltu muutujast `INPUT_SANITIZER_MODE` (mis juhib ainult prompt-injektsiooni poliitikat). Kui varjamine on välja lülitatud, salvestab väljakutse tuvastuste arvud ilma sisu ümber kirjutamata.
- **`postCall`** sügavkloonib vastuse, käivitab `sanitizePIIResponse()` ning Responses-API-kuju maskerija (`maskResponsesOutput` — katab `output_text` ja `output[].content[].text`). Kui midagi varjatakse, asendab muudetud vastus originaali.

Kaitseraud ei blokeeri kunagi; see ainult annoteerib (`meta.detections`, `meta.redacted`) või kirjutab ümber.

#### Tüübipõhine valik, kohandatud mustrid ja tuvastuste loendurid

**Armatuurlaud → Seaded → Turvalisus → PII maskeerimine** valib, _mida_ maskeeritakse. See ei lülita maskeerimist sisse: selleks on endiselt `PII_REDACTION_ENABLED` (päring) ja `PII_RESPONSE_SANITIZATION` (vastus + SSE), mis mõlemad on vaikimisi välja lülitatud.

- **Tüübipõhine valik** — sisseehitatud id-d on loetletud failis `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Määramata jätmine tähendab kõiki tüüpe (käitumine enne selle seade lisandumist). Päringumootori muster `ssn_us` vastendatakse tüübile `ssn`. Mallid (Minimaalne, Standardne, Finants, Brasiilia, USA, Täielik) täidavad kasutajaliideses ainult märkeruudud.
- **Kohandatud mustrid** — kuni 20 regulaaravaldise või metamärgimustri (`*` = kuni 64 mittetühikumärki, `?` = üks). Vasted asendatakse väärtusega `[CUSTOM_REDACTED]`. Iga muster läbib `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): kuni 500 tähemärki, lipud on piiratud väärtustega `g i m s u`, muster peab kompileeruma, läbima `safe-regex` kontrolli (katastroofiline tagasiminek) ning ei tohi anda vastet tühjale sõnele ega varjamise kohatäitele. Muster, mis kontrolli ei läbi, lükatakse tagasi salvestamisel ja testimisel ning talletatud rida, mis ei läbi, jäetakse käitusajal kompileerimise asemel vahele. Kohandatud mustreid käivitatakse ainult siis, kui maskeerimine on sisse lülitatud.
- **Tuvastuste loendurid** — tüübipõhised arvud (mitte kunagi vastetud väärtused), mida hoitakse mälus ja mis lähtestatakse taaskäivitusel (`src/lib/pii/piiDetectionStats.ts`). Need suurenevad ainult siis, kui maskeerimine on sisse lülitatud.

Seaded asuvad tabelis `key_value` (nimeruum `pii_settings`, `src/lib/db/piiSettings.ts`) ja neid loetakse läbi 1 s vahemälu. API:

| Meetod | Tee                      | Otstarve                                                              |
| ------ | ------------------------ | --------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Lippude olek, `enabledTypes`, `customPatterns`, tuvastuste loendurid  |
| `PUT`  | `/api/settings/pii`      | Asendab `enabledTypes` (`null` = kõik) ja/või `customPatterns`        |
| `POST` | `/api/settings/pii/test` | Proovib ühte mustrit kuni 8 KB suurusel valimil; midagi ei salvestata |

Kõik kolm nõuavad haldusautentimist ja valideerivad päringu keha Zodiga (`src/shared/validation/schemas/piiSettings.ts`).

### Prompt-injektsioon (`promptInjection.ts`)

Tuvastab kasutaja sisendis vaenulikke struktuure ja jõustab konfigureeritud poliitika. Käitumist juhivad keskkonnamuutujad ja konstruktori valikud:

| Seade             | Keskkonnamuutuja                                                                                     | Vaikimisi | Mõju                                                                                                                                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lubatud           | `INPUT_SANITIZER_ENABLED`                                                                            | `true`    | Väärtusel `false` lühistub kaitseraud (kontroll jäetakse vahele).                                                                                                                                              |
| Režiim            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`    | Injektsiooni poliitika: `block`, `warn` või `log`. (`redact` aktsepteeritakse tagasiühilduvuse tõttu, kuid see **ei** eemalda injektsiooniteksti; päringu PII ümberkirjutamist juhib `PII_REDACTION_ENABLED`.) |
| Blokeerimise lävi | `blockThreshold` valik / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`    | Blokeerimiseks vajalik minimaalne tõsidusaste. Vaikeseadel on keskmine tõsidusaste ainult jälgitav.                                                                                                            |

**Režiimi prioriteet** (`getMode`): väljakutsuja `options.mode` → `INJECTION_GUARD_MODE` **andmebaasi feature-flag'i ülekirjutus** (Armatuurlaud → Seaded → Feature Flags) → `INJECTION_GUARD_MODE` keskkonnamuutuja → `INPUT_SANITIZER_MODE` keskkonnamuutuja → `warn`. Armatuurlaua ülekirjutus võidab seega keskkonnamuutujaid, nii et Feature Flags'i kasutajaliides juhib töötavat kaitserauda reaalajas (ilma taaskäivituseta). Andmebaasi lugemine on tõrkekindel: kui see ebaõnnestub, naaseb kaitseraud keskkonnapõhise käitumise juurde, ja kui ülekirjutust pole määratud, on käitumine identne ainult keskkonnamuutujatepõhise lahendusega.

Tuvastusallikad:

1. `sanitizeRequest()` moodulist `@/shared/utils/inputSanitizer` (ühine detektorite kogum, mida kasutatakse ka mujal torustikus).
2. Sisseehitatud `DEFAULT_GUARD_PATTERNS` (praegu `system_override_inline` ja `markdown_system_block`, mõlemad tõsidusastmega `high`).
3. Valikulised `customPatterns`, mis antakse konstruktori valikute kaudu (stringid, regulaaravaldised või `{ name, pattern, severity }` kirjed).

Kui `mode === "block"` **ja** vähemalt üks tuvastus ületab tõsidusastme läve, tagastab `preCall` väärtuse `{ block: true, message: "Request rejected: suspicious content detected" }`. Režiimides `warn`/`log` kaitsemehhanism logib, kuid lubab kõne. Jagatud abifunktsioon `evaluatePromptInjection()` on samuti eksporditud neile, kes soovivad prompte hinnata ilma registriga tegelemata.

**Skannimispiir (v3.8.20):** detektor kontrollib ühendatud prompt-teksti ainult **esimesi 16 KB** — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 baiti) failis `src/shared/utils/inputSanitizer.ts`. Nii `detectInjection()` kui ka `evaluatePromptInjection()` teevad `slice(0, MAX_INJECTION_SCAN_BYTES)` enne mustritsükli käivitamist. Injektsioonidirektiivid asuvad sisendi alguses, seega piirab see regulaaravaldise CPU/GC koormuse mitmesaja-KB-suuruste andmekoormate puhul ilma tuvastust nõrgendamata (vrdl. #3932, #4041).

### Mandaatide maskeerija (`credentialMasker.ts`)

Töötab **mõlemal** etapil, vaikimisi ahelas viimasena (prioriteet `95`). Maskeerib tuntud API-võtme / salajase tokeni mustreid väljuvast andmekoormast (sõnumi sisu, tööriistakutse argumendid, tööriista tulemused) **ja** pakkuja vastusest, nii et prompti kleebitud (või tööriista tulemuse kaudu tagasi kajastatud) mandaat ei leki ülavoo pakkujale ega tagasi kliendile.

- **Ainult sisselülitatav**, sama konventsioon nagu PII maskeerimisel (Hard Rule #20-le külgnev): keelatud, välja arvatud juhul, kui `settings.credentialRedactionEnabled === true` **või** `CREDENTIAL_REDACTION_ENABLED=true`. Väljalülitatuna on kaitsemehhanism tegevuseta (no-op) — see ei blokeeri ega kirjuta kunagi ümber.
- `redactCredentials()` läbib kogu andmekoorma/vastuse puu (`walkValue()`, prototüübisaastmise-kindel, `WeakSet`i kaudu tsüklikindel) ja asendab vasted kohatäitega `[REDACTED:<type>]`, kloonides ainult need harud, mis tegelikult muutusid.
- `CREDENTIAL_PATTERNS` hõlmab LLM-i pakkujate võtmeid (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS-i tokeneid (GitHub, Slack, Linear, Notion, npm, Postman, Discord), maksevõtmeid (Stripe, Square), pilvevõtmeid (AWS access key, Twilio, SendGrid, Mailgun), privaatvõtmeid / JWT-sid, mandaate sisaldavaid ühendusstringe (`mongodb://user:pass@...` jne) ning üldist `Authorization`/`x-api-key`/`api-key`/`apikey` päise väärtuse mustrit. Päisekujulised võtmed (`authorization`, `x-api-key`, `api-key`, `apikey`) maskeeritakse struktuurselt (ainult väärtus, skeemi eesliide nagu `Bearer `/`Basic ` säilitatakse), mitte üldise teksti-regulaaravaldise kaudu.
- Kaitsemehhanism ei blokeeri kunagi; see ainult kirjutab ümber (`modifiedPayload` / `modifiedResponse`) ja annoteerib (`meta.credentialsRedacted`, `meta.count`).

Regressioonikaitse: `tests/unit/credential-masker-guardrail.test.ts`.

## Põhileping (`base.ts`)

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
  block?: boolean; // true katkestab ahela
  message?: string; // kuvatakse blokeerimisel
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // preCall tagastab selle päringu ümberkirjutamiseks
  modifiedResponse?: TValue; // postCall tagastab selle vastuse ümberkirjutamiseks
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

Kaitseraud annab märku „muutusi pole“, tagastades kas `void`, `{}` või
`{ block: false }`. `modifiedPayload`/`modifiedResponse` tagastamine asendab
ahelas liikuva väärtuse allavoolu asuvatele kaitseraudadele.
`signal?: AbortSignal` toob väljakutsuja elutsükli kaitseraudadesse. Päringu
katkestus on teadlik fail-open-erand: meediumisillad peatavad töö ja teevad
puhastuse, taastamata toormeediumit sihtkohas, mille kohta on teada, et see
seda ei toeta.

## Register (`registry.ts`)

Singleton `guardrailRegistry` pakub:

- `register(guardrail)` — lisab kaitseraua (või asendab selle normaliseeritud
  nime järgi) ja sordib nimekirja uuesti tõusva `priority` järgi.
- `clear()` / `list()` — haldusabilised.
- `runPreCallHooks(payload, context)` — käib läbi aktiivsed kaitserauad, juhib
  payloadi läbi `modifiedPayload` ja peatub esimese `block: true` korral.
- `runPostCallHooks(response, context)` — sama voog vastuse poolel.
- `resetGuardrailsForTests({ registerDefaults })` — tühjendab oleku ja
  registreerib soovi korral vaikeseaded uuesti, et tagada puhas testide
  isoleeritus.

Mõlemad käivitajad tagastavad `{ blocked, payload|response, results, guardrail?, message? }`,
kus `results` on `GuardrailExecutionResult`-kirjete massiiv, mis sisaldab iga
kaitseraua kohta välju `blocked`, `skipped`, `modified`, `error` ja `meta`,
mis on kasulikud jälitamisel.

### Kaitseraudade keelamine päringupõhiselt

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` kogub kokku
dedupleeritud nimekirja kaitseraudade nimedest, mis tuleb käesoleva päringu
puhul vahele jätta. Kokku on viis kanalit, mida loetakse järgmises järjekorras
ja liidetakse üheks nimekirjaks (dedupleerimisel võidab esimene esinemine):

1. `apiKeyInfo.disabledGuardrails`
2. Päringukeha `disabledGuardrails` (ülemisel tasemel)
3. Päringukeha `metadata.disabledGuardrails` (ainult siis, kui `metadata` on objekt)
4. Päis `x-omniroute-disabled-guardrails`
5. Pärandpäis `x-disabled-guardrails`

Kõik viis kanalit liidetakse, sealhulgas mõlemad päised: saates nii
`x-omniroute-disabled-guardrails` kui ka `x-disabled-guardrails`, jäetakse
vahele nende nimekirjade ühend, ning tühi kaasaegne päis ei vari enam
pärandpäist
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), parandatud
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Väärtused võivad olla sõnede massiivid või komadega eraldatud sõne; nimed
trimmitakse ja normaliseeritakse väiketähtedega kebab-case'ile
(`pii_masker` → `pii-masker`) ning tühjad kirjed jäetakse välja. Tulemus
edastatakse `context.disabledGuardrails` kaudu registrile, mis jätab sobivad
kaitserauad vahele (`skipped: true` väljal `results`).

Keelunimekiri mõjutab ainult **registrit**. Prompt-süstimise `block`-režiim on
kohustuslik turvapiir: süstimiskaitse vahevara
(`src/middleware/promptInjectionGuard.ts`) kutsub välja
`evaluatePromptInjection()` ilma igasuguse väljakutsuja kontrollitava
keelunimekirjata (surnud väljakutse `resolveDisabledGuardrails({ body })`,
mida see varem tegi, eemaldati
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), seega
lükatakse päring, mis keelab `prompt-injection`, `block`-režiimis ikkagi
tagasi. See on taotluslik. Keelukanaleid kontrollib väljakutsuja (päringukeha,
metaandmed, päised) ja väljakutsuja ei tohi saada välja lülitada
turvakontrolli, mille operaator on seadnud
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Päiste
ühend [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)-st
muudab ainult seda, millised registri kaitserauad vahele jäetakse; see ei
võimalda kliendil vahevarast mööda hiilida. Kohustuslikke võtme- ja
rühmakohtaseid kaitseraudade poliitikaid jälgitakse v4 RFC
[#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417) raames.
Vt [Katvus ja piirangud](#coverage-and-limits).

## Täitmise järjekord

Iga päringu puhul, mis voolab läbi `src/sse/handlers/chat.ts` ja
`open-sse/handlers/chatCore.ts` (vestluspere marsruudid, mis on loetletud jaotises
[Katvus ja piirangud](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` koostab vahelejäetavate nimekirja API-võtme,
   päringu keha ja päiste põhjal.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` käivitab kaitsepiirded
   prioriteedi tõusvas järjekorras:
   - Keelatud kaitsepiirded salvestatakse väärtusega `skipped`.
   - Iga kaitsepiirde `preCall` võib kasuliku koormuse ümber kirjutada
     `modifiedPayload` kaudu.
   - Esimene `block: true` lühistab ahela ja töötleja tagastab kaitsepiirde
     tagasilükkamisvastuse.
3. (Võimalik, et ümber kirjutatud) kasulik koormus voolab edasi
   kombomarsruutimisse ja ülesvoolu edastamisse.
4. **Ainult voogesituseta:** pärast vastuse kokkupanekut käivitab
   `guardrailRegistry.runPostCallHooks(...)` sama ahela vastuse peal. Siinne
   `block: true` viskab ülesvoolu vastuse ära ja tagastab HTTP 400. Voogesitatud
   vastused jätavad selle sammu täielikult vahele.

Erindi viskavad kaitsepiirded salvestatakse koos `error: <message>` ja logitakse
`logger.warn` kaudu, kuid ahel jätkub — rikke korral taotluslikult avatud
(fail-open).

## Katvus ja piirangud

Kaitsepiirete register on ühendatud ainult vestluse torustikku. Neid piiranguid
kinnitavad `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` ja
`tests/unit/guardrail-pipeline-characterization.test.ts`; kui käitumine muutub,
uuendage neid teste teadlikult.

### Kus konksud käivitatakse

| Konks / juhtelement              | Käivitub                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                | Päringud, mida töötleb `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (ja `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` ja Telegrami vestluse puhverserver. Samuti töölaua testotspunkt `/api/guardrails/test`. Kõneeelne blokeering tagastab HTTP 400. |
| `runPostCallHooks`               | **Ainult voogesituseta** vestlusvastused (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Voogesitatud vastused ei jõua sinna kunagi.                                                                                                                                                                                                                                                                                          |
| Voogesituse PII                  | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), suunatud torusse failis `streamingPipeline.ts`, kui `PII_RESPONSE_SANITIZATION` on sisse lülitatud. See ei ole kaitsepiire, seega keelamiskanalid seda ei mõjuta.                                                                                                                                                                                                       |
| Süstimiskaitse vahevara (pärand) | Iga viiba kandev `/v1` marsruut, sealhulgas vestluspere (vt [marsruutide katvus](#injection-guard-route-coverage--red-team-phase-8--block-d)). Ainult viiba süstimine.                                                                                                                                                                                                                                                                |

### Mida ei kaeta

- **Meedia-, embeddings- ja andmemarsruudid** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) ei jõua kunagi registrini. Seal
  ei käivitu PII maskeerimine, mandaadi maskeerimine ega modaliteedi sild. Nende
  ainus kontroll on pärandina säilinud süstimiskaitse vahevara.
- **Voogesitatud vastused** ei saa kõnejärgseid kaitsepiiresid: pole `pii-masker`-i
  ega `credential-masker`-i kõnejärgset töötlust ega kõnejärgset blokeeringut.
  Rakendub ainult voogesituse PII teisendus (kui `PII_RESPONSE_SANITIZATION` on
  sees). Voogesitatud vastuses tagasi kajastatud mandaati ei redaktseerita.
- **Keelamiskanalid vs vahevara (taotluslikult):** vahevara hindab viiba
  süstimist omaenda kõnega `evaluatePromptInjection()`, ilma et edastataks ühtki
  helistaja kontrollitavat keelamiste nimekirja. `block`-režiim on kohustuslik
  piir, mida helistaja kontrollitavad keelamised ei saa mööda hiilida, kaasa
  arvatud vestluspere marsruutidel
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
  `prompt-injection`-i keelamine jätab vahele ainult registri kaitsepiirde.

### Mis näeb vastust enne kõnejärgset töötlust

Voogesituseta teel on järjekord: mälu väljavõte → sisseehitatud tööriistade
käivitamine → kõnejärgsed kaitsepiirded → kõnejärgse blokeeringu väljumine →
semantilisse vahemällu salvestamine.

- **Mäluekstraheerimine** ja **tööriistade käivitamine** näevad vastust enne,
  kui kõnejärgsed kaitsekontrollid saavad seda ümber kirjutada või blokeerida.
  Alates [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) viib
  mäluekstraheerimine ekstraheeritud teksti läbi `sanitizePII`, kui
  `PII_RESPONSE_SANITIZATION` on sisse lülitatud (nii voogedastuse kui ka
  mitte-voogedastuse puhul), kuid vastus, mille kõnejärgne kontroll hiljem
  blokeerib, on siiski juba mälule ja tööriistadele pakutud.
- **Semantiline vahemälu** salvestab vastuse pärast kõnejärgset kontrolli,
  seega salvestab see ümber kirjutatud vastuse ja blokeeritud vastust ei
  salvestata kunagi vahemällu. Vahemälukirjed on indekseeritud API-võtme kaupa.

## Konfiguratsioon

Keskkonnamuutujad, mida sisseehitatud kaitsemehhanismid loevad:

| Muutuja                               | Kasutaja                  | Mõju                                                                                                     |
| ------------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Väärtus `false` keelab tuvastamise täielikult.                                                           |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Süstimispoliitika: `warn`, `block` või `log`. Pärandväärtus `redact` ei kirjuta süstimisteksti ümber.    |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Süstimiskaitse režiim; samuti DB-s hoitav funktsioonilipp, mis **alistab** keskkonnamuutujad (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Minimaalne tõsidusaste, mille `MODE=block` tagasi lükkab: `high` (vaikimisi), `medium` või `low`.        |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Muutuja `INPUT_SANITIZER_BLOCK_THRESHOLD` pärandalias.                                                   |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Kui `true`, maskeeritakse päringu isikuandmed (sõltumata süstimisrežiimist).                             |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Juhib vastusepoolse maskeerija käitumist.                                                                |

Modality Bridge'i kaitsemehhanismid loevad käitusaegse konfiguratsiooni
DB-põhisest seadete hoidlast (`getSettings()`), mitte keskkonnamuutujatest.
Visioni põhivõtmed on `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ja
`modalityBridgeCacheMaxEntries`. Pärandvõtmeid `visionBridge*` aktsepteeritakse
üksnes dokumenteeritud ühe tsükli lugemistagavarana; armatuurlaua kirjutamised
kasutavad põhivõtmeid. Vaikeväärtused ja tagavaralahendaja asuvad failis
`src/shared/constants/modalityBridgeDefaults.ts`, pärandkonstandid on säilitatud
failis `src/shared/constants/visionBridgeDefaults.ts`.

Audio kasutab võtmeid `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` ja `modalityBridgeAudioMaxClips` ning jagatud
`modalityBridgeCache*` seadeid. Audiol pole pärandvõtmete tagavara, sest need
võtmed võeti kasutusele koos Modality Bridge'i skeemiga.

Video kasutab võtmeid `modalityBridgeVideoEnabled`,
`modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` ja `modalityBridgeVideoTimeout` ning jagatud
`modalityBridgeCache*` seadeid. See on vaikimisi keelatud, sest FFmpeg/ffprobe
on valikulised käitusaegsed sõltuvused ning kaadrite kirjeldamine lisab
latentsust ja mudelikulu.

## Kohandatud kaitsekontrollid

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

Sammud:

1. Loo fail `src/lib/guardrails/myGuardrail.ts`, mis laiendab klassi `BaseGuardrail`.
2. Implementeeri `preCall` ja/või `postCall`.
3. Registreeri kas importimise ajal (lisa `registerDefaultGuardrails`-i kaudu) või
   kutsu käitusajal `guardrailRegistry.register(...)` — register asendab
   kõik varasemad sama normaliseeritud nimega kaitsekontrollid.
4. Lisa testid kataloogi `tests/unit/` (olemasolevad näited:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testimine

Kasuta testide vahel `resetGuardrailsForTests()`, et alustada teadaolevast olekust.
Anna `{ registerDefaults: false }`, et alustada tühja registriga ja
registreerida ainult testitavad kaitsekontrollid. Vision Bridge toetab sõltuvuste
süstimist (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge pakub
samaväärseid laienduspunkte seadete, võimekuste, STT-mudeli valiku,
mandaatikontrollide ja transkriptsiooni jaoks. Testid saavad seega kasutada
mõlemat voogu ilma andmebaasi- või võrguühenduseta.

## Vaata ka

- `src/lib/guardrails/` — implementatsioon
- `src/shared/utils/inputSanitizer.ts` — jagatud detektor, mis toetab
  prompt-injektsiooni ja PII maskeerimist
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge'i vaikeväärtused ja
  sunnitava silla mudelite loend
- `src/shared/constants/modalityBridgeDefaults.ts` — jagatud Vision/Audio käitusaja vaikeväärtused
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonaalne kiht (kaitselüliti, cooldown-perioodid)
- `docs/reference/ENVIRONMENT.md` — täielik keskkonnamuutujate viide

## Injektsioonikaitse marsruutide hõlmatus ja red-team (faas 8 · plokk D)

Injektsioonikaitse (`createInjectionGuard` / `withInjectionGuard`) hõlmab kõiki marsruute,
mis võtavad vastu kasutaja prompt'e. See arvestab `INJECTION_GUARD_MODE` väärtust
(vaikimisi `warn` = ainult logib; `block` = tagastab HTTP 400 `SECURITY_001`).

| Tüüp               | Marsruudid                                                                                                                                           | Vaikerežiim |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Tekst (olemasolev) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn        |
| Generatiivne       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn        |
| Andmed             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn        |

Teksti eraldamine (`extractMessageContents`) hõlmab välju `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (igaöiselt, `nightly-llm-security.yml`):** promptfoo kontrollib, et iga marsruut
blokeerib OWASP-LLM-i korpuse režiimis `INJECTION_GUARD_MODE=block`; garak käivitab sondid
(jätab vahele ilma salajase võtmeta). `moderations` on kaasatud järjepidevuse huvides.
Blokeerimisrežiim on kohustuslik piir: `evaluatePromptInjection()` ignoreerib
päringupõhist keelunimekirja, mille vahevara sellele edastab, seega `disabledGuardrails`
**ei** vabasta ühtegi marsruuti sellest
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Igaöisel töövoogul (`.github/workflows/nightly-llm-security.yml`, cron + manuaalne
käivitus) on kaks tööd:

- **`promptfoo-guard` (blokeeriv)** — käivitab `promptfoo eval -c promptfooconfig.yaml`
  väärtusega `INJECTION_GUARD_MODE=block`. Iga vaenulik juhtum (nt "ignore all
  previous instructions…", DAN-stiilis jailbreak'id) kinnitab, et vastus sisaldab
  `error.code === "SECURITY_001"`, st et kaitse tõepoolest lükkas päringu tagasi.
- **`garak` (soovituslik)** — käivitab garak `--probes promptinject,dan,leakreplay`
  kohaliku OmniRoute'i instantsi vastu (`http://localhost:20128/v1`). Käivitub ainult
  pakkuja salajase võtme (`PROMPTFOO_PROVIDER_KEY`) olemasolul; jätab sujuvalt vahele
  ja lõpeb sufiksiga `|| true`, seega raporteerib tulemused ilma CI-d nurjamata.

Kaitseabilise (`createInjectionGuard` / `withInjectionGuard`) hõlmatus
ulatub üle kõigi prompt'i sisaldavate `/v1` marsruutide; prompt'i tekst tõmmatakse
väljadest `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`
funktsiooni `extractMessageContents()` abil failis `src/shared/utils/inputSanitizer.ts`.
