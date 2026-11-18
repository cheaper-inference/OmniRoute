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

## Matakan Kariya da Aka Gina a Ciki

Registry yana loda matakan kariya guda shida ta atomatik bisa tsarin fifiko yayin shigowa
(duba `registry.ts` → `registerDefaultGuardrails()`):

| Fifiko | Suna                | Mataki/Matakan | Fayil                 |
| ------ | ------------------- | -------------- | --------------------- |
| `5`    | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`    | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`    | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`   | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`   | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`   | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Ƙananan lambobin fifiko suna gudana **da farko**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Samfurin tushe na GLM 5.3 da `glm-5.3-{low,high,max}` suna da metadata na registry/spec da ke bayyana
`supportsVision:false`. Nau’ikan GLM 5.3 Flash kuwa sun kasance samfurai masu tallafin hangen nesa na asali. Hanyar Claude Code ta `/v1/messages` tana shiga jerin matakan kariya na shared `handleChat` kafin fassarar Claude-zuwa-OpenAI; dole ne a bayyana ko sarrafa hotunan sakamakon kayan aikin `Read` da aka shigar kafin wannan fassarar ta ɗaga su zuwa abun cikin OpenAI `image_url` (#17069).

Yana kama buƙatun da ke ɗauke da hotuna waɗanda aka nufa ga **samfuran da ba sa tallafa wa hangen nesa**, sannan ko dai ya sake tura buƙatar gaba ɗaya zuwa samfurin da ke iya hangen nesa, ko ya maye gurbin sassan hoton da bayanin rubutu da samfurin hangen nesa mai daidaitawa ya samar kafin kiran upstream. Wannan yana ba masu samar da rubutu-kawai damar sarrafa payloads masu multimodal a bayyane.

Tsari:

1. Tsallake idan samfurin da aka nufa yana tallafa wa hangen nesa tun farko (sai dai idan ya bayyana a cikin jerin tilastawa `isVisionBridgeForcedModel`).
2. Ciro sassan hotuna ta `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), wanda ke miƙa aikin zuwa **unified media detector** `detectMediaParts()` a cikin `open-sse/utils/mediaParts.ts` — tushen gaskiya guda ɗaya da ake rabawa tare da matatar dacewar combo.
   Ana takaita cirewa ga siffofin da `replaceImageParts` zai iya mayarwa a wurinsu (kwangilar extract↔replace): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, da Responses API `input_image`. Ana kuma cire hotunan da suka dace da ke cikin `tool_result.content` na Claude Code da fitowar kayan aikin Responses, sannan a mayar da su a ainihin hanyoyinsu; siffofin da ke nuna alama kawai kayan combo-filter ne kuma ba a cire su.
   Tsallake idan ba a sami ko ɗaya ba.
3. Ƙayyade saitunan runtime ta `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): sabbin maɓallan saitin `modalityBridge*` su ne ke da fifiko; tsoffin maɓallan `visionBridge*` suna nan a matsayin **madadin zagaye guda ɗaya** (lokacin rollback). Tsallake kafin a fara binciken kowace media idan an kashe bridge ɗin.
4. Mai zaɓin yanayi (`modalityBridgeVisionMode`, duba teburin da ke ƙasa) yana yanke shawarar tsakanin sake turawa da bayyanawa. Sake turawa yana dawo da `modifiedPayload` wanda aka sauya `model` kawai, tare da meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Hanyar bayyanawa: takaita hotuna zuwa `maxImages`, tsara tambayar da ta dace da aikin, duba cache na bayani, kiran samfurin hangen nesa **a lokaci guda**
   (`Promise.allSettled`), sannan saka sassan rubutu `[Image N]: <description>` a wurarensu. Bayanin da ya gaza yana haifar da `null`: ana adana hoton asali ga wuraren da ba a sani ba/samfuran da ke iya hangen nesa (#4012), amma **wurin da aka tabbatar rubutu-kawai kai tsaye** ko combo mai hangen nesa sifili yana samun bayyanannen gurbin rubutu
   `(unavailable — no vision-capable provider connected)` ga kowane hoton da ba a bayyana ba, har da gazawar wani ɓangare da hotunan da suka wuce iyakar kiran bayani (#17069). Madadin bayanin combo na tsohon yanayin “duk sun gaza” yana nan (#8430).
6. Dawo da `modifiedPayload` tare da meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Mai zaɓin yanayi (`modalityBridgeVisionMode`)

| Yanayi     | Tsoho | Hali                                                                                                                                                                                                                                                                                                                        |
| ---------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔     | Tsohuwar dabarar hasashe, ba a taɓa ta ba (#6640/#7204): samfuran da ba na combo ba/na `auto/` ana sake tura su zuwa mafi kyawun samfurin hangen nesa sai dai idan samfurin asali ya riga yana da ingantattun bayanan shiga (a wannan yanayin a yi bayani); wuraren combo koyaushe suna yin bayani.                         |
| `describe` |       | Koyaushe a yi bayani — ana tsallake sashen sake turawa gaba ɗaya; samfurin da mai amfani ya zaɓa ne koyaushe zai ba da amsa.                                                                                                                                                                                                |
| `reroute`  |       | Tilasta sake turawa: ana ƙetare kariyar samfurin da ke riƙe da bayanan shiga. Kariyar bayanan shiga ta **manufar sake turawa** har yanzu tana aiki — idan babu wata manufa ta hangen nesa mai amfani, bridge ɗin yana dakatarwa da kuskure bayyananne maimakon yin bayani ko aika ɗanyen hotuna zuwa wurin da rubutu-kawai. |

Yanayin tilastawa yana yanke shawara **kafin** a fara dabarar `auto`; halayen `auto` sun yi daidai da byte da na matakin kariyar kafin PR-1.

#### Iyakar API-key (`visionBridgeKeyScope.ts`)

Lokacin da maɓallin API na mai kira ya takaita `allowedConnections`, wuraren kaso
(`allowedQuotas`) ko samfura (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), gada tana zaɓar
samfuran reroute da describe waɗanda maɓallin zai iya amfani da su kawai, a kan
haɗin da maɓallin zai iya amfani da shi. Kiran describe daga nan koyaushe yana
wucewa ta madaukin OmniRoute na kansa tare da taken
`x-omniroute-self-loop-key-id`, saboda haka buƙatar taɗi mai karɓa tana sake
tilasta manufofin haɗi da samfura na wannan maɓalli. `enforceApiKeyPolicy()`
tana mutunta wannan taken ne kawai tare da self-loop bearer, saboda haka tana
iya taƙaita dama kawai, kuma ana ƙin id ɗin da ba a iya warwarewa ba.

Idan babu samfurin hangen nesa da aka yarda wa maɓallin, **tabbataccen abin
da ake nufi da rubutu-kawai** yana ƙin buƙatar hoto a gida da HTTP 400
bayyananne maimakon tura bytes ɗin hoton zuwa upstream da ba shi da ikon
sarrafawa (#17069). Ga targets masu ikon hangen nesa da ba a sani ba ko na
asali, hanyar describe tana riƙe da halayenta na baya na fail-open
(meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Buƙatun da
ba su da maɓalli, da maɓallan da ba su da waɗannan takaitawar, suna aiki daidai
kamar da.

#### Saƙon describe mai la’akari da aiki (`modalityBridgeVisionTaskAware`)

Tsoho **`true`**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) tana
ƙara rubutun **saƙon mai amfani na ƙarshe** (an rage shi zuwa haruffa 500) a
ƙarshen saƙon describe na asali, tana karkatar da bayanin zuwa ga abin da
mai amfani ya tambaya a zahiri (tsarin codex-vision-proxy), sannan tana neman
samfurin hangen nesa ya rubuta rubutun da ake iya gani. Idan an kashe tutar —
ko babu rubutun mai amfani — ana amfani da saƙon asali ba tare da canji ba.

Buƙatar OpenAI-compatible ta self-loop na describe kanta
(`callVisionModelSingle()` a `visionBridgeHelpers.ts`) koyaushe tana neman
`image_url.detail: "high"` — ba tare da wani sharadi ba, ga kowane mai kira ko
mai bayarwa. Samfurin ƙananan daki-daki yana rage daidaiton OCR musamman ga
aikin rubuta rubutu da wannan saƙon yake nema, don haka kiran describe kansa
koyaushe yana neman babban daki-daki ba tare da la’akari da matakin daki-daki
da buƙatar shigowa ta asali ta yi amfani da shi ba. Wannan yana shafar jikin
buƙatar describe na cikin gida kawai; ba ya canza yadda OmniRoute ke tura
`image_url.detail` na buƙatar mai kira ta farko — ana amfani da wannan tsohon
ƙima daban, kuma ga abokan cinikin OpenCode da aka gano kawai, a
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Reshen
Anthropic na tsarin waya na self-loop na describe ba shi da filin `detail`, kuma
waɗannan tsoffin ƙimomin ba su shafe shi ba.

#### Iyakar fitarwar describe (`modalityBridgeVisionMaxChars`)

| Maɓalli                        | Tsoho | Iyaka            |
| ------------------------------ | ----- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`   | `0` ko 100–50000 |

`0` (tsoho) yana nufin **babu iyaka** — bayanin da
`callVisionModel()` ya dawo da shi ana wuce shi ba tare da an canza shi ba,
don kiyaye halayen da ake da su. Kowace ƙima tsakanin 100–50000 tana rage
bayanin tare da alamar `…` a ƙarshe kafin a mayar da shi a matsayin
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` a
`src/lib/guardrails/visionBridge.ts`). Ƙara wannan ƙimar don ayyukan OCR masu
yawan daki-daki inda samfurin ƙasa ke buƙatar cikakken rubutun; rage ta don
taƙaita amfani da token a kan samfuran hangen nesa masu yawan magana.
Filin dashboard yana kan shafin Vision na Advanced
(`modality-bridge-max-chars` a `ModalityBridgeVisionTab.tsx`) kuma yana
ɗaga kowace ƙima tsakanin 1 da 99 zuwa mafi ƙarancin 100, yayin da yake barin
`0` da aka bayar a sarari ba a canza shi ba — `0` ƙima ce mai inganci ta Zod
da kanta (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`),
ba tsohon ƙimar “ba a saita ba” kawai ba.

#### Ma’ajiyar describe (`modalityBridge/bridgeCache.ts`)

Ma’ajiyar LRU + TTL ta cikin ƙwaƙwalwa don fitarwar describe, wadda ake
raba ta a faɗin tsarin aiwatarwa. Maɓalli = `sha256(imageRef + composedPrompt + configuredBridgeModel)` tare da tsara
length-prefix (ba a samun karo tsakanin iyakokin filaye). Bangaren samfurin shi
ne samfurin gada da aka **tsara**, ba samfurin da ya ba da amsa a zahiri ba —
`callVisionModel` na iya komawa wani samfurin a ciki, kuma yin maɓalli ga
kowace ƙoƙari zai rarraba ma’ajiyar ba dole ba. Ba a taɓa saka failed
describes cikin ma’ajiya ba. Saituna:

| Maɓalli                         | Tsoho  | Iyaka   |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Daidaita hoton nesa (self-loop describe/base64 fetch)

Lokacin da gada ta ɗauko hoton **nesa** da kanta — kiran Anthropic describe na
kai, da juyar da claude-wire-format zuwa base64
(`ensureBase64ImagesForClaudeWire`), dukansu ta
`fetchRemoteImageAsDataUri()` a `visionBridgeHelpers.ts` — ana wuce URI ɗin
data da aka samu ta `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) kafin a saka shi cikin buƙatar
samfurin hangen nesa. Ana rage girman hotunan da suka yi yawa zuwa **2048px a
gefen da ya fi tsawo** (daidai da iyakar rage girman da OpenAI/Anthropic
tuni suke amfani da ita a ɓangaren uwar garke), wanda ke rage bytes/latency na
ɗorawa ba tare da canza abin da samfurin hangen nesa yake gani ba. Ana amfani
da `sharp` wajen rage girman, kuma ana loda shi ta dynamic import: a dandali
inda binary ɗinsa na asali ya kasa loduwa, `normalizeDataUri()` **ba ta taɓa
jefa kuskure ba** — tana koma wa wucewar bytes na asali ba tare da canji ba,
saboda haka hanyar describe/base64-conversion koyaushe tana ci gaba da aiki.
Bytes waɗanda ba na hoto ba (fetch da bai dawo da hoton da za a iya decode
ba) ma ana wuce su ba tare da canji ba. Wannan daidaitawar ta shafi hotunan da
gada ta ɗauko don self-call ɗinta kawai — ba a taɓa amfani da ita ga payload
na caller na raw passthrough ba, daidai da ƙa’idar canji ta opt-in-only
(Hard Rule #20).

#### Tsarin saituna + ƙaura

Sabbin maɓallan `modalityBridge*` ana tantance su da Zod a cikin `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, rukunin `modalityBridgeCache*` guda uku, da
rukunin `modalityBridgeAudio*` da Audio Bridge ke amfani da shi. Migration
`141_modality_bridge_settings.sql` tana kwafe tsoffin ƙimomin `visionBridge*`
zuwa sabbin maɓallan da suka dace (mai jure maimaitawa, kuma ba ta taɓa
sake rubuta ƙimar `modalityBridge*` da mai gudanarwa ya sa ba); tsoffin
maɓallan za su ci gaba da zama karɓaɓɓun madadin karantawa na zagayen fitarwa
ɗaya.

#### Kan bayyana gaskiya + ƙididdiga

Amsoshin da aka bayyana suna ɗauke da
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(ana gina shi ta `buildModalityBridgeHeader()` a cikin `modalityBridge/bridgeStats.ts`,
kuma ana sanya shi ta `withModalityBridgeHeader()` a cikin `src/sse/handlers/chatHelpers.ts`).
Buƙatun da aka sake turawa ba sa samun **wani** kan — ba a taɓa sauya abin da
ke cikin payload ba, kuma an riga an nuna sauyin model a filin `model` na
jikin amsar.

`GET /api/modality-bridge/stats` (izinin gudanarwa, a mataki ɗaya da
`GET /api/settings`) yana dawo da ƙididdigar da ke cikin ƙwaƙwalwa ta kowane
modality `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` don `vision`, `audio`, da
`video`. `averageLatencyMs` yana amfani da `latencySamples`, ba duk yunƙuri ba,
a matsayin rabon lissafi; aiki da bai da lokacin aunawa ba ya ƙirƙirar samfurin
sifili-millisakan ba. `bridged` yana nan a matsayin sunan da ya dace da baya
don nasararrun sauye-sauye; yunƙurin da ya gaza ba ya ƙara shi.
Ana sake saita ƙididdiga idan aka sake kunna tsari bisa ƙira
(telemetry ne, ba lissafin kuɗi ba).

#### Tsarin saitin Dashboard

Shafin dashboard na musamman shi ne
`/dashboard/settings/modality-bridge`. Shafukan `Vision`, `Audio`,
da `Video` waɗanda URL ke iya bayyana suna riƙe sigogin tambaya yayin
sauyawa ƙimar `tab`. Shafin Vision yana fallasa kunnawa, yanayi, zaɓin model
(gami da tsoho na atomatik), prompting mai la’akari da aiki, iyakokin ci gaba
na lokacin ƙarewa/hotuna/tsawon bayani/cache, ƙididdigar lokacin aiki, da
gwajin buƙatar samfurin da aka kiyaye. Shafin Audio ma yana aiki: yana fallasa
kunnawa, mai zaɓar model na STT kaɗai tare da Auto, iyakokin lokacin ƙarewa/
tsawon faifan sauti, ƙididdigar audio, da gwajin samfurin `input_audio`.
Shafin Video yana aiki: yana bayar da rahoton yanayin lokacin aiki na
FFmpeg/ffprobe — ɗaya daga cikin yanayi huɗu bayyanannu na UI (`unknown` yayin
da binciken yake gudana ko bai samu kammalawa ba, `restricted` a kan host na
dashboard wanda ba na loopback ba inda ake tsallake binciken daga ɓangaren
abokin ciniki, `unavailable` bayan an bincika aka tabbatar da babu shi, ko
`available` tare da sigogin FFmpeg/ffprobe) — yana adana iyakokin
enable/model/frame/video/timeout, yana tace mai zaɓar model zuwa waɗanda ke
iya vision, kuma yana fallasa ƙididdigar video.

Katin Vision Bridge na baya a ƙarƙashin saitunan AI hanyar dacewa ce zuwa sabon
shafin; ba shi ne ke mallakar wani kwafi na form ɗin ba. Media Providers kuma
yana haɗa hanyoyin Image-to-Text da Speech-to-Text zuwa shafukan Modality
Bridge da suka dace, ba tare da cire playground na Speech-to-Text da ke akwai
ba.

**Kewayar shigar da self-loop:** lokacin da kiran bayyana bayani ya bi ta
self-loop na OmniRoute `/v1` (model na provider wanda ba na daidaitaccen tsari
ba), ƙaramin buƙatar yana aika
`x-omniroute-admission-bypass: internal` kuma ana tantance shi da takardun
shaidar self-loop da aka warware — sentinel na gida `sk_omniroute` a yanayin
gida, ko maɓallin env ɗin `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` da mai
aiki ya tsara (#1350), don tura kayan aiki masu `REQUIRE_API_KEY=true` su
ci gaba da gudanar da kiran bayyana bayani. Ana mutunta bypass ɗin ne kawai
ga waɗannan takamaiman takardun shaida, saboda haka abokan ciniki na waje ba
za su iya amfani da kan don tsallake admission ba.

Tsoffin ƙimomin tsoho suna cikin `src/shared/constants/visionBridgeDefaults.ts`;
sabbin tsoffin ƙimomin yanayi/task-aware/cache da mai warware saituna suna cikin
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail yana fallasa zaɓin
constructor na `deps` don gwaje-gwaje su iya shigar da aiwatarwar bogi na
`getSettings` da `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Yana kama buƙatun tattaunawa masu ɗauke da audio kafin su isa ga target ɗin da
ba a san yana karɓar shigarwar audio ba. Ba ya taɓa sake tura buƙatar
tattaunawar: ana rubuta sassan audio zuwa rubutu ta hanyar endpoint ɗin
multipart mai dacewa da OpenAI da yake akwai, sannan chat model ɗin da aka zaɓa
yana ci gaba da amfani da transcript na rubutu.

Tsari:

1. A warware `supportsAudio` ta hanyar `getResolvedModelCapabilities()`. Metadata na rajistar mai samarwa da aka ayyana shi ne ke rinjaye, sai metadata na samfurin da yake tsaye, sannan `modalities_input` da aka daidaita. Jerin abubuwan shigarwa da aka ayyana ba tare da `audio` ba yana zama `false`; idan babu wata shaida kan damar, sakamakon yana zama `null`. Dukansu `false` da `null` suna kunna gadar kariya, yayin da `true` ke tsallake ta.
2. A warware saitunan `modalityBridgeAudio*`, sannan a fitar da sassan sauti na matakin sama da za a iya haɗawa daga kowace saƙo ta hanyar mai gano `detectMediaParts()` da aka raba. Siffofin waya da ake tallafawa su ne OpenAI `input_audio`, `audio_url`, da `source.media_type: "audio/*"`. Ana gano sautin da ke ciki don yin routing, amma hanyar splice ba ta cire shi. Aikin yana da iyaka ta `modalityBridgeAudioMaxClips`; sassan da suka zo daga baya ba a taɓa su.
3. A mutunta `provider/model` da aka saita, ko a bar `selectAudioBridgeModel()` ya bi `AUDIO_TRANSCRIPTION_PROVIDERS` bisa tsayayyen tsarin kundin, ya zaɓi samfurin farko mai ingantaccen bayanan shaidar mai samarwa da ke aiki.
4. `callAudioTranscription()` yana mayar da sautin base64/data-URI zuwa multipart `file`, ko ya sauke `audio_url` na nesa ta hanyar kariyar fita ta jama'a kawai, tare da ɗaure DNS da iyakar 25 MB. Daga nan yana aika POST na fayil da samfurin da aka zaɓa zuwa self-loop na gida `/v1/audio/transcriptions`, tare da tantancewa ta `resolveSelfLoopBearer()`. Hanyar transcription da take akwai tana yin binciken bayanan shaidar da aka saba, sarrafa cooldown/rate-limit, da tura buƙata ga mai samarwa.
5. Kira da suka yi nasara suna maye gurbin sassansu da `[Audio N]: <transcript>`. Ana gudanar da kiran da `Promise.allSettled`: gazawar kira guda ɗaya tana kiyaye ainihin sashin sautin (#4012 contract). Idan duk kiran suka gaza kuma an tabbatar da cewa manufa `supportsAudio === false` ce, sassan suna zama  
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 contract). Ga manufa da ba a sani ba (`null`), sakamakon gazawar duka yana barin komai yadda yake. Manufa tabbatacciya mai karɓar rubutu kawai wadda ba ta da ingantaccen bayanan shaidar STT tana samun wannan stub ɗin bayyananne ba tare da yin kiran hanyar sadarwa ba.

Rubutun transcription da suka yi nasara suna amfani da ma'ajiyar LRU/TTL ta Modality Bridge wadda take aiki a faɗin tsarin. Maɓallin yana haɗa bayanin sautin, alamar aikin `audio-transcription` mai tsayayye, da samfurin STT da aka zaɓa; ba a taɓa adana gazawa ba. Ƙoƙarin sauti yana sabunta ƙididdigar `bridged`, `cacheHits`, `failures`, da `lastUsedAt` da aka raba. Amsoshin da aka canza suna ɗauke da  
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; buƙatun da ba a taɓa su ba ba sa samun ɓangaren Audio Bridge.

Saitunan lokacin aiki suna dogara da DB kuma Zod ne ke tabbatar da ingancinsu:

| Maɓalli                       | Tsoho   | Iyaka          |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto ko STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

Ma'ajiyar da aka raba tana ci gaba da kasancewa ƙarƙashin ikon `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, da `modalityBridgeCacheMaxEntries`.

### Gadar Bidiyo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Tana kutsa kai cikin sassan bidiyo na matakin sama a cikin `messages` na Chat Completions da `input` na Responses API kafin a kira manufa wadda ba a san tana da tallafin bidiyo na asali ba. Siffofin da ake tallafawa su ne `input_video`, `video_url`, `video_source`, URL na HTTPS, da data URI na `data:video/*;base64,...`. Ba a ɗauki sunayen fayil na fili a cikin rubutu a matsayin bidiyo ba.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ce ke kula da zagayawar buƙata, binciken damar/tsari, tattara bayanai na kowane buƙata, da bayanan amsa. Aikin kowane bidiyo — samo bayanai, ma'ajiyar sakamakon gaba ɗaya, bayyana jerin firam ɗin (wanda ke haɗa duk wani transcript na sauti da mai kira ya ayyana), da ma'aunin kowane ƙoƙari/katsewa/tsaftacewa — yana ɓoye a bayan `processVideoPart` a cikin `videoBridgePipeline.ts`, wanda ake kira sau ɗaya ga kowane sashin bidiyo a cikin madaukin `preCall`. Wannan module ɗin kuma yana ayyana iyakokin tashoshin sadarwa na fili `VideoMediaBrokerPort` (samo bytes da fitar da firam ɗin da aka zaɓa), `VideoAudioTranscriptionPort` (haɗa transcript na sauti da mai kira ya ayyana da captions da aka samo daga firam), da `VideoDrilldownPort` (siffar legacy raw-store). Ana haɗa STT na samarwa da riƙe firam a kusa da tashar bayyanawa ta hanyar `createVideoSttAdapter` da `createVideoDrilldownAdapter`; na ƙarshe yana amfani da tsarin rayuwar opaque-handle da aka raba.

Hanyar buƙatar `/v1` ta jama'a ba ta taɓa shigo ko kiran subprocess ba. Ana sauke bidiyoyin nesa ƙarƙashin iyakar 50 MiB; bidiyon inline na base64 suna da iyakar kariya ta 36 MiB da aka warware ga kowane bidiyo, domin ambulan samfurin/saƙonni/framing ya kasance cikin iyakar karɓar buƙatar JSON ta jama'a mai nauyin 50 MiB. Ana bincika tsawon inline da kiyasin girman da aka warware kafin ware ƙwaƙwalwa. Ana buƙatar HTTPS a URL na nesa na farko da duk wani redirect, ta amfani da kariyar fita ta jama'a kawai da ke akwai tare da ɗaure DNS. Daga nan bytes ɗin suna ratsawa ta ainihin iyakar broker na ciki `POST /api/modality-bridge/video/extract`. Wannan hanyar tana da `LOCAL_ONLY` da `SPAWN_CAPABLE`, tana karɓar buƙata amintacciya kawai da aka tantance ta kowane tsari daga trusted-loopback, kuma ba ta taɓa karɓar URL, hanyar tsarin fayil, executable, ko jerin hujjoji ba. Bututun girman jikin API da mai karanta jikin incremental na handler suna aiwatar da iyakar shigarwar broker mai nauyin 50 MiB kowannensu ba tare da dogaro da juna ba. Jerin aikinsa mai iyaka yana gudanar da cirewa ɗaya a lokaci guda, yana ba da damar ayyuka huɗu su jira, kuma yana iyakance shigarwar da ke jira zuwa 100 MiB.

A cikin broker, `ffprobe` yana karanta fayil na gida mai zaman kansa; ƙayyadadden jerin format ɗin da aka amince da su ba ya haɗa da format ɗin playlist da manifest. Ga akwatunan MOV-family da aka amince da su, nassoshin bayanan MOV na waje suna nan a kashe ta tsohuwa, kuma ƙayyadadden umarnin ba ya kunna su. `ffprobe` da `ffmpeg` duk suna amfani da jerin izinin protocol na `file` kaɗai, zare guda ɗaya, tsayayyun jerin hujjoji, ba tare da shell ba, kuma ana nemo executable ɗin daga `PATH`. Rafukan hoton murfi da aka haɗe ba ’yan takarar da za a iya kunnawa ba ne. Dole ne duk rafukan da za a iya kunnawa su cika iyakokin, kuma an fi son rafin tsoho bayyananne kafin komawar ƙarshe mai ƙayyadadden ƙaramin index. An iyakance bidiyoyi zuwa daƙiƙa 600, pixels 8,192 a kowane gefe, da pixels 33,554,432 na asali. FFmpeg yana ɗaukar hotunan JPEG na tsakiyar lokaci 1–16, yana rage gefen da ya fi tsawo zuwa aƙalla pixels 1,024 ba tare da ƙara girman ƙananan shigarwa ba, kuma ba ya taɓa karɓar URL. `Sampling` shi ne `uniform` ta tsohuwa. Manufofin zaɓi na `scene_aware` da na gwaji `segment_aware` suna yin ƙarin wucewa ɗaya tabbatacciya ta FFmpeg a kan rafin gida da aka riga aka inganta, suna zaɓar tamburan lokacin scene na `showinfo` da aka iyakance, sannan su koma ga daidaitattun tsakiyar lokaci iri ɗaya idan detector ya gaza, lokaci ya ƙare, fitarwa ta lalace, ko jerin ’yan takara ya zama babu komai. Yanayin segment-aware yana rarraba samfurorin tsakiyar lokaci gwargwadon tazarar scene da aka inganta; an yi cikakken bayani kan shaidar segment-aware da halayen komawa ƙasa a ƙasa. Ana amfani da tsayayyen iyakar frames 16 bayan zaɓe a kowace manufa. Idan buƙatar scene-aware tana da kasafin frame ɗaya kawai, tana amfani da tsakiyar lokaci na uniform na cikakken bidiyon da ke aiki ko taga mai mayar da hankali, sannan ta bayar da rahoton `policyEffective: uniform`: frame ɗin scene guda ɗaya da aka zaɓa ba zai iya kiyaye ƙarshen lokaci biyu ba. Mai kira zai iya bayar da taga mai mayar da hankali mai iyaka (`start`/`end` seconds); ana matse iyakokin zuwa tsawon lokacin media, ana ƙin tagogin da aka juya ko waɗanda ba na ƙarshe ba, kuma ana aiwatar da duk manufofin sampling a cikin tazarar da aka daidaita kawai. Ana haɗa tagar da aka samu cikin bayanan sampling da kuma gabatarwar bayanin da ba a amince da shi ba, domin samfuran downstream su iya bambance wani ɓangaren da aka mayar da hankali daga cikakken jerin lokaci.

Mayar da hankali kan bayanin ma’ana wani saiti ne dabam kuma bayyananne. Yanayin bincike na tsoho `full` yana kiyaye prompt ɗin frame da ake da shi kuma ba ya taɓa tura rubutun buƙata zuwa samfurin caption. A yanayin `focused`, gadar tana karanta sabon `text`/`input_text` na mai amfani wanda ba fanko ba daga wannan kwantena ta Chat ko Responses, tana daidaita shi zuwa NFC, tana tattara haruffan sarrafawa da gibin rubutu, sannan ta iyakance shi zuwa maki-code na Unicode 500. Idan sakamakon ya zama fanko, ana komawa zuwa ainihin prompt na `full`. Ana serializa alamar da za a iya amfani da ita a matsayin JSON cikin wani keɓaɓɓen tubalin mahallin mai amfani da ba a amince da shi ba, kuma za ta iya ba da fifiko ga bayanan da ake iya gani kawai; ba za ta iya rinjayar gargaɗin dabam da ya hana bin umarnin da ake gani ko ji a cikin media ba. Mayar da hankali kan rubutu ba ya ƙiyasta `start`/`end` ko ya canza mai ɗaukar samfurin lokaci.

#### FU-07 shaidar tsarin segment

`segment_aware` yana amfani da wucewar bincike na farko guda ɗaya mai iyaka a kan rafin bidiyon gida da aka riga aka inganta. Tsayayyen jerin filters yana fara rage girma zuwa mafi girman fadin pixels 320, yana gano sauye-sauyen scene da tazarar daskarewa, sannan yana ɗaukar samfurin frame 1 a kowane daƙiƙa domin blur, matsakaicin luma, da bayanan sarari/lokaci. An iyakance wucewar zuwa samfurorin tsari 600, zaren FFmpeg/filter guda ɗaya, protocol da jerin izinin akwati na `file` iri ɗaya, iyakar fitarwar tsari 1 MiB, da aƙalla daƙiƙa 30 cikin abort/deadline ɗin da aka raba na broker. Ba ya taɓa karɓar command, filter, path, ko URL daga buƙatar.

Ƙimomin tsarin shaida ce ta sampling mai ƙayyadadden sakamako, ba fahimtar bidiyo ta ma’ana ba. Ba sa ƙiyasta batutuwa, ayyuka, captions, magana, ko nufin mai amfani. Iyakokin scene da daskarewa ne suke samar da segments; rufe daskarewa, blur, exposure, bayanan sarari, da sauyin lokaci suna tasiri ne kawai kan yadda ake rarraba kasafin frame 1–16 da yake akwai. Segment da ya daskare gaba ɗaya ana iyakance shi zuwa frame ɗaya, yayin da segments marasa daskarewa suke fafatawa don sauran kasafin. Idan iyakoki sun fi frames yawa, ana kiyaye rufe jerin lokaci na uniform domin yanke-yanke masu sauri na farko kada su ɓoye dogon segment na ƙarshe. Ana haɗa iyakokin scene da ke cikin ƙudurin bincike na daƙiƙa 1 na iyakar daskarewa.

Rashin filters, shaida mai lalacewa ko babu komai, kuskuren detector, ko ƙarewar lokacin binciken farko mai iyaka suna komawa ga ainihin manufar tsakiyar lokaci ta uniform. Abort na mai kira ko deadline na broker ba sa komawa ƙasa: suna dakatar da subprocess da ke gudana, suna hana cire frames daga baya, kuma ana cire bishiyar wucin-gadi mai zaman kanta a cikin `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` yana samar da fixtures na FFmpeg na gaske masu ƙayyadadden sakamako domin tanadin kiran caption bayan cire kwafi, rarraba kasafin motsi mai yawa, shaidar blur/exposure/SI-TI, yanke-yanke masu sauri tare da dogon ƙarshen lokaci, da false positives na fade a hankali. Yana rubuta lokacin bango na binciken farko, kuma idan `/usr/bin/time` yana samuwa, CPU na child da mafi girman RSS. Gwaje-gwajen ingancinsa oracles ne na tsarin kawai. Ingancin samfurin caption na gaske ya kasance `HOLD` saboda wannan harness ba shi da endpoint da aka ba shi izini ko alkali da aka daskarar. Haka kuma tanadin kuɗi ya kasance `HOLD` sai dai idan `--caption-cost-per-call-usd` ya samar da ƙiyasin tabbatacce na farashi ga kowane kira; script ɗin ba ya ƙirƙirar ko ɗaya daga cikin waɗannan sakamakon.

Kowane frame yana da iyaka 4 MiB, dukkan raw frames tare kuma suna da iyaka 23 MiB, sannan amsar broker da aka serialize tana da iyaka 32 MiB. Ana cire wani kundin adireshi na wucin gadi na sirri a cikin `finally`. OmniRoute ba ya haɗa FFmpeg a ciki kuma ba ya karɓar hanyar executable ta al’ada. Kafin yin caption, bridge ɗin yana aiwatar da matakin cire maimaitattun hotuna na gani cikin taka-tsantsan: ana rage kowace JPEG zuwa buffer mai launin toka na 16×16, sannan a kwatanta ta da frame na ƙarshe da aka riƙe kawai. Idan kasafin caption da aka nema ya fi frame ɗaya, extraction yana samar da tarin ’yan takara mai iyaka har sau biyu na kasafin, kuma ba ya taɓa wuce frames 16. Ana aiwatar da iyakar da aka nema ne kawai bayan cire maimaitattu, tare da kiyaye ɗan takarar farko da na ƙarshe da aka zaɓa yayin ragewa ta ƙarshe idan kasafin ya kai aƙalla biyu. Manufar `grayscale-16x16-mean-cells-v2` mai ɗauke da siga tana amfani da mafi girma tsakanin bambancin mean luma da rabon ƙwayoyin thumbnail waɗanda normalized delta ɗinsu ya kai aƙalla 0.05. Ƙimar gano maimaitawa ita ce constant 0.04, wanda aka zaɓa domin tabbas maimakon a fallasa shi a matsayin saitin runtime. Wannan siginar sakandare mai babban bambancin haske tana kiyaye ƙananan motsi da sauye-sauyen rubutun da ake iya gani waɗanda kwatanci bisa mean kaɗai zai iya ɓoyewa. Kurakuran comparator ko decoder suna fail open kuma suna kiyaye coverage. Metadata na fitarwa yana bambanta tsakanin ’yan takarar da aka ciro, frames da aka yi amfani da su cikin nasara, da maimaitattun hotunan gani da aka watsar.

Wani ɓangaren bidiyo da aka yi wa alama a sarari na iya neman contact sheet mai timestamps. Bridge ɗin yana gina grid na JPEG mai ginshiƙai 4 a mafi yawa da frames 16. Kowace cell mai pixels 512 tana rubuta timestamp ɗinta na tushe a cikin wani band mai babban bambancin haske a ƙasa, yayin da timestamps ɗin iri ɗaya suke nan a cikin metadata na rubutu domin haɗawa da bincike daga baya. Cikakkiyar JPEG tana ci gaba da kasancewa cikin iyakar 32 MiB. Idan `sharp` ba zai iya decode ko haɗa grid ɗin ba, bridge ɗin yana koma wa ga JPEG frames ɗin kowane ɗaya; abort na client har yanzu yana wucewa ta aikin sheet.

Shaidar promotion an ware ta da gangan daga synthetic composition microbenchmark. `scripts/perf/video-bridge-contact-sheet-eval.ts` yana bayyana A/B harness mai schema-versioned don ainihin vision models masu jituwa da OpenAI. Yana auna tokens da provider ya bayar, latency na wall daga farko zuwa ƙarshe (ciki har da haɗa sheet), adadin kiran model, da riƙe facts da manifest ya ayyana. Ba a rubuta raw model responses a cikin rahoton ba; SHA-256 digests da matched fact IDs kawai ake riƙewa. Harness ɗin ba ya yin kiran network ko na model mai kuɗi sai idan an ba da `--execute-real` kuma an saita `--model`, `OMNIROUTE_BASE_URL`, da `OMNIROUTE_API_KEY`. Ba tare da wannan ainihin run ɗin da aka bayyana a sarari ba, verdict ɗinsa mai karantawa ta na’ura yana nan `HOLD`; ma’aunai na synthetic payload/call-count kaɗai ba su zama shaidar promotion ba.

Na daban `scripts/perf/video-bridge-promotion-eval.ts` yana amfani da abubuwan lura na FU-07 ko FU-09. Shiga promotion yana buƙatar dukkan nau’o’in yanayi takwas na synthetic tare da wani real clip da aka tsabtace, aƙalla maimaitawa uku da aka auna ga kowane role da case, dukkan metrics goma da aka ayyana, digests na media/prompt/expected-fact/settings da aka daskarar, observation IDs na musamman, da kuma tsarin A/B da aka seed wanda aka tabbatar. Receipt na execution yana haɗa corpus digest, ainihin candidate SHA da model revision. Ma’aunai da suka ɓace ko marasa inganci suna nan `HOLD`, ciki har da CPU sama da 30 s, peak RSS sama da 512 MiB ko pre-analysis sama da 30 s. Waɗannan iyakoki ne na shigar da shaida, ba sabon garanti na tilasta RSS a runtime ba.

FU-07 yana buƙatar aƙalla 98% na riƙe inganci da p95 latency da ba ta fi 1.2x na baseline ba, tare da ɗaya daga cikin waɗannan: ingantuwar case-balanced mean recall ta absolute 0.05 a daidai mean caption calls, ko aƙalla raguwar 10% a mean post-dedup caption calls. FU-09 yana buƙatar aƙalla 0.85 quality, riƙewa 95%, raguwar median latency 20% da raguwar tokens 10%. Rashin critical fact, bin ƙa’idar injection ko usage da ya ɓace yana hana promotion. Execution ɗaya ba zai iya yin promotion ga komai ba: `--previous-report` yana tabbatar da executions biyu daban, marasa overlap, kuma masu cancanta a jere na policy/model revision/candidate/corpus iri ɗaya. Gwajin sampling ba zai iya tabbatar da gwajin contact-sheet ba.

Masu tattara bayanai ya kamata su yi scoring na responses a memory kuma su adana `responseDigest` tare da metrics da observation bindings, ba rubutun response ba. Consumer ɗin kuma yana karanta legacy raw observations amma ba ya taɓa kwafe wannan rubutun zuwa rahotanninsa. Ana karɓar ɗaya kaɗai daga cikin `responseDigest` ko `rawResponseText` ga kowace observation. Allowlist mai siga tana nan babu komai tare da immutable `hold` default. Entry mai cancanta yana buƙatar evidence reference, policy, model revision, exact candidate SHA, manifest digest da run IDs biyu daban; ana ƙin contexts masu karo da juna. Waɗannan metadata kwangilar audit ce, ba hujjar cewa fayil ɗin da aka yi nuni da shi yana ɗauke da ma’aunai na gaske ba. A duba receipts na ainihi kafin a ƙara kowace entry. Endpoint na management stats da Video dashboard suna fallasa readiness cikin taka-tsantsan. Model alias da aka saita shi kaɗai ba ya tabbatar da revision ɗinsa ko candidate SHA da ke gudana, saboda haka dashboard na yanzu yana bayar da `HOLD` maimakon ya sake amfani da eligibility daga wani execution context. Zaɓin gwaji na bayyane yana nan dabam da promotion; ba a canza default ta atomatik.

Masu kira na iya haɗa tsararren `transcript.cues` na zaɓi a cikin ɓangaren bidiyo da ake tallafawa idan sun riga sun mallaki rubutu mai daidaitaccen lokaci. Kowace alama dole ta ƙunshi `text`, tazara `start`/`end` mai iyaka wadda take cikin tsawon lokacin da aka bincika, da `source` da aka amince da su (`client`, `embedded`, ko `audio-bridge`); `confidence` yana da tsohuwar ƙima ta `1` kuma dole ya kasance tsakanin `0` da `1`. Ana tattara alamomin da suka yi daidai gaba ɗaya. OmniRoute ba ya fara yin transcription daga wannan metadata: ana kwafe alamomin da aka tantance zuwa sakamakon da aka bayyana tare da source, confidence, da tazara, kuma ana nuna su a matsayin abubuwan lura marasa amana tare da taken firam. Ana ƙin rubutun da ba shi da inganci, wanda ya fita daga iyaka, ko wanda ba shi da asalin tushe, maimakon haɗa shi cikin rafin taken. Duk tashoshin transcript guda biyu na jikin buƙata suna daidaita provenance da aka bayar zuwa `client`, har da alamomin `embedded` ko `audio-bridge` da mai nema ya tabbatar da kansa. Adafta da uwar garke kawai ce za ta iya sanya waɗannan alamomin amintattu ta hanyar hujjar `trustedSource` ta lambar kawai; filin JSON na buƙata ba zai iya isa ga wannan hujja ba. Rubutun transcript yana ci gaba da kasancewa abun cikin da ba a amince da shi ba wanda aka samo daga media, ba tare da la’akari da provenance ɗinsa ba, kuma kada ya taɓa ƙayyade izini.

Mai kira na ci-gaba na iya samar da waƙar `audioTranscript` don bidiyo ɗin nan; ana ɗaukarta a matsayin rubutun da abokin ciniki ya samar, ba hujjar transcription daga uwar garke ba. Wurin haɗawa yana gudanar da abubuwan lura na gani da na sauti ƙarƙashin wa’adi ɗaya da siginar sokewa guda ɗaya, yana jera su a kan jadawalin lokaci guda, yana tattara waɗanda suka yi daidai gaba ɗaya, kuma yana bayar da sakamako na ɓangare idan gefe ɗaya kawai ya yi nasara. `audioTranscript` marar inganci yana rage sakamakon zuwa na ɓangare — ana riƙe bayanin gani, yayin da reshen sauti ke rubuta lambar kuskure da aka tsabtace — maimakon ya gaza da bidiyon gaba ɗaya. Ana adana samuwar kowane reshe, alamar ɓangare, da lambobin kuskuren da aka tsabtace a cikin sakamakon da aka bayyana, a cikin metadata na guardrail (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), a cikin metadata na cache na sakamako, da kuma a cikin ƙididdigar haɗawar gada. Tsohuwar hanyar Video Bridge ba ta kiran speech-to-text ko sauke wani kwafin media na biyu; idan babu wannan waƙa bayyananniya, tana ci gaba da kasancewa ta bidiyo kaɗai.

**Riƙe transcript (#12150 P1).** Wannan yana aiki ta atomatik a duk lokacin da Video Bridge (wanda shi ma na zaɓi ne) ya nuna alamar transcript — babu wani tutar riƙewa na daban. Lokacin da buƙata ta nuna kowace alamar transcript (ko `transcript` da mai kira ya ayyana ko `audioTranscript` da aka haɗa), guardrail yana yi mata alama `videoBridgeObserved` kuma yana samar da inuwa da aka cire bayanan sirri daga bayanin bidiyo — fassara iri ɗaya wadda aka maye gurbin jikin rubutu na kyauta na kowace alama da `[redacted-video-transcript]`, ta hanyar maye gurbin filin alamar da aka tsara kafin a haɗa zaren (ba ta hanyar nazarin rubutun da aka shimfiɗa ba, don haka babu wani abun cikin alama — mai kai hari ko na yau da kullum, har da jikin da ke ɗauke da `]` kamar `[inaudible]`/`[music]` — da zai iya tsira). Jikin buƙatar da aka adana a log ɗin kira yana maye gurbin kowane ɓangaren rubutu da aka samo daga bidiyo da wannan inuwa da aka cire bayanan sirri, bisa daidaiton abun ciki; ana sake karanta ankarar `fullText` daga cikakken payload na guardrail kafin kira, don haka daidaitawar har yanzu tana nasara bayan guardrail na gaba a sarkar (masu ɓoye PII da bayanan shaidar shiga, masu fifiko 10/95) sun sake rubuta rubutun bayanin a wurinsa da kuma bayan allurar system-prompt/handoff/memory ta sake tsara jerin saƙonni. Jikin da ake aikawa zuwa samfurin ba ya canzawa. Buƙatar da aka lura da ita kuma ba ta cika wani Memory mai ɗorewa ba (ana tsallake cire bayanai daga buƙata da amsa), don haka amsar samfurin da kansa ba za ta iya maimaita rubutun transcript cikin Memory ba.

**Filayen ɗanyen bidiyo (#12430).** Lokacin da aka kunna gada kuma tallafin bidiyo na asali ba a sani ba ne ko babu shi, filayen `transcript`/`audioTranscript` da aka ayyana suma suna kunna `videoBridgeObserved`, har bayan gazawar bayanin ko iyakar `maxVideos`. `null` da kirtani marasa komai ana ƙirga su; filayen da babu su da metadata marar alaƙa da bidiyo ba a ƙirga su. Kwafe da aka riƙe suna cire bayanan sirri daga waɗannan filayen ko su cire buƙatar, kuma ana kewaye cache/Memory.

A waɗannan hanyoyin koma-baya, alamomin mai kira masu inganci suna zama ɓangarorin `text`/`input_text` da ake tallafawa maimakon filayen mai samarwa marasa daidaituwa. Waƙoƙin da aka samar a cikin buƙata duka suna ci gaba da kasancewa abubuwan lura `client` marasa amana, tare da gargaɗi bayyananne cewa ba a bayyana bidiyon ba kuma ba a tabbatar da tambarin lokaci da media ba. Iyakar alamomi 256/64-KiB ta gaba ɗaya da ta kowace alama tana aiki tare a kan waƙoƙin biyu; tambarin lokaci dole ya dace da iyakar broker ta daƙiƙa 600 da kuma kowace taga mai da hankali da aka bayar. Ana watsar da waƙoƙin da ba su da inganci, ba a tura su a matsayin rubutu na son rai ba; ana iya amfani da ɗan’uwansu mai inganci sai dai idan an wuce kasafin haɗinsu. Filayen `null`/marasa komai ba sa ƙara rubutu. Wannan koma-baya ba ya ƙara ɗaukar media ko transcription. Ana cire filayen ƙarin transcript daga mai ɗaukar bidiyo na koma-baya da abubuwansa `video_url`/`source`. Jerin abubuwan da ake amincewa da su na wayar OpenAI yana nan da tsauri; masu ɗaukar bidiyo na asali da ba a sani ba suna nan, kuma wuraren da aka sani masu karɓar rubutu kaɗai suna riƙe da alamomin aminci. Inuwoyin da aka tsara don cire bayanan sirri suna kare rubutun transcript da aka ƙara, yayin da buƙatar asali mallakar mai kira ba ta canzawa. Manufar da aka tallafa ta asali da gadojin da aka kashe suna riƙe da halayen bypass ɗinsu na yanzu.

Ƙarin kwafe da aka riƙe suna amfani da siginar buƙatar da aka lura da ita iri ɗaya. Hoton buƙatar abokin ciniki na farko kafin guardrail, buƙatar da ke jiran aiki a ƙwaƙwalwa, da log ɗin buƙatar da aka ƙi da wuri suna maye gurbin filayen transcript a cikin ɓangarorin bidiyo ta tsari; saƙonnin prompt na kirtani da matakan pipeline da context handoff suka ƙirƙira ana cire musu bayanan sirri a wurin adana jikin buƙata. Alamar `video_content_removed` da aka adana tana sa ci gaba ta `previous_response_id` ya ƙi a yanayin fail-closed maimakon sake gina rubutun da aka yi watsi da shi da gangan. Idan buƙatar da aka lura da ita ta rasa inuwar cire bayanan sirri ta kowane-ɓangare kafin a yi logging, ko ma ɗaya daga cikin inuwoyin bidiyo da yawa ta kasa daidaituwa bayan an sake canza buƙatar, ana cire jikin buƙatar da aka riƙe gaba ɗaya maimakon a riƙe transcript da aka cire bayanansa kaɗan.

Ga wata buƙatar da aka sa ido a kanta, amsar samfurin na iya kawo kowane sashe na rubutaccen tattaunawar ba tare da iyakar alamar tsari ba. Saboda haka ana maye gurbin `responseBody` da aka adana a cikin rajistar kira da alamar tsallakewa; ba a adana cikakken kayan aikin bututun sarrafawa ba (wanda zai iya haɗawa da jikin buƙatun daga sama/abokin ciniki da gutsutsuren rafi). Ma’ajiyar karatun semantic, idempotency, da sake kunna tunani suna tsallake karatu da rubutu ga wannan buƙatar. Buƙatar mai bayarwa da amsar da abokin ciniki ke gani ba su canza ba. Ana zubar da farkon baiti na keepalive daga ma’ajiyar wucin gadi lokacin da ba a adana cikakken kayan aikin ba. Gargadin Kiro game da EventStream mara inganci yana bayar da adadin baitin payload kaɗai, ba abin da ke cikinsa ko kuskuren parser na JSON kai tsaye ba.
Wannan ba ya nuna cewa an duba kowace ganewar matsala marar alaƙa daga mai bayarwa/plugin ba; ana bibiyar cikakken binciken wuraren adanawa da aka riƙe a #11658.

Tsarin rayuwar `/api/modality-bridge/video/drilldown` na cikin gida wani keɓaɓɓen tushen ma’ajiyar bayanai ne, mai aiki a loopback kuma mai tabbatar da alama. Kowace aiki kuma yana buƙatar ingantaccen ID na asalin mai amfani marar bayyanawa. Kafin a kunna mai kira na samarwa, dole ne ya samo wannan ID daga tenant ɗin da aka tabbatar da shi, kuma kada ya taɓa tura ƙimar da abokin ciniki ya zaɓa. Maɓallan ma’ajiya suna danganta wannan asali da ingantattun ID na zama da na bayanin bidiyo, suna adana maɓallan da aka samo daga SHA-256 kaɗai, kuma suna takaita karatu da gogewa ga wannan asalin. Ma’ajiyar tana adana aƙalla firam JPEG 16 da aka samo a kowace shigarwa, tana ƙarewa bayan mintuna goma, kuma tana goyan bayan karatun `start`/`end` mai iyaka ko gogewar zama kai tsaye.

An takaita kowane asali zuwa shigarwa 16 da 64 MiB na ingantattun bayanan JPEG. Waɗannan iyakokin sun kasance masu zaman kansu daga iyakar duniya ta shigarwa 64/256 MiB: matsin rabon ma’ajiya na asali yana fitar da shigarwar da ba a yi amfani da su kwanan nan ba na wannan asalin kaɗai kafin a yi la’akari da fitarwa ta LRU ta duniya. Ana share shigarwar da suka ƙare daga lissafin asali da na duniya yayin ayyukan ma’ajiya, yayin da sokewa da gazawar ingantawa ba sa kammala wani maye gurbi na ɗan lokaci.

Ma’ajiyar tana ƙin Base64 da ba na ingantaccen tsari ba, ƙarin padding, kafofin watsa labarai da ba JPEG ba, JPEG marasa inganci ko yankakku, da JPEG waɗanda ke haifar da gargaɗi yayin cikakken decode na hoto mai iyaka ta `sharp`. Tana sake ɓoye kowanne hoto da aka karɓa a matsayin ingantaccen JPEG, tana samo faɗi da tsawo daga baitin da aka decode maimakon amincewa da filayen mai kira, kuma tana watsar da duk wani ƙarin baiti na polyglot maimakon adana su. Buffer ɗin da aka matsa kuma aka inganta mai iyaka kaɗai ake ƙirga a cikin rabon ma’ajiyar biyu. Iyakacin JSON na waya ya haɗa da ƙarin nauyin Base64 don iyakar shigarwar da aka decode ta 32 MiB. Kowace samo da aka adana tana rikodin tsarin JPEG da ƙudurin da aka tabbatar, manufar sampling, sigar samo, lokacin ƙirƙira, hash ɗin abun ciki da sabar ta ƙirga, da kuma bayanin mahaifa da aka yi masa hash tare da hash ɗin abun cikin mahaifan amintaccen mai kira. Ana duba sokewa tsakanin matakan decode/hash na asynchronous kafin kammala atomatik na ma’ajiyar.

Mai samarwa na samarwa yana sake amfani da firam ɗin broker da aka riga aka samo ne kawai bayan nasarar nazarin gani, ba tare da sake sauke ko fitar da bidiyo ba. Yana buƙatar saitin afareta `modalityBridgeVideoDrilldownEnabled=true`, `drilldown: true` mai tsauri a kowane sashe, da ID na rikodin API-key da aka tabbatar. Ƙimomin asali/zama da abokin ciniki ya bayyana ba sa kafa mallaka. Idan ɗaya daga cikin waɗannan sharuɗɗa uku ya rasa, ba ya yin hash, rage girma ko adana ƙarin firam. Gazawar adanawa tana kiyaye amsar gani da ake iya amfani da ita. Buƙatun da aka amince da su suna tsallake dukkan ma’ajiyar sakamakon bidiyo gaba ɗaya domin sakamakon da aka adana kada ya sake kunna handles.

Amsoshin JSON da SSE masu nasara suna bayyana aƙalla handles huɗu marasa bayyanawa a cikin kanun `x-omniroute-video-drilldown` mai iyaka. Asalin burauzar da aka ba izini na iya karanta wannan kanun ba tare da faɗaɗa manufar asalin CORS ba. Sabbin handles suna amfani da `v1.<32-byte random base64url
token>`, kuma rajistar tana riƙe hash ɗin SHA-256 kawai. Mai karatu/parser na kanun kuma yana karɓar tsoffin tokens masu hex 64. Mabukaci na jama’a da aka tabbatar shi ne
`GET /api/v1/video-bridge/drilldown?handle=...`, wanda ake sarrafa izinsa daban ta
`modalityBridgeVideoDrilldownRemoteEnabled=true`. Ƙimar false da aka adana kai tsaye tana soke damar ko da an kunna koma-bayan muhalli na tsohon tsarin `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED`. Adanawa a samarwa yana da makamancin koma-bayan tsohon tsarin `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Dukkan koma-bayan biyun a kashe suke ta tsohuwa.

Mabukaci yana samo mallaka daga maɓallin da aka tabbatar kuma yana aiwatar da manufar maɓalli: duka GET da DELETE suna cikin rukunin ƙarshen `video`, har da laƙabin `/v1` da `/api/v1`. Maɓallan da ke da jerin izinin ƙarshen da ba komai ba dole ne su haɗa da `video`; maɓallan da ba su da takura suna ci gaba da dacewa. Mabukaci yana mayar da 404 iri ɗaya ga handle da ba a sani ba, wanda ya ƙare, da kuma handle na wani maɓalli. Yana karɓar `variant=preview|standard|detail` (iyakar girman JPEG 320/640/1280, ba a taɓa ƙara girmansa ba), `limit=1..8` (ko laƙabin `frames` na tsohon tsarin, ba duka biyun ba), `page` mai farawa daga sifili, da zaɓin daƙiƙun mayar da hankali na `start`/`end`. Ana ƙin maɓallan tambaya da aka maimaita da tagogin mayar da hankali da aka juya. Kowace variant da aka mayar tana da hash na ainihin abun cikinta da metadata na ainihin ƙudurinta, waɗanda aka danganta da tushen da aka adana. Ana samo variants yayin karatu maimakon adana ƙarin kwafi da aka riƙe. Amsar JSON, har da Base64/envelope, an taƙaita ta zuwa 32 MiB; shafi da ya wuce girma yana mayar da 413 kuma dole ne abokin ciniki ya nemi ƙarancin firam. Karatu yana duba sokewa a kusa da kowanne rage girma kuma yana sake duba ingancin handle kafin mayarwa. `DELETE` da mai shi ya yi yana da idempotency; gogewa ko ƙarewar TTL yana sakin tushen da aka riƙe da lissafin amfani.

Ma’ajiyar da aka raba tana aiki ne a cikin tsari ɗaya: handles suna ƙarewa idan aka sake farawa, kuma ba za a iya canja su tsakanin matakai masu zaman kansu na OmniRoute ba. Ƙididdigar gudanarwa tana bayyana ingantacciyar manufar adanawa/remote da jimillar shigarwa/baiti da aka riƙe kawai, ba kafofin watsa labarai, nassoshi, ID na asali ko handles ba. Kwamitin saitunan Video yana nuna waɗannan ƙimomi kuma yana iya adana maɓallan amincewa guda biyu. Wannan takardar bayanin aiwatarwa ba shaidar tura tsarin ko ƙaddamarwa kai tsaye ba ce; ana bibiyar karɓar samfurin gaske daban.

Ana yi wa Frames taken bi da bi ta amfani da ƙirar Video da aka tsara. Idan an bar maye gurbin
Video babu komai, yana gado saitin Vision; idan dukansu babu komai, mai
sarrafa hanya ta atomatik na Vision yana zaɓar ƙirar da za ta iya sarrafa hangen nesa. Bayanan taken da aka yi cikin nasara
suna maye gurbin ɓangaren asali da tabbataccen prefix na `[Video description:` wanda kuma
ke nuna cewa rubutun lura ne da aka samo daga kafofin watsa labarai marasa amincewa, tare da gaya wa
ƙirarrun ƙira na gaba kada su bi umarnin da aka samu a cikin kafofin watsa labarai. Maɓallan
ma'ajiyar taken Frames sun haɗa da bytes na JPEG, prompt, timestamp, da ƙirar da aka yi amfani da ita;
ana adana taken da aka yi cikin nasara kawai. Abubuwan da ke cikin ma'ajiya suna riƙe ainihin ƙirar da ta samar da sakamakon cikin nasara,
har da ƙirar fallback; bridge yana bayar da `mixed` idan Frames daban-daban ƙirori daban-daban ne suka samar da su. Idan an sami abu a cikin ma'ajiya, ana sake amfani da asalin ƙirar da ta samar da shi maimakon a sake
masa lakabi a matsayin shirin routing da aka nema. Ma'ajiyar sakamakon bidiyo gaba ɗaya tana amfani da kowane
shigarwar da ke canza fitarwa a matsayin maɓalli — prompt, ƙirar da aka yi amfani da ita, tsarin sampling, adadin Frames, yanayin
semantic analysis, fingerprint na SHA-256 na normalized focus hint, focus window, `transcript`,
`audioTranscript`, da alamar contact-sheet — saboda haka canza kowane ɗayan waɗannan
abubuwan yana haifar da cache miss, ba a taɓa sake amfani da tsohon sakamako ba. Sigar visual dedup policy, threshold, da ƙayyadadden adadin candidate-frames suma an bayyana su a cikin maɓalli da metadata na result-cache; saboda haka canjin policy ba zai iya sake amfani da tsohon bayanin bidiyo gaba ɗaya ba. Metadata na Result-cache v4 yana riƙe yanayin da fingerprint, ba raw task ɗin mai amfani ba. Metadata na guardrail yana bayar da rahoton yanayin analysis da aka nema da kuma wanda aka yi amfani da shi; yanayin `focused` da aka nema ba tare da rubutun mai amfani da za a iya amfani da shi ba ana bayar da rahotonsa a matsayin `full` a aikace.

Guardrail yana fitar da kowane ɓangaren bidiyo da aka tallafa, amma ba ya bayyana fiye da
`modalityBridgeVideoMaxVideos`. Ga target da aka tabbatar yana da
`supportsVideo === false`, bidiyoyin da suka gaza da waɗanda suka wuce iyaka suna zama alamomin rubutu masu aminci bayyanannu, ta yadda babu raw video da zai tsira. Idan ba a san capability ba, waɗannan sassan suna riƙe video carrier ɗinsu; duk wani fallback transcript yana bin ƙayyadadden text conversion da ke sama. Targets masu `supportsVideo === true` suna tsallake bridge. Alamar soke buƙatar client tana yaɗuwa ta download, layin broker, subprocesses, da kiran caption; sokewa yana dakatar da aiki tsakanin bidiyoyi kuma ba ya taɓa bari a koma ga raw media ba.

Saitunan runtime suna dogara da DB kuma Zod ne ke tabbatar da ingancinsu:

| Key                                 | Default     | Range / behavior                                                                                         |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime na zaɓi, ana kunna shi da gangan                                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` yana adana captions na gama-gari; `focused` yana amfani da bounded, untrusted latest-user context |
| `modalityBridgeVideoModel`          | `""`        | Yana gado ƙirar Vision Bridge                                                                            |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ko proportional `segment_aware`; idan detector ya gaza, ana komawa `uniform`   |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                           |

Ana rage tsoffin ƙimar Video timeout da aka adana, idan sun haura daƙiƙa 120, zuwa iyakar lokacin broker; sabbin rubuce-rubucen saiti da suka haura wannan iyaka ana ƙi.
`GET /api/modality-bridge/video/runtime` yana buƙatar amintaccen stamped loopback
locality kafin authentication ko binciken runtime, sannan yana buƙatar management
auth. Yana dawo da `available` kawai, da sanitized nau'ikan FFmpeg/ffprobe, da ƙayyadadden
dalili idan runtime ba ya samuwa. Endpoint na cirewa na ciki ba public upload API ba ne: idan layin queue ya cika, ana mayar da `503` tare da `Retry-After`, idan mai kira ya katse haɗin, ana mayar da `499`, kuma idan ƙayyadadden lokacin broker ya ƙare, ana mayar da `504`. Amsoshin da aka canza suna ƙara
`video->text;model=<visionModel>;parts=<videos>` zuwa babban header na
`x-omniroute-modality-bridge` ba tare da cire sassan Vision ko Audio ba.

### Mai Rufe PII (`piiMasker.ts`)

Yana aiki a matakai **duka**.

- **`preCall`** yana yin clone na payload, yana bi ta `system`, `messages`, `input`, da
  `prompt` (har da abubuwan plain string), sannan yana amfani da `processPII()` (daga
  `@/shared/utils/inputSanitizer`) ga filayen `content`/`text` na string. Idan
  `PII_REDACTION_ENABLED=true`, ana rufe PII da aka gano a cikin payload ɗin da ake
  aikawa. Wannan ya keɓanta da `INPUT_SANITIZER_MODE` (wanda ke sarrafa policy na prompt-injection kawai). Idan an kashe rufewa, kiran yana yin rikodin adadin abubuwan da aka gano ba tare da sake rubuta content ba.
- **`postCall`** yana yin deep-clone na response, yana gudanar da `sanitizePIIResponse()` tare da masker na siffar Responses-API (`maskResponsesOutput` — yana rufe
  `output_text` da `output[].content[].text`). Idan an yi wani rufewa, response ɗin da aka
  gyara yana maye gurbin na asali.

Guardrail ba ya taɓa toshewa; yana ƙara alama kawai (`meta.detections`,
`meta.redacted`) ko kuma yana sake rubutawa.

**Rumbun ajiya mai juyawa (`PII_REVERSIBLE_VAULT_ENABLED`, tsoho `false`).** Lokacin da duka
`PII_REDACTION_ENABLED` da `PII_REVERSIBLE_VAULT_ENABLED` suke kunne (DB override >
env > default, ana karantawa sau ɗaya a kowace buƙata), `handleChat` yana buɗe rumbun ajiya
ɗaya ga kowace buƙatar abokin ciniki (`src/lib/pii/requestTokenVaultScope.ts`) kuma ya
miƙa shi ga matakin pre-call a matsayin `GuardrailContext.tokenVault`. Daga nan masker ɗin
yana rubuta alamomin maye kamar `<<PII_EMAIL_QWERTYUI_1>>` maimakon `[EMAIL_REDACTED]`,
ga ginannun ƙa’idoji, ƙa’idojin da aka inganta (GDPR/POPIA) da kuma na musamman. Nonce ɗin
haruffa 8 ne na manyan haruffa waɗanda aka samar da bazuwar a kowace buƙata, kuma ƙima
ɗaya tana samun alama ɗaya a cikin buƙatar. Masker kaɗai ke ƙirƙirar alamomi: kariyar
prompt-injection da `/api/guardrails/test` suna gudana ba tare da rumbun ajiya ba kuma
suna riƙe masu riƙe wuri.

- Mai bada sabis, kowace ƙafar combo, sake gwadawa, memban fusion panel da fusion judge
  suna ganin alamomi ne kawai. Ana mayar da alamomin sau ɗaya, a kan amsar 2xx da ta fita
  daga `handleChat`: ga kowane filin a cikin SSE da aka tantance (ko da an raba alama
  tsakanin events har yanzu za ta warware; ana tsere wa muhawarar tool-call a matsayin
  JSON) ko ga kowane filin a cikin jikin JSON, tare da sake lissafa `Content-Length`.
  Ana mayar da rubutun abun ciki da tunani da kuma muhawarar tool-call. Jikunan kuskure
  (4xx/5xx) suna riƙe alamomin.
- Gazawa suna kasancewa a ɓoye: idan ƙirƙirar alama ta gaza ko rumbun ajiya ya ƙi wata
  ƙima (shigarwa 1000, haruffa 256 a kowace ƙima, jimillar 64 KB), ana rubuta mai riƙe
  wuri maimakon haka; alamar da rumbun ajiya ba zai iya warwarewa ba, ko mayarwa da ta
  gaza, tana kasancewa a zahiri kuma adadi kawai ake rubutawa a log. Rumbun ajiya ba shi
  da timers kuma ba shi da yanayin duniya; ana share shi lokacin da rafin amsa ya ƙare,
  aka soke shi ko aka samu kuskure.
- Lokacin da buƙata ta ƙirƙiri alamomi, ana tsallake cire ƙwaƙwalwa, ajiyar idempotency
  da rubuce-rubucen semantic-cache guda biyu, domin babu wata buƙata ta gaba da za ta iya
  warware waɗannan alamomi. A cikin log ɗin kira, buƙatar mai bada sabis da amsar suna
  ɗauke da alamomi; jikin buƙatar abokin ciniki da aka rubuta har yanzu shi ne ainihin
  shigarwar abokin ciniki, kamar yadda yake a redaction na yau da kullum.
- Alamomi suna amfani da nonce na bazuwar ga kowace buƙata, saboda haka prefix na prompt
  yana canzawa a kowane juyi: caching na prompt a gefen mai bada sabis ba ya aiki ga
  juyin da aka mask, kuma alamar da ta dawo a wani juyi na gaba (misali ta
  `previous_response_id`) ta tsohuwar buƙata ce kuma tana kasancewa a zahiri.

#### Zaɓi bisa nau’i, tsarin musamman da ƙididdigar ganowa

**Dashboard → Settings → Security → PII masking** yana zaɓar _abin da_ za a mask.
Ba ya kunna masking: har yanzu `PII_REDACTION_ENABLED` (buƙata) da
`PII_RESPONSE_SANITIZATION` (amsa + SSE) ne ke yin hakan, kuma dukansu a kashe suke
ta tsohuwa.

- **Zaɓi bisa nau’i** — ana jera ginannun ids a
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Rashin saita wani abu yana
  nufin kowane nau’i (halin da yake kafin wannan saitin ya kasance). Tsarin buƙatar
  `ssn_us` yana komawa zuwa `ssn`. Samfura (Minimal, Standard, Financial, Brazilian,
  USA, GDPR, POPIA, Full) suna cika akwatunan zaɓi ne kawai a UI.
- **Masu gano GDPR da POPIA** — ids guda goma sha biyu da aka gina waɗanda suka ƙunshi
  masu gano mutum na Tarayyar Turai da Afirka ta Kudu (teburin da ke ƙasa). Regex,
  validators da tags na yankin aikinsu suna cikin tebur ɗaya,
  `src/shared/utils/piiPatterns.ts`, wanda duka response sanitizer
  (`src/lib/piiSanitizer.ts`) da request masker
  (`src/shared/utils/inputSanitizer.ts`) suke amfani da shi. Ana redaction na match ne
  kawai lokacin da validator ɗinsa ya amince da shi; jerin lambobi kawai ba ya isa.
  Operator da ya adana zaɓi mai taƙaita kafin waɗannan ids su wanzu zai ci gaba da samun
  halin da yake da shi har sai an zaɓi sabbin ids.
- **Tsare-tsaren musamman** — har zuwa tsarin regex ko wildcard 20 (`*` = har zuwa
  haruffa 64 marasa whitespace, `?` = ɗaya). Matches suna zama `[CUSTOM_REDACTED]`.
  Kowane tsari yana bi ta `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): bai wuce haruffa 500 ba, flags sun takaita
  ga `g i m s u`, dole ne ya compile, ya wuce `safe-regex` (komawar baya mai muni), kuma
  kada ya dace da igiya mara komai ko mai riƙe wuri na redaction. Ana ƙin tsarin da ya
  gaza lokacin adanawa da lokacin gwaji, kuma ana tsallake layin da aka adana wanda ya
  gaza a lokacin gudu maimakon a compile ɗinsa. Tsare-tsaren musamman suna aiki ne kawai
  yayin da masking yake kunne.
- **Ƙididdigar ganowa** — ƙididdiga bisa nau’i (ba a taɓa riƙe ƙimomin da aka samu ba),
  ana ajiye su a ƙwaƙwalwa kuma ana sake saita su bayan restart
  (`src/lib/pii/piiDetectionStats.ts`). Suna ƙaruwa ne kawai yayin da masking yake kunne.

Ana ajiye saitunan a teburin `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) kuma ana karanta su ta cache na sakan 1. API:

| Hanya  | Path                     | Manufa                                                                 |
| ------ | ------------------------ | ---------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Yanayin flag, `enabledTypes`, `customPatterns`, ƙididdigar ganowa      |
| `PUT`  | `/api/settings/pii`      | Sauya `enabledTypes` (`null` = duka) da/ko `customPatterns`            |
| `POST` | `/api/settings/pii/test` | Gwajin tsari ɗaya a kan samfurin da bai wuce 8 KB ba; ba a adana komai |

Duk ukun suna buƙatar management auth kuma suna tabbatar da jiki ta Zod
(`src/shared/validation/schemas/piiSettings.ts`). Lokacin da aka kashe login
(`requireLogin=false`) `GET` da endpoint ɗin gwaji a buɗe suke, amma `PUT` har yanzu
yana buƙatar zaman dashboard, maɓallin API mai `manage`-scope, alamar access ta `oma_`
mai write scope ko mafi girma, ko alamar CLI ko alamar internal-service da aka aika daga
loopback.

#### Masu gano GDPR (EU) da POPIA (Afirka ta Kudu)

| Id                  | Identifier               | Validation                                                                                        |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                     | Ƙasar da aka sani, tsawon da ya dace da waccan ƙasar, ISO 13616 MOD-97-10                         |
| `eu_vat`            | EU VAT number            | Farkon lambar ƙasa memba da aka sani da tsarin lambar ƙasar (ba a binciken VIES)                  |
| `es_dni_nie`        | Spanish DNI / NIE        | Harafin tantancewa (ƙimar mod 23); NIE ita ce `X/Y/Z` + lambobi 7                                 |
| `it_codice_fiscale` | Italian Codice Fiscale   | Harafin tantancewa daga teburorin matsayi marasa-ɗaɗi/ɗaɗi                                        |
| `pl_pesel`          | Polish PESEL             | Lissafin checksum mai nauyi da kwanan haihuwa da aka ɓoye wanda yake wanzuwa                      |
| `nl_bsn`            | Dutch BSN                | Gwajin 11 (ma'aunai 9..2, -1)                                                                     |
| `de_steuer_id`      | German Steuer-ID         | ISO 7064 Mod 11,10 tare da ƙa'idojin tsarin lambobi (ba ya fara da 0)                             |
| `se_personnummer`   | Swedish personnummer     | Luhn a kan lambobi goma na ƙarshe da ingantaccen kwanan haihuwa (lambobi 10 ko 12)                |
| `za_id`             | South African ID number  | Luhn a kan dukkan lambobi 13, watan/ranar haihuwa mai inganci, lambar zama ɗan ƙasa 0 ko 1        |
| `za_phone`          | South African phone      | Farkon `+27` / `27`, ko tsarin ƙasa na `0..` da aka rubuta da sarari ko ɗan jan layi              |
| `za_vat`            | South African VAT number | Lambobi 10 da suka fara da `4` **da** "VAT" / "BTW" a cikin haruffa 48 da suka gabata             |
| `za_tax_ref`        | South African tax ref.   | Lambobi 10 da suka fara da `0`-`3`, Luhn, **da** "tax" / "SARS" a cikin haruffa 48 da suka gabata |

Saboda tsarin lambobi kawai yana iya yin karo da lambobin oda, lambobin gini da
tambarin lokaci, mafi raunin su (`za_vat`, `za_tax_ref`) suna buƙatar alamar
maɓallin kalma, kuma ba a ɗaukar lambar lambobi goma tsirara mai `0..` a matsayin
lambar wayar Afirka ta Kudu. Ba a gano IBANs masu sarari (`GB29 NWBK ...`) ba. A
hanyar yawo, ana bincika alamar a cikin ɓangaren da ake ciki kawai. Ids ɗin suna
gaban tsarin lambobin waya na gama-gari, saboda haka identifier da aka tantance yana
riƙe da nasa alamar maye gurbi
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Samfuran `gdpr` da `popia` suna
zaɓar ids na EU da na Afirka ta Kudu bi da bi. Yin rufe bayanai da kansa yana
ci gaba da kasancewa na zaɓi (Hard Rule #20): babu abin da ke nan da ke canza
tsohon saitin alamar fasali.

### Allurar Umarnin (`promptInjection.ts`)

Yana gano tsare-tsaren kai hari a cikin abubuwan da mai amfani ya bayar kuma yana
tilasta manufar da aka tsara. Masu canjin muhalli da zaɓuɓɓukan constructor ne ke
ƙayyade ɗabi'arsa:

| Setting         | Env var                                                                                               | Default | Effect                                                                                                                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Enabled         | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Idan ya kasance `false`, guardrail yana dakatar da aiki nan take.                                                                                                                                                  |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Manufar allurar umarni: `block`, `warn`, ko `log`. (`redact` ana karɓarsa saboda dacewa da tsofaffi amma **ba** ya cire rubutun allurar umarni; sake rubuta PII na buƙata yana ƙarƙashin `PII_REDACTION_ENABLED`.) |
| Block threshold | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Ƙaramar tsananin da ake buƙata don toshewa. A tsohon saiti, matsakaici ana lura da shi kaɗai.                                                                                                                      |

**Fifiko na Mode** (`getMode`): `options.mode` na mai kira →
`INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Saboda haka override na dashboard yana da fifiko a kan masu canjin
muhalli, don haka UI na Feature Flags yana sarrafa guard ɗin da ke aiki kai tsaye
(ba a buƙatar sake farawa). Karatun DB yana bin tsarin kariya: idan ya samu
kuskure, guard ɗin yana komawa ga ɗabi'ar da aka samo daga env, kuma idan ba a
sanya override ba, ɗabi'ar tana zama daidai da warwarewa ta env kaɗai.

Tushen ganowa:

1. `sanitizeRequest()` daga `@/shared/utils/inputSanitizer` (saitin mai gano
   matsaloli na bai ɗaya da ake amfani da shi a wasu wurare a cikin bututun aiki).
2. `DEFAULT_GUARD_PATTERNS` da aka gina a ciki (a halin yanzu `system_override_inline` da
   `markdown_system_block`, dukkansu da tsananin `high`).
3. `customPatterns` na zaɓi da aka bayar ta zaɓuɓɓukan constructor (kalmomi, regex,
   ko bayanan `{ name, pattern, severity }`).

Lokacin da `mode === "block"` **kuma** aƙalla ganowa guda ɗaya ta kai ga matakin
tsananin da aka saita, `preCall` yana mayar da `{ block: true, message: "Request rejected:
suspicious content detected" }`. A yanayin `warn`/`log`, guardrail yana rubuta
a log amma ya bar kiran ya gudana. Ana kuma fitar da mataimakin da aka raba
`evaluatePromptInjection()` domin masu kira da ke buƙatar tantance prompts ba tare
da wucewa ta registry ba.

**Iyakar bincike (v3.8.20):** na’urar gano tana duba **farkon 16 KB kawai** na
rubutun prompt da aka haɗa — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) a cikin
`src/shared/utils/inputSanitizer.ts`. Dukansu `detectInjection()` da
`evaluatePromptInjection()` suna yin `slice(0, MAX_INJECTION_SCAN_BYTES)` kafin su
gudanar da madaukin tsarin. Umarnin allurar bayanai suna kusa da saman input, don haka
wannan yana takaita amfani da CPU/GC na regex a kan bayanan da suka kai ɗaruruwan KB ba tare da raunana gano su ba (duba
#3932, #4041).

### Mai ɓoye bayanan sirri (`credentialMasker.ts`)

Yana gudana a matakai **biyu**, kuma shi ne na ƙarshe a cikin jerin tsoho (fifiko `95`). Yana cire
sanannun tsarin maɓallan API / alamun sirri daga bayanan da ake aikawa (abun cikin saƙo, hujjojin
kiran kayan aiki, sakamakon kayan aiki) **da** amsar mai samarwa, ta yadda bayanin sirri da aka
liƙa a cikin prompt (ko sakamakon kayan aiki ya maimaita shi) ba zai fallasa ga mai samarwa na sama
ko komawa ga abokin ciniki ba.

- **Ana kunna shi da zaɓi kawai**, bisa ga irin ƙa’idar cire PII (mai alaƙa da Hard Rule #20): yana
  kashe sai idan `settings.credentialRedactionEnabled === true` **ko**
  `CREDENTIAL_REDACTION_ENABLED=true`. Idan an kashe shi, guardrail ɗin ba ya yin komai —
  ba ya taɓa toshewa kuma ba ya taɓa sake rubutawa.
- `redactCredentials()` yana bin cikakkiyar bishiyar bayanai/amsa (`walkValue()`),
  cikin aminci daga gurɓata prototype, kuma yana kare zagaye ta `WeakSet`; yana maye gurbin
  abubuwan da suka dace da `[REDACTED:<type>]`, yana kwafe rassan da aka sauya kawai.
- `CREDENTIAL_PATTERNS` ya ƙunshi maɓallan masu samar da LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), alamun VCS/SaaS (GitHub, Slack, Linear, Notion,
  npm, Postman, Discord), maɓallan biyan kuɗi (Stripe, Square), maɓallan girgije
  (AWS access key, Twilio, SendGrid, Mailgun), maɓallan sirri / JWTs,
  igiyoyin haɗi masu ɗauke da bayanan sirri (`mongodb://user:pass@...`, da sauransu), da tsarin
  ƙimar header na `Authorization`/`x-api-key`/`api-key`/`apikey` na gama-gari.
  Ana cire maɓallan da suke da sifar header (`authorization`, `x-api-key`, `api-key`,
  `apikey`) ta tsarin bayanai (ƙimar kawai, yayin da ake adana farkon tsarin kamar
  `Bearer `/`Basic `), maimakon amfani da regex ɗin rubutu na gama-gari.
- Guardrail ɗin ba ya taɓa toshewa; sake rubutawa kawai yake yi (`modifiedPayload` /
  `modifiedResponse`) sannan ya ƙara bayanin (`meta.credentialsRedacted`, `meta.count`).

Kariyar regression: `tests/unit/credential-masker-guardrail.test.ts`.

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

## Tsarin aiwatarwa

Ga kowace buƙata da ke bi ta `src/sse/handlers/chat.ts` da
`open-sse/handlers/chatCore.ts` (hanyoyin dangin chat da aka jera ƙarƙashin
[Faɗi da iyakoki](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` yana gina jerin tsallakewa daga mabudin API, jikin buƙata,
   da kanun bayanai.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` yana gudanar da ka'idojin kariya bisa tsarin fifiko daga ƙarami zuwa babba:
   - Ana rubuta ka'idojin kariya da aka kashe a matsayin `skipped`.
   - `preCall` na kowace ka'idar kariya na iya sake rubuta bayanan buƙata ta hanyar `modifiedPayload`.
   - Bayyanar farko ta `block: true` tana katse sarkar, sannan mai sarrafa buƙatar ya mayar da amsar ƙin karɓa ta ka'idar kariya.
3. Abubuwan buƙatar (da wataƙila aka sake rubuta su) suna wucewa zuwa hanyar haɗa hanyoyi da aikawa zuwa sabis na sama.
4. **Na marasa yawo kawai:** bayan an haɗa amsar,
   `guardrailRegistry.runPostCallHooks(...)` yana gudanar da sarkar iri ɗaya a kan amsar. `block: true` a nan yana zubar da amsar sabis na sama kuma ya mayar da HTTP 400. Amsoshin da ake watsawa suna tsallake wannan mataki gaba ɗaya.
5. **Ga ma'ajiyar da ake iya mayarwa kawai:** idan buƙatar ta samar da tokens, `handleChat`
   yana dawo da su a cikin amsar 2xx da yake mayarwa, bayan ƙugiyoyin bayan kiran da canjin PII yayin yawo, don `PII_RESPONSE_SANITIZATION` ta ga tokens da PII da samfurin ya samar, ba asalin da aka dawo da shi ba.

Ka'idojin kariya da suka haifar da kuskure ana rubuta su da `error: <message>` kuma a shigar da su cikin log ta `logger.warn`, amma sarkar tana ci gaba — an tsara tsarin ne ta yadda kuskure ba ya rufe aiki.

## Rufewa da iyakoki

An haɗa rajistar guardrail da bututun sarrafa hira kawai. An kafe waɗannan
iyakoki ta hanyar `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` da
`tests/unit/guardrail-pipeline-characterization.test.ts`; sabunta waɗannan gwaje-gwajen
da gangan idan halayyar ta canza.

### Inda hooks ke aiki

| Hook / iko                              | Yana aiki a kan                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                       | Buƙatun da `handleChat` ke sarrafawa (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (da `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, da wakilin Telegram na hira. Haka kuma ƙarshen gwajin dashboard `/api/guardrails/test`. Toshewar pre-call tana mayar da HTTP 400. |
| `runPostCallHooks`                      | Amsoshin hira **marasa streaming** kawai (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Amsoshin da ake streaming ba sa isa gare shi.                                                                                                                                                                                                                                                                                            |
| PII na streaming                        | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), wanda ake haɗawa a cikin `streamingPipeline.ts` idan `PII_RESPONSE_SANITIZATION` yana kunne. Ba guardrail ba ne, don haka tashoshin kashewa ba su shafe shi.                                                                                                                                                                                                                |
| Rumbun PII mai juyawa                   | Buƙatun da `handleChat` ke sarrafawa kawai, lokacin da `PII_REDACTION_ENABLED` da `PII_REVERSIBLE_VAULT_ENABLED` suke kunne. `pii-masker` na pre-call ne ke ƙirƙirar tokens, sannan a mayar da su lokacin fita daga `handleChat` (`src/lib/pii/requestTokenVaultScope.ts`). Kashe `pii-masker` ga buƙata yana nufin ba a ƙirƙiri komai ba.                                                                                                |
| Middleware na injection-guard (na gado) | Duk hanyoyin `/v1` da ke ɗauke da prompt, har da na dangin hira (duba [rufe hanyoyin injection-guard](#injection-guard-route-coverage--red-team-phase-8--block-d)). Allurar prompt kawai.                                                                                                                                                                                                                                                 |

### Abin da ba a rufe ba

- **Hanyoyin media, embeddings da bayanai** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) ba sa taɓa rajistar. Babu
  masking na PII, masking na credentials ko modality bridge da ke aiki a can. Dubawarsu
  kawai ita ce middleware na injection-guard na gado.
- **Amsoshin da ake streaming** ba sa samun guardrail na post-call: babu
  `pii-masker` ko `credential-masker` na post-call, kuma babu toshewar post-call. Transform na PII
  na streaming kawai ne ke aiki (idan `PII_RESPONSE_SANITIZATION` yana kunne). Credential
  da aka maimaita a amsar da ake streaming ba a cire shi.
- **Tashoshin kashewa da middleware (da gangan):** middleware ɗin yana tantance allurar prompt
  ta kiran `evaluatePromptInjection()` nasa, ba tare da aika jerin kashewa da mai kira ke
  sarrafawa ba. Yanayin `block` iyaka ce ta dole wadda kashewar da mai kira ke sarrafawa ba za ta tsallake ba, har da hanyoyin dangin hira
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Kashe `prompt-injection`
  yana tsallake guardrail na rajista kawai.

### Abin da ke ganin amsa kafin post-call

A hanyar da ba ta streaming ba, tsari shi ne: cire ƙwaƙwalwa → aiwatar da kayan aikin da aka gina a ciki → guardrails na post-call → fita saboda toshewar post-call → adanawa a semantic-cache.

- **Cire ƙwaƙwalwa** da **aiwatar da kayan aiki** suna ganin amsar kafin guardrails na post-call
  su sami damar sake rubuta ta ko toshe ta. Tun daga
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), cire ƙwaƙwalwa
  yana bi da rubutun da aka cire ta `sanitizePII` idan
  `PII_RESPONSE_SANITIZATION` yana kunne (a streaming da marar streaming), amma amsar
  da daga baya post-call ya toshe har yanzu an riga an miƙa ta ga ƙwaƙwalwa da kayan aiki.
- **Semantic cache** yana adana amsar bayan post-call, don haka yana adana amsar da aka
  sake rubutawa, kuma ba a taɓa adana amsar da aka toshe ba. Ana tsara shigarwar cache
  bisa kowane API key.

## Tsarawa

Masu canjin muhalli da matakan kariya na cikin tsarin ke karantawa:

| Variable                              | Used by                    | Effect                                                                                                      |
| ------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Saita zuwa `false` don kashe ganowa gaba ɗaya.                                                              |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Manufar allurar umarni: `warn`, `block`, ko `log`. Tsohuwar ƙima `redact` ba ta sake rubuta rubutun allura. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Yanayin mai tsaron allura; haka kuma tutar fasalin DB ce da ke **rinjayar** masu canjin muhalli (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Ƙaramar tsananin da `MODE=block` ke ƙi: `high` (tsoho), `medium`, ko `low`.                                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Tsohon sunan `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                             |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Idan `true` ne, ana ɓoye PII na buƙata (ba tare da la’akari da yanayin allura ba).                          |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Tare da `PII_REDACTION_ENABLED`, ƙirƙiri alamomi masu juyawa kuma mayar da su a amsoshin 2xx.               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream)  | Yana sarrafa halayen mai ɓoye bayanai a ɓangaren amsa.                                                      |

Matakan kariya na Modality Bridge suna karanta tsarin aiki daga ma’ajiyar
saituna da ke bayan DB (`getSettings()`), ba daga masu canjin muhalli ba. Maɓallan
farko na Vision su ne
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, da
`modalityBridgeCacheMaxEntries`. Ana karɓar tsoffin maɓallan
`visionBridge*` ne kawai a matsayin madadin karantawa na zagaye guda da aka
rubuta; rubuce-rubucen dashboard suna amfani da maɓallan farko. Tsoffin ƙimomi da
mai warware madadin suna cikin `src/shared/constants/modalityBridgeDefaults.ts`,
yayin da ake riƙe tsoffin constants a cikin
`src/shared/constants/visionBridgeDefaults.ts`.

Audio yana amfani da `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, da `modalityBridgeAudioMaxClips`, tare da saitunan
`modalityBridgeCache*` da aka raba. Audio ba shi da madadin tsoffin maɓallai domin
an ƙaddamar da waɗannan maɓallan tare da tsarin Modality Bridge.

Video yana amfani da `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, da
`modalityBridgeVideoTimeout`, tare da saitunan `modalityBridgeCache*` da aka raba.
An kashe shi ta tsohuwa saboda FFmpeg/ffprobe wasu dogaro ne na aiki na zaɓi, kuma
ƙirƙirar taken firam-firam yana ƙara jinkiri da kuɗin amfani da samfurin.

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
