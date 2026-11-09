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

### Bidiyo Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Yana satar sassan bidiyo na sama a cikin Taɗi Kammala `messages` da Amsoshi API `input` kafin a kira manufa ba tare da sanannun tallafin bidiyo na asali ba. Siffofin tallafi sune `input_video`, `video_url`, `video_source`, HTTPS URLs, da `data:video/*;base64,...` bayanai URIs. Sunayen fayil na fili a cikin rubutu ba a ɗaukar su azaman bidiyo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ya mallaki zirga-zirgar buƙatun, cak ɗin capability/policy, tara kowane buƙatu, da nauyin amsawa. Sayen — na kowane-bidiyo, cache gabaɗayan sakamakon, yana kwatanta jerin firam (wanda ke haɗa kowane mai kira da aka bayyana kwafin sauti), kuma kowane ƙoƙarin metrics/abort/cleanup — yana ɓoye a bayan `processVideoPart` a cikin `videoBridgePipeline.ts`, ana kiransa sau ɗaya kowane ɓangaren bidiyo a cikin madauki na `preCall`. Wannan tsarin kuma yana ayyana iyakoki na tashar tashar jiragen ruwa `VideoMediaBrokerPort` (samun bytes da fitar da firam ɗin samfuri), `VideoAudioTranscriptionPort` (haɓaka kwafin sautin da aka ayyana mai kira tare da samfuran samfuri), da `VideoDrilldownPort` (siffar kayan ajiya ta gado). Samar da STT da riƙon firam an haɗa su a kusa da tashar tashar jiragen ruwa ta hanyar `createVideoSttAdapter` da `createVideoDrilldownAdapter`; na karshen yana amfani da tsarin rayuwa mara kyau.

Hanyar neman `/v1` ta jama'a ba ta taɓa shigo da ita ko kiran wani ƙaramin tsari ba. Ana sauke bidiyoyi masu nisa a ƙarƙashin daure 50 MiB ; Bidiyoyin layi na layi64 suna da 36 MiB mai ra'ayin mazan jiya da aka ƙididdige kowane hular bidiyo don haka ambulan model/messages/framing zai iya kasancewa a cikin jama'a JSON neman izinin shiga na 50 MiB. Ana duba tsayin layi da ƙididdige ƙididdiga masu girma kafin rarrabawa. Ana buƙatar HTTPS akan farkon URL mai nisa da kowane turawa, ta amfani da gadi na jama'a kawai mai fita tare da maƙallan DNS. Daga nan sai ta bytes ketare ainihin iyakar dillali `POST /api/modality-bridge/video/extract` na ciki. Wannan hanya ita ce `LOCAL_ONLY` da `SPAWN_CAPABLE`, tana karɓar ingantaccen tsari na kowane tsari, amintaccen buƙatun loopback, kuma baya karɓar URL, hanyar tsarin fayil, aiwatarwa, ko jerin gardama. Bututun girman jikin API da mai ƙara karatun jiki na mai kula da kansa yana aiwatar da hular shigarwar dillali 50 MiB. Layin sa mai iyaka yana gudanar da hakar guda ɗaya a lokaci ɗaya, yana ba da damar ayyuka huɗu masu jiran aiki, da madaidaitan shigarwar da ke jiran shigarwa a 100 MiB.

A cikin dillali, `ffprobe` tana karanta fayil ɗin gida mai zaman kansa; Kafaffen tsarin ba da izini ya keɓanta lissafin waƙa da sifofin bayyanuwa. Don kwantenan iyali MOV da aka ba da izini, bayanan bayanan MOV na waje sun kasance a kashe ta tsohuwa, kuma ƙayyadaddun umarnin baya shiga cikinsu. Dukansu `ffprobe` da `ffmpeg` suna amfani da jerin tsararrun ƙa'idar -only `file`, zare ɗaya, ƙayyadaddun tsararrun gardama, babu harsashi, da abubuwan aiwatarwa waɗanda aka warware daga `PATH`. Haɗe-haɗe-hoton murfin rafukan ba ƴan takara bane. Duk rafukan da za a iya kunnawa dole ne su gamsar da iyakoki, kuma an fi son tsayayyen rafi kafin faɗuwar faɗuwar ƙima mafi ƙanƙanta. Bidiyoyin suna iyakance ga daƙiƙa 600, pixels 8,192 a kowace girma, da 33,554,432 tushen pixels. Samfuran FFmpeg 1-16 firam ɗin tsakiya JPEG, suna saukar da dogon gefen zuwa aƙalla 1,024 pixels ba tare da haɓaka ƙarami ba, kuma baya karɓar URL. Samfurin shine `uniform` ta tsohuwa. `scene_aware` na zaɓi da manufofin `segment_aware` na gwaji suna yin ƙarin ƙayyadaddun ƙayyadaddun FFmpeg guda ɗaya a kan ingantaccen rafi na gida, zaɓi tamburan lokuta `showinfo` mai iyaka, sa'an nan kuma komawa baya da ƙayyadaddun ƙayyadaddun ƙayyadaddun tsaka-tsaki iri ɗaya akan gazawar ganowa, ƙarewar lokaci, fitar da ba daidai ba, ko saita ɗan takara mara komai. Yanayin sane da yanki yana keɓance samfuran tsaka-tsaki daidai gwargwado ga ingantattun tazara na yanayi; An yi dalla-dalla dalla-dalla a kasa shaidar shaida-sane da kuma halayen koma baya. Ana amfani da hular firam 16 mai wuya bayan zaɓi a kowace manufa. Lokacin da buƙatun fane-fane yana da kasafin firam ɗaya kawai, yana amfani da tsaka-tsakin tsaka-tsakin tsaka-tsaki na cikakken bidiyo mai aiki ko taga mai da hankali kuma yana ba da rahoton `policyEffective: uniform`: firam ɗin fage guda ɗaya da aka zaɓa ba zai iya adana ƙarshen duka na ɗan lokaci ba. Mai kira na iya ba da zaɓin taga iyakataccen abin mayar da hankali (`start`/`end` seconds); Ana manne iyakoki zuwa tsawon lokacin watsa labarai, an ƙi windows ko baya da iyaka, kuma duk manufofin samarwa ana yin su ne kawai a cikin tazarar da aka saba. Tagan da aka samu an haɗa shi a cikin samfurin metadata kuma a cikin prefix ɗin bayanin da ba a amince da shi ba don haka ƙirar ƙasa za su iya bambanta abin da aka mayar da hankali daga cikakken lokaci.

Mayar da hankali kan taken Semantic keɓantaccen wuri ne bayyananne. Yanayin bincike `full` tsoho yana adana saurin firam ɗin da ke akwai kuma baya tura buƙatun rubutu zuwa samfurin taken. A cikin yanayin `focused`, gadar tana karanta kawai sabon wanda ba fanko ba wanda mai amfani ya rubuta `text`/`input_text` daga Chat iri ɗaya ko Akwatin Amsoshi, yana daidaita shi zuwa NFC, yana rushe haruffan sarrafawa da farar fata, kuma yana iyakance shi zuwa maki 500 na Unicode. Sakamako mara komai yana komawa zuwa ainihin `full`. Alamar da za a iya amfani da ita ana jera su azaman JSON a cikin ƙayyadaddun toshe mai amfani da ba amintacce ba kuma yana iya ba da fifikon cikakkun bayanai kawai; ba zai iya ƙetare gargaɗin daban ba game da bin umarnin bayyane ko ji a cikin kafofin watsa labarai. Mayar da hankali na rubutu baya taɓa yin amfani da `start`/`end` ko canza samfurin ɗan lokaci.

#### shedar sashin tsarin FU-07

`segment_aware` tana amfani da fasfo ɗin bincike guda ɗaya mai iyaka akan ingantaccen rafin bidiyo na gida. Tsayayyen sarkar tacewa ta farko tana yin ma'auni zuwa mafi girman pixels 320 mai faɗi, tana gano sauye-sauyen yanayi da daskararrun tazara, sannan samfurori a firam 1 a sakan daya don blur, matsakaicin luma, da bayanin spatial/temporal. An iyakance izinin wucewa zuwa samfuran tsarin 600, zaren FFmpeg/filter ɗaya, ƙa'idar `file` -only iri ɗaya da jerin masu ba da izinin kwantena, dauren tsari na 1 MiB, kuma aƙalla daƙiƙa 30 a cikin abort/deadline. dillali da aka raba Ba ta taɓa karɓar umarni, tacewa, hanya, ko URL daga buƙatar.

Ma'auni na tsarin shaida ce ta ƙididdigewa, ba fahimtar bidiyo na natsuwa ba. Ba sa fayyace batutuwa, ayyuka, taken magana, ko manufar mai amfani. Scene da daskare iyakoki suna samar da sassa; daskare ɗaukar hoto, blur, fallasa, daki-daki, da canjin ɗan lokaci kawai suna tasiri yadda ake kasafta kasafin firam na 1-16. Cikakken daskararre yana cikin firam ɗaya, yayin da ɓangarorin da ba a daskararre suna fafatawa da ragowar kasafin kuɗi. Lokacin da iyakoki suka fi firam ɗin yawa, ana kiyaye ɗaukar nauyin tsarin lokaci iri ɗaya don haka saurin yankewa da wuri ba zai iya ɓoye wani yanki mai tsayi ba. An haɗa iyakokin yanayin da ke cikin ƙudurin bincike na daƙiƙa 1 na iyakar daskare.

Matsalolin da suka ɓace, shaidar malformed/empty, kuskuren ganowa, ko ƙayyadadden lokacin tantancewa ya kasa buɗe ga madaidaicin tsarin tsaka-tsaki na uniform. Mai kira ya zubar da ciki ko ranar ƙarshe na dillali ba ya buɗewa: yana ƙare aikin cikin jirgin, yana hana cirewa daga baya, kuma ana cire bishiyar wucin gadi mai zaman kanta a cikin `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` yana haifar da ƙayyadaddun ƙayyadaddun ƙayyadaddun ƙayyadaddun ƙayyadaddun kayan aikin FFmpeg don tanadin taken kira na baya-bayan nan, ƙayyadaddun kasafin kuɗi mai yawa, shaidar blur/exposure/SI-TI, yanke saurin yanke tare da dogon wutsiya, da fade-fade a hankali. Yana rubuta lokacin bangon bincike kafin a yi nazari kuma, inda `/usr/bin/time` ke samuwa, CPU yaro da kololuwar RSS. Gwajin ingancin sa na tsararren baka ne kawai. Ingancin taken-samfurin na ainihi ya kasance `HOLD` saboda wannan kayan doki ba shi da madaidaicin wurin ƙarewa ko daskararre alkali. Har ila yau, ajiyar kuɗi ya kasance `HOLD` sai dai idan `--caption-cost-per-call-usd` ya ba da ƙayyadaddun ƙididdiga na kowane kira; Rubutun bai taba ƙirƙira kowane sakamako ba.

Kowane firam an iyakance shi zuwa 4 MiB, duk ɗanyen firam ɗin tare zuwa 23 MiB, da kuma jerin martanin dillali zuwa 32 MiB. An cire kundin adireshi na wucin gadi mai zaman kansa a `finally`. OmniRoute baya haɗa FFmpeg kuma baya karɓar hanyar aiwatar da al'ada. Kafin yin taken, gadar tana amfani da izinin wucewa na gani mai ra'ayin mazan jiya: kowane JPEG ana rage shi zuwa 16 × 16 buffer mai launin toka kuma ana kwatanta shi da firam na ƙarshe da aka riƙe. Don kasafin taken da ake nema sama da firam ɗaya, hakar yana samar da iyakataccen tafkin ɗan takara har sau biyu wancan kasafin kuma bai wuce firam 16 ba. Ana amfani da hular da aka nema ne kawai bayan ƙaddamarwa, tare da zaɓaɓɓun ƴan takara na farko da na ƙarshe ana kiyaye su yayin raguwar ƙarshe lokacin da kasafin ya kasance aƙalla biyu. Manufofin `grayscale-16x16-mean-cells-v2` da aka siffanta suna amfani da mafi girman ma'ana luma delta da rabon sel thumbnail waɗanda delta suka daidaita aƙalla 0.05. Ƙofar da aka kwafi ita ce 0.04 akai-akai, wanda aka zaɓa don tsinkaya maimakon fallasa azaman saitin lokacin aiki. Wannan siginar babban bambance-bambancen na biyu yana adana ƙaramin motsi da canje-canjen rubutu da ke bayyane waɗanda ma'anar-kawai kwatancen zai iya ɓoyewa. Kurakurai masu kwatance ko dikodi sun kasa buɗe kuma kiyaye ɗaukar hoto. Abubuwan da aka fitar sun raba ƴan takara da aka fitar, an yi nasarar amfani da firam ɗin, da kwafin gani da aka jefa.

Wani ɓangaren bidiyo mai alama a sarari na iya buƙatar takardar tuntuɓar lokaci. Gadar tana gina mafi yawan ginshiƙi 4, grid JPEG firam 16. Kowane tantanin halitta 512-pixel yana ƙone tambarin tushen sa zuwa babban rukunin ƙasa mai ƙima, yayin da tambura iri ɗaya ya kasance a cikin metadata na rubutu don ƙungiyar ƙasa da dubawa. Cikakkun JPEG ya ragu a kan 32 MiB. Idan `sharp` ba zai iya yanke ko tsara grid ba, gadar ta koma kan firam ɗin JPEG guda ɗaya; abokin ciniki zubar da ciki har yanzu propagate ta cikin takardar aiki.

Shaidar haɓakawa ta bambanta da gangan daga ma'auni na roba. `scripts/perf/video-bridge-contact-sheet-eval.ts` yana bayyana ma'anar kayan aikin A/B mai ƙira don ainihin ƙirar hangen nesa mai jituwa na OpenAI. Yana auna alamun da aka bayar da rahoton, ƙarshen-zuwa-ƙarshen bangon bango (gami da abun da ke ciki), ƙididdige ƙididdige ƙira, da bayyana-bayyana gaskiyar riƙewa. Ba a rubuta martanin samfurin samfuri ga rahoton ba; kawai narkar da SHA-256 da madaidaicin gaskiyar IDs ana kiyayewa. Harness ɗin ba ya yin hanyar sadarwa ko kira samfurin biya sai dai an wuce `--execute-real` kuma an saita `--model`, `OMNIROUTE_BASE_URL`, da `OMNIROUTE_API_KEY`. Idan ba tare da wannan zahirin gudu ba, hukuncin da za a iya karantawa na inji ya kasance `HOLD`; ma'aunin payload/call-count na roba kadai ba shaida ba ne na haɓakawa.

Masu kira na iya haɗa tsararrun `transcript.cues` na zaɓi zuwa ɓangaren bidiyo mai goyan bayan lokacin da suka riga sun mallaki rubutun da aka daidaita. Kowane alamar dole ne ya ɗauki `text`, tazarar `start`/`end` mai iyaka a cikin lokacin bincike, da `source` da aka zaɓa (`client`, `embedded`, ko `audio-bridge`); `confidence` ya gaza zuwa `1` kuma dole ne ya kasance tsakanin `0` da `1`. An ruguje daidai kwafi kwafi. OmniRoute baya fara rubutawa daga wannan metadata: ingantattun alamomi ana kwafi su cikin sakamakon da aka siffanta tare da tushe, amincewa, da tazara, kuma ana yin su azaman abubuwan lura marasa amana tare da taken firam. Rubutun mara inganci, mara iyaka, ko ingantaccen rubutu ba a ƙi shi ba maimakon haɗawa cikin rafin taken. Duk tashoshi biyun buƙatun buƙatun jiki suna daidaita abubuwan da aka kawo zuwa `client`, gami da tambarin `embedded` ko `audio-bridge`. Adafta mallakin uwar garken ne kawai zai iya sanya waɗancan amintattun alamun ta hanyar hujjar `trustedSource` mai lamba-kawai; filin JSON ba zai iya kaiwa ga wannan hujja ba. Rubutun kwafi ya kasance marar amintacce daga abin da aka samu daga kafofin watsa labarai, ba tare da la’akari da ingancin sa ba, kuma dole ne ya taɓa ƙayyade izini.

Babban mai kira na iya ba da waƙar `audioTranscript` don bidiyo iri ɗaya; ana bi da shi azaman rubutun da abokin ciniki ya bayar, ba hujjar kwafin sabar ba. Kabuwar fusion tana gudanar da abubuwan gani da sauti a ƙarƙashin wa'adin ƙarshe ɗaya da siginar zubar da ciki, tana ba da umarni akan lokaci gama gari, ta ruguje ainihin kwafi, kuma tana ba da rahoton wani ɗan gajeren sakamako lokacin da gefe ɗaya kawai ya yi nasara. `audioTranscript` mara inganci yana ƙasƙantar da kai zuwa wancan ɓangaren sakamakon — ana adana bayanin gani kuma reshen mai jiwuwa yana rubuta lambar gazawar — mai tsafta maimakon gazawar duka bidiyon. Samuwar kowane reshe, tuta mai ban sha'awa, da lambobin gazawa masu tsafta ana kiyaye su a cikin sakamakon da aka siffanta, a cikin metadata na gadi (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), a cikin metadata-cache na sakamakon, da kuma a cikin ƙididdigar gada. Hanyar gadar Bidiyo ta tsohuwa baya kiran magana-zuwa-rubutu ko zazzage kwafin kafofin watsa labarai na biyu; ba tare da wannan waƙar waƙar ba, ya kasance na bidiyo-kawai.

**Riƙon rubutun (#12150 P1).** Wannan yana aiki ta atomatik a duk lokacin da Gadar Bidiyo (da kanta ta fita) ta ba da alamar rubutu — babu wata tutar riƙewa daban. Lokacin da buƙatu ta ba da kowane alamar rubutu (mai kira- `transcript` mai kira ko fused `audioTranscript`), layin tsaro yana yiwa `videoBridgeObserved` alama kuma ya haifar da jajayen inuwa na kwatancin bidiyo — ma'ana iri ɗaya wanda kowane rukunin rubutu na kyauta ana maye gurbin `[redacted-video-transcript]`, gina ta hanyar maye gurbin filin da aka ƙera ta hanyar ƙera kirtani. rubutu, don haka babu abin da ke cikin — abokin gaba ko na yau da kullun, gami da jikin da ke ɗauke da `]` kamar `[inaudible]`/`[music]` — da zai iya tsira). Jikin buƙatar rajistar kira da aka dage yana musanya kowane ɓangaren rubutu da aka samu na bidiyo don wannan inuwar da aka canza, wanda ya dace da daidaiton abun ciki; Ana sake karanta anga `fullText` daga aikin da aka gama kafin kiran waya, don haka wasan har yanzu yana yin nasara bayan sarkar masu gadi daga baya ( PII da mashin masu sahihanci, fifikon fifikon 10/95) sake rubuta rubutun bayanin a wurin sannan bayan system-prompt/handoff/memory allurar ta sake fasalin tsarin saƙon. Jikin da aka aika sama zuwa samfurin baya canzawa. Buƙatun da aka lura kuma ba ta haifar da Ƙwaƙwalwar Ƙwaƙwalwa mai ɗorewa (dukansu buƙatu- da cirewar da aka samu ba an tsallake su), don haka amsar samfurin ba za ta iya sake maimaita rubutu a cikin Ƙwaƙwalwar ajiya ba.

**Raw filayen bidiyo (#12430).** Lokacin da aka kunna gadar kuma ba a san tallafin bidiyo na asali ko ba ya nan, an ayyana filayen `transcript`/`audioTranscript` suma suna kunna `videoBridgeObserved`, koda bayan gazawar bayanin ko iyaka `maxVideos`. `null` da fanko kirga; filayen da ba su nan da metadata na bidiyo ba sa. Kwafi da aka riƙe suna sake gyara waɗannan filayen ko tsallake buƙatar, kuma caches/Memory ana ƙetare su.

A kan waɗancan hanyoyin koma baya, ingantattun alamun kira sun zama masu goyan bayan sassan `text`/`input_text` maimakon filayen samar da marasa inganci. Duk waƙoƙin da aka ba da buƙatun sun kasance abubuwan lura `client` marasa amana, tare da faɗakarwa cewa ba a bayyana bidiyon ba kuma ba a tabbatar da tambura akan kafofin watsa labarai ba. Jimillar 256-cue/64-KiB da ake da su da kuma kasafin kuɗi na kowane lokaci suna aiki a cikin waƙoƙin biyu tare; timestamps dole ne ya dace da rufin daƙiƙa 600 na dillali da kowane taga mayar da hankali da aka kawo. Ana zubar da waƙoƙi marasa inganci, ba a tura su azaman rubutu na sabani ba; Ana iya amfani da ɗan'uwa ingantacce sai dai idan an wuce kuɗin haɗin gwiwar su. filayen Null/empty ba ƙara rubutu ba. Babu wani ɗan jarida ko kwafi da aka ƙara ta wannan koma baya. Ana cire filayen tsawaita rubutu daga mai ɗaukar bidiyo mai faɗuwa da abubuwan `video_url`/`source`. Jerin izinin waya na OpenAI yana tsayawa sosai; Masu ɗaukar bidiyo na asali waɗanda ba a san su ba sun kasance suna nan kuma sanannun makasudin rubutu-kawai suna kiyaye alamomi masu aminci. Inuwa sabuntar da aka tsara tana kare rubutun da aka haɗe, yayin da ainihin buƙatun mallakar mai kira ya kasance baya canzawa. Maƙasudai masu goyan bayan ƴan ƙasa da gadoji naƙasassu suna riƙe da halayen su na wucewa.

Ƙarin kwafi da aka riƙe suna amfani da siginar duba-buƙata iri ɗaya. Hoton buƙatun abokin ciniki na ɗanyen pre-guardrail, buƙatun da ke kan ƙwaƙwalwar ajiya, da farkon ƙirƙira rajistar buƙatun da ke maye gurbin filayen rubutu a sassan bidiyo; Abubuwan da ke haifar da kirtani da aka haɗa ta hanyar matakan bututun bututun da kuma abubuwan da suka faru na mahallin an sake gyara su a cikin nutsewar-buƙatun-jiki da aka dage. Alamar `video_content_removed` da ta dage tana sa ci gaban `previous_response_id` ya kasa rufe maimakon sake gina rubutun da aka jefar da shi da gangan. Idan buƙatar da aka lura ta rasa inuwar sake fasalin kowane bangare kafin shiga, ko ma ɗaya daga cikin inuwar bidiyo da yawa ta kasa daidaitawa bayan buƙatar maye gurbin daga baya, an cire jikin buƙatar da aka riƙe gaba ɗaya maimakon riƙe wani ɗan rubutun da aka sake gyarawa.

Don buƙatar da aka lura, martanin ƙila zai iya faɗi kowane yanki na rubutun ba tare da ƙayyadaddun iyaka ba. Don haka ana maye gurbin sa da dagewar kira-log `responseBody` da alamar tsallakewa; cikakken kayan aikin bututun (wanda zai iya haɗawa da jikin upstream/client da ɓangarorin rafi) ba a riƙe su ba. Semantic, ƙwaƙƙwalwa, da tunani-maimaitawa caches kewaye yana karantawa kuma ya rubuta don wannan buƙatar. Buƙatun mai ba da amsa da ganuwa-abokin ciniki ba su canzawa. Ana fitar da bytes na farko daga ma'ajiya ta wucin gadi lokacin da aka cire cikakken kayan aikin. Kiro's malformed EventStream gargadi yana ba da rahoton ƙidayar byte ɗin da aka biya kawai, ba zai taɓa abin da ke ciki ba ko kuskuren kuskuren JSON. Wannan baya da'awar cewa an duba duk wani bincike provider/plugin mara alaƙa; Ana bin diddigin share fage mai faɗi a cikin #11658.

Zagayowar rayuwar `/api/modality-bridge/video/drilldown` ta ciki daban ce, loopback/token-authenticated cache substrate. Kowane aiki kuma yana buƙatar babban ID na canonical opaque. Kafin a kunna mai kira na samarwa, dole ne ya sami wannan ID daga ingantacciyar mai haya kuma kada ta taɓa tura ƙimar da abokin ciniki ya zaɓa. Maɓallan cache suna ɗaure wancan babban ɗakin zuwa canonical da IDs-reference, adana maɓallan SHA-256-derived ɗin su kawai, da iyaka duka karantawa da sharewa zuwa babba ɗaya. Cache ɗin yana adana a mafi yawan firam ɗin JPEG guda 16 a kowace shigarwa, yana ƙare su bayan mintuna goma, kuma yana goyan bayan karanta `start`/`end` mai iyaka ko share zaman.

Kowane shugaban makaranta yana iyakance ga shigarwar 16 da MiB 64 na bayanan JPEG na canonical. Waɗannan iyakokin sun kasance masu zaman kansu daga rufin 64-entry/256 MiB na duniya: babban matsin lamba yana fitar da abubuwan shigarwar da ba a yi amfani da su ba a kwanan nan kafin a yi la'akari da korar LRU na duniya. Abubuwan da suka ƙare ana share su daga manyan manyan makarantu da na duniya akan ayyukan cache, yayin da sokewa da gazawar tabbatarwa ba sa yin wani ɗan canji.

Cache ɗin ya ƙi Base64 ba na canonical, wuce gona da iri, kafofin watsa labarai na JPEG, mara kyau ko yanke JPEGs, da JPEGs waɗanda ke ba da faɗakarwa yayin ƙaddamar da cikakken hoton `sharp`. Yana sake shigar da kowane hoton da aka karɓa azaman JPEG na canonical, yana samun faɗi da tsayi daga bytes ɗin da aka yanke maimakon aminta da filayen kira, kuma yana watsar da duk wani baiti na polyglot mai bin bayansa maimakon riƙe su. Matsakaicin matsi na canonical kawai ana caje shi zuwa kashi biyu. Iyakar waya JSON ta haɗa da saman Base64 don 32 MiB da aka yanke-rufin shigarwa. Kowane abin da aka adana yana yin rikodin ingantaccen JPEG format/resolution, manufofin samfur, sigar fitarwa, lokacin ƙirƙira, sabar abun ciki da aka ƙididdige sabar, da bayanin iyaye mara kyau tare da amintaccen abun ciki na mahaifa-abin ciki. Ana bincika sokewa tsakanin matakan asynchronous decode/hash kafin ƙaddamar da cache atomic.

Mai samarwa yana sake yin amfani da firam ɗin dillali da aka riga aka samo kawai bayan nasarar bincike na gani, ba tare da download/extraction. bidiyo na biyu ba Yana buƙatar `modalityBridgeVideoDrilldownEnabled=true` mai aiki, tsayayyen kowane ɓangaren `drilldown: true`, da ingantaccen rikodin maɓallin API- ID. Ƙimar principal/session da abokin ciniki ya bayyana ba sa kafa ikon mallaka. Ba tare da duk sharuɗɗan guda uku ba baya zanta, sake girma ko riƙe ƙarin firam. Rashin riƙewa yana adana amsawar gani mai amfani. Buƙatun da aka yarda sun ƙetare duk ma'aunin sakamakon bidiyo don haka bayanan da aka adana baya sake kunna hannu.

Amsoshin JSON da SSE masu nasara suna fallasa a mafi yawan hannaye marasa ƙarfi a cikin maƙarƙashiyar kai `x-omniroute-video-drilldown`. Asalin burauza masu izini na iya karanta wannan taken ba tare da faɗaɗa manufar asalin CORS ba. Sabbin hannaye suna amfani da `v1.<32-byte random base64url token>`, kuma wurin yin rajista yana riƙe da hashes ɗin SHA-256 su kawai. Hakanan ma'aunin reader/header yana karɓar alamun gadon hex 64. Ingantaccen mabukaci na jama'a shine `GET /api/v1/video-bridge/drilldown?handle=...`, wanda `modalityBridgeVideoDrilldownRemoteEnabled=true` ya keɓe shi . Bayyanannen dagewar karya yana soke damar shiga koda lokacin da aka kunna koma baya `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env. Riƙewar samarwa yana da kwatankwacin gadon baya `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Dukansu faɗuwar baya sun ɓace.

Mabukaci ya sami mallaki daga ingantacciyar maɓalli kuma yana aiwatar da maɓalli mai mahimmanci: duka GET da DELETE suna cikin rukunin ƙarshen `video`, gami da laƙabin `/v1` da `/api/v1`. Maɓallai tare da jerin izini mara izini dole ne su haɗa da `video`; maɓallai marasa iyaka sun kasance masu jituwa. Mabukaci ya dawo da 404 iri ɗaya don wanda ba a sani ba, ƙarewa da wani maɓalli. Yana karɓar `variant=preview|standard|detail` (mafi girman girman JPEG 320/640/1280, bai taɓa girma ba), `limit=1..8` (ko gadon `frames` wanda aka ce masa, ba duka biyu ba), tushen `page`, da sakan daƙiƙan mayar da hankali na `start`/`end` na zaɓi. Kwafin maɓallan tambaya da taga mayar da hankali baya an ƙi. Kowane bambance-bambancen da aka dawo yana da zanta na ainihin abun ciki da ainihin ƙayyadaddun ƙayyadaddun metadata, mai alaƙa da tushen da aka riƙe. Ana samun bambance-bambancen akan karantawa maimakon adana su azaman ƙarin kwafi da aka adana. Amsar JSON, ciki har da Base64/envelope, an rufe shi a 32 MiB; babban shafi mai girma ya dawo 413 kuma dole ne abokin ciniki ya nemi ƙarancin firam. Yana karanta bincika sokewa a kusa da kowane girman kuma sake duba ingancin hannun kafin dawowa. `DELETE` ta mai shi ita ce mai ƙarfi; shafewa ko ƙarewar TTL yana fitar da tushen da aka riƙe da lissafin amfani.

Shagon da aka raba shi ne tsari-na gida: hannun jari zai ƙare a sake farawa kuma ba a iya canjawa wuri tsakanin matakan OmniRoute masu zaman kansu. Ƙididdiga na gudanarwa suna fallasa ingantacciyar riƙewa/ manufofin nesa da jimillar riƙon entries/bytes kawai, ba kafofin watsa labarai ba, nassoshi, babban IDs ko hannaye. Kwamitin saitin Bidiyo yana nuna waɗannan dabi'u kuma yana iya dagewa duka maɓallan yarda. Wannan takaddun aiwatarwa ba ƙaddamarwa bane kai tsaye ko shaidar haɓakawa; karɓa na ainihi ana bin sawun daban.

Ana yin rubutun firam ɗin bi da bi tare da ingantaccen tsarin Bidiyo. Bidiyon da ba komai ya soke ya gaji saitin hangen nesa; idan duka biyun ba su da komai, na'ura mai ba da hanya tsakanin hanyoyin sadarwa na Vision ta zaɓi ingantaccen samfurin hangen nesa. Nasarar rubutun suna maye gurbin asalin ɓangaren tare da tsayayye `[Video description:` prefix wanda kuma ke yiwa rubutu alama a matsayin abin dubawa wanda ba amintacce daga kafofin watsa labarai kuma yana gaya wa ƙirar ƙasa kada su bi umarnin da aka samo a cikin kafofin watsa labarai. Maɓallan cache-frame sun haɗa da bytes JPEG, m, timestamp, da ingantaccen samfuri; Kalmomin nasara kawai ana adana su. Shigar da cache na riƙe ainihin ƙirar mai samarwa mai nasara, gami da ƙirar baya; gada ta ba da rahoton `mixed` lokacin da aka samar da firam daban-daban ta nau'i daban-daban. Ma'aji ya bugu yana sake yin amfani da ainihin furodusa maimakon sanya masa lakabi a matsayin shirin da aka nema. Ana yin maɓalli gabaɗayan cache na sakamakon bidiyo akan kowane shigarwar da ke canza fitowar — da sauri, samfuri mai inganci, tsarin samfura, ƙidayar firam, yanayin bincike, zanen yatsan SHA-256 na daidaitaccen bayanin mayar da hankali, taga mayar da hankali, `transcript`, `audioTranscript`, da tuta-takardar lambar — don haka canza kowane ɗayan waɗannan girman kuskuren cache ne, ba za a taɓa yin amfani da shi ba. Sigar ƙaƙƙarfan ƙayyadaddun manufofin gani, kofa, da ƙididdige ƙididdigar ɗan takara-firam suma a bayyane suke a cikin maɓallin cache na sakamako da metadata; Canjin siyasa don haka ba zai iya sake amfani da cikakken bayanin bidiyo gabaɗaya ba. Sakamakon cache v4 metadata yana kiyaye yanayin da sawun yatsa, ba aikin ɗanyen mai amfani ba. Guardrail metadata yana ba da rahoton duka hanyoyin bincike da ake buƙata da inganci; yanayin `focused` da aka nema ba tare da rubutun mai amfani ba ana bayar da rahoton yadda ya kamata `full`.

Hanyar tsaro tana fitar da kowane ɓangaren bidiyo da aka goyan baya amma bai bayyana fiye da `modalityBridgeVideoMaxVideos` ba. Don maƙasudin da aka tabbatar yana da `supportsVideo === false`, bidiyon da ya gaza kuma ya wuce iyaka ya zama amintattun alamomin rubutu don haka babu ɗanyen bidiyon da ya tsira. Lokacin da ba a san iyawa ba, waɗannan sassan suna riƙe da jigilar bidiyo; duk wani kwafin baya-bayan nan yana biye da jujjuyawar rubutu a sama. Manufa tare da `supportsVideo === true` kewaye gada. Buƙatun abokin ciniki na siginar zubar da ciki yana yaduwa ta hanyar zazzagewa, layin dillali, tsarin aiki, da kira mai taken; zubar da ciki yana tsayawa tsakanin bidiyo kuma ba zai taɓa kasa buɗewa ga raw media ba.

Saitunan lokacin gudu suna da DB masu goyan baya kuma an inganta Zod:

| Maɓalli                             | Default     | Range / hali                                                                                             |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Lokacin aiki na zaɓi, ficewa                                                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` tana adana jigon kalmomi; `focused` yana amfani da iyaka, mara amana na sabon mahallin mai amfani |
| `modalityBridgeVideoModel`          | `""`        | Gaji samfurin Vision Bridge                                                                              |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ko daidaitattun `segment_aware`; gazawar ganowa ya koma `uniform`              |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000-120000 ms                                                                                           |

Legacy na ci gaba da ƙimar lokacin ƙarewar Bidiyo sama da daƙiƙa 120 ana manne da shi zuwa ƙarshen ranar dillali; sabbin saituna sun rubuta sama da cewa an ƙi iyaka. `GET /api/modality-bridge/video/runtime` yana buƙatar amintaccen madaidaicin madauki na gida kafin tantancewa ko bincike lokacin aiki, sannan yana buƙatar amincin gudanarwa. Yana dawo da `available` kawai, tsattsauran nau'ikan FFmpeg/ffprobe, da ƙayyadadden dalili lokacin da babu lokacin aiki. Ƙarshen cirewar cikin gida ba ta jama'a ba ce API: jikewar layi ya dawo `503` da `Retry-After`, mai kiran ya cire haɗin ya dawo `499`, kuma ƙayyadadden lokacin dillali ya dawo `504`. Martanin da aka canza suna ƙara `video->text;model=<visionModel>;parts=<videos>` zuwa tsakiyar tsakiyar `x-omniroute-modality-bridge` ba tare da cire sassan hangen nesa ko Audio ba.

### PII Masker (`piiMasker.ts`)

Yana gudana **duka biyu** matakai.

- **`preCall`** clones da payload, tafiya `system`, `messages`, `input`, da `prompt` (ciki har da bayyana kirtani abubuwa), da kuma shafi `processPII()` (daga `@/shared/utils/inputSanitizer`) zuwa kirtani `content`/`text` filayen. Lokacin da `PII_REDACTION_ENABLED=true`, PII da aka gano yana raguwa a cikin kayan aiki mai fita. Wannan mai zaman kansa ne daga `INPUT_SANITIZER_MODE` (wanda kawai ke sarrafa manufofin alluran gaggawa). Lokacin da aka kashe sakewa, gano bayanan kira yana ƙirga ba tare da sake rubuta abun ciki ba.
- **`postCall`** zurfin-clones amsa, yana gudanar da `sanitizePIIResponse()` tare da Mashin-siffar-API (`maskResponsesOutput` — ya rufe `output_text` da `output[].content[].text`). Idan wani sakewa ya faru, amsawar da aka gyara ta maye gurbin na asali.

Titin tsaro ba ya toshewa; yana bayyana kawai (`meta.detections`, `meta.redacted`) ko sake rubutawa.

#### Zaɓin kowane nau'i, ƙirar al'ada da ƙididdigar ganowa

**Dashboard → Saitunan → Tsaro → PII masking** ya zabi _me_ aka rufe. Ba ya kunna abin rufe fuska: wannan shine har yanzu `PII_REDACTION_ENABLED` (buƙata) da `PII_RESPONSE_SANITIZATION` (amsar + SSE), duka a kashe ta tsohuwa.

- **Zaɓin kowane nau'i** — abubuwan ginannun ids an jera su a cikin `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Unset yana nufin kowane nau'i (halayen kafin wannan saitin ya wanzu). Taswirar ƙirar `ssn_us` na injin buƙatun zuwa `ssn`. Samfura (Mafi ƙanƙanta, Standard, Financial, Brazilian, USA, GDPR, POPIA, Cikak) kawai sun cika akwatunan rajistan shiga cikin UI.
- **GDPR da POPIA masu ganowa** — goma sha biyu ginannun ids masu rufe EU da abubuwan gano sirri na Afirka ta Kudu (tebur a ƙasa). Su regexes, masu tabbatarwa da alamun ikon suna rayuwa a cikin tebur ɗaya, `src/shared/utils/piiPatterns.ts`, wanda duka mai tsabtace amsawa (`src/lib/piiSanitizer.ts`) da mashin buƙatun (`src/shared/utils/inputSanitizer.ts`) suna cinyewa. Ana gyara ashana ne kawai idan mai tabbatar da shi ya karɓe shi; danda gudu na lambobi bai taba isa ba. Ma'aikacin da ya ajiye ƙunƙuntaccen zaɓi kafin waɗannan ids ɗin su wanzu yana kiyaye halayen da yake da shi har sai an sami alamar sabbin ids.
- **Tsarin al'ada** — har zuwa 20 regex ko ƙirar kati (`*` = har zuwa haruffa 64 waɗanda ba fararen sararin samaniya ba, `?` = ɗaya). Matches sun zama `[CUSTOM_REDACTED]`. Kowane tsari yana wucewa ta hanyar `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): aƙalla haruffa 500, tutoci iyakance ga `g i m s u`, dole ne a tattara su, dole ne su wuce `safe-regex` (mummunan koma baya), kuma kada su dace da sigar da ba komai ko madaidaicin wuri. Ana ƙi tsarin da ya gaza lokacin adanawa da lokacin gwaji, kuma layin da aka adana wanda ya gaza ana tsallake shi a lokacin aiki maimakon a haɗa shi. Tsarin al'ada yana gudana kawai yayin da ake kunna abin rufe fuska.
- **Ƙididdigar ganowa** — kowane nau'in ƙidaya (ba a taɓa daidaita ƙima ba), riƙe a ƙwaƙwalwar ajiya kuma sake saitawa akan sake kunnawa (`src/lib/pii/piiDetectionStats.ts`). Suna karuwa ne kawai yayin da ake kunna masking.

Saitunan suna rayuwa a cikin tebur `key_value` (sunan sararin samaniya `pii_settings`, `src/lib/db/piiSettings.ts`) kuma ana karanta su ta hanyar cache 1 s. API:

| Hanya  | Hanya (Path)             | Dalili                                                                   |
| ------ | ------------------------ | ------------------------------------------------------------------------ |
| `GET`  | `/api/settings/pii`      | Matsayin flag, `enabledTypes`, `customPatterns`, ƙididdigar gano abubuwa |
| `PUT`  | `/api/settings/pii`      | Maye gurbin `enabledTypes` (`null` = duk) da/ko `customPatterns`         |
| `POST` | `/api/settings/pii/test` | Dry-run alama ɗaya akan samfurin aƙalla 8 KB; ba a adana komai           |

Duk ukun suna buƙatar takaddun gudanarwa da kuma inganta jiki tare da Zod (`src/shared/validation/schemas/piiSettings.ts`). Tare da naƙasasshiyar shiga (`requireLogin=false`) `GET` da ƙarshen gwajin a buɗe suke, amma `PUT` har yanzu yana buƙatar zaman dashboard, maɓallin `manage` -scope API, alamar samun damar `oma_` tare da iyawar rubutu ko mafi girma, ko alamar CLI ko alamar sabis na ciki da aka aika daga madauki.

#### GDPR (EU) da POPIA (Afirka ta Kudu) masu ganowa

| Id                  | Alama                           | Tabbatarwa                                                                                   |
| ------------------- | ------------------------------- | -------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                            | Ƙasar da aka sani, tsawon daidai na wannan ƙasa, ISO 13616 MOD-97-10                         |
| `eu_vat`            | Lambar VAT ta EU                | Prefix na ƙasa memba da aka sani da tsarin lambarta (babu VIES lookup)                       |
| `es_dni_nie`        | DNI / NIE na Sifaniya           | Harafin dubawa (daraja mod 23); NIE shi ne `X/Y/Z` + lambobi 7                               |
| `it_codice_fiscale` | Codice Fiscale na Italiya       | Harafin dubawa daga teburin matsayi mara/cikakken rabo da biyu                               |
| `pl_pesel`          | PESEL na Poland                 | Weighted checksum da iyakokin watan/ranar haihuwa da aka encode masu ma'ana                  |
| `nl_bsn`            | BSN na Netherlands              | Gwajin 11 (weights 9..2, -1)                                                                 |
| `de_steuer_id`      | Steuer-ID na Jamus              | ISO 7064 Mod 11,10 da ƙa'idar tsarin lambobi (babu 0 a farko)                                |
| `se_personnummer`   | personnummer na Sweden          | Luhn a lambobi goma na ƙarshe da ranar haihuwa mai yiwuwa (lambobi 10 ko 12)                 |
| `za_id`             | Lambar ID ta Afirka ta Kudu     | Luhn a duk lambobi 13, watan/ranar haihuwa masu inganci, lambar ɗan ƙasa 0 ko 1              |
| `za_phone`          | Wayar Afirka ta Kudu            | Prefix `+27` / `27`, ko tsarin gida `0..` da aka rubuta da sarari ko alamar haɗi             |
| `za_vat`            | Lambar VAT ta Afirka ta Kudu    | Lambobi 10 da suka fara da `4` **da kuma** "VAT" / "BTW" a haruffa 48 da ke gabansu          |
| `za_tax_ref`        | Lambar haraji ta Afirka ta Kudu | Lambobi 10 da suka fara `0`-`3`, Luhn, **da kuma** "tax" / "SARS" a haruffa 48 da ke gabansu |

Saboda tsarin lambobi-kawai suna yin karo da lambobi, gina lambobi da tambura, mafi rauni (`za_vat`, `za_tax_ref`) suna buƙatar alamar maɓalli, kuma ba a ɗaukar lambar `0..` mai lamba goma a matsayin lambar wayar Afirka ta Kudu. IBANs mai sarari (`GB29 NWBK ...`) ba a daidaita ba. A kan hanyar yawo ana duba alamar sama a cikin ɓangarorin yanzu kawai. ID ɗin suna zama gaba da tsarin ƙirar waya, don haka ingantaccen mai ganowa yana kiyaye nasa wurin (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Samfuran `gdpr` da `popia` suna zaɓar ID ɗin EU da Afirka ta Kudu bi da bi. Masking kanta yana tsayawa ficewa (Hard Rule #20): babu abin da ke canza fasalin fasalin fasalin.

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
