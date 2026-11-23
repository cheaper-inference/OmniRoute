# Guardrails (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **ዋና የእውነት ምንጭ:** `src/lib/guardrails/`
> **መጨረሻ የተዘመነው:** 2026-08-29 — v3.8.51 (የVideo Bridge ትራንስክሪፕት መነሻ በጠሪው የሚገለጽ ነው፣
> እስካሁን በሰርቨሩ አልተረጋገጠም — በ#11661 መሠረት ግልጽ ተደርጓል)

Guardrails በOmniRoute እና በላይኛ ደረጃ አቅራቢዎች መካከል ባለው ወሰን ላይ
ደኅንነትን፣ ፖሊሲን እና የይዘት ለውጦችን ያስፈጽማሉ። እያንዳንዱ guardrail
የጥያቄ payload-ዎችን (`preCall`) እና የላይኛ ደረጃ ምላሾችን (`postCall`)
መመርመር (እንዲሁም እንደአማራጭ ውድቅ ማድረግ፣ መለወጥ ወይም ማብራሪያ መጨመር) ይችላል።

ስርዓቱ **fail-open** ነው፦ guardrail በሚፈጸምበት ጊዜ exception ካስነሳ፣ registryው
ጥያቄውን ከማሳካት ይልቅ ስህተቱን መዝግቦ ወደሚቀጥለው guardrail
ይቀጥላል። ማገድ ግልጽ ውሳኔ (`block: true`) እንጂ በአጋጣሚ የሚከሰት አይደለም።

## አብሮገነብ መከላከያዎች

ሬጅስትሪው import ሲደረግ ስድስት መከላከያዎችን በቅድሚያ ተከተል በራስ-ሰር ይጭናል
(`registry.ts` → `registerDefaultGuardrails()`ን ይመልከቱ):

| ቅድሚያ | ስም                  | ደረጃ(ዎች)        | ፋይል                   |
| ---- | ------------------- | -------------- | --------------------- |
| `5`  | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`  | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`  | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10` | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20` | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95` | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

ዝቅተኛ የቅድሚያ ቁጥሮች **መጀመሪያ** ይሰራሉ።

### የምስል ድልድይ (`visionBridge.ts`) — የሞዳሊቲ ድልድይ PR-1

ወደ **ምስልን የማይደግፉ ሞዴሎች** የተላኩ ምስል የያዙ ጥያቄዎችን ያቋርጣል፤ ከዚያም
ጠቅላላውን ጥያቄ ምስልን ወደሚደግፍ ሞዴል እንደገና ያስተላልፋል ወይም ወደ
ላይኛው አገልግሎት ከመደወሉ በፊት የምስል ክፍሎቹን በሚዋቀር የምስል ሞዴል
በተፈጠሩ የጽሑፍ መግለጫዎች ይተካል። ይህም ጽሑፍ-ብቻ የሚደግፉ አቅራቢዎች
ባለብዙ ሞዳሊቲ ውሂቦችን በግልጽነት እንዲያስተናግዱ ያስችላቸዋል።

ፍሰት:

1. የታለመው ሞዴል አስቀድሞ ምስልን የሚደግፍ ከሆነ ይዝለሉ (በግዳጅ-ድልድይ
   ዝርዝር `isVisionBridgeForcedModel` ውስጥ ካልታየ በስተቀር)።
2. የምስል ክፍሎችን በ`extractImageParts(messages)`
   (`visionBridgeHelpers.ts`) ያውጡ፤ ይህም በ`open-sse/utils/mediaParts.ts` ውስጥ ላለው
   **አንድ ወጥ የሚዲያ ፈላጊ** `detectMediaParts()` ሥራውን ይሰጣል — ይህም
   ከጥምር ተኳኋኝነት ማጣሪያው ጋር የሚጋራው ብቸኛ የእውነት ምንጭ ነው።
   ማውጣቱ `replaceImageParts` መልሶ ሊያገናኛቸው በሚችላቸው ቅርጾች
   ከፍተኛ-ደረጃ ክፍሎች ጋር ብቻ እንዲሠራ በፈቃድ ዝርዝር የተገደበ ነው
   (የማውጣት↔የመተካት ውል): OpenAI `image_url`፣ Anthropic base64
   `source.type:"base64"`፣ Anthropic URL `source.type:"url"` እና Responses API
   `input_image`። ውስጥ ለውስጥ የተገኙ ውጤቶች እና አመልካች-ብቻ ቅርጾች
   ለጥምር ማጣሪያው የሚውሉ ሲሆን በፍጹም አይወጡም። ምንም ካልተገኘ
   ይዝለሉ።
3. በ`resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) አማካኝነት የአሂድ-ጊዜ ውቅሩን ይፍቱ፦ አዲሶቹ
   `modalityBridge*` የቅንብር ቁልፎች ቅድሚያ ያገኛሉ፤ የቆዩት `visionBridge*` ቁልፎች
   የ**አንድ-ዙር አማራጭ** (የመልሶ ማገገሚያ ጊዜ) ሆነው ይቀጥላሉ።
   ድልድዩ ከተሰናከለ ማንኛውም የሚዲያ ፍለጋ ከመደረጉ በፊት ይዝለሉ።
4. የሁነታ መራጩ (`modalityBridgeVisionMode`፣ ከታች ያለውን ሰንጠረዥ ይመልከቱ)
   እንደገና ማስተላለፍ ወይም መግለጽ እንደሚኖርበት ይወስናል። እንደገና ማስተላለፍ፣
   `model` ብቻ የተቀየረበትን `modifiedPayload` ከሜታ
   `{ rerouted, fromModel, toModel, imagesKept }` ጋር ይመልሳል።
5. የመግለጫ መንገድ፦ ምስሎችን በ`maxImages` ይገድቡ፣ ተግባርን ያገናዘበውን
   ጥያቄ ይፍጠሩ፣ የመግለጫ መሸጎጫውን ይመልከቱ፣ የምስል ሞዴሉን
   **በትይዩ** (`Promise.allSettled`) ይጥሩ እና በእነርሱ ቦታ
   `[Image N]: <description>` የጽሑፍ ክፍሎችን ያስገቡ። ያልተሳካ መግለጫ
   `null` ያስገኛል እና የመጀመሪያው የምስል ክፍል **ይጠበቃል** (#4012) —
   ነገር ግን ሁሉም መግለጫዎች ባልተሳኩበት የጥምር መግለጫ መንገድ፣
   ምስልን እንደማይደግፍ የተረጋገጠ ላይኛው አገልግሎት በምትኩ
   `(unavailable — no vision-capable provider connected)` ምትክ ጽሑፍ ያገኛል (#8430)።
6. `modifiedPayload` + ሜታ (`imagesProcessed`፣ `descriptions`፣
   `processingTimeMs`፣ `visionModel`) ይመልሱ።

#### የሁነታ መራጭ (`modalityBridgeVisionMode`)

| ሁነታ        | ነባሪ | ባህሪ                                                                                                                                                                                                         |
| ---------- | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔   | የቆየው ግምታዊ አሠራር ሳይቀየር ይቆያል (#6640/#7204)፦ ጥምር ያልሆኑ/`auto/` ሞዴሎች፣ የመጀመሪያው ሞዴል ጥቅም ላይ ሊውሉ የሚችሉ ማረጋገጫዎች ከሌሉት፣ ወደ ምርጡ የምስል ሞዴል እንደገና ይተላለፋሉ (ካሉት ግን ይገልጻል)፤ የጥምር ዒላማዎች ሁልጊዜ ይገለጻሉ።                               |
| `describe` |     | ሁልጊዜ ይገልጻል — የእንደገና ማስተላለፍ ብሎኩ ሙሉ በሙሉ ይዘለላል፤ ተጠቃሚው የመረጠው ሞዴል ሁልጊዜ ይመልሳል።                                                                                                                                    |
| `reroute`  |     | እንደገና ማስተላለፍን ያስገድዳል፦ ማረጋገጫ ያለውን ሞዴል የማቆያ መከላከያ ያልፋል። የእንደገና ማስተላለፍ-**ዒላማ** ማረጋገጫ መከላከያ ግን አሁንም ይተገበራል — ጥቅም ላይ ሊውል የሚችል የምስል ዒላማ ከሌለ፣ ጥሬ ምስሎች ጽሑፍ-ብቻ ወደሚደግፍ የኋላ አገልግሎት እንዳይደርሱ ጥያቄው ወደ መግለጫ ይቀጥላል (#8430)። |

የግዳጅ ሁነታዎች `auto` ግምታዊ አሠራሩ ከመሄዱ **በፊት** ቀድመው ያቋርጣሉ፤
የ`auto` ባህሪ ከPR-1 በፊት ከነበረው መከላከያ ጋር ባይት-ለ-ባይት ተመሳሳይ ነው።

#### የAPI ቁልፍ ወሰን (`visionBridgeKeyScope.ts`)

የጠሪው API ቁልፍ `allowedConnections`፣ የኮታ ስብስቦችን
(`allowedQuotas`) ወይም ሞዴሎችን (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) ሲገድብ፣ ድልድዩ
ቁልፉ መጠቀም የሚችላቸውን የእንደገና ማስተላለፊያ እና የመግለጫ ሞዴሎች ብቻ፣
እንዲሁም ቁልፉ መጠቀም በሚችላቸው ግንኙነቶች ላይ ይመርጣል። ከዚያም የመግለጫ
ጥሪው ሁልጊዜ `x-omniroute-self-loop-key-id` ራስጌን በመጠቀም በOmniRoute
ራስ-ዙር በኩል ያልፋል፤ ስለዚህም ጥያቄውን የሚቀበለው የውይይት ጥያቄ
የዚያን ቁልፍ የግንኙነት እና የሞዴል ፖሊሲ እንደገና ያስፈጽማል።
`enforceApiKeyPolicy()` ያንን ራስጌ ከራስ-ዙር bearer ጋር ብቻ ያከብራል፤
ስለዚህ መዳረሻን ማጥበብ ብቻ ይችላል፣ እንዲሁም የማይፈታ id ውድቅ ይደረጋል።

ለቁልፉ የተፈቀደ የምስል ሞዴል ከሌለ፣ የመግለጫ መንገዱ ወደ ጎን ይላል
እና ጥያቄው ሳይቀየር ያልፋል፤ ይህም ከተሰናከለ መከላከያ ጋር ተመሳሳይ
በስህተት ጊዜ ክፍት የሆነ ባህሪ ነው (ሜታ `{ skipped: true, reason: "no_permitted_vision_model" }`)።
ቁልፍ የሌላቸው ጥያቄዎች እና እነዚህ ገደቦች የሌሏቸው ቁልፎች ልክ እንደበፊቱ
ይሠራሉ።

#### ተግባርን ያገናዘበ የመግለጫ ጥያቄ (`modalityBridgeVisionTaskAware`)

ነባሪው **true** ነው። `composeVisionPrompt()` (`visionBridgeHelpers.ts`) የ**መጨረሻውን የተጠቃሚ መልዕክት** ጽሑፍ (እስከ 500 ቁምፊዎች ተቆርጦ) ወደ መሠረታዊው የመግለጫ ጥያቄ ይጨምራል፤ ይህም መግለጫውን ተጠቃሚው በእውነት ወደጠየቀው ነገር ይመራዋል (`codex-vision-proxy` ንድፍ) እና የራዕይ ሞዴሉ የሚታየውን ጽሑፍ እንዲገለብጥ ይጠይቃል። ጠቋሚው ሲጠፋ — ወይም የተጠቃሚ ጽሑፍ ከሌለ — መሠረታዊው ጥያቄ ሳይለወጥ ጥቅም ላይ ይውላል።

የመግለጫ ራስ-ዙሩ የራሱ OpenAI-ተኳኋኝ ጥያቄ (`callVisionModelSingle()` በ`visionBridgeHelpers.ts` ውስጥ) ሁልጊዜ `image_url.detail: "high"` ይጠይቃል — ያለምንም ቅድመ ሁኔታ፣ ለእያንዳንዱ ጠሪ/አቅራቢ፣ እና በማንኛውም የደንበኛ ምልክት አይገደብም። ዝቅተኛ-ዝርዝር ናሙና መውሰድ ይህ ጥያቄ በትክክል ለሚጠይቀው የጽሑፍ-ግልባጭ ተግባር የOCR ትክክለኛነትን ያዳክማል፤ ስለዚህ ዋናው ገቢ ጥያቄ ምንም ዓይነት የዝርዝር ደረጃ ተጠቅሞ ቢሆንም የመግለጫ ጥሪው ሁልጊዜ ከፍተኛ ዝርዝር ይጠይቃል። ይህ የሚነካው የውስጣዊውን የመግለጫ ጥያቄ አካል ብቻ ነው፤ OmniRoute በዋናው ጥያቄ ላይ የጠሪውን የራሱን `image_url.detail` ወደፊት የሚያስተላልፍበትን መንገድ አይለውጥም — ያ ነባሪ በተናጠል የሚተገበር ሲሆን፣ በ`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) ውስጥ ለተለዩ OpenCode ደንበኞች ብቻ ነው። የመግለጫ ራስ-ዙሩ የAnthropic wire-format ቅርንጫፍ የ`detail` መስክ የለውም፣ እና በሁለቱም ነባሪዎች አይነካም።

#### የመግለጫ ውጤት ገደብ (`modalityBridgeVisionMaxChars`)

| ቁልፍ                            | ነባሪ | ክልል               |
| ------------------------------ | --- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0` | `0` ወይም 100–50000 |

`0` (ነባሪ) ማለት **ገደብ የለም** ማለት ነው — በ`callVisionModel()` የሚመለሰው መግለጫ ሳይለወጥ ይተላለፋል፣ ይህም ያለውን ባህሪ ይጠብቃል። በ100–50000 ክልል ውስጥ ያለ ማንኛውም ዋጋ መግለጫው እንደ `[Image N]: <description>` ተመልሶ ከመክተቱ በፊት በ`…` ቅጥያ ይቆርጠዋል (`VisionBridgeGuardrail.preCall()` በ`src/lib/guardrails/visionBridge.ts` ውስጥ)። ተከታዩ ሞዴል ሙሉውን ግልባጭ በሚፈልግባቸው፣ ብዙ ዝርዝር ላላቸው የOCR ተግባራት ይህን ያሳድጉ፤ ብዙ ጽሑፍ በሚያመነጩ የራዕይ ሞዴሎች ላይ የቶከን አጠቃቀምን ለመገደብ ደግሞ ያሳንሱት። የዳሽቦርዱ መስክ በVision ትሩ Advanced ፓነል ላይ ይገኛል (`modality-bridge-max-chars` በ`ModalityBridgeVisionTab.tsx` ውስጥ)፣ እና ግልጽ የሆነውን `0` ሳይነካ ከ1 እስከ 99 ያለውን ማንኛውንም ዋጋ ወደ 100 ዝቅተኛ ወሰን ያሳድጋል — `0` በራሱ ትክክለኛ የZod ዋጋ ነው (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`)፣ የ“አልተዘጋጀም” ነባሪ ብቻ አይደለም።

#### የመግለጫ መሸጎጫ (`modalityBridge/bridgeCache.ts`)

ለመግለጫ ውጤቶች የሚያገለግል፣ በመላው ፕሮሰስ የሚጋራ የውስጠ-ማህደረ ትውስታ LRU + TTL መሸጎጫ።
ቁልፍ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` ከርዝመት-ቅድመ ቅጥያ ፍሬሚንግ ጋር (የመስክ-ወሰን ግጭቶች የሉም)። የሞዴሉ አካል **የተዋቀረው** bridge ሞዴል ነው፣ በእውነት ምላሽ የሰጠው ሞዴል አይደለም — `callVisionModel` በውስጥ ወደ ተተኪ ሊያልፍ ይችላል፣ እና በእያንዳንዱ ሙከራ ቁልፍ ማዘጋጀት መሸጎጫውን ይበታትነዋል። ያልተሳኩ መግለጫዎች ፈጽሞ አይሸጎጡም። ቅንብሮች፦

| ቁልፍ                             | ነባሪ    | ክልል     |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### የርቀት ምስል ማስተካከያ (የራስ-ዙር መግለጫ/base64 ሰርስሮ ማውጣት)

bridge-ው አንድን **የርቀት** ምስል ራሱ ሲያመጣ — የAnthropic መግለጫ ራስ-ጥሪው እና የclaude-wire-format base64 ልወጣው (`ensureBase64ImagesForClaudeWire`)፣ ሁለቱም በ`visionBridgeHelpers.ts` ውስጥ ባለው `fetchRemoteImageAsDataUri()` በኩል — የተገኘው data URI በራዕይ-ሞዴሉ ጥያቄ ውስጥ ከመካተቱ በፊት በ`normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) ውስጥ ያልፋል። ከመጠን በላይ ትልቅ የሆኑ ምስሎች ወደ **2048px ረጅም ጠርዝ** ዝቅ ተደርገው ይመጠናሉ (OpenAI/Anthropic አስቀድመው በserver-side ከሚተገብሩት የመጠን ለውጥ ገደብ ጋር የሚመሳሰል)፤ ይህም የራዕይ ሞዴሉ የሚያየውን ሳይለውጥ የሰቀላ ባይቶችን/መዘግየትን ይቀንሳል። መጠን መቀየሩ `sharp`ን ይጠቀማል፣ ይህም በdynamic import ይጫናል፦ native binary-ው መጫን በማይችልበት መድረክ ላይ `normalizeDataUri()` **ፈጽሞ ስህተት አይጥልም** — ወደ መጀመሪያዎቹ ባይቶች ቀጥተኛ ማስተላለፍ ይመለሳል፣ ስለዚህ የመግለጫ/base64-ልወጣ መንገዱ ሁልጊዜ መሥራቱን ይቀጥላል። ምስል ያልሆኑ ባይቶች (ሊፈታ የሚችል ምስል ያልመለሰ ሰርስሮ ማውጣት) እንዲሁም ሳይነኩ ይተላለፋሉ። ይህ ማስተካከያ bridge-ው ለራሱ ራስ-ጥሪ በሚያመጣቸው ምስሎች ላይ ብቻ የተወሰነ ነው — ከበጎ ፈቃድ-ብቻ የማሻሻያ መርሕ (Hard Rule #20) ጋር በሚጣጣም መልኩ፣ በጠሪው ጥሬ ቀጥተኛ-ማስተላለፊያ payload ላይ ፈጽሞ አይተገበርም።

#### የቅንብሮች schema + migration

አዲሶቹ `modalityBridge*` ቁልፎች በ`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`) ውስጥ በZod ይረጋገጣሉ፦ `modalityBridgeVisionEnabled`፣ `modalityBridgeVisionMode`፣ `modalityBridgeVisionModel`፣ `modalityBridgeVisionTaskAware`፣ `modalityBridgeVisionPrompt`፣ `modalityBridgeVisionTimeout`፣ `modalityBridgeVisionMaxImages`፣ `modalityBridgeVisionMaxChars`፣ የ`modalityBridgeCache*` ሦስትዮሽ፣ እና በAudio Bridge ጥቅም ላይ የሚውለው የ`modalityBridgeAudio*` ቡድን። Migration `141_modality_bridge_settings.sql` ነባር የቆዩ `visionBridge*` ዋጋዎችን ወደ ተዛማጅ አዲስ ቁልፎች ይቀዳል (idempotent ነው፣ ኦፕሬተር ያዘጋጀውን `modalityBridge*` ዋጋ ፈጽሞ አይተካም)፤ የቆዩ ቁልፎች ለአንድ የልቀት ዙር እንደ የንባብ ተተኪ ተቀባይነታቸውን ይቀጥላሉ።

#### የግልጽነት ራስጌ + ስታቲስቲክስ

በመግለጫ የተለወጡ ምላሾች
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
ይይዛሉ (በ`modalityBridge/bridgeStats.ts` ውስጥ ባለው `buildModalityBridgeHeader()` የተገነባ፣ በ`src/sse/handlers/chatHelpers.ts` ውስጥ ባለው `withModalityBridgeHeader()` የታተመ)። ዳግም መንገድ የተሰጣቸው ጥያቄዎች **ምንም** ራስጌ አያገኙም — payload-ው ሳይነካ የቀረ ሲሆን፣ የሞዴሉ መቀየር በምላሽ አካሉ `model` መስክ ውስጥ አስቀድሞ ይታያል።

`GET /api/modality-bridge/stats` (`GET /api/settings` ጋር ተመሳሳይ ደረጃ ያለው የአስተዳደር ማረጋገጫ) ለ`vision`፣ `audio` እና
`video` በማህደረ ትውስታ ውስጥ ያሉትን የእያንዳንዱ ሞዳሊቲ ቆጣሪዎች
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` ይመልሳል። `averageLatencyMs` እንደ መከፋፈያው ሁሉንም ሙከራዎች ሳይሆን `latencySamples`ን
ይጠቀማል፤ የጊዜ መለኪያ የሌለው ክወና የዜሮ ሚሊሰከንድ
ናሙና አይፈጥርም። `bridged` ለተሳኩ ልወጣዎች ከቀድሞ ስሪቶች ጋር ተኳሃኝ የሆነ ተለዋጭ ስም ሆኖ
ይቆያል፤ ያልተሳኩ ሙከራዎች አይጨምሩትም።
በዲዛይን መሠረት ሂደቱ እንደገና ሲጀመር ቆጣሪዎቹ ዳግም ይጀመራሉ
(ቴሌሜትሪ እንጂ የሂሳብ አያያዝ አይደለም)።

#### የዳሽቦርድ ውቅር

የተለየው የዳሽቦርድ ገጽ
`/dashboard/settings/modality-bridge` ነው። በURL ሊደረስባቸው የሚችሉት `Vision`፣ `Audio`
እና `Video` ትሮች የ`tab` እሴትን በሚቀይሩበት ጊዜ የጥያቄ መለኪያዎችን ጠብቀው ያቆያሉ።
የVision ትሩ ማንቃትን፣ ሁነታን፣ የሞዴል ምርጫን (ራስ-ሰር ነባሪውን ጨምሮ)፣
ለተግባር ግንዛቤ ያለው መመሪያ መስጠትን፣ የላቁ የጊዜ ገደብ/ምስል/የመግለጫ ርዝመት/መሸጎጫ
ገደቦችን፣ የአሂድ ጊዜ
ቆጣሪዎችን እና ጥበቃ ያለው የናሙና ጥያቄን ያቀርባል። የAudio ትሩም ንቁ ነው፦
ማንቃትን፣ Auto ያለው STT-ብቻ የሞዴል መራጭን፣ የጊዜ ገደብ/ከፍተኛ የቅንጥብ ገደቦችን፣ የድምፅ
ቆጣሪዎችን እና የ`input_audio` ናሙና ሙከራን ያቀርባል። የVideo ትሩ ተግባራዊ ነው፦
የFFmpeg/ffprobe የአሂድ ጊዜ ሁኔታን ያሳያል — ከአራት ግልጽ የUI ሁኔታዎች አንዱ (`unknown` ምርመራው
በመካሄድ ላይ ሳለ ወይም መጠናቀቅ ሳይችል፣ `restricted` ሉፕባክ ባልሆነ
የዳሽቦርድ አስተናጋጅ ላይ ምርመራው በደንበኛ በኩል ሲዘለል፣ `unavailable` ምርመራው ከተካሄደ
እና አለመኖሩ ከተረጋገጠ በኋላ፣ ወይም `available` ከFFmpeg/ffprobe ስሪቶች ጋር) — የማንቃት/ሞዴል/ፍሬም/ቪዲዮ/ጊዜ ገደብ
ቅንብሮችን በቋሚነት ያስቀምጣል፣ የሞዴል መራጩን ቪዥን መቀበል በሚችሉ
ሞዴሎች ላይ ብቻ ያጣራል፣ እንዲሁም የቪዲዮ ቆጣሪዎችን ያቀርባል።

ቀድሞ በAI ቅንብሮች ስር የነበረው Vision Bridge ካርድ አሁን ወደ
አዲሱ ገጽ የሚወስድ የተኳሃኝነት አገናኝ ነው፤ ከእንግዲህ የቅጹን ሁለተኛ ቅጂ አያስተዳድርም። Media Providersም
ነባሩን Speech-to-Text playground ሳያስወግድ Image-to-Text እና Speech-to-Text የሥራ ፍሰቶችን ከሚዛመዱት Modality
Bridge ትሮች ጋር ያገናኛል።

**ራስ-ሰር ሉፕ የመግቢያ ማለፊያ፦** የመግለጫ ጥሪው በOmniRoute ራሱ
`/v1` ራስ-ሰር ሉፕ (መደበኛ ያልሆነ የአቅራቢ ሞዴል) በኩል ሲዘዋወር፣ ንዑስ ጥያቄው
`x-omniroute-admission-bypass: internal`ን ይልካል እና በተፈታው
የራስ-ሰር ሉፕ ማረጋገጫ መረጃ ይረጋገጣል — በአካባቢያዊ ሁነታ የአካባቢው `sk_omniroute` sentinel፣ ወይም
በኦፕሬተሩ የተዋቀረው `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env ቁልፍ (#1350)፤ በዚህም
`REQUIRE_API_KEY=true` ያላቸው ማሰማሪያዎች እንኳ የመግለጫ ጥሪውን ማስኬድ ይችላሉ። ማለፊያው
የሚከበረው ለእነዚያ ትክክለኛ ማረጋገጫ መረጃዎች ብቻ ነው፤ ስለዚህ ውጫዊ ደንበኞች የመግቢያ ቁጥጥርን ለመዝለል
ራስጌውን መጠቀም አይችሉም።

የቆዩ ነባሪዎች በ`src/shared/constants/visionBridgeDefaults.ts` ውስጥ ይገኛሉ፤
አዲሶቹ የሁነታ/ለተግባር ግንዛቤ ያለው/መሸጎጫ ነባሪዎች እና የቅንብሮች ፈቺው
በ`src/shared/constants/modalityBridgeDefaults.ts` ውስጥ ይገኛሉ። የጥበቃ ስርዓቱ
ሙከራዎች ሐሰተኛ የ`getSettings` እና
`callVisionModel` ትግበራዎችን ማስገባት እንዲችሉ የ`deps` constructor አማራጭን ያቀርባል።

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

ድምፅ የያዙ የውይይት ጥያቄዎች የድምፅ ግብዓትን እንደሚቀበል ወዳልታወቀ ዒላማ ከመድረሳቸው በፊት ያቋርጣቸዋል።
የውይይት ጥያቄውን በፍጹም ወደ ሌላ አቅጣጫ አይመራም፦ የድምፅ ክፍሎች
በነባሩ OpenAI-ተኳሃኝ multipart endpoint በኩል ወደ ጽሑፍ ይቀየራሉ፣ እና የተመረጠው
የውይይት ሞዴል በጽሑፍ ቅጂዎቹ ይቀጥላል።

ፍሰት፦

1. `supportsAudio`ን በ`getResolvedModelCapabilities()` በኩል ይፍቱ። ግልጽ
   የአቅራቢ-መዝገብ ሜታዳታ ቅድሚያ ይኖረዋል፣ ቀጥሎ የማይለወጥ የሞዴል ሜታዳታ፣ ከዚያም የተመሳሰለው
   `modalities_input` ይከተላል። `audio`ን ያልያዘ የታወጀ የግብዓት ዝርዝር `false` ነው፤
   ምንም የችሎታ ማስረጃ ከሌለ `null` ይሆናል። `false` እና `null` ሁለቱም
   ጥንቃቄ የተሞላበትን ድልድይ ያነቃሉ፣ `true` ግን ያልፈዋል።
2. የ`modalityBridgeAudio*` ቅንብሮችን ይፍቱ እና በጋራው `detectMediaParts()`
   መፈለጊያ አማካኝነት ከእያንዳንዱ መልዕክት ሊቆራረጡ የሚችሉ ከፍተኛ-ደረጃ
   የድምፅ ክፍሎችን ያውጡ። የሚደገፉ የውሂብ ማስተላለፊያ ቅርጾች OpenAI `input_audio`፣ `audio_url` እና
   `source.media_type: "audio/*"` ናቸው። በውስጥ የተዋሃደ ድምፅ ለማዘዋወር ይገኝበታል፣ ነገር ግን
   በመቆራረጫ መንገዱ አይወገድም። ሥራው በ`modalityBridgeAudioMaxClips`
   ይገደባል፤ በኋላ ያሉ ክፍሎች ሳይነኩ ይቀራሉ።
3. የተዋቀረ `provider/model`ን ያክብሩ፣ ወይም `selectAudioBridgeModel()` በተረጋጋ
   የካታሎግ ቅደም ተከተል `AUDIO_TRANSCRIPTION_PROVIDERS`ን እንዲያልፍ እና ጥቅም ላይ ሊውል የሚችል
   ንቁ የአቅራቢ ማረጋገጫ መረጃ ያለውን የመጀመሪያ ሞዴል እንዲመርጥ ያድርጉ።
4. `callAudioTranscription()` base64/data-URI ድምፅን ወደ multipart
   `file` ይቀይራል፣ ወይም የርቀት `audio_url`ን DNS pinning እና የ25 MB ገደብ ባለው
   ለሕዝብ-ብቻ በሚፈቅደው የወጪ ጥያቄ ጥበቃ በኩል ያወርዳል። ከዚያም ፋይሉን እና የተመረጠውን
   ሞዴል በ`resolveSelfLoopBearer()` በተረጋገጠው የአካባቢው `/v1/audio/transcriptions` ራስ-ሰር ሉፕ ላይ POST ያደርጋል። ነባሩ የጽሑፍ ቅጂ መንገድ መደበኛ
   የማረጋገጫ መረጃ ፍለጋን፣ የማቀዝቀዣ/የተመን ገደብ አያያዝን እና የአቅራቢ ማስተላለፍን ያከናውናል።
5. የተሳኩ ጥሪዎች ክፍሎቻቸውን በ`[Audio N]: <transcript>` ይተካሉ። ጥሪዎች
   በ`Promise.allSettled` ይሰራሉ፦ የአንድ ጥሪ ውድቀት ያንን የመጀመሪያውን
   የድምፅ ክፍል ይጠብቃል (#4012 ውል)። ሁሉም ጥሪዎች ካልተሳኩ እና ዒላማው
   `supportsAudio === false` መሆኑ ከተረጋገጠ፣ ክፍሎቹ
   `[Audio N]: (unavailable — no STT provider connected)` ይሆናሉ (#8430 ውል)።
   ለማይታወቅ ዒላማ (`null`)፣ ሁሉም ያልተሳኩበት ውጤት ሳይነካ ይቀራል።
   ጥቅም ላይ ሊውል የሚችል የSTT ማረጋገጫ መረጃ የሌለው፣ ጽሑፍ-ብቻ እንደሚደግፍ የተረጋገጠ ዒላማ
   የአውታረ መረብ ጥሪ ሳያደርግ ተመሳሳዩን ግልጽ stub ይቀበላል።

የተሳኩ የጽሑፍ ቅጂዎች በሂደቱ አጠቃላይ የሆነውን Modality Bridge LRU/TTL መሸጎጫ ይጠቀማሉ።
ቁልፉ የድምፅ ማጣቀሻውን፣ ቋሚውን `audio-transcription` የክወና
መለያ እና የተመረጠውን STT ሞዴል ያጣምራል፤ ውድቀቶች ፈጽሞ አይሸጎጡም። የድምፅ ሙከራዎች
የጋራ `bridged`፣ `cacheHits`፣ `failures` እና `lastUsedAt` ቆጣሪዎችን ያዘምናሉ።
የተለወጡ ምላሾች
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`ን ይይዛሉ፤ ያልተነኩ
ጥያቄዎች የAudio Bridge ክፍል አይቀበሉም።

የአሂድ ጊዜ ቅንብሮች በDB የተደገፉ እና በZod የተረጋገጡ ናቸው፦

| ቁልፍ                           | ነባሪ     | ክልል             |
| ----------------------------- | ------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —               |
| `modalityBridgeAudioModel`    | `""`    | Auto ወይም STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10            |

የጋራ መሸጎጫው አሁንም በ`modalityBridgeCacheEnabled`፣
`modalityBridgeCacheTtlMinutes` እና `modalityBridgeCacheMaxEntries` ይቆጣጠራል።

### የቪዲዮ ድልድይ (`videoBridge.ts`, `videoBridgePipeline.ts`)

የታወቀ ቤተኛ የቪዲዮ ድጋፍ የሌለው ዒላማ ከመጠራቱ በፊት፣ በChat Completions `messages` እና Responses
API `input` ውስጥ ያሉ ከፍተኛ-ደረጃ የቪዲዮ ክፍሎችን ይጠልፋል።
የሚደገፉ ቅርጾች `input_video`፣ `video_url`፣ `video_source`፣ HTTPS URLs
እና `data:video/*;base64,...` የውሂብ URIs ናቸው። በጽሑፍ ውስጥ ያሉ ተራ የፋይል ስሞች
እንደ ቪዲዮ አይቆጠሩም።

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) የጥያቄውን ዳሰሳ፣
የችሎታ/ፖሊሲ ማረጋገጫ፣ በእያንዳንዱ ጥያቄ የሚደረገውን ድምር እና የምላሽ ጭነቱን ይቆጣጠራል።
የእያንዳንዱ ቪዲዮ ሥራ — ማግኘት፣ የሙሉ ውጤት መሸጎጫ፣ የፍሬም
ቅደም ተከተልን መግለጽ (ይህም ጠሪው የገለጸውን የድምፅ ግልባጭ ያዋህዳል)፣ እንዲሁም በእያንዳንዱ ሙከራ
የሚደረጉ መለኪያዎች/ማቋረጥ/ማጽዳት — በ`videoBridgePipeline.ts` ውስጥ ካለው `processVideoPart` ጀርባ ተደብቋል፤
ይህም በ`preCall` ዑደት ውስጥ ለእያንዳንዱ የቪዲዮ ክፍል አንድ ጊዜ ይጠራል።
ያ ሞጁል ግልጽ የወደብ ወሰኖችንም ይገልጻል፦ `VideoMediaBrokerPort`
(ባይቶችን ማግኘት እና ናሙና የተወሰዱ ፍሬሞችን ማውጣት)፣ `VideoAudioTranscriptionPort`
(ጠሪው የገለጸውን የድምፅ ግልባጭ ከናሙና መግለጫዎቹ ጋር ማዋሃድ) እና
`VideoDrilldownPort` (የፍሬም ዝርዝር ትንተና የዘላቂነት ወሰን፤ እስካሁን ከ`processVideoPart` ጋር አልተገናኘም — በአሁኑ ጊዜ የዝርዝር ትንተና ግቤቶችን የሚጽፈው የተለየው
`/api/modality-bridge/video/drilldown` መስመር ብቻ ነው)።

ይፋዊው `/v1` የጥያቄ መንገድ ንዑስ ሂደትን ፈጽሞ አያስመጣም ወይም አይጠራም። የርቀት
ቪዲዮዎች በ50 MiB ገደብ ውስጥ ይወርዳሉ፤ የመስመር-ውስጥ base64 ቪዲዮዎች የሞዴል/መልዕክቶች/ፍሬሚንግ መያዣው
በ50 MiB ይፋዊ የJSON ጥያቄ መቀበያ ገደብ ውስጥ እንዲቆይ፣ ለእያንዳንዱ ቪዲዮ 36 MiB የሆነ ጥንቃቄ የተሞላበት ዲኮድ የተደረገ ገደብ አላቸው። የመስመር-ውስጥ
ርዝመት እና ዲኮድ የተደረገ መጠን ግምቶች ምደባ ከመደረጉ በፊት ይረጋገጣሉ። በመጀመሪያው የርቀት URL እና በእያንዳንዱ ዳግም አቅጣጫ ላይ HTTPS ያስፈልጋል፤ ይህም DNS ማስተካከያ ያለውን ነባሩን
ይፋዊ-ብቻ ወደ ውጭ የሚላክ ጥበቃ ይጠቀማል። ከዚያ ባይቶቹ ትክክለኛውን ውስጣዊ
`POST /api/modality-bridge/video/extract` የደላላ ወሰን ይሻገራሉ። ያ መስመር `LOCAL_ONLY` እና `SPAWN_CAPABLE` ሁለቱም ሲሆን፣ በእያንዳንዱ ሂደት የተረጋገጠና
የታመነ-loopback ጥያቄን ብቻ ይቀበላል፤ URL፣ የፋይል ስርዓት ዱካ፣ ተፈጻሚ ፋይል
ወይም የአርግዩመንት ዝርዝር ፈጽሞ አይቀበልም። የAPI የሰውነት-መጠን ፓይፕላይን እና የአስተናጋጁ ጭማሪያዊ የሰውነት
አንባቢ እያንዳንዳቸው በግላቸው የ50 MiB የደላላ ግብዓት ገደብን ያስፈጽማሉ። የተገደበው ወረፋው
በአንድ ጊዜ አንድ ማውጣት ያከናውናል፣ አራት በመጠባበቅ ላይ ያሉ ሥራዎችን ይፈቅዳል፣ እና በመጠባበቅ ላይ ያለውን ግብዓት በ100 MiB ይገድባል።

በደላላው ውስጥ `ffprobe` የግል አካባቢያዊ ፋይልን ያነባል፤ ቋሚው የቅርጸት
ፍቃድ ዝርዝር የአጫዋች ዝርዝር እና የማኒፌስት ቅርጸቶችን አያካትትም። ለተፈቀዱ MOV-family
መያዣዎች፣ ውጫዊ የMOV ውሂብ ማጣቀሻዎች በነባሪነት እንደተሰናከሉ ይቆያሉ፣ እና ቋሚው ትዕዛዝ እነሱን አያነቃም። `ffprobe` እና `ffmpeg` ሁለቱም
የ`file`-ብቻ ፕሮቶኮል ፍቃድ ዝርዝር፣ አንድ ክር፣ ቋሚ የአርግዩመንት ድርድሮች፣ ያለ shell፣
እና ከ`PATH` የተፈቱ ተፈጻሚ ፋይሎችን ይጠቀማሉ። እንደ ሽፋን የተያያዙ የምስል ዥረቶች
ሊጫወቱ የሚችሉ እጩዎች አይደሉም። ሁሉም ሊጫወቱ የሚችሉ ዥረቶች ገደቦቹን ማሟላት አለባቸው፣ እና
ከወጥ በሆነው ዝቅተኛ-መረጃ ጠቋሚ የአማራጭ ምርጫ በፊት በግልጽ የተቀመጠ ነባሪ ዥረት ይመረጣል። ቪዲዮዎች በ600 ሰከንድ፣ በእያንዳንዱ ልኬት 8,192 ፒክሰሎች፣ እና
33,554,432 የምንጭ ፒክሰሎች ይገደባሉ። FFmpeg 1–16 የመካከለኛ ነጥብ JPEG ፍሬሞችን ናሙና ይወስዳል፣ ትናንሽ ግብዓቶችን ወደ ላይ ሳያሳድግ ረጅሙን ጠርዝ እስከ 1,024 ፒክሰሎች ድረስ ይቀንሳል፣ እና URL ፈጽሞ አይቀበልም። ናሙና አወሳሰድ በነባሪ `uniform` ነው። አማራጭ የሆኑት
`scene_aware` እና የሙከራ `segment_aware` ፖሊሲዎች አስቀድሞ በተረጋገጠው አካባቢያዊ ዥረት ላይ አንድ ተጨማሪ
ቋሚ FFmpeg ማለፊያ ያከናውናሉ፣ የተገደቡ `showinfo` የትዕይንት ጊዜ ማህተሞችን ይመርጣሉ፣ እና የመለያ መሣሪያ ሲወድቅ፣ ጊዜው ሲያልፍ፣ ውጤቱ ቅርጸት ሲበላሽ ወይም
የእጩዎች ስብስቡ ባዶ ሲሆን በወጥነት ወደ ተመሳሳዩ እኩል የመካከለኛ ነጥቦች ይመለሳሉ። የክፍል-ግንዛቤ ሁነታ የመካከለኛ ነጥብ ናሙናዎችን ከተረጋገጡት የትዕይንት ክፍተቶች ጋር ተመጣጣኝ በሆነ መልኩ ይመድባል፤ የክፍል-ግንዛቤ ማስረጃ እና የአማራጭ መመለሻ ባህሪ
ከታች በዝርዝር ተገልጸዋል። ጥብቁ የ16-ፍሬም ገደብ
በእያንዳንዱ ፖሊሲ ውስጥ ከምርጫው በኋላ ይተገበራል። የትዕይንት-ግንዛቤ ጥያቄ የአንድ ፍሬም በጀት ብቻ ሲኖረው፣ የነቃውን የሙሉ ቪዲዮ ወይም የትኩረት መስኮት እኩል መካከለኛ ነጥብ ይጠቀማል እና `policyEffective: uniform` ብሎ ያሳውቃል፦ አንድ የተመረጠ የትዕይንት ፍሬም
ሁለቱንም የጊዜ ጫፎች ማቆየት አይችልም። ጠሪው እንደ አማራጭ ውሱን የትኩረት መስኮት (`start`/`end` ሰከንዶች) ሊያቀርብ ይችላል፤ ወሰኖች በሚዲያው ቆይታ መሠረት ይገደባሉ፣ የተገለበጡ ወይም ውሱን ያልሆኑ መስኮቶች ውድቅ ይደረጋሉ፣ እና ሁሉም የናሙና አወሳሰድ
ፖሊሲዎች በመደበኛ ሁኔታ በተስተካከለው ክፍተት ውስጥ ብቻ ይከናወናሉ። የሚገኘው
መስኮት በናሙና አወሳሰድ ሜታዳታ እና ታማኝ ባልሆነው የመግለጫ
ቅድመ ቅጥያ ውስጥ ይካተታል፤ በዚህም የታችኛው ደረጃ ሞዴሎች በትኩረት የተመረጠን ቅንጭብ ከሙሉው
የጊዜ መስመር መለየት ይችላሉ።

የትርጉማዊ መግለጫ ትኩረት የተለየ፣ ግልጽ ቅንብር ነው። ነባሪው `full`
የትንተና ሁነታ ነባሩን የፍሬም ጥያቄ ያቆያል፣ እና የጥያቄ ጽሑፍን ወደ መግለጫ ሞዴሉ ፈጽሞ አያስተላልፍም።
በ`focused` ሁነታ፣ ድልድዩ ከተመሳሳዩ Chat ወይም Responses
መያዣ ውስጥ በተጠቃሚው የተጻፈውን የቅርብ ጊዜ ባዶ ያልሆነ `text`/`input_text` ብቻ ያነባል፣ ወደ NFC መደበኛ ያደርገዋል፣ የመቆጣጠሪያ ቁምፊዎችን እና ክፍተቶችን ያጣምራል፣
እና በ500 Unicode የኮድ ነጥቦች ይገድበዋል። ባዶ ውጤት ወደ ትክክለኛው `full` ጥያቄ ይመለሳል።
ጠቃሚ ፍንጭ እንደ JSON በተለየ
ታማኝ-ያልሆነ-የተጠቃሚ-አውድ ብሎክ ውስጥ ይደራጃል፣ እና ሊታዩ ለሚችሉ ዝርዝሮች ብቻ ቅድሚያ ሊሰጥ ይችላል፤ በሚዲያው ውስጥ የሚታዩ ወይም የሚሰሙ መመሪያዎችን ላለመከተል የተሰጠውን የተለየ ማስጠንቀቂያ መሻር አይችልም። ጽሑፋዊ ትኩረት `start`/`end`ን ፈጽሞ አይገምትም ወይም
የጊዜ ናሙና ወሳጁን አይለውጥም።

#### FU-07 መዋቅራዊ የክፍል ማስረጃ

`segment_aware` አስቀድሞ በተረጋገጠው የአካባቢ ቪዲዮ ዥረት ላይ አንድ የተገደበ የቅድመ-ትንተና ሂደት ይጠቀማል። ቋሚው የማጣሪያ ሰንሰለት መጀመሪያ ስፋቱን ቢበዛ ወደ 320 ፒክሰሎች ይመጥናል፣ የትዕይንት ለውጦችንና የቀዘቀዙ ክፍተቶችን ይለያል፣ ከዚያም ለብዥታ፣ አማካይ ሉማ እና ለቦታዊ/ጊዜያዊ መረጃ በሰከንድ 1 ፍሬም ናሙና ይወስዳል። ሂደቱ በ600 መዋቅራዊ ናሙናዎች፣ በአንድ FFmpeg/ማጣሪያ ትሬድ፣ በተመሳሳዩ `file`-ብቻ ፕሮቶኮልና የኮንቴይነር የተፈቀዱ ዝርዝሮች፣ በ1 MiB የሂደት-ውጤት ገደብ፣ እንዲሁም በደላላው የጋራ ማቋረጫ/የጊዜ ገደብ ውስጥ ቢበዛ በ30 ሰከንዶች ይገደባል። ከጥያቄው ምንም ትዕዛዝ፣ ማጣሪያ፣ ዱካ ወይም URL ፈጽሞ አይቀበልም።

መዋቅራዊ እሴቶቹ የሚወሰኑ የናሙና ማስረጃዎች እንጂ የቪዲዮ ፍቺያዊ ግንዛቤ አይደሉም። ርዕሰ ጉዳዮችን፣ ድርጊቶችን፣ መግለጫ ጽሑፎችን፣ ንግግርን ወይም የተጠቃሚ ዓላማን አይገምቱም። የትዕይንትና የመቀዝቀዝ ድንበሮች ክፍሎችን ይፈጥራሉ፤ የመቀዝቀዝ ሽፋን፣ ብዥታ፣ ብርሃን ተጋላጭነት፣ ቦታዊ ዝርዝር እና ጊዜያዊ ለውጥ ነባሩ የ1–16 ፍሬም በጀት እንዴት እንደሚመደብ ብቻ ተጽዕኖ ያደርጋሉ። ሙሉ በሙሉ የቀዘቀዘ ክፍል ቢበዛ አንድ ፍሬም ያገኛል፣ ያልቀዘቀዙ ክፍሎች ግን ለቀረው በጀት ይወዳደራሉ። የድንበሮች ብዛት ከፍሬሞች ሲበልጥ፣ በመጀመሪያ ያሉ ፈጣን መቆራረጦች ረጅሙን የመጨረሻ ክፍል መደበቅ እንዳይችሉ ወጥ የጊዜ መስመር ሽፋን ይጠበቃል። ከመቀዝቀዝ ድንበር የ1-ሰከንድ የትንተና ጥራት ውስጥ ያሉ የትዕይንት ድንበሮች ይዋሃዳሉ።

የጎደሉ ማጣሪያዎች፣ የተበላሸ/ባዶ ማስረጃ፣ የመለያ ስህተት ወይም የተገደበው የቅድመ-ትንተና ጊዜ ማብቂያ በትክክል ወደ ወጥ የመካከለኛ ነጥብ ፖሊሲ በክፍት ሁኔታ ይመለሳሉ። የጠሪ ማቋረጥ ወይም የደላላ የጊዜ ገደብ ግን በክፍት ሁኔታ አይመለስም፤ በሂደት ላይ ያለውን ንዑስ ሂደት ያቋርጣል፣ ቀጣይ ፍሬም ማውጣትን ይከለክላል፣ እንዲሁም የግል ጊዜያዊ የማውጫ ዛፉ በ`finally` ውስጥ ይወገዳል።

`scripts/perf/video-bridge-fu07-eval.ts` ከተደጋጋሚነት ማስወገድ በኋላ ለሚገኝ የመግለጫ ጽሑፍ-ጥሪ ቁጠባ፣ ለጥቅጥቅ እንቅስቃሴ በጀት ምደባ፣ ለብዥታ/ብርሃን ተጋላጭነት/SI-TI ማስረጃ፣ ረጅም የመጨረሻ ክፍል ላላቸው ፈጣን መቆራረጦች እና ቀስ በቀስ የመደብዘዝ ሐሰተኛ አዎንታዊ ውጤቶች የሚወሰኑ እውነተኛ FFmpeg የሙከራ ውሂቦችን ያመነጫል። የቅድመ-ትንተና የግድግዳ ሰዓት ጊዜን እና፣ `/usr/bin/time` በሚገኝበት ቦታ፣ የልጅ ሂደት CPU እና ከፍተኛውን RSS ይመዘግባል። የጥራት ፍተሻዎቹ መዋቅራዊ ኦራክሎች ብቻ ናቸው። ይህ የሙከራ መዋቅር የተፈቀደ መጨረሻ ነጥብ ወይም የቀዘቀዘ ዳኛ ስለሌለው፣ የእውነተኛ መግለጫ ጽሑፍ ሞዴል ጥራት `HOLD` ሆኖ ይቀራል። `--caption-cost-per-call-usd` ግልጽ አዎንታዊ የአንድ ጥሪ ወጪ ግምት ካላቀረበ በስተቀር የገንዘብ ቁጠባም `HOLD` ሆኖ ይቀራል፤ ስክሪፕቱ ከሁለቱም ውጤቶች አንዱንም ፈጽሞ አይፈበርክም።

እያንዳንዱ ፍሬም በ4 MiB፣ ሁሉም ጥሬ ፍሬሞች በአንድነት በ23 MiB፣ እንዲሁም ተከታታይ ቅርጽ የተሰጠው የደላላ ምላሽ በ32 MiB ይገደባሉ። የግል ጊዜያዊ ማውጫ በ`finally` ውስጥ ይወገዳል። OmniRoute FFmpegን አብሮ አያቀርብም፣ ብጁ የሚፈጸም ፋይል ዱካም አይቀበልም። መግለጫ ጽሑፍ ከማመንጨቱ በፊት፣ ድልድዩ ጥንቃቄ የተሞላበት የእይታ ተደጋጋሚነት ማስወገጃ ሂደት ይተገብራል፤ እያንዳንዱ JPEG ወደ 16×16 ግራጫ-ደረጃ ቋት ይቀነሳል እና ከመጨረሻው ከተያዘው ፍሬም ጋር ብቻ ይነጻጸራል። ከአንድ ፍሬም በላይ ለተጠየቀ የመግለጫ ጽሑፍ በጀት፣ ማውጣቱ እስከ በጀቱ ሁለት እጥፍ ድረስ ነገር ግን ፈጽሞ ከ16 ፍሬሞች የማይበልጥ የተገደበ የእጩዎች ስብስብ ያቀርባል። የተጠየቀው ገደብ የሚተገበረው ተደጋጋሚነትን ካስወገዱ በኋላ ብቻ ሲሆን፣ በጀቱ ቢያንስ ሁለት በሚሆንበት ጊዜ የመጀመሪያውና የመጨረሻው የተመረጡ እጩዎች በመጨረሻው ማቅጠን ወቅት ይጠበቃሉ። ስሪት ያለው `grayscale-16x16-mean-cells-v2` ፖሊሲ ከአማካይ ሉማ ልዩነት ወይም መደበኛ የተደረገው ልዩነታቸው ቢያንስ 0.05 ከሆነው የጥፍር አክል ሕዋሳት ሬሾ የሚበልጠውን ይጠቀማል። የተደጋጋሚነት መወሰኛው ቋሚ 0.04 ሲሆን፣ እንደ የአሂድ ጊዜ ቅንብር ከመቅረብ ይልቅ ሊተነበይ እንዲችል ተመርጧል። ይህ ሁለተኛ ከፍተኛ-ንፅፅር ምልክት በአማካይ-ብቻ ንጽጽር ሊደበቁ የሚችሉ አነስተኛ እንቅስቃሴዎችንና የሚታዩ የጽሑፍ ለውጦችን ይጠብቃል። የአነጻጻሪ ወይም የዲኮደር ስህተቶች በክፍት ሁኔታ ይመለሳሉ እና ሽፋኑን ይጠብቃሉ። የውጤት ሜታዳታ የወጡ እጩዎችን፣ በተሳካ ሁኔታ ጥቅም ላይ የዋሉ ፍሬሞችን እና የተወገዱ የእይታ ተደጋጋሚዎችን ለይቶ ያሳያል።

በግልጽ ምልክት የተደረገበት የቪዲዮ ክፍል የጊዜ ማህተም ያለው የእውቂያ ሉህ ሊጠይቅ ይችላል። ድልድዩ ቢበዛ ባለ4-ዓምድ፣ 16-ፍሬም JPEG ፍርግርግ ይገነባል። እያንዳንዱ ባለ512-ፒክሰል ሕዋስ የምንጩን የጊዜ ማህተም በከፍተኛ-ንፅፅር የታችኛው ንጣፍ ላይ በቋሚነት ያትማል፤ ተመሳሳዮቹ የጊዜ ማህተሞች ለቀጣይ ደረጃ ማዛመድና ኦዲት በጽሑፋዊ ሜታዳታ ውስጥም ይቆያሉ። ሙሉው JPEG በ32 MiB እንደተገደበ ይቆያል። `sharp` ፍርግርጉን ዲኮድ ማድረግ ወይም ማቀናበር ካልቻለ፣ ድልድዩ ወደ እያንዳንዱ JPEG ፍሬም ይመለሳል፤ የደንበኛ ማቋረጥ ግን አሁንም በሉህ ክዋኔው ውስጥ ይተላለፋል።

የማስተዋወቅ ማስረጃ ሆን ተብሎ ከሰው ሠራሽ የቅንብር ጥቃቅን የአፈጻጸም ሙከራ ተለይቷል። `scripts/perf/video-bridge-contact-sheet-eval.ts` ለእውነተኛ OpenAI-ተኳኋኝ የእይታ ሞዴሎች በመርሐግብር-ስሪት የተወሰነ A/B የሙከራ መዋቅር ይገልጻል። በአቅራቢው የተዘገቡ ቶከኖችን፣ ከጫፍ እስከ ጫፍ የግድግዳ ሰዓት መዘግየትን (የሉህ ቅንብርን ጨምሮ)፣ የሞዴል ጥሪ ብዛትን እና በማኒፌስት የተገለጸ የእውነታ ማቆየትን ይለካል። ጥሬ የሞዴል ምላሾች ወደ ሪፖርቱ አይጻፉም፤ የሚቀመጡት SHA-256 ዳይጀስቶችና የተዛመዱ የእውነታ IDዎች ብቻ ናቸው። `--execute-real` ካልተላለፈ እና `--model`፣ `OMNIROUTE_BASE_URL` እና `OMNIROUTE_API_KEY` ካልተዋቀሩ በስተቀር የሙከራ መዋቅሩ ምንም የአውታረ መረብ ወይም የሚከፈልበት የሞዴል ጥሪ አያደርግም። ያ ግልጽ እውነተኛ አሂድ ከሌለ፣ በማሽን ሊነበብ የሚችለው ፍርዱ `HOLD` ሆኖ ይቀራል፤ ሰው ሠራሽ የይዘት/የጥሪ-ብዛት መለኪያዎች ብቻቸውን የማስተዋወቅ ማስረጃ አይደሉም።

ጠሪዎች አስቀድመው የተመሳሰለ ጽሑፍ ሲኖራቸው፣ ከሚደገፍ የቪዲዮ ክፍል ጋር አማራጭ `transcript.cues` ድርድር ማያያዝ ይችላሉ። እያንዳንዱ ፍንጭ `text`ን፣ በተመረመረው ቆይታ ውስጥ ያለ ውሱን `start`/`end` ክፍተትን እና በተፈቀደ ዝርዝር ውስጥ ያለ `source` (`client`፣ `embedded` ወይም `audio-bridge`) መያዝ አለበት፤ `confidence` ነባሪው `1` ሲሆን በ`0` እና `1` መካከል መቆየት አለበት። በትክክል ተመሳሳይ የሆኑ ፍንጮች ይዋሃዳሉ። OmniRoute ከዚህ ሜታዳታ የጽሑፍ ቅጂ ማዘጋጀትን ፈጽሞ አይጀምርም፤ የተረጋገጡ ፍንጮች ከምንጫቸው፣ ከእምነት ደረጃቸው እና ከጊዜ ክፍተታቸው ጋር ወደተገለጸው ውጤት ይቀዳሉ፣ እንዲሁም ከፍሬም መግለጫ ጽሑፎች ጎን እንደማይታመኑ ምልከታዎች ይቀርባሉ። ልክ ያልሆነ፣ ከክልል ውጭ የሆነ ወይም መነሻ የሌለው ጽሑፍ ከመግለጫ ጽሑፍ ዥረቱ ጋር ከመቀላቀል ይልቅ ውድቅ ይደረጋል። ሁለቱም የጥያቄ-አካል የጽሑፍ ቅጂ ቻናሎች በራስ የተገለጹ `embedded` ወይም `audio-bridge` መለያዎችን ጨምሮ፣ የቀረበውን መነሻ ወደ `client` መደበኛ ያደርጋሉ። እነዚያን የታመኑ መለያዎች በኮድ-ብቻ `trustedSource` ነጋሪ እሴት ሊመድብ የሚችለው በአገልጋዩ ባለቤትነት የሚተዳደር አስማሚ ብቻ ነው፤ የጥያቄ JSON መስክ ወደዚያ ነጋሪ እሴት ሊደርስ አይችልም። የጽሑፍ ቅጂ ጽሑፍ መነሻው ምንም ይሁን ምን ካልታመነ ሚዲያ የተገኘ ይዘት ሆኖ ይቀጥላል፣ እና ፈጽሞ ፈቃድ መስጠትን መወሰን የለበትም።

የላቀ ጥሪ አድራጊ ለተመሳሳዩ ቪዲዮ `audioTranscript` ትራክ ሊያቀርብ ይችላል፤
ይህ በደንበኛው እንደቀረበ ጽሑፍ እንጂ የአገልጋዩ ግልባጭ ማረጋገጫ ተደርጎ አይወሰድም።
የውህደት መገናኛው የምስል እና የድምፅ ምልከታዎችን
በአንድ የጊዜ ገደብ እና የማቋረጫ ምልክት ሥር ያስኬዳል፣ በጋራ የጊዜ መስመር ላይ ይደረድራቸዋል፣
ፍጹም ተመሳሳይ ቅጂዎችን ያዋህዳል፣ እና ከሁለቱ ወገኖች አንዱ ብቻ ሲሳካ ከፊል ውጤትን
ሪፖርት ያደርጋል። ልክ ያልሆነ `audioTranscript` ሙሉውን ቪዲዮ
ከማሳካት ይልቅ ወደዚያ ከፊል ውጤት ዝቅ ይላል — የምስል
መግለጫው ይቀመጣል፣ የድምፅ ቅርንጫፉም የተጣራ የውድቀት ኮድ ይመዘግባል —
ሙሉውን ቪዲዮ ከማሳካት ይልቅ። የእያንዳንዱ ቅርንጫፍ ተገኝነት፣ የከፊልነት ምልክት፣
እና የተጣሩ የውድቀት ኮዶች በተገለጸው ውጤት፣ በመከላከያ ደንብ ዲበ-ውሂብ
(`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`)፣ በውጤት-መሸጎጫ ዲበ-ውሂብ፣ እና በብሪጅ
ውህደት ቆጣሪዎች ውስጥ ይጠበቃሉ። ነባሪው የVideo Bridge መንገድ ንግግርን-ወደ-ጽሑፍ
አይጠራም ወይም ሁለተኛ የሚዲያ ቅጂ አያወርድም፤ ያ ግልጽ ትራክ ከሌለ፣
ቪዲዮ-ብቻ ሆኖ ይቀጥላል።

**የግልባጭ ማቆየት (#12150 P1)።** Video Bridge (ራሱ በፈቃድ የሚነቃ) የግልባጭ ምልክት ባቀረበ ቁጥር ይህ በራስ-ሰር ተግባራዊ ይሆናል — የተለየ
የማቆያ ምልክት የለም። አንድ ጥያቄ ማንኛውንም የግልባጭ ምልክት (በጥሪ አድራጊው የታወጀ
`transcript` ወይም የተዋሃደ `audioTranscript`) ሲያቀርብ፣ መከላከያ ደንቡ
`videoBridgeObserved` ብሎ ምልክት ያደርግበታል እና የቪዲዮ መግለጫውን የተሸፈነ ጥላ ይፈጥራል —
የእያንዳንዱ ምልክት ነፃ-ጽሑፍ ይዘት በ
`[redacted-video-transcript]` የተተካበት ተመሳሳይ አቀራረብ፣ ሕብረቁምፊው ከመገጣጠሙ በፊት የተዋቀረውን የምልክት መስክ
በመተካት የሚገነባ (የተዘረጋውን ጽሑፍ በመተንተን በፍጹም አይደለም፣ ስለዚህ
`[inaudible]`/`[music]` የመሳሰሉ `]` የያዙ ይዘቶችን ጨምሮ፣ ጎጂም ሆነ
መደበኛ የምልክት ይዘት መትረፍ አይችልም)። የሚቆየው የጥሪ-መዝገብ ጥያቄ አካል
ከቪዲዮ የተገኘውን እያንዳንዱን የጽሑፍ ክፍል በይዘት እኩልነት ከተመሳሰለው የተሸፈነ ጥላ ጋር ይቀያይራል፤
የ`fullText` መልሕቅ ከተጠናቀቀው የቅድመ-ጥሪ መከላከያ ደንብ
ጭነት እንደገና ይነበባል፣ ስለዚህ በኋላ የሚመጡ የሰንሰለት መከላከያ ደንቦች (የPII እና
የማረጋገጫ መረጃ ሸፋኞች፣ ቅድሚያዎች 10/95) የመግለጫ ጽሑፉን በቦታው ከጻፉት በኋላ እና
የሥርዓት-መመሪያ/ርክክብ/ማህደረ ትውስታ ማስገባት የመልዕክት ድርድሩን ከቀየረው በኋላም
ማዛመዱ ይሳካል። ወደ ሞዴሉ በላይኛው ፍሰት የሚላከው አካል አይቀየርም። የታየ ጥያቄ በተጨማሪ
ምንም ዘላቂ Memory አይሞላም (ከጥያቄም ሆነ ከምላሽ የተገኘ ማውጣት ይዘለላል)፣
ስለዚህ የሞዴሉ የራሱ ምላሽ የግልባጭ ጽሑፍን ወደ Memory መልሶ ማስገባት አይችልም።

**ጥሬ የቪዲዮ መስኮች (#12430)።** ብሪጁ ሲነቃ እና ቤተኛ የቪዲዮ ድጋፍ ያልታወቀ ወይም የሌለ ሲሆን፣ የተገለጹ `transcript`/`audioTranscript` መስኮችም ከመግለጫ ውድቀት ወይም ከ`maxVideos` ገደብ በኋላ እንኳ `videoBridgeObserved`ን ያነቃሉ። `null` እና ባዶ ሕብረቁምፊዎች ይቆጠራሉ፤ የሌሉ መስኮች እና ከቪዲዮ ጋር ያልተያያዘ ዲበ-ውሂብ አይቆጠሩም። የሚቆዩ ቅጂዎች እነዚህን መስኮች ይሸፍናሉ ወይም ጥያቄውን ይተዋሉ፣ እና መሸጎጫዎች/Memory ይታለፋሉ።

በእነዚያ የተተኪ መንገዶች ላይ፣ ልክ የሆኑ የጥሪ አድራጊ ምልክቶች መደበኛ ያልሆኑ የአቅራቢ መስኮች ከመሆን ይልቅ የሚደገፉ `text`/`input_text`
ክፍሎች ይሆናሉ። ሁለቱም በጥያቄው የቀረቡ ትራኮች የማይታመኑ `client` ምልከታዎች ሆነው
ይቀጥላሉ፣ ቪዲዮው እንዳልተገለጸ እና የጊዜ ማህተሞቹ ከሚዲያው ጋር እንዳልተረጋገጡ
ግልጽ ማስጠንቀቂያ ይኖራቸዋል። አሁን ያሉት የ256-ምልክት/64-KiB ጠቅላላ እና የእያንዳንዱ ምልክት በጀቶች
በሁለቱ ትራኮች ላይ በአንድነት ተግባራዊ ይሆናሉ፤ የጊዜ ማህተሞች በደላላው የ600-ሰከንድ ጣሪያ እና
በቀረበ ማንኛውም የትኩረት መስኮት ውስጥ መመጠን አለባቸው። ልክ ያልሆኑ ትራኮች ይጣላሉ እንጂ እንደ የዘፈቀደ ጽሑፍ
አይተላለፉም፤ የተጣመረው በጀታቸው ካልታለፈ ልክ የሆነ ወንድም ትራክ አሁንም ጥቅም ላይ ሊውል ይችላል። Null/ባዶ
መስኮች ምንም ጽሑፍ አይጨምሩም። በዚህ ተተኪ መንገድ ምንም የሚዲያ ሰርስሮ ማምጣት ወይም ግልባጭ ማድረግ አይጨመርም።
የግልባጭ ቅጥያ መስኮች ከተተኪው የቪዲዮ ተሸካሚ እና ከ`video_url`/`source` ነገሮቹ ይወገዳሉ። የOpenAI ሽቦ ፈቃድ-ዝርዝር ጥብቅ ሆኖ ይቆያል፤ ቤተኛ ድጋፋቸው ያልታወቀ
የቪዲዮ ተሸካሚዎች እንደተገኙ ይቆያሉ፣ በጽሑፍ-ብቻ እንደሚሰሩ የታወቁ ዒላማዎችም ደህንነቱ የተጠበቀ ምልክቶቻቸውን ይይዛሉ።
የተዋቀሩ የማሸፊያ ጥላዎች የተያያዘውን የግልባጭ ጽሑፍ ይከላከላሉ፣ በጥሪ አድራጊው ባለቤትነት ሥር ያለው
የመጀመሪያው ጥያቄ ግን ሳይቀየር ይቆያል። ቤተኛ ድጋፍ ያላቸው ዒላማዎች እና
የተሰናከሉ ብሪጆች ነባሩን የማለፍ ባህሪያቸውን ይጠብቃሉ።

ተጨማሪ የሚቆዩ ቅጂዎች ተመሳሳዩን የታየ-ጥያቄ ምልክት ይጠቀማሉ። ጥሬው
የቅድመ-መከላከያ ደንብ የደንበኛ-ጥያቄ ቅጽበታዊ ቅጂ፣ በማህደረ ትውስታ ያለው በመጠባበቅ ላይ ያለ ጥያቄ፣ እና ቀደም ብሎ
የተቀበለው የተከለከለ-ጥያቄ መዝገብ በቪዲዮ ክፍሎች ውስጥ ያሉ የግልባጭ መስኮችን በመዋቅራዊ ሁኔታ ይተካሉ፤
በpipeline ደረጃዎች እና በዐውድ ርክክብ የተፈጠሩ የሕብረቁምፊ መመሪያዎች
በሚቆየው-የጥያቄ-አካል መድረሻ ላይ ይሸፈናሉ። የሚቆየው `video_content_removed` ምልክት
ሆን ተብሎ የተጣለ ጽሑፍን እንደገና ከመገንባት ይልቅ የ`previous_response_id` ቀጣይነትን በዝግ እንዲወድቅ ያደርገዋል። የታየ ጥያቄ
ከመመዝገቡ በፊት የእያንዳንዱን-ክፍል ማሸፊያ ጥላ ካጣ፣ ወይም ከበኋለኞቹ የጥያቄ ለውጦች በኋላ
ከብዙ የቪዲዮ ጥላዎች አንዱ እንኳ መዛመድ ካልቻለ፣ በከፊል የተሸፈነ ግልባጭ ከማቆየት ይልቅ
የሚቆየው የጥያቄ አካል ሙሉ በሙሉ ይተዋል።

ለታየ ጥያቄ፣ የሞዴል ምላሽ የተዋቀረ የምልክት ወሰን ሳይኖረው
ማንኛውንም የግልባጭ ክፍል ሊጠቅስ ይችላል። ስለዚህ የሚቆየው የጥሪ-መዝገብ
`responseBody` በመተው ምልክት ይተካል፤ ዝርዝር
የpipeline ቅርስ (የላይኛውን ፍሰት/የደንበኛ አካላትን እና የዥረት ቁርጥራጮችን ሊያካትት የሚችለው)
አይቆይም። Semantic፣ idempotency፣ እና reasoning-replay መሸጎጫዎች
ለዚያ ጥያቄ ንባብና ጽሕፈትን ያልፋሉ። የአቅራቢው ጥያቄ እና ለደንበኛው የሚታየው
ምላሽ ሳይቀየሩ ይቆያሉ። ዝርዝር ቅርሱ ሲተው ቀደም ብለው የተላኩ የkeepalive ባይቶች ከጊዜያዊው
ቋት ይጠረጋሉ። የKiro የተበላሸ EventStream
ማስጠንቀቂያ የጭነቱን የባይት ብዛት ብቻ ያሳውቃል፣ ይዘቱን ወይም የJSON
ተንታኙን ጥሬ ስህተት በፍጹም አያሳውቅም።
ይህ ሁሉም ያልተዛመዱ የአቅራቢ/ፕለጊን ምርመራዎች
ኦዲት እንደተደረጉ አይናገርም፤ ሰፊው የሚቆዩ-መድረሻዎች ፍተሻ በ#11658 ውስጥ ክትትል ይደረግበታል።

የውስጥ `/api/modality-bridge/video/drilldown` የሕይወት ዑደት የተለየ፣
በloopback/token ማረጋገጫ የተጠበቀ የcache መሠረተ ልማት ነው። እያንዳንዱ ክወና
ቀኖናዊ ግልጽ ያልሆነ principal ID ያስፈልገዋል። አንድ የproduction ጠሪ
ከመንቃቱ በፊት፣ ያንን ID ማንነቱ ከተረጋገጠው tenant ማመንጨት አለበት፣
እንዲሁም በclient የተመረጠ እሴትን ፈጽሞ ማስተላለፍ የለበትም። የcache ቁልፎች
ያንን principal ከቀኖናዊ session እና video-reference IDዎች ጋር ያስተሳስራሉ፣
ከSHA-256 የተመነጩ ቁልፎቻቸውን ብቻ ያከማቻሉ፣ እና ንባብንም ሆነ ስረዛን
በተመሳሳዩ principal ወሰን ውስጥ ያደርጋሉ። Cacheው በእያንዳንዱ ግቤት
ከፍተኛው 16 የተመነጩ JPEG frameዎችን ያከማቻል፣ ከአሥር ደቂቃ በኋላ
ጊዜያቸውን ያሳልፋል፣ እና ወሰን ያላቸውን `start`/`end` ንባቦች ወይም
ግልጽ የsession ስረዛን ይደግፋል።

እያንዳንዱ principal በ16 ግቤቶች እና 64 MiB ቀኖናዊ JPEG ውሂብ
የተገደበ ነው። እነዚህ ገደቦች ከዓለም አቀፉ የ64 ግቤቶች/256 MiB ጣሪያ
የተለዩ ናቸው፦ የprincipal ኮታ ጫና፣ ዓለም አቀፍ LRU ማስወገድ
ከመታሰቡ በፊት፣ የዚያን principal በቅርብ ጊዜ አነስተኛ ጥቅም ላይ
የዋሉ ግቤቶችን ብቻ ያስወግዳል። ጊዜያቸው ያለፈ ግቤቶች cacheው
በሚንቀሳቀስበት ጊዜ ከprincipal እና ከዓለም አቀፍ ሒሳብ ሁለቱም
ይጸዳሉ፤ ስረዛ እና የማረጋገጫ ውድቀት ግን ከፊል ምትክን አያጸድቁም።

Cacheው ቀኖናዊ ያልሆነ Base64ን፣ ከመጠን በላይ paddingን፣ JPEG ያልሆነ
ሚዲያን፣ የተበላሹ ወይም የተቆረጡ JPEGዎችን፣ እና ወሰን ባለው የሙሉ ምስል
`sharp` decode ወቅት ማስጠንቀቂያ የሚያመነጩ JPEGዎችን ውድቅ ያደርጋል።
እያንዳንዱን ተቀባይነት ያገኘ ምስል እንደ ቀኖናዊ JPEG ዳግም ይቀይረዋል፣
የጠሪውን መስኮች ከማመን ይልቅ ስፋትና ቁመትን ከdecode ከተደረጉት bytes
ያመነጫል፣ እና ተከትለው የመጡ polyglot bytesን ከማቆየት ይልቅ
ያስወግዳል። በሁለቱም ኮታዎች ላይ የሚቆጠረው ወሰን ያለው ቀኖናዊ
የታመቀ buffer ብቻ ነው። የJSON wire ገደቡ ለ32 MiB የdecode ግብዓት
ጣሪያ የBase64 overheadን ያካትታል። እያንዳንዱ
የተከማቸ derivation የተረጋገጠውን JPEG format/resolution፣ sampling policy፣
derivation version፣ የመፍጠሪያ ጊዜ፣ በserver የተሰላ content hash፣ እና
hashed parent referenceን ከታመነው ጠሪ parent-content hash ጋር ይመዘግባል።
ከአቶሚክ cache commit በፊት፣ ስረዛ በእያንዳንዱ asynchronous decode/hash
ደረጃ መካከል ይፈተሻል።

ይህ tranche እስካሁን የproduction producerን ከrouteው ጋር አያገናኝም፣
እንዲሁም ባለብዙ-resolution variant ምርጫን አይሰጥም። ስለዚህ ግልጽ
የVideo Bridge ጥያቄ መንገድ ምንም ተጨማሪ ሥራ አያስከትልም፤
ከtenant ጋር የታሰረ principal derivation እና ሙሉው የFU-08
ባለብዙ-resolution የሕይወት ዑደት እንደተጠናቀቀ ባህሪ ከመመዝገብ
ይልቅ ግልጽ የቀጣይ ሥራ ሆነው ይቀራሉ።

Frameዎች በተዋቀረው Video model በቅደም ተከተል caption ይደረግላቸዋል።
ባዶ Video override የVision ቅንብሩን ይወርሳል፤ ሁለቱም ባዶ ከሆኑ፣
የVision auto-router ውጤታማውን ራዕይ ችሎታ ያለው model ይመርጣል።
የተሳኩ captionዎች ዋናውን ክፍል በቋሚ `[Video description:` ቅድመ ቅጥያ
ይተካሉ፤ ይህም ጽሑፉን እንደማይታመን ከሚዲያ የተገኘ ምልከታ
ይመድበዋል፣ እና downstream modelዎች በሚዲያው ውስጥ የተገኙ
መመሪያዎችን እንዳይከተሉ ይነግራቸዋል። የframe-caption cache ቁልፎች
የJPEG bytesን፣ promptን፣ timestampን፣ እና ውጤታማውን model ያካትታሉ፤
cache የሚደረጉት የተሳኩ captionዎች ብቻ ናቸው። የcache ግቤቶች fallback
modelን ጨምሮ በተጨባጭ የተሳካውን producer model ያቆያሉ፤ የተለያዩ
frameዎች በተለያዩ modelዎች ሲመረቱ bridgeው `mixed` ብሎ ሪፖርት ያደርጋል።
የcache hit ያንን producer ማንነት እንደተጠየቀው routing plan ዳግም
ከመሰየም ይልቅ እንደገና ይጠቀምበታል። የሙሉ-video ውጤት cache
ውጤቱን በሚቀይር እያንዳንዱ ግብዓት — prompt፣ ውጤታማ model፣
sampling policy፣ frame count፣ semantic analysis mode፣ መደበኛ የተደረገው
focus hint SHA-256 fingerprint፣ focus window፣ `transcript`፣
`audioTranscript`፣ እና contact-sheet flag — ላይ የተመሠረተ ቁልፍ
ይጠቀማል፤ ስለዚህ ከእነዚህ dimensions አንዱን መቀየር የcache miss
ያስከትላል እንጂ ያረጀ ውጤትን ዳግም አይጠቀምም። የvisual dedup policy
version፣ threshold፣ እና ወሰን ያለው candidate-frame count በresult-cache
ቁልፍ እና metadata ውስጥም በግልጽ ተካትተዋል፤ ስለዚህ የpolicy ለውጥ
ያረጀ የሙሉ-video descriptionን ዳግም መጠቀም አይችልም። የResult-cache
v4 metadata modeን እና fingerprintን ያቆያል፣ ጥሬውን የተጠቃሚ ተግባር
ግን ፈጽሞ አያቆይም። የGuardrail metadata የተጠየቀውንም ሆነ ውጤታማውን
analysis mode ሪፖርት ያደርጋል፤ ጥቅም ላይ ሊውል የሚችል የተጠቃሚ
ጽሑፍ ሳይኖር የተጠየቀ `focused` mode በተግባር `full` እንደሆነ
ሪፖርት ይደረጋል።

Guardrailው ሁሉንም የሚደገፉ video partዎች ያወጣል፣ ነገር ግን
ከ`modalityBridgeVideoMaxVideos` በላይ አይገልጽም።
`supportsVideo === false` እንዳለው ለተረጋገጠ target፣ ያልተሳኩ እና
ከገደብ በላይ የሆኑ videoዎች ጥሬ video እንዳይተርፍ ግልጽ ደህንነቱ
የተጠበቀ text markerዎች ይሆናሉ። ችሎታው በማይታወቅበት ጊዜ፣
እነዚያ partዎች የvideo carrierያቸውን ያቆያሉ፤ ማንኛውም fallback
transcript ከላይ ያለውን ወሰን ያለው text conversion ይከተላል።
`supportsVideo === true` ያላቸው targetዎች bridgeውን ያልፋሉ።
የclient ጥያቄ abort signal በdownload፣ broker queue፣ subprocessዎች፣
እና caption callዎች ውስጥ ይተላለፋል፤ abortዎች በvideoዎች መካከል
ሂደቱን ያቆማሉ፣ እና ወደ ጥሬ ሚዲያ ክፍት በመሆን ፈጽሞ አይወድቁም።

የRuntime ቅንብሮች በDB የተደገፉ እና በZod የተረጋገጡ ናቸው፦

| ቁልፍ                                 | ነባሪ         | ወሰን / ባህሪ                                                                               |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | አማራጭ runtime፣ በፈቃድ የሚነቃ                                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` አጠቃላይ መግለጫ ጽሑፎችን ይጠብቃል፤ `focused` የተገደበና ያልታመነ የቅርብ ጊዜ የተጠቃሚ አውድን ይጠቀማል          |
| `modalityBridgeVideoModel`          | `""`        | የVision Bridge ሞዴልን ይወርሳል                                                               |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                    |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`፣ `scene_aware`፣ ወይም ተመጣጣኝ `segment_aware`፤ የመለያ ፈላጊው ካልተሳካ ወደ `uniform` ይመለሳል |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                     |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                          |

ከ120 ሰከንዶች በላይ የሆኑ የቆዩ ተቀምጠው የነበሩ የVideo timeout እሴቶች እስከ
broker deadline ድረስ ይገደባሉ፤ ከዚያ ገደብ በላይ የሆኑ አዲስ የቅንብር ጽሁፎች ውድቅ ይደረጋሉ።
`GET /api/modality-bridge/video/runtime` ከማረጋገጫ ወይም ከruntime ምርመራ በፊት
የታመነ ማህተም ያለበት loopback locality ይፈልጋል፣ ከዚያም የአስተዳደር
ማረጋገጫ ይፈልጋል። የሚመልሰው `available`፣ የተጣሩ የFFmpeg/ffprobe ስሪቶችን፣ እና runtime
በማይገኝበት ጊዜ ቋሚ ምክንያትን ብቻ ነው። ውስጣዊው የማውጫ endpoint ይፋዊ
የupload API አይደለም፦ የqueue መጨናነቅ `503` ከ`Retry-After` ጋር ይመልሳል፣ የጠሪ
ግንኙነት መቋረጥ `499` ይመልሳል፣ እና ቋሚው broker deadline `504` ይመልሳል። የተቀየሩ ምላሾች
የVision ወይም Audio ክፍሎችን ሳያስወግዱ `video->text;model=<visionModel>;parts=<videos>`ን
ወደ ማዕከላዊው `x-omniroute-modality-bridge` header ያክላሉ።

### PII ደብቂ (`piiMasker.ts`)

በ**ሁለቱም** ደረጃዎች ላይ ይሰራል።

- **`preCall`** payloadን ይቀዳል፣ `system`፣ `messages`፣ `input`፣ እና
  `prompt`ን (ተራ የstring ንጥሎችን ጨምሮ) ያስሳል፣ እና በstring `content`/`text`
  fields ላይ `processPII()`ን (ከ`@/shared/utils/inputSanitizer`) ይተገብራል።
  `PII_REDACTION_ENABLED=true` ሲሆን፣ የተገኘ PII በወጪው payload ውስጥ ይደበቃል።
  ይህ ከ`INPUT_SANITIZER_MODE` (የprompt-injection ፖሊሲን ብቻ ከሚቆጣጠረው)
  ነፃ ነው። ድብቀት ሲጠፋ፣ ጥሪው ይዘቱን ሳይጽፍ የተገኙ ነገሮችን
  ብዛት ይመዘግባል።
- **`postCall`** ምላሹን በጥልቀት ይቀዳል፣ `sanitizePIIResponse()`ን ከ
  Responses-API-shape ደብቂው (`maskResponsesOutput` — `output_text`ን እና
  `output[].content[].text`ን የሚሸፍን) ጋር ያስኬዳል። ማንኛውም ድብቀት ከተከሰተ፣
  የተሻሻለው ምላሽ ዋናውን ይተካል።

guardrail ፈጽሞ አያግድም፤ (`meta.detections`፣
`meta.redacted`)ን ብቻ ያክላል ወይም እንደገና ይጽፋል።

#### በዓይነት ምርጫ፣ ብጁ patterns እና የማግኘት counters

**Dashboard → Settings → Security → PII masking** _ምን_ እንደሚደበቅ ይመርጣል።
ይህ ድብቀትን አያበራም፦ ያንን የሚያደርጉት አሁንም `PII_REDACTION_ENABLED` (ጥያቄ)
እና `PII_RESPONSE_SANITIZATION` (ምላሽ + SSE) ሲሆኑ፣ ሁለቱም በነባሪ ጠፍተዋል።

- **በዓይነት ምርጫ** — አብረው የተካተቱት ids በ
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) ውስጥ ተዘርዝረዋል። ካልተዋቀረ
  ሁሉንም ዓይነቶች ማለት ነው (ይህ ቅንብር ከመኖሩ በፊት የነበረው ባህሪ)። የጥያቄ
  engine `ssn_us` pattern ወደ `ssn` ይዛመዳል። Templates (Minimal፣ Standard፣ Financial፣
  Brazilian፣ USA፣ Full) በUI ውስጥ ያሉትን checkboxes ብቻ ይሞላሉ።
- **ብጁ patterns** — እስከ 20 regex ወይም wildcard patterns (`*` = እስከ 64
  የነጭ ቦታ ያልሆኑ ቁምፊዎች፣ `?` = አንድ)። የሚዛመዱት `[CUSTOM_REDACTED]` ይሆናሉ።
  እያንዳንዱ pattern በ`compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`) በኩል ያልፋል፦ ቢበዛ 500 ቁምፊዎች፣ flags በ
  `g i m s u` የተገደቡ፣ compile መደረግ ያለበት፣ `safe-regex`ን (ከባድ
  backtracking) ማለፍ ያለበት፣ እና ባዶ string ወይም የድብቀት placeholder ጋር መዛመድ
  የሌለበት ነው። ያልተሳካ pattern ሲቀመጥም ሆነ ሲፈተን ውድቅ ይደረጋል፣ እና ያልተሳካ
  የተቀመጠ row compile ከመደረግ ይልቅ በruntime ጊዜ ይዘለላል። ብጁ patterns የሚሰሩት
  ድብቀት በርቶ ሳለ ብቻ ነው።
- **የማግኘት counters** — በዓይነት የተከፋፈሉ ቁጥሮች (የተዛመዱ እሴቶችን ፈጽሞ አይዙም)፣ በ
  memory ውስጥ ይያዛሉ እና ዳግም ሲጀመር ይወገዳሉ (`src/lib/pii/piiDetectionStats.ts`)።
  የሚጨምሩት ድብቀት በርቶ ሳለ ብቻ ነው።

ቅንብሮቹ በ`key_value` table (namespace `pii_settings`፣
`src/lib/db/piiSettings.ts`) ውስጥ ይኖራሉ እና በ1 s cache በኩል ይነበባሉ። API፦

| ዘዴ     | መንገድ                     | ዓላማ                                                             |
| ------ | ------------------------ | --------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | የflag ሁኔታ፣ `enabledTypes`፣ `customPatterns`፣ የማግኘት counters     |
| `PUT`  | `/api/settings/pii`      | `enabledTypes`ን (`null` = ሁሉም) እና/ወይም `customPatterns`ን መተካት    |
| `POST` | `/api/settings/pii/test` | ቢበዛ 8 KB በሆነ sample ላይ አንድ patternን ሳያስቀምጡ መሞከር፤ ምንም ነገር አይቀመጥም |

ሦስቱም የአስተዳደር ማረጋገጫ ይፈልጋሉ እና bodyውን በZod
(`src/shared/validation/schemas/piiSettings.ts`) ያረጋግጣሉ።

### Prompt Injection (`promptInjection.ts`)

በተጠቃሚ የቀረበ ይዘት ውስጥ የጥቃት አወቃቀሮችን ይለያል እና የተዋቀረውን
ፖሊሲ ያስፈጽማል። ባህሪው በenvironment variables እና constructor
options ይመራል፦

| ቅንብር     | የአካባቢ ተለዋዋጭ                                                                                           | ነባሪ    | ተጽዕኖ                                                                                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ነቅቷል     | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | `false` ሲሆን guardrail ወዲያውኑ ያቋርጣል።                                                                                                                             |
| ሁነታ      | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | የመረጃ ማስገባት ፖሊሲ፦ `block`፣ `warn` ወይም `log`። (`redact` ለኋላ-ተኳኋኝነት ተቀባይነት አለው፣ ነገር ግን የማስገባት ጽሑፍን **አያስወግድም**፤ የጥያቄ PII ዳግም መጻፍ በ`PII_REDACTION_ENABLED` ይቆጣጠራል።) |
| የማገድ ገደብ | `blockThreshold` አማራጭ / `INPUT_SANITIZER_BLOCK_THRESHOLD` (ተለዋጭ ስም `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | ለማገድ የሚያስፈልገው ዝቅተኛው የክብደት ደረጃ። በነባሪው Medium ለክትትል ብቻ ነው።                                                                                                       |

**የሁነታ ቅድሚያ** (`getMode`)፦ የጠሪው `options.mode` →
`INJECTION_GUARD_MODE` **የDB ባህሪ-ጠቋሚ መሻር** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` የአካባቢ ተለዋዋጭ → `INPUT_SANITIZER_MODE` የአካባቢ ተለዋዋጭ →
`warn`። ስለዚህ የdashboard መሻር ከአካባቢ ተለዋዋጮቹ ቅድሚያ ያገኛል፣ በመሆኑም የFeature
Flags UI በሥራ ላይ ያለውን guard በቀጥታ ይቆጣጠራል (ዳግም ማስጀመር አያስፈልግም)። የDB ንባብ ውድቀትን የሚቋቋም ነው፦
ስህተት ካጋጠመው guard በአካባቢ ተለዋዋጮች ላይ ወደተመሠረተው ባህሪ ይመለሳል፣ እንዲሁም ምንም
መሻር ካልተዘጋጀ ባህሪው ከአካባቢ ተለዋዋጮች ብቻ ጥራት ጋር ተመሳሳይ ነው።

የማወቂያ ምንጮች፦

1. `sanitizeRequest()` ከ`@/shared/utils/inputSanitizer` (በpipeline ውስጥ በሌሎች ቦታዎች
   የሚጠቀሙበት የጋራ detector ስብስብ)።
2. አብሮገነብ `DEFAULT_GUARD_PATTERNS` (በአሁኑ ጊዜ `system_override_inline` እና
   `markdown_system_block`፣ ሁለቱም `high` የክብደት ደረጃ አላቸው)።
3. በconstructor አማራጮች በኩል የሚተላለፉ አማራጭ `customPatterns` (strings፣ regex፣
   ወይም `{ name, pattern, severity }` records)።

`mode === "block"` ሲሆን **እና** ቢያንስ አንድ detection የክብደት
ገደቡን ሲያሟላ፣ `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }` ይመልሳል። በ`warn`/`log` ሁነታዎች guardrail መዝገብ ያስቀምጣል፣ ነገር ግን
ጥሪውን ይፈቅዳል። የጋራ helper `evaluatePromptInjection()` ወደ registry ሳያልፉ
promptsን መገምገም ለሚፈልጉ ጠሪዎችም export ተደርጓል።

**የቅኝት ወሰን (v3.8.20)፦** detectorው የተቀላቀለውን prompt ጽሑፍ **የመጀመሪያ 16 KB** ብቻ
ይመረምራል — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) በ
`src/shared/utils/inputSanitizer.ts` ውስጥ። `detectInjection()` እና
`evaluatePromptInjection()` ሁለቱም የpattern loopን ከማስኬዳቸው በፊት
`slice(0, MAX_INJECTION_SCAN_BYTES)` ይጠቀማሉ። የInjection መመሪያዎች በግቤት አናት አካባቢ ስለሚገኙ፣ ይህ
detectionን ሳያዳክም ባለብዙ-መቶ-KB payloads ላይ የregex CPU/GCን ይገድባል (cf.
#3932, #4041)።

### የማረጋገጫ መረጃ መሸፈኛ (`credentialMasker.ts`)

በ**ሁለቱም** stages ላይ ይሠራል፣ በነባሪ chain ውስጥ የመጨረሻ ነው (ቅድሚያ `95`)። በስፋት
የታወቁ API-key / secret-token patternsን ከወጪ payload (የመልዕክት
ይዘት፣ የtool-call arguments፣ የtool ውጤቶች) **እና** ከprovider response ይሰውራል፤ ስለዚህ
በprompt ውስጥ የተለጠፈ credential (ወይም በtool result ተመልሶ የተጻፈ) ወደ
upstream provider ወይም ወደ client ተመልሶ አይጋለጥም።

- **በግልጽ ማንቃት ብቻ**፣ ከPII redaction ጋር ተመሳሳይ ልማድ (ከHard Rule #20 ጋር ተያያዥ)፦
  `settings.credentialRedactionEnabled === true` **ወይም**
  `CREDENTIAL_REDACTION_ENABLED=true` ካልሆነ በስተቀር የተሰናከለ ነው። ሲጠፋ guardrail ምንም አያደርግም —
  ፈጽሞ አያግድም እና ፈጽሞ ዳግም አይጽፍም።
- `redactCredentials()` መላውን የpayload/response tree (`walkValue()`፣
  ከprototype-pollution የተጠበቀ፣ በ`WeakSet` cycle-safe) ያቋርጣል እና ተዛማጅ ክፍሎችን
  በ`[REDACTED:<type>]` placeholder ይተካል፤ በእውነት የተለወጡትን branches ብቻ
  clone ያደርጋል።
- `CREDENTIAL_PATTERNS` የLLM provider keysን (OpenAI፣ OpenAI-proj፣
  Anthropic፣ Google፣ Hugging Face፣ Replicate)፣ የVCS/SaaS tokensን (GitHub፣ Slack፣
  Linear፣ Notion፣ npm፣ Postman፣ Discord)፣ የክፍያ keysን (Stripe፣ Square)፣ የcloud
  keysን (AWS access key፣ Twilio፣ SendGrid፣ Mailgun)፣ private keys / JWTsን፣
  credential የያዙ connection stringsን (`mongodb://user:pass@...`፣ ወዘተ) እና
  አጠቃላይ `Authorization`/`x-api-key`/`api-key`/`apikey` header-value
  patternን ይሸፍናል። Header ቅርጽ ያላቸው keys (`authorization`፣ `x-api-key`፣ `api-key`፣
  `apikey`) በአጠቃላይ text regex ፋንታ በመዋቅራዊ መንገድ ይሰወራሉ (valueው ብቻ፣ እንደ
  `Bearer `/`Basic ` ያለ scheme prefix ይጠበቃል)።
- guardrail ፈጽሞ አያግድም፤ ዳግም መጻፍ (`modifiedPayload` /
  `modifiedResponse`) እና ማብራሪያ ማከል (`meta.credentialsRedacted`፣ `meta.count`) ብቻ ያደርጋል።

የRegression guard፦ `tests/unit/credential-masker-guardrail.test.ts`።

## መሠረታዊ ውል (`base.ts`)

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
  block?: boolean; // true ሰንሰለቱን ወዲያውኑ ያቋርጣል
  message?: string; // ሲታገድ ይታያል
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // ጥያቄውን እንደገና ለመጻፍ በ-preCall ይመለሳል
  modifiedResponse?: TValue; // ምላሹን እንደገና ለመጻፍ በ-postCall ይመለሳል
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

አንድ guardrail `void`፣ `{}` ወይም `{ block: false }` በመመለስ "ለውጥ የለም" የሚል ምልክት ይሰጣል። `modifiedPayload`/`modifiedResponse` መመለስ በሰንሰለቱ ውስጥ ወደ ታችኛዎቹ guardrails የሚተላለፈውን እሴት ይተካል።
`signal?: AbortSignal` የጠሪውን የሕይወት ዑደት ወደ guardrails ያስተላልፋል። የጥያቄ ማቋረጥ ሆን ተብሎ የተደረገው ክፍት-በመተው የሚሳካ ልዩ ሁኔታ ነው፦ የሚዲያ ማገናኛዎች ሥራቸውን ያቆማሉ እና ያጸዳሉ፤ ጥሬ ሚዲያን እንደማይደግፈው ወደሚታወቅ ዒላማ ግን አይመልሱም።

## መዝገብ (`registry.ts`)

ብቸኛው `guardrailRegistry` የሚከተሉትን ያቀርባል፦

- `register(guardrail)` — guardrail ያክላል (ወይም በመደበኛ የስም ቅርጹ መሠረት ይተካል)፣ ከዚያም በ`priority` ከዝቅተኛ ወደ ከፍተኛ እንደገና ይደረድራል።
- `clear()` / `list()` — የአስተዳደር ረዳት መሣሪያዎች።
- `runPreCallHooks(payload, context)` — ንቁ guardrailsን በየተራ ያካሂዳል፣ payloadን በ`modifiedPayload` በኩል ያስተላልፋል፣ እና በመጀመሪያው `block: true` ላይ ያቆማል።
- `runPostCallHooks(response, context)` — በምላሹ በኩል ተመሳሳይ ፍሰትን ይከተላል።
- `resetGuardrailsForTests({ registerDefaults })` — ለንጹሕ የሙከራ ማግለል ሁኔታውን ያጸዳል፣ እና እንደ አማራጭ ነባሪዎቹን እንደገና ይመዘግባል።

ሁለቱም አስኪያጆች `{ blocked, payload|response, results, guardrail?, message? }` ይመልሳሉ፤ በዚህ ውስጥ `results` ለእያንዳንዱ guardrail `blocked`፣ `skipped`፣ `modified`፣ `error` እና `meta` መስኮችን የሚያካትቱ የ`GuardrailExecutionResult` መዝገቦች ድርድር ሲሆን፣ ለክትትል ጠቃሚ ነው።

### Guardrailsን በእያንዳንዱ ጥያቄ ማሰናከል

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` ለአሁኑ ጥያቄ መዝለል ያለባቸውን የguardrail ስሞች ድግግሞሽ የተወገደለት ዝርዝር ያሰባስባል። ምንጮቹ (ሁሉም አማራጭ፣ ሁሉም የሚዋሃዱ)፦

- `apiKeyInfo.disabledGuardrails`
- የጥያቄ አካል `disabledGuardrails` (ከፍተኛ ደረጃ)
- የጥያቄ አካል `metadata.disabledGuardrails`
- ራስጌ `x-omniroute-disabled-guardrails` (ወይም የቀድሞው
  `x-disabled-guardrails`)

እሴቶቹ የሕብረቁምፊዎች ድርድር ወይም በኮማ የተለየ ሕብረቁምፊ ሊሆኑ ይችላሉ፤ ስሞች ወደ ትንሽ ፊደል kebab-case (`pii_masker` → `pii-masker`) ይደበኛሉ። ውጤቱ በ`context.disabledGuardrails` በኩል ወደ መዝገቡ ይተላለፋል፤ መዝገቡም ተዛማጅ guardrailsን ይዘላል (`skipped: true` በ`results` ውስጥ)።

## የአፈጻጸም ቅደም ተከተል

በ`src/sse/handlers/chat.ts` እና
`open-sse/handlers/chatCore.ts` በኩል ለሚያልፍ ለእያንዳንዱ ጥያቄ፦

1. `resolveDisabledGuardrails(...)` ከAPI ቁልፍ፣ ከbody እና
   ከheaders የመዝለያ ዝርዝሩን ይገነባል።
2. `guardrailRegistry.runPreCallHooks(body, ctx)` guardrailsን በቅድሚያ
   ደረጃቸው ከዝቅተኛ ወደ ከፍተኛ ቅደም ተከተል ያስኬዳል፦
   - የተሰናከሉ guardrails እንደ `skipped` ይመዘገባሉ።
   - የእያንዳንዱ guardrail `preCall` በ`modifiedPayload` አማካኝነት payloadን እንደገና ሊጽፍ ይችላል።
   - የመጀመሪያው `block: true` ሰንሰለቱን ወዲያውኑ ያቋርጣል፣ እና handlerው
     የguardrail ውድቅ ማድረጊያ ምላሽ ይመልሳል።
3. (ሊሻሻል የሚችለው) payload ወደ combo routing እና upstream
   dispatch ይገባል።
4. ምላሹ ከተዋቀረ በኋላ፣ `guardrailRegistry.runPostCallHooks(...)`
   በምላሹ ላይ ያንኑ ሰንሰለት ያስኬዳል። እዚህ ያለ `block: true` የupstream
   ምላሹን ይጥላል።

ስህተት የሚያስነሱ guardrails በ`error: <message>` ይመዘገባሉ፣ እንዲሁም በ
`logger.warn` በኩል log ይደረጋሉ፤ ነገር ግን ሰንሰለቱ ይቀጥላል — ይህ በንድፍ fail-open ነው።

## ውቅር

አብሮ በተሰሩት guardrails የሚነበቡ የአካባቢ ተለዋዋጮች፦

| ተለዋዋጭ                                 | የሚጠቀምበት                   | ውጤት                                                                                        |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | ማወቂያውን ሙሉ በሙሉ ለማሰናከል `false` ያድርጉ።                                                         |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | የinjection ፖሊሲ፦ `warn`፣ `block` ወይም `log`። የቀድሞው `redact` እሴት የinjection ጽሑፍን እንደገና አይጽፍም። |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | የinjection guard ሁነታ፤ እንዲሁም የenv varsን **የሚሽር** የDB feature flag ነው (DB > ENV)።            |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | `MODE=block` ውድቅ የሚያደርገው ዝቅተኛው የከባድነት ደረጃ፦ `high` (ነባሪ)፣ `medium` ወይም `low`።               |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | የ`INPUT_SANITIZER_BLOCK_THRESHOLD` የቀድሞ alias።                                             |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | `true` ሲሆን፣ በጥያቄው ውስጥ ያለ PII ይሰወራል (ከinjection ሁነታ ነጻ ነው)።                                 |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | በምላሽ በኩል ያለውን masker ባህሪ ይቆጣጠራል።                                                           |

የModality Bridge guardrails የruntime ውቅርን ከDB-backed settings
store (`getSettings()`) ያነባሉ፣ ከenv vars አይደለም። የVision ዋና ቁልፎች
`modalityBridgeVisionEnabled`፣ `modalityBridgeVisionMode`፣
`modalityBridgeVisionModel`፣ `modalityBridgeVisionTaskAware`፣
`modalityBridgeVisionPrompt`፣ `modalityBridgeVisionTimeout`፣
`modalityBridgeVisionMaxImages`፣ `modalityBridgeVisionMaxChars`፣
`modalityBridgeCacheEnabled`፣ `modalityBridgeCacheTtlMinutes` እና
`modalityBridgeCacheMaxEntries` ናቸው። የቀድሞዎቹ
`visionBridge*` ቁልፎች በሰነድ እንደተገለጸው ለአንድ ዑደት የንባብ
fallback ብቻ ተቀባይነት አላቸው፤ dashboard ጽሁፎች ዋና ቁልፎቹን ይጠቀማሉ። ነባሪዎቹ እና fallback
resolverው በ`src/shared/constants/modalityBridgeDefaults.ts` ውስጥ ይገኛሉ፣ የቀድሞ
constants ደግሞ በ`src/shared/constants/visionBridgeDefaults.ts` ውስጥ ተይዘዋል።

Audio `modalityBridgeAudioEnabled`፣ `modalityBridgeAudioModel`፣
`modalityBridgeAudioTimeout` እና `modalityBridgeAudioMaxClips`ን፣ እንዲሁም የጋራ
`modalityBridgeCache*` settingsን ይጠቀማል። እነዚህ
ቁልፎች ከModality Bridge schema ጋር ስለተዋወቁ፣ Audio የቀድሞ ቁልፍ fallback የለውም።

Video `modalityBridgeVideoEnabled`፣ `modalityBridgeVideoAnalysisMode`፣
`modalityBridgeVideoModel`፣
`modalityBridgeVideoFrameCount`፣ `modalityBridgeVideoSamplingPolicy`፣
`modalityBridgeVideoMaxVideos` እና
`modalityBridgeVideoTimeout`ን፣ እንዲሁም የጋራ `modalityBridgeCache*` settingsን ይጠቀማል።
FFmpeg/ffprobe አማራጭ የክወና
ጥገኞች በመሆናቸው፣ እንዲሁም የframe captioning መዘግየትን እና የmodel ወጪን ስለሚጨምር፣ በነባሪ ተሰናክሏል።

## ብጁ መከላከያዎች

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

ደረጃዎች፦

1. `BaseGuardrail`ን የሚወርስ `src/lib/guardrails/myGuardrail.ts` ይፍጠሩ።
2. `preCall` እና/ወይም `postCall`ን ይተግብሩ።
3. በመጫን ጊዜ ይመዝግቡ (`registerDefaultGuardrails` ውስጥ ያክሉ) ወይም
   በአሂድ ጊዜ `guardrailRegistry.register(...)`ን ይጥሩ — መዝገቡ ተመሳሳይ መደበኛ የተደረገ ስም ያለውን
   ቀደምት መከላከያ ይተካል።
4. ሙከራዎችን በ`tests/unit/` ስር ያክሉ (ያሉ ምሳሌዎች፦
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`)።

## ሙከራ

ከታወቀ ሁኔታ ለመጀመር በሙከራዎች መካከል `resetGuardrailsForTests()`ን ይጠቀሙ።
ባዶ መዝገብ ለመጀመር `{ registerDefaults: false }`ን ያስተላልፉ እና
በሙከራ ላይ ያሉትን መከላከያዎች ብቻ ይመዝግቡ። Vision Bridge የጥገኝነት
ማስገባትን (`deps.getSettings`, `deps.callVisionModel`) ይቀበላል፤ Audio Bridge ደግሞ
ለቅንብሮች፣ ችሎታዎች፣ የSTT ሞዴል ምርጫ፣ የማረጋገጫ መረጃ
ፍተሻዎች እና ወደ ጽሑፍ መቀየር ተመጣጣኝ የማስገቢያ ነጥቦችን ያቀርባል። ስለዚህ ሙከራዎች ያለ DB
ወይም የአውታረ መረብ መዳረሻ ሁለቱንም ፍሰቶች ሊፈትኑ ይችላሉ።

## በተጨማሪ ይመልከቱ

- `src/lib/guardrails/` — ትግበራ
- `src/shared/utils/inputSanitizer.ts` — የprompt-injection እና PII መሸፈኛን የሚያንቀሳቅስ
  የጋራ ማወቂያ
- `src/shared/constants/visionBridgeDefaults.ts` — የVision Bridge ነባሪዎች እና
  የግዳጅ-ድልድይ ሞዴል ዝርዝር
- `src/shared/constants/modalityBridgeDefaults.ts` — የጋራ Vision/Audio የአሂድ ጊዜ ነባሪዎች
- `docs/architecture/RESILIENCE_GUIDE.md` — ራሱን የቻለ ንብርብር (የወረዳ መቋረጫ፣ የማቀዝቀዣ ጊዜያት)
- `docs/reference/ENVIRONMENT.md` — ሙሉ የenv var ማጣቀሻ

## የInjection-guard መስመር ሽፋን እና red-team (Phase 8 · Block D)

injection-guard (`createInjectionGuard` / `withInjectionGuard`) የተጠቃሚ መጠየቂያዎችን የሚቀበሉ ሁሉንም መስመሮች
ይሸፍናል። `INJECTION_GUARD_MODE`ን ያከብራል (ነባሪ `warn` = መዝገብ ላይ ማስፈር ብቻ፤
`block` = HTTP 400 `SECURITY_001`ን ይመልሳል)።

| ዓይነት     | መስመሮች                                                                                                                                                | ነባሪ ሁነታ |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| ጽሑፍ (ያለ) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn    |
| አመንጪ     | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn    |
| ውሂብ      | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn    |

የጽሑፍ ማውጣት (`extractMessageContents`) `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`ን ይሸፍናል።

**Red-team (በየሌሊቱ፣ `nightly-llm-security.yml`)፦** promptfoo እያንዳንዱ መስመር
በ`INJECTION_GUARD_MODE=block` ውስጥ የOWASP-LLM ኮርፐስን እንደሚከለክል ያረጋግጣል፤ garak ምርመራዎችን ያካሂዳል (ሚስጥር ከሌለ ይዘላል)።
`moderations` ለወጥነት ተካትቷል — በblock-mode ያሉ ኦፕሬተሮች
በ`resolveDisabledGuardrails` በኩል ነፃ ሊያደርጉት ይችላሉ።

የሌሊቱ የስራ ፍሰት (`.github/workflows/nightly-llm-security.yml`፣ cron + በእጅ
ማስጀመሪያ) ሁለት ስራዎች አሉት፦

- **`promptfoo-guard` (ከልካይ)** — `promptfoo eval -c promptfooconfig.yaml`ን
  በ`INJECTION_GUARD_MODE=block` ያሂዳል። እያንዳንዱ ተቃዋሚ የሙከራ ሁኔታ (ለምሳሌ፣ "ignore all
  previous instructions…", የDAN ቅጥ ያላቸው jailbreaks) ምላሹ
  `error.code === "SECURITY_001"`ን እንደያዘ ያረጋግጣል፣ ማለትም መከላከያው ጥያቄውን በትክክል ውድቅ አድርጓል።
- **`garak` (አማካሪ)** — garakን ከአካባቢያዊ OmniRoute አጋጣሚ (`http://localhost:20128/v1`) ጋር
  `--probes promptinject,dan,leakreplay` በመጠቀም ያሂዳል። በአቅራቢ ሚስጥር
  (`PROMPTFOO_PROVIDER_KEY`) ላይ የተመሠረተ ነው፤ ሚስጥሩ ከሌለ ያለችግር ይዘላል እና
  `|| true` ይታከልበታል፣ ስለዚህ CIን ሳያሳክት ሪፖርት ያደርጋል።

የመከላከያ ረዳቱ (`createInjectionGuard` / `withInjectionGuard`) ሽፋን
መጠየቂያ የያዙ ሁሉንም `/v1` መስመሮች ያካትታል፤ የመጠየቂያ ጽሑፍ በ
`src/shared/utils/inputSanitizer.ts` ውስጥ ባለው `extractMessageContents()` አማካኝነት ከ
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ይወጣል።
