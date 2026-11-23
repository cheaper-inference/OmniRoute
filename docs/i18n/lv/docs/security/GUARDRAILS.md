# Guardrails (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Patiesības avots:** `src/lib/guardrails/`
> **Pēdējoreiz atjaunināts:** 2026-08-29 — v3.8.51 (Video Bridge transkripta izcelsmi deklarē izsaucējs,
> serveris to vēl nepārbauda — precizēts saskaņā ar #11661)

Aizsargmehānismi nodrošina drošības, politiku un satura transformāciju ievērošanu uz robežas
starp OmniRoute un augšupējiem pakalpojumu sniedzējiem. Katrs aizsargmehānisms var pārbaudīt (un
pēc izvēles noraidīt, transformēt vai anotēt) pieprasījumu lietderīgo slodzi (`preCall`) un
augšupējās atbildes (`postCall`).

Sistēma ir **kļūmju gadījumā atvērta**: ja aizsargmehānisma izpildes laikā rodas izņēmums, reģistrs
reģistrē kļūdu un turpina ar nākamo aizsargmehānismu, nevis izraisa pieprasījuma
kļūmi. Bloķēšana ir apzināts lēmums (`block: true`), nevis nejaušība.

## Iebūvētie aizsargmehānismi

Reģistrs importēšanas laikā automātiski ielādē sešus aizsargmehānismus prioritārā secībā
(skatiet `registry.ts` → `registerDefaultGuardrails()`):

| Prioritāte | Nosaukums           | Posms(-i)      | Fails                 |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Mazāki prioritātes skaitļi tiek izpildīti **vispirms**.

### Attēlu tilts (`visionBridge.ts`) — Modalitātes tilts PR-1

Pārtver attēlus saturošus pieprasījumus, kas paredzēti **modeļiem bez attēlu apstrādes atbalsta**, un vai nu
novirza visu pieprasījumu uz modeli ar attēlu apstrādes atbalstu, vai pirms
augšupstraumes izsaukuma aizstāj attēlu daļas ar teksta aprakstiem, ko izveido
konfigurējams attēlu apstrādes modelis. Tas ļauj tikai tekstu atbalstošiem nodrošinātājiem nemanāmi apstrādāt
multimodālas datu slodzes.

Darbības plūsma:

1. Izlaist, ja mērķa modelis jau atbalsta attēlu apstrādi (ja vien tas nav iekļauts
   piespiedu tilta sarakstā `isVisionBridgeForcedModel`).
2. Izgūt attēlu daļas, izmantojot `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), kas deleģē darbu **vienotajam multivides
   detektoram** `detectMediaParts()` failā `open-sse/utils/mediaParts.ts` — vienīgajam
   patiesības avotam, kas tiek koplietots ar kombināciju saderības filtru.
   Izgūšana ir atļauta tikai augstākā līmeņa daļām ar tādām formām,
   kuras `replaceImageParts` var ievietot atpakaļ (izgūšanas↔aizstāšanas līgums): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` un Responses API `input_image`. Ligzdoti atradumi un
   tikai indikatorus saturošas formas ir paredzētas kombināciju filtram un nekad netiek izgūtas.
   Izlaist, ja nekas nav atrasts.
3. Noteikt izpildlaika konfigurāciju, izmantojot `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): jaunajām `modalityBridge*`
   iestatījumu atslēgām ir priekšroka; mantotās `visionBridge*` atslēgas paliek kā
   **viena cikla rezerves variants** (atritināšanas periods). Ja tilts ir atspējots, izlaist pirms
   jebkādas multivides apstrādes.
4. Režīma atlasītājs (`modalityBridgeVisionMode`, skatiet tālāk esošo tabulu) nosaka,
   vai veikt novirzīšanu vai aprakstīšanu. Novirzīšana atgriež `modifiedPayload`, kurā nomainīts tikai
   `model`, kā arī metadatus `{ rerouted, fromModel, toModel, imagesKept }`.
5. Aprakstīšanas ceļš: ierobežot attēlu skaitu līdz `maxImages`, izveidot uz uzdevumu orientētu uzvedni,
   pārbaudīt aprakstu kešatmiņu, izsaukt attēlu apstrādes modeli **paralēli**
   (`Promise.allSettled`) un attēlu vietā ievietot teksta daļas
   `[Image N]: <description>`. Neizdevusies aprakstīšana atgriež `null`, un sākotnējā attēla daļa tiek
   **saglabāta** (#4012) — izņemot kombinācijas aprakstīšanas ceļu, kad visas
   aprakstīšanas ir neizdevušās; tādā gadījumā apstiprināta augšupstraume bez attēlu apstrādes atbalsta saņem
   aizstājējtekstu `(unavailable — no vision-capable provider connected)` (#8430).
6. Atgriezt `modifiedPayload` un metadatus (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Režīma atlasītājs (`modalityBridgeVisionMode`)

| Režīms     | Noklusējums | Darbība                                                                                                                                                                                                                                                                                                                                                       |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔           | Mantotā heiristika bez izmaiņām (#6640/#7204): modeļi, kas nav kombināciju modeļi, un `auto/` modeļi tiek novirzīti uz labāko attēlu apstrādes modeli, ja vien sākotnējam modelim jau nav izmantojamu akreditācijas datu (tad veic aprakstīšanu); kombināciju mērķiem vienmēr veic aprakstīšanu.                                                              |
| `describe` |             | Vienmēr veikt aprakstīšanu — novirzīšanas bloks tiek pilnībā izlaists; vienmēr atbild lietotāja izvēlētais modelis.                                                                                                                                                                                                                                           |
| `reroute`  |             | Piespiedu novirzīšana: akreditācijas datus saturošā modeļa saglabāšanas pārbaude tiek apieta. Novirzīšanas **mērķa** akreditācijas datu pārbaude joprojām tiek piemērota — ja nav pieejams izmantojams attēlu apstrādes mērķis, pieprasījums pāriet uz aprakstīšanu, lai neapstrādāti attēli nekad nenonāktu tikai tekstu atbalstošā aizmugursistēmā (#8430). |

Piespiedu režīmi veic īsslēgumu **pirms** automātiskās heiristikas izpildes; `auto` darbība
baitu līmenī ir identiska aizsargmehānismam pirms PR-1.

#### API atslēgas tvērums (`visionBridgeKeyScope.ts`)

Ja izsaucēja API atslēga ierobežo `allowedConnections`, kvotu kopas
(`allowedQuotas`) vai modeļus (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), tilts novirzīšanai
un aprakstīšanai izvēlas tikai modeļus, kurus atslēga drīkst izmantot, savienojumos, kurus atslēga drīkst
izmantot. Pēc tam aprakstīšanas izsaukums vienmēr tiek veikts caur OmniRoute pašcilpu ar
galveni `x-omniroute-self-loop-key-id`, lai saņemošais tērzēšanas pieprasījums
atkārtoti piemērotu šīs atslēgas savienojumu un modeļu politiku. `enforceApiKeyPolicy()`
ņem vērā šo galveni tikai kopā ar pašcilpas nesēja pilnvarojumu, tādēļ tā var tikai
sašaurināt piekļuvi, un identifikators, kuru nevar atrisināt, tiek noraidīts.

Ja atslēgai nav atļauts neviens attēlu apstrādes modelis, aprakstīšanas ceļš atkāpjas un
pieprasījums tiek nodots tālāk bez izmaiņām — tā ir tā pati kļūmes gadījumā atvērtā darbība kā atspējotam
aizsargmehānismam (metadati `{ skipped: true, reason: "no_permitted_vision_model" }`).
Pieprasījumi bez atslēgas un atslēgas bez šiem ierobežojumiem darbojas tieši tāpat kā
iepriekš.

#### Uz uzdevumu orientēta aprakstīšanas uzvedne (`modalityBridgeVisionTaskAware`)

Noklusējums ir **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) pamata
aprakstīšanas uzvednei pievieno **pēdējā lietotāja ziņojuma** tekstu (saīsinātu līdz
500 rakstzīmēm), virzot aprakstu uz to, ko lietotājs patiesībā jautāja
(codex-vision-proxy pieeja), un lūdzot redzes modelim transkribēt redzamo
tekstu. Ja karodziņš ir izslēgts vai lietotāja teksta nav, pamata uzvedne tiek
izmantota bez izmaiņām.

Aprakstīšanas pašcilpa savā ar OpenAI saderīgajā pieprasījumā (`callVisionModelSingle()`
failā `visionBridgeHelpers.ts`) vienmēr pieprasa `image_url.detail: "high"` —
bez nosacījumiem, katram izsaucējam/pakalpojumu sniedzējam un neatkarīgi no
jebkāda klienta signāla. Zemas detalizācijas iztveršana pasliktina OCR
precizitāti tieši tam teksta transkripcijas uzdevumam, kuru pieprasa šī uzvedne,
tādēļ pats aprakstīšanas izsaukums vienmēr pieprasa augstu detalizāciju neatkarīgi
no tā, kādu detalizācijas līmeni izmantoja sākotnējais ienākošais pieprasījums.
Tas ietekmē tikai iekšējā aprakstīšanas pieprasījuma pamattekstu; tas nemaina to,
kā OmniRoute pārsūta izsaucēja paša `image_url.detail` primārajā pieprasījumā —
šī noklusējuma vērtība tiek piemērota atsevišķi un tikai identificētiem OpenCode
klientiem funkcijā `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Aprakstīšanas pašcilpas Anthropic vadu formāta atzarā nav lauka `detail`, un
neviens no šiem noklusējumiem to neietekmē.

#### Apraksta izvades ierobežojums (`modalityBridgeVisionMaxChars`)

| Atslēga                        | Noklusējums | Diapazons         |
| ------------------------------ | ----------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`         | `0` vai 100–50000 |

`0` (noklusējums) nozīmē, ka **ierobežojuma nav** — `callVisionModel()`
atgrieztais apraksts tiek nodots tālāk nemainīts, saglabājot līdzšinējo
darbību. Jebkura vērtība diapazonā 100–50000 saīsina aprakstu un pievieno
sufiksu `…`, pirms tas tiek ievietots atpakaļ kā
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` failā
`src/lib/guardrails/visionBridge.ts`). Palieliniet šo vērtību detalizētiem OCR
uzdevumiem, kuros pakārtotajam modelim ir nepieciešama pilna transkripcija;
samaziniet to, lai ierobežotu tokenu lietojumu runīgiem redzes modeļiem.
Informācijas paneļa lauks atrodas cilnes Vision panelī Advanced
(`modality-bridge-max-chars` failā `ModalityBridgeVisionTab.tsx`) un jebkuru
vērtību no 1 līdz 99 palielina līdz minimālajai vērtībai 100, vienlaikus
atstājot nepārprotami norādītu `0` neskartu — `0` pati par sevi ir derīga Zod
vērtība (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nevis
tikai noklusējums, kas apzīmē „nav iestatīts”.

#### Aprakstu kešatmiņa (`modalityBridge/bridgeCache.ts`)

Procesa mērogā koplietota atmiņas LRU + TTL kešatmiņa aprakstu izvadei.
Atslēga = `sha256(imageRef + composedPrompt + configuredBridgeModel)` ar
garuma prefiksa ierāmēšanu (bez lauku robežu kolīzijām). Modeļa komponents ir
**konfigurētais** tilta modelis, nevis modelis, kas faktiski atbildēja —
`callVisionModel` iekšēji var izmantot atkāpšanās variantu, un atslēgas
veidošana katram mēģinājumam sadrumstalotu kešatmiņu. Neveiksmīgi apraksti
nekad netiek saglabāti kešatmiņā. Iestatījumi:

| Atslēga                         | Noklusējums | Diapazons |
| ------------------------------- | ----------- | --------- |
| `modalityBridgeCacheEnabled`    | `true`      | —         |
| `modalityBridgeCacheTtlMinutes` | `60`        | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`       | 10–5000   |

#### Attālo attēlu normalizēšana (pašcilpas aprakstīšana/base64 izgūšana)

Kad tilts pats izgūst **attālu** attēlu — gan Anthropic aprakstīšanas
pašizsaukumam, gan claude vadu formāta base64 pārveidošanai
(`ensureBase64ImagesForClaudeWire`), abos gadījumos izmantojot
`fetchRemoteImageAsDataUri()` failā `visionBridgeHelpers.ts` — iegūtais datu
URI pirms iegulšanas redzes modeļa pieprasījumā tiek nodots funkcijai
`normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`). Pārāk lieli attēli
tiek samazināti līdz **2048px garākajai malai** (atbilstoši izmēra
ierobežojumam, ko OpenAI/Anthropic jau piemēro servera pusē), tādējādi
samazinot augšupielādes baitu apjomu/aizkavi, nemainot to, ko redz redzes
modelis. Izmēru maiņai tiek izmantots `sharp`, kas tiek ielādēts ar dinamisku
importēšanu: platformā, kur tā vietējo bināro failu neizdodas ielādēt,
`normalizeDataUri()` **nekad neizmet kļūdu** — tā atkāpjas uz sākotnējo baitu
tiešu nodošanu, tāpēc aprakstīšanas/base64 pārveidošanas ceļš vienmēr turpina
darboties. Arī baiti, kas nav attēls (izgūšanas rezultāts, kurā nav atkodējama
attēla), tiek nodoti tālāk neskarti. Šī normalizēšana attiecas tikai uz
attēliem, kurus tilts izgūst savam pašizsaukumam — tā nekad netiek piemērota
izsaucēja neapstrādātajai tieši nododamajai lietderīgajai slodzei atbilstoši
principam, ka izmaiņas veicamas tikai pēc izvēles (stingrais noteikums Nr. 20).

#### Iestatījumu shēma + migrācija

Jaunās `modalityBridge*` atslēgas tiek validētas ar Zod shēmā
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCache*` trijotne un grupa `modalityBridgeAudio*`, ko izmanto
Audio Bridge. Migrācija `141_modality_bridge_settings.sql` kopē esošās mantotās
`visionBridge*` vērtības uz atbilstošajām jaunajām atslēgām (idempotenti,
nekad nepārrakstot operatora iestatītu `modalityBridge*` vērtību); mantotās
atslēgas vienu laidiena ciklu joprojām tiek pieņemtas kā lasīšanas atkāpšanās
variants.

#### Caurspīdīguma galvene + statistika

Ar aprakstīšanu pārveidotajām atbildēm ir galvene
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(to izveido `buildModalityBridgeHeader()` failā `modalityBridge/bridgeStats.ts`
un pievieno `withModalityBridgeHeader()` failā `src/sse/handlers/chatHelpers.ts`).
Pārmaršrutētie pieprasījumi **nesaņem** galveni — lietderīgā slodze netika
mainīta, un modeļa nomaiņa jau ir redzama atbildes pamatteksta laukā `model`.

`GET /api/modality-bridge/stats` (ar pārvaldības autentifikāciju, tajā pašā līmenī kā
`GET /api/settings`) atgriež atmiņā glabātos katras modalitātes skaitītājus
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` modalitātēm `vision`, `audio` un
`video`. `averageLatencyMs` kā saucēju izmanto `latencySamples`, nevis visus
mēģinājumus; darbība bez laika mērījuma nerada mākslīgu nulles milisekunžu
paraugu. `bridged` paliek ar iepriekšējām versijām saderīgs sekmīgo
pārveidojumu aizstājvārds; neveiksmīgi mēģinājumi to nepalielina.
Pēc procesa restartēšanas skaitītāji pēc noklusējuma tiek atiestatīti
(telemetrija, nevis uzskaite).

#### Informācijas paneļa konfigurācija

Atsevišķā informācijas paneļa lapa ir
`/dashboard/settings/modality-bridge`. Tās ar URL adresējamās cilnes `Vision`, `Audio`
un `Video`, pārslēdzot `tab` vērtību, saglabā vaicājuma parametrus.
Cilnē Vision ir pieejama iespējošana, režīms, modeļa atlase (tostarp automātiskā
noklusējuma izvēle), uzdevumu ņemoša vērā uzvedņu veidošana, papildu noildzes/attēla/apraksta
garuma/kešatmiņas ierobežojumi, izpildlaika
skaitītāji un aizsargāts parauga pieprasījums. Arī cilne Audio ir pilnībā funkcionāla:
tajā ir pieejama iespējošana, tikai STT paredzēta modeļa izvēle ar Auto, noildzes/maksimālā
klipa ilguma ierobežojumi, audio skaitītāji un `input_audio` parauga tests. Cilne Video
ir funkcionāla: tā parāda FFmpeg/ffprobe izpildlaika stāvokli — vienu no četriem
skaidri definētiem lietotāja saskarnes stāvokļiem (`unknown`, kamēr pārbaude notiek vai
to nevarēja pabeigt, `restricted`, ja informācijas paneļa resursdators nav lokālās
cilpas adrese un pārbaude tiek izlaista klienta pusē, `unavailable`, kad pārbaude
ir pabeigta un prombūtne apstiprināta, vai `available` kopā ar FFmpeg/ffprobe
versijām) —, pastāvīgi saglabā iespējošanas/modeļa/kadru/video/noildzes ierobežojumus,
filtrē modeļu izvēlni, atstājot modeļus ar redzes apstrādes iespējām, un parāda video
skaitītājus.

Iepriekšējā Vision Bridge kartīte AI iestatījumos tagad ir saderības saite uz
jauno lapu; tajā vairs nav otras veidlapas kopijas. Media Providers arī
pievieno saites no Image-to-Text un Speech-to-Text darbplūsmām uz atbilstošajām
Modality Bridge cilnēm, nenoņemot esošo Speech-to-Text izmēģinājumu vidi.

**Pašcilpas piekļuves pārbaudes apiešana:** ja aprakstīšanas izsaukums tiek maršrutēts
caur OmniRoute paša `/v1` pašcilpu (nestandarta nodrošinātāja modelis), apakšpieprasījums
nosūta `x-omniroute-admission-bypass: internal` un tiek autentificēts ar atrisināto
pašcilpas akreditācijas informāciju — lokālo `sk_omniroute` marķieri lokālajā režīmā
vai operatora konfigurēto `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` vides atslēgu (#1350),
lai izvietojumi ar `REQUIRE_API_KEY=true` joprojām varētu izpildīt aprakstīšanas
izsaukumu. Apiešana tiek atļauta tikai ar tieši šo akreditācijas informāciju, tāpēc
ārējie klienti nevar izmantot galveni, lai izlaistu piekļuves pārbaudi.

Mantotās noklusējuma vērtības atrodas `src/shared/constants/visionBridgeDefaults.ts`;
jaunā režīma/uzdevumu ņemošās vērā darbības/kešatmiņas noklusējuma vērtības un
iestatījumu atrisinātājs atrodas
`src/shared/constants/modalityBridgeDefaults.ts`. Aizsargmehānisms piedāvā
`deps` konstruktora opciju, lai testos varētu ievadīt viltotas `getSettings` un
`callVisionModel` implementācijas.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Pārtver tērzēšanas pieprasījumus, kas satur audio, pirms tie sasniedz mērķi, par kuru
nav zināms, ka tas pieņem audio ievadi. Tas nekad nemaina tērzēšanas pieprasījuma
maršrutu: audio daļas tiek transkribētas, izmantojot esošo ar OpenAI saderīgo
daudzdaļu galapunktu, un izvēlētais tērzēšanas modelis turpina darbu ar teksta
transkriptiem.

Plūsma:

1. Atrisiniet `supportsAudio`, izmantojot `getResolvedModelCapabilities()`. Priekšroka
   ir skaidri norādītiem nodrošinātāju reģistra metadatiem, pēc tam statiskajiem
   modeļa metadatiem un visbeidzot sinhronizētajam `modalities_input`. Deklarēts
   ievades saraksts bez `audio` dod `false`; ja nav nekādu spēju apliecinājumu,
   rezultāts ir `null`. Gan `false`, gan `null` aktivizē konservatīvo tiltu, bet
   `true` to apiet.
2. Atrisiniet `modalityBridgeAudio*` iestatījumus un no katra ziņojuma izgūstiet
   savienojamas augstākā līmeņa audio daļas, izmantojot kopīgo `detectMediaParts()`
   detektoru. Atbalstītie datu pārraides formāti ir OpenAI `input_audio`, `audio_url`
   un `source.media_type: "audio/*"`. Ligzdots audio tiek noteikts maršrutēšanai,
   bet savienošanas ceļš to nenoņem. Darba apjomu ierobežo
   `modalityBridgeAudioMaxClips`; turpmākās daļas paliek neskartas.
3. Izmantojiet konfigurēto `provider/model` vai ļaujiet `selectAudioBridgeModel()`
   stabilā kataloga secībā pārskatīt `AUDIO_TRANSCRIPTION_PROVIDERS` un atlasīt
   pirmo modeli ar izmantojamu aktīva nodrošinātāja akreditācijas informāciju.
4. `callAudioTranscription()` pārveido base64/datu URI audio par daudzdaļu
   `file` vai lejupielādē attālu `audio_url`, izmantojot tikai publiskai piekļuvei
   paredzēto izejošo savienojumu aizsargmehānismu ar DNS piesaisti un 25 MB
   ierobežojumu. Pēc tam tas ar POST nosūta failu un atlasīto modeli uz lokālo
   `/v1/audio/transcriptions` pašcilpu, autentificējoties ar
   `resolveSelfLoopBearer()`. Esošais transkripcijas maršruts veic parasto
   akreditācijas informācijas uzmeklēšanu, atdzišanas perioda/ātruma ierobežojumu
   apstrādi un nosūtīšanu nodrošinātājam.
5. Sekmīgi izsaukumi aizstāj attiecīgās daļas ar `[Audio N]: <transcript>`.
   Izsaukumi tiek izpildīti ar `Promise.allSettled`: atsevišķas kļūmes gadījumā
   sākotnējā audio daļa tiek saglabāta (#4012 līgums). Ja visi izsaukumi neizdodas
   un ir pierādīts, ka mērķim `supportsAudio === false`, daļas kļūst par
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 līgums).
   Nezināmam mērķim (`null`) rezultāts, kurā visi izsaukumi neizdevās, paliek
   neskarts. Pierādīti tikai tekstu atbalstošs mērķis bez izmantojamas STT
   akreditācijas informācijas saņem to pašu skaidro aizstājējtekstu bez tīkla
   izsaukuma veikšanas.

Sekmīgi transkripti izmanto visa procesa Modality Bridge LRU/TTL kešatmiņu.
Atslēga apvieno audio atsauci, stabilo `audio-transcription` darbības
apzīmējumu un atlasīto STT modeli; kļūmes nekad netiek ievietotas kešatmiņā.
Audio mēģinājumi atjaunina kopīgos `bridged`, `cacheHits`, `failures` un
`lastUsedAt` skaitītājus. Pārveidotajās atbildēs ir
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; neskarti
pieprasījumi nesaņem Audio Bridge segmentu.

Izpildlaika iestatījumi tiek glabāti datubāzē un validēti ar Zod:

| Atslēga                       | Noklusējums | Diapazons              |
| ----------------------------- | ----------- | ---------------------- |
| `modalityBridgeAudioEnabled`  | `true`      | —                      |
| `modalityBridgeAudioModel`    | `""`        | Automātiski vai STT ID |
| `modalityBridgeAudioTimeout`  | `60000`     | 1000–300000            |
| `modalityBridgeAudioMaxClips` | `3`         | 1–10                   |

Koplietojamo kešatmiņu joprojām kontrolē `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` un `modalityBridgeCacheMaxEntries`.

### Video tilts (`videoBridge.ts`, `videoBridgePipeline.ts`)

Pārtver augstākā līmeņa video daļas Chat Completions `messages` un Responses
API `input`, pirms tiek izsaukts mērķis, kuram nav zināms vietējais video
atbalsts. Atbalstītās formas ir `input_video`, `video_url`, `video_source`, HTTPS URL
un `data:video/*;base64,...` datu URI. Vienkārši failu nosaukumi tekstā netiek uzskatīti
par video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) pārvalda pieprasījuma traversēšanu,
spēju/politikas pārbaudi, katra pieprasījuma apkopošanu un atbildes lietderīgo slodzi.
Katra video apstrāde — iegūšana, visa rezultāta kešatmiņa, kadru
secības aprakstīšana (kas apvieno arī jebkuru izsaucēja norādītu audio transkripciju),
kā arī katra mēģinājuma metrika/pārtraukšana/tīrīšana — ir paslēpta aiz
`processVideoPart` modulī `videoBridgePipeline.ts`, un tā tiek izsaukta vienreiz katrai
video daļai `preCall` ciklā. Šis modulis definē arī skaidrās portu robežas
`VideoMediaBrokerPort` (baitu iegūšana un iztvērto kadru izvilkšana),
`VideoAudioTranscriptionPort` (izsaucēja norādītas audio transkripcijas apvienošana
ar iztverto kadru parakstiem) un `VideoDrilldownPort` (kadru detalizētās izpētes
saglabāšanas robeža; vēl nav savienota ar `processVideoPart` — pašlaik detalizētās
izpētes ierakstus veido tikai atsevišķais maršruts
`/api/modality-bridge/video/drilldown`).

Publiskais `/v1` pieprasījuma ceļš nekad neimportē un neizsauc apakšprocesu. Attālie
video tiek lejupielādēti ar 50 MiB ierobežojumu; iekļautajiem base64 video ir
konservatīvs 36 MiB atkodētā satura ierobežojums katram video, lai modeļa/ziņojumu/kadrēšanas
apvalks varētu palikt publiskā JSON pieprasījuma pieņemšanas 50 MiB ierobežojumā.
Iekļautā satura garums un atkodētā izmēra aplēses tiek pārbaudītas pirms atmiņas
piešķiršanas. HTTPS ir obligāts sākotnējam attālajam URL un katrai pāradresācijai,
izmantojot esošo tikai publiskām adresēm paredzēto izejošo savienojumu aizsardzību ar
DNS piesaisti. Pēc tam baiti šķērso precīzo iekšējo
`POST /api/modality-bridge/video/extract` brokera robežu. Šis maršruts ir gan
`LOCAL_ONLY`, gan `SPAWN_CAPABLE`, pieņem tikai katram procesam autentificētu,
uzticamu lokālās atgriezeniskās saites pieprasījumu un nekad nepieņem URL, failu
sistēmas ceļu, izpildāmo failu vai argumentu sarakstu. API pamatteksta izmēra konveijers
un apstrādātāja inkrementālais pamatteksta lasītājs neatkarīgi viens no otra piemēro
50 MiB brokera ievades ierobežojumu. Tā ierobežotā rinda vienlaikus izpilda vienu
izvilkšanas uzdevumu, atļauj četrus gaidošus uzdevumus un ierobežo gaidošās ievades
apjomu līdz 100 MiB.

Brokerī `ffprobe` nolasa privātu lokālo failu; fiksētais formātu atļaušanas saraksts
neietver atskaņošanas sarakstu un manifestu formātus. Atļautajiem MOV saimes
konteineriem ārējās MOV datu atsauces pēc noklusējuma paliek atspējotas, un
fiksētā komanda tās neiespējo. Gan `ffprobe`, gan `ffmpeg` izmanto tikai `file`
protokola atļaušanas sarakstu, vienu pavedienu, fiksētus argumentu masīvus, neizmanto
čaulu, un izpildāmie faili tiek atrasti no `PATH`. Pievienotu attēlu vāku straumes
nav atskaņojamas kandidātstraumes. Visām atskaņojamajām straumēm jāatbilst
ierobežojumiem, un pirms deterministiskās rezerves izvēles ar zemāko indeksu priekšroka
tiek dota nepārprotami norādītai noklusējuma straumei. Video ilgums ir ierobežots līdz
600 sekundēm, katra dimensija — līdz 8 192 pikseļiem, bet avota pikseļu skaits —
līdz 33 554 432. FFmpeg iztver 1–16 JPEG kadrus intervālu viduspunktos, samazina
garāko malu līdz ne vairāk kā 1 024 pikseļiem, nepalielinot mazākas ievades, un
nekad nesaņem URL. Pēc noklusējuma iztveršana ir `uniform`. Izvēles politikas
`scene_aware` un eksperimentālā `segment_aware` veic vienu papildu fiksētu FFmpeg
pāreju pār jau validēto lokālo straumi, atlasa ierobežotas `showinfo` ainu laikatzīmes
un detektora kļūmes, taimauta, nepareizi veidotas izvades vai tukšas kandidātu kopas
gadījumā deterministiski atgriežas pie tiem pašiem vienmērīgajiem viduspunktiem.
Segmentus ņemošais vērā režīms sadala viduspunktu paraugus proporcionāli validētajiem
ainu intervāliem; segmentus ņemošie vērā pierādījumi un atkāpšanās darbība ir sīkāk
aprakstīti tālāk. Stingrais 16 kadru ierobežojums katrā politikā tiek
piemērots pēc atlases. Ja ainas ņemošam vērā pieprasījumam ir tikai viena kadra
budžets, tas izmanto aktīvā pilnā video vai fokusa loga vienmērīgo viduspunktu un
ziņo `policyEffective: uniform`: viens atlasīts ainas kadrs nevar saglabāt abus
laika diapazona galus. Izsaucējs pēc izvēles var norādīt galīgu fokusa logu
(`start`/`end` sekundēs); robežas tiek ierobežotas līdz multivides ilgumam,
apgriezti vai galīgi nenosakāmi logi tiek noraidīti, un visas iztveršanas
politikas tiek izpildītas tikai normalizētajā intervālā. Iegūtais logs tiek
iekļauts iztveršanas metadatos un neuzticamajā apraksta prefiksā, lai pakārtotie
modeļi varētu atšķirt fokusētu fragmentu no pilnās laika skalas.

Semantiskais parakstu fokuss ir atsevišķs, skaidri norādāms iestatījums. Noklusējuma
`full` analīzes režīms saglabā esošo kadru uzvedni un nekad nepārsūta pieprasījuma
tekstu parakstu modelim. Režīmā `focused` tilts nolasa tikai jaunāko netukšo lietotāja
izveidoto `text`/`input_text` no tā paša Chat vai Responses konteinera, normalizē to
NFC formā, sakļauj vadības rakstzīmes un atstarpes un ierobežo līdz 500 Unicode koda
punktiem. Tukšs rezultāts liek atgriezties pie precīzās `full` uzvednes. Izmantojams
norādījums tiek serializēts kā JSON īpašā neuzticama lietotāja konteksta blokā un
drīkst tikai noteikt novērojamu detaļu prioritāti; tas nevar ignorēt atsevišķo
brīdinājumu nesekot instrukcijām, kas redzamas vai dzirdamas multividē. Tekstuālais
fokuss nekad neatvasina `start`/`end` un nemaina temporālo iztvērēju.

#### FU-07 strukturālie segmentu pierādījumi

`segment_aware` izmanto vienu ierobežotu iepriekšējās analīzes gājienu pār jau
validēto lokālo video straumi. Fiksētā filtru ķēde vispirms mērogo video līdz
ne vairāk kā 320 pikseļu platumam, nosaka ainu maiņas un sastingušus intervālus
un pēc tam ņem 1 kadra sekundē paraugus, lai noteiktu izplūdumu, vidējo spožumu
un telpisko/laika informāciju. Gājiens ir ierobežots līdz 600 strukturāliem
paraugiem, vienam FFmpeg/filtra pavedienam, tiem pašiem tikai `file` protokola
un konteineru atļauto vērtību sarakstiem, 1 MiB procesa izvades ierobežojumam
un ne vairāk kā 30 sekundēm brokera kopīgajā pārtraukšanas/termiņa periodā. Tas
nekad nepieņem komandu, filtru, ceļu vai URL no pieprasījuma.

Strukturālās vērtības ir deterministiski paraugu ņemšanas pierādījumi, nevis
video semantiska izpratne. Tās neizsecina subjektus, darbības, parakstus, runu
vai lietotāja nolūku. Ainu un sastinguma robežas veido segmentus; sastinguma
pārklājums, izplūdums, ekspozīcija, telpiskā detalizācija un izmaiņas laikā
ietekmē tikai to, kā tiek sadalīts esošais 1–16 kadru budžets. Pilnībā sastingušam
segmentam ir noteikts ne vairāk kā viens kadrs, savukārt nesastingušie segmenti
sacenšas par atlikušo budžetu. Ja robežu ir vairāk nekā kadru, tiek saglabāts
vienmērīgs laika skalas pārklājums, lai straujas agrīnas montāžas pārejas
nevarētu noslēpt garu beigu segmentu. Ainu robežas, kas atrodas 1 sekundes
analīzes izšķirtspējas robežās no sastinguma robežas, tiek apvienotas.

Trūkstoši filtri, nepareizi formatēti/tukši pierādījumi, detektora kļūda vai
ierobežotās iepriekšējās analīzes noildze izmanto kļūmjdrošu atkāpšanos uz
precīzo vienmērīgo viduspunktu politiku. Zvanītāja izraisīta pārtraukšana vai
brokera termiņš neizraisa šādu atkāpšanos: tas pārtrauc izpildē esošo
apakšprocesu, novērš turpmāku kadru izgūšanu, un privātais pagaidu koks tiek
noņemts blokā `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` ģenerē deterministiskas reālas FFmpeg
testa datnes, lai novērtētu parakstu izsaukumu ietaupījumu pēc dublikātu
noņemšanas, kadru budžeta sadalījumu intensīvas kustības gadījumā,
izplūduma/ekspozīcijas/SI-TI pierādījumus, straujas montāžas pārejas ar garu
beigu daļu un pakāpeniskas izbalēšanas kļūdaini pozitīvos rezultātus. Tas
reģistrē iepriekšējās analīzes faktisko izpildes laiku un, ja ir pieejams
`/usr/bin/time`, arī bērnprocesa CPU laiku un maksimālo RSS. Tā kvalitātes
pārbaudes ir tikai strukturāli etaloni. Reālā parakstu modeļa kvalitātes
statuss paliek `HOLD`, jo šim testēšanas ietvaram nav autorizēta galapunkta vai
fiksēta vērtētāja. Arī monetārā ietaupījuma statuss paliek `HOLD`, ja vien
`--caption-cost-per-call-usd` nenorāda skaidru pozitīvu izmaksu novērtējumu
katram izsaukumam; skripts nekad neizdomā nevienu no šiem rezultātiem.

Katra kadra ierobežojums ir 4 MiB, visu neapstrādāto kadru kopējais ierobežojums
ir 23 MiB, bet serializētās brokera atbildes ierobežojums — 32 MiB. Privātais
pagaidu direktorijs tiek noņemts blokā `finally`. OmniRoute neietver FFmpeg un
nepieņem pielāgotu izpildāmā faila ceļu. Pirms parakstu veidošanas tilts veic
konservatīvu vizuālo dublikātu noņemšanas gājienu: katrs JPEG tiek samazināts
līdz 16×16 pelēktoņu buferim un salīdzināts tikai ar pēdējo saglabāto kadru.
Ja pieprasītais parakstu budžets pārsniedz vienu kadru, izgūšana nodrošina
ierobežotu kandidātu kopu, kuras apjoms nepārsniedz divkāršu budžetu un nekad
nav lielāks par 16 kadriem. Pieprasītais ierobežojums tiek piemērots tikai pēc
dublikātu noņemšanas; ja budžets ir vismaz divi kadri, galīgās retināšanas laikā
tiek saglabāts pirmais un pēdējais atlasītais kandidāts. Versijotā
`grayscale-16x16-mean-cells-v2` politika izmanto lielāko vērtību no vidējās
spožuma atšķirības un sīktēla šūnu īpatsvara, kuru normalizētā atšķirība ir
vismaz 0.05. Dublikātu slieksnis ir konstante 0.04, kas izvēlēta paredzamības
dēļ, nevis pieejama kā izpildlaika iestatījums. Šis sekundārais augsta kontrasta
signāls saglabā nelielas kustības un redzama teksta izmaiņas, ko var paslēpt
salīdzinājums, kura pamatā ir tikai vidējā vērtība. Salīdzinātāja vai dekodētāja
kļūdas izmanto kļūmjdrošu režīmu un saglabā pārklājumu. Izvades metadatos ir
atsevišķi norādīti izgūtie kandidāti, veiksmīgi izmantotie kadri un atmestie
vizuālie dublikāti.

Skaidri atzīmēta video daļa var pieprasīt kontaktkopiju ar laikspiedoliem. Tilts
izveido JPEG režģi ar ne vairāk kā 4 kolonnām un 16 kadriem. Katrā 512 pikseļu
šūnā tās avota laikspiedols tiek iestrādāts augsta kontrasta apakšējā joslā,
savukārt tie paši laikspiedoli tiek saglabāti teksta metadatos turpmākai
saistīšanai un auditam. Pilna JPEG ierobežojums joprojām ir 32 MiB. Ja `sharp`
nevar dekodēt vai izveidot režģi, tilts atkāpjas uz atsevišķajiem JPEG kadriem;
klienta izraisīta pārtraukšana joprojām tiek pārsūtīta kontaktkopijas operācijai.

Paaugstināšanas pierādījumi ir apzināti nodalīti no sintētiskā kompozīcijas
mikroveiktspējas testa. `scripts/perf/video-bridge-contact-sheet-eval.ts` definē
ar shēmas versiju apzīmētu A/B testēšanas ietvaru reāliem ar OpenAI saderīgiem
redzes modeļiem. Tas mēra pakalpojuma sniedzēja uzrādīto marķieru skaitu,
pilno izpildes latentumu (ieskaitot kontaktkopijas izveidi), modeļa izsaukumu
skaitu un manifestā definēto faktu saglabāšanu. Neapstrādātās modeļa atbildes
netiek ierakstītas pārskatā; tiek saglabāti tikai SHA-256 jaucējkodi un atbilstošo
faktu ID. Testēšanas ietvars neveic tīkla vai maksas modeļa izsaukumus, ja vien
nav nodots `--execute-real` un konfigurēti `--model`, `OMNIROUTE_BASE_URL` un
`OMNIROUTE_API_KEY`. Bez šādas skaidri pieprasītas reālas izpildes tā
mašīnlasāmā sprieduma statuss paliek `HOLD`; sintētiski lietderīgās slodzes vai
izsaukumu skaita mērījumi vien nav paaugstināšanas pierādījumi.

Zvanītāji var pievienot neobligātu `transcript.cues` masīvu atbalstītai video
daļai, ja viņu rīcībā jau ir sinhronizēts teksts. Katrā norādē jābūt `text`,
galīgvērtīgam `start`/`end` intervālam pārbaudītā ilguma robežās un atļauto
vērtību sarakstā iekļautam `source` (`client`, `embedded` vai `audio-bridge`);
`confidence` noklusējuma vērtība ir `1`, un tai jāpaliek diapazonā no `0` līdz
`1`. Pilnīgi identiskas norādes tiek apvienotas. OmniRoute nekad nesāk
transkribēšanu no šiem metadatiem: validētās norādes tiek kopētas aprakstītajā
rezultātā kopā ar avotu, pārliecības vērtību un intervālu un tiek attēlotas kā
neuzticami novērojumi līdzās kadru parakstiem. Nederīgs, ārpus diapazona esošs
vai bez izcelsmes informācijas sniegts teksts tiek noraidīts, nevis iekļauts
parakstu plūsmā. Abi pieprasījuma pamatteksta transkripta kanāli normalizē
norādīto izcelsmi uz `client`, tostarp pašdeklarētās `embedded` vai
`audio-bridge` etiķetes. Tikai servera pārvaldīts adapteris var piešķirt šīs
uzticamās etiķetes, izmantojot tikai kodā pieejamo `trustedSource` argumentu;
pieprasījuma JSON lauks nevar sasniegt šo argumentu. Transkripta teksts
neatkarīgi no tā izcelsmes paliek neuzticams, no multivides atvasināts saturs
un nekad nedrīkst noteikt autorizāciju.

Pieredzējis izsaucējs tam pašam video var norādīt `audioTranscript` celiņu;
tas tiek uzskatīts par klienta nodrošinātu tekstu, nevis servera veiktas transkripcijas pierādījumu.
Apvienošanas robežslānis izpilda vizuālos un audio novērojumus ar
vienu izpildes termiņu un pārtraukšanas signālu, sakārto tos kopīgā laika skalā, apvieno
pilnīgi identiskus dublikātus un ziņo par daļēju rezultātu, ja sekmīga ir tikai viena puse.
Nederīgs `audioTranscript` tiek pazemināts līdz šādam daļējam rezultātam — vizuālais
apraksts tiek saglabāts, bet audio zars reģistrē sanitizētu kļūmes kodu —
tā vietā, lai visa video apstrāde beigtos ar kļūmi. Katra zara pieejamība, daļēja rezultāta karogs
un sanitizētie kļūmju kodi tiek saglabāti aprakstītajā rezultātā,
aizsargmehānisma metadatos (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), rezultātu kešatmiņas metadatos un tilta
apvienošanas skaitītājos. Video Bridge noklusējuma ceļš neizsauc runas pārvēršanu tekstā
un nelejupielādē otru multivides kopiju; bez šī skaidri norādītā celiņa tas paliek
tikai video režīmā.

**Transkripcijas saglabāšana (#12150 P1).** Tas tiek lietots automātiski ikreiz, kad
Video Bridge (kas pats ir jāiespējo) atveido transkripcijas norādi — atsevišķa
saglabāšanas karoga nav. Kad pieprasījums atveido jebkādu transkripcijas norādi (izsaucēja deklarētu
`transcript` vai apvienotu `audioTranscript`), aizsargmehānisms to atzīmē kā
`videoBridgeObserved` un izveido rediģētu video apraksta ēnkopiju —
identisku atveidojumu, kurā katras norādes brīvteksta saturs ir aizstāts ar
`[redacted-video-transcript]`; tā tiek veidota, aizstājot strukturēto norādes lauku
pirms virknes izveides (nekad neparsējot saplacināto tekstu, tāpēc neviens norādes
saturs — nedz ļaunprātīgs, nedz parasts, tostarp saturs, kurā ir `]`, piemēram,
`[inaudible]`/`[music]` — nevar saglabāties). Saglabātā izsaukuma žurnāla pieprasījuma pamattekstā
katra no video iegūtā teksta daļa tiek aizstāta ar šo rediģēto ēnkopiju, veicot atbilstības
pārbaudi pēc satura vienādības; `fullText` enkurs tiek atkārtoti nolasīts no pabeigtās pirmsizsaukuma aizsargmehānisma
lietderīgās slodzes, tāpēc atbilstības pārbaude joprojām izdodas pēc tam, kad vēlākie ķēdes aizsargmehānismi (PII un
akreditācijas datu maskētāji ar prioritātēm 10/95) pārraksta apraksta tekstu uz vietas, kā arī
pēc tam, kad sistēmas uzvednes/nodošanas/atmiņas ievietošana pārveido ziņojumu masīvu. Modelim
augšup nosūtītais pamatteksts netiek mainīts. Novērots pieprasījums arī neaizpilda
pastāvīgo Memory (tiek izlaista gan no pieprasījuma, gan no atbildes iegūto datu izgūšana),
tāpēc paša modeļa atbilde nevar atbalsot transkripcijas tekstu Memory.

**Neapstrādāti video lauki (#12430).** Kad tilts ir iespējots un vietējais video atbalsts nav zināms vai nav pieejams, definēti `transcript`/`audioTranscript` lauki arī aktivizē `videoBridgeObserved` pat pēc apraksta kļūmes vai `maxVideos` ierobežojuma sasniegšanas. `null` un tukšas virknes tiek ņemtas vērā; neesoši lauki un ar video nesaistīti metadati — netiek. Saglabātajās kopijās šie lauki tiek rediģēti vai pieprasījums tiek izlaists, un kešatmiņas/Memory tiek apietas.

Šajos atkāpšanās ceļos derīgas izsaucēja norādes kļūst par atbalstītām `text`/`input_text`
daļām, nevis nestandarta nodrošinātāja laukiem. Abi pieprasījumā norādītie celiņi
paliek neuzticami `client` novērojumi ar skaidru brīdinājumu, ka video
netika aprakstīts un laikspiedoli netika pārbaudīti pret multividi. Esošie
256 norāžu/64 KiB kopējie un katras norādes budžeti attiecas uz abiem celiņiem kopā;
laikspiedoliem jāiekļaujas brokera 600 sekunžu robežā un jebkurā norādītajā fokusa
logā. Nederīgi celiņi tiek atmesti, nevis pārsūtīti kā patvaļīgs teksts; derīgs
paralēlais celiņš joprojām var tikt izmantots, ja vien netiek pārsniegts to kopējais budžets. Nulles vērtības/tukši
lauki nepievieno tekstu. Šis atkāpšanās mehānisms nepievieno multivides iegūšanu vai transkripciju.
Transkripcijas paplašinājuma lauki tiek noņemti no atkāpšanās video nesēja un tā
`video_url`/`source` objektiem. OpenAI pārraides atļauto lauku saraksts paliek stingrs; nesēji ar nezināmu vietējo
video atbalstu joprojām ir pieejami, bet zināmi mērķi, kas atbalsta tikai tekstu, saglabā drošos marķierus.
Strukturētas rediģēšanas ēnkopijas aizsargā pievienoto transkripcijas tekstu, savukārt
sākotnējais izsaucējam piederošais pieprasījums paliek nemainīts. Mērķi ar vietējo atbalstu un
atspējoti tilti saglabā savu esošo apiešanas darbību.

Papildu saglabātās kopijas izmanto to pašu novērota pieprasījuma signālu. Neapstrādātais
pirmsaizsargmehānisma klienta pieprasījuma momentuzņēmums, atmiņā esošais neizpildītais pieprasījums un agrīnais
noraidītā pieprasījuma žurnāls strukturāli aizstāj transkripcijas laukus video daļās;
konveijera posmu un konteksta nodošanas sintezētās virkņu uzvednes tiek rediģētas
saglabātā pieprasījuma pamatteksta galamērķī. Saglabātais `video_content_removed` marķieris
liek `previous_response_id` turpinājumam droši atteikties, nevis rekonstruēt
tekstu, kas tika apzināti atmests. Ja novērots pieprasījums pirms reģistrēšanas zaudē savu
katras daļas rediģēšanas ēnkopiju vai kaut viena no vairākām video ēnkopijām
pēc vēlākām pieprasījuma izmaiņām vairs neatbilst, saglabātais pieprasījuma pamatteksts tiek
pilnībā izlaists, nevis tiek saglabāta daļēji rediģēta transkripcija.

Novērotam pieprasījumam modeļa atbilde var citēt jebkuru transkripcijas daļu
bez strukturētas norādes robežas. Tāpēc tās izsaukuma žurnālā saglabātais
`responseBody` tiek aizstāts ar izlaišanas marķieri; detalizētais
konveijera artefakts (kas var ietvert augšupējās sistēmas/klienta pamattekstus un straumes fragmentus)
netiek saglabāts. Semantiskās, idempotences un spriešanas atkārtošanas kešatmiņas
šim pieprasījumam neveic nedz lasīšanu, nedz rakstīšanu. Nodrošinātāja pieprasījums un klientam redzamā
atbilde paliek nemainīti. Agrīnie savienojuma uzturēšanas baiti tiek iztukšoti no pagaidu
bufera, kad detalizētais artefakts tiek izlaists. Kiro brīdinājums par nepareizi veidotu EventStream
ziņo tikai lietderīgās slodzes baitu skaitu, bet nekad ne tās saturu vai JSON
parsētāja neapstrādāto kļūdu.
Tas neapgalvo, ka būtu auditēta katra nesaistītā nodrošinātāja/spraudņa diagnostika;
plašāka saglabāto datu galamērķu pārbaude tiek izsekota sadaļā #11658.

Iekšējais `/api/modality-bridge/video/drilldown` dzīves cikls ir atsevišķs,
atgriezeniskās cilpas/tokena autentificēts kešatmiņas substrāts. Katrai darbībai ir nepieciešams arī
kanonisks, nepārskatāms principāla ID. Pirms produkcijas izsaucēja iespējošanas tam ir
jāatvasina šis ID no autentificētā nomnieka un nekad nav jāpārsūta
klienta izvēlēta vērtība. Kešatmiņas atslēgas sasaista šo principālu ar kanoniskiem sesijas un
video atsauces ID, glabā tikai to no SHA-256 atvasinātās atslēgas un ierobežo gan lasīšanu,
gan dzēšanu ar to pašu principālu. Kešatmiņa katrā ierakstā glabā ne vairāk kā 16 atvasinātus JPEG
kadrus, dzēš tos pēc desmit minūtēm un atbalsta ierobežotu
`start`/`end` lasīšanu vai tiešu sesijas dzēšanu.

Katram principālam ir noteikts 16 ierakstu un 64 MiB kanonisko JPEG datu ierobežojums. Šie
ierobežojumi nav atkarīgi no globālā 64 ierakstu/256 MiB maksimālā apjoma: principāla kvotas
pārsniegšanas gadījumā pirms globālās LRU izstumšanas apsvēršanas tiek izstumti tikai šā principāla
visilgāk neizmantotie ieraksti. Kešatmiņas darbības laikā ieraksti ar beigušos derīguma termiņu tiek
izņemti gan no principāla, gan globālās uzskaites, savukārt atcelšanas un validācijas kļūmes gadījumā
daļēja aizstāšana netiek saglabāta.

Kešatmiņa noraida nekanonisku Base64, pārmērīgu aizpildījumu, saturu, kas nav JPEG, bojātus vai
nepilnīgus JPEG, kā arī JPEG, kas ierobežotas pilna attēla `sharp`
dekodēšanas laikā izraisa brīdinājumu. Katrs pieņemtais attēls tiek atkārtoti kodēts kā kanonisks JPEG,
platums un augstums tiek atvasināts no dekodētajiem baitiem, nevis uzticoties izsaucēja laukiem,
un visas beigās pievienotās poliglota datu virknes tiek atmestas, nevis saglabātas. Abās kvotās
tiek ieskaitīts tikai ierobežotais kanoniskais saspiestais buferis. JSON pārsūtīšanas ierobežojumā ir
iekļauts Base64 papildapjoms 32 MiB dekodētās ievades maksimālajam apjomam. Katrā
saglabātajā atvasinājumā tiek reģistrēts tā validētais JPEG formāts/izšķirtspēja, iztveršanas politika,
atvasinājuma versija, izveides laiks, servera aprēķinātā satura kontrolsumma un jaucēta vecākobjekta
atsauce kopā ar uzticamā izsaucēja norādīto vecākobjekta satura kontrolsummu. Atcelšana tiek pārbaudīta
starp asinhronās dekodēšanas/kontrolsummas aprēķināšanas posmiem pirms atomārās saglabāšanas kešatmiņā.

Šī laidiena daļa vēl nesavieno produkcijas producentu ar maršrutu un
nenodrošina vairāku izšķirtspēju variantu atlasi. Tādēļ caurspīdīgais Video Bridge pieprasījumu
ceļš nerada papildu slodzi, bet ar nomnieku saistīta principāla atvasināšana un
pilnais FU-08 vairāku izšķirtspēju dzīves cikls joprojām ir skaidri norādīts kā turpmāks darbs,
nevis dokumentēts kā pabeigta funkcionalitāte.

Kadri tiek secīgi aprakstīti ar konfigurēto Video modeli. Tukša
Video pārrakstīšanas vērtība manto Vision iestatījumu; ja abi ir tukši, Vision
automātiskais maršrutētājs atlasa faktisko modeli ar attēlu apstrādes iespējām. Veiksmīgi izveidoti apraksti
aizstāj sākotnējo daļu ar stabilu `[Video description:` prefiksu, kas arī
atzīmē tekstu kā neuzticamu, no multivides atvasinātu novērojumu un norāda pakārtotajiem
modeļiem nesekot multividē atrastajām instrukcijām. Kadru aprakstu kešatmiņas atslēgās
ir ietverti JPEG baiti, uzvedne, laikspiedols un faktiskais modelis; kešatmiņā tiek saglabāti tikai
veiksmīgi apraksti. Kešatmiņas ierakstos tiek saglabāts faktiski veiksmīgi izmantotais producējošais modelis,
tostarp atkāpšanās modelis; ja dažādus kadrus ir apstrādājuši dažādi modeļi, tilts ziņo `mixed`.
Kešatmiņas trāpījums atkārtoti izmanto šo producenta identitāti, nevis pārdēvē to atbilstoši pieprasītajam
maršrutēšanas plānam. Visa video rezultāta kešatmiņas atslēgu veido katra ievade, kas maina izvadi —
uzvedne, faktiskais modelis, iztveršanas politika, kadru skaits, semantiskās analīzes režīms,
normalizētā fokusa padoma SHA-256 digitālnospiedums, fokusa logs, `transcript`,
`audioTranscript` un kontaktlapas karodziņš —, tādēļ jebkuras no šīm
dimensijām maiņa rada kešatmiņas netrāpījumu, nevis novecojuša rezultāta atkārtotu izmantošanu. Arī vizuālās
dublēšanās novēršanas politikas versija, slieksnis un ierobežotais kandidātkadru skaits ir tieši norādīti
rezultātu kešatmiņas atslēgā un metadatos; tādēļ politikas maiņas gadījumā nevar atkārtoti izmantot novecojušu
visa video aprakstu. Rezultātu kešatmiņas v4 metadati saglabā režīmu un
digitālnospiedumu, bet nekad nesaglabā neapstrādātu lietotāja uzdevumu. Drošības mehānisma metadati ziņo gan
pieprasīto, gan faktisko analīzes režīmu; pieprasīts `focused` režīms bez
izmantojama lietotāja teksta tiek uzrādīts kā faktiski `full`.

Drošības mehānisms izgūst visas atbalstītās video daļas, bet apraksta ne vairāk kā
`modalityBridgeVideoMaxVideos`. Mērķim, par kuru pierādīts, ka tam ir
`supportsVideo === false`, neveiksmīgi un ierobežojumu pārsnieguši video tiek pārvērsti par nepārprotamiem droša
teksta marķieriem, lai nesaglabātos neviens neapstrādāts video. Ja iespējas nav zināmas, šīs daļas
saglabā savu video nesēju; jebkurš atkāpšanās transkripts tiek apstrādāts saskaņā ar iepriekš aprakstīto
ierobežoto teksta pārveidošanu. Mērķi ar `supportsVideo === true` apiet tiltu.
Klienta pieprasījuma pārtraukšanas signāls tiek izplatīts lejupielādei, brokera rindai,
apakšprocesiem un aprakstu izveides izsaukumiem; pārtraukšana aptur apstrādi starp video un kļūmes gadījumā nekad
nepieļauj neapstrādātas multivides pārsūtīšanu.

Izpildlaika iestatījumi tiek glabāti DB un validēti ar Zod:

| Atslēga                             | Noklusējums | Diapazons / darbība                                                                                       |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Neobligāta izpildlaika funkcija, kas jāiespējo                                                            |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` saglabā vispārīgus parakstus; `focused` izmanto ierobežotu, neuzticamu jaunākā lietotāja kontekstu |
| `modalityBridgeVideoModel`          | `""`        | Pārmanto Vision Bridge modeli                                                                             |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                      |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` vai proporcionāls `segment_aware`; detektora kļūmes gadījumā izmanto `uniform`   |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                       |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                            |

Iepriekš saglabātās Video noildzes vērtības, kas pārsniedz 120 sekundes, tiek ierobežotas līdz
starpnieka termiņam; jauni iestatījumu ieraksti virs šī ierobežojuma tiek noraidīti.
`GET /api/modality-bridge/video/runtime` pirms autentifikācijas vai izpildlaika pārbaudes
pieprasa uzticamu, apzīmogotu atgriezeniskās cilpas
lokalitāti un pēc tam — pārvaldības autentifikāciju. Tas atgriež tikai `available`,
sanitizētas FFmpeg/ffprobe versijas un fiksētu iemeslu, ja izpildlaiks nav pieejams.
Iekšējais izvilkšanas galapunkts nav publiska augšupielādes API: rindas pārslodzes
gadījumā tiek atgriezts `503` kopā ar `Retry-After`, zvanītāja atvienošanās gadījumā —
`499`, bet, sasniedzot fiksēto starpnieka termiņu, — `504`. Konvertētās atbildes centrālajai
`x-omniroute-modality-bridge` galvenei pievieno
`video->text;model=<visionModel>;parts=<videos>`, nenoņemot Vision vai Audio segmentus.

### PII maskētājs (`piiMasker.ts`)

Darbojas **abos** posmos.

- **`preCall`** klonē derīgo slodzi, apstrādā `system`, `messages`, `input` un
  `prompt` (tostarp vienkārša teksta virkņu vienumus) un virkņu `content`/`text`
  laukiem lieto `processPII()` (no
  `@/shared/utils/inputSanitizer`). Ja
  `PII_REDACTION_ENABLED=true`, konstatētā PII tiek aizklāta izejošajā
  derīgajā slodzē. Tas nav atkarīgs no `INPUT_SANITIZER_MODE` (kas kontrolē tikai
  uzvedņu injekcijas politiku). Ja aizklāšana ir izslēgta, izsaukums reģistrē konstatējumu
  skaitu, nepārrakstot saturu.
- **`postCall`** dziļi klonē atbildi, izpilda `sanitizePIIResponse()` un
  Responses API formas maskētāju (`maskResponsesOutput` — aptver
  `output_text` un `output[].content[].text`). Ja tiek veikta jebkāda aizklāšana,
  modificētā atbilde aizstāj sākotnējo.

Aizsargmehānisms nekad nebloķē; tas tikai pievieno anotācijas (`meta.detections`,
`meta.redacted`) vai pārraksta.

#### Atlase pēc tipa, pielāgoti modeļi un konstatējumu skaitītāji

**Informācijas panelis → Iestatījumi → Drošība → PII maskēšana** nosaka, _kas_ tiek maskēts. Tas
neieslēdz maskēšanu: to joprojām nosaka `PII_REDACTION_ENABLED` (pieprasījums) un
`PII_RESPONSE_SANITIZATION` (atbilde + SSE), un abi pēc noklusējuma ir izslēgti.

- **Atlase pēc tipa** — iebūvētie ID ir uzskaitīti
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ja vērtība nav iestatīta, tas nozīmē visus
  tipus (tāda bija darbība pirms šī iestatījuma ieviešanas). Pieprasījumu dzinēja
  `ssn_us` modelis tiek kartēts uz `ssn`. Veidnes (Minimāla, Standarta, Finanšu,
  Brazīlijas, ASV, Pilna) tikai aizpilda izvēles rūtiņas lietotāja saskarnē.
- **Pielāgoti modeļi** — līdz 20 regulāro izteiksmju vai aizstājējzīmju modeļiem (`*` = līdz 64
  rakstzīmēm, kas nav atstarpes, `?` = viena rakstzīme). Atbilstības kļūst par `[CUSTOM_REDACTED]`.
  Katrs modelis tiek apstrādāts ar `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): ne vairāk kā 500 rakstzīmju, karodziņi ir ierobežoti
  līdz `g i m s u`, modelim jābūt kompilējamam, jāiztur `safe-regex` pārbaude (katastrofiska
  atkāpšanās), un tas nedrīkst atbilst tukšai virknei vai aizklāšanas vietturim.
  Neatbilstošs modelis tiek noraidīts saglabāšanas un testēšanas laikā, bet saglabāta rinda,
  kas neatbilst prasībām, izpildlaikā tiek izlaista, nevis kompilēta. Pielāgotie modeļi darbojas tikai
  tad, kad maskēšana ir ieslēgta.
- **Konstatējumu skaitītāji** — skaits katram tipam (nekad neietver atrastās vērtības), kas tiek glabāts
  atmiņā un atiestatīts pēc restartēšanas (`src/lib/pii/piiDetectionStats.ts`). Tas
  palielinās tikai tad, kad maskēšana ir ieslēgta.

Iestatījumi tiek glabāti tabulā `key_value` (nosaukumvietā `pii_settings`,
`src/lib/db/piiSettings.ts`) un nolasīti, izmantojot 1 s kešatmiņu. API:

| Metode | Ceļš                     | Nolūks                                                                           |
| ------ | ------------------------ | -------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Karodziņu stāvoklis, `enabledTypes`, `customPatterns`, konstatējumu skaitītāji   |
| `PUT`  | `/api/settings/pii`      | Aizstāj `enabledTypes` (`null` = visi) un/vai `customPatterns`                   |
| `POST` | `/api/settings/pii/test` | Izmēģina vienu modeli ar ne vairāk kā 8 KB lielu paraugu; nekas netiek saglabāts |

Visiem trim ir nepieciešama pārvaldības autentifikācija, un tie validē pieprasījuma pamatdaļu ar Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Uzvedņu injekcija (`promptInjection.ts`)

Konstatē pretinieciskas struktūras lietotāja nodrošinātajā saturā un piemēro
konfigurēto politiku. Darbību nosaka vides mainīgie un konstruktora
opcijas:

| Iestatījums          | Vides mainīgais                                                                                              | Noklusējums | Ietekme                                                                                                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Iespējots            | `INPUT_SANITIZER_ENABLED`                                                                                    | `true`      | Ja vērtība ir `false`, aizsargmehānisms pārtrauc izpildi.                                                                                                                                             |
| Režīms               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                              | `warn`      | Injekciju politika: `block`, `warn` vai `log`. (`redact` tiek pieņemts atpakaļsaderības nolūkā, taču **neizņem** injekcijas tekstu; pieprasījuma PII pārrakstīšanu kontrolē `PII_REDACTION_ENABLED`.) |
| Bloķēšanas slieksnis | `blockThreshold` opcija / `INPUT_SANITIZER_BLOCK_THRESHOLD` (aizstājvārds `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`      | Minimālā nopietnības pakāpe, kas nepieciešama bloķēšanai. Ar noklusējuma iestatījumiem vidēja pakāpe tiek tikai novērota.                                                                             |

**Režīma prioritāte** (`getMode`): izsaucēja `options.mode` →
`INJECTION_GUARD_MODE` **DB funkcijas karoga ignorējošā vērtība** (Informācijas panelis → Iestatījumi →
Funkciju karogi) → `INJECTION_GUARD_MODE` vides mainīgais → `INPUT_SANITIZER_MODE` vides mainīgais →
`warn`. Tādēļ informācijas panelī norādītajai ignorējošajai vērtībai ir augstāka prioritāte nekā vides mainīgajiem, un
Funkciju karogu lietotāja saskarne kontrolē darbojošos aizsargmehānismu reāllaikā (bez restartēšanas). DB nolasīšana ir kļūmdroša:
ja rodas kļūda, aizsargmehānisms atgriežas pie darbības, kuras pamatā ir vides mainīgie, un, ja
ignorējošā vērtība nav iestatīta, darbība ir identiska izšķiršanai tikai pēc vides mainīgajiem.

Noteikšanas avoti:

1. `sanitizeRequest()` no `@/shared/utils/inputSanitizer` (kopīga noteicēju
   kopa, kas tiek izmantota citviet konveijerā).
2. Iebūvētie `DEFAULT_GUARD_PATTERNS` (pašlaik `system_override_inline` un
   `markdown_system_block`, abiem nopietnības pakāpe ir `high`).
3. Neobligātie `customPatterns`, kas nodoti, izmantojot konstruktora opcijas (virknes, regulārās izteiksmes
   vai `{ name, pattern, severity }` ieraksti).

Ja `mode === "block"` **un** vismaz viens atradums sasniedz nopietnības pakāpes
slieksni, `preCall` atgriež `{ block: true, message: "Request rejected:
suspicious content detected" }`. Režīmos `warn`/`log` aizsargmehānisms ieraksta notikumu žurnālā, bet
atļauj izsaukumu. Koplietojamā palīgfunkcija `evaluatePromptInjection()` arī tiek eksportēta
izsaucējiem, kuriem jānovērtē uzvednes, neizmantojot reģistru.

**Skenēšanas ierobežojums (v3.8.20):** noteicējs pārbauda tikai apvienotā uzvednes teksta **pirmos 16 KB** —
`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 baiti) failā
`src/shared/utils/inputSanitizer.ts`. Gan `detectInjection()`, gan
`evaluatePromptInjection()` pirms šablonu cikla izpildes izmanto
`slice(0, MAX_INJECTION_SCAN_BYTES)`. Injekcijas direktīvas atrodas tuvu ievades sākumam, tādēļ šādi
tiek ierobežots regulāro izteiksmju CPU/GC patēriņš vairāku simtu KB datu slodzēm, nevājinot noteikšanu (sk.
#3932, #4041).

### Akreditācijas datu maskētājs (`credentialMasker.ts`)

Darbojas **abos** posmos un noklusējuma ķēdē ir pēdējais (prioritāte `95`). Rediģē
plaši zināmus API atslēgu / slepeno marķieru šablonus izejošajā datu slodzē (ziņojumu
saturā, rīku izsaukumu argumentos, rīku rezultātos) **un** nodrošinātāja atbildē, lai
uzvednē ielīmēti akreditācijas dati (vai rīka rezultātā atkārtoti izvadīti dati) netiktu nopludināti
augšupējam nodrošinātājam vai atpakaļ klientam.

- **Tikai pēc izvēles**, ievērojot tādu pašu principu kā PII rediģēšanai (saistīts ar Stingro noteikumu #20):
  atspējots, ja vien `settings.credentialRedactionEnabled === true` **vai**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kad tas ir izslēgts, aizsargmehānisms neveic nekādas darbības —
  tas nekad nebloķē un neko nepārraksta.
- `redactCredentials()` šķērso visu datu slodzes/atbildes koku (`walkValue()`,
  ar aizsardzību pret prototipa piesārņošanu un cikliem, izmantojot `WeakSet`) un aizstāj atbilstības ar
  `[REDACTED:<type>]` vietturi, klonējot tikai tos zarus, kas faktiski
  mainīti.
- `CREDENTIAL_PATTERNS` aptver LLM nodrošinātāju atslēgas (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS marķierus (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), maksājumu atslēgas (Stripe, Square), mākoņpakalpojumu
  atslēgas (AWS piekļuves atslēga, Twilio, SendGrid, Mailgun), privātās atslēgas / JWT,
  savienojumu virknes, kas satur akreditācijas datus (`mongodb://user:pass@...` utt.), un
  vispārīgu `Authorization`/`x-api-key`/`api-key`/`apikey` galvenes vērtības
  šablonu. Galvenēm līdzīgas atslēgas (`authorization`, `x-api-key`, `api-key`,
  `apikey`) tiek rediģētas strukturāli (tikai vērtība; shēmas prefikss, piemēram,
  `Bearer `/`Basic `, tiek saglabāts), nevis izmantojot vispārīgo teksta regulāro izteiksmi.
- Aizsargmehānisms nekad nebloķē; tas tikai pārraksta (`modifiedPayload` /
  `modifiedResponse`) un pievieno anotācijas (`meta.credentialsRedacted`, `meta.count`).

Regresiju aizsargs: `tests/unit/credential-masker-guardrail.test.ts`.

## Pamatkontrakts (`base.ts`)

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
  block?: boolean; // true pārtrauc ķēdes izpildi
  message?: string; // tiek parādīts bloķēšanas gadījumā
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // preCall atgriež šo vērtību, lai pārrakstītu pieprasījumu
  modifiedResponse?: TValue; // postCall atgriež šo vērtību, lai pārrakstītu atbildi
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

Drošības mehānisms norāda, ka „nav izmaiņu”, atgriežot `void`, `{}` vai
`{ block: false }`. Atgriežot `modifiedPayload`/`modifiedResponse`, tiek aizstāta
vērtība, kas ķēdē tiek nodota tālāk nākamajiem drošības mehānismiem.
`signal?: AbortSignal` nodod izsaucēja dzīves ciklu drošības mehānismiem. Pieprasījuma pārtraukšana ir apzināts atvērtas kļūmes izņēmums: multivides tilti pārtrauc darbu un veic tīrīšanu, neatjaunojot sākotnējo multividi mērķim, par kuru ir zināms, ka tas to neatbalsta.

## Reģistrs (`registry.ts`)

Vienīgā `guardrailRegistry` instance nodrošina:

- `register(guardrail)` — pievieno drošības mehānismu (vai aizstāj to pēc normalizētā nosaukuma) un
  atkārtoti sakārto pēc `priority` augošā secībā.
- `clear()` / `list()` — administratīvas palīgfunkcijas.
- `runPreCallHooks(payload, context)` — secīgi izpilda aktīvos drošības mehānismus, nododot
  lietderīgo slodzi caur `modifiedPayload`, un apstājas pie pirmā `block: true`.
- `runPostCallHooks(response, context)` — tāda pati plūsma atbildes pusē.
- `resetGuardrailsForTests({ registerDefaults })` — notīra stāvokli un pēc izvēles
  atkārtoti reģistrē noklusējuma mehānismus tīrai testu izolācijai.

Abas izpildfunkcijas atgriež `{ blocked, payload|response, results, guardrail?, message? }`,
kur `results` ir `GuardrailExecutionResult` ierakstu masīvs, kas ietver katra
drošības mehānisma laukus `blocked`, `skipped`, `modified`, `error` un `meta`,
kas ir noderīgi trasēšanai.

### Drošības mehānismu atspējošana katram pieprasījumam

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` apkopo
drošības mehānismu nosaukumu sarakstu bez dublikātiem, kuri pašreizējam
pieprasījumam ir jāizlaiž. Avoti (visi neobligāti, visi tiek apvienoti):

- `apiKeyInfo.disabledGuardrails`
- Pieprasījuma ķermeņa `disabledGuardrails` (augšējā līmenī)
- Pieprasījuma ķermeņa `metadata.disabledGuardrails`
- Galvene `x-omniroute-disabled-guardrails` (vai mantotā
  `x-disabled-guardrails`)

Vērtības var būt virkņu masīvi vai ar komatiem atdalīta virkne; nosaukumi tiek
normalizēti uz mazo burtu kebab-case formātu (`pii_masker` → `pii-masker`). Rezultāts
caur `context.disabledGuardrails` tiek nodots reģistram, kas izlaiž
atbilstošos drošības mehānismus (`skipped: true` laukā `results`).

## Izpildes secība

Katram pieprasījumam, kas tiek apstrādāts caur `src/sse/handlers/chat.ts` un
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` izveido izlaižamo aizsargmehānismu sarakstu no API atslēgas, pieprasījuma pamatteksta
   un galvenēm.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` izpilda aizsargmehānismus augošā
   prioritātes secībā:
   - Atspējotie aizsargmehānismi tiek reģistrēti kā `skipped`.
   - Katra aizsargmehānisma `preCall` var pārrakstīt lietderīgo slodzi, izmantojot `modifiedPayload`.
   - Pirmais `block: true` priekšlaicīgi pārtrauc ķēdi, un apstrādātājs atgriež
     aizsargmehānisma noraidījuma atbildi.
3. (Iespējams, pārrakstītā) lietderīgā slodze tiek nodota kombinētajai maršrutēšanai un augšupstraumes
   nosūtīšanai.
4. Pēc atbildes izveides `guardrailRegistry.runPostCallHooks(...)`
   izpilda to pašu ķēdi atbildei. `block: true` šajā posmā atmet augšupstraumes
   atbildi.

Aizsargmehānismi, kas izmet kļūdu, tiek reģistrēti ar `error: <message>` un ierakstīti žurnālā, izmantojot
`logger.warn`, taču ķēdes izpilde turpinās — pēc konstrukcijas kļūmes gadījumā pieprasījums tiek atļauts.

## Konfigurācija

Iebūvēto aizsargmehānismu nolasītie vides mainīgie:

| Mainīgais                             | Izmanto                     | Ietekme                                                                                                                    |
| ------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`          | Iestatiet uz `false`, lai pilnībā atspējotu noteikšanu.                                                                    |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`          | Injekciju politika: `warn`, `block` vai `log`. Mantotā vērtība `redact` nepārraksta injekcijas tekstu.                     |
| `INJECTION_GUARD_MODE`                | `prompt-injection`          | Injekciju aizsargmehānisma režīms; arī DB funkcionalitātes karodziņš, kas **ignorē un aizstāj** vides mainīgos (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`          | Minimālais nopietnības līmenis, kuru `MODE=block` noraida: `high` (noklusējums), `medium` vai `low`.                       |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`          | Mantots `INPUT_SANITIZER_BLOCK_THRESHOLD` aizstājvārds.                                                                    |
| `PII_REDACTION_ENABLED`               | `pii-masker`                | Ja vērtība ir `true`, pieprasījumā esošā PII tiek aizklāta (neatkarīgi no injekciju režīma).                               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (lejupstraume) | Kontrolē maskētāja darbību atbildes pusē.                                                                                  |

Modalitātes tilta aizsargmehānismi izpildlaika konfigurāciju nolasa no DB nodrošinātās iestatījumu
krātuves (`getSettings()`), nevis no vides mainīgajiem. Attēlu apstrādes primārās atslēgas ir
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` un
`modalityBridgeCacheMaxEntries`. Mantotās
`visionBridge*` atslēgas tiek pieņemtas tikai kā dokumentētā viena cikla lasīšanas
atkāpšanās iespēja; informācijas paneļa veiktajai rakstīšanai tiek izmantotas primārās atslēgas. Noklusējuma vērtības un atkāpšanās
risinātājs atrodas `src/shared/constants/modalityBridgeDefaults.ts`, bet mantotās
konstantes ir saglabātas failā `src/shared/constants/visionBridgeDefaults.ts`.

Audio apstrāde izmanto `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` un `modalityBridgeAudioMaxClips`, kā arī koplietotos
`modalityBridgeCache*` iestatījumus. Audio apstrādei nav mantoto atslēgu atkāpšanās iespējas, jo šīs
atslēgas tika ieviestas kopā ar Modalitātes tilta shēmu.

Video apstrāde izmanto `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` un
`modalityBridgeVideoTimeout`, kā arī koplietotos `modalityBridgeCache*` iestatījumus.
Tā pēc noklusējuma ir atspējota, jo FFmpeg/ffprobe ir neobligātas darbības
atkarības, bet kadru aprakstu ģenerēšana palielina latentumu un modeļa izmaksas.

## Pielāgotas aizsargbarjeras

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

Darbības:

1. Izveidojiet `src/lib/guardrails/myGuardrail.ts`, paplašinot `BaseGuardrail`.
2. Implementējiet `preCall` un/vai `postCall`.
3. Vai nu reģistrējiet importēšanas laikā (pievienojiet no `registerDefaultGuardrails`), vai
   izsauciet `guardrailRegistry.register(...)` izpildlaikā — reģistrs aizstāj
   jebkuru iepriekšējo aizsargbarjeru ar tādu pašu normalizēto nosaukumu.
4. Pievienojiet testus direktorijā `tests/unit/` (esošie piemēri:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testēšana

Starp testiem izmantojiet `resetGuardrailsForTests()`, lai sāktu no zināma stāvokļa.
Nododiet `{ registerDefaults: false }`, lai sāktu ar tukšu reģistru un
reģistrētu tikai testējamās aizsargbarjeras. Vision Bridge atbalsta atkarību
ievadīšanu (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge nodrošina
līdzvērtīgus paplašinājuma punktus iestatījumiem, iespējām, STT modeļa atlasei, akreditācijas datu
pārbaudēm un transkripcijai. Tādēļ testos var pārbaudīt abas plūsmas bez piekļuves
DB vai tīklam.

## Skatiet arī

- `src/lib/guardrails/` — implementācija
- `src/shared/utils/inputSanitizer.ts` — koplietots detektors, kas nodrošina
  uzvedņu injekciju noteikšanu un PII maskēšanu
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge noklusējuma vērtības un
  piespiedu tilta modeļu saraksts
- `src/shared/constants/modalityBridgeDefaults.ts` — koplietoti Vision/Audio izpildlaika noklusējumi
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonāls slānis (ķēdes pārtraucējs, nogaidīšanas periodi)
- `docs/reference/ENVIRONMENT.md` — pilna vides mainīgo atsauce

## Injekciju aizsarga maršrutu pārklājums un red-team testēšana (8. posms · D bloks)

Injekciju aizsargs (`createInjectionGuard` / `withInjectionGuard`) aptver visus maršrutus,
kas pieņem lietotāju uzvednes. Tas ievēro `INJECTION_GUARD_MODE` (noklusējuma vērtība `warn` = tikai reģistrē žurnālā;
`block` = atgriež HTTP 400 `SECURITY_001`).

| Tips            | Maršruti                                                                                                                                             | Noklusējuma režīms |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Teksts (esošie) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn               |
| Ģeneratīvie     | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn               |
| Dati            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn               |

Teksta izgūšana (`extractMessageContents`) aptver `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team testēšana (katru nakti, `nightly-llm-security.yml`):** promptfoo pārbauda, vai katrs maršruts bloķē
OWASP-LLM korpusu režīmā `INJECTION_GUARD_MODE=block`; garak izpilda pārbaudes (izlaiž, ja nav noslēpuma).
`moderations` ir iekļauts konsekvences labad — operatori bloķēšanas režīmā to var izslēgt, izmantojot
`resolveDisabledGuardrails`.

Nakts darbplūsmai (`.github/workflows/nightly-llm-security.yml`, cron + manuāla
palaišana) ir divi darbi:

- **`promptfoo-guard` (bloķējošs)** — izpilda `promptfoo eval -c promptfooconfig.yaml`
  ar `INJECTION_GUARD_MODE=block`. Katrs pretiniecisks gadījums (piemēram, "ignorē visus
  iepriekšējos norādījumus…", DAN stila ierobežojumu apiešanas mēģinājumi) pārbauda, vai atbilde satur
  `error.code === "SECURITY_001"`, proti, vai aizsargs patiešām noraidīja pieprasījumu.
- **`garak` (konsultatīvs)** — izpilda garak `--probes promptinject,dan,leakreplay`
  pret lokālu OmniRoute instanci (`http://localhost:20128/v1`). Tā izpilde ir atkarīga no
  pakalpojumu sniedzēja noslēpuma (`PROMPTFOO_PROVIDER_KEY`); ja tā nav, darbs tiek korekti izlaists, un tam ir pievienots
  `|| true`, tādēļ tas sniedz pārskatu, neizraisot CI kļūmi.

Aizsarga palīgfunkcijas (`createInjectionGuard` / `withInjectionGuard`) pārklājums
aptver katru `/v1` maršrutu, kas pieņem uzvednes; uzvednes teksts tiek iegūts no
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`, izmantojot
`extractMessageContents()` failā `src/shared/utils/inputSanitizer.ts`.
