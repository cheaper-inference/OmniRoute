# Guardrails (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Tõe allikas:** `src/lib/guardrails/`

Kaitsepiirded tagavad ohutuse, poliitika ja sisu muutmise OmniRoute ja ülesvoolu pakkujate vahelisel piiril. Iga kaitsepiire saab kontrollida (ja soovi korral tagasi lükata, teisendada või märkmeid teha) taotluste kasulikke koormusi (`preCall`) ja ülesvoolu vastuseid (`postCall`).

Süsteem on** tõrgeteta avatud** : kui kaitsepiire viskab täitmise ajal, registreerib register vea ja jätkab päringu ebaõnnestumise asemel järgmise piirdega. Blokeerimine on selgesõnaline otsus (`block: true`), mitte kunagi õnnetus. Üks erand on katkestatud taotlus: kui helistaja `signal` katkestatakse, lükkab viskav kaitsepiire vahele jätmise asemel konksu jooksu.

Konksud teevad** mitte** jookse igal marsruudil või igal vastusel. Lugege jaotist [Katvus ja piirangud,](#coverage-and-limits) enne kui hakkate turvakontrollina kasutama piirdeid.

## Sisseehitatud kaitsepiirded

Register laadib need kaitsepiirded automaatselt importimisel eelisjärjekorras (vt `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteet | Nimi                | Etapp(id)      | Fail                      |
| ---------- | ------------------- | -------------- | ------------------------- |
| `1`        | `agent-guard`       | `preCall`      | `agentGuard/guardrail.ts` |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`         |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`          |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`          |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`            |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`      |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts`     |

Jooksevad madalama prioriteediga numbrid** esiteks** .

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 põhimudelil ja `glm-5.3-{low,high,max}` on selgesõnalised `supportsVision:false` registry/spec metaandmed. GLM 5.3 Flashi variandid jäävad natiivse nägemisega mudeliteks. Claude Code'i `/v1/messages` marsruut siseneb jagatud `handleChat` eelkõnede kaitsepiirde ketti** enne** Claude-to-OpenAI tõlge; pesastatud `Read` tööriista tulemuse kujutisi tuleb kirjeldada või käsitleda enne, kui tõlge tõstab need OpenAI `image_url` sisuks (#17069).

Peatab pilti kandvad taotlused, mille eesmärk on** mittenägemise mudelid** ja suunab kogu päringu ümber nägemisvõimelisele mudelile või asendab pildiosad tekstikirjeldustega, mis on loodud konfigureeritava nägemismudeli poolt enne ülesvoolu kutsumist. See võimaldab ainult tekstiteenuse pakkujatel multimodaalseid koormusi läbipaistvalt käsitleda.

Voog:

1. Jätke vahele, kui sihtmudel juba toetab nägemist (välja arvatud juhul, kui see on sundsildade loendis `isVisionBridgeForcedModel`).
2. Ekstraktige pildiosad `extractImageParts(messages)` (`visionBridgeHelpers.ts`) kaudu, mis delegeerib** ühtne meediadetektor** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — on ainus tõeallikas, mida jagatakse kombineeritud ühilduvusfiltriga. Ekstraheerimine on loetletud kujundites, mida `replaceImageParts` saab tagasi liita (väljavõte ↔ asendab lepingu): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` ja Vastused API `input_image`. Sobivad kujutised, mis on pesastatud Claude Code `tool_result.content` ja Responses tööriista väljunditesse, ekstraheeritakse ja asendatakse nende algsete radadega; ainult indikaatoriga kujundid on kombineeritud filtriga materjalid ja neid ei ekstraheerita. Jätke vahele, kui ühtegi ei leitud.
3. Lahendage käitusaja konfiguratsioon `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) kaudu: uued `modalityBridge*` seadete võtmed võidavad; pärand `visionBridge*` võtmed jäävad a** ühe tsükli varu** (tagasipööramise aken). Kui sild on keelatud, jätke vahele enne meedia läbimist.
4. Režiimi valija (`modalityBridgeVisionMode`, vt allolevat tabelit) otsustab marsruudi ümbersuunamise või kirjeldamise. Reroute tagastab `modifiedPayload` kus on vahetatud ainult `model`, pluss meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Kirjeldage teed: piirake kujutisi aadressil `maxImages`, koostage ülesandeteadlik viip, vaadake kirjelduse vahemälu, helistage nägemismudelile** paralleelselt** (`Promise.allSettled`) ja sisestage nende asemele `[Image N]: <description>` tekstiosad. Ebaõnnestunud kirjeldus annab tulemuseks `null`: toorpilt säilib unknown/vision-capable sihtmärkide (#4012) jaoks, kuid** kinnitatud ainult tekstiga otsesihtmärk** või zero-vision combo saab selgesõnalise `(unavailable — no vision-capable provider connected)` -teksti tünga iga kirjeldamata pildi jaoks, sealhulgas osaliste tõrgete ja piltide jaoks, mis ületavad kirjeldamise-kutsumise piiri (#17069). Olemasolev kõik-ebaõnnestunud kombinatsioon, mis kirjeldab tagavara, jääb paika (#8430).
6. Tagasta `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Režiimi valija (`modalityBridgeVisionMode`)

| Režiim     | Vaikimisi | Käitumine                                                                                                                                                                                                                                                                                       |
| ---------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔         | Pärandheuristiline, puutumata (#6640/#7204): mittekombo/`auto/` mudelid suunavad ümber parimale nägemismudelile, välja arvatud juhul, kui algsel mudelil on juba kasutatavad mandaadid (seejärel kirjeldage); kombineeritud sihtmärgid kirjeldavad alati.                                       |
| `describe` |           | Kirjeldage alati — ümbersuunamise plokk jäetakse täielikult vahele; kasutaja valitud mudel vastab alati.                                                                                                                                                                                        |
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

Mälusisene LRU + TTL vahemälu väljundite kirjeldamiseks, jagatud kogu protsessi ulatuses. Klahv = `sha256(imageRef + composedPrompt + configuredBridgeModel)` pikkus-eesliide raamimisega (väljapiiride kokkupõrkeid pole). Mudeli komponent on** konfigureeritud** sillamudel, mitte mudel, mis tegelikult vastas — `callVisionModel` võib sisemiselt tagasi langeda ja katse kohta sisestamine killustaks vahemälu. Ebaõnnestunud kirjeldusi ei salvestata kunagi vahemällu. Seaded:

| Võti                            | Vaikimisi | Vahemik |
| ------------------------------- | --------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`    | —       |
| `modalityBridgeCacheTtlMinutes` | `60`      | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`     | 10–5000 |

#### Pildi kaugnormaliseerimine (isesilmus describe/base64 toomine)

Kui sild tõmbab a** kaugjuhtimispult** pilt ise — Anthropic kirjeldab isekutsumist ja claude-wire-formaadis base64 teisendust (`ensureBase64ImagesForClaudeWire`), mõlemad `fetchRemoteImageAsDataUri()` kaudu `visionBridgeHelpers.ts` — edastatakse saadud andmed URI läbi `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`), enne kui need manustatakse nägemismudeli päringusse. Liiga suured pildid vähendatakse väärtuseni a** 2048 pikslit pikk serv** (vastab suuruse muutmise piirile OpenAI/Anthropic rakenda juba serveripoolt), mis kärbib bytes/latency üleslaadimist, muutmata seda, mida nägemismudel näeb. Suuruse muutmine kasutab dünaamilise impordi kaudu laaditud `sharp`: platvormil, kus selle algse binaarfaili laadimine ebaõnnestub, `normalizeDataUri()`** ei viska kunagi** — see langeb tagasi algsete baitide läbipääsuks, nii et describe/base64-conversion tee töötab alati. Ka mittepildibaidid (toomine, mis ei tagastanud dekodeeritavat pilti) lastakse läbi puutumatult. See normaliseerimine hõlmab kujutisi, mille sild tõmbab enda helistamiseks — ja seda ei rakendata kunagi helistaja töötlemata läbipääsu kasulikule koormusele, mis on kooskõlas ainult lubamise mutatsiooni põhimõttega (hard Rule #20).

#### Seadistuste skeem + migratsioon

Uued `modalityBridge*` klahvid on Zod-valideeritud `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trio ja `modalityBridgeAudio*` rühm, mida kasutab Audio Bridge. Migreerimine `141_modality_bridge_settings.sql` kopeerib olemasolevad `visionBridge*` pärandväärtused vastavatesse uutesse võtmetesse (idempotentne, ei kirjuta kunagi üle operaatori määratud `modalityBridge*` väärtust); pärandvõtmed jäävad lugemiseks ühe väljalasketsükli jooksul aktsepteerituks.

#### Läbipaistvuse päise + statistika

Kirjelda-transformeeritud vastused sisaldavad `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (ehitatud `buildModalityBridgeHeader()` -ga `modalityBridge/bridgeStats.ts`, tembeldatud `withModalityBridgeHeader()` -ga `src/sse/handlers/chatHelpers.ts`). Ümbersuunatud taotlused saavad** ei** header — kasulik koormus jäi puutumata ja mudeli vahetus on juba nähtav vastuse keha `model` väljal.

`GET /api/modality-bridge/stats` (halduse autentimine, sama tasand kui `GET /api/settings`) tagastab `vision`, `audio` ja `video` mälusisesed modaalsusloendurid `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }`. `averageLatencyMs` kasutab nimetajana `latencySamples`, mitte kõiki katseid; ilma ajastuseta toiming ei valmista null-millisekundilist näidist. `bridged` jääb edukate teisenduste tagasiühilduvaks aliaseks; ebaõnnestunud katsed seda ei suurenda. Loendurid lähtestatakse protsessi taaskäivitamisel disaini järgi (telemeetria, mitte arvestus).

#### Armatuurlaua konfiguratsioon

The dedicated dashboard page is `/dashboard/settings/modality-bridge`. Its URL-addressable `Vision`, `Audio`, and `Video` tabs preserve query parameters while switching the `tab` value. The Vision tab exposes enablement, mode, model selection (including the automatic default), task-aware prompting, advanced timeout/image/description-length/cache limits, runtime counters, and a guarded sample request. The Audio tab is also live: it exposes enablement, an STT-only model picker with Auto, timeout/max-clip limits, audio counters, and an `input_audio` sample test. The Video tab is functional: it reports the FFmpeg/ffprobe runtime state — one of four explicit UI states (`unknown` while the probe is in flight or could not complete, `restricted` on a non-loopback dashboard host where the probe is skipped client-side, `unavailable` once probed and confirmed missing, or `available` with the FFmpeg/ffprobe versions) — persists enable/model/frame/video/timeout limits, filters the model picker to vision-capable models, and exposes video counters.

Endine Vision Bridge'i kaart AI sätete all on ühilduvuslink uuele lehele; ta ei oma enam vormi teist eksemplari. Meediapakkujad lingivad ka pildist tekstiks ja kõne tekstiks töövood vastavate modaalsussilla vahekaartidega, eemaldamata olemasolevat kõne tekstiks mänguväljakut.

**Iseahela sissepääsu ümbersõit:** kui kirjeldab kõne marsruute läbi OmniRoute enda `/v1` eneseahela (mittestandardne teenusepakkuja mudel), saadab alampäring `x-omniroute-admission-bypass: internal` ja autentitakse lahendatud eneseahela mandaadiga — kohalik `sk_omniroute` sentinel kohalikus režiimis või operaatori konfigureeritud `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env kirjeldab võtit ( `REQUIRE_API_KEY=true` #1350 env) helistada. Möödasõitu arvestatakse ainult nende täpsete mandaatide puhul, nii et välised kliendid ei saa päist sissepääsu vahelejätmiseks kasutada.

Pärandvaikeväärtused elavad `src/shared/constants/visionBridgeDefaults.ts` keeles ; uued mode/task-aware/cache vaikesätted ja seadete lahendaja töötavad `src/shared/constants/modalityBridgeDefaults.ts`. Kaitsepiire paljastab `deps` konstruktori valiku, nii et testid võivad sisestada võltsitud `getSettings` ja `callVisionModel` -rakendusi.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Peatab heli kandvad vestlustaotlused, enne kui need jõuavad sihtmärgini, mis teadaolevalt ei aktsepteeri helisisendit. See ei suuna vestlustaotlust kunagi ümber: heliosad transkribeeritakse olemasoleva OpenAI-ga ühilduva mitmeosalise lõpp-punkti kaudu ja valitud vestlusmudel jätkub teksti transkriptsioonidega.

Voog:

1. Lahendage `supportsAudio` `getResolvedModelCapabilities()` kaudu. Võidab selgesõnalised pakkuja-registri metaandmed, seejärel staatilise mudeli metaandmed ja seejärel sünkroonitud `modalities_input`. Deklareeritud sisendloend ilma `audio` on `false`; `null` ei jää võimekuse tõenditeks. Nii `false` kui ka `null` aktiveerivad konservatiivse silla, samas kui `true` möödub sellest.
2. Lahendage `modalityBridgeAudio*` sätted ja eraldage jagatud `detectMediaParts()` detektori kaudu igast sõnumist ühendatavad tipptasemel heliosad. Toetatud traadikujud on OpenAI `input_audio`, `audio_url` ja `source.media_type: "audio/*"`. Pesastatud heli tuvastatakse marsruutimisel, kuid seda ei eemaldata splaissimise teel. Tööd piirab `modalityBridgeAudioMaxClips`; hilisemad osad jäävad puutumata.
3. Austage konfigureeritud `provider/model` või laske `selectAudioBridgeModel()` kõndida `AUDIO_TRANSCRIPTION_PROVIDERS` stabiilses kataloogijärjekorras ja valige esimene mudel, millel on kasutatavad aktiivsed pakkuja mandaadid.
4. `callAudioTranscription()` teisendab base64/data-URI heli mitmeosaliseks `file` või laadib DNS kinnitusega ja 25 MB seotusega avaliku väljamineva valve kaudu alla kaug- `audio_url`. Seejärel POSTs fail ja valitud mudel kohalikku `/v1/audio/transcriptions` iseloopi, mille autentimine on `resolveSelfLoopBearer()`. Olemasolev transkriptsioonimarsruut teostab tavapärast mandaadiotsingut, cooldown/rate-limit käsitlust ja pakkujate väljasaatmist.
5. Edukad kõned asendavad nende osad `[Audio N]: <transcript>`. Kõned käitatakse `Promise.allSettled`: individuaalne rike säilitab selle algse heliosa (#4012 -leping). Kui iga kõne nurjub ja sihtmärk on tõestatud `supportsAudio === false`, muutuvad osad `[Audio N]: (unavailable — no STT provider connected)` (#8430 -leping). Tundmatu sihtmärgi (`null`) korral jääb kõigi ebaõnnestumiste tulemus puutumata. Tõestatud tekstipõhine sihtmärk, millel pole kasutatavat STT mandaadi, saab sama selgesõnalise tünga ilma võrgukõnet tegemata.

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

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) owns request traversal, the capability/policy check, per-request aggregation, and the response payload. Per-video work — acquisition, the whole-result cache, describing a frame sequence (which fuses any caller-declared audio transcript), and per-attempt metrics/abort/cleanup — is hidden behind `processVideoPart` in `videoBridgePipeline.ts`, called once per video part inside `preCall`'s loop. That module also defines the explicit port boundaries `VideoMediaBrokerPort` (acquiring bytes and extracting sampled frames), `VideoAudioTranscriptionPort` (fusing a caller-declared audio transcript with the sampled captions), and `VideoDrilldownPort` (the legacy raw-store shape). Production STT and frame retention are composed around the describing port through `createVideoSttAdapter` and `createVideoDrilldownAdapter`; the latter uses the shared opaque-handle lifecycle.

Avalik `/v1` päringu tee ei impordi ega kutsu kunagi alamprotsessi. Kaugvideod laaditakse alla 50 MiB piiranguga; tekstisisesetel base64 videotel on konservatiivne 36 MiB dekodeeritud video kohta, nii et model/messages/framing ümbrik võib jääda avaliku JSON taotluse 50 MiB piirangu piiridesse. Reasisese pikkuse ja dekodeeritud suuruse hinnanguid kontrollitakse enne eraldamist. HTTPS on nõutav esialgsel kaugjuhtimispuldil URL ja igal ümbersuunamisel, kasutades olemasolevat ainult avalikku väljamineku kaitset koos DNS kinnitamisega. Seejärel ületavad baidid täpse sisemise `POST /api/modality-bridge/video/extract` maakleri piiri. See marsruut on nii `LOCAL_ONLY` kui ka `SPAWN_CAPABLE`, aktsepteerib ainult protsessipõhiseid autentitud usaldusväärse tagasisilmuse taotlusi ega aktsepteeri kunagi URL, failisüsteemi teed, täitmisfaili ega argumentide loendit. API korpuse suurusega torujuhe ja käitleja inkrementaalne korpuse lugeja jõustavad sõltumatult 50 MiB maakleri sisendi piiri. Selle piiratud järjekord käivitab ühe ekstraktsiooni korraga, võimaldab nelja ootel tööd ja piirab ootel sisendit kiirusel 100 MiB.

Maakleri sees loeb `ffprobe` privaatset kohalikku faili; fikseeritud vormingu lubade loend välistab esitusloendi ja manifesti vormingud. Lubatud MOV-perekonna konteinerite puhul jäävad välised MOV -andmete viited vaikimisi keelatuks ja fikseeritud käsk ei luba neid kasutada. Nii `ffprobe` kui ka `ffmpeg` kasutavad `file` -only protokolli valget nimekirja, ühte lõime, fikseeritud argumentide massiive, kesta pole ja `PATH`-st lahendatud käivitatavaid faile. Manustatud piltide kaanevood ei ole esitatavad kandidaadid. Kõik esitatavad vood peavad vastama piirangutele ja enne deterministlikku madalaima indeksiga tagavaraks on eelistatud selgesõnaline vaikevoog. Videod on piiratud 600 sekundiga, 8192 pikslit mõõtme kohta ja 33 554 432 lähtepikslit. FFmpeg proovib 1–16 keskpunkti JPEG kaadrit, skaleerib pika serva alla maksimaalselt 1024 pikslini ilma väiksemaid sisendeid suurendamata ja ei saa kunagi URL. Sampling on vaikimisi `uniform`. Valikulised `scene_aware` ja eksperimentaalsed `segment_aware` -poliitikad sooritavad ühe täiendava fikseeritud FFmpeg käigu üle juba kinnitatud kohaliku voo, valivad piiratud `showinfo` -stseeni ajatemplid ja taanduvad deterministlikult samadele ühtsetele keskpunktidele detektori rikke, ajalõpu, vigase väljundi või tühja kandidaatide komplekti korral. Segmenditeadlik režiim eraldab keskpunkti näidised proportsionaalselt kinnitatud stseeni intervallidega; segmenditeadlikud tõendid ja varukäitumine on üksikasjalikult kirjeldatud allpool. Kõva 16-kaadri piirik rakendatakse pärast valimist igas poliitikas. Kui stseenipõhisel päringul on ainult ühe kaadri eelarve, kasutab see aktiivse täisvideo- või fookusakna ühtset keskpunkti ja teatab `policyEffective: uniform`: üks valitud stseenikaader ei suuda säilitada mõlemat ajalist otsa. Helistaja võib valikuliselt pakkuda piiratud fookusakna (`start`/`end` sekundit); piirid seatakse kandja kestusele, vastupidised või mittelõplikud aknad lükatakse tagasi ja kõik diskreetimispoliitikad viiakse läbi ainult normaliseeritud intervalli sees. Saadud aken sisaldub valimi metaandmetes ja ebausaldusväärse kirjelduse eesliites, nii et allavoolu mudelid suudavad eristada keskendunud väljavõtet kogu ajajoonest.

Semantilise pealdise fookus on eraldiseisev, selgesõnaline seade. Vaikimisi `full` analüüsirežiim säilitab olemasoleva kaadriviipa ega edasta kunagi päringu teksti tiitrite mudelile. `focused` režiimis loeb sild ainult uusimat mittetühja kasutaja poolt loodud `text`/`input_text` samast vestluse või vastuste konteinerist, normaliseerib selle väärtuseks NFC, ahendab juhtmärgid ja tühikuid ning piirab selle 500 Unicode'i koodipunktiga. Tühi tulemus langeb tagasi täpselt `full` viipale. Kasutatav vihje jadatakse JSON -ks spetsiaalses ebausaldusväärse kasutaja konteksti plokis ja see võib seada esikohale ainult jälgitavad üksikasjad; see ei saa tühistada eraldi hoiatust meedias nähtavate või kuuldavate juhiste järgimise eest. Tekstiline fookus ei järelda kunagi `start`/`end` ega muuda ajalist proovivõtturit.

#### FU-07 struktuurse segmendi tõendid

`segment_aware` kasutab ühte piiratud eelanalüüsi läbimist juba kinnitatud kohaliku videovoo üle. Fikseeritud filtriahel ulatub esmalt maksimaalselt 320 piksli laiuseni, tuvastab stseeni muutused ja külmutatud intervallid, seejärel proovib 1 kaader sekundis hägususe, keskmise valgustugevuse ja spatial/temporal teabe jaoks. Pääs on piiratud 600 struktuurinäidise, ühe FFmpeg/filter lõime, sama `file` -only protokolli ja konteineri lubamisloenditega, 1 MiB protsessiväljundiga ja maksimaalselt 30 sekundiga maakleri jagatud abort/deadline. See ei võta kunagi päringust vastu käsku, filtrit, teed ega URL d.

Struktuuriväärtused on deterministlikud näidistõendid, mitte semantiline videomõistmine. Need ei järelda teemasid, tegevusi, pealdisi, kõnet ega kasutaja kavatsusi. Stseeni ja külmutamise piirid moodustavad segmente; katvuse külmutamine, hägusus, säritus, ruumilised üksikasjad ja ajaline muutus mõjutavad ainult seda, kuidas olemasolevat 1–16 kaadri eelarvet jaotatakse. Täielikult külmutatud segment on piiratud ühe kaadriga, samal ajal kui külmutamata segmendid võistlevad ülejäänud eelarve pärast. Kui piire ületab kaadreid, säilib ühtne ajaskaala katvus, nii et kiired varased kärped ei suuda varjata pikka lõpuosa. Stseeni piirid külmutuspiiri 1-sekundilise analüüsi eraldusvõime piires liidetakse.

Puuduvad filtrid, malformed/empty tõendid, detektori viga või piiratud eelanalüüsi ajalõpp ei vasta täpselt ühtsele keskpunktipoliitikale. Helistaja katkestamise või vahendaja tähtaja avamine ei õnnestu: see lõpetab lennu ajal toimuva alamprotsessi, takistab hilisemat kaadri väljavõtmist ja privaatne ajutine puu eemaldatakse `finally` st.

`scripts/perf/video-bridge-fu07-eval.ts` genereerib deterministlikke reaalseid FFmpeg seadmeid, et säästa pärast subtiitrite helistamist, tiheda liikumise eelarvejaotust, blur/exposure/SI-TI tõendeid, kiireid pika sabaga kärpeid ja järk-järgult hääbuvaid valepositiivseid tulemusi. See salvestab eelanalüüsi seina aja ja kui `/usr/bin/time` on saadaval, siis alam- CPU ja tipp- RSS. Selle kvaliteedikontrollid on ainult struktuurilised oraaklid. Tiitrite mudeli tegelik kvaliteet jääb `HOLD`, kuna sellel rakmel pole volitatud lõpp-punkti ega külmunud kohtunikku. Rahaline kokkuhoid jääb samuti `HOLD` välja arvatud juhul, kui `--caption-cost-per-call-usd` esitab selgesõnalist positiivset hinnangut kõne kohta; stsenaarium ei valmista kunagi kumbagi tulemust.

Iga kaader on piiratud 4 MiB, kõik töötlemata kaadrid kokku kuni 23 MiB ja järjestatud vahendaja vastus on 32 MiB. Privaatne ajutine kataloog eemaldatakse `finally`. OmniRoute ei komplekteeri FFmpeg ega aktsepteeri kohandatud käivitatavat teed. Enne pealdiste lisamist rakendab sild konservatiivset visuaalset dubleerimise pääsu: iga JPEG vähendatakse 16 × 16 halltoonides puhvriks ja seda võrreldakse ainult viimase säilitatud kaadriga. Kui taotletud subtiitrite eelarve on suurem kui üks kaader, pakub väljavõte piiratud kandidaatide kogumit, mille eelarve on kuni kaks korda suurem ja mitte kunagi rohkem kui 16 kaadrit. Taotletud ülempiir rakendatakse alles pärast dubleerimise eemaldamist, kusjuures esimesed ja viimased valitud kandidaadid säilivad lõpliku harvendamise ajal, kui eelarve on vähemalt kaks. Versioonitud `grayscale-16x16-mean-cells-v2` poliitika kasutab keskmisest luma deltast suuremat ja pisipildirakkude suhet, mille normaliseeritud delta on vähemalt 0,05. Duplikaatlävi on konstant 0,04, mis on valitud pigem prognoositavuse huvides, mitte käitusaja seadistusena. See teisene suure kontrastsusega signaal säilitab väikese liikumise ja nähtava teksti muutused, mida ainult keskmine võrdlus võib varjata. Võrdleja või dekoodri vead ei avane ja leviala jääb alles. Väljundmetaandmed eraldavad eraldatud kandidaadid, edukalt kasutatud kaadrid ja visuaalsed duplikaadid eemaldatakse.

Selgelt märgitud videoosa võib nõuda ajatempliga kontaktilehte. Sild ehitab maksimaalselt 4-sambalise, 16-raamilise JPEG võrgu. Iga 512-piksline lahter põletab oma lähteajatempli suure kontrastsusega alumisse riba, samas kui samad ajatemplid jäävad teksti metaandmetesse allavoolu seostamiseks ja auditeerimiseks. Täielik JPEG jääb 32 MiB piiriks. Kui `sharp` ei suuda dekodeerida või ruudustikku koostada, langeb sild tagasi üksikute JPEG kaadrite juurde; kliendi katkestamine levib endiselt lehetoimingu kaudu.

Edendamise tõendid on sihilikult sünteetilise koostise mikromõõdust eraldatud. `scripts/perf/video-bridge-contact-sheet-eval.ts` määratleb skeemiversiooniga A/B rakmed tõeliste OpenAI-ga ühilduvate nägemismudelite jaoks. See mõõdab pakkuja teatatud märke, seina latentsust (sealhulgas lehe koostist), mudelikõnede arvu ja manifesti määratletud faktide säilitamist. Toormudeli vastuseid aruandesse ei kirjutata; säilitatakse ainult SHA-256 kokkuvõtted ja sobitatud fakti IDs. Rakmed ei tee võrgu- ega tasulise mudeli kõnet, välja arvatud juhul, kui `--execute-real` on läbitud ja `--model`, `OMNIROUTE_BASE_URL` ja `OMNIROUTE_API_KEY` on konfigureeritud. Ilma selle selgesõnalise tegeliku käivitamiseta jääb selle masinloetav otsus `HOLD`; Sünteetilised payload/call-count mõõtmised üksi ei ole edendamise tõendid.

Eraldi `scripts/perf/video-bridge-promotion-eval.ts` kasutab FU-07 või FU-09 vaatlusi. Kampaaniale pääsemiseks on vaja kõiki kaheksat sünteetilist stsenaariumitüüpi pluss desinfitseeritud pärisklipp, vähemalt kolm mõõdetud kordust rolli ja juhtumi kohta, kõik kümme deklareeritud mõõdikut, külmutatud media/prompt/expected-fact/settings kokkuvõtted, unikaalne vaatlus IDs ja kontrollitud külvatud A/B järjekord. Täitmise kviitung seob korpuse kokkuvõtte, täpse kandidaadi SHA ja mudeli versiooni. Puuduvad või kehtetud mõõtmised jäävad `HOLD`, sealhulgas CPU üle 30 s, tipp RSS üle 512 MiB või eelanalüüs üle 30 s. Need on tõendite lubamise piirangud, mitte uus käitusaegne RSS jõustamisgarantii.

FU-07 nõuab vähemalt 98% kvaliteedi säilitamist ja p95 latentsust, mis ei ületa 1,2-kordset algväärtust, millele lisandub kas 0,05 absoluutse suurjuhtude vahel tasakaalustatud keskmine meeldetuletuse paranemine samaväärsete keskmiste subtiitrite kõnede korral või vähemalt 10% vähem keskmisi subtiitrite väljakutsumise järel. FU-09 nõuab vähemalt 0,85 kvaliteeti, 95% säilitamist, 20% keskmise latentsusaja vähendamist ja 10% märgi vähendamist. Kriitilise fakti kadu, süstimisvastavus või puuduv kasutamine takistab reklaamimist. Üks täitmine ei saa midagi edendada: `--previous-report` kinnitab sama policy/model revision/candidate/corpus. kahte erinevat, mittekattuvat, järjestikust sobilikku täitmist. Proovivõtukatse ei saa kinnitada kontaktilehe katset.

Kogujad peaksid vastuseid mällu hindama ja salvestama `responseDigest` pluss mõõdikud ja vaatlusseotused, mitte kunagi vastuseteksti. Tarbija loeb ka pärand tooreid tähelepanekuid, kuid ei kopeeri seda teksti kunagi oma aruannetesse. Iga vaatluse jaoks on aktsepteeritud täpselt üks `responseDigest` või `rawResponseText`. Versiooniga lubatud loend jääb muutumatu `hold` vaikeväärtusega tühjaks. Sobilik kirje nõuab tõendusviidet, poliitikat, mudeli versiooni, täpset kandidaadi SHA, manifesti kokkuvõtet ja kahte erinevat käitamist IDs; vastuolulised kontekstid lükatakse tagasi. Need metaandmed on auditi leping, mitte tõend, et viidatud fail sisaldab ehtsaid mõõtmisi. Enne mis tahes kirje lisamist vaadake üle tegelikud kviitungid. Haldusstatistika lõpp-punkt ja video armatuurlaud näitavad konservatiivset valmisolekut. Konfigureeritud mudeli pseudonüüm üksi ei määra selle versiooni ega töötavat kandidaati SHA, seega teatab praegune armatuurlaud `HOLD`, mitte ei kasutaks sobivust mõnest muust täitmiskontekstist. Eksperimentaalne valik jääb reklaamist eraldiseisvaks; vaikimisi ei muudeta automaatselt.

Helistajad võivad toetatud videoosale lisada valikulise `transcript.cues` massiivi, kui neil on juba joondatud tekst. Iga näpunäide peab sisaldama `text`, lõplikku `start`/`end` intervalli uuritava kestuse sees ja valgesse nimekirja kantud `source` (`client`, `embedded` või `audio-bridge`); `confidence` vaikeväärtus on `1` ja see peab jääma `0` ja `1` vahele. Täpsed korduvad vihjed on ahendatud. OmniRoute ei alusta kunagi nendest metaandmetest transkriptsiooni: kinnitatud näpunäited kopeeritakse kirjeldatud tulemusesse koos allika, usaldusväärsuse ja intervalliga ning renderdatakse ebausaldusväärsete vaatlustena koos kaadri pealdistega. Vale, vahemikust väljas või lähtekohata tekst lükatakse pigem tagasi kui segatakse subtiitrite voogu. Mõlemad päringuteksti transkriptsioonikanalid normaliseerivad `client` esitatud lähtekoha, sealhulgas enesekehtestatud `embedded` või `audio-bridge` sildid. Ainult serverile kuuluv adapter saab neid usaldusväärseid silte määrata ainult koodipõhise `trustedSource` argumendi kaudu; päringu JSON väli ei jõua selle argumendini. Sõltumata selle päritolust jääb transkriptsioonitekst ebausaldusväärseks meediast tuletatud sisuks ja see ei tohi kunagi määrata autoriseerimist.

Edasijõudnud helistaja võib pakkuda samale videole `audioTranscript` -raja; seda käsitletakse kliendi pakutava tekstina, mitte serveri transkriptsiooni tõendina. Fusiooniõmblus teostab visuaalseid ja helivaatlusi ühe tähtaja ja katkestamissignaali alusel, tellib need ühisele ajajoonele, ahendab täpsed duplikaadid ja teatab osalise tulemuse, kui ainult üks pool õnnestub. Kehtetu `audioTranscript` taandub osaliseks tulemuseks — visuaalne kirjeldus jäetakse alles ja heliharu salvestab terve video ebaõnnestumise asemel puhastatud tõrkekoodi —. Harupõhine saadavus, osaline lipp ja puhastatud tõrkekoodid säilitatakse kirjeldatud tulemuses, kaitsepiirde metaandmetes (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), tulemuste vahemälu metaandmetes ja silla fusiooniloendurites. Video Bridge'i vaiketee ei kutsu kõnet tekstiks ega laadi alla teist meediumikoopiat; ilma selle selgesõnalise rajata jääb see ainult videoks.

**Transkriptsiooni säilitamine (#12150 P1).** See kehtib automaatselt iga kord, kui Video Bridge (ise lubatav) renderdab ärakirja — puudub eraldi säilituslipp. Kui päring renderdab mis tahes transkripti viite (helistaja poolt deklareeritud `transcript` või ühendatud `audioTranscript`), märgib kaitsepiirde selle `videoBridgeObserved` ja loob videokirjelduse — redigeeritud varju identse renderduse, milles iga vihje vabatekstiline keha asendatakse `[redacted-video-transcript]`, mis on ehitatud enne stringne asendamise teel. lamestatud tekst, nii et ükski vihje sisu — vastandlik või tavaline, sealhulgas `]` sisaldavad kehad, nagu `[inaudible]`/`[music]` — ei saa ellu jääda). Püsiva kõnelogi päringu keha vahetab iga videost tuletatud tekstiosa selle redigeeritud varju vastu, sobitades sisu võrdsusega; `fullText` ankur loetakse uuesti valmis kõneeelse kaitsepiirde kasulikust koormusest, nii et vaste õnnestub ikkagi pärast seda, kui hilisemad keti kaitsepiirded ( PII ja mandaadi maskeerijad, prioriteedid 10/95) kirjutavad kirjeldusteksti paika ja pärast system-prompt/handoff/memory süstimist sõnumimassiivi ümber kujundavad. Mudelile ülesvoolu saadetud kere on muutumatu. Täheldatud päring ei sisalda ka püsivat mälu (nii päringu kui ka vastusest tuletatud ekstraktimine jäetakse vahele), seega ei saa mudeli enda vastus transkriptsiooni teksti mällu kajada.

**Toorvideoväljad (#12430).** Kui sild on lubatud ja natiivne videotugi on tundmatu või puudub, aktiveerivad määratletud `transcript`/`audioTranscript` väljad ka `videoBridgeObserved` isegi pärast kirjelduse ebaõnnestumist või `maxVideos` piirangut. `null` ja tühjad stringid loevad; puuduvad väljad ja mitte-video metaandmed seda ei tee. Säilitatud koopiad redigeerivad need väljad või jätavad taotluse välja ja caches/Memory jäetakse mööda.

Nendel varuteedel muutuvad kehtivad helistaja näpunäited toetatud `text`/`input_text` osadeks, mitte mittestandardseteks pakkujaväljadeks. Mõlemad päringuga esitatud lood jäävad ebausaldusväärseteks `client` vaatlusteks koos selgesõnalise hoiatusega, et videot ei kirjeldatud ja ajatempleid ei kontrollitud meedia suhtes. Olemasolevad 256-cue/64-KiB kogu- ja tähisepõhised eelarved kehtivad kahele rajale koos; ajatemplid peavad sobima maakleri 600-sekundilise ülemmäära ja mis tahes kaasasoleva fookusaknaga. Kehtetud rajad visatakse kõrvale, mitte ei edastata suvalise tekstina; kehtivat õde-venda võib siiski kasutada, kui nende kogueelarvet ei ületata. Null/empty väljad ei lisa teksti. See varu ei lisa meediumitoomist ega transkriptsiooni. Transkriptsioonilaiendi väljad eemaldatakse varuvideokandjast ja selle `video_url`/`source` objektidest. OpenAI juhtme lubade loend jääb rangeks; Tundmatud videokandjad jäävad kättesaadavaks ja teadaolevad ainult tekstisihtmärgid hoiavad turvalisi markereid. Struktureeritud redigeerimisvarjud kaitsevad lisatud ärakirja teksti, samas kui algne helistaja päring jääb muutumatuks. Native-toega sihtmärgid ja puudega sillad säilitavad oma olemasoleva möödasõidukäitumise.

Täiendavad säilitatud koopiad kasutavad sama vaadeldava taotluse signaali. Toores kaitsepiirde-eelne kliendipäringu hetktõmmis, mälus olev ootel päring ja varajase tagasilükatud taotluse logi asendavad struktuurselt videoosade transkriptsioonivälju; konveieri etappide ja konteksti üleandmise kaudu sünteesitud stringiviibad redigeeritakse püsitaotluse keha valamu juures. Püsiv `video_content_removed` marker muudab `previous_response_id` jätkamise ebaõnnestumise, selle asemel, et taastada teksti, mis oli tahtlikult ära visatud. Kui vaadeldud päring kaotab osade kaupa redigeerimisvarju enne logimist või isegi üks mitmest videovarjust ei ühti pärast hilisemaid päringu mutatsioone, jäetakse osaliselt redigeeritud transkripti säilitamise asemel säilitatud päringu põhiosa täielikult välja.

Vaadeldud päringu puhul võib mudeli vastus tsiteerida ärakirja mis tahes osa ilma struktureeritud vihjepiirita. Selle püsiv kõnelogi `responseBody` on seetõttu asendatud väljajätmise markeriga; üksikasjalikku torujuhtme artefakti (mis võib sisaldada upstream/client kehasid ja voojuppe) ei säilitata. Semantiline, idempotentsus ja arutluskäikude taasesitamise vahemälu ignoreerivad selle päringu lugemist ja kirjutamist. Pakkuja päring ja kliendile nähtav vastus jäävad muutumatuks. Kui detailne artefakt jäetakse välja, tühjendatakse ajutisest puhvrist varajased säilitusbaidid. Kiro vigane EventStream hoiatus teatab ainult kasuliku koormuse baitide arvu, mitte kunagi selle sisu ega JSON parseri töötlemata viga. See ei väida, et iga sõltumatu provider/plugin -diagnostika on auditeeritud; laiemat retented-sink pühkimist jälgitakse #11658.

Sisemine `/api/modality-bridge/video/drilldown` elutsükkel on eraldiseisev loopback/token-authenticated vahemälu substraat. Iga toiming nõuab ka kanoonilist läbipaistmatut printsiipi ID. Enne tootmishelistaja lubamist peab see tuletama selle ID autentitud rentnikult ega tohi kunagi edastada kliendi valitud väärtust. Vahemälu võtmed seovad selle printsiibi kanoonilise seansi ja videoviite IDs, salvestavad ainult nende SHA-256-derived võtmed ja hõlmavad nii lugemist kui ka kustutamist samasse printsiipi. Vahemällu salvestatakse kuni 16 tuletatud JPEG kaadrit sisestuse kohta, aegub need kümne minuti pärast ja see toetab piiratud `start`/`end` lugemist või selgesõnalist seansi kustutamist.

Iga printsiip on piiratud 16 kirjega ja 64 MiB kanooniliste JPEG andmetega. Need piirangud ei sõltu globaalsest 64-entry/256 MiB ülemmäärast: printsipaali kvoodi surve tõstab enne globaalse LRU väljatõstmise kaalumist välja ainult selle printsipaali kõige vähem hiljuti kasutatud kanded. Aegunud kanded pühitakse nii põhi- kui ka globaalsest vahemälutegevuse arvestusest, samas kui tühistamise ja kinnitamise ebaõnnestumine ei too kaasa osalist asendamist.

Vahemälu lükkab tagasi mittekanoonilise Base64, liigse polsterduse, mitte-JPEG-meediumi, väära vorminguga või kärbitud JPEGs ja JPEGs, mis annavad hoiatuse piiratud täispildi `sharp` dekodeerimisel. See kodeerib iga aktsepteeritud kujutise uuesti kanooniliseks JPEG, tuletab helistajaväljade usaldamise asemel dekodeeritud baitidest laiuse ja kõrguse ning jätab need allesjäämise asemel kõrvale kõik järgnevad polüglotibaidid. Mõlema kvoodi alla arvestatakse ainult piiratud kanoonilist tihendatud puhvrit. JSON juhtmepiirang sisaldab Base64 üldkulusid 32 MiB dekodeeritud sisendiga lae jaoks. Iga salvestatud tuletis salvestab selle kinnitatud JPEG format/resolution, proovivõtupoliitika, tuletamisversiooni, loomise aja, serveri poolt arvutatud sisu räsi ja räsi vanemaviide pluss usaldusväärse helistaja põhisisu räsi. Tühistamist kontrollitakse asünkroonsete decode/hash faaside vahel enne aatomi vahemälu sidumist.

Tootmistootja kasutab juba tuletatud maakleri kaadreid uuesti alles pärast edukat visuaalset analüüsi, ilma teise videota download/extraction. See nõuab operaatorit `modalityBridgeVideoDrilldownEnabled=true`, ranget osade kaupa `drilldown: true` ja autentitud API-võtme kirjet ID. Kliendi deklareeritud principal/session väärtused ei määra kunagi omandiõigust. Ilma kõigi kolme tingimuseta see ei räsi, ei muuda nende suurust ega säilita täiendavaid kaadreid. Säilitamise ebaõnnestumine säilitab kasutatava visuaalse vastuse. Nõusolekutaotlused mööduvad kogu video tulemuste vahemälust, nii et vahemällu salvestatud tulemusi ei esitata kunagi uuesti.

Edukad JSON ja SSE vastused paljastavad piiratud `x-omniroute-video-drilldown` päises kuni neli läbipaistmatut käepidet. Volitatud brauseri päritolu saavad seda päist lugeda ilma CORS päritolupoliitikat laiendamata. Uued käepidemed kasutavad `v1.<32-byte random base64url token>` ja register säilitab ainult nende SHA-256 räsi. reader/header parser aktsepteerib ka pärand-64-kuueteistkümnendmärke. Autenditud avalik tarbija on `GET /api/v1/video-bridge/drilldown?handle=...`, mida piirab sõltumatult `modalityBridgeVideoDrilldownRemoteEnabled=true`. Selgesõnaline püsiv vale tühistab juurdepääsu isegi siis, kui `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env pärandvaru on lubatud. Tootmise säilitamisel on analoogne pärand `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` tagavara. Mõlemad varud on vaikimisi välja lülitatud.

Tarbija saab autentitud võtme omandiõiguse ja rakendab võtmepoliitikat: nii GET kui ka DELETE kuuluvad `video` lõpp-punkti kategooriasse, sealhulgas `/v1` ja `/api/v1` varjunimed. Võtmed, mille lõpp-punktide lubade loend ei ole tühi, peavad sisaldama `video`; piiranguteta võtmed jäävad ühilduvaks. Tarbija tagastab sama 404 tundmatu, aegunud ja mõne teise võtme käepidemete eest. See aktsepteerib `variant=preview|standard|detail` (maksimaalne JPEG mõõde 320/640/1280, mitte kunagi suurendatud), `limit=1..8` (või pärand `frames` pseudonüüm, mitte kunagi mõlemat), nullpõhine `page` ja valikulised `start`/`end` teravustamissekundid. Dubleeritud päringuklahvid ja pööratud fookuse aknad lükatakse tagasi. Igal tagastatud variandil on selle tegeliku sisu ja tegeliku eraldusvõime metaandmete räsi, mis on lingitud säilitatud allikaga. Variandid tuletatakse lugemisel, mitte salvestatakse täiendavalt säilitatud koopiatena. JSON vastus, sealhulgas Base64/envelope, on piiratud väärtusega 32 MiB; liiga suur leht tagastab 413 ja klient peab taotlema vähem kaadreid. Loeb iga suuruse muutmise ümber oleva kontrolli tühistamise ja kontrollib enne naasmist uuesti käepideme kehtivust. `DELETE` omaniku järgi on idempotentne; kustutamine või TTL aegumine vabastab säilitatud allika ja kasutusarvestuse.

Jagatud pood on protsessi kohalik: käepidemed aeguvad taaskäivitamisel ja neid ei saa sõltumatute OmniRoute protsesside vahel üle kanda. Haldusstatistika näitab tõhusat säilitamis-/kaugpoliitikat ja koondab ainult säilitatud entries/bytes, mitte kunagi meediat, viiteid, peamist IDs ega käepidemeid. Videoseadete paneel näitab neid väärtusi ja võib säilitada mõlema nõusoleku lüliti. See rakendusdokumentatsioon ei ole reaalajas juurutamise ega reklaamimise tõendusmaterjal; reaalse mudeli vastuvõtmist jälgitakse eraldi.

Kaadrite pealdised on järjestikku koos konfigureeritud videomudeliga. Tühi Video alistamine pärib sätte Vision; kui mõlemad on tühjad, valib Visioni automaatruuter tõhusa nägemisvõimelise mudeli. Edukad pealdised asendavad algse osa stabiilse `[Video description:` eesliitega, mis märgib teksti ka kui ebausaldusväärset meediast tulenevat vaatlust ja käsib allavoolu mudelitel mitte järgida meedias leiduvaid juhiseid. Raami-tiitrite vahemäluklahvid hõlmavad JPEG baite, viipa, ajatemplit ja efektiivset mudelit; vahemällu salvestatakse ainult edukad subtiitrid. Vahemälu kirjed säilitavad tegeliku eduka tootja mudeli, sealhulgas varumudeli; sild teatab `mixed` kui erinevad mudelid valmistasid erinevaid raame. Vahemälu tabamus kasutab seda tootja identiteeti uuesti, selle asemel et sildistada see uuesti taotletud marsruutimisplaaniks. Kogu video tulemuste vahemälu on sisestatud igasse sisendisse, mis muudab väljundi — viipa, tõhusat mudelit, diskreetimise poliitikat, kaadrite arvu, semantilise analüüsi režiimi, normaliseeritud fookuse vihje SHA-256 sõrmejälge, fookuse akent, `transcript`, `audioTranscript` ja kontaktilehe lippu —, nii et nende mõõtmete muutmine ei ole kunagi vahemälu väärkasutus. Visuaalne dedup poliitika versioon, lävi ja piiratud kandidaatkaadrite arv on samuti selgelt väljendatud tulemuste vahemälu võtmes ja metaandmetes; poliitika muudatus ei saa seetõttu taaskasutada aegunud kogu video kirjeldust. Tulemuste vahemälu v4 metaandmed säilitavad režiimi ja sõrmejälje, mitte kunagi töötlemata kasutaja ülesannet. Guardraili metaandmed kajastavad nii nõutud kui ka tõhusaid analüüsirežiime; taotletud `focused` -režiim ilma kasutatava kasutajatekstita teatatakse tõhusalt `full`.

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

Pärand püsiv Video ajalõpu väärtused, mis on suuremad kui 120 sekundit, on fikseeritud maakleri tähtajaga; uued seaded kirjutab üle, et limiit lükatakse tagasi. `GET /api/modality-bridge/video/runtime` nõuab enne autentimist või käitusaegset kontrollimist usaldusväärse templiga tagasisilmuse asukohta, seejärel nõuab see haldusautentimist. See tagastab ainult `available`, puhastatud FFmpeg/ffprobe versioonid ja fikseeritud põhjuse, kui käitusaeg pole saadaval. Sisemine väljavõtte lõpp-punkt ei ole avalik üleslaadimine API: järjekorra küllastus tagastab `503` pluss `Retry-After`, helistaja lahtiühendamine tagastab `499` ja maakleri fikseeritud tähtaeg tagastab `504`. Teisendatud vastused lisavad `video->text;model=<visionModel>;parts=<videos>` kesksele `x-omniroute-modality-bridge` päisele ilma nägemis- või helisegmente eemaldamata.

### PII masker (`piiMasker.ts`)

Jookseb edasi** mõlemad** etapid.

- **`preCall`** kloonib kasuliku koormuse, kõnnib `system`, `messages`, `input` ja `prompt` (kaasa arvatud tavalised stringid) ning rakendab `processPII()` (alates `@/shared/utils/inputSanitizer`) stringi `content`/`text` väljadele. Kui `PII_REDACTION_ENABLED=true`, redigeeritakse tuvastatud PII väljuvas kasulikus koormuses. See ei sõltu `INPUT_SANITIZER_MODE` (mis juhib ainult viipe sisestamise poliitikat). Kui redigeerimine on välja lülitatud, salvestab kõne tuvastusloendeid sisu ümber kirjutamata.
- **`postCall`** sügavalt kloonib vastuse, käivitab `sanitizePIIResponse()` pluss Responses-API-kuju maskeerija (`maskResponsesOutput` — hõlmab `output_text` ja `output[].content[].text`). Redigeerimise korral asendab muudetud vastus originaali.

Kaitsepiire ei blokeeri kunagi; see ainult märgib (`meta.detections`, `meta.redacted`) või kirjutab ümber.

**Pööratav võlv (`PII_REVERSIBLE_VAULT_ENABLED`, vaikimisi `false`).** Kui nii `PII_REDACTION_ENABLED` kui ka `PII_REVERSIBLE_VAULT_ENABLED` on sisse lülitatud (DB alistab > env > vaikimisi, loetakse üks kord päringu kohta), avab `handleChat` ühe hoidla kliendipäringu kohta (`src/lib/pii/requestTokenVaultScope.ts`) ja edastab selle kõneeelsele pääsmele kui `GuardrailContext.tokenVault`. Seejärel kirjutab maskeerija `[EMAIL_REDACTED]` asemel asendusmärgid, näiteks `<<PII_EMAIL_QWERTYUI_1>>`, nii sisseehitatud, kinnitatud (GDPR/POPIA) kui ka kohandatud reeglite jaoks. Nonce on 8 juhuslikku suurtähte päringu kohta ja sama väärtus saab päringus sama märgi. Ainult maskeerija rahapaja: kiire sissepritsekaitse ja `/api/guardrails/test` töötavad ilma võlvita ja hoiavad kohahoidjaid.

- Pakkuja, iga kombineeritud jalg, korduskatse, liitpaneeli liige ja fusioonikohtunik näevad ainult märke. Märgid taastatakse üks kord, 2xx vastusel, mis jätab `handleChat`: parsitud SSE välja kohta (sündmuste vahel jaotatud märk laheneb ikka; tööriistakutsingu argumendid on JSON-pakendatud) või JSON keha välja kohta koos ümberarvutatud `Content-Length`. Sisu- ja põhjendustekst ning tööriistakutse argumendid taastatakse. Veakehad (4xx/5xx) hoiavad märgid alles.
- Vead jäävad privaatseks: kui vermimine ebaõnnestub või varahoidla keeldub väärtusest (1000 kirjet, 256 tähemärki väärtuse kohta, kokku 64 KB ), kirjutatakse selle asemel kohahoidja; märk, mida võll ei suuda lahendada, või taastamine, mis ebaõnnestub, jääb sõnasõnaliseks ja logitakse ainult loendus. Võlv ei mahuta taimereid ega globaalset olekut; see kustutatakse, kui vastusevoog lõpeb, tühistatakse või esineb tõrkeid.
- Kui päring vermib märke, jäetakse vahele mälu ekstraheerimine, idempotentsuse salvestamine ja mõlemad semantilise vahemälu kirjutamised, kuna ükski hilisem päring ei suuda neid märke lahendada. Kõnelogides kannavad pakkuja päring ja vastus märgid; logitud kliendipäringu keha on endiselt kliendi töötlemata sisend, nagu tavalise redigeerimise puhul.
- Tokenid kasutavad päringujärgset juhuslikku nonce'i, nii et viipa eesliide muutub igal pöördel: pakkujapoolne viipade vahemällu salvestamine ei tabata maskeeritud pöördeid ja hilisemas pöördes tagasi tulev märk (näiteks `previous_response_id` kaudu) kuulub vanale päringule ja jääb sõnasõnaliseks.

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

Kõik kolm nõuavad haldamise autentimist ja kinnitavad keha Zod ga (`src/shared/validation/schemas/piiSettings.ts`). Kui sisselogimine on keelatud (`requireLogin=false`), on `GET` ja test lõpp-punkt avatud, kuid `PUT` vajab siiski armatuurlaua seanssi, `manage` -scope API võtit, `oma_` pääsuluba, millel on kirjutusulatus või suurem, või tagasisilmuse kaudu saadetud CLI -luba või siseteenuse luba.

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

Kuna ainult numbrilised vormingud põrkuvad järjekorranumbrite, järgunumbrite ja ajatemplitega, vajavad nõrgemad vormingud (`za_vat`, `za_tax_ref`) märksõna näpunäidet ja tühja kümnekohalist `0..` numbrit ei käsitleta Lõuna-Aafrika telefoninumbrina. Tühikutega IBANs (`GB29 NWBK ...`) ei sobita. Voogesitusteel vaadatakse vihjet ainult praeguse tüki seest. ID-d asuvad üldiste telefonimustrite ees, seega säilitab kinnitatud identifikaator oma kohahoidja (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Mallid `gdpr` ja `popia` valivad vastavalt EU ja Lõuna-Aafrika ID-d. Maskeerimine jääb valikuliseks (Hard Rule #20): siin ei muuda miski funktsioonilipu vaikeväärtust.

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

**Skannimine seotud (v3.8.20):** detektor kontrollib ainult** esimesed 16 KB** ühendatud viipa tekstist — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 baiti) `src/shared/utils/inputSanitizer.ts`. Nii `detectInjection()` kui ka `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` enne mustritsükli käivitamist. Sisestusjuhised asuvad sisendi ülaosas, nii et see piirab mitmesaja KB suuruste kasulike koormuste korral regex CPU/GC ilma tuvastamist nõrgendamata (vrd #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Jookseb edasi** mõlemad** etapid, vaikeahela viimane (prioriteet `95`). Eemaldab väljaminevast kasulikust koormusest tuntud API-võtme / salajase märgi mustrid (sõnumi sisu, tööriista kutsumise argumendid, tööriista tulemused)** ja** teenusepakkuja vastus, nii et viipasse kleebitud (või tööriista tulemusega kajatud) mandaati ei lekitata ülesvoolu pakkujale ega tagasi kliendile.

- **Ainult lubamine** , sama konventsioon mis PII redigeerimisega (Hard Rule #20-adjacent): keelatud, välja arvatud juhul, kui `settings.credentialRedactionEnabled === true`** või** `CREDENTIAL_REDACTION_ENABLED=true`. Kui see on välja lülitatud, on kaitsepiire mittetoimiv — see ei blokeeri ega kirjuta kunagi ümber.
- `redactCredentials()` kõnnib kogu payload/response puu (`walkValue()`, prototype-pollution-safe, cycle-safe via `WeakSet`) ja asendab vasted `[REDACTED:<type>]` kohahoidjaga, kloonides ainult tegelikult muutunud oksad.
- `CREDENTIAL_PATTERNS` hõlmab LLM pakkuja võtmeid (OpenAI, OpenAI-proj, Anthropic, Google, Kallistav nägu, Replicate ), VCS/SaaS märke (GitHub, Slack, Lineaarne, Notion, npm, Postimees, Discord), maksevõtmeid (AWS võti (Strki võti , SendGrid, Mailgun), privaatvõtmed / JWTs, mandaadi kandvad ühendusstringid (`mongodb://user:pass@...` jne) ja üldine `Authorization`/`x-api-key`/`api-key`/`apikey` päiseväärtuste muster. Päisekujulisi klahve (`authorization`, `x-api-key`, `api-key`, `apikey`) redigeeritakse pigem struktuuriliselt (ainult väärtus, skeemi eesliide nagu `Bearer `/`Basic ` säilinud), mitte üldise teksti regexi kaudu.
- Sildi taga `auth_token` väärtus maskeeritakse isegi siis, kui sellel pole pakkuja eesliidet: `DB_PASSWORD=…`, `AWS_SECRET_ACCESS_KEY=…`, `client_secret: …`, `?api_key=…` (sildid: `password`, `passwd`, `secret`, `secret_key`, `secret_access_key`, `api_key`, `access_token`, `refresh_token`, mis tahes `DB_`-eesliitega). Silt ja eraldaja jäävad alles ning väärtuseks muutub `[REDACTED:secret]`. Väärtus vajab 12 või enamat tähemärki, nii et proosa, näiteks `password: required` jääb loetavaks; väärtus, mis algab tähega `$` või `%` (muutuja viide), jäetakse üksi.
- Kaitsepiire ei blokeeri kunagi; see ainult kirjutab ümber (`modifiedPayload` / `modifiedResponse`) ja märgib (`meta.credentialsRedacted`, `meta.count`).

Regressioonikaitsja: `tests/unit/credential-masker-guardrail.test.ts`.

### Agent Guard (`agentGuard/`)

Agendivalvur liigitab kliendi päringu taha `claude` või `anthropic` pakkujale selle päistest. `AGENT_GUARD_MODE` võtab kolm väärtust: `off` (vaikimisi), `monitor` ja `block`. `off` puhul ei loeta päist ega logita midagi.

Ametlikud esindajad tunnevad ära nende päiste järgi (võrreldes tõstutundlike):

- Claude kood: `User-Agent` mis algab tähega `claude-cli/` või `claude-code/`, või `x-app: cli` koos `anthropic-beta` päisega või `User-Agent`, mis sisaldab `claude`.
- Anthropic SDKs: `User-Agent` mis algab tähega `Anthropic/`, `AsyncAnthropic/`, `anthropic-typescript/` või `anthropic-python/`.

Logija vaikimisi tootmistase (`info`) näitab mõlemat tüüpi ridu. `APP_LOG_LEVEL=warn` ga jäävad alles ainult teadaolevad kolmanda osapoole read.

Logiväljad: `agent`, `thirdParty`, `provider`, `model`, `apiKeyId`, `userAgent`, `xApp`, `anthropicBeta`, `xTitle`, `referer`, `stainless`. Päise väärtused ja mudelistring on piiratud 200 tähemärgiga. Viitaja logitakse ilma selle päringustringi, fragmendi ja kasutajainfota. Klahvi API, `Authorization`, `x-api-key` ja küpsiseid ei loeta kunagi.

Failid: `src/lib/guardrails/agentGuard/classifier.ts`, `src/lib/guardrails/agentGuard/policy.ts`, `src/lib/guardrails/agentGuard/guardrail.ts`, `src/lib/guardrails/agentGuard/settings.ts`, `src/lib/guardrails/agentGuard/logLine.ts`, `src/lib/guardrails/agentGuard/enforcement.ts`, `src/sse/handlers/chat/agentGuardGate.ts`.

**Klassifitseerimispiirangud (mõlemad režiimid):**

- Agent, mis on üles ehitatud ametlikule SDK, mis ei saada `X-Title`, `HTTP-Referer` ega oma `User-Agent` näeb välja nagu SDK. `x-stainless-*` päised üksi ei tee klienti ametlikuks.
- Kolmandate osapoolte agentidele vastavad `User-Agent`, `X-Title` ja `HTTP-Referer` (või `Referer`) täissõna märgid. Registreerimata kliendid kuvatakse kui `unknown`.
- Brauseripõhiste klientide päringud kannavad brauseri enda `User-Agent` ja kuvatakse identifitseerimata, välja arvatud juhul, kui `X-Title` või viitaja kannab teadaolevat kolmanda osapoole luba.
- Üks logirida vaadeldud päringu kohta: oodata helitugevust hõivatud eksemplaridel.

#### Monitor

Funktsiooniga `AGENT_GUARD_MODE=monitor` liigitatakse päringud, mille mudelistring nimetab `claude` või `anthropic` pakkujat nende kliendipäiste järgi. Kui klient ei ole ametlik agent, kirjutatakse üks logirida koos `tag: "AGENT_GUARD"`. See on `warn` teadaoleva kolmanda osapoole agendi jaoks ja `info` tuvastamata kliendi jaoks. Prioriteetne `1`: kaitsepiire loeb ainult päiseid ega muuda kunagi kasulikku koormust, seega jookseb see enne meediasilda. `monitor` ei blokeeri kunagi.

**`monitor` piirangud:**

- Iga signaal on kliendi juhitav päis. See on vaatlus, mitte juurdepääsukontroll.
- Enne mudeli lahendamist loetakse mudelistringist pakkuja: `provider/model`, pakkuja pseudonüüm, näiteks `cc/…`, ja kvoodijagamise ID-d (`qtSd/<group>/<provider>/<model>`). Palja mudeli ID-sid, mudeli varjunimesid, kombinatsioone ja hilisemat marsruutimise normaliseerimist ei järgita. Neid taotlusi ei järgita.
- Helistaja saab selle päringu alusel registri keelamiskanalite kaudu vahele jätta (vt [Guardrailside keelamine päringu kohta](#disabling-guardrails-per-request) ). Vahelejäetud taotlusi ei järgita.
- See töötab ainult seal, kus jookseb `runPreCallHooks` (vt [Katvus ja piirangud](#coverage-and-limits) ).

#### Blokeeri

`AGENT_GUARD_MODE=block` puhul ei tee kõneeelse kaitsepiire midagi. Selle asemel teeb vestluse töötleja otsuse:

1. Otsus tehakse siis, kui sihtmärk on saatmas, teenusepakkuja järgi, kellele taotlus lahendati. Kaetud on pakkuja varjunimed, tühjad mudeli ID-d, kvoodijagamise ID-d ja kõik kombineeritud sihtmärgid.
2. See ei tööta kaitsepiirde registris, seega ei kehti päringupõhised keelamiskanalid.
3. Tuntud kolmandast osapoolest agent keeldutakse. Tundmatu klient logitakse sisse nagu `monitor` sse ja keeldutakse ainult `AGENT_GUARD_STRICT=true`. Claude koodist ja ametlikust Anthropic SDKs ei keelduta kunagi.
4. Keeldumine on HTTP 403 koos `error.type` `permission_error` ja `error.code` `client_agent_not_allowed`. Keha on OpenAI-stiilis viga. Antroopse vormingu taotluste korral kannab see tipptasemel ka `type: "error"`. `Retry-After` päist pole ja keeldumine tagastatakse enne voogu algust.
5. Keeldumine ei ole teenusepakkuja ebaõnnestumine. See ei puuduta teenusepakkuja kaitselülitit, ühenduse jahtumist ega mudeli lukustusi.
6. Kombinatsioonis jäetakse keeldutud sihtmärk vahele ja ülejäänud sihtmärgid jooksevad. Taotlus nurjub poliitikavea tõttu, kui vähemalt ühest sihtmärgist keelduti ja ükski sihtmärk ei pääsenud valvurist mööda. Kombo säilitab oma vea, kui tipptaseme kirje nimetab teise tuntud pakkuja eesliite või toimingu pakkuja ID järgi. Keeldutud prioriteediga sihtmärk `fallbackOnlyOnQuotaExhaustion` jäetakse samamoodi vahele ja see ei peata kombinatsiooni. Varisihtmärki kontrollitakse ja logitakse, kuid seda ei loeta kunagi valvurist mööda pääsenud sihtmärgiks.
7. `fusion` kombo ebaõnnestub enne vaekogu kokkuleppimist, kui kohtunikule, keda fusiooniteenus kasutab, keeldutakse. See kohtunik tuleneb kombinatsiooni konfiguratsioonist või globaalsetest kombineeritud vaikeseadetest. Sama kontroll käitatakse ka siis, kui turvavõrgu ümbersuunamise kaudu jõutakse liitmise kombinatsioonini.
8. Üks logirida päringu ja pakkuja kohta, `tag: "AGENT_GUARD"`, `warn` keeldumise jaoks ja samad väljad mis `monitor`.
9. Sisemise vea korral kaitse ei avane. Taotlus läheb edasi ja üks `warn` rida `agent guard failed open` logitakse.

**`block` piirangud:**

- Iga signaal on kliendi juhitav päis. Klienti, kes saadab `User-Agent: claude-cli/…`, käsitletakse Claude koodina. `block` hoiab ära muutmata kolmanda osapoole agendid. See ei ole juurdepääsu kontroll.
- Puhverserver, mis eemaldab identifitseerivad päised, muudab iga kliendi tuvastamatuks. Sellist klienti teenindatakse ilma `AGENT_GUARD_STRICT` ja sellega keeldutakse. Käivitage valvur eksemplaril, mis on klientidega silmitsi. Teine OmniRoute eksemplar esimese taga näeb esimese päiseid.
- `AGENT_GUARD_STRICT` keeldub kõigist nende pakkujate klientidest, kes ei ole Claude kood ega ametlik SDK. See hõlmab brauseripõhiseid kliente ja armatuurlaua mänguväljakut. Armatuurlaua kombineeritud reaalajas test on vabastatud, ka turvavõrgu ümbersuunamise kaudu.
- Mõned funktsioonid koostavad oma vestlustaotluse, selle asemel, et kliendi taotlust edasi anda. Neli neist saadavad selle tagasi OmniRoute `/v1/...` marsruutide kaudu:
  - partiitööd (`src/lib/batches/dispatch.ts`)
  - MCP järeldustööriistad (`open-sse/mcp-server/tools/inferenceTools.ts`)
  - A2A nutikas marsruutimine (`src/lib/a2a/skills/smartRouting.ts`)
  - nägemissild , kui see kirjeldab pilti läbi OmniRoute (`src/lib/guardrails/visionBridgeHelpers.ts`)
- Telegram vestluse puhverserver (`src/lib/telegram/chatProxy.ts`) koostab oma päringu protsessis ja helistab otse vestluse töötlejale.
- Need sisemised päringud kannavad OmniRoute enda päiseid, mitte need käivitanud kliendi päiseid. Valvur liigitab nad tundmatuteks klientideks.
- Ilma `AGENT_GUARD_STRICT` edastatakse need sisemised päringud valvatud teenusepakkujatele, olenemata sellest, kes oli algne klient. Nende kaudu Claude jõudnud kolmandast osapoolest agenti ei keelduta.
- `AGENT_GUARD_STRICT` puhul lükatakse need sisemised päringud tagasi valvega pakkujatele, kes need käivitasid, kaasa arvatud Claude kood.
- Piiratakse ainult päringud, mis läbivad vestluse töötleja. Mudeli valideerimine (`src/lib/modelValidation/runner.ts`) kutsub otse päringu tuuma ja seda ei piirata.
- Kaetud on ainult `claude` ja `anthropic` pakkujad. Claude mudelid, mida teenindab teine pakkuja, ei hõlma ega ka `claude-web` pakkuja.
- Mõned kombinatsioonid nimetavad ülejäänud sihtmärke ilma pakkuja eesliiteta, mudeli ID-deks või pesastatud kombinatsioonidena. Kui need sihtmärgid pole mitteseotud põhjusel (avatud kaitselüliti, jahtumine, lukustus) saadaval, nurjub taotlus poliitikavea tõttu.
- Vahele jäetud kombineeritud sihtmärk tühjendab selle sihtmärgi viimase teadaolevalt hea tihvti, nagu teeb iga vahelejäetud sihtmärk.
- Valvatud teenusepakkuja eesliitega fusioonikohtunik keeldutakse enne vaekogu käiku. See hõlmab `anthropic/…`, `claude/…`, pseudonüümi (nt `cc/…`, konteksti järelliidet (nt `[1m]`) ja nende pakkujate kvoodijaotusnimesid.
- Fusioonikohtunikust, mis on kirjutatud tühja mudeli ID-na või mudeli varjunimena, mis lahendatakse valvega teenusepakkujana, keeldutakse ainult siis, kui see saadetakse. Paneel on selleks ajaks juba töötanud. Kohtuniku nimetamine selle pakkuja eesliitega väldib seda. Ükski kohtuniku õigekiri ei jõua valvatud pakkujani keeldumata.
- Eelkontroll keeldub konfigureeritud Claude kohtunikust isegi siis, kui fusiooniteenus jätab selle kohtuniku tööajal maha. Teenus jätab maha kohtuniku, mille operaator varjas, ja kohtuniku, kes ei saa päringu meediat vastu võtta. Teine juhtum hõlmab kinnitamata nägemise toetamist ja muud meediat, mida kohtunik ei aktsepteeri. Mõlemad kombineeritud teed käituvad nii.
- Turvavõrgu ümbersuunamisel saab kombineeritud teenus tühjad sätted. Ainult globaalsetes kombineeritud vaikesätetes määratud kohtunikku ei kasutata seal kunagi.
- Kui `block` on sisse lülitatud, ei kasuta klient, kellele valvur valvega teenusepakkuja puhul keelduks, külgkorvi kiirteed ühegi mudeli puhul. `AGENT_GUARD_STRICT` all on see iga tuvastamata klient. Pärast relee märgi kontrollimist vastab `POST /v1/relay/chat/completions/bifrost` neile päringutele 503 ja `X-Bifrost-Fallback` päisega.
- `POST /v1/messages/count_tokens` annab kohaliku hinnangu kliendile, kellele valvur keeldub teenusepakkujast, mille kohta mudel otsustab.
- Võtme kohta erandit ei ole.

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

## register (`registry.ts`)

Üksik `guardrailRegistry` paljastab:

- `register(guardrail)` — lisab (või asendab normaliseeritud nimega) kaitsepiirde ja sortib ümber kasvavalt `priority`.
- `clear()` / `list()` — haldusabilised.
- `runPreCallHooks(payload, context)` — kordab aktiivseid kaitsepiirdeid, suunab kasuliku koormuse läbi `modifiedPayload` ja peatub esimesel `block: true`.
- `runPostCallHooks(response, context)` — sama voog vastuse poolel.
- `resetGuardrailsForTests({ registerDefaults })` — tühjendab oleku ja registreerib valikuliselt uuesti puhta testi isolatsiooni vaikeseaded.

Mõlemad jooksjad tagastavad `{ blocked, payload|response, results, guardrail?, message? }` kus `results` on `GuardrailExecutionResult` -kirjete massiiv, mis sisaldab jälgimiseks kasulikke välju `blocked`, `skipped`, `modified`, `error` ja `meta`.

### Kaitsepiirete keelamine taotluse alusel

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` koondab dubleeritud kaitsepiirete nimede loendi, mis tuleks praeguse päringu puhul vahele jätta. Seal on viis kanalit, loetakse selles järjekorras ja liidetakse üheks loendiks (esimene esinemine võidab dubleerimisel):

1. `apiKeyInfo.disabledGuardrails`
2. Keha `disabledGuardrails` taotlemine (tipptase)
3. Taotle keha `metadata.disabledGuardrails` (ainult siis, kui `metadata` on objekt)
4. Päis `x-omniroute-disabled-guardrails`
5. Pärandpäis `x-disabled-guardrails`

Kõik viis kanalit liidetakse, sealhulgas kaks päist: nii `x-omniroute-disabled-guardrails` kui ka `x-disabled-guardrails` saatmine jätab nende loendite ühenduse vahele ja tühi kaasaegne päis ei varja enam pärandpäist ( [#16412](https://github.com/cheaper-inference/OmniRoute/issues/16412), fikseeritud [#16805](https://github.com/cheaper-inference/OmniRoute/pull/16805) ).

Väärtused võivad olla stringide massiivid või komadega eraldatud string; nimed kärbitakse ja normaliseeritakse väiketähtedega kebab-case (`pii_masker` → `pii-masker`) ning tühjad kirjed jäetakse välja. Tulemus edastatakse `context.disabledGuardrails` kaudu registrisse, mis jätab vahele sobivad kaitsepiirded (`skipped: true` in `results`).

Keelamisloend mõjutab ainult** register** . Kiire süstimise `block` režiim on kohustuslik piir: süstimiskaitse vahevara (`src/middleware/promptInjectionGuard.ts`) kutsub `evaluatePromptInjection()` välja ilma helistaja juhitud keelamisloendita (surnud `resolveDisabledGuardrails({ body })` -kõne, mida see kasutas, eemaldati [#16934](https://github.com/cheaper-inference/OmniRoute/pull/16934) ), seega lükatakse `prompt-injection` keelav taotlus `block` režiimis siiski tagasi. See on disaini järgi. Keelatud kanalid on helistaja kontrollitavad (päringu keha, metaandmed, päised) ja helistajal ei tohi olla võimalik operaatori seatud turvakontrolli välja lülitada ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ). [#16412](https://github.com/cheaper-inference/OmniRoute/issues/16412) päiseliit muudab ainult seda, millised registri piirded vahele jäetakse; see ei lase kliendil vahevarast mööda minna. V4 RFC [#16417](https://github.com/cheaper-inference/OmniRoute/issues/16417) jälgib kohustuslikke võtme- ja grupipõhiseid piirdeeeskirju. Vt [Katvus ja limiidid](#coverage-and-limits).

## Täitmise korraldus

Iga päringu puhul, mis liigub läbi `src/sse/handlers/chat.ts` ja `open-sse/handlers/chatCore.ts` (jaotises [Katvus ja piirangud](#coverage-and-limits) loetletud vestluspere marsruudid):

1. `resolveDisabledGuardrails(...)` koostab vahelejätmise loendi API -klahvist, kehast ja päistest.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` juhib kaitsepiirdeid kasvavas prioriteedi järjekorras:
   - Puudega kaitsepiirded registreeritakse kui `skipped`.
   - Iga kaitsepiirde `preCall` võib kasuliku koormuse `modifiedPayload` kaudu ümber kirjutada.
   - Esimene `block: true` lühistab keti ja käitleja tagastab kaitsepiirde tagasilükkamise vastuse.
3. (Potentsiaalselt ümber kirjutatud) kasulik koormus liigub kombineeritud marsruutimisse ja ülesvoolu saatmisse.
4. **Ainult mittevoogedastus:** pärast vastuse kokkupanemist jookseb `guardrailRegistry.runPostCallHooks(...)` vastusel sama ahela. `block: true` loobub siin ülesvoolu vastusest ja tagastab HTTP 400. Voogvastused jätavad selle sammu täielikult vahele.
5. **Ainult pööratav varahoidla:** kui taotlus vermib märgid, taastab `handleChat` need 2xx vastusel, mille ta tagastab, pärast kõnejärgseid konksu ja voogesituse PII teisendust, nii et `PII_RESPONSE_SANITIZATION` näeb märke ja mudeli loodud PII, mitte kunagi taastatud originaali.

Kaitsepiirded, mis viskavad, salvestatakse `error: <message>` ja logitakse `logger.warn` kaudu, kuid kett jätkab konstruktsiooni järgi — -tõrkeavatuna.

## Katvus ja limiidid

Piirderegister on ühendatud ainult vestluse torujuhtmega. Need piirid on fikseeritud `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` ja `tests/unit/guardrail-pipeline-characterization.test.ts` abil; värskendage neid teste tahtlikult, kui käitumine muutub.

### Kus konksud jooksevad

| Konks / juhtimine                   | Jookseb edasi                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `runPreCallHooks`                   | Taotlused, mida käsitleb `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (ja `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` ja Telegram vestluse puhverserver. Samuti armatuurlaua testi lõpp-punkt `/api/guardrails/test`. Kõneeelne plokk tagastab HTTP 400. |
| `runPostCallHooks`                  | **Mittevoogedastus** ainult vestlusvastused (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Voogesitatud vastused ei jõua kunagi selleni.                                                                                                                                                                                                                                                                                          |
| Voogesitus PII                      | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), torustatakse `streamingPipeline.ts` kui `PII_RESPONSE_SANITIZATION` on sisse lülitatud. See ei ole kaitsepiire, nii et keelamiskanalid seda ei mõjuta.                                                                                                                                                                                                                       |
| Pööratav PII võlv                   | Taotlusi käsitleb ainult `handleChat`, kui `PII_REDACTION_ENABLED` ja `PII_REVERSIBLE_VAULT_ENABLED` on sisse lülitatud. Märgid vermitakse `pii-masker` eelkõnega ja taastatakse `handleChat` väljapääsu juures (`src/lib/pii/requestTokenVaultScope.ts`). `pii-masker` keelamine päringu jaoks tähendab, et midagi ei vermita.                                                                                                            |
| Sissepritsekaitse vahevara (pärand) | Kõik viipasid kandvad `/v1` marsruudid, sealhulgas vestlusperekond (vt [marsruudi leviala](#injection-guard-route-coverage--red-team-phase-8--block-d) ). Ainult kiire süstimine.                                                                                                                                                                                                                                                          |

### Mida ei kata

- **Meediumid, manused ja andmemarsruudid** (`/v1/images/*`, `/v1/embeddings`, `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/rerank`, `/v1/search`, `/v1/moderations`) ei jõua kunagi registrisse. Seal ei jookse PII maskeerimist, mandaadi maskeerimist ega modaalsuse silda. Nende ainus kontroll on pärand süstimiskaitse vahevara.
- **Voogesitatud vastused** ei saa kõnejärgseid piirdeid: `pii-masker` või `credential-masker` järelkõnet ega kõnejärgset blokeeringut. Rakendub ainult voogesituse PII teisendus (kui `PII_RESPONSE_SANITIZATION` on sisse lülitatud). Voogesitatud vastuses tagasi kajatud mandaati ei redigeerita.
- **Keela kanalid vs. vahevara (kujunduse järgi):** vahevara hindab kiiret süstimist oma kõnega `evaluatePromptInjection()`, ilma helistaja juhitud keelamisloendit edastamata. `block` režiim on kohustuslik piir, millest helistaja juhitavad keelamised ei saa mööda minna, sealhulgas vestluspere marsruutidel ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ). `prompt-injection` keelamine jätab vahele ainult registri kaitsepiirde.

### Mis näeb vastust enne järelkõnet

Mittevoogedastusteel on järjekord järgmine: mälu eraldamine → sisseehitatud tööriista täitmine → kõnejärgsed kaitsepiirded → kõnejärgne plokk väljumine → semantilise vahemälu salvestus.

- **Mälu ekstraheerimine** ja** tööriista täitmine** vaadake vastust, enne kui kõnejärgsed kaitsepiirded saavad selle ümber kirjutada või blokeerida. Alates [#16401](https://github.com/cheaper-inference/OmniRoute/pull/16401) -st käivitab mälu ekstraheerimine ekstraktitud teksti `sanitizePII` kaudu, kui `PII_RESPONSE_SANITIZATION` on sisse lülitatud (nii voogesitus kui ka mittevoogedastus), kuid vastust, mis blokeerib hilisemad kõned, on siiski pakutud mälule ja tööriistadele.
- **Semantiline vahemälu** salvestab vastuse pärast kõnejärgset kõnet, seega salvestab ümberkirjutatud vastuse ja blokeeritud vastust ei salvestata kunagi vahemällu. Vahemälu kirjed sisestatakse API klahvi kohta.

## Seadistamine

Sisseehitatud kaitsepiirete loetavad keskkonnamuutujad:

| Muutuv                                | Kasutanud                  | Mõju                                                                                                                      |
| ------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Määrake `false` tuvastamise täielikuks keelamiseks.                                                                       |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Süstimisreeglid: `warn`, `block` või `log`. Pärandväärtus `redact` ei kirjuta süsteteksti ümber.                          |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Sissepritsekaitse režiim; ka DB funktsioonilipp, mis** alistab** env vars (DB > ENV).                                     |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Minimaalne raskusaste, mille `MODE=block` tagasi lükkab: `high` (vaikimisi), `medium` või `low`.                          |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | `INPUT_SANITIZER_BLOCK_THRESHOLD` pärandalias.                                                                            |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Kui `true`, redigeeritakse päringu PII (sõltumata süstimisrežiimist).                                                     |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Koos `PII_REDACTION_ENABLED` abil looge pööratavaid märke ja taastage need 2xx vastusena.                                 |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (allavoolu)   | Juhib vastusepoolse maskeerija käitumist.                                                                                 |
| `AGENT_GUARD_MODE`                    | `agent-guard`              | `off` (vaikimisi), `monitor` või `block`. Samuti DB funktsiooni lipp (DB > ENV).                                          |
| `AGENT_GUARD_STRICT`                  | `agent-guard`              | `false` (vaikimisi) või `true`. `block` puhul keeldub ka tundmatutest klientidest. Samuti DB funktsiooni lipp (DB > ENV). |

Modality Bridge'i kaitsepiirded loevad käitusaja konfiguratsiooni DB-ga toetatud sätete poest (`getSettings()`), mitte env varsidest. Visioni esmased võtmed on `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ja `modalityBridgeCacheMaxEntries`. Pärand `visionBridge*` võtmed aktsepteeritakse ainult dokumenteeritud ühetsüklilise lugemise tagavarana; armatuurlaual kirjutatakse primaarklahve. Vaikeväärtused ja varulahend asuvad `src/shared/constants/modalityBridgeDefaults.ts`, pärandkonstandid säilivad `src/shared/constants/visionBridgeDefaults.ts`.

Heli kasutab `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout` ja `modalityBridgeAudioMaxClips` ning jagatud `modalityBridgeCache*` sätteid. Helil puudub pärandvõtme tagavara, kuna need võtmed võeti kasutusele koos Modality Bridge skeemiga.

Video kasutab `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` ja `modalityBridgeVideoTimeout` ning jagatud `modalityBridgeCache*` seadeid. See on vaikimisi keelatud, kuna FFmpeg/ffprobe on valikulised töösõltuvused ja kaadri pealdised lisavad latentsust ja mudeli maksumust.

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

## Sissepritsevalve marsruudi katvus ja punane meeskond (faas 8 · plokk D)

Sissepritsekaitse (`createInjectionGuard` / `withInjectionGuard`) katab kõik marsruudid, mis aktsepteerivad kasutaja viipasid. See austab `INJECTION_GUARD_MODE` (ainult vaikimisi `warn` = logi; `block` = tagastab HTTP 400 `SECURITY_001`).

| Tüüp               | Marsruudid                                                                                                                                           | Vaikerežiim |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Tekst (olemasolev) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | hoiatama    |
| Generatiivne       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | hoiatama    |
| Andmed             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | hoiatama    |

Teksti ekstraheerimine (`extractMessageContents`) hõlmab `messages`/`input`/`prompt`/`query` + `documents`/`instructions`/`system`.

**Punane meeskond (igaõhtune, `nightly-llm-security.yml`):** promptfoo kinnitab, et iga marsruut blokeerib OWASP-LLM korpuse `INJECTION_GUARD_MODE=block`-s; garak jookseb sonde (jätab ilma saladuseta vahele). `moderations` on kaasas järjepidevuse tagamiseks. Blokeerimisrežiim on kohustuslik piir: `evaluatePromptInjection()` eirab päringupõhise keelamisloendit, mille vahevara edastab, nii et `disabledGuardrails` teeb seda** mitte** vabastab marsruudi sellest ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ).

Öösel töövool (`.github/workflows/nightly-llm-security.yml`, cron + käsitsi lähetamine) on kaks ülesannet:

- **`promptfoo-guard` (blokeerimine)** — käivitab `promptfoo eval -c promptfooconfig.yaml` koos `INJECTION_GUARD_MODE=block`. Iga võistlev juhtum (nt "ignoreeri kõiki eelnevaid juhiseid...", DAN-stiilis jailbreak) kinnitab, et vastus kannab `error.code === "SECURITY_001"`, st valvur lükkas taotluse tegelikult tagasi.
- **`garak` (soovitav)** — käivitab garak `--probes promptinject,dan,leakreplay` kohaliku OmniRoute eksemplari (`http://localhost:20128/v1`) vastu. Varustaja saladus (`PROMPTFOO_PROVIDER_KEY`); jätab graatsiliselt vahele ja selle järelliide on `|| true`, nii et see annab aru ilma CI tõrgeteta.

Kaitseabi (`createInjectionGuard` / `withInjectionGuard`) katvus hõlmab kõiki viipe kandvaid `/v1` marsruute; viipa tekst tõmmatakse `messages`/`input`/`prompt`/`query` + `documents`/`instructions`/`system` `extractMessageContents()` poolt `src/shared/utils/inputSanitizer.ts`.
