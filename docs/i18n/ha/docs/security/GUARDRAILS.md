# Guardrails (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Tushen gaskiya:** `src/lib/guardrails/`
> **An sabunta na ƙarshe:** 2026-10-17 — v3.8.52 (an ƙara [Rufewa da iyakoki](#coverage-and-limits):
> waɗanne hanyoyi da hanyoyin amsa hooks ke kaiwa, haɗaɗɗun disable headers (#16412), yanayin
> toshe injection a matsayin iyaka ta wajibi (#16413), da abin da ke ganin amsa kafin post-call)

Guardrails suna aiwatar da tsaro, manufofi, da sauye-sauyen abun ciki a iyakar
da ke tsakanin OmniRoute da masu samarwa na upstream. Kowane guardrail na iya
bincika (kuma bisa zaɓi ƙi, canza, ko ƙara bayanin kula) payloads na buƙata
(`preCall`) da amsoshin upstream (`postCall`).

Tsarin **fail-open** ne: idan guardrail ya jefa kuskure yayin aiki, rajista na
rubuta kuskuren kuma yana ci gaba da guardrail na gaba maimakon ya kasa
buƙatar. Toshewa shawara ce ta bayyana (`block: true`), ba wani abu da ya faru
da kuskure ba. Keɓantaccen abu ɗaya kawai shi ne buƙatar da aka fasa: idan an
fasa `signal` na mai kira, guardrail da ya jefa kuskure yana ƙin gudanar da hook
maimakon a tsallake shi.

Hooks **ba** su gudana a kowace hanya ko kowace amsa ba. Karanta
[Rufewa da iyakoki](#coverage-and-limits) kafin ka dogara da guardrail a
matsayin matakin tsaro.

## Guardrails na Asali

Rajista na ɗora guardrails shida da kansa bisa tsarin fifiko lokacin import
(duba `registry.ts` → `registerDefaultGuardrails()`):

| Fifiko | Suna                | Mataki/Matakai | Fayil                 |
| ------ | ------------------- | -------------- | --------------------- |
| `5`    | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`    | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`    | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`   | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`   | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`   | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lambobin fifiko masu ƙanƙanta suna gudana **da farko**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Samfurin tushe GLM 5.3 da `glm-5.3-{low,high,max}` suna da bayanan rajista/spec
na fili `supportsVision:false`. Bambance-bambancen GLM 5.3 Flash suna ci gaba
da kasancewa samfura masu goyon bayan gani kai tsaye. Hanyar `/v1/messages` ta
Claude Code na shiga sarkar guardrail ta pre-call ta `handleChat` da aka raba
**kafin** fassarar Claude-zuwa-OpenAI; dole ne a bayyana ko a kula da hotunan
sakamakon kayan aiki `Read` da aka saka a ciki kafin wannan fassara ta ɗaga su
zuwa abun cikin `image_url` na OpenAI (#17069).

Yana tsare buƙatun da ke ɗauke da hotuna da aka nufa ga **samfura marasa goyon
bayan gani** kuma yana ko dai mayar da dukan buƙatar zuwa samfurin da ke iya
gani ko maye gurbin sassan hotuna da bayanan rubutu da wani samfurin gani mai
daidaitawa ya samar kafin kiran upstream. Wannan yana barin masu samarwa na
rubutu kawai su kula da payloads na multimodal a bayyane.

Tsarin gudana:

1. Tsallake idan samfurin da aka nufa riga ya goyi bayan gani (sai dai idan
   yana bayyana a jerin forced-bridge `isVisionBridgeForcedModel`).
2. Cire sassan hotuna ta `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), wanda ke mika aiki ga **mai gano kafofin watsa
   labarai guda ɗaya** `detectMediaParts()` a `open-sse/utils/mediaParts.ts` —
   tushen gaskiya guda ɗaya da aka raba da tacewar dacewa ta combo. An ƙyale
   cirewa zuwa siffofin da `replaceImageParts` na iya mayarwa baya (kwangilar
   extract↔replace): `image_url` na OpenAI, `source.type:"base64"` na Anthropic
   base64, `source.type:"url"` na Anthropic URL, da `input_image` na Responses
   API. Ana kuma cire da maye gurbin hotunan da suka dace da aka saka a cikin
   `tool_result.content` na Claude Code da fitowar kayan aiki na Responses a
   hanyoyinsu na asali; siffofin nuna alama kawai kayan tacewar combo ne kuma
   ba a cire su ba.
   Tsallake idan ba a sami ɗaya ba.
3. Warware daidaitawar runtime ta `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): sababbin makullan saiti
   `modalityBridge*` suna nasara; tsofaffin makullan `visionBridge*` suna ci
   gaba da kasancewa **madadin zagaye ɗaya** (tagar mayarwa baya). Tsallake
   kafin kowace tafiya cikin kafofin watsa labarai idan an kashe gadar.
4. Mai zaɓin yanayi (`modalityBridgeVisionMode`, duba teburin da ke ƙasa) yana
   yanke shawarar tsakanin mayar da hanya da bayyanawa. Mayar da hanya yana
   mayar da `modifiedPayload` tare da canza `model` kawai, tare da meta
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Hanyar bayyanawa: iyakance hotuna zuwa `maxImages`, tsara tambayar da ke dace
   da aikin, tuntuɓi cache na bayyanawa, kira samfurin gani **a lokaci guda**
   (`Promise.allSettled`), kuma saka sassan rubutu `[Image N]: <description>` a
   wurinsu. Bayyanawa da ta gaza na mayar da `null`: ana adana hoton ƙasa ga
   manufofin da ba a sani ba ko waɗanda ke iya gani (#4012), amma **manufa ta
   kai tsaye da aka tabbatar tana da rubutu kawai** ko combo marar gani na samun
   gurabin rubutu na fili `(unavailable — no vision-capable provider connected)`
   ga kowane hoton da ba a bayyana ba, gami da gazawa na ɓangare da hotunan da
   suka wuce iyakar kiran bayyanawa (#17069). Madadin bayyanawa na combo da ke
   akwai lokacin da duka sun gaza yana ci gaba da kasancewa (#8430).
6. Mayar da `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Mai zaɓin yanayi (`modalityBridgeVisionMode`)

| Yanayi     | Tsoho | Aiki                                                                                                                                                                                                                                                                                     |
| ---------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔     | Heuristic na tsohon zamani, ba a taɓa shi ba (#6640/#7204): models waɗanda ba combo/`auto/` ba suna canza hanya zuwa mafi kyawun vision model sai dai idan asalin model ɗin yana da credentials da ake iya amfani da su (sa'an nan kuma describe); combo targets koyaushe suna describe. |
| `describe` |       | Koyaushe describe — ana tsallake toshewar reroute gaba ɗaya; model ɗin da mai amfani ya zaɓa shi ne koyaushe yake amsawa.                                                                                                                                                                |
| `reroute`  |       | Tilasta reroute: ana kare kariyar keep-credentialed-model. Kariyar credential ta reroute-**target** tana ci gaba da aiki — idan babu vision target da ake iya amfani da shi, gadar tana toshewa tare da bayyanannen kuskure maimakon describe ko aika hotunan raw zuwa text-only target. |

Yanayoyin da aka tilasta suna short-circuit **kafin** auto heuristic ya gudana; halin `auto`
yayi daidai (byte-identical) da guardrail na kafin PR-1.

#### Yankin API-key (`visionBridgeKeyScope.ts`)

Idan maɓallin API na mai kiran yana ƙuntata `allowedConnections`, tafkunan quota
(`allowedQuotas`) ko models (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), gada tana zaɓar kawai
models na reroute da describe waɗanda maɓallin na iya amfani da su, a kan
connections da maɓallin na iya amfani da su. Kiran describe koyaushe yana wucewa ta
OmniRoute self-loop tare da header `x-omniroute-self-loop-key-id`, don haka
buƙatar chat da ta karɓa tana sake ƙaddamar da manufofin connection da model na wannan
maɓallin. `enforceApiKeyPolicy()` yana girmama wannan header kawai tare da self-loop
bearer, don haka zai iya ragin dama kawai, kuma id da ba ya warwarewa ana ƙinsa.

Idan babu vision model da aka ƙyale ga maɓallin, **tabbataccen text-only
target** yana ƙin buƙatar hoton a gida tare da bayyanannen HTTP 400 maimakon
aika image bytes zuwa upstream da ba ya iya (#17069). Ga targets masu
damar vision da ba a sani ba ko ta asali, hanyar describe tana kiyaye tsohon
halin fail-open (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Buƙatun da ba su da maɓalli, da maɓallan da ba su da waɗannan ƙuntatawa, suna aiki
daidai kamar yadda suka kasance.

#### Describe prompt mai fahimtar aiki (`modalityBridgeVisionTaskAware`)

Tsoho **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) yana ƙara
rubutun **saƙon mai amfani na ƙarshe** (an guntata shi zuwa haruffa 500) zuwa
prompt na asalin describe, yana jagorantar bayanin zuwa abin da mai amfani
ya tambaya da gaske (tsarin codex-vision-proxy) kuma yana neman vision model ya
rubuta rubutun da ake gani. Idan flag ɗin yana kashe — ko babu rubutun mai amfani — ana
amfani da prompt na asali ba tare da canji ba.

Buƙatar OpenAI-compatible ta describe self-loop kanta (`callVisionModelSingle()`
a cikin `visionBridgeHelpers.ts`) koyaushe tana neman `image_url.detail: "high"` —
ba tare da sharadi ba, ga kowane caller/provider, ba a ƙuntata shi ta kowace
alama ta client ba. Sampling na ƙaramin detail yana lalata daidaiton OCR ga ainihin
aikin rubuta-rubutu da wannan prompt yake nema, don haka kiran describe
kanta koyaushe tana neman babban detail duk da wane matakin detail da asalin
buƙatar shigowa ta yi amfani da shi. Wannan yana shafar jikin buƙatar describe na
ciki kawai; ba ya canza yadda OmniRoute yake aika `image_url.detail` na caller a kan
buƙata ta farko — ana amfani da wannan tsoho daban, kuma kawai ga clients na
OpenCode da aka gano, a cikin `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Reshen Anthropic wire-format na describe self-loop ba ya da filin `detail`
kuma ɗayan waɗannan tsofaffin ba ya shafar shi.

#### Iyakar fitarwar describe (`modalityBridgeVisionMaxChars`)

| Maɓalli                        | Tsoho | Kewayo           |
| ------------------------------ | ----- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`   | `0` ko 100–50000 |

`0` (tsoho) yana nufin **babu iyaka** — ana watsar da bayanin da
`callVisionModel()` ya mayar ba tare da canji ba, yana kiyaye halin da yake
akwai. Kowace ƙima a cikin kewayon 100–50000 tana guntata bayanin tare da
ƙari `…` kafin a sake saka shi a matsayin `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` a cikin `src/lib/guardrails/visionBridge.ts`).
Ku ɗaga wannan ga ayyukan OCR masu yawan detail inda model na ƙasa yake buƙatar
cikakken rubutu; ku rage shi don iyakance amfani da token a kan vision models
masu yawan magana. Filin dashboard yana a panel na Advanced a shafin Vision
(`modality-bridge-max-chars` a cikin `ModalityBridgeVisionTab.tsx`) kuma yana
matsa kowace ƙima tsakanin 1 da 99 sama zuwa kasan 100 yayin da yake barin `0`
na musamman ba tare da taɓa shi ba — `0` ƙimar Zod ce mai inganci da kanta
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ba kawai
tsohon "ba a saita ba" ba.

#### Cache na describe (`modalityBridge/bridgeCache.ts`)

Cache na LRU + TTL a cikin ƙwaƙwalwa (in-memory) ga fitarwar describe, ana raba shi
a duk tsari (process-wide). Key = `sha256(imageRef + composedPrompt + configuredBridgeModel)` tare da
length-prefix framing (babu haɗuwowa a iyakokin fili). Abun da yake cikin model shine
bridge model ɗin da aka **configure**, ba model ɗin da ya amsa a zahiri ba —
`callVisionModel` na iya fallback a ciki, kuma yin keying a kowace ƙoƙari zai
gutsure cache ɗin. Ba a cache describe da suka gaza. Saitunan:

| Maɓalli                         | Tsoho  | Kewayo  |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Daidaita hoton mai nisa (self-loop describe/base64 fetch)

Lokacin da gadar ta kawo hoton **mai nisa** da kanta — kiran describe na kanta na Anthropic da kuma juyin base64 na claude-wire-format (`ensureBase64ImagesForClaudeWire`), dukansu ta hanyar `fetchRemoteImageAsDataUri()` a cikin `visionBridgeHelpers.ts` — ana watsa data URI ɗin da ta samu ta cikin `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) kafin a saka shi a cikin buƙatar vision-model. Hotunan da suka wuce girma ana rage su zuwa **2048px a dogon gefe** (wanda yayi daidai da iyakar resize da OpenAI/Anthropic riga suna amfani da ita a gefen server), wanda yana rage bytes/latency na upload ba tare da canza abin da vision model ke gani ba. Resizing yana amfani da `sharp`, wanda ake loda shi ta hanyar dynamic import: a dandamali inda native binary ɗinsa ya kasa loda, `normalizeDataUri()` **ba ya taɓa jifa kuskure** — yana faɗowa zuwa passthrough na ainihin bytes, don haka hanyar describe/base64-conversion na ci gaba da aiki koyaushe. Hakanan ana watsa bytes waɗanda ba hoto ba (fetch da bai dawo da hoton da za a iya decode ba) ba tare da taɗa su ba. An ƙuntata wannan daidaitawa ga hotunan da gadar ta kawo don kiran kanta kawai — ba a taɓa amfani da ita ga ainihin passthrough payload na mai kira ba, bisa ka'idar canji ta opt-in-kawai (Hard Rule #20).

#### Schema ɗin saituna + ƙaura (migration)

Sabbin maɓallan `modalityBridge*` ana tantance su da Zod a cikin `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, ƙungiyar `modalityBridgeCache*` guda uku, da ƙungiyar `modalityBridgeAudio*` da Audio Bridge ke amfani da ita. Ƙaurar `141_modality_bridge_settings.sql` tana kwafe ainihin ƙimar `visionBridge*` na tsoho zuwa sababbin maɓallan da suka dace (idempotent, ba ta taɓa rubuta ƙimar `modalityBridge*` da mai aiki ya saita a bisa ba); tsofaffin maɓallan suna ci gaba da karɓa azaman fallback na karantawa na tsawon zagayon fitarwa ɗaya.

#### Header ɗin bayyananniya + ƙididdiga

Amsoshin da aka juya ta describe suna ɗauke da
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(wanda `buildModalityBridgeHeader()` ya gina a cikin `modalityBridge/bridgeStats.ts`, kuma `withModalityBridgeHeader()` ya buga a cikin `src/sse/handlers/chatHelpers.ts`). Buƙatun da aka sake jagorantarwa (reroute) **ba su** samun header — ba a taɗa payload ɗin ba kuma musayin model riga ya bayyana a filin `model` na jikin amsar.

`GET /api/modality-bridge/stats` (tantancewar gudanarwa, wannan matakin da `GET /api/settings`) yana dawo da ƙididdigar kowane modality da ke cikin memory `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` don `vision`, `audio`, da `video`. `averageLatencyMs` yana amfani da `latencySamples`, ba duk attempts ba, a matsayin mai raba (denominator); aiki da ba a ɗauki lokacinsa ba ba ya ƙirƙirar samfur na sifili-milli daƙiƙa. `bridged` ya kasance sunan laƙabi mai jituwa da tsohon tsari (backward-compatible alias) don nasarar juyawa; ƙoƙarin da ya gaza ba ya ƙara shi. Ana sake saita ƙididdigar (counters) lokacin da aka sake ƙaddamar da tsari (process restart) bisa zato (telemetry, ba accounting ba).

#### Saitin Dashboard

Shafin dashboard na musamman shine `/dashboard/settings/modality-bridge`. Shafukan `Vision`, `Audio`, da `Video` waɗanda za a iya nufowa ta URL suna kiyaye query parameters yayin da ake canza ƙimar `tab`. Shafin Vision yana bayyana: kunna (enablement), yanayin (mode), zaɓin model (ciki har da tsohon atomatik), prompting mai fahimtar aiki (task-aware), iyakoki masu zurfi na timeout/hoto/tsawon-bayani/cache, ƙididdigar runtime, da buƙatar misali mai kariya (guarded). Shafin Audio ma yana aiki: yana bayyana kunna, mai zaɓin model na STT-kawai tare da Auto, iyakoki na timeout/max-clip, ƙididdigar audio, da gwajin misali na `input_audio`. Shafin Video yana aiki: yana ba da rahoton yanayin runtime na FFmpeg/ffprobe — ɗayan yanayi huɗu na UI da aka fayyace (`unknown` yayin da probe yana gudana ko ba a iya kammala shi ba, `restricted` a kan dashboard host wanda ba loopback ba inda aka tsallake probe daga gefen client, `unavailable` bayan an yi probe kuma an tabbatar cewa ba shi, ko `available` tare da nau'ikan FFmpeg/ffprobe) — yana adana iyakoki na enable/model/frame/video/timeout, yana tace mai zaɓin model zuwa models waɗanda ke da ikon vision, kuma yana bayyana ƙididdigar video.

Tsohon katin Vision Bridge a ƙarƙashin saitunan AI yanzu hanyar haɗin jituwa (compatibility link) ce zuwa sabon shafi; ba ya sake mallakar kwafi na biyu na form ɗin. Media Providers kuma yana haɗa ayyukan Image-to-Text da Speech-to-Text zuwa shafukan Modality Bridge da suka dace ba tare da cire Speech-to-Text playground da ke akwai ba.

**Self-loop admission bypass:** lokacin da kiran describe ya wuce ta hanyar self-loop `/v1` na OmniRoute (samfurin provider maras daidaito), ƙaramar buƙatar tana aika `x-omniroute-admission-bypass: internal` kuma ana tantance ta da shaidar self-loop da aka warware — sentinel ɗin `sk_omniroute` na gida a yanayin local, ko maɓallin env `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` da mai aiki ya saita (#1350) don haka deployments masu `REQUIRE_API_KEY=true` su ci gaba da iya gudanar da kiran describe. Ana amincewa da bypass ɗin kawai don waɗancan ainihin shaidodi, don haka masu amfani na waje ba za su iya amfani da header ɗin don tsallake admission ba.

Tsofaffin tsoho (legacy defaults) suna a cikin `src/shared/constants/visionBridgeDefaults.ts`; sababbin tsoho na mode/task-aware/cache da mai warware saituna (settings resolver) suna a cikin `src/shared/constants/modalityBridgeDefaults.ts`. Guardrail ɗin yana fallasa zaɓin constructor `deps` don gwaji su iya shigar da aiwatarwar `getSettings` da `callVisionModel` na ƙarya (fake).

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Yana katse buƙatun chat masu ɗauke da audio kafin su isa makoma da ba a san tana karɓar shigarwar audio ba. Ba ya taɓa sake jagorantar (reroute) buƙatar chat: ana fassara ɓangarorin audio ta hanyar endpoint ɗin multipart mai jituwa da OpenAI da ke akwai, kuma model ɗin chat da aka zaɓa yana ci gaba da fassarar rubutu.

Tsarin gudana:

1. Warware `supportsAudio` ta hanyar `getResolvedModelCapabilities()`. Metadata na rajistar masu samarwa da aka bayyana sarai ne ke lashewa, sannan metadata na samfurin tsayayye, sannan `modalities_input` da aka daidaita. Jerin shigarwa da aka ayyana ba tare da `audio` ba yana zama `false`; rashin shaidar ƙarfi yana kasancewa `null`. Duk `false` da `null` suna kunna gadar hankali, alhali `true` yana kewaya ta.
2. Warware saitunan `modalityBridgeAudio*` kuma fitar da sassan sauti na matakin sama da za a iya yankewa daga kowane sako ta hanyar mai gano `detectMediaParts()` da aka raba. Siffofin watsawa da ake goyon baya sune OpenAI `input_audio`, `audio_url`, da `source.media_type: "audio/*"`. Ana gano sauti na da'a (nested) don jagorantarwa kawai, amma hanyar yankewa ba ta cire shi. Aikin yana da iyaka ta `modalityBridgeAudioMaxClips`; sassan da suka biyo baya suna kasancewa ba a taɗa su ba.
3. Bi `provider/model` da aka saita, ko kuma bar `selectAudioBridgeModel()` ya bi ta `AUDIO_TRANSCRIPTION_PROVIDERS` cikin tsarin katalog ɗaɗɗaɗe kuma ya zaɓi samfurin farko da ke da shaidar shiga ta masu samarwa mai aiki da za a iya amfani da ita.
4. `callAudioTranscription()` yana canza sauti na base64/data-URI zuwa `file` na multipart, ko kuma yana saukar da `audio_url` na nesa ta hanyar mai tsaron fitarwa na jama'a kawai tare da kaffa DNS da iyakar 25 MB. Sannan yana POST fayil ɗin da samfurin da aka zaɓa zuwa self-loop na gida `/v1/audio/transcriptions`, wanda aka tantance shi da `resolveSelfLoopBearer()`. Tafarkin transcription na yanzu yana yin binciken shaidar shiga na al'ada, sarrafa cooldown/iyakar ƙimar, da tura aiki zuwa masu samarwa.
5. Kiran da suka yi nasara suna maye gurbin sassan su da `[Audio N]: <transcript>`. Ana gudanar da kira da `Promise.allSettled`: gazawar kira ɗaya tana adana ainihin ɓangaren sauti na farko (kwangilar #4012). Idan duk kira sun gaza kuma an tabbatar burin `supportsAudio === false`, sassan suna zama `[Audio N]: (unavailable — no STT provider connected)` (kwangilar #8430). Ga burin da ba a san shi ba (`null`), sakamakon da duk sun gaza yana kasancewa ba a taɗa shi ba. Burin da aka tabbata shine na rubutu kawai ba tare da shaidar STT da za a iya amfani da ita ba yana samun wannan stub na bayyana sarai ba tare da yin kiran hanyar sadarwa ba.

Rubutun da suka yi nasara suna amfani da ma'ajin LRU/TTL na Modality Bridge na tsari gaba ɗaya. Maɓallin yana haɗa nuni na sauti, alamar aiki `audio-transcription` ɗaɗɗaɗa, da samfurin STT da aka zaɓa; ba a taba adana gazawa a cikin ma'aji. Gwaje-gwajen sauti suna sabunta ƙididdigar `bridged`, `cacheHits`, `failures`, da `lastUsedAt` da aka raba. Amsoshin da aka sauya suna ɗaukar `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; buƙatun da ba a taɗa ba ba sa samun ɓangaren Audio Bridge.

Saitunan lokacin gudana suna da tushe a cikin DB kuma ana tantance su da Zod:

| Maɓalli                       | Tsoho   | Kewayo                |
| ----------------------------- | ------- | --------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                     |
| `modalityBridgeAudioModel`    | `""`    | Ta atomatik ko STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000           |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                  |

Ma'ajin da aka raba yana kasancewa ƙarƙashin sarrafa `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, da `modalityBridgeCacheMaxEntries`.

### Gadar Bidiyo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Yana katange sassan bidiyo na matakin sama a cikin `messages` na Chat Completions da `input` na Responses API kafin a kira burin da ba shi da goyon bayan bidiyo na asali da aka sani. Siffofin da ake goyon baya sune `input_video`, `video_url`, `video_source`, URLs na HTTPS, da data URIs na `data:video/*;base64,...`. Ba a ɗaukar sunayen fayil ɗin zalli a cikin rubutu a matsayin bidiyo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ne ke mallakar biƙo a cikin buƙata, binciken ƙarfi/doka, tattarawa ta buƙata-ɗaya-ɗaya, da kayan amsa. Aikin bidiyo-ɗaya-ɗaya — karɓa, ma'ajin sakamako gaba ɗaya, bayyana jerin framan (wanda ke haɗa duk rubutun sauti da mai kira ya ayyana), da ƙididdiga/fasa/tsabtacewa ta gwaji-ɗaya-ɗaya — an ɓoye shi a bayan `processVideoPart` a cikin `videoBridgePipeline.ts`, wanda ake kira sau ɗaya ga kowane ɓangaren bidiyo a cikin madauki na `preCall`. Wannan module kuma yana ayyana iyakokin tashoshi na bayyana sarai `VideoMediaBrokerPort` (karɓar bytes da fitar da framan da aka samfurta), `VideoAudioTranscriptionPort` (haɗa rubutun sauti da mai kira ya ayyana tare da bayanan framan da aka samfurta), da `VideoDrilldownPort` (iyakar ajiyar drill-down na framan; har yanzu ba a haɗa shi cikin `processVideoPart` ba — kawai hanyar `/api/modality-bridge/video/drilldown` daban ce ke rubuta shigarwar drill-down a yau).

Hanyar buƙata ta jama'a `/v1` ba ta taba shigo da ko kira ƙaramin tsari (subprocess). Ana saukar da bidiyo na nesa ƙarƙashin iyakar 50 MiB; bidiyo na base64 na ciki suna da iyakar hankali ta 36 MiB da aka decode ga kowane bidiyo don ƙunsar samfur/saƙo/framing ta kasance cikin iyakar karɓar buƙatun JSON na jama'a na 50 MiB. Ana bincikar ƙimar tsawon ciki da ƙimar girman da aka decode kafin raba ƙwaƙwalwar ajiya. Ana buƙatar HTTPS a kan URL na nesa na farko da kowane jujjuyawa (redirect), ta amfani da mai tsaron fitarwa na jama'a kawai na yanzu tare da kaffa DNS. Sannan bytes suna ƙetare ainihin iyakar broker na ciki `POST /api/modality-bridge/video/extract`. Wannan tafarki duka `LOCAL_ONLY` ne da `SPAWN_CAPABLE`, yana karɓar kawai buƙatar da aka tantance ta tsari-ɗaya da loopback mai aminci, kuma ba ya taba karɓar URL, hanyar tsarin fayil, fayil mai aiwatarwa, ko jerin hujjoji. Pipeline na girman jiki na API da mai karanta jiki na matakai na handler dukansu suna tilasta iyakar shigar broker ta 50 MiB ba tare da dogaro da juna ba. Jerin jiransa mai iyaka yana gudanar da cirewa ɗaya a lokaci, yana ba da damar ayyuka huɗu masu jira, kuma yana ƙuntata shigarwa mai jira a 100 MiB.

A cikin broker, `ffprobe` yana karanta fayil na cikin gida mai zaman kansa; tsayayyen
jerin tsarin da aka yarda da su yana ware tsarin jerin kunnawa da na manifest. Ga
containers na dangin MOV da aka yarda da su, nassoshin bayanan MOV na waje suna ci
gaba da kasancewa a kashe ta tsohuwa, kuma tsayayyen umarnin ba ya kunna su.
Dukansu `ffprobe` da `ffmpeg` suna amfani da jerin ladubban da aka yarda da su na
`file` kawai, thread guda ɗaya, tsayayyun jerin argument, ba tare da shell ba,
kuma ana gano executable daga `PATH`. Streams na hoton bango da aka haɗe ba su
cancanci zama abin kunnawa ba. Dole ne duk streams masu kunnawa su cika
iyakokin, kuma ana fifita stream na tsohuwa da aka ayyana a sarari kafin a koma
ga mafi ƙarancin index bisa ƙa'ida tabbatacciya. An iyakance bidiyo zuwa daƙiƙa
600, pixels 8,192 a kowace fuska, da pixels na tushe 33,554,432. FFmpeg yana
ɗaukar frames na JPEG guda 1–16 daga tsakiyar lokuta, yana rage girman dogon
gefe zuwa pixels 1,024 aƙalla ba tare da ƙara girman ƙananan bayanai ba, kuma
ba ya taɓa karɓar URL. Samfurin lokaci yana amfani da `uniform` ta tsohuwa.
Manufofin `scene_aware` na zaɓi da `segment_aware` na gwaji suna yin ƙarin
tsayayyen zagayen FFmpeg guda ɗaya a kan stream na cikin gida da aka riga aka
tabbatar, suna zaɓar timestamps na scene na `showinfo` masu iyaka, sannan su
koma bisa ƙa'ida tabbatacciya zuwa matsakaitan lokuta iri ɗaya na uniform idan
detector ya gaza, lokaci ya ƙare, output ya lalace, ko saitin candidates ya
zama fanko. Yanayin segment-aware yana rarraba samfuran tsakiyar lokaci gwargwadon
validated scene intervals; an yi cikakken bayani game da shaidar segment-aware
da halayen komawa a ƙasa. Ana amfani da tsayayyen iyakar frames 16 bayan zaɓi
a kowace manufa. Idan buƙatar scene-aware tana da kasafin frame guda ɗaya kawai,
tana amfani da tsakiyar lokaci na uniform na cikakken bidiyo mai aiki ko focus
window, sannan ta bayar da rahoton `policyEffective: uniform`: zaɓaɓɓen scene
frame guda ɗaya ba zai iya kiyaye duka ƙarshen lokaci biyu ba. Mai kira zai iya
bayar da focus window mai iyaka (`start`/`end` a daƙiƙu) bisa zaɓi; ana daidaita
iyakokin zuwa tsawon media, ana ƙin windows da aka juya ko marasa finite, kuma
ana aiwatar da duk manufofin sampling ne kawai a cikin interval da aka
normalise. Ana haɗa window ɗin da aka samu a cikin sampling metadata da kuma
prefix na bayanin da ba a amince da shi ba, domin models na gaba su iya bambance
wani sashe da aka mayar da hankali a kai daga cikakken timeline.

Mayar da hankali na semantic caption wani saitin daban ne da ake bayyana a
sarari. Yanayin analysis na tsohuwa `full` yana kiyaye prompt na frame da ake
da shi kuma ba ya taɓa tura rubutun request zuwa caption model. A yanayin
`focused`, bridge yana karanta sabon `text`/`input_text` mara fanko da mai amfani
ya rubuta kawai daga container ɗin Chat ko Responses iri ɗaya, yana normalise
ɗinsa zuwa NFC, yana haɗa control characters da whitespace, sannan yana
iyakance shi zuwa Unicode code points 500. Sakamako marar komai yana komawa
zuwa ainihin prompt na `full`. Ana serialise hint mai amfani a matsayin JSON
cikin keɓantaccen block na untrusted-user-context, kuma yana iya fifita
abubuwan da za a iya gani kawai; ba zai iya soke gargaɗin daban na hana bin
umarnin da ake iya gani ko ji a cikin media ba. Textual focus ba ya taɓa
hasashen `start`/`end` ko canza temporal sampler.

#### Shaidar tsarin segment ta FU-07

`segment_aware` yana amfani da zagayen pre-analysis guda ɗaya mai iyaka a kan
local video stream da aka riga aka tabbatar. Tsayayyen filter chain da farko
yana rage faɗi zuwa pixels 320 aƙalla, yana gano sauye-sauyen scene da frozen
intervals, sannan yana ɗaukar sample a frame 1 a kowace daƙiƙa domin blur,
matsakaicin luma, da bayanan spatial/temporal. An iyakance wannan zagaye zuwa
structural samples 600, FFmpeg/filter thread guda ɗaya, jerin protocol na
`file` kawai da container allowlists iri ɗaya, iyakar process-output ta 1 MiB,
da daƙiƙa 30 aƙalla a cikin abort/deadline na bai ɗaya na broker. Ba ya taɓa
karɓar command, filter, path, ko URL daga request.

Structural values ɗin shaidar sampling ce mai tabbataccen sakamako, ba fahimtar
semantic ta bidiyo ba. Ba sa hasashen subjects, actions, captions, speech, ko
user intent. Iyakokin scene da freeze suna samar da segments; freeze coverage,
blur, exposure, spatial detail, da temporal change kawai suke tasiri kan yadda
ake rarraba kasafin frames 1–16 da ake da shi. Ana kayyade segment da ya daskare
gaba ɗaya zuwa frame guda ɗaya, yayin da segments marasa daskarewa suke fafatawa
kan sauran kasafin. Idan boundaries sun fi frames yawa, ana kiyaye uniform
timeline coverage domin saurin cuts na farko kada su ɓoye dogon segment na
ƙarshe. Ana haɗa scene boundaries da suke cikin analysis resolution na daƙiƙa
1 daga freeze boundary.

Rashin filters, shaida marar tsari ko fanko, kuskuren detector, ko ƙarewar
lokacin bounded pre-analysis yana komawa ga ainihin uniform midpoint policy.
Abort daga mai kira ko deadline na broker ba ya yin irin wannan komawa: yana
dakatar da subprocess da ke gudana, yana hana frame extraction na gaba, sannan
ana cire private temporary tree a cikin `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` yana samar da deterministic real FFmpeg
fixtures domin tanadin caption-call bayan dedup, rarraba kasafin dense-motion,
shaidar blur/exposure/SI-TI, rapid cuts masu dogon tail, da gradual-fade false
positives. Yana rubuta wall time na pre-analysis kuma, inda `/usr/bin/time`
yake samuwa, child CPU da peak RSS. Binciken quality nasa structural oracles ne
kawai. Quality na ainihin caption-model yana ci gaba da kasancewa `HOLD` saboda
wannan harness ba shi da authorized endpoint ko frozen judge. Monetary savings
ma suna ci gaba da kasancewa `HOLD` sai dai idan
`--caption-cost-per-call-usd` ya bayar da explicit positive per-call estimate;
script ɗin ba ya taɓa ƙirƙirar ɗayan sakamakon.

An iyakance kowane frame zuwa 4 MiB, dukkan raw frames tare zuwa 23 MiB, kuma
martanin broker da aka serialized zuwa 32 MiB. Ana cire wani keɓaɓɓen kundin
adireshin wucin gadi a cikin `finally`. OmniRoute ba ya zuwa tare da FFmpeg
kuma ba ya karɓar hanyar executable da aka keɓance. Kafin sanya caption, gadar
na yin matakin cire kwafin gani mai tsanaki: ana rage kowane JPEG zuwa buffer
na grayscale 16×16 kuma ana kwatanta shi ne kawai da ƙarshen frame da aka
riƙe. Idan kasafin caption da ake nema ya wuce frame ɗaya, cirewa na samar da
ƙayyadadden tarin 'yan takara har sau biyu na wannan kasafin kuma ba ya taɓa
wuce frames 16. Ana aiwatar da iyakar da aka nema kawai bayan cire kwafi, tare
da adana farkon da ƙarshen 'yan takara da aka zaɓa yayin rage yawan ƙarshe
idan kasafin ya kai aƙalla biyu. Manufar
`grayscale-16x16-mean-cells-v2` mai version tana amfani da mafi girma daga
cikin mean luma delta da rabin cells na thumbnail waɗanda normalized delta
nasu ya kai aƙalla 0.05. Ƙofar kwafi ita ce ƙayyadaddiyar 0.04, wadda aka
zaɓa don hasashen aiki maimakon a bayyana ta a matsayin saitin runtime.
Wannan sigina na biyu mai babban bambanci yana adana ƙananan motsi da
canje-canjen rubutu da ake gani waɗanda kwatancen mean kaɗai na iya ɓoye.
Kurakuran comparator ko decoder suna fail open kuma suna ci gaba da rufewa.
Metadata na fitarwa yana raba 'yan takara da aka ciro, frames da aka yi
amfani da su cikin nasara, da kwafin gani da aka jefa.

Wani ɓangaren bidiyo da aka yi wa alama a bayyane na iya neman contact sheet
mai lambar lokaci. Gadar na gina mafi yawa grid na JPEG mai shafi 4, frame 16.
Kowane cell na pixel 512 yana ƙona lambar lokacin tushensa a cikin wani sashin
ƙasa mai babban bambanci, yayin da waɗannan lambobin lokaci suke ci gaba da
kasancewa a cikin metadata na rubutu don dangantaka da audit na gaba. Cikakken
JPEG yana ci gaba da kasancewa a iyakance zuwa 32 MiB. Idan `sharp` ba zai iya
decode ko tsara grid ɗin ba, gadar na komawa ga frames na JPEG ɗaya-ɗaya;
fashewar abokin ciniki har yanzu tana yaduwa ta aikin sheet.

An keɓance shaidar haɓaka da gangan daga microbenchmark na synthetic
composition. `scripts/perf/video-bridge-contact-sheet-eval.ts` yana bayyana
harness na A/B mai schema-versioned don ainihin samfuran gani masu dacewa da
OpenAI. Yana auna tokens da mai samar ya ba da rahoto, jinkirin ƙarshe-zuwa-
ƙarshe (ciki har da tsara sheet), ƙirar kiran samfuri, da riƙe gaskiya da
manifest ya bayyana. Ba a rubuta ainihin amsoshin samfuri a cikin rahoton;
ana riƙe kawai da digests na SHA-256 da IDs na gaskiya da suka dace. Harness
ba ya yin kiran hanya ko samfuri na biya sai dai idan an wuce `--execute-real`
kuma an saita `--model`, `OMNIROUTE_BASE_URL`, da `OMNIROUTE_API_KEY`. Ba
tare da wannan ainihin gudu a bayyane ba, hukuncinsa da na'ura za ta iya
karantawa yana ci gaba da kasancewa `HOLD`; auna synthetic payload/ƙirar kira
kaɗai ba su zama shaidar haɓaka ba.

Masu kira na iya manna array na `transcript.cues` na zaɓi zuwa wani ɓangaren
bidiyo da ake goyon baya idan sun riga suna da rubutu da aka daidaita. Dole ne
kowane cue ya ɗauke `text`, tsaka-tsaki na `start`/`end` mai iyaka a cikin
tsawon lokacin da aka bincika, da `source` da aka whitelisted (`client`,
`embedded`, ko `audio-bridge`); `confidence` na tashi a tsohuwa zuwa `1` kuma
dole ya kasance tsakanin `0` da `1`. Ana narkar da cues masu kwafi daidai.
OmniRoute ba ya taɓa fara transcription daga wannan metadata: ana kwafe cues
da aka tantance cikin sakamakon da aka bayyana tare da source, confidence, da
tsaka-tsaki, kuma ana gabatar da su a matsayin abubuwan lura marasa amana
tare da captions na frame. Ana ƙin rubutun da ba daidai ba, wanda ya wuce
iyaka, ko wanda ba shi da asali maimakon a gauraya shi cikin rafin caption.
Dukkan hanyoyin transcript na jikin buƙata suna daidaita asalin da aka bayar
zuwa `client`, ciki har da lakabin `embedded` ko `audio-bridge` da wadanda
suka furta kansu. Sai dai adapter mallakar uwar garken ne zai iya sanya
waɗannan lakabin amana ta hanyar hujjar `trustedSource` ta code kaɗai; filin
JSON na buƙata ba zai iya isa wa wannan hujjar ba. Rubutun transcript yana ci
gaba da kasancewa abun da ba a amince da shi wanda aka samo daga kafofin watsa
labarai, duk da asalinsa, kuma ba dole ba ne ya taɓa ƙaddara izini.

Mai kira mai ci gaba na iya bayar da track na `audioTranscript` don wannan
bidiyon; ana ɗaukarsa a matsayin rubutun da abokin ciniki ya bayar, ba shaidar
transcription na uwar garken ba. Sashen haɗin fusion na gudanar da abubuwan
lura na gani da na sauti a ƙarƙashin ƙarshen lokaci ɗaya da sigina na fashewa,
yana tsara su a kan wani tsarin lokaci na gama gari, yana narkar da kwafi
daidai, kuma yana ba da rahoton sakamako na ɓangare idan ɓangare ɗaya kaɗai ya
yi nasara. `audioTranscript` marar inganci yana ragewa zuwa wannan sakamakon
ɓangare — ana adana bayanin gani kuma reshen sauti yana yin rikodin lambar
gazawa da aka tsabtace — maimakon gazawar dukan bidiyon. Ana adana samuwar
kowane reshe, tutar ɓangare, da lambobin gazawa da aka tsabtace a cikin
sakamakon da aka bayyana, a cikin metadata na guardrail
(`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), a cikin
metadata na result-cache, da kuma a cikin ƙididdigar fusion na gadar. Hanyar
Video Bridge ta tsohuwa ba ta kiran speech-to-text ko saukar da kwafin kafofin
watsa labarai na biyu; ba tare da wannan track a bayyane ba, tana ci gaba da
kasancewa bidiyo kaɗai.

**Adana rubutaccen jawabi (#12150 P1).** Wannan yana aiki ta atomatik duk lokacin da
Video Bridge (wanda shi kansa sai an zaɓi amfani da shi) ya fitar da wani sashe na rubutaccen jawabi — babu wata
alama ta daban don adanawa. Idan buƙata ta fitar da kowane sashe na rubutaccen jawabi (wanda mai kira ya ayyana
a matsayin `transcript` ko haɗaɗɗen `audioTranscript`), matakin kariya yana yi masa alamar
`videoBridgeObserved` sannan ya samar da kwafin inuwa na bayanin bidiyon da aka ɓoye —
fitarwa iri ɗaya wadda aka maye gurbin jikin rubutu marar tsari na kowane sashe da
`[redacted-video-transcript]`, ta hanyar musanya tsarin filin sashen kafin
a haɗa kirtanin (ba ta hanyar tantance rubutun da aka shimfiɗa ba, saboda haka babu wani abun cikin sashe —
na cutarwa ko na yau da kullum, har da jikin da ke ɗauke da `]` kamar
`[inaudible]`/`[music]` — da zai iya tsira). Jikin buƙatar kundin kira da aka adana yana musanya
kowane ɓangaren rubutu da aka samo daga bidiyo da wannan kwafin inuwa da aka ɓoye, ta hanyar daidaiton
abun ciki; ana sake karanta maƙallin `fullText` daga cikakken payload na matakin kariya
kafin kira, don haka daidaitawar har yanzu tana yin nasara bayan matakan kariya na sarkar da suka zo daga baya (masu ɓoye PII da
bayanan shiga, masu fifiko 10/95) sun sake rubuta bayanin a wurinsa da kuma
bayan shigar da system-prompt/handoff/memory ya sake tsara jerin saƙonnin. Jikin
da aka aika zuwa samfurin bai canza ba. Buƙatar da aka lura da ita kuma ba ta cika
Memory mai ɗorewa da komai (ana tsallake fitar da bayanai daga buƙata da kuma amsa),
don haka amsar samfurin ba za ta iya maimaita rubutaccen jawabin cikin Memory ba.

**Filayen bidiyo na asali (#12430).** Lokacin da aka kunna gadar kuma ba a san ko akwai tallafin bidiyo na asali ba ko kuma babu shi, filayen `transcript`/`audioTranscript` da aka ayyana su ma suna kunna `videoBridgeObserved`, ko da bayan gazawar samar da bayani ko iyakar `maxVideos`. `null` da kirtani marasa komai suna ƙidayuwa; filayen da ba su nan da metadata da ba na bidiyo ba ba sa ƙidayuwa. Kwafin da aka adana suna ɓoye waɗannan filayen ko kuma su tsallake buƙatar, sannan ana ƙetare caches/Memory.

A waɗannan hanyoyin madadin, ingantattun sassan da mai kira ya bayar suna zama sassan
`text`/`input_text` da ake tallafawa maimakon filayen mai bayarwa marasa daidaitaccen tsari. Duk hanyoyin biyu
da buƙatar ta bayar suna ci gaba da kasancewa abubuwan lura na `client` marasa amincewa da su, tare da gargaɗi bayyananne cewa ba a
bayyana bidiyon ba kuma ba a tabbatar da alamomin lokaci da kafofin watsa labaran ba. Iyakokin da ake da su na
sashe 256/64-KiB gaba ɗaya da na kowane sashe suna aiki a kan hanyoyin biyu tare;
dole ne alamomin lokaci su dace da iyakar da dillalin ya sa ta daƙiƙa 600 da duk wata taga
mayar da hankali da aka bayar. Ana watsar da hanyoyin da ba su da inganci, ba a tura su a matsayin rubutu na son rai ba; ɗayan
mai inganci na iya ci gaba da amfani sai dai idan an wuce haɗaɗɗiyar iyakarsu. Filayen null/marasa komai
ba sa ƙara rubutu. Wannan madadin ba ya ƙara ɗauko kafofin watsa labarai ko yin transcription.
Ana cire ƙarin filayen rubutaccen jawabi daga mai ɗaukar bidiyon madadin da kuma abubuwan
`video_url`/`source` nasa. Tsauraran jerin izinin sadarwa na OpenAI ba su canza ba; masu ɗaukar
bidiyo waɗanda ba a san tallafinsu na asali ba suna ci gaba da kasancewa akwai, kuma wuraren da aka sani na rubutu kawai suna riƙe alamomin tsaro.
Tsararrun kwafin inuwa na ɓoyewa suna kare rubutaccen jawabin da aka ƙara, yayin da
ainihin buƙatar mallakar mai kira ba ta canza ba. Wuraren da ke da tallafin asali da kuma
gadar da aka kashe suna ci gaba da halayen ƙetarewa da suke da su.

Ƙarin kwafin da aka adana suna amfani da siginar buƙatar da aka lura da ita iri ɗaya. Ɗanyen
hoton-lokaci na buƙatar client kafin matakin kariya, buƙatar da ke jira a cikin ƙwaƙwalwa, da kundin
buƙatar da aka ƙi da wuri suna maye gurbin filayen rubutaccen jawabi a cikin sassan bidiyo bisa tsari;
prompts na kirtani da matakan tsarin sarrafawa da miƙa mahallin suka samar ana ɓoye su
a wurin karɓar jikin buƙata don adanawa. Alamar `video_content_removed` da aka adana
tana sa ci gaban `previous_response_id` ya gaza cikin tsaro maimakon sake gina
rubutun da aka watsar da gangan. Idan buƙatar da aka lura da ita ta rasa
kwafin inuwar ɓoyewa na kowane ɓangare kafin rubuta kundi, ko ma ɗaya daga cikin kwafin inuwa na bidiyo da yawa
ya kasa daidaituwa bayan sauye-sauyen buƙata da suka zo daga baya, ana tsallake jikin buƙatar da aka adana
gaba ɗaya maimakon adana rubutaccen jawabi da aka ɓoye wani ɓangarensa kawai.

Ga buƙatar da aka lura da ita, amsar samfurin na iya nakalto kowane ɓangare na
rubutaccen jawabin ba tare da iyakar sashe mai tsari ba. Saboda haka ana maye gurbin
`responseBody` na kundin kira da aka adana da alamar tsallakewa; ba a adana cikakken
abin da tsarin sarrafawa ya samar (wanda zai iya haɗawa da jikin upstream/client da gutsuttsuran kwarara) ba.
Caches na semantic, idempotency, da reasoning-replay suna ƙetare
karatu da rubutu don wannan buƙatar. Buƙatar mai bayarwa da amsar
da client ke gani ba su canza ba. Ana zubar da baitocin keepalive na farko daga buffer na wucin gadi
lokacin da aka tsallake cikakken abin da aka samar. Gargadin Kiro na EventStream mara inganci
yana bayar da rahoton adadin baitocin payload kawai, ba abun cikinsa ko ɗanyen kuskuren
mai tantance JSON ba.
Wannan ba ya nufin an binciki kowane bayanin tantance matsala na mai bayarwa/plugin
da ba shi da alaƙa; ana bin diddigin cikakken binciken wuraren adanawa a #11658.

Zagayowar aikin `/api/modality-bridge/video/drilldown` na ciki wata keɓantacciyar
muhallin cache ce da loopback/token ke tabbatar da ita. Kowace aiki kuma yana buƙatar
daidaitaccen ID marar bayyanawa na mai izini. Kafin a kunna mai kira na production, dole ne ya
samar da wannan ID daga tenant da aka tabbatar kuma kada ya taɓa tura
ƙimar da client ya zaɓa. Maɓallan cache suna haɗa wannan mai izini da daidaitattun ID na zaman da
manunin bidiyo, suna adana maɓallan da aka samo daga SHA-256 kawai, sannan su taƙaita karatu
da gogewa ga mai izini ɗaya. Cache ɗin yana adana aƙalla firamomin JPEG 16 da aka samar
ga kowace shigarwa, yana sa su ƙare bayan minti goma, kuma yana tallafawa karatun
`start`/`end` masu iyaka ko gogewar zaman a bayyane.

An iyakance kowane mai izini ga shigarwa 16 da MiB 64 na daidaitattun bayanan JPEG. Waɗannan
iyakokin sun bambanta da iyakar duniya ta shigarwa 64/MiB 256: matsin ƙa'idar kason mai izini
yana cire shigarwar wannan mai izini kawai waɗanda aka daɗe ba a yi amfani da su ba kafin a yi la'akari da
cirewa ta global LRU. Ana share shigarwar da wa'adinsu ya ƙare daga lissafin mai izini da
na duniya lokacin aikin cache, yayin da sokewa da gazawar tantancewa ba sa
tabbatar da musanya marar cika.

Cache na ƙin Base64 da ba canonical ba, padding fiye da kima, media da ba JPEG ba, JPEGs da suka lalace ko aka yanke su gajere, da JPEGs da suke samar da gargaɗi a lokacin cikakken decode na hoto mai iyaka na `sharp`. Yana sake ɗaukar kowane hoto da aka karɓa a matsayin canonical JPEG, yana fitar da faɗi da tsawo daga bytes da aka decode maimakon amincewa da filayen mai kira, kuma yana jefar da duk wani trailing polyglot bytes maimakon riƙe su. Sai dai compressed buffer na canonical mai iyaka ne ake cajin zuwa wa quotas biyu. Iyakar JSON ta wire ta haɗa da overhead na Base64 don kofar shigarwa da aka decode ta 32 MiB. Kowane derivation da aka adana yana rubuta tsarin/ƙudurin JPEG da aka tabbatar, manufar sampling, sigar derivation, lokacin ƙirƙira, content hash da uwar garken ta lissafa, da nuni zuwa uwa da aka hash tare da parent-content hash na mai kira da aka amince da shi. Ana duba cancellation tsakanin matakai na decode/hash na asynchronous kafin atomic cache commit.

Wannan tranche bai haɗa production producer zuwa hanyar ba tukuna kuma baya bayar da zaɓin variant na multi-resolution. Don haka, hanyar buƙata ta Video Bridge mai bayyane ba ta ɗaukar ƙarin aiki, yayin da derivation na principal da ke ɗaure ga tenant da cikakken FU-08 multi-resolution lifecycle suka rage a matsayin aikin biye-biye na bayyane maimakon a rubuta su a matsayin halin da aka kammala.

Ana saka caption ga frames a jere da samfurin Video da aka daidaita. Video override na fanko yana gāji saitun Vision; idan duka biyun fanko ne, Vision auto-router yana zaɓar samfurin vision-capable mai aiki. Captions masu nasara suna maye gurbin asalin ɓangaren da prefix tsayayye `[Video description:` wanda kuma yana nuna rubutun a matsayin abin lura da aka samo daga media marar aminci kuma yana gaya wa samfuran da ke ƙasa kada su bi umarnin da aka samo a cikin media. Mabuɗan cache na frame-caption sun haɗa da bytes na JPEG, prompt, timestamp, da samfurin mai aiki; ana adana captions masu nasara kawai a cache. Shigarwar cache suna riƙe ainihin samfurin producer mai nasara, gami da samfurin fallback; bridge yana ba da rahoto `mixed` idan samfura daban-daban ne suka samar da frames daban-daban. Cache hit yana sake amfani da wannan ainihin producer maimakon sake masa lakabi a matsayin tsarin routing da aka nema. Ana sanya maɓalli kan cache na sakamakon cikakken bidiyo akan kowace shigarwa da ke canza fitarwa — prompt, samfurin mai aiki, manufar sampling, ƙididdigar frame, yanayin nazarin ma'ana, SHA-256 fingerprint na focus hint da aka daidaita, focus window, `transcript`, `audioTranscript`, da tutar contact-sheet — don haka canza kowane ɗayan waɗancan fannoni shine cache miss, ba taɓa sake amfani da wani tsohon abu. Metadata na result-cache v4 yana riƙe yanayin da fingerprint, ba taɓa raw aikin mai amfani. Metadata na guardrail yana ba da rahoto game da yanayin bincike da aka nema da na gaskiya; ana ba da rahoton yanayin `focused` da aka nema ba tare da rubutun mai amfani da za a iya amfani da shi ba a matsayin `full` na gaskiya.

Guardrail yana ciro kowace ɓangaren bidiyo da ake goyan baya amma baya bayyana fiye da `modalityBridgeVideoMaxVideos`. Ga burin da aka tabbatar yana da `supportsVideo === false`, bidiyo da suka gaza da waɗanda suka wuce iyaka suna zama alamomin rubutu masu aminci don babu raw bidiyo da ya tsira. Idan ba a san iyawar ba, waɗancan ɓangarori suna riƙe mai ɗaukar bidiyonsu; duk wani fallback transcript yana bin canjin rubutu mai iyaka da ke sama. Burin da ke da `supportsVideo === true` suna ketare bridge. Siginar abort na buƙatar abokin ciniki yana yaduwa ta saukewa, jerin broker, subprocesses, da kiran caption; aborts suna tsayawa tsakanin bidiyo kuma ba ta kasuwawa a buɗe zuwa raw media.

Ana ɗaukar saitunan runtime a DB kuma ana tantance su da Zod:

| Maɓalli                             | Na tsoho    | Kewayon / halin                                                                                                        |
| ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Zaɓin runtime, shiga ta zaɓi (opt-in)                                                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` yana kiyaye captions na gaba ɗaya; `focused` yana amfani da mahallin ƙarshen mai amfani mai iyaka, marar aminci |
| `modalityBridgeVideoModel`          | `""`        | Gāji samfurin Vision Bridge                                                                                            |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ko `segment_aware` mai rarraba gwargwado; gazawar mai gano yana komawa `uniform`             |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                         |

Tsofaffin ƙimar timeout na Video da aka adana sama da daƙiƙa 120 ana ƙuntata su zuwa wa broker deadline; ana ƙin sabbin rubuce-rubucen saituna sama da wannan iyakar. `GET /api/modality-bridge/video/runtime` yana buƙatar loopback locality da aka ƙyale da tambari mai aminci kafin tantancewa ko binciken runtime, sannan yana buƙatar management auth. Yana mayar da `available` kawai, sigogin FFmpeg/ffprobe da aka tsarkake, da dalili na dindindin idan runtime ba ya nan. Ƙarshen cirewa na ciki ba API na upload na jama'a ba ne: cika jerin yana mayar da `503` tare da `Retry-After`, katsewar mai kira yana mayar da `499`, kuma wa'adin broker na dindindin yana mayar da `504`. Amsoshin da aka canza suna ƙara `video->text;model=<visionModel>;parts=<videos>` zuwa babban header `x-omniroute-modality-bridge` ba tare da cire sashin Vision ko Audio ba.

### PII Masker (`piiMasker.ts`)

Yana gudana a matakai **duka** biyu.

- **`preCall`** yana clone payload, yana tafiya cikin `system`, `messages`, `input`, da `prompt` (ciki har da abubuwan da suke kawai string), kuma yana aiwatar da `processPII()` (daga `@/shared/utils/inputSanitizer`) ga filayen `content`/`text` na string. Idan `PII_REDACTION_ENABLED=true`, ana redacting PII da aka gano a cikin payload da za a fitar. Wannan yana zaman kansa ne daga `INPUT_SANITIZER_MODE` (wanda kawai yana sarrafa manufar prompt-injection). Idan redaction yana kashe, kiran yana yin rikodin adadin abin da aka gano ba tare da sake rubuta abun ciki ba.
- **`postCall`** yana deep-clone amsar, yana gudanar da `sanitizePIIResponse()` tare da masker na siffar Responses-API (`maskResponsesOutput` — yana rufe `output_text` da `output[].content[].text`). Idan akwai wani redaction da ya faru, amsar da aka gyara tana maye gurbin ta asali.

Guardrail ba ya taɓa toshewa; kawai yana yin annotation (`meta.detections`, `meta.redacted`) ko sake rubutawa.

#### Zabin kowane nau'i, alamu na musamman da ƙididdigar gano abubuwa

**Dashboard → Settings → Security → PII masking** shine yake zaɓar _abin da_ za a mask. Ba ya kunna masking: wannan har yanzu `PII_REDACTION_ENABLED` ne (request) da `PII_RESPONSE_SANITIZATION` (response + SSE), dukansu a kashe suke ta tsoho.

- **Zabin kowane nau'i** — an lissafa idanun da aka gina ciki a cikin `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Rashin saita yana nufin kowane nau'i (halin da ake ciki kafin wannan saitin ya wanzu). Alamar `ssn_us` na injin request tana daidaitawa zuwa `ssn`. Templates (Minimal, Standard, Financial, Brazilian, USA, Full) kawai suna cika checkbox-ovi a cikin UI.
- **Alamu na musamman** — har zuwa alamu 20 na regex ko wildcard (`*` = har zuwa haruffa 64 marasa sarari, `?` = guda ɗaya). Abubuwan da suka dace suna zama `[CUSTOM_REDACTED]`. Kowane alama yana wucewa ta `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): aƙalla haruffa 500, flags an ƙayyade su zuwa `g i m s u`, dole ne ya compile, dole ne ya wuce `safe-regex` (catastrophic backtracking), kuma bai kamata ya dace da string fanko ko redaction placeholder ba. Alamar da ta gaza ana ƙin ta lokacin adanawa da lokacin gwaji, kuma ana tsallake jerin da aka adana wanda ya gaza a lokacin gudanarwa maimakon a compile shi. Alamu na musamman suna gudana ne kawai yayin da masking yana kunne.
- **Ƙididdigar gano abubuwa** — ƙidayar kowane nau'i (ba maƙasudin da suka dace ba), ana riƙe da su a cikin memory kuma ana sake saita su a lokacin sake kunna (`src/lib/pii/piiDetectionStats.ts`). Suna ƙaruwa ne kawai yayin da masking yana kunne.

Saitunan suna rayuwa a cikin teburin `key_value` (namespace `pii_settings`, `src/lib/db/piiSettings.ts`) kuma ana karanta su ta cache na dakika 1 s. API:

| Hanya  | Hanya (Path)             | Dalili                                                                   |
| ------ | ------------------------ | ------------------------------------------------------------------------ |
| `GET`  | `/api/settings/pii`      | Matsayin flag, `enabledTypes`, `customPatterns`, ƙididdigar gano abubuwa |
| `PUT`  | `/api/settings/pii`      | Maye gurbin `enabledTypes` (`null` = duk) da/ko `customPatterns`         |
| `POST` | `/api/settings/pii/test` | Dry-run alama ɗaya akan samfurin aƙalla 8 KB; ba a adana komai           |

Dukkan su uku suna buƙatar izinin gudanarwa kuma suna inganta jikin da Zod (`src/shared/validation/schemas/piiSettings.ts`).

### Prompt Injection (`promptInjection.ts`)

Yana gano tsare-tsare na adawar hankali a cikin abun cikin da mai amfani ya bayar kuma yana aiwatar da manufar da aka saita. Halin da yake ciki ana sarrafa shi ta hanyar canjin muhalli da zaɓuɓɓukan constructor:

| Saiti          | Canjin muhalli                                                                                       | Tsoho  | Tasiri                                                                                                                                                                                            |
| -------------- | ---------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kunna          | `INPUT_SANITIZER_ENABLED`                                                                            | `true` | Idan `false`, guardrail yana short-circuit.                                                                                                                                                       |
| Yanayi         | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn` | Manufar injection: `block`, `warn`, ko `log`. (`redact` ana karɓarsa don back-compat amma **bai** cire rubutun injection ba; ana sarrafa sake rubutun PII na request ta `PII_REDACTION_ENABLED`.) |
| Tsarin toshewa | zaɓin `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Mafi ƙarancin muhimmanci da ake buƙata don toshewa. Medium shine kalla-kawai a tsoho.                                                                                                             |

**Fifikon yanayi** (`getMode`): `options.mode` na mai kira → **DB feature-flag override** na `INJECTION_GUARD_MODE` (Dashboard → Settings → Feature Flags) → env `INJECTION_GUARD_MODE` → env `INPUT_SANITIZER_MODE` → `warn`. Don haka override na dashboard yana cin nasara akan canjin env, don haka UI na Feature Flags yana sarrafa guard da yake gudana kai tsaye (babu sake kunna). Karanta DB fail-safe ne: idan ya sami kuskure, guard yana komawa zuwa halin da aka dogara akan env, kuma idan babu override da aka saita halin yana daidai da warwarewa ta env kawai.

Hanyoyin gano abubuwa:

1. `sanitizeRequest()` daga `@/shared/utils/inputSanitizer` (tsarin gano abubuwa da aka raba da ake amfani da shi a wasu wurare a cikin pipeline).
2. `DEFAULT_GUARD_PATTERNS` da aka gina ciki (a halin yanzu `system_override_inline` da `markdown_system_block`, dukansu `high` severity).
3. `customPatterns` na zaɓi da aka wuce ta zaɓuɓɓukan constructor (strings, regex, ko records na `{ name, pattern, severity }`).

Idan `mode === "block"` **kuma** aƙalla gano ɗaya ya cika ƙimar matakin tsanani, `preCall` yana mayar da `{ block: true, message: "Request rejected: suspicious content detected" }`. A yanayin `warn`/`log` guardrail yana yin log amma yana barin kiran ya wuce. Ana kuma fitar da mataimakin gama gari `evaluatePromptInjection()` don masu kira waɗanda ke buƙatar kimanta prompts ba tare da wucewa ta registry ba.

**Iyakar duba (v3.8.20):** mai gano yana duba kawai **KB 16 na farko** na rubutun prompt da aka haɗa — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (bytes 16 384) a cikin `src/shared/utils/inputSanitizer.ts`. Duka `detectInjection()` da `evaluatePromptInjection()` suna `slice(0, MAX_INJECTION_SCAN_BYTES)` kafin gudanar da madaukin pattern. Umarnin injection suna zaune kusa da saman shigarwa, don haka wannan yana iyakance CPU/GC na regex kan payloads masu ɗaruruwan-KB ba tare da raunana gano ba (duba #3932, #4041).

### Mai ɓoye bayanan shaida (`credentialMasker.ts`)

Yana gudana a matakai **biyu duka**, na ƙarshe a jerin tsoho (fifiko `95`). Yana goge sanannun tsarin API-key / secret-token daga payload mai fita (abun cikin saƙo, hujjojin kiran kayan aiki, sakamakon kayan aiki) **da** amsar mai samarwa, don haka credential da aka liƙa a cikin prompt (ko wanda sakamakon kayan aiki ya mayar da martani) ba ya zubowa ga mai samarwa na sama ko komawa ga abokin ciniki.

- **Ta zaɓi kawai**, irin al'adar PII redaction (kusa da Hard Rule #20): an kashe shi sai dai idan `settings.credentialRedactionEnabled === true` **ko** `CREDENTIAL_REDACTION_ENABLED=true`. Idan an kashe shi, guardrail ba ya yin komai — ba ya taɓa toshewa kuma ba ya taɓa sake rubutawa.
- `redactCredentials()` yana ratsa cikakken bishiyar payload/amsa (`walkValue()`, amintacce daga prototype-pollution, amintacce daga zagayowar madauki ta `WeakSet`) kuma yana maye gurbin abubuwan da suka dace da alamar `[REDACTED:<type>]`, yana yin clone kawai ga rassan da suka canza da gaske.
- `CREDENTIAL_PATTERNS` yana rufe maɓallan masu samar da LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokens (GitHub, Slack, Linear, Notion, npm, Postman, Discord), maɓallan biya (Stripe, Square), maɓallan girgije (AWS access key, Twilio, SendGrid, Mailgun), maɓallan sirri / JWTs, jerin haɗi masu ɗauke da credential (`mongodb://user:pass@...`, da sauransu), da tsarin darajar header na gama gari `Authorization`/`x-api-key`/`api-key`/`apikey`. Ana goge maɓallan da suka yi siffar header (`authorization`, `x-api-key`, `api-key`, `apikey`) ta hanyar tsari (daraja kawai, ana kiyaye prefix na scheme kamar `Bearer `/`Basic `) maimakon ta regex na rubutu na gama gari.
- Guardrail ba ya taɓa toshewa; yana kawai sake rubutawa (`modifiedPayload` / `modifiedResponse`) kuma yana ƙara bayani (`meta.credentialsRedacted`, `meta.count`).

Mai kare regression: `tests/unit/credential-masker-guardrail.test.ts`.

## Yarjejeniyar Tushe (`base.ts`)

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
  block?: boolean; // true yana takaita sarkar nan take
  message?: string; // ana bayyana shi lokacin toshewa
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // preCall yana mayar da shi don sake rubuta bukatar
  modifiedResponse?: TValue; // postCall yana mayar da shi don sake rubuta amsar
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

Guardrail yana nuna alamar "babu canji" ta hanyar mayar da ko `void`, `{}`, ko
`{ block: false }`. Mayar da `modifiedPayload`/`modifiedResponse` yana maye
gurbin ƙimar da ke gudana ta cikin sarƙar ga guardrails na gaba.
`signal?: AbortSignal` yana ɗaukar rayuwar mai kira (caller lifecycle) zuwa
cikin guardrails. Katse buƙa shine keɓancen fail-open na gangan: gadojin
midiya suna dakatar da aiki da tsabtace wurin ba tare da maida midiya ƙacalan
zuwa manufa da aka san baya goyon bayanta ba.

## Rajista (`registry.ts`)

Singleton `guardrailRegistry` yana bayyana:

- `register(guardrail)` — yana ƙara (ko maye gurbin ta daidaitaccen suna)
  guardrail kuma yana sake tsarawa ta `priority` mai hauhawa.
- `clear()` / `list()` — mataimakan gudanarwa.
- `runPreCallHooks(payload, context)` — yana zagaya guardrails masu aiki, yana
  bi da payload ta cikin `modifiedPayload`, kuma yana tsayawa a farkon
  `block: true`.
- `runPostCallHooks(response, context)` — wannan kwarara a gefen amsa.
- `resetGuardrailsForTests({ registerDefaults })` — yana share yanayi kuma ta
  zaɓi yana sake rajista tsoffin saitunan don ware gwaji da tsabta.

Masu gudu biyu suna mayar da `{ blocked, payload|response, results, guardrail?, message? }`
inda `results` shine array na bayanan `GuardrailExecutionResult` waɗanda suka
haɗa da filayen `blocked`, `skipped`, `modified`, `error`, da `meta` na kowane
guardrail, masu amfani don bin diddigi (tracing).

### Kashe Guardrails ga Kowace Buƙa

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` yana tattara jerin
sunayen guardrail da aka cire kwafinsu waɗanda ya kamata a tsallake wa buƙar
ta yanzu. Akwai hanyoyi biyar, ana karanta su bisa wannan tsari kuma ana haɗa
su cikin jeri ɗaya (farkon bayyanar shine ke ci nasara lokacin cire kwafi):

1. `apiKeyInfo.disabledGuardrails`
2. `disabledGuardrails` na jikin buƙa (matakin sama)
3. `metadata.disabledGuardrails` na jikin buƙa (sai kawai lokacin da `metadata` abu ne)
4. Kanun `x-omniroute-disabled-guardrails`
5. Kanun gado `x-disabled-guardrails`

Ana haɗa dukkan hanyoyin biyar, da kanoni biyu ciki: aika duka
`x-omniroute-disabled-guardrails` da `x-disabled-guardrails` yana tsallake haɗin
jerayensu, kuma kanun na zamani da yake babu komai ba ya ƙara ɓoye na gado
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), an gyara a
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Ƙimomin na iya zama jerayen kalmomi ko kalmomi da aka raba da waƙafi; ana kare
sunaye kuma ana daidaita su zuwa kebab-case na ƙananan haruffa (`pii_masker` →
`pii-masker`), kuma ana jefar da shigar da take babu komai. Ana mika sakamakon
ta `context.disabledGuardrails` zuwa rajista, wanda ke tsallake guardrails masu
dacewa (`skipped: true` a cikin `results`).

Jerin kashewa yana shafar **rajista** kawai. Yanayin `block` na prompt-injection
wata iyaka ce ta wajibi: middleware na injection-guard
(`src/middleware/promptInjectionGuard.ts`) yana kiran `evaluatePromptInjection()`
ba tare da wani jerin kashewa da mai kira ke sarrafawa ba (an cire kiran
`resolveDisabledGuardrails({ body })` marar amfani da ya kasance yana yi a
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), don haka buƙar
da ta kashe `prompt-injection` har yanzu ana ƙin ta a yanayin `block`. Wannan
gangan ne. Hanyoyin kashewa mai kira ne ke sarrafinsu (jikin buƙa, metadata,
kanoni), kuma bai kamata mai kira ya iya kashe wani sarrafa tsaro da mai aiki
ya kafa ba
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Haɗin
kanoni daga [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
yana canza ne kawai waɗanne guardrails na rajista ake tsallakewa; ba ya barin
abokin ciniki ya wuce middleware. Ana bibiyar manufofin guardrail na wajibi na
kowane maɓalli da na kowane rukuni a cikin RFC na v4
[#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Duba [Rufewa da iyakoki](#coverage-and-limits).

## Tsarin Aiwatarwa

Ga kowace buƙata da ke gudana ta `src/sse/handlers/chat.ts` da
`open-sse/handlers/chatCore.ts` (hanyoyin chat-family da aka jera a ƙarƙashin
[Rufi da iyakoki](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` yana gina jerin tsallakawa daga API key, body,
   da headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` yana gudanar da guardrails bisa
   tsarin hawan fifiko:
   - Ana rubuta guardrails da aka kashe a matsayin `skipped`.
   - `preCall` na kowane guardrail na iya sake rubuta payload ta `modifiedPayload`.
   - `block: true` na farko yana yanke sarkar nan take kuma handler yana mayar da
     amsar ƙin yarda ta guardrail.
3. Payload (da watakila aka sake rubutawa) yana gudana zuwa combo routing da
   upstream dispatch.
4. **Maras streaming kawai:** bayan an hada amsar,
   `guardrailRegistry.runPostCallHooks(...)` yana gudanar da wannan sarkar a kan
   amsar. `block: true` a nan yana jefa amsar ta upstream kuma yana mayar da HTTP 400. Amsoshin da aka stream suna tsallake wannan mataki gaba ɗaya.

Ana rubuta guardrails da suka jifa kuskure da `error: <message>` kuma ana yin log
ta `logger.warn`, amma sarkar tana ci gaba — fail-open bisa zane.

## Rufi da iyakoki

An haɗa rajistar guardrail cikin chat pipeline kawai. Waɗannan iyakoki an kafa su
ta `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` da
`tests/unit/guardrail-pipeline-characterization.test.ts`; sabunta waɗannan
gwaje-gwaje da gangan idan halayyar ta canza.

### Inda hooks ke gudana

| Hook / sarrafawa                    | Inda yake gudana                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Buƙatun da `handleChat` ke kula da su (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (da `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, da Telegram chat proxy. Haka kuma dashboard test endpoint `/api/guardrails/test`. Pre-call block yana mayar da HTTP 400. |
| `runPostCallHooks`                  | Amsoshin chat **marasa streaming** kawai (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Amsoshin da aka stream ba su kaiwa gare shi.                                                                                                                                                                                                                                                                                     |
| Streaming PII                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), an haɗa shi a `streamingPipeline.ts` idan `PII_RESPONSE_SANITIZATION` yana kunne. Ba guardrail ba ne, don haka hanyoyin kashewa ba sa shafar shi.                                                                                                                                                                                                                   |
| Injection-guard middleware (legacy) | Kowace hanyar `/v1` da ke ɗauke da prompt, gami da chat-family (duba [rufin hanyar](#injection-guard-route-coverage--red-team-phase-8--block-d)). Prompt injection kawai.                                                                                                                                                                                                                                                         |

### Abin da ba a rufe ba

- **Hanyoyin media, embeddings da data** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) ba su kaiwa rajistar. Babu
  PII masking, credential masking ko modality bridge da ke gudana a can. Gwajinsu
  na ɗaya tilo shine injection-guard middleware na legacy.
- **Amsoshin da aka stream** ba sa samun post-call guardrails: babu `pii-masker` ko
  `credential-masker` post-call, kuma babu post-call block. Sai streaming PII
  transform kawai yake aiki (idan `PII_RESPONSE_SANITIZATION` yana kunne). Ba a
  goge credential da aka maimaita a cikin amsar da aka stream ba.
- **Hanyoyin kashewa vs. middleware (bisa zane):** middleware yana kimanta
  prompt injection da nasa kiran `evaluatePromptInjection()`, ba tare da
  miƙa kowane jerin kashewa da mai kira ke sarrafawa ba. Yanayin `block` iyaka ce
  ta wajibi da kashewar da mai kira ke sarrafawa ba za ta iya kewayawa ba, gami da
  kan hanyoyin chat-family
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Kashe
  `prompt-injection` yana tsallake guardrail na rajista kawai.

### Abin da yake ganin amsa kafin post-call

A kan hanyar maras streaming tsarin shine: cire memory → aiwatar da kayan aikin
built-in → guardrails na post-call → fitar block na post-call → adanar semantic-cache.

- **Ciran ƙwaƙwalwa** da **gudanar da kayan aiki** suna ganin amsar kafin guardrails na post-call su iya sake rubuta ta ko toshe ta. Tun daga [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), ciran ƙwaƙwalwa yana tura rubutun da aka ciro ta cikin `sanitizePII` sa'ad da `PII_RESPONSE_SANITIZATION` yana kunne (duk a yanayin streaming da wanda ba na streaming ba), amma amsar da post-call zai toshe daga baya har yanzu an riga an miƙa ta ga ƙwaƙwalwa da kayan aiki.
- **Semantic cache** yana adana amsar bayan post-call, don haka yana adana amsar da aka sake rubuta, kuma ba a taba adana amsar da aka toshe ba. Shigarwar cache ana ɗaure ta ga kowane API key.

## Kanfigareshan

Canjunkan muhalli da guardrails ɗin da aka gina a ciki ke karantawa:

| Canjin                                | Wanda yake amfani da shi | Tasiri                                                                                                      |
| ------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Saita `false` domin a kashe ganowa gaba ɗaya.                                                               |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Manufar injection: `warn`, `block`, ko `log`. Tsohon ƙimar `redact` ba ta sake rubuta rubutun injection ba. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Yanayin injection guard; kuma alamar fasali ta DB wadda take **rinjaya** canjunkan env (DB > ENV).          |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | Mafi ƙarancin muni da `MODE=block` ke ƙin: `high` (na tsoho), `medium`, ko `low`.                           |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | Tsohon sunan gajiye na `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                   |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | Idan `true`, ana boye PII na buƙata (ba ya dogaro da yanayin injection).                                    |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (sau ƙasa)  | Yana sarrafa halayyar masker na ɓangaren amsa.                                                              |

Guardrails ɗin Modality Bridge suna karanta kanfigareshan lokacin gudanarwa
daga shagon saitunan da DB ke tallafawa (`getSettings()`), ba daga canjunkan
env ba. Maɓallan Vision na farko sune
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, da
`modalityBridgeCacheMaxEntries`. Tsoffin maɓallan
`visionBridge*` ana karɓarsu ne kawai a matsayin madadin karatu na zagaye ɗaya
da aka rubuta; rubutun dashboard suna amfani da maɓallan na farko. Ƙimomin
tsoho da mai warware madadin suna cikin
`src/shared/constants/modalityBridgeDefaults.ts`, tare da riƙe tsoffin
kundage a `src/shared/constants/visionBridgeDefaults.ts`.

Audio yana amfani da `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, da `modalityBridgeAudioMaxClips`, tare da saitunan
`modalityBridgeCache*` da aka raba. Audio ba ya da madadin tsohon maɓalli saboda
an gabatar da waɗannan maɓallai tare da tsarin (schema) Modality Bridge.

Video yana amfani da `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, da
`modalityBridgeVideoTimeout`, tare da saitunan `modalityBridgeCache*` da aka
raba. An kashe shi a tsoho saboda FFmpeg/ffprobe abubuwan dogaro ne na aiki
waɗanda ba dole ba ne, kuma yin bayani kan hotunan (frame captioning) yana ƙara
jinkiri da farashin samfuri (model).

## Masu Tsaro na Al'ada

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

Matakai:

1. Ƙirƙiri `src/lib/guardrails/myGuardrail.ts` wanda yake ƙarawa `BaseGuardrail`.
2. Aiwatar da `preCall` da/ko `postCall`.
3. Ko kuwa yi rajista a lokacin shigo da fayil (tura daga `registerDefaultGuardrails`) ko kuma
   kira `guardrailRegistry.register(...)` a lokacin gudana — rajistar tana maye
   gurbin kowane mai tsaro na baya mai wannan sunan da aka daidaita.
4. Ƙara gwaje-gwaje a ƙarƙashin `tests/unit/` (misalai masu kasancewa:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Gwajawa

Yi amfani da `resetGuardrailsForTests()` tsakanin gwaje-gwaje don farawa daga yanayin da aka sani.
Mika `{ registerDefaults: false }` don farawa da rajista fanko kuma
yi rajistar kawai masu tsaron da ake gwadawa. Vision Bridge yana karɓar
shigar da abin dogaro (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge yana bayyana
hanyoyin gwaji daidai don saituna, iyawomi, zaɓin samfurin STT, binciken
shaidodi, da rubutawa. Don haka gwaje-gwaje na iya aiwatar da duka hanyoyin gudana biyu ba tare da DB
ko damar hanya ba.

## Duba Ma

- `src/lib/guardrails/` — aiwatarwa
- `src/shared/utils/inputSanitizer.ts` — mai gano da aka raba wanda ke ƙarfafa
  shigar da umarni (prompt-injection) da ɓoyewar PII
- `src/shared/constants/visionBridgeDefaults.ts` — tsafo na Vision Bridge da
  jerin samfuran da aka tilasta musu gada
- `src/shared/constants/modalityBridgeDefaults.ts` — tsafo na gudanarwa na Vision/Audio da aka raba
- `docs/architecture/RESILIENCE_GUIDE.md` — sashe mai zaman kansa (mai yanke da'ira, lokutan jinkiri)
- `docs/reference/ENVIRONMENT.md` — cikakken bayani kan masu canjin muhalli

## Rufewar hanyoyin mai tsaron shigowa & red-team (Phase 8 · Block D)

Mai tsaron shigowa (`createInjectionGuard` / `withInjectionGuard`) yana rufe dukkan hanyoyin
da suke karɓar prompt na mai amfani. Yana bi da `INJECTION_GUARD_MODE` (na asali `warn` = rajista kawai;
`block` = yana mayar da HTTP 400 `SECURITY_001`).

| Nau'i                   | Hanyoyi                                                                                                                                              | Yanayin asali |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Rubutu (wanda ke akwai) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Ƙirƙirawa               | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Bayanai                 | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Cire rubutu (`extractMessageContents`) yana rufe `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (kowane dare, `nightly-llm-security.yml`):** promptfoo yana tabbatar da cewa kowace hanya tana toshe
tarin OWASP-LLM a cikin `INJECTION_GUARD_MODE=block`; garak yana gudanar da bincikoki (yana tsallakawa idan babu sirri).
An haɗa `moderations` don dacewa. Yanayin toshewa iyaka ce ta wajibi: `evaluatePromptInjection()`
ba ya kula da jerin kashewa na kowace buƙata wanda middleware ya mika masa, don haka `disabledGuardrails`
**ba** ya keɓance hanya daga gare shi ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Tsarin aiki na kowane dare (`.github/workflows/nightly-llm-security.yml`, cron + ƙaddamarwa da
hannu) yana da ayyuka biyu:

- **`promptfoo-guard` (mai toshewa)** — yana gudanar da `promptfoo eval -c promptfooconfig.yaml`
  tare da `INJECTION_GUARD_MODE=block`. Kowace shari'a ta adawa (misali "yi watsi da dukkan
  umarnin da suka gabata…", jailbreaks na salon DAN) tana tabbatar da cewa amsar tana ɗauke da
  `error.code === "SECURITY_001"`, wato mai tsaron ya ki buƙatar a zahiri.
- **`garak` (mai ba da shawara)** — yana gudanar da garak `--probes promptinject,dan,leakreplay`
  akan misalin OmniRoute na gida (`http://localhost:20128/v1`). An ɗora shi akan
  sirrin mai bayarwa (`PROMPTFOO_PROVIDER_KEY`); yana tsallakawa cikin sauƙi kuma an ƙara masa
  `|| true`, don haka yana ba da rahoto ba tare da kasa CI ba.

Rufewar mataimakin mai tsaro (`createInjectionGuard` / `withInjectionGuard`)
tana shafi kowace hanyar `/v1` da ke ɗauke da prompt; ana ja rubutun prompt daga
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ta hanyar
`extractMessageContents()` a cikin `src/shared/utils/inputSanitizer.ts`.
