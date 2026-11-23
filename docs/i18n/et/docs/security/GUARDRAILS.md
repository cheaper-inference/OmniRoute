# Guardrails (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Tõeallikas:** `src/lib/guardrails/`
> **Viimati uuendatud:** 2026-08-29 — v3.8.51 (Video Bridge'i transkriptsiooni päritolu deklareerib kutsuja,
> server ei ole seda veel kontrollinud — täpsustatud vastavalt #11661-le)

Kaitsepiirded rakendavad ohutust, poliitikaid ja sisuteisendusi OmniRoute'i ning
ülesvoolu teenusepakkujate vahelisel piiril. Iga kaitsepiire saab kontrollida (ja
valikuliselt tagasi lükata, teisendada või annoteerida) päringu andmekogumeid (`preCall`) ja
ülesvoolu vastuseid (`postCall`).

Süsteem on **tõrke korral läbilaskev**: kui kaitsepiire tekitab käitamisel erindi, salvestab register
vea ja jätkab järgmise kaitsepiirdega, selle asemel et päring nurjata.
Blokeerimine on teadlik otsus (`block: true`), mitte kunagi juhus.

## Sisseehitatud kaitsemeetmed

Register laadib importimisel prioriteetsuse järjekorras automaatselt kuus kaitsemeedet
(vt `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteet | Nimi                | Etapp/etapid   | Fail                  |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Väiksema prioriteedinumbriga kaitsemeetmed käivitatakse **esimesena**.

### Nägemissild (`visionBridge.ts`) — modaalsussild PR-1

Püüab kinni **nägemisvõimeta mudelitele** suunatud pilte sisaldavad päringud ja
suunab kogu päringu ümber nägemisvõimelisele mudelile või asendab pildiosad
enne ülesvoolu kutset tekstikirjeldustega, mille loob konfigureeritav
nägemismudel. See võimaldab ainult teksti toetavatel teenusepakkujatel
multimodaalseid kasulikke koormusi läbipaistvalt töödelda.

Töövoog:

1. Jäta vahele, kui sihtmudel juba toetab nägemist (välja arvatud juhul, kui see
   esineb sunnitud silla loendis `isVisionBridgeForcedModel`).
2. Eralda pildiosad funktsiooniga `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), mis delegeerib **ühtsele meediatuvastajale**
   `detectMediaParts()` failis `open-sse/utils/mediaParts.ts` — see on ainus
   tõeallikas, mida jagatakse kombinatsiooni ühilduvusfiltriga.
   Eraldamine on lubatud ainult selliste ülataseme osakujude puhul, mida
   `replaceImageParts` saab tagasi lisada (eraldamise↔asendamise leping): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` ja Responses API `input_image`. Pesastatud vasted ja
   ainult indikaatorit sisaldavad kujud kuuluvad kombinatsioonifiltrile ning
   neid ei eraldata kunagi. Jäta vahele, kui midagi ei leitud.
3. Lahenda käitusaegne konfiguratsioon funktsiooniga
   `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): uued `modalityBridge*`
   seadistusvõtmed on ülimuslikud; pärandvõtmed `visionBridge*` jäävad alles
   **ühe tsükli varuvariandina** (tagasipööramise aken). Kui sild on keelatud,
   jäta päring vahele enne meedia läbimist.
4. Režiimivalija (`modalityBridgeVisionMode`, vt allolevat tabelit) otsustab
   ümbersuunamise või kirjeldamise vahel. Ümbersuunamine tagastab
   `modifiedPayload`, milles on vahetatud ainult `model`, koos metaandmetega
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Kirjeldamise tee: piira piltide arv väärtusega `maxImages`, koosta ülesannet
   arvestav viip, kontrolli kirjelduste vahemälu, kutsu nägemismudelit
   **paralleelselt** (`Promise.allSettled`) ja sisesta piltide asemele tekstiosad
   `[Image N]: <description>`. Nurjunud kirjeldus annab tulemuseks `null` ja
   algne pildiosa **säilitatakse** (#4012) — välja arvatud kombinatsiooni
   kirjeldustee korral, kui kõik kirjeldamised nurjusid; sel juhul saab
   kinnitatult nägemisvõimeta ülesvoolu teenus selle asemel kohatäite
   `(unavailable — no vision-capable provider connected)` (#8430).
6. Tagasta `modifiedPayload` koos metaandmetega (`imagesProcessed`,
   `descriptions`, `processingTimeMs`, `visionModel`).

#### Režiimivalija (`modalityBridgeVisionMode`)

| Režiim     | Vaikimisi | Käitumine                                                                                                                                                                                                                                                                                  |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔         | Pärandheuristika, muutmata (#6640/#7204): mittekombinatsiooni-/`auto/`-mudelid suunatakse ümber parimale nägemismudelile, välja arvatud juhul, kui algsel mudelil on juba kasutatavad mandaadid (siis kirjeldatakse); kombinatsiooni sihtmärke kirjeldatakse alati.                        |
| `describe` |           | Kirjeldatakse alati — ümbersuunamisplokk jäetakse täielikult vahele; vastab alati kasutaja valitud mudel.                                                                                                                                                                                  |
| `reroute`  |           | Sundümbersuunamine: mandaadiga mudeli säilitamise kontroll jäetakse vahele. Ümbersuunamise **sihtmärgi** mandaadikontroll kehtib endiselt — kui sobivat nägemissihtmärki pole, jätkub päring kirjeldamisega, et toorpildid ei jõuaks kunagi ainult teksti toetavasse tagasüsteemi (#8430). |

Sundrežiimid katkestavad töö **enne** automaatse heuristika käivitamist;
`auto` käitumine on baiditäpselt sama nagu PR-1-eelsel kaitsemeetmel.

#### API-võtme ulatus (`visionBridgeKeyScope.ts`)

Kui kutsuja API-võti piirab `allowedConnections`, kvoodifonde
(`allowedQuotas`) või mudeleid (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), valib sild
ümbersuunamis- ja kirjeldusmudeliteks ainult need mudelid, mida võti võib
kasutada, ning ühendustel, mida võti võib kasutada. Seejärel läbib
kirjelduskutse alati OmniRoute'i iseahela päisega
`x-omniroute-self-loop-key-id`, et vastuvõttev vestluspäring rakendaks uuesti
selle võtme ühenduse- ja mudelipoliitikat. `enforceApiKeyPolicy()` arvestab
seda päist ainult koos iseahela bearer'iga, mistõttu saab see juurdepääsu
ainult kitsendada; ID, mida ei õnnestu lahendada, lükatakse tagasi.

Kui võtmele pole lubatud ühtegi nägemismudelit, astub kirjeldustee kõrvale ja
päring edastatakse muutmata kujul, kasutades sama tõrke korral läbilaskvat
käitumist nagu keelatud kaitsemeetme puhul (metaandmed
`{ skipped: true, reason: "no_permitted_vision_model" }`).
Võtmeta päringud ja selliste võtmetega päringud, millel need piirangud
puuduvad, käituvad täpselt nagu varem.

#### Ülesannet arvestav kirjeldusviip (`modalityBridgeVisionTaskAware`)

Vaikimisi **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) lisab
baaskirjeldusviibale **viimase kasutajasõnumi** teksti (kärbituna 500 märgini),
suunates kirjelduse sellele, mida kasutaja tegelikult küsis
(codex-vision-proxy muster), ning palub nägemismudelil nähtava teksti
transkribeerida. Kui lipp on välja lülitatud või kasutaja tekst puudub,
kasutatakse baaskirjeldusviipa muutmata kujul.

Kirjelduse isetsükli enda OpenAI-ga ühilduv päring (`callVisionModelSingle()`
failis `visionBridgeHelpers.ts`) määrab alati `image_url.detail: "high"` —
tingimusteta iga kutsuja/pakkuja puhul ning sõltumata mis tahes kliendisignaalist.
Madala detailsusega diskreetimine halvendab OCR-i täpsust just selle
tekstitranskriptsiooni ülesande puhul, mida see viip nõuab, seega küsib
kirjelduspäring ise alati suurt detailsust olenemata algses sissetulevas päringus
kasutatud detailsustasemest. See mõjutab ainult sisemise kirjelduspäringu keha;
see ei muuda viisi, kuidas OmniRoute edastab põhipäringus kutsuja enda
`image_url.detail` väärtust — see vaikeväärtus rakendatakse eraldi ja ainult
tuvastatud OpenCode'i klientidele funktsioonis `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Kirjelduse isetsükli
Anthropicu traadivormingu harul puudub väli `detail` ning kumbki vaikeväärtus
seda ei mõjuta.

#### Kirjelduse väljundi piirang (`modalityBridgeVisionMaxChars`)

| Võti                           | Vaikeväärtus | Vahemik           |
| ------------------------------ | ------------ | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`          | `0` või 100–50000 |

`0` (vaikeväärtus) tähendab, et **piirang puudub** — funktsiooni
`callVisionModel()` tagastatud kirjeldus edastatakse muutmata kujul, säilitades
senise käitumise. Iga väärtus vahemikus 100–50000 kärbib kirjelduse ja lisab
selle lõppu järelliite `…`, enne kui see lisatakse tagasi kujul
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` failis
`src/lib/guardrails/visionBridge.ts`). Suurendage seda detailirohkete OCR-i
ülesannete puhul, kus järgnev mudel vajab täielikku transkriptsiooni; vähendage
seda, et piirata jutukate nägemismudelite tokenikasutust. Juhtpaneeli väli asub
vahekaardi Vision paneelil Advanced (`modality-bridge-max-chars` failis
`ModalityBridgeVisionTab.tsx`) ning tõstab kõik väärtused vahemikus 1–99
miinimumini 100, jättes samas selgesõnalise `0` muutmata — `0` on iseseisvalt
kehtiv Zodi väärtus
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), mitte ainult
„määramata” vaikeväärtus.

#### Kirjelduse vahemälu (`modalityBridge/bridgeCache.ts`)

Mälusisene LRU + TTL vahemälu kirjeldusväljundite jaoks, mida jagatakse kogu
protsessi ulatuses. Võti = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
koos pikkuseprefiksiga raamimisega (väljade piiridel kokkupõrkeid ei teki).
Mudeliosa on **seadistatud** sildmudel, mitte päriselt vastanud mudel —
`callVisionModel` võib sisemiselt kasutada varuvarianti ning võtme määramine iga
katse järgi killustaks vahemälu. Nurjunud kirjeldusi ei salvestata kunagi
vahemällu. Seaded:

| Võti                            | Vaikeväärtus | Vahemik |
| ------------------------------- | ------------ | ------- |
| `modalityBridgeCacheEnabled`    | `true`       | —       |
| `modalityBridgeCacheTtlMinutes` | `60`         | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`        | 10–5000 |

#### Kaugpiltide normaliseerimine (isetsükli kirjeldus/base64-toomine)

Kui sild hangib **kaugpildi** ise — Anthropicu kirjelduse isekutse ja
claude'i traadivormingu base64-teisendus (`ensureBase64ImagesForClaudeWire`),
mõlemad funktsiooni `fetchRemoteImageAsDataUri()` kaudu failis
`visionBridgeHelpers.ts` — edastatakse saadud andme-URI enne nägemismudeli
päringusse põimimist funktsioonile `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`). Liiga suured pildid skaleeritakse
väiksemaks nii, et **pikem külg on 2048px** (vastavalt suurusepiirangule, mida
OpenAI/Anthropic juba serveripoolel rakendavad), mis vähendab üleslaaditavate
baitide hulka ja latentsust, muutmata seda, mida nägemismudel näeb. Suuruse
muutmiseks kasutatakse dünaamilise impordi kaudu laaditud paketti `sharp`:
platvormil, kus selle omamaise kahendfaili laadimine ebaõnnestub, ei viska
`normalizeDataUri()` **kunagi erindit** — selle asemel edastatakse algsed baidid
muutmata kujul, nii et kirjelduse/base64-teisenduse tee töötab alati edasi.
Ka mittepildi baidid (toomine, mis ei tagastanud dekodeeritavat pilti)
edastatakse muutmata kujul. See normaliseerimine piirdub piltidega, mille sild
hangib enda isekutse jaoks — seda ei rakendata kunagi kutsuja töötlemata
läbiva koormuse suhtes, mis on kooskõlas ainult nõusolekul muutmise põhimõttega
(Hard Rule #20).

#### Seadete skeem + migratsioon

Uued `modalityBridge*` võtmed valideeritakse Zodiga skeemis
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
kolmik `modalityBridgeCache*` ja Audio Bridge'i kasutatav rühm
`modalityBridgeAudio*`. Migratsioon `141_modality_bridge_settings.sql`
kopeerib olemasolevad pärandväärtused `visionBridge*` vastavatesse uutesse
võtmetesse (idempotentselt ega kirjuta kunagi üle operaatori määratud
`modalityBridge*` väärtust); pärandvõtmeid aktsepteeritakse ühe väljalasketsükli
jooksul endiselt lugemise varuvariandina.

#### Läbipaistvuspäis + statistika

Kirjelduseks teisendatud vastused sisaldavad päist
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(mille koostab `buildModalityBridgeHeader()` failis
`modalityBridge/bridgeStats.ts` ja lisab `withModalityBridgeHeader()` failis
`src/sse/handlers/chatHelpers.ts`). Ümbersuunatud päringutele päist **ei**
lisata — koormust ei muudetud ja mudeli vahetus on juba nähtav vastuse keha
väljal `model`.

`GET /api/modality-bridge/stats` (halduse autentimine, sama tase nagu
`GET /api/settings`) tagastab mälus hoitavad modaalsuspõhised loendurid
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` modaalsuste `vision`, `audio` ja
`video` kohta. `averageLatencyMs` kasutab nimetajana `latencySamples`, mitte kõiki
katseid; ilma ajamõõtmiseta toiming ei tekita kunstlikku nullmillisekundilist
valimit. `bridged` jääb edukate teisenduste tagasiühilduvaks aliaseks;
ebaõnnestunud katsed seda ei suurenda.
Loendurid lähtestatakse protsessi taaskäivitamisel tahtlikult
(tegemist on telemeetria, mitte arvestusega).

#### Töölaua konfiguratsioon

Eraldi töölaualeht asub aadressil
`/dashboard/settings/modality-bridge`. Selle URL-i kaudu avatavad vahekaardid `Vision`, `Audio`
ja `Video` säilitavad vahetamisel päringuparameetrid, muutes ainult `tab` väärtust.
Vahekaart Vision võimaldab funktsiooni lubada, valida režiimi ja mudeli (sealhulgas automaatse
vaikevaliku), kasutada ülesandeteadlikke viipasid, seadistada täpsemaid ajalõpu, pildi,
kirjelduse pikkuse ja vahemälu piiranguid, vaadata käitusaegseid
loendureid ning saata kaitstud näidispäringu. Ka vahekaart Audio on täielikult toimiv: see võimaldab
funktsiooni lubada, valida ainult STT-mudelite seast koos valikuga Auto, seadistada ajalõpu ja klipi
maksimaalse pikkuse piiranguid, vaadata heli
loendureid ning käivitada `input_audio` näidistesti. Vahekaart Video on toimiv: see kuvab
FFmpegi/ffprobe'i käitusoleku — ühe neljast selgesõnalisest kasutajaliidese olekust (`unknown`, kui
kontroll on pooleli või seda ei õnnestunud lõpule viia, `restricted`, kui töölaud asub
mitte-loopback-hosti peal ja kontroll jäetakse kliendi poolel vahele, `unavailable`, kui kontroll
on lõpetatud ja puudumine kinnitatud, või `available` koos FFmpegi/ffprobe'i versioonidega) —, salvestab
lubamise, mudeli, kaadri, video ja ajalõpu piirangud, filtreerib mudelivalija nägemisvõimeliste
mudelite järgi ning kuvab video loendurid.

Varasem Vision Bridge'i kaart AI seadete all on ühilduvuslink
uuele lehele; see ei halda enam vormi teist koopiat. Media Providers
lingib ka Image-to-Texti ja Speech-to-Texti töövood vastavatele Modality
Bridge'i vahekaartidele, eemaldamata olemasolevat Speech-to-Texti proovikeskkonda.

**Isesele suunatud tsükli vastuvõtukontrollist möödumine:** kui kirjeldamiskutse suunatakse läbi OmniRoute'i
enda `/v1` isesele suunatud tsükli (mittestandardne teenusepakkuja mudel), saadab alampäring
`x-omniroute-admission-bypass: internal` ning autenditakse lahendatud
isesele suunatud tsükli identimisteabega — kohalikus režiimis kohaliku `sk_omniroute`
sentinelliga või operaatori seadistatud `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`
keskkonnavõtmega (#1350), et juurutused, kus `REQUIRE_API_KEY=true`, saaksid endiselt
kirjeldamiskutset käitada. Möödumist lubatakse ainult täpselt nende identimisteabega,
seega ei saa väliskliendid päist vastuvõtukontrolli vahelejätmiseks kasutada.

Pärandvaikeväärtused asuvad failis `src/shared/constants/visionBridgeDefaults.ts`;
uue režiimi, ülesandeteadlikkuse ja vahemälu vaikeväärtused ning seadete resolver asuvad failis
`src/shared/constants/modalityBridgeDefaults.ts`. Kaitsepiire pakub
`deps` konstruktori suvandit, et testid saaksid sisestada võltsitud `getSettings` ja
`callVisionModel` teostused.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Püüab heli sisaldavad vestluspäringud kinni enne, kui need jõuavad sihtmärgini, mille kohta pole
teada, et see aktsepteeriks helisisendit. See ei suuna vestluspäringut kunagi ümber: heliosad
transkribeeritakse olemasoleva OpenAI-ga ühilduva mitmeosalise lõpp-punkti kaudu ning
valitud vestlusmudel jätkab teksttranskriptidega.

Voog:

1. Lahenda `supportsAudio` funktsiooni `getResolvedModelCapabilities()` kaudu. Esmajärjekorras
   kasutatakse teenusepakkujate registri selgesõnalisi metaandmeid, seejärel staatilisi mudeli
   metaandmeid ja lõpuks sünkroonitud `modalities_input` väärtust. Deklareeritud sisendloend ilma
   väärtuseta `audio` annab tulemuseks `false`; võimekust tõendava teabe puudumisel jääb tulemuseks
   `null`. Nii `false` kui ka `null` aktiveerivad konservatiivse silla, samas kui `true` möödub sellest.
2. Lahenda `modalityBridgeAudio*` seaded ja eralda jagatava `detectMediaParts()`
   detektori kaudu iga sõnumi tipptasemelt väljalõigatavad heliosad.
   Toetatud edastusvormingud on OpenAI `input_audio`, `audio_url` ja
   `source.media_type: "audio/*"`. Pesastatud heli tuvastatakse marsruutimiseks, kuid seda
   ei eemaldata väljalõikamistee kaudu. Töömahtu piirab `modalityBridgeAudioMaxClips`;
   hilisemad osad jäävad puutumata.
3. Kasuta seadistatud `provider/model` väärtust või lase funktsioonil `selectAudioBridgeModel()`
   läbida `AUDIO_TRANSCRIPTION_PROVIDERS` stabiilses kataloogijärjestuses ja valida esimene
   mudel, millel on kasutatav aktiivne teenusepakkuja identimisteave.
4. `callAudioTranscription()` teisendab base64-/andme-URI-vormingus heli mitmeosaliseks
   `file` väljaks või laadib kaugfaili `audio_url` kaudu alla, kasutades ainult avalikke
   aadresse lubavat väljaminevate ühenduste kaitset, DNS-i kinnistamist ja 25 MB piiri.
   Seejärel saadab see faili ja valitud mudeli POST-päringuga kohalikku
   `/v1/audio/transcriptions` isesele suunatud tsüklisse, autentides päringu funktsiooniga
   `resolveSelfLoopBearer()`. Olemasolev transkribeerimismarsruut teeb tavapärase
   identimisteabe otsingu, käsitleb jahtumis- ja kiiruspiiranguid ning edastab päringu
   teenusepakkujale.
5. Edukad kutsed asendavad oma osad tekstiga `[Audio N]: <transcript>`. Kutsed
   käitatakse funktsiooniga `Promise.allSettled`: üksiku kutse ebaõnnestumisel säilitatakse
   algne heliosa (#4012 leping). Kui kõik kutsed ebaõnnestuvad ja sihtmärgi puhul on tõendatud
   `supportsAudio === false`, muutuvad osad tekstiks
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 leping). Tundmatu
   sihtmärgi (`null`) korral jääb kõigi kutsete ebaõnnestumisel sisu puutumata. Tõendatult
   ainult teksti toetav sihtmärk, millel puudub kasutatav STT-identimisteave, saab sama
   selgesõnalise asendusteksti ilma võrgukutset tegemata.

Edukad transkriptid kasutavad kogu protsessi hõlmavat Modality Bridge'i LRU-/TTL-vahemälu.
Võti ühendab heliviite, stabiilse `audio-transcription` toimingusildi ja valitud STT-mudeli;
ebaõnnestumisi ei salvestata kunagi vahemällu. Helikatsed uuendavad jagatud loendureid
`bridged`, `cacheHits`, `failures` ja `lastUsedAt`.
Teisendatud vastused sisaldavad päist
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; puutumata
päringutele Audio Bridge'i segmenti ei lisata.

Käitusaegsed seaded talletatakse andmebaasis ja valideeritakse Zodiga:

| Võti                          | Vaikeväärtus | Vahemik               |
| ----------------------------- | ------------ | --------------------- |
| `modalityBridgeAudioEnabled`  | `true`       | —                     |
| `modalityBridgeAudioModel`    | `""`         | Automaatne või STT ID |
| `modalityBridgeAudioTimeout`  | `60000`      | 1000–300000           |
| `modalityBridgeAudioMaxClips` | `3`          | 1–10                  |

Jagatud vahemälu juhivad endiselt `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` ja `modalityBridgeCacheMaxEntries`.

### Videosild (`videoBridge.ts`, `videoBridgePipeline.ts`)

Püüab kinni tipptaseme videoosad Chat Completionsi `messages`-väljal ja Responses
API `input`-väljal enne sihtmudeli kutsumist, millel teadaolevalt puudub video loomulik tugi.
Toetatud kujud on `input_video`, `video_url`, `video_source`, HTTPS URL-id
ja `data:video/*;base64,...` andme-URI-d. Tekstis olevaid lihtsaid failinimesid ei käsitleta
videona.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) vastutab päringu läbimise,
võimekuse/poliitika kontrolli, päringupõhise koondamise ja vastuse kasuliku koormuse eest.
Videopõhine töö — hankimine, kogu tulemuse vahemällu salvestamine, kaadrijada
kirjeldamine (mis ühendab kõik kutsuja deklareeritud heli transkriptsioonid) ning katsepõhised
mõõdikud/katkestamine/puhastamine — on peidetud faili `videoBridgePipeline.ts`
funktsiooni `processVideoPart` taha, mida kutsutakse `preCall`-i tsüklis iga videoosa kohta üks kord.
See moodul määratleb ka selgesõnalised pordipiirid `VideoMediaBrokerPort`
(baitide hankimine ja valimkaadrite eraldamine), `VideoAudioTranscriptionPort`
(kutsuja deklareeritud heli transkriptsiooni ühendamine valimkaadrite pealdistega) ja
`VideoDrilldownPort` (kaadrite süvauurimise püsivuspiir; pole veel funktsiooniga
`processVideoPart` ühendatud — praegu kirjutab süvauurimiskirjeid ainult eraldiseisev
marsruut `/api/modality-bridge/video/drilldown`).

Avalik `/v1` päringutee ei impordi ega käivita kunagi alamprotsessi. Kaugvideod
laaditakse alla 50 MiB piiranguga; tekstisiseselt base64-kodeeritud videotele kehtib
konservatiivne 36 MiB dekodeeritud mahu piirang video kohta, et mudeli/sõnumite/raamistuse
ümbris jääks avaliku JSON-päringu 50 MiB vastuvõtupiiri sisse. Tekstisisese sisu
pikkust ja dekodeeritud mahu hinnanguid kontrollitakse enne mälu eraldamist. HTTPS
on nõutav nii esialgse kaug-URL-i kui ka iga ümbersuunamise puhul, kasutades olemasolevat
ainult avalikke sihtkohti lubavat DNS-i kinnistamisega väljamineva liikluse kaitset. Seejärel
ületavad baidid täpselt sisemise vahendaja piiri `POST /api/modality-bridge/video/extract`.
See marsruut on korraga nii `LOCAL_ONLY` kui ka `SPAWN_CAPABLE`, võtab vastu ainult
protsessipõhiselt autenditud usaldusväärse tagasisideahela päringu ega aktsepteeri kunagi
URL-i, failisüsteemi teed, täitmisfaili ega argumentide loendit. API päringukeha mahu
töötluskonveier ja töötleja inkrementaalne päringukeha lugeja jõustavad teineteisest
sõltumatult vahendaja sisendile 50 MiB piirangu. Selle piiratud järjekord töötleb korraga
ühte eraldamist, lubab nelja ootel tööd ja piirab ootel sisendi kogumahu 100 MiB-ni.

Vahendajas loeb `ffprobe` privaatset kohalikku faili; fikseeritud vormingute lubatud
loend välistab esitusloendi- ja manifestivormingud. Lubatud MOV-perekonna konteinerite
puhul jäävad välised MOV-andmeviited vaikimisi keelatuks ja fikseeritud käsk ei luba
neid sisse. Nii `ffprobe` kui ka `ffmpeg` kasutavad ainult `file`-protokolli lubatud
loendit, ühte lõime, fikseeritud argumentide massiive, ei kasuta kesta ning täitmisfailid
leitakse muutujast `PATH`. Manustatud kaanepildi vood ei ole taasesitatavad kandidaadid.
Kõik taasesitatavad vood peavad piirangutele vastama ning enne deterministlikku väikseima
indeksiga varuvarianti eelistatakse selgesõnaliselt määratud vaikevoogu. Videote pikkus
on piiratud 600 sekundiga, iga mõõde 8 192 piksliga ja lähtevideo kogusuurus 33 554 432
piksliga. FFmpeg võtab 1–16 keskpunkti JPEG-valimkaadrit, vähendab pika külje kõige
enam 1 024 pikslini ilma väiksemaid sisendeid suurendamata ega saa kunagi sisendiks URL-i.
Vaikimisi on valimipoliitika `uniform`. Valikulised poliitikad
`scene_aware` ja eksperimentaalne `segment_aware` teevad juba valideeritud kohaliku
voo üle ühe täiendava fikseeritud FFmpegi läbimise, valivad piiratud arvu `showinfo`
stseeniajatemplid ning detektori tõrke, ajalõpu, vigase väljundi või tühja kandidaatide
hulga korral kasutavad deterministlikult varuvariandina samu ühtlaselt jaotatud keskpunkte.
Segmenditeadlik režiim jaotab keskpunkti valimid valideeritud stseenivahemike vahel
proportsionaalselt; segmenditeadlikke tõendeid ja varuvariandi käitumist kirjeldatakse
üksikasjalikult allpool. Ranget 16 kaadri piirangut rakendatakse iga poliitika puhul
pärast valimist. Kui stseeniteadlikul päringul on ainult ühe kaadri eelarve, kasutab see
aktiivse täisvideo või fookusakna ühtlast keskpunkti ja teatab
`policyEffective: uniform`: üks valitud stseenikaader ei suuda säilitada ajaskaala
mõlemat otsa. Kutsuja võib soovi korral esitada lõpliku fookusakna (`start`/`end`
sekundites); piirid kärbitakse meediumi kestuse järgi, ümberpööratud või mittelõplikud
aknad lükatakse tagasi ning kõiki valimipoliitikaid rakendatakse ainult normaliseeritud
vahemikus. Saadud aken lisatakse valimi metaandmetesse ja ebausaldusväärse kirjelduse
prefiksisse, et järgnevad mudelid suudaksid eristada fokuseeritud väljavõtet täielikust
ajaskaalast.

Pealdiste semantiline fookus on eraldiseisev selgesõnaline seadistus. Vaikimisi
kasutatav `full` analüüsirežiim säilitab olemasoleva kaadriviiba ega edasta päringu
teksti kunagi pealdisemudelile. Režiimis `focused` loeb sild ainult sama Chati või
Responsesi konteineri viimast mittetühja kasutaja loodud `text`/`input_text`-sisu,
normaliseerib selle NFC-kujule, ahendab juhtmärgid ja tühimärgid ning piirab selle
500 Unicode'i koodipunktiga. Tühi tulemus kasutab varuvariandina täpselt `full`-viipa.
Kasutatav vihje jadastatakse JSON-ina eraldiseisvasse ebausaldusväärse
kasutajakonteksti plokki ning see võib üksnes vaadeldavaid üksikasju tähtsuse järgi
järjestada; see ei saa tühistada eraldiseisvat hoiatust, mis keelab meediumis nähtavate
või kuuldavate juhiste järgimise. Tekstiline fookus ei tuleta kunagi `start`/`end`
väärtusi ega muuda ajalist valimit.

#### FU-07 struktuursed segmenditõendid

`segment_aware` kasutab juba valideeritud kohalikul videovool ühe piiratud eelanalüüsi läbimise. Fikseeritud filtriahel skaleerib video esmalt maksimaalselt 320 piksli laiuseks, tuvastab stseenivahetused ja tardunud intervallid ning võtab seejärel hägususe, keskmise heleduse ning ruumilise/ajalise informatsiooni analüüsimiseks ühe kaadri sekundis. Läbimine on piiratud 600 struktuurse näidise, ühe FFmpeg-i/filtri lõime, samade ainult `file`-protokolli ja konteinerite lubatud loendite, 1 MiB protsessiväljundi piiri ning maksimaalselt 30 sekundiga vahendaja ühise katkestuse/tähtaja piires. See ei võta päringust kunagi vastu käsku, filtrit, teed ega URL-i.

Struktuursed väärtused on deterministlikud valimiandmed, mitte video semantiline mõistmine. Need ei järelda subjekte, tegevusi, subtiitreid, kõnet ega kasutaja kavatsust. Stseeni- ja tardumispiirid moodustavad segmendid; tardumise osakaal, hägusus, säritus, ruumiline detailsus ja ajaline muutus mõjutavad üksnes seda, kuidas olemasolev 1–16 kaadri eelarve jaotatakse. Täielikult tardunud segment on piiratud ühe kaadriga, samas kui mittetardunud segmendid konkureerivad ülejäänud eelarve pärast. Kui piire on rohkem kui kaadreid, säilitatakse ajajoonel ühtlane katvus, et kiired varajased lõiked ei saaks pikka lõpuosa varjata. Tardumispiirist 1-sekundilise analüüsieraldusvõime piiresse jäävad stseenipiirid liidetakse.

Puuduvad filtrid, vigased või tühjad andmed, detektori viga või piiratud eelanalüüsi ajalõpp põhjustavad avatud tõrke ja täpselt ühtlase keskpunktipoliitika kasutamise. Kutsuja katkestus või vahendaja tähtaeg ei põhjusta avatud tõrget: see lõpetab poolelioleva alamprotsessi, takistab hilisemat kaadrite eraldamist ning privaatne ajutine kataloogipuu eemaldatakse plokis `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genereerib deterministlikud tegelikud FFmpeg-i testandmed deduplikatsioonijärgse pealdisekutsete säästu, tiheda liikumise eelarvejaotuse, hägususe/särituse/SI-TI andmete, pika lõpuosaga kiirete lõigete ja järkjärgulise hajumise valepositiivsete tulemuste jaoks. See salvestab eelanalüüsi tegeliku kestuse ning juhul, kui `/usr/bin/time` on saadaval, alamprotsessi protsessoriaja ja RSS-i tippväärtuse. Selle kvaliteedikontrollid on ainult struktuursed oraaklid. Tegelik pealdisemudeli kvaliteet jääb olekusse `HOLD`, sest sellel testiraamistikul puudub volitatud lõpp-punkt või fikseeritud hindaja. Rahaline sääst jääb samuti olekusse `HOLD`, välja arvatud juhul, kui `--caption-cost-per-call-usd` määrab selgesõnalise positiivse kutsepõhise hinnangu; skript ei fabritseeri kumbagi tulemust.

Iga kaadri maht on piiratud 4 MiB-ga, kõigi töötlemata kaadrite kogumaht 23 MiB-ga ja vahendaja serialiseeritud vastus 32 MiB-ga. Privaatne ajutine kataloog eemaldatakse plokis `finally`. OmniRoute ei hõlma FFmpeg-i ega aktsepteeri kohandatud täitmisfaili teed. Enne pealdiste loomist rakendab sild konservatiivset visuaalset deduplikatsiooni: iga JPEG vähendatakse 16×16 halltoonipuhvriks ja seda võrreldakse ainult viimase säilitatud kaadriga. Kui soovitud pealdiste eelarve ületab ühe kaadri, annab eraldamine piiratud kandidaatide kogumi, mis on kuni kaks korda suurem kui eelarve, kuid mitte kunagi üle 16 kaadri. Soovitud ülempiiri rakendatakse alles pärast deduplikatsiooni ning kui eelarve on vähemalt kaks, säilitatakse lõpliku harvendamise käigus esimene ja viimane valitud kandidaat. Versioonitud
`grayscale-16x16-mean-cells-v2` poliitika kasutab keskmise heleduse delta ja nende pisipildi lahtrite osakaalu suuremat väärtust, mille normaliseeritud delta on vähemalt 0,05. Duplikaadilävi on konstant 0,04, mis on valitud prognoositavuse huvides, mitte käitusaja seadistusena avaldamiseks. See teisene suure kontrastsusega signaal säilitab väikesed liikumised ja nähtava teksti muudatused, mida ainult keskmisel põhinev võrdlus võib varjata. Võrdleja või dekoodri vead põhjustavad avatud tõrke ja säilitavad katvuse. Väljundi metaandmed eristavad eraldatud kandidaate, edukalt kasutatud kaadreid ja eemaldatud visuaalseid duplikaate.

Selgesõnaliselt videoks märgitud osa võib taotleda ajatemplitega kontaktlehte. Sild koostab maksimaalselt 4 veerust ja 16 kaadrist koosneva JPEG-ruudustiku. Iga 512-piksline lahter lisab oma lähteajatempli suure kontrastsusega alumisele ribale, samas kui samad ajatemplid jäävad tekstilistesse metaandmetesse järgnevaks seostamiseks ja auditeerimiseks. Terviklik JPEG on endiselt piiratud 32 MiB-ga. Kui `sharp` ei suuda ruudustikku dekodeerida või koostada, kasutab sild varuvariandina üksikuid JPEG-kaadreid; kliendi katkestus levib endiselt läbi kontaktlehe toimingu.

Kasutuselevõtu tõendusmaterjal hoitakse sünteetilisest kompositsiooni mikrojõudlustestist tahtlikult eraldi. `scripts/perf/video-bridge-contact-sheet-eval.ts` määratleb skeemiversiooniga A/B-testiraamistiku tegelike OpenAI-ga ühilduvate nägemismudelite jaoks. See mõõdab teenusepakkuja teatatud sõnemite arvu, täielikku tegelikku latentsust (sealhulgas kontaktlehe koostamist), mudelikõnede arvu ja manifestiga määratletud faktide säilimist. Mudeli toorvastuseid aruandesse ei kirjutata; säilitatakse ainult SHA-256 räsid ja vastavusse viidud faktide ID-d. Testiraamistik ei tee võrgu- ega tasulist mudelikõnet, välja arvatud juhul, kui edastatakse `--execute-real` ning `--model`, `OMNIROUTE_BASE_URL` ja `OMNIROUTE_API_KEY` on konfigureeritud. Ilma selle selgesõnalise tegeliku käivituseta jääb masinloetav otsus olekusse `HOLD`; sünteetilised andmemahu- ja kõnearvumõõtmised üksi ei ole kasutuselevõtu tõendusmaterjal.

Kutsujad võivad toetatud videoosale lisada valikulise massiivi `transcript.cues`, kui neil on juba ajaliselt joondatud tekst. Iga vihje peab sisaldama välja `text`, lõplikku `start`/`end` intervalli sondeeritud kestuse piires ja lubatud loendisse kuuluvat välja `source` (`client`, `embedded` või `audio-bridge`); välja `confidence` vaikeväärtus on `1` ja see peab jääma vahemikku `0` kuni `1`. Täpsed duplikaatvihjed liidetakse. OmniRoute ei alusta nende metaandmete põhjal kunagi transkribeerimist: valideeritud vihjed kopeeritakse kirjeldatud tulemusse koos allika, usaldusväärsuse ja intervalliga ning renderdatakse kaadripealdiste kõrval ebausaldusväärsete vaatlustena. Vigane, vahemikust väljas või päritoluteabeta tekst lükatakse tagasi, selle asemel et seda pealdiste voogu segada. Mõlemad päringu keha transkriptsioonikanalid normaliseerivad esitatud päritolu väärtuseks `client`, sealhulgas kasutaja enda väidetud sildid `embedded` või `audio-bridge`. Ainult serveri hallatav adapter saab määrata need usaldatud sildid ainult koodis kasutatava argumendi `trustedSource` kaudu; päringu JSON-väli ei pääse selle argumendini. Transkriptsioonitekst jääb selle päritolust olenemata ebausaldusväärseks meediast tuletatud sisuks ega tohi kunagi määrata autoriseerimist.

Kogenud kutsuja võib sama video jaoks anda `audioTranscript`-raja;
seda käsitletakse kliendi esitatud tekstina, mitte serveripoolse transkribeerimise tõendina.
Liitmiskiht töötleb visuaalseid ja heli põhjal tehtud vaatlusi sama
tähtaja ning katkestussignaaliga, järjestab need ühisel ajajoonel, ühendab
täpsed duplikaadid ja tagastab osalise tulemuse, kui õnnestub ainult üks haru.
Vigane `audioTranscript` taandub selliseks osaliseks tulemuseks — visuaalne
kirjeldus säilitatakse ja heliharu talletab puhastatud tõrkekoodi —
selle asemel, et kogu video töötlemine nurjuks. Harupõhine saadavus, osalisuse lipp
ja puhastatud tõrkekoodid säilitatakse kirjeldatud tulemuses,
kaitsepiirde metaandmetes (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), tulemuste vahemälu metaandmetes ning silla
liitmiloendurites. Video Bridge'i vaiketee ei käivita kõne tekstiks teisendamist
ega laadi alla teist meediakoopiat; ilma selle selgesõnalise rajata jääb see
ainult videot töötlevaks.

**Transkriptsiooni säilitamine (#12150 P1).** See rakendub automaatselt alati, kui
Video Bridge (mis on ise lubatav valik) renderdab transkriptsioonivihje — eraldi
säilituslippu ei ole. Kui päring renderdab mõne transkriptsioonivihje (kutsuja deklareeritud
`transcript` või liidetud `audioTranscript`), märgib kaitsepiire selle
`videoBridgeObserved`-märgisega ja loob videokirjeldusest redigeeritud varikoopia —
identse renderduse, milles iga vihje vabatekstiline sisu asendatakse tekstiga
`[redacted-video-transcript]`; see luuakse struktureeritud vihjevälja asendamisega
enne stringi koostamist (mitte kunagi lamendatud teksti parsimisega, mistõttu ei saa ükski
vihje sisu — pahatahtlik ega tavapärane, sealhulgas märki `]` sisaldav sisu, nagu
`[inaudible]`/`[music]` — säilida). Püsivasse kõnelogisse salvestatud päringu keha
asendab iga videost tuletatud tekstiosa selle redigeeritud varikoopiaga, sobitades
sisu võrdsuse alusel; ankur `fullText` loetakse lõpetatud kõneeelse kaitsepiirde
andmekogumist uuesti, nii et sobitamine õnnestub ka pärast seda, kui hilisemad ahela
kaitsepiirded (isikuandmete ja mandaatide maskeerijad prioriteetidega 10/95)
kirjutavad kirjelduse teksti kohapeal ümber, ning pärast seda, kui süsteemiviiba,
üleandmise või mälu lisamine kujundab sõnumimassiivi ümber. Mudelile ülesvoolu
saadetav keha ei muutu. Vaadeldud päring ei täida ka püsivat mälu Memory
(nii päringust kui ka vastusest tuletatud andmete eraldamine jäetakse vahele),
mistõttu ei saa mudeli enda vastus transkriptsiooni teksti Memorysse kajastada.

**Video toorväljad (#12430).** Kui sild on lubatud ja video loomulik tugi on teadmata või puudub, aktiveerivad määratud `transcript`/`audioTranscript` väljad samuti `videoBridgeObserved`, isegi pärast kirjelduse nurjumist või `maxVideos` piirangut. `null` ja tühjad stringid lähevad arvesse; puuduvad väljad ja videoga mitteseotud metaandmed ei lähe. Säilitatavates koopiates redigeeritakse need väljad või jäetakse päring välja ning vahemäludest/Memoryst minnakse mööda.

Neil varuteedel muutuvad kutsuja kehtivad vihjed toetatud `text`/`input_text`
osadeks, mitte ebastandardseteks teenusepakkuja väljadeks. Mõlemad päringuga edastatud rajad
jäävad ebausaldusväärseteks `client`-vaatlusteks koos selgesõnalise hoiatusega, et videot
ei kirjeldatud ja ajatempleid ei kontrollitud meedia suhtes. Olemasolevad
256 vihje / 64 KiB kogumahu ja vihjepõhised piirangud kehtivad mõlemale rajale ühiselt;
ajatemplid peavad mahtuma vahendaja 600-sekundilise ülempiiri ja mis tahes antud
fookusakna sisse. Vigased rajad hüljatakse, mitte ei edastata suvalise tekstina; kehtivat
paarisrada võib siiski kasutada, kui nende ühine mahupiirang pole ületatud. Null-/tühjad
väljad ei lisa teksti. See varutee ei lisa meedia hankimist ega transkribeerimist.
Transkriptsiooni laiendusväljad eemaldatakse varutee videokandjast ja selle
`video_url`/`source` objektidest. OpenAI juhtmeprotokolli lubatud väljade loend jääb rangeks;
tundmatu loomuliku toega videokandjad jäävad saadavaks ja teadaolevalt ainult teksti toetavad
sihtkohad säilitavad ohutud markerid. Struktureeritud redigeerimisvarjud kaitsevad
lisatud transkriptsiooniteksti, samal ajal kui kutsujale kuuluv algne päring jääb
muutmata. Loomuliku toega sihtkohad ja keelatud sillad säilitavad senise
möödaviigukäitumise.

Täiendavad säilitatavad koopiad kasutavad sama vaadeldud päringu signaali. Toores
kaitsepiirde-eelne kliendipäringu hetktõmmis, mälus olev ootel päring ja varakult
tagasilükatud päringu logi asendavad videote osades transkriptsiooniväljad struktuurselt;
konveieri etappide ja konteksti üleandmise sünteesitud stringviibad redigeeritakse
püsiva päringukeha andmevoo lõpp-punktis. Püsiv `video_content_removed` marker
sunnib `previous_response_id` jätkamise turvaliselt nurjuma, selle asemel et
taastada tahtlikult eemaldatud tekst. Kui vaadeldud päring kaotab enne logimist
oma osapõhise redigeerimisvarju või kui kas või ühe mitmest videovarjust sobitamine
pärast hilisemaid päringumuudatusi nurjub, jäetakse säilitatav päringukeha täielikult
välja, selle asemel et säilitada osaliselt redigeeritud transkriptsioon.

Vaadeldud päringu korral võib mudeli vastus tsiteerida transkriptsiooni mis tahes
osa ilma struktureeritud vihjepiirita. Seetõttu asendatakse selle püsiva kõnelogi
`responseBody` väljajätmismarkeriga; üksikasjalikku konveieri artefakti (mis võib
sisaldada ülesvoolu-/kliendikehasid ja voogedastuse fragmente) ei säilitata.
Semantilise, idempotentsuse ja arutluskäigu taasesituse vahemälude lugemistest ning
kirjutamistest minnakse selle päringu puhul mööda. Teenusepakkuja päring ja kliendile
nähtav vastus jäävad muutmata. Varajased ühenduse elushoidmise baidid tühjendatakse
ajutisest puhvrist, kui üksikasjalik artefakt välja jäetakse. Kiro vigase EventStreami
hoiatus teatab ainult andmekogumi baitide arvu, mitte kunagi selle sisu ega JSON-i
parseri töötlemata viga.
Sellega ei väideta, et kõiki muid teenusepakkujate/pistikprogrammide diagnostikaid
oleks auditeeritud; säilitatavate andmevoo lõpp-punktide laiem kontroll on jälgitav
ülesandes #11658.

Sisemine `/api/modality-bridge/video/drilldown` elutsükkel on eraldiseisev,
loopback-/loaga autenditud vahemälu alamsüsteem. Iga toiming nõuab ka
kanoonilist läbipaistmatut subjekti ID-d. Enne tootmiskeskkonna kutsuja lubamist peab see
tuletama kõnealuse ID autenditud rentnikust ega tohi kunagi edastada
kliendi valitud väärtust. Vahemälu võtmed seovad selle subjekti kanooniliste seansi- ja
videoviite ID-dega, talletavad ainult nende SHA-256 põhjal tuletatud võtmed ning piiravad nii lugemised
kui ka kustutamise sama subjektiga. Vahemälu talletab kirje kohta kuni 16 tuletatud JPEG-
kaadrit, aegub need kümne minuti pärast ning toetab piiratud
`start`/`end` lugemisi või seansi sõnaselget kustutamist.

Iga subjekt on piiratud 16 kirje ja 64 MiB kanooniliste JPEG-andmetega. Need
piirangud ei sõltu globaalsest 64 kirje / 256 MiB ülempiirist: subjekti kvoodi
surve tõrjub enne globaalse LRU-tõrje kaalumist välja ainult selle subjekti
vähim kasutatud kirjed. Aegunud kirjed eemaldatakse vahemälu kasutamisel nii subjekti
kui ka globaalsest arvestusest, samas kui tühistamise ja valideerimise nurjumise korral
osalist asendust ei kinnitata.

Vahemälu lükkab tagasi mittekanoonilise Base64, liigse täidise, mitte-JPEG-meedia, vigased või
kärbitud JPEG-id ning JPEG-id, mis annavad piiratud täispildi `sharp`-dekodeerimise
käigus hoiatuse. See kodeerib iga vastuvõetud pildi uuesti kanoonilise JPEG-ina, tuletab laiuse ja kõrguse
dekodeeritud baitidest, selle asemel et usaldada kutsuja välju, ning hülgab kõik lõppu lisatud
polüglottbaidid, mitte ei säilita neid. Mõlema kvoodi kasutusse arvestatakse ainult piiratud kanooniline tihendatud puhver.
JSON-i edastuspiirang hõlmab Base64 lisamahtu 32 MiB
dekodeeritud sisendi ülempiiri jaoks. Iga
talletatud tuletis salvestab selle valideeritud JPEG-vormingu/-eraldusvõime, diskreetimispoliitika,
tuletusversiooni, loomise aja, serveris arvutatud sisuräsi ja räsitud ülemviite
koos usaldatud kutsuja edastatud ülemsisu räsiga. Tühistamist kontrollitakse
asünkroonsete dekodeerimis-/räsifaaside vahel enne vahemälu atomaarset kinnitamist.

See etapp ei ühenda veel tootmiskeskkonna tootjat marsruudiga ega paku
mitme eraldusvõimega variantide valikut. Video Bridge'i läbipaistev päringutee
ei põhjusta seetõttu lisatööd, samas kui rentnikuga seotud subjekti tuletamine ja
täielik FU-08 mitme eraldusvõimega elutsükkel jäävad selgesõnaliselt järeltööks,
mitte dokumenteeritud valmisfunktsionaalsuseks.

Kaadritele luuakse järjestikku pealdised seadistatud Video mudeliga. Tühi
Video ülekirjutus pärib Vision seadistuse; kui mõlemad on tühjad, valib Vision
automaatruuter sobiva nägemisvõimekusega mudeli. Õnnestunud pealdised
asendavad algse osa stabiilse prefiksiga `[Video description:`, mis ühtlasi
märgib teksti mitteusaldusväärse, meediast tuletatud vaatlusena ja käsib allavoolu
mudelitel meediast leitud juhiseid mitte järgida. Kaadripealdiste vahemälu võtmed
hõlmavad JPEG-baite, viipa, ajatemplit ja tegelikku mudelit; vahemällu salvestatakse ainult
õnnestunud pealdised. Vahemälukirjed säilitavad tegeliku eduka tootjamudeli,
sealhulgas varumudeli; sild tagastab `mixed`, kui eri kaadrid
toodeti eri mudelitega. Vahemälutabamus kasutab seda tootjaidentiteeti uuesti,
selle asemel et seda taotletud marsruutimisplaaniks ümber nimetada. Terve video tulemuse
vahemälu võti põhineb kõigil väljundit muutvatel sisenditel — viip, tegelik
mudel, diskreetimispoliitika, kaadrite arv, semantilise analüüsi režiim, normaliseeritud
fookusvihje SHA-256 sõrmejälg, fookusaken, `transcript`,
`audioTranscript` ja kontaktlehe lipp — seega annab nende
mõõtmete muutmine vahemälutõrke, mitte aegunud tulemuse taaskasutuse. Visuaalse duplikaadieemalduse poliitika
versioon, lävi ja piiratud kandidaatkaadrite arv on samuti tulemuse vahemälu
võtmes ja metaandmetes sõnaselgelt esitatud; poliitika muutmine ei saa seetõttu aegunud
terve video kirjeldust uuesti kasutada. Tulemuse vahemälu v4 metaandmed säilitavad režiimi ja
sõrmejälje, kuid mitte kunagi kasutaja töötlemata ülesannet. Kaitsepiirete metaandmed esitavad nii
taotletud kui ka tegeliku analüüsirežiimi; taotletud `focused` režiim ilma
kasutatava kasutajatekstita esitatakse tegelikult režiimina `full`.

Kaitsepiire eraldab kõik toetatud videoosad, kuid kirjeldab neid maksimaalselt
`modalityBridgeVideoMaxVideos` ulatuses. Kui sihtobjekti puhul on tõestatud
`supportsVideo === false`, muudetakse nurjunud ja piirangut ületavad videod sõnaselgeteks ohututeks
tekstmarkeriteks, nii et töötlemata videot ei säili. Kui võimekus pole teada, säilitavad need osad
oma videokandja; mis tahes varutranskriptsioon järgib eespool kirjeldatud piiratud tekstiks
teisendamist. Sihtobjektid, mille puhul `supportsVideo === true`, mööduvad sillast.
Kliendipäringu katkestussignaal levib läbi allalaadimise, maakleri järjekorra,
alamprotsesside ja pealdisekutsete; katkestused peatavad töö videote vahel ega jäta
nurjumise korral töötlemata meediat läbipääsetavaks.

Käituskeskkonna seadistused on andmebaasipõhised ja Zod-valideeritud:

| Võti                                | Vaikeväärtus | Vahemik / käitumine                                                                                                        |
| ----------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`      | Valikuline käituskeskkond, nõuab eraldi lubamist                                                                           |
| `modalityBridgeVideoAnalysisMode`   | `"full"`     | `full` säilitab üldised subtiitrid; `focused` kasutab piiratud ja ebausaldusväärset uusima kasutaja konteksti              |
| `modalityBridgeVideoModel`          | `""`         | Pärib Vision Bridge'i mudeli                                                                                               |
| `modalityBridgeVideoFrameCount`     | `8`          | 1–16                                                                                                                       |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`  | `uniform`, `scene_aware` või proportsionaalne `segment_aware`; tuvastaja tõrke korral kasutatakse varuvariandina `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`          | 1–4                                                                                                                        |
| `modalityBridgeVideoTimeout`        | `120000`     | 1000–120000 ms                                                                                                             |

Püsivalt salvestatud pärandvideo ajalõpuväärtused, mis ületavad 120 sekundit,
piiratakse vahendaja tähtajani; uute sätete kirjutamine üle selle piiri lükatakse tagasi.
`GET /api/modality-bridge/video/runtime` nõuab enne autentimist või käituskeskkonna
kontrollimist usaldusväärselt märgistatud loopback-lokaalsust ning seejärel halduse
autentimist. See tagastab ainult `available`, puhastatud FFmpeg/ffprobe versioonid ja
fikseeritud põhjuse, kui käituskeskkond pole saadaval. Sisemine ekstraktimise lõpp-punkt
ei ole avalik üleslaadimis-API: järjekorra täitumine tagastab `503` koos päisega
`Retry-After`, helistaja ühenduse katkemine tagastab `499` ja vahendaja fikseeritud
tähtaeg tagastab `504`. Teisendatud vastused lisavad kesksesse
`x-omniroute-modality-bridge` päisesse
`video->text;model=<visionModel>;parts=<videos>`, eemaldamata Visioni või Audio segmente.

### Isikuandmete maskeerija (`piiMasker.ts`)

Käitatakse **mõlemas** etapis.

- **`preCall`** kloonib andmekogumi, läbib väljad `system`, `messages`, `input` ja
  `prompt` (sealhulgas lihtteksti elemendid) ning rakendab string-tüüpi
  `content`/`text` väljadele funktsiooni `processPII()` (asukohast
  `@/shared/utils/inputSanitizer`). Kui `PII_REDACTION_ENABLED=true`, peidetakse
  tuvastatud isikuandmed väljaminevas andmekogumis. See ei sõltu muutujast
  `INPUT_SANITIZER_MODE` (mis juhib ainult viibasisestuse poliitikat). Kui
  peitmine on välja lülitatud, salvestab kutse tuvastamiste arvud sisu ümber
  kirjutamata.
- **`postCall`** süvakloonib vastuse, käitab funktsiooni `sanitizePIIResponse()`
  koos Responses-API kuju maskeerijaga (`maskResponsesOutput` — hõlmab välju
  `output_text` ja `output[].content[].text`). Kui midagi peidetakse, asendab
  muudetud vastus algse.

Kaitsemeede ei blokeeri kunagi; see ainult lisab annotatsioone
(`meta.detections`, `meta.redacted`) või kirjutab sisu ümber.

#### Tüübipõhine valik, kohandatud mustrid ja tuvastusloendurid

**Töölaud → Sätted → Turvalisus → Isikuandmete maskeerimine** määrab, _mida_
maskeeritakse. See ei lülita maskeerimist sisse: seda juhivad endiselt
`PII_REDACTION_ENABLED` (päring) ja `PII_RESPONSE_SANITIZATION` (vastus + SSE),
mis mõlemad on vaikimisi välja lülitatud.

- **Tüübipõhine valik** — sisseehitatud ID-d on loetletud failis
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Määramata väärtus
  tähendab kõiki tüüpe (käitumine enne selle sätte lisamist). Päringumootori
  muster `ssn_us` vastendatakse tüübile `ssn`. Mallid (Minimaalne, Standardne,
  Finants-, Brasiilia, USA, Täielik) täidavad ainult kasutajaliidese märkeruudud.
- **Kohandatud mustrid** — kuni 20 regulaaravaldise või metamärgiga mustrit
  (`*` = kuni 64 tühikuta märki, `?` = üks märk). Vasted asendatakse väärtusega
  `[CUSTOM_REDACTED]`. Iga muster läbib funktsiooni `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): maksimaalselt 500 märki, lubatud
  lipud on ainult `g i m s u`, muster peab kompileeruma, läbima `safe-regex`
  kontrolli (katastroofiline tagasijälitus) ning ei tohi vastata tühjale stringile
  ega peitmise kohatäitele. Nõuetele mittevastava mustri salvestamisest ja
  testimisest keeldutakse ning nõuetele mittevastav salvestatud rida jäetakse
  käitusajal kompileerimise asemel vahele. Kohandatud mustreid kasutatakse ainult
  siis, kui maskeerimine on sisse lülitatud.
- **Tuvastusloendurid** — tüübipõhised arvud (mitte kunagi leitud väärtused),
  mida hoitakse mälus ja mis lähtestatakse taaskäivitamisel
  (`src/lib/pii/piiDetectionStats.ts`). Need suurenevad ainult siis, kui
  maskeerimine on sisse lülitatud.

Sätted asuvad tabelis `key_value` (nimeruum `pii_settings`,
`src/lib/db/piiSettings.ts`) ja neid loetakse 1 s vahemälu kaudu. API:

| Meetod | Tee                      | Otstarve                                                          |
| ------ | ------------------------ | ----------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Lippude olek, `enabledTypes`, `customPatterns`, tuvastusloendurid |
| `PUT`  | `/api/settings/pii`      | Asendab `enabledTypes` (`null` = kõik) ja/või `customPatterns`    |
| `POST` | `/api/settings/pii/test` | Ühe mustri proovikäitus kuni 8 KB näidisega; midagi ei salvestata |

Kõik kolm nõuavad halduse autentimist ja valideerivad keha Zodiga
(`src/shared/validation/schemas/piiSettings.ts`).

### Viibasisestus (`promptInjection.ts`)

Tuvastab kasutaja sisestatud sisus vaenulikud struktuurid ja jõustab
konfigureeritud poliitika. Käitumist juhivad keskkonnamuutujad ja konstruktori
suvandid:

| Seadistus       | Keskkonnamuutuja                                                                                      | Vaikeväärtus | Mõju                                                                                                                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lubatud         | `INPUT_SANITIZER_ENABLED`                                                                             | `true`       | Kui väärtus on `false`, lõpetab kaitsepiire töö kohe.                                                                                                                                                           |
| Režiim          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`       | Süstimiseeskiri: `block`, `warn` või `log`. (`redact` on tagasiühilduvuse huvides aktsepteeritud, kuid see **ei** eemalda süstimisteksti; päringu isikuandmete ümberkirjutamist juhib `PII_REDACTION_ENABLED`.) |
| Blokeerimislävi | `blockThreshold` suvand / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`       | Blokeerimiseks nõutav minimaalne raskusaste. Vaikimisi on keskmine raskusaste ainult jälgimiseks.                                                                                                               |

**Režiimi prioriteet** (`getMode`): kutsuja `options.mode` →
`INJECTION_GUARD_MODE` **andmebaasi funktsioonilipu alistus** (Dashboard → Settings →
Feature Flags) → keskkonna `INJECTION_GUARD_MODE` → keskkonna `INPUT_SANITIZER_MODE` →
`warn`. Seega on juhtpaneeli alistus keskkonnamuutujatest ülimuslik ja Feature
Flagsi kasutajaliides juhib töötavat kaitset reaalajas (taaskäivitamiseta). Andmebaasist lugemine on tõrkekindel:
tõrke korral naaseb kaitse keskkonnamuutujatel põhineva käitumise juurde ning kui
alistust pole määratud, on käitumine identne ainult keskkonnamuutujatel põhineva lahendusega.

Tuvastusallikad:

1. `sanitizeRequest()` moodulist `@/shared/utils/inputSanitizer` (mujal konveieris
   kasutatav ühine detektorite komplekt).
2. Sisseehitatud `DEFAULT_GUARD_PATTERNS` (praegu `system_override_inline` ja
   `markdown_system_block`, mõlemad raskusastmega `high`).
3. Valikulised `customPatterns`, mis edastatakse konstruktori suvandite kaudu (stringid, regulaaravaldised
   või `{ name, pattern, severity }` kirjed).

Kui `mode === "block"` **ja** vähemalt üks tuvastus vastab raskusastme
lävele, tagastab `preCall` väärtuse `{ block: true, message: "Request rejected:
suspicious content detected" }`. Režiimides `warn`/`log` logib kaitsepiire sündmuse, kuid
lubab kutse. Ühine abifunktsioon `evaluatePromptInjection()` on samuti eksporditud
kutsujatele, kes peavad viipasid hindama registrit läbimata.

**Skannimispiir (v3.8.20):** detektor kontrollib ainult ühendatud viibateksti **esimest 16 KB-d** —
`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 baiti) failis
`src/shared/utils/inputSanitizer.ts`. Nii `detectInjection()` kui ka
`evaluatePromptInjection()` rakendavad enne mustritsükli käivitamist funktsiooni
`slice(0, MAX_INJECTION_SCAN_BYTES)`. Süstimisjuhised paiknevad sisendi alguse lähedal, seega
piirab see regulaaravaldiste protsessori-/GC-kasutust sadade kilobaitide suuruste lastide puhul ilma tuvastust
nõrgendamata (vrd #3932, #4041).

### Mandaatide maskeerija (`credentialMasker.ts`)

Töötab **mõlemas** etapis, vaikimisi ahelas viimasena (prioriteet `95`). Redigeerib
väljaminevast lastist (sõnumi sisu, tööriistakutsete argumendid, tööriistade tulemused) **ja**
teenusepakkuja vastusest tuntud API-võtmete / salajaste lubade mustrid, et
viibale kleebitud mandaati (või tööriista tulemuses tagasi kajastatud mandaati) ei lekitataks
ülesvoolu teenusepakkujale ega tagasi kliendile.

- **Ainult eraldi lubamisel**, sama tava nagu isikuandmete redigeerimisel (range reegliga #20 külgnev):
  keelatud, välja arvatud juhul, kui `settings.credentialRedactionEnabled === true` **või**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kui see on välja lülitatud, ei tee kaitsepiire midagi —
  see ei blokeeri ega kirjuta kunagi ümber.
- `redactCredentials()` läbib kogu lasti/vastuse puu (`walkValue()`,
  prototüübi saastamise eest kaitstud, tsüklite eest kaitstud `WeakSet`-i kaudu) ning asendab vasted
  kohatäitjaga `[REDACTED:<type>]`, kloonides ainult need harud, mis tegelikult
  muutusid.
- `CREDENTIAL_PATTERNS` hõlmab LLM-i teenusepakkujate võtmeid (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS-i/SaaS-i lubasid (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), maksevõtmeid (Stripe, Square), pilveteenuste
  võtmeid (AWS-i pääsuvõti, Twilio, SendGrid, Mailgun), privaatvõtmeid / JWT-sid,
  mandaate sisaldavaid ühendusstringe (`mongodb://user:pass@...` jne) ning
  üldist `Authorization`/`x-api-key`/`api-key`/`apikey` päiseväärtuse
  mustrit. Päisekujulised võtmed (`authorization`, `x-api-key`, `api-key`,
  `apikey`) redigeeritakse struktuurselt (ainult väärtus; skeemi prefiks, näiteks
  `Bearer `/`Basic `, säilitatakse), mitte üldise tekstilise regulaaravaldise kaudu.
- Kaitsepiire ei blokeeri kunagi; see ainult kirjutab ümber (`modifiedPayload` /
  `modifiedResponse`) ja lisab metaandmed (`meta.credentialsRedacted`, `meta.count`).

Regressioonikaitse: `tests/unit/credential-masker-guardrail.test.ts`.

## Baasleping (`base.ts`)

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
  block?: boolean; // true katkestab ahela kohe
  message?: string; // kuvatakse blokeerimisel
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // tagastatakse preCall poolt päringu ümberkirjutamiseks
  modifiedResponse?: TValue; // tagastatakse postCall poolt vastuse ümberkirjutamiseks
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

Kaitsepiire annab „muudatus puudub” märku, tagastades kas `void`, `{}` või
`{ block: false }`. Väärtuse `modifiedPayload`/`modifiedResponse` tagastamine asendab
ahelas allavoolu kaitsepiiretele edastatava väärtuse.
`signal?: AbortSignal` edastab kutsuja elutsükli kaitsepiiretesse. Päringu katkestamine on tahtlik tõrke korral jätkamise erand: meediasillad peatavad töö ja puhastavad ressursid, taastamata töötlemata meediat sihtkohale, mis teadaolevalt seda ei toeta.

## Register (`registry.ts`)

Üksikeksemplar `guardrailRegistry` võimaldab järgmist:

- `register(guardrail)` — lisab kaitsepiirde (või asendab selle normaliseeritud nime alusel) ja
  sordib uuesti kasvava `priority` järgi.
- `clear()` / `list()` — haldusabimeetodid.
- `runPreCallHooks(payload, context)` — läbib aktiivsed kaitsepiirded, edastab
  lasti läbi `modifiedPayload` ja peatub esimese `block: true` korral.
- `runPostCallHooks(response, context)` — sama voog vastuse poolel.
- `resetGuardrailsForTests({ registerDefaults })` — tühjendab oleku ja soovi korral
  registreerib vaikeseaded uuesti, et tagada testide puhas isoleeritus.

Mõlemad käitajad tagastavad `{ blocked, payload|response, results, guardrail?, message? }`,
kus `results` on kirjete `GuardrailExecutionResult` massiiv, mis sisaldab
iga kaitsepiirde välju `blocked`, `skipped`, `modified`, `error` ja `meta`,
mis on kasulikud jälitamiseks.

### Kaitsepiirete keelamine päringupõhiselt

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` koondab
duplikaatideta loendi kaitsepiirete nimedest, mis tuleb praeguse
päringu puhul vahele jätta. Allikad (kõik valikulised, kõik ühendatakse):

- `apiKeyInfo.disabledGuardrails`
- Päringu keha `disabledGuardrails` (tipptasemel)
- Päringu keha `metadata.disabledGuardrails`
- Päis `x-omniroute-disabled-guardrails` (või pärandvormingus
  `x-disabled-guardrails`)

Väärtused võivad olla stringide massiivid või komadega eraldatud string; nimed
normaliseeritakse väiketähtedega kebab-kirjapilti (`pii_masker` → `pii-masker`). Tulemus
edastatakse registrile `context.disabledGuardrails` kaudu, mis jätab
sobivad kaitsepiirded vahele (`skipped: true` väljal `results`).

## Käivitusjärjekord

Iga päringu puhul, mis liigub läbi `src/sse/handlers/chat.ts` ja
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` koostab API võtme, päringu keha ja päiste
   põhjal vahelejäetavate kaitsepiirete loendi.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` käivitab kaitsepiirded prioriteedi
   kasvavas järjekorras:
   - Keelatud kaitsepiirded märgitakse olekuga `skipped`.
   - Iga kaitsepiirde `preCall` võib `modifiedPayload` kaudu andmekoormuse ümber kirjutada.
   - Esimene `block: true` katkestab ahela ja töötleja tagastab
     kaitsepiirde tagasilükkamisvastuse.
3. (Võimalikult ümber kirjutatud) andmekoormus liigub kombineeritud marsruutimise ja
   ülesvoolu saatmise etappi.
4. Pärast vastuse koostamist käivitab `guardrailRegistry.runPostCallHooks(...)`
   vastuse jaoks sama ahela. Siinne `block: true` kõrvaldab ülesvoolu
   vastuse.

Erindi visanud kaitsepiirded registreeritakse kujul `error: <message>` ja logitakse
`logger.warn` kaudu, kuid ahela täitmine jätkub — see on kavandatud tõrke korral lubama.

## Konfiguratsioon

Sisseehitatud kaitsepiirete loetavad keskkonnamuutujad:

| Muutuja                               | Kasutaja                 | Mõju                                                                                                    |
| ------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Tuvastamise täielikuks keelamiseks määrake väärtuseks `false`.                                          |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Süstimise poliitika: `warn`, `block` või `log`. Pärandväärtus `redact` ei kirjuta süstimisteksti ümber. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Süstimiskaitse režiim; ühtlasi DB funktsioonilipp, mis **alistab** keskkonnamuutujad (DB > ENV).        |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | Minimaalne raskusaste, mille `MODE=block` tagasi lükkab: `high` (vaikimisi), `medium` või `low`.        |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | Muutuja `INPUT_SANITIZER_BLOCK_THRESHOLD` pärandalias.                                                  |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | Kui väärtus on `true`, redigeeritakse päringu isikuandmed (süstimisrežiimist sõltumatult).              |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (allavoolu) | Juhib vastusepoolse maskeri käitumist.                                                                  |

Modality Bridge'i kaitsepiirded loevad käitusaegset konfiguratsiooni DB-põhisest
sätete hoidlast (`getSettings()`), mitte keskkonnamuutujatest. Visioni peamised võtmed on
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ja
`modalityBridgeCacheMaxEntries`. Pärandvõtmeid
`visionBridge*` aktsepteeritakse ainult dokumenteeritud ühe tsükli pikkuse lugemise
varuvariandina; juhtpaneel kirjutab peamistesse võtmetesse. Vaikeväärtused ja varuvariandi
lahendaja asuvad failis `src/shared/constants/modalityBridgeDefaults.ts`, pärand-
konstandid on säilitatud failis `src/shared/constants/visionBridgeDefaults.ts`.

Audio kasutab võtmeid `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` ja `modalityBridgeAudioMaxClips` ning lisaks jagatud
`modalityBridgeCache*` sätteid. Audiol puudub pärandvõtmete varuvariant, sest need
võtmed võeti kasutusele koos Modality Bridge'i skeemiga.

Video kasutab võtmeid `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` ja
`modalityBridgeVideoTimeout` ning lisaks jagatud `modalityBridgeCache*` sätteid.
See on vaikimisi keelatud, sest FFmpeg/ffprobe on valikulised käituskeskkonna
sõltuvused ning kaadrite kirjeldamine lisab viivitust ja mudeli kasutamise kulu.

## Kohandatud kaitsepiirded

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

1. Looge `src/lib/guardrails/myGuardrail.ts`, mis laiendab klassi `BaseGuardrail`.
2. Rakendage `preCall` ja/või `postCall`.
3. Registreerige kas importimise ajal (lisage funktsioonist `registerDefaultGuardrails`) või
   kutsuge käitusajal välja `guardrailRegistry.register(...)` — register asendab
   kõik varasemad sama normaliseeritud nimega kaitsepiirded.
4. Lisage testid kataloogi `tests/unit/` (olemasolevad näited:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testimine

Kasutage testide vahel funktsiooni `resetGuardrailsForTests()`, et alustada teadaolevast olekust.
Tühja registriga alustamiseks edastage `{ registerDefaults: false }` ja
registreerige ainult testitavad kaitsepiirded. Vision Bridge toetab sõltuvuste
sisestamist (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge pakub
samaväärseid liideseid seadete, võimekuste, STT-mudeli valimise, mandaatide
kontrollimise ja transkribeerimise jaoks. Seega saavad testid kontrollida mõlemat
voogu ilma andmebaasi- või võrgujuurdepääsuta.

## Vaadake ka

- `src/lib/guardrails/` — teostus
- `src/shared/utils/inputSanitizer.ts` — ühine tuvastaja, millel põhinevad
  promptisüsti tuvastamine ja isikuandmete maskeerimine
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge'i vaikeväärtused ja
  sunnitud sillaga mudelite loend
- `src/shared/constants/modalityBridgeDefaults.ts` — Visioni/Audio ühised käitusaja vaikeväärtused
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonaalne kiht (kaitselüliti, ooteajad)
- `docs/reference/ENVIRONMENT.md` — keskkonnamuutujate täielik teatmik

## Süstikaitse marsruutide katvus ja red-team-testimine (8. etapp · plokk D)

Süstikaitse (`createInjectionGuard` / `withInjectionGuard`) hõlmab kõiki marsruute,
mis võtavad vastu kasutaja prompte. See järgib muutujat `INJECTION_GUARD_MODE` (vaikimisi `warn` = ainult logimine;
`block` = tagastab HTTP 400 `SECURITY_001`).

| Tüüp               | Marsruudid                                                                                                                                           | Vaikerežiim |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Tekst (olemasolev) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn        |
| Genereeriv         | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn        |
| Andmed             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn        |

Teksti eraldamine (`extractMessageContents`) hõlmab välju `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team-testimine (igal ööl, `nightly-llm-security.yml`):** promptfoo kontrollib, et iga marsruut blokeeriks
OWASP-LLM-i korpuse režiimis `INJECTION_GUARD_MODE=block`; garak käitab sonde (jäetakse saladuse puudumisel vahele).
`moderations` on järjepidevuse huvides kaasatud — plokirežiimi operaatorid saavad selle funktsiooni
`resolveDisabledGuardrails` kaudu erandiks määrata.

Igaöisel töövoolel (`.github/workflows/nightly-llm-security.yml`, cron + käsitsi
käivitamine) on kaks tööd:

- **`promptfoo-guard` (blokeeriv)** — käitab käsku `promptfoo eval -c promptfooconfig.yaml`
  režiimiga `INJECTION_GUARD_MODE=block`. Iga ründejuhtum (nt „ignoreeri kõiki
  varasemaid juhiseid…“, DAN-stiilis turvapiirangutest möödahiilimised) kontrollib, et vastus sisaldaks
  `error.code === "SECURITY_001"`, st et kaitse lükkas päringu tegelikult tagasi.
- **`garak` (nõuandev)** — käitab garakit võtmega `--probes promptinject,dan,leakreplay`
  kohaliku OmniRoute'i eksemplari (`http://localhost:20128/v1`) suhtes. Käivitamine sõltub
  teenusepakkuja saladusest (`PROMPTFOO_PROVIDER_KEY`); selle puudumisel jäetakse töö korrektselt vahele ja sellele on lisatud
  `|| true`, mistõttu esitatakse aruanne ilma CI-d nurjamata.

Kaitse abifunktsiooni (`createInjectionGuard` / `withInjectionGuard`)
katvus hõlmab kõiki prompte kandvaid `/v1` marsruute; prompti tekst võetakse väljadest
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` funktsiooniga
`extractMessageContents()` failis `src/shared/utils/inputSanitizer.ts`.
