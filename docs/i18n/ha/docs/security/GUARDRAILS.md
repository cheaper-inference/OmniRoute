# Guardrails (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Madogaran gaskiya:** `src/lib/guardrails/`
> **An sabunta ta karshe:** 2026-08-29 — v3.8.51 (Asalin fassarar Video Bridge an bayyana shi ne ta hanyar mai kiran,
> ba a tabbatar da shi ta server ba tukuna — an yi bayani gwargwadon #11661)

Guardrails suna aiwatar da tsaro, dokoki, da sauye-sauyen abun ciki a iyakar
tsakanin OmniRoute da masu ba da sabis na sama (upstream providers). Kowace guardrail na iya bincika (kuma
da zabi ta ki, ta sauya, ko ta sanya bayani a kan) buƙatun kaya (`preCall`) da
martanin sama (`postCall`).

Tsarin **fail-open** ne: idan wani guardrail ya fadi yayin aiwatarwa, tsarin
rajista (registry) yana rubuta kuskuren kuma ya ci gaba da sauran guardrail maimakon ya sa buƙatar ta fadi.
Tabbatar da block yanke shawara ce ta zahiri (`block: true`), ba ta faru ta kuskure ba.

## Ginannun Matakan Kariya

Rajistar tana loda matakan kariya guda shida ta atomatik bisa jerin fifiko yayin import
(duba `registry.ts` → `registerDefaultGuardrails()`):

| Fifiko | Suna                | Mataki/matakai | Fayil                 |
| ------ | ------------------- | -------------- | --------------------- |
| `5`    | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`    | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`    | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`   | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`   | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`   | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Ƙananan lambobin fifiko sukan fara aiki **da farko**.

### Gadar Hoto (`visionBridge.ts`) — Gadar Nau'in Bayanai PR-1

Tana katse buƙatun da ke ɗauke da hotuna waɗanda aka nufa da su zuwa **samfurorin da ba sa sarrafa hoto**, sannan ko dai ta sake tura buƙatar gaba ɗaya zuwa samfurin da ke iya sarrafa hoto, ko ta maye gurbin sassan hoton da bayanan rubutu da wani samfurin hoto mai daidaitawa ya samar kafin kiran upstream. Wannan yana ba masu samar da sabis na rubutu kaɗai damar sarrafa payload masu nau'o'in bayanai da yawa ba tare da bayyanar wannan tsari ba.

Gudana:

1. Tsallake idan samfurin da aka nufa ya riga ya goyi bayan hoto (sai dai idan ya bayyana a jerin tilasta amfani da gada `isVisionBridgeForcedModel`).
2. Ciro sassan hoto ta hanyar `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), wanda ke miƙa aikin zuwa ga **haɗaɗɗen mai gano kafofin watsa labarai**
   `detectMediaParts()` a cikin `open-sse/utils/mediaParts.ts` — tushen gaskiya guda ɗaya da ake rabawa tare da matatar dacewar combo.
   An iyakance cirewar ga sassan matakin sama masu siffofin da
   `replaceImageParts` zai iya sake saka wa (yarjejeniyar cirewa↔maye gurbi): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, da Responses API `input_image`. Abubuwan da aka samu a ciki da siffofin alamomi kawai kayan matatar combo ne kuma ba a taɓa cire su.
   Tsallake idan ba a sami komai ba.
3. Warware saitunan lokacin aiki ta hanyar `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): sababbin maɓallan saitunan `modalityBridge*`
   su ne ke da rinjaye; tsoffin maɓallan `visionBridge*` suna ci gaba da zama **madadin zagaye guda**
   (tagar komawa baya). Tsallake kafin duk wani binciken kafofin watsa labarai idan an kashe gadar.
4. Mai zaɓin yanayi (`modalityBridgeVisionMode`, duba jadawalin da ke ƙasa) yana yanke shawarar
   sake turawa ko bayyanawa. Sake turawa yana dawo da `modifiedPayload` inda aka musanya `model`
   kawai, tare da meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Hanyar bayyanawa: taƙaita hotuna zuwa `maxImages`, haɗa prompt mai la'akari da aikin,
   duba cache na bayyanawa, kira samfurin hoto **a layi ɗaya**
   (`Promise.allSettled`), sannan saka sassan rubutun `[Image N]: <description>` a
   wurarensu. Bayyanawar da ta gaza tana samar da `null`, kuma ana **adana** asalin sashen hoton
   (#4012) — sai dai a hanyar bayyanawa ta combo idan duk
   bayanan sun gaza, inda upstream da aka tabbatar ba ya sarrafa hoto zai sami
   stub na `(ba ya samuwa — babu mai samar da sabis mai iya sarrafa hoto da aka haɗa)` maimakon haka (#8430).
6. Dawo da `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Mai zaɓin yanayi (`modalityBridgeVisionMode`)

| Yanayi     | Na asali | Halayya                                                                                                                                                                                                                                                                                             |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Tsohuwar dabarar kimantawa, ba a taɓa ta ba (#6640/#7204): samfurorin da ba combo ba/`auto/` suna sake turawa zuwa mafi kyawun samfurin hoto sai dai idan asalin samfurin yana da bayanan shaida masu aiki (sannan ya bayyana); wuraren combo koyaushe suna bayyana.                                |
| `describe` |          | Koyaushe a bayyana — ana tsallake tubalin sake turawa gaba ɗaya; samfurin da mai amfani ya zaɓa ne koyaushe yake ba da amsa.                                                                                                                                                                        |
| `reroute`  |          | Tilasta sake turawa: ana ƙetare kariyar riƙe samfurin da ke da bayanan shaida. Kariyar bayanan shaidar **wurin da za a sake tura zuwa** har yanzu tana aiki — idan babu wurin hoto mai aiki, buƙatar tana wucewa zuwa bayyanawa domin kada ɗanyen hoto ya taɓa isa backend na rubutu kaɗai (#8430). |

Yanayin da aka tilasta suna dakatar da aiki **kafin** dabarar `auto` ta fara; halayyar `auto`
tana daidai byte-da-byte da matakin kariyar da ke kafin PR-1.

#### Iyakokin API-key (`visionBridgeKeyScope.ts`)

Lokacin da API key na mai kira ya ƙuntata `allowedConnections`, rumbunan quota
(`allowedQuotas`) ko samfura (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), gadar tana zaɓar
samfurorin sake turawa da bayyanawa waɗanda maɓallin ke da izinin amfani da su kawai, a kan hanyoyin haɗin da maɓallin ke da izinin amfani da su.
Daga nan kiran bayyanawa koyaushe yana bi ta self-loop na OmniRoute tare da
header na `x-omniroute-self-loop-key-id`, don haka buƙatar chat da ke karɓa
tana sake tilasta manufofin haɗi da samfurin wannan maɓalli. `enforceApiKeyPolicy()`
yana girmama wannan header ne kawai tare da self-loop bearer, saboda haka zai iya
ƙara taƙaita damar shiga kawai, kuma ana ƙin id da ba a iya warwarewa.

Idan babu samfurin hoto da aka ba maɓallin izinin amfani da shi, hanyar bayyanawa tana kaucewa sannan
buƙatar ta wuce ba tare da canji ba, daidai da halayyar fail-open ta matakin kariya da aka kashe
(meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Buƙatun da ba su da maɓalli, da maɓallan da ba su da waɗannan ƙuntatawa, suna aiki daidai kamar
da.

#### Prompt na bayyanawa mai la'akari da aiki (`modalityBridgeVisionTaskAware`)

Tsoho shi ne **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) yana liƙa
rubutun **saƙon mai amfani na ƙarshe** (an taƙaita shi zuwa haruffa 500) zuwa ainihin
umarnin bayani, yana karkatar da bayanin zuwa ga abin da mai amfani ya tambaya a zahiri
(tsarin codex-vision-proxy), tare da umartar samfurin gani ya kwafe rubutun da ake iya
gani. Idan an kashe tutar — ko kuma babu rubutun mai amfani — ana amfani da ainihin umarnin
ba tare da wani canji ba.

Buƙatar da ta dace da OpenAI ta describe self-loop ɗin (`callVisionModelSingle()`
a cikin `visionBridgeHelpers.ts`) koyaushe tana neman `image_url.detail: "high"` —
ba tare da wani sharaɗi ba, ga kowane mai kira/mai samarwa, kuma ba ta dogara da kowace alamar
abokin ciniki. Samfurin ƙananan bayanai yana rage daidaiton OCR musamman ga aikin
kwafe rubutu da wannan umarnin yake nema, don haka kiran describe ɗin da kansa koyaushe
yana neman cikakken bayani ko da kuwa wane matakin bayani ne buƙatar asali mai shigowa ta
yi amfani da shi. Wannan yana shafar jikin buƙatar describe na ciki ne kawai; ba ya canja yadda
OmniRoute ke tura `image_url.detail` na mai kira a cikin babbar buƙatar —
ana amfani da wannan tsohon ƙimar dabam, kuma ga abokan cinikin OpenCode da aka gano kawai, a cikin
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Reshen
tsarin-waya na Anthropic na describe self-loop ba shi da filin `detail`
kuma ɗayan tsoffin ƙimomin biyu ba ya shafarsa.

#### Iyakar fitowar describe (`modalityBridgeVisionMaxChars`)

| Maɓalli                        | Tsoho | Kewayo           |
| ------------------------------ | ----- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`   | `0` ko 100–50000 |

`0` (tsoho) yana nufin **babu iyaka** — ana wuce bayanin da
`callVisionModel()` ya dawo da shi ba tare da canji ba, domin kiyaye halin da ake
da shi. Duk wata ƙima cikin kewayon 100–50000 tana taƙaita bayanin tare da
ƙarin `…` a ƙarshensa kafin a sake saka shi a matsayin `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` a cikin `src/lib/guardrails/visionBridge.ts`).
Ƙara wannan don ayyukan OCR masu yawan bayanai inda samfurin da ke ƙasa yake buƙatar
cikakken rubutun da aka kwafe; rage shi don iyakance amfani da token a samfuran gani masu
yawan magana. Filin dashboard yana cikin sashen Advanced na shafin Vision
(`modality-bridge-max-chars` a cikin `ModalityBridgeVisionTab.tsx`) kuma yana ɗaga kowace
ƙima tsakanin 1 da 99 zuwa mafi ƙarancin 100, yayin da yake barin `0` da aka sa a fili
ba tare da canji ba — `0` halattacciyar ƙimar Zod ce da kanta
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ba kawai
tsohuwar ƙimar “ba a saita ba” ba.

#### Ma'ajiyar describe (`modalityBridge/bridgeCache.ts`)

Ma'ajiyar LRU + TTL ce a cikin ƙwaƙwalwar ajiya don fitowar describe, wadda duk tsarin
aiki ke rabawa. Maɓalli = `sha256(imageRef + composedPrompt + configuredBridgeModel)` tare da
tsarin prefix na tsayi (babu karo a iyakokin filaye). Bangaren samfurin shi ne
samfurin bridge da **aka saita**, ba samfurin da ya bayar da amsa a zahiri ba —
`callVisionModel` na iya komawa ga wani a ciki, kuma yin maɓalli bisa kowane yunƙuri zai
rarraba ma'ajiyar. Ba a taɓa adana describe da suka gaza ba. Saituna:

| Maɓalli                         | Tsoho  | Kewayo  |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Daidaita hoton nesa (describe na self-loop/ɗauko base64)

Lokacin da bridge ya ɗauko hoton **nesa** da kansa — self-call na describe na Anthropic
da kuma juyawar base64 ta tsarin-waya na claude
(`ensureBase64ImagesForClaudeWire`), dukansu ta hanyar
`fetchRemoteImageAsDataUri()` a cikin `visionBridgeHelpers.ts` — ana miƙa data
URI ɗin da aka samu ta cikin `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) kafin a saka shi cikin buƙatar samfurin gani.
Ana rage girman hotuna masu girma fiye da kima zuwa **2048px a gefen mafi tsawo** (daidai da
iyakar sake-girma da OpenAI/Anthropic suka riga suka yi a ɓangaren uwar garke), wanda ke rage
bytes/latency na lodawa ba tare da canja abin da samfurin gani yake gani ba. Sake-girman
yana amfani da `sharp`, wanda ake lodawa ta dynamic import: a dandamalin da binary na asali
ya kasa loduwa, `normalizeDataUri()` **ba ya taɓa jefa kuskure** — yana komawa
ga wucewar bytes na asali kai tsaye, don haka hanyar describe/juyawar-base64
koyaushe tana ci gaba da aiki. Haka kuma ana wuce bytes waɗanda ba hoto ba ne (ɗauko bayanai
wanda bai dawo da hoton da za a iya decode ba) ba tare da canji ba. Wannan daidaitawa
ta taƙaitu ga hotunan da bridge ya ɗauko don self-call nasa — ba a taɓa amfani da ita
ga ɗanyen payload na mai kira da ake wucewa kai tsaye ba, daidai da ƙa'idar
sauyi sai da izini kawai (Doka Mai Tsauri #20).

#### Tsarin saituna + ƙaura

Ana tabbatar da ingancin sabbin maɓallan `modalityBridge*` ta Zod a cikin `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, rukuni ukun `modalityBridgeCache*`, da kuma
rukunin `modalityBridgeAudio*` da Audio Bridge ke amfani da shi. Ƙaura
`141_modality_bridge_settings.sql` tana kwafe ƙimomin tsoffin
`visionBridge*` da ake da su zuwa sabbin maɓallan da suka dace (idempotent ce, kuma ba ta taɓa
sake rubuta ƙimar `modalityBridge*` da mai gudanarwa ya sa); tsoffin maɓallan suna ci gaba
da karɓuwa a matsayin madadin karantawa na zagayen sigar guda ɗaya.

#### Kanun nuna gaskiya + ƙididdiga

Amsoshin da describe ya sauya suna ɗauke da
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(wanda `buildModalityBridgeHeader()` ya gina a cikin `modalityBridge/bridgeStats.ts`,
kuma `withModalityBridgeHeader()` ya saka a cikin `src/sse/handlers/chatHelpers.ts`).
Buƙatun da aka sake tura wa wata hanya ba sa samun **wani** kanun — ba a taɓa payload ɗin ba,
kuma sauyin samfurin ya riga ya bayyana a filin `model` na jikin amsar.

`GET /api/modality-bridge/stats` (tabbatarwar gudanarwa, mataki ɗaya da
`GET /api/settings`) yana dawo da ƙididdigun kowane nau'in bayanai da ke cikin ƙwaƙwalwa
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` don `vision`, `audio`, da
`video`. `averageLatencyMs` yana amfani da `latencySamples`, ba duk attempts ba, a
matsayin maƙalarsa; aiki da ba shi da auna lokaci ba ya ƙirƙirar samfurin sifili
millisecond na bogi. `bridged` yana ci gaba da kasancewa laƙabin da ya dace da tsoffin
sigogi don sauye-sauyen da suka yi nasara; attempts da suka gaza ba sa ƙara shi.
An tsara ƙididdigun su sake farawa idan an sake kunna process
(telemetry ne, ba lissafin kuɗi ba).

#### Tsarin dashboard

Shafin dashboard na musamman shi ne
`/dashboard/settings/modality-bridge`. Shafukansa na `Vision`, `Audio`,
da `Video` waɗanda ake iya buɗewa ta URL suna kiyaye query parameters yayin sauya
ƙimar `tab`. Shafin Vision yana nuna kunnawa, mode, zaɓin model (har da tsohon
zaɓi na atomatik), prompting mai la'akari da task, iyakokin timeout/image/description-length/cache
na ci-gaba, ƙididdigun lokacin aiki, da sample request mai kariya. Shafin Audio
ma yana aiki kai-tsaye: yana nuna kunnawa, mai zaɓen model na STT kawai tare da
Auto, iyakokin timeout/max-clip, ƙididdigun audio, da gwajin samfurin
`input_audio`. Shafin Video yana aiki: yana bayar da rahoton yanayin lokacin aiki
na FFmpeg/ffprobe — ɗaya daga cikin yanayin UI guda huɗu da aka bayyana sarai
(`unknown` yayin da probe ke gudana ko bai iya kammalawa ba, `restricted` a kan
dashboard host da ba loopback ba inda ake tsallake probe a ɓangaren client,
`unavailable` bayan an yi probe kuma an tabbatar ba ya nan, ko `available` tare
da sigogin FFmpeg/ffprobe) — yana adana iyakokin enable/model/frame/video/timeout,
yana tace mai zaɓen model zuwa models masu iya vision, kuma yana nuna ƙididdigun
video.

Tsohon katin Vision Bridge da ke ƙarƙashin saitunan AI yanzu hanyar haɗin dacewa
ce zuwa sabon shafin; ba ya ƙara riƙe wani kwafi na biyu na form ɗin. Media
Providers kuma yana haɗa hanyoyin aiki na Image-to-Text da Speech-to-Text zuwa
shafukan Modality Bridge da suka dace ba tare da cire playground na Speech-to-Text
da ke akwai ba.

**Tsallake tantance self-loop:** lokacin da kiran describe ya bi ta self-loop na
OmniRoute na `/v1` (model na provider marar daidaitaccen tsari), sub-request ɗin
yana aika `x-omniroute-admission-bypass: internal` kuma ana tabbatar da shi da
credential na self-loop da aka warware — sentinel na gida `sk_omniroute` a local
mode, ko env key na `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` da operator ya saita
(#1350), domin deployments masu `REQUIRE_API_KEY=true` su ci gaba da gudanar da
kiran describe. Ana amincewa da bypass ɗin ne kawai ga waɗannan takamaiman
credentials, don haka clients na waje ba za su iya amfani da header ɗin don
tsallake admission ba.

Tsoffin defaults suna cikin `src/shared/constants/visionBridgeDefaults.ts`;
sabbin defaults na mode/task-aware/cache da settings resolver suna cikin
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail ɗin yana samar da
zaɓin constructor na `deps` domin tests su iya shigar da implementations na bogi
na `getSettings` da `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Yana katse chat requests masu ɗauke da audio kafin su isa target da ba a san yana
karɓar shigarwar audio ba. Ba ya taɓa sake karkatar da chat request: ana mayar da
sassan audio zuwa rubutu ta multipart endpoint mai dacewa da OpenAI da ke akwai,
sannan chat model da aka zaɓa ya ci gaba da transcripts na rubutu.

Gudana:

1. Warware `supportsAudio` ta hanyar `getResolvedModelCapabilities()`. Bayanin
   provider-registry da aka bayyana sarai ya fi fifiko, sai static model
   metadata, sannan `modalities_input` da aka daidaita. Jerin input da aka
   bayyana amma ba shi da `audio` yana zama `false`; idan babu wata shaidar
   capability yana zama `null`. Duk `false` da `null` suna kunna bridge mai
   taka-tsantsan, yayin da `true` yake tsallake shi.
2. Warware saitunan `modalityBridgeAudio*` sannan a ciro sassan audio na matakin
   sama waɗanda za a iya splice daga kowane message ta hanyar detector ɗin
   `detectMediaParts()` na bai-ɗaya. Wire shapes da ake tallafawa su ne
   `input_audio`, `audio_url` na OpenAI, da `source.media_type: "audio/*"`.
   Ana gano audio da ke nested don routing amma hanyar splice ba ta cire shi.
   Ana iyakance aikin da `modalityBridgeAudioMaxClips`; sassan da suka biyo baya
   suna nan ba tare da an taɓa su ba.
3. Bi `provider/model` da aka saita, ko bar `selectAudioBridgeModel()` ya bi
   `AUDIO_TRANSCRIPTION_PROVIDERS` bisa tsayayyen tsarin catalog ya zaɓi model
   na farko da ke da provider credential mai aiki kuma mai amfani.
4. `callAudioTranscription()` yana sauya base64/data-URI audio zuwa multipart
   `file`, ko ya sauke `audio_url` na nesa ta public-only outbound guard tare da
   DNS pinning da iyakar 25 MB. Sannan yana POST na file ɗin da model da aka zaɓa
   zuwa self-loop na gida `/v1/audio/transcriptions`, tare da tabbatarwa ta
   `resolveSelfLoopBearer()`. Route na transcription da ke akwai yana gudanar da
   binciken credential na yau da kullum, sarrafa cooldown/rate-limit, da tura
   aiki zuwa provider.
5. Calls da suka yi nasara suna maye gurbin sassansu da
   `[Audio N]: <transcript>`. Calls suna gudana da `Promise.allSettled`: gazawar
   ɗaya tana kiyaye ainihin ɓangaren audio ɗin (#4012 contract). Idan duk calls
   suka gaza kuma an tabbatar target ɗin `supportsAudio === false`, sassan suna
   zama `[Audio N]: (babu shi — babu STT provider da aka haɗa)` (#8430 contract).
   Ga target da ba a san halinsa ba (`null`), sakamakon gazawar duka yana nan ba
   tare da an taɓa shi ba. Target da aka tabbatar yana karɓar rubutu kawai kuma
   ba shi da STT credential mai amfani yana samun wannan explicit stub ɗin ba
   tare da yin network call ba.

Transcripts da suka yi nasara suna amfani da cache na LRU/TTL na Modality Bridge
na gaba ɗaya process. Key ɗin yana haɗa audio reference, tsayayyen operation label
na `audio-transcription`, da STT model da aka zaɓa; ba a taɓa adana failures a
cache. Audio attempts suna sabunta ƙididdigun bai-ɗaya na `bridged`, `cacheHits`,
`failures`, da `lastUsedAt`. Responses da aka sauya suna ɗauke da
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; requests
da ba a taɓa su ba ba sa samun segment na Audio Bridge.

Saitunan lokacin aiki suna samun tallafin DB kuma an inganta su da Zod:

| Maɓalli                       | Tsoho   | Iyaka                    |
| ----------------------------- | ------- | ------------------------ |
| `modalityBridgeAudioEnabled`  | `true`  | —                        |
| `modalityBridgeAudioModel`    | `""`    | Na atomatik ko ID na STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000              |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                     |

Har yanzu ana sarrafa ma'ajiyar gama-gari ta `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, da `modalityBridgeCacheMaxEntries`.

### Gadar Bidiyo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Tana katse sassan bidiyo na babban mataki a cikin `messages` na Chat Completions da
`input` na Responses API kafin a kira wata manufa wadda ba a san tana da tallafin
bidiyo na asali ba. Tsarukan da ake tallafawa su ne `input_video`, `video_url`,
`video_source`, URLs na HTTPS, da URI na bayanai na `data:video/*;base64,...`.
Ba a ɗaukar sunayen fayil kawai da ke cikin rubutu a matsayin bidiyo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ne ke da alhakin bi ta cikin
buƙata, binciken iyawa/manufa, tattarawa na kowace buƙata, da bayanan amsa.
Aikin kowanne bidiyo — samu, ma'ajiyar cikakken sakamako, bayyana jerin firam
(wanda ke haɗa duk wani rubutaccen sautin da mai kira ya ayyana), da
ma'aunai/sokewa/tsabtacewa na kowace yunƙuri — an ɓoye shi a bayan
`processVideoPart` a cikin `videoBridgePipeline.ts`, wanda ake kira sau ɗaya ga
kowane ɓangaren bidiyo a cikin madauwar `preCall`. Wannan kundin kuma yana
ayyana iyakokin tashoshi a sarari: `VideoMediaBrokerPort` (samun bytes da fitar
da firam-firam da aka ɗauki samfurinsu), `VideoAudioTranscriptionPort` (haɗa
rubutaccen sautin da mai kira ya ayyana da taken firam-firam ɗin da aka ɗauki
samfurinsu), da `VideoDrilldownPort` (iyakar adana bayanan zurfafawa cikin
firam; har yanzu ba a haɗa shi da `processVideoPart` ba — hanya ta daban kawai
ta `/api/modality-bridge/video/drilldown` ce ke rubuta bayanan zurfafawa a yau).

Hanyar buƙata ta jama'a ta `/v1` ba ta taɓa shigo da ko kiran ƙaramin tsari.
Ana sauke bidiyoyin nesa a ƙarƙashin iyakar 50 MiB; bidiyoyin base64 na cikin
layi suna da iyakar 36 MiB da aka warware ga kowane bidiyo a matsayin taka-tsantsan,
domin kundin model/messages/framing ya iya kasancewa cikin iyakar karɓar buƙatar
JSON ta jama'a ta 50 MiB. Ana bincika tsawon bayanan cikin layi da ƙiyasin
girman da aka warware kafin ware ƙwaƙwalwa. Ana buƙatar HTTPS a URL na nesa na
farko da kowace turawa, ta amfani da kariyar fitarwa ta jama'a-kawai da ake da
ita tare da ɗaure DNS. Daga nan bytes ɗin sukan ƙetare takamaiman iyakar
dillali ta ciki ta `POST /api/modality-bridge/video/extract`. Wannan hanyar
`LOCAL_ONLY` ce kuma `SPAWN_CAPABLE`, tana karɓar buƙata kawai da aka tantance
ta kowane tsari kuma aka amince da ita daga loopback, kuma ba ta taɓa karɓar
URL, hanyar tsarin fayil, fayil mai aiwatarwa, ko jerin hujjoji ba. Tsarin
iyakance girman jikin API da mai karanta jiki na ƙaruwa a cikin mai sarrafawa
kowannensu yana tilasta iyakar shigarwar dillali ta 50 MiB da kansa. Layinsa
mai iyaka yana gudanar da fitarwa guda ɗaya a lokaci, yana ba da damar ayyuka
huɗu masu jira, kuma yana iyakance jimillar shigarwar da ke jira zuwa 100 MiB.

A cikin dillalin, `ffprobe` yana karanta fayil na gida mai zaman kansa; tabbataccen
jerin tsare-tsaren da aka yarda da su yana ware tsare-tsaren jerin kunnawa da
manifest. Ga kwantena na dangin MOV da aka yarda da su, manazartar bayanan MOV
na waje suna ci gaba da zama a kashe bisa tsohuwa, kuma tabbataccen umarnin ba
ya kunna su. Duka `ffprobe` da `ffmpeg` suna amfani da jerin ladubban da aka
yarda da su na `file`-kawai, thread guda ɗaya, tabbatattun jeren hujjoji, babu
shell, tare da gano fayilolin aiwatarwa daga `PATH`. Rafin hoton murfi da aka
maƙala ba su cikin zaɓuɓɓukan da za a iya kunnawa. Duk rafukan da za a iya
kunna dole ne su cika iyakokin, kuma ana fifita rafin tsoho da aka ayyana kafin
madadin mafi ƙarancin index mai tabbataccen sakamako. Ana iyakance bidiyoyi
zuwa daƙiƙa 600, pixels 8,192 a kowace fuska, da pixels na tushe 33,554,432.
FFmpeg yana ɗaukar samfuran firam-firam JPEG 1–16 daga tsakiya, yana rage doguwar
gefe zuwa pixels 1,024 aƙalla ba tare da faɗaɗa ƙananan bayanai ba, kuma ba ya
taɓa karɓar URL. Ɗaukar samfurin `uniform` ce bisa tsohuwa. Manufofin
`scene_aware` na zaɓi da `segment_aware` na gwaji suna yin ƙarin zagaye guda
ɗaya na FFmpeg mai tabbataccen tsari a kan rafin gida da aka riga aka tabbatar,
suna zaɓar lokutan fage na `showinfo` masu iyaka, sannan su koma ta hanyar da
za a iya maimaitawa zuwa maki-tsakiyar uniform iri ɗaya idan mai ganowa ya
kasa, lokaci ya ƙare, fitarwa ta lalace, ko babu wani zaɓi. Yanayin segment-aware
yana rarraba samfuran maki-tsakiya gwargwadon tazarorin fage da aka tabbatar;
an yi cikakken bayani a ƙasa game da shaidar segment-aware da halayen komawa
madadin. Ana amfani da tsayayyar iyakar firam 16 bayan zaɓe a kowace manufa.
Lokacin da buƙatar scene-aware take da kasafin firam guda ɗaya kawai, tana
amfani da maki-tsakiyar uniform na cikakken bidiyo mai aiki ko tagar mayar da
hankali, sannan ta bayar da rahoton `policyEffective: uniform`: firam guda ɗaya
da aka zaɓa daga fage ba zai iya adana duka ƙarshen lokaci biyu ba. Mai kira na
iya bayar da taga mai iyaka ta mayar da hankali (`start`/`end` na daƙiƙoƙi);
ana daidaita iyakokin zuwa tsawon kafofin watsa labarai, ana ƙin tagogin da aka
juya ko marasa iyaka, kuma ana aiwatar da duk manufofin ɗaukar samfuri ne kawai
a cikin tazarar da aka daidaita. Ana haɗa tagar da aka samu a metadata na
ɗaukar samfuri da kuma a gabatarwar bayani marar aminci, domin model na ƙasa
su iya bambance wani yanki da aka mayar da hankali da cikakken layin lokaci.

Mayar da hankalin taken ma'ana wani saitin daban ne, bayyananne. Yanayin bincike
na tsoho `full` yana kiyaye umarnin firam da ake da shi kuma ba ya taɓa tura
rubutun buƙata zuwa model na taken bayani. A yanayin `focused`, gadar tana
karanta kawai sabon `text`/`input_text` marar komai da mai amfani ya rubuta daga
cikin kwantenan Chat ko Responses iri ɗaya, tana daidaita shi zuwa NFC, tana
haɗe haruffan sarrafawa da fararen sarari, sannan ta iyakance shi zuwa code
points na Unicode 500. Sakamako marar komai yana komawa ga ainihin umarnin
`full`. Ana serializing alama mai amfani a matsayin JSON a cikin wani keɓaɓɓen
toshe na mahallin mai amfani marar aminci, kuma tana iya fifita bayanan da ake
iya gani kawai; ba za ta iya soke gargaɗi na daban game da rashin bin umarnin
da ake gani ko ji a cikin kafofin watsa labarai ba. Mayar da hankalin rubutu ba
ya taɓa ƙiyasta `start`/`end` ko canza mai ɗaukar samfurin lokaci.

#### Shaidar sashe mai tsari ta FU-07

`segment_aware` yana amfani da zagayen nazari na farko guda ɗaya mai iyaka a kan rafin bidiyon cikin gida da aka riga aka tabbatar. Da farko, jerin matattara tabbatacce yana daidaita faɗin zuwa mafi yawan pixels 320, yana gano sauye-sauyen fage da lokutan daskarewa, sannan yana ɗaukar samfuri a frame 1 a kowace daƙiƙa domin auna dusashewa, matsakaicin luma, da bayanan sarari/lokaci. An iyakance zagayen zuwa samfuran tsari 600, thread guda ɗaya na FFmpeg/matattara, jerin izini iri ɗaya na ka'idar `file` kaɗai da kwantena, iyakar fitowar tsari ta 1 MiB, da aƙalla daƙiƙa 30 a cikin soke aiki/wa'adin gama aiki na haɗin gwiwa na dillalin. Ba ya taɓa karɓar umarni, matattara, path, ko URL daga buƙatar.

Ƙimomin tsarin shaidar samfurin da za a iya maimaitawa ne, ba fahimtar ma'anar bidiyo ba. Ba sa tantance batutuwa, ayyuka, rubutun bayani, magana, ko niyyar mai amfani. Iyakokin fage da daskarewa suna samar da sassa; yawan ɗaukar daskarewa, dusashewa, haske, cikakken bayanin sarari, da sauyin lokaci kawai suke tasiri yadda ake rarraba kasafin frame 1–16 da ake da shi. Ana iyakance sashe da ya daskare gaba ɗaya zuwa frame guda ɗaya, yayin da sassan da ba su daskare ba suke fafatawa don sauran kasafin. Idan iyakoki sun fi frames yawa, ana riƙe da ɗaukar lokaci gaba ɗaya daidai-da-daidai domin saurin sauye-sauyen farko kada su ɓoye dogon sashe na ƙarshe. Ana haɗe iyakokin fage da ke cikin ƙudurin nazari na daƙiƙa 1 daga iyakar daskarewa.

Rashin matattara, shaida marar tsari/mara komai, kuskuren mai ganowa, ko ƙarewar lokacin nazari na farko mai iyaka suna komawa kai tsaye ga ainihin manufar tsakiyar lokaci mai daidaito. Soke aiki daga mai kira ko wa'adin dillali ba ya yin wannan komawar: yana dakatar da subprocess da ke gudana, yana hana cire frames daga baya, kuma ana cire bishiyar wucin-gadi ta sirri a cikin `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` yana samar da kayan gwaji na FFmpeg na gaske da za a iya maimaitawa domin auna raguwar kiran samar da rubutun bayani bayan cire maimaituwa, rarraba kasafin motsi mai yawa, shaidar dusashewa/haske/SI-TI, saurin sauye-sauyen fage tare da dogon ɓangaren ƙarshe, da sakamakon ƙarya na shuɗewar hoto a hankali. Yana yin rikodin lokacin ainihi na nazarin farko kuma, idan `/usr/bin/time` yana samuwa, CPU na child da mafi girman RSS. Binciken ingancinsa ma’aunan tsari ne kawai. Ingancin samfurin samar da rubutun bayani na gaske yana ci gaba da kasancewa `HOLD` saboda wannan kayan gwajin ba shi da endpoint mai izini ko alkali tabbatacce. Haka kuma tanadin kuɗi yana ci gaba da kasancewa `HOLD` sai idan `--caption-cost-per-call-usd` ya bayar da bayyanannen ƙimar kuɗi mai kyau ga kowane kira; script ɗin ba ya ƙirƙirar ɗayan waɗannan sakamakon na ƙarya.

An iyakance kowane frame zuwa 4 MiB, dukkan raw frames tare zuwa 23 MiB, sannan amsar dillali da aka serialized zuwa 32 MiB. Ana cire kundin wucin-gadi na sirri a cikin `finally`. OmniRoute ba ya haɗa FFmpeg kuma ba ya karɓar path na executable na musamman. Kafin samar da rubutun bayani, bridge ɗin yana aiwatar da matakin cire maimaituwar gani cikin taka-tsantsan: ana rage kowane JPEG zuwa buffer na grayscale mai 16×16, sannan a kwatanta shi kawai da frame na ƙarshe da aka riƙe. Idan kasafin rubutun bayani da aka nema ya fi frame guda ɗaya, cirewar tana samar da tarin candidates mai iyaka wanda bai wuce ninki biyu na kasafin ba kuma bai taɓa wuce frames 16 ba. Ana amfani da iyakar da aka nema ne kawai bayan cire maimaituwa, tare da kiyaye candidates na farko da na ƙarshe da aka zaɓa yayin rage adadin ƙarshe idan kasafin ya kai aƙalla biyu. Manufar mai siga
`grayscale-16x16-mean-cells-v2` tana amfani da mafi girma tsakanin bambancin matsakaicin luma da rabon cells na thumbnail waɗanda normalized delta ɗinsu ya kai aƙalla 0.05. Iyakar ɗaukar abu a matsayin maimaitacce ita ce ƙimar dindindin 0.04, wadda aka zaɓa domin sauƙin hasashen aiki maimakon a bayyana ta a matsayin saitin lokacin gudana. Wannan sigina na biyu mai babban bambancin haske yana kiyaye ƙananan motsi da sauye-sauyen rubutu da ake iya gani waɗanda kwatanci mai amfani da matsakaici kaɗai zai iya ɓoyewa. Kurakuran comparator ko decoder suna komawa ga barin bayanai su wuce kuma suna kiyaye ɗaukar lokaci gaba ɗaya. Metadata na fitarwa yana ware candidates da aka cire, frames da aka yi amfani da su cikin nasara, da maimaituwar gani da aka yar.

Sashen bidiyo da aka yi wa alama a bayyane yana iya neman contact sheet mai timestamp. Bridge ɗin yana gina grid na JPEG mai ginshiƙai har 4 da frames har 16. Kowane cell mai pixels 512 yana saka timestamp na tushensa a cikin band na ƙasa mai babban bambancin haske, yayin da timestamps iri ɗaya suke ci gaba da kasancewa cikin metadata na rubutu domin haɗawa da binciken da za a yi daga baya. Cikakken JPEG yana ci gaba da kasancewa ƙarƙashin iyakar 32 MiB. Idan `sharp` ba zai iya decode ko haɗa grid ɗin ba, bridge ɗin yana komawa ga frames na JPEG ɗaiɗaiku; soke aiki daga client har yanzu yana yaɗuwa ta cikin aikin sheet ɗin.

An ware shaidar ɗaukaka mataki da gangan daga microbenchmark na haɗin roba. `scripts/perf/video-bridge-contact-sheet-eval.ts` yana ayyana kayan gwajin A/B mai schema mai siga domin samfuran gani na gaske masu dacewa da OpenAI. Yana auna tokens da provider ya bayar da rahotonsu, jinkirin lokaci daga farko zuwa ƙarshe (ciki har da haɗa sheet), adadin kiran samfuri, da riƙe hujjojin da manifest ya ayyana. Ba a rubuta raw amsoshin samfuri cikin rahoton; ana riƙe SHA-256 digests da matched fact IDs kawai. Kayan gwajin ba ya yin kiran network ko samfurin biyan kuɗi sai idan an bayar da `--execute-real` kuma an saita `--model`, `OMNIROUTE_BASE_URL`, da `OMNIROUTE_API_KEY`. Idan ba a yi wannan bayyanannen gwajin na gaske ba, hukuncinsa mai sauƙin karantawa ta na’ura yana ci gaba da kasancewa `HOLD`; ma’aunin payload/adadin kira na roba kaɗai ba shaidar ɗaukaka mataki ba ce.

Masu kira za su iya haɗa array na `transcript.cues` na zaɓi zuwa sashen bidiyo mai goyon baya idan suna da rubutun da aka riga aka daidaita. Dole kowane cue ya ƙunshi `text`, tazarar `start`/`end` mai iyaka da ke cikin tsawon lokacin da aka bincika, da `source` da ke cikin jerin izini (`client`, `embedded`, ko `audio-bridge`); ƙimar asali ta `confidence` ita ce `1` kuma dole ta kasance tsakanin `0` da `1`. Ana haɗa cues masu cikakken maimaituwa. OmniRoute ba ya taɓa fara transcription daga wannan metadata: ana kwafe cues da aka tabbatar zuwa sakamakon da aka bayyana tare da source, confidence, da interval, sannan a nuna su a matsayin bayanan lura marasa aminci tare da rubutun bayanin frames. Ana ƙin rubutu marar inganci, wanda ya fita daga iyaka, ko marar tushen asali maimakon a gauraya shi cikin rafin rubutun bayani. Duk hanyoyin transcript biyu na request-body suna daidaita provenance da aka bayar zuwa `client`, ciki har da labels na `embedded` ko `audio-bridge` da aka ayyana da kai. Adapter mallakin uwar garke ne kawai zai iya sanya waɗannan amintattun labels ta hanyar argument na cikin code kaɗai mai suna `trustedSource`; field na JSON na buƙata ba zai iya isa ga wannan argument ba. Rubutun transcript yana ci gaba da kasancewa abun ciki marar aminci da aka samo daga media, ba tare da la’akari da provenance ɗinsa ba, kuma kada ya taɓa ƙayyade izini.

Mai kira na ci-gaba na iya samar da waƙar `audioTranscript` don bidiyo ɗaya;
ana ɗaukar ta a matsayin rubutun da abokin ciniki ya samar, ba hujjar cewa sabar ta yi kwafin magana zuwa rubutu ba.
Mahadar haɗawa tana gudanar da abubuwan lura na gani da na sauti a ƙarƙashin
wa’adi guda da siginar dakatarwa guda, tana jera su a kan tsarin lokaci na bai ɗaya, tana haɗe
kwafi iri ɗaya kacokan, sannan tana bayar da sakamako na ɓangare idan gefe ɗaya kawai ya yi nasara.
`audioTranscript` marar inganci yana sauya zuwa wannan sakamakon na ɓangare — ana
riƙe bayanin gani, yayin da reshen sauti ke rubuta lambar gazawa da aka tsaftace —
maimakon a gaza bidiyon gaba ɗaya. Samuwar kowane reshe, tutar ɓangare,
da lambobin gazawa da aka tsaftace ana kiyaye su a cikin sakamakon da aka bayyana, a cikin
metadata na kariya (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), a cikin metadata na ma’ajiyar-cache ta sakamako, da kuma a cikin
ƙididdigogin haɗawa na bridge. Tsohuwar hanyar Video Bridge ba ta kiran speech-to-text
ko sauke kwafin media na biyu; ba tare da wannan waƙar da aka bayar a sarari ba, tana ci gaba
da zama ta bidiyo kawai.

**Riƙe kwafin magana (#12150 P1).** Wannan yana aiki ta atomatik a duk lokacin da
Video Bridge (wanda shi kansa sai an zaɓi amfani da shi) ya nuna alamar kwafin magana — babu wata
tutar riƙewa ta daban. Lokacin da buƙata ta nuna kowace alamar kwafin magana (wani `transcript`
da mai kira ya ayyana ko wani `audioTranscript` da aka haɗa), kariyar tana yi masa alamar
`videoBridgeObserved` sannan ta samar da inuwa da aka ɓoye bayanai daga bayanin bidiyon —
nuni iri ɗaya wanda aka maye gurbin jikin rubutu marar tsari na kowace alama da
`[redacted-video-transcript]`, ta hanyar maye gurbin filin alama mai tsari
kafin a haɗa zaren rubutu (ba ta hanyar nazarin shimfiɗaɗɗen rubutu ba, don haka babu wani abun cikin alama
— na ƙeta ko na yau da kullum, har da jikin da ke ɗauke da `]` kamar
`[inaudible]`/`[music]` — da zai tsira). Jikin buƙatar rajistar-kira da ake adanawa yana musanya
kowane ɓangaren rubutu da aka samo daga bidiyo da wannan inuwar da aka ɓoye bayanai, ta hanyar daidaita
abun ciki; ana sake karanta maƙalar `fullText` daga cikakken payload na kariyar kafin-kira,
saboda haka daidaitawar har yanzu tana yin nasara bayan kariyoyin sarkar da ke biyo baya (masu ɓoye PII da
bayanan shaida, fifiko 10/95) sun sake rubuta bayanin a wurinsa da kuma
bayan shigar da system-prompt/handoff/memory ta sake fasalin jerin saƙonni. Jikin
da ake aikawa zuwa sama ga model bai canza ba. Buƙatar da aka lura da ita kuma ba ta cika
Memory mai ɗorewa ba (ana tsallake fitar da bayanai daga buƙata da kuma daga amsa),
don haka amsar model ɗin kanta ba za ta iya maimaita rubutun kwafin magana zuwa Memory ba.

**Filayen bidiyo na asali (#12430).** Lokacin da aka kunna bridge kuma ba a san ko akwai tallafin bidiyo na native ba, ko kuma babu shi, filayen `transcript`/`audioTranscript` da aka ayyana su ma suna kunna `videoBridgeObserved`, ko da bayan gazawar bayanin ko iyakar `maxVideos`. `null` da zaruruwan rubutu marasa komai suna ƙirguwa; filayen da ba su nan da metadata marar alaƙa da bidiyo ba sa ƙirguwa. Kwafin da aka riƙe suna ɓoye waɗannan filayen ko su bar buƙatar gaba ɗaya, sannan ana kewaye caches/Memory.

A waɗannan hanyoyin fallback, ingantattun alamomin mai kira suna zama ɓangarorin `text`/`input_text`
da ake tallafawa maimakon filayen provider marasa ma’auni. Duk waƙoƙin biyu da aka samar
a buƙata suna ci gaba da kasancewa abubuwan lura na `client` marasa amana, tare da gargaɗi a sarari cewa ba a
bayyana bidiyon ba kuma ba a tabbatar da timestamps da media ba. Kasafin alamomi 256/64-KiB na jimilla
da na kowace alama da ake da su yanzu suna aiki a kan waƙoƙin biyu tare;
timestamps dole ne su dace da iyakar broker ta daƙiƙa 600 da duk wata taga ta mayar da hankali
da aka bayar. Ana watsar da waƙoƙi marasa inganci, ba a tura su a matsayin rubutu na son rai ba; har yanzu ana iya
amfani da ingantacciyar waƙar ’yar’uwa sai dai idan kasafin haɗinsu ya wuce kima. Filayen null/marasa komai
ba sa ƙara rubutu. Wannan fallback ba ya ƙara ɗauko media ko yin transcription.
Ana cire filayen faɗaɗa kwafin magana daga maɗaukin bidiyo na fallback da abubuwan
`video_url`/`source` nasa. Allowlist na wire na OpenAI yana ci gaba da kasancewa tsaurara; maɗaukan bidiyo
da ba a san tallafin native ɗinsu ba suna ci gaba da kasancewa, kuma targets da aka sani na rubutu-kawai suna riƙe alamomi masu aminci.
Inuwoyin ɓoye bayanai masu tsari suna kare rubutun kwafin magana da aka ƙara, yayin da
asalin buƙatar mallakar mai kira ba ta canza ba. Targets masu tallafin native da
bridges da aka kashe suna riƙe halin kewaye da suke da shi yanzu.

Ƙarin kwafin da aka riƙe suna amfani da siginar buƙatar da aka lura da ita iri ɗaya. Snapshot na asalin
buƙatar abokin ciniki kafin-kariya, buƙatar da ke jiran aiki a cikin ƙwaƙwalwa, da rajistar
buƙatar da aka ƙi da wuri suna maye gurbin filayen kwafin magana a cikin ɓangarorin bidiyo bisa tsari;
string prompts da matakan pipeline da context handoff suka samar ana ɓoye bayanansu
a maɓuɓɓugar adana-jikin-buƙata. Alamar `video_content_removed` da aka adana
tana sa ci-gaban `previous_response_id` ya gaza cikin aminci maimakon sake gina
rubutun da aka watsar da gangan. Idan buƙatar da aka lura da ita ta rasa
inuwa ta ɓoye bayanai ta kowane ɓangare kafin yin rajista, ko ma ɗaya daga cikin inuwoyin bidiyo da dama
ya kasa daidaituwa bayan sauye-sauyen buƙata na baya, ana barin jikin buƙatar da za a riƙe
gaba ɗaya maimakon riƙe kwafin magana da aka ɓoye bayanai a wani ɓangare kawai.

Ga buƙatar da aka lura da ita, amsar model na iya kawo kowane sashe na
kwafin magana ba tare da iyakar alama mai tsari ba. Saboda haka ana maye gurbin
`responseBody` na rajistar-kira da ake adanawa da alamar barin abu; ba a riƙe
cikakken artifact na pipeline (wanda zai iya haɗawa da jikin upstream/client da stream chunks) ba.
Caches na semantic, idempotency, da reasoning-replay suna kewaye karantawa da rubutawa
ga wannan buƙatar. Buƙatar provider da amsar da abokin ciniki ke gani ba su canza ba.
Ana zubar da bytes na keepalive na farko daga buffer na wucin gadi lokacin da aka bar cikakken artifact.
Gargaɗin EventStream marar tsari na Kiro yana bayar da rahoton adadin bytes na payload kawai, ba abun cikinsa ko
asalin kuskuren JSON parser ba.
Wannan ba ikirarin cewa an duba duk wani diagnostic na provider/plugin marar alaƙa ba ne;
ana bibiyar faɗaɗa binciken maɓuɓɓugan riƙewa a #11658.

Tsarin rayuwar cikin gida na `/api/modality-bridge/video/drilldown` wani keɓantaccen tushen cache ne da ake samun damar sa ta loopback/tantancewar token. Kowace aiki kuma tana buƙatar ingantaccen ID na principal wanda ba ya bayyana ma’anarsa. Kafin a ba wani mai kira na production damar amfani da shi, dole ne ya samo wannan ID daga tenant ɗin da aka tantance, kuma kada ya taɓa tura ƙimar da client ya zaɓa. Maɓallan cache suna haɗa wannan principal da ingantattun ID na session da video-reference, suna adana maɓallan da aka samo daga SHA-256 kawai, sannan suna iyakance karatu da gogewa ga principal ɗin guda. Cache ɗin yana adana aƙalla firamomin JPEG 16 da aka samar ga kowace entry, yana sa su ƙare bayan mintuna goma, kuma yana goyon bayan karatu mai iyaka ta `start`/`end` ko gogewar session kai tsaye.

Kowane principal yana da iyaka ta entries 16 da MiB 64 na ingantattun bayanan JPEG. Waɗannan iyakoki sun bambanta da iyakar duniya ta entries 64/MiB 256: matsin quota na principal yana fitar da entries na wannan principal kaɗai waɗanda aka fi daɗewa ba a yi amfani da su ba, kafin a yi la’akari da fitarwa ta LRU ta duniya. Ana cire entries da suka ƙare daga lissafin principal da na duniya yayin ayyukan cache, yayin da sokewa da gazawar validation ba sa commit ɗin wani partial replacement.

Cache ɗin yana ƙin Base64 wanda ba canonical ba, padding mai yawa, media wanda ba JPEG ba, JPEG marar tsari ko wanda aka yanke, da JPEG da ke haifar da gargaɗi yayin cikakken decode na hoto mai iyaka ta `sharp`. Yana sake encode kowane hoto da aka karɓa zuwa canonical JPEG, yana samo faɗi da tsawo daga bytes da aka decode maimakon amincewa da fields na mai kira, sannan yana watsar da duk trailing polyglot bytes maimakon riƙe su. Bounded canonical compressed buffer kaɗai ake ƙididdigawa a cikin quota biyun. Iyakar JSON ta wire tana haɗa da ƙarin nauyin Base64 don decoded-input ceiling na MiB 32. Kowace
derivation da aka adana tana rubuta JPEG format/resolution da aka validate, sampling policy,
derivation version, lokacin ƙirƙira, content hash da server ya ƙididdiga, da hashed parent
reference tare da parent-content hash na amintaccen mai kira. Ana duba sokewa
tsakanin matakan decode/hash na asynchronous kafin atomic cache commit.

Wannan tranche bai haɗa production producer da route ɗin ba tukuna, kuma ba ya
samar da zaɓin variant na multi-resolution. Saboda haka hanyar request ta Video Bridge
mai bayyana ba ta jawo wani ƙarin aiki, yayin da tenant-bound principal derivation da
cikakken lifecycle na multi-resolution na FU-08 suke ci gaba da kasancewa ayyukan bin-baya a sarari
maimakon a rubuta su a matsayin halayen da aka kammala.

Ana yi wa firamomi caption bi da bi ta amfani da Video model da aka saita. Video
override marar komai yana gaji saitin Vision; idan dukansu babu komai, Vision
auto-router yana zaɓar vision-capable model mai aiki. Captions da suka yi nasara
suna maye gurbin original part da tsayayyen prefix na `[Video description:` wanda kuma
ke nuna rubutun a matsayin observation marar aminci da aka samo daga media, kuma yana
faɗa wa downstream models kada su bi umarnin da aka samu a cikin media. Maɓallan
frame-caption cache suna haɗa JPEG bytes, prompt, timestamp, da effective model; captions
da suka yi nasara kaɗai ake adanawa a cache. Cache entries suna riƙe ainihin producer model
da ya yi nasara, ciki har da fallback model; bridge ɗin yana bayar da rahoton `mixed` idan
models daban-daban ne suka samar da firamomi daban-daban. Cache hit yana sake amfani da
wannan producer identity maimakon sake masa lakabi da requested routing plan. Cache na
whole-video result yana amfani da kowane input da ke canza output a matsayin key — prompt,
effective model, sampling policy, frame count, semantic analysis mode, SHA-256
fingerprint na normalized focus hint, focus window, `transcript`,
`audioTranscript`, da contact-sheet flag — saboda haka canza kowane ɗaya daga cikin waɗannan
dimensions cache miss ne, ba sake amfani da stale data ba. Visual dedup policy
version, threshold, da bounded candidate-frame count suma suna bayyane a cikin
result-cache key da metadata; don haka canjin policy ba zai iya sake amfani da stale
whole-video description ba. Result-cache v4 metadata yana riƙe mode da
fingerprint, ba ya taɓa riƙe raw user task. Guardrail metadata yana bayar da rahoton
requested da effective analysis modes duka; requested `focused` mode ba tare da
usable user text ba ana bayar da rahotonsa a matsayin `full` a aikace.

Guardrail ɗin yana fitar da kowane supported video part amma ba ya bayyana fiye da
`modalityBridgeVideoMaxVideos`. Ga target da aka tabbatar yana da
`supportsVideo === false`, videos da suka gaza da waɗanda suka wuce iyaka suna zama
explicit safe text markers domin kada wani raw video ya tsira. Idan capability ba a sani ba,
waɗannan parts suna riƙe video carrier ɗinsu; duk wani fallback transcript yana bin bounded
text conversion da ke sama. Targets masu `supportsVideo === true` suna tsallake bridge ɗin.
Client request abort signal yana wucewa ta download, broker queue,
subprocesses, da caption calls; aborts suna dakatarwa tsakanin videos kuma ba sa taɓa fail open
zuwa raw media.

Runtime settings suna samun goyon bayan DB kuma Zod ne ke validate su:

| Maɓalli                             | Na asali    | Iyaka / ɗabi'a                                                                                                              |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime na zaɓi, sai an amince a kunna shi                                                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` yana kiyaye taken bayani na gama-gari; `focused` yana amfani da mahallin sabon mai amfani mai iyaka kuma marar amana |
| `modalityBridgeVideoModel`          | `""`        | Yana gado samfurin Vision Bridge                                                                                            |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ko `segment_aware` mai daidaiton kaso; gazawar mai ganowa tana komawa zuwa `uniform`              |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                              |

Tsofaffin ƙimomin lokacin jira na Video da aka adana waɗanda suka wuce daƙiƙa 120 ana rage su zuwa
wa'adin broker; ana ƙin sabbin rubuce-rubucen saituna da suka wuce wannan iyaka.
`GET /api/modality-bridge/video/runtime` yana buƙatar amintaccen wurin loopback
na gida mai hatimi kafin tantancewa ko binciken runtime, sannan yana buƙatar
izinin gudanarwa. Yana mayar da `available` kawai, tsabtattun sigogin FFmpeg/ffprobe, da tabbataccen
dalili idan runtime ba ya samuwa. Wurin ƙarshen fitarwa na ciki ba
API na loda fayil na jama'a ba ne: cikar jerin jira yana mayar da `503` tare da `Retry-After`, yankewar
haɗin mai kira tana mayar da `499`, kuma tabbataccen wa'adin broker yana mayar da `504`. Amsoshin da aka sauya suna ƙara
`video->text;model=<visionModel>;parts=<videos>` zuwa taken tsakiya na
`x-omniroute-modality-bridge` ba tare da cire sassan Vision ko Audio ba.

### Mai Ɓoye PII (`piiMasker.ts`)

Yana aiki a matakai **biyu**.

- **`preCall`** yana kwafe payload, yana bi ta `system`, `messages`, `input`, da
  `prompt` (har da abubuwan da suke zaren rubutu kai tsaye), sannan yana amfani da `processPII()` (daga
  `@/shared/utils/inputSanitizer`) a kan filayen `content`/`text` masu nau'in zare. Lokacin da
  `PII_REDACTION_ENABLED=true`, ana ɓoye PII da aka gano a cikin
  payload mai fita. Wannan ba ya dogara da `INPUT_SANITIZER_MODE` (wanda ke sarrafa
  manufofin shigar da umarnin yaudara kawai). Lokacin da aka kashe ɓoyewa, kiran yana adana
  adadin abubuwan da aka gano ba tare da sake rubuta abun ciki ba.
- **`postCall`** yana yin kwafi mai zurfi na amsar, yana gudanar da `sanitizePIIResponse()` tare da
  mai ɓoyewar tsarin Responses-API (`maskResponsesOutput` — yana rufe
  `output_text` da `output[].content[].text`). Idan wani ɓoyewa ya faru,
  amsar da aka gyara tana maye gurbin ta asali.

Matakin kariyar ba ya taɓa toshewa; yana yin alama (`meta.detections`,
`meta.redacted`) ko sake rubutawa kawai.

#### Zaɓi bisa nau'i, keɓaɓɓun alamu da ƙididdigar ganowa

**Dashboard → Settings → Security → PII masking** yana zaɓar _abin_ da za a ɓoye. Ba ya
kunna ɓoyewar: har yanzu `PII_REDACTION_ENABLED` (buƙata) da
`PII_RESPONSE_SANITIZATION` (amsa + SSE) ne ke yin hakan, kuma dukansu a kashe suke ta tsohuwa.

- **Zaɓi bisa nau'i** — an jera ginannun ids a
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Rashin saiti yana nufin kowane
  nau'i (ɗabi'ar da ake da ita kafin samuwar wannan saitin). Alamar
  `ssn_us` ta injin buƙata tana daidaita zuwa `ssn`. Samfuran shiri (Minimal, Standard, Financial,
  Brazilian, USA, Full) suna cike akwatunan zaɓi ne kawai a UI.
- **Keɓaɓɓun alamu** — har zuwa alamun regex ko wildcard guda 20 (`*` = har zuwa haruffa 64
  marasa farin sarari, `?` = ɗaya). Daidaitattun sakamako suna zama `[CUSTOM_REDACTED]`.
  Kowane alama yana wucewa ta `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): bai wuce haruffa 500 ba, flags sun taƙaita
  zuwa `g i m s u`, dole ne ya compile, dole ne ya tsallake `safe-regex` (mummunan
  komawa-baya), kuma kada ya dace da zaren da babu komai ko alamar madadin ɓoyewa.
  Ana ƙin alamar da ta gaza lokacin adanawa da gwadawa, sannan layin da aka adana
  wanda ya gaza ana tsallake shi a runtime maimakon a compile shi. Keɓaɓɓun alamu suna
  aiki ne kawai yayin da aka kunna ɓoyewa.
- **Ƙididdigar ganowa** — adadi bisa kowane nau'i (ba a taɓa adana ƙimomin da suka dace ba), ana riƙe su a
  ƙwaƙwalwa kuma ana sake saita su bayan sake farawa (`src/lib/pii/piiDetectionStats.ts`). Suna
  ƙaruwa ne kawai yayin da aka kunna ɓoyewa.

Saitunan suna cikin teburin `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) kuma ana karanta su ta cache na 1 s. API:

| Hanya  | Path                     | Manufa                                                                              |
| ------ | ------------------------ | ----------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Yanayin flag, `enabledTypes`, `customPatterns`, ƙididdigar ganowa                   |
| `PUT`  | `/api/settings/pii`      | Maye gurbin `enabledTypes` (`null` = duka) da/ko `customPatterns`                   |
| `POST` | `/api/settings/pii/test` | Gwajin kwaikwayo na alama ɗaya a kan samfurin da bai wuce 8 KB ba; ba a adana komai |

Duk ukun suna buƙatar izinin gudanarwa kuma suna tantance body da Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Shigar da Umarnin Yaudara (`promptInjection.ts`)

Yana gano tsarin cutarwa a cikin abun ciki da mai amfani ya samar, kuma yana aiwatar da
manufofin da aka saita. Ɗabi'ar tana gudana ne bisa environment variables da zaɓuɓɓukan constructor:

| Saiti          | Canjin muhalli                                                                                        | Tsoho  | Tasiri                                                                                                                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An kunna       | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Idan `false`, guardrail ɗin zai dakatar da aiki nan take.                                                                                                                                                |
| Yanayi         | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Manufar injection: `block`, `warn`, ko `log`. (Ana karɓar `redact` don dacewa da tsoffin sigogi amma **ba ya** cire rubutun injection; `PII_REDACTION_ENABLED` ne ke sarrafa sake rubuta PII na buƙata.) |
| Iyakar toshewa | zaɓin `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (laƙabi `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Mafi ƙarancin matakin tsanani da ake buƙata don toshewa. Matsakaici na sa-ido kawai ne a saitin tsoho.                                                                                                   |

**Fifikon yanayi** (`getMode`): `options.mode` na mai kira →
sake-rubutawar **DB feature-flag** ta `INJECTION_GUARD_MODE` (Dashboard → Settings →
Feature Flags) → env na `INJECTION_GUARD_MODE` → env na `INPUT_SANITIZER_MODE` →
`warn`. Saboda haka, sake-rubutawa daga dashboard tana rinjayar env vars, don haka
UI na Feature Flags yana sarrafa guard mai aiki kai tsaye (ba tare da sake farawa ba).
Karatu daga DB yana da kariyar gazawa: idan kuskure ya faru, guard ɗin zai koma ga
halayyar da env ke ƙayyadewa, kuma idan ba a saita sake-rubutawa ba halayyar za ta
kasance daidai da warwarewa ta env kaɗai.

Tushen ganowa:

1. `sanitizeRequest()` daga `@/shared/utils/inputSanitizer` (saitin detector na
   bai ɗaya da ake amfani da shi a wasu wurare cikin pipeline).
2. `DEFAULT_GUARD_PATTERNS` da aka gina ciki (a halin yanzu `system_override_inline`
   da `markdown_system_block`, dukkansu suna da tsananin `high`).
3. `customPatterns` na zaɓi da ake miƙawa ta zaɓuɓɓukan constructor (strings, regex,
   ko records na `{ name, pattern, severity }`).

Lokacin da `mode === "block"` **kuma** aƙalla ganowa ɗaya ta kai iyakar
tsanani, `preCall` zai dawo da `{ block: true, message: "Request rejected:
suspicious content detected" }`. A yanayoyin `warn`/`log`, guardrail ɗin yana
rubuta log amma yana ƙyale kiran. Haka kuma ana export na shared helper
`evaluatePromptInjection()` don masu kira da ke buƙatar tantance prompts ba tare
da bi ta registry ba.

**Iyakar dubawa (v3.8.20):** detector ɗin yana bincika **16 KB na farko kawai**
na haɗaɗɗen rubutun prompt — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes)
a cikin `src/shared/utils/inputSanitizer.ts`. Dukansu `detectInjection()` da
`evaluatePromptInjection()` suna yin `slice(0, MAX_INJECTION_SCAN_BYTES)` kafin
gudanar da pattern loop. Umarnin injection suna kusa da farkon input, don haka
wannan yana iyakance CPU/GC na regex kan payloads masu ɗaruruwan KB ba tare da
raunana ganowa ba (duba #3932, #4041).

### Mai Rufe Bayanai na Shaida (`credentialMasker.ts`)

Yana aiki a **dukkan** matakai, kuma shi ne na ƙarshe a default chain (priority
`95`). Yana ɓoye sanannun patterns na API-key / secret-token daga outbound
payload (abubuwan saƙo, arguments na tool-call, sakamakon tools) **da kuma**
amsar provider, don kada credential da aka liƙa cikin prompt (ko wanda sakamakon
tool ya maimaita) ya zube zuwa upstream provider ko ya koma ga client.

- **Sai an kunna da gangan kawai**, bisa ƙa'ida iri ɗaya da PII redaction
  (kusa da Hard Rule #20): yana a kashe sai dai idan
  `settings.credentialRedactionEnabled === true` **ko**
  `CREDENTIAL_REDACTION_ENABLED=true`. Idan yana a kashe, guardrail ɗin ba ya yin
  komai — ba ya taɓa toshewa kuma ba ya taɓa sake rubutawa.
- `redactCredentials()` yana bi ta cikakken payload/response tree (`walkValue()`,
  mai kariya daga prototype-pollution, mai kariya daga cycles ta `WeakSet`) kuma
  yana maye gurbin matches da placeholder na `[REDACTED:<type>]`, yana cloning
  rassan da suka canza kawai.
- `CREDENTIAL_PATTERNS` yana rufe keys na LLM providers (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens na VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), payment keys (Stripe, Square), cloud
  keys (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs,
  connection strings masu ɗauke da credentials (`mongodb://user:pass@...`, da
  sauransu), da kuma generic pattern na darajar header
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Ana ɓoye keys masu siffar header
  (`authorization`, `x-api-key`, `api-key`, `apikey`) bisa tsari (darajar kawai,
  ana kiyaye scheme prefix kamar `Bearer `/`Basic `) maimakon amfani da generic
  text regex.
- Guardrail ɗin ba ya taɓa toshewa; sake rubutawa kawai yake yi
  (`modifiedPayload` / `modifiedResponse`) kuma yana ƙara annotations
  (`meta.credentialsRedacted`, `meta.count`).

Kariyar regression: `tests/unit/credential-masker-guardrail.test.ts`.

## Kwangilar Tushe (`base.ts`)

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
  block?: boolean; // true yana dakatar da sarkar nan take
  message?: string; // ana nuna shi lokacin da aka toshe
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // preCall ne ke mayar da shi don sake fasalin buƙatar
  modifiedResponse?: TValue; // postCall ne ke mayar da shi don sake fasalin amsar
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

Guardrail yana nuna cewa “babu canji” ta hanyar mayar da ko dai `void`, `{}`, ko
`{ block: false }`. Mayar da `modifiedPayload`/`modifiedResponse` yana maye gurbin
ƙimar da ke gudana cikin sarkar zuwa guardrails na gaba.
`signal?: AbortSignal` yana isar da zagayowar rayuwar mai kira zuwa guardrails. Soke buƙata shi ne keɓantaccen yanayin fail-open da aka yi da gangan: gadajen kafofin watsa bayanai suna dakatar da aiki kuma su share abubuwan wucin gadi ba tare da dawo da ɗanyen kafofin watsa bayanai zuwa manufa da aka san ba ta goyon bayansu ba.

## Rajista (`registry.ts`)

Singleton `guardrailRegistry` yana bayyana:

- `register(guardrail)` — yana ƙara (ko maye gurbin ta sunan da aka daidaita) guardrail kuma
  yana sake tsarawa ta hanyar hawan `priority`.
- `clear()` / `list()` — masu taimakawa gudanarwa.
- `runPreCallHooks(payload, context)` — yana maimaita guardrails masu aiki, yana wuce da
  payload ta hanyar `modifiedPayload`, kuma yana tsayawa a farkon `block: true`.
- `runPostCallHooks(response, context)` — tsarin guda ɗaya a gefen amsa.
- `resetGuardrailsForTests({ registerDefaults })` — yana share yanayi kuma a zaɓi
  yana sake yin rajistar tsoffin abubuwan don tsabtataccen keɓewar gwaji.

Duk masu gudu suna dawo da `{ blocked, payload|response, results, guardrail?, message? }`
inda `results` shine jerin bayanan `GuardrailExecutionResult` waɗanda suka haɗa da
filayen `blocked`, `skipped`, `modified`, `error`, da `meta` na kowane guardrail,
masu amfani don bin diddigi.

### Kashe Guardrails Ga Kowane Buƙata

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` yana tattara
jerin sunayen guardrail da aka cire kwafi waɗanda ya kamata a tsallake su don
buƙatar yanzu. Tushen (duk na zaɓi, duk an haɗa su):

- `apiKeyInfo.disabledGuardrails`
- Jikin buƙata `disabledGuardrails` (matakin sama)
- Jikin buƙata `metadata.disabledGuardrails`
- Header `x-omniroute-disabled-guardrails` (ko tsohon
  `x-disabled-guardrails`)

Ƙimar na iya zama jerin igiyoyi ko igiya mai raba-koma; ana daidaita sunaye
zuwa ƙananan haruffa kebab-case (`pii_masker` → `pii-masker`). Ana wuce da
sakamakon ta hanyar `context.disabledGuardrails` zuwa rajista, wanda ke
tsallake guardrails masu dacewa (`skipped: true` a cikin `results`).

## Tsarin Aiki

Ga kowane buƙata da ke gudana ta `src/sse/handlers/chat.ts` da
`open-sse/handlers/chatCore.ts`:

1.  `resolveDisabledGuardrails(...)` yana gina jerin abubuwan da za a tsallake daga maɓallin API, jiki,
    da kuma kanun labarai.
2.  `guardrailRegistry.runPreCallHooks(body, ctx)` yana gudanar da guardrails a cikin tsarin fifiko mai hawa:
    - Guardrails da aka kashe ana rubuta su a matsayin `skipped`.
    - Kowane `preCall` na guardrail na iya sake rubuta bayanan da aka ɗora ta hanyar `modifiedPayload`.
    - `block: true` na farko yana dakatar da sarkar kuma mai sarrafawa yana mayar da
      martanin kin amincewa da guardrail.
3.  Bayanan da aka ɗora (watakila an sake rubuta su) suna shiga cikin hanyar haɗin gwiwa da kuma
    aikin aika zuwa sama.
4.  Bayan an haɗa martanin, `guardrailRegistry.runPostCallHooks(...)`
    yana gudanar da sarkar iri ɗaya akan martanin. `block: true` anan yana jefar da martanin daga sama.

Guardrails da suka jefa kuskure ana rubuta su da `error: <message>` kuma ana shigar da su ta hanyar
`logger.warn`, amma sarkar tana ci gaba – an tsara ta don ta ci gaba duk da kuskure.

## Saita

Ma'aunin muhalli da guardrails na ciki ke karantawa:

| Variable                              | Wanda ke amfani da shi      | Tasiri                                                                                              |
| :------------------------------------ | :-------------------------- | :-------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`          | Saita `false` don kashe gano gaba ɗaya.                                                             |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`          | Manufar allura: `warn`, `block`, ko `log`. Tsohon darajar `redact` baya sake rubuta rubutun allura. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`          | Yanayin don kariyar allura; kuma alamar fasalin DB da **ke mamaye** ma'aunin muhalli (DB > ENV).    |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`          | Mafi ƙarancin tsanani da `MODE=block` ke ƙi: `high` (tsoho), `medium`, ko `low`.                    |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`          | Tsohon suna ga `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                   |
| `PII_REDACTION_ENABLED`               | `pii-masker`                | Lokacin da `true`, PII na buƙata ana gyara shi (mai zaman kansa daga yanayin allura).               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (ƙasa da ruwa) | Yana sarrafa halayen masker na gefen martani.                                                       |

Guardrails na Modality Bridge suna karanta saitin lokacin aiki daga ma'ajiyar saitunan da DB ke tallafawa
(`getSettings()`), ba ma'aunin muhalli ba. Maɓallan farko na Vision sune
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, da
`modalityBridgeCacheMaxEntries`. Tsoffin maɓallan
`visionBridge*` ana karɓar su ne kawai a matsayin abin da aka rubuta na sake karantawa na zagaye ɗaya;
rubuce-rubucen dashboard suna amfani da maɓallan farko. Abubuwan tsoho da mai warwarewa na sake karantawa suna zaune a
`src/shared/constants/modalityBridgeDefaults.ts`, tare da tsoffin ma'auni da aka riƙe a
`src/shared/constants/visionBridgeDefaults.ts`.

Audio yana amfani da `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, da `modalityBridgeAudioMaxClips`, tare da saitunan
`modalityBridgeCache*` da aka raba. Audio bashi da tsohon maɓallin sake karantawa saboda an gabatar da waɗannan maɓallan tare da tsarin Modality Bridge.

Video yana amfani da `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, da
`modalityBridgeVideoTimeout`, tare da saitunan `modalityBridgeCache*` da aka raba.
An kashe shi ta tsohuwa saboda FFmpeg/ffprobe sune zaɓin dogaro na aiki kuma
ƙara rubutun firam yana ƙara jinkiri da farashin samfuri.

## Tsare-tsare na Musamman

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "An wuce kasafin kuɗi na yau da kullun" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Matakai:

1. Ƙirƙiri `src/lib/guardrails/myGuardrail.ts` yana faɗaɗa `BaseGuardrail`.
2. Aiwatar da `preCall` da/ko `postCall`.
3. Ko dai a yi rajista a lokacin shigo da kaya (tura daga `registerDefaultGuardrails`) ko
   kiran `guardrailRegistry.register(...)` a lokacin gudu — rajistar tana maye gurbin
   kowane tsarin tsaro na baya da suna ɗaya.
4. Ƙara gwaje-gwaje a ƙarƙashin `tests/unit/` (misalai masu akwai:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Gwaji

Yi amfani da `resetGuardrailsForTests()` tsakanin gwaje-gwaje don farawa daga sanannen yanayi.
Wuce `{ registerDefaults: false }` don farawa da rajista mara komai kuma
yi rajistar tsare-tsaren tsaro kawai da ake gwadawa. Vision Bridge yana karɓar allurar dogaro (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge yana bayyana
daidaitattun abubuwan da suka dace don saituna, iyawa, zaɓin samfurin STT, binciken takardun shaida,
da rubutawa. Don haka gwaje-gwaje na iya yin amfani da duka hanyoyin ba tare da DB
ko samun damar hanyar sadarwa ba.

## Duba Kuma

- `src/lib/guardrails/` — aiwatarwa
- `src/shared/utils/inputSanitizer.ts` — mai gano abubuwan da aka raba wanda ke ba da ƙarfi
  allurar saƙo da rufe PII
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge tsoffin saituna da
  jerin samfuran da aka tilasta-gada
- `src/shared/constants/modalityBridgeDefaults.ts` — Vision/Audio tsoffin saitunan lokacin gudu
- `docs/architecture/RESILIENCE_GUIDE.md` — Layer na orthogonal (mai karya kewaye, sanyaya)
- `docs/reference/ENVIRONMENT.md` — cikakken bayanin env var

## Rufin hanyar kariya daga allura & ƙungiyar ja (Mataki na 8 · Block D)

Kariyar allura (`createInjectionGuard` / `withInjectionGuard`) tana rufe duk hanyoyin
da ke karɓar saƙonnin mai amfani. Tana mutunta `INJECTION_GUARD_MODE` (tsoho `warn` = log kawai;
`block` = yana dawo da HTTP 400 `SECURITY_001`).

| Nau'i | Hanyoyi | Yanayin tsoho |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | warn |
| Rubutu (mai akwai) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions` | warn |
| Generative | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn |
| Data | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations` | warn |

Cire rubutu (`extractMessageContents`) yana rufe `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Ƙungiyar ja (dare, `nightly-llm-security.yml`):** promptfoo yana tabbatar da cewa kowace hanya tana toshe
corpus na OWASP-LLM a cikin `INJECTION_GUARD_MODE=block`; garak yana gudanar da bincike (yana tsallake ba tare da sirri ba).
An haɗa `moderations` don daidaito — masu aiki a yanayin toshewa na iya keɓe shi ta hanyar
`resolveDisabledGuardrails`.

Aikin dare (`.github/workflows/nightly-llm-security.yml`, cron + manual
dispatch) yana da ayyuka biyu:

- **`promptfoo-guard` (toshewa)** — yana gudanar da `promptfoo eval -c promptfooconfig.yaml`
  tare da `INJECTION_GUARD_MODE=block`. Kowace shari'ar adawa (misali "yi watsi da duk
  umarnin da suka gabata…", DAN-style jailbreaks) yana tabbatar da cewa amsar tana ɗauke da
  `error.code === "SECURITY_001"`, wato, mai gadi ya ƙi buƙatar.
- **`garak` (shawara)** — yana gudanar da garak `--probes promptinject,dan,leakreplay`
  akan wani misali na OmniRoute na gida (`http://localhost:20128/v1`). An rufe shi da
  sirrin mai bayarwa (`PROMPTFOO_PROVIDER_KEY`); yana tsallake da kyau kuma an haɗa shi da
  `|| true`, don haka yana bayar da rahoto ba tare da gazawar CI ba.

Rufin mai taimakon gadi (`createInjectionGuard` / `withInjectionGuard`)
yana rufe kowace hanyar `/v1` mai ɗauke da saƙo; ana cire rubutun saƙo daga
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ta hanyar
`extractMessageContents()` a cikin `src/shared/utils/inputSanitizer.ts`.
