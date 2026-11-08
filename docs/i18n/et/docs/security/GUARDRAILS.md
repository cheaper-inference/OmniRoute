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

## Sisseehitatud kaitsepiirded

Register laadib importimisel automaatselt kuus kaitsepiiret prioriteetses järjekorras (vt `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteet | Nimi                | Etapp(id)      | Fail                  |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Madalama prioriteediga numbrid jooksevad** esiteks** .

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 põhimudelil ja `glm-5.3-{low,high,max}` on selgesõnalised `supportsVision:false` registry/spec metaandmed. GLM 5.3 Flashi variandid jäävad natiivse nägemisega mudeliteks. Claude Code'i `/v1/messages` marsruut siseneb jagatud `handleChat` eelkõnede kaitsepiirde ketti** enne** Claude-to-OpenAI tõlge; pesastatud `Read` tööriista tulemuse kujutisi tuleb kirjeldada või käsitleda enne, kui tõlge need OpenAI `image_url` sisuks tõstab (#17069).

Peatab pilti kandvad taotlused, mille eesmärk on** mittenägemise mudelid** ja suunab kogu päringu ümber nägemisvõimelisele mudelile või asendab pildiosad tekstikirjeldustega, mis on loodud konfigureeritava nägemismudeli poolt enne ülesvoolu kutsumist. See võimaldab ainult tekstiteenuse pakkujatel multimodaalseid koormusi läbipaistvalt käsitleda.

Voog:

1. Jätke vahele, kui sihtmudel juba toetab nägemist (välja arvatud juhul, kui see on sundsildade loendis `isVisionBridgeForcedModel`).
2. Ekstraktige pildiosad `extractImageParts(messages)` (`visionBridgeHelpers.ts`) kaudu, mis delegeerib** ühtne meediadetektor** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — on ainus tõeallikas, mida jagatakse kombineeritud ühilduvusfiltriga. Ekstraheerimine on loetletud kujundites, mida `replaceImageParts` saab tagasi liita (väljavõte ↔ asendab lepingu): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` ja Vastused API `input_image`. Sobivad kujutised, mis on pesastatud Claude Code `tool_result.content` ja Responses tööriista väljunditesse, ekstraheeritakse ja asendatakse nende algsete radadega; ainult indikaatoriga kujundid on kombineeritud filtriga materjalid ja neid ei ekstraheerita. Jätke vahele, kui ühtegi ei leitud.
3. Lahendage käitusaja konfiguratsioon `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) kaudu: uued `modalityBridge*` seadete võtmed võidavad; pärand `visionBridge*` võtmed jäävad a** ühe tsükli varu** (tagasipööramise aken). Kui sild on keelatud, jätke vahele enne meedia läbimist.
4. Režiimi valija (`modalityBridgeVisionMode`, vt allolevat tabelit) otsustab marsruudi ümbersuunamise või kirjeldamise. Reroute tagastab `modifiedPayload` kus on vahetatud ainult `model`, pluss meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Kirjeldage teed: piirake kujutisi aadressil `maxImages`, koostage ülesandeteadlik viip, vaadake kirjelduse vahemälu, helistage nägemismudelile** paralleelselt** (`Promise.allSettled`) ja sisestage nende asemele `[Image N]: <description>` tekstiosad. Ebaõnnestunud kirjeldus annab tulemuseks `null`: toorpilt säilitatakse unknown/vision-capable sihtmärkide jaoks (#4012), kuid** kinnitatud ainult tekstiga otsesihtmärk** või zero-vision combo saab selgesõnalise `(unavailable — no vision-capable provider connected)` -teksti iga kirjeldamata pildi jaoks, sealhulgas osaliste tõrgete ja piltide jaoks, mis ületavad kirjelduse-kutsumise piiri (#17069). Olemasolev kõik ebaõnnestunud kombinatsioon, mis kirjeldab varuvarianti, jääb paika (#8430).
6. Tagasta `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Režiimi valija (`modalityBridgeVisionMode`)

| Režiim     | Vaikimisi | Käitumine                                                                                                                                                                                                                                                                                       |
| ---------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔         | Pärandheuristiline, puutumata (#6640/#7204): mittekombineeritud/`auto/` mudelid suunavad ümber parimale nägemismudelile, välja arvatud juhul, kui algsel mudelil on juba kasutatavad mandaadid (seejärel kirjeldage); kombineeritud sihtmärgid kirjeldavad alati.                               |
| `describe` |           | Kirjeldage alati — et ümbermarsruudi plokk jäetakse täielikult vahele; kasutaja valitud mudel vastab alati.                                                                                                                                                                                     |
| `reroute`  |           | Sunniviisiline marsruudi muutmine: mandaadi säilitamise mudeli valvur on möödas. Ümbermarsruut-** sihtmärk** Mandaadivalvur rakendab endiselt — kui kasutatavat nägemise sihtmärki pole, sild blokeerib selge veaga, mitte ei kirjelda või saadab töötlemata pilte ainult tekstiga sihtmärgile. |

Sundrežiimide lühis** enne** automaatne heuristiline töö; `auto` käitumine on baitidena pre-PR-1 kaitsepiirdega.

#### API-võtme ulatus (`visionBridgeKeyScope.ts`)

Kui helistaja API klahv piirab `allowedConnections`, kvoodikogumeid (`allowedQuotas`) või mudeleid (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), valib sild ainult ümbermarsruudi ja kirjeldab mudeleid, mida võti võib kasutada, ühenduste puhul, mida võti võib kasutada. Kirjeldav kõne läbib seejärel alati OmniRoute eneseahela `x-omniroute-self-loop-key-id` päisega, nii et vastuvõttev vestlustaotlus jõustab uuesti selle võtme ühenduse ja mudeli poliitika. `enforceApiKeyPolicy()` austab seda päist ainult koos eneseahela kandjaga, nii et see saab juurdepääsu ainult kitsendada ja ID, mis ei lahene, lükatakse tagasi.

Kui võtme jaoks pole nägemismudelit lubatud, a** kinnitatud ainult teksti sihtmärk** lükkab pildipäringu lokaalselt tagasi selge HTTP 400-ga, selle asemel, et edastada pildibaidid võimetusse ülesvoolu (#17069). Tundmatu või loomuliku nägemisvõimega sihtmärkide puhul säilitab kirjeldatav tee oma varasema tõrkeavamiskäitumise (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Päringud ilma võtmeta ja võtmed ilma nende piiranguteta käituvad täpselt nagu varem.

#### Ülesanneteadlik kirjeldamisviip (`modalityBridgeVisionTaskAware`)

Vaikimisi** tõsi** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) lisab teksti** viimane kasutaja sõnum** (kärbitud 500 tähemärgini) kirjeldusviiba alusele, suunates kirjelduse selle poole, mida kasutaja tegelikult küsis (koodeks-nägemise-puhverserveri muster) ja paludes nägemismudelil nähtavat teksti transkribeerida. Kui lipp on välja lülitatud — või kasutajateksti — puudub, kasutatakse põhiviipa muutmata kujul.

Kirjeldava eneseahela enda OpenAI-ga ühilduv päring (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) taotleb alati tingimusteta `image_url.detail: "high"` — iga caller/provider kohta, mis ei ole seotud ühegi kliendi signaaliga. Madala detailiga diskreetimine halvendab OCR täpsust täpselt selle teksti transkriptsiooniülesande jaoks, mida see viip küsib, nii et kirjelduskutse ise nõuab alati suurt üksikasja, olenemata sellest, millist detailsuse taset algne sissetulev päring kasutas. See mõjutab ainult sisemise kirjelduse päringu keha; see ei muuda seda, kuidas OmniRoute edastab helistaja enda `image_url.detail` esmasel päringul — mida vaikimisi rakendatakse eraldi ja ainult tuvastatud OpenCode klientidele `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Kirjeldava eneseahela Anthropic traatvormingus harul puudub `detail` väli ja kumbki vaikimisi seda ei mõjuta.

#### Kirjeldage väljundkorki (`modalityBridgeVisionMaxChars`)

| Võti                           | Vaikimisi | Vahemik            |
| ------------------------------ | --------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`       | `0` või 100–50 000 |

`0` (vaikimisi) tähendab** korki pole** — `callVisionModel()` tagastatud kirjeldus edastatakse muutmata kujul, säilitades olemasoleva käitumise. Iga väärtus vahemikus 100–50 000 kärbib kirjelduse `…` järelliitega, enne kui see liidetakse tagasi kui `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`). Suurendage seda detailirohkete OCR ülesannete jaoks, kus allavoolumudel vajab täielikku transkriptsiooni; alandage seda vestluslike nägemismudelite puhul piiratud märgikasutusele. Armatuurlaua väli asub vahekaardi Vision paneelil Advanced (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) ja fikseerib mis tahes väärtuse vahemikus 1 kuni 99 kuni 100 korruseni, jättes samal ajal selgesõnalise `0` puutumata. — `0` on kehtiv Zod väärtus omaette (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), mitte ainult vaikeväärtus "unset".

#### Vahemälu kirjeldamine (`modalityBridge/bridgeCache.ts`)

Mälusisene LRU + TTL vahemälu väljundite kirjeldamiseks, jagatud kogu protsessi ulatuses. Klahv = `sha256(imageRef + composedPrompt + configuredBridgeModel)` pikkus-eesliide raamiga (väljapiiride kokkupõrkeid pole). Mudeli komponent on** konfigureeritud** sillamudel, mitte mudel, mis tegelikult vastas — `callVisionModel` võib sisemiselt tagasi langeda ja katse kohta sisestamine killustaks vahemälu. Ebaõnnestunud kirjeldusi ei salvestata kunagi vahemällu. Seaded:

| Võti                            | Vaikimisi | Vahemik |
| ------------------------------- | --------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`    | —       |
| `modalityBridgeCacheTtlMinutes` | `60`      | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`     | 10–5000 |

#### Pildi kaugnormaliseerimine (isesilmus describe/base64 toomine)

Kui sild tõmbab a** kaugjuhtimispult** pilt ise — Anthropic kirjeldab isekutsumist ja claude-wire-formaadis base64 teisendust (`ensureBase64ImagesForClaudeWire`), mõlemad `fetchRemoteImageAsDataUri()` kaudu `visionBridgeHelpers.ts` — edastatakse saadud andmed URI läbi `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`), enne kui need manustatakse nägemismudeli päringusse. Liiga suured pildid vähendatakse väärtuseni a** 2048 pikslit pikk serv** (vastab suuruse muutmise piirile OpenAI/Anthropic rakendab juba serveripoolt), mis kärbib bytes/latency üleslaadimist, muutmata seda, mida nägemismudel näeb. Suuruse muutmine kasutab `sharp`, laaditakse dünaamilise impordi kaudu: platvormil, kus algse binaarfaili laadimine ebaõnnestub, `normalizeDataUri()`** ei viska kunagi** — see langeb tagasi algsete baitide läbipääsuks, nii et describe/base64-conversion tee töötab alati. Ka mittepildibaidid (toomine, mis ei tagastanud dekodeeritavat pilti) lastakse läbi puutumatult. See normaliseerimine hõlmab kujutisi, mille sild tõmbab oma isekõne jaoks — mida ei rakendata kunagi helistaja töötlemata läbipääsu kasulikule koormusele, mis on kooskõlas ainult lubamise mutatsiooni põhimõttega (kõva reegel nr 20).

#### Seadistuste skeem + migratsioon

Uued `modalityBridge*` klahvid on Zod-valideeritud `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trio ja `modalityBridgeAudio*` rühm, mida kasutab Audio Bridge. Migreerimine `141_modality_bridge_settings.sql` kopeerib olemasolevad `visionBridge*` pärandväärtused vastavatesse uutesse võtmetesse (idempotentne, ei kirjuta kunagi üle operaatori määratud `modalityBridge*` väärtust); pärandvõtmed jäävad lugemiseks ühe väljalasketsükli jooksul aktsepteerituks.

#### Läbipaistvuse päise + statistika

Kirjelda-transformeeritud vastused sisaldavad `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (ehitatud `buildModalityBridgeHeader()` -ga `modalityBridge/bridgeStats.ts`, tembeldatud `withModalityBridgeHeader()` -ga `src/sse/handlers/chatHelpers.ts`). Ümbersuunatud taotlused saavad** ei** header — kasulik koormus jäi puutumata ja mudeli vahetus on juba nähtav vastuse keha `model` väljal.

`GET /api/modality-bridge/stats` (halduse autentimine, sama tasand kui `GET /api/settings`) tagastab `vision`, `audio` ja `video` mälusisesed modaalsusloendurid `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }`. `averageLatencyMs` kasutab nimetajana `latencySamples`, mitte kõiki katseid; ilma ajastuseta toiming ei valmista null-millisekundilist näidist. `bridged` jääb edukate teisenduste tagasiühilduvaks aliaseks; ebaõnnestunud katsed seda ei suurenda. Loendurid lähtestatakse protsessi taaskäivitamisel disaini järgi (telemeetria, mitte arvestus).

#### Armatuurlaua konfiguratsioon

The dedicated dashboard page is `/dashboard/settings/modality-bridge`. Its URL-addressable `Vision`, `Audio`, and `Video` tabs preserve query parameters while switching the `tab` value. The Vision tab exposes enablement, mode, model selection (including the automatic default), task-aware prompting, advanced timeout/image/description-length/cache limits, runtime counters, and a guarded sample request. The Audio tab is also live: it exposes enablement, an STT-only model picker with Auto, timeout/max-clip limits, audio counters, and an `input_audio` sample test. The Video tab is functional: it reports the FFmpeg/ffprobe runtime state — one of four explicit UI states (`unknown` while the probe is in flight or could not complete, `restricted` on a non-loopback dashboard host where the probe is skipped client-side, `unavailable` once probed and confirmed missing, or `available` with the FFmpeg/ffprobe versions) — persists enable/model/frame/video/timeout limits, filters the model picker to vision-capable models, and exposes video counters.

Endine Vision Bridge'i kaart AI sätete all on ühilduvuslink uuele lehele; ta ei oma enam vormi teist eksemplari. Meediapakkujad lingivad ka pildist tekstiks ja kõne tekstiks töövood vastavate modaalsussilla vahekaartidega, eemaldamata olemasolevat kõne tekstiks mänguväljakut.

**Iseahela sissepääsu ümbersõit:** kui kirjeldab kõne marsruute läbi OmniRoute enda `/v1` eneseahela (mittestandardne teenusepakkuja mudel), saadab alampäring `x-omniroute-admission-bypass: internal` ja autentitakse lahendatud eneseahela mandaadiga — kohalik `sk_omniroute` sentinel kohalikus režiimis või operaatori konfigureeritud `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env võti võib siiski kirjeldada (# `REQUIRE_API_KEY=true` ) helistada. Möödasõitu arvestatakse ainult nende täpsete mandaatide puhul, nii et välised kliendid ei saa päist sissepääsu vahelejätmiseks kasutada. (#1350)

Pärandvaikeväärtused elavad `src/shared/constants/visionBridgeDefaults.ts` keeles ; uued mode/task-aware/cache vaikesätted ja seadete lahendaja töötavad `src/shared/constants/modalityBridgeDefaults.ts`. Kaitsepiire paljastab `deps` konstruktori valiku, nii et testid võivad sisestada võltsitud `getSettings` ja `callVisionModel` -rakendusi.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Peatab heli kandvad vestlustaotlused, enne kui need jõuavad sihtmärgini, mis teadaolevalt ei aktsepteeri helisisendit. See ei suuna vestlustaotlust kunagi ümber: heliosad transkribeeritakse olemasoleva OpenAI-ga ühilduva mitmeosalise lõpp-punkti kaudu ja valitud vestlusmudel jätkub teksti transkriptsioonidega.

Voog:

1. Lahendage `supportsAudio` `getResolvedModelCapabilities()` kaudu. Võidab selgesõnalised pakkuja-registri metaandmed, seejärel staatilise mudeli metaandmed ja seejärel sünkroonitud `modalities_input`. Deklareeritud sisendloend ilma `audio` on `false`; `null` ei jää võimekuse tõenditeks. Nii `false` kui ka `null` aktiveerivad konservatiivse silla, samas kui `true` möödub sellest.
2. Lahendage `modalityBridgeAudio*` sätted ja eraldage jagatud `detectMediaParts()` detektori kaudu igast sõnumist ühendatavad tipptasemel heliosad. Toetatud traadikujud on OpenAI `input_audio`, `audio_url` ja `source.media_type: "audio/*"`. Pesastatud heli tuvastatakse marsruutimisel, kuid seda ei eemaldata splaissimise teel. Tööd piirab `modalityBridgeAudioMaxClips`; hilisemad osad jäävad puutumata.
3. Austage konfigureeritud `provider/model` või laske `selectAudioBridgeModel()` kõndida `AUDIO_TRANSCRIPTION_PROVIDERS` stabiilses kataloogijärjekorras ja valige esimene mudel, millel on kasutatavad aktiivsed pakkuja mandaadid.
4. `callAudioTranscription()` teisendab base64/data-URI heli mitmeosaliseks `file` või laadib DNS kinnitusega ja 25 MB seotusega avaliku väljamineva valve kaudu alla kaug- `audio_url`. Seejärel POSTs fail ja valitud mudel kohalikku `/v1/audio/transcriptions` iseloopi, mille autentimine on `resolveSelfLoopBearer()`. Olemasolev transkriptsioonimarsruut teostab tavapärast mandaadiotsingut, cooldown/rate-limit käsitlust ja pakkujate väljasaatmist.
5. Edukad kõned asendavad nende osad `[Audio N]: <transcript>`. Kõned käitatakse `Promise.allSettled` ga: individuaalne rike säilitab selle algse heliosa (lepingu nr #4012). Kui iga kõne nurjub ja sihtmärk on tõestatud `supportsAudio === false`, muutuvad osad `[Audio N]: (unavailable — no STT provider connected)` (#8430 leping). Tundmatu sihtmärgi (`null`) korral jääb kogu ebaõnnestumise tulemus puutumata. Tõestatud tekstipõhine sihtmärk, millel pole kasutatavat STT mandaadi, saab sama selgesõnalise tünga ilma võrgukõnet tegemata.

Edukad ärakirjad kasutavad kogu protsessi hõlmavat Modality Bridge LRU/TTL vahemälu. Klahv ühendab heliviite, stabiilse `audio-transcription` -toimingu sildi ja valitud STT -mudeli; tõrkeid ei salvestata kunagi vahemällu. Helikatsed värskendavad jagatud `bridged`, `cacheHits`, `failures` ja `lastUsedAt` loendureid. Teisendatud vastused kannavad `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; puutumata päringud ei saa Audio Bridge'i segmenti.

Käitusaja sätted on DB-ga tagatud ja Zod-valideeritud:

| Võti                          | Vaikimisi | Vahemik         |
| ----------------------------- | --------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`    | —               |
| `modalityBridgeAudioModel`    | `""`      | Auto või STT ID |
| `modalityBridgeAudioTimeout`  | `60000`   | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`       | 1–10            |

Jagatud vahemälu jäävad `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ja `modalityBridgeCacheMaxEntries` kontrolli alla.

### Videosild (`videoBridge.ts`, `videoBridgePipeline.ts`)

Peatab vestluse lõpuleviimise `messages` ja vastused API `input` tipptasemel videoosad, enne kui kutsutakse sihtmärki, millel puudub teadaoleva videotugi. Toetatud kujundid on `input_video`, `video_url`, `video_source`, HTTPS URLs ja `data:video/*;base64,...` URIs. Tekstis olevaid lihtsaid failinimesid ei käsitleta videona.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) owns request traversal, the capability/policy check, per-request aggregation, and the response payload. Per-video work — acquisition, the whole-result cache, describing a frame sequence (which fuses any caller-declared audio transcript), and per-attempt metrics/abort/cleanup — is hidden behind `processVideoPart` in `videoBridgePipeline.ts`, called once per video part inside `preCall`'s loop. That module also defines the explicit port boundaries `VideoMediaBrokerPort` (acquiring bytes and extracting sampled frames), `VideoAudioTranscriptionPort` (fusing a caller-declared audio transcript with the sampled captions), and `VideoDrilldownPort` (the frame drill-down persistence boundary; not yet wired into `processVideoPart` — only the separate `/api/modality-bridge/video/drilldown` route writes drill-down entries today).

Avalik `/v1` päringu tee ei impordi ega kutsu kunagi alamprotsessi. Kaugvideod laaditakse alla 50 MiB piiranguga; tekstisisesetel base64 videotel on konservatiivne 36 MiB dekodeeritud video kohta, nii et model/messages/framing ümbrik võib jääda avaliku JSON taotluse 50 MiB piirangu piiridesse. Reasisese pikkuse ja dekodeeritud suuruse hinnanguid kontrollitakse enne eraldamist. HTTPS on nõutav esialgsel kaugjuhtimispuldil URL ja igal ümbersuunamisel, kasutades olemasolevat ainult avalikku väljamineku kaitset koos DNS kinnitamisega. Seejärel ületavad baidid täpse sisemise `POST /api/modality-bridge/video/extract` maakleri piiri. See marsruut on nii `LOCAL_ONLY` kui ka `SPAWN_CAPABLE`, aktsepteerib ainult protsessipõhiseid autentitud usaldusväärse tagasisilmuse taotlusi ega aktsepteeri kunagi URL, failisüsteemi teed, täitmisfaili ega argumentide loendit. API korpuse suurusega torujuhe ja käitleja inkrementaalne korpuse lugeja jõustavad sõltumatult 50 MiB maakleri sisendi piiri. Selle piiratud järjekord käivitab ühe ekstraktsiooni korraga, võimaldab nelja ootel tööd ja piirab ootel sisendit kiirusel 100 MiB.

Maakleri sees loeb `ffprobe` privaatset kohalikku faili; fikseeritud vormingu lubade loend välistab esitusloendi ja manifesti vormingud. Lubatud MOV-perekonna konteinerite puhul jäävad välised MOV -andmete viited vaikimisi keelatuks ja fikseeritud käsk ei luba neid kasutada. Nii `ffprobe` kui ka `ffmpeg` kasutavad `file` -only protokolli valget nimekirja, ühte lõime, fikseeritud argumentide massiive, kesta pole ja `PATH`-st lahendatud käivitatavaid faile. Manustatud piltide kaanevood ei ole esitatavad kandidaadid. Kõik esitatavad vood peavad vastama piirangutele ja enne deterministlikku madalaima indeksiga tagavaraks on eelistatud selgesõnaline vaikevoog. Videod on piiratud 600 sekundiga, 8192 pikslit mõõtme kohta ja 33 554 432 lähtepikslit. FFmpeg proovib 1–16 keskpunkti JPEG kaadrit, skaleerib pika serva alla maksimaalselt 1024 pikslini ilma väiksemaid sisendeid suurendamata ja ei saa kunagi URL. Sampling on vaikimisi `uniform`. Valikulised `scene_aware` ja eksperimentaalsed `segment_aware` -poliitikad sooritavad ühe täiendava fikseeritud FFmpeg käigu üle juba kinnitatud kohaliku voo, valivad piiratud `showinfo` -stseeni ajatemplid ja taanduvad deterministlikult samadele ühtsetele keskpunktidele detektori rikke, ajalõpu, vigase väljundi või tühja kandidaatide komplekti korral. Segmenditeadlik režiim eraldab keskpunkti näidised proportsionaalselt kinnitatud stseeni intervallidega; segmenditeadlikud tõendid ja varukäitumine on üksikasjalikult kirjeldatud allpool. Kõva 16-kaadri piirik rakendatakse pärast valimist igas poliitikas. Kui stseenipõhisel päringul on ainult ühe kaadri eelarve, kasutab see aktiivse täisvideo- või fookusakna ühtset keskpunkti ja teatab `policyEffective: uniform`: üks valitud stseenikaader ei suuda säilitada mõlemat ajalist otsa. Helistaja võib valikuliselt pakkuda piiratud fookusakna (`start`/`end` sekundit); piirid seatakse kandja kestusele, vastupidised või mittelõplikud aknad lükatakse tagasi ja kõik diskreetimispoliitikad viiakse läbi ainult normaliseeritud intervalli sees. Saadud aken sisaldub valimi metaandmetes ja ebausaldusväärse kirjelduse eesliites, nii et allavoolu mudelid suudavad eristada keskendunud väljavõtet kogu ajajoonest.

Semantilise pealdise fookus on eraldiseisev, selgesõnaline seade. Vaikimisi `full` analüüsirežiim säilitab olemasoleva kaadriviipa ega edasta kunagi päringu teksti tiitrite mudelile. `focused` režiimis loeb sild ainult uusimat mittetühja kasutaja poolt loodud `text`/`input_text` samast vestluse või vastuste konteinerist, normaliseerib selle väärtuseks NFC, ahendab juhtmärgid ja tühikuid ning piirab selle 500 Unicode'i koodipunktiga. Tühi tulemus langeb tagasi täpselt `full` viipale. Kasutatav vihje jadatakse JSON -ks spetsiaalses ebausaldusväärse kasutaja konteksti plokis ja see võib seada esikohale ainult jälgitavad üksikasjad; see ei saa tühistada eraldi hoiatust meedias nähtavate või kuuldavate juhiste järgimise eest. Tekstiline fookus ei järelda kunagi `start`/`end` ega muuda ajalist proovivõtturit.

#### FU-07 struktuurse segmendi tõendid

`segment_aware` kasutab ühte piiratud eelanalüüsi läbimist juba kinnitatud kohaliku videovoo üle. Fikseeritud filtriahel ulatub esmalt maksimaalselt 320 piksli laiuseni, tuvastab stseeni muutused ja külmutatud intervallid, seejärel proovib 1 kaader sekundis hägususe, keskmise valgustugevuse ja spatial/temporal teabe jaoks. Pääs on piiratud 600 struktuurinäidise, ühe FFmpeg/filter lõime, sama `file` -only protokolli ja konteineri lubamisloenditega, 1 MiB protsessiväljundiga ja maksimaalselt 30 sekundiga maakleri jagatud abort/deadline. See ei võta kunagi päringust vastu käsku, filtrit, teed ega URL d.

Struktuuriväärtused on deterministlikud näidistõendid, mitte semantiline videomõistmine. Need ei järelda teemasid, tegevusi, pealdisi, kõnet ega kasutaja kavatsusi. Stseeni ja külmutamise piirid moodustavad segmente; katvuse külmutamine, hägusus, säritus, ruumilised üksikasjad ja ajaline muutus mõjutavad ainult seda, kuidas olemasolevat 1–16 kaadri eelarvet jaotatakse. Täielikult külmutatud segment on piiratud ühe kaadriga, samal ajal kui külmutamata segmendid võistlevad ülejäänud eelarve pärast. Kui piire ületab kaadreid, säilib ühtne ajaskaala katvus, nii et kiired varased kärped ei suuda varjata pikka lõpuosa. Stseeni piirid külmutuspiiri 1-sekundilise analüüsi eraldusvõime piires liidetakse.

Puuduvad filtrid, malformed/empty tõendid, detektori viga või piiratud eelanalüüsi ajalõpp ei vasta täpselt ühtsele keskpunktipoliitikale. Helistaja katkestamise või vahendaja tähtaja avamine ei õnnestu: see lõpetab lennu ajal toimuva alamprotsessi, takistab hilisemat kaadri väljavõtmist ja privaatne ajutine puu eemaldatakse `finally` st.

`scripts/perf/video-bridge-fu07-eval.ts` genereerib deterministlikke reaalseid FFmpeg seadmeid, et säästa pärast subtiitrite helistamist, tiheda liikumise eelarvejaotust, blur/exposure/SI-TI tõendeid, kiireid pika sabaga kärpeid ja järk-järgult hääbuvaid valepositiivseid tulemusi. See salvestab eelanalüüsi seina aja ja kui `/usr/bin/time` on saadaval, siis alam- CPU ja tipp- RSS. Selle kvaliteedikontrollid on ainult struktuurilised oraaklid. Tiitrite mudeli tegelik kvaliteet jääb `HOLD`, kuna sellel rakmel pole volitatud lõpp-punkti ega külmunud kohtunikku. Rahaline kokkuhoid jääb samuti `HOLD` välja arvatud juhul, kui `--caption-cost-per-call-usd` esitab selgesõnalist positiivset hinnangut kõne kohta; stsenaarium ei valmista kunagi kumbagi tulemust.

Iga kaader on piiratud 4 MiB, kõik töötlemata kaadrid kokku kuni 23 MiB ja järjestatud vahendaja vastus on 32 MiB. Privaatne ajutine kataloog eemaldatakse `finally`. OmniRoute ei komplekteeri FFmpeg ega aktsepteeri kohandatud käivitatavat teed. Enne pealdiste lisamist rakendab sild konservatiivset visuaalset dubleerimise pääsu: iga JPEG vähendatakse 16 × 16 halltoonides puhvriks ja seda võrreldakse ainult viimase säilitatud kaadriga. Kui taotletud subtiitrite eelarve on suurem kui üks kaader, pakub väljavõte piiratud kandidaatide kogumit, mille eelarve on kuni kaks korda suurem ja mitte kunagi rohkem kui 16 kaadrit. Taotletud ülempiir rakendatakse alles pärast dubleerimise eemaldamist, kusjuures esimesed ja viimased valitud kandidaadid säilivad lõpliku harvendamise ajal, kui eelarve on vähemalt kaks. Versioonitud `grayscale-16x16-mean-cells-v2` poliitika kasutab suuremat, kui keskmine luma delta ja pisipildirakkude suhe, mille normaliseeritud delta on vähemalt 0,05. Duplikaatlävi on konstant 0,04, mis on valitud pigem prognoositavuse huvides, mitte käitusaja seadistusena. See sekundaarne suure kontrastsusega signaal säilitab väikese liikumise ja nähtava teksti muutused, mida ainult keskmine võrdlus võib varjata. Võrdleja või dekoodri tõrked ei avane ja säilitavad levi. Väljundmetaandmed eraldavad eraldatud kandidaadid, edukalt kasutatud kaadrid ja visuaalsed duplikaadid eemaldatakse.

Selgelt märgitud videoosa võib nõuda ajatempliga kontaktilehte. Sild ehitab maksimaalselt 4-sambalise 16-raamilise JPEG võrgu. Iga 512-piksline lahter põletab oma lähteajatempli suure kontrastsusega alumisse riba, samas kui samad ajatemplid jäävad teksti metaandmetesse allavoolu seostamiseks ja auditeerimiseks. Täielik JPEG jääb 32 MiB piiriks. Kui `sharp` ei suuda dekodeerida ega koostada ruudustikku, langeb sild tagasi üksikute JPEG kaadrite juurde; kliendi katkestamine levib endiselt lehetoimingu kaudu.

Edendamise tõendid on teadlikult sünteetilise koostise mikromõõdust eraldatud. `scripts/perf/video-bridge-contact-sheet-eval.ts` määratleb skeemiversiooniga A/B rakmed tõeliste OpenAI-ga ühilduvate nägemismudelite jaoks. See mõõdab pakkuja teatatud märke, seina latentsust (sealhulgas lehe koostist), mudelikõnede arvu ja manifesti määratletud faktide säilitamist. Toormudeli vastuseid aruandesse ei kirjutata; säilitatakse ainult SHA-256 kokkuvõtted ja sobitatud fakti IDs. Rakmed ei tee võrgu- ega tasulise mudeli kõnet, välja arvatud juhul, kui `--execute-real` on läbitud ja `--model`, `OMNIROUTE_BASE_URL` ja `OMNIROUTE_API_KEY` on konfigureeritud. Ilma selle selgesõnalise tegeliku käivitamiseta jääb selle masinloetav otsus `HOLD`; Sünteetilised payload/call-count mõõtmised üksi ei ole edendamise tõendid.

Helistajad võivad toetatud videoosale lisada valikulise `transcript.cues` massiivi, kui neil on juba joondatud tekst. Iga näpunäide peab sisaldama `text`, lõplikku `start`/`end` intervalli uuritava kestuse sees ja valgesse nimekirja kantud `source` (`client`, `embedded` või `audio-bridge`); `confidence` vaikeväärtus on `1` ja see peab jääma `0` ja `1` vahele. Täpsed korduvad vihjed on ahendatud. OmniRoute ei alusta kunagi nendest metaandmetest transkriptsiooni: kinnitatud näpunäited kopeeritakse kirjeldatud tulemusesse koos allika, usaldusväärsuse ja intervalliga ning renderdatakse ebausaldusväärsete vaatlustena koos kaadri pealdistega. Vale, vahemikust väljas või lähtekohata tekst lükatakse pigem tagasi kui segatakse subtiitrite voogu. Mõlemad päringuteksti transkriptsioonikanalid normaliseerivad `client` esitatud lähtekoha, sealhulgas enesekehtestatud `embedded` või `audio-bridge` sildid. Ainult serverile kuuluv adapter saab neid usaldusväärseid silte määrata ainult koodipõhise `trustedSource` argumendi kaudu; päringu JSON väli ei jõua selle argumendini. Sõltumata selle päritolust jääb transkriptsioonitekst ebausaldusväärseks meediast tuletatud sisuks ja see ei tohi kunagi määrata autoriseerimist.

Edasijõudnud helistaja võib pakkuda samale videole `audioTranscript` -raja; seda käsitletakse kliendi pakutava tekstina, mitte serveri transkriptsiooni tõendina. Fusiooniõmblus teostab visuaalseid ja helivaatlusi ühe tähtaja ja katkestamissignaali alusel, tellib need ühisele ajajoonele, ahendab täpsed duplikaadid ja teatab osalise tulemuse, kui ainult üks pool õnnestub. Kehtetu `audioTranscript` taandub osaliseks tulemuseks — visuaalne kirjeldus jäetakse alles ja heliharu salvestab terve video ebaõnnestumise asemel puhastatud tõrkekoodi —. Harupõhine saadavus, osaline lipp ja puhastatud tõrkekoodid säilitatakse kirjeldatud tulemuses, kaitsepiirde metaandmetes (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), tulemuste vahemälu metaandmetes ja silla fusiooniloendurites. Video Bridge'i vaiketee ei kutsu kõnet tekstiks ega laadi alla teist meediumikoopiat; ilma selle selgesõnalise rajata jääb see ainult videoks.

**Ärakirja säilitamine (#12150 P1).** See kehtib automaatselt iga kord, kui Video Bridge (ise lubab) renderdab ärakirja — puudub eraldi säilituslipp. Kui päring renderdab mis tahes transkripti viite (helistaja poolt deklareeritud `transcript` või ühendatud `audioTranscript`), märgib kaitsepiirde selle `videoBridgeObserved` ja loob video kirjelduse redigeeritud varju — identse renderduse, milles iga kii vabatekstiline keha asendatakse `[redacted-video-transcript]`, mis on ehitatud enne stringi asendamise teel. lamestatud tekst, nii et ükski vihje sisu — vastandlik või tavaline, sealhulgas `]` sisaldavad kehad, nagu `[inaudible]`/`[music]` — ei jää ellu). Püsiva kõnelogi päringu keha vahetab iga videost tuletatud tekstiosa selle redigeeritud varju vastu, sobitades selle sisu võrdsusega; `fullText` ankur loetakse uuesti valmis kõneeelse kaitsepiirde kasulikust koormusest, nii et vaste õnnestub ikkagi pärast seda, kui hilisemad keti kaitsepiirded ( PII ja mandaadi maskeerijad, prioriteedid 10/95) kirjutavad kirjeldusteksti paika ja pärast system-prompt/handoff/memory süstimist sõnumimassiivi ümber kujundavad. Mudelile ülesvoolu saadetud kere on muutumatu. Täheldatud päring ei sisalda ka püsivat mälu (nii päringu kui ka vastusest tuletatud ekstraktimine jäetakse vahele), seega ei saa mudeli enda vastus transkriptsiooni teksti mällu kajada.

**Toorvideoväljad (#12430).** Kui sild on lubatud ja natiivne videotugi on tundmatu või puudub, aktiveerivad määratletud `transcript`/`audioTranscript` väljad ka `videoBridgeObserved`, isegi pärast kirjelduse ebaõnnestumist või `maxVideos` piirangut. `null` ja tühjad stringid loevad; puuduvad väljad ja mitte-video metaandmed seda ei tee. Säilitatud koopiad redigeerivad need väljad või jätavad taotluse välja ja caches/Memory jäetakse mööda.

Nendel varuteedel muutuvad kehtivad helistaja näpunäited toetatud `text`/`input_text` osadeks, mitte mittestandardseteks pakkujaväljadeks. Mõlemad päringuga esitatud lood jäävad ebausaldusväärseteks `client` vaatlusteks koos selgesõnalise hoiatusega, et videot ei kirjeldatud ja ajatempleid ei kontrollitud meedia suhtes. Olemasolevad 256-cue/64-KiB kogu- ja tähisepõhised eelarved kehtivad kahele rajale koos; ajatemplid peavad sobima maakleri 600-sekundilise ülemmäära ja mis tahes kaasasoleva fookusaknaga. Kehtetud rajad visatakse kõrvale, mitte ei edastata suvalise tekstina; kehtivat õde-venda võib siiski kasutada, kui nende kogueelarvet ei ületata. Null/empty väljad ei lisa teksti. See varu ei lisa meediumitoomist ega transkriptsiooni. Transkriptsioonilaiendi väljad eemaldatakse varuvideokandjast ja selle `video_url`/`source` objektidest. OpenAI juhtme lubade loend jääb rangeks; Tundmatud videokandjad jäävad kättesaadavaks ja teadaolevad ainult tekstisihtmärgid hoiavad turvalisi markereid. Struktureeritud redigeerimisvarjud kaitsevad lisatud ärakirja teksti, samas kui algne helistaja päring jääb muutumatuks. Native-toega sihtmärgid ja puudega sillad säilitavad oma olemasoleva möödasõidukäitumise.

Täiendavad säilitatud koopiad kasutavad sama vaadeldava taotluse signaali. Toores kaitsepiirde-eelne kliendipäringu hetktõmmis, mälus olev ootel päring ja varajase tagasilükatud taotluse logi asendavad struktuurselt videoosade transkriptsioonivälju; konveieri etappide ja konteksti üleandmise kaudu sünteesitud stringiviibad redigeeritakse püsitaotluse keha valamu juures. Püsiv `video_content_removed` marker muudab `previous_response_id` jätkamise ebaõnnestumise, mitte aga tahtlikult kõrvale jäetud teksti rekonstrueerimise. Kui vaadeldud päring kaotab osade kaupa redigeerimisvarju enne logimist või isegi üks mitmest videovarjust ei ühti pärast hilisemaid päringu mutatsioone, jäetakse osaliselt redigeeritud transkripti säilitamise asemel säilitatud päringu põhiosa täielikult välja.

Vaadeldud päringu puhul võib mudeli vastus tsiteerida ärakirja mis tahes osa ilma struktureeritud vihjepiirita. Selle püsiv kõnelogi `responseBody` on seetõttu asendatud väljajätmise markeriga; üksikasjalikku torujuhtme artefakti (mis võib sisaldada upstream/client kehasid ja voojuppe) ei säilitata. Semantiline, idempotentsus ja arutluskäikude taasesitamise vahemälu ignoreerivad selle päringu lugemist ja kirjutamist. Pakkuja päring ja kliendile nähtav vastus jäävad muutumatuks. Kui detailne artefakt jäetakse välja, tühjendatakse ajutisest puhvrist varajased säilitusbaidid. Kiro vigane EventStream hoiatus teatab ainult kasuliku koormuse baitide arvu, mitte kunagi selle sisu ega JSON parseri töötlemata viga. See ei väida, et iga sõltumatu provider/plugin -diagnostika on auditeeritud; laiemat säilinud valamu pühkima jälgitakse numbris 11658. (#11658)

Sisemine `/api/modality-bridge/video/drilldown` elutsükkel on eraldiseisev loopback/token-authenticated vahemälu substraat. Iga toiming nõuab ka kanoonilist läbipaistmatut printsiipi ID. Enne tootmishelistaja lubamist peab see tuletama selle ID autentitud rentnikult ega tohi kunagi edastada kliendi valitud väärtust. Vahemälu võtmed seovad selle printsiibi kanoonilise seansi ja videoviite IDs, salvestavad ainult nende SHA-256-derived võtmed ja hõlmavad nii lugemist kui ka kustutamist samasse printsiipi. Vahemällu salvestatakse kuni 16 tuletatud JPEG kaadrit sisestuse kohta, aegub need kümne minuti pärast ja see toetab piiratud `start`/`end` lugemist või selgesõnalist seansi kustutamist.

Iga printsiip on piiratud 16 kirjega ja 64 MiB kanooniliste JPEG andmetega. Need piirangud ei sõltu globaalsest 64-entry/256 MiB ülemmäärast: printsipaali kvoodi surve tõstab enne globaalse LRU väljatõstmise kaalumist välja ainult selle printsipaali kõige vähem hiljuti kasutatud kanded. Aegunud kanded pühitakse nii põhi- kui ka globaalsest vahemälutegevuse arvestusest, samas kui tühistamise ja kinnitamise ebaõnnestumine ei too kaasa osalist asendamist.

Vahemälu lükkab tagasi mittekanoonilise Base64, liigse polsterduse, mitte-JPEG-meediumi, väära vorminguga või kärbitud JPEGs ja JPEGs, mis annavad hoiatuse piiratud täispildi `sharp` dekodeerimisel. See kodeerib iga aktsepteeritud kujutise uuesti kanooniliseks JPEG, tuletab helistajaväljade usaldamise asemel dekodeeritud baitidest laiuse ja kõrguse ning jätab need allesjäämise asemel kõrvale kõik järgnevad polüglotibaidid. Mõlema kvoodi alla arvestatakse ainult piiratud kanoonilist tihendatud puhvrit. JSON juhtmepiirang sisaldab Base64 üldkulusid 32 MiB dekodeeritud sisendiga lae jaoks. Iga salvestatud tuletis salvestab selle kinnitatud JPEG format/resolution, proovivõtupoliitika, tuletamisversiooni, loomise aja, serveri poolt arvutatud sisu räsi ja räsi vanemaviide pluss usaldusväärse helistaja põhisisu räsi. Tühistamist kontrollitakse asünkroonsete decode/hash faaside vahel enne aatomi vahemälu sidumist.

See osa ei ühenda veel tootmistootjat marsruudiga ega paku mitme eraldusvõimega variantide valikut. Läbipaistva Video Bridge'i päringu teega ei kaasne seega lisatööd, samas kui üürnikuga seotud peamise tuletamine ja täielik FU-08 mitme eraldusvõimega elutsükkel jäävad selgesõnaliseks järeltööks, mitte ei dokumenteerita täieliku käitumisena.

Kaadrite pealdised on järjestikku koos konfigureeritud videomudeliga. Tühi video alistamine pärib sätte Vision; kui mõlemad on tühjad, valib Visioni automaatruuter tõhusa nägemisvõimelise mudeli. Edukad pealdised asendavad algse osa stabiilse `[Video description:` eesliitega, mis märgib teksti ka kui ebausaldusväärset meediast tulenevat vaatlust ja käsib allavoolu mudelitel mitte järgida meedias leiduvaid juhiseid. Raami-tiitrite vahemäluklahvid hõlmavad JPEG baite, viipa, ajatemplit ja efektiivset mudelit; vahemällu salvestatakse ainult edukad subtiitrid. Vahemälu kirjed säilitavad tegeliku eduka tootja mudeli, sealhulgas varumudeli; sild teatab `mixed` kui erinevad mudelid valmistasid erinevaid raame. Vahemälu tabamus kasutab seda tootja identiteeti uuesti, selle asemel et sildistada see uuesti taotletud marsruutimisplaaniks. Kogu video tulemuste vahemälu on sisestatud igasse sisendisse, mis muudab väljundi — viipa, tõhusat mudelit, diskreetimise poliitikat, kaadrite arvu, semantilise analüüsi režiimi, normaliseeritud fookuse vihje SHA-256 sõrmejälge, fookuse akent, `transcript`, `audioTranscript` ja kontaktilehe lippu —, nii et nende mõõtmete muutmine ei ole kunagi vahemälu väärkasutus. Visuaalne dedup poliitika versioon, lävi ja piiratud kandidaatkaadrite arv on samuti selgelt väljendatud tulemuste vahemälu võtmes ja metaandmetes; poliitika muudatus ei saa seetõttu taaskasutada aegunud kogu video kirjeldust. Tulemuste vahemälu v4 metaandmed säilitavad režiimi ja sõrmejälje, mitte kunagi töötlemata kasutaja ülesannet. Guardraili metaandmed kajastavad nii nõutud kui ka tõhusaid analüüsirežiime; taotletud `focused` -režiim ilma kasutatava kasutajatekstita teatatakse tõhusalt `full`.

Kaitsepiire eraldab kõik toetatud video osad, kuid ei kirjelda rohkem kui `modalityBridgeVideoMaxVideos`. Kui sihtmärgil on tõestatud `supportsVideo === false`, muutuvad ebaõnnestunud ja ülepiiranguga videod selgesõnalisteks ohututeks tekstimarkeriteks, nii et ükski toorvideo ei jää ellu. Kui võime pole teada, säilitavad need osad oma videokandja; mis tahes varutranskriptsioon järgib ülaltoodud piiratud teksti teisendust. Sihtmärgid `supportsVideo === true` ga mööduvad sillast. Kliendi päringu katkestamise signaal levib allalaadimise, vahendaja järjekorra, alamprotsesside ja pealdiskutsete kaudu; katkestused peatuvad videote vahel ja ei katke kunagi toormeedia jaoks avatud.

Käitusaja sätted on DB-ga tagatud ja Zod-valideeritud:

| Võti                                | Vaikimisi   | Vahemik / käitumine                                                                                        |
| ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Valikuline käitusaeg, luba                                                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` säilitab üldised pealdised; `focused` kasutab piiratud, ebausaldusväärset uusima kasutaja konteksti |
| `modalityBridgeVideoModel`          | `""`        | Pärige Vision Bridge'i mudel                                                                               |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                       |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` või proportsionaalne `segment_aware`; detektori rike langeb tagasi `uniform`      |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                        |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120 000 ms                                                                                            |

Pärand püsiv Video ajalõpu väärtused, mis on suuremad kui 120 sekundit, on fikseeritud maakleri tähtajaga; uued seaded kirjutab üle, et limiit lükatakse tagasi. `GET /api/modality-bridge/video/runtime` nõuab enne autentimist või käitusaegset kontrollimist usaldusväärse templiga tagasisilmuse asukohta, seejärel nõuab see haldusautentimist. Kui käitusaeg pole saadaval, tagastab see ainult `available`, puhastatud FFmpeg/ffprobe versioonid ja fikseeritud põhjuse. Sisemine väljavõtte lõpp-punkt ei ole avalik üleslaadimine API: järjekorra küllastus tagastab `503` pluss `Retry-After`, helistaja lahtiühendamine tagastab `499` ja maakleri fikseeritud tähtaeg tagastab `504`. Teisendatud vastused lisavad `video->text;model=<visionModel>;parts=<videos>` kesksele `x-omniroute-modality-bridge` päisele ilma nägemis- või helisegmente eemaldamata.

### PII masker (`piiMasker.ts`)

Jookseb edasi** mõlemad** etapid.

- **`preCall`** kloonib kasuliku koormuse, kõnnib `system`, `messages`, `input` ja `prompt` (kaasa arvatud tavalised stringid) ning rakendab `processPII()` (alates `@/shared/utils/inputSanitizer`) stringi `content`/`text` väljadele. Kui `PII_REDACTION_ENABLED=true`, redigeeritakse tuvastatud PII väljuvas kasulikus koormuses. See ei sõltu `INPUT_SANITIZER_MODE` (mis juhib ainult viipe sisestamise poliitikat). Kui redigeerimine on välja lülitatud, salvestab kõne tuvastusloendeid sisu ümber kirjutamata.
- **`postCall`** sügavalt kloonib vastuse, käivitab `sanitizePIIResponse()` pluss Responses-API-kuju maskeerija (`maskResponsesOutput` — hõlmab `output_text` ja `output[].content[].text`). Redigeerimise korral asendab muudetud vastus originaali.

Kaitsepiire ei blokeeri kunagi; see ainult märgib (`meta.detections`, `meta.redacted`) või kirjutab ümber.

#### Tüübi valik, kohandatud mustrid ja tuvastusloendurid

**Armatuurlaud → Seaded → Turvalisus → PII maskeerimine** valib _mis_ on maskeeritud. See ei lülita maskeerimist sisse: see on endiselt `PII_REDACTION_ENABLED` (taotlus) ja `PII_RESPONSE_SANITIZATION` (vastus + SSE), mõlemad on vaikimisi välja lülitatud.

- **Valik tüübi järgi** — sisseehitatud ID-d on loetletud `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Määramata tähendab igat tüüpi (käitumine enne selle sätte olemasolu). Päringumootori `ssn_us` muster kaardistab `ssn`. Mallid (minimaalne, standardne, finants, brasiilia, USA, GDPR, POPIA, täis) täidavad ainult UI märkeruudud.
- **GDPR ja POPIA identifikaatorid** — kaksteist sisseehitatud ID-d, mis hõlmavad EU ja Lõuna-Aafrika isikutunnuseid (tabel allpool). Nende regexid, valideerijad ja jurisdiktsioonisildid asuvad ühes tabelis `src/shared/utils/piiPatterns.ts`, mida tarbivad nii vastuse puhastaja (`src/lib/piiSanitizer.ts`) kui ka päringu maskeerija (`src/shared/utils/inputSanitizer.ts`). Vaste redigeeritakse ainult siis, kui selle valija selle vastu võtab; tühjast numbrite jooksust ei piisa kunagi. Operaator, kes salvestas kitsendatud valiku enne nende ID-de olemasolu, säilitab oma käitumise seni, kuni uued ID-d on märgitud.
- **Kohandatud mustrid** — kuni 20 regex- või metamärgimustrit (`*` = kuni 64 mitte-tühimärki, `?` = üks). Tikud muutuvad `[CUSTOM_REDACTED]`. Iga muster läbib `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): maksimaalselt 500 tähemärki, lipud piirduvad `g i m s u`, peavad kompileerima, läbima `safe-regex` (katastroofiline taganemine) ega tohi ühtida tühja stringi või redigeerimiskohahoidjaga. Ebaõnnestunud muster lükatakse salvestamisel ja testimisel tagasi ning ebaõnnestunud salvestatud rida jäetakse kompileerimise asemel käitusajal vahele. Kohandatud mustrid töötavad ainult siis, kui maskeerimine on sisse lülitatud.
- **Tuvastamisloendurid** — loendab tüübi kohta (väärtused pole kunagi ühtinud), hoitakse mälus ja lähtestatakse taaskäivitamisel (`src/lib/pii/piiDetectionStats.ts`). Need suurenevad ainult maskeerimise ajal.

Seadistused asuvad tabelis `key_value` (nimeruum `pii_settings`, `src/lib/db/piiSettings.ts`) ja neid loetakse 1 s vahemälu kaudu. API:

| meetod | Tee                      | Eesmärk                                                                         |
| ------ | ------------------------ | ------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Lipu olek, `enabledTypes`, `customPatterns`, tuvastusloendurid                  |
| `PUT`  | `/api/settings/pii`      | Asenda `enabledTypes` (`null` = all) and/or `customPatterns`                    |
| `POST` | `/api/settings/pii/test` | Kuivkäivitage üks muster maksimaalselt 8 KB proovi suhtes; midagi ei salvestata |

Kõik kolm nõuavad haldamise autentimist ja kinnitavad keha Zod ga (`src/shared/validation/schemas/piiSettings.ts`).

#### GDPR (EU) ja POPIA (Lõuna-Aafrika) identifikaatorid

| Id                  | Identifikaator           | Valideerimine                                                                              |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------ |
| `iban`              | IBAN                     | Tuntud riik, selle riigi täpne pikkus, ISO 13616 MOD-97-10                                 |
| `eu_vat`            | EU VAT number            | Tuntud liikmesriigi eesliide ja selle osariigi numbrivorming (ilma VIES otsinguta)         |
| `es_dni_nie`        | hispaania DNI / NIE      | Kontrolltäht (väärtus mod 23); NIE on `X/Y/Z` + 7 numbrit                                  |
| `it_codice_fiscale` | Itaalia Codice Fiscale   | Juhttäht odd/even positsioonitabelitest                                                    |
| `pl_pesel`          | Poola PESEL              | Kaalutud kontrollsumma ja kodeeritud sünnikuupäev, mis on olemas                           |
| `nl_bsn`            | Hollandi BSN             | 11-kindel (kaalud 9..2, -1)                                                                |
| `de_steuer_id`      | Saksa Steuer-ID          | ISO 7064 Mod 11,10 pluss numbrilise struktuuri reeglid (ei ole eesolevaid 0)               |
| `se_personnummer`   | Rootsi personalinumber   | Luhn üle viimase kümne numbri ja usutava sünnikuupäeva (10 või 12 numbrit)                 |
| `za_id`             | Lõuna-Aafrika ID number  | Luhn üle kõik 13 numbrit, kehtiv sünninumber month/day, kodakondsuse number 0 või 1        |
| `za_phone`          | Lõuna-Aafrika telefon    | `+27` / `27` eesliide või rahvuslik `0..` vorm, mis on kirjutatud tühiku või sidekriipsuga |
| `za_vat`            | Lõuna-Aafrika VAT number | 10 numbrit, mis algavad tähega `4`** ja** "VAT" / "BTW" eelnevas 48 tähemärgis             |
| `za_tax_ref`        | Lõuna-Aafrika maksuref.  | 10 numbrit, mis algavad `0`-`3`, Luhn,** ja** "tax" / "SARS" eelnevas 48 tähemärgis        |

Kuna ainult numbrilised vormingud põrkuvad järjekorranumbrite, järgunumbrite ja ajatemplitega, vajavad nõrgemad vormingud (`za_vat`, `za_tax_ref`) märksõna näpunäidet ja tühja kümnekohalist `0..` numbrit ei käsitleta Lõuna-Aafrika telefoninumbrina. Tühikutega IBANs (`GB29 NWBK ...`) ei sobita. Voogesitusteel vaadatakse vihjet ainult praeguse tüki seest. ID-d asuvad üldiste telefonimustrite ees, seega säilitab kinnitatud identifikaator oma kohahoidja (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Mallid `gdpr` ja `popia` valivad vastavalt EU ja Lõuna-Aafrika ID-d. Maskeerimine jääb valikuliseks (kõva reegel nr 20): siin ei muuda miski funktsiooni lipu vaikeseadet.

### Kiire süstimine (`promptInjection.ts`)

Tuvastab kasutaja pakutavas sisus võistlevaid struktuure ja jõustab konfigureeritud poliitika. Käitumist juhivad keskkonnamuutujad ja konstruktori valikud:

| Seadistamine    | Env var                                                                                               | Vaikimisi | Mõju                                                                                                                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lubatud         | `INPUT_SANITIZER_ENABLED`                                                                             | `true`    | Kui `false`, kaitsepiirde lühis.                                                                                                                                                                      |
| Režiim          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`    | Süstimisreeglid: `block`, `warn` või `log`. (`redact` on back-compat jaoks aktsepteeritud, kuid sobib** mitte** riba sisestamise tekst; PII ümberkirjutamise taotlust juhib `PII_REDACTION_ENABLED`.) |
| Blokeerimislävi | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`    | Blokeerimiseks vajalik minimaalne raskusaste. Meedium on vaikimisi ainult jälgitav.                                                                                                                   |

**Režiimi eelistus** (`getMode`): helistaja `options.mode` → `INJECTION_GUARD_MODE`**DB funktsiooni-lipu alistamine** (Armatuurlaua → seaded → Funktsioonide lipud) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Armatuurlaua alistamine võidab seega env varie, nii et funktsioonide lipud UI juhivad jooksvat valvurit otse (taaskäivitamist ei toimu). DB lugemine on tõrkekindel: vigade korral lülitub valvur tagasi env-põhisele käitumisele ja kui alistamist pole määratud, on käitumine identne ainult env-resolutsiooniga.

Tuvastamisallikad:

1. `sanitizeRequest()` `@/shared/utils/inputSanitizer` st (mujal torujuhtmes kasutatav jagatud detektorikomplekt).
2. Sisseehitatud `DEFAULT_GUARD_PATTERNS` (praegu `system_override_inline` ja `markdown_system_block`, mõlema raskusastmega `high` ).
3. Valikuline `customPatterns` edastatakse konstruktori valikute kaudu (stringid, regex või `{ name, pattern, severity }` -kirjed).

Kui `mode === "block"`** ja** vähemalt üks tuvastamine vastab raskuslävele, `preCall` tagastab `{ block: true, message: "Request rejected: suspicious content detected" }`. `warn`/`log` režiimides kaitsepiire logib, kuid lubab kõne. Jagatud abimees `evaluatePromptInjection()` eksporditakse ka helistajatele, kes peavad hindama viipasid ilma registrit läbimata.

**Skannimine seotud (v3.8.20):** detektor kontrollib ainult** esimesed 16 KB** ühendatud viipa tekstist — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 baiti) `src/shared/utils/inputSanitizer.ts`. Nii `detectInjection()` kui ka `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` enne mustritsükli käivitamist. Sisestusjuhised asuvad sisendi ülaosas, nii et see piirab mitmesaja KB suuruste kasulike koormuste regex CPU/GC ilma tuvastamist nõrgendamata (vt #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Jookseb edasi** mõlemad** etapid, vaikeahela viimane (prioriteet `95`). Eemaldab väljaminevast kasulikust koormusest tuntud API-võtme / salajase märgi mustrid (sõnumi sisu, tööriista kutsumise argumendid, tööriista tulemused)** ja** teenusepakkuja vastus, nii et viipasse kleebitud (või tööriista tulemusega kajatud) mandaati ei lekitata ülesvoolu pakkujale ega tagasi kliendile.

- **Ainult lubamine** , sama konventsioon mis PII redigeerimisel (kõva reegli nr 20 kõrval): keelatud, välja arvatud juhul, kui `settings.credentialRedactionEnabled === true`** või** `CREDENTIAL_REDACTION_ENABLED=true`. Kui see on välja lülitatud, on kaitsepiire mittetoimiv — mida see ei blokeeri ega kirjuta kunagi ümber.
- `redactCredentials()` kõnnib kogu payload/response puu (`walkValue()`, prototype-pollution-safe, cycle-safe via `WeakSet`) ja asendab vasted `[REDACTED:<type>]` kohahoidjaga, kloonides ainult tegelikult muutunud oksad.
- `CREDENTIAL_PATTERNS` hõlmab LLM pakkuja võtmeid (OpenAI, OpenAI-proj, Anthropic, Google, Kallistav nägu, Replicate ), VCS/SaaS märke (GitHub, Slack, Lineaarne, Notion, npm, Postimees, Discord), maksevõtmeid (AWS võti (Strki võti , SendGrid, Mailgun), privaatvõtmed / JWTs, mandaadi kandvad ühendusstringid (`mongodb://user:pass@...` jne) ja üldine `Authorization`/`x-api-key`/`api-key`/`apikey` päiseväärtuste muster. Päisekujulisi klahve (`authorization`, `x-api-key`, `api-key`, `apikey`) redigeeritakse pigem struktuuriliselt (ainult väärtus, skeemi eesliide nagu `Bearer `/`Basic ` säilinud), mitte üldise teksti regexi kaudu.
- Kaitsepiire ei blokeeri kunagi; see ainult kirjutab ümber (`modifiedPayload` / `modifiedResponse`) ja märgib (`meta.credentialsRedacted`, `meta.count`).

Regressioonikaitsja: `tests/unit/credential-masker-guardrail.test.ts`.

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
