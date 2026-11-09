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

## Gina Guardrails

Rijistar tana ɗaukar matakan tsaro guda shida cikin tsari mai fifiko kan shigo da kaya (duba `registry.ts` → `registerDefaultGuardrails()`):

| fifiko | Suna                | Mataki(s)      | Fayil                 |
| ------ | ------------------- | -------------- | --------------------- |
| `5`    | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`    | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`    | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`   | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`   | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`   | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Ƙananan lambobi suna gudana** na farko** .

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Samfurin tushe GLM 5.3 da `glm-5.3-{low,high,max}` suna da takamaiman metadata `supportsVision:false` registry/spec. Bambance-bambancen Flash na GLM 5.3 sun kasance samfuran hangen nesa na asali. Hanyar `/v1/messages` na lambar Claude tana shiga sarkar tsaro ta `handleChat` da aka raba** kafin** Fassarar Claude-to-OpenAI; Hotunan sakamakon kayan aiki `Read` dole ne a siffanta ko sarrafa su kafin fassarar ta ɗaga su zuwa abun cikin OpenAI `image_url` (#17069).

Yana katse buƙatun ɗaukar hoto da nufin su** samfurori marasa hangen nesa** kuma ko dai ya sake mayar da buƙatun gabaɗaya zuwa samfurin mai iya hangen nesa ko kuma ya maye gurbin sassan hoton tare da kwatancen rubutu wanda ƙirar hangen nesa mai daidaitacce ke samarwa kafin kiran sama. Wannan yana ƙyale masu samar da rubutu-kawai a sarari su riƙa ɗaukar nauyin biyan kuɗi na multimodal.

Yawo:

1. Tsallake idan ƙirar manufa ta riga tana goyan bayan hangen nesa (sai dai idan ya bayyana a cikin jerin gada tilas `isVisionBridgeForcedModel`).
2. Cire sassan hoto ta hanyar `extractImageParts(messages)` (`visionBridgeHelpers.ts`), wanda ke wakilta zuwa ga** haɗakar mai gano hanyoyin sadarwa** `detectMediaParts()` a cikin `open-sse/utils/mediaParts.ts` — tushen gaskiya guda ɗaya da aka raba tare da tacewar haɗakarwa. An ba da izinin cirewa zuwa sifofin `replaceImageParts` zai iya karkata baya (tsarin ↔ ya maye gurbin kwangila): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, da Amsoshi API `input_image`. Hotunan da suka dace da su a cikin Claude Code `tool_result.content` da kuma abubuwan da aka fitar na kayan aiki ana fitar da su kuma ana maye gurbinsu a hanyoyinsu na asali; Siffofin nuna alama-kawai kayan haɗin-tace kuma ba a fitar da su. Tsallake idan ba a samu ba.
3. Yanke saitin lokacin gudu ta hanyar `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): sabbin maɓallan saitunan `modalityBridge*` suna nasara; maɓallan `visionBridge*` gado sun kasance a** koma baya-zagaye daya** (windowback). Tsallake kafin kowace hanya ta kafofin watsa labarai lokacin da gadar ta lalace.
4. Mai zaɓin yanayi (`modalityBridgeVisionMode`, duba tebur da ke ƙasa) ya yanke shawarar komawa da kwatanta. Sake dawo da `modifiedPayload` tare da musanya `model` kawai, da meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Kwatanta hanya: hotuna a `maxImages`, shirya saurin sanin ɗawainiya, tuntuɓi bayanin cache, kira samfurin hangen nesa** a layi daya** (`Promise.allSettled`), kuma a yi musu allurar sassan rubutun `[Image N]: <description>` a wurinsu. Siffar da ta gaza tana haifar da `null`: an adana ɗanyen hoton don maƙasudin unknown/vision-capable (#4012), amma a** an tabbatar da manufa kai tsaye-kawai rubutu** ko haduwar sifili-hangen nesa yana samun tsararren rubutu `(unavailable — no vision-capable provider connected)` ga kowane hoton da ba a siffanta shi ba, gami da faɗuwar ɓangarori da hotuna fiye da ma'aunin kiran kira (#17069). Haɗin da ba a yi nasara ba ya kwatanta koma baya ya kasance a wurin (#8430).
6. Koma `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Mai zaɓin yanayi (`modalityBridgeVisionMode`)

| Yanayin    | Default | Hali                                                                                                                                                                                                                                                                                     |
| ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Legacy heuristic, wanda ba a taɓa shi ba (#6640/#7204): samfuran ba combo/`auto/` suna komawa zuwa mafi kyawun ƙirar hangen nesa sai dai in ainihin ƙirar ta riga tana da takaddun shaida masu amfani (sannan a kwatanta); hada-hadar kai hari ko da yaushe suna bayyana.                |
| `describe` |         | Koyaushe siffanta — an tsallake shingen hanyar gaba ɗaya; Zaɓaɓɓen samfurin mai amfani koyaushe yana amsawa.                                                                                                                                                                             |
| `reroute`  |         | Ƙaddamar da hanyar: an ƙetare tsarin kiyaye-kwarjini-samfurin. Hanyar -** manufa** Har yanzu mai gadi yana aiki da — lokacin da babu manufa mai amfani da hangen nesa, gadar ta toshe tare da bayyanannen kuskure maimakon siffantawa ko aika dattin hotuna zuwa makasudin rubutu kawai. |

Yanayin tilasta gajerun kewayawa** kafin** auto heuristic aiki; Halin `auto` byte-daidai ne da pre-PR-1 guardrail.

#### Maɓallin maɓallin API (`visionBridgeKeyScope.ts`)

Lokacin da maɓallin API mai kira ya ƙuntata `allowedConnections`, wuraren waha (`allowedQuotas`) ko samfura (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), gadar kawai ta zaɓi hanyar da ta bayyana ƙirar maɓalli na iya amfani da su, akan haɗin da maɓallin zai iya amfani da shi. Kiran siffantawa sannan koyaushe yana tafiya ta hanyar madauki OmniRoute tare da taken `x-omniroute-self-loop-key-id`, don haka buƙatar taɗi mai karɓa yana sake tilasta haɗin maɓalli da tsarin ƙirar. `enforceApiKeyPolicy()` yana girmama wannan taken kawai tare da mai ɗaukar madauki, don haka yana iya taƙaita isa ga kawai, kuma id ɗin da bai warware ba ana ƙi.

Idan babu samfurin hangen nesa da aka yarda don maɓalli, a** an tabbatar da manufa ta rubutu kawai** ya ƙi buƙatun hoton a cikin gida tare da bayyanan HTTP 400 maimakon tura bytes na hoto zuwa sama mara ƙarfi (#17069). Don maƙasudai waɗanda ba a sani ba ko iyawar hangen nesa na asali, hanyar siffantawa tana riƙe da halin buɗe-buɗenta na baya (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Buƙatun ba tare da maɓalli ba, da maɓallai ba tare da waɗannan hane-hane ba, suna aiki daidai kamar da.

#### Task-ware bayyana saurin (`modalityBridgeVisionTaskAware`)

Default** gaskiya** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) yana dora rubutun na** sakon mai amfani na karshe** (wanda aka sassaƙa zuwa chars 500) zuwa tushe ya bayyana da sauri, yana jagorantar bayanin zuwa ga ainihin abin da mai amfani ya tambaya (codex-vision-proxy pattern) da kuma tambayar ƙirar hangen nesa don rubuta rubutun da ake gani. Tare da tuta a kashe — ko babu mai amfani da rubutu — ana amfani da saurin tushe baya canzawa.

Siffar madauki na kansa na buƙatun mai jituwa na OpenAI (`callVisionModelSingle()` a cikin `visionBridgeHelpers.ts`) koyaushe yana buƙatar `image_url.detail: "high"` — ba tare da sharadi ba, ga kowane caller/provider, ba a kunna kowane siginar abokin ciniki ba. Samfuran ƙananan ƙididdiga yana ƙasƙantar da daidaiton OCR don daidai aikin rubutun-rubutu wannan gaggawar ke nema, don haka siffanta kiran da kansa koyaushe yana neman babban daki-daki ko da wane matakin dalla-dalla ainihin buƙatar shigar da aka yi amfani da ita. Wannan kawai yana shafar jikin buƙatun bayanin ciki; ba ya canza yadda OmniRoute ke tura nasa `image_url.detail` na mai kiran akan buƙatun farko — cewa ana amfani da tsoho a keɓance daban-daban, kuma kawai ga abokan cinikin OpenCode da aka gano, a cikin `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Reshen tsarin tsarin waya Anthropic na madauki na siffanta kansa ba shi da filin `detail` kuma ba shi da tasiri ta kowane tsoho.

#### Kwatanta abin fitarwa (`modalityBridgeVisionMaxChars`)

| Maɓalli                        | Default | Rage             |
| ------------------------------ | ------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` ko 100-50000 |

`0` (default) yana nufin** babu kafi** — bayanin da aka dawo da `callVisionModel()` an wuce shi ta hanyar da ba a canza shi ba, yana kiyaye halin da ake ciki. Duk wani ƙima a cikin kewayon 100-50000 yana yanke bayanin tare da ƙaramar `…` kafin a raba shi a matsayin `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` a `src/lib/guardrails/visionBridge.ts`). Tada wannan don daki-daki-nauyin OCR ayyuka inda ƙirar ƙasa ke buƙatar cikakken rubutun; rage shi zuwa daure token amfani akan ƙirar hangen nesa na hira. Filin dashboard yana rayuwa akan Babban panel na Vision tab (`modality-bridge-max-chars` a `ModalityBridgeVisionTab.tsx`) kuma yana matsa kowace ƙima tsakanin 1 da 99 har zuwa bene 100 yayin barin `0` bayyanannen da ba a taɓa — `0` yana da ingancin Zod daidai da kansa (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ba kawai tsoho "wanda ba a saita" ba.

#### Bayyana cache (`modalityBridge/bridgeCache.ts`)

A cikin ƙwaƙwalwar ajiya LRU + TTL cache don siffanta abubuwan da aka fitar, tsarin raba-fadi. Maɓalli = `sha256(imageRef + composedPrompt + configuredBridgeModel)` tare da tsararren prefix (babu karon iyakar filin). Bangaren samfurin shine** saita** samfurin gada, ba samfurin da a zahiri ya amsa — `callVisionModel` zai iya fadowa a ciki ba, kuma keying kowane ƙoƙari zai wargaza cache. Ba a taɓa adana bayanan da ba a yi nasara ba. Saituna:

| Maɓalli                         | Default | Rage    |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Daidaita hoton nesa (kai madauki describe/base64 fetch)

Lokacin da gada ta debo a** m** Hoton kanta — Anthropic yana kwatanta kiran kai da tsarin claude-wire-format base64 (`ensureBase64ImagesForClaudeWire`), duka ta `fetchRemoteImageAsDataUri()` a cikin `visionBridgeHelpers.ts` — sakamakon bayanan URI yana wucewa ta `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) kafin a saka shi cikin buƙatun hangen nesa. An rage girman hotuna zuwa a** 2048px dogon baki** (daidai da girman girman OpenAI/Anthropic ya riga ya yi amfani da gefen uwar garken), wanda ke yanke upload bytes/latency ba tare da canza abin da samfurin hangen nesa yake gani ba. Resizing yana amfani da `sharp`, wanda aka ɗora ta hanyar shigo da kaya mai ƙarfi: akan dandamali inda binary na asali ya kasa ɗauka, `normalizeDataUri()`** taba jifa** — yana komawa zuwa hanyar wucewa ta asali na asali, don haka hanyar describe/base64-conversion koyaushe tana ci gaba da aiki. Ƙaƙƙarfan hoton da ba a taɓa gani ba (kayan da bai dawo da hoton da za a iya yankewa ba) suma ana wucewa ta cikin waɗanda ba a taɓa su ba. Wannan al'ada an keɓance shi ne don hotunan gadar ɗin don kiran kansa na — ba a taɓa yin amfani da shi ga ɗanyen aikin mai kira ba, daidai da ƙa'idar maye gurbin-in-kawai (Hard Rule #20).

#### Saitunan tsarin +

Sabbin maɓallan `modalityBridge*` sun haɗa da Zod a cikin `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trio , da ƙungiyar `modalityBridgeAudio*` da gadar Audio ke amfani da ita. Hijira `141_modality_bridge_settings.sql` yana kwafin ƙimar `visionBridge*` da ta wanzu zuwa ga sabbin maɓallan da suka dace (idem mai ƙarfi, baya sake rubuta ƙimar `modalityBridge*` mai aiki da aka saita); Maɓallan gado sun kasance ana karɓar su azaman koma baya na karantawa don sake zagayowar saki ɗaya.

#### Bayanin kai na + ƙididdiga

Siffanta martanin da aka canza suna ɗaukar `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (wanda `buildModalityBridgeHeader()` ya gina a cikin `modalityBridge/bridgeStats.ts`, wanda `withModalityBridgeHeader()` ya buga a cikin `src/sse/handlers/chatHelpers.ts`). Ana samun buƙatun da aka sake karkata** a'a** kai — ba a taɓa abin da aka biya ba kuma an riga an fara ganin musanya samfurin a cikin filin `model` na ƙungiyar amsawa.

`GET /api/modality-bridge/stats` (auth gudanarwa, matakin guda ɗaya da `GET /api/settings`) yana dawo da ma'aunin ƙwaƙwalwar ajiya na kowane nau'i `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` don `vision`, `audio`, da `video`. `averageLatencyMs` yana amfani da `latencySamples`, ba duk yunƙuri ba ne, a matsayin maƙasudinsa; aiki ba tare da lokaci ba baya ƙirƙira samfurin sifili-mili biyu. `bridged` ya kasance laƙabin da ya dace da baya don nasara juzu'i; yunƙurin da ba a yi nasara ba ba ya ƙaruwa. Ana sake saita ma'auni akan tsarin sake farawa ta ƙira (telemetry, ba lissafin kuɗi ba).

#### Tsarin dashboard

Shafin dashboard ɗin da aka keɓe shine `/dashboard/settings/modality-bridge`. URL ɗin sa na `Vision`, `Audio`, da shafukan `Video` suna adana sigogin tambaya yayin canza ƙimar `tab`. Shafin hangen nesa yana fallasa iyawa, yanayi, zaɓin ƙira (gami da tsohowar atomatik), faɗakarwa da sanin ɗawainiya, iyakoki timeout/image/description-length/cache na ci gaba, ƙidayar lokacin aiki, da buƙatun samfurin kariya. Shafin Audio shima yana raye: yana fallasa damar aiki, mai zaɓin ƙirar STT-kawai tare da Auto, iyakokin timeout/max-clip, ƙididdigar sauti, da gwajin samfurin `input_audio`. Shafin Bidiyo yana aiki: yana ba da rahoton FFmpeg/ffprobe runtime jihar — ɗaya daga cikin fayyace jihohi huɗu UI (`unknown` yayin da binciken ke cikin jirgin ko kuma ya kasa kammalawa, `restricted` a kan mahallin dashboard ɗin da ba na loopback ba inda binciken ya tsallake abokin ciniki-gefen, `unavailable` da zarar an bincika kuma ya tabbatar da ɓacewa, ko `available` tare da nau'ikan FFmpeg/ffprobe ) — ya ci gaba da zaɓin ƙira, ƙirƙira ƙira, tacewa da ƙira enable/model/frame/video/timeout. yana fallasa masu lissafin bidiyo.

Tsohon Katin Vision Bridge karkashin saitunan AI shine hanyar haɗin kai zuwa sabon shafi; ba ta mallaki kwafin na biyu na fom ba. Masu Bayar da Watsa Labarai kuma suna haɗa Hoto-zuwa-Text da Jawabin-zuwa-Text ayyukan aiki zuwa madaidaitan gadar Modality Bridge ba tare da cire filin wasan Magana-zuwa-Text ba.

**Keɓancewar shigar da kai:** lokacin da bayanin kiran ya bi ta hanyar madauki na OmniRoute na kansa `/v1` (samfurin mai ba da misali), ƙaramin buƙatun yana aika `x-omniroute-admission-bypass: internal` kuma an inganta shi tare da ƙwararrun shaidar madauki — na gida na `sk_omniroute` sentinel a cikin yanayin gida, ko madaidaicin `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env maɓalli ( `REQUIRE_API_KEY=true` ) mai aiki da aka saita (#1350). Ana girmama hanyar wucewa ne kawai don waɗannan ainihin takaddun shaida, don haka abokan ciniki na waje ba za su iya amfani da taken don tsallake shiga ba.

Matsalolin Legacy suna rayuwa a cikin `src/shared/constants/visionBridgeDefaults.ts`; sabon kuskuren mode/task-aware/cache da mai warware saituna suna zaune a cikin `src/shared/constants/modalityBridgeDefaults.ts`. Wurin gadi yana fallasa zaɓin maginin `deps` don haka gwaje-gwaje na iya allurar `getSettings` da `callVisionModel` na karya.

### Gadar Audio (`audioBridge.ts`) — Modality Bridge PR-3

Yana satar buƙatun taɗi mai ɗaukar sauti kafin su kai ga manufa wacce ba a san shigar da sauti ba. Ba ya sake sake buƙatun taɗi: ana rubuta sassan odiyo ta hanyar ƙarshen ƙarshen buɗewa mai jituwa tare da OpenAI kuma zaɓaɓɓen ƙirar taɗi yana ci gaba da kwafin rubutu.

Yawo:

1. warware `supportsAudio` ta hanyar `getResolvedModelCapabilities()`. Bayanin mai ba da sabis- rajista metadata yayi nasara, sannan metadata ƙirar ƙira, sannan aka daidaita `modalities_input`. Jerin shigarwa da aka ayyana ba tare da `audio` ba shine `false`; babu wata shaida da ta rage `null`. Duk `false` da `null` suna kunna gadar ra'ayin mazan jiya, yayin da `true` ke ƙetare ta.
2. Gyara saitunan `modalityBridgeAudio*` kuma fitar da sassa na babban matakin sauti mai sassauƙa daga kowane saƙo ta hanyar gano `detectMediaParts()` da aka raba. Siffofin waya masu goyan baya sune OpenAI `input_audio`, `audio_url`, da `source.media_type: "audio/*"`. Ana gano sautin da aka saka don yin tuƙi amma ba a cire shi ta hanyar tsaga. An rufe aikin ta hanyar `modalityBridgeAudioMaxClips`; daga baya sassa suna zama ba a taɓa su ba.
3. Girmama wanda aka tsara `provider/model`, ko bari `selectAudioBridgeModel()` yayi tafiya `AUDIO_TRANSCRIPTION_PROVIDERS` a cikin tsayayyen tsari na kasida kuma zaɓi samfurin farko tare da takaddun shaida mai aiki mai amfani.
4. `callAudioTranscription()` tana canza sautin base64/data-URI zuwa `file` masu yawa, ko kuma zazzage `audio_url` mai nisa ta hanyar gadin jama'a kawai mai fita tare da maƙallan DNS da ɗaure 25 MB. Sannan ta POSTs fayil ɗin kuma zaɓi samfurin zuwa madauki na gida `/v1/audio/transcriptions`, ingantacce tare da `resolveSelfLoopBearer()`. Hanyar rubutun da ke akwai tana gudanar da bincike na gaskiya na yau da kullun, sarrafa cooldown/rate-limit, da aika mai badawa.
5. Kiran nasara ya maye gurbin sassansu da `[Audio N]: <transcript>`. Kira yana gudana tare da `Promise.allSettled`: gazawar mutum ɗaya tana adana wannan ɓangaren sauti na asali ( kwangilar #4012 ). Idan kowane kira ya gaza kuma an tabbatar da manufar `supportsAudio === false`, sassan sun zama `[Audio N]: (unavailable — no STT provider connected)` ( kwangilar #8430 ). Don maƙasudin da ba a sani ba (`null`), sakamakon gazawar gabaɗaya ya tsaya ba a taɓa shi ba. Maƙasudin tabbataccen rubutu-kawai ba tare da amfani da shaidar STT ba yana karɓar ƙaƙƙarfan ƙaho ɗaya ba tare da bayar da kiran cibiyar sadarwa ba.

Nasarar rubuce-rubucen suna amfani da ma'ajin Modality Bridge LRU/TTL cache. Maɓallin yana haɗa bayanin mai jiwuwa, alamar aiki `audio-transcription` tsayayye, da ƙirar STT da aka zaɓa; kasawa ba a taba cache. Ƙoƙarin sauti yana sabunta ƙididdigan `bridged`, `cacheHits`, `failures`, da `lastUsedAt` ƙididdiga. Amsoshin da aka canza suna ɗaukar `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; buƙatun da ba a taɓa ba ba sa karɓar ɓangaren gadar Audio.

Saitunan lokacin gudu suna da DB masu goyan baya kuma an inganta Zod:

| Maɓalli                       | Default | Rage           |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto or STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

Rukunin ma'ajin da aka raba ya rage ta hanyar `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, da `modalityBridgeCacheMaxEntries`.

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

Yana gudana** duka biyu** matakai.

- **`preCall`** yana rufe kaya, yana tafiya `system`, `messages`, `input`, da `prompt` (ciki har da abubuwan zaren fili), kuma yana amfani da `processPII()` (daga `@/shared/utils/inputSanitizer`) zuwa filayen `content`/`text`. Lokacin da `PII_REDACTION_ENABLED=true`, an sake gyara PII da aka gano a cikin kayan aiki mai fita. Wannan mai zaman kansa ne daga `INPUT_SANITIZER_MODE` (wanda kawai ke sarrafa manufofin alluran gaggawa). Lokacin da aka kashe sakewa, gano bayanan kira yana ƙirga ba tare da sake rubuta abun ciki ba.
- **`postCall`** zurfin-clones martani, yana gudanar da `sanitizePIIResponse()` tare da Mashin-siffar API-Responses (`maskResponsesOutput` — yana rufe `output_text` da `output[].content[].text`). Idan wani sakewa ya faru, amsawar da aka gyara ta maye gurbin na asali.

Titin tsaro ba ya toshewa; kawai yana bayyana (`meta.detections`, `meta.redacted`) ko kuma ya sake rubutawa.

#### Zaɓin kowane nau'i, ƙirar al'ada da ƙididdigar ganowa

**Dashboard → Saituna → Tsaro → PII rufe fuska** ya zabi _me_ aka rufe. Ba ya kunna abin rufe fuska: wato har yanzu `PII_REDACTION_ENABLED` (buƙata) da `PII_RESPONSE_SANITIZATION` (amsa + SSE), duka a kashe ta tsohuwa.

- **Zaɓin kowane nau'i** — an jera abubuwan ginannun ids a cikin `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Unset yana nufin kowane nau'i (halayen kafin wannan saitin ya wanzu). Taswirar ƙirar `ssn_us` na injin buƙatun zuwa `ssn`. Samfura (Mafi ƙaranci, Standard, Financial, Brazilian, USA, GDPR, POPIA, Cikak) kawai cika akwatunan rajistan shiga cikin UI.
- **GDPR da POPIA masu ganowa** — goma sha biyu ginannun ids masu rufe EU da abubuwan gano sirri na Afirka ta Kudu (tebur a ƙasa). Regexes, masu ingantawa da alamun ikon suna rayuwa a cikin tebur ɗaya, `src/shared/utils/piiPatterns.ts`, waɗanda duka sanitizer na amsawa (`src/lib/piiSanitizer.ts`) da mashin buƙatun (`src/shared/utils/inputSanitizer.ts`) suna cinyewa. Ana gyara ashana ne kawai idan mai tabbatar da shi ya karɓe shi; danda gudu na lambobi bai taba isa ba. Ma'aikacin da ya ajiye ƙunƙuntaccen zaɓi kafin waɗannan ids ɗin su wanzu yana kiyaye halayen da yake da shi har sai an sami alamar sabbin ids.
- **Tsarin al'ada** — har zuwa 20 regex ko ƙirar kati (`*` = har zuwa haruffa 64 waɗanda ba fararen sararin samaniya ba, `?` = ɗaya). Matches sun zama `[CUSTOM_REDACTED]`. Kowane tsari yana wucewa ta `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): aƙalla haruffa 500, tutoci iyakance ga `g i m s u`, dole ne a tattara su, dole ne su wuce `safe-regex` (mummunan ja da baya), kuma kada su dace da sigar da ba komai ko madaidaicin wuri. Ana ƙi tsarin da ya gaza lokacin adanawa da lokacin gwaji, kuma layin da aka adana wanda ya gaza ana tsallake shi a lokacin aiki maimakon a haɗa shi. Tsarin al'ada yana gudana kawai yayin da ake kunna abin rufe fuska.
- **Ƙididdigar ganowa** — kowane nau'in ƙidaya (ba a taɓa daidaita ƙimar ba), riƙe a ƙwaƙwalwar ajiya kuma sake saitawa akan sake kunnawa (`src/lib/pii/piiDetectionStats.ts`). Suna karuwa ne kawai yayin da ake kunna masking.

Saitunan suna zaune a cikin tebur `key_value` (sunan sararin samaniya `pii_settings`, `src/lib/db/piiSettings.ts`) kuma ana karanta su ta hanyar cache 1 s. API: ku.

| Hanya  | Hanya                    | Manufar                                                                           |
| ------ | ------------------------ | --------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Jihar tuta, `enabledTypes`, `customPatterns`, ƙididdigar ganowa                   |
| `PUT`  | `/api/settings/pii`      | Sauya `enabledTypes` (`null` = duk) and/or `customPatterns`                       |
| `POST` | `/api/settings/pii/test` | Busassun gudanar da tsari ɗaya a kan samfurin aƙalla 8 KB; babu abin da aka adana |

Dukansu uku suna buƙatar auth gudanarwa da kuma inganta jiki da Zod (`src/shared/validation/schemas/piiSettings.ts`). Tare da naƙasasshiyar shiga (`requireLogin=false`) `GET` kuma ƙarshen gwajin a buɗe yake, amma har yanzu `PUT` yana buƙatar zaman dashboard, maɓallin `manage` -scope API, alamar isa ga `oma_` tare da iyawar rubutu ko mafi girma, ko alamar CLI ko alamar sabis na ciki da aka aika daga madauki.

#### GDPR (EU) da POPIA (Afirka ta Kudu) masu ganowa

| Id                  | Mai ganowa                   | Tabbatarwa                                                                                          |
| ------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                         | Ƙasar da aka sani, daidai tsayin ƙasar, ISO 13616 MOD-97-10                                         |
| `eu_vat`            | VAT EU                       | Sanannen prefix-jahar memba da tsarin lambar jihar (ba a duba VIES )                                |
| `es_dni_nie`        | Mutanen Espanya DNI / NIE    | Harafin sarrafawa (darajar mod 23); NIE shine `X/Y/Z` + 7 lambobi                                   |
| `it_codice_fiscale` | Italian Codece Fiscale       | Harafin sarrafawa daga tebur matsayi na odd/even                                                    |
| `pl_pesel`          | Yaren mutanen Poland PESEL   | Cheksum mai nauyi da rufaffen ranar haihuwa da ke akwai                                             |
| `nl_bsn`            | Dutch BSN                    | 11-hujja (Ma'auni 9..2, -1)                                                                         |
| `de_steuer_id`      | Jamus Steuer-ID              | ISO 7064 Mod 11,10 tare da ƙa'idodin tsarin lambobi (babu jagora 0)                                 |
| `se_personnummer`   | ma'aikacin Sweden            | Luhn sama da lambobi goma na ƙarshe da kwanan watan haihuwa (lambobi 10 ko 12)                      |
| `za_id`             | lambar ID ta Afirka ta Kudu  | Luhn sama da duka lambobi 13, ingantaccen month/day haihuwa, lambar zama ɗan ƙasa 0 ko 1            |
| `za_phone`          | Wayar Afirka ta Kudu         | `+27` / `27` prefix, ko fom ɗin `0..` na ƙasa da aka rubuta da sarari ko sarƙaƙƙiya                 |
| `za_vat`            | lambar VAT ta Afirka ta Kudu | Lambobi 10 suna farawa da `4`** kuma** "VAT" / "BTW" a cikin haruffa 48 da suka gabata              |
| `za_tax_ref`        | Harajin Afirka ta Kudu Ref.  | lambobi 10 da suka fara `0`-`3`, Luhn,** kuma** "haraji" / "SARS" a cikin haruffa 48 da suka gabata |

Saboda tsarin lambobi-kawai suna yin karo da lambobi, gina lambobi da tambura, mafi rauni (`za_vat`, `za_tax_ref`) suna buƙatar alamar kalmar, kuma ba a ɗaukar lambar `0..` mai lamba goma a matsayin lambar wayar Afirka ta Kudu. Ba a daidaita IBANs mai sarari (`GB29 NWBK ...`) ba. A kan hanyar yawo ana duba alamar sama a cikin ɓangarorin yanzu kawai. Id ɗin suna zama gaba da tsarin ƙirar waya, don haka ingantaccen mai ganowa yana riƙe nasa wurin (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Samfuran `gdpr` da `popia` suna zaɓar EU da ids na Afirka ta Kudu bi da bi. Masking kanta yana tsayawa ficewa (Hard Rule #20): babu abin da ke canza fasalin fasalin fasalin.

### Allurar nan take (`promptInjection.ts`)

Yana gano tsarin adawa a cikin abun ciki da mai amfani ya kawo kuma yana tilasta tsarin da aka tsara. Halin yana haifar da sauye-sauyen yanayi da zaɓuɓɓukan magini:

| Saita            | Env var                                                                                              | Default | Tasiri                                                                                                                                                                                         |
| ---------------- | ---------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An kunna         | `INPUT_SANITIZER_ENABLED`                                                                            | `true`  | Lokacin `false`, guardtrail short-circuits.                                                                                                                                                    |
| Yanayin          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`  | Manufar allura: `block`, `warn`, ko `log`. (An yarda da `redact` don kwafin baya amma yana aikatawa** ba** rubutun allurar tsiri; `PII_REDACTION_ENABLED` ne ke sarrafa buƙatun PII rubutawa.) |
| Toshe bakin kofa | zabin `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Mafi ƙarancin tsananin da ake buƙata don toshewa. Matsakaici shine lura-kawai a tsohuwa.                                                                                                       |

**Matsayin fifiko** (`getMode`): mai kira `options.mode` → `INJECTION_GUARD_MODE`**DB fasalin-tuta ta soke** (Dashboard → Saituna → Feature Tutoci) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Dashboard override saboda haka yayi nasara akan env vars, don haka Tutocin Feature UI suna sarrafa mai gadi kai tsaye (ba a sake farawa). DB karanta ba shi da aminci: idan ya yi kurakurai, mai gadin ya faɗi baya ga halayen tushen env, kuma lokacin da ba a saita ɗabi'a ta wuce gona da iri daidai da ƙudurin env-kawai.

Tushen ganowa:

1. `sanitizeRequest()` daga `@/shared/utils/inputSanitizer` (saitin gano abin da aka raba da aka yi amfani da shi a wani wuri a cikin bututun).
2. Ginin `DEFAULT_GUARD_PATTERNS` (a halin yanzu `system_override_inline` da `markdown_system_block`, duka `high` tsananin).
3. `customPatterns` na zaɓi ya wuce ta hanyar zaɓuɓɓukan magini ( kirtani, regex, ko bayanan `{ name, pattern, severity }` ).

Lokacin `mode === "block"`** kuma** aƙalla ganowa ɗaya ya dace da madaidaicin madaidaicin, `preCall` ya dawo da `{ block: true, message: "Request rejected: suspicious content detected" }`. A cikin yanayin `warn`/`log` rajistan ayyukan gadi amma yana ba da damar kira. Ana kuma fitar da `evaluatePromptInjection()` mai taimako da aka raba don masu kira waɗanda ke buƙatar kimanta abubuwan da suka faru ba tare da shiga cikin rajista ba.

**Binciken daure (v3.8.20):** mai ganowa kawai yana dubawa** farkon 16 KB** na shigar da sauri — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) a cikin `src/shared/utils/inputSanitizer.ts`. Dukansu `detectInjection()` da `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` kafin gudanar da madauki samfurin. Umarnin allura suna zaune kusa da saman shigarwar, don haka wannan zai iya ɗaukar regex CPU/GC akan nauyin ɗaruruwan-KB masu yawa ba tare da gano rauni ba (cf. #3932, #4041).

### Masker na shaidar (`credentialMasker.ts`)

Yana gudana** duka biyu** matakai, na ƙarshe a cikin tsohuwar sarkar ( fifikon `95`). Yana sake fasalin sanannun maɓallan API-maɓalli / alamar-asiri daga lodin da ake fitarwa (abun saƙo, muhawarar kiran kayan aiki, sakamakon kayan aiki)** kuma** Amsa mai bayarwa, don haka takardar shaidar da aka liƙa a cikin gaggawa (ko aka mayar da ita ta sakamakon kayan aiki) ba a fallasa zuwa ga mai samarwa ko baya ga abokin ciniki.

- **Ficewa kawai** , al'ada iri ɗaya kamar sakewa na PII (Hard Rule #20- kusa): naƙasasshe sai dai idan `settings.credentialRedactionEnabled === true`** ko** `CREDENTIAL_REDACTION_ENABLED=true`. Tare da kashe shi, guardrail no-op — ne wanda baya toshewa kuma baya sake rubutawa.
- `redactCredentials()` yana tafiya da cikakken itacen payload/response (`walkValue()`, prototype-pollution-lafiya, sake zagayowar-lafiya ta hanyar `WeakSet`) kuma ya maye gurbin matches tare da mai sanya `[REDACTED:<type>]`, cloning kawai rassan da suka canza a zahiri.
- `CREDENTIAL_PATTERNS` covers LLM provider keys (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokens (GitHub, Slack, Linear, Notion, npm, Postman, Discord), payment keys (Stripe, Square), cloud keys (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs, credential-bearing connection strings (`mongodb://user:pass@...`, etc.), and a generic `Authorization`/`x-api-key`/`api-key`/`apikey` header-value pattern. Header-shaped keys (`authorization`, `x-api-key`, `api-key`, `apikey`) are redacted structurally (value only, scheme prefix like `Bearer `/`Basic ` preserved) rather than via the generic text regex.
- Titin tsaro ba ya toshewa; kawai yana sake rubutawa (`modifiedPayload` / `modifiedResponse`) da annotates (`meta.credentialsRedacted`, `meta.count`).

Mai gadin koma baya: `tests/unit/credential-masker-guardrail.test.ts`.

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
